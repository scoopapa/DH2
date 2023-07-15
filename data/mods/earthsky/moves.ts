/*

List of new/edited flags:
bludg: Short for bludgeoning. Power is multiplied by 1.5 when used by a Pokemon with the Bludgeon ability.
bullet: Definition includes pulse and cannon moves. Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
powder: Has no effect on Pokemon with the Immunity Ability, and Pokemon holding Safety Goggles.
punch: Power is multiplied by 1.3 when used by a Pokemon with the Iron Fist Ability.
sound: Power is multiplied by 1.2 when used by a Pokemon with the Cacophony Ability.

*/

export const Moves: {[moveid: string]: ModdedMoveData} = {
	/* New Moves */
	aerate: {
		num: 1000,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Aerate",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove(source, target, move){
			//console.log(target.volatiles['evade'].source);
			//console.log(target.volatiles['evade'].effectData.source);
			if(target.volatiles['evade'] && ['hail','sandstorm','mistyterrain'].includes(target.volatiles['evade'].source)){
				this.debug("Aerate removing Veil-based Evasiveness so it can hit");
				target.removeVolatile('evade');
			}
		},
		onTryHit(target, source, move){
			target.side.removeSideCondition('mist');
			target.side.removeSideCondition('auroraveil');
		},
		onHit(target, source, move){
			const veilAbilities = [
				'aromaveil', 'flowerveil', 'pastelveil', 'slumberveil', 'sweetveil', 'waterveil', 'sandveil', 'snowcloak', 'mistyshroud', 'neutralizinggas'
			];
			if(veilAbilities.includes(target.getAbility())) target.addVolatile('gastroacid');
		},
		shortDesc: "Disables Veil Abilities, Neutralizing Gas, Aurora Veil, and Mist.",
		desc: "Before hitting the target, evasiveness granted by Sand Veil, Snow Cloak, and Misty Shroud are dispelled on it, and Aurora Veil and Mist are removed from its side of the field. After hitting the target, the Abilities Aroma Veil, Flower Veil, Misty Shroud, Neutralizing Gas, Pastel Veil, Sand Veil, Slumber Veil, Snow Cloak, Sweet Veil, and Water Veil are suppressed until it switches out.",
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gust", target);
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Struggle Bug", target);
		},
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Amnesia", target);
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sand Attack", target);
		},
	},
	eminence: {
		num: 1004,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Eminence",
		pp: 5,
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Calm Mind", target);
		},
	},
	fairyfire: {
		num: 1005,
		basePower: 65,
		accuracy: 90,
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
		onPrepareHit: function(target, source, move) {
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spirit Shackle", target);
		},
	},
	fellswoop: {
		num: 1007,
		basePower: 100,
		accuracy: 75,
		category: "Physical",
		name: "Fell Swoop",
		pp: 10,
		priority: 0,
		flags: {contact: 1, gravity: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "20% chance to flinch.",
		target: "normal",
		type: "Flying",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			if(!source.canFloat()) return false;
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fly", target);
		},
	},
	fullcollide: {
		num: 1008,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Full Collide",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1},
		beforeTurnCallback(pokemon) {
			if(!['slp', 'frz'].includes(pokemon.status)) pokemon.addVolatile('fullcollide');
		},
		secondary: null,
		condition: {
			duration: 1,
			//All other implementation done in the other statuses
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Full Collide', '[silent]');
			},
		},
		desc: "Once it is selected, its execution cannot be interrupted. The Pokemon will ignore sleep, freeze, flinch, Disable, Encore, and PP drain to 0 inflicted earlier in the same turn, and bypass the checks for full paralysis, confusion, and attraction. If given a Choice item earlier in the turn, the move locking will be ignored (but the power boost from a Choice Band will not be).",
		shortDesc: "If usable when selected, cannot be interrupted.",
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		onPrepareHit: function(target, source, move) {
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Brutal Swing", target);
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
			onStart(battle, source, effect) {
				this.add('-fieldstart', 'move: Midnight');
				//Suppression implemented in scripts.ts as edits to sim/field.ts
			},
			onEnd() {
				this.add('-fieldend', 'move: Midnight');
			},
		},
		secondary: null,
		shortDesc: "Summons darkness that prevents the effects of weather and terrain.",
		desc: "Summons supernatural darkness, a field effect that suppresses the effects of weather and terrain. They will not be removed, but their timers will continue to count down, and new weather/terrain cannot be set. The move Flash and the Ability Illuminate will dispel the darkness, and Illuminate will prevent it from being set.",
		target: "all",
		type: "Dark",
		contestType: "Cool",
		fieldstart: "  The battlefield became very dark!",
		fieldend: "  The darkness disappeared from the field.",
		block: "  Nothing happened through the darkness...",
		onPrepareHit: function(target, source, move) {
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
		onPrepareHit: function(target, source, move) {
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magnet Bomb", target);
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
		onPrepareHit: function(target, source, move) {
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
		onPrepareHit: function(target, source, move) {
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
		flags: {},
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
				this.add('-singleturn', target, 'move: Play Dead');
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
		start: "  [POKEMON] fainted!",
		end: "  [POKEMON] was playing dead all along!",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Memento", target);
		},
	},
	pounce: {
		num: 1016,
		basePower: 50,
		accuracy: 90,
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
		onPrepareHit: function(target, source, move) {
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
			duration: 2,
			onRestart(pokemon) {
				this.add('-start', pokemon, 'move: Preheat');
				this.effectData.duration = 2;
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
					this.debug('preheat boost');
					return this.chainModify(2);
				}
			},
		},
		boosts: {
			spa: 1,
		},
		secondary: null,
		desc: "Raises the user's Special Attack by 1 stage. If the user uses a Fire-type attack on the next turn, its power will be doubled.",
		shortDesc: "+1 SpA, user's Fire move next turn 2x power.",
		target: "self",
		type: "Fire",
		contestType: "Cool",
		start: "  [POKEMON] began generating heat!",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy", target);
		},
	},
	rebound: {
		num: 1018,
		basePower: 0,
		accuracy: true,
		category: "Physical",
		name: "Rebound",
		pp: 10,
		priority: 4,
		flags: {snatch: 1},
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
				if(target === this.effectData.target){
					const damage = this.getDamage(source, target, move);
					if(!damage) return;
					this.add('-activate', target, 'move: Rebound');
					this.damage(damage, source, target);
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
		desc: "The first damaging attack to hit this Pokemon this turn has its damage reflected to the attacker. The full calculation is run, and then the damage is applied as fixed damage to the attacker. All other effects of the move are ignored. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move or any of the moves Baneful Bunker, Detect, Endure, King's Shield, Obstruct, Protect, Play Dead, Quick Guard, Slip Away, Spiky Shield, or Wide Guard is used successfully. X resets to 1 if any of these moves fail or was broken. Fails if the user moves last this turn.",
		target: "self",
		type: "Normal",
		contestType: "Clever",
		start: "  [POKEMON] puffed up!",
		activate: "  The attack bounced back!",
		onPrepareHit: function(target, source, move) {
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Synthesis", target);
			this.add('-anim', source, "Refresh", target);
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
			volatileStatus: 'risingchorus',
		},
		condition: {
			duration: 5,
			onStart(target) {
				if (!target.canFloat()) return false;
				this.add('-start', target, 'move: Rising Chorus');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Rising Chorus');
			},
		},
		desc: "After dealing damage, the target is made immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability for the next five turns. If the target uses Baton Pass, the replacement will gain the effect. Gravity, Smack Down, and an Iron Ball will remove this status if the user is under any of their effects. The effect will not be applied if the user is under the effects of Gravity or Ingrain, or if the user's Ability is Heavy Metal or Suction Cups. While floating in this manner, the moves Dig, Dive, Ingrain, and Roost will fail.",
		shortDesc: "Hits adjacent foes, causes floating status.",
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Beautiful",
		start: "  [POKEMON] was lifted into the air!",
		end: "  [POKEMON] returned to the ground.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Uproar", target);
		},
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
		flags: {},
		stallingMove: true,
		onModifyPriority(priority, pokemon, target, move){ //Move protection up to proper priority
			if(!pokemon.volatiles['slipaway']) return 4;
		},
		onPrepareHit(pokemon) { //Regular protection check
			if(!pokemon.volatiles['slipaway']){
				if(!!this.queue.willAct() && this.runEvent('StallMove', pokemon)){
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Acid Armor", pokemon);
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
					this.queue.insertChoice({choice: 'move', pokemon: pokemon, move: this.dex.getMove('slipaway')}, true); //Adds switch event
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
		contestType: "cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder", target);
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
		onPrepareHit: function(target, source, move) {
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
				this.effectData.affectedStatuses = ['confuse','disable','electrify','encore','imprison','laserfocus','leechseed','magnetrise','minimize','nightmare','partiallytrapped','perishsong','powertrick','risingchorus','strongpartialtrap','taunt','telekinesis','throatchop','torment','yawn'], //Volatiles with timers to freeze
				this.effectData.noStart = ['aquaring','attract','bunkerdown','charge','curse','destinybond','doubleteam','endure','evade','flashfire','focusenergy','followme','foresight','grudge','ingrain','kingsshield','lockon','minimize','miracleeye','mindreader','obstruct','odorsleuth','playdead','powder','preheat','protect','ragepowder','rebound','slipaway','snatch','spikyshield','spotlight','substitute','tangledfeet','tarshot'], //Volatiles that can't be added, but either have no duration or have to be removable to prevent breaking things/being broken
				this.add('-start', pokemon, 'move: Stasis');
			},
			onBoost(boost, pokemon) {
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
				console.log("Stasis checking " + volatile);
				if(pokemon.volatiles['stasis'].affectedStatuses.includes(volatile)){
					this.add('-fail', pokemon, 'move: Stasis');
					return false;
				}
			},
			//Locks on other timers implemented in scripts.ts as an edit to battle.residualEvent(), and in conditions.ts as edits to sleep and freeze.
			onEnd(pokemon){
				this.add('-end', pokemon, 'move: Stasis');
			}
		},
		secondary: null,
		shortDesc: "Locks in status and stat changes for 3 turns.",
		desc: `For the next three turns, the target's stats cannot be raised or lowered. If the target is frozen or asleep, the duration timers will pause, as will the duration timers of many of its volatile status conditions. Any statuses that can be affected also cannot be added, changed, or removed through any means other than switching. Affected volatile statuses are:
		Confusion, Disable, Electrify, Encore, Imprison, Laser Focus, Leech Seed, Magnet Rise, Minimize, Nightmare, Partial Trapping, Perish Song, Power Trick, Rising Chorus, Taunt, Telekinesis, Throat Chop, Torment, Yawn
		Additionally, the following volatile statuses cannot be added to the target:
		Aqua Ring, Attraction, Bunker Down, Charge, Curse, Destiny Bond, Endure, Evasiveness, Flash Fire, Focus Energy, Follow Me, Foresight, Grudge, Ingrain, Magic Coat, Miracle Eye, King's Shield, Lock-On, Miracle Eye, Mind Reader, Obstruct, Odor Sleuth, Play Dead, Powder, Preheat, Protect, Rage Powder, Rebound, Slip Away, Snatch, Spiky Shield, Spotlight, Substitute, Tar Shot
		If possible, these statuses will still fade on their own.`,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		start: "  [POKEMON]'s body has been locked in time!",
		fail: "  [POKEMON]'s condition remained in stasis!",
		end: "  [POKEMON]'s body returned to normal.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Telekinesis", target);
		},
	},
	swing: {
		num: 1025,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if(pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (item && !item.consumable) {
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slam", target);
		},
	},
	tidalwave: {
		num: 1026,
		basePower: 120,
		accuracy: 90,
		category: "Physical",
		name: "Tidal Wave",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		shortDesc: "Hits all adjacent Pokemon.",
		target: "allAdjacent",
		type: "Water",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Surf", target);
		},
	},
	tussle: {
		num: 1027,
		basePower: 50,
		accuracy: 90,
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
		onPrepareHit: function(target, source, move) {
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
		onPrepareHit: function(target, source, move) {
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
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "Heals for 50% damage dealt.",
		target: "normal",
		type: "Bug",
		contestType: "Clever",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leech Life", target);
		},
	},
	whitewater: {
		num: 1030,
		basePower: 40,
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Water Gun", target);
		},
	},
	/* Edited Moved */
	acupressure: {
		inherit: true,
		pp: 10,
		onHit(target) {
			let statName = 'atk';
			let worstStat = 3000; //The highest possible stat number (with boosts) is 2,676
			let s: StatNameExceptHP;
			for (s in target.storedStats) {
				if (target.storedStats[s] < worstStat) {
					statName = s;
					worstStat = target.storedStats[s];
				}
			}
			this.boost({[statName]: 2}, target);
		},
	},
	aeroblast: {
		inherit: true,
		accuracy: 100,
	},
	aircutter: {
		inherit: true,
		accuracy: 100,
	},
	airslash: {
		inherit: true,
		accuracy: 100,
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
		boosts: {
			spd: 1,
		},
		target: "allies",
		desc: "Raises allies' Special Defense by 1 stage. If the terrain is Misty Terrain, this move will raise allies' Special Defense by 2 stages.",
		shortDesc: "Raises allies' Sp. Def by 1; 2 in Misty Terrain.",
	},
	attackorder: {
		inherit: true,
		basePower: 100,
		critRatio: 1,
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
	avalanche: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	barrage: {
		inherit: true,
		basePower: 30,
		accuracy: 80,
		pp: 10,
	},
	bide: {
		inherit: true,
		condition: {
			duration: 2,
			onLockMove: 'bide',
			onStart(pokemon) {
				this.effectData.totalDamage = 0;
				this.add('-start', pokemon, 'move: Bide');
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, move) {
				if (!move || move.effectType !== 'Move' || !source) return;
				this.effectData.totalDamage += damage;
				this.effectData.lastDamageSource = source;
			},
			onBeforeMove(pokemon, target, move) {
				if (this.effectData.duration === 1) {
					this.add('-end', pokemon, 'move: Bide');
					target = this.effectData.lastDamageSource;
					if (!target || !this.effectData.totalDamage) {
						this.attrLastMove('[still]');
						this.add('-fail', pokemon);
						return false;
					}
					if (!target.isActive) {
						const possibleTarget = this.getRandomTarget(pokemon, this.dex.getMove('pound'));
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
						damage: this.effectData.totalDamage * 2,
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
	},
	bind: {
		inherit: true,
		basePower: 35,
		volatileStatus: 'strongpartialtrap',
		shortDesc: "Traps and damages the foe a lot for 2-3 turns.",
		desc: "Prevents the target from switching for two or three turns (four turns if the user is holding Grip Claw). Causes damage to the target equal to 1/4 of its maximum HP (1/3 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
	},
	blastburn: {
		inherit: true,
		flags: {bullet: 1, recharge: 1, protect: 1, mirror: 1},
	},
	blizzard: {
		inherit: true,
		secondary: {
			chance: 30,
			status: 'frz',
		},
		desc: "Has a 30% chance to freeze the target. If the weather is Hail, this move does not check accuracy.",
		shortDesc: "30% chance to freeze foe(s). Can't miss in hail.",
	},
	block: {
		inherit: true,
		onHit(target, source, move) {
			return target.addVolatile('blocked', source, move, 'trapper');
		},
		desc: "Prevents the target from switching out. Escape Plan and a held Eject Button or Eject Pack will fail to make the target leave the field as well. The target can still switch out if it is holding Shed Shell, has Run Away, or uses Baton Pass or Teleport. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
	},
	boltbeak: {
		inherit: true,
		basePower: 60,
	},
	bonerush: {
		inherit: true,
		accuracy: 100,
	},
	bonemerang: {
		inherit: true,
		basePower: 40,
		ignoreImmunity: {'Ground': true},
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
	clamp: {
		inherit: true,
		basePower: 35,
		accuracy: 85,
		volatileStatus: 'strongpartialtrap',
		shortDesc: "Traps and damages the foe a lot for 2-3 turns.",
		desc: "Prevents the target from switching for two or three turns (four turns if the user is holding Grip Claw). Causes damage to the target equal to 1/4 of its maximum HP (1/3 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
	},
	cometpunch: {
		inherit: true,
		basePower: 20,
		accuracy: 100,
	},
	constrict: {
		inherit: true,
		basePower: 30,
	},
	crabhammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	crushclaw: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
	},
	crushgrip: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			return Math.floor(Math.floor((150 * (100 * Math.floor(target.hp * 4096 / target.maxhp)) + 2048 - 1) / 4096) / 100) + 50;
		},
		desc: "Power is equal to 150 * (target's current HP / target's maximum HP), rounded half down, plus 50.",
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
		willCrit: true,
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always results in a critical hit.",
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
		shortDesc: "Causes the foe(s) to fall asleep. Less accurate in non-Singles.",
	},
	defendorder: {
		inherit: true,
		target: "adjacentAllyOrSelf",
		shortDesc: "Raises target's Defense and Special Defense by 1 stage.",
		shortDesc: "Raises user's or ally's Def and Sp. Def by 1 stage.",
	},
	defog: {
		inherit: true,
		onHitField(target, source, move) {
			const enemySide = source.side.foe;
			let success = false;
			for (const mon of enemySide.active) {
				if (!mon.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1}, mon);
			}
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (enemySide.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', enemySide, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
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
				if (type === 'sandstorm' || type === 'hail') return false;
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
				if (type === 'sandstorm' || type === 'hail') return false;
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
		basePower: 40,
		pp: 15,
		secondary: {},
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits two times in one turn.",
		contestType: "Tough",
	},
	doubleslap: {
		inherit: true,
		accuracy: 100,
		pp: 20,
	},
	doubleteam: {
		num: 104,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Double Team",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
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
			duration: 0,
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
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cool",
		desc: "When used, the user becomes Evasive. While Evasive, moves that target the user will fail accuracy checks to hit it, unless they ignore the condition. This move has a 1/X chance of being successful, where X starts at 1 and triples each time Evasiveness is successfully gained. X resets to 1 if the user was not Evasive last turn. When a move misses the user due to this conditon, Double Team ends. Moves that target multiple positions will end Double Team before hitting the user; however, doing so will cause them to have their damage reduced by 25% as if they had truly hit multiple targets.",
		shortDesc: "Causes the next single-target move to miss.",
		start: "  [POKEMON] made a shadow double!",
		end: "  [POKEMON]'s shadow double vanished!",
	},
	dragonhammer: {
		inherit: true,
		basePower: 100,
		accuracy: 90,
		pp: 10,
		flags: {bludg: 1, contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		desc: "Lowers the user's Speed by 1 stage.",
		shortDesc: "Lowers the user's Speed by 1.",
	},
	dragonpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, mirror: 1, distance: 1},
	},
	dragonrush: {
		inherit: true,
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
		shortDesc: "Has a 50% chance to lower the target's Speed by 1 stage.",
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
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.multiplier < 4) {
					this.effectData.multiplier <<= 1;
				}
				this.effectData.duration = 2;
			},
		},
		desc: "Power doubles with each successful hit, up to a maximum of 160 power. The power is reset if this move misses or another move is used.",
		shortDesc: "Power doubles with each hit, up to 160.",
	},
	eggbomb: {
		inherit: true,
		accuracy: 85,
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
	},
	explosion: {
		inherit: true,
		basePower: 300,
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
				if(move.selfSwitch && target !== source && !source.hasItem('shedshell') && !source.hasAbility('runaway')) delete move.selfSwitch;
			},
			onAfterMoveSecondaryPriority: -100,
			onAfterMoveSecondary(target, source, move) { //Items and custom Abilities won't switch
				if(target !== source){
					if(source.switchFlag && !source.hasItem('shedshell') && !source.hasAbility('runaway')){
						this.add('-fail', target, '[from] move: Fairy Lock');
						source.switchFlag = false;
						return null;
					}
					if(target.switchFlag && !target.hasItem('shedshell') && !target.hasAbility('runaway')){
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
		desc: "Prevents all active Pokemon from switching next turn. Escape Plan and a held Eject Button or Eject Pack will fail to make any Pokemon leave the field as well. A Pokemon can still switch out if it is holding Shed Shell, has Run Away, or uses Baton Pass or Teleport. Fails if the effect is already active.",
		fail: "  [TARGET]'s exit was blocked!"
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
		condition: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'Fire Pledge');
			},
			onEnd(targetSide) {
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
	},
	fishiousrend: {
		inherit: true,
		basePower: 60,
		contestType: "Tough",
	},
	flameburst: {
		inherit: true,
		onHit(target, source, move) {
			if (target.side.active.length === 1) {
				return;
			}
			for (const ally of target.side.active) {
				if (ally && this.isAdjacent(target, ally)) {
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
					this.trySpreadMoveHit([ally], source, burstData);
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			console.log("Flame Burst exploding on a Substitute");
			if (target.side.active.length === 1) {
				return;
			}
			for (const ally of target.side.active) {
				if (ally && this.isAdjacent(target, ally)) {
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
					this.trySpreadMoveHit([ally], source, burstData);
				}
			}
		},
		onMoveFail(target, source, move){ //Checks for protection to explode on the shield
			console.log("Flame Burst checking for shields");
			let blocked = false;
			for (const effectid of ['bunkerdown', 'kingsshield', 'obstruct', 'protect', 'slipaway', 'spikyshield']) {
				if (target.volatiles[effectid]){
					blocked = true;
				}
			}
			if(blocked) console.log("Flame Burst does see a shield");
			else console.log("Flame Burst does not see a shield");
			if(blocked && target.side.active.length > 1){
				console.log("Flame Burst exploding on shield");
				for (const ally of target.side.active) {
					if (ally && this.isAdjacent(target, ally)) {
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
						this.trySpreadMoveHit([ally], source, burstData);
					}
				}
			}
		},
		desc: "If this move successfully hits the target (even if it protected itself), the target's adjacent allies are hit by a Fire-type Special move with 60 base power.",
	},
	flash: {
		inherit: true,
		onHit(target, source){
			let success = false;
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
			if('midnight' in this.field.pseudoWeather){
				this.field.removePseudoWeather('midnight');
				success = true;
			}
			return success;
		},
		boosts: {},
		target: "allAdjacentFoes",
		desc: "Lowers the target's accuracy by 1 stage and disrupts the execution of Focus Punch and moves that spend a turn charging, unless it is hiding behind a substitute. Supernatural darkness is lifted from the battlefield.",
		shortDesc: "Lowers foe(s)' accuracy. Interrupts charging, removes Midnight.",
		cant: "  [POKEMON] lost concentration on its move!"
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
		flags: {reflectable: 1, mirror: 1, mystery: 1},
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
		num: 579,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Flower Shield",
		pp: 20,
		priority: 0,
		flags: {distance: 1},
		boosts: {
			def: 1,
		},
		onModifyMove(move, pokemon) {
			if (this.field.effectiveTerrain(pokemon) === 'grassyterrain') move.boosts = {def: 2};
		},
		secondary: null,
		target: "allies",
		type: "Fairy",
		contestType: "Beautiful",
		desc: "Raises allies' Defense by 1 stage. If the terrain is Grassy Terrain, this move will raise allies' Defense by 2 stages.",
		shortDesc: "Raises allies' Defense by 1; 2 in Grassy Terrain.",
	},
	fly: {
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
		flags: {snatch: 1},
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
				if (target.setType([targetTypes[0],"Grass"])) succeeded = true;
			}
			if (succeeded) this.add('-start', target, 'typeadd', 'Grass', '[from] move: Forest\'s Curse');
			else {
				this.add('-fail', target);
				return null;
			}
		},
		shortDesc: "Changes the target's secondary type to Grass.",
		desc: "The target's second typing is replaced with the Grass type. If the target's first typing is Grass and it has a second typing, it will become pure Grass. If the target is already a pure Grass-type, the move fails.",
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
	gastroacid: {
		inherit: true,
		
	},
	gearup: {
		inherit: true,
		onHitSide(side, source, move) {
			const targets = [];
			for (const pokemon of side.active) {
				if (pokemon.hasType('Steel')) {
					targets.push(pokemon);
				}
			}
			if (!targets.length) return false;
			let didSomething = false;
			for (const target of targets) {
				didSomething = this.boost({atk: 1, spa: 1}, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
		shortDesc: "Raises ally Steel-types' Attack, Sp. Atk by 1.",
	},
	glaciate: {
		inherit: true,
		basePower: 110,
	},
	grasspledge: {
		inherit: true,
		condition: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'Grass Pledge');
			},
			onEnd(targetSide) {
				this.add('-sideend', targetSide, 'Grass Pledge');
			},
			onModifySpe(spe, pokemon) {
				if(pokemon.isGrounded()){
					return this.chainModify(0.5);
				}
			},
		},
	},
	grasswhistle: {
		inherit: true,
		accuracy: 70,
	},
	grassyterrain: {
		inherit: true,
		condition: {
			effectType: 'Terrain',
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
			onStart(battle, source, effect) {
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
			onResidualSubOrder: 3,
			onResidual() {
				if (this.field.isTerrain('grassyterrain')) this.eachEvent('Terrain');
			},
			onTerrain(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded, healing through Grassy Terrain.');
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
	},
	gyroball: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
	},
	hammerarm: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, bludg: 1},
	},
	healblock: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
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
			onStart(side) {
				this.add('-start', side, 'move: Heal Block');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.getMove(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 17,
			onEnd(side) {
				this.add('-end', side, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectData.isZ) return damage;
				return false;
			},
		},
		target: "foeSide",
		shortDesc: "Blocks enemy team from healing effects.",
		start: "  [TEAM] was prevented from healing!",
		end: "  [TEAM]'s Heal Block wore off!",
	},
	healorder: {
		inherit: true,
		target: 'adjacentAllyOrSelf',
	},
	healpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, reflectable: 1, distance: 1, heal: 1, mystery: 1},
		target: 'adjacentAllyOrSelf',
	},
	highhorsepower: {
		inherit: true,
		accuracy: 100,
	},
	highjumpkick: {
		inherit: true,
		accuracy: 70,
		onPrepareHit(target, source, move){
			if (!source.canFloat()) return false;
		},
	},
	hydrocannon: {
		inherit: true,
		flags: {bullet: 1, recharge: 1, protect: 1, mirror: 1},
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
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.multiplier < 4) {
					this.effectData.multiplier <<= 1;
				}
				this.effectData.duration = 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		shortDesc: "Power doubles on each hit, up to 160.",
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
		shortDesc: "Heals 1/8 max HP per turn. Traps/grounds user.",
	},
	irontail: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	jumpkick: {
		inherit: true,
		accuracy: 90,
		onPrepareHit(target, source, move){
			if (!source.canFloat()) return false;
		},
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
	leechlife: {
		inherit: true,
		basePower: 20,
		pp: 15,
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
			duration: 0,
			onInvulnerabilityPriority: 1,
			onInvulnerability(target, source, move) {
				if (move && source === this.effectData.target && target === this.effectData.source) return 0;
			},
			onModifyMove(move, source, target) {
				if (move && source === this.effectData.target && target === this.effectData.source){
					move.accuracy = true;
					move.ignoreEvasion = true;
				}
			},
			onSourceHit(target, source, move){
				if(source !== target) source.removeVolatile('lockon');
			},
			onSwitchOut(pokemon){
				if(pokemon === this.effectData.source){
					this.effectData.target.removeVolatile('lockon');
				}
			},
			onEnd(pokemon){
				this.add('-end', pokemon, 'move: Lock-On', '[silent]');
			}
		},
		shortDesc: "User's next attack on target always hits, even through Evasiveness, and ignores semi-invulnerability.",
	},
	lovelykiss: {
		inherit: true,
		accuracy: 100,
		flags: {protect: 1, reflectable: 1, mirror: 1, contact: 1},
	},
	lowsweep: {
		inherit: true,
		power: 50,
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
		power: 80,
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
				if (target.setType([targetTypes[0],"Psychic"])) succeeded = true;
			}
			if (succeeded) this.add('-start', target, 'typeadd', 'Psychic', '[from] move: Magic Powder');
			else {
				this.add('-fail', target);
				return null;
			}
		},
		desc: "The target's second typing is replaced with the Psychic type. If the target's first typing is Psychic and it has a second typing, it will become pure Psychic. If the target is already a pure Psychic-type, the move fails.",
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
			onStart(target, source) {
				this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onPrimal(pokemon){
				return false;
			},
			onResidualOrder: 25,
			onEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectData.source);
			},
		},
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
	},
	meditate: {
		inherit: true,
		boosts: {atk: 1, spd: 1},
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
		twoType: "Fighting",
		desc: "This move is both Normal and Fighting typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
		shortDesc: "Both Normal and Fighting types.",
	},
	metalclaw: {
		inherit: true,
		accuracy: 100,
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
			duration: 0,
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
		type: "Normal",
		contestType: "Clever",
		desc: "As long as the user remains active, its moves can't be made to miss due to Evasiveness, and its Psychic-type attacks and Prankster-boosted status moves can hit Dark type Pokemon.",
		shortDesc: "User ignores Dark immunities and Evasiveness.",
		start: "  [POKEMON] gained supernatural sight!",
	},
	mistball: {
		inherit: true,
		power: 80,
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
			case 'hail':
				factor = 0.25;
				break;
			}
			if('midnight' in this.field.pseudoWeather) factor = 0.75;
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect, 3/4 of its maximum HP if Midnight is in effect, or 1/4 of its maximum HP if the weather is Desolate Land, Sunny Day, Hail, Primordial Sea, Rain Dance, or Sandstorm, all rounded half down.",
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
			case 'hail':
				factor = 0.25;
				break;
			}
			if('midnight' in this.field.pseudoWeather) factor = 0.25;
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		desc: "The user restores 1/2 of its maximum HP if the weather Desolate Land or Sunny Day, 3/4 of its maximum HP if Delta Stream or no weather conditions are in effect, or 1/4 of its maximum HP if the weather is Hail, Primordial Sea, Rain Dance, or Sandstorm, or if Midnight is in effect, all rounded half down.",
	},
	mudshot: {
		inherit: true,
		power: 50,
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
			onStart(side, source) {
				this.add('-fieldstart', 'move: Mud Sport', '[of] ' + source);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'par') {
					this.debug('Mud Sport prevents paralysis');
					const effectHolder = this.effectData.target;
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
			onResidualOrder: 21,
			onEnd() {
				this.add('-fieldend', 'move: Mud Sport');
			},
		},
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
			const item = this.dex.getItem(pokemon.lastItem);
			move.basePower = item.naturalGift.basePower;
			this.runEvent('AfterUseItem', pokemon, null, null, item);
		},
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
			this.useMove(move, pokemon, target);
			return null;
		},
		desc: "This move calls another move for use based on the battle terrain. Tri Attack on the regular Wi-Fi terrain, Thunderbolt during Electric Terrain, Moonblast during Misty Terrain, Energy Ball during Grassy Terrain, and Psychic during Psychic Terrain. Calls Night Daze if Midnight is in effect.",
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
		desc: "Causes the target to lose 1/4 of its maximum HP, rounded down, at the end of each turn as long as it is asleep. This move does not affect the target unless it is asleep. The effect ends when the target wakes up, even if it falls asleep again in the same turn. The target is forced to sleep for three turns.",
		shortDesc: "Sleeping target -25% max HP each turn, sleeps max turns.",
	},
	nightdaze: {
		inherit: true,
		accuracy: 100,
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
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({def: -1}, source, target, this.dex.getActiveMove("Obstruct"));
				}
			},
		},
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
		desc: "Has a 100% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "Lowers the target's accuracy by 1.",
	},
	octolock: {
		inherit: true,
		flags: {protect: 1, mirror: 1, contact: 1},
		contestType: "Tough",
	},
	odorsleuth: {
		inherit: true,
		volatileStatus: 'odorsleuth',
		onTryHit(target) {},
		condition: {
			noCopy: true,
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
		desc: "As long as the target remains active, it cannot become Evasive, and Normal- and Fighting-type attacks can hit the target if it is a Ghost type. Existing Evasiveness is removed. Fails if the target is already affected.",
		shortDesc: "Ignore Ghost immunities. Evasiveness removed.",
	},
	originpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, mirror: 1},
	},
	phantomforce: {
		inherit: true,
		condition: {
			duration: 2,
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
		desc: "If this move is successful, it breaks through the target's Bunker Down, Detect, King's Shield, Protect, Slip Away, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Shadow Punch, Shadow Sneak, Shadow Claw, Phantom Force, and Shadow Force; these moves also have their damage doubled. If the user is holding a Power Herb, the move completes in one turn.",
	},
	pinmissile: {
		inherit: true,
		power: 20,
		accuracy: 100,
		pp: 15,
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
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return false;
			if (!item.fling) return false;
			move.basePower = 80 + item.fling.basePower;
		},
		desc: "The power of this move is based on the target's held item. Fails if the target has no held item, if the target is under the effect of Magic Room, or if the target has the Klutz or Sticky Hold Abilities.",
		shortDesc: "Target's item attacks it. Power varies.",
		contestType: "Cool",
	},
	powertrip: {
		inherit: true,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			return 20 * (1 + pokemon.positiveBoosts());
		},
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic Fangs", target);
		},
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens, unless the target is immune.",
	},
	punishment: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			let power = 60 + 20 * target.positiveBoosts();
			return power;
		},
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
		secondary: {},
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field.",
		shortDesc: "Free user from hazards/bind/Leech Seed.",
	},
	razorleaf: {
		inherit: true,
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
		willCrit: true,
		desc: "Always scores a critical hit. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then hits foe(s) turn 2. Always crits.",
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
		secondary:{
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Defense by 1 stage.",
		shortDesc: "Lowers the target's Defense by 1.",
	},
	rockthrow: {
		inherit: true,
		accuracy: 100,
	},
	rocktomb: {
		inherit: true,
		basePower: 70,
		accuracy: 90,
	},
	roost: {
		inherit: true,
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
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Rototiller', '[of] ' + source);
					success = true;
				}
				if (target.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', target.side, this.dex.getEffect(sideCondition).name, '[from] move: Rototiller', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		desc: "The effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for both sides of the field. If there is a terrain active, it will be cleared.",
		shortDesc: "Clears hazards and terrain.",
	},
	sacredfire: {
		inherit: true,
		accuracy: 100,
	},
	safeguard: {
		inherit: true,
		condition: {duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart(side) {
				this.add('-sidestart', side, 'Safeguard');
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
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (['confusion', 'curse', 'leechseed', 'nightmare', 'yawn'].includes(status.id) && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onDamage(damage, target, source, effect){
				if(effect && ['spikes','stealthrock', 'firepledge'].includes(effect.id)) return false;
			},
			onImmunity(type, pokemon) {
				if (['sandstorm', 'hail'].includes(type)) return false;
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
		desc: "For 5 turns, the user and its party members cannot have non-volatile status conditions, confusion, Leech Seed, or a Curse or Nightmare inflicted on them by other Pokemon. Pokemon on the user's side cannot become affected by Yawn but can fall asleep from its effect. Residual damage from Spikes, Stealth Rock, sandstorm, hail, and a burning field is blocked for the user and its team. It is removed from the user's side if the user or an ally is successfully hit by Defog. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, protects user's party from status and residual field damage.",
	},
	scald: {
		inherit: true,
		basePower: 70,
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			move.secondaries = [];
			if ('midnight' in this.field.pseudoWeather){
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('electricterrain')) {
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
					volatileStatus: 'confusion',
				});
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		desc: "Has a 30% chance to cause a secondary effect on the target based on the battle terrain. Causes paralysis on the regular Wi-Fi terrain, causes paralysis during Electric Terrain, lowers Special Attack by 1 stage during Misty Terrain, causes sleep during Grassy Terrain, and confuses during Psychic Terrain. During Midnight, it causes sleep.",
	},
	shadowforce: {
		inherit: true,
		condition: {
			duration: 2,
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
		desc: "If this move is successful, it breaks through the target's Bunker Down, Detect, King's Shield, Protect, Slip Away, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Shadow Punch, Shadow Sneak, Shadow Claw, Phantom Force, and Shadow Force; these moves also have their damage doubled. If the user is holding a Power Herb, the move completes in one turn.",
	},
	sharpen: {
		inherit: true,
		pp: 20,
		boosts: {
			atk: 1,
			spe: 1
		},
		desc: "Raises the user's Attack and Speed by 1 stage.",
		shortDesc: "Raises the user's Attack and Speed by 1.",
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
			case 'hail':
				factor = 0.25;
				break;
			case 'sandstorm':
				factor = 0.75;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect, 3/4 of its maximum HP if Sandstorm is in effect, or 1/4 of its maximum HP if the weather is Desolate Land, Sunny Day, Hail, Primordial Sea, or Rain Dance, or if Midnight is in effect, all rounded half down.",
		shortDesc: "Heals user by weather-dependent amount.",
		contestType: "Clever",
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
				if (pokemon === this.effectData.target || pokemon === this.effectData.source) return false;
			},
			onFoeTrapPokemonPriority: -15,
			onFoeTrapPokemon(defender) {
				if (defender !== this.effectData.source) return;
				defender.trapped = true;
			},
			onFoeBeforeMovePriority: 12,
			onFoeBeforeMove(attacker, defender, move) {
				if (attacker === this.effectData.source) {
					attacker.activeMoveActions--;
					this.debug('Sky drop nullifying.');
					return null;
				}
			},
			onRedirectTargetPriority: 99,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectData.target) return;
				if (this.effectData.source.fainted) return;
				return this.effectData.source;
			},
			onAnyInvulnerability(target, source, move) {
				if (target !== this.effectData.target && target !== this.effectData.source) {
					return;
				}
				if (source === this.effectData.target && target === this.effectData.source) {
					return;
				}
				if (['twister', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onAnyBasePower(basePower, target, source, move) {
				if (target !== this.effectData.target && target !== this.effectData.source) {
					return;
				}
				if (source === this.effectData.target && target === this.effectData.source) {
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
		desc: "This attack takes the target into the air with the user on the first turn and executes on the second. Pokemon weighing 200 kg or more or who are unable to obtain floating status cannot be lifted. On the first turn, the user and the target avoid all attacks other than Hurricane, Smack Down, Thousand Arrows, Thunder, and Twister, which have their damage doubled. The user and the target cannot make a move between turns, but the target can select a move to use. This move cannot damage Flying-type Pokemon. Fails on the first turn if the target is an ally, if the target has a substitute, or if the target is using Bounce, Dig, Dive, Fly, Phantom Force, Shadow Force, or Sky Drop.",
	},
	skyuppercut: {
		inherit: true,
		basePower: 75,
		accuracy: 100,
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 1;
		},
		desc: "This move's type effectiveness against Flying is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Flying.",
	},
	slam: {
		inherit: true,
		basePower: 90,
		accuracy: 90,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	smackdown: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = !(pokemon.isGrounded(false, true));
				console.log("Smack Down grounded assessment: " + !applies);
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				console.log("Smack Down final application: " + applies);
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
		basePower: 80,
		priority: -1,
		shortDesc: "This move does not check accuracy. Goes last.",
		contestType: "Clever",
	},
	smog: {
		inherit: true,
		secondary: {
			chance: 40,
			status: 'tox',
		},
		desc: "Has a 40% chance to badly poison the target.",
		shortDesc: "40% chance to badly poison.",
	},
	snaptrap: {
		inherit: true,
		volatileStatus: 'strongpartialtrap',
		desc: "Prevents the target from switching for two or three turns (four turns if the user is holding Grip Claw). Causes damage to the target equal to 1/4 of its maximum HP (1/3 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the foe a lot for 2-3 turns.",
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
				const snatchUser = this.effectData.source;
				if (snatchUser.isSkyDropped()) return;
				if (!move || move.isZ || move.isMax || !move.flags['snatch'] || move.sourceEffect === 'snatch') {
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
				this.useMove(move.id, snatchUser);
				return null;
			},
		},
	},
	snipeshot: {
		inherit: true,
		target: 'any',
	},
	snore: {
		inherit: true,
		basePower: 80,
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
				if (target.setType([targetTypes[0],"Water"])) succeeded = true;
			}
			if(succeeded) this.add('-start', target, 'typeadd', 'Water', '[from] move: Soak');
			else {
				this.add('-fail', target);
				return null;
			}
		},
		shortDesc: "Changes the target's secondary typing to Water.",
		desc: "The target's second typing is replaced with the Water type. If the target's first typing is Water and it has a second typing, it will become pure Water. If the target is already a pure Water-type, the move fails.",
	},
	spacialrend: {
		inherit: true,
		accuracy: 100,
	},
	spiderweb: {
		num: 169,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spider Web",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		secondary: null,
		volatileStatus: 'spiderweb',
		condition: {
			duration: 4,
			onStart(target) {
				if(!target.addVolatile('trapped', source, move, 'trapper')) return false;
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		target: 'allAdjacentFoes',
		type: "Bug",
		contestType: "Clever",
		desc: "Prevents the target from switching out for three turns. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped.",
		shortDesc: "Traps foe(s) for three turns.",
	},
	spikes: {
		inherit: true,
		flags: {reflectable: 1, nonsky: 1, snatch: 1},
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				//if (pokemon.side.sideConditions['safeguard'] || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('limber')) return;
				const damageAmounts = [0, 15, 20, 24]; // 1/8, 1/6, 1/5
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 120);
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Limber Abilities. Can be used up to three times before failing. Opponents lose 1/8 of their maximum HP with one layer, 1/6 of their maximum HP with two layers, and 1/5 of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, or if any Pokemon uses Defog or Rototiller successfully.",
	},
	spiritbreak: {
		inherit: true,
		basePower: 70,
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
				move.target = move.nonGhostTarget as MoveTarget; //property stolen from Curse, just needs an alternate target
			}
		},
		nonGhostTarget: 'allAdjacentFoes',
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
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
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
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Steel Beam'), true);
			}
		},
		contestType: "Cool", 
	},
	stickyweb: {
		inherit: true,
		flags: {reflectable: 1, snatch: 1},
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				//if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('limber')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, lowering the Speed by 1 stage of each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Limber Abilities. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, or if any Pokemon uses Defog or Rototiller.",
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Strange Steam", target);
		},
		desc: "Has a 20% chance to confuse the target.",
		shortDesc: "20% chance to confuse the target.",
	},
	stringshot: {
		inherit: true,
		accuracy: 100,
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
	swagger: {
		inherit: true,
		flags: {reflectable: 1, mirror: 1, mystery: 1},
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
			case 'hail':
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
	takedown: {
		inherit: true,
		accuracy: 100,
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
		flags: {bullet: 1},
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
		desc: "For 3 turns, the target cannot avoid any attacks made against it, other than OHKO moves, as long as it remains active. During the effect, the target is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability as long as it remains active. If the target uses Baton Pass, the replacement will gain the effect. The moves Dig, Dive, Ingrain, and Roost will fail if used by the target while the effect is active. This move will fail if the target is unable to gain the floating status.",
	},
	teleport: {
		inherit: true,
		priority: 0,
		flags: {snatch: 1},
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
	},
	thunderfang: {
		inherit: true,
		accuracy: 100,
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
			onStart(side, source) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				if(source.hasAbility('potency')){
					this.debug("Potency double-setting Toxic Spikes");
					this.effectData.layers = 2;
				} else {
					this.effectData.layers = 1;
				}
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, poisoning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Limber Abilities. Can be used up to two times before failing. Opposing Pokemon become poisoned with one layer and badly poisoned with two layers. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully, if any Pokemon uses Defog or Rapid Spin, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
	},
	triattack: {
		inherit: true,
		secondary: {
			chance: 30,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
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
				if (target.setType([targetTypes[0],"Ghost"])) succeeded = true;
			}
			if(succeeded) this.add('-start', target, 'typeadd', 'Ghost', '[from] move: Trick-or-Treat');
			else {
				this.add('-fail', target);
				return null;
			}
		},
		shortDesc: "Changes the target's secondary typing to Ghost.",
		desc: "The target's second typing is replaced with the Ghost type. If the target's first typing is Ghost and it has a second typing, it will become pure Ghost. If the target is already a pure Ghost-type, the move fails.",
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
		inherit: true,
		basePowerCallback(source, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? source.getMoveData(move.id) : source.getMoveData(callerMoveId);
			if (!moveSlot) return 40;
			else return 40 * (5 - Math.min(4, moveSlot.pp));
		},
		flags: {protect: 1, mirror: 1},
		desc: "This move's power is equal to 40 * (5 - Trump Card's remaining PP after it would execute). The multiplier can't be less than 1 if Trump Card's maximum PP is raised above 5.",
	},
	twister: {
		inherit: true,
		twoType: "Flying",
		secondary: {},
		shortDesc: "Both Dragon and Flying types.",
		desc: "This move is both Dragon and Flying typed. It uses combined type effectiveness, receives STAB from both types (potentially stacking), and is included in effects that boost/reduce/negate/react to damage from either type.",
	},
	vcreate: {
		inherit: true,
		accuracy: 100,
	},
	vitalthrow: {
		inherit: true,
		basePower: 80,
	},
	waterpulse: {
		inherit: true,
		flags: {protect: 1, bullet: 1, mirror: 1, distance: 1},
	},
	watersport: {
		inherit: true,
		condition: {
			duration: 5,
			onStart(side, source) {
				this.add('-fieldstart', 'move: Water Sport', '[of] ' + source);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'brn') {
					this.debug('Water Sport prevents burns');
					const effectHolder = this.effectData.target;
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
			onResidualOrder: 21,
			onEnd() {
				this.add('-fieldend', 'move: Water Sport');
			},
		},
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
			case 'hail':
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
			case 'hail':
			case 'deltastream':
				move.basePower *= 2;
				break;
			}
		},
		desc: "Power doubles if a weather condition is active, and this move's type changes to match. Ice type during Hail, Water type during Primordial Sea or Rain Dance, Rock type during Sandstorm, Fire type during Desolate Land or Sunny Day, and Flying type during Delta Stream. If Midnight is active, it doubles in power and becomes a Dark type move. If the user is holding Utility Umbrella and uses Weather Ball during Primordial Sea, Rain Dance, Desolate Land, or Sunny Day, the move is still Normal-type and does not have a base power boost.",
	},
	woodhammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, bludg: 1},
	},
	wrap: {
		inherit: true,
		basePower: 20,
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
				if (this.effectData.source && !this.effectData.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				if(pokemon.volatiles['fullcollide']) return;
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectData.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
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
				if (move.isZOrMaxPowered && move.flags['contact']) {
					source.trySetStatus('psn', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Poison",
		contestType: "Clever",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baneful Bunker", target);
		},
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon making contact with the user become poisoned. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Bunker Down, Detect, Endure, King's Shield, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from moves. Contact: poison.",
	},
	captivate: {
		inherit: true,
		onTryImmunity(pokemon, source) {
			return source.hasAbility('irresistable') || (pokemon.gender === 'M' && source.gender === 'F') || (pokemon.gender === 'F' && source.gender === 'M');
		},
	},
	charge: {
		inherit: true,
		condition: {
			duration: 2,
			onRestart(pokemon) {
				this.effectData.duration = 2;
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
		},
	},
	destinybond: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Destiny Bond');
			},
			onFaint(target, source, effect) {
				if (!source || !effect || target.side === source.side) return;
				if (effect.effectType === 'Move' && !effect.isFutureMove) {
					if (source.volatiles['dynamax']) {
						this.add('-hint', "Dynamaxed Pokémon are immune to Destiny Bond.");
						return;
					}
					this.add('-activate', target, 'move: Destiny Bond');
					source.faint();
				}
			},
			onBeforeMovePriority: -1,
			onBeforeMove(pokemon, target, move) {
				if (move.id === 'destinybond' || this.effectData.source === 'glyphicspell') return;
				this.debug('removing Destiny Bond before attack');
				pokemon.removeVolatile('destinybond');
			},
			onMoveAborted(pokemon, target, move) {
				if(!this.effectData.source === 'glyphicspell') pokemon.removeVolatile('destinybond');
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
					this.effectData.duration--;
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
							this.effectData.move = pokemon.lastMove.id;
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
				if (!move.isZ && move.id === this.effectData.move && !attacker.volatiles['fullcollide']) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === this.effectData.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	electricterrain: {
		inherit: true,
		condition: {
			effectType: 'Terrain',
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
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
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
	},
	encore: {
		inherit: true,
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				const noEncore = [
					'assist', 'copycat', 'encore', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'sketch', 'sleeptalk', 'struggle', 'transform',
				];
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				if (move.isMax && move.baseMove) move = this.dex.getMove(move.baseMove);
				const moveIndex = target.moves.indexOf(move.id);
				if (move.isZ || noEncore.includes(move.id) || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectData.move = move.id;
				this.add('-start', target, 'Encore');
				if (this.queue.willMove(target)) { //Replaces move in the queue, updating priority
					if(!pokemon.volatiles['fullcollide']){
						this.queue.cancelMove(target);
						this.queue.insertChoice({choice: 'move', pokemon: pokemon, move: this.effectData.move}, true);
					}
				} else {
					this.effectData.duration++;
				}
			},
			onResidualOrder: 13,
			onResidual(target) {
				if (target.moves.includes(this.effectData.move) &&
					target.moveSlots[target.moves.indexOf(this.effectData.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectData.move || !pokemon.hasMove(this.effectData.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectData.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	entrainment: {
		inherit: true,
		onTryHit(target, source) {
			if (target === source || target.volatiles['dynamax']) return false;

			const additionalBannedSourceAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				'alchemy', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'receiver', 'trace', 'zenmode',
			];
			if (
				target.ability === source.ability ||
				target.getAbility().isPermanent || target.ability === 'truant' ||
				source.getAbility().isPermanent || additionalBannedSourceAbilities.includes(source.ability)
			) {
				return false;
			}
		},
		desc: "Causes the target's Ability to become the same as the user's. Fails if the target's Ability is Alchemy, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, Rage Mode, RKS System, Schooling, Shields Down, Stance Change, Truant, or Zen Mode, or the same Ability as the user, or if the user's Ability is Alchemy, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Rage Mode, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, or Zen Mode.",
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
	},
	mirrormove: {
		inherit: true,
		onTryHit(target, source) {
			const move = target.lastMove;
			if(move.uncopyable){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}
			if (!move || !move.flags['mirror'] || move.isZ || move.isMax) {
				return false;
			}
			this.useMove(move.id, source, target);
			return null;
		},
		desc: "The user uses the last move used by the target. The copied move is used against that target, if possible. Fails if the target has not made a move, if it has the Ability Own Tempo, or if the last move used cannot be copied by this move.",
	},
	mistyterrain: {
		inherit: true,
		condition: {
			effectType: 'Terrain',
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
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
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
			effectType: 'Terrain',
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
					const baseMove = this.dex.getMove(effect.id);
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
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
			},
		},
	},
	psychup: {
		inherit: true,
		onTryHit(target, source) {
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}
		},
		desc: "The user copies all of the target's current stat stage changes. This move fails if the target has the Ability Own Tempo.",
	},
	reflecttype: {
		inherit: true,
		onTryHit(target, source) {
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
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
		desc: "Causes the user's types to become the same as the current types of the target. If the target's current types include typeless and another type, typeless is ignored. Fails if the user is an Arceus or a Silvally, if the target's current type is typeless alone, or if the target has the Ability Own Tempo.",
	},
	roleplay: {
		inherit: true,
		onTryHit(target, source) {
			if (target.ability === source.ability) return false;
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}

			const additionalBannedTargetAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'wonderguard', 'zenmode',
			];

			if (target.getAbility().isPermanent || additionalBannedTargetAbilities.includes(target.ability) ||
				source.getAbility().isPermanent) {
				return false;
			}
		},
		desc: "The user's Ability changes to match the target's Ability. Fails if the user's Ability is Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, Rage Mode, RKS System, Schooling, Shields Down, Stance Change, Zen Mode, or already matches the target, or if the target's Ability is Alchemy, Own Tempo, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Rage Mode, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, or Zen Mode.",
	},
	sketch: {
		inherit: true,
		onTryHit(target, source) {
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return false;
			}
		},
		desc: "This move is permanently replaced by the last move used by the target. The copied move has the maximum PP for that move. Fails if the target has not made a move, if the target has the Ability Own Tempo, if the user has Transformed, or if the move is Sketch, Struggle, or any move the user knows.",
	},
	spectralthief: {
		inherit: true,
		//Spectral Thief getting blocked by Own Tempo implemented in scripts.ts because that's where stat-stealing is implemented
		desc: "The target's stat stages greater than 0 are stolen from it and applied to the user before dealing damage. The theft does not occur if the target has the Ability Own Tempo.",
		contestType: "Clever",
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
	},
	torment: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.volatiles['dynamax']) {
					delete pokemon.volatiles['torment'];
					return false;
				}
				this.add('-start', pokemon, 'Torment');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Torment');
			},
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
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
			onStart(target, source) {
				this.add('-singleturn', source, 'Wide Guard');
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Wide Guard blocks all spread moves, as well as Flame Burst explosion
				if (move?.target !== 'allAdjacent' && move.target !== 'allAdjacentFoes' && move.name !== "Burst") {
					return;
				}
				if (move.isZ || move.isMax) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					target.getMoveHitData(move).zBrokeProtect = true;
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
	
	/* Renamed moves */
	//For the record, the only reason editing anything other than the field name is necessary is because of Lash Out being used by a new move. If I'm doing one, might as well do them all for consistency.
	banefulbunker: {
		name: "Baneful Bunker",
		isNonstandard: "Past",
	},
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clangorous Soul", target);
		},
		desc: "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage in exchange for the user losing 33% of its maximum HP, rounded down. Fails if the user would faint or if its Attack, Defense, Special Attack, Special Defense, and Speed stat stages would not change.",
		shortDesc: "User loses 33% of its max HP. +1 to all stats.",
	},
	clangoroussoul: {
		name: "Clangorous Soul",
		isNonstandard: "Past",
	},
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moongeist Beam", target);
		},
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
	},
	moongeistbeam: {
		name: "Moongeist Beam",
		isNonstandard: "Past",
	},
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lash Out", target);
		},
		desc: "Power doubles if the user had a stat stage lowered this turn.",
		shortDesc: "2x power if the user had a stat lowered this turn.",
	},
	psychicfangs: {
		name: "Psychic Fangs",
		isNonstandard: "Past",
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stomping Tantrum", target);
		},
		desc: "Power doubles if the user's last move on the previous turn, including moves called by other moves or those used through Instruct, Magic Coat, Snatch, or the Dancer or Magic Bounce Abilities, failed to do any of its normal effects, not including damage from an unsuccessful High Jump Kick, Jump Kick, or Mind Blown, or if the user was prevented from moving by any effect other than recharging or Sky Drop. A move that was blocked by Baneful Bunker, Detect, King's Shield, Protect, Spiky Shield, Crafty Shield, Mat Block, Quick Guard, or Wide Guard will not double this move's power, nor will Bounce or Fly ending early due to the effect of Gravity or Smack Down.",
		shortDesc: "Power doubles if the user's last move failed.",
	},
	stompingtantrum: {
		name: "Stomping Tantrum",
		isNonstandard: "Past",
	},
	strangesteam: {
		name: "Strange Steam",
		isNonstandard: "Past",
	},
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
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sunsteel Strike", target);
		},
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
	},
	sunsteelstrike: {
		name: "Sunsteel Strike",
		isNonstandard: "Past",
	},
	
	/* Move-calling move exception updates */
	assist: {
		inherit: true,
		onHit(target) {
			const noAssist = [
				'assist', 'beakblast', 'behemothbash', 'behemothblade', 'belch', 'bestow', 'bounce', 'bunkerdown', 'circlethrow', 'copycat', 'counter', 'covet', 'destinybond', 'detect', 'dig', 'dive', 'dragontail', 'endure', 'eternabeam', 'feint', 'fly', 'focuspunch', 'followme', 'fullcollide', 'helpinghand', 'kingsshield', 'matblock', 'mefirst', 'metronome', 'mimic', 'mirrorcoat', 'mirrormove', 'naturepower', 'obstruct', 'phantomforce', 'playdead', 'protect', 'ragepowder', 'rebound', 'roar', 'shadowforce', 'shelltrap', 'sketch', 'skydrop', 'sleeptalk', 'slipaway', 'snatch', 'spikyshield', 'spotlight', 'struggle', 'switcheroo', 'thief', 'transform', 'trick', 'whirlwind',
			];
			
			const moves = [];
			for (const pokemon of target.side.pokemon) {
				if (pokemon === target) continue;
				for (const moveSlot of pokemon.moveSlots) {
					const moveid = moveSlot.id;
					if (noAssist.includes(moveid)) continue;
					const move = this.dex.getMove(moveid);
					if (move.isZ || move.isMax) {
						continue;
					}
					moves.push(moveid);
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, target);
		},
		desc: "A random move among those known by the user's party members is selected for use. Does not select Assist, Beak Blast, Belch, Bestow, Bounce, Bunker Down, Circle Throw, Copycat, Counter, Covet, Destiny Bond, Detect, Dig, Dive, Dragon Tail, Endure, Feint, Fly, Focus Punch, Follow Me, Full Collide, Helping Hand, King's Shield, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Phantom Force, Play Dead, Protect, Rage Powder, Rebound, Roar, Shadow Force, Shell Trap, Sketch, Sky Drop, Sleep Talk, Slip Away, Snatch, Spiky Shield, Spotlight, Struggle, Switcheroo, Thief, Transform, Trick, or Whirlwind.",
	},
	copycat: {
		inherit: true,
		onHit(pokemon) {
			const noCopycat = [
				'assist', 'beakblast', 'behemothbash', 'behemothblade', 'belch', 'bestow', 'bunkerdown', 'circlethrow', 'copycat', 'counter', 'covet', 'craftyshield', 'destinybond', 'detect', 'dragontail', 'endure', 'eternabeam', 'feint', 'focuspunch', 'followme', 'fullcollide', 'helpinghand', 'kingsshield', 'matblock', 'mefirst', 'metronome', 'mimic', 'mirrorcoat', 'mirrormove', 'naturepower', 'obstruct', 'playdead', 'protect', 'ragepowder', 'rebound', 'roar', 'shelltrap', 'sketch', 'sleeptalk', 'slipaway', 'snatch', 'spikyshield', 'spotlight', 'struggle', 'switcheroo', 'thief', 'transform', 'trick', 'whirlwind',
			];
			let move: Move | ActiveMove | null = this.lastMove;
			if (!move) return;
			if(move.uncopyable){
				this.add('-fail', pokemon, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}
			if (move.isMax && move.baseMove) move = this.dex.getMove(move.baseMove);
			if (noCopycat.includes(move.id) || move.isZ || move.isMax) {
				return false;
			}
			this.useMove(move.id, pokemon);
		},
		desc: "The user uses the last move used by any Pokemon, including itself. Fails if no move has been used, if the last move was used by a Pokemon with Own Tempo, or if the last move used was Assist, Beak Blast, Belch, Bestow, Bunker Down, Circle Throw, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Dragon Tail, Dynamax Cannon, Endure, Feint, Focus Punch, Follow Me, Full Collide, Helping Hand, King's Shield, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Obstruct, Play Dead, Protect, Rage Powder, Rebound, Roar, Shell Trap, Sketch, Sleep Talk, Slip Away, Snatch, Spiky Shield, Spotlight, Struggle, Switcheroo, Thief, Transform, Trick, or Whirlwind.",
	},
	mefirst: {
		inherit: true,
		onTryHit(target, source) {
			const action = this.queue.willMove(target);
			if (!action) return false;
			const noMeFirst = [
				'beakblast', 'chatter', 'counter', 'covet', 'focuspunch', 'mefirst', 'metalburst', 'mirrorcoat', 'rebound', 'shelltrap', 'struggle', 'thief',
			];
			const move = this.dex.getActiveMove(action.move.id);
			if(target.hasAbility('owntempo')){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return null;
			}
			if (action.zmove || move.isZ || move.isMax) return false;
			if (move.category === 'Status' || noMeFirst.includes(move.id)) return false;

			source.addVolatile('mefirst');
			this.useMove(move, source, target);
			return null;
		},
		desc: "The user uses the move the target chose for use this turn against it, if possible, with its power multiplied by 1.5. The move must be a damaging move other than Beak Blast, Chatter, Counter, Covet, Focus Punch, Me First, Metal Burst, Mirror Coat, Rebound, Shell Trap, Struggle, or Thief. Fails if the target moves before the user, or if the target has the Ability Own Tempo. Ignores the target's substitute for the purpose of copying the move.",
	},
	metronome: {
		inherit: true,
		noMetronome: [
			"After You", "Assist", "Aura Wheel", "Beak Blast", "Behemoth Bash", "Behemoth Blade", "Belch", "Bestow", "Body Press", "Bunker Down", "Copycat", "Counter", "Covet", "Crafty Shield", "Destiny Bond", "Detect", "Endure", "Feint", "Focus Punch", "Follow Me", "Full Collide", "Helping Hand", "Hyperspace Fury", "Instruct", "King's Shield", "Light of Ruin", "Mat Block", "Me First", "Metronome", "Mimic", "Mirror Coat", "Mirror Move", "Nature Power", "Obstruct", "Play Dead", "Protect", "Quash", "Quick Guard", "Rage Powder", "Rebound", "Shell Trap", "Sketch", "Sleep Talk", "Slip Away", "Snap Trap", "Snatch", "Snore", "Spiky Shield", "Spotlight", "Struggle", "Switcheroo", "Thief", "Transform", "Trick", "Wide Guard"
		],
		desc: "A random move is selected for use, other than After You, Assist, Aura Wheel, Beak Blast, Behemoth Bash, Behemoth Blade, Belch, Bestow, Body Press, Bunker Down, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Endure, Feint, Focus Punch, Follow Me, Full Collide, Helping Hand, Hyperspace Fury, Instruct, King's Shield, Light of Ruin, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Obstruct, Play Dead, Protect, Quash, Quick Guard, Rage Powder, Rebound, Shell Trap, Sketch, Sleep Talk, Slip Away, Snap Trap, Snatch, Snore, Spiky Shield, Spotlight, Struggle, Switcheroo, Thief, Transform, Trick, or Wide Guard.",
	},
	mimic: {
		inherit: true,
		onHit(target, source) {
			const disallowedMoves = ['mimic', 'sketch', 'struggle', 'transform'];
			const move = target.lastMove;
			if (source.transformed || !move) return false;
			if(move.uncopyable){
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its moves');
				return false;
			}
			if (disallowedMoves.includes(move.id) || source.moves.includes(move.id)) {
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
			const noSleepTalk = [
				'assist', 'beakblast', 'belch', 'bide', 'chatter', 'copycat', 'focuspunch', 'fullcollide', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'sleeptalk', 'slipaway', 'uproar',
			];
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				if (!moveid) continue;
				const move = this.dex.getMove(moveid);
				if (noSleepTalk.includes(moveid) || move.flags['charge'] || (move.isZ && move.basePower !== 1)) {
					continue;
				}
				moves.push(moveid);
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, pokemon);
		},
		desc: "One of the user's known moves, besides this move, is selected for use at random. Fails if the user is not asleep. The selected move does not have PP deducted from it, and can currently have 0 PP. This move cannot select Assist, Beak Blast, Belch, Bide, Copycat, Dynamax Cannon, Focus Punch, Full Collide, Me First, Metronome, Mimic, Mirror Move, Nature Power, Shell Trap, Sketch, Sleep Talk, Slip Away, Struggle, Uproar, or any two-turn move.",
	},
	/* Contest categories lol */
	accelerock: {
		inherit: true,
		contestType: "Tough",
	},
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
	coreenforcer: {
		inherit: true,
		contestType: "Cool",
	},
	courtchange: {
		inherit: true,
		contestType: "Tough",
	},
	darkestlariat: {
		inherit: true,
		contestType: "Tough",
	},
	dragondarts: {
		inherit: true,
		contestType: "Cute",
	},
	eternabeam: {
		inherit: true,
		contestType: "Beautiful",
	},
	laserfocus: {
		inherit: true,
		contestType: "Clever",
	},
	lifedew: {
		inherit: true,
		contestType: "Beautiful",
	},
	liquidation: {
		inherit: true,
		contestType: "Tough",
	},
	meteorassault: {
		inherit: true,
		contestType: "Cool",
	},
	meteorbeam: {
		inherit: true,
		contestType: "Beautiful",
	},
	naturesmadness: {
		inherit: true,
		contestType: "Cool",
	},
	noretreat: {
		inherit: true,
		contestType: "Clever",
	},
	nobleroar: {
		inherit: true,
		contestType: "Cool",
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
	},
	shelltrap: {
		inherit: true,
		contestType: "Cool",
	},
	snipeshot: {
		inherit: true,
		contestType: "Clever",
	},
	sparklingaria: {
		inherit: true,
		contestType: "Beautiful",
	},
	spiritbreak: {
		inherit: true,
		contestType: "Tough",
	},
	spiritshackle: {
		inherit: true,
		contestType: "Cool",
	},
	strengthsap: {
		inherit: true,
		contestType: "Clever",
	},
	toxicthread: {
		inherit: true,
		contestType: "Clever",
	},
	zingzap: {
		inherit: true,
		contestType: "Cute",
	},
};
