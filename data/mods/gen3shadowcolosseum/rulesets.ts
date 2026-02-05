export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	shadowmechanic: {
		effectType: 'Rule',
		name: 'Shadow Mechanic',
		desc: "Turns any Pokemon with a Shadow move into a Shadow Pokemon.",
		onBegin() {
			this.add('rule', 'Shadow Mechanic: Turns any Pokemon with a Shadow move into a Shadow Pokemon');
		},
		onStart(pokemon) {
			console.log(pokemon.baseSpecies); // sanity check
			const shadowMoves = [
				'shadowrush', 'shadowblitz', 'shadowwave', 'shadowbreak', 'shadowrave', 'shadowsky', 'shadowend', 'shadowstorm',
				'shadowpanic', 'shadowmist', 'shadowdown', 'shadowhold', 'shadowshed', 'shadowhalf', 'shadowsights', 'shadowbolt',
				'shadowchill', 'shadowfire', 'shadowblast',
			];
			let shadowCount = 0;
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				const move = this.dex.moves.get(moveid);
				console.log(move.basePower);
				if (move.type === 'Shadow' || pokemon.hasMove(shadowMoves)) {
					shadowCount++;
					pokemon.addVolatile('shadow');
				}
				if (shadowCount > 0) {
					pokemon.addVolatile('shadow');
				}
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
