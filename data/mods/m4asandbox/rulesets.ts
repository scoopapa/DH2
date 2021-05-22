export const Formats: {[k: string]: FormatData} = {
	sandboxmod: {
		effectType: 'Rule',
		name: 'Sandbox Mod',
		desc: 'Allows customization of a Pokémon's types and stats based on its nickname.',
		onModifySpecies(species, target, source) {
			if (source || !target?.side) return;
			if (target.set.name.substr(0, 1) == "*") {
				let newSpecies = this.dex.deepClone(species);
				for (const type in [0, 1]) {
  				switch (target.set.name.substr((type + 1), 1)) {
		  			case "a":
		  				newSpecies.types[type] = "Dragon";
		  				break;
		  			case "b":
		  				newSpecies.types[type] = "Bug";
		  				break;
		  			case "c":
		  				newSpecies.types[type] = "Psychic";
		  				break;
		  			case "d":
		  				newSpecies.types[type] = "Dark";
		  				break;
		  			case "e":
		  				newSpecies.types[type] = "Electric";
		  				break;
		  			case "f":
		  				newSpecies.types[type] = "Fairy";
		  				break;
		  			case "g":
		  				newSpecies.types[type] = "Grass";
		  				break;
		  			case "h":
		  				newSpecies.types[type] = "Fighting";
		  				break;
		  			case "i":
		  				newSpecies.types[type] = "Ice";
		  				break;
		  			case "k":
		  				newSpecies.types[type] = "Rock";
		  				break;
		  			case "n":
		  				newSpecies.types[type] = "Normal";
		  				break;
		  			case "o":
		  				newSpecies.types[type] = "Ghost";
		  				break;
		   			case "p":
		   				newSpecies.types[type] = "Poison";
		  				break;
		  			case "r":
		  				newSpecies.types[type] = "Fire";
		  				break;
		  			case "s":
		  				newSpecies.types[type] = "Steel";
		  				break;
		  			case "u":
		  				newSpecies.types[type] = "Ground";
		  				break;
		  			case "w":
		  				newSpecies.types[type] = "Water";
		  				break;
		  			case "y":
		  				newSpecies.types[type] = "Flying";
		  				break;
		  			case "z":
		  				newSpecies.types[type] = "";
		  				break;
		  		}
				}
				newSpecies.baseStats.atk = target.set.name.substr(3, 3);
				newSpecies.baseStats.def = target.set.name.substr(6, 3);
				newSpecies.baseStats.spa = target.set.name.substr(9, 3);
				newSpecies.baseStats.spd = target.set.name.substr(12, 3);
				newSpecies.baseStats.spe = target.set.name.substr(15, 3);
        newSpecies.isModded = true;
				return newSpecies;
			}
		},
	},
};
