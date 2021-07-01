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
	powerofalchemy: {
		onAllyFaint(target) {
			if (!this.effectData.target.hp) return;
			const ability = target.getAbility();
			const additionalBannedAbilities = [
				'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'wonderguard',
			];
			if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) return;
			this.add('-ability', this.effectData.target, ability, '[from] ability: Power of Alchemy', '[of] ' + target);
			this.effectData.target.setAbility(ability);
		},
		name: "Power of Alchemy",
		rating: 0,
		num: 223,
	},
	rkssystem: {
		onStart(pokemon) {
			if (pokemon.species.id === 'silvally') {
				this.add('-ability', pokemon, 'Adaptability', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('adaptability');
				// @ts-ignore
				pokemon.baseAbility = 'adaptability';
			}
			else if (pokemon.species.id === 'silvallybug') {
				this.add('-ability', pokemon, 'Tinted Lens', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('tintedlens');
				// @ts-ignore
				pokemon.baseAbility = 'tintedlens';
			}
			if (pokemon.species.id === 'silvallydark') {
				this.add('-ability', pokemon, 'Dark Aura', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('darkaura');
				// @ts-ignore
				pokemon.baseAbility = 'darkaura';
			}
			if (pokemon.species.id === 'silvallydragon') {
				this.add('-ability', pokemon, 'Multiscale', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('multiscale');
				// @ts-ignore
				pokemon.baseAbility = 'multiscale';
			}
			if (pokemon.species.id === 'silvallyelectric') {
				this.add('-ability', pokemon, 'Lightning Rod', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('lightningrod');
				// @ts-ignore
				pokemon.baseAbility = 'lightningrod';
			}
			if (pokemon.species.id === 'silvallyfairy') {
				this.add('-ability', pokemon, 'Cute Charm', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('cutecharm');
				// @ts-ignore
				pokemon.baseAbility = 'cutecharm';
			}
			if (pokemon.species.id === 'silvallyfighting') {
				this.add('-ability', pokemon, 'Scrappy', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('scrappy');
				// @ts-ignore
				pokemon.baseAbility = 'scrappy';
			}
			if (pokemon.species.id === 'silvallyfire') {
				this.add('-ability', pokemon, 'Flash Fire', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('flashfire');
				// @ts-ignore
				pokemon.baseAbility = 'flashfire';
			}
			if (pokemon.species.id === 'silvallyflying') {
				this.add('-ability', pokemon, 'Unburden', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('unburden');
				// @ts-ignore
				pokemon.baseAbility = 'unburden';
			}
			if (pokemon.species.id === 'silvallyghost') {
				this.add('-ability', pokemon, 'Prankster', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('prankster');
				// @ts-ignore
				pokemon.baseAbility = 'prankster';
			}
			if (pokemon.species.id === 'silvallygrass') {
				this.add('-ability', pokemon, 'Grassy Surge', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('grassysurge');
				// @ts-ignore
				pokemon.baseAbility = 'grassysurge';
			}
			if (pokemon.species.id === 'silvallyground') {
				this.add('-ability', pokemon, 'Sand Force', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('sandforce');
				// @ts-ignore
				pokemon.baseAbility = 'sandforce';
			}
			if (pokemon.species.id === 'silvallyice') {
				this.add('-ability', pokemon, 'Refrigerate', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('refrigerate');
				// @ts-ignore
				pokemon.baseAbility = 'refrigerate';
			}
			if (pokemon.species.id === 'silvallypoison') {
				this.add('-ability', pokemon, 'Poison Point', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('poisonpoint');
				// @ts-ignore
				pokemon.baseAbility = 'poisonpoint';
			}
			if (pokemon.species.id === 'silvallypsychic') {
				this.add('-ability', pokemon, 'Magic Guard', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('magicguard');
				// @ts-ignore
				pokemon.baseAbility = 'magicguard';
			}
			if (pokemon.species.id === 'silvallyrock') {
				this.add('-ability', pokemon, 'Solid Rock', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('solidrock');
				// @ts-ignore
				pokemon.baseAbility = 'solidrock';
			}
			if (pokemon.species.id === 'silvallysteel') {
				this.add('-ability', pokemon, 'Sturdy', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('sturdy');
				// @ts-ignore
				pokemon.baseAbility = 'sturdy';
			}
			if (pokemon.species.id === 'silvallywater') {
				this.add('-ability', pokemon, 'Water Absorb', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('waterabsorb');
				// @ts-ignore
				pokemon.baseAbility = 'waterabsorb';
			}
		},
		isPermanent: true,
		name: "RKS System",
		rating: 4,
		num: 225,
	},
};
