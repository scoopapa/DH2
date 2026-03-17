import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 8] Evolution Project",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise.`,
		],
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		banlist: [
			'Alakazam', 'Excadrill-Base', 'Exploud', 'Lycanroc-Dusk', 'Naganadel-Base', 'Reuniclus-Base', 'Scizor', 'Scolipede-Base', 'Starmie-Base', 'Polteageist-Base',
			'Polteageist-Antique', 'Volcarona', 'Aegislash-Base', 'Gyarados', 'Moody', 'Baton Pass'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)' && template.tier !== "Evo NFE!") {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
		},
		mod: 'evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 8] Evolution Project VGC",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise.`,
		],
		gameType: 'doubles',
		banlist: ['Aegislash-Base', 'Scizor'],
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', '+Unobtainable', '+Past', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)' && template.tier !== "Evo NFE!") {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
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
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
		mod: 'evolutionproject',
		searchShow: false,
	}
];