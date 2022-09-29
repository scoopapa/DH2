export const Items: {[itemid: string]: ItemData} = {
	adamantorb: {
		inherit: true,
		forcedForme: "Dialga-Origin",
		itemUser: ["Dialga-Origin"],
	},
	beastball: {
		inherit: true,
		onSourceAfterFaint(length, target, source, effect) {
			if (!source.hasAbility('ballfetch')) return;
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, its highest stat is raised by 1 if it attacks and KOes another Pokemon.",
	},
	berserkgene: {
		name: "Berserk Gene",
		spritenum: 388,
		onUpdate(pokemon) {
			this.boost({atk: 2});
			pokemon.addVolatile('confusion');
			pokemon.setItem('');
		},
		num: 0,
		gen: 8,
	},
	blueorb: {
		inherit: true,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Kyogre' && move.type === 'Water') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		shortDesc: "If Kyogre: Triggers Primal Reversion. 1.2x power Water.",
	},
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		fling: {
			basePower: 10,
		},
		onModifySpePriority: 5,
		onModifySpe(spe) {
			return this.modify(spe, 1.5);
		},
		onSourceModifyAccuracyPriority: 7,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (typeof accuracy === 'number') {
				return accuracy * 0.8;
			}
		},
		num: 213,
		gen: 2,
		shortDesc: "This Pokemon's Speed is 1.5x and accuracy of its attacks is 0.8x.",
	},
	diveball: {
		inherit: true,
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (!pokemon.hasAbility('ballfetch')) return;
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Water';
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, its Normal-type moves become Water type.",
	},
	dragonscale: {
		name: "Dragon Scale",
		spritenum: 108,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Kingdra' && (move.type === 'Water' || move.type === 'Dragon')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		itemUser: ["Kingdra"],
		num: 250,
		gen: 2,
		shortDesc: "If held by a Kingdra, its Water- and Dragon-type attacks have 1.2x power.",
	},
	dreamball: {
		inherit: true,
		onModifyMove(pokemon, move) {
			if (pokemon.hasAbility('ballfetch') && pokemon.status === 'slp') {
				move.sleepUsable = true;
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, moves can be used while asleep.",
	},
	duskball: {
		inherit: true,
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (!pokemon.hasAbility('ballfetch')) return;
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Dark';
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, its Normal-type moves become Dark type.",
	},
	electirizer: {
		name: "Electirizer",
		spritenum: 119,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Electivire' && (move.type === 'Electric')) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Electivire"],
		num: 322,
		gen: 4,
		shortDesc: "If held by a Electivire, its Electric-type attacks have 1.5x power.",
	},
	fastball: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (pokemon.hasAbility('ballfetch')) {
				return this.chainModify(2);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, its Speed is doubled.",
	},
	healball: {
		inherit: true,
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (!pokemon.hasAbility('ballfetch')) return;
			if (this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.baseMaxhp / 4);
		},
		onTerrain(pokemon) {
			if (!pokemon.hasAbility('ballfetch')) return;
			if (!this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.baseMaxhp / 4);
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, at the end of every turn, holder restores 1/4 of its max HP.",
	},
	heavyball: {
		inherit: true,
		onModifyWeightPriority: 1,
		onModifyWeight(pokemon, weighthg) {
			if (pokemon.hasAbility('ballfetch')) {
				return weighthg * 2;
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, its weight is doubled.",
	},
	loveball: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!target.hasAbility('ballfetch')) return;
			if (move.flags['contact']) {
				source.addVolatile('attract', this.effectData.target);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, opponents gets infatuated when doing contact.",
	},
	lureball: {
		inherit: true,
		onModifyMove(move, target, source) {
			if (target.hasAbility('ballfetch')) {
				if (!move || !move.flags['contact'] || move.target === 'self') return;
				target.addVolatile('trapped', source, move, 'trapper');
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, it traps the opponent upon contact.",
	},
	lustrousorb: {
		inherit: true,
		forcedForme: "Palkia-Origin",
		itemUser: ["Palkia-Origin"],
	},
	magmarizer: {
		name: "Magmarizer",
		spritenum: 272,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Magmortar' && (move.type === 'Fire')) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Magmortar"],
		num: 323,
		gen: 4,
		shortDesc: "If held by a Magmortar, its Fire-type attacks have 1.5x power.",
	},
	moonball: {
		inherit: true,
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (!pokemon.hasAbility('ballfetch')) return;
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fairy';
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, its Normal-type moves become Fairy type.",
	},
	netball: {
		inherit: true,
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (!pokemon.hasAbility('ballfetch')) return;
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Bug';
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, its Normal-type moves become Bug type.",
	},
	normalgem: {
		inherit: true,
		shortDesc: "Holder's first successful Normal-type attack will have 2x power. Single use.",
	},
	/*poweranklet: {
		name: "Power Anklet",
		spritenum: 354,
		fling: {
			basePower: 70,
		},
		onModifySpA(atk, pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const newAtk = atk + (spe / 4);
			return newAtk;
        },
		onStart(pokemon) {
			pokemon.addVolatile('powerbracer');
		},
		condition: {
			onStart(target, source, sourceEffect) {
				this.effectData.stage = 0;
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				if (this.effectData.stage < 15) {
					this.effectData.stage++;
				}
				this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage);
			},
		},
		num: 293,
		gen: 4,
		shortDesc: "The user's Sp. Def. is boosted by 1/4 of its Spe. Looses more HP over time.",
	},*/
	powerband: {
		name: "Power Band",
		spritenum: 355,
		fling: {
			basePower: 70,
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const newSpD = spd + (spe / 4);
			return newSpD;
        },
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectData.stage < 15) {
				this.effectData.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage, pokemon, pokemon, this.dex.getItem('powerband'));
		},
		num: 292,
		gen: 4,
		shortDesc: "The user's Sp. Def. is boosted by 1/4 of its Spe. Looses more HP over time.",
	},
	powerbelt: {
		name: "Power Belt",
		spritenum: 356,
		fling: {
			basePower: 70,
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const newDef = def + (spe / 4);
			return newDef;
        },
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectData.stage < 15) {
				this.effectData.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage, pokemon, pokemon, this.dex.getItem('powerbelt'));
		},
		num: 290,
		gen: 4,
		shortDesc: "The user's Def. is boosted by 1/4 of its Spe. Looses more HP over time.",
	},
	powerbracer: {
		name: "Power Bracer",
		spritenum: 357,
		fling: {
			basePower: 70,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const newAtk = atk + (spe / 4);
			return newAtk;
        },
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectData.stage < 15) {
				this.effectData.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage, pokemon, pokemon, this.dex.getItem('powerbracer'));
		},
		num: 289,
		gen: 4,
		shortDesc: "The user's Atk. is boosted by 1/4 of its Spe. Looses more HP over time.",
	},
	powerlens: {
		name: "Power Lens",
		spritenum: 359,
		fling: {
			basePower: 70,
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const newSpA = spa + (spe / 4);
			return newSpA;
        },
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectData.stage < 15) {
				this.effectData.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage, pokemon, pokemon, this.dex.getItem('powerlens'));
		},
		num: 291,
		gen: 4,
		shortDesc: "The user's Sp. Atk. is boosted by 1/4 of its Spe. Looses more HP over time.",
	},
	prismscale: {
		name: "Prism Scale",
		spritenum: 365,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Milotic' && (move.type === 'Water')) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Milotic"],
		num: 537,
		gen: 5,
		shortDesc: "If held by a Milotic, its Water-type attacks have 1.5x power.",
	},
	protector: {
		name: "Protector",
		spritenum: 367,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Rhyperior' && (move.type === 'Ground' || move.type === 'Rock')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		itemUser: ["Rhyperior"],
		num: 321,
		gen: 4,
		shortDesc: "If held by a Rhyperior, its Ground- and Rock-type attacks have 1.2x power.",
	},
	quickball: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (!pokemon.hasAbility('ballfetch')) return;
			if (target.newlySwitched || this.queue.willMove(target)) {
				return this.chainModify(1.3);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, its attacks do 1.3x damage when moving before the target.",
	},
	reapercloth: {
		name: "Reaper Cloth",
		spritenum: 385,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Dusknoir' && (move.type === 'Ghost')) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Dusknoir"],
		num: 325,
		gen: 4,
		shortDesc: "If held by a Dusknoir, its Ghost-type attacks have 1.5x power.",
	},
	redorb: {
		inherit: true,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Groudon' && (move.type === 'Ground' || move.type === 'Fire')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		shortDesc: "If Groudon: Triggers Primal Reversion. 1.2x power to Ground and Fire.",
	},
	repeatball: {
		inherit: true,
		onStart(pokemon) {
			if (!pokemon.hasAbility('ballfetch')) return;
			pokemon.addVolatile('repeatball');
		},
		condition: {
			onStart(pokemon) {
				this.effectData.lastMove = '';
				this.effectData.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('repeatball')) {
					pokemon.removeVolatile('repeatball');
					return;
				}
				if (this.effectData.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectData.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove'] && this.effectData.lastMove !== move.id) {
					this.effectData.numConsecutive = 1;
				} else {
					this.effectData.numConsecutive = 0;
				}
				this.effectData.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [0x1000, 0x14CC, 0x1999, 0x1E65, 0x2332, 0x27FF];
				const numConsecutive = this.effectData.numConsecutive > 5 ? 5 : this.effectData.numConsecutive;
				return this.chainModify([dmgMod[numConsecutive], 0x1000]);
			},
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, the damage of moves used on consecutive turns is increased.",
	},
	sachet: {
		name: "Sachet",
		spritenum: 691,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Aromatisse' && (move.type === 'Fairy')) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Aromatisse"],
		num: 647,
		gen: 6,
		shortDesc: "If held by a Aromatisse, its Fairy-type attacks have 1.5x power.",
	},
	shellbell: {
		name: "Shell Bell",
		spritenum: 438,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			pokemon.addVolatile('shellbell');
		},
		condition: {
			onStart(pokemon) {
				this.effectData.lastMove = '';
				this.effectData.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('shellbell')) {
					pokemon.removeVolatile('shellbell');
					return;
				}
				if (this.effectData.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectData.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove'] && this.effectData.lastMove !== move.id) {
					this.effectData.numConsecutive = 1;
				} else {
					this.effectData.numConsecutive = 0;
				}
				this.effectData.lastMove = move.id;
			},
			onAfterMoveSecondarySelfPriority: -1,
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (move.category !== 'Status') {
					this.heal(pokemon.lastDamage / 5 + pokemon.baseMaxhp / 16, pokemon);
					//this.heal(pokemon.baseMaxhp / 16, pokemon);
				}
			},
		},
		num: 253,
		gen: 3,
		shortDesc: "After an attack, holder gains 1/5 of the damage dealt and 1/16 of its max HP.",
	},
	souldew: {
		name: "Soul Dew",
		spritenum: 459,
		fling: {
			basePower: 30,
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Latios", "Latias"],
		shortDesc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
		num: 225,
		gen: 3,
	},
	timerball: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (!pokemon.hasAbility('ballfetch')) return;
			const active = pokemon.side.active.length;
			return this.chainModify([active, 0x1000]);
		},
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "If the user has Ball Fetch, it does more damage the longer it is active.",
	},
	utilityumbrella: {
		inherit: true,
		shortDesc: "The holder is unaffected by the effects of weather conditions.",
	},
	ultraball: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (source.hasAbility('ballfetch')) {
				return false;
			}
			return true;
		},
		shortDesc: "",
	},
	whippeddream: {
		name: "Whipped Dream",
		spritenum: 692,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Slurpuff' && (move.type === 'Fairy')) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Slurpuff"],
		num: 646,
		gen: 6,
		shortDesc: "If held by a Slurpuff, its Fairy-type attacks have 1.5x power.",
	},
	widelens: {
		inherit: true,
		onSourceModifyAccuracyPriority: 4,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return accuracy * 1.1;
			}
		},
		onBasePowerPriority: 5,
		onBasePower(basePower, move, accuracy, pokemon, target) {
			if (move.accuracy !== 100) {
				return this.chainModify(1.1);
			}
		},
		shortDesc: "Accuracy is boosted by 1.1x. 95% or less accuracy have 1.1x power.",
	},
	//PLA
	
	
	//SV
	mirrorherb: {
		name: "Mirror Herb",
		shortDesc: "Copies any one stat boost by another Pokémon; consumed.",
		spritenum: 358,
		fling: {
			basePower: 10,
		},
		onAnyBoost(boost, target, source, effect) {
			if (target === this.effectData.target || !boost || effect.id === 'mirrorherb') return;
			let activate = false;
			const mirrorBoost: SparseBoostsTable = {};
			let b: BoostName;
			for (b in boost) {
				if (boost[b]! > 0) {
					if (target.boosts[b] === 6) continue;
					mirrorBoost[b] = boost[b];
					activate = true;
				}
			}
			if (activate && this.effectData.target.useItem()) {
				this.boost(mirrorBoost, this.effectData.target, this.effectData.target);
			}
		},
		num: -1001,
		gen: 8,
	},
	covertcloak: {
		name: "Covert Cloak",
		shortDesc: "The holder is immune to additional effects of moves.",
		spritenum: 358,
		fling: {
			basePower: 30,
		},
		onModifySecondaries(secondaries) {
			this.debug('Covert Cloak prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		num: -1002,
		gen: 8,
	},
	loadeddice: {
		name: "Loaded Dice",
		shortDesc: "Multi-strike moves more often land more hits.",
		spritenum: 358,
		fling: {
			basePower: 30,
		},
		onModifyMove(move) { // mostly done in scripts.ts now!
			if (move.multiaccuracy) move.multiaccuracy = 95; // for Triple Axel and stuff
		},
		num: -1003,
		gen: 8,
	},
	
	//Roovnen
	potion: {
		name: "Potion",
		spritenum: 22,
		fling: {
			basePower: 30,
		},
		onBeforeMove(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				if (this.runEvent('TryHeal', pokemon) && pokemon.useItem()) {
					this.heal(20);
					this.add('cant', pokemon, 'item: Potion');
					return false;
				}
			}
		},
		num: 1125,
		gen: 8,
		shortDesc: "Restores 20 HP when at 1/4 max HP or less and skips a turn. Single use.",
	},
	superpotion: {
		name: "Super Potion",
		spritenum: 22,
		fling: {
			basePower: 30,
		},
		onBeforeMove(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				if (this.runEvent('TryHeal', pokemon) && pokemon.useItem()) {
					this.heal(50);
					this.add('cant', pokemon, 'item: Super Potion');
					return false;
				}
			}
		},
		num: 1126,
		gen: 8,
		shortDesc: "Restores 50 HP when at 1/4 max HP or less and skips a turn. Single use.",
	},
	hyperpotion: {
		name: "Hyper Potion",
		spritenum: 22,
		fling: {
			basePower: 30,
		},
		onBeforeMove(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				if (this.runEvent('TryHeal', pokemon) && pokemon.useItem()) {
					this.heal(120);
					this.add('cant', pokemon, 'item: Hyper Potion');
					return false;
				}
			}
		},
		num: 1127,
		gen: 8,
		shortDesc: "Restores 120 HP when at 1/4 max HP or less and skips a turn. Single use.",
	},
	maxpotion: {
		name: "Max Potion",
		spritenum: 22,
		fling: {
			basePower: 30,
		},
		onBeforeMove(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				if (this.runEvent('TryHeal', pokemon) && pokemon.useItem()) {
					this.heal(pokemon.maxhp);
					this.add('cant', pokemon, 'item: Max Potion');
					return false;
				}
			}
		},
		num: 1128,
		gen: 8,
		shortDesc: "All HP healed when at 1/4 max HP or less and skips a turn. Single use.",
	},
	fullrestore: {
		name: "Full Restore",
		spritenum: 22,
		fling: {
			basePower: 30,
		},
		onBeforeMove(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				if (this.runEvent('TryHeal', pokemon) && pokemon.useItem()) {
					this.heal(pokemon.maxhp);
					pokemon.cureStatus();
					this.add('cant', pokemon, 'item: Full Restore');
					return false;
				}
			}
		},
		num: 1129,
		gen: 8,
		shortDesc: "Fully healed when at 1/4 max HP or less and skips a turn. Single use.",
	},
};