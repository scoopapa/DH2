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
	unnerve: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Unnerve', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Unnerve",
		shortDesc: "On switch-in, this Pokemon lowers the Special attack of adjacent opponents by 1 stage.",
		rating: 1.5,
		num: 127,
	},
	abyssalboost: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Abyssal boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Abyssal boost');
				return this.chainModify(1.5);
			}
		},
		name: "Abyssal Boost",
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Dark-type attack.",
		rating: 3.5,
		num: 300,
	},
	typesuction: {
		shortDesc: "On switch-in adds the foes type(s).",
		onStart(source) {
			let newTypes = [];
			newTypes.push(source.types[0]);
			if (source.types[1]) newTypes.push(source.types[1]);
			for (const target of source.side.foe.active) {
				for (const type of target.types) {
				 if (newTypes.includes(type) || type === '???') continue;
					newTypes.push(type);
				}
				if (target.addedType && !newTypes.includes(target.addedType)) {
					newTypes.push(target.addedType);
				}
				this.add('-start', source, 'typeadd', '[from] ability: Type Suction', '[of] ' + source);
				source.setType(newTypes);
				source.knownType = target.side === source.side && target.knownType;
			}
		},
		name: "Type Suction",
		rating: 3.5,
		num: 302,
	},
};