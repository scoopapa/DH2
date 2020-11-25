"use strict";Object.defineProperty(exports, "__esModule", {value: true});/**
 * Battle Stream
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Supports interacting with a PS battle in Stream format.
 *
 * This format is VERY NOT FINALIZED, please do not use it directly yet.
 *
 * @license MIT
 */

var _streams = require('./../.lib-dist/streams'); var Streams = _streams;
var _battle = require('./battle');

/**
 * Like string.split(delimiter), but only recognizes the first `limit`
 * delimiters (default 1).
 *
 * `"1 2 3 4".split(" ", 2) => ["1", "2"]`
 *
 * `Utils.splitFirst("1 2 3 4", " ", 1) => ["1", "2 3 4"]`
 *
 * Returns an array of length exactly limit + 1.
 */
function splitFirst(str, delimiter, limit = 1) {
	const splitStr = [];
	while (splitStr.length < limit) {
		const delimiterIndex = str.indexOf(delimiter);
		if (delimiterIndex >= 0) {
			splitStr.push(str.slice(0, delimiterIndex));
			str = str.slice(delimiterIndex + delimiter.length);
		} else {
			splitStr.push(str);
			str = '';
		}
	}
	splitStr.push(str);
	return splitStr;
}

 class BattleStream extends Streams.ObjectReadWriteStream {
	
	
	
	
	

	constructor(options

 = {}) {
		super();
		this.debug = !!options.debug;
		this.noCatch = !!options.noCatch;
		this.replay = options.replay || false;
		this.keepAlive = !!options.keepAlive;
		this.battle = null;
	}

	_write(chunk) {
		if (this.noCatch) {
			this._writeLines(chunk);
		} else {
			try {
				this._writeLines(chunk);
			} catch (err) {
				this.pushError(err, true);
				return;
			}
		}
		if (this.battle) this.battle.sendUpdates();
	}

	_writeLines(chunk) {
		for (const line of chunk.split('\n')) {
			if (line.startsWith('>')) {
				const [type, message] = splitFirst(line.slice(1), ' ');
				this._writeLine(type, message);
			}
		}
	}

	pushMessage(type, data) {
		if (this.replay) {
			if (type === 'update') {
				if (this.replay === 'spectator') {
					this.push(data.replace(/\n\|split\|p[1234]\n(?:[^\n]*)\n([^\n]*)/g, '\n$1'));
				} else {
					this.push(data.replace(/\n\|split\|p[1234]\n([^\n]*)\n(?:[^\n]*)/g, '\n$1'));
				}
			}
			return;
		}
		this.push(`${type}\n${data}`);
	}

	_writeLine(type, message) {
		switch (type) {
		case 'start':
			const options = JSON.parse(message);
			options.send = (t, data) => {
				if (Array.isArray(data)) data = data.join("\n");
				this.pushMessage(t, data);
				if (t === 'end' && !this.keepAlive) this.pushEnd();
			};
			if (this.debug) options.debug = true;
			this.battle = new (0, _battle.Battle)(options);
			break;
		case 'player':
			const [slot, optionsText] = splitFirst(message, ' ');
			this.battle.setPlayer(slot , JSON.parse(optionsText));
			break;
		case 'p1':
		case 'p2':
		case 'p3':
		case 'p4':
			if (message === 'undo') {
				this.battle.undoChoice(type);
			} else {
				this.battle.choose(type, message);
			}
			break;
		case 'forcewin':
		case 'forcetie':
			this.battle.win(type === 'forcewin' ? message  : null);
			break;
		case 'tiebreak':
			this.battle.tiebreak();
			break;
		}
	}

	_writeEnd() {
		// if battle already ended, we don't need to pushEnd.
		if (!this.atEOF) this.pushEnd();
		this._destroy();
	}

	_destroy() {
		if (this.battle) this.battle.destroy();
	}
} exports.BattleStream = BattleStream;

/**
 * Splits a BattleStream into omniscient, spectator, p1, p2, p3 and p4
 * streams, for ease of consumption.
 */
 function getPlayerStreams(stream) {
	const streams = {
		omniscient: new Streams.ObjectReadWriteStream({
			write(data) {
				void stream.write(data);
			},
			writeEnd() {
				return stream.writeEnd();
			},
		}),
		spectator: new Streams.ObjectReadStream({
			read() {},
		}),
		p1: new Streams.ObjectReadWriteStream({
			write(data) {
				void stream.write(data.replace(/(^|\n)/g, `$1>p1 `));
			},
		}),
		p2: new Streams.ObjectReadWriteStream({
			write(data) {
				void stream.write(data.replace(/(^|\n)/g, `$1>p2 `));
			},
		}),
		p3: new Streams.ObjectReadWriteStream({
			write(data) {
				void stream.write(data.replace(/(^|\n)/g, `$1>p3 `));
			},
		}),
		p4: new Streams.ObjectReadWriteStream({
			write(data) {
				void stream.write(data.replace(/(^|\n)/g, `$1>p4 `));
			},
		}),
	};
	(async () => {
		for await (const chunk of stream) {
			const [type, data] = splitFirst(chunk, `\n`);
			switch (type) {
			case 'update':
				streams.omniscient.push(_battle.Battle.extractUpdateForSide(data, 'omniscient'));
				streams.spectator.push(_battle.Battle.extractUpdateForSide(data, 'spectator'));
				streams.p1.push(_battle.Battle.extractUpdateForSide(data, 'p1'));
				streams.p2.push(_battle.Battle.extractUpdateForSide(data, 'p2'));
				streams.p3.push(_battle.Battle.extractUpdateForSide(data, 'p3'));
				streams.p4.push(_battle.Battle.extractUpdateForSide(data, 'p4'));
				break;
			case 'sideupdate':
				const [side, sideData] = splitFirst(data, `\n`);
				streams[side ].push(sideData);
				break;
			case 'end':
				// ignore
				break;
			}
		}
		for (const s of Object.values(streams)) {
			s.pushEnd();
		}
	})().catch(err => {
		for (const s of Object.values(streams)) {
			s.pushError(err, true);
		}
	});
	return streams;
} exports.getPlayerStreams = getPlayerStreams;

 class BattlePlayer {
	
	
	

	constructor(playerStream, debug = false) {
		this.stream = playerStream;
		this.log = [];
		this.debug = debug;
	}

	async start() {
		for await (const chunk of this.stream) {
			this.receive(chunk);
		}
	}

	receive(chunk) {
		for (const line of chunk.split('\n')) {
			this.receiveLine(line);
		}
	}

	receiveLine(line) {
		if (this.debug) console.log(line);
		if (!line.startsWith('|')) return;
		const [cmd, rest] = splitFirst(line.slice(1), '|');
		if (cmd === 'request') return this.receiveRequest(JSON.parse(rest));
		if (cmd === 'error') return this.receiveError(new Error(rest));
		this.log.push(line);
	}

	

	receiveError(error) {
		throw error;
	}

	choose(choice) {
		void this.stream.write(choice);
	}
} exports.BattlePlayer = BattlePlayer;

 class BattleTextStream extends Streams.ReadWriteStream {
	
	

	constructor(options) {
		super();
		this.battleStream = new BattleStream(options);
		this.currentMessage = '';
		void this._listen();
	}

	async _listen() {
		for await (let message of this.battleStream) {
			if (!message.endsWith('\n')) message += '\n';
			this.push(message + '\n');
		}
		this.pushEnd();
	}

	_write(message) {
		this.currentMessage += '' + message;
		const index = this.currentMessage.lastIndexOf('\n');
		if (index >= 0) {
			void this.battleStream.write(this.currentMessage.slice(0, index));
			this.currentMessage = this.currentMessage.slice(index + 1);
		}
	}

	_writeEnd() {
		return this.battleStream.writeEnd();
	}
} exports.BattleTextStream = BattleTextStream;
