export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	//new moves
	freezerburn: {
		name: "Freezer Burn",
		type: "Ice",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 15,
		shortDesc: "30% chance to burn the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Glacial Lance", target);
		},
		secondary: {
			chance: 30,
			secondary: 'brn',
		},
		target: "normal",
	},
	
	//changed ice moves
	aurorabeam: {
		num: 802,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Aurora Beam",
		shortDesc: "User faints. Sets up Aurora Veil.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfdestruct: "always",
		self: {
			sideCondition: 'auroraveil',
		},
		secondary: null,
		target: "allAdjacent",
		type: "Ice",
	},
	auroraveil: {
		inherit: true,
		shortDesc: "For 5 turns, damage to allies -25%. Max 2 layers.",
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Aurora Veil weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(1 - (0.25 * this.effectState.layers));
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Aurora Veil');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Aurora Veil');
				this.effectState.layers++;
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Aurora Veil');
			},
		},
	},
	avalanche: {
		inherit: true,
		shortDesc: "Deals supereffective damage if the user was damaged this turn.",
		basePowerCallback: null,
		onEffectiveness(typeMod, target, type) {
			const source = this.effectState.source;
			console.log(source);
			/*const damagedByTarget = source.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				if (target.baseSpecies.types[0] === type) return 1;
				else return 0;
			}*/
		},
	},
	blizzard: {
		inherit: true,
		shortDesc: "30% chance to frostbite the target.",
		basePower: 80,
		accuracy: 100,
		pp: 15,
		secondary: {
			chance: 30,
			status: 'fsb',
		},
	},
	chillyreception: {
		inherit: true,
		shortDesc: "Lowers the target's Spe by 1. User switches out.",
		weather: null,
		boosts: {
			spe: -1,
		},
	},
	freezeshock: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Is Ice or Electric-type, whichever does more damage.",
		name: "Freeze Shock",
		viable: true,
		pp: 10,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			for (const target of pokemon.side.foe.active) {
			const type1 = 'Ice';
			const type2 = 'Electric';
				if (this.dex.getEffectiveness(type1, target) < this.dex.getEffectiveness(type2, target)) {
					move.type = 'Electric';
				} else if (this.dex.getEffectiveness(type1, target) === this.dex.getEffectiveness(type2, target)) {
					if (pokemon.hasType('Electric') && !pokemon.hasType('Ice')) {
						move.type = 'Electric';
					}
				}
			}
		},
		onHit(target, source, move) {
			this.add('-message', `Freeze Shock dealt ${move.type}-type damage!`);
		},
		priority: 0,
		secondary: null,
		target: "any",
		type: "Ice",
	},
	freezyfrost: {
		inherit: true,
		isNonstandard: null,
		basePower: 90,
		accuracy: 100,
	},
	frostbreath: {
		inherit: true,
		shortDesc: "Always crits. High SSR critical hit ratio.",
		onBasePower(basePower, pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('-message', 'SSR critical hit!');
				return this.chainModify(3);
			}
		},
	},
	glaciallance: {
		inherit: true,
		shortDesc: "Lowers the user's Atk and Sp. Def by 1.",
		basePower: 110,
		self: {
			boosts: {
				atk: -1,
				spd: -1,
			},
		},
	},
	glaciate: {
		inherit: true,
		shortDesc: "Removes the target's Ice type.",
		basePower: 60,
		accuracy: 100,
		onHit(target) {
			if(!target.getTypes().includes("Ice")) return;
			const newBaseTypes = target.getTypes().filter(t => t !== "Ice");
			this.add('-start', target, 'typechange', newBaseTypes);
			target.setType(newBaseTypes);
		},
		secondary: null,
	},
	hail: {
		accuracy: 90,
		basePower: 20,
		category: "Special",
		name: "Hail",
		shortDesc: "Hits 10 times. Each hit can miss.",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 10,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	iceball: {
		inherit: true,
		isViable: true,
		isNonstandard: null,
		accuracy: 100,
		shortDesc: "Power doubles with each consecutive use.",
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			const iceballData = pokemon.volatiles['iceball'];
			if (iceballData?.hitCount) {
				bp *= Math.pow(2, iceballData.contactHitCount);
			}
			if (iceballData && pokemon.status !== 'slp') {
				iceballData.hitCount++;
				iceballData.contactHitCount++;
				if (iceballData.hitCount < 5) {
					iceballData.duration = 2;
				}
			}
			if (pokemon.volatiles['defensecurl']) {
				bp *= 2;
			}
			if (this.field.pseudoWeather.whiteout) {
				bp *= 2;
			}
			return bp;
		},
		condition: {
			duration: 1,
			onStart() {
				this.effectState.hitCount = 0;
				this.effectState.contactHitCount = 0;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['iceball'];
				}
			},
		},
	},
	icebeam: {
		inherit: true,
		shortDesc: "20% chance to frostbite the target.",
		secondary: {
			chance: 20,
			status: 'fsb',
		},
	},
	iceburn: {
		name: "Ice Burn",
		type: "Ice",
		category: "Special",
		basePower: 70,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits Ice neutrally. 10% chance to burn the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ice') return 0;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
	},
	icefang: {
		inherit: true,
		basePower: 20,
		accuracy: 100,
		shortDesc: "100% chance to frostbite the target.",
		secondary: {
			chance: 100,
			status: 'fsb',
		},
	},
	icepunch: {
		inherit: true,
		shortDesc: "User recovers 50% of the damage dealt.",
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		secondary: null,
	},
	icehammer: {
		inherit: true,
		accuracy: 100,
		shortDesc: "User's Spe -1. 100% to lower target's Def by 1.",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	iceshard: {
		inherit: true,
		shortDesc: "+1 priority. Doubled damage against statused targets.",
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	icespinner: {
		inherit: true,
		shortDesc: "Doubles in power if a terrain is active.",
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
				this.debug('BP doubled in Terrain');
			}
		},
		onAfterHit: null,
		onAfterSubDamage: null,
	},
	icywind: {
		inherit: true,
		basePower: 70,
		shortDesc: "100% chance to lower the target's Spe by 2.",
		secondary: {
			chance: 100,
			boosts: {
				spe: -2,
			},
		},
	},
	mist: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mist",
		shortDesc: "5 turns. Grounded: +Dark power, 50% drain.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'scarletmist',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dark' && attacker.isGrounded()) {
					this.debug('scarletmist boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.category !== 'Status' && !move.drain && pokemon.isGrounded) move.drain = [1, 2];
			},
			onFieldStart(field, source, effect) {
				this.add('-message', `${source.name} released the Scarlet Mist!`);
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-message', 'The scarlet mist dissipated.');
			},
		},
		secondary: null,
		target: "all",
		type: "Ice",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	mountaingale: {
		inherit: true,
		shortDesc: "If the target resists this attack, set Tailwind.",
		onHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod < 0) {
				source.addSideCondition("tailwind");
			}
		},
		secondary: null,
	},
	powdersnow: {
		inherit: true,
		shortDesc: "Usually goes first.",
		priority: 1,
		secondary: null,
	},
	present: {
		inherit: true,
		shortDesc: "Uses Gen 2 damage calculation. 25% chance to heal instead.",
		type: 'Ice',
		category: 'Special',
		basePower: 80,
		accuracy: 100,
		onModifyMove(move, pokemon, target) {
			const rand = this.random(4);
			if (rand < 1) {
				move.basePower = 0;
				move.heal = [1, 4];
				move.infiltrates = true;
				move.flags.nice = 1;
			}
		}
	},
	sheercold: {
		name: "Sheer Cold",
		type: "Ice",
		category: "Status",
		basePower: 0,
		accuracy: 85,
		pp: 20,
		shortDesc: "Frostbites the target.",
		priority: 0,
		flags: {protect: 1, reflectable: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sheer Cold", target);
		},
		status: 'fsb',
		secondary: null,
		target: "normal",
	},
	snowscape: {
		category: "Status",
		name: "Snow's Cape",
		shortDesc: "Protects from damaging attacks. Contact: fsb.",
		pp: 10,
		priority: 4,
		flags: {metronome: 1, noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'snowscape',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('brn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('fsb', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Ice",
	},
	tripleaxel: {
		inherit: true,
		name: "Trip Le Axel",
		shortDesc: "Triple Axel + on miss, use a Gen 6 sigmove.",
		onMoveFail(target, source, move) {
			const moves = ['lightofruin', 'kingsshield', 'fairylock', 'forestscurse', 'trickortreat', 'geomancy', 'oblivionwing', 'landswrath', 'coreenforcer', 'thousandarrows', 'thousandwaves', 'diamondstorm', 'hyperspacehole', 'hyperspacefury', 'steameruption'];
			const newMove = this.dex.moves.get(this.sample(moves));
			this.actions.useMove(newMove, pokemon);
		},
	},
	
	//other
	synthesis: {
		inherit: true,
		shortDesc: "Heals the user by 50% of its max HP.",
		onHit: null,
		heal: [1, 2],
	},
	floatyfall: {
		inherit: true,
		isNonstandard: null,
	},
	courtchange: {
		inherit: true,
		onHitField(target, source) {
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'luckychant', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire', 'gmaxvolcalith',
			];
			let success = false;
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
			target.side.swapKarma();
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
	},
	grudge: {
		inherit: true,
		shortDesc: "User faints: the attack used loses all its PP, attacker's karma -10.",
		isNonstandard: null,
		volatileStatus: 'grudge',
		condition: {
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Grudge');
			},
			onFaint(target, source, effect) {
				if (!source || source.fainted || !effect) return;
				if (effect.effectType === 'Move' && !effect.flags['futuremove'] && source.lastMove) {
					let move: Move = source.lastMove;
					if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);

					for (const moveSlot of source.moveSlots) {
						if (moveSlot.id === move.id) {
							moveSlot.pp = 0;
							source.side.removeKarma(10);
							this.add('-activate', source, 'move: Grudge', move.name);
						}
					}
				}
			},
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug('removing Grudge before attack');
				pokemon.removeVolatile('grudge');
			},
		},
	},
	tarshot: {
		inherit: true,
		category: 'Special',
		basePower: 40,
		pp: 15,
		flags: {protect: 1, bullet: 1, mirror: 1, metronome: 1},
	},
	
	//nice moves
	bakecookie: {
		name: "Bake Cookie",
		type: "Fire",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 15,
		shortDesc: "Gives the user a Gingerbread Man. Contact: brn, foe gains Gingerbread Man.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nice: 1, snatch: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('bakecookie');
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Will-o-Wisp", target);
		},
		onHit(target) {
			if (target.item) return false;
			const gingerbreadman = this.dex.items.get('Gingerbread Man');
			this.add('-item', target, gingerbreadman, '[from] move: Bake Cookie', '[of] ' + target);
			target.setItem(gingerbreadman);
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Bake Cookie');
			},
			onHit(target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('brn', target);
					const item = target.takeItem();
					if (!item) return;
					const gingerbreadman = this.dex.items.get('Gingerbread Man');
					this.add('-enditem', source, item.name, '[from] move: Bake Cookie', '[of] ' + target);
					this.add('-item', source, gingerbreadman, '[from] move: Bake Cookie', '[of] ' + target);
					source.setItem(gingerbreadman);
				}
			},
		},
		secondary: null,
		target: "self",
	},
	buildsnowman: {
		name: "Build Snowman",
		type: "Ice",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "User gains Substitute. Substitute uses Powder Snow/Branch Poke.",
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		volatileStatus: 'buildsnowman',
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		onTryHit(source) {
			if (source.volatiles['substitute']) {
				this.add('-fail', source, 'move: Substitute');
				return this.NOT_FAIL;
			}
			if (source.hp <= source.maxhp / 4 || source.maxhp === 1) { // Shedinja clause
				this.add('-fail', source, 'move: Substitute', '[weak]');
				return this.NOT_FAIL;
			}
		},
		onHit(target) {
			target.addVolatile('substitute');
			this.directDamage(target.maxhp / 4);
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-message', `${pokemon.name} is building a snowman!`);
			},
			onUpdate(pokemon) {
				if (!pokemon.volatiles['substitute']) {
					pokemon.removeVolatile('buildsnowman');
				}
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const moves = ['branchpoke', 'powdersnow'];
				const move = this.dex.moves.get(this.sample(moves));
				move.flags.neutral = 1;
				this.actions.useMove(move, pokemon);
			},
			onEnd(pokemon) {
				this.add('-message', `${pokemon.name}'s snowman collapsed!`);
			},
		},
		secondary: null,
		target: "normal",
	},
	christmastree: {
		name: "Christmas Tree",
		type: "Grass",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "For 5 turns, user's side gains 1/8 HP healing/temporary stat buff at the end of each turn.",
		priority: 0,
		flags: {snatch: 1, metronome: 1, nice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ingrain", target);
		},
		sideCondition: 'christmastree',
		condition: {
			duration: 5,
			onSideStart(side) {
				this.add('-sidestart', side, 'Christmas Tree');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				if (this.randomChance(1, 2)) this.heal(Math.ceil(pokemon.maxhp / 8), pokemon);
				else {
					const stats: BoostID[] = [];
					let stat: BoostID;
					for (stat in pokemon.boosts) {
						if (pokemon.boosts[stat] < 6) {
							stats.push(stat);
						}
					}
					if (stats.length) {
						const randomStat = this.sample(stats);
						const boost: SparseBoostsTable = {};
						boost[randomStat] = 1;
						this.boost(boost);
					} else {
						return false;
					}
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 4,
			onSideEnd(side) {
				this.add('-sideend', side, 'Christmas Tree');
				side.active[0].clearBoosts();
			},
		},
		secondary: null,
		target: "allySide",
	},
	hug: {
		name: "Hug",
		type: "Normal",
		category: "Physical",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "Traps the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nice: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tickle", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
	},
	milkandcookies: {
		name: "Milk and Cookies",
		type: "Normal",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Doubles the probability of Santa appearing for 10 turns.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Quiver Dance", target);
		},
		pseudoWeather: 'milkandcookies',
		condition: {
			duration: 10,
			onFieldStart(target) {
				this.add('-message', 'Milk and cookies have been planted!');
			},
			onFieldEnd() {
				this.add('-message', 'The milk and cookies disappeared!');
			},
		},
		secondary: null,
		target: "all",
	},
	niceball: {
		accuracy: 100,
		basePower: 15,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			const iceballData = pokemon.volatiles['niceball'];
			if (iceballData?.hitCount) {
				bp *= Math.pow(2, iceballData.contactHitCount);
			}
			if (iceballData && pokemon.status !== 'slp') {
				iceballData.hitCount++;
				iceballData.contactHitCount++;
				if (iceballData.hitCount < 5) {
					iceballData.duration = 2;
				}
			}
			if (pokemon.volatiles['defensecurl']) {
				bp *= 2;
			}
			this.debug("BP: " + bp);
			return bp;
		},
		category: "Physical",
		name: "Nice Ball",
		shortDesc: "Doubles in power with consecutive uses.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, failinstruct: 1, bullet: 1, noparentalbond: 1, nice: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Ball", target);
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.volatiles['niceball'] || pokemon.status === 'slp' || !target) return;
			pokemon.addVolatile('niceball');
			// @ts-ignore
			// TS thinks pokemon.volatiles['iceball'] doesn't exist because of the condition on the return above
			// but it does exist now because addVolatile created it
			pokemon.volatiles['niceball'].targetSlot = move.sourceEffect ? pokemon.lastMoveTargetLoc : pokemon.getLocOf(target);
		},
		onAfterMove(source, target, move) {
			const niceballData = source.volatiles["niceball"];
			if (
				niceballData &&
				niceballData.hitCount === 5 &&
				niceballData.contactHitCount < 5
				// this conditions can only be met in gen7 and gen8dlc1
				// see `disguise` and `iceface` abilities in the resp mod folders
			) {
				source.addVolatile("rolloutstorage");
				source.volatiles["rolloutstorage"].contactHitCount =
				niceballData.contactHitCount;
			}
		},

		condition: {
			duration: 1,
			onStart() {
				this.effectState.hitCount = 0;
				this.effectState.contactHitCount = 0;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['niceball'];
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Stellar",
		contestType: "Beautiful",
	},
	nicebeam: {
		accuracy: 100,
		basePower: 45,
		category: "Special",
		name: "Nice Beam",
		shortDesc: "10% chance to freeze the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Beam", target);
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Stellar",
		contestType: "Beautiful",
	},
	niceburn: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Nice Burn",
		shortDesc: "30% chance to burn the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Burn", target);
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Stellar",
		contestType: "Beautiful",
	},
	nicefang: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Nice Fang",
		shortDesc: "Target loses 1/16 max HP.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1, nice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Fang", target);
		},
		onHit(target, source) {
			this.damage(target.baseMaxhp / 16, source, source);
		},
		secondary: null,
		target: "normal",
		type: "Stellar",
		contestType: "Cool",
	},
	nicepunch: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Nice Punch",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, punch: 1,heal: 1, nice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Punch", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Stellar",
		contestType: "Cool",
	},
	nicehammer: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Nice Hammer",
		shortDesc: "User's Spe -1. 100% to lower target's Def by 1.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, punch: 1,nice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Hammer", target);
		},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Stellar",
		contestType: "Cool",
	},
	niceshard: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Nice Shard",
		shortDesc: "Usually moves first.",
		pp: 30,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, nice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Shard", target);
		},
		secondary: null,
		target: "normal",
		type: "Stellar",
		contestType: "Cool",
	},
	nicespinner: {
		name: "Nice Spinner",
		type: "Stellar",
		category: "Physical",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "Doubles in power if a terrain is active.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, nice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Spinner", target);
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
				this.debug('BP doubled in Terrain');
			}
		},
		secondary: null,
		target: "normal",
	},
	sharesnack: {
		name: "Share Snack",
		type: "Normal",
		category: "Status",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "Replaces the target's item with a Candy Cane.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bestow", target);
		},
		onHit(target, source, move) {
			const item = target.takeItem();
			if (!item) return;
			const candycane = this.dex.items.get('Candy Cane');
			this.add('-enditem', target, item.name, '[from] move: Share Snack', '[of] ' + source, "[silent]");
			this.add('-item', target, candycane, '[from] move: Share Snack', '[of] ' + target, "[silent]");
			target.setItem(candycane);
		},
		secondary: null,
		target: "normal",
	},
	snowballfight: {
		name: "Snowball Fight",
		type: "Ice",
		category: "Special",
		basePower: 10,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits 2-5 times.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nice: 1},
		multihit: [2, 5],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Powder Snow", target);
		},
		secondary: null,
		target: "normal",
	},

	//nice vanilla moves
	flatter: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1, nice: 1},
	},
	holdhands: {
		inherit: true,
		flags: {bypasssub: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1, nice: 1},
	},
	celebrate: {
		inherit: true,
		flags: {nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1, nice: 1},
	},
	healpulse: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1, allyanim: 1, metronome: 1, pulse: 1, nice: 1},
	},
	bestow: {
		inherit: true,
		flags: {mirror: 1, bypasssub: 1, allyanim: 1, noassist: 1, failcopycat: 1, nice: 1},
	},
	decorate: {
		inherit: true,
		shortDesc: "Raises the target's highest stat by 1.",
		flags: {allyanim: 1, nice: 1},
		onHit(target) {
			const bestStat = target.getBestStat(true, true);
			this.boost({[bestStat]: 1}, target);
		},
		boosts: null,
	},
}
