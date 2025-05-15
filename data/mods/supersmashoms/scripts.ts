import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Flipped', 'Tier Shift', 'Convergence', 'Mix and Mega', 'STABmons', 'Inheritance', 'Re-Evolution', 'Pokebilities', 'Sketchmons', 'Cross Evolution', 'Almost Any Ability', '350 Cup', 'Frantic Fusions', 'Bonus Type', 'Revelationmons', 'Nature Swap','Formemons'],
	},	
	
	init() {
	
	},
};