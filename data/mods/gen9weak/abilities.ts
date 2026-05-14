export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	innerfocus: {
		inherit: true,
		onTryBoost() {},
		shortDesc: "This Pokemon cannot be made to flinch.",
	},
	lightningrod: {
		onTryHit() {},
		shortDesc: "This Pokemon draws single-target Electric moves to itself.",
	},
	oblivious: {
		inherit: true,
		onTryBoost() {},
		shortDesc: "This Pokemon cannot be infatuated or taunted.",
	},
	owntempo: {
		inherit: true,
		onTryBoost() {},
		shortDesc: "This Pokemon cannot be confused.",
	},
	rattled: {
		inherit: true,
		onAfterBoost() {},
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by a Bug-, Dark-, or Ghost-type attack.",
	},
	roughskin: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 16, source, target);
			}
		},
		shortDesc: "Pokemon making contact with this Pokemon lose 1/16 of their max HP.",
	},
	scrappy: {
		inherit: true,
		onTryBoost() {},
		shortDesc: "This Pokemon can hit Ghost types with Normal- and Fighting-type moves.",
	},
	stormdrain: {
		onTryHit() {},
		shortDesc: "This Pokemon draws single-target Water moves to itself.",
	},
	weakarmor: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 1}, target, target);
			}
		},
		shortDesc: "If a physical attack hits this Pokemon, Defense is lowered by 1, Speed is raised by 1.",
	},
};
