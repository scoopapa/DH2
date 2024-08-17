export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['ASODH', 'ASODH NFE', 'ASODH Ubers'],
		customDoublesTiers: ['ASODH', 'ASODH NFE', 'ASODH Ubers'],
	},
	init() {
	  this.modData('Learnsets', 'stonjourner').learnset.zenheadbutt = ['9M'];
	  this.modData('Learnsets', 'stonjourner').learnset.psychic = ['9M'];
	}
  };
  