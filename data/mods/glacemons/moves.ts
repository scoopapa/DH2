export const Moves: { [moveid: string]: ModdedMoveData; } = {
	worryseed: {
		inherit: true,
		basePower: 90,
		category: "Special",
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
	rest: {
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
		basePower: 85,
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
		onBasePower(basePower, pokemon) {
			if (pokemon.status && pokemon.status !== 'slp', 'frz') {
				return this.chainModify(1.5);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
		desc: "1.5x power if user is statused; heals status.",
		shortDesc: "1.5x power if user is statused; heals status.",
	},
	twister: {
		inherit: true,
		basePower: 60,
		viable: true,
		pp: 30,
		priority: 1,
		secondary: null,
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
	},
	flameburst: {
		inherit: true,
		viable: true,
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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", source);
			this.add('-anim', source, "Psychic Noise", target);
		},
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

		start: "  [POKEMON] started charging up its railgun!",
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
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveIndex = target.moves.indexOf(move.id);
				if (move.isZ || move.flags['failencore'] || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				if (!this.queue.willMove(target)) {
					this.effectState.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectState.move) return this.effectState.move;
			},
			onResidualOrder: 16,
			onResidual(target) {
				if (!target.moves.includes(this.effectState.move) ||
					target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},

	// Solar Power section
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('solarpower')) factor = 0.667;
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
			if (pokemon.hasAbility('solarpower')) factor = 0.667;
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
			if (pokemon.hasAbility('solarpower')) factor = 0.667;
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
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) || pokemon.hasAbility('solarpower')) move.boosts = { atk: 2, spa: 2 };
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.hasAbility('solarpower')) move.type = 'Fire';
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
				}
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.hasAbility('solarpower')) move.basePower *= 2;
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
				}
			}
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
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather()) || attacker.hasAbility('solarpower')) {
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
			if (weakWeathers.includes(pokemon.effectiveWeather()) && !pokemon.hasAbility('solarpower')) {
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
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather()) || attacker.hasAbility('solarpower')) {
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
			if (weakWeathers.includes(pokemon.effectiveWeather()) && !pokemon.hasAbility('solarpower')) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},

	nightslash: {
		inherit: true,
		onAfterMove(target, source, move) {
			if (target !== source && move.category !== 'Status' && move.totalDamage) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		desc: "Deals an additional 1/8th of the opponents health on a successful hit. Has a higher chance for a critical hit.",
		shortDesc: "1st hit: High critical hit ratio. 2nd hit: 1/8 max HP.",
	},
	psychocut: {
		inherit: true,
		onAfterMove(target, source, move) {
			if (target !== source && move.category !== 'Status' && move.totalDamage) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		desc: "Deals an additional 1/8th of the opponents health on a successful hit. Has a higher chance for a critical hit.",
		shortDesc: "1st hit: High critical hit ratio. 2nd hit: 1/8 max HP.",
	},
	selfrepairing: {
		num: -6,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Self-Repairing",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1, bypasssub: 1 },
		heal: [1, 3],
		self: {
			volatileStatus: 'selfrepairing',
		},
		condition: {
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Self-Repairing');
			},
			onAfterMoveSecondarySelfPriority: -1,
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (move.category === 'Status' && move.id !== 'selfrepairing') {
					this.heal(pokemon.baseMaxhp / 4);
				}
			},
		},
		onBeforeMovePriority: 100,
		onBeforeMove(pokemon) {
			this.debug('removing Self Repairing before attack');
			pokemon.removeVolatile('selfrepairing');
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shift Gear", source);
			this.add('-anim', source, "Recover", source);
		},
		rating: 3,
		desc: "Heals 33% of HP. When this Pokemon uses a status move, this Pokemon heals 25% of its max HP.",
		shortDesc: "Heals 1/3 max HP; 1/4 extra after status move.",
		secondary: null,
		target: "allies",
		type: "Steel",
	},
	spectralthief: {
		inherit: true,
		basePower: 60,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		isViable: true,
	},
	gravelgrater: {
		num: -7,
		accuracy: 90,
		basePower: 30,
		category: "Physical",
		shortDesc: "Hits twice. Lowers the target's Def after each hit.",
		isViable: true,
		name: "Gravel Grater",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ancient Power", target);
			this.add('-anim', source, "Gear Grind", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
		maxMove: { basePower: 100 },
		contestType: "Cool",
	},
	flexoff: {
		num: -8,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Flex Off",
		pp: 15,
		priority: 0,
		flags: { snatch: 1, metronome: 1 },
		onTryHit(target, source, move) {
			if (target.lastMove && target.lastMove.id === 'flexoff') {
				return false;
			}
			const targetAtk = target.storedStats.atk;
			const sourceAtk = source.storedStats.atk;
			if (sourceAtk >= targetAtk) {
				this.boost({ atk: 2, def: 2 }, source, source);
			}
			else if (sourceAtk < targetAtk) {
				this.boost({ atk: 2, def: 2 }, target, source);
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bulk Up", source);
			this.add('-anim', target, "Bulk Up", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: { boost: { atk: 1 } },
		contestType: "Cool",
		desc: "The Pokémon with the highest Attack stat on the field gets a +2 stat boost to their Attack and Defense. Stat boosts, items and abilities are not taken into account, fails if move was previously used in the same turn.",
		shortDesc: "Pokémon with highest Attack stat: +2 Atk, +2 Def.",
	},
	ionsaw: {
		num: -9,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		shortDesc: "Hits three times. 10% to paralyze the target.",
		isViable: true,
		name: "Ion Saw",
		pp: 10,
		priority: 0,
		flags: { slicing: 1, protect: 1, mirror: 1 },
		multihit: 3,
		secondary: {
			chance: 10,
			status: 'par',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ion Deluge", source);
			this.add('-anim', source, "Ion Deluge", source);
			this.add('-anim', source, "Ion Deluge", source);
			this.add('-anim', source, "Slash", target);
			this.add('-anim', source, "Slash", target);
			this.add('-anim', source, "Slash", target);
		},
		target: "normal",
		type: "Electric",
		maxMove: { basePower: 100 },
		contestType: "Cool",
	},
	landswrath: {
		inherit: true,
		basePower: 70,
		onAfterHit(target, pokemon, move) {
			let success = false;
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const removeTarget = [
				'stealthrock',
			];
			const removeAll = [
				'stealthrock',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Land\'s Wrath', '[of] ' + pokemon);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (pokemon.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(sideCondition).name, '[from] move: Land\'s Wrath', '[of] ' + pokemon);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			let success = false;
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const removeTarget = [
				'stealthrock',
			];
			const removeAll = [
				'stealthrock',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Land\'s Wrath', '[of] ' + pokemon);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (pokemon.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(sideCondition).name, '[from] move: Land\'s Wrath', '[of] ' + pokemon);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		shortDesc: "Free user from hazards/terrain/bind/Leech Seed.",
	},
	// Slate 4
	triattack: {
		inherit: true,
		basePower: 30,
		pp: 10,
		multihit: 3,
		onEffectiveness(typeMod, target, type, move) { 
			if (move.hit > 3) return;
			var hitEffectiveness;
			var immunity = 0;
			switch (move.hit) {
				case 1:
					hitEffectiveness = this.dex.getEffectiveness('Ice', type);
					if (!this.dex.getImmunity('Ice', target)) immunity = -0.5;
					break;
				case 2:
					hitEffectiveness = this.dex.getEffectiveness('Fire', type);
					if (!this.dex.getImmunity('Fire', target)) immunity = -0.5;
					break;
				case 3:
					hitEffectiveness = this.dex.getEffectiveness('Electric', type);
					if (!this.dex.getImmunity('Electric', target)) immunity = -0.5;
					break;
			}
			return hitEffectiveness + immunity;
		},
		onAfterHit(target, source, move) {
			switch (move.hit) {
				case 1:
					this.add('-anim', target, "Flamethrower", target);
					break;
				case 2: 
					this.add('-anim', target, "Electro Ball", target);
					break;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tri Attack", target);
			this.add('-anim', target, "Ice Beam", target);
		},
		secondary: {
			chance: 10,
			onHit(target, source, move) {
				switch (move.hit) {
					case 1:
						target.trySetStatus('frz', source);
						break;
					case 2: 
						target.trySetStatus('brn', source);
						break;
					case 3: 
						target.trySetStatus('par', source);
						break;
				}
			},
		},
		shortDesc: "Hits as Ice, Electric, Fire. 10% for para/burn/freeze.",
	},
	squall: {
		num: -11,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Squall",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, wind: 1 },
		onBasePower(basePower, pokemon, target) {
			const boostWeathers = ['sandstorm', 'hail', 'snow'];
			if (boostWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('boostfrom weather');
				return this.chainModify(1.5);
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "1.5x power if used under Snow or Sandstorm.",
	},
	petroleumblast: {
		num: -12,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Petroleum Blast",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		volatileStatus: 'tarshot',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tar Shot", source);
			this.add('-anim', source, "Dragon Pulse", target);
			this.add('-anim', source, "Tar Shot", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Beautiful",
		shortDesc: "Applies Tar Shot to the target. Hits both foes.",
	},
	firefang: {
		inherit: true,
		pp: 20,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Fire Fang damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Fire Fang NOT boosted');
			return move.basePower;
		},
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			},
		],
		desc: "Power is 1.5x if user moves before the target. Has a 10% chance to burn the target.",
		shortDesc: "1.5x power if user moves before target. 10% burn.",
	},
	thunderfang: {
		inherit: true,
		pp: 20,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Thunder Fang damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Thunder Fang NOT boosted');
			return move.basePower;
		},
		secondaries: [
			{
				chance: 10,
				status: 'par',
			},
		],
		desc: "Power is 1.5x if user moves before the target. Has a 10% chance to paralyze the target.",
		shortDesc: "1.5x power if user moves before target. 10% para.",
	},
	icefang: {
		inherit: true,
		pp: 20,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Ice Fang damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Ice Fang NOT boosted');
			return move.basePower;
		},
		secondaries: [
			{
				chance: 10,
				status: 'frz',
			},
		],
		desc: "Power is 1.5x if user moves before the target. Has a 10% chance to freeze the target.",
		shortDesc: "1.5x power if user moves before target. 10% freeze.",
	},
	poisonfang: {
		inherit: true,
		accuracy: 95,
		basePower: 65,
		pp: 20,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Poison Fang damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Poison Fang NOT boosted');
			return move.basePower;
		},
		secondaries: [
			{
				chance: 10,
				status: 'psn',
			},
		],
		desc: "Power is 1.5x if user moves before the target. Has a 10% chance to poison the target.",
		shortDesc: "1.5x power if user moves before target. 10% poison.",
	},
	fishiousrend: {
		inherit: true,
		accuracy: 95,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Fishious Rend damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Fishious Rend NOT boosted');
			return move.basePower;
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		pp: 20,
		desc: "Power is 1.5x if user moves before the target. Has a 30% chance to lower the target's Speed by 1 stage.",
		shortDesc: "1.5x power if user moves before target. 30% -1 Spe.",
	},
	hyperfang: {
		inherit: true,
		type: "Fighting",
		accuracy: 95,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Hyper Fang damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Hyper Fang NOT boosted');
			return move.basePower;
		},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		pp: 20,
		desc: "Power is 1.5x if user moves before the target. Has a 30% chance to lower the target's Atk by 1 stage.",
		shortDesc: "1.5x power if user moves before target. 30% -1 Atk.",
	},
	// Handling Cursed Branch
	fling: {
		num: 374,
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		name: "Fling",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, allyanim: 1, metronome: 1, noparentalbond: 1},
		onPrepareHit(target, source, move) {
			if (source.ignoringItem()) return false;
			const item = source.getItem();
			if (!this.singleEvent('TakeItem', item, source.itemState, source, source, move, item)) return false;
			if (!item.fling) return false;
			move.basePower = item.fling.basePower;
			this.debug('BP: ' + move.basePower);
			if (item.isBerry) {
				move.onHit = function (foe) {
					if (this.singleEvent('Eat', item, null, foe, null, null)) {
						this.runEvent('EatItem', foe, null, null, item);
						if (item.id === 'leppaberry') foe.staleness = 'external';
					}
					if (item.onEat) foe.ateBerry = true;
				};
			} else if (item.fling.effect) {
				move.onHit = item.fling.effect;
			} else {
				if (!move.secondaries) move.secondaries = [];
				if (item.fling.status) {
					move.secondaries.push({status: item.fling.status});
				} else if (item.fling.volatileStatus) {
					move.secondaries.push({volatileStatus: item.fling.volatileStatus});
				}
			}
			source.addVolatile('fling');
		},
		condition: {
			onUpdate(pokemon) {
				const item = pokemon.getItem();
				pokemon.setItem('');
				pokemon.lastItem = item.id;
				pokemon.usedItemThisTurn = true;
				this.add('-enditem', pokemon, item.name, '[from] move: Fling');
				this.runEvent('AfterUseItem', pokemon, null, null, item);
				pokemon.removeVolatile('fling');
			},
		},
		onHit(target, source) {
			const item = source.getItem();
			if (item.id === 'cursedbranch' && target.addType('Grass')) this.add('-start', target, 'typeadd', 'Grass', '[from] item: Cursed Branch');
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cute",
	},
};
