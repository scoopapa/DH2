export const Moves: {[k: string]: ModdedMoveData} = {
	mindtap: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
    shortDesc: "User recovers 75% of the damage dealt.",
		isViable: true,
		name: "Mind Tap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Dream Eater", target);
		},
		drain: [3, 4],
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cute",
	},
	floralswirl: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
    shortDesc: "Cures the user's party of all status conditions.",
		isViable: true,
		name: "Floral Swirl",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Sparkly Swirl", target);
		},
		self: {
			onHit(pokemon, source, move) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
						continue;
					}
					ally.cureStatus();
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},
	psychodescent: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
    shortDesc: "Lowers the user's Speed by 1.",
		isViable: true,
		name: "Psycho Descent",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Psystrike", target);
		},
		selfBoost: {
			boosts: {
				spe: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		contestType: "Tough",
	},
};
