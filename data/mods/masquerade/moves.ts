export const Moves: {[k: string]: ModdedMoveData} = {
  dazzlinggleam: {
		num: 605,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Dazzling Gleam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Gardevoir-Sandshroud': case 'Gardevoir-Sandshroud-Tera':
				move.type = 'Ground';
				break;
			case 'Gardevoir-Blightbent': case 'Gardevoir-Blightbent-Tera':
				move.type = 'Poison';
				break;
			case 'Gardevoir-All-Ice': case 'Gardevoir-All-Ice-Tera':
				move.type = 'Ice';
				break;
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Beautiful",
	},
	drillpeck: {
		num: 65,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Drill Peck",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Corviknight-Burrowing': case 'Corviknight-Burrowing-Tera':
				move.type = 'Ground';
				break;
			case 'Corviknight-Jet': case 'Corviknight-Jet-Tera':
				move.type = 'Fighting';
				break;
			}
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	hypervoice: {
		num: 304,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Hyper Voice",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Arboliva-Pondweed': case 'Arboliva-Pondweed-Tera':
				move.type = 'Water';
				break;
			case 'Arboliva-Sundew': case 'Arboliva-Sundew-Tera':
				move.type = 'Poison';
				break;
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Cool",
	},
	bodypress: {
		num: 776,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Body Press",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Chesnaught-Armored': case 'Chesnaught-Armored-Tera':
				move.type = 'Steel';
				break;
			}
		},
		overrideOffensiveStat: 'def',
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	liquidation: {
		num: 710,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Liquidation",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Swampert-Lakelurker': case 'Swampert-Lakelurker-Tera':
				move.type = 'Dragon';
				break;
			}
		},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	futuresight: {
		num: 248,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Future Sight",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'futuresight',
				source: source,
				moveData: {
					id: 'futuresight',
					name: "Future Sight",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, futuremove: 1},
      		onModifyType(move, pokemon) {
      			switch (pokemon.species.name) {
      			case 'Delphox-Oracle': case 'Delphox-Oracle-Tera':
      				move.type = 'Fairy';
      				break;
      			}
      		},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Psychic',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return this.NOT_FAIL;
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Delphox-Oracle': case 'Delphox-Oracle-Tera':
				move.type = 'Fairy';
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	drainingtusk: {
		accuracy: 90,
		basePower: 120,
		shortDesc: "Heals the user by 25% of the damage dealt.",
		viable: true,
		category: "Physical",
		name: "Draining Tusk",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Horn Leech", target);
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Emboar-Storm': case 'Emboar-Storm-Tera':
				move.type = 'Electric';
				break;
			case 'Emboar-Metal': case 'Emboar-Metal-Tera':
				move.type = 'Steel';
				break;
			case 'Emboar-Frostbite': case 'Emboar-Frostbite-Tera':
				move.type = 'Ice';
				break;
			}
		},
		drain: [1, 4],
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	powerblitz: {
		accuracy: 100,
		basePower: 100,
		shortDesc: "Raises user's Attack by 1 if this KOes the target.",
		category: "Physical",
		name: "Power Blitz",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Boltund-Lights': case 'Boltund-Lights-Tera':
				move.type = 'Fairy';
				break;
			case 'Boltund-Crash': case 'Boltund-Crash-Tera':
				move.type = 'Fighting';
				break;
			case 'Boltund-Cold': case 'Boltund-Cold-Tera':
				move.type = 'Ice';
				break;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 1}, pokemon, pokemon, move);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
};
