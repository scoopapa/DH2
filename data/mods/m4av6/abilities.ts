export const BattleAbilities: {[k: string]: ModdedAbilityData} = {
	gravitas: {
		shortDesc: "On switch-in, this Pokémon summons Gravity.",
		onStart(source) {
			this.field.addPseudoWeather('gravity');
		},
		name: "Gravitas",
		rating: 4,
		num: -1001,
	},
	ignite: {
		desc: "This Pokémon's Normal-type moves become Fire-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokémon's Normal-type moves become Fire-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fire';
				move.igniteBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.igniteBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Ignite",
		rating: 4,
		num: -1002,
	},
	grounded: {
		desc: "This Pokémon clears terrains on entry. It also prevents any new terrains from being set while it is present.",
		shortDesc: "This Pokémon shuts down all terrains.",
		onStart(source) {
			this.add('-ability', pokemon, 'Grounded');
			this.field.clearTerrain();
		},
		onAnyTerrainStart(target, source, terrain) {
			this.add('-ability', pokemon, 'Grounded');
			this.field.clearTerrain();
		},
		name: "Grounded",
		rating: 2,
		num: -1003,
	},
	arenarock: {
		desc: "On switch-in, the field becomes Grassy Terrain. This terrain remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Grassy Terrain begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.clearTerrain();
			this.field.setTerrain('grassyterrain');
		},
		onAnyTerrainStart(target, source, terrain) {
			if(target !== source){
				this.field.clearTerrain();
				this.field.setTerrain('grassyterrain');
			}
		},
		onEnd(pokemon) {
			if (this.field.terrainData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('arenarock')) {
					this.field.terrainData.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		name: "Arena Rock",
		rating: 4.5,
		num: -1004,
	},
	sharpstriker: {
		desc: "This Pokémon's ballistic moves have their power multiplied by 1.5. Ballistic moves include Bullet Seed, Octazooka, Barrage, Rock Wrecker, Zap Cannon, Acid Spray, Aura Sphere, Focus Blast, and all moves with Ball or Bomb in their name.",
		shortDesc: "This Pokémon's ballistic moves have 1.5x power (Shadow Ball, Sludge Bomb, Focus Blast, etc).",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.5);
			}
		},
		name: "Sharp Striker",
		rating: 3,
		num: -1005,
	},
	coldsweat: {
		desc: "On switch-in, this Pokémon summons hail. It changes the weather to rain if any opposing Pokémon has an attack that is super effective on this Pokémon or an OHKO move. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves.",
		shortDesc: "On switch-in, this Pokémon summons hail. Summons rain if the foe has a supereffective or OHKO move.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
      		      pokemon.addVolatile('coldsweat');
						return;
					}
				}
			}
			if (
				(pokemon.volatiles['coldsweat'])
			) {
				this.field.setWeather('raindance');
				pokemon.removeVolatile('coldsweat');
				return;
			}
			else {
				this.field.setWeather('hail');
				return;
			}
		},
		name: "Cold Sweat",
		rating: 4,
		num: -1006,
	},
	trashcompactor: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it clears the hazard and Stockpiles 1.",
		shortDesc: "Hazard immunity. Clears hazards, Stockpiles 1 if switched in on them.",
		name: "Trash Compactor",
		rating: 5,
		num: -1007,
	},
	tempestuous: {
		desc: "When replacing a fainted party member, this Pokémon's Special Defense is boosted. If one of this Pokémon's party members fainted on the turn before, the power of its Electric-type moves is doubled.",
		shortDesc: "Gains the effect of Charge when replacing a fainted ally.",
		onStart(pokemon) {
			if (pokemon.side.faintedThisTurn) {
				this.boost({spd: 1}, pokemon);
			}
		},
		onBasePowerPriority: 9,
		onBasePower(basePower, pokemon, move) {
			if (move.type === 'Electric' && pokemon.side.faintedLastTurn) {
				this.debug('tempestuous boost');
				return this.chainModify(2);
			}
		},
		name: "Tempestuous",
		rating: 3,
		num: -1008,
	},
	sootguard: {
		shortDesc: "This Pokémon receives 3/4 damage from neutrally effective attacks.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod = 0) {
				this.debug('Soot Guard neutralize');
				return this.chainModify(0.75);
			}
		},
		name: "Soot Guard",
		rating: 3,
		num: -1009,
	},
	dustscatter: {
		shortDesc: "This Pokémon bypasses immunuties to its spore and powder moves.",
		onModifyMove(move) {
			delete move.flags['powder'];
		},
		name: "Dust Scatter",
		rating: 2,
		num: -1010,
	},
	counterclockwisespiral: {
		desc: "On switch-in, the field becomes Trick Room. This room remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Trick Room begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.removePseudoWeather('trickroom');
			this.field.addPseudoWeather('trickroom');
		},
		onAnyTryMove(target, source, effect) {
			if (['trickroom'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Counter-Clockwise Spiral', effect, '[of] ' + target);
				return false;
			}
		},
		onEnd(pokemon) {
			if (this.field.pseudoWeatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('counterclockwisespiral')) {
					this.field.pseudoWeatherData.source = target;
					return;
				}
			}
			this.field.removePseudoWeather('trickroom');
		},
		name: "Counter-Clockwise Spiral",
		rating: 4.5,
		num: -1011,
	},
}
