export const Abilities: import('../sim/dex-abilities').AbilityDataTable = {
	anticlockwise: {
		onDamagingHit(damage, target, source, move) {
			if (move.category !== 'Physical') return;

			if (target.side.field.getPseudoWeather('trickroom')) {
				target.side.field.removePseudoWeather('trickroom');
				this.add('-ability', target, 'Anticlockwise');
				this.add('-message', `The dimensions returned to normal!`);
				return;
			}

			target.side.field.addPseudoWeather('trickroom', target, this.effect, 5);
			this.add('-ability', target, 'Anticlockwise');
			this.add('-message', `The dimensions were twisted!`);
		},
		flags: {},
		name: "Anticlockwise",
		shortDesc: "Activates Trick Room (5 turn duration) in response to a physical attack.",
	},
	fireabsorb: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Fire Absorb');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Fire Absorb",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Fire moves; Fire immunity.",
	},
	flowerpower: {
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifyDef(def, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpA(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpD(spd, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Flower Power",
		shortDesc: "In sun, this Pokémon's Attack, Defense, SpA, SpD, and Speed are multiplied by 1.5.",
	},
	fullcircle: {
		onDamagingHit(damage, target, source, move) {
			if (!source || !damage) return;
			this.queue.insertChoice({
				choice: 'runCircle',
				pokemon: target,
				priority: -100,
				callback: () => {
					this.damage(damage, source, target, null, true);
				},
			});
		},
		flags: {},
		name: "Full Circle",
		shortDesc: "When hit by an attack, attacker takes indirect damage equal to HP this Pokémon lost.",
	},
	glochidia: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const spikes = side.sideConditions['spikes'];
			if (move.category === 'Physical' && (!spikes || spikes.layers < 3)) {
				this.add('-activate', target, 'ability: Glochidia');
				side.addSideCondition('spikes', target);
			}
		},
		flags: {},
		name: "Glochidia",
		shortDesc: "If this Pokemon is hit by a physical attack, Spikes are set on the opposing side.",
	},
	healingchime: {
		name: "Healing Chime",
		shortDesc: "On switch-in, cures all party status if any ally is statused.",
		onStart(pokemon) {
			const side = pokemon.side;
			let hasStatus = false;
			// Check if anyone on the side has a status condition
			for (const ally of side.pokemon) {
				if (ally.status) {
					hasStatus = true;
					break;
				}
			}
			if (!hasStatus) return;
			// Activate ability
			this.add('-ability', pokemon, 'Healing Chime');
			this.add('-message', `A soothing chime echoed across ${side.name}'s party!`);
			// Cure all party status
			for (const ally of side.pokemon) {
				if (ally.status) {
					ally.cureStatus();
				}
			}
		},
	},
	ironsmith: {
		name: "Ironsmith",
		shortDesc: "If the opponent is a Steel-type, this Pokemon's attacks will always be super-effective. Ignores other typings.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Ironsmith');
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!target.hasType('Steel')) return;
			if (type === 'Steel') return 1;
			return 0;
		},
	},
	premonition: {
		onStart(pokemon) {
			if (pokemon.outFlickered) return;
			pokemon.addVolatile('premonition');
		},
		condition: {
			duration: 1,
			onStart(target) {
            this.add('-start', target, 'ability: Premonition');
            this.add('-message', `${target.name} has a Premonition!`);
            this.add('-anim', target, 'Double Team', target);
			},
			onTryHit(target, source, move) {
				if (move.category !== 'Status' && target !== source) {
					this.add('-immune', target, '[from] ability: Premonition');
					return null;
				}
			},
			onEnd(target) {
				target.outFlickered = true;
				this.add('-end', target, 'Premonition');
            	this.add('-message', `${target.name} premonition has ended!`);
			},
		},
		flags: {breakable: 1},
		name: "Premonition",
		shortDesc: "Once per battle, this Pokemon dodges any attacking move on it's first active turn.",
	},
	saptrap: {
		name: "Sap Trap",
		shortDesc: "This Pokemon's trapping moves do 1/6 max HP per turn instead of 1/8. 1/4 if it also holds Binding Band.",
		// No event hooks needed here — this ability just acts as a flag
		// that conditions.ts checks when calculating partial-trap damage.
	},
	soulcontrol: {
		name: "Soul Control",
		shortDesc: "Every turn, drains 1/8 max HP from each adjacent foe (unless immune to indirect damage), healing this Pokemon by the total drained.",
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			let totalDrained = 0;
			for (const foe of pokemon.adjacentFoes()) {
				if (!foe.hp) continue;
				const damageAmount = this.clampIntRange(Math.floor(foe.baseMaxhp / 8), 1);
				const damageDealt = this.damage(damageAmount, foe, pokemon);
				if (typeof damageDealt === 'number') totalDrained += damageDealt;
			}
			if (totalDrained > 0) {
				this.heal(totalDrained, pokemon, pokemon);
			}
		},
	},
	speedster: {
		name: "Speedster",
		shortDesc: "This Pokemon's Speed is multiplied by 1.5.",
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.5);
		},
	},
	splashborne: {
		name: "Splashborne",
		shortDesc: "This Pokemon's Water-type attacks have their power multiplied by 1.5.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.5);
			}
		},
	},
	terramorphosis: {
		name: "Terramorphosis",
		shortDesc: "Resists Rock-type moves and Stealth Rock (as if x0.5). Its Rock-type attacks do 1.5x damage.",

		// 1. Extra resistance to incoming Rock-type moves (stacks with normal type chart)
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock') {
				return this.chainModify(0.5);
			}
		},

		// 2. Extra resistance to Stealth Rock specifically
		// (Stealth Rock computes its own damage outside the normal move pipeline,
		// so onSourceModifyDamage above won't catch it — needs its own hook)
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return this.clampIntRange(Math.floor(damage / 2), 1);
			}
		},

		// 3. 1.5x boost on its own Rock-type attacks
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Rock') {
				return this.chainModify(1.5);
			}
		},
	},
	thornberries: {
		name: "Thorn Berries",
		shortDesc: "On contact, attaches Thorn Berries to the attacker (Leech Seed effect, but can affect Grass-types).",
		onDamagingHit(damage, target, source, move) {
			// target = the foe that hit us; source = this ability holder (irrelevant here)
			// "target" in onDamagingHit is the Pokemon that got hit — i.e., the ability holder itself
		},
		// Contact-on-attack needs to run when THIS Pokemon deals a contact hit, not when it's hit.
		// Use onAfterHit, which fires after this Pokemon successfully lands a hit on the target.
		onAfterHit(target, source, move) {
			// source = the ability holder (the one who attacked and made contact)
			// target = the foe who got hit
			if (!move.flags['contact']) return;
			if (target.hasAbility('magicguard')) return; // matches Leech Seed's normal interaction w/ Magic Guard-esque immunities if desired
			target.addVolatile('thornberries', source);
		},
	},
	airlock: {
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// Air Lock does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			pokemon.abilityState.ending = false; // Clear the ending flag
			if (this.effectState.switchingIn) {
				this.add('-ability', pokemon, 'Air Lock');
				this.effectState.switchingIn = false;
			}

			// Clear the current weather, unless it's Primal Weather
			const primalWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.weather && !primalWeathers.includes(this.field.weather)) {
				this.field.clearWeather();
			}
		},
		flags: {},
		name: "Air Lock",
		shortDesc: "Clears weather upon switching in.",
		rating: 1.5,
	},
	arenatrap: {
		name: "Arena Trap",
		shortDesc: "On switch-in of any other Pokemon (including allies), lowers their Speed by 2 stages. Doesn't affect airborne Pokemon, Heavy-Duty Boots holders, or other Arena Trap holders.",

		onAnySwitchIn(target) {
			const source = this.effectState.target; // the Arena Trap holder
			if (target === source) return; // don't affect itself

			// Airborne immunity (Flying-type, Levitate, Air Balloon, Magnet Rise, Telekinesis)
			if (target.isGrounded && !target.isGrounded()) return;

			// Item immunity
			if (target.hasItem('heavydutyboots')) return;

			// Other Arena Trap holders are immune
			if (target.hasAbility('arenatrap')) return;

			this.boost({ spe: -2 }, target, source, this.effect);
		},

		flags: {},
		rating: 3,
	},
	bigpecks: {
		name: "Big Pecks",
		shortDesc: "This Pokemon cannot have its stats lowered by other Pokemon.",
		onTryBoost(boost, target, source, effect) {
			// Don't block if the Pokemon is lowering its OWN stats (e.g. Overheat, Close Combat, Leaf Storm)
			if (source && target === source) return;
			if (effect.id === 'octolock') return; // Octolock's repeating drops still bypass this, same as Clear Body
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaryEffect) {
				this.add('-fail', target, 'unboost', '[from] ability: Big Pecks', `[of] ${target}`);
			}
		},
		flags: {breakable: 1},
		rating: 1.5,
	},
	cloudnine: {
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// Air Lock does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			pokemon.abilityState.ending = false; // Clear the ending flag
			if (this.effectState.switchingIn) {
				this.add('-ability', pokemon, 'Cloude Nine');
				this.effectState.switchingIn = false;
			}

			// Clear the current weather, unless it's Primal Weather
			const primalWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.weather && !primalWeathers.includes(this.field.weather)) {
				this.field.clearWeather();
			}
		},
		flags: {},
		name: "Cloude Nine",
		shortDesc: "Clears weather upon switching in.",
		rating: 1.5,
	},
	corrosion: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		shortDesc: "When using Poison moves or Inflicting Poison Status: Ignore type immunities.",
	},
}
