/* In the TO DO LIST
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

'use strict';

exports.BattleAbilities = {
delphoxbond": {
		desc: "If this Pokemon is a Delphox, it transforms into Merylin-Delphox after knocking out a Pokemon. As Merylin-Delphox, its Mystical Fire instead of lowering targets SpA by one stage, lowers its SpD by one stage.",
		shortDesc: "After KOing a Pokemon: becomes Merylin-Delphox, Mystical Fire lowers the target's SpD by 1 stage.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move' && source.template.speciesid === 'delphox' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Delphox Bond');
				let template = this.getTemplate('Delphox-Merylin');
				source.formeChange(template);
				source.baseTemplate = template;
				source.details = template.species + (source.level === 100 ? '' : ', L' + source.level) + (source.gender === '' ? '' : ', ' + source.gender) + (source.set.shiny ? ', shiny' : '');
				this.add('detailschange', source, source.details);
			}
		},
		onModifyMove: function (move, attacker) {
			if (move.id === 'mysticalfire' && attacker.template.species === 'Delphox-Merylin') {
				secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			}
			}
			}
			}
		id: "delphoxbond",
		name: "Delphox Bond",
		rating: 3,
		num: 210,
	},
  "chesnaughtbond": {
		desc: "If this Pokemon is a Delphox, it transforms into Merilyn-Delphox after knocking out a Pokemon. As Merilyn-Delphox, its Mystical Fire instead of lowering targets SpA by one stage, lowers its SpD by one stage.",
		shortDesc: "After KOing a Pokemon: becomes Merilyn-Delphox, Mystical Fire lowers the target's SpD by 1 stage.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move' && source.template.speciesid === 'delphox' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Chesnaught Bond');
				let template = this.getTemplate('Chesnaught-Clemont');
				source.formeChange(template);
				source.baseTemplate = template;
				source.details = template.species + (source.level === 100 ? '' : ', L' + source.level) + (source.gender === '' ? '' : ', ' + source.gender) + (source.set.shiny ? ', shiny' : '');
				this.add('detailschange', source, source.details);
			}
		},
		onModifyMove: function (move, attacker) {
			if (move.id === 'spikyshield' && attacker.template.species === 'Chesnaught-Clemont') {
				effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					this.damage(source.maxhp / 4, source, target);
				}
				return null;
			},
		},
		id: "chesnaughtbond",
		name: "Chesnaught Bond",
		rating: 3,
		num: 210,
	},
  };*/
