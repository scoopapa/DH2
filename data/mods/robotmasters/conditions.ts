export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	sharpsteel: {
		name: "Sharp Steel",
		onSideStart(side) {
			this.add('-sidestart', side, 'move: Sharp Steel');
		},
		onSwitchIn(pokemon) {
			if (pokemon.hasItem('heavydutyboots')) return;
			const steelHazard = this.dex.getActiveMove('stealthrock');
			steelHazard.type = 'Steel';
			const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
			this.damage(pokemon.maxhp * (2 ** typeMod) / 8);
		},
	},
	blackholestockpile: {
		name: "Black Hole Stockpile",
		noCopy: true,
		onStart(target) {
			this.effectState.layers = 1;
			this.add('-start', target, 'stockpile1');
		},
		onRestart(target) {
			if (this.effectState.layers >= 3) return false;
			this.effectState.layers++;
			this.add('-start', target, 'stockpile' + this.effectState.layers);
		},
	},
};
