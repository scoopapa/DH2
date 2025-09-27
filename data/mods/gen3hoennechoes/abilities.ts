export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	cutecharm: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					source.addVolatile('attract', target);
				}
			}
		},
	},
	dryskin: {
		inherit: true,
		gen: 3,
	},
	effectspore: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact'] && !source.status) {
				const r = this.random(300);
				if (r < 10) {
					source.setStatus('slp', target);
				} else if (r < 20) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
	},
	flamebody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					source.trySetStatus('brn', target);
				}
			}
		},
	},
	flashfire: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (move.id === 'willowisp' && (target.hasType('Fire') || target.status || target.volatiles['substitute'])) {
					return;
				}
				if (target.status === 'frz') {
					return;
				}
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
	},
	forecast: {
		inherit: true,
		flags: {},
	},
	hustle: {
		inherit: true,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			const physicalTypes = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel'];
			if (physicalTypes.includes(move.type) && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
	},
	hydration: {
		inherit: true,
		gen: 3,
	},
	icebody: {
		inherit: true,
		gen: 3,
	},
	intimidate: {
		inherit: true,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!target.volatiles['substitute']) {
					activated = true;
					break;
				}
			}

			if (!activated) {
				this.hint("In Gen 3, Intimidate does not activate if every target has a Substitute.", false, pokemon.side);
				return;
			}
			this.add('-ability', pokemon, 'Intimidate', 'boost');

			for (const target of pokemon.adjacentFoes()) {
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ atk: -1 }, target, pokemon, null, true);
				}
			}
		},
	},
	leafguard: {
		inherit: true,
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.status && ['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('leafguard');
				this.add('-activate', pokemon, 'ability: Leaf Guard');
				pokemon.cureStatus();
			}
		},
		onSetStatus() {},
		onTryAddVolatile() {},
		desc: "This Pokemon has its non-volatile status condition cured at the end of each turn if Sunny Day is active. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
		shortDesc: "This Pokemon has its status cured at the end of each turn if Sunny Day is active.",
		gen: 3,
	},
	lightningrod: {
		onFoeRedirectTarget(target, source, source2, move) {
			// don't count Hidden Power as Electric-type
			if (this.dex.moves.get(move.id).type !== 'Electric') return;
			if (this.validTarget(this.effectState.target, source, move.target)) {
				return this.effectState.target;
			}
		},
		flags: { breakable: 1 },
		name: "Lightning Rod",
		rating: 0,
		num: 32,
	},
	marinepower: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: {},
		name: "Marine Power",
		desc: "If Rain Dance is active, this Pokemon's Special Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Rain Dance is active, this Pokemon's Sp. Atk is 1.5x; loses 1/8 max HP per turn.",
		rating: 2,
		gen: 3,
		num: 999,
	},
	minus: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			for (const active of this.getAllActive()) {
				if (!active.fainted && active.hasAbility('plus')) {
					return this.chainModify(1.5);
				}
			}
		},
	},
	plus: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			for (const active of this.getAllActive()) {
				if (!active.fainted && active.hasAbility('minus')) {
					return this.chainModify(1.5);
				}
			}
		},
	},
	poisonpoint: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					source.trySetStatus('psn', target);
				}
			}
		},
	},
	pressure: {
		inherit: true,
		onStart(pokemon) {
			this.addSplit(pokemon.side.id, ['-ability', pokemon, 'Pressure', '[silent]']);
		},
	},
	protosynthesis: {
		inherit: true,
		gen: 3,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				//this.effectState.bestStat = pokemon.getBestStat(false, true);
				//dragged code out of getBestStat to remove Speed
				let statName: StatIDExceptHP = 'atk';
				let bestStat = 0;
				const stats: StatIDExceptHP[] = ['atk', 'def', 'spa', 'spd'];
				for (const i of stats) {
					if (pokemon.getStat(i, false, true) > bestStat) {
						statName = i;
						bestStat = pokemon.getStat(i, false, true);
					}
				}
				this.effectState.bestStat = statName;
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([4915, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([4915, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([4915, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([4915, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		desc: "If Sunny Day is active or this Pokemon uses a held Booster Energy, this Pokemon's highest non-Speed stat is multiplied by 1.2. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, and Special Defense are prioritized in that order. If this effect was started by Sunny Day, a held Booster Energy will not activate and the effect ends when Sunny Day is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Sunny Day active: highest non-Speed stat is 1.2x.",
	},
	raindish: {
		inherit: true,
		onWeather() {},
		onResidualOrder: 10,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
	},
	roughskin: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				this.damage(source.baseMaxhp / 16, source, target);
			}
		},
	},
	shadowtag: {
		inherit: true,
		onFoeTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
	},
	snowwarning: {
		inherit: true,
		isNonstandard: null,
		gen: 3,
	},
	solarpower: {
		inherit: true,
		gen: 3,
	},
	static: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					source.trySetStatus('par', target);
				}
			}
		},
	},
	superluck: {
		inherit: true,
		isNonstandard: null,
		gen: 3,
	},
	trace: {
		inherit: true,
		onUpdate() {},
		onStart(pokemon) {
			const target = pokemon.side.randomFoe();
			if (!target || target.fainted) return;
			const ability = target.getAbility();
			if (pokemon.setAbility(ability)) {
				this.add('-ability', pokemon, ability, '[from] ability: Trace', `[of] ${target}`);
			}
		},
		flags: {},
	},
	truant: {
		inherit: true,
		onStart() {},
		onSwitchIn(pokemon) {
			pokemon.truantTurn = this.turn !== 0;
		},
		onBeforeMove(pokemon) {
			if (pokemon.truantTurn) {
				this.add('cant', pokemon, 'ability: Truant');
				return false;
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			pokemon.truantTurn = !pokemon.truantTurn;
		},
	},
	voltabsorb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric' && move.id !== 'thunderwave') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volt Absorb');
				}
				return null;
			}
		},
	},
	bonfire: {
		onSourceModifyAccuracyPriority: -1,
		//idk what that does
		onSourceModifyAccuracy(accuracy, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (typeof accuracy !== 'number') return;
				return 100;
			}
		},
		flags: {},
		name: "Bonfire",
		desc: "If Sunny Day is active, this Pokemon's moves will have an accuracy of 100.",
		shortDesc: "User's moves are accurate in sun.",
		rating: 2,
		gen: 3,
		num: 998,
	}
};