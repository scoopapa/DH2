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
};
