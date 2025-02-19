/*
List of flags and their descriptions:
authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability.
bullet: Has no effect on Pokemon with the Bulletproof Ability.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Magic Bounce Ability.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Soundproof Ability.
*/

export const Moves: {[k: string]: ModdedMoveData} = {
	luigilogic: {
		num: -1,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Luigi Logic",
		shortDesc: "Disables target's ability and previous move choice.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
		volatileStatus: 'luigilogic',
		onTryHit(target) {
			// If both ability suppression & and move disabling aren't possible (cannot stack with disable)
			if ((target.getAbility().flags['cantsuppress'] || target.volatiles['gastroacid'] || target.hasItem('Ability Shield'))
          && (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === 'struggle' || target.volatiles['disable'] )) {
				if (target.hasItem('Ability Shield')) {
				  this.add('-block', target, 'item: Ability Shield');
				}
				this.hint("Luigi Logic will fail if it is both impossible to suppress ability & disable the last used move.");
				return false;
			}
		},
		onHit(target) {
			// Ability suppression
			if (!target.getAbility().flags['cantsuppress'] && !target.volatiles['gastroacid'] && !target.hasItem('Ability Shield')) {
			target.addVolatile('gastroacid');
			}
			else if(target.hasItem('Ability Shield')) {
				this.add('-block', target, 'item: Ability Shield');
			}
			// Move disable
			if (target.lastMove && !target.lastMove.isZ && !target.lastMove.isMax && !target.lastMove.id === 'struggle' && !target.volatiles['disable']) {
				target.addVolatile('disable');
			}
	  },
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nasty Plot", source);
			this.add('-anim', source, "Flash", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
  },
	linkinglighthouselaunch: {
		num: -2,
		accuracy: true,
		basePower: 175,
		category: "Special",
		name: "Linking Lighthouse Launch",
		shortDesc: "50% chance to burn, paralyze, or freeze.",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mountain Gale", target);
			this.add('-anim', source, "Fusion Flare", target);
			this.add('-anim', source, "Stoked Sparksurfer", target);
		},
		isZ: "bondiumz",
		secondary:  {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
  },
	froggybravesthewindandrain: {
		num: -3,
		accuracy: true,
		basePower: 180,
		category: "Special",
		name: "Froggy Braves the Wind and Rain",
		shortDesc: "Sets rain.",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
			this.add('-anim', source, "Whirlpool", target);
		},
		isZ: "suwakiumz",
		self: {
			onHit(source) {
				this.field.setWeather('raindance');
			},
		},
	  	target: "normal",
	  	type: "Normal",
		contestType: "Cute",
	},
};
