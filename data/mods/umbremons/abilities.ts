export const Abilities: { [abilityid: string]: ModdedAbilityData; } = {
	// New Abilities
	massive: {
		onFoeModifyDamage(relayVar, target, source, move) {
		// If an allAdjacentFoes move is targeting a massive Pokemon's side, it's now a single target move and has its spread damage nerf neutralized
		if (move.target === 'allAdjacentFoes')
			this.chainModify(1 / 0.75);
		},
		onAllyTryHit(target, source, move) {
			if (['allAdjacentFoes', 'allAdjacent'].includes(move.target)) {
				for (const allyActive of target.adjacentAllies()) {
					// Announcing the ability when it procs
                	if (allyActive.ability === 'massive' && allyActive != source) {
						this.add('-ability', allyActive, 'Massive');
						return null;
					}
            	}
			}
		},
		num: -1,
		flags: {breakable: 1},
		name: "Massive",
		shortDesc: "Allies are always protected from spread moves.",
	},
	masquerade: {
		num: -2,
		desc: "This Pokémon inherits the Ability of the last unfainted Pokemon in its party until it takes direct damage from another Pokémon's attack. Permanent abilities cannot be copied.",
		shortDesc: "Inherits the Ability of the last party member. Wears off when attacked.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp || pokemon.volatiles['masquerade']) return;
			pokemon.addVolatile('masquerade');
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (
					pokemon.side.pokemon[i].fainted ||
					pokemon.side.pokemon[i].getAbility().flags['notrace']) {
						continue;
					}
				break;
			}
			if (!pokemon.side.pokemon[i] || pokemon === pokemon.side.pokemon[i]) {
				this.effectState.gaveUp = true;
				return;
			}
			const masquerade = pokemon.side.pokemon[i];
			this.add('-ability', pokemon, 'Masquerade');
			pokemon.setAbility(masquerade.ability);
			this.hint(`${pokemon.name} inherited ${this.dex.abilities.get(pokemon.ability).name} from ${masquerade.name}!`);
			this.add('-ability', pokemon, this.dex.abilities.get(pokemon.ability).name, '[silent]');
		},
		condition: {
			onDamagingHit(damage, target, source, move) {
				this.effectState.busted = true;
			},
			onFaint(pokemon) {
				this.effectState.busted = true;
			},
			onUpdate(pokemon) {
				if (pokemon.hasAbility('masquerade')) return;
				if (this.effectState.busted) {
					this.add('-ability', pokemon, 'Masquerade');
					this.add('-message', `${pokemon.name}'s Masquerade wore off!`);
					pokemon.setAbility('masquerade');
				}
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Masquerade",
	},
	sandclock: {
		num: -3,
		desc: "Under Sandstorm, user skips Charge and Recharge turns. Immunity to Sandstorm damage. (note: this also ignores sand's damage reduction to moves like Solar Beam)",
		shortDesc: "Under sandstorm, skips charge and recharge.",
		onChargeMove(pokemon, target, move) {
			if (this.field.isWeather('sandstorm')) {
				this.debug('sandclock - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', pokemon, move.name, target);
				return false; // skip charge turn
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (this.field.isWeather('sandstorm')) {
				if (pokemon.getVolatile('mustrecharge')) {
					pokemon.removeVolatile('mustrecharge');
					this.add('-end', pokemon, 'mustrecharge');
				}
			}	
		},
		flags: {},
		name: "Sandclock",
	},
	magicwarp: {
		num: -4,
		onStart(source) {
			if (!this.field.getPseudoWeather('magicroom')) {
				this.field.addPseudoWeather('magicroom');
			}
		},
		onAnyPseudoWeatherChange() {
			if (!this.field.getPseudoWeather('magicroom')) {
				this.field.addPseudoWeather('magicroom');
			}
		},
		onEnd(pokemon) {
			this.field.removePseudoWeather('magicroom');
		},
		flags: {},
		name: "Magic Warp",
		shortDesc: "While active, Magic Room will also be active.",
		desc: "While this ability is active, Magic Room will always be active. If Magic Room ends while this ability active, the the room will become active again.",
	},
	aerodynamism: {
		num: -5,
		name: "Aerodynamism",
		desc: "This Pokemon's Wind moves do not miss. Wind move immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				move.accuracy = true;
				this.add('-immune', target, '[from] ability: Aerodynamism');
				return null;
			}
		},
		onSourceAccuracy(accuracy, target, source, move) {
			if (move && move.flags['wind'] && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
		flags: {breakable: 1},
	},
	unbothered: {
		onAnyModifyBoost(boosts, pokemon) {
			const unbotheredUser = this.effectState.target;
			if (unbotheredUser !== pokemon) return;
			boosts['atk'] = 0;
			boosts['def'] = 0;
			boosts['spa'] = 0;
			boosts['spd'] = 0;
			boosts['accuracy'] = 0;
			boosts['evasion'] = 0;
		},
		flags: {breakable: 1},
		name: "Unbothered",
		shortDesc: "This Pokemon ignores its own stat stages when taking or doing damage.",
		desc: "This Pokemon ignores its own stat stages when taking or doing damage.",
		num: -6,
	},

	// Adjusted Abilities
	moldbreaker: {
		inherit: true,
		modded: true, // this makes its description display in Data Mod
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			move.ignoreAbility = true;
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		shortDesc: "This Pokemon's moves and their effects ignore abilities and redirection.",
		desc: "This Pokemon's moves and their effects ignore abilities and redirection.",
	},
	stalwart: {
		inherit: true,
		modded: true, // this makes its description display in Data Mod
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Stalwart');
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			move.ignoreAbility = true;
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		shortDesc: "This Pokemon's moves and their effects ignore abilities and redirection.",
		desc: "This Pokemon's moves and their effects ignore abilities and redirection.",
	},
	propellertail: {
		inherit: true,
		modded: true, // this makes its description display in Data Mod
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Propeller Tail');
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			move.ignoreAbility = true;
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		shortDesc: "This Pokemon's moves and their effects ignore abilities and redirection.",
		desc: "This Pokemon's moves and their effects ignore abilities and redirection.",
	},
	thickfat: {
		inherit: true,
		modded: true, // this makes its description display in Data Mod
		onUpdate(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Thick Fat');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn' && status.id !== 'frz') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Thick Fat');
			}
			return false;
		},
		shortDesc: "Fire-/Ice-type deal half to this Pokemon. Cannot be burned or frozen.",
		desc: "If a Pokemon uses a Fire- or Ice-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon. Additionally, this Pokemon cannot be burned or frozen, and obtaining this ability will also cure them of these statuses.",
	},
	healer: {
		inherit: true,
		modded: true, // this makes its description display in Data Mod
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				if (allyActive.hp < allyActive.baseMaxhp && this.runEvent('TryHeal', allyActive, null, this.effect, pokemon.baseMaxhp / 8)) {
					this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
					this.heal(pokemon.baseMaxhp / 8, allyActive, pokemon);
				}
			}
		},
		shortDesc: "At the end of every turn, gives 1/8 of its own hp to an ally.",
		desc: "At the end of every turn, this Pokemon will attempt to heal injured allies equivalent to 1/8 of its own hp. On a successful heal, this Pokemon will damage itself for 1/8. If an ally is at full health, this heal will not be attempted.",
	},
	screencleaner: {
		inherit: true,
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				for (const side of [pokemon.side, ...pokemon.side.foeSidesWithConditions()]) {
					if (side.getSideCondition(sideCondition)) {
						if (!activated) {
							this.add('-activate', pokemon, 'ability: Screen Cleaner');
							this.boost({spa: 1});
							activated = true;
						}
						side.removeSideCondition(sideCondition);
					}
				}
			}
		},
		shortDesc: "On Switch-in, remove all screen effects from both sides of the field and +1 SpA if successful.",
		desc: "On Switch-in, remove all screen effects from both sides of the field. If a screen gets removed, gain +1 Special Attack (does not stack)."
	},
	snowcloak: {
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onAllyImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (!pokemon.hasType('Ice') && this.field.isWeather('snow')) {
				this.debug("snow cloak def boost")
				return this.modify(def, 1.5);
			}
		},
		onAllyModifyDefPriority: 10,
		onAllyModifyDef(def, pokemon) {
			// Having multiple allies with this abil will not stack (technically irrelevant bc this format is doubles, but covering my bases anyways)
			const source = this.effectState.source;
			const snowCloakSources = pokemon.adjacentAllies().filter(
				ally => ally.hasAbility('snowcloak')
			);
			if (!pokemon.hasType('Ice') && !pokemon.hasAbility('snowcloak') && this.field.isWeather('snow') && snowCloakSources[0] === source) {
				this.debug("snow cloak ally def boost");
				return this.modify(def, 1.5);
			}
		},
		flags: {breakable: 1},
		name: "Snow Cloak",
		shortDesc: "This Pokemon and its allies are eligible for Snow's Def boost.",
		desc: "While Snow is active, grants the defensive benefits of the Snow (Def) to self and allies, if they aren’t already recipients of this boost via type or having this ability themselves. While hail does not exist, to parallel Sand Veil this would grant hail immunity to self and allies if it could.",
		num: 81,
	},
	sandveil: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onAllyImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (!pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				this.debug("sand veil spd boost")
				return this.modify(spd, 1.5);
			}
		},
		onAllyModifySpDPriority: 10,
		onAllyModifySpD(spd, pokemon) {
			// Having multiple allies with this abil will not stack (technically irrelevant bc this format is doubles, but covering my bases anyways)
			const source = this.effectState.source;
			const sandVeilSources = pokemon.adjacentAllies().filter(
				ally => ally.hasAbility('sandveil')
			);
			if (!pokemon.hasType('Rock') && !pokemon.hasAbility('sandveil') && this.field.isWeather('sandstorm') && sandVeilSources[0] === source) {
				this.debug("sand veil ally spd boost");
				return this.modify(spd, 1.5);
			}
		},
		flags: {breakable: 1},
		name: "Sand Veil",
		shortDesc: "This Pokemon and its allies are eligible for Sandstorm's SpD boost. Sandstorm Immunity to self and ally.",
		desc: "While Sand is active, grants the defensive benefits of the Sandstorm (SpD) to self and allies, if they aren’t already recipients of this boost via type or having this ability themselves. Also grants immunity to sand chip to self and allies",
		num: 8,
	},
	rattled: {
		inherit: true,
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({spe: 1}, target, target, null, false, true);
			}
		},
		// Overwriting this method to just return since its now handled in onAfterEachBoost
		onAfterBoost(boost, target, source, effect) {
			return;
		},
		shortDesc: "Speed is raised 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or lowered stat.",
		desc: "This Pokemon's Speed is raised 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or when a stat is lowered by a foe.",
	},
};
