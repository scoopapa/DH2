export const Formats: {[k: string]: FormatData} = {
	antiinvulnerabilitymod: {
		effectType: 'Rule',
		name: 'Anti-Invulnerability Mod',
		desc: 'If a Pokémon has become invulnerable by being revived improperly, this allows it to take damage and faint normally.',
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (damage > target.hp) {
				return target.hp;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.maxhp === 1 && pokemon.hp < 1) {
				this.add('faint', pokemon);
				pokemon.side.pokemonLeft--;
				this.runEvent('Faint', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon);
				pokemon.clearVolatile(false);
				pokemon.fainted = true;
				pokemon.illusion = null;
				pokemon.isActive = false;
				pokemon.isStarted = false;
				pokemon.side.faintedThisTurn = true;
			}
		},
	},

	datamod: {
		effectType: 'Rule',
		name: 'Data Mod',
		desc: 'When a new Pokémon switches in for the first time, information about its types, stats and Abilities is displayed to both players.',
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				const species = this.dex.getSpecies(pokemon.species.name);
				const baseSpecies = Dex.getSpecies(pokemon.species.name);
				let modded = false;
				for (const type in [0, 1]) {
					if (species.types[type] !== baseSpecies.types[type]) {
						console.log(species.types[type] + " is different from " + baseSpecies.types[type]);
						modded = true;
					}
				}
				if (species.baseStats.hp !== baseSpecies.baseStats.hp) modded = true;
				if (species.baseStats.atk !== baseSpecies.baseStats.atk) modded = true;
				if (species.baseStats.def !== baseSpecies.baseStats.def) modded = true;
				if (species.baseStats.spa !== baseSpecies.baseStats.spa) modded = true;
				if (species.baseStats.spd !== baseSpecies.baseStats.spd) modded = true;
				if (species.baseStats.spe !== baseSpecies.baseStats.spe) modded = true;
				if (species.abilities[0] !== baseSpecies.abilities[0]) modded = true;
				if (species.abilities[1] !== baseSpecies.abilities[1]) modded = true;
				if (species.abilities['H'] !== baseSpecies.abilities['H']) modded = true;
				if (species.abilities['S'] !== baseSpecies.abilities['S']) modded = true;
				if (modded) {
					pokemon.isModded = true;
					console.log(species.name + " is different from in canon");
				} else {
					console.log(species.name + " is the same as in canon");
				}
			}
		},
		onSwitchIn(pokemon) {
			let species = this.dex.getSpecies(pokemon.species.name);
			let switchedIn = pokemon.switchedIn;
			if (pokemon.illusion) {
				species = this.dex.getSpecies(pokemon.illusion.species.name);
				console.log(pokemon.illusion.name + " is being reported");
				if (!pokemon.illusion.isModded) return;
				this.add('-start', pokemon, 'typechange', pokemon.illusion.getTypes(true).join('/'), '[silent]');
				if (pokemon.illusion.switchedIn) return;
				pokemon.illusion.switchedIn = true;
			} else {
				console.log(pokemon.name + " is being reported");
				if (!pokemon.isModded) return;
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				if (pokemon.switchedIn) return;
				pokemon.switchedIn = true;
			}
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
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			}
			this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
		},
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) { // making sure the correct information is given when an Illusion breaks
				if (target.isModded) {
					this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
					if (!target.switchedIn) {
						target.switchedIn = true;
						let species = this.dex.getSpecies(target.species.name);
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
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
						} else {
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
						}
						this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					}
				} else {
					this.add('-end', target, 'typechange', '[silent]');
				}
			}
		},
	},
	megadatamod: {
		effectType: 'Rule',
		name: 'Mega Data Mod',
		desc: 'Gives data on stats, Ability and types when a Pokémon Mega Evolves or undergoes Ultra Burst.',
		onSwitchIn(pokemon) {
			if (pokemon.illusion) {
				if (pokemon.illusion.species.forme.startsWith('Mega') || pokemon.illusion.species.forme.startsWith('Ultra')) {
					this.add('-start', pokemon, 'typechange', pokemon.illusion.getTypes(true).join('/'), '[silent]');
				}
			} else {
				if (pokemon.species.forme.startsWith('Mega') || pokemon.species.forme.startsWith('Ultra')) {
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) {
				if (target.species.forme.startsWith('Mega') || target.species.forme.startsWith('Ultra')) {
					this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
				} else {
					this.add('-end', target, 'typechange', '[silent]');
				}
			}
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			const species = this.dex.getSpecies(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
			pokemon.switchedIn = true;
		},
	},
	
	movexitclause: {
		effectType: 'ValidatorRule', 
		name: 'Movexit Clause', 
		desc: 'Moves cut from Pokémon Sword and Shield are not usable.',
		onValidateSet(set) {
			const problems = [];
			if (set.moves) {
				for (const id of set.moves) {
					const move = this.dex.getMove(id);
					if (
						move.isNonstandard && move.isNonstandard === 'Past' && (move.name !== 'Hyper Fang' || set.species !== 'Scout')
					) problems.push(move.name + ' does not exist in Gen 8.');
				}
			}
			return problems;
		},
	},
	
	speciesclause: {
		effectType: 'ValidatorRule',
		name: 'Species Clause',
		desc: "Prevents teams from having more than one Pokémon from the same species, not counting forms.",
		onBegin() {
			this.add('rule', 'Species Clause: Limit one of each Pokémon (not counting forms)');
		},
		onValidateTeam(team, format) {
			const speciesTable: Set<number> = new Set();
			for (const set of team) {
				const species = this.dex.getSpecies(set.species);
				if (speciesTable.has(species)) {
					
					return [`You are limited to one of each Pokémon by Species Clause.`, `(You have more than one ${species.name})`];
				}
				speciesTable.add(species);
			}
		},
	},
};
