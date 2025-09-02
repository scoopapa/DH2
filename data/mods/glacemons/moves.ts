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
		basePower: 75,
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
      basePowerCallback(pokemon, target, move) {
      	if (pokemon.status && pokemon.status !== 'slp', 'frz') {
         	this.debug('BP boosted from status condition');
            return move.basePower * 1.5;
         }
         return move.basePower;
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
		basePower: 60,
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
		basePower: 90,
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
				this.damage(source.baseMaxhp / 16, source, target);
			}
		},
		desc: "Deals an additional 1/16th of the opponents health on a successful hit. Has a higher chance for a critical hit.",
		shortDesc: "1st hit: High critical hit ratio. 2nd hit: 1/16 max HP.",
	},
	psychocut: {
		inherit: true,
		onAfterMove(target, source, move) {
			if (target !== source && move.category !== 'Status' && move.totalDamage) {
				this.damage(source.baseMaxhp / 16, source, target);
			}
		},
		desc: "Deals an additional 1/16th of the opponents health on a successful hit. Has a higher chance for a critical hit.",
		shortDesc: "1st hit: High critical hit ratio. 2nd hit: 1/16 max HP.",
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
		rating: 4,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
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
			const targetAtk = target.storedStats.atk;
			const sourceAtk = source.storedStats.atk;
			if (sourceAtk >= targetAtk) {
				this.boost({ atk: 1, def: 2 }, source);
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
		desc: "The Pokémon with the highest Attack stat on the field gets a +1 stat boost to their Attack and +2 stat boost to their Defense. Stat boosts, items and abilities are not taken into account, fails if move was previously used in the same turn.",
		shortDesc: "Pokémon with highest Attack stat: +1 Atk & +2 Def.",
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
		rating: 4,
		onAfterHit(target, pokemon, move) {
			let success = false;
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const removeTarget = [
				'stealthrock', 'spikes', 'gmaxsteelsurge',
			];
			const removeAll = [
				'stealthrock', 'spikes', 'gmaxsteelsurge',
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
		shortDesc: "Free user from hazards/terrain/bind/Leech Seed.",
		isViable: true,
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
		basePower: 75,
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
				chance: 30,
				status: 'tox',
			},
		],
		desc: "Power is 1.5x if user moves before the target. Has a 30% chance to badly poison the target.",
		shortDesc: "1.5x power if user moves before target. 30% tox.",
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
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Hyper Fang damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Hyper Fang NOT boosted');
			return move.basePower;
		},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		pp: 20,
		desc: "Power is 1.5x if user moves before the target. Has a 10% chance to lower the target's Def by 1 stage.",
		shortDesc: "1.5x power if user moves before target. 10% -1 Def.",
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
		desc: "100% chance to lower user's Attack by 1.",
		shortdesc: "100% chance to lower user's Attack by 1.",
		onModifyMove(move, pokemon, target) {
			if (target && ['sunnyday', 'desolateland', 'snowscape', 'hail'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
		},
		secondary: {
			chance: 100,
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
		shortDesc: "Heals 1/3 damage; 2/3 in Sand. 10% chance -1 Spe.",
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	scythelimbs: {
		num: -14,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Scythe Limbs",
		pp: 5,
		priority: 0,
		multihit: 2,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (target.activeTurns) this.boost({atk: -1}, pokemon, pokemon, move);
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "X-Scissor", target);
		},
		shortDesc: "Hits twice; -1 Atk. Ignored if target switches.",
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
		shortDesc: "Hits 2-5 times. If >= +1 SpA, hits 4-5 times.",
	},
	// Slate 6
	burningjealousy: {
		inherit: true,
		basePower: 75,
		pp: 15,
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				let hasBoost = false;
				let i: BoostID;
				if (!target) return;
				for (i in target.boosts) {
					if (target.boosts[i] !== 0) hasBoost = true;
				}
				if (hasBoost) {
					target.trySetStatus('brn', source, move);
					this.boost({ spa: 2 }, source, source);
				}
			},
		},
		desc: "Has a 100% chance to burn the target and raise user's Sp. Attack by 2 stages if it had a stat stage raised this turn.",
		shortDesc: "If target has stat raise: 100% burn; user: +2 SpA.",
	},
	barbbarrage: {
		inherit: true,
		basePower: 25,
		pp: 20,
		multihit: [2, 5],
		onBasePower(basePower, pokemon, target) {
			return basePower;
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		desc: "Hits two to five times, and has a 10% to poison the target.",
		shortDesc: "Hits 2-5 times. 10% chance to poison per hit.",
	},
	infernalparade: {
		inherit: true,
		basePower: 25,
		pp: 20,
		multihit: [2, 5],
		basePowerCallback(pokemon, target, move) {
			return move.basePower;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1, defrost: 1},
		thawsTarget: true,
		desc: "Hits two to five times, and has a 10% to burn the target.",
		shortDesc: "Hits 2-5 times. 10% chance to burn per hit.",
	},
	eeriespell: {
		inherit: true,
		basePower: 25,
		pp: 20,
		rating: 4,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
		multihit: [2, 5],
		secondary: {
			chance: 10,
			status: 'par',
		},
		desc: "Hits two to five times, and has a 10% to paralyze the target.",
		shortDesc: "Hits 2-5 times. 10% chance to paralyze per hit.",
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
		basePower: 85,
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
		accuracy: 85,
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
		secondary: {
			chance: 100,
			volatileStatus: 'disable',
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		desc: "If the target has a disabled move, this move's BP is x1.5. After damage, disables the last move used by the target for 2 turns.",
		shortDesc: "Afflicts Disable for 2 turns; 1.5x BP vs. disabled foe.",
	},
	disable: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (effect?.name === "Millstone") {
					return 3;
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
			if (source.terastallized || source.hasItem('legendplate')) {
				this.attrLastMove('[anim] Tera Blast ' + source.teraType);
			}
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.terastallized || pokemon.hasItem('legendplate')) {
				move.type = pokemon.teraType;
			}
		},
		onModifyMove(move, pokemon) {
			if ((pokemon.terastallized || pokemon.hasItem('legendplate')) && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
			if ((pokemon.terastallized || pokemon.hasItem('legendplate')) && pokemon.teraType === 'Stellar') {
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
		shortDesc: "3 hits; can miss, but power rises. 20% chance -1 Def.",
	},
	tripleaxel: {
		inherit: true,
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		desc: "Can't miss in Snow. Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "3 hits; can miss, but power rises. Snow = no miss.",
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
		shortDesc: "3 hits; can miss, but power rises. Ignores sub/screens.",
	},
	tripledive: {
		inherit: true,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		desc: "Ignores Burn and power loss in Sun. Can't miss in Sun. Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "3 hits; can miss, but power rises. Ignores Sun drop.",
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
		basePower: 110,
		pp: 10,
		recoil: [33, 100],
		desc: "Has 1/3 recoil.",
		shortDesc: "Has 1/3 recoil.",
	},
	hammerarm: {
		inherit: true,
		basePower: 110,
		recoil: [33, 100],
		desc: "Has 1/3 recoil.",
		shortDesc: "Has 1/3 recoil.",
		self: { },
	},
	icehammer: {
		inherit: true,
		accuracy: 90,
		basePower: 110,
		recoil: [33, 100],
		desc: "Has 1/3 recoil.",
		shortDesc: "Has 1/3 recoil.",
	},
	chillingwater: {
		inherit: true,
		basePower: 80,
		pp: 15,
		rating: 4,
		secondary: {
			chance: 30,
			status: 'frz',
		},
		isViable: true,
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
		onHit(target, source) {
			const types = target.getTypes();
			var type1 = types[0];
			var type2;
			if (types.length == 2) type2 = types[1];
			if (source.hasType(type1) || !source.setType(type1)) return false;
			this.add('-start', source, 'typechange', type1);
			if (type2) {
				this.add('-start', source, 'typeadd', type2);
			}			
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
		basePower: 60,
		accuracy: 100,
		category: "Special",
		desc: "Priority +1, Sound move.",
		shortDesc: "Usually goes first. Sound move.",
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
		basePower: 80,
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
	// Slate 9
	dragonrend: {
		num: -27,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Dragon Rend",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		secondaries: [
			{
				chance: 30,
				volatileStatus: 'flinch',
			},
		],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
		shortDesc: "30% chance to flinch the target.",
	},
	imprison: { // WIP
		inherit: true,
		condition: {
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'move: Imprison');
			},
			onFoeDisableMove(pokemon) {
				for (const moveSlot of this.effectState.source.moveSlots) {
					if (moveSlot.id === 'struggle') continue;
					pokemon.disableMove(moveSlot.id, 'hidden');
				}
				pokemon.maybeDisabled = true;
			},
			onFoeBeforeMovePriority: 4,
			onFoeBeforeMove(attacker, defender, move, target) {
				if (move.id !== 'struggle' && this.effectState.source.hasMove(move.id) && !move.isZ && !move.isMax) {
					this.damage(Math.round(target.maxhp / 4), attacker, defender);
					this.add('cant', attacker, 'move: Imprison', move);
					return false;
				}
			},
		},
		shortDesc: "Target can't use setup or the user's moves, and they take 25% max hp when using Imprisoned moves",
		desc: "No foe can use any move known by the user, or any setup move. Target takes 25% max HP damage if an attempt is made to use Imprisoned move.",
	},
	powderbomb: {
		num: -28,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Powder Bomb",
		pp: 10,
		priority: 0,
		flags: {noassist: 1, failcopycat: 1, powder: 1, bullet: 1},
		volatileStatus: 'powderbomb',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Powder Bomb');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp /  4 * ((pokemon.hasType(['Fire']) ? 1 : 0)));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Powder Bomb');
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rage Powder", target);
		},
		onAfterHit(target, source) {
			this.actions.useMove("Powder", source);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'powderbomb',
		},
		target: "normal",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
		desc: "Covers the target in powder in addition to the damage dealt when it is used. If the Pokémon affected by Powder attempts to use a Fire-type move, they take damage equal to 25% of their maximum HP and cannot execute the move (PP is still consumed). If the target Pokémon is part Fire-type, inflicts 1/8 of the target's maximum HP as damage per turn. The Powder effect is removed when the affected Pokémon switches out.",
		shortDesc: "Covers the target in powder. If the Pokemon attempts to use a Fire move, they take 25% of their max HP.",
	},
	milfleur: {
		num: -29,
		accuracy: 90,
		basePower: 0,
		category: "Physical",
		name: "Mil Fleur",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, punch: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.hp > pokemon.maxhp * 2 / 3) {
				move.basePower = 20;
				move.multihit = [4, 5];
			} else if (pokemon.hp > pokemon.maxhp / 3) {
				move.basePower = 50;
				move.multihit = 2;
			}
			else {
				move.basePower = 120;
				move.multihit = 1;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fleur Cannon", target);
			this.add('-anim', source, "Mega Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
		shortDesc: "Amount of hits and power is determined by how much HP the user has left.",
	},
	// Slate 10
	skyuppercut: {
		inherit: true,
		basePower: 95,
		accuracy: 100,
		onAfterMove(target, source, move) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (target.side.getSideCondition(condition)) {
					this.damage(source.baseMaxhp / 8, source, target);
					return;
				}
			}
		},
		desc: "Inflicts 1/8 max HP if hazards are up.",
		shortDesc: "Inflicts 1/8 max HP if hazards are up.",
	},
	blackout: {
		num: -30,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Blackout",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -1,
				spd: -1,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Daze", target);
		},
		secondary: null,
		target: "normal",
		shortDesc: "Lowers the user's SpA and SpD by one afterward.",
		type: "Dark",
		contestType: "Tough",
	},
	hypnotichorror: {
		num: -31,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Hypnotic Horror",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -1,
				spd: -1,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hypnosis", target);
			this.add('-anim', source, "Psycho Boost", target);
		},
		secondary: null,
		target: "normal",
		shortDesc: "Lowers the user's SpA and SpD by one afterward.",
		type: "Psychic",
		contestType: "Tough",
	},
	syrupbomb: {
		num: -32,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Syrup Bomb",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		sideCondition: 'grasspledge',
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Bomb", target);
		},
		secondary: null,
		target: "normal",
		shortDesc: "Creates a Swamp on the opponent's side of the field.",
		type: "Grass",
		contestType: "Tough",
	},
	foulfuture: {
		num: -34,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Foul Future",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'foulfuture',
				source: source,
				moveData: {
					id: 'foulfuture',
					name: "Foul Future",
					accuracy: 100,
					basePower: 120,
					category: "Physical",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Poison',
				},
			});
			this.add('-start', source, 'move: Foul Future');
			return this.NOT_FAIL;
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
	},
	rainbowblast: {
		num: -35,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Rainbow Blast",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dazzling Gleam", target);
		},
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		shortDesc: "30% chance to lower target's SpA by 1.",
		type: "Fairy",
		contestType: "Cute",
	},
	rockclimb: {
		inherit: true,
		basePower: 120,
		pp: 5,
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		type: "Rock",
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "10% chance to confuse the target.",
	},
	bonfire: {
		num: -36,
		accuracy: 100,
		basePower: 60,
		category: 'Special',
		name: 'Bonfire',
		pp: 10,
		priority: 0,
		shortDesc: "+20 BP for each ally with this move.",
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
		},
		basePowerCallback(basePower, attacker, defender, move) {
			let bonfireBP = 40;
			for (const ally of attacker.side.pokemon) {
				for (const moveSlot of ally.moveSlots) {
					if (moveSlot.id === 'bonfire') {
						bonfireBP += 20;
					}
				}
			}
			return bonfireBP;
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Wheel", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	kiblast: {
		num: -37,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Ki Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: null,
		target: "normal",
		onAfterHit(target, source) {
			this.actions.useMove("Ki Blast 2", source);
		},
		type: "Fighting",
		shortDesc: "Damages user as much as it does to target.",
		contestType: "Cool",
	},
	kiblast2: {
		num: -38,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Ki Blast 2",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: null,
		target: "self",
		type: "Fighting",
		shortDesc: "Damages user as much as it does to target.",
		contestType: "Cool",
	},
	surprise: {
		num: -39,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Surprise!",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		shortDesc: "Placeholder for Surprise Bomb.",
		contestType: "Cool",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) {
				move.category = 'Special';
			}
		},
	},
	// Silver Powder
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || (pokemon.hasItem('silverpowder') && pokemon.hasType('Bug'))) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	toxicspikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || (pokemon.hasItem('silverpowder') && pokemon.hasType('Bug'))) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	spikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || (pokemon.hasItem('silverpowder') && pokemon.hasType('Bug'))) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || (pokemon.hasItem('silverpowder') && pokemon.hasType('Bug'))) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	gmaxsteelsurge: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || (pokemon.hasItem('silverpowder') && pokemon.hasType('Bug'))) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
};
