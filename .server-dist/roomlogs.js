"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Roomlogs
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This handles data storage for rooms.
 *
 * @license MIT
 */

var _fs = require('../.lib-dist/fs');
var _utils = require('../.lib-dist/utils');








/**
 * Most rooms have three logs:
 * - scrollback
 * - roomlog
 * - modlog
 * This class keeps track of all three.
 *
 * The scrollback is stored in memory, and is the log you get when you
 * join the room. It does not get moderator messages.
 *
 * The modlog is stored in
 * `logs/modlog/modlog_<ROOMID>.txt`
 * It contains moderator messages, formatted for ease of search.
 * Direct modlog access is handled in modlog.ts; this file is just
 * a wrapper to make other code more readable.
 *
 * The roomlog is stored in
 * `logs/chat/<ROOMID>/<YEAR>-<MONTH>/<YEAR>-<MONTH>-<DAY>.txt`
 * It contains (nearly) everything.
 */
 class Roomlog {
	/**
	 * Battle rooms are multichannel, which means their logs are split
	 * into four channels, public, p1, p2, full.
	 */
	
	/**
	 * Chat rooms auto-truncate, which means it only stores the recent
	 * messages, if there are more.
	 */
	
	/**
	 * Chat rooms include timestamps.
	 */
	
	
	/**
	 * Scrollback log
	 */
	
	
	/**
	 * undefined = uninitialized,
	 * null = disabled
	 */
	
	
	constructor(room, options = {}) {
		this.roomid = room.roomid;

		this.isMultichannel = !!options.isMultichannel;
		this.noAutoTruncate = !!options.noAutoTruncate;
		this.noLogTimes = !!options.noLogTimes;

		this.log = [];
		this.broadcastBuffer = [];

		this.roomlogStream = undefined;
		this.roomlogFilename = '';

		Rooms.Modlog.initialize(this.roomid);
		void this.setupRoomlogStream(true);
	}
	getScrollback(channel = 0) {
		let log = this.log;
		if (!this.noLogTimes) log = [`|:|${~~(Date.now() / 1000)}`].concat(log);
		if (!this.isMultichannel) {
			return log.join('\n') + '\n';
		}
		log = [];
		for (let i = 0; i < this.log.length; ++i) {
			const line = this.log[i];
			const split = /\|split\|p(\d)/g.exec(line);
			if (split) {
				const canSeePrivileged = (channel === Number(split[0]) || channel === -1);
				const ownLine = this.log[i + (canSeePrivileged ? 1 : 2)];
				if (ownLine) log.push(ownLine);
				i += 2;
			} else {
				log.push(line);
			}
		}
		return log.join('\n') + '\n';
	}
	async setupRoomlogStream(sync = false) {
		if (this.roomlogStream === null) return;
		if (!Config.logchat) {
			this.roomlogStream = null;
			return;
		}
		if (this.roomid.startsWith('battle-')) {
			this.roomlogStream = null;
			return;
		}
		const date = new Date();
		const dateString = Chat.toTimestamp(date).split(' ')[0];
		const monthString = dateString.split('-', 2).join('-');
		const basepath = `logs/chat/${this.roomid}/`;
		const relpath = `${monthString}/${dateString}.txt`;

		if (relpath === this.roomlogFilename) return;

		if (sync) {
			_fs.FS.call(void 0, basepath + monthString).mkdirpSync();
		} else {
			await _fs.FS.call(void 0, basepath + monthString).mkdirp();
			if (this.roomlogStream === null) return;
		}
		this.roomlogFilename = relpath;
		if (this.roomlogStream) void this.roomlogStream.writeEnd();
		this.roomlogStream = _fs.FS.call(void 0, basepath + relpath).createAppendStream();
		// Create a symlink to today's lobby log.
		// These operations need to be synchronous, but it's okay
		// because this code is only executed once every 24 hours.
		const link0 = basepath + 'today.txt.0';
		_fs.FS.call(void 0, link0).unlinkIfExistsSync();
		try {
			_fs.FS.call(void 0, link0).symlinkToSync(relpath); // intentionally a relative link
			_fs.FS.call(void 0, link0).renameSync(basepath + 'today.txt');
		} catch (e) {} // OS might not support symlinks or atomic rename
		if (!exports.Roomlogs.rollLogTimer) void exports.Roomlogs.rollLogs();
	}
	add(message) {
		this.roomlog(message);
		message = this.withTimestamp(message);
		this.log.push(message);
		this.broadcastBuffer.push(message);
		return this;
	}
	 withTimestamp(message) {
		if (!this.noLogTimes && message.startsWith('|c|')) {
			return `|c:|${Math.trunc(Date.now() / 1000)}|${message.slice(3)}`;
		} else {
			return message;
		}
	}
	hasUsername(username) {
		const userid = toID(username);
		for (const line of this.log) {
			if (line.startsWith('|c:|')) {
				const curUserid = toID(line.split('|', 4)[3]);
				if (curUserid === userid) return true;
			} else if (line.startsWith('|c|')) {
				const curUserid = toID(line.split('|', 3)[2]);
				if (curUserid === userid) return true;
			}
		}
		return false;
	}
	clearText(userids, lineCount = 0) {
		const cleared = [];
		const clearAll = (lineCount === 0);
		this.log = this.log.reverse().filter(line => {
			const parsed = this.parseChatLine(line);
			if (parsed) {
				const userid = toID(parsed.user);
				if (userids.includes(userid)) {
					if (!cleared.includes(userid)) cleared.push(userid);
					if (this.roomid.startsWith('battle-')) return true; // Don't remove messages in battle rooms to preserve evidence
					if (clearAll) return false;
					if (lineCount > 0) {
						lineCount--;
						return false;
					}
					return true;
				}
			}
			return true;
		}).reverse();
		return cleared;
	}
	uhtmlchange(name, message) {
		const originalStart = '|uhtml|' + name + '|';
		const fullMessage = originalStart + message;
		for (const [i, line] of this.log.entries()) {
			if (line.startsWith(originalStart)) {
				this.log[i] = fullMessage;
				break;
			}
		}
		this.broadcastBuffer.push(fullMessage);
	}
	attributedUhtmlchange(user, name, message) {
		const start = `/uhtmlchange ${name},`;
		const fullMessage = this.withTimestamp(`|c|${user.getIdentity()}|${start}${message}`);
		for (const [i, line] of this.log.entries()) {
			if (_optionalChain([this, 'access', _ => _.parseChatLine, 'call', _2 => _2(line), 'optionalAccess', _3 => _3.message, 'access', _4 => _4.startsWith, 'call', _5 => _5(start)])) {
				this.log[i] = fullMessage;
				break;
			}
		}
		this.broadcastBuffer.push(fullMessage);
	}
	 parseChatLine(line) {
		const messageStart = !this.noLogTimes ? '|c:|' : '|c|';
		const section = !this.noLogTimes ? 4 : 3; // ['', 'c' timestamp?, author, message]
		if (line.startsWith(messageStart)) {
			const parts = _utils.Utils.splitFirst(line, '|', section);
			return {user: parts[section - 1], message: parts[section]};
		}
	}
	roomlog(message, date = new Date()) {
		if (!this.roomlogStream) return;
		const timestamp = Chat.toTimestamp(date).split(' ')[1] + ' ';
		message = message.replace(/<img[^>]* src="data:image\/png;base64,[^">]+"[^>]*>/g, '');
		void this.roomlogStream.write(timestamp + message + '\n');
	}
	modlog(entry, overrideID) {
		void Rooms.Modlog.write(this.roomid, entry, overrideID);
	}
	async rename(newID) {
		const roomlogPath = `logs/chat`;
		const roomlogStreamExisted = this.roomlogStream !== null;
		await this.destroy(false); // don't destroy modlog, since it's renamed later
		const [roomlogExists, newRoomlogExists] = await Promise.all([
			_fs.FS.call(void 0, roomlogPath + `/${this.roomid}`).exists(),
			_fs.FS.call(void 0, roomlogPath + `/${newID}`).exists(),
		]);
		if (roomlogExists && !newRoomlogExists) {
			await _fs.FS.call(void 0, roomlogPath + `/${this.roomid}`).rename(roomlogPath + `/${newID}`);
		}
		await Rooms.Modlog.rename(this.roomid, newID);
		this.roomid = newID;
		exports.Roomlogs.roomlogs.set(newID, this);
		if (roomlogStreamExisted) {
			this.roomlogStream = undefined;
			this.roomlogFilename = "";
			await this.setupRoomlogStream(true);
		}
		return true;
	}
	static async rollLogs() {
		if (exports.Roomlogs.rollLogTimer === true) return;
		if (exports.Roomlogs.rollLogTimer) {
			clearTimeout(exports.Roomlogs.rollLogTimer);
		}
		exports.Roomlogs.rollLogTimer = true;
		for (const log of exports.Roomlogs.roomlogs.values()) {
			await log.setupRoomlogStream();
		}
		const time = Date.now();
		const nextMidnight = new Date(time + 24 * 60 * 60 * 1000);
		nextMidnight.setHours(0, 0, 1);
		exports.Roomlogs.rollLogTimer = setTimeout(() => void Roomlog.rollLogs(), nextMidnight.getTime() - time);
	}
	truncate() {
		if (this.noAutoTruncate) return;
		if (this.log.length > 100) {
			this.log.splice(0, this.log.length - 100);
		}
	}

	destroy(destroyModlog) {
		const promises = [];
		if (this.roomlogStream) {
			promises.push(this.roomlogStream.writeEnd());
			this.roomlogStream = null;
		}
		if (destroyModlog) promises.push(Rooms.Modlog.destroy(this.roomid));
		exports.Roomlogs.roomlogs.delete(this.roomid);
		return Promise.all(promises);
	}
} exports.Roomlog = Roomlog;

const roomlogs = new Map();

function createRoomlog(room, options = {}) {
	let roomlog = exports.Roomlogs.roomlogs.get(room.roomid);
	if (roomlog) throw new Error(`Roomlog ${room.roomid} already exists`);

	roomlog = new Roomlog(room, options);
	exports.Roomlogs.roomlogs.set(room.roomid, roomlog);
	return roomlog;
}

 const Roomlogs = {
	create: createRoomlog,
	Roomlog,
	roomlogs,

	rollLogs: Roomlog.rollLogs,

	rollLogTimer: null ,
}; exports.Roomlogs = Roomlogs;
