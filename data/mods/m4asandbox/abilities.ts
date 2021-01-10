export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	quakingboom: {
		shortDesc: "Follows up sound moves with an Earthquake of 60 BP.",
		name: "Quaking Boom",
		rating: 3,
		num: -5000,
  },
	reverberation: {
		shortDesc: "Sound moves echo over the following two turns.",
		name: "Reverberation",
		rating: 3,
		num: -5000,
  },
	acidrock: {
		desc: "On switch-in, the field becomes Acidic Terrain. This terrain remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Acidic Terrain begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.clearTerrain();
			this.field.setTerrain('acidicterrain');
		},
		onAnyTerrainStart(target, source, terrain) {
			if (!source.hasAbility('arenarock') && !source.hasAbility('acidrock')) {
				this.field.setTerrain('acidicterrain');
			}
		},
		onEnd(pokemon) {
			if (this.field.terrainData.source !== pokemon || !this.field.isTerrain('grassyterrain')) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('acidrock')) {
					this.field.terrainData.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		name: "Acid Rock",
		rating: 3,
		num: -5000,
  },
	arenarock: {
		desc: "On switch-in, the field becomes Grassy Terrain. This terrain remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Grassy Terrain begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.clearTerrain();
			this.field.setTerrain('grassyterrain');
		},
		onAnyTerrainStart(target, source, terrain) {
			if (!source.hasAbility('arenarock') && !source.hasAbility('acidrock')) {
				this.field.setTerrain('grassyterrain');
			}
		},
		onEnd(pokemon) {
			if (this.field.terrainData.source !== pokemon || !this.field.isTerrain('grassyterrain')) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('arenarock')) {
					this.field.terrainData.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		name: "Arena Rock",
		rating: 4.5,
		num: -1004,
	},
	magnetrock: {
		shortDesc: "Filler text - one sec.",
		name: "Magnet Rock",
		rating: 3,
		num: -5000,
  },
	ascendingkey: {
		shortDesc: "Filler text - one sec.",
		name: "Ascending Key",
		rating: 3,
		num: -5000,
  },
	descendingkey: {
		shortDesc: "Filler text - one sec.",
		name: "Descending Key",
		rating: 3,
		num: -5000,
  },
};
