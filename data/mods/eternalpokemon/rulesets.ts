export const Rulesets: {[k: string]: ModdedFormatData} = {
	datamod: {
		effectType: 'Rule',
		name: 'Data Mod',
		desc: 'When a new Pokémon switches in for the first time, information about its types, stats and Abilities is displayed to both players.',
		onDataMod(pokemon) {
			let species = this.dex.species.get(pokemon.species.name);
			if (species.copyData) { // all modded things in Eternal Pokémon have this
				// ignore type announcement since no Eternal Forme changes type
				// this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				let abilities = species.abilities[0];
				if (species.abilities[1]) abilities += ` / ${species.abilities[1]}`;
				if (species.abilities['H']) abilities += ` / ${species.abilities['H']}`;
				if (species.abilities['S']) abilities += ` / ${species.abilities['S']}`;
				const baseStats = species.baseStats;
				const type = species.types[0];
				if (species.types[1]) {
					const type2 = species.types[1];
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				}

				// print signature move
				const move_str = species.movepoolAdditions[0];
				const move = this.dex.moves.get(move_str);
				let acc;
				if (move.accuracy == true) acc = "-"; 
				else acc = move.accuracy + "%";
				
				if (move.basePower == 0) {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col movenamecol">` + move.name + `</span> <span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/` + move.type + `.png" alt="` + move.type + `" width="32" height="14"><img src="//play.pokemonshowdown.com/sprites/categories/` + move.category + `.png" alt="` + move.category + `" width="32" height="14"></span> <span class="col widelabelcol"><em>Accuracy</em><br>` + acc + `</span> <span class="col pplabelcol"><em>PP</em><br>` + ~~(move.pp * 1.6) + `</span> <span class="col movedesccol">` + move.shortDesc + `</span> </li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col movenamecol">` + move.name + `</span> <span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/` + move.type + `.png" alt="` + move.type + `" width="32" height="14"><img src="//play.pokemonshowdown.com/sprites/categories/` + move.category + `.png" alt="` + move.category + `" width="32" height="14"></span> <span class="col labelcol"><em>Power</em><br>` + move.basePower + `</span> <span class="col widelabelcol"><em>Accuracy</em><br>` + acc + `</span> <span class="col pplabelcol"><em>PP</em><br>` + ~~(move.pp * 1.6) + `</span> <span class="col movedesccol">` + move.shortDesc + `</span> </li><li style="clear: both"></li></ul>`);
				}

				if (species.creator) this.hint(`${species.name} and ${move.name} were created by ${species.creator}!`);
			}
		},
		onSwitchIn(pokemon) {
			const switchedIn = pokemon.switchedIn;
			if (pokemon.illusion) {
				// this.add('-start', pokemon, 'typechange', pokemon.illusion.getTypes(true).join('/'), '[silent]');
				if (!pokemon.illusion.switchedIn) {
					let species = this.dex.species.get(pokemon.illusion.species.name);
					let abilities = species.abilities[0];
					if (species.abilities[1]) abilities += ` / ${species.abilities[1]}`;
					if (species.abilities['H']) abilities += ` / ${species.abilities['H']}`;
					if (species.abilities['S']) abilities += ` / ${species.abilities['S']}`;
					const baseStats = species.baseStats;
					const type = species.types[0];
					if (species.types[1]) {
						const type2 = species.types[1];
						this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					} else {
						this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					}
					if (species.creator) this.hint(`${species.name} was created by ${species.creator}!`);
					pokemon.illusion.switchedIn = true;
				}
			} else {
				// this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				if (!pokemon.switchedIn) {
					this.runEvent('DataMod', pokemon);
					pokemon.switchedIn = true;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) { // making sure the correct information is given when an Illusion breaks
				if (this.dex.species.get(target.species.name).copyData) { // if the target is modded
					// this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
					if (!target.switchedIn) {
						target.switchedIn = true;
						this.runEvent('DataMod', target);
					}
				} else {
					const types = target.baseSpecies.types;
					if (target.getTypes().join() === types.join()) {
						// this.add('-end', target, 'typechange', '[silent]');
					}
				}
			}
		},
	},

	standardnatdex: {
		effectType: 'ValidatorRule',
		name: 'Standard NatDex',
		desc: "The standard ruleset for all National Dex tiers",
		ruleset: [
			'Obtainable', '+Unobtainable', '+Past', 'Sketch Post-Gen 7 Moves', 'Team Preview', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause',
		],
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			if (species.natDexTier === 'Illegal') {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			const requireObtainable = this.ruleTable.has('obtainable');
			if (requireObtainable) {
				if (species.natDexTier === "Unreleased") {
					const basePokemon = this.toID(species.baseSpecies);
					if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
						return;
					}
					return [`${set.name || set.species} does not exist in the National Dex.`];
				}
				for (const moveid of set.moves) {
					const move = this.dex.moves.get(moveid);
					if (move.isNonstandard === 'Unobtainable' && move.gen === this.dex.gen) { // comment out light of ruin
						if (this.ruleTable.has(`+move:${move.id}`)) continue;
						const problem = `${set.name}'s move ${move.name} does not exist in the National Dex.`;
						if (this.ruleTable.has('omunobtainablemoves')) {
							const outOfBattleSpecies = this.getValidationSpecies(set)[0];
							if (!this.omCheckCanLearn(move, outOfBattleSpecies, this.allSources(outOfBattleSpecies), set, problem)) continue;
						}
						return [problem];
					}
				}
			}
			// Any item that was legal in Gen 7 (Normal Gem for example) should be usable
			if (!set.item) return;
			let item = this.dex.items.get(set.item);
			let gen = this.dex.gen;
			while (item.isNonstandard && gen >= 7) {
				item = this.dex.forGen(gen).items.get(item.id);
				gen--;
			}
			if (requireObtainable && item.isNonstandard) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.species.isMega || pokemon.species.isPrimal || pokemon.species.forme === "Ultra") {
					pokemon.canTerastallize = null;
				}
			}
		},
	},
};