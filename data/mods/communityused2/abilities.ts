export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	generator: {
		name: "Generator",
		shortDesc: "Start at 0.75x power, gain 0.25x per attack used by or against. Max 1.5.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Generator');
			this.add('-message', `${pokemon.name} is revving up!`);
			pokemon.addVolatile('generator');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.generatorTriggers = 0;
			},
			onDamagingHit(damage, target, source, move) {
				if (this.effectState.generatorTriggers < 3) {
					this.effectState.generatorTriggers++;
					this.add('-ability', target, 'Generator');
					this.add('-message', `${target.name} is at charge level ${this.effectState.generatorTriggers}!`);
				}
			},
			onSourceDamagingHit(damage, target, source, move) {
				if (this.effectState.generatorTriggers < 3) {
					this.effectState.generatorTriggers++;
					this.add('-ability', source, 'Generator');
					this.add('-message', `${source.name} is at charge level ${this.effectState.generatorTriggers}!`);
				}
			},
			onBasePowerPriority: 21,
			onBasePower(basePower, attacker, defender, move) {
				if (this.effectState.generatorTriggers === 0) return this.chainModify([3, 4]);
				if (this.effectState.generatorTriggers === 1) return this.chainModify([4, 4]);
				if (this.effectState.generatorTriggers === 2) return this.chainModify([5, 4]);
				if (this.effectState.generatorTriggers === 3) return this.chainModify([6, 4]);
			},
		},
		flags: { breakable: 1 },
	},
	blazingglory: {
		onAfterMove(target, source, move) {
			if (target !== source && move.category !== 'Status' && move.totalDamage) {
				this.damage(source.baseMaxhp / 16, source, target);
			}
		},
		name: "Blazing Glory",
		shortDesc: "This Pokemon’s attacks do an additional 1/16 of the target’s max HP in damage.",
	},
	brittlecrystals: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const stealthRocks = side.sideConditions['stealthrock'];
			if ((!stealthRocks) && this.checkMoveMakesContact(move, source, target)) {
				this.add('-activate', target, 'ability: Brittle Crystals');
				side.addSideCondition('stealthrock', target);
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: { breakable: 1 },
		name: "Brittle Crystals",
		shortDesc: "When hit by a contact move, set up Rocks on the opposing side. User takes 12.5%.",
	},
	dreamrunner: {
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			for (const target of pokemon.foes()) {
				if (target.status === 'slp') {
					return this.chainModify(1.5);
				}
			}
		},
		name: "Dream Runner",
		shortDesc: "If the opposing Pokemon is asleep, the user's speed is boosted by 1.5x."
	},
	frostcloak: {
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		flags: { breakable: 1 },
		name: "Frost Cloak",
		shortDesc: "Only takes damage from direct attacks.",
	},
	geothermal: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Fire') {
				this.debug('geothermal weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Fire') {
				this.debug('geothermal weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Geothermal",
		shortDesc: "Takes half damage from Water and Fire moves.",
	},
	justalittleguy: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (attacker.getWeight() > defender.getWeight()) {
				this.debug('JALG weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (attacker.getWeight() > defender.getWeight()) {
				this.debug('JALG weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Just A Little Guy",
		shortDesc: "Takes half damage if lighter than opponent.",
	},
	mindwarp: {
		onStart(source) {
			this.add('-ability', source, 'Mind Warp');
			this.field.addPseudoWeather('wonderroom', source);
		},
		name: "Mind Warp",
		shortDesc: "Sets Wonder Room on entry.",
	},
	overconfidence: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp >= (pokemon.baseMaxhp / 2)) return this.chainModify(1.2);
			return this.chainModify(0.8);
		},
		name: "Overconfidence",
		shortDesc: "If above half health, deals 1.2x damage. When under, deals 0.8x.",
	},
	patience: {
		onAfterMove(source, target, move) {
			if (move.category === 'Status') {
				source.addVolatile('patience');
			}
		},
		condition: {
			duration: 2,
			onBasePower(basePower, attacker, defender, move) {
				return this.chainModify([13, 10]);
			}
		},
		name: "Patience",
		shortDesc: "Deals 1.3x damage the turn after using a status move.",

	},
	envious: {
		onBasePower(basePower, attacker, defender, move) {
			if (defender.hp === defender.baseMaxhp) return this.chainModify([13, 10]);
		},
		name: "Envious",
		shortDesc: "Deals 1.3x damage if the target is at full HP.",
	},
	phasein: {
		onStart(pokemon) {
			pokemon.addVolatile('phasein');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['phasein'];
			this.add('-end', pokemon, 'Phase In', '[silent]');
		},
		condition: {
			duration: 5,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Phase In');
				this.add('-message', `${target.name} is phasing in!`);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Phase In');
			},
			//onSourceModifyDamage(damage, source, target, move) {
			//	let mod = 1;
			//	if (move.flags['contact']) mod /= 2;
			//	return this.chainModify(mod);
			//},
		},
		flags: {breakable: 1},
		name: "Phase In",
		shortDesc: "For 5 turns, halves speed and attack of user.",
		//shortDesc: "For 5 turns, halves speed and attack of user, and take half damage from contact moves.",

	},
	rooted: {
		onStart(pokemon) {
			pokemon.addVolatile('ingrain');
		},
		name: "Rooted",
		shortDesc: "Ingrains the user in the ground on switch-in.",

	},
	saunapower: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		flags: {},
		name: "Sauna Power",
		shortDesc: "Doubles Special Attack of the user.",

	},
	windeater: {
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				this.boost({ spe: 2 }, target, target);
			}
		},
		flags: { breakable: 1 },
		name: "Wind Eater",
		shortDesc: "After being hit by a wind move, +2 Speed.",

	},
	wreckingball: {
		onModifyMove(move) {
			delete move.flags['protect'];
		},
		onTryHit(pokemon) {
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		flags: {},
		name: "Wrecking Ball",
		shortDesc: "User's moves break through protect and also break screens.",

	},
	mountaineer: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "User is immune to Rock-type damage on switch-in."
	},
	ouroboros: {
		onStart(pokemon) {
			pokemon.addVolatile('ouroboros');
			this.add('-message', `${pokemon.name} is circling!`);
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				this.effectState.hasChoked = false;
				if (!pokemon.hasAbility('ouroboros')) {
					pokemon.removeVolatile('ouroboros');
					return;
				}
				if (this.effectState.lastMove === move.id) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else if (this.effectState.lastMove === '') {
						// on first turn out, do nothing
				} else {
					if (move.name != "Devour") {
						this.effectState.numConsecutive = 0;
						this.add('-message', `${pokemon.name} choked!`);
						this.effectState.hasChoked = true;
						this.damage(pokemon.baseMaxhp / 10, pokemon, pokemon);
					} else this.debug(`Devour cancelled choke`);
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				if (this.effectState.hasChoked) return this.chainModify([3, 4]);

				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current ouroboros boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		name: "Ouroboros",
		shortDesc: "Metronome (item). When broken, take damage."
	},
	ragnarok: {
		onResidual(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.hp * 2 <= target.baseMaxhp) {
					//do nothing
				} else {
					this.damage(target.baseMaxhp / 8, target, target);
				}
			}
		},
		name: "Ragnarok",
		shortDesc: "Damages all active Pokemon above 50% take 12.5%/turn.",
	},
};
