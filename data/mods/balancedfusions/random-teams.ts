import RandomTeams from '../../random-teams';

export class RandomFusionTeams extends RandomTeams {
	randomTeam() {
		const pokemon = [];

		const excludedTiers = ['LC', 'LC Uber', 'NFE', 'Uber'];
		const allowedNFE = ['Chansey', 'Doublade', 'Gligar', 'Porygon2', 'Scyther'];

		const availableFormes: {[k: string]: string[]} = {};
		for (const id in this.dex.data.FormatsData) {
			const template = this.dex.getSpecies(id);
			if (template.gen <= this.gen && !excludedTiers.includes(template.tier) && !template.isMega && !template.isPrimal && !template.isNonstandard && template.randomBattleMoves) {
				if (!availableFormes[template.baseSpecies]) {
					availableFormes[template.baseSpecies] = [id];
				} else {
					availableFormes[template.baseSpecies].push(id);
				}
			}
		}
		const pokemonPool = Object.values(availableFormes);

		// PotD stuff
		let potd;
		if (global.Config && Config.potd && this.dex.getRuleTable(this.format).has('potd')) {
			potd = this.dex.getSpecies(Config.potd);
		}

		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const baseFormes: {[k: string]: number} = {};
		let uberCount = 0;
		let puCount = 0;
		const teamDetails: RandomTeamsTypes.TeamDetails = {};

		while (pokemonPool.length && pokemon.length < 6) {
			let template = this.dex.getSpecies(this.sample(this.sampleNoReplace(pokemonPool)));
			if (!template.exists) continue;

			// Useless in Random Battle without greatly lowering the levels of everything else
			if (template.name === 'Unown') continue;

			// Only certain NFE Pokemon are allowed
			if (template.evos.length && !allowedNFE.includes(template.name)) continue;

			let tier = template.tier;
			switch (tier) {
			case 'Uber':
				// Ubers are limited to 2 but have a 20% chance of being added anyway.
				if (uberCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'PU':
				// PUs are limited to 2 but have a 20% chance of being added anyway.
				if (puCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'Unreleased':
				// Unreleased Pokémon have 20% the normal rate
				if (this.random(5) >= 1) continue;
				break;
			case 'CAP':
				// CAPs have 20% the normal rate
				if (this.random(5) >= 1) continue;
			}

			const fusion = this.dex.getSpecies(this.sample(this.sampleNoReplace(pokemonPool)));
			if (!fusion.exists) continue;

			// Useless in Random Battle without greatly lowering the levels of everything else
			if (fusion.name === 'Unown') continue;

			// Only certain NFE Pokemon are allowed
			if (fusion.evos.length && !allowedNFE.includes(fusion.name)) continue;

			// Illusion shouldn't be the last Pokemon of the team
			if (fusion.abilities['0'] === 'Illusion' && pokemon.length > 4) continue;

			tier = fusion.tier;
			switch (tier) {
			case 'Uber':
				// Ubers are limited to 2 but have a 20% chance of being added anyway.
				if (uberCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'PU':
				// PUs are limited to 2 but have a 20% chance of being added anyway.
				if (puCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'Unreleased':
				// Unreleased Pokémon have 20% the normal rate
				if (this.random(5) >= 1) continue;
				break;
			case 'CAP':
				// CAPs have 20% the normal rate
				if (this.random(5) >= 1) continue;
			}

			// Limit 2 of any type
			const types = fusion.types.filter(type => typeCount[type] <= 1 || this.random(5) < 1);
			if (!types.length) continue;
			if (types.length > 1) this.sampleNoReplace(types);
			const shiny = types[0] === fusion.types[1];
			if (types[0] !== template.types[0]) {
				if (typeCount[template.types[0]] > 1 && this.random(5) >= 1) continue;
				types.unshift(template.types[0]);
			}

			if (potd?.exists) {
				// The Pokemon of the Day belongs in slot 2
				if (pokemon.length === 1) {
					template = potd;
				} else if (template.name === potd.name) {
					continue; // No, thanks, I've already got one
				}
			}

			const mixedTemplate = this.dex.deepClone(template);
			mixedTemplate.randomBattleMoves = [...new Set([...template.randomBattleMoves!, ...fusion.randomBattleMoves!])];
			let statid: StatName;
			for (statid in template.baseStats) {
				mixedTemplate.baseStats[statid] = template.baseStats[statid] + fusion.baseStats[statid] >> 1;
			}
			mixedTemplate.types = types;
			const set = this.randomSet(mixedTemplate, teamDetails, !pokemon.length);

			// Illusion shouldn't be the last Pokemon of the team
			if (set.ability === 'Illusion' && pokemon.length > 4) continue;

			// Limit 1 of any type combination
			let typeCombo = types.slice().sort().join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle' || set.ability === 'Sand Stream') {
				// Drought, Drizzle and Sand Stream don't count towards the type combo limit
				typeCombo = set.ability;
			}
			const ability = fusion.abilities[0];
			if (ability === 'Drought' || ability === 'Drizzle' || ability === 'Sand Stream') {
				// Drought, Drizzle and Sand Stream don't count towards the type combo limit
				typeCombo = ability;
			}
			if (typeCombo in typeComboCount) continue;

			// Okay, the set passes, add it to our team
			set.name = fusion.name;
			set.shiny = shiny;
			pokemon.push(set);

			// Now that our Pokemon has passed all checks, we can increment our counters
			baseFormes[template.baseSpecies] = 1;

			// Increment type counters
			for (const type of types) {
				if (type in typeCount) {
					typeCount[type]++;
				} else {
					typeCount[type] = 1;
				}
			}
			typeComboCount[typeCombo] = 1;

			// Increment Uber/NU counters
			if (tier === 'Uber') {
				uberCount++;
			} else if (tier === 'PU') {
				puCount++;
			}

			// Team has Mega/weather/hazards
			if (this.dex.getItem(set.item).megaStone) teamDetails['megaStone'] = 1;
			if (set.ability === 'Snow Warning') teamDetails['hail'] = 1;
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails['rain'] = 1;
			if (set.ability === 'Sand Stream') teamDetails['sand'] = 1;
			if (set.moves.includes('stealthrock')) teamDetails['stealthRock'] = 1;
			if (set.moves.includes('toxicspikes')) teamDetails['toxicSpikes'] = 1;
			if (set.moves.includes('defog')) teamDetails['defog'] = 1;
			if (set.moves.includes('rapidspin')) teamDetails['rapidSpin'] = 1;
		}
		return pokemon;
	}
}

export default RandomFusionTeams;
