export const Moves: {[k: string]: ModdedMoveData} = {
	orderup: {
		num: 856,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Order Up",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onHit(target, source){
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in source.storedStats) {
				if (source.storedStats[s] > bestStat) {
					statName = s;
					bestStat = source.storedStats[s];
				}
			}
			this.boost({[statName]: length}, source);
		},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "Dragon",
	},
};