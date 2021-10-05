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
	},
	
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['SSS', 'SSS Uber'],
	},
	
	pokemon {
		setSpecies(rawSpecies: Species, source: Effect | null = this.battle.effect, isTransform = false) {
			const species = this.battle.runEvent('ModifySpecies', this, null, source, rawSpecies);
			if (!species) return null;
			this.species = species;

			this.setType(species.types, true);
			this.apparentType = rawSpecies.types.join('/');
			this.addedType = species.addedType || '';
			this.knownType = true;
			this.weighthg = species.weighthg;

			const stats = this.battle.spreadModify(this.species.baseStats, this.set);
			if (this.species.maxHP) stats.hp = this.species.maxHP;

			if (!this.maxhp) {
				this.baseMaxhp = stats.hp;
				this.maxhp = stats.hp;
				this.hp = stats.hp;
			}

			if (!isTransform) this.baseStoredStats = stats;
			let statName: StatNameExceptHP;
			for (statName in this.storedStats) {
				this.storedStats[statName] = stats[statName];
				if (this.modifiedStats) this.modifiedStats[statName] = stats[statName]; // Gen 1: Reset modified stats.
			}
			if (this.battle.gen <= 1) {
				// Gen 1: Re-Apply burn and para drops.
				if (this.status === 'par') this.modifyStat!('spe', 0.25);
				if (this.status === 'brn') this.modifyStat!('atk', 0.5);
			}
			this.speed = this.storedStats.spe;
			return species;
		}

		/**
		 * Changes this Pokemon's forme to match the given speciesId (or species).
		 * This function handles all changes to stats, ability, type, species, etc.
		 * as well as sending all relevant messages sent to the client.
		 */
		formeChange(
			speciesId: string | Species, source: Effect = this.battle.effect,
			isPermanent?: boolean, message?: string
		) {
			const rawSpecies = this.battle.dex.getSpecies(speciesId);

			const species = this.setSpecies(rawSpecies, source);
			if (!species) return false;

			if (this.battle.gen <= 2) return true;

			// The species the opponent sees
			const apparentSpecies =
				this.illusion ? this.illusion.species.name : species.baseSpecies;
			if (isPermanent) {
				this.baseSpecies = rawSpecies;
				this.details = species.name + (this.level === 100 ? '' : ', L' + this.level) +
					(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
				this.battle.add('detailschange', this, (this.illusion || this).details);
				if (source.effectType === 'Item') {
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.onPrimal) {
						if (this.illusion) {
							this.ability = '';
							this.battle.add('-primal', this.illusion);
						} else {
							this.battle.add('-primal', this);
						}
					} else {
						this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
					}
				} else if (source.effectType === 'Status') {
					// Shaymin-Sky -> Shaymin
					this.battle.add('-formechange', this, species.name, message);
				}
			} else {
				if (source.effectType === 'Ability') {
					this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
				} else {
					this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, message);
				}
			}
			if (isPermanent && !['disguise', 'iceface'].includes(source.id)) {
				if (this.illusion) {
					this.ability = ''; // Don't allow Illusion to wear off
				}
				this.setAbility(species.abilities['0'], null, true);
				this.baseAbility = this.ability;
			}
			return true;
		}
	},
};
