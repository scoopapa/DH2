export const Abilities: { [abilityid: string]: ModdedAbilityData; } = {
	// slate 1
	fullmetalbody: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages. This Pokemon can only be damaged by direct attacks.",
	},
	multitype: {
		inherit: true,
		flags: {}, // yes deleting the flags is an ugly way to do it but I need to find a better one lol
		onStart(pokemon) {
			const allTypes = {
				"Normal": "Rock Head",
				"Grass": "Cotton Down",
				"Fire": "Dry Skin",
				"Water": "Cloud Nine",
				"Electric": "Earth Eater",
				"Ice": "Snow Warning",
				"Fighting": "Scrappy",
				"Poison": "Levitate",
				"Ground": "Clear Body",
				"Flying": "Wind Power",
				"Psychic": "Intimidate",
				"Bug": "Magic Guard",
				"Rock": "Sand Stream",
				"Ghost": "Super Luck",
				"Dragon": "Regenerator",
				"Dark": "Limber",
				"Steel": "Shield Dust",
				"Fairy": "Opportunist"
			};
			const item = pokemon.getItem();
			if (!item.onPlate) return;
			const abilityToGive = allTypes[pokemon.types[0]];
			const oldAbility = pokemon.setAbility(abilityToGive);
			if (oldAbility) {
				this.add('-ability', pokemon, abilityToGive, '[from] ability: Multitype');
				return;
			}
			return oldAbility as false | null;
		}
	},
};
