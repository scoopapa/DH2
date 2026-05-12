/*
Ratings and how they work:
-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start
 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus
 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups
 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat
 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy
 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce
 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag
*/

import { onDatabaseStart } from "../../../server/private-messages/database";

export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	bloodfueled: {
		shortDesc: "Restores 1/8 of own max HP, rounded down, upon hitting another Pokemon with a contact move.",
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
		if (this.checkMoveMakesContact(move, target, pokemon)) {
				this.heal(pokemon.baseMaxhp / 8, pokemon, pokemon);
			}
		},
		flags: {},
		name: "Blood-Fueled",
		rating: 4,
		num: -1,
	},
	younglion: {
		shortDesc: "Move before target: attack becomes multihit with second hit being 0.3x power",
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
			move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax || !(target.newlySwitched || this.queue.willMove(target))) return;
			move.multihit = 2;
			move.multihitType = 'younglion';
		},
		// Damage modifier implemented in BattleActions#modifyDamage()
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'younglion' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		flags: {},
		name: "Young Lion",
		rating: 4,
		num: -2,
	},
	pandemonicfeast: {
		shortDesc: "Multi-hit moves hit the maximum number of times, and use the higher attacking stat when calculating damage.",
		onModifyMove(move, pokemon) {
			if (move.multihit && Array.isArray(move.multihit) && move.multihit.length) {
				move.multihit = move.multihit[1];
				if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
					move.overrideOffensiveStat = 'atk';
				}
				else {
					move.overrideOffensiveStat = 'spa';
				}
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
				if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
					move.overrideOffensiveStat = 'atk';
				}
				else {
					move.overrideOffensiveStat = 'spa';
				}
			}
		},
		flags: {},
		name: "Pandemonic Feast",
		rating: 3.5,
		num: -3,
	},
	shadowpounce: {
		shortDesc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Shadow Pounce",
		rating: 2.5,
		num: -4,
	},
	domainofice: {
		shortDesc: "Reduce first attack damage recieved: 30% if phys, 50% if spec.",
		onStart(pokemon) {
			pokemon.addVolatile('domainofice');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('domainofice');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onSourceModifyAtkPriority: 6,
			onSourceModifyAtk(atk, attacker, defender, move) {
				defender.removeVolatile('domainofice');
				if (!move.ignoreAbility) {
					this.debug('Domain of Ice weaken');
					return this.chainModify(0.7);
				}
			},
			onSourceModifySpAPriority: 5,
			onSourceModifySpA(spa, attacker, defender, move) {
				defender.removeVolatile('domainofice');
				if (!move.ignoreAbility) {
					this.debug('Domain of Ice weaken');
					return this.chainModify(0.5);
				}
			},
		},
		flags: {breakable: 1},
		name: "Domain of Ice",
		rating: 3.5,
		num: -5,
	},
	blindinglight: {
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Bug attack; Bug immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Bug' && move.category !== "Status") {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Blinding Light');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Blinding Light",
		rating: 3,
		num: -6,
	},
	giftsgiven: {
		shortDesc: "This Pokemonuses Stockpile if it attacks and KOes another Pokemon.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.actions.useMove(this.dex.getActiveMove('stockpile'), source, source);
			}
		},
		flags: {},
		name: "Gifts Given",
		rating: 3,
		num: -7,
	},
	omagatoki: {
		shortDesc: "This Pokemon's attacks that are super effective against the target do 1.25x damage.",
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([5120, 4096]);
			}
		},
		flags: {},
		name: "Omagatoki",
		rating: 2.5,
		num: -8,
	},
	stormwingmatriarch: {
		shortDesc: "Rock moves are less effective against this Pokemon. Taking rock damage boosts speed.",
		onEffectiveness(typeMod, target, type, move) {
			if (target.types.length >= 1 && type !== target.types[0]) return; // Ensure effectiveness reduction & speed boost only happens once per damage instance
			if (move.type == 'Rock') {
				this.boost({spe: 1});
				return typeMod - 1;
			}
		},
		flags: {},
		name: "Stormwing Matriarch",
		rating: 2.5,
		num: -9,
	},
	luigilogic: {
		shortDesc: "This Pokemon blocks certain Status moves and bounces them back to the user.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, this.effectState.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		flags: {breakable: 1},
		name: "Luigi Logic",
		rating: 4,
		num: -10,
	},
	launchedfist: {
		shortDesc: "Punch moves: 1.2x power & become special."
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Launched Fist boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onModifyMove(move, pokemon) {
			if (move.flags['punch']) {
				this.debug('Launched Fist category change');
				move.category = 'Special';
			}
		},
		flags: {},
		name: "Launched Fist",
		rating: 3,
		num: -11,
	},
};
