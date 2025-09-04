export const Items: {[itemid: string]: ModdedItemData} = {
	/*
	placeholder: {
		name: "",
		shortDesc: "",
	},
	*/
	heavydutyboots: {
		inherit: true,
		consumable: true,
		shortDesc: "Holder is immune to hazards. 1/4 max HP: eats item to heal 1/4 max HP.",
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 4)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 4);
		},
		rating: 2,
	},
	lifeinsurance: {
		name: "Life Insurance",
		consumable: true,
		shortDesc: "When holder faints, replacement healed for 1/4 holder's HP, status cured.",
		spritenum: 609,
		fling: {
			basePower: 30,
			effect(target, source) {
				this.heal(source.baseMaxhp / 4);
				target.clearStatus();
			},
		},
		onFaint(pokemon) {
			pokemon.useItem();
			pokemon.side.lifeinsurance = pokemon.maxhp / 4;
			pokemon.side.addSlotCondition(pokemon, 'lifeinsurance');
		},
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.side.lifeinsurance);
					target.clearStatus();
					this.add('-heal', target, this.effectState.hp, '[from] item: Life Insurance');
					target.side.removeSlotCondition(target, 'lifeinsurance');
				}
			},
		},
	},
	treasurechest: {
		name: "Treasure Chest",
		shortDesc: "Holder's highest non-HP/Spe stat is 1.2x. Gets stolen by itemless attacker.",
		fling: {
			basePower: 80,
		},
		onStart(pokemon) {
			if (pokemon.ignoringItem()) return;
			pokemon.addVolatile('treasurechest');
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			const yourItem = target.takeItem(source);
			if (!source.item) {
				if (!this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem) ||
				!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Thief', '[of] ' + source);
				this.add('-item', source, yourItem, '[from] move: Thief', '[of] ' + target);
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('treasurechest');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.effectState.bestStat = pokemon.getBestStatExceptSpeed(false, true);
				this.add('-start', pokemon, 'treasurechest' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				this.debug('Protosynthesis atk boost');
				return this.chainModify([4915, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				this.debug('Protosynthesis def boost');
				return this.chainModify([4915, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				this.debug('Protosynthesis spa boost');
				return this.chainModify([4915, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				this.debug('Protosynthesis spd boost');
				return this.chainModify([4915, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'treasurechestatk', '[silent]');
				this.add('-end', pokemon, 'treasurechestdef', '[silent]');
				this.add('-end', pokemon, 'treasurechestspa', '[silent]');
				this.add('-end', pokemon, 'treasurechestspd', '[silent]');
			},
		},
	},
	poisonbarb: {
		inherit: true,
		shortDesc: "Holder's Poison-type attacks have 1.3x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Poison') {
				return this.chainModify([5324, 4096]);
			}
		},
	},
	punchingglove: {
		inherit: true,
		shortDesc: "Holder's punch-based attacks have 1.2x power and do not make contact.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Punching Glove boost');
				return this.chainModify([4915, 4096]);
			}
		},
	},
	foolsnugget: {
		name: "Fool's Nugget",
		shortDesc: "Holder's Rock type and Rock-type moves become Steel and have 1.2x power.",
		fling: {
			basePower: 130,
			effect(target, source) {
				if (target.getTypes().join() === 'Rock' || !target.setType('Rock')) return false;
				this.add('-start', target, 'typechange', 'Rock');
			},
		},
		onStart(pokemon) {
			if (!pokemon.hasType('Rock')) return;
			const newTypes = pokemon.getTypes().map(t => (t == 'Rock' ? 'Steel' : t));
			if(pokemon.setType(newTypes)) this.add('-start', pokemon, 'typechange', newTypes.join('/'));
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Rock' && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Steel';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		onTakeItem(item, source) {
			if (source.species.hasType('Rock')) return false;
			return true;
		},
	},
	cloudsail: {
		name: "Cloud Sail",
		consumable: true,
		shortDesc: "Sets Tailwind when at 1/4 max HP or less. Single use.",
		fling: {
			basePower: 10,
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				if(!pokemon.side.sideConditions['tailwind'] && pokemon.useItem()) pokemon.side.addSideCondition('tailwind');
			}
		},
	},
	absorber: {
		name: "Absorber",
		shortDesc: "Holder heals 1/8 max HP when hit by an attack it resists.",
		spritenum: 249,
		fling: {
			basePower: 80,
		},
		onDamagingHit(damage, target, source, move) {
			if (target.getMoveHitData(move).typeMod < 0) this.heal(target.baseMaxhp / 8);
		},
	},
	diregemstone: {
		name: "Dire Gemstone",
		shortDesc: "Holder's next Rock-type attack crits and never misses after getting hit with an attack.",
		fling: {
			basePower: 130,
		},
		onDamagingHit(damage, target, source, move) {
			target.addVolatile('diregemstone');
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-message', `${pokemon.name}'s Dire Gemstone is dire!`);
				this.add('-start', pokemon, 'Dire Gemstone', '[silent]');
			},
			onRestart(pokemon) {
				this.add('-start', pokemon, 'Dire Gemstone');
			},
			onModifyMove(move, pokemon) {
				if (move.type === 'Rock') {
					move.accuracy = true;
					move.willCrit = true;
					pokemon.removeVolatile('diregemstone');
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Dire Gemstone');
			},
		},
	},
	chromostone: {
		name: "Chromo Stone",
		shortDesc: "Deoxys: on switch out, replacement gets its highest base stat for 1 turn.",
		fling: {
			basePower: 80,
		},
		onSwitchOut(pokemon) {
			switch (pokemon.baseSpecies.name) {
				case 'Deoxys':
					pokemon.side.addSideCondition('deoxysspikes');
					break;
				case 'Deoxys-Attack':
					pokemon.side.addSideCondition('deoxysatkspikes');
					break;
				case 'Deoxys-Defense':
					pokemon.side.addSideCondition('deoxysdefspikes');
					break;
				case 'Deoxys-Speed':
					pokemon.side.addSideCondition('deoxysspespikes');
					break;
				default:
					return;
			}
		},
	},
	sugarbag: {
		name: "Sugar Bag",
		shortDesc: "The holder's Speed is 1.5x on their first full turn.",
		spritenum: 51,
		fling: {
			basePower: 10,
			effect(pokemon) {
				this.boost({spe: 1}, pokemon, pokemon, null, true);
			},
		},
		onStart(pokemon) {
			pokemon.addVolatile('sugarbag');
		},
		condition: {
			duration: 2,
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Sugar Bag');
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sugar Bag');
			},
		},
	},
	paintingkit: {
		name: "Painting Kit",
		shortDesc: "Hazard/field effect/terrain/weather moves: priority +1 and heal user 50%. Single use.",
		fling: {
			basePower: 60,
			effect(pokemon) {
				const oldAbility = pokemon.setAbility('dazzling');
				if (oldAbility) {
					this.add('-ability', pokemon, 'Dazzling', '[from] move: Worry Seed');
					if (pokemon.status === 'slp') {
						pokemon.cureStatus();
					}
					return;
				}
				return oldAbility as false | null;
			},
		},
		onModifyPriority(priority, source, target, move) {
			if (move.sideCondition || move.weather || move.terrain) {
				source.addVolatile('paintingkit');
				return priority + 1;
			}
		},
		condition: {
			noCopy: true,
			duration: 1,
			onAfterMove(target, source, move) {
				this.heal(target.baseMaxhp / 2, target);
				target.useItem();
			},
		},
	},
	twistband: {
		name: "Twist Band",
		shortDesc: "Holder's stats are not dropped by its own moves.",
		fling: {
			basePower: 10,
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target !== source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] item:  Twist Band", "[of] " + target);
			}
		},
	},
	oricoriofeather: {
		name: "Oricorio Feather",
		shortDesc: "Holder's Normal-type moves become its primary typing.",
		spritenum: 754,
		fling: {
			basePower: 20,
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = pokemon.getTypes()[0];
			}
		},
	},
	bottledlightning: {
        name: "Bottled Lightning",
		consumable: true,
		shortDesc: "Paralyzes the attacker if they try to remove this item. Single use. Can't be recycled.",
        fling: {
            basePower: 30,
            status: 'par',
        },
        onTryHit(target, source) {
            target.lastAttacker = source;
        },
        onTakeItem(item, pokemon, source, move) {
            if (source && source !== pokemon && pokemon.useItem()) {
                source.trySetStatus('par', pokemon);
                return false; // Needs to return false to prevent unintended consequences
            }
            else if (this.activeMove.id === 'knockoff' && pokemon.lastAttacker && pokemon !== pokemon.lastAttacker && pokemon.useItem()) {
                pokemon.lastAttacker.trySetStatus('par', pokemon);
                return false;
            }
        },
    },
	madnesshelmet: {
		name: "Madness Helmet",
		shortDesc: "Holder's attacks have 1.3x power, but it can't use moves twice in a row.",
		fling: {
            basePower: 60,
            volatileStatus: 'torment',
        },
		onStart(pokemon) {
			pokemon.addVolatile('madnesshelmet');
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096]);
		},
		condition: {
			noCopy: true,
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			},
		},
	},
	scrubs: {
		name: "Scrubs",
		shortDesc: "Holder takes 3/4 damage from special moves if the attacker is statused.",
		fling: {
			basePower: 40,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special' && source.status) {
				return this.chainModify(0.75);
			}
		},
	},
	suppressingarmor: {
		name: "Suppressing Armor",
		shortDesc: "Holder's ability is suppressed.",
		fling: {
			basePower: 80,
		},
		onStart(pokemon) {
			if(!pokemon.getAbility().flags['cantsuppress']) pokemon.addVolatile('gastroacid');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('gastroacid');
		},
	},
	beastite: {
		name: "Beastite",
		shortDesc: "Holder's moves deal 1.1x more damage for every fainted Pokemon on enemy team.",
		spritenum: 661,
		fling: {
			basePower: 80,
		},
		onStart(pokemon) {
			if (pokemon.side.foe.totalFainted) {
				const fallen = Math.min(pokemon.side.foe.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
	},
	glassknuckles: {
		name: "Glass Knuckles",
		shortDesc: "Holder's attacks have 1.3x power, but it takes 3x from indirect damage.",
		spritenum: 261,
		fling: {
            basePower: 30,
        },
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096]);
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return this.chainModify(3);
			}
		},
	},
	leafcoat: {
		name: "Leaf Coat",
		shortDesc: "Grass-type: cures status on switchout. Otherwise: gain Grass-type and 1.5x Def.",
		fling: {
			basePower: 20,
		},
		onStart(pokemon) {
			if (!pokemon.hasType('Grass') && pokemon.addType('Grass')) {
				this.add('-message', `${pokemon.name} wrapped itself in a leaf wrapping cloak!`);
				this.add('-start', pokemon, 'typeadd', 'Grass', '[silent]');
			}
		},
		onEnd(pokemon) {
			if (pokemon.baseSpecies.types.includes('Grass')) return;
			let newType = pokemon.getTypes().filter(t => t !== 'Grass');
			if (pokemon.setType(newType)) {
				this.add('-start', pokemon, 'typeadd', newType.join('/'), '[silent]');
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if(!pokemon.baseSpecies.types.includes('Grass')) return this.chainModify(1.5);
		},
		onSwitchOut(pokemon) {
			if(pokemon.baseSpecies.types.includes('Grass')) pokemon.cureStatus();
		},
	},
	wildcoil: {
		name: "Wild Coil",
		consumable: true,
		shortDesc: "Holder blocks one Status move and bounces them back to the user. Single use.",
		spritenum: 747,
		fling: {
			basePower: 20,
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable'] || target.ignoringItem()) {
				return;
			}
			if (target.useItem()) {
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, target, source);
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable'] || target.ignoringItem()) {
				return;
			}
			if (target.useItem()) {
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, this.effectState.target, source);
				return null;
			}
		},
	},
	swampertite: {
		inherit: true,
		isNonstandard: null,
	},
	baseball: {
		name: "Baseball",
		spritenum: 363,
		fling: {
			basePower: 50,
			secondary: {
				chance: 100,
				volatileStatus: 'flinch',
			},
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (typeof accuracy !== 'number' || !move.flags['bullet']) return;
			this.debug('compoundeyes - enhancing accuracy');
			return this.chainModify([5325, 4096]);
		},
		onBasePower(basePower, source, target, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.3);
			}
		},
		onModifyMove(move) {
			if (move.flags['bullet']) {
				move.category = 'Physical';
			}
		},
		shortDesc: "Holder's ball/bomb moves have 1.3x power, and are physical.",
	},
	itembox: {
		name: "Item Box",
		shortDesc: "Holder: 1.1x BP for each itemless ally. Gives them random consumables on switch.",
		fling: {
			basePower: 50,
		},
		onStart(pokemon) {
			const itemless = pokemon.side.pokemon.filter(p => p != pokemon && !p.item);
			console.log(itemless);
			if (itemless.length > 0) {
				const fallen = Math.min(itemless.length, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
			const items = this.dex.items.all().filter(i => i.consumable);
			for (const pkmn of itemless) {
				let item = this.sample(items);
				if (pkmn.setItem(item)) this.add('-message', `${pkmn.name} gained a ${item}!`);
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
	},
	
	normaliumz: {
		inherit: true,
		isNonstandard: null,
	},
	pinsirite: {
		inherit: true,
		isNonstandard: null,
	},
	venusaurite: {
		inherit: true,
		isNonstandard: null,
	},
	bigroot: {
		inherit: true,
		shortDesc: "Holder gains 1.5x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap.",
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify(1.5);
			}
		},
	},
	eviolite: {
		inherit: true,
		shortDesc: "Holder's Atk/Def/SpA/SpD are 1.3/1.5/1.3/1.5x for each possible evolution.",
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			let mult = 1;
			if (pokemon.baseSpecies.evos) {
				mult *= 1.3;
				if (this.dex.species.get(pokemon.baseSpecies.evos[0]).evos) mult *= 1.3;
			}
			return this.chainModify(mult);
		},
		onModifyDef(def, pokemon) {
			let mult = 1;
			if (pokemon.baseSpecies.evos) {
				mult *= 1.5;
				if (this.dex.species.get(pokemon.baseSpecies.evos[0]).evos) mult *= 1.5;
			}
			return this.chainModify(mult);
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			let mult = 1;
			if (pokemon.baseSpecies.evos) {
				mult *= 1.3;
				if (this.dex.species.get(pokemon.baseSpecies.evos[0]).evos) mult *= 1.3;
			}
			return this.chainModify(mult);
		},
		onModifySpD(spd, pokemon) {
			let mult = 1;
			if (pokemon.baseSpecies.evos) {
				mult *= 1.5;
				if (this.dex.species.get(pokemon.baseSpecies.evos[0]).evos) mult *= 1.5;
			}
			return this.chainModify(mult);
		},
	},
	baseballglove: {
		name: "Baseball",
		fling: {
			basePower: 30,
			effect(pokemon) {
				this.boost({atk: -1, spa: -1}, pokemon, pokemon, null, true);
			},
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (this.effectState.target.activeTurns) return;
			if (target.useItem()) {
				this.boost({atk: -1, spa: -1}, source, source, null, true);
				return null;
			}
		},
		shortDesc: 'When switching in, an attacker\'s attack fails and it gets -1 Atk/SpA. Single use.',
	},
	bicycle: {
		name: "Bicycle",
		shortDesc: "Holder swaps this item with a target it attacks.",
		fling: {
			basePower: 100,
		},
		onAfterMoveSecondarySelf(source, target, move) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemState, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Trick', `[of] ${target}`);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Trick');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Trick');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Trick');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Trick');
			}
		},
	},
	bizarrevest: {
		name: "Bizarre Vest",
		shortDesc: "Holder moves last, but (Special) Defense = (Special) Attack if latter is higher.",
		fling: {
			basePower: 50,
			volatileStatus: "confusion",
		},
		onFractionalPriority: -0.1,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			const monAtk = pokemon.getStat('atk', false, true);
			const monDef = pokemon.getStat('def', false, true);
			if (monAtk > monDef) {
				return monAtk;
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			const monSpA = pokemon.getStat('spa', false, true);
			const monSpD = pokemon.getStat('spd', false, true);
			if (monSpA > monSpD) {
				return monSpA;
			}
		},
		onTakeItem(item, source) {
			if (!this.activeMove) return false;
			if (['knockoff', 'thief', 'covet', 'trick', 'switcheroo'].includes(this.activeMove.id)) return false;
		},
	},
	goldenbelt: {
		name: "Golden Belt",
		shortDesc: "Holder is immune to status moves at full HP.",
		fling: {
			basePower: 40,
			volatileStatus: "taunt",
		},
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source && target.hp === target.maxhp) {
				this.add('-immune', target, '[from] item: Golden Vest', `[of] ${target}`);
				return null;
			}
		},
	},
	heavynet: {
		name: "Heavy Net",
		spritenum: 194,
		shortDesc: "Holder's Spe is halved, but it blocks attackers' pivoting effects.",
		fling: {
			basePower: 40,
			effect(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		onAnyModifyMove(move, pokemon) {
			if (pokemon.side === this.effectState.target.side) return;
			if (move.selfSwitch && !move.ignoreAbility) {
				this.add('-block', this.effectState.target, 'item: Heavy Net');
				delete move.selfSwitch;
			}
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
	},
	mininghelmet: {
		name: "Mining Helmet",
		shortDesc: "If holder is hit by a Dark/Rock move, the attacker loses 1/6 of its max HP.",
		fling: {
			basePower: 60,
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark' || move.type === 'Rock') {
				this.damage(source.baseMaxhp / 6, source, target);
			}
		},
	},
	mirrorshroud: {
		name: "Mirror Shroud",
		shortDesc: "If holder is hit by a special move, the attacker loses 1/3 of the damage dealt.",
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special') {
				this.damage(damage / 3, source, target);
			}
		},
	},
	paladinshield: {
		name: "Paladin Shield",
		spritenum: 746,
		shortDesc: "Holder is immune to stat drops and secondary effects.",
		onModifySecondaries(secondaries) {
			this.debug('Covert Cloak prevent secondary');
			return secondaries.filter(effect => !!effect.self);
		},
		onTryBoostPriority: 1,
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
				this.add('-fail', target, 'unboost', '[from] item: Paladin Shield', `[of] ${target}`);
			}
		},
		onTakeItem: false,
	},
	pineapplepizza: {
		name: "Pineapple Pizza",
		shortDesc: "At 1/2 max HP or less: restores 1/2 max HP if neutral nature, else confused. Single use.",
		isBerry: true,
		fling: {
			basePower: 30,
			volatileStatus: 'confusion',
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2)) return false;
		},
		onEat(pokemon) {
			if (!pokemon.getNature().minus) this.heal(pokemon.baseMaxhp / 2);
			else pokemon.addVolatile('confusion');
		},
	},
	rainjacket: {
		name: "Rain Jacket",
		spritenum: 750,
		shortDesc: "Holder's use of Rain Dance lasts 6 turns. 1.5x SpD in rain.",
		fling: {
			basePower: 30,
		},
		onModifySpDPriority: 1,
		onModifySpD(spd) {
			if (pokemon.effectiveWeather() === 'raindance') return this.chainModify(1.5);
		},
	},
	shardoftrueice: {
		name: "Shard of True Ice",
		spritenum: 305,
		shortDesc: "Ice-type with <600 BST: Resists Dragon/Steel/Fighting, weak to Dark/Psychic/Poison.",
		fling: {
			basePower: 40,
			effect(target, source, move) {
				const item = target.takeItem();
				if (!item) return;
				const shard = this.dex.items.get('shardoftrueice');
				this.add('-enditem', target, item.name, '[from] item: Shard of True Ice', '[of] ' + source, "[silent]");
				this.add('-item', target, shard, '[from] item: Shard of True Ice', '[of] ' + target);
				target.setItem(shard);
			},
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			console.log(target.hasType('Ice') + " " + target.baseSpecies.bst + " " + move.type);
			if (!target.hasType('Ice') || target.baseSpecies.bst >= 600) return;
			if (['Dragon', 'Steel', 'Fighting'].includes(move.type)) return typeMod - 1;
			if (['Dark', 'Psychic', 'Poison'].includes(move.type)) return typeMod + 1;
		},
		onTakeItem(item, source) {
			if (!this.activeMove) return false;
			if (['knockoff', 'thief', 'covet', 'trick', 'switcheroo'].includes(this.activeMove.id)) return false;
		},
	},
	teraamulet: {
		name: "Tera Amulet",
		spritenum: 747,
		shortDesc: "Holder takes 0.6x damage from attacks of the holder's Tera Type.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'item: Tera Amulet');
			this.add('-message', `${pokemon.name} is reducing damage from ${pokemon.teraType} moves!`);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === target.teraType) {
				return this.chainModify(0.6);
			}
		},
	},
	
	//removing every vanilla item
	abilityshield: null,
	abomasite: null,
	absolite: null,
	absorbbulb: null,
	adamantcrystal: null,
	adamantorb: null,
	adrenalineorb: null,
	aerodactylite: null,
	aggronite: null,
	aguavberry: null,
	airballoon: null,
	alakazite: null,
	aloraichiumz: null,
	altarianite: null,
	ampharosite: null,
	apicotberry: null,
	armorfossil: null,
	aspearberry: null,
	assaultvest: null,
	audinite: null,
	auspiciousarmor: null,
	babiriberry: null,
	banettite: null,
	beastball: null,
	beedrillite: null,
	belueberry: null,
	berryjuice: null,
	berrysweet: null,
	bignugget: null,
	//bigroot: null,
	bindingband: null,
	blackbelt: null,
	blackglasses: null,
	blacksludge: null,
	blastoisinite: null,
	blazikenite: null,
	blueorb: null,
	blukberry: null,
	blunderpolicy: null,
	boosterenergy: null,
	bottlecap: null,
	brightpowder: null,
	buggem: null,
	bugmemory: null,
	buginiumz: null,
	burndrive: null,
	cameruptite: null,
	cellbattery: null,
	charcoal: null,
	charizarditex: null,
	charizarditey: null,
	chartiberry: null,
	cheriberry: null,
	cherishball: null,
	chestoberry: null,
	chilanberry: null,
	chilldrive: null,
	chippedpot: null,
	choiceband: null,
	choicescarf: null,
	choicespecs: null,
	chopleberry: null,
	clawfossil: null,
	clearamulet: null,
	cloversweet: null,
	cobaberry: null,
	colburberry: null,
	cornerstonemask: null,
	cornnberry: null,
	coverfossil: null,
	covertcloak: null,
	crackedpot: null,
	custapberry: null,
	damprock: null,
	darkgem: null,
	darkmemory: null,
	darkiniumz: null,
	dawnstone: null,
	decidiumz: null,
	deepseascale: null,
	deepseatooth: null,
	destinyknot: null,
	diancite: null,
	diveball: null,
	domefossil: null,
	dousedrive: null,
	dracoplate: null,
	dragonfang: null,
	dragongem: null,
	dragonmemory: null,
	dragonscale: null,
	dragoniumz: null,
	dreadplate: null,
	dreamball: null,
	dubiousdisc: null,
	durinberry: null,
	duskball: null,
	duskstone: null,
	earthplate: null,
	eeviumz: null,
	ejectbutton: null,
	ejectpack: null,
	electirizer: null,
	electricgem: null,
	electricmemory: null,
	electricseed: null,
	electriumz: null,
	enigmaberry: null,
	//eviolite: null,
	expertbelt: null,
	fairiumz: null,
	fairyfeather: null,
	fairygem: null,
	fairymemory: null,
	fastball: null,
	fightinggem: null,
	fightingmemory: null,
	fightiniumz: null,
	figyberry: null,
	firegem: null,
	firememory: null,
	firestone: null,
	firiumz: null,
	fistplate: null,
	flameorb: null,
	flameplate: null,
	floatstone: null,
	flowersweet: null,
	flyinggem: null,
	flyingmemory: null,
	flyiniumz: null,
	focusband: null,
	focussash: null,
	fossilizedbird: null,
	fossilizeddino: null,
	fossilizeddrake: null,
	fossilizedfish: null,
	friendball: null,
	fullincense: null,
	galaricacuff: null,
	galaricawreath: null,
	galladite: null,
	ganlonberry: null,
	garchompite: null,
	gardevoirite: null,
	gengarite: null,
	ghostgem: null,
	ghostmemory: null,
	ghostiumz: null,
	glalitite: null,
	goldbottlecap: null,
	grassgem: null,
	grassmemory: null,
	grassiumz: null,
	grassyseed: null,
	greatball: null,
	grepaberry: null,
	gripclaw: null,
	griseouscore: null,
	griseousorb: null,
	groundgem: null,
	groundmemory: null,
	groundiumz: null,
	gyaradosite: null,
	habanberry: null,
	hardstone: null,
	healball: null,
	hearthflamemask: null,
	heatrock: null,
	heavyball: null,
	//heavydutyboots: null,
	helixfossil: null,
	heracronite: null,
	hondewberry: null,
	houndoominite: null,
	iapapaberry: null,
	icegem: null,
	icememory: null,
	icestone: null,
	icicleplate: null,
	iciumz: null,
	icyrock: null,
	inciniumz: null,
	insectplate: null,
	ironball: null,
	ironplate: null,
	jabocaberry: null,
	jawfossil: null,
	kasibberry: null,
	kebiaberry: null,
	keeberry: null,
	kelpsyberry: null,
	kangaskhanite: null,
	kingsrock: null,
	kommoniumz: null,
	laggingtail: null,
	lansatberry: null,
	latiasite: null,
	latiosite: null,
	laxincense: null,
	leafstone: null,
	leek: null,
	leftovers: null,
	leppaberry: null,
	levelball: null,
	liechiberry: null,
	lifeorb: null,
	lightball: null,
	lightclay: null,
	loadeddice: null,
	lopunnite: null,
	loveball: null,
	lovesweet: null,
	lucarionite: null,
	luckypunch: null,
	lumberry: null,
	luminousmoss: null,
	lunaliumz: null,
	lureball: null,
	lustrousglobe: null,
	lustrousorb: null,
	luxuryball: null,
	lycaniumz: null,
	machobrace: null,
	magmarizer: null,
	magnet: null,
	magoberry: null,
	magostberry: null,
	mail: null,
	maliciousarmor: null,
	manectite: null,
	marangaberry: null,
	marshadiumz: null,
	masterball: null,
	masterpieceteacup: null,
	mawilite: null,
	meadowplate: null,
	medichamite: null,
	mentalherb: null,
	metagrossite: null,
	metalalloy: null,
	metalcoat: null,
	metalpowder: null,
	metronome: null,
	mewniumz: null,
	mewtwonitex: null,
	mewtwonitey: null,
	micleberry: null,
	mimikiumz: null,
	mindplate: null,
	miracleseed: null,
	mirrorherb: null,
	mistyseed: null,
	moonball: null,
	moonstone: null,
	muscleband: null,
	mysticwater: null,
	nanabberry: null,
	nestball: null,
	netball: null,
	nevermeltice: null,
	nomelberry: null,
	normalgem: null,
	//normaliumz: null,
	occaberry: null,
	oddincense: null,
	oldamber: null,
	oranberry: null,
	ovalstone: null,
	pamtreberry: null,
	parkball: null,
	passhoberry: null,
	payapaberry: null,
	pechaberry: null,
	persimberry: null,
	petayaberry: null,
	pidgeotite: null,
	pikaniumz: null,
	pikashuniumz: null,
	pinapberry: null,
	//pinsirite: null,
	pixieplate: null,
	plumefossil: null,
	//poisonbarb: null,
	poisongem: null,
	poisonmemory: null,
	poisoniumz: null,
	pokeball: null,
	pomegberry: null,
	poweranklet: null,
	powerband: null,
	powerbelt: null,
	powerbracer: null,
	powerherb: null,
	powerlens: null,
	powerweight: null,
	premierball: null,
	primariumz: null,
	prismscale: null,
	protectivepads: null,
	protector: null,
	psychicgem: null,
	psychicmemory: null,
	psychicseed: null,
	psychiumz: null,
	//punchingglove: null,
	qualotberry: null,
	quickball: null,
	quickclaw: null,
	quickpowder: null,
	rabutaberry: null,
	rarebone: null,
	rawstberry: null,
	razorclaw: null,
	razorfang: null,
	razzberry: null,
	reapercloth: null,
	redcard: null,
	redorb: null,
	repeatball: null,
	ribbonsweet: null,
	rindoberry: null,
	ringtarget: null,
	rockgem: null,
	rockincense: null,
	rockmemory: null,
	rockiumz: null,
	rockyhelmet: null,
	roomservice: null,
	rootfossil: null,
	roseincense: null,
	roseliberry: null,
	rowapberry: null,
	rustedshield: null,
	rustedsword: null,
	sablenite: null,
	sachet: null,
	safariball: null,
	safetygoggles: null,
	sailfossil: null,
	salacberry: null,
	salamencite: null,
	sceptilite: null,
	scizorite: null,
	scopelens: null,
	seaincense: null,
	sharpbeak: null,
	sharpedonite: null,
	shedshell: null,
	shellbell: null,
	shinystone: null,
	shockdrive: null,
	shucaberry: null,
	silkscarf: null,
	silverpowder: null,
	sitrusberry: null,
	skullfossil: null,
	skyplate: null,
	slowbronite: null,
	smoothrock: null,
	snorliumz: null,
	snowball: null,
	softsand: null,
	solganiumz: null,
	souldew: null,
	spelltag: null,
	spelonberry: null,
	splashplate: null,
	spookyplate: null,
	sportball: null,
	starfberry: null,
	starsweet: null,
	steelixite: null,
	steelgem: null,
	steelmemory: null,
	steeliumz: null,
	stick: null,
	stickybarb: null,
	stoneplate: null,
	strangeball: null,
	strawberrysweet: null,
	sunstone: null,
	//swampertite: null,
	sweetapple: null,
	syrupyapple: null,
	tamatoberry: null,
	tangaberry: null,
	tapuniumz: null,
	tartapple: null,
	terrainextender: null,
	thickclub: null,
	throatspray: null,
	thunderstone: null,
	timerball: null,
	toxicorb: null,
	toxicplate: null,
	tr00: null,
	tr01: null,
	tr02: null,
	tr03: null,
	tr04: null,
	tr05: null,
	tr06: null,
	tr07: null,
	tr08: null,
	tr09: null,
	tr10: null,
	tr11: null,
	tr12: null,
	tr13: null,
	tr14: null,
	tr15: null,
	tr16: null,
	tr17: null,
	tr18: null,
	tr19: null,
	tr20: null,
	tr21: null,
	tr22: null,
	tr23: null,
	tr24: null,
	tr25: null,
	tr26: null,
	tr27: null,
	tr28: null,
	tr29: null,
	tr30: null,
	tr31: null,
	tr32: null,
	tr33: null,
	tr34: null,
	tr35: null,
	tr36: null,
	tr37: null,
	tr38: null,
	tr39: null,
	tr40: null,
	tr41: null,
	tr42: null,
	tr43: null,
	tr44: null,
	tr45: null,
	tr46: null,
	tr47: null,
	tr48: null,
	tr49: null,
	tr50: null,
	tr51: null,
	tr52: null,
	tr53: null,
	tr54: null,
	tr55: null,
	tr56: null,
	tr57: null,
	tr58: null,
	tr59: null,
	tr60: null,
	tr61: null,
	tr62: null,
	tr63: null,
	tr64: null,
	tr65: null,
	tr66: null,
	tr67: null,
	tr68: null,
	tr69: null,
	tr70: null,
	tr71: null,
	tr72: null,
	tr73: null,
	tr74: null,
	tr75: null,
	tr76: null,
	tr77: null,
	tr78: null,
	tr79: null,
	tr80: null,
	tr81: null,
	tr82: null,
	tr83: null,
	tr84: null,
	tr85: null,
	tr86: null,
	tr87: null,
	tr88: null,
	tr89: null,
	tr90: null,
	tr91: null,
	tr92: null,
	tr93: null,
	tr94: null,
	tr95: null,
	tr96: null,
	tr97: null,
	tr98: null,
	tr99: null,
	twistedspoon: null,
	tyranitarite: null,
	ultraball: null,
	ultranecroziumz: null,
	unremarkableteacup: null,
	upgrade: null,
	utilityumbrella: null,
	//venusaurite: null,
	wacanberry: null,
	watergem: null,
	watermemory: null,
	waterstone: null,
	wateriumz: null,
	watmelberry: null,
	waveincense: null,
	weaknesspolicy: null,
	wellspringmask: null,
	wepearberry: null,
	whippeddream: null,
	whiteherb: null,
	widelens: null,
	wikiberry: null,
	wiseglasses: null,
	yacheberry: null,
	zapplate: null,
	zoomlens: null,
	berserkgene: null,
	berry: null,
	bitterberry: null,
	burntberry: null,
	goldberry: null,
	iceberry: null,
	mintberry: null,
	miracleberry: null,
	mysteryberry: null,
	pinkbow: null,
	polkadotbow: null,
	przcureberry: null,
	psncureberry: null,
	crucibellite: null,
	vilevial: null,
}
