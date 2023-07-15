export const Abilities: {[abilityid: string]: AbilityData} = {
	jawbreaker: {
		desc:
		"The Pokemon is immune to biting moves.",
		shortDesc:
		"The Pokemon is immune to biting moves.",
		onTryHit(pokemon, target, move) {
		if (move.flags['bite']) {
			this.add('-immune', pokemon, '[from] ability: Jawbreaker');
			return null;
			}
		},
		name: "Jawbreaker",
		rating: 3,
		num: 8801,
	},
	flowerhead: {
		desc:
		"Ice Face, but for Sun instead. Check the Ice Face description.",
		shortDesc:
		"Ice Face, but for Sun instead.",
		onStart(pokemon) {
			if (this.field.isWeather('sun') && pokemon.species.id === 'cherrim3noflower' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Flower Head');
				this.effectData.busted = false;
				pokemon.formeChange('Cherrim 3', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' && effect.category === 'Physical' &&
				target.species.id === 'cherrim3' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Flower Head');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'cherrim3' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'cherrim3' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'cherrim3' && this.effectData.busted) {
				pokemon.formeChange('Cherrim 3 (No Flower)', this.effect, true);
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if (!pokemon.hp) return;
			if (this.field.isWeather('sun') && pokemon.species.id === 'cherrim3noflower' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Flower Head');
				this.effectData.busted = false;
				pokemon.formeChange('Cherrim 3', this.effect, true);
			}
		},
		isPermanent: true,
		name: "Flower Head",
		rating: 3,
		num: 8802,
	},
	cherishcoat: {
		desc:
		"If hit by a status move, it fails and you get +1 Speed.",
		shortDesc:
		"If hit by a status move, it fails and you get +1 Speed.",
		name: "Cherish Coat",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.category === 'status') {
				this.boost({spe: 1}, target);
			}
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (move.category === 'status') {
				this.boost({spe: 1}, target);
			}
			return null;
		},
		condition: {
			duration: 1,
		},
		rating: 4,
		num: 8803,
	},
	soulsoothing: {
		desc:
		"This Pokemon's accuracy is raised 1 stage at the end of each full turn on the field.",
		shortDesc:
		"This Pokemon's accuracy is raised 1 stage at the end of each full turn on the field.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({accuracy: 1});
			}
		},
		name: "Soul Soothing",
		rating: 4.5,
		num: 8804,
	},
	mysticalfire: {
		desc:
		"This Pokemon's Fire attacks have an additional 30% chance to lower foe's Sp. Atk by 1.",
		shortDesc:
		"This Pokemon's Fire attacks have an additional 30% chance to lower foe's Sp. Atk by 1.",
		onModifyMove(move) {
			if (!move.category === 'status' || move.type !== 'Fire') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				boosts: {
						spa: -1,
								},
				ability: this.dex.getAbility('mysticalfire'),
			});
		},
		name: "Mystical Fire",
		rating: 2,
		num: 8805,
	},
	swordsdance: {
		desc:
		"Upon entering battle or receiving this ability, the Pokemon's Attack is raised by 2 stages, and its Defense and Special Defense are lowered by 1 stage each.",
		shortDesc:
		"On switch in, raises Attack by 2 and lowers Defense and Sp. Defense by 1.",

		onStart(pokemon) {
			this.boost({atk: 2, def: -1, spd: -1}, pokemon, pokemon, pokemon);
		},
		name: "Swords Dance",
		rating: 4,
		num: 8806,
	},
	victorydance: {
		desc:
		"Raises Speed by 1 after attacking and knocking out a foe.",
		shortDesc:
		"Raises Speed by 1 after attacking and knocking out a foe.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length}, source);
			}
		},
		name: "Victory Dance",
		rating: 3,
		num: 8807,
	},
	flatter: {
		desc:
		"Confuses foes and raises their Sp. Atk by 1 upon entering battle.",
		shortDesc:
		"Confuses foes and raises their Sp. Atk by 1 upon entering battle.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Flatter', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.setStatus('confusion', target, pokemon, null, true);
					this.boost({spa: 1}, target, pokemon, null, true);
				}
			}
		},
		name: "Flatter",
		rating: 3.5,
		num: 8808,
	},
	spiritswim: {
		desc:
		"Triples Special Defense in rain.",
		shortDesc:
		"Triples Special Defense in rain.",
		onModifySpd(spd, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(3);
			}
		},
		name: "Spirit Swim",
		rating: 3,
		num: 8809,
	},
	flowerkiss: {
		desc:
		"Special moves heal for 33% of damage dealt.",
		shortDesc:
		"Special moves heal for 33% of damage dealt.",
		onModifyMove(move) {
			if (move.category === 'Special') {
		move.drain = [1, 3]}
		},
		name: "Flower Kiss",
		rating: 2,
		num: 8810,
	},
	toughbeacons: {
		desc:
		"The Pokemon's special moves break protection.",
		shortDesc:
		"The Pokemon's special moves break protection.",
		onModifyMove(move) {
			if (move.category['Special']) delete move.flags['protect'];
		},
		name: "Tough Beacons",
		rating: 2,
		num: 8811,
	},
	softmoment: {
		shortDesc: "This Pokémon receives 3/4 damage from neutrally effective attacks.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod === 0) {
				this.debug('Soft MOMENT neutralize');
				return this.chainModify(0.75);
			}
		},
		name: "Soft MOMENT",
		rating: 3,
		num: 8812,
	},
	toxicroak: {
		desc:
		"Contact moves have a 30% chance of badly poisoning the target. Identical to Poison Touch otherwise.",
		shortDesc:
		"Contact moves have a 30% chance of badly poisoning the target.",
		onModifyMove(move) {
			if (!move?.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'tox',
				ability: this.dex.getAbility('poisontouch'),
			});
		},
		name: "Toxicroak",
		rating: 2,
		num: 8813,
	},
};
