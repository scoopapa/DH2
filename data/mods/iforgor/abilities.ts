export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	debilitate: {
		shortDesc: "On switch-in, this Pokemon lowers the Special Attack of adjacent opponents.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Debilitate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Debilitate",
		rating: 4,
		num: -1001,
	},
	annihilate: {
		shortDesc: "On switch-in, this Pokemon lowers the Defense of adjacent opponents.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Annihilate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({def: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Annihilate",
		rating: 4,
		num: -1002,
	},
	obliterate: {
		shortDesc: "On switch-in, this Pokemon lowers the Special Defense of adjacent opponents.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Obliterate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spd: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Obliterate",
		rating: 4,
		num: -1003,
	},
	industrialize: {
		shortDesc: "This Pokemon's Normal-type moves become Steel-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Steel';
				move.pixilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.pixilateBoosted) return this.chainModify([4915, 4096]);
		},
		name: "Industrialize",
		rating: 4,
		num: -1004,
	},
	lightpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Light Power",
		shortDesc: "This Pokemon's Special Attack is doubled.",
		rating: 5,
		num: -1005,
	},
	iceage: {
		shortDesc: "This Pokemon's Ice-type attacks have 1.5x power. This Pokemon takes halved damage from Ice-type attacks.",
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.5);
			}
		},
		isBreakable: true,
		name: "Ice Age",
		rating: 4.5,
		num: -1006,
	},
	ragnarok: {
		onModifyMove(move) {
			if (!move?.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'brn',
				ability: this.dex.abilities.get('ragnarok'),
			});
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		name: "Ragnarok",
		shortDesc: "This Pokemon has a 30% chance to burn the foe when making contact or getting hit with a contact move.",
		rating: 3.5,
		num: -1007,
	},
	gravitas: {
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
		onStart(source) {
			this.add('-ability', source, 'Gravitas');
			this.field.addPseudoWeather('gravity', source, source.ability);
		},
		name: "Gravitas",
		rating: 4,
		num: -1008,
	},
	primalforce: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Primal Force boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Primal Force boost');
				return this.chainModify(1.5);
			}
		},
		name: "Primal Force",
		shortDesc: "This Pokemon's Electric attacks have 1.5x power.",
		rating: 3.5,
		num: -1009,
	},
	pillage: {
		id: "pillage",
		name: "Pillage",
		num: -1010,
		shortDesc: "On switch-in, swaps ability with the opponent.",
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if ((pokemon.side.foe.active.some(
				foeActive => foeActive && this.isAdjacent(pokemon, foeActive) && foeActive.ability === 'noability'
			))
			|| pokemon.species.id !== 'normalghost') {
				this.effectData.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectData.gaveUp) return;
			if (!this.effectData.switchingIn) return;
			const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				const ability = target.getAbility();
				const additionalBannedAbilities = [
					// Zen Mode included here for compatability with Gen 5-6
					'noability', 'flowergift', 'forecast','illusion', 'pillage','imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode',
				];
				if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				target.setAbility('pillage', pokemon);
				pokemon.setAbility(ability);
				
				this.add('-activate', pokemon, 'ability: Pillage');
				this.add('-activate', pokemon, 'Skill Swap', '', '', '[of] ' + target);
				this.add('-activate', pokemon, 'ability: ' + ability.name);
				this.add('-activate', target, 'ability: Pillage');
				return;
			}
		},
	},
	animus: {
		shortDesc: "This Pokemon restores 1/10 HP at the end of each turn.",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.heal(pokemon.baseMaxhp / 10);
			}
		},
		name: "Animus",
		rating: 4.5,
		num: -1011,
	},
	mythicswordsman: {
		shortDesc: "The Pokémon's contact moves become special.",
		onModifyMove(move) {
			if (move.flags['contact']) {
				if (move.category !== 'Special') move.category = 'Special';
			}
		},
		name: "Mythic Swordsman",
		rating: 3,
		num: -1012,
	},
	stormingsurge: {
		shortDesc: "The Pokémon's special become physical contact.",
		onModifyMove(move) {
			if (move.category === 'Special') {
				if (!move.flags['contact']) move.flags.contact = 1;
				move.category = 'Physical';
			}
		},
		name: "Storming Surge",
		rating: 3,
		num: -1013,
	},
	insectivore: {
		shortDesc: "This Pokemon is immune to Bug-type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Bug') {
				this.add('-immune', target, '[from] ability: Insectivore');
				return null;
			}
		},
		name: "Insectivore",
		rating: 3,
		num: -1014,
	},
	mortem: {
        onModifyMove(move, target) {
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
            if (move.type === 'Ghost') {
				if (!move.secondaries) move.secondaries = [];
				if (def < spd) {
					move.secondaries.push({
						chance: 20,
						boosts: {
							spd: -1,
						},
					});
				} else {
					move.secondaries.push({
						chance: 20,
						boosts: {
							def: -1,
						},
					});
				}
            }
        },
		name: "Mortem",
		shortDesc: "This Pokemon's Ghost-type attacks have an added 20% to lower the target's Defense or Special Defense, whichever is higher.",
		num: -1015,
	},
	risingsun: {
        onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.category === 'Physical') this.boost({spa: 1}, source, source);
			if (move.category === 'Special') this.boost({atk: 1}, source, source);
        },
		name: "Rising Sun",
		shortDesc: "This Pokemon raises its Attack by 1 stage when using a special attack and vice versa.",
		num: -1016,
	},
	allseeingeye: {
        onAfterMove(target, source, move) {
			if (move.type === 'Psychic' && move.category === 'Status') {
				this.heal(target.baseMaxhp / 4);
			}
		},
		name: "All-Seeing Eye",
		shortDesc: "This Pokemon's Psychic-type status moves heal it for 1/4 max HP.",
		num: -1017,
	},
	uptospeed: {
        onStart(pokemon, target) {
			pokemon.boosts.spe = target.boosts.spe;
		},
		name: "Up to Speed",
		shortDesc: "On switch-in, this Pokemon copies the speed boosts of the opponent.",
		num: -1018,
	},
	evaporate: {
		shortDesc: "This Pokemon is immune to Water-type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				this.add('-immune', target, '[from] ability: Evaporate');
				return null;
			}
		},
		name: "Evaporate",
		rating: 3,
		num: -1019,
	},
	divinegrace: {
		shortDesc: "This Pokemon's healing moves are boosted 1.5x.",
		name: "Divine Grace",
		rating: 3,
		num: -1020,
	},
	absolutezero: {
		shortDesc: "This Pokemon is immune to Fire-type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				this.add('-immune', target, '[from] ability: Absolute Zero');
				return null;
			}
		},
		name: "Absolute Zero",
		rating: 3,
		num: -1021,
	},
	toxicboost: {
		shortDesc: "If this Pokemon is poisoned, its Attack is 1.5x. This Pokemon takes no damage from poison.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') return false;
		},
		name: "Toxic Boost",
		rating: 3.5,
		num: 137,
	},
	leafguard: {
		shortDesc: "This Pokemon has its status cured at the end of each turn if Sunny Day is active.",
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.status && ['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('leafguard');
				this.add('-activate', pokemon, 'ability: Leaf Guard');
				pokemon.cureStatus();
			}
		},
		name: "Leaf Guard",
		rating: 1.5,
		num: 102,
	},
	decelerate: {
		shortDesc: "On switch-in, this Pokemon lowers the Speed of adjacent opponents.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Decelerate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Decelerate",
		rating: 4,
		num: -1022,
	},
	locate: {
		shortDesc: "On switch-in, this Pokemon lowers the Evasion of adjacent opponents.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Locate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({eva: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Locate",
		rating: 4,
		num: -1023,
	},
	energyburst: {
		shortDesc: "This Pokemon's Speed is raised by 1 stage after it is damaged by a move.",
		onDamagingHit(damage, target, source, effect) {
			this.boost({spe: 1});
		},
		name: "Energy Burst",
		rating: 3.5,
		num: -1024,
	},
	akashiarts: {
		shortDesc: "This Pokemon's slicing moves lower the target's Defense by 1.",
		onAfterMove(target, source, move) {
			if (move?.flags['slicing']) {
				target.boost({def: -1});
			}
		},
		name: "Akashi Arts",
		rating: 3.5,
		num: -1025,
	},
	overripe: {
		shortDesc: "This Pokemon receives 1/2 damage from supereffective attacks.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Overripe neutralize');
				return this.chainModify(0.5);
			}
		},
		name: "Overripe",
		rating: 4.5,
		num: -1026,
	},
};
