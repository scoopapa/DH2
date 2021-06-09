export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen7',
	init: function () {
    this.modData('Learnsets', 'gardevoir').learnset.mindtap = ['7L1'];
    this.modData('Learnsets', 'rayquaza').learnset.psychodescent = ['7L1'];
    this.modData('Learnsets', 'venusaur').learnset.floralswirl = ['7L1'];
	},
};
