export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen9',
	gen: 9,
	
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['White Tusk'],
	},
	
	init() {
		for (const id in this.dataCache.Pokedex) {
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset) {
				const learnset = this.modData('Learnsets', this.toID(id)).learnset;
				this.modData('Learnsets', this.toID(id)).learnset.terablast = ["8M"];
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
			if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			for (const target of this.battle.getAllActive()) {
				if (target.hasAbility('antigravity')) {
					return null;
				}
			}
			return item !== 'airballoon';
		},
	},
};