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
			}
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
		shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
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
		flags: {cantusetwice: 1, snatch: 1, metronome: 1},
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
				'stealthrock', 'spikes',
			];
			const removeAll = [
				'stealthrock', 'spikes',
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
				'stealthrock', 'spikes', 'gmaxsteelsurge',
			];
			const removeAll = [
				'stealthrock', 'spikes', 'gmaxsteelsurge'
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
		shortDesc: "Free user from Stealth Rock/Spikes/Caltrops/terrain/bind/Leech Seed.",
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
		shortDesc: "Hits as Ice, Electric, Fire. 10% for freeze/para/burn.",
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
		flags: { protect: 1, mirror: 1, allyanim: 1, metronome: 1, noparentalbond: 1 },
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
					move.secondaries.push({ status: item.fling.status });
				} else if (item.fling.volatileStatus) {
					move.secondaries.push({ volatileStatus: item.fling.volatileStatus });
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
	terastarstorm: {
		inherit: true,
		basePower: 100,
	},
	//Slate 5 starts here
	sandsearstorm: {
		inherit: true,
		basePower: 110,
		onModifyMove(move, pokemon, target) {
			if (target && ['sunnyday', 'desolateland', 'sandstorm'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
		},
	},
	wildboltstorm: {
		inherit: true,
		basePower: 110,
		category: "Physical",
		onModifyMove(move, pokemon, target) {
			if (target && ['raindance', 'primordialsea', 'snowscape', 'hail'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
		},
	},
	bleakwindstorm: {
		inherit: true,
		basePower: 110,
		onModifyMove(move, pokemon, target) {
			if (target && ['raindance', 'primordialsea', 'sandstorm'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
		},
	},
	springtidestorm: {
		inherit: true,
		basePower: 110,
		category: "Physical",
		pp: 10,
		onModifyMove(move, pokemon, target) {
			if (target && ['sunnyday', 'desolateland', 'snowscape', 'hail'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: -1,
				},
			},
		},
	},
	quicksanddrain: {
		num: -13,
		accuracy: 95,
		basePower: 85,
		category: "Physical",
		name: "Quicksand Drain",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1 },
		drain: [1, 3],
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
				case 'sandstorm':
					move.drain = [2, 3];
					break;
			}
		},
		//		if (this.field.isWeather('sandstorm')) {
		//			drain: [2,3]
		//		},
		//no clue if this is needed, so imma comment it out for now
		//			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
		//			if (!success) {
		//				this.add('-fail', pokemon, 'heal');
		//				return this.NOT_FAIL;
		//			}
		//			return success;
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scorching Sands", target);
		},
		shortDesc: "User recovers 33% of the damage dealt. Heals 2/3 of the damage dealt in Sandstorm. 10% chance to lower the target's Speed by 1.",
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	scythelimbs: {
		num: -14,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Scythe Limbs",
		pp: 5,
		priority: 0,
		multihit: 2,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onModifyMove(move, pokemon, defender) {
			if (!defender.activeTurns) {
				move.boosts = {atk: 0};
			}
		},
		self: {
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "X-Scissor", target);
		},
		shortDesc: "Hits Twice. This Pokémon’s attack is lowered by 1 per hit This effect is ignored if the opponent is switching out",
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	chickendance: {
		num: -15,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Chicken Dance",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, dance: 1, metronome: 1 },
		boosts: {
			spa: 1,
			spe: 1,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", source);
			this.add('-anim', source, "Roost", source);
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Cool",
		desc: "Raises the user's Sp. Attack and Speed by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk and Speed by 1.",
	},
	chakrabullets: {
		num: -16,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		name: "Chakra Bullets",
		pp: 10,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1, metronome: 1 },
		multihit: [2, 5],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aura Sphere", target);
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.boosts.spa > 0) {
				move.multihit = [4, 5];
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times in one turn. If user is at +1 Sp. Atk or more, hits 4-5 times.",
	},
	// Slate 6
	burningjealousy: {
		inherit: true,
		basePower: 75,
		pp: 15,
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (target?.statsRaisedThisTurn) {
					target.trySetStatus('brn', source, move);
					source.boost({ spa: 2 }, source, source);
				}
			},
		},
		desc: "Has a 100% chance to burn the target and raise user's Sp. Attack by 2 stages if it had a stat stage raised this turn.",
		shortDesc: "100% burns a target and raises Sp. Atk by 2 if target had a stat rise this turn.",
	},
	barbbarrage: {
		inherit: true,
		basePower: 25,
		pp: 20,
		multihit: [2, 5],
		//onBasePower(basePower, pokemon, target) {},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		desc: "Hits two to five times, and has a 10% to poison the target.",
		shortDesc: "Hits 2-5 times in one turn. 10% chance to poison per hit.",
	},
	infernalparade: {
		inherit: true,
		basePower: 25,
		pp: 20,
		multihit: [2, 5],
		//basePowerCallback(pokemon, target, move) {},
		//onBasePower(basePower, pokemon, target) {},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1, defrost: 1},
		thawsTarget: true,
		desc: "Hits two to five times, and has a 10% to burn the target.",
		shortDesc: "Hits 2-5 times in one turn. 10% chance to burn per hit.",
	},
	eeriespell: {
		inherit: true,
		basePower: 25,
		pp: 20,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
		multihit: [2, 5],
		secondary: {
			chance: 10,
			status: 'par',
		},
		desc: "Hits two to five times, and has a 10% to paralyze the target.",
		shortDesc: "Hits 2-5 times in one turn. 10% chance to paralyze per hit.",
	},
	sleeptalk: {
		inherit: true,
		onHit(pokemon) {
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				const move = this.dex.moves.get(moveid);
				if (moveid && !move.flags['nosleeptalk'] && !move.flags['charge']) {
					moves.push(moveid);
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) return false;
			this.actions.useMove(randomMove, pokemon);
		},
		desc: "(Can now select Rest) One of the user's known moves, besides this move, is selected for use at random. Fails if the user is not asleep. The selected move does not have PP deducted from it, and can currently have 0 PP. This move cannot select Assist, Beak Blast, Belch, Bide, Blazing Torque, Celebrate, Chatter, Combat Torque, Copycat, Dynamax Cannon, Focus Punch, Hold Hands, Magical Torque, Me First, Metronome, Mimic, Mirror Move, Nature Power, Noxious Torque, Shell Trap, Sketch, Sleep Talk, Struggle, Uproar, Wicked Torque, or any two-turn move.",
		shortDesc: "User must be asleep. Uses another known move.",
	},
	rest: {
		inherit: true,
		pp: 10,
		onTry(pokemon) {
			if (pokemon.hp < pokemon.maxhp) return;
			this.add('-fail', pokemon);
			return null;
		},
		onHit(target, source, move) {
			if (target.status !== 'slp') {
				if (!target.setStatus('slp', source, move)) return;
			} else {
				this.add('-status', target, 'slp', '[from] move: Rest');
			}
			target.statusState.time = 3;
			target.statusState.startTime = 3;
			target.statusState.source = target;
			this.heal(target.maxhp);
		},
		secondary: null,
	},
	zephyrblade: {
		num: -17,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Zephyr Blade",
		pp: 15,
		priority: 0,
		flags: {slicing: 1, contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Air Slash", target);
			this.add('-anim', source, "Slash", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
		desc: "High critical ratio.",
		shortDesc: "High critical ratio.",
	},
	frostnip: {
		num: -18,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Frostnip",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, snatch: 1},
		status: 'frz',
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {spa: 1}},
		contestType: "Beautiful",
		desc: "Inflicts Frostbite to the target.",
		shortDesc: "Inflicts Frostbite to the target.",
	},
	millstone: {
		num: -19,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Millstone",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stone Axe", target);
		},
		onBasePower(basePower, source, target, move) {
			if (target.volatiles['disable']) {
				return this.chainModify(1.5);
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (target && !target.volatiles['disable']) {
				target.addVolatile('disable', source, move);
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		desc: "If the target has a disabled move, this move's BP is x1.5. After damage, disables the last move used by the target for 2 turns.",
		shortDesc: "Disables target's last move for 2 turns; 1.5x BP if Disable is active.",
	},
	disable: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (effect?.name === "Millstone") {
					return 2;
				}
				return 5;
			},
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				// The target hasn't taken its turn, or Cursed Body activated and the move was not used through Dancer or Instruct
				if (
					this.queue.willMove(pokemon) ||
					(pokemon === this.activePokemon && this.activeMove && !this.activeMove.isExternal)
				) {
					this.effectState.duration--;
				}
				if (!pokemon.lastMove) {
					this.debug(`Pokemon hasn't moved yet`);
					return false;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === pokemon.lastMove.id) {
						if (!moveSlot.pp) {
							this.debug('Move out of PP');
							return false;
						}
					}
				}
				if (effect.effectType === 'Ability') {
					this.add('-start', pokemon, 'Disable', pokemon.lastMove.name, '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Disable', pokemon.lastMove.name);
				}
				this.effectState.move = pokemon.lastMove.id;
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Disable');
			},
			onBeforeMovePriority: 7,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && move.id === this.effectState.move) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	terablast: {
		inherit: true,
		onPrepareHit(target, source, move) {
			if (source.hasItem('legendplate')) {
				this.attrLastMove('[anim] Tera Blast ' + source.teraType);
			}
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.hasItem('legendplate')) {
				move.type = pokemon.teraType;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.hasItem('legendplate') && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
			if (pokemon.hasItem('legendplate') && pokemon.teraType === 'Stellar') {
				move.self = {boosts: {atk: -1, spa: -1}};
			}
		},
	},
	bondslicingshuriken: {
		num: -20,
		accuracy: true,
		basePower: 60,
		category: "Special",
		name: "Bond Slicing Shuriken",
		pp: 1,
		priority: 0,
		flags: {slicing: 1},
		isZ: "greniniumz",
		critRatio: 2,
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
		desc: "High critical ratio. Hits 3 times.",
		shortDesc: "High critical ratio. Hits 3 times.",
	},
	// Slate 7
	triplekick: {
		inherit: true,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		secondaries: [
			{
				chance: 20,
				boosts: {
					def: -1,
				},
			}, 
		],
		desc: "20% chance to lower Defense by 1 stage. Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "20% chance to lower Def by 1. Hits 3 times. Each hit can miss, but power rises.",
	},
	tripleaxel: {
		inherit: true,
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		desc: "Can't miss in Snow. Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises. Snow = No miss.",
	},
	triplearrows: {
		inherit: true,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		onModifyMove(move) {
			move.infiltrates = true;
		},
		flags: {protect: 1, mirror: 1, bypasssub: 1, metronome: 1},
		critRatio: 1,
		multihit: 3,
		secondaries: null,
		type: "Grass",
		desc: "Ignores Screens, Substitutes and Burn. Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
	},
	tripledive: {
		inherit: true,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		desc: "Ignores Burn and power loss in Sun. Can't miss in Sun. Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises. Ignores Sun.",
	},
	brainbuster: {
		num: -21,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Brain Buster",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zen Headbutt", target);
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		desc: "Lowers the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
	},
	dragonhammer: {
		inherit: true,
		accuracy: 90,
		basePower: 100,
		pp: 10,
		self: {
			boosts: {
				atk: -1,
			},
		},
		desc: "Lowers the user's Attack by 1 stage.",
		shortDesc: "Lowers the user's Atk by 1.",
	},
	hammerarm: {
		inherit: true,
		self: {
			boosts: {
				atk: -1,
			},
		},
		desc: "Lowers the user's Attack by 1 stage.",
		shortDesc: "Lowers the user's Atk by 1.",
	},
	icehammer: {
		inherit: true,
		accuracy: 90,
		basePower: 100,
		self: {
			boosts: {
				atk: -1,
			},
		},
		desc: "Lowers the user's Attack by 1 stage.",
		shortDesc: "Lowers the user's Atk by 1.",
	},
	chillingwater: {
		inherit: true,
		basePower: 80,
		pp: 15,
		secondary: {
			chance: 30,
			status: 'frz',
		},
		desc: "Has a 30% chance to inflict Frostbite to the target.",
		shortDesc: "30% chance to inflict Frostbite to the target.",
	},
	breezeburn: {
		num: -22,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Breeze Burn",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Burn", target);
		},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		desc: "Has a 30% chance to inflict Frostbite to the target.",
		shortDesc: "30% chance to inflict Frostbite to the target.",
	},
	breezeshock: {
		num: -23,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Breeze Shock",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Freeze Shock", target);
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% chance to paralyze the target.",
	},
	synchronoise: {
		inherit: true,
		pp: 5,
		onTryImmunity(target, source) {},
		onHit(target) {
			const type = target.getTypes().join();
			if (target.hasType(type) || !target.setType(type)) return false;
			this.add('-start', target, 'typechange', type);
		},
		shortDesc: "Changes user's type to that of the target after hit.",
	},
	caltrops: {
		num: -24,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Caltrops",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, mirror: 1, metronome: 1},
		sideCondition: 'gmaxsteelsurge',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "G-Max Steelsurge", target);
		},
		secondary: null,
		target: "foeSide",
		type: "Steel",
		contestType: "Clever",
		desc: "Sets up sharp steel on the opposing side.",
		shortDesc: "Sets up sharp steel on the opposing side.",
	},
	virulentblast: {
		num: -25,
		accuracy: 90,
		basePower: 110,
		category: "Special",
		name: "Virulent Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Wave", target);
		},
		secondary: {
			chance: 20,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
		desc: "Has a 20% chance to badly poison the target.",
		shortDesc: "20% chance to badly poison the target.",
	},
	sonicboom: {
		inherit: true,
		damage: null,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		desc: "Priority +1, Sound move.",
		shortDesc: "Usually goes first. Sound Move.",
		name: "Sonic Boom",
		priority: 1,
		isNonstandard: null,
		flags: { sound: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	swarming: {
		num: -26,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Swarming",
		shortDesc: "Lowers the user's and the target's SpD by one stage.",
		desc: "Lowers the user's and the target's SpD by 1 stage.",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spd: -1,
			},
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bug Buzz", target);
		},
		target: "normal",
		type: "Bug",
		contestType: "Smart",
	},
	octazooka: {
		inherit: true,
		accuracy: 100,
		basePower: 70,
		pp: 20,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1, pulse: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Sp. Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Sp. Def by 1.",
	},
	paraboliccharge: {
		inherit: true,
		basePower: 75,
		pp: 10,
	},
	// Rulebook Embargo
	embargo: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (effect?.name === "Rulebook") {
					return 2;
				}
				return 5;
			},
			onStart(pokemon) {
				this.add('-start', pokemon, 'Embargo');
				this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 21,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Embargo');
			},
		},
	},
};
