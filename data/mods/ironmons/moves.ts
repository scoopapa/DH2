export const Moves: {[k: string]: ModdedMoveData} = {
	risingdivide: {
		num: -1,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Rising Divide",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Rising Divide only works on your first turn out.");
				return false;
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aerial Ace", target);
		},
		shortDesc: "Hits first. First turn out only.",
		desc: "Hits first. First turn out only.",
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cute",
	},
	signaljam: {
		num: -2,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Signal Jam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Signal Jam only works on your first turn out.");
				return false;
			}
		},
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Signal Beam", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Electric",
		zMove: {basePower: 140},
		contestType: "Tough",
	},
	chlorohorn: {
		num: -3,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Chloro Horn",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyPriority(priority, source, target, move) {
			if (['sunnyday', 'desolateland'].includes(source.effectiveWeather())) {
				return priority + 1;
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grassy Glide", target);
		},
		shortDesc: "Priority +1 in Sun.",
		desc: "Priority +1 in Sun.",
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	titansjudgment: {
		num: -4,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Titan's Judgment",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target, '[from] move: Titan\'s Judgment');
			if (target.volatiles['protosynthesis']) {
				delete target.volatiles['protosynthesis'];
				this.add('-end', target, 'Protosynthesis');
			}
			if (target.volatiles['quarkdrive']) {
				delete target.volatiles['quarkdrive'];
				this.add('-end', target, 'Quark Drive');
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Core Enforcer", target);
		},
		shortDesc: "Resets target's stat stages, including from Protosynthesis and Quark Drive.",
		desc: "Resets target's stat stages, as well as boosts from Protosynthesis and Quark Drive.",
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	coreenforcer: {
		inherit: true,
		isNonstandard: null,
	},
	mk42charge: {
		num: -5,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "MK-42 Charge",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('electricterrain')) move.boosts = {spa: 1, spe: 1, accuracy: 1};
		},
		boosts: {
			spa: 1,
			accuracy: 1,
		},
		secondary: null,
		target: "self",
		type: "Steel",
		shortDesc: "Raises SpA and Accuracy by 1 , also Speed by 1 in Electric Terrain.",
		desc: "Raises the user's Special Attack and Accuracy by 1 stage, and also Speed by 1 stage in Electric Terrain.",
		zMove: {boost: {atk: 1}},
		contestType: "Cute",
	},
	warpblast: {
		num: -6,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Warp Blast",
		pp: 10,
		priority: 0,
		flags: {},
		pseudoWeather: 'gravity',
		secondary: null,
		target: "all",
		type: "Psychic",
		shortDesc: "Sets Gravity.",
	},
	hyperspin: {
		num: -7,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Hyper Spin",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Hyper Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Hyper Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Hyper Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Hyper Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		shortDesc: "Removes hazards, Leech Seed, and partially trapping moves.",
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
}
