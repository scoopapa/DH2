export const Moves: {[k: string]: ModdedMoveData} = {
	aquaticlight: {
		num: 100001,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Aquatic Light",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	stonedance: {
		num: 100001,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Stone Dance",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	xyzalphabeam: {
		num: 679,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "XYZ-Alpha Beam",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, target);
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	hydroustoxin: {
		num: 503,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Hydrous Toxin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) return 5;
		},
	},
};
