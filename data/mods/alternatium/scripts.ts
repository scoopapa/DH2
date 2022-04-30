export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		
		//this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		this.modData("Learnsets", "linoone").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.vacuumwave = ["8L1"];
		delete this.modData('Learnsets', 'linoone').learnset.bellydrum;
	}
	
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Alternatium'],
		customDoublesTiers: ['Alternatium'],
	},
	
	// included for Aura Break
	pokemon: {
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let neutralizinggas = false;
			let aurabreak = false;
			const aurabreakAbilities = ["adaptability", "aerilate", "analytic", "darkaura", "flareboost", "fairyaura", "galvanize", "guts", 
				"hustle", "ironfist", "packleader", "pixilate", "poisontouch", "punkrock", "refrigerate", "sandforce", "shadowworld", "sheerforce",
				"solarpower", "steelworker", "strongjaw", "technician", "toughclaws", "transistor", "waterbubble", "watercycle", "forecast"];
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed && !pokemon.abilityData.ending) {
					neutralizinggas = true;
					break;
				}
				if (pokemon.ability === ('aurabreak' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed) {
					aurabreak = true;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID)) ||
					(aurabreak && aurabreakAbilities.includes(this.ability))) &&
				!this.getAbility().isPermanent
				)
			);
		},
	},
}; 