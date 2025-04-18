import { inherits } from "util";

export const Moves: { [moveid: string]: ModdedMoveData } = {

	giantssiege: {
		num: -1000,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Giant's Siege",
		pp: 10,
		priority: 1,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onBasePower(basePower, pokemon, target) {
			if (pokemon.hp * 2 >= pokemon.maxhp) {
				this.debug('giant\'s siege boost')
				return this.chainModify(1.5);
			}
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Ice Shard', target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	riverwave: {
		num: -1001,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "River Wave",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Surf', target);
		},
		target: "allAdjacent",
		type: "Water",
		contestType: "Cool",
		shortDesc: "10% chance to lower opponent's speed stat.",

	},
	archaicglare: {
		num: -1002,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Archaic Glare",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		basePowerCallback(pokemon, target, move) {
			let boost = 1;
			if (this.field.getPseudoWeather('trickroom')) {
				this.debug('archaic glare TR boost');
				boost = boost + 0.5;
				//return move.basePower * 1.5;
			}
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('archaic glare sun boost');
				boost = boost + 0.5;
				//return move.basePower * 1.5;
			}

			return move.basePower * boost;
		},
		onHit(target, source, move) {
			if (this.field.getPseudoWeather('trickroom')) return;
			
			this.field.addPseudoWeather('trickroom');
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Psyshock', target);
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
		shortDesc: "Deals +50% damage in TR/Sun. Sets TR.",

	},
	blindingblitz: {
		num: -1003,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		name: "Blinding Blitz",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, metronome: 1 },
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('High Jump Kick'));
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
		shortDesc: "User takes 50% of their max HP as recoil on whiff.",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'High Jump Kick', target);
		},
	},
	boilingbash: {
		num: -1004,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Boiling Bash",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
		secondary: {
			chance: 30,
			status: 'brn',
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Flare Blitz', target);
		},
		target: "allAdjacent",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "30% to burn. Hits all adjacent targets.",

	},
	boilingdeluge: {
		num: -1005,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Boiling Deluge",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.hasType(['Fire'])) {
					return false;
				}
				this.add('-start', pokemon, 'Boiling Deluge');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp * (pokemon.hasType(['Fire']) ? 0 : (1 / 8)));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Boiling Deluge');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'boilingdeluge',
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Flame Burst', target);
		},
		target: "normal",
		type: "Fire",
		shortDesc: "Pokemon hit take 1/8 max HP every turn. Fire types are immune.",

	},
	candlelight: {
		num: -1006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Candlelight",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
		onHit(target, source, move) {
			let success = false;
			let removals = 0;

			const removeTarget = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if ((targetCondition === 'spikes' || targetCondition === 'toxicspikes') && target.side.getSideCondition(targetCondition)) {
					removals += target.side.sideConditions[targetCondition].layers;
				}
				else if (target.side.getSideCondition(targetCondition)) {
					removals++;
				}

				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Candlelight', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if ((sideCondition === 'spikes' || sideCondition === 'toxicspikes') && source.side.getSideCondition(sideCondition)) {
					removals += source.side.sideConditions[sideCondition].layers;
				}
				else if (source.side.getSideCondition(sideCondition)) {
					removals++;
				}

				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Candlelight', '[of] ' + source);
					success = true;
				}
			}

			this.add('-message', `${source.name} cleared ${removals} hazards!`);

			for (let i = 0; i < removals; i++) {
				source.side.addSideCondition('candlelight');
				
			}

			return success;
		},
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'Candlelight');
				this.effectState.layers = 1;
				//this.add('-message', `The candle started burning!`);
			},
			onSideRestart(side) {
				this.effectState.layers++;
				//this.add('-message', `The candle burns brighter!`);
			},
			onEntryHazard(pokemon) {
				this.heal(this.effectState.layers * (pokemon.maxhp / 16));
				pokemon.side.removeSideCondition('candlelight');
				this.add('-message', `The candle went out!`);
			},
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Moonlight', target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
		shortDesc: "Removes all hazards. Next swap-in heals 1/16 per removed.",
	},
	dragonhunt: {
		num: -1007,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Dragon Hunt damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Dragon Hunt",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Leech Life', target);
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('dragonhunt', pokemon);
				const data = side.getSideConditionData('dragonhunt');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('dragonhunt');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('dragonhunt start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Dragon Hunt');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('dragonhunt', source, source.getLocOf(pokemon));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Hits opponents on swap out, gets a x2 power boost.",

	},
	gundown: {
		num: -1008,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Gun Down",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, distance: 1, metronome: 1, bullet: 1, pulse: 1 },
		ignoreImmunity: { 'Fighting': true },
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Snipe Shot', target);
		},
		secondary: null,
		target: "any",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Ignores Ghost-type immunity.",
	},
	huntershot: {
		num: -1009,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Hunter Shot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Flash Cannon', target);
		},
		self: {
			volatileStatus: 'focusenergy',
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		shortDesc: "This move always crits. Sets Focus Energy.",

	},
	lightthatburnthesky: {
		num: -1010,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Light That Burn The Sky",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Moongeist Beam', target);
		},
		target: "allAdjacent",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "30% to burn. Hits all adjacent opponents.",

	},
	obsidianclaw: {
		num: -1011,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Obsidian Claw",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
		secondary: {
			chance: 20,
			status: 'par',
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Crabhammer', target);
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "20% chance to paralyze.",

	},
	perfectfreeze: {
		num: -1012,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Perfect Freeze",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: { protect: 1, mirror: 1, recharge: 1 },
		secondary: {
			chance: 100,
			status: 'frz',
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Sheer Cold', target);
		},
		/*mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Perfect Freeze'), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},*/
		target: "normal",
		type: "Ice",
		contestType: "Cool",
		shortDesc: "100% chance to freeze. User must recharge.",

	},
	prominenceshock: {
		num: -1013,
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Prominence Shock",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, contact: 1 },
		self: {
			volatileStatus: 'mustrecharge',
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Volt Tackle', target);
		},
		recoil: [50, 100],
		target: "normal",
		type: "Electric",
		shortDesc: "User must recharge. Takes 50% of damage dealt as recoil.",

	},
	sicklysugar: {
		num: -1014,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Sickly Sugar",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Sludge Bomb', target);
		},
		onHit(target, source, move) {
			if (target.status === 'psn' || target.status === 'tox') {
				return !!this.boost({ atk: -1, spa: -1 }, target, source, move);
			}
			return false;
		},
		target: "normal",
		type: "Poison",
		shortDesc: "If the opponent is poisoned or badly poisoned, drop Atk and Spa by 1.",
	},
	sulfuricsolution: {
		num: -1015,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Sulfuric Solution",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		ignoreImmunity: { 'Poison': true },
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Toxic', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		onTryHit(target, source, move) {
			if (target.hasType('Poison')) {
				move.basePower = 0;
			}
		},
		onTryMove(source, target, move) {
			this.attrLastMove('[still]');
			if (target.hasType('Poison') && source.volatiles['healblock']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Heal Block', move);
				return false;
			}
		},
		onHit(target, source, move) {
			if (target.hasType('Poison')) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.25))) {
					if (target.volatiles['healblock'] && target.hp !== target.maxhp) {
						this.attrLastMove('[still]');
						// Wrong error message, correct one not supported yet
						this.add('cant', source, 'move: Heal Block', move);
					} else {
						this.add('-immune', target);
					}
					return this.NOT_FAIL;
				}
			}
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
		shortDesc: "SE vs. Steels. Heals Poison-types by 25%.",

	},
	vitalspark: {
		num: -1016,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Vital Spark",
		pp: 10,
		priority: 0,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Shadow Ball', target);
		},
		flags: { protect: 1, mirror: 1, metronome: 1 },
		self: {
			volatileStatus: 'charge',
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
		shortDesc: "User gains Charge volatile.",

	},
	realmsravage: {
		num: -1017,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const ratio = Math.max(Math.floor(pokemon.hp * 48 / pokemon.maxhp), 1);
			let bp;
			if (ratio < 12) {
				bp = 150;
			} else if (ratio < 24) {
				bp = 100;
			} else if (ratio < 36) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Physical",
		name: "Realm's Ravage",
		critRatio: 2,
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Outrage', target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		shortDesc: "Does more damage the lower the user's HP gets.",
	},
	crystallineshelter: {
		num: -1018,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystalline Shelter",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: 'crystallineshelter',
		condition: {
			onStart(target, source, effect) {
				this.add('-start', target, 'move: Crystalline Shelter');
			},
			onDamagingHit(damage, target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					this.damage(source.baseMaxhp / 6, source, target);
				}
			},
		},
		type: "Rock",
		target: "self",
		secondary: null,
		shortDesc: "Gives the user Rocky Helmet effects.",
	},
	dustveil: {
		num: -1019,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dust Veil",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: 'dustveil',
		onTry() {
			return this.field.isWeather(['sandstorm']);
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onSideStart(side, source) {
				this.add('-sidestart', side, 'move: Dust Veil');
			},
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.3);
			},
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.3);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Dust Veil');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Ground",
		shortDesc: "Sand: Damage dealt x1.3, 5 turns (8 Light Clay)",
	},
	devour: {
		num: -1020,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Devour",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Crunch', target);
		},
		pp: 10,
		flags: { contact: 1, protect: 1, bite: 1, cantusetwice: 1},
		priority: 0,
		target: "normal",
		type: "Dragon",
		shortDesc: "Maintains Ouroboros streak. Can't be used twice in a row.",
	},
	defog: {
		inherit: true,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1, wind: 1 },
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				// cu2: adding dust veil
				'reflect', 'lightscreen', 'auroraveil', 'dustveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},
	brickbreak: {
		inherit: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit

			// CU 2 note: adding Dust Veil
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
			pokemon.side.removeSideCondition('dustveil');
		},
	},
	psychicfangs: {
		inherit: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit

			// CU 2 note: adding Dust Veil
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
			pokemon.side.removeSideCondition('dustveil');
		},
	},
	ragingbull: {
		inherit: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit

			// cu2 note: not in, future proofing to add dust veil in case anything gets this move
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
			pokemon.side.removeSideCondition('dustveil');
		},
	},
	courtchange: {
		inherit: true,
		onHitField(target, source) {
			// cu2 note: not in, future proofing to add dust veil in case anything gets this move

			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'dustveil', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
			];
			let success = false;
			if (this.gameType === "freeforall") {
				// random integer from 1-3 inclusive
				const offset = this.random(3) + 1;
				// the list of all sides in counterclockwise order
				const sides = [this.sides[0], this.sides[2]!, this.sides[1], this.sides[3]!];
				const temp: {[k: number]: typeof source.side.sideConditions} = {0: {}, 1: {}, 2: {}, 3: {}};
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if (!sideConditions.includes(id)) continue;
						temp[side.n][id] = side.sideConditions[id];
						delete side.sideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						this.add('-sideend', side, effectName, '[silent]');
						success = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n];
					const targetSide = sides[(i + offset) % 4]; // the next side in rotation
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						let layers = sourceSideConditions[id].layers || 1;
						for (; layers > 0; layers--) this.add('-sidestart', targetSide, effectName, '[silent]');
					}
				}
			} else {
				const sourceSideConditions = source.side.sideConditions;
				const targetSideConditions = source.side.foe.sideConditions;
				const sourceTemp: typeof sourceSideConditions = {};
				const targetTemp: typeof targetSideConditions = {};
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue;
					sourceTemp[id] = sourceSideConditions[id];
					delete sourceSideConditions[id];
					success = true;
				}
				for (const id in targetSideConditions) {
					if (!sideConditions.includes(id)) continue;
					targetTemp[id] = targetSideConditions[id];
					delete targetSideConditions[id];
					success = true;
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id];
				}
				for (const id in targetTemp) {
					sourceSideConditions[id] = targetTemp[id];
				}
				this.add('-swapsideconditions');
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
	},
}
