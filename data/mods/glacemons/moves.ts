export const Moves: { [moveid: string]: ModdedMoveData; } = {
	worryseed: {
		inherit: true,
		basePower: 80,
		category: "Physical",
		pp: 15,
		flags: { protect: 1, mirror: 1, allyanim: 1, metronome: 1 },
		onTryImmunity(target) {
			return;
		},
		onTryHit(target) {
			return;
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('insomnia');
			if (oldAbility && !pokemon.getAbility().flags['cantsuppress'] && pokemon.ability !== 'truant') {
				this.add('-ability', pokemon, 'Insomnia', '[from] move: Worry Seed');
				if (pokemon.status === 'slp') {
					pokemon.cureStatus();
				}
				return;
			}
			return oldAbility as false | null;
		},
	},
	milkdrink: {
		inherit: true,
		pp: 10,
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	roost: {
		inherit: true,
		pp: 10,
	},
	shoreup: {
		inherit: true,
		pp: 10,
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	lunarblessing: {
		inherit: true,
		pp: 10,
	},
	pebblestorm: {
		num: -1,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Pebble Storm",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
			this.add('-anim', source, "Hurricane", target);
		},
		onModifyPriority(priority, source, target, move) {
			if (this.field.isWeather('sandstorm')) {
				return priority + 1;
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
		desc: "If the current weather is Sandstorm, this move has its priority increased by 1.",
		shortDesc: "User on Sandstorm: +1 priority.",
	},
	salvestrike: {
		num: -2,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Salve Strike",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aromatherapy", source);
			this.add('-anim', source, "Double-Edge", target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) pokemon.cureStatus();;
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
		desc: "Heals the user's status if this move knocks out the target.",
		shortDesc: "Heals the user's status if this KOes the target.",
	},
	twister: {
		inherit: true,
		pp: 30,
		priority: 1,
		secondary: null,
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
	},
	flameburst: {
		inherit: true,
		basePower: 40,
		isNonstandard: null,
		pp: 30,
		priority: 1,
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
	},
	overvoltrail: {
		num: -3,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Overvolt Rail",
		pp: 10,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		recoil: [33, 100],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zap Cannon", source);
			this.add('-anim', source, "Zap Cannon", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil. Usually goes first.",
	},
	mentalgymnastics: {
		num: -4,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Mental Gymnastics",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		overrideOffensiveStat: 'spd',
		secondary: null,
		target: "normal",
		type: "Psychic",
		desc: "Damage is calculated using the user's Sp. Defense stat as its Sp. Attack, including stat stage changes. Other effects that modify the Sp. Attack stat are used as normal.",
		shortDesc: "Uses user's Sp. Def stat as Sp. Atk in damage calculation.",
	},
	railgun: {
		num: -5,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Railgun",
		pp: 15,
		priority: -3,
		flags: { protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, bullet: 1 },
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('railgun');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Railgun');
			},
			onHit(target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('par', target);
				}
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('beakblast')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('railgun');
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		desc: "If the user is hit by a contact move this turn before it can execute this move, the attacker is paralyzed.",
		shortDesc: "Paralyzes on contact with the user before it moves.",

		start: "  [POKEMON] started heating up its railgun!",
	},

	// Run It Back
	encore: {
		inherit: true,
		condition: {
			duration: 3,
            durationCallback(target, source, effect) {
                if (effect?.name === "Run It Back") {
                    return 1;
                }
                return 3;
            },
		},
	},

	// Solar Power section
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.ability === 'Solar Power') factor = 0.667;
			else {
				switch (pokemon.effectiveWeather()) {
					case 'sunnyday':
					case 'desolateland':
						factor = 0.667;
						break;
					case 'raindance':
					case 'primordialsea':
					case 'sandstorm':
					case 'hail':
					case 'snow':
						factor = 0.25;
						break;
				}
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.ability === 'Solar Power') factor = 0.667;
			else {
				switch (pokemon.effectiveWeather()) {
					case 'sunnyday':
					case 'desolateland':
						factor = 0.667;
						break;
					case 'raindance':
					case 'primordialsea':
					case 'sandstorm':
					case 'hail':
					case 'snow':
						factor = 0.25;
						break;
				}
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.ability === 'Solar Power') factor = 0.667;
			else {
				switch (pokemon.effectiveWeather()) {
					case 'sunnyday':
					case 'desolateland':
						factor = 0.667;
						break;
					case 'raindance':
					case 'primordialsea':
					case 'sandstorm':
					case 'hail':
					case 'snow':
						factor = 0.25;
						break;
				}
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	growth: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) || pokemon.ability === 'Solar Power') move.boosts = {atk: 2, spa: 2};
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.ability === 'Solar Power') move.type = 'Fire';
			else {
				switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					move.type = 'Fire';
					break;
				case 'raindance':
				case 'primordialsea':
					move.type = 'Water';
					break;
				case 'sandstorm':
					move.type = 'Rock';
					break;
				case 'hail':
				case 'snow':
					move.type = 'Ice';
					break;
				}}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.ability === 'Solar Power') move.basePower *= 2;
			else {
				switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					move.basePower *= 2;
					break;
				case 'raindance':
				case 'primordialsea':
					move.basePower *= 2;
					break;
				case 'sandstorm':
					move.basePower *= 2;
					break;
				case 'hail':
				case 'snow':
					move.basePower *= 2;
					break;
				}}
			this.debug('BP: ' + move.basePower);
		},
	},
	solarbeam: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather() || attacker.ability === 'Solar Power')) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather()) || attacker.ability === 'Solar Power') {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'];
			if (weakWeathers.includes(pokemon.effectiveWeather()) && pokemon.ability !== 'Solar Power') {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
};
