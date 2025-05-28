export const Rulesets: {[k: string]: ModdedFormatData} = {

	//copying Nihilslave
	denseafmod: {
		effectType: 'Rule',
		name: "Dense AF Mod",
		onBegin() {
			this.add('rule', 'Dense AF Mod: Modifies types, stats and team preview.');
		},

		onModifySpeciesPriority: 2,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;

			const set = target.set;

			// set types
			const types = new Set<string>();
			const ivtypes = [
				'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 
				'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water',
			];
			
			types.add(set.ivs['hp']<18 ? ivtypes[set.ivs['hp']] : species.types[0]);
			types.add(set.ivs['spe']<18 ? ivtypes[set.ivs['spe']] : species.types[1]);

			return {...species, types: [...types]};
		},	
		
		//revealing mon types at team preview
		onTeamPreview() {
			this.add('clearpoke');
			for (const side of this.sides) {
				for (const pokemon of side.pokemon) {
					let details = pokemon.details;
					this.add('poke', pokemon.side.id, details, '');
				}
			}
			this.makeRequest('teampreview');
			for (const side of this.sides) {
				let buf = `raw|<strong>${side.name}'s team:</strong><br/>`;
				for (const pokemon of side.pokemon) {
					if (!buf.endsWith('|')) buf += '</span>&#8203;';
					const species = this.dex.deepClone(pokemon.species);
					// manually print details cuz using Chat.getDataPokemonHTML() will cause client build issues
					buf += '<div class="message"><ul class="utilichart">';
					buf += '<li class="result">';
					buf += `<span class="col iconcol"><psicon pokemon="${species.id}"/></span> `;
					buf += `<span class="col pokemonnamecol" style="white-space:nowrap"><a href="https://dex.pokemonshowdown.com/pokemon/${species.id}" target="_blank">${species.name}</a></span> `;
					buf += '<span class="col typecol">';
					if (species.types) {
						for (const type of species.types) {
							buf += `<img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32">`;
						}
					}
					buf += '</span> ';
					buf += '<span style="float:left;min-height:26px">';
					buf += '<span class="col abilitycol">' + species.abilities['0'] + '<br />' + species.abilities['1'] + '</span>';
					buf += '</span>';
					buf += '<span style="float:left;min-height:26px">';
					buf += '<span class="col statcol"><em>HP</em><br />' + species.baseStats.hp + '</span> ';
					buf += '<span class="col statcol"><em>Atk</em><br />' + species.baseStats.atk + '</span> ';
					buf += '<span class="col statcol"><em>Def</em><br />' + species.baseStats.def + '</span> ';
					buf += '<span class="col statcol"><em>SpA</em><br />' + species.baseStats.spa + '</span> ';
					buf += '<span class="col statcol"><em>SpD</em><br />' + species.baseStats.spd + '</span> ';
					buf += '<span class="col statcol"><em>Spe</em><br />' + species.baseStats.spe + '</span> ';
					buf += '<span class="col bstcol"><em>BST<br />' + species.bst + '</em></span> ';
					buf += '</span>';
					buf += '</li>';
					buf += '<li style="clear:both"></li></ul></div>';
				}
				this.add(`${buf}</span>`);
			}
		},
		onSwitchIn(pokemon) {
			let buf = 'raw|';
			if (!buf.endsWith('|')) buf += '/</span>&#8203;';
			const species = this.dex.deepClone(pokemon.illusion ? pokemon.illusion.species : pokemon.species);
			// manually print details cuz using Chat.getDataPokemonHTML() will cause client build issues
			buf += '<div class="message"><ul class="utilichart">';
			buf += '<li class="result">';
			buf += `<span class="col iconcol"><psicon pokemon="${species.id}"/></span> `;
			buf += `<span class="col pokemonnamecol" style="white-space:nowrap"><a href="https://dex.pokemonshowdown.com/pokemon/${species.id}" target="_blank">${species.name}</a></span> `;
			buf += '<span class="col typecol">';
			if (species.types) {
				for (const type of species.types) {
					buf += `<img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32">`;
				}
			}
			buf += '</span> ';
			buf += '<span style="float:left;min-height:26px">';
			buf += '<span class="col twoabilitycol">' + species.abilities['0'] + '<br />' + species.abilities['1'] + '</span>'; 
			buf += '</span>';
			buf += '<span style="float:left;min-height:26px">';
			buf += '<span class="col statcol"><em>HP</em><br />' + species.baseStats.hp + '</span> ';
			buf += '<span class="col statcol"><em>Atk</em><br />' + species.baseStats.atk + '</span> ';
			buf += '<span class="col statcol"><em>Def</em><br />' + species.baseStats.def + '</span> ';
			buf += '<span class="col statcol"><em>SpA</em><br />' + species.baseStats.spa + '</span> ';
			buf += '<span class="col statcol"><em>SpD</em><br />' + species.baseStats.spd + '</span> ';
			buf += '<span class="col statcol"><em>Spe</em><br />' + species.baseStats.spe + '</span> ';
			buf += '<span class="col bstcol"><em>BST<br />' + species.bst + '</em></span> ';
			buf += '</span>';
			buf += '<span style="float:left;min-height:26px" class="col abilitycol"><strong>' + pokemon.side.name + '</strong></span>';
			buf += '</li>';
			buf += '<li style="clear:both"></li></ul></div>';
			this.add(`${buf}</span>`);
			
			//for in-battle display i think?
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			this.add('-start', pokemon, 'denseafstats', Object.values((pokemon.illusion || pokemon).set.evs).join('/'), '[silent]');
		},
	},
};
