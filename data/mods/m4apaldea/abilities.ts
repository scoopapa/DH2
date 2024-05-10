export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	accumulate: {
		desc: "If this Pokémon is a Mega Brambleghast, it calls for help and changes form at the end of each full turn it has been on the field, building up to Mega Brambleghast (Tangled Form) over five turns.",
		shortDesc: "More Brambleghast tangle up at the end of each turn.",
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Brambleghast' || pokemon.transformed || !pokemon.hp || !pokemon.activeTurns ||
				pokemon.species.id === 'brambleghast' || pokemon.species.id === 'brambleghastmegatangled'
			) return;
			this.add('-activate', pokemon, 'ability: Accumulate');
			this.add('-message', `${pokemon.name} called for help!`);
			if (pokemon.species.id === 'brambleghastmega') {
				pokemon.formeChange('Brambleghast-Mega-1', this.effect, true);
			} else if (pokemon.species.id === 'brambleghastmega1') {
				pokemon.formeChange('Brambleghast-Mega-2', this.effect, true);
			} else if (pokemon.species.id === 'brambleghastmega2') {
				pokemon.formeChange('Brambleghast-Mega-3', this.effect, true);
			} else if (pokemon.species.id === 'brambleghastmega3') {
				pokemon.formeChange('Brambleghast-Mega-4', this.effect, true);
			} else if (pokemon.species.id === 'brambleghastmega4') {
				pokemon.formeChange('Brambleghast-Mega-Tangled', this.effect, true);
			}
			this.add('-message', `More of ${pokemon.name}'s friends are getting tangled up!`);
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			const species = this.dex.species.get(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			const type2 = species.types[1];
			this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
      // no HP change unlike Wishiwashi
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Accumulate",
		rating: 5,
		num: -2001,
	},
	renaturalization: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it clears the hazard and sets Grassy Terrain.",
		shortDesc: "Hazard immunity. Clears hazards, sets Grassy Terrain if switched in on them.",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition) && !this.field.getPseudoWeather('stickyresidues')) {
					if (!activated && !this.field.setTerrain('grassyterrain')) {
						this.add('-activate', pokemon, 'ability: Renaturalization');
						activated = true;
					}
					pokemon.side.removeSideCondition(sideCondition);
					this.add('-sideend', pokemon.side, this.dex.conditions.get(sideCondition).name, '[from] Ability: Renaturalization', '[of] ' + pokemon);
				}
			}
		},
		hazardImmune: true,
		name: "Renaturalization",
		rating: 5,
		num: -2002,
	},
};
