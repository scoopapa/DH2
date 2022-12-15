export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3',
	gen: 3,
   init: function () {
		
		const specialTypes = ['Bug', 'Fighting', 'Flying', 'Ground', 'Ghost', 'Normal', 'Poison', 'Rock', 'Steel'];
		let newCategory = '';
		for (const i in this.moves.all()) {
			if (!this.moves.all()[i]) console.log(i);
			if (this.moves.all()[i].category === 'Status') continue;
			newCategory = specialTypes.includes(this.moves.all()[i].type) ? 'Special' : 'Physical';
			if (newCategory !== this.moves.all()[i].category) {
				this.modData('Moves', this.moves.all()[i].id).category = newCategory;
			}
		}
	},
};
