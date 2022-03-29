export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen2',
	gen: 2,
	
	init: function () {
		this.modData('Learnsets', 'scyther').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'heracross').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'pinsir').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'forretress').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'beedrill').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'ariados').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'yanma').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'ledian').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'parasect').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'crobat').learnset.swarmattack = ['2L1'];
		
		this.modData('Learnsets', 'umbreon').learnset.blackhole = ['2L1'];
		this.modData('Learnsets', 'houndoom').learnset.blackhole = ['2L1'];
		this.modData('Learnsets', 'murkrow').learnset.blackhole = ['2L1'];
		this.modData('Learnsets', 'clefable').learnset.blackhole = ['2L1'];
		
		this.modData('Learnsets', 'umbreon').learnset.blackholes = ['2L1'];
	},
};
