export const Moves: { [moveid: string]: ModdedMoveData } = {
	ancientpower: {
		inherit: true,
		category: "Physical",
		secondary: null,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1,}, pokemon, pokemon, move);
		},
		shortDesc: "If this move causes the opponent to faint, raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
	},
	sandsearstorm: {
		//Now always hits in Sand in addition to Rain
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (target && ['sandstorm'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
			if (target && ['raindance'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
		}
	},
	mountainmaw: {
		//Copied from Psychic Fangs, just changed to be Rock type
		num: -101,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Mountain Maw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Clever",
	},
	steelwing: {
		//Buffed secondary chance to 50%
		inherit: true,
		secondary: {
			chance: 50,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
	},
	
	scavenge: {
		num: -102,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Scavenge",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		onHit(target, source) {
		  if (source.item && !source.lastItem) {
			source.lastItem = source.item;
			source.setItem('');
			this.add('-item', source, '', '[from] move: Scavenge');
		  }
		  return null;
		},
		onAfterMove(source) {
			if (source.lastItem) {
				const item = source.lastItem;
				source.lastItem = '';
				source.setItem(item);
				this.add('-item', source, this.dex.items.get(item), '[from] move: Scavenge');
		  	}
		},
	},	  
	aquaring: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Aqua Ring');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
			onSourceModifyAtkPriority: 5,
			onSourceModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					return this.chainModify(0.5);
				}
			},
			onSourceModifySpAPriority: 5,
			onSourceModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					return this.chainModify(0.5);
				}
			},
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Water') {
					return this.chainModify(2);
				}
			},
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Water') {
					return this.chainModify(2);
				}
			},
		},
		shortDesc: "User recovers 1/16 max HP per turn. While this is active, this Pokemon's Water power is 2x and Fire power against it is halved. ",
	},

	ragingbull: {
		num: 9999,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		priority: 0,
		pp: 10,
		name: "Raging Bull",
		type: "Normal",
		effectType: "Move",
		shortDesc: "Changes type to the most effective against the target (Water, Fighting, Fire, or Normal).",
		desc: "Changes the move's and user's forme to the most effective against the target (Water, Fighting, Fire, or Normal).",
		
		beforeMoveCallback(source, target, move) {
		  const typeEffectiveness = {
			Water: this.dex.getEffectiveness('Water', target),
			Fighting: this.dex.getEffectiveness('Fighting', target),
			Fire: this.dex.getEffectiveness('Fire', target),
			Normal: this.dex.getEffectiveness('Normal', target),
			};
		  
		  let bestType = 'Normal';
		  let maxEffectiveness = -Infinity;
		  
		  for (const type in typeEffectiveness) {
			if (typeEffectiveness[type] > maxEffectiveness) {
			  maxEffectiveness = typeEffectiveness[type];
			  bestType = type;
			}
		  }
	  
		  if (bestType === 'Water') {
			source.formeChange('Tauros-Paldea-Aqua');
			source.setAbility('Adaptability');
			this.add('-ability', source, 'Adaptability');q
		  } else if (bestType === 'Fighting') {
			source.formeChange('Tauros-Paldea-Combat');
			source.setAbility('Adaptability');
			this.add('-ability', source, 'Adaptability');
		  } else if (bestType === 'Fire') {
			source.formeChange('Tauros-Paldea-Blaze');
			source.setAbility('Adaptability');
			this.add('-ability', source, 'Adaptability');
		  } else {
			source.formeChange('Tauros');
			source.setAbility('Adaptability');
			this.add('-ability', source, 'Adaptability');
		  }
	  
		  source.m.ragingBullMoveType = bestType;
		},
	  
		onPrepareHit(target, source, move) {
		  this.add('-anim', source, 'Techno Blast', target);
		},
	  
		onModifyType(move, pokemon, target) {
		  if (pokemon.m.ragingBullMoveType) {
			move.type = pokemon.m.ragingBullMoveType;
		  }
		},
	  
		target: "normal",
	}, 
	metalclaw: {
		inherit: true,
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
  	},
	iciclestorm: {
		num: -103,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Icicle Storm",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Icicle Crash', target);
		},
		weather: 'snowscape',
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		shortDesc: "Sets up a snowstorm.",
	},
	springtidestorm: {
		//Now always hits in Sand in addition to Rain
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (target && ['raindance'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
		}
	},
	spitup: {
		inherit: true,
		type: "Poison",
	},
	// clone of shell side arm
	geyser: {
		num: -104,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Geyser",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source, move) {
			if (!source.isAlly(target)) {
				this.attrLastMove('[anim] Water Spout ' + move.category);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.randomChance(1, 2))) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
		},
		onHit(target, source, move) {
			// Shell Side Arm normally reveals its category via animation on cart, but doesn't play either custom animation against allies
			if (!source.isAlly(target)) this.hint(move.category + " Geyser");
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Geyser");
		},
		secondary: null,
		target: "normal",
		type: "Water",
		shortDesc: "This move is Physical + contact if it would be stronger.",
	},
	tidalsurge: {
		num: -105,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Tidal Surge",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Water Pulse', target);
		},
		onHit(target, source, move) {
				target.addVolatile('encore');
				this.add('-anim', source, 'Encore', target);
		},
		weather: 'raindance',
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: { boost: { atk: 1 } },
		contestType: "Beautiful",
		shortDesc: "Encore + Rain Dance",
	},
	bonsaibounce: {
		num: -106,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Bonsai Bounce",
		pp: 10,
		priority: 0,
		flags: { protect: 1, contact: 1, mirror: 1, metronome: 1 },
		// checks for water move usage from opponent
		onModifyPriority(priority, source, target, move) {
			const action = this.queue.willMove(target);
			const targetMove = action?.choice === 'move' ? action.move : null;
			if (targetMove.type === 'Water') {
				this.add('-message', `Sudowoodo draws power from the water!`);
				return priority + 1;
			}
		},
		onBasePower(basePower, source) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (move.type === 'Water') {
				return basePower + 70;
			}
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Splash', target);
		},
		onHit(target) {
				this.add('-anim', source, 'Wood Hammer', target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
		shortDesc: "If the target uses a Water-type move, this attack gains +1 Priority and doubled Power.",
	},
	ironstrike: {
		//implemented via changes to Stealth Rocks and Spikes
		num: -107,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Iron Strike",
		pp: 24,
		priority: 0,
		flags: { protect: 1, contact: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Metal Claw', target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
		shortDesc: "Target takes damage from all entry hazards on their side of the field, unless they are immune.",
	},
	thunderouskick: {
		inherit: true,
		secondary: null,
		onHit(target, source, move) {
			// random # 0 or 1
		   const randomNum = Math.round(Math.random());
		   if (randomNum === 0) {
		      if (target.boosts.def !== -6) {
		         this.boost({def: -1}, target, source, move);
		   	}
		   }
			else {
		      this.add('-message', `${source.name} follows up with a Thunder Kick!`);
		      const thunderKick = {
		         name: "Thunder Kick",
		         type: "Electric",
		         basePower: 50,
				  	accuracy: 100,
	            category: "Physical",
	            priority: 0,
					onPrepareHit(target, source, move) {
						this.add('-anim', source, 'High Jump Kick', target);
					},
				  	onHit(target, source, move) {
						this.add('-anim', source, 'Thunder', target);
					},
		         flags: {contact: true, protect: true},
		      };
		      this.actions.useMove(thunderKick, source, target);
		   }
		},
		shortDesc: "50% chance to reduce Defense by 1, 50% chance to inflict an additional 50 BP Electric type damage.",
	},
	stealthrock: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, metronome: 1, mustpressure: 1 },
		sideCondition: 'stealthrock',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if ((pokemon.hasItem('heavydutyboots') && !pokemon.side.getSideCondition('kingofthehill')) || pokemon.side.getSideCondition('orderup')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * (2 ** typeMod) / 8);
			},
			// iron strike functionality
			onHit(pokemon, source, move) {
				if (move === 'ironstrike') {
					if (pokemon.hasItem('heavydutyboots')) return;
					const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
					this.damage(pokemon.maxhp * (2 ** typeMod) / 8);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: { boost: { def: 1 } },
		contestType: "Cool",
	},
	spikes: {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spikes",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
		sideCondition: 'spikes',
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
			onSwitchIn(pokemon) {
				if (((!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) && !pokemon.side.getSideCondition('kingofthehill')) || pokemon.side.getSideCondition('orderup')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
			// iron strike functionality
			onHit(pokemon, source, move) {
				if (move === 'ironstrike') {
					if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) return;
					const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
					this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: { boost: { def: 1 } },
		contestType: "Clever",
	},
		orderup: {
		num: 856,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Order Up",
		pp: 10,
		priority: 0,
		flags: { protect: 1 },
		condition: {
			duration: 1,
			onSwitchInPriority: 3,
			onSwitchIn(pokemon) {
				// when Dondozo switches back in after eating, it gains boost
				if (pokemon.name === 'Dondozo') {
					if (this.effectState.eatenBoost === 'atk' || this.effectState.eatenBoost === 'spa') {
						this.boost({ atk: 3 }, pokemon);
					}
					else if (this.effectState.eatenBoost === 'def' || this.effectState.eatenBoost === 'spd') {
						this.boost({ def: 2, spd: 2}, pokemon);
					}
					else {
						this.boost({ spe: 3}, pokemon);
					}
					// adds volatile ordered, which prevents the order up effect from occuring again until Dondozo switches out
					pokemon.addVolatile('ordered');
					// removes the side condition
					pokemon.side.removeSideCondition('orderup');
				}
				// after Dondozo switches out, this happens to the next pokemon that is switched in
				else {
					const meal = pokemon;
					// faints the eaten mon
					pokemon.faint();
					// finds highest stat of eaten mon, stored in effectState eatenBoost
					const stats = ['atk', 'def', 'spa', 'spd', 'spe'];
    				let highestStat = stats[0];
    				let maxStatValue = meal.storedStats[highestStat];

    				for (const stat of stats) {
        				if (meal.storedStats[stat] > maxStatValue) {
            			highestStat = stat;
      					maxStatValue = meal.storedStats[stat];
      				}
    				}
					this.effectState.eatenBoost = highestStat;
				}
			},
			// forces Dondozo in when a mon faints while orderup side condition is active (which can only happen when the eaten mon faints
			//onFaint(pokemon) {
    			//const dondozo = pokemon.side.pokemon.find(pkmn => pkmn.name === 'Dondozo');
    			//if (dondozo && !dondozo.fainted) {
        			//dondozo.switchFlag = true;
    			//}
			//}
		},
		// when order up hits, first checks for volatile ordered to ensure that Order Up has not already been used, then starts orderup side condition and switches Dondozo out
		onHit(target, source, move) {
			if (source.volatiles['ordered']) return;
			source.side.addSideCondition('orderup');
			this.add('-ability', source, 'Order Up');
			source.switchFlag = true;
		},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "Dragon",
	},
	toxicspikes: {
		// prevents Dondozo from being affected by Toxic Spikes during Order Up switching
		inherit: true,
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
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded() && !pokemon.side.getSideCondition('kingofthehill')) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', `[of] ${pokemon}`);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || (pokemon.hasItem('heavydutyboots') && !pokemon.side.getSideCondition('kingofthehill')) || pokemon.side.getSideCondition('orderup')) {
					// do nothing
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if ((!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) && !pokemon.side.getSideCondition('kingofthehill')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({ spe: -1 }, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	shatteredseal: {
		num: -1002,
		accuracy: true,
		basePower: 90,
		category: "Physical",
		name: "Shattered Seal",
		pp: 15,
		pseudoWeather: 'gravity',
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	}
};
  
