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
		category: "Special",
		name: "XYZ-Alpha Beam",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
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
		flags: {protect: 1, mirror: 1},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) return 5;
		},
	},
	tranbeam: {
		num: 304,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Tran Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	musicalrenaissance: {
		num: 304,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Musical Renaissance",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
		onModifyType(move, pokemon) {
			switch (pokemon.ability) {
			case 'orichalcumpulse':
				move.type = 'Fire';
				break;
			case 'hadronengine':
				move.type = 'Electric';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.ability === 'orichalcumpulse') move.category = "Physical";
		},
		onHit(target, source, move) {
			switch (pokemon.ability) {
			case 'orichalcumpulse':
				source.setAbility('hadronengine');
				break;
			case 'hadronengine':
				source.setAbility('orichalcumpulse');
				break;
			}
		}
	},
};
