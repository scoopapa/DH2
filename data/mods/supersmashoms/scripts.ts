import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Flipped', 'Tier Shift', 'Convergence', 'Mix and Mega', 'STABmons', 'Inheritance', 'Re-Evolution', 'Pokebilities', 'Sketchmons', 'Cross Evolution', 'Almost Any Ability', '350 Cup', 'Frantic Fusions', 'Bonus Type', 'Revelationmons', 'Nature Swap','Formemons'],
	},	
	pokemon: {
		onPreStart(target) {
			const PokebilitiesList = ["Hawlucha", "Clodsire"];
			console.log(target, target.name);
			if (!PokebilitiesList.includes(target.name)) return;
			target.m.innates = Object.keys(target.species.abilities)
					.map(key => this.toID(target.species.abilities[key as "0" | "1" | "H" | "S"]))
					.filter(ability => ability !== target.ability);
			if (target.m.innates) {
				for (const innate of target.m.innates) {
					if (target.hasAbility(innate)) continue;
					target.addVolatile("ability:" + innate, target);
				}
			}
		},
		onDamage(damage, target, source, effect) {
			const PokebilitiesList = ["Hawlucha", "Clodsire"];
			if (!PokebilitiesList.includes(target.name)) return;
			if (target.species.abilities['0'].id && target.species.abilities['1'].id && target.species.abilities['H'].id && target.species.abilities['S'].id !== "magicguard") return;
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
	},
	
	init() {
	
	},
};