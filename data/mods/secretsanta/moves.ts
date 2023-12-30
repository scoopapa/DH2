export const Moves: {[k: string]: ModdedMoveData} = {
	aquaticlight: {
		num: 100001,
		accuracy: 100,
		shortDesc: "20% chance to paralyze",
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
		num: 100002,
		accuracy: 100,
		shortDesc: "30% chance to paralyze",
		basePower: 85,
		category: "Special",
		name: "Stone Dance",
		pp: 10,
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
		num: 100003,
		accuracy: 100,
		shortDesc: "Lowers the foe's highest stat.",
		basePower: 90,
		category: "Special",
		name: "XYZ-Alpha Beam",
		pp: 10,
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
				this.boost({[statName]: -1}, target);
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	hydroustoxin: {
		num: 100004,
		accuracy: 100,
		shortDesc: "Automatically crits against poisoned foes.",
		basePower: 80,
		category: "Special",
		name: "Hydrous Toxin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		onModifyMove(move, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) move.critRatio = 5;
		},
	},
	tranbeam: {
		num: 100005,
		shortDesc: "Does nothing (placeholder)",
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
		num: 100006,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Musical Renaissance",
		shortDesc: "Changes the user's ability from Orichalcum Pulse to Hadron Engine and vice versa.",
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
			switch (source.ability) {
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
