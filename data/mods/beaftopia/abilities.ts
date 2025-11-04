export const Abilities: {[k: string]: ModdedAbilityData} = {
	cutecharm: {
		onDamagingHit(damage, target, source, move) {
			if (this.randomChance(3, 10)) {
				source.addVolatile('attract', this.effectState.target);
			}
		},
		flags: {},
		name: "Cute Charm",
		rating: 2,
		num: 56,
	},
	flamebody: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				source.addVolatile('burn', this.effectState.target);
			}
		},
		flags: {},
		name: "Flame Body",
		rating: 2,
		num: 49,
	},
	iceblink: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special' && ['snow'].includes(target.effectiveWeather())) {
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Iceblink",
		rating: 4,
		num: 1001,
	},
	mirrorarmor: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('cfs', target);
				}
			}
		},
		flags: {},
		name: "Mirror Armor",
		rating: 2,
		num: 240,
	},
	nitratedoping: {
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Nitrate Doping' || target.status) return;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					source.trySetStatus('cfs', target);
					return;
				}
			}
		},
		flags: {},
		name: "Nitrate Doping",
		rating: 3,
		num: 1003,
	},
	owntempo: {
		onUpdate(pokemon) {
			if (pokemon.status === 'cfs') {
				this.add('-activate', pokemon, 'ability: Own Tempo');
				pokemon.cureStatus();
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'cfs') return null;
		},
		onHit(target, source, move) {
			if (move?.status === 'cfs') {
				this.add('-immune', target, 'cfs', '[from] ability: Own Tempo');
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Own Tempo",
		rating: 1.5,
		num: 20,
	},
	snowcloak: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if ((pokemon.status || pokemon.volatiles['burn']) && ['snow'].includes(pokemon.effectiveWeather())) {
				this.debug('snowcloak');
				this.add('-activate', pokemon, 'ability: Snow Cloak');
				pokemon.cureStatus();
				pokemon.removeVolatile('burn');
			}
		},
		flags: {},
		name: "Snow Cloak",
		rating: 1.5,
		num: 81,
	},
	sunblock: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if ((pokemon.status || pokemon.volatiles['burn']) && ['sun'].includes(pokemon.effectiveWeather())) {
				this.debug('sunblock');
				this.add('-activate', pokemon, 'ability: Sunblock');
				pokemon.cureStatus();
				pokemon.removeVolatile('burn');
			}
		},
		flags: {},
		name: "Sunblock",
		rating: 1.5,
		num: 1003,
	},
	technician: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 65) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Technician",
		rating: 3.5,
		num: 101,
	},
	virtualreality: {
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			// yes, you can Illusion an active pokemon but only if it's to your right
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted) {
					// If Ogerpon is in the last slot while the Illusion Pokemon is Terastallized
					// Illusion will not disguise as anything
					if (!pokemon.terastallized || possibleTarget.species.baseSpecies !== 'Ogerpon') {
						pokemon.illusion = possibleTarget;
					}
					break;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
				if (this.ruleTable.has('illusionlevelmod')) {
					this.hint("Illusion Level Mod is active, so this Pok\u00e9mon's true level was hidden.", true);
				}
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Virtual Reality",
		rating: 4.5,
		num: 1004,
	},
};
