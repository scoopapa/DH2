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
	
	//slate 1
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
	//slate 2
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	//modded
	
	//slate 1
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
	//slate 2
	mortalspin: {
		inherit: true,
		shortDesc: "Free user from hazards/bind/Leech Seed; -1 Def.",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	saltcure: {
		inherit: true,
		shortDesc: "Deals 1/8 additional max HP; 1/4 on Steel, Water.",
		basePower: 60,
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (!source.hp) return;
				this.damage(target.baseMaxhp / (target.hasType(['Water', 'Steel']) ? 4 : 8));
			},
		},
	},
	freezeshock: {
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		name: "Freeze Shock",
		shortDesc: "Hits two turns after being used.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, futuremove: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'freezeshock',
				source: source,
				moveData: {
					id: 'freezeshock',
					name: "Freeze Shock",
					accuracy: 100,
					basePower: 140,
					category: "Physical",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					effectType: 'Move',
					type: 'Ice',
				},
			});
			this.add('-start', source, 'Freeze Shock');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	fierydance: {
		inherit: true,
		shortDesc: "During Rain Dance: 1.5x damage instead of half.",
		pp: 15,
		flags: {protect: 1, mirror: 1, dance: 1, metronome: 1, defrost: 1},
		secondary: null,
		// Damage boost in Rain applied in conditions.ts
	},
};
