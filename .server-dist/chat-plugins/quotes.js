"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _utils = require('../../.lib-dist/utils');
var _fs = require('../../.lib-dist/fs');

const STORAGE_PATH = 'config/chat-plugins/quotes.json';
const MAX_QUOTES = 200;







const quotes = JSON.parse(_fs.FS.call(void 0, STORAGE_PATH).readIfExistsSync() || "{}");

// migrate quotes out of roomsettings
function convertOldQuotes() {
	for (const room of Rooms.rooms.values()) {
		// @ts-ignore
		if (room.settings.quotes) {
			// @ts-ignore
			quotes[room.roomid] = room.settings.quotes;
			// @ts-ignore
			delete room.settings.quotes;
			room.saveSettings();
			saveQuotes();
		}
	}
}

function saveQuotes() {
	_fs.FS.call(void 0, STORAGE_PATH).writeUpdate(() => JSON.stringify(quotes));
}

convertOldQuotes();

 const commands = {
	randquote(target, room, user) {
		room = this.requireRoom();
		const roomQuotes = quotes[room.roomid];
		if (!_optionalChain([roomQuotes, 'optionalAccess', _ => _.length])) return this.errorReply(`This room has no quotes.`);
		this.runBroadcast(true);
		const {quote, date, userid} = roomQuotes[Math.floor(Math.random() * roomQuotes.length)];
		const time = Chat.toTimestamp(new Date(date), {human: true});
		const attribution = toID(target) === 'showauthor' ? `<hr /><small>Added by ${userid} on ${time}</small>` : '';
		return this.sendReplyBox(`${Chat.getReadmoreBlock(quote)}${attribution}`);
	},
	randquotehelp: [`/randquote [showauthor] - Show a random quote from the room. Add 'showauthor' to see who added it and when.`],

	addquote: 'quote',
	quote(target, room, user) {
		room = this.requireRoom();
		if (!room.persist) {
			return this.errorReply("This command is unavailable in temporary rooms.");
		}
		target = target.trim();
		this.checkCan('mute', null, room);
		if (!target) {
			return this.parse(`/help quote`);
		}
		if (!quotes[room.roomid]) quotes[room.roomid] = [];

		const roomQuotes = quotes[room.roomid];
		if (this.filter(target) !== target) {
			return this.errorReply(`Invalid quote.`);
		}
		if (roomQuotes.filter(item => item.quote === target).length) {
			return this.errorReply(`"${target}" is already quoted in this room.`);
		}
		if (target.length > 8192) {
			return this.errorReply(`Your quote cannot exceed 8192 characters.`);
		}
		if (room.settings.isPrivate !== undefined && roomQuotes.length >= MAX_QUOTES) {
			return this.errorReply(`This room already has ${MAX_QUOTES} quotes, which is the maximum for private rooms.`);
		}
		roomQuotes.push({userid: user.id, quote: target, date: Date.now()});
		saveQuotes();
		const collapsedQuote = target.replace(/\n/g, ' ');
		this.privateModAction(`${user.name} added a new quote: "${collapsedQuote}".`);
		return this.modlog(`ADDQUOTE`, null, collapsedQuote);
	},
	quotehelp: [`/quote [quote] - Adds [quote] to the room's quotes. Requires: % @ # &`],

	removequote(target, room, user) {
		target = target.trim();
		const [idx, roomid] = _utils.Utils.splitFirst(target, ',');
		const targetRoom = roomid ? Rooms.search(roomid) : room;
		if (!targetRoom) return this.errorReply(`Invalid room.`);
		if (!targetRoom.persist) {
			return this.errorReply("This command is unavailable in temporary rooms.");
		}
		this.room = targetRoom;
		this.checkCan('mute', null, targetRoom);
		if (!_optionalChain([quotes, 'access', _2 => _2[targetRoom.roomid], 'optionalAccess', _3 => _3.length])) return this.errorReply(`This room has no quotes.`);
		const index = parseInt(idx);
		if (isNaN(index)) {
			return this.errorReply(`Invalid index.`);
		}
		const roomQuotes = quotes[targetRoom.roomid];
		if (!roomQuotes[index - 1]) {
			return this.errorReply(`Quote not found.`);
		}
		const [removed] = roomQuotes.splice(index - 1, 1);
		const collapsedQuote = removed.quote.replace(/\n/g, ' ');
		this.privateModAction(`${user.name} removed quote indexed at ${index}: "${collapsedQuote}" (originally added by ${removed.userid}).`);
		this.modlog(`REMOVEQUOTE`, null, collapsedQuote);
		saveQuotes();
		if (roomid) this.parse(`/join view-quotes-${targetRoom.roomid}`);
	},
	removequotehelp: [`/removequote [index] - Removes the quote from the room's quotes. Requires: % @ # &`],

	viewquotes: 'quotes',
	quotes(target, room) {
		const targetRoom = target ? Rooms.search(target) : room;
		if (!targetRoom) return this.errorReply(`Invalid room.`);
		return this.parse(`/join view-quotes-${targetRoom.roomid}`);
	},
	quoteshelp: [`/quotes [room] - Shows all quotes for [room]. Defaults the room the command is used in.`],
}; exports.commands = commands;

 const pages = {
	quotes(args, user) {
		const room = this.requireRoom();
		this.title = `[Quotes]`;
		// allow it for users if they can access the room
		if (!room.checkModjoin(user)) {
			return this.errorReply(`Access denied.`);
		}
		let buffer = `<div class="pad">`;
		buffer += `<button style="float:right;" class="button" name="send" value="/join view-quotes-${room.roomid}"><i class="fa fa-refresh"></i> Refresh</button>`;

		const roomQuotes = quotes[room.roomid];
		if (!_optionalChain([roomQuotes, 'optionalAccess', _4 => _4.length])) {
			return `${buffer}<h2>This room has no quotes.</h2></div>`;
		}

		buffer += _utils.Utils.html`<h2>Quotes for ${room.title} (${roomQuotes.length}):</h2>`;
		for (const [i, quoteObj] of roomQuotes.entries()) {
			const index = i + 1;
			const {quote, userid, date} = quoteObj;
			buffer += `<div class="infobox">${Chat.formatText(quote, false, true)}`;
			buffer += `<br /><hr /><small>Added by ${userid} on ${Chat.toTimestamp(new Date(date), {human: true})}</small>`;
			if (user.can('mute', null, room)) {
				buffer += ` <button class="button" name="send" value="/removequote ${index},${room.roomid}">Remove</button>`;
			}
			buffer += `</div>`;
		}
		buffer += `</div>`;
		return buffer;
	},
}; exports.pages = pages;
