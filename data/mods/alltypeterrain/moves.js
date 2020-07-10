'use strict';

exports.BattleMovedex = {
	"pollenterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "pollenterrain",
		name: "Pollen Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'pollenterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Bug' && defender.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onTryMovePriority: -1,
			onTryMove: function (pokemon, target, move) {
				if (move.flags.bullet && target.isGrounded()) {
					this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 8), 1), pokemon, pokemon, 'Pollen Terrain');
					return false;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Pollen Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Pollen Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Pollen Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Bug",
		zMoveBoost: {spd: 1},
	},
	"murkyterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "murkyterrain",
		name: "Murky Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'murkyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onBoost: function (boost, target, source, effect) {
				if (source && (!effect.infiltrates || target.side === source.side) && target.isGrounded()) {
					let showMsg = false;
					for (let i in boost) {
						if (target !== source || boost[i] > 0) {
							delete boost[i];
							showMsg = true;
						}
					}
					if (showMsg && !effect.secondaries) this.add('-activate', target, 'move: Murky Terrain');
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Murky Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Murky Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Murky Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Dark",
		zMoveBoost: {def: 1},
	},
	"regalterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "regalterrain",
		name: "Regal Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'regalterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onModifyMove: function (move, pokemon) {
				if (!pokemon.isGrounded()) return;
				move.ignoreImmunity = true;
			},
			onSwitchIn: function (pokemon) {
				// Aura of Destruction implementation
				let foeactive = pokemon.side.foe.active;
				for (let i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (foeactive[i].hasAbility('auraofdestruction')) pokemon.addVolatile('gastroacid');
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Regal Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Regal Terrain');
				}
				// Aura of Destruction implementation
				let targetSides = {};
				for (let sideSlot = 0; sideSlot < this.sides.length; sideSlot++) {
					let sideActive = this.sides[sideSlot].active;
					for (let activeSlot = 0; activeSlot < sideActive.length; activeSlot++) {
						if (sideActive[activeSlot] && sideActive[activeSlot].isActive && sideActive[activeSlot].hasAbility('auraofdestruction')) {
							targetSides[1 - sideSlot] = true;
						}
					}
				}
				for (let sideSlot = 0; sideSlot < this.sides.length; sideSlot++) {
					let sideActive = this.sides[sideSlot].active;
					for (let activeSlot = 0; activeSlot < sideActive.length; activeSlot++) {
						if (sideActive[activeSlot] && sideActive[activeSlot].isActive && (sideSlot in targetSides)) {
							sideActive[activeSlot].addVolatile('gastroacid');
						}
					}
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Regal Terrain');
				// Aura of Destruction implementation
				let targetSides = {};
				for (let sideSlot = 0; sideSlot < this.sides.length; sideSlot++) {
					let sideActive = this.sides[sideSlot].active;
					for (let activeSlot = 0; activeSlot < sideActive.length; activeSlot++) {
						if (sideActive[activeSlot] && sideActive[activeSlot].isActive && sideActive[activeSlot].hasAbility('auraofdestruction')) {
							targetSides[1 - sideSlot] = true;
						}
					}
				}
				for (let sideSlot = 0; sideSlot < this.sides.length; sideSlot++) {
					let sideActive = this.sides[sideSlot].active;
					for (let activeSlot = 0; activeSlot < sideActive.length; activeSlot++) {
						if (sideActive[activeSlot] && sideActive[activeSlot].isActive && (sideSlot in targetSides)) {
							sideActive[activeSlot].removeVolatile('gastroacid');
						}
					}
				}
			},
		},
		secondary: false,
		target: "all",
		type: "Dragon",
		zMoveBoost: {spa: 1},
	},
	"mistyterrain": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus: function (status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable() || source.ability === 'magicessence') return;
				if (effect && effect.status) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile: function (status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable() || source.ability === 'magicessence') return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function (side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
	},
	"fieryterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "fieryterrain",
		name: "Fiery Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'fieryterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.isGrounded() && !this.field.isWeather(['sunnyday', 'desolateland']) && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onResidualOrder: 1,
			onResidual: function () {
				this.eachEvent('Terrain');
			},
			onTerrain: function (pokemon) {
				if (pokemon.isGrounded() && pokemon.types.indexOf('Fire') < 0 && !pokemon.isSemiInvulnerable()) {
					this.damage(pokemon.maxhp / 8, pokemon, pokemon, 'Fiery Terrain');
				}
			},
			// Scorched Earth implementation
			onDisableMove: function (pokemon) {
				let foeactive = pokemon.side.foe.active;
				let scorchedEarth = false;
				for (let i = 0; i < foeactive.length; i++) {
					if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (scorchedEarth && this.getMove(moveSlot.id).terrain) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove: function (attacker, defender, move) {
				let foeactive = attacker.side.foe.active;
				let scorchedEarth = false;
				for (let i = 0; i < foeactive.length; i++) {
					if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
				}
				if (scorchedEarth && move.terrain) {
					this.add('cant', attacker, 'ability: Scorched Earth', move);
					return false;
				}
			},
			// ends here
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Fiery Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Fiery Terrain');
				}
			},
			onEnd: function () {
				this.add('-fieldend', 'Fiery Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Fiery",
		zMoveBoost: {atk: 1},
	},
	"chakraterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "chakraterrain",
		name: "Chakra Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'chakraterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onModifyAccuracy: function (accuracy, target, source, move) {
				if (move.type === 'Fighting' && source.isGrounded()) return true;
			},
			onModifyMove: function (move, pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) move.ignoreImmunity['Psychic'] = true;
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Chakra Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Chakra Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Chakra Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Fighting",
		zMoveBoost: {atk: 1},
	},
	"elevatedterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "elevatedterrain",
		name: "Elevated Terrain",
		pp: 10,
		priority: 0,
		flags: {},
		terrain: 'elevatedterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onChargeMove: function (pokemon, target, move) {
				if (!pokemon.isGrounded()) {
					this.debug('elevated terrain - remove charge turn for ' + move.id);
					return false; // skip charge turn
				}
			},
			onDamage: function (damage, target, source, effect) {
				if (!effect) return;
				if (effect.id in {'leechseed':1, 'spikes':1, 'stealthrock':1,}) {
					return false;
				}
			},
			onBoost: function (boost, target, source, effect) {
				if (!effect) return;
				if (effect.id === 'stickyweb') delete boost['spe'];
			},
			onSetStatus: function (status, target, source, effect) {
				if (!effect) return false;
				if (effect.id === 'toxicspikes') return false;
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Elevated Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Elevated Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Elevated Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Flying",
		zMoveBoost: {atk: 1},
	},
	"ominousterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "ominousterrain",
		name: "Ominous Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'ominousterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Ghost' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onDisableMove: function (pokemon) {
				if (pokemon.isGrounded()) {
					for (const moveSlot of pokemon.moveSlots) {
						if (this.getMove(moveSlot.id).flags['heal']) {
							pokemon.disableMove(moveSlot.id);
						}
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (pokemon.isGrounded() && move.flags['heal']) {
					this.add('cant', pokemon, 'move: Ominous Terrain', move);
					return false;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Ominous Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Ominous Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Ominous Terrain');
			},
			onTryHeal: false,
		},
		secondary: false,
		target: "all",
		type: "Ghost",
		zMoveBoost: {spe: 1},
	},
	"sandyterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "sandyterrain",
		name: "Sandy Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'sandyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if ((move.type === 'Ground' || move.type === 'Rock' || move.type === 'Steel') && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.3);
				}
			},
			onSetStatus: function (status, target, source, effect) {
				if (!target.isGrounded() || target.types.indexOf('Ground') < 0 || target.isSemiInvulnerable()) return;
				if (effect && effect.status) {
					this.add('-activate', target, 'move: Sandy Terrain');
				}
				return false;
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Sandy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Sandy Terrain');
				}
				// Fairy Dust implementation
				let targets = [];
				for (let sideSlot = 0; sideSlot < this.sides.length; sideSlot++) {
					let sideActive = this.sides[sideSlot].active;
					for (let activeSlot = 0; activeSlot < sideActive.length; activeSlot++) {
						if (sideActive[activeSlot] && sideActive[activeSlot].isActive && sideActive[activeSlot].hasAbility('fairydust')) {
							targets.push(sideActive[activeSlot]);
						}
					}
				}
				for (const target of targets) {
					if (target.hasType('Fairy')) continue;
					if (!target.addType('Fairy')) continue;
					this.add('-start', target, 'typeadd', 'Fairy', '[from] ability: Fairy Dust');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Sandy Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Ground",
		zMoveBoost: {def: 1},
	},
	"frostyterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "frostyterrain",
		name: "Frosty Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'frostyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Ice' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onDisableMove: function (pokemon) {
				if (pokemon.isGrounded()) {
					for (const moveSlot of pokemon.moveSlots) {
						if (this.getMove(moveSlot.id).type === 'Water' && !(this.getMove(moveSlot.id).id in {'scald':1, 'steameruption':1})) {
							pokemon.disableMove(moveSlot.id);
						}
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (pokemon.isGrounded() && move.type === 'Water' && !(move.id in {'scald':1, 'steameruption':1})) {
					this.add('cant', pokemon, 'move: Frosty Terrain', move);
					return false;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Frosty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Frosty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Frosty Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Ice",
		zMoveBoost: {spa: 1},
	},
	"cloudyterrain": {
		num: 604,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "cloudyterrain",
		name: "Cloudy Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'cloudyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Normal' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
				if (move.type !== 'Normal' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('terrain weaken');
					return this.chainModify(0.75);
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Cloudy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Cloudy Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Cloudy Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Normal",
		zMoveBoost: {spd: 1},
	},
	"rockyterrain": {
		num: 604,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "rockyterrain",
		name: "Rocky Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'rockyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				let duration = 5;
				if (source && source.hasItem('terrainextender')) duration += 3;
				if (source && source.hasAbility('gemenergy')) duration += 2;
				return duration;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Rock' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onModifyAccuracy: function (accuracy, target, source, move) {
				if (source.isGrounded()) {
					if (typeof accuracy !== 'number') return;
					return accuracy * 4 / 3;
				}
			},
			// Metal Crush implenentation
			onEffectiveness: function (typeMod, target, type, move) {
				if (move && move.effectType === 'Move' && move.metalCrushBoosted && move.type === 'Rock' && type === 'Steel') {
					return 1;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Rocky Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Rocky Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Rocky Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Rock",
		zMoveBoost: {atk: 1},
	},
	"corrosiveterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "corrosiveterrain",
		name: "Corrosive Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'corrosiveterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Poison' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onNegateImmunity: function (pokemon, type) {
				if (pokemon.isGrounded() && pokemon.hasType('Steel') && type === 'Poison') return false;
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Corrosive Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Corrosive Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Corrosive Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Poison",
		zMoveBoost: {spe: 1},
	},
	"psychicterrain": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit: function (target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable() || target.side === source.side) return;
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('psychic terrain boost');
					return this.chainModify(1.5);
				}
			},
			onSwitchIn: function (pokemon) {
				// Enchanted Regalia implementation
				let foeactive = pokemon.side.foe.active;
				for (let i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (foeactive[i].hasAbility('enchantedregalia')) pokemon.addVolatile('embargo');
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
				// Enchanted Regalia implementation
				let targetSides = {};
				for (let sideSlot = 0; sideSlot < this.sides.length; sideSlot++) {
					let sideActive = this.sides[sideSlot].active;
					for (let activeSlot = 0; activeSlot < sideActive.length; activeSlot++) {
						if (sideActive[activeSlot] && sideActive[activeSlot].isActive && sideActive[activeSlot].hasAbility('enchantedregalia')) {
							targetSides[1 - sideSlot] = true;
						}
					}
				}
				for (let sideSlot = 0; sideSlot < this.sides.length; sideSlot++) {
					let sideActive = this.sides[sideSlot].active;
					for (let activeSlot = 0; activeSlot < sideActive.length; activeSlot++) {
						if (sideActive[activeSlot] && sideActive[activeSlot].isActive && (sideSlot in targetSides)) {
							sideActive[activeSlot].addVolatile('embargo');
						}
					}
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Psychic Terrain');
				// Enchanted Regalia implementation
				let targetSides = {};
				for (let sideSlot = 0; sideSlot < this.sides.length; sideSlot++) {
					let sideActive = this.sides[sideSlot].active;
					for (let activeSlot = 0; activeSlot < sideActive.length; activeSlot++) {
						if (sideActive[activeSlot] && sideActive[activeSlot].isActive && sideActive[activeSlot].hasAbility('enchantedregalia')) {
							targetSides[1 - sideSlot] = true;
						}
					}
				}
				for (let sideSlot = 0; sideSlot < this.sides.length; sideSlot++) {
					let sideActive = this.sides[sideSlot].active;
					for (let activeSlot = 0; activeSlot < sideActive.length; activeSlot++) {
						if (sideActive[activeSlot] && sideActive[activeSlot].isActive && (sideSlot in targetSides)) {
							sideActive[activeSlot].removeVolatile('embargo');
						}
					}
				}
			},
		},
	},
	"metallicterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "metallicterrain",
		name: "Metallic Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'metallicterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Steel' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onBoost: function (boost, target, source, effect) {
				if ((source && target === source) || !target.isGrounded()) return;
				let showMsg = false;
				for (let i in boost) {
					if (boost[i] < 0) {
						delete boost[i];
						showMsg = true;
					}
				}
				if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Metallic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Metallic Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Metallic Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Steel",
		zMoveBoost: {spe: 1},
	},
	"seaterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "seaterrain",
		name: "Sea Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'seaterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Ground' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onUpdate: function (pokemon) {
				if (pokemon.status === 'brn' && pokemon.isGrounded()) {
					this.add('-activate', pokemon, 'move: Sea Terrain');
					pokemon.cureStatus();
				}
			},
			onSetStatus: function (status, target, source, effect) {
				if (status.id !== 'brn') return;
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (!effect || !effect.status) return false;
				this.add('-activate', target, 'move: Sea Terrain');
				return false;
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Sea Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Sea Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'Sea Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Water",
		zMoveBoost: {spe: 1},
	},

	"camouflage": {
		inherit: true,
		onHit: function (target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			} else if (this.field.isTerrain('pollenterrain')) {
				newType = 'Bug';
			} else if (this.field.isTerrain('murkyterrain')) {
				newType = 'Dark';
			} else if (this.field.isTerrain('regalterrain')) {
				newType = 'Dragon';
			} else if (this.field.isTerrain('fieryterrain')) {
				newType = 'Fire';
			} else if (this.field.isTerrain('chakraterrain')) {
				newType = 'Fighting';
			} else if (this.field.isTerrain('elevatedterrain')) {
				newType = 'Flying';
			} else if (this.field.isTerrain('ominousterrain')) {
				newType = 'Ghost';
			} else if (this.field.isTerrain('sandyterrain')) {
				newType = 'Ground';
			} else if (this.field.isTerrain('frostyterrain')) {
				newType = 'Ice';
			} else if (this.field.isTerrain('rockyterrain')) {
				newType = 'Rock';
			} else if (this.field.isTerrain('corrosiveterrain')) {
				newType = 'Poison';
			} else if (this.field.isTerrain('metallicterrain')) {
				newType = 'Steel';
			} else if (this.field.isTerrain('seaterrain')) {
				newType = 'Water';
			}
			if (!target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
	"naturepower": {
		inherit: true,
		onTryHit: function (target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			} else if (this.field.isTerrain('pollenterrain')) {
				move = 'pollenpuff';
			} else if (this.field.isTerrain('murkyterrain')) {
				move = 'darkpulse';
			} else if (this.field.isTerrain('regalterrain')) {
				move = 'dragonpulse';
			} else if (this.field.isTerrain('fieryterrain')) {
				move = 'lavaplume';
			} else if (this.field.isTerrain('chakraterrain')) {
				move = 'aurasphere';
			} else if (this.field.isTerrain('elevatedterrain')) {
				move = 'airslash';
			} else if (this.field.isTerrain('ominousterrain')) {
				move = 'shadowball';
			} else if (this.field.isTerrain('sandyterrain')) {
				move = 'earthpower';
			} else if (this.field.isTerrain('frostyterrain')) {
				move = 'icebeam';
			} else if (this.field.isTerrain('rockyterrain')) {
				move = 'powergem';
			} else if (this.field.isTerrain('corrosiveterrain')) {
				move = 'sludgebomb';
			} else if (this.field.isTerrain('metallicterrain')) {
				move = 'flashcannon';
			} else if (this.field.isTerrain('seaterrain')) {
				move = 'hydropump';
			}
			this.useMove(move, pokemon, target);
			return null;
		},
	},
	"secretpower": {
		inherit: true,
		onModifyMove: function (move, pokemon) {
			if (this.field.isTerrain('') || this.field.isTerrain('chakraterrain') || this.field.isTerrain('cloudyterrain')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else if (this.field.isTerrain('pollenterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spd: -1,
					},
				});
			} else if (this.field.isTerrain('murkyterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'torment',
				});
			} else if (this.field.isTerrain('regalterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'flinch',
				});
			} else if (this.field.isTerrain('fieryterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'brn',
				});
			} else if (this.field.isTerrain('elevatedterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'telekinesis',
				});
			} else if (this.field.isTerrain('ominousterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						def: -1,
					},
				});
			} else if (this.field.isTerrain('sandyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						def: -1,
					},
				});
			} else if (this.field.isTerrain('frostyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'frz',
				});
			} else if (this.field.isTerrain('rockyterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'flinch',
				});
			} else if (this.field.isTerrain('corrosiveterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'tox',
				});
			} else if (this.field.isTerrain('metallicterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'confusion',
				});
			} else if (this.field.isTerrain('seaterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						atk: -1,
					},
				});
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
	},

	// Toxic Waste
	"toxicspikes": {
		inherit: true,
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
				// Toxic Waste implementation
				let foeactive = side.foe.active;
				let toxicWaste = false;
				for (let i = 0; i < foeactive.length; i++) {
					if (foeactive[i].ability === 'toxicwaste') toxicWaste = true;
				}
				if (this.field.isTerrain('corrosiveterrain') && toxicWaste) this.effectData.layers++;
			},
			onRestart: function (side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.runImmunity('Poison')) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},

	// Gem Energy
	"auroraveil": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (target, source, effect) {
				let duration = 5;
				if (source && source.hasItem('lightclay')) duration += 3;
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) duration += 2;
				return duration;
			},
			onAnyModifyDamage: function (damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.sideConditions['reflect'] && this.getCategory(move) === 'Physical') ||
							(target.side.sideConditions['lightscreen'] && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!move.crit && !move.infiltrates) {
						this.debug('Aurora Veil weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Aurora Veil');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Aurora Veil');
			},
		},
	},
	"gravity": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) {
					return 7;
				}
				return 5;
			},
			onStart: function () {
				this.add('-fieldstart', 'move: Gravity');
				const allActivePokemon = this.sides[0].active.concat(this.sides[1].active);
				for (let pokemon of allActivePokemon) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy: function (accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5 / 3;
			},
			onDisableMove: function (pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.getMove(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (move.flags['gravity']) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd: function () {
				this.add('-fieldend', 'move: Gravity');
			},
		},
	},
	"lightscreen": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (target, source, effect) {
				let duration = 5;
				if (source && source.hasItem('lightclay')) duration += 3;
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) duration += 2;
				return duration;
			},
			onAnyModifyDamage: function (damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Special') {
					if (!move.crit && !move.infiltrates) {
						this.debug('Light Screen weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
	},
	"magicroom": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) {
					return 7;
				}
				return 5;
			},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 25,
			onEnd: function () {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectData.source);
			},
		},
	},
	"mist": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (target, source, effect) {
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) {
					return 7;
				}
				return 5;
			},
			onBoost: function (boost, target, source, effect) {
				if (source && target !== source && (!effect.infiltrates || target.side === source.side)) {
					let showMsg = false;
					for (let i in boost) {
						if (boost[i] < 0) {
							delete boost[i];
							showMsg = true;
						}
					}
					if (showMsg && !effect.secondaries) this.add('-activate', target, 'move: Mist');
				}
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'Mist');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 3,
			onEnd: function (side) {
				this.add('-sideend', side, 'Mist');
			},
		},
	},
	"mudsport": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) {
					return 7;
				}
				return 5;
			},
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: Mud Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('mud sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onResidualOrder: 21,
			onEnd: function () {
				this.add('-fieldend', 'move: Mud Sport');
			},
		},
	},
	"reflect": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (target, source, effect) {
				let duration = 5;
				if (source && source.hasItem('lightclay')) duration += 3;
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) duration += 2;
				return duration;
			},
			onAnyModifyDamage: function (damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Physical') {
					if (!move.crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onResidualOrder: 21,
			onEnd: function (side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
	},
	"safeguard": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (target, source, effect) {
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) {
					return 7;
				}
				return 5;
			},
			onSetStatus: function (status, target, source, effect) {
				if (source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return null;
				}
			},
			onTryAddVolatile: function (status, target, source, effect) {
				if ((status.id === 'confusion' || status.id === 'yawn') && source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'Safeguard');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function (side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
	},
	"tailwind": {
		inherit: true,
		effect: {
			duration: 4,
			durationCallback: function (target, source, effect) {
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) {
					return 6;
				}
				return 4;
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Tailwind');
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
	},
	"trickroom": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) {
					return 7;
				}
				return 5;
			},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd: function () {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},
	"watersport": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) {
					return 7;
				}
				return 5;
			},
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: Water Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('water sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onResidualOrder: 21,
			onEnd: function () {
				this.add('-fieldend', 'move: Water Sport');
			},
		},
	},
	"wonderroom": {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (this.field.isTerrain('rockyterrain') && source && source.hasAbility('gemenergy')) {
					return 7;
				}
				return 5;
			},
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
			},
			onRestart: function (target, source) {
				this.field.removePseudoWeather('wonderroom');
			},
			// Swapping defenses implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onResidualOrder: 24,
			onEnd: function () {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
	},
};
