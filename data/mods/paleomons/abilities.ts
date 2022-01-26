export const Abilities: {[abilityid: string]: ModdedAbilityData} = {

	bloodsuck: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['heal'] && move.category !== "Status") {
				this.debug('Bloodsuck boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},

		name: "Bloodsuck",
		shortDesc: "User's draining moves deal 1.3x damage.",
		rating: 3,
		num: -100,
	},

	carboniferous: {
		onModifyMovePriority: -5,
		onModifyMove(move, target) {
			if (move.type === "Bug" /*&& target.hasType("Fairy")*/) {
				(move as any).carboniferousBoosted = true;
			};
		},

		name: "Carboniferous",
		shortDesc: "User's Bug moves deal super effective damage against Fairy-types; Fairy moves deal halved damage.",
		rating: 3,
		num: -101,
	},

};