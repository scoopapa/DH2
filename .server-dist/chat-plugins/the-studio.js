"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * The Studio room chat-plugin.
 * Supports scrobbling and searching for music from last.fm.
 * Also supports storing and suggesting recommendations.
 * Written by Kris, loosely based on the concept from bumbadadabum.
 * @author Kris
 */

var _fs = require('../../.lib-dist/fs');
var _net = require('../../.lib-dist/net');
var _utils = require('../../.lib-dist/utils');
var _youtube = require('./youtube');

const LASTFM_DB = 'config/chat-plugins/lastfm.json';
const RECOMMENDATIONS = 'config/chat-plugins/the-studio.json';
const API_ROOT = 'http://ws.audioscrobbler.com/2.0/';
const DEFAULT_IMAGES = [
	'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png',
	'https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png',
	'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png',
	'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png',
];
























const lastfm = JSON.parse(_fs.FS.call(void 0, LASTFM_DB).readIfExistsSync() || "{}");
const recommendations = JSON.parse(_fs.FS.call(void 0, RECOMMENDATIONS).readIfExistsSync() || "{}");

if (!recommendations.saved) recommendations.saved = [];
if (!recommendations.suggested) recommendations.suggested = [];
saveRecommendations();

function updateRecTags() {
	for (const rec of recommendations.saved) {
		if (!rec.tags.map(toID).includes(toID(rec.artist))) rec.tags.push(rec.artist);
		if (!rec.tags.map(toID).includes(toID(rec.userData.name))) rec.tags.push(rec.userData.name);
	}
	for (const rec of recommendations.suggested) {
		if (!rec.tags.map(toID).includes(toID(rec.artist))) rec.tags.push(rec.artist);
		if (!rec.tags.map(toID).includes(toID(rec.userData.name))) rec.tags.push(rec.userData.name);
	}
	saveRecommendations();
}

updateRecTags();

function saveLastFM() {
	_fs.FS.call(void 0, LASTFM_DB).writeUpdate(() => JSON.stringify(lastfm));
}
function saveRecommendations() {
	_fs.FS.call(void 0, RECOMMENDATIONS).writeUpdate(() => JSON.stringify(recommendations));
}

 class LastFMInterface {
	async getScrobbleData(username, displayName) {
		this.checkHasKey();
		const accountName = this.getAccountName(username);
		let raw;
		try {
			raw = await _net.Net.call(void 0, API_ROOT).get({
				query: {
					method: 'user.getRecentTracks', user: accountName,
					limit: 1, api_key: Config.lastfmkey, format: 'json',
				},
			});
		} catch (e) {
			throw new Chat.ErrorMessage(`No scrobble data found.`);
		}
		const res = JSON.parse(raw);
		if (res.error) {
			throw new Chat.ErrorMessage(`${res.message}.`);
		}
		if (!_optionalChain([res, 'optionalAccess', _ => _.recenttracks, 'optionalAccess', _2 => _2.track, 'optionalAccess', _3 => _3.length])) throw new Chat.ErrorMessage(`last.fm account not found.`);
		const track = res.recenttracks.track[0];
		let buf = `<table><tr>`;
		if (_optionalChain([track, 'access', _4 => _4.image, 'optionalAccess', _5 => _5.length])) {
			const imageIndex = track.image.length >= 3 ? 2 : track.image.length - 1;
			if (track.image[imageIndex]['#text']) {
				buf += `<td style="padding-right:5px"><img src="${track.image[imageIndex]['#text']}" width="75" height="75" /></td>`;
			}
			buf += `<td><strong><a href="https://www.last.fm/user/${accountName}">${_utils.Utils.escapeHTML(displayName || accountName)}</a></strong>`;
			if (_optionalChain([track, 'access', _6 => _6['@attr'], 'optionalAccess', _7 => _7.nowplaying])) {
				buf += ` is currently listening to:`;
			} else {
				buf += ` was last seen listening to:`;
			}
			buf += `<br />`;
			const trackName = `${_optionalChain([track, 'access', _8 => _8.artist, 'optionalAccess', _9 => _9['#text']]) ? `${track.artist['#text']} - ` : ''}${track.name}`;
			let videoIDs;
			try {
				videoIDs = await _youtube.YouTube.searchVideo(trackName, 1);
			} catch (e) {
				throw new Chat.ErrorMessage(`Error while fetching video data: ${e.message}`);
			}
			if (!_optionalChain([videoIDs, 'optionalAccess', _10 => _10.length])) {
				throw new Chat.ErrorMessage(`Something went wrong with the YouTube API.`);
			}
			buf += `<a href="https://youtu.be/${videoIDs[0]}">${_utils.Utils.escapeHTML(trackName)}</a>`;
			buf += `</td></tr></table>${this.getScrobbleBadge()}`;
		}
		return buf;
	}

	addAccountName(userid, accountName) {
		this.checkHasKey();
		accountName = accountName.trim();
		if (lastfm[userid]) {
			const oldName = lastfm[userid];
			lastfm[userid] = accountName;
			saveLastFM();
			return `last.fm account name changed from '${oldName}' to '${accountName}'.`;
		}
		lastfm[userid] = accountName;
		saveLastFM();
		return `Registered last.fm account '${accountName}'.`;
	}

	validateAccountName(accountName) {
		accountName = accountName.trim();
		const sanitizedName = accountName.replace(/[^-_a-zA-Z0-9]+/g, '');
		if (!(!accountName.includes(' ') && accountName === sanitizedName && /^[a-zA-Z]/.test(sanitizedName) &&
			sanitizedName.length > 1 && sanitizedName.length < 16)) {
			throw new Chat.ErrorMessage(`The provided account name (${sanitizedName}) is invalid. Valid last.fm usernames are between 2-15 characters, start with a letter, and only contain letters, numbers, hyphens, and underscores.`);
		}
		return true;
	}

	getAccountName(username) {
		if (lastfm[toID(username)]) return lastfm[toID(username)];
		return username.trim().replace(/ /g, '_').replace(/[^-_a-zA-Z0-9]/g, '');
	}

	async tryGetTrackData(track, artist) {
		this.checkHasKey();
		const query = {
			method: 'track.search', limit: 1, api_key: Config.lastfmkey, track, format: 'json',
		};
		if (artist) query.artist = artist;
		let raw;
		try {
			raw = await _net.Net.call(void 0, API_ROOT).get({query});
		} catch (e) {
			throw new Chat.ErrorMessage(`No track data found.`);
		}
		const req = JSON.parse(raw);
		let buf = ``;
		if (_optionalChain([req, 'access', _11 => _11.results, 'optionalAccess', _12 => _12.trackmatches, 'optionalAccess', _13 => _13.track, 'optionalAccess', _14 => _14.length])) {
			buf += `<table><tr><td style="padding-right:5px">`;
			const obj = req.results.trackmatches.track[0];
			const trackName = obj.name || "Untitled";
			const artistName = obj.artist || "Unknown Artist";
			const searchName = `${artistName} - ${trackName}`;
			if (_optionalChain([obj, 'access', _15 => _15.image, 'optionalAccess', _16 => _16.length])) {
				const img = obj.image;
				const imageIndex = img.length >= 3 ? 2 : img.length - 1;
				if (img[imageIndex]['#text'] && !DEFAULT_IMAGES.includes(img[imageIndex]['#text'])) {
					buf += `<img src="${img[imageIndex]['#text']}" width="75" height="75" />`;
				}
			}
			buf += `</td><td>`;
			const artistUrl = obj.url.split('_/')[0];
			buf += `<strong><a href="${artistUrl}">${artistName}</a> - <a href="${obj.url}">${trackName}</a></strong><br />`;
			let videoIDs;
			try {
				videoIDs = await _youtube.YouTube.searchVideo(searchName, 1);
			} catch (e) {
				throw new Chat.ErrorMessage(`Error while fetching video data: ${e.message}`);
			}
			if (!_optionalChain([videoIDs, 'optionalAccess', _17 => _17.length])) {
				buf += searchName;
			} else {
				buf += `<a href="https://youtu.be/${videoIDs[0]}">YouTube link</a>`;
			}
			buf += `</td></tr></table>${this.getScrobbleBadge()}`;
		}
		if (req.error) {
			throw new Chat.ErrorMessage(`${req.message}.`);
		}
		if (!buf) {
			throw new Chat.ErrorMessage(`No results for '${artist ? `${artist} - ` : ``}${track}' found. Check spelling?`);
		}
		return buf;
	}
	checkHasKey() {
		if (!Config.lastfmkey) {
			throw new Chat.ErrorMessage(`This server does not support last.fm commands. If you're the owner, you can enable them by setting up Config.lastfmkey.`);
		}
	}
	getScrobbleBadge() {
		return `<div style="float:right;color:#888;font-size:8pt">[powered by AudioScrobbler]</div><div style="clear:both"></div>`;
	}
} exports.LastFMInterface = LastFMInterface;

class RecommendationsInterface {
	getRandomRecommendation() {
		const recs = recommendations.saved;
		return recs[Math.floor(Math.random() * recs.length)];
	}

	checkRoom(room) {
		if (_optionalChain([room, 'optionalAccess', _18 => _18.roomid]) !== 'thestudio') {
			throw new Chat.ErrorMessage(`This command can only be used in The Studio.`);
		}
	}

	async add(
		artist, title, url, description,
		username, tags, avatar
	) {
		artist = artist.trim();
		title = title.trim();
		if (this.get(artist, title)) {
			throw new Chat.ErrorMessage(`The song titled '${title}' by ${artist} is already recommended.`);
		}
		if (!/^https?:\/\//.test(url)) url = `https://${url}`;
		if (!_youtube.YouTube.linkRegex.test(url)) {
			throw new Chat.ErrorMessage(`Please provide a valid YouTube link.`);
		}
		url = url.split('&')[0];
		const videoInfo = await _youtube.YouTube.getVideoData(url);
		this.checkTags(tags);
		// JUST in case
		if (!recommendations.saved) recommendations.saved = [];
		const rec = {artist, title, videoInfo, url, description, tags, userData: {name: username}, likes: 0};
		if (!rec.tags.map(toID).includes(toID(username))) rec.tags.push(username);
		if (!rec.tags.map(toID).includes(toID(artist))) rec.tags.push(artist);
		if (avatar) rec.userData.avatar = avatar;
		recommendations.saved.push(rec);
		saveRecommendations();
	}

	delete(artist, title) {
		artist = artist.trim();
		title = title.trim();
		if (!_optionalChain([recommendations, 'access', _19 => _19.saved, 'optionalAccess', _20 => _20.length])) {
			throw new Chat.ErrorMessage(`The song titled '${title}' by ${artist} isn't recommended.`);
		}
		const recIndex = this.getIndex(artist, title);
		if (recIndex < 0) {
			throw new Chat.ErrorMessage(`The song titled '${title}' by ${artist} isn't recommended.`);
		}
		recommendations.saved.splice(recIndex, 1);
		saveRecommendations();
	}

	async suggest(
		artist, title, url, description,
		username, tags, avatar
	) {
		artist = artist.trim();
		title = title.trim();
		if (this.get(artist, title)) {
			throw new Chat.ErrorMessage(`The song titled '${title}' by ${artist} is already recommended.`);
		}
		if (this.get(artist, title, null, true)) {
			throw new Chat.ErrorMessage(`The song titled '${title}' by ${artist} is already suggested.`);
		}
		if (!/^https?:\/\//.test(url)) url = `https://${url}`;
		if (!_youtube.YouTube.linkRegex.test(url)) {
			throw new Chat.ErrorMessage(`Please provide a valid YouTube link.`);
		}
		url = url.split('&')[0];
		const videoInfo = await _youtube.YouTube.getVideoData(url);
		this.checkTags(tags);
		const rec = {artist, title, videoInfo, url, description, tags, userData: {name: username}, likes: 0};
		if (!rec.tags.map(toID).includes(toID(username))) rec.tags.push(username);
		if (!rec.tags.map(toID).includes(toID(artist))) rec.tags.push(artist);
		if (avatar) rec.userData.avatar = avatar;
		recommendations.suggested.push(rec);
		saveRecommendations();
	}

	approveSuggestion(submitter, artist, title) {
		artist = artist.trim();
		title = title.trim();
		const rec = this.get(artist, title, submitter, true);
		if (!rec) {
			throw new Chat.ErrorMessage(`There is no song titled '${title}' by ${artist} suggested from ${submitter.trim()}.`);
		}
		if (!recommendations.saved) recommendations.saved = [];
		recommendations.saved.push(rec);
		recommendations.suggested.splice(recommendations.suggested.indexOf(rec), 1);
		saveRecommendations();
	}

	denySuggestion(submitter, artist, title) {
		artist = artist.trim();
		title = title.trim();
		const index = this.getIndex(artist, title, submitter, true);
		if (index < 0) {
			throw new Chat.ErrorMessage(`There is no song titled '${title}' by ${artist} suggested from ${submitter.trim()}.`);
		}
		recommendations.suggested.splice(index, 1);
		saveRecommendations();
	}

	async render(rec, suggested = false) {
		let buf = ``;
		buf += `<div style="color:#000;background:linear-gradient(rgba(210,210,210),rgba(225,225,225))">`;
		buf += `<table style="margin:auto;background:rgba(255,255,255,0.25);padding:3px;"><tbody><tr>`;
		if (rec.videoInfo === undefined) {
			rec.videoInfo = await _youtube.YouTube.getVideoData(rec.videoInfo);
			saveRecommendations();
		}
		if (rec.videoInfo) {
			buf += `<td style="text-align:center;"><img src="${rec.videoInfo.thumbnail}" width="120" height="67" /><br />`;
			buf += `<small><em>${!suggested ? `${Chat.count(rec.likes, "points")} | ` : ``}${rec.videoInfo.views} views</em></small></td>`;
		}
		buf += _utils.Utils.html`<td style="max-width:300px"><a href="${rec.url}" style="color:#000;font-weight:bold;">${rec.artist} - ${rec.title}</a>`;
		const tags = rec.tags.map(x => _utils.Utils.escapeHTML(x))
			.filter(x => toID(x) !== toID(rec.userData.name) && toID(x) !== toID(rec.artist));
		if (tags.length) {
			buf += `<br /><strong>Tags:</strong> <em>${tags.join(', ')}</em>`;
		}
		if (rec.description) {
			buf += `<br /><span style="display:inline-block;line-height:1.15em;"><strong>Description:</strong> ${_utils.Utils.escapeHTML(rec.description)}</span>`;
		}
		if (!rec.videoInfo && !suggested) {
			buf += `<br /><strong>Score:</strong> ${Chat.count(rec.likes, "points")}`;
		}
		if (!rec.userData.avatar) {
			buf += `<br /><strong>Recommended by:</strong> ${rec.userData.name}`;
		}
		buf += `<hr />`;
		if (suggested) {
			buf += _utils.Utils.html`<button class="button" name="send" value="/approvesuggestion ${rec.userData.name}|${rec.artist}|${rec.title}">Approve</button> | `;
			buf += _utils.Utils.html`<button class="button" name="send" value="/denysuggestion ${rec.userData.name}|${rec.artist}|${rec.title}">Deny</button>`;
		} else {
			buf += _utils.Utils.html`<button class="button" name="send" value="/likerec ${rec.artist}|${rec.title}" style="float:right;display:inline;padding:3px 5px;font-size:8pt;">`;
			buf += `<img src="https://${Config.routes.client}/sprites/bwicons/441.png" style="margin:-9px 0 -6px -7px;" width="32" height="32" />`;
			buf += `<span style="position:relative;bottom:2.6px;">Upvote</span></button>`;
		}
		buf += `</td>`;
		if (rec.userData.avatar) {
			buf += `<td style="text-align:center;width:110px;background:rgba(255,255,255,0.4);border-radius:15px;">`;
			const isCustom = rec.userData.avatar.startsWith('#');
			buf += `<img style="margin-bottom:-38px;" src="https://${Config.routes.client}/sprites/trainers${isCustom ? '-custom' : ''}/${isCustom ? rec.userData.avatar.slice(1) : rec.userData.avatar}.png" width="80" height="80" />`;
			buf += `<br /><span style="background:rgba(0,0,0,0.5);padding:1.5px 4px;color:white;font-size:7pt;">Recommended by:`;
			buf += `<br /><strong>${rec.userData.name}</strong></span></td>`;
		} else {
			buf += `<td><span style="background:rgba(0,0,0,0.5);padding:1.5px 4px;color:white;font-size:7pt;">Recommended by: <strong>${rec.userData.name}</strong></span></td>`;
		}
		buf += `</tbody></table>`;
		buf += `</div>`;
		return buf;
	}

	likeRecommendation(artist, title, liker) {
		const rec = this.get(artist, title);
		if (!rec) {
			throw new Chat.ErrorMessage(`The song titled '${title}' by ${artist} isn't recommended.`);
		}
		if (!rec.liked) {
			rec.liked = {ips: [], userids: []};
		}
		if ((!Config.noipchecks && rec.liked.ips.includes(liker.latestIp)) || rec.liked.userids.includes(liker.id)) {
			throw new Chat.ErrorMessage(`You've already liked this recommendation.`);
		}
		rec.likes++;
		rec.liked.ips.push(liker.latestIp);
		rec.liked.userids.push(liker.id);
		saveRecommendations();
	}

	get(artist, title, submitter = null, fromSuggestions = false) {
		let recs = recommendations.saved;
		if (fromSuggestions) recs = recommendations.suggested;
		return recs.find(x => (
			toID(x.artist) === toID(artist) &&
			toID(x.title) === toID(title) &&
			(!submitter || toID(x.userData.name) === toID(submitter))
		));
	}

	getIndex(artist, title, submitter = null, fromSuggestions = false) {
		let recs = recommendations.saved;
		if (fromSuggestions) recs = recommendations.suggested;
		return recs.findIndex(x => (
			toID(x.artist) === toID(artist) &&
			toID(x.title) === toID(title) &&
			(!submitter || toID(x.userData.name) === toID(submitter))
		));
	}

	checkTags(tags) {
		const cleansedTags = new Set();
		for (const tag of tags) {
			if (!toID(tag)) throw new Chat.ErrorMessage(`Empty tag detected.`);
			if (cleansedTags.has(toID(tag))) {
				throw new Chat.ErrorMessage(`Duplicate tag: ${tag.trim()}`);
			}
			cleansedTags.add(toID(tag));
		}
	}
}

 const LastFM = new LastFMInterface(); exports.LastFM = LastFM;
 const Recs = new RecommendationsInterface(); exports.Recs = Recs;

 const commands = {
	registerlastfm(target, room, user) {
		if (!target) return this.parse(`/help registerlastfm`);
		this.checkChat(target);
		target = this.filter(target) || '';
		if (!target) {
			throw new Chat.ErrorMessage(`The provided account name has phrases that PS doesn't allow.`);
		}
		exports.LastFM.validateAccountName(target);
		this.sendReply(exports.LastFM.addAccountName(user.id, target.trim()));
	},
	registerlastfmhelp: [
		`/registerlastfm [username] - Adds the provided [username] to the last.fm database for scrobbling.`,
		`Usernames can only be 2-15 characters long, must start with a letter, and can only contain letters, numbers, hyphens, and underscores.`,
	],

	async lastfm(target, room, user) {
		this.checkChat();
		if (!user.autoconfirmed) return this.errorReply(`You cannot use this command while not autoconfirmed.`);
		this.runBroadcast(true);
		this.splitTarget(target, true);
		const username = exports.LastFM.getAccountName(target ? target : user.name);
		this.sendReplyBox(
			await exports.LastFM.getScrobbleData(username, this.targetUsername ? this.targetUsername : user.named ? user.name : undefined)
		);
	},
	lastfmhelp: [
		`/lastfm [username] - Displays the last scrobbled song for the person using the command or for [username] if provided.`,
		`To link up your last.fm account, check out "/help registerlastfm".`,
	],

	async track(target, room, user) {
		if (!target) return this.parse('/help track');
		this.checkChat();
		if (!user.autoconfirmed) return this.errorReply(`You cannot use this command while not autoconfirmed.`);
		const [track, artist] = this.splitOne(target);
		if (!track) return this.parse('/help track');
		this.runBroadcast(true);
		this.sendReplyBox(await exports.LastFM.tryGetTrackData(track, artist || undefined));
	},
	trackhelp: [
		`/track [song name], [artist] - Displays the most relevant search result to the song name (and artist if specified) provided.`,
	],

	addrec: 'addrecommendation',
	async addrecommendation(target, room, user) {
		room = this.requireRoom('thestudio' );
		this.checkCan('show', null, room);
		const [artist, title, url, description, ...tags] = target.split('|').map(x => x.trim());
		if (!(artist && title && url && description && _optionalChain([tags, 'optionalAccess', _21 => _21.length]))) {
			return this.parse(`/help addrecommendation`);
		}

		const cleansedTags = tags.map(x => x.trim());
		await exports.Recs.add(artist, title, url, description, user.name, cleansedTags, String(user.avatar));

		this.privateModAction(`${user.name} added a recommendation for '${title}' by ${artist}.`);
		this.modlog(`RECOMMENDATION`, null, `add: '${toID(title)}' by ${toID(artist)}`);
	},
	addrecommendationhelp: [
		`/addrecommendation artist | song title | url | description | tag1 | tag2 | ... - Adds a song recommendation. Requires: + % @ * # &`,
	],

	delrec: 'removerecommendation',
	removerecommendation(target, room, user) {
		const targetRoom = Rooms.search('thestudio') || room;
		exports.Recs.checkRoom(targetRoom);
		this.room = targetRoom;
		const [artist, title] = target.split(`|`).map(x => x.trim());
		if (!(artist && title)) return this.parse(`/help removerecommendation`);
		const rec = exports.Recs.get(artist, title);
		if (!rec) throw new Chat.ErrorMessage(`Recommendation not found.`);
		if (toID(rec.userData.name) !== user.id) {
			this.checkCan('mute', null, targetRoom);
		}

		exports.Recs.delete(artist, title);

		this.privateModAction(`${user.name} removed a recommendation for '${title}' by ${artist}.`);
		this.modlog(`RECOMMENDATION`, null, `remove: '${toID(title)}' by ${toID(artist)}`);
	},
	removerecommendationhelp: [
		`/removerecommendation artist | song title - Removes a song recommendation. Requires: % @ * # &`,
		`If you added a recommendation, you can remove it on your own without being one of the required ranks.`,
	],

	suggestrec: 'suggestrecommendation',
	async suggestrecommendation(target, room, user) {
		room = this.requireRoom('thestudio' );
		if (!target) {
			return this.parse('/help suggestrecommendation');
		}
		this.checkChat(target);
		if (!user.autoconfirmed) return this.errorReply(`You cannot use this command while not autoconfirmed.`);
		const [artist, title, url, description, ...tags] = target.split('|').map(x => x.trim());
		if (!(artist && title && url && description && _optionalChain([tags, 'optionalAccess', _22 => _22.length]))) {
			return this.parse(`/help suggestrecommendation`);
		}

		const cleansedTags = tags.map(x => x.trim());
		await exports.Recs.suggest(artist, title, url, description, user.name, cleansedTags, String(user.avatar));
		this.sendReply(`Your suggestion for '${title}' by ${artist} has been submitted.`);
		const html = await exports.Recs.render({
			artist, title, url, description,
			userData: {name: user.name, avatar: String(user.avatar)},
			tags: cleansedTags, likes: 0, videoInfo: null,
		}, true);
		room.sendRankedUsers(`|html|${html}`, '%');
	},
	suggestrecommendationhelp: [
		`/suggestrecommendation artist | song title | url | description | tag1 | tag2 | ... - Suggest a song recommendation.`,
	],

	approvesuggestion(target, room, user) {
		const targetRoom = Rooms.search('thestudio') || room;
		exports.Recs.checkRoom(targetRoom);
		this.room = targetRoom;
		this.checkCan('mute', null, targetRoom);
		const [submitter, artist, title] = target.split('|').map(x => x.trim());
		if (!(submitter && artist && title)) return this.parse(`/help approvesuggestion`);

		exports.Recs.approveSuggestion(submitter, artist, title);

		this.privateModAction(`${user.name} approved a suggested recommendation from ${submitter} for '${title}' by ${artist}.`);
		this.modlog(`RECOMMENDATION`, null, `approve: '${toID(title)}' by ${toID(artist)} from ${submitter}`);
	},
	approvesuggestionhelp: [
		`/approvesuggestion submitter | artist | strong title - Approve a submitted song recommendation. Requires: % @ * # &`,
	],

	denysuggestion(target, room, user) {
		const targetRoom = Rooms.search('thestudio') || room;
		exports.Recs.checkRoom(targetRoom);
		this.room = targetRoom;
		this.checkCan('mute', null, targetRoom);
		const [submitter, artist, title] = target.split('|').map(x => x.trim());
		if (!(submitter && artist && title)) return this.parse(`/help approvesuggestion`);

		exports.Recs.denySuggestion(submitter, artist, title);

		this.privateModAction(`${user.name} denied a suggested recommendation from ${submitter} for '${title}' by ${artist}.`);
		this.modlog(`RECOMMENDATION`, null, `deny: '${toID(title)}' by ${toID(artist)} from ${submitter}`);
	},
	denysuggestionhelp: [
		`/denysuggestion submitter | artist | strong title - Deny a submitted song recommendation. Requires: % @ * # &`,
	],

	rec: 'recommendation',
	searchrec: 'recommendation',
	viewrec: 'recommendation',
	searchrecommendation: 'recommendation',
	viewrecommendation: 'recommendation',
	randrec: 'recommendation',
	randomrecommendation: 'recommendation',
	async recommendation(target, room, user) {
		if (!recommendations.saved.length) {
			throw new Chat.ErrorMessage(`There are no recommendations saved.`);
		}
		const targetRoom = Rooms.search('thestudio') || room;
		exports.Recs.checkRoom(targetRoom);
		this.room = targetRoom;
		this.runBroadcast();
		if (!target) {
			return this.sendReply(`|html|${await exports.Recs.render(exports.Recs.getRandomRecommendation())}`);
		}
		const matches = [];
		if (target) {
			target = target.slice(0, 300);
			const args = target.split(',');
			for (const rec of recommendations.saved) {
				if (!args.every(x => rec.tags.map(toID).includes(toID(x)))) continue;
				matches.push(rec);
			}
		}
		if (!matches.length) {
			throw new Chat.ErrorMessage(`No matches found.`);
		}
		const sample = _utils.Utils.shuffle(matches)[0];
		this.sendReply(`|html|${await exports.Recs.render(sample)}`);
	},
	recommendationhelp: [
		`/recommendation [key1, key2, key3, ...] - Displays a random recommendation that matches all keys, if one exists.`,
		`If no arguments are provided, a random recommendation is shown.`,
	],

	likerec: 'likerecommendation',
	likerecommendation(target, room, user, connection) {
		const targetRoom = Rooms.search('thestudio') || room;
		exports.Recs.checkRoom(targetRoom);
		this.room = targetRoom;
		const [artist, title] = target.split('|').map(x => x.trim());
		if (!(artist && title)) return this.parse(`/help likerecommendation`);
		exports.Recs.likeRecommendation(artist, title, user);
		this.sendReply(`You liked '${title}' by ${artist}.`);
	},
	likerecommendationhelp: [
		`/likerecommendation artist | title - Upvotes a recommendation for the provided artist and title.`,
	],

	viewrecs: 'viewrecommendations',
	viewrecommendations(target, room, user) {
		const targetRoom = Rooms.search('thestudio') || room;
		exports.Recs.checkRoom(targetRoom);
		this.room = targetRoom;
		this.parse(`/j view-recommendations-${targetRoom.roomid}`);
	},
	viewrecommendationshelp: [
		`/viewrecommendations OR /viewrecs - View all recommended songs.`,
	],

	viewsuggestions: 'viewsuggestedrecommendations',
	viewsuggestedrecs: 'viewsuggestedrecommendations',
	viewsuggestedrecommendations(target, room, user) {
		const targetRoom = Rooms.search('thestudio') || room;
		exports.Recs.checkRoom(targetRoom);
		this.room = targetRoom;
		this.parse(`/j view-suggestedrecommendations-${targetRoom.roomid}`);
	},
	viewsuggestedrecommendationshelp: [
		`/viewsuggestedrecommendations OR /viewsuggestions - View all suggested recommended songs. Requires: % @ * # &`,
	],
}; exports.commands = commands;

 const pages = {
	async recommendations(query, user, connection) {
		const room = this.requireRoom();
		this.checkCan('mute', null, room);
		if (!user.inRooms.has(room.roomid)) throw new Chat.ErrorMessage(`You must be in ${room.title} to view this page.`);
		this.title = 'Recommendations';
		let buf = `<div class="pad">`;
		buf += `<button style="float:right" class="button" name="send" value="/j view-recommendations-${room.roomid}"><i class="fa fa-refresh"></i> Refresh</button>`;
		const recs = recommendations.saved;
		if (!_optionalChain([recs, 'optionalAccess', _23 => _23.length])) {
			return `${buf}<h2>There are currently no recommendations.</h2></div>`;
		}
		buf += `<h2>Recommendations (${recs.length}):</h2>`;
		for (const rec of recs) {
			buf += `<div class="infobox">`;
			buf += await exports.Recs.render(rec);
			if (user.can('mute', null, room) || toID(rec.userData.name) === user.id) {
				buf += `<hr /><button class="button" name="send" value="/removerecommendation ${rec.artist}|${rec.title}">Delete</button>`;
			}
			buf += `</div>`;
		}
		return buf;
	},
	async suggestedrecommendations(query, user, connection) {
		const room = this.requireRoom();
		this.checkCan('mute', null, room);
		if (!user.inRooms.has(room.roomid)) throw new Chat.ErrorMessage(`You must be in ${room.title} to view this page.`);
		this.title = 'Suggested Recommendations';
		let buf = `<div class="pad">`;
		buf += `<button style="float:right" class="button" name="send" value="/j view-suggestedrecommendations-${room.roomid}"><i class="fa fa-refresh"></i> Refresh</button>`;
		const recs = recommendations.suggested;
		if (!_optionalChain([recs, 'optionalAccess', _24 => _24.length])) {
			return `${buf}<h2>There are currently no suggested recommendations.</h2></div>`;
		}
		buf += `<h2>Suggested Recommendations (${recs.length}):</h2>`;
		for (const rec of recs) {
			buf += `<div class="infobox">`;
			buf += await exports.Recs.render(rec, true);
			buf += `</div>`;
		}
		return buf;
	},
}; exports.pages = pages;
