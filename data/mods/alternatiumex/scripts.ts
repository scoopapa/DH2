export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Alternatium EX'],
		customDoublesTiers: ['Alternatium EX'],
	},
	
	init: function () {
		this.modData("Learnsets", "oricorio").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.fierydance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.firespin = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.twirlingdance = ["8L1"];
	},
	
	pokemon: {
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			if ('staccato' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		}
	},
};