"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;/**
 * Punishments
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Handles the punishing of users on PS.
 *
 * There are four types of global punishments on PS. Locks, bans, namelocks and rangelocks.
 * This file contains the lists of users that have been punished (both IPs and usernames),
 * as well as the functions that handle the execution of said punishments.
 *
 * @license MIT license
 */

var _fs = require('../.lib-dist/fs');
var _utils = require('../.lib-dist/utils');

const PUNISHMENT_FILE = 'config/punishments.tsv';
const ROOM_PUNISHMENT_FILE = 'config/room-punishments.tsv';
const SHAREDIPS_FILE = 'config/sharedips.tsv';
const SHAREDIPS_BLACKLIST_FILE = 'config/sharedips-blacklist.tsv';
const WHITELISTED_NAMES_FILE = 'config/name-whitelist.tsv';

const RANGELOCK_DURATION = 60 * 60 * 1000; // 1 hour
const LOCK_DURATION = 48 * 60 * 60 * 1000; // 48 hours
const GLOBALBAN_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week
const BATTLEBAN_DURATION = 48 * 60 * 60 * 1000; // 48 hours
const GROUPCHATBAN_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week
const MOBILE_PUNISHMENT_DURATIION = 6 * 60 * 60 * 1000; // 6 hours

const ROOMBAN_DURATION = 48 * 60 * 60 * 1000; // 48 hours
const BLACKLIST_DURATION = 365 * 24 * 60 * 60 * 1000; // 1 year

const USERID_REGEX = /^[a-z0-9]+$/;
const PUNISH_TRUSTED = false;

const PUNISHMENT_POINT_VALUES = {MUTE: 2, BLACKLIST: 3, BATTLEBAN: 4, ROOMBAN: 4};
const AUTOLOCK_POINT_THRESHOLD = 8;

const AUTOWEEKLOCK_THRESHOLD = 5; // number of global punishments to upgrade autolocks to weeklocks
const AUTOWEEKLOCK_DAYS_TO_SEARCH = 60;

/** The longest amount of time any individual timeout will be set for. */
const MAX_PUNISHMENT_TIMER_LENGTH = 24 * 60 * 60 * 1000; // 24 hours

/**
 * The number of users from a groupchat whose creator was banned from using groupchats
 * who may join a new groupchat before the GroupchatMonitor activates.
 */
const GROUPCHAT_PARTICIPANT_OVERLAP_THRESHOLD = 5;
/**
 * The minimum amount of time that must pass between activations of the GroupchatMonitor.
 */
const GROUPCHAT_MONITOR_INTERVAL = 10 * 60 * 1000; // 10 minutes

/**
 * A punishment is an array: [punishType, userid | #punishmenttype, expireTime, reason]
 */










class PunishmentMap extends Map {
	get(k) {
		const punishment = super.get(k);
		if (punishment) {
			if (Date.now() < punishment[2]) return punishment;
			this.delete(k);
		}
		return undefined;
	}
	has(k) {
		return !!this.get(k);
	}
	forEach(callback) {
		for (const [k, punishment] of super.entries()) {
			if (Date.now() < punishment[2]) {
				// eslint-disable-next-line callback-return
				callback(punishment, k, this);
				continue;
			}
			this.delete(k);
		}
	}
}

class NestedPunishmentMap extends Map {
	nestedSet(k1, k2, value) {
		if (!this.get(k1)) {
			this.set(k1, new Map());
		}
		// guaranteed above
		this.get(k1).set(k2, value);
	}
	nestedGet(k1, k2) {
		const subMap = this.get(k1);
		if (!subMap) return subMap;
		const punishment = subMap.get(k2);
		if (punishment) {
			if (Date.now() < punishment[2]) return punishment;
			this.nestedDelete(k1, k2);
		}
		return undefined;
	}
	nestedHas(k1, k2) {
		return !!this.nestedGet(k1, k2);
	}
	nestedDelete(k1, k2) {
		const subMap = this.get(k1);
		if (!subMap) return;
		subMap.delete(k2);
		if (!subMap.size) this.delete(k1);
	}
	nestedForEach(callback) {
		for (const [k1, subMap] of this.entries()) {
			for (const [k2, punishment] of subMap.entries()) {
				if (Date.now() < punishment[2]) {
					// eslint-disable-next-line callback-return
					callback(punishment, k1, k2);
					continue;
				}
				this.nestedDelete(k1, k2);
			}
		}
	}
}
/*********************************************************
 * Persistence
 *********************************************************/

 const Punishments = new (_class = class {
	/**
	 * ips is an ip:punishment Map
	 */
	 __init() {this.ips = new PunishmentMap()}
	/**
	 * userids is a userid:punishment Map
	 */
	 __init2() {this.userids = new PunishmentMap()}
	/**
	 * roomUserids is a roomid:userid:punishment nested Map
	 */
	 __init3() {this.roomUserids = new NestedPunishmentMap()}
	/**
	 * roomIps is a roomid:ip:punishment Map
	 */
	 __init4() {this.roomIps = new NestedPunishmentMap()}
	/**
	 * sharedIps is an ip:note Map
	 */
	 __init5() {this.sharedIps = new Map()}
	/**
	 * sharedIpBlacklist is an ip:note Map
	 */
	 __init6() {this.sharedIpBlacklist = new Map()}
	/**
	 * namefilterwhitelist is a whitelistedname:whitelister Map
	 */
	 __init7() {this.namefilterwhitelist = new Map()}
	/**
	 * Connection flood table. Separate table from IP bans.
	 */
	 __init8() {this.cfloods = new Set()}
	/**
	 * Participants in groupchats whose creators were banned from using groupchats.
	 * Object keys are roomids of groupchats; values are Sets of user IDs.
	 */
	 __init9() {this.bannedGroupchatParticipants = {}}
	/** roomid:timestamp map */
	 __init10() {this.lastGroupchatMonitorTime = {}}
	/**
	 * punishType is an allcaps string, for global punishments they can be
	 * anything in the punishmentTypes map.
	 *
	 * This map can be extended with custom punishments by chat plugins.
	 *
	 * Keys in the map correspond to punishTypes, values signify the way
	 * they should be displayed in /alt
	 *
	 */
	 __init11() {this.punishmentTypes = new Map([
		['LOCK', 'locked'],
		['BAN', 'globally banned'],
		['NAMELOCK', 'namelocked'],
	])}
	/**
	 * For room punishments, they can be anything in the roomPunishmentTypes map.
	 *
	 * This map can be extended with custom punishments by chat plugins.
	 *
	 * Keys in the map correspond to punishTypes, values signify the way they
	 * should be displayed in /alt.
	 * By default, this includes:
	 * - 'ROOMBAN'
	 * - 'BLACKLIST'
	 * - 'BATTLEBAN'
	 * - 'MUTE' (used by getRoomPunishments)
	 *
	 */
	 __init12() {this.roomPunishmentTypes = new Map([
		['ROOMBAN', 'banned'],
		['BLACKLIST', 'blacklisted'],
		['BATTLEBAN', 'battlebanned'],
		['MUTE', 'muted'],
		['GROUPCHATBAN', 'banned from using groupchats'],
	])}
	constructor() {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);_class.prototype.__init7.call(this);_class.prototype.__init8.call(this);_class.prototype.__init9.call(this);_class.prototype.__init10.call(this);_class.prototype.__init11.call(this);_class.prototype.__init12.call(this);
		setImmediate(() => {
			void exports.Punishments.loadPunishments();
			void exports.Punishments.loadRoomPunishments();
			void exports.Punishments.loadBanlist();
			void exports.Punishments.loadSharedIps();
			void exports.Punishments.loadSharedIpBlacklist();
			void exports.Punishments.loadWhitelistedNames();
		});
	}

	// punishments.tsv is in the format:
	// punishType, userid, ips/usernames, expiration time, reason
	// room-punishments.tsv is in the format:
	// punishType, roomid:userid, ips/usernames, expiration time, reason
	async loadPunishments() {
		const data = await _fs.FS.call(void 0, PUNISHMENT_FILE).readIfExists();
		if (!data) return;
		for (const row of data.split("\n")) {
			if (!row || row === '\r') continue;
			const [punishType, id, altKeys, expireTimeStr, ...reason] = row.trim().split("\t");
			const expireTime = Number(expireTimeStr);
			if (punishType === "Punishment") continue;
			const keys = altKeys.split(',').concat(id);

			const punishment = [punishType, id, expireTime, ...reason] ;
			if (Date.now() >= expireTime) {
				continue;
			}
			for (const key of keys) {
				if (!USERID_REGEX.test(key)) {
					exports.Punishments.ips.set(key, punishment);
				} else {
					exports.Punishments.userids.set(key, punishment);
				}
			}
		}
	}

	async loadRoomPunishments() {
		const data = await _fs.FS.call(void 0, ROOM_PUNISHMENT_FILE).readIfExists();
		if (!data) return;
		for (const row of data.split("\n")) {
			if (!row || row === '\r') continue;
			const [punishType, id, altKeys, expireTimeStr, ...reason] = row.trim().split("\t");
			const expireTime = Number(expireTimeStr);
			if (punishType === "Punishment") continue;
			const [roomid, userid] = id.split(':');
			if (!userid) continue; // invalid format
			const keys = altKeys.split(',').concat(userid);

			const punishment = [punishType, userid, expireTime, ...reason] ;
			if (Date.now() >= expireTime) {
				continue;
			}
			for (const key of keys) {
				if (!USERID_REGEX.test(key)) {
					exports.Punishments.roomIps.nestedSet(roomid , key, punishment);
				} else {
					exports.Punishments.roomUserids.nestedSet(roomid , key, punishment);
				}
			}
		}
	}

	savePunishments() {
		_fs.FS.call(void 0, PUNISHMENT_FILE).writeUpdate(() => {
			const saveTable = exports.Punishments.getPunishments();
			let buf = 'Punishment\tUser ID\tIPs and alts\tExpires\tReason\r\n';
			for (const [id, entry] of saveTable) {
				buf += exports.Punishments.renderEntry(entry, id);
			}
			return buf;
		});
	}

	saveRoomPunishments() {
		_fs.FS.call(void 0, ROOM_PUNISHMENT_FILE).writeUpdate(() => {
			const saveTable = new Map();
			for (const roomid of exports.Punishments.roomIps.keys()) {
				for (const [userid, punishment] of exports.Punishments.getPunishments(roomid, true)) {
					saveTable.set(`${roomid}:${userid}`, punishment);
				}
			}
			let buf = 'Punishment\tRoom ID:User ID\tIPs and alts\tExpires\tReason\r\n';
			for (const [id, entry] of saveTable) {
				buf += exports.Punishments.renderEntry(entry, id);
			}
			return buf;
		});
	}

	getEntry(entryId) {
		let entry = null;
		exports.Punishments.ips.forEach((punishment, ip) => {
			const [punishType, id, expireTime, reason, ...rest] = punishment;
			if (id !== entryId) return;
			if (entry) {
				entry.ips.push(ip);
				return;
			}

			entry = {
				userids: [],
				ips: [ip],
				punishType,
				expireTime,
				reason,
				rest,
			};
		});
		exports.Punishments.userids.forEach((punishment, userid) => {
			const [punishType, id, expireTime, reason, ...rest] = punishment;
			if (id !== entryId) return;

			if (!entry) {
				entry = {
					userids: [],
					ips: [],
					punishType,
					expireTime,
					reason,
					rest,
				};
			}

			if (userid !== id) entry.userids.push(toID(userid));
		});

		return entry;
	}

	appendPunishment(entry, id, filename, allowNonUserIDs) {
		if (!allowNonUserIDs && id.startsWith('#')) return;
		const buf = exports.Punishments.renderEntry(entry, id);
		return _fs.FS.call(void 0, filename).append(buf);
	}

	renderEntry(entry, id) {
		const keys = entry.ips.concat(entry.userids).join(',');
		const row = [entry.punishType, id, keys, entry.expireTime, entry.reason, ...entry.rest];
		return row.join('\t') + '\r\n';
	}

	async loadBanlist() {
		const data = await _fs.FS.call(void 0, 'config/ipbans.txt').readIfExists();
		if (!data) return;
		const rangebans = [];
		for (const row of data.split("\n")) {
			const ip = row.split('#')[0].trim();
			if (!ip) continue;
			if (ip.includes('/')) {
				rangebans.push(ip);
			} else if (!exports.Punishments.ips.has(ip)) {
				exports.Punishments.ips.set(ip, ['LOCK', '#ipban', Infinity, '']);
			}
		}
		exports.Punishments.checkRangeBanned = IPTools.checker(rangebans);
	}

	/**
	 * sharedips.tsv is in the format:
	 * IP, type (in this case always SHARED), note
	 */
	async loadSharedIps() {
		const data = await _fs.FS.call(void 0, SHAREDIPS_FILE).readIfExists();
		if (!data) return;
		for (const row of data.replace('\r', '').split("\n")) {
			if (!row) continue;
			const [ip, type, note] = row.trim().split("\t");
			if (!IPTools.ipRegex.test(ip)) continue;
			if (type !== 'SHARED') continue;

			exports.Punishments.sharedIps.set(ip, note);
		}
	}

	appendSharedIp(ip, note) {
		const buf = `${ip}\tSHARED\t${note}\r\n`;
		return _fs.FS.call(void 0, SHAREDIPS_FILE).append(buf);
	}

	saveSharedIps() {
		let buf = 'IP\tType\tNote\r\n';
		exports.Punishments.sharedIps.forEach((note, ip) => {
			buf += `${ip}\tSHARED\t${note}\r\n`;
		});

		return _fs.FS.call(void 0, SHAREDIPS_FILE).write(buf);
	}

	/**
	 * sharedips.tsv is in the format:
	 * IP, type (in this case always SHARED), note
	 */
	async loadSharedIpBlacklist() {
		const data = await _fs.FS.call(void 0, SHAREDIPS_BLACKLIST_FILE).readIfExists();
		if (!data) return;
		for (const row of data.replace('\r', '').split("\n")) {
			if (!row) continue;
			const [ip, reason] = row.trim().split("\t");
			if (!IPTools.ipRegex.test(ip)) continue;
			if (!reason) continue;

			exports.Punishments.sharedIpBlacklist.set(ip, reason);
		}
	}

	appendSharedIpBlacklist(ip, reason) {
		const buf = `${ip}\t${reason}\r\n`;
		return _fs.FS.call(void 0, SHAREDIPS_BLACKLIST_FILE).append(buf);
	}

	saveSharedIpBlacklist() {
		let buf = `IP\tReason\r\n`;
		exports.Punishments.sharedIpBlacklist.forEach((reason, ip) => {
			buf += `${ip}\t${reason}\r\n`;
		});
		return _fs.FS.call(void 0, SHAREDIPS_BLACKLIST_FILE).write(buf);
	}

	async loadWhitelistedNames() {
		const data = await _fs.FS.call(void 0, WHITELISTED_NAMES_FILE).readIfExists();
		if (!data) return;
		const lines = data.split('\n');
		lines.shift();
		for (const line of lines) {
			const [userid, whitelister] = line.split('\t');
			this.namefilterwhitelist.set(userid, whitelister);
		}
	}

	appendWhitelistedName(name, whitelister) {
		return _fs.FS.call(void 0, WHITELISTED_NAMES_FILE).append(`${toID(name)}\t${toID(whitelister)}\r\n`);
	}

	saveNameWhitelist() {
		let buf = `Userid\tWhitelister\t\r\n`;
		exports.Punishments.namefilterwhitelist.forEach((userid, whitelister) => {
			buf += `${userid}\t${whitelister}\r\n`;
		});
		return _fs.FS.call(void 0, WHITELISTED_NAMES_FILE).write(buf);
	}

	/*********************************************************
	 * Adding and removing
	 *********************************************************/

	async punish(user, punishment, ignoreAlts, bypassPunishmentfilter = false) {
		if (typeof user === 'string') {
			return exports.Punishments.punishName(user, punishment);
		}

		if (!punishment[1]) punishment[1] = (user ).getLastId();

		const userids = new Set();
		const ips = new Set();
		const mobileIps = new Set();
		const affected = ignoreAlts ? [user ] : (user ).getAltUsers(PUNISH_TRUSTED, true);
		for (const alt of affected) {
			await this.punishInner(alt, punishment, userids, ips, mobileIps);
		}

		const [punishType, id, expireTime, reason, ...rest] = punishment;
		userids.delete(id );
		void exports.Punishments.appendPunishment({
			userids: [...userids],
			ips: [...ips],
			punishType,
			expireTime,
			reason,
			rest,
		}, id, PUNISHMENT_FILE);

		if (mobileIps.size) {
			const mobileExpireTime = Date.now() + MOBILE_PUNISHMENT_DURATIION;
			const mobilePunishment = [punishType, id, mobileExpireTime, reason, ...rest] ;
			for (const mobileIp of mobileIps) {
				exports.Punishments.ips.set(mobileIp, mobilePunishment);
			}
		}

		if (!bypassPunishmentfilter) Chat.punishmentfilter(user, punishment);
		return affected;
	}

	async punishInner(user, punishment, userids, ips, mobileIps) {
		const existingPunishment = exports.Punishments.userids.get(user.locked || toID(user.name));
		if (existingPunishment) {
			// don't reduce the duration of an existing punishment
			if (existingPunishment[2] > punishment[2]) {
				punishment[2] = existingPunishment[2];
			}

			// don't override stronger punishment types
			const types = ['LOCK', 'NAMELOCK', 'BAN'];
			if (types.indexOf(existingPunishment[0]) > types.indexOf(punishment[0])) {
				punishment[0] = existingPunishment[0];
			}
		}

		for (const ip of user.ips) {
			const {hostType} = await IPTools.lookup(ip);
			if (hostType !== 'mobile') {
				exports.Punishments.ips.set(ip, punishment);
				ips.add(ip);
			} else {
				mobileIps.add(ip);
			}
		}
		const lastUserId = user.getLastId();
		if (!lastUserId.startsWith('guest')) {
			exports.Punishments.userids.set(lastUserId, punishment);
		}
		if (user.locked && !user.locked.startsWith('#')) {
			exports.Punishments.userids.set(user.locked, punishment);
			userids.add(user.locked );
		}
		if (user.autoconfirmed) {
			exports.Punishments.userids.set(user.autoconfirmed, punishment);
			userids.add(user.autoconfirmed);
		}
		if (user.trusted) {
			exports.Punishments.userids.set(user.trusted, punishment);
			userids.add(user.trusted);
		}
	}

	punishName(userid, punishment) {
		if (!punishment[1]) punishment[1] = userid;

		const foundKeys = exports.Punishments.search(userid).map(([key]) => key);
		const userids = new Set([userid]);
		const ips = new Set();
		for (const key of foundKeys) {
			if (key.includes('.')) {
				ips.add(key);
			} else {
				userids.add(key );
			}
		}
		for (const id of userids) {
			exports.Punishments.userids.set(id, punishment);
		}
		for (const ip of ips) {
			exports.Punishments.ips.set(ip, punishment);
		}
		const [punishType, id, expireTime, reason, ...rest] = punishment;
		const affected = Users.findUsers([...userids], [...ips], {includeTrusted: PUNISH_TRUSTED, forPunishment: true});
		userids.delete(id );
		void exports.Punishments.appendPunishment({
			userids: [...userids],
			ips: [...ips],
			punishType,
			expireTime,
			reason,
			rest,
		}, id, PUNISHMENT_FILE);

		Chat.punishmentfilter(userid, punishment);
		return affected;
	}

	unpunish(id, punishType) {
		id = toID(id);
		const punishment = exports.Punishments.userids.get(id);
		if (punishment) {
			id = punishment[1];
		}
		// in theory we can stop here if punishment doesn't exist, but
		// in case of inconsistent state, we'll try anyway

		let success = false;
		exports.Punishments.ips.forEach(([curPunishmentType, curId], key) => {
			if (curId === id && curPunishmentType === punishType) {
				exports.Punishments.ips.delete(key);
				success = id;
			}
		});
		exports.Punishments.userids.forEach(([curPunishmentType, curId], key) => {
			if (curId === id && curPunishmentType === punishType) {
				exports.Punishments.userids.delete(key);
				success = id;
			}
		});
		if (success) {
			exports.Punishments.savePunishments();
		}
		return success;
	}

	roomPunish(room, user, punishment) {
		if (typeof user === 'string') {
			return exports.Punishments.roomPunishName(room, user, punishment);
		}

		if (!punishment[1]) punishment[1] = (user ).getLastId();

		const roomid = typeof room !== 'string' ? (room ).roomid : room;
		const userids = new Set();
		const ips = new Set();
		const affected = (user ).getAltUsers(PUNISH_TRUSTED, true);
		for (const curUser of affected) {
			this.roomPunishInner(roomid, curUser, punishment, userids, ips);
		}

		const [punishType, id, expireTime, reason, ...rest] = punishment;
		userids.delete(id );
		void exports.Punishments.appendPunishment({
			userids: [...userids],
			ips: [...ips],
			punishType,
			expireTime,
			reason,
			rest,
		}, roomid + ':' + id, ROOM_PUNISHMENT_FILE);

		if (typeof room !== 'string') {
			room = room ;
			if (!(room.settings.isPrivate === true || room.settings.isPersonal)) {
				void exports.Punishments.monitorRoomPunishments(user);
			}
		}

		return affected;
	}

	roomPunishInner(roomid, user, punishment, userids, ips) {
		for (const ip of user.ips) {
			exports.Punishments.roomIps.nestedSet(roomid, ip, punishment);
			ips.add(ip);
		}
		if (!user.id.startsWith('guest')) {
			exports.Punishments.roomUserids.nestedSet(roomid, user.id, punishment);
		}
		if (user.autoconfirmed) {
			exports.Punishments.roomUserids.nestedSet(roomid, user.autoconfirmed, punishment);
			userids.add(user.autoconfirmed);
		}
		if (user.trusted) {
			exports.Punishments.roomUserids.nestedSet(roomid, user.trusted, punishment);
			userids.add(user.trusted);
		}
	}

	roomPunishName(room, userid, punishment) {
		if (!punishment[1]) punishment[1] = userid;

		const roomid = typeof room !== 'string' ? (room ).roomid : room;
		const foundKeys = exports.Punishments.search(userid).map(([key]) => key);
		const userids = new Set([userid]);
		const ips = new Set();
		for (const key of foundKeys) {
			if (key.includes('.')) {
				ips.add(key);
			} else {
				userids.add(key );
			}
		}
		for (const id of userids) {
			exports.Punishments.roomUserids.nestedSet(roomid, id, punishment);
		}
		for (const ip of ips) {
			exports.Punishments.roomIps.nestedSet(roomid, ip, punishment);
		}
		const [punishType, id, expireTime, reason, ...rest] = punishment;
		const affected = Users.findUsers([...userids], [...ips], {includeTrusted: PUNISH_TRUSTED, forPunishment: true});
		userids.delete(id );
		void exports.Punishments.appendPunishment({
			userids: [...userids],
			ips: [...ips],
			punishType,
			expireTime,
			reason,
			rest,
		}, roomid + ':' + id, ROOM_PUNISHMENT_FILE);

		if (typeof room !== 'string') {
			room = room ;
			if (!(room.settings.isPrivate === true || room.settings.isPersonal)) {
				void exports.Punishments.monitorRoomPunishments(userid);
			}
		}
		return affected;
	}

	/**
	 * @param ignoreWrite skip persistent storage
	 */
	roomUnpunish(room, id, punishType, ignoreWrite = false) {
		const roomid = typeof room !== 'string' ? (room ).roomid : room;
		id = toID(id);
		const punishment = exports.Punishments.roomUserids.nestedGet(roomid, id);
		if (punishment) {
			id = punishment[1];
		}
		// in theory we can stop here if punishment doesn't exist, but
		// in case of inconsistent state, we'll try anyway

		let success;
		const ipSubMap = exports.Punishments.roomIps.get(roomid);
		if (ipSubMap) {
			for (const [key, [curPunishmentType, curId]] of ipSubMap) {
				if (curId === id && curPunishmentType === punishType) {
					ipSubMap.delete(key);
					success = id;
				}
			}
		}
		const useridSubMap = exports.Punishments.roomUserids.get(roomid);
		if (useridSubMap) {
			for (const [key, [curPunishmentType, curId]] of useridSubMap) {
				if (curId === id && curPunishmentType === punishType) {
					useridSubMap.delete(key);
					success = id;
				}
			}
		}
		if (success && !ignoreWrite) {
			exports.Punishments.saveRoomPunishments();
		}
		return success;
	}

	/*********************************************************
	 * Specific punishments
	 *********************************************************/

	async ban(
		user, expireTime, id, ignoreAlts, ...reason
	) {
		if (!expireTime) expireTime = Date.now() + GLOBALBAN_DURATION;
		const punishment = ['BAN', id, expireTime, ...reason] ;

		const affected = await exports.Punishments.punish(user, punishment, ignoreAlts);
		for (const curUser of affected) {
			curUser.locked = punishment[1];
			curUser.disconnectAll();
		}

		return affected;
	}
	unban(name) {
		return exports.Punishments.unpunish(name, 'BAN');
	}
	async lock(
		user,
		expireTime,
		id,
		ignoreAlts,
		reason,
		bypassPunishmentfilter = false
	) {
		if (!expireTime) expireTime = Date.now() + LOCK_DURATION;
		const punishment = ['LOCK', id, expireTime, reason] ;

		const affected = await exports.Punishments.punish(user, punishment, ignoreAlts, bypassPunishmentfilter);

		for (const curUser of affected) {
			exports.Punishments.checkPunishmentTime(curUser, punishment);
			curUser.locked = punishment[1];
			curUser.updateIdentity();
		}

		return affected;
	}
	async autolock(
		user,
		room,
		source,
		reason,
		message,
		week = false,
		namelock
	) {
		if (!message) message = reason;

		let punishment = `LOCK`;
		let expires = null;
		if (week) {
			expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
			punishment = `WEEKLOCK`;
		}

		const userid = toID(user);
		if (_optionalChain([Users, 'access', _ => _.get, 'call', _2 => _2(user), 'optionalAccess', _3 => _3.locked])) return false;
		const name = typeof user === 'string' ? user : (user ).name;
		if (namelock) {
			punishment = `NAME${punishment}`;
			await exports.Punishments.namelock(user, expires, toID(namelock), false, `Autonamelock: ${name}: ${reason}`);
		} else {
			await exports.Punishments.lock(user, expires, userid, false, `Autolock: ${name}: ${reason}`);
		}
		Monitor.log(`[${source}] ${punishment}ED: ${message}`);

		const logEntry = {
			action: `AUTO${punishment}`,
			visualRoomID: typeof room !== 'string' ? (room ).roomid : room,
			ip: typeof user !== 'string' ? (user ).latestIp : null,
			userid: userid,
			note: reason,
			isGlobal: true,
		};
		if (typeof user !== 'string') logEntry.ip = (user ).latestIp;

		const roomObject = Rooms.get(room);
		const userObject = Users.get(user);

		if (roomObject) {
			roomObject.modlog(logEntry);
		} else {
			Rooms.global.modlog(logEntry);
		}

		if (_optionalChain([roomObject, 'optionalAccess', _4 => _4.battle]) && userObject && userObject.connections[0]) {
			Chat.parse('/savereplay forpunishment', roomObject, userObject, userObject.connections[0]);
		}

		const roomauth = Rooms.global.destroyPersonalRooms(userid);
		if (roomauth.length) {
			Monitor.log(`[CrisisMonitor] Autolocked user ${name} has public roomauth (${roomauth.join(', ')}), and should probably be demoted.`);
		}
	}
	unlock(name) {
		const user = Users.get(name);
		let id = toID(name);
		const success = [];
		if (_optionalChain([user, 'optionalAccess', _5 => _5.locked]) && !user.namelocked) {
			id = user.locked;
			user.locked = null;
			user.namelocked = null;
			user.destroyPunishmentTimer();
			user.updateIdentity();
			success.push(user.getLastName());
		}
		if (!id.startsWith('#')) {
			for (const curUser of Users.users.values()) {
				if (curUser.locked === id) {
					curUser.locked = null;
					curUser.namelocked = null;
					curUser.destroyPunishmentTimer();
					curUser.updateIdentity();
					success.push(curUser.getLastName());
				}
			}
		}
		if (exports.Punishments.unpunish(name, 'LOCK')) {
			if (!success.length) success.push(name);
		}
		if (!success.length) return undefined;
		if (!success.some(v => toID(v) === id)) {
			success.push(id);
		}
		return success;
	}
	/**
	 * Sets the punishment timer for a user,
	 * to either MAX_PUNISHMENT_TIMER_LENGTH or the amount of time left on the punishment.
	 * It also expires a punishment if the time is up.
	 */
	checkPunishmentTime(user, punishment) {
		if (user.punishmentTimer) {
			clearTimeout(user.punishmentTimer);
			user.punishmentTimer = null;
		}

		const [, id, expireTime] = punishment;

		const timeLeft = expireTime - Date.now();
		if (timeLeft <= 1) {
			if (user.locked === id) exports.Punishments.unlock(user.id);
			return;
		}
		const waitTime = Math.min(timeLeft, MAX_PUNISHMENT_TIMER_LENGTH);
		user.punishmentTimer = setTimeout(() => {
			exports.Punishments.checkPunishmentTime(user, punishment);
		}, waitTime);
	}
	async namelock(
		user, expireTime, id, ignoreAlts, ...reason
	) {
		if (!expireTime) expireTime = Date.now() + LOCK_DURATION;
		const punishment = ['NAMELOCK', id, expireTime, ...reason] ;

		const affected = await exports.Punishments.punish(user, punishment, ignoreAlts);
		for (const curUser of affected) {
			exports.Punishments.checkPunishmentTime(curUser, punishment);
			curUser.locked = punishment[1];
			curUser.namelocked = punishment[1];
			curUser.resetName(true);
			curUser.updateIdentity();
		}

		return affected;
	}
	unnamelock(name) {
		const user = Users.get(name);
		let id = toID(name);
		const success = [];
		if (_optionalChain([user, 'optionalAccess', _6 => _6.namelocked])) name = user.namelocked;

		const unpunished = exports.Punishments.unpunish(name, 'NAMELOCK');
		if (_optionalChain([user, 'optionalAccess', _7 => _7.locked])) {
			id = user.locked;
			user.locked = null;
			user.namelocked = null;
			user.destroyPunishmentTimer();
			user.resetName();
			success.push(user.getLastName());
		}
		if (!id.startsWith('#')) {
			for (const curUser of Users.users.values()) {
				if (curUser.locked === id) {
					curUser.locked = null;
					curUser.namelocked = null;
					curUser.destroyPunishmentTimer();
					curUser.resetName();
					success.push(curUser.getLastName());
				}
			}
		}
		if (unpunished && !success.length) success.push(name);
		if (!success.length) return false;
		if (!success.some(v => toID(v) === id)) {
			success.push(id);
		}
		return success;
	}
	battleban(user, expireTime, id, ...reason) {
		if (!expireTime) expireTime = Date.now() + BATTLEBAN_DURATION;
		const punishment = ['BATTLEBAN', id, expireTime, ...reason] ;

		// Handle tournaments the user was in before being battle banned
		for (const games of user.games.keys()) {
			const game = Rooms.get(games).getGame(Tournaments.Tournament);
			if (!game) continue; // this should never happen
			if (game.isTournamentStarted) {
				game.disqualifyUser(user.id, null, null);
			} else if (!game.isTournamentStarted) {
				game.removeUser(user.id);
			}
		}

		return exports.Punishments.roomPunish("battle", user, punishment);
	}
	unbattleban(userid) {
		const user = Users.get(userid);
		if (user) {
			const punishment = exports.Punishments.isBattleBanned(user);
			if (punishment) userid = punishment[1];
		}
		return exports.Punishments.roomUnpunish("battle", userid, 'BATTLEBAN');
	}
	isBattleBanned(user) {
		if (!user) throw new Error(`Trying to check if a non-existent user is battlebanned.`);

		let punishment = exports.Punishments.roomUserids.nestedGet("battle", user.id);
		if (punishment && punishment[0] === 'BATTLEBAN') return punishment;

		if (user.autoconfirmed) {
			punishment = exports.Punishments.roomUserids.nestedGet("battle", user.autoconfirmed);
			if (punishment && punishment[0] === 'BATTLEBAN') return punishment;
		}

		for (const ip of user.ips) {
			punishment = exports.Punishments.roomIps.nestedGet("battle", ip);
			if (punishment && punishment[0] === 'BATTLEBAN') {
				if (exports.Punishments.sharedIps.has(ip) && user.autoconfirmed) return;
				return punishment;
			}
		}
	}

	/**
	 * Bans a user from using groupchats. Returns an array of roomids of the groupchat they created, if any.
	 * We don't necessarily want to delete these, since we still need to warn the participants,
	 * and make a modnote of the participant names, which doesn't seem appropriate for a Punishments method.
	 */
	groupchatBan(user, expireTime, id, reason) {
		if (!expireTime) expireTime = Date.now() + GROUPCHATBAN_DURATION;
		const punishment = ['GROUPCHATBAN', id, expireTime, reason] ;

		const groupchatsCreated = [];
		const targetUser = Users.get(user);
		if (targetUser) {
			for (const roomid of targetUser.inRooms || []) {
				const targetRoom = Rooms.get(roomid);
				if (!_optionalChain([targetRoom, 'optionalAccess', _8 => _8.roomid, 'access', _9 => _9.startsWith, 'call', _10 => _10('groupchat-')])) continue;
				if (targetRoom.game && targetRoom.game.removeBannedUser) {
					targetRoom.game.removeBannedUser(targetUser);
				}
				targetUser.leaveRoom(targetRoom.roomid);

				// Handle groupchats that the user created
				if (targetRoom.auth.get(targetUser) === Users.HOST_SYMBOL) {
					groupchatsCreated.push(targetRoom.roomid);
					exports.Punishments.bannedGroupchatParticipants[targetRoom.roomid] = new Set(
						// Room#users is a UserTable where the keys are IDs,
						// but typed as strings so that they can be used as object keys.
						Object.keys(targetRoom.users) 
					);
				}
			}
		}

		exports.Punishments.roomPunish("groupchat", user, punishment);
		return groupchatsCreated;
	}

	groupchatUnban(user) {
		let userid = (typeof user === 'object' ? (user ).id : user);

		const punishment = exports.Punishments.isGroupchatBanned(user);
		if (punishment) userid = punishment[1] ;

		return exports.Punishments.roomUnpunish("groupchat", userid, 'GROUPCHATBAN');
	}

	isGroupchatBanned(user) {
		const userid = toID(user);
		const targetUser = Users.get(user);

		let punishment = exports.Punishments.roomUserids.nestedGet("groupchat", userid);
		if (_optionalChain([punishment, 'optionalAccess', _11 => _11[0]]) === 'GROUPCHATBAN') return punishment;

		if (_optionalChain([targetUser, 'optionalAccess', _12 => _12.autoconfirmed])) {
			punishment = exports.Punishments.roomUserids.nestedGet("groupchat", targetUser.autoconfirmed);
			if (_optionalChain([punishment, 'optionalAccess', _13 => _13[0]]) === 'GROUPCHATBAN') return punishment;
		}

		if (targetUser && !targetUser.trusted) {
			for (const ip of targetUser.ips) {
				punishment = exports.Punishments.roomIps.nestedGet("groupchat", ip);
				if (_optionalChain([punishment, 'optionalAccess', _14 => _14[0]]) === 'GROUPCHATBAN') {
					if (exports.Punishments.sharedIps.has(ip) && targetUser.autoconfirmed) return;
					return punishment;
				}
			}
		}
	}

	/**
	 * Monitors a groupchat, watching in case too many users who had participated in
	 * a groupchat that was deleted because its owner was groupchatbanned join.
	 */
	monitorGroupchatJoin(room, newUser) {
		if (exports.Punishments.lastGroupchatMonitorTime[room.roomid] > (Date.now() - GROUPCHAT_MONITOR_INTERVAL)) return;
		const newUserID = toID(newUser);
		for (const [roomid, participants] of Object.entries(exports.Punishments.bannedGroupchatParticipants)) {
			if (!participants.has(newUserID)) continue;
			let overlap = 0;
			for (const participant of participants) {
				if (participant in room.users || room.auth.has(participant)) overlap++;
			}
			if (overlap > GROUPCHAT_PARTICIPANT_OVERLAP_THRESHOLD) {
				let html = `|html|[GroupchatMonitor] The groupchat «<a href="/${room.roomid}">${room.roomid}</a>» `;
				if (Config.modloglink) html += `(<a href="${Config.modloglink(new Date(), room.roomid)}">logs</a>) `;

				html += `includes ${overlap} participants from forcibly deleted groupchat «<a href="/${roomid}">${roomid}</a>»`;
				if (Config.modloglink) html += ` (<a href="${Config.modloglink(new Date(), roomid)}">logs</a>)`;
				html += `.`;

				Rooms.global.notifyRooms(['staff'], html);
				exports.Punishments.lastGroupchatMonitorTime[room.roomid] = Date.now();
			}
		}
	}

	lockRange(range, reason, expireTime) {
		if (!expireTime) expireTime = Date.now() + RANGELOCK_DURATION;
		const punishment = ['LOCK', '#rangelock', expireTime, reason] ;
		exports.Punishments.ips.set(range, punishment);

		const ips = [];
		const parsedRange = IPTools.stringToRange(range);
		if (!parsedRange) throw new Error(`Invalid IP range: ${range}`);
		const {minIP, maxIP} = parsedRange;

		for (let ipNumber = minIP; ipNumber <= maxIP; ipNumber++) {
			ips.push(IPTools.numberToIP(ipNumber));
		}

		void exports.Punishments.appendPunishment({
			userids: [],
			ips,
			punishType: 'LOCK',
			expireTime,
			reason,
			rest: [],
		}, '#rangelock', PUNISHMENT_FILE, true);
	}
	banRange(range, reason, expireTime) {
		if (!expireTime) expireTime = Date.now() + RANGELOCK_DURATION;
		const punishment = ['BAN', '#rangelock', expireTime, reason] ;
		exports.Punishments.ips.set(range, punishment);
	}

	roomBan(room, user, expireTime, id, ...reason) {
		if (!expireTime) expireTime = Date.now() + ROOMBAN_DURATION;
		const punishment = ['ROOMBAN', id, expireTime, ...reason] ;

		const affected = exports.Punishments.roomPunish(room, user, punishment);
		for (const curUser of affected) {
			if (room.game && room.game.removeBannedUser) {
				room.game.removeBannedUser(curUser);
			}
			curUser.leaveRoom(room.roomid);
		}

		if (room.subRooms) {
			for (const subRoom of room.subRooms.values()) {
				for (const curUser of affected) {
					if (subRoom.game && subRoom.game.removeBannedUser) {
						subRoom.game.removeBannedUser(curUser);
					}
					curUser.leaveRoom(subRoom.roomid);
				}
			}
		}

		return affected;
	}

	roomBlacklist(room, user, expireTime, id, ...reason) {
		if (!expireTime) expireTime = Date.now() + BLACKLIST_DURATION;
		const punishment = ['BLACKLIST', id, expireTime, ...reason] ;

		const affected = exports.Punishments.roomPunish(room, user, punishment);

		for (const curUser of affected) {
			if (room.game && room.game.removeBannedUser) {
				room.game.removeBannedUser(curUser);
			}
			curUser.leaveRoom(room.roomid);
		}

		if (room.subRooms) {
			for (const subRoom of room.subRooms.values()) {
				for (const curUser of affected) {
					if (subRoom.game && subRoom.game.removeBannedUser) {
						subRoom.game.removeBannedUser(curUser);
					}
					curUser.leaveRoom(subRoom.roomid);
				}
			}
		}

		return affected;
	}

	roomUnban(room, userid) {
		const user = Users.get(userid);
		if (user) {
			const punishment = exports.Punishments.isRoomBanned(user, room.roomid);
			if (punishment) userid = punishment[1];
		}
		return exports.Punishments.roomUnpunish(room, userid, 'ROOMBAN');
	}

	/**
	 * @param ignoreWrite Flag to skip persistent storage.
	 */
	roomUnblacklist(room, userid, ignoreWrite) {
		const user = Users.get(userid);
		if (user) {
			const punishment = exports.Punishments.isRoomBanned(user, room.roomid);
			if (punishment) userid = punishment[1];
		}
		return exports.Punishments.roomUnpunish(room, userid, 'BLACKLIST', ignoreWrite);
	}

	roomUnblacklistAll(room) {
		const roombans = exports.Punishments.roomUserids.get(room.roomid);
		if (!roombans) return false;

		const unblacklisted = [];

		roombans.forEach(([punishType], userid) => {
			if (punishType === 'BLACKLIST') {
				exports.Punishments.roomUnblacklist(room, userid, true);
				unblacklisted.push(userid);
			}
		});
		if (unblacklisted.length === 0) return false;
		exports.Punishments.saveRoomPunishments();
		return unblacklisted;
	}

	addSharedIp(ip, note) {
		exports.Punishments.sharedIps.set(ip, note);
		void exports.Punishments.appendSharedIp(ip, note);

		for (const user of Users.users.values()) {
			if (user.locked && user.locked !== user.id && user.ips.includes(ip)) {
				if (!user.autoconfirmed) {
					user.semilocked = `#sharedip ${user.locked}` ;
				}
				user.locked = null;
				user.namelocked = null;
				user.destroyPunishmentTimer();

				user.updateIdentity();
			}
		}
	}

	removeSharedIp(ip) {
		exports.Punishments.sharedIps.delete(ip);
		void exports.Punishments.saveSharedIps();
	}

	addBlacklistedSharedIp(ip, reason) {
		void exports.Punishments.appendSharedIpBlacklist(ip, reason);
		exports.Punishments.sharedIpBlacklist.set(ip, reason);
	}

	removeBlacklistedSharedIp(ip) {
		exports.Punishments.sharedIpBlacklist.delete(ip);
		void exports.Punishments.saveSharedIpBlacklist();
	}

	whitelistName(name, whitelister) {
		if (this.namefilterwhitelist.has(name)) return false;
		name = toID(name);
		whitelister = toID(whitelister);
		this.namefilterwhitelist.set(name, whitelister);
		void this.appendWhitelistedName(name, whitelister);
		return true;
	}

	unwhitelistName(name) {
		name = toID(name);
		if (!this.namefilterwhitelist.has(name)) return false;
		this.namefilterwhitelist.delete(name);
		void this.saveNameWhitelist();
		return true;
	}

	/*********************************************************
	 * Checking
	 *********************************************************/

	/**
	 * Returns an array of [key, roomid, punishment] pairs.
	 *
	 * @param searchId userid or IP
	 */
	search(searchId) {
		/** [key, roomid, punishment][] */
		const results = [];
		exports.Punishments.ips.forEach((punishment, ip) => {
			const [, id] = punishment;

			if (searchId === id || searchId === ip) {
				results.push([ip, '', punishment]);
			}
		});
		exports.Punishments.userids.forEach((punishment, userid) => {
			const [, id] = punishment;

			if (searchId === id || searchId === userid) {
				results.push([userid, '', punishment]);
			}
		});
		exports.Punishments.roomIps.nestedForEach((punishment, roomid, ip) => {
			const [, punishUserid] = punishment;

			if (searchId === punishUserid || searchId === ip) {
				results.push([ip, roomid, punishment]);
			}
		});
		exports.Punishments.roomUserids.nestedForEach((punishment, roomid, userid) => {
			const [, punishUserid] = punishment;

			if (searchId === punishUserid || searchId === userid) {
				results.push([userid, roomid, punishment]);
			}
		});

		return results;
	}

	getPunishType(name) {
		let punishment = exports.Punishments.userids.get(toID(name));
		if (punishment) return punishment[0];
		const user = Users.get(name);
		if (!user) return;
		punishment = exports.Punishments.ipSearch(user.latestIp);
		if (punishment) return punishment[0];
		return '';
	}

	getRoomPunishType(room, name) {
		let punishment = exports.Punishments.roomUserids.nestedGet(room.roomid, toID(name));
		if (punishment) return punishment[0];
		const user = Users.get(name);
		if (!user) return;
		punishment = exports.Punishments.roomIps.nestedGet(room.roomid, user.latestIp);
		if (punishment) return punishment[0];
		return '';
	}

	/**
	 * Searches for IP in Punishments.ips
	 *
	 * For instance, if IP is '1.2.3.4', will return the value corresponding
	 * to any of the keys in table match '1.2.3.4', '1.2.3.*', '1.2.*', or '1.*'
	 *
	 */
	ipSearch(ip) {
		let punishment = exports.Punishments.ips.get(ip);
		if (punishment) return punishment;
		let dotIndex = ip.lastIndexOf('.');
		for (let i = 0; i < 4 && dotIndex > 0; i++) {
			ip = ip.substr(0, dotIndex);
			punishment = exports.Punishments.ips.get(ip + '.*');
			if (punishment) return punishment;
			dotIndex = ip.lastIndexOf('.');
		}
		return undefined;
	}

	/** Defined in Punishments.loadBanlist */
	checkRangeBanned(ip) {
		return false;
	}

	checkName(user, userid, registered) {
		if (userid.startsWith('guest')) return;
		for (const roomid of user.inRooms) {
			exports.Punishments.checkNewNameInRoom(user, userid, roomid);
		}
		let punishment = exports.Punishments.userids.get(userid);
		const battleban = exports.Punishments.isBattleBanned(user);
		if (!punishment && user.namelocked) {
			punishment = exports.Punishments.userids.get(user.namelocked);
			if (!punishment) punishment = ['NAMELOCK', user.namelocked, 0, ''];
		}
		if (!punishment && user.locked) {
			punishment = exports.Punishments.userids.get(user.locked);
			if (!punishment) punishment = ['LOCK', user.locked, 0, ''];
		}

		const ticket = _optionalChain([Chat, 'access', _15 => _15.pages, 'optionalAccess', _16 => _16.help]) ?
			`<a href="view-help-request--appeal"><button class="button"><strong>Appeal your punishment</strong></button></a>` : '';

		if (battleban) {
			if (battleban[1] !== user.id && exports.Punishments.sharedIps.has(user.latestIp) && user.autoconfirmed) {
				exports.Punishments.roomUnpunish("battle", userid, 'BATTLEBAN');
			} else {
				exports.Punishments.roomPunish("battle", user, battleban);
				user.cancelReady();
				if (!punishment) {
					const appealLink = ticket || (Config.appealurl ? `appeal at: ${Config.appealurl}` : ``);
					// Prioritize popups for other global punishments
					user.send(`|popup||html|You are banned from battling${battleban[1] !== userid ? ` because you have the same IP as banned user: ${battleban[1]}` : ''}. Your battle ban will expire in a few days.${battleban[3] ? _utils.Utils.html `\n\nReason: ${battleban[3]}` : ``}${appealLink ? `\n\nOr you can ${appealLink}.` : ``}`);
					user.notified.punishment = true;
					return;
				}
			}
		}
		if (!punishment) return;

		const id = punishment[0];
		const punishUserid = punishment[1];
		const reason = punishment[3] ? _utils.Utils.html`\n\nReason: ${punishment[3]}` : '';
		let appeal = ``;
		if (user.permalocked && Config.appealurl) {
			appeal += `\n\nPermanent punishments can be appealed: <a href="${Config.appealurl}">${Config.appealurl}</a>`;
		} else if (ticket) {
			appeal += `\n\nIf you feel you were unfairly punished or wish to otherwise appeal, you can ${ticket}.`;
		} else if (Config.appealurl) {
			appeal += `\n\nIf you wish to appeal your punishment, please use: <a href="${Config.appealurl}">${Config.appealurl}</a>`;
		}
		const bannedUnder = punishUserid !== userid ? ` because you have the same IP as banned user: ${punishUserid}` : '';

		if ((id === 'LOCK' || id === 'NAMELOCK') && punishUserid !== userid && exports.Punishments.sharedIps.has(user.latestIp)) {
			if (!user.autoconfirmed) {
				user.semilocked = `#sharedip ${user.locked}` ;
			}
			user.locked = null;
			user.namelocked = null;
			user.destroyPunishmentTimer();
			user.updateIdentity();
			return;
		}
		if (registered && id === 'BAN') {
			user.popup(
				`Your username (${user.name}) is banned${bannedUnder}. Your ban will expire in a few days.${reason}` +
				`${Config.appealurl ? `||||Or you can appeal at: ${Config.appealurl}` : ``}`
			);
			user.notified.punishment = true;
			void exports.Punishments.punish(user, punishment, false);
			user.disconnectAll();
			return;
		}
		if (id === 'NAMELOCK' || user.namelocked) {
			user.send(`|popup||html|You are namelocked and can't have a username${bannedUnder}. Your namelock will expire in a few days.${reason}${appeal}`);
			user.locked = punishUserid;
			user.namelocked = punishUserid;
			user.resetName();
			user.updateIdentity();
		} else {
			if (punishUserid === '#hostfilter' || punishUserid === '#ipban') {
				user.send(`|popup||html|Your IP (${user.latestIp}) is currently locked due to being a proxy. We automatically lock these connections since they are used to spam, hack, or otherwise attack our server. Disable any proxies you are using to connect to PS.\n\n<a href="view-help-request--appeal"><button class="button">Help me with a lock from a proxy</button></a>`);
			} else if (user.latestHostType === 'proxy' && user.locked !== user.id) {
				user.send(`|popup||html|You are locked${bannedUnder} on the IP (${user.latestIp}), which is a proxy. We automatically lock these connections since they are used to spam, hack, or otherwise attack our server. Disable any proxies you are using to connect to PS.\n\n<a href="view-help-request--appeal"><button class="button">Help me with a lock from a proxy</button></a>`);
			} else if (!user.notified.lock) {
				user.send(`|popup||html|You are locked${bannedUnder}. ${user.permalocked ? `This lock is permanent.` : `Your lock will expire in a few days.`}${reason}${appeal}`);
			}
			user.notified.lock = true;
			user.locked = punishUserid;
			user.updateIdentity();
		}
		exports.Punishments.checkPunishmentTime(user, punishment);
	}

	checkIp(user, connection) {
		const ip = connection.ip;
		let punishment = exports.Punishments.ipSearch(ip);

		if (!punishment && exports.Punishments.checkRangeBanned(ip)) {
			punishment = ['LOCK', '#ipban', Infinity, ''];
		}

		if (punishment) {
			if (exports.Punishments.sharedIps.has(user.latestIp)) {
				if (!user.locked && !user.autoconfirmed) {
					user.semilocked = `#sharedip ${punishment[1]}` ;
				}
			} else {
				user.locked = punishment[1];
				if (punishment[0] === 'NAMELOCK') {
					user.namelocked = punishment[1];
				}
				exports.Punishments.checkPunishmentTime(user, punishment);
			}
		}

		return IPTools.lookup(ip).then(({dnsbl, host, hostType}) => {
			user = connection.user || user;

			if (hostType === 'proxy' && !user.trusted && !user.locked) {
				user.locked = '#hostfilter';
			} else if (dnsbl && !user.autoconfirmed) {
				user.semilocked = '#dnsbl';
			}
			if (host) {
				user.latestHost = host;
				user.latestHostType = hostType;
			}
			Chat.hostfilter(host || '', user, connection, hostType);
		});
	}

	/**
	 * IP bans need to be checked separately since we don't even want to
	 * make a User object if an IP is banned.
	 */
	checkIpBanned(connection) {
		const ip = connection.ip;
		if (exports.Punishments.cfloods.has(ip) || (Monitor.countConnection(ip) && exports.Punishments.cfloods.add(ip))) {
			connection.send(`|popup||modal|PS is under heavy load and cannot accommodate your connection right now.`);
			return '#cflood';
		}

		if (exports.Punishments.sharedIps.has(ip)) return false;

		let banned = false;
		const punishment = exports.Punishments.ipSearch(ip);
		if (punishment && punishment[0] === 'BAN') {
			banned = punishment[1];
		}
		if (!banned) return false;

		const appeal = (Config.appealurl ? `||||Or you can appeal at: ${Config.appealurl}` : ``);
		connection.send(`|popup||modal|You are banned because you have the same IP (${ip}) as banned user '${banned}'. Your ban will expire in a few days.${appeal}`);
		Monitor.notice(`CONNECT BLOCKED - IP BANNED: ${ip} (${banned})`);

		return banned;
	}

	checkNameInRoom(user, roomid) {
		let punishment = exports.Punishments.roomUserids.nestedGet(roomid, user.id);
		if (!punishment && user.autoconfirmed) {
			punishment = exports.Punishments.roomUserids.nestedGet(roomid, user.autoconfirmed);
		}
		if (punishment && (punishment[0] === 'ROOMBAN' || punishment[0] === 'BLACKLIST')) {
			return true;
		}
		const room = Rooms.get(roomid);
		if (room.parent) {
			return exports.Punishments.checkNameInRoom(user, room.parent.roomid);
		}
		return false;
	}

	/**
	 * @param userid The name into which the user is renamed.
	 */
	checkNewNameInRoom(user, userid, roomid) {
		let punishment = exports.Punishments.roomUserids.nestedGet(roomid, userid) || null;
		if (!punishment) {
			const room = Rooms.get(roomid);
			if (room.parent) {
				punishment = exports.Punishments.checkNewNameInRoom(user, userid, room.parent.roomid);
			}
		}
		if (punishment) {
			if (punishment[0] !== 'ROOMBAN' && punishment[0] !== 'BLACKLIST') return null;
			const room = Rooms.get(roomid);
			if (room.game && room.game.removeBannedUser) {
				room.game.removeBannedUser(user);
			}
			user.leaveRoom(room.roomid);
			return punishment;
		}
		return null;
	}

	/**
	 * @return Descriptive text for the remaining time until the punishment expires, if any.
	 */
	checkLockExpiration(userid) {
		if (!userid) return ``;
		const punishment = exports.Punishments.userids.get(userid);
		const user = Users.get(userid);
		if (_optionalChain([user, 'optionalAccess', _17 => _17.permalocked])) return ` (never expires; you are permalocked)`;

		return exports.Punishments.checkPunishmentExpiration(punishment);
	}

	checkPunishmentExpiration(punishment) {
		if (!punishment) return ``;
		const expiresIn = new Date(punishment[2]).getTime() - Date.now();
		const expiresDays = Math.round(expiresIn / 1000 / 60 / 60 / 24);
		let expiresText = '';
		if (expiresDays >= 1) {
			expiresText = `in around ${Chat.count(expiresDays, "days")}`;
		} else {
			expiresText = `soon`;
		}
		if (expiresIn > 1) return ` (expires ${expiresText})`;
	}

	isRoomBanned(user, roomid) {
		if (!user) throw new Error(`Trying to check if a non-existent user is room banned.`);

		let punishment = exports.Punishments.roomUserids.nestedGet(roomid, user.id);
		if (punishment && (punishment[0] === 'ROOMBAN' || punishment[0] === 'BLACKLIST')) return punishment;

		if (user.autoconfirmed) {
			punishment = exports.Punishments.roomUserids.nestedGet(roomid, user.autoconfirmed);
			if (punishment && (punishment[0] === 'ROOMBAN' || punishment[0] === 'BLACKLIST')) return punishment;
		}

		if (!user.trusted) {
			for (const ip of user.ips) {
				punishment = exports.Punishments.roomIps.nestedGet(roomid, ip);
				if (punishment) {
					if (punishment[0] === 'ROOMBAN') {
						return punishment;
					} else if (punishment[0] === 'BLACKLIST') {
						if (exports.Punishments.sharedIps.has(ip) && user.autoconfirmed) return;

						return punishment;
					}
				}
			}
		}

		const room = Rooms.get(roomid);
		if (!room) throw new Error(`Trying to ban a user from a nonexistent room: ${roomid}`);

		if (room.parent) return exports.Punishments.isRoomBanned(user, room.parent.roomid);
	}

	/**
	 * Returns an array of all room punishments associated with a user.
	 *
	 * options.publicOnly will make this only return public room punishments.
	 * options.checkIps will also check the IP of the user for IP-based punishments.
	 */
	getRoomPunishments(user, options = {}) {
		if (!user) return [];
		const userid = toID(user);
		const checkMutes = typeof user !== 'string';

		const punishments = [];

		for (const curRoom of Rooms.global.chatRooms) {
			if (
				!curRoom || curRoom.settings.isPrivate === true ||
				(options.publicOnly && curRoom.settings.isPersonal)
			) continue;
			let punishment = exports.Punishments.roomUserids.nestedGet(curRoom.roomid, userid);
			if (punishment) {
				punishments.push([curRoom, punishment]);
				continue;
			} else if (_optionalChain([options, 'optionalAccess', _18 => _18.checkIps])) {
				if (typeof user !== 'string') {
					let longestIPPunishment;
					for (const ip of user.ips) {
						punishment = exports.Punishments.roomIps.nestedGet(curRoom.roomid, ip);
						if (punishment && (!longestIPPunishment || punishment[2] > longestIPPunishment[2])) {
							longestIPPunishment = punishment;
						}
					}
					if (longestIPPunishment) {
						punishments.push([curRoom, longestIPPunishment]);
						continue;
					}
				}
			}
			if (checkMutes && curRoom.muteQueue) {
				for (const entry of curRoom.muteQueue) {
					// checkMutes guarantees user is a User
					if (userid === entry.userid ||
						(user ).guestNum === entry.guestNum ||
						((user ).autoconfirmed && (user ).autoconfirmed === entry.autoconfirmed)) {
						punishments.push([curRoom, ['MUTE', entry.userid, entry.time, ''] ]);
					}
				}
			}
		}

		return punishments;
	}
	getPunishments(roomid, ignoreMutes) {
		const punishmentTable = new Map();
		if (roomid && (!exports.Punishments.roomIps.has(roomid) || !exports.Punishments.roomUserids.has(roomid))) return punishmentTable;
		// `Punishments.roomIps.get(roomid)` guaranteed to exist above
		(roomid ? exports.Punishments.roomIps.get(roomid) : exports.Punishments.ips).forEach((punishment, ip) => {
			const [punishType, id, expireTime, reason, ...rest] = punishment;
			if (id.startsWith('#')) return;
			let entry = punishmentTable.get(id);

			if (entry) {
				entry.ips.push(ip);
				return;
			}

			entry = {
				userids: [],
				ips: [ip],
				punishType,
				expireTime,
				reason,
				rest,
			};
			punishmentTable.set(id, entry);
		});
		// `Punishments.roomIps.get(roomid)` guaranteed to exist above
		(roomid ? exports.Punishments.roomUserids.get(roomid) : exports.Punishments.userids).forEach((punishment, userid) => {
			const [punishType, id, expireTime, reason, ...rest] = punishment;
			if (id.startsWith('#')) return;
			let entry = punishmentTable.get(id);

			if (!entry) {
				entry = {
					userids: [],
					ips: [],
					punishType,
					expireTime,
					reason,
					rest,
				};
				punishmentTable.set(id, entry);
			}

			if (userid !== id) entry.userids.push(userid ); // guaranteed as per above check
		});
		if (roomid && ignoreMutes !== false) {
			const room = Rooms.get(roomid);
			if (_optionalChain([room, 'optionalAccess', _19 => _19.muteQueue])) {
				for (const mute of room.muteQueue) {
					punishmentTable.set(mute.userid, {
						userids: [], ips: [], punishType: "MUTE", expireTime: mute.time, reason: "", rest: [],
					});
				}
			}
		}
		return punishmentTable;
	}
	visualizePunishments(punishments, user) {
		let buf = "";
		buf += `<div class="ladder pad"><h2>List of active punishments:</h2>`;
		buf += `<table">`;
		buf += `<tr>`;
		buf += `<th>Username</th>`;
		buf += `<th>Punishment type</th>`;
		buf += `<th>Expire time</th>`;
		buf += `<th>Reason</th>`;
		buf += `<th>Alts</th>`;
		if (user.can('ip')) buf += `<th>IPs</th>`;
		buf += `</tr>`;
		for (const [userid, punishment] of punishments) {
			const expiresIn = new Date(punishment.expireTime).getTime() - Date.now();
			if (expiresIn < 1000) continue;
			const expireString = Chat.toDurationString(expiresIn, {precision: 1});
			buf += `<tr>`;
			buf += `<td>${userid}</td>`;
			buf += `<td>${punishment.punishType}</td>`;
			buf += `<td>${expireString}</td>`;
			buf += `<td>${punishment.reason || ' - '}</td>`;
			buf += `<td>${punishment.userids.join(", ") || ' - '}</td>`;
			if (user.can('ip')) buf += `<td>${punishment.ips.join(", ") || ' - '}</td>`;
			buf += `</tr>`;
		}
		buf += `</table>`;
		buf += `</div>`;
		return buf;
	}
	/**
	 * Notifies staff if a user has three or more room punishments.
	 */
	async monitorRoomPunishments(user) {
		if ((user ).locked) return;
		const userid = toID(user);

		/** Default to 3 if the Config option is not defined or valid */
		const minPunishments = (typeof Config.monitorminpunishments === 'number' ? Config.monitorminpunishments : 3);
		if (!minPunishments) return;

		const punishments = exports.Punishments.getRoomPunishments(user, {checkIps: true, publicOnly: true});

		if (punishments.length >= minPunishments) {
			let points = 0;

			const punishmentText = punishments.map(([room, punishment]) => {
				const [punishType, punishUserid, , reason] = punishment;
				if (punishType in PUNISHMENT_POINT_VALUES) points += PUNISHMENT_POINT_VALUES[punishType];
				let punishDesc = exports.Punishments.roomPunishmentTypes.get(punishType);
				if (!punishDesc) punishDesc = `punished`;
				if (punishUserid !== userid) punishDesc += ` as ${punishUserid}`;

				if (reason) punishDesc += `: ${reason}`;
				return `<<${room}>> (${punishDesc})`;
			}).join(', ');

			if (Config.punishmentautolock && points >= AUTOLOCK_POINT_THRESHOLD) {
				const rooms = punishments.map(([room]) => room).join(', ');
				const reason = `Autolocked for having punishments in ${punishments.length} rooms: ${rooms}`;
				const message = `${(user ).name || userid} was locked for having punishments in ${punishments.length} rooms: ${punishmentText}`;
				const isWeek = await Rooms.Modlog.getGlobalPunishments(userid, AUTOWEEKLOCK_DAYS_TO_SEARCH) >= AUTOWEEKLOCK_THRESHOLD;

				void exports.Punishments.autolock(user, 'staff', 'PunishmentMonitor', reason, message, isWeek);
				if (typeof user !== 'string') {
					(user ).popup(
						`|modal|You've been locked for breaking the rules in multiple chatrooms.\n\n` +
						`If you feel that your lock was unjustified, you can still PM staff members (%, @, &) to discuss it${Config.appealurl ? " or you can appeal:\n" + Config.appealurl : "."}\n\n` +
						`Your lock will expire in a few days.`
					);
				}
			} else {
				Monitor.log(`[PunishmentMonitor] ${(user ).name || userid} currently has punishments in ${punishments.length} rooms: ${punishmentText}`);
			}
		}
	}
}, _class)(); exports.Punishments = Punishments;
