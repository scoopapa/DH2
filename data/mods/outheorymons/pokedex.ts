export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
   zarude: {
      inherit: true,
		baseStats: {hp: 105, atk: 110, def: 105, spa: 80, spd: 95, spe: 105},
      abilities: {0: "Leaf Guard", 1: "Tough Claws"},
   },
   starmie: {
      inherit: true,
      baseStats: {hp: 60, atk: 75, def: 85, spa: 115, spd: 85, spe: 115},
   },
};
