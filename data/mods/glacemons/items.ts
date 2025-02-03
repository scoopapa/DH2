export const Items: { [k: string]: ModdedItemData; } = {
	crystalcrown: {
		name: "Crystal Crown",
		num: -1,
		shortDesc: "0.67x damage from Z-Move/Mega/Dynamax/Tera Pokemon. Attacker loses 1/8 max HP.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.isZ || (source.volatiles['dynamax'] && source.volatiles['dynamax'].isActive) || source.volatiles['terastallized'] || (source.forme && source.forme.startsWith('Mega'))) {
				return this.chainModify(0.67);
			}
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (move.isZ || (source.volatiles['dynamax'] && source.volatiles['dynamax'].isActive) || source.volatiles['terastallized'] || (source.forme && source.forme.startsWith('Mega'))) {
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
		shortDesc: "Bug-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Bug type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Bug') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	dragonmemory: {
		inherit: true,
		shortDesc: "Dragon-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Dragon type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Dragon') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	electricmemory: {
		inherit: true,
		shortDesc: "Electric-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Electric type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	fightingmemory: {
		inherit: true,
		shortDesc: "Fighting-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Fighting type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Figthing') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fighting') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	firememory: {
		inherit: true,
		shortDesc: "Fire-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Fire type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fire') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	flyingmemory: {
		inherit: true,
		shortDesc: "Flying-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Flying type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Flying') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	ghostmemory: {
		inherit: true,
		shortDesc: "Ghost-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Ghost type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ghost') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	grassmemory: {
		inherit: true,
		shortDesc: "Grass-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Grass type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Grass') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	groundmemory: {
		inherit: true,
		shortDesc: "Ground-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Ground type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ground') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	icememory: {
		inherit: true,
		shortDesc: "Ice-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Ice type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ice') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	poisonmemory: {
		inherit: true,
		shortDesc: "Poison-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Poison type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Poison') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	psychicmemory: {
		inherit: true,
		shortDesc: "Psychic-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Psychic type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Psychic') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	rockmemory: {
		inherit: true,
		shortDesc: "Rock-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Rock type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Rock') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	steelmemory: {
		inherit: true,
		shortDesc: "Steel-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Steel type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Steel') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	watermemory: {
		inherit: true,
		shortDesc: "Water-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Water type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Water') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	fairymemory: {
		inherit: true,
		shortDesc: "Fairy-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Fairy type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fairy') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	darkmemory: {
		inherit: true,
		shortDesc: "Dark-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Dark type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Dark') {
				return this.chainModify([4505, 4096]);
			}
		},
	},
	normalmemory: {
		name: "Normal Memory",
		onMemory: 'Normal',
		shortDesc: "Normal-type attacks: 1.1x power, 0.67x damage taken. Multi-Attack is Normal type.",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Normal') return this.chainModify(0.67);
		},
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return this.chainModify([4505, 4096]);
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
	},
	iceaxe: {
		name: "Ice Axe",
		shortDesc: "The holder's Ice moves are guaranteed to critically hit while Snow is active.",
		onModifyMove(move) {
			if (this.field.isWeather('snow') && move.type === 'Ice') {
				move.willCrit = true;
			}
		},
		num: -4,
		gen: 9,
	},
	honey: {
		name: "Honey",
		fling: {
			basePower: 30,
		},
		num: -5,
		gen: 9,
		shortDesc: "Restores 1/3 max HP when at 1/2 max HP or less once, -1 Spe vs. Knock Off.",
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				if (this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 4) && pokemon.useItem()) {
					this.heal(pokemon.baseMaxhp / 4);
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
		},
	},
	trainingwheels: {
		name: "Training Wheels",
		spritenum: 130,
		fling: {
			basePower: 40,
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
		shortDesc: "If holder's species can evolve, its Speed is 1.5x.",
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
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return this.chainModify(1.2);
			}
		},
		shortDesc: "Powder and Sandstorm immunity. The accuracy of attacks by the holder is 1.2x.",
	},
	speedingticket: {
		name: "Speeding Ticket",
		spritenum: 130,
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
				this.add('cant', dazzlingHolder, 'item: Speeding Ticket', move, '[of] ' + target);
				target.switchFlag = true;
				if (target.useItem()) {
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
		shortDesc: "If Psychic-type, super effective moves deal 1.3x damage. If not: 0.67x damage.",
	},
	utilityumbrella: {
		inherit: true,
		desc: "The holder ignores rain- and sun-based effects. Damage and accuracy calculations from attacks used by the holder are affected by rain and sun, but not attacks used against the holder. The holder takes 3/4 damage and ignores secondary effects while in weathers or terrains.",
		shortDesc: "Ignores weather; 3/4 damage and ignore secondary effects under weather/terrain.",
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
		shortDesc: "Holder is immune to Ground-type attacks. Once popped: +1 SpA.",
	},
	absorbbulb: {
		inherit: true,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target, 'Absorb Bulb');
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Water') {
				target.useItem();
				return null;
			}
		},
		shortDesc: "Holder is immune to Water-type attacks. Once popped: +1 SpA.",
	},
	cellbattery: {
		inherit: true,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target, 'Cell Battery');
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Electric') {
				target.useItem();
				return null;
			}
		},
		shortDesc: "Holder is immune to Electric-type attacks. Once broken: +1 Atk.",
	},
	snowball: {
		inherit: true,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target, 'Snowball');
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Ice') {
				target.useItem();
				return null;
			}
		},
		shortDesc: "Holder is immune to Ice-type attacks. Once broken: +1 Atk.",
	},
	indecisiveorb: {
		name: "Indecisive Orb",
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
	},
	shedshell: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && this.activeMove.id === 'pursuit') {
				this.add('-immune', target, '[from] item: Shed Shell');
				return null;
			}
		},
		shortDesc: "Holder may switch out even when trapped by another Pokemon, or by Ingrain and Pursuit.",
	},
	// Slate 4
	machobrace: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hasType('Fighting') || pokemon.hasAbility('Klutz')) {
				return this.chainModify(1.3);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Fighting') || pokemon.hasAbility('Klutz')) {
				return this.chainModify(1.3);
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
		shortDesc: "If Fighting-type or Klutz: 1.3x Atk/Def. If not: 1/2 Spe. 1.5x Fling BP.",
	},
	cursedbranch: {
		num: -11,
		name: "Cursed Branch",
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
		name: "Knight's Armor",
		fling: {
			basePower: 200,
			self: {
				volatileStatus: 'mustrecharge',
			},
		},
		// airborneness negation implemented in scripts.ts
		shortDesc: "Holder is grounded and takes 0.75x damage if hazards are up on holder's side.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.side.getSideCondition('stealthrock') || target.side.getSideCondition('spikes') || target.side.getSideCondition('toxicspikes') || target.side.getSideCondition('stickyweb')) {
				return this.chainModify(0.75);
			}
		},
	},
	laggingtail: {
		inherit: true,
		shortDesc: "Moves last in priority bracket, but attacks have their power boosted by 30%.",
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096]);
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
		shortDesc: "This Pokemon's damaging moves hit twice if it has a Substitute. The second hit has its damage quartered.",
		flags: {},
		name: "Puppet Strings",
		num: -14,
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
	},
	friedrice: {
		name: "Fried Rice",
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.id === 'waterpulse') return this.chainModify([4915, 4096]);
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
		shortDesc: "Water Pulse's damage is x1.2. If Clawitzer: becomes Water/Dragon, and Speed is 1.5x.",
		num: -14,
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
	},
	// Slate 6
	parallelmegaorb: { 
		name: "Parallel Mega Orb",
		onTakeItem(item, source) {
			return false;
		},
		onAfterMega(pokemon) {
			let newAbility = pokemon.set.ability
			const oldAbility = pokemon.setAbility(newAbility, pokemon, newAbility, true);
		},
		onStart(pokemon) {
			let newAbility = pokemon.set.ability
			const oldAbility = pokemon.setAbility(newAbility, pokemon, newAbility, true);
		},
		shortDesc: "Mega evolves the holder. The holder keeps the ability it had prior to Mega Evolving.",
		num: -15,
		gen: 9,
	},
	legendplate: {
		name: "Legend Plate",
		spritenum: 658,
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
		rating: 3,
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
		rating: 4,
		shortDesc: "User cannot be hit super effectively, and cannot hit for super effective damage.",
		num: -19,
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
		shortDesc: "(Not working) If the holder is asleep, Sleep Talk is used before an attack is selected by the holder. Does not work with Circle Throw, Dragon Tail, Roar, or Whirlwind.",
	},
	greniniumz: {
		name: "Greninium Z",
		spritenum: 652,
		onTakeItem: false,
		zMove: "Bond Slicing Shuriken",
		zMoveFrom: "Water Shuriken",
		itemUser: ["Greninja-Bond"],
		onAfterMove(pokemon, target, move) {
			if (move.id === 'bondslicingshuriken') pokemon.formeChange('Greninja-Ash');
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
					target.removeVolatile('yellowcard');
					this.boost({atk: -1, def: -1}, source, target);
				}
			}
		},
		num: -22,
		gen: 9,
		shortDesc: "If holder is below 1/2 of the user's max HP, opponent: -1 Atk and Def. Once per switch-in.",
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
				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		shortDesc: "Damage of moves used on consecutive turns (even if move failed) is increased. Max 2x after 5 turns.",
	},
	enginebreaker: {
		name: "Engine Breaker",
		fling: {
			basePower: 20,
		},
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			if (pokemon.useItem()) {
				move.ignoreAbility = true;
			}
		},
		num: -23,
		gen: 9,
		shortDesc: "Holder's moves ignore abilities once. Item is consumed after use.",
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
		shortDesc: "Holder's contact moves have x1.2 power and trap the target. Single use. Consumed after use. Announces itself.",
	},
	pokerusvaccine: {
		name: "Pokerus Vaccine",
		fling: {
			basePower: 386,
		},
		onStart(pokemon) {
			this.add('-item', pokemon, 'Pokerus Vaccine');
			if (pokemon.useItem()) {
				pokemon.addVolatile('pokerusvaccine');
			}
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
			onSourceModifySpA(atk, attacker, defender, move) {
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
		shortDesc: "Holder gains a status; 1/2 Poison-type damage and poison immunity. Once per switch-in.",
	},
	frozenorb: {
		name: "Frozen Orb",
		spritenum: 515,
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
	fossilizeddrake: {
		name: "Fossilized Drake",
		fling: {
			basePower: 10,
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
	fossilizeddino: {
		name: "Fossilized Dino",
		fling: {
			basePower: 10,
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
		shortDesc: "On switch-in, reveals the held items of all opposing Pokemon and negates the effects for two turns.",
		num: -29,
	},
};
