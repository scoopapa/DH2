'use strict';
 exports.BattleMovedex = {
		"constrict": {
       inherit: true,
		   basePower: 80,
       volatileStatus: 'partiallytrapped',
       secondary: {
			   chance: 20,
			   boosts: {
				    spe: -1,
			   },
			   chance: 100,
			   onHit: function (target, source, move) {
				   if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			   },
		   },
		   type: "Poison",
       zMovePower: 160,
	   },
     "sleeptalk": {
        inherit: true,
        onHit: function (pokemon) {
		 	     let moves = [];
		 	     for (const moveSlot of pokemon.moveSlots) {
		 		      const move = moveSlot.id;
		 		      const noSleepTalk = [
		 			       'assist', 'beakblast', 'belch', 'bide', 'chatter', 'copycat', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'rest', 'shelltrap', 'sketch', 'sleeptalk', 'uproar',
		 		      ];
		 		      if (move && !(noSleepTalk.includes(move) || this.getMove(move).flags['charge'] || (this.getMove(move).isZ && this.getMove(move).basePower !== 1))) {
		 			       moves.push(move);
		 		      }
		 	     }
		 	     let randomMove = '';
		 	     if (moves.length) randomMove = this.sample(moves);
		 	     if (!randomMove) {
		 		      return false;
		 	     }
		 	     this.useMove(randomMove, pokemon);
		 },
     "icebeam": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "fireblast": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "moonblast": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "signalbeam": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
    "solarbeam": {
       inherit: true,
       flags: {charge: 1, protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "hydropump": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "aeroblast": {
        inherit: true,
        flags: {protect: 1, mirror: 1, distance: 1, bullet: 1, pulse: 1},
     },
     "gunkshot": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "boomburst": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1, sound: 1, authentic: 1},
     },
     "psybeam": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "aurorabeam": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "spikecannon": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "pinmissile": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "fusionbolt": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "chargebeam": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "flameburst": {
        inherit: true,
        flags: {protect: 1, mirror: 1, bullet: 1, pulse: 1},
     },
     "flashcannon": {
        inherit: true,
        flags: {protect: 1, mirror: 1, reflectable: 1, bullet: 1, pulse: 1},
     }, 
     "fairylock": {
        inherit: true,
        accuracy: 100,
        basePower: 80,
        category: "Physical",
		    desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		    shortDesc: "Prevents the target from switching out.",
        pp: 10,
        flags: {protect: 1, mirror: 1},
        secondary: {
			     chance: 100,
			     onHit: function (target, source, move) {
				      if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			     },
		     },
		     target: "normal",
		     zMovePower: 160,
     },
     "banefulbunker": {
        inherit: true,
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
		 		        if (move.flags['contact']) {
		 			         source.trySetStatus('tox', target);
		 		        }
		 		        return null;
		 	      },
		    },
     },
     "teleport": {
        inherit: true,
        selfSwitch: true,
     },
     "smokescreen": {
        inherit: true,
        selfSwitch: true,
        boosts: {
     },
     "firepunch": {
        inherit: true,
        basePower: 80,
        zMovePower: 160,
     },
     "icepunch": {
        inherit: true,
        basePower: 80,
        zMovePower: 160,
     },
     "thunderpunch": {
        inherit: true,
        basePower: 80,
        zMovePower: 160,
     },
     "shadowpunch": {
        inherit: true,
        basePower: 80,
        breaksProtect: true,
        zMovePower: 160,
     },
     "wakeupslap": {
        inherit: true,
        basePower: 80,
        zMovePower: 160,
     },
     "irontail": {
        inherit: true,
        accuracy: 90,
     },
     "stoneedge": {
        inherit: true,
        accuracy: 90,
     },
     "wildcharge": {
        inherit: true,
        basePower: 120,
        pp: 15,
        recoil: [33, 100],
        zMovePower: 190,
     },
     "volttackle": {
        inherit: true,
        basePower: 150,
        accuracy: 80,
        pp: 5,
        recoil: [1, 2],
        zMovePower: 200,
     },
     "cometpunch": {
		    num: 4,
		    accuracy: 100,
		    basePower: 80,
		    category: "Physical",
		    desc: "Has a 30% chance to lower the target's Defence by 1 stage.",
		    shortDesc: "30% chance to lower the target's Def by 1.",
		    id: "cometpunch",
		    isViable: true,
		    name: "Comet Punch",
		    pp: 15,
		    priority: 0,
		    flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		    secondary: {
			     chance: 30,
			     boosts: {
				      def: -1,
			     },
		    },
		    target: "normal",
		    type: "Fairy",
		    zMovePower: 160,
	    },
      "mudbomb": {
        inherit: true,
        basePower: 80,
        zMovePower: 160,
     },
     "shockwave": {
        inherit: true,
        basePower: 40,
        priority: 1,
        zMovePower: 100,
     },
     "mindblown": {
		    num: 720,
		    accuracy: 80,
		    basePower: 150,
		    category: "Special",
		    desc: "If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.",
		    shortDesc: "Has 1/2 recoil.",
		    id: "mindblown",
		    isViable: true,
		    name: "Mind Blown",
		    pp: 5,
		    priority: 0,
		    flags: {protect: 1, mirror: 1},
        recoil: [1, 2],
		    secondary: false,
		    target: "allAdjacent",
		    type: "Fire",
		    zMovePower: 200,
		    contestType: "Cool",
	    },
      "rototiller": {
	 	     num: 563,
		     accuracy: true,
		     basePower: 0,
		     category: "Status",
		     desc: "Raises the Attack, Special Attack and Crit Rate of all grounded Grass-type Pokemon on the field by 1 stage.",
		     shortDesc: "Raises Atk, Sp. Atk and Crit Rate of grounded Grass types by 1.",
		     id: "rototiller",
		     name: "Rototiller",
		     pp: 10,
		     priority: 0,
		     flags: {distance: 1, nonsky: 1},
		     onHitField: function (target, source) {
			     let targets = [];
			     let anyAirborne = false;
			     for (const side of this.sides) {
				     for (const pokemon of side.active) {
					     if (!pokemon || !pokemon.isActive) continue;
					     if (!pokemon.runImmunity('Ground')) {
						     this.add('-immune', pokemon, '[msg]');
						     anyAirborne = true;
						     continue;
					     }
					     if (pokemon.hasType('Grass')) {
						     // This move affects every grounded Grass-type Pokemon in play.
						     targets.push(pokemon);
					     }
				     }
			     }
			     if (!targets.length && !anyAirborne) return false; // Fails when there are no grounded Grass types or airborne Pokemon
			     for (const pokemon of targets) {
				     this.boost({atk: 1, spa: 1}, pokemon, source);
				     return critRatio + 1;
			     }
		     },
		     secondary: false,
		     target: "all",
		     type: "Ground",
		     zMoveBoost: {atk: 1},
		     contestType: "Tough",
	     },
};
