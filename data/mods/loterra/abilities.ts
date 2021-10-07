export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	fauxliage: {
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Grass') {
				return this.chainModify(0.5);
			}
			if (move.type === 'Electric') {
				return this.chainModify(0.5);
			}
			if (move.type === 'Ground') {
				return this.chainModify(0.5);
			}
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Overcoat');
				return null;
			}
		},
		name: "Fauxliage",
		rating: 3,
		num: -6000,
	},
	pyrokinesis: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Pyrokinesis boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Pyrokinesis boost');
				return this.chainModify(1.5);
			}
		},
		name: "Pyrokinesis",
		rating: 3.5,
		num: -6001,
	},
	scaleoff: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.add('-ability', this.effectData.target, 'Scale Off');
				this.effectData.target.side.foe.addSideCondition('spikes');
			}
		},
		name: "Scale Off",
		rating: 3.5,
		num: -6002,
	},
	coupdegrass: {
		desc: "This Pokémon moves first in its priority bracket when its target has 1/2 or less of its maximum HP, rounded down. Does not affect moves that have multiple targets.",
		shortDesc: "This Pokémon moves first in its priority bracket when its target has 1/2 or less HP.",
		onUpdate(pokemon) {
			const action = this.queue.willMove(pokemon);
			if (!action) return;
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return;
			if (!action.move.spreadHit && target.hp && target.hp <= target.maxhp / 2) {
				pokemon.addVolatile('coupdegrass');
			}
		},
		name: "Coup de Grass",
		rating: 3.5,
		num: -6003,
	},
    galewind: {
        shortDesc: "This Pokémon switches out after using a Flying-type status move.",
        onAfterMove(target, source, move) {
            if (!move || !source) return;
            if (move.type === 'Flying' && move.category === 'Status') {
                if (!this.canSwitch(source.side) || source.forceSwitchFlag || source.switchFlag) return;
                for (const side of this.sides) {
                    for (const active of side.active) {
                        active.switchFlag = false;
                    }
                }
                source.switchFlag = true;
                this.add('-activate', source, 'ability: Gale Wind');
            }
        },
        name: "Gale Wind",
        rating: 4, 
        num: -6004,
    },
	ragemode: {
        onResidualOrder: 27,
        onResidual(pokemon) {
            if (pokemon.baseSpecies.baseSpecies !== 'Frozunguis', 'Sudorago','Turave','Lacfion'|| pokemon.transformed) {
                return;
            }
            if (pokemon.hp <= pokemon.maxhp / 2 && !['Rage'].includes(pokemon.species.forme)) {
                pokemon.addVolatile('ragemode');
            } else if (pokemon.hp > pokemon.maxhp / 2 && ['Rage'].includes(pokemon.species.forme)) {
                pokemon.removeVolatile('ragemode');
            }
        },
        onEnd(pokemon) {
            if (!pokemon.volatiles['ragemode'] || !pokemon.hp) return;
            pokemon.transformed = false;
            delete pokemon.volatiles['ragemode'];
            if (pokemon.species.baseSpecies === 'Frozunguis', 'Sudorago','Turave','Lacfion'&& pokemon.species.battleOnly) {
                pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
            }
        },
        isPermanent: true,
        name: "Rage Mode",
        rating: 2,
        num: -6005,
	}
};
