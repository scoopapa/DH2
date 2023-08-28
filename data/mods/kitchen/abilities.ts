export const Abilities: {[k: string]: ModdedAbilityData} = {
	sprinter: {
        onBasePowerPriority: 21,
        onBasePower(basePower, attacker, defender, move) {
            if (attacker.activeMoveActions <= 1) {
                return this.chainModify([1.5]);
            }
        },
        name: "Sprinter",
        rating: 3.5,
        num: 1000,
	}
}