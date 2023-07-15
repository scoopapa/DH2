export const Formats: {[k: string]: FormatData} = {
	erdatamod: {
		effectType: 'Rule',
		name: 'ER Data Mod',
		desc: 'Gives data on stats, Ability and types when a Pokémon switches in.',
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			const species = this.dex.getSpecies(pokemon.species.name);
			let abilities = species.abilities[0];
			if (species.abilities[1]) {
				abilities += ` / ${species.abilities[1]}`;
			}
			if (species.abilities['H']) {
				abilities += ` | ${species.abilities['H']}`;
			}
			if (species.abilities['S']) {
				abilities += ` / ${species.abilities['S']}`;
			}
			const baseStats = species.baseStats;
			let type = species.types[0];
			type = this.toID(type);
			const modResourcePrefix = 'raw.githubusercontent.com/scoopapa/dh/master/data/mods/extremereboot';
			if (species.types[1]) {
				let type2 = species.types[1];
				type2 = this.toID(type2);
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` 
					+ species.name + `</span> <span class="col typecol"><img src="https://${modResourcePrefix}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${modResourcePrefix}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` 
					+ abilities + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` 
					+ baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` 
					+ baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` 
					+ baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` 
					+ baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` 
					+ baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` 
					+ baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`
				);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` 
					+ species.name + `</span> <span class="col typecol"><img src="https://${modResourcePrefix}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` 
					+ abilities + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` 
					+ baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` 
					+ baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` 
					+ baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` 
					+ baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` 
					+ baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` 
					+ baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`
				);
			}
		},
	},
};
