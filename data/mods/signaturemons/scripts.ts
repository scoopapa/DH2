export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["Sign", "NoSign"],
	},
	init() {
		//Add signature moves to learnsets (by dex number order)
		//Gen 1
		this.modData('Learnsets', 'venusaur').learnset.greatflower = ['9L1'];
		this.modData('Learnsets', 'charizard').learnset.greatflame = ['9L1'];
		this.modData('Learnsets', 'blastoise').learnset.greatflood = ['9L1'];
		this.modData('Learnsets', 'dugtrio').learnset.tripledig = ['9L1'];
		this.modData('Learnsets', 'dugtrioalola').learnset.tripledig = ['9L1'];
		this.modData('Learnsets', 'tentacruel').learnset.tentaclelock = ['9L1'];
		this.modData('Learnsets', 'snorlax').learnset.bellyflop = ['9L1'];

		//Gen 2
		this.modData('Learnsets', 'azumarill').learnset.bubbleball = ['9L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.fakebranch = ['9L1'];

		//Gen 3
		this.modData('Learnsets', 'spinda').learnset.spintowin = ['9L1'];
		this.modData('Learnsets', 'zangoose').learnset.whiteclaw = ['9L1'];
		this.modData('Learnsets', 'luvdisc').learnset.loveadvice = ['9L1'];

		//Gen 4
		this.modData('Learnsets', 'roserade').learnset.secretthorns = ['9L1'];
		this.modData('Learnsets', 'gastrodon').learnset.stickyslime = ['9L1'];
		this.modData('Learnsets', 'weavile').learnset.sinisterclaw = ['9L1'];
		this.modData('Learnsets', 'froslass').learnset.curseofsnow = ['9L1'];

		//Gen 5
		this.modData('Learnsets', 'scolipede').learnset.poisonwheel = ['9L1'];
		this.modData('Learnsets', 'hydreigon').learnset.triplethreat = ['9L1'];

		//Gen 6
		this.modData('Learnsets', 'clawitzer').learnset.waterbombshell = ['9L1'];
		this.modData('Learnsets', 'noivern').learnset.killerwail = ['9L1'];

		//Gen 7
		this.modData('Learnsets', 'mimikyu').learnset.snuggle = ['9L1'];

		//Gen 8
		this.modData('Learnsets', 'corviknight').learnset.armorwing = ['9L1'];

		//Gen 9
		this.modData('Learnsets', 'bellibolt').learnset.bellyspot = ['9L1'];
		this.modData('Learnsets', 'toedscruel').learnset.tentaclelock = ['9L1'];
	}
};
