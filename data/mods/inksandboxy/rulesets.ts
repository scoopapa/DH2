export const Formats: {[k: string]: FormatData} = {
	sandboxmod: {
		effectType: 'Rule',
		name: 'Sandbox Mod',
		desc: "Allows customization of a Pokémon's types and stats based on its nickname.",
		onBegin() { //This section handles custom Megas using the sandbox mega stones.
			for (const pokemon of this.getAllPokemon()) {
				if (!pokemon.set.name) return;
				if (pokemon.set.name.substr(0, 1) === "*") {
					if (['Mega Stone 1', 'Mega Stone 2', 'Mega Stone H'].includes(pokemon.getItem().name)) {
						let newSpecies = this.dex.deepClone(pokemon.species);
						switch (pokemon.set.name.substr(1, 1)) {//Primary type
							case "a":
							case "A":
								newSpecies.types[0] = "Dragon";
								break;
							case "b":
							case "B":
								newSpecies.types[0] = "Bug";
								break;
							case "c":
							case "C":
								newSpecies.types[0] = "Psychic";
								break;
							case "d":
							case "D":
								newSpecies.types[0] = "Dark";
								break;
							case "e":
							case "E":
								newSpecies.types[0] = "Electric";
								break;
							case "f":
							case "F":
								newSpecies.types[0] = "Fairy";
								break;
							case "g":
							case "G":
								newSpecies.types[0] = "Grass";
								break;
							case "h":
							case "H":
								newSpecies.types[0] = "Fighting";
								break;
							case "i":
							case "I":
								newSpecies.types[0] = "Ice";
								break;
							case "k":
							case "K":
								newSpecies.types[0] = "Rock";
								break;
							case "n":
							case "N":
								newSpecies.types[0] = "Normal";
								break;
							case "o":
							case "O":
								newSpecies.types[0] = "Ghost";
								break;
							case "p":
							case "P":
								newSpecies.types[0] = "Poison";
								break;
							case "r":
							case "R":
								newSpecies.types[0] = "Fire";
								break;
							case "s":
							case "S":
								newSpecies.types[0] = "Steel";
								break;
							case "u":
							case "U":
								newSpecies.types[0] = "Ground";
								break;
							case "w":
							case "W":
								newSpecies.types[0] = "Water";
								break;
							case "y":
							case "Y":
								newSpecies.types[0] = "Flying";
								break;
							case "z":
							case "Z":
								newSpecies.types[0] = "";
								break;
						}
						switch (pokemon.set.name.substr(2, 1)) {//Secondary type
							case "a":
							case "A":
								newSpecies.types[1] = "Dragon";
								break;
							case "b":
							case "B":
								newSpecies.types[1] = "Bug";
								break;
							case "c":
							case "C":
								newSpecies.types[1] = "Psychic";
								break;
							case "d":
							case "D":
								newSpecies.types[1] = "Dark";
								break;
							case "e":
							case "E":
								newSpecies.types[1] = "Electric";
								break;
							case "f":
							case "F":
								newSpecies.types[1] = "Fairy";
								break;
							case "g":
							case "G":
								newSpecies.types[1] = "Grass";
								break;
							case "h":
							case "H":
								newSpecies.types[1] = "Fighting";
								break;
							case "i":
							case "I":
								newSpecies.types[1] = "Ice";
								break;
							case "k":
							case "K":
								newSpecies.types[1] = "Rock";
								break;
							case "n":
							case "N":
								newSpecies.types[1] = "Normal";
								break;
							case "o":
							case "O":
								newSpecies.types[1] = "Ghost";
								break;
							case "p":
							case "P":
								newSpecies.types[1] = "Poison";
								break;
							case "r":
							case "R":
								newSpecies.types[1] = "Fire";
								break;
							case "s":
							case "S":
								newSpecies.types[1] = "Steel";
								break;
							case "u":
							case "U":
								newSpecies.types[1] = "Ground";
								break;
							case "w":
							case "W":
								newSpecies.types[1] = "Water";
								break;
							case "y":
							case "Y":
								newSpecies.types[1] = "Flying";
								break;
							case "z":
							case "Z":
								newSpecies.types[1] = "";
								break;
						}
						//Use isNaN() (lit. Not a Number) to allow for not modifying specific base stats if we want, by just inputting like, xxx
						if (!isNaN(pokemon.set.name.substr(3, 3))) newSpecies.baseStats.atk = pokemon.set.name.substr(3, 3);
						if (!isNaN(pokemon.set.name.substr(6, 3))) newSpecies.baseStats.def = pokemon.set.name.substr(6, 3);
						if (!isNaN(pokemon.set.name.substr(9, 3))) newSpecies.baseStats.spa = pokemon.set.name.substr(9, 3);
						if (!isNaN(pokemon.set.name.substr(12, 3))) newSpecies.baseStats.spd = pokemon.set.name.substr(12, 3);
						if (!isNaN(pokemon.set.name.substr(15, 3))) newSpecies.baseStats.spe = pokemon.set.name.substr(15, 3);
						newSpecies.baseSpecies = pokemon.baseSpecies;
						newSpecies.abilities[0] = pokemon.ability;
						newSpecies.forme = 'Mega';
						newSpecies.name = pokemon.species.name + '-Mega';
						pokemon.moddedMega = newSpecies;
						pokemon.canMegaEvo = pokemon.moddedMega;
						const abilities = pokemon.species.abilities;
						let ability = abilities[0];
						if (pokemon.getItem().name === 'Mega Stone 2' && abilities[1]) ability = abilities[1];
						if (pokemon.getItem().name === 'Mega Stone H' && abilities['H']) ability = abilities['H'];
						pokemon.setAbility(ability);
						pokemon.baseAbility = ability as ID;
						pokemon.ability = ability as ID;
					}
				}
			}
		},
		onModifySpecies(species, target, source) {
			if (!target.set.name) return;
			if (source || !target?.side || ['Mega Stone 1', 'Mega Stone 2', 'Mega Stone H'].includes(target.getItem().name)) return;
			//See if nickname+species qualifies for any presets/easter eggs, set a variable to true
			if (target.set.name.substr(0, 1) === "*") {//Add "or (var)"
				let newSpecies = this.dex.deepClone(species);
				//If (var), use preset instead and then return newSpecies
				switch (target.set.name.substr(1, 1)) {//Primary type
					case "a":
					case "A":
						newSpecies.types[0] = "Dragon";
						break;
					case "b":
					case "B":
						newSpecies.types[0] = "Bug";
						break;
					case "c":
					case "C":
						newSpecies.types[0] = "Psychic";
						break;
					case "d":
					case "D":
						newSpecies.types[0] = "Dark";
						break;
					case "e":
					case "E":
						newSpecies.types[0] = "Electric";
						break;
					case "f":
					case "F":
						newSpecies.types[0] = "Fairy";
						break;
					case "g":
					case "G":
						newSpecies.types[0] = "Grass";
						break;
					case "h":
					case "H":
						newSpecies.types[0] = "Fighting";
						break;
					case "i":
					case "I":
						newSpecies.types[0] = "Ice";
						break;
					case "k":
					case "K":
						newSpecies.types[0] = "Rock";
						break;
					case "n":
					case "N":
						newSpecies.types[0] = "Normal";
						break;
					case "o":
					case "O":
						newSpecies.types[0] = "Ghost";
						break;
					case "p":
					case "P":
						newSpecies.types[0] = "Poison";
						break;
					case "r":
					case "R":
						newSpecies.types[0] = "Fire";
						break;
					case "s":
					case "S":
						newSpecies.types[0] = "Steel";
						break;
					case "u":
					case "U":
						newSpecies.types[0] = "Ground";
						break;
					case "w":
					case "W":
						newSpecies.types[0] = "Water";
						break;
					case "y":
					case "Y":
						newSpecies.types[0] = "Flying";
						break;
					case "z":
					case "Z":
						newSpecies.types[0] = "";
						break;
				}
				switch (target.set.name.substr(2, 1)) {//Secondary type
					case "a":
					case "A":
						newSpecies.types[1] = "Dragon";
						break;
					case "b":
					case "B":
						newSpecies.types[1] = "Bug";
						break;
					case "c":
					case "C":
						newSpecies.types[1] = "Psychic";
						break;
					case "d":
					case "D":
						newSpecies.types[1] = "Dark";
						break;
					case "e":
					case "E":
						newSpecies.types[1] = "Electric";
						break;
					case "f":
					case "F":
						newSpecies.types[1] = "Fairy";
						break;
					case "g":
					case "G":
						newSpecies.types[1] = "Grass";
						break;
					case "h":
					case "H":
						newSpecies.types[1] = "Fighting";
						break;
					case "i":
					case "I":
						newSpecies.types[1] = "Ice";
						break;
					case "k":
					case "K":
						newSpecies.types[1] = "Rock";
						break;
					case "n":
					case "N":
						newSpecies.types[1] = "Normal";
						break;
					case "o":
					case "O":
						newSpecies.types[1] = "Ghost";
						break;
					case "p":
					case "P":
						newSpecies.types[1] = "Poison";
						break;
					case "r":
					case "R":
						newSpecies.types[1] = "Fire";
						break;
					case "s":
					case "S":
						newSpecies.types[1] = "Steel";
						break;
					case "u":
					case "U":
						newSpecies.types[1] = "Ground";
						break;
					case "w":
					case "W":
						newSpecies.types[1] = "Water";
						break;
					case "y":
					case "Y":
						newSpecies.types[1] = "Flying";
						break;
					case "z":
					case "Z":
						newSpecies.types[1] = "";
						break;
				}
				if (target.set.name.length > 3) {//Allow compatibility for JUST changing the type; if the rest is blank, dont zero stats
					let offset = 0;
					let mods = ["Y", "Z", "y", "z", "+", "-"];
					/*
					if (target.set.name.length > 18) {//Only account for HP if the name is longer than the old format (R.I.P.)
						offset = 3;
						//Use isNaN() to allow for not modifying specific base stats if we want, by just inputting like, xxx
						if (!isNaN(target.set.name.substr(3, 3))) newSpecies.baseStats.hp = target.set.name.substr(3, 3);
					}
					*/
					//Check to see if we want to ADD or SUB
					if (
						target.set.name.substr(3, 3).toLowerCase() === "add" ||
						target.set.name.substr(3, 3).toLowerCase() === "sub" ||
						mods.includes(target.set.name.substr(3, 1))
					) {//2 digit stat modifications
						let sign = (target.set.name.substr(3, 3).toLowerCase() === "sub") ? -1 : 1;
						//Individual modifier logic
						let m = new Array(6).fill(sign);
						if (mods.includes(target.set.name.substr(3, 1))) {
							let key = Array.from(target.set.name.substr(3, 3));
							for (let k = 0; k < key.length; k++) {
								//If lowercase (or -): negative. else positive
								//If Z (or -): negative. else positive
								m[k*2] = (key[k] === "+") ? 1 : 
									(key[k].toLowerCase() === key[k]) ? -1 : 1;
								m[k*2 + 1] = (key[k] === "-") ? -1 :
									(key[k].toLowerCase() === "z") ? -1 : 1;
							}
						}
						if (!isNaN(target.set.name.substr(6, 2))) {
							newSpecies.baseStats.hp = species.baseStats.hp + target.set.name.substr(6, 2)*m[0];
						} if (!isNaN(target.set.name.substr(8, 2))) {
							newSpecies.baseStats.atk = species.baseStats.atk + target.set.name.substr(8, 2)*m[1];
						} if (!isNaN(target.set.name.substr(10, 2))) {
							newSpecies.baseStats.def = species.baseStats.def + target.set.name.substr(10, 2)*m[2];
						} if (!isNaN(target.set.name.substr(12, 2))) {
							newSpecies.baseStats.spa = species.baseStats.spa + target.set.name.substr(12, 2)*m[3];
						} if (!isNaN(target.set.name.substr(14, 2))) {
							newSpecies.baseStats.spd = species.baseStats.spd + target.set.name.substr(14, 2)*m[4];
						} if (!isNaN(target.set.name.substr(16, 2))) {
							newSpecies.baseStats.spe = species.baseStats.spe + target.set.name.substr(16, 2)*m[5];
						}
					}
					else {//3 digit stat assignments
						if (!isNaN(target.set.name.substr(3 + offset, 3))) newSpecies.baseStats.atk = target.set.name.substr(3 + offset, 3);
						if (!isNaN(target.set.name.substr(6 + offset, 3))) newSpecies.baseStats.def = target.set.name.substr(6 + offset, 3);
						if (!isNaN(target.set.name.substr(9 + offset, 3))) newSpecies.baseStats.spa = target.set.name.substr(9 + offset, 3);
						if (!isNaN(target.set.name.substr(12 + offset, 3))) newSpecies.baseStats.spd = target.set.name.substr(12 + offset, 3);
						if (!isNaN(target.set.name.substr(15 + offset, 3))) newSpecies.baseStats.spe = target.set.name.substr(15 + offset, 3);
					}
				}
				target.isModded = true;
				return newSpecies;
			}
		},
		//onSwitchInPriority, so we go before Data Mod 100% of the time
		onSwitchInPriority: 1,
		onSwitchIn(pokemon) {
			let species = pokemon.species;
			let switchedIn = pokemon.switchedIn;
			if (pokemon.illusion) {
				if (!pokemon.illusion.isModded) return;
				species = pokemon.illusion.species;
				this.add('-start', pokemon, 'typechange', species.types.join('/'), '[silent]');
				if (pokemon.illusion.switchedIn) return;
				pokemon.illusion.switchedIn = true;
			} else {
				if (!pokemon.isModded) return;
				this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				if (pokemon.switchedIn) return;
				pokemon.switchedIn = true;
			}
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span></li><li style="clear: both"></li></ul>`);
			}
			this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
		},
		//onDamagingHitOrder, so we go before Data Mod (and after Illusion wearing off, which I modded to have a priority of 1) 100% of the time
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) { // making sure the correct information is given when an Illusion breaks
				if (target.isModded) {
					this.add('-start', target, 'typechange', target.species.types.join('/'), '[silent]');
					if (!target.switchedIn) {
						target.switchedIn = true;
						let species = target.species;
						const baseStats = species.baseStats;
						const type = species.types[0];
						if (species.types[1]) {
							const type2 = species.types[1];
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span></li><li style="clear: both"></li></ul>`);
						} else {
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span></li><li style="clear: both"></li></ul>`);
						}
						this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					}
				} else {
					const types = target.baseSpecies.types;
					if (target.getTypes().join() === types.join()) {
						this.add('-end', target, 'typechange', '[silent]');
					}
				}
			}
		},
	},
};