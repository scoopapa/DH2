export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
		// only to specify the order of custom tiers
		customTiers: ['Tera'],
	},
	init() {
		this.modData("Learnsets", "skeledirge").learnset.healbell = ["9L1"];
		this.modData("Learnsets", "tinkaton").learnset.wish = ["9L1"];
		this.modData("Learnsets", "tinkaton").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "samurotthisui").learnset.bitterblade = ["9L1"];
		this.modData("Learnsets", "samurotthisui").learnset.ragingfury = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.magiccoat = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.moonlight = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.playrough = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.psyshock = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "blissey").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "pincurchin").learnset.arcanerush = ["9L1"];
		this.modData("Learnsets", "pincurchin").learnset.risingvoltage = ["9L1"];
		this.modData("Learnsets", "pincurchin").learnset.encore = ["9L1"];
		this.modData("Learnsets", "metagross").learnset.twinbeam = ["9L1"];
		this.modData("Learnsets", "metagross").learnset.avalanche = ["9L1"];
		this.modData("Learnsets", "mabosstiff").learnset.pursuit = ["9L1"];
		this.modData("Learnsets", "mabosstiff").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "mabosstiff").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "mabosstiff").learnset.poisonfang = ["9L1"];
	},
	actions: {
		inherit: true,
		terastallize(pokemon: Pokemon) {
	  		if (pokemon.illusion && ['Ogerpon', 'Terapagos'].includes(pokemon.illusion.species.baseSpecies)) {
	  			this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
	  		}
	
			const type = pokemon.teraType;
			this.battle.add('-terastallize', pokemon, type);
			pokemon.terastallized = type;
			for (const ally of pokemon.side.pokemon) {
				ally.canTerastallize = null;
			}
			pokemon.addedType = '';
			pokemon.knownType = true;
			pokemon.apparentType = type;
			pokemon.side.addSideCondition('teraused', pokemon);
			if (pokemon.species.baseSpecies === 'Ogerpon') {
				const tera = pokemon.species.id === 'ogerpon' ? 'tealtera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.name === 'Terapagos-Terastal' && type === 'Stellar') {
	        pokemon.formeChange('Terapagos-Stellar', null, true);
	        pokemon.baseMaxhp = Math.floor(Math.floor(
	          2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
	        ) * pokemon.level / 100 + 10);
	        const newMaxHP = pokemon.baseMaxhp;
	        pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
	        pokemon.maxhp = newMaxHP;
	        this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
      	}
  			if (pokemon.species.baseSpecies === 'Samurott') {
				const tera = pokemon.species.id === 'samurott' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Skeledirge') {
				const tera = pokemon.species.id === 'skeledirge' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Tinkaton') {
				const tera = pokemon.species.id === 'tinkaton' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.name === 'Pincurchin' && type === 'Dragon') {
	        pokemon.formeChange('Pincurchin-Tera', null, true);
	        pokemon.baseMaxhp = Math.floor(Math.floor(
	          2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
	        ) * pokemon.level / 100 + 10);
	        const newMaxHP = pokemon.baseMaxhp;
	        pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
	        pokemon.maxhp = newMaxHP;
	        this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
      	}
			if (pokemon.species.baseSpecies === 'Metagross') {
				const tera = pokemon.species.id === 'metagross' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Blissey') {
				const tera = pokemon.species.id === 'blissey' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Mabosstiff') {
				const tera = pokemon.species.id === 'mabosstiff' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Hydrapple') {
				const tera = pokemon.species.id === 'hydrapple' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Pawmot') {
				const tera = pokemon.species.id === 'pawmot' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			this.battle.runEvent('AfterTerastallization', pokemon);
		},
	},
};
