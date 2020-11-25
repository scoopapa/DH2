"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Modlog
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Moderator actions are logged into a set of files known as the moderation log, or "modlog."
 * This file handles reading, writing, and querying the modlog.
 *
 * @license MIT
 */

var _fs = require('../.lib-dist/fs');
var _processmanager = require('../.lib-dist/process-manager');
var _repl = require('../.lib-dist/repl');

var _configloader = require('./config-loader');

var _converter = require('../tools/modlog/converter');

const MAX_PROCESSES = 1;
// If a modlog query takes longer than this, it will be logged.
const LONG_QUERY_DURATION = 2000;

const MODLOG_SCHEMA_PATH = 'databases/schemas/modlog.sql';

const GLOBAL_PUNISHMENTS = [
	'WEEKLOCK', 'LOCK', 'BAN', 'RANGEBAN', 'RANGELOCK', 'FORCERENAME',
	'TICKETBAN', 'AUTOLOCK', 'AUTONAMELOCK', 'NAMELOCK', 'AUTOBAN', 'MONTHLOCK',
];
const GLOBAL_PUNISHMENTS_REGEX_STRING = `\\b(${GLOBAL_PUNISHMENTS.join('|')}):.*`;

const PUNISHMENTS = [
	...GLOBAL_PUNISHMENTS, 'ROOMBAN', 'WEEKROOMBAN', 'UNROOMBAN', 'WARN', 'MUTE', 'HOURMUTE', 'UNMUTE',
	'CRISISDEMOTE', 'UNLOCK', 'UNLOCKNAME', 'UNLOCKRANGE', 'UNLOCKIP', 'UNBAN',
	'UNRANGEBAN', 'TRUSTUSER', 'UNTRUSTUSER', 'BLACKLIST', 'BATTLEBAN', 'UNBATTLEBAN',
	'NAMEBLACKLIST', 'KICKBATTLE', 'UNTICKETBAN', 'HIDETEXT', 'HIDEALTSTEXT', 'REDIRECT',
	'NOTE', 'MAFIAHOSTBAN', 'MAFIAUNHOSTBAN', 'GIVEAWAYBAN', 'GIVEAWAYUNBAN',
	'TOUR BAN', 'TOUR UNBAN', 'UNNAMELOCK',
];
const PUNISHMENTS_REGEX_STRING = `\\b(${PUNISHMENTS.join('|')}):.*`;















































class SortedLimitedLengthList {
	
	

	constructor(maxSize) {
		this.maxSize = maxSize;
		this.list = [];
	}

	getListClone() {
		return this.list.slice();
	}

	insert(element) {
		let insertedAt = -1;
		for (let i = this.list.length - 1; i >= 0; i--) {
			if (element.localeCompare(this.list[i]) < 0) {
				insertedAt = i + 1;
				if (i === this.list.length - 1) {
					this.list.push(element);
					break;
				}
				this.list.splice(i + 1, 0, element);
				break;
			}
		}
		if (insertedAt < 0) this.list.splice(0, 0, element);
		if (this.list.length > this.maxSize) {
			this.list.pop();
		}
	}
}

 class Modlog {
	
	/**
	 * If a room ID is not in the Map, that means the room's modlog stream
	 * has not yet been initialized, or was previously destroyed.
	 * If a room ID is in the Map, its modlog stream is open and ready to be written to.
	 */
	__init() {this.sharedStreams = new Map()}
	__init2() {this.streams = new Map()}

	

	
	
	
	

	constructor(flatFilePath, databasePath) {;Modlog.prototype.__init.call(this);Modlog.prototype.__init2.call(this);
		this.logPath = flatFilePath;

		if (Config.usesqlite) {
			const dbExists = _fs.FS.call(void 0, databasePath).existsSync();
			const SQL = require('better-sqlite3');
			this.database = new SQL(databasePath);
			this.database.exec("PRAGMA foreign_keys = ON;");

			// Set up tables, etc

			if (!dbExists) {
				this.database.exec(_fs.FS.call(void 0, MODLOG_SCHEMA_PATH).readIfExistsSync());
			}

			let insertionQuerySource = `INSERT INTO modlog (timestamp, roomid, visual_roomid, action, userid, autoconfirmed_userid, ip, action_taker_userid, note)`;
			insertionQuerySource += ` VALUES ($time, $roomID, $visualRoomID, $action, $userid, $autoconfirmedID, $ip, $loggedBy, $note)`;
			this.modlogInsertionQuery = this.database.prepare(insertionQuerySource);

			this.altsInsertionQuery = this.database.prepare(`INSERT INTO alts (modlog_id, userid) VALUES (?, ?)`);
			this.renameQuery = this.database.prepare(`UPDATE modlog SET roomid = ? WHERE roomid = ?`);

			this.insertionTransaction = this.database.transaction((entries) => {
				for (const entry of entries) {
					const result = this.modlogInsertionQuery.run(entry);
					const rowid = result.lastInsertRowid ;

					for (const alt of entry.alts || []) {
						this.altsInsertionQuery.run(rowid, alt);
					}
				}
			});
		}
	}

	/******************
	 * Helper methods *
	 ******************/
	formatArray(arr, args) {
		args.push(...arr);
		return [...'?'.repeat(arr.length)].join(', ');
	}

	getSharedID(roomid) {
		return roomid.includes('-') ? `${toID(roomid.split('-')[0])}-rooms`  : false;
	}

	runSQL(query) {
		return query.statement.run(query.args);
	}

	runSQLWithResults(query) {
		return query.statement.all(query.args);
	}

	generateIDRegex(search) {
		// Ensure the generated regex can never be greater than or equal to the value of
		// RegExpMacroAssembler::kMaxRegister in v8 (currently 1 << 16 - 1) given a
		// search with max length MAX_QUERY_LENGTH. Otherwise, the modlog
		// child process will crash when attempting to execute any RegExp
		// constructed with it (i.e. when not configured to use ripgrep).
		return `[^a-zA-Z0-9]?${[...search].join('[^a-zA-Z0-9]*')}([^a-zA-Z0-9]|\\z)`;
	}

	escapeRegex(search) {
		return search.replace(/[\\.+*?()|[\]{}^$]/g, '\\$&');
	}

	/**************************************
	 * Methods for writing to the modlog. *
	 **************************************/
	initialize(roomid) {
		if (this.streams.get(roomid)) return;
		const sharedStreamId = this.getSharedID(roomid);
		if (!sharedStreamId) {
			return this.streams.set(roomid, _fs.FS.call(void 0, `${this.logPath}/modlog_${roomid}.txt`).createAppendStream());
		}

		let stream = this.sharedStreams.get(sharedStreamId);
		if (!stream) {
			stream = _fs.FS.call(void 0, `${this.logPath}/modlog_${sharedStreamId}.txt`).createAppendStream();
			this.sharedStreams.set(sharedStreamId, stream);
		}
		this.streams.set(roomid, stream);
	}

	/**
	 * Writes to the modlog
	 */
	write(roomid, entry, overrideID) {
		const insertableEntry = {
			action: entry.action,
			roomID: entry.roomID || roomid,
			visualRoomID: overrideID || entry.visualRoomID || '',
			userid: entry.userid || null,
			autoconfirmedID: entry.autoconfirmedID || null,
			alts: entry.alts ? [...new Set(entry.alts)] : [],
			ip: entry.ip || null,
			isGlobal: entry.isGlobal || false,
			loggedBy: entry.loggedBy || null,
			note: entry.note || '',
			time: entry.time || Date.now(),
		};

		this.writeText([insertableEntry]);
		if (Config.usesqlitemodlog) {
			if (insertableEntry.isGlobal && insertableEntry.roomID !== 'global' && !insertableEntry.roomID.startsWith('global-')) {
				insertableEntry.roomID = `global-${insertableEntry.roomID}`;
			}
			this.writeSQL([insertableEntry]);
		}
	}

	writeSQL(entries) {
		if (!Config.usesqlite) return;
		_optionalChain([this, 'access', _ => _.insertionTransaction, 'optionalCall', _2 => _2(entries)]);
	}

	writeText(entries) {
		const buffers = new Map();
		for (const entry of entries) {
			const streamID = entry.roomID ;

			let entryText = `[${new Date(entry.time).toJSON()}] (${entry.visualRoomID || entry.roomID}) ${entry.action}:`;
			if (entry.userid) entryText += ` [${entry.userid}]`;
			if (entry.autoconfirmedID) entryText += ` ac:[${entry.autoconfirmedID}]`;
			if (entry.alts.length) entryText += ` alts:[${entry.alts.join('], [')}]`;
			if (entry.ip) entryText += ` [${entry.ip}]`;
			if (entry.loggedBy) entryText += ` by ${entry.loggedBy}`;
			if (entry.note) entryText += `: ${entry.note}`;
			entryText += `\n`;

			buffers.set(streamID, (buffers.get(streamID) || '') + entryText);
			if (entry.isGlobal && streamID !== 'global') {
				buffers.set('global', (buffers.get('global') || '') + entryText);
			}
		}

		for (const [streamID, buffer] of buffers) {
			const stream = this.streams.get(streamID);
			if (!stream) throw new Error(`Attempted to write to an uninitialized modlog stream for the room '${streamID}'`);
			void stream.write(buffer);
		}
	}

	async destroy(roomid) {
		const stream = this.streams.get(roomid);
		if (stream && !this.getSharedID(roomid)) {
			await stream.writeEnd();
		}
		this.streams.delete(roomid);
	}

	async destroyAll() {
		const promises = [];
		for (const id in this.streams) {
			promises.push(this.destroy(id ));
		}
		return Promise.all(promises);
	}

	async rename(oldID, newID) {
		if (oldID === newID) return;

		// rename flat-file modlogs
		const streamExists = this.streams.has(oldID);
		if (streamExists) await this.destroy(oldID);
		if (!this.getSharedID(oldID)) {
			await _fs.FS.call(void 0, `${this.logPath}/modlog_${oldID}.txt`).rename(`${this.logPath}/modlog_${newID}.txt`);
		}
		if (streamExists) this.initialize(newID);

		// rename SQL modlogs
		if (this.renameQuery) this.runSQL({statement: this.renameQuery, args: [newID, oldID]});
	}

	getActiveStreamIDs() {
		return [...this.streams.keys()];
	}

	/******************************************
	 * Methods for reading (searching) modlog *
	 ******************************************/
	 async runTextSearch(
		rooms, regexString, maxLines, onlyPunishments
	) {
		const useRipgrep = await _configloader.checkRipgrepAvailability.call(void 0, );
		let fileNameList = [];
		let checkAllRooms = false;
		for (const roomid of rooms) {
			if (roomid === 'all') {
				checkAllRooms = true;
				const fileList = await _fs.FS.call(void 0, this.logPath).readdir();
				for (const file of fileList) {
					if (file !== 'README.md' && file !== 'modlog_global.txt') fileNameList.push(file);
				}
			} else {
				fileNameList.push(`modlog_${roomid}.txt`);
			}
		}
		fileNameList = fileNameList.map(filename => `${this.logPath}/${filename}`);

		if (onlyPunishments) {
			regexString = `${onlyPunishments === 'global' ? GLOBAL_PUNISHMENTS_REGEX_STRING : PUNISHMENTS_REGEX_STRING}${regexString}`;
		}

		const results = new SortedLimitedLengthList(maxLines);
		if (useRipgrep) {
			if (checkAllRooms) fileNameList = [this.logPath];
			await this.runRipgrepSearch(fileNameList, regexString, results, maxLines);
		} else {
			const searchStringRegex = new RegExp(regexString, 'i');
			for (const fileName of fileNameList) {
				await this.readRoomModlog(fileName, results, searchStringRegex);
			}
		}
		return results.getListClone().filter(Boolean);
	}

	async runRipgrepSearch(paths, regexString, results, lines) {
		let output;
		try {
			const options = [
				'-i',
				'-m', '' + lines,
				'--pre', 'tac',
				'-e', regexString,
				'--no-filename',
				'--no-line-number',
				...paths,
				'-g', '!modlog_global.txt', '-g', '!README.md',
			];
			output = await _processmanager.exec.call(void 0, ['rg', ...options], {cwd: `${__dirname}/../`});
		} catch (error) {
			return results;
		}
		for (const fileName of output.stdout.split('\n').reverse()) {
			if (fileName) results.insert(fileName);
		}
		return results;
	}

	async getGlobalPunishments(user, days = 30) {
		return this.getGlobalPunishmentsText(toID(user), days);
	}

	async getGlobalPunishmentsText(userid, days) {
		const response = await exports.PM.query({
			rooms: ['global' ],
			regexString: this.escapeRegex(`[${userid}]`),
			maxLines: days * 10,
			onlyPunishments: 'global',
		});
		return response.length;
	}

	async search(
		roomid = 'global',
		search = {},
		maxLines = 20,
		onlyPunishments = false,
	) {
		const rooms = (roomid === 'public' ?
			[...Rooms.rooms.values()]
				.filter(room => !room.settings.isPrivate && !room.settings.isPersonal)
				.map(room => room.roomid) :
			[roomid]);

		const query = this.prepareSearch(rooms, maxLines, onlyPunishments, search);
		const response = await exports.PM.query(query);

		if (response.duration > LONG_QUERY_DURATION) {
			Monitor.log(`Long modlog query took ${response.duration} ms to complete: ${JSON.stringify(query)}`);
		}
		return {results: response, duration: response.duration};
	}

	prepareSearch(rooms, maxLines, onlyPunishments, search) {
		return this.prepareTextSearch(rooms, maxLines, onlyPunishments, search);
	}

	prepareTextSearch(
		rooms,
		maxLines,
		onlyPunishments,
		search
	) {
		// Ensure regexString can never be greater than or equal to the value of
		// RegExpMacroAssembler::kMaxRegister in v8 (currently 1 << 16 - 1) given a
		// searchString with max length MAX_QUERY_LENGTH. Otherwise, the modlog
		// child process will crash when attempting to execute any RegExp
		// constructed with it (i.e. when not configured to use ripgrep).
		let regexString = '.*?';
		if (search.anyField) regexString += `${this.escapeRegex(search.anyField)}.*?`;
		if (search.action) regexString += `\\) .*?${this.escapeRegex(search.action)}.*?: .*?`;
		if (search.user) {
			const wildcard = search.user.isExact ? `` : `.*?`;
			regexString += `.*?\\[${wildcard}${this.escapeRegex(search.user.search)}${wildcard}\\].*?`;
		}
		if (search.ip) regexString += `${this.escapeRegex(`[${search.ip}`)}.*?\\].*?`;
		if (search.actionTaker) regexString += `${this.escapeRegex(`by ${search.actionTaker}`)}.*?`;
		if (search.note) {
			const regexGenerator = search.note.isExact ? this.generateIDRegex : this.escapeRegex;
			for (const noteSearch of search.note.searches) {
				regexString += `${regexGenerator(toID(noteSearch))}.*?`;
			}
		}

		return {
			rooms: rooms,
			regexString,
			maxLines: maxLines,
			onlyPunishments: onlyPunishments,
		};
	}

	 async readRoomModlog(path, results, regex) {
		const fileStream = _fs.FS.call(void 0, path).createReadStream();
		for await (const line of fileStream.byLine()) {
			if (!regex || regex.test(line)) {
				results.insert(line);
			}
		}
		void fileStream.destroy();
		return results;
	}
} exports.Modlog = Modlog;

// if I don't do this TypeScript thinks that (ModlogResult | undefined)[] is a function
// and complains about an "nexpected newline between function name and paren"
// even though it's a type not a function...



// the ProcessManager only accepts text queries at this time
// SQL support is to be determined
 const PM = new _processmanager.QueryProcessManager(module, async data => {
	const {rooms, regexString, maxLines, onlyPunishments} = data;
	try {
		const results = await Rooms.Modlog.runTextSearch(rooms, regexString, maxLines, onlyPunishments);
		return results.map((line, index) => _converter.parseModlog.call(void 0, line, results[index + 1]));
	} catch (err) {
		Monitor.crashlog(err, 'A modlog query', data);
		return [];
	}
}); exports.PM = PM;

if (!exports.PM.isParentProcess) {
	global.Config = require('./config-loader').Config;
	global.toID = require('../.sim-dist/dex').Dex.toID;

	global.Rooms = require('./rooms').Rooms;

	global.Monitor = {
		crashlog(error, source = 'A modlog process', details = null) {
			const repr = JSON.stringify([error.name, error.message, source, details]);
			process.send(`THROW\n@!!@${repr}\n${error.stack}`);
		},
	};

	process.on('uncaughtException', err => {
		if (Config.crashguard) {
			Monitor.crashlog(err, 'A modlog child process');
		}
	});

	// eslint-disable-next-line no-eval
	_repl.Repl.start('modlog', cmd => eval(cmd));
} else {
	exports.PM.spawn(MAX_PROCESSES);
}
