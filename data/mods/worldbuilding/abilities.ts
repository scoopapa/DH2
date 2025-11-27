export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	ionization: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && !source.status) {
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('brn', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Ionization",
		rating: 2,
		shortDesc: "30% chance of poison/paralysis/burn on others making contact with this Pokemon.",
	},
};
