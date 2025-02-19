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
};
