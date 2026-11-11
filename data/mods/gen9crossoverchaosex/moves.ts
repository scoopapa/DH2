/*
List of flags and their descriptions:
authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability.
bullet: Has no effect on Pokemon with the Bulletproof Ability.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Magic Bounce Ability.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Soundproof Ability.
*/

export const Moves: {[k: string]: ModdedMoveData} = {
		jewelledsquall: {
		num: -1,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		isNonstandard: "Past",
		name: "Jewelled Squall",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bypasssub: 1},
		stealsBoosts: true,
		// Boost stealing implemented in some BattleActions#onHit callbacks probably lol !
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	earthbending: {
		num: -2,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Earthbending",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 10,
			volatilestatus: 'flinch',
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	metalbending: {
		num: -3,
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		name: "Metalbending",
		pp: 1,
		priority: 0,
		flags: {},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			for (const target of pokemon.side.foe.active) { //i copied this bullshit from vaporemons so if it doesnt work blame the person who coded this
			const type1 = 'Steel';
			const type2 = 'Ground';
				if (this.dex.getEffectiveness(type1, target) < this.dex.getEffectiveness(type2, target)) {
					move.type = 'Ground';
				} else if (target.hasType('Flying') && !target.hasItem('ringtarget')) {
					move.type = 'Ground';
				} else if (this.dex.getEffectiveness(type1, target) === this.dex.getEffectiveness(type2, target)) {
					if (pokemon.hasType('Steel') && !pokemon.hasType('Ground')) {
						move.type = 'Ground';
					}
				}
			}
		},
		onHit(target, source, move) {
			this.add('-message', `Metalbending dealt ${move.type}-type damage!`);
		},
		isZ: "tophiumz",
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	energonaxe: {
		num: -4,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		isNonstandard: "Past",
		name: "Energon Axe",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
		toxickiss: {
		num: -5,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Toxic Kiss",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox', 'slp', 'par'].includes(target.status)) return 5;
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
		badbreath: {
		num: -6,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Bad Breath",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		status: 'par',
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spd: 1}},
		contestType: "Tough",
	},
	snackattack: {
		num: -7,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		name: "Snack Attack",
		pp: 1,
		priority: 0,
		flags: {},
		onModifyTypePriority: -1,
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Snack Attack', '[of] ' + source);
					source.heal(Math.ceil(target.baseMaxhp * 0.33)); //crackshot code
				}
			}
		},
		isZ: "tophiumz",
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
		metamorphiefociesse: {
		num: 521,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Metamorphie Fociesse",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'toxicspikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison') || pokemon.hasAbility('insectbreathing')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
};
