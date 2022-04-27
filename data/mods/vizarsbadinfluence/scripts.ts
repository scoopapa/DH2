export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) {//make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				for (let name of learnsetFusionList) {					
					const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;//get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						if (this.dataCache.Moves[moveid].isNonstandard === 'Past') continue; //exclude dexited moves (I hope!) 
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
		
		this.modData('Learnsets', 'arctozolt').learnset.plasmafists = ['8L1'];
		delete this.modData('Learnsets', 'arctozolt').learnset.boltbeak;
		
		this.modData('Learnsets', 'chesnaught').learnset.slackoff = ['8L1'];
		
		this.modData('Learnsets', 'cryogonal').learnset.growth = ['8L1'];
		delete this.modData('Learnsets', 'cryogonal').learnset.knockoff;
		
		this.modData('Learnsets', 'dugtrioalola').learnset.bulkup = ['8L1'];
		this.modData('Learnsets', 'dugtrioalola').learnset.coil = ['8L1'];
		this.modData('Learnsets', 'dugtrioalola').learnset.geargrind = ['8L1'];
		
		delete this.modData('Learnsets', 'eelektross').learnset.superpower;
		delete this.modData('Learnsets', 'eelektross').learnset.knockoff;
		
		this.modData('Learnsets', 'dugtrioalola').learnset.leafblade = ['8L1'];
		this.modData('Learnsets', 'dugtrioalola').learnset.solarblade = ['8L1'];
		this.modData('Learnsets', 'dugtrioalola').learnset.energyball = ['8L1'];
		
		this.modData('Learnsets', 'flygon').learnset.spikes = ['8L1'];
		this.modData('Learnsets', 'flygon').learnset.morningsun = ['8L1'];
		this.modData('Learnsets', 'flygon').learnset.lunge = ['8L1'];
		
		this.modData('Learnsets', 'girafarig').learnset.trick = ['8L1'];
				
		this.modData('Learnsets', 'metagross').learnset.shiftgear = ['8L1'];
		this.modData('Learnsets', 'metagross').learnset.closecombat = ['8L1'];
		
		this.modData("Learnsets", "sawsbuck").learnset.petalblizzard = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.shadowsneak = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.strengthsap = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.trickortreat = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.petalblizzard = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.flameburst = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.growth = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.leafstorm = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.overheat = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.highhorsepower = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.iceshard = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.iciclecrash = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.tripleaxel = ["8L1"];
		
		this.modData('Learnsets', 'slowbro').learnset.foulplay = ['8L1'];
		
		this.modData('Learnsets', 'slowbrogalar').learnset.toxic = ['8L1'];
		this.modData('Learnsets', 'slowbrogalar').learnset.toxicspikes = ['8L1'];
		this.modData('Learnsets', 'slowbrogalar').learnset.teleport = ['8L1'];
		
		this.modData('Learnsets', 'slowking').learnset.foulplay = ['8L1'];
		
		this.modData('Learnsets', 'stoutland').learnset.bringsticks = ['8L1'];
		
		this.modData('Learnsets', 'tapufini').learnset.foggymist = ['8L1'];
		delete this.modData('Learnsets', 'tapufini').learnset.defog;
		delete this.modData('Learnsets', 'tapufini').learnset.drainingkiss;
		
		delete this.modData('Learnsets', 'zacian').learnset.closecombat;
		this.modData('Learnsets', 'zacian').learnset.secretsword = ['8L1'];
	},
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Sawsbuckite" && pokemon.baseSpecies.id === "sawsbucksummer") {
			return "Sawsbuck-Summer-Mega";
		}
		if (item.name === "Sawsbuckite" && pokemon.baseSpecies.id === "sawsbuckautumn") {
			return "Sawsbuck-Autumn-Mega";
		}
		if (item.name === "Sawsbuckite" && pokemon.baseSpecies.id === "sawsbuckwinter") {
			return "Sawsbuck-Winter-Mega";
		}
		if (item.megaEvolves !== pokemon.baseSpecies.name || item.megaStone === pokemon.species.name) {
			return null;
		}
		return item.megaStone;
	},
	runMegaEvo(pokemon) {
		const speciesid = pokemon.canMegaEvo || pokemon.canUltraBurst;
		if (!speciesid) return false;
		const side = pokemon.side;

		// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		if (pokemon.illusion) {
			this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
		} // only part that's changed
		pokemon.formeChange(speciesid, pokemon.getItem(), true);

		// Limit one mega evolution
		const wasMega = pokemon.canMegaEvo;
		for (const ally of side.pokemon) {
			if (wasMega) {
				ally.canMegaEvo = null;
			} else {
				ally.canUltraBurst = null;
			}
		}

		this.runEvent('AfterMega', pokemon);
		return true;
	},
};