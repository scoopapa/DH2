export const Rulesets: {[k: string]: ModdedFormatData} = {
	shadowadaptermod: {
		name: "Shadow Adapter Mod",
		effectType: "Rule",
		desc: `Pok&eacute;mon holding a Shadow Adapter have the Shadow-type added onto their current ones.`,
		onBegin() {
			this.add('rule', 'Shadow Adapter Mod: Pok\u00e9mon holding a Shadow Adapter have the Shadow-type added onto their current ones');
		},
		onModifySpeciesPriority: 1,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			if (target.hasItem('shadowadapter')) {
				const typesSet = new Set(species.types);
				const bonusType = 'Shadow';
				this.add('-anim', target, "Poltergeist", target);
			  this.add('-message', `${target.name}'s Shadow Adapter temporarily closed its heart!`);
				if (bonusType.exists) typesSet.add(bonusType.name);
				return {...species, types: [...typesSet]};
			}
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},
  };
