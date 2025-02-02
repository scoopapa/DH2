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
		desc: "This Pokemon's contact moves use its Speed for damage calculation. Doesn't take Speed boost into account in the damage calculation.",
		shortDesc: "This Pokemon's contact moves use its Speed for damage calculation without Speed boosts.",
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
		shortDesc: "Pivot move immunity; restores 1/4 of its maximum HP when hit by a pivot move.",
		rating: 3.5,
		num: -2,
	},
	honeygather: {
		name: "Honey Gather",
		shortDesc: "If this Pokemon has no item, 50% chance to get Honey. 100% chance in Misty Terrain.",
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
		shortDesc: "1.5x Sp. Atk and 1/8 max HP lost per turn under Sunny Day; moves act as if under Sun.",
	},
	battlearmor: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.8);
		},
		shortDesc: "Critical hit immunity. Damage taken from attacks is reduced by 20%.",
	},
	shellarmor: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.8);
		},
		shortDesc: "Critical hit immunity. Damage taken from attacks is reduced by 20%.",
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
						return;
					}
				}
			}
		},
		desc: "On switch-in, this Pokemon is alerted and raises its highest defense stat by 1 if any opposing Pokemon has an attack that is super effective against this Pokemon, or an OHKO move. This effect considers any move that deals direct damage as an attacking move of its respective type, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves.",
		shortDesc: "Shudders if any foe has a supereffective/OHKO move. Raises its highest defense stat by 1.",
	},
	rkssystem: {
		inherit: true,
		flags: {}, // yes deleting the flags is an ugly way to do it but I need to find a better one lol
		onStart(pokemon) {
			const allTypes = {
				"Normal": "Tough Claws",
				"Grass": "Wind Rider",
				"Fire": "Pyre",
				"Water": "Water Absorb",
				"Electric": "Download",
				"Ice": "Ice Scales",
				"Fighting": "Opportunist",
				"Poison": "Regenerator",
				"Ground": "Dry Skin",
				"Flying": "Magic Guard",
				"Psychic": "Magic Bounce",
				"Bug": "Tinted Lens",
				"Rock": "Rocky Payload",
				"Ghost": "Shadow Shield",
				"Dragon": "Rough Skin",
				"Dark": "Adaptability",
				"Steel": "Filter",
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
		shortDesc: "Status immunity; Pokemon is considered asleep. Intimidate/infatuation/Taunt immunity.",
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
		shortDesc: "If hit by a wind move or under Tailwind/Sandstorm: +1 SpA. Wind move/Sand immunity.",
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
		shortDesc: "If hit by a wind move or under Tailwind/Sandstorm: +1 Atk. Wind move/Sand immunity.",
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
		shortDesc: "On switch in, adds Water type to the user. Has no effect if the user is Water-type.",
		onStart(pokemon) {
			if (pokemon.addType('Water')) {
				this.add('-start', pokemon, 'typeadd', 'Water', '[from] ability: Deliquesce');
			}
		},
		rating: 3,
	},
	evanesce: {
		num: -6,
		name: "Evanesce",
		shortDesc: "On switch in, adds Ghost type to the user. Has no effect if the user is Ghost-type.",
		onStart(pokemon) {
			if (pokemon.addType('Ghost')) {
				this.add('-start', pokemon, 'typeadd', 'Ghost', '[from] ability: Evanesce');
			}
		},
		rating: 3,
	},
	flouresce: {
		num: -7,
		name: "Flouresce",
		shortDesc: "On switch in, adds Electric type to the user. Has no effect if the user is Electric-type.",
		onStart(pokemon) {
			if (pokemon.addType('Electric')) {
				this.add('-start', pokemon, 'typeadd', 'Electric', '[from] ability: Flouresce');
			}
		},
		rating: 3,
	},
	indancesce: {
		num: -8,
		name: "Indancesce",
		shortDesc: "On switch in, adds Fire type to the user. Has no effect if the user is Fire-type.",
		onStart(pokemon) {
			if (pokemon.addType('Fire')) {
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
		num: -9,
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
		shortDesc: "This Pokemon's weight is halved. Takes 1/2 damage from Dark-type moves.",
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
		shortDesc: "This Pokemon's weight is doubled. Takes 1/2 damage from Ghost-type moves.",
	},
	soulheart: {
		inherit: true,
		onAnyFaintPriority: 1,
		onAnyFaint() {
			if (this.effectState.target.swordBoost) return;
			this.effectState.target.swordBoost = true;
			this.boost({spa: 1}, this.effectState.target);
		},
		shortDesc: "This Pokemon's SpA is raised by 1 stage when other Pokemon faint. Once per switch-in.",
	},
	// Slate 5
	moody: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			const natPlus = pokemon.getNature().plus;
			const natMinus = pokemon.getNature().minus;
			if (natPlus === 'atk') return;
			if (natMinus === 'atk') return this.chainModify([5006, 4096]);
			return this.chainModify([4505, 4096]);
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			const natPlus = pokemon.getNature().plus;
			const natMinus = pokemon.getNature().minus;
			if (natPlus === 'def') return;
			if (natMinus === 'def') return this.chainModify([5006, 4096]);
			return this.chainModify([4505, 4096]);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			const natPlus = pokemon.getNature().plus;
			const natMinus = pokemon.getNature().minus;
			if (natPlus === 'spa') return;
			if (natMinus === 'spa') return this.chainModify([5006, 4096]);
			return this.chainModify([4505, 4096]);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			const natPlus = pokemon.getNature().plus;
			const natMinus = pokemon.getNature().minus;
			if (natPlus === 'spd') return;
			if (natMinus === 'spd') return this.chainModify([5006, 4096]);
			return this.chainModify([4505, 4096]);
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			const natPlus = pokemon.getNature().plus;
			const natMinus = pokemon.getNature().minus;
			if (natPlus === 'spe') return;
			if (natMinus === 'spe') return this.chainModify([5006, 4096]);
			return this.chainModify([4505, 4096]);
		},
		onResidual(pokemon) {},
		shortDesc: "User's Atk, Def, SpA, SpD, and Spe are boosted by 1.1, but user's nature has no effect.",
	},
	middleeight: {
		shortDesc: "If Meloetta: switches to Pirouette form before using a Physical move/Aria form before a Special move.",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Meloetta' || attacker.transformed) return;
			if (move.category === 'Status') return;
			const targetForme = (move.category === 'Special' ? 'Meloetta' : 'Meloetta-Pirouette');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Middle Eight",
		rating: 4,
		num: -10,
	},
	sinisterthoughts: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Sinister');
				}
				return null;
			}
		},
		name: "Sinister Thoughts",
		shortDesc: "This Pokemon heals 1/4 HP when hit by a Fairy type move. Immune to Fairy type moves.",
		rating: 3.5,
		num: -11,
	},
	stancechange: {
		inherit: true,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (targetForme === 'Aegislash-Blade') move.basePower = move.basePower * 1.2;
			if (targetForme === 'Aegislash') this.heal(attacker.baseMaxhp / 8);
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
	},
	// Slate 6
	aerodynamism: {
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({ spe: 1 }, target, target)) {
					this.add('-immune', target, '[from] ability: Aerodynamism');
				}
				return null;
			}
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.flags['wind'] && typeof accuracy === 'number') return true;
			return accuracy;
		},
		desc: "This Pokemon's Wind moves do not miss, and this Pokemon is immune to wind moves and raises its Speed by 1 stage when hit by a wind move.",
		shortDesc: "Wind moves do not miss; if hit by a wind move: +1 Spe. Wind move immunity.",
		name: "Aerodynamism",
		rating: 4,
		num: -12,
	},
	pyre: {
		onStart(pokemon) {
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Pyre');
				const fallen = Math.min(target.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen && move.type === 'Fire') {
				const powMod = [4096, 4915, 5734, 6554, 7373, 8192];
				this.debug(`Pyre boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		flags: {},
		name: "Pyre",
		desc: "For each fainted Pokemon on the opposing team, this Pokemon's Fire-type moves power is increased by 20% of their base power.",
		shortDesc: "For each fainted Pokemon on the opposing team, Fire-type power +20%.",
		rating: 4,
		num: -13,
	},
	forewarn: {
		inherit: true,
		onStart(pokemon) {},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.type === 'Psychic' || move.type === 'Dark') return this.chainModify([0x1333, 0x1000]);
		},
		onAfterMove(target, source, move) {
			if (!move || !target || !target.hp) return;
			if (target !== source && target.hp && move.type === 'Dark') {
				this.actions.useMove('futuresight', this.effectState.target); 
			}
		},
		shortDesc: "This Pokemon's Psychic/Dark moves have 1.2x power. Dark-type move = Future Sight.",
	},
	sniper: {
		inherit: true,
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		shortDesc: "If this Pokemon strikes with a critical hit, the damage is multiplied by 1.5. +1 crit ratio.",
	},
	unconcerned: {
		name: "Unconcerned",
		onAnyModifyBoost(boosts, pokemon) {
			const unconcernedUser = this.effectState.target;
			if (unconcernedUser === this.activePokemon) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['spd'] = 0;
				//boosts['spe'] = 0;
				boosts['accuracy'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unconcernedUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		shortDesc: "This Pokemon ignores its own stat stages when taking or doing damage.",
		rating: 4,
		num: -14,
	},
	// Slate 7
	stalwart: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.hp <= target.hp) return this.chainModify(1.25);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp <= source.hp) return this.chainModify(0.75);
		},
		shortDesc: "Moves used by/against this Pokemon is modified by 1.25x/0.75x if the target has more HP.",
	},
	superluck: {
		inherit: true,
		onModifyCritRatio(critRatio) {
			if (critRatio > 1) return 5;
		},
		desc: "User's moves with high critical hit ratio always land as critical hit.",
		shortDesc: "User's moves with high critical hit ratio always land as critical hit.",
	},
	stench: {
		inherit: true,
		onModifyMove(move) {},
		onDamagingHit(damage, target, source, move) {
			source.addVolatile('torment');
		},
		desc: "Torments any target hitting this Pokemon.",
		shortDesc: "Torments any target hitting this Pokemon.",
	},
	nostalgiatrip: {
		shortDesc: "This Pokemon's moves ignore the Physical/Special split. Fairy-type = Special.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Nostalgia Trip');
			this.add('-message', `This Pokemon is experiencing a nostalgia trip!`);
		},
		onModifyMovePriority: 8,
		onModifyMove(move, pokemon) {
			if (move.category === "Status") return;
			if (['Fire', 'Water', 'Grass', 'Electric', 'Dark', 'Psychic', 'Dragon', 'Fairy'].includes(move.type)) {
				move.category = "Special";
			} else {
				move.category = "Physical";
			}
		},
		name: "Nostalgia Trip",
		rating: 4,
		num: -15,
	},
	flowergift: {
		inherit: true,
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
				if (this.field.getWeather().id === 'sunnyday') {
					this.field.setWeather('desolateland');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.species.id === 'cherrimsunshine') {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id === 'cherrimsunshine') {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.species.id === 'cherrimsunshine') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id === 'cherrimsunshine') {
				return this.chainModify(1.5);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.species.id === 'cherrimsunshine') {
				return this.chainModify([4915, 4096]);
			}
		},
		//copy and pasted code from desolate land, so it actually ends
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('flowergift')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		shortDesc: "If Cherrim in Sun: Atk/Def/SpA/SpD = 1.5x, 1.2x BP boost, Sun = Desolate Land.",
	},
	// Slate 8
	karate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fighting';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Karate",
		rating: 4,
		num: -16,
		desc: "This Pokemon's Normal-type moves become Fighting-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Fighting type and have 1.2x power.",
	},
	keepcool: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Keep Cool",
		rating: 3.5,
		num: -17,
		desc: "If this Pokemon has a non-volatile status condition, its Sp. Attack is multiplied by 1.5. This Pokemon's special attacks ignore the frostbite effect of halving damage.",
		shortDesc: "If this Pokemon is statused, its Sp. Atk is 1.5x; ignores frostbite halving physical damage.",
	},
	cottondown: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {},
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Cotton Down', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		desc: "On switch-in, this Pokemon lowers the Speed of opposing Pokemon by 1 stage.",
		shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
	},
	icebody: {
		inherit: true,
		onWeather(target, source, effect) {},
		onImmunity(type, pokemon) {},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' || move.type === 'Fighting' || move.type === 'Rock' || move.type === 'Steel') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' || move.type === 'Fighting' || move.type === 'Rock' || move.type === 'Steel') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Water' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ice';
				move.typeChangerBoosted = this.effect;
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && (effect.id === 'stealthrock')) {
				return false;
			}
		},
		shortDesc: "Non-Ice: Lose Ice weakness. If Ice: Lose Ice weaknesses; Water-type moves = Ice-type.",
	},
};
