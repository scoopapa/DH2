export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// MM1 signature moves.

	firestorm: {
		shortDesc: "Ignores the target's Ability.",
		desc: "Ignores the target's Ability.",
		num: -1034,
		accuracy: 90, basePower: 100, category: "Special", name: "Fire Storm", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Flame Wheel", target);
			this.add('-anim', pokemon, "Pyro Ball", target);
		},
		ignoreAbility: true,
		target: "normal",
		type: "Fire",
	},
	hyperbomb: {
		shortDesc: "Deals 0, 90, 120, or 150 power at random. Super effective against Rock types. Bomb/Ball move.",
		num: -1035,
		accuracy: 85, basePower: 0, category: "Special", name: "Hyper Bomb", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Egg Bomb", target);
			this.add('-anim', pokemon, "Explosion", target);
		},
		onModifyMove(move) {
			const r = this.random(10);
			if (r < 2) {
				move.basePower = 0;
				this.add('-message', 'Hyper Bomb: DUD! (0 power)');
			} else if (r < 6) {
				move.basePower = 90;
				this.add('-message', 'Hyper Bomb: DECENT! (90 power)');
			} else if (r < 9) {
				move.basePower = 120;
				this.add('-message', 'Hyper Bomb: BIG! (120 power)');
			} else {
				move.basePower = 150;
				this.add('-message', 'Hyper Bomb: MASSIVE! (150 power)');
			}
		},
		onEffectiveness(typeMod, target, type) {
			if (type === "Rock") return 1;
		},
		target: "normal",
		type: "Normal",
	},
	iceslasher: {
		shortDesc: "Increased critical-hit chance. Always scores a critical hit in Snow. Slicing move.",
		num: -1036,
		accuracy: 100, basePower: 80, category: "Special", name: "Ice Slasher", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Shard", target);
		},
		critRatio: 2,
		onModifyMove(move) {
			if (this.field.isWeather("snow")) move.willCrit = true;
		},
		target: "normal",
		type: "Ice",
	},
	megabuster: {
		shortDesc: "Hits three times. While Charge is active, hits once at 120 power with +1 priority, then removes Charge.",
		num: -1037,
		accuracy: 100, basePower: 35, category: "Special", name: "Mega Buster", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Flash Cannon", target);
			this.add('-anim', pokemon, "Hyper Beam", target);
		},
		multihit: 3,
		onModifyMove(move, source) {
			if (source.volatiles["charge"]) {
				move.basePower = 120;
				move.multihit = 1;
			}
		},
		onModifyPriority(priority, source) {
			if (source.volatiles["charge"]) return priority + 1;
		},
		onAfterMove(source, target, move) {
			if (move.id === "megabuster") source.removeVolatile("charge");
		},
		target: "normal",
		type: "Normal",
	},
	rollingcutter: {
		shortDesc: "Has no type resistances, though Ghost types remain immune. Increased critical-hit chance. Slicing move.",
		num: -1038,
		accuracy: 100, basePower: 70, category: "Physical", name: "Rolling Cutter", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Razor Leaf", target);
			this.add('-anim', pokemon, "X-Scissor", target);
		},
		critRatio: 2,
		onEffectiveness(typeMod, target, type) {
			if (type !== "Ghost" && typeMod < 0) return 0;
		},
		target: "normal",
		type: "Normal",
	},
	superarm: {
		shortDesc: "Raises the user's Attack by 3 stages and gives it a Hard Stone. Fails if the user is holding an item.",
		num: -1039,
		accuracy: true, basePower: 0, category: "Status", name: "Super Arm", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bulk Up", target);
			this.add('-anim', pokemon, "Wide Guard", target);
		},
		target: "self",
		type: "Normal",
		onHit(pokemon) {
			if (pokemon.item) return false;
			const item = this.dex.items.get("hardstone");
			if (!item.exists || !pokemon.setItem(item)) return false;
			this.boost({atk: 3}, pokemon, pokemon);
		},
	},
	thunderbeam: {
		shortDesc: "Calculates damage using the target's Defense instead of its Special Defense.",
		num: -1040,
		accuracy: 100, basePower: 90, category: "Special", name: "Thunder Beam", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thunder Shock", target);
			this.add('-anim', pokemon, "Thunderbolt", target);
		},
		overrideDefensiveStat: "def",
		target: "normal",
		type: "Electric",
	},
	metalblade: {
		shortDesc: "Super effective against Steel types. Slicing move.",
		num: -1001, accuracy: 100, basePower: 80, category: "Physical", name: "Metal Blade", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === "Steel") return 1;
		},
		target: "normal", type: "Steel",
	},
	airshooter: {
		shortDesc: "Sets Tailwind on the user's side and raises the user's Special Attack by 1 stage. Wind move.",
		num: -1002, accuracy: true, basePower: 0, category: "Status", name: "Air Shooter", pp: 10, priority: 0,
		flags: {metronome: 1, wind: 1},
		onHit(pokemon) {
			pokemon.side.addSideCondition("tailwind");
			this.boost({spa: 1}, pokemon, pokemon);
		},
		target: "self", type: "Flying",
	},
	bubblelead: {
		shortDesc: "Deals more damage the slower the user is than the target.",
		num: -1003,
		accuracy: 100, basePower: 0,
		// Uses the exact Gen 9 Gyro Ball relative-Speed formula.
		basePowerCallback(pokemon, target) {
			let power = Math.floor(25 * target.getStat('spe') / pokemon.getStat('spe')) + 1;
			if (!isFinite(power)) power = 1;
			if (power > 150) power = 150;
			this.debug(`BP: ${power}`);
			return power;
		},
		category: "Physical", name: "Bubble Lead", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		target: "normal",
		type: "Water",
	},
	quickboomerang: {
		shortDesc: "Hits twice. Can hit a target attempting to switch out.",
		num: -1004,
		accuracy: 100, basePower: 35, category: "Physical", name: "Quick Boomerang", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 2,
		beforeTurnCallback(pokemon, target) {
			pokemon.addVolatile("quickboomerang", pokemon, this.dex.getActiveMove("quickboomerang"));
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) {
				move.accuracy = true;
				move.tracksTarget = true;
			}
		},
		condition: {
			duration: 1,
			onFoeBeforeSwitchOut(pokemon) {
				const source = this.effectState.source;
				if (
					!source.isAdjacent(pokemon) || !source.hp ||
					(source.volatiles["encore"] && source.volatiles["encore"].move !== "quickboomerang") ||
					!this.queue.cancelMove(source)
				) return;
				if (!this.event.quickBoomerangMessageShown) {
					this.add("-activate", pokemon, "move: Quick Boomerang");
					this.event.quickBoomerangMessageShown = true;
				}
				pokemon.removeVolatile("destinybond");
				this.actions.runMove("quickboomerang", source, source.getLocOf(pokemon), {
					sourceEffect: this.effectState.sourceEffect,
				});
			},
		},
		target: "normal",
		type: "Normal",
	},
	crashbomber: {
		shortDesc: "Explodes after two turns, using the user's Attack and the target's Defense when damage is dealt. Bomb/Ball move.",
		num: -1005, accuracy: 100, basePower: 100, category: "Physical", name: "Crash Bomber", pp: 10, priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1, bullet: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, "futuremove")) return false;
			Object.assign(target.side.slotConditions[target.position]["futuremove"], {
				move: "crashbomber",
				source,
				moveData: {
					id: "crashbomber", name: "Crash Bomber", accuracy: 100, basePower: 100,
					category: "Physical", priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1, bullet: 1},
					ignoreImmunity: false, effectType: "Move", type: "Steel",
				},
			});
			this.add("-start", source, "move: Crash Bomber");
			return this.NOT_FAIL;
		},
		target: "normal", type: "Steel",
	},
	flashstopper: {
		shortDesc: "Lowers every other active PokÃ©mon's Speed and Evasion by 3 stages.",
		num: -1006, accuracy: true, basePower: 0, category: "Status", name: "Flash Stopper", pp: 10, priority: 0,
		flags: {metronome: 1},
		onHitField(target, source) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon === source) continue;
				this.boost({spe: -3, evasion: -3}, pokemon, source);
			}
		},
		target: "all", type: "Normal",
	},
	atomicfire: {
		shortDesc: "Gains 20 power for each positive stat stage the user has.",
		num: -1007, accuracy: 100, basePower: 20, category: "Special", name: "Atomic Fire", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		basePowerCallback(pokemon) {
			let positiveStages = 0;
			for (const stat in pokemon.boosts) {
				const stage = pokemon.boosts[stat as keyof typeof pokemon.boosts];
				if (stage > 0) positiveStages += stage;
			}
			return 20 + 20 * positiveStages;
		},
		target: "normal", type: "Fire",
	},
	leafshield: {
		shortDesc: "The user loses 1/4 of its HP to create a Substitute. If successful, starts Grassy Terrain.",
		num: -1008, accuracy: true, basePower: 0, category: "Status", name: "Leaf Shield", pp: 10, priority: 0,
		flags: {metronome: 1},
		onHit(pokemon) {
			// Match Substitute's HP threshold and one-quarter max HP cost.
			if (pokemon.volatiles["substitute"] || pokemon.hp <= pokemon.maxhp / 4 || pokemon.maxhp === 1) return false;
			this.damage(pokemon.maxhp / 4, pokemon, pokemon);
			if (!pokemon.addVolatile("substitute")) return false;
			this.field.setTerrain("grassyterrain");
		},
		target: "self", type: "Grass",
	},
	needlecannon: {
		shortDesc: "Hits 2â€“5 times, then sets Sharp Steel on the target's side. Bomb/Ball move.",
		num: -1009, accuracy: 100, basePower: 15, category: "Physical", name: "Needle Cannon", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		multihit: [2, 5],
		// Damage resolves first; then Sharp Steel is set on the target's side.
		onHit(target, source) {
			target.side.addSideCondition("sharpsteel", source, this.dex.getActiveMove("needlecannon"));
		},
		target: "normal", type: "Normal",
	},
	magnetmissile: {
		shortDesc: "Deals neutral damage and bypasses accuracy checks against Electric- and Steel-type targets. Gains 20% power if the user holds a Magnet.",
		num: -1010, accuracy: 80, basePower: 110, category: "Special", name: "Magnet Missile", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === "Electric" || type === "Steel") return 0;
		},
		onModifyMove(move, pokemon, target) {
			if (target && (target.hasType("Electric") || target.hasType("Steel"))) move.accuracy = true;
		},
		onBasePower(basePower, pokemon) {
			if (pokemon.hasItem("magnet")) return this.chainModify(1.2);
		},
		target: "normal", type: "Steel",
	},
	geminilaser: {
		shortDesc: "Hits twice, plus one additional hit for each active Room effect.",
		num: -1011, accuracy: 100, basePower: 40, category: "Special", name: "Gemini Laser", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 2,
		onModifyMove(move) {
			let hits = 2;
			for (const room of ["trickroom", "wonderroom", "magicroom"]) {
				if (this.field.pseudoWeather[room]) hits++;
			}
			move.multihit = hits;
		},
		target: "normal", type: "Psychic",
	},
	hardknuckle: {
		shortDesc: "+1 priority. Calculates damage using the user's Defense instead of its Attack. Punch move.",
		num: -1012, accuracy: 100, basePower: 40, category: "Physical", name: "Hard Knuckle", pp: 10, priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1, punch: 1},
		overrideOffensiveStat: "def",
		target: "normal", type: "Normal",
	},
	topspin: {
		shortDesc: "Calculates damage using the user's Speed instead of its Attack. Removes entry hazards.",
		num: -1013, accuracy: 100, basePower: 70, category: "Physical", name: "Top Spin", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		overrideOffensiveStat: "spe",
		onAfterHit(target, source) {
			// Match Rapid Spin's removal effects, including Leech Seed and partial trapping.
			if (source.removeVolatile('leechseed')) {
				this.add('-end', source, 'Leech Seed', '[from] move: Top Spin', `[of] ${source}`);
			}
			for (const hazard of ["stealthrock", "spikes", "toxicspikes", "stickyweb", "gmaxsteelsurge", "sharpsteel"]) {
				if (source.side.removeSideCondition(hazard)) {
					this.add('-sideend', source.side, this.dex.conditions.get(hazard).name, '[from] move: Top Spin', `[of] ${source}`);
				}
			}
			for (let position = 0; position < source.side.slotConditions.length; position++) {
				const delayedMove = source.side.slotConditions[position]['futuremove'];
				if (!delayedMove || !['crashbomber', 'remotemine'].includes(delayedMove.move)) continue;
				delete source.side.slotConditions[position]['futuremove'];
				const move = this.dex.moves.get(delayedMove.move);
				this.add('-end', source.side.active[position], 'move: ' + move.name);
			}
			if (source.volatiles['partiallytrapped']) source.removeVolatile('partiallytrapped');
		},
		onAfterSubDamage(damage, target, source) {
			if (!source.hp) return;
			if (source.removeVolatile('leechseed')) {
				this.add('-end', source, 'Leech Seed', '[from] move: Top Spin', `[of] ${source}`);
			}
			for (const hazard of ["stealthrock", "spikes", "toxicspikes", "stickyweb", "gmaxsteelsurge", "sharpsteel"]) {
				if (source.side.removeSideCondition(hazard)) {
					this.add('-sideend', source.side, this.dex.conditions.get(hazard).name, '[from] move: Top Spin', `[of] ${source}`);
				}
			}
			for (let position = 0; position < source.side.slotConditions.length; position++) {
				const delayedMove = source.side.slotConditions[position]['futuremove'];
				if (!delayedMove || !['crashbomber', 'remotemine'].includes(delayedMove.move)) continue;
				delete source.side.slotConditions[position]['futuremove'];
				const move = this.dex.moves.get(delayedMove.move);
				this.add('-end', source.side.active[position], 'move: ' + move.name);
			}
			if (source.volatiles['partiallytrapped']) source.removeVolatile('partiallytrapped');
		},
		target: "normal", type: "Normal",
	},
	searchsnake: {
		shortDesc: "Restores HP equal to 50% of the damage dealt. Ignores Accuracy and Evasion modifiers.",
		num: -1014, accuracy: 100, basePower: 80, category: "Physical", name: "Search Snake", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		drain: [1, 2],
		ignoreAccuracy: true,
		ignoreEvasion: true,
		target: "normal", type: "Dragon",
	},
	sparkshock: {
		shortDesc: "Hits 2â€“5 times.",
		num: -1015, accuracy: 100, basePower: 25, category: "Physical", name: "Spark Shock", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: [2, 5],
		target: "normal", type: "Electric",
	},
	shadowblade: {
		shortDesc: "Hits twice. Each hit has a 50% chance to poison the target. Slicing move.",
		num: -1016, accuracy: 100, basePower: 40, category: "Physical", name: "Shadow Blade", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		multihit: 2,
		secondary: {chance: 50, status: "psn"},
		target: "normal", type: "Dark",
	},
	brightburst: {
		shortDesc: "+1 priority. Has a 20% chance to flinch. This flinch chance is not boosted by King's Rock.",
		num: -1017, accuracy: 100, basePower: 40, category: "Special", name: "Bright Burst", pp: 10, priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {chance: 20, volatileStatus: "flinch"},
		// King's Rock does not add a separate flinch chance to moves that already have one.
		target: "normal", type: "Normal",
	},
	rainflush: {
		shortDesc: "Deals damage, then starts Rain. Has a 20% chance to badly poison the target.",
		num: -1018, accuracy: 100, basePower: 65, category: "Special", name: "Rain Flush", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		weather: "raindance",
		secondary: {chance: 20, status: "tox"},
		target: "normal", type: "Water",
	},
	drillbomb: {
		shortDesc: "Calculates damage using the target's Special Defense instead of its Defense. Bomb move.",
		num: -1019, accuracy: 100, basePower: 90, category: "Physical", name: "Drill Bomb", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		overrideDefensiveStat: "spd",
		target: "normal", type: "Steel",
	},
	pharaohshot: {
		shortDesc: "Charges on the first turn and attacks on the second. Does not need to charge in Sun. Has a 30% chance to burn the target.",
		num: -1020, accuracy: 100, basePower: 120, category: "Special", name: "Pharaoh Shot", pp: 10, priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) return;
			this.add("-prepare", attacker, move.name);
			if (["sunnyday", "desolateland"].includes(attacker.effectiveWeather(undefined, true))) {
				this.attrLastMove("[still]");
				this.addMove("-anim", attacker, move.name, defender);
				return;
			}
			if (!this.runEvent("ChargeMove", attacker, defender, move)) return;
			attacker.addVolatile("twoturnmove", defender);
			return null;
		},
		secondary: {chance: 30, status: "brn"},
		target: "normal", type: "Normal",
	},
	ringboomerang: {
		shortDesc: "Hits twice. Each hit has a 30% chance to lower the target's Defense by 1 stage.",
		num: -1021, accuracy: 90, basePower: 30, category: "Physical", name: "Ring Boomerang", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 2,
		secondary: {chance: 30, boosts: {def: -1}},
		target: "normal", type: "Normal",
	},
	dustcrusher: {
		shortDesc: "Can only be used after the user has consumed a Berry.",
		num: -1022, accuracy: 85, basePower: 130, category: "Special", name: "Dust Crusher", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTry(source) {
			return source.ateBerry;
		},
		target: "normal", type: "Steel",
	},
	divemissile: {
		shortDesc: "Lowers the target's Defense by 1 stage. Bypasses accuracy checks in Rain.",
		num: -1023, accuracy: 80, basePower: 110, category: "Physical", name: "Dive Missile", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onModifyMove(move) {
			if (this.field.isWeather("raindance")) move.accuracy = true;
		},
		secondary: {chance: 100, boosts: {def: -1}},
		target: "normal", type: "Normal",
	},
	skullbarrier: {
		shortDesc: "Raises the user's Defense and Special Defense by 1 stage. Until the user's next move, damaging attackers gain the Ghost type.",
		num: -1024, accuracy: true, basePower: 0, category: "Status", name: "Skull Barrier", pp: 10, priority: 0,
		flags: {metronome: 1},
		volatileStatus: "skullbarrier",
		onHit(pokemon) {
			this.boost({def: 1, spd: 1}, pokemon, pokemon);
		},
		condition: {
			onBeforeMove(pokemon) {
				pokemon.removeVolatile("skullbarrier");
			},
			onDamagingHit(damage, target, source) {
				if (!source || source === target || source.hasType("Ghost")) return;
				if (source.addType("Ghost")) {
					this.add("-start", source, "typeadd", "Ghost", "[from] move: Skull Barrier");
				}
			},
		},
		target: "self", type: "Ghost",
	},

	dynamobolt: {
		shortDesc: "-4 priority. Doubles in power if the user has taken damage during the turn.",
		num: -1041, accuracy: 100, basePower: 70, category: "Special", name: "Dynamo Bolt", pp: 10, priority: -4,
		flags: {protect: 1, mirror: 1, metronome: 1}, target: "normal", type: "Electric",
		onBasePower(basePower, pokemon) {
			// lastDamage is reset when the user starts its move; hurtThisTurn
			// correctly preserves damage taken earlier in the same turn.
			if (pokemon.hurtThisTurn) return this.chainModify(2);
		},
	},
	icewall: {
		shortDesc: "Raises the user's Defense and Special Defense by 1 stage each, or 2 stages each in Snow. Snow then ends.",
		num: -1042, accuracy: true, basePower: 0, category: "Status", name: "Ice Wall", pp: 10, priority: 0,
		flags: {metronome: 1}, target: "self", type: "Ice",
		onHit(pokemon) {
			const inSnow = this.field.isWeather("snow");
			this.boost({def: inSnow ? 2 : 1, spd: inSnow ? 2 : 1}, pokemon);
			if (inSnow) this.field.clearWeather();
		},
	},
	spreaddrill: {
		shortDesc: "Deals damage, then starts a Sandstorm. Has a 20% chance to flinch the target.",
		num: -1043, accuracy: 100, basePower: 85, category: "Physical", name: "Spread Drill", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, target: "normal", type: "Steel",
		secondary: {chance: 20, volatileStatus: "flinch"},
		onHit() { this.field.setWeather("sandstorm"); },
	},
	remotemine: {
		shortDesc: "Explodes after two turns, using the user's Special Attack and the target's Special Defense when damage is dealt. Bomb/Ball move.",
		num: -1044, accuracy: 100, basePower: 100, category: "Special", name: "Remote Mine", pp: 10, priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1, bullet: 1}, target: "normal", type: "Dark",
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, "futuremove")) return false;
			Object.assign(target.side.slotConditions[target.position]["futuremove"], {
				move: "remotemine", source,
				moveData: {
					id: "remotemine", name: "Remote Mine", accuracy: 100, basePower: 100,
					category: "Special", priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1, bullet: 1},
					ignoreImmunity: false, effectType: "Move", type: "Dark",
				},
			});
			this.add("-start", source, "move: Remote Mine");
			return this.NOT_FAIL;
		},
	},
	waveburner: {
		shortDesc: "Doubles in power against grounded targets during Grassy Terrain. Removes Grassy Terrain if the move succeeds.",
		num: -1045, accuracy: 100, basePower: 80, category: "Special", name: "Wave Burner", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, target: "normal", type: "Fire",
		onBasePower(basePower, source, target) {
			if (this.field.isTerrain("grassyterrain") && target.isGrounded()) return this.chainModify(2);
		},
		onHit() {
			if (this.field.isTerrain("grassyterrain")) this.field.clearTerrain();
		},
	},
	magiccard: {
		shortDesc: "Restores HP equal to 50% of the damage dealt.",
		num: -1046, accuracy: 100, basePower: 90, category: "Special", name: "Magic Card", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, drain: [1, 2], target: "normal", type: "Psychic",
	},
	concreteshot: {
		shortDesc: "Changes the target to pure Rock type and lowers its Speed by 2 stages.",
		num: -1047, accuracy: true, basePower: 0, category: "Status", name: "Concrete Shot", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, target: "normal", type: "Rock",
		onHit(target) {
			if (target.setType("Rock")) this.add("-start", target, "typechange", "Rock", "[from] move: Concrete Shot");
			this.boost({spe: -2}, target);
		},
	},
	tornadoblow: {
		shortDesc: "Deals damage and removes Tailwind from the user's side. Fails if the user's side does not have Tailwind.",
		num: -1048, accuracy: 100, basePower: 160, category: "Special", name: "Tornado Blow", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1}, target: "normal", type: "Flying",
		onTry(source) { if (!source.side.sideConditions.tailwind) return false; },
		onHit(target, source) { source.side.removeSideCondition("tailwind"); },
	},
	lasertrident: {
		shortDesc: "Has a 20% chance to flinch the target.",
		num: -1049, accuracy: 100, basePower: 90, category: "Special", name: "Laser Trident", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, target: "normal", type: "Fairy",
		secondary: {chance: 20, volatileStatus: "flinch"},
	},
	jewelsatellite: {
		shortDesc: "Starts Rainbow on the user's side. If successful, raises the user's Special Attack by 1 stage.",
		num: -1050, accuracy: true, basePower: 0, category: "Status", name: "Jewel Satellite", pp: 10, priority: 0,
		flags: {metronome: 1}, target: "self", type: "Fairy",
		onHit(pokemon) {
			// Reuse Water Pledge's four-turn Rainbow effect.
			if (pokemon.side.addSideCondition("waterpledge", pokemon, this.dex.getActiveMove("waterpledge"))) {
				this.boost({spa: 1}, pokemon);
			}
		},
	},
	hornetchaser: {
		shortDesc: "Steals the target's positive stat boosts, then deals damage.",
		num: -1051, accuracy: 100, basePower: 90, category: "Physical", name: "Hornet Chaser", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, bypasssub: 1, metronome: 1}, target: "normal", type: "Bug",
		// Match Spectral Thief's native pre-damage boost-stealing mechanic.
		stealsBoosts: true,
	},
	magmabazooka: {
		shortDesc: "Prevents the target from healing for 2 turns. If successful, starts Sea of Fire on the target's side. Bomb/Ball move.",
		num: -1052, accuracy: 90, basePower: 0, category: "Status", name: "Magma Bazooka", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1}, target: "normal", type: "Fire",
		onHit(target, source) {
			// Reuse the official Fire Pledge side condition (Sea of Fire).
			target.side.addSideCondition("firepledge", source, this.dex.getActiveMove("firepledge"));
			// Heal Block is applied to the directly hit Pokemon, even if Sea of Fire is already active.
			target.addVolatile("healblock", source, this.dex.getActiveMove("magmabazooka"));
			if (target.volatiles.healblock) target.volatiles.healblock.duration = 2;
		},
	},
	blackholebomb: {
		shortDesc: "Traps the target and lowers its Speed and Evasion by 1 stage at the end of each turn. Ends if the user switches out. Bomb/Ball move.",
		num: -1053, accuracy: true, basePower: 0, category: "Status", name: "Black Hole Bomb", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1}, target: "normal", type: "Psychic",
		onTryImmunity(target) {
			return this.dex.getImmunity("trapped", target);
		},
		volatileStatus: "blackholebomb",
		condition: {
			noCopy: true,
			onStart(pokemon, source) {
				this.add("-start", pokemon, "move: Black Hole Bomb", `[of] ${source}`);
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					pokemon.removeVolatile("blackholebomb");
					this.add("-end", pokemon, "Black Hole Bomb", "[partiallytrapped]", "[silent]");
					return;
				}
				this.boost({spe: -1, evasion: -1}, pokemon, source, this.dex.getActiveMove("blackholebomb"));
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source?.isActive) pokemon.tryTrap();
			},
		},
	},

	plugball: {
		shortDesc: "Deals more damage the slower the user is than the target. Bomb/Ball move.",
		num: -1054,
		accuracy: 100, basePower: 0,
		// Uses the exact Gen 9 Gyro Ball relative-Speed formula.
		basePowerCallback(pokemon, target) {
			let power = Math.floor(25 * target.getStat('spe') / pokemon.getStat('spe')) + 1;
			if (!isFinite(power)) power = 1;
			if (power > 150) power = 150;
			this.debug(`BP: ${power}`);
			return power;
		},
		category: "Special", name: "Plug Ball", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		target: "normal",
		type: "Electric",
	},
	// Robot Masters sleep-move policy: immediate sleep at 30% accuracy.
	darkvoid: {
		inherit: true,
		accuracy: 30,
		onTry() {}, // Remove the base-game Darkrai-only restriction.
	},
	hypnosis: {
		inherit: true,
		accuracy: 30,
	},
	sleeppowder: {
		inherit: true,
		accuracy: 30,
	},
	// These moves apply Yawn's drowsy volatile instead of immediate sleep.
	sing: {
		inherit: true,
		accuracy: true,
		status: undefined,
		volatileStatus: 'yawn',
	},
	spore: {
		inherit: true,
		accuracy: true,
		status: undefined,
		volatileStatus: 'yawn',
	},

	// Mega Man 5 Stardroid signature moves.
	sparkchaser: {
		shortDesc: "Hits 2â€“5 times. Calculates damage using the target's Defense instead of its Special Defense.",
		num: -1055, accuracy: 90, basePower: 25, category: "Special", name: "Spark Chaser", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, multihit: [2, 5], overrideDefensiveStat: "def",
		target: "normal", type: "Normal",
	},
	grabbuster: {
		shortDesc: "Steals the target's positive stat boosts, then deals damage.",
		num: -1056, accuracy: 100, basePower: 90, category: "Special", name: "Grab Buster", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, stealsBoosts: true, target: "normal", type: "Normal",
	},
	bubblebomb: {
		shortDesc: "Deals 50% more damage in Misty Terrain.",
		num: -1057, accuracy: 100, basePower: 80, category: "Special", name: "Bubble Bomb", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, target: "normal", type: "Water",
		onBasePower(basePower) { if (this.field.isTerrain("mistyterrain")) return this.chainModify(1.5); },
	},
	photonmissile: {
		shortDesc: "-3 priority. Always scores a critical hit.",
		num: -1058, accuracy: 100, basePower: 80, category: "Special", name: "Photon Missile", pp: 10, priority: -3,
		flags: {protect: 1, mirror: 1, metronome: 1}, willCrit: true, target: "normal", type: "Steel",
	},
	electricshock: {
		shortDesc: "Has a 30% chance to Electrify the target.",
		num: -1059, accuracy: 100, basePower: 90, category: "Physical", name: "Electric Shock", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, target: "normal", type: "Electric",
		secondary: {chance: 30, volatileStatus: "electrify"},
	},
	blackhole: {
		shortDesc: "+4 priority. Protects the user from damaging attacks for the turn and lowers all opponents' Speed by 1 stage. Blocking a non-contact damaging move adds a Stockpile counter. Consecutive uses become less reliable.",
		num: -1060, accuracy: true, basePower: 0, category: "Status", name: "Black Hole", pp: 5, priority: 4,
		flags: {noassist: 1, failcopycat: 1}, stallingMove: true, volatileStatus: "blackhole", target: "self", type: "Psychic",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
		},
		onHit(source) {
			source.addVolatile("stall");
			for (const target of this.getAllActive()) if (target !== source) this.boost({spe: -1}, target, source);
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "Protect");
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (this.checkMoveBypassesProtect(move, source, target)) return;
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add("-activate", target, "move: Black Hole");
				}
				const lockedmove = source.getVolatile("lockedmove");
				if (lockedmove && source.volatiles["lockedmove"].duration === 2) {
					delete source.volatiles["lockedmove"];
				}
				if (move.category !== "Status" && !move.flags.contact) {
					target.addVolatile("blackholestockpile", target, this.dex.getActiveMove("blackhole"));
				}
				return this.NOT_FAIL;
			},
		},
	},
	deepdigger: {
		shortDesc: "Can hit Flying, levitating, and other ungrounded targets.",
		num: -1061, accuracy: 85, basePower: 100, category: "Physical", name: "Deep Digger", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, ignoreImmunity: {Ground: true}, target: "normal", type: "Ground",
	},
	breakdash: {
		shortDesc: "Lowers the target's Defense by 1 stage, then switches the user out for a selected party member.",
		num: -1062, accuracy: 100, basePower: 70, category: "Physical", name: "Break Dash", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, selfSwitch: true, target: "normal", type: "Normal",
		secondary: {chance: 100, boosts: {def: -1}},
	},
	saltwater: {
		shortDesc: "Applies Salt Cure's residual damage effect to the target.",
		num: -1063, accuracy: 100, basePower: 70, category: "Special", name: "Salt Water", pp: 10, priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1}, target: "normal", type: "Water",
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				target.addVolatile("saltwater", source, move);
			},
		},
		condition: {
			noCopy: true,
			onStart(target) { this.add("-start", target, "Salt Water"); },
			onResidualOrder: 10,
			onResidual(target) {
				if (!target.hp) return;
				const vulnerable = target.hasType(["Water", "Steel"]);
				this.damage(
					target.baseMaxhp / (vulnerable ? 4 : 8),
					target,
					this.effectState.source,
					this.dex.getActiveMove("saltwater")
				);
			},
		},
	},

};

