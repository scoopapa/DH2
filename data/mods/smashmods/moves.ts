export const Moves: {[k: string]: ModdedMoveData} = {
	"covetabnormal": {
		num: 343,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "If this attack was successful and the user has not fainted, it steals the target's held item if the user is not holding one. The target's item is not stolen if it is a Mail or Z-Crystal, or if the target is a Kyogre holding a Blue Orb, a Groudon holding a Red Orb, a Giratina holding a Griseous Orb, an Arceus holding a Plate, a Genesect holding a Drive, a Silvally holding a Memory, or a Pokemon that can Mega Evolve holding the Mega Stone for its species. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		shortDesc: "If the user has no item, it steals the target's.",
		id: "covetabnormal",
		name: "Covet-Abnormal",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit: function (target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			let yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem) || !source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-item', source, yourItem, '[from] move: Covet', '[of] ' + target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMovePower: 120,
		contestType: "Cute",
	},
	"dizzypunchabnormal": {
		num: 146,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a 20% chance to confuse the target.",
		shortDesc: "20% chance to confuse the target.",
		id: "dizzypunchabnormal",
		name: "Dizzy Punch-Abnormal",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 140,
		contestType: "Cute",
	},
	"doublehitabnormal": {
		num: 458,
		accuracy: 90,
		basePower: 35,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits 2 times in one turn.",
		id: "doublehitabnormal",
		name: "Double Hit-Abnormal",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Cool",
	},
	"endeavorabnormal": {
		num: 283,
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon, target) {
			return target.hp - pokemon.hp;
		},
		category: "Physical",
		desc: "Deals damage to the target equal to (target's current HP - user's current HP). The target is unaffected if its current HP is less than or equal to the user's current HP.",
		shortDesc: "Lowers the target's HP to the user's HP.",
		id: "endeavorabnormal",
		isViable: true,
		name: "Endeavor-Abnormal",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry: function (pokemon, target) {
			if (pokemon.hp >= target.hp) {
				this.add('-immune', target);
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 160,
		contestType: "Tough",
	},
	"facadeabnormal": {
		num: 263,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Power doubles if the user is burned, paralyzed, or poisoned. The physical damage halving effect from the user's burn is ignored.",
		shortDesc: "Power doubles if user is burn/poison/paralyzed.",
		id: "facadeabnormal",
		isViable: true,
		name: "Facade-Abnormal",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon) {
			if (pokemon.status && pokemon.status !== 'slp') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 140,
		contestType: "Cute",
	},
	"fakeoutabnormal": {
		num: 252,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "Has a 100% chance to flinch the target. Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
		id: "fakeoutabnormal",
		isViable: true,
		name: "Fake Out-Abnormal",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry: function (pokemon, target) {
			if (pokemon.activeTurns > 1) {
				this.attrLastMove('[still]');
				this.add('-fail', pokemon);
				this.add('-hint', "Fake Out only works on your first turn out.");
				return null;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 100,
		contestType: "Cute",
	},
	"flailabnormal": {
		num: 175,
		accuracy: 100,
		basePower: 0,
		basePowerCallback: function (pokemon, target) {
			let ratio = pokemon.hp * 48 / pokemon.maxhp;
			if (ratio < 2) {
				return 200;
			}
			if (ratio < 5) {
				return 150;
			}
			if (ratio < 10) {
				return 100;
			}
			if (ratio < 17) {
				return 80;
			}
			if (ratio < 33) {
				return 40;
			}
			return 20;
		},
		category: "Physical",
		desc: "The power of this move is 20 if X is 33 to 48, 40 if X is 17 to 32, 80 if X is 10 to 16, 100 if X is 5 to 9, 150 if X is 2 to 4, and 200 if X is 0 or 1, where X is equal to (user's current HP * 48 / user's maximum HP), rounded down.",
		shortDesc: "More power the less HP the user has left.",
		id: "flailabnormal",
		name: "Flail-Abnormal",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 160,
		contestType: "Cute",
	},
	"frustrationabnormal": {
		num: 218,
		accuracy: 100,
		basePower: 0,
		basePowerCallback: function (pokemon) {
			return Math.floor(((255 - pokemon.happiness) * 10) / 25) || 1;
		},
		category: "Physical",
		desc: "Power is equal to the greater of ((255 - user's Happiness) * 2/5), rounded down, or 1.",
		shortDesc: "Max 102 power at minimum Happiness.",
		id: "frustrationabnormal",
		isViable: true,
		name: "Frustration-Abnormal",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 160,
		contestType: "Cute",
	},
	"gigaimpactabnormal": {
		num: 416,
		accuracy: 90,
		basePower: 150,
		category: "Physical",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
		id: "gigaimpactabnormal",
		name: "Giga Impact-Abnormal",
		pp: 5,
		priority: 0,
		flags: {contact: 1, recharge: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 200,
		contestType: "Tough",
	},
	"headbuttabnormal": {
		num: 29,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch the target.",
		id: "headbuttabnormal",
		name: "Headbutt-Abnormal",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Rock",
		zMovePower: 140,
		contestType: "Tough",
	},
	"hyperbeamabnormal": {
		num: 63,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
		id: "hyperbeamabnormal",
		name: "Hyper Beam-Abnormal",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 200,
		contestType: "Cool",
	},
	"hypervoiceabnormal": {
		num: 304,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent foes.",
		id: "hypervoiceabnormala",
		isViable: true,
		name: "Hyper Voice-Abnormal",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dragon",
		zMovePower: 175,
		contestType: "Cool",
	},
	"lastresortabnormal": {
		num: 387,
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		desc: "This move fails unless the user knows this move and at least one other move, and has used all the other moves it knows at least once each since it became active or Transformed.",
		shortDesc: "Fails unless each known move has been used.",
		id: "lastresortabnormal",
		name: "Last Resort-Abnormal",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit: function (target, source) {
			if (source.moveSlots.length < 2) return false; // Last Resort fails unless the user knows at least 2 moves
			let hasLastResort = false; // User must actually have Last Resort for it to succeed
			for (const moveSlot of source.moveSlots) {
				if (moveSlot.id === 'lastresort') {
					hasLastResort = true;
					continue;
				}
				if (!moveSlot.used) return false;
			}
			return hasLastResort;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 200,
		contestType: "Cute",
	},
	"naturalgiftabnormal": {
		num: 363,
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		desc: "The type and power of this move depend on the user's held Berry, and the Berry is lost. Fails if the user is not holding a Berry, if the user has the Klutz Ability, or if Embargo or Magic Room is in effect for the user.",
		shortDesc: "Power and type depends on the user's Berry.",
		id: "naturalgiftabnormal",
		name: "Natural Gift-Abnormal",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, pokemon, move) {
			if (pokemon.ignoringItem()) return false;
			let item = pokemon.getItem();
			if (!item.naturalGift) return false;
			move.basePower = item.naturalGift.basePower;
			move.type = item.naturalGift.type;
			pokemon.setItem('');
			pokemon.lastItem = item.id;
			pokemon.usedItemThisTurn = true;
			this.runEvent('AfterUseItem', pokemon, null, null, item);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 160,
		contestType: "Clever",
	},
	"poundabnormal": {
		num: 1,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "poundabnormal",
		name: "Pound-Abnormal",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 100,
	},
	"quickattackabnormal": {
		num: 98,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		id: "quickattackabnormal",
		isViable: true,
		name: "Quick Attack-Abnormal",
		pp: 30,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMovePower: 100,
		contestType: "Cool",
	},
	"retaliateabnormal": {
		num: 514,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Power doubles if one of the user's party members fainted last turn.",
		shortDesc: "Power doubles if an ally fainted last turn.",
		id: "retaliateabnormal",
		name: "Retaliate-Abnormal",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				this.debug('Boosted for a faint last turn');
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Cool",
	},
	"returnabnormal": {
		num: 216,
		accuracy: 100,
		basePower: 0,
		basePowerCallback: function (pokemon) {
			return Math.floor((pokemon.happiness * 10) / 25) || 1;
		},
		category: "Physical",
		desc: "Power is equal to the greater of (user's Happiness * 2/5), rounded down, or 1.",
		shortDesc: "Max 102 power at maximum Happiness.",
		id: "returnabnormal",
		isViable: true,
		name: "Return-Abnormal",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMovePower: 160,
		contestType: "Cute",
	},
	"roundabnormal": {
		num: 496,
		accuracy: 100,
		basePower: 60,
		basePowerCallback: function (target, source, move) {
			if (move.sourceEffect === 'round') {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		desc: "If there are other active Pokemon that chose this move for use this turn, those Pokemon take their turn immediately after the user, in Speed order, and this move's power is 120 for each other user.",
		shortDesc: "Power doubles if others used Round this turn.",
		id: "roundabnormal",
		name: "Round-Abnormal",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTry: function () {
			for (const action of this.queue) {
				// @ts-ignore
				if (!action.pokemon || !action.move) continue;
				// @ts-ignore
				if (action.move.id === 'round') {
					// @ts-ignore
					this.prioritizeAction(action);
					return;
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"secretpowerabnormal": {
		num: 290,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a 30% chance to cause a secondary effect on the target based on the battle terrain. Causes paralysis on the regular Wi-Fi terrain, causes paralysis during Electric Terrain, lowers Special Attack by 1 stage during Misty Terrain, causes sleep during Grassy Terrain and lowers Speed by 1 stage during Psychic Terrain.",
		shortDesc: "Effect varies with terrain. (30% paralysis chance)",
		id: "secretpowerabnormal",
		name: "Secret Power-Abnormal",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
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
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 140,
		contestType: "Clever",
	},
	"snoreabnormal": {
		num: 173,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "Has a 30% chance to flinch the target. Fails if the user is not asleep.",
		shortDesc: "User must be asleep. 30% chance to flinch target.",
		id: "snoreabnormal",
		name: "Snore-Abnormal",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		sleepUsable: true,
		onTryHit: function (target, source) {
			if (source.status !== 'slp' && !source.hasAbility('comatose')) return false;
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 100,
		contestType: "Cute",
	},
	"strengthabnormal": {
		num: 70,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "strengthabnormal",
		name: "Strength-Abnormal",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Rock",
		zMovePower: 160,
		contestType: "Tough",
	},
	"swiftabnormal": {
		num: 129,
		accuracy: true,
		basePower: 60,
		category: "Special",
		desc: "This move does not check accuracy.",
		shortDesc: "This move does not check accuracy. Hits foes.",
		id: "swiftabnormal",
		name: "Swift-Abnormal",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		zMovePower: 120,
		contestType: "Cool",
	},
	"uproarabnormal": {
		num: 253,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "The user spends three turns locked into this move. This move targets an opponent at random on each turn. On the first of the three turns, all sleeping active Pokemon wake up. During the three turns, no active Pokemon can fall asleep by any means, and Pokemon switched in during the effect do not wake up. If the user is prevented from moving or the attack is not successful against the target during one of the turns, the effect ends.",
		shortDesc: "Lasts 3 turns. Active Pokemon cannot fall asleep.",
		id: "uproarabnormal",
		name: "Uproar-Abnormal",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		self: {
			volatileStatus: 'uproar',
		},
		onTryHit: function (target) {
			for (const [i, allyActive] of target.side.active.entries()) {
				if (allyActive && allyActive.status === 'slp') allyActive.cureStatus();
				let foeActive = target.side.foe.active[i];
				if (foeActive && foeActive.status === 'slp') foeActive.cureStatus();
			}
		},
		effect: {
			duration: 3,
			onStart: function (target) {
				this.add('-start', target, 'Uproar');
			},
			onResidual: function (target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['uproar'];
				}
				this.add('-start', target, 'Uproar', '[upkeep]');
			},
			onEnd: function (target) {
				this.add('-end', target, 'Uproar');
			},
			onLockMove: 'uproar',
			onAnySetStatus: function (status, pokemon) {
				if (status.id === 'slp') {
					if (pokemon === this.effectData.target) {
						this.add('-fail', pokemon, 'slp', '[from] Uproar', '[msg]');
					} else {
						this.add('-fail', pokemon, 'slp', '[from] Uproar');
					}
					return null;
				}
			},
		},
		secondary: null,
		target: "randomNormal",
		type: "Dragon",
		zMovePower: 175,
		contestType: "Cute",
	},
	"healbellbattleready": {
		num: 215,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Every Pokemon in the user's party is cured of its major status condition. Active Pokemon with the Soundproof Ability are not cured.",
		shortDesc: "Cures the user's party of all status conditions.",
		id: "healbellbattleready",
		isViable: true,
		name: "Heal Bell-Battle-Ready",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, sound: 1, distance: 1, authentic: 1},
		onHit: function (pokemon, source) {
			this.add('-activate', source, 'move: Heal Bell');
			let side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally.hasAbility('soundproof')) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
			if (pokemon.template.species === 'Chimecho-James' && pokemon.hasAbility('battlebond')) {
				move.selfSwitch = true
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heal Bell", target);
		},
		target: "allyTeam",
		type: "Normal",
		zMoveEffect: 'heal',
		contestType: "Beautiful",
	},
	"cycloneslash": {
		num: 350,
		accuracy: 95,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "cycloneslash",
		isViable: true,
		name: "Cyclone Slash",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		effect: {
			duration: 1,
			onStart: function (target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Cyclone Slash');
			},
			onImmunity: function (type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd: function (target) {
				this.add('-end', target, 'Cyclone Slash');
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "X-Scissor", target);
		},
		target: "normal",
		type: "Steel",
		zMovePower: 140,
		contestType: "Tough",
	},
	"dashslash": {
		num: 521,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		id: "dashslash",
		isViable: true,
		name: "Dash Slash",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quick Attack", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 140,
		contestType: "Cool",
		
	},
	"greatslash": {
		num: 276,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Lowers the user's Speed and Defense by 1 stage.",
		shortDesc: "Lowers the user's Speed and Defense by 1.",
		id: "greatslash",
		isViable: true,
		name: "Great Slash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slash", target);
		},
		self: {
			boosts: {
				spe: -1,
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 190,
		contestType: "Tough",
	},
	"diamondpickaxe": {
		num: 229,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field.",
		shortDesc: "Frees user from hazards, binding, Leech Seed.",
		id: "diamondpickaxe",
		isViable: true,
		name: "Diamond Pickaxe",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		zMovePower: 100,
		contestType: "Cool",
	},
	"tippedarrow": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "This move's type depends on the user's individual values (IVs), and can be any type but Fairy and Normal.",
		shortDesc: "Varies in type based on the user's IVs.",
		id: "tippedarrow",
		name: "Tipped Arrow",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 120,
		contestType: "Clever",
	},
	"tippedarrowbug": {
		num: 237,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowbug",
		name: "Tipped Arrow Bug",
		pp: 15,
		priority: 0,
		onHit: function (target, source) {
			this.damage(target.maxhp / 4);
		},
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	"tippedarrowdark": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowdark",
		name: "Tipped Arrow Dark",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'tippedarrowdark',
		onHit: function (target) {
			target.addVolatile("healblock")
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	"tippedarrowdragon": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowdragon",
		name: "Tipped Arrow Dragon",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit: function (target) {
			target.addVolatile("laserfocus")
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
	},
	"tippedarrowelectric": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowelectric",
		isViable: true,
		name: "Tipped Arrow Electric",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			spe: -1,
		},
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	"tippedarrowfighting": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowfighting",
		isViable: true,
		name: "Tipped Arrow Fighting",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			atk: 1,
		},
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	"tippedarrowfire": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowfire",
		isViable: true,
		name: "Tipped Arrow Fire",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'tippedarrowfire',
		effect: {
			onImmunity: function (type) {
				if (type === 'Fire') return false;
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	"tippedarrowflying": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowflying",
		name: "Tipped Arrow Flying",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'tippedarrowflying',
		effect: {
			onStart: function (target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Tipped Arrow Flying');
			},
			onImmunity: function (type) {
				if (type === 'Ground') return false;
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	"tippedarrowghost": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowghost",
		name: "Tipped Arrow Ghost",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	"tippedarrowgrass": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowgrass",
		isViable: true,
		name: "Tipped Arrow Grass",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit: function (target, source) {
			this.heal(target.maxhp / 4);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	"tippedarrowground": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowground",
		name: "Tipped Arrow Ground",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'tippedarrowground',
		
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Tipped Arrow Ground');
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(1.33);
			},
			onModifyCritRatio: function (critRatio) {
				return critRatio + 1;
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Clever",
	},
	"tippedarrowice": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowice",
		isViable: true,
		name: "Tipped Arrow Ice",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			spe: 1,
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},
	"tippedarrowpoison": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowpoison",
		name: "Tipped Arrow Poison",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit: function (target) {
			target.setStatus('psn');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	"tippedarrowrock": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowrock",
		name: "Tipped Arrow Rock",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			def: 2,
			spe: -1,
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Clever",
	},
	"tippedarrowsteel": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowsteel",
		name: "Tipped Arrow Steel",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit: function (target) {
			target.addVolatile("lockon")
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Clever",
	},
	"tippedarrowwater": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "tippedarrowwater",
		name: "Tipped Arrow Water",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		effect: {
			onImmunity: function (type) {
				if (type === 'Water') return false;
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	"accursedtomb": {
		num: 371,
		accuracy: 90,
		basePower: 65,
		basePowerCallback: function (pokemon, target, move) {
			if (target.newlySwitched || !this.willMove(target)) {
				this.debug('Accursed Tomb NOT boosted');
				return move.basePower;
			}
			this.debug('Accursed Tomb damage boost');
			return move.basePower * 2;
		},
		category: "Special",
		desc: "Power doubles if the user moves before the target this turn, including actions taken through Instruct or the Dancer Ability. Switching in does not count as an action.",
		shortDesc: "Power doubles if the user moves before the target.",
		id: "accursedtomb",
		name: "Accursed Tomb",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Tomb", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 100,
		contestType: "Tough",
	},
	"evilblast": {
		num: 506,
		accuracy: 130,
		basePower: 80,
		category: "Special",
		desc: "Power doubles if the target has a major status condition.",
		shortDesc: "Always accurate if the target has a status ailment.",
		id: "evilblast",
		isViable: true,
		name: "Evil Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move) {
			if (target.status || target.hasAbility('comatose')) {
				move.accuracy = true;
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 160,
		contestType: "Clever",
	},
	"fallingskies": {
		num: 331,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "fallingskies",
		isViable: true,
		name: "Falling Skies",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slam", target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 140,
		contestType: "Cool",
	},
	"ampslam": {
		num: 9,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
		id: "ampslam",
		isViable: true,
		name: "Amp Slam",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder Punch", target);
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 140,
		contestType: "Cool",
	},
	"submissionidealworld": {
		num: 66,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/4 recoil.",
		id: "submissionidealworld",
		name: "Submission-Ideal-World",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 4],
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Submission", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 160,
		contestType: "Cool",
	},
	"waterpulseidealworld": {
		num: 352,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "Has a 20% chance to confuse the target.",
		shortDesc: "20% chance to confuse the target.",
		id: "waterpulseidealworld",
		name: "Water Pulse-Ideal-World",
		pp: 20,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Water Pulse", target);
		},
		target: "any",
		type: "Water",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"hiddenforce": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "This move's type depends on the user's individual values (IVs), and can be any type but Fairy and Normal.",
		shortDesc: "Varies in type based on the user's IVs.",
		id: "hiddenforce",
		name: "Hidden Force",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tackle", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 120,
		contestType: "Clever",
	},
	"hiddenforcebug": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Bug",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	"hiddenforcedark": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Dark",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	"hiddenforcedragon": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Dragon",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
	},
	"hiddenforceelectric": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		isViable: true,
		name: "Hidden Force Electric",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	"hiddenforcefighting": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		isViable: true,
		name: "Hidden Force Fighting",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	"hiddenforcefire": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		isViable: true,
		name: "Hidden Force Fire",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	"hiddenforceflying": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Flying",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	"hiddenforceghost": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Ghost",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	"hiddenforcegrass": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		isViable: true,
		name: "Hidden Force Grass",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	"hiddenforceground": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Ground",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Clever",
	},
	"hiddenforceice": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		isViable: true,
		name: "Hidden Force Ice",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},
	"hiddenforcepoison": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Poison",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	"hiddenforcepsychic": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Psychic",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	"hiddenforcerock": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Rock",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Clever",
	},
	"hiddenforcesteel": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Steel",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Clever",
	},
	"hiddenforcewater": {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "hiddenforce",
		name: "Hidden Force Water",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	"rinseoff": {
		num: 235,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect, 2/3 of its maximum HP if the weather is Desolate Land or Sunny Day, and 1/4 of its maximum HP if the weather is Hail, Primordial Sea, Rain Dance, or Sandstorm, all rounded half down.",
		shortDesc: "Heals the user by a weather-dependent amount.",
		id: "rinseoff",
		isViable: true,
		name: "Rinse Off",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit: function (pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aqua Ring", target);
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"dragonragesylvemons": {
		num: 101,
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Special",
		desc: "Deals damage to the target equal to the user's level.",
		shortDesc: "Does damage equal to the user's level.",
		id: "dragonragesylvemons",
		isViable: true,
		name: "Dragon Rage-Sylvemons",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rage", target);
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 100,
		contestType: "Clever",
	},
	"firepunchsylvemons": {
		num: 7,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn the target.",
		id: "firepunchsylvemons",
		isViable: true,
		name: "Fire Punch-Sylvemons",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Punch", target);
		},
		target: "normal",
		type: "Fire",
		zMovePower: 140,
		contestType: "Tough",
	},
	"thunderpunchsylvemons": {
		num: 7,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
		id: "firepunchsylvemons",
		isViable: true,
		name: "Thunder Punch-Sylvemons",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 10,
			status: 'par',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder Punch", target);
		},
		target: "normal",
		type: "Electric",
		zMovePower: 140,
		contestType: "Tough",
	},
	"icepunchsylvemons": {
		num: 7,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Has a 10% chance to freeze the target.",
		shortDesc: "10% chance to freeze the target.",
		id: "icepunchsylvemons",
		isViable: true,
		name: "Ice Punch-Sylvemons",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Punch", target);
		},
		target: "normal",
		type: "Ice",
		zMovePower: 140,
		contestType: "Tough",
	},
	"incineratesylvemons": {
		num: 282,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "If the target is holding an item that can be removed from it, ignoring the Sticky Hold Ability, this move's power is multiplied by 1.5. If the user has not fainted, the target loses its held item. This move cannot remove Z-Crystals, cause Pokemon with the Sticky Hold Ability to lose their held item, cause Pokemon that can Mega Evolve to lose the Mega Stone for their species, or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, or a Silvally to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, or Memory respectively. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		id: "incineratesylvemons",
		isViable: true,
		name: "Incinerate-Sylvemons",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, source, target, move) {
			let item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, source, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Incinerate-Sylvemons', '[of] ' + source);
				}
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Incinerate", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 120,
		contestType: "Clever",
	},
	"venomslam": {
		num: 690,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "If the user is hit by a contact move this turn before it can execute this move, the attacker is badly poisoned.",
		shortDesc: "Badly poisons on contact with the user before it moves.",
		id: "venomslam",
		isViable: true,
		name: "Venom Slam",
		pp: 15,
		priority: -3,
		flags: {bullet: 1, protect: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('venomslam');
		},
		effect: {
			duration: 1,
			onStart: function ( pokemon, source, move ) {
				this.add('-singleturn', pokemon, 'move: Venom Slam');
			},
			onHit: function (pokemon, source, move) {
				if (move.flags['contact']) {
					source.trySetStatus('tox', pokemon);
				}
			},
		},
		onMoveAborted: function (pokemon) {
			pokemon.removeVolatile('venomslam');
		},
		onAfterMove: function (pokemon) {
			pokemon.removeVolatile('venomslam');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMovePower: 180,
		contestType: "Tough",
	},
	"twineedlesylvemons": {
		num: 41,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Hits twice, with each hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits 2 times. Each hit has 20% chance to poison.",
		id: "twineedlesylvemons",
		name: "Twineedle-Sylvemons",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: {
			chance: 20,
			status: 'psn',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Twineedle", target);
		},
		target: "normal",
		type: "Bug",
		zMovePower: 100,
		contestType: "Cool",
	},
	"thunderclap": {
		num: 304,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent foes.",
		id: "thunderclap",
		isViable: true,
		name: "Thunder Clap",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: null,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder Punch", target);
		},
		target: "allAdjacentFoes",
		type: "Electric",
		zMovePower: 175,
		contestType: "Cool",
	},
	"stormstrike": {
		num: 311,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Power doubles if a weather condition other than Delta Stream is active, and this move's type changes to match. Ice type during Hail, Water type during Primordial Sea or Rain Dance, Rock type during Sandstorm, and Fire type during Desolate Land or Sunny Day.",
		shortDesc: "Power doubles and type varies in each weather.",
		id: "stormstrike",
		name: "Storm Strike",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyMove: function (move) {
			switch (this.field.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.type = 'Rock';
				move.basePower *= 2;
				break;
			case 'hail':
				move.type = 'Ice';
				move.basePower *= 2;
				break;
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tackle", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"algaeallure": {
		num: 202,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "algaeallure",
		isViable: true,
		name: "Algae Allure",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scald", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 140,
		contestType: "Clever",
	},
	"starspit": {
		num: 722,
		accuracy: 100,
		basePower: 80,
		basePowerCallback: function (pokemon, target, move) {
			let damagedByTarget = pokemon.attackedBy.some(p =>
				p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug('Boosted for getting hit by ' + target);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Physical if user's Atk > Sp. Atk. 1.5x damage if user moves after target.",
		id: "starspit",
		isViable: true,
		name: "Star Spit",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fling", target);
		},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 180,
		contestType: "Cool",
	},
	"photonburn": {
		num: 722,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignores/Removes Abilities.",
		id: "photonburn",
		isViable: true,
		name: "Photon Burn",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onHit: function (target) {
			target.addVolatile('gastroacid');
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Photon Geyser", target);
		},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 180,
		contestType: "Cool",
	},
	"solareclipse": {
		num: 437,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		id: "solareclipse",
		isViable: true,
		name: "Solar Eclipse",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Pulse", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 195,
		contestType: "Beautiful",
	},
	"shadedclaws": {
		num: 458,
		accuracy: 90,
		basePower: 50,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits 2 times in one turn. High crit ratio.",
		id: "shadedclaws",
		name: "Shaded Claws",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 140,
		contestType: "Cool",
	},
	"particlecannon": {
		num: 161,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "Has a 20% chance to either burn, freeze, or paralyze the target.",
		shortDesc: "10% chance to paralyze or burn or poison target.",
		id: "particlecannon",
		isViable: true,
		name: "Particle Cannon",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 10,
				status: 'psn',
			}, {
				chance: 10,
				status: 'burn',
			}, {
				chance: 10,
				status: 'par',
			},
		],
		target: "normal",
		type: "Steel",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"earthtremor": {
		num: 89,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Damage doubles if the target is using Dig.",
		shortDesc: "Hits adjacent Pokemon. Double damage on Dig.",
		id: "earthtremor",
		isViable: true,
		name: "Earth Tremor",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Ground",
		zMovePower: 180,
		contestType: "Tough",
	},
	"megamelt": {
		num: 682,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "Fails unless the user is a Fire type. If this move is successful, the user's Fire type becomes typeless as long as it remains active.",
		shortDesc: "User's Fire type becomes typeless; must be Fire.",
		id: "megamelt",
		name: "Mega Melt",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onHit: function (target) {
			target.setType(target.getTypes(true).map(type => type === "Ice" ? "???" : type));
			this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: Mega Melt');
		},
		onHit: function (target) {
			target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
			this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: Mega Melt');
		},
		onHit: function (target) {
			target.setType(target.getTypes(true).map(type => type === "Rock" ? "???" : type));
			this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: Mega Melt');
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 195,
		contestType: "Clever",
	},
	"moltenglass": {
		num: 517,
		accuracy: 50,
		basePower: 150,
		category: "Special",
		desc: "Has a 100% chance to burn the target.",
		shortDesc: "100% chance to burn the target.",
		id: "moltenglass",
		name: "Molten Glass",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Ground",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"flamingbarrier": {
		num: 661,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon making contact with the user become poisoned. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from moves. Contact: burn.",
		id: "flamingbarrier",
		isViable: true,
		name: "Flaming Barrier",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'flamingbarrier',
		onTryHit: function (target, source, move) {
			return !!this.willAct() && this.runEvent('StallMove', target);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					source.trySetStatus('brn', target);
				}
				return this.NOT_FAILURE;
			},
			onHit: function (target, source, move) {
				if (move.isZPowered && move.flags['contact']) {
					source.trySetStatus('brn', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fire",
		zMoveBoost: {def: 1},
		contestType: "Tough",
	},
	"undergroundtrap": {
		num: 704,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Fails unless the user is hit by a physical attack from an opponent this turn before it can execute the move. If the user was hit and has not fainted, it attacks immediately after being hit, and the effect ends. If the opponent's physical attack had a secondary effect removed by the Sheer Force Ability, it does not count for the purposes of this effect.",
		shortDesc: "User must take physical damage before moving. Traps the target.",
		id: "undergroundtrap",
		name: "Underground Trap",
		pp: 5,
		priority: -3,
		flags: {protect: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('undergroundtrap');
		},
		beforeMoveCallback: function (pokemon) {
			if (pokemon.volatiles['undergroundtrap'] && !pokemon.volatiles['undergroundtrap'].gotHit) {
				this.add('cant', pokemon, 'Underground Trap', 'Underground Trap');
				return true;
			}
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Underground Trap');
			},
			onHit: function (pokemon, source, move) {
				if (pokemon.side !== source.side && move.category === 'Physical') {
					pokemon.volatiles['undergroundtrap'].gotHit = true;
				}
			},
		},
		secondary: {
			chance: 100,
			onHit: function (target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "allAdjacentFoes",
		type: "Ground",
		zMovePower: 200,
		contestType: "Tough",
	},
	"darkpulsecfm": {
		num: 399,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 20% chance to flinch the target.",
		shortDesc: "20% chance to flinch the target.",
		id: "darkpulsecfm",
		isViable: true,
		name: "Dark Pulse-CFM",
		pp: 15,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Dark",
		zMovePower: 160,
		contestType: "Cool",
	},
	"detectcfm": {
		num: 197,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Prevents moves from affecting the user this turn, unless the attack cannot miss.",
		id: "detectcfm",
		isViable: true,
		name: "Detect-CFM",
		pp: 5,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'protect',
		onPrepareHit: function (pokemon) {
			return !!this.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit: function (pokemon) {
			if (move.accuracy = true) {
			pokemon.addVolatile('stall');
			}
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMoveBoost: {evasion: 1},
		contestType: "Cool",
	},
	"fireblastcfm": {
		num: 126,
		accuracy: 85,
		basePower: 120,
		category: "Special",
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn the target.",
		id: "fireblastcfm",
		isViable: true,
		name: "Fire Blast-CFM",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		zMovePower: 185,
		contestType: "Beautiful",
	},
	"irontailcfm": {
		num: 231,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Has a 30% chance to lower the target's Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Defense by 1.",
		id: "irontailcfm",
		name: "Iron Tail-CFM",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		contestType: "Cool",
	},
	"nightslashcfm": {
		num: 400,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "nightslashcfm",
		isViable: true,
		name: "Night Slash-CFM",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Cool",
	},
	"playroughcfm": {
		num: 583,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 10% chance to lower the target's Attack by 1 stage.",
		shortDesc: "10% chance to lower the target's Attack by 1.",
		id: "playroughcfm",
		isViable: true,
		name: "Play Rough-CFM",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 175,
		contestType: "Cute",
	},
	"psychocutcfm": {
		num: 427,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "psychocutcfm",
		isViable: true,
		name: "Psycho Cut-CFM",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 140,
		contestType: "Cool",
	},
	"slashcfm": {
		num: 163,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "Type varies based on the user's primary type.",
		id: "slashcfm",
		name: "Slash-CFM",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 140,
		contestType: "Cool",
	},
	"morningsunsylvemons": {
		num: 234,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect, 2/3 of its maximum HP if the weather is Desolate Land or Sunny Day, and 1/4 of its maximum HP if the weather is Hail, Primordial Sea, Rain Dance, or Sandstorm, all rounded half down.",
		shortDesc: "Heals the user by a weather-dependent amount.",
		id: "morningsunsylvemons",
		isViable: true,
		name: "Morning Sun-Sylvemons",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit: function (pokemon) {
			this.heal(this.modify(pokemon.maxhp, 0.5));
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"plucksylvemons": {
		num: 282,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "If the target is holding an item that can be removed from it, ignoring the Sticky Hold Ability, this move's power is multiplied by 1.5. If the user has not fainted, the target loses its held item. This move cannot remove Z-Crystals, cause Pokemon with the Sticky Hold Ability to lose their held item, cause Pokemon that can Mega Evolve to lose the Mega Stone for their species, or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, or a Silvally to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, or Memory respectively. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		id: "plucksylvemons",
		isViable: true,
		name: "Pluck-Sylvemons",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, source, target, move) {
			let item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, source, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Pluck-Sylvemons', '[of] ' + source);
				}
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pluck", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 120,
		contestType: "Clever",
	},
	"doublekicksylvemons": {
		num: 41,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Hits twice, with each hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits 2 times.",
		id: "doublekicksylvemons",
		name: "Double Kick-Sylvemons",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Double Kick", target);
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 100,
		contestType: "Cool",
	},
	"hottag": {
		num: 361,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user faints and the Pokemon brought out to replace it has its HP fully restored along with having any major status condition cured. The new Pokemon is sent out at the end of the turn, and the healing happens before hazards take effect. Fails if the user is the last unfainted Pokemon in its party.",
		shortDesc: "User faints. Replacement is fully healed.",
		id: "hottag",
		isViable: true,
		name: "Healing Wish",
		pp: 30,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryHit: function (pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		selfdestruct: "ifHit",
		sideCondition: 'hottag',
		effect: {
			duration: 2,
			onStart: function (side, source) {
				this.debug('Hot Tag started on ' + side.name);
				this.effectData.positions = [];
				for (let i = 0; i < side.active.length; i++) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function (side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchIn: function (target) {
				const positions = /**@type {boolean[]} */ (this.effectData.positions);
				if (!positions[target.position]) {
					return;
				}
				if (!target.fainted) {
					target.boost({atk: 1 , spa: 1});
					positions[target.position] = false;
				}
				if (!positions.some(affected => affected === true)) {
					target.side.removeSideCondition('hottag');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fire",
		contestType: "Beautiful",
	},
	"lightningburst": {
		num: 41,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "Hits twice, with each hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits 2 times. Each hit has 20% chance to poison.",
		id: "lightningburst",
		name: "Lightning Burst",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 3,
		secondary: {
			chance: 10,
			status: 'par',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunderbolt", target);
		},
		target: "normal",
		type: "Electric",
		zMovePower: 100,
		contestType: "Cool",
	},
	"plummet": {
		num: 136,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
		shortDesc: "User faints if it misses. User loses 50% of it's HP if it hits.",
		id: "plummet",
		isViable: true,
		name: "Plummet",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1},
		hasCustomRecoil: true,
		onMoveFail: function (target, source, move) {
			source.faint()
		},
		onAfterMove: function (pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.getEffect('Plummet'), true);
			}
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 195,
		contestType: "Cool",
	},
	"xray": {
		num: 85,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to badly poison the target.",
		id: "xray",
		isViable: true,
		name: "X-Ray",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 175,
		contestType: "Cool",
	},
	"thunderblade": {
		num: 427,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 10% chance to paralyze.",
		id: "thunderblade",
		isViable: true,
		name: "Thunderblade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 140,
		contestType: "Cool",
	},
	"fairyclaw": {
		num: 583,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		desc: "Has a 10% chance to lower the target's Attack by 1 stage.",
		shortDesc: "10% chance to lower the target's Attack by 1.",
		id: "fairyclaw",
		isViable: true,
		name: "Fairy Claw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 25,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 175,
		contestType: "Cute",
	},
	"molt": {
		num: 287,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user cures its burn, poison, or paralysis. Fails if the user is not burned, poisoned, or paralyzed.",
		shortDesc: "User cures its burn, poison, or paralysis.",
		id: "molt",
		isViable: true,
		name: "Molt",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onHit: function (pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMoveEffect: 'heal',
		contestType: "Cute",
	},
	"sweetstrike": {
		num: 675,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "For 2 turns, the target cannot use sound-based moves.",
		shortDesc: "30% chance to inflict Encore.",
		id: "sweetstrike",
		name: "Sweet Strike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			onHit: function (target) {
				target.addVolatile('encore');
			},
		},
		target: "normal",
		type: "Grass",
		zMovePower: 160,
		contestType: "Clever",
	},
	"desertswhirlwind": {
		num: 18,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The target is forced to switch out and be replaced with a random unfainted ally. Fails if the target is the last unfainted Pokemon in its party, or if the target used Ingrain previously or has the Suction Cups Ability.",
		shortDesc: "Forces the target to switch to a random ally. Summons Sandstorm.",
		id: "desertswhirlwind",
		isViable: true,
		name: "Desert's Whirlwind",
		pp: 20,
		priority: -6,
		flags: {reflectable: 1, mirror: 1, authentic: 1, mystery: 1},
		weather: 'Sandstorm',
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ground",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"chargeup": {
		num: 234,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect, 2/3 of its maximum HP if the weather is Desolate Land or Sunny Day, and 1/4 of its maximum HP if the weather is Hail, Primordial Sea, Rain Dance, or Sandstorm, all rounded half down.",
		shortDesc: "Heals the user by a terrain-dependent amount.",
		id: "chargeup",
		isViable: true,
		name: "Charge Up",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit: function (pokemon) {
			if (this.field.isTerrain("electricterrain")) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		secondary: null,
		target: "self",
		type: "Electric",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	teleport: {
		num: 100,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out.",
		name: "Teleport",
		pp: 20,
		priority: -6,
		flags: {},
		onTryHit: true,
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'heal'},
		contestType: "Cool",
	},
	rapidspin: {
		num: 229,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "Free user from hazards/bind/Leech Seed; +1 Spe.",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
};