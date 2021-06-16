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
		  this.add('-anim', source, "Dazzling Gleam", target);
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
	lifeslight: {
		accuracy: 100,
		basePower: 90,
    shortDesc: "Heals the user's side by 50% of the user's max HP at the end of next turn",
		isViable: true,
		category: "Special",
		name: "Life's Light",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Solar Beam", target);
		  this.add('-anim', source, "Wish", target);
		},
		slotCondition: 'Wish',
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectData.hp = source.maxhp / 2;
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectData.hp, target, target);
					if (damage) this.add('-heal', target, target.getHealth, '[from] move: Lifes Light', '[wisher] ' + this.effectData.source.name);
				}
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Beautiful",
	},
	dawnofanewday: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dawn of a New Day",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "purenecroziumz",
		heal: [1, 1],
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Dawn of a New Day');
			const side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally !== source) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		contestType: "Beautiful",
	},
};
