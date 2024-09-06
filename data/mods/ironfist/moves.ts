export const Moves: {[moveid: string]: ModdedMoveData} = {
	silcoonsexactmovepool: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "silcoonsexactmovepool",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(source) {
			this.actions.useMove("Tackle", source);
			this.actions.useMove("String Shot", source);
			this.actions.useMove("Poison Sting", source);
			this.actions.useMove("Bug Bite", source);
			this.actions.useMove("Iron Defense", source);
		},
		secondary: null,
		target: "self",
		type: "Bug",
		shortDesc: "Uses Tackle, String Shot, Poison Sting, Bug Bite, and Iron Defense.",
	},
  	pog: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "POG",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "G-Max Steelsurge", target);
		},
		onEffectiveness(typeMod, target, type) {
		    return 1;
		},
		selfBoost: {
			boosts: {
				atk: 1,
			},
		},
		status: 'par',
		target: "normal",
		type: "Steel",
		shortDesc: "Always super-effective. Always paralyzes. Raises user's attack by one stage.",
		contestType: "Beautiful",
	},
  	velvetblade: {
		num: 371,
		accuracy: 100,
		basePower: 100,
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Night Slash", target);
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Payback NOT boosted');
				return move.basePower;
			}
			this.debug('Payback damage boost');
			return move.willCrit = true;
		},
		category: "Physical",
		name: "Velvet Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		shortDesc: "If user moved after target, always crits.",
		contestType: "Tough",
	},
  	mogoff: {
		num: 542,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Mog Off",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bulk Up", target);
		},
		secondary: {
			chance: 50,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "50% chance to confuse the target.",
	},
  	chocolatekiss: {
		num: 411,
		accuracy: 60,
		basePower: 100,
		category: "Physical",
		name: "Chocolate Kiss",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Lovely Kiss", target);
		},
		secondary: {
			chance: 70,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		shortDesc: "Usually moves first. 70% chance to lower target's speed by 1.",
		contestType: "Cool",
	},
  	fishingminigame: {
		num: 615,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Fishing Minigame",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Anchor Shot", target);
		},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},
  	stankyleg: {
		num: 440,
		accuracy: 95,
		basePower: 60,
		category: "Physical",
		name: "Stanky Leg",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Rolling Kick", target);
		},
		secondary: {
			chance: 100,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		contestType: "Cool",
		shortDesc: "100% chance to badly poison the target.",
	},
  	triplerkick: {
		num: 813,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Tripler Kick",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Triple Kick", target);
		},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	gorgingmissile: {
		num: 514,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Gorging Missile",
		shortDesc: "If user is under 50% max HP, paralyzes the opponent.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Snipe Shot", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				move.status = 'par';
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	goombastomp: {
		num: 247,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Goomba Stomp",
		shotDesc: "100% chance to lower the target's Defense by 1. OHKOs Goomba.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "High Jump Kick", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		onModifyMove(pokemon, move) {
			for (const target of pokemon.foes()) {
				if (target.name === 'Goomba') {
					move.ohko = true;
				}
			}
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	silcoonblast: {
		num: 547,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Silcoon Blast",
		shortDesc: "Turns the opponent into Silcoon.",
		pp: 166,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		secondary: null,
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Hyper Beam", target);
		},
		onHit(target, pokemon, move) {
			for (const target of pokemon.foes()) {
				target.formeChange('Silcoon');
			}
		},
		target: "normal",
		type: "Bug",
		contestType: "Beautiful",
	},
	gofish: {
		num: 389,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Go Fish",
		shortDesc: "Forces the target to switch. Fails if the target is not attacking.",
		pp: 5,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		forceSwitch: true,
		onPrepareHit(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? source.switchFlag = true : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
}
