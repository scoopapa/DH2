export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Mega', 'LZ', 'LZ NFE'],
		customDoublesTiers: ['Mega', 'LZ', 'LZ NFE'],
	},
	init() {		

		// test
		this.modData("Learnsets", "ampharos").learnset.milkdrink = ['9M'];
	//	this.modData("Learnsets", "aurorus").learnset.timecompressor = ['9M'];
		this.modData("Learnsets", "avalugg").learnset.lifedew = ['9M'];
		this.modData("Learnsets", "banette").learnset.copycat = ['9M'];
        this.modData("Learnsets", "bastiodon").learnset.blockage = ['9M'];
        this.modData("Learnsets", "bouffalant").learnset.quickattack = ['9M'];
		this.modData("Learnsets", "bouffalant").learnset.rampage = ['9M'];
		this.modData("Learnsets", "centiskorch").learnset.purifyingflame = ['9M'];
		this.modData("Learnsets", "croagunk").learnset.acidicterrain = ['9M'];
		this.modData("Learnsets", "croagunk").learnset.oilspill = ['9M'];
		this.modData("Learnsets", "croagunk").learnset.reactivepoison = ['9M'];
		this.modData("Learnsets", "croagunk").learnset.superpower = ['9M'];
		delete this.modData('Learnsets', "dragonite").learnset.dualwingbeat;
		this.modData("Learnsets", "dusknoir").learnset.cursedwrath = ['9M'];
        this.modData("Learnsets", "eelektross").learnset.shortcircuit = ['9M'];
		this.modData("Learnsets", "flabebe").learnset.lifedew = ['9M'];
		this.modData("Learnsets", "flabebe").learnset.tailwind = ['9M'];
		this.modData("Learnsets", "goomy").learnset.acidicterrain = ['9M'];
		this.modData("Learnsets", "goomy").learnset.oilspill = ['9M'];
		this.modData("Learnsets", "goomy").learnset.reactivepoison = ['9M'];
		this.modData("Learnsets", "mareep").learnset.risingvoltage = ['9M'];
		this.modData("Learnsets", "medicham").learnset.channeling = ['9M'];
		this.modData("Learnsets", "natu").learnset.destinybond = ['9M'];
		this.modData("Learnsets", "nidoking").learnset.acidicterrain = ['9M'];
		this.modData("Learnsets", "nidoking").learnset.oilspill = ['9M'];
		this.modData("Learnsets", "nidoking").learnset.reactivepoison = ['9M'];
		this.modData("Learnsets", "nidoqueen").learnset.acidicterrain = ['9M'];
        this.modData("Learnsets", "nidoqueen").learnset.milkdrink = ['9M'];
		this.modData("Learnsets", "nidoqueen").learnset.oilspill = ['9M'];
		this.modData("Learnsets", "nidoqueen").learnset.reactivepoison = ['9M'];
		this.modData("Learnsets", "poochyena").learnset.jawlock = ['9M'];
		this.modData("Learnsets", "sandaconda").learnset.shedtail = ['9M'];
		this.modData("Learnsets", "sandshrew").learnset.grassknot = ['9M'];
		this.modData("Learnsets", "sandshrew").learnset.grassyglide = ['9M'];
		this.modData("Learnsets", "sandshrew").learnset.grassyterrain = ['9M'];
		this.modData("Learnsets", "sawsbuck").learnset.seasonalantlers = ['9M'];
        this.modData("Learnsets", "sharpedo").learnset.jetbite = ['9M'];
		this.modData("Learnsets", "sharpedo").learnset.wavecrash = ['9M'];
		this.modData("Learnsets", "skrelp").learnset.acidicterrain = ['9M'];
		this.modData("Learnsets", "skrelp").learnset.gastroacid = ['9M'];
		this.modData("Learnsets", "skrelp").learnset.oilspill = ['9M'];
		this.modData("Learnsets", "skrelp").learnset.roost = ['9M'];
		this.modData("Learnsets", "skrelp").learnset.terrainpulse = ['9M'];
        this.modData("Learnsets", "slaking").learnset.fakeout = ['9M'];
        this.modData("Learnsets", "slaking").learnset.feint = ['9M'];
		this.modData("Learnsets", "slaking").learnset.rampage = ['9M'];
		this.modData("Learnsets", "zubat").learnset.acidicterrain = ['9M'];
		this.modData("Learnsets", "zubat").learnset.reactivepoison = ['9M'];
	//	delete this.modData('Learnsets', "smeargle").learnset.magicpowder;

		for (const id in this.dataCache.Pokedex) {
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon || !newMon.copyData) continue; // weeding out Pokémon that aren't new
			const copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];

			if (!newMon.types && copyData.types) newMon.types = copyData.types;
			if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
			if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
			if (!newMon.num && copyData.num) newMon.num = copyData.num * -1; // inverting the original's dex number
			if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
			if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
			if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
			if (!newMon.color && copyData.color) newMon.color = copyData.color;
			if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;

			let copyMoves = newMon.copyData;
			if (newMon.copyMoves) copyMoves = newMon.copyMoves;
			if (copyMoves) {
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = {learnset: {}}; // create a blank learnset entry so we don't need a learnsets file (thank you ink)
				const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = learnset[moveid].filter(
						(method) => !method.includes('S')
					);
				}
				if (newMon.movepoolAdditions) {
					for (const move of newMon.movepoolAdditions) {
						this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["9M"];
					}
				}
				if (newMon.movepoolDeletions) {
					for (const move of newMon.movepoolDeletions) {
						delete this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)];
					}
				}
				// hard-coding a bit for Eclipseroid specifically (may rework if we get more fusions later but kinda doubt)
				if (newMon.name === 'Eclipseroid') {
					for (const moveid in this.dataCache.Learnsets[this.toID("Lunatone")].learnset) {
						this.modData('Learnsets', id).learnset[moveid] = this.dataCache.Learnsets[this.toID("Lunatone")].learnset[moveid].filter(
							(method) => !method.includes('S')
						);
					}
				}
			}
		}
	},



	// New line
	actions: {

		canAscend(pokemon: Pokemon) {
			if ((pokemon.baseSpecies.baseSpecies === 'Matokoda') &&
				pokemon.getItem().id === 'matokodium') {
				return "Matokoda-Ascend";
			}
			return null;
		},

		canMegaEvo(pokemon) { // modded for forms
			const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
			const item = pokemon.getItem();
			if (
				altForme?.isMega && altForme?.requiredMove &&
				pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
			) {
				return altForme.name;
			}
		// this is where form-specific Megas are defined when that becomes relevant
			if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbucksummer") return "Sawsbuck-Summer-Mega";
			if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckautumn") return "Sawsbuck-Autumn-Mega";
			if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckwinter") return "Sawsbuck-Winter-Mega";
		/* examples:
			if (item.name === "Wormadamite") {
				if (pokemon.species.name === "Wormadam-Sandy") return "Wormadam-Sandy-Mega";
				else return null;
			}
			if (item.name === "Hoopanite" && pokemon.species.name === "Hoopa-Unbound") return null;
		*/
			if (item.megaEvolves !== pokemon.species.name || item.megaStone === pokemon.species.name) return null;
			return item.megaStone;
		},
		},
		// end


		




};