"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/*
 * Trivia plugin
 * Written by Morfent
 */

var _fs = require('../../.lib-dist/fs');
var _utils = require('../../.lib-dist/utils');

const MAIN_CATEGORIES = {
	ae: 'Arts and Entertainment',
	pokemon: 'Pok\u00E9mon',
	sg: 'Science and Geography',
	sh: 'Society and Humanities',
};

const SPECIAL_CATEGORIES = {
	misc: 'Miscellaneous',
	subcat: 'Sub-Category',
};

const ALL_CATEGORIES = {
	ae: 'Arts and Entertainment',
	misc: 'Miscellaneous',
	pokemon: 'Pok\u00E9mon',
	sg: 'Science and Geography',
	sh: 'Society and Humanities',
	subcat: 'Sub-Category',
};

/**
 * Aliases for keys in the ALL_CATEGORIES object.
 */
const CATEGORY_ALIASES = {
	poke: 'pokemon' ,
};

const MODES = {
	first: 'First',
	number: 'Number',
	timer: 'Timer',
	triumvirate: 'Triumvirate',
};

const LENGTHS = {
	short: {
		cap: 20,
		prizes: [3, 2, 1],
	},
	medium: {
		cap: 35,
		prizes: [4, 2, 1],
	},
	long: {
		cap: 50,
		prizes: [5, 3, 1],
	},
	infinite: {
		cap: false,
		prizes: [5, 3, 1],
	},
};

Object.setPrototypeOf(MAIN_CATEGORIES, null);
Object.setPrototypeOf(SPECIAL_CATEGORIES, null);
Object.setPrototypeOf(ALL_CATEGORIES, null);
Object.setPrototypeOf(MODES, null);
Object.setPrototypeOf(LENGTHS, null);

const SIGNUP_PHASE = 'signups';
const QUESTION_PHASE = 'question';
const INTERMISSION_PHASE = 'intermission';
const LIMBO_PHASE = 'limbo';

const MASTERMIND_ROUNDS_PHASE = 'rounds';
const MASTERMIND_FINALS_PHASE = 'finals';

const MINIMUM_PLAYERS = 3;
const START_TIMEOUT = 30 * 1000;
const MASTERMIND_FINALS_START_TIMEOUT = 30 * 1000;
const INTERMISSION_INTERVAL = 20 * 1000;
const MASTERMIND_INTERMISSION_INTERVAL = 30 * 1000;
const PAUSE_INTERMISSION = 5 * 1000;

const MAX_QUESTION_LENGTH = 252;
const MAX_ANSWER_LENGTH = 32;







































const PATH = 'config/chat-plugins/triviadata.json';

/**
 * TODO: move trivia database code to a separate file once relevant.
 */
 let triviaData = {}; exports.triviaData = triviaData;
try {
	exports.triviaData = JSON.parse(_fs.FS.call(void 0, PATH).readIfExistsSync() || "{}");
} catch (e) {} // file doesn't exist or contains invalid JSON

if (!exports.triviaData || typeof exports.triviaData !== 'object') exports.triviaData = {};
if (typeof exports.triviaData.leaderboard !== 'object') exports.triviaData.leaderboard = {};
if (typeof exports.triviaData.altLeaderboard !== 'object') exports.triviaData.altLeaderboard = {};
if (!Array.isArray(exports.triviaData.questions)) exports.triviaData.questions = [];
if (!Array.isArray(exports.triviaData.submissions)) exports.triviaData.submissions = [];
if (exports.triviaData.questions.some(q => !('type' in q))) {
	exports.triviaData.questions = exports.triviaData.questions.map(q => Object.assign(Object.create(null), q, {type: 'trivia'}));
}

/** from:to Map */
 const pendingAltMerges = new Map(); exports.pendingAltMerges = pendingAltMerges;

function getTriviaGame(room) {
	if (!room) {
		throw new Chat.ErrorMessage(`This command can only be used in the Trivia room.`);
	}
	const game = room.game;
	if (!game) {
		throw new Chat.ErrorMessage(room.tr`There is no game in progress.`);
	}
	if (game.gameid !== 'trivia') {
		throw new Chat.ErrorMessage(room.tr`The currently running game is not Trivia, it's ${game.title}.`);
	}
	return game ;
}

function getMastermindGame(room) {
	if (!room) {
		throw new Chat.ErrorMessage(`This command can only be used in the Trivia room.`);
	}
	const game = room.game;
	if (!game) {
		throw new Chat.ErrorMessage(room.tr`There is no game in progress.`);
	}
	if (game.gameid !== 'mastermind') {
		throw new Chat.ErrorMessage(room.tr`The currently running game is not Mastermind, it's ${game.title}.`);
	}
	return game ;
}

 function writeTriviaData() {
	_fs.FS.call(void 0, PATH).writeUpdate(() => (
		JSON.stringify(exports.triviaData, null, 2)
	));
} exports.writeTriviaData = writeTriviaData;

/**
 * Binary search for the index at which to splice in new questions in a category,
 * or the index at which to slice up to for a category's questions
 * TODO: why isn't this a map? Storing questions/submissions sorted by
 * category is pretty stupid when maps exist for that purpose.
 */
function findEndOfCategory(category, inSubmissions = false) {
	const questions = inSubmissions ? exports.triviaData.submissions : exports.triviaData.questions;
	let left = 0;
	let right = questions.length;
	let i = 0;
	let curCategory;
	while (left < right) {
		i = Math.floor((left + right) / 2);
		curCategory = questions[i].category;
		if (curCategory < category) {
			left = i + 1;
		} else if (curCategory > category) {
			right = i;
		} else {
			while (++i < questions.length) {
				if (questions[i].category !== category) break;
			}
			return i;
		}
	}

	return left;
}

function sliceCategory(category) {
	const questions = exports.triviaData.questions;
	if (!_optionalChain([questions, 'optionalAccess', _ => _.length])) return [];

	const sliceUpTo = findEndOfCategory(category, false);
	if (!sliceUpTo) return [];

	const categories = Object.keys(ALL_CATEGORIES);
	const categoryIdx = categories.indexOf(category);
	if (!categoryIdx) return questions.slice(0, sliceUpTo);

	// findEndOfCategory for the category prior to the specified one in
	// alphabetical order returns the index of the first question in it
	const sliceFrom = findEndOfCategory(categories[categoryIdx - 1], false);
	if (sliceFrom === sliceUpTo) return [];

	return questions.slice(sliceFrom, sliceUpTo);
}

/**
 * Generates and broadcasts the HTML for a generic announcement containing
 * a title and an optional message.
 */
function broadcast(room, title, message) {
	let buffer = `<div class="broadcast-blue"><strong>${title}</strong>`;
	if (message) buffer += `<br />${message}`;
	buffer += '</div>';

	return room.addRaw(buffer).update();
}

function getQuestions(category) {
	const isRandomCategory = (category === 'random');
	const isAll = (category === 'all');
	if (isRandomCategory) {
		const lastCategoryID = toID(_optionalChain([exports.triviaData, 'access', _2 => _2.history, 'optionalAccess', _3 => _3.slice, 'call', _4 => _4(-1), 'access', _5 => _5[0], 'access', _6 => _6.category])).replace("random", "");
		const categories = Object.keys(MAIN_CATEGORIES).filter(cat => toID(MAIN_CATEGORIES[cat]) !== lastCategoryID);
		const randCategory = categories[Math.floor(Math.random() * categories.length)];
		return sliceCategory(randCategory);
	} else if (isAll) {
		let questions = exports.triviaData.questions.slice();
		for (const categoryStr in SPECIAL_CATEGORIES) {
			questions = questions.filter(q => q.category !== categoryStr);
		}
		return questions;
	} else if (ALL_CATEGORIES[category]) {
		return sliceCategory(category);
	} else {
		throw new Chat.ErrorMessage(`"${category}" is an invalid category.`);
	}
}

function hasLeaderboardEntry(userid) {
	return userid in exports.triviaData.leaderboard || userid in exports.triviaData.altLeaderboard;
}

/**
 * Records a pending alt merge
 */
 function requestAltMerge(from, to) {
	if (from === to) throw new Chat.ErrorMessage(`You cannot merge leaderboard entries with yourself!`);
	if (!hasLeaderboardEntry(from)) {
		throw new Chat.ErrorMessage(`The user '${from}' does not have an entry in the Trivia leaderboard.`);
	}
	if (!hasLeaderboardEntry(to)) {
		throw new Chat.ErrorMessage(`The user '${to}' does not have an entry in the Trivia leaderboard.`);
	}

	exports.pendingAltMerges.set(from, to);
} exports.requestAltMerge = requestAltMerge;


/**
 * Checks that it has been approved by both users,
 * and merges two alts on the Trivia leaderboard.
 */
 function mergeAlts(from, to) {
	if (exports.pendingAltMerges.get(from) !== to) {
		throw new Chat.ErrorMessage(`Both '${from}' and '${to}' must use /trivia mergescore to approve the merge.`);
	}

	if (!hasLeaderboardEntry(to)) {
		throw new Chat.ErrorMessage(`The user '${to}' does not have an entry in the Trivia leaderboard.`);
	}
	if (!hasLeaderboardEntry(from)) {
		throw new Chat.ErrorMessage(`The user '${from}' does not have an entry in the Trivia leaderboard.`);
	}

	for (const leaderboard of [exports.triviaData.altLeaderboard, exports.triviaData.leaderboard]) {
		if (leaderboard[to] && leaderboard[from]) {
			for (let i = 0; i < leaderboard[to].length; i++) {
				leaderboard[to][i] += leaderboard[from][i];
			}
			delete leaderboard[from];
		}
	}

	writeTriviaData();
	exports.cachedLadder.invalidateCache();
	exports.cachedAltLadder.invalidateCache();
} exports.mergeAlts = mergeAlts;

class Ladder {
	
	
	constructor(leaderboard) {
		this.leaderboard = leaderboard;
		this.cache = null;
	}

	invalidateCache() {
		this.cache = null;
	}

	get() {
		if (this.cache) {
			return this.cache;
		}
		this.cache = this.computeCachedLadder();
		return this.cache;
	}

	computeCachedLadder() {
		const leaders = Object.keys(this.leaderboard);
		const ladder = [];
		const ranks = {};
		for (const leader of leaders) {
			ranks[leader] = [0, 0, 0];
		}
		for (let i = 0; i < 3; i++) {
			leaders.sort((a, b) => this.leaderboard[b][i] - this.leaderboard[a][i]);

			let max = Infinity;
			let rank = -1;
			for (const leader of leaders) {
				const score = this.leaderboard[leader][i];
				if (max !== score) {
					rank++;
					max = score;
				}
				if (i === 0 && rank < 15) {
					if (!ladder[rank]) ladder[rank] = [];
					ladder[rank].push(leader );
				}
				ranks[leader][i] = rank + 1;
			}
		}
		return {ladder, ranks};
	}
}

 const cachedLadder = new Ladder(exports.triviaData.leaderboard); exports.cachedLadder = cachedLadder;
 const cachedAltLadder = new Ladder(exports.triviaData.altLeaderboard); exports.cachedAltLadder = cachedAltLadder;

class TriviaPlayer extends Rooms.RoomGamePlayer {
	
	
	
	
	
	
	
	

	constructor(user, game) {
		super(user, game);
		this.points = 0;
		this.correctAnswers = 0;
		this.answer = '';
		this.currentAnsweredAt = [];
		this.lastQuestion = 0;
		this.answeredAt = [];
		this.isCorrect = false;
		this.isAbsent = false;
	}

	setAnswer(answer, isCorrect) {
		this.answer = answer;
		this.currentAnsweredAt = process.hrtime();
		this.isCorrect = !!isCorrect;
	}

	incrementPoints(points = 0, lastQuestion = 0) {
		this.points += points;
		this.answeredAt = this.currentAnsweredAt;
		this.lastQuestion = lastQuestion;
		this.correctAnswers++;
	}

	clearAnswer() {
		this.answer = '';
		this.isCorrect = false;
	}

	toggleAbsence() {
		this.isAbsent = !this.isAbsent;
	}

	reset() {
		this.points = 0;
		this.correctAnswers = 0;
		this.answer = '';
		this.answeredAt = [];
		this.isCorrect = false;
	}
}

 class Trivia extends Rooms.RoomGame {
	
	
	
	
	
	
	
	__init() {this.isPaused = false}
	
	
	
	
	
	
	constructor(
		room, mode, category,
		length, questions, creator,
		isRandomMode = false, isSubGame = false
	) {
		super(room, isSubGame);Trivia.prototype.__init.call(this);;
		this.playerTable = {};
		this.gameid = 'trivia' ;
		this.title = 'Trivia';
		this.allowRenames = true;
		this.playerCap = Number.MAX_SAFE_INTEGER;

		this.minPlayers = MINIMUM_PLAYERS;
		this.kickedUsers = new Set();
		this.canLateJoin = true;

		switch (category) {
		case 'all':
			category = this.room.tr`All`; break;
		case 'random':
			category = this.room.tr`Random (${ALL_CATEGORIES[questions[0].category]})`; break;
		default:
			category = ALL_CATEGORIES[CATEGORY_ALIASES[category] || category];
		}

		this.game = {
			mode: (isRandomMode ? `Random (${MODES[mode]})` : MODES[mode]),
			length: length,
			category: category,
			creator: creator,
		};

		this.questions = questions;

		this.phase = SIGNUP_PHASE;
		this.phaseTimeout = null;

		this.questionNumber = 0;
		this.curQuestion = '';
		this.curAnswers = [];
		this.askedAt = [];

		this.init();
	}

	setPhaseTimeout(callback, timeout) {
		if (this.phaseTimeout) {
			clearTimeout(this.phaseTimeout);
		}
		this.phaseTimeout = setTimeout(callback, timeout);
	}

	getCap() {
		return LENGTHS[this.game.length].cap;
	}

	/**
	 * How long the players should have to answer a question.
	 */
	getRoundLength() {
		return 12 * 1000 + 500;
	}

	addTriviaPlayer(user) {
		if (this.playerTable[user.id]) {
			throw new Chat.ErrorMessage(this.room.tr`You have already signed up for this game.`);
		}
		for (const id of user.previousIDs) {
			if (this.playerTable[id]) throw new Chat.ErrorMessage(this.room.tr`You have already signed up for this game.`);
		}
		if (this.kickedUsers.has(user.id)) {
			throw new Chat.ErrorMessage(this.room.tr`You were kicked from the game and thus cannot join it again.`);
		}
		for (const id of user.previousIDs) {
			if (this.playerTable[id]) {
				throw new Chat.ErrorMessage(this.room.tr`You have already signed up for this game.`);
			}
			if (this.kickedUsers.has(id)) {
				throw new Chat.ErrorMessage(this.room.tr`You were kicked from the game and cannot join until the next game.`);
			}
		}

		for (const id in this.playerTable) {
			const targetUser = Users.get(id);
			if (targetUser) {
				const isSameUser = (
					targetUser.previousIDs.includes(user.id) ||
					targetUser.previousIDs.some(tarId => user.previousIDs.includes(tarId)) ||
					!Config.noipchecks && targetUser.ips.some(ip => user.ips.includes(ip))
				);
				if (isSameUser) throw new Chat.ErrorMessage(this.room.tr`You have already signed up for this game.`);
			}
		}
		if (this.phase !== SIGNUP_PHASE && !this.canLateJoin) {
			throw new Chat.ErrorMessage(this.room.tr`This game does not allow latejoins.`);
		}
		this.addPlayer(user);
	}

	makePlayer(user) {
		return new TriviaPlayer(user, this);
	}

	destroy() {
		if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
		this.phaseTimeout = null;
		this.kickedUsers.clear();
		super.destroy();
	}

	onConnect(user) {
		const player = this.playerTable[user.id];
		if (!player || !player.isAbsent) return false;

		player.toggleAbsence();
		if (++this.playerCount < MINIMUM_PLAYERS) return false;
		if (this.phase !== LIMBO_PHASE) return false;

		for (const i in this.playerTable) {
			this.playerTable[i].clearAnswer();
		}

		broadcast(
			this.room,
			this.room.tr('Enough players have returned to continue the game!'),
			this.room.tr('The game will continue with the next question.')
		);
		this.askQuestion();
		return true;
	}

	onLeave(user, oldUserID) {
		// The user cannot participate, but their score should be kept
		// regardless in cases of disconnects.
		const player = this.playerTable[oldUserID || user.id];
		if (!player || player.isAbsent) return false;

		player.toggleAbsence();
		if (--this.playerCount >= MINIMUM_PLAYERS) return false;

		// At least let the game start first!!
		if (this.phase === SIGNUP_PHASE) return false;

		if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
		this.phaseTimeout = null;
		this.phase = LIMBO_PHASE;
		broadcast(
			this.room,
			this.room.tr('Not enough players are participating to continue the game!'),
			this.room.tr`Until there are ${MINIMUM_PLAYERS} players participating and present, the game will be paused.`
		);
		return true;
	}

	/**
	 * Handles setup that shouldn't be done from the constructor.
	 */
	init() {
		const cap = this.getCap() || this.room.tr("Infinite");
		broadcast(
			this.room,
			this.room.tr('Signups for a new trivia game have begun!'),
			this.room.tr`Mode: ${this.game.mode} | Category: ${this.game.category} | Score cap: ${cap}<br />` +
			this.room.tr('Enter /trivia join to sign up for the trivia game.')
		);
	}

	getDescription() {
		const cap = this.getCap() || this.room.tr("Infinite");
		return this.room.tr`Mode: ${this.game.mode} | Category: ${this.game.category} | Score cap: ${cap}`;
	}

	/**
	 * Formats the player list for display when using /trivia players.
	 */
	formatPlayerList(settings) {
		return this.getTopPlayers(settings).map(player => {
			const buf = _utils.Utils.html`${player.name} (${player.player.points || "0"})`;
			return player.player.isAbsent ? `<span style="color: #444444">${buf}</span>` : buf;
		}).join(', ');
	}

	/**
	 * Kicks a player from the game, preventing them from joining it again
	 * until the next game begins.
	 */
	kick(user) {
		if (!this.playerTable[user.id]) {
			if (this.kickedUsers.has(user.id)) {
				throw new Chat.ErrorMessage(this.room.tr`User ${user.name} has already been kicked from the game.`);
			}

			for (const id of user.previousIDs) {
				if (this.kickedUsers.has(id)) {
					throw new Chat.ErrorMessage(this.room.tr`User ${user.name} has already been kicked from the game.`);
				}
			}

			for (const kickedUserid of this.kickedUsers) {
				const kickedUser = Users.get(kickedUserid);
				if (kickedUser) {
					const isSameUser = (
						kickedUser.previousIDs.includes(user.id) ||
						kickedUser.previousIDs.some(id => user.previousIDs.includes(id)) ||
						!Config.noipchecks && kickedUser.ips.some(ip => user.ips.includes(ip))
					);
					if (isSameUser) throw new Chat.ErrorMessage(this.room.tr`User ${user.name} has already been kicked from the game.`);
				}
			}

			throw new Chat.ErrorMessage(this.room.tr`User ${user.name} is not a player in the game.`);
		}

		this.kickedUsers.add(user.id);
		for (const id of user.previousIDs) {
			this.kickedUsers.add(id);
		}

		super.removePlayer(user);
	}

	leave(user) {
		if (!this.playerTable[user.id]) {
			throw new Chat.ErrorMessage(this.room.tr`You are not a player in the current game.`);
		}
		super.removePlayer(user);
	}

	/**
	 * Starts the question loop for a trivia game in its signup phase.
	 */
	start() {
		if (this.phase !== SIGNUP_PHASE) throw new Chat.ErrorMessage(this.room.tr`The game has already been started.`);
		if (this.playerCount < this.minPlayers) {
			throw new Chat.ErrorMessage(this.room.tr`Not enough players have signed up yet! At least ${this.minPlayers} players to begin.`);
		}

		broadcast(this.room, this.room.tr`The game will begin in ${START_TIMEOUT / 1000} seconds...`);
		this.phase = INTERMISSION_PHASE;
		this.setPhaseTimeout(() => this.askQuestion(), START_TIMEOUT);
	}

	pause() {
		if (this.isPaused) throw new Chat.ErrorMessage(this.room.tr`The trivia game is already paused.`);
		if (this.phase === QUESTION_PHASE) {
			throw new Chat.ErrorMessage(this.room.tr`You cannot pause the trivia game during a question.`);
		}
		this.isPaused = true;
		broadcast(this.room, this.room.tr("The Trivia game has been paused."));
	}

	resume() {
		if (!this.isPaused) throw new Chat.ErrorMessage(this.room.tr`The trivia game is not paused.`);
		this.isPaused = false;
		broadcast(this.room, this.room.tr("The Trivia game has been resumed."));
		if (this.phase === INTERMISSION_PHASE) this.setPhaseTimeout(() => this.askQuestion(), PAUSE_INTERMISSION);
	}

	/**
	 * Broadcasts the next question on the questions list to the room and sets
	 * a timeout to tally the answers received.
	 */
	askQuestion() {
		if (this.isPaused) return;
		if (!this.questions.length) {
			if (!this.getCap()) {
				// If there's no score cap, we declare a winner when we run out of questions,
				// instead of ending a game with a stalemate
				this.win(`The game of Trivia has ended because there are no more questions!`);
				return;
			}
			if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
			this.phaseTimeout = null;
			broadcast(
				this.room,
				this.room.tr('No questions are left!'),
				this.room.tr('The game has reached a stalemate')
			);
			if (this.room) this.destroy();
			return;
		}

		this.phase = QUESTION_PHASE;
		this.askedAt = process.hrtime();

		const question = this.questions.pop();
		this.questionNumber++;
		this.curQuestion = question.question;
		this.curAnswers = question.answers;
		this.sendQuestion(question);
		this.setTallyTimeout();
	}

	setTallyTimeout() {
		this.setPhaseTimeout(() => this.tallyAnswers(), this.getRoundLength());
	}

	/**
	 * Broadcasts to the room what the next question is.
	 */
	sendQuestion(question) {
		broadcast(
			this.room,
			this.room.tr`Question${this.game.length === 'infinite' ? ` ${this.questionNumber}` : ''}: ${question.question}`,
			this.room.tr`Category: ${ALL_CATEGORIES[question.category]}`
		);
	}

	/**
	 * This is a noop here since it'd defined properly by subclasses later on.
	 * All this is obligated to do is take a user and their answer as args;
	 * the behaviour of this method can be entirely arbitrary otherwise.
	 */
	answerQuestion(answer, user) {}

	/**
	 * Verifies whether or not an answer is correct. In longer answers, small
	 * typos can be made and still have the answer be considered correct.
	 */
	verifyAnswer(targetAnswer) {
		return this.curAnswers.some(answer => {
			const mla = this.maxLevenshteinAllowed(answer.length);
			return (answer === targetAnswer) || (_utils.Utils.levenshtein(targetAnswer, answer, mla) <= mla);
		});
	}

	/**
	 * Return the maximum Levenshtein distance that is allowable for answers of the given length.
	 */
	maxLevenshteinAllowed(answerLength) {
		if (answerLength > 5) {
			return 2;
		}

		if (answerLength > 4) {
			return 1;
		}

		return 0;
	}
	/**
	 * This is a noop here since it'd defined properly by mode subclasses later
	 * on. This calculates the points a correct responder earns, which is
	 * typically between 1-5.
	 */
	calculatePoints(diff, totalDiff) {}

	/**
	 * This is a noop here since it's defined properly by mode subclasses later
	 * on. This is obligated to update the game phase, but it can be entirely
	 * arbitrary otherwise.
	 */
	tallyAnswers() {}

	/**
	 * Ends the game after a player's score has exceeded the score cap.
	 */
	win(buffer) {
		if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
		this.phaseTimeout = null;
		const winners = this.getTopPlayers({max: 3});
		buffer += '<br />' + this.getWinningMessage(winners);
		broadcast(this.room, this.room.tr('The answering period has ended!'), buffer);

		for (const userid in this.playerTable) {
			const player = this.playerTable[userid];
			if (!player.points) continue;

			for (const leaderboard of [exports.triviaData.leaderboard, exports.triviaData.altLeaderboard]) {
				if (!leaderboard[userid]) {
					leaderboard[userid] = [0, 0, 0];
				}
				const rank = leaderboard[userid];
				rank[1] += player.points;
				rank[2] += player.correctAnswers;
			}
		}

		const prizes = this.getPrizes();
		exports.triviaData.leaderboard[winners[0].id][0] += prizes[0];
		for (let i = 0; i < winners.length; i++) {
			exports.triviaData.altLeaderboard[winners[i].id][0] += prizes[i];
		}

		exports.cachedLadder.invalidateCache();
		exports.cachedAltLadder.invalidateCache();

		for (const i in this.playerTable) {
			const player = this.playerTable[i];
			const user = Users.get(player.id);
			if (!user) continue;
			user.sendTo(
				this.room.roomid,
				this.room.tr`You gained ${player.points} and answered ` +
				this.room.tr`${player.correctAnswers} questions correctly.`
			);
		}

		const buf = this.getStaffEndMessage(winners, winner => winner.player.name);
		const logbuf = this.getStaffEndMessage(winners, winner => winner.id);
		this.room.sendMods(`(${buf}!)`);
		this.room.roomlog(buf);
		this.room.modlog({
			action: 'TRIVIAGAME',
			loggedBy: toID(this.game.creator),
			note: logbuf,
		});

		if (!exports.triviaData.history) exports.triviaData.history = [];
		exports.triviaData.history.push(this.game);
		if (exports.triviaData.history.length > 10) exports.triviaData.history.shift();

		writeTriviaData();
		this.destroy();
	}

	getPrizes() {
		// Reward players more in longer infinite games
		const multiplier = this.game.length === 'infinite' ? Math.floor(this.questionNumber / 25) || 1 : 1;
		return LENGTHS[this.game.length].prizes.map(prize => prize * multiplier);
	}

	getTopPlayers(options = {max: null, requirePoints: true}) {
		const ranks = [];
		for (const userid in this.playerTable) {
			const user = Users.get(userid);
			const player = this.playerTable[userid];
			if ((options.requirePoints && !player.points) || !user) continue;
			ranks.push({id: userid, player, name: user.name});
		}
		ranks.sort((a, b) => b.player.points - a.player.points ||
				a.player.lastQuestion - b.player.lastQuestion ||
				hrtimeToNanoseconds(a.player.answeredAt) - hrtimeToNanoseconds(b.player.answeredAt));
		return options.max === null ? ranks : ranks.slice(0, options.max);
	}

	getWinningMessage(winners) {
		const prizes = this.getPrizes();
		const [p1, p2, p3] = winners;
		const initialPart = this.room.tr`${_utils.Utils.escapeHTML(p1.name)} won the game with a final score of <strong>${p1.player.points}</strong>, and `;
		switch (winners.length) {
		case 1:
			return this.room.tr`${initialPart}their leaderboard score has increased by <strong>${prizes[0]}</strong> points!`;
		case 2:
			return this.room.tr`${initialPart}their leaderboard score has increased by <strong>${prizes[0]}</strong> points! ` +
			this.room.tr`${_utils.Utils.escapeHTML(p2.name)} was a runner-up and their leaderboard score has increased by <strong>${prizes[1]}</strong> points!`;
		case 3:
			return initialPart + _utils.Utils.html`${this.room.tr`${p2.name} and ${p3.name} were runners-up. `}` +
				this.room.tr`Their leaderboard score has increased by ${prizes[0]}, ${prizes[1]}, and ${prizes[2]}, respectively!`;
		}
	}

	getStaffEndMessage(winners, mapper) {
		let message = "";
		const winnerParts = [
			winner => this.room.tr`User ${mapper(winner)} won the game of ${this.game.mode} ` +
				this.room.tr`mode trivia under the ${this.game.category} category with ` +
				`${this.getCap() ? this.room.tr`a cap of ${this.getCap()} points` : this.room.tr`no score cap`}, ` +
				this.room.tr`with ${winner.player.points} points and ` +
				this.room.tr`${winner.player.correctAnswers} correct answers`,
			winner => this.room.tr` Second place: ${mapper(winner)} (${winner.player.points} points)`,
			winner => this.room.tr`, third place: ${mapper(winner)} (${winner.player.points} points)`,
		];
		for (let i = 0; i < winners.length; i++) {
			message += winnerParts[i](winners[i]);
		}
		return `${message}`;
	}

	end(user) {
		broadcast(this.room, _utils.Utils.html`${this.room.tr`The game was forcibly ended by ${user.name}.`}`);
		this.destroy();
	}
} exports.Trivia = Trivia;

/**
 * Helper function for timer and number modes. Milliseconds are not precise
 * enough to score players properly in rare cases.
 */
const hrtimeToNanoseconds = (hrtime) => hrtime[0] * 1e9 + hrtime[1];

/**
 * First mode rewards points to the first user to answer the question
 * correctly.
 */
 class FirstModeTrivia extends Trivia {
	answerQuestion(answer, user) {
		const player = this.playerTable[user.id];
		if (!player) throw new Chat.ErrorMessage(this.room.tr`You are not a player in the current trivia game.`);
		if (this.isPaused) throw new Chat.ErrorMessage(this.room.tr`The trivia game is paused.`);
		if (this.phase !== QUESTION_PHASE) throw new Chat.ErrorMessage(this.room.tr`There is no question to answer.`);
		if (player.answer) {
			throw new Chat.ErrorMessage(this.room.tr`You have already attempted to answer the current question.`);
		}
		if (!this.verifyAnswer(answer)) return;

		if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
		this.phase = INTERMISSION_PHASE;

		const points = this.calculatePoints();
		player.setAnswer(answer);
		player.incrementPoints(points, this.questionNumber);

		const players = user.name;
		const buffer = _utils.Utils.html`${this.room.tr`Correct: ${players}`}<br />` +
			this.room.tr`Answer(s): ${this.curAnswers.join(', ')}` + `<br />` +
			this.room.tr('They gained <strong>5</strong> points!') + `<br />` +
			this.room.tr`The top 5 players are: ${this.formatPlayerList({max: 5})}`;
		if (this.getCap() && player.points >= this.getCap()) {
			this.win(buffer);
			return;
		}

		for (const i in this.playerTable) {
			this.playerTable[i].clearAnswer();
		}

		broadcast(this.room, this.room.tr('The answering period has ended!'), buffer);
		this.setPhaseTimeout(() => this.askQuestion(), INTERMISSION_INTERVAL);
	}

	calculatePoints() {
		return 5;
	}

	tallyAnswers() {
		if (this.isPaused) return;
		this.phase = INTERMISSION_PHASE;

		for (const i in this.playerTable) {
			const player = this.playerTable[i];
			player.clearAnswer();
		}

		broadcast(
			this.room,
			this.room.tr('The answering period has ended!'),
			this.room.tr('Correct: no one...') + `<br />` +
			this.room.tr`Answers: ${this.curAnswers.join(', ')}` + `<br />` +
			this.room.tr('Nobody gained any points.') + `<br />` +
			this.room.tr`The top 5 players are: ${this.formatPlayerList({max: 5})}`
		);
		this.setAskTimeout();
	}

	setAskTimeout() {
		this.setPhaseTimeout(() => this.askQuestion(), INTERMISSION_INTERVAL);
	}
} exports.FirstModeTrivia = FirstModeTrivia;

/**
 * Timer mode rewards up to 5 points to all players who answer correctly
 * depending on how quickly they answer the question.
 */
 class TimerModeTrivia extends Trivia {
	answerQuestion(answer, user) {
		const player = this.playerTable[user.id];
		if (!player) throw new Chat.ErrorMessage(this.room.tr`You are not a player in the current trivia game.`);
		if (this.isPaused) throw new Chat.ErrorMessage(this.room.tr`The trivia game is paused.`);
		if (this.phase !== QUESTION_PHASE) throw new Chat.ErrorMessage(this.room.tr`There is no question to answer.`);

		const isCorrect = this.verifyAnswer(answer);
		player.setAnswer(answer, isCorrect);
	}

	/**
	 * The difference between the time the player answered the question and
	 * when the question was asked, in nanoseconds.
	 * The difference between the time scoring began and the time the question
	 * was asked, in nanoseconds.
	 */
	calculatePoints(diff, totalDiff) {
		return Math.floor(6 - 5 * diff / totalDiff);
	}

	tallyAnswers() {
		if (this.isPaused) return;
		this.phase = INTERMISSION_PHASE;

		let buffer = (
			this.room.tr`Answer(s): ${this.curAnswers.join(', ')}<br />` +
			'<table style="width: 100%; background-color: #9CBEDF; margin: 2px 0">' +
				'<tr style="background-color: #6688AA">' +
					'<th style="width: 100px">Points gained</th>' +
					`<th>${this.room.tr`Correct`}</th>` +
				'</tr>'
		);
		const innerBuffer = new Map([5, 4, 3, 2, 1].map(n => [n, []]));

		let winner = false;

		const now = hrtimeToNanoseconds(process.hrtime());
		const askedAt = hrtimeToNanoseconds(this.askedAt);
		const totalDiff = now - askedAt;
		for (const i in this.playerTable) {
			const player = this.playerTable[i];
			if (!player.isCorrect) {
				player.clearAnswer();
				continue;
			}

			const playerAnsweredAt = hrtimeToNanoseconds(player.currentAnsweredAt);
			const diff = playerAnsweredAt - askedAt;
			const points = this.calculatePoints(diff, totalDiff);
			player.incrementPoints(points, this.questionNumber);

			const pointBuffer = innerBuffer.get(points) || [];
			pointBuffer.push([_utils.Utils.escapeHTML(player.name), playerAnsweredAt]);

			if (this.getCap() && player.points >= this.getCap()) {
				winner = true;
			}

			player.clearAnswer();
		}

		let rowAdded = false;
		for (const [pointValue, players] of innerBuffer) {
			if (!players.length) continue;

			rowAdded = true;
			const sanitizedPlayerArray = players
				.sort((a, b) => a[1] - b[1])
				.map(a => a[0]);
			buffer += (
				'<tr style="background-color: #6688AA">' +
				`<td style="text-align: center">${pointValue}</td>` +
				`<td>${sanitizedPlayerArray.join(', ')}</td>` +
				'</tr>'
			);
		}

		if (!rowAdded) {
			buffer += (
				'<tr style="background-color: #6688AA">' +
				'<td style="text-align: center">&#8212;</td>' +
				`<td>${this.room.tr`No one answered correctly...`}</td>` +
				'</tr>'
			);
		}

		buffer += '</table>';

		if (winner) return this.win(buffer);

		buffer += `<br />${this.room.tr`The top 5 players are: ${this.formatPlayerList({max: 5})}`}`;
		broadcast(this.room, this.room.tr('The answering period has ended!'), buffer);
		this.setPhaseTimeout(() => this.askQuestion(), INTERMISSION_INTERVAL);
	}
} exports.TimerModeTrivia = TimerModeTrivia;

/**
 * Number mode rewards up to 5 points to all players who answer correctly
 * depending on the ratio of correct players to total players (lower ratio is
 * better).
 */
 class NumberModeTrivia extends Trivia {
	answerQuestion(answer, user) {
		const player = this.playerTable[user.id];
		if (!player) throw new Chat.ErrorMessage(this.room.tr`You are not a player in the current trivia game.`);
		if (this.isPaused) throw new Chat.ErrorMessage(this.room.tr`The trivia game is paused.`);
		if (this.phase !== QUESTION_PHASE) throw new Chat.ErrorMessage(this.room.tr`There is no question to answer.`);

		const isCorrect = this.verifyAnswer(answer);
		player.setAnswer(answer, isCorrect);
	}

	calculatePoints(correctPlayers) {
		return correctPlayers && (6 - Math.floor(5 * correctPlayers / this.playerCount));
	}

	getRoundLength() {
		return 6 * 1000;
	}

	tallyAnswers() {
		if (this.isPaused) return;
		this.phase = INTERMISSION_PHASE;

		let buffer;
		const innerBuffer = Object.keys(this.playerTable)
			.filter(id => !!this.playerTable[id].isCorrect)
			.map(id => {
				const player = this.playerTable[id];
				return [_utils.Utils.escapeHTML(player.name), hrtimeToNanoseconds(player.currentAnsweredAt)];
			})
			.sort((a, b) => (a[1] ) - (b[1] ));

		const points = this.calculatePoints(innerBuffer.length);
		if (points) {
			let winner = false;
			for (const i in this.playerTable) {
				const player = this.playerTable[i];
				if (player.isCorrect) player.incrementPoints(points, this.questionNumber);

				if (this.getCap() && player.points >= this.getCap()) {
					winner = true;
				}

				player.clearAnswer();
			}

			const players = innerBuffer.map(arr => arr[0]).join(', ');
			buffer = this.room.tr`Correct: ${players}` + `<br />` +
				this.room.tr`Answer(s): ${this.curAnswers.join(', ')}<br />` +
				`${Chat.plural(innerBuffer, this.room.tr`Each of them gained <strong>${points}</strong> point(s)!`, this.room.tr`They gained <strong>${points}</strong> point(s)!`)}`;

			if (winner) return this.win(buffer);
		} else {
			for (const i in this.playerTable) {
				const player = this.playerTable[i];
				player.clearAnswer();
			}

			buffer = this.room.tr('Correct: no one...') + `<br />` +
				this.room.tr`Answer(s): ${this.curAnswers.join(', ')}<br />` +
				this.room.tr('Nobody gained any points.');
		}

		buffer += `<br />${this.room.tr`The top 5 players are: ${this.formatPlayerList({max: 5})}`}`;
		broadcast(this.room, this.room.tr('The answering period has ended!'), buffer);
		this.setPhaseTimeout(() => this.askQuestion(), INTERMISSION_INTERVAL);
	}
} exports.NumberModeTrivia = NumberModeTrivia;

/**
 * Triumvirate mode rewards points to the top three users to answer the question correctly.
 */
 class TriumvirateModeTrivia extends Trivia {
	answerQuestion(answer, user) {
		const player = this.playerTable[user.id];
		if (!player) throw new Chat.ErrorMessage(this.room.tr`You are not a player in the current trivia game.`);
		if (this.isPaused) throw new Chat.ErrorMessage(this.room.tr`The trivia game is paused.`);
		if (this.phase !== QUESTION_PHASE) throw new Chat.ErrorMessage(this.room.tr`There is no question to answer.`);
		player.setAnswer(answer, this.verifyAnswer(answer));
		const correctAnswers = Object.keys(this.playerTable).filter(id => this.playerTable[id].isCorrect).length;
		if (correctAnswers === 3) {
			if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
			this.tallyAnswers();
		}
	}

	calculatePoints(answerNumber) {
		return 5 - answerNumber * 2; // 5 points to 1st, 3 points to 2nd, 1 point to 1st
	}

	tallyAnswers() {
		if (this.isPaused) return;
		this.phase = INTERMISSION_PHASE;
		const correctPlayers = Object.keys(this.playerTable)
			.filter(id => this.playerTable[id].isCorrect)
			.map(id => this.playerTable[id]);
		correctPlayers.sort((a, b) =>
			(hrtimeToNanoseconds(a.currentAnsweredAt) > hrtimeToNanoseconds(b.currentAnsweredAt) ? 1 : -1));

		let winner = false;
		const playersWithPoints = [];
		for (const player of correctPlayers) {
			const points = this.calculatePoints(correctPlayers.indexOf(player));
			player.incrementPoints(points, this.questionNumber);
			playersWithPoints.push(`${_utils.Utils.escapeHTML(player.name)} (${points})`);
			if (this.getCap() && player.points >= this.getCap()) {
				winner = true;
			}
		}
		for (const i in this.playerTable) {
			this.playerTable[i].clearAnswer();
		}

		let buffer = ``;
		if (playersWithPoints.length) {
			const players = playersWithPoints.join(", ");
			buffer = this.room.tr`Correct: ${players}<br />` +
			this.room.tr`Answers: ${this.curAnswers.join(', ')}<br />` +
			this.room.tr`The top 5 players are: ${this.formatPlayerList({max: 5})}`;
		} else {
			buffer = this.room.tr('Correct: no one...') + `<br />` +
			this.room.tr`Answers: ${this.curAnswers.join(', ')}<br />` +
			this.room.tr('Nobody gained any points.') + `<br />` +
			this.room.tr`The top 5 players are: ${this.formatPlayerList({max: 5})}`;
		}

		if (winner) return this.win(buffer);
		broadcast(this.room, this.room.tr('The answering period has ended!'), buffer);
		this.setPhaseTimeout(() => this.askQuestion(), INTERMISSION_INTERVAL);
	}
} exports.TriumvirateModeTrivia = TriumvirateModeTrivia;

/**
 * Mastermind is a separate, albeit similar, game from regular Trivia.
 *
 * In Mastermind, each player plays their own personal round of Trivia,
 * and the top n players from those personal rounds go on to the finals,
 * which is a game of First mode trivia that ends after a specified interval.
 */
 class Mastermind extends Rooms.RoomGame {
	/** userid:score Map */
	
	
	
	

	constructor(room, numFinalists) {
		super(room);

		this.leaderboard = new Map();
		this.gameid = 'mastermind' ;
		this.title = 'Mastermind';
		this.allowRenames = true;
		this.playerCap = Number.MAX_SAFE_INTEGER;
		this.phase = SIGNUP_PHASE;
		this.currentRound = null;
		this.numFinalists = numFinalists;
		this.init();
	}

	init() {
		broadcast(
			this.room,
			this.room.tr`Signups for a new Mastermind game have begun!`,
			this.room.tr`The top <strong>${this.numFinalists}</strong> players will advance to the finals!` + `<br />` +
			this.room.tr`Type <code>/mastermind join</code> to sign up for the game.`
		);
	}

	addTriviaPlayer(user) {
		if (user.previousIDs.concat(user.id).some(id => id in this.playerTable)) {
			throw new Chat.ErrorMessage(this.room.tr`You have already signed up for this game.`);
		}

		for (const targetUser of Object.keys(this.playerTable).map(id => Users.get(id))) {
			if (!targetUser) continue;
			const isSameUser = (
				targetUser.previousIDs.includes(user.id) ||
				targetUser.previousIDs.some(tarId => user.previousIDs.includes(tarId)) ||
				!Config.noipchecks && targetUser.ips.some(ip => user.ips.includes(ip))
			);
			if (isSameUser) throw new Chat.ErrorMessage(this.room.tr`You have already signed up for this game.`);
		}

		this.addPlayer(user);
	}

	formatPlayerList() {
		return Object.values(this.playerTable)
			.sort((a, b) => (this.leaderboard.get(b.id) || 0) - (this.leaderboard.get(a.id) || 0))
			.map(player => {
				const isFinalist = this.currentRound instanceof MastermindFinals && player.id in this.currentRound.playerTable;
				const name = isFinalist ? _utils.Utils.html`<strong>${player.name}</strong>` : _utils.Utils.escapeHTML(player.name);
				return `${name} (${this.leaderboard.get(player.id) || "0"})`;
			})
			.join(', ');
	}

	/**
	 * Starts a new round for a particular player.
	 * @param playerID the user ID of the player
	 * @param category the category to ask questions in (e.g. Pokémon)
	 * @param questions an array of TriviaQuestions to be asked
	 * @param timeout the period of time to end the round after (in seconds)
	 */
	startRound(playerID, category, questions, timeout) {
		if (this.currentRound) {
			throw new Chat.ErrorMessage(this.room.tr`There is already a round of Mastermind in progress.`);
		}
		if (!(playerID in this.playerTable)) {
			throw new Chat.ErrorMessage(this.room.tr`That user is not signed up for Mastermind!`);
		}
		if (this.leaderboard.has(playerID)) {
			throw new Chat.ErrorMessage(this.room.tr`The user "${playerID}" has already played their round of Mastermind.`);
		}
		if (this.playerCount <= this.numFinalists) {
			throw new Chat.ErrorMessage(this.room.tr`You cannot start the game of Mastermind until there are more players than finals slots.`);
		}

		this.phase = MASTERMIND_ROUNDS_PHASE;

		this.currentRound = new MastermindRound(this.room, category, questions, playerID);
		setTimeout((id) => {
			if (!this.currentRound) return;
			const points = _optionalChain([this, 'access', _7 => _7.currentRound, 'access', _8 => _8.playerTable, 'access', _9 => _9[playerID], 'optionalAccess', _10 => _10.points]);
			const player = this.playerTable[id].name;
			broadcast(
				this.room,
				this.room.tr`The round of Mastermind has ended!`,
				points ? this.room.tr`${player} earned ${points} points!` : undefined
			);

			this.leaderboard.set(id, points || 0);
			this.currentRound.destroy();
			this.currentRound = null;
		}, timeout * 1000, playerID);
	}

	/**
	 * Starts the Mastermind finals.
	 * According the specification given by Trivia auth,
	 * Mastermind finals are always in the 'all' category.
	 * @param timeout timeout in seconds
	 */
	startFinals(timeout) {
		if (this.currentRound) {
			throw new Chat.ErrorMessage(this.room.tr`There is already a round of Mastermind in progress.`);
		}
		for (const player in this.playerTable) {
			if (!this.leaderboard.has(toID(player))) {
				throw new Chat.ErrorMessage(this.room.tr`You cannot start finals until the user '${player}' has played a round.`);
			}
		}

		const questions = _utils.Utils.shuffle(getQuestions('all' ));
		if (!questions.length) throw new Chat.ErrorMessage(this.room.tr`There are no questions in the Trivia database.`);

		this.currentRound = new MastermindFinals(this.room, 'all', questions, this.getTopPlayers(this.numFinalists));

		this.phase = MASTERMIND_FINALS_PHASE;
		setTimeout(() => {
			if (!this.currentRound) return;
			this.currentRound.win();
			const [winner, second, third] = this.currentRound.getTopPlayers();
			this.currentRound.destroy();
			this.currentRound = null;

			let buf = this.room.tr`No one scored any points, so it's a tie!`;
			if (winner) {
				const winnerName = _utils.Utils.escapeHTML(winner.name);
				buf = this.room.tr`${winnerName} won the game of Mastermind with ${winner.player.points} points!`;
			}

			let smallBuf;
			if (second && third) {
				const secondPlace = _utils.Utils.escapeHTML(second.name);
				const thirdPlace = _utils.Utils.escapeHTML(second.name);
				smallBuf = `<br />${this.room.tr`${secondPlace} and ${thirdPlace} were runners-up with ${second.player.points} and ${third.player.points} points, respectively.`}`;
			} else if (second) {
				const secondPlace = _utils.Utils.escapeHTML(second.name);
				smallBuf = `<br />${this.room.tr`${secondPlace} was a runner up with ${second.player.points} points.`}`;
			}

			broadcast(this.room, buf, smallBuf);
			this.destroy();
		}, timeout * 1000);
	}

	getTopPlayers(n) {
		return [...this.leaderboard]
			.sort((a, b) => b[1] - a[1]) // sort by number of points
			.map(entry => entry[0]) // convert to an array of IDs
			.slice(0, n); // get the top n players
	}

	end(user) {
		broadcast(this.room, this.room.tr`The game of Mastermind was forcibly ended by ${user.name}.`);
		if (this.currentRound) this.currentRound.destroy();
		this.destroy();
	}

	leave(user) {
		if (!this.playerTable[user.id]) {
			throw new Chat.ErrorMessage(this.room.tr`You are not a player in the current game.`);
		}
		this.leaderboard.delete(user.id);
		super.removePlayer(user);
	}
} exports.Mastermind = Mastermind;

 class MastermindRound extends FirstModeTrivia {
	constructor(room, category, questions, playerID) {
		super(room, 'first', category, 'infinite', questions, 'Automatically Created', false, true);

		this.playerCap = 1;
		this.minPlayers = 0;
		if (playerID) {
			const player = Users.get(playerID);
			const targetUsername = playerID;
			if (!player) throw new Chat.ErrorMessage(this.room.tr`User "${targetUsername}" not found.`);
			this.addPlayer(player);
		}
		this.game.mode = 'Mastermind';
		this.start();
	}

	init() {
		return;
	}
	start() {
		const player = _utils.Utils.escapeHTML(_optionalChain([this, 'access', _11 => _11.players, 'access', _12 => _12[0], 'optionalAccess', _13 => _13.name]) || '');
		broadcast(this.room, this.room.tr`A Mastermind round in the ${this.game.category} category for ${player} is starting!`);
		this.phase = INTERMISSION_PHASE;
		// Use the regular start timeout since there are many players
		this.setPhaseTimeout(() => this.askQuestion(), MASTERMIND_FINALS_START_TIMEOUT);
		return;
	}

	win() {
		if (this.phaseTimeout) clearTimeout(this.phaseTimeout);
		this.phaseTimeout = null;
	}

	addTriviaPlayer(user) {
		throw new Chat.ErrorMessage(`This is a round of Mastermind; to join the overall game of Mastermind, use /mm join`);
	}

	setTallyTimeout() {
		// Players must use /mastermind pass to pass on a question
		return;
	}

	pass() {
		this.tallyAnswers();
	}

	setAskTimeout() {
		this.setPhaseTimeout(() => this.askQuestion(), MASTERMIND_INTERMISSION_INTERVAL);
	}

	destroy() {
		super.destroy();
	}
} exports.MastermindRound = MastermindRound;

 class MastermindFinals extends MastermindRound {
	constructor(room, category, questions, players) {
		super(room, category, questions);MastermindFinals.prototype.__init2.call(this);;
		this.playerCap = players.length;
		for (const id of players) {
			const player = Users.get(id);
			if (!player) continue;
			this.addPlayer(player);
		}
	}

	start() {
		broadcast(this.room, this.room.tr`The Mastermind finals are starting!`);
		this.phase = INTERMISSION_PHASE;
		// Use the regular start timeout since there are many players
		this.setPhaseTimeout(() => this.askQuestion(), MASTERMIND_FINALS_START_TIMEOUT);
		return;
	}

	win() {
		super.win();
		const points = new Map();
		for (const id in this.playerTable) {
			points.set(id, this.playerTable[id].points);
		}
		return points;
	}

	__init2() {this.setTallyTimeout = FirstModeTrivia.prototype.setTallyTimeout}

	pass() {
		throw new Chat.ErrorMessage(this.room.tr`You cannot pass in the finals.`);
	}
} exports.MastermindFinals = MastermindFinals;

const triviaCommands = {
	sortednew: 'new',
	newsorted: 'new',
	new(target, room, user, connection, cmd) {
		const randomizeQuestionOrder = !cmd.includes('sorted');

		room = this.requireRoom('trivia' );
		this.checkCan('show', null, room);
		this.checkChat();
		if (room.game) {
			return this.errorReply(this.tr`There is already a game of ${room.game.title} in progress.`);
		}

		const targets = (target ? target.split(',') : []);
		if (targets.length < 3) return this.errorReply("Usage: /trivia new [mode], [category], [length]");

		let mode = toID(targets[0]);
		if (['triforce', 'tri'].includes(mode)) mode = 'triumvirate';
		const isRandomMode = (mode === 'random');
		if (isRandomMode) {
			const recentFirstMode = _optionalChain([exports.triviaData, 'access', _14 => _14.history, 'optionalAccess', _15 => _15.some, 'call', _16 => _16(game => game.mode === 'First')]);
			const modes = recentFirstMode ? Object.keys(MODES).filter(curMode => curMode !== 'first') : Object.keys(MODES);
			mode = _utils.Utils.shuffle(modes)[0];
		}
		if (!MODES[mode]) return this.errorReply(this.tr`"${mode}" is an invalid mode.`);

		const categoryID = toID(targets[1]);
		const category = CATEGORY_ALIASES[categoryID] || categoryID;
		let questions = getQuestions(category);
		const length = toID(targets[2]);
		if (!LENGTHS[length]) return this.errorReply(this.tr`"${length}" is an invalid game length.`);
		// Assume that infinite mode will last for at least 75 points
		if (questions.length < (LENGTHS[length].cap || 75) / 5) {
			if (category === 'random') {
				return this.errorReply(
					this.tr`There are not enough questions in the randomly chosen category to finish a trivia game.`
				);
			}
			if (category === 'all') {
				return this.errorReply(
					this.tr("There are not enough questions in the trivia database to finish a trivia game.")
				);
			}
			return this.errorReply(
				this.tr`There are not enough questions under the category "${ALL_CATEGORIES[category]}" to finish a trivia game.`
			);
		}

		let _Trivia;
		if (mode === 'first') {
			_Trivia = FirstModeTrivia;
		} else if (mode === 'number') {
			_Trivia = NumberModeTrivia;
		} else if (mode === 'triumvirate') {
			_Trivia = TriumvirateModeTrivia;
		} else {
			_Trivia = TimerModeTrivia;
		}

		if (randomizeQuestionOrder) {
			// Randomizes the order of the questions.
			questions = _utils.Utils.shuffle(questions);
		} else {
			// Reverses the order of the questions so that they appear
			// in the order they were added to the Trivia question "database".
			questions = questions.reverse();
		}
		room.game = new _Trivia(room, mode, category, length, questions, user.name, isRandomMode);
	},
	newhelp: [
		`/trivia new [mode], [category], [length] - Begin a new Trivia game.`,
		`/trivia sortednew [mode], [category], [length] — Begin a new Trivia game in which the question order is not randomized.`,
		`Requires: + % @ # &`,
	],

	join(target, room, user) {
		room = this.requireRoom();
		getTriviaGame(room).addTriviaPlayer(user);
		this.sendReply(this.tr('You are now signed up for this game!'));
	},
	joinhelp: [`/trivia join - Join the current game of Trivia or Mastermind.`],

	kick(target, room, user) {
		room = this.requireRoom();
		this.checkChat();
		this.checkCan('mute', null, room);

		this.splitTarget(target);
		const targetUser = this.targetUser;
		if (!targetUser) return this.errorReply(this.tr`The user "${target}" does not exist.`);
		getTriviaGame(room).kick(targetUser);
	},
	kickhelp: [`/trivia kick [username] - Kick players from a trivia game by username. Requires: % @ # &`],

	leave(target, room, user) {
		getTriviaGame(room).leave(user);
		this.sendReply(this.tr("You have left the current game of Trivia."));
	},
	leavehelp: [`/trivia leave - Makes the player leave the game.`],

	start(target, room) {
		room = this.requireRoom();
		this.checkCan('show', null, room);
		this.checkChat();

		getTriviaGame(room).start();
	},
	starthelp: [`/trivia start - Ends the signup phase of a trivia game and begins the game. Requires: + % @ # &`],

	answer(target, room, user) {
		room = this.requireRoom();
		this.checkChat();
		let game;
		try {
			const mastermindRound = getMastermindGame(room).currentRound;
			if (!mastermindRound) throw new Error;
			game = mastermindRound;
		} catch (e) {
			game = getTriviaGame(room);
		}

		const answer = toID(target);
		if (!answer) return this.errorReply(this.tr("No valid answer was entered."));

		if (_optionalChain([room, 'access', _17 => _17.game, 'optionalAccess', _18 => _18.gameid]) === 'trivia' && !Object.keys(game.playerTable).includes(user.id)) {
			game.addTriviaPlayer(user);
		}
		game.answerQuestion(answer, user);
		this.sendReply(this.tr`You have selected "${answer}" as your answer.`);
	},
	answerhelp: [`/trivia answer OR /ta [answer] - Answer a pending question.`],

	resume: 'pause',
	pause(target, room, user, connection, cmd) {
		room = this.requireRoom();
		this.checkCan('show', null, room);
		this.checkChat();
		if (cmd === 'pause') {
			getTriviaGame(room).pause();
		} else {
			getTriviaGame(room).resume();
		}
	},
	pausehelp: [`/trivia pause - Pauses a trivia game. Requires: + % @ # &`],
	resumehelp: [`/trivia resume - Resumes a paused trivia game. Requires: + % @ # &`],

	end(target, room, user) {
		room = this.requireRoom();
		this.checkCan('show', null, room);
		this.checkChat();
		let game;
		try {
			game = getMastermindGame(room);
		} catch (e) {
			game = getTriviaGame(room);
		}

		game.end(user);
	},
	endhelp: [`/trivia end - Forcibly end a trivia game. Requires: + % @ # &`],

	getwinners: 'win',
	win(target, room, user) {
		room = this.requireRoom();
		this.checkCan('show', null, room);
		this.checkChat();

		const game = getTriviaGame(room);
		if (game.game.length !== 'infinite' && !user.can('editroom', null, room)) {
			return this.errorReply(
				this.tr("Only Room Owners and higher can force a Trivia game to end with winners in a non-infinite length.")
			);
		}
		game.win(this.tr`${user.name} ended the game of Trivia!`);
	},
	winhelp: [`/trivia win - End a trivia game and tally the points to find winners. Requires: + % @ # & in Infinite length, else # &`],

	'': 'status',
	players: 'status',
	status(target, room, user) {
		room = this.requireRoom();
		if (!this.runBroadcast()) return false;
		const game = getTriviaGame(room);

		let tarUser;
		if (target) {
			this.splitTarget(target);
			if (!this.targetUser) return this.errorReply(this.tr`User ${target} does not exist.`);
			tarUser = this.targetUser;
		} else {
			tarUser = user;
		}
		let buffer = `${game.isPaused ? this.tr`There is a paused trivia game` : this.tr`There is a trivia game in progress`}, ` +
			this.tr`and it is in its ${game.phase} phase.` + `<br />` +
			this.tr`Mode: ${game.game.mode} | Category: ${game.game.category} | Score cap: ${game.getCap() || "Infinite"}`;

		const player = game.playerTable[tarUser.id];
		if (player) {
			if (!this.broadcasting) {
				buffer += `<br />${this.tr`Current score: ${player.points} | Correct Answers: ${player.correctAnswers}`}`;
			}
		} else if (tarUser.id !== user.id) {
			return this.errorReply(this.tr`User ${tarUser.name} is not a player in the current trivia game.`);
		}
		buffer += `<br />${this.tr`Players: ${game.formatPlayerList({max: null, requirePoints: false})}`}`;

		this.sendReplyBox(buffer);
	},
	statushelp: [`/trivia status [player] - lists the player's standings (your own if no player is specified) and the list of players in the current trivia game.`],

	submit: 'add',
	add(target, room, user, connection, cmd) {
		room = this.requireRoom('questionworkshop' );
		if (cmd === 'add') this.checkCan('mute', null, room);
		if (cmd === 'submit') this.checkCan('show', null, room);
		if (!target) return false;
		this.checkChat();

		const params = target.split('\n').map(str => str.split('|'));
		for (const param of params) {
			if (param.length !== 3) {
				this.errorReply(this.tr`Invalid arguments specified in "${param}". View /trivia help for more information.`);
				continue;
			}

			const categoryID = toID(param[0]);
			const category = CATEGORY_ALIASES[categoryID] || categoryID;
			if (!ALL_CATEGORIES[category]) {
				this.errorReply(this.tr`'${param[0].trim()}' is not a valid category. View /trivia help for more information.`);
				continue;
			}
			if (cmd === 'submit' && !MAIN_CATEGORIES[category]) {
				this.errorReply(this.tr`You cannot submit questions in the '${ALL_CATEGORIES[category]}' category`);
				continue;
			}

			const question = _utils.Utils.escapeHTML(param[1].trim());
			if (!question) {
				this.errorReply(this.tr`'${param[1].trim()}' is not a valid question.`);
				continue;
			}
			if (question.length > MAX_QUESTION_LENGTH) {
				this.errorReply(
					this.tr`Question "${param[1].trim()}" is too long! It must remain under ${MAX_QUESTION_LENGTH} characters.`
				);
				continue;
			}
			const subs = exports.triviaData.submissions;
			if (_optionalChain([subs, 'optionalAccess', _19 => _19.some, 'call', _20 => _20(s => s.question === question)]) || _optionalChain([subs, 'optionalAccess', _21 => _21.some, 'call', _22 => _22(q => q.question === question)])) {
				this.errorReply(this.tr`Question "${question}" is already in the trivia database.`);
				continue;
			}

			const cache = new Set();
			const answers = param[2].split(',')
				.map(toID)
				.filter(answer => !cache.has(answer) && !!cache.add(answer));
			if (!answers.length) {
				this.errorReply(this.tr`No valid answers were specified for question '${param[1].trim()}'.`);
				continue;
			}
			if (answers.some(answer => answer.length > MAX_ANSWER_LENGTH)) {
				this.errorReply(
					this.tr`Some of the answers entered for question '${param[1].trim()}' were too long!\n` +
					`They must remain under ${MAX_ANSWER_LENGTH} characters.`
				);
				continue;
			}

			const entry = {
				category: category,
				question: question,
				answers: answers,
				user: user.id,
			};

			if (cmd === 'add') {
				exports.triviaData.questions.splice(findEndOfCategory(category, false), 0, entry);
				writeTriviaData();
				this.modlog('TRIVIAQUESTION', null, `added '${param[1]}'`);
				this.privateModAction(`Question '${param[1]}' was added to the question database by ${user.name}.`);
			} else {
				exports.triviaData.submissions.splice(findEndOfCategory(category, true), 0, entry);
				writeTriviaData();
				if (!user.can('mute', null, room)) this.sendReply(`Question '${param[1]}' was submitted for review.`);
				this.modlog('TRIVIAQUESTION', null, `submitted '${param[1]}'`);
				this.privateModAction(`Question '${param[1]}' was submitted to the submission database by ${user.name} for review.`);
			}
		}
	},
	submithelp: [`/trivia submit [category] | [question] | [answer1], [answer2] ... [answern] - Adds question(s) to the submission database for staff to review. Requires: + % @ # &`],
	addhelp: [`/trivia add [category] | [question] | [answer1], [answer2], ... [answern] - Adds question(s) to the question database. Requires: % @ # &`],

	review(target, room) {
		room = this.requireRoom('questionworkshop' );
		this.checkCan('ban', null, room);

		const submissions = exports.triviaData.submissions;
		if (!submissions) return this.sendReply(this.tr("No questions await review."));
		const submissionsLen = submissions.length;
		if (!submissionsLen) return this.sendReply(this.tr("No questions await review."));

		let buffer = `|raw|<div class="ladder"><table>` +
			`<tr><td colspan="6"><strong>${Chat.count(submissionsLen, "</strong> questions")} awaiting review:</td></tr>` +
			`<tr><th>#</th><th>${this.tr`Category`}</th><th>${this.tr`Question`}</th><th>${this.tr`Answer(s)`}</th><th>${this.tr`Submitted By`}</th></tr>`;

		let i = 0;
		while (i < submissionsLen) {
			const entry = submissions[i];
			buffer += `<tr><td><strong>${(++i)}</strong></td><td>${entry.category}</td><td>${entry.question}</td><td>${entry.answers.join(", ")}</td><td>${entry.user}</td></tr>`;
		}
		buffer += "</table></div>";

		this.sendReply(buffer);
	},
	reviewhelp: [`/trivia review - View the list of submitted questions. Requires: @ # &`],

	reject: 'accept',
	accept(target, room, user, connection, cmd) {
		room = this.requireRoom('questionworkshop' );
		this.checkCan('ban', null, room);
		this.checkChat();

		target = target.trim();
		if (!target) return false;

		const isAccepting = cmd === 'accept';
		const questions = exports.triviaData.questions;
		const submissions = exports.triviaData.submissions;

		if (toID(target) === 'all') {
			if (isAccepting) {
				for (const submission of submissions) {
					questions.splice(findEndOfCategory(submission.category, false), 0, submission);
				}
			}

			exports.triviaData.submissions = [];
			writeTriviaData();
			this.modlog(`TRIVIAQUESTION`, null, `${(isAccepting ? "added" : "removed")} all from submission database.`);
			return this.privateModAction(`${user.name} ${(isAccepting ? " added " : " removed ")} all questions from the submission database.`);
		}

		if (/^\d+(?:-\d+)?(?:, ?\d+(?:-\d+)?)*$/.test(target)) {
			let indices = target.split(',');

			// Parse number ranges and add them to the list of indices,
			// then remove them in addition to entries that aren't valid index numbers
			for (let i = indices.length; i--;) {
				if (!indices[i].includes('-')) {
					const index = Number(indices[i]);
					if (Number.isInteger(index) && index > 0 && index <= submissions.length) {
						indices[i] = String(index);
					} else {
						indices.splice(i, 1);
					}
					continue;
				}

				const range = indices[i].split('-');
				const left = Number(range[0]);
				let right = Number(range[1]);
				if (!Number.isInteger(left) || !Number.isInteger(right) ||
					left < 1 || right > submissions.length || left === right) {
					indices.splice(i, 1);
					continue;
				}

				do {
					indices.push(String(right));
				} while (--right >= left);

				indices.splice(i, 1);
			}

			indices.sort((a, b) => Number(a) - Number(b));
			indices = indices.filter((entry, index) => !index || indices[index - 1] !== entry);

			const indicesLen = indices.length;
			if (!indicesLen) {
				return this.errorReply(
					this.tr`'${target}' is not a valid set of submission index numbers.\n` +
					this.tr`View /trivia review and /trivia help for more information.`
				);
			}

			if (isAccepting) {
				for (let i = indicesLen; i--;) {
					const submission = submissions.splice(Number(indices[i]) - 1, 1)[0];
					questions.splice(findEndOfCategory(submission.category, false), 0, submission);
				}
			} else {
				for (let i = indicesLen; i--;) {
					submissions.splice(Number(indices[i]) - 1, 1);
				}
			}

			writeTriviaData();
			this.modlog('TRIVIAQUESTION', null, `${(isAccepting ? "added " : "removed ")}submission number${(indicesLen > 1 ? "s " : " ")}${target}`);
			return this.privateModAction(`${user.name} ${(isAccepting ? "added " : "removed ")}submission number${(indicesLen > 1 ? "s " : " ")}${target} from the submission database.`);
		}

		this.errorReply(this.tr`'${target}' is an invalid argument. View /trivia help questions for more information.`);
	},
	accepthelp: [`/trivia accept [index1], [index2], ... [indexn] OR all - Add questions from the submission database to the question database using their index numbers or ranges of them. Requires: @ # &`],
	rejecthelp: [`/trivia reject [index1], [index2], ... [indexn] OR all - Remove questions from the submission database using their index numbers or ranges of them. Requires: @ # &`],

	delete(target, room, user) {
		room = this.requireRoom('questionworkshop' );
		this.checkCan('mute', null, room);
		this.checkChat();

		target = target.trim();
		if (!target) return false;

		const question = _utils.Utils.escapeHTML(target);
		if (!question) {
			return this.errorReply(this.tr`'${target}' is not a valid argument. View /trivia help questions for more information.`);
		}

		const questions = exports.triviaData.questions;
		const questionID = toID(question);
		for (const [i, questionObj] of questions.entries()) {
			if (toID(questionObj.question) === questionID) {
				questions.splice(i, 1);
				writeTriviaData();
				this.modlog('TRIVIAQUESTION', null, `removed '${target}'`);
				return this.privateModAction(room.tr`${user.name} removed question '${target}' from the question database.`);
			}
		}

		this.errorReply(this.tr`Question '${target}' was not found in the question database.`);
	},
	deletehelp: [`/trivia delete [question] - Delete a question from the trivia database. Requires: % @ # &`],

	move(target, room, user) {
		room = this.requireRoom('questionworkshop' );
		this.checkCan('mute', null, room);
		this.checkChat();

		target = target.trim();
		if (!target) return false;

		const params = target.split('\n').map(str => str.split('|'));
		for (const param of params) {
			if (param.length !== 2) {
				this.errorReply(this.tr`Invalid arguments specified in "${param}". View /trivia help for more information.`);
				continue;
			}

			const categoryID = toID(param[0]);
			const category = CATEGORY_ALIASES[categoryID] || categoryID;
			if (!ALL_CATEGORIES[category]) {
				this.errorReply(this.tr`'${param[0].trim()}' is not a valid category. View /trivia help for more information.`);
				continue;
			}

			const questionID = toID(_utils.Utils.escapeHTML(param[1].trim()));
			if (!questionID) {
				this.errorReply(this.tr`'${param[1].trim()}' is not a valid question.`);
				continue;
			}

			const questions = exports.triviaData.questions;

			for (const [i, question] of questions.entries()) {
				if (toID(question.question) === questionID) {
					if (question.category === category) {
						this.errorReply(this.tr`'${param[1].trim()}' is already in the category '${param[0].trim()}'.`);
						break;
					}
					questions.splice(i, 1);
					question.category = category;
					questions.splice(findEndOfCategory(category, false), 0, question);
					writeTriviaData();
					this.modlog('TRIVIAQUESTION', null, `changed category for '${param[1].trim()}' to '${param[0]}'`);
					return this.privateModAction(
						this.tr`${user.name} changed question category to '${param[0]}' for '${param[1].trim()}' ` +
						this.tr`from the question database.`
					);
				}
			}
		}
	},
	movehelp: [
		`/trivia move [category] | [question] - Change the category of question in the trivia database. Requires: % @ # &`,
	],

	qs(target, room, user) {
		room = this.requireRoom('questionworkshop' );

		let buffer = "|raw|<div class=\"ladder\" style=\"overflow-y: scroll; max-height: 300px;\"><table>";
		if (!target) {
			if (!this.runBroadcast()) return false;

			const questions = exports.triviaData.questions;
			const questionsLen = questions.length;
			if (!questionsLen) return this.sendReplyBox(this.tr`No questions have been submitted yet.`);

			let lastCategoryIdx = 0;
			buffer += `<tr><th>Category</th><th>${this.tr`Question Count`}</th></tr>`;
			for (const category in ALL_CATEGORIES) {
				if (category === 'random') continue;
				const tally = findEndOfCategory(category, false) - lastCategoryIdx;
				lastCategoryIdx += tally;
				buffer += `<tr><td>${ALL_CATEGORIES[category]}</td><td>${tally} (${((tally * 100) / questionsLen).toFixed(2)}%)</td></tr>`;
			}
			buffer += `<tr><td><strong>${this.tr`Total`}</strong></td><td><strong>${questionsLen}</strong></td></table></div>`;

			return this.sendReply(buffer);
		}

		this.checkCan('mute', null, room);

		target = toID(target);
		const category = CATEGORY_ALIASES[target] || target;
		if (category === 'random') return false;
		if (!ALL_CATEGORIES[category]) {
			return this.errorReply(this.tr`'${target}' is not a valid category. View /help trivia for more information.`);
		}

		const list = sliceCategory(category);
		if (!list.length) {
			buffer += `<tr><td>${this.tr`There are no questions in the ${ALL_CATEGORIES[category]} category.`}</td></table></div>`;
			return this.sendReply(buffer);
		}

		if (user.can('ban', null, room)) {
			const cat = ALL_CATEGORIES[category];
			buffer += `<tr><td colspan="3">${this.tr`There are <strong>${list.length}</strong> questions in the ${cat} category.`}</td></tr>` +
				`<tr><th>#</th><th>${this.tr`Question`}</th><th>${this.tr`Answer(s)`}</th></tr>`;
			for (const [i, entry] of list.entries()) {
				buffer += `<tr><td><strong>${(i + 1)}</strong></td><td>${entry.question}</td><td>${entry.answers.join(", ")}</td><tr>`;
			}
		} else {
			const cat = target;
			buffer += `<td colspan="2">${this.tr`There are <strong>${list.length}</strong> questions in the ${cat} category.`}</td></tr>` +
				`<tr><th>#</th><th>${this.tr`Question`}</th></tr>`;
			for (const [i, entry] of list.entries()) {
				buffer += `<tr><td><strong>${(i + 1)}</strong></td><td>${entry.question}</td></tr>`;
			}
		}
		buffer += "</table></div>";

		this.sendReply(buffer);
	},
	qshelp: [
		"/trivia qs - View the distribution of questions in the question database.",
		"/trivia qs [category] - View the questions in the specified category. Requires: % @ # &",
	],

	cssearch: 'search',
	casesensitivesearch: 'search',
	search(target, room, user, connection, cmd) {
		room = this.requireRoom('questionworkshop' );
		this.checkCan('show', null, room);
		if (!target.includes(',')) return this.errorReply(this.tr("No valid search arguments entered."));

		let [type, ...query] = target.split(',');
		type = toID(type);
		if (/^q(?:uestion)?s?$/.test(type)) {
			type = 'questions';
		} else if (/^sub(?:mission)?s?$/.test(type)) {
			type = 'submissions';
		} else {
			return this.sendReplyBox(
				this.tr("No valid search category was entered. Valid categories: submissions, subs, questions, qs")
			);
		}

		let queryString = query.join(',').trim();
		if (!queryString) return this.errorReply(this.tr("No valid search query was entered."));

		let transformQuestion = (question) => question;
		if (cmd === 'search') {
			queryString = queryString.toLowerCase();
			transformQuestion = (question) => question.toLowerCase();
		}
		const results = exports.triviaData[type ].filter(
			q => transformQuestion(q.question).includes(queryString) && !SPECIAL_CATEGORIES[q.category]
		);
		if (!results.length) return this.sendReply(this.tr`No results found under the ${type} list.`);

		let buffer = `|raw|<div class="ladder"><table><tr><th>#</th><th>${this.tr`Category`}</th><th>${this.tr`Question`}</th></tr>` +
			`<tr><td colspan="3">${this.tr`There are <strong>${results.length}</strong> matches for your query:`}</td></tr>`;
		buffer += results.map(
			(q, i) => this.tr`<tr><td><strong>${i + 1}</strong></td><td>${q.category}</td><td>${q.question}</td></tr>`
		).join('');
		buffer += "</table></div>";

		this.sendReply(buffer);
	},
	searchhelp: [
		`/trivia search [type], [query] - Searches for questions based on their type and their query. This command is case-insensitive. Valid types: submissions, subs, questions, qs. Requires: + % @ * &`,
		`/trivia casesensitivesearch [type], [query] - Like /trivia search, but is case sensitive (capital letters matter). Requires: + % @ * &`,
	],

	rank(target, room, user) {
		room = this.requireRoom('trivia' );

		let name;
		let userid;
		if (!target) {
			name = _utils.Utils.escapeHTML(user.name);
			userid = user.id;
		} else {
			this.splitTarget(target, true);
			name = _utils.Utils.escapeHTML(this.targetUsername);
			userid = toID(name);
		}

		const allTimeScore = exports.triviaData.leaderboard[userid];
		if (!allTimeScore) return this.sendReplyBox(this.tr`User '${name}' has not played any trivia games yet.`);
		const score = exports.triviaData.altLeaderboard[userid] || [0, 0, 0];

		const ranks = exports.cachedAltLadder.get().ranks[userid];
		const allTimeRanks = exports.cachedLadder.get().ranks[userid];
		const row = (i) => `<strong>${score[i]}</strong>${ranks ? ` (#${ranks[i]})` : ""}, ` +
			this.tr`all time:` + ` <strong>${allTimeScore[i]}</strong> (#${allTimeRanks[i]})<br />`;
		this.sendReplyBox(
			this.tr`User: <strong>${name}</strong>` + `<br />` +
			this.tr`Leaderboard score: ${row(0)}` +
			this.tr`Total game points: ${row(1)}` +
			this.tr`Total correct answers: ${row(2)}`
		);
	},
	rankhelp: [`/trivia rank [username] - View the rank of the specified user. If no name is given, view your own.`],

	alltimeladder: 'ladder',
	ladder(target, room, user, connection, cmd) {
		room = this.requireRoom('trivia' );
		if (!this.runBroadcast()) return false;
		const cache = cmd === 'ladder' ? exports.cachedAltLadder : exports.cachedLadder;
		const {ladder} = cache.get();
		const leaderboard = cache.leaderboard;
		if (!ladder.length) return this.errorReply(this.tr("No trivia games have been played yet."));

		let buffer = "|raw|<div class=\"ladder\" style=\"overflow-y: scroll; max-height: 300px;\"><table>" +
			`<tr><th>${this.tr`Rank`}</th><th>${this.tr`User`}</th><th>${this.tr`Leaderboard score`}</th><th>${this.tr`Total game points`}</th><th>${this.tr`Total correct answers`}</th></tr>`;
		let num = parseInt(target);
		if (!num || num < 0) num = 100;
		if (num > ladder.length) num = ladder.length;
		for (let i = Math.max(0, num - 100); i < num; i++) {
			const leaders = ladder[i];
			for (const leader of leaders) {
				const rank = leaderboard[leader ];
				const leaderObj = Users.getExact(leader );
				const leaderid = leaderObj ? _utils.Utils.escapeHTML(leaderObj.name) : leader ;
				buffer += `<tr><td><strong>${(i + 1)}</strong></td><td>${leaderid}</td><td>${rank[0]}</td><td>${rank[1]}</td><td>${rank[2]}</td></tr>`;
			}
		}
		buffer += "</table></div>";

		return this.sendReply(buffer);
	},
	ladderhelp: [`/trivia ladder [num] - View information about 15 users on the trivia leaderboard.`],
	alltimeladderhelp: [`/trivia ladder [num] - View information about 15 users on the all time trivia leaderboard.`],

	clearquestions: 'clearqs',
	clearqs(target, room, user) {
		room = this.requireRoom('questionworkshop' );
		this.checkCan('declare', null, room);
		target = toID(target);
		const category = CATEGORY_ALIASES[target] || target;
		if (ALL_CATEGORIES[category]) {
			if (SPECIAL_CATEGORIES[category]) {
				exports.triviaData.questions = exports.triviaData.questions.filter(q => q.category !== category);
				writeTriviaData();
				return this.privateModAction(room.tr`${user.name} removed all questions of category '${category}'.`);
			} else {
				return this.errorReply(this.tr`You cannot clear the category '${ALL_CATEGORIES[category]}'.`);
			}
		} else {
			return this.errorReply(this.tr`'${category}' is an invalid category.`);
		}
	},
	clearqshelp: [`/trivia clears [category] - Remove all questions of the given category. Requires: # &`],

	pastgames: 'history',
	history(target, room, user) {
		room = this.requireRoom('trivia' );
		if (!this.runBroadcast()) return false;
		if (!_optionalChain([exports.triviaData, 'access', _23 => _23.history, 'optionalAccess', _24 => _24.length])) return this.sendReplyBox(this.tr("There is no game history."));

		const games = [...exports.triviaData.history].reverse();
		const buf = [];
		for (const [i, game] of games.entries()) {
			let gameInfo = _utils.Utils.html`<b>${i + 1}.</b> ${this.tr`${game.mode} mode, ${game.length} length Trivia game in the ${game.category} category`}`;
			if (game.creator) gameInfo += _utils.Utils.html` ${this.tr`hosted by ${game.creator}`}`;
			gameInfo += '.';
			buf.push(gameInfo);
		}

		return this.sendReplyBox(buf.join('<br />'));
	},
	historyhelp: [`/trivia history - View a list of the 10 most recently played trivia games.`],

	removepoints: 'addpoints',
	addpoints(target, room, user, connection, cmd) {
		room = this.requireRoom('trivia' );
		this.checkCan('editroom', null, room);

		const [userid, pointString] = this.splitOne(target).map(toID);

		const points = parseInt(pointString);
		if (isNaN(points)) return this.errorReply(`You must specify a number of points to add/remove.`);
		const isRemoval = cmd === 'removepoints';

		if (!hasLeaderboardEntry(userid)) {
			return this.errorReply(`The user '${userid}' has no Trivia leaderboard entry.`);
		}

		if (userid in exports.triviaData.leaderboard) exports.triviaData.leaderboard[userid][0] += (isRemoval ? points * -1 : points);
		if (userid in exports.triviaData.altLeaderboard) exports.triviaData.altLeaderboard[userid][0] += (isRemoval ? points * -1 : points);
		writeTriviaData();
		exports.cachedLadder.invalidateCache();
		exports.cachedAltLadder.invalidateCache();

		this.modlog(`TRIVIAPOINTS ${isRemoval ? 'REMOVE' : 'ADD'}`, userid, `${points} points`);
		this.privateModAction(
			isRemoval ?
				`${user.name} removed ${points} points from ${userid}'s Trivia leaderboard score.` :
				`${user.name} added ${points} points to ${userid}'s Trivia leaderboard score.`
		);
	},
	addpointshelp: [
		`/trivia removepoints [user], [points] - Remove points from a given user's score on the Trivia leaderboard.`,
		`/trivia addpoints [user], [points] - Add points to a given user's score on the Trivia leaderboard.`,
		`Requires: # &`,
	],

	removeleaderboardentry(target, room, user) {
		room = this.requireRoom('trivia' );
		this.checkCan('editroom', null, room);

		const userid = toID(target);
		if (!userid) return this.parse('/help trivia removeleaderboardentry');
		if (hasLeaderboardEntry(userid)) {
			return this.errorReply(`The user '${userid}' has no Trivia leaderboard entry.`);
		}

		const command = `/trivia removeleaderboardentry ${userid}`;
		if (user.lastCommand !== command) {
			user.lastCommand = command;
			this.sendReply(`Are you sure you want to DELETE ALL LEADERBOARD SCORES FOR '${userid}'?`);
			this.sendReply(`If so, type ${command} to confirm.`);
			return;
		}
		user.lastCommand = '';

		if (userid in exports.triviaData.leaderboard) delete exports.triviaData.leaderboard[userid];
		if (userid in exports.triviaData.altLeaderboard) delete exports.triviaData.altLeaderboard[userid];
		writeTriviaData();
		exports.cachedLadder.invalidateCache();
		exports.cachedAltLadder.invalidateCache();

		this.modlog(`TRIVIAPOINTS DELETE`, userid);
		this.privateModAction(`${user.name} removed ${userid}'s Trivia leaderboard entries.`);
	},
	removeleaderboardentryhelp: [
		`/trivia removeleaderboardentry [user] — Remove all leaderboard entries for a user. Requires: # &`,
	],

	mergealt: 'mergescore',
	mergescores: 'mergescore',
	mergescore(target, room, user) {
		const altid = toID(target);
		if (!altid) return this.parse('/help trivia mergescore');

		try {
			mergeAlts(user.id, altid);
			return this.sendReply(`Your Trivia leaderboard score has been transferred to '${altid}'!`);
		} catch (err) {
			if (!err.message.includes('/trivia mergescore')) throw err;

			requestAltMerge(altid, user.id);
			return this.sendReply(
				`A Trivia leaderboard score merge with ${altid} is now pending! ` +
				`To complete the merge, log in on the account '${altid}' and type /trivia mergescore ${user.id}`
			);
		}
	},
	mergescorehelp: [
		`/trivia mergescore [user] — Merge another user's Trivia leaderboard score with yours.`,
	],

	help(target, room, user) {
		return this.parse(`${this.cmdToken}help trivia`);
	},
	triviahelp() {
		this.sendReply(
			`|html|<div class="infobox">` +
			`<strong>Categories</strong>: <code>Arts &amp; Entertainment</code>, <code>Pok&eacute;mon</code>, <code>Science &amp; Geography</code>, <code>Society &amp; Humanities</code>, <code>Random</code>, and <code>All</code>.<br />` +
			`<details><summary><strong>Modes</strong></summary><ul>` +
				`<li>First: the first correct responder gains 5 points.</li>` +
				`<li>Timer: each correct responder gains up to 5 points based on how quickly they answer.</li>` +
				`<li>Number: each correct responder gains up to 5 points based on how many participants are correct.</li>` +
				`<li>Triumvirate: The first correct responder gains 5 points, the second 3 points, and the third 1 point.</li>` +
				`<li>Random: randomly chooses one of First, Timer, Number, or Triumvirate.</li>` +
			`</ul></details>` +
			`<details><summary><strong>Game lengths</strong></summary><ul>` +
				`<li>Short: 20 point score cap. The winner gains 3 leaderboard points.</li>` +
				`<li>Medium: 35 point score cap. The winner gains 4 leaderboard points.</li>` +
				`<li>Long: 50 point score cap. The winner gains 5 leaderboard points.</li>` +
				`<li>Infinite: No score cap. The winner gains 5 leaderboard points, which increases the more questions they answer.</li>` +
			`</ul></details>` +
			`<details><summary><strong>Game commands</strong></summary><ul>` +
				`<li><code>/trivia new [mode], [category], [length]</code> - Begin signups for a new Trivia game. Requires: + % @ # &</li>` +
				`<li><code>/trivia sortednew [mode], [category], [length]</code> — Begin a new Trivia game in which the question order is not randomized. Requires: + % @ # &</li>` +
				`<li><code>/trivia join</code> - Join a game of Trivia or Mastermind during signups.</li>` +
				`<li><code>/trivia start</code> - Begin the game once enough users have signed up. Requires: + % @ # &</li>` +
				`<li><code>/ta [answer]</code> - Answer the current question.</li>` +
				`<li><code>/trivia kick [username]</code> - Disqualify a participant from the current trivia game. Requires: % @ # &</li>` +
				`<li><code>/trivia leave</code> - Makes the player leave the game.</li>` +
				`<li><code>/trivia end</code> - End a trivia game. Requires: + % @ # &</li>` +
				`<li><code>/trivia win</code> - End a trivia game and tally the points to find winners. Requires: + % @ # & in Infinite length, else # &</li>` +
				`<li><code>/trivia pause</code> - Pauses a trivia game. Requires: + % @ # &</li>` +
				`<li><code>/trivia resume</code> - Resumes a paused trivia game. Requires: + % @ # &</li>` +
			`</ul></details>` +
				`<details><summary><strong>Question-modifying commands</strong></summary><ul>` +
				`<li><code>/trivia submit [category] | [question] | [answer1], [answer2] ... [answern]</code> - Adds question(s) to the submission database for staff to review. Requires: + % @ # &</li>` +
				`<li><code>/trivia review</code> - View the list of submitted questions. Requires: @ # &</li>` +
				`<li><code>/trivia accept [index1], [index2], ... [indexn] OR all</code> - Add questions from the submission database to the question database using their index numbers or ranges of them. Requires: @ # &</li>` +
				`<li><code>/trivia reject [index1], [index2], ... [indexn] OR all</code> - Remove questions from the submission database using their index numbers or ranges of them. Requires: @ # &</li>` +
				`<li><code>/trivia add [category] | [question] | [answer1], [answer2], ... [answern]</code> - Adds question(s) to the question database. Requires: % @ # &</li>` +
				`<li><code>/trivia delete [question]</code> - Delete a question from the trivia database. Requires: % @ # &</li>` +
				`<li><code>/trivia move [category] | [question]</code> - Change the category of question in the trivia database. Requires: % @ # &</li>` +
				`<li><code>/trivia qs</code> - View the distribution of questions in the question database.</li>` +
				`<li><code>/trivia qs [category]</code> - View the questions in the specified category. Requires: % @ # &</li>` +
				`<li><code>/trivia clearqs [category]</code> - Clear all questions in the given category. Requires: # &</li>` +
			`</ul></details>` +
			`<details><summary><strong>Informational commands</strong></summary><ul>` +
				`<li><code>/trivia search [type], [query]</code> - Searches for questions based on their type and their query. Valid types: <code>submissions</code>, <code>subs</code>, <code>questions</code>, <code>qs</code>. Requires: + % @ # &</li>` +
				`<li><code>/trivia casesensitivesearch [type], [query]</code> - Like <code>/trivia search</code>, but is case sensitive (i.e., capitalization matters). Requires: + % @ * &</li>` +
				`<li><code>/trivia status [player]</code> - lists the player's standings (your own if no player is specified) and the list of players in the current trivia game.</li>` +
				`<li><code>/trivia rank [username]</code> - View the rank of the specified user. If none is given, view your own.</li>` +
				`<li><code>/trivia history</code> - View a list of the 10 most recently played trivia games.</li>` +
			`</ul></details>` +
			`<details><summary><strong>Leaderboard commands</strong></summary><ul>` +
				`<li><code>/trivia ladder</code> - View information about the top 15 users on the Trivia leaderboard.</li>` +
				`<li><code>/trivia alltimeladder</code> - View information about the top 15 users on the all time Trivia leaderboard.</li>` +
				`<li><code>/trivia mergescore [user]</code> — Merge another user's Trivia leaderboard score with yours.</li>` +
				`<li><code>/trivia addpoints [user], [points]</code> - Add points to a given user's score on the Trivia leaderboard. Requires: # &</li>` +
				`<li><code>/trivia removepoints [user], [points]</code> - Remove points from a given user's score on the Trivia leaderboard. Requires: # &</li>` +
				`<li><code>/trivia removeleaderboardentry [user]</code> — Remove all Trivia leaderboard entries for a user. Requires: # &</li>` +

			`</ul></details>`
		);
	},
};


const mastermindCommands = {
	answer: triviaCommands.answer,
	end: triviaCommands.end,

	new(target, room, user) {
		room = this.requireRoom('trivia' );
		this.checkCan('show', null, room);

		const finalists = parseInt(target);
		if (isNaN(finalists) || finalists < 2) {
			return this.errorReply(this.tr`You must specify a number that is at least 2 for finalists.`);
		}

		room.game = new Mastermind(room, finalists);
	},
	newhelp: [
		`/mastermind new [number of finalists] — Starts a new game of Mastermind with the specified number of finalists. Requires: + % @ # &`,
	],

	start(target, room, user) {
		room = this.requireRoom();
		this.checkCan('show', null, room);
		this.checkChat();
		const game = getMastermindGame(room);

		const [category, timeoutString, player] = target.split(',').map(toID);
		if (!player) return this.parse(`/help mastermind start`);
		if (!(category in ALL_CATEGORIES)) {
			return this.errorReply(this.tr`${category} is not a valid category.`);
		}
		const categoryName = ALL_CATEGORIES[CATEGORY_ALIASES[category] || category];
		const timeout = parseInt(timeoutString);
		if (isNaN(timeout) || timeout < 1 || (timeout * 1000) > Chat.MAX_TIMEOUT_DURATION) {
			return this.errorReply(this.tr`You must specify a round length of at least 1 second.`);
		}

		const questions = _utils.Utils.shuffle(getQuestions(category));
		if (!questions.length) {
			return this.errorReply(this.tr`There are no questions in the ${categoryName} category.`);
		}

		game.startRound(player, category, questions, timeout);
	},
	starthelp: [
		`/mastermind start [category], [length in seconds], [player] — Starts a round of Mastermind for a player. Requires: + % @ # &`,
	],

	finals(target, room, user) {
		room = this.requireRoom();
		this.checkCan('show', null, room);
		this.checkChat();
		const game = getMastermindGame(room);
		if (!target) return this.parse(`/help mastermind finals`);

		const timeout = parseInt(target);
		if (isNaN(timeout) || timeout < 1 || (timeout * 1000) > Chat.MAX_TIMEOUT_DURATION) {
			return this.errorReply(this.tr`You must specify a length of at least 1 second.`);
		}

		game.startFinals(timeout);
	},
	finalshelp: [`/mastermind finals [length in seconds] — Starts the Mastermind finals. Requires: + % @ # &`],

	join(target, room, user) {
		room = this.requireRoom();
		getMastermindGame(room).addTriviaPlayer(user);
		this.sendReply(this.tr('You are now signed up for this game!'));
	},
	joinhelp: [`/mastermind join — Joins the current game of Mastermind.`],


	leave(target, room, user) {
		getMastermindGame(room).leave(user);
		this.sendReply(this.tr("You have left the current game of Mastermind."));
	},
	leavehelp: [`/mastermind leave - Makes the player leave the game.`],

	pass(target, room, user) {
		room = this.requireRoom();
		const round = getMastermindGame(room).currentRound;
		if (!round) return this.errorReply(this.tr`No round of Mastermind is currently being played.`);
		if (!(user.id in round.playerTable)) {
			return this.errorReply(this.tr`You are not a player in the current round of Mastermind.`);
		}
		round.pass();
	},
	passhelp: [`/mastermind pass — Passes on the current question. Must be the player of the current round of Mastermind.`],

	'': 'players',
	players(target, room, user) {
		room = this.requireRoom();
		if (!this.runBroadcast()) return false;
		const game = getMastermindGame(room);

		let buf = this.tr`There is a Mastermind game in progress, and it is in its ${game.phase} phase.`;
		buf += `<br /><hr>${this.tr`Players`}: ${game.formatPlayerList()}`;

		this.sendReplyBox(buf);
	},

	help() {
		return this.parse(`${this.cmdToken}help mastermind`);
	},

	mastermindhelp() {
		if (!this.runBroadcast()) return;
		const commandHelp = [
			`<code>/mastermind new [number of finalists]</code>: starts a new game of Mastermind with the specified number of finalists. Requires: + % @ # &`,
			`<code>/mastermind start [category], [length in seconds], [player]</code>: starts a round of Mastermind for a player. Requires: + % @ # &`,
			`<code>/mastermind finals [length in seconds]</code>: starts the Mastermind finals. Requires: + % @ # &`,
			`<code>/mastermind join</code>: joins the current game of Mastermind.`,
			`<code>/mastermind answer [answer]</code>: answers a question in a round of Mastermind.`,
			`<code>/mastermind pass</code>: passes on the current question. Must be the player of the current round of Mastermind.`,
		];
		return this.sendReplyBox(
			`<strong>Mastermind</strong> is a game in which each player tries to score as many points as possible in a timed round where only they can answer, ` +
			`and the top X players advance to the finals, which is a timed game of Trivia in which only the first player to answer a question recieves points.` +
			`<details><summary><strong>Commands</strong></summary>${commandHelp.join('<br />')}</details>`
		);
	},
};

 const commands = {
	mm: mastermindCommands,
	mastermind: mastermindCommands,
	mastermindhelp: mastermindCommands.mastermindhelp,
	trivia: triviaCommands,
	ta: triviaCommands.answer,
	triviahelp: triviaCommands.triviahelp,
}; exports.commands = commands;

process.nextTick(() => {
	Chat.multiLinePattern.register('/trivia add ', '/trivia submit ');
});
