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
	bloodsucker: {
		shortDesc: "The user gains 100% more HP from draining moves",
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([5324, 4096]);
			}
		},
		flags: {},
		name: "Bloodsucker",
		rating: 3,
		num: -1,
	},
	insectbreathing: { //ts is some bs
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ([ 'furyattack', 'hornattack', 'horndrill', 'hyperdrill', 
				'retaliate', 'fellstinger', 'lunge', 'megahorn', 'twineedle', 
				'poisonjab', 'poisonsting', 'drillpeck', 'drillrun', 'smartstrike' ].includes(move.id)) {
				this.debug('Sharpness boost');
				return this.chainModify(1.2);
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Insect Breathing poison');
				if (move.secondaries) move.secondaries = [];
				move.secondaries.push({
					chance: 50,
					status: 'tox',
				});
			}
		},
		flags: {},
		name: "Insect Breathing",
		rating: 4,
		num: -2,
	},
	
	grandtriskellion: { //secret santa COMENOVA paying off in dividends here,,,,
		name: "Grand Triskellion",
	   onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'grandtriskellion');
	   },
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					  const source = this.effectState.source;
					  const damage = this.heal(target.baseMaxhp / 8, target, source); 
					  target.side.removeSlotCondition(target, 'grandtriskellion');
				 }
			},
	   },
		rating: 3,
		shortDesc: "On switch-out, the next Pokemon sent out heals 1/8 of the user's max HP.",
		num: -3,
	},
};
