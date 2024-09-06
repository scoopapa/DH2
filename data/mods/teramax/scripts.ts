export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["TMFE", "TMNFE", "TMLC"],
	},
	init() {
		for (const i in this.data.FormatsData) {
			if (i.endsWith('gmax')) this.modData('FormatsData', i).tier = "TMFE";
		}
		this.modData("Learnsets", "darmanitangalar").learnset.terablast = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.iceshard = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.lavaplume = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.bugbuzz = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.skittersmack = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.quiverdance = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.ragepowder = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.leechlife = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.bugbite = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.strugglebug = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.morningsun = ["9L1"];
		delete this.modData('Learnsets', 'fluttermane').learnset.moonblast;
		delete this.modData('Learnsets', 'fluttermane').learnset.mysticalfire;
		delete this.modData('Learnsets', 'fluttermane').learnset.dazzlinggleam;
		delete this.modData('Learnsets', 'fluttermane').learnset.drainingkiss;
		delete this.modData('Learnsets', 'fluttermane').learnset.charm;
		delete this.modData('Learnsets', 'fluttermane').learnset.mistyterrain;
		this.modData("Learnsets", "palafin").learnset.superpower = ["9L1"];
		delete this.modData('Learnsets', 'palafin').learnset.closecombat;
		this.modData("Learnsets", "ironbundle").learnset.surf = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.defog = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.haze = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.discharge = ["9L1"];
		delete this.modData('Learnsets', 'ironbundle').learnset.freezedry;
		this.modData("Learnsets", "dracovish").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "dracovish").learnset.terablast = ["9L1"];
		this.modData("Learnsets", "annihilape").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "annihilape").learnset.strengthsap = ["9L1"];
		delete this.modData('Learnsets', 'annihilape').learnset.bulkup;
		delete this.modData('Learnsets', 'primeape').learnset.bulkup;
		delete this.modData('Learnsets', 'mankey').learnset.bulkup;
		delete this.modData('Learnsets', 'chienpao').learnset.suckerpunch;    
		this.modData("Learnsets", "chienpao").learnset.freezedry = ["9L1"];
		this.modData("Learnsets", "chienpao").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "chienpao").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "chiyu").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "chiyu").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "chiyu").learnset.scald = ["9L1"];
		this.modData("Learnsets", "tinglu").learnset.curse = ["9L1"];
		this.modData("Learnsets", "wochien").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "wochien").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "flapple").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "flapple").learnset.scaleshot = ["9L1"];
		this.modData("Learnsets", "alcremie").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "alcremie").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "butterfree").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "butterfree").learnset.spore = ["9L1"];
		this.modData("Learnsets", "butterfree").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "butterfree").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "centiskorch").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "centiskorch").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "centiskorch").learnset.wildcharge = ["9L1"];
		this.modData("Learnsets", "stonjourner").learnset.headlongrush = ["9L1"];
		this.modData("Learnsets", "stonjourner").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "stonjourner").learnset.bounce = ["9L1"];
		this.modData("Learnsets", "falinks").learnset.rockblast = ["9L1"];
		this.modData("Learnsets", "falinks").learnset.bulletseed = ["9L1"];
		this.modData("Learnsets", "falinks").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "scovillain").learnset.flareblitz = ["9L1"];
		this.modData("Learnsets", "scovillain").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "dudunsparce").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "dudunsparce").learnset.defog = ["9L1"];
		this.modData("Learnsets", "eiscue").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "eiscue").learnset.shoreup = ["9L1"];
		this.modData("Learnsets", "eiscue").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "tatsugiri").learnset.recover = ["9L1"];
		this.modData("Learnsets", "tatsugiri").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "tatsugiri").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "tatsugiri").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "tatsugiri").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "screamtail").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.poisonfang = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.firefang = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.poltergeist = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.ragingfury = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.temperflare = ["9L1"];
		this.modData("Learnsets", "brutebonnet").learnset.earthquake = ["9L1"];
		delete this.modData('Learnsets', 'brutebonnet').learnset.bulletseed;
		delete this.modData('Learnsets', 'brutebonnet').learnset.seedbomb;
		delete this.modData('Learnsets', 'brutebonnet').learnset.lashout;
		delete this.modData('Learnsets', 'brutebonnet').learnset.closecombat;
		delete this.modData('Learnsets', 'brutebonnet').learnset.grassyterrain;
		delete this.modData('Learnsets', 'brutebonnet').learnset.energyball;
		delete this.modData('Learnsets', 'brutebonnet').learnset.leafstorm;
		delete this.modData('Learnsets', 'brutebonnet').learnset.grassknot;
		delete this.modData('Learnsets', 'brutebonnet').learnset.synthesis;
		this.modData("Learnsets", "slitherwing").learnset.airslash = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.ancientpower = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.bulldoze = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.fellstinger = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.fierydance = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.finalgambit = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.gyroball = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.pinmissile = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.pounce = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.quiverdance = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.rockblast = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.rockslide = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.rocktomb = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.roost = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "slitherwing").learnset.strugglebug = ["9L1"];
		delete this.modData('Learnsets', 'slitherwing').learnset.acrobatics;
		delete this.modData('Learnsets', 'slitherwing').learnset.highhorsepower;
		this.modData("Learnsets", "ironjugulis").learnset.aeroblast = ["9L1"];
		this.modData("Learnsets", "ironjugulis").learnset.roost = ["9L1"];
		this.modData("Learnsets", "ironjugulis").learnset.defog = ["9L1"];
		this.modData("Learnsets", "ironjugulis").learnset.thunder = ["9L1"];
		this.modData("Learnsets", "ironleaves").learnset.bitterblade = ["9L1"];
		this.modData("Learnsets", "ironleaves").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "ironleaves").learnset.psychocut = ["9L1"];
		this.modData("Learnsets", "ironleaves").learnset.hornleech = ["9L1"];
		this.modData("Learnsets", "ironleaves").learnset.powerwhip = ["9L1"];
		this.modData("Learnsets", "ironthorns").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "ironthorns").learnset.risingvoltage = ["9L1"];
		this.modData("Learnsets", "kingler").learnset.meteormash = ["9L1"];
		this.modData("Learnsets", "coalossal").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "drednaw").learnset.stoneaxe = ["9L1"];
		this.modData("Learnsets", "drednaw").learnset.brickbreak = ["9L1"];
		this.modData("Learnsets", "drednaw").learnset.wavecrash = ["9L1"];
		this.modData("Learnsets", "orbeetle").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "orbeetle").learnset.heatwave = ["9L1"];
		this.modData("Learnsets", "orbeetle").learnset.encore = ["9L1"];
		this.modData("Learnsets", "grimmsnarl").learnset.painsplit = ["9L1"];
		this.modData("Learnsets", "grimmsnarl").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.noxioustorque = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "revavroom").learnset.flareblitz = ["9L1"];
		this.modData("Learnsets", "gyarados").learnset.bounce = ["9L1"];
		this.modData("Learnsets", "gyarados").learnset.powerwhip = ["9L1"];
		this.modData("Learnsets", "gyarados").learnset.wavecrash = ["9L1"];
		this.modData("Learnsets", "gyarados").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "kilowattrel").learnset.defog = ["9L1"];
		this.modData("Learnsets", "kilowattrel").learnset.heatwave = ["9L1"];
		this.modData("Learnsets", "togekiss").learnset.defog = ["9L1"];
		this.modData("Learnsets", "togekiss").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "togekiss").learnset.hurricane = ["9L1"];
		this.modData("Learnsets", "togekiss").learnset.healbell = ["9L1"];
		this.modData("Learnsets", "ninjask").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "ninjask").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "ninjask").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "ninjask").learnset.aquacutter = ["9L1"];
		this.modData("Learnsets", "frosmoth").learnset.roost = ["9L1"];
		this.modData("Learnsets", "frosmoth").learnset.thunder = ["9L1"];
		this.modData("Learnsets", "frosmoth").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "staraptor").learnset.flareblitz = ["9L1"];
		this.modData("Learnsets", "staraptor").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "toedscruel").learnset.synthesis = ["9L1"];
		this.modData("Learnsets", "toedscruel").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "gastrodon").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "gastrodon").learnset.knockoff = ["9L1"];
		delete this.modData('Learnsets', 'darmanitangalar').learnset.freezedry;
		delete this.modData('Learnsets', 'darumakagalar').learnset.freezedry;
		delete this.modData('Learnsets', 'kingler').learnset.brickbreak;
		delete this.modData('Learnsets', 'kingler').learnset.rocksmash;
		delete this.modData('Learnsets', 'kingler').learnset.superpower;
		delete this.modData('Learnsets', 'kingler').learnset.hammerarm;
		delete this.modData('Learnsets', 'krabby').learnset.brickbreak;
		delete this.modData('Learnsets', 'krabby').learnset.rocksmash;
		delete this.modData('Learnsets', 'krabby').learnset.superpower;
		delete this.modData('Learnsets', 'krabby').learnset.hammerarm;
	},
	actions: {
		inherit: true,
		canTerastallize(pokemon: Pokemon) {
			if (pokemon.getItem().zMove || pokemon.canMegaEvo || this.dex.gen !== 9 || pokemon.hasItem('wishingstone')) {
				return null;
			}
			return pokemon.teraType;
		},
	  	modifyDamage(baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false) {
	  		const tr = this.battle.trunc;
	  		if (!move.type) move.type = '???';
	  		const type = move.type;
	  		baseDamage += 2;
	  		if (move.spreadHit) {
	  			// multi-target modifier (doubles only)
	  			const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
	  			this.battle.debug('Spread modifier: ' + spreadModifier);
	  			baseDamage = this.battle.modify(baseDamage, spreadModifier);
	  		} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
	  			// Parental Bond modifier
	  			const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
	  			this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
	  			baseDamage = this.battle.modify(baseDamage, bondModifier);
	  		}
	  		// weather modifier
	  		baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);
	  		// crit - not a modifier
	  		const isCrit = target.getMoveHitData(move).crit;
	  		if (isCrit) {
	  			baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
	  		}
	  		// random factor - also not a modifier
	  		baseDamage = this.battle.randomizer(baseDamage);
	  		// STAB
			const isTeraStellar = pokemon.terastallized === 'Stellar';
			if (move.forceSTAB || (type !== '???' &&
				(pokemon.hasType(type) || (pokemon.terastallized && pokemon.getTypes(false, true).includes(type)) ||
					(isTeraStellar && !pokemon.stellarBoostedTypes.includes(type))))) {
				let stab = (isTeraStellar && !pokemon.getTypes(false, true).includes(type)) ? [4915, 4096] : move.stab || 1.5;
				if ((type === pokemon.terastallized || (isTeraStellar && !pokemon.stellarBoostedTypes.includes(type))) &&
					pokemon.getTypes(false, true).includes(type)) {
					// In my defense, the game hardcodes the Adaptability check like this, too.
					stab = (stab === 1.75 && !isTeraStellar) ? 2.25 : 1.75;
				} else if (pokemon.terastallized && type !== pokemon.terastallized && stab === 2) {
					stab = 1.25;
				}
				baseDamage = this.battle.modify(baseDamage, stab);
				if (isTeraStellar && pokemon.species.name !== 'Terapagos-Stellar' &&
					!pokemon.stellarBoostedTypes.includes(type)) {
					pokemon.stellarBoostedTypes.push(type);
				}
			}
	  		// types
	  		let typeMod = target.runEffectiveness(move);
	  		typeMod = this.battle.clampIntRange(typeMod, -6, 6);
	  		target.getMoveHitData(move).typeMod = typeMod;
	  		if (typeMod > 0) {
	  			if (!suppressMessages) this.battle.add('-supereffective', target);
	  			for (let i = 0; i < typeMod; i++) {
	  				baseDamage *= 2;
	  			}
	  		}
	  		if (typeMod < 0) {
	  			if (!suppressMessages) this.battle.add('-resisted', target);
	  			for (let i = 0; i > typeMod; i--) {
	  				baseDamage = tr(baseDamage / 2);
	  			}
	  		}
	  		if (isCrit && !suppressMessages) this.battle.add('-crit', target);
	  		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
	  			if (this.battle.gen < 6 || move.id !== 'facade') {
	  				baseDamage = this.battle.modify(baseDamage, 0.5);
	  			}
	  		}
	  		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
	  		if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;
	  		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
	  		baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);
	  		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
	  			baseDamage = this.battle.modify(baseDamage, 0.25);
	  			this.battle.add('-zbroken', target);
	  		}
	  		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
	  		if (this.battle.gen !== 5 && !baseDamage) return 1;
	  		// ...but 16-bit truncation happens even later, and can truncate to 0
	  		return tr(baseDamage, 16);
		},
		getActiveMaxMove(move: Move, pokemon: Pokemon) {
			if (typeof move === 'string') move = this.dex.getActiveMove(move);
			if (move.name === 'Struggle') return this.dex.getActiveMove(move);
			let maxMove = this.dex.getActiveMove(this.MAX_MOVES[move.category === 'Status' ? move.category : move.type]);
			if (move.category !== 'Status') {
				if (pokemon.gigantamax && pokemon.canGigantamax) {
					const gMaxMove = this.dex.getActiveMove(pokemon.canGigantamax);
					if (gMaxMove.exists) { 
						if ((move.name === 'Drum Beating' && pokemon.baseSpecies.baseSpecies === 'Rillaboom') ||
							(move.name === 'Frenzy Plant' && pokemon.baseSpecies.baseSpecies === 'Venusaur') ||
							(move.name === 'Blast Burn' && pokemon.baseSpecies.baseSpecies === 'Charizard') ||
							(move.name === 'Hydro Cannon' && pokemon.baseSpecies.baseSpecies === 'Blastoise') ||
							(move.name === 'Pollen Puff' && pokemon.baseSpecies.baseSpecies === 'Butterfree') ||
							(move.name === 'Volt Tackle' && pokemon.baseSpecies.baseSpecies === 'Pikachu') ||
							(move.name === 'Pay Day' && pokemon.baseSpecies.baseSpecies === 'Meowth') ||
							(move.name === 'Dynamic Punch' && pokemon.baseSpecies.baseSpecies === 'Machamp') ||
							(move.name === 'Shadow Ball' && pokemon.baseSpecies.baseSpecies === 'Gengar') ||
							(move.name === 'Crabhammer' && pokemon.baseSpecies.baseSpecies === 'Kingler') ||
							(move.name === 'Freeze-Dry' && pokemon.baseSpecies.baseSpecies === 'Lapras') ||
							(move.name === 'Last Resort' && pokemon.baseSpecies.baseSpecies === 'Eevee') ||
							(move.name === 'Body Slam' && pokemon.baseSpecies.baseSpecies === 'Snorlax') ||
							(move.name === 'Gunk Shot' && pokemon.baseSpecies.baseSpecies === 'Garbodor') ||
							(move.name === 'Double Iron Bash' && pokemon.baseSpecies.baseSpecies === 'Melmetal') ||
							(move.name === 'Pyro Ball' && pokemon.baseSpecies.baseSpecies === 'Cinderace') ||
							(move.name === 'Snipe Shot' && pokemon.baseSpecies.baseSpecies === 'Inteleon') ||
							(move.name === 'Brave Bird' && pokemon.baseSpecies.baseSpecies === 'Corviknight') ||
							(move.name === 'Psychic' && pokemon.baseSpecies.baseSpecies === 'Orbeetle') ||
							(move.name === 'Razor Shell' && pokemon.baseSpecies.baseSpecies === 'Drednaw') || 
							(move.name === 'Tar Shot' && pokemon.baseSpecies.baseSpecies === 'Coalossal') ||
							(move.name === 'Grav Apple' && pokemon.baseSpecies.baseSpecies === 'Flapple') ||
							(move.name === 'Apple Acid' && pokemon.baseSpecies.baseSpecies === 'Appletun') ||
							(move.name === 'Sand Tomb' && pokemon.baseSpecies.baseSpecies === 'Sandaconda') ||
							(move.name === 'Fire Lash' && pokemon.baseSpecies.baseSpecies === 'Centiskorch') ||
							(move.name === 'Overdrive' && pokemon.baseSpecies.baseSpecies === 'Toxtricity') ||
							(move.name === 'Dazzling Gleam' && pokemon.baseSpecies.baseSpecies === 'Hatterene') ||
							(move.name === 'False Surrender' && pokemon.baseSpecies.baseSpecies === 'Grimmsnarl') ||
							(move.name === 'Draining Kiss' && pokemon.baseSpecies.baseSpecies === 'Alcremie') ||
							(move.name === 'Heavy Slam' && pokemon.baseSpecies.baseSpecies === 'Copperajah') ||
							(move.name === 'Draco Meteor' && pokemon.baseSpecies.baseSpecies === 'Excadrill') ||
							(move.name === 'Wicked Blow' && pokemon.baseSpecies.baseSpecies === 'Urshifu') ||
							(move.name === 'Surging Strikes' && pokemon.baseSpecies.baseSpecies === 'Urshifu')) maxMove = gMaxMove;
					}
				}
				if (!move.maxMove?.basePower) throw new Error(`${move.name} doesn't have a maxMove basePower`);
				if (!['gmaxdrumsolo', 'gmaxfireball', 'gmaxhydrosnipe', 'gmaxwindrage',
					  'gmaxbefuddle', 'gmaxcannonade', 'gmaxcentiferno', 'gmaxchistrike',
					  'gmaxcuddle', 'gmaxdepletion', 'gmaxfinale', 'gmaxfoamburst',
					  'gmaxgoldrush', 'gmaxgravitas', 'gmaxmalodor', 'gmaxmeltdown',
					  'gmaxoneblow', 'gmaxrapidflow', 'gmaxreplenish', 'gmaxresonance',
					  'gmaxsandblast', 'gmaxsmite', 'gmaxsnooze', 'gmaxsteelsurge',
					  'gmaxterror', 'gmaxvinelash', 'gmaxvolcalith', 'gmaxvoltcrash', 'gmaxwildfire',
					  'gmaxstonesurge', 'gmaxstunshock', 'gmaxsweetness', 'gmaxtartness'].includes(maxMove.id)) {
					maxMove.basePower = move.maxMove.basePower;
				}
				maxMove.category = move.category;
			}
			let maxNewPower = this.newMaxPower(move); // new max power
			maxMove.basePower = maxNewPower; // bypass old max power
			maxMove.baseMove = move.id;
			// copy the priority for Psychic Terrain, Quick Guard
			maxMove.priority = move.priority;
			maxMove.isZOrMaxPowered = true;
			return maxMove;
		},
		newMaxPower(move){
			let oldMaxPowers = [0, 90, 100, 110, 120, 130, 140, 150];
			let oldweakMaxPowers = [0, 70, 75, 80, 85, 90, 95, 100];
			let weakMaxPowers = [0, 60, 65, 70, 75, 80, 85, 90];
			let maxPowers = [0, 70, 80, 90, 100, 110, 120, 130];
			let maxNewPower = 110;
			if (!move.basePower) {
				return maxNewPower;
			} else if (!move.maxMove?.basePower){
				return null;
			} else if (['Fighting', 'Poison'].includes(move.type)) {
				for (const i in oldweakMaxPowers){
					if (move.maxMove?.basePower === oldweakMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else if (['Flying'].includes(move.type)) {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = maxPowers[i]
						break
					}
				}
			}
			return maxNewPower;
		},
	},
	side: {
		inherit: true,
		constructor(name: string, battle: Battle, sideNum: number, team: PokemonSet[]) {
			const sideScripts = battle.dex.data.Scripts.side;
			if (sideScripts) Object.assign(this, sideScripts);
	
			this.battle = battle;
			this.id = ['p1', 'p2', 'p3', 'p4'][sideNum] as SideID;
			this.n = sideNum;
	
			this.name = name;
			this.avatar = '';
	
			this.team = team;
			this.pokemon = [];
			for (let i = 0; i < this.team.length && i < 24; i++) {
				// console.log("NEW POKEMON: " + (this.team[i] ? this.team[i].name : '[unidentified]'));
				this.pokemon.push(new Pokemon(this.team[i], this));
				this.pokemon[i].position = i;
			}
	
			switch (this.battle.gameType) {
			case 'doubles':
				this.active = [null!, null!];
				break;
			case 'triples': case 'rotation':
				this.active = [null!, null!, null!];
				break;
			default:
				this.active = [null!];
			}
	
			this.pokemonLeft = this.pokemon.length;
			this.faintedLastTurn = null;
			this.faintedThisTurn = null;
			this.totalFainted = 0;
			this.zMoveUsed = false;
			this.dynamaxUsed = this.battle.gen !== 9;
	
			this.sideConditions = {};
			this.slotConditions = [];
			// Array#fill doesn't work for this
			for (let i = 0; i < this.active.length; i++) this.slotConditions[i] = {};
	
			this.activeRequest = null;
			this.choice = {
				cantUndo: false,
				error: ``,
				actions: [],
				forcedSwitchesLeft: 0,
				forcedPassesLeft: 0,
				switchIns: new Set(),
				zMove: false,
				mega: false,
				ultra: false,
				terastallize: false,
				dynamax: false,
			};
	
			// old-gens
			this.lastMove = null;
		},
		canDynamaxNow(): boolean {
			if (this.battle.gen !== 9) return false;
			// In multi battles, players on a team are alternatingly given the option to dynamax each turn
			// On turn 1, the players on their team's respective left have the first chance (p1 and p2)
			if (this.battle.gameType === 'multi' && this.battle.turn % 2 !== [1, 1, 0, 0][this.n]) return false;
			// if (this.battle.gameType === 'multitriples' && this.battle.turn % 3 !== [1, 1, 2, 2, 0, 0][this.side.n]) {
			//		return false;
			// }
			return !this.dynamaxUsed;
		},
	},
	pokemon: {
	inherit: true,
		getDynamaxRequest(skipChecks?: boolean) {
			// {gigantamax?: string, maxMoves: {[k: string]: string} | null}[]
			if (!skipChecks) {
				if (!this.side.canDynamaxNow()) return;
				if (
					this.species.isMega || this.species.isPrimal || this.species.forme === "Ultra" || this.canMegaEvo
				) {
					return;
				}
				// Some pokemon species are unable to dynamax
				if (this.species.cannotDynamax || this.illusion?.species.cannotDynamax) return;
			}
			const result: DynamaxOptions = {maxMoves: []};
			let atLeastOne = false;
			for (const moveSlot of this.moveSlots) {
				const move = this.battle.dex.moves.get(moveSlot.id);
				const maxMove = this.battle.actions.getMaxMove(move, this);
				if (maxMove) {
					if (this.maxMoveDisabled(move)) {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target, disabled: true});
					} else {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target});
						atLeastOne = true;
					}
				}
			}
			if (!atLeastOne) return;
			if (this.canGigantamax) result.gigantamax = this.canGigantamax;
			return result;
		},		
	},
};
