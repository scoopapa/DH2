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
	doubledose: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Hits twice. 20% chance to poison. Doubles: Tries to hit each foe once.",
		name: "Double Dose",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, noparentalbond: 1},
		multihit: 2,
		smartTarget: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Darts", target);
			this.add('-anim', source, "Corrosive Gas", target);
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Drapion-Dragonblade': case 'Drapion-Dragonblade-Tera':
				move.type = 'Dragon';
				break;
			case 'Drapion-Hydroscythe': case 'Drapion-Hydroscythe-Tera':
				move.type = 'Water';
				break;
			case 'Drapion-Wispaxe': case 'Drapion-Wispaxe-Tera':
				move.type = 'Ghost';
				break;
			}
		},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		maxMove: {basePower: 130},
	},
	bulldoze: {
		num: 523,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Bulldoze",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Flygon-Lionheart': case 'Flygon-Lionheart-Tera':
				move.type = 'Bug';
				break;
			case 'Flygon-Cicadasong': case 'Flygon-Cicadasong-Tera':
				move.type = 'Ghost';
				break;
			case 'Flygon-Beetlestone': case 'Flygon-Beetlestone-Tera':
				move.type = 'Rock';
				break;
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacent",
		type: "Ground",
		contestType: "Tough",
	},
	securelanding: {
		num: 355,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals 50% HP. Secondary type removed 'til turn ends.",
		name: "Secure Landing",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		self: {
			volatileStatus: 'securelanding',
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Drifblim-Hot-Headed': case 'Drifblim-Hot-Headed-Tera':
				move.type = 'Fire';
				break;
			case 'Drifblim-Calmed': case 'Drifblim-Calmed-Tera':
				move.type = 'Water';
				break;
			case 'Drifblim-Noxious': case 'Drifblim-Noxious-Tera':
				move.type = 'Poison';
				break;
			}
		},
		condition: {
			duration: 1,
			onResidualOrder: 25,
			onStart(target) {
				let moveType = target.types[1]
				if (!target.terastallized) {
					this.add('-singleturn', target, 'move: Secure Landing');
				} else if (target.terastallized === "moveType") {
					this.add('-hint', "If a Flying Terastallized Pokemon uses Roost, it remains Flying-type. Same effect applies to Secure Landing.");
				}
			},
			onTypePriority: -1,
			onType(types, pokemon) {
				let moveType = target.types[1]
				this.effectState.typeWas = types;
				return types.filter(type => type !== 'moveType');
			},
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	stoneaxe: {
		num: 830,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('stealthrock');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('stealthrock');
				}
			}
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Kleavor-Arrowedge': case 'Kleavor-Arrowedge-Tera':
				move.type = 'Flying';
				break;
			case 'Kleavor-Galenahead': case 'Kleavor-Galenahead-Tera':
				move.type = 'Poison';
				break;
			case 'Kleavor-Expertblade': case 'Kleavor-Expertblade-Tera':
				move.type = 'Normal';
				break;
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Rock",
	},

// unchanged moves
	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					if (source.hasAbility('residuecleaning')) {
						this.heal(source.maxhp / 4, source, source, move);
					}
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					if (source.hasAbility('residuecleaning')) {
						this.heal(source.maxhp / 4, source, source, move);
					}
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	teraused: {
		shortDesc: "Prevents Terastalization from being used multiple times.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tera Used",
		pp: 5,
		priority: 0,
		flags: {},
		sideCondition: 'teraused',
		condition: {},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
};
