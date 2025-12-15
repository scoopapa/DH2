export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	dimensionalcape: {
		num: -14,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dimensional Cape",
		shortDesc: "Switches and makes incoming ally immune to entry hazards.",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Phantom Force", source);
			this.add('-anim', source, "Teleport", source);
		},
		slotCondition: 'dimensionalcape',
		condition: {
			duration: 1,
			onSwap(target) {
				if (!target.fainted) {
					// hazardshield implemented within conditions.ts
					target.addVolatile('hazardshield');
				}
				target.side.removeSlotCondition(target, 'dimensionalcape');
			},
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Dark",
		contestType: "Cool",
	},
	bigbash: {
		accuracy: 100,
		basePower: 68,
		category: "Physical",
		name: "Big Bash",
		shortDesc: "Guaranteed crit if either Pokemon used Big Button.",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Pulverizing Pancake", target);
		},
		onModifyMove(move, pokemon, target) {
			if(pokemon.volatiles['bigbutton'] || target.volatiles['bigbutton']) move.willCrit = true;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	epicbeam: {
		name: "Epic Beam",
		type: "Ice",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 40,
		shortDesc: "Epic Beam",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTry(source) {
			if (source.side.pokemonLeft > 1) return;
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Epic Beam');
			return null;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Prismatic Laser", target);
		},
		onModifyMove(move, pokemon, target) {
			move.category = 'Special';
			move.basePower = 300;
		},
		onAfterHit(target, source) {
			source.side.addSlotCondition(source, 'epicbeam');
		},
		// wtf
		selfSwitch: true,
		condition: {
			duration: 1,
			// sacrificing implemented in side.ts, kind of
		},
		secondary: null,
		target: "normal",
	},
	fisheater: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fish Eater",
		shortDesc: "-50% foe's fishing tokens; 1/16 heal, +1 stockpile each.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Life Dew", pokemon);
		},
		onTry(source, target) {
			return (target.side.fishingTokens && target.side.fishingTokens > 0);
		},
		onHit(target, source, move) {
			if (!target.side.fishingTokens || target.side.fishingTokens <= 0 || source.volatiles['stockpile3']) return false;
			const tokens = Math.ceil(target.side.fishingTokens / 2);
			const success = target.side.removeFishingTokens(tokens);
			if (success) {
				for (let i = 0; i < Math.min(3, tokens); i ++) {
					source.addVolatile('stockpile');
				}
				this.heal(Math.ceil(source.maxhp * tokens / 16), source);
			}
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	fishingterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fishing Terrain",
		shortDesc: "5 turns. Grounded: +Fishing power, Fishing tokens +1 on fishing move.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'fishingterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				let mod = 1;
				if (attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					if(move.flags['fishing']) mod *= 1.3;
				}
				return this.chainModify(mod);
			},
			onAfterMove(target, source, move) {
				if (move.flags['fishing']) target.side.addFishingTokens(1);
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Fishing Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Fishing Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Fishing Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
	},
	moltenglaze: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Makes foe(s) weaker to Fire.",
		name: "Molten Glaze",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('tarshot');
			},
		},
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Clever",
	},
	gofish: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Go Fish",
		shortDesc: "Spends 1 token to switch target. Fails if target is not attacking.",
		pp: 5,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, fishing: 1,},
		forceSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge'] || !source.side.removeFishingTokens(1)) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	fishanddip: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fish and Dip",
		shortDesc: "Sets 1 Fishing Token on the user's side. User switches out.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Life Dew", pokemon);
		},
		onHit(target, source, move) {
			source.side.addFishingTokens(1);
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Water",
	},
	fishmortar: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Fish Mortar",
		shortDesc: "Hits two turns after being used.",
		pp: 10,
		priority: 0,
		flags: { allyanim: 1, metronome: 1, futuremove: 1 },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'fishmortar',
				source,
				moveData: {
					id: 'fishmortar',
					name: "Fish Mortar",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Water',
				},
			});
			this.add('-start', source, 'move: Fish Mortar');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
  	fishingminigame: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Fishing Minigame",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, fishing: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Anchor Shot", target);
		},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},
	goombastomp: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Goomba Stomp",
		shortDesc: "100% chance for -1 Defense. OHKOs Goomba.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, foot: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "High Jump Kick", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		onModifyMove(move, pokemon) {
			for (const target of pokemon.foes()) {
				if (target.baseSpecies == "Goomba") {
					if (target.volatiles['bigbutton']) {
						basePower = 0;
						damageCallback = function (target) {
							return this.clampIntRange(target.getUndynamaxedHP() / 3, 1);
						}
					} else {
						move.ohko = true;
						move.accuracy = true;
					}
				}
			}
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	gorgingmissile: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Gorging Missile",
		shortDesc: "If user is under 50% max HP, paralyzes the opponent.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, fishing: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Snipe Shot", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				move.status = 'par';
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	yoshisisland: {
		name: "Yoshi\'s Island",
		type: "Normal",
		category: "Physical",
		basePower: 180,
		accuracy: 100,
		pp: 5,
		shortDesc: "Hits all adjacent Pokemon. User faints and gains 3 Fishing Tokens.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfdestruct: "always",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Explosion", target);
		},
		onAfterHit(target, source) {
			source.side.addFishingTokens(3);
		},
		onAfterSubDamage(damage, target, source) {
			source.side.addFishingTokens(3);
		},
		secondary: null,
		target: "normal",
	},
	zekromkick: {
		name: "Zekrom Kick",
		type: "Dragon",
		category: "Physical",
		basePower: 45,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.id === 'zekrom') return move.basePower * 2;
			return move.basePower;
		},
		accuracy: 100,
		pp: 15,
		shortDesc: "Zekrom: 2x power. Else transforms into Zekrom.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, foot: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thunderous Kick", target);
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|shut up idiot ジェイ絵ジェ (ZEKROM KICK)`);
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (target.species.id !== 'zekrom') target.formeChange('Zekrom', this.effect, false, '0', '[msg]');
		},
		secondary: null,
		target: "normal",
	},
	roaroftime: {
		num: 459,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Raises user's SpA by 1 when attacked before it moves.",
		name: "Roar of Time",
		pp: 5,
		priority: -3,
		flags: {protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('roaroftime');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Roar of Time');
			},
			onDamagingHit(damage, target, source, move) {
				this.boost({spa: 1}, target, source, undefined, true);
				this.add('-activate', target, 'move: Roar of Time');
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('roaroftime');
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	golemstrike: {
		num: -35,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Golem Strike",
		pp: 10,
		shortDesc: "10% chance to lower target's Def",
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Wrecker", target);
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	natureswrath: {
		num: -61,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Either Grass or Ground-type, whichever is more effective. Heals user by 12.5% of damage dealt.",
		name: "Nature's Wrath",
		pp: 10,
		flags: { protect: 1, mirror: 1, heal: 1, metronome: 1 },
		drain: [1, 8],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leaf Storm", target);
		},
		onModifyType(move, pokemon) {
			for (const target of pokemon.side.foe.active) {
				const type1 = 'Grass';
				const type2 = 'Ground';
				if (this.dex.getEffectiveness(type1, target) < this.dex.getEffectiveness(type2, target)) {
					move.type = 'Ground';
				} else if (target.hasType('Flying') || target.hasAbility('eartheater') || target.hasAbility('levitate')) {
					move.type = 'Grass';
				} else if (target.hasAbility('sapsipper')) {
					move.type = 'Ground';
				} else if (this.dex.getEffectiveness(type1, target) === this.dex.getEffectiveness(type2, target)) {
					if (pokemon.hasType('Ground') && !pokemon.hasType('Grass')) {
						move.type = 'Ground';
					}
				}
			}
		},
		onHit(target, source, move) {
			this.add('-message', `Nature's Wrath dealt ${move.type}-type damage!`);
		},
		priority: 0,
		secondary: null,
		target: "any",
		type: "Grass",
		zMove: { basePower: 170 },
		contestType: "Tough",
	},
	ragingtorrent: {
		num: 612,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Raging Torrent",
      shortDesc: "Lowers the target's Atk by 1. Inflicts Encore on the user.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
		   volatileStatus: 'encore',
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Liquidation", target);
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
	},
	teratriplebasedballbarrage: {
		name: "Tera Triple Basedball Barrage",
		type: "Stellar",
		category: "Physical",
		basePower: 1,
		accuracy: true,
		pp: 1,
		shortDesc: "",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Astral Barrage", target);
		},
		isZ: "stellariumz",
		secondary: null,
		target: "normal",
	},
	tacklemr: {
		num: 33,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "No additional effect.",
		name: "Tackle-MR",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tackle", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	rapidspinmr: {
		num: 229,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		shortDesc: "Frees user from hazards/bind/Leech Seed.",
		name: "Rapid Spin-MR",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rapid Spin", target);
		},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	'5bigdooms': {
		accuracy: 100,
		basePower: 28,
		category: "Special",
		name: "5 Big Dooms",
		shortDesc: "Hits 5 times, 2 turns after being used.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, futuremove: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: '5bigdooms',
				source: source,
				moveData: {
					id: '5bigdooms',
					name: "5 Big Dooms",
					accuracy: 100,
					basePower: 28,
					category: "Special",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					multihit: 5,
					effectType: 'Move',
					type: 'Dark',
				},
			});
			this.add('-start', source, '5 Big Dooms');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	youwantfun: {
		name: "You Want Fun?!",
		type: "Dark",
		category: "Physical",
		basePower: 65,
		accuracy: 95,
		pp: 10,
		shortDesc: "Forces the target to switch to a random ally.",
		priority: -6,
		flags: {protect: 1, mirror: 1, metronome: 1},
		forceSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Pursuit", target);
		},
		secondary: null,
		target: "normal",
	},
	incinerateironfist: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Incinerate (Iron Fist)",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Incinerate", target);
		},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				let item = target.item;
				const nonBurn = ['Never-Melt Ice', 'Charcoal', 'Magmarizer', 'Dragon Fang', 'Dragon Scale', 'Damp Rock', 'Smooth Rock', 'Heat Rock', 'Insect Plate', 'Dread Plate', 'Draco Plate', 'Zap Plate', 'Flame Plate', 'Fist Plate', 'Sky Plate', 'Pixie Plate', 'Spooky Plate', 'Meadow Plate', 'Earth Plate', 'Icicle Plate', 'Toxic Plate', 'Stone Plate', 'Iron Plate', 'Splash Plate', 'Light Ball', 'Metal Powder', 'Quick Powder', 'Deep Sea Scale', 'Deep Sea Tooth', 'Thick Club', 'Protective Pads'];
				if (!nonBurn.includes(target.item)) item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Incinerate', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	wickedblow: {
		inherit: true,
		basePower: 120,
		desc: "Cannot be selected the turn after it's used.",
		shortDesc: "Cannot be selected the turn after it's used.",
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, cantusetwice: 1},
		willCrit: null,
	},
	lunardust: {
		num: -17,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		shortDesc: "Clears terrain and can't be used twice.",
		name: "Lunar Dust",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		onAfterHit(target, source) {
			if (source.hp) {
				this.field.clearTerrain();
			}
		},
		onAfterSubDamage(damage, target, source) {
			if (source.hp) {
				this.field.clearTerrain();
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
    kleptomania: {
      num: -552,
		accuracy: 100,
		basePower: 50,
      basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
         if (pokemon.timesStolen) bp += 150 * pokemon.timesStolen
			this.debug("BP: " + bp);
			return bp;
		},
		category: "Physical",
		name: "Kleptomania",
      shortDesc: "+150 BP each time the user has stolen an item.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
      onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
         this.add('-anim', source, 'Nasty Plot', target);
      	this.add('-anim', source, 'Punishment', target);
		},
		target: "normal",
		type: "Dark",
    },
	calamityquake: {
		num: -1,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Calamity Quake",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Precipice Blades", target);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Cool",
		desc: "Has a 30% chance to Poison the target.",
		shortDesc: "30% chance to poison the target.",
	},
	orbofdiscord: {
		num: -26,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Orb of Discord",
		shortDesc: "Inflicts Heal Block for 2 turns. User switches.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		onHit(target, source, move) {
			const success = target.addVolatile('healblock', source, move);
			if (!success) {
				delete move.selfSwitch;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	grassyglideage: {
		num: 803,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Grassy Glide (AGE)",
		shortDesc: "User on Grassy Terrain: +1 priority.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grassy Glide", target);
		},
		onModifyPriority(priority, source, target, move) {
			if (this.field.isTerrain('grassyterrain') && source.isGrounded()) {
				return priority + 1;
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	milkdrinkage: {
		num: 208,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Milk Drink (AGE)",
		shortDesc: "Heals the user by 50% of its max HP.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Milk Drink", target);
		},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	stormthrowvaporemons: {
		num: 480,
		accuracy: true,
		basePower: 70,
		category: "Physical",
	   shortDesc: "Always results in a critical hit.",
		isNonstandard: null,
		viable: true,
		name: "Storm Throw (VaporeMons)",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Storm Throw", target);
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	brickbreakvaporemons: {
		num: 280,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
	   shortDesc: "Destroys screens, unless the target is immune.",
		name: "Brick Break (VaporeMons)",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Brick Break", target);
		},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	sledgehammerblow: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
	   shortDesc: "Destroys screens, unless the target is immune.",
		name: "Sledgehammer Blow",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gigaton Hammer", target);
		},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Clever",
	},
	lashoutvaporemons: {
		num: 808,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
	   shortDesc: "2x power if the user has negative stat changes or a status.",
		name: "Lash Out (VaporeMons)",
		viable: true,
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon) {
			const negativeVolatiles = ['confusion', 'taunt', 'torment', 'trapped', 'partiallytrapped', 'leechseed', 'sandspit',
				'attract', 'curse', 'disable', 'electrify', 'embargo', 'encore', 'foresight', 'gastroacid', 'foresight', 'miracleeye',
				'glaiverush', 'healblock', 'throatchop', 'windbreaker', 'nightmare', 'octolock', 'powder', 'saltcure', 'smackdown',
				'syrupbomb', 'tarshot', 'telekinesis', 'yawn'];
			let i: BoostID;
			for (i in pokemon.boosts) {
				for (const volatile of negativeVolatiles) {
					if (pokemon.status && pokemon.status !== 'brn' || pokemon.volatiles[volatile] || pokemon.boosts[i] < 0) {
						return this.chainModify(2);
					} else if (pokemon.status === 'brn') {
						return this.chainModify(4);
					}
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	soulwind: {
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if(target.hasType('Ghost')) {
				this.debug("BP doubled against Ghost");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Soul Wind",
		shortDesc: "Deals double damage to Ghost-types.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Silver Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	restglacemons: {
		num: 156,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User sleeps 2 turns and restores HP and status.",
		name: "Rest (GlaceMons)",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Rest", target);
		},
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
		target: "self",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	sleeptalkglacemons: {
		num: 214,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User must be asleep. Uses another known move.",
		desc: "(Can now select Rest) One of the user's known moves, besides this move, is selected for use at random. Fails if the user is not asleep. The selected move does not have PP deducted from it, and can currently have 0 PP. This move cannot select Assist, Beak Blast, Belch, Bide, Blazing Torque, Celebrate, Chatter, Combat Torque, Copycat, Dynamax Cannon, Focus Punch, Hold Hands, Magical Torque, Me First, Metronome, Mimic, Mirror Move, Nature Power, Noxious Torque, Shell Trap, Sketch, Sleep Talk, Struggle, Uproar, Wicked Torque, or any two-turn move.",
		name: "Sleep Talk (GlaceMons)",
		pp: 10,
		priority: 0,
		flags: {failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
		sleepUsable: true,
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Sleep Talk", target);
		},
		onTry(source) {
			return source.status === 'slp' || source.hasAbility('comatose');
		},
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
		callsMove: true,
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'crit2'},
		contestType: "Cute",
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
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		desc: "Has a 10% chance to freeze the target.",
		shortDesc: "10% chance to freeze the target.",
	},
	icefangglacemons: {
		num: 423,
		accuracy: 95,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Ice Fang damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Ice Fang NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		desc: "Power is 1.5x if user moves before the target. Has a 10% chance to freeze the target.",
		shortDesc: "1.5x power if user moves before target. 10% freeze.",
		name: "Ice Fang (GlaceMons)",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Fang", target);
		},
		secondaries: [
			{
				chance: 10,
				status: 'frz',
			},
		],
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	slackoffglacemons: {
		num: 303,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the user by 50% of its max HP.",
		name: "Slack Off (GlaceMons)",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slack Off", target);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
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
	tripleaxelglacemons: {
		num: 813,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		desc: "Can't miss in Snow. Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "3 hits; can miss, but power rises. Snow = no miss.",
		name: "Triple Axel (GlaceMons)",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Triple Axel", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	synchronoiseglacemons: {
		num: 485,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "Changes user's type to that of the target after hit.",
		name: "Synchronoise (GlaceMons)",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Synchronoise", target);
		},
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
		secondary: null,
		target: "allAdjacent",
		type: "Psychic",
		contestType: "Clever",
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
	thunderrush: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Thunder Rush",
		shortDesc: "Always crits.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Supercell Slam", target);
      },
	},
	milkdrinkmr: {
		num: 208,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Milk Drink-MR",
		shortDesc: "Heals the user by 50% of its max HP.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Milk Drink", target);
		},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	megapunchmhou: {
		num: 5,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		name: "Mega Punch (MHOU)",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mega Punch", target);
		},
	},
	megakickmhou: {
		num: 25,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		name: "Mega Kick (MHOU)",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mega Kick", target);
		},
	},
	crushclawmhou: {
		num: 306,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "50% chance to lower the target's Defense by 1.",
		shortDesc: "50% chance to lower the target's Defense by 1.",
		name: "Crush Claw (MHOU)",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	firefangmhou: {
		num: 424,
		accuracy: 95,
		basePower: 70,
		category: "Physical",
		desc: "10% chance to burn. 10% chance to flinch.",
		shortDesc: "10% chance to burn. 10% chance to flinch.",
		name: "Fire Fang (MHOU)",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Fang", target);
		},
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	icefangmhou: {
		num: 423,
		accuracy: 95,
		basePower: 70,
		category: "Physical",
		desc: "10% chance to freeze. 10% chance to flinch.",
		shortDesc: "10% chance to freeze. 10% chance to flinch.",
		name: "Ice Fang (MHOU)",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Fang", target);
		},
		secondaries: [
			{
				chance: 10,
				status: 'frz',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	thunderfangmhou: {
		num: 422,
		accuracy: 95,
		basePower: 70,
		category: "Physical",
		desc: "10% chance to paralyze. 10% chance to flinch.",
		shortDesc: "10% chance to paralyze. 10% chance to flinch.",
		name: "Thunder Fang (MHOU)",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder Fang", target);
		},
		secondaries: [
			{
				chance: 10,
				status: 'par',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	irontailmhou: {
		num: 231,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "30% chance to lower the target's Defense by 1.",
		shortDesc: "30% chance to lower the target's Defense by 1.",
		name: "Iron Tail (MHOU)",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Tail", target);
		},
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	parabolicchargemhou: {
		num: 570,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "User recovers 50% of the damage dealt.",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Parabolic Charge (MHOU)",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Parabolic Charge", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "allAdjacent",
		type: "Electric",
		contestType: "Clever",
	},
	swiftmhou: {
		num: 129,
		accuracy: true,
		basePower: 60,
		category: "Special",
		desc: "Does not check accuracy. Usually goes first.",
		shortDesc: "Does not check accuracy. Usually goes first.",
		name: "Swift (MHOU)",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Swift", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Cool",
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
	parabolicchargeglacemons: {
		num: 570,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "User recovers 50% of the damage dealt.",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Parabolic Charge (GlaceMons)",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Parabolic Charge", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "allAdjacent",
		type: "Electric",
		contestType: "Clever",
	},
	paranoia: {
		num: -7,  
		accuracy: 95,  
		basePower: 0,  
		damageCallback(pokemon, target) {
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 4), 1);
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic", target);
		},
		onHit(target, source) {
			if (!target) return;		
			// Determine the best stat of the target
			const bestStat = target.getBestStat(false, true) as keyof BoostsTable;
			// Create boosts object to lower the best stat
			const boosts: Partial<BoostsTable> = {};
			boosts[bestStat] = -1;
			this.boost(boosts, target);
		},
		shortDesc: "Quarters targets' HP + lowers best stat.",
		name: "Paranoia",  
		category: "Special",
		pp: 10,  
		priority: 0,  
		flags: {protect: 1, mirror: 1},
		secondary: {},  
		target: "allAdjacentFoes",  
		type: "Bug",  
		contestType: "Clever", 
	},
	joyride: {
		num: 1007,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Joyride",
		shortDesc: "Crits are boosted in power after use. User crashes if dodged.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Agility', source);
			this.add('-anim', source, 'Play Rough', target);
		},
		onAfterHit(target, source) {
			source.addVolatile('joyride');
		},
		condition: {
			onStart(target, source, effect) {
				if (target.volatiles['dragoncheer']) return false;
				if (effect?.id === 'zpower') {
					this.add('-start', target, 'move: Joyride', '[zeffect]');
				} else if (effect && (['costar', 'imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Joyride', '[silent]');
				} else {
					this.add('-start', target, 'move: Joyride');
				}
				this.add('-message', `${target.name} is feeling full of energy!`);
			},
			onModifyDamage(damage, source, target, move) {
				if (target.getMoveHitData(move).crit) {
					this.debug('Joyride boost');
					return this.chainModify(1.5);
				}
			},
		},
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Joyride'));
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	haywirecudgel: {
		num: 1006,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "High Critical hit ratio. Electric if Ogerpon-Costar.",
		name: "Haywire Cudgel",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			if (move.type !== "Normal") {
				this.attrLastMove('[anim] Thunderbolt')
			}
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Ogerpon-Costar':
				move.type = 'Electric';
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	healingstones: {
		num: -191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets healing stones on the user's side, healing Pokemon that switch in for 1/8th of their max HP.",
		shortDesc: "Heals allies on switch-in.",
		viable: true,
		name: "Healing Stones",
		pp: 20,
		priority: 0,
		flags: {nonsky: 1, heal: 1, snatch: 1},
		sideCondition: 'healingstones',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stealth Rock", target);
		},
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'Healing Stones');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 1) return false;
				this.add('-sidestart', side, 'Healing Stones');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('overcoat') ||
					pokemon.hasItem('dancingshoes') || pokemon.hasItem('mantisclaw')) return;
				let healAmounts = [0, 3]; // 1/8
				this.heal(healAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fairy",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
	lifedewvaporemons: {
		num: 791,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User: healed 1/3 max HP. Next switch-in: healed 1/4 max HP.",
		viable: true,
		name: "Life Dew (VaporeMons)",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, bypasssub: 1},
		heal: [1, 3],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Life Dew", target);
		},
		slotCondition: 'lifedewvaporemons',
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					  const source = this.effectState.source;
					  const damage = this.heal(target.baseMaxhp / 4, target, target);
					  if (damage) this.add('-heal', target, target.getHealth, '[from] move: Life Dew', '[of] ' + this.effectState.source);
					  target.side.removeSlotCondition(target, 'lifedewvaporemons');
				 }
			},
	   },
		secondary: null,
		target: "self",
		type: "Water",
	},
	peekaboo: {
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		shortDesc: "Deal halved damage if the user takes damage before it hits.",
		name: "Peekaboo",
		pp: 20,
		priority: -3,
		flags: {contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heart Stamp", target);
		},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('peekaboo');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Peekaboo');
			},
			onHit(pokemon, source, move) {
				if (move.category !== 'Status') {
					this.effectState.lostSurprise = true;
				}
			},
			onBasePower(basePower, pokemon) {
				if (pokemon.volatiles['peekaboo']?.lostSurprise) {
					this.debug('halved power');
					return this.chainModify(0.5);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	psychicnoisevaporemons: {
		num: 917,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		shortDesc: "For 5 turns, the target is prevented from healing.",
		name: "Psychic Noise (VaporeMons)",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic Noise", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'healblock',
		},
		target: "normal",
		type: "Psychic",
	},
	gunpowder: {
		num: -2303,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Gunpowder",
		shortDesc: "No additional effects.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, powder: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Burn Up", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	// collateral
	gravity: {
		num: 356,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gravity",
		pp: 5,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		pseudoWeather: 'gravity',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('newtonsapple')) {
						return 8;
					}
					return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Gravity', '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Gravity');
				}
				for (const pokemon of this.getAllActive()) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.queue.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.queue.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy(accuracy) {
				if (typeof accuracy !== 'number') return;
				return this.chainModify([6840, 4096]);
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onModifyDamage(damage, source, target, move) {
				if (move.id === 'gravitonwave') {
					this.debug('Graviton Wave boost');
					return this.chainModify(1.5);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	stockpile: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(target, source, effect) {
				this.effectState.layers = 1;
				this.effectState.def = 0;
				this.effectState.spd = 0;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
				if (effect.id === 'fisheater') return;
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onRestart(target, source, effect) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
				if (effect.id === 'fisheater') return;
				const curDef = target.boosts.def;
				const curSpD = target.boosts.spd;
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onEnd(target) {
				if (this.effectState.def || this.effectState.spd) {
					const boosts: SparseBoostsTable = {};
					if (this.effectState.def) boosts.def = this.effectState.def;
					if (this.effectState.spd) boosts.spd = this.effectState.spd;
					this.boost(boosts, target, target);
				}
				this.add('-end', target, 'Stockpile');
				if (this.effectState.def !== this.effectState.layers * -1 || this.effectState.spd !== this.effectState.layers * -1) {
					this.hint("In Gen 7, Stockpile keeps track of how many times it successfully altered each stat individually.");
				}
			},
		},
	},
	naturepower: {
		inherit: true,
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			} else if (this.field.isTerrain('fishingterrain')) {
				move = 'fishingminigame';
			} else if (this.field.isTerrain('frigidterrain')) {
				move = 'icebeam';
			}
			this.actions.useMove(move, pokemon, {target});
			return null;
		},
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else if (this.field.isTerrain('fishingterrain')) {
				move.secondaries.push({
					chance: 100,
					onHit(target, source, move) {
						source.side.addFishingTokens(1);
					},
				});
			} else if (this.field.isTerrain('frigidterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'frz',
				});
			} 
		},
	},
	terrainpulse: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			case 'fishingterrain':
				move.type = 'Water';
				break;
			case 'frigidterrain':
				move.type = 'Ice';
				break;
			}
		},
	},
	// dynamax stuff
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
	thundercage: {
		inherit: true,
		accuracy: 100,
		basePower: 100,
		pp: 10,
	},
// Max and GMax Moves
	gmaxbefuddle: {
		num: 1000,
		accuracy: true,
		basePower: 140,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If the target uses a Fire-type move in the next 3 turns, it is prevented from executing and the target loses 1/4 of its maximum HP, rounded half up. This effect does not happen if the Fire-type move is prevented by Primordial Sea.",
		shortDesc: "For 3 turns, if the target uses a Fire move, it loses 1/4 max HP.",
		name: "G-Max Befuddle",
		pp: 5,
		priority: 0,
		flags: {},
		volatileStatus: 'powder',
		isMax: "Butterfree",
		secondary: null,
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
		desc: "If this move is successful, the user gains the Aqua Ring effect, healing it by 1/8 of its maximum HP, rounded down, and clears hazards, partial trapping, and Leech Seed from its side of the field.",
		shortDesc: "User gains the Aqua Ring effect, clears hazards/bind/Leech Seed.",
		name: "G-Max Cannonade",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Blastoise",
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: G-Max Cannonade', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: G-Max Cannonade', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: G-Max Cannonade', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: G-Max Cannonade', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
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
					pokemon.addVolatile('focusenergy');
				}
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
		basePower: 120,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful, each Pokemon on the opposing side loses 2 PP from its last move used, even if they have a substitute. This Pokemon heals the total PP of the target's moves * 2 in HP.",
		shortDesc: "'-2 PP for target. Heals total PP of target * 2 in HP.",
		name: "G-Max Depletion",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Duraludon",
		self: {
			onHit(source, target, sourceMove) {
				for (const pokemon of source.foes()) {
					let movePP = 0;
					for (const moveSlot of pokemon.moveSlots) {
						movePP += moveSlot.pp;
					}
					const damage = this.heal(movePP * 2, source, source);
					if (damage) {
						this.add('-heal', source, source.getHealth, '[from] move: G-Max Depletion');
					}
					
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
		basePower: 90,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		name: "G-Max Fireball",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Cinderace",
		selfSwitch: true,
		//ignoreAbility: true,
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
		basePower: 80,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "Fails if the target did not select a physical attack, special attack, or Me First for use this turn, or if the target moves before the user.",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
		name: "G-Max Hydrosnipe",
		pp: 5,
		priority: 1,
		flags: {},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		isMax: "Inteleon",
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
		basePower: 105,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "This move bypasses all protection effects, except Max Guard.",
		shortDesc: "Bypasses protection, except Max Guard.",
		name: "G-Max One Blow",
		pp: 5,
		priority: 0,
		flags: {punch: 1},
		isMax: "Urshifu",
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	gmaxrapidflow: {
		num: 1000,
		accuracy: true,
		basePower: 35,
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "Hits 3 times. This move bypasses all protection effects, except Max Guard.",
		shortDesc: "Hits 3 times. Bypasses protection, except Max Guard.",
		name: "G-Max Rapid Flow",
		pp: 5,
		priority: 0,
		flags: {punch: 1},
		onBasePower(basePower, pokemon, target) {
			return 35;
		},
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
		desc: "If this move is successful, the user restores its changes the target's item with an Iapapa Berry and consumes it, even if they have a substitute.",
		shortDesc: "Gives target an Iapapa Berry and consumes it.",
		name: "G-Max Replenish",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Snorlax",
		onAfterHit(target, source, move) { // placeholder - knocks the foe's item and heals lax
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: G-Max Replenish', '[of] ' + source);
					this.heal(source.maxhp / 4.5, source, source, move);
				}
			}
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
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the gmaxsnooze succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('G-Max Snooze damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		isNonstandard: "Gigantamax",
		desc: "If an opposing Pokemon switches out this turn, this move hits that Pokemon before it leaves the field, even if it was not the original target. If the user moves after an opponent using Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch, but not Baton Pass, it will hit that opponent before it leaves the field. Power doubles and no accuracy check is done if the user hits an opponent switching out, and the user's turn is over; if an opponent faints from this, the replacement Pokemon does not become active until the end of the turn.",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		name: "G-Max Snooze",
		pp: 5,
		priority: 0,
		flags: {},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('gmaxsnooze', pokemon);
				const data = side.getSideConditionData('gmaxsnooze');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('gmaxsnooze');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('G-Max Snooze start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: G-Max Snooze');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the G-Max Snooze user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					for (const [actionIndex, action] of this.queue.entries()) {
						if (action.pokemon === source && action.choice === 'runDynamax') {
							action.pokemon.addVolatile('dynamax');
							action.pokemon.side.dynamaxUsed = true;
							break;
						}
					}
					const snooze = this.dex.getActiveMove('gmaxsnooze');
					const falsesurrender = source.moveSlots.filter(m => m.id === 'falsesurrender');
					this.actions.useMove(snooze, source, pokemon);
					source.deductPP('gmaxsnooze', 1);
					
					//this.actions.runMove('gmaxsnooze', source, source.getLocOf(pokemon));
				}
			},
		},
		isMax: "Grimmsnarl",
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
		desc: "If this move is successful, the target becomes poisoned (if user is Toxtricity-Amped) or paralyzed (if user is Toxtricity-Low-Key), even if they have a substitute.",
		shortDesc: "Inflicts either poison or paralysis on target.",
		name: "G-Max Stun Shock",
		pp: 10,
		priority: 0,
		flags: {sound: 1},
		isMax: "Toxtricity",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					if (source.baseSpecies.forme === 'Low-Key') {
						pokemon.trySetStatus('par', source);
					} else {
						pokemon.trySetStatus('psn', source);
					}
				}
			},
		},
		onModifyMove(move, pokemon) {
			if (pokemon.species.name === 'Toxtricity') { 
				move.category = 'Physical';
			}
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
		desc: "If this move is successful, there is a 30% chance to poison the target, even if they have a substitute.",
		shortDesc: "30% chance to poison the target.",
		name: "G-Max Terror",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Gengar",
		self: {
			onHit(source) {
				for (const pokemon of source.foes()) {
					if (this.randomChance(3, 10)) {
						pokemon.trySetStatus('psn', source);
					}
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
		desc: "If this move is successful, the target becomes burned, even if they have a substitute. This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
		shortDesc: "Burns the target. Physical if Atk > SpA.",
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
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
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
		desc: "If this move is successful, the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain end, the effects of Reflect, Light Screen, Aurora Veil, Safeguard, Mist, G-Max Steelsurge, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the target's side, and the effects of G-Max Steelsurge, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side. Additionally, it heals 1/4 of its max HP when it removes hazards, screens or terrain.",
		shortDesc: "Removes terrain/screens/hazards and heals 25% if successful.",
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
				//const removeTerrain = ['electricterrain', 'grassyterrain', 'mistyterrain', 'psychicterrain'];
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
				/*for (const terrainCondition of removeTerrain) {
					if (source.side.removeSideCondition(terrainCondition)) {
						this.add('-sideend', source.side, this.dex.conditions.get(terrainCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}*/
				if (this.field.clearTerrain()) success = true;
				if (success) !!this.heal(this.modify(source.maxhp, 0.25));
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
					'acupressure', 'afteryou', 'allyswitch', 'aromatherapy', 'aromaticmist', 'coaching', 'confide', 'copycat', 'curse', 'decorate', 'doomdesire', 'feint', 'futuresight', 'healbell', 'holdhands', 'howl', 'junglehealing', 'lifedew', 'meanlook', 'perishsong', 'playnice', 'powertrick', 'roar', 'roleplay', 'tearfullook',
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
	trickroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Trick Room');
					return 7;
				}
				if (source?.hasItem('adamantorb')) {
					return 8;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Trick Room', '[of] ' + source, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 1,
			onFieldEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},
    covet: {
		num: 343,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Covet",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, failmefirst: 1, noassist: 1, failcopycat: 1},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (
				!this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem) ||
				!source.setItem(yourItem)
			) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-item', source, yourItem, '[from] move: Covet', '[of] ' + target);
            if (source.timesStolen) source.timesStolen++; // added for Kleptomania
            else source.timesStolen = 1;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
    thief: {
		num: 168,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Thief",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, failmefirst: 1, noassist: 1, failcopycat: 1},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem) ||
				!source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-enditem', target, yourItem, '[silent]', '[from] move: Thief', '[of] ' + source);
			this.add('-item', source, yourItem, '[from] move: Thief', '[of] ' + target);
            if (source.timesStolen) source.timesStolen++; // added for Kleptomania
            else source.timesStolen = 1;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	spikes: {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'spikes',
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
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	stealthrock: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'stealthrock',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	stickyweb: {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sticky Web",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, metronome: 1},
		sideCondition: 'stickyweb',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'toxicspikes',
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
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	bleakwindstorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	sandsearstorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	springtidestorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	wildboltstorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	aircutter: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	fairywind: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	gust: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	heatwave: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	hurricane: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	icywind: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	petalblizzard: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	sandstorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	tailwind: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	twister: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	whirlwind: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	healblock: {
		num: 377,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Heal Block",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		volatileStatus: 'healblock',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (effect?.name === "Psychic Noise" || effect?.name === "Orb of Discord") {
					return 2;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Heal Block');
					return 7;
				}
				return 5;
			},
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Heal Block');
				source.moveThisTurnResult = true;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 20,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectState.isZ) return damage;
				return false;
			},
			onRestart(target, source, effect) {
				if (effect?.name === 'Psychic Noise' || effect?.name === "Orb of Discord") return;

				this.add('-fail', target, 'move: Heal Block'); // Succeeds to supress downstream messages
				if (!source.moveThisTurnResult) {
					source.moveThisTurnResult = false;
				}
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		zMove: {boost: {spa: 2}},
		contestType: "Clever",
	},
	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, wind: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones',
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
			return success;
		},
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	rapidspin: {
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	mortalspin: {
		num: 866,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Mortal Spin",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Poison",
	},
	tidyup: {
		num: 882,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tidy Up",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			if (success) this.add('-activate', pokemon, 'move: Tidy Up');
			return !!this.boost({atk: 1, spe: 1}, pokemon, pokemon, null, false, true) || success;
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	courtchange: {
		num: 756,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Court Change",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		onHitField(target, source) {
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock',
				'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade',
				'gmaxvinelash', 'gmaxwildfire', 'healingstones',
			];
			let success = false;
			if (this.gameType === "freeforall") {
				// random integer from 1-3 inclusive
				const offset = this.random(3) + 1;
				// the list of all sides in counterclockwise order
				const sides = [this.sides[0], this.sides[2]!, this.sides[1], this.sides[3]!];
				const temp: {[k: number]: typeof source.side.sideConditions} = {0: {}, 1: {}, 2: {}, 3: {}};
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if (!sideConditions.includes(id)) continue;
						temp[side.n][id] = side.sideConditions[id];
						delete side.sideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						this.add('-sideend', side, effectName, '[silent]');
						success = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n];
					const targetSide = sides[(i + offset) % 4]; // the next side in rotation
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						let layers = sourceSideConditions[id].layers || 1;
						for (; layers > 0; layers--) this.add('-sidestart', targetSide, effectName, '[silent]');
					}
				}
			} else {
				const sourceSideConditions = source.side.sideConditions;
				const targetSideConditions = source.side.foe.sideConditions;
				const sourceTemp: typeof sourceSideConditions = {};
				const targetTemp: typeof targetSideConditions = {};
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue;
					sourceTemp[id] = sourceSideConditions[id];
					delete sourceSideConditions[id];
					success = true;
				}
				for (const id in targetSideConditions) {
					if (!sideConditions.includes(id)) continue;
					targetTemp[id] = targetSideConditions[id];
					delete targetSideConditions[id];
					success = true;
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id];
				}
				for (const id in targetTemp) {
					sourceSideConditions[id] = targetTemp[id];
				}
				this.add('-swapsideconditions');
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},
	teraused: {
		shortDesc: "Prevents Terastalization from being used multiple times.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tera Used",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1},
		sideCondition: 'teraused',
		condition: {},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
};
