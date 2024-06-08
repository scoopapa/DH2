export const Abilities: {[k: string]: ModdedAbilityData} = {
	residuecleaning: {
    // effect hardcoded into defog (just defog for now)
		flags: {},
		shortDesc: "Clearing hazards heals 25% max HP per hazard.",
		name: "Residue Cleaning",
	},
	mountaineer: {
		inherit: true,
		isNonstandard: null,
	},
	hotheaded: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.category === 'Physical') mod /= 2;
			return this.chainModify(mod);
		},
		shortDesc: "This Pokemon takes 1/2 damage from physical moves, 2x damage from Fire moves.",
		flags: {breakable: 1},
		name: "Hot-Headed",
		rating: 4,
	},
	calmdemeanor: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Ice') mod *= 2;
			if (move.category === 'Special') mod /= 2;
			return this.chainModify(mod);
		},
		shortDesc: "This Pokemon takes 1/2 damage from special moves, 2x damage from Ice moves.",
		flags: {breakable: 1},
		name: "Calm Demeanor",
		rating: 4,
	},
	systemoverride: {
		onPrepareHit(source, target, move) {
			if (this.effectState.systemOverride) return;
			if (move.id === 'conversion') {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, source, source);
				this.effectState.systemOverride = true;
			}
		},
		flags: {},
		shortDesc: "Before using Conversion, boosts all stats by 1 stage.",
		name: "System Override",
		rating: 2,
	},
	snowcap: {
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && !this.field.isWeather(['hail', 'snow'])) {
				return this.chainModify(1.5);
			}
		},
		// other effects coded into moves
		flags: {},
		shortDesc: "This Pokemon acts as if Snow is active.",
		name: "Snowcap",
		rating: 3,
	},
	prehistoricmight: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!target.positiveBoosts()) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Prehistoric Might', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -2}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Prehistoric Might",
		rating: 2.5,
		shortDesc: "On switch-in, the foe's Speed is lowered by 2 stages if it has a positive stat boost.",
	},
	gravitasbody: {
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
		onStart(source) {
			this.add('-ability', source, 'Gravitas');
			this.field.addPseudoWeather('gravity', source, source.ability);
		},
		flags: {},
		name: "Gravitas Body",
		rating: 4,
	},
	lightshield: {
		shortDesc: "This Pokemon's Special Defense is doubled.",
		onModifySpDPriority: 6,
		onModifyDef(spd) {
			return this.chainModify(2);
		},
		flags: {breakable: 1},
		name: "Light Shield",
		rating: 4,
	},
	honeystone: {
		shortDesc: "Once per battle, heals 50% of this Pokemon HP on switch-in.",
		onStart(pokemon) {
			if (pokemon.honeyBoost) return;
			pokemon.honeyBoost = true;
			pokemon.heal(pokemon.baseMaxhp / 2);
		},
		flags: {},
		name: "Honeystone",
		rating: 3.5,
	},
	noxiousliquid: {
		shortDesc: "This Pokemon's Poison moves can hit Steel-types.",
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		flags: {},
		name: "Noxious Liquid",
		rating: 3.5,
	},
	purewater: {
		shortDesc: "This Pokemon's draining moves heal it 50% more than usual.",
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Pure Water",
		rating: 3.5,
	},
	lifedrain: {
		shortDesc: "This Pokemon's moves heal it for 33% of the damage dealt.",
		onModifyMove(move, pokemon) {
			if (!move.drain && move.category !== 'Status') {
				move.drain = [1, 3];
			}
		},
		flags: {},
		name: "Life Drain",
		rating: 3,
	},
};
