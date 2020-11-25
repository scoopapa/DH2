"use strict";Object.defineProperty(exports, "__esModule", {value: true});/**
* TCG & Tabletop: Yugioh wiki plugin
* This is a command that allows users to search the yugioh wiki for cards.
* It will display the closest match with a given query, or a separate message if there isn't anything found.
* By bumbadadabum with help from ascriptmaster, codelegend and the PS development team.
*/


var _net = require('../../.lib-dist/net');
var _utils = require('../../.lib-dist/utils');

const SEARCH_PATH = '/api/v1/Search/List/';
const DETAILS_PATH = '/api/v1/Articles/Details/';

async function getFandom(site, pathName, search) {
	const body = await _net.Net.call(void 0, `https://${site}.fandom.com/${pathName}`).get({query: search});
	const json = JSON.parse(body);
	if (!json) throw new Error(`Malformed data`);
	if (json.exception) throw new Error(_utils.Utils.getString(json.exception.message) || `Not found`);
	return json;
}

async function searchFandom(site, query) {
	const result = await getFandom(site, SEARCH_PATH, {query, limit: 1});
	if (!Array.isArray(result.items) || !result.items.length) throw new Error(`Malformed data`);
	if (!result.items[0] || typeof result.items[0] !== 'object') throw new Error(`Malformed data`);
	return result.items[0];
}

async function getCardDetails(site, id) {
	const specifications = {
		ids: id,
		abstract: 0,
		width: 80,
		height: 115,
	};

	const result = await getFandom(site, DETAILS_PATH, specifications);
	if (typeof result.items !== 'object' || !result.items[id] || typeof result.items[id] !== 'object') {
		throw new Error(`Malformed data`);
	}
	return result.items[id];
}

 const commands = {
	ygo: 'yugioh',
	yugioh(target, room, user) {
		this.checkBroadcast();
		room = this.requireRoom('tcgtabletop' );
		const subdomain = 'yugioh';
		const query = target.trim();
		if (!query) return this.parse('/help yugioh');

		return searchFandom(subdomain, query).then((data) => {
			if (!this.runBroadcast()) return;
			const entryUrl = _utils.Utils.getString(data.url);
			const entryTitle = _utils.Utils.getString(data.title);
			const id = _utils.Utils.getString(data.id);
			let htmlReply = _utils.Utils.html`<strong>Best result for ${query}:</strong><br /><a href="${entryUrl}">${entryTitle}</a>`;
			if (id) {
				getCardDetails(subdomain, id).then((card) => {
					if (!room) return; // do nothing if the room doesn't exist anymore
					const thumb = _utils.Utils.getString(card.thumbnail);
					if (thumb) {
						htmlReply = `<table><tr><td style="padding-right:5px;"><img src="${_utils.Utils.escapeHTML(thumb)}" width=80 height=115></td><td>${htmlReply}</td></tr></table>`;
					}
					if (!this.broadcasting) return this.sendReply(`|raw|<div class="infobox">${htmlReply}</div>`);
					room.addRaw(`<div class="infobox">${htmlReply}</div>`).update();
				}, () => {
					if (!room) return; // do nothing if the room doesn't exist anymore
					if (!this.broadcasting) return this.sendReply(`|raw|<div class="infobox">${htmlReply}</div>`);
					room.addRaw(`<div class="infobox">${htmlReply}</div>`).update();
				});
			} else {
				if (!room) return; // do nothing if the room doesn't exist anymore
				if (!this.broadcasting) return this.sendReply(`|raw|<div class="infobox">${htmlReply}</div>`);
				room.addRaw(`<div class="infobox">${htmlReply}</div>`).update();
			}
		}, (err) => {
			if (!this.runBroadcast()) return;
			if (!room) return; // do nothing if the room doesn't exist anymore

			if (err instanceof SyntaxError || err.message === 'Malformed data') {
				if (!this.broadcasting) return this.sendReply(`Error: Something went wrong in the request: ${err.message}`);
				return room.add(`Error: Something went wrong in the request: ${err.message}`).update();
			} else if (err.message === 'Not found') {
				if (!this.broadcasting) return this.sendReply('|raw|<div class="infobox">No results found.</div>');
				return room.addRaw('<div class="infobox">No results found.</div>').update();
			} else if (err.code === "ENOTFOUND") {
				if (!this.broadcasting) return this.sendReply("Error connecting to the yugioh wiki.");
				return room.add("Error connecting to the yugioh wiki.").update();
			}
			if (!this.broadcasting) return this.sendReply(`Error: ${err.message}`);
			return room.add(`Error: ${err.message}`).update();
		});
	},
	yugiohhelp: [`/yugioh [query] - Search the Yugioh wiki.`],
}; exports.commands = commands;
