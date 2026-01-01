export const Scripts: ModdedBattleScriptsData = {
 	
	inherit: 'gen1',
	gen: 1,
	init() {
		this.modData('Learnsets', 'poliwrath').learnset.brickbreak = ['1L1'];
	},

	teambuilderConfig: {
		rbyTradebacks: true,
	},
};
