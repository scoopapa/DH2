export const Abilities: {[k: string]: ModdedAbilityData} = {
  amorphous: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Amorphous');
			}
		},
		flags: {},
		name: "Amorphous",
		rating: 5,
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use. Works multiple times per switch-in.",
	},
	inversion: {
		shortDesc: "On switch-in, this Pokemon summons Trick Room.",
		onStart(source) {
			this.add('-ability', source, 'Inversion');
			this.field.addPseudoWeather('trickroom', source, source.ability);
		},
		flags: {},
		name: "Inversion",
		rating: 5,
	},
	gravityfield: {
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
		onStart(source) {
			this.add('-ability', source, 'Gravity Field');
			this.field.addPseudoWeather('gravity', source, source.ability);
		},
		flags: {},
		name: "Gravity Field",
		rating: 4,
	},
	obstinacy: {
		desc: "User gains a boost in it's moves the lower its HP gets. Formula: (1.0 - [Current percentage of HP in decimal form]) + 1.0",
		shortDesc: "User gains a boost in it's moves the lower it's HP gets.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			const obstiancyboost = (1 - attacker.hp / attacker.maxhp) + 1;
			return this.chainModify(obstiancyboost);
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			const obstiancyboost = (1 - attacker.hp / attacker.maxhp) + 1;
			return this.chainModify(obstiancyboost);
		},
		flags: {},
		name: "Obstinacy",
		rating: 4,
	},
};
