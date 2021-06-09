export const Abilities: {[k: string]: ModdedAbilityData} = {
	savagery: {
		shortDesc: "Boosts the user's SpA by 1 after a KO.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source);
			}
		},
		name: "Savagery",
		rating: 3,
	},
	pointedplummage: {
		shortDesc: "The opponent loses 1/8 of their max HP if they hit this Pokemon with a contact move.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Pointed Plummage",
		rating: 2.5,
	},
	rhoinfluence: {
		shortDesc: "Placeholder.",
		name: "Rho Influence",
		rating: 5,
	},
};
