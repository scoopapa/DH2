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
	/*powerofalchemy: {
		onSourceAfterFaint(source, target, types) {
			const type1 = source.baseSpecies.types;
			const type2 = target.baseSpecies.types;
			if (type1 !== type2) {
				if (!type1(type2)) return;
				this.add('-start', source, 'typechange', '[from] ability: Power of Alchemy');
			}
		},
		name: "Power of Alchemy",
		shortDesc: "This Pokémon copies the type of the last fainted Pokémon, for its secondary type.",
		rating: 0,
		num: 223,
	},*/
	quickdraw: {
		onModifyPriority(priority, source, move) {
			if (source.activeMoveActions < 1) {
				return priority + 1;
			}
			else if (source.activeMoveActions > 1) {
				return priority + 0;
			}
		},
		onBasePower(basePower, source, move) {
			if (source.activeMoveActions < 2) {
				this.chainModify(0.75);
			}
		},
		name: "Quick Draw",
		shortDesc: "User's moves have increased priority in the first turn but are weakend by 0.75x.",
		rating: 2.5,
		num: 259,
	},
	rkssystem: {
		onStart(pokemon) {
			if (pokemon.species.id === 'silvally') {
				this.add('-ability', pokemon, 'Adaptability', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('adaptability');
				pokemon.baseAbility = 'adaptability';
			}
			else if (pokemon.species.id === 'silvallybug') {
				this.add('-ability', pokemon, 'Tinted Lens', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('tintedlens');
				pokemon.baseAbility = 'tintedlens';
			}
			if (pokemon.species.id === 'silvallydark') {
				this.add('-ability', pokemon, 'Dark Aura', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('darkaura');
				pokemon.baseAbility = 'darkaura';
			}
			if (pokemon.species.id === 'silvallydragon') {
				this.add('-ability', pokemon, 'Multiscale', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('multiscale');
				pokemon.baseAbility = 'multiscale';
			}
			if (pokemon.species.id === 'silvallyelectric') {
				this.add('-ability', pokemon, 'Lightning Rod', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('lightningrod');
				pokemon.baseAbility = 'lightningrod';
			}
			if (pokemon.species.id === 'silvallyfairy') {
				this.add('-ability', pokemon, 'Cute Charm', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('cutecharm');
				pokemon.baseAbility = 'cutecharm';
			}
			if (pokemon.species.id === 'silvallyfighting') {
				this.add('-ability', pokemon, 'Scrappy', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('scrappy');
				pokemon.baseAbility = 'scrappy';
			}
			if (pokemon.species.id === 'silvallyfire') {
				this.add('-ability', pokemon, 'Flash Fire', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('flashfire');
				pokemon.baseAbility = 'flashfire';
			}
			if (pokemon.species.id === 'silvallyflying') {
				this.add('-ability', pokemon, 'Unburden', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('unburden');
				pokemon.baseAbility = 'unburden';
			}
			if (pokemon.species.id === 'silvallyghost') {
				this.add('-ability', pokemon, 'Prankster', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('prankster');
				pokemon.baseAbility = 'prankster';
			}
			if (pokemon.species.id === 'silvallygrass') {
				this.add('-ability', pokemon, 'Grassy Surge', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('grassysurge');
				pokemon.baseAbility = 'grassysurge';
			}
			if (pokemon.species.id === 'silvallyground') {
				this.add('-ability', pokemon, 'Sand Force', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('sandforce');
				pokemon.baseAbility = 'sandforce';
			}
			if (pokemon.species.id === 'silvallyice') {
				this.add('-ability', pokemon, 'Refrigerate', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('refrigerate');
				pokemon.baseAbility = 'refrigerate';
			}
			if (pokemon.species.id === 'silvallypoison') {
				this.add('-ability', pokemon, 'Poison Point', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('poisonpoint');
				pokemon.baseAbility = 'poisonpoint';
			}
			if (pokemon.species.id === 'silvallypsychic') {
				this.add('-ability', pokemon, 'Magic Guard', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('magicguard');
				pokemon.baseAbility = 'magicguard';
			}
			if (pokemon.species.id === 'silvallyrock') {
				this.add('-ability', pokemon, 'Solid Rock', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('solidrock');
				pokemon.baseAbility = 'solidrock';
			}
			if (pokemon.species.id === 'silvallysteel') {
				this.add('-ability', pokemon, 'Sturdy', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('sturdy');
				pokemon.baseAbility = 'sturdy';
			}
			if (pokemon.species.id === 'silvallywater') {
				this.add('-ability', pokemon, 'Water Absorb', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('waterabsorb');
				pokemon.baseAbility = 'waterabsorb';
			}
		},
		isPermanent: null,
		name: "RKS System",
		shortDesc: "Ability varies based on the user's type.",
		rating: 4,
		num: 225,
	},
	staticcling: {
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Static Cling');
				return false;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				if (!target.setItem(yourItem)) {
					source.item = yourItem.id;
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Static Cling', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Static Cling', '[of] ' + source);
			}
		},
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.flags['contact']) {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Static Cling', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Static Cling', '[of] ' + source);
			}
		},
		name: "Static Cling",
		shortDesc: "This Pokemon cannot lose its held item. Contact: Steals opponent's item on contact, if the user has no item.",
		rating: 0,
		num: 1001,
	},
	rarecold: {
		onSourceModifyDamage(damage, source, target) {
			/*if (source.getStat('spe', false, true) > target.getStat('spe', false, true)) {
				return this.chainModify(1);
			}*/
			if (source.getStat('spe', false, true) <= target.getStat('spe', false, true)) {
				return this.chainModify(0.5);
			}
		},
		name: "Rare Cold",
		shortDesc: "User takes halved damage if user moves before the target.",
		rating: 0,
		num: 1002,
	},
	watercycle: {
		onBasePower(basePower, attacker, defender, move) {
			if (defender.volatiles['partiallytrapped']) {
				return this.chainModify(1.3);
			}
		},
		name: "Water Cycle",
		shortDesc: "User deal 1.3x damage to trapped targets.",
		rating: 0,
		num: 1003,
	},
	cloudburst: {
		onBeforeMove(source, target, move) {
			if (move.type === 'Electric' && !this.field.isWeather('raindance')) {
				this.useMove('raindance', source);
			}
		},
		name: "Cloud Burst",
		shortDesc: "User summons Rain before executing an Electric-type move.",
		rating: 0,
		num: 1004,
	},
	packleader: {
		onModifyAtk(atk, source, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Pack Leader boost');
				return this.chainModify(1.3);
			}
		},
		name: "Pack Leader",
		shortDesc: "If this Pokemon goes first, it deals 1.3x damage.",
		rating: 0,
		num: 1005,
	},
};
