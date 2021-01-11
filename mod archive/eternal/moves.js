'use strict';
exports.BattleMovedex = {
	"lightofruin": {
		inherit: true,
		isUnreleased: false,
	},
	"wrathofnature": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "This move combines Fighting in its type effectiveness against the target.",
		shortDesc: "Combines Fighting in its type effectiveness.",
		id: "wrathofnature",
		name: "Wrath Of Nature",
		pp: 10,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onEffectiveness: function(typeMod, type, move) {
			return typeMod + this.getEffectiveness('Fighting', type);
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leaf Blade", target);
			this.add('-anim', source, "Close Combat", target);
		},
		priority: 0,
		secondary: false,
		target: "normal",
		type: "Grass",
		zMovePower: 180,
		contestType: "Tough",
	},
	"volcaniceruption": {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Has a 50% chance to burn the target.",
		shortDesc: "50% chance to burn the target.",
		id: "volcaniceruption",
		name: "Volcanic Eruption",
		pp: 5,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Eruption", target);
		},
		target: "allAdjacent",
		type: "Fire",
		zMovePower: 200,
		contestType: "Cool",
	},
	"seenoevil": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 30% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "30% chance to lower the foe(s) accuracy by 1.",
		id: "seenoevil",
		name: "See No Evil",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Pump", target);
		},
		target: "normal",
		type: "Water",
		zMovePower: 180,
		contestType: "Clever",
	},
	"gigavoltimpact": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
		id: "gigavoltimpact",
		name: "Gigavolt Impact",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Volt Tackle", target);
		},
		secondary: false,
		target: "normal",
		type: "Electric",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"evolutionblast": {
		shortDesc: "Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy",
		accuracy: 100,
		basePower: 0,
		category: "Special",
		id: "evolutionblast",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onTryHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Boomburst", target);
			this.useMove("evolutionblastwater", source);
			this.useMove("evolutionblastelectric", source);
			this.useMove("evolutionblastfire", source);
			this.useMove("evolutionblastpsychic", source);
			this.useMove("evolutionblastdark", source);
			this.useMove("evolutionblastgrass", source);
			this.useMove("evolutionblastice", source);
			this.useMove("evolutionblastfairy", source);
		},
                onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
		target: "normal",
		type: "Normal",
		zMovePower: 200,
	},
	"evolutionblastwater": {
		shortDesc: "Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy",
		accuracy: 100,
		basePower: 15,
		category: "Special",
		id: "evolutionblastwater",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bubble", target);
		},
		target: "normal",
		type: "Water",
		zMovePower: 25,
	},
	"evolutionblastelectric": {
		shortDesc: "Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy",
		accuracy: 100,
		basePower: 15,
		category: "Special",
		id: "evolutionblastelectric",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thundershock", target);
		},
		target: "normal",
		type: "Electric",
		zMovePower: 25,
	},
	"evolutionblastfire": {
		shortDesc: "Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy",
		accuracy: 100,
		basePower: 15,
		category: "Special",
		id: "evolutionblastfire",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blast Burn", target);
		},
		target: "normal",
		type: "Fire",
		zMovePower: 25,
	},
	"evolutionblastpsychic": {
		shortDesc: "Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy",
		accuracy: 100,
		basePower: 15,
		category: "Special",
		id: "evolutionblastpsychic",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic", target);
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 25,
	},
	"evolutionblastdark": {
		shortDesc: "Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy",
		accuracy: 100,
		basePower: 15,
		category: "Special",
		id: "evolutionblastdark",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Daze", target);
		},
		target: "normal",
		type: "Dark",
		zMovePower: 25,
	},
	"evolutionblastgrass": {
		shortDesc: "Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy",
		accuracy: 100,
		basePower: 15,
		category: "Special",
		id: "evolutionblastgrass",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Razor Leaf", target);
		},
		target: "normal",
		type: "Grass",
		zMovePower: 25,
	},
	"evolutionblastice": {
		shortDesc: "Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy",
		accuracy: 100,
		basePower: 15,
		category: "Special",
		id: "evolutionblastice",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Beam", target);
		},
		target: "normal",
		type: "Ice",
		zMovePower: 25,
	},
	"evolutionblastfairy": {
		shortDesc: "Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy",
		accuracy: 100,
		basePower: 15,
		category: "Special",
		id: "evolutionblastfairy",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dazzling Gleam", target);
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 25,
	},
	"darkcrowdive": {
		accuracy: 95,
		basePower: 150,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "darkcrowdive",
		name: "Dark Crow Dive",
		pp: 35,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 200,
		contestType: "Tough",
	},
	"mysticwraith": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		defensiveCategory: "Physical",
		desc: "Deals damage to the target based on its Defense instead of Special Defense.",
		shortDesc: "Damages target based on Defense, not Sp. Def.",
		id: "mysticwraith",
		name: "Mystic Wraith",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		secondary: false,
		target: "normal",
		type: "Ghost",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"wispburst": {
		accuracy: 80,
		basePower: 130,
		category: "Special",
		desc: "30% to burn the opponent, bypasses immunities, hitting for neutral damage.",
		shortDesc: "30% to burn the opponent, bypasses immunities, hitting for neutral damage.",
		id: "wispburst",
		isViable: true,
		name: "Wisp Burst",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		onEffectiveness: function(typeMod, type) {
			if (type === 'Normal') return 1;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		target: "normal",
		type: "Ghost",
		zMovePower: 195,
		contestType: "Beautiful",
	},
	"doubleswordstrike": {
		accuracy: 50,
		basePower: 60,
		category: "Physical",
		desc: "Hits twice.",
		shortDesc: "Hits 2 times in one turn.",
		id: "doubleswordstrike",
		name: "Double Swordstrike",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sacred Sword", target);
			this.add('-anim', source, "Sacred Sword", target);
		},
		multihit: 2,
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 190,
		contestType: "Tough",
	},
	"brainfreeze": {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button.",
		shortDesc: "User switches out after damaging the target.",
		id: "brainfreeze",
		isViable: true,
		name: "Brain Freeze",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Beam", target);
		},
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Ice",
		zMovePower: 140,
		contestType: "Cool",
	},
	"metallicpunch": {
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		desc: "Has a 70% chance to lower the target's Defense by 1 stage.",
		shortDesc: "70% chance to lower the target's Def by 1.",
		id: "metallicpunch",
		isViable: true,
		name: "Metallic Punch",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			punch: 1,
			mirror: 1,
			contact: 1
		},
		secondary: {
			chance: 70,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Claw", target);
		},
		target: "normal",
		type: "Steel",
		zMovePower: 175,
		contestType: "Clever",
	},
	"stoneslam": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 20% chance to flinch the target.",
		shortDesc: "20% chance to flinch the foe(s).",
		id: "stoneslam",
		isViable: true,
		name: "Stone Slam",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Throw", target);
		},
		target: "allAdjacentFoes",
		type: "Rock",
		zMovePower: 180,
		contestType: "Tough",
	},
	"spectrumbite": {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch the foe(s).",
		id: "spectrumbite",
		isViable: true,
		name: "Spectrum Bite",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1,
			bite: 1
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Ball", target);
		},
		target: "allAdjacentFoes",
		type: "Ghost",
		zMovePower: 175,
		contestType: "Tough",
	},
	"particlecannon": {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "Has a 20% chance to either burn, badly poison, or paralyze the target.",
		shortDesc: "20% chance to paralyze or burn or freeze target.",
		id: "particlecannon",
		isViable: true,
		name: "Particle Cannon",
		pp: 5,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 10,
			onHit: function(target, source) {
				let result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('tox', source);
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tri Attack", target);
		},
		target: "normal",
		type: "Steel",
		zMovePower: 190,
		contestType: "Beautiful",
	},
	"relicrejuvenation": {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "relicrejuvenation",
		isViable: true,
		name: "Relic Rejuvenation",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			heal: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Extrasensory", target);
		},
		drain: [1, 2],
		secondary: false,
		target: "normal",
		type: "Psychic",
		zMovePower: 150,
		contestType: "Tough",
	},
	"batteryoverload": {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "Raises user's Attack stat, but also raises foe's Special Attack stat",
		shortDesc: "Raises user's Attack stat, but also raises foe's Special Attack stat",
		id: "batteryoverload",
		isViable: true,
		name: "Battery Overload",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
				},
			},
			boosts: {
				spa: 1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Volt Tackle", target);
		},
		target: "normal",
		type: "Electric",
		zMovePower: 185,
		contestType: "Cool",
	},
	"magikarpsrevenge": {
		accuracy: true,
		basePower: 120,
		category: "Physical",
		desc: "Has a 100% chance to confuse the target and lower its Defense and Special Attack by 1 stage. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. The user steals the foe's boosts. If this move is successful, the weather changes to rain unless it is already in effect, and the user gains the effects of Aqua Ring and Magic Coat.",
		shortDesc: "Does many things turn 1. Can't move turn 2.",
		id: "magikarpsrevenge",
		name: "Magikarp's Revenge",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			recharge: 1,
			protect: 1,
			mirror: 1,
			heal: 1
		},
		noSketch: true,
		self: {
			onHit: function(source) {
				this.setWeather('raindance');
				source.addVolatile('magiccoat');
				source.addVolatile('aquaring');
			},
			volatileStatus: 'mustrecharge',
		},
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
			boosts: {
				def: -1,
				spa: -1,
			},
		},
		stealsBoosts: true,
		target: "normal",
		type: "Water",
		zMovePower: 190,
		contestType: "Cute",
	},
	"hitandrun": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button.",
		shortDesc: "User switches out after damaging the target.",
		id: "hitandrun",
		isViable: true,
		name: "Hit and Run",
		pp: 20,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "U-Turn", target);
		},
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Bug",
		zMovePower: 180,
		contestType: "Cute",
	},
	"darttricks": {
		accuracy: 90,
		basePower: 30,
		category: "Special",
		desc: "Hits 3 times, with each hit having its own accuracy check and a high critical hit ratio",
		shortDesc: "Hits 3 times, with each hit having its own accuracy check and a high critical hit ratio",
		id: "darttricks",
		name: "Dart Tricks",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Blast", target);
			this.add('-anim', source, "Rock Blast", target);
			this.add('-anim', source, "Rock Blast", target);
		},
		multihit: 3,
		critRatio: 2,
		secondary: false,
		target: "normal",
		type: "Rock",
		zMovePower: 175,
		contestType: "Cool",
	},
	"highnoonclaw": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Deals 1.5* damage if the weather is Sunny.",
		shortDesc: "Deals 1.5* damage if the weather is Sunny.",
		id: "highnoonclaw",
		isViable: true,
		name: "High Noon Claw",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rush", target);
		},
		secondary: false,
		target: "normal",
		type: "Dragon",
		zMovePower: 175,
		contestType: "Cute",
	},
	"kineticblow": {
		accuracy: 90,
		basePower: 90,
		category: "Special",
		desc: "15% chance to raise the user's Special Attack stat by 1 stage.",
		shortDesc: "15% chance to raise the user's Sp. Atk by 1.",
		id: "kineticblow",
		name: "Kinetic Blow",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 15,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic", target);
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"paragongift": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The teammate that switches in gains +1 to Defense and Special Defense. User faints.",
		shortDesc: "The teammate that switches in gains +1 to Defense and Special Defense. User faints.",
		id: "paragongift",
		isViable: true,
		name: "Paragon Gift",
		pp: 5,
		priority: 0,
		flags: {
			snatch: 1,
			mirror: 1,
			authentic: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Parting Shot", target);
		},
		selfdestruct: "ifHit",
		boosts: {
			self: {
				def: 1,
				spd: 1,
			},
		},
		sideCondition: 'paragongift',
		effect: {
			duration: 2,
			onStart: function(side, source) {
				this.debug('Paragon Gift started on ' + side.name);
				this.effectData.positions = [];
				// @ts-ignore
				for (const i of side.active.keys()) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function(side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn: function(target) {
				const positions = /**@type {boolean[]} */ (this.effectData.positions);
				if (target.position !== this.effectData.sourcePosition) {
					return;
				}
				if (!target.fainted) {
					this.boost({def: 1, spd: 1});
				}
				if (!positions.some(affected => affected === true)) {
					target.side.removeSideCondition('paragongift');
				}
			},
		},
		secondary: false,
		target: "self",
		type: "Dragon",
		zMoveEffect: 'healreplacement',
		contestType: "Cool",
	},
	"magicalegg": {
		accuracy: 100,
		basePower: 0,
		damageCallback: function(pokemon) {
			if (!pokemon.volatiles['magicalegg']) return 0;
			return pokemon.volatiles['magicalegg'].damage || 1;
		},
		category: "Special",
		desc: "Deals damage to the last foe to hit the user with an attack this turn equal to 1.5 times the HP lost by the user from that attack. If the user did not lose HP from the attack, this move deals damage with a Base Power of 1 instead. If that foe's position is no longer in use, the damage is done to a random foe in range. Only the last hit of a multi-hit attack is counted. Fails if the user was not hit by a foe's attack this turn.",
		shortDesc: "If hit by an attack, returns the damage taken.",
		id: "magicalegg",
		name: "Magical Egg",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Burst", target);
		},
		beforeTurnCallback: function(pokemon) {
			pokemon.addVolatile('magicalegg');
		},
		onTryHit: function(target, source, move) {
			if (!source.volatiles['magicalegg']) return false;
			if (source.volatiles['magicalegg'].position === null) return false;
		},
		effect: {
			duration: 1,
			noCopy: true,
			onStart: function(target, source, source2, move) {
				this.effectData.position = null;
				this.effectData.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget: function(target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onDamagePriority: -101,
			onDamage: function(damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && source.side !== target.side) {
					this.effectData.position = source.position;
					this.effectData.damage = damage;
				}
			},
		},
		secondary: false,
		target: "scripted",
		type: "Fairy",
		zMovePower: 100,
		contestType: "Cool",
	},
	"brutaltrick": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button.",
		shortDesc: "User switches out after damaging the target.",
		id: "brutaltrick",
		isViable: true,
		name: "Brutal Trick",
		pp: 20,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Feint Attack", target);
		},
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Cute",
	},
	"eeriewhiteout": {
		accuracy: true,
		basePower: 50,
		category: "Special",
		desc: "Sets up Hail. Reduces the target's Special Defense by two stages. 10% chance to freeze the target.",
		shortDesc: "Sets up Hail. Reduces the target's Special Defense by two stages. 10% chance to freeze the target.",
		id: "eeriewhiteout",
		isViable: true,
		name: "Eerie Whiteout",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		boosts: {
			spd: -2,
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Ball", target);
		},
		weather: 'hail',
		target: "normal",
		type: "Ghost",
		zMovePower: 175,
		contestType: "Clever",
	},
	"protostarburst": {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Sets up Gravity. User takes 1/3 recoil",
		shortDesc: "Sets up Gravity. User takes 1/3 recoil",
		id: "protostarburst",
		name: "Gravity",
		pp: 10,
		priority: 0,
		flags: {
			nonsky: 1
		},
		pseudoWeather: 'gravity',
		effect: {
			duration: 5,
			durationCallback: function(source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 7;
				}
				return 5;
			},
			onStart: function() {
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
			onModifyAccuracy: function(accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5 / 3;
			},
			onDisableMove: function(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.getMove(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove: function(pokemon, target, move) {
				if (move.flags['gravity']) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd: function() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gravity", target);
		},
		secondary: false,
		recoil: [1, 3],
		target: "all",
		type: "Psychic",
		zMovePower: 175,
		contestType: "Clever",
	},
	"despoilingvines": {
		accuracy: 90,
		basePower: 35,
		category: "Physical",
		desc: "Traps the target, leeching 1/8 of their HP per turn. Lasts 4-5 turns.",
		shortDesc: "Traps the target, leeching 1/8 of their HP per turn. Lasts 4-5 turns.",
		id: "despoilingvines",
		isViable: true,
		name: "Despoiling Vines",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onHit: function (target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		volatileStatus: 'despoilingvines',
		secondary: false,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		target: "normal",
		type: "Dark",
		zMovePower: 1000,
		contestType: "Clever",
	},
	"blindingiridescence": {
		accuracy: 75,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to flinch the target.",
		shortDesc: "20% chance to flinch the foe.",
		id: "blindingiridescence",
		isViable: true,
		name: "Blinding Iridescence",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clanging Scales", target);
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 180,
		contestType: "Tough",
	},
	"pileup": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user gathers nutrients from the ground, restoring 50% of its maximum HP. This move has a 25% chance to raise the user's Attack, Defense, Special Attack, Special Defense, or Speed by 1 stage (basically 5% for each).",
		shortDesc: "The user gathers nutrients from the ground, restoring 50% of its maximum HP. This move has a 25% chance to raise the user's Attack, Defense, Special Attack, Special Defense, or Speed by 1 stage (basically 5% for each).",
		id: "pileup",
		name: "Pile Up",
		pp: 10,
		priority: 0,
		flags: {
			snatch: 1,
			heal: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Shore Up", source);
		},
		heal: [1, 2],
		secondaries: [{
			chance: 5,
			self: {
				boosts: {
					atk: 1,
				},
			},
		}, {
			chance: 5,
			self: {
				boosts: {
					def: 1,
				},
			},
		}, {
			chance: 5,
			self: {
				boosts: {
					spa: 1,
				},
			},
		}, {
			chance: 5,
			self: {
				boosts: {
					spd: 1,
				},
			},
		}, {
			chance: 5,
			self: {
				boosts: {
					spe: 1,
				},
			},
		}, ],
		target: "self",
		type: "Ground",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"ardentstrike": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Ignores immunities while attacking",
		shortDesc: "Ignores immunities while attacking",
		id: "ardentstrike",
		isViable: true,
		name: "Ardent Strike",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1
		},
		secondary: false,
		ignoreImmunity: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rush", target);
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"spikestorm": {
		accuracy: 90,
		basePower: 20,
		category: "Physical",
		desc: "Hits 2-5 times, each hit has a 30% chance to set up a Layer of Spikes.",
		shortDesc: "Hits 2-5 times in one turn, each hit has a 30% chance to set up a Layer of Spikes.",
		id: "spikestorm",
		isViable: true,
		name: "Spike Storm",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		multihit: [2, 5],
		onHit: function(target, source) {
			if (this.randomChance(3, 10)) {
				target.side.addSideCondition('spikes', source);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bulldoze", target);
		},
		target: "normal",
		type: "Ground",
		zMovePower: 80,
		contestType: "Tough",
	},
	"metalliccharge": {
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target. 75% recoil.",
		shortDesc: "30% chance to flinch the target. 75% recoil.",
		id: "metalliccharge",
		isViable: true,
		name: "Metallic Charge",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		recoil: [3, 4],
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Meteor Mash", target);
		},
		target: "normal",
		type: "Steel",
		zMovePower: 200,
		contestType: "Tough",
	},
	"rapidcascade": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		id: "rapidcascade",
		isViable: true,
		name: "Rapid Cascade",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Waterfall", target);
		},
		secondary: false,
		target: "normal",
		type: "Water",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"deadonstrike": {
		accuracy: true,
		basePower: 80,
		category: "Physical",
		desc: "+1 Acc, ignores acc check. 33% recoil.",
		shortDesc: "+1 Acc, ignores acc check. 33% recoil.",
		id: "deadonstrike",
		isViable: true,
		name: "Dead-On Strike",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		recoil: [1, 3],
		secondary: {
			chance: 100,
			self: {
				boosts: {
					accuracy: 1,
				},
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Smart Strike", target);
		},
		target: "normal",
		type: "Dark",
		zMovePower: 200,
		contestType: "Cool",
	},
	"tectonicfault": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Protect + Stealth Rock",
		shortDesc: "Protect + Stealth Rock",
		id: "tectonicfault",
		isViable: true,
		name: "Tectonic Fault",
		pp: 5,
		priority: 2,
		flags: {
			reflectable: 1
		},
		onPrepareHit: function(pokemon) {
			return !!this.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit: function(pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				source.moveThisTurnResult = true;
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return null;
			},
		},
		sideCondition: 'stealthrock',
		effect: {
			// this is a side condition
			onStart: function(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn: function(pokemon) {
				let typeMod = this.clampIntRange(pokemon.runEffectiveness('Rock'), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: false,
		target: "foeSide",
		type: "Rock",
		zMoveEffect: 'heal',
		contestType: "Cool",
	},
	"bitterfragance": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Drops target defense and special defense by one level, then returns to the player.",
		shortDesc: "Drops target defense and special defense by one level, then returns to the player.",
		id: "bitterfragance",
		isViable: true,
		name: "Bitter Fragance",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			sound: 1,
			authentic: 1
		},
		selfSwitch: true,
		boosts: {
			def: -1,
			spd: -1,
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Memento", target);
		},
		target: "normal",
		type: "Poison",
		zMoveEffect: 'healreplacement',
		contestType: "Cool",
	},
	"mistbath": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user summons Misty Terrain, and then recovers half of its health.",
		shortDesc: "The user summons Misty Terrain, and then recovers half of its health.",
		id: "mistbath",
		name: "Mist Bath",
		pp: 10,
		priority: 0,
		flags: {
			heal: 1,
			nonsky: 1
		},
		heal: [1, 2],
		terrain: 'mistyterrain',
		effect: {
			duration: 5,
			durationCallback: function(source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus: function(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && effect.status) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile: function(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePower: function(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onStart: function(battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Misty Terrain", target);
			this.add('-anim', target, "Recover", source);
		},
		secondary: false,
		target: "all",
		type: "Water",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"bamboobash": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Damage increased by 1.5x under rain. 30% chance to confuse its foe.",
		id: "bamboobash",
		isViable: true,
		name: "Bamboo Bash",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, pokemon) {
			if (this.field.isWeather(['rainyday', 'primodialsea'])) {
				return this.chainModify(1.5);
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wood Hammer", target);
		},
		target: "normal",
		type: "Grass",
		zMovePower: 175,
		contestType: "Cute",
	},
	"holedig": {
		accuracy: 100,
		basePower: 135,
		category: "Physical",
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Hits adjacent foes. Prevents them from switching.",
		id: "holedig",
		name: "Hole Dig",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			nonsky: 1
		},
		onHit: function(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyperspace Hole", target);
		},
		secondary: false,
		target: "allAdjacentFoes",
		type: "Ground",
		zMovePower: 200,
		contestType: "Tough",
	},
	"swirlingpunch": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "10% chance of inducing sleep, 10% chance of inducing confusion. 80% chance of neither",
		id: "swirlingpunch",
		isViable: true,
		name: "Swirling Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 10,
				status: 'slp',
			}, {
				chance: 10,
				volatileStatus: 'confusion',
			},
		],
                onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Punch", target);
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 175,
		contestType: "Cool",
	},
	"highwaymansstrike": {
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Abilities Battle Armor or Shell Armor.",
		shortDesc: "Always results in a critical hit.",
		id: "highwaymansstrike",
		isViable: true,
		name: "Highway Mans Strike",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Knock Off", target);
		},
		willCrit: true,
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 150,
		contestType: "Cool",
	},
	"cascade": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Power doubles if the user is burned, paralyzed, or poisoned. The physical damage halving effect from the user's burn is ignored.",
		shortDesc: "Power doubles if user is burn/poison/paralyzed.",
		id: "cascade",
		isViable: true,
		name: "Cascade",
		pp: 20,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crabhammer", target);
		},
		onBasePowerPriority: 4,
		onBasePower: function(basePower, pokemon) {
			if (pokemon.status && pokemon.status !== 'slp') {
				return this.chainModify(2);
			}
		},
		secondary: false,
		target: "normal",
		type: "Water",
		zMovePower: 140,
		contestType: "Cute",
	},
	"shipwreckedgale": {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "Steals the opponent's stat changes before attacking, and then switches out, passing on the stolen stat changes on to the switch-in.",
		shortDesc: "Steals the opponent's stat changes before attacking, and then switches out, passing on the stolen stat changes on to the switch-in.",
		id: "shipwreckedgale",
		isViable: true,
		name: "Shipwrecked Gale",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			authentic: 1
		},
		stealsBoosts: true,
		onAfterHit: function(target, pokemon) {
			this.useMove("Baton Pass", pokemon);
		},
                onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
		secondary: false,
		target: "normal",
		type: "Ghost",
		zMovePower: 140,
		contestType: "Cool",
	},
	"gorgeousstrike": {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "1/9 Recoil.",
		shortDesc: "1/9 Recoil.",
		id: "gorgeousstrike",
		isViable: true,
		name: "Gorgeous Strike",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Play Rough", target);
		},
		recoil: [1, 9],
		target: "normal",
		type: "Fairy",
		zMovePower: 195,
		contestType: "Cute",
	},
	"woodpeckerbarrage": {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "Multihit move: 2-5, doesn't make contact.",
		shortDesc: "Multihit move: 2-5, doesn't make contact.",
		id: "woodpeckerbarrage",
		isViable: true,
		name: "Woodpecker Barrage",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Peck", target);
		},
		multihit: [2, 5],
		secondary: false,
		target: "normal",
		type: "Flying",
		zMovePower: 190,
		contestType: "Tough",
	},
	"meteoriteimpact": {
		accuracy: 95,
		basePower: 45,
		category: "Physical",
		shortDesc: "Nearly always goes first.",
		id: "meteoriteimpact",
		name: "Meteorite Impact",
		pp: 10,
		priority: 2,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Play Rough", target);
		},
		secondary: false,
		target: "normal",
		type: "Fairy",
		zMovePower: 170,
		contestType: "Cool",
	},
	"brawlingball": {
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		desc: "Raises Spe by one stage. Ignores immunities. Removes hazards from the user's side of the field, gets rid of binding moves and Leech Seed as well.",
		shortDesc: "Raises Spe by one stage. Ignores immunities. Removes hazards from the user's side of the field, gets rid of binding moves and Leech Seed as well.",
		id: "brawlingball",
		isViable: true,
		name: "Brawling Ball",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		self: {
			onHit: function(pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		selfBoost: {
			boosts: {
				spe: 1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Close Combat", target);
		},
		ignoreImmunity: true,
		target: "normal",
		type: "Fighting",
		zMovePower: 190,
		contestType: "Cool",
	},
	"razzledazzle": {
		accuracy: 100,
		basePower: 45,
		category: "Special",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. 30% chance to burn the target.",
		shortDesc: "Hits 2 times in one turn. 30% chance to burn the target.",
		id: "razzledazzle",
		name: "Razzle Dazzle",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		multihit: 2,
		secondary: {
			chance: 30,
			status: 'par',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wild Charge", target);
			this.add('-anim', source, "Wild Charge", target);
		},
		target: "normal",
		type: "Electric",
		zMovePower: 100,
		contestType: "Tough",
	},
	"soulstamp": {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		desc: "If the target is KOed by this move, Yamask transforms into the target and heals 50% of its max HP.",
		shortDesc: "If the target is KOed by this move, Yamask transforms into the target and heals 50% of its max HP.",
		id: "soulstamp",
		isViable: true,
		name: "Soul Stamp",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onAfterMoveSecondarySelf: function(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				pokemon.transformInto(target, pokemon);
				let targetAbility = this.getAbility(pokemon.ability);
				this.heal(target.maxhp / 2);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 185,
		contestType: "Beautiful",
	},
	"fleastorm": {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "The user recovers 100% the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 100% of the damage dealt.",
		id: "fleastorm",
		isViable: true,
		name: "Flea Storm",
		pp: 5,
		priority: 0,
		flags: {
			mirror: 1,
			heal: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bug Buzz", target);
		},
		drain: [1, 1],
		secondary: false,
		target: "normal",
		type: "Bug",
		zMovePower: 140,
		contestType: "Tough",
	},
	"beautydrain": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's SpD by 1 stage. The user restores its HP equal to the target's SpD stat calculated with its stat stage before this move was used. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. Fails if the target's Attack stat stage is -6.",
		shortDesc: "User heals HP=target's SpD stat. Lowers SpD by 1.",
		id: "strengthsap",
		isViable: true,
		name: "Beauty Drain",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			heal: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Strength Sap", target);
		},
		onHit: function(target, source) {
			if (target.boosts.spd === -6) return false;
			let spd = target.getStat('spd', false, true);
			let success = this.boost({
				spd: -1
			}, target, source, null, null, true);
			return this.heal(spd, source, target) || success;
		},
		secondary: false,
		target: "normal",
		type: "Water",
		zMoveBoost: {
			spa: 1
		},
		contestType: "Cute",
	},
	"ultrawarp": {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Has a 100% chance to poison the target.",
		shortDesc: "100% chance to poison the target.",
		id: "ultrawarp",
		isViable: true,
		name: "Ultra Warp",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Wave", target);
		},
		status: 'psn',
		target: "normal",
		type: "Psychic",
		zMovePower: 120,
	},
	"voidster": {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Has a high chance for a critical hit.",
		shortDesc: "High critical hit ratio. Hits 2-5 times.",
		id: "voidster",
		isViable: true,
		name: "Voidster",
		pp: 15,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Feint Attack", target);
		},
		critRatio: 2,
		multihit: [2, 5],
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Cool",
	},
	"pinpointsmash": {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "Sets 3 layers of Spikes.",
		shortDesc: "Sets 3 layers of Spikes.",
		id: "pinpointsmash",
		isViable: true,
		name: "Pinpoint Smash",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Freeze Shock", target);
		},
		onHit: function(target, source) {
			target.side.addSideCondition('spikes', source);
			target.side.addSideCondition('spikes', source);
			target.side.addSideCondition('spikes', source);
		},
		recoil: [1, 1],
		secondary: false,
		target: "normal",
		type: "Ice",
		zMovePower: 185,
		contestType: "Cool",
	},
	"shadowbrambles": {
		accuracy: 75,
		basePower: 100,
		category: "Special",
		desc: "Prevents the target from switching for four or five turns; seven turns if the user is holding Grip Claw. Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute. This effect is not stackable or reset by using this or another partial-trapping move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		id: "shadowbrambles",
		isViable: true,
		name: "Shadow Brambles",
		pp: 5,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: false,
		target: "normal",
		type: "Ghost",
		zMovePower: 180,
		contestType: "Tough",
	},
	"turbospin": {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and partial-trapping moves end for the user, and all hazards are removed from the user's side of the field. Then switches out.",
		shortDesc: "Frees user from hazards/partial trap/Leech Seed. User switches out.",
		id: "turbospin",
		isViable: true,
		name: "Turbo Spin",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		self: {
			onHit: function(pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Turbo Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Burn Up", target);
		},
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Fire",
		zMovePower: 140,
		contestType: "Cool",
	},
	"breakthrough": {
		accuracy: 100,
		basePower: 135,
		category: "Special",
		desc: "Fails unless the user is a Rock type. If this move is successful, the user's Rock type becomes typeless as long as it remains active.",
		shortDesc: "User's Rock type becomes typeless; must be Rock.",
		id: "breakthrough",
		name: "Breakthrough",
		pp: 5,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onTryMove: function(pokemon, target, move) {
			if (pokemon.hasType('Rock')) return;
			this.add('-fail', pokemon, 'move: Breakthrough');
			return null;
		},
		self: {
			onHit: function(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Rock" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Breakthrough');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Burn Up", target);
		},
		recoil: [1, 3],
		secondary: false,
		target: "normal",
		type: "Rock",
		zMovePower: 200,
		contestType: "Clever",
	},
	"rewind": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Resets the stat stages of all active Pokemon to 0. Heals user by 50% of their max HP.",
		shortDesc: "Eliminates all stat changes. Heals user.",
		id: "rewind",
		isViable: true,
		name: "Rewind",
		pp: 30,
		priority: 0,
		flags: {
			authentic: 1,
			snatch: 1,
			heal: 1
		},
		heal: [1, 2],
		onHitField: function() {
			this.add('-clearallboost');
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (pokemon && pokemon.isActive) pokemon.clearBoosts();
				}
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Haze", target);
		},
		secondary: false,
		target: "all",
		type: "Water",
		zMoveEffect: 'heal',
		contestType: "Beautiful",
	},
	squeakywheel: {
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		shortDesc: "Takes 2 PP from the target's last used move, if applicable.",
		id: "squeakywheel",
		name: "Squeaky Wheel",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1
		},
		volatileStatus: 'squeakywheel',
		effect: {
			onStart: function(pokemon) {
				this.add('-start', pokemon, 'Squeaky Wheel');
			},
			onDeductPP: function(target, source) {
				return 1;
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
		target: "normal",
		type: "Steel",
		ZMovePower: 160,
	},
	algaeallure: {
		basePower: 90,
		accuracy: 100,
		category: "Special",
		shortDesc: "User recovers 50% of the damage done.",
		id: "algae allure",
		name: "Algae Allure",
		pp: 10,
		priority: 0,
		flags: {
			heal: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scald", target);
		},
		heal: [1, 2],
		target: "normal",
		type: "Water",
		ZMovePower: 175,
	},
	"heatconverter": {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Super Effective on Fire-types. The user recovers 75% of the damage dealt and gives the user a boost to it's next Electric-type move and raised SpDef by one stage (à la Charge).",
		id: "heatconverter",
		isViable: true,
		name: "Heat Converter",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			heal: 1
		},
		drain: [3, 4],
		onEffectiveness: function(typeMod, type) {
			if (type === 'Fire') return 1;
		},
		onHit: function(target, pokemon) {
			pokemon.addVolatile('charge');
			this.add('-activate', pokemon, 'move: Charge');
		},
		selfBoost: {
			boosts: {
				spd: 1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heat Wave", target);
		},
		target: "normal",
		type: "Fire",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	aquaticambush: {
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		shortDesc: "On the following turn after using this move, Anorith is granted +1 Priority on any Bug-type move used or 50% extra power on any Water-type move used.",
		id: "aquatic ambush",
		name: "Aquatic Ambush",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onHit: function(target, source) {
			source.addVolatile('aquaticambush', source);
			this.add('-activate', source, 'move: Aquatic Ambush', '[of] ' + target);
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 2,
			onModifyPriority: function(priority, pokemon, target, move) {
				if (move && move.type === 'Bug') return priority + 1;
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (move.type === 'Water') {
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (move.type === 'Water') {
					return this.chainModify(1.5);
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "First Impression", target);
		},
		target: "normal",
		type: "Water",
		ZMovePower: 175,
	},
	"tranquillity": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Removes all hazards, screens and stat modifications from all active Pokémon in play, and removes all forms of status from the team, then switches out.",
		shortDesc: "Removes all hazards, screens and stat modifications from all active Pokémon in play, and removes all forms of status from the team, then switches out.",
		id: "tranquillity",
		isViable: true,
		name: "Tranquillity",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			authentic: 1
		},
		selfSwitch: true,
		onPrepareHit: function(source) {
			this.useMove("Defog", source);
			this.useMove("Haze", source);
			this.useMove("Heal Bell", source);
		},
		secondary: false,
		target: "all",
		type: "Flying",
		zMoveEffect: 'healreplacement',
		contestType: "Cool",
	},
	"magneticcharge": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: " At start of the turn, the user charges itself in a really hot plasma courtain, then it heasl 50% of it max HP. If hitted during the charge phase with a contact move, the attacker will be burned (It's a mix between Beak Blast heating phase and a Recover move)",
		shortDesc: "Burns on contact with the user before it moves. Recovers 50% of the total HP",
		id: "magneticcharge",
		isViable: true,
		name: "Magnetic Charge",
		pp: 10,
		priority: -3,
		flags: {
			heal: 1,
			protect: 1
		},
		beforeTurnCallback: function(pokemon) {
			pokemon.addVolatile('magneticcharge');
		},
		effect: {
			duration: 1,
			onStart: function(pokemon) {
				this.add('-singleturn', pokemon, 'move: Magnetic Charge');
			},
			onHit: function(pokemon, source, move) {
				if (move.flags['contact']) {
					source.trySetStatus('brn', pokemon);
				}
			},
		},
		onMoveAborted: function(pokemon) {
			pokemon.removeVolatile('magneticcharge');
		},
		onAfterMove: function(pokemon) {
			pokemon.removeVolatile('magneticcharge');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Recover", source);
		},
		heal: [1, 2],
		secondary: false,
		target: "self",
		type: "Electric",
		zMoveBoost: 'clearnegativeboosts',
		contestType: "Tough",
	},
	"pumpkinflare": {
		accuracy: 100,
		basePower: 20,
		category: "Special",
		shortDesc: "The user bursts its body and fires an array of seeds at the opponent. BP is dependent on form (20 BP for small, 22 BP for medium, 25 BP for large, 30 BP for XL), burn chance is dependent on form (8% for small, 11% for medium, 14% for large, 20% for XL), and amount of hits are based on size (6 for small, 5 for medium, 4 for large, 3 for XL).",
		id: "pumpkinflare",
		name: "Pumpkin Flare",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onBasePower: function(power, user) {
			if (user.template.id === 'pumpkaboo') {
				return this.chainModify(1.1);
			} else if (user.template.id === 'pumpkaboolarge') {
				return this.chainModify(1.25);
			} else if (user.template.id === 'pumpkaboosuper') {
				return this.chainModify(1.5);
			}
		},
		multihit: 6,
		onModifyMove: function(move, user) {
			if (user.template.id === 'pumpkaboo') {
				move.multihit = 5;
				move.secondaries.push({
					chance: 11,
					status: 'brn',
				});
			} else if (user.template.id === 'pumpkaboolarge') {
				move.multihit = 4;
				move.secondaries.push({
					chance: 14,
					status: 'brn',
				});
			} else if (user.template.id === 'pumpkaboosuper') {
				move.multihit = 3;
				move.secondaries.push({
					chance: 20,
					status: 'brn',
				});
			}
		},
		secondary: {
			chance: 8,
			status: 'brn',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ember", target);
		},
		target: "normal",
		type: "Fire",
		zMovePower: 190,
	},
	"aerialsmash": {
		accuracy: 100,
		basePower: 170,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Gust, Hurricane, Sky Uppercut, Smack Down, Thousand Arrows, Thunder, and Twister. If the user is holding a Power Herb, the move completes in one turn. -1 Atk, -1 Def, -1 SpD.",
		shortDesc: "Flies up on first turn, then strikes the next turn. -1 Atk, -1 Def, -1 SpD.",
		id: "aerialsmash",
		name: "Aerial Smash",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			charge: 1,
			protect: 1,
			mirror: 1,
			gravity: 1,
			distance: 1
		},
		onTry: function(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, move.name, defender);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		effect: {
			duration: 2,
			onAccuracy: function(accuracy, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return;
				}
				if (move.id === 'skyuppercut' || move.id === 'thunder' || move.id === 'hurricane' || move.id === 'smackdown' || move.id === 'thousandarrows' || move.id === 'helpinghand') {
					return;
				}
				if (source.hasAbility('noguard') || target.hasAbility('noguard')) {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return 0;
			},
			onSourceModifyDamage: function(damage, source, target, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		selfBoost: {
			boosts: {
				atk: -1,
				def: -1,
				spd: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sky Attack", target);
		},
		target: "any",
		type: "Fighting",
		zMovePower: 150,
		contestType: "Clever",
	},
	"bounceshield": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects from moves. Attacker loses 1/6 max HP.",
		id: "bounceshield",
		isViable: true,
		name: "Bounce Shield",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'bounceshield',
		onTryHit: function (target, source, move) {
			return !!this.willAct() && this.runEvent('StallMove', target);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				source.moveThisTurnResult = true;
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
					this.damage(source.maxhp / 6, source, target);
				return null;
			},
		},
              onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'heal',
		contestType: "Tough",
	},
	"goodtidings": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User switches out, healing the switch-in for half of user's max HP.",
		id: "goodtidings",
		name: "Good Tidings",
		pp: 10,
		priority: 0,
		flags: {
			mirror: 1
		},
		onTryHit: function(pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		selfSwitch: "true",
		sideCondition: 'goodtidings',
		effect: {
			duration: 2,
			onStart: function(side, source) {
				this.debug('goodtidings started on ' + side.name);
				this.effectData.positions = [];
				// @ts-ignore
				for (let i = 0; i < side.active.length; i++) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function(side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn: function(target) {
				const positions = /**@type {boolean[]} */ (this.effectData.positions);
				if (!positions[target.position]) {
					return;
				}
				if (!target.fainted) {
					target.heal(target.maxhp / 2);
					this.add('-heal', target, target.getHealth, '[from] move: Good Tidings');
					positions[target.position] = false;
				}
				if (!positions.some(affected => affected === true)) {
					target.side.removeSideCondition('goodtidings');
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baton Pass", target);
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'healreplacement',
	},
	"searingscreen": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Increases the power of physical and special attacks by 1.33x during 5 turns, but it can be used only during Sun. It lasts 8 if you use Light Clay.",
		id: "searingscreen",
		name: "Searing Screen",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		sideCondition: 'searingscreen',
		onTryHitSide: function() {
			if (!this.field.isWeather(['sunnyday', 'desolateland'])) return false;
		},
		effect: {
			duration: 5,
			durationCallback: function(target, source, effect) {
				if (source && source.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage: function(damage, source, target, move) {
					if (!move.crit && !move.infiltrates) {
						this.debug('searingscreen boost');
						return this.chainModify(1.33);
				}
			},
			onStart: function(side) {
				this.add('-sidestart', side, 'move: Searing Screen');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd: function(side) {
				this.add('-sideend', side, 'move: Searing Screen');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
		secondary: false,
		target: "foeSide",
		type: "type",
		zMoveBoost: {spe: 1},
	},
	"phantasmalbreak": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Damage dealt cannot be restored until switched out.",
		id: "phantasmalbreak",
		name: "Phantasmal Break",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			contact: 1,
			mirror: 1
		},
		volatileStatus: 'phantasmalbreak',
		effect: {
			onStart: function(pokemon) {
				this.add('-start', pokemon, 'move: Phantasmal Break');
			},
			onDisableMove: function(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.getMove(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove: function(pokemon, target, move) {
				if (move.flags['heal']) {
					this.add('cant', pokemon, 'move: Phantasmal Break', move);
					return false;
				}
			},
			onResidualOrder: 17,
			onSwitchOut: function(pokemon) {
				this.add('-end', pokemon, 'move: Phantasmal Break');
			},
			onTryHeal: false,
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Bone", target);
		},
		secondary: false,
		target: "allAdjacentFoes",
		type: "Ghost",
		zMovePower: 160,
	},
	"mineralbath": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the user by 50% of its max HP. If there are Entry Hazards on the users side, they are removed and the user is healed for 2/3 of its max HP",
		id: "mineralbath",
		name: "Mineral Bath",
		pp: 10,
		priority: 0,
		flags: {
			snatch: 1,
			mirror: 1
		},
		onHit: function(pokemon) {
			if (pokemon.side.sideConditions['spikes' || 'toxicspikes' || 'stealthrock' || 'stickyweb']) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		self: {
			onHit: function(pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mineral Bath', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Mineral Bath', '[of] ' + pokemon);
					}
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Refresh", source);
		},
		secondary: false,
		target: "self",
		type: "Water",
		zMoveBoost: {
			def: 1
		},
	},
	"mythicalpower": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Resets the users negative stat changes and boosts Sp.Atk by 2.",
		id: "mythicalpower",
		name: "Mythical Power",
		pp: 10,
		priority: 0,
		flags: {
			snatch: 1
		},
		onHit: function(pokemon) {
			let boosts = {};
			for (let i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					boosts[i] = 0;
					this.boost({
						spa: 2
					});
				}
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Nasty Plot", source);
		},
		secondary: false,
		target: "self",
		type: "Fairy",
		zMoveEffect: 'crit2',
	},
	"eggoverboil": {
		accuracy: 90,
		basePower: 45,
		category: "Special",
		shortDesc: "Hits twice, the first hit has a 50% chance to Soak its foe, and the second hit a 50% chance to burn it.",
		id: "eggoverboil",
		name: "Egg Overboil",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scald", target);
		},
		multihit: 2,
		secondaries: [{
			chance: 15,
			status: 'brn',
		}, {
			chance: 15,
			volatileStatus: 'soak',
		}, ],
		target: "normal",
		type: "Water",
		zMovePower: 175,
	},
	"ancientritual": {
		accuracy: 100,
		basePower: 150,
		category: "Special",
		shortDesc: "Hits four turns after being used. If the opponent is KOed, apply Wish to the current pokemon",
		id: "ancientritual",
		name: "Ancient Ritual",
		pp: 5,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry: function(source, target) {
			target.side.addSideCondition('futuremove');
			if (target.side.sideConditions['futuremove'].positions[target.position]) {
				return false;
			}
			target.side.sideConditions['futuremove'].positions[target.position] = {
				duration: 5,
				move: 'ancientritual',
				source: source,
				moveData: {
					id: 'ancientritual',
					name: "Ancient Ritual",
					accuracy: 100,
					basePower: 150,
					category: "Special",
					priority: 0,
					flags: {},
onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
					ignoreImmunity: false,
					onAfterMoveSecondarySelf: function(pokemon, target) {
						if (!target || target.fainted || target.hp <= 0) pokemon.side.addSideCondition('wish');;
					},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Dragon',
				},
			};
			this.add('-start', source, 'move: Ancient Ritual');
			return null;
		},
onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
		secondary: false,
		target: "normal",
		type: "type",
		zMovePower: 210,
	},
	"manifestdestiny": {
		accuracy: 90,
		basePower: 90,
		basePowerCallback: function(pokemon, target, move) {
			if (pokemon.volatiles.manifestdestiny && pokemon.volatiles.manifestdestiny.hurt) {
				this.debug('Boosted for being damaged this turn');
				return move.basePower * 1.5;
				return move.accuracy = true;
			}
			return move.basePower;
		},
		accuracyCallback: function(pokemon, target, move) {
				if (pokemon.volatiles.manifestdestiny && pokemon.volatiles.manifestdestiny.hurt) {
				return move.accuracy = true;
			}
			return move.accuracy;
		},
		category: "Physical",
		shortDesc: "Deals 50% more damage and never misses if Rufflet is hit on the turn of the attack.",
		id: "manifestdestiny",
		name: "Manifest Destiny",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		beforeTurnCallback: function(pokemon, target) {
			pokemon.addVolatile('manifestdestiny');
			pokemon.volatiles.manifestdestiny.position = target.position;
		},
		effect: {
			duration: 1,
			onFoeAfterDamage: function(damage, target) {
				if (target.position === this.effectData.position) {
					this.debug('damaged this turn');
					this.effectData.hurt = true;
					return move.accuracy = true;
				}
			},
			onFoeSwitchOut: function(pokemon) {
				if (pokemon.position === this.effectData.position) {
					this.effectData.hurt = false;
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Nasty Plot", source);
		},
		secondary: false,
		target: "normal",
		type: "type",
		zMovePower: 170,
	},
	"sporeburst": {
        accuracy: 100,
        basePower: 100,
        category: "Special",
        shortDesc: "Switches out turn 1, hits target turn 2.", // Make the healing work for the teammate
        id: "sporeburst",
        name: "Spore Burst",
        pp: 5,
        priority: 0,
        flags: {protect: 1, mirror: 1},
		  isFutureMove: true,
		  onTry: function (source, target) {
			target.side.addSideCondition('futuremove');
			source.switchFlag = true;
			if (target.side.sideConditions['futuremove'].positions[target.position]) {
				return false;
			}
			target.side.sideConditions['futuremove'].positions[target.position] = {
				duration: 2,
				move: 'sporeburst',
				source: source,
				moveData: {
					id: 'sporeburst',
					name: "Spore Burst",
					accuracy: 100,
					basePower: 100,
					category: "Special",
					priority: 0,
					flags: {},
onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
					drain: [1, 2],
					effectType: 'Move',
					isFutureMove: true,
					type: 'Dark',
				},
			};
			this.add('-start', source, 'move: Spore Burst');
			return null;
		},
        secondary: false,
onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
        target: "normal",
        type: "Dark",
        zMovePower: 190, 
    },
	"divineluster": {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "If the attack is used on an foe, the attack will damage and it'll make 1,5 times more damage, then it removes any negative status. If it targets user or an ally, it's heal 50% of max Health Points and will remove all negative stats",
		id: "divineluster",
		name: "Divine Luster",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onHit: function(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		onBasePowerPriority: 4,
		onBasePower: function(basePower, pokemon) {
			return this.chainModify(1.5);
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dazzling Gleam", target);
		},
		secondary: false,
		target: "normal",
		type: "Fairy",
		zMovePower: 175,
	},
	"injection": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Is Poison or Electric type depending on effectiveness. 66% chance to paralyze or poison the opponent.",
		id: "injection",
		name: "Injection",
		pp: 10,
		priority: 0,
		flags: {
			bite: 1,
			contact: 1,
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 66,
			onHit: function(target, source) {
				let result = this.random(2);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else {
					target.trySetStatus('par', source);
				}
			},
		},
		onModifyMovePriority: 8,
		onModifyMove: function(move, pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (target.hasType('Ghost') || target.hasType('Poison') || target.hasType('Rock') || target.hasType('Steel') && !target.hasType('Ground')) {
					move.type = 'Electric';
				}
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "First Impression", target);
		},
		target: "normal",
		type: "Poison",
		zMovePower: 175,
	},
	"doldrum": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Summons a Delta Stream current turn 1. Raises Attack by one stage and both Defense and Special Defense by two stages turn 2.",
		id: "doldrum",
		isViable: true,
		name: "Doldrum",
		pp: 5,
		priority: 0,
		flags: {charge: 1, nonsky: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Brave Bird", target);
		},
		onTry: function (attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				this.setWeather('deltastream');
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, move.name, defender);
				attacker.removeVolatile(move.id);
				this.setWeather('deltastream');
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		boosts: {
			atk: 2,
			spd: 2,
			def: 2,
		},
		secondary: false,
		target: "self",
		type: "Flying",
		zMoveEffect: 'clearnegativeboost',
	},
	"napalmone": {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		id: "napalmone",
		name: "Napalm",
		pp: 20,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 120,
		contestType: "Clever",
	},
	"napalm": {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Fletchinder sideswipes the target, attaching a glob of napalm to them that detonates at the end of the next turn, dealing 100 physical Dark damage. Fletchinder switches out after the initial attack. The explosion will also trigger if the opponent is burned, a Fire-type, or when hit by a Fire-type attack.",
		id: "napalm",
		name: "Napalm",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		selfSwitch: true,
		isFutureMove: true,
		onTry: function(source, target) {
			target.side.addSideCondition('futuremove');
			this.useMove("napalmone", source);
			source.switchFlag = true;
			if (target.side.sideConditions['futuremove'].positions[target.position]) {
				return false;
			}
			target.side.sideConditions['futuremove'].positions[target.position] = {
				duration: 2,
				move: 'napalm',
				source: source,
				moveData: {
					id: 'napalm',
					name: "Napalm",
					accuracy: 100,
					basePower: 100,
					category: "Physical",
					priority: 0,
					flags: {},
onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Dark',
				},
			};
			this.add('-start', source, 'move: Napalm');
			return null;
		},
		secondary: false,
onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
		target: "normal",
		type: "Dark",
		zMovePower: 100,
	},
	moisturize: {
		basePower: 0,
		accuracy: true,
		category: "Status",
		shortDesc: "Heals 50% of max HP; 67% in Rain; 25% in Sun or Hail",
		id: "moisturize",
		name: "Moisturize",
		pp: 5,
		priority: 0,
		flags: {
			snatch: 1,
			heal: 1
		},
		onHit: function(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland', 'hail'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.25));
			} else if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Shore Up", source);
		},
		target: "self",
		type: "Water",
		zMoveEffect: 'clearnegativeboost',
	},
	"archaicanguish": {
		accuracy: 90,
		basePower: 0,
		damageCallback: function(pokemon, target) {
			return this.clampIntRange(Math.floor(target.hp / 2), 1);
		},
		category: "Special",
		desc: "Deals damage to the target equal to half of its current HP, rounded down, but not less than 1 HP.",
		shortDesc: "Does damage equal to 1/2 target's current HP. Drains half of the damage dealt.",
		id: "archaicanguish",
		isViable: true,
		name: "Archaic Anguish",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			heal: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Fang", target);
		},
		drain: [1, 2],
		secondary: false,
		target: "normal",
		type: "Rock",
		zMovePower: 100,
		contestType: "Tough",
	},
	"draconidfangs": {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Nullifies Detect, Protect, and Quick/Wide Guard.",
		id: "draconidfangs",
		name: "Draconid Fangs",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		breaksProtect: true,
		secondary: false,
		target: "normal",
		type: "Dragon",
		zMovePower: 100,
		contestType: "Clever",
	},
	"gearoverload": {
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		shortDesc: "Hits 1 + X times, where X is the number of stat boosts the user has (à la Stored Power). If this move has hits 6 times or more, it replaces the user's ability with Steelworker before doing damage. If the move hits 11 times or more, it       replaces the user's ability with Huge Power before doing damage.",
		id: "gearoverload",
		name: "Gear Overload",
		pp: 20,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		secondary: false,
		multihit: [1, 1],
		onTryHit: function(target, pokemon) {
			if (pokemon.positiveBoosts() > 4 && pokemon.positiveBoosts() < 9) {
				let oldAbility = pokemon.setAbility('steelworker', pokemon, 'steelworker', true);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Steelworker', oldAbility, '[of] ' + pokemon);
				}
			} else if (pokemon.positiveBoosts() > 9) {
				let oldAbility = pokemon.setAbility('hugepower', pokemon, 'hugepower', true);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Huge Power', oldAbility, '[of] ' + pokemon);
				}
			}
		},
		onModifyMove: function(move, pokemon) {
			if (move.multihit && Array.isArray(move.multihit) && move.multihit.length) {
				move.multihit = pokemon.positiveBoosts() + 1;
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
		target: "normal",
		type: "Steel",
		zMovePower: 160,
	},
	"winterbliss": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Hail.",
		id: "winterbliss",
		isViable: true,
		name: "Winter Bliss",
		pp: 10,
		priority: 0,
		flags: {
			snatch: 1,
			heal: 1
		},
		onHit: function(pokemon) {
			if (this.field.isWeather('hail')) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Shore Up", source);
		},
		secondary: false,
		target: "self",
		type: "Ice",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"rainbowburst": {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "The user calls a rainbow on the user's side of the field, this rainbow doubles the effect of secondary effects taking place (It's the same effect if you mix Water and Fire Pledge). If this rainbow is in the field, this attack has a 30% of chance of dropping target's special defense one level.",
		id: "rainbowburst",
		name: "Rainbow Burst",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onHit: function(target, source, move) {
			target.side.addSideCondition('waterpledge');
		},
		effect: {
			duration: 4,
			onStart: function(targetSide) {
				this.add('-sidestart', targetSide, 'Fire Pledge');
			},
			onEnd: function(targetSide) {
				this.add('-sideend', targetSide, 'Fire Pledge');
			},
			onResidual: function(side) {
				// @ts-ignore
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.hasType('Fire')) {
						this.damage(pokemon.maxhp / 8, pokemon);
					}
				}
			},
		},
		secondary: false,
		onModifyMove: function(move, target) {
			if (move && move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					this.boost({
						spd: -1
					}, target);
				}
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overheat", target);
		},
		target: "normal",
		type: "Fire",
		zMovePower: 120,
	},
	"sundance": {
		accuracy: true,
		basePower: 0,
		damageCallback: function(pokemon) {
			let damage = pokemon.hp;
			return damage;
		},
		category: "Special",
		shortDesc: "User decreases it HP until it's left with one hit point, the exact number of hit points is lot by the foe as well (à la Final Gambit). Sets up Sunny Day, and Boosts user's Special Attack, Special Defense, and Speed by one stage each. Never Misses.",
		id: "sundance",
		name: "Sun Dance",
		pp: 5,
		priority: -5,
		flags: {
			protect: 1,
			mirror: 1
		},
		onHit: function(target, pokemon) {
			pokemon.sethp('1');
			this.add('-sethp', target, target.getHealth, pokemon, pokemon.getHealth, '[from] move: Sun Dance');
		},
		weather: 'sunnyday',
		selfBoost: {
			boosts: {
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Sunny Day", source);
			this.add('-anim', target, "Quiver Dance", source);
		},
		secondary: false,
		target: "normal",
		type: "Fire",
		zMovePower: 180,
	},
	"nuclearpollen": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, all Pokémon on the field are resistant to normally super-effective types and weak to normally not-very-effective or ineffective types (as in Inverse Battles) ",
		id: "nuclearpollen",
		name: "Nuclear Pollen",
		pp: 5,
		priority: 0,
		flags: {
			mirror: 1
		},
		pseudoWeather: 'nuclearpollen',
		effect: {
			duration: 5,
			durationCallback: function(source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 7;
				}
				return 5;
			},
			onStart: function(target, source) {
				this.add('-fieldstart', 'move: Nuclear Pollen', '[of] ' + source);
			},
			onNegateImmunity: false,
			onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
			},
			onResidualOrder: 23,
			onEnd: function() {
				this.add('-fieldend', 'move: Nuclear Pollen');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Sunny Day", source);
		},
		secondary: false,
		target: "all",
		type: "Grass",
		zMoveEffect: 'clearnegativeboost',
	},
	"toxiclips": {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "50% chance to poison the target. Drains 75% of the damage dealt.",
		id: "toxiclips",
		isViable: true,
		name: "Toxic Lips",
		pp: 10,
		priority: 0,
		flags: {
			heal: 1,
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 50,
			status: 'psn',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
		},
		target: "normal",
		drain: [3, 4],
		type: "Poison",
		zMovePower: 160,
		contestType: "Tough",
	},
	"electrophage": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Raises the user's critical hit ratio by 1. Drains 50% of the damage dealt.",
		id: "electrophage",
		name: "Electrophage",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			heal: 1
		},
		self: {
			onModifyCritRatio: function(critRatio) {
				return critRatio + 1;
			},
		},
		ignoreImmunity: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wild Charge", target);
		},
		drain: [1, 2],
		secondary: false,
		target: "normal",
		type: "Electric",
		zMovePower: 175,
		contestType: "Cool",
	},
	"misdirection": {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "Sets up a layer of Spikes, and then attacks the opponent. Switches out after attacking.",
		id: "misdirection",
		isViable: true,
		name: "Misdirection",
		pp: 15,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onTryHit: function(target, source) {
			target.side.addSideCondition('spikes', source);
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		selfSwitch: true,
		target: "normal",
		type: "Dark",
		zMovePower: 120,
		contestType: "Tough",
	},
	"poachandscramble": {
		accuracy: 90,
		basePower: 20,
		category: "Physical",
		shortDesc: "Always hits 6 times, User takes 25% damage inflicted in recoil.",
		id: "poachandscramble",
		name: "Poach and Scramble",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Cross Chop", target);
		},
		multihit: 6,
		recoil: [1, 4],
		secondary: false,
		target: "normal",
		type: "Fighting",
		zMovePower: 140,
		contestType: "Tough",
	},
	"superseed": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Deals damage 2 turns after the move is used, doubles damage dealt if any terrain is in place, changes typing to match the terrain.",
		id: "superseed",
		name: "Superseed",
		pp: 10,
		priority: 0,
		flags: {},
onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry: function(source, target) {
			target.side.addSideCondition('futuremove');
			if (target.side.sideConditions['futuremove'].positions[target.position]) {
				return false;
			}
			target.side.sideConditions['futuremove'].positions[target.position] = {
				duration: 3,
				move: 'superseed',
				source: source,
				moveData: {
					id: 'superseed',
					name: "Superseed ",
					accuracy: 100,
					basePower: 100,
					category: "Special",
					priority: 0,
					flags: {},
					onModifyMove: function(move) {
						switch (this.effectiveTerrain()) {
							case 'electricterrain':
								move.type = 'Electric';
								move.basePower *= 2;
								break;
							case 'psychicterrain':
								move.type = 'Psychic';
								move.basePower *= 2;
								break;
							case 'mistyterrain':
								move.type = 'Fairy';
								move.basePower *= 2;
								break;
							case 'grassyterrain':
								move.type = 'Grass';
								move.basePower *= 2;
								break;
						}
					},
					ignoreImmunity: false,
					effectType: 'Move',
onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
					isFutureMove: true,
					type: 'Psychic',
				},
			};
			this.add('-start', source, 'move: Superseed');
			return null;
		},
		secondary: false,
		onModifyMove: function(move) {
			switch (this.effectiveTerrain()) {
				case 'electricterrain':
					move.type = 'Electric';
					move.basePower *= 2;
					break;
				case 'psychicterrain':
					move.type = 'Psychic';
					move.basePower *= 2;
					break;
				case 'mistyterrain':
					move.type = 'Fairy';
					move.basePower *= 2;
					break;
				case 'grassyterrain':
					move.type = 'Grass';
					move.basePower *= 2;
					break;
			}
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 190,
		contestType: "Clever",
	},
	"acidgeyser": {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Under sun, Acid's Well Base Power is increased by 1,5x and it's able to ignore steel type's inmunity to poison. 10% of chance to add a burn (50% in sun)",
		id: "acidgeyser",
		name: "Acid Geyser",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onBasePowerPriority: 4,
		onBasePower: function(basePower) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onModifyMove: function(move) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				move.ignoreImmunity = true;
				move.secondaries.push({
					chance: 50,
					status: 'brn',
				});
			}
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Wave", target);
		},
		target: "normal",
		type: "Poison",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	"naturecall": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "The user use the power of earth to increase special attack, special defense and speed by two levels on the next turn. When the attack is unleashed, Grassy Terrain is summoned.",
		id: "naturecall",
		isViable: true,
		name: "Nature Call",
		pp: 10,
		priority: 0,
		flags: {
			charge: 1,
			nonsky: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
		terrain: 'grassyterrain',
		onTry: function(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, move.name, defender);
				attacker.removeVolatile(move.id);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		boosts: {
			spa: 2,
			spd: 2,
			spe: 2,
		},
		secondary: false,
		target: "self",
		type: "Grass",
		zMoveBoost: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1
		},
		contestType: "Beautiful",
	},
	"moltenironspout": {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		shortDesc: "Hits all adiacent oppos, independent 40% chance of flinching, burning and/or confusing them.",
		id: "moltenironspout",
		isViable: true,
		name: "Molten Iron Spout",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		secondaries: [{
			chance: 40,
			status: 'brn',
		}, {
			chance: 40,
			volatileStatus: 'flinch',
		}, {
			chance: 40,
			volatileStatus: 'confusion',
		}, ],
		target: "allAdjacentFoes",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash Cannon", target);
		},
		type: "Steel",
		zMovePower: 195,
		contestType: "Cool",
	},
	"nosokinesis": {
        accuracy: 100,
        basePower: 100,
        category: "Special",
        shortDesc: "This move's power is increased by 1,5x if it has a status move, and it transfers the status condition to the enemy. If it transfer the status, the user regains 25% of max HP.",
        id: "nosokinesis",
        name: "Nosokinesis",
        pp: 5,
        priority: 0,
        flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		  onBasePowerPriority: 4,
			onBasePower: function (basePower, pokemon) {
    		if (pokemon.hasMove('thunderwave') || pokemon.hasMove('willowisp') || pokemon.hasMove('toxic')) {
        	return this.chainModify(1.5);
    		}
			},
			onHit: function (target, pokemon) {
    		if (pokemon.status && !target.status && target.trySetStatus(pokemon.status)) {
        pokemon.cureStatus();
        return this.heal(pokemon.maxhp / 4, pokemon, pokemon);
    		} else {
        return false;
    		}
		},
        secondary: false,
        target: "normal",
        type: "Psychic",
        zMovePower: 180,
    },   
};
