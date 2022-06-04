export const Abilities: {[abilityid: string]: AbilityData} = {
	soulreap: {
		onBasePower(basePower, attacker, defender, move) {
			if (defender.volatiles['partiallytrapped'] || defender.volatiles['trapped']) {
				return this.chainModify(1.5);
			}
		},
		name: "Soul Reap",
		shortDesc: "This Pokemon's attacks have 1.5x power against trapped targets.",
		rating: 4,
		num: -1,
	},
	immolation: {
		onModifySpDPriority: 6,
		onModifySpD(spd, source, target) {
			if (target.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		name: "Immolation",
		shortDesc: "This Pokemon's Special Defense is 1.5x against burned attackers.",
		rating: 4,
		num: -2,
	},
};