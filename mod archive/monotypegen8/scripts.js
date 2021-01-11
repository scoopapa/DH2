'use strict';

let BattleScripts = {
	init: function () {
		this.modData('Learnsets', 'ampharos').learnset.energyball = ['7L1'];
		this.modData('Learnsets', 'ampharos').learnset.tailglow = ['7L1'];
		
		this.modData('Learnsets', 'pidgeot').learnset.focusblast = ['7L1'];
		
		this.modData('Learnsets', 'smeargle').learnset.freezingfire = ['7L1'];
		this.modData('Learnsets', 'smeargle').learnset.burningice = ['7L1'];
		this.modData('Learnsets', 'smeargle').learnset.coaltrap = ['7L1'];
		this.modData('Learnsets', 'smeargle').learnset.fangcharge = ['7L1'];
		this.modData('Learnsets', 'smeargle').learnset.buzzbomb = ['7L1'];
		this.modData('Learnsets', 'smeargle').learnset.crystalbeam = ['7L1'];
		
		this.modData('Learnsets', 'heatmor').learnset.coaltrap = ['7L1'];

		this.modData('Learnsets', 'golisopod').learnset.healorder = ['7L1'];
	
	},
};

exports.BattleScripts = BattleScripts;
