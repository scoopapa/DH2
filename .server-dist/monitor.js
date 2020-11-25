"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;/**
 * Monitor
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Various utility functions to make sure PS is running healthily.
 *
 * @license MIT
 */

var _child_process = require('child_process');
var _crashlogger = require('../.lib-dist/crashlogger');
var _fs = require('../.lib-dist/fs');

const MONITOR_CLEAN_TIMEOUT = 2 * 60 * 60 * 1000;

/**
 * This counts the number of times an action has been committed, and tracks the
 * delta of time since the last time it was committed. Actions include
 * connecting to the server, starting a battle, validating a team, and
 * sending/receiving data over a connection's socket.
 */
 class TimedCounter extends Map {
	/**
	 * Increments the number of times an action has been committed by one, and
	 * updates the delta of time since it was last committed.
	 *
	 * @returns [action count, time delta]
	 */
	increment(key, timeLimit) {
		const val = this.get(key);
		const now = Date.now();
		if (!val || now > val[1] + timeLimit) {
			this.set(key, [1, Date.now()]);
			return [1, 0];
		} else {
			val[0]++;
			return [val[0], now - val[1]];
		}
	}
} exports.TimedCounter = TimedCounter;

// Config.loglevel is:
// 0 = everything
// 1 = debug (same as 0 for now)
// 2 = notice (default)
// 3 = warning
// (4 is currently unused)
// 5 = supposedly completely silent, but for now a lot of PS output doesn't respect loglevel
if (('Config' in global) &&
		(typeof Config.loglevel !== 'number' || Config.loglevel < 0 || Config.loglevel > 5)) {
	Config.loglevel = 2;
}

 const Monitor = new (_class = class {constructor() { _class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);_class.prototype.__init7.call(this);_class.prototype.__init8.call(this);_class.prototype.__init9.call(this);_class.prototype.__init10.call(this);_class.prototype.__init11.call(this);_class.prototype.__init12.call(this);_class.prototype.__init13.call(this);_class.prototype.__init14.call(this);_class.prototype.__init15.call(this); }
	__init() {this.connections = new TimedCounter()}
	__init2() {this.netRequests = new TimedCounter()}
	__init3() {this.battles = new TimedCounter()}
	__init4() {this.battlePreps = new TimedCounter()}
	__init5() {this.groupChats = new TimedCounter()}
	__init6() {this.tickets = new TimedCounter()}

	__init7() {this.activeIp = null}
	__init8() {this.networkUse = {}}
	__init9() {this.networkCount = {}}
	__init10() {this.hotpatchLock = {}}
	__init11() {this.hotpatchVersions = {}}

	__init12() {this.TimedCounter = exports.TimedCounter = TimedCounter}

	__init13() {this.updateServerLock = false}
	__init14() {this.cleanInterval = null}
	/**
	 * Inappropriate userid : number of times the name has been forcerenamed
	 */
	 __init15() {this.forceRenames = new Map()}

	/*********************************************************
	 * Logging
	 *********************************************************/
	crashlog(error, source = 'The main process', details = null) {
		if (!error) error = {} ;
		if ((error.stack || '').startsWith('@!!@')) {
			try {
				const stack = (error.stack || '');
				const nlIndex = stack.indexOf('\n');
				[error.name, error.message, source, details] = JSON.parse(stack.slice(4, nlIndex));
				error.stack = stack.slice(nlIndex + 1);
			} catch (e) {}
		}
		const crashType = _crashlogger.crashlogger.call(void 0, error, source, details);
		Rooms.global.reportCrash(error, source);
		if (crashType === 'lockdown') {
			Config.autolockdown = false;
			Rooms.global.startLockdown(error);
		}
	}

	log(text) {
		this.notice(text);
		const staffRoom = Rooms.get('staff');
		if (staffRoom) {
			staffRoom.add(`|c|~|${text}`).update();
		}
	}

	adminlog(text) {
		this.notice(text);
		const upperstaffRoom = Rooms.get('upperstaff');
		if (upperstaffRoom) {
			upperstaffRoom.add(`|c|~|${text}`).update();
		}
	}

	logHTML(text) {
		this.notice(text);
		const staffRoom = Rooms.get('staff');
		if (staffRoom) {
			staffRoom.add(`|html|${text}`).update();
		}
	}

	error(text) {
		_optionalChain([(Rooms.get('development') || Rooms.get('staff') || Rooms.get('lobby')), 'optionalAccess', _ => _.add, 'call', _2 => _2(`|error|${text}`), 'access', _3 => _3.update, 'call', _4 => _4()]);
		if (Config.loglevel <= 3) console.error(text);
	}

	debug(text) {
		if (Config.loglevel <= 1) console.log(text);
	}

	warn(text) {
		if (Config.loglevel <= 3) console.log(text);
	}

	notice(text) {
		if (Config.loglevel <= 2) console.log(text);
	}

	/*********************************************************
	 * Resource Monitor
	 *********************************************************/

	clean() {
		this.clearNetworkUse();
		this.battlePreps.clear();
		this.battles.clear();
		this.connections.clear();
		IPTools.dnsblCache.clear();
	}

	/**
	 * Counts a connection. Returns true if the connection should be terminated for abuse.
	 */
	countConnection(ip, name = '') {
		if (Config.noipchecks || Config.nothrottle) return false;
		const [count, duration] = this.connections.increment(ip, 30 * 60 * 1000);
		if (count === 500) {
			this.adminlog(`[ResourceMonitor] IP ${ip} banned for cflooding (${count} times in ${Chat.toDurationString(duration)}${name ? ': ' + name : ''})`);
			return true;
		}

		if (count > 500) {
			if (count % 500 === 0) {
				const c = count / 500;
				if (c === 2 || c === 4 || c === 10 || c === 20 || c % 40 === 0) {
					this.adminlog(`[ResourceMonitor] IP ${ip} still cflooding (${count} times in ${Chat.toDurationString(duration)}${name ? ': ' + name : ''})`);
				}
			}
			return true;
		}

		return false;
	}

	/**
	 * Counts battles created. Returns true if the connection should be
	 * terminated for abuse.
	 */
	countBattle(ip, name = '') {
		if (Config.noipchecks || Config.nothrottle) return false;
		const [count, duration] = this.battles.increment(ip, 30 * 60 * 1000);
		if (duration < 5 * 60 * 1000 && count % 30 === 0) {
			this.adminlog(`[ResourceMonitor] IP ${ip} has battled ${count} times in the last ${Chat.toDurationString(duration)}${name ? ': ' + name : ''})`);
			return true;
		}

		if (count % 150 === 0) {
			this.adminlog(`[ResourceMonitor] IP ${ip} has battled ${count} times in the last ${Chat.toDurationString(duration)}${name ? ': ' + name : ''}`);
			return true;
		}

		return false;
	}

	/**
	 * Counts team validations. Returns true if too many.
	 */
	countPrepBattle(ip, connection) {
		if (Config.noipchecks || Config.nothrottle) return false;
		const count = this.battlePreps.increment(ip, 3 * 60 * 1000)[0];
		if (count <= 12) return false;
		if (count < 120 && Punishments.sharedIps.has(ip)) return false;
		connection.popup('Due to high load, you are limited to 12 battles and team validations every 3 minutes.');
		return true;
	}

	/**
	 * Counts concurrent battles. Returns true if too many.
	 */
	countConcurrentBattle(count, connection) {
		if (Config.noipchecks || Config.nothrottle) return false;
		if (count <= 5) return false;
		connection.popup(`Due to high load, you are limited to 5 games at the same time.`);
		return true;
	}
	/**
	 * Counts group chat creation. Returns true if too much.
	 */
	countGroupChat(ip) {
		if (Config.noipchecks) return false;
		const count = this.groupChats.increment(ip, 60 * 60 * 1000)[0];
		return count > 4;
	}

	/**
	 * Counts commands that use HTTPs requests. Returns true if too many.
	 */
	countNetRequests(ip) {
		if (Config.noipchecks || Config.nothrottle) return false;
		const [count] = this.netRequests.increment(ip, 1 * 60 * 1000);
		if (count <= 10) return false;
		if (count < 120 && Punishments.sharedIps.has(ip)) return false;
		return true;
	}

	/**
	 * Counts ticket creation. Returns true if too much.
	 */
	countTickets(ip) {
		if (Config.noipchecks || Config.nothrottle) return false;
		const count = this.tickets.increment(ip, 60 * 60 * 1000)[0];
		if (Punishments.sharedIps.has(ip)) {
			return count >= 20;
		} else {
			return count >= 5;
		}
	}

	/**
	 * Counts the data length received by the last connection to send a
	 * message, as well as the data length in the server's response.
	 */
	countNetworkUse(size) {
		if (
			!Config.emergency || typeof this.activeIp !== 'string' ||
			Config.noipchecks || Config.nothrottle
		) {
			return;
		}
		if (this.activeIp in this.networkUse) {
			this.networkUse[this.activeIp] += size;
			this.networkCount[this.activeIp]++;
		} else {
			this.networkUse[this.activeIp] = size;
			this.networkCount[this.activeIp] = 1;
		}
	}

	writeNetworkUse() {
		let buf = '';
		for (const i in this.networkUse) {
			buf += `${this.networkUse[i]}\t${this.networkCount[i]}\t${i}\n`;
		}
		void _fs.FS.call(void 0, 'logs/networkuse.tsv').write(buf);
	}

	clearNetworkUse() {
		if (Config.emergency) {
			this.networkUse = {};
			this.networkCount = {};
		}
	}

	/**
	 * Counts roughly the size of an object to have an idea of the server load.
	 */
	sizeOfObject(object) {
		const objectCache = new Set();
		const stack = [object];
		let bytes = 0;

		while (stack.length) {
			const value = stack.pop();
			switch (typeof value) {
			case 'boolean':
				bytes += 4;
				break;
			case 'string':
				bytes += value.length * 2;
				break;
			case 'number':
				bytes += 8;
				break;
			case 'object':
				if (!objectCache.has(value)) objectCache.add(value);
				if (Array.isArray(value)) {
					for (const el of value) stack.push(el);
				} else {
					for (const i in value) stack.push(value[i]);
				}
				break;
			}
		}

		return bytes;
	}

	sh(command, options = {}) {
		return new Promise((resolve, reject) => {
			_child_process.exec.call(void 0, command, options, (error, stdout, stderr) => {
				resolve([_optionalChain([error, 'optionalAccess', _5 => _5.code]) || 0, '' + stdout, '' + stderr]);
			});
		});
	}

	async version() {
		let hash;
		try {
			await _fs.FS.call(void 0, '.git/index').copyFile('logs/.gitindex');
			const index = _fs.FS.call(void 0, 'logs/.gitindex');
			const options = {
				cwd: __dirname,
				env: {GIT_INDEX_FILE: index.path},
			};

			let [code, stdout, stderr] = await this.sh(`git add -A`, options);
			if (code || stderr) return;
			[code, stdout, stderr] = await this.sh(`git write-tree`, options);

			if (code || stderr) return;
			hash = stdout.trim();

			await this.sh(`git reset`, options);
			await index.unlinkIfExists();
		} catch (err) {}
		return hash;
	}
}, _class); exports.Monitor = Monitor;

exports.Monitor.cleanInterval = setInterval(() => exports.Monitor.clean(), MONITOR_CLEAN_TIMEOUT);
