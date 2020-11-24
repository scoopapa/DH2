'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
"timechime": {
		shortDesc: "On switch-in, this Pokemon summons Trick Room.",
		onStart: function(source) {
			this.useMove("Trick Room", source);
		},
		id: "timechime",
		name: "Time Chime",
	},
	"backmask": {
		shortDesc: "On switch-in, this Pokemon summons Inverse Room.",
		onStart: function(source) {
			this.useMove("Inverse Room", source);
		},
		id: "backmask",
		name: "Backmask",
	},
  	"magician": {// user has an immunity.
		shortDesc: "On switch-in, this Pokemon summons Magic Room.",
		onStart: function(source) {
			this.useMove("Magic Room", source);
		},
		id: "magician",
		name: "Magician",
	},
  	"cheatcode": {
		shortDesc: "On switch-in, this Pokemon summons Wonder Room.",
		onStart: function(source) {
			this.useMove("wonderroom", source);
		},
		id: "cheatcode",
		name: "Cheat Code",
	},
	"zenmode": {
		desc: "If this Pokemon is a Darmanitan, it changes to Zen Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode. If Darmanitan loses this Ability while in Zen Mode it reverts to Standard Mode immediately.",
		shortDesc: "If Darmanitan, at end of turn changes Mode to Standard if > 1/2 max HP, else Zen.",
		onStart: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
				pokemon.addVolatile('zenmode');
		},
		onEnd: function (pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			pokemon.formeChange('Darmanitan', this.effect, false, '[silent]');
		},
		effect: {
			onStart: function (pokemon) {
				if (pokemon.template.speciesid !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
			},
			onEnd: function (pokemon) {
				pokemon.formeChange('Darmanitan');
			},
		},
		id: "zenmode",
		name: "Zen Mode",
		rating: -1,
		num: 161,
	},
	"illuminate": {
		desc: "Intimidate for Evasion",
		shortDesc: "On switch-in, this Pokemon lowers the Evasion of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Illuminate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({eva: -1}, target, pokemon);
				}
			}
		},
		id: "illuminate",
		name: "Illuminate",
		rating: 3.5,
		num: 22,
	},
	"mudbath": {
		shortDesc: "On switch-in, this Pokemon summons Mud Sport.",
		onStart: function(source) {
			this.useMove("Mud Sport", source);
		},
		id: "mudbath",
		name: "Mud Bath",
	},
	"overflow": {
		shortDesc: "On switch-in, this Pokemon summons Water Sport.",
		onStart: function(source) {
			this.useMove("Water Sport", source);
		},
		id: "overflow",
		name: "Overflow",
	},
	"flowergift": {
		shortDesc: "Boosts Atk, SpA and Spe by 50% in Sun.",
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onModifyAtjPriority: 5,
		onModifyAtk: function (spa, pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onModifySpePriority: 5,
		onModifySpe: function (spa, pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		id: "flowergift",
		name: "Flower Gift",
	},
	"mowdown": {
		shortDesc: "The user's moves deal Super Effective damage on Grass-types",
		onModifyMove: function(move) {
			move.onEffectiveness = function(typeMod, type) {
				if (type === 'Grass') return 1;
			};
		},
		id: "mowdown",
		name: "Mow Down",
	},
		"clearbody": {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onBoost: function (boost, target, source, effect) {
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
		},
		id: "clearbody",
		name: "Clear Body",
		rating: 2,
		num: 29,
	},
	"whitesmoke": {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onBoost: function (boost, target, source, effect) {
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: White Smoke", "[of] " + target);
		},
		id: "whitesmoke",
		name: "White Smoke",
		rating: 2,
		num: 73,
	},
	"fullmetalbody": {
		desc: "Prevents other Pokemon from lowering this Pokemon's stat stages. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onBoost: function (boost, target, source, effect) {
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Full Metal Body", "[of] " + target);
		},
		isUnbreakable: true,
		id: "fullmetalbody",
		name: "Full Metal Body",
		rating: 2,
		num: 230,
	},
	"botanist": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Grass-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
		id: "botanist",
		name: "Botanist",
		rating: 3,
	},
	"bloodsucker": {
		desc: "Adds 33% draining to all contact moves",
		shortDesc: "Adds 33% draining to all contact moves",
		onModifyMove: function (move) {
			if (move.flags['contact']) {
			move.drain = [1,3];
			}
		},
		id: "bloodsucker",
		name: "Bloodsucker",
	},
	"forecast": {
		desc: "If this Pokemon is a Castform, its type changes to the current weather condition's type, except Sandstorm.",
		shortDesc: "If this Pokémon is holding a Weather Rock, its secondary typing becomes Water/Fire/Rock/Ice/Flying/Dark (depending on the rock) and summon the corresponding weather upon entering the field. Under Strong Winds, this mon gains the added Flying type.",
		onStart: function(pokemon) {
			if (pokemon.item === 'heatrock') {
				pokemon.addType('Fire');
				this.setWeather('sunnyday');
			} else if (pokemon.item === 'damprock') {
				pokemon.addType('Water');
				this.setWeather('raindance');
			} else if (pokemon.item === 'smoothrock') {
				pokemon.addType('Rock');
				this.setWeather('sandstorm');
			} else if (pokemon.item === 'icyrock') {
				pokemon.addType('Ice');
				this.setWeather('hail');
			} else if (pokemon.item === 'shadowrock') {
				pokemon.addType('dark');
				this.setWeather('shadowsky');
			} else if (pokemon.item === 'breezerock') {
				pokemon.addType('Flying');
				this.setWeather('aircurrent');
			} else if (this.field.isWeather('deltastream')) {
				pokemon.addType('Flying');
			}
		},
		onUpdate: function(pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (this.field.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					if (pokemon.template.speciesid !== 'castformsunny') forme = 'Castform-Sunny';
					break;
				case 'raindance':
				case 'primordialsea':
					if (pokemon.template.speciesid !== 'castformrainy') forme = 'Castform-Rainy';
					break;
				case 'hail':
					if (pokemon.template.speciesid !== 'castformsnowy') forme = 'Castform-Snowy';
					break;
				default:
					if (pokemon.template.speciesid !== 'castform') forme = 'Castform';
					break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme);
				this.add('-formechange', pokemon, forme, '[msg]', '[from] ability: Forecast');
			}
		},
		id: "forecast",
		name: "Forecast",
		rating: 3,
		num: 59,
	},
};
