const hisui = ["arcaninehisui", "avalugghisui", "basculegion", "basculegionf", "braviaryhisui", "decidueyehisui", "dialgaorigin", "electrodehisui", "enamorus", "enamorustherian", "goodrahisui", "kleavor", "lilliganthisui", "overqwil", "palkiaorigin", "samurotthisui", "sneasler", "typhlosionhisui", "ursaluna", "wyrdeer", "zoroarkhisui"]; // only fully-evolved Pokémon from Legends: Arceus

export const Scripts: ModdedBattleScriptsData = {

	// Terastal

	canMegaEvo(pokemon) {
		if (pokemon.species.isMega) return null;
		return pokemon.hpType || "Normal";
	},
	runMegaEvo(pokemon) {
		if (pokemon.species.isMega || !pokemon.canMegaEvo) return false;
		if (pokemon.illusion) {
			this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
		}
		let species = this.dex.deepClone(pokemon.species);
		let teraboost = null;
		if (species.types[0] === pokemon.canMegaEvo || species.types[1] === pokemon.canMegaEvo) teraboost = true;
		species.types = [pokemon.canMegaEvo];
		
		// Pokémon affected by Sky Drop cannot Terastallize
		const side = pokemon.side;
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		pokemon.formeChange(species, "Terastal", true);
		this.add('-anim', pokemon, "Cosmic Power", pokemon);
		this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		this.add('-message', `${pokemon.name} Terastallized to become ${species.types[0]}-type!`);
		pokemon.m.terastal = true;
		pokemon.m.teraboost = teraboost;
		pokemon.addVolatile('terastal');

		// Limit one Terastal
		for (const ally of side.pokemon) ally.canMegaEvo = null;
		return true;
	},
	runSwitch(pokemon: Pokemon) { // modified for Terastal
		if (pokemon.m.terastal) this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		pokemon.addVolatile('terastal');
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
	formeChange( // just modded for presentational reasons...
		speciesId: string | Species, source: Effect = this.battle.effect,
		isPermanent?: boolean, message?: string
	) {
		const rawSpecies = this.battle.dex.getSpecies(speciesId);
		let teraSpecies = this.battle.dex.deepClone(rawSpecies);
		teraSpecies.types = [this.hpType || "Normal"];

		const species = this.m.terastal ? this.setSpecies(teraSpecies, source) || this.setSpecies(rawSpecies, source);
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
			if (source && source !== "Terastal") {
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
		}
		if (isPermanent && !['disguise', 'iceface'].includes(source.id)) {
			if (this.illusion) {
				this.ability = ''; // Don't allow Illusion to wear off
			}
			this.setAbility(species.abilities['0'], null, true);
			this.baseAbility = this.ability;
		}
		return true;
	},

	// Legends stuff + future speculative Fakemon

	init() {
		for (const id in this.dataCache.Pokedex) {
			if (this.modData('FormatsData', id)) {
				if (hisui.includes(id)) this.modData('FormatsData', id).tier = "Hisui";
			}
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon) continue; // weeding out Pokémon that aren't new

			if (newMon.copyData) {
				let copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];
				if (!newMon.types && copyData.types) newMon.types = copyData.types;
				if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
				if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
				if (!newMon.num && copyData.num) newMon.num = copyData.num;
				if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
				if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
				if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
				if (!newMon.color && copyData.color) newMon.color = copyData.color;
				if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;
			} else if (!newMon.name.startsWith('Enamorus')) continue;

			if (!this.dataCache.Learnsets[id]) continue; // just in case
			const movepoolAdditions = ["attract", "endure", "facade", "protect", "rest", "round", "sleeptalk", "snore", "substitute"];
			for (const move of movepoolAdditions) {
				this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
			}
		}
	},

	// modifyDamage added for frostbite for Hisuian Zoroark specifically
	// I do not know restraint when I see this Pokémon I'm sorry
	// it's not even mod-related what am I doing

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
		if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			baseDamage = this.modify(baseDamage, move.stab || 1.5);
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

};
