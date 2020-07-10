'use strict';

exports.BattleStatuses = {
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
};
