export const Formats: {[k: string]: FormatData} = {	
	megahintmod: {
		effectType: 'Rule', 
		name: 'Mega Hint Mod', 
		desc: 'At the start of a battle, gives each player information about the potential Mega in their party', 
		onBegin() {
			this.add('-message', 'Your Mega Evolution this match is:'); 
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon); 
				for (let pokemon of allPokemon) {
					const item = this.dex.getItem(pokemon.item)
					if (pokemon.canMegaEvo) {
							
							let mega = this.dex.getSpecies(pokemon.canMegaEvo); 
							const baseStats = mega.baseStats; 	
							let types = new String(mega.types[0]); 
							if (mega.types[1]) {
								types = types.concat("/" + mega.types[1])
							}
							let msg = new String(" Spe"); 
							if (mega.name === "Mimikyu-Mega") {
								msg = msg.concat("; Mega Mimikyu has two forms! If its Disguise is busted, it will Mega Evolve into Mimikyu-Busted-Mega. /dt for info"); 
							}
							let txt = new String(mega.name + " (" + types +
							"); Ability: " + mega.abilities[0] + " (" + this.dex.getAbility(mega.abilities[0]).shortDesc +
							"); Stats: " + baseStats.hp +
							" HP / " + baseStats.atk +
							" Atk / " + baseStats.def +
							" Def / " + baseStats.spa +
							" SpA / " + baseStats.spd +
							" SpD / " + baseStats.spe + msg); 
							this.hint(txt, true, pokemon.side); 
						
					}
			}
			this.add('-message', 'Use the command /dt for more information!'); 
		}, 
	}, 
}; 
