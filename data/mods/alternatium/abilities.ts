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
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'RKS System');
		},
		onStart(pokemon) {
			if (pokemon.species.id === 'silvally') {
				const oldAbility = source.setAbility('adaptability', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Adaptability', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallybug') {
				const oldAbility = source.setAbility('tintedlens', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Tinted Lens', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallydark') {
				const oldAbility = source.setAbility('darkaura', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Dark Aura', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallydragon') {
				const oldAbility = source.setAbility('multiscale', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Multiscale', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallyelectric') {
				const oldAbility = source.setAbility('lightningrod', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Lightning Rod', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallyfairy') {
				const oldAbility = source.setAbility('cutecharm', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Cute Charm', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallyfighting') {
				const oldAbility = source.setAbility('scrappy', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Scrappy', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallyfire') {
				const oldAbility = source.setAbility('flashfire', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Flash Fire', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallyflying') {
				const oldAbility = source.setAbility('unburden', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Unburden', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallyghost') {
				const oldAbility = source.setAbility('prankster', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Prankster', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallygrass') {
				const oldAbility = source.setAbility('grassysurge', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Grassy Surge', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallyground') {
				const oldAbility = source.setAbility('sandforce', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Sand Force', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallyice') {
				const oldAbility = source.setAbility('refrigerate', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Refrigerate', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallypoison') {
				const oldAbility = source.setAbility('poisonpoint', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Poison Point', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallypsychic') {
				const oldAbility = source.setAbility('magicguard', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Magic Guard', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallyrock') {
				const oldAbility = source.setAbility('solidrock', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Solid Rock', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallysteel') {
				const oldAbility = source.setAbility('sturdy', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Sturdy', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
			else if (pokemon.species.id === 'silvallywater') {
				const oldAbility = source.setAbility('waterabsorb', pokemon);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Water Absorb', this.dex.getAbility(oldAbility).name, '[of] ' + pokemon);
				}
			}
		},
		isPermanent: true,
		name: "RKS System",
		rating: 4,
		num: 225,
	},
};
