export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['HOME', 'DreamWorld', 'OU', 'UU', 'RU', 'NU', 'PU', '(PU)'],
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
		let species = this.dex.deepClone(pokemon.species);
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
		}
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
  init: function() {
     this.modData('Learnsets', 'chansey').learnset.spikes = ['8L1'];
     this.modData('Learnsets', 'toedscruel').learnset.partingshot = ['8L1'];
     this.modData('Learnsets', 'tyranitar').learnset.knockoff = ['8L1'];
     this.modData('Learnsets', 'ironhands').learnset.recover = ['8L1'];
     this.modData('Learnsets', 'brutebonnet').learnset.swordsdance = ['8L1'];
     this.modData('Learnsets', 'lycanrocdusk').learnset.uturn = ['8L1'];
     this.modData('Learnsets', 'tinkaton').learnset.bulletpunch = ['8L1'];
     this.modData('Learnsets', 'zoroark').learnset.moonblast = ['8L1'];
     this.modData('Learnsets', 'rotomheat').learnset.lavaplume = ['8L1'];
     this.modData('Learnsets', 'arboliva').learnset.moonblast = ['8L1'];
     this.modData('Learnsets', 'samurott').learnset.shellsmash = ['8L1'];
     this.modData('Learnsets', 'tatsugiri').learnset.spacialrend = ['8L1'];
     this.modData('Learnsets', 'ironthorns').learnset.shiftgear = ['8L1'];
     this.modData('Learnsets', 'wochien').learnset.strengthsap = ['8L1'];
     this.modData('Learnsets', 'sylveon').learnset.surf = ['8L1'];
     this.modData('Learnsets', 'florges').learnset.leafstorm = ['8L1'];
     this.modData('Learnsets', 'florges').learnset.earthpower = ['8L1'];
     this.modData('Learnsets', 'abomasnow').learnset.partingshot = ['8L1'];
     this.modData('Learnsets', 'espeon').learnset.recover = ['8L1'];
     this.modData('Learnsets', 'jolteon').learnset.spikes = ['8L1'];
     this.modData('Learnsets', 'wigglytuff').learnset.recover = ['8L1'];
     this.modData('Learnsets', 'slaking').learnset.knockoff = ['8L1'];
     this.modData('Learnsets', 'tsareena').learnset.playrough = ['8L1'];
     this.modData('Learnsets', 'gyarados').learnset.acrobatics = ['8L1'];
     this.modData('Learnsets', 'espeon').learnset.quiverdance = ['8L1'];
     this.modData('Learnsets', 'slowbro').learnset.teleport = ['8L1'];
     this.modData('Learnsets', 'mismagius').learnset.focusblast = ['8L1'];
     this.modData('Learnsets', 'magnezone').learnset.earthpower = ['8L1'];
     this.modData('Learnsets', 'cryogonal').learnset.doomdesire = ['8L1'];
     this.modData('Learnsets', 'hippowdon').learnset.mortalspin = ['8L1'];
     this.modData('Learnsets', 'inteleon').learnset.freezedry = ['8L1'];
   },
};
