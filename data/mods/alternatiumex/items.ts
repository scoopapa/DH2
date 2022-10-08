export const Items: {[itemid: string]: ItemData} = {
	lightball: {
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu-Unova') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu-Unova') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu-Unova"],
		shortDesc: "If held by a Pikachu-Unova, its Attack and Sp. Atk are doubled.",
		num: 236,
		gen: 2,
	},
	draconicclub: {
		name: "Draconic Club",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (source.baseSpecies.baseSpecies === 'Marowak') {
				if (effect && effect.effectType === 'Move') {
					this.add('-activate', source, 'item: Draconic Club'); 
					this.heal(source.baseMaxhp / 3, source, source, effect);
				}
			}
		},
		itemUser: ["Marowak"],
		shortDesc: "If held by Marowak, restores 1/3 of its max HP upon KOing a Pokemon.",
		num: -1,
		gen: 2,
	},
	earthenclub: {
		name: "Earthen Club",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Alolawak' && move.type === 'Ground') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Alolawak"],
		shortDesc: "If held by Alolawak, the power of Ground moves are doubled.",
		num: -2,
		gen: 2,
	},
	thickclub: {
		name: "Thick Club",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onSetStatus(status, target, source, effect) {
			if (target.baseSpecies.baseSpecies === 'Marowak-Alola-Totem') {
				if (status.id !== 'psn' && status.id !== 'tox' && status.id !== 'brn') return;
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] item: Thick Club');
				}
				return false;
			}
		},
		itemUser: ["Marowak-Alola-Totem"],
		shortDesc: "If held by Marowak-Totem, it is immune to burn and poison.",
		num: 258,
		gen: 2,
	},
	adamantorb: {
		name: "Adamant Orb",
		spritenum: 4,
		fling: {
			basePower: 60,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Archronos') {
				return this.chainModify(1.2);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Archronos') {
				return this.chainModify(0.8);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Archronos') {
				return this.chainModify(1.2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Archronos') {
				return this.chainModify(0.8);
			}
		},
		itemUser: ["Dialga"],
		num: 135,
		gen: 4,
		shortDesc: "Effect depends on the holder. (use /dt and the item name + user)",
	},
	lustrousorb: {
		name: "Lustrous Orb",
		spritenum: 265,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Palkia' && (move.type === 'Psychic' || move.type === 'Dragon')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Palkia') return;
			if (!pokemon.ignoringItem() && !this.field.isTerrain('')) {
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (!this.field.isTerrain('') && !pokemon.baseSpecies.name === 'Palkia') {
				pokemon.useItem();
			}
		},
		boosts: {
			atk: 1,
		},
		itemUser: ["Palkia"],
		num: 136,
		gen: 4,
		shortDesc: "Effect depends on the holder. (use /dt and the item name + user)",
	},
};