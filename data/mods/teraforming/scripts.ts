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
		this.modData("Learnsets", "clodsire").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "clodsire").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "clodsire").learnset.crunch = ["9L1"];
		this.modData("Learnsets", "clodsire").learnset.snarl = ["9L1"];
		this.modData("Learnsets", "ironleaves").learnset.synthesis = ["9L1"];
		delete this.modData('Learnsets', 'ironleaves').learnset.swordsdance;
		this.modData("Learnsets", "flygon").learnset.roost = ["9L1"];
		this.modData("Learnsets", "flygon").learnset.boomingsands = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "meowscarada").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "volcanion").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "okidogi").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "munkidori").learnset.expandingforce = ["9L1"];
		this.modData("Learnsets", "munkidori").learnset.burningjealousy = ["9L1"];
		this.modData("Learnsets", "munkidori").learnset.solarbeam = ["9L1"];
		this.modData("Learnsets", "fezandipiti").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "fezandipiti").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "fezandipiti").learnset.barbbarrage = ["9L1"];
		this.modData("Learnsets", "fezandipiti").learnset.spiritbreak = ["9L1"];
		this.modData("Learnsets", "fezandipiti").learnset.tripledive = ["9L1"];
		this.modData("Learnsets", "kleavor").learnset.spookyslash = ["9L1"];
		this.modData("Learnsets", "kleavor").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "kleavor").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.psychicnoise = ["9L1"];
		this.modData("Learnsets", "basculegionf").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "hawlucha").learnset.ragingfury = ["9L1"];
		this.modData("Learnsets", "hawlucha").learnset.firelash = ["9L1"];
		this.modData("Learnsets", "hawlucha").learnset.solarblade = ["9L1"];
		delete this.modData('Learnsets', 'farigiraf').learnset.storedpower;
		delete this.modData('Learnsets', 'girafarig').learnset.storedpower;
		this.modData("Learnsets", "primarina").learnset.bugbuzz = ["9L1"];
		this.modData("Learnsets", "primarina").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "dragonite").learnset.hypervoice = ["9L1"];
		this.modData("Learnsets", "dragonite").learnset.dualwingbeat = ["9L1"];
		delete this.modData('Learnsets', 'palafin').learnset.encore;
		delete this.modData('Learnsets', 'palafin').learnset.taunt;
		delete this.modData('Learnsets', 'finizen').learnset.encore;
		this.modData("Learnsets", "ironcrown").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "ironcrown").learnset.psychicterrain = ["9L1"];
		this.modData("Learnsets", "snorlax").learnset.gyroball = ["9L1"];
		this.modData("Learnsets", "leavanny").learnset.vacuumwave = ["9L1"];
		this.modData("Learnsets", "leavanny").learnset.upperhand = ["9L1"];
		this.modData("Learnsets", "leavanny").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "leavanny").learnset.taunt = ["9L1"];
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
			if (pokemon.species.name === 'Pawmot' && type === 'Electric') {
	        pokemon.formeChange('Pawmot-Tera', null, true);
	        pokemon.baseMaxhp = Math.floor(Math.floor(
	          2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
	        ) * pokemon.level / 100 + 10);
	        const newMaxHP = pokemon.baseMaxhp;
	        pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
	        pokemon.maxhp = newMaxHP;
	        this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
      	}
			if (pokemon.species.name === 'Iron Leaves' && type === 'Fighting') {
	        pokemon.formeChange('Iron Leaves-Tera', null, true);
	        pokemon.baseMaxhp = Math.floor(Math.floor(
	          2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
	        ) * pokemon.level / 100 + 10);
	        const newMaxHP = pokemon.baseMaxhp;
	        pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
	        pokemon.maxhp = newMaxHP;
	        this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
      	}
			if (pokemon.species.name === 'Iron Crown' && type === 'Dark') {
	        pokemon.formeChange('Iron Crown-Tera', null, true);
	        pokemon.baseMaxhp = Math.floor(Math.floor(
	          2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
	        ) * pokemon.level / 100 + 10);
	        const newMaxHP = pokemon.baseMaxhp;
	        pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
	        pokemon.maxhp = newMaxHP;
	        this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
      	}
			if (pokemon.species.baseSpecies === 'Clodsire') {
				const tera = pokemon.species.id === 'clodsire' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Flygon') {
				const tera = pokemon.species.id === 'flygon' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Weezing') {
				const tera = pokemon.species.id === 'Weezing' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Volcanion') {
				const tera = pokemon.species.id === 'volcanion' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Meowscarada') {
				const tera = pokemon.species.id === 'meowscarada' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Fezandipiti') {
				const tera = pokemon.species.id === 'fezandipiti' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Okidogi') {
				const tera = pokemon.species.id === 'okidogi' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Munkidori') {
				const tera = pokemon.species.id === 'munkidori' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.name === 'Kleavor' && type === 'Ghost') {
	        pokemon.formeChange('Kleavor-Tera', null, true);
	        pokemon.baseMaxhp = Math.floor(Math.floor(
	          2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
	        ) * pokemon.level / 100 + 10);
	        const newMaxHP = pokemon.baseMaxhp;
	        pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
	        pokemon.maxhp = newMaxHP;
	        this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
      	}
			if (pokemon.species.baseSpecies === 'Basculegion') {
				const tera = pokemon.species.id === 'basculegion' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Diancie') {
				const tera = pokemon.species.id === 'diancie' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Hawlucha') {
				const tera = pokemon.species.id === 'hawlucha' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Avalugg') {
				const tera = pokemon.species.id === 'avalugg' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Goodra') {
				const tera = pokemon.species.id === 'goodra' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Blaziken') {
				const tera = pokemon.species.id === 'blaziken' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Dragonite') {
				const tera = pokemon.species.id === 'dragonite' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Farigiraf') {
				const tera = pokemon.species.id === 'farigiraf' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.name === 'Primarina' && type === 'Bug') {
	        pokemon.formeChange('Primarina-Tera', null, true);
	        pokemon.baseMaxhp = Math.floor(Math.floor(
	          2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
	        ) * pokemon.level / 100 + 10);
	        const newMaxHP = pokemon.baseMaxhp;
	        pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
	        pokemon.maxhp = newMaxHP;
	        this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
      	}
			if (pokemon.species.baseSpecies === 'Palafin') {
				const tera = pokemon.species.id === 'palafin' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
				if (pokemon.species.forme === 'Tera') {
					pokemon.setAbility('waterbubble', pokemon, true);
					this.battle.add('-activate', pokemon, 'ability: Water Bubble');
				}
				if (pokemon.species.forme === 'Hero-Tera') {
					pokemon.setAbility('justified', pokemon, true);
					this.battle.add('-activate', pokemon, 'ability: Justified');
				}
			}
			if (pokemon.species.baseSpecies === 'Leavanny') {
				const tera = pokemon.species.id === 'leavanny' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.baseSpecies === 'Snorlax') {
				const tera = pokemon.species.id === 'Snorlax' ? 'tera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			this.battle.runEvent('AfterTerastallization', pokemon);
		},
	},
};
