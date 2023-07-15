export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	angler: {
		desc: "If the user is hit by a Water-type move, they take 0.25x damage from it and the opponent recieves recoil equal to the damage dealt.",
		shortDesc: "User takes quartered damage from water; attacker receives major recoil.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.25);
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.damage(target.getUndynamaxedHP(damage)/2, source, target);
			}
		},
		name: "Angler",
		rating: 2,
		num: 1.1,
	},
	deteriorate: {
		desc: "This Pokemon loses 1/6th of its max HP each turn.",
		shortDesc: "This Pokemon loses 1/6th of its max HP each turn.",
   		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.damage(pokemon.baseMaxhp / 6, pokemon, pokemon);
			}
		},
		name: "Deteriorate",
		rating: -1,
		num: 7.1,
	},
	hypeoverload: {
		shortDesc: "Measures the user's hype level at the end of each turn.",
		name: "Hype Overload",
		onResidualOrder: 26,
		onResidual(pokemon) {
			const result = this.random(10);
			if (result === 0) {
				this.hint("Hype Level: 1 out of 10...");
//				this.useMove("Rest", pokemon);
			}
			else if (result === 1) {
				this.hint("Hype Level: 2 out of 10...");
//				this.useMove("Sleep Talk", pokemon);
			}
			else if (result === 2) {
				this.hint("Hype Level: 3 out of 10...");
//				this.useMove("Celebrate", pokemon);
			}
			else if (result === 3) {
				this.hint("Hype Level: 4 out of 10.");
//				this.useMove("Celebrate", pokemon);
			}
			else if (result === 4) {
				this.hint("Hype Level: 5 out of 10.");
//				this.useMove("Celebrate", pokemon);
			}
			else if (result === 5) {
				this.hint("Hype Level: 6 out of 10.");
//				this.useMove("Celebrate", pokemon);
			}
			else if (result === 6) {
				this.hint("Hype Level: 7 out of 10!");
//				this.useMove("Focus Energy", pokemon);
			}
			else if (result === 7) {
				this.hint("Hype Level: 8 out of 10!");
//				this.useMove("Agility", pokemon);
			}
			else if (result === 8) {
				this.hint("Hype Level: 9 OUT OF 10!");
//				this.useMove("Spinning Web", pokemon);
			}
			else {
				this.hint("Hype level: 10 OUT OF 10!!!!!");
				this.boost({atk: 2}, pokemon, pokemon, null, true);
				this.useMove("Explosion", pokemon);
			}
		},
		rating: 2.5,
		num: 10.1,
	},

	deathscall: {
		shortDesc: "All active Pokemon become trapped.",
		onStart(pokemon) {
			this.add('-fieldactivate', 'move: Fairy Lock');
		},
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		  },
    		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Deaths Call",
		rating: 4,
		num: 14.1,
	},
  


	poweroftwo: {
		shortDesc: "If this Pokemon has two moves or less, its power boosts by 1.3x",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
        return this.chainModify(1.3);
			}
		},
		name: "Power of Two",
		rating: 2,
		num: 18.1,
	},

	fortification: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, def: 1});
			}
		},
		shortDesc: "If user is hit below half HP, boosts Atk + Def.",
		name: "Fortification",
		rating: 2,
		num: 20121,
	},
   
	birdup: {
		shortDesc: "The user is a Bird.",
		onStart(pokemon) {
			pokemon.setType(pokemon.getTypes(true).map(type => type === "Grass" ? "Flying" : type));
			this.add('-start', pokemon, 'typechange', 'Flying');
			this.add('-start', pokemon, 'typeadd', 'Flying', '[from] ability: Bird Up');
		},
		name: "Bird Up",
		rating: 4,
		num: 3001,
	},
	bootlegregen: {
		shortDesc: "This Pokemon restores a random amount of HP when it switches out.",
		onSwitchOut(pokemon) {
			const result = this.random(10);
			pokemon.heal(((result + 11) * pokemon.baseMaxhp) / 100, pokemon);
		},
		onResidual(pokemon) {
			const result = this.random(10);
			this.heal((result * pokemon.baseMaxhp) / 100, pokemon);
		},
		name: "Bootleg Regen",
		rating: 4.5,
		num: 3002,
	},
	lostmemory: {
		shortDesc: "On switch, the user learns the used move if it has empty moveslots.",
		onStart(pokemon) {
			const move = this.lastMove;
			if (move === null) return;
			if (pokemon.moveSlots.length < 4) {
				this.attrLastMove('[still]');
				if (pokemon.moveSlots.length < 0) return false;
				const learnedMove = {
					move: move.name,
					id: move.id,
					pp: move.pp,
					maxpp: move.pp,
					target: move.target,
					disabled: false,
					used: false,
				};	
				pokemon.moveSlots[pokemon.moveSlots.length] = learnedMove;
				pokemon.baseMoveSlots[pokemon.moveSlots.length - 1] = learnedMove;
			this.add('-start', pokemon, 'Lost Memory', move.name);
			}
		},
		name: "Lost Memory",
		rating: 3,
		num: 3004,
	},
	obtrusive: {
		shortDesc: "Prevents the Roulette Wheel from being spun while active.",
		onAnyTryMove(target, source, effect) {
			if (['roulettespin'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Obtrusive', effect, '[of] ' + target);
				return false;
			}
		},
		name: "Obtrusive",
		rating: 1,
		num: 3007,
	},
	patience: {
		shortDesc: "This Pokemon moves last within priority bracket, but is 1.3x stronger.",
		onFractionalPriority: -0.1,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			return this.chainModify(1.3);
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			return this.chainModify(1.3);
		},
		name: "Patience",
		rating: -1,
		num: 100,
	},	
	queenofroulette: {
		shortDesc: "Spins the Roulette Wheel two additional times.",
		onResidual (pokemon) {
			this.useMove("Roulette Spin", pokemon);
			this.useMove("Roulette Spin", pokemon);
		},
		name: "Queen of Roulette",
		rating: 1,
		num: 3009,
	},	
	ragingbeast: {
		shortDesc: "The user's highest stat has a 20% chance to rise after each turn.",
		onResidual (pokemon) {
			const result = this.random(5);
			if (result === 0) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in pokemon.storedStats) {
					if (pokemon.storedStats[s] > bestStat) {
						statName = s;
						bestStat = pokemon.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, pokemon);
			}
		},	
		name: "Raging Beast",
		rating: 1,
		num: 3010,
	},
	swagnetpull: {
		shortDesc: "Prevents randomly-typed foes from choosing to switch.",
		onFoeTrapPokemon(pokemon) {
			const result = this.random(12);
			let currType = "???";
			if (result === 0) {
				currType = "Dark";
				this.hint("Dark-types are now being trapped.");
			}
			else if (result === 1) {
				currType = "Grass";
				this.hint("Grass-types are now being trapped.");
			}
			else if (result === 2) {
				currType = "Fire";
				this.hint("Fire-types are now being trapped.");
			}
			else if (result === 3) {
				currType = "Water";
				this.hint("Water-types are now being trapped.");
			}
			else if (result === 4) {
				currType = "Electric";
				this.hint("Electric-types are now being trapped.");
			}
			else if (result === 5) {
				currType = "Ground";
				this.hint("Ground-types are now being trapped.");
			}
			else if (result === 6) {
				currType = "Flying";
				this.hint("Flying-types are now being trapped.");
			}
			else if (result === 7) {
				currType = "Dragon";
				this.hint("Dragon-types are now being trapped.");
			}
			else if (result === 8) {
				currType = "Fairy";
				this.hint("Fairy-types are now being trapped.");
			}
			else if (result === 9) {
				currType = "Steel";
				this.hint("Steel-types are now being trapped.");
			}
			else if (result === 10) {
				currType = "Bug";
				this.hint("Bug-types are now being trapped.");
			}
			else if (result === 11) {
				currType = "Poison";
				this.hint("Poison-types are now being trapped.");
			}
			if (pokemon.hasType(currType)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			pokemon.maybeTrapped = true;
		},
		name: "Swagnet Pull",
		rating: 4,
		num: 20,
	},
	toughout: {
		shortDesc: "If the user survives seven turns, +1 all stats.",
		onStart(pokemon) {
			pokemon.addVolatile('toughout');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['toughout'];
			this.add('-end', pokemon, 'Tough Out', '[silent]');
		},
		condition: {
			duration: 7,
			onStart(target) {
				this.add('-start', target, 'ability: Tough Out');
			},
			onEnd(target) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
				this.add('-end', target, 'Tough Out');
			},
		},
		name: "Tough Out",
		rating: 4,
		num: 3011,
	},
	tranquilizinggas: {
		shortDesc: "Yawns both active Pokemon on switchin.",
		volatileStatus: 'yawn',
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (pokemon.status || target.status || !target.runStatusImmunity('slp')) {
					return false;
				}
				target.addVolatile('yawn');
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 1,
			onStart(target, source) {
				this.add('-start', target, 'ability: Tranquilizing Gas', '[of] ' + source);
			},
			onResidualOrder: 19,
			onEnd(target) {
				this.add('-end', target, 'ability: Tranquilizing Gas', '[silent]');
				target.trySetStatus('slp', this.effectData.source);
			},
		},
		name: "Tranquilizing Gas",
		rating: 4,
		num: 3012,
	},
	trashbeat: {
		shortDesc: "User's Sound moves taunt targets.",
		onModifyMove(move, pokemon) {
			if (move.flags['sound']) {
				for (const target of pokemon.side.foe.active) {
					target.addVolatile('taunt');
				}
			}
		},		volatileStatus: 'taunt',
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
					if (move.category === 'Status' && move.id !== 'mefirst') {
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
		name: "Trash Beat",
		rating: 4,
		num: 3013,
	},	
	dropheat: {
		shortDesc: "User is immune to recoil, lowers all stats of opponents using Sound moves.",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['sound']) {
				this.add('-ability', target, 'Drop Heat');
				this.boost({atk: -1, def: -1, spa: -1, spd: -1, spe: -1}, source, target, null, true);
			}
		},
		name: "Drop Heat",
		rating: 3,
		num: 3014,
	},
	mentalnote: {
		shortDesc: "User forewarns a random move.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (target.fainted) return;
				const temp = this.sample(target.moveSlots);
				//const move = target.moves.indexOf(temp.id);
				this.add('-message', pokemon.name + "'s Mental Note revealed the move " + temp.move + "!");
			}
		},
		name: "Mental Note",
		rating: 0.5,
		num: 3015,
	},	
	mixitup: {
		shortDesc: "The user switches after using sound move.",
		onModifyMove(move, pokemon) {
			if (move.flags['sound']) {
				move.selfSwitch = true;
			}
		},
		name: "Mix it Up",
		rating: 4,
		num: 3016,
	},
	adaptation: {
		shortDesc: "On switch-in, user gains a type matching its first move.",
		onStart(pokemon) {
			const type = this.dex.getMove(pokemon.moveSlots[0].id).type;
			if (pokemon.hasType(type) || !pokemon.addType(type)) return false;
			this.add('-start', pokemon, 'typeadd', type);
		},
		name: "Adaptation",
		rating: 3.5,
		num: 3017,
	},
	vent: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 10 && target.hp + damage > target.maxhp / 10) {
				this.add('-message', target.name + " is gonna Vent!");
				target.switchFlag = true;
				this.heal(target.baseMaxhp);
			}
		},
		name: "Vent",
		rating: 5,
		num: 3018,
	},
	magicbody: {
		name: "Magic Body",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		name: "Magic Body",
		rating: 5,
		num: 3019,
	},
};
