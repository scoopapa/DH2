export const Moves: {[k: string]: ModdedMoveData} = {
	nighttime: {
		num: -1001,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Nighttime",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "U-turn", target);
		},
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
	},
	dinnertime: {
		num: -1002,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dinnertime",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('playtime')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slack Off", target);
		},
		shortDesc: "User heals 1/2 max HP (2/3 if user has the ability Playtime).",
	},
	identitytheft: {
		num: -1003,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Identity Theft",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) pokemon.transformInto(target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spectral Thief", target);
		},
		shortDesc: "If this move causes a Pokémon to faint, the user transforms into the target.",
	},
	huntingdive: {
		num: -1004,
		name: "Hunting Dive",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dive", target);
		},
		shortDesc: "Super effective on Water.",
	},
	snowstorm: {
		num: -1005,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Snow Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
	},
};
