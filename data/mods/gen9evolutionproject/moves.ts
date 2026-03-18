export const Moves: {[moveid: string]: ModdedMoveData} = {
	shaveoff: {
		num: -1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shave Off",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('snow') || this.field.isWeather('hail')) {
				factor = 0.667;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Chip Away", source);
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
		shortDesc: "Recovers half of max HP, or 2/3 in snow/hail.",
	},
	freezetag: {
		num: -2,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Freeze Tag",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target) {
			if (target.hasType('Ice')) return;
			if (!target.addType('Ice')) return;
			this.add('-start', target, 'typeadd', 'Ice');
		},
		secondary: null,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Spinner", target);
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
		shortDesc: "Does damage and adds Ice to the target's type.",
	},
	auroraburst: {
		num: -3,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Aurora Burst",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				this.add('-anim', attacker, "Subzero Slammer", defender);
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({spd: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
		shortDesc: "Charges and raises Sp. Def, then attacks all adjacent foes.",
	},
	banefulbayonet: {
		num: -4,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Baneful Bayonet",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, slicing: 1},
		drain: [1, 2],
		secondary: {
			chance: 20,
			status: 'psn',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Sting", target);
		},
		target: "normal",
		type: "Poison",
		shortDesc: "Drains for 50% of the damage dealt; 20% poison chance.",
	},
	renewingring: {
		num: -5,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Renewing Ring",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, heal: 1, metronome: 1},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Ice')) return;
			this.add('-fail', pokemon, 'move: Renewing Ring');
			this.attrLastMove('[still]');
			return null;
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Ice" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Renewing Ring');
			},
			slotCondition: 'renewingring',
		},
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				if (this.activeMove.id !== 'renewingring' || !this.activeTarget.lastDamage) return false;
				this.effectState.hp = this.activeTarget.lastDamage / 2;
				this.add('-anim', source, "Wish", source);
				this.add('-message', `${this.effectState.source.illusion ? this.effectState.source.illusion.name : this.effectState.source.name} made a wish for the new year!`);
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = target.heal(this.effectState.hp);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name); // I do want it to look like Wish
					}
				}
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Hammer", source);
			this.add('-anim', source, "Hyper Voice", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		shortDesc: "Sheds the Ice type; two turns later, heals for 50% damage dealt.",
	},
	snowroller: {
		num: -6,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Snow Roller",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			def: 1,
			accuracy: 1,
		},
		volatileStatus: 'defensecurl',
		condition: {
			noCopy: true,
			onRestart: () => null,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Barrier", source);
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cute",
		shortDesc: "Boosts Defense, accuracy, Rollout and Ice Ball.",
	},
	blownfuse: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Blown Fuse",
		pp: 20,
		priority: 4,
		flags: {reflectable: 1, metronome: 1},
		slotCondition: 'blownfuse',
		condition: {
			duration: 4,
			onClearFuse(target) {
				target.side.removeSlotCondition(target, 'blownfuse');
				return true;
			},
			onAfterMoveSecondarySelf(source, target, move) {
				if (move.category === 'Physical' && source.isGrounded() && !source.hasType('Electric') && move.id !== 'rapidspin' && move.id !== 'mortalspin') {
					source.setStatus('brn', source, move);
				}
			},
			onStart(target) {
				this.add('-message', `A fuse short-circuited around ${target.illusion ? target.illusion.name : target.name}!`);
				this.hint(`For 4 turns, using a physical move from where ${target.illusion ? target.illusion.name : target.name} is standing will result in a burn.`);
				this.hint(`Electric-types and non-grounded Pokémon are unaffected.`);
				this.hint(`You can clear a blown fuse with moves like Rapid Spin and Defog!`);
			},
			onEnd(target) {
				this.add('-message', `The blown fuse around ${target.illusion ? target.illusion.name : target.name} disappeared.`);
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "First Impression", target);
			this.add('-anim', target, "Spark", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
		shortDesc: "4 turns: grounded Pokémon in target slot burned after using physical moves, except Electric-types.",
	},
	shadowbox: {
		num: -8,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Shadow Box",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Skitter Smack", target);
			this.add('-anim', source, "Shadow Punch", target); // wanted to use Soul-Stealing 7-Star Strike, but it uses the Z-Move visual...
		},
		target: "allAdjacentFoes",
		type: "Ghost",
		shortDesc: "Hits adjacent foes and lowers their Attack, Sp. Atk.",
	},
	rekindle: {
		num: -9,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Rekindle",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		self: {
			onHit(source) {
				if (source.item || !source.lastItem) return;
				const item = source.lastItem;
				source.lastItem = '';
				this.add('-item', source, this.dex.items.get(item), '[from] move: Recycle');
				source.setItem(item);
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mystical Fire", target);
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
		shortDesc: "Restores the user's item.",
	},
	entanglement: {
		num: -10,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Entanglement",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'entanglement',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Entanglement');
				this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || source.fainted || !source.activeTurns)) {
					delete pokemon.volatiles['entanglement'];
					this.add('-end', pokemon, this.effectState.sourceEffect, '[entanglement]', '[silent]');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor, pokemon, source);
				if (damage) {
					this.add('-anim', source, "Dream Eater", pokemon);
					this.add('-anim', source, "Ingrain", source);
					let fakeSeed = {name: 'Leech Seed', id: 'leechseed'}; // silent visual + Big Root compatibility
					this.heal(damage, source, pokemon, fakeSeed);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, this.effectState.sourceEffect, '[entanglement]');
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source?.isActive) pokemon.tryTrap();
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Anchor Shot", target);
			this.add('-anim', source, "Embargo", target);
			this.add('-anim', source, "Embargo", source);
		},
		onHit(target, source, move) {
			source.addVolatile('trapped', target, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		shortDesc: "Traps user + target; pseudo Leech Seed.",
	},
	myceliate: {
		num: -11,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Myceliate",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Infestation", target);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {basePower: 160},
		contestType: "Clever",
		shortDesc: "Doubles BP if the target is statused.",
	},
	dispersion: {
		num: -12,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Dispersion",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyType(move, pokemon) {
			if (pokemon.m.scaleshift) move.type = pokemon.m.scaleshift;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Silver Wind", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Beautiful",
		shortDesc: "Spread + changes type to match Scale Shift.",
	},

	// Slate 2

	wallow: {
		num: -13,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Wallow",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		overrideOffensiveStat: 'spd',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Sport", source);
			this.add('-anim', source, "Liquidation", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Water",
		shortDesc: "Damage based on Sp. Def. Boosts Sp. Def after use.",
	},
	pranceandpierce: {
		num: -14,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Prance and Pierce",
		pp: 10,
		priority: 0,
		flags: {contact: 1, bite: 1, allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		secondary: {
			chance: 100,
			status: 'psn',
		},
		onTry(source, target) {
			if (this.canSwitch(source.side)) {
				if (!target.side.addSlotCondition(target, 'pranceandpierce')) return false;
				Object.assign(target.side.slotConditions[target.position]['pranceandpierce'], {
					duration: 3,
					move: 'pranceandpierce',
					source: source,
					sourcePosition: source.position,
					moveData: {
						id: 'pranceandpierce',
						name: "Prance and Pierce",
						accuracy: 100,
						basePower: 100,
						category: "Physical",
						priority: 0,
						flags: {contact: 1, bite: 1, allyanim: 1, metronome: 1, futuremove: 1},
						selfSwitch: false,
						ignoreImmunity: false,
						effectType: 'Move',
						secondary: {
							chance: 100,
							status: 'psn',
						},
						type: 'Ghost',
					},
				});
				for (const side of this.sides) {
					for (const active of side.active) {
						active.switchFlag = false;
					}
				}
				source.switchFlag = true;
				this.add('-message', `${source.illusion ? source.illusion.name : source.name} pranced away... for now!`);
			} else {
				return false;
			}
			return this.NOT_FAIL;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bounce", source);
		},
		condition: {
			// this is a slot condition
			name: 'pranceandpierce',
			duration: 3,
			onResidualOrder: 3,
			onEnd(target) {
				const data = this.effectState;
				const source = data.source;
				const move = this.dex.moves.get(data.move);
				if (target.fainted || target === data.source) {
					this.hint(`${move.name} did not hit because the target is ${(target.fainted ? 'fainted' : 'the user')}.`);
					return;
				}
				if (source && !source.isActive && source.hp && this.canSwitch(source.side)) {
					this.actions.switchIn(source, data.sourcePosition);
					this.add('-message', `${source.illusion ? source.illusion.name : source.name} pranced back onto the field!`);
				}
				this.add('-message', `${target.illusion ? target.illusion.name : target.name} was pierced by the Prance and Pierce attack!`);
				this.attrLastMove('[still]');
				if (source.isActive) {
					this.add('-anim', source, "Super Fang", target);
				} else {
					this.add('-anim', target, "Super Fang", target);
				}
				target.removeVolatile('Protect');
				target.removeVolatile('Endure');
	
				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
					data.moveData.infiltrates = true;
				}
				if (data.source.hasAbility('normalize') && this.gen >= 6) {
					data.moveData.type = 'Normal';
				}
				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
	
				this.actions.trySpreadMoveHit([target], data.source, hitMove, true);
				if (data.source.isActive && data.source.hasItem('lifeorb') && this.gen >= 5) {
					this.singleEvent('AfterMoveSecondarySelf', data.source.getItem(), data.source.itemState, data.source, target, data.source.getItem());
				}
				this.activeMove = null;
	
				this.checkWin();
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
		shortDesc: "User pivots out, then comes back in to attack two turns later. Poisons target.",
	},
	grandfinale: {
		num: -15,
		accuracy: 90,
		basePower: 25,
		basePowerCallback(pokemon, target, move) {
			if (move.hit === 3) move.selfSwitch = true; // I hope this works
			return 25 * move.hit;
		},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Fire')) return;
			this.add('-fail', pokemon, 'move: Grand Finale');
			this.attrLastMove('[still]');
			return null;
		},
		onAfterMove(pokemon) {
			pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
			this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Burn Up'); // I think this still needs Burn Up's message
		},
		category: "Physical",
		name: "Grand Finale",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wish", source);
			this.add('-anim', source, "Mind Blown", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
		shortDesc: "Hits up to 3 times (25 -> 50 -> 75). Removes Fire type; if hits all 3, pivots out.",
	},
	slimecannon: {
		num: -16,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Slime Cannon",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				const targets: Pokemon[] = [];
				for (const valid of this.getAllActive()) {
					targets.push(valid);
					// not going to care about being adjacent because there are no Triples right now and it seems like it stops counting when the target faints
				}
				if (!targets.length) return;
				if (targets.length > 1) {
					 this.add('-message', `Everyone was covered in slime!`);
				}
				for (const debuff of targets) {
					if (targets.length === 1) this.add('-message', `${debuff.illusion ? debuff.illusion.name : debuff.name} was covered in slime!`);
					this.boost({atk: -1, spa: -1}, debuff, pokemon);
				}
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Downpour", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
		shortDesc: "If target is KOed, -1 to everyone's Attack and Sp. Atk.",
	},
	totaleclipse: {
		num: -17,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Total Eclipse",
		pp: 10,
		priority: 3,
		flags: {bypasssub: 1, noassist: 1, failcopycat: 1, allyanim: 1, cantusetwice: 1},
		onHit(target, source) {
			const stolenBoosts: Partial<BoostsTable> = {};
			let i: BoostID;
			for (i in target.boosts) stolenBoosts[i] = target.boosts[i];
			if (Object.keys(stolenBoosts).length > 0) {
				this.boost(stolenBoosts, source);
				target.clearBoosts();
				this.add('-clearboost', target);
			}
			if (target.addVolatile('totaleclipse')) this.add('-message', `${source.illusion ? source.illusion.name : source.name} will take damage for ${target.illusion ? target.illusion.name : target.name} this turn!`);
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Black Hole Eclipse", target);
		},
		secondary: null,
		condition: {
			duration: 1,
			onDamage(damage, target, source, effect) {
				if (effect.effectType === 'Move' && this.effectState.source.isActive && this.effectState.source.hp) {
					this.add('-message', `${this.effectState.source.illusion ? this.effectState.source.illusion.name : this.effectState.source.name} took damage for ${target.illusion ? target.illusion.name : target.name}!`);
					this.damage(damage, this.effectState.source, source, effect);
					return false;
				}
			},
		},
		target: "adjacentAlly",
		type: "Dark",
		zMove: {effect: 'heal'},
		contestType: "Clever",
		shortDesc: "Steals ally's boosts, then takes damage for the ally. Can't use consecutively.",
	},
	flowingflare: {
		num: -18,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let ratio = Math.floor(pokemon.getStat('spe') / target.getStat('spe'));
			if (!isFinite(ratio)) ratio = 0;
			const bp = [40, 60, 80, 120, 180][Math.min(ratio, 4)];
			this.debug('BP: ' + bp);
			return bp;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		category: "Special",
		name: "Flowing Flare",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flamethrower", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
		shortDesc: "Atk > SpA: physical. Stronger the faster the user is than the target (180 max).",
	},
	paranoia: {
		num: -19,
		accuracy: 95,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(target.getUndynamaxedHP() / 4, 1);
		},
		category: "Special",
		name: "Paranoia",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "First Impression", target);
			this.add('-anim', source, "Infestation", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				const bestStat = target.getBestStat(false, true);
				this.boost({[bestStat]: -1}, target);
			},
		},
		target: "allAdjacentFoes",
		type: "Bug",
		contestType: "Clever",
		shortDesc: "Damage is 1/4 of target's HP. Lowers target's best stat.",
	},
	psykick: {
		num: -20,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Psykick",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic Noise", target);
			this.add('-anim', source, "Low Kick", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'torment',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		shortDesc: "Inflicts Torment.",
	},
	empathicpulse: {
		num: -21,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Empathic Pulse",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, pulse: 1},
		onTryHit(target, source, move) {
			if (!source.status) return false;
			move.status = source.status;
		},
		self: {
			onHit(pokemon) {
				const bestStat = pokemon.getBestStat(false, true);
				if (pokemon.cureStatus()) this.boost({[bestStat]: 1}, pokemon);
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heal Pulse", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		zMove: {boost: {spa: 2}},
		contestType: "Clever",
		shortDesc: "Passes status to adjacent foes, then raises most proficient stat.",
	},

// modded canon moves

	defog: {
		inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('ClearFuse', pokemon)) success = true;
			}
			return success;
		},
	},
	gmaxwindrage: {
		inherit: true,
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
				for (const pokemon of this.getAllActive()) {
					if (this.runEvent('ClearFuse', pokemon)) success = true;
				}
				return success;
			},
		},
	},
	mortalspin: {
		inherit: true,
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
				this.runEvent('ClearFuse', pokemon);
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
				this.runEvent('ClearFuse', pokemon);
			}
		},
	},
	rapidspin: {
		inherit: true,
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
				this.runEvent('ClearFuse', pokemon);
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
				this.runEvent('ClearFuse', pokemon);
			}
		},
	},
	tidyup: {
		inherit: true,
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('ClearFuse', pokemon)) success = true;
			}
			if (success) this.add('-activate', pokemon, 'move: Tidy Up');
			return !!this.boost({atk: 1, spe: 1}, pokemon, pokemon, null, false, true) || success;
		},
	},
};
