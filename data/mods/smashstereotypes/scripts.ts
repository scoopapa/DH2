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
		
		for (var id in this.data.Pokedex) {
			if (this.data.Pokedex[id].breedingVariant) {
				const name = this.data.Pokedex[id].baseSpecies;
				const variant = this.data.Pokedex[id].breedingVariant;
				const learnset = this.data.Learnsets[this.toID(name)].learnset;
				if (!this.data.Learnsets[id]) this.data.Learnsets[id] = { learnset: {}};
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = ['8L1', '7L1', '6L1', '5L1', '4L1'];
				}
				const weight = (this.data.Pokedex[id].weightkg + this.data.Pokedex[this.toID(variant)].weightkg) / 2;
				this.modData('Pokedex', id).weightkg = weight;
			}
		}
		

		this.modData('Learnsets', 'shaymin').learnset.allterrainblast = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.leafage = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.shedleaves = ['8L1'];
		
		this.modData('Learnsets', 'heatmor').learnset.spikes = ['8L1'];
		
		
		delete this.modData('Learnsets', 'melmetal').learnset.superpower;
		delete this.modData('Learnsets', 'melmetal').learnset.bodypress;
		delete this.modData('Learnsets', 'melmetal').learnset.brickbreak;
		this.modData('Learnsets', 'melmetal').learnset.bulkup = ['8L1'];
		
		
		this.modData("Learnsets", "machamp").learnset.machpunch = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.forcepalm = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.laserfocus = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.flamewheel = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.stormthrow = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.circlethrow = ["8L1"];
		
		
		this.modData("Learnsets", "sandaconda").learnset.crunch = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.slitherstrike = ["8L1"];
		
		
		delete this.modData('Learnsets', 'spectrier').learnset.nastyplot;
		
		
		this.modData("Learnsets", "exploudmeow").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.hypnosis = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.thunderbolt = ["8L1"];
		
		
		this.modData('Learnsets', 'garbodor').learnset.stealthrock = ["8L1"];
		this.modData('Learnsets', 'garbodor').learnset.earthquake = ["8L1"];
		this.modData('Learnsets', 'garbodor').learnset.irondefense = ["8L1"];
		
		
		this.modData('Learnsets', 'arcanine').learnset.nobleroar = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.hypervoice = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.dragonragesylve = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.flamewheelsylve = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.incineratesylve = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.mudslapsylve = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.stormstrike = ["8L1"];
		delete this.modData('Learnsets', 'arcanine').learnset.mudslap;
		delete this.modData('Learnsets', 'arcanine').learnset.incinerate;
		delete this.modData('Learnsets', 'arcanine').learnset.flamewheel;
		delete this.modData('Learnsets', 'arcanine').learnset.dragonrage;
		
		this.modData('Learnsets', 'frosmoth').learnset.moonlight = ["8L1"];
		this.modData('Learnsets', 'frosmoth').learnset.thunderbolt = ["8L1"];
		
		
		this.modData('Learnsets', 'ludicolo').learnset.recover = ["8L1"];
		this.modData('Learnsets', 'ludicolo').learnset.rapidspin = ["8L1"];
		delete this.modData('Learnsets', 'ludicolo').learnset.leechseed;
		delete this.modData('Learnsets', 'ludicolo').learnset.hydropump;
		
		this.modData('Learnsets', 'stunfisk').learnset.shoreup = ['8L1'];
		this.modData('Learnsets', 'stunfisk').learnset.voltswitch = ['8L1'];
		
		
		this.modData('Learnsets', 'typhlosion').learnset.earthpower = ['8L1'];
		this.modData('Learnsets', 'typhlosion').learnset.meteorbeam = ['8L1'];
		this.modData('Learnsets', 'typhlosion').learnset.scorchingsands = ['8L1'];
		this.modData('Learnsets', 'typhlosion').learnset.stealthrock = ['8L1'];
		this.modData('Learnsets', 'typhlosion').learnset.selfdestruct = ['8L1'];
		
		
		this.modData('Learnsets', 'hydreigon').learnset.knockoff = ['8L1'];
		this.modData('Learnsets', 'hydreigon').learnset.dragonhammer = ['8L1'];
		
		delete this.modData('Learnsets', 'froslass').learnset.thunder;
		delete this.modData('Learnsets', 'froslass').learnset.thunderbolt;
		
		this.modData("Learnsets", "vespiquenterra").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.rockpolish = ["8L1"];

		
		this.modData("Learnsets", "grapploct").learnset.aquajet = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.toxic = ["8L1"];
	},
	
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['SSS', 'SSS Uber'],
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
		if (item.name === "Galladite" && pokemon.baseSpecies.name === "Gallade-Kalos") {
			return "Gallade-Kalos-Mega";
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
