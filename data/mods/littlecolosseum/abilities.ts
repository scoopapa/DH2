export const Abilities: {[k: string]: ModdedAbilityData} = {
	hazardabsorb: {
    	// implemented in moves.ts
		flags: {},
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
	galewings: {
		onModifyPriority(priority, pokemon, target, move) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('counteract') && poke.side.id !== pokemon.side.id && !poke.abilityState.ending) {
					return;
				}
			}
			if (move?.type === 'Flying' && pokemon.hp >= pokemon.maxhp / 4) return priority + 1;
		},
		flags: {},
		name: "Gale Wings",
		shortDesc: "If this Pokemon has 25% of its max HP or more, its Flying-type moves have +1 priority.",
		rating: 3,
		num: 177,
	},
	magicresistance: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Magic Resistance weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Magic Resistance weaken');
				return this.chainModify(0.5);
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target || source.switchFlag === true) return;
			if (target !== source && move.category !== 'Status') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Magic Resistance', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Magic Resistance",
		rating: 3.5,
		shortDesc: "This Pokemon steals foe's item after hitting them, and takes 50% damage from Fire/Ice.",
	},
	hover: {
    	// implemented in moves.ts
		// and also scripts.ts
		flags: {},
		shortDesc: "This Pokemon is immune to Ground moves and Stealth Rock.",
		name: "Hover",
		rating: 4,
	},
	stall: {
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target || source.switchFlag === true) return;
			if (move.category === 'Status') {
				this.add('-activate', pokemon, 'ability: Stall');
				// add message here later
				const repeatMove = this.dex.getActiveMove(move.id);
				this.actions.useMove(repeatMove, source, target);
			}
		},
		onFractionalPriority: -0.1,
		flags: {},
		shortDesc: "This Pokemon's status moves are used twice, but it usually moves last.",
		name: "Stall",
		rating: 1,
		num: 100,
	},
};
