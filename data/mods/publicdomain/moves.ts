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
	voicemail: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Voice Mail",
		shortDesc: "Hits two turns after being used.",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'voicemail',
				source: source,
				moveData: {
					id: 'voicemail',
					name: "Voice Mail",
					accuracy: 100,
					basePower: 100,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1, sound: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Flying',
				},
			});
			this.add('-start', source, 'move: Voice Mail');
			return this.NOT_FAIL;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	toxicsmoke: {
		name: "Toxic Smoke",
		type: "Poison",
		category: "Special",
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "20% chance to Toxic, 20% chance to confuse.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Strange Steam", target);
		},
		secondaries: [
			{
				chance: 20,
				status: 'tox',
			}, {
				chance: 20,
				volatileStatus: 'confusion',
			},
		],
		target: "normal",
	},
	beefup: {
		name: "Beef Up",
		type: "Ground",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 15,
		shortDesc: "Cures user's status, raises Atk, Def by 1.",
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bulk Up", target);
		},
		secondary: null,
		target: "normal",
	},
	starfall: {
		name: "Starfall",
		type: "Dragon",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 5,
		shortDesc: "For 5 turns, a Meteor Shower occurs.",
		priority: 0,
		flags: {metronome: 1},
		weather: 'meteorshower',
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sunny Day", target);
		},
		secondary: null,
		target: "normal",
	},
	starkick: {
		name: "Star Kick",
		type: "Fairy",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 15,
		shortDesc: "1.3x power in Meteor Shower.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "High Jump Kick", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.effectiveWeather() === 'meteorshower') {
				return this.chainModify(1.3);
			}
		},
		secondary: null,
		target: "normal",
	},
	ragingstream: {
		name: "Raging Stream",
		type: "Water",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 15,
		shortDesc: "30% chance to lower the target's Speed by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Surf", target);
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
	},
	blunderblast: {
		name: "Blunderblast",
		type: "Bug",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 10,
		shortDesc: "Deals Bug or Drive-type damage, whichever is more effective.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Techno Blast", target);
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			for (const target of pokemon.side.foe.active) {
			const type1 = 'Bug';
			const type2 = this.runEvent('Drive', pokemon, null, move, 'Bug');
				if (this.dex.getEffectiveness(type1, target) < this.dex.getEffectiveness(type2, target)) {
					move.type = type2;
				} else if (this.dex.getEffectiveness(type1, target) === this.dex.getEffectiveness(type2, target)) {
					if (pokemon.hasType(type2) && !pokemon.hasType('Bug')) {
						move.type = type2;
					}
				}
			}
		},
		onHit(target, source, move) {
			this.add('-message', `Blunderblast dealt ${move.type}-type damage!`);
		},
		secondary: null,
		target: "normal",
	},

	//vanilla moves
	meteorbeam: {
		inherit: true,
		shortDesc: "SpA +1 (2 in Meteor Shower) turn 1. Hits turn 2.",
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (this.field.isWeather('meteorshower')) this.boost({spa: 2}, attacker, attacker, move);
			else this.boost({spa: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	meteormash: {
		inherit: true,
		shortDesc: "20% (100% in Meteor Shower) chance for Atk +1."
		onModifyMove(move, pokemon) {
			if (this.field.isWeather('meteorshower')) move.secondary.chance = 100;
		},
	},
	swift: {
		inherit: true,
		shortDesc: "Never misses. Hits foes. 2x power in Meteor Shower.",
		onBasePower(basePower, source) {
			if (this.field.isWeather('meteorshower')) {
				return this.chainModify(2);
			}
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				break;
			case 'meteorshower':
				move.type = 'Dragon';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			case 'meteorshower':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
		},
	},
	wish: {
		inherit: true,
		shortDesc: "Next turn, heals 50% (66% in Meteor Shower)."
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				if (this.field.isWeather('meteorshower')) this.effectState.hp = source.maxhp * 2 / 3;
				else this.effectState.hp = source.maxhp / 2;
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name);
					}
				}
			},
		},
	},
};
