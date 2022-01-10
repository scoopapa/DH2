export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		
		//Generation 1
		this.modData('Learnsets', 'venusaur').learnset.mysticalfire = ['8L1'];
		this.modData('Learnsets', 'venusaur').learnset.slackoff = ['8L1'];
		
		delete this.modData('Learnsets', 'clefable').learnset.moonblast;
		delete this.modData('Learnsets', 'clefable').learnset.teleport;
		
		this.modData('Learnsets', 'victreebel').learnset.flytrap = ['8L1'];
		delete this.modData('Learnsets', 'victreebel').learnset.strengthsap;
		
		this.modData('Learnsets', 'golem').learnset.swordsdance = ['8L1'];
		
		this.modData('Learnsets', 'omastar').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'omastar').learnset.flameburst = ['8L1'];
		this.modData('Learnsets', 'omastar').learnset.thunderburst = ['8L1'];
		this.modData('Learnsets', 'omastar').learnset.leafburst = ['8L1'];
		delete this.modData('Learnsets', 'omastar').learnset.shellsmash;
		
		this.modData('Learnsets', 'articuno').learnset.focusblast = ['8L1'];
		this.modData('Learnsets', 'articuno').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'articuno').learnset.taunt = ['8L1'];
		
		delete this.modData('Learnsets', 'mew').learnset.dragondance;
		delete this.modData('Learnsets', 'mew').learnset.icebeam;
		delete this.modData('Learnsets', 'mew').learnset.spikes;
		delete this.modData('Learnsets', 'mew').learnset.swordsdance;
		delete this.modData('Learnsets', 'mew').learnset.trick;
	},
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['MV'],
	},
};