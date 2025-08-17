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
};
