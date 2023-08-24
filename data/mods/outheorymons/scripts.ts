export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Theorymons', 'OU', 'UU', 'RU', 'NU', 'PU', '(PU)'],
	},
   init() {
      this.modData('Learnsets', 'tyranitar').learnset.knockoff = ['8L1'];
      this.modData('Learnsets', 'salamence').learnset.defog = ['8L1'];
      this.modData('Learnsets', 'delphox').learnset.moonblast = ['8L1'];
      this.modData('Learnsets', 'slitherwing').learnset.spikes = ['8L1'];
      this.modData('Learnsets', 'taurospaldeacombat').learnset.playrough = ['8L1'];
      this.modData('Learnsets', 'cloyster').learnset.bonerush = ['8L1'];
	},
};
