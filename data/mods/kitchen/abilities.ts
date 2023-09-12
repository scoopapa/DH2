export const Abilities: {[k: string]: ModdedAbilityData} = {
	sprinter: {
        onBasePowerPriority: 21,
        onBasePower(basePower, attacker, defender, move) {
            if (attacker.activeMoveActions <= 1) {
                return this.chainModify([1.5]);
            }
        },
        name: "Sprinter",
        shortDesc: "This Pokemon deals 1.5x damage with it's first move on the field.",
        rating: 3.5,
        num: 1000,
	}
}