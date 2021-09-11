export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	disperal: {
		shortDesc: "Boosts Bullet Seed, Seed Bomb, Seed Flare, Apple Acid, and Grav Apple by 1.2x. Leech Seed deals 20% more damage and heals 30% more HP each turn.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.name === 'Bullet Seed' || move.name === 'Seed Bomb' || move.name === 'Seed Flare' || move.name === 'Grav Apple' || move.name === 'Apple Acid') {
				return this.chainModify(1.2);
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			let heals = {
				drain: 1,
				leechseed: 1,
				ingrain: 1,
				aquaring: 1,
				strengthsap: 1
			};
			if (heals[effect.id]) {
				return Math.ceil((damage * 1.3) - 0.5);
			}
		},
		id: "disperal",
		name: "Disperal",
	},
};
