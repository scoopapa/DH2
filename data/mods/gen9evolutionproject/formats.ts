import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Evolution Project 2",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise.`,
		],
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Dynamax Clause', 'Data Mod'],
		banlist: [
			'Toxapex-Base', 'Noivern-Variant', 'Chandelure', 'Corviknight-Base', 'Darmanitan-Base', 'Darmanitan-Galar', 'Excadrill-Base', 'Hawlucha-Base',
			'Garchomp', 'Velocinobi', 'Dragonite',
			'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Zacian', 'Zamazenta', 'Deoxys',
			'Moody', 'Baton Pass', 'Shed Tail', 'Last Respects',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			const customTiers = ['Pokémon of the Day!', 'Evo!', '(Prevo)'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!customTiers.includes(template.tier)) {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not allowed to Mega Evolve.`];
		},
		mod: 'gen9evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 9] Evolution Project 2 VGC",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise. Tera Blast is universal in VGC.`,
		],
		gameType: 'doubles',
		teambuilderFormat: "National Dex",
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', '+Unobtainable', '+Past', 'Open Team Sheets', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod'],
		banlist: [
			'Dragonite',
			'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Zacian', 'Zamazenta', 'Deoxys',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			const customTiers = ['Pokémon of the Day!', 'Evo!', '(Prevo)'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!customTiers.includes(template.tier)) {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		checkCanLearn(move, species, lsetData, set) { // Tera Blast is universal in VGC, but not in singles
			const problem = this.checkCanLearn(move, this.dex.species.get(set.species));
			if (problem && move.name !== 'Tera Blast') return problem;
			return null;
		},
		onValidateSet(set) {
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not allowed to Mega Evolve.`];
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
		mod: 'gen9evolutionproject',
		searchShow: false,
	}
];