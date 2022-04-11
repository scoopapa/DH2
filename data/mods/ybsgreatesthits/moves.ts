export const Moves: {[moveid: string]: ModdedMoveData} = {
	rockout: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
   shortDesc: "Ignores the Abilities of other Pokemon.",
		isViable: true,
		name: "Rock Out",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Rock Polish", target);
		  this.add('-anim', source, "Hyper Voice", target);
		},
		ignoreAbility: true,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Rock",
	},
	chloroscythe: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
   shortDesc: "Charges and lowers the user's Attack by 1 on Turn 1, Attacks and lowers the user Attack by 1 on Turn 2.",
		isViable: true,
		name: "Chloroscythe",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, contact: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Solar Blade", target);
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: -1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: -1,
				},
			},
		},		
    target: "normal",
		type: "Grass",
	},
};
