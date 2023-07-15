export const Conditions: {[k: string]: ConditionData} = {
	// pokeskills
	blade: {
		name: 'Blade',
		id: 'blade',
		num: 0,
		onStart(pokemon){ this.add('-start', pokemon, 'Blade');},
		onDisableMove( pokemon ){ pokemon.disableMove(pokemon.pokeSkill, false, this.effectData.sourceEffect); },
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['blade']) {
				return this.chainModify(1.3);
			}
		},
		onFoeBasePowerPriority: 8,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (move.flags['blade']) {
				return this.chainModify(0.5);
			}
		},
	},
	destruction: {
		name: 'Destruction',
		id: 'destruction',
		num: 0,
		onStart(pokemon){ this.add('-start', pokemon, 'Destruction');},
		onDisableMove( pokemon ){ pokemon.disableMove(pokemon.pokeSkill, false, this.effectData.sourceEffect); },
		onSourceHit(target, source, move) {
			console.log( 'destruction' );
			if ( move.type === "Fire" ) source.side.foe.addSideCondition('firestorm');
			if ( move.type === "Ice" ) source.side.foe.addSideCondition('icestorm');
			if ( move.type === "Electric" ) source.side.foe.addSideCondition('thunderstorm');
		},
		onModifyAtk(stat) {
			return this.chainModify(0.8);
		},
		onModifyDef(stat) {
			return this.chainModify(0.8);
		},
		onModifyMove(move) {
			if (move.secondaries) {
				for (const secondary of move.secondaries) {
					if ( secondary.chance && ['Fire','Ice','Electric'].contains( move.type )) secondary.chance *= 2;
				}
			}
		},
	},
	//destruction effects
	firestorm: {
		id: 'firestorm',
		name: 'Fire Storm',
		duration: 4,
		onStart(targetSide) {
			this.add('-sidestart', targetSide, 'Fire Storm');
			if ( targetSide.removeSideCondition( 'thunderstorm' )) return;
			if ( targetSide.removeSideCondition( 'icestorm' )) return;
		},
		onRestart(targetSide) {
			return false;
		},
		onResidual(targetSide) {
			for (const pokemon of targetSide.active) {
				if (pokemon.runImmunity('Fire')) this.damage(pokemon.baseMaxhp / 8, pokemon);
			}
		},
		onEnd(targetSide) {
			this.add('-sideend', targetSide, 'Fire Storm');
		},
	},
	icestorm: {
		id: 'icestorm',
		name: 'Ice Storm',
		duration: 4,
		onStart(targetSide) {
			this.add('-sidestart', targetSide, 'Ice Storm');
			if ( targetSide.removeSideCondition( 'thunderstorm' )) return;
			if ( targetSide.removeSideCondition( 'firestorm' )) return;
		},
		onRestart(targetSide) {
			return false;
		},
		onResidual(targetSide) {
			for (const pokemon of targetSide.active) {
				if (pokemon.runImmunity('Ice')) this.damage(pokemon.baseMaxhp / 8, pokemon);
			}
		},
		onEnd(targetSide) {
			this.add('-sideend', targetSide, 'Ice Storm');
		},
	},
	thunderstorm: {
		id: 'thunderstorm',
		name: 'Thunder Storm',
		duration: 4,
		onStart(targetSide) {
			this.add('-sidestart', targetSide, 'Thunder Storm');
			if ( targetSide.removeSideCondition( 'firestorm' )) return;
			if ( targetSide.removeSideCondition( 'icestorm' )) return;
		},
		onRestart(targetSide) {
			return false;
		},
		onResidual(targetSide) {
			for (const pokemon of targetSide.active) {
				if (pokemon.runImmunity('Electric')) this.damage(pokemon.baseMaxhp / 8, pokemon);
			}
		},
		onEnd(targetSide) {
			this.add('-sideend', targetSide, 'Thunder Storm');
		},
	},
	restoration: {
		name: 'Restoration',
		id: 'restoration',
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 8);
		},
        onTryHeal(damage, target, source, effect) {
            if (effect.id === 'leftovers' || effect.id === 'blacksludge') {
                this.heal(target.baseMaxhp / 16);
            }
        },
		onHit(pokemon, source, move) {
			if (move.id === 'lifedew') {
				this.add('-activate', source, 'move: Restoration');
				const side = pokemon.side;
				let success = false;
				for (const ally of side.pokemon) {
					if (ally !== source && ally.hasAbility('soundproof')) continue;
					if (ally.cureStatus()) success = true;
				}
				return success;
				// if not able to restore hp, doesn't activate heal bell effect
			}
			else if (move.id === 'healbell') {
				pokemon.heal(pokemon.maxhp / 4);
				// doesn't heal for some reason
			}
		},
	},
};
