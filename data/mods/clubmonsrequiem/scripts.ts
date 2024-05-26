export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["CM", "CM Ubers", "CM (NFE)"],
	},
	init() {		
		for (const id in this.dataCache.Pokedex) {
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon || !newMon.copyData) continue; // weeding out Pokémon that aren't new
			const copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];

			if (!newMon.types && copyData.types) newMon.types = copyData.types;
			if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
			if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
			if (!newMon.num && copyData.num) newMon.num = copyData.num * -1; // inverting the original's dex number
			if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
			if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
			if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
			if (!newMon.color && copyData.color) newMon.color = copyData.color;
			if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;

			let copyMoves = newMon.copyData;
			if (newMon.copyMoves) copyMoves = newMon.copyMoves;
			if (copyMoves) {
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = {learnset: {}}; // create a blank learnset entry so we don't need a learnsets file (thank you ink)
				const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = learnset[moveid].filter(
						(method) => !method.includes('S')
					);
				}
				if (newMon.movepoolAdditions) {
					for (const move of newMon.movepoolAdditions) {
						this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
					}
				}
				if (newMon.movepoolDeletions) {
					for (const move of newMon.movepoolDeletions) {
						delete this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)];
					}
				}
				// hard-coding a bit for Eclipseroid specifically (may rework if we get more fusions later but kinda doubt)
				if (newMon.name === 'Eclipseroid') {
					for (const moveid in this.dataCache.Learnsets[this.toID("Lunatone")].learnset) {
						this.modData('Learnsets', id).learnset[moveid] = this.dataCache.Learnsets[this.toID("Lunatone")].learnset[moveid].filter(
							(method) => !method.includes('S')
						);
					}
				}
			}
		}
	},
	pokemon: {
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAbility(this)) return null;
			if ((this.hasAbility('hoverdrive') && this.battle.field.isTerrain('electricterrain')) && !this.battle.suppressingAbility(this)) return false;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
	},
};
