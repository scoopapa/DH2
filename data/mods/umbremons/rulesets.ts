export const Rulesets: {[k: string]: ModdedFormatData} = {
	datamod: {
		effectType: 'Rule',
		name: 'Data Mod',
		desc: 'Information about modded Pokémon - and custom elements they have access to - is displayed to both players at the start of battle.',
		
		/* onBegin() {
			// messages can be displayed here, such as if we ever have a banner
		}, */
		onTeamPreview() {
			for (const side of this.sides) {
				let showFakemon = false;
				let hideBox = `raw|<div class="infobox" open><details class ="details"><summary>Modded Pokémon on ${side.name}'s team</summary>`;
				for (const pokemon of side.pokemon) {
					let species = this.dex.species.get(pokemon.species.name);

					// Let's check if the Pokémon is modded first
					let modded = false;
					const baseSpecies = Dex.species.get(pokemon.species.name);
					for (const type in [0, 1]) if (species.types[type] !== baseSpecies.types[type]) modded = true;
					for (const ability in [0, 1, 'H', 'S']) {
						if (species.abilities[ability] !== baseSpecies.abilities[ability]) modded = true;
						// Even if the Ability list is vanilla, see if any of the Abilities are modded
						let abilityDex = this.dex.abilities.get(species.abilities[ability]);
						if (abilityDex && (!abilityDex.num || abilityDex.num < 0 || abilityDex.modded)) modded = true;
					}
					// We don't need a base stat check since Umbremons doesn't allow changes to those!
					if (species.movepoolAdditions || species.movepoolDeletions) modded = true;

					// Since Umbremons changes some in-battle forms (like Mega Evolutions), we also need to know if any of those are modded
					let formDisplay = ``;
					let formList = [];
					let lowestSpecies = (species.baseSpecies ? this.dex.species.get(species.baseSpecies) : species);
					if (lowestSpecies.otherFormes) for (const form of lowestSpecies.otherFormes) {
						formList.push(form); // even if the form isn't modded, we'll want to check later if their Abilities are modded
						
						let umbremonsForm = this.dex.species.get(form);
						const vanillaForm = Dex.species.get(form);
						let listForm = false;
						
						for (const type in [0, 1]) if (umbremonsForm.types[type] !== vanillaForm.types[type]) listForm = true;
						for (const ability in [0, 1, 'H', 'S']) {
							if (umbremonsForm.abilities[ability] !== vanillaForm.abilities[ability]) listForm = true;
							// Even if the Ability list is vanilla, see if any of the Abilities are modded:
							let abilityDex = this.dex.abilities.get(umbremonsForm.abilities[ability]);
							if (abilityDex && (!abilityDex.num || abilityDex.num < 0 || abilityDex.modded)) modded = true;
						}

						if (listForm) {
							modded = true;
							let abilities = umbremonsForm.abilities[0];
							if (umbremonsForm.abilities[1]) abilities += ` / ${umbremonsForm.abilities[1]}`;
							if (umbremonsForm.abilities['H']) abilities += ` // ${umbremonsForm.abilities['H']}`;
							if (umbremonsForm.abilities['S']) abilities += ` // <i>(${umbremonsForm.abilities['S']})</i>`;
							const baseStats = umbremonsForm.baseStats;
							
							formDisplay += `<br><div class="message"><ul class="utilichart"><li class="result"><span class="col iconcol"><span class "picon"><img src="https://www.smogon.com/forums/media/minisprites/${(umbremonsForm.spriteid).replace(`mega`,`-mega`).replace(`--mega`,`-mega`)}.png" alt="${umbremonsForm.name}"></span></span><span class="col pokemonnamecol" style="white-space: nowrap">` + umbremonsForm.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${umbremonsForm.types[0]}.png" alt="${umbremonsForm.types[0]}" height="14" width="32">`;
							if (umbremonsForm.types[1]) formDisplay += `<img src="http://play.pokemonshowdown.com/sprites/types/${umbremonsForm.types[1]}.png" alt="${umbremonsForm.types[1]}" height="14" width="32">`;
							formDisplay += `</span></li><br><li class="result"><span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><br><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul></div>`;
						}
					}
					
					// Finally, we need to check if there are any modded moves we might need to report - even ones that were already in the Pokémon's learnset!
					if (this.dex.data.Learnsets[this.toID(pokemon.species)].learnset) for (const moveid in this.dex.data.Learnsets[this.toID(pokemon.species)].learnset) {
						let move = this.dex.moves.get(moveid);
						if (move && (!move.num || move.num < 0 || move.modded)) modded = true;
					}
					
					if (species && modded) {
						showFakemon = true; // This lets us know that at least one modded Pokémon exists on the team; if not, we won't want to print anything!
						
						let abilities = species.abilities[0];
						if (species.abilities[1]) abilities += ` / ${species.abilities[1]}`;
						if (species.abilities['H']) abilities += ` // ${species.abilities['H']}`;
						if (species.abilities['S']) abilities += ` // <i>(${species.abilities['S']})</i>`;
						const baseStats = species.baseStats;
						hideBox += `<br><div class="message"><ul class="utilichart"><li class="result"><span class="col iconcol"><span class="picon"><img src="https://www.smogon.com/forums/media/minisprites/${species.spriteid}.png" alt="${species.name}"></span></span><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${species.types[0]}.png" alt="${species.types[0]}" height="14" width="32">`;
						if (species.types[1]) hideBox += `<img src="http://play.pokemonshowdown.com/sprites/types/${species.types[1]}.png" alt="${species.types[1]}" height="14" width="32">`;
						hideBox += `</span></li><br><li class="result"><span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><br><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul></div>`;
						
						// Movepool changes
						// This section is slightly reworded from the Evo 2 version, since the modded Pokémon in Umbremons aren't Fakemon
						if (species.movepoolAdditions) {
							hideBox += `<br><div class="hint">${species.name} gained the move`;
							if (species.movepoolAdditions.length > 1) hideBox += `s`;
							let order = 0;
							for (const moveid of species.movepoolAdditions) {
								order++;
								let move = this.dex.moves.get(moveid);
								if (order < species.movepoolAdditions.length) {
									hideBox += ` <strong>${move.name}</strong>`;
									if (order + 1 < species.movepoolAdditions.length) hideBox += `,`;
								}
								else {
									if (species.movepoolAdditions.length !== 1) hideBox += ` and`;
									hideBox += ` <strong>${move.name}</strong>`;
								}
							}
						}
						if (species.movepoolDeletions) {
							if (species.movepoolAdditions) hideBox += `,<br>but it <i>lost</i> the move`;
							else hideBox += `<br><div class="hint">${species.name} <i>lost</i> the move`;
							
							if (species.movepoolDeletions.length > 1) hideBox += `s`;
							let order = 0;
							for (const moveid of species.movepoolDeletions) {
								order++;
								let move = this.dex.moves.get(moveid);
								if (order < species.movepoolDeletions.length) {
									hideBox += ` <strong>${move.name}</strong>`;
									if (order + 1 < species.movepoolDeletions.length) hideBox += `,`;
								}
								else {
									if (species.movepoolDeletions.length !== 1) hideBox += ` and`;
									hideBox += ` <strong>${move.name}</strong>`;
								}
							}
						}
						if (species.movepoolAdditions || species.movepoolDeletions) hideBox += `.</div>`;
						
						if (formDisplay.length) hideBox += `<br><div class="infobox" open><details class ="details"><summary>Forms related to ${species.name}</summary>${formDisplay}<br></details></div>`;
						
						let customGuide = `<br><div class="infobox" open><details class ="details"><summary>Custom elements related to ${species.name}</summary>`;
						let displayCustoms = false;
						
						let abilitiesCovered = [];
						// custom Abilities
						for (const num in [0, 1, 'H', 'S']) if (species.abilities[num]) {
							let ability = this.dex.abilities.get(species.abilities[num]);
							if (ability && !abilitiesCovered.includes(ability) && (!ability.num || ability.num < 0 || ability.modded)) { // report custom Abilities only
								displayCustoms = true;
								customGuide += `<br><div class="message"><li class="result"><span class="col namecol"><strong>${ability.name}</strong></span>`;
								if (ability.desc) customGuide += `<br><font color="#686868">${ability.desc}</font>`;
								else if (ability.shortDesc) customGuide += `<br><font color="#686868">${ability.shortDesc}</font>`;
								customGuide += `</li></div>`;
							}
							abilitiesCovered.push(ability);
						}
						if (formList.length) for (const form of formList) for (const num in [0, 1, 'H', 'S']) if (this.dex.species.get(form).abilities[num]) {
							let ability = this.dex.abilities.get(this.dex.species.get(form).abilities[num]);
							if (ability && !abilitiesCovered.includes(ability) && (!ability.num || ability.num < 0 || ability.modded)) { // report custom Abilities only
								displayCustoms = true;
								customGuide += `<br><div class="hint">${form}'s Ability, ${ability.name}, is modded:</div>`
								customGuide += `<br><div class="message"><li class="result"><span class="col namecol"><strong>${ability.name}</strong></span>`;
								if (ability.desc) customGuide += `<br><font color="#686868">${ability.desc}</font>`;
								else if (ability.shortDesc) customGuide += `<br><font color="#686868">${ability.shortDesc}</font>`;
								customGuide += `</li></div>`;
							}
							abilitiesCovered.push(ability);
						}
						
						// custom moves
						if (this.dex.data.Learnsets[this.toID(pokemon.species)].learnset) {
							// We have to check the whole learnset because some moves the Pokémon already learned might be modded!
							for (const moveid in this.dex.data.Learnsets[this.toID(pokemon.species)].learnset) {
								let move = this.dex.moves.get(moveid);
								if (move && (!move.num || move.num < 0 || move.modded)) { // report custom moves only
									displayCustoms = true;
									let power = move.basePower;
									if (power < 2) power = "—";
									let acc = move.accuracy;
									if (acc === true) acc = "—";
									customGuide += `<br><div class="message"><ul class="utilichart"><li class="result"><span class="col movenamecol"><strong>${move.name}</strong></span><span class="col typecol"><img src="https://play.pokemonshowdown.com/sprites/types/${move.type}.png" alt="${move.type} width="32" height="14"><img src="https://play.pokemonshowdown.com/sprites/categories/${move.category}.png" alt="${move.category}" width="32" height="14"></span><span class="col labelcol"><em>Power</em><br>${power}</span><span class="col widelabelcol"><em>Accuracy</em><br>${acc}</span><span class="col pplabelcol"><em>PP</em><br>${move.noPPBoosts ? move.pp : Math.floor(move.pp * 8 / 5)}</span></li></ul></div>`;
									if (move.desc) customGuide += `<br><font color="#686868">${move.desc}</font>`;
									else if (move.shortDesc) customGuide += `<br><font color="#686868">${move.shortDesc}</font>`;
								}
							}
						}

						// other info
						if (species.description) customGuide += `<br><div class="hint">${species.description}</div>`;
						
						customGuide += `<br></details></div>`;
						if (displayCustoms) hideBox += customGuide;
					}
				}
				
				hideBox += 	`</details></div>`;
				if (showFakemon) this.add(`${hideBox}`);
			}
		},
		onUpdate(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion ? pokemon.illusion.getTypes(true) : pokemon.getTypes(true)).join('/'), '[silent]');
		},
	},
};
