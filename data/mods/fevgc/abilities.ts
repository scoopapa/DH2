export const Abilities: {[k: string]: ModdedAbilityData} = {
	slyslime: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		onSourceDamagingHit(damage, target, source, move) {
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				for (const side of [source.side.foeSidesWithConditions()]) {
            	if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
            	if (target.volatiles['substitute'] || side.getSideCondition(sideCondition)) {
              		if (this.randomChance(10, 10)) {
                		this.add('-ability', source, 'Sly Slime');
                		this.boost({spe: -1}, target, source, null, true);
						}
					}
				}
			}
		},
		flags: {},
		name: "Sly Slime",
		shortDesc: "User's moves ignore screens and Substitute. -1 Speed to hit foes behind screens or Substitute.",
	},
	sappyjest: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true; // add dark immunity in scripts
				return priority + 1;
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.priority > 0.1) {
				this.add('-immune', pokemon, '[from] ability: Sappy Jest');
				return null;
			}
		},
		flags: {},
		name: "Sappy Jest",
		shortDesc: "User's status moves have +1 priority. User is immune to priority moves.",
	},
	knightseye: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Knight\'s Eye", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Knight's Eye",
		shortDesc: "Keen Eye + Shell Armor",
	},
	rootsnap: {
		onModifyMove(move) {
			move.ignoreAbility = true;
      // come back and add a check for all immunity abilities
		},
		flags: {},
		name: "Root Snap",
		shortDesc: "(Placeholder) This Pokemon's moves ignore ability-based immunities",
	},
	hydrovision: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydrovision');
				pokemon.cureStatus();
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: {breakable: 1},
		name: "Hydrovision",
		shortDesc: "Keen Eye + Hydration",
	},
	googetter: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Goo-Getter only affects stats lowered by foes.", true, source.side);
				}
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
				this.boost({spe: 2}, target, target, null, false, true);
			}
		},
		flags: {},
		name: "Goo-Getter",
		shortDesc: "This Pokemon's Speed is raised by 2 for each of its stats that is lowered by a foe.",
	},
	restlessspeed: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Restless Speed');
				pokemon.cureStatus();
        this.boost({spe: 1}, pokemon, pokemon, null, false, true);
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Restless Speed');
			}
      this.boost({spe: 1}, target, target, null, false, true);
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' || status.id === 'flinch') {
				this.add('-immune', target, '[from] ability: Restless Speed');
        this.boost({spe: 1}, target, target, null, false, true);
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Restless Speed",
		shortDesc: "Can't be flinched or put to sleep. +1 Speed if either is attempted.",
	},
	hyperfocus: {
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Hyperfocus",
		shortDesc: "This Pokemon's crit ratio is increased by 1 stage. Cannot be struck by a crit or flinched.",
	},
	heroego: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				this.boost({atk: 1});
			}
		},
		flags: {},
		name: "Hero Ego",
		shortDesc: "Justified + Moxie",
	},
};
