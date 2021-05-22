export const Formats: {[k: string]: FormatData} = {
	sandboxmod: {
		effectType: 'Rule',
		name: 'Sandbox Mod',
		desc: "Allows customization of a Pokémon's types and stats based on its nickname.",
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
				target.isModded = newSpecies;
				return newSpecies;
			}
		},
		onSwitchIn(pokemon) {
			let species = pokemon.isModded;
			let switchedIn = pokemon.switchedIn;
			if (pokemon.illusion) {
				if (!pokemon.illusion.isModded) return;
				species = pokemon.illusion.isModded;
				this.add('-start', pokemon, 'typechange', pokemon.illusion.isModded.types.join('/'), '[silent]');
				if (pokemon.illusion.switchedIn) return;
				pokemon.illusion.switchedIn = true;
			} else {
				if (!pokemon.isModded) return;
				this.add('-start', pokemon, 'typechange', pokemon.isModded.types.join('/'), '[silent]');
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
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) { // making sure the correct information is given when an Illusion breaks
				if (target.isModded) {
					this.add('-start', target, 'typechange', target.isModded.types.join('/'), '[silent]');
					if (!target.switchedIn) {
						target.switchedIn = true;
						let species = target.isModded;
						let abilities = species.abilities[0];
						if (species.abilities[1]) {
							abilities += ` / ${species.abilities[1]}`;
						}
						if (species.abilities['H']) {
							abilities += ` / ${species.abilities['H']}`;
						}
						if (species.abilities['S']) {
							abilities += ` / ${species.abilities['S']}`;
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
