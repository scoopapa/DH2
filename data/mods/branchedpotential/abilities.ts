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
};
