export const Items: { [k: string]: ModdedItemData; } = {
	crystalcrown: {
		name: "Crystal Crown",
		num: -1,
		shortDesc: "Holder takes 0.67x damage from Z-Moves, Mega-Evolved Pokemon, Dynamaxed Pokemon and Terastallized Pokemon.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.isZ || (source.volatiles['dynamax'] && source.volatiles['dynamax'].isActive) || source.volatiles['terastallized'] || (source.forme && source.forme.startsWith('Mega'))) {
				return this.chainModify(0.67);
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
		shortDesc: "Reduces damage taken from Bug-type moves by 0.67x. Holder's Multi-Attack is Bug type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug') return this.chainModify(0.67);
		},
	},
	dragonmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Dragon-type moves by 0.67x. Holder's Multi-Attack is Dragon type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon') return this.chainModify(0.67);
		},
	},
	electricmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Electric-type moves by 0.67x. Holder's Multi-Attack is Electric type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') return this.chainModify(0.67);
		},
	},
	fightingmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Figthing-type moves by 0.67x. Holder's Multi-Attack is Figthing type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Figthing') return this.chainModify(0.67);
		},
	},
	firememory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Fire-type moves by 0.67x. Holder's Multi-Attack is Fire type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') return this.chainModify(0.67);
		},
	},
	flyingmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Flying-type moves by 0.67x. Holder's Multi-Attack is Flying type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying') return this.chainModify(0.67);
		},
	},
	ghostmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Ghost-type moves by 0.67x. Holder's Multi-Attack is Ghost type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost') return this.chainModify(0.67);
		},
	},
	grassmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Grass-type moves by 0.67x. Holder's Multi-Attack is Grass type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass') return this.chainModify(0.67);
		},
	},
	groundmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Ground-type moves by 0.67x. Holder's Multi-Attack is Ground type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground') return this.chainModify(0.67);
		},
	},
	icememory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Ice-type moves by 0.67x. Holder's Multi-Attack is Ice type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice') return this.chainModify(0.67);
		},
	},
	poisonmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Poison-type moves by 0.67x. Holder's Multi-Attack is Poison type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison') return this.chainModify(0.67);
		},
	},
	psychicmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Psychic-type moves by 0.67x. Holder's Multi-Attack is Psychic type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic') return this.chainModify(0.67);
		},
	},
	rockmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Rock-type moves by 0.67x. Holder's Multi-Attack is Rock type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock') return this.chainModify(0.67);
		},
	},
	steelmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Steel-type moves by 0.67x. Holder's Multi-Attack is Steel type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel') return this.chainModify(0.67);
		},
	},
	watermemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Water-type moves by 0.67x. Holder's Multi-Attack is Water type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') return this.chainModify(0.67);
		},
	},
	fairymemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Fairy-type moves by 0.67x. Holder's Multi-Attack is Fairy type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy') return this.chainModify(0.67);
		},
	},
	darkmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Dark-type moves by 0.67x. Holder's Multi-Attack is Dark type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark') return this.chainModify(0.67);
		},
	},
	normalmemory: {
		name: "Normal Memory",
		onMemory: 'Normal',
		shortDesc: "Reduces damage taken from Normal-type moves by 0.67x. Holder's Multi-Attack is Normal type.",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Normal') return this.chainModify(0.67);
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
		shortDesc: "When this Pokemon's HP drops below 50%, restores 25% HP. The item is then consumed. This item cannot be removed from the holder unless it is consumed. Any attempt to remove/steal this item lowers the attacker's Speed by one stage.",
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
		shortDesc: "If held by a Mew with Expanding Force, it can use Genesis Supernova. 30% power boost in Psychci Terrain.",
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
		shortDesc: "Holder is immune to powder moves and damage from Sandstorm or Hail. The accuracy of attacks by the holder is 1.2x.",
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
		shortDesc: "If this Pokemon is targeted by a priority move, the move fails and the attacker is forced to switch out. Single-use.",
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
		shortDesc: "If the holder is a Psychic-type, its super effective moves deal 1.3x damage. If the holder is not a Psychic-type, its super effective moves deal 0.67x damage.",
	},
	utilityumbrella: {
		inherit: true,
		desc: "The holder ignores rain- and sun-based effects. Damage and accuracy calculations from attacks used by the holder are affected by rain and sun, but not attacks used against the holder. The holder takes 3/4 damage and ignores secondary effects while in weathers or terrains.",
		shortDesc: "The holder ignores rain- and sun-based effects. Takes 3/4 damages and ignore secondary effects while in weathers or terrains.",
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
		boosts: {
			spa: 1,
		},
		shortDesc: "Holder is immune to Ground-type attacks. Pops when holder is hit and raises Special Attack by 1.", 
	},
	absorbbulb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (move.type === 'Water') {
				target.useItem();
				return null;
			}
		},
		shortDesc: "Holder is immune to Water-type attacks. Pops when holder is hit and raises Special Attack by 1.", 
	},
	cellbattery: {
		inherit: true,
		onTryHit(target, source, move) {
			if (move.type === 'Electric') {
				target.useItem();
				return null;
			}
		},
		shortDesc: "Holder is immune to Electric-type attacks. Pops when holder is hit and raises Attack by 1.", 
	},
	snowball: {
		inherit: true,
		onTryHit(target, source, move) {
			if (move.type === 'Ice') {
				target.useItem();
				return null;
			}
		},
		shortDesc: "Holder is immune to Ice-type attacks. Pops when holder is hit and raises Attack by 1.", 
	},
	indecisiveorb: {
		name: "Indecisive Orb",
		fling: {
			basePower: 30,
		},
		onDisableMove: function(pokemon) {
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
		shortDesc: "Holder may switch out even when trapped by another Pokemon, or by Ingrain. If the holder of this item is targeted by Pursuit as they switch out, the move fails and this item is consumed.",
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
};
