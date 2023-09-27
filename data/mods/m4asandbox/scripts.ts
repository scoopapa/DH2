export const Scripts: ModdedBattleScriptsData = {
	inherit: 'm4av6',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['April Fools', 'Tourbanned', 'Mega of the Day!', 'Popular', 'Other Megas', 'Heat!', 'NFE'],
	},
	// SANDBOX CONTENT STARTS HERE
	// MnM4A
	init() {
		for (const i in this.data.Items) {
			if (!this.data.Items[i].megaStone) continue;
			this.modData('Items', i).onTakeItem = false;
			const id = this.toID(this.data.Items[i].megaStone);
			if (this.modData('FormatsData', id)) this.modData('FormatsData', id).isNonstandard = null;
		}
	},
	actions: {
	canMegaEvo(pokemon) {
		if (pokemon.species.isMega) return null;

		const item = pokemon.getItem();
		if (item.megaStone) {
			if (item.megaStone === pokemon.baseSpecies.name) return null;
			else if (item.name === "Lycanite" && pokemon.species.name === "Lycanroc-Midnight") return "Lycanroc-Midnight-Mega";
			else if (item.name === "Lycanite" && pokemon.species.name === "Lycanroc-Dusk") return "Lycanroc-Dusk-Mega";
			else if (item.name === "Slowkinite" && pokemon.species.name === "Slowking-Galar") return "Slowking-Galar-Mega";
			else if (item.name === "Gourgeite" && pokemon.species.name === "Gourgeist-Small") return "Gourgeist-Small-Mega";
			else if (item.name === "Gourgeite" && pokemon.species.name === "Gourgeist-Large") return "Gourgeist-Large-Mega";
			else if (item.name === "Gourgeite" && pokemon.species.name === "Gourgeist-Super") return "Gourgeist-Super-Mega";
			else if (item.name === "Reginite" && pokemon.species.name === "Regice") return "Regice-Mega";
			else if (item.name === "Reginite" && pokemon.species.name === "Registeel") return "Registeel-Mega";
			else if (item.name === "Meowsticite" && pokemon.species.name === "Meowstic-F") return "Meowstic-F-Mega";
			else if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbucksummer") return "Sawsbuck-Summer-Mega";
			else if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckautumn") return "Sawsbuck-Autumn-Mega";
			else if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckwinter") return "Sawsbuck-Winter-Mega";
			else if (item.name === "Toxtricitite" && pokemon.species.name === "Toxtricity-Low-Key") return "Toxtricity-Low-Key-Mega";
			else return item.megaStone;
		} else {
			return null;
		}
	},
	runMegaEvo(pokemon) {
		if (pokemon.species.isMega) return false;
		if (pokemon.illusion) this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);

		// @ts-ignore
		const species: Species = this.getMixedSpecies(pokemon.species, pokemon.canMegaEvo);
		species.isMega = true;
		const side = pokemon.side;

		// Pokémon affected by Sky Drop cannot Mega Evolve. Enforce it here for now.
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		// Do we have a proper sprite for it?
		if (this.dex.species.get(pokemon.canMegaEvo!).baseSpecies === pokemon.m.originalSpecies) {
			species.id = this.dex.species.get(pokemon.canMegaEvo!).id ? this.dex.species.get(pokemon.canMegaEvo!).id : species.id;
			species.name = this.dex.species.get(pokemon.canMegaEvo!).name ? this.dex.species.get(pokemon.canMegaEvo!).name : species.name;
			pokemon.formeChange(species, pokemon.getItem(), true);
			this.add('-start', pokemon, pokemon.getItem(), '[silent]');
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		} else {
			const oSpecies = pokemon.m.originalSpecies;
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(species.originalMega);
			pokemon.formeChange(species, pokemon.getItem(), true);
			if (oMegaSpecies.requiredItem) this.add('-start', pokemon, oMegaSpecies.requiredItem, '[silent]');
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		}
		pokemon.canMegaEvo = null;
		return true;
	},
	getMixedSpecies(originalForme, megaForme) {
		const originalSpecies = originalForme;
		// @ts-ignore
		const deltas = this.getMegaDeltas(this.dex.species.get(megaForme));
		// @ts-ignore
		const species = this.doGetMixedSpecies(originalSpecies, deltas);
		return species;
	},
	getMegaDeltas(megaSpecies) {
		const baseSpecies = this.dex.species.get(megaSpecies.baseSpecies);
		const deltas: {
			ability: string,
			baseStats: SparseStatsTable,
			weighthg: number,
			originalMega: string,
			requiredItem: string | undefined,
			type?: string,
			isMega?: boolean,
		} = {
			ability: megaSpecies.abilities['0'],
			baseStats: {},
			weighthg: megaSpecies.weighthg - baseSpecies.weighthg,
			originalMega: megaSpecies.name,
			requiredItem: megaSpecies.requiredItem,
		};
		let statId: StatName;
		for (statId in megaSpecies.baseStats) {
			deltas.baseStats[statId] = megaSpecies.baseStats[statId] - baseSpecies.baseStats[statId];
		}
		if (megaSpecies.types.length > baseSpecies.types.length) {
			deltas.type = 'type1';
			deltas.type1 = megaSpecies.types[1];
		} else if (megaSpecies.types.length < baseSpecies.types.length) {
			deltas.type = 'mono';
		} else if (megaSpecies.types[0] !== baseSpecies.types[0]) {
			deltas.type = 'type0';
			deltas.type0 = megaSpecies.types[0];
		} else if (megaSpecies.types[1] !== baseSpecies.types[1]) {
			deltas.type = 'type1';
			deltas.type1 = megaSpecies.types[1];
		}
		deltas.isMega = true;
		return deltas;
	},
	doGetMixedSpecies(speciesOrForme, deltas) {
		if (!deltas) throw new TypeError("Must specify deltas!");
		const preMegaForme = this.dex.species.get(speciesOrForme);
		const species = this.dex.deepClone(preMegaForme);
		species.abilities = {'0': deltas.ability};
		if (deltas.type === 'mono') {
			species.types = [species.types[0]];
		} else if (deltas.type === 'type1') {
			if (species.types[0] === deltas.type1) {
				species.types = [deltas.type1];
			} else {
				species.types = [species.types[0], deltas.type1];
			}
		} else if (deltas.type === 'type0') {
			if (species.types[1] === deltas.type0) {
				species.types = [deltas.type0];
			} else if (!species.types[1] && species.types[0] !== deltas.type0) {
				// single-typed Pokémon can still have a primary type as their secondary type
				species.types = [species.types[0], deltas.type0];
			} else {
				species.types = [deltas.type0, species.types[1]];
			}
		}
		const baseStats = species.baseStats;
		for (const statName in baseStats) {
			baseStats[statName] = this.clampIntRange(baseStats[statName] + deltas.baseStats[statName], 1, 255);
		}
		species.weighthg = Math.max(1, species.weighthg + deltas.weighthg);
		species.originalMega = deltas.originalMega;
		species.requiredItem = deltas.requiredItem;
		if (deltas.isMega) species.isMega = true;
		species.deltas = deltas; // preserving deltas for potential form change compatibility
		return species;
	},
	},

};
