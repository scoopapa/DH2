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
			this.add('-anim', source, "Haze", target);
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
			this.add('-start', target, 'typeadd', 'Ice', '[from] move: Freeze Tag');
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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aurora Beam", target);
		},
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
		flags: {protect: 1, mirror: 1, heal: 1},
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
				if (!this.activeMove || !this.activeMove.id || this.activeMove.id !== 'renewingring') return false;
				this.effectState.hp = this.activeMove.totalDamage / 2; // please work
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
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
			this.add('-anim', source, "Wish", source);
			// this might be silly I'll see how it looks
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
	blowfuse: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Blow Fuse",
		pp: 20,
		priority: 4,
		flags: {reflectable: 1, metronome: 1},
		slotCondition: 'blowfuse',
		condition: {
			onAnyAfterMoveSecondarySelf(target, source, move) {
				if (move.id === 'tidyup' || move.id === 'defog' || move.id === 'gmaxwindrage') {
					this.effectState.side.removeSlotCondition(source, 'blowfuse');
				}
				if (move.id === 'rapidspin' || move.id === 'mortalspin') {
					source.side.removeSlotCondition(source, 'blowfuse');
				}
			},
			onAfterMoveSecondarySelf(source, target, move) {
				if (move.category === 'Physical' && source.isGrounded() && !source.hasType('Electric') && move.id !== 'rapidspin' && move.id !== 'mortalspin') {
					source.setStatus('brn', source, move);
				}
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Astonish", source);
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
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Soul-Stealing 7-Star Strike", source);
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
	entanglement: { // stolen from Blue thanks--
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
			onStart(target) {
				this.add('-start', target, 'move: Entanglement');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['entanglement'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to drain');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nasty Plot");
			this.add('-anim', source, "Dream Eater", target);
		},
		onHit(target, source, move) {
			source.addVolatile('trapped', target, move, 'trapper');
			target.addVolatile('trapped', source, move, 'trapper');
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
};
