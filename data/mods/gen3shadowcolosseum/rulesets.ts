export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	shadowmechanic: {
		effectType: 'Rule',
		name: 'Shadow Mechanic',
		desc: "Turns any Pokemon with a Shadow move into a Shadow Pokemon.",
		onBegin() {
			this.add('rule', 'Shadow Mechanic: Turns any Pokemon with a Shadow move into a Shadow Pokemon');
		},
		onStart(pokemon) {
			const shadowMoves = [
				'shadowrush', 'shadowblitz', 'shadowwave', 'shadowbreak', 'shadowrave', 'shadowsky', 'shadowend', 'shadowstorm',
				'shadowpanic', 'shadowmist', 'shadowdown', 'shadowhold', 'shadowshed', 'shadowhalf', 'shadowsights', 'shadowbolt',
				'shadowchill', 'shadowfire', 'shadowblast',
			];
			if (pokemon.hasMove(shadowMoves)) {
				this.add('-anim', pokemon, "Hex", pokemon);
				this.add('-message', `${pokemon.name} has sealed its heart!`);
				pokemon.addVolatile('shadow');
			}
		},
		onBasePowerPriority: 1,
		onBasePower(basePower, source, target, move) {
			if (move.type === 'Shadow') {
				if (target.volatiles['shadow']) {
					return this.chainModify(0.5);
				} else {
					return this.chainModify(2);
				}
			}
		},
	},
};
