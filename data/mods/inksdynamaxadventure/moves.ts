export const Moves: {[k: string]: ModdedMoveData} = {
	gmaxfinale: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Power is equal to the base move's Max Move power. If this move is successful, each Pokemon on the user's side restores 1/6 of its current maximum HP, even if they have a substitute.",
		shortDesc: "Base move affects power. Allies: +1/6 max HP.",
		name: "G-Max Finale",
		pp: 5,
		priority: 0,
		flags: {heal: 1},
		isMax: "Alcremie",
		self: {
			onHit(target, source, move) {
				for (const pokemon of source.side.active) {
					this.heal(pokemon.maxhp / 6, pokemon, source, move);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fairy",
		contestType: "Cool",
	},
	
	gmaxsmite: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug('Boosted for getting hit by ' + target);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		desc: "Power is equal to the base move's Max Move power. If this move is successful, each Pokemon on the opposing side becomes confused, even if they have a substitute.",
		shortDesc: "Base move affects power. Foes: confused.",
		name: "G-Max Smite",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Hatterene",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					const damagedByTarget = source.attackedBy.some(
						p => p.source === pokemon && p.damage > 0 && p.thisTurn
					);
					if (damagedByTarget) {
						this.debug('Boosted for getting hit by ' + source);
						pokemon.trySetStatus('par', source);
					}
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fairy",
		contestType: "Cool",
	},
	
	
	stealthrock: {
		inherit: true,
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('hardhat')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	
	gmaxbaddybad: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "This move summons Reflect for 5 turns upon use.",
		shortDesc: "Summons Reflect.",
		name: "G-Max Baddy Bad",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Eevee",
		self: {
			sideCondition: 'reflect',
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	
	gmaxglitzyglow: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "This move summons Light Screen for 5 turns upon use.",
		shortDesc: "Summons Light Screen.",
		name: "G-Max Glitzy Glow",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Eevee",
		self: {
			sideCondition: 'lightscreen',
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Psychic",
		contestType: "Cool",
	},
	
	gmaxhydrosnipe: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Power is equal to the base move's Max Move power. This move ignores the abilities of opposing Pokemon.",
		shortDesc: "Base move affects power. Ignores abilities.",
		name: "G-Max Hydrosnipe",
		pp: 5,
		priority: 0,
		flags: {},
		onModifyMove(move, pokemon, target) {
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
		},
		onHit(target, source, move) {
			this.hint(move.category + " Hydrosnipe");
		},
		onAfterSubDamage(damage, target, source, move) {
			this.hint(move.category + " Hydrosnipe");
		},
		isMax: "Inteleon",
		secondary: null,
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	
	snipeshot: {
		num: 745,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a higher chance for a critical hit. This move cannot be redirected to a different target by any effect.",
		shortDesc: "High critical hit ratio. Cannot be redirected.",
		name: "Snipe Shot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon, target) {
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
		},
		onHit(target, source, move) {
			this.hint(move.category + " Snipe Shot");
		},
		onAfterSubDamage(damage, target, source, move) {
			this.hint(move.category + " Snipe Shot");
		},
		tracksTarget: true,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	
	freezingglare: {
		num: 821,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Freezing Glare",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move){
			const atk = target.getStat('atk', false, true);
			const spa = target.getStat('spa', false, true);
			if (atk && atk >= spa) {
				this.boost({atk: -1}, target);
			} else if (spa) {
				this.boost({spa: -1}, target);
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	
	fierywrath: {
		num: 822,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Fiery Wrath",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move){
			if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod < 0) {
				this.boost({spa: 1}, source);
			}
			
		},
		onAfterSubDamage(damage, target, source, move) {
			this.boost({spa: 1}, source);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
	},
	
	glaciallance: {
		num: 824,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Glacial Lance",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ice",
	},
	
	astralbarrage: {
		num: 825,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Astral Barrage",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ghost",
	},
	
	stealthrock: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Factors Rock weakness.",
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stealthrock',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('hardhat')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	
	snowfill: {
		num: 0.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Snowfill",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('hail')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Hail.",
	},
	
	spectralthief: {
		inherit: true, 
		basePower: 60, 
	}, 
	
	spectraltrick: {
		num: 0.2,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Spectral Trick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		swapsBoosts: true,
		// Boost swapping implemented in scripts.js
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
		shortDesc: "User trades stat changes with the target, then attacks.", 
	},
	
	
	gearup: {
		num: 674,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gear Up",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, authentic: 1},
		onHitSide(side, source, move) {
			const targets = [];
			for (const pokemon of side.active) {
				if (pokemon.hasAbility(['plus', 'minus', 'eleki', 'drago'])) {
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
		secondary: null,
		target: "allySide",
		type: "Steel",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	magneticflux: {
		num: 602,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Magnetic Flux",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, distance: 1, authentic: 1},
		onHitSide(side, source, move) {
			const targets = [];
			for (const pokemon of side.active) {
				if (pokemon.hasAbility(['plus', 'minus', 'eleki', 'drago'])) {
					targets.push(pokemon);
				}
			}
			if (!targets.length) return false;
			let didSomething = false;
			for (const target of targets) {
				didSomething = this.boost({def: 1, spd: 1}, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
		secondary: null,
		target: "allySide",
		type: "Electric",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	
	snowsap: {
		num: 0.3,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Snow Sap",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, heal: 1},
		onHit(target, source) {
			if (target.boosts.spa === -6) return false;
			const spa = target.getStat('spa', false, true);
			const success = this.boost({spa: -1}, target, source, null, false, true);
			return !!(this.heal(spa, source, target) || success);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {spd: 1}},
		contestType: "Cute",
	},
	
	magicfrost: {
		num: 0.4,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Magic Frost",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'magicfrost',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Magic Frost');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.effectData.source.side.active[pokemon.volatiles['magicfrost'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryImmunity(target) {
			return !target.hasType('Ice');
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
}