export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['IF'],
	},	
	
	init() {
		//melmetal
		this.modData("Learnsets", "melmetal").learnset.goombastomp = ["9L1"];
		
		//toxapex
		this.modData("Learnsets", "toxapex").learnset.fishingminigame = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.stankyleg = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.gofish = ["9L1"];
		
		//bramblin
		this.modData("Learnsets", "bramblin").learnset.bounce = ["9L1"];
		this.modData("Learnsets", "bramblin").learnset.eruption = ["9L1"];
		this.modData("Learnsets", "bramblin").learnset.multiattack = ["9L1"];
		this.modData("Learnsets", "bramblin").learnset.solarblade = ["9L1"];
		
		//gholdengo
		this.modData("Learnsets", "gholdengo").learnset.mogoff = ["9L1"];
		this.modData("Learnsets", "gholdengo").learnset.goombastomp = ["9L1"];
		this.modData("Learnsets", "gholdengo").learnset.stankyleg = ["9L1"];
		
		//kingler
		this.modData("Learnsets", "kingler").learnset.icehammer = ["9L1"];
		this.modData("Learnsets", "kingler").learnset.goombastomp = ["9L1"];
		this.modData("Learnsets", "kingler").learnset.gofish = ["9L1"];
		
		//feebas
		this.modData("Learnsets", "feebas").learnset.gofish = ["9L1"];
		
		//glaceon
		this.modData("Learnsets", "glaceon").learnset.surf = ["9L1"];
		this.modData("Learnsets", "glaceon").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "glaceon").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "glaceon").learnset.goombastomp = ["9L1"];
		
		//runerigus
		this.modData("Learnsets", "runerigus").learnset.recover = ["9L1"];
		this.modData("Learnsets", "runerigus").learnset.teleport = ["9L1"];
		
		//wyrdeer
		this.modData("Learnsets", "wyrdeer").learnset.goombastomp = ["9L1"];
		
		//moltres
		this.modData("Learnsets", "moltres").learnset.futuresight = ["9L1"];
		this.modData("Learnsets", "moltres").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "moltres").learnset.psyshock = ["9L1"];
		
		//hitmontop
		this.modData("Learnsets", "hitmontop").learnset.triplerkick = ["9L1"];
	}
};