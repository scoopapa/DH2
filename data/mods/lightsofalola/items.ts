export const Items: {[itemid: string]: ModdedItemData} = {
// New Items
	collider: {
		name: "Collider",
		spritenum: 119,
		fling: {
			basePower: 80,
		},
		onUpdate(pokemon) {
			if (pokemon.hasAbility(['minus', 'plus'])) {
				pokemon.addVolatile('plus');
			} else {
				pokemon.removeVolatile('plus');
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
	strangesouvenir: {
		name: "Strange Souvenir",
		spritenum: 747,
		fling: {
			basePower: 30,
		},
		itemUser: ["Gumshoos-Totem", "Raticate-Alola-Totem", "Vikavolt-Totem", "Ribombee-Totem", "Lurantis-Totem",
					  "Marowak-Alola-Totem", "Araquanid-Totem", "Mimikyu-Totem", "Togedemaru-Totem", "Kommo-o-Totem", "Salazzle-Totem"],
   	num: -1004,
		gen: 9,
		desc: "Totem Pokemon: Causes the boost from Totem Trial to persist.",
	},
	mysteriousbundle: {
		name: "Mysterious Bundle",
		spritenum: 287,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Delibird') {
				this.add('-message', `${pokemon.name} feels strange...`);
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				pokemon.formeChange('Iron Bundle');
				pokemon.setAbility('quarkdrive');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Delibird' || source.baseSpecies.baseSpecies === 'Iron Bundle') return false;
			return true;
		},
		itemUser: ["Delibird"],
		num: -1005,
		gen: 9,
		desc: "Delibird: Transforms into Iron Bundle on switch-in (before hazards).",
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
	luckypunch: {
		inherit: true,
		isNonstandard: null,
	},
	deepseascale: {
		name: "Deep Sea Scale",
		spritenum: 93,
		fling: {
			basePower: 30,
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl"],
		num: 227,
		gen: 3,
		isNonstandard: null,
		desc: "If held by a Clamperl, its Def & SpD are doubled.",
	},
	deepseatooth: {
		name: "Deep Sea Tooth",
		spritenum: 94,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl"],
		num: 226,
		gen: 3,
		isNonstandard: null,
		desc: "If held by a Clamperl, its Atk & SpA are doubled.",
	},

// Z-Crystals
};
