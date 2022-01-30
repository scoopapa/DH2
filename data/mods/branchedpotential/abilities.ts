export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	shieldsdown: {
		onStart(pokemon) {
			if ((pokemon.baseSpecies.baseSpecies !== 'Minior' && pokemon.baseSpecies.baseSpecies !== 'Stacragus') || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.baseSpecies.baseSpecies === 'Minior' && pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				} else if (pokemon.baseSpecies.baseSpecies === 'Stacragus' && pokemon.species.forme !== 'Chrysalis') {
					pokemon.formeChange('Stacragus-Chrysalis');
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				}
			} else {
				if (pokemon.species.forme === 'Meteor' || pokemon.species.forme === 'Chrysalis') {
					pokemon.formeChange(pokemon.set.species);
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if ((pokemon.baseSpecies.baseSpecies !== 'Minior' && pokemon.baseSpecies.baseSpecies !== 'Stacragus') || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.baseSpecies.baseSpecies === 'Minior' && pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				} else if (pokemon.baseSpecies.baseSpecies === 'Stacragus' && pokemon.species.forme !== 'Chrysalis') {
					pokemon.formeChange('Stacragus-Chrysalis');
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				}
			} else {
				if (pokemon.species.forme === 'Meteor' || pokemon.species.forme === 'Chrysalis') {
					pokemon.formeChange(pokemon.set.species);
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((target.species.id !== 'miniormeteor' && target.species.id !== 'stacraguschrysalis') || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shields Down');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if ((target.species.id !== 'miniormeteor' && target.species.id !== 'stacraguschrysalis') || target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Shields Down');
			return null;
		},
		isPermanent: true,
		isUnbreakable: true,
		desc: "Minior/Stacragus, upon switch-in/end of turn change to Core/Offense at 1/2 max HP or less, else Meteor/Chrysalis.",
		name: "Shields Down",
		rating: 3,
		num: 197,
	},
	esiugsid: {
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['phankyr'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Esiugsid');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['phankyr'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['phankyr'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['phankyr'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = 'Phankyr-Revealed';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(speciesid));
			}
		},
		isPermanent: true,
		desc: "(Phankyr only) The first hit it takes is blocked, and it takes 1/8 HP damage instead.",
		name: "Esiugsid",
		rating: 3.5,
		num: 209,
	},
	lethalpoison: {
		onSourceAfterFaint(length, target, source, effect) {
		if (source.activeMoveActions < 6) {
			if (effect && effect.effectType === 'Move') {
			this.boost({atk: 2}, source);
				}
			}
		},
		desc: "This Pokemon's Attack is raised by 2 stages if it KOes another Pokemon within 5 turns.",
		name: "Lethal Poison",
		rating: 3,
		num: 210,
	},
		prism: {
		isPermanent: true,
		onTryHit(target, source, move) {
			let type: string | undefined = 'Normal';
			type = target.getItem().onMemory;
			if (!type) {
				type = 'Normal';
			}
			if (target !== source && move.type === type) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its typing changes to match its held memory; immunity to moves of the same typing.",
		name: "Prism",
		rating: 3.5,
		num: -100,
	},
	holyconduit: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Psychic') {
				this.debug('Holy Conduit boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Psychic') {
				this.debug('Holy Conduit boost');
				return this.chainModify(1.5);
			}
		},
		desc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Psychic-type attack.",
		name: "Holy Conduit",
		rating: 3.5,
		num: -118,
	},

	potionmaster: {

		onModifyMove(move) {
			if (!move || move.category !== "Special" || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.getAbility('potionmaster'),
			});
		},

		desc: "This Pokemon's special attacks have a 30% chance to poison",
		name: "Potion Master",
		rating: 2,
		num: -119
	},
};
