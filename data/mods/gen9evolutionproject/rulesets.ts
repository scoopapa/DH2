export const Rulesets: {[k: string]: ModdedFormatData} = {
	datamod: {
		effectType: 'Rule',
		name: 'Data Mod',
		desc: 'When a new Pokémon switches in for the first time, information about its types, stats and Abilities is displayed to both players.',
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
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				}
				if (species.creator) this.hint(`${species.name} was created by ${species.creator}!`);
				// might add movepool additions?
				// this.hint(`text goes here.`, true);
			}
		},
		onSwitchIn(pokemon) {
			const switchedIn = pokemon.switchedIn;
			if (pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', pokemon.illusion.getTypes(true).join('/'), '[silent]');
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
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				if (!pokemon.switchedIn) {
					this.runEvent('DataMod', pokemon);
					pokemon.switchedIn = true;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) { // making sure the correct information is given when an Illusion breaks
				if (this.dex.species.get(target.species.name).copyData) { // if the target is modded
					this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
					if (!target.switchedIn) {
						target.switchedIn = true;
						this.runEvent('DataMod', target);
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
