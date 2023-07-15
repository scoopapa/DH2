// TOP PART INHERITED FROM M4A

export const Formats: {[k: string]: FormatData} = {
	megadatamod: {
		effectType: 'Rule',
		name: 'Mega Data Mod',
		desc: 'Gives data on stats, Ability and types when a Pokémon Mega Evolves or undergoes Ultra Burst.',
		onBegin() {
			this.add(`raw|<img src="https://raw.githubusercontent.com/scoopapa/DH/master/data/mods/m4av6/sprites/m4a_banner.png" height="65" width="381">`);
			if (this.format.name === '[Gen 8] M4A Sandbox' || this.format.name === '[Gen 8] M4A VGC Sandbox') {
				this.add('-message', `Welcome to the Megas for All Sandbox!`);
				this.add('-message', `This is a custom game format where you can experiment outside of the normal rules.`);
				this.add('-message', `Thanks to the work of KeroseneZanchu, you can even alter a Pokémon's type, stats and Mega form with its nickname!`);
				this.add('-message', `You can find the details on how this works here:`);
				this.add('-message', `https://docs.google.com/document/d/1hhF49OIQKot72C30mCzSwxYgb3Ephhm9KCL_nMPrCW0/`);
			} else {
				this.add('-message', `Welcome to Megas for All!`);
				this.add('-message', `This is a National Dex-based format where we aim to give a new Mega Evolution to every Pokémon.`);
				this.add('-message', `Just like any official format, you can still only Mega Evolve one Pokémon per team!`);
				this.add('-message', `You can find our thread and metagame resources here:`);
				this.add('-message', `https://www.smogon.com/forums/threads/3671140/`);
			}
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.species.name;
				(pokemon as any).lostItemForDelibird = pokemon.item;
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.illusion) {
				if (pokemon.illusion.species.forme.startsWith('Mega') || pokemon.illusion.species.forme.startsWith('Ultra') || pokemon.illusion.species.isMega) {
					this.add('-start', pokemon, 'typechange', pokemon.illusion.getTypes(true).join('/'), '[silent]');
				}
			} else {
				if (pokemon.species.forme.startsWith('Mega') || pokemon.species.forme.startsWith('Ultra') || pokemon.species.isMega) {
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) {
				if (target.species.forme.startsWith('Mega') || target.species.forme.startsWith('Ultra') || target.species.isMega) {
					this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
				} else {
					const types = target.baseSpecies.types;
					if (target.getTypes().join() === types.join()) {
						this.add('-end', target, 'typechange', '[silent]');
					}
				}
			}
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			const species = this.dex.getSpecies(pokemon.species);
			const abilities = this.dex.getAbility(species.abilities[0]).name;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			}
			this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			if (species.creator) this.hint(`${species.name} was submitted by ${species.creator}!`);
		},
	},
	standardm4a: {
		effectType: 'ValidatorRule',
		name: 'Standard M4A',
		desc: 'The universal banlist used by most standard Megas for All formats.',
		banlist: [
			'AG', 'Uber',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Baton Pass',
			'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Quick Claw',
		],
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.getSpecies(set.species);
			let item = this.dex.getItem(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (!item.megaStone) throw new Error(`Item ${item.name} has no base form for mega evolution`);
				tierSpecies = this.dex.getSpecies(item.megaStone);
			} else if (item.id === 'lycanite' && species.id === 'lycanrocmidnight') {
				tierSpecies = this.dex.getSpecies('Lycanroc-Midnight-Mega');
			} else if (item.id === 'lycanite' && species.id === 'lycanrocdusk') {
				tierSpecies = this.dex.getSpecies('Lycanroc-Dusk-Mega');
			} else if (item.id === 'gourgeite' && species.id === 'gourgeistsmall') {
				tierSpecies = this.dex.getSpecies('Gourgeist-Small-Mega');
			} else if (item.id === 'gourgeite' && species.id === 'gourgeistlarge') {
				tierSpecies = this.dex.getSpecies('Gourgeist-Large-Mega');
			} else if (item.id === 'gourgeite' && species.id === 'gourgeistsuper') {
				tierSpecies = this.dex.getSpecies('Gourgeist-Super-Mega');
			} else if (item.id === 'reginite' && species.id === 'regice') {
				tierSpecies = this.dex.getSpecies('Regice-Mega');
			} else if (item.id === 'reginite' && species.id === 'registeel') {
				tierSpecies = this.dex.getSpecies('Registeel-Mega');
			} else if (item.id === 'meowsticite' && species.id === 'meowsticf') {
				tierSpecies = this.dex.getSpecies('Meowstic-F-Mega');
			} else if (item.id === 'sawsbuckite' && species.id === 'sawsbucksummer') {
				tierSpecies = this.dex.getSpecies('Sawsbuck-Summer-Mega');
			} else if (item.id === 'sawsbuckite' && species.id === 'sawsbuckautumn') {
				tierSpecies = this.dex.getSpecies('Sawsbuck-Autumn-Mega');
			} else if (item.id === 'sawsbuckite' && species.id === 'sawsbuckwinter') {
				tierSpecies = this.dex.getSpecies('Sawsbuck-Winter-Mega');
			} else if (item.id === 'toxtricitite' && species.id === 'toxtricitylowkey') {
				tierSpecies = this.dex.getSpecies('Toxtricity-Low-Key-Mega');
			} else if (item.id === 'redorb' && species.id === 'groudon') {
				tierSpecies = this.dex.getSpecies('Groudon-Primal');
			} else if (item.id === 'blueorb' && species.id === 'kyogre') {
				tierSpecies = this.dex.getSpecies('Kyogre-Primal');
			}
			let problem = this.checkSpecies(set, species, tierSpecies, setHas);
			if (problem) problems.push(problem);

			return problems;
		},
	},
	standardm4amonothreat: {
		effectType: 'ValidatorRule',
		name: 'Standard M4A Monothreat',
		desc: 'The universal banlist used by most standard Megas for All Monothreat formats.',
		ruleset: ['Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: [
			//Pokémon restrictions
			'Arceus', 'Blaziken', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Dracovish', 'Dragapult', 
			'Eternatus', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja-Ash', 'Groudon', 'Ho-oh', 'Hoopa-Unbound', 'Kartana', 
			'Kyogre', 'Kyurem-B', 'Kyurem-W', 'Landorus-Base', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-DW',
			'Necrozma-DM', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian',
			'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base',
			
			//Ability restrictions
			'Moody', 'Shadow Tag', 'Power Construct', 'Battle Bond',
			
			//Move restrictions
			'Baton Pass',
			
			//Item Restrictions
			'Blastoisinite', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender',
			//Banned M4A Stones
			'Butterfrite', 'Cinderite',
		],
	},

	megahintmod: {
		effectType: 'Rule',
		name: 'Mega Hint Mod',
		desc: 'At the start of a battle, gives each player information about the potential Mega in their party',
		onBegin() {
			this.add('-message', 'Your Mega Evolution this match is:');
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.canMegaEvo) {
					const mega = this.dex.getSpecies(pokemon.canMegaEvo);
					const baseStats = mega.baseStats;
					let types = mega.types[0];
					if (mega.types[1]) {
						types += `/${mega.types[1]}`;
					}
					let msg = ``;
					if (mega.name === "Mimikyu-Mega") {
						msg += `; Mega Mimikyu has two forms! If its Disguise is busted, it will Mega Evolve into Mimikyu-Busted-Mega. Use /dt for more info.`;
					}
					const ability = this.dex.getAbility(mega.abilities[0]);
					let txt = `${mega.name} (${types}); `;
					txt += `Ability: ${ability.name} (${ability.shortDesc}); `;
					txt += `Stats: ${baseStats.hp} HP / ${baseStats.atk} Atk / ${baseStats.def} Def / ${baseStats.spa} SpA / ${baseStats.spd} SpD / ${baseStats.spe} Spe;${msg}`;
					this.hint(txt, true, pokemon.side);
				}
			}
			this.add('-message', 'Use the command /dt for more information!');
		},
	},

	sametypeclause: {
		effectType: 'ValidatorRule',
		name: 'Same Type Clause',
		desc: "Forces all Pok&eacute;mon on a team to share a type with each other",
		onBegin() {
			this.add('rule', 'Same Type Clause: Pokémon in a team must share a type');
		},
		onValidateTeam(team) {
			let typeTable: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (i === 0) {
					typeTable = species.types;
				} else {
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				const item = this.dex.getItem(set.item);
				if (item.megaStone && species.baseSpecies === item.megaEvolves) {
					species = this.dex.getSpecies(item.megaStone);
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
					species = this.dex.getSpecies("Necrozma-Ultra");
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				if (item.id === "mimikyunite" && species.baseSpecies === "Mimikyu") {
					// Mega Mimikyu is banned from Fairy Mono and this enforces that
					species = this.dex.getSpecies("Mimikyu-Busted-Mega");
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
			}
		},
	},
	
	monothreatnormal: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Normal',
		desc: "Forces all Pok&eacute;mon to be Normal-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Normal-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Normal';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatfire: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Fire',
		desc: "Forces all Pok&eacute;mon to be Fire-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Fire-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Fire';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatwater: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Water',
		desc: "Forces all Pok&eacute;mon to be Water-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Water-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Water';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatelectric: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Electric',
		desc: "Forces all Pok&eacute;mon to be Electric-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Electric-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Electric';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatgrass: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Grass',
		desc: "Forces all Pok&eacute;mon to be Grass-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Grass-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Grass';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatice: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Ice',
		desc: "Forces all Pok&eacute;mon to be Ice-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Ice-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Ice';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatfighting: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Fighting',
		desc: "Forces all Pok&eacute;mon to be Fighting-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Fighting-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Fighting';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatpoison: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Poison',
		desc: "Forces all Pok&eacute;mon to be Poison-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Poison-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Poison';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatground: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Ground',
		desc: "Forces all Pok&eacute;mon to be Ground-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Ground-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Ground';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatflying: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Flying',
		desc: "Forces all Pok&eacute;mon to be Flying-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Flying-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Flying';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatpsychic: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Psychic',
		desc: "Forces all Pok&eacute;mon to be Psychic-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Psychic-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Psychic';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatbug: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Bug',
		desc: "Forces all Pok&eacute;mon to be Bug-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Bug-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Bug';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatrock: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Rock',
		desc: "Forces all Pok&eacute;mon to be Rock-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Rock-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Rock';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatghost: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Ghost',
		desc: "Forces all Pok&eacute;mon to be Ghost-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Ghost-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Ghost';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatdragon: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Dragon',
		desc: "Forces all Pok&eacute;mon to be Dragon-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Dragon-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Dragon';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatdark: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Dark',
		desc: "Forces all Pok&eacute;mon to be Dark-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Dark-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Dark';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatsteel: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Steel',
		desc: "Forces all Pok&eacute;mon to be Steel-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Steel-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Steel';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	monothreatfairy: {
		effectType: 'ValidatorRule',
		name: 'Monothreat Fairy',
		desc: "Forces all Pok&eacute;mon to be Fairy-type.",
		onBegin() {
			this.add('rule', 'Monothreat: only Fairy-type Pokemon are allowed');
		},
		onValidateTeam(team) {
			const teamType = 'Fairy';
			//let typeTable: string[] = [];
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (!species.types.includes(teamType)) {
					problems.push(species + " is not " + teamType + " type.");
				} 
				if (this.gen >= 7) {
					const item = this.dex.getItem(set.item);
					if (item.megaStone && species.baseSpecies === item.megaEvolves) {
						species = this.dex.getSpecies(item.megaStone);
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
					if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
						species = this.dex.getSpecies("Necrozma-Ultra");
						if (!species.types.includes(teamType)) {
							problems.push(species + " is not " + teamType + " type.");
						} 
					}
				}
				return problems;
			}
		},
	},
	megasonlymod: {
		effectType: 'ValidatorRule',
		name: 'Megas Only Mod',
		desc: "Forces all Pok&eacute;mon on a team to hold a valid Mega Stone. But you still only get to Mega Evolve one!",
		onBegin() {
			this.add('rule', 'Megas Only Mod: Forces all Pok&eacute;mon on a team to hold a valid Mega Stone, but you still can only Mega Evolve one!');
		},
		onValidateTeam(team) {
			let problems: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.getSpecies(set.species);
				const item = this.dex.getItem(set.item);
				if (item.megaStone && species.baseSpecies === item.megaEvolves) {
					continue;
				} else {
					problems.push(species + " is not holding a Mega Stone it can use to Mega Evolve.");
				}
				
				return problems;
			}
		},
	},

// SANDBOX CONTENT STARTS HERE

	sandboxmod: {
		effectType: 'Rule',
		name: 'Sandbox Mod',
		desc: "Allows customization of a Pokémon's types and stats based on its nickname.",
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.species.name;
				if (!pokemon.set.name) continue;
				if (pokemon.set.name.substr(0, 1) === "*") {
					let newSpecies = this.dex.deepClone(pokemon.species);
					switch (pokemon.set.name.substr(1, 1)) {
						case "a":
						case "A":
							newSpecies.types[0] = "Dragon";
							break;
						case "b":
						case "B":
							newSpecies.types[0] = "Bug";
							break;
						case "c":
						case "C":
							newSpecies.types[0] = "Psychic";
							break;
						case "d":
						case "D":
							newSpecies.types[0] = "Dark";
							break;
						case "e":
						case "E":
							newSpecies.types[0] = "Electric";
							break;
						case "f":
						case "F":
							newSpecies.types[0] = "Fairy";
							break;
						case "g":
						case "G":
							newSpecies.types[0] = "Grass";
							break;
						case "h":
						case "H":
							newSpecies.types[0] = "Fighting";
							break;
						case "i":
						case "I":
							newSpecies.types[0] = "Ice";
							break;
						case "k":
						case "K":
							newSpecies.types[0] = "Rock";
							break;
						case "n":
						case "N":
							newSpecies.types[0] = "Normal";
							break;
						case "o":
						case "O":
							newSpecies.types[0] = "Ghost";
							break;
						case "p":
						case "P":
							newSpecies.types[0] = "Poison";
							break;
						case "r":
						case "R":
							newSpecies.types[0] = "Fire";
							break;
						case "s":
						case "S":
							newSpecies.types[0] = "Steel";
							break;
						case "u":
						case "U":
							newSpecies.types[0] = "Ground";
							break;
						case "w":
						case "W":
							newSpecies.types[0] = "Water";
							break;
						case "y":
						case "Y":
							newSpecies.types[0] = "Flying";
							break;
						case "z":
						case "Z":
							newSpecies.types[0] = "";
							break;
					}
					switch (pokemon.set.name.substr(2, 1)) {
						case "a":
						case "A":
							newSpecies.types[1] = "Dragon";
							break;
						case "b":
						case "B":
							newSpecies.types[1] = "Bug";
							break;
						case "c":
						case "C":
							newSpecies.types[1] = "Psychic";
							break;
						case "d":
						case "D":
							newSpecies.types[1] = "Dark";
							break;
						case "e":
						case "E":
							newSpecies.types[1] = "Electric";
							break;
						case "f":
						case "F":
							newSpecies.types[1] = "Fairy";
							break;
						case "g":
						case "G":
							newSpecies.types[1] = "Grass";
							break;
						case "h":
						case "H":
							newSpecies.types[1] = "Fighting";
							break;
						case "i":
						case "I":
							newSpecies.types[1] = "Ice";
							break;
						case "k":
						case "K":
							newSpecies.types[1] = "Rock";
							break;
						case "n":
						case "N":
							newSpecies.types[1] = "Normal";
							break;
						case "o":
						case "O":
							newSpecies.types[1] = "Ghost";
							break;
						case "p":
						case "P":
							newSpecies.types[1] = "Poison";
							break;
						case "r":
						case "R":
							newSpecies.types[1] = "Fire";
							break;
						case "s":
						case "S":
							newSpecies.types[1] = "Steel";
							break;
						case "u":
						case "U":
							newSpecies.types[1] = "Ground";
							break;
						case "w":
						case "W":
							newSpecies.types[1] = "Water";
							break;
						case "y":
						case "Y":
							newSpecies.types[1] = "Flying";
							break;
						case "z":
						case "Z":
					}
					if (!isNaN(pokemon.set.name.substr(3, 3))) newSpecies.baseStats.atk = pokemon.set.name.substr(3, 3);
					if (!isNaN(pokemon.set.name.substr(6, 3))) newSpecies.baseStats.def = pokemon.set.name.substr(6, 3);
					if (!isNaN(pokemon.set.name.substr(9, 3))) newSpecies.baseStats.spa = pokemon.set.name.substr(9, 3);
					if (!isNaN(pokemon.set.name.substr(12, 3))) newSpecies.baseStats.spd = pokemon.set.name.substr(12, 3);
					if (!isNaN(pokemon.set.name.substr(15, 3))) newSpecies.baseStats.spe = pokemon.set.name.substr(15, 3);
					if (['Mega Stone 1', 'Mega Stone 2', 'Mega Stone H'].includes(pokemon.getItem().name)) {
						newSpecies.baseSpecies = pokemon.baseSpecies;
						newSpecies.abilities[0] = pokemon.ability;
						newSpecies.forme = 'Mega';
						newSpecies.name = pokemon.species.name + '-Mega';
						newSpecies.isMega = true;
						pokemon.canMegaEvo = newSpecies;
						const abilities = pokemon.species.abilities;
						let ability = abilities[0];
						if (pokemon.getItem().name === 'Mega Stone 2' && abilities[1]) ability = abilities[1];
						if (pokemon.getItem().name === 'Mega Stone H' && abilities['H']) ability = abilities['H'];
						pokemon.setAbility(ability);
						pokemon.baseAbility = ability as ID;
						pokemon.ability = ability as ID;
					} else {
						pokemon.isModded = true;
						pokemon.canMegaEvo = null;
						pokemon.setSpecies(newSpecies);
						pokemon.baseSpecies = newSpecies;
					}
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn(pokemon) {
			let species = pokemon.species;
			let switchedIn = pokemon.switchedIn;
			if (pokemon.illusion) {
				if (!pokemon.illusion.isModded) return;
				species = pokemon.illusion.species;
				this.add('-start', pokemon, 'typechange', species.types.join('/'), '[silent]');
				if (pokemon.illusion.switchedIn) return;
				pokemon.illusion.switchedIn = true;
			} else {
				if (!pokemon.isModded) return;
				this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				if (pokemon.switchedIn) return;
				pokemon.switchedIn = true;
			}
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span></li><li style="clear: both"></li></ul>`);
			}
			this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
		},
		//onDamagingHitOrder, so we go before Data Mod (and after Illusion wearing off, which ink modded to have a priority of 1) 100% of the time
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) { // making sure the correct information is given when an Illusion breaks
				if (target.isModded) {
					this.add('-start', target, 'typechange', target.species.types.join('/'), '[silent]');
					if (!target.switchedIn) {
						target.switchedIn = true;
						let species = target.species;
						const baseStats = species.baseStats;
						const type = species.types[0];
						if (species.types[1]) {
							const type2 = species.types[1];
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span></li><li style="clear: both"></li></ul>`);
						} else {
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span></li><li style="clear: both"></li></ul>`);
						}
						this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
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
	freezeclausemod: { // modded because frostbite isn't real freeze
		effectType: 'Rule',
		name: 'Freeze Clause Mod',
		desc: "Prevents players from freezing more than one of their opponent's Pok&eacute;mon at a time",
		onBegin() {
			this.add('rule', 'Freeze Clause Mod: Limit one foe frozen');
		},
		onSetStatus(status, target, source, sourceEffect) {
			if (source && source.side === target.side) {
				return;
			}
			if (status.id === 'frz') {
				if (sourceEffect && sourceEffect.effectType === 'Move' && sourceEffect.id === 'bittermalice') return; // please work
				for (const pokemon of target.side.pokemon) {
					if (pokemon.status === 'frz' && !pokemon.statusData.frostbite) {
						this.add('-message', 'Freeze Clause activated.');
						return false;
					}
				}
			}
		},
	},
};
