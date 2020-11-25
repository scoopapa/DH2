"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;/**
 * Chat
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This handles chat and chat commands sent from users to chatrooms
 * and PMs. The main function you're looking for is Chat.parse
 * (scroll down to its definition for details)
 *
 * Individual commands are put in:
 *   chat-commands/ - "core" commands that shouldn't be modified
 *   chat-plugins/ - other commands that can be safely modified
 *
 * The command API is (mostly) documented in chat-plugins/COMMANDS.md
 *
 * @license MIT
 */

/*

To reload chat commands:

/hotpatch chat

*/


















































































const LINK_WHITELIST = [
	'*.pokemonshowdown.com', 'psim.us', 'smogtours.psim.us',
	'*.smogon.com', '*.pastebin.com', '*.hastebin.com',
];

const MAX_MESSAGE_LENGTH = 300;

const BROADCAST_COOLDOWN = 20 * 1000;
const MESSAGE_COOLDOWN = 5 * 60 * 1000;

const MAX_PARSE_RECURSION = 10;

const VALID_COMMAND_TOKENS = '/!';
const BROADCAST_TOKEN = '!';

var _fs = require('../.lib-dist/fs');
var _utils = require('../.lib-dist/utils');
var _chatformatter = require('./chat-formatter');

// @ts-ignore no typedef available
const ProbeModule = require('probe-image-size');
const probe = ProbeModule;

const EMOJI_REGEX = /[\p{Emoji_Modifier_Base}\p{Emoji_Presentation}\uFE0F]/u;
const TRANSLATION_DIRECTORY = `${__dirname}/../.translations-dist`;

class PatternTester {
	// This class sounds like a RegExp
	// In fact, one could in theory implement it as a RegExp subclass
	// However, ES2016 RegExp subclassing is a can of worms, and it wouldn't allow us
	// to tailor the test method for fast command parsing.
	
	
	
	constructor() {
		this.elements = [];
		this.fastElements = new Set();
		this.regexp = null;
	}
	fastNormalize(elem) {
		return elem.slice(0, -1);
	}
	update() {
		const slowElements = this.elements.filter(elem => !this.fastElements.has(this.fastNormalize(elem)));
		if (slowElements.length) {
			this.regexp = new RegExp('^(' + slowElements.map(elem => '(?:' + elem + ')').join('|') + ')', 'i');
		}
	}
	register(...elems) {
		for (const elem of elems) {
			this.elements.push(elem);
			if (/^[^ ^$?|()[\]]+ $/.test(elem)) {
				this.fastElements.add(this.fastNormalize(elem));
			}
		}
		this.update();
	}
	testCommand(text) {
		const spaceIndex = text.indexOf(' ');
		if (this.fastElements.has(spaceIndex >= 0 ? text.slice(0, spaceIndex) : text)) {
			return true;
		}
		if (!this.regexp) return false;
		return this.regexp.test(text);
	}
	test(text) {
		if (!text.includes('\n')) return null;
		if (this.testCommand(text)) return text;
		// The PM matching is a huge mess, and really needs to be replaced with
		// the new multiline command system soon.
		const pmMatches = /^(\/(?:pm|w|whisper|msg) [^,]*, ?)(.*)/i.exec(text);
		if (pmMatches && this.testCommand(pmMatches[2])) {
			if (text.split('\n').every(line => line.startsWith(pmMatches[1]))) {
				return text.replace(/\n\/(?:pm|w|whisper|msg) [^,]*, ?/g, '\n');
			}
			return text;
		}
		return null;
	}
}

/*********************************************************
 * Parser
 *********************************************************/

/**
 * An ErrorMessage will, if used in a command/page context, simply show the user
 * the error, rather than logging a crash. It's used to simplify showing errors.
 *
 * Outside of a command/page context, it would still cause a crash.
 */
 class ErrorMessage extends Error {
	constructor(message) {
		super(message);
		this.name = 'ErrorMessage';
		Error.captureStackTrace(this, ErrorMessage);
	}
} exports.ErrorMessage = ErrorMessage;

 class Interruption extends Error {
	constructor() {
		super('');
		this.name = 'Interruption';
		Error.captureStackTrace(this, ErrorMessage);
	}
} exports.Interruption = Interruption;

// These classes need to be declared here because they aren't hoisted
 class MessageContext {
	
	
	
	constructor(user, language = null) {
		this.user = user;
		this.language = language;
		this.recursionDepth = 0;
	}

	splitOne(target) {
		const commaIndex = target.indexOf(',');
		if (commaIndex < 0) {
			return [target.trim(), ''];
		}
		return [target.slice(0, commaIndex).trim(), target.slice(commaIndex + 1).trim()];
	}
	meansYes(text) {
		switch (text.toLowerCase().trim()) {
		case 'on': case 'enable': case 'yes': case 'true':
			return true;
		}
		return false;
	}
	meansNo(text) {
		switch (text.toLowerCase().trim()) {
		case 'off': case 'disable': case 'no': case 'false':
			return true;
		}
		return false;
	}
	tr(strings, ...keys) {
		return exports.Chat.tr(this.language, strings, ...keys);
	}
} exports.MessageContext = MessageContext;

 class PageContext extends MessageContext {
	
	
	
	
	
	
	constructor(options) {
		super(options.user, options.language);

		this.connection = options.connection;
		this.room = null;
		this.pageid = options.pageid;
		this.args = this.pageid.split('-');

		this.initialized = false;
		this.title = 'Page';
	}

	

	checkCan(permission, target = null, room = null) {
		if (!this.user.can(permission , target, room )) {
			throw new exports.Chat.ErrorMessage(`<h2>Permission denied.</h2>`);
		}
		return true;
	}

	requireRoom(pageid) {
		const room = this.extractRoom(pageid);
		if (!room) {
			throw new exports.Chat.ErrorMessage(`Invalid link: This page requires a room ID.`);
		}

		this.room = room;
		return room;
	}
	extractRoom(pageid) {
		if (!pageid) pageid = this.pageid;
		const parts = pageid.split('-');

		// The roomid for the page should be view-pagename-roomid
		const room = Rooms.get(parts[2]) || null;

		this.room = room;
		return room;
	}

	send(content) {
		if (!content.startsWith('|deinit')) {
			const roomid = this.room ? `[${this.room.roomid}] ` : '';
			if (!this.initialized) {
				content = `|init|html\n|title|${roomid}${this.title}\n|pagehtml|${content}`;
				this.initialized = true;
			} else {
				content = `|title|${roomid}${this.title}\n|pagehtml|${content}`;
			}
		}
		this.connection.send(`>${this.pageid}\n${content}`);
	}
	errorReply(message) {
		this.send(`<div class="pad"><p class="message-error">${message}</p></div>`);
	}

	close() {
		this.send('|deinit');
	}

	async resolve(pageid) {
		if (pageid) this.pageid = pageid;

		const parts = this.pageid.split('-');
		parts.shift(); // first part is always `view`

		if (!this.connection.openPages) this.connection.openPages = new Set();
		this.connection.openPages.add(parts.join('-'));

		let handler = exports.Chat.pages;
		while (handler) {
			if (typeof handler === 'function') {
				break;
			}
			handler = handler[parts.shift() || 'default'];
		}
		if (typeof handler !== 'function') {
			this.errorReply(`Page "${this.pageid}" not found`);
			return;
		}

		this.args = parts;

		let res;
		try {
			res = await handler.call(this, parts, this.user, this.connection);
		} catch (err) {
			if (_optionalChain([err, 'access', _ => _.name, 'optionalAccess', _2 => _2.endsWith, 'call', _3 => _3('ErrorMessage')])) {
				if (err.message) this.errorReply(err.message);
				return;
			}
			if (err.name.endsWith('Interruption')) {
				return;
			}
			Monitor.crashlog(err, 'A chat page', {
				user: this.user.name,
				room: this.room && this.room.roomid,
				pageid: this.pageid,
			});
			this.send(
				`<div class="pad"><div class="broadcast-red">` +
				`<strong>Pokemon Showdown crashed!</strong><br />Don't worry, we're working on fixing it.` +
				`</div></div>`
			);
		}
		if (typeof res === 'string') {
			this.send(res);
			res = undefined;
		}
		return res;
	}
} exports.PageContext = PageContext;

/**
 * This is a message sent in a PM or to a chat/battle room.
 *
 * There are three cases to be aware of:
 * - PM to user: `context.pmTarget` will exist and `context.room` will be `null`
 * - message to room: `context.room` will exist and `context.pmTarget` will be `null`
 * - console command (PM to `~`): `context.pmTarget` and `context.room` will both be `null`
 */
 class CommandContext extends MessageContext {
	
	
	
	

	
	
	
	
	

	
	
	
	
	
	
	
	constructor(
		options


	) {
		super(
			options.user, options.room && options.room.settings.language ?
				options.room.settings.language : options.user.language
		);

		this.message = options.message || ``;

		// message context
		this.pmTarget = options.pmTarget || null;
		this.room = options.room || null;
		this.connection = options.connection;

		// command context
		this.cmd = options.cmd || '';
		this.cmdToken = options.cmdToken || '';
		this.target = options.target || ``;
		this.fullCmd = options.fullCmd || '';
		this.handler = null;
		this.isQuiet = false;

		// broadcast context
		this.broadcasting = false;
		this.broadcastToRoom = true;
		this.broadcastMessage = '';

		// target user
		this.targetUser = null;
		this.targetUsername = "";
		this.inputUsername = "";
	}

	// TODO: return should be void | boolean | Promise<void | boolean>
	parse(msg, quiet) {
		if (typeof msg === 'string') {
			// spawn subcontext
			const subcontext = new CommandContext(this);
			if (quiet) subcontext.isQuiet = true;
			subcontext.recursionDepth++;
			if (subcontext.recursionDepth > MAX_PARSE_RECURSION) {
				throw new Error("Too much command recursion");
			}
			subcontext.message = msg;
			subcontext.cmd = '';
			subcontext.fullCmd = '';
			subcontext.cmdToken = '';
			subcontext.target = '';
			return subcontext.parse();
		}
		let message = this.message;

		const parsedCommand = exports.Chat.parseCommand(message);
		if (parsedCommand) {
			this.cmd = parsedCommand.cmd;
			this.fullCmd = parsedCommand.fullCmd;
			this.cmdToken = parsedCommand.cmdToken;
			this.target = parsedCommand.target;
			this.handler = parsedCommand.handler;
		}

		if (this.room && !(this.user.id in this.room.users)) {
			if (this.room.roomid === 'lobby') {
				this.room = null;
			} else {
				return this.popupReply(`You tried to send "${message}" to the room "${this.room.roomid}" but it failed because you were not in that room.`);
			}
		}

		if (this.user.statusType === 'idle' && !['unaway', 'unafk', 'back'].includes(this.cmd)) {
			this.user.setStatusType('online');
		}

		try {
			if (this.handler) {
				if (this.handler.disabled) {
					throw new exports.Chat.ErrorMessage(
						`The command /${this.cmd} is temporarily unavailable due to technical difficulties. Please try again in a few hours.`
					);
				}
				message = this.run(this.handler);
			} else {
				if (this.cmdToken) {
					// To guard against command typos, show an error message
					if (!(this.shouldBroadcast() && !/[a-z0-9]/.test(this.cmd.charAt(0)))) {
						this.commandDoesNotExist();
					}
				} else if (!VALID_COMMAND_TOKENS.includes(message.charAt(0)) &&
						VALID_COMMAND_TOKENS.includes(message.trim().charAt(0))) {
					message = message.trim();
					if (!message.startsWith(BROADCAST_TOKEN)) {
						message = message.charAt(0) + message;
					}
				}

				message = this.checkChat(message);
			}
		} catch (err) {
			if (_optionalChain([err, 'access', _4 => _4.name, 'optionalAccess', _5 => _5.endsWith, 'call', _6 => _6('ErrorMessage')])) {
				this.errorReply(err.message);
				this.update();
				return false;
			}
			if (err.name.endsWith('Interruption')) {
				this.update();
				return;
			}
			Monitor.crashlog(err, 'A chat command', {
				user: this.user.name,
				room: _optionalChain([this, 'access', _7 => _7.room, 'optionalAccess', _8 => _8.roomid]),
				pmTarget: _optionalChain([this, 'access', _9 => _9.pmTarget, 'optionalAccess', _10 => _10.name]),
				message: this.message,
			});
			this.sendReply(`|html|<div class="broadcast-red"><b>Pokemon Showdown crashed!</b><br />Don't worry, we're working on fixing it.</div>`);
			return;
		}

		// Output the message
		if (message && typeof (message ).then === 'function') {
			this.update();
			return (message ).then(resolvedMessage => {
				if (resolvedMessage && resolvedMessage !== true) {
					this.sendChatMessage(resolvedMessage);
				}
				this.update();
				if (resolvedMessage === false) return false;
			}).catch(err => {
				if (_optionalChain([err, 'access', _11 => _11.name, 'optionalAccess', _12 => _12.endsWith, 'call', _13 => _13('ErrorMessage')])) {
					this.errorReply(err.message);
					this.update();
					return false;
				}
				if (err.name.endsWith('Interruption')) {
					this.update();
					return;
				}
				Monitor.crashlog(err, 'An async chat command', {
					user: this.user.name,
					room: _optionalChain([this, 'access', _14 => _14.room, 'optionalAccess', _15 => _15.roomid]),
					pmTarget: _optionalChain([this, 'access', _16 => _16.pmTarget, 'optionalAccess', _17 => _17.name]),
					message: this.message,
				});
				this.sendReply(`|html|<div class="broadcast-red"><b>Pokemon Showdown crashed!</b><br />Don't worry, we're working on fixing it.</div>`);
				return false;
			});
		} else if (message && message !== true) {
			this.sendChatMessage(message );
		}

		this.update();

		return message ;
	}

	sendChatMessage(message) {
		if (this.pmTarget) {
			const blockInvites = this.pmTarget.settings.blockInvites;
			if (blockInvites && /^<<.*>>$/.test(message.trim())) {
				if (
					!this.user.can('lock') && blockInvites === true ||
					!Users.globalAuth.atLeast(this.user, blockInvites )
				) {
					exports.Chat.maybeNotifyBlocked(`invite`, this.pmTarget, this.user);
					return this.errorReply(`${this.pmTarget.name} is blocking room invites.`);
				}
			}
			exports.Chat.sendPM(message, this.user, this.pmTarget);
		} else if (this.room) {
			this.room.add(`|c|${this.user.getIdentity(this.room.roomid)}|${message}`);
			if (this.room.game && this.room.game.onLogMessage) {
				this.room.game.onLogMessage(message, this.user);
			}
		} else {
			this.connection.popup(`Your message could not be sent:\n\n${message}\n\nIt needs to be sent to a user or room.`);
		}
	}
	run(handler) {
		if (typeof handler === 'string') handler = exports.Chat.commands[handler] ;
		if (!handler.broadcastable && this.cmdToken === '!') {
			this.errorReply(`The command "${this.fullCmd}" can't be broadcast.`);
			this.errorReply(`Use /${this.fullCmd} instead.`);
			return false;
		}
		let result = handler.call(this, this.target, this.room, this.user, this.connection, this.cmd, this.message);
		if (result === undefined) result = false;

		return result;
	}

	checkFormat(room, user, message) {
		if (!room) return true;
		if (!room.settings.filterStretching && !room.settings.filterCaps && !room.settings.filterEmojis) return true;
		if (user.can('bypassall')) return true;

		if (room.settings.filterStretching && /(.+?)\1{5,}/i.test(user.name)) {
			throw new exports.Chat.ErrorMessage(`Your username contains too much stretching, which this room doesn't allow.`);
		}
		if (room.settings.filterCaps && /[A-Z\s]{6,}/.test(user.name)) {
			throw new exports.Chat.ErrorMessage(`Your username contains too many capital letters, which this room doesn't allow.`);
		}
		if (room.settings.filterEmojis && EMOJI_REGEX.test(user.name)) {
			throw new exports.Chat.ErrorMessage(`Your username contains emojis, which this room doesn't allow.`);
		}
		// Removes extra spaces and null characters
		message = message.trim().replace(/[ \u0000\u200B-\u200F]+/g, ' ');

		if (room.settings.filterStretching && /(.+?)\1{7,}/i.test(message)) {
			throw new exports.Chat.ErrorMessage(`Your message contains too much stretching, which this room doesn't allow.`);
		}
		if (room.settings.filterCaps && /[A-Z\s]{18,}/.test(message)) {
			throw new exports.Chat.ErrorMessage(`Your message contains too many capital letters, which this room doesn't allow.`);
		}
		if (room.settings.filterEmojis && EMOJI_REGEX.test(message)) {
			throw new exports.Chat.ErrorMessage(`Your message contains emojis, which this room doesn't allow.`);
		}

		return true;
	}

	checkSlowchat(room, user) {
		if (!room || !room.settings.slowchat) return true;
		if (user.can('show', null, room)) return true;
		const lastActiveSeconds = (Date.now() - user.lastMessageTime) / 1000;
		if (lastActiveSeconds < room.settings.slowchat) {
			throw new exports.Chat.ErrorMessage(this.tr`This room has slow-chat enabled. You can only talk once every ${room.settings.slowchat} seconds.`);
		}
		return true;
	}

	checkBanwords(room, message) {
		if (!room) return true;
		if (!room.banwordRegex) {
			if (room.settings.banwords && room.settings.banwords.length) {
				room.banwordRegex = new RegExp('(?:\\b|(?!\\w))(?:' + room.settings.banwords.join('|') + ')(?:\\b|\\B(?!\\w))', 'i');
			} else {
				room.banwordRegex = true;
			}
		}
		if (!message) return true;
		if (room.banwordRegex !== true && room.banwordRegex.test(message)) {
			throw new exports.Chat.ErrorMessage(`Your username, status, or message contained a word banned by this room.`);
		}
		return this.checkBanwords(room.parent , message);
	}
	checkGameFilter() {
		if (!this.room || !this.room.game || !this.room.game.onChatMessage) return;
		return this.room.game.onChatMessage(this.message, this.user);
	}
	pmTransform(originalMessage) {
		if (this.room) throw new Error(`Not a PM`);
		const targetIdentity = this.pmTarget ? this.pmTarget.getIdentity() : '~';
		const prefix = `|pm|${this.user.getIdentity()}|${targetIdentity}|`;
		return originalMessage.split('\n').map(message => {
			if (message.startsWith('||')) {
				return prefix + `/text ` + message.slice(2);
			} else if (message.startsWith(`|html|`)) {
				return prefix + `/raw ` + message.slice(6);
			} else if (message.startsWith(`|modaction|`)) {
				return prefix + `/log ` + message.slice(11);
			} else if (message.startsWith(`|raw|`)) {
				return prefix + `/raw ` + message.slice(5);
			} else if (message.startsWith(`|error|`)) {
				return prefix + `/error ` + message.slice(7);
			} else if (message.startsWith(`|c~|`)) {
				return prefix + message.slice(4);
			} else if (message.startsWith(`|c|~|/`)) {
				return prefix + message.slice(5);
			} else if (message.startsWith(`|c|~|`)) {
				return prefix + `/text ` + message.slice(5);
			}
			return prefix + `/text ` + message;
		}).join(`\n`);
	}
	sendReply(data) {
		if (this.isQuiet) return;
		if (this.broadcasting && this.broadcastToRoom) {
			// broadcasting
			this.add(data);
		} else {
			// not broadcasting
			if (!this.room) {
				data = this.pmTransform(data);
				this.connection.send(data);
			} else {
				this.connection.sendTo(this.room, data);
			}
		}
	}
	errorReply(message) {
		this.sendReply(`|error|` + message.replace(/\n/g, `\n|error|`));
	}
	addBox(htmlContent) {
		this.add(`|html|<div class="infobox">${htmlContent}</div>`);
	}
	sendReplyBox(htmlContent) {
		this.sendReply(`|c|${this.room && this.broadcasting ? this.user.getIdentity() : '~'}|/raw <div class="infobox">${htmlContent}</div>`);
	}
	popupReply(message) {
		this.connection.popup(message);
	}
	add(data) {
		if (this.room) {
			this.room.add(data);
		} else {
			this.send(data);
		}
	}
	send(data) {
		if (this.room) {
			this.room.send(data);
		} else {
			data = this.pmTransform(data);
			this.user.send(data);
			if (this.pmTarget && this.pmTarget !== this.user) {
				this.pmTarget.send(data);
			}
		}
	}

	/** like privateModAction, but also notify Staff room */
	privateGlobalModAction(msg) {
		this.privateModAction(msg);
		if (_optionalChain([this, 'access', _18 => _18.room, 'optionalAccess', _19 => _19.roomid]) !== 'staff') {
			_optionalChain([Rooms, 'access', _20 => _20.get, 'call', _21 => _21('staff'), 'optionalAccess', _22 => _22.addByUser, 'call', _23 => _23(this.user, `${this.room ? `<<${this.room.roomid}>>` : `<PM:${this.pmTarget}>`} ${msg}`), 'access', _24 => _24.update, 'call', _25 => _25()]);
		}
	}
	addGlobalModAction(msg) {
		this.addModAction(msg);
		if (_optionalChain([this, 'access', _26 => _26.room, 'optionalAccess', _27 => _27.roomid]) !== 'staff') {
			_optionalChain([Rooms, 'access', _28 => _28.get, 'call', _29 => _29('staff'), 'optionalAccess', _30 => _30.addByUser, 'call', _31 => _31(this.user, `${this.room ? `<<${this.room.roomid}>>` : `<PM:${this.pmTarget}>`} ${msg}`), 'access', _32 => _32.update, 'call', _33 => _33()]);
		}
	}

	privateModAction(msg) {
		if (this.room) {
			if (this.room.roomid === 'staff') {
				this.room.addByUser(this.user, `(${msg})`);
			} else {
				this.room.sendModsByUser(this.user, `(${msg})`);
			}
		} else {
			const data = this.pmTransform(`|modaction|${msg}`);
			this.user.send(data);
			if (this.pmTarget && this.pmTarget !== this.user && this.pmTarget.isStaff) {
				this.pmTarget.send(data);
			}
		}
		this.roomlog(`(${msg})`);
	}
	globalModlog(action, user, note, ip) {
		const entry = {
			action,
			isGlobal: true,
			loggedBy: this.user.id,
			note: _optionalChain([note, 'optionalAccess', _34 => _34.replace, 'call', _35 => _35(/\n/gm, ' ')]) || '',
		};
		if (user) {
			if (typeof user === 'string') {
				entry.userid = toID(user);
			} else {
				entry.ip = user.latestIp;
				const userid = user.getLastId();
				entry.userid = userid;
				if (user.autoconfirmed && user.autoconfirmed !== userid) entry.autoconfirmedID = user.autoconfirmed;
				const alts = user.getAltUsers(false, true).slice(1).map(alt => alt.getLastId());
				if (alts.length) entry.alts = alts;
			}
		}
		if (ip) entry.ip = ip;
		if (this.room) {
			this.room.modlog(entry);
		} else {
			Rooms.global.modlog(entry);
		}
	}
	modlog(
		action,
		user = null,
		note = null,
		options = {}
	) {
		const entry = {
			action,
			loggedBy: this.user.id,
			note: _optionalChain([note, 'optionalAccess', _36 => _36.replace, 'call', _37 => _37(/\n/gm, ' ')]) || '',
		};
		if (user) {
			if (typeof user === 'string') {
				entry.userid = toID(user);
			} else {
				const userid = user.getLastId();
				entry.userid = userid;
				if (!options.noalts) {
					if (user.autoconfirmed && user.autoconfirmed !== userid) entry.autoconfirmedID = user.autoconfirmed;
					const alts = user.getAltUsers(false, true).slice(1).map(alt => alt.getLastId());
					if (alts.length) entry.alts = alts;
				}
				if (!options.noip) entry.ip = user.latestIp;
			}
		}
		(this.room || Rooms.global).modlog(entry);
	}
	roomlog(data) {
		if (this.room) this.room.roomlog(data);
	}
	stafflog(data) {
		_optionalChain([(Rooms.get('staff') || Rooms.lobby || this.room), 'optionalAccess', _38 => _38.roomlog, 'call', _39 => _39(data)]);
	}
	addModAction(msg) {
		if (this.room) {
			this.room.addByUser(this.user, msg);
		} else {
			this.send(`|modaction|${msg}`);
		}
	}
	update() {
		if (this.room) this.room.update();
	}
	filter(message) {
		return exports.Chat.filter(message, this);
	}
	statusfilter(status) {
		return exports.Chat.statusfilter(status, this.user);
	}
	

	checkCan(permission, target = null, room = null) {
		if (!Users.Auth.hasPermission(this.user, permission, target, room, this.fullCmd)) {
			throw new exports.Chat.ErrorMessage(`${this.cmdToken}${this.fullCmd} - Access denied.`);
		}
	}
	

	privatelyCheckCan(permission, target = null, room = null) {
		this.handler.isPrivate = true;
		if (Users.Auth.hasPermission(this.user, permission, target, room, this.fullCmd)) {
			return true;
		}
		this.commandDoesNotExist();
	}
	canUseConsole() {
		if (!this.user.hasConsoleAccess(this.connection)) {
			throw new exports.Chat.ErrorMessage(
				this.cmdToken + this.fullCmd + " - Requires console access, please set up `Config.consoleips`."
			);
		}
		return true;
	}
	shouldBroadcast() {
		return this.cmdToken === BROADCAST_TOKEN;
	}
	checkBroadcast(ignoreCooldown, suppressMessage) {
		if (this.broadcasting || !this.shouldBroadcast()) {
			return true;
		}

		if (this.room && !this.user.can('show', null, this.room)) {
			this.errorReply(`You need to be voiced to broadcast this command's information.`);
			throw new exports.Chat.ErrorMessage(`To see it for yourself, use: /${this.message.slice(1)}`);
		}

		if (!this.room && !this.pmTarget) {
			this.errorReply(`Broadcasting a command with "!" in a PM or chatroom will show it that user or room.`);
			throw new exports.Chat.ErrorMessage(`To see it for yourself, use: /${this.message.slice(1)}`);
		}

		// broadcast cooldown
		const broadcastMessage = (suppressMessage || this.message).toLowerCase().replace(/[^a-z0-9\s!,]/g, '');

		if (!ignoreCooldown && this.room && this.room.lastBroadcast === broadcastMessage &&
			this.room.lastBroadcastTime >= Date.now() - BROADCAST_COOLDOWN &&
			!this.user.can('bypassall')) {
			throw new exports.Chat.ErrorMessage("You can't broadcast this because it was just broadcasted.");
		}

		const message = this.checkChat(suppressMessage || this.message);
		if (!message) {
			throw new exports.Chat.ErrorMessage(`To see it for yourself, use: /${this.message.slice(1)}`);
		}

		// checkChat will only return true with no message
		this.message = message;
		this.broadcastMessage = broadcastMessage;
		return true;
	}
	runBroadcast(ignoreCooldown = false, suppressMessage = null) {
		if (this.broadcasting || !this.shouldBroadcast()) {
			// Already being broadcast, or the user doesn't intend to broadcast.
			return true;
		}

		if (!this.broadcastMessage) {
			// Permission hasn't been checked yet. Do it now.
			this.checkBroadcast(ignoreCooldown, suppressMessage);
		}

		this.broadcasting = true;

		if (this.pmTarget) {
			this.sendReply('|c~|' + (suppressMessage || this.message));
		} else {
			this.sendReply('|c|' + this.user.getIdentity(this.room ? this.room.roomid : '') + '|' + (suppressMessage || this.message));
		}
		if (this.room) {
			// We don't want broadcasted messages in a room to be translated
			// according to a user's personal language setting.
			this.language = this.room.settings.language || null;
			if (!ignoreCooldown) {
				this.room.lastBroadcast = this.broadcastMessage;
				this.room.lastBroadcastTime = Date.now();
			}
		}

		return true;
	}
	/* The sucrase transformation of optional chaining is too expensive to be used in a hot function like this. */
	/* eslint-disable @typescript-eslint/prefer-optional-chain */
	

	checkChat(message = null, room = null, targetUser = null) {
		if (!targetUser && this.pmTarget) {
			targetUser = this.pmTarget;
		}
		if (targetUser) {
			room = null;
		} else if (!room) {
			// @ts-ignore excludes GlobalRoom above
			room = this.room;
		}
		const user = this.user;
		const connection = this.connection;

		if (!user.named) {
			throw new exports.Chat.ErrorMessage(this.tr(`You must choose a name before you can talk.`));
		}
		if (!user.can('bypassall')) {
			const lockType = (user.namelocked ? this.tr(`namelocked`) : user.locked ? this.tr(`locked`) : ``);
			const lockExpiration = Punishments.checkLockExpiration(user.namelocked || user.locked);
			if (room) {
				if (lockType && !room.settings.isHelp) {
					this.sendReply(`|html|<a href="view-help-request--appeal" class="button">${this.tr("Get help with this")}</a>`);
					throw new exports.Chat.ErrorMessage(this.tr `You are ${lockType} and can't talk in chat. ${lockExpiration}`);
				}
				if (room.isMuted(user)) {
					throw new exports.Chat.ErrorMessage(this.tr(`You are muted and cannot talk in this room.`));
				}
				if (room.settings.modchat && !room.auth.atLeast(user, room.settings.modchat)) {
					if (room.settings.modchat === 'autoconfirmed') {
						throw new exports.Chat.ErrorMessage(
							this.tr`Because moderated chat is set, your account must be at least one week old and you must have won at least one ladder game to speak in this room.`
						);
					}
					if (room.settings.modchat === 'trusted') {
						throw new exports.Chat.ErrorMessage(
							this.tr`Because moderated chat is set, your account must be staff in a public room or have a global rank to speak in this room.`
						);
					}
					const groupName = Config.groups[room.settings.modchat] && Config.groups[room.settings.modchat].name ||
						room.settings.modchat;
					throw new exports.Chat.ErrorMessage(
						this.tr `Because moderated chat is set, you must be of rank ${groupName} or higher to speak in this room.`
					);
				}
				if (!(user.id in room.users)) {
					connection.popup(`You can't send a message to this room without being in it.`);
					return null;
				}
			}
			if (targetUser) {
				if (lockType && !targetUser.can('lock')) {
					this.sendReply(`|html|<a href="view-help-request--appeal" class="button">${this.tr`Get help with this`}</a>`);
					throw new exports.Chat.ErrorMessage(this.tr`You are ${lockType} and can only private message members of the global moderation team. ${lockExpiration}`);
				}
				if (targetUser.locked && !user.can('lock')) {
					throw new exports.Chat.ErrorMessage(this.tr`The user "${targetUser.name}" is locked and cannot be PMed.`);
				}
				if (Config.pmmodchat && !Users.globalAuth.atLeast(user, Config.pmmodchat) &&
					!Users.Auth.hasPermission(targetUser, 'promote', Config.pmmodchat )) {
					const groupName = Config.groups[Config.pmmodchat] && Config.groups[Config.pmmodchat].name || Config.pmmodchat;
					throw new exports.Chat.ErrorMessage(this.tr`On this server, you must be of rank ${groupName} or higher to PM users.`);
				}
				if (targetUser.settings.blockPMs &&
					(targetUser.settings.blockPMs === true || !Users.globalAuth.atLeast(user, targetUser.settings.blockPMs)) &&
					!user.can('lock')) {
					exports.Chat.maybeNotifyBlocked('pm', targetUser, user);
					if (!targetUser.can('lock')) {
						throw new exports.Chat.ErrorMessage(this.tr`This user is blocking private messages right now.`);
					} else {
						this.sendReply(`|html|${this.tr`If you need help, try opening a <a href="view-help-request" class="button">help ticket</a>`}`);
						throw new exports.Chat.ErrorMessage(this.tr`This ${Config.groups[targetUser.tempGroup].name} is too busy to answer private messages right now. Please contact a different staff member.`);
					}
				}
				if (user.settings.blockPMs && (user.settings.blockPMs === true ||
					!Users.globalAuth.atLeast(targetUser, user.settings.blockPMs)) && !targetUser.can('lock')) {
					throw new exports.Chat.ErrorMessage(this.tr`You are blocking private messages right now.`);
				}
			}
		}

		if (typeof message !== 'string') return true;

		if (!message) {
			throw new exports.Chat.ErrorMessage(this.tr("Your message can't be blank."));
		}
		let length = message.length;
		length += 10 * message.replace(/[^\ufdfd]*/g, '').length;
		if (length > MAX_MESSAGE_LENGTH && !user.can('ignorelimits')) {
			throw new exports.Chat.ErrorMessage(this.tr("Your message is too long: ") + message);
		}

		// remove zalgo
		// eslint-disable-next-line max-len
		message = message.replace(/[\u0300-\u036f\u0483-\u0489\u0610-\u0615\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06ED\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]{3,}/g, '');
		if (/[\u115f\u1160\u239b-\u23b9]/.test(message)) {
			throw new exports.Chat.ErrorMessage(this.tr("Your message contains banned characters."));
		}

		// If the corresponding config option is set, non-AC users cannot send links, except to staff.
		if (Config.restrictLinks && !user.autoconfirmed) {
			// eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
			const links = message.match(exports.Chat.linkRegex);
			const allLinksWhitelisted = !links || links.every(link => {
				link = link.toLowerCase();
				const domainMatches = /^(?:http:\/\/|https:\/\/)?(?:[^/]*\.)?([^/.]*\.[^/.]*)\.?($|\/|:)/.exec(link);
				const domain = _optionalChain([domainMatches, 'optionalAccess', _40 => _40[1]]);
				const hostMatches = /^(?:http:\/\/|https:\/\/)?([^/]*[^/.])\.?($|\/|:)/.exec(link);
				let host = _optionalChain([hostMatches, 'optionalAccess', _41 => _41[1]]);
				if (_optionalChain([host, 'optionalAccess', _42 => _42.startsWith, 'call', _43 => _43('www.')])) host = host.slice(4);
				if (!domain || !host) return null;
				return LINK_WHITELIST.includes(host) || LINK_WHITELIST.includes(`*.${domain}`);
			});
			if (!allLinksWhitelisted && !(_optionalChain([targetUser, 'optionalAccess', _44 => _44.can, 'call', _45 => _45('lock')]) || _optionalChain([room, 'optionalAccess', _46 => _46.settings, 'access', _47 => _47.isHelp]))) {
				throw new exports.Chat.ErrorMessage("Your account must be autoconfirmed to send links to other users, except for global staff.");
			}
		}

		this.checkFormat(room, user, message);

		this.checkSlowchat(room, user);

		if (!user.can('bypassall')) this.checkBanwords(room, user.name);
		if (user.userMessage && !user.can('bypassall')) this.checkBanwords(room, user.userMessage);
		if (room && !user.can('mute', null, room)) this.checkBanwords(room, message);

		const gameFilter = this.checkGameFilter();
		if (typeof gameFilter === 'string') {
			if (gameFilter === '') throw new exports.Chat.Interruption();
			throw new exports.Chat.ErrorMessage(gameFilter);
		}

		if (room) {
			const normalized = message.trim();
			if (
				!user.can('bypassall') && (['help', 'lobby'].includes(room.roomid)) && (normalized === user.lastMessage) &&
				((Date.now() - user.lastMessageTime) < MESSAGE_COOLDOWN) && !Config.nothrottle
			) {
				throw new exports.Chat.ErrorMessage(this.tr("You can't send the same message again so soon."));
			}
			user.lastMessage = message;
			user.lastMessageTime = Date.now();
		}

		if (_optionalChain([room, 'optionalAccess', _48 => _48.settings, 'access', _49 => _49.highTraffic]) &&
			toID(message).replace(/[^a-z]+/, '').length < 2 &&
			!user.can('show', null, room)) {
			throw new exports.Chat.ErrorMessage(
				this.tr('Due to this room being a high traffic room, your message must contain at least two letters.')
			);
		}

		if (exports.Chat.filters.length) {
			return this.filter(message);
		}

		return message;
	}
	checkPMHTML(targetUser) {
		if (!targetUser || !targetUser.connected) {
			throw new exports.Chat.ErrorMessage(`User ${this.targetUsername} is not currently online.`);
		}
		if (!(this.room && (targetUser.id in this.room.users)) && !this.user.can('addhtml')) {
			throw new exports.Chat.ErrorMessage("You do not have permission to use PM HTML to users who are not in this room.");
		}
		if (targetUser.settings.blockPMs &&
			(targetUser.settings.blockPMs === true || !Users.globalAuth.atLeast(this.user, targetUser.settings.blockPMs)) &&
			!this.user.can('lock')
		) {
			exports.Chat.maybeNotifyBlocked('pm', targetUser, this.user);
			throw new exports.Chat.ErrorMessage("This user is currently blocking PMs.");
		}
		if (targetUser.locked && !this.user.can('lock')) {
			throw new exports.Chat.ErrorMessage("This user is currently locked, so you cannot send them HTML.");
		}
		return true;
	}
	/* eslint-enable @typescript-eslint/prefer-optional-chain */
	checkEmbedURI(uri, autofix) {
		if (uri.startsWith('https://')) return uri;
		if (uri.startsWith('//')) return uri;
		if (uri.startsWith('data:')) return uri;
		if (!uri.startsWith('http://')) {
			if (/^[a-z]+:\/\//.test(uri)) {
				throw new exports.Chat.ErrorMessage("Image URLs must begin with 'https://' or 'http://' or 'data:'");
			}
		} else {
			uri = uri.slice(7);
		}
		const slashIndex = uri.indexOf('/');
		let domain = (slashIndex >= 0 ? uri.slice(0, slashIndex) : uri);

		// heuristic that works for all the domains we care about
		const secondLastDotIndex = domain.lastIndexOf('.', domain.length - 5);
		if (secondLastDotIndex >= 0) domain = domain.slice(secondLastDotIndex + 1);

		const approvedDomains = [
			'imgur.com',
			'gyazo.com',
			'puu.sh',
			'rotmgtool.com',
			'pokemonshowdown.com',
			'nocookie.net',
			'blogspot.com',
			'imageshack.us',
			'deviantart.net',
			'd.pr',
			'pokefans.net',
		];
		if (approvedDomains.includes(domain)) {
			if (autofix) return `//${uri}`;
			throw new exports.Chat.ErrorMessage(`Please use HTTPS for image "${uri}"`);
		}
		if (domain === 'bit.ly') {
			throw new exports.Chat.ErrorMessage("Please don't use URL shorteners.");
		}
		// unknown URI, allow HTTP to be safe
		return uri;
	}
	/**
	 * This is a quick and dirty first-pass "is this good HTML" check. The full
	 * sanitization is done on the client by Caja in `src/battle-log.ts`
	 * `BattleLog.sanitizeHTML`.
	 */
	checkHTML(htmlContent) {
		htmlContent = ('' + (htmlContent || '')).trim();
		if (!htmlContent) return '';
		if (/>here.?</i.test(htmlContent) || /click here/i.test(htmlContent)) {
			throw new exports.Chat.ErrorMessage('Do not use "click here" – See [[Design standard #2 <https://github.com/smogon/pokemon-showdown/blob/master/CONTRIBUTING.md#design-standards>]]');
		}

		// check for mismatched tags
		const tags = htmlContent.match(/<!--.*?-->|<\/?[^<>]*/g);
		if (tags) {
			const ILLEGAL_TAGS = [
				'script', 'head', 'body', 'html', 'canvas', 'base', 'meta', 'link', 'iframe',
			];
			const LEGAL_AUTOCLOSE_TAGS = [
				// void elements (no-close tags)
				'br', 'area', 'embed', 'hr', 'img', 'source', 'track', 'input', 'wbr', 'col',
				// autoclose tags
				'p', 'li', 'dt', 'dd', 'option', 'tr', 'th', 'td', 'thead', 'tbody', 'tfoot', 'colgroup',
				// PS custom element
				'psicon',
			];
			const stack = [];
			for (const tag of tags) {
				const isClosingTag = tag.charAt(1) === '/';
				const contentEndLoc = tag.endsWith('/') ? -1 : undefined;
				const tagContent = tag.slice(isClosingTag ? 2 : 1, contentEndLoc).replace(/\s+/, ' ').trim();
				const tagNameEndIndex = tagContent.indexOf(' ');
				const tagName = tagContent.slice(0, tagNameEndIndex >= 0 ? tagNameEndIndex : undefined).toLowerCase();
				if (tagName === '!--') continue;
				if (isClosingTag) {
					if (LEGAL_AUTOCLOSE_TAGS.includes(tagName)) continue;
					if (!stack.length) {
						throw new exports.Chat.ErrorMessage(`Extraneous </${tagName}> without an opening tag.`);
					}
					const expectedTagName = stack.pop();
					if (tagName !== expectedTagName) {
						throw new exports.Chat.ErrorMessage(`Extraneous </${tagName}> where </${expectedTagName}> was expected.`);
					}
					continue;
				}

				if (ILLEGAL_TAGS.includes(tagName) || !/^[a-z]+[0-9]?$/.test(tagName)) {
					throw new exports.Chat.ErrorMessage(`Illegal tag <${tagName}> can't be used here.`);
				}
				if (!LEGAL_AUTOCLOSE_TAGS.includes(tagName)) {
					stack.push(tagName);
				}

				if (tagName === 'img') {
					if (!this.room || (this.room.settings.isPersonal && !this.user.can('lock'))) {
						throw new exports.Chat.ErrorMessage(
							`This tag is not allowed: <${tagContent}>. Images are not allowed outside of chatrooms.`
						);
					}
					if (!/width ?= ?(?:[0-9]+|"[0-9]+")/i.test(tagContent) || !/height ?= ?(?:[0-9]+|"[0-9]+")/i.test(tagContent)) {
						// Width and height are required because most browsers insert the
						// <img> element before width and height are known, and when the
						// image is loaded, this changes the height of the chat area, which
						// messes up autoscrolling.
						this.errorReply(`This image is missing a width/height attribute: <${tagContent}>`);
						throw new exports.Chat.ErrorMessage(`Images without predefined width/height cause problems with scrolling because loading them changes their height.`);
					}
					const srcMatch = / src ?= ?"?([^ "]+)(?: ?")?/i.exec(tagContent);
					if (srcMatch) {
						this.checkEmbedURI(srcMatch[1]);
					} else {
						this.errorReply(`This image has a broken src attribute: <${tagContent}>`);
						throw new exports.Chat.ErrorMessage(`The src attribute must exist and have no spaces in the URL`);
					}
				}
				if (tagName === 'button') {
					if ((!this.room || this.room.settings.isPersonal || this.room.settings.isPrivate === true) && !this.user.can('lock')) {
						const buttonName = _optionalChain([/ name ?= ?"([^"]*)"/i, 'access', _50 => _50.exec, 'call', _51 => _51(tagContent), 'optionalAccess', _52 => _52[1]]);
						const buttonValue = _optionalChain([/ value ?= ?"([^"]*)"/i, 'access', _53 => _53.exec, 'call', _54 => _54(tagContent), 'optionalAccess', _55 => _55[1]]);
						const msgCommandRegex = /^\/(?:msg|pm|w|whisper) /i;
						if (buttonName === 'send' && buttonValue && msgCommandRegex.test(buttonValue)) {
							const [pmTarget] = buttonValue.replace(msgCommandRegex, '').split(',');
							const auth = this.room ? this.room.auth : Users.globalAuth;
							if (auth.get(toID(pmTarget)) !== '*' && toID(pmTarget) !== this.user.id) {
								this.errorReply(`This button is not allowed: <${tagContent}>`);
								throw new exports.Chat.ErrorMessage(`Your scripted button can't send PMs to ${pmTarget}, because that user is not a Room Bot.`);
							}
						} else if (buttonName) {
							this.errorReply(`This button is not allowed: <${tagContent}>`);
							this.errorReply(`You do not have permission to use most buttons. Here are the two types you're allowed to use:`);
							this.errorReply(`1. Linking to a room: <a href="/roomid"><button>go to a place</button></a>`);
							throw new exports.Chat.ErrorMessage(`2. Sending a message to a Bot: <button name="send" value="/msg BOT_USERNAME, MESSAGE">send the thing</button>`);
						}
					}
				}
			}
			if (stack.length) {
				throw new exports.Chat.ErrorMessage(`Missing </${stack.pop()}>.`);
			}
		}

		return htmlContent;
	}
	targetUserOrSelf(target, exactName) {
		if (!target) {
			this.targetUsername = this.user.name;
			this.inputUsername = this.user.name;
			return this.user;
		}
		this.splitTarget(target, exactName);
		return this.targetUser;
	}

	/**
	 * Given a message in the form "USERNAME" or "USERNAME, MORE", splits
	 * it apart:
	 *
	 * - `this.targetUser` will be the User corresponding to USERNAME
	 *   (or null, if not found)
	 *
	 * - `this.inputUsername` will be the text of USERNAME, unmodified
	 *
	 * - `this.targetUsername` will be the username, if found, or
	 *   this.inputUsername otherwise
	 *
	 * - and the text of MORE will be returned (empty string, if the
	 *   message has no comma)
	 *
	 */
	splitTarget(target, exactName = false) {
		const [name, rest] = this.splitOne(target);

		this.targetUser = Users.get(name, exactName);
		this.inputUsername = name.trim();
		this.targetUsername = this.targetUser ? this.targetUser.name : this.inputUsername;
		return rest;
	}

	requireRoom(id) {
		if (!this.room) {
			throw new exports.Chat.ErrorMessage(`/${this.cmd} - must be used in a chat room, not a ${this.pmTarget ? "PM" : "console"}`);
		}
		if (id && this.room.roomid !== id) {
			const targetRoom = Rooms.get(id);
			if (!targetRoom) {
				throw new exports.Chat.ErrorMessage(`This command can only be used in the room '${id}', but that room does not exist.`);
			}
			throw new exports.Chat.ErrorMessage(`This command can only be used in the ${targetRoom.title} room.`);
		}
		return this.room;
	}
	// eslint-disable-next-line @typescript-eslint/type-annotation-spacing
	requireGame(constructor) {
		const room = this.requireRoom();
		if (!room.game) {
			throw new exports.Chat.ErrorMessage(`This command requires a game of ${constructor.name} (this room has no game).`);
		}
		const game = room.getGame(constructor);
		// must be a different game
		if (!game) {
			throw new exports.Chat.ErrorMessage(`This command requires a game of ${constructor.name} (this game is ${room.game.title}).`);
		}
		return game;
	}
	commandDoesNotExist() {
		if (this.cmdToken === '!') {
			throw new exports.Chat.ErrorMessage(`The command "${this.cmdToken}${this.fullCmd}" does not exist.`);
		}
		throw new exports.Chat.ErrorMessage(
			`The command "${this.cmdToken}${this.fullCmd}" does not exist. To send a message starting with "${this.cmdToken}${this.fullCmd}", type "${this.cmdToken}${this.cmdToken}${this.fullCmd}".`
		);
	}
} exports.CommandContext = CommandContext;

 const Chat = new (_class = class {
	constructor() {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);_class.prototype.__init7.call(this);_class.prototype.__init8.call(this);_class.prototype.__init9.call(this);_class.prototype.__init10.call(this);_class.prototype.__init11.call(this);_class.prototype.__init12.call(this);_class.prototype.__init13.call(this);_class.prototype.__init14.call(this);_class.prototype.__init15.call(this);_class.prototype.__init16.call(this);_class.prototype.__init17.call(this);_class.prototype.__init18.call(this);_class.prototype.__init19.call(this);_class.prototype.__init20.call(this);_class.prototype.__init21.call(this);_class.prototype.__init22.call(this);_class.prototype.__init23.call(this);_class.prototype.__init24.call(this);_class.prototype.__init25.call(this);_class.prototype.__init26.call(this);_class.prototype.__init27.call(this);
		void this.loadTranslations().then(() => {
			exports.Chat.translationsLoaded = true;
		});
	}
	__init() {this.translationsLoaded = false}
	/**
	 * As per the node.js documentation at https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args,
	 * timers with durations that are too long for a 32-bit signed integer will be invoked after 1 millisecond,
	 * which tends to cause unexpected behavior.
	 */
	 __init2() {this.MAX_TIMEOUT_DURATION = 2147483647}

	 __init3() {this.multiLinePattern = new PatternTester()}

	/*********************************************************
	 * Load command files
	 *********************************************************/
	
	
	
	
	 __init4() {this.destroyHandlers = []}
	/** The key is the name of the plugin. */
	 __init5() {this.plugins = {}}
	/** Will be empty except during hotpatch */
	__init6() {this.oldPlugins = {}}
	__init7() {this.roomSettings = []}

	/*********************************************************
	 * Load chat filters
	 *********************************************************/
	 __init8() {this.filters = []}
	filter(message, context) {
		// Chat filters can choose to:
		// 1. return false OR null - to not send a user's message
		// 2. return an altered string - to alter a user's message
		// 3. return undefined to send the original message through
		const originalMessage = message;
		for (const curFilter of exports.Chat.filters) {
			const output = curFilter.call(
				context,
				message,
				context.user,
				context.room,
				context.connection,
				context.pmTarget,
				originalMessage
			);
			if (output === false) return null;
			if (!output && output !== undefined) return output;
			if (output !== undefined) message = output;
		}

		return message;
	}

	 __init9() {this.namefilters = []}
	namefilter(name, user) {
		if (!Config.disablebasicnamefilter) {
			// whitelist
			// \u00A1-\u00BF\u00D7\u00F7  Latin punctuation/symbols
			// \u02B9-\u0362              basic combining accents
			// \u2012-\u2027\u2030-\u205E Latin punctuation/symbols extended
			// \u2050-\u205F              fractions extended
			// \u2190-\u23FA\u2500-\u2BD1 misc symbols
			// \u2E80-\u32FF              CJK symbols
			// \u3400-\u9FFF              CJK
			// \uF900-\uFAFF\uFE00-\uFE6F CJK extended
			// eslint-disable-next-line no-misleading-character-class, max-len
			name = name.replace(/[^a-zA-Z0-9 /\\.~()<>^*%&=+$#_'?!"\u00A1-\u00BF\u00D7\u00F7\u02B9-\u0362\u2012-\u2027\u2030-\u205E\u2050-\u205F\u2190-\u23FA\u2500-\u2BD1\u2E80-\u32FF\u3400-\u9FFF\uF900-\uFAFF\uFE00-\uFE6F-]+/g, '');

			// blacklist
			// \u00a1 upside-down exclamation mark (i)
			// \u2580-\u2590 black bars
			// \u25A0\u25Ac\u25AE\u25B0 black bars
			// \u534d\u5350 swastika
			// \u2a0d crossed integral (f)
			name = name.replace(/[\u00a1\u2580-\u2590\u25A0\u25Ac\u25AE\u25B0\u2a0d\u534d\u5350]/g, '');

			// e-mail address
			if (name.includes('@') && name.includes('.')) return '';

			// url
			if (/[a-z0-9]\.(com|net|org|us|uk|co|gg|tk|ml|gq|ga|xxx|download|stream)\b/i.test(name)) name = name.replace(/\./g, '');

			// Limit the amount of symbols allowed in usernames to 4 maximum, and
			// disallow (R) and (C) from being used in the middle of names.
			// eslint-disable-next-line max-len
			const nameSymbols = name.replace(/[^\u00A1-\u00BF\u00D7\u00F7\u02B9-\u0362\u2012-\u2027\u2030-\u205E\u2050-\u205F\u2090-\u23FA\u2500-\u2BD1]+/g, '');
			// \u00ae\u00a9 (R) (C)
			// eslint-disable-next-line no-misleading-character-class, max-len
			if (nameSymbols.length > 4 || /[^a-z0-9][a-z0-9][^a-z0-9]/.test(name.toLowerCase() + ' ') || /[\u00ae\u00a9].*[a-zA-Z0-9]/.test(name)) name = name.replace(/[\u00A1-\u00BF\u00D7\u00F7\u02B9-\u0362\u2012-\u2027\u2030-\u205E\u2050-\u205F\u2190-\u23FA\u2500-\u2BD1\u2E80-\u32FF\u3400-\u9FFF\uF900-\uFAFF\uFE00-\uFE6F]+/g, '').replace(/[^A-Za-z0-9]{2,}/g, ' ').trim();
		}
		name = name.replace(/^[^A-Za-z0-9]+/, ""); // remove symbols from start
		name = name.replace(/@/g, ""); // Remove @ as this is used to indicate status messages

		// cut name length down to 18 chars
		if (/[A-Za-z0-9]/.test(name.slice(18))) {
			name = name.replace(/[^A-Za-z0-9]+/g, "");
		} else {
			name = name.slice(0, 18);
		}

		name = Dex.getName(name);
		for (const curFilter of exports.Chat.namefilters) {
			name = curFilter(name, user);
			if (!name) return '';
		}
		return name;
	}

	 __init10() {this.hostfilters = []}
	hostfilter(host, user, connection, hostType) {
		for (const curFilter of exports.Chat.hostfilters) {
			curFilter(host, user, connection, hostType);
		}
	}

	 __init11() {this.loginfilters = []}
	loginfilter(user, oldUser, usertype) {
		for (const curFilter of exports.Chat.loginfilters) {
			curFilter(user, oldUser, usertype);
		}
	}

	 __init12() {this.punishmentfilters = []}
	punishmentfilter(user, punishment) {
		for (const curFilter of exports.Chat.punishmentfilters) {
			curFilter(user, punishment);
		}
	}

	 __init13() {this.nicknamefilters = []}
	nicknamefilter(nickname, user) {
		for (const curFilter of exports.Chat.nicknamefilters) {
			nickname = curFilter(nickname, user);
			if (!nickname) return '';
		}
		return nickname;
	}

	 __init14() {this.statusfilters = []}
	statusfilter(status, user) {
		status = status.replace(/\|/g, '');
		for (const curFilter of exports.Chat.statusfilters) {
			status = curFilter(status, user);
			if (!status) return '';
		}
		return status;
	}
	/*********************************************************
	 * Translations
	 *********************************************************/
	/** language id -> language name */
	 __init15() {this.languages = new Map()}
	/** language id -> (english string -> translated string) */
	 __init16() {this.translations = new Map()}

	async loadTranslations() {
		const directories = await _fs.FS.call(void 0, TRANSLATION_DIRECTORY).readdir();

		// ensure that english is the first entry when we iterate over Chat.languages
		exports.Chat.languages.set('english' , 'English');
		for (const dirname of directories) {
			const dir = _fs.FS.call(void 0, `${TRANSLATION_DIRECTORY}/${dirname}`);
			if (!dir.isDirectorySync()) continue;

			// For some reason, toID() isn't available as a global when this executes.
			const languageID = Dex.toID(dirname);
			const files = await dir.readdir();
			for (const filename of files) {
				if (!filename.endsWith('.js')) continue;

				const content = require(`${TRANSLATION_DIRECTORY}/${dirname}/${filename}`).translations;

				if (!exports.Chat.translations.has(languageID)) {
					exports.Chat.translations.set(languageID, new Map());
				}
				const translationsSoFar = exports.Chat.translations.get(languageID);

				if (content.name && !exports.Chat.languages.has(languageID)) {
					exports.Chat.languages.set(languageID, content.name);
				}

				if (content.strings) {
					for (const key in content.strings) {
						const keyLabels = [];
						const valLabels = [];
						const newKey = key.replace(/\${.+?}/g, str => {
							keyLabels.push(str);
							return '${}';
						}).replace(/\[TN: ?.+?\]/g, '');
						const val = content.strings[key].replace(/\${.+?}/g, (str) => {
							valLabels.push(str);
							return '${}';
						}).replace(/\[TN: ?.+?\]/g, '');
						translationsSoFar.set(newKey, [val, keyLabels, valLabels]);
					}
				}
			}
			if (!exports.Chat.languages.has(languageID)) {
				// Fallback in case no translation files provide the language's name
				exports.Chat.languages.set(languageID, "Unknown Language");
			}
		}
	}
	

	tr(language, strings = '', ...keys) {
		if (!language) language = 'english' ;
		// If strings is an array (normally the case), combine before translating.
		const trString = Array.isArray(strings) ? strings.join('${}') : strings;

		if (!exports.Chat.translations.has(language)) {
			if (!exports.Chat.translationsLoaded) return trString;
			throw new Error(`Trying to translate to a nonexistent language: ${language}`);
		}
		if (!strings.length) {
			return ((fStrings, ...fKeys) => exports.Chat.tr(language, fStrings, ...fKeys));
		}

		const entry = exports.Chat.translations.get(language).get(trString);
		let [translated, keyLabels, valLabels] = entry || ["", [], []];
		if (!translated) translated = trString;

		// Replace the gaps in the species string
		if (keys.length) {
			let reconstructed = '';

			const left = keyLabels.slice();
			for (const [i, str] of translated.split('${}').entries()) {
				reconstructed += str;
				if (keys[i]) {
					let index = left.indexOf(valLabels[i]);
					if (index < 0) {
						index = left.findIndex(val => !!val);
					}
					if (index < 0) index = i;
					reconstructed += keys[index];
					left[index] = null;
				}
			}

			translated = reconstructed;
		}
		return translated;
	}

	 __init17() {this.MessageContext = MessageContext};
	 __init18() {this.CommandContext = exports.CommandContext = CommandContext};
	 __init19() {this.PageContext = exports.PageContext = PageContext};
	 __init20() {this.ErrorMessage = exports.ErrorMessage = ErrorMessage};
	 __init21() {this.Interruption = exports.Interruption = Interruption};
	/**
	 * Command parser
	 *
	 * Usage:
	 *   Chat.parse(message, room, user, connection)
	 *
	 * Parses the message. If it's a command, the command is executed, if
	 * not, it's displayed directly in the room.
	 *
	 * Examples:
	 *   Chat.parse("/join lobby", room, user, connection)
	 *     will make the user join the lobby.
	 *
	 *   Chat.parse("Hi, guys!", room, user, connection)
	 *     will return "Hi, guys!" if the user isn't muted, or
	 *     if he's muted, will warn him that he's muted.
	 *
	 * The return value is the return value of the command handler, if any,
	 * or the message, if there wasn't a command. This value could be a success
	 * or failure (few commands report these) or a Promise for when the command
	 * is done executing, if it's not currently done.
	 *
	 * @param message - the message the user is trying to say
	 * @param room - the room the user is trying to say it in
	 * @param user - the user that sent the message
	 * @param connection - the connection the user sent the message from
	 */
	parse(message, room, user, connection) {
		exports.Chat.loadPlugins();
		const context = new CommandContext({message, room, user, connection});

		return context.parse();
	}
	sendPM(message, user, pmTarget, onlyRecipient = null) {
		const buf = `|pm|${user.getIdentity()}|${pmTarget.getIdentity()}|${message}`;
		if (onlyRecipient) return onlyRecipient.send(buf);
		user.send(buf);
		if (pmTarget !== user) pmTarget.send(buf);
		pmTarget.lastPM = user.id;
		user.lastPM = pmTarget.id;
	}

	__init22() {this.packageData = {}};

	loadPlugin(file) {
		let plugin;
		if (file.endsWith('.ts')) {
			plugin = require(`./${file.slice(0, -3)}`);
		} else if (file.endsWith('.js')) {
			// Switch to server/ because we'll be in .server-dist/ after this file is compiled
			plugin = require(`../server/${file}`);
		} else {
			return;
		}
		this.loadPluginData(plugin, _optionalChain([file, 'access', _56 => _56.split, 'call', _57 => _57('/'), 'access', _58 => _58.pop, 'call', _59 => _59(), 'optionalAccess', _60 => _60.slice, 'call', _61 => _61(0, -3)]) || file);
	}
	annotateCommands(commandTable, namespace = '') {
		for (const cmd in commandTable) {
			const entry = commandTable[cmd];
			if (typeof entry === 'object') {
				this.annotateCommands(entry, `${namespace}${cmd} `);
			}
			if (typeof entry !== 'function') continue;

			const handlerCode = entry.toString();
			entry.requiresRoom = /\bthis\.requires?Room\(/.test(handlerCode);
			entry.hasRoomPermissions = /\bthis\.(checkCan|can)\([^,)\n]*, [^,)\n]*,/.test(handlerCode);
			entry.broadcastable = cmd.endsWith('help') || /\bthis\.(?:(check|can|run)Broadcast)\(/.test(handlerCode);
			entry.isPrivate = /\bthis\.(?:privately(Check)?Can|commandDoesNotExist)\(/.test(handlerCode);

			// assign properties from the base command if the current command uses CommandContext.run.
			const runsCommand = /this.run\((?:'|"|`)(.*?)(?:'|"|`)\)/.exec(handlerCode);
			if (runsCommand) {
				const [, baseCommand] = runsCommand;
				const baseEntry = commandTable[baseCommand];
				if (baseEntry) {
					if (baseEntry.requiresRoom) entry.requiresRoom = baseEntry.requiresRoom;
					if (baseEntry.hasRoomPermissions) entry.hasRoomPermissions = baseEntry.hasRoomPermissions;
					if (baseEntry.broadcastable) entry.broadcastable = baseEntry.broadcastable;
					if (baseEntry.isPrivate) entry.isPrivate = baseEntry.isPrivate;
				}
			}

			// This is usually the same as `entry.name`, but some weirdness like
			// `commands.a = b` could screw it up. This should make it consistent.
			entry.cmd = cmd;
			entry.fullCmd = `${namespace}${cmd}`;
		}
		return commandTable;
	}
	loadPluginData(plugin, name) {
		if (plugin.commands) {
			Object.assign(exports.Chat.commands, this.annotateCommands(plugin.commands));
		}
		if (plugin.pages) Object.assign(exports.Chat.pages, plugin.pages);

		if (plugin.destroy) exports.Chat.destroyHandlers.push(plugin.destroy);
		if (plugin.roomSettings) {
			if (!Array.isArray(plugin.roomSettings)) plugin.roomSettings = [plugin.roomSettings];
			exports.Chat.roomSettings = exports.Chat.roomSettings.concat(plugin.roomSettings);
		}
		if (plugin.chatfilter) exports.Chat.filters.push(plugin.chatfilter);
		if (plugin.namefilter) exports.Chat.namefilters.push(plugin.namefilter);
		if (plugin.hostfilter) exports.Chat.hostfilters.push(plugin.hostfilter);
		if (plugin.loginfilter) exports.Chat.loginfilters.push(plugin.loginfilter);
		if (plugin.punishmentfilter) exports.Chat.punishmentfilters.push(plugin.punishmentfilter);
		if (plugin.nicknamefilter) exports.Chat.nicknamefilters.push(plugin.nicknamefilter);
		if (plugin.statusfilter) exports.Chat.statusfilters.push(plugin.statusfilter);
		exports.Chat.plugins[name] = plugin;
	}
	loadPlugins(oldPlugins) {
		if (exports.Chat.commands) return;
		if (oldPlugins) exports.Chat.oldPlugins = oldPlugins;

		void _fs.FS.call(void 0, 'package.json').readIfExists().then(data => {
			if (data) exports.Chat.packageData = JSON.parse(data);
		});

		// Install plug-in commands and chat filters

		// All resulting filenames will be relative to basePath
		const getFiles = (basePath, path) => {
			const filesInThisDir = _fs.FS.call(void 0, `${basePath}/${path}`).readdirSync();
			let allFiles = [];
			for (const file of filesInThisDir) {
				const fileWithPath = path + (path ? '/' : '') + file;
				if (_fs.FS.call(void 0, `${basePath}/${fileWithPath}`).isDirectorySync()) {
					if (file.startsWith('.')) continue;
					allFiles = allFiles.concat(getFiles(basePath, fileWithPath));
				} else {
					allFiles.push(fileWithPath);
				}
			}
			return allFiles;
		};

		exports.Chat.commands = Object.create(null);
		exports.Chat.pages = Object.create(null);
		const coreFiles = _fs.FS.call(void 0, 'server/chat-commands').readdirSync();
		for (const file of coreFiles) {
			this.loadPlugin(`chat-commands/${file}`);
		}
		exports.Chat.baseCommands = exports.Chat.commands;
		exports.Chat.basePages = exports.Chat.pages;
		exports.Chat.commands = Object.assign(Object.create(null), exports.Chat.baseCommands);
		exports.Chat.pages = Object.assign(Object.create(null), exports.Chat.basePages);

		// Load filters from Config
		this.loadPluginData(Config, 'config');
		this.loadPluginData(Tournaments, 'tournaments');

		let files = _fs.FS.call(void 0, 'server/chat-plugins').readdirSync();
		try {
			if (_fs.FS.call(void 0, 'server/chat-plugins/private').isDirectorySync()) {
				files = files.concat(getFiles('server/chat-plugins', 'private'));
			}
		} catch (err) {
			if (err.code !== 'ENOENT') throw err;
		}

		for (const file of files) {
			this.loadPlugin(`chat-plugins/${file}`);
		}
		exports.Chat.oldPlugins = {};
	}
	destroy() {
		for (const handler of exports.Chat.destroyHandlers) {
			handler();
		}
	}

	/**
	 * Takes a chat message and returns data about any command it's
	 * trying to use.
	 *
	 * Returning `null` means the chat message isn't trying to use
	 * a command, and returning `{handler: null}` means it's trying
	 * to use a command that doesn't exist.
	 */
	parseCommand(message, recursing = false)

 {
		if (!message.trim()) return null;

		// hardcoded commands
		if (message.startsWith(`>> `)) {
			message = `/eval ${message.slice(3)}`;
		} else if (message.startsWith(`>>> `)) {
			message = `/evalbattle ${message.slice(4)}`;
		} else if (message.startsWith(`/me`) && /[^A-Za-z0-9 ]/.test(message.charAt(3))) {
			message = `/mee ${message.slice(3)}`;
		} else if (message.startsWith(`/ME`) && /[^A-Za-z0-9 ]/.test(message.charAt(3))) {
			message = `/MEE ${message.slice(3)}`;
		}

		const cmdToken = message.charAt(0);
		if (!VALID_COMMAND_TOKENS.includes(cmdToken)) return null;
		if (cmdToken === message.charAt(1)) return null;
		if (cmdToken === BROADCAST_TOKEN && /[^A-Za-z0-9]/.test(message.charAt(1))) return null;

		let [cmd, target] = _utils.Utils.splitFirst(message.slice(1), ' ');
		cmd = cmd.toLowerCase();

		if (cmd.endsWith(',')) cmd = cmd.slice(0, -1);

		let curCommands = exports.Chat.commands;
		let commandHandler;
		let fullCmd = cmd;

		do {
			if (cmd in curCommands) {
				commandHandler = curCommands[cmd];
			} else {
				commandHandler = undefined;
			}
			if (typeof commandHandler === 'string') {
				// in case someone messed up, don't loop
				commandHandler = curCommands[commandHandler];
			} else if (Array.isArray(commandHandler) && !recursing) {
				return this.parseCommand(cmdToken + 'help ' + fullCmd.slice(0, -4), true);
			}
			if (commandHandler && typeof commandHandler === 'object') {
				[cmd, target] = _utils.Utils.splitFirst(target, ' ');
				cmd = cmd.toLowerCase();

				fullCmd += ' ' + cmd;
				curCommands = commandHandler ;
			}
		} while (commandHandler && typeof commandHandler === 'object');

		if (!commandHandler && curCommands.default) {
			commandHandler = curCommands.default;
			if (typeof commandHandler === 'string') {
				commandHandler = curCommands[commandHandler];
			}
		}

		if (!commandHandler && !recursing) {
			for (const g in Config.groups) {
				const groupid = Config.groups[g].id;
				if (fullCmd === groupid) {
					return this.parseCommand(`/promote ${target}, ${g}`, true);
				} else if (fullCmd === 'global' + groupid) {
					return this.parseCommand(`/globalpromote ${target}, ${g}`, true);
				} else if (fullCmd === 'de' + groupid || fullCmd === 'un' + groupid ||
						fullCmd === 'globalde' + groupid || fullCmd === 'deglobal' + groupid) {
					return this.parseCommand(`/demote ${target}`, true);
				} else if (fullCmd === 'room' + groupid) {
					return this.parseCommand(`/roompromote ${target}, ${g}`, true);
				} else if (fullCmd === 'forceroom' + groupid) {
					return this.parseCommand(`/forceroompromote ${target}, ${g}`, true);
				} else if (fullCmd === 'roomde' + groupid || fullCmd === 'deroom' + groupid || fullCmd === 'roomun' + groupid) {
					return this.parseCommand(`/roomdemote ${target}`, true);
				}
			}
		}

		return {
			cmd: cmd,
			cmdToken: cmdToken,
			target: target,
			fullCmd: fullCmd,
			handler: commandHandler ,
		};
	}

	/**
	 * Strips HTML from a string.
	 */
	stripHTML(htmlContent) {
		if (!htmlContent) return '';
		return htmlContent.replace(/<[^>]*>/g, '');
	}
	/**
	 * Validates input regex and ensures it won't crash.
	 */
	validateRegex(word) {
		word = word.trim();
		if (word.endsWith('|') || word.startsWith('|')) {
			throw new exports.Chat.ErrorMessage(`Your regex was rejected because it included an unterminated |.`);
		}
		try {
			// eslint-disable-next-line no-new
			new RegExp(word);
		} catch (e) {
			throw new exports.Chat.ErrorMessage(
				e.message.startsWith('Invalid regular expression: ') ?
					e.message :
					`Invalid regular expression: /${word}/: ${e.message}`
			);
		}
	}

	/**
	 * Returns singular (defaulting to '') if num is 1, or plural
	 * (defaulting to 's') otherwise. Helper function for pluralizing
	 * words.
	 */
	plural(num, pluralSuffix = 's', singular = '') {
		if (num && typeof num.length === 'number') {
			num = num.length;
		} else if (num && typeof num.size === 'number') {
			num = num.size;
		} else {
			num = Number(num);
		}
		return (num !== 1 ? pluralSuffix : singular);
	}

	/**
	 * Counts the thing passed.
	 *
	 *     Chat.count(2, "days") === "2 days"
	 *     Chat.count(1, "days") === "1 day"
	 *     Chat.count(["foo"], "things are") === "1 thing is"
	 *
	 */
	count(num, pluralSuffix, singular = "") {
		if (num && typeof num.length === 'number') {
			num = num.length;
		} else if (num && typeof num.size === 'number') {
			num = num.size;
		} else {
			num = Number(num);
		}
		if (!singular) {
			if (pluralSuffix.endsWith("s")) {
				singular = pluralSuffix.slice(0, -1);
			} else if (pluralSuffix.endsWith("s have")) {
				singular = pluralSuffix.slice(0, -6) + " has";
			} else if (pluralSuffix.endsWith("s were")) {
				singular = pluralSuffix.slice(0, -6) + " was";
			}
		}
		const space = singular.startsWith('<') ? '' : ' ';
		return `${num}${space}${num > 1 ? pluralSuffix : singular}`;
	}

	/**
	 * Returns a timestamp in the form {yyyy}-{MM}-{dd} {hh}:{mm}:{ss}.
	 *
	 * options.human = true will reports hours human-readable
	 */
	toTimestamp(date, options = {}) {
		const human = options.human;
		let parts = [
			date.getFullYear(),	date.getMonth() + 1, date.getDate(),
			date.getHours(), date.getMinutes(),	date.getSeconds(),
		];
		if (human) {
			parts.push(parts[3] >= 12 ? 'pm' : 'am');
			parts[3] = parts[3] % 12 || 12;
		}
		parts = parts.map(val => val < 10 ? '0' + val : '' + val);
		return parts.slice(0, 3).join("-") + " " + parts.slice(3, human ? 5 : 6).join(":") + (human ? "" + parts[6] : "");
	}

	/**
	 * Takes a number of milliseconds, and reports the duration in English: hours, minutes, etc.
	 *
	 * options.hhmmss = true will instead report the duration in 00:00:00 format
	 *
	 */
	toDurationString(val, options = {}) {
		// TODO: replace by Intl.DurationFormat or equivalent when it becomes available (ECMA-402)
		// https://github.com/tc39/ecma402/issues/47
		const date = new Date(+val);
		if (isNaN(date.getTime())) return 'forever';

		const parts = [
			date.getUTCFullYear() - 1970, date.getUTCMonth(), date.getUTCDate() - 1,
			date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(),
		];
		const roundingBoundaries = [6, 15, 12, 30, 30];
		const unitNames = ["second", "minute", "hour", "day", "month", "year"];
		const positiveIndex = parts.findIndex(elem => elem > 0);
		let precision = (_optionalChain([options, 'optionalAccess', _62 => _62.precision]) ? options.precision : 3);
		if (_optionalChain([options, 'optionalAccess', _63 => _63.hhmmss])) {
			const str = parts.slice(positiveIndex).map(value => value < 10 ? "0" + value : "" + value).join(":");
			return str.length === 2 ? "00:" + str : str;
		}

		// round least significant displayed unit
		if (positiveIndex + precision < parts.length && precision > 0 && positiveIndex >= 0) {
			if (parts[positiveIndex + precision] >= roundingBoundaries[positiveIndex + precision - 1]) {
				parts[positiveIndex + precision - 1]++;
			}
		}

		// don't display trailing 0's if the number is exact
		let precisionIndex = 5;
		while (precisionIndex > positiveIndex && !parts[precisionIndex]) {
			precisionIndex--;
		}
		precision = Math.min(precision, precisionIndex - positiveIndex + 1);

		return parts
			.slice(positiveIndex)
			.reverse()
			.map((value, index) => `${value} ${unitNames[index]}${value !== 1 ? "s" : ""}`)
			.reverse()
			.slice(0, precision)
			.join(" ")
			.trim();
	}

	/**
	 * Takes an array and turns it into a sentence string by adding commas and the word "and"
	 */
	toListString(arr) {
		if (!arr.length) return '';
		if (arr.length === 1) return arr[0];
		if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
		return `${arr.slice(0, -1).join(", ")}, and ${arr.slice(-1)[0]}`;
	}

	/**
	 * Takes an array and turns it into a sentence string by adding commas and the word "or"
	 */
	toOrList(arr) {
		if (!arr.length) return '';
		if (arr.length === 1) return arr[0];
		if (arr.length === 2) return `${arr[0]} or ${arr[1]}`;
		return `${arr.slice(0, -1).join(", ")}, or ${arr.slice(-1)[0]}`;
	}

	/**
	 * Convert multiline HTML into a single line without losing whitespace (so
	 * <pre> blocks still render correctly). Linebreaks inside <> are replaced
	 * with ` `, and linebreaks outside <> are replaced with `&#10;`.
	 *
	 * PS's protocol often requires sending a block of HTML in a single line,
	 * so this ensures any block of HTML ends up as a single line.
	 */
	collapseLineBreaksHTML(htmlContent) {
		htmlContent = htmlContent.replace(/<[^>]*>/g, tag => tag.replace(/\n/g, ' '));
		htmlContent = htmlContent.replace(/\n/g, '&#10;');
		return htmlContent;
	}
	/**
	 * Takes a string of text and transforms it into a block of html using the details tag.
	 * If it has a newline, will make the 3 lines the preview, and fill the rest in.
	 * @param str string to block
	 */
	getReadmoreBlock(str, isCode, cutoff = 3) {
		const params = str.slice(+str.startsWith('\n')).split('\n');
		const output = [];
		for (const param of params) {
			if (output.length < cutoff && param.length > 80 && cutoff > 2) cutoff--;
			output.push(_utils.Utils.escapeHTML(param));
		}

		if (output.length > cutoff) {
			return `<details class="readmore${isCode ? ` code` : ``}" style="white-space: pre-wrap; display: table; tab-size: 3"><summary>${
				output.slice(0, cutoff).join('<br />')
			}</summary>${
				output.slice(cutoff).join('<br />')
			}</details>`;
		} else {
			const tag = isCode ? `code` : `div`;
			return `<${tag} style="white-space: pre-wrap; display: table; tab-size: 3">${
				output.join('<br />')
			}</${tag}>`;
		}
	}

	getReadmoreCodeBlock(str, cutoff) {
		return exports.Chat.getReadmoreBlock(str, true, cutoff);
	}

	getDataPokemonHTML(species, gen = 8, tier = '') {
		let buf = '<li class="result">';
		buf += '<span class="col numcol">' + (tier || species.tier) + '</span> ';
		buf += `<span class="col iconcol"><psicon pokemon="${species.id}"/></span> `;
		buf += `<span class="col pokemonnamecol" style="white-space:nowrap"><a href="https://${Config.routes.dex}/pokemon/${species.id}" target="_blank">${species.name}</a></span> `;
		buf += '<span class="col typecol">';
		if (species.types) {
			for (const type of species.types) {
				buf += `<img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32">`;
			}
		}
		buf += '</span> ';
		if (gen >= 3) {
			buf += '<span style="float:left;min-height:26px">';
			if (species.abilities['1'] && (gen >= 4 || Dex.getAbility(species.abilities['1']).gen === 3)) {
				buf += '<span class="col twoabilitycol">' + species.abilities['0'] + '<br />' + species.abilities['1'] + '</span>';
			} else {
				buf += '<span class="col abilitycol">' + species.abilities['0'] + '</span>';
			}
			if (species.abilities['H'] && species.abilities['S']) {
				buf += '<span class="col twoabilitycol' + (species.unreleasedHidden ? ' unreleasedhacol' : '') + '"><em>' + species.abilities['H'] + '<br />(' + species.abilities['S'] + ')</em></span>';
			} else if (species.abilities['H']) {
				buf += '<span class="col abilitycol' + (species.unreleasedHidden ? ' unreleasedhacol' : '') + '"><em>' + species.abilities['H'] + '</em></span>';
			} else if (species.abilities['S']) {
				// special case for Zygarde
				buf += '<span class="col abilitycol"><em>(' + species.abilities['S'] + ')</em></span>';
			} else {
				buf += '<span class="col abilitycol"></span>';
			}
			buf += '</span>';
		}
		buf += '<span style="float:left;min-height:26px">';
		buf += '<span class="col statcol"><em>HP</em><br />' + species.baseStats.hp + '</span> ';
		buf += '<span class="col statcol"><em>Atk</em><br />' + species.baseStats.atk + '</span> ';
		buf += '<span class="col statcol"><em>Def</em><br />' + species.baseStats.def + '</span> ';
		if (gen <= 1) {
			buf += '<span class="col statcol"><em>Spc</em><br />' + species.baseStats.spa + '</span> ';
		} else {
			buf += '<span class="col statcol"><em>SpA</em><br />' + species.baseStats.spa + '</span> ';
			buf += '<span class="col statcol"><em>SpD</em><br />' + species.baseStats.spd + '</span> ';
		}
		buf += '<span class="col statcol"><em>Spe</em><br />' + species.baseStats.spe + '</span> ';
		buf += '<span class="col bstcol"><em>BST<br />' + species.bst + '</em></span> ';
		buf += '</span>';
		buf += '</li>';
		return `<div class="message"><ul class="utilichart">${buf}<li style="clear:both"></li></ul></div>`;
	}
	getDataMoveHTML(move) {
		let buf = `<ul class="utilichart"><li class="result">`;
		buf += `<span class="col movenamecol"><a href="https://${Config.routes.dex}/moves/${move.id}">${move.name}</a></span> `;
		// encoding is important for the ??? type icon
		const encodedMoveType = encodeURIComponent(move.type);
		buf += `<span class="col typecol"><img src="//${Config.routes.client}/sprites/types/${encodedMoveType}.png" alt="${move.type}" width="32" height="14">`;
		buf += `<img src="//${Config.routes.client}/sprites/categories/${move.category}.png" alt="${move.category}" width="32" height="14"></span> `;
		if (move.basePower) {
			buf += `<span class="col labelcol"><em>Power</em><br>${typeof move.basePower === 'number' ? move.basePower : '—'}</span> `;
		}
		buf += `<span class="col widelabelcol"><em>Accuracy</em><br>${typeof move.accuracy === 'number' ? (move.accuracy + '%') : '—'}</span> `;
		const basePP = move.pp || 1;
		const pp = Math.floor(move.noPPBoosts ? basePP : basePP * 8 / 5);
		buf += `<span class="col pplabelcol"><em>PP</em><br>${pp}</span> `;
		buf += `<span class="col movedesccol">${move.shortDesc || move.desc}</span> `;
		buf += `</li><li style="clear:both"></li></ul>`;
		return buf;
	}
	getDataAbilityHTML(ability) {
		let buf = `<ul class="utilichart"><li class="result">`;
		buf += `<span class="col namecol"><a href="https://${Config.routes.dex}/abilities/${ability.id}">${ability.name}</a></span> `;
		buf += `<span class="col abilitydesccol">${ability.shortDesc || ability.desc}</span> `;
		buf += `</li><li style="clear:both"></li></ul>`;
		return buf;
	}
	getDataItemHTML(item) {
		let buf = `<ul class="utilichart"><li class="result">`;
		buf += `<span class="col itemiconcol"><psicon item="${item.id}"></span> <span class="col namecol"><a href="https://${Config.routes.dex}/items/${item.id}">${item.name}</a></span> `;
		buf += `<span class="col itemdesccol">${item.shortDesc || item.desc}</span> `;
		buf += `</li><li style="clear:both"></li></ul>`;
		return buf;
	}

	/**
	 * Gets the dimension of the image at url. Returns 0x0 if the image isn't found, as well as the relevant error.
	 */
	getImageDimensions(url) {
		return probe(url);
	}

	/**
	 * Normalize a message for the purposes of applying chat filters.
	 *
	 * Not used by PS itself, but feel free to use it in your own chat filters.
	 */
	normalize(message) {
		message = message.replace(/'/g, '').replace(/[^A-Za-z0-9]+/g, ' ').trim();
		if (!/[A-Za-z][A-Za-z]/.test(message)) {
			message = message.replace(/ */g, '');
		} else if (!message.includes(' ')) {
			message = message.replace(/([A-Z])/g, ' $1').trim();
		}
		return ' ' + message.toLowerCase() + ' ';
	}

	/**
	 * Generates dimensions to fit an image at url into a maximum size of maxWidth x maxHeight,
	 * preserving aspect ratio.
	 *
	 * @return [width, height, resized]
	 */
	async fitImage(url, maxHeight = 300, maxWidth = 300) {
		const {height, width} = await exports.Chat.getImageDimensions(url);

		if (width <= maxWidth && height <= maxHeight) return [width, height, false];

		const ratio = Math.min(maxHeight / height, maxWidth / width);

		return [Math.round(width * ratio), Math.round(height * ratio), true];
	}

	/**
	 * Notifies a targetUser that a user was blocked from reaching them due to a setting they have enabled.
	 */
	maybeNotifyBlocked(blocked, targetUser, user) {
		const prefix = `|pm|&|${targetUser.getIdentity()}|/nonotify `;
		const options = 'or change it in the <button name="openOptions" class="subtle">Options</button> menu in the upper right.';
		if (blocked === 'pm') {
			if (!targetUser.notified.blockPMs) {
				targetUser.send(`${prefix}The user '${_utils.Utils.escapeHTML(user.name)}' attempted to PM you but was blocked. To enable PMs, use /unblockpms ${options}`);
				targetUser.notified.blockPMs = true;
			}
		} else if (blocked === 'challenge') {
			if (!targetUser.notified.blockChallenges) {
				targetUser.send(`${prefix}The user '${_utils.Utils.escapeHTML(user.name)}' attempted to challenge you to a battle but was blocked. To enable challenges, use /unblockchallenges ${options}`);
				targetUser.notified.blockChallenges = true;
			}
		} else if (blocked === 'invite') {
			if (!targetUser.notified.blockInvites) {
				targetUser.send(`${prefix}The user '${_utils.Utils.escapeHTML(user.name)}' attempted to invite you to a room but was blocked. To enable invites, use /unblockinvites.`);
				targetUser.notified.blockInvites = true;
			}
		}
	}
	 __init23() {this.formatText = _chatformatter.formatText};
	 __init24() {this.linkRegex = _chatformatter.linkRegex};
	 __init25() {this.stripFormatting = _chatformatter.stripFormatting};

	 __init26() {this.filterWords = {}};
	 __init27() {this.monitors = {}};

	registerMonitor(id, entry) {
		if (!exports.Chat.filterWords[id]) exports.Chat.filterWords[id] = [];
		exports.Chat.monitors[id] = entry;
	}

	resolvePage(pageid, user, connection) {
		return (new PageContext({pageid, user, connection, language: user.language})).resolve();
	}
}, _class); exports.Chat = Chat;

// backwards compatibility; don't actually use these
// they're just there so forks have time to slowly transition
(exports.Chat ).escapeHTML = _utils.Utils.escapeHTML;
(exports.Chat ).html = _utils.Utils.html;
(exports.Chat ).splitFirst = _utils.Utils.splitFirst;
// @ts-ignore
CommandContext.prototype.can = CommandContext.prototype.checkCan;
// @ts-ignore
CommandContext.prototype.canTalk = CommandContext.prototype.checkChat;
// @ts-ignore
CommandContext.prototype.canBroadcast = CommandContext.prototype.checkBroadcast;
// @ts-ignore
CommandContext.prototype.canHTML = CommandContext.prototype.checkHTML;
// @ts-ignore
CommandContext.prototype.canEmbedURI = CommandContext.prototype.checkEmbedURI;
// @ts-ignore
CommandContext.prototype.canPMHTML = CommandContext.prototype.checkPMHTML;
// @ts-ignore
CommandContext.prototype.privatelyCan = CommandContext.prototype.privatelyCheckCan;
// @ts-ignore
CommandContext.prototype.requiresRoom = CommandContext.prototype.requireRoom;

/**
 * Used by ChatMonitor.
 */

























