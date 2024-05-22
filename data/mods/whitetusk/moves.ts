export const Moves: {[moveid: string]: ModdedMoveData} = {
	hopskip: {
		num: -1001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's Special Attack and Speed by 1.",
		name: "Hop Skip",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Dark",
		contestType: "Cool",
	},
	sympatheticvibration: {
		num: -1002,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "For each target; if highest stat is the same, +1. If not, target gets -1 to their highest stat.",
		name: "Sympathetic Vibration",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			dustproof: true,
			chance: 100,
			onHit(target, source) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				let statName1 = 'atk';
				let bestStat1 = 0;
				let s1: StatNameExceptHP;
				for (s1 in target.storedStats) {
					if (target.storedStats[s] > bestStat1) {
						statName1 = s1;
						bestStat1 = target.storedStats[s];
					}
				}
				if (statName === statName1) {
					this.boost({[statName]: +1}, source);
				} else {
					this.boost({[statName1]: -1}, target, source, null, false, true);
				}
			},
		},
		target: "allAdjacent",
		type: "Flying",
		contestType: "Cool",
	},
	bonesong: {
		num: -1003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Cures the user's party of all status conditions.",
		name: "Bone Song",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, sound: 1, distance: 1, authentic: 1},
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Heal Bell');
			const side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally !== source && ally.hasAbility('soundproof')) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "allyTeam",
		type: "Ghost",
		contestType: "Cool",
	},
	puffinpummel: {
		num: -1004,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon) {
			if (!pokemon.volatiles['stockpile']?.layers) return 70;
			return 70 + pokemon.volatiles['stockpile'].layers * 30;
		},
		category: "Physical",
		shortDesc: "Gains 30 BP and sets a Spike layer for each Stockpile the user has. Resets Stockpile.",
		name: "Puffin Pummel",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('stockpile');
		},
		onAfterHit(target, source, move) {
			if (!source.volatiles['stockpile']?.layers) return;
			for (let i = 0; i < source.volatiles['stockpile'].layers; i++) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	propheticdreams: {
		num: -1005,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "Deals damage two turns after used. Fails if another future move is already in effect.",
		name: "Prophetic Dreams",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'propheticdreams',
				source: source,
				moveData: {
					id: 'propheticdreams',
					name: "Prophetic Dreams",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Fairy',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	gatlinggum: {
		num: -1006,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "If user is holding Luminous Bubble or Fresh Stick, becomes Water- or Ice-type, respectively.",
		name: "Gatling Gum",
		pp: 10,
		priority: 0,
		flags: {},
		onModifyType(move, pokemon) {
			if (pokemon.getItem() === "Luminous Bubble") {
				move.type = 'Water';
			} else if (pokemon.getItem() === "Fresh Stick") {
				move.type = 'Ice';
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	poppedrelief: {
		num: -1007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User takes 33% piercing damage and switches out. Incoming Pokemon heals 33%.",
		name: "Popped Relief",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, piercing: 1},
		onHit(target) {
			this.directDamage(target.maxhp/3);
		},
		selfSwitch: true,
		slotCondition: 'poppedrelief',
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp)) {
					target.heal(target.maxhp/3);
					this.add('-heal', target, target.getHealth, '[from] move: Popped Relief');
					target.side.removeSlotCondition(target, 'poppedrelief');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
		contestType: "Cool",
	},
	icyrelief: {
		num: -1008,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "User switches out; all Pokemon on the field are healed from Burn.",
		name: "Icy Relief",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		selfSwitch: true,
		secondary: {
			dustproof: true,
			chance: 100,
			onHit(source) {
				for (const ally of source.side.pokemon) {
					if (ally.status === 'brn') ally.cureStatus();
				}
				for (const pokemon of source.side.foe.active) {
					if (pokemon.status === 'brn') pokemon.cureStatus();
				}
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	refurbish: {
		num: -1009,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Refurbish",
		shortDesc: "All active field effects are reset to last another 5 turns.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		onHitField(target, source) {
			let success = false;
			for (const id in this.field.pseudoWeather) {
				if (this.field.pseudoWeather[id]?.duration && this.field.pseudoWeather[id]?.duration !== 0) {
					this.field.pseudoWeather[id].duration = 5;
					this.add('-fieldend', this.dex.conditions.get(id).name, '[silent]');
					this.add('-fieldstart', this.dex.conditions.get(id).name, '[silent]');
					success = true;
				}
			}
			for (const id in source.side.sideConditions) {
				if (source.side.sideConditions[id].duration && source.side.sideConditions[id].duration !== 0) {
					source.side.sideConditions[id].duration = 5;
					this.add('-sideend', source.side, this.dex.conditions.get(id).name, '[silent]');
					this.add('-sidestart', source.side, this.dex.conditions.get(id).name, '[silent]');
					success = true;
				}
			}
			for (const id in source.side.foe.sideConditions) {
				if (source.side.foe.sideConditions[id].duration && source.side.foe.sideConditions[id].duration !== 0) {
					source.side.foe.sideConditions[id].duration = 5;
					this.add('-sideend', source.side.foe, this.dex.conditions.get(id).name, '[silent]');
					this.add('-sidestart', source.side.foe, this.dex.conditions.get(id).name, '[silent]');
					success = true;
				}
			}
			if (this.field.weatherState?.duration) {
				this.field.weatherState.duration = 5;
				if (this.dex.conditions.get(this.field.weather)) {
					// the weather conditions all have specific names for "this.add", but they're only found in conditions.ts
					this.add('-weather', 'none', '[silent]');
					this.add('-weather', this.dex.conditions.get(this.field.weather).name, '[silent]');
				}
				success = true;
			}
			if (this.field.terrainState?.duration) {
				this.field.terrainState.duration = 5;
				if (this.dex.moves.get(this.field.terrain)) {
					// the terrains all have specific names for "this.add", but they're only found in moves.ts
					this.add('-fieldend', 'move: ' + this.dex.moves.get(this.field.terrain).name, '[silent]');
					this.add('-fieldstart', 'move: ' + this.dex.moves.get(this.field.terrain).name, '[silent]');
				}
				success = true;
			}
			if (success) this.add('-message', `All ongoing field effects were set to last 5 turns!`);
			return success;
			if (!success) return;
		},
		secondary: null,
		target: "all",
		type: "Normal",
		contestType: "Clever",
	},
	plasmastrike: {
		num: -1010,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "100% chance to lower the user's Spe by 1 stage, and the target's Spe by 2 stages.",
		name: "Plasma Strike",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -2,
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	radiantstrike: {
		num: -1011,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "100% chance to lower the user's SpA by 1 stage, and the target's SpA by 2 stages.",
		name: "Radiant Strike",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: {
			chance: 100,
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	stockpile: {
		num: 254,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stockpile",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onTry(source) {
			if (source.volatiles['stockpile'] && source.volatiles['stockpile'].layers >= 3) return false;
		},
		volatileStatus: 'stockpile',
		condition: {
			noCopy: true,
			onStart(target) {
				this.effectState.layers = 1;
				this.effectState.def = 0;
				this.effectState.spd = 0;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onRestart(target) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
				const curDef = target.boosts.def;
				const curSpD = target.boosts.spd;
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onEnd(target) {
				if (this.effectState.def || this.effectState.spd) {
					const boosts: SparseBoostsTable = {};
					if (this.effectState.def) boosts.def = this.effectState.def;
					if (this.effectState.spd) boosts.spd = this.effectState.spd;
					this.boost(boosts, target, target);
				}
				if (target.ability === 'puffinup') {
					this.boost({spe: 1}, target);
				}
				this.add('-end', target, 'Stockpile');
				if (this.effectState.def !== this.effectState.layers * -1 || this.effectState.spd !== this.effectState.layers * -1) {
					this.hint("In Gen 7, Stockpile keeps track of how many times it successfully altered each stat individually.");
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Tough",
	},
};