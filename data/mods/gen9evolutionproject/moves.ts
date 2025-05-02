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
