export const Moves: { [moveid: string]: ModdedMoveData } = {
	worryseed: {
		inherit: true,
		basePower: 80,
		category: "Physical",
		pp: 15,
	},
	milkdrink: {
		inherit: true,
		pp: 10,
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	roost: {
		inherit: true,
		pp: 10,
	},
	shoreup: {
		inherit: true,
		pp: 10,
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	lunarblessing: {
		inherit: true,
		pp: 10,
	},
	pebblestorm: {
		num: -1,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Pebble Storm",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
			this.add('-anim', source, "Hurricane", target);
		},
		onModifyPriority(priority, source, target, move) {
			if (this.field.isWeather('sandstorm')) {
				return priority + 1;
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
		desc: "If the current weather is Sandstorm, this move has its priority increased by 1.",
		shortDesc: "User on Sandstorm: +1 priority.",
	},
	salvestrike: {
		num: -2,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Salve Strike",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aromatherapy", source);
			this.add('-anim', source, "Double-Edge", target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) pokemon.cureStatus();;
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
		desc: "Heals the user's status if this move knocks out the target.",
		shortDesc: "Heals the user's status if this KOes the target.",
	},
};
