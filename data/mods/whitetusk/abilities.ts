export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	puffinup: {
		shortDesc: "When this Pokemon uses or is targeted by a status move, Stockpiles 1. When this Pokemon loses a Stockpile, Speed +1.",
		onTryHit(target, source, move) {
			if (move.category !== 'Status') {
				return;
			}
			target.addVolatile('stockpile');
		},
		/*onResidual() {
			const success = !!
			if (!success) return;
			pokemon.removeVolatile('stockpile');
			this.boost({spe: 1});
			return success || this.NOT_FAIL;
		},*/
		name: "Puffin Up",
		rating: 3,
		num: -1,
	},
	fairestofthemall: {
		shortDesc: "This Pokemon's status condition is cured if hit by one Fairy move; Fairy immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				move.accuracy = true;
				if (!target.cureStatus()) {
					this.add('-immune', target, '[from] ability: Fairest of Them All');
					this.cureStatus()
				}
				return null;
			}
		},
		name: "Fairest of Them All",
		rating: 3,
		num: -2,
	},
	unpoppable: {
		shortDesc: "This Pokemon is immune to damage from Piercing moves.",
				onTryHit(pokemon, target, move) {
			if (move.flags['piercing']) {
				this.add('-immune', pokemon, '[from] ability: Unpoppable');
				return null;
			}
		},
		name: "Unpoppable",
		rating: 3,
		num: -3,
	},
	refreshing: {
		shortDesc: "When this Pokemon switches out, the incoming Pokemon is healed of all status conditions.",
		onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'refreshing'); 
			this.add('-ability', pokemon, 'Refreshing');
		},
		condition: {
			onSwap(target) {
				if (!target.fainted && target.status) {
				target.clearStatus();
				this.add('-message', "" + target.name + "was cured by refreshing!");
				target.side.removeSlotCondition(target, 'refreshing');
				}
			},
		},
		name: "Refreshing",
		rating: 3,
		num: -4,
	},
	gacha: {
		shortDesc: "An attacker making contact can receive, randomly, Leftovers, Black Sludge, or Sticky Barb.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !(target.item)) {
				const result = this.random(3);
				if (result === 0) {
					target.setItem('Leftovers');
				} else if (result === 1) {
					target.setItem('Black Sludge');
				} else {
					target.setItem('Sticky Barb');
				}
				this.add('-item', target, myItem.name, '[from] ability: Gacha', '[of] ' + source);
			}
		},
		name: "Gacha",
		rating: 3,
		num: -5,
	},
	antigravity: {
		shortDesc: "While this Pokémon is present, all Pokémon are non-grounded.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Anti-Gravity');
			this.add('-message', `While ${pokemon.name} is present, all Pokémon are non-grounded.`);
		},
		// effect is in scripts.ts
		name: "Anti-Gravity",
		rating: 4,
		num: -6
	},
	toxindrain: {
		shortDesc: "If another Pokemon takes Poison damage, heals 1/2 the damage taken.",
		onResidualOrder: 29,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.ability === 'poisonheal' || target.ability === 'magicguard') {
					return;
				}
				if (target.status === 'psn') {
					this.heal(target.baseMaxhp / 8, pokemon);
				}
				if (target.status === 'tox') {
					if ((target.hp + this.clampIntRange(pokemon.baseMaxhp / 16, 1) * target.activeTurns) > target.basemaxhp) {
						this.heal(target.hp - target.basemaxhp);
					}
					else {
						this.heal(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * target.activeTurns, pokemon)
					}
				}
			}
		},
		name: "Toxin Drain",
		rating: 3,
		num: -7,
	},
	lifedrain: {
		shortDesc: "This Pokemon heals 1/3 of the damage dealt when using contact moves.",
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status' && move.flags['contact']) {
				this.heal(pokemon.lastDamage / 3, pokemon);
			}
		},
		name: "Life Drain",
		rating: 3,
		num: -8,
	},
};