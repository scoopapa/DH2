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
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism",
		rating: 4,
		num: -100,
	},
	prismbug: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Bug') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Bug)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Bug)",
		rating: 4,
		num: -101,
	},
	prismdark: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Dark)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Dark)",
		rating: 4,
		num: -102,
	},
	prismdragon: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dragon') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Dragon)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Dragon)",
		rating: 4,
		num: -103,
	},
	prismelectric: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Electric)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Electric)",
		rating: 4,
		num: -104,
	},
	prismfairy: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Fairy)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Fairy)",
		rating: 4,
		num: -105,
	},
	prismfighting: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fighting') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Fighting)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Fighting)",
		rating: 4,
		num: -106,
	},
	prismfire: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Fire)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Fire)",
		rating: 4,
		num: -107,
	},
	prismflying: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Flying)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Flying)",
		rating: 4,
		num: -108,
	},
	prismghost: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Ghost)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Ghost)",
		rating: 4,
		num: -109,
	},
	prismgrass: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Grass)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Grass)",
		rating: 4,
		num: -110,
	},
	prismground: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Ground)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Ground)",
		rating: 4,
		num: -111,
	},
	prismice: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Ice)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Ice)",
		rating: 4,
		num: -112,
	},
	prismpoison: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Poison)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Poison)",
		rating: 4,
		num: -113,
	},
	prismpsychic: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Psychic') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Psychic)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Psychic)",
		rating: 4,
		num: -114,
	},
	prismrock: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Rock') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Rock)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Rock)",
		rating: 4,
		num: -115,
	},
	prismsteel: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Steel') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Steel)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Steel)",
		rating: 4,
		num: -116,
	},
	prismwater: {
		isPermanent: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Prism (Water)');
				}
				return null;
			}
		},
		desc: "If this Pokemon is a Chrienmor, its type changes to match its held Memory and it gains an immunity to that type.",
		name: "Prism (Water)",
		rating: 4,
		num: -117,
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
};
