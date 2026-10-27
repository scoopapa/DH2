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
	
	//unchanged
	healorder: {
		inherit: true,
		isNonstandard: null,
	},
	spectralthief: {
		inherit: true,
		isNonstandard: null,
	},
	coreenforcer: {
		inherit: true,
		isNonstandard: null,
	},
	technoblast: {
		inherit: true,
		isNonstandard: null,
	},
	
	//modded
	triplearrows: {
		inherit: true,
		shortDesc: "Hits 3 times. Always crits.",
		basePower: 20,
		multihit: 3,
		critRatio: null,
		willCrit: true,
		secondaries: null,
	},
	stoneaxe: {
		inherit: true,
		accuracy: 100,
		shortDesc: "100% chance to set Stealth Rock if the target resists the move.",
		onAfterHit: null,
		onAfterSubDamage: null,
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (!source.hp) return;
				if (target.getMoveHitData(move).typeMod < 0) {
					source.side.foe.addSideCondition('stealthrock');
				}
			},
		},
	},
	ceaselessedge: {
		inherit: true,
		accuracy: 100,
		shortDesc: "100% chance to set Spikes if the target resists the move.",
		onAfterHit: null,
		onAfterSubDamage: null,
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (!source.hp) return;
				if (target.getMoveHitData(move).typeMod < 0) {
					source.side.foe.addSideCondition('spikes');
				}
			},
		},
	},
};
