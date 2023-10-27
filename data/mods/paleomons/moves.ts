export const Moves: {[moveid: string]: MoveData} = {
	bloodstream: {
		num: 202,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Blood Stream",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	stormsurge: {
		num: 874,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Storm Surge",
		shortDesc: "Lowers the user's SpA by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Beautiful",
	},
	decibloom: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Decibloom",
		shortDesc: "30% chance to raise the user's Special Attack by 1.",
		pp: 80,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Grass",
	},
	draconicrend: {
		accuracy: 100,
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched) {
				this.debug('Draconic Rend damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Draconic Rend NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "If a foe is switching in, hits it at 1.5x power.",
		name: "Draconic Rend",
		pp: 15,
		priority: 0,
		flags: {contact: 1, bite: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Fishious Rend", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	petroglyph: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Petroglyph",
		shortDesc: "50% chance to raise the user's Special Attack by 1 stage.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Paleo Wave", target);
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
	},
	trashcompactor: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Trash Compactor",
		shortDesc: "Restores 25% of the user's max HP. If hazards are active on the user's side of the field, instead restores 50% of the user's max HP.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Recover", target);
		},
		onHit(pokemon) {
			let factor = 0.25;
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			console.log(pokemon.side);
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Poison",
	},
};
