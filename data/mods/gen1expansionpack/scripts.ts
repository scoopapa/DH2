export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen1',
	gen: 1,
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
		for (const i in this.data.Pokedex) {
			(this.data.Pokedex[i] as any).gender = 'N';
			(this.data.Pokedex[i] as any).eggGroups = null;
		}
	},
	teambuilderConfig: {
		rbyTradebacks: true,
		specialTypes: ['Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Psychic', 'Dark', 'Dragon', 'Fairy'],
		moveIsNotUseless(id: ID, species: Species, moves: string[], set: PokemonSet | null): boolean {
			switch (id) {
				// steel hierarchy
				case 'mirrorshot': if (moves.includes('magnetbomb')) return false;
				case 'magnetbomb': if (moves.includes('smartstrike')) return false;
				case 'smartstrike': return !moves.includes('ironhead');
				// dark hierarchy
				case 'brutalswing': if (moves.includes('feintattack')) return false;
				case 'feintattack': if (moves.includes('nightslash')) return false;
				case 'nightslash': if (moves.includes('falsesurrender')) return false;
				case 'falsesurrender': return !moves.includes('kowtowcleave');
			}
		},
	},
};
