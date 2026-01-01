export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	swiftretreat: {
		name: "Swift Retreat",
		desc: "This Pokemon can choose to switch out on the second turn of moves with a charge turn of invulnerability instead of attacking. This list does not include Sky Drop.",
		shortDesc: "This Pokemon can choose to switch out on the second turn of a two-turn move.",
		num: -1,
		rating: 3,
	},
	lightpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Light Power",
		shortDesc: "This Pokemon's Special Attack is doubled.",
		rating: 5,
		num: -2,
	},
	seedsower: {
		inherit: true,
		isNonstandard: null,
		gen: 6,
	},
	flowergift: {
		inherit: true,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || (pokemon.baseSpecies.baseSpecies !== 'Cherrim' && pokemon.baseSpecies.baseSpecies !== 'Glimmaltis') || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.baseSpecies.baseSpecies === 'Cherrim' && pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
				if (pokemon.baseSpecies.baseSpecies === 'Glimmaltis' && pokemon.species.id !== 'glimmaltisblooming') {
					pokemon.formeChange('Glimmaltis-Blooming', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.baseSpecies.baseSpecies === 'Cherrim' && pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
				if (pokemon.baseSpecies.baseSpecies === 'Glimmaltis' && pokemon.species.id === 'glimmaltisblooming') {
					pokemon.formeChange('Glimmaltis', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim' && this.effectState.target.baseSpecies.baseSpecies !== 'Glimmaltis') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim' && this.effectState.target.baseSpecies.baseSpecies !== 'Glimmaltis') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1},
		desc: "If this Pokemon is a Cherrim or a Glimmaltis and Sunny Day is active, it changes to Sunshine Form and the Attack and Special Defense of it and its allies are multiplied by 1.5. These effects are prevented if the Pokemon is holding a Utility Umbrella.",
		shortDesc: "If user is Cherrim or Glimmaltis and Sunny Day is active, it and allies' Attack and Sp. Def are 1.5x.",
	},
	slushrush: {
		inherit: true,
		isNonstandard: null,
		gen: 6,
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
	},
	centerofmass: {
		shortDesc: "On switch-in, this Pokémon summons Gravity.",
		onStart(source) {
			this.field.addPseudoWeather('gravity');
		},
		name: "Center of Mass",
		rating: 4,
		num: -3,
	},
	terrorize: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ghost';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Terrorize",
		desc: "This Pokemon's Normal-type moves become Ghost-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ghost type and have 1.3x power.",
		rating: 4.5,
		num: -4,
	},
	nowornever: {
		// gotta find a better way to code that but it works for Singles + VGC
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if ((pokemon.side.totalFainted < 5 && this.gameType !== 'doubles') || pokemon.side.totalFainted < 3) {
				return this.chainModify(0.5);
			}
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if ((pokemon.side.totalFainted < 5 && this.gameType !== 'doubles') || pokemon.side.totalFainted < 3) {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Now or Never",
		desc: "If this Pokemon isn't the last Pokemon of the team, its Attack and Speed are halved.",
		shortDesc: "If this Pokemon isn't the last Pokemon of the team, its Attack and Speed are halved.",
		rating: -1,
		num: -5,
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (this.effectState.protean) return;
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.protean = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.protean;
		},
		flags: {},
		name: "Protean",
		rating: 4,
		num: 168,
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type. This effect can only happen once per switch-in, and only if this Pokemon is not Terastallized.",
		shortDesc: "This Pokemon's type changes to the type of the move it is using. Once per switch-in.",
	},
	parentalbond: {
		inherit: true,
		desc: "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect Doom Desire, Dragon Darts, Dynamax Cannon, Endeavor, Explosion, Final Gambit, Fling, Future Sight, Ice Ball, Rollout, Self-Destruct, any multi-hit move, any move that has multiple targets, or any two-turn move.",
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage quartered.",
	},
};
