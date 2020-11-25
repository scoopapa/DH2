"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Abilities = {
	"hunger": {
		desc: "If this Pokemon loses its held item for any reason, its Speed is doubled. This boost is lost if it switches out or gains a new item or Ability.",
		shortDesc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",
		onStart: function (item, pokemon) {
			if (pokemon !== this.effectData.target) return;
			pokemon.addVolatile('hunger');
		},
		onEatItem: function (item, pokemon) {
			this.addVolatile('hunger');
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('hunger');
		},
		effect: {
			duration: 4,
			onResidual: function (pokemon) {
				this.heal(pokemon.maxhp / 8);
			},
		},
		onResidual: function (pokemon) {
			if (!pokemon.volatiles['hunger']) {
			this.damage(pokemon.maxhp / 16);
			}
		},
		id: "hunger",
		name: "Hunger",
		rating: 3.5,
		num: 84,
	},
	"miner": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Rock-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Miner boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Miner boost');
				return this.chainModify(1.5);
			}
		},
		id: "miner",
		name: "Miner",
		rating: 3,
		num: 200,
	},
	"unbreakable": {
		desc: "This Pokemon is immune to punch moves.",
		shortDesc: "Makes user immune to punch moves",
		onTryHit: function (pokemon, target, move) {
			if (move.flags['punch']) {
				this.add('-immune', pokemon, '[from] ability: Unbreakable');
				return null;
			}
		},
		id: "unbreakable",
		name: "Unbreakable",
		rating: 3.5,
		num: 171,
	},
	"sharkbait": {
		desc: "Prevents adjacent opposing Steel-type Pokemon from choosing to switch out unless they are immune to trapping.",
		shortDesc: "Prevents adjacent Water-type foes from choosing to switch.",
		onFoeTrapPokemon: function (pokemon) {
			if (pokemon.hasType('Water') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			if ((!pokemon.knownType || pokemon.hasType('Water')) && this.isAdjacent(pokemon, source)) {
				pokemon.maybeTrapped = true;
			}
		},
		id: "sharkbait",
		name: "Sharkbait",
		rating: 4.5,
		num: 42,
	},
	"justifiedcfm": {
		desc: "This Pokemon's attacking stat is doubled while using a Water-type attack. If a Pokemon uses a Fire-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
		shortDesc: "If the user is hit by a Dark-type move, the damage is halved and the user's higher attacking stat raises by one stage.",
		onModifyAtkPriority: 5,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				return this.chainModify(0.5);
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.type === 'Dark') {
				if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
					this.boost({atk: 1});
				} else {
					this.boost({spa: 1})
				}
			}
		},
		id: "justifiedcfm",
		name: "Justified-CFM",
		rating: 4,
		num: 199,
	},
	"diamondarmor": {
		desc: "This Pokemon receives 3/4 damage from supereffective attacks. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "This Pokemon receives 3/4 damage from supereffective attacks and is immune to Pressure.",
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Diamond Armor neutralize');
				return this.chainModify(0.75);
			}
		},
		isUnbreakable: true,
		id: "diamondarmor",
		name: "Diamond Armor",
		rating: 3,
		num: 232,
	},
	"levipoison": {
		desc: "This Pokemon is immune to Electric-type moves and restores 1/4 of its maximum HP, rounded down, when hit by an Electric-type move.",
		shortDesc: "This Pokemon poisons the foe when hit by Ground moves; Ground immunity.",
		onTryHit: function (target, source, move, pokemon) {
			if (target !== source && move.type === 'Ground') {
				if (!source.trySetStatus('tox', pokemon)) {
					this.add('-immune', target, '[from] ability: Levipoison');
				}
				return null;
			}
		},
		id: "levipoison",
		name: "Levipoison",
		rating: 3.5,
		num: 10,
	},
	"dewdrink": {
		desc: "This Pokemon is immune to Water-type moves and raises its Attack by 1 stage when hit by a Water-type move.",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Water move; Water immunity.",
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Dew Drink');
				}
				return null;
			}
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Water') {
				this.boost({atk: 1}, this.effectData.target);
			}
		},
		id: "dewdrink",
		name: "Dew Drink",
		rating: 3.5,
		num: 157,
	},
	"thickfatsylvemons": {
		desc: "If a Pokemon uses a Fire- or Ice-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon.",
		shortDesc: "Fire/Ice-type moves against this Pokemon deal damage with a halved attacking stat.",
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onUpdate: function (pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Thick Fat-Sylvemons');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'brn' || status.id !== 'frz') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] ability: Thick Fat-Sylvemons');
			return false;
		},
		onImmunity: function (type, pokemon) {
			if (type === 'hail') return false;
		},
		id: "thickfatsylvemons",
		name: "Thick Fat-Sylvemons",
		rating: 3.5,
		num: 47,
	},
	"dragonslayer": {
		desc: "If a Pokemon uses a Dragon-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon.",
		shortDesc: "The user deals double damage to Dragon-type Pokemon and takes half damage from Dragon-type attacks.",
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon Slayer weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon Slayer weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, target) {
			if (target.hasType('Dragon')) {
				this.debug('Dragon Slayer boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, target) {
			if (target.hasType('Dragon')) {
				this.debug('Dragon Slayer boost');
				return this.chainModify(2);
			}
		},
		id: "dragonslayer",
		name: "Dragon Slayer",
		rating: 3.5,
		num: 47,
	},
	"schooling": {
		desc: "On switch-in, if this Pokemon is a Wishiwashi that is level 20 or above and has more than 1/4 of its maximum HP left, it changes to School Form. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
		shortDesc: "If user is Wishiwashi, changes to School Form if it has > 1/4 max HP, else Solo Form.",
		onStart: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed) return;
			if ((pokemon.hp > pokemon.maxhp / 4) || (pokemon.hasItem('graduationscale'))) {
				if (pokemon.template.speciesid === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
					if (pokemon.hasItem('graduationscale')) {
						let oldAbility = pokemon.setAbility('intimidate', pokemon, 'intimidate', true);
						if (oldAbility) {
							this.add('-activate', pokemon, 'ability: Intimidate', oldAbility, '[of] ' + pokemon);
						}
					}
				}
			} else {
				if (pokemon.template.speciesid === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		onResidualOrder: 27,
		onResidual: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed || !pokemon.hp) return;
			if ((pokemon.hp > pokemon.maxhp / 4) || (pokemon.hasItem('graduationscale'))) {
				if (pokemon.template.speciesid === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
					if (pokemon.hasItem('graduationscale')) {
						let oldAbility = pokemon.setAbility('intimidate', pokemon, 'intimidate', true);
						if (oldAbility) {
							this.add('-activate', pokemon, 'ability: Intimidate', oldAbility, '[of] ' + pokemon);
						}
					}
				}
			} else {
				if (pokemon.template.speciesid === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		id: "schooling",
		name: "Schooling",
		rating: 3,
		num: 208,
	},
	"ultimatescout": {
		shortDesc: "On switch-in, this Pokemon identifies the held items of all opposing Pokemon.",
		onStart: function (pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', pokemon, target.getItem().name, '[from] ability: Ultimate Scout', '[of] ' + pokemon, '[identify]');
				}
			}
			if (this.activeMove && this.activeMove.id === 'skillswap') return;
			let target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				pokemon.transformInto(target, pokemon, this.getAbility('ultimatescout'));
			}
		},
		id: "ultimatescout",
		name: "Ultimate Scout",
		rating: 1.5,
		num: 119,
	},
	"battlebond": {
		desc: "If this Pokemon is a Greninja, it transforms into Ash-Greninja after knocking out a Pokemon. As Ash-Greninja, its Water Shuriken has 20 base power and always hits 3 times.",
		shortDesc: "After KOing a Pokemon: becomes Ash-Greninja, Water Shuriken: 20 power, hits 3x.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move' && source.template.speciesid === 'greninja' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Battle Bond');
				source.formeChange('Greninja-Ash', this.effect, true);
			}
		},
		onResidual: function (pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.flags['sound'] && pokemon.template.speciesid === 'chimecho' && pokemon.hp && !pokemon.transformed && pokemon.side.foe.pokemonLeft) {
				this.add('-activate', pokemon, 'ability: Battle Bond');
				pokemon.formeChange('Chimecho-James', this.effect, true);
				}
			},
		onModifyMovePriority: -1,
		onModifyMove: function (move, attacker) {
			if (move.id === 'watershuriken' && attacker.template.species === 'Greninja-Ash') {
				move.multihit = 3;
			}
		},
		id: "battlebond",
		name: "Battle Bond",
		rating: 3,
		num: 210,
	},
	"bloodsucker": {
		desc: "Adds 33% draining to all contact moves",
		shortDesc: "Adds 33% draining to all contact moves",
		onModifyMove: function (move) {
			if (move.flags['contact']) {
			move.drain = [1,3];
			}
		},
		id: "bloodsucker",
		name: "Bloodsucker",
	},
	"regalreversal": {
	shortDesc: "Super-effective attacks used against this Pokemon have their damage reduced by 25% and do 50% recoil to the user.",
	onSourceModifyDamage: function(damage, source, target, move) {
		if (move.typeMod > 0) {
			return this.chainModify(0.75);
			move.regalRecoil = true;
		}
	},
	onFoeModifyMove: function (move) {
			if (move.regalRecoil = true) {
				move.recoil = [1, 2];
			}
		},
    id: "regalreversal",
	name: "Regal Reversal",
	},
	"boxin": {
		desc: "If this Pokemon has a major status condition, its Defense is multiplied by 1.5.",
		shortDesc: "If this Pokemon is statused, its Defense/Sp. Def is 1.5x.",
		onModifyDefPriority: 6,
		onModifyDef: function (def, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		onModifySpD: function (spd, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		id: "boxin",
		name: "Box In",
		rating: 2.5,
		num: 63,
	},
	"blazesylvemons": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Fire attacks.",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Blaze-Sylvemons boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Blaze-Sylvemons boost');
				return this.chainModify(1.5);
			}
		},
		id: "blazesylvemons",
		name: "Blaze-Sylvemons",
		rating: 2,
		num: 66,
	},
	"sonar": {
		shortDesc: "This Pokemon is immune to sound-based moves, including Heal Bell.",
		onTryHit: function (target, source, move) {
			if (move.flags['sound'] || target !== source && move.type === 'Ground') {
				this.add('-immune', target, '[from] ability: S.O.N.A.R');
				return null;
			}
		},
		onAllyTryHitSide: function (target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectData.target, '[from] ability: S.O.N.A.R');
			}
		},
		id: "sonar",
		name: "S.O.N.A.R",
		rating: 2,
		num: 43,
	},
	"internalaura": {
		desc: "This Pokemon is immune to ballistic moves. Ballistic moves include Bullet Seed, Octazooka, Barrage, Rock Wrecker, Zap Cannon, Acid Spray, Aura Sphere, Focus Blast, and all moves with Ball or Bomb in their name.",
		shortDesc: "Makes user immune to ball, bomb, and pulse moves.",
		onTryHit: function (pokemon, target, move) {
			if (move.flags['bullet'] || move.flags['pulse']) {
				this.add('-immune', pokemon, '[from] ability: Internal Aura');
				return null;
			}
		},
		id: "internalaura",
		name: "Internal Aura",
		rating: 3.5,
		num: 171,
	},
}; exports.Abilities = Abilities;