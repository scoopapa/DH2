export const Moves: {[k: string]: ModdedMoveData} = {	
	"metalhydropump": {
		num: 7801,
		accuracy: 80,
		basePower: 110,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		id: "metalhydropump",
		isViable: true,
		name: "Metal Hydro Pump",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	"glaze": {
		num: 7802,
		accuracy: 75,
		basePower: 60,
		category: "Special",
		desc: "Has a 30% chance to freeze the target.",
		shortDesc: "30% chance to freeze.",
		id: "glaze",
		isViable: true,
		name: "Glaze",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	"leveldive": {
		num: 7803,
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Physical",
		desc: "Deals damage equal to the user's level.",
		shortDesc: "Deals damage equal to the user's level.",
		id: "leveldive",
		isViable: true,
		name: "Level Dive",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		maxMove: {basePower: 75},
		contestType: "Tough",
	},
	"morpecanswords": {
		num: 7804,
		accuracy: 95,
		basePower: 110,
		category: "Physical",
		desc: "It's an Electric-type move with Dark-type effectiveness in it as well. It works identically to Flying Press.",
		shortDesc: "Combines Dark in its type effectiveness.",
		id: "morpecanswords",
		isViable: true,
		name: "Morpecan Swords",
		pp: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Dark', type);
		},
		priority: 0,
		secondary: null,
		target: "any",
		type: "Electric",
		zMove: {basePower: 170},
		contestType: "Tough",
	},
	"superpowergem": {
		num: 7805,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "Lowers the user's Attack and Defense by 1.",
		shortDesc: "Lowers the user's Attack and Defense by 1.",
		id: "superpowergem",
		isViable: true,
		name: "Superpower",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				atk: -1,
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	"bignelly": {
		num: 7806,
		accuracy: 95,
		basePower: 180,
		category: "Physical",
		desc: "Lowers the user's Attack, Special Attack, and Speed by 1.",
		shortDesc: "Lowers the user's Attack, Sp. Atk, and Speed by 1.",
		id: "bignelly",
		isViable: true,
		name: "Big Nelly",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				atk: -1,
				spa: -1,
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {basePower: 220},
		contestType: "Cool",
	},
	"snipe": {
		num: 7807,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "Always results in a critical hit, unless the foe has Shell Armor or other such abilities.",
		shortDesc: "Always results in a critical hit.",
		id: "snipe",
		isViable: true,
		name: "Snipe",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	"thwaczek": {
		num: 7808,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Super effective on Dragon and Electric.",
		shortDesc: "Super effective on Dragon and Electric.",
		id: "thwaczek",
		isViable: true,
		name: "Thwaczek",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dragon') return 1;
			if (type === 'Electric') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Beautiful",
	},
	"dragon2016": {
		num: 7809,
		accuracy: 80,
		basePower: 2016,
		category: "Special",
		desc: "Hits adjacent Pokemon. The user faints after using this move.",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		id: "dragon2016",
		isViable: true,
		name: "Dragon 2016",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Dragon",
		contestType: "Beautiful",
	},
	"payoff": {
		num: 7810,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Heals the target by 50% of their max HP, then forces the target to switch to a random ally. It has a priority of 0.",
		shortDesc: "Heals the target then forces them to switch to a random ally.",
		id: "payoff",
		isViable: true,
		name: "Pay Off",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, heal: 1, mystery: 1},
		onHit(target, source) {
			let success = false;
			if (source.hasAbility('megalauncher')) {
				success = !!this.heal(this.modify(target.baseMaxhp, 0.5));
			} else {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
			}
			if (success && target.side !== source.side) {
				target.staleness = 'external';
			}
			return success;
		},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	"bigkick": {
		num: 7811,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		id: "bigkick",
		isViable: true,
		name: "Big Kick",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	"honedge": {
		num: 7812,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack and accuracy by two stages each.",
		shortDesc: "Raises the user's Attack and accuracy by 2.",
		id: "honedge",
		isViable: true,
		name: "Honedge",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 2,
			accuracy: 2,
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	},
	"brightforce": {
		num: 7813,
		accuracy: 70,
		basePower: 140,
		category: "Physical",
		desc: "100% chance to lower the target's accuracy by 1.",
		shortDesc: "100% chance to lower the target's accuracy by 1.",
		id: "brightforce",
		isViable: true,
		name: "Bright Force",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	"electroshock": {
		num: 7814,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Damages target based on Sp. Def, not Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
		id: "electroshock",
		isViable: true,
		name: "Electro Shock",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	"speedbomb": {
		num: 7815,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "This move has +1 priority. The user takes recoil equal to 33% the damage dealt.",
		shortDesc: "Usually goes first. Has 33% recoil.",
		id: "speedbomb",
		isViable: true,
		name: "Speed Bomb",
		pp: 15,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	"gyarados": {
		num: 7816,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user's ability becomes Moxie. It will return to normal if the user switches out. The user's Attack and Speed are boosted by 1 stage each, even if the user's ability cannot be changed, or is already Moxie.",
		shortDesc: "The user's ability becomes Moxie, and their Atk and Speed are boosted by 1.",
		id: "gyarados",
		isViable: true,
		name: "Gyarados",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, dance: 1, protect: 1, mirror: 1, mystery: 1},
		onTryHit(pokemon) {
			if (pokemon.getAbility().isPermanent || pokemon.ability === 'moxie' || pokemon.ability === 'truant') {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('moxie');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Moxie', '[from] move: Gyarados');
				return;
			}
			return false;
		},
		boosts: {
			atk: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	"softmide": {
		num: 7817,
		accuracy: 80,
		basePower: 90,
		category: "Physical",
		desc: "Traps and damages the foe for 4-5 turns. 50% chance to lower the foe's Speed by 1.",
		shortDesc: "Traps and damages the foe. 50% chance to lower the foe's Speed by 1.",
		id: "softmide",
		isViable: true,
		name: "Soft Mide",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: {
			chance: 50,
			boosts: {
				spe: -1,
			},
		target: "normal",
		type: "Ground",
		contestType: "Clever",
	},
	"suctionseed": {
		num: 7818,
		accuracy: 80,
		basePower: 0,
		category: "Status",
		desc: "Traps and damages the foe for 1/8th of their total HP per turn for 4-5 turns, and heals the user for the amount of damage done. It's like Leech Seed with a partial trapping effect. When the trapping wears off, the damage stops as well. It doesn't affect Grass-types. Also, Binding Band and Grip Claw work with this move, extending the chip damage or duration.",
		shortDesc: "Traps and damages the foe for 4-5 turns, and heals the user for the amount of damage done.",
		id: "suctionseed",
		isViable: true,
		name: "Suction Seed",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'suctionseed',
		condition: {
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
			this.effectData.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 11,
		onResidual(pokemon) {
			const source = this.effectData.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectData.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['suctionseed'];
				this.add('-end', pokemon, this.effectData.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectData.boundDivisor);
			if (damage) {
					this.heal(damage, target, pokemon);
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectData.sourceEffect, '[suctionseed]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectData.sourceEffect.id);
			if (this.effectData.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
		onTryImmunity(target) {
			return !target.hasType('Grass');
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	"levelup": {
		num: 7819,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's level by 3.",
		shortDesc: "Raises the user's level by 3.",
		id: "levelup",
		isViable: true,
		name: "Level Up",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		onHit(pokemon) {
				if (pokemon.level >= 1) {
				pokemon.level = Math.max(1, pokemon.level + 3)};
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
	"moonraking": {
		num: 7820,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets the user's HP to 1, and raises the user's Attack and Special Attack by 12 stages each. Fails if the user has 1 hitpoint remaining, but not if the user's Attack and Special Attack are already maxed out.",
		shortDesc: "Raises the user's Attack and Special attack by 12. Sets HP to 1.",
		id: "moonraking",
		isViable: true,
		name: "Moonraking",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onHit(target) {
			if (target.hp === 1 || target.maxhp === 1) {
				return false;
			}
			this.directDamage(target.hp - 1);
			this.boost({atk: 12,
				spa: 12,}, target);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
	"drainpulse": {
		num: 7821,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "Heals for half the damage dealt. It is boosted by Mega Launcher.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "drainpulse",
		isViable: true,
		name: "Drain Pulse",
		pp: 10,
		priority: 0,
		flags: {pulse: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	"recycledammo": {
		num: 7822,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Restores 10 PP to a move on the same priority as Leppa berry. It will prioritize moves with 0 PP, and if multiple moves have 0 PP, it will restore the first one in the move list order. Otherwise, it restores 10 PP to any move that has lost PP, again prioritizing those earlier on the list.",
		shortDesc: "Restores 10 PP to first move with 0 PP, otherwise the first with PP missing.",
		id: "recycledammo",
		isViable: true,
		name: "Recycled Ammo",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onHit(pokemon) {
			const moveSlot = pokemon.moveSlots.find(move => move.pp === 0) ||
				pokemon.moveSlots.find(move => move.pp < move.maxpp);
			if (!moveSlot) return;
			moveSlot.pp += 10;
			if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp;
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
	"dragonsong": {
		num: 7823,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "10% chance to put foe to sleep. Bypasses substitutes. Has no effect on Pokemon with the Soundproof ability.",
		shortDesc: "10% chance to put foe to sleep. Bypasses substitutes.",
		id: "dragonsong",
		isViable: true,
		name: "Dragon Song",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "normal",
		type: "Dragon",
	},
	"horsey": {
		num: 7824,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Transforms the foe into a random horse.",
		shortDesc: "Transforms the foe into a random horse.",
		id: "horsey",
		isViable: true,
		name: "Horsey",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		condition: {
			onHit(target) {
				this.add('-message', `${pokemon.name} is being transformed...!?`);
				const randForm = this.random(5);
				if (randForm < 1) {
					this.add('-message', `It became a Spectrier!`);
					pokemon.formeChange('Spectrier');
					pokemon.setAbility('grimneigh');
				} else if (randForm < 2) {
					this.add('-message', `It became a Rapidash!`);
					pokemon.formeChange('Rapidash');
					pokemon.setAbility('flashfire');
				} else if (randForm < 3) {
					this.add('-message', `It became a Glastrier!`);
					pokemon.formeChange('Glastrier');
					pokemon.setAbility('chillingneigh');
				} else if (randForm < 4) {
					this.add('-message', `It became a Zebstrika!`);
					pokemon.formeChange('Zebstrika');
					pokemon.setAbility('sapsipper');
				} else {
					this.add('-message', `It became a Mudsdale!`);
					pokemon.formeChange('Mudsdale');
					pokemon.setAbility('stamina');
				}
			},
			onEnd(target) {
				if (['Spectrier', 'Rapidash', 'Mudsdale', 'Glastrier', 'Zebstrika'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	},
	"jets": {
		num: 7825,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "100% chance to raise the user's Sp. Attack by 1.",
		shortDesc: "100% chance to raise the user's Sp. Attack by 1.",
		id: "drainpulse",
		isViable: true,
		name: "Jets",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	"rocklace": {
		num: 7826,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "Sets up Stealth Rock on the foe's side.",
		shortDesc: "Sets up Stealth Rock on the foe's side.",
		id: "rocklace",
		isViable: true,
		name: "Rock Lace",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('stealthrock');
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Cool",
	},
	"beastboost": {
		num: 7827,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Boosts the user's highest stat by 2 stages. Priority for determining highest stats in the case of ties is identical to Beast Boost.",
		shortDesc: "Boosts the user's highest stat by 2.",
		id: "beastboost",
		isViable: true,
		name: "Beast Boost",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onTry(target, source, effect) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: 2}, source);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	"sandblow": {
		num: 7828,
		accuracy: 90,
		basePower: 60,
		category: "Special",
		desc: "Forces the target to switch to a random ally. -6 priority.",
		shortDesc: "Forces the target to switch to a random ally.",
		id: "sandblow",
		isViable: true,
		name: "Sand Blow",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		forceSwitch: true,
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	"berserkerz": {
		num: 7829,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "The user attacks for three turns before becoming confused. Basically a Fighting-type Outrage. It also 10% of confusing the foe whenever it hits.",
		shortDesc: "The user attacks for three turns before becoming confused. 10% of confusing the foe.",
		id: "berserkerz",
		isViable: true,
		name: "BerserkerZ",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "randomNormal",
		type: "Fighting",
		contestType: "Cool",
	},
	"sheerforce": {
		num: 7830,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "The target's ability becomes Sheer Force until they switch out, and their Atk and Sp. Attack are lowered by 1 stage each. Unlike Simple Beam, this move works if the target has Truant.",
		shortDesc: "Target's ability becomes Sheer Force, and their Atk and Sp. Attack are lowered by 1.",
		id: "berserkerz",
		isViable: true,
		name: "Sheer Force",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onTryHit(target) {
			if (target.getAbility().isPermanent || target.ability === 'sheerforce') {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('sheerforce');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Sheer Force', '[from] move: Sheer Force');
				this.boost({atk: -1, spa: -1}, pokemon, pokemon);
				return;
			}
			return false;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	"ability": {
		num: 7831,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user's ability becomes a random ability. It cannot become Wonder Guard or any custom abilities, and it can become the same ability that the Pokemon already has. The ability will go back to normal once the user switches out.",
		shortDesc: "The user gets a random ability until it is switched out.",
		id: "ability",
		isViable: true,
		name: "Ability",
		pp: 10,
		priority: 0,
		flags: {},
		noMetroability: [
			"No Ability", "Wonder Guard", "Spirit Swim", "Swords Dance", "Jawbreaker", "Cherish Coat", "Soul Soothing", "Victory Dance", "Toxicroak", "Tough Beacons", "Soft MOMENT", "Flower Head", "Flower Kiss", "Flatter", "Mystical Fire"
		],
		onHit(target, source, effect) {
			const abilities: AbilityData[] = [];
			for (const id in Abilities) {
				const move = Abilities[id];
				if (effect.noMetroability!.includes(ability.name)) continue;
				if (this.dex.getAbility(id).gen > this.gen) continue;
				abilities.push(ability);
			}
			let randomAbility = '';
			if (abilities.length) {
				abilities.sort((a, b) => a.num! - b.num!);
				randomAbility = this.sample(abilities).name;
			}
			if (!randomAbility) {
				return false;
			}
			const oldAbility = pokemon.setAbility(randomAbility);
			if (oldAbility) {
				this.add('-ability', pokemon, 'randomAbility', '[from] move: Ability');
				return;
			}
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cute",
	},
	"wideslash": {
		num: 7832,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "High crit rate. Hits all foes in a Double Battle.",
		shortDesc: "High crit rate. Hits all foes.",
		id: "wideslash",
		isViable: true,
		name: "Wide Slash",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		critRatio: 2,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		zMove: {basePower: 185},
		contestType: "Beautiful",
	},
	"batterycharge": {
		num: 7833,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Like Charge, but boosts Sp. Attack.",
		shortDesc: "Like Charge, but boosts Sp. Attack.",
		id: "batterycharge",
		isViable: true,
		name: "Battery Charge",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'charge',
		onHit(pokemon) {
			this.add('-activate', pokemon, 'move: Charge');
		},
		condition: {
			duration: 2,
			onRestart(pokemon) {
				this.effectData.duration = 2;
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
		},
		boosts: {
			spa: 1,
		},
		secondary: null,
		target: "self",
		type: "Electric",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	"flying": {
		num: 7834,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		desc: "The user is invulnerable for one turn, then hits the foe. Adds Flying to the target's typing.",
		shortDesc: "The user is invulnerable for one turn, then hits the foe. Adds Flying to the target's typing.",
		id: "flying",
		isViable: true,
		name: "Flying",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1},
		onTryMove(attacker, defender, move) {
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
		onHit(target) {
			if (!target.getTypes().join() === 'Flying') {
			this.add('-start', target, 'typechange', 'Flying');
			}
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceBasePower(basePower, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cute",
	},
	"invent": {
		num: 7835,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Boosts the user's Defense and Special Attack by 1 stage each.",
		shortDesc: "Boosts the user's Defense and Special Attack by 1.",
		id: "invent",
		isViable: true,
		name: "Invent",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spa: 1,
			def: 1,
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	"xbulma": {
		num: 7836,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		desc: "Forces the target to switch to a random ally. The user faints.",
		shortDesc: "Forces the target to switch to a random ally. The user faints.",
		id: "xbulma",
		isViable: true,
		name: "X Bulma",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		forceSwitch: true,
		selfdestruct: "always",
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	"charcoal": {
		num: 7837,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "20% chance to burn.",
		shortDesc: "20% chance to burn.",
		id: "charcoal",
		isViable: true,
		name: "Charcoal",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	"zygardestrike": {
		num: 7838,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Ignores immunities to Dragon.",
		shortDesc: "Ignores immunities to Dragon.",
		id: "charcoal",
		isViable: true,
		name: "Zygarde Strike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: {'Dragon': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dragon",
		zMove: {basePower: 180},
		contestType: "Beautiful",
	},
	"sigilyph": {
		num: 7839,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user's ability becomes Magic Guard. It will return to normal if the user switches out. The user's Defense and Special Defense are boosted by 1 stage each, even if the user's ability cannot be changed, or is already Magic Guard.",
		shortDesc: "The user's ability becomes Magic Guard, and their Defense and Sp. Defense are boosted by 1.",
		id: "magicguard",
		isViable: true,
		name: "Magic Guard",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, protect: 1, mirror: 1, mystery: 1},
		onTryHit(pokemon) {
			if (pokemon.getAbility().isPermanent || pokemon.ability === 'magicguard' || pokemon.ability === 'truant') {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('magicguard');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Magic Guard', '[from] move: Sigilyph');
				return;
			}
			return false;
		},
		boosts: {
			def: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	"leafclub": {
		num: 7840,
		accuracy: 100,
		basePower: 40,
		desc: "Hits twice.",
		shortDesc: "Hits twice.",
		id: "leafclub",
		isViable: true,
		category: "Physical",
		name: "Leaf Club",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Grass",
		maxMove: {basePower: 130},
		contestType: "Tough",
	},
	"metalarmor": {
		num: 7841,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Boosts Defense by 2 stages and Sp. Defense by 1 stage. The Pokemon becomes 1000 kg heavier.",
		shortDesc: "Boosts Defense by 2 and Sp. Defense by 1. The Pokemon becomes heavier.",
		id: "metalarmor",
		isViable: true,
		name: "Metal Armor",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: 2,
			spd: 1
		},
		onHit(pokemon) {
			if (pokemon.weighthg > 1) {
				pokemon.weighthg = Math.max(1, pokemon.weighthg + 1000);
				this.add('-start', pokemon, 'Autotomize');
			}
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	"anarchy": {
		num: 7842,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Randomly lowers one of the target's stats by 12 stages.",
		shortDesc: "Randomly lowers one of the target's stats by 12 stages.",
		id: "metalarmor",
		isViable: true,
		name: "Anarchy",
		pp: 5,
		priority: 0,
		flags: {},
		onHit(target) {
			const stats: BoostName[] = [];
			let stat: BoostName;
			for (stat in target.boosts) {
				if (target.boosts[stat] > -6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = -12;
				this.boost(boost);
			} else {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {effect: 'crit2'},
		contestType: "Tough",
	},
	blaze: {
		num: 7843,
		accuracy: 100,
		basePower: 65,
		category: "Status",
		desc: "1.5x damage if the foe holds an item. Removes the item. Special Fire-type Knock Off clone.",
		shortDesc: "1.5x damage if the foe holds an item. Removes the item.",
		id: "metalarmor",
		isViable: true,
		category: "Special",
		name: "Blaze",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Blaze', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	"levelupgust": {
		num: 7844,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "The Pokemon it hits gains one level.",
		shortDesc: "The Pokemon it hits gains one level.",
		id: "levelupgust",
		isViable: true,
		name: "Level Up Gust",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
				if (target.level >= 1) {
				target.level = Math.max(1, target.level + 1);
			}
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cute",
	},
	"partiline": {
		num: 7845,
		accuracy: 80,
		basePower: 110,
		category: "Special",
		desc: "10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
		id: "partiline",
		isViable: true,
		name: "Partiline",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	"noneofmyclank": {
		num: 7846,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "If the target is Steel-type, removes Steel-type from the target after the hit.",
		shortDesc: "Removes Steel-type from the target.",
		id: "noneofmyclank",
		isViable: true,
		name: "None of my Clank",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, move) {
			if (target.hasType('Steel')) return;
			target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
				this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: None of my Clank');
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	"prismwaterspray": {
		num: 7847,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Physical if user's Atk > Sp. Atk. Ignores abilities.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignores abilities.",
		id: "prismwaterspray",
		isViable: true,
		name: "Prism Water Spray",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	"seismicluster": {
		num: 7848,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "100% to lower foe's Special Defense.",
		shortDesc: "100% to lower foe's Special Defense.",
		id: "seismicluster",
		isViable: true,
		name: "Seismic Luster",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Beautiful",
	},
	"extremechaos": {
		num: 7849,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Maxes all stats, uses a random move, then faints.",
		shortDesc: "Maxes all stats, uses a random move, then faints.",
		id: "extremechaos",
		isViable: true,
		name: "Extreme Chaos",
		pp: 10,
		priority: 0,
		flags: {},
		noMetronome: [
			"After You", "Apple Acid", "Assist", "Astral Barrage", "Aura Wheel", "Baneful Bunker", "Beak Blast", "Behemoth Bash", "Behemoth Blade", "Belch", "Bestow", "Body Press", "Branch Poke", "Breaking Swipe", "Celebrate", "Chatter", "Clangorous Soul", "Copycat", "Counter", "Covet", "Crafty Shield", "Decorate", "Destiny Bond", "Detect", "Diamond Storm", "Double Iron Bash", "Dragon Ascent", "Dragon Energy", "Drum Beating", "Dynamax Cannon", "Endure", "Eternabeam", "False Surrender", "Feint", "Fiery Wrath", "Fleur Cannon", "Focus Punch", "Follow Me", "Freeze Shock", "Freezing Glare", "Glacial Lance", "Grav Apple", "Helping Hand", "Hold Hands", "Hyperspace Fury", "Hyperspace Hole", "Ice Burn", "Instruct", "Jungle Healing", "King's Shield", "Life Dew", "Light of Ruin", "Mat Block", "Me First", "Meteor Assault", "Metronome", "Mimic", "Mind Blown", "Mirror Coat", "Mirror Move", "Moongeist Beam", "Nature Power", "Nature's Madness", "Obstruct", "Origin Pulse", "Overdrive", "Photon Geyser", "Plasma Fists", "Precipice Blades", "Protect", "Pyro Ball", "Quash", "Quick Guard", "Rage Powder", "Relic Song", "Secret Sword", "Shell Trap", "Sketch", "Sleep Talk", "Snap Trap", "Snarl", "Snatch", "Snore", "Spectral Thief", "Spiky Shield", "Spirit Break", "Spotlight", "Steam Eruption", "Steel Beam", "Strange Steam", "Struggle", "Sunsteel Strike", "Surging Strikes", "Switcheroo", "Techno Blast", "Thief", "Thousand Arrows", "Thousand Waves", "Thunder Cage", "Thunderous Kick", "Transform", "Trick", "V-create", "Wicked Blow", "Wide Guard",
		],
		onTryHit(target) {
			this.boost({atk: 12, def: 12, spa: 12, spd :12, spe: 12}, target)},
		onHit(target, source, effect) {
			const moves: MoveData[] = [];
			for (const id in Moves) {
				const move = Moves[id];
				if (move.realMove) continue;
				if (move.isZ || move.isMax || move.isNonstandard) continue;
				if (effect.noMetronome!.includes(move.name)) continue;
				if (this.dex.getMove(id).gen > this.gen) continue;
				moves.push(move);
			}
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num! - b.num!);
				randomMove = this.sample(moves).name;
			}
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, target);
		},
		selfdestruct: "always",
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cute",
	},
	"prismcell": {
		num: 7850,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Creates a field effect halves damage from foe's attacks to the user's side of the field for 3 turns. It lasts for 6 turns if the user is holding Light Clay.",
		shortDesc: "Halves damage from foe's attacks for 3 turns. 6 if holding Light Clay.",
		id: "prismcell",
		isViable: true,
		name: "Prism Cell",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'prismcell',
		condition: {
			duration: 3,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 6;
				}
				return 3;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Prism Cell weaken');
						if (target.side.active.length > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Prism Cell');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Prism Cell');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
};
