export const Items: {[itemid: string]: ModdedItemData} = {
// Shadow Adapter
	shadowadapter: {
		name: "Shadow Adapter",
		spritenum: 761,
		onTakeItem: false,
		onStart(pokemon) {
			this.add('-item', pokemon, 'Shadow Adapter');
			this.add('-terastallize', pokemon, 'Shadow');
			this.add('-message', `${pokemon.name}'s Shadow Adapter temporarily closed its heart!`);
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Shadow') {
				if (user.hasAbility('adaptability')) {
					return this.chainModify(2);
				} else {
					return this.chainModify(1.5);
				}
			}
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['confusion']) {
				return this.chainModify(1.5);
			} else {
				return this.chainModify([4915, 4096]);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['confusion']) {
				return this.chainModify(1.5);
			} else {
				return this.chainModify([4915, 4096]);
			}
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Shadow') {
				return this.chainModify(0.5);
			}
		},
		num: -1007,
		gen: 9,
		desc: "Turns the holder into a Shadow Pokemon.",
		rating: 3,
	},

// New Items
	collider: {
		name: "Collider",
		spritenum: 119,
		fling: {
			basePower: 80,
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (pokemon.hasAbility(['minus', 'plus'] && !allyActive.hasAbility(['minus', 'plus']))) {
					return this.chainModify(1.5);
				}
			}
		},
		num: -1002,
		gen: 9,
		rating: 3,
		desc: "Activates the abilities Plus & Minus.",
	},
	earbuds: {
		name: "Earbuds",
		spritenum: 713,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Earbuds boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[from] item: Earbuds');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectState.target, '[from] item: Earbuds');
			}
		},
		num: -1000,
		desc: "Holder is immune to sound moves and its own deal 1.2x damage.",
		gen: 9,
		rating: 3,
	},
	sandysupplement: {
		name: "Sandy Supplement",
		spritenum: 456,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hasType('Rock')) {
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0 && target.hasType('Rock')) {
				this.debug('Sandy Supplement neutralize');
				return this.chainModify(0.75);
			}
		},
		num: -1001,
		gen: 9,
		desc: "Rock-types: Heal 1/16 of their max HP every turn and take 0.75x damage from super effective moves.",
		rating: 3,
	},
	tunnelvisor: {
		name: "Tunnel Visor",
		spritenum: 539,
		fling: {
			basePower: 80,
		},
		onAnyModifyBoost(boosts, pokemon) {
			const visorHolder = this.effectState.target;
			if (visorHolder === pokemon) return;
			if (pokemon === this.activePokemon && visorHolder === this.activeTarget) {
				boosts['accuracy'] = 0;
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
			move.tracksTarget = true;
		},
   	num: -1003,
		gen: 9,
		rating: 3,
		desc: "Holder's moves ignore redirection, accuracy drops, and evasion boosts.",
	},
	hacaiberry: {
		name: "Hacai Berry",
		spritenum: 124,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Shadow",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (
				move.type === 'Shadow' &&
				(!target.volatiles['substitute'] || move.flags['bypasssub'] || (move.infiltrates && this.gen >= 6))
			) {
				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
   	num: -1004,
		gen: 9,
		desc: "Halves damage taken from a Shadow-type attack. Single use.",
		rating: 3,
	},
	heartnecklace: {
		name: "Heart Necklace",
		spritenum: 747,
		fling: {
			basePower: 30,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (source.hasItem('shadowadapter')) {
				return this.chainModify(0.75);
			}
		},
		num: -1005,
		gen: 9,
		desc: "Holder takes 3/4 damage from Shadow Pokemon.",
		rating: 3,
	},
	stellarplate: {
		name: "Stellar Plate",
		spritenum: 463,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return this.chainModify([5325, 4096]);
			} else {
				return this.chainModify([4506, 4096]);
			} 
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1024) || pokemon.baseSpecies.num === 1024) {
				return false;
			}
			return true;
		},
		itemUser: ["Terapagos"],
		num: -1006,
		gen: 9,
		desc: "Terapagos: Normal-types moves have 1.3x power, all others have 1.1x.",
	},

// Old Items
	berryjuice: {
		inherit: true,
		isNonstandard: null,
	},
	cornerstonemask: {
		name: "Cornerstone Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedMask = false;
			} else {
				this.effectState.checkedMask = true;
			}
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedMask = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 3 && target.hp + damage > target.maxhp / 3) {
				this.boost({spd: 1}, target, target);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Cornerstone",
		itemUser: ["Ogerpon-Cornerstone"],
		num: 2406,
		gen: 9,
		desc: "Ogerpon-Cornerstone: +1 Def when hit below 1/3 HP.",
	},
	hearthflamemask: {
		name: "Hearthflame Mask",
		spritenum: 760,
		fling: {
			basePower: 60,
		},
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedMask = false;
			} else {
				this.effectState.checkedMask = true;
			}
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedMask = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 3 && target.hp + damage > target.maxhp / 3) {
				this.boost({atk: 1}, target, target);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Hearthflame",
		itemUser: ["Ogerpon-Hearthflame"],
		num: 2408,
		gen: 9,
		desc: "Ogerpon-Hearthflame: +1 Atk when hit below 1/3 HP.",
	},
	wellspringmask: {
		name: "Wellspring Mask",
		spritenum: 759,
		fling: {
			basePower: 60,
		},
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedMask = false;
			} else {
				this.effectState.checkedMask = true;
			}
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedMask = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 3 && target.hp + damage > target.maxhp / 3) {
				this.boost({spd: 1}, target, target);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Wellspring",
		itemUser: ["Ogerpon-Wellspring"],
		num: 2407,
		gen: 9,
		desc: "Ogerpon-Wellspring: +1 SpD when hit below 1/3 HP.",
	},
	blunderpolicy: {
		name: "Blunder Policy",
		spritenum: 716,
		fling: {
			basePower: 80,
		},
		onUpdate(pokemon) {
			if (pokemon.moveThisTurnResult === false) {
				this.boost({spe: 2});
				pokemon.useItem();
			}
		},
		num: 1121,
		gen: 8,
		desc: "+2 Speed if the holder's move fails. Single use.",
		rating: 3,
	},
	
// Undexited signature items
	thickclub: {
		inherit: true,
		isNonstandard: null,
	},
	leek: {
		inherit: true,
		isNonstandard: null,
	},
	luckypunch: {
		inherit: true,
		isNonstandard: null,
	},
};
