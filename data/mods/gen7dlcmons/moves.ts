export const Moves: {[k: string]: ModdedMoveData} = {
	noretreat: {
		inherit: true,
		isNonstandard: null,
		gen: 7,
	},
	frostbite: {
		num: -1001,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		desc: "The Pokémon at the user's position steals some of the target's maximum HP at the end of each turn. Damage begins at 1/16, rounded down, and increases each turn like Toxic. If Big Root is held by the recipient, the HP recovered is 1.3x normal, rounded half down. If the target uses Baton Pass, the replacement will continue being leeched. If the target switches out, the effect ends.",
		shortDesc: "Target's HP is restored to user every turn. Damage increases like Toxic.",
		name: "Frostbite",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'frostbite',
		condition: {
			onStart(target) {
			  this.effectData.stage = 0;
				this.add('-start', target, 'move: Frostbite');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
	  		if (this.effectData.stage < 15) {
		  		this.effectData.stage++;
		  	}
				const target = this.effectData.source.side.active[pokemon.volatiles['frostbite'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage, pokemon, target, '[silent]');
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	shedstrike: {
		num: -1002,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		desc: "Damage is calculated using the user's Defense stat as its Attack, including stat stage changes. Other effects that modify the Attack stat are used as normal.",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
		name: "Shed Strike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Last Resort", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	roostercall: {
		num: -1003,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Rooster Call",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		desc: "This move can be used even when the user is asleep. When this move is attempted, all sleeping active Pokémon wake up, including the user.",
		shortDesc: "User may be asleep. All sleeping active Pokémon wake up.",
		sleepUsable: true,
		onTryHit(target) {
			for (const [i, allyActive] of target.side.active.entries()) {
				if (allyActive && allyActive.status === 'slp') allyActive.cureStatus();
				const foeActive = target.side.foe.active[i];
				if (foeActive && foeActive.status === 'slp') foeActive.cureStatus();
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overdrive", target);
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	manifestation: {
		num: -1004,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone. Additionally, this move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
		shortDesc: "Type varies based on primary type. Physical if Atk > Sp. Atk.",
		name: "Manifestation",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	vegetalambush: {
		num: -1005,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 10% chance to make the target flinch.",
		shortDesc: "10% chance to make the target flinch.",
		name: "Vegetal Ambush",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grassy Glide", target);
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	finblade: {
		num: -1006,
		accuracy: 100,
		basePower: 95,
		desc: "This move deals damage to the target based on its Defense instead of Special Defense if the target's Special Defense is greater than or equal to its Defense, including stat stage changes.",
		shortDesc: "Damages based on Def or Sp. Def - whichever is lower on the target.",
		category: "Special",
		defensiveCategory: "Physical",
		name: "Fin Blade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (target.getStat('def', false, true) >= target.getStat('spd', false, true)) move.defensiveCategory = 'Special';
		},
		onHit(target, source, move) {
			this.hint(move.defensiveCategory + " Fin Blade");
		},
		onAfterSubDamage(target, source, move) {
			this.hint(move.defensiveCategory + " Fin Blade");
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Razor Shell", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	flamingdescent: {
		num: -1007,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Until the end of the turn, Flying-type users lose their Flying type and pure Flying-type users become Normal type.",
		shortDesc: "Flying type removed until the turn ends.",
		name: "Flaming Descent",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sacred Fire", target);
		},
		self: {
			volatileStatus: 'roost',
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	wildclaw: {
		num: -1008,
		accuracy: 95,
		basePower: 120,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		name: "Wild Claw",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	helpingsouls: {
		num: -1009,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			move.allies = pokemon.side.pokemon.filter(ally => ally.fainted);
			if (move.allies.length > 1) {
				this.add('-message', `${move.allies.length} souls are helping ${pokemon.name}!`);
			} else if (move.allies.length) {
				this.add('-message', `A soul is helping ${pokemon.name}!`);
			} else {
				this.add('-message', `There are no souls to help ${pokemon.name}!`);
			}
			return move.basePower + (move.allies.length * 20);
		},
		category: "Physical",
		desc: "Power is equal to 60+(X*20), where X is the number of fainted Pokémon in the user's party.",
		shortDesc: "All fainted allies aid in damaging the target.",
		name: "Helping Souls",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poltergeist", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	eternalnightmare: {
		num: -1021,
		accuracy: true,
		basePower: 155,
		category: "Special",
		shortDesc: "Lowers the foe's Atk/Def/SpAtk/SpDef/Spe by 1.",
		name: "Eternal Nightmare",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "plubiumz",
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				def: -1,
				spa: -1,
				spd: -1,
				spe: -1,
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Never-Ending Nightmare", target);
		},
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	stickysoil: {
		num: -1027,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Prevents foe from switching.",
		name: "Sticky Soil",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thousand Waves", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
	},
	astraltackle: {
		num: -1028,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Damages target based on Special Defense, not Def.",
		defensiveCategory: "Special",
		name: "Astral Tackle",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Meteor Mash", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {basePower: 180},
		contestType: "Beautiful",
	},
	gravityhammer: {
		num: -1029,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Removes the target's Ground immunity.",
		name: "Gravity Hammer",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Knock Off", target);
			this.add('-anim', source, "Gravity", target);
		},
		volatileStatus: 'smackdown',
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 180},
		contestType: "Beautiful",
	},
	solventshot: {
		num: -1030,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "10% chance to toxic. Super effective on Steel.",
		name: "Solvent Shot",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: {'Poison': true},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gunk Shot", target);
		},
		secondary: {
			chance: 10,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		zMove: {basePower: 140},
		contestType: "Beautiful",
	},
	exhaust: {
		num: -1031,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals 50% HP. User's Fire type becomes typeless; must be Fire.",
		name: "Exhaust",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1, heal: 1},
		heal: [1, 2],
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Fire')) return;
			this.add('-fail', pokemon, 'move: Burn Up');
			this.attrLastMove('[still]');
			return null;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slack Off", target);
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Burn Up');
			},
		},
		secondary: null,
		target: "self",
		type: "Fire",
		contestType: "Clever",
	},
	refreshingtide: {
		num: -1032,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User and allies: healed 1/4 max HP, status cured.",
		name: "Refreshing Tide",
		pp: 10,
		priority: 0,
		flags: {heal: 1, authentic: 1, mystery: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Life Dew", target);
		},
		secondary: null,
		target: "allies",
		zMove: {effect: 'clearnegativeboost'},
		type: "Water",
	},
	misfire: {
		num: -1033,
		accuracy: 70,
		basePower: 120,
		category: "Physical",
		shortDesc: "The user switches out, if the move misses.",
		name: "Misfire",
		pp: 10,
		priority: 0,
		flags: {protect: 1, bullet: 1, defrost: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	fieldday: {
		num: -1034,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's SpAtk and Spe by 1. The user gains the Grass typing in addition to its existing typing.",
		name: "Field Day",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onHit(target) {
			if (target.hasType('Grass')) return false;
			if (!target.addType('Grass')) return false;
			this.add('-start', target, 'typeadd', 'Grass', '[from] move: Forest\'s Curse');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rototiller", target);
		},
		boosts: {
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	shortcircuit: {
		num: -1035,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		shortDesc: "Lowers the user's Atk by 2.",
		name: "Short Circuit",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wild Charge", target);
		},
		self: {
			boosts: {
				atk: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	quickblitz: {
		num: -1036,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		shortDesc: "Hits first. First turn out only.",
		name: "Quick Blitz",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.activeMoveActions > 1) {
				this.add('-fail', pokemon);
				this.attrLastMove('[still]');
				this.hint("Quick Blitz only works on your first turn out.");
				return null;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Breakneck Blitz", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	draconiccrash: {
		num: -1037,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		name: "Draconic Crash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rush", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Cute",
	},
};