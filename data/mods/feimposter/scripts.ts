export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init() {
		// Automatically construct fusion learnsets! (Thank u scoopapa)
		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) {//make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				for (let name of learnsetFusionList) {					
					const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;//get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						if (this.dataCache.Moves[moveid].isNonstandard === 'Past') continue; //exclude dexited moves (I hope!) 
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
	},
	
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['FEIC'],
	},
	
	pokemon: {
		//Included for abilities that make the user non-grounded:
		//Levitate is checked for when running groundedness (ground immunity, iron ball, etc)
		//So we manually add a check for Magnetic Waves here as well,
		//Including a diffrent activation message 
		//so that the game doesn't report it as having Levitate when it procs.
		//AFFECTED ABILITIES: Magnetic Waves, Leviflame, Levitability
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!(type in this.battle.dex.data.TypeChart)) {
				if (type === 'Fairy' || type === 'Dark' || type === 'Steel') return true;
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;

			const negateResult = this.battle.runEvent('NegateImmunity', this, type);
			let isGrounded;
			if (type === 'Ground') {
				isGrounded = this.isGrounded(!negateResult);
				if (isGrounded === null) {
					if (message) {
						if (this.hasAbility('airborneoppression')) {
							this.battle.add('-immune', this, '[from] ability: Airborne Oppression');
						} else {
							this.battle.add('-immune', this, '[from] ability: Levitate');
						}
					}
					return false;
				}
			}
			if (!negateResult) return true;
			if ((isGrounded === undefined && !this.battle.dex.getImmunity(type, this)) || isGrounded === false) {
				if (message) {
					this.battle.add('-immune', this);
				}
				return false;
			}
			return true;
		},
		
		
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') || this.hasAbility('airborneoppression') 
				&& !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
		
		
        ignoringAbility() {
            // Check if any active pokemon have the ability Neutralizing Gas
            let recoveringfumes = false;
            for (const pokemon of this.battle.getAllActive()) {
                // can't use hasAbility because it would lead to infinite recursion
                if (pokemon.ability === ('recoveringfumes' as ID) && !pokemon.volatiles['gastroacid'] && !pokemon.abilityData.ending) {
                    recoveringfumes = true;
                    break;
                }
            }

            return !!(
                (this.battle.gen >= 5 && !this.isActive) ||
                ((this.volatiles['gastroacid'] || (recoveringfumes && this.ability !== ('recoveringfumes' as ID)))) &&
                !this.getAbility().isPermanent
			)
		},
	},
};
