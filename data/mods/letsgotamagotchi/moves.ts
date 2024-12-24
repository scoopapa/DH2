export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	happyhappyharmony: {
		num: 6355,
                       shortDesc: "User must recharge after use.",
		accuracy: 90,
		basePower: 150,
		category: "Special",
		name: "Happy Happy Harmony",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, sound: 1, protect: 1, mirror: 1, metronome: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},

	dadjoke: {
		num: 2552,
                       shortDesc: "Makes the target flinch: Only works on first turn out.",
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Dad Joke",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Dad Joke only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Dark",
		contestType: "Cute",
	},

	melodywaltz: {
		num: 3522,
                        shortDesc: "Increases Def/SDef by 1 + Sets up Safeguard.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Melody Waltz",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, sound: 1, metronome: 1},
condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Safeguard');
					return 7;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'Safeguard', '[persistent]');
				} else {
					this.add('-sidestart', side, 'Safeguard');
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 3,
			onSideEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},

		boosts: {
			def: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	tamaheart: {
		num: 1305,
                       shortDesc: "Recovers 10% of the user's HP: currently does not have it's secondary effect.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tama Heart",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 10],
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	smilefortomorrow: {
		num: 156,
                        shortDesc: "Heals the user to full health. Only has 1 PP.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Smile For Tomorrow",
		pp: 1,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onHit(target, source, move) {
			this.heal(target.maxhp);
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	kirakiradream: {
		num: 1229,
                        shortDesc: "Cannot miss.",
		accuracy: true,
		basePower: 90,
		category: "Special",
		name: "KirakiraDream",
		pp: 20,
		priority: 0,
		flags: {protect: 1, sound: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Cool",
	},
yumekirabag: {
		num: 2424,
                        shortDesc: "Copies enemy stat changes, then reverses them.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Yumekira Bag",
		pp: 10,
		priority: 0,
		flags: {bypasssub: 1, allyanim: 1, metronome: 1},
		onHit(target, source) {
			let i: BoostID;
			for (i in target.boosts) {
				source.boosts[i] = target.boosts[i];
			}

			const volatilesToCopy = ['dragoncheer', 'focusenergy', 'gmaxchistrike', 'laserfocus'];
			// we need to remove all crit stage volatiles first; otherwise copying e.g. dragoncheer onto a mon with focusenergy
			// will crash the server (since addVolatile fails due to overlap, leaving the source mon with no hasDragonType to set)
			for (const volatile of volatilesToCopy) source.removeVolatile(volatile);
			for (const volatile of volatilesToCopy) {
				if (target.volatiles[volatile]) {
					source.addVolatile(volatile);
					if (volatile === 'gmaxchistrike') source.volatiles[volatile].layers = target.volatiles[volatile].layers;
					if (volatile === 'dragoncheer') source.volatiles[volatile].hasDragonType = target.volatiles[volatile].hasDragonType;
				}
			}
			this.add('-copyboost', source, target, '[from] move: Psych Up');
let success = false;
			for (i in target.boosts) {
				if (target.boosts[i] === 0) continue;
				target.boosts[i] = -target.boosts[i];
				success = true;
			}
			if (!success) return false;
			this.add('-invertboost', target, '[from] move: Topsy-Turvy');
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Clever",
	},
	smapi: {
		num: 922,
                        shortDesc: "Smart Piano Pad has +3 Priority.",
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Smapi",
		pp: 30,
		priority: 3,
		flags: {contact: 1, protect: 1, sound: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
dreamcoffretpalette: {
		num: 3828,
                        shortDesc: "Changes the target's ability to Dazzling.",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "DreamCoffret Palette",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
		onTryImmunity(target) {
			// Truant and Dazzling have special treatment; they fail before
			// checking accuracy and will double Stomping Tantrum's BP
			if (target.ability === 'truant' || target.ability === 'dazzling') {
				return false;
			}
		},
		onTryHit(target) {
			if (target.getAbility().flags['cantsuppress']) {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('dazzling');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Dazzling', '[from] move: Worry Seed');
				if (pokemon.status === 'slp') {
					pokemon.cureStatus();
				}
				return;
			}
			return oldAbility as false | null;
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	pocketdesigner: {
		num: 8120,
                        shortDesc: "Destroys the target's held item by miraclising it into a useless dress.",
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Pocket Designer",
		pp: 40,
		priority: 2,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
		onHit(target, source) {
			const item = target.takeItem(source);
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Corrosive Gas', '[of] ' + source);
			} else {
				this.add('-fail', target, 'move: Corrosive Gas');
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Fairy",
	},
	moripakucoffretmarch: {
		name: "MoriPakuCoffret March",
		type: "Normal",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			const allies = pokemon.side.pokemon.filter(ally => ally != pokemon && !ally.fainted && ally.moripakucoffret);
			return 50 + 50 * allies;
		},
		accuracy: 100,
		pp: 10,
		shortDesc: "+50 BP per other unfainted MoriPakuCoffret member (Moriritchi, Coffretchi, and Candy Pakupaku)",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Close Combat", target);
		},
		secondary: null,
		target: "normal",
	},
balletspin: {
		num: 2239,
		shortDesc: "Clears hazards + boosts speed by 1.",
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Ballet Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
alienlaser: {
		num: 8303,
		shortDesc: "Has +1 Priority in Electric Terrain.",
		accuracy: 100,
		basePower: 55,
		category: "Special",
		name: "Alien Laser",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyPriority(priority, source, target, move) {
			if (this.field.isTerrain('electricterrain') && source.isGrounded()) {
				return priority + 1;
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	lovelyday: {
		num: 3398,
                       shortDesc: "20% chance to make males fall in love.",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Lovely Day",
		pp: 20,
		priority: 0,
		flags: {protect: 1, sound: 1, mirror: 1, metronome: 1},
		self: {
			onHit(source) {
				if (this.randomChance(2, 10)) {
					for (const pokemon of source.foes()) {
						pokemon.addVolatile('attract');
               }
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
}
