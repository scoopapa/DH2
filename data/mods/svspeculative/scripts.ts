export const Scripts: ModdedBattleScriptsData = {
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
	}
};
