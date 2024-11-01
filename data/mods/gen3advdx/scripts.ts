export const Scripts: ModdedBattleScriptsData = {
	gen: 3,
	inherit: 'gen3',
	init() {
		for (const species in this.data.Pokedex) {
			delete this.data.Pokedex[species].abilities['H'];
		}
		this.modData("Learnsets", "armaldo").learnset.knockoff = ["3L1"];
		this.modData("Learnsets", "kabutops").learnset.knockoff = ["3L1"];
		this.modData("Learnsets", "armaldo").learnset.rapidspin = ["3L1"];
		this.modData("Learnsets", "kabutops").learnset.rapidspin = ["3L1"];
		this.modData("Learnsets", "donphan").learnset.slackoff = ["3L1"];
		this.modData("Learnsets", "donphan").learnset.bulkup = ["3L1"];
		this.modData("Learnsets", "dragonite").learnset.extremespeed = ["3L1"];
		this.modData("Learnsets", "dragonite").learnset.superpower = ["3L1"];
		this.modData("Learnsets", "crobat").learnset.batonpass = ["3L1"];
		this.modData("Learnsets", "crobat").learnset.glare = ["3L1"];
		this.modData("Learnsets", "crobat").learnset.destinybond = ["3L1"];
		this.modData("Learnsets", "dodrio").learnset.swordsdance = ["3L1"];
		this.modData("Learnsets", "dodrio").learnset.highjumpkick = ["3L1"];
		this.modData("Learnsets", "hariyama").learnset.skyuppercut = ["3L1"];
		this.modData("Learnsets", "ludicolo").learnset.haze = ["3L1"];
		this.modData("Learnsets", "ludicolo").learnset.rapidspin = ["3L1"];
		this.modData("Learnsets", "ludicolo").learnset.encore = ["3L1"];
		this.modData("Learnsets", "ludicolo").learnset.knockoff = ["3L1"];
		this.modData("Learnsets", "regice").learnset.recover = ["3L1"];
		this.modData("Learnsets", "gyarados").learnset.rockslide = ["3L1"];
		this.modData("Learnsets", "sableye").learnset.willowisp = ["3L1"];
		this.modData("Learnsets", "sableye").learnset.trick = ["3L1"];
		this.modData("Learnsets", "ariados").learnset.megahorn = ["3L1"];
		this.modData("Learnsets", "ariados").learnset.extremespeed = ["3L1"];
		this.modData("Learnsets", "ariados").learnset.spikes = ["3L1"];
		this.modData("Learnsets", "ariados").learnset.memento = ["3L1"];
		this.modData("Learnsets", "sunflora").learnset.weatherball = ["3L1"];
		this.modData("Learnsets", "sunflora").learnset.willowisp = ["3L1"];
		this.modData("Learnsets", "sunflora").learnset.overheat = ["3L1"];
		this.modData("Learnsets", "flygon").learnset.signalbeam = ["3L1"];
		this.modData("Learnsets", "walrein").learnset.slackoff = ["3L1"];
		this.modData("Learnsets", "cradily").learnset.leechseed = ["3L1"];
		this.modData("Learnsets", "typhlosion").learnset.superpower = ["3L1"];
		this.modData("Learnsets", "typhlosion").learnset.taunt = ["3L1"];
		this.modData("Learnsets", "typhlosion").learnset.eruption = ["3L1"];
		this.modData("Learnsets", "typhlosion").learnset.shadowball = ["3L1"];
		this.modData("Learnsets", "feraligatr").learnset.dragondance = ["3L1"];
		this.modData("Learnsets", "meganium").learnset.knockoff = ["3L1"];
		this.modData("Learnsets", "meganium").learnset.aromatherapy = ["3L1"];
		this.modData("Learnsets", "meganium").learnset.stunspore = ["3L1"];
	},
};
