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
		flags: {breakable: 1},
		name: "Nightmare Eater",
		rating: 3.5,
		num: 100001,
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
		num: 100002,
	},
	chemicalburn: {
		shortDesc: "Contact moves lower foe's SpD.",
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				this.boost({spd: -1}, target);
			}
		},
		name: "Chemical Burn",
		rating: 2,
		num: 100003,
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
		},
		num: 100004,
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
		num: 100005,
	},
	// slate 2
	katabaticwinds: {
		name: "Katabatic Winds",
		shortDesc: "If Gravity is active, Flying attacks deal 50% less to this Pokemon.",
		onDamage(damage, target, source, effect) {
			if (!effect.effectType || effect.effectType !== "Move") return damage;
			if (effect.type === "Flying" && this.field.getPseudoWeather('gravity')) {
				return Math.floor(damage * 0.5);
			}
		},
		flags: {breakable: 1},
		num: 100006,
	},
	prescription: {
		onUpdate(pokemon) {
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (pokemon.hp > target.hp) pokemon.m.prescription = true;
			else pokemon.m.prescription = false;
		},
		onSwitchOut(pokemon) {
			pokemon.m.prescription = false;
		},
		onStart(pokemon) {
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (pokemon.hp > target.hp) pokemon.m.prescription = true;
			else pokemon.m.prescription = false;
		},
		onChangeBoost(boost, target, source, effect) {
			if (!target.m.prescription) return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= 2;
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			console.log(source.name)
			console.log(target.name)
			if (source.m.prescription) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Prescription",
		shortDesc: "Doubles stat changes and healing if user HP > target HP.",
		rating: 4,
		num: 100007,
	},
	reallyfat: {
		shortDesc: "Electric, Fire, and Ice attacks always deal 12.5%, and secondary effects don't activate.",
		onTryHit(target, source, move) {
			if (target !== source && ['Electric','Fire','Ice'].includes(move.type)) {
				if (this.damage(target.baseMaxhp / 8)) {
					this.add('-immune', target, '[from] ability: Really Fat');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Really Fat",
		rating: 3.5,
		num: 100008,
	},
	tableflip: {
		onEffectiveness(typeMod, target, type, move) {
			typeMod *= -1;
			if (typeMod === 3) typeMod = 2
			return typeMod;
		},
		onDisableMove(pokemon) {
			if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
		},
		flags: {},
		name: "Table Flip",
		shortDesc: "Reverses type matchups, inflicts Torment on user, overrides Mold Breaker.",
		rating: 3.5,
		num: 100009,
	},
};
