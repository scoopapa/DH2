export const Rulesets: {[k: string]: ModdedFormatData} = {
	randomtandemrule: {
		effectType: 'Rule',
		name: 'Random Tandem Rule',
		desc: ".",
		onValidateTeam(team) {
			if (team.length != 3) return "You must bring 3 Pokemon.";
		},
		onBegin() {
			for (const side of this.sides) {
				for (const pokemon of side.pokemon) {
					if (!pokemon.baseSpecies.mons) continue;
					
					let prob = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3];
					let num1 = this.sample(prob);
					let mon1 = pokemon.baseSpecies.mons[num1];
					prob = prob.filter(num => num !== num1);
					let num2 = this.sample(prob);
					let mon2 = pokemon.baseSpecies.mons[num2];
					
					let poke1 = this.dex.deepClone(mon1[0]);
					poke1.moves = mon1[1];
					
					let poke2 = this.dex.deepClone(mon2[0]);
					poke2.moves = mon2[1];
					
					let newPoke1 = side.addPokemon(poke1);
					let newPoke2 = side.addPokemon(poke2);
				}
			}
		},
	},
};