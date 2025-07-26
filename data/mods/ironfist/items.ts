export const Items: {[itemid: string]: ModdedItemData} = {
	//vanilla items
	berryjuice: {
		inherit: true,
		rating: 0,
	},
	terrainextender: {
		inherit: true,
		shortDesc: "Holder's use of Electric/Grassy/Misty/Psychic/Fishy Terrain lasts 8 turns instead of 5.",
	},
	lustrousglobe: {
		inherit: true,
		shortDesc: "The Pearl Hand: Water- and Dragon-type attacks have 1.2x power.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if ([484, -108].includes(user.baseSpecies.num) && (move.type === 'Water' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ([484, -108].includes(source?.baseSpecies.num) || [484, -108].includes(pokemon.baseSpecies.num)) {
				return false;
			}
			return true;
		},
		itemUser: ["Palkia-Origin", "The Pearl Hand"],
	},
	lustrousorb: {
		inherit: true,
		shortDesc: "The Pearl Hand: Water- and Dragon-type attacks have 1.2x power.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if ([484, -108].includes(user.baseSpecies.num) && (move.type === 'Water' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
		itemUser: ["Palkia-Origin", "The Pearl Hand"],
	},
	ultranecroziumz: {
		inherit: true,
		isNonstandard: null,
	},
	
	//slate 1
	kunai: {
		name: "Kunai",
		fling: {
			basePower: 90,
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source.kunai === undefined) source.kunai = 0;
			if (move.category !== 'Status') source.kunai ++;
			else source.kunai = 0;
			if (source.kunai >= 3) {
				this.boost({def: 1, spd: 1});
				source.kunai = 0;
			}
		},
		num: 640,
		gen: 6,
		shortDesc: "If holder uses 3 consecutive attacking moves, it gains +1 Defense and Sp. Defense.",
		rating: 2,
	},
	fishhook: {
		name: "Fish Hook",
		fling: {
			basePower: 10,
			effect(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-message', `${target.name} casts their Fish Hook!`);
			}
		},
		onBeforeTurn(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				for (const target of side.active) {
					console.log("target: " + target.name + "\nfishing terrain: " + (this.field.isTerrain('fishingterrain') && pokemon.isGrounded()) + "\nwater: " + target.hasType('Water') + "\nfish: " + target.baseSpecies.fish);
					if ((this.field.isTerrain('fishingterrain') && pokemon.isGrounded()) ||
					target.hasType('Water') || target.baseSpecies.fish) {
						side.addSideCondition('fishhook', pokemon);
						const data = side.getSideConditionData('fishhook');
						if (!data.sources) {
							data.sources = [];
						}
						data.sources.push(pokemon);
						break;
					}
				}
			}
		},
		onModifyMove(move, source, target) {
			if (((this.field.isTerrain('fishingterrain') && source.isGrounded()) ||
				target.hasType('Water') || target.baseSpecies.fish) && 
				(target?.beingCalledBack || target?.switchFlag)) move.accuracy = true;
		},
		onTryHit(source, target) {
			if ((this.field.isTerrain('fishingterrain') && source.isGrounded()) ||
				target.hasType('Water') || target.baseSpecies.fish) target.side.removeSideCondition('fishhook');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				const move = this.queue.willMove(pokemon.foes()[0]);
				const moveName = move && move.moveid ? move.moveid.toString() : "";
				this.debug('fishhook start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon.foes()[0], 'item: Fish Hook');
						alreadyAdded = true;
					}
					this.actions.runMove(moveName, source, source.getLocOf(pokemon));
				}
			},
		},
		shortDesc: "Pursuits opposing Water-types/Fish. Always works in Fishing Terrain.",
	},
	baseball: {
		name: "Baseball",
		spritenum: 606,
		fling: {
			basePower: 10,
			status: 'baseball',
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (this.effectState.target.activeTurns) return;
			if (!['oblivious', 'unaware'].includes(source.ability) && target.useItem()) {
				source.trySetStatus('baseball', target);
				return null;
			}
		},
		num: 640,
		gen: 6,
		shortDesc: 'When switching in, an attacker\'s attack fails and it gets Baseballed. Single use.',
		rating: 3,
	},
	ironfist: {
		spritenum: 749,
		fling: {
			basePower: 60,
			multihit: 2,
			type: 'Steel',
			secondary: {
				chance: 30,
				volatileStatus: 'flinch',
			},
		},
		onPrepareHit(source, target, move) {
			if (move.flags['punch'] && move.priority <= 0 && move.name !== "Double Iron Bash") {
				this.actions.useMove("Double Iron Bash", source, target);
				return null;
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.volatiles['ingrain'] || target.volatiles['smackdown'] || this.field.getPseudoWeather('gravity')) return;
			if (move.type === 'Ground' && target.hasType('Flying')) return 0;
		},
		// airborneness negation implemented in sim/pokemon.js:Pokemon#isGrounded
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		flags: {},
		name: "Iron Fist",
		rating: 3,
		shortDesc: "Iron Ball + all 0 priority punching moves turn into Double Iron Bash.",
		num: 89,
	},
	kinglerite: {
		name: "Kinglerite",
		shortDesc: "If held by a Kingler, this item allows it to Mega Evolve in battle.",
		megaStone: "Kingler-Mega",
		megaEvolves: "Kingler",
		itemUser: ["Kingler"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},

	//slate 2
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 0, // TODO
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;
			if (pokemon.hasAbility('protosynthesis') && !pokemon.volatiles['protosynthesis'] && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('protostasis') && !pokemon.volatiles['protostasis'] && !this.field.isWeather('snow') && pokemon.useItem()) {
				pokemon.addVolatile('protostasis');
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
		desc: "Activates the Paradox Abilities. Single use.",
		gen: 9,
	},
	balanceboard: {
		name: "Balance Board",
		shortDesc: "If Atk/Def/SpA/SpD is raised, SpA/SpD/Atk/Def is raised. Single use.",
		spritenum: 716,
		rating: 2,
		onAfterBoost(boost, target, source, effect) {
			if (!boost || effect.id === 'balanceboard') return;
			let activated = false;
			const balanceBoost: SparseBoostsTable = {};
			if (boost.spa && boost.atk != boost.spa) {
				balanceBoost.atk = boost.spa;
				activated = true;
			}
			if (boost.spd && boost.def != boost.spd) {
				balanceBoost.def = boost.spd;
				activated = true;
			}
			if (boost.atk && boost.atk != boost.spa) {
				balanceBoost.spa = boost.atk;
				activated = true;
			}
			if (boost.def && boost.def != boost.spd) {
				balanceBoost.spd = boost.def;
				activated = true;
			}
			if (activated && target.useItem()) {
				this.boost(balanceBoost, target, target, null, true);
			}
		},
	},
	buckethat: {
		fling: {
			basePower: 30,
			effect(target, source, move) {
				source.side.addFishingTokens(1);
			},
		},
		name: "Bucket Hat",
		shortDesc: "On switchin, the holder consumes a Fishing Token to restore 1/4 max HP.",
		spritenum: 236,
		rating: 3,
		onSwitchIn(pokemon) {
			if (pokemon.hp != pokemon.baseMaxhp && pokemon.side.removeFishingTokens(1)) {
				this.heal(pokemon.baseMaxhp / 4);
			}
		},
	},
	jarofmercury: {
		name: "Jar of Mercury",
		shortDesc: "If the holder were to be hit by DIB, lowers attacker's stats by 1. Single use.",
		spritenum: 761,
		rating: 2,
		fling: {
			basePower: 10,
			effect(pokemon) {
				this.boost({atk: -1, def: -1, spa: -1, spd: -1, spe: -1}, pokemon, pokemon, null, true);
			},
		},
		onTryHit(pokemon, source, move) {
			if (move.name === 'Double Iron Bash' && pokemon.useItem()) {
				this.add('-activate', pokemon, 'item: Jar of Mercury', move.name);
				this.boost({atk: -1, def: -1, spa: -1, spd: -1, spe: -1}, source, pokemon, null, true);
				return null;
			}
		},
		num: 650,
		gen: 6,
	},
	nervecharm: {
		name: "Nerve Charm",
		shortDesc: "Holder is immune to moves with nonzero priority. Announces on switchin.",
		rating: 2,
		fling: {
			basePower: 40,
			priority: 1,
		},
		onStart(pokemon) {
			this.add('-message', `${pokemon.name} has a Nerve Charm!`);
		},
		onTryHit(pokemon, source, move) {
			if (move.priority !== 0 && pokemon !== source) {
				this.add('-activate', pokemon, 'item: Nerve Charm', move.name);
				return null;
			}
		},
		condition: {},
	},
	electrodite: {
		name: "Electrodite",
		shortDesc: "If held by an Electrode, this item allows it to Mega Evolve in battle.",
		megaStone: "Electrode-Mega",
		megaEvolves: "Electrode",
		itemUser: ["Electrode"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},

	//slate 3
	aguavberry: {
		inherit: true,
		shortDesc: "Restores 60% max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use.",
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp * .6)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * .6);
			if (pokemon.getNature().minus === 'spd') {
				pokemon.addVolatile('confusion');
			}
		},
	},
	figyberry: {
		inherit: true,
		shortDesc: "Restores 60% max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use.",
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp * .6)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * .6);
			if (pokemon.getNature().minus === 'atk') {
				pokemon.addVolatile('confusion');
			}
		},
	},
	iapapaberry: {
		inherit: true,
		shortDesc: "Restores 60% max HP at 1/4 max HP or less; confuses if -Def Nature. Single use.",
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp * .6)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * .6);
			if (pokemon.getNature().minus === 'def') {
				pokemon.addVolatile('confusion');
			}
		},
	},
	magoberry: {
		inherit: true,
		shortDesc: "Restores 60% max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use.",
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp * .6)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * .6);
			if (pokemon.getNature().minus === 'spe') {
				pokemon.addVolatile('confusion');
			}
		},
	},
	wikiberry: {
		inherit: true,
		shortDesc: "Restores 60% max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use.",
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp * .6)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * .6);
			if (pokemon.getNature().minus === 'spa') {
				pokemon.addVolatile('confusion');
			}
		},
	},
	zeldaniumz: {
		name: "Zeldanium Z",
		shortDesc: "If held by a Zelda with Triple Arrows, it can use Arrows of Light.",
		spritenum: 651,
		onTakeItem: false,
		zMove: "Arrows of Light",
		zMoveFrom: "Triple Arrows",
		itemUser: ["Zelda"],
	},
	moltresite: {
		name: "Moltresite",
		shortDesc: "If held by a Moltres, this item allows it to Mega Evolve in battle.",
		megaStone: "Moltres-Mega",
		megaEvolves: "Moltres",
		itemUser: ["Moltres"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	impidimpite: {
		name: "Impidimpite",
		shortDesc: "If held by an Impidimp, this item allows it to Mega Evolve in battle.",
		megaStone: "Impidimp-Mega",
		megaEvolves: "Impidimp",
		itemUser: ["Impidimp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	fleshvaliantite: {
		name: "Fleshvaliantite",
		shortDesc: "If held by a Flesh Valiant, this item allows it to Mega Evolve in battle.",
		megaStone: "Flesh Valiant-Mega",
		megaEvolves: "Flesh Valiant",
		itemUser: ["Flesh Valiant"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},

	//slate 4
	deeznuts: {
		name: "Deez NUts",
		spritenum: 292,
		fling: {
			basePower: 200,
			effect(target) {
				this.heal(target.baseMaxhp);
			},
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay', 'Richard Petty'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay', 'Richard Petty'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay', 'Richard Petty'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay', 'Richard Petty'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpePriority: 1,
		onModifySpe(spe, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		shortDesc: "This Pokemon's stats are doubled if their BST is 280 or less, or Inkay/Richard Petty.",
		rating: 3,
	},
	lemonmemory: {
		name: "Lemon Memory",
		shortDesc: "Holder's Multi-Attack is Lemon type.",
		spritenum: 679,
		onMemory: 'Lemon',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Lemon",
		itemUser: ["Silvally-Lemon"],
	},
	fishyseed: {
		name: "Fishy Seed",
		shortDesc: "If the terrain is Fishy Terrain, raises holder's Spe by 1 stage. Single use.",
		spritenum: 666,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('fishingterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('fishingterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			spe: 1,
		},
		rating: 2,
	},
	cornerstonemask: {
		inherit: true,
		shortDesc: "Boogerpon-CLOWNerstone: moves have 1.2x power.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Boogerpon-CLOWNerstone')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies === 'Boogerpon-CLOWNerstone') return false;
			return true;
		},
		forcedForme: "Boogerpon-CLOWNerstone",
		itemUser: ["Boogerpon-CLOWNerstone"],
	},

	//slate 5
	covertcloak: {
		inherit: true,
		shortDesc: "Holder nullifies all secondary effects of another Pokemon's attack.",
		onTakeItem: false,
		onModifySecondaries(secondaries) {
			return secondaries.filter(effect => !!effect.cloak);
		},
		rating: 3,
	},
	sillymemory: {
		name: "Silly Memory",
		shortDesc: "Holder's Multi-Attack is Silly type.",
		spritenum: 679,
		onMemory: 'Silly',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Silly",
		itemUser: ["Silvally-Silly"],
	},
	stellariumz: {
		name: "Stellarium Z",
		shortDesc: "If holder has an attacking move, this item allows it to use a Stellar Z-Move.",
		spritenum: 633,
		onMemory: 'Stellar',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Stellar",
		rating: 3,
	},
	bigbuttonbutton: {
		name: "Big Button Button",
		spritenum: 118,
		fling: {
			basePower: 60,
			volatileStatus: 'bigbutton',
		},
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['bigbutton'] || (source.terastallized && source.set.teraType === "Bug")) return;
			if (target.useItem()) source.addVolatile('bigbutton');
		},
		shortDesc: "On hit, force the opponent to use Big Button if not Terastallized Bug. Single use.",
		rating: 3,
	},

	//slate 6
	boxofonedozenstarvingcrazedweasels: {
		name: "Box of One Dozen Starving, Crazed Weasels",
		shortDesc: "Cannot be removed. Attackers lose 1/8 max HP per turn if they try to.",
		rating: 3,
		onTakeItem: false,
		onHit(target, source, move) {
			if (['corrosivegas', 'covet', 'knockoff', 'switcheroo', 'thief', 'trick', 'incinerate'].includes(move.id)) {
				source.addVolatile('boxofonedozenstarvingcrazedweasels');
				return;
			}
			if (target !== source && !source.item) {
				if (source.hasAbility('pickpocket') && move.flags.contact) {
					source.addVolatile('boxofonedozenstarvingcrazedweasels');
					return;
				}
			}
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Box of One Dozen Starving, Crazed Weasels');
			},
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 8);
			},
		},
	},
	shuriken: {
		name: "Shuriken",
		fling: {
			basePower: 90,
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source.shuriken === undefined) source.shuriken = 0;
			if (move.category !== 'Status') source.shuriken ++;
			else source.shuriken = 0;
			if (source.shuriken >= 3) {
				this.boost({atk: 1, spa: 1});
				source.shuriken = 0;
			}
		},
		shortDesc: "If holder uses 3 consecutive attacking moves, it gains +1 Attack and Sp. Attack.",
		rating: 2,
	},
	tubeofonebillionlemons: {
		name: "Tube of One Billion Lemons",
		shortDesc: "Holder's Lemon-type attacks have 1.2x power.",
		spritenum: 60,
		rating: 2,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Lemon') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	comicallylargespoon: {
		name: "Comically Large Spoon",
		shortDesc: "Holder's Silly-type attacks have 1.2x power.",
		spritenum: 520,
		rating: 2,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Silly') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	bobscurse: {
		name: "Bob\'s Curse",
		shortDesc: "Holder's bullet attacks have 1.2x power and have a 30% chance to badly poison.",
		rating: 2,
		spritenum: 660,
		fling: {
			basePower: 90,
			secondary: {
				chance: 30,
				status: 'psn',
			},
		},
		onModifyMove(move, pokemon) {
			if (move.flags['bullet']) {
				this.debug('Adding Stench flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.status === 'tox') return;
				}
				move.secondaries.push({
					chance: 30,
					status: 'tox',
				});
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.flags['bullet']) {
				return this.chainModify([4915, 4096]);
			}
		},
	},

	//slate 7
	nomelberry: {
		inherit: true,
		shortDesc: "Halves damage taken from a supereffective Lemon-type attack. Single use.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Lemon' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		isNonstandard: null,
	},
	cornnberry: {
		inherit: true,
		shortDesc: "Halves damage taken from a supereffective Silly-type attack. Single use.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Silly' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		isNonstandard: null,
	},
	bonerockorsomethingidfk: {
		name: "bonerockorsomethingidfk",
		shortDesc: "Holder's use of Graveyard lasts 8 turns instead of 5.",
		spritenum: 379,
		fling: {
			basePower: 60,
			effect(target) {
				this.damage(target.baseMaxhp / 8, target);
			},
		},
	},

	//slate 8
	inexplicablesouvenir: {
		name: "Inexplicable Souvenir",
		shortDesc: "On switchin, block one stat drop/status infliction, but hit self in confusion afterward.",
		onStart(pokemon) {
			pokemon.addVolatile('inexplicablesouvenir');
		},
		fling: {
			basePower: 85,
			effect(target) {
				target.addVolatile('inexplicablesouvenir');
			},
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Artifact');
			},
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
					this.add("-fail", target, "unboost", '[from] item: Purposefully Mutilated JPG of the Inexplicable Framed Photo of Sonic the Hedgehog and Shadow the Hedgehog', '[of] ' + target);
					target.removeVolatile('inexplicablesouvenir');
				}
			},
			onSetStatus(status, target, source, effect) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] item: Purposefully Mutilated JPG of the Inexplicable Framed Photo of Sonic the Hedgehog and Shadow the Hedgehog', '[of] ' + target);
				}
				target.removeVolatile('inexplicablesouvenir');
				return false;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Artifact');
				this.activeTarget = pokemon;
				const damage = this.actions.getConfusionDamage(pokemon, 40);
				if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
				const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
				this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			},
		},
	},
	hitmontopite: {
		name: "Hitmontopite",
		shortDesc: "If held by a Hitmontop, this item allows it to Mega Evolve in battle.",
		megaStone: "Hitmontop-Mega",
		megaEvolves: "Hitmontop",
		itemUser: ["Hitmontop"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	goombosscrown: {
		name: "Goomboss Crown",
		shortDesc: "Goomba: all abilities active at once, cannot have its abilities changed.",
		onStart(target) {
			if (target.baseSpecies.baseSpecies != 'Goomba') return;
			this.add('-item', target, 'Goomboss Crown');
			target.m.innates = Object.keys(target.species.abilities)
					.map(key => this.toID(target.species.abilities[key as "0" | "1" | "H" | "S"]))
					.filter(ability => ability !== target.ability);
			if (target.m.innates) {
				for (const innate of target.m.innates) {
					if (target.hasAbility(innate)) continue;
					target.addVolatile("ability:" + innate, target);
				}
			}
		},
		onSetAbility(ability, target, source, effect) {
			if (target.baseSpecies.baseSpecies != 'Goomba') return;
			if (effect && effect.effectType === 'Ability' && effect.name !== 'Trace') {
				this.add('-ability', source, effect);
			}
			this.add('-block', target, 'item: Goomboss Crown');
			return null;
		},
		itemUser: ["Goomba"],
		onTakeItem(item, source) {
			if (item.itemUser == source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	shoe: {
		name: "Shoe",
		shortDesc: "Holder's foot attacks have 1.3x power and 1.5x accuracy.",
		rating: 3,
		fling: {
			basePower: 90,
			type: "Fighting",
		},
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.flags['foot'] && typeof accuracy === 'number') {
				return this.chainModify(1.5);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.flags['foot']) {
				return this.chainModify([5325, 4096]);
			}
		},
	},
	fudgesaurite: {
		name: "Fudgesaurite",
		shortDesc: "If held by a Fudgesaur, this item allows it to Mega Evolve in battle.",
		megaStone: "Fudgesaur-Mega",
		megaEvolves: "Fudgesaur",
		itemUser: ["Fudgesaur"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	porygonitez: {
		name: "Porygonite-Z",
		shortDesc: "If held by a Porygon-Z, this item allows it to Mega Evolve in battle.",
		spritenum: 578,
		megaStone: "Porygon-Z-Mega",
		megaEvolves: "Porygon-Z",
		itemUser: ["Porygon-Z"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},

	//slate 9
	sigmarice: {
		name: "Sigma Rice",
		shortDesc: "Sigma Rice Lion: 1.3x Atk/Def/SpA. Consumed when transformed into a Lion.",
		fling: {
			basePower: 30,
			volatileStatus: 'sigmarice',
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && pokemon.baseSpecies.name === 'Sigma Rice Lion') {
				this.add('-item', pokemon, 'Sigma Rice');
				pokemon.addVolatile('sigmarice');
			}
		},
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed) return;
			if (['pyroar', 'luxray', 'entei', 'gougingfire', 'solgaleo', 'necrozmaduskmane'].includes(pokemon.id)) pokemon.useItem();
		},
		condition: {
			onStart(pokemon) {
				this.add('-message', `${pokemon.name} has become Sigma!`);
				this.add('-start', pokemon, 'Sigma', '[silent]');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				return this.chainModify([5325, 4096]);
			},
		},
	},
	frigidseed: {
		name: "Frigid Seed",
		shortDesc: "If the terrain is Frigid Terrain, raises holder's Spe by 1 stage. Single use.",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('frigidterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('frigidterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			spe: 1,
		},
		rating: 2,
	},
	shellierbell: {
		name: "Shellier Bell",
		spritenum: 438,
		fling: {
			basePower: 0,
			damageCallback(pokemon, target) {
				return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
			},
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
				this.heal(pokemon.baseMaxhp / 10);
			}
		},
		rating: 3,
		desc: "The holder heals 1/10 max HP upon successfully damaging a Pokemon with an attack.",
	},
	liongun: {
		name: "Lion Gun",
		shortDesc: "Holder's use of Lion Deluge lasts 10 turns instead of 5.",
		fling: {
			basePower: 100,
			type: 'Steel',
		},
	},
	weezerberry: {
		name: "Weezer Berry",
		shortDesc: "Holder's Atk/SpA +1, Def +3, SpD -4 if hit by a Lemon/Normal-type attack. Single use.",
		isBerry: true,
		fling: {
			basePower: 70,
			type: 'Silly',
			secondary: {
				chance: 10,
				status: 'psn',
			},
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Lemon' || move.type === 'Normal') {
				target.useItem();
			}
		},
		boosts: {
			atk: 1,
			def: 3,
			spa: 1,
			spd: -4,
		},
	},
	manyfishingtokens: {
		name: "Many Fishing Tokens",
		shortDesc: "When the holder is damaged by an attack, its user gets 1 Fishing Token.",
		fling: {
			basePower: 20,
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			target.side.addFishingTokens(1);
		},
	},
	citroniumz: {
		name: "Citronium Z",
		shortDesc: "If held by Citrus Jams with Citron, it can use CITRON OVERLOAD.",
		spritenum: 659,
		onTakeItem: false,
		zMove: "CITRON OVERLOAD",
		zMoveFrom: "Citron",
		itemUser: ["Citrus Jams"],
	},

	//slate 10
	spacejamdvd: {
		name: "Space Jam DVD",
		shortDesc: "Holder's use of Gravity/Magic Room/Wonder Room lasts 8 turns instead of 5.",
		spritenum: 721,
		fling: {
			basePower: 20,
			effect(target) {
				this.field.addPseudoWeather('gravity');
			},
		},
	},
	eatmecookie: {
		name: "Eat-me Cookie",
		fling: {
			basePower: 90,
			volatileStatus: 'bigbutton',
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp && pokemon.volatiles['bigbutton']) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 3)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 3);
		},
		shortDesc: "When the holder becomes Big, restores 1/3 max HP. Single use.",
	},
	cardcrystal: {
		name: "Card Crystal",
		fling: {
			basePower: 20,
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (move.id === 'trumpcard' && target.useItem()) {
				target.side.trumpcard ++;
			}
		},
		shortDesc: "If the holder uses Trump Card, adds an extra Trump Card use. Single use.",
	},
	sulphurrock: {
		name: "Sulphur Rock",
		shortDesc: "Holder's use of Acid Rain lasts 8 turns instead of 5.",
		fling: {
			basePower: 60,
		},
	},
}
