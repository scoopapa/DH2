export const Abilities: {[k: string]: ModdedAbilityData} = {
	
	rejuvenation: {
		onDamagingHit(damage, target, source, move) {
			if (move.category != 'Status') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		flags: {},
		name: "Rejuvenation",
		shortDesc: "When this Pokémon is hit by an attack, it heals 1/8 of its maximum HP.",
			},
	
	parallelguard: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (target !== source && source.hasType(move.type)) mod *= 2/3;		
			return this.chainModify(mod);
		},
		flags: {breakable: 1},
		name: "Parallel Guard",
		shortDesc:  "This Pokemon ignores the STAB of Pokémon attacking it.",
			},

	launchingforce: {
		onStart(pokemon) {
			pokemon.addVolatile('launchingforce');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['launchingforce'];
			this.add('-end', pokemon, 'Launching Force', '[silent]');
		},
		condition: {
			duration: 5,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Launching Force');
			},
			onModifyMove(move, attacker) {
			if (move.category != 'Status') 
				move.overrideOffensiveStat = 'spe';
			},
			onAfterMove(pokemon) {
			pokemon.removeVolatile('launchingforce');
			},
			onEnd(target) {
				this.add('-end', target, 'Launching Force');
			},
		},
		flags: {},
		name: "Launching Force",
		shortDesc:"This Pokémon uses its Speed stat to calculate damage dealt on its first turn out.",
			},
	

	underdog: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			const targetWeight = defender.getWeight();
			const pokemonWeight = attacker.getWeight();
			if (pokemonWeight <= targetWeight / 5) {
				this.chainModify(1.5);
			} else if (pokemonWeight <= targetWeight / 4) {
				this.chainModify(1.4);
			} else if (pokemonWeight <= targetWeight / 3) {
				this.chainModify(1.3);
			} else if (pokemonWeight <= targetWeight / 2) {
				this.chainModify(1.2);
			} else if (pokemonWeight <= targetWeight) {
				this.chainModify(1.1);
			} else {
				this.chainModify(1);
			}
		},
		flags: {},
		name: "Underdog",
		shortDesc: "This Pokémon's moves deal increased damage based on how much lighter it is than the target Pokémon, by up to 1.5x.",
	
	},


	lifeessence: {
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category != 'Status' && move.totalDamage && !target || target.fainted || target.hp <= 0) {
				this.heal(move.totalDamage / 2, pokemon);
			}
		},

		flags: {},
		name: "Life Essence",
		shortDesc: "If this Pokémon knocks out an opposing Pokémon with an attack, this Pokémon heals half of the damage it dealt in that attack.",
	
	},


	finalbreath: {
		onResidualOrder: 24,
		onDamagePriority: -41,
		onEnd(pokemon) {
			pokemon.removeVolatile('finalbreath');
		},
		onDamage(damage, target, source, effect) {
			if (damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Final Breath');
				target.addVolatile('finalbreath');
				return target.hp - 1;
		}
	},
		condition: {
		duration: 1,
			onAfterMove(pokemon) {
			pokemon.removeVolatile('finalbreath')
			pokemon.faint();
			},
			onEnd(target) {
			this.add('-start', target, 'finalbreath');
				target.faint()
			},
	},
		flags: {breakable: 1},
		name: "Final Breath",
		shortDesc: "When this Pokémon takes fatal damage, it will remain on the field until the end of the turn instead of fainting immediately.",
	
	},

	tacticalretreat: {
    onAfterMoveSecondarySelf(source, target, move) {
        if (move && target && target != source && target.getMoveHitData(move).typeMod < 0) 
		source.switchFlag = true;

    },
		flags: {},
		name: "Tactical Retreat",
		shortDesc: "If this Pokémon deals resisted damage on an opposing Pokémon, this Pokémon is forced to switch out.",

	},

	negligible: {
		onDamage(damage, target, source, effect) {
			const maxHP = target.baseMaxhp / 8
			if (damage <= maxHP && effect) {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		flags: {breakable: 1},
		name: "Negligible",
		shortDesc:  "If this Pokemon were to take less than 12.5% of its max HP from any source, it instead takes no damage." ,
	},

	identicalbreaker: {
		onStart(pokemon) {
        const foes = pokemon.foes(true).filter(p => p && !p.fainted);
        if (!foes.length) return;
        if (foes.length === 1) {
            const foe = foes[0];
            const userTypes = pokemon.getTypes();
            const foeTypes = foe.getTypes();
            const shared = foeTypes.filter(t => userTypes.includes(t));
            if (!shared.length) return;

			if (foe.volatiles['substitute']) {
					this.add('-immune', foe);
			} else {

            let newTypes = foeTypes.filter(t => !shared.includes(t));

            if (!newTypes.length) {
                newTypes = ['???'];
            }

            foe.setType(newTypes);
            this.add('-start', foe, 'typechange', newTypes.join('/'));
            return;
			}
        }
    },
		flags: {},
		name: "Identical Breaker",
		shortDesc: "On switch-in, this Pokemon removes from the opponent any types it shares with the holder.",
	},

onguard: {
			onFoeAfterBoost(boost, target, source, effect) {
				const pokemon = this.effectState.target;
			if (target.side !== this.effectState.target.side && boost.atk && boost.atk > 0)
			this.boost({def: 1}, pokemon);
			if (target.side !== this.effectState.target.side && boost.spa && boost.spa > 0)
			this.boost({spd: 1}, pokemon);
			}
		},	
		flags: {},
		name: "On Guard",
		shortDesc: "When an opposing Pokemon raises an attacking stat, this Pokemon raises the respective Defense by 1."
}