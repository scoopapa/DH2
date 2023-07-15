export const Items: {[k: string]: ModdedItemData} = {
	//---------Gen 9 Items----------//
	abilityshield: {
		name: "Ability Shield",
		spritenum: 0, // TODO
		ignoreKlutz: true,
		// Neutralizing Gas protection implemented in Pokemon.ignoringAbility() within sim/pokemon.ts
		// and in Neutralizing Gas itself within data/abilities.ts
		onSetAbility(ability, target, source, effect) {
			if (effect && effect.effectType === 'Ability' && effect.name !== 'Trace') {
				this.add('-ability', source, effect);
			}
			this.add('-block', target, 'item: Ability Shield');
			return null;
		},
		// Mold Breaker protection implemented in Battle.suppressingAbility() within sim/battle.ts
		num: 1881,
		desc: "Holder's Ability cannot be changed by any effect.",
		gen: 8,
	},
	clearamulet: {
		name: "Clear Amulet",
		spritenum: 0, // TODO
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add('-fail', target, 'unboost', '[from] item: Clear Amulet', '[of] ' + target);
			}
		},
		num: 1882,
		desc: "Prevents other Pokemon from lowering the holder's stat stages.",
		gen: 8,
	},
	mirrorherb: {
		name: "Mirror Herb",
		fling: {
			basePower: 10,
		},
		spritenum: 0, // TODO
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			const boostPlus: SparseBoostsTable = {};
			let statsRaised = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					boostPlus[i] = boost[i];
					statsRaised = true;
				}
			}
			if (!statsRaised) return;
			const pokemon: Pokemon = this.effectData.target;
			pokemon.useItem();
			this.boost(boostPlus, pokemon);
		},
		num: 1883,
		desc: "When an opposing Pokemon raises a stat stage, the holder copies it. Single use.",
		gen: 8,
	},
	punchingglove: {
		name: "Punching Glove",
		spritenum: 0, // TODO
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Punching Glove boost');
				return this.chainModify([4506, 4096]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['punch']) delete move.flags['contact'];
		},
		num: 1884,
		desc: "Holder's punch-based attacks have 1.1x power and do not make contact.",
		gen: 8,
	},
	covertcloak: {
		name: "Covert Cloak",
		fling: {
			basePower: 10,
		},
		spritenum: 0, // TODO
		onModifySecondaries(secondaries) {
			this.debug('Covert Cloak prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		num: 1885,
		desc: "Holder is not affected by the secondary effect of another Pokemon's attack.",
		gen: 8,
	},
	loadeddice: {
		name: "Loaded Dice",
		spritenum: 0, // TODO
		// partially implemented in sim/battle-actions.ts:BattleActions#hitStepMoveHitLoop
		onModifyMove(move) {
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		num: 1886,
		desc: "Holder's moves that hit 2-5 times hit 4-5 times; Population Bomb hits 4-10 times.",
		gen: 8,
	},
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 0, // TODO
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;

			if (pokemon.hasAbility('protosynthesis') && !pokemon.volatiles['protosynthesis'] && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('quarkdrive') && !pokemon.volatiles['quarkdrive'] && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.addVolatile('quarkdrive');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		desc: "Activates the Protosynthesis or Quark Drive Abilities. Single use.",
		gen: 8,
	},

// new stuff
	bigroot: {
		name: "Big Root",
		spritenum: 29,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['heal'] || move.id === 'bitterblade') {
				this.debug('Punching Glove boost');
				return this.chainModify([0x14CC, 0x1000]);
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['leechseed', 'ingrain', 'aquaring', 'strengthsap', 'healingstones'];
			if (heals.includes(effect.id)) {
				return this.chainModify([0x14CC, 0x1000]);
			}
		},
		num: 296,
		desc: "Damaging draining moves deal 30% more damage, status draining moves heal 30% more.",
		gen: 4,
	}, /*
	terashard: {
		name: "Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType(type)) return;
				this.add('-start', pokemon, 'typechange', type, '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1000,
		gen: 8,
		desc: "Holder becomes its Tera Type on switch-in.",
	},
	terashardnormal: {
		name: "Tera Shard (Normal)",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Normal')) return;
				this.add('-start', pokemon, 'typechange', 'Normal', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1007,
		gen: 8,
		desc: "Holder becomes its Tera Type on switch-in. (Use this if you want to Tera Normal)",
	},	
	terashardfairy: {
		name: "Tera Shard (Fairy)",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Fairy')) return;
				this.add('-start', pokemon, 'typechange', 'Fairy', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1008,
		gen: 8,
		desc: "Holder becomes its Tera Type on switch-in. (Use this if you want to Tera Fairy)",
	},	*/
	seginstarshard: {
		name: "Segin Star Shard",
		spritenum: 658,
		fling: {
			basePower: 20,
			status: 'slp',
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Segin Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-message', `${pokemon.name}'s Segin Star Shard changed its type!`);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.num === 966 && (move.type === 'Dark' || move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Segin Star Shard');
				return null;
			}
		},
		forcedForme: "Revavroom-Segin",
		itemUser: ["Revavroom-Segin"],
		num: -1001,
		gen: 8,
		desc: "Revavroom: Becomes Dark-type, Ability: Intimidate, 1.2x Dark/Poison/Steel power.",
	},	
	schedarstarshard: {
		name: "Schedar Star Shard",
		spritenum: 658,
		fling: {
			basePower: 20,
			status: 'brn',
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Schedar Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-message', `${pokemon.name}'s Schedar Star Shard changed its type!`);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.num === 966 && (move.type === 'Fire' || move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Schedar Star Shard');
				return null;
			}
		},
		forcedForme: "Revavroom-Schedar",
		itemUser: ["Revavroom-Schedar"],
		num: -1002,
		gen: 8,
		desc: "Revavroom: Becomes Fire-type, Ability: Speed Boost, 1.2x Fire/Poison/Steel power.",
	},	
	navistarshard: {
		name: "Navi Star Shard",
		spritenum: 658,
		fling: {
			basePower: 20,
			status: 'psn',
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Navi Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-message', `${pokemon.name}'s Navi Star Shard changed its type!`);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.num === 966 && (move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Navi Star Shard');
				return null;
			}
		},
		forcedForme: "Revavroom-Navi",
		itemUser: ["Revavroom-Navi"],
		num: -1003,
		gen: 8,
		desc: "Revavroom: Becomes Poison-type, Ability: Toxic Debris, 1.2x Poison/Steel power.",
	},	
	ruchbahstarshard: {
		name: "Ruchbah Star Shard",
		spritenum: 658,
		fling: {
			basePower: 20,
			volatilestatus: 'confusion',
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Ruchbah Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-message', `${pokemon.name}'s Ruchbah Star Shard changed its type!`);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.num === 966 && (move.type === 'Fairy' || move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Ruchbah Star Shard');
				return null;
			}
		},
		forcedForme: "Revavroom-Ruchbah",
		itemUser: ["Revavroom-Ruchbah"],
		num: -1004,
		gen: 8,
		desc: "Revavroom: Becomes Fairy-type, Ability: Misty Surge, 1.2x Fairy/Poison/Steel power.",
	},	
	caphstarshard: {
		name: "Caph Star Shard",
		spritenum: 658,
		fling: {
			basePower: 20,
			status: 'par',
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Caph Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-message', `${pokemon.name}'s Caph Star Shard changed its type!`);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.num === 966 && (move.type === 'Fighting' || move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Caph Star Shard');
				return null;
			}
		},
		forcedForme: "Revavroom-Caph",
		itemUser: ["Revavroom-Caph"],
		num: -1005,
		gen: 8,
		desc: "Revavroom: Becomes Fighting-type, Ability: Stamina, 1.2x Fighting/Poison/Steel power.",
	},	
	tuffytuff: {
		name: "Tuffy-Tuff",
		spritenum: 251,
		fling: {
			basePower: 10,
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Igglybuff' || source.baseSpecies.baseSpecies === 'Jigglypuff' || source.baseSpecies.baseSpecies === 'Wigglytuff') return false;
			return true;
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Igglybuff' || pokemon.baseSpecies.baseSpecies === 'Jigglypuff' || pokemon.baseSpecies.baseSpecies === 'Wigglytuff') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Igglybuff' || pokemon.baseSpecies.baseSpecies === 'Jigglypuff' || pokemon.baseSpecies.baseSpecies === 'Wigglytuff') {
				return this.chainModify(2);
			}
		},
		desc: "Igglybuff line: 2x Defense & Special Defense.",
		itemUser: ["Igglybuff", "Jigglypuff", "Wigglytuff"],
		num: -1006,
		gen: 8,
	},
	blunderpolicy: {
		name: "Blunder Policy",
		spritenum: 716,
		fling: {
			basePower: 80,
		},
		// Item activation located in scripts.js
		desc: "If the holder misses due to accuracy, its Speed and accuracy are raised by 2 stages. Single use.",
		num: 1121,
		gen: 8,
	},
	punchingglove: {
		name: "Punching Glove",
		spritenum: 0, // TODO
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Punching Glove boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['punch']) delete move.flags['contact'];
		},		
		desc: "Holder's punch-based attacks have 1.2x power and do not make contact.",
		num: 1884,
		gen: 8,
	},
	razorclaw: {
		name: "Razor Claw",
		spritenum: 382,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Razor Claw boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['slicing']) delete move.flags['contact'];
		},		
		desc: "Holder's slicing-based attacks have 1.2x power and do not make contact.",
		num: 326,
		gen: 4,
	},
	razorfang: {
		name: "Razor Fang",
		spritenum: 383,
		fling: {
			basePower: 30,
			volatileStatus: 'flinch',
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				this.debug('Razor Fang boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['bite']) delete move.flags['contact'];
		},		
		desc: "Holder's bite-based attacks have 1.2x power and do not make contact.",
		num: 327,
		gen: 4,
	},
	baseballbat: {
		name: "Baseball Bat",
		spritenum: 0, // TODO
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				this.debug('Baseball Bat boost');
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['bullet']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			target.useItem();			
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['bullet']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			target.useItem();			
			return null;
		},
		condition: {
			duration: 1,
		},
		desc: "Holder's contact moves have 1.25x power. Bounces back bullet/ball moves and breaks when it does.",
		num: -1007,
		gen: 8,
	}, 
	walkietalkie: {
		name: "Walkie-Talkie",
		spritenum: 713,
		fling: {
			basePower: 20,
		},
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (!this.canSwitch(attacker.side) || attacker.forceSwitchFlag || attacker.switchFlag || !move.flags['sound']) return;
			this.effectData.move = this.dex.getMove(move.id);
			attacker.deductPP(move.id, 1);
			if (attacker.side.addSlotCondition(attacker, 'walkietalkie')) {
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			this.add('-activate', attacker, 'item: Walkie-Talkie');
			this.add('-message', `${attacker.name} is calling in one of its allies!`);
			attacker.switchFlag = true;
			return null;
			}
		},
		slotCondition: 'walkietalkie',
		condition: {
			duration: 1,
			onFaint(target) {
				target.side.removeSlotCondition(target, 'walkietalkie');
			},
			onSwap(target) {
				if (!target.fainted && this.effectData.moveTarget && this.effectData.moveTarget.isActive) {
					const move = this.dex.getMove(this.effectData.move);
					this.runMove(move, target, this.getTargetLoc(target.side.foe.active[0], target), null, false, true);
				}
				target.side.removeSlotCondition(target, 'walkietalkie');
			},
		},
		desc: "(Mostly non-functional placeholder) Before using a sound move, holder switches. Switch-in uses move.",
		num: -1008,
		gen: 8,
	}, /*
	walkietalkie: {
		name: "Walkie-Talkie",
		spritenum: 713,
		fling: {
			basePower: 20,
		},
		onModifyMove(move, pokemon) {
			if (!this.canSwitch(pokemon.side) || pokemon.forceSwitchFlag || pokemon.switchFlag ||
				 !move.flags['sound'] || pokemon.side.getSideCondition('walkietalkie')) return;
			delete move.flags['contact'];
			delete move.flags['wind'];
			delete move.flags['bullet'];
			move.basePower = 0;
			move.accuracy = true;
			move.selfSwitch = true;
			move.ignoreImmunity = true;
			pokemon.side.addSlotCondition(pokemon, 'walkietalkie');
			this.add('-activate', pokemon, 'item: Walkie-Talkie');
			this.add('-message', `${pokemon.name} is calling in one of its allies!`);
		},
		slotCondition: 'walkietalkie',
		condition: {
			duration: 1,
			onFaint(target) {
				target.side.removeSlotCondition(target, 'walkietalkie');
			},
			onSwitchIn(target) {
				if (!target.fainted && this.effectData.moveTarget && this.effectData.moveTarget.isActive) {
					this.useMove("Copycat", target, this.effectData.moveTarget);
				}
				target.side.removeSlotCondition(target, 'walkietalkie');
			},
		},
		desc: "Before using a sound move, holder switches. Switch-in uses move.",
		num: -1008,
		gen: 8,
	}, */
	walkietalkie: {
		name: "Walkie-Talkie",
		spritenum: 713,
		fling: {
			basePower: 20,
		},
		onModifyMove(move, pokemon) {
			if (!this.canSwitch(pokemon.side) || pokemon.forceSwitchFlag || pokemon.switchFlag ||
				 !move.flags['sound'] || pokemon.side.getSideCondition('walkietalkie')) return;
			this.effectData.move = this.dex.getMove(move.id);
			delete move.flags['contact'];
			delete move.flags['wind'];
			delete move.flags['bullet'];
			move.basePower = 0;
			move.accuracy = true;
			move.selfSwitch = true;
			move.ignoreImmunity = true;
			pokemon.side.addSlotCondition(pokemon, 'walkietalkie');
			this.add('-activate', pokemon, 'item: Walkie-Talkie');
			this.add('-message', `${pokemon.name} is calling in one of its allies!`);
		},
		desc: "(Mostly non-functional placeholder) Before using a sound move, holder switches. Switch-in uses move.",
		num: -1008,
		gen: 8,
	},
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 0, // TODO
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;
			if (pokemon.hasAbility('protosynthesis') && !pokemon.volatiles['protosynthesis'] && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('protosmosis') && !pokemon.volatiles['protosmosis'] && !this.field.isWeather('raindance') && pokemon.useItem()) {
				pokemon.addVolatile('protosmosis');
			}
			if (pokemon.hasAbility('protocrysalis') && !pokemon.volatiles['protocrysalis'] && !this.field.isWeather('sandstorm') && pokemon.useItem()) {
				pokemon.addVolatile('protocrysalis');
			}
			if (pokemon.hasAbility('protostasis') && !pokemon.volatiles['protostasis'] && !this.field.isWeather('snow') && pokemon.useItem()) {
				pokemon.addVolatile('protostasis');
			}
			if (pokemon.hasAbility('quarkdrive') && !pokemon.volatiles['quarkdrive'] && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.addVolatile('quarkdrive');
			}
			if (pokemon.hasAbility('photondrive') && !pokemon.volatiles['photondrive'] && !this.field.isTerrain('grassyterrain') && pokemon.useItem()) {
				pokemon.addVolatile('photondrive');
			}
			if (pokemon.hasAbility('neurondrive') && !pokemon.volatiles['neurondrive'] && !this.field.isTerrain('psychicterrain') && pokemon.useItem()) {
				pokemon.addVolatile('neurondrive');
			}
			if (pokemon.hasAbility('runedrive') && !pokemon.volatiles['runedrive'] && !this.field.isTerrain('mistyterrain') && pokemon.useItem()) {
				pokemon.addVolatile('runedrive');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		desc: "Activates the Paradox Abilities. Single use.",
		gen: 8,
	},
	airfreshener: {
		name: "Air Freshener",
		spritenum: 383,
		fling: {
			basePower: 30,
		},
		onHit(pokemon, source, move) {
			if (move.flags['wind']) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
						continue;
					}
					ally.cureStatus();
				}
			}
		},		
		desc: "Holder's wind-based attacks heal the party's status.",
		num: -1009,
		gen: 8,
	},
	dancingshoes: {
		name: "Dancing Shoes",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Meloetta') {
				pokemon.formeChange('Meloetta-Pirouette');
				if (pokemon.hasAbility('trace')) {
					let oldAbility = pokemon.setAbility('noguard', pokemon, 'noguard', true);
					if (oldAbility) {
						this.add('-activate', pokemon, 'ability: No Guard', oldAbility, '[of] ' + pokemon);
					}
				}
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] item: Dancing Shoes');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.flags['sound']) {
				this.boost({atk: 1}, this.effectData.target);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Meloetta') return false;
			return true;
		},
		itemUser: ["Meloetta"],
		num: -1010,
		gen: 8,
		desc: "If held by Meloetta: Pirouette Forme on entry, hazard immunity, Sound immunity, +1 Attack when hit by Sound.",
	},
	charizarditeshardx: {
		name: "Charizardite Shard X",
		spritenum: 658,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Charizard') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			const type = pokemon.hpType;
			if (pokemon.baseSpecies.baseSpecies === 'Charizard') {			
				this.add('-item', pokemon, 'Charizardite Shard X');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				if (type && type !== '???') {
					if (!pokemon.setType('Dragon')) return;
					this.add('-start', pokemon, 'typechange', 'Dragon', '[from] item: Charizardite Shard X');
				}
				this.add('-message', `${pokemon.name}'s Charizardite Shard X changed its type!`);
				let oldAbility = pokemon.setAbility('toughclaws', pokemon, 'toughclaws', true);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Tough Claws', oldAbility, '[of] ' + pokemon);
				}
				this.boost({atk: 1});
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.num === 6 && (move.type === 'Dragon' || move.type === 'Fire')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Charizardite Shard X');
				return null;
			}
		},
		forcedForme: "Charizard",
		itemUser: ["Charizard"],
		num: -1011,
		gen: 8,
		desc: "Charizard: Becomes Dragon-type, Ability: Tough Claws, +1 Atk, 1.2x Dragon/Fire power.",
	},	
	charizarditeshardy: {
		name: "Charizardite Shard Y",
		spritenum: 658,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Charizard') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			const type = pokemon.hpType;
			if (pokemon.baseSpecies.baseSpecies === 'Charizard') {			
				this.add('-item', pokemon, 'Charizardite Shard Y');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				if (type && type !== '???') {
					if (!pokemon.setType('Fire')) return;
					this.add('-start', pokemon, 'typechange', 'Fire', '[from] item: Charizardite Shard Y');
				}
				this.add('-message', `${pokemon.name}'s Charizardite Shard Y changed its type!`);
				let oldAbility = pokemon.setAbility('drought', pokemon, 'drought', true);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Drought', oldAbility, '[of] ' + pokemon);
				}
				this.boost({spa: 1});
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.num === 6 && (move.type === 'Flying' || move.type === 'Fire')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Charizardite Shard Y');
				return null;
			}
		},
		forcedForme: "Charizard",
		itemUser: ["Charizard"],
		num: -1012,
		gen: 8,
		desc: "Charizard: Becomes Fire-type, Ability: Drought, +1 SpA, 1.2x Fire/Flying power.",
	},	
	electricseed: {
		name: "Electric Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('electricterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.debug('Cloud Nine prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('electricterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.debug('Cloud Nine prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: 881,
		gen: 7,
		desc: "If the terrain is Electric Terrain, raises holder's Defense by 1 stage. Single use.",
	},
	psychicseed: {
		name: "Psychic Seed",
		spritenum: 665,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('psychicterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.debug('Cloud Nine prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('psychicterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.debug('Cloud Nine prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: 882,
		gen: 7,
		desc: "If the terrain is Psychic Terrain, raises holder's Sp. Def by 1 stage. Single use.",
	},
	mistyseed: {
		name: "Misty Seed",
		spritenum: 666,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('mistyterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.debug('Cloud Nine prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('mistyterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.debug('Cloud Nine prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: 883,
		gen: 7,
		desc: "If the terrain is Misty Terrain, raises holder's Sp. Def by 1 stage. Single use.",
	},
	grassyseed: {
		name: "Grassy Seed",
		spritenum: 667,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('grassyterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.debug('Cloud Nine prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('grassyterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.debug('Cloud Nine prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: 884,
		gen: 7,
		desc: "If the terrain is Grassy Terrain, raises holder's Defense by 1 stage. Single use.",
	},
	pixieplate: {
		inherit: true,
		isNonstandard: null,
	},
// new stuff should start numbering at -1029

// Tera Shards
	bugterashard: {
		name: "Bug Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Bug')) return;
				this.add('-start', pokemon, 'typechange', 'Bug', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1013,
		gen: 8,
		desc: "Holder becomes its Tera Type, Bug, on switch-in.",
	},	
	darkterashard: {
		name: "Dark Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Dark')) return;
				this.add('-start', pokemon, 'typechange', 'Dark', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1014,
		gen: 8,
		desc: "Holder becomes its Tera Type, Dark, on switch-in.",
	},	
	dragonterashard: {
		name: "Dragon Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Dragon')) return;
				this.add('-start', pokemon, 'typechange', 'Dragon', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1028,
		gen: 8,
		desc: "Holder becomes its Tera Type, Dragon, on switch-in.",
	},	
	electricterashard: {
		name: "Electric Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Electric')) return;
				this.add('-start', pokemon, 'typechange', 'Electric', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1015,
		gen: 8,
		desc: "Holder becomes its Tera Type, Electric, on switch-in.",
	},	
	fairyterashard: {
		name: "Fairy Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Fairy')) return;
				this.add('-start', pokemon, 'typechange', 'Fairy', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1008,
		gen: 8,
		desc: "Holder becomes its Tera Type, Fairy, on switch-in.",
	},	
	fightingterashard: {
		name: "Fighting Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Fighting')) return;
				this.add('-start', pokemon, 'typechange', 'Fighting', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1016,
		gen: 8,
		desc: "Holder becomes its Tera Type, Fighting, on switch-in.",
	},	
	fireterashard: {
		name: "Fire Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Fire')) return;
				this.add('-start', pokemon, 'typechange', 'Fire', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1017,
		gen: 8,
		desc: "Holder becomes its Tera Type, Fire, on switch-in.",
	},	
	flyingterashard: {
		name: "Flying Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Flying')) return;
				this.add('-start', pokemon, 'typechange', 'Flying', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1018,
		gen: 8,
		desc: "Holder becomes its Tera Type, Flying, on switch-in.",
	},	
	ghostterashard: {
		name: "Ghost Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Ghost')) return;
				this.add('-start', pokemon, 'typechange', 'Ghost', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1019,
		gen: 8,
		desc: "Holder becomes its Tera Type, Ghost, on switch-in.",
	},	
	grassterashard: {
		name: "Grass Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Grass')) return;
				this.add('-start', pokemon, 'typechange', 'Grass', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1020,
		gen: 8,
		desc: "Holder becomes its Tera Type, Grass, on switch-in.",
	},	
	groundterashard: {
		name: "Ground Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Ground')) return;
				this.add('-start', pokemon, 'typechange', 'Ground', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1021,
		gen: 8,
		desc: "Holder becomes its Tera Type, Ground, on switch-in.",
	},	
	iceterashard: {
		name: "Ice Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Ice')) return;
				this.add('-start', pokemon, 'typechange', 'Ice', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1022,
		gen: 8,
		desc: "Holder becomes its Tera Type, Ice, on switch-in.",
	},	
	normalterashard: {
		name: "Normal Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Normal')) return;
				this.add('-start', pokemon, 'typechange', 'Normal', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1007,
		gen: 8,
		desc: "Holder becomes its Tera Type, Normal, on switch-in.",
	},	
	poisonterashard: {
		name: "Poison Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Poison')) return;
				this.add('-start', pokemon, 'typechange', 'Poison', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1023,
		gen: 8,
		desc: "Holder becomes its Tera Type, Poison, on switch-in.",
	},	
	psychicterashard: {
		name: "Psychic Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Psychic')) return;
				this.add('-start', pokemon, 'typechange', 'Psychic', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1024,
		gen: 8,
		desc: "Holder becomes its Tera Type, Psychic, on switch-in.",
	},	
	rockterashard: {
		name: "Rock Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Rock')) return;
				this.add('-start', pokemon, 'typechange', 'Rock', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1025,
		gen: 8,
		desc: "Holder becomes its Tera Type, Rock, on switch-in.",
	},	
	steelterashard: {
		name: "Steel Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Steel')) return;
				this.add('-start', pokemon, 'typechange', 'Steel', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1026,
		gen: 8,
		desc: "Holder becomes its Tera Type, Steel, on switch-in.",
	},	
	waterterashard: {
		name: "Water Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType('Water')) return;
				this.add('-start', pokemon, 'typechange', 'Water', '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1027,
		gen: 8,
		desc: "Holder becomes its Tera Type, Water, on switch-in.",
	},	
	terashard: {
		name: "Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType(type)) return;
				this.add('-start', pokemon, 'typechange', type, '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1000,
		gen: 8,
		desc: "Holder becomes its Tera Type (Hidden Power type) on switch-in.",
	},
};
