export const Formats: {[k: string]: FormatData} = {
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
				if (!typeTable.length) return [`Your team must share a type.`];
			}
		},
	},
};
