export const Abilities: { [abilityid: string]: ModdedAbilityData; } = {
	protean: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onSwitchIn() { },
		rating: 4.5,
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type.",
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
	},
	velocity: {
		onModifyMove(move) {
			if (move.flags['contact']) {
				move.overrideOffensiveStat = 'spe';
			}
		},
		onAnyModifyBoost(boosts, pokemon) {
			const velocityUser = this.effectState.target;
			if (velocityUser === this.activePokemon) {
				boosts['spe'] = 0;
			}
		},
		flags: {},
		name: "Velocity",
		shortDesc: "This Pokemon's contact moves use its Speed for damage calculation. Doesn't take Speed boost into account in the damage calculation.",
		desc: "This Pokemon's contact moves use its Speed for damage calculation, without Speed boosts.",
		rating: 3.5,
		num: -1,
	},
	routeclosed: {
		onTryHit(target, source, move) {
			if (target !== source && move.selfSwitch) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Route Closed');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Route Closed",
		desc: "This Pokemon is immune to pivot moves and restores 1/4 of its maximum HP, rounded down, when hit by a pivot move. The opponent does not get switched out by its pivot move if used on a Pokémon with this ability. Ex. Landorus-T uses U-Turn on Pokemon with this ability, the Pokemon with the ability is healed 25% HP and Landorus does not get switched out by the move.",
		shortDesc: "This Pokemon is immune to pivot moves and restores 1/4 of its maximum HP when hit by a pivot move. Blocks pivoting.",
		rating: 3.5,
		num: -2,
	},
	honeygather: {
		name: "Honey Gather",
		shortDesc: "At the end of each turn, if this Pokemon has no item, 50% chance to get Honey, 100% chance in Misty Terrain.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hp && !pokemon.item) {
				if (this.field.isTerrain('mistyterrain')) {
					pokemon.setItem('honey');
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Honey Gather');
				}
				if (this.randomChance(5, 10)) {
					pokemon.setItem('honey');
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Honey Gather');
				}
			}
			if (pokemon.hasItem('honey')) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		rating: 3,
		num: 118,
	},
	runitback: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Run It Back');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					target.addVolatile('encore');
				}
			}
		},
		flags: {},
		name: "Run It Back",
		shortDesc: "On switch-in, encore the opponents for one turn.",
		rating: 3.5,
		num: -3,
	},
	solarpower: {
		inherit: true,
		// All effects are coded on the moves in moves.ts
		desc: "If Sunny Day is active, this Pokemon's Special Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn. These effects are prevented if the Pokemon is holding a Utility Umbrella. This Pokemon's moves behave as if Sunny Day is always active.",
		shortDesc: "If Sunny Day is active, this Pokemon's Sp. Atk is 1.5x; loses 1/8 max HP per turn. Pokemon's moves act as if Sunny Day is always active.",
	},
	battlearmor: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.8);
		},
		shortDesc: "This Pokemon cannot be struck by a critical hit. Damage taken from attacks is reduced by 20%.",
	},
	shellarmor: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.8);
		},
		shortDesc: "This Pokemon cannot be struck by a critical hit. Damage taken from attacks is reduced by 20%.",
	},
	anticipation: {
		inherit: true,
		onAnySwitchIn(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (!pokemon.hasAbility('anticipation')) return;
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						const sourceDef = pokemon.storedStats.def;
						const sourceSpD = pokemon.storedStats.spd;
						if (sourceDef >= sourceSpD) {
							this.boost({ def: 1 }, pokemon);
						}
						else {
							this.boost({ spd: 1 }, pokemon);
						}
						this.add('-ability', pokemon, 'Anticipation');
						return;
					}
				}
			}
		},
		desc: "On switch-in, this Pokemon is alerted and raises its highest defense stat by 1 if any opposing Pokemon has an attack that is super effective against this Pokemon, or an OHKO move. This effect considers any move that deals direct damage as an attacking move of its respective type, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves.",
		shortDesc: "On switch-in, this Pokemon shudders if any foe has a supereffective or OHKO move. Raises its highest defense stat by 1.",
	},
	rkssystem: {
		inherit: true,
		flags: {}, // yes deleting the flags is an ugly way to do it but I need to find a better one lol
		onStart(pokemon) {
			const allTypes = {
				"Normal": "Tough Claws",
				"Grass": "Wind Rider",
				"Fire": "Blaze",
				"Water": "Torrent",
				"Electric": "Download",
				"Ice": "Snow Warning",
				"Fighting": "Scrappy",
				"Poison": "Regenerator",
				"Ground": "Rocky Payload",
				"Flying": "Early Bird",
				"Psychic": "Magic Bounce",
				"Bug": "Tinted Lens",
				"Rock": "Solid Rock",
				"Ghost": "Intimidate",
				"Dragon": "Marvel Scale",
				"Dark": "Moxie",
				"Steel": "Iron Fist",
				"Fairy": "Pastel Veil"
			};
			const item = pokemon.getItem();
			if (!item.onMemory) return;
			const abilityToGive = allTypes[pokemon.types[0]];
			const oldAbility = pokemon.setAbility(abilityToGive);
			if (oldAbility) {
				this.add('-ability', pokemon, abilityToGive, '[from] ability: RKS System');
				return;
			}
			return oldAbility as false | null;
		}
	},
	hospitality: {
		inherit: true,
		onResidualOrder: 6,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'hospitality');
		},
		condition: {
			onSwap(target) {
				if (!target.fainted) {
					target.addVolatile('healoneturn');
					target.side.removeSlotCondition(target, 'hospitality');
				}
			},
			onResidual(pokemon) {
				if (pokemon.volatiles['healoneturn']) {
					this.heal(pokemon.baseMaxhp / 16);
					pokemon.removeVolatile('healoneturn');
				}
			},
		},
		shortDesc: "User and switch-in restore 1/16 Max HP at end of each turn.",
	},
	terashift: {
		inherit: true,
		onPreStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Terapagos') return;
			if (pokemon.getItem() === 'Special Tera Orb') return;
			if (pokemon.species.forme !== 'Terastal') {
				this.add('-activate', pokemon, 'ability: Tera Shift');
				pokemon.formeChange('Terapagos-Terastal', this.effect, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
	},
	liquidbody: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Water') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		flags: { breakable: 1 },
		name: "Liquid Body",
		desc: "This Pokemon receives 1/2 damage from contact moves, but double damage from Water moves.",
		shortDesc: "This Pokemon takes 1/2 damage from contact moves, 2x damage from Water moves.",
		rating: 3.5,
		num: -4,
	},
	longreach: {
		inherit: true,
		onModifyMove(move) {
			if (move.flags['contact']) {
				move.flags.longreach = true;
				delete move.flags['contact'];
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (!move.flags['contact'] && move.flags['longreach']) {
				return this.chainModify([4915, 4096]);
			}
		},
		shortDesc: "This Pokemon's attacks that make contact do not make contact and have 1.2x power.",
	},
	emergencyexit: {
		inherit: true,
		onEmergencyExit(target) { },
		onAfterBoost(boost, target, source, effect) {
			if (this.activeMove?.id === 'partingshot') return;
			if (source && target !== source) return;
			let eject = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					eject = true;
				}
			}
			if (eject) {
				if (target.hp) {
					if (!this.canSwitch(target.side)) return;
					if (target.volatiles['commanding'] || target.volatiles['commanded']) return;
					for (const pokemon of this.getAllActive()) {
						if (pokemon.switchFlag === true) return;
					}
					this.add('-ability', target, 'Emergency Exit');
					target.switchFlag = true;
				}
			}
		},
		shortDesc: "If this Pokemon lowers any of its own stat stages, it switches to a chosen ally.",
	},
	aftermath: {
		inherit: true,
		/*onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(source.baseMaxhp / 4, source, target);
			}
		},*/
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				this.damage(target.baseMaxhp / 4, target, pokemon);
			}
		},
		flags: {},
		name: "Aftermath",
		desc: "When this Pokemon faints, all active Pokemon lose 25% of their max HP. Pokemon do not take this damage if they are immune to indirect damage (like with Magic Guard), unaffected by bomb-type moves (like with Bulletproof) or are unaffected by explosion-type moves (like with Damp).",
		shortDesc: "When this Pokemon faints, all active Pokemon lose 25% of their max HP.",
		rating: 2,
		num: 106,
	},
	bulletproof: {
		inherit: true,
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.name === 'Aftermath') {
				return false;
			}
		},
	},
	earlybird: {
		inherit: true,
		shortDesc: "This Pokemon is guaranted to wake up next turn.",
	},
	comatose: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Comatose');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Comatose');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Comatose');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Comatose');
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Comatose', '[of] ' + target);
			}
		},
		desc: "This Pokemon is considered to be asleep and cannot become affected by a non-volatile status condition or Yawn. This Pokemon cannot be infatuated or taunted. Gaining this Ability while infatuated or taunted cures it. This Pokemon is immune to the effect of the Intimidate Ability.",
		shortDesc: "This Pokemon cannot be statused, and is considered to be asleep. This Pokemon cannot be infatuated or taunted. Immune to Intimidate.",
	},
	windpower: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onDamagingHit(damage, target, source, move) { },
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind'] || this.field.isWeather('sandstorm')) {
				this.boost({ spa: 1 }, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({ spa: 1 }, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Rider');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind' || this.field.isWeather('sandstorm')) {
				this.boost({ spa: 1 }, pokemon, pokemon);
			}
		},
		desc: "This Pokemon is immune to wind moves and raises its Sp.Attack by 1 stage when hit by a wind move, when Tailwind begins on this Pokemon's side, or when Sandstorm is active. Sandstorm immunity.",
		shortDesc: "Sp.Atk raised by 1 if hit by a wind move, if Tailwind begins, or if Sandstorm is active. Wind move and Sandstorm immunity.",
	},
	windrider: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind'] || this.field.isWeather('sandstorm')) {
				this.boost({ atk: 1 }, pokemon, pokemon);
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind' || this.field.isWeather('sandstorm')) {
				this.boost({ atk: 1 }, pokemon, pokemon);
			}
		},
		desc: "This Pokemon is immune to wind moves and raises its Attack by 1 stage when hit by a wind move, when Tailwind begins on this Pokemon's side, or when Sandstorm is active. Sandstorm immunity.",
		shortDesc: "Attack raised by 1 if hit by a wind move, if Tailwind begins, or if Sandstorm is active. Wind move and Sandstorm immunity.",
	},
	// Slate 4
	merciless: {
		inherit: true,
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox', 'brn', 'par'].includes(target.status)) return 5;
		},
		shortDesc: "This Pokemon's attacks are critical hits if the target is poisoned, burned or paralyzed.",
	},
	telepathy: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			let reduced = true;
			for (const target of this.getAllActive()) {
				if (target === source) continue;
				if (this.queue.willMove(target)) {
					reduced = false;
					break;
				}
			}
			if (reduced) {
				this.debug('Telepathy reduction');
				return this.chainModify(0.75);
			}
		},
		shortDesc: "This Pokemon takes 25% less damage from attacks that go before it.",
	},
	deliquesce: {
		num: -5,
		name: "Deliquesce",
		shortDesc: "On switch in, adds the Water type to the user. Has no effect if the user is already that type.",
		onStart(pokemon) {
			if (!pokemon.hasType('Water')) {
				this.add('-start', pokemon, 'typeadd', 'Water', '[from] ability: Deliquesce');
			}
		},
		rating: 3,
	},
	evanesce: {
		num: -6,
		name: "Evanesce",
		shortDesc: "On switch in, adds the Ghost type to the user. Has no effect if the user is already that type.",
		onStart(pokemon) {
			if (!pokemon.hasType('Ghost')) {
				this.add('-start', pokemon, 'typeadd', 'Ghost', '[from] ability: Evanesce');
			}
		},
		rating: 3,
	},
	flouresce: {
		num: -7,
		name: "Flouresce",
		shortDesc: "On switch in, adds the Electric type to the user. Has no effect if the user is already that type.",
		onStart(pokemon) {
			if (!pokemon.hasType('Electric')) {
				this.add('-start', pokemon, 'typeadd', 'Electric', '[from] ability: Flouresce');
			}
		},
		rating: 3,
	},
	indancesce: {
		num: -8,
		name: "Indancesce",
		shortDesc: "On switch in, adds the Fire type to the user. Has no effect if the user is already that type.",
		onStart(pokemon) {
			if (!pokemon.hasType('Fire')) {
				this.add('-start', pokemon, 'typeadd', 'Fire', '[from] ability: Indancesce');
			}
		},
		rating: 3,
	},
	quickdraw: {
		inherit: true,
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (this.effectState.quickdraw) return;
			this.effectState.quickdraw = true;
				this.add('-activate', pokemon, 'ability: Quick Draw');
				return 0.1;
		},
		onSwitchIn(pokemon) {
			if (this.effectState.quickdraw) {
				delete this.effectState.quickdraw;
			}			
		},
		shortDesc: "On the first turn the wielder is active, it moves first within its priority bracket.",
	},
	daredevil: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.accuracy <= 85) {
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Daredevil",
		shortDesc: "Moves with 85% accuracy or less are powered up by 30%.",
		rating: 3.5,
		num: 181,
	},
	lightmetal: {
		inherit: true,
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Heavy Metal weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Heavy Metal weaken');
				return this.chainModify(0.5);
			}
		},
		desc: "This Pokemon's weight is halved, rounded down to a tenth of a kilogram. This effect is calculated after the effect of Autotomize, and before the effect of Float Stone. A Pokemon's weight will not drop below 0.1 kg. If a Pokemon uses a Dark-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon.",
		shortDesc: "This Pokemon's weight is halved. Dark-type moves against this Pokemon deal damage with a halved offensive stat.",
	},
	heavymetal: {
		inherit: true,
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Heavy Metal weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Heavy Metal weaken');
				return this.chainModify(0.5);
			}
		},
		desc: "This Pokemon's weight is doubled. This effect is calculated after the effect of Autotomize, and before the effect of Float Stone. If a Pokemon uses a Ghost-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon.",
		shortDesc: "This Pokemon's weight is doubled. Ghost-type moves against this Pokemon deal damage with a halved offensive stat.",
	},
	soulheart: {
		inherit: true,
		onAnyFaintPriority: 1,
		onAnyFaint() {
			if (this.effectState.target.swordBoost) return;
			this.effectState.target.swordBoost = true;
			this.boost({spa: 1}, this.effectState.target);
		},
		shortDesc: "This Pokemon's Special Attack is raised by 1 stage when another Pokemon faints. Once per battle.",
	},
};
