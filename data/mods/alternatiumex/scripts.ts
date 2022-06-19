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
		
		this.modData("Learnsets", "ribombee").learnset.gigadrain = ["8L1"];
		this.modData("Learnsets", "ribombee").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "ribombee").learnset.magiccoat = ["8L1"];

		this.modData("Learnsets", "ribombeetotem").learnset.acidspray = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.mysticalfire = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.strengthsap = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.venoshock = ["8L1"];

		this.modData("Learnsets", "araquanid").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "araquanid").learnset.recover = ["8L1"];

		this.modData("Learnsets", "araquanidtotem").learnset.airslash = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.healorder = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.hurricane = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.venomdrench = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.venoshock = ["8L1"];
		
		this.modData("Learnsets", "vikavolt").learnset.geargrind = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.irontail = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.metalclaw = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.switcheroo = ["8L1"];
		delete this.modData('Learnsets', 'vikavolt').learnset.agility;
		delete this.modData('Learnsets', 'vikavolt').learnset.stickyweb;

		this.modData("Learnsets", "vikavolttotem").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "vikavolttotem").learnset.uturn = ["8L1"];
		delete this.modData('Learnsets', 'vikavolttotem').learnset.agility;
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