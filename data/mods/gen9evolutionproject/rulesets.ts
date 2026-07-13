import { Teams } from '../../../sim/teams';

export const Rulesets: {[k: string]: ModdedFormatData} = {
	datamod: {
		effectType: 'Rule',
		name: 'Data Mod',
		desc: 'When a new Pokémon switches in for the first time, information about its types, stats and Abilities is displayed to both players.',
		
		onBegin() {
			// messages can be displayed here, such as if we ever have a banner
			
			// initializing battle stats for fun
			this.funStats = {
				damage: {},
				damageMethod: {},
				allyDamage: {},
				allyDamageMethod: {},
				
				heal: {},
				healMethod: {},
				foeHeal: {},
				foeHealMethod: {},
				
				overkill: {},
			};
		},

		// actual Data Mod feature
		
		onTeamPreview() {
			for (const side of this.sides) {
				let showFakemon = false;
				let extraLineBreak = false;
				let hideBox = `raw|<div class="infobox" open><details class ="details"><summary>Fakemon on ${side.name}'s team</summary>`;
				for (const pokemon of side.pokemon) {
					let species = this.dex.species.get(pokemon.species.name);
					
					// add one more line between each Fakemon
					if (species && (species.copyData || (species.evos && species.evos.length))) {
						if (extraLineBreak) hideBox += `<br>`;
						else extraLineBreak = true;
					}

					// report Eviolite compatibility even for canon Pokémon
					if (species && !species.copyData && (species.evos && species.evos.length)) {
						showFakemon = true;
						hideBox += `<br><div class="hint">${species.name} <strong>can use Eviolite</strong> because it evolves into`;
						let order = 0;
						for (const evoname of species.evos) {
							order++;
							if (order < species.evos.length) {
								hideBox += ` ${evoname}`;
								if (order + 1 < species.evos.length) hideBox += `,`;
							}
							else {
								if (species.evos.length !== 1) hideBox += ` and`;
								hideBox += ` ${evoname}`;
							}
						}
						hideBox += `!</div><br>`;
					}

					// otherwise, Fakemon
					if (species && species.copyData) { // all modded things in Evo have this
						showFakemon = true;
						let abilities = species.abilities[0];
						if (species.abilities[1]) abilities += ` / ${species.abilities[1]}`;
						if (species.abilities['H']) abilities += ` // ${species.abilities['H']}`;
						if (species.abilities['S']) abilities += ` // <i>(${species.abilities['S']})</i>`;
						const baseStats = species.baseStats;
						hideBox += `<div class="message"><ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${species.types[0]}.png" alt="${species.types[0]}" height="14" width="32">`;
						if (species.types[1]) hideBox += `<img src="http://play.pokemonshowdown.com/sprites/types/${species.types[1]}.png" alt="${species.types[1]}" height="14" width="32">`;
						hideBox += `</span></li><br><li class="result"><span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><br><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul></div>`;
						
						let customGuide = `<br><div class="infobox" open><details class ="details"><summary>More details on ${species.name}</summary>`;
						
						// creator
						if (species.creator) {
							customGuide += `<div class="hint"><br>${species.name} was created by ${species.creator}!</div>`;
						}

						if (species.evos && species.evos.length) {
							customGuide += `<br><div class="hint">It <strong>can use Eviolite</strong> because it evolves into`;
							let order = 0;
							for (const evoname of species.evos) {
								order++;
								if (order < species.evos.length) {
									customGuide += ` ${evoname}`;
									if (order + 1 < species.evos.length) customGuide += `,`;
								}
								else {
									if (species.evos.length !== 1) customGuide += ` and`;
									customGuide += ` ${evoname}`;
								}
							}
							customGuide += `!</div>`;
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
						if (species.description) customGuide += `<br><div class="hint">${species.description}</div>`;
						
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
				if (species.abilities['H']) abilities += ` // ${species.abilities['H']}`;
				if (species.abilities['S']) abilities += ` // <i>(${species.abilities['S']})</i>`;
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
			// super-effective move count
			if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod > 0) {
				if (source.m.superEffectiveHits) {
					source.m.superEffectiveHits++;
				} else source.m.superEffectiveHits = 1;
			}
		},

		// battle stats feature
		
		onHealPriority: -200,
		onHeal(damage, target, source, effect) {
			if (!damage) return;

			// attribute the source of the healing
			let credit = null;
			
			if (effect && effect.effectType) {
				switch (effect.effectType) {
					case 'Condition':
						if (effect.id) {
							if (target.volatiles && target.volatiles[effect.id] && target.volatiles[effect.id].source) credit = target.volatiles[effect.id].source;
							if (target.side.sideConditions && target.side.sideConditions[effect.id] && target.side.sideConditions[effect.id].source) credit = target.side.sideConditions[effect.id].source;
							if (target.side.slotConditions && target.side.slotConditions[target.position] && target.side.slotConditions[target.position][effect.id] && target.side.slotConditions[target.position][effect.id].source) credit = target.side.slotConditions[target.position][effect.id].source;
							if (this.field.getWeather && this.field.getWeather().id === effect.id && this.field.weatherState && this.field.weatherState.source) credit = this.field.weatherState.source;
							if (this.field.getTerrain && this.field.getTerrain().id === effect.id && this.field.terrainState && this.field.terrainState.source) credit = this.field.terrainState.source;
						}
						if (effect.name) {
							if (target.volatiles && target.volatiles[effect.name] && target.volatiles[effect.name].source) credit = target.volatiles[effect.name].source;
							if (target.side.sideConditions && target.side.sideConditions[effect.name] && target.side.sideConditions[effect.name].source) credit = target.side.sideConditions[effect.name].source;
							if (target.side.slotConditions && target.side.slotConditions[target.position] && target.side.slotConditions[target.position][effect.name] && target.side.slotConditions[target.position][effect.name].source) credit = target.side.slotConditions[target.position][effect.name].source;
							if (this.field.getWeather && this.field.getWeather().id === effect.name && this.field.weatherState && this.field.weatherState.source) credit = this.field.weatherState.source;
							if (this.field.getTerrain && this.field.getTerrain().id === effect.name && this.field.terrainState && this.field.terrainState.source) credit = this.field.terrainState.source;
						}
						break;
					// case 'Pokemon':
					case 'Move':
						if (this.activePokemon) credit = this.activePokemon;
						break;
					case 'Item':
						// TO DO: in case of items that affect the holder, I might track the original holder of the item,
						// as well as the reason it ended up on a different Pokémon?
						// For damage, that's only Sticky Barb, Black Sludge and Life Orb;
						// for healing, any item should count
						// Otherwise, the default attribution is good enough as-is
						break;
					case 'Ability':
						if (effect.name) {
							if (["Dry Skin", "Frigid Focus", "Ice Body", "Rain Dish", "Solar Power"].includes(effect.name)) { // weather Abilities
								if (this.field.getWeather() && this.field.weatherState && this.field.weatherState.source) credit = this.field.weatherState.source;
							}
							if (["Dry Skin", "Earth Eater", "Volt Absorb", "Water Absorb"].includes(effect.name)) { // type immunity Abilities
								if (this.activeMove && this.activePokemon) credit = this.activePokemon;
							}
							// Dry Skin is in both lists, but the activeMove one is second so it overwrites the weather credit (in case it gets hit with a Water move while it's raining)
							
							// Abilities like Hospitality, Bad Dreams and Aftermath already provide proper credit
							
							// Poison Heal should credit the status source, but it needs to account for Toxic Spikes
							if (["Poison Heal"].includes(effect.name) && target.statusState) {
								credit = target.statusState.source;
								if (target.statusState.realCredit) credit = target.statusState.realCredit;
							}
						}
						break;
					// case 'Format':
					// case 'Nature':
					// case 'Ruleset':
					case 'Terrain':
						// credit the terrain setter
						if (this.field.getTerrain() && this.field.getTerrain().source) credit = this.field.getTerrain().source;
						break;
					case 'Weather':
						// credit the weather setter
						if (this.field.getWeather() && this.field.getWeather().source) credit = this.field.getWeather().source;
						break;
					case 'Status':
						// in general, credit the status setter
						if (effect.id && target.status && target.status === effect.id && target.statusState) {
							credit = target.statusState.source;
							if (target.statusState.realCredit) credit = target.statusState.realCredit; // Blown Fuse and Toxic Spikes
						}
						if (effect.name && target.status && target.status === effect.name && target.statusState) {
							credit = target.statusState.source;
							if (target.statusState.realCredit) credit = target.statusState.realCredit; // Blown Fuse and Toxic Spikes
						}
						break;
					// case 'Terastal':
					// case 'Rule':
					// case 'ValidatorRule':
				}
			}
			
			if (!credit && source) credit = source;
			if (!credit && target) credit = target;
			
			if (credit) {
				
				let healPercent = (damage / target.maxhp * 100);
				let foeHealPercent = 0;

				let method = null;
				if (effect && effect.name) method = effect.name;
				else if (effect && effect.id) method = effect.id;
				// if I don't like how certain statuses are labeled, I can manually overwrite them here
				switch (method) {
					case 'brn':
						method = 'burn damage';
						if (target.statusState && target.statusState.realEffect) method = target.statusState.realEffect; // Blown Fuse
						break;
					case 'psn':
						method = 'poison damage';
						if (target.statusState && target.statusState.realEffect) method = target.statusState.realEffect; // Toxic Spikes
						break;
					case 'tox':
						method = 'Toxic damage';
						if (target.statusState && target.statusState.realEffect) method = target.statusState.realEffect; // Toxic Spikes
						break;
					case 'Sandstorm':
						method = 'sand chip';
						break;
					case 'Hail':
						method = 'hail chip';
						break;
					case 'confused':
						method = 'confusion damage';
						break;
					case 'Recoil':
						method = 'recoil';
						break;
					case 'partiallytrapped':
						if (target.volatiles && target.volatiles.partiallytrapped && target.volatiles.partiallytrapped.sourceEffect) {
							method = target.volatiles.partiallytrapped.sourceEffect;
						} else method = 'residual damage from a trapping move';
						break;
				}
				
				if (credit && target && credit.side && target.side) {
					if (credit.side !== target.side) { // it's a foeHeal if you heal the other team
						foeHealPercent = healPercent;
						healPercent = 0;

						// adding method:
						credit = `${credit.side.name}'s <strong>${credit.name}</strong>`;
						
						if (method) {
							if (!this.funStats.foeHealMethod[credit]) this.funStats.foeHealMethod[credit] = [];
							if (!this.funStats.foeHealMethod[credit].includes(method)) this.funStats.foeHealMethod[credit].push(method);
						}
					} else {
						// adding method:
						credit = `${credit.side.name}'s <strong>${credit.name}</strong>`;
						
						if (method) {
							if (!this.funStats.healMethod[credit]) this.funStats.healMethod[credit] = [];
							if (!this.funStats.healMethod[credit].includes(method)) this.funStats.healMethod[credit].push(method);
						}
					}
				}
				
				if (this.funStats.heal[credit]) {
					this.funStats.heal[credit] += healPercent;
				} else this.funStats.heal[credit] = healPercent;
				
				if (this.funStats.foeHeal[credit]) {
					this.funStats.foeHeal[credit] += foeHealPercent;
				} else this.funStats.foeHeal[credit] = foeHealPercent;
				
			}
		},
		onDamagePriority: -200,
		onDamage(damage, target, source, effect) {
			if (!damage) return;

			// attribute the source of the damage
			let credit = null;
			
			if (effect && effect.effectType) {
				switch (effect.effectType) {
					case 'Condition':
						if (effect.id) {
							if (target.volatiles && target.volatiles[effect.id] && target.volatiles[effect.id].source) credit = target.volatiles[effect.id].source;
							if (target.side.sideConditions && target.side.sideConditions[effect.id] && target.side.sideConditions[effect.id].source) credit = target.side.sideConditions[effect.id].source;
							if (target.side.slotConditions && target.side.slotConditions[target.position] && target.side.slotConditions[target.position][effect.id] && target.side.slotConditions[target.position][effect.id].source) credit = target.side.slotConditions[target.position][effect.id].source;
							if (this.field.getWeather && this.field.getWeather().id === effect.id && this.field.weatherState && this.field.weatherState.source) credit = this.field.weatherState.source;
							if (this.field.getTerrain && this.field.getTerrain().id === effect.id && this.field.terrainState && this.field.terrainState.source) credit = this.field.terrainState.source;
						}
						if (effect.name) {
							if (target.volatiles && target.volatiles[effect.name] && target.volatiles[effect.name].source) credit = target.volatiles[effect.name].source;
							if (target.side.sideConditions && target.side.sideConditions[effect.name] && target.side.sideConditions[effect.name].source) credit = target.side.sideConditions[effect.name].source;
							if (target.side.slotConditions && target.side.slotConditions[target.position] && target.side.slotConditions[target.position][effect.name] && target.side.slotConditions[target.position][effect.name].source) credit = target.side.slotConditions[target.position][effect.name].source;
							if (this.field.getWeather && this.field.getWeather().id === effect.name && this.field.weatherState && this.field.weatherState.source) credit = this.field.weatherState.source;
							if (this.field.getTerrain && this.field.getTerrain().id === effect.name && this.field.terrainState && this.field.terrainState.source) credit = this.field.terrainState.source;
						}
						break;
					// case 'Pokemon':
					case 'Move':
						if (this.activePokemon) credit = this.activePokemon;
						break;
					case 'Item':
						// TO DO: in case of items that affect the holder, I might track the original holder of the item,
						// as well as the reason it ended up on a different Pokémon?
						// For damage, that's only Sticky Barb, Black Sludge and Life Orb;
						// for healing, any item should count
						// Otherwise, the default attribution is good enough as-is
						break;
					case 'Ability':
						if (effect.name) {
							if (["Dry Skin", "Frigid Focus", "Ice Body", "Rain Dish", "Solar Power"].includes(effect.name)) { // weather Abilities
								if (this.field.getWeather() && this.field.weatherState && this.field.weatherState.source) credit = this.field.weatherState.source;
							}
							if (["Dry Skin", "Earth Eater", "Volt Absorb", "Water Absorb"].includes(effect.name)) { // type immunity Abilities
								if (this.activeMove && this.activePokemon) credit = this.activePokemon;
							}
							// Dry Skin is in both lists, but the activeMove one is second so it overwrites the weather credit (in case it gets hit with a Water move while it's raining)
							
							// Abilities like Hospitality, Bad Dreams and Aftermath already provide proper credit
							
							// Poison Heal should credit the status source, but it needs to account for Toxic Spikes
							if (["Poison Heal"].includes(effect.name) && target.statusState) {
								credit = target.statusState.source;
								if (target.statusState.realCredit) credit = target.statusState.realCredit;
							}
						}
						break;
					// case 'Format':
					// case 'Nature':
					// case 'Ruleset':
					case 'Terrain':
						// credit the terrain setter
						if (this.field.getTerrain() && this.field.getTerrain().source) credit = this.field.getTerrain().source;
						break;
					case 'Weather':
						// credit the weather setter
						if (this.field.getWeather() && this.field.getWeather().source) credit = this.field.getWeather().source;
						break;
					case 'Status':
						// in general, credit the status setter
						if (effect.id && target.status && target.status === effect.id && target.statusState) {
							credit = target.statusState.source;
							if (target.statusState.realCredit) credit = target.statusState.realCredit; // Blown Fuse and Toxic Spikes
						}
						if (effect.name && target.status && target.status === effect.name && target.statusState) {
							credit = target.statusState.source;
							if (target.statusState.realCredit) credit = target.statusState.realCredit; // Blown Fuse and Toxic Spikes
						}
						break;
					// case 'Terastal':
					// case 'Rule':
					// case 'ValidatorRule':
				}
			}
			
			if (!credit && source) credit = source;
			if (!credit && target) credit = target;
			
			if (credit && (credit !== target)) { // self-damage no longer counts as ally damage
				
				let damagePercent = (damage / target.maxhp * 100);
				let allyDamage = 0;
				let overkill = 0;
				
				if (damage > target.hp) {
					damagePercent = (target.hp / target.maxhp * 100);
					overkill = ((damage - target.hp) / target.maxhp * 100);
				}
				
				let method = null;
				if (effect && effect.name) method = effect.name;
				else if (effect && effect.id) method = effect.id;
				// if I don't like how certain statuses are labeled, I can manually overwrite them here
				switch (method) {
					case 'brn':
						method = 'burn damage';
						if (target.statusState && target.statusState.realEffect) method = target.statusState.realEffect; // Blown Fuse
						break;
					case 'psn':
						method = 'poison damage';
						if (target.statusState && target.statusState.realEffect) method = target.statusState.realEffect; // Toxic Spikes
						break;
					case 'tox':
						method = 'Toxic damage';
						if (target.statusState && target.statusState.realEffect) method = target.statusState.realEffect; // Toxic Spikes
						break;
					case 'Sandstorm':
						method = 'sand chip';
						break;
					case 'Hail':
						method = 'hail chip';
						break;
					case 'confused':
						method = 'confusion damage';
						break;
					case 'Recoil':
						method = 'recoil';
						break;
					case 'partiallytrapped':
						if (target.volatiles && target.volatiles.partiallytrapped && target.volatiles.partiallytrapped.sourceEffect) {
							method = target.volatiles.partiallytrapped.sourceEffect;
						} else method = 'residual damage from a trapping move';
						break;
				}

				// overkill
				if (!this.funStats.overkill.damage || overkill > this.funStats.overkill.damage) {
					this.funStats.overkill.damage = overkill;
					this.funStats.overkill.highlights = [];
					// "The biggest overkill was..."
					this.funStats.overkill.highlights.push(`when ${credit.side.name}'s <strong>${credit.name}</strong> damaged ${target.side.name}'s <strong>${target.name}</strong> with ${method}`);
					// "... which did ${this.funStats.overkill.damage}% more damage than necessary!"
				} else if (overkill === this.funStats.overkill.damage) {
					if (!this.funStats.overkill.highlights) this.funStats.overkill.highlights = [];
					this.funStats.overkill.highlights.push(`when ${credit.side.name}'s <strong>${credit.name}</strong> damaged ${target.side.name}'s <strong>${target.name}</strong> with ${method}`);
				}
				
				if (credit && target && credit.side && target.side) {
					if (credit.side === target.side) { // it's an allyDamage if you hurt the same team
						allyDamage = damagePercent;
						damagePercent = 0;
						
						// adding method:
						credit = `${credit.side.name}'s <strong>${credit.name}</strong>`;
						
						if (method) {
							if (!this.funStats.allyDamageMethod[credit]) this.funStats.allyDamageMethod[credit] = [];
							if (!this.funStats.allyDamageMethod[credit].includes(method)) this.funStats.allyDamageMethod[credit].push(method);
						}
					} else {
						// adding method
						credit = `${credit.side.name}'s <strong>${credit.name}</strong>`;
						
						if (method) {
							// for damage, you should also generalize damaging moves
							if (effect && effect.effectType && effect.effectType === "Move") method = "attacks";
							
							if (!this.funStats.damageMethod[credit]) this.funStats.damageMethod[credit] = [];
							if (!this.funStats.damageMethod[credit].includes(method)) this.funStats.damageMethod[credit].push(method);
						}
					}
				}
				
				// damage
				if (this.funStats.damage[credit]) {
					this.funStats.damage[credit] += damagePercent;
				} else this.funStats.damage[credit] = damagePercent;

				// ally damage
				if (this.funStats.allyDamage[credit]) {
					this.funStats.allyDamage[credit] += allyDamage;
				} else this.funStats.allyDamage[credit] = allyDamage;
				
			}
		},
		onPainSplit(sameSide, credit, targetChangePercent, userChangePercent) {
			// okay, targetChange should be an amount of damage if it's postive or an amount of healing if it's negative
			
			// ignoring sameSide because for some reason it's always sending "true"
			// that means this *TECHNICALLY* reports incorrectly if the user targets and damages its ally with Pain Split in a double battle,
			// but that'll never come up, right??
			
			if (targetChangePercent > 0) {
				// damage
				if (this.funStats.damage[credit]) {
					this.funStats.damage[credit] += targetChangePercent;
				} else this.funStats.damage[credit] = targetChangePercent;
				if (!this.funStats.damageMethod[credit]) this.funStats.damageMethod[credit] = [];
				if (!this.funStats.damageMethod[credit].includes('Pain Split')) this.funStats.damageMethod[credit].push('Pain Split');
			} else if (targetChangePercent < 0) {
				// foeHeal
				if (this.funStats.foeHeal[credit]) {
					this.funStats.foeHeal[credit] -= targetChangePercent;
				} else this.funStats.foeHeal[credit] = -1 * targetChangePercent;
				if (!this.funStats.foeHealMethod[credit]) this.funStats.foeHealMethod[credit] = [];
				if (!this.funStats.foeHealMethod[credit].includes('Pain Split')) this.funStats.foeHealMethod[credit].push('Pain Split');
			}

			// and (pokemon.hp - averagehp) should be an amount of damage if it's postive or an amount of healing if it's negative
			/*if (userChangePercent > 0) {
				// allyDamage
				if (this.funStats.allyDamage[credit]) {
					this.funStats.allyDamage[credit] += userChangePercent;
				} else this.funStats.allyDamage[credit] = userChangePercent;
				if (!this.funStats.allyDamageMethod[credit]) this.funStats.allyDamageMethod[credit] = [];
				if (!this.funStats.allyDamageMethod[credit].includes('Pain Split')) this.funStats.allyDamageMethod[credit].push('Pain Split');
			} else */if (userChangePercent < 0) { // self-damage no longer counts as ally damage
				// heal
				if (this.funStats.heal[credit]) {
					this.funStats.heal[credit] -= userChangePercent;
				} else this.funStats.heal[credit] = -1 * userChangePercent;
				if (!this.funStats.healMethod[credit]) this.funStats.healMethod[credit] = [];
				if (!this.funStats.healMethod[credit].includes('Pain Split')) this.funStats.healMethod[credit].push('Pain Split');
			}
		},
		onRevivalBlessingData(pokemon, target) {
			if (this.funStats.heal[`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`]) {
				this.funStats.heal[`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`] += (target.hp / target.maxhp * 100);
			} else this.funStats.heal[`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`] = (target.hp / target.maxhp * 100);
			if (!this.funStats.healMethod[`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`]) this.funStats.healMethod[`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`] = [];
			if (!this.funStats.healMethod[`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`].includes('Revival Blessing')) this.funStats.healMethod[`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`].push('Revival Blessing');
		},
		onPerishSongForceKO(target, source) {
			if (target.side === source.side) {
				if (this.funStats.allyDamage[`${source.side.name}'s <strong>${source.name}</strong>`]) {
					this.funStats.allyDamage[`${source.side.name}'s <strong>${source.name}</strong>`] += (target.hp / target.maxhp * 100);
				} else this.funStats.allyDamage[`${source.side.name}'s <strong>${source.name}</strong>`] = (target.hp / target.maxhp * 100);
				if (!this.funStats.allyDamageMethod[`${source.side.name}'s <strong>${source.name}</strong>`]) this.funStats.allyDamageMethod[`${source.side.name}'s <strong>${source.name}</strong>`] = [];
				if (!this.funStats.allyDamageMethod[`${source.side.name}'s <strong>${source.name}</strong>`].includes('Perish Song')) this.funStats.allyDamageMethod[`${source.side.name}'s <strong>${source.name}</strong>`].push('Perish Song');
			} else {
				if (this.funStats.damage[`${source.side.name}'s <strong>${source.name}</strong>`]) {
					this.funStats.damage[`${source.side.name}'s <strong>${source.name}</strong>`] += (target.hp / target.maxhp * 100);
				} else this.funStats.damage[`${source.side.name}'s <strong>${source.name}</strong>`] = (target.hp / target.maxhp * 100);
				if (!this.funStats.damageMethod[`${source.side.name}'s <strong>${source.name}</strong>`]) this.funStats.damageMethod[`${source.side.name}'s <strong>${source.name}</strong>`] = [];
				if (!this.funStats.damageMethod[`${source.side.name}'s <strong>${source.name}</strong>`].includes('Perish Song')) this.funStats.damageMethod[`${source.side.name}'s <strong>${source.name}</strong>`].push('Perish Song');
			}
		},
		onDestinyBondForceKO(target, source) {
			if (this.funStats.damage[`${source.side.name}'s <strong>${source.name}</strong>`]) {
				this.funStats.damage[`${source.side.name}'s <strong>${source.name}</strong>`] += (target.hp / target.maxhp * 100);
			} else this.funStats.damage[`${source.side.name}'s <strong>${source.name}</strong>`] = (target.hp / target.maxhp * 100);
			if (!this.funStats.damageMethod[`${source.side.name}'s <strong>${source.name}</strong>`]) this.funStats.damageMethod[`${source.side.name}'s <strong>${source.name}</strong>`] = [];
			if (!this.funStats.damageMethod[`${source.side.name}'s <strong>${source.name}</strong>`].includes('Destiny Bond')) this.funStats.damageMethod[`${source.side.name}'s <strong>${source.name}</strong>`].push('Destiny Bond');
		},
		
		onBattleFinished() {
			// report stats
			if (!this.funStats) return; // just in case
			let statsReveal = `raw|<hr><div class="hint">`;

			// max damage
			let maxDamage = 0;
			let damageRecordHolder = null;
			let damageRecordMethod = null;
			
			let damageRecordTie = false;
			let damageRecordHolderTie = [];
			
			if (this.funStats.damage) {
				for (const i in this.funStats.damage) {
					if (this.funStats.damage[i] > maxDamage) {
						damageRecordTie = false;
						damageRecordHolderTie = []; // reset
						
						maxDamage = this.funStats.damage[i];
						damageRecordHolder = i;
						damageRecordHolderTie.push(i);
						
						if (this.funStats.damageMethod[i]) damageRecordMethod = this.funStats.damageMethod[i];
						else damageRecordMethod = null;
					} else if (this.funStats.damage[i] === maxDamage) {
						damageRecordTie = true;
						damageRecordHolderTie.push(i);
						// don't report methods in case of ties
					}
				}
			}
			if (damageRecordTie && damageRecordHolderTie && damageRecordHolderTie.length && damageRecordHolderTie.length > 1 && maxDamage > 0) {
				// absolute safety msjhdfg
				let damageReport = `The Pokémon that did the most damage were `;
				let order = 0;
				for (const tiedRecordHolder of damageRecordHolderTie) {
					order++;
					if (order < damageRecordHolderTie.length) {
						damageReport += ` ${tiedRecordHolder}`;
						if (order + 1 < damageRecordHolderTie.length) overkillReport += `,`;
					}
					else damageReport += ` and ${tiedRecordHolder}`;
				}
				damageReport += `,<br>who somehow tied by each dealing <strong>${Math.round(maxDamage*10)/10}</strong>% in total damage to the opposing team!<br>`;
				statsReveal += damageReport;
			} else {
				if (maxDamage > 0 && damageRecordHolder) {
					let damageReport = `The Pokémon that did the most damage was ${damageRecordHolder}.<br>`;
					if (damageRecordMethod) {
						if (damageRecordMethod.length && damageRecordMethod.length > 1) {
							damageReport += `Between `;
							let order = 0;
							for (const damageMethod of damageRecordMethod) {
								order++;
								if (order < damageRecordMethod.length) {
									damageReport += ` ${damageMethod}`;
									if (order + 1 < damageRecordMethod.length) damageReport += `,`;
								}
								else damageReport += ` and ${damageMethod}`;
							}
						} else {
							damageReport += `With ${damageRecordMethod[0]}`;
						}
						damageReport += `, i`;
					} else damageReport += `I`;
					damageReport += `t dealt <strong>${Math.round(maxDamage*10)/10}</strong>% in total damage to the opposing team!<br>`;
					statsReveal += damageReport;
				}
			}

			// max ally damage
			let maxAllyDamage = 0;
			let allyDamageRecordHolder = null;
			let allyDamageRecordMethod = null;
			
			let allyDamageRecordTie = false;
			let allyDamageRecordHolderTie = [];
			
			if (this.funStats.allyDamage) {
				for (const i in this.funStats.allyDamage) {
					if (this.funStats.allyDamage[i] > maxAllyDamage) {
						allyDamageRecordTie = false;
						allyDamageRecordHolderTie = []; // reset
						
						maxAllyDamage = this.funStats.allyDamage[i];
						allyDamageRecordHolder = i;
						allyDamageRecordHolderTie.push(i);
						
						if (this.funStats.allyDamageMethod[i]) allyDamageRecordMethod = this.funStats.allyDamageMethod[i];
						else allyDamageRecordMethod = null;
					} else if (this.funStats.allyDamage[i] === maxAllyDamage) {
						allyDamageRecordTie = true;
						allyDamageRecordHolderTie.push(i);
						// don't report methods in case of ties
					}
				}
			}
			if (allyDamageRecordTie && allyDamageRecordHolderTie && allyDamageRecordHolderTie.length && allyDamageRecordHolderTie.length > 1 && maxAllyDamage > 25) {
				// absolute safety msjhdfg
				let allyDamageReport = `<br>`;
				let order = 0;
				for (const tiedRecordHolder of allyDamageRecordHolderTie) {
					order++;
					if (order < allyDamageRecordHolderTie.length) {
						allyDamageReport += ` ${tiedRecordHolder}`;
						if (order + 1 < allyDamageRecordHolderTie.length) overkillReport += `,`;
					}
					else allyDamageReport += ` and ${tiedRecordHolder}`;
				}
				allyDamageReport += `share the dubious honor of... damaging their own teams the most!<br>They tied by each doing <strong>${Math.round(maxAllyDamage*10)/10}</strong>% in total damage to their own side.<br>`;
				statsReveal += allyDamageReport;
			} else {
				if (maxAllyDamage > 25 && allyDamageRecordHolder) {
					let allyDamageReport = `<br>Whoops! ${allyDamageRecordHolder} hurt its own team more than any other Pokémon.<br>`;
					if (allyDamageRecordMethod) {
						if (allyDamageRecordMethod.length && allyDamageRecordMethod.length > 1) {
							allyDamageReport += `Between `;
							let order = 0;
							for (const damageMethod of allyDamageRecordMethod) {
								order++;
								if (order < allyDamageRecordMethod.length) {
									allyDamageReport += ` ${damageMethod}`;
									if (order + 1 < allyDamageRecordMethod.length) allyDamageReport += `,`;
								}
								else allyDamageReport += ` and ${damageMethod}`;
							}
						} else {
							allyDamageReport += `With ${allyDamageRecordMethod[0]}`;
						}
						allyDamageReport += `, i`;
					} else allyDamageReport += `I`;
					allyDamageReport += `t hurt its own team for <strong>${Math.round(maxAllyDamage*10)/10}</strong>% in total damage.<br>`;
					if (this.funStats.damage[allyDamageRecordHolder] && maxAllyDamage > this.funStats.damage[allyDamageRecordHolder]) {
						allyDamageReport += `Incidentally, it only hurt the opposing team for <strong>${Math.round(this.funStats.damage[allyDamageRecordHolder]*10)/10}</strong>%...<br>Darnit, ${allyDamageRecordHolder}! Whose side are you on?!<br>`;
					} else if (!this.funStats.damage[allyDamageRecordHolder]) {
						allyDamageReport += `But it never hurt the opposing team at all...<br>`;
					}
					statsReveal += allyDamageReport;
				}
			}
			
			// most supportive
			let maxHpRestore = 0;
			let hpRestoreRecordHolder = null;
			let hpRestoreRecordMethod = null;
			
			let hpRestoreRecordTie = false;
			let hpRestoreRecordHolderTie = [];
			
			if (this.funStats.heal) {
				for (const i in this.funStats.heal) {
					if (this.funStats.heal[i] > maxHpRestore) {
						hpRestoreRecordTie = false;
						hpRestoreRecordHolderTie = []; // reset
						
						maxHpRestore = this.funStats.heal[i];
						hpRestoreRecordHolder = i;
						hpRestoreRecordHolderTie.push(i);
						
						if (this.funStats.healMethod[i]) hpRestoreRecordMethod = this.funStats.healMethod[i];
						else hpRestoreRecordMethod = null;
					} else if (this.funStats.heal[i] === maxHpRestore) {
						hpRestoreRecordTie = true;
						hpRestoreRecordHolderTie.push(i);
						// don't report methods in case of ties
					}
				}
			}
			if (hpRestoreRecordTie && hpRestoreRecordHolderTie && hpRestoreRecordHolderTie.length && hpRestoreRecordHolderTie.length > 1 && maxHpRestore > 50) {
				// absolute safety msjhdfg
				let hpRestoreReport = `<br>The Pokémon that healed the most were `;
				let order = 0;
				for (const tiedRecordHolder of hpRestoreRecordHolderTie) {
					order++;
					if (order < hpRestoreRecordHolderTie.length) {
						hpRestoreReport += ` ${tiedRecordHolder}`;
						if (order + 1 < hpRestoreRecordHolderTie.length) overkillReport += `,`;
					}
					else hpRestoreReport += ` and ${tiedRecordHolder}`;
				}
				hpRestoreReport += `,<br>who each restored <strong>${Math.round(maxHpRestore*10)/10}</strong>% in total HP to their team!<br>`;
				statsReveal += hpRestoreReport;
			} else {
				if (maxHpRestore > 50 && hpRestoreRecordHolder) {
					let hpRestoreReport = `<br>The Pokémon that healed the most was ${hpRestoreRecordHolder}.<br>`;
					if (hpRestoreRecordMethod) {
						if (hpRestoreRecordMethod.length && hpRestoreRecordMethod.length > 1) {
							hpRestoreReport += `Between `;
							let order = 0;
							for (const healMethod of hpRestoreRecordMethod) {
								order++;
								if (order < hpRestoreRecordMethod.length) {
									hpRestoreReport += ` ${healMethod}`;
									if (order + 1 < hpRestoreRecordMethod.length) hpRestoreReport += `,`;
								}
								else hpRestoreReport += ` and ${healMethod}`;
							}
						} else {
							hpRestoreReport += `With ${hpRestoreRecordMethod[0]}`;
						}
						hpRestoreReport += `, i`;
					} else hpRestoreReport += `I`;
					hpRestoreReport += `t restored <strong>${Math.round(maxHpRestore*10)/10}</strong>% in total HP to its team!<br>`;
					statsReveal += hpRestoreReport;
				}
			}

			// most foe healing
			let maxFoeHeal = 0;
			let foeHealRecordHolder = null;
			let foeHealRecordMethod = null;
			
			let foeHealRecordTie = false;
			let foeHealRecordHolderTie = [];
			
			if (this.funStats.foeHeal) {
				for (const i in this.funStats.foeHeal) {
					if (this.funStats.foeHeal[i] > maxFoeHeal) {
						foeHealRecordTie = false;
						foeHealRecordHolderTie = []; // reset
						
						maxFoeHeal = this.funStats.foeHeal[i];
						foeHealRecordHolder = i;
						foeHealRecordHolderTie.push(i);
						
						if (this.funStats.foeHealMethod[i]) foeHealRecordMethod = this.funStats.foeHealMethod[i];
						else foeHealRecordMethod = null;
					} else if (this.funStats.foeHeal[i] === maxFoeHeal) {
						foeHealRecordTie = true;
						foeHealRecordHolderTie.push(i);
						// don't report methods in case of ties
					}
				}
			}
			if (foeHealRecordTie && foeHealRecordHolderTie && foeHealRecordHolderTie.length && foeHealRecordHolderTie.length > 1 && maxFoeHeal > 25) {
				// absolute safety msjhdfg
				let foeHealReport = `<br>`;
				let order = 0;
				for (const tiedRecordHolder of foeHealRecordHolderTie) {
					order++;
					if (order < foeHealRecordHolderTie.length) {
						foeHealReport += ` ${tiedRecordHolder}`;
						if (order + 1 < foeHealRecordHolderTie.length) overkillReport += `,`;
					}
					else foeHealReport += ` and ${tiedRecordHolder}`;
				}
				foeHealReport += `accidentally tied for... healing the other team the most!<br>They each restored <strong>${Math.round(maxFoeHeal*10)/10}</strong>% in HP to the opposing side.<br>`;
				statsReveal += foeHealReport;
			} else {
				if (maxFoeHeal > 25 && foeHealRecordHolder) {
					let foeHealReport = `<br>${foeHealRecordHolder} healed the other team more than any other Pokémon.<br>`;
					if (foeHealRecordMethod) {
						if (foeHealRecordMethod.length && foeHealRecordMethod.length > 1) {
							foeHealReport += `Between `;
							let order = 0;
							for (const healMethod of foeHealRecordMethod) {
								order++;
								if (order < foeHealRecordMethod.length) {
									foeHealReport += ` ${healMethod}`;
									if (order + 1 < foeHealRecordMethod.length) foeHealReport += `,`;
								}
								else foeHealReport += ` and ${healMethod}`;
							}
						} else {
							foeHealReport += `Because of ${foeHealRecordMethod[0]}`;
						}
						foeHealReport += `, i`;
					} else foeHealReport += `I`;
					foeHealReport += `t healed the opposing team for <strong>${Math.round(maxFoeHeal*10)/10}</strong>% in total HP.<br>`;
					if (this.funStats.heal[foeHealRecordHolder] && maxFoeHeal > this.funStats.heal[foeHealRecordHolder]) {
						foeHealReport += `Incidentally, it only healed its own team for <strong>${Math.round(this.funStats.heal[foeHealRecordHolder]*10)/10}</strong>%...<br>It's doing its best, okay?<br>`;
					} else if (!this.funStats.heal[foeHealRecordHolder]) {
						foeHealReport += `But it never healed its own team at all...<br>`;
					}
					statsReveal += foeHealReport;
				}
			}

			// overkill
			if (
				this.funStats.overkill && this.funStats.overkill.damage && this.funStats.overkill.damage > 50 &&
				this.funStats.overkill.highlights && this.funStats.overkill.highlights.length
			) {
				let overkillReport = `<br>The biggest overkill was `;
				if (this.funStats.overkill.highlights.length > 1) {
					overkillReport += `a tie between `;
					let order = 0;
					for (const overkillHighlight of this.funStats.overkill.highlights) {
						order++;
						if (order < this.funStats.overkill.highlights.length) {
							overkillReport += ` ${overkillHighlight}`;
							if (order + 1 < this.funStats.overkill.highlights.length) overkillReport += `,`;
						}
						else overkillReport += ` and ${overkillHighlight}`;
					}
				} else overkillReport += `${this.funStats.overkill.highlights[0]}`;
				overkillReport += `, which did <strong>${Math.round(this.funStats.overkill.damage*10)/10}</strong>% more damage than necessary!<br>`;
				statsReveal += overkillReport;
			}

			// other stats
			let tankedHitsRecord = 0;
			let tankedHitsRecordHolder = null;
			let tankedHitsRecordTie = false;
			let tankedHitsRecordHolderTie = [];
			
			let movesMissedRecord = 0;
			let movesMissedRecordHolder = null;
			let movesMissedRecordTie = false;
			let movesMissedRecordHolderTie = [];
			
			let movesDodgedRecord = 0;
			let movesDodgedRecordHolder = null;
			let movesDodgedRecordTie = false;
			let movesDodgedRecordHolderTie = [];
			
			let superEffectiveHitsRecord = 0;
			let superEffectiveHitsRecordHolder = null;
			let superEffectiveHitsRecordTie = false;
			let superEffectiveHitsRecordHolderTie = [];
			
			for (const side of this.sides) {
				for (const pokemon of side.pokemon) {
					// hits tanked
					if (pokemon.timesAttacked && pokemon.timesAttacked > tankedHitsRecord) {
						tankedHitsRecordTie = false;
						tankedHitsRecordHolderTie = []; // reset
						
						tankedHitsRecord = pokemon.timesAttacked;
						tankedHitsRecordHolder = `${pokemon.side.name}'s <strong>${pokemon.name}</strong>`;
						tankedHitsRecordHolderTie.push(`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`);
					} else if (pokemon.timesAttacked && pokemon.timesAttacked === tankedHitsRecord) {
						tankedHitsRecordTie = true;
						tankedHitsRecordHolderTie.push(`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`);
					}

					// moves missed
					if (pokemon.m.movesMissed && pokemon.m.movesMissed > movesMissedRecord) {
						movesMissedRecordTie = false;
						movesMissedRecordHolderTie = []; // reset
						
						movesMissedRecord = pokemon.m.movesMissed;
						movesMissedRecordHolder = `${pokemon.side.name}'s <strong>${pokemon.name}</strong>`;
						movesMissedRecordHolderTie.push(`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`);
					} else if (pokemon.m.movesMissed && pokemon.m.movesMissed === movesMissedRecord) {
						movesMissedRecordTie = true;
						movesMissedRecordHolderTie.push(`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`);
					}

					// moves dodged
					if (pokemon.m.movesDodged && pokemon.m.movesDodged > movesDodgedRecord) {
						movesDodgedRecordTie = false;
						movesDodgedRecordHolderTie = []; // reset
						
						movesDodgedRecord = pokemon.m.movesDodged;
						movesDodgedRecordHolder = `${pokemon.side.name}'s <strong>${pokemon.name}</strong>`;
						movesDodgedRecordHolderTie.push(`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`);
					} else if (pokemon.m.movesDodged && pokemon.m.movesDodged === movesDodgedRecord) {
						movesDodgedRecordTie = true;
						movesDodgedRecordHolderTie.push(`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`);
					}
					
					// super effective hits
					if (pokemon.m.superEffectiveHits && pokemon.m.superEffectiveHits > superEffectiveHitsRecord) {
						superEffectiveHitsRecordTie = false;
						superEffectiveHitsRecordHolderTie = []; // reset
						
						superEffectiveHitsRecord = pokemon.m.superEffectiveHits;
						superEffectiveHitsRecordHolder = `${pokemon.side.name}'s <strong>${pokemon.name}</strong>`;
						superEffectiveHitsRecordHolderTie.push(`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`);
					} else if (pokemon.m.superEffectiveHits && pokemon.m.superEffectiveHits === superEffectiveHitsRecord) {
						superEffectiveHitsRecordTie = true;
						superEffectiveHitsRecordHolderTie.push(`${pokemon.side.name}'s <strong>${pokemon.name}</strong>`);
					}
				}
			}
			
			if (tankedHitsRecord && tankedHitsRecord > 2) {
				let tankedHitsReport = `<br>The Pokémon that took the most hits `;
				if (tankedHitsRecordTie) {
					tankedHitsReport += `were `;
					let order = 0;
					for (const tankedHitsInstance of tankedHitsRecordHolderTie) {
						order++;
						if (order < tankedHitsRecordHolderTie.length) {
							tankedHitsReport += ` ${tankedHitsInstance}`;
							if (order + 1 < tankedHitsRecordHolderTie.length) tankedHitsReport += `,`;
						}
						else tankedHitsReport += ` and ${tankedHitsInstance},<br>who were each attacked <strong>${tankedHitsRecord}</strong> times!<br>`;
					}
				} else tankedHitsReport += `was ${tankedHitsRecordHolder},<br>who was attacked <strong>${tankedHitsRecord}</strong> times!<br>`;
				statsReveal += tankedHitsReport;
			}

			if (movesDodgedRecord && movesDodgedRecord > 2 && (!movesMissedRecord || movesDodgedRecord > movesMissedRecord)) {
				// only report one or the other - but if they're equal, movesMissed is funnier
				let movesDodgedReport = `<br>The Pokémon that dodged the most moves `;
				if (movesDodgedRecordTie) {
					movesDodgedReport += `were `;
					let order = 0;
					for (const movesDodgedInstance of movesDodgedRecordHolderTie) {
						order++;
						if (order < movesDodgedRecordHolderTie.length) {
							movesDodgedReport += ` ${movesDodgedInstance}`;
							if (order + 1 < movesDodgedRecordHolderTie.length) movesDodgedReport += `,`;
						}
						else movesDodgedReport += ` and ${movesDodgedInstance},<br>who each avoided <strong>${movesDodgedRecord}</strong> hits!<br>`;
					}
				} else movesDodgedReport += `was ${movesDodgedRecordHolder},<br>who avoided <strong>${movesDodgedRecord}</strong> hits!<br>`;
				statsReveal += movesDodgedReport;
			} else {
				if (movesMissedRecord && movesMissedRecord > 2) {
					let movesMissedReport = `<br>The Pokémon that struggled the most with accuracy `;
					if (movesMissedRecordTie) {
						movesMissedReport += `were `;
						let order = 0;
						for (const movesMissedInstance of movesMissedRecordHolderTie) {
							order++;
							if (order < movesMissedRecordHolderTie.length) {
								movesMissedReport += ` ${movesMissedInstance}`;
								if (order + 1 < movesMissedRecordHolderTie.length) movesMissedReport += `,`;
							}
							else movesMissedReport += ` and ${movesMissedInstance},<br>who each missed <strong>${movesMissedRecord}</strong> times!<br>`;
						}
					} else movesMissedReport += `was ${movesMissedRecordHolder},<br>who missed <strong>${movesMissedRecord}</strong> times!<br>Maybe it just needs glasses?<br>`;
					statsReveal += movesMissedReport;
				}
			}
			
			if (superEffectiveHitsRecord && superEffectiveHitsRecord > 2) {
				let superEffectiveHitsReport = `<br>The Pokémon that landed the most super-effective hits `;
				if (superEffectiveHitsRecordTie) {
					superEffectiveHitsReport += `were `;
					let order = 0;
					for (const superEffectiveHitsInstance of superEffectiveHitsRecordHolderTie) {
						order++;
						if (order < superEffectiveHitsRecordHolderTie.length) {
							superEffectiveHitsReport += ` ${superEffectiveHitsInstance}`;
							if (order + 1 < superEffectiveHitsRecordHolderTie.length) superEffectiveHitsReport += `,`;
						}
						else superEffectiveHitsReport += ` and ${superEffectiveHitsInstance},<br>with <strong>${superEffectiveHitsRecord}</strong> hits each!<br>`;
					}
				} else superEffectiveHitsReport += `${superEffectiveHitsRecordHolder},<br>with <strong>${superEffectiveHitsRecord}</strong> hits!<br>`;
				statsReveal += superEffectiveHitsReport;
			}

			if (statsReveal !== `raw|<div class="hint">`) {
				statsReveal += `</div><hr>`;
				this.add(statsReveal.replace(`<div class="hint"><br>`,`<div class="hint">`));
				// ^ just making sure it doesn't start with an extra <br> when damage isn't dealt
			}
		},
	},
};
