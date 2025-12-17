export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['AG', 'OU', 'UUBL', 'UU', 'RUBL', 'RU'],
		customDoublesTiers: ['AG', 'OU', 'UUBL', 'UU', 'RUBL', 'RU'],
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