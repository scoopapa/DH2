export const Moves: {[moveid: string]: ModdedMoveData} = {	
	"gastroacid": {
		inherit: true,
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart(pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
				if (pokemon.m.innates) (pokemon.m.innates as string[]).forEach(innate => pokemon.removeVolatile("ability" + innate));
			},
		},
	},
	
	taunt: {
		num: 269,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Taunt",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'taunt',
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst' && move.id !== 'fifthmove') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	
	fifthmove: {
		num: 3000,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Fifth Move",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onHit(target, source, effect) {
//			this.add('-message', source.species.name);
			if (source.species.name === 'Threedy' || source.species.name === 'threedy') {
				this.useMove("Replicate", source);
			}
			if (source.species.name === 'Amvip' || source.species.name === 'amvip') {
				this.useMove("Lethal Fang", source);
			}
			if (source.species.name === 'Capsaken' || source.species.name === 'capsaken') {
				this.useMove("Revitalization", source);
			}
			if (source.species.name === 'Shinamako' || source.species.name === 'shinamako') {
				this.useMove("Cumbersome Crash", source);
			}
			if (source.species.name === 'Abrakin' || source.species.name === 'abrakin') {
				this.useMove("Curse of the Moon", source);
			}
			if (source.species.name === 'Avasterror' || source.species.name === 'avasterror') {
				this.useMove("Poseidon's Breath", source);
			}
			if (source.species.name === 'Dustrake' || source.species.name === 'dustrake') {
				this.useMove("Duststorm Whip-Up", source);
			}
			if (source.species.name === 'Eneryth' || source.species.name === 'eneryth') {
				this.useMove("Energy Breaker", source);
			}
			if (source.species.name === 'Skyrider' || source.species.name === 'skyrider') {
				this.useMove("Final Judgment", source);
			}
			if (source.species.name === 'Tusquoka' || source.species.name === 'tusquoka') {
				this.useMove("Enforcer Punch", source);
			}
			if (source.species.name === 'Turbulusk' || source.species.name === 'turbulusk') {
				this.useMove("Liftoff", source);
			}
			if (source.species.name === 'Baloonpopped' || source.species.name === 'baloonpopped' || source.species.name === 'Baloon-Popped' || source.species.name === 'baloon-popped') {
				this.useMove("Confidence Rush", source);
			}
			if (source.species.name === 'Rapteroid' || source.species.name === 'rapteroid') {
				this.useMove("Orbital Launch", source);
			}
			if (source.species.name === 'Lilyqueen' || source.species.name === 'lilyqueen') {
				this.useMove("Tidal Force", source);
			}
			if (source.species.name === 'Gladiarbor' || source.species.name === 'gladiarbor') {
				this.useMove("Old-Growth Strike", source);
			}
			if (source.species.name === 'Showmandril' || source.species.name === 'showmandril') {
				this.useMove("Danger Stunt", source);
			}
			if (source.species.name === 'Animeleon' || source.species.name === 'animeleon') {
				this.useMove("Corrosive Acid", source);
			}
			if (source.species.name === 'Equivalor' || source.species.name === 'equivalor') {
				this.useMove("Transmutate", source);
			}
		},
		target: "self",
		type: "Normal",
		contestType: "Cute",
	},
	
	replicate: {
		num: 3001,
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		name: "Replicate",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		basePowerCallback(pokemon, target, move) {
			const item = pokemon.getItem();
			if (!item.fling) return false;
			return item.fling.basePower;
		},
    
    /// this will basically be just a fling that doesn't remove the user's item for now, no idea where to even start with coding this
		
    secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cute",
	},

	lethalfang: {
		num: 3002,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Lethal Fang",
		pp: 1,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'tox',
      boosts: {
        atk: -1,
		  def: -1,
        spa: -1,
        spd: -1,
        spe: -1,
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},

	revitalization: {
		num: 3003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Revitalization",
		pp: 1,
		priority: 0,
		flags: {heal: 1},
		onHit(target, source, move) {
			this.heal(target.maxhp);
      this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		secondary: null,
		target: "self",
		type: "Fire",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},

	cumbersomecrash: {
		num: 3004,
		accuracy: 100,
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Fishious Rend damage boost');
				return move.basePower * 2;
			}
			this.debug('Fishious Rend NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		name: "Cumbersome Crash",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
	},
  
  curseofthemoon: {
		num: 3005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Curse of the Moon",
		pp: 1,
		priority: 0,
		flags: {mystery: 1},
		onHit(target) {
			const type = ["Ghost", "Dark",];
			target.setType(type);
			this.add('-start', target, 'typechange', 'Ghost', '[from] move: Curse of the Moon');
			this.add('-start', target, 'typeadd', 'Dark', '[from] move: Curse of the Moon');
		},
    boosts: {
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Cool",
	},

	poseidonsbreath: {
		num: 3006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Poseidon's Breath",
		pp: 1,
		priority: 0,
		flags: {mystery: 1},
		volatileStatus: 'gastroacid',
		onTryHit(target) {
			this.heal(target.maxhp);
			if (target.getAbility().isPermanent) {
				return false;
			}
		},
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart(pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
        },
			onCopy(pokemon) {
				if (pokemon.getAbility().isPermanent) pokemon.removeVolatile('gastroacid');
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
  
  duststormwhipup: {
		num: 3007,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Duststorm Whip-Up",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		weather: "Sandstorm",
		secondary: null,
		target: "normal",
		type: "Ground",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
  
	energybreaker: {
		num: 3008,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Energy Breaker",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mystery: 1},
		volatileStatus: 'energybreaker',
		onTryMove(attacker, defender, move) {
			if (defender.getAbility().isPermanent) {
				return false;
			}
			else {
				attacker.addVolatile('embargo');
				attacker.addVolatile('energybreaker');
				defender.addVolatile('embargo');
				defender.addVolatile('energybreaker');
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				pokemon.addVolatile('embargo');
				pokemon.addVolatile('gastroacid');
			},
			onCopy(pokemon) {
				if (pokemon.getAbility().isPermanent) pokemon.removeVolatile('energyrbeaker');
			},
			onResidual(pokemon) {
				duration = duration + 1;
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},

	finaljudgment: {
		num: 3009,
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Final Judgment",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		contestType: "Beautiful",
	},

	enforcerpunch: {
		num: 3010,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Enforcer Punch",
		pp: 1,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1, punch: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Fighting', type);
		},
		priority: 0,
		secondary: null,
		target: "any",
		type: "Normal",
		zMove: {basePower: 170},
		contestType: "Tough",
	},

  liftoff: {
		num: 3011,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Liftoff",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit(target, source, move) {
		  	source.formeChange('Turbulusk-Airborne', this.effect, true);
			this.add('-message', source.species.name);
    	},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Liftoff', '[of] ' + source);
				}
				const item2 = source.takeItem();
				if (item2) {
					this.add('-enditem', source, item2.name, '[from] move: Liftoff', '[of] ' + source);
				}        
			}
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	
	confidencerush: {
		num: 3012,
		accuracy: 100,
		basePower: 120,
		onAfterHit(target, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				this.boost({atk: 6, spa: 6}, pokemon);
			}
		},
		category: "Special",
		name: "Confidence Rush",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {basePower: 160},
		contestType: "Cool",
	},
	
	orbitallaunch: {
		num: 3013,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Orbital Launch",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		basePowerCallback(pokemon, target, move) {
			var hazards = 0;
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + pokemon);
					success = true;
					hazards = hazards + 5;
				}
			}
			for (const sideCondition of removeAll) {
				if (pokemon.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + pokemon);
					success = true;
					hazards = hazards + 5;
				}
			}
			this.field.clearTerrain();
			return move.basePower + hazards;
		},
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},

	tidalforce: {
		num: 3014,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Tidal Force",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		weather: 'RainDance',
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	
	oldgrowthstrike: {
		num: 3015,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Old-Growth Strike",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		terrain: 'grassyterrain',
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
				if (move.type === 'Grass' && attacker.isGrounded()) {
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
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
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
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	
	dangerstunt: {
		num: 3016,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		name: "Danger Stunt",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	
	corrosiveacid: {
		num: 3017,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Corrosive Acid",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		volatileStatus: 'gastroacid',
		onTryHit(target) {
			if (target.getAbility().isPermanent) {
				return false;
			}
		},
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart(pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
			},
			onCopy(pokemon) {
				if (pokemon.getAbility().isPermanent) pokemon.removeVolatile('gastroacid');
			},
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	
	transmutate: {
		num: 3018,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Transmutate",
		pp: 1,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'electricterrain',
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
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
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
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
};
