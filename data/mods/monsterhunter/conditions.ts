export const Conditions: { [k: string]: ConditionData; } = {
	frz: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {},
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
		onModifySpA(spa, pokemon) {
			return this.chainModify(0.5);
		},
		onStart(target, source, sourceEffect, pokemon) {
			this.add('-start', pokemon, 'Frostbite');
			this.add('-message', `${target.name} was frostbitten! Special Attack halved!`);
		},
		onDamagingHit(damage, target, source, move) {},
		onAfterMoveSecondary(target, source, move) {},
	},
	snow: {
		inherit: true,
		onImmunity(type) {
			if (type === 'brn') return false;
		},
	},
	heatres: {
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
	coldres: {
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
	par: {
        inherit: true,
			onBeforeMove(pokemon) {
            if (!pokemon.volatiles['parares'] && this.randomChance(1, 4)) {
                this.add('cant', pokemon, 'par');
                return false;
            }
        },
    },
	parares: {
		name: 'Paralysis Resistance',
		onStart(pokemon) {
			this.add('-start', pokemon, 'ParaRes');
			this.add('-message', `${pokemon.name} gained Paralysis Resistance! Cannot be fully-paralyzed!`);
		},
	},
	blastblight: {
		name: 'Blastblight',
		onStart(pokemon) {
			this.add('-start', pokemon, 'Blasted');
			this.add('-message', `${pokemon.name} has Blastblight! Next hit will incur chip damage!`);
		},
		onDamagingHit(damage, target, source, move) {
			this.damage(target.baseMaxhp / 8, target, source);
			target.removeVolatile('blastblight');
			}
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
			},
		},
	defdown: {
		name: 'Defense Down',
		duration: 4,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Defense Down');
			this.add('-message', `${pokemon.name} is afflicted with Defense Down! -1 to Defenses!`);
			this.boost({def: -1, spd: -1}, pokemon);
		},
		onEnd(pokemon) {
			this.boost({def: 1, spd: 1}, pokemon);
			}
		},
	stench: {
		name: 'Stench',
		duration: 4,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Stench');
			this.add('-message', `${pokemon.name} is afflicted with Stench! Held item disabled!`);
			this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			}
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
		},
	bleeding: {
		name: 'Bleeding',
		duration: 4,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Bleeding');
			this.add('-message', `${pokemon.name} is afflicted with Bleeding! Will take damage when attacking!`);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag) {
				this.damage(source.baseMaxhp / 10, source, source);
			}
		},
	},
	}