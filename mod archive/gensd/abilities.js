'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
	"quickflash": {
		shortDesc: "If this Pokemon is at more than 50% HP, its Light-type moves have their priority increased by 1.",
		onModifyPriority: function(priority, pokemon, target, move) {
			if (move && move.type === 'Light' && pokemon.hp > pokemon.maxhp / 2) return priority + 1;
		},
		id: "quickflash",
		name: "Quick Flash",
		rating: 3,
		num: 177,
	},

	"lightabsorb": {
		desc: "This Pokemon is immune to Light-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Light-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Light moves; Light immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Light') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Light Absorb');
				}
				return null;
			}
		},
		id: "lightabsorb",
		name: "Light Absorb",
		rating: 3.5,
		num: 11,
	},

	"cacophony": {
		desc: "This Pokemon's sound-based attacks have their power multiplied by 1.33.",
		shortDesc: "This Pokemon's sound-based attacks have 1.33x power.",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Cacophony boost');
				return this.chainModify([0x1547, 0x1000]);
			}
		},
		id: "cacophony",
		name: "Cacophony",
		rating: 3,
		num: 89,
	},

	"relaxed": {
		shortDesc: "This Pokemon's Sp. Defense is raised 2 stages after it is damaged by a Sound-type move.",
		onAfterDamage: function(damage, target, source, effect) {
			if (effect && effect.type === 'Sound') {
				this.boost({
					spd: 2
				});
			}
		},
		id: "relaxed",
		name: "Relaxed",
		rating: 2,
		num: 195,
	},

	"harmonize": {
		desc: "This Pokemon's Normal-type moves become Sound-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Sound type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Sound';
				move.harmonizeBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, pokemon, target, move) {
			if (move.harmonizeBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "harmonize",
		name: "Harmonize",
		rating: 4,
		num: 185,
	},

	"gormandize": {
		desc: "This Pokemon's Normal-type moves become Food-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Food type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Food';
				move.gormandizeBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, pokemon, target, move) {
			if (move.gormandizeBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "gormandize",
		name: "Gormandize",
		rating: 4,
		num: 185,
	},

	"greedyeater": {
		desc: "This Pokemon is immune to Food-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Food-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Food moves; Food immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Food') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Greedy Eater');
				}
				return null;
			}
		},
		id: "greedyeater",
		name: "Greedy Eater",
		rating: 3.5,
		num: 11,
	},

	"violate": {
		desc: "This Pokemon's Normal-type moves become Blood-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Blood type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Blood';
				move.violateBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, pokemon, target, move) {
			if (move.violateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "violate",
		name: "Violate",
		rating: 4,
		num: 185,
	},

	"peaceful": {
		desc: "This Pokemon is immune to Blood-type moves and raises its Accuracy by 2 stages when hit by a Blood-type move.",
		shortDesc: "This Pokemon's Accuracy is raised 2 stages if hit by a Blood move; Blood immunity.",
		onTryHitPriority: 1,
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Blood') {
				if (!this.boost({
						accuracy: 2
					})) {
					this.add('-immune', target, '[msg]', '[from] ability: Peaceful');
				}
				return null;
			}
		},
		onAllyTryHitSide: function(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Blood') {
				this.boost({
					atk: 1
				}, this.effectData.target);
			}
		},
		id: "peaceful",
		name: "Peaceful",
		rating: 3.5,
		num: 157,
	},

	"herbivore": {
		desc: "If a Pokemon uses a Grass- or Food-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon.",
		shortDesc: "Grass/Food-type moves against this Pokemon deal damage with a halved attacking stat.",
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Grass' || move.type === 'Food') {
				this.debug('Herbivore weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Grass' || move.type === 'Food') {
				this.debug('Herbivore weaken');
				return this.chainModify(0.5);
			}
		},
		id: "herbivore",
		name: "Herbivore",
		rating: 3.5,
		num: 47,
	},

	"predatory": {
		desc: "This Pokemon's drain-based attacks have their power multiplied by 1.33.",
		shortDesc: "This Pokemon's drain-based attacks have 1.33x power.",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.flags['heal']) {
				this.debug('Predatory boost');
				return this.chainModify([0x1547, 0x1000]);
			}
		},
		id: "predatory",
		name: "Predatory",
		rating: 3,
		num: 89,
	},

	"gammaheal": {
		desc: "The user's HP is recovered by 25% if it knocked an opponent out.",
		shortDesc: "The user's HP is recovered by 25% if it knocked an opponent out.",
		onSourceFaint: function(target, source, effect) {
			this.heal(pokemon.maxhp / 4);
		},
		id: "gammaheal",
		name: "Gamma Heal",
		rating: 3.5,
		num: 224,
	},

	/*"battlearmor": {
		shortDesc: "This Pokemon cannot be struck by a critical hit.",
		onCriticalHit: false,

		if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		id: "battlearmor",
		name: "Battle Armor",
		rating: 1,
		num: 4,
	},*/

	"berserk": {
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Special Attack is raised by 2 stages. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect.",
		shortDesc: "This Pokemon's Sp. Atk is raised by 2 when it reaches 1/2 or less of its max HP.",
		onAfterMoveSecondary: function(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			if (target.hp <= target.maxhp / 2 && target.hp + move.totalDamage > target.maxhp / 2) {
				this.boost({
					spa: 2
				});
			}
		},
		id: "berserk",
		name: "Berserk",
		rating: 2.5,
		num: 201,
	},

	"blaze": {
		desc: "When this Pokemon has 1/2 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
		shortDesc: "At 1/2 or less of its max HP, this Pokemon's attacking stat is 1.5x with Fire attacks.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		id: "blaze",
		name: "Blaze",
		rating: 2,
		num: 66,
	},

	"overgrow": {
		desc: "When this Pokemon has 1/2 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Grass-type attack.",
		shortDesc: "At 1/2 or less of its max HP, this Pokemon's attacking stat is 1.5x with Grass attacks.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		id: "overgrow",
		name: "Overgrow",
		rating: 2,
		num: 65,
	},

	"torrent": {
		desc: "When this Pokemon has 1/2 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Water-type attack.",
		shortDesc: "At 1/2 or less of its max HP, this Pokemon's attacking stat is 1.5x with Water attacks.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		id: "torrent",
		name: "Torrent",
		rating: 2,
		num: 67,
	},

	"swarm": {
		desc: "When this Pokemon has 1/2 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Bug-type attack.",
		shortDesc: "At 1/2 or less of its max HP, this Pokemon's attacking stat is 1.5x with Bug attacks.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		id: "swarm",
		name: "Swarm",
		rating: 2,
		num: 68,
	},

	"defeatist": {
		desc: "While this Pokemon has 1/3 or less of its maximum HP, its Attack and Special Attack are 0.75.",
		shortDesc: "While this Pokemon has 1/3 or less of its max HP, its Attack and Sp. Atk are 0.75.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3) {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3) {
				return this.chainModify(0.75);
			}
		},
		id: "defeatist",
		name: "Defeatist",
		rating: -1,
		num: 129,
	},

	onModifyAtkPriority: 5,
	onModifyAtk: function(atk, attacker, defender, move) {
		if (move.type === 'Grass') {
			this.debug('Flower Veil boost');
			return this.chainModify(1.5);
		}
	},
	onModifySpAPriority: 5,
	onModifySpA: function(atk, attacker, defender, move) {
		if (move.type === 'Grass') {
			this.debug('Flower Veil boost');
			return this.chainModify(1.5);
		}
	},


	"flowerveil": {
		desc: "Grass-type Pokemon on this Pokemon's side cannot have their stat stages lowered by other Pokemon or have a major status condition inflicted on them by other Pokemon. Grass type moves have 1.5x power",
		shortDesc: "This side's Grass types can't have stats lowered or status inflicted by other Pokemon.",
		onAllyBoost: function(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Grass')) return;
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add('-fail', this.effectData.target, 'unboost', '[from] ability: Flower Veil', '[of] ' + target);
		},
		onAllySetStatus: function(status, target, source, effect) {
			if (target.hasType('Grass')) {
				if (!effect || !effect.status) return false;
				this.add('-activate', this.effectData.target, 'ability: Flower Veil', '[of] ' + target);
				return null;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Flower Veil boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Flower Veil boost');
				return this.chainModify(1.5);
			}
		},
		id: "flowerveil",
		name: "Flower Veil",
		rating: 0,
		num: 166,
	},

	onStart: function(pokemon) {
		for (const target of pokemon.side.foe.active) {
			if (!target || target.fainted) continue;
			if (target.item) {
				this.add('-item', target, target.getItem().name, '[from] ability: Frisk', '[of] ' + pokemon, '[identify]');
			}
		}
	},

	"forewarn": {
		desc: "On switch-in, this Pokemon is alerted to the move with the highest power, at random, known by an opposing Pokemon. ",
		shortDesc: "On switch-in, this Pokemon is alerted to the foes' move with the highest power, ability, and item.",
		onStart: function(pokemon) {
			/**@type {(Move|Pokemon)[][]} */
			let warnMoves = [];
			let warnBp = 1;
			for (const target of pokemon.side.foe.active) {
				if (target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					let move = this.getMove(moveSlot.move);
					let bp = move.basePower;
					if (move.ohko) bp = 160;
					if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					if (!bp && move.category !== 'Status') bp = 80;
					if (bp > warnBp) {
						warnMoves = [
							[move, target]
						];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, target]);
					}
				}
			}
			if (!warnMoves.length) return;
			const [warnMoveName, warnTarget] = this.sample(warnMoves);
			this.add('-activate', pokemon, 'ability: Forewarn', warnMoveName, '[of] ' + warnTarget);
		},
		onStart: function(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Frisk', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		onStart: function(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.ability) {
					this.add('-ability', target, target.getAbility().name, '[from] ability: Frisk', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		id: "forewarn",
		name: "Forewarn",
		rating: 1,
		num: 108,
	},

	"galewings": {
		shortDesc: "If this Pokemon is at more than 50% HP, its Flying-type moves have their priority increased by 1.",
		onModifyPriority: function(priority, pokemon, target, move) {
			if (move && move.type === 'Flying' && pokemon.hp <= pokemon.maxhp / 2) return priority + 1;
		},
		id: "galewings",
		name: "Gale Wings",
		rating: 3,
		num: 177,
	},

	"gooey": {
		desc: "If Rain is active, this Pokemon's Def is multiplied by 1.5.",
		shortDesc: "If Rain is active, this Pokemon's Def is 1.5x.",
		onModifySpAPriority: 5,
		onModifySpA: function(def, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		id: "gooey",
		name: "Gooey",
		rating: 1.5,
		num: 94,
	},

	"heatproof": {
		desc: "This Pokemon is immune to Fire-type moves and raises its Sp. Def by 1 stage when hit by a Fire-type move.",
		shortDesc: "This Pokemon's Sp. Def is raised 1 stage if hit by a Fire move; Fire immunity.",
		onTryHitPriority: 1,
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({
						spd: 1
					})) {
					this.add('-immune', target, '[msg]', '[from] ability: Heatproof');
				}
				return null;
			}
		},
		onAllyTryHitSide: function(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Fire') {
				this.boost({
					spd: 1
				}, this.effectData.target);
			}
		},
		id: "heatproof",
		name: "Heatproof",
		rating: 3.5,
		num: 157,
	},

	"icebody": {
		desc: "If Hail is active, this Pokemon restores 1/8 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no damage from Hail.",
		shortDesc: "If Hail is active, this Pokemon heals 1/8 of its max HP each turn; immunity to Hail.",
		onWeather: function(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.maxhp / 8);
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'hail') return false;
		},
		id: "icebody",
		name: "Ice Body",
		rating: 1.5,
		num: 115,
	},
	"raindish": {
		desc: "If Rain Dance is active, this Pokemon restores 1/8 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Rain Dance is active, this Pokemon heals 1/8 of its max HP each turn.",
		onWeather: function(target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 8);
			}
		},
		id: "raindish",
		name: "Rain Dish",
		rating: 1.5,
		num: 44,
	},

	"illuminate": {
		desc: "This Pokemon's Normal-type moves become Light-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Light type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Light';
				move.illuminateBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, pokemon, target, move) {
			if (move.illuminateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "illuminate",
		name: "Illuminate",
		rating: 4,
		num: 182,
	},

	"immunity": {
		desc: "This Pokemon is immune to Poison-type moves and raises its Def by 1 stage when hit by a Grass-type move.",
		shortDesc: "This Pokemon's Def is raised 1 stage if hit by a Poison move; Poison immunity.",
		onTryHitPriority: 1,
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				if (!this.boost({
						def: 1
					})) {
					this.add('-immune', target, '[msg]', '[from] ability: Immunity');
				}
				return null;
			}
		},
		onAllyTryHitSide: function(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Poison') {
				this.boost({
					def: 1
				}, this.effectData.target);
			}
		},
		id: "immunity",
		name: "Immunity",
		rating: 3.5,
		num: 157,
	},

	"justified": {
		desc: "This Pokemon is immune to Dark-type moves and raises its Attack by 1 stage when hit by a Dark-type move.",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Dark move; Dark immunity.",
		onTryHitPriority: 1,
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.boost({
						atk: 1
					})) {
					this.add('-immune', target, '[msg]', '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		onAllyTryHitSide: function(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Dark') {
				this.boost({
					atk: 1
				}, this.effectData.target);
			}
		},
		id: "justified",
		name: "Justified",
		rating: 3.5,
		num: 157,
	},

};

