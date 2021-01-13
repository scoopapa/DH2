/*
Ratings and how they work:
-2: Extremely detrimental
	  The sort of ability that relegates Pokemon with Uber-level BSTs into NU.
	ex. Slow Start, Truant
-1: Detrimental
	  An ability that does more harm than good.
	ex. Defeatist, Normalize
 0: Useless
	  An ability with no net effect during a singles battle.
	ex. Healer, Illuminate
 1: Ineffective
	  An ability that has a minimal effect. Should not be chosen over any other ability.
	ex. Damp, Shell Armor
 2: Situationally useful
	  An ability that can be useful in certain situations.
	ex. Blaze, Insomnia
 3: Useful
	  An ability that is generally useful.
	ex. Infiltrator, Sturdy
 4: Very useful
	  One of the most popular abilities. The difference between 3 and 4 can be ambiguous.
	ex. Protean, Regenerator
 5: Essential
	  The sort of ability that defines metagames.
	ex. Desolate Land, Shadow Tag
*/

'use strict';

exports.BattleAbilities = {
	innovate: {
		id: 'innovate',
		name: 'Innovate',
		desc: "This Pokemon attacks from their Attack stat when it is higher than their Special Attack stat and vice versa.",
		shortDesc: "This Pokemon always attacks of its highest attacking stat.",
		onStart: function(pokemon) {
			if(pokemon.calculateStat("spa",pokemon.boosts.spa) > pokemon.calculateStat("atk",pokemon.boosts.atk)) {
				this.add('-activate', pokemon, 'ability: Innovate');
				this.add('-formechange', pokemon, 'Infineer-spc', '[msg]');
				pokemon.formeChange('Infineer-spc');
				pokemon.forme = "Special";
				this.add('-start', pokemon, "Special", '[silent]');
				return;
			}
			pokemon.forme = "Physical";
		},
		onModifyMove: function(move, pokemon) {
			if(move.category === "Status") return;
			move.category = pokemon.forme || "Physical";
		},
		onBoost: function(boost, pokemon) {
			if(pokemon.calculateStat("spa",pokemon.boosts.spa+(boost.spa||0)) > pokemon.calculateStat("atk",pokemon.boosts.atk+(boost.atk||0))) {
				this.add('-activate', pokemon, 'ability: Innovate');
				this.add('-formechange', pokemon, 'Infineer-spc', '[msg]');
				pokemon.formeChange('Infineer-spc');
				pokemon.forme = "Special";
				this.add('-start', pokemon, "Special", '[silent]');
				return;
			}
			if(pokemon.calculateStat("spa",pokemon.boosts.spa+(boost.spa||0)) < pokemon.calculateStat("atk",pokemon.boosts.atk+(boost.atk||0))) {
				this.add('-activate', pokemon, 'ability: Innovate');
				this.add('-formechange', pokemon, 'Infineer', '[msg]');
				pokemon.formeChange('Infineer');
				pokemon.forme = "Physical";
				this.add('-start', pokemon, "Physical", '[silent]');
				return;
			}
		}
	},
	"fireresistance": {
		desc: "This Pokemon cannot be burned. This Pokemon only takes 3/4 damage from Fire-type attacks. Gaining this ability while burned cures it.",
		shortDesc: "This Pokemon cannont be burned and takes 3/4 damage from opposing Fire-type attacks.",
		onBasePowerPriority: 7,
		onSourceBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.75);
			}
		},
		onUpdate: function (pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Magma Armor');
				pokemon.cureStatus();
			}
		},
		id: "fireresistance",
		name: "Fire Resistance",
		rating: 4,
		num: 10001,
	}, 
	"Comeback": {
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Attack and Speed are raised by 2 stages. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect.",
		shortDesc: "When the user reaches 33% HP or less, their speed and attack are doubled.",
		onAfterMoveSecondary: function (target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			if (target.hp <= target.maxhp / 2 && target.hp + move.totalDamage > target.maxhp / 3) {
				this.boost({spe: 2});
				this.boost({atk: 2});
			}
		},
		id: "comeback",
		name: "Comeback",
		rating: 2.5,
		num: 201,
	},
	"fightingstance": {
		desc: "This Pokemon's Defense is raised by 1 stage each time they come into contact with the target Pokemon.",
		shortDesc: "This Pokemon's Defense is raised by 1 stage when making Contact with the target.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				this.boost({def: 1});
			}
		},
		id: "fightingstance",
		name: "Fighting Stance",
		rating: 3,
		num: 89,
	},
	"absorption": {
		shortDesc: "This Pokemon heals 1/5 of their max HP when hit by a Contact move.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.flags['contact']) {
				if (!this.heal(target.maxhp / 5)) {
				}
				return null;
			}
		},
		id: "absorption",
		name: "Absorption",
		rating: 3.5,
		num: 11,
	},
};
