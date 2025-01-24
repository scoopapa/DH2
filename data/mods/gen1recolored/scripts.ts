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
		delete this.modData('Learnsets', 'seadra').learnset.icebeam;
		delete this.modData('Learnsets', 'seadra').learnset.blizzard;
		this.modData("Learnsets", "seadra").learnset.fireblast = ["1L1"];
		delete this.modData('Learnsets', 'horsea').learnset.icebeam;
		delete this.modData('Learnsets', 'horsea').learnset.blizzard;
		// Charizard
		this.modData("Learnsets", "charizard").learnset.razorwind = ["1L1"];
		// Primal Cry
		this.modData('Learnsets', 'articuno').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'zapdos').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'moltres').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'dodrio').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'pidgeot').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'fearow').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'farfetchd').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'aerodactyl').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'rhydon').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'lapras').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'dragonite').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'venusaur').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'blastoise').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'charizard').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'marowak').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'kangaskhan').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'machamp').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'nidoking').learnset.primalcry = ["1L1"];
		this.modData('Learnsets', 'nidoqueen').learnset.primalcry = ["1L1"];
		// Other
		this.modData('Learnsets', 'exeggutor').learnset.softboiled = ["1L1"];
		this.modData('Learnsets', 'arbok').learnset.softboiled = ["1L1"];
		this.modData('Learnsets', 'vaporeon').learnset.recover = ["1L1"];
		this.modData('Learnsets', 'muk').learnset.recover = ["1L1"];
		this.modData('Learnsets', 'muk').learnset.nastygoo = ["1L1"];
		delete this.modData('Learnsets', 'muk').learnset.explosion;
		delete this.modData('Learnsets', 'grimer').learnset.explosion;
	},
};
