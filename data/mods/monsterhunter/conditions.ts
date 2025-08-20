export const Conditions: { [k: string]: ConditionData; } = {
	frz: {
		onStart(target, source, sourceEffect) {
			this.add('-message', `${target.name} was Frostbitten! Special Attack halved! (Stat Change not visible)`);
			if (sourceEffect && sourceEffect.id === 'frostorb') {
				this.add('-status', target, 'frz', '[from] item: Frost Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
		onModifySpA(spa, pokemon) {
			return this.chainModify(0.5);
		},
	},
	slp: {
        name: 'slp',
        effectType: 'Status',
        onStart(target, source, sourceEffect) {
			this.add('-message', `${target.name} is Drowsy! Damage taken is 1.2x; can't use same attack twice! Multi-Hits strike once!`);
            if (sourceEffect && sourceEffect.effectType === 'Ability') {
                this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
            } else if (sourceEffect && sourceEffect.effectType === 'Move') {
                this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
            } else {
                this.add('-status', target, 'slp');
            }
            if (target.removeVolatile('nightmare')) {
                this.add('-end', target, 'Nightmare', '[silent]');
            }
        },
        onSourceModifyDamage(damage, source, target, move) {
            return this.chainModify(1.2);
        },
        onDisableMove(pokemon) {
			if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
		},
    },
	snow: {
		inherit: true,
		onImmunity(type) {
			if (type === 'brn') return false;
		},
	},
	par: {
        inherit: true,
		onStart(target, source, sourceEffect) {
			this.add('-message', `${target.name} is Paralyzed! Speed halved; will be fully paralyzed every 3 turns!`);
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onResidual(pokemon) {
			if (pokemon.static === undefined) pokemon.static = 0;
			pokemon.static ++;
			if (pokemon.static >= 3) {
				this.add('-message', `${pokemon.name} has too much static!`);
			} else {
				this.add('-message', `${pokemon.name} is building static!`);
			}
        },
		onSwitchout(pokemon) {
			pokemon.static = 0;
		},
		onSwitchIn(pokemon) {
			pokemon.static = 0;
		},
		onBeforeMove(pokemon) {
 			if (pokemon.static >= 3) {
				this.add('cant', pokemon, 'par');
				pokemon.static = 0;
				return false;
			}
    	}
	},
	heatresistance: {
		name: 'Heat Resistance',
		onStart(pokemon) {
			this.add('-start', pokemon, 'HeatRes');
			this.add('-message', `${pokemon.name} gained Heat Resistance! Immune to burn residual!`);
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return false;
			}
		},
	},
	coldresistance: {
		name: 'Cold Resistance',
		onStart(pokemon) {
			this.add('-start', pokemon, 'ColdRes');
			this.add('-message', `${pokemon.name} gained Cold Resistance! Immune to frostbite residual!`);
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'frz') {
				return false;
			}
		},
	},
	blastblight: {
		name: 'Blastblight',
		onStart(pokemon) {
			this.add('-start', pokemon, 'Blasted');
			this.add('-message', `${pokemon.name} has Blastblight! Next hit will incur chip damage!`);
		},
		onDamagingHit(damage, target, source, move) {
			this.damage(target.baseMaxhp / 6, target, source);
			target.removeVolatile('blastblight');
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Blasted');
		},
	},
	bubbleblight: {
		name: 'Bubbleblight',
		duration: 4,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Bubbled');
			this.add('-message', `${pokemon.name} has Bubbleblight! +1 Speed, -1 Accuracy!`);
			this.boost({spe: 1, accuracy: -1}, pokemon);
		},
		onEnd(pokemon) {
			this.boost({spe: -1, accuracy: 1}, pokemon);
			this.add('-end', pokemon, 'Bubbled');
		},
		},
	defensedown: {
		name: 'Defense Down',
		duration: 4,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Defense Down');
			this.add('-message', `${pokemon.name} is afflicted with Defense Down! -1 to Defenses for 3 turns!`);
		},
		onResidual(pokemon) {
			this.boost({def: -1, spd: -1}, pokemon);
		},
		onEnd(pokemon) {
			this.boost({def: 3, spd: 3}, pokemon);
			this.add('-end', pokemon, 'Defense Down');
		},
		},
	stench: {
		name: 'Stench',
		duration: 4,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Stench');
			this.add('-message', `${pokemon.name} is afflicted with Stench! Held item disabled!`);
			this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
		},
		onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
		},
		onBeforeMovePriority: 5,
		onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Stench');
		},
		},
	fatigue: {
		name: 'Fatigue',
		duration: 5,
		onStart(pokemon, source) {
			this.add('-start', pokemon, 'Fatigue');
			this.add('-message', `${pokemon.name} is Fatigued! Moves use more PP!`);
		},
		onDeductPP(pokemon) {
			return 1;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Fatigue');
		},
	},
	bleeding: {
		name: 'Bleeding',
		onStart(pokemon) {
			this.add('-start', pokemon, 'Bleeding');
			this.add('-message', `${pokemon.name} is afflicted with Bleeding! Will take damage when attacking!`);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag) {
				this.damage(source.baseMaxhp / 10, source, source);
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Bleeding');
		},
	},
	snowman: {
		name: 'Snowman',
		onStart(pokemon) {
			this.add('-start', pokemon, 'Snowman');
			this.add('-message', `${pokemon.name} is a Snowman! Unable to move.`);
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'snowman');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'snowman', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Snowman');
		},
	},
	/*
	rusted: {
		name: 'Rusted',
		duration: 4,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Rusted');
			this.add('-message', `${pokemon.name} is Rusted! Steel-type resistances nullified!`);
		},
		onDamagingHit(damage, source, target, move) {
			if (this.dex.types.get('Steel').damageTaken[move.type] == 2) {
  				this.debug('Is rusted!');
  				return this.chainModify(1);
			}
		},
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Rusted');
		},
	},
	*/
	dragonblight: {
		name: 'Dragonblight',
		effectType: 'Status',
		onStart(pokemon) {
			this.add('-start', pokemon, 'Dragonblight');
			this.add('-message', `${pokemon.name} is afflicted with Dragonblight! STAB disabled!`);
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				if (stab === 2) {
					return 1;
				}
				return 1;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dragonblight');
		},
	},
}