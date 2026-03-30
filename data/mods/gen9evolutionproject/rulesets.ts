export const Rulesets: {[k: string]: ModdedFormatData} = {
	datamod: {
		effectType: 'Rule',
		name: 'Data Mod',
		desc: 'When a new Pokémon switches in for the first time, information about its types, stats and Abilities is displayed to both players.',
		onTeamPreview() {
			this.add('clearpoke');
			for (const side of this.sides) {
				for (const pokemon of side.pokemon) {
					let details = pokemon.details;
					this.add('poke', pokemon.side.id, details, '');
				}
			}
			for (const side of this.sides) {
				let showFakemon = false;
				let extraLineBreak = false;
				let hideBox = `raw|<div class="infobox" open><details class ="details"><summary>Fakemon on ${side.name}'s team</summary>`;
				for (const pokemon of side.pokemon) {
					// add one more line between each Fakemon
					if (extraLineBreak) hideBox += `<br>`;
					else extraLineBreak = true;
					
					let species = this.dex.species.get(pokemon.species.name);
					if (species.copyData) { // all modded things in Evo have this
						showFakemon = true;
						let abilities = species.abilities[0];
						if (species.abilities[1]) abilities += ` / ${species.abilities[1]}`;
						if (species.abilities['H']) abilities += ` // ${species.abilities['H']}`;
						if (species.abilities['S']) abilities += ` // <em>(${species.abilities['S']})</em>`;
						const baseStats = species.baseStats;
						hideBox += `<div class="message"><ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${species.types[0]}.png" alt="${species.types[0]}" height="14" width="32">`;
						if (species.types[1]) hideBox += `<img src="http://play.pokemonshowdown.com/sprites/types/${species.types[1]}.png" alt="${species.types[1]}" height="14" width="32">`;
						hideBox += `</span></li><br><li class="result"><span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><br><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul></div>`;
						
						let customGuide = `<br><div class="infobox" open><details class ="details"><summary>More details on ${species.name}</summary>`;
						
						// creator
						if (species.creator) {
							customGuide += `<div class="hint"><br>${species.name} was created by ${species.creator}!</div>`;
						}
						
						// movepool changes
						const gen9only = [
							'Plankteenie', 'Mareanie-Drifter', 'Toxapex-Glacial', 'Nemesyst', 'Numel-Dormant', 'Dormedary', 'Dormaderupt',
							'Uraxys', 'Cytoxys', 'Adexys', 'Guaxys', 'Riboxys-U', 'Riboxys-C', 'Riboxys-A', 'Riboxys-G',
						];
						customGuide += `<br><div class="hint">Its movepool is based on ${species.copyMoves ? species.copyMoves : species.copyData}'s`;
						if (gen9only.includes(species.name)) customGuide += ` <strong>Gen IX</strong> movepool`;
						if (species.movepoolAdditions) {
							customGuide += `,<br>and it <strong>gained</strong> the move`;
							if (species.movepoolAdditions.length > 1) customGuide += `s`;
							let order = 0;
							for (const moveid of species.movepoolAdditions) {
								order++;
								let move = this.dex.moves.get(moveid);
								if (order < species.movepoolAdditions.length) {
									customGuide += ` ${move.name}`;
									if (order + 1 < species.movepoolAdditions.length) customGuide += `,`;
								}
								else {
									if (species.movepoolAdditions.length !== 1) customGuide += ` and`;
									customGuide += ` ${move.name}`;
								}
							}
						}
						if (species.movepoolDeletions) {
							customGuide += `,<br>but it <strong>lost</strong> the move`;
							if (species.movepoolDeletions.length > 1) customGuide += `s`;
							let order = 0;
							for (const moveid of species.movepoolDeletions) {
								order++;
								let move = this.dex.moves.get(moveid);
								if (order < species.movepoolDeletions.length) {
									customGuide += ` ${move.name}`;
									if (order + 1 < species.movepoolDeletions.length) customGuide += `,`;
								}
								else {
									if (species.movepoolDeletions.length !== 1) customGuide += ` and`;
									customGuide += ` ${move.name}`;
								}
							}
						}
						if (!species.movepoolAdditions && !species.movepoolDeletions) customGuide += ` with no changes`;
						customGuide += `.</div>`;
						
						// custom Abilities
						if (species.abilities[0]) {
							let ability = this.dex.abilities.get(species.abilities[0]);
							if (ability.num && ability.num < 0) { // report custom Abilities only
								customGuide += `<br><div class="message"><li class="result"><span class="col namecol"><strong>${ability.name}</strong></span>`;
								if (ability.longDesc) {
										customGuide += `<br><font color="#686868">${ability.longDesc}</font>`;
								} else if (ability.shortDesc) {
										customGuide += `<br><font color="#686868">${ability.shortDesc}</font>`;
								}
								customGuide += `</li></div>`;
							}
						}
						if (species.abilities[1]) {
							let ability = this.dex.abilities.get(species.abilities[1]);
							if (ability.num && ability.num < 0) { // report custom Abilities only
								customGuide += `<br><div class="message"><li class="result"><span class="col namecol"><strong>${ability.name}</strong></span>`;
								if (ability.longDesc) {
										customGuide += `<br><font color="#686868">${ability.longDesc}</font>`;
								} else if (ability.shortDesc) {
										customGuide += `<br><font color="#686868">${ability.shortDesc}</font>`;
								}
								customGuide += `</li></div>`;
							}
						}
						if (species.abilities['H']) {
							let ability = this.dex.abilities.get(species.abilities['H']);
							if (ability.num && ability.num < 0) { // report custom Abilities only
								customGuide += `<br><div class="message"><li class="result"><span class="col namecol"><strong>${ability.name}</strong></span>`;
								if (ability.longDesc) {
										customGuide += `<br><font color="#686868">${ability.longDesc}</font>`;
								} else if (ability.shortDesc) {
										customGuide += `<br><font color="#686868">${ability.shortDesc}</font>`;
								}
								customGuide += `</li></div>`;
							}
						}
						if (species.abilities['S']) {
							let ability = this.dex.abilities.get(species.abilities['S']);
							if (ability.num && ability.num < 0) { // report custom Abilities only
								customGuide += `<br><div class="message"><li class="result"><span class="col namecol"><strong>${ability.name}</strong></span>`;
								if (ability.longDesc) {
										customGuide += `<br><font color="#686868">${ability.longDesc}</font>`;
								} else if (ability.shortDesc) {
										customGuide += `<br><font color="#686868">${ability.shortDesc}</font>`;
								}
								customGuide += `</li></div>`;
							}
						}
						
						// custom moves
						if (species.movepoolAdditions) {
							for (const moveid of species.movepoolAdditions) {
								let move = this.dex.moves.get(moveid);
								if (move.num < 0) { // report custom moves only
									let power = move.basePower;
									if (power < 2) power = "—";
									let acc = move.accuracy;
									if (acc === true) acc = "—";
									customGuide += `<br><div class="message"><ul class="utilichart"><li class="result"><span class="col movenamecol"><strong>${move.name}</strong></span><span class="col typecol"><img src="https://play.pokemonshowdown.com/sprites/types/${move.type}.png" alt="${move.type} width="32" height="14"><img src="https://play.pokemonshowdown.com/sprites/categories/${move.category}.png" alt="${move.category}" width="32" height="14"></span><span class="col labelcol"><em>Power</em><br>${power}</span><span class="col widelabelcol"><em>Accuracy</em><br>${acc}</span><span class="col pplabelcol"><em>PP</em><br>${Math.floor(move.pp * 8 / 5)}</span></li></ul></div>`;
									if (move.longDesc) {
										customGuide += `<br><font color="#686868">${move.longDesc}</font>`;
									} else if (move.shortDesc) {
										customGuide += `<br><font color="#686868">${move.shortDesc}</font>`;
									}
								}
							}
						}

						// other info
						if (species.description) customGuide += `<br><div class="hint"><br>${species.description}</div>`;
						
						customGuide += `<br></details></div>`;
						hideBox += customGuide;
					}
				}
				hideBox += 	`</details></div>`;
				if (showFakemon) this.add(`${hideBox}`);
			}
		},
		onDataMod(pokemon) {
			let species = this.dex.species.get(pokemon.species.name);
			if (species.copyData) { // all modded things in Evo have this
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				let abilities = species.abilities[0];
				if (species.abilities[1]) abilities += ` / ${species.abilities[1]}`;
				if (species.abilities['H']) abilities += ` / ${species.abilities['H']}`;
				if (species.abilities['S']) abilities += ` / ${species.abilities['S']}`;
				const baseStats = species.baseStats;
				const type = species.types[0];
				if (species.types[1]) {
					const type2 = species.types[1];
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span><br><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span><br><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				}
				if (species.creator) this.hint(`${species.name} was created by ${species.creator}!`);
				// might add movepool additions?
				// this.hint(`text goes here.`, true);
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', pokemon.illusion.getTypes(true).join('/'), '[silent]');
			} else {
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) { // making sure the correct information is given when an Illusion breaks
				if (this.dex.species.get(target.species.name).copyData) { // if the target is modded
					this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
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
