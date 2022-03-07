export const Scripts: {[k: string]: ModdedBattleScriptsData} = {

	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Paleomons', 'Paleomons NFE', 'Paleomons LC'],
		customDoublesTiers: ['Paleomons', 'Paleomons NFE', 'Paleomons LC'],
	},

	entityStats: {
		shellosentity: {
			num: 422,
			name: "Shellos-Entity",
			baseSpecies: "Shellos",
			baseForme: "Entity",
			evos: ["Gastrodon-Entity", "Gastrodon-Entity-East"],
			types: ["Poison"],
			baseStats: {hp: 70, atk: 50, def: 60, spa: 50, spd: 60, spe: 40},
			abilities: {0: "Gooey", H: "Poison Point"},
			weightkg: 6.3,
		},
		gastrodonentity: {
			num: 423,
			name: "Gastrodon-Entity",
			baseSpecies: "Gastrodon",
			baseForme: "Entity",
			types: ["Poison", "Dragon"],
			baseStats: {hp: 120, atk: 95, def: 60, spa: 100, spd: 50, spe: 50},
			abilities: {0: "Gooey", H: "Damp"},
			weightkg: 29.9,
			prevo: "Shellos-Entity",
		},
		gastrodonentityeast: {
			num: 423,
			name: "Gastrodon-Entity-East",
			baseSpecies: "Gastrodon",
			forme: "Entity-East",
			types: ["Poison", "Psychic"],
			baseStats: {hp: 100, atk: 75, def: 80, spa: 80, spd: 70, spe: 70},
			abilities: {0: "Gooey", H: "Neuroforce"},
			weightkg: 29.9,
			prevo: "Shellos-Entity",
		},
	},

	pokemon: {
		runEffectiveness(move: ActiveMove) {
			let totalTypeMod = 0;
			for (const type of this.getTypes()) {
				if (type === 'Fairy' && (move as any).carboniferousBoosted) {
					totalTypeMod += 1;
				} else {
					let typeMod = this.battle.dex.getEffectiveness(move, type);
					typeMod = this.battle.singleEvent('Effectiveness', move, null, this, type, move, typeMod);
					totalTypeMod += this.battle.runEvent('Effectiveness', this, type, move, typeMod);
				}
			}
			return totalTypeMod;
		},
	},
};