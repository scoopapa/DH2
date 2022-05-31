export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3',
	gen: 3,
   init() {
		for (const i in this.data.Pokedex) {
			delete this.data.Pokedex[i].abilities['H'];
		}
		const specialTypes = ['Bug', 'Fighting', 'Flying', 'Ground', 'Ghost', 'Normal', 'Poison', 'Rock', 'Steel'];
		let newCategory = '';
		for (const i in this.data.Movedex) {
			if (!this.data.Movedex[i]) console.log(i);
			if (this.data.Movedex[i].category === 'Status') continue;
			newCategory = specialTypes.includes(this.data.Movedex[i].type) ? 'Special' : 'Physical';
			if (newCategory !== this.data.Movedex[i].category) {
				this.modData('Movedex', i).category = newCategory;
			}
		}
	},
};
