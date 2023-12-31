export const Abilities: {[abilityid: string]: AbilityData} = {
	nightmareeater: {
		shortDesc: "Immune to Dark-type moves, and recovers 25% when hit by one.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Nightmare Eater');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Nightmare Eater",
		rating: 3.5,
		num: 10,
	},
	poweroftwo: {
		shortDesc: "If this Pokemon has two moves or less, its power boosts by 1.3x",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
				return this.chainModify(1.3);
			}
		},
		name: "Power of Two",
		rating: 2,
		num: 18.1,
	},
	chemicalburn: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				this.boost({spd: -1}, target);
			}
		},
		name: "Chemical Burn",
		rating: 2,
		num: 143,
	},
	camoform: {
		name: "Camoform",
		shortDesc: "User's type changes to match it's first two moves.",
		onStart(pokemon) {
			const types = [...new Set(pokemon.baseMoveSlots.slice(0, 2).map(move => this.dex.moves.get(move.id).type))];
			pokemon.setType(types);
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[from] ability: Camoform');
		}
	},
	trickster: {
		name: "Trickster",
		shortDesc: "A bunch of random status moves become physical (thanks anaconja)",
		onModifyMove(move, pokemon) {
			let trickyMoves = ["After You", "Block", "Confide", "Defog", "Guard Split", "Guard Swap", "Heart Swap", "Instruct", "Lock-On", "Mean Look", "Mimic", "Pain Split", "Play Nice", "Power Split", "Power Swap", "Psych Up", "Reflect Type", "Roar", "Role Play", "Skill Swap", "Speed Swap", "Spicy Extract", "Tearful Look", "Transform", "Whirlwind", "Yawn"];
			if (trickyMoves.includes(move.name));
			move.category = "Physical";
			move.basePower = 80;
		}
	},
	wishingstar: {
		name: "Wishing Star",
	   onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'wishingstar');
	   },
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					  const source = this.effectState.source;
					  const damage = this.heal(source.baseMaxhp / 8, target, source);
					  target.side.removeSlotCondition(target, 'wishingstar');
				 }
			},
	   },
		rating: 3,
		shortDesc: "On switch-out, the next Pokemon sent out heals 1/8 of the user's max HP.",
		num: 131,
	},
};
