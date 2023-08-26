export const Pokedex: {[k: string]: ModdedSpeciesData} = {

	pogguest: {
		num: 3001,
		name: "Pogguest",
		types: ["Normal"],
		baseStats: {hp: 70, atk: 70, def: 70, spa: 70, spd: 70, spe: 70},
		abilities: {0: "Oblivious"},
		weightkg: 8,
		eggGroups: ["Field"],
	},
	
	athleetah: {
        num: 3002,
        name: "Athleetah",
        types: ["Normal", "Ground"],
        baseStats: {hp: 65, atk: 80, def: 65, spa: 65, spd: 65, spe: 145},
        abilities: {0: "Sprinter", 1: "Limber", H: "Quick Feet"},
        heightm: 1.6,
        weightkg: 45,
        color: "Yellow",
        eggGroups: ["Field", "Human-Like"],
        gen: 8,
    },

};
