export const Moves: {[moveid: string]: ModdedMoveData} = {
	vocalstrain: {
		num: -1,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Vocal Strain",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Voice", target);
		},
		onHit(target, source) {
			source.addVolatile('vocalstrain');
		},
		condition: {
			duration: 2,
			onTryHit(target, source, move) {
				if (move.flags['sound']) return null;
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		shortDesc: "Hits all adjacent foes. Prevents the user from using sound-based moves for 2 turns.",
	},
	badapple: {
		num: -2,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Bad Apple",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grav Apple", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fairy') return 1;
		},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
		desc: "Has a 20% chance to poison the target. This move's type effectiveness against Fairy is changed to be super effective no matter what this move's type is.",
		shortDesc: "20% chance to poison. Super effective on Fairy.",
	},
	kindle: {
		num: -3,
		accuracy: 100,
		basePower: 55,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno", target);
		},
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'brn') return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Kindle",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		desc: "Power doubles if the target suffers from Burn.",
		shortDesc: "Power doubles if the target is burnt.",
	},
	cleansingwave: {
		num: -4,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Cleansing Wave",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wave Crash", target);
		},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Cleansing Wave', '[of] ' + pokemon);
				}
				if (target.hp && target.removeVolatile('leechseed')) {
					this.add('-end', target, 'Leech Seed', '[from] move: Cleansing Wave', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Cleansing Wave', '[of] ' + pokemon);
					}
					if (target.hp && target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Cleansing Wave', '[of] ' + pokemon);
					}
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Cleansing Wave', '[of] ' + pokemon);
				}
				if (target.hp && target.removeVolatile('leechseed')) {
					this.add('-end', target, 'Leech Seed', '[from] move: Cleansing Wave', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Cleansing Wave', '[of] ' + pokemon);
					}
					if (target.hp && target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Cleansing Wave', '[of] ' + pokemon);
					}
				}
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Cool",
		desc: "Removes Leech Seed and entry hazards of both side, and decreases the targets' Speed by 1 stage. Hit all adjacent foes.",
		shortDesc: "Removes hazards and Leech Seed from both sides. Decreases the targets' Speed by 1 stage. Hit all adjacent foes.",
	},
};
