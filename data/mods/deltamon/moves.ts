export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		longDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	
	suckypunch: {
		name: "Sucky Punch",
		type: "Water",
		category: "Physical",
		basePower: 75,
		accuracy: 100,
		pp: 10,
		shortDesc: "User recovers 50% of damage dealt.",
		longDesc: "The user delivers a totally sucky punch. The user's HP is restored by up to half the damage taken by the target.",
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1, metronome: 1 },
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Surging Strikes", target);
		},
		drain: [1, 2],
		target: "normal",
	},
	
		spadeblast: {
		name: "Spade Blast",
		type: "Dark",
		category: "Physical",
		basePower: 45,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits twice. Attempts to hit each available foe once.",
		longDesc: "The user launches two spade-shaped projectiles at the target. If there are two opposing Pokemon, this move hits both of them once.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 2,
		smartTarget: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Fling", target);
			this.add('-anim', pokemon, "Fling", target);
		},
		target: "normal",
	},
	
	shockingsnare: {
		name: "Shocking Snare",
		type: "Electric",
		category: "Physical",
		basePower: 40,
		accuracy: 100,
		pp: 20,
		shortDesc: "Acts before switching. 2x damage if the target is switching out.",
		longDesc: "The user swiftly clasps the target using electricity filled arms. This move inflicts double damage if used on a target that is switching out.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		basePowerCallback(pokemon, target, move) {
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Shocking Snare boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		beforeTurnCallback(pokemon) {
			for (const target of pokemon.foes()) {
				target.addVolatile('pursuit');
				const data = target.volatiles['pursuit'];
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thunder Cage", target);
			this.add('-anim', pokemon, "Sucker Punch", target);
		},
		target: "normal",
	},
	
	buble: {
		name: "Buble",
		type: "Water",
		category: "Special",
		basePower: 135,
		accuracy: 95,
		pp: 5,
		shortDesc: "Buble.",
		longDesc: "Buble.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Oceanic Operetta", target);
		},
		target: "normal",
	},
	
	snowgrave: {
		name: "Snowgrave",
		type: "Ice",
		category: "Special",
		basePower: 140,
		accuracy: true,
		pp: 5,
		shortDesc: "",
		longDesc: "",
		priority: 0,
		flags: {protect: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Snowgrave'), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Blizzard", target);
			this.add ('-anim', pokemon, "Sheer Cold", target);
		},
		
		secondary: {
			chance: 15,
			status: 'frz'
		},
		target: "normal",
	},
	
	smartzephyr: {
		name: "Smart Zephyr",
		type: "Flying",
		category: "Special",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "Low Priority (Priority -6). Forces the target to switch to a random ally.",
		longDesc: "The user sends a gust of wind at the target, knocking them away and dragging out a different Pokemon.",
		priority: -6,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1,},
		forceSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
				this.add('-anim', pokemon, "Nasty Plot", target);
			this.add('-anim', pokemon, "Whirlwind", target);
		},
		target: "normal",
		contestType: "Clever",
	},
	
	bigshot: {
		name: "BIG SHOT",
		type: "Electric",
		category: "Special",
		basePower: 165,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Partially hits through Protect.",
		longDesc: "THE [Valued Customer!] USES ALL ITS [[Hyperlink Blocked]] TO FIRE A [[BIG SHOT!!!]]. THE OPPONENT'S DEFENSES [[Cannot say no to this hot new sale!]]. THIS MOVE IS A [One and done deal].",
		priority: 0,
		flags: {metronome: 1, bullet: 1, pulse: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Gigavolt Havoc", target);
		},
		target: "normal",
	},
	
	blackknife: {
		name: "Black Knife",
		type: "Dark",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 5,
		ohko: false,
		shortDesc: "Targets with 1/3 of their HP or lower are instantly KOed.",
		longDesc: "The user swiftly strikes by using a blackened sword. Instantly KOs targets with a third of their HP or less.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ceaseless Edge", target);
		},
		onTryHit(target) {
			if (target.hp * 3 <= target.maxhp)
				this.add('-message', "SWOON!"),
				move.ohko = true;
		},
		secondary: null,
		target: "normal",
	},
	
	bellchime: {
		name: "Bell Chime",
		type: "Steel",
		category: "Special",
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "10% chance to Confuse. Bypasses Substitute.",
		longDesc: "The user releases a disorienting bell chime. This move has a 10% chance to confuse the opponent.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Heal Bell", target);
			this.add('-anim', pokemon, "Hyper Voice", target);
		},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
	},
	
	bedazzlingblade: {
		name: "Bedazzling Blade",
		type: "Fairy",
		category: "Physical",
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "20% chance to confuse.",
		longDesc: "The user playfully and erratically attacks the target with a sharp blade. This move has a 20% chance to confuse the target.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Dazzling Gleam", target);
			this.add('-anim', pokemon, "Aqua Cutter", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
	},
	
	rudebuster: {
		name: "Rude Buster",
		type: "Dragon",
		category: "Physical",
		overrideDefensiveStat: 'spd',
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "Deals damage based on Special Defense rather than Defense.",
		longDesc: "The user unleashes a wave of energy consisting of their own rude thoughts. This move deals Special damage.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Dragon Pulse", target);
				this.add('-anim', pokemon, "Psyshock", target);
		},
		target: "normal",
	},
	
	omegaperseverance: {
		name: "Omega Perseverance",
		type: "Psychic",
		category: "Special",
		basePower: 190,
		accuracy: true,
		pp: 1,
		shortDesc: "Dispels target's stat changes. 50% chance to confuse the target. Disables the target's ability before doing damage.",
		longDesc: "The user dazes the target and cleverly nullifies their ability and stat changes in the process. This move has a 50% chance to leave the target confused. The target's ability is nullified before damage is dealt.",
		priority: 0,
		flags: {},
		isZ: "violetomegapetal",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Miracle Eye", target);
			this.add('-anim', pokemon, "Springtide Storm", target);
			this.add('-anim', pokemon, "Block", target);
		},
		onTryHit(target) {
			if (target.getAbility().flags['cantsuppress']) return;
			target.addVolatile('gastroacid');
		},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		
		secondary: {
			chance: 50,
			volatileStatus: 'confusion'
		},
		target: "normal",
	},
	
	omegajustice: {
		name: "Omega Justice",
		type: "Psychic",
		category: "Special",
		basePower: 120,
		accuracy: true,
		pp: 1,
		shortDesc: "Always results in a critical hit, bypasses Substitute, and ignores abilities.",
		longDesc: "The user launches a powerful blast from its gun. This move bypasses Substitute, ignores the target's ability, and always results in a critical hit.",
		priority: 0,
		flags: {bullet: 1, bypasssub: 1},
		willCrit: true,
		ignoreAbility: true,
		isZ: "goldenomegapetal",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Photon Geyser", target);
		},
	},
	
	omegabravery: {
		name: "Omega Bravery",
		type: "Fighting",
		category: "Physical",
		basePower: 18,
		accuracy: true,
		pp: 1,
		shortDesc: "Hits 10 times. Nearly always goes first (Priority +2). Attempts to hit each available foe equally. Prevents user from switching out.",
		longDesc: "The user rushes fists-first into the target, hitting them up to ten times. If there are multiple targets, this move attempts to hit them equally. This move nearly always goes first. After the move is complete, the user is prevented from switching out.",
		priority: 2,
		flags: {fist: 1},
		multihit: 10,
		smartTarget: true,
		volatileStatus: 'noretreat',
		isZ: "amberomegapetal",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "All-Out Pummeling", target);
		},
		target: "normal",
	},
	
	omegapatience: {
		name: "Omega Patience",
		type: "Fairy",
		category: "Physical",
		basePower: 215,
		accuracy: true,
		pp: 1,
		shortDesc: "Hits four turns after being used. Ignores stat changes.",
		longDesc: "The user launches a giant knife-like projectile into the air, and must patiently wait for it to come down and hit the target. This move hits four turns after being used, and ignores the target's stat changes.",
		priority: 0,
		flags: {allyanim: 1, futuremove: 1, slicing: 1},
		ignoreDefensive: true,
		isZ: 'cyanomegapetal',
		onTry(source, target) {
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 5,
				move: 'omegapatience',
				source: source,
				moveData: {
					id: 'omegapatience',
					name: "Omega Patience",
					accuracy: true,
					basePower: 215,
					category: "Physical",
					priority: 0,
					flags: {allyanim: 1, futuremove: 1, slicing: 1},
					ignoreDefensive: true,
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Fairy',
				},
			});
			this.add('-start', source, 'Omega Patience');
			return this.NOT_FAIL;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tachyon Cutter", target);
		},
		target: "normal",
	},
	
	taintedvines: {
		name: "Tainted Vines",
		type: "Grass",
		category: "Physical",
		basePower: 60,
		accuracy: 100,
		pp: 5,
		shortDesc: "For every stat boost the target has, this move gains +20 power. At 140 Base Power or more, the user heals 25% of the damage dealt.",
		longDesc: "The user catches the opponent with energy-draining vines. The more the target's stats are raised, the greater the power of the move. At 140 power or higher, the user heals a quarter of the damage dealt.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Power Whip", target);
		},
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * target.positiveBoosts();
			this.debug(`BP: ${bp}`);
			return bp;
			if (bp >= 140) {
				move.drain [1, 4];
				move.flags.heal = 1;
				this.add('-anim', pokemon, "Giga Drain", target);
			}
		},
		secondary: null,
		target: "normal",
	},
	
	jarona: {
		name: "Jarona",
		type: "Grass",
		category: "Physical",
		basePower: 95,
		accuracy: 100,
		pp: 10,
		shortDesc: "50% chance to lower the target's Defense by 1. High critical hit ratio.",
		longDesc: "The user unleashes a special punch directed at the target. This move has a 50% chance to lower the target's Defense by one stage. This move has a heightened chance of landing a critical hit.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, punch: 1},
		critRatio: 2,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Leaf Storm", target);
				this.add('-anim', pokemon, "Mach Punch", target);
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
	},
	
	gasterblaster: {
		name: "Gaster Blaster",
		type: "Ghost",
		category: "Special",
		basePower: 95,
		accuracy: 100,
		pp: 10,
		shortDesc: "If an ally has fainted during the previous turn, this attack poisons the target.",
		longDesc: "The user fires a Gaster Blaster at the target. If an ally has fainted last turn, this move will poison the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Hyper Beam", target);
		},
		onHit(target, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				source.trySetStatus('psn', target);
			}
		},
		target: "normal",
	},
	
	umbrallaser: {
		name: "Umbral Laser",
		type: "Dark",
		category: "Special",
		basePower: 140,
		accuracy: 100,
		pp: 5,
		shortDesc: "Lowers the user's Defense and Special Defense by 2 before attacking.",
		longDesc: "The user lowers its guard, harshly depleting its Defense and Special Defense stats to fire off a massive black laser using all its might.",
		priority: 0,
		flags: {protect: 1, failcopycat: 1, failmimic: 1},
	
		onPrepareHit(target, pokemon, move) {
			this.add('-message', '${pokemon.name} lowers its guard!'),
			move.boosts = {def: -2, spd: -2};
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Scale Shot", target);
			this.add('-anim', pokemon, "Doom Desire", target);
		},
		target: "normal",
	},
	
	starblazing: {
		name: "Star Blazing",
		type: "Normal",
		category: "Special",
		basePower: 130,
		accuracy: 100,
		pp: 5,
		shortDesc: "Ignores the target's stat changes.",
		longDesc: "The user drops a barrage of prismatic stars at the target. This move ignores the target's stat changes.",
		priority: 0,
		flags: {protect: 1, failcopycat: 1, failmimic: 1},
		ignoreDefensive: true,
		ignoreEvasion: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tera Starstorm", target);
		},
		target: "normal",
	},
	
	//Pollen Puff and Sharpshooter
	pollenpuff: {
		inherit: true,
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (source.hasAbility('sharpshooter')) {
					(!this.heal(Math.floor(target.baseMaxhp * 0.75))) 
						return this.NOT_FAIL;
					}
				} else {
					(!this.heal(Math.floor(target.baseMaxhp * 0.5))) 
						return this.NOT_FAIL;
					}
		}
	},
};
