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
		zMove: {boost: {def: 1}},
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
			this.add('-anim', source, "Cosmic Power", target);
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
			this.add('-fail', pokemon, 'move: Exhaust');
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
		zMove: {effect: 'clearnegativeboost'},
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
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "The user switches out, if the move fails.",
		name: "Misfire",
		pp: 10,
		priority: 0,
		flags: {protect: 1, bullet: 1, defrost: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
		},
		onMoveFail(target, source, move) {
			for (const side of this.sides) {
					for (const active of side.active) {
						active.switchFlag = false; // only one Pokémon can switch per move
					}
				}
				source.switchFlag = true;
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
		zMove: {effect: 'clearnegativeboost'},
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
			this.add('-anim', source, "Bolt Strike", target);
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
	jetstream: {
		num: -1040,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Usually goes first.",
		name: "Jet Stream",
		pp: 20,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Air Slash", target);
		},		
	},
	sinterstorm: {
		num: -1039,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "User heals 25%. Under Hail, damage is 1.5x and healing is 50%.",
		name: "Sinter Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'hail':
				move.basePower *= 1.5;
				break;
			}
		},
		onHit(target, source) {
			let factor = 0.25;
			if (this.field.isWeather('hail')) {
				   factor = 0.5
				}
			return !!source.heal(this.modify(source.maxhp, factor));
			this.add('-heal', source, source.getHealth, '[from] move: Sinter Storm');
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
	},
	excavation: {
		num: -1041,
		accuracy: 85,
		basePower: 150,
		category: "Physical",
		shortDesc: "User faints. All hazards on the user's side are removed.",
		name: "Excavation",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Steel",
		contestType: "Beautiful",
				onAfterHit(target, pokemon) {
			if (pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Excavation', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const condition of sideConditions) {
				if (pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Excavation', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Excavation', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const condition of sideConditions) {
				if (pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Excavation', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Corkscrew Crash", target);
		},
	},
	hivemind: {
		num: -1060,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "User switches out. Replacement uses the attack.",
		name: "Hive Mind",
		pp: 15,
		priority: 0,
		flags: {}, // removing flags from the first part because it's effectively self-targeting
		onTry(source, target) {
			if (!this.canSwitch(source.side) || source.forceSwitchFlag || source.switchFlag) return false; // fails if the user cannot switch
			if (source.side.addSlotCondition(source, 'hivemind')) { // first Pokémon sets the slot condition
				Object.assign(source.side.slotConditions[source.position]['hivemind'], {
					duration: 3,
					move: 'hivemind',
					moveTarget: target, // preserve selected target for the second hit
					moveData: {
						id: 'hivemind',
						name: "Hive Mind",
						accuracy: 100,
						basePower: 70,
						category: "Special",
						priority: 0,
						flags: {contact: 1, protect: 1, mirror: 1}, // the "real" hit has these qualities
						ignoreImmunity: false,
						effectType: 'Move',
						target: "normal",
						type: 'Bug',
					},
				});
				this.add('-anim', source, "Defend Order", source);
				for (const side of this.sides) {
					for (const active of side.active) {
						active.switchFlag = false; // only one Pokémon can switch per move
					}
				}
				source.switchFlag = true; // switches the user out immediately after setting the volatile
				return null; // first Pokémon switches only; this is in the conditional so the second Pokémon can execute the move fully
			}
		},
		slotCondition: 'hivemind',
		condition: {
			duration: 1, // failsafe: remove at the end of the turn if it hasn't yet taken effect
			onFaint(target) {
				target.side.removeSlotCondition(target, 'hivemind'); // it only has one chance to activate
				// this is so that it can't happen at the end of the turn if the switch-in is KOed
				// otherwise, a Pokémon could use a move after replacements are chosen for the turn, and I don't think that's safe
			},
			onHiveMind(target) {
				if (!target.fainted && this.effectData.moveTarget && this.effectData.moveTarget.isActive) {
					const move = this.dex.getMove(this.effectData.move);
					this.useMove(move, target, this.effectData.moveTarget);
				}
				target.side.removeSlotCondition(target, 'hivemind'); // make sure to remove the slot condition immediately
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attack Order", target);
		},
		secondary: null,
		ignoreImmunity: true, // not that any exist normally, but a good failsafe to make sure the switching part is always possible
		target: "normal", // you should be able to select a target in a double battle, right?
		type: "Bug",
		contestType: "Clever",
	},
	indomitablespirit: {
		num: -1038,
		accuracy: 95,
		basePower: 75,
		category: "Special",
		shortDesc: "Power doubles if last move failed or was resisted.",
		name: "Indomitable Spirit",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.moveLastTurnResult === false) return move.basePower * 2; // if the last move failed
			if (pokemon.volatiles['indomitablespirit'].boost === 'lastMoveResisted') return move.basePower * 2; // if the last move was resisted
			return move.basePower;
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Vacuum Wave", target);
		},
		condition: { // this is *not* meant to be set as part of the move; partially defined in scripts.ts!
			onModifyDamage(damage, source, target, move) {
				if (target.getMoveHitData(move).typeMod < 0) {
					this.effectData.boost = 'thisMoveResisted';
					this.debug('set Indomitable Spirit boost');
				}
			},
			onBeforeMove(pokemon) {
				if (this.effectData.boost === 'thisMoveResisted') {
					this.effectData.boost = 'lastMoveResisted';
				} else {
					this.effectData.boost = null;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	mudsling: {
		num: -1039,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Hits floating targets.",
		name: "Mud Sling",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Ground')) {
				if (target.hasType('Flying')) return 0;
			}
		},
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Beautiful",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Muddy Water", target);
		},
	},
	buildupstrike: {
		num: -1043,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Hits with Sand Tomb on the following turn.",
		name: "Build-Up Strike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 2,
				move: 'sandtomb',
				source: source,
				moveData: {
					id: 'sandtomb',
					name: "Sand Tomb",
					accuracy: 85,
					basePower: 35,
					category: "Physical",
					priority: 0,
					flags: {},
					volatileStatus: 'partiallytrapped',
					secondary: null,
					type: "Ground",
				},
			});
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Tomb", target);
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	curse: { // edited so that it doesn't say the user of Haunting Dance cut its own HP
		inherit: true,
		condition: {
			onStart(pokemon, source, effect) {
				if (effect?.id === 'hauntingdance') {
					this.add('-message', `${pokemon.name} was cursed!`);
					this.add('-start', pokemon, 'Curse', '[silent]');
				} else {
					this.add('-start', pokemon, 'Curse', '[of] ' + source);
				}
			},
			onResidualOrder: 10,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	hauntingdance: {
		num: -1045,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "User's HP 3/4 or more: Spite effect; 1/4 or less: Curse effect.",
		name: "Haunting Dance",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Never-Ending Nightmare", target);
		},
		onModifyMove(move, source, target) {
			move.secondaries = [];
			if (source.hp * 4 <= source.maxhp) {
				move.secondaries.push({
					chance: 100,
					volatileStatus: 'curse',
				});
			} else if (source.hp * 4 >= source.maxhp * 3) {
				move.secondaries.push({
					chance: 100,
					onHit(target) {
						if (!target.hp) return;
						const move = target.lastMove;
						if (!move || move.isZ || move.isMax) return;

						const ppDeducted = target.deductPP(move.id, 4);
						if (!ppDeducted) return;

						this.add('-message', `${move.name} lost 4 of its PP!`);
					},
				});
			}
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
	},
	gravitation: {
		num: -1046,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "Intensifies gravity after use.",
		name: "Gravitation",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			pseudoWeather: 'gravity',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "G-Max Gravitas", target);
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
    contrariety: {
        num: -1050,
        accuracy: true,
        basePower: 0,
        category: "Status",
        name: "Contrariety",
        pp: 15,
        priority: 0,
		onHitField() {
            let success = false;
            for (const pokemon of this.getAllActive()) {
                if (pokemon.ability === 'truant' || pokemon.ability === 'contrary' || pokemon.getAbility().isPermanent) continue;
                const oldAbility = pokemon.setAbility('contrary');
                if (oldAbility) this.add('-ability', pokemon, 'Contrary', '[from] move: Contrary');
                success = true;
            }
            return success;
        },
        secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Torment", target, source);
		},
        target: "all",
        type: "Dark",
        zMove: {boost: {def: 1}},
    },
	poisondrain: {
		num: -1048,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "Restores HP by 50% of damage dealt. 1.5x power on poisoned targets.",
		name: "Poison Drain",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1},
		drain: [1, 2],
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox') {
				return this.chainModify(1.5);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Fang", target);
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	happyfail: {
		num: -1044,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		shortDesc: "Restores the user's HP by 1/16 if it misses.",
		name: "Happy Fail",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Twinkle Tackle", target);
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	anvildrop: {
		num: -1065,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		shortDesc: "Intensifies gravity after use.",
		name: "Anvil Drop",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			pseudoWeather: 'gravity',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Anchor Shot", target);
		},
		target: "normal",
		type: "Steel",
		contestType: "Clever",
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