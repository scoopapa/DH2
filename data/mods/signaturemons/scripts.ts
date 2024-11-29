export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	/*teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["Sign", "NoSign"],
	},*/
	init() {
		//Add signature moves to learnsets (by dex number order)
		//Gen 1
		this.modData('Learnsets', 'venusaur').learnset.greatflower = ['9L1'];
		this.modData('Learnsets', 'charizard').learnset.greatflame = ['9L1'];
		this.modData('Learnsets', 'blastoise').learnset.greatflood = ['9L1'];
		this.modData('Learnsets', 'dugtrio').learnset.tripledig = ['9L1'];
		this.modData('Learnsets', 'dugtrioalola').learnset.tripledig = ['9L1'];
		this.modData('Learnsets', 'tentacruel').learnset.tentaclelock = ['9L1'];

		//Gen 3
		this.modData('Learnsets', 'zangoose').learnset.whiteclaw = ['9L1'];

		//Gen 4
		//this.modData('Learnsets', 'froslass').learnset.curseofsnow = ['9L1'];

		//Gen 9
		this.modData('Learnsets', 'toedscruel').learnset.tentaclelock = ['9L1'];
	}
};
