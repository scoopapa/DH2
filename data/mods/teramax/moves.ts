export const Moves: {[k: string]: ModdedMoveData} = {
	ragefist: {
		inherit: true,
		basePowerCallback(pokemon) {
			return Math.min(350, 50 + 25 * pokemon.timesAttacked);
		},
		desc: "Power is equal to 50+(X*25), where X is the total number of times the user has been hit by a damaging attack during the battle, even if the user did not lose HP from the attack. X cannot be greater than 6 and does not reset upon switching out or fainting. Each hit of a multi-hit attack is counted, but confusion damage is not counted. After attacking, this Pokemon takes damage, depending on the Basepower of the move.",
		shortDesc: "+25 BP for each time user was hit. Recoil = BP.",
		self: {
			onHit(pokemon) {
				let bp = Math.min(350, 50 + 25 * pokemon.timesAttacked);
				this.damage(bp, pokemon, pokemon);
				this.add('-message', `Rage Fist currently has a BP of ${bp}!`);
			},
		},
	},
	decorate: {
		inherit: true,
		desc: "The user swaps all its stat stage changes with the target.",
		shortDesc: "Swaps all stat changes with target.",
		pp: 10,
		flags: {protect: 1, mirror: 1, bypasssub: 1, allyanim: 1},
		onHit(target, source) {
			const targetBoosts: SparseBoostsTable = {};
			const sourceBoosts: SparseBoostsTable = {};
			let i: BoostID;
			for (i in target.boosts) {
				targetBoosts[i] = target.boosts[i];
				sourceBoosts[i] = source.boosts[i];
			}
			target.setBoost(sourceBoosts);
			source.setBoost(targetBoosts);
			this.add('-swapboost', source, target, '[from] move: Decorate');
		},
		boosts: null,
	},
	appleacid: {
		inherit: true,
		accuracy: 90,
		basePower: 80,
		desc: "Has a 20% chance to poison the target. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "20% poison chance. Recovers 50% dmg dealt.",
		pp: 15,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "allAdjacentFoes",
	},
	gravapple: {
		inherit: true,
		desc: "Has a 100% chance to lower the target's Defense by 1 stage. Power is multiplied by 1.5 during Gravity's effect. If this move is resisted, it sets Gravity.",
		shortDesc: "-1 Def. Gravity: 1.5x power. Sets Gravity if resisted.",
		onHit(target, source, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.field.addPseudoWeather('gravity', source, source.move);
			}
		},
	},
	noretreat: {
		inherit: true,
		desc: "Once per switch-in, raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage. Fails if the user has already used this move.",
		shortDesc: "+1 to all stats. Once per switch-in.",
		flags: {snatch: 1},
		onTry(source, target, move) {
			if (source.volatiles['noretreat']) return false;
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: No Retreat');
			},
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
	},
	spicyextract: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		viable: true,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		boosts: null,
	},
	hyperdrill: {
		inherit: true,
		desc: "The user ignores the resistances to this move.",
		shortDesc: "Ignores resistances.",
		flags: {contact: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel' || type === 'Rock') return 0;
		},
	},
	destinybond: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Destiny Bond');
			},
			onFaint(target, source, effect) {
				if (!source || !effect || target.isAlly(source)) return;
				if (effect.effectType === 'Move' && !effect.flags['futuremove']) {
					this.add('-activate', target, 'move: Destiny Bond');
					source.faint();
				}
			},
			onBeforeMovePriority: -1,
			onBeforeMove(pokemon, target, move) {
				if (move.id === 'destinybond') return;
				this.debug('removing Destiny Bond before attack');
				pokemon.removeVolatile('destinybond');
			},
			onMoveAborted(pokemon, target, move) {
				pokemon.removeVolatile('destinybond');
			},
		},
	},
	terablast: {
		inherit: true,
		desc: "If the user is Terastallized, this move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes, and this move's type becomes the same as the user's Tera Type. In addition, if the user's Tera Type is Stellar, this move has 100 power, is super effective against Terastallized targets and neutral against other targets, and lowers the user's Attack and Special Attack by 1 stage, unless the target is Dynamax or Gigantamax.",
		onModifyMove(move, pokemon, target) {
			if (pokemon.terastallized && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
			if (pokemon.terastallized === 'Stellar' && !target.volatiles['dynamax']) {
				move.self = {boosts: {atk: -1, spa: -1}};
			}
		},
	},
	psyblade: {
		inherit: true,
		desc: "If the current terrain is Electric Terrain, this move's power is multiplied by 1.5. If there is no terrain active, this move will set Electric Terrain.",
		shortDesc: "No terrain: +Electric Terrain. 1.5x power in terrain.",
		self: {
			onHit(source) {
				if (this.field.terrain) return;
				this.field.setTerrain('electricterrain');
			},
		},
	},
	tarshot: {
		num: 749,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 30% chance to burn the target. This move nullifies all abilities that mitigate the effects of Fire-type damage or the burn status (Flash Fire, Water Bubble, Thermal Exchange, Water Veil, Thick Fat, Steam Engine, Well-Baked Body, Heatproof, Purifying Salt).",
		shortDesc: "30% chance to burn. Negates certain immunity.",
		name: "Tar Shot",
		pp: 10,
		viable: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		onHit(target) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			if (target.hasAbility('flashfire') || target.hasAbility('waterbubble') ||
				target.hasAbility('thermalexchange') || target.hasAbility('waterveil') ||
				target.hasAbility('thickfat') || target.hasAbility('steamengine') ||
				target.hasAbility('wellbakedbody') || target.hasAbility('heatproof') ||
				target.hasAbility('purifyingsalt')) {
					target.addVolatile('gastroacid');
			}
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			if (target.hasAbility('flashfire') || target.hasAbility('waterbubble') ||
				target.hasAbility('thermalexchange') || target.hasAbility('waterveil') ||
				target.hasAbility('thickfat') || target.hasAbility('steamengine') ||
				target.hasAbility('wellbakedbody') || target.hasAbility('heatproof') ||
				target.hasAbility('purifyingsalt')) {
					target.addVolatile('gastroacid');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.terastallized) return false;
				this.add('-start', pokemon, 'Tar Shot');
			},
			onEffectivenessPriority: -2,
			onEffectiveness(typeMod, target, type, move) {
				if (move.type !== 'Fire') return;
				if (!target) return;
				if (type !== target.getTypes()[0]) return;
				return typeMod + 1;
			},
		},
		target: "normal",
		type: "Rock",
	},
	doodle: {
		num: 867,
		accuracy: 100,
		shortDesc: "(Partially functional placeholder) Copies the foe's entire moveset.",
		basePower: 0,
		category: "Status",
		name: "Doodle",
		viable: true,
		pp: 10,
		priority: 0,
		flags: {failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
		onHit(target, source, move) {
			if (source.transformed || source.volatiles['doodle']) {
				return false;
			}
			/*if (move.isZ || move.isMax) return false;
			const copiedmove1 = target.moveSlots[0];
			const copiedmove2 = target.moveSlots[1];
			const copiedmove3 = target.moveSlots[2];
			const copiedmove4 = target.moveSlots[3];
			source.moveSlots[0] = {
				move: copiedmove1.name,
				id: copiedmove1.id,
				pp: copiedmove1.pp,
				maxpp: copiedmove1.pp,
				target: copiedmove1.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			source.moveSlots[1] = {
				move: copiedmove2.name,
				id: copiedmove2.id,
				pp: copiedmove2.pp,
				maxpp: copiedmove2.pp,
				target: copiedmove2.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			source.moveSlots[2] = {
				move: copiedmove3.name,
				id: copiedmove3.id,
				pp: copiedmove3.pp,
				maxpp: copiedmove3.pp,
				target: copiedmove3.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			source.moveSlots[3] = {
				move: copiedmove4.name,
				id: copiedmove4.id,
				pp: copiedmove4.pp,
				maxpp: copiedmove4.pp,
				target: copiedmove4.target,
				disabled: false,
				used: false,
				virtual: true,
			};*/
			for (const moveid in target.moveSlots) {
				const copiedmove = target.moveSlots[moveid];
				source.moveSlots[moveid] = {
					move: copiedmove.name,
					id: copiedmove.id,
					pp: copiedmove.pp,
					maxpp: copiedmove.pp,
					target: copiedmove.target,
					disabled: false,
					used: false,
					virtual: true,
				};
			}
			source.addVolatile('doodle');
			this.add('-start', source, 'Doodle', move.name);
		},
		condition: {},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	grassknot: {
		inherit: true,
		desc: "This move's power is 20 if the target weighs less than 10 kg, 40 if less than 25 kg, 60 if less than 50 kg, 80 if less than 100 kg, 100 if less than 200 kg, and 120 if greater than or equal to 200 kg or if the target is Dynamax or Gigantamax.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 120;
			} else if (targetWeight >= 2000) {
				bp = 120;
			} else if (targetWeight >= 1000) {
				bp = 100;
			} else if (targetWeight >= 500) {
				bp = 80;
			} else if (targetWeight >= 250) {
				bp = 60;
			} else if (targetWeight >= 100) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	lowkick: {
		inherit: true,
		desc: "This move's power is 20 if the target weighs less than 10 kg, 40 if less than 25 kg, 60 if less than 50 kg, 80 if less than 100 kg, 100 if less than 200 kg, and 120 if greater than or equal to 200 kg or if the target is Dynamax or Gigantamax.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 120;
			} else if (targetWeight >= 2000) {
				bp = 120;
			} else if (targetWeight >= 1000) {
				bp = 100;
			} else if (targetWeight >= 500) {
				bp = 80;
			} else if (targetWeight >= 250) {
				bp = 60;
			} else if (targetWeight >= 100) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	heatcrash: {
		inherit: true,
		desc: "The power of this move depends on (user's weight / target's weight), rounded down. Power is equal to 120 if the result is 5 or more, 100 if 4, 80 if 3, 60 if 2, and 40 if 1 or less or if the target is Dynamax or Gigantamax. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 40;
			} else if (pokemonWeight >= targetWeight * 5) {
				bp = 120;
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100;
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80;
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	heavyslam: {
		inherit: true,
		desc: "The power of this move depends on (user's weight / target's weight), rounded down. Power is equal to 120 if the result is 5 or more, 100 if 4, 80 if 3, 60 if 2, and 40 if 1 or less or if the target is Dynamax or Gigantamax. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 40;
			} else if (pokemonWeight >= targetWeight * 5) {
				bp = 120;
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100;
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80;
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},

// Max and GMax Moves
	gmaxbefuddle: {
		num: 1000,
		accuracy: true,
		basePower: 140,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, each Pokemon on the opposing side either falls asleep, becomes poisoned, or becomes paralyzed, even if they have a substitute.",
		shortDesc: "20% chance to sleep, poison, or paralyze target.",
		name: "G-Max Befuddle",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Butterfree",
		secondary: {
			chance: 20,
			self: {
				onHit(source) {
					for (const pokemon of source.foes()) {
						const result = this.random(3);
						if (result === 0) {
							pokemon.trySetStatus('slp', source);
						} else if (result === 1) {
							pokemon.trySetStatus('par', source);
						} else {
							pokemon.trySetStatus('psn', source);
						}
					}
				},
			},
		},
		target: "adjacentFoe",
		type: "Bug",
		contestType: "Cool",
	},
	gmaxcannonade: {
		num: 1000,
		accuracy: true,
		basePower: 110,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the user gains the Aqua Ring effect, healing it by 1/8 of its maximum HP, rounded down.",
		shortDesc: "This Pokemon gains the Aqua Ring effect.",
		name: "G-Max Cannonade",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Blastoise",
		self: {
			volatileStatus: 'aquaring',
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	gmaxcentiferno: {
		num: 1000,
		accuracy: true,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, each Pokemon on the opposing side is prevented from switching for four or five turns (seven turns if the user is holding Grip Claw), even if they have a substitute. They can still switch out if they are holding Shed Shell or use Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends for a target if it leaves the field, or if it uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps the target for 4-5 turns.",
		name: "G-Max Centiferno",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Centiskorch",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('G-Max Centiferno'));
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fire",
		contestType: "Cool",
	},
	gmaxchistrike: {
		num: 1000,
		accuracy: true,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, each Pokemon on the user's side has their critical hit ratio raised by 1 stage, even if they have a substitute.",
		shortDesc: "Raises the user's side critical hit ratio by 1.",
		name: "G-Max Chi Strike",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Machamp",
		self: {
			onHit(source) {
				for (const pokemon of source.alliesAndSelf()) {
					pokemon.addVolatile('gmaxchistrike');
				}
			},
		},
		condition: {
			noCopy: true,
			onStart(target, source, effect) {
				this.effectState.layers = 1;
				if (!['costar', 'imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: G-Max Chi Strike');
				}
			},
			onRestart(target, source, effect) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				if (!['costar', 'imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: G-Max Chi Strike');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + this.effectState.layers;
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fighting",
		contestType: "Cool",
	},
	gmaxcuddle: {
		num: 1000,
		accuracy: true,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, each Pokemon on the target becomes infatuated, even if they have a substitute. This effect does not happen if the target is already infatuated.",
		shortDesc: "The target gets infatuated, regardless of gender.",
		name: "G-Max Cuddle",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Eevee",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					pokemon.addVolatile('attract');
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
		contestType: "Cool",
	},
	gmaxdepletion: {
		num: 1000,
		accuracy: true,
		basePower: 140,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, each Pokemon on the opposing side loses 2 PP from its last move used, even if they have a substitute.",
		shortDesc: "Lowers the PP of the target's last move by 2.",
		name: "G-Max Depletion",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Duraludon",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					let move: Move | ActiveMove | null = pokemon.lastMove;
					if (!move || move.isZ) continue;
					if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);

					const ppDeducted = pokemon.deductPP(move.id, 2);
					if (ppDeducted) {
						this.add("-activate", pokemon, 'move: G-Max Depletion', move.name, ppDeducted);
						// Don't return here because returning early doesn't trigger
						// activation text for the second Pokemon in doubles
					}
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Dragon",
		contestType: "Cool",
	},
	gmaxdrumsolo: {
		num: 1000,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
		name: "G-Max Drum Solo",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Rillaboom",
		ignoreAbility: true,
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	gmaxfinale: {
		num: 1000,
		accuracy: true,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, each Pokemon on the user's side restores 1/6 of its current maximum HP, even if they have a substitute.",
		shortDesc: "Heals the user's side by 1/6 of their max HP.",
		name: "G-Max Finale",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Alcremie",
		self: {
			onHit(target, source, move) {
				for (const pokemon of source.alliesAndSelf()) {
					this.heal(pokemon.maxhp / 6, pokemon, source, move);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fairy",
		contestType: "Cool",
	},
	gmaxfireball: {
		num: 1000,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
		name: "G-Max Fireball",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Cinderace",
		ignoreAbility: true,
		secondary: null,
		target: "adjacentFoe",
		type: "Fire",
		contestType: "Cool",
	},
	gmaxfoamburst: {
		num: 1000,
		accuracy: true,
		basePower: 130,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the Speed of target is lowered by 1 stages, even if they have a substitute.",
		shortDesc: "Lowers the target's speed by 1.",
		name: "G-Max Foam Burst",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Kingler",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					this.boost({spe: -1}, pokemon);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	gmaxgoldrush: {
		num: 1000,
		accuracy: true,
		basePower: 40,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		name: "G-Max Gold Rush",
		pp: 5,
		priority: 0,
		flags: {},
		multihit: [2, 5],
		isMax: "Meowth",
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
		contestType: "Cool",
	},
	gmaxgravitas: {
		num: 1000,
		accuracy: true,
		basePower: 140,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the effect of Gravity begins.",
		shortDesc: "This move summons Gravity for 5 turns upon use.",
		name: "G-Max Gravitas",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Orbeetle",
		self: {
			pseudoWeather: 'gravity',
		},
		target: "adjacentFoe",
		type: "Psychic",
		contestType: "Cool",
	},
	gmaxhydrosnipe: {
		num: 1000,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
		name: "G-Max Hydrosnipe",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Inteleon",
		ignoreAbility: true,
		secondary: null,
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	gmaxmalodor: {
		num: 1000,
		accuracy: true,
		basePower: 140,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the target becomes badly poisoned, even if they have a substitute.",
		shortDesc: "Badly poisons the target.",
		name: "G-Max Malodor",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Garbodor",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					pokemon.trySetStatus('tox', source);
				}
			},
		},
		target: "adjacentFoe",
		type: "Poison",
		contestType: "Cool",
	},
	gmaxmeltdown: {
		num: 1000,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the effect of Torment begins for each Pokemon on the opposing side, even if they have a substitute.",
		shortDesc: "This move summons Torment on the foe.",
		name: "G-Max Meltdown",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Melmetal",
		self: {
			onHit(source, target, effect) {
				for (const pokemon of source.foes()) {
					if (!pokemon.volatiles['dynamax']) pokemon.addVolatile('torment', source, effect);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	gmaxoneblow: {
		num: 1000,
		accuracy: true,
		basePower: 130,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "This move bypasses all protection effects, including Max Guard.",
		shortDesc: "Bypasses protection, including Max Guard.",
		name: "G-Max One Blow",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Urshifu",
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	gmaxrapidflow: {
		num: 1000,
		accuracy: true,
		basePower: 45,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "Hits 3 times. This move bypasses all protection effects, including Max Guard.",
		shortDesc: "Hits 3 times. Bypasses protection, including Max Guard.",
		name: "G-Max Rapid Flow",
		pp: 5,
		priority: 0,
		flags: {},
		multihit: 3,
		isMax: "Urshifu-Rapid-Strike",
		secondary: null,
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	gmaxreplenish: {
		num: 1000,
		accuracy: true,
		basePower: 110,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the user restores its Sitrus Berry, even if they have a substitute.",
		shortDesc: "Restores user's Sitrus Berry.",
		name: "G-Max Replenish",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Snorlax",
		self: {
			onHit(source) {
				if (this.random(2) === 0) return;
				for (const pokemon of source.alliesAndSelf()) {
					if (pokemon.item) continue;

					if (pokemon.lastItem && this.dex.items.get(pokemon.lastItem).isBerry) {
						const item = pokemon.lastItem;
						pokemon.lastItem = '';
						this.add('-item', pokemon, this.dex.items.get(item), '[from] move: G-Max Replenish');
						pokemon.setItem(item);
					}
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
		contestType: "Cool",
	},
	gmaxresonance: {
		num: 1000,
		accuracy: true,
		basePower: 110,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "This move's type effectiveness against Water is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective against Water.",
		name: "G-Max Resonance",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Lapras",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Cool",
	},
	gmaxsandblast: {
		num: 1000,
		accuracy: true,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, each Pokemon on the opposing side is prevented from switching for four or five turns (seven turns if the user is holding Grip Claw), even if they have a substitute. Causes damage equal to 1/8 of their maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. They can still switch out if they are holding Shed Shell or use Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends for a target if it leaves the field, or if it uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "G-Max Sandblast",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Sandaconda",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('G-Max Sandblast'));
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ground",
		contestType: "Cool",
	},
	gmaxsmite: {
		num: 1000,
		accuracy: true,
		basePower: 110,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the effects of Light Screen begin.",
		shortDesc: "This move summons Light Screen for 5 turns upon use.",
		name: "G-Max Smite",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Hatterene",
		self: {
			sideCondition: 'lightscreen',
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fairy",
		contestType: "Cool",
	},
	gmaxsnooze: {
		num: 1000,
		accuracy: true,
		basePower: 110,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the effects of Reflect begin.",
		shortDesc: "This move summons Reflect for 5 turns upon use.",
		name: "G-Max Snooze",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Grimmsnarl",
		self: {
			sideCondition: 'reflect',
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	gmaxsteelsurge: {
		num: 1000,
		accuracy: true,
		basePower: 110,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. A maximum of three layers may be set, and opponents lose 1/8 of their maximum HP with one layer, 1/6 of their maximum HP with two layers, and 1/4 of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		shortDesc: "Sets a layer of Spikes on the opposing side.",
		name: "G-Max Steelsurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Copperajah",
		self: {
			onHit(source) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	gmaxstonesurge: {
		num: 1000,
		accuracy: true,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		shortDesc: "Sets Stealth Rock on the target's side.",
		name: "G-Max Stonesurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Drednaw",
		self: {
			onHit(source) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('stealthrock');
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	gmaxstunshock: {
		num: 1000,
		accuracy: true,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the target becomes poisoned or paralyzed, even if they have a substitute.",
		shortDesc: "Inflicts either poison or paralysis on target.",
		name: "G-Max Stun Shock",
		pp: 10,
		priority: 0,
		flags: {sound: 1},
		isMax: "Toxtricity",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					const result = this.random(2);
					if (result === 0) {
						pokemon.trySetStatus('par', source);
					} else {
						pokemon.trySetStatus('psn', source);
					}
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Electric",
		contestType: "Cool",
	},
	gmaxsweetness: {
		num: 1000,
		accuracy: true,
		basePower: 130,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, each Pokemon on the user's side has its status condition cured, even if they have a substitute.",
		shortDesc: "Cures the user's party of all status conditions.",
		name: "G-Max Sweetness",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Appletun",
		self: {
			onHit(pokemon, source, move) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
						continue;
					}
					ally.cureStatus();
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	gmaxtartness: {
		num: 1000,
		accuracy: true,
		basePower: 130,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the target loses its held item, even if they have a substitute. This move cannot cause Pokemon with the Sticky Hold Ability to lose their held item or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, a Silvally, a Zacian, or a Zamazenta to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, Memory, Rusted Sword, or Rusted Shield respectively. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		shortDesc: "Removes adjacent Pokemon's held items.",
		name: "G-Max Tartness",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Flapple",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					const item = pokemon.takeItem(source);
					if (item) {
						this.add('-enditem', pokemon, item.name, '[from] move: G-Max Tartness', '[of] ' + source);
					} else {
						this.add('-fail', pokemon, 'move: G-Max Tartness');
					}
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	gmaxterror: {
		num: 1000,
		accuracy: true,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, prevents the target from switching out, even if they have a substitute. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out.",
		name: "G-Max Terror",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Gengar",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					pokemon.addVolatile('trapped', source, null, 'trapper');
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ghost",
		contestType: "Cool",
	},
	gmaxvinelash: {
		num: 1000,
		accuracy: true,
		basePower: 110,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, it inflicts the target with Leech Seed, even if they have a substitute.",
		shortDesc: "This move summons Leech Seed on the foe.",
		name: "G-Max Vine Lash",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Venusaur",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
				if (!pokemon.hasType('Grass')) {
						pokemon.addVolatile('leechseed');
					}
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	gmaxvolcalith: {
		num: 1000,
		accuracy: true,
		basePower: 130,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the effectiveness of Fire-type moves against the target is doubled against it, even if they have a substitute.",
		shortDesc: "Effectivness of Fire moves becomes greater.",
		name: "G-Max Volcalith",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Coalossal",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					pokemon.addVolatile('tarshot');
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Cool",
	},
	gmaxvoltcrash: {
		num: 1000,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the target becomes paralyzed, even if they have a substitute.",
		shortDesc: "Paralyzes the target.",
		name: "G-Max Volt Crash",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Pikachu",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					pokemon.trySetStatus('par', source);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Electric",
		contestType: "Cool",
	},
	gmaxwildfire: {
		num: 1000,
		accuracy: true,
		basePower: 110,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the target becomes burned, even if they have a substitute.",
		shortDesc: "Burns the target.",
		name: "G-Max Wildfire",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Charizard",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					pokemon.trySetStatus('brn', source);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fire",
		contestType: "Cool",
	},
	gmaxwindrage: {
		num: 1000,
		accuracy: true,
		basePower: 110,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain end, the effects of Reflect, Light Screen, Aurora Veil, Safeguard, Mist, G-Max Steelsurge, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the target's side, and the effects of G-Max Steelsurge, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side.",
		shortDesc: "Clears terrain and hazards from both sides of the field.",
		name: "G-Max Wind Rage",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Corviknight",
		self: {
			onHit(source) {
				let success = false;
				const removeTarget = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb',
				];
				const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.conditions.get(targetCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				this.field.clearTerrain();
				return success;
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Flying",
		contestType: "Cool",
	},
	maxhailstorm: {
		num: 763,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Past",
		desc: "Power is equal to the base move's Max Move power. If this move is successful, the effect of Snow begins. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.",
		shortDesc: "Base move affects power. Starts Snow.",
		name: "Max Hailstorm",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setWeather('snow');
			},
		},
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Cool",
	},
	maxguard: {
		num: 743,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Max Guard",
		pp: 10,
		priority: 4,
		flags: {},
		isMax: true,
		stallingMove: true,
		volatileStatus: 'maxguard',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onDamagePriority: -20,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'maxguard' ) {
				return 0;
			}
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Max Guard');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				const bypassesMaxGuard = [
					'acupressure', 'afteryou', 'allyswitch', 'aromatherapy', 'aromaticmist', 'coaching', 'confide', 'copycat', 'curse', 'decorate', 'doomdesire', 'feint', 'futuresight', 'gmaxoneblow', 'gmaxrapidflow', 'healbell', 'holdhands', 'howl', 'junglehealing', 'lifedew', 'meanlook', 'perishsong', 'playnice', 'powertrick', 'roar', 'roleplay', 'tearfullook',
				];
				if (bypassesMaxGuard.includes(move.id)) return;
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Max Guard');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cool",
	},
	dynamaxused: {
		shortDesc: "Prevents Dynamax from being used multiple times.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dynamax Used",
		pp: 5,
		priority: 0,
		flags: {},
		sideCondition: 'dynamaxused',
		condition: {},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	gmaxused: {
		shortDesc: "Allows Gigantamax to be permament.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "G-Max Used",
		pp: 5,
		priority: 0,
		flags: {},
		sideCondition: 'gmaxused',
		condition: {},
		secondary: null,
		target: "normal",
		type: "Normal",
	},

// undexiting moves
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	triplekick: {
		inherit: true,
		isNonstandard: null,
	},
	purify: {
		inherit: true,
		isNonstandard: null,
	},
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	topsyturvy: {
		inherit: true,
		isNonstandard: null,
	},
	shelltrap: {
		inherit: true,
		isNonstandard: null,
	},
	octolock: {
		inherit: true,
		isNonstandard: null,
	},
	anchorshot: {
		inherit: true,
		isNonstandard: null,
	},
	sparklingaria: {
		inherit: true,
		isNonstandard: null,
	},
	doubleironbash: {
		inherit: true,
		isNonstandard: null,
	},
	geargrind: {
		inherit: true,
		isNonstandard: null,
	},
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	noxioustorque: {
		inherit: true,
		isNonstandard: null,
	},

	/*
	// was used to change hardcoded maxmove BPs, but the code already changes the vast majority of them
	heatcrash: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	bonemerang: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	bonerush: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	bulletseed: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	cometpunch: {
		inherit: true,
		maxMove: {basePower: 100},
	},
	counter: {
		inherit: true,
		maxMove: {basePower: 55},
	},
	crushgrip: {
		inherit: true,
		maxMove: {basePower: 120},
	},
	doublehit: {
		inherit: true,
		maxMove: {basePower: 100},
	},
	doublekick: {
		inherit: true,
		maxMove: {basePower: 60},
	},
	dragondarts: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	dualchop: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	dualwingbeat: {
		inherit: true,
		maxMove: {basePower: 80},
	},
	electroball: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	endeavor: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	fissure: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	flail: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	frustration: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	return: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	furyswipes: {
		inherit: true,
		maxMove: {basePower: 80},
	},
	geargrind: {
		inherit: true,
		isNonstandard: null,
		maxMove: {basePower: 110},
	},
	grassknot: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	guillotine: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	gyroball: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	heavyslam: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	horndrill: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	iciclespear: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	magnitude: {
		inherit: true,
		maxMove: {basePower: 120},
	},
	naturalgift: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	pinmissile: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	powertrip: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	punishment: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	risingvoltage: {
		inherit: true,
		maxMove: {basePower: 120},
	},
	rockblast: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	scaleshot: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	seismictoss: {
		inherit: true,
		maxMove: {basePower: 55},
	},
	sheercold: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	spikecannon: {
		inherit: true,
		maxMove: {basePower: 100},
	},
	storedpower: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	surgingstrikes: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	tailslap: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	terrainpulse: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	tripleaxel: {
		inherit: true,
		maxMove: {basePower: 120},
	},
	trumpcard: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	twineedle: {
		inherit: true,
		maxMove: {basePower: 80},
	},
	weatherball: {
		inherit: true,
		maxMove: {basePower: 110},
	},
	wringout: {
		inherit: true,
		maxMove: {basePower: 120},
	}, */
};
