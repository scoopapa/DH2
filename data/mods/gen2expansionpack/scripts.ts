export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen2',
	gen: 2,
	init() {
		const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Dark', 'Psychic', 'Dragon', 'Fairy'];
		let newCategory = '';
		for (const i in this.data.Moves) {
			if (!this.data.Moves[i]) console.log(i);
			if (this.data.Moves[i].category === 'Status') continue;
			newCategory = specialTypes.includes(this.data.Moves[i].type) ? 'Special' : 'Physical';
			if (newCategory !== this.data.Moves[i].category) {
				this.modData('Moves', i).category = newCategory;
			}
		}
	},
	teambuilderConfig: {
		specialTypes: ['Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Psychic', 'Dark', 'Dragon', 'Fairy'],
	},
	// Guardia & Mimmeo held items
	pokemon: {
		inherit: true,
		getStat(statName, unboosted, unmodified, fastReturn) {
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// Stat boosts.
			if (!unboosted) {
				let boost = this.boosts[statName];
				if (boost > 6) boost = 6;
				if (boost < -6) boost = -6;
				if (boost >= 0) {
					const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
					stat = Math.floor(stat * boostTable[boost]);
				} else {
					const numerators = [100, 66, 50, 40, 33, 28, 25];
					stat = Math.floor(stat * numerators[-boost] / 100);
				}
			}

			if (this.status === 'par' && statName === 'spe') {
				stat = Math.floor(stat / 4);
			}

			if (!unmodified) {
				// Burn attack drop is checked when you get the attack stat upon switch in and used until switch out.
				if (this.status === 'brn' && statName === 'atk') {
					stat = Math.floor(stat / 2);
				}
			}

			// Gen 2 caps stats at 999 and min is 1.
			stat = this.battle.clampIntRange(stat, 1, 999);
			if (fastReturn) return stat;

			// Screens
			if (!unboosted) {
				if (
					(statName === 'def' && this.side.sideConditions['reflect']) ||
					(statName === 'spd' && this.side.sideConditions['lightscreen'])
				) {
					stat *= 2;
				}
			}

			// Handle boosting items
			if (
				(['Cubone', 'Marowak', 'Marowak-Alola', 'Guardia'].includes(this.baseSpecies.name) && this.item === 'thickclub' && statName === 'atk') ||
				(this.baseSpecies.name === 'Pikachu' && this.item === 'lightball' && statName === 'spa')
			) {
				stat *= 2;
			} else if (['Ditto', 'Mimmeo'] .includes(this.baseSpecies.name) && this.item === 'metalpowder' && ['def', 'spd'].includes(statName)) {
				stat = Math.floor(stat * 1.5);
			}

			return stat;
		},
	}
};
