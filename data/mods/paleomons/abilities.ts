export const Abilities: {[k: string]: ModdedAbilityData} = {
	firstflight: {
		name: "First Flight",
		shortDesc: "User is considered airborne until hit with an attack. Resets upon switching out.",
		onStart(target) {
			if (!this.field.getPseudoWeather('gravity')) {
				this.add('-ability', target, 'First Flight');
				target.addVolatile('firstflight');
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('firstflight');
		},
		condition: {
			onStart(target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'First Flight', '[silent]');
				this.add('-message', `${target.name} has flown for the first time!`);
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onDamagingHit(damage, target, source, move) {
				target.removeVolatile('firstflight');
			},
			onEnd(target) {
				this.add('-end', target, 'First Flight', '[silent]');
				this.add('-message', `${target.name} crash-landed!`);
			},
		},
	},
	headbarrage: {
		name: "Head Barrage",
		shortDesc: "All Special moves used by the user become physical and add 25% recoil.",
		onModifyMove(move) {
			if(move.category === 'Special') {
				if (!move.recoil) move.recoil = [1, 4];
				move.category = 'Physical';
			}
		},
	},
	leatherback: {
		name: "Leatherback",
		shortDesc: "This Pokemon's Special Defense is raised one stage if hit by an Electric move; Electric immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spd: 1})) {
					this.add('-immune', target, '[from] ability: Leatherback');
				}
				return null;
			}
		},
		flags: {breakable: 1},
	},
	specterate: {
		name: "Specterate",
		shortDesc: "This Pokemon's Normal-type moves become Ghost type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ghost';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
	},
	nightwatch: {
		name: "Night Watch",
		shortDesc: "This Pokemon's attacks have 1.5x power against Dark types.",
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if(target.hasType('Dark')) return this.chainModify(1.5);
		},
	},
	permafrost: {
		name: "Permafrost",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Permafrost');
			this.add('-message', `${pokemon.name}'s freezing aura turns water into ice!`);
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice') {
				this.boost({def: 1});
			}
		},
		onFoeBeforeMovePriority: 13,
		onFoeBeforeMove(attacker, defender, move) {
			attacker.addVolatile('permafrost');
		},
		condition: {
			onModifyTypePriority: -1,
			onModifyType(move, pokemon) {
				if (move.type === 'Water') {
					move.type = 'Ice';
				}
			},
			onAfterMove(pokemon) {
				pokemon.removeVolatile('permafrost');
			},
		},
		shortDesc: "Water moves used against this Pokemon become Ice-type. +1 Def when hit by Ice.",
		rating: 4,
	},
	sedimentary: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && ['raindance', 'primordialsea'].includes(attacker.effectiveWeather())) {
				this.debug('Sedimentary boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && ['raindance', 'primordialsea'].includes(attacker.effectiveWeather())) {
				this.debug('Sedimentary boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Sedimentary",
		shortDesc: "This Pokemon's Bug-type moves have 1.5x power in Rain.",
	},
	predator: {
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(move.totalDamage / 8, pokemon);
			}
		},
		flags: {},
		name: "Predator",
		shortDesc: "After an attack, this Pokemon gains 1/8 of the damage in HP dealt to other Pokemon.",
	},

	zenmode: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Eleffigy' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.species.forme !== 'Zen') {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && pokemon.species.forme === 'Zen') {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Eleffigy' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.species.forme !== 'Zen') {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && pokemon.species.forme === 'Zen') {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (pokemon.species.baseSpecies === 'Eleffigy' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.species.id !== 'eleffigyzen') pokemon.formeChange('Eleffigy-Zen');
			},
			onEnd(pokemon) {
				if (pokemon.species.forme === 'Zen') {
					pokemon.formeChange('eleffigy');
				}
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Zen Mode",
		shortDesc: "If Eleffigy, at end of turn changes Mode to Standard if > 1/2 max HP, else Zen.",
	},
};