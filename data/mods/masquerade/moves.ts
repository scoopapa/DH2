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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bounce", target);
		},
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
			onStart(pokemon) {
				let targetType = pokemon.types[1]
				if (!pokemon.terastallized) {
					pokemon.setType(pokemon.getTypes(true).map(type => type === targetType ? "???" : type));
					this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
				}
			},
			onSwitchOut(pokemon) {
				pokemon.removeVolatile('securelanding');
			},
			onFaint(pokemon) {
				pokemon.removeVolatile('securelanding');
			},
			onEnd(pokemon) {
				let types = pokemon.baseSpecies.types;
				types = pokemon.baseSpecies.types;
				if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
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
	splashbite: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Gives the user the Aqua Ring effect.",
		name: "Splash Bite",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Feraligatr-Volcanic': case 'Feraligatr-Volcanic-Tera':
				move.type = 'Fire';
				break;
			case 'Feraligatr-Irradiating': case 'Feraligatr-Irradiating-Tera':
				move.type = 'Poison';
				break;
			}
		},
		self: {
			volatileStatus: 'aquaring',
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	terablast: {
		num: 851,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.terastallized === 'Stellar') {
				return 100;
			}
			return 80;
		},
		category: "Special",
		name: "Tera Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, mustpressure: 1},
		onPrepareHit(target, source, move) {
			if (source.terastallized) {
				this.attrLastMove('[anim] Tera Blast ' + source.teraType);
			}
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.terastallized) {
				move.type = pokemon.teraType;
			}
			switch (pokemon.species.name) {
			case 'Porygon2-Zenithbug': case 'Porygon2-Zenithbug-Tera':
				move.type = 'Dark';
				break;
			case 'Porygon2-Retrowave': case 'Porygon2-Retrowave-Tera':
				move.type = 'Electric';
				break;
			case 'Porygon2-Dreamnet': case 'Porygon2-Dreamnet-Tera':
				move.type = 'Fairy';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.terastallized && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
			if (pokemon.terastallized === 'Stellar') {
				move.self = {boosts: {atk: -1, spa: -1}};
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	dragonpulse: {
		num: 406,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Dragon Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Kingdra-Foamflow': case 'Kingdra-Foamflow-Tera':
				move.type = 'Fairy';
				break;
			case 'Kingdra-Rushwash': case 'Kingdra-Rushwash-Tera':
				move.type = 'Normal';
				break;
			case 'Kingdra-Frostshot': case 'Kingdra-Frostshot-Tera':
				move.type = 'Ice';
				break;
			}
		},
		secondary: null,
		target: "any",
		type: "Dragon",
		contestType: "Beautiful",
	},
	thunderbolt: {
		num: 85,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Thunderbolt",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Galvantula-Webcrawler': case 'Galvantula-Webcrawler-Tera':
				move.type = 'Steel';
				break;
			case 'Galvantula-Pyrefang': case 'Galvantula-Pyrefang-Tera':
				move.type = 'Fire';
				break;
			case 'Galvantula-Widowmaker': case 'Galvantula-Widowmaker-Tera':
				move.type = 'Ghost';
				break;
			}
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	diamondglow: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		name: "Diamond Glow",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Luster Purge", target);
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Aurorus-Freezeflame': case 'Aurorus-Freezeflame-Tera':
				move.type = 'Fire';
				break;
			case 'Aurorus-Glacier': case 'Aurorus-Glacier-Tera':
				move.type = 'Ground';
				break;
			}
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	scaleshot: {
		num: 799,
		accuracy: 90,
		basePower: 25,
		category: "Physical",
		name: "Scale Shot",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Druddigon-Rubyhead': case 'Druddigon-Rubyhead-Tera':
				move.type = 'Rock';
				break;
			case 'Druddigon-Sharpshot': case 'Druddigon-Sharpshot-Tera':
				move.type = 'Dark';
				break;
			}
		},
		selfBoost: {
			boosts: {
				def: -1,
				spe: 1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
	},
	smartstrike: {
		num: 684,
		accuracy: true,
		basePower: 70,
		category: "Physical",
		name: "Smart Strike",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Excadrill-Jungletrimmer': case 'Excadrill-Jungletrimmer-Tera':
				move.type = 'Grass';
				break;
			case 'Excadrill-Ancientspear': case 'Excadrill-Ancientspear-Tera':
				move.type = 'Rock';
				break;
			case 'Excadrill-Exoslasher': case 'Excadrill-Exoslasher-Tera':
				move.type = 'Bug';
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	throatchop: {
		num: 675,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Throat Chop",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Absol-Archangels': case 'Absol-Archangels-Tera':
				move.type = 'Fairy';
				break;
			case 'Absol-Sandscythe': case 'Absol-Sandscythe-Tera':
				move.type = 'Rock';
				break;
			case 'Absol-Mothman': case 'Absol-Mothman-Tera':
				move.type = 'Bug';
				break;
			}
		},
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'Throat Chop', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['sound']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZ && !move.isMax && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Throat Chop');
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (!move.isZ && !move.isMax && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Throat Chop');
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add('-end', target, 'Throat Chop', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('throatchop');
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	cottonswab: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "If there are hazards on the user's side, clears them but has halved power.",
		name: "Cotton Swab",
		pp: 15,
		priority: 0,
		flags: {powder: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pollen Puff", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.side.getSideCondition('stealthrock') || pokemon.side.getSideCondition('spikes') ||
				pokemon.side.getSideCondition('toxicspikes') || pokemon.side.getSideCondition('stickyweb') ||
				pokemon.side.getSideCondition('gmaxsteelsurge')) {
				return this.chainModify(0.5);
			}
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Whimsicott-Scarespore': case 'Whimsicott-Scarespore-Tera':
				move.type = 'Dark';
				break;
			case 'Whimsicott-Steelspore': case 'Whimsicott-Steelspore-Tera':
				move.type = 'Steel';
				break;
			case 'Whimsicott-Windspore': case 'Whimsicott-Windspore-Tera':
				move.type = 'Flying';
				break;
			}
		},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Cotton Swab', '[of] ' + pokemon);
					}
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Cotton Swab', '[of] ' + pokemon);
					}
				}
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
	},
	ultragulp: {
		num: 202,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "Heals 33% of the damage dealt and steals positive boosts.",
		name: "Ultra Gulp",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 3],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Guzzlord-Black Hole': case 'Guzzlord-Black Hole-Tera':
				move.type = 'Ghost';
				break;
			case 'Guzzlord-Miasma': case 'Guzzlord-Miasma-Tera':
				move.type = 'Poison';
				break;
			case 'Guzzlord-Rainbow': case 'Guzzlord-Rainbow-Tera':
				move.type = 'Electric';
				break;
			}
		},
		onHit(target, pokemon, move) {
			const boosts: SparseBoostsTable = {};
			let stolen = false;
			let statName: BoostID;
			for (statName in target.boosts) {
				const stage = target.boosts[statName];
				if (stage > 0) {
					boosts[statName] = stage;
					stolen = true;
				}
			}
			if (stolen) {
				this.attrLastMove('[still]');
				this.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
				this.boost(boosts, pokemon, pokemon);

				let statName2: BoostID;
				for (statName2 in boosts) {
					boosts[statName2] = 0;
				}
				target.setBoost(boosts);
				this.battle.addMove('-anim', pokemon, "Ultra Gulp", target);
			}
		},
		onAfterSubDamage(target, pokemon, move) {
			const boosts: SparseBoostsTable = {};
			let stolen = false;
			let statName: BoostID;
			for (statName in target.boosts) {
				const stage = target.boosts[statName];
				if (stage > 0) {
					boosts[statName] = stage;
					stolen = true;
				}
			}
			if (stolen) {
				this.attrLastMove('[still]');
				this.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
				this.boost(boosts, pokemon, pokemon);

				let statName2: BoostID;
				for (statName2 in boosts) {
					boosts[statName2] = 0;
				}
				target.setBoost(boosts);
				this.battle.addMove('-anim', pokemon, "Ultra Gulp", target);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
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
	blizzard: {
		num: 59,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Blizzard",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onModifyMove(move, pokemon, target) {
			if (this.field.isWeather(['hail', 'snow']) || pokemon.hasAbility('snowcap')) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	weatherball: {
		num: 311,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Weather Ball",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				break;
			}
			if (pokemon.hasAbility('snowcap')) {
				move.type = 'Ice';
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.hasAbility('snowcap') && !this.field.isWeather(['hail', 'snow'])) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
	},
// other snowscap effects to add later: Aurora Veil, Weather-healing abilities, Solar Beam	
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
