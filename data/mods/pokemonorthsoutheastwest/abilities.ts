export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	lullabody: {
 shortDesc: "Contact with this Pokémon may put the attacker to sleep.",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('slp', target);
				}
			}
		},
		flags: {},
		name: "Lullabody",
		rating: 2,
		num: 49,
	},
}
