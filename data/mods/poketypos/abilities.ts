/*
Ratings and how they work:
-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start
 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus
 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups
 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat
 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy
 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce
 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag
*/

export const Abilities: {[abilityid: string]: AbilityData} = {
	thermalexchange: {
		onTryHit(target, source, move) {
			if (move.type === 'Fire') {
				this.add('-immune', pokemon, '[from] ability: Thermal Exchange');
				return null;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({atk: 1});
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Thermal Exchange');
			}
			return false;
		},
		name: "Thermal Exchange",
		shortDesc: "Atk is raised by 1 when this Pokemon is hit by a Fire move; Fire immunity; can't be burned.",
		rating: 2.5,
	},
	carpenter: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Carpenter boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Carpenter boost');
				return this.chainModify(1.5);
			}
		},
		name: "Carpenter",
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Grass-type attack.",
		rating: 3.5,
	},
	myceliummight: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === 'Status') {
				return -0.1;
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreAbility = true;
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreVolatiles = true;
			}
		},
		name: "Mycelium Might",
		rating: 2,
		num: 298,
	},
	honeyfists: {
		onModifyMove(move, pokemon) {
			if (pokemon.types.includes(move.type)) move.drain = [1, 8];
		},
		name: "Honey Fists",
		shortDesc: "When this Pokemon uses a STAB attack, it heals 1/8 of the damage dealt.",
		rating: 4,
	},
	northwind: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('North Wind boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('North Wind boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting' || move.type === 'Grass' || move.type === 'Bug') {
				this.debug('North Wind weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting' || move.type === 'Grass' || move.type === 'Bug') {
				this.debug('North Wind weaken');
				return this.chainModify(0.5);
			}
		},
		name: "North Wind",
		shortDesc: "User gains STAB on Flying moves and also gains Flying-type resistances.",
		rating: 4.5,
	},
};
