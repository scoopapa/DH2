"use strict";Object.defineProperty(exports, "__esModule", {value: true});/**
 * Battle Simulator runner.
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * @license MIT
 */

var _assert = require('assert');
var _fs = require('fs'); var fs = _fs;


var _battle = require('../battle');
var _battlestream = require('../battle-stream'); var BattleStreams = _battlestream;
var _state = require('../state');
var _prng = require('../prng');
var _randomplayerai = require('./random-player-ai');




















 class Runner {
	static  __initStatic() {this.AI_OPTIONS = {
		createAI: (s, o) => new (0, _randomplayerai.RandomPlayerAI)(s, o),
		move: 0.7,
		mega: 0.6,
	}}

	
	
	
	
	
	
	
	

	constructor(options) {
		this.format = options.format;

		this.prng = (options.prng && !Array.isArray(options.prng)) ?
			options.prng : new (0, _prng.PRNG)(options.prng);
		this.p1options = {...Runner.AI_OPTIONS, ...options.p1options};
		this.p2options = {...Runner.AI_OPTIONS, ...options.p2options};

		this.input = !!options.input;
		this.output = !!options.output;
		this.error = !!options.error;
		this.dual = options.dual || false;
	}

	async run() {
		const battleStream = this.dual ?
			new DualStream(this.input, this.dual === 'debug') :
			new RawBattleStream(this.input);
		const game = this.runGame(this.format, battleStream);
		if (!this.error) return game;
		return game.catch(err => {
			console.log(`\n${battleStream.rawInputLog.join('\n')}\n`);
			throw err;
		});
	}

	 async runGame(format, battleStream) {
		// @ts-ignore - DualStream implements everything relevant from BattleStream.
		const streams = BattleStreams.getPlayerStreams(battleStream);
		const spec = {formatid: format, seed: this.prng.seed};
		const p1spec = this.getPlayerSpec("Bot 1", this.p1options);
		const p2spec = this.getPlayerSpec("Bot 2", this.p2options);

		const p1 = this.p1options.createAI(
			streams.p1, {seed: this.newSeed(), ...this.p1options}
		);
		const p2 = this.p2options.createAI(
			streams.p2, {seed: this.newSeed(), ...this.p2options}
		);
		// TODO: Use `await Promise.race([streams.omniscient.read(), p1, p2])` to avoid
		// leaving these promises dangling once it no longer causes memory leaks (v8#9069).
		void p1.start();
		void p2.start();

		void streams.omniscient.write(`>start ${JSON.stringify(spec)}\n` +
			`>player p1 ${JSON.stringify(p1spec)}\n` +
			`>player p2 ${JSON.stringify(p2spec)}`);

		for await (const chunk of streams.omniscient) {
			if (this.output) console.log(chunk);
		}
		return streams.omniscient.writeEnd();
	}

	// Same as PRNG#generatedSeed, only deterministic.
	// NOTE: advances this.prng's seed by 4.
	 newSeed() {
		return [
			Math.floor(this.prng.next() * 0x10000),
			Math.floor(this.prng.next() * 0x10000),
			Math.floor(this.prng.next() * 0x10000),
			Math.floor(this.prng.next() * 0x10000),
		];
	}

	 getPlayerSpec(name, options) {
		if (options.team) return {name, team: options.team};
		return {name, seed: this.newSeed()};
	}
} Runner.__initStatic(); exports.Runner = Runner;

class RawBattleStream extends BattleStreams.BattleStream {
	

	

	constructor(input) {
		super();
		this.input = !!input;
		this.rawInputLog = [];
	}

	_write(message) {
		if (this.input) console.log(message);
		this.rawInputLog.push(message);
		super._write(message);
	}
}

class DualStream {
	
	
	

	constructor(input, debug) {
		this.debug = debug;
		// The input to both streams should be the same, so to satisfy the
		// input flag we only need to track the raw input of one stream.
		this.control = new RawBattleStream(input);
		this.test = new RawBattleStream(false);
	}

	get rawInputLog() {
		const control = this.control.rawInputLog;
		const test = this.test.rawInputLog;
		_assert.strict.deepEqual(test, control);
		return control;
	}

	async read() {
		const control = await this.control.read();
		const test = await this.test.read();
		// In debug mode, wait to catch this as a difference in the inputLog
		// and error there so we get the full battle state dumped instead.
		if (!this.debug) _assert.strict.equal(_state.State.normalizeLog(test), _state.State.normalizeLog(control));
		return control;
	}

	write(message) {
		this.control._write(message);
		this.test._write(message);
		this.compare();
	}

	writeEnd() {
		// We need to compare first because _writeEnd() destroys the battle object.
		this.compare(true);
		this.control._writeEnd();
		this.test._writeEnd();
	}

	compare(end) {
		if (!this.control.battle || !this.test.battle) return;

		const control = this.control.battle.toJSON();
		const test = this.test.battle.toJSON();
		try {
			_assert.strict.deepEqual(_state.State.normalize(test), _state.State.normalize(control));
		} catch (err) {
			if (this.debug) {
				// NOTE: diffing these directly won't work because the key ordering isn't stable.
				fs.writeFileSync('logs/control.json', JSON.stringify(control, null, 2));
				fs.writeFileSync('logs/test.json', JSON.stringify(test, null, 2));
			}
			throw new Error(err.message);
		}

		if (end) return;
		const send = this.test.battle.send;
		this.test.battle = _battle.Battle.fromJSON(test);
		this.test.battle.restart(send);
	}
}
