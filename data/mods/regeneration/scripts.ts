export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['ReGeneration', 'ReGeneration NFE', 'ReGeneration LC'],
		customDoublesTiers: ['ReGeneration', 'ReGeneration NFE', 'ReGeneration LC'],
	},
	// Terastal (taken from SV Speculative)

	canMegaEvo(pokemon) {
		if (pokemon.species.isMega) return null;
		return pokemon.hpType || "Normal";
	},
	runMegaEvo(pokemon) {
		if (pokemon.species.isMega || !pokemon.canMegaEvo) return false;
		if (pokemon.illusion) {
			this.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityData, pokemon);
		}
		const species = this.dex.deepClone(pokemon.species);
		species.teraBoost = pokemon.species.types;
		species.teraType = pokemon.canMegaEvo; // remember that the species is Terastal
		species.types = [species.teraType];
		species.nonTeraForm = pokemon.species;

		// Pokémon affected by Sky Drop cannot Terastallize
		const side = pokemon.side;
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		pokemon.formeChange(species, "Terastal", true);
		this.add('-anim', pokemon, "Geomancy", pokemon);
		this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		this.add('-message', `${pokemon.name} Terastallized to become ${species.types[0]}-type!`);
		pokemon.addVolatile('terastal');

		// Limit one Terastal
		for (const ally of side.pokemon) ally.canMegaEvo = null;
		return true;
	},
	runSwitch(pokemon: Pokemon) { // modified for Terastal
		if (pokemon.illusion ? pokemon.illusion.species.teraType : pokemon.species.teraType) this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		this.runEvent('Swap', pokemon);
		this.runEvent('SwitchIn', pokemon);
		if (this.gen <= 2 && !pokemon.side.faintedThisTurn && pokemon.draggedIn !== this.turn) {
			this.runEvent('AfterSwitchInSelf', pokemon);
		}
		if (!pokemon.hp) return false;
		pokemon.isStarted = true;
		if (!pokemon.fainted) {
			this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityData, pokemon);
			pokemon.abilityOrder = this.abilityOrder++;
			this.singleEvent('Start', pokemon.getItem(), pokemon.itemData, pokemon);
		}
		if (this.gen === 4) {
			for (const foeActive of pokemon.side.foe.active) {
				foeActive.removeVolatile('substitutebroken');
			}
		}
		pokemon.draggedIn = null;
		return true;
	},
	pokemon: {
		setType(newType: string | string[], enforce = false) { // modded for Terastal
			// First type of Arceus, Silvally cannot be normally changed
			if (!enforce) {
				if (this.species.teraType || (this.battle.gen >= 5 && (this.species.num === 493 || this.species.num === 773)) ||
					 (this.battle.gen === 4 && this.hasAbility('multitype'))) {
					return false;
				}
			}

			if (!newType) throw new Error("Must pass type to setType");
			this.types = (typeof newType === 'string' ? [newType] : newType);
			this.addedType = '';
			this.knownType = true;
			this.apparentType = this.types.join('/');

			return true;
		},
	},
	modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
	) {
		const tr = this.trunc;
		if (!move.type) move.type = '???';
		const type = move.type;

		baseDamage += 2;

		// multi-target modifier (doubles only)
		if (move.spreadHit) {
			const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
			this.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.modify(baseDamage, spreadModifier);
		}

		// weather modifier
		baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.randomizer(baseDamage);

		// STAB
		if (move.forceSTAB || (type !== '???' && (pokemon.hasType(type) || pokemon.species.teraBoost?.includes(type)))) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			let stabBoost = 1.5;
			if (move.stab) stabBoost = move.stab;
			if (pokemon.species.teraBoost?.includes(type)) {
				if (pokemon.hasType(type)) {
				   if (!suppressMessages) this.add('-message', `Terastal boosts moves of the ${type} type!`);
					stabBoost = 2.25;
			   } else {
				    stabBoost = 1.5;
				}
			}
			baseDamage = this.modify(baseDamage, stabBoost);
		}
		// types
		let typeMod = target.runEffectiveness(move);
		typeMod = this.clampIntRange(typeMod, -6, 6);
		target.getMoveHitData(move).typeMod = typeMod;
		if (typeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);

			for (let i = 0; i < typeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (typeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);

			for (let i = 0; i > typeMod; i--) {
				baseDamage = tr(baseDamage / 2);
			}
		}

		if (isCrit && !suppressMessages) this.add('-crit', target);

		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
			if (this.gen < 6 || move.id !== 'facade') {
				baseDamage = this.modify(baseDamage, 0.5);
			}
		}

		if (pokemon.status === 'frz' && pokemon.statusData.frostbite && move.category === 'Special') { // the only changed section
			baseDamage = this.modify(baseDamage, 0.5);
		}

		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.modify(baseDamage, 0.25);
			this.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},
	init() {
		   this.modData("Learnsets", "alakazam").learnset.brainwave = ["8L1"];

		   this.modData("Learnsets", "gengar").learnset.avalanche = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.blizzard = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.focusenergy = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.frostbreath = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.icebeam = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.iceshard = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.powdersnow = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.snowscape = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.illwind = ["8L1"];

		   this.modData("Learnsets", "dragonite").learnset.barrier = ["8L1"];
		   this.modData("Learnsets", "dragonite").learnset.guardiandive = ["8L1"];
		   this.modData("Learnsets", "dragonite").learnset.uturn = ["8L1"];

		   this.modData("Learnsets", "venusaur").learnset.aromaticmist = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.calmmind = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.dazzlinggleam = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.drainingkiss = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.fairywind = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.floralhealing = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.flowershield = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.healpulse = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.playrough = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.psychic = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.vitalenergy = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.zenheadbutt = ["8L1"];

		   this.modData("Learnsets", "charizard").learnset.ceaselessedge = ["8L1"];
		   this.modData("Learnsets", "charizard").learnset.throatchop = ["8L1"];
		   this.modData("Learnsets", "charizard").learnset.smokytorment = ["8L1"];
		   this.modData("Learnsets", "charizard").learnset.suckerpunch = ["8L1"];

		   this.modData("Learnsets", "blastoise").learnset.chargebeam = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.charge = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.iondeluge = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.powerwash = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.thunder = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.thunderwave = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.thunderbolt = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.thundershock = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.voltswitch = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.zapcannon = ["8L1"];

		   this.modData("Learnsets", "beedrill").learnset.closecombat = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.flail = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.reversal = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.spikes = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.stickyweb = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.taunt = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.terablast = ["8L1"];

		   this.modData("Learnsets", "pidgeot").learnset.acrobatics = ["8L1"];
		   this.modData("Learnsets", "pidgeot").learnset.closecombat = ["8L1"];

		   this.modData("Learnsets", "wigglytuff").learnset.crunch = ["8L1"];
		   this.modData("Learnsets", "wigglytuff").learnset.darkpulse = ["8L1"];
		   this.modData("Learnsets", "wigglytuff").learnset.rapidspin = ["8L1"];
		   this.modData("Learnsets", "wigglytuff").learnset.taunt = ["8L1"];
		   this.modData("Learnsets", "wigglytuff").learnset.uturn = ["8L1"];

		   this.modData("Learnsets", "dodrio").learnset.brickbreak = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.bulldoze = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.dig = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.drillrun = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.earthquake = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.highjumpkick = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.lowkick = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.quickguard = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.rototiller = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.sandattack = ["8L1"];
		   this.modData("Learnsets", "dodrio").learnset.triplekick = ["8L1"];

		   this.modData("Learnsets", "seadra").learnset.acidspray = ["8L1"];
		   this.modData("Learnsets", "seadra").learnset.coralcrash = ["8L1"];
		   this.modData("Learnsets", "seadra").learnset.dracometeor = ["8L1"];
		   this.modData("Learnsets", "seadra").learnset.sludgebomb = ["8L1"];
		   this.modData("Learnsets", "seadra").learnset.sludgewave = ["8L1"];
		   this.modData("Learnsets", "seadra").learnset.thunder = ["8L1"];
		   this.modData("Learnsets", "seadra").learnset.thunderbolt = ["8L1"];
		   this.modData("Learnsets", "seadra").learnset.toxicspikes = ["8L1"];

		   this.modData("Learnsets", "vaporeon").learnset.slipaway = ["8L1"];

		   this.modData("Learnsets", "flareon").learnset.crunch = ["8L1"];
		   this.modData("Learnsets", "flareon").learnset.flareout = ["8L1"];
		   this.modData("Learnsets", "flareon").learnset.playrough = ["8L1"];
		   this.modData("Learnsets", "flareon").learnset.psychicfangs = ["8L1"];
		   this.modData("Learnsets", "flareon").learnset.suckerpunch = ["8L1"];

		   this.modData("Learnsets", "jolteon").learnset.buzzoff = ["8L1"];

		delete this.modData('Learnsets', 'alakazam').learnset.focusblast;
		delete this.modData('Learnsets', 'alakazam').learnset.nastyplot;

		delete this.modData('Learnsets', 'gengar').learnset.focusblast;
		delete this.modData('Learnsets', 'gengar').learnset.nastyplot;
		delete this.modData('Learnsets', 'gengar').learnset.terablast;
		delete this.modData('Learnsets', 'gengar').learnset.thunderbolt;
		delete this.modData('Learnsets', 'gengar').learnset.thunder;

		delete this.modData('Learnsets', 'dragonite').learnset.dragonclaw;
		delete this.modData('Learnsets', 'dragonite').learnset.dragondance;
		delete this.modData('Learnsets', 'dragonite').learnset.dragonrush;
		delete this.modData('Learnsets', 'dragonite').learnset.dualwingbeat;
		delete this.modData('Learnsets', 'dragonite').learnset.honeclaws;
		delete this.modData('Learnsets', 'dragonite').learnset.outrage;
		delete this.modData('Learnsets', 'dragonite').learnset.poweruppunch;
		delete this.modData('Learnsets', 'dragonite').learnset.terablast;

		delete this.modData('Learnsets', 'venusaur').learnset.earthpower;
		delete this.modData('Learnsets', 'venusaur').learnset.weatherball;

		delete this.modData('Learnsets', 'blastoise').learnset.aurasphere;
		delete this.modData('Learnsets', 'blastoise').learnset.avalanche;
		delete this.modData('Learnsets', 'blastoise').learnset.blizzard;
		delete this.modData('Learnsets', 'blastoise').learnset.focusblast;
		delete this.modData('Learnsets', 'blastoise').learnset.hail;
		delete this.modData('Learnsets', 'blastoise').learnset.icebeam;
		delete this.modData('Learnsets', 'blastoise').learnset.icepunch;
		delete this.modData('Learnsets', 'blastoise').learnset.icywind;
		delete this.modData('Learnsets', 'blastoise').learnset.mist;
		delete this.modData('Learnsets', 'blastoise').learnset.shellsmash;

		delete this.modData('Learnsets', 'pidgeot').learnset.toxic;

		delete this.modData('Learnsets', 'dodrio').learnset.fly;

		delete this.modData('Learnsets', 'seadra').learnset.blizzard;
		delete this.modData('Learnsets', 'seadra').learnset.icebeam;

		// Removing the prevos' moves
		delete this.modData('Learnsets', 'gastly').learnset.nastyplot;
		delete this.modData('Learnsets', 'gastly').learnset.terablast;
		delete this.modData('Learnsets', 'gastly').learnset.thunderbolt;
		delete this.modData('Learnsets', 'gastly').learnset.thunder;

		delete this.modData('Learnsets', 'haunter').learnset.focusblast;
		delete this.modData('Learnsets', 'haunter').learnset.nastyplot;
		delete this.modData('Learnsets', 'haunter').learnset.terablast;
		delete this.modData('Learnsets', 'haunter').learnset.thunderbolt;
		delete this.modData('Learnsets', 'haunter').learnset.thunder;

		delete this.modData('Learnsets', 'dratini').learnset.dragondance;
		delete this.modData('Learnsets', 'dratini').learnset.dragonrush;
		delete this.modData('Learnsets', 'dratini').learnset.outrage;
		delete this.modData('Learnsets', 'dratini').learnset.terablast;

		delete this.modData('Learnsets', 'dragonair').learnset.dragondance;
		delete this.modData('Learnsets', 'dragonair').learnset.dragonrush;
		delete this.modData('Learnsets', 'dragonair').learnset.outrage;
		delete this.modData('Learnsets', 'dragonair').learnset.terablast;

		delete this.modData('Learnsets', 'bulbasaur').learnset.weatherball;

		delete this.modData('Learnsets', 'ivysaur').learnset.weatherball;

		delete this.modData('Learnsets', 'squirtle').learnset.aurasphere;
		delete this.modData('Learnsets', 'squirtle').learnset.blizzard;
		delete this.modData('Learnsets', 'squirtle').learnset.hail;
		delete this.modData('Learnsets', 'squirtle').learnset.icebeam;
		delete this.modData('Learnsets', 'squirtle').learnset.icepunch;
		delete this.modData('Learnsets', 'squirtle').learnset.mist;
		delete this.modData('Learnsets', 'squirtle').learnset.shellsmash;

		delete this.modData('Learnsets', 'wartortle').learnset.aurasphere;
		delete this.modData('Learnsets', 'wartortle').learnset.blizzard;
		delete this.modData('Learnsets', 'wartortle').learnset.hail;
		delete this.modData('Learnsets', 'wartortle').learnset.icebeam;
		delete this.modData('Learnsets', 'wartortle').learnset.icepunch;
		delete this.modData('Learnsets', 'wartortle').learnset.mist;
		delete this.modData('Learnsets', 'wartortle').learnset.shellsmash;

		delete this.modData('Learnsets', 'pidgey').learnset.toxic;

		delete this.modData('Learnsets', 'pidgeotto').learnset.toxic;

		delete this.modData('Learnsets', 'doduo').learnset.fly;

		delete this.modData('Learnsets', 'horsea').learnset.blizzard;
		delete this.modData('Learnsets', 'horsea').learnset.icebeam;
	},


};
