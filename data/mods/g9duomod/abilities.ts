export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	obtrusive: {
		shortDesc: "Blocks the Roulette Wheel for 3 turns; also wears off when switching out.",
		onStart(pokemon) {
			pokemon.addVolatile('obtrusive');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['obtrusive'];
			this.add('-end', pokemon, 'Obtrusive', '[silent]');
		},
		condition: {
			duration: 4,
			onStart(target) {
				this.add('-start', target, 'ability: Obtrusive');
			},
			onEnd(target) {
				this.add('-end', target, 'Obtrusive');
			},
		},
		name: "Obtrusive",
		rating: 1,
		num: 9001,
	},
	
	queenofroulette: {
		shortDesc: "Spins the Roulette Wheel two additional times.",
		onStart(pokemon) {
			pokemon.addVolatile('queenofroulette');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['queenofroulette'];
			this.add('-end', pokemon, 'Queen of Roulette', '[silent]');
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'ability: Queen of Roulette');
			},
			onEnd(target) {
				this.add('-end', target, 'Queen of Roulette');
			},
		},
		isPermanent: true,
		name: "Queen of Roulette",
		rating: 1,
		num: 3009,
	},	
	
	hostabsorb: {
		onModifyMove(move, attacker) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			} // the 3 rows below this get deleted if there's issues
			for (const target of attacker.side.foe.active) {
				if (target.hasType('Grass')) return;
				if (target.hasAbility('goodasgold') || target.hasAbility('Good as Gold')) return;
				if (target.hasAbility('magicabsorb') || target.hasAbility('Magic Absorb')) return;
			}
			move.secondaries.push({
				chance: 100,
				volatileStatus: 'leechseed',
				ability: this.dex.getAbility('hostabsorb'),
			});
		},
		name: "Host Absorb",
		shortDesc: "Contact moves inflict Leech Seed.",
		rating: 2,
		num: 9002,
	},
	
	poweroutage: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: -1});
			}
		},
		name: "Power Outage",
		shortDesc: "Lowers Speed by 1 each turn.",
		rating: 4.5,
		num: 9003,
	},	
	
	blazingspirit: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Blazing Spirit', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Vital Spirit');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Vital Spirit');
			}
			return false;
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		name: "Blazing Spirit",
		shortDesc: "Combines Vital Spirit, Intimidate, and Magic Guard.",
		rating: 3.5,
		num: 9004,
	},	
	
	stickystarch: {
		onAnyTryMove(target, source, effect) {
			if (['teleport', 'chillyreception', 'voltswitch', 'uturn', 'flipturn', 'batonpass', 'shedtail'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Sticky Starch', effect, '[of] ' + target);
				target.addVolatile('partiallytrapped');
				target.volatiles['partiallytrapped'].duration = 2;
				return false;
			}
		},
		name: "Sticky Starch",
		shortDesc: "Blocks and traps opponents when they use pivoting moves.",
		rating: 1,
		num: 9005,
	},	

	update: {
		onStart(pokemon) {
			this.add('-message', pokemon.name + "'s current item: " + pokemon.item + "!", '[identify]');
			this.add('-activate', pokemon, 'ability: Update', this.dex.getItem(pokemon.item).name, '[silent]');
		},
		onTryHit(target, source, move) {
			if (target.getMoveHitData(move).typeMod > 0) {return;}
			if (target !== source && move.type === 'Water' && target.hasItem('splashplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Fire' && target.hasItem('flameplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Grass' && target.hasItem('meadowplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Electric' && target.hasItem('zapplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Bug' && target.hasItem('insectplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Flying' && target.hasItem('skyplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Rock' && target.hasItem('stoneplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Ground' && target.hasItem('earthplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Fighting' && target.hasItem('fistplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Psychic' && target.hasItem('mindplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Poison' && target.hasItem('toxicplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Ghost' && target.hasItem('spookyplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Ice' && target.hasItem('icicleplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Dragon' && target.hasItem('dracoplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Steel' && target.hasItem('ironplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Dark' && target.hasItem('dreadplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Fairy' && target.hasItem('pixieplate')) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
		},
		name: "Update",
		shortDesc: "Grants the user an immunity depending on held plate; cannot bypass weaknesses.",
		rating: 3.5,
		num: 9006,
	},

	magicabsorb: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source && move.type !== 'Flying') {
				this.add('-immune', target, '[from] ability: Magic Absorb');	
				this.heal(target.baseMaxhp / 4);
				return null;
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.flags['contact'] && (target.hp > 0) && (source.hasAbility('hostabsorb') || source.hasAbility('Host Absorb'))) {
				this.heal(target.baseMaxhp / 4);
			} 
		},
		name: "Magic Absorb",
		shortDesc: "Blocks non-Flying status moves, heals the user for 25%.",
		rating: 5,
		num: 9007,
	},
	
	unstableclaws: {
		// implemented in moves.ts - it'd be far easier on me to just code this directly into the move dire claws instead
		name: "Unstable Claws",
		shortDesc: "If user's Dire Claws inflicts a status, changes type to match.",
		rating: 2,
		num: 9008,
	},	
	
	drawfour: {
		shortDesc: "After knocking out target, if user knows less than 12 moves, it learns target's moves.",
		onModifyDamage(damage, source, target, move) {
			if (damage >= target.hp) {
				for (const moveSlot of target.moveSlots) {
					if (moveSlot === null) return;
					if (source.moveSlots.length < 12) {
						this.attrLastMove('[still]');
						if (source.moveSlots.length < 0) return false;
						const learnedMove = {
							move: this.dex.getMove(moveSlot.id),
							id: moveSlot.id,
							pp: moveSlot.pp,
							maxpp: moveSlot.pp,
							target: moveSlot.target,
							disabled: false,
							used: false,
						};	
						source.moveSlots[source.moveSlots.length] = learnedMove;
						source.baseMoveSlots[source.moveSlots.length - 1] = learnedMove;
					}
				}
			}
		},
		name: "Draw Four",
		shortDesc: "After knocking out target, if user knows less than 12 moves, it learns target's moves.",
		rating: 3,
		num: 9009,
	},
	
	conduction: {
		onModifyMove(move, attacker) {
			if (attacker.baseSpecies.baseSpecies !== 'gelsius' && attacker.baseSpecies.baseSpecies !== 'Gelsius') {return;}
			if (attacker.species.name === 'Gelsius-Subzero' || attacker.species.name === 'gelsiussubzero') {return;}
			if (attacker.species.name === 'Gelsius-Hundred' || attacker.species.name === 'gelsiushundred') {return;}
			if (attacker.hp && move.type === 'Ice') {
				this.add('-message', `${attacker.name} is beginning to rapidly cool!`);
				attacker.formeChange('Gelsius-Subzero', this.effect, true);
				this.add('-message', `${attacker.name} transformed!`);
			}
			else if (attacker.hp && move.type === 'Fire') {
				this.add('-message', `${attacker.name} is beginning to rapidly heat up!`);
				attacker.formeChange('Gelsius-Hundred', this.effect, true);
				this.add('-message', `${attacker.name} transformed!`);
			}
		},
		isPermanent: true,
		name: "Conduction",
		shortDesc: "If the user uses Ice or Fire move, transforms. Only works once.",
		rating: 2,
		num: 9010,
	},	

	respawnpunisher: {
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				if (pokemon.ability != 'respawnpunisher') {return;}
				pokemon.addVolatile('respawnpunisher');
			}
		},
		onPrepareHit(source, target, move) {
			for (const targ of source.side.foe.active) {
				if (!targ.activeTurns) {
					if (source.ability != 'respawnpunisher') {return;}
					source.addVolatile('respawnpunisher');
				}
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['respawnpunisher'];
			this.add('-end', pokemon, 'Respawn Punisher', '[silent]');
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'ability: Respawn Punisher');
			},
			onBasePower(basePower, attacker, defender, move) {
				return this.chainModify(1.3);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Respawn Punisher', '[silent]');
			},			
		},
		name: "Respawn Punisher",
		shortDesc: "If an enemy switches or faints, raises Atk/Sp. Atk by 1.3x.",
		rating: 3.5,
		num: 9011,
	},
	
	vent: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'impsaustor' && attacker.baseSpecies.baseSpecies !== 'Impsaustor') {return;}
			this.add('-message', `You can now use Impostor Blade without drawback.`);
		},
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 10 && target.hp + damage > target.maxhp / 10) {
				this.add('-message', `${target.name} is gonna vent!`);
				target.switchFlag = true;
				this.heal(target.baseMaxhp);
			}
		},
		name: "Vent",
		shortDesc: "Switches and fully heals the user if hit below 10%.",
		rating: 5,
		num: 10000,
	},

	supremeoverlord: {
		onModifyAtk(atk, source, target, move) {
			const faintedAllies = source.side.pokemon.filter(ally => ally.fainted).length;
			if (faintedAllies < 1) return;
			this.debug(`Supreme Overlord atk boost for ${faintedAllies} defeated allies.`);
			// Placeholder 1.1 -> 1.5
			return this.chainModify(1 + (0.1 * faintedAllies));
		},
		onModifySpA(spa, source, target, move) {
			const faintedAllies = source.side.pokemon.filter(ally => ally.fainted).length;
			if (faintedAllies < 1) return;
			this.debug(`Supreme Overlord spa boost for ${faintedAllies} defeated allies.`);
			// Placeholder 1.1 -> 1.5
			return this.chainModify(1 + (0.1 * faintedAllies));
		},
		name: "Supreme Overlord",
		rating: 2.5,
		num: 293,
	},
	
	angershell: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, def: -1, spa: 1, spd: -1, spe: 1});
			}
		},
		name: "Anger Shell",
		rating: 2,
		num: 201,
	},
	
	electromorphosis: {
		onDamagingHit(damage, target, source, move) {
			this.add('-activate', target, 'ability: Electromorphosis', '[move] ' + move.name);
			target.addVolatile('charge');
		},
		name: "Electromorphosis",
		rating: 3,
		num: 280,
	},
	
	goodasgold: {
		onTryHit(target, source, move) {
			if (move.category !== 'Status' || target === source) {
				return;
			}
			this.add('-ability', target, 'Good as Gold');
			return null;
		},
		name: "Good as Gold",
		rating: 2,
		num: 283,
	},
	
	eartheater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
			}
		},
		name: "Earth Eater",
		rating: 3,
		num: 297,
	},
	
	wellbakedbody: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
		name: "Well-Baked Body",
		rating: 2,
		num: 273,
	},
	
	purifyingsalt: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Purifying Salt');
			}
			return false;
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		isBreakable: true, // TODO verify the assumption that this can be supprsed by Mold Breaker & friends
		name: "Purifying Salt",
		rating: 2,
		num: 272,
	},
	
	swordofruin: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			return this.chainModify([0x14CD, 0x1000]);
		},
		name: "Sword of Ruin",
		rating: 3,
		num: 285,
	},

	gorillatactics: {
		onStart(pokemon) {
			pokemon.abilityData.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityData.choiceLock && pokemon.abilityData.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Gorilla Tactics");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityData.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityData.choiceLock = move.id;
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			// PLACEHOLDER
			this.debug('Gorilla Tactics Atk Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityData.choiceLock) return;
			if (!pokemon.hasMove(pokemon.abilityData.choiceLock)) {
				pokemon.abilityData.choiceLock = "";
				return;
			}
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityData.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectData.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityData.choiceLock = "";
		},
		name: "Gorilla Tactics",
		rating: 4.5,
		num: 255,
	},

	prankster: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				return priority + 1;
			}
		},
		name: "Prankster",
		rating: 4,
		num: 158,
	},

	dazzling: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectData.target;
			if ((source.side === dazzlingHolder.side || move.target === 'all') && (move.priority > 0.1)) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Dazzling', move, '[of] ' + target);
				return false;
			}
		},
		name: "Dazzling",
		rating: 2.5,
		num: 219,
	},
	
	opportunist: {
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			const pokemon = this.effectData.target;
			const positiveBoosts: Partial<BoostsTable> = {};
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! > 0) {
					positiveBoosts[i] = boost[i];
				}
			}
			if (Object.keys(positiveBoosts).length < 1) return;
			this.boost(positiveBoosts, pokemon);
		},
		name: "Opportunist",
		rating: 3,
		num: 290,
	},
};
