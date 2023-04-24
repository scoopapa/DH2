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
	
	adeptprowess: {
		shortDesc: "Gains secondary type based on held berry. Psy Blast doesn't consume berry.",
		onStart(pokemon){
			if(pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (!item.naturalGift) return;
			let type: string;
			type = item.naturalGift.type;

			if (!pokemon.hasType(type) && pokemon.addType(type)) {
				this.add('-start', pokemon, 'typeadd', type, '[from] ability: Adept Prowess');
			}
		},

		onUpdate(pokemon) {
			if ((pokemon.ignoringItem() || !pokemon.item) && Object.keys(pokemon.getTypes()).length === 2) {
				pokemon.setType("Ground");
				this.add('-start', pokemon, 'typechange', 'Grass', '[from] ability: Adept Prowess');
			}
		},
		name: "Adept Prowess",
		rating: 3.5,
		num: -1,
	},
	
	puyomastery: {
		shortDesc: "Boosts Water attacks by 1.5x",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Puyo Mastery boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Puyo Mastery boost');
				return this.chainModify(1.5);
			}
		},
		name: "Puyo Mastery",
		rating: 3.5,
		num: -2,
	},
	
	funkymode: {
		shortDesc: "This Pokemon can only be damaged by direct attacks.",
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		name: "Funky Mode",
		rating: 4,
		num: -3,
	},
};
