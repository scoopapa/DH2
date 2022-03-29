export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen2',
	gen: 2,
	
	
	init: function () {
		pokemon: {
		getDamage(pokemon, target, move, suppressMessages) {
		//Parry damage reduction
        if (target.volatiles['parry']) {
            damage = Math.floor(damage / 2);
			}
		}
	},
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
		
		this.modData('Learnsets', 'machamp').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'electabuzz').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'magmar').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'golduck').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'primape').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'hitmonchan').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'hitmonlee').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'hitmontop').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'wobuffet').learnset.parry = ['2L1'];
	},
};
