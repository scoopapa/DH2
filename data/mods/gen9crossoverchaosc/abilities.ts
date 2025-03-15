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

export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
  bloodfueled: {
    shortDesc: "Restores 1/8 of own max HP, rounded down, upon hitting another Pokemon with a contact move.",
    onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
      if (this.checkMoveMakesContact(move, target, pokemon)) {
        this.heal(pokemon.baseMaxhp / 8);
      }
		},
		flags: {},
		name: "Blood-Fueled",
		rating: 4,
		num: -1,
	},
	younglion: {
		shortDesc: "If this Pokemon moves before the opponent, this Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage halved.",
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
};
