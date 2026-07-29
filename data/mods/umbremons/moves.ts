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
	// New Moves
	rapidfire: {
		num: -1,
		accuracy: 100,
		basePower: 15,
		category: "Special",
		name: "Rapid Fire",
		shortDesc: "Hits 2-5 times. Usually goes first.",
		pp: 20,
		noPPBoosts: true,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flamethrower", target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	sunkenlunge: {
		num: -2,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		name: "Sunken Lunge",
		shortDesc: "Hits first. First turn out only. Target's Speed -1.",
		pp: 16,
		noPPBoosts: true,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Splash", source);
			this.add('-anim', source, "Jaw Lock", target);
		},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Sunken Lunge only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
	starburst: {
		num: -3,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Starburst",
		shortDesc: "Applies spotlight on target. Usually goes first.",
		pp: 16,
		noPPBoosts: true,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", source);
			this.add('-anim', source, "Accelerock", target);
		},
		tracksTarget: true,
		secondary: {
			chance: 100,
			volatileStatus: 'spotlight',
		},
		target: "normal",
		type: "Fairy",
	},
	lasercut: {
		num: -4,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Laser Cut",
		shortDesc: "Physical if stronger. Target has screen; crit.",
		pp: 12,
		noPPBoosts: true,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
			}
			if (target.side.getSideCondition('reflect') || target.side.getSideCondition('lightscreen') || target.side.getSideCondition('auroraveil')) move.willCrit = true;

			
		},
		onHit(target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Laser Cut");
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (move.category === 'Physical') {
				this.add('-anim', source, "Tachyon Cutter", target);
				return;
			}
			this.add('-anim', source, "Flash Cannon", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	prevailingwind: {
		num: -5,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Prevailing Wind",
		pp: 16,
		noPPBoosts: true,
		priority: 3,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tailwind", target);
			this.add('-anim', target, "Aeroblast", target);
		},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || !move.flags['wind']) {
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Flying",
		shortDesc: "100% flinch. Fails unless target using a wind move.",
	},
	cardiotoxin: {
		num: -6,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Cardiotoxin",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const recoilMult = pokemon.hasType('Poison') ? 1 : 2;
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp * recoilMult / 2), pokemon, pokemon, this.dex.conditions.get('Cardiotoxin'), true);
				if (pokemon.hp <= pokemon.maxhp * recoilMult / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gunk Shot", source);
			this.add('-anim', source, "Sludge Wave", target);
		},
		mindBlownRecoil: true,
		secondary: {
			chance: 100,
			status: 'tox',
		},
		target: "allAdjacent",
		type: "Poison",
		shortDesc: "Badly Poisons all adjacent. User loses 100% max hp; 50% if Poison type.",
		desc: "User loses 100% of its max HP to deal damage to all adjacent Pokemon, inflicting Toxic poison if applicable. If the user is Poison-type, lose 50% of its max HP instead.",
	},
	mistystep: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Misty Step",
		pp: 12,
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Haze", source);
			this.add('-anim', source, "Teleport", source);
		},
		// TODO show prepare message before the "POKEMON used MOVE!" message
		// This happens even before sleep shows its "POKEMON is fast asleep." message
		terrain: 'mistyterrain',
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "Fairy",
		shortDesc: "Starts Misty Terrain. User switches out.",
	},
	fistbump: {
		num: -8,
		accuracy: 100,
		basePower: 10,
		category: "Physical",
		name: "Fist Bump",
		pp: 16,
		noPPBoosts: true,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, punch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mach Punch", target);
			this.add('-anim', source, "Mega Punch", source);
		},
		volatileStatus: 'helpinghand',
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 70},
		shortDesc: "Usually moves first. Grants helping hand to target.",
		desc: "+2 priority. Grants the effect of helping hand to the target.",
	},
	reflexjolt: {
		num: -9,
		accuracy: 100,
		basePower: 10,
		category: "Special",
		name: "Reflex Jolt",
		pp: 16,
		noPPBoosts: true,
		priority: 2,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunderclap", target);
			this.add('-anim', source, "Nasty Plot", source);
		},
		volatileStatus: 'helpinghand',
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {basePower: 70},
		shortDesc: "Usually moves first. Grants helping hand to target.",
		desc: "+2 priority. Grants the effect of helping hand to the target.",
	},

	// Adjusted Moves
	rockslide: {
		inherit: true,
		modded: true, // this makes its description display in Data Mod
		shortDesc: "20% chance to make the foe(s) flinch.",
		desc: "20% chance to make the foe(s) flinch.",
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
	},
	// Snatch got buffed, but in reality the changes are applied to the moves it now affects
	snatch: {
		inherit: true,
		isNonstandard: null,
	},
	revivalblessing: {
		inherit: true,
		flags: {heal: 1, nosketch: 1, snatch: 1},
	},
	filletaway: {
		inherit: true,
		flags: {snatch: 1},
	},
	tidyup: {
		inherit: true,
		flags: {snatch: 1},
	},
	astonish: {
		inherit: true,
		modded: true, // this makes its description display in Data Mod
		basePower: 20,
		category: "Special",
		pp: 12,
		noPPBoosts: true,
		priority: 2,
		flags: {contact: 1, mirror: 1, noassist: 1, failcopycat: 1},
		breaksProtect: true,
		// Breaking protection implemented in scripts.js
		secondary: null,
		shortDesc: "Nullifies Detect, Protect, and Quick/Wide Guard.",
		desc: "Nullifies Detect, Protect, and Quick/Wide Guard.",
	},
	return: {
		inherit: true,
		isNonstandard: null,
		basePower: 102,
		basePowerCallback(pokemon) {
			// this section looks redundant, but there is hard-coding around Return in the unmodded /sim/pokemon.ts that expects it
			return 102;
		},
		pp: 20,
		noPPBoosts: true,
		modded: true, // this makes its description display in Data Mod
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	
	// sandclock interactions
	solarbeam: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'];
			// updating conditional to return false if both sandstorm is active and the user has the ability sandclock active at the same time
			if (weakWeathers.includes(pokemon.effectiveWeather()) && !(['sandstorm'].includes(pokemon.effectiveWeather()) && pokemon.hasAbility('sandclock'))) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			// updating conditional to return false if both sandstorm is active and the user has the ability sandclock active at the same time
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'];
			if (weakWeathers.includes(pokemon.effectiveWeather()) && !(['sandstorm'].includes(pokemon.effectiveWeather()) && pokemon.hasAbility('sandclock'))) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	lunarblessing: {
		inherit: true,
		isNonstandard: null,
	},
	skydrop: {
		inherit: true,
		pp: 12,
		noPPBoosts: true,
		isNonstandard: null,
	},
	thunderclap: {
		inherit: true,
		isNonstandard: null,
	},
	// magic warp altered duration
	magicroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (effect?.name === "Magic Warp") {
					this.add('-activate', source, 'ability: Magic Warp', '[move] Magic Room');
					return 0;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Magic Room');
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
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 6,
			onFieldEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectState.source);
			},
		},
	},
};
