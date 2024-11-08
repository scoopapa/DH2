export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['IF'],
	},	
	
	init() {
		
	},
	battle: {
	},
	actions: {
	},
	side: {
		addKarma(amount: number) {
			if(amount === 0) return;
			if(this.karma === undefined) this.karma = 0;
			this.karma += amount;
			this.battle.add('-message', `${this.name} gained ${amount} karma!`);
			this.battle.hint(`They now have ${this.karma} karma.`);
		},
		removeKarma(amount: number) {
			if(amount === 0) return;
			if(this.karma === undefined) this.karma = 0;
			this.karma -= amount;
			this.battle.add('-message', `${this.name} lost ${amount} karma!`);
			this.battle.hint(`They now have ${this.karma} karma.`);
		},
	},
	pokemon: {
		inherit: true,
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
			const abilityid = this.battle.toID(ability);
			return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			if ('staccato' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (
				(this.hasAbility('levitate') || 
				this.hasAbility('impalpable')) && 
				!this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
	},
};