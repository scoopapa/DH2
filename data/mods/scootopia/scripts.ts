export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: "gen9",
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
	},
	init() {
		for (const side in this.sides) {
			this.sides[side].usedSuperType = false;
			this.sides[side].superTypeUser = "";
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
			if ((this.hasAbility('levitate') || 
				(this.hasAbility('xenospore') && this.species.id !== 'flocuranexus')) && 
				!this.battle.suppressingAttackEvents()
			) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			if ('lodestone' in this.volatiles) return false;
			return item !== 'airballoon';
		}
	}
};