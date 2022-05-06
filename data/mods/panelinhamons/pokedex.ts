export const Pokedex: {[k: string]: ModdedSpeciesData} = {
   abomasnow: {
      inherit: true,
      types: ["Ice", "Fairy"],
      baseStats: {hp: 105, atk: 102, def: 85, spa: 102, spd: 95, spe: 80},
      abilities: {0: "Technician", H: "Mountaineer"},
   },
   abomasnowmega: {
      inherit: true,
      types: ["Ice", "Fairy"],
      baseStats: {hp: 105, atk: 142, def: 115, spa: 142, spd: 135, spe: 30},
      abilities: {0: "Stakeout"},
   },
   aerodactyl: {
      inherit: true,
      types: ["Fire", "Rock"],
      baseStats: {hp: 80, atk: 100, def: 130, spa: 65, spd: 75, spe: 105},
      abilities: {0: "Levitate", H: "Rock Head"},
   },
   aerodactylmega: {
      inherit: true,
      types: ["Fire", "Rock"],
      baseStats: {hp: 80, atk: 110, def: 115, spa: 110, spd: 115, spe: 125},
      abilities: {0: "Hatred Meltdown"},
   },
   alakazam: {
      inherit: true,
      baseStats: {hp: 90, atk: 60, def: 100, spa: 100, spd: 130, spe: 90},
      abilities: {0: "Magic Guard", H: "Rough Skin"},
   }, 
   alakazammega: {
      inherit: true, 
      types: ["Psychic", "Ghost"],
      baseStats: {hp: 90, atk: 100, def: 100, spa: 140, spd: 160, spe: 80},
      abilities: {0: "Rough Skin"},
   },
   alcremie: {
      inherit: true,
      types: ["Fairy", "Poison"],
      baseStats: {hp: 255, atk: 5, def: 110, spa: 90, spd: 5, spe: 40},
      abilities: {0: "Natural Cure", H: "Stench"},
   },
   ampharos: {
      inherit: true,
      baseStats: {hp: 90, atk: 25, def: 85, spa: 130, spd: 130, spe: 55},
   },
   ampharosmmega: {
      inherit: true,
      baseStats: {hp: 90, atk: 45, def: 105, spa: 180, spd: 150, spe: 45},
      abilities: {0: "Friend Guard"},
   },
};
