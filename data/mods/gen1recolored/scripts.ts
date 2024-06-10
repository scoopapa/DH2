export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen1',
	gen: 1,
	init() {
		// Jolteon
		this.modData("Learnsets", "jolteon").learnset.jumpkick = ["1L1"];
		// Golem
		this.modData("Learnsets", "golem").learnset.avalanche = ["1L1"];
		this.modData("Learnsets", "golem").learnset.agility = ["1L1"];
		// Raichu
		this.modData("Learnsets", "raichu").learnset.jumpkick = ["1L1"];
		// Aerodactyl
		this.modData("Learnsets", "aerodactyl").learnset.rockslide = ["1L1"];
		// Onix
		this.modData("Learnsets", "onix").learnset.avalanche = ["1L1"];
		this.modData("Learnsets", "onix").learnset.blizzard = ["1L1"];
		// Magneton
		this.modData("Learnsets", "magneton").learnset.ioncannon = ["1L1"];
		this.modData("Learnsets", "magneton").learnset.fireblast = ["1L1"];
		this.modData("Learnsets", "magneton").learnset.recover = ["1L1"];
		// Gyarados
		this.modData("Learnsets", "gyarados").learnset.razorwind = ["1L1"];
		// Arcanine
		this.modData("Learnsets", "arcanine").learnset.thunderbolt = ["1L1"];
		this.modData("Learnsets", "arcanine").learnset.earthquake = ["1L1"];
		// Vileplume
		this.modData("Learnsets", "vileplume").learnset.amnesia = ["1L1"];
		// Ninetales
		this.modData("Learnsets", "ninetales").learnset.hypnosis = ["1L1"];
		this.modData("Learnsets", "ninetales").learnset.willowisp = ["1L1"];
		this.modData("Learnsets", "ninetales").learnset.nightshade = ["1L1"];
		// Seadra
		this.modData("Learnsets", "seadra").learnset.flamethrower = ["1L1"];
		// Charizard
		this.modData("Learnsets", "charizard").learnset.razorwind = ["1L1"];
	},
};
