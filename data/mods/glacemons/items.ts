export const Items: { [k: string]: ModdedItemData; } = {
	crystalcrown: {
		name: "Crystal Crown",
		num: -1,
		spritenum: 236,
		rating: 3,
		shortDesc: "0.67x damage from Z-Move/Mega/Dynamax/Tera. Attack = -1/8 HP.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.isZ || (source.volatiles['dynamax'] && source.volatiles['dynamax'].isActive) || source.volatiles['terastallized'] || (source.species.forme == "Mega")) {
				return this.chainModify(0.67);
			}
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (move.isZ || (source.volatiles['dynamax'] && source.volatiles['dynamax'].isActive) || source.volatiles['terastallized'] || (source.species.forme == "Mega")) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	aguavberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'spd') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use.",
	},
	figyberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'atk') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use.",
	},
	iapapaberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'def') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Def Nature. Single use.",
	},
	magoberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'spe') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use.",
	},
	wikiberry: {
		inherit: true,
		isNonstandard: null,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'spa') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use.",
	},
	bugmemory: {
		inherit: true,
		shortDesc: "Bug-type attacks: 1.2x power, 0.75x from other types. Multi-Attack is Bug type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Bug') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Bug') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	dragonmemory: {
		inherit: true,
		shortDesc: "Dragon-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Dragon type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Dragon') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Dragon') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	electricmemory: {
		inherit: true,
		shortDesc: "Electric-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Electric type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Electric') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	fightingmemory: {
		inherit: true,
		shortDesc: "Fighting-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Fighting type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Figthing') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fighting') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	firememory: {
		inherit: true,
		shortDesc: "Fire-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Fire type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Fire') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fire') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	flyingmemory: {
		inherit: true,
		shortDesc: "Flying-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Flying type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Flying') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Flying') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	ghostmemory: {
		inherit: true,
		shortDesc: "Ghost-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Ghost type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Ghost') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ghost') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	grassmemory: {
		inherit: true,
		shortDesc: "Grass-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Grass type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Grass') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Grass') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	groundmemory: {
		inherit: true,
		shortDesc: "Ground-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Ground type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Ground') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ground') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	icememory: {
		inherit: true,
		shortDesc: "Ice-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Ice type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Ice') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ice') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	poisonmemory: {
		inherit: true,
		shortDesc: "Poison-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Poison type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Poison') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Poison') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	psychicmemory: {
		inherit: true,
		shortDesc: "Psychic-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Psychic type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Psychic') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Psychic') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	rockmemory: {
		inherit: true,
		shortDesc: "Rock-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Rock type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Rock') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Rock') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	steelmemory: {
		inherit: true,
		shortDesc: "Steel-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Steel type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Steel') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Steel') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	watermemory: {
		inherit: true,
		shortDesc: "Water-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Water type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Water') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Water') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	fairymemory: {
		inherit: true,
		shortDesc: "Fairy-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Fairy type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Fairy') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fairy') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	darkmemory: {
		inherit: true,
		shortDesc: "Dark-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Dark type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Dark') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Dark') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	normalmemory: {
		name: "Normal Memory",
		onMemory: 'Normal',
		shortDesc: "Normal-type attacks: 1.2x power. 0.75x from other types. Multi-Attack is Normal type.",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type !== 'Normal') return this.chainModify(0.75);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return this.chainModify([4915, 4096]);
			}
		},
		forcedForme: "Silvally",
		gen: 9,
		num: -2,
	},
	strangecigar: {
		name: "Strange Cigar",
		shortDesc: "Disable the user's ability. Holder's contact moves disable the opponent's ability.",
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			if (pokemon.getAbility().flags['cantsuppress']) return;
			pokemon.addVolatile('gastroacid');
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				target.addVolatile('gastroacid');
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				target.addVolatile('gastroacid');
			}
		},
		num: -3,
		gen: 9,
		spritenum: 61,
		rating: 3,
	},
	iceaxe: {
		name: "Ice Axe",
		spritenum: 305,
		shortDesc: "The holder's Ice moves are guaranteed to critically hit while Snow is active.",
		onModifyMove(move) {
			if (this.field.isWeather('snow') && move.type === 'Ice') {
				move.willCrit = true;
			}
		},
		num: -4,
		gen: 9,
		rating: 3,
	},
	honey: {
		name: "Honey",
		fling: {
			basePower: 30,
		},
		num: -5,
		gen: 9,
		rating: 3,
		shortDesc: "Restores 1/3 max HP when at 1/2 max HP or less once, -1 Spe vs. Knock Off.",
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3) {
				if (this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2) && pokemon.useItem()) {
					this.heal(pokemon.baseMaxhp / 3);
				}
			}
		},
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp) return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff' || this.activeMove.id === 'thief' || this.activeMove.id === 'switcheroo' || this.activeMove.id === 'trick') {
				if (!this.boost({ spe: -1 }, source)) {
					this.add('-activate', pokemon, 'item: Honey');
				}
				return false;
			}
			if (source.hasAbility('honeygather')) {
				return false;
			}
		},
	},
	eviolite: {
		inherit: true,
		onModifySpAPriority: 2,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.3);
			}
		},
		num: 538,
		gen: 5,
		rating: 3,
		shortDesc: "If holder's species can evolve, its Def/SpD is 1.5x, SpA is 1.3x.",
	},
	trainingwheels: {
		name: "Training Wheels",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyAtkPriority: 2,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.3);
			}
		},
		onModifySpePriority: 2,
		onModifySpe(spe, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		num: -6,
		gen: 9,
		rating: 3,
		shortDesc: "If holder's species can evolve, its Spe is 1.5x, Atk 1.3x.",
	},
	palettecleanser: {
		name: "Palette Cleanser",
		spritenum: 717,
		fling: {
			basePower: 10,
			effect(pokemon) {
				let activate = false;
				const boosts: SparseBoostsTable = {};
				let i: BoostID;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] != 0) {
						activate = true;
						boosts[i] = 0;
					}
				}
				if (activate) {
					pokemon.setBoost(boosts);
					this.add('-clearboost', pokemon, '[silent]');
				}
			},
		},
		onUpdate(pokemon) {
			let activate = false;
			const boosts: SparseBoostsTable = {};
			let i: BoostID;
			for (i in pokemon.boosts) {
				if (pokemon.boosts[i] != 0) {
					activate = true;
					boosts[i] = 0;
				}
			}
			if (activate) {
				pokemon.setBoost(boosts);
				this.add('-clearboost', pokemon, '[silent]');
			}
		},
		num: -6,
		gen: 9,
		rating: 3,
		shortDesc: "If the user has a stat dropped or raised, remove all stat changes for itself.",
	},
	mewniumz: {
		inherit: true,
		zMoveFrom: "Expanding Force",
		isNonstandard: null,
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if (this.field.isTerrain('psychicterrain')) {
				this.debug('Mewnium Z boost');
				return this.chainModify([5325, 4096]);
			}
		},
		shortDesc: "If Mew: Expanding Force becomes Genesis Supernova. 1.3x boost in Psychic Terrain.",
	},
	specialteraorb: {
		name: "Special Tera Orb",
		onStart(pokemon) {
			if (pokemon.isActive && (pokemon.baseSpecies.name === 'Terapagos' || pokemon.baseSpecies.name === 'Terapagos-Terastal')) {
				if (pokemon.species.id !== 'terapagosstellar') {
					pokemon.formeChange('Terapagos-Stellar');
					pokemon.baseMaxhp = Math.floor(Math.floor(
						2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
					) * pokemon.level / 100 + 10);
					const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
					pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
					pokemon.maxhp = newMaxHP;
					this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
				}
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Terapagos' || source.baseSpecies.baseSpecies === 'Terapagos-Terastal' || source.baseSpecies.baseSpecies === 'Terapagos-Stellar') return false;
			return true;
		},
		gen: 9,
		itemUser: ["Terapagos"],
		desc: "If holder is a Terapagos, it becomes Stellar form. It is Stellar type.",
		num: -7,
	},
	safetygoggles: {
		inherit: true,
		onTakeItem: false,
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return this.chainModify(1.2);
			}
		},
		rating: 3,
		shortDesc: "Powder and Sandstorm immunity. The accuracy of attacks by the holder is 1.2x.",
	},
	speedingticket: {
		name: "Speeding Ticket",
		spritenum: 461,
		fling: {
			basePower: 40,
		},
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'item: Speeding Ticket', move, '[of] ' + source);
				target.switchFlag = true;
				if (source.useItem()) {
					source.switchFlag = false;
				} else {
					target.switchFlag = false;
				}
				return false;
			}
		},
		num: -8,
		gen: 9,
		rating: 3,
		shortDesc: "Priority immunity; attacker is forced to switch out if triggered. Single-use.",
	},
	scoutingvisor: {
		name: "Scouting Visor",
		fling: {
			basePower: 10,
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				if (source.hasType('Psychic')) {
					return this.chainModify([5324, 4096]);
				}
				else {
					return this.chainModify([2731, 4096]);
				}
			}
		},
		num: -9,
		gen: 9,
		rating: 3,
		spritenum: 537,
		shortDesc: "If Psychic-type, super effective moves deal 1.3x damage. If not: 0.67x damage.",
	},
	utilityumbrella: {
		inherit: true,
		desc: "The holder ignores rain- and sun-based effects. Damage and accuracy calculations from attacks used by the holder are affected by rain and sun, but not attacks used against the holder. The holder takes 3/4 damage and ignores secondary effects while in weathers or terrains.",
		shortDesc: "Ignores weather; 3/4 damage and ignore secondary effects under weather/terrain.",
		rating: 3,
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.isWeather() || this.field.isTerrain()) {
				this.debug('Utility Umbrella neutralize');
				return this.chainModify(0.75);
			}
		},
		onModifySecondaries(secondaries) {
			if (this.field.isWeather() || this.field.isTerrain()) {
				this.debug('Utility Umbrella prevent secondary');
				return secondaries.filter(effect => !!(effect.self || effect.dustproof));
			}
		},
	},
	airballoon: {
		inherit: true,
		onStart(target) {
			if (!target.ignoringItem() && !this.field.getPseudoWeather('gravity')) {
				this.add('-item', target, 'Air Balloon');
			}
		},
		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Air Balloon');
			this.boost({ spa: 1 });
			target.item = '';
			target.itemState = { id: '', target };
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('airballoon'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Air Balloon');
				this.boost({ spa: 1 });
				target.item = '';
				target.itemState = { id: '', target };
				this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('airballoon'));
			}
		},
		rating: 3,
		shortDesc: "Holder is immune to Ground-type attacks. Once popped: +1 SpA.",
	},
	absorbbulb: {
		inherit: true,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target, 'Absorb Bulb');
			}
		},
		onTryHit(target, source, move){
			if (move.type === 'Water') {
				this.add('-immune', target, '[from] item: Absorb Bulb');
				return null;
			}
		},
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Absorb Bulb');
			this.boost({ spa: 1 });
			target.item = '';
			target.itemState = { id: '', target };
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('absorbbulb'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Absorb Bulb');
				this.boost({ atk: 1 });
				target.item = '';
				target.itemState = { id: '', target };
				this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('absorbbulb'));
			}
		},
//		onTryHit(target, source, move) {
//			if (move.type === 'Water') {
//				target.useItem();
//				return null;
//			}
//		},
		rating: 3,
		shortDesc: "Holder is immune to Water-type attacks. Once popped: +1 SpA.",
	},
	cellbattery: {
		inherit: true,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target, 'Cell Battery');
			}
		},
		onTryHit(target, source, move){
			if (move.type === 'Electric') {
				this.add('-immune', target, '[from] item: Cell Battery');
				return null;
			}
		},
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Cell Battery');
			this.boost({ atk: 1 });
			target.item = '';
			target.itemState = { id: '', target };
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('cellbattery'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Cell Battery');
				this.boost({ atk: 1 });
				target.item = '';
				target.itemState = { id: '', target };
				this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('cellbattery'));
			}
		},
//		onTryHit(target, source, move) {
//			if (move.type === 'Electric') {
//				target.useItem();
//				return null;
//			}
//		},
		rating: 3,
		shortDesc: "Holder is immune to Electric-type attacks. Once broken: +1 Atk.",
	},
	snowball: {
		inherit: true,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target, 'Snowball');
			}
		},
		onTryHit(target, source, move){
			if (move.type === 'Ice') {
				this.add('-immune', target, '[from] item: Snowball');
				return null;
			}
		},
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Snowball');
			this.boost({ atk: 1 });
			target.item = '';
			target.itemState = { id: '', target };
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('snowball'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Snowball');
				this.boost({ atk: 1 });
				target.item = '';
				target.itemState = { id: '', target };
				this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('snowball'));
			}
		},
//		onTryHit(target, source, move) {
//			if (move.type === 'Ice') {
//				target.useItem();
//				return null;
//			}
//		},
		rating: 3,
		shortDesc: "Holder is immune to Ice-type attacks. Once broken: +1 Atk.",
	},
	indecisiveorb: {
		name: "Indecisive Orb",
		spritenum: 742,
		fling: {
			basePower: 30,
		},
		onDisableMove: function (pokemon) {
			if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify(1.3);
		},
		desc: "Holder's move have 1.3x BP, but it can't use the same move twice in a row.",
		num: -10,
		gen: 9,
		rating: 3,
	},
	shedshell: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && this.activeMove.id === 'pursuit') {
				this.add('-immune', target, '[from] item: Shed Shell');
				return null;
			}
		},
		shortDesc: "Holder may switch out when trapped, even by Ingrain or Pursuit.",
		rating: 3,
	},
	// Slate 4
	machobrace: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hasType('Fighting') || pokemon.hasAbility('Klutz')) {
				return this.chainModify(1.2);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Fighting') || pokemon.hasAbility('Klutz')) {
				return this.chainModify(1.2);
			}
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasType('Fighting') && !pokemon.hasAbility('Klutz')) {
				return this.chainModify(0.5);
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.id === 'fling') {
				move.basePower *= 1.5;
			}
		},
		shortDesc: "If Fighting-type or Klutz: 1.2x Atk/Def. If not: 1/2 Spe. 1.5x Fling BP.",
		rating: 3,
	},
	cursedbranch: {
		num: -11,
		name: "Cursed Branch",
		spritenum: 29,
		fling: {
			basePower: 30,
		},
		shortDesc: "On switch in, adds Grass type to holder. No effect if holder is Grass type.",
		onStart(pokemon) {
			if (pokemon.addType('Grass')) {
				this.add('-start', pokemon, 'typeadd', 'Grass', '[from] item: Cursed Branch');
			}
		},
		rating: 3,
	},
	knightsarmor: {
		num: -12,
		spritenum: 753, 
		name: "Knight's Armor",
		fling: {
			basePower: 200,
			self: {
				volatileStatus: 'mustrecharge',
			},
		},
		onTakeItem: false,
		// airborneness negation implemented in scripts.ts
		shortDesc: "Holder is grounded and takes 0.75x damage if hazards are up on holder's side.",
		rating: 3,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.side.getSideCondition('stealthrock') || target.side.getSideCondition('spikes') || target.side.getSideCondition('toxicspikes') || target.side.getSideCondition('stickyweb') || target.side.getSideCondition('gmaxsteelsurge')) { 
				return this.chainModify(0.75);
			}
		},
	},
	laggingtail: {
		inherit: true,
		shortDesc: "The holder's Speed is halved, but its attacks have 1.3x power.",
		rating: 3,
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096]);
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
	},


	// Z-move section for Silvally
	buginiumz: {
		inherit: true,
		onMemory: "Bug",
	},
	darkiniumz: {
		inherit: true,
		onMemory: "Dark",
	},
	dragoniumz: {
		inherit: true,
		onMemory: "Dragon",
	},
	electriumz: {
		inherit: true,
		onMemory: "Electric",
	},
	fairiumz: {
		inherit: true,
		onMemory: "Fairy",
	},
	fightiniumz: {
		inherit: true,
		onMemory: "Fighting",
	},
	firiumz: {
		inherit: true,
		onMemory: "Fire",
	},
	ghostiumz: {
		inherit: true,
		onMemory: "Ghost",
	},
	grassiumz: {
		inherit: true,
		onMemory: "Grass",
	},
	groundiumz: {
		inherit: true,
		onMemory: "Ground",
	},
	iciumz: {
		inherit: true,
		onMemory: "Ice",
	},
	poisoniumz: {
		inherit: true,
		onMemory: "Poison",
	},
	psychiumz: {
		inherit: true,
		onMemory: "Psychic",
	},
	rockiumz: {
		inherit: true,
		onMemory: "Rock",
	},
	steeliumz: {
		inherit: true,
		onMemory: "Steel",
	},
	wateriumz: {
		inherit: true,
		onMemory: "Water",
	},

	//slate 5 
	puppetstrings: {
		fling: {
			basePower: 10,
		},
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
			move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax || !source.volatiles['substitute']) return;
			move.multihit = 2;
			move.multihitType = 'parentalbond';
		},
		// Damage modifier implemented in BattleActions#modifyDamage()
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2 && source.volatiles['substitute']) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		desc: "If this Pokemon has a Substitute, its damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect Doom Desire, Dragon Darts, Dynamax Cannon, Endeavor, Explosion, Final Gambit, Fling, Future Sight, Ice Ball, Rollout, Self-Destruct, any multi-hit move, any move that has multiple targets, or any two-turn move.",
		shortDesc: "Damaging moves hit twice if behind a Substitute. 2nd hit = 1/4 damage.",
		flags: {},
		name: "Puppet Strings",
		num: -14,
		rating: 3,
		spritenum: 179,
	},
	pikaniumz: {
		inherit: true,
		shortDesc: "If Pikachu: 2x Atk, SpA, Def, SpD. Changes type and ability.",
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Pikachu') return;
			let newAbility;
			let newType;
			switch (pokemon.baseSpecies.forme) {
				case 'Original':
					newAbility = 'Run It Back';
					newType = 'Fairy';
					break;
				case 'Hoenn':
					newAbility = 'Technician';
					newType = 'Water';
					break;
				case 'Sinnoh':
					newAbility = 'No Guard';
					newType = 'Steel';
					break;
				case 'Unova':
					newAbility = 'Intimidate';
					newType = 'Fighting';
					break;
				case 'Kalos':
					newAbility = 'Mold Breaker';
					newType = 'Dark';
					break;
				case 'Alola':
					newAbility = 'Psychic Surge';
					newType = 'Psychic';
					break;
				case 'World':
					newAbility = 'Aerilate';
					newType = 'Flying';
					break;
				default:
					newAbility = 'Tough Claws';
					newType = 'Normal';
					break;
			}
			const oldAbility = pokemon.setAbility(newAbility, pokemon, newAbility, true);
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu' && pokemon.addType(newType)) {
				this.add('-start', pokemon, 'typeadd', newType, '[from] item: Pikanium Z');
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu' && pokemon.baseSpecies.forme === 'Alola' && move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Psychic';
				move.typeChangerBoosted = this.effect;
			}
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner"],
	},
	pikashuniumz: {
		inherit: true,
		shortDesc: "If Pikachu: 2x Atk, SpA, Def, SpD. Changes type and ability.",
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Pikachu') return;
			let newAbility;
			let newType;
			switch (pokemon.baseSpecies.forme) {
				case 'Original':
					newAbility = 'Run It Back';
					newType = 'Fairy';
					break;
				case 'Hoenn':
					newAbility = 'Technician';
					newType = 'Water';
					break;
				case 'Sinnoh':
					newAbility = 'No Guard';
					newType = 'Steel';
					break;
				case 'Unova':
					newAbility = 'Intimidate';
					newType = 'Fighting';
					break;
				case 'Kalos':
					newAbility = 'Mold Breaker';
					newType = 'Dark';
					break;
				case 'Alola':
					newAbility = 'Psychic Surge';
					newType = 'Psychic';
					break;
				case 'World':
					newAbility = 'Aerilate';
					newType = 'Flying';
					break;
				default:
					newAbility = 'Tough Claws';
					newType = 'Normal';
					break;
			}
			const oldAbility = pokemon.setAbility(newAbility, pokemon, newAbility, true);
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu' && pokemon.addType(newType)) {
				this.add('-start', pokemon, 'typeadd', newType, '[from] item: Pikanium Z');
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (pokemon.baseSpecies.forme === 'Pikachu-Alola' && move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Psychic';
				move.typeChangerBoosted = this.effect;
			}
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner"],
	},
	friedrice: {
		name: "Fried Rice",
		spritenum: 531,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.id === 'waterpulse') return this.chainModify([5324, 4096]);
		},
		basePowerCallback(pokemon, target, move) {
			if (move.id === 'waterpulse' && pokemon.baseSpecies.baseSpecies === 'Clawitzer') {
				return 80;
			}
			return move.basePower;
		},
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Clawitzer' && pokemon.addType('Dragon')) {
				this.add('-start', pokemon, 'typeadd', 'Dragon', '[from] item: Fried Rice');
			}
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Clawitzer') return this.chainModify(1.5);
		},
		shortDesc: "Pulse damage is x1.3. If Clawitzer: becomes Water/Dragon, Speed is 1.5x, Water Pulse is 80 BP.",
		num: -14,
		onTakeItem(item, source){
			if (source.baseSpecies.baseSpecies === 'Clawitzer') return false;
			return true;
		},
		rating: 3,
	},
	ringtarget: {
		inherit: true,
		fling: {
			basePower: 60,
			secondary: {
				chance: 100,
				evasion: -1,
			},
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && move.category !== 'Status') {
				return true;
			}
			return accuracy;
		},
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		shortDesc: "User's physical and special moves can't miss, but their secondary effects are removed.",
		rating: 3,
	},
	// Slate 6
	//ts pmo icl
	parallelmegaorb: { 
		name: "Parallel Mega Orb",
		spritenum: 578,
		onTakeItem: false,
		onBeforeMega(pokemon) {
			pokemon.addVolatile('gastroacid');
		},
		onAfterMega(pokemon) {
			pokemon.setAbility(pokemon.set.ability);
			pokemon.baseAbility = pokemon.ability;
			pokemon.removeVolatile('gastroacid');
			this.add('-item', pokemon, 'Parallel Mega Orb');
			this.add('-message', `${pokemon.name} has kept it's original ability!`);
		},
		//onPreStart(pokemon) {
		//	pokemon.addVolatile('gastroacid');
		//},
		//onStart(pokemon) {
		//	pokemon.setAbility(pokemon.set.ability);
		//	pokemon.removeVolatile('gastroacid');
		//},
		shortDesc: "Mega evolves the holder. The holder keeps the ability it had prior to Mega Evolving.",
		num: -15,
		gen: 9,
		rating: 3,
	},
	legendplate: {
		name: "Legend Plate",
		spritenum: 225,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.teraType;
			this.add('-item', pokemon, 'Legend Plate');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType(type)) return;
				this.add('-start', pokemon, 'typechange', type, '[from] item: Legend Plate');
			}
			this.add('-message', `${pokemon.name}'s Legend Plate changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Legend Plate');
				return null;
			}
		},
		onModifyBasePowerPriority: 22,
		onModifyBasePower(basePower, attacker, defender, move) {
			if ((move.stab && attacker.teraType === 'Stellar') || move.type === attacker.teraType) {
				return this.chainModify(1.2);
			}
		},
		num: -16,
		gen: 9,
		shortDesc: "Type changes to Tera Type on switch-in. New STAB are 1.2x, existing STAB if Stellar.",
		rating: 3,
	},
	baseball: {
		name: "Baseball",
		spritenum: 345,
		fling: {
			basePower: 50,
			secondary: {
				chance: 100,
				volatileStatus: 'flinch',
			},
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
		num: -17,
		shortDesc: "Holder's ball/bomb moves have 1.3x power, and are physical.",
		gen: 9,
		rating: 3,
	},
	gooditem: {
		name: "Good Item",
		shortDesc: "Turns into a random item from the Popular Items section.",
		onStart(pokemon) {
			const itemList = ['leftovers', 'sitrusberry', 'lumberry', 'figyberry', 'starfberry', 'choiceband', 'choicespecs', 'choicescarf', 'rockyhelmet', 'heavydutyboots', 'assaultvest', 'cursedbranch', 'lifeorb', 'expertbelt'];
			const itemIndex = this.random(itemList.length);
			const itemMade = itemList[itemIndex];
			if (pokemon.hp) {
				pokemon.setItem(itemMade);
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Good Item');
			}
		},
		num: -18,
	},
	neutralizer: {
		fling: {
			basePower: 20,
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!target.runImmunity(move.type)) return;
			if (this.dex.getEffectiveness(move, target) === -1) return;
			return 0;
		},
		// Implemented in scripts.js
		name: "Neutralizer",
		shortDesc: "User cannot be hit super effectively, and cannot hit for super effective damage.",
		num: -19,
		spritenum: 119,
		rating: 3,
	},
	dreamcatcher: { // WIP, doesn't work currently
		name: "Dream Catcher",
		fling: {
			basePower: 60,
		},
		onOverrideAction(pokemon, target, move) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'item: Dream Catcher');
				return this.dex.getActiveMove('sleeptalk');
			}
		},
		num: -20,
		gen: 9,
		shortDesc: "Bugged; do not use in PMPL!",
	},
	greniniumz: {
		name: "Greninium Z",
		spritenum: 652,
		onTakeItem: false,
		zMove: "Bond Slicing Shuriken",
		zMoveFrom: "Water Shuriken",
		itemUser: ["Greninja-Bond"],
		onAfterMove(pokemon, target, move) {
			if (move.id === 'bondslicingshuriken') pokemon.formeChange('Greninja-Ash', '[from] item: Greninium Z', true);
		},
		num: -21,
		gen: 9,
		shortDesc: "Greninja with Water Shuriken; can use Bond Slicing Shuriken. Turns into Greninja-Ash.",
	},
	// Slate 7
	yellowcard: {
		name: "Yellow Card",
		spritenum: 387,
		fling: {
			basePower: 88,
		},
		onStart(pokemon) {
			pokemon.addVolatile('yellowcard');
		},
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && source.hp && target.hp && target.hp <= target.maxhp / 2 && move && move.category !== 'Status') {
				if (target.volatiles['yellowcard']) {
					this.add('-enditem', target, this.effect, '[weaken]');
					this.boost({atk: -1, def: -1}, source, target);
				}
			}
		},
		num: -22,
		gen: 9,
		shortDesc: "If holder is below 1/2 max HP, opponent: -1 Atk and Def.",
		rating: 3,
	},
	babiriberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('babiriberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['babiriberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('babiriberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Steel-type attack. Once per switch-in.",
	},
	chartiberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('chartiberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['chartiberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('chartiberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Rock-type attack. Once per switch-in.",
	},
	chilanberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('chilanberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (
				move.type === 'Normal' &&
				(!target.volatiles['substitute'] || move.flags['bypasssub'] || (move.infiltrates && this.gen >= 6))
			) {
				if (target.volatiles['chilanberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('chilanberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a Normal-type attack. Once per switch-in.",
	},
	chopleberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('chopleberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['chopleberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('chopleberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Fighting-type attack. Once per switch-in.",
	},
	colburberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('colburberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['colburberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('colburberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Dark-type attack. Once per switch-in.",
	},
	habanberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('habanberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['habanberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('habanberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Dragon-type attack. Once per switch-in.",
	},
	kasibberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('kasibberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['kasibberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('kasibberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Ghost-type attack. Once per switch-in.",
	},
	kebiaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('kebiaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['kebiaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('kebiaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Poison-type attack. Once per switch-in.",
	},
	occaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('occaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['occaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('occaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Fire-type attack. Once per switch-in.",
	},
	passhoberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('passhoberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['passhoberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('passhoberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Water-type attack. Once per switch-in.",
	},
	payapaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('payapaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['payapaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('payapaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Psychic-type attack. Once per switch-in.",
	},
	rindoberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('rindoberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['rindoberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('rindoberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Grass-type attack. Once per switch-in.",
	},
	roseliberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('roseliberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['roseliberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('roseliberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Fairy-type attack. Once per switch-in.",
	},
	shucaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('shucaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['shucaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('shucaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Ground-type attack. Once per switch-in.",
	},
	tangaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('tangaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['tangaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('tangaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Bug-type attack. Once per switch-in.",
	},
	wacanberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('wacanberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;
				if (target.volatiles['wacanberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('wacanberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Electric-type attack. Once per switch-in.",
	},
	yacheberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('yacheberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['yacheberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('yacheberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Ice-type attack. Once per switch-in.",
	},
	metronome: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('metronome');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('metronome')) {
					pokemon.removeVolatile('metronome');
					return;
				}
				if (move.callsMove) return;
				if (this.effectState.lastMove === move.id) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 5120, 6144, 7168, 8192];
				const numConsecutive = this.effectState.numConsecutive > 4 ? 4 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		shortDesc: "Consecutive moves (even if fail) power increases. Max 2x after 4 turns.",
		rating: 3,
	},
	enginebreaker: {
		name: "Engine Breaker",
		spritenum: 113,
		fling: {
			basePower: 20,
		},
		onStart(pokemon) {
			pokemon.addVolatile('enginebreaker');
		},
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			if (pokemon.volatiles['enginebreaker']) {
				move.ignoreAbility = true;
			}
		},
		num: -23,
		gen: 9,
		shortDesc: "Holder's moves ignore abilities once.",
		rating: 3,
	},
	redlicorice: {
		name: "Red Licorice",
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			this.add('-item', pokemon, 'Red Licorice');
			this.add('-message', `${pokemon.name} is chewing on some good licorice!`);
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([4915, 4096]);
			}
		},
		onModifyMove(move, pokemon) {
			if (move.flags['contact'] && pokemon.useItem()) {
				move.secondaries.push({
					chance: 100,
					onHit(target, source, move) {
						if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
					},
				});
			}
		},
		num: -24,
		gen: 9,
		shortDesc: "Holder's contact moves have 1.2x power and trap the target. Single use.",
		spritenum: 388,
		rating: 3,
	},
	pokerusvaccine: {
		name: "Pokerus Vaccine",
		fling: {
			basePower: 386,
		},
		onTakeItem: false,
		onStart(pokemon) {
			this.add('-item', pokemon, 'Pokerus Vaccine');
			pokemon.addVolatile('pokerusvaccine');
		},
		volatileStatus: 'pokerusvaccine',
		condition: {
			onSourceModifyAtkPriority: 6,
			onSourceModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Poison') {
					this.debug('Thick Fat weaken');
					return this.chainModify(0.5);
				}
			},
			onSourceModifySpAPriority: 5,
			onSourceModifySpA(spa, attacker, defender, move) {
				if (move.type === 'Poison') {
					this.debug('Thick Fat weaken');
					return this.chainModify(0.5);
				}
			},
			onUpdate(pokemon) {
				if (pokemon.status === 'psn' || pokemon.status === 'tox') {
					this.add('-activate', pokemon, 'ability: Immunity');
					pokemon.cureStatus();
				}
			},
			onSetStatus(status, target, source, effect) {
				if (status.id !== 'psn' && status.id !== 'tox') return;
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Immunity');
				}
				return false;
			},
		},
		num: -25,
		gen: 9,
		shortDesc: "Gains a status; 1/2 Poison-type damage and poison immunity. Once per switch-in.",
		spritenum: 343,
		rating: 3,
	},
	frozenorb: {
		name: "Frozen Orb",
		spritenum: 741,
		fling: {
			basePower: 30,
			status: 'frz',
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			pokemon.trySetStatus('frz', pokemon);
		},
		desc: "At the end of each turn, tries to freeze the holder.",
		shortDesc: "At the end of each turn, tries to freeze the holder.",
		num: -26,
		gen: 4,
	},
	fossilizeddino: {
		name: "Fossilized Dino",
		fling: {
			basePower: 10,
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Arctozolt' || source.baseSpecies.baseSpecies === 'Arctovish') return false;
			return true;
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Arctozolt' || pokemon.baseSpecies.baseSpecies === 'Arctovish') return this.chainModify(1.5);
		},
		basePowerCallback(pokemon, target, move) {
			if ((target.newlySwitched || this.queue.willMove(target)) && pokemon.baseSpecies.baseSpecies === 'Arctozolt' || pokemon.baseSpecies.baseSpecies === 'Arctovish') {
				this.debug('Fossilized Drake damage boost');
				return move.basePower * 1.2;
			}
			this.debug('NOT boosted');
			return move.basePower;
		},
		itemUser: ["Arctozolt", "Arctovish"],
		num: -27,
		shortDesc: "If Arctozolt or Arctovish: Speed is 1.5x, moves do 1.2x damage if holder is first.",
	},
	fossilizeddrake: {
		name: "Fossilized Drake",
		fling: {
			basePower: 10,
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Dracozolt' || source.baseSpecies.baseSpecies === 'Dracovish') return false;
			return true;
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Dracozolt' || pokemon.baseSpecies.baseSpecies === 'Dracovish') return this.chainModify(1.5);
		},
		basePowerCallback(pokemon, target, move) {
			if ((target.newlySwitched || this.queue.willMove(target)) && pokemon.baseSpecies.baseSpecies === 'Dracozolt' || pokemon.baseSpecies.baseSpecies === 'Dracovish') {
				this.debug('Fossilized Drake damage boost');
				return move.basePower * 1.2;
			}
			this.debug('NOT boosted');
			return move.basePower;
		},
		itemUser: ["Dracozolt", "Dracovish"],
		num: -28,
		shortDesc: "If Dracozolt or Dracovish: Speed is 1.5x, moves do 1.2x damage if holder is first.",
	},
	rulebook: {
		name: "Rulebook",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] item: Rulebook', '[of] ' + pokemon);
					target.addVolatile('embargo');
				}
			}
		},
		flags: {},
		desc: "On switch-in, reveals the held items of all opposing Pokemon and negates their effect for two turns.",
		shortDesc: "On switch-in, reveals held items of all foes; negates the effects for two turns.",
		num: -29,
		sprite: 609,
		rating: 3,
	},
	silverpowder: {
		inherit: true,
		rating: 3,
		onBasePower(basePower, user, target, move) {},
		onDamage(damage, target, source, effect) {
			if ((effect.id === 'stealthrock' || effect.id === 'spikes' || effect.id === 'toxicspikes' || effect.id === 'stickyweb' || effect.id === 'gmaxsteelsurge') && source?.hasType('Bug')) {
				return false;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hasType('Bug')) {
				return this.chainModify(1.2);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Bug')) {
				return this.chainModify(1.2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.hasType('Bug')) {
				return this.chainModify(1.2);
			}
		},
		desc: "If holder is Bug type, negates entry hazards, and user's Atk, Def, and SpA by 1.2x.",
	},
	protector: {
		inherit: true,
		rating: 3,
		onStart(pokemon) {
			this.add('-item', pokemon, 'Protector');
			this.add('-message', `${pokemon.name} is holding a Protector!`);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.type !== pokemon.types[0] && move.type !== pokemon.types[1]) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			return this.chainModify(2);
		},
		desc: "User's SpD is doubled, but it can only use moves of the same type as itself.",
	},
	expertbelt: {
		inherit: true,
		onModifyDamage(damage, pokemon, target, move) {
			if (move && (target.getMoveHitData(move).typeMod > 0 || pokemon.volatiles['expertbelt'])) {
				if (pokemon.volatiles['expertbelt']) {
					pokemon.removeVolatile('expertbelt');
				}
				else {
					pokemon.addVolatile('expertbelt');
				}
				return this.chainModify([4915, 4096]);
			}
		},
		desc: "Holder's attacks that are super effective against the target do 1.2x damage. If your super effective attacks hits a target, then your next attack does 1.2x damage regardless.",
	},
	// Slate 10
	polkadotbow: {
		name: "Polkadot Bow",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			this.add('-item', pokemon, 'Polkadot Bow');
			this.add('-message', `${pokemon.name} is holding a Polkadot Bow!`);
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon, target) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			const types = pokemon.getTypes();
			let type;
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status')
				&& !(move.name === 'Tera Blast' && pokemon.terastallized)
				&& !(move.name === 'Tera Blast' && pokemon.hasItem('legendplate'))) {
				if (move.id === pokemon.moveSlots[0].id) type = pokemon.types[0];
				else if (move.id === pokemon.moveSlots[1].id && types.length == 2) type = pokemon.types[1];
				move.type = type;
				move.typeChangerBoosted = this.effect;
			}
		},
		flags: {},
		desc: "Normal Moves transform into the primary type of the user if they are in the first moveslot, or the secondary type if they are in the second moveslot. Announces on switch in / Displayed.",
		shortDesc: "Normal-type moves turn into primary type of holder, or secondary depending on slot.",
		num: -31,
		rating: 3,
	},
	cursedfeather: {
		name: "Cursed Feather",
		spritenum: 754,
		fling: {
			basePower: 80,
		},
		onModifyDamage(damage, source, target, move) {
			if (source.status || source.hasAbility('comatose')) {
				return this.chainModify([5324, 4096]);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.status || pokemon.hasAbility('comatose')) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status === 'brn') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.status === 'frz') {
				return this.chainModify(2);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.status === 'par') {
				return this.chainModify(2);
			}
		},
		num: -32,
		gen: 9,
		rating: 3,
		desc: "If afflicted with status: the holder's attacks deal 1.3x damage, and it restores 1/8th of its max HP at the end of every turn. Ignores stat drops from burn/paralysis/frostbite.",
		shortDesc: "If statused, attacks deal 1.3x damage; holder heals 1/8th max HP per turn. Ignores stat drops.",
	},
	dungeonslooplet: {
		name: "Dungeon's Looplet",
		spritenum: 747,
		num: -31,
		gen: 9,
		shortDesc: "All abilities active at once.",
		onTakeItem: false,
		onStart(target) {
			this.add('-item', target, 'Dungeon\'s Looplet');
			this.add('-message', `${target.name} is holding a Dungeon's Looplet!`);
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
	},
	surprisebomb: {
		name: "Surprise Bomb",
		spritenum: 345,
		num: -33,
		gen: 9,
		rating: 3,
		onStart(pokemon) {
			this.actions.useMove("surprise", pokemon)
			this.add('-enditem', pokemon, "Surprise Bomb");
			pokemon.useItem();
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.id !== "surprise") return;
			move.type = pokemon.types[0]
			move.typeChangerBoosted = this.effect;
		},
		desc: "On switch-in, the holder uses a 40 BP Physical move with the holder's primary type, Special if SpAtk > Atk. Single use.",
		shortDesc: "On switch-in: 40 BP move based on primary type and stronger attack. Single use.",
	},
};
