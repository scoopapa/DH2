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
	snowcloak: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.status && ['snow'].includes(pokemon.effectiveWeather())) {
				this.debug('snowcloak');
				this.add('-activate', pokemon, 'ability: Snow Cloak');
				pokemon.cureStatus();
			}
		},
		flags: {},
		name: "Snow Cloak",
		rating: 1.5,
		num: 81,
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
