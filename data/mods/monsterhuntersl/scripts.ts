export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['MHAG', 'MHOU', 'MHUUBL', 'MHUU', 'MHRUBL', 'MHRU'],
		customDoublesTiers: ['MHAG', 'MHOU', 'MHUUBL', 'MHUU', 'MHRUBL', 'MHRU'],
	},
	pokemon: {
		ignoringItem() {
		return !!(
			this.itemState.knockedOff || // Gen 3-4
			(this.battle.gen >= 5 && !this.isActive) ||
			(!this.getItem().ignoreKlutz && this.hasAbility('klutz')) ||
			this.volatiles['embargo'] || this.battle.field.pseudoWeather['magicroom']
			|| this.volatiles['stench']
		);
	}
	},
};