'use strict';

exports.BattleAbilities = {
	"punchilate": {
		desc: "This Pokemon's Normal-type moves become Fighting-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Fighting type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift' && !move.isZ) {
				move.type = 'Fighting';
				if (move.category !== 'Status') pokemon.addVolatile('punchilate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				return this.chainModify([0x1333, 0x1000]);
			},
		},
		id: "punchilate",
		name: "Punchilate",
		rating: 4,
	},
	"landinate": {
		desc: "This Pokemon's Normal-type moves become Ground-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ground type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift' && !move.isZ) {
				move.type = 'Ground';
				if (move.category !== 'Status') pokemon.addVolatile('landinate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				return this.chainModify([0x1333, 0x1000]);
			},
		},
		id: "landinate",
		name: "Landinate",
		rating: 4,
	},
	"dragonforce": {
		shortDesc: "If this Pokemon is at full HP, its Dragon-type moves have their priority increased by 1.",
		onModifyPriority: function(priority, pokemon, target, move) {
			if (move && move.type === 'Dragon' && pokemon.hp === pokemon.maxhp) return priority + 1;
		},
		id: "dragonforce",
		name: "Dragon Force",
		rating: 3,
	},
	"goddessaura": {
		shortDesc: "This Pokemon's Special Attack is raised by 1 if damaged by a Dark-type move.",
		onAfterDamage: function(damage, target, source, effect) {
			if (effect && effect.type === 'Dark') {
				this.boost({
					spatk: 1
				});
			}
		},
		id: "goddessaura",
		name: "Goddess Aura",
		rating: 2,
	},
	"gearforce": {
		shortDesc: "This Pokemon's Steel and Electric-type attacks have their power multiplied by 1.5.",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Steel', 'Electric') {
				this.debug('Gear Force boost');
				return this.chainModify(1.5);
			}
		},
		id: "gearforce",
		name: "Gear Force",
		rating: 4.5,
	},
	"coldblood": {
		desc: "The power of Bug, Dark and Ghost-type attacks against this Pokemon is halved",
		shortDesc: "The power of Bug, Dark and Ghost-type attacks against this Pokemon is halved",
		onBasePowerPriority: 7,
		onSourceBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Bug', 'Ghost', 'Dark') {
				return this.chainModify(0.5);
			}
		},
		id: "coldblood",
		name: "Cold Blood",
		rating: 2.5,
	},
	"crushcoral": {
		shortDesc: "This Pokemon's Special Attack is doubled.",
		onModifySpAPriority: 5,
		onModifySpA: function(SpA) {
			return this.chainModify(2);
		},
		id: "crushcoral",
		name: "Crush Coral",
		rating: 5,
	},
	"medicine": {
		shortDesc: "On switch-in, this pokemon cures itself and its teammates of status",
		onStart: function(source) {
			this.useMove('Heal Bell', source);
		},
		id: "medicine",
		name: "Medicine",
	},
	"predator": {
		shortDesc: "This Pokemon's super effective attacks against the target have x1.3 power",

		onModifyDamage: function(damage, source, target, move) {
			if (move && move.typeMod > 0) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "predator",
		name: "Predator",
		rating: 3,
	},
	"gatesofhell": {
		shortDesc: "On switch-in, this pokemon uses Curse and takes halved damage from Fairy type moves",

		onStart: function(pokemon) {
			this.useMove("Curse", pokemon);
		},
		onBasePowerPriority: 7,
		onSourceBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(0.5);
			}
		},
		id: "gatesofhell",
		name: "Gates of Hell",
		rating: 3.5,
	},
	"gatesofheaven": {
		shortDesc: "On switch-in, heals back 1/3 of max HP and takes halved damage from Dark type moves",

		onStart: function(pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		onBasePowerPriority: 7,
		onSourceBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Dark') {
				return this.chainModify(0.5);
			}
		},
		id: "gatesofheaven",
		name: "Gates of Heaven",
		rating: 3.5,

	},
	"leadership": {
		shortDesc: "This Pokemon's attacks get a x1.3 power boost if it moves first in the turn",

		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (!this.willMove(attacker)) {
				this.debug('Leadership boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "leadership",
		name: "Leadership",
		rating: 2,
	},
	"fiendishshield": {
		shortDesc: "Bounces back status moves to the user. Damage from sup.eff moves - 30%",

		onTryHitPriority: 1,
		onTryHit: function(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,

		},
		onSourceModifyDamage: function(damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Fiendish Shield neutralize');
				return this.chainModify(0.70);
			}
		},
		id: "fiendishshield",
		name: "Fiendish Shield",
		rating: 3.5,
	},
	"heavenlyshield": {
		shortDesc: "Heals the user by 1/6 of its max HP per turn, damage from sup.eff attacks - 30%",

		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function(pokemon) {
			this.heal(pokemon.maxhp / 6);

		},
		onSourceModifyDamage: function(damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Heavenly Shield neutralize');
				return this.chainModify(0.70);
			}
		},
		id: "heavenlyshield",
		name: "Heavenly Shield",
		rating: 3.5,
	},
	"finalflicker": {
		shortDesc: "If the pokemon is Koed by a move, it uses Burn Up upon fainting",

		onAfterDamageOrder: 1,
		onAfterDamage: function(damage, target, source, move) {
			if (source && source !== target && move && move.effectType === 'Move' && !target.hp) {
				this.useMove("Burn Up", target);
			}
		},
		id: "finalflicker",
		name: "Final Flicker",
		rating: 4,
	},
	"magnetism": {
		shortDesc: "On switch-in, uses Magnet Rise, and its Electric type moves x2 damage",

		onStart: function(pokemon) {
			this.useMove("Magnet Rise", pokemon);
	},
	onBasePower: function(damage, source, target, move) {
		if (move.type === 'Electric') {
			this.debug('Magnetism boost');
			return this.chainModify(2);
		}
	},
	id: "magnetism",
	name: "Magnetism",
	rating: 5,
        },
	"toxicemanations": {
		shortDesc: "On switch-in, this Pokemon summons Poisoned Scent.",
		onStart: function(source) {
			this.setWeather('poisonscent');
		},
		id: "toxicemanations",
		name: "Toxic Emanations",
		rating: 4.5,
        },
        "brushrusher": {
		shortDesc: "If Grassy Terrain is active, this Pokemon's Speed is doubled.",
		onModifySpe: function (spe) {
			if (this.field.isTerrain('grassyterrain')) {
				return this.chainModify(2);
			}
		},
		id: "brushrusher",
		name: "Brush Rusher",
		rating: 2,
        },
	"mistskimmer": {
		shortDesc: "If Misty Terrain is active, this Pokemon's Speed is doubled.",
		onModifySpe: function (spe) {
			if (this.field.isTerrain('mistyterrain')) {
				return this.chainModify(2);
			}
		},
		id: "mistskimmer",
		name: "Mist Skimmer",
		rating: 2,
        },
	"miracledash": {
		shortDesc: "If Psychic Terrain is active, this Pokemon's Speed is doubled.",
		onModifySpe: function (spe) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(2);
			}
		},
		id: "miracledash",
		name: "Miracle Dash",
		rating: 4,
        },
	"punchproof": {
		desc: "This Pokemon is immune to punching moves. ¨Punching moves include all moves with punch or arm in their name",
		shortDesc: "Makes user immune to punching moves",
		onTryHit: function (pokemon, target, move) {
			if (move.flags['punch']) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Punchproof');
				return null;
			}
		},
		id: "punchproof",
		name: "Punchproof",
		rating: 3,
	},
	"absolutezero": {
		desc: "This Pokemon's Ice type moves can hit Water types super effectively, they also have x1.3 power and fire type damage is halved.",
		shortDesc: "This Pokemon's Ice moves hit Water supeff, x1.3 power, fire type damage halved",
		onModifyMove: function (move) {
			if (move.type === 'Ice') {
			  	this.debug('Absolute Zero boost');
				return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onEffectiveness: function (typeMod, type) {
			if (type === 'Water') return 1;
		},
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Absolute Zero neutralize');
				return this.chainModify(0.5);
			}
		},
		id: "absolutezero",
		name: "Absolute Zero",
		rating: 3.5,
	},
	"burningheal": {
		desc: "If this Pokemon is burned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when burned; no HP loss.",
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'brn') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		id: "burningheal",
		name: "Burning Heal",
		rating: 4,
		num: 90,
	},
	"renegate": {
		desc: "This Pokemon's Normal-type moves become Ghost-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ghost type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift' && !move.isZ) {
				move.type = 'Ghost';
				if (move.category !== 'Status') pokemon.addVolatile('renegate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x1333, 0x1000]);
			},
		},
		id: "renegate",
		name: "Renegate",
		rating: 4,
	},
	"reaperslice": {
		desc: "This Pokemon's  Ghost moves ignore substitutes and the opposing side's Reflect, Light Screen, Safeguard, and Mist, they also have x1.3 power",
		shortDesc: "Moves ignore substitutes and opposing Reflect, Light Screen, Safeguard, and Mist, x1.3 power",
		  	onModifyMove: function (move) {
			  	if (move.type === 'Ghost') {
			  	return move.infiltrates = true;
			}
			  	if (move.type === 'Ghost') {
			  	this.debug('Reaper Slice boost');
				return this.chainModify([0x14CD, 0x1000]);
			  	}
		  	},
		
		id: "reaperslice",
		name: "Reaper Slice",
		rating: 3,
	
	},
	"solidice": {
		desc: "This Pokemon is immune to Fighting type moves, it also boost its Attack by 1 stage",
		shortDesc: "This Pokemon is immune to Fighting type moves, +1 attack",
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fighting') {
				if (!this.boost({atk:1})) {
					this.add('-immune', target, '[msg]', '[from] ability: Solid Ice');
				}
				return null;
			}
		},
		id: "solidice",
		name: "Solid Ice",
		rating: 3.5,
	},
	"supervision": {
		desc: "The accuracy of this Pokemon's attacks is boosted by 30%",
		onAllyModifyMove: function (move) {
			if (typeof move.accuracy === 'number') {
				move.accuracy *= 1.3;
			}
		},
		id: "supervision",
		name: "Supervision",
	},
	"duosweep": {
		desc: "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage quartered.",
		onPrepareHit: function (source, target, move) {
			if (move.id in {iceball: 1, rollout: 1}) return;
			if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit && !move.isZ) {
				move.multihit = 2;
				source.addVolatile('duosweep');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower) {
				if (this.effectData.hit) {
					this.effectData.hit++;
					return this.chainModify(0.25);
				} else {
					this.effectData.hit = 1;
				}
			},
			onSourceModifySecondaries: function (secondaries, target, source, move) {
				if (move.id === 'secretpower' && this.effectData.hit < 2) {
					// hack to prevent accidentally suppressing King's Rock/Razor Fang
					return secondaries.filter(effect => effect.volatileStatus === 'flinch');
				}
			},
		},
		id: "duosweep",
		name: "Duosweep",
		rating: 5,
	},
        "rainpower": { 
	         desc: "This Pokemon's Attack and Special Attack is boosted by 50% under the rain, loses 1/8 HP each turn",
		 shortDesc: "+50% Atk and SpAtk under rain, -1/8 HP per turn",
		 onModifySpAPriority: 5,
		 onModifySpA: function (spa, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.damage(target.maxhp / 8, target, target);
			}
		},
		id: "rainpower",
		name: "Rain Power",
		rating: 4,
	},
       "cacophony": {
		desc: "This Pokemon's sound-based attacks have their power multiplied by 1.2.",
		shortDesc: "This Pokemon's sound-based attacks have 1.2x power.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Cacophony boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		id: "cacophony",
		name: "Cacophony",
		rating: 3,
        },
	"rootblock": {
		desc: "Prevents adjacent opposing Pokemon from choosing to switch out unless they are immune to trapping or are airborne.",
		shortDesc: "Prevents adjacent foes from choosing to switch unless they are airborne.",
		onFoeTrapPokemon: function (pokemon) {
			if (!this.isAdjacent(pokemon, this.effectData.target)) return;
			if (pokemon.isGrounded()) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!this.isAdjacent(pokemon, source)) return;
			if (pokemon.isGrounded(!pokemon.knownType)) { // Negate immunity if the type is unknown
				pokemon.maybeTrapped = true;
			}
		},
		id: "rootblock",
		name: "Root Block",
		rating: 4.5,
	},
};
