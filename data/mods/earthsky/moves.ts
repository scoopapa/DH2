/*

List of new/edited flags:
bludg: Short for bludgeoning. Power is multiplied by 1.5 when used by a Pokemon with the Bludgeon ability.
bullet: Definition includes pulse and cannon moves. Power is multiplied by 1.3 when used by a Pokemon with the Mega Launcher Ability. Has no effect on Pokemon with the Bulletproof Ability.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Immunity Ability, and Pokemon holding Safety Goggles.
punch: Power is multiplied by 1.3 when used by a Pokemon with the Iron Fist Ability.
sound: Power is multiplied by 1.2 when used by a Pokemon with the Cacophony Ability. Has no effect on Pokemon with the Soundproof Ability.

*/

export const Moves: {[moveid: string]: ModdedMoveData} = {
	/* New Moves */
	aerate: {
		num: 1000,
		basePower: 50,
		accuracy: true,
		category: "Special",
		name: "Aerate",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onTryHit(target, source, move){
			target.side.removeSideCondition('mist');
			target.side.removeSideCondition('auroraveil');
		},
		onHit(target, source, move){
			const veilAbilities = [
				'aromaveil', 'flowerveil', 'pastelveil', 'slumberveil', 'sweetveil', 'waterveil', 'sandveil', 'snowcloak', 'mistyshroud', 'neutralizinggas'
			];
			if(veilAbilities.includes(target.getAbility())) target.addVolatile('gastroacid');
			if(target.volatiles['evade'] && ['snow','sandstorm','mistyterrain'].includes(target.volatiles['evade'].source)){
				target.removeVolatile('evade');
			}
		},
		shortDesc: "Disables Veil Abilities, N-Gas, Aurora Veil, and Mist.",
		desc: "Before hitting the target, Aurora Veil and Mist are removed from its side of the field. After hitting the target, the Abilities Aroma Veil, Flower Veil, Misty Shroud, Neutralizing Gas, Pastel Veil, Sand Veil, Slumber Veil, Snow Cloak, Sweet Veil, and Water Veil are suppressed until it switches out. Evasiveness granted by Sand Veil, Snow Claok, and Misty Shroud is also removed.",
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cute",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Gust");
		},
	},
	ambush: {
		num: 1031,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Ambush",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Power doubles if target switched in this turn.",
		target: "normal",
		type: "Bug",
		contestType: "Clever",
		basePowerCallback(pokemon, target, move) {
			if (!target.activeTurns) {
				this.debug('switch boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Skitter Smack", target);
		},
	},
	applebomb: {
		num: 1039,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Apple Bomb",
		pp: 20,
		priority: 0,
		flags: {protect: 1, bullet: 1},
		onModifyMove(move, pokemon) {
			move.secondaries = [];
			switch(pokemon.getItem().name){
				case 'Tart Apple':
					move.secondaries.push({
						chance: 100,
						boosts: {def: -1},
					});
					break;
				case 'Sweet Apple':
					move.secondaries.push({
						chance: 100,
						boosts: {spd: -1},
					});
					break;
				case 'Syrupy Apple':
					move.secondaries.push({
						chance: 100,
						boosts: {spe: -1},
					});
					break;
			}
			if(move.secondaries.length) return;
			switch(pokemon.baseSpecies.name){
				case 'Flapple':
					move.secondaries.push({
						chance: 100,
						boosts: {def: -1},
					});
					break;
				case 'Appletun':
					move.secondaries.push({
						chance: 100,
						boosts: {spd: -1},
					});
					break;
				case 'Dipplin':
				case 'Hydrapple':
					move.secondaries.push({
						chance: 100,
						boosts: {spe: -1},
					});
					break;
				case 'Fervintill':
					move.secondaries.push({
						chance: 100,
						boosts: {spa: -1},
					});
					break;
				case 'Malaconda':
					move.secondaries.push({
						chance: 100,
						boosts: {atk: -1},
					});
					break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		desc: "If the user is holding a Tart Apple or is Flapple, has a 100% chance to lower the target's Defense by 1 stage. If the user is holding a Sweet Apple or is Appletun, has a 100% chance to lower the target's Special Defense by 1 stage. If the user is holding a Syrupy Apple or is Dipplin or Hydrapple, has a 100% chance to lower the target's Speed by 1 stage. If the user is Fervintill, has a 100% chance to lower the target's Special Attack by 1 stage. If the user is Malaconda, has a 100% chance to lower the target's Attack by 1 stage. Holding an item overrides the species. If none of the above, has no secondary effect.",
		shortDesc: "Lowers a stat by 1 depending on held Apple/user.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grav Apple", target);
		},
	},
	bash: {
		num: 1032,
		basePower: 45,
		accuracy: 100,
		category: "Physical",
		name: "Bash",
		pp: 25,
		priority: 0,
		flags: {bludg: 1, contact: 1, protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "No additional effects.",
		target: "normal",
		type: "Steel",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
	},
	bugcloud: {
		num: 1001,
		basePower: 30,
		accuracy: 100,
		category: "Special",
		name: "Bug Cloud",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "No additional effect.",
		target: "normal",
		type: "Bug",
		contestType: "Cute",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Struggle Bug", target);
		},
	},
	chaoticstorm: {
		num: 1040,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Chaotic Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onBasePower(basePower, pokemon){
			if(['sunnyday', 'desolateland', 'raindance', 'primordialsea'].includes(this.field.effectiveWeather())) return this.chainModify(1.5);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Twister");
		},
		desc: "If the current weather is strong or scorching sunlight or rain or heavy rain, this move's power is multiplied by 1.5.",
		shortDesc: "Power multiplied by 1.5x in sun or rain.",
	},
	cuttinglaser: {
		num: 1042,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Cutting Laser",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Steel Beam", target);
		},
		shortDesc: "No additional effect."
	},
	daydream: {
		num: 1002,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Daydream",
		pp: 30,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		boosts:{
			spa: 1,
		},
		secondary: null,
		desc: "Raises the user's Sp. Attack by 1 stage.",
		shortDesc: "Raises user's Sp. Atk by 1.",
		target: "self",
		type: "Fairy",
		contestType: "Cute",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Amnesia");
		},
	},
	deepbreath: {
		num: 1033,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Deep Breath",
		pp: 30,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		boosts:{
			spd: 1,
		},
		secondary: null,
		desc: "Raises the user's Sp. Defense by 1 stage.",
		shortDesc: "Raises user's Sp. Def by 1.",
		target: "self",
		type: "Normal",
		contestType: "Cute",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bulk Up");
		},
	},
	dustspray: {
		num: 1003,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Dust Spray",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Has a 10% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "10% chance to lower accuracy.",
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sand Attack", target);
		},
	},
	eldritchmight: {
		num: 1043,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Eldritch Might",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ghost",
		contestType: "Cool",
		desc: "Has a 30% chance to lower the target's Speed by 1 stage.",
		shortDesc: "30% chance to lower the foe(s) Speed by 1.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Void", source);
			this.add('-anim', source, "Shadow Ball", target);
		},
	},
	eminence: {
		num: 1004,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Eminence",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			atk: 1,
			spa: 1,
			spd: 1,
		},
		secondary: null,
		desc: "Raises the user's Attack, Sp. Attack, and Sp. Defense by 1 stage.",
		shortDesc: "Raises the user's Attack, Sp. Atk, Sp. Def by 1.",
		target: "self",
		type: "Dragon",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Calm Mind");
		},
	},
	equalizer: {
		num: 1034,
		basePower: 0,
		accuracy: 100,
		category: "Special",
		name: "Equalizer",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHitField(target, source, move) {
			const targets: Pokemon[] = [];
			for (const pokemon of this.getAllActive()) {
				const equalizeData: ActiveMove = {
					name: "Equalize",
					basePower: 0,
					damageCallback(pokemon) {
						return pokemon.maxhp / 2;
					},
					accuracy: 100,
					category: "Special",
					critRatio: 0,
					flags: {protect: 1},
					effectType: 'Move',
					type: 'Normal',
				};
				this.actions.trySpreadMoveHit([pokemon], source, equalizeData);
			}
		},
		secondary: null,
		shortDesc: "Damages all Pokemon equal to half of user's max HP.",
		target: "all",
		type: "Normal",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Judgment");
		},
	},
	escapetunnel: {
		num: 1035,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Escape Tunnel",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		secondary: null,
		selfSwitch: true,
		onTryHit: true,
		slotCondition: 'escapetunnel',
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Escape Tunnel');
			},
			onEntryHazard(pokemon) {
				return null;
			},
			onDamage(damage, target, source, effect){
				if(effect && effect.id === 'firepledge') return false;
			},
			onImmunity(type, pokemon) {
				if (['sandstorm', 'snow'].includes(type)) return false;
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
		},
		target: "self",
		type: "Ground",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dig", source);
		},
		shortDesc: "Switches out with hazard/residual protection this turn.",
		desc: "Switches out. Replacement ignores hazards and residual damage this turn.",
		start: "  [POKEMON] dug a tunnel and escaped!",
	},
	fairyfire: {
		num: 1005,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Fairy Fire",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		desc: "Has a 30% chance to burn the target.",
		shortDesc: "30% chance to burn.",
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mystical Fire", target);
		},
	},
	fallenarrow: {
		num: 1006,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Fallen Arrow",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'slp',
		},
		desc: "Has a 30% chance to cause the target to fall asleep.",
		shortDesc: "30% chance to sleep.",
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spirit Shackle", target);
		},
	},
	fellswoop: {
		num: 1007,
		basePower: 100,
		accuracy: 80,
		category: "Physical",
		name: "Fell Swoop",
		pp: 10,
		priority: 0,
		flags: {contact: 1, gravity: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to flinch.",
		target: "normal",
		type: "Flying",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
			if(!source.canFloat()) return false;
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fly", target);
		},
	},
	fullcollide: {
		num: 1008,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Full Collide",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1},
		beforeTurnCallback(pokemon){
			pokemon.addVolatile('nointerrupt');
		},
		secondary: null,
		desc: "Once it is selected, its execution cannot be interrupted. The Pokemon will ignore sleep, freeze, flinch, Disable, Encore, Imprison, and PP drain to 0 inflicted earlier in the same turn, and bypass the checks for full paralysis, confusion, and attraction if inflicted earlier in the same turn. If given a Choice item earlier in the turn, the move locking will be ignored.",
		shortDesc: "If usable when selected, cannot be interrupted.",
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Skull Bash", target);
		},
	},
	lashout: {
		num: 1009,
		basePower: 80,
		accuracy: 85,
		category: "Physical",
		name: "Lash Out",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Hits all adjacent Pokemon.",
		target: "allAdjacent",
		type: "Fighting",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Brutal Swing", target);
		},
	},
	metaledge: {
		num: 1036,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Metal Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		target: "normal",
		type: "Steel",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Claw", target);
		},
	},
	midnight: {
		num: 1010,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Midnight",
		pp: 5,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'midnight',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('cursedjewel')) {
					return 8;
				}
				return 5;
			},
			onFieldStart(battle, source, effect) {
				//this.add('-fieldstart', 'move: Midnight');
				this.add('-message', "The battlefield became very dark!");
				//Suppression implemented in scripts.ts as edits to sim/field.ts
			},
			onFieldEnd() {
				//this.add('-fieldend', 'move: Midnight');
				this.add('-message', "The darkness disappeared from the field.");
			},
		},
		secondary: null,
		shortDesc: "Summons darkness that suppresses weather/terrain.",
		desc: "Summons supernatural darkness, a field effect that suppresses the effects of weather and terrain. They will not be removed, but their timers will continue to count down, and new weather/terrain cannot be set. The move Flash and the Ability Illuminate will dispel the darkness, and Illuminate will prevent it from being set.",
		target: "all",
		type: "Dark",
		contestType: "Cool",
		fieldstart: "  The battlefield became very dark!",
		fieldend: "  The darkness disappeared from the field.",
		block: "  Nothing happened through the darkness...",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
		},
	},
	mindbend: {
		num: 1011,
		basePower: 30,
		accuracy: 100,
		category: "Physical",
		name: "Mind Bend",
		pp: 40,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'flinch',
		},
		desc: "Has a 10% chance to flinch.",
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Extrasensory", target);
		},
	},
	moltenslag: {
		num: 1012,
		basePower: 80,
		accuracy: 90,
		category: "Special",
		name: "Molten Slag",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Dual-typed Steel and Fire move.",
		desc: "This move is both Steel and Fire typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
		target: "normal",
		type: "Steel",
		twoType: "Fire",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magnet Bomb", target);
		},
	},
	mortalstrike: {
		num: 1037,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Mortal Strike",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Power doubles if target switched in this turn.",
		target: "normal",
		type: "Poison",
		contestType: "Cool",
		basePowerCallback(pokemon, target, move) {
			if (!target.activeTurns) {
				this.debug('switch boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Tail", target);
		},
	},
	napalm: {
		num: 1013,
		basePower: 100,
		accuracy: 75,
		category: "Physical",
		name: "Napalm",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		desc: "Has a 50% chance to burn the target.",
		shortDesc: "50% chance to burn.",
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Burst", target);
		},
	},
	pelletshot: {
		num: 1014,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Pellet Shot",
		pp: 20,
		priority: 1,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: null,
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		target: "normal",
		type: "Fire",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ember", target);
		},
	},
	playdead: {
		num: 1015,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Play Dead",
		pp: 20,
		priority: 4,
		flags: {nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		volatileStatus: 'playdead',
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-start', target, 'move: Play Dead');
				//this.add('-faint', target);
			},
			onEnd(target) {
				this.add('-end', target, 'move: Play Dead');
			}
			//Redirection implemented in scripts.ts as a modification to runMove() and related targeting functions.
		},
		secondary: null,
		shortDesc: "Pretends to faint, causing moves to redirect.",
		desc: "During this turn, moves that targeted this Pokemon will fail to see it as a valid target; in Doubles or Triples Battles, they will redirect as if the Pokemon had fainted. Moves that hit the Pokemon's position (such as spread moves) are unaffected.",
		target: "self",
		type: "Ghost",
		contestType: "Clever",
		end: "  [POKEMON] was playing dead all along!",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Memento");
		},
	},
	pounce: {
		num: 1016,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Pounce",
		pp: 30,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to make the target flinch.",
		shortDesc: "10% chance to flinch.",
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Play Rough", target);
		},
	},
	preheat: {
		num: 1017,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Preheat",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'preheat',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Preheat');
			},
			onRestart(pokemon) {
				this.add('-start', pokemon, 'move: Preheat');
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
					this.debug('preheat boost');
					return this.chainModify(2);
				}
			},
			onMoveAborted(pokemon, target, move) {
				if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && move.id !== 'preheat') {
					pokemon.removeVolatile('preheat');
				}
			},
			onAfterMove(pokemon, target, move) {
				if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && move.id !== 'preheat') {
					pokemon.removeVolatile('preheat');
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Preheat', '[silent]');
			},
		},
		boosts: {
			spa: 1,
		},
		secondary: null,
		desc: "Raises the user's Special Attack by 1 stage. The next time the user uses a Fire-type attack, its power will be doubled.",
		shortDesc: "+1 SpA, user's Fire move next turn 2x power.",
		target: "self",
		type: "Fire",
		contestType: "Cool",
		start: "  [POKEMON] began generating heat!",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy");
		},
	},
	preservation: {
		num: 1046,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Preservation",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		onHit(pokemon){
			let success = false;
			// status
			const returnStatus = pokemon.previousTurnState.status;
			if (pokemon.status !== returnStatus.id) { //if status is different, change it
				success = true;
				this.add('-status', pokemon, returnStatus.id, '[silent]');
				pokemon.status = returnStatus.id;
			} if (returnStatus && (!pokemon.statusState || pokemon.statusState !== returnStatus)) { //had data and current status doesn't match it
				success = true;
				pokemon.statusState = returnStatus;
			} else if (pokemon.statusState) { //didn't have data but current status does
				success = true;
				this.add('-curestatus', pokemon, `${pokemon.status}`, '[silent]');
				delete pokemon.statusState;
			}
			// volatiles
			const affectedStatuses = ['attract','charge','confusion','curse','disable','doubleteam','electrify','encore','flashfire','focusenergy','foresight','gastroacid','imprison','ingrain','laserfocus','leechseed','lockon','magnetrise','minimize','miracleeye','mindreader','nightmare','odorsleuth','partiallytrapped','perishsong','powder','powertrick','preheat','risingchorus','saltcure','shelter','spotlight','stasis','strongpartialtrap','tangledfeet','tarshot','taunt','telekinesis','throatchop','torment','trapped','withering','yawn']; //Volatiles that can be removed manually or with time
 			//const affectedProperties = ['time','duration','counter','stage'];
			for (const volatile of affectedStatuses) {
				const returnVolatile = pokemon.previousTurnState.volatiles[volatile];
				//console.log(volatile + ":");
				//console.log(!!returnVolatile);
				//console.log(!!pokemon.volatiles[volatile]);
				if (returnVolatile) {
					if (pokemon.volatiles[volatile]) { //overwrite volatile data
						success = true;
						pokemon.volatiles[volatile] = returnVolatile;
					} else { //add volatile, not using the function to avoid calling events
						if(['attract', 'blocked', 'meanlooked', 'lockon', 'mindreader', 'partiallytrapped', 'strongpartialtrap', 'trapped'].includes(volatile)){ //don't restore linked effects if the one(s) who set it aren't around
							let stillActive = false;
							for(const setter of returnVolatile.linkedPokemon){
								if(setter.isActive) stillActive = true;
							}
							if(!stillActive) continue;
						}
						success = true;
						this.add('-start', pokemon, returnVolatile.id, '[silent]'); //therefore adding the message manually
						pokemon.volatiles[volatile] = returnVolatile;
					}
				} else if (pokemon.volatiles[volatile]) {
					success = true;
					if(['partiallytrapped', 'strongpartialtrap'].includes(volatile)) this.add('-end', pokemon, pokemon.volatiles[volatile].sourceEffect, '[silent]');
					this.add('-end', pokemon, pokemon.volatiles[volatile].id, '[silent]');
					delete pokemon.volatiles[volatile];
				}
			}
			// boosts
			const returnBoosts = pokemon.previousTurnState.boosts;
			if(returnBoosts) {
				if (!pokemon.boosts || pokemon.boosts !== returnBoosts) {
					success = true;
					for(const boost in returnBoosts){
						if(pokemon.boosts[boost] !== returnBoosts[boost]){
							this.add('-setboost', pokemon, `${boost}`, returnBoosts[boost], '[silent]');
						}
					}
					pokemon.boosts = returnBoosts;
				}
			} else if (pokemon.boosts) {
				delete pokemon.boosts;
				this.add('-clearboost', pokemon, '[silent]');
			}
			// Autotomize
			if (pokemon.previousTurnState.weighthg !== pokemon.weighthg) {
				success = true;
				pokemon.weighthg = pokemon.previousTurnState.weighthg;
				if(pokemon.species.weightkg * 10 === pokemon.weighthg) { //Autotomize used only once, so we're reverting it being shown as applied
					this.add('-end', pokemon, 'Autotomize', '[silent]');
				}
			}
			return success;
		},
		target: "self",
		type: "Psychic",
		contestType: "Clever",
		desc: "The user's set of stat changes, status condition, volatile conditions (including timers), and Autotomize weight reduction is reset to the state it was in at the start of the user's previous turn, or when it was sent out if it has not taken any turns. These changes bypass any effects that would normally prevent them, including Stasis.",
		shortDesc: "Restores boosts/status/volatiles to state at start of user's last turn.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Telekinesis");
		},
	},
	psybubble: {
		//The only way to switch is to set up switchFlag in a move - so things have to be messed with as the move executes to allow it to have two actions doing different things
		num: 1044,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Psy Bubble",
		pp: 5,
		priority: 0, //This is for the actual switch. Battle.getActionSpeed refers only to this number, so it has to be the one that gets inserted
		flags: {nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		onModifyPriority(priority, pokemon, target, move){ //Move protection up to proper priority
			if(!pokemon.volatiles['slipaway']) return 4;
		},
		onPrepareHit(pokemon) { //Regular protection check
			this.attrLastMove('[still]');
			if(!pokemon.volatiles['slipaway']){
				if(this.runEvent('StallMove', pokemon)){
					this.add('-anim', pokemon, "Defense Curl");
					return true;
				}
				return false;
			}
		},
		onHit(pokemon, move) {
			if(pokemon.volatiles['slipaway']){ //Second part - switch
				pokemon.activeMoveActions--;
				pokemon.switchFlag = true;
				pokemon.removeVolatile('protect');
			} else { //First part - protect
				if(pokemon.addVolatile('slipaway')){
					pokemon.addVolatile('protect'); //Protection is seperate so that it will still switch if broken
					pokemon.addVolatile('stall');
					this.queue.insertChoice({choice: 'move', pokemon: pokemon, move: this.dex.moves.get('psybubble')}, true); //Adds switch event
				}
			}
		},
		secondary: null,
		shortDesc: "Protects from attacks, then switches out.",
		desc: "Applies protection at +4 Priority. The Pokemon will switch out when it would take a regular turn at +0 Priority. The switch will still occur if the protection is broken, but if the switch fails, the Pokemon is no longer protected.",
		target: "self",
		type: "Psychic",
		contestType: "Clever",
		start: "  [POKEMON] wrapped itself in a bubble!",
		end: "  [POKEMON] popped the bubble and escaped!",
	},
	rebound: {
		num: 1018,
		basePower: 0,
		accuracy: true,
		category: "Physical",
		name: "Rebound",
		pp: 10,
		priority: 4,
		flags: {snatch: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		onTryHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			this.add("-start", pokemon, 'move: Rebound');
			pokemon.addVolatile('rebound');
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			noCopy: true,
			onTryHitPriority: 2,
			onTryHit(target, source, move) {
				if(target === this.effectState.target){
					const damage = this.actions.getDamage(source, target, move);
					if(!damage) return;
					this.add('-activate', target, 'move: Rebound');
					const reboundData: ActiveMove = {
						name: "Rebounded",
						basePower: 0,
						damage: damage,
						accuracy: true,
						category: move.category,
						critRatio: 0,
						flags: {protect: 1},
						effectType: 'Move',
						type: '???',
					};
					this.actions.trySpreadMoveHit([source], target, reboundData);
					target.removeVolatile('rebound');
					return this.NOT_FAIL;
				}
			},
			onEnd(pokemon){
				this.add('-end', pokemon, 'move: Rebound', '[silent]');
			}
		},
		secondary: null,
		shortDesc: "Reflects damage from an attack this turn.",
		desc: "The first damaging attack to hit this Pokemon this turn has its damage reflected to the attacker. The full calculation is run, and then the damage is applied as fixed damage to the attacker. All other effects of the move are ignored. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move or any of the moves Bunker Down, Detect, Endure, King's Shield, Obstruct, Protect, Play Dead, Quick Guard, Silk Trap, Slip Away, Spiky Shield, or Wide Guard is used successfully. X resets to 1 if any of these moves fail or was broken. Fails if the user moves last this turn.",
		target: "self",
		type: "Normal",
		contestType: "Clever",
		start: "  [POKEMON] puffed up!",
		activate: "  The attack bounced back!",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bide", target);
		},
	},
	rejuvenate: {
		num: 1019,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Rejuvenate",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		desc: "The user restores 1/2 of its maximum HP, rounded half up. Non-volatile status conditions are cured.",
		shortDesc: "Heals 50% and cures status.",
		target: "self",
		type: "Grass",
		contestType: "Cute",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Synthesis");
			this.add('-anim', source, "Refresh");
		},
	},
	restorelife: {
		num: 1045,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Restore Life",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		slotCondition: 'restorelife',
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectState.hp = source.maxhp / 2;
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[silent]');
					}
					target.cureStatus();
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Grass",
		contestType: "Beautiful",
		desc: "At the end of the next turn, the Pokemon at the user's position has 1/2 of the user's maximum HP restored to it, rounded down, and its non-volatile status condition will be cured. Fails if this move is already in effect for the user's position.",
		shortDesc: "Next turn, 50% of user's max HP restored, cures status.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Geomancy");
		},
	},
	risingchorus: {
		num: 1020,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Rising Chorus",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'telekinesis',
		},
		desc: "After dealing damage, the target is made unable to avoid any attacks made against it, other than OHKO moves, for the next three turns as long as it remains active. During the effect, the target is also immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability for the next three turns. If the target uses Baton Pass, the replacement will gain the effect. Gravity, Smack Down, and an Iron Ball will remove this status if the user is under any of their effects. The effect will not be applied if the user is under the effects of Gravity or Ingrain, or if the user's Ability is Heavy Metal or Suction Cups. While floating in this manner, the moves Dig, Dive, Ingrain, and Roost will fail.",
		shortDesc: "Hits adjacent foes. Targets float, moves can't miss them.",
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Uproar", target);
		},
	},
	sandblast: {
		num: 1041,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Sand Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon){
			if(['sunnyday', 'desolateland', 'sandstorm'].includes(this.field.effectiveWeather())) return this.chainModify(1.5);
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sand Attack", target);
		},
		desc: "If the current weather is strong or scorching sunlight or a sandstorm, this move's power is multiplied by 1.5.",
		shortDesc: "Power multiplied by 1.5x in sun or sand.",
	},
	slipaway: {
		//The only way to switch is to set up switchFlag in a move - so things have to be messed with as the move executes to allow it to have two actions doing different things
		num: 1021,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Slip Away",
		pp: 5,
		priority: 0, //This is for the actual switch. Battle.getActionSpeed refers only to this number, so it has to be the one that gets inserted
		flags: {nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		onModifyPriority(priority, pokemon, target, move){ //Move protection up to proper priority
			if(!pokemon.volatiles['slipaway']) return 4;
		},
		onPrepareHit(pokemon) { //Regular protection check
			if(!pokemon.volatiles['slipaway']){
				if(this.runEvent('StallMove', pokemon)){
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Acid Armor");
					return true;
				}
				return false;
			}
		},
		onHit(pokemon, move) {
			if(pokemon.volatiles['slipaway']){ //Second part - switch
				pokemon.activeMoveActions--;
				pokemon.switchFlag = true;
				pokemon.removeVolatile('protect');
			} else { //First part - protect
				if(pokemon.addVolatile('slipaway')){
					pokemon.addVolatile('protect'); //Protection is seperate so that it will still switch if broken
					pokemon.addVolatile('stall');
					this.queue.insertChoice({choice: 'move', pokemon: pokemon, move: this.dex.moves.get('slipaway')}, true); //Adds switch event
				}
			}
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Slip Away');
			},
			onSwitchOut(pokemon){
				this.add('-end', pokemon, 'move: Slip Away');
			}
		},
		secondary: null,
		shortDesc: "Protects from attacks, then switches out.",
		desc: "Applies protection at +4 Priority. The Pokemon will switch out when it would take a regular turn at +0 Priority. The switch will still occur if the protection is broken, but if the switch fails, the Pokemon is no longer protected.",
		target: "self",
		type: "Poison",
		contestType: "Clever",
		start: "  [POKEMON] coated itself in slime!",
		end: "  [POKEMON] shed its slime and escaped!",
	},
	smite: {
		num: 1022,
		basePower: 100,
		accuracy: 100,
		category: "Special",
		name: "Smite",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
		target: "normal",
		type: "Electric",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fly");
			this.add('-anim', target, "Thunder");
		},
	},
	snowtumble: {
		num: 1023,
		basePower: 120,
		accuracy: 70,
		category: "Physical",
		name: "Snow Tumble",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		desc: "Has a 30% chance to freeze the target.",
		shortDesc: "30% chance to freeze.",
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Ball", target);
		},
	},
	stasis: {
		num: 1024,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Stasis",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1},
		volatileStatus: 'stasis',
		condition:{
			duration: 3,
			onStart(pokemon){
				this.effectState.affectedStatuses = ['confusion','disable','electrify','encore','imprison','laserfocus','leechseed','magnetrise','minimize','nightmare','partiallytrapped','perishsong','powertrick','protosynthesis','quarkdrive','risingchorus','strongpartialtrap','taunt','telekinesis','throatchop','torment','yawn'], //Volatiles that can be removed manually or with time
				this.effectState.noStart = ['autotomize','aquaring','attract','bide','bunkerdown','charge','curse','destinybond','doubleteam','endure','evade','flashfire','focusenergy','followme','foresight','grudge','ingrain','kingsshield','lockon','magiccoat', 'miracleeye','mindreader','obstruct','odorsleuth','playdead','powder','preheat','protect','ragepowder','rebound','saltcure','shelter','slipaway','snatch','spikyshield','spotlight','substitute','tangledfeet','tarshot','withering'], //Volatiles that can't be added, but either have no duration or have to be removable to prevent breaking things/being broken
				this.add('-start', pokemon, 'move: Stasis');
			},
			onChangeBoost(boost, pokemon) {
				boost = {};
				this.add('-fail', pokemon, 'move: Stasis');
				return false;
			},
			onSetStatus(status, pokemon) {
				this.add('-fail', pokemon, 'move: Stasis');
				return false;
			},
			onRemoveStatus(status, pokemon) {
				this.add('-fail', pokemon, 'move: Stasis');
				return false;
			},
			onTryAddVolatile(volatile, pokemon) {
				if(pokemon.volatiles['stasis'].affectedStatuses.includes(volatile.id) || pokemon.volatiles['stasis'].noStart.includes(volatile.id)){
					this.add('-fail', pokemon, 'move: Stasis');
					return false;
				}
			},
			onTryRemoveVolatile(volatile, pokemon) { //This doesn't actually work for some reason
				//console.log("Stasis checking " + volatile);
				if(pokemon.volatiles['stasis'].affectedStatuses.includes(volatile)){
					this.add('-fail', pokemon, 'move: Stasis');
					return false;
				}
			},
			//Type-change immunity implemented in scripts.ts as an edit to pokemon.setType().
			//Locks on other timers implemented in scripts.ts as an edit to battle.residualEvent(), and in conditions.ts as edits to sleep and freeze.
			onEnd(pokemon){
				this.add('-end', pokemon, 'move: Stasis');
			}
		},
		secondary: null,
		shortDesc: "Locks in status and stat changes for 3 turns.",
		desc: `For the next three turns, the target's stats cannot be raised or lowered, and its type cannot be altered in any way. If the target is frozen or asleep, the duration timers will pause, as will the duration timers of many of its volatile status conditions. Any statuses that can be affected also cannot be added, changed, or removed through any means other than switching. Affected volatile statuses are:
		Confusion, Disable, Electrify, Encore, Imprison, Laser Focus, Leech Seed, Magnet Rise, Minimize, Nightmare, Partial Trapping, Perish Song, Power Trick, Protosynthesis, Quark Drive, Rising Chorus, Taunt, Telekinesis, Throat Chop, Torment, Yawn
		Additionally, the following volatile statuses cannot be added to the target:
		Aqua Ring, Attraction, Bunker Down, Charge, Curse, Destiny Bond, Endure, Evasiveness, Flash Fire, Focus Energy, Follow Me, Foresight, Grudge, Ingrain, Magic Coat, Miracle Eye, King's Shield, Lock-On, Miracle Eye, Mind Reader, Obstruct, Odor Sleuth, Play Dead, Powder, Preheat, Protect, Psy Bubble, Rage Powder, Rebound, Shelter, Slip Away, Snatch, Spiky Shield, Spotlight, Substitute, Tar Shot
		If possible, these statuses will still fade on their own.`,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		start: "  [POKEMON]'s body has been locked in time!",
		fail: "  [POKEMON]'s condition remained in stasis!",
		end: "  [POKEMON]'s body returned to normal.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Telekinesis", target);
		},
	},
	swing: {
		num: 1025,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			const item = pokemon.getItem();
			if (item && !pokemon.ignoringItem() && !item.consumable) {
				this.debug("Swing power increase for held item");
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		accuracy: 100,
		category: "Physical",
		name: "Swing",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		desc: "If the user is holding an item that cannot be consumed, this move's power is multiplied by 1.5.",
		shortDesc: "Power x1.5 if holding non-consumable item.",
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slam", target);
		},
	},
	terrify: {
		num: 1038,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Terrify",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			def: -2,
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		desc: "Lowers the target's Defense by 2 stages.",
		shortDesc: "Lowers the target's Defense by 2.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Shade", target);
		},
	},
	tidalwave: {
		num: 1026,
		basePower: 120,
		accuracy: 80,
		category: "Physical",
		name: "Tidal Wave",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Hits adjacent foes.",
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Earthquake");
			this.add('-anim', source, "Surf", target);
		},
	},
	tussle: {
		num: 1027,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Tussle",
		pp: 30,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to make the target flinch.",
		shortDesc: "10% chance to flinch.",
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tackle", target);
		},
	},
	underflame: {
		num: 1028,
		basePower: 0,
		accuracy: 50,
		category: "Special",
		name: "Under Flame",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		desc: "Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 50)%, and fails if the target is at a higher level. Fire-type Pokemon and Pokemon with the Sturdy Ability are immune.",
		shortDesc: "OHKOs non-Fire targets. Fails if user's lower level.",
		ohko: 'Fire',
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Will-O-Wisp", target);
		},
	},
	vitaldrain: {
		num: 1029,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Vital Drain",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up.",
		shortDesc: "Heals for 50% damage dealt.",
		target: "normal",
		type: "Bug",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leech Life", target);
		},
	},
	whitewater: {
		num: 1030,
		basePower: 45,
		accuracy: 100,
		category: "Physical",
		name: "White Water",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "No additional effects.",
		target: "normal",
		type: "Water",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Surf", target);
		},
	},
	withering: {
		num: 1047,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Withering",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Withering');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Ghost', 'Fairy']) ? 4 : 8));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Withering');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'withering',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		desc: "Causes damage to the target equal to 1/8 of its maximum HP (1/4 if the target is Ghost or Fairy type), rounded down, at the end of each turn during effect. This effect ends when the target is no longer active.",
		shortDesc: "Deals 1/8 max HP each turn; 1/4 on Ghost, Fairy.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Ball", target);
			this.add('-anim', source, "Hex", target);
		},
	},
	/* Edited Moved */
	absorb: {
		inherit: true,
		basePower: 25,
	},
	accelerock: {
		inherit: true,
		pp: 30,
		contestType: "Tough",
	},
	acupressure: {
		inherit: true,
		pp: 10,
		onHit(target) {
			const worstStat = target.getWorstStat(true, true);
			this.boost({[worstStat]: 2}, target);
		},
	},
	aeroblast: {
		inherit: true,
		accuracy: 100,
	},
	agility: {
		inherit: true,
		pp: 20,
	},
	aircutter: {
		inherit: true,
		accuracy: 100,
	},
	airslash: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		desc: "Has a 20% chance to make the target flinch.",
		shortDesc: "20% chance to make the target flinch.",
	},
	alluringvoice: {
		inherit: true,
		basePower: 70,
		desc: "Has a 100% chance to confuse the target if it had a stat stage raised since the beginning of its last turn.",
		shortDesc: "100% to confuse target with stat raise since last turn.",
	},
	allyswitch: {
		inherit: true,
		stallingMove: null,
		desc: "The user swaps positions with its ally on the opposite side of the field. Fails if there is no Pokemon at that position, if the user is the only Pokemon on its side, or if the user is in the middle.",
		shortDesc: "Switches position with the ally on the far side.",
	},
	anchorshot: {
		inherit: true,
		pp: 10,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps target for 4 turns.",
		isNonstandard: null,
	},
	aquastep: {
		inherit: true,
		basePower: 70,
		pp: 15,
		contestType: "Beautiful",
	},
	aquatail: {
		inherit: true,
		flags: {bludg: 1, contact: 1, protect: 1, mirror: 1},
	},
	aromaticmist: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.effectiveTerrain(pokemon) === 'mistyterrain') move.boosts = {spd: 2};
		},
		target: "allies",
		desc: "Raises allies' Special Defense by 1 stage. If the terrain is Misty Terrain, this move will raise allies' Special Defense by 2 stages.",
		shortDesc: "Raises allies' Sp. Def by 1; 2 in Misty Terrain.",
	},
	astralbarrage: {
		inherit: true,
		basePower: 110,
		accuracy: 85,
		contestType: "Cool",
	},
	attackorder: {
		inherit: true,
		target: "any",
		basePower: 95,
		critRatio: 1,
		pp: 10,
		shortDesc: "No additional effect.",
	},
	aurasphere: {
		inherit: true,
		flags: {bullet: 1, protect: 1, mirror: 1, distance: 1},
	},
	aurorabeam: {
		inherit: true,
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		desc: "Has a 30% chance to lower the target's Attack by 1 stage.",
		shortDesc: "30% chance to lower the target's Attack by 1.",
	},
	autotomize: {
		inherit: true,
		pp: 10,
		boosts: {
			spe: 3,
		},
		onTryHit(pokemon) {
			if(pokemon.volatiles['stasis']) return false;
			if(pokemon.weighthg === 1) return false;
			const hasContrary = pokemon.hasAbility('contrary');
			if ((!hasContrary && pokemon.boosts.spe === 6) || (hasContrary && pokemon.boosts.spe === -6)) {
				return false;
			}
		},
		isNonstandard: null,
		desc: "Raises the user's Speed by 3 stages and reduces the user's weight by 100 kg as long as it remains active; this effect is stackable. If the user's Speed cannot be increased or its weight cannot be decreased, both parts of the move will fail.",
		shortDesc: "Raises the user's Speed by 3; user loses 100 kg. Both fail if either does.",
	},
	avalanche: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	auroraveil: {
		inherit: true,
		pp: 10,
	},
	barbbarrage:{
		inherit: true,
		target: "allAdjacentFoes",
		secondary: {
			chance: 30,
			status: 'tox',
		},
		contestType: "Cool",
		desc: "Has a 30% chance to badly poison the target.",
		shortDesc: "30% chance to badly poison foe(s).",
	},
	barrage: {
		inherit: true,
		basePower: 30,
		accuracy: 80,
		pp: 10,
		isNonstandard: null,
	},
	barrierbash: {
		num: 828,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Barrier Bash",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon){
			pokemon.addVolatile('nointerrupt');
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cute",
		desc: "Once it is selected, its execution cannot be interrupted. The Pokemon will ignore sleep, freeze, flinch, Disable, Encore, Imprison, and PP drain to 0 inflicted earlier in the same turn, and bypass the checks for full paralysis, confusion, and attraction if inflicted earlier in the same turn. If given a Choice item earlier in the turn, the move locking will be ignored.",
		shortDesc: "If usable when selected, cannot be interrupted.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psyshield Bash", target);
		},
	},
	beatup: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			return 10 + Math.floor(move.allies!.shift()!.species.baseStats.atk / 10);
		},
		desc: "Hits one time for the user and one time for each unfainted Pokemon without a non-volatile status condition in the user's party. The power of each hit is equal to 10+(X/10), where X is each participating Pokemon's base Attack; each hit is considered to come from the user.",
	},
	bide: {
		inherit: true,
		condition: {
			duration: 2,
			onLockMove: 'bide',
			onStart(pokemon) {
				this.effectState.totalDamage = 0;
				this.add('-start', pokemon, 'move: Bide');
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, move) {
				if (!move || move.effectType !== 'Move' || !source) return;
				this.effectState.totalDamage += damage;
				this.effectState.lastDamageSource = source;
			},
			onBeforeMove(pokemon, target, move) {
				if (this.effectState.duration === 1) {
					this.add('-end', pokemon, 'move: Bide');
					target = this.effectState.lastDamageSource;
					if (!target || !this.effectState.totalDamage) {
						this.attrLastMove('[still]');
						this.add('-fail', pokemon);
						return false;
					}
					if (!target.isActive) {
						const possibleTarget = this.getRandomTarget(pokemon, this.dex.moves.get('pound'));
						if (!possibleTarget) {
							this.add('-miss', pokemon);
							return false;
						}
						target = possibleTarget;
					}
					const moveData: Partial<ActiveMove> = {
						id: 'bide' as ID,
						name: "Bide",
						accuracy: true,
						damage: this.effectState.totalDamage * 2,
						category: "Physical",
						priority: 1,
						flags: {contact: 1, protect: 1},
						effectType: 'Move',
						type: 'Normal',
					};
					this.tryMoveHit(target, pokemon, moveData as ActiveMove);
					return false;
				}
				this.add('-activate', pokemon, 'move: Bide');
			},
			onMoveAborted(pokemon) {
				pokemon.removeVolatile('bide');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Bide', '[silent]');
			},
		},
		isNonstandard: null,
		desc: "The user spends this turn locked into this move. On the turn after using this move, the user attacks the last Pokemon that hit it, inflicting double the damage in HP it lost to attacks during that turn. If the last Pokemon that hit it is no longer active, the user attacks a random opposing Pokemon instead. If the user is prevented from moving during this move's use, the effect ends. This move does not check accuracy and does not ignore type immunity.",
		shortDesc: "Waits one turns; deals double the damage taken.",
	},
	bind: {
		inherit: true,
		basePower: 20,
		volatileStatus: 'strongpartialtrap',
		desc: "Prevents the target from switching out for two turns (three turns if the user is holding Grip Claw). Causes damage to the target equal to 1/4 of its maximum HP (1/3 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target a lot for 2 turns.",
	},
	bite: {
		inherit: true,
		basePower: 50,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to make the target flinch.",
		shortDesc: "10% chance to make the target flinch.",
	},
	bitterblade: {
		inherit: true,
		basePower: 80,
		flags: {protect: 1, mirror: 1, heal: 1},
		contestType: "Clever",
	},
	blastburn: {
		inherit: true,
		flags: {bullet: 1, recharge: 1, protect: 1, mirror: 1},
	},
	blazekick: {
		inherit: true,
		basePower: 90,
		accuracy: 100,
	},
	blazingtorque: {
		inherit: true,
		basePower: 100,
		accuracy: 90,
		flags: {protect: 1, defrost: 1},
		isNonstandard: null,
		noSketch: null,
		contestType: "Cool",
	},
	blizzard: {
		inherit: true,
		secondary: {
			chance: 30,
			status: 'frz',
		},
		desc: "Has a 30% chance to freeze the target. If the weather is Snow, this move does not check accuracy.",
		shortDesc: "30% chance to freeze foe(s). Can't miss in snow.",
	},
	block: {
		inherit: true,
		onHit(target, source, move) {
			return target.addVolatile('blocked', source, move, 'trapper');
		},
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). Damaging switch moves, Escape Plan, and a held Eject Button or Eject Pack will fail to make the target leave the field as well. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Psy Bubble, Slip Away, or Teleport. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Traps the target for 4 turns, ability/item/damage switch fails.",
	},
	bodyslam: {
		inherit: true,
		basePower: 80,
	},
	boltbeak: {
		inherit: true,
		basePower: 60,
		isNonstandard: null,
		contestType: "Cool",
	},
	boneclub: {
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		isNonstandard: null,
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to make the target flinch.",
	},
	bonerush: {
		inherit: true,
		accuracy: 100,
	},
	bonemerang: {
		inherit: true,
		accuracy: 85,
		ignoreImmunity: {'Ground': true},
		isNonstandard: null,
		shortDesc: "Hits two times in one turn. Can hit floating foe.",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. This move ignores immunity to Ground moves, treating the Flying-type as neutrally effective.",
	},
	bounce: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (!attacker.canFloat()){
				this.attrLastMove('[still]');
				return false;
			}
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceBasePower(basePower, target, source, move) {
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "Has a 30% chance to paralyze the target. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Hurricane, Smack Down, Thousand Arrows, Thunder, and Twister, which have doubled power when used against it. If the user is holding a Power Herb, the move completes in one turn.",
	},
	brickbreak: {
		inherit: true,
		basePower: 80,
	},
	bugbite: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
		onHit(target, source) { //change here sets lastItem for Recycle/Pickup
			const item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				target.lastItem = item;
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Bug Bite', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
					if (item.id === 'leppaberry') target.staleness = 'external';
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		desc: "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately, gaining its effects even if the user's item is being ignored.",
	},
	bulletseed: {
		inherit: true,
		accuracy: 90,
		pp: 10,
	},
	bullfight: {
		num: 873,
		name: "Bullfight",
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
		desc: "If the user is a breed of Paldean Tauros, this move's type changes to match: Fire type for Blaze Breed, and Water type for Aqua Breed.",
		shortDesc: "Type depends on user's form.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Raging Bull", target);
		},
	},
	burnup: {
		inherit: true,
		power: 140,
		self: {
			onHit(pokemon) {
				if(pokemon.hasAbility('turboblaze')) return;
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Burn Up');
			},
		},
		desc: "Fails unless the user is a Fire type. If this move is successful and the user's Ability isn't Turboblaze, the user's Fire type becomes typeless as long as it remains active.",
		isNonstandard: null,
	},
	captivate: {
		num: 445,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Captivate",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			spa: -2,
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
		desc: "Lowers the target's Special Attack by 2 stages.",
		shortDesc: "Lowers the target's Sp. Atk by 2",
		isNonstandard: null,
	},
	chargebeam: {
		inherit: true,
		basePower: 40,
		secondary: {
			chance: 100,
			boosts: {
				spa: 1,
			},
		},
		desc: "Raises the user's Special Attack by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk by 1.",
	},
	chloroblast: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (pokemon.moveThisTurnResult != null && move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Chloroblast'), true);
			}
		},
		contestType: "Cool", 
		desc: "If this move is successful, the user loses 1/2 of its maximum HP, rounded up.",
		shortDesc: "User loses 50% max HP after hit.",
	},
	clamp: {
		inherit: true,
		basePower: 35,
		accuracy: 85,
		volatileStatus: 'strongpartialtrap',
		isNonstandard: null,
		desc: "Prevents the target from switching out for two turns (three turns if the user is holding Grip Claw). Causes damage to the target equal to 1/4 of its maximum HP (1/3 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target a lot for 2 turns.",
	},
	coil: {
		inherit: true,
		pp: 10,
	},
	combattorque: {
		inherit: true,
		accuracy: 90,
		flags: {protect: 1},
		isNonstandard: null,
		noSketch: null,
	},
	cometpunch: {
		inherit: true,
		basePower: 20,
		accuracy: 100,
		isNonstandard: null,
	},
	completeshock: {
		num: 892,
		name: "Complete Shock",
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Electric')) return;
			this.add('-fail', pokemon, 'move: Double Shock');
			this.attrLastMove('[still]');
			return null;
		},
		self: {
			onHit(pokemon) {
				if(pokemon.hasAbility('teravolt')) return;
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Electric" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Double Shock');
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Double Shock", target);
		},
		desc: "Fails unless the user is an Electric type. If this move is successful and the user's Ability isn't Teravolt, the user's Electric type becomes typeless as long as it remains active.",
		shortDesc: "User's Electric type: typeless; must be Electric.",
	},
	confusion: {
		inherit: true,
		basePower: 40,
	},
	constrict: {
		inherit: true,
		basePower: 30,
		isNonstandard: null,
	},
	conversion: {
		inherit: true,
		pp: 20,
	},
	conversion2: {
		inherit: true,
		pp: 20,
		onHit(target, source) {
			if (!target.lastMove) {
				return false;
			}
			const attackType = target.lastMove.type;
			const bestType = this.getBestEffectiveness(source, attackType, true);
			if (!source.setType(bestType)) return false;
			this.add('-start', source, 'typechange', bestType);
		},
		desc: "The user's typing changes to the type that has the best advantage over the type (after modifications) of the last move used by the target. It will prioritize any type that is immune to the move, followed by types that are doubly resistant, then normally resistant, then neutral to the move. If multiple types are possible after any of these choices, it will prioritize types that are super effective against that type. If multiple types are still possible, it will prioritize types matching any of the user's damaging moves. Fails if the target has not made a move, if the user cannot change its type, or if this move would only be able to select the user's current type.",
		shortDesc: "Changes user's type to have best advantage to target's last move.",
	},
	coreenforcer: {
		num: 687,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Core Enforcer",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
		desc: "The target's Ability is rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the target is behind a substitute, or if the target's Ability is As One, Comatose, Commander, Disguise, Gulp Missile, Hadron Engine, Ice Face, Multitype, Orichalcum Pulse, Power Construct, Protosynthesis, Quark Drive, Rage Mode, RKS System, Schooling, Shields Down, Stance Change, Stoneskin, Zen Mode, or Zero to Hero, this effect does not happen; with any of the mentioned Abilities, receiving the effect through Baton Pass ends it immediately.",
		shortDesc: "Nullifies the target's Ability unless a substitute is hit.",
		isNonstandard: null,
	},
	cottonspore: {
		inherit: true,
		pp: 20,
	},
	crabhammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	crosschop: {
		inherit: true,
		accuracy: 90,
		pp: 10,
	},
	crushclaw: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
	},
	crushgrip: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			return Math.floor(Math.floor((160 * (100 * Math.floor(target.hp * 4096 / target.maxhp)) + 2048 - 1) / 4096) / 100) + 40;
		},
		desc: "Power is equal to 160 * (target's current HP / target's maximum HP) + 40, rounded half down, but not less than 1.",
	},
	curse: {
		inherit: true,
		//Targeting fix if Ghost type is gained mid-turn implemented in scripts.ts as an edit to useMoveInner().
		target: "normal",
	},
	cut: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
		pp: 10,
		willCrit: true,
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or Shelter or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always results in a critical hit.",
		isNonstandard: null,
	},
	darkpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, mirror: 1, distance: 1},
	},
	darkvoid: {
		inherit: true,
		accuracy: 80,
		onTryMove(pokemon, target, move) { //onAccuracy would be a more appropriate function, but this doubles as overwriting the Darkrai check.
			if(target.side.active.length > 1){
				move.accuracy = 50;
			}
		},
		desc: "Causes the target to fall asleep. In Doubles and Triples Battles, this move's accuracy lowers to 50%.",
		shortDesc: "Causes the foe(s) to fall asleep. 2v2/3v3: 50% acc.",
		noSketch: null,
	},
	defendorder: {
		inherit: true,
		target: "anyAlly",
		onPrepareHit(target, source, move) {
			if(target === source) return;
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attack Order", target);
			this.add('-anim', target, "Defend Order");
		},
		desc: "Raises target's Defense and Special Defense by 1 stage.",
		shortDesc: "Raises user's or ally's Def and Sp. Def by 1 stage.",
	},
	defog: {
		inherit: true,
		flags: {protect: 1, mirror: 1, bypasssub: 1, wind: 1, mustpressure: 1},
		onHitField(target, source, move) {
			const enemySide = source.side.foe;
			let success = false;
			for (const mon of enemySide.active) {
				if (!mon.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1}, mon);
			}
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb',
			];
			for (const targetCondition of removeTarget) {
				if (enemySide.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', enemySide, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		target: "all",
		desc: "Lowers all enemies' evasion by 1 stage, excepting enemies that are hiding behind substitutes. The effects of Reflect, Light Screen, Aurora Veil, Safeguard, Mist, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the target's side, and the effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side.",
		shortDesc: "Enemy -1 evasion, clears screens, all hazards.",
	},
	detect: {
		inherit: true,
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon) && this.runEvent('EvadeStallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('evade');
			pokemon.addVolatile('stall');
			pokemon.addVolatile('evadestall');
		},
		desc: "The user is protected from most attacks made by other Pokemon during this turn. This move has a 1/X chance of being successful, where X starts at 1 and triples each time a protective move is successfully used. X resets to 1 if this move fails, if the user's last move used wasn't a protective move, or if the user's protection was broken. The user also gains Evasiveness during this time. While Evasive, moves that target the user will fail accuracy checks to hit it, unless they ignore the condition. This move has an additional 1/X chance of being successful, where X starts at 1 and triples each time Evasiveness is successfully gained. X resets to 1 if the user was not Evasive last turn.",
		shortDesc: "Protects from and evades attacks this turn.",
	},
	diamondstorm: {
		inherit: true,
		accuracy: 100,
	},
	dig: {
		inherit: true,
		basePower: 90,
		onTryMove(attacker, defender, move) {
			if(!attacker.isGrounded() && !(attacker.hasType('Flying') || attacker.hasAbility('levitate'))) return false;
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'snow') return false;
			},
			onInvulnerability(target, source, move) {
				if (['earthquake', 'magnitude','bulldoze','dig','fissure'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['earthquake', 'magnitude','bulldoze','dig'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Bulldoze, Dig, Earthquake, Fissure, and Magnitude; these moves also have their damage doubled. The user is also unaffected by weather and loses floating status while undergrund. If the user is holding a Power Herb, the move completes in one turn.",
	},
	direclaw: {
		basePower: 90,
		pp: 10,
		secondary: {
			chance: 30,
			onHit(target, source, move) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source, move);
				} else if (result === 1) {
					target.trySetStatus('par', source, move);
				} else {
					target.trySetStatus('slp', source, move);
				}
			},
		},
		contestType: "Clever",
		desc: "Has a 30% chance to cause the target to either fall asleep, become poisoned, or become paralyzed.",
		shortDesc: "30% chance to sleep, poison, or paralyze target.",
	},
	dive: {
		inherit: true,
		basePower: 90,
		onTryMove(attacker, defender, move) {
			if(!attacker.isGrounded() && !(attacker.hasType('Flying') || attacker.hasAbility('levitate'))) return false;
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'snow') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool', 'dive', 'muddywater', 'tidalwave'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['surf', 'whirlpool', 'dive', 'muddywater', 'tidalwave'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Dive, Muddy Water, Surf, Tidal Wave, and Whirlpool; these moves also deal double damage. The user is also unaffected by weather and loses its floating status while underwater. If the user is holding a Power Herb, the move completes in one turn.",
	},
	doublehit: {
		inherit: true,
		basePower: 40,
		pp: 15,
	},
	doubleironbash: {
		inherit: true,
		secondary: {},
		isNonstandard: null,
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits two times in one turn.",
		contestType: "Tough",
	},
	doubleslap: {
		inherit: true,
		accuracy: 100,
		pp: 20,
		isNonstandard: null,
	},
	doubleteam: {
		inherit: true,
		boosts: null,
		onPrepareHit(pokemon) {
			if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
				return false;
			}
			return this.runEvent('EvadeStallMove', pokemon);
		},
		onHit(pokemon){
			this.add('-start', pokemon, 'move: Double Team');
		},
		volatileStatus: 'doubleteam',
		condition: {
			onStart(pokemon){
				pokemon.addVolatile('evadestall');
			},
			onBeforeMove(pokemon){
				pokemon.volatiles['evadestall'].duration = 2; //Holds evasion counter while effect is active. 
			},
			onAccuracy(accuracy, target, source, move) {
				if(['allAdjacentFoes','allAdjacent','all'].includes(move.target)){
					target.removeVolatile('doubleteam');
					move.spreadHit = true;
					return;
				}
				if(!move.ignoreEvasion && typeof move.accuracy === 'number'){
					target.removeVolatile('doubleteam');
					return false;
				}
			},
			onEnd(pokemon){
				this.add('-end', pokemon, 'move: Double Team', '[silent]');
			}
		},
		desc: "When used, the user becomes Evasive. While Evasive, moves that target the user will fail accuracy checks to hit it, unless they ignore the condition. This move has a 1/X chance of being successful, where X starts at 1 and triples each time Evasiveness is successfully gained. X resets to 1 if the user was not Evasive last turn. When a move misses the user due to this conditon, Double Team ends. Moves that target multiple positions will end Double Team before hitting the user; however, doing so will cause them to have their damage reduced by 25% as if they had truly hit multiple targets.",
		shortDesc: "Causes the next single-target move to miss.",
		start: "  [POKEMON] made a shadow double!",
		end: "  [POKEMON]'s shadow double vanished!",
	},
	dragondarts: {
		inherit: true,
		pp: 5,
		contestType: "Cute",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. In Double or Triple Battles, this move attempts to hit the targeted Pokemon and a random adjacent ally once each. If hitting one of these Pokemon would be prevented by immunity, protection, semi-invulnerability, an Ability, or accuracy, it attempts to hit another eligible Pokemon instead; if none exists, the other Pokemon will be targeted twice. If this move is redirected, it hits that target twice.",
		shortDesc: "Hits twice. Doubles/Triples: Tries to hit two foes.",
	},
	dragonenergy: {
		inherit: true,
		pp: 5,
		contestType: "Beautiful",
	},
	dragonhammer: {
		inherit: true,
		basePower: 95,
		pp: 10,
		flags: {bludg: 1, contact: 1, protect: 1, mirror: 1},
	},
	dragonpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, mirror: 1, distance: 1},
	},
	dragonrush: {
		inherit: true,
		accuracy: 80,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to flinch.",
	},
	dragontail: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	drillpeck: {
		inherit: true,
		critRatio: 2,
		shortDesc: "High critical hit ratio.",
	},
	drillrun: {
		inherit: true,
		accuracy: 100,
		pp: 20,
	},
	drumbeating: {
		inherit: true,
		accuracy: 100,
		secondary:{
			chance: 50,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 50% chance to lower the target's Speed by 1 stage.",
		shortDesc: "50% chance to lower the target's Speed by 1.",
		contestType: "Tough",
	},
	dynamaxcannon: {
		inherit: true,
		flags: {bullet: 1, protect: 1},
		contestType: "Beautiful",
	},
	dynamicpunch: {
		inherit: true,
		basePower: 120,
	},
	echoedvoice: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['echoedvoice'] || move.hit === 1) {
				pokemon.addVolatile('echoedvoice');
			}
			return this.clampIntRange(move.basePower * pokemon.volatiles['echoedvoice'].multiplier, 1, 160);
		},
		onTry() {},
		condition: {
			duration: 2,
			onStart() {
				this.effectState.multiplier = 1;
			},
			onRestart() {
				if (this.effectState.multiplier < 4) {
					this.effectState.multiplier <<= 1;
				}
				this.effectState.duration = 2;
			},
		},
		desc: "Power doubles with each successful hit, up to a maximum of 160 power. The power is reset if this move misses or another move is used.",
		shortDesc: "Power doubles with each hit, up to 160.",
	},
	eerieimpulse: {
		inherit: true,
		accuracy: 85,
		target: 'allAdjacentFoes',
		shortDesc: "Lowers foe(s) Sp. Atk by 2.",
	},
	eggbomb: {
		inherit: true,
		basePower: 95,
		accuracy: 100,
		isNonstandard: null,
	},
	electroweb: {
		inherit: true,
		accuracy: 90,
	},
	embargo: {
		num: 373,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Embargo",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onHit(target, source){
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Embargo', '[of] ' + source);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
		desc: "Removes the target's item. This move cannot cause Pokemon with the Sticky Hold Ability to lose their held item or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, a Silvally, a Zacian, or a Zamazenta to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, Memory, Rusted Sword, or Rusted Shield, respectively.",
		shortDesc: "Removes target's item.",
		enditem: "  [POKEMON] had its [ITEM] confiscated!",
		isNonstandard: null,
	},
	energyblade: {
		num: 875,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Energy Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		twoType: "Electric",
		shortDesc: "Dual-typed Psychic and Electric move.",
		desc: "This move is both Psychic and Electric typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psyblade");
		},
	},
	explosion: {
		inherit: true,
		basePower: 300,
	},
	extrasensory: {
		inherit: true,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		desc: "Has a 20% chance to make the target flinch.",
		shortDesc: "20% chance to flinch.",
	},
	facade: {
		inherit: true,
		onBasePower(basePower, pokemon) {
			if (pokemon.status) {
				return this.chainModify(2);
			}
		},
		desc: "Power doubles if the user is burned, paralyzed, poisoned, or asleep. The physical damage halving effect from the user's burn is ignored.",
		shortDesc: "Power doubles if burned/poisoned/paralyzed/asleep.",
	},
	fairylock: {
		inherit: true,
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-fieldactivate', 'move: Fairy Lock');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onHit(target, source, move) { //Damaging moves won't switch
				if(move.selfSwitch && target !== source && !source.volatiles['substitute'] && !source.hasItem('shedshell') && !source.hasAbility('runaway')) delete move.selfSwitch;
			},
			onAfterMoveSecondaryPriority: -100,
			onAfterMoveSecondary(target, source, move) { //Items and custom Abilities won't switch
				if(target !== source){
					if(source.switchFlag && !source.volatiles['substitute'] && !source.hasItem('shedshell') && !source.hasAbility('runaway')){
						this.add('-fail', target, '[from] move: Fairy Lock');
						source.switchFlag = false;
						return null;
					}
					if(target.switchFlag && !source.volatiles['substitute'] && !target.hasItem('shedshell') && !target.hasAbility('runaway')){
						this.add('-fail', target, '[from] move: Fairy Lock');
						source.switchFlag = false;
						return null;
					}
				}
			},
			onEmergencyExit(target) { //Escape Plan/Deep Terror won't switch
				if(!target.hasItem('shedshell')){
					target.switchFlag = false;
					return false;
				}
			},
		},
		desc: "Prevents all active Pokemon from switching next turn. Damaging switch moves, Escape Plan, and a held Eject Button or Eject Pack will fail to make any Pokemon leave the field as well. A Pokemon can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Psy Bubble, Slip Away, or Teleport. Fails if the effect is already active.",
		shortDesc: "Traps everyone until end of next turn, ability/item/damage switch fails.",
		fail: "  [TARGET]'s exit was blocked!",
	},
	fakeout: {
		inherit: true,
		volatileStatus: 'flinch',
		secondary: null,
		desc: "Makes the target flinch; this is not considered a secondary effect and is not removed by Sheer Force or Shield Dust/Covert Cloak. Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first and flinches. Only works on first turn out.",
	},
	falsesurrender: {
		inherit: true,
		basePower: 85,
		priority: -1,
		shortDesc: "This move does not check accuracy. Goes last.",
		contestType: "Tough",
	},
	featherdance: {
		inherit: true,
		accuracy: 85,
		target: 'allAdjacentFoes',
		shortDesc: "Lowers foe(s) Attack by 2.",
	},
	ficklebeam: {
		num: 907,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 10 * move.hit + 10;
		},
		category: "Special",
		name: "Fickle Beam",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 4,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Dragon",
		desc: "Hits four times. Power increases by 10 for each hit after the first. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability or is holding Loaded Dice, this move will always hit four times.",
		shortDesc: "Hits 4 times. Each hit can miss, but power rises.",
	},
	firefang: {
		inherit: true,
		accuracy: 100,
	},
	firelash: {
		inherit: true,
		secondary:{
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 50% chance to lower the target's Defense by 1 stage.",
		shortDesc: "50% chance to lower the target's Defense by 1.",
		contestType: "Beautiful",
	},
	firepledge: {
		inherit: true,
		onModifyMove(move) {
			if (move.sourceEffect === 'waterpledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
			}
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Grass';
				move.forceSTAB = true;
				move.sideCondition = 'firepledge';
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Fire Pledge');
			},
			onSideEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (pokemon && pokemon.isGrounded() && !pokemon.hasType('Fire') && !('safeguard' in targetSide.sideConditions)) {
						this.damage(pokemon.baseMaxhp / 8, pokemon);
					}
				}
				this.add('-sideend', targetSide, 'Fire Pledge');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (pokemon && pokemon.isGrounded() && !pokemon.hasType('Fire') && !('safeguard' in targetSide.sideConditions)) {
						this.damage(pokemon.baseMaxhp / 8, pokemon);
					}
				}
			},
		},
		desc: "If one of the user's allies chose to use Grass Pledge or Water Pledge this turn, the slower Pokemon will takes its turn immediately after the faster one; the faster Pledge will do nothing and the slower one will have 150 BP, obtain STAB regardless of the user's type, and set a secondary effect. If combined with Grass Pledge, a sea of fire appears on the target's side for 4 turns, which causes damage to grounded non-Fire types equal to 1/8 of their maximum HP, rounded down, at the end of each turn during effect, including the last turn. If combined with Water Pledge, a rainbow appears on the user's side for 4 turns, which doubles secondary effect chances and stacks with the Serene Grace Ability, except effects that cause flinching can only have their chance doubled once. This move does not consume the user's Fire Gem.",
	},
	fishiousrend: {
		inherit: true,
		basePower: 60,
		isNonstandard: null,
		contestType: "Tough",
	},
	flameburst: {
		inherit: true,
		onHit(target, source, move) {
			if (target.side.active.length === 1) {
				return;
			}
			for (const ally of target.adjacentAllies()) {
				if (ally) {
					const burstData: ActiveMove = {
						name: "Burst",
						basePower: 60,
						accuracy: true,
						category: "Special",
						critRatio: 0,
						flags: {protect: 1},
						effectType: 'Move',
						type: move.type,
					};
					this.actions.trySpreadMoveHit([ally], source, burstData);
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			//console.log("Flame Burst exploding on a Substitute");
			if (target.side.active.length === 1) {
				return;
			}
			for (const ally of target.adjacentAllies()) {
				if (ally) {
					const burstData: ActiveMove = {
						name: "Burst",
						basePower: 60,
						accuracy: true,
						category: "Special",
						critRatio: 0,
						flags: {protect: 1},
						effectType: 'Move',
						type: move.type,
					};
					this.actions.trySpreadMoveHit([ally], source, burstData);
				}
			}
		},
		onMoveFail(target, source, move){ //Checks for protection to explode on the shield
			//console.log("Flame Burst checking for shields");
			let blocked = false;
			for (const effectid of ['bunkerdown', 'kingsshield', 'obstruct', 'protect', 'silktrap', 'spikyshield']) {
				if (target.volatiles[effectid]){
					blocked = true;
				}
			}
			//if(blocked) console.log("Flame Burst does see a shield");
			//else console.log("Flame Burst does not see a shield");
			if(blocked && target.side.active.length > 1){
				//console.log("Flame Burst exploding on shield");
				for (const ally of target.adjacentAllies()) {
					if (ally) {
						const burstData: ActiveMove = {
							name: "Burst",
							basePower: 60,
							accuracy: true,
							category: "Special",
							critRatio: 0,
							flags: {protect: 1},
							effectType: 'Move',
							type: move.type,
						};
						this.actions.trySpreadMoveHit([ally], source, burstData);
					}
				}
			}
		},
		isNonstandard: null,
		desc: "If this move successfully hits the target (even if it protected itself), the target's adjacent allies are hit by a Fire-type Special move with 60 base power.",
	},
	flash: {
		inherit: true,
		onHit(target, source){
			let success = false;
			if('midnight' in this.field.pseudoWeather){
				this.field.removePseudoWeather('midnight');
				success = true;
			}
			if (!target.volatiles['substitute'] || move.infiltrates){
				success = !!this.boost({accuracy: -1});
				if(target.volatiles['twoturnmove'] && !target.volatiles['skydrop']){
					if (target.removeVolatile('dig') || target.removeVolatile('dive') || 
					target.removeVolatile('fly') || target.removeVolatile('bounce') || 
					target.removeVolatile('phantomforce') || target.removeVolatile('shadowforce')) {
						//Note: The move will miss normally; this is for No Guard, Lock-On, and Mind Reader, since they ignore semi-invulnerability.
						this.queue.cancelMove(target);
					}
					target.removeVolatile('twoturnmove');
					success = true;
					this.add('cant', target, 'move: Flash [of] ' + source);
				}
				if(target.volatiles['focuspunch']){
					target.volatiles['focuspunch'].lostFocus = true;
					success = true;
					this.add('cant', target, 'move: Flash [of] ' + source);
				}
			}
			return success;
		},
		boosts: {},
		target: "allAdjacentFoes",
		isNonstandard: null,
		desc: "Lowers the target's accuracy by 1 stage and disrupts the execution of Focus Punch and moves that spend a turn charging, unless it is hiding behind a substitute. Supernatural darkness is lifted from the battlefield.",
		shortDesc: "Foe(s)' acc -1. Disrupts charging, removes Midnight.",
		cant: "  [POKEMON] lost concentration on its move!",
	},
	flashcannon: {
		inherit: true,
		pp: 15,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's Special Defense by 1.",
		shortDesc: "20% chance to lower the target's Sp. Def by 1.",
	},
	flatter: {
		inherit: true,
		flags: {reflectable: 1, mirror: 1, allyanim: 1},
	},
	fleurcannon: {
		inherit: true,
		flags: {bullet: 1, protect: 1},
	},
	floralhealing: {
		inherit: true,
		pp: 5,
		target: "adjacentAllyOrSelf",
		desc: "The target restores 1/2 of its maximum HP, rounded half up. If the terrain is Grassy Terrain, the target instead restores 2/3 of its maximum HP, rounded half down. IF any other terrain is set, the target instead restores 1/4 of its maximum HP, rounded half down.",
		shortDesc: "Heals user or ally by a terrain-dependent amount.",
		contestType: "Beautiful",
	},
	flowershield: {
		inherit: true,
		pp: 20,
		boosts: {
			def: 1,
		},
		onModifyMove(move, pokemon) {
			if (this.field.effectiveTerrain(pokemon) === 'grassyterrain') move.boosts = {def: 2};
		},
		onHitField: null,
		target: "allies",
		isNonstandard: null,
		desc: "Raises allies' Defense by 1 stage. If the terrain is Grassy Terrain, this move will raise allies' Defense by 2 stages.",
		shortDesc: "Raises allies' Defense by 1; 2 in Grassy Terrain.",
	},
	flowertrap: {
		num: 870,
		accuracy: true,
		basePower: 60,
		category: "Physical",
		name: "Flower Trap",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities. This move does not check accuracy.",
		shortDesc: "Always results in a critical hit; no accuracy check.",
	},
	fly: {
		inherit: true,
		accuracy: 100,
		onTryMove(attacker, defender, move) {
			if (!attacker.canFloat()){
				this.attrLastMove('[still]');
				return false;
			}
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Hurricane, Smack Down, Thousand Arrows, Thunder, and Twister; these moves will have doubled power when used against it. If the user is holding a Power Herb, the move completes in one turn.",
	},
	flyingpress: {
		num: 560,
		accuracy: 90,
		basePower: 80,
		pp: 10,
		category: "Physical",
		priority: 0,
		secondary: null,
		onPrepareHit(target, source, move){
			if (!source.canFloat()) return false;
		},
		name: "Flying Press",
		target: "any",
		type: "Fighting",
		twoType: "Flying",
		contestType: "Tough",
		shortDesc: "Both Fighting and Flying types.",
		desc: "This move is both Fighting and Flying typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
	},
	followme: {
		inherit: true,
		flags: {noassist: 1, failcopycat: 1, snatch: 1},
	},
	forcepalm: {
		inherit: true,
		pp: 20,
	},
	foresight: {
		num: 193,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Foresight",
		pp: 40,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		volatileStatus: 'foresight',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Foresight');
			},
			onModifyMovePriority: -5,
			onModifyMove(move) {
				move.ignoreEvasion = true;
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Fighting'] = true;
					move.ignoreImmunity['Normal'] = true;
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Clever",
		desc: "As long as the user remains active, its moves can't be made to miss due to Evasiveness, and its Normal- and Fighting-type attacks can hit Ghost type Pokemon.",
		shortDesc: "User ignores Ghost immunities and Evasiveness.",
		start: "  [POKEMON] identified its surroundings!",
		isNonstandard: null,
	},
	forestscurse: {
		inherit: true,
		onHit(target) {
			let succeeded = false;
			const targetTypes = target.getTypes();
			if ((targetTypes.length > 1 && targetTypes[1] === "Grass") || targetTypes.join() === "Grass") return false;
			if (targetTypes[0] === "Grass"){ //Due to above line, this is true only if the target is dual-typed
				if (target.setType("Grass")) succeeded = true;
			} else {
				if (target.setType([targetTypes[0],"Grass"]), true) succeeded = true;
			}
			if (succeeded) this.add('-start', target, 'typechange', target.getTypes().join('/'), '[from] move: Forest\'s Curse');
			else {
				this.add('-fail', target);
				return null;
			}
		},
		shortDesc: "Changes the target's secondary type to Grass.",
		desc: "The target's second typing is replaced with the Grass type. If the target's first typing is Grass and it has a second typing, it will become pure Grass. If the target is already a pure Grass-type or has Grass as a second typing, the move fails.",
	},
	frostbreath: {
		inherit: true,
		accuracy: 100,
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or Shelter or has the Battle Armor or Shell Armor Abilities.",
	},
	furyattack: {
		inherit: true,
		basePower: 25,
	},
	furycutter: {
		inherit: true,
		accuracy: 100,
	},
	furyswipes: {
		inherit: true,
		basePower: 20,
		accuracy: 90,
		pp: 20,
	},
	gigatonhammer: {
		inherit: true,
		flags: {protect: 1, mirror: 1, bludg: 1},
		basePower: 140,
		contestType: "Tough",
	},
	glaciallance: {
		inherit: true,
		accuracy: 80,
	},
	glaciate: {
		inherit: true,
		basePower: 100,
		accuracy: 85,
	},
	glaiverush: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Glaive Rush', '[silent]');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onAccuracy() {
				return true;
			},
			onSourceModifyDamage() {
				return this.chainModify(2);
			},
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug('removing Glaive Rush drawback before attack');
				pokemon.removeVolatile('glaiverush');
			},
		},
		contestType: "Cool",
		desc: "If this move is successful, moves targeted at the user deal double damage and do not check accuracy until the user's next turn. The user also cannot switch next turn.",
		shortDesc: "Next turn: Trapped, enemy moves 2x damage and sure-hit.",
	},
	glare: {
		inherit: true,
		pp: 10,
	},
	grasspledge: {
		inherit: true,
		onModifyMove(move) {
			if (move.sourceEffect === 'waterpledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.sideCondition = 'grasspledge';
			}
			if (move.sourceEffect === 'firepledge') {
				move.type = 'Fire';
				move.forceSTAB = true;
				move.sideCondition = 'firepledge';
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Grass Pledge');
			},
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Grass Pledge');
			},
			onModifySpe(spe, pokemon) {
				if(pokemon.isGrounded()){
					return this.chainModify(0.5);
				}
			},
		},
		desc: "If one of the user's allies chose to use Water Pledge or Fire Pledge this turn, the slower Pokemon will takes its turn immediately after the faster one; the faster Pledge will do nothing and the slower one will have 150 BP, obtain STAB regardless of the user's type, and set a secondary effect. If combined with Water Pledge, a swamp appears on the target's side for 4 turns, which halves the Speed of all grounded Pokemon on that side. If combined with Fire Pledge, a sea of fire appears on the target's side for 4 turns, which causes damage to grounded non-Fire types equal to 1/8 of their maximum HP, rounded down, at the end of each turn during effect, including the last turn. This move does not consume the user's Grass Gem.",
	},
	grasswhistle: {
		inherit: true,
		accuracy: 70,
		isNonstandard: null,
	},
	grassyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id)) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onFieldStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onAfterMoveSecondary(target, source, move){
				if(['firespin', 'firepledge', 'inferno', 'searingshot', 'napalm', 'burnup', 'overheat', 'blastburn'].includes(move.id)){
					target.side.addSideCondition('firepledge');
					this.field.clearTerrain();
				}
				if(['whirlpool', 'waterpledge', 'muddywater', 'surf', 'originpulse', 'tidalwave', 'hydrocannon', 'waterspout'].includes(move.id)){
					target.side.addSideCondition('grasspledge');
					this.field.clearTerrain();
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
		desc: "For 5 turns, the terrain becomes Grassy Terrain. During the effect, the power of Grass-type attacks used by grounded Pokemon is multiplied by 1.3, the power of Bulldoze, Earthquake, and Magnitude used against grounded Pokemon is multiplied by 0.5, and grounded Pokemon have 1/16 of their maximum HP, rounded down, restored at the end of each turn, including the last turn. Camouflage transforms the user into a Grass type, Nature Power becomes Energy Ball, and Secret Power becomes Grass type and has a 30% chance to cause sleep. If a Pokemon uses Hydro Cannon, Origin Pulse, Muddy Water, Surf, Water Pledge, Water Spout, Whirlpool, or Tidal Wave, a swamp appears on the target's side for 4 turns, which halves the Speed of all grounded Pokemon on that side. If a Pokemon uses Blast Burn, Burn Up, Fire Spin, Fire Pledge, Inferno, Napalm, Overheat, or Searing Shot, a sea of fire appears on the target's side for 4 turns, which causes damage to grounded non-Fire types equal to 1/8 of their maximum HP, rounded down, at the end of each turn during effect, including the last turn. In both cases, the terrain returns to normal. Fails if the current terrain is Grassy Terrain.",
	},
	growl: {
		inherit: true,
		pp: 30,
	},
	gyroball: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
	},
	hammerarm: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, bludg: 1},
	},
	hardpress: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			return Math.floor(Math.floor((80 * (100 * Math.floor(target.hp * 4096 / target.maxhp)) + 2048 - 1) / 4096) / 100) + 40;
		},
		desc: "Power is equal to 80 * (target's current HP / target's maximum HP) + 40, rounded half down, but not less than 1.",
	},
	healblock: {
		inherit: true,
		flags: {mirror: 1, mustpressure: 1},
		volatileStatus: null,
		sideCondition: 'healblock',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Heal Block', '[of] ' + source, '[persistent]');
				} else {
					this.add('-sidestart', side, 'move: Heal Block', '[of] ' + source);
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal']) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onSideResidualOrder: 17,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				return false;
			},
		},
		target: "foeSide",
		isNonstandard: null,
		shortDesc: "Blocks enemy team from healing effects.",
		start: "  [TEAM] was prevented from healing!",
		end: "  [TEAM]'s Heal Block wore off!",
	},
	healorder: {
		inherit: true,
		target: 'anyAlly',
		onPrepareHit(target, source, move) {
			if(target === source) return;
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attack Order", target);
			this.add('-anim', target, "Heal Order");
		},
		isNonstandard: null,
		desc: "The target restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals user or ally by 50% of its max HP.",
	},
	healpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, reflectable: 1, distance: 1, heal: 1, allyanim: 1},
		onHit(target, source) {
			let success = false;
			if (source.hasAbility('megalauncher')) {
				success = !!this.heal(this.modify(target.baseMaxhp, 0.667));
			} else {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
			}
			if (success && !target.isAlly(source)) {
				target.staleness = 'external';
			}
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		target: 'anyAlly',
		desc: "The target restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals user or ally by 50% of its max HP.",
	},
	heartstamp: {
		inherit: true,
		basePower: 65,
		pp: 20,
		isNonstandard: null,
	},
	highhorsepower: {
		inherit: true,
		accuracy: 100,
	},
	highjumpkick: {
		inherit: true,
		accuracy: 85,
		onPrepareHit(target, source, move){
			if (!source.canFloat()) return false;
		},
	},
	hornleech: {
		inherit: true,
		basePower: 80,
	},
	howl: {
		inherit: true,
		pp: 30,
	},
	hyperfang: {
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		isNonstandard: null,
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to flinch.",
	},
	hydrocannon: {
		inherit: true,
		flags: {bullet: 1, recharge: 1, protect: 1, mirror: 1},
	},
	hyperspacefury: {
		inherit: true,
		target: "any",
	},
	hyperspacehole: {
		inherit: true,
		target: "any",
	},
	hypnosis: {
		inherit: true,
		ignoreImmunity: false,
	},
	iceball: {
		num: 301,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['iceball'] || move.hit === 1) {
				pokemon.addVolatile('iceball');
			}
			return this.clampIntRange(move.basePower * pokemon.volatiles['iceball'].multiplier, 1, 160);
		},
		category: "Physical",
		name: "Ice Ball",
		pp: 20,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		condition: {
			duration: 2,
			onStart() {
				this.effectState.multiplier = 1;
			},
			onRestart() {
				if (this.effectState.multiplier < 4) {
					this.effectState.multiplier <<= 1;
				}
				this.effectState.duration = 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		desc: "Power doubles with each successful hit, up to a maximum of 160 power. The power is reset if this move misses or another move is used.",
		shortDesc: "Power doubles on each hit, up to 160.",
		isNonstandard: null,
	},
	icefang: {
		inherit: true,
		accuracy: 100,
	},
	icehammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, bludg: 1},
	},
	iciclespear: {
		inherit: true,
		basePower: 20,
		pp: 15,
	},
	icywind: {
		inherit: true,
		accuracy: 90,
	},
	incinerate: {
		inherit: true,
		basePower: 65,
		onHit(pokemon, source) {
			const item = pokemon.getItem();
			if (item && item.consumable) {
				pokemon.clearItem();
				this.add('-enditem', pokemon, item.name, '[from] move: Incinerate');
			}
		},
		desc: "The target loses its held item if it is consumable.",
		shortDesc: "Destroys foe(s)' consumable items.",
	},
	inferno: {
		inherit: true,
		basePower: 120,
	},
	ingrain: {
		inherit: true,
		onTryMove(pokemon){
			if(!pokemon.isGrounded() && !(pokemon.hasType('Flying') || pokemon.hasAbility('levitate'))) return false;
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Ingrain');
			},
			onResidualOrder: 7,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 8);
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			// forced groundedness implemented in battle.engine.js:BattlePokemon#isGrounded & canFloat
			onDragOut(pokemon) {
				this.add('-activate', pokemon, 'move: Ingrain');
				return null;
			},
		},
		desc: "The user has 1/8 of its maximum HP restored at the end of each turn, but it is prevented from switching out and other Pokemon cannot force the user to switch out. The user can still switch out if it uses Baton Pass, Escape Plan, Psy Bubble, Parting Shot, Slip Away, Teleport, U-turn, or Volt Switch. If the user leaves the field using Baton Pass, the replacement will remain trapped and still receive the healing effect. During the effect, the user loses its floating status if it has any and cannot gain floating status by any means, and its use of the moves Bounce, Fell Swoop, Fly, Sky Drop, Flying Press, Jump Kick, High Jump Kick, and Splash will fail.",
		shortDesc: "Heals 1/8 max HP per turn. Traps/grounds user.",
	},
	irondefense: {
		inherit: true,
		pp: 20,
	},
	ironhead: {
		inherit: true,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		desc: "Has a 20% chance to make the target flinch.",
		shortDesc: "20% chance to make the target flinch.",
	},
	irontail: {
		inherit: true,
		accuracy: 80,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	ivycudgel: {
		inherit: true,
		accuracy: 90,
		flags: {bludg: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Ogerpon-Wellspring':
				move.type = 'Water';
				break;
			case 'Ogerpon-Hearthflame':
				move.type = 'Fire';
				break;
			case 'Ogerpon-Cornerstone':
				move.type = 'Rock';
				break;
			}
		},
		contestType: "Tough",
	},
	jawlock: {
		inherit: true,
		accuracy: 85,
		pp: 15,
		onHit(target, source, move) {},
		volatileStatus: 'partiallytrapped',
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4 turns.",
	},
	jetpunch: {
		inherit: true,
		accuracy: true,
		priority: 0,
		hasSheerForce: false,
		contestType: "Cool",
		shortDesc: "This move does not check accuracy.",
	},
	jumpkick: {
		inherit: true,
		accuracy: 90,
		onPrepareHit(target, source, move){
			if (!source.canFloat()) return false;
		},
		isNonstandard: null,
	},
	junglehealing: {
		inherit: true,
		pp: 5,
	},
	knockoff: {
		inherit: true,
		onBasePower(basePower, source, target, move) {}, //Clears x1.5 boost
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					target.lastItem = item.id;
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
		shortDesc: "Removes item.",
	},
	landswrath: {
		inherit: true,
		basePower: 110,
		accuracy: 85,
		pp: 5,
		isNonstandard: null,
	},
	lastresort: {
		inherit: true,
		onTry(pokemon, target) {
			if (pokemon.side.pokemonLeft === 1) return true;
			if (pokemon.moveSlots.length < 2) return false; // Last Resort fails unless the user knows at least 2 moves
			let hasLastResort = false; // User must actually have Last Resort for it to succeed
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id === 'lastresort') {
					hasLastResort = true;
					continue;
				}
				if (!moveSlot.used) return false;
			}
			return hasLastResort;
		},
		desc: "This move fails unless the user is the last remaining Pokemon on its team, or if it knows this move and at least one other move and has used all the other moves it knows at least once each since it became active or Transformed.",
		shortDesc: "Fails unless last Mon or other moves used.",
	},
	lastrespects: {
		inherit: true,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			return 10 + Math.floor(move.allies!.shift()!.species.baseStats.spa / 10);
		},
		category: "Special",
		onModifyMove(move, pokemon) {
			move.allies = pokemon.side.pokemon.filter(ally => ally === pokemon || ally.fainted);
			move.multihit = move.allies.length;
		},
		contestType: "Cute",
		desc: "Hits one time for the user and one time for each fainted Pokemon in the user's party. The power of each hit is equal to 10+(X/10), where X is each participating Pokemon's base Sp. Attack; each hit is considered to come from the user.",
		shortDesc: "All fainted allies aid in damaging the target.",
	},
	leafstorm: {
		inherit: true,
		flags: {protect: 1, mirror: 1, wind: 1},
	},
	leaftornado: {
		inherit: true,
		accuracy: 100,
		pp: 20,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 30,
			boosts: {
				acc: -1,
			},
		},
		isNonstandard: null,
		desc: "Has a 30% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
	},
	leafage: {
		inherit: true,
		pp: 35,
	},
	leechlife: {
		inherit: true,
		basePower: 25,
		pp: 25,
	},
	lightscreen: {
		inherit: true,
		pp: 25,
	},
	liquidation: {
		inherit: true,
		basePower: 95,
		accuracy: 90,
		contestType: "Tough",
	},
	lockon: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onTryHit(target, source) {
			if (source.volatiles['lockon']){
				if(source.volatiles['lockon'].source === target) return false;
				source.removeVolatile('lockon'); //delete volatile so it can be re-added with the other source
			}
		},
		onHit(target, source) {
			source.addVolatile('lockon', target);
			this.add('-activate', source, 'move: Lock-On', '[of] ' + target);
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onInvulnerabilityPriority: 1,
			onInvulnerability(target, source, move) {
				if (move && source === this.effectState.target && target === this.effectState.source) return 0;
			},
			onModifyMove(move, source, target) {
				if (move && source === this.effectState.target && target === this.effectState.source){
					move.accuracy = true;
					move.ignoreEvasion = true;
				}
			},
			onSourceHit(target, source, move){
				if(source !== target) source.removeVolatile('lockon');
			},
			onSwitchOut(pokemon){
				if(pokemon === this.effectState.source){
					this.effectState.target.removeVolatile('lockon');
				}
			},
			onEnd(pokemon){
				this.add('-end', pokemon, 'move: Lock-On', '[silent]');
			}
		},
		desc: "The target cannot avoid the user's next move, even if the target is semi-invulerable due to being in the middle of a move such as Fly. The effect ends if either the user or the target leaves the field. Fails if this effect is active for the user.",
		shortDesc: "Next attack on target: No Guard effect.",
	},
	lovelykiss: {
		inherit: true,
		accuracy: 100,
		flags: {protect: 1, reflectable: 1, mirror: 1, contact: 1},
		isNonstandard: null,
	},
	lowsweep: {
		inherit: true,
		basePower: 70,
		pp: 10,
	},
	lunge: {
		inherit: true,
		secondary: {
			chance: 50,
			boosts: {
				atk: -1,
			},
		},
		desc: "Has a 50% chance to lower the target's Attack by 1 stage.",
		shortDesc: "50% chance to lower the target's Attack by 1.",
	},
	lusterpurge: {
		inherit: true,
		basePower: 80,
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "Lowers the target's Sp. Def by 1.",
	},
	magicpowder: {
		inherit: true,
		onHit(target) {
			let succeeded = false;
			const targetTypes = target.getTypes();
			if ((targetTypes.length > 1 && targetTypes[1] === "Psychic") || targetTypes.join() === "Psychic") return false;
			if (targetTypes[0] === "Psychic"){ //Due to above line, this is true only if the target is dual-typed
				if (target.setType("Psychic")) succeeded = true;
			} else {
				if (target.setType([targetTypes[0],"Psychic"]), true) succeeded = true;
			}
			if (succeeded) this.add('-start', target, 'typechange', target.getTypes().join('/'), '[from] move: Magic Powder');
			else {
				this.add('-fail', target);
				return null;
			}
		},
		desc: "The target's second typing is replaced with the Psychic type. If the target's first typing is Psychic and it has a second typing, it will become pure Psychic. If the target is already a pure Psychic-type or has Psychic as a second typing, the move fails.",
		shortDesc: "Changes the target's secondary typing to Psychic.",
		contestType: "Cute",
	},
	magicroom: {
		inherit: true,
		//Handles Primal Reversion change only, because it's run through an event. Item-eating moves and Mega/Ultra are implemented in their source locations.
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
				}
				for (const mon of this.getAllActive()) {
					this.singleEvent('End', mon.getItem(), mon.itemState, mon);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onFieldPrimal(pokemon){
				return false;
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 6,
			onFieldEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectState.source);
			},
		},
		desc: "For 5 turns, the held items of all active Pokemon have no effect. An item's effect of causing an existing forme change is unaffected, but any other effects from such items are negated. During the effect, Mega Evolution and Ultra Burst cannot be performed, and Fling, Natural Gift, Poltergeist, Stuff Cheeks, and Teatime are prevented from being used by all active Pokemon. The move Swing will not receive a power boost from holding an item. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, held items have no effect. No Mega/Ultra Burst.",
	},
	magicaltorque: {
		inherit: true,
		accuracy: 90,
		flags: {protect: 1},
		isNonstandard: null,
		noSketch: null,
	},
	magnetrise: {
		inherit: true,
		volatileStatus: 'magnetrise',
		condition: {
			duration: 5,
			onStart(target) {
				if (!target.canFloat()) return false;
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'Magnet Rise');
			},
		},
		desc: "For 5 turns, the user is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability as long as it remains active. If the user uses Baton Pass, the replacement will gain the effect. The moves Dig, Dive, Ingrain, and Roost fail while under this effect. Gravity, Smack Down, and an Iron Ball remove the effects of this move. Fails if the user is already under this effect or the effects of Gravity, Ingrain, an Iron Ball, or if the user\'s Ability is Heavy Metal or Suction Cups.",
	},
	magneticflux: {
		inherit: true,
		onHitSide(side, source, move) {
			const targets = [];
			for (const pokemon of side.active) {
				if (pokemon.hasAbility(['induction'])) {
					targets.push(pokemon);
				}
			}
			if (!targets.length) return false;
			let didSomething = false;
			for (const target of targets) {
				didSomething = this.boost({atk: 1, def: 1, spa: 1, spd: 1}, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
		desc: "Any ally with the Ability Induction has its Attack, Defense, Special Attack, and Special Defense raised by 1 stage.",
		shortDesc: "Raises non-Speed stats of allies with Induction by 1.",
	},
	meanlook: {
		num: 212,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mean Look",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1, mirror: 1},
		onHit(target, source, move) {
			return target.addVolatile('meanlooked', source, move, 'trapper');
		},
		//Condition implemented in conditions.ts because otherwise addVolatile crashes for them having the same name.
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw); this overrides normal immunity to being trapped if the target is a Ghost-type, is holding Shed Shell, is behind a Substitute, or has Run Away. The target can still switch out if it uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Traps the target for 4 turns, ignores immunity.",
	},
	meditate: {
		inherit: true,
		pp: 20,
		boosts: {atk: 1, spd: 1},
		isNonstandard: null,
		desc: "Raises the user's Attack and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Attack and Sp. Def by 1.",
	},
	megakick: {
		inherit: true,
		accuracy: 85,
		pp: 10,
	},
	megapunch: {
		inherit: true,
		accuracy: 90,
		twoType: "Fighting",
		desc: "This move is both Normal and Fighting typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
		shortDesc: "Both Normal and Fighting types.",
	},
	metalclaw: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
	},
	metalsound: {
		inherit: true,
		accuracy: 85,
		pp: 15,
		target: 'allAdjacentFoes',
		shortDesc: "Lowers foe(s) Sp. Def by 2.",
	},
	meteorbeam: {
		inherit: true,
		pp: 5,
		contestType: "Beautiful",
	},
	meteormash: {
		inherit: true,
		basePower: 95,
	},
	milkdrink: {
		inherit: true,
		pp: 10,
		target: 'adjacentAllyOrSelf',
		desc: "The target restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals user or ally by 50% of its max HP.",
	},
	mindreader: {
		num: 170,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mind Reader",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		volatileStatus: 'mindreader',
		onTryHit(pokemon) {
			if (pokemon.volatiles['mindreader']) return false;
		},
		condition: {
			onStart(pokemon){
				this.add('-start', pokemon, 'move: Mind Reader');
			},
			onModifyMove(move, source, target) {
				move.accuracy = true;
				move.ignoreEvasion = true;
				delete move.flags['protect'];
			},
			onSourceHit(target, source, move){
				if(source !== target) source.removeVolatile('mindreader');
			},
			onEnd(pokemon){
				this.add('-end', pokemon, 'move: Mind Reader', '[silent]');
			}
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Clever",
		desc: "The user's next move will succeed its accuracy check, even if the target is in the middle of a two-turn move. It will also hit through protection moves.",
		shortDesc: "User's next attack always hits, ignores protection.",
		start: "  [POKEMON] is sensing the movements of the battlefield...",
		isNonstandard: null,
	},
	minimize: {
		inherit: true,
		pp: 5,
		onPrepareHit(pokemon) {
			if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
				return false;
			}
			return this.runEvent('EvadeStallMove', pokemon);
		},
		onHit(pokemon){
			pokemon.addVolatile('evadestall');
			pokemon.volatiles['evadestall'].duration = 3; //Needs to last a turn after Minimize ends
			this.add('-start', pokemon, 'Minimize');
		},
		condition: {
			duration: 2, //Should get removed in onBeforeMove, so this is a failsafe
			onBeforeMove(pokemon, move) {
				pokemon.removeVolatile('minimize');
			},
			onSourceModifyDamage(damage, source, target, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'dragonrush', 'bodypress',
				];
				if (boostedMoves.includes(move.id)) {
					return this.chainModify(2);
				}
			},
			onAccuracy(accuracy, target, source, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'dragonrush', 'bodypress',
				];
				if (boostedMoves.includes(move.id)) return true;
				if(!move.ignoreEvasion && typeof move.accuracy === 'number') return false;
			},
			onEnd(pokemon){
				this.add('-end', pokemon, 'move: Minimize', '[silent]');
			}
		},
		boosts: {},
		desc: "When used, the Pokemon becomes Evasive until it is time for its next attack. While Evasive, moves that target the user will fail accuracy checks made to hit it unless they ignore the condition. This move has a 1/X chance of being successful, where X starts at 1 and triples each time Evasiveness is successfully gained. X resets to 1 if the user was not Evasive last turn. The moves Body Slam, Body Press, Stomp, Steamroller, and Dragon Rush will not check accuracy and have their damage doubled if used against the user while it is Evasive in this manner.",
		shortDesc: "Becomes Evasive until user's next attack.",
		start: "  [POKEMON] shrank!",
	},
	miracleeye: {
		num: 193,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Miracle Eye",
		pp: 40,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		volatileStatus: 'miracleeye',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Miracle Eye');
			},
			onModifyMovePriority: -5,
			onModifyMove(move) {
				move.ignoreEvasion = true;
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Psychic'] = true;
				}
				move.pranksterBoosted = false; //Works to ignore Prankster immunity, since it's called after priority is boosted but before immunity is checked
			},
			onEnd(pokemon){
				this.add('-end', pokemon, 'move: Miracle Eye', '[silent]');
			}
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		contestType: "Clever",
		desc: "As long as the user remains active, its moves can't be made to miss due to Evasiveness, and its Psychic-type attacks and Prankster-boosted status moves can hit Dark type Pokemon.",
		shortDesc: "User ignores Dark immunities and Evasiveness.",
		start: "  [POKEMON] gained supernatural sight!",
		isNonstandard: null,
	},
	mirrorshot: {
		inherit: true,
		accuracy: 100,
		pp: 20,
		isNonstandard: null,
	},
	mistball: {
		inherit: true,
		basePower: 80,
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "Lowers the target's Sp. Atk by 1.",
	},
	moonblast: {
		inherit: true,
		basePower: 90,
		pp: 10,
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
		desc: "Has a 10% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "10% chance to lower the target's Sp. Atk by 1.",
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'snow':
				factor = 0.25;
				break;
			}
			if('midnight' in this.field.pseudoWeather) factor = 0.75;
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect, 3/4 of its maximum HP if Midnight is in effect, or 1/4 of its maximum HP if the weather is Desolate Land, Sunny Day, Snow, Primordial Sea, Rain Dance, or Sandstorm, all rounded half down.",
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.75;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor: 0.5;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'snow':
				factor = 0.25;
				break;
			}
			if('midnight' in this.field.pseudoWeather) factor = 0.25;
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		desc: "The user restores 1/2 of its maximum HP if the weather Desolate Land or Sunny Day, 3/4 of its maximum HP if Delta Stream or no weather conditions are in effect, or 1/4 of its maximum HP if the weather is Snow, Primordial Sea, Rain Dance, or Sandstorm, or if Midnight is in effect, all rounded half down.",
	},
	mudbomb: {
		inherit: true,
		accuracy: 100,
		pp: 20,
		isNonstandard: null,
	},
	mudshot: {
		inherit: true,
		basePower: 50,
		accuracy: 100,
		pp: 20,
	},
	mudslap: {
		inherit: true,
		pp: 30,
	},
	mudsport: {
		inherit: true,
		condition: {
			duration: 5,
			onFieldStart(side, source) {
				this.add('-fieldstart', 'move: Mud Sport', '[of] ' + source);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'par') {
					this.debug('Mud Sport prevents paralysis');
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'move: Mud Sport');
					return null;
				}
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('mud sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onFieldResidualOrder: 21,
			onFieldEnd() {
				this.add('-fieldend', 'move: Mud Sport');
			},
		},
		isNonstandard: null,
		desc: "For 5 turns, all Electric-type attacks used by any active Pokemon have their power multiplied by 0.33, and Pokemon cannot become paralyzed. Fails if this effect is already active.",
		shortDesc: "For 5 turns, no paralysis and Electric-type attacks have 1/3 power.",
	},
	muddywater: {
		inherit: true,
		basePower: 95,
		accuracy: 90,
	},
	multiattack: {
		inherit: true,
		basePower: 100,
		isNonstandard: null,
	},
	mysticalfire: {
		inherit: true,
		basePower: 70,
	},
	naturalgift: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return false;
			const item = pokemon.getItem();
			if (!item.naturalGift) return false;
			pokemon.setItem('');
			pokemon.lastItem = item.id; //Jank set-up that assumes lastItem can't be changed in-between trying the move and preparing to hit with it.
			pokemon.usedItemThisTurn = true;
			move.type = item.naturalGift.type;
		},
		onPrepareHit(target, pokemon, move) {
			const item = this.dex.items.get(pokemon.lastItem);
			move.basePower = item.naturalGift.basePower;
			this.runEvent('AfterUseItem', pokemon, null, null, item);
		},
		isNonstandard: null,
		desc: "The type and power of this move depend on the user's held Berry, and the Berry is lost. Fails if the user is not holding a Berry, if the user has the Klutz Ability, or if Magic Room is in effect for the user.",
	},
	naturepower: {
		inherit: true,
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if ('midnight' in this.field.pseudoWeather){
				move = 'nightdaze';
			} else if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			}
			this.actions.useMove(move, pokemon, target);
			return null;
		},
		isNonstandard: null,
		desc: "This move calls another move for use based on the battle terrain. Tri Attack on the regular Wi-Fi terrain, Thunderbolt during Electric Terrain, Moonblast during Misty Terrain, Energy Ball during Grassy Terrain, and Psychic during Psychic Terrain. Calls Night Daze if Midnight is in effect.",
	},
	needlearm: {
		inherit: true,
		basePower: 65,
		pp: 20,
		isNonstandard: null,
	},
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp') {
					return false;
				}
				//Sets sleep duration to 3 turns without resetting turns spent.
				pokemon.statusData.time = 4 + pokemon.statusData.time - pokemon.statusData.startTime;
				pokemon.statusData.startTime = 4;
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
		isNonstandard: null,
		desc: "Causes the target to lose 1/4 of its maximum HP, rounded down, at the end of each turn as long as it is asleep. This move does not affect the target unless it is asleep. The effect ends when the target wakes up, even if it falls asleep again in the same turn. The target is forced to sleep for three turns.",
		shortDesc: "SLP target: -25% max HP each turn, sleeps 3 turns.",
	},
	nightdaze: {
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
	},
	nightshade: {
		inherit: true,
		pp: 20,
	},
	nightslash: {
		inherit: true,
		pp: 20,
	},
	noretreat: {
		num: 748,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "No Retreat",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'noretreat',
		onTry(source, target, move) {
			if (source.volatiles['noretreat']) return false;
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: No Retreat');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		contestType: "Clever",
		desc: "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage, but it becomes prevented from switching out. The user can still switch out if it is holding a Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. If the user leaves the field using Baton Pass, the replacement will remain trapped. Fails if the user has already been prevented from switching by this effect.",
		start: "  [POKEMON] will no longer run from battle!",
	},
	nobleroar: {
		inherit: true,
		pp: 20,
		accuracy: 85,
		target: "allAdjacentFoes",
		contestType: "Cool",
		shortDesc: "Lowers foe(s) Attack and Sp. Atk by 1.",
	},
	noxioustorque: {
		inherit: true,
		accuracy: 90,
		flags: {protect: 1},
		isNonstandard: null,
		noSketch: null,
	},
	obstruct: {
		inherit: true,
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					this.boost({def: -1}, source, target, this.dex.getActiveMove("Obstruct"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.flags['contact']) {
					this.boost({def: -1}, source, target, this.dex.getActiveMove("Obstruct"));
				}
			},
		},
		isNonstandard: null,
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon trying to make contact with the user have their Defense lowered by 1 stage. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Bunker Down, Detect, Endure, King's Shield, Max Guard, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from damaging attacks. Contact: -1 Def.",
		contestType: "Tough",
	},
	octazooka: {
		inherit: true,
		basePower: 70,
		accuracy: 100,
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1,
			},
		},
		isNonstandard: null,
		desc: "Has a 100% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "Lowers the target's accuracy by 1.",
	},
	octolock: {
		inherit: true,
		duration: 4,
		flags: {protect: 1, mirror: 1, contact: 1},
		condition: {
			durationCallback(target, source) {
				if (source?.hasItem('gripclaw')) return 6;
				return 4;
			},
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Octolock', '[of] ' + source);
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['octolock'];
					this.add('-end', pokemon, 'Octolock', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({def: -1, spd: -1}, pokemon, source, this.dex.getActiveMove('octolock'));
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source && this.effectState.source.isActive) pokemon.tryTrap();
			},
		},
		isNonstandard: null,
		contestType: "Tough",
		desc: "Prevents the target from switching out for four turns (six turns if user is holding Grip Claw). At the end of each turn during effect, the target's Defense and Special Defense are lowered by 1 stage. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully",
		shortDesc: "Traps target for 4 turns, -1 Def and SpD each turn.",
	},
	odorsleuth: {
		inherit: true,
		onHit(target, source, move) {
			return target.addVolatile('odorsleuth', source, move, 'sleuther');
		},
		condition: {
			onStart(pokemon) {
				if(pokemon.removeVolatile('evade') || pokemon.removeVolatile('doubleteam') || pokemon.removeVolatile('minimize') || pokemon.removeVolatile('tangledfeet')){
					this.debug('Odor Sleuth removed evasiveness');
				}
				this.add('-start', pokemon, 'Odor Sleuth');
			},
			onNegateImmunity(pokemon, type) {
				if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
			},
		},
		isNonstandard: null,
		desc: "As long as the user and target remain active, the target cannot become Evasive, and Normal- and Fighting-type attacks can hit the target if it is a Ghost type. Existing Evasiveness is removed. If the target leaves the field using Baton Pass, the replacement becoems affected instead. Fails if the target is already affected.",
		shortDesc: "Target loses Ghost immunities and can't become Evasive.",
	},
	orderup: {
		inherit: true,
		basePower: 60,
		onModifyMove(move, pokemon) {
			if (pokemon.volatiles['commanded'] && pokemon.hasAbility('sheerforce')) move.hasSheerForce = true;
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!pokemon.volatiles['commanded'] || move.hasSheerForce) return;
			const tatsugiri = pokemon.volatiles['commanded'].source;
			if (tatsugiri.baseSpecies.baseSpecies !== 'Tatsugiri') return; // Should never happen
			switch (tatsugiri.baseSpecies.forme) {
			case 'Droopy':
				this.boost({def: 1}, pokemon, pokemon);
				break;
			case 'Stretchy':
				this.boost({spe: 1}, pokemon, pokemon);
				break;
			default:
				this.boost({atk: 1}, pokemon, pokemon);
				break;
			}
		},
		hasSheerForce: false,
		desc: "If this move is successful and an ally Tatsugiri has activated its Commander Ability, raises user's Attack by 1 stage if the Tatsugiri is Curly Form, Defense by 1 stage if Droopy Form, or Speed by 1 stage if Stretchy Form. This boost does not occur if the user has Sheer Force.",
	},
	originpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, mirror: 1},
		pp: 5,
	},
	particleslam: {
		num: 916,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Particle Slam",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Supercell Slam'));
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Supercell Slam", target);
		},
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage.",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
	},
	payback: {
		inherit: true,
		basePower: 60,
	},
	peck: {
		inherit: true,
		basePower: 40,
	},
	phantomforce: {
		inherit: true,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'snow') return false;
			},
			onInvulnerability(target, source, move) {
				if (['phantomforce', 'shadowclaw', 'shadowforce', 'shadowpunch', 'shadowsneak'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['phantomforce', 'shadowclaw', 'shadowforce', 'shadowpunch', 'shadowsneak'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "If this move is successful, it breaks through the target's Bunker Down, Detect, King's Shield, Obstruct, Protect, Psy Bubble, Silk Trap, Slip Away, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Shadow Punch, Shadow Sneak, Shadow Claw, Phantom Force, and Shadow Force; these moves also have their damage doubled. If the user is holding a Power Herb, the move completes in one turn.",
	},
	pinmissile: {
		inherit: true,
		basePower: 20,
		accuracy: 100,
		pp: 15,
	},
	poisongas: {
		inherit: true,
		accuracy: 85,
		pp: 20,
	},
	poisonpowder: {
		inherit: true,
		pp: 30,
	},
	poisonsting: {
		inherit: true,
		basePower: 25,
	},
	poisontail: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	pollenpuff: {
		inherit: true,
		flags: {bullet: 1, powder: 1, protect: 1, mirror: 1},
	},
	poltergeist: {
		inherit: true,
		basePower: 0,
		onPrepareHit(target, source, move) {
			if (target.ignoringItem()) return false;
			const item = target.takeItem(source);
			if (!(item && this.singleEvent('TakeItem', item, target.itemData, target, source, move, item))) return false;
			if (!item.fling) return false;
			move.basePower = 80 + item.fling.basePower;
			target.item = item.id; // Since this requires running the TakeItem, we need to put the item back
		},
		desc: "The power of this move is based on the target's held item. Fails if the target has no held item, if the target is under the effect of Magic Room, or if the target has the Klutz or Sticky Hold Abilities.",
		shortDesc: "Target's item attacks it. Power varies.",
		contestType: "Cool",
	},
	populationbomb: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
	},
	powertrick: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Power Trick');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Power Trick');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onRestart(pokemon) {
				pokemon.removeVolatile('Power Trick');
			},
		},
		desc: "The user swaps its Attack and Defense stats and its Sp. Attack and Sp. Defense stats, and stat stage changes remain on their respective stats. This move can be used again to swap the stats back. If the user uses Baton Pass, the replacement will have its stats swapped if the effect is active. This effect persists even if the user has its stats recalculated by changing forme while its stats are swapped.",
		shortDesc: "Switches user's Atk/Def and SpA/Spd stats.",

		start: "  [POKEMON] swapped its offensive stats with its defensive stats!",
		end: "#.start",
	},
	powertrip: {
		inherit: true,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			return 20 * (1 + pokemon.positiveBoosts());
		},
	},
	precipiceblades: {
		inherit: true,
		accuracy: 80,
		pp: 5,
	},
	present: {
		num: 217,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Present",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit(target, source, move) {
			if (source.side === target.side) {
				move.basePower = 0;
				move.infiltrates = true;
			}
		},
		onHit(target, source) {
			if (source.side === target.side) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.25))) {
					this.add('-immune', target);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
		desc: "If the target is an ally, this move restores 1/4 of its maximum HP, rounded down, instead of dealing damage.",
		shortDesc: "If the target is an ally, heals 25% of its max HP.",
	},
	psybeam: {
		inherit: true,
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		desc: "Has a 30% chance to confuse the target.",
		shortDesc: "30% chance to confuse.",
	},
	psychicfang: {
		num: 706,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Psychic Fang",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Psychic')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cute",
		viable: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic Fangs", target);
		},
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens, unless the target is immune.",
	},
	punishment: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			return 60 + 20 * target.positiveBoosts();
		},
		isNonstandard: null,
		desc: "Power is equal to 60+(X*20), where X is the target's total stat stage changes that are greater than 0.",
	},
	rage: {
		inherit: true,
		condition: {
			duration: 2, //Should get removed in onBeforeMove, so this is a failsafe
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Rage');
			},
			onHit(target, source, move) {
				if (target !== source && move.category !== 'Status') {
					this.boost({atk: 1, spa: 1, spe: 1});
				}
			},
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug('removing Rage before attack');
				pokemon.removeVolatile('rage');
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		isNonstandard: null,
		contestType: "Tough",
		desc: "Once this move is successfully used, the user's Attack, Special Attack, and Speed are raised by 1 stage every time it is hit by another Pokemon's attack before its next turn.",
		shortDesc: "If hit before next turn, user Atk, Sp. Atk, Speed +1.",
	},
	ragepowder: {
		inherit: true,
		flags: {snatch: 1, powder: 1},
	},
	rapidspin: {
		inherit: true,
		secondary: null,
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const userConditions = ['trapped', 'partiallytrapped', 'strongpartialtrap', 'blocked'];
				for (const condition of userConditions) {
					if (pokemon.hp && pokemon.volatiles[condition]) {
						pokemon.removeVolatile(condition);
					}
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const userConditions = ['trapped', 'partiallytrapped', 'strongpartialtrap', 'blocked', 'octolock'];
				for (const condition of userConditions) {
					if (pokemon.hp && pokemon.volatiles[condition]) {
						pokemon.removeVolatile(condition);
					}
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
			}
		},
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and trapping/binding moves end for the user, and all hazards are removed from the user's side of the field.",
		shortDesc: "Free user from hazards/trap/Leech Seed.",
	},
	razorleaf: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
		basePower: 60,
		accuracy: 100,
	},
	razorshell: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
	},
	razorwind: {
		inherit: true,
		flags: {charge: 1, protect: 1, mirror: 1, wind: 1},
		willCrit: true,
		isNonstandard: null,
		desc: "Always scores a critical hit. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then hits foe(s) turn 2. Always crits.",
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	reflect: {
		inherit: true,
		pp: 25,
	},
	reflecttype: {
		inherit: true,
		pp: 10,
		onTryHit(target, source) {
			if(target.hasAbility('owntempo')){
				this.add('-activate', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}
		},
		onHit(target, source) {
			if (source.species && (source.species.num === 493 || source.species.num === 773)) return false;
			let newBaseTypes = target.getTypes(true).filter(type => type !== '???');
			this.add('-start', source, 'typechange', '[from] move: Reflect Type', '[of] ' + target);
			source.setType(newBaseTypes);
			source.knownType = target.side === source.side && target.knownType;
		},
		desc: "Causes the user's types to become the same as the current types of the target. A type that had been removed is not copied. Fails if the user is an Arceus or a Silvally, if the target is typeless, or if the target has the Ability Own Tempo.",
	},
	refresh: {
		inherit: true,
		onHit(pokemon) {
			if (['', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		isNonstandard: null,
		desc: "The user cures its burn, poison, paralysis, or sleep. Fails otherwise.",
		shortDesc: "User cures its burn, poison, paralysis, or sleep.",
	},
	rest: {
		inherit: true,
		pp: 10,
	},
	retaliate: {
		inherit: true,
		basePower: 75,
	},
	return:{
		inherit: true,
		basePowerCallback(pokemon) {
			return Math.min(160, Math.floor((pokemon.happiness * 10) / 25)) || 1;
		},
		isNonstandard: null,
		desc: "Power is equal to the greater of (user's Happiness * 2/5), rounded down, or 1. During a Link Battle, happiness is capped to 160, causing this move's power to become capped to 60.",
		shortDesc: "Max 60 power at maximum allowed Happiness.",
	},
	revenge: {
		inherit: true,
		basePower: 70,
		isNonstandard: null,
	},
	revivalblessing: {
		inherit: true,
		tags: {'nosleeptalk': 1, 'failcopycat': 1, 'noassist': 1},
		onDisableMove(pokemon) {
			if (!pokemon.side.pokemon.filter(ally => ally.fainted).length) pokemon.disableMove('revivalblessing');
		},
	},
	roaroftime: {
		inherit: true,
		basePower: 160,
	},
	rockclimb: {
		inherit: true,
		basePower: 70,
		accuracy: 100,
		onEffectiveness(typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		isNonstandard: null,
		desc: "Has a 10% chance to confuse the target. This move's type effectiveness against Rock is changed to be super effective no matter what this move's type is.",
		shortDesc: "10% chance to confuse. Super effective on Rock.",
	},
	rockslide: {
		inherit: true,
		basePower: 80,
	},
	rocksmash: {
		inherit: true,
		basePower: 50,
		pp: 20,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Defense by 1.",
	},
	rockthrow: {
		inherit: true,
		power: 45,
		accuracy: 100,
		pp: 25,
	},
	rocktomb: {
		inherit: true,
		basePower: 50,
		accuracy: 100,
		pp: 20,
	},
	rollingkick: {
		inherit: true,
		basePower: 65,
		accuracy: 100,
		pp: 20,
		isNonstandard: null,
	},
	roost: {
		inherit: true,
		pp: 10,
		onTryMove(pokemon){
			if(!pokemon.isGrounded() && (pokemon.volatiles['magnetrise'] || pokemon.volatiles['risingchorus'] || pokemon.volatiles['telekinesis'] || (!pokemon.ignoringItem() && pokemon.getItem() === 'airballoon'))) return false;
		},
		//Grounding mechanic change implemented in script.ts as a change to sim/pokemon.ts.
		desc: "The user restores 1/2 of its maximum HP, rounded half up. Until the end of the turn, Flying-type users lose their Flying type. Does nothing if the user's HP is full. Fails if the user is floating but is not a Flying type and doesn't have the Ability Levitate.",
		shortDesc: "Heals 50% HP. Grounded until turns ends.",
	},
	rototiller: {
		inherit: true,
		onHitField(target, source) {
			let success = false;
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'
			];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Rototiller', '[of] ' + source);
					success = true;
				}
				if (target.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', target.side, this.dex.conditions.get(sideCondition).name, '[from] move: Rototiller', '[of] ' + source);
					success = true;
				}
			}
			if(this.field.clearTerrain()) success = true;
			return success;
		},
		isNonstandard: null,
		contestType: "Clever",
		desc: "The effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for both sides of the field. If there is a terrain active, it will be cleared.",
		shortDesc: "Clears hazards and terrain.",
	},
	sacredfire: {
		inherit: true,
		accuracy: 100,
	},
	sacredsword: {
		inherit: true,
		basePower: 85,
		pp: 10,
	},
	safeguard: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Safeguard', '[of] ' + source, '[persistent]');
				} else {
					this.add('-sidestart', side, 'move: Safeguard', '[of] ' + source);
				}
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (['confusion', 'curse', 'leechseed', 'nightmare', 'saltcure', 'withering', 'yawn'].includes(status.id) && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return false;
				}
			},
			onDamage(damage, target, source, effect){
				if(effect && ['spikes','stealthrock', 'firepledge'].includes(effect.id)) return false;
			},
			onImmunity(type, pokemon) {
				if (['sandstorm', 'snow'].includes(type)) return false;
			},
			onSideResidualOrder: 21,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
		desc: "For 5 turns, the user and its party members cannot have non-volatile status conditions, confusion, Curse, Leech Seed, Nightmare, Salt Cure, or Withering inflicted on them by other Pokemon. Pokemon on the user's side cannot become affected by Yawn but can fall asleep from its effect. Residual damage from Spikes, Stealth Rock, Sandstorm, Snow, and a burning field is blocked for the user and its team. It is removed from the user's side if an opponent uses the move Defog. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, user party: no +status or field damage.",
	},
	saltcure: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Salt Cure');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Water', 'Steel']) ? 4 : 8));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Salt Cure');
			},
		},
	},
	sandattack: {
		inherit: true,
		pp: 20,
	},
	scald: {
		inherit: true,
		basePower: 70,
	},
	screech: {
		inherit: true,
		pp: 15,
		target: 'allAdjacentFoes',
	},
	secretpower: {
		inherit: true,
		onModifyType(move){
			if ('midnight' in this.field.pseudoWeather){
				move.type = 'Dark';
			} else switch(this.field.effectiveTerrain()) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			move.secondaries = [];
			if ('midnight' in this.field.pseudoWeather){
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else  switch(this.field.effectiveTerrain()) {
				case 'electricterrain':
					move.secondaries.push({
						chance: 30,
						status: 'par',
					});
					break;
				case 'grassyterrain':
					move.secondaries.push({
						chance: 30,
						status: 'slp',
					});
					break;
				case 'mistyterrain':
					move.secondaries.push({
						chance: 30,
						boosts: {
							spa: -1,
						},
					});
					break;
				case 'psychicterrain':
					move.secondaries.push({
						chance: 30,
						volatileStatus: 'confusion',
					});
					break;
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		isNonstandard: null,
		shortDesc: "Type and effect varies with terrain. (30% prz chance)",
		desc: "Has a 30% chance to cause a secondary effect on the target. This move's type and the effect change based on the battle terrain: Causes paralysis on the regular Wi-Fi terrain, causes paralysis during Electric Terrain, lowers Special Attack by 1 stage during Misty Terrain, causes sleep during Grassy Terrain, and confuses during Psychic Terrain. During Midnight, it causes sleep.",
	},
	shadowclaw: {
		inherit: true,
		pp: 20,
	},
	shadowforce: {
		inherit: true,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'snow') return false;
			},
			onInvulnerability(target, source, move) {
				if (['phantomforce', 'shadowclaw', 'shadowforce', 'shadowpunch', 'shadowsneak'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (['phantomforce', 'shadowclaw', 'shadowforce', 'shadowpunch', 'shadowsneak'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
		},
		desc: "If this move is successful, it breaks through the target's Bunker Down, Detect, King's Shield, Obstruct, Protect, Psy Bubble, Silk Trap, Slip Away, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Shadow Punch, Shadow Sneak, Shadow Claw, Phantom Force, and Shadow Force; these moves also have their damage doubled. If the user is holding a Power Herb, the move completes in one turn.",
	},
	sharpen: {
		inherit: true,
		pp: 20,
		boosts: {
			atk: 1,
			spe: 1
		},
		isNonstandard: null,
		desc: "Raises the user's Attack and Speed by 1 stage.",
		shortDesc: "Raises the user's Attack and Speed by 1.",
	},
	shelter: {
		inherit: true,
		pp: 5,
		onTry(source, target, move) {
			if (source.volatiles['shelter']) return false;
		},
		boosts: {
			def: 2,
			spd: 2,
		},
		volatileStatus: 'shelter',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Shelter');
			},
			onCriticalHit: false,
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		desc: "Raises the user's Defense and Special Defense by 2 stages and prevents other Pokemon from scoring a critical hit on it. The user also becomes prevented from switching out, but can still switch out if it is holding a Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. If the user leaves the field using Baton Pass, the replacement will remain trapped. Fails if the user has already been prevented from switching by this effect.",
		shortDesc: "Def/Sp. Def +2, prevents critical hits. Traps user.",
		start: "  [POKEMON] sheltered in place and will not leave!",
	},
	shoreup: {
		inherit: true,
		pp: 5,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
			case 'raindance':
			case 'primordialsea':
			case 'snow':
				factor = 0.25;
				break;
			case 'sandstorm':
				factor = 0.75;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect, 3/4 of its maximum HP if Sandstorm is in effect, or 1/4 of its maximum HP if the weather is Desolate Land, Sunny Day, Snow, Primordial Sea, or Rain Dance, or if Midnight is in effect, all rounded half down.",
		shortDesc: "Heals user by weather-dependent amount.",
		contestType: "Clever",
	},
	silktrap: {
		inherit: true,
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					source.addVolatile('singletrap');
				}
				return this.NOT_FAIL;
			},
		},
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon trying to make contact with the user will become trapped for a turn. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Bunker Down, Detect, Endure, King's Shield, Obstruct, Play Dead, Protect, Psy Bubble, Quick Guard, Rebound, Silk Trap, Slip Away, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Guards damaging attacks. Contact: 1-turn trap.",
	},
	signalbeam: {
		inherit: true,
		basePower: 80,
		isNonstandard: null,
	},
	sing: {
		inherit: true,
		accuracy: 70,
	},
	skydrop: {
		inherit: true,
		onPrepareHit(target, source, move){
			if (!source.canFloat() || !target.canFloat()) return false;
		},
		onTryHit(target, source, move) {
			if (target.fainted) return false;
			if (source.removeVolatile(move.id)) {
				if (target !== source.volatiles['twoturnmove'].source) return false;

				if (target.hasType('Flying')) {
					this.add('-immune', target);
					return null;
				}
			} else {
				if (target.volatiles['substitute'] || target.side === source.side) {
					return false;
				}
				if (target.getWeight() >= 2000) {
					this.add('-fail', target, 'move: Sky Drop', '[heavy]');
					return null;
				}

				this.add('-prepare', source, move.name, target);
				source.addVolatile('twoturnmove', target);
				return null;
			}
		},
		condition: {
			duration: 2,
			onAnyDragOut(pokemon) {
				if (pokemon === this.effectState.target || pokemon === this.effectState.source) return false;
			},
			onFoeTrapPokemonPriority: -15,
			onFoeTrapPokemon(defender) {
				if (defender !== this.effectState.source) return;
				defender.trapped = true;
			},
			onFoeBeforeMovePriority: 12,
			onFoeBeforeMove(attacker, defender, move) {
				if (attacker === this.effectState.source) {
					attacker.activeMoveActions--;
					this.debug('Sky drop nullifying.');
					return null;
				}
			},
			onRedirectTargetPriority: 99,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectState.target) return;
				if (this.effectState.source.fainted) return;
				return this.effectState.source;
			},
			onAnyInvulnerability(target, source, move) {
				if (target !== this.effectState.target && target !== this.effectState.source) {
					return;
				}
				if (source === this.effectState.target && target === this.effectState.source) {
					return;
				}
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onAnyBasePower(basePower, target, source, move) {
				if (target !== this.effectState.target && target !== this.effectState.source) {
					return;
				}
				if (source === this.effectState.target && target === this.effectState.source) {
					return;
				}
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
			onFaint(target) {
				if (target.volatiles['skydrop'] && target.volatiles['twoturnmove'].source) {
					this.add('-end', target.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
				}
			},
		},
		isNonstandard: null,
		desc: "This attack takes the target into the air with the user on the first turn and executes on the second. Pokemon weighing 200 kg or more or who are unable to obtain floating status cannot be lifted. On the first turn, the user and the target avoid all attacks other than Hurricane, Smack Down, Thousand Arrows, Thunder, and Twister, which have their damage doubled. The user and the target cannot make a move between turns, but the target can select a move to use. This move cannot damage Flying-type Pokemon. Fails on the first turn if the target is an ally, if the target has a substitute, or if the target is using Bounce, Dig, Dive, Fly, Phantom Force, Shadow Force, or Sky Drop.",
	},
	skyuppercut: {
		inherit: true,
		basePower: 75,
		accuracy: 100,
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 1;
		},
		isNonstandard: null,
		desc: "This move's type effectiveness against Flying is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Flying.",
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	slam: {
		inherit: true,
		basePower: 90,
		accuracy: 90,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	sludge: {
		inherit: true,
		basePower: 60,
	},
	sludgewave: {
		inherit: true,
		basePower: 95,
		accuracy: 90,
		target: 'allAdjacentFoes',
		shortDesc: "10% chance to poison adjacent foes.",
	},
	smackdown: {
		inherit: true,
		basePower: 60,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = !(pokemon.isGrounded(false, true));
				this.debug("Smack Down grounded assessment: " + !applies);
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				this.debug("Smack Down final application: " + applies);
				if (!applies) return false;
				this.add('-start', pokemon, 'Smack Down');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					this.add('-start', pokemon, 'Smack Down');
				}
				if (pokemon.volatiles['magnetrise']) {
					delete pokemon.volatiles['magnetrise'];
					this.add('-start', pokemon, 'Smack Down');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		desc: "This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If this move hits a target under the effect of Bounce, Fly, or Magnet Rise, the effect ends. If the target is a Flying type that has not used Roost this turn or a Pokemon with the Levitate Ability, it loses its immunity to Ground-type attacks and the Arena Trap Ability as long as it remains active. Using Magnet Rise or being targeted by Telekinesis will regain these immunities, but only while those effects are active.",
		shortDesc: "Grounds the target.",
	},
	smartstrike: {
		inherit: true,
		basePower: 85,
		priority: -1,
		shortDesc: "This move does not check accuracy. Goes last.",
		contestType: "Clever",
	},
	smellingsalts: {
		inherit: true,
		basePower: 75,
		isNonstandard: null,
	},
	smog: {
		inherit: true,
		accuracy: 85,
		secondary: {
			chance: 30,
			status: 'tox',
		},
		desc: "Has a 30% chance to badly poison the target.",
		shortDesc: "30% chance to badly poison.",
	},
	snaptrap: {
		inherit: true,
		volatileStatus: 'strongpartialtrap',
		isNonstandard: null,
		desc: "Prevents the target from switching out for two turns (three turns if the user is holding Grip Claw). Causes damage to the target equal to 1/4 of its maximum HP (1/3 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target a lot for 2 turns.",
		contestType: "Clever",
	},
	snarl: {
		inherit: true,
		accuracy: 100,
	},
	snatch: {
		inherit: true,
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'Snatch');
			},
			onAnyTryMove(source, target, move) {
				const snatchUser = this.effectState.source;
				if (snatchUser.isSkyDropped()) return;
				if (!move || !move.flags['snatch'] || move.sourceEffect === 'snatch') {
					return;
				}
				if(source.hasAbility('owntempo')){
					this.add('-activate', source, 'ability: Own Tempo');
					this.hint('Own Tempo blocks effects that steal or copy its moves');
					return;
				}
				/*if(move.id === 'geomancy'){ //First turn, do nothing. Second turn, steal and resolve target's charging turn.
					if(source.volatiles['twoturnmove'] || !this.singleEvent('ChargeMove', source, target, move)) {
						source.removeVolatile(move.id);
					} else {
						return;
					}
				}*/
				snatchUser.removeVolatile('snatch');
				this.add('-activate', snatchUser, 'move: Snatch', '[of] ' + source);
				this.actions.useMove(move.id, snatchUser);
				return null;
			},
		},
		isNonstandard: null,
	},
	snipeshot: {
		inherit: true,
		target: 'any',
		contestType: "Clever",
	},
	snore: {
		inherit: true,
		basePower: 90,
	},
	snowscape: {
		inherit: true,
		desc: "For 5 turns, the weather becomes Snow. During the effect, the Defense of Ice-type Pokemon is multiplied by 1.5 when taking damage from a physical attack. At the end of each turn except the last, all active Pokemon lose 1/16 of their maximum HP, rounded down, unless they are an Ice type or have the Ice Breaker, Ice Body, Magic Guard, Magma Armor, Overcoat, Purifying Salt, Snow Cloak, or Snow Plow Abilities. If a Pokemon is frozen, the residual damage will combine to 1/8 of its max HP sourced from being frozen. Lasts for 8 turns if the user is holding Icy Rock. Fails if the current weather is Snow.",
		shortDesc: "For 5 turns: Ice types 1.5x Def, cold hurts others.",
	},
	soak: {
		inherit: true,
		onHit(target) {
			const targetTypes = target.getTypes();
			let succeeded = false;
			if ((targetTypes.length > 1 && targetTypes[1] === "Water") || targetTypes.join() === "Water") return false;
			if (targetTypes[0] === "Water"){ //Due to above line, this is true only if the target is dual-typed
				if (target.setType("Water")) succeeded = true;
			} else {
				if (target.setType([targetTypes[0],"Water"]), true) succeeded = true;
			}
			if(succeeded) this.add('-start', target, 'typechange', target.getTypes().join('/'), '[from] move: Soak');
			else {
				this.add('-fail', target);
				return null;
			}
		},
		shortDesc: "Changes the target's secondary typing to Water.",
		desc: "The target's second typing is replaced with the Water type. If the target's first typing is Water and it has a second typing, it will become pure Water. If the target is already a pure Water-type or has Water as a second typing, the move fails.",
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	spacialrend: {
		inherit: true,
		accuracy: 100,
	},
	spark: {
		inherit: true,
		basePower: 60,
	},
	sparklingaria: {
		num: 664,
		accuracy: 100,
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'brn') {
				this.debug('BP doubled on burned target');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Sparkling Aria",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		onHit(target) {
			if (target.status === 'brn') target.cureStatus();
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Beautiful",
	},
	spicyextract: {
		inherit: true,
		volatileStatus: 'taunt',
		desc: "Raises the target's Attack by 2 stages, lowers its Defense by 2 stages, and inflicts a taunt.",
		shortDesc: "Raises target's Atk and lowers Def by 2. Taunts.",
	},
	spikecannon: {
		inherit: true,
		flags: {protect: 1, mirror: 1, bullet: 1},
		isNonstandard: null,
	},
	spikes: {
		inherit: true,
		flags: {reflectable: 1, nonsky: 1, snatch: 1},
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				//if (pokemon.side.sideConditions['safeguard'] || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('limber')) return;
				const damageAmounts = [0, 15, 20, 24]; // 1/8, 1/6, 1/5
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 120);
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Limber Abilities. Can be used up to three times before failing. Opponents lose 1/8 of their maximum HP with one layer, 1/6 of their maximum HP with two layers, and 1/5 of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, or if any Pokemon uses Defog or Rototiller successfully.",
	},
	spinout: {
		inherit: true,
		basePower: 110,
	},
	spiritbreak: {
		inherit: true,
		basePower: 70,
		contestType: "Tough",
	},
	spitup: {
		inherit: true,
		onTry(pokemon, move) {
			if (!pokemon.volatiles['stockpile']) {
				return false;
			}
		},
		onModifyMove(move, source, target) {
			if (source.volatiles['stockpile']?.layers === 3) {
				move.target = 'allAdjacentFoes';
			}
		},
		desc: "Power is equal to 100 times the user's Stockpile count. If the user's Stockpile count is 3, the move will target all adjacent foes. Fails if the Stockpile count is 0. Whether or not this move is successful, the user's Defense and Special Defense decrease by as many stages as Stockpile had increased them, and the user's Stockpile count resets to 0.",
		shortDesc: "Damage based on Stockpile charges; spread w/ max.",
	},
	splash: {
		inherit: true,
		onPrepareHit(target, source, move){
			if (!source.canFloat()) return false;
		},
	},
	spore: {
		inherit: true,
		pp: 10,
	},
	stealthrock: {
		inherit: true,
		flags: {reflectable: 1, nonsky: 1, snatch: 1},
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasType('Rock')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Rock-type Pokemon or has the Limber Ability. Fails if the effect is already active on the opposing side. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, or if any Pokemon uses Defog or Rototiller.",
		shortDesc: "Hurts non-Rock foes on switch-in w/ Rock matchup.",
	},
	steameruption: {
		inherit: true,
		accuracy: 90,
	},
	steelbeam: {
		inherit: true,
		accuracy: 100,
		onAfterMove(pokemon, target, move) {
			if (pokemon.moveThisTurnResult != null && move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Steel Beam'), true);
			}
		},
		desc: "If this move is successful, the user loses 1/2 of its maximum HP, rounded up.",
		shortDesc: "User loses 50% max HP after hit.",
		contestType: "Cool", 
	},
	stickyweb: {
		inherit: true,
		flags: {reflectable: 1, snatch: 1, mustpressure: 1},
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				//if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('limber')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectState.source, this.dex.getActiveMove('stickyweb'));
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, lowering the Speed by 1 stage of each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Limber Abilities. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, or if any Pokemon uses Defog or Rototiller.",
	},
	stoneaxe: {
		num: 830,
		name: "Stone Axe",
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		priority: 0,
		target: "normal",
		type: "Rock",
		willCrit: true,
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or Shelter or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always results in a critical hit.",
	},
	storedpower: {
		inherit: true,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			return 20 * (1 + pokemon.positiveBoosts());
		},
	},
	strangesmoke: {
		num: 790,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Strange Smoke",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Strange Steam", target);
		},
		desc: "Has a 20% chance to confuse the target.",
		shortDesc: "20% chance to confuse the target.",
	},
	strength: {
		inherit: true,
		basePower: 85,
	},
	stringshot: {
		inherit: true,
		accuracy: 85,
		pp: 15,
	},
	strugglebug: {
		inherit: true,
		target: "normal",
		desc: "Has a 100% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "100% chance to lower the target's Sp. Atk by 1.",
	},
	stuffcheeks: {
		inherit: true,
		onTry(source) {
			const item = source.getItem();
			if (!(item.isBerry && source.eatItem())) {
				return false;
			}
		},
		desc: "This move cannot be selected unless the user is holding a Berry. The user eats its Berry, activating its effects immediately. Fails if the user is not holding a Berry.",
		shortDesc: "User eats berry; most hold Berry to use.",
		contestType: "Cute",
	},
	submission: {
		inherit: true,
		basePower: 90,
		accuracy: 100,
		isNonstandard: null,
	},
	superfang: {
		inherit: true,
		damageCallback(pokemon, target) {
			if(pokemon.hasAbility('strongjaw')){
				return this.clampIntRange(target.getUndynamaxedHP() * .75, 1);
			} else {
				return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
			}
		},
		desc: "Deals damage to the target equal to half of its current HP, rounded down. If the user has the Strong Jaw Ability, the damage is instead equal to 3/4 of its current HP, rounded down. The damage cannot be less than 1.",
	},
	supersonic: {
		inherit: true,
		accuracy: 70,
	},
	surgingstrikes: {
		num: 818,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Surging Strikes",
		pp: 5,
		priority: 0,
		flags: {contact: 1, punch: 1, mirror: 1},
		breaksProtect: true,
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Water",
		desc: "Hits three times. If this move is successful, it breaks through the target's Bunker Down, Detect, King's Shield, Obstruct, Protect, Psy Bubble, Silk Trap, Slip Away, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Hits 3 times. Breaks protection for this turn.",
	},
	swagger: {
		inherit: true,
		flags: {reflectable: 1, mirror: 1, allyanim: 1},
	},
	swallow: {
		inherit: true,
		onHit(pokemon) {
			const healAmount = [0.5, 1, 1];
			const healedBy = this.heal(this.modify(pokemon.maxhp, healAmount[(pokemon.volatiles['stockpile'].layers - 1)]));
			if (pokemon.volatiles['stockpile'].layers === 3){
				pokemon.cureStatus();
			}
			pokemon.removeVolatile('stockpile');
			return !!healedBy;
		},
		desc: "The user restores its HP based on its Stockpile count. Restores 1/2 of its maximum HP if it's 1, rounded half down, and all of its HP if it's 2 or 3. If it has 3 Stockpile charges, it is also cured of non-volatile status conditions. Fails if the user's Stockpile count is 0. The user's Defense and Special Defense decrease by as many stages as Stockpile had increased them, and the user's Stockpile count resets to 0.",
		shortDesc: "Heals based on Stockpile charges, +status w/ max.",
	},
	sweetkiss: {
		inherit: true,
		accuracy: 100,
		flags: {protect: 1, reflectable: 1, mirror: 1, contact: 1},
	},
	synchronoise: {
		num: 485,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Synchronoise",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onBasePowerPriority: 6,
		onBasePower(basePower, user, target, move){
			if(target.hasType(user.getTypes())){
				this.debug('Synchronoise power boost');
				return basePower * 2;
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		contestType: "Clever",
		desc: "Power doubles if the target shares at least one type with the user.",
		shortDesc: "Power doubles if foe shares type with user.",
		isNonstandard: null,
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.75;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'snow':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	tailslap: {
		inherit: true,
		accuracy: 100,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	tailglow: {
		inherit: true,
		pp: 10,
	},
	takedown: {
		inherit: true,
		accuracy: 100,
		pp: 15,
	},
	teatime: {
		inherit: true,
		name: "Tea Time",
		onTryMove(source, target, move){
			if('magicroom' in this.field.pseudoWeather){
				this.add('-fail', source);
				return false;
			}
		},
		onHitField(target, source, move) {
			let result = false;
			for (const active of this.getAllActive()) {
				if (this.runEvent('Invulnerability', active, source, move) === false) {
					this.add('-miss', source, active);
					result = true;
				} else {
					const item = active.getItem();
					if (active.hp && item.isBerry) {
						if(active.eatItem()) result = true;
					}
				}
			}
			return result;
		},
	},
	technoblast: {
		inherit: true,
		flags: {protect: 1, mirror: 1, bullet: 1},
		isNonstandard: null,
	},
	telekinesis: {
		inherit: true,
		condition: {
			duration: 3,
			onStart(target) {
				if (!target.canFloat()) return false;
				this.add('-start', target, 'Telekinesis');
			},
			onAccuracyPriority: -1,
			onAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 16,
			onEnd(target) {
				this.add('-end', target, 'Telekinesis');
			},
		},
		isNonstandard: null,
		desc: "For 3 turns, the target cannot avoid any attacks made against it, other than OHKO moves, as long as it remains active. During the effect, the target is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability as long as it remains active. If the target uses Baton Pass, the replacement will gain the effect. The moves Dig, Dive, Ingrain, and Roost will fail if used by the target while the effect is active. This move will fail if the target is unable to gain the floating status.",
		end: "  [POKEMON] was returned to the ground!",
	},
	teleport: {
		inherit: true,
		priority: 0,
		flags: {snatch: 1},
	},
	temperflare: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, defrost: 1},
	},
	terablast: {
		num: 851,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Tera Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[anim] Tera Blast ' + move.type);
		},
		onModifyType(move, pokemon, target) {
			if(pokemon.ignoringItem()) return;
			const itemname = pokemon.getItem().name;
			if (itemname.endsWith('Tera Shard')) {
				if (itemname === "Stellar Tera Shard") {
					if (pokemon.species.baseSpecies === "Terapagos" && pokemon.species.forme === "Stellar") {
						console.log(this.getBestEffectiveness(pokemon, target));
						move.type = this.getBestEffectiveness(pokemon, target);
					}
				} else {
					move.type = itemname.substr(0, itemname.length - 11);
				}
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		desc: "This move's type matches the Pokemon's held Tera Shard, and its category matches whichever of the Pokemon's attacking stats is higher. If used by Stellar Form Terapagos, the move's type will be the one with the best effectiveness against the target.",
		shortDesc: "Type matches held Tera Shard, category matches higher stat.",
		contestType: "Beautiful",
	},
	terastarstorm: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {},
		desc: "If the user is a Terapagos in Stellar Form, this move hits all opposing Pokemon.",
		shortDesc: "If Stellar Terapagos, hits all opposing Pokemon.",
		noSketch: null,
		contestType: "Beautiful",
	},
	thousandarrows: {
		num: 614,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Thousand Arrows",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Beautiful",
		desc: "This move ignores immunity to Ground moves, treating the Flying-type as neutrally effective.",
		shortDesc: "Hits adjacent foes. Can hit floating foes.",
		isNonstandard: null,
	},
	throatchop: {
		inherit: true,
		basePower: 75,
	},
	thundercage: {
		inherit: true,
		accuracy: 85,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4 turns.",
		contestType: "Clever",
	},
	thunderfang: {
		inherit: true,
		accuracy: 100,
	},
	tickle: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, contact: 1},
	},
	torchsong: {
		inherit: true,
		basePower: 70,
	},
	toxic: {
		inherit: true,
		accuracy: 100,
		desc: "Badly poisons the target.",
		shortDesc: "Badly poisons the target.",
	},
	toxicspikes: {
		inherit: true,
		flags: {reflectable: 1, nonsky: 1, snatch: 1},
		condition: {
			// this is a side condition
			onSideStart(side, source) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				if(source.hasAbility('potency')){
					this.debug("Potency double-setting Toxic Spikes");
					this.effectState.layers = 2;
				} else {
					this.effectState.layers = 1;
				}
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, poisoning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Limber Abilities. Can be used up to two times before failing. Opposing Pokemon become poisoned with one layer and badly poisoned with two layers. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, if any Pokemon uses Defog or Rapid Spin, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
	},
	toxicthread: {
		num: 672,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Toxic Thread",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onHit(target, source, move) {
			let success = target.trySetStatus('psn', source, move);
			if(target.addVolatile('trapped', source, move, 'trapper')) success = true;
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
		shortDesc: "Poisons the target and prevents it from switching out for four turns (six turns if the user is holding Grip Claw).",
		desc: "Traps target for 4 turns and poisons it.",
	},
	triattack: {
		inherit: true,
		basePower: 90,
		secondary: {
			chance: 30,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source, move);
				} else if (result === 1) {
					target.trySetStatus('par', source, move);
				} else {
					target.trySetStatus('frz', source, move);
				}
			},
		},
		desc: "Has a 30% chance to either burn, freeze, or paralyze the target, with an equal chance for each one.",
		shortDesc: "30% chance to paralyze or burn or freeze target.",
	},
	trickortreat: {
		inherit: true,
		onHit(target) {
			let succeeded = false;
			const targetTypes = target.getTypes();
			if ((targetTypes.length > 1 && targetTypes[1] === "Ghost") || targetTypes.join() === "Ghost") return false;
			if (targetTypes[0] === "Ghost"){ //Due to above line, this is true only if the target is dual-typed
				if (target.setType("Ghost")) succeeded = true;
			} else {
				if (target.setType([targetTypes[0],"Ghost"]), true) succeeded = true;
			}
			if(succeeded) this.add('-start', target, 'typechange', target.getTypes().join('/'), '[from] move: Trick-or-Treat');
			else {
				this.add('-fail', target);
				return null;
			}
		},
		isNonstandard: null,
		shortDesc: "Changes the target's secondary typing to Ghost.",
		desc: "The target's second typing is replaced with the Ghost type. If the target's first typing is Ghost and it has a second typing, it will become pure Ghost. If the target is already a pure Ghost-type or has Ghost as a second typing, the move fails.",
	},
	triplekick: {
		inherit: true,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 10 * move.hit + 10;
		},
		desc: "Hits three times. Power increases to 30 for the second hit and 40 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
	},
	tropkick: {
		inherit: true,
		pp: 10,
	},
	trumpcard: {
		num: 376,
		accuracy: 100,
		basePower: 0,
		onTry(pokemon, target) {
			if (!pokemon.side.totalFainted) return false;
		},
		basePowerCallback(pokemon, target, move) {
			return 40 * (pokemon.side.totalFainted);
		},
		category: "Special",
		name: "Trump Card",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		desc: "This move's power increases by 40 for each fainted member of the user's party.",
		shortDesc: "+40 power for each fainted party member.",
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
		isNonstandard: null,
	},
	twister: {
		inherit: true,
		twoType: "Flying",
		secondary: null,
		shortDesc: "Both Dragon and Flying types.",
		desc: "This move is both Dragon and Flying typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
	},
	vcreate: {
		inherit: true,
		accuracy: 100,
		isNonstandard: null,
	},
	vengefulspirit: {
		num: 889,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(350, 50 + 50 * pokemon.m.timesAttacked); //Reset is implemented in scripts.ts as edit to pokemon.
		},
		category: "Physical",
		name: "Vengeful Spirit",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage");
		},
		desc: "Power is equal to 50+(X*50), where X is the total number of times the user has been hit by a damaging attack since it was sent out, even if the user did not lose HP from the attack. Each hit of a multi-hit attack is counted, but confusion damage is not counted. Caps at 350 power.",
		shortDesc: "+50 power for each time user was hit since switch-in.",
	},
	visegrip: {
		inherit: true,
		basePower: 50,
	},
	vitalthrow: {
		inherit: true,
		basePower: 85,
		isNonstandard: null,
	},
	wakeupslap: {
		inherit: true,
		basePower: 75,
		isNonstandard: null,
	},
	waterpledge: {
		inherit: true,
		onModifyMove(move) {
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Grass';
				move.forceSTAB = true;
				move.sideCondition = 'grasspledge';
			}
			if (move.sourceEffect === 'firepledge') {
				move.type = 'Fire';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
			}
		},
		desc: "If one of the user's allies chose to use Fire Pledge or Grass Pledge this turn, the slower Pokemon will takes its turn immediately after the faster one; the faster Pledge will do nothing and the slower one will have 150 BP, obtain STAB regardless of the user's type, and set a secondary effect. If combined with Fire Pledge, a rainbow appears on the user's side for 4 turns, which doubles secondary effect chances and stacks with the Serene Grace Ability, except effects that cause flinching can only have their chance doubled once. If combined with Grass Pledge, a swamp appears on the target's side for 4 turns, which halves the Speed of all grounded Pokemon on that side. This move does not consume the user's Grass Gem.",
	},
	waterpulse: {
		inherit: true,
		basePower: 65,
		flags: {protect: 1, bullet: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		desc: "Has a 30% chance to confuse the target.",
		shortDesc: "30% chance to confuse.",
	},
	watersport: {
		inherit: true,
		condition: {
			duration: 5,
			onFieldStart(side, source) {
				this.add('-fieldstart', 'move: Water Sport', '[of] ' + source);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'brn') {
					this.debug('Water Sport prevents burns');
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'move: Water Sport');
					return null;
				}
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('water sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onFieldResidualOrder: 21,
			onFieldEnd() {
				this.add('-fieldend', 'move: Water Sport');
			},
		},
		isNonstandard: null,
		desc: "For 5 turns, all Fire-type attacks used by any active Pokemon have their power multiplied by 0.33, and Pokemon cannot become burned. Fails if this effect is already active.",
		shortDesc: "For 5 turns, no burn and Fire-type attacks have 1/3 power.",
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			if ('midnight' in this.field.pseudoWeather){
				move.type = 'Dark';
			} //no 'else' because effectiveWeather will return blank with Midnight active
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'snow':
				move.type = 'Ice';
				break;
			case 'deltastream':
				move.type = 'Flying';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if ('midnight' in this.field.pseudoWeather){
				move.basePower *= 2;
			} //no 'else' because effectiveWeather will return blank with Midnight active
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'snow':
			case 'deltastream':
				move.basePower *= 2;
				break;
			}
		},
		desc: "Power doubles if a weather condition is active, and this move's type changes to match. Ice type during Snow, Water type during Primordial Sea or Rain Dance, Rock type during Sandstorm, Fire type during Desolate Land or Sunny Day, and Flying type during Delta Stream. If Midnight is active, it doubles in power and becomes a Dark type move.",
	},
	wickedblow: {
		num: 817,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Wicked Blow",
		pp: 5,
		priority: 0,
		flags: {contact: 1, punch: 1, mirror: 1},
		breaksProtect: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		desc: "If this move is successful, it breaks through the target's Bunker Down, Detect, King's Shield, Obstruct, Protect, Psy Bubble, Silk Trap, Slip Away, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Breaks the target's protection for this turn.",
	},
	wickedtorque: {
		basePower: 100,
		accuracy: 90,
		flags: {protect: 1},
		isNonstandard: null,
		noSketch: null,
	},
	willowisp: {
		inherit: true,
		pp: 20,
	},
	woodhammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	workup: {
		inherit: true,
		pp: 20,
	},
	worryseed: {
		inherit: true,
		pp: 15,
	},
	wrap: {
		inherit: true,
		basePower: 20,
		accuracy: 100,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4 turns.",
	},
	wringout: {
		inherit: true,
		category: "Physical",
		basePowerCallback(pokemon, target) {
			return Math.floor(Math.floor((80 * (100 * Math.floor(target.hp * 4096 / target.maxhp)) + 2048 - 1) / 4096) / 100) + 40;
		},
		isNonstandard: null,
		desc: "Power is equal to 80 * (target's current HP / target's maximum HP) + 40, rounded half down, but not less than 1.",
	},
	xscissor: {
		inherit: true,
		critRatio: 2,
		shortDesc: "High critical hit ratio.",
	},
	zenheadbutt: {
		inherit: true,
		accuracy: 100,
	},
	zingzap: {
		inherit: true,
		basePower: 90,
		pp: 15,
		contestType: "Cute",
	},
	/* Moves changed as edits to other elements */
	attract: {
		inherit: true,
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!(source.hasAbility('irresistable') || (pokemon.gender === 'M' && source.gender === 'F') || (pokemon.gender === 'F' && source.gender === 'M'))) {
					this.debug('incompatible gender');
					return false;
				}
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}

				if (effect.id === 'cutecharm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', '[of] ' + source);
				} else if (effect.id === 'destinyknot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				if(pokemon.volatiles['nointerrupt']?.ignore.includes('attract')) return;
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectState.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
		onTryImmunity(target, source) {
			return (source.hasAbility('irresistable') || (target.gender === 'M' && source.gender === 'F') || (target.gender === 'F' && source.gender === 'M'));
		},
	},
	bunkerdown: {
		num: 661,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bunker Down",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'bunkerdown',
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					if(target.hasAbility('potency')) source.trySetStatus('tox', target);
					else source.trySetStatus('psn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.flags['contact']) {
					if(target.hasAbility('potency')) source.trySetStatus('tox', target);
					else source.trySetStatus('psn', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Poison",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baneful Bunker", target);
		},
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon making contact with the user become poisoned. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Bunker Down, Detect, Endure, King's Shield, Obstruct, Protect, Psy Bubble, Rebound, Quick Guard, Silk Trap, Slip Away, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from moves. Contact: poison.",
	},
	charge: {
		inherit: true,
		condition: {
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
			onMoveAborted(pokemon, target, move) {
				if ((move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) && move.id !== 'charge') {
					pokemon.removeVolatile('charge');
				}
			},
			onAfterMove(pokemon, target, move) {
				if ((move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) && move.id !== 'charge') {
					pokemon.removeVolatile('charge');
				}
			},
		},
	},
	disable: {
		inherit: true,
		condition: {
			duration: 5,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				// The target hasn't taken its turn, or Cursed Body activated and the move was not used through Dancer or Instruct
				if (
					this.queue.willMove(pokemon) ||
					(pokemon === this.activePokemon && this.activeMove && !this.activeMove.isExternal)
				) {
					this.effectState.duration--;
				}
				if (!pokemon.lastMove) {
					this.debug('pokemon hasn\'t moved yet');
					return false;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === pokemon.lastMove.id) {
						if (!moveSlot.pp) {
							this.debug('Move out of PP');
							return false;
						} else {
							if (effect.id === 'cursedbody') {
								this.add('-start', pokemon, 'Disable', moveSlot.move, '[from] ability: Cursed Body', '[of] ' + source);
							} else {
								this.add('-start', pokemon, 'Disable', moveSlot.move);
							}
							this.effectState.move = pokemon.lastMove.id;
							return;
						}
					}
				}
				// this can happen if Disable works on a Z-move
				return false;
			},
			onResidualOrder: 14,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Disable');
			},
			onBeforeMovePriority: 7,
			onBeforeMove(attacker, defender, move) {
				if (move.id === this.effectState.move && !(attacker.volatiles['nointerrupt'] && attacker.volatiles['nointerrupt'].ignore.includes('healblock'))) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	electricterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if ((move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onFieldStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onFieldResidualOrder: 21,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
	electrify: {
		inherit: true,
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Electrify');
			},
			onModifyTypePriority: -2,
			onModifyType(move) {
				if (move.id !== 'struggle') {
					this.debug('Electrify making move type electric');
					move.type = 'Electric';
					if(move.twoType) delete move.twoType;
				}
			},
		},
		isNonstandard: null,
	},
	encore: {
		inherit: true,
		condition: {
			duration: 3,
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move) return false;

				const moveIndex = target.moves.indexOf(move.id);
				if (move.flags['failencore'] || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				if (!this.queue.willMove(target)) {
					this.effectState.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if(
				  !(pokemon.volatiles['nointerrupt']?.ignore.includes('encore'))
				  && (move.id !== this.effectState.move)
				)
					return this.effectState.move;
			},
			onResidualOrder: 16,
			onResidual(target) {
				if (target.moves.includes(this.effectState.move) &&
					target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	fling: {
		inherit: true,
		onTryMove(source, target, move){ //Needs to add flags before Fling is used, so the target can check for immunity to the item
			if(source.ignoringItem()) return; //Will properly return false later
			const item = source.getItem();
			if(item.fling && item.fling.flags){
				Object.keys(item.fling.flags).forEach(key => {move.flags[key] = item.fling.flags[key]});
				/*for(const flagNum in item.fling.flags.keys()){
					const flag = item.fling.flags.keys[flag];
					console.log(flag);
					move.flags[flag] = item.fling.flags[flag];
				}*/
			}
		},
		onPrepareHit(target, source, move) {
			if (source.ignoringItem()) return false;
			const item = source.getItem();
			if (!this.singleEvent('TakeItem', item, source.itemData, source, source, move, item)) return false;
			if (!item.fling) return false;
			move.basePower = item.fling.basePower;
			if (item.isBerry) {
				move.onHit = function (foe) {
					if (this.singleEvent('Eat', item, null, foe, null, null)) {
						this.runEvent('EatItem', foe, null, null, item);
						if (item.id === 'leppaberry') foe.staleness = 'external';
					}
					if (item.onEat) foe.ateBerry = true;
				};
			} else if (item.fling.effect) {
				move.onHit = item.fling.effect;
			} else {
				if (!move.secondaries) move.secondaries = [];
				if (item.fling.status) {
					move.secondaries.push({status: item.fling.status});
				} else if (item.fling.volatileStatus) {
					move.secondaries.push({volatileStatus: item.fling.volatileStatus});
				}
				if (item.fling.boosts) {
					move.secondaries.push({boosts: item.fling.boosts});
					move.secondaries.push({chance: 100});
				}
			}
			source.addVolatile('fling');
		},
	},
	geomancy: {
		inherit: true,
		flags: {charge: 1, nonsky: 1, snatch: 1},
		//Stealing only on the execution turn implemented in Snatch itself.
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id) || move.sourceEffect === 'snatch') { //Since it can only be Snatched on the execution turn, execute when Snatched.
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		isNonstandard: null,
	},
	gravity: {
		inherit: true,
		desc: "For 5 turns, the evasiveness of all active Pokemon is multiplied by 0.6. At the time of use, Bounce, Fly, Magnet Rise, Rising Chorus, Sky Drop, and Telekinesis end immediately for all active Pokemon. During the effect, Bounce, Fell Swoop, Fly, Flying Press, High Jump Kick, Jump Kick, Magnet Rise, Sky Drop, Splash, and Telekinesis are prevented from being used by all active Pokemon. Ground-type attacks, Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability can affect Flying types or Pokemon with the Levitate Ability. Fails if this move is already in effect.",
	},
	hiddenpowerfairy: { //Used only in Glyphic Spell Adapt... for now.
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Fairy",
		noSketch: true,
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},
	imprison: {
		inherit: true,
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Imprison');
			},
			onFoeDisableMove(pokemon) {
				for (const moveSlot of this.effectState.source.moveSlots) {
					if (moveSlot.id === 'struggle') continue;
					pokemon.disableMove(moveSlot.id, 'hidden');
				}
				pokemon.maybeDisabled = true;
			},
			onFoeBeforeMovePriority: 4,
			onFoeBeforeMove(attacker, defender, move) {
				if (move.id !== 'struggle' && this.effectState.source.hasMove(move.id) && (attacker.volatiles['nointerrupt'] && !attacker.volatiles['nointerrupt'].imprisoned[this.effectState.source])) {
					this.add('cant', attacker, 'move: Imprison', move);
					return false;
				}
			},
		},
	},
	mirrormove: {
		inherit: true,
		onTryHit(target, source) {
			const move = target.lastMove;
			if(!move) return false;
			if(target.hasAbility('owntempo')){
				this.add('-activate', target, 'ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return false;
			}
			if (!move.flags['mirror']) {
				return false;
			}
			this.actions.useMove(move.id, source, target);
			return null;
		},
		isNonstandard: null,
		desc: "The user uses the last move used by the target. The copied move is used against that target, if possible. Fails if the target has not made a move, if it has the Ability Own Tempo, or if the last move used cannot be copied by this move.",
	},
	mistyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if ((move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon')) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onFieldStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onFieldResidualOrder: 21,
			onFieldResidualSubOrder: 2,
			onFieldEnd(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
	},
	leechseed: {
		num: 73,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Leech Seed",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'leechseed',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.effectState.source.side.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	perishsong: {
		inherit: true,
		onHitField(target, source, move) {
			let result = false;
			let message = false;
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('Invulnerability', pokemon, source, move) === false) {
					this.add('-miss', source, pokemon);
					result = true;
				} else if (this.runEvent('TryHit', pokemon, source, move) === null) {
					result = true;
				} else if(pokemon.volatiles['stasis']){
					this.add('-fail', target, 'move: Stasis'); //Stasis won't activate because this fails adding the status to begin with.
				} else if (!pokemon.volatiles['perishsong']) {
					pokemon.addVolatile('perishsong');
					this.add('-start', pokemon, 'perish3', '[silent]');
					result = true;
					message = true;
				}
			}
			if (!result) return false;
			if (message) this.add('-fieldactivate', 'move: Perish Song');
		},
	},
	pluck: {
		inherit: true,
		onHit(target, source) {
			const item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				target.lastItem = item;
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Pluck', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
					if (item.id === 'leppaberry') target.staleness = 'external';
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		desc: "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately, gaining its effects even if the user's item is being ignored.",
	},
	psychicterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.side === source.side) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.moves.get(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
					}
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if ((move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('psychic terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onFieldStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onFieldResidualOrder: 21,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
			},
		},
	},
	psychup: {
		inherit: true,
		onTryHit(target, source) {
			if(target.hasAbility('owntempo')){
				this.add('-activate', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}
		},
		desc: "The user copies all of the target's current stat stage changes. This move fails if the target has the Ability Own Tempo.",
	},
	roleplay: {
		inherit: true,
		onTryHit(target, source) {
			if (target.ability === source.ability) return false;
			if (target.getAbility().flags['failroleplay'] || source.getAbility().flags['cantsuppress']) return false;
			if(target.hasAbility('owntempo')){
				this.add('-activate', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}
		},
		desc: "The user's Ability changes to match the target's Ability. Fails if the user's Ability is Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, Rage Mode, RKS System, Schooling, Shields Down, Stance Change, Zen Mode, or already matches the target, or if the target's Ability is Alchemy, Own Tempo, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Rage Mode, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, or Zen Mode.",
	},
	sketch: {
		inherit: true,
		onTryHit(target, source) {
			if(target.hasAbility('owntempo')){
				this.add('-activate', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}
		},
		onHit(target, source) {
			const move = target.lastMove;
			if (source.transformed || !move || source.moves.includes(move.id)) return false;
			if (move.noSketch) return false;
			const sketchIndex = source.moves.indexOf('sketch');
			if (sketchIndex < 0) return false;
			const sketchedMove = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
			};
			source.moveSlots[sketchIndex] = sketchedMove;
			source.baseMoveSlots[sketchIndex] = sketchedMove;
			this.add('-activate', source, 'move: Sketch', move.name);
		},
		desc: "This move is permanently replaced by the last move used by the target. The copied move has the maximum PP for that move. Fails if the target has not made a move, if the target has the Ability Own Tempo, if the user has Transformed, or if the move is Sketch, Struggle, or any move the user knows.",
	},
	spectralthief: {
		inherit: true,
		//Spectral Thief getting blocked by Own Tempo implemented in scripts.ts because that's where stat-stealing is implemented
		isNonstandard: null,
		desc: "The target's stat stages greater than 0 are stolen from it and applied to the user before dealing damage. The theft does not occur if the target has the Ability Own Tempo.",
		contestType: "Clever",
	},
	spiderweb: {
		inherit: true,
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move);
		},
		isNonstandard: null,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped.",
		shortDesc: "Traps the target for 4 turns, even if user switches.",
	},
	stormthrow: {
		inherit: true,
		isNonstandard: null,
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or Shelter or has the Battle Armor or Shell Armor Abilities.",
	},
	substitute: {
		inherit: true,
		onTryHit(target) {
			if (target.volatiles['stasis']){
				this.add('-fail', target, 'move: Stasis'); //Stasis won't activate because this fails adding the status (and removing HP) to begin with.
				return null;
			}
			if (target.volatiles['substitute']) {
				this.add('-fail', target, 'move: Substitute');
				return null;
			}
			if (target.hp <= target.maxhp / 4 || target.maxhp === 1) { // Shedinja clause
				this.add('-fail', target, 'move: Substitute', '[weak]');
				return null;
			}
		},
		condition: {
			onStart(target, source, effect) {
				this.add('-start', target, 'Substitute');
				this.effectState.hp = Math.floor(target.maxhp / 4);
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit(target, source, move) {
				if (target === source || move.flags['bypasssub'] || move.infiltrates) {
					return;
				}
				let damage = this.actions.getDamage(source, target, move);
				if (!damage && damage !== 0) {
					this.add('-fail', source);
					this.attrLastMove('[still]');
					return null;
				}
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) {
					return damage;
				}
				if (damage > target.volatiles['substitute'].hp) {
					damage = target.volatiles['substitute'].hp as number;
				}
				target.volatiles['substitute'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['substitute'].hp <= 0) {
					if (move.ohko) this.add('-ohko');
					target.removeVolatile('substitute');
				} else {
					this.add('-activate', target, 'move: Substitute', '[damage]');
				}
				if (move.recoil || move.id === 'chloroblast') {
					this.damage(this.actions.calcRecoilDamage(damage, move, source), source, target, 'recoil');
				}
				if (move.drain) {
					this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source, target, 'drain');
				}
				this.singleEvent('AfterSubDamage', move, null, target, source, move, damage);
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return this.HIT_SUBSTITUTE;
			},
			onTrapPokemonPriority: -10,
			onTrapPokemon(pokemon) {
				if(!pokemon.volatiles['meanlooked']){
					pokemon.trapped = false;
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Substitute');
			},
		},
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			if(!pokemon.volatiles['meanlooked']){
				pokemon.trapped = false;
			}
		},
	},
	taunt: {
		inherit: true,
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectState.duration++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt');
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
				if (move.category === 'Status' && move.id !== 'mefirst' && !(attacker.volatiles['nointerrupt']?.ignore.includes('taunt'))) {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
	},
	transform: {
		inherit: true,
		onTryHit(target, source) {
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its attributes');
				return false;
			}
		},
	},
	wideguard: {
		inherit: true,
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Wide Guard');
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Wide Guard blocks all spread moves, as well as Flame Burst explosion
				if (move?.target !== 'allAdjacent' && move.target !== 'allAdjacentFoes' && move.name !== "Burst") {
					return;
				}
				this.add('-activate', target, 'move: Wide Guard');
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
	},
	
	/* Move-calling move exception updates */
	assist: {
		inherit: true,
		onHit(target) {			
			const moves = [];
			for (const pokemon of target.side.pokemon) {
				if (pokemon === target || pokemon.hasAbility('owntempo')) continue;
				for (const moveSlot of pokemon.moveSlots) {
					const moveid = moveSlot.id;
					if (move.flags['noassist']) continue;
					const move = this.dex.moves.get(moveid);
					moves.push(moveid);
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.actions.useMove(randomMove, target);
		},
		isNonstandard: null,
		desc: "A random move among those known by the user's party members is selected for use. Does not select Assist, Beak Blast, Belch, Bestow, Bounce, Bunker Down, Circle Throw, Copycat, Counter, Covet, Destiny Bond, Detect, Dig, Dive, Dragon Tail, Endure, Feint, Fly, Focus Punch, Follow Me, Helping Hand, King's Shield, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Phantom Force, Play Dead, Protect, Psy Bubble, Rage Powder, Rebound, Revival Blessing, Roar, Shadow Force, Shell Trap, Silk Trap, Sketch, Sky Drop, Sleep Talk, Slip Away, Snatch, Spiky Shield, Spotlight, Struggle, Switcheroo, Thief, Transform, Trick, or Whirlwind.",
	},
	copycat: {
		inherit: true,
		onHit(pokemon) {
			let move: Move | ActiveMove | null = this.lastMove;
			if (!move) return;
			if(move.uncopyable){
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return false;
			}
			if (move.flags['failcopycat']) {
				return false;
			}
			this.actions.useMove(move.id, pokemon);
		},
		desc: "The user uses the last move used by any Pokemon, including itself. Fails if no move has been used, if the last move was used by a Pokemon with Own Tempo, or if the last move used was Assist, Beak Blast, Belch, Bestow, Bunker Down, Circle Throw, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Dragon Tail, Dynamax Cannon, Endure, Feint, Focus Punch, Follow Me, Helping Hand, King's Shield, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Obstruct, Play Dead, Protect, Psy Bubble, Rage Powder, Rebound, Roar, Shell Trap, Silk Trap, Sketch, Sleep Talk, Slip Away, Snatch, Spiky Shield, Spotlight, Struggle, Switcheroo, Thief, Transform, Trick, or Whirlwind.",
	},
	mefirst: {
		inherit: true,
		onTryHit(target, source) {
			const action = this.queue.willMove(target);
			if (!action) return false;
			const noMeFirst = [
				'beakblast', 'counter', 'covet', 'focuspunch', 'mefirst', 'metalburst', 'mirrorcoat', 'rebound', 'shelltrap', 'struggle', 'thief',
			];
			const move = this.dex.getActiveMove(action.move.id);
			if(move.uncopyable){
				this.add('-activate', target, 'ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}
			if (move.category === 'Status' || move.flags['failmefirst']) return false;

			source.addVolatile('mefirst');
			this.actions.useMove(move, source, target);
			return null;
		},
		isNonstandard: null,
		desc: "The user uses the move the target chose for use this turn against it, if possible, with its power multiplied by 1.5. The move must be a damaging move other than Beak Blast, Chatter, Counter, Covet, Focus Punch, Me First, Metal Burst, Mirror Coat, Rebound, Shell Trap, Struggle, or Thief. Fails if the target moves before the user, or if the target has the Ability Own Tempo. Ignores the target's substitute for the purpose of copying the move.",
	},
	metronome: {
		inherit: true,
		noMetronome: [
			"After You", "Assist", "Aura Wheel", "Beak Blast", "Behemoth Bash", "Behemoth Blade", "Belch", "Bestow", "Body Press", "Bunker Down", "Copycat", "Counter", "Covet", "Crafty Shield", "Destiny Bond", "Detect", "Endure", "Feint", "Focus Punch", "Follow Me", "Helping Hand", "Hyperspace Fury", "Instruct", "King's Shield", "Light of Ruin", "Mat Block", "Me First", "Metronome", "Mimic", "Mirror Coat", "Mirror Move", "Nature Power", "Obstruct", "Play Dead", "Protect", "Psy Bubble", "Quash", "Quick Guard", "Rage Powder", "Rebound", "Revival Blessing", "Shell Trap", "Silk Trap", "Sketch", "Sleep Talk", "Slip Away", "Snap Trap", "Snatch", "Snore", "Spiky Shield", "Spotlight", "Struggle", "Switcheroo", "Thief", "Transform", "Trick", "Wide Guard"
		],
		desc: "A random move is selected for use, other than After You, Assist, Aura Wheel, Beak Blast, Behemoth Bash, Behemoth Blade, Belch, Bestow, Body Press, Bunker Down, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Endure, Feint, Focus Punch, Follow Me, Helping Hand, Hyperspace Fury, Instruct, King's Shield, Light of Ruin, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Obstruct, Play Dead, Protect, Psy Bubble, Quash, Quick Guard, Rage Powder, Rebound, Revival Blessing, Shell Trap, Silk Trap, Sketch, Sleep Talk, Slip Away, Snap Trap, Snatch, Snore, Spiky Shield, Spotlight, Struggle, Switcheroo, Thief, Transform, Trick, or Wide Guard.",
	},
	mimic: {
		inherit: true,
		onHit(target, source) {
			const move = target.lastMove;
			if (source.transformed || !move) return false;
			if(move.uncopyable){
				this.add('-activate', target, 'ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return false;
			}
			if (move.flags['failmimic'] || source.moves.includes(move.id)) {
				return false;
			}
			if (move.isZ || move.isMax) return false;
			const mimicIndex = source.moves.indexOf('mimic');
			if (mimicIndex < 0) return false;

			source.moveSlots[mimicIndex] = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			this.add('-start', source, 'Mimic', move.name);
		},
		desc: "While the user remains active, this move is replaced by the last move used by the target. The copied move has the maximum PP for that move. Fails if the target has not made a move, if it has the Ability Own Tempo, if the user has Transformed, if the user already knows the move, or if the move is Mimic, Sketch, Struggle, or Transform.",
	},
	sleeptalk: {
		inherit: true,
		onHit(pokemon) {
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				if (!moveid) continue;
				const move = this.dex.moves.get(moveid);
				if (move.flags['nosleeptalk'] || move.flags['charge']) {
					continue;
				}
				moves.push(moveid);
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.actions.useMove(randomMove, pokemon);
		},
		desc: "One of the user's known moves, besides this move, is selected for use at random. Fails if the user is not asleep. The selected move does not have PP deducted from it, and can currently have 0 PP. This move cannot select Assist, Beak Blast, Belch, Bide, Copycat, Focus Punch, Me First, Metronome, Mimic, Mirror Move, Nature Power, Psy Bubble, Revival Blessing, Shell Trap, Sketch, Sleep Talk, Slip Away, Struggle, Uproar, or any two-turn move.",
	},
	
	/* Renamed moves */
	axekick: null,
	banefulbunker: null,
	chillywater: {
		num: 886,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Chilly Water",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Chilling Water", target);
		},
		desc: "Has a 100% chance to lower the target's Attack by 1 stage.",
		shortDesc: "100% chance to lower the target's Attack by 1.",
	},
	chillingwater: null,
	compensation: {
		num: 808,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Compensation",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source) {
			if (source.statsLoweredThisTurn) {
				this.debug('compensation buff');
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lash Out", target);
		},
		desc: "Power doubles if the user had a stat stage lowered since it finished its last turn.",
		shortDesc: "2x power if user had stat lowered since its last turn.",
	},
	doubleshock: null,
	flowertrick: null,
	hail: null,
	lunarray: {
		num: 714,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Lunar Ray",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moongeist Beam", target);
		},
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
	},
	moongeistbeam: null,
	supercellslam: null,
	psyblade: null,
	psychicfangs: null,
	psyshieldbash: null,
	ragefist: null,
	solarimpact: {
		num: 713,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Solar Impact",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sunsteel Strike", target);
		},
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
	},
	sunsteelstrike: null,
	strangesteam: null,
	springleap: {
		num: 884,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Spring Leap",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Cute",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},
	tantrum: {
		num: 707,
		accuracy: 100,
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.moveLastTurnResult === false) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Tantrum",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stomping Tantrum", target);
		},
		desc: "Power doubles if the user's last move on the previous turn, including moves called by other moves or those used through Instruct, Magic Coat, Snatch, or the Dancer or Magic Bounce Abilities, failed to do any of its normal effects, not including damage from an unsuccessful High Jump Kick, Jump Kick, or Mind Blown, or if the user was prevented from moving by any effect other than recharging or Sky Drop. A move that was blocked by Baneful Bunker, Detect, King's Shield, Protect, Spiky Shield, Crafty Shield, Mat Block, Quick Guard, or Wide Guard will not double this move's power, nor will Bounce or Fly ending early due to the effect of Gravity or Smack Down.",
		shortDesc: "Power doubles if the user's last move failed.",
	},
	stompingtantrum: null,
	trailhead: {
		num: 885,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Trailhead",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Grass",
		desc: "Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		contestType: "Cute",
	},
	trailblaze: null,
	warriorssoul: {
		num: 775,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Warrior's Soul",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onTryHit(pokemon, target, move) {
			if (pokemon.hp <= (pokemon.maxhp * 33 / 100) || pokemon.maxhp === 1) {
				return false;
			}
			if (!this.boost(move.boosts as SparseBoostsTable)) return null;
			delete move.boosts;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp * 33 / 100);
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Dragon",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clangorous Soul", target);
		},
		desc: "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage in exchange for the user losing 33% of its maximum HP, rounded down. Fails if the user would faint or if its Attack, Defense, Special Attack, Special Defense, and Speed stat stages would not change.",
		shortDesc: "User loses 33% of its max HP. +1 to all stats.",
	},
	clangoroussoul: null,
	/* Description updates */
	feint: {
		inherit: true,
		desc: "If this move is successful, it breaks through the target's Bunker Down, Detect, King's Shield, Obstruct, Protect, Psy Bubble, Silk Trap, Slip Away, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Breaks the target's protection for this turn.",
	},
	firespin: {
		inherit: true,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4 turns.",
	},
	magmastorm: {
		inherit: true,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4 turns.",
	},
	infestation: {
		inherit: true,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4 turns.",
	},
	sandtomb: {
		inherit: true,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4 turns.",
	},
	spiritshackle: {
		inherit: true,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps target for 4 turns.",
		contestType: "Cool",
	},
	thousandwaves: {
		inherit: true,
		isNonstandard: null,
		desc: "Prevents the targets from switching out for four turns (six turns if the user is holding Grip Claw). The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps foe(s) for 4 turns.",
	},
	whirlpool: {
		inherit: true,
		desc: "Prevents the target from switching out for four turns (six turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field or if the target uses Rapid Spin successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4 turns.",
	},
	/* Restorations */
	aromatherapy: {
		inherit: true,
		isNonstandard: null,
	},
	barrier: {
		inherit: true,
		isNonstandard: null,
	},
	bestow: {
		inherit: true,
		isNonstandard: null,
	},
	bubble: {
		inherit: true,
		isNonstandard: null,
	},
	camouflage: {
		inherit: true,
		isNonstandard: null,
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
		noSketch: null,
	},
	chipaway: {
		inherit: true,
		isNonstandard: null,
	},
	craftyshield: {
		inherit: true,
		isNonstandard: null,
	},
	dizzypunch: {
		inherit: true,
		isNonstandard: null,
	},
	dragonrage: {
		inherit: true,
		isNonstandard: null,
	},
	dualchop: {
		inherit: true,
		isNonstandard: null,
	},
	feintattack: {
		inherit: true,
		isNonstandard: null,
	},
	frustration: {
		inherit: true,
		isNonstandard: null,
	},
	geargrind: {
		inherit: true,
		isNonstandard: null,
	},
	grudge: {
		inherit: true,
		isNonstandard: null,
	},
	headcharge: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerbug: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerdark: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerdragon: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerelectric: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerfighting: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerfire: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerflying: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerghost: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowergrass: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerground: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerice: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerpoison: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerpsychic: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerrock: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowersteel: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpowerwater: {
		inherit: true,
		isNonstandard: null,
	},
	iondeluge: {
		inherit: true,
		isNonstandard: null,
	},
	karatechop: {
		inherit: true,
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	/*lightofruin: {
		inherit: true,
		isNonstandard: null,
	},*/
	luckychant: {
		inherit: true,
		isNonstandard: null,
	},
	magiccoat: {
		inherit: true,
		isNonstandard: null,
	},
	magnetbomb: {
		inherit: true,
		isNonstandard: null,
	},
	magnitude: {
		inherit: true,
		isNonstandard: null,
	},
	matblock: {
		inherit: true,
		isNonstandard: null,
	},
	mindblown: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	ominouswind: {
		inherit: true,
		isNonstandard: null,
	},
	plasmafists: {
		inherit: true,
		isNonstandard: null,
	},
	powder: {
		inherit: true,
		isNonstandard: null,
	},
	poweruppunch: {
		inherit: true,
		isNonstandard: null,
	},
	psychoshift: {
		inherit: true,
		isNonstandard: null,
	},
	psywave: {
		inherit: true,
		isNonstandard: null,
	},
	purify: {
		inherit: true,
		isNonstandard: null,
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	searingshot: {
		inherit: true,
		isNonstandard: null,
	},
	silverwind: {
		inherit: true,
		isNonstandard: null,
	},
	skullbash: {
		inherit: true,
		isNonstandard: null,
	},
	sonicboom: {
		inherit: true,
		isNonstandard: null,
	},
	spotlight: {
		inherit: true,
		isNonstandard: null,
	},
	steamroller: {
		inherit: true,
		isNonstandard: null,
	},
	twineedle: {
		inherit: true,
		isNonstandard: null,
	},
	venomdrench: {
		inherit: true,
		isNonstandard: null,
	},
	/* Junkyard */
	appleacid: null,
	bittermalice: null,
	bleakwindstorm: null,
	bloodmoon: null,
	burningbulwark: null,
	burningjealousy: null,
	ceaselessedge: null,
	celebrate: null,
	chillyreception: null,
	coaching: null,
	comeuppance: null,
	corrosivegas: null,
	dragoncheer: null,
	decorate: null,
	doodle: null,
	dualwingbeat: null,
	electroshot: null,
	esperwing: null,
	expandingforce: null,
	fierywrath: null,
	flipturn: null,
	freezingglare: null,
	gearup: null,
	grassyglide: null,
	gravapple: null,
	headlongrush: null,
	holdhands: null,
	hydrosteam: null,
	hyperdrill: null,
	icespinner: null,
	infernalparade: null,
	kinesis: null,
	kowtowcleave: null,
	luminacrash: null,
	lunarblessing: null,
	matchagotcha: null,
	mightycleave: null,
	mistyexplosion: null,
	makeitrain: null,
	mortalspin: null,
	mountaingale: null,
	mysticalpower: null,
	psychicnoise: null,
	ragingbull: null,
	ragingfury: null,
	risingvoltage: null,
	sandsearstorm: null,
	scaleshot: null,
	scorchingsands: null,
	shadowstrike: null,
	shedtail: null,
	shellsidearm: null,
	skittersmack: null,
	springtidestorm: null,
	steelroller: null,
	syrupbomb: null,
	tachyoncutter: null,
	takeheart: null,
	terrainpulse: null,
	thunderclap: null,
	thunderouskick: null,
	tidyup: null,
	triplearrows: null,
	tripleaxel: null,
	tripledive: null,
	twinbeam: null,
	upperhand: null,
	wildboltstorm: null,
	"10000000voltthunderbolt": null,
	aciddownpour: null,
	alloutpummeling: null,
	blackholeeclipse: null,
	bloomdoom: null,
	breakneckblitz: null,
	catastropika: null,
	clangoroussoulblaze: null,
	continentalcrush: null,
	corkscrewcrash: null,
	devastatingdrake: null,
	extremeevoboost: null,
	genesissupernova: null,
	gigavolthavoc: null,
	gmaxbefuddle: null,
	gmaxcannonade: null,
	gmaxcentiferno: null,
	gmaxchistrike: null,
	gmaxcuddle: null,
	gmaxdepletion: null,
	gmaxdrumsolo: null,
	gmaxfinale: null,
	gmaxfireball: null,
	gmaxfoamburst: null,
	gmaxgoldrush: null,
	gmaxgravitas: null,
	gmaxhydrosnipe: null,
	gmaxmalodor: null,
	gmaxmeltdown: null,
	gmaxoneblow: null,
	gmaxrapidflow: null,
	gmaxreplenish: null,
	gmaxresonance: null,
	gmaxsandblast: null,
	gmaxsmite: null,
	gmaxsnooze: null,
	gmaxsteelsurge: null,
	gmaxstonesurge: null,
	gmaxstunshock: null,
	gmaxsweetness: null,
	gmaxtartness: null,
	gmaxterror: null,
	gmaxvinelash: null,
	gmaxvolcalith: null,
	gmaxvoltcrash: null,
	gmaxwildfire: null,
	gmaxwindrage: null,
	guardianofalola: null,
	hydrovortex: null,
	infernooverdrive: null,
	letssnuggleforever: null,
	lightthatburnsthesky: null,
	maliciousmoonsault: null,
	maxairstream: null,
	maxdarkness: null,
	maxflare: null,
	maxflutterby: null,
	maxgeyser: null,
	maxguard: null,
	maxhailstorm: null,
	maxknuckle: null,
	maxlightning: null,
	maxmindstorm: null,
	maxooze: null,
	maxovergrowth: null,
	maxphantasm: null,
	maxquake: null,
	maxrockfall: null,
	maxstarfall: null,
	maxsteelspike: null,
	maxstrike: null,
	maxwyrmwind: null,
	menacingmoonrazemaelstrom: null,
	neverendingnightmare: null,
	oceanicoperetta: null,
	pulverizingpancake: null,
	savagespinout: null,
	searingsunrazesmash: null,
	shatteredpsyche: null,
	sinisterarrowraid: null,
	soulstealing7starstrike: null,
	splinteredstormshards: null,
	stokedsparksurfer: null,
	subzeroslammer: null,
	supersonicskystrike: null,
	tectonicrage: null,
	twinkletackle: null,/*
	baddybad: null,
	bouncybubble: null,
	buzzybuzz: null,
	floatyfall: null,
	freezyfrost: null,
	glitzyglow: null,
	pikapapow: null,
	sappyseed: null,
	sizzlyslide: null,
	sparklyswirl: null,
	splishysplash: null,
	veeveevolly: null,
	zippyzap: null,
	/* Contest categories lol */
	aurawheel: {
		inherit: true,
		contestType: "Cool",
	},
	beakblast: {
		inherit: true,
		contestType: "Cool",
	},
	behemothbash: {
		inherit: true,
		contestType: "Tough",
	},
	behemothblade: {
		inherit: true,
		contestType: "Cool",
	},
	bodypress: {
		inherit: true,
		contestType: "Tough",
	},
	breakingswipe: {
		inherit: true,
		contestType: "Cute",
	},
	clangingscales: {
		inherit: true,
		contestType: "Beautiful",
	},
	courtchange: {
		inherit: true,
		contestType: "Tough",
	},
	darkestlariat: {
		inherit: true,
		contestType: "Tough",
	},
	eternabeam: {
		inherit: true,
		contestType: "Beautiful",
		isNonstandard: null,
	},
	laserfocus: {
		inherit: true,
		contestType: "Clever",
		isNonstandard: null,
	},
	lifedew: {
		inherit: true,
		contestType: "Beautiful",
	},
	meteorassault: {
		inherit: true,
		contestType: "Cool",
		isNonstandard: null,
	},
	naturesmadness: {
		inherit: true,
		contestType: "Cool",
		isNonstandard: null,
	},
	overdrive: {
		inherit: true,
		contestType: "Cool",
	},
	photongeyser: {
		inherit: true,
		contestType: "Beautiful",
	},
	prismaticlaser: {
		inherit: true,
		contestType: "Beautiful",
	},
	pyroball: {
		inherit: true,
		contestType: "Cool",
	},
	shadowbone: {
		inherit: true,
		contestType: "Beautiful",
		isNonstandard: null,
	},
	shelltrap: {
		inherit: true,
		contestType: "Cool",
		isNonstandard: null,
	},
	strengthsap: {
		inherit: true,
		contestType: "Clever",
	},
};
