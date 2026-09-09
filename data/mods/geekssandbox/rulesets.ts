export const Rulesets: {[k: string]: ModdedFormatData} = {
	nocritmod: {
	effectType: 'Rule',
	name: 'No Crit Mod',
	desc: 'Every damaging move cannot crit',
	onCriticalHit(target, move) {
		for (const pokemon of this.getAllActive()) {
		if (pokemon === target || pokemon.fainted) continue;
			return false;
			}
		},
	},
};