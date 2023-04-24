export const Conditions: {[k: string]: ConditionData} = {
	gyeahvictim: {
		name: "gyeah-victim",
		noCopy: true,
		onStart(pokemon) {
			this.boost({atk: -2, spa: -2, spe: -2, def: -2, spd: -2}, pokemon);
		},
	},
	// Tatsugiri
	gyeahperpetrator: {
		name: "gyeah-perpetrator",
		noCopy: true,
		// Override No Guard
		onInvulnerabilityPriority: 2,
		onInvulnerability(target, source, move) {
			return false;
		},
		onBeforeTurn(pokemon) {
			this.queue.cancelAction(pokemon);
		},
	},
}