export const Items: {[itemid: string]: ModdedItemData} = {
	lightball: {
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onModifyAtkPriority: 1,
		onModifyAtk: function(atk, pokemon) { // Pichu, Pikachu, Raichu, Plusle, Minun, Pachirisu, Emolga, Dedenne or a Togedemaru
			let pikaClones = [ 'Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru', 'Morpeko'];
			if ( pikaClones.includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA: function(spa, pokemon) {
			let pikaClones = [ 'Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru', 'Morpeko'];
			if ( pikaClones.includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		itemUser: ['Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru', 'Morpeko'],
		num: 236,
		gen: 2,
		desc: "If held by a Pikachu, Raichu, Pichu, or Pikaclone, its Attack and Sp. Atk are doubled.",
	},
	evoscarf: {
		name: "Evo Scarf",
		spritenum: 251,
		fling: {
			basePower: 30,
		},
		onModifyAtkPriority: 1,
		onModifyAtk: function(atk, pokemon) {
			let eeveelutions = [ 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Umbreon', 'Espeon', 'Leafeon', 'Glaceon', 'Sylveon', 'Regaleon', 'Nectareon', 'Ghouleon'];
			if ( eeveelutions.includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA: function(spa, pokemon) {
			let eeveelutions = [ 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Umbreon', 'Espeon', 'Leafeon', 'Glaceon', 'Sylveon', 'Regaleon', 'Nectareon', 'Ghouleon'];
			if ( eeveelutions.includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		itemUser: [ 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Umbreon', 'Espeon', 'Leafeon', 'Glaceon', 'Sylveon', 'Regaleon', 'Nectareon', 'Ghouleon'],
		num: 236,
		gen: 2,
		desc: "If held by an Eevee or Eeveelution, its Attack and Sp. Atk are doubled.",
	},
	darkball: {
		name: "Dark Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Mimikyu') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Mimikyu') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Mimikyu"],
		num: 236,
		gen: 2,
		desc: "If held by a Mimikyuu, its Def and Sp. Def are doubled.",
	},
};