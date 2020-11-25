"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _fs = require('../../.lib-dist/fs');
var _utils = require('../../.lib-dist/utils');

 const ROOMFAQ_FILE = 'config/chat-plugins/faqs.json'; exports.ROOMFAQ_FILE = ROOMFAQ_FILE;
const MAX_ROOMFAQ_LENGTH = 8192;

 const roomFaqs = JSON.parse(_fs.FS.call(void 0, exports.ROOMFAQ_FILE).readIfExistsSync() || "{}"); exports.roomFaqs = roomFaqs;

function saveRoomFaqs() {
	_fs.FS.call(void 0, exports.ROOMFAQ_FILE).writeUpdate(() => JSON.stringify(exports.roomFaqs));
}

/**
 * Aliases are implemented as a "regular" FAQ entry starting with a >. EX: {a: "text", b: ">a"}
 * This is done to allow easy checking whether a key is associated with
 * a value or alias as well as preserve backwards compatibility.
 */
 function getAlias(roomid, key) {
	if (!exports.roomFaqs[roomid]) return false;
	const value = exports.roomFaqs[roomid][key];
	if (value && value.startsWith('>')) return value.substr(1);
	return false;
} exports.getAlias = getAlias;

 const commands = {
	addfaq(target, room, user, connection) {
		room = this.requireRoom();
		this.checkCan('ban', null, room);
		if (!room.persist) return this.errorReply("This command is unavailable in temporary rooms.");
		if (!target) return this.parse('/help roomfaq');

		target = target.trim();
		const input = this.filter(target);
		if (target !== input) return this.errorReply("You are not allowed to use fitered words in roomfaq entries.");
		let [topic, ...rest] = input.split(',');

		topic = toID(topic);
		if (!(topic && rest.length)) return this.parse('/help roomfaq');
		let text = rest.join(',').trim();
		if (topic.length > 25) return this.errorReply("FAQ topics should not exceed 25 characters.");
		if (Chat.stripFormatting(text).length > MAX_ROOMFAQ_LENGTH) {
			return this.errorReply(`FAQ entries should not exceed ${MAX_ROOMFAQ_LENGTH} characters.`);
		}

		text = text.replace(/^>/, '&gt;');

		if (!exports.roomFaqs[room.roomid]) exports.roomFaqs[room.roomid] = {};
		exports.roomFaqs[room.roomid][topic] = text;
		saveRoomFaqs();
		this.sendReplyBox(Chat.formatText(text, true));
		this.privateModAction(`${user.name} added a FAQ for '${topic}'`);
		this.modlog('RFAQ', null, `added '${topic}'`);
	},
	removefaq(target, room, user) {
		target = target.trim();
		let [topic, roomid] = _utils.Utils.splitFirst(target, ',');
		const targetRoom = roomid ? Rooms.search(roomid) : room;
		if (!targetRoom) return this.errorReply(`Invalid room.`);
		if (!targetRoom.persist) {
			return this.errorReply("This command is unavailable in temporary rooms.");
		}
		this.room = targetRoom;
		this.checkChat();
		this.checkCan('ban', null, targetRoom);
		topic = toID(topic);
		if (!topic) return this.parse('/help roomfaq');

		if (!(exports.roomFaqs[targetRoom.roomid] && exports.roomFaqs[targetRoom.roomid][topic])) return this.errorReply("Invalid topic.");
		if (
			_optionalChain([targetRoom, 'access', _ => _.settings, 'access', _2 => _2.repeats, 'optionalAccess', _3 => _3.length]) &&
			targetRoom.settings.repeats.filter(x => x.faq && x.id === (getAlias(targetRoom.roomid, topic) || topic)).length
		) {
			this.parse(`/removerepeat ${getAlias(targetRoom.roomid, topic) || topic},${targetRoom.roomid}`);
		}
		delete exports.roomFaqs[targetRoom.roomid][topic];
		Object.keys(exports.roomFaqs[targetRoom.roomid]).filter(
			val => getAlias(targetRoom.roomid, val) === topic
		).map(
			val => delete exports.roomFaqs[targetRoom.roomid][val]
		);
		if (!Object.keys(exports.roomFaqs[targetRoom.roomid]).length) delete exports.roomFaqs[targetRoom.roomid];
		saveRoomFaqs();
		this.privateModAction(`${user.name} removed the FAQ for '${topic}'`);
		this.modlog('ROOMFAQ', null, `removed ${topic}`);
		if (roomid) this.parse(`/join view-roomfaqs-${targetRoom.roomid}`);
	},
	addalias(target, room, user) {
		room = this.requireRoom();
		this.checkChat();
		this.checkCan('ban', null, room);
		if (!room.persist) return this.errorReply("This command is unavailable in temporary rooms.");
		const [alias, topic] = target.split(',').map(val => toID(val));

		if (!(alias && topic)) return this.parse('/help roomfaq');
		if (alias.length > 25) return this.errorReply("FAQ topics should not exceed 25 characters.");

		if (!(exports.roomFaqs[room.roomid] && topic in exports.roomFaqs[room.roomid])) {
			return this.errorReply(`The topic ${topic} was not found in this room's faq list.`);
		}
		if (getAlias(room.roomid, topic)) {
			return this.errorReply(`You cannot make an alias of an alias. Use /addalias ${alias}, ${getAlias(room.roomid, topic)} instead.`);
		}
		exports.roomFaqs[room.roomid][alias] = `>${topic}`;
		saveRoomFaqs();
		this.privateModAction(`${user.name} added an alias for '${topic}': ${alias}`);
		this.modlog('ROOMFAQ', null, `alias for '${topic}' - ${alias}`);
	},
	viewfaq: 'roomfaq',
	rfaq: 'roomfaq',
	roomfaq(target, room, user, connection, cmd) {
		room = this.requireRoom();
		if (!exports.roomFaqs[room.roomid]) return this.errorReply("This room has no FAQ topics.");
		let topic = toID(target);
		if (topic === 'constructor') return false;
		if (!topic) {
			return this.parse(`/join view-roomfaqs-${room.roomid}`);
		}
		if (!exports.roomFaqs[room.roomid][topic]) return this.errorReply("Invalid topic.");
		topic = getAlias(room.roomid, topic) || topic;

		if (!this.runBroadcast()) return;
		this.sendReplyBox(Chat.formatText(exports.roomFaqs[room.roomid][topic], true));
	},
	roomfaqhelp: [
		`/roomfaq - Shows the list of all available FAQ topics`,
		`/roomfaq <topic> - Shows the FAQ for <topic>.`,
		`/addfaq <topic>, <text> - Adds an entry for <topic> in this room or updates it. Requires: @ # &`,
		`/addalias <alias>, <topic> - Adds <alias> as an alias for <topic>, displaying it when users use /roomfaq <alias>. Requires: @ # &`,
		`/removefaq <topic> - Removes the entry for <topic> in this room. If used on an alias, removes the alias. Requires: @ # &`,
	],
}; exports.commands = commands;

 const pages = {
	roomfaqs(args, user) {
		const room = this.requireRoom();
		this.title = `[Room FAQs]`;
		// allow it for users if they can access the room
		if (!room.checkModjoin(user)) {
			throw new Chat.ErrorMessage(`<h2>Access denied.</h2>`);
		}
		let buf = `<div class="pad"><button style="float:right;" class="button" name="send" value="/join view-roomfaqs-${room.roomid}"><i class="fa fa-refresh"></i> Refresh</button>`;
		if (!exports.roomFaqs[room.roomid]) {
			return `${buf}<h2>This room has no FAQs.</h2></div>`;
		}

		buf += `<h2>FAQs for ${room.title}:</h2>`;
		const keys = Object.keys(exports.roomFaqs[room.roomid]);
		const sortedKeys = keys.filter(val => !getAlias(room.roomid, val)).sort((a, b) => a.localeCompare(b));
		for (const key of sortedKeys) {
			const topic = exports.roomFaqs[room.roomid][key];
			buf += `<div class="infobox">`;
			buf += `<h3>${key}</h3>`;
			buf += `<hr />`;
			buf += Chat.formatText(topic, true);
			const aliases = keys.filter(val => getAlias(room.roomid, val) === key);
			if (aliases.length) {
				buf += `<hr /><strong>Aliases:</strong> ${aliases.join(', ')}`;
			}
			if (user.can('ban', null, room, 'addfaq')) {
				const src = _utils.Utils.escapeHTML(topic).replace(/\n/g, `<br />`);
				buf += `<hr /><details><summary>Raw text</summary>`;
				buf += `<code style="white-space: pre-wrap; display: table; tab-size: 3;">/addfaq ${key}, ${src}</code></details>`;
				buf += `<hr /><button class="button" name="send" value="/removefaq ${key},${room.roomid}">Delete FAQ</button>`;
			}
			buf += `</div>`;
		}
		buf += `</div>`;
		return buf;
	},
}; exports.pages = pages;

process.nextTick(() => {
	Chat.multiLinePattern.register('/addfaq ');
});
