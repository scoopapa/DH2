export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
        excludeStandardTiers: true,
        customTiers: ['FERE', 'FERENFE', 'FERELC', 'Silverade'],
	},
	pokemon: {
		inherit: true,
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!this.battle.dex.types.isName(type)) {
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;
	
			const negateImmunity = !this.battle.runEvent('NegateImmunity', this, type);
			const notImmune = type === 'Ground' ?
				this.isGrounded(negateImmunity) :
				negateImmunity || this.battle.dex.getImmunity(type, this);
			if (notImmune) return true;
			if (message) {
				if (notImmune === null) {
					this.battle.add('-immune', this, '[from] ability: ' + this.getAbility().name);
				} else {
					this.battle.add('-immune', this);
				}
			}
			return false;
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather/*) return true;
			if (*/|| 'ingrain' in this.volatiles/* && this.battle.gen >= 4) return true;
			if (*/|| 'smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (
				(this.hasAbility(['levitate', 'aerialassassin'])) &&
				!this.battle.suppressingAbility(this)
			) return null;
			if ('magnetrise' in this.volatiles/*) return false;
			if (*/|| 'telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		 },
  },
};
