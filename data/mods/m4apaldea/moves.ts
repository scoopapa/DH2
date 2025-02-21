export const Moves: {[moveid: string]: ModdedMoveData} = {
  // completely just being lazy and copying everything about the main mod's hazards for the hazardImmune flag; will change if it causes problems
	gmaxsteelsurge: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The sharp spikes are surrounding ${active.name}!`);
					}
				}
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || (this.dex.abilities.get(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())) return;
				for (const active of this.getAllActive()) {
					if (active.hasAbility('gravitationalpull')) return;
				}
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	spikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The spikes are surrounding ${active.name}!`);
					}
				}
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || (this.dex.abilities.get(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())) return;
				for (const active of this.getAllActive()) {
					if (active.hasAbility('gravitationalpull')) return;
				}
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The pointed stones are surrounding ${active.name}!`);
					}
				}
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || (this.dex.abilities.get(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())) return;
				for (const active of this.getAllActive()) {
					if (active.hasAbility('gravitationalpull')) return;
				}
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The sticky web is surrounding ${active.name}!`);
					}
				}
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || (this.dex.abilities.get(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())) return;
				for (const active of this.getAllActive()) {
					if (active.hasAbility('gravitationalpull')) return;
				}
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectState.source, this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	toxicspikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
				for (const active of this.getAllActive()) {
					if (active.volatiles['gravitationalpull']) {
						this.add('-ability', active, 'Gravitational Pull');
						this.add('-message', `The toxic spikes are surrounding ${active.name}!`);
					}
				}
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison') && !this.field.getPseudoWeather('stickyresidues')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (
					pokemon.hasType('Steel') || pokemon.hasType('Poison') ||
					pokemon.hasItem('heavydutyboots') || (this.dex.abilities.get(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())
							 ) {
					return;
				} else {
					for (const active of this.getAllActive()) {
						if (active.hasAbility('gravitationalpull')) return;
					}
					if (this.effectState.layers >= 2) {
						pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
					} else {
						pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
					}
				}
			},
		},
	},


	// Endless Dream field
	wakeupslap: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose') || this.field.getPseudoWeather('endlessdream')) return move.basePower * 2;
			return move.basePower;
		},
	},
	dreameater: {
		inherit: true,
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || this.field.getPseudoWeather('endlessdream');
		},
	},
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose') && !this.field.getPseudoWeather('endlessdream')) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	sleeptalk: {
		inherit: true,
		onTry(source) {
			let usable = false;
			for (const opponent of source.adjacentFoes()) {
				if (this.field.getPseudoWeather('endlessdream')) {
					usable = true;
					break;
				}
			}
			return source.status === 'slp' || source.hasAbility('comatose') || usable;
		},
	},
	// For Ogerpon-Mega
	ivycudgel: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Ogerpon-Wellspring': case 'Ogerpon-Wellspring-Tera':
				move.type = 'Water';
				break;
			case 'Ogerpon-Hearthflame': case 'Ogerpon-Hearthflame-Tera':
				move.type = 'Fire';
				break;
			case 'Ogerpon-Cornerstone': case 'Ogerpon-Cornerstone-Tera':
				move.type = 'Rock';
				break;
			case 'Ogerpon-Mega':
				move.type = 'Fairy';
				break;
			}
		},
	},
};
