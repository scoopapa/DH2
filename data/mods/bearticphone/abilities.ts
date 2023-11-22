export const Abilities: {[abilityid: string]: AbilityData} = {
	bigswinger: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				this.debug('Big Swinger boost');
				return this.chainModify(1.5);
			}
		},
		name: "Big Swinger",
		shortDesc: "This Pokemon's ball and bullet moves have their power multiplied by 1.5.",
		rating: 3.5,
		num: 292,
	},
	boombox: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Boombox's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')
				 || this.randomChance(7, 10)) return;

			target.addVolatile('confusion', source);
			
		},
		name: "Boombox",
		shortDesc: "This Pokemon's moves have a 30% chance of confusing.",
		rating: 4.5,
		num: 305,
	},
	cosmicbody: {
		onDamagingHit(damage, target, source, effect) {
			if (this.randomChance(3, 10)) {
			  this.boost({def: 1, spd: 1});
			}
		},
		name: "Cosmic Body",
		shortDesc: "This Pokemon's Def and SpD has a 30% chance to be raised by 1 after it's damaged by a move.",
		rating: 2,
		num: 49,
	},
	electrivore: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Electrivore",
		shortDesc: "This Pokemon's Normal-type moves become Electric type and have 1.2x power.",
		rating: 4,
		num: 206,
	},
	immolate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fire';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Immolate",
		shortDesc: "This Pokemon's Normal-type moves become Fire type and have 1.2x power.",
		rating: 4,
		num: 184,
	},
	moltenfury: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Rock') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Molten Fury');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source) || move.type !== 'Rock') return;
			this.boost({atk: 1}, this.effectState.target);
		},
		isBreakable: true,
		name: "Molten Fury",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Rock move; Rock immunity.",
		rating: 3,
		num: 157,
	},
	phantomthief: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			move.ignoreImmunity ||= {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Ghost'] = true;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Phantom Thief', '[of] ' + target);
			}
		},
		name: "Phantom Thief",
		shortDesc: "Ghost moves hit Normal. Immune to Intimidate.",
		rating: 3,
		num: 113,
	},
	quackery: {
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				target.clearBoosts();
				this.add('-clearboost', target, '[from] ability: Quackery', '[of] ' + pokemon);
			}
		},
		name: "Quackery",
		shortDesc: "On switch-in, every Pokemon has their stat stages reset to 0.",
		rating: 4,
		num: 261,
	},
	rocketpropulsion: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Rocket Propulsion');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source) || move.type !== 'Fire') return;
			this.boost({spe: 1}, this.effectState.target);			
		},
		isBreakable: true,
		name: "Rocket Propulsion",
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by a Fire move; Fire immunity.",
		rating: 3,
		num: 157,
	},
	sharpshooter: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				this.debug('Sharpshooter boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Sharpshooter",
		shortDesc: "This Pokemon's ball and bullet moves have their power multiplied by 1.3.",
		rating: 3.5,
		num: 292,
	},
	twoleftfeet: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage || move.hasBounced) return;
			const moves = ['axekick', 'chatter', 'confuseray', 'confusion', 'dizzypunch', 'dynamicpunch', 'flatter', 'hurricane', 'magicaltorque', 'psybeam', 'rockclimb', 'secretpower', 'shadowpanic', 'signalbeam', 'strangesteam', 'supersonic', 'swagger', 'sweetkiss', 'teeterdance', 'waterpulse'];
			if (moves.includes(move.id) || moves.includes(move.name)) {
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, target, source);
				return null;
			}
		},
    name: "Two Left Feet",
	 shortDesc: "After another Pokemon uses a move that can cause confusion, this Pokemon uses the same move.", //Currently like Magic Bounce, ideally should function like Dancer
    rating: 4,
  },
  rollingboil: {
		onModifySpe(spe, pokemon) {
			if (pokemon.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		name: "Rolling Boil",
	   shortDesc: "If this Pokemon is burned, its Speed is 1.5x",
		rating: 2.5,
		num: 95,
	},
	flashbang: {
		onStart(pokemon) {
			if (pokemon.syrupTriggered) return;
			pokemon.syrupTriggered = true;
			this.add('-ability', pokemon, 'Flashbang');
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Flashbang', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spd: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Flashbang",
		shortDesc: "On switch-in, this Pokemon lowers the Special Defense of opponents 1 stage. Once per battle.",
		rating: 1.5,
		num: 306,
	},
	mindovermatter: {
		onModifyMovePriority: 8,
		onModifyMove(move, pokemon) {
			if (move.flags['contact'] && move.category === 'Physical') move.category = 'Special';
		},
		name: "Mind Over Matter",
		shortDesc: "Contact moves use Special Attack",
	},
	benotafraid: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect?.effectType === 'Move' &&
				target.species.id === 'heirfriar' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Be Not Afraid');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target/*) return;
			if (*/|| target.species.id !== 'heirfriar' || target.transformed || !target.runImmunity(move.type)) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status'/*) return;
			if (*/|| target.species.id !== 'heirfriar' || target.transformed || !target.runImmunity(move.type)) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'heirfriar' && this.effectState.busted) {
				const speciesid = pokemon.species.id === 'Heirfriar-Holy';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
			}
		},
		isBreakable: true,
		isPermanent: true,
		name: "Be Not Afraid",
		shortDesc: "The first hit it takes is blocked, and it takes 1/8 HP damage instead.",
		rating: 3.5,
		num: 209,
	},
	beantheredonethat: {
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			const pokemon = this.effectState.target;
			const positiveBoosts: Partial<BoostsTable> = {};
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					positiveBoosts[i] = boost[i];
				}
			}
			if (Object.keys(positiveBoosts).length < 1) return;
			this.boost(positiveBoosts, pokemon);
		},
		name: "Bean There Done That",
		shortDesc: "Currently works like Opportunist.", //After another Pokemon uses a status move that raises stats, this Pokemon uses the same move. "
		rating: 4,
  },
	lawbreaker: {
		onModifyMove(move) {
			move.ignoreImmunity = true;
		},
		name: "Law Breaker",
		rating: 4,
		shortDesc: "This pokemon ignores ype based immunities",
		num: 113,
	},
	rockdodger: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Rock') {
				if (!this.boost({spe: 2})) {
					this.add('-immune', target, '[from] ability: Rock Dodger');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Rock Dodger",
		rating: 3.5,
		shortDesc: "This Pokemon's Speed is raised 2 stages if hit by a Rock move; Rock immunity.",
		num: 273,
	},
    bullseye: {
		onStart(pokemon) {
			this.effectState.boosts = 0;
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add('-ability', source, 'Bullseye');
				const newboosts = this.effectState.boosts+1;
				this.add('-end', pokemon, `bullseye${newboosts-1}`, '[silent]');
				this.add('-start', pokemon, `bullseye${newboosts}`, '[silent]');
				this.effectState.boosts = newboosts;
			}
		},
		onModifyCritRatio(critRatio) {
			if (!this.effectState.boosts) return;
			return critRatio + this.effectState.boosts;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `bullseye${this.effectState.boosts}`, '[silent]');
		},
		name: "Bullseye",
		shortDesc: "KOing an opponent raises crit ratio by 1",
		rating: 3,
		num: 153,
    },
	comedicslip: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Comedic Slip');
				this.boost({evasion: -1}, source, target, null, true);
			}
		},
		name: "Comedic Slip",
		shortDesc: "Pokemon making contact with this Pokemon have their evasion lowered by 1 stage.",
		rating: 2,
		num: 183,
	},
	mobmentality: {
		onStart(pokemon) {
			const benched = (pokemon.side.pokemon.length - 1) - pokemon.side.totalFainted;
			if (benched) {
				this.add('-activate', pokemon, 'ability: Mob Mentality');
				const unfainted = Math.min(benched, 5);
				this.add('-start', pokemon, `unfainted${unfainted}`, '[silent]');
				this.effectState.unfainted = unfainted;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `unfainted${this.effectState.unfainted$}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.unfainted) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Mob Mentality boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		name: "Mob Mentality",
		shortDesc: "This Pokemon's moves have 10% more power for each unfainted ally, up to 5 allies.",
		rating: 4,
		num: 293,
	},
	cashout: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		name: "Cash Out",
		rating: 4.5,
		num: 198,
	},
	guidinglight: {
        onSwitchOut(pokemon) {
            for (const target of pokemon.foes()) {
              this.boost({evasion: -1}, target, pokemon, null, true);
            }
        },
        name: "Guiding Light",
        shortDesc: "This Pokemon lowers the Evasion of opponents by 1 stage when it switches out.",
    },
	recharge: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add('-activate', source, 'Recharge');
				source.heal(source.baseMaxhp / 3);
				this.add('-heal', source, source.getHealth, '[silent]')
			}
		},
		name: "Recharge",
		rating: 3,
		shortDesc: "This Pokemon heals for 1/3 of it's max HP after KOing an opponent.",
		num: 153,
	},
	megaton: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				return this.chainModify(0.5);
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify(2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify(2);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Megaton');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Megaton');
			}
			return false;
		},
		isBreakable: true,
		name: "Megaton",
		rating: 4.5,
		shortDesc: "This Pokemon's Electric power is 2x; it can't be burned; Ground power against it is halved.",
		num: 199,
	},
	
};
