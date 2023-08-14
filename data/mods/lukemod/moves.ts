export const Moves: {[moveid: string]: MoveData} = {
	// alt ex
	wickedblow: {
		inherit: true,
		accuracy: 100,
		basePower: 85,
		shortDesc: "Inflicts Torment on the opponent.",
		pp: 10,
		willCrit: null,
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('torment');
				}
			},
		},
	},
	astralbarrage: {
		inherit: true,
		accuracy: 80,
		basePower: 100,
		shortDesc: "High critical hit ratio.",
		target: "normal",
		type: "Dark",
	},
	sunsteelstrike: {
		num: 713,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Sunsteel Strike",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	moongeistbeam: {
		num: 714,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "User switches out. Nullifies the foes Ability if the foes move first.",
		name: "Moongeist Beam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().isPermanent) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	turkeybarrage: {
		num: -15,
		accuracy: 70,
		basePower: 140,
		category: "Physical",
		shortDesc: "20% chance to make the target flinch.",
		name: "Turkey Barrage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sky Attack", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	lifedew: {
		num: 791,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals 1/3 of max HP. If statused: Heals 1/6 and cures status.",
		name: "Life Dew",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.333;
			if (pokemon.status) {
				factor = 0.167;
				pokemon.cureStatus();
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Water",
	},
	wavecrash: {
		num: -18,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Fails if the target is not attacking. Has 33% recoil.",
		name: "Wave Crash",
		pp: 5,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		recoil: [33, 100],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aqua Jet", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	venoshock: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
	},
	snaptrap: {
		num: 779,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Snap Trap",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Steel",
	},


	// poketypos
	tripledive: {
		num: 813,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		name: "Triple Dive",
		shortDesc: "Hits 3 times. Target: 10% confusion, 20% -1 speed. High crit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		multihit: 3,
		secondaries: [
			{
				chance: 20,
				boosts: {
					spe: -1,
				},
			}, {
			   chance: 10,
		   	volatileStatus: 'confusion',
		   },
		],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dive", target);
		},
		target: "normal",
		type: "Water",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	athletesfoot: {
		num: 575,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Athlete's Foot",
		shortDesc: "Lowers target's Def and SpA by 1. User switches.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, dance: 1, authentic: 1},
		onHit(target, source, move) {
			const success = this.boost({def: -1, spa: -1}, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Ascent", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {effect: 'healreplacement'},
		contestType: "Cool",
	},


};
