"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Room Battle
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This file wraps the simulator in an implementation of the RoomGame
 * interface. It also abstracts away the multi-process nature of the
 * simulator.
 *
 * For the actual battle simulation, see sim/
 *
 * @license MIT
 */

var _child_process = require('child_process');
var _fs = require('../.lib-dist/fs');
var _utils = require('../.lib-dist/utils');
var _processmanager = require('../.lib-dist/process-manager');
var _repl = require('../.lib-dist/repl');
var _battlestream = require('../.sim-dist/battle-stream');
var _roomgame = require('./room-game'); var RoomGames = _roomgame;

















/** 5 seconds */
const TICK_TIME = 5;
const SECONDS = 1000;

// Timer constants: In seconds, should be multiple of TICK_TIME
const STARTING_TIME = 150;
const MAX_TURN_TIME = 150;
const STARTING_TIME_CHALLENGE = 300;
const STARTING_GRACE_TIME = 60;
const MAX_TURN_TIME_CHALLENGE = 300;

const DISCONNECTION_TIME = 60;
const DISCONNECTION_BANK_TIME = 300;

// time after a player disabling the timer before they can re-enable it
const TIMER_COOLDOWN = 20 * SECONDS;

 class RoomBattlePlayer extends RoomGames.RoomGamePlayer {
	
	
	
	
	
	
	/**
	 * Total timer.
	 *
	 * Starts at 210 per player in a ladder battle. Goes down by 5
	 * every tick. Goes up by 10 every turn (with some complications -
	 * see `nextRequest`), capped at starting time. The player loses if
	 * this reaches 0.
	 *
	 * The equivalent of "Your Time" in VGC.
	 *
	 */
	
	/**
	 * Turn timer.
	 *
	 * Set equal to the player's overall timer, but capped at 150
	 * seconds in a ladder battle. Goes down by 5 every tick.
	 * Tracked separately from the overall timer, and the player also
	 * loses if this reaches 0.
	 */
	
	/**
	 * Disconnect timer.
	 * Starts at 60 seconds. While the player is disconnected, this
	 * will go down by 5 every tick. Tracked separately from the
	 * overall timer, and the player also loses if this reaches 0.
	 *
	 * Mostly exists so impatient players don't have to wait the full
	 * 150 seconds against a disconnected opponent.
 	*/
	
	/**
	 * Used to track a user's last known connection status, and display
	 * the proper message when it changes.
	 */
	
	constructor(user, game, num) {
		super(user, game, num);
		if (typeof user === 'string') user = null;

		this.slot = `p${num}` ;
		this.channelIndex = (game.gameType === 'multi' && num > 2 ? num - 2 : num) ;

		this.request = {rqid: 0, request: '', isWait: 'cantUndo', choice: ''};
		this.wantsTie = false;
		this.active = true;
		this.eliminated = false;

		this.secondsLeft = 1;
		this.turnSecondsLeft = 1;
		this.dcSecondsLeft = 1;

		this.connected = true;

		if (user) {
			user.games.add(this.game.roomid);
			user.updateSearch();
			for (const connection of user.connections) {
				if (connection.inRooms.has(game.roomid)) {
					Sockets.channelMove(connection.worker, this.game.roomid, this.channelIndex, connection.socketid);
				}
			}
		}
	}
	getUser() {
		return (this.id && Users.get(this.id)) || null;
	}
	unlinkUser() {
		const user = this.getUser();
		if (user) {
			for (const connection of user.connections) {
				Sockets.channelMove(connection.worker, this.game.roomid, 0, connection.socketid);
			}
			user.games.delete(this.game.roomid);
			user.updateSearch();
		}
		this.id = '';
		this.connected = false;
		this.active = false;
	}
	updateChannel(user) {
		if (user instanceof Users.Connection) {
			// "user" is actually a connection
			Sockets.channelMove(user.worker, this.game.roomid, this.channelIndex, user.socketid);
			return;
		}
		for (const connection of user.connections) {
			Sockets.channelMove(connection.worker, this.game.roomid, this.channelIndex, connection.socketid);
		}
	}

	toString() {
		return this.id;
	}
	send(data) {
		const user = this.getUser();
		if (user) user.send(data);
	}
	sendRoom(data) {
		const user = this.getUser();
		if (user) user.sendTo(this.game.roomid, data);
	}
} exports.RoomBattlePlayer = RoomBattlePlayer;

 class RoomBattleTimer {
	
	
	
	
	/**
	 * Last tick, as milliseconds since UNIX epoch.
	 * Represents the last time a tick happened.
	 */
	
	/** Debug mode; true to output detailed timer info every tick */
	
	
	
	
	constructor(battle) {
		this.battle = battle;

		this.timer = null;
		this.timerRequesters = new Set();
		this.isFirstTurn = true;

		this.lastTick = 0;

		this.debug = false;

		this.lastDisabledTime = 0;
		this.lastDisabledByUser = null;

		const hasLongTurns = Dex.getFormat(battle.format, true).gameType !== 'singles';
		const isChallenge = (!battle.rated && !battle.room.tour);
		const timerEntry = Dex.getRuleTable(Dex.getFormat(battle.format, true)).timer;
		const timerSettings = _optionalChain([timerEntry, 'optionalAccess', _ => _[0]]);

		// so that Object.assign doesn't overwrite anything with `undefined`
		for (const k in timerSettings) {
			// @ts-ignore
			if (timerSettings[k] === undefined) delete timerSettings[k];
		}

		this.settings = {
			dcTimer: !isChallenge,
			dcTimerBank: isChallenge,
			starting: isChallenge ? STARTING_TIME_CHALLENGE : STARTING_TIME,
			grace: STARTING_GRACE_TIME,
			addPerTurn: hasLongTurns ? 25 : 10,
			maxPerTurn: isChallenge ? MAX_TURN_TIME_CHALLENGE : MAX_TURN_TIME,
			maxFirstTurn: isChallenge ? MAX_TURN_TIME_CHALLENGE : MAX_TURN_TIME,
			timeoutAutoChoose: false,
			accelerate: !timerSettings,
			...timerSettings,
		};
		if (this.settings.maxPerTurn <= 0) this.settings.maxPerTurn = Infinity;

		for (const player of this.battle.players) {
			player.secondsLeft = this.settings.starting + this.settings.grace;
			player.turnSecondsLeft = -1;
			player.dcSecondsLeft = this.settings.dcTimerBank ? DISCONNECTION_BANK_TIME : DISCONNECTION_TIME;
		}
	}
	start(requester) {
		const userid = requester ? requester.id : 'staff' ;
		if (this.timerRequesters.has(userid)) return false;
		if (this.timer) {
			this.battle.room.add(`|inactive|${requester ? requester.name : userid} also wants the timer to be on.`).update();
			this.timerRequesters.add(userid);
			return false;
		}
		if (requester && this.battle.playerTable[requester.id] && this.lastDisabledByUser === requester.id) {
			const remainingCooldownMs = (this.lastDisabledTime || 0) + TIMER_COOLDOWN - Date.now();
			if (remainingCooldownMs > 0) {
				this.battle.playerTable[requester.id].sendRoom(
					`|inactiveoff|The timer can't be re-enabled so soon after disabling it (${Math.ceil(remainingCooldownMs / SECONDS)} seconds remaining).`
				);
				return false;
			}
		}
		this.timerRequesters.add(userid);
		const requestedBy = requester ? ` (requested by ${requester.name})` : ``;
		this.battle.room.add(`|inactive|Battle timer is ON: inactive players will automatically lose when time's up.${requestedBy}`).update();

		this.nextRequest();
		return true;
	}
	stop(requester) {
		if (requester) {
			if (!this.timerRequesters.has(requester.id)) return false;
			this.timerRequesters.delete(requester.id);
			this.lastDisabledByUser = requester.id;
			this.lastDisabledTime = Date.now();
		} else {
			this.timerRequesters.clear();
		}
		if (this.timerRequesters.size) {
			this.battle.room.add(`|inactive|${requester.name} no longer wants the timer on, but the timer is staying on because ${[...this.timerRequesters].join(', ')} still does.`).update();
			return false;
		}
		if (this.end()) {
			this.battle.room.add(`|inactiveoff|Battle timer is now OFF.`).update();
			return true;
		}
		return false;
	}
	end() {
		this.timerRequesters.clear();
		if (!this.timer) return false;
		clearTimeout(this.timer);
		this.timer = null;
		return true;
	}
	nextRequest() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
		if (!this.timerRequesters.size) return;
		const players = this.battle.players;
		if (players.some(player => player.secondsLeft <= 0)) return;

		/** false = U-turn or single faint, true = "new turn" */
		let isFull = true;
		let isEmpty = true;
		for (const player of players) {
			if (player.request.isWait) isFull = false;
			if (player.request.isWait !== 'cantUndo') isEmpty = false;
		}
		if (isEmpty) {
			// there are no active requests
			return;
		}
		const isFirst = this.isFirstTurn;
		this.isFirstTurn = false;

		const maxTurnTime = (isFirst ? this.settings.maxFirstTurn : 0) || this.settings.maxPerTurn;

		let addPerTurn = isFirst ? 0 : this.settings.addPerTurn;
		if (this.settings.accelerate && addPerTurn) {
			// after turn 100ish: 15s/turn -> 10s/turn
			if (this.battle.requestCount > 200 && addPerTurn > TICK_TIME) {
				addPerTurn -= TICK_TIME;
			}
			// after turn 200ish: 10s/turn -> 7s/turn
			if (this.battle.requestCount > 400 && Math.floor(this.battle.requestCount / 2) % 2) {
				addPerTurn = 0;
			}
		}

		if (!isFull && addPerTurn > TICK_TIME) {
			addPerTurn = TICK_TIME;
		}

		const room = this.battle.room;
		for (const player of players) {
			if (!isFirst) {
				player.secondsLeft = Math.min(player.secondsLeft + addPerTurn, this.settings.starting);
			}
			player.turnSecondsLeft = Math.min(player.secondsLeft, maxTurnTime);

			const secondsLeft = player.turnSecondsLeft;
			let grace = player.secondsLeft - this.settings.starting;
			if (grace < 0) grace = 0;
			if (player) {
				player.sendRoom(`|inactive|Time left: ${secondsLeft} sec this turn | ${player.secondsLeft - grace} sec total` + (grace ? ` | ${grace} sec grace` : ``));
			}
			if (secondsLeft <= 30 && secondsLeft < this.settings.starting) {
				room.add(`|inactive|${player.name} has ${secondsLeft} seconds left this turn.`);
			}
			if (this.debug) {
				room.add(`||${player.name} | Time left: ${secondsLeft} sec this turn | ${player.secondsLeft} sec total | +${addPerTurn} seconds`);
			}
		}
		room.update();
		this.lastTick = Date.now();
		this.timer = setTimeout(() => this.nextTick(), TICK_TIME * SECONDS);
	}
	nextTick() {
		if (this.timer) clearTimeout(this.timer);
		if (this.battle.ended) return;
		const room = this.battle.room;
		for (const player of this.battle.players) {
			if (player.request.isWait) continue;
			if (player.connected) {
				player.secondsLeft -= TICK_TIME;
				player.turnSecondsLeft -= TICK_TIME;
			} else {
				player.dcSecondsLeft -= TICK_TIME;
				if (!this.settings.dcTimerBank) {
					player.secondsLeft -= TICK_TIME;
					player.turnSecondsLeft -= TICK_TIME;
				}
			}

			const dcSecondsLeft = player.dcSecondsLeft;
			if (dcSecondsLeft <= 0) player.turnSecondsLeft = 0;
			const secondsLeft = player.turnSecondsLeft;
			if (!secondsLeft) continue;

			if (!player.connected && (dcSecondsLeft <= secondsLeft || this.settings.dcTimerBank)) {
				// dc timer is shown only if it's lower than turn timer or you're in timer bank mode
				if (dcSecondsLeft % 30 === 0 || dcSecondsLeft <= 20) {
					room.add(`|inactive|${player.name} has ${dcSecondsLeft} seconds to reconnect!`);
				}
			} else {
				// regular turn timer shown
				if (secondsLeft % 30 === 0 || secondsLeft <= 20) {
					room.add(`|inactive|${player.name} has ${secondsLeft} seconds left.`);
				}
			}
			if (this.debug) {
				room.add(`||[${player.name} has ${player.turnSecondsLeft}s this turn / ${player.secondsLeft}s total]`);
			}
		}
		room.update();
		if (!this.checkTimeout()) {
			this.timer = setTimeout(() => this.nextTick(), TICK_TIME * 1000);
		}
	}
	checkActivity() {
		if (this.battle.ended) return;
		for (const player of this.battle.players) {
			const isConnected = !!_optionalChain([player, 'optionalAccess', _2 => _2.active]);

			if (isConnected === player.connected) continue;

			if (!isConnected) {
				// player has disconnected
				player.connected = false;
				if (!this.settings.dcTimerBank) {
					// don't wait longer than 6 ticks (1 minute)
					if (this.settings.dcTimer) {
						player.dcSecondsLeft = DISCONNECTION_TIME;
					} else {
						// arbitrary large number
						player.dcSecondsLeft = DISCONNECTION_TIME * 10;
					}
				}

				if (this.timerRequesters.size) {
					let msg = `!`;

					if (this.settings.dcTimer) {
						msg = ` and has a minute to reconnect!`;
					}
					if (this.settings.dcTimerBank) {
						if (player.dcSecondsLeft > 0) {
							msg = ` and has ${player.dcSecondsLeft} seconds to reconnect!`;
						} else {
							msg = ` and has no disconnection time left!`;
						}
					}
					this.battle.room.add(`|inactive|${player.name} disconnected${msg}`).update();
				}
			} else {
				// player has reconnected
				player.connected = true;
				if (this.timerRequesters.size) {
					let timeLeft = ``;
					if (!player.request.isWait) {
						timeLeft = ` and has ${player.turnSecondsLeft} seconds left`;
					}
					this.battle.room.add(`|inactive|${player.name} reconnected${timeLeft}.`).update();
				}
			}
		}
	}
	checkTimeout() {
		const players = this.battle.players;
		if (players.every(player => player.turnSecondsLeft <= 0)) {
			if (!this.settings.timeoutAutoChoose || players.every(player => player.secondsLeft <= 0)) {
				this.battle.room.add(`|-message|All players are inactive.`).update();
				this.battle.tie();
				return true;
			}
		}
		let didSomething = false;
		for (const player of players) {
			if (player.turnSecondsLeft > 0) continue;
			if (this.settings.timeoutAutoChoose && player.secondsLeft > 0 && player.connected) {
				void this.battle.stream.write(`>${player.slot} default`);
				didSomething = true;
			} else {
				this.battle.forfeitPlayer(player, ' lost due to inactivity.');
				return true;
			}
		}
		return didSomething;
	}
} exports.RoomBattleTimer = RoomBattleTimer;

 class RoomBattle extends RoomGames.RoomGame {
	
	
	
	
	
	/** Will exist even if the game is unrated, in case it's later forced to be rated */
	
	
	
	/**
	 * The lower player's rating, for searching purposes.
	 * 0 for unrated battles. 1 for unknown ratings.
	 */
	
	/**
	 * userid that requested extraction -> playerids that accepted the extraction
	 */
	
	
	
	
	
	
	
	
	__init() {this.forcePublic = null}
	
	
	
	
	
	
	
	
	
	/**
	 * If the battle is ended: an array of the number of Pokemon left for each side.
	 */
	
	
	
	
	
	
	constructor(room, formatid, options) {
		super(room);RoomBattle.prototype.__init.call(this);;
		const format = Dex.getFormat(formatid, true);
		this.gameid = 'battle' ;
		this.room = room;
		this.title = format.name;
		if (!this.title.endsWith(" Battle")) this.title += " Battle";
		this.allowRenames = options.allowRenames !== undefined ? !!options.allowRenames : (!options.rated && !options.tour);

		this.format = formatid;
		this.gameType = format.gameType;
		this.challengeType = options.challengeType;
		this.rated = options.rated || 0;
		this.ladder = typeof format.rated === 'string' ? toID(format.rated) : formatid;
		// true when onCreateBattleRoom has been called
		this.missingBattleStartMessage = !!options.inputLog;
		this.started = false;
		this.ended = false;
		this.active = false;
		this.replaySaved = false;

		// TypeScript bug: no `T extends RoomGamePlayer`
		this.playerTable = Object.create(null);
		// TypeScript bug: no `T extends RoomGamePlayer`
		this.players = [];

		this.playerCap = this.gameType === 'multi' || this.gameType === 'free-for-all' ? 4 : 2;
		this.p1 = null;
		this.p2 = null;
		this.p3 = null;
		this.p4 = null;
		this.inviteOnlySetter = null;

		// data to be logged
		this.allowExtraction = {};

		this.logData = null;
		this.endType = 'normal';
		this.score = null;
		this.inputLog = null;
		this.turn = 0;

		this.rqid = 1;
		this.requestCount = 0;

		this.stream = exports.PM.createStream();

		let ratedMessage = '';
		if (options.ratedMessage) {
			ratedMessage = options.ratedMessage;
		}
		if (this.rated) {
			ratedMessage = 'Rated battle';
		} else if (this.room.tour) {
			ratedMessage = 'Tournament battle';
		}

		this.room.battle = this;

		const battleOptions = {
			formatid: this.format,
			roomid: this.roomid,
			rated: ratedMessage,
			seed: options.seed,
		};
		if (options.inputLog) {
			void this.stream.write(options.inputLog);
		} else {
			void this.stream.write(`>start ` + JSON.stringify(battleOptions));
		}

		void this.listen();

		this.addPlayer(options.p1, options.p1team || '', options.p1rating);
		this.addPlayer(options.p2, options.p2team || '', options.p2rating);
		if (this.playerCap > 2) {
			this.addPlayer(options.p3, options.p3team || '', options.p3rating);
			this.addPlayer(options.p4, options.p4team || '', options.p4rating);
		}
		this.timer = new RoomBattleTimer(this);
		if (Config.forcetimer || this.format.includes('blitz')) this.timer.start();
		this.start();
	}

	checkActive() {
		let active = true;
		if (this.ended || !this.started) {
			active = false;
		} else if (!this.p1 || !this.p1.active) {
			active = false;
		} else if (!this.p2 || !this.p2.active) {
			active = false;
		} else if (this.playerCap > 2) {
			if (!this.p3 || !this.p3.active) {
				active = false;
			} else if (!this.p4 || !this.p4.active) {
				active = false;
			}
		}
		Rooms.global.battleCount += (active ? 1 : 0) - (this.active ? 1 : 0);
		this.room.active = active;
		this.active = active;
		if (Rooms.global.battleCount === 0) Rooms.global.automaticKillRequest();
	}
	choose(user, data) {
		const player = this.playerTable[user.id];
		const [choice, rqid] = data.split('|', 2);
		if (!player) return;
		const request = player.request;
		if (request.isWait !== false && request.isWait !== true) {
			player.sendRoom(`|error|[Invalid choice] There's nothing to choose`);
			return;
		}
		const allPlayersWait = this.players.every(p => !!p.request.isWait);
		if (allPlayersWait || // too late
			(rqid && rqid !== '' + request.rqid)) { // WAY too late
			player.sendRoom(`|error|[Invalid choice] Sorry, too late to make a different move; the next turn has already started`);
			return;
		}
		request.isWait = true;
		request.choice = choice;

		void this.stream.write(`>${player.slot} ${choice}`);
	}
	undo(user, data) {
		const player = this.playerTable[user.id];
		const [, rqid] = data.split('|', 2);
		if (!player) return;
		const request = player.request;
		if (request.isWait !== true) {
			player.sendRoom(`|error|[Invalid choice] There's nothing to cancel`);
			return;
		}
		const allPlayersWait = this.players.every(p => !!p.request.isWait);
		if (allPlayersWait || // too late
			(rqid && rqid !== '' + request.rqid)) { // WAY too late
			player.sendRoom(`|error|[Invalid choice] Sorry, too late to cancel; the next turn has already started`);
			return;
		}
		request.isWait = false;

		void this.stream.write(`>${player.slot} undo`);
	}
	joinGame(user, slot) {
		if (!user.can('joinbattle', null, this.room)) {
			user.popup(`You must be a set as a player to join a battle you didn't start. Ask a player to use /addplayer on you to join this battle.`);
			return false;
		}

		if (user.id in this.playerTable) {
			user.popup(`You have already joined this battle.`);
			return false;
		}

		const validSlots = [];
		for (const player of this.players) {
			if (!player.id) validSlots.push(player.slot);
		}

		if (slot && !validSlots.includes(slot)) {
			user.popup(`This battle already has a user in slot ${slot}.`);
			return false;
		}

		if (!validSlots.length) {
			user.popup(`This battle already has two players.`);
			return false;
		}

		if (!slot && validSlots.length > 1) {
			user.popup(`Which slot would you like to join into? Use something like \`/joingame ${validSlots[0]}\``);
			return false;
		}

		if (!slot) slot = validSlots[0];

		this.updatePlayer(this[slot], user);
		if (validSlots.length - 1 < 1 && this.missingBattleStartMessage) {
			const users = this.players.map(player => {
				const u = player.getUser();
				if (!u) throw new Error(`User ${player.name} not found on ${this.roomid} battle creation`);
				return u;
			});
			Rooms.global.onCreateBattleRoom(users, this.room, {rated: this.rated});
			this.missingBattleStartMessage = false;
		}
		if (user.inRooms.has(this.roomid)) this.onConnect(user);
		this.room.update();
		return true;
	}
	leaveGame(user) {
		if (!user) return false; // ...
		if (this.room.rated || this.room.tour) {
			user.popup(`Players can't be swapped out in a ${this.room.tour ? "tournament" : "rated"} battle.`);
			return false;
		}
		const player = this.playerTable[user.id];
		if (!player) {
			user.popup(`Failed to leave battle - you're not a player.`);
			return false;
		}

		this.updatePlayer(player, null);
		this.room.auth.set(user.id, '+');
		this.room.update();
		return true;
	}

	async listen() {
		let disconnected = false;
		try {
			for await (const next of this.stream) {
				this.receive(next.split('\n'));
			}
		} catch (err) {
			// Disconnected processes are already crashlogged when they happen;
			// also logging every battle room would overwhelm the crashlogger
			if (err.message.includes('Process disconnected')) {
				disconnected = true;
			} else {
				Monitor.crashlog(err, 'A sim stream');
			}
		}
		if (!this.ended) {
			this.room.add(`|bigerror|The simulator process crashed. We've been notified and will fix this ASAP.`);
			if (!disconnected) Monitor.crashlog(new Error(`Sim stream interrupted`), `A sim stream`);
			this.started = true;
			this.ended = true;
			this.checkActive();
		}
	}
	receive(lines) {
		for (const player of this.players) player.wantsTie = false;

		switch (lines[0]) {
		case 'requesteddata':
			lines = lines.slice(1);
			const [resolver] = this.dataResolvers.shift();
			resolver(lines);
			break;

		case 'update':
			for (const line of lines.slice(1)) {
				if (line.startsWith('|turn|')) {
					this.turn = parseInt(line.slice(6));
				}
				this.room.add(line);
				if (line.startsWith(`|bigerror|You will auto-tie if `)) {
					if (Config.allowrequestingties) this.room.add(`|-hint|If you want to tie earlier, consider using \`/offertie\`.`);
				}
			}
			this.room.update();
			if (!this.ended) this.timer.nextRequest();
			this.checkActive();
			break;

		case 'sideupdate': {
			const slot = lines[1] ;
			const player = this[slot];
			if (lines[2].startsWith(`|error|[Invalid choice] Can't do anything`)) {
				// ... should not happen
			} else if (lines[2].startsWith(`|error|[Invalid choice]`)) {
				const request = this[slot].request;
				request.isWait = false;
				request.choice = '';
			} else if (lines[2].startsWith(`|request|`)) {
				this.rqid++;
				const request = JSON.parse(lines[2].slice(9));
				request.rqid = this.rqid;
				const requestJSON = JSON.stringify(request);
				this[slot].request = {
					rqid: this.rqid,
					request: requestJSON,
					isWait: request.wait ? 'cantUndo' : false,
					choice: '',
				};
				this.requestCount++;
				if (player) player.sendRoom(`|request|${requestJSON}`);
				break;
			}
			if (player) player.sendRoom(lines[2]);
			break;
		}

		case 'end':
			this.logData = JSON.parse(lines[1]);
			this.score = this.logData.score;
			this.inputLog = this.logData.inputLog;
			this.started = true;
			if (!this.ended) {
				this.ended = true;
				void this.onEnd(this.logData.winner);
				this.clearPlayers();
			}
			this.checkActive();
			break;
		}
	}
	async onEnd(winner) {
		this.timer.end();
		// Declare variables here in case we need them for non-rated battles logging.
		let p1score = 0.5;
		const winnerid = toID(winner);

		// Check if the battle was rated to update the ladder, return its response, and log the battle.
		const p1name = this.p1.name;
		const p2name = this.p2.name;
		const p1id = toID(p1name);
		const p2id = toID(p2name);
		if (this.room.rated) {
			this.room.rated = 0;

			if (winnerid === p1id) {
				p1score = 1;
			} else if (winnerid === p2id) {
				p1score = 0;
			}

			winner = Users.get(winnerid);
			if (winner && !winner.registered) {
				this.room.sendUser(winner, '|askreg|' + winner.id);
			}
			const [score, p1rating, p2rating] = await Ladders(this.ladder).updateRating(p1name, p2name, p1score, this.room);
			void this.logBattle(score, p1rating, p2rating);
		} else if (Config.logchallenges) {
			if (winnerid === p1id) {
				p1score = 1;
			} else if (winnerid === p2id) {
				p1score = 0;
			}
			void this.logBattle(p1score);
		} else {
			this.logData = null;
		}
		// If a replay was saved at any point or we were configured to autosavereplays,
		// reupload when the battle is over to overwrite the partial data (and potentially
		// reflect any changes that may have been made to the replay's hidden status).
		if (this.replaySaved || Config.autosavereplays) {
			const uploader = Users.get(winnerid || p1id);
			if (_optionalChain([uploader, 'optionalAccess', _3 => _3.connections, 'access', _4 => _4[0]])) {
				Chat.parse('/savereplay silent', this.room, uploader, uploader.connections[0]);
			}
		}
		const parentGame = this.room.parent && this.room.parent.game;
		// @ts-ignore - Tournaments aren't TS'd yet
		if (_optionalChain([parentGame, 'optionalAccess', _5 => _5.onBattleWin])) {
			// @ts-ignore
			parentGame.onBattleWin(this.room, winnerid);
		}
		// If the room's replay was hidden, disable users from joining after the game is over
		if (this.room.hideReplay) {
			this.room.settings.modjoin = '%';
			this.room.setPrivate('hidden');
		}
		this.room.update();
	}
	async logBattle(
		p1score, p1rating = null, p2rating = null,
		p3rating = null, p4rating = null
	) {
		if (Dex.getFormat(this.format, true).noLog) return;
		const logData = this.logData;
		if (!logData) return;
		this.logData = null; // deallocate to save space
		logData.log = this.room.getLog(-1).split('\n'); // replay log (exact damage)

		// delete some redundant data
		for (const rating of [p1rating, p2rating, p3rating, p4rating]) {
			if (rating) {
				delete rating.formatid;
				delete rating.username;
				delete rating.rpsigma;
				delete rating.sigma;
			}
		}

		logData.p1rating = p1rating;
		logData.p2rating = p2rating;
		if (this.playerCap > 2) {
			logData.p3rating = p3rating;
			logData.p4rating = p4rating;
		}
		logData.endType = this.endType;
		if (!p1rating) logData.ladderError = true;
		const date = new Date();
		logData.timestamp = '' + date;
		logData.roomid = this.room.roomid;
		logData.format = this.room.format;

		const logsubfolder = Chat.toTimestamp(date).split(' ')[0];
		const logfolder = logsubfolder.split('-', 2).join('-');
		const tier = this.room.format.toLowerCase().replace(/[^a-z0-9]+/g, '');
		const logpath = `logs/${logfolder}/${tier}/${logsubfolder}/`;

		await _fs.FS.call(void 0, logpath).mkdirp();
		await _fs.FS.call(void 0, `${logpath}${this.room.getReplayData().id}.log.json`).write(JSON.stringify(logData));
		// console.log(JSON.stringify(logData));
	}
	onConnect(user, connection = null) {
		// this handles joining a battle in which a user is a participant,
		// where the user has already identified before attempting to join
		// the battle
		const player = this.playerTable[user.id];
		if (!player) return;
		player.updateChannel(connection || user);
		const request = player.request;
		if (request) {
			let data = `|request|${request.request}`;
			if (request.choice) data += `\n|sentchoice|${request.choice}`;
			(connection || user).sendTo(this.roomid, data);
		}
		if (!player.active) this.onJoin(user);
	}
	onUpdateConnection(user, connection = null) {
		this.onConnect(user, connection);
	}
	onRename(user, oldUserid, isJoining, isForceRenamed) {
		if (user.id === oldUserid) return;
		if (!this.playerTable) {
			// !! should never happen but somehow still does
			user.games.delete(this.roomid);
			return;
		}
		if (!(oldUserid in this.playerTable)) {
			if (user.id in this.playerTable) {
				// this handles a user renaming themselves into a user in the
				// battle (e.g. by using /nick)
				this.onConnect(user);
			}
			return;
		}
		if (!this.allowRenames) {
			const player = this.playerTable[oldUserid];
			if (player) {
				const message = isForceRenamed ? " lost by having an inappropriate name." : " forfeited by changing their name.";
				this.forfeitPlayer(player, message);
			}
			if (!(user.id in this.playerTable)) {
				user.games.delete(this.roomid);
			}
			return;
		}
		if (!user.named) {
			this.onLeave(user, oldUserid);
			return;
		}
		if (user.id in this.playerTable) return;
		const player = this.playerTable[oldUserid];
		if (player) {
			this.updatePlayer(player, user);
		}
		const options = {
			name: user.name,
			avatar: user.avatar,
		};
		void this.stream.write(`>player ${player.slot} ` + JSON.stringify(options));
	}
	onJoin(user) {
		const player = this.playerTable[user.id];
		if (player && !player.active) {
			player.active = true;
			this.timer.checkActivity();
			this.room.add(`|player|${player.slot}|${user.name}|${user.avatar}`);
		}
	}
	onLeave(user, oldUserid) {
		const player = this.playerTable[oldUserid || user.id];
		if (_optionalChain([player, 'optionalAccess', _6 => _6.active])) {
			player.sendRoom(`|request|null`);
			player.active = false;
			this.timer.checkActivity();
			this.room.add(`|player|${player.slot}|`);
		}
	}

	win(user) {
		if (!user) {
			this.tie();
			return true;
		}
		const player = this.playerTable[user.id];
		if (!player) return false;
		void this.stream.write(`>forcewin ${player.slot}`);
	}
	tie() {
		void this.stream.write(`>forcetie`);
	}
	tiebreak() {
		void this.stream.write(`>tiebreak`);
	}
	forfeit(user, message = '') {
		if (typeof user !== 'string') user = user.id;
		else user = toID(user);

		if (!(user in this.playerTable)) return false;
		return this.forfeitPlayer(this.playerTable[user], message);
	}

	forfeitPlayer(player, message = '') {
		if (this.ended || !this.started) return false;

		if (!message) message = ' forfeited.';
		this.room.add(`|-message|${player.name}${message}`);
		this.endType = 'forfeit';
		const otherids = ['p2', 'p1'];
		void this.stream.write(`>forcewin ${otherids[player.num - 1]}`);
		return true;
	}

	/**
	 * Team should be '' for random teams. `null` should be used only if importing
	 * an inputlog (so the player isn't recreated)
	 */
	addPlayer(user, team, rating = 0) {
		// TypeScript bug: no `T extends RoomGamePlayer`
		const player = super.addPlayer(user) ;
		if (!player) return null;
		const slot = player.slot;
		this[slot] = player;

		if (team !== null) {
			const options = {
				name: player.name,
				avatar: user ? '' + user.avatar : '',
				team,
				rating: Math.round(rating),
			};
			void this.stream.write(`>player ${slot} ${JSON.stringify(options)}`);
		}

		if (user) {
			this.room.auth.set(player.id, Users.PLAYER_SYMBOL);
			if (this.rated && !this.forcePublic) {
				this.forcePublic = user.battlesForcedPublic();
			}
		}
		if (_optionalChain([user, 'optionalAccess', _7 => _7.inRooms, 'access', _8 => _8.has, 'call', _9 => _9(this.roomid)])) this.onConnect(user);
		return player;
	}

	makePlayer(user) {
		const num = (this.players.length + 1) ;
		return new RoomBattlePlayer(user, this, num);
	}

	updatePlayer(player, user) {
		super.updatePlayer(player, user);

		const slot = player.slot;
		if (user) {
			const options = {
				name: player.name,
				avatar: user.avatar,
			};
			void this.stream.write(`>player ${slot} ` + JSON.stringify(options));

			this.room.add(`|player|${slot}|${player.name}|${user.avatar}`);
		} else {
			const options = {
				name: '',
			};
			void this.stream.write(`>player ${slot} ` + JSON.stringify(options));

			this.room.add(`|player|${slot}|`);
		}
	}

	start() {
		// on start
		this.started = true;
		const users = this.players.map(player => {
			const user = player.getUser();
			if (!user && !this.missingBattleStartMessage) {
				throw new Error(`User ${player.name} not found on ${this.roomid} battle creation`);
			}
			return user;
		});
		if (!this.missingBattleStartMessage) {
			// @ts-ignore The above error should throw if null is found, or this should be skipped
			Rooms.global.onCreateBattleRoom(users, this.room, {rated: this.rated});
		}

		if (this.gameType === 'multi') {
			this.room.title = `Team ${this.p1.name} vs. Team ${this.p2.name}`;
		} else if (this.gameType === 'free-for-all') {
			// p1 vs. p2 vs. p3 vs. p4 is too long of a title
			this.room.title = `${this.p1.name} and friends`;
		} else {
			this.room.title = `${this.p1.name} vs. ${this.p2.name}`;
		}
		this.room.send(`|title|${this.room.title}`);
	}

	clearPlayers() {
		for (const player of this.players) {
			player.unlinkUser();
		}
	}

	destroy() {
		for (const player of this.players) {
			player.destroy();
		}
		this.playerTable = {};
		this.players = [];
		// @ts-ignore
		this.p1 = null;
		// @ts-ignore
		this.p2 = null;
		// @ts-ignore
		this.p3 = null;
		// @ts-ignore
		this.p4 = null;

		this.ended = true;
		void this.stream.destroy();
		if (this.active) {
			Rooms.global.battleCount += -1;
			this.active = false;
		}

		// @ts-ignore
		this.room = null;
		if (this.dataResolvers) {
			for (const [, reject] of this.dataResolvers) {
				// reject the promise, make whatever function called it return undefined
				reject(new Error('Battle was destroyed.'));
			}
		}
	}
	async getTeam(user) {
		const id = user.id;
		const player = this.playerTable[id];
		if (!player) return;
		void this.stream.write(`>requestteam ${player.slot}`);
		const teamDataPromise = new Promise((resolve, reject) => {
			if (!this.dataResolvers) this.dataResolvers = [];
			this.dataResolvers.push([resolve, reject]);
		});
		const resultStrings = await teamDataPromise;
		if (!resultStrings) return;
		const result = resultStrings.map(item => Dex.fastUnpackTeam(item))[0];
		return result;
	}
	onChatMessage(message, user) {
		void this.stream.write(`>chat-inputlogonly ${user.getIdentity(this.room.roomid)}|${message}`);
	}
	async getLog() {
		if (!this.logData) this.logData = {};
		void this.stream.write('>requestlog');
		const logPromise = new Promise((resolve, reject) => {
			if (!this.dataResolvers) this.dataResolvers = [];
			this.dataResolvers.push([resolve, reject]);
		});
		const result = await logPromise;
		return result;
	}
} exports.RoomBattle = RoomBattle;

 class RoomBattleStream extends _battlestream.BattleStream {
	
	constructor() {
		super({keepAlive: true});
		this.battle = null;
	}

	_write(chunk) {
		const startTime = Date.now();
		if (this.battle && Config.debugsimprocesses && process.send) {
			process.send('DEBUG\n' + this.battle.inputLog.join('\n') + '\n' + chunk);
		}
		try {
			this._writeLines(chunk);
		} catch (err) {
			const battle = this.battle;
			Monitor.crashlog(err, 'A battle', {
				chunk,
				inputLog: battle ? '\n' + battle.inputLog.join('\n') : '',
				log: battle ? '\n' + battle.getDebugLog() : '',
			});

			this.push(`update\n|html|<div class="broadcast-red"><b>The battle crashed</b><br />Don't worry, we're working on fixing it.</div>`);
			if (battle) {
				for (const side of battle.sides) {
					if (_optionalChain([side, 'optionalAccess', _10 => _10.requestState])) {
						this.push(`sideupdate\n${side.id}\n|error|[Invalid choice] The battle crashed`);
					}
				}
			}
		}
		if (this.battle) this.battle.sendUpdates();
		const deltaTime = Date.now() - startTime;
		if (deltaTime > 1000) {
			console.log(`[slow battle] ${deltaTime}ms - ${chunk}`);
		}
	}

	_writeLine(type, message) {
		switch (type) {
		case 'chat-inputlogonly':
			this.battle.inputLog.push(`>chat ${message}`);
			break;
		case 'chat':
			this.battle.inputLog.push(`>chat ${message}`);
			this.battle.add('chat', `${message}`);
			break;
		case 'requestlog':
			this.push(`requesteddata\n${this.battle.inputLog.join('\n')}`);
			break;
		case 'eval':
			const battle = this.battle;
			battle.inputLog.push(`>${type} ${message}`);
			message = message.replace(/\f/g, '\n');
			battle.add('', '>>> ' + message.replace(/\n/g, '\n||'));
			try {
				/* eslint-disable no-eval, @typescript-eslint/no-unused-vars */
				const p1 = _optionalChain([battle, 'optionalAccess', _11 => _11.sides, 'access', _12 => _12[0]]);
				const p2 = _optionalChain([battle, 'optionalAccess', _13 => _13.sides, 'access', _14 => _14[1]]);
				const p3 = _optionalChain([battle, 'optionalAccess', _15 => _15.sides, 'access', _16 => _16[2]]);
				const p4 = _optionalChain([battle, 'optionalAccess', _17 => _17.sides, 'access', _18 => _18[3]]);
				const p1active = _optionalChain([p1, 'optionalAccess', _19 => _19.active, 'access', _20 => _20[0]]);
				const p2active = _optionalChain([p2, 'optionalAccess', _21 => _21.active, 'access', _22 => _22[0]]);
				const p3active = _optionalChain([p3, 'optionalAccess', _23 => _23.active, 'access', _24 => _24[0]]);
				const p4active = _optionalChain([p4, 'optionalAccess', _25 => _25.active, 'access', _26 => _26[0]]);
				let result = eval(message);
				/* eslint-enable no-eval, @typescript-eslint/no-unused-vars */

				if (_optionalChain([result, 'optionalAccess', _27 => _27.then])) {
					result.then((unwrappedResult) => {
						unwrappedResult = _utils.Utils.visualize(unwrappedResult);
						battle.add('', 'Promise -> ' + unwrappedResult);
						battle.sendUpdates();
					}, (error) => {
						battle.add('', '<<< error: ' + error.message);
						battle.sendUpdates();
					});
				} else {
					result = _utils.Utils.visualize(result);
					result = result.replace(/\n/g, '\n||');
					battle.add('', '<<< ' + result);
				}
			} catch (e) {
				battle.add('', '<<< error: ' + e.message);
			}
			break;
		case 'requestteam':
			message = message.trim();
			const slotNum = parseInt(message.slice(1)) - 1;
			if (isNaN(slotNum) || slotNum < 0) {
				throw new Error(`Team requested for slot ${message}, but that slot does not exist.`);
			}
			const side = this.battle.sides[slotNum];
			const team = Dex.packTeam(side.team);
			this.push(`requesteddata\n${team}`);
			break;
		default: super._writeLine(type, message);
		}
	}
} exports.RoomBattleStream = RoomBattleStream;

/*********************************************************
 * Process manager
 *********************************************************/

 const PM = new (0, _processmanager.StreamProcessManager)(module, () => new RoomBattleStream()); exports.PM = PM;

if (!exports.PM.isParentProcess) {
	// This is a child process!
	global.Config = require('./config-loader').Config;
	global.Chat = require('./chat').Chat;
	global.Dex = require('../.sim-dist/dex').Dex;
	global.Monitor = {
		crashlog(error, source = 'A simulator process', details = null) {
			const repr = JSON.stringify([error.name, error.message, source, details]);
			process.send(`THROW\n@!!@${repr}\n${error.stack}`);
		},
	};
	global.__version = {head: ''};
	try {
		const head = _child_process.execSync.call(void 0, 'git rev-parse HEAD', {
			stdio: ['ignore', 'pipe', 'ignore'],
		});
		const merge = _child_process.execSync.call(void 0, 'git merge-base origin/master HEAD', {
			stdio: ['ignore', 'pipe', 'ignore'],
		});
		global.__version.head = ('' + head).trim();
		const origin = ('' + merge).trim();
		if (origin !== global.__version.head) global.__version.origin = origin;
	} catch (e) {}

	if (Config.crashguard) {
		// graceful crash - allow current battles to finish before restarting
		process.on('uncaughtException', err => {
			Monitor.crashlog(err, 'A simulator process');
		});
		process.on('unhandledRejection', err => {
			Monitor.crashlog(err  || {}, 'A simulator process Promise');
		});
	}

	// eslint-disable-next-line no-eval
	_repl.Repl.start(`sim-${process.pid}`, cmd => eval(cmd));
} else {
	exports.PM.spawn(global.Config ? Config.simulatorprocesses : 1);
}
