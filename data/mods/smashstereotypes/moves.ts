export const Moves: {[moveid: string]: ModdedMoveData} = {
	allterrainblast: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Power doubles and type varies in each terrain.",
		id: "allterrainblast",
		name: "All-Terrain Blast",
		pp: 10,
		priority: 0,
		flags: {
			bullet: 1,
			protect: 1,
			mirror: 1
		},
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Weather Ball", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	leafage: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.species.id === 'shaymin') {
				return priority + 1;
			}
		},
	},
	shedleaves: {
 		  accuracy: true,
		  basePower: 0,
		  category: "Status",
		  shortDesc: "Removes the user's Grass-type, resets negative stat changes, and cures the user of status.",		
		  name: "Shed Leaves",
		  pp: 10,
		  priority: 0,
		  flags: {snatch: 1},
		  onTryMove(pokemon, target, move) {
			  if (pokemon.hasType('Grass')) return;
			  this.add('-fail', pokemon, 'move: Shed Leaves');
			  this.attrLastMove('[still]');
			  return null;
		  },		
		  onHit(pokemon) {
				if (['', 'slp', 'frz'].includes(pokemon.status)) return;
				pokemon.cureStatus();
		  },
		  self: {
			  onHit(pokemon) {
				const boosts: SparseBoostsTable = {};
				let i: BoostName;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[silent]');
				this.add('-message', pokemon.name + "'s negative stat changes were removed!");
				
				  pokemon.setType(pokemon.getTypes(true).map(type => type === "Grass" ? "???" : type));
				  this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Shed Leaves');
			  },
		  },
		  secondary: null,
		  target: "self",
		  type: "Grass",
		  zMove: {effect: 'heal'},
		  contestType: "Clever",
	},
	seedbomb: {
		inherit: true,
		secondary: {
			chance: 50,
			onHit(target, pokemon, move) {
				if (source.species.id === 'shaymin') {
					volatileStatus: 'leechseed',
				},
			},
		},
	},
};
