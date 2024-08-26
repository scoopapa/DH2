export const Abilities: {[k: string]: ModdedAbilityData} = {
	hazardabsorb: {
    // implemented in moves.ts
		shortDesc: "This Pokemon doesn't take damage from hazards.",
		name: "Hazard Absorb",
		rating: 4,
	},
	proteangen7: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean (Gen 7)');
			}
		},
		flags: {},
		name: "Protean (Gen 7)",
		shortDesc: "This Pokemon's type changes to the type of the move it is using.",
		rating: 4,
		num: -168,
	},
	spikedfur: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			const bp = move.basePower;
			if (bp <= 60) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Spiked Fur",
		rating: 2.5,
		shortDesc: "Pokemon that use moves with ≤60 BP against this Pokemon lose 1/8 of their max HP.",
	},
};
