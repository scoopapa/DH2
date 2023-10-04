export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Theorymons', 'OU', 'UU', 'RU', 'NU', 'PU', '(PU)'],
	},
   init() {
      this.modData('Learnsets', 'tyranitar').learnset.knockoff = ['9L1'];
      this.modData('Learnsets', 'salamence').learnset.defog = ['9L1'];
      this.modData('Learnsets', 'delphox').learnset.moonblast = ['9L1'];
      this.modData('Learnsets', 'slitherwing').learnset.spikes = ['9L1'];
      this.modData('Learnsets', 'taurospaldeacombat').learnset.playrough = ['9L1'];
      this.modData('Learnsets', 'cloyster').learnset.bonerush = ['9L1'];
	},
};
