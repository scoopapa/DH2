'use strict';
exports.BattleAbilities = {
	"electricshell": {
		shortDesc: "If Grassy Terrain is active, this Pokemon's Defense is multiplied by 1.5.",
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('electricterrain')) return this.chainModify(1.5);
		},
		id: "electricshell",
		name: "Electric Shell",
		rating: 1,
		num: 1001,
	},
	"energizer": {
		desc: "This Pokemon's Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
		shortDesc: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
		onSourceFaint(target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: 1}, source);
			}
		},
		id: "energizer",
		name: "Energizer",
		rating: 3.5,
		num: 1002,
	},
};