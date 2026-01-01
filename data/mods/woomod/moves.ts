export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	downtownslide: {
		accuracy: 100,
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			const yourSide = pokemon.side;
			const targetSide = target.side;
			let allLayers = 0;
			if (yourSide.getSideCondition('stealthrock')) allLayers++;
			if (yourSide.getSideCondition('stickyweb')) allLayers++;
			if (yourSide.sideConditions['spikes']) {
				allLayers += yourSide.sideConditions['spikes'].layers;
			}
			if (yourSide.sideConditions['toxicspikes']) {
				allLayers += yourSide.sideConditions['toxicspikes'].layers;
			}
			if (targetSide.getSideCondition('stealthrock')) allLayers++;
			if (targetSide.getSideCondition('stickyweb')) allLayers++;
			if (targetSide.sideConditions['spikes']) {
				allLayers += targetSide.sideConditions['spikes'].layers;
			}
			if (targetSide.sideConditions['toxicspikes']) {
				allLayers += targetSide.sideConditions['toxicspikes'].layers;
			}
			this.debug('Hazardous Waste damage boost');
			return 75 + 15 * allLayers;
		},
		category: "Physical",
		shortDesc: "+15 power for each hazard layer on the field.",
		name: "Downtown Slide",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Downpour", target);
		},
		onHit(target, source, move) {
			const yourSide = source.side;
			const targetSide = target.side;
			let allLayers = 0;
			if (yourSide.getSideCondition('stealthrock')) allLayers++;
			if (yourSide.getSideCondition('stickyweb')) allLayers++;
			if (yourSide.sideConditions['spikes']) {
				allLayers += yourSide.sideConditions['spikes'].layers;
			}
			if (yourSide.sideConditions['toxicspikes']) {
				allLayers += yourSide.sideConditions['toxicspikes'].layers;
			}
			if (targetSide.getSideCondition('stealthrock')) allLayers++;
			if (targetSide.getSideCondition('stickyweb')) allLayers++;
			if (targetSide.sideConditions['spikes']) {
				allLayers += targetSide.sideConditions['spikes'].layers;
			}
			if (targetSide.sideConditions['toxicspikes']) {
				allLayers += targetSide.sideConditions['toxicspikes'].layers;
			}
			const bp = 75 + 15 * allLayers;
			this.add('-message', `Downtown Slide currently has a BP of ${bp}!`);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	shimmeringsap: {
		name: "Shimmering Sap",
		type: "Grass",
		category: "Special",
		basePower: 110,
		accuracy: 90,
		pp: 5,
		shortDesc: "Super effective on Dragon.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Seed Flare", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dragon') return 1;
		},
		secondary: null,
		target: "normal",
	},
	bluemoon: {
		name: "Blue Moon",
		type: "Fairy",
		category: "Special",
		basePower: 75,
		accuracy: 100,
		pp: 10,
		shortDesc: "User recovers 50% of the damage dealt.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, heal: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Moonblast", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
	},
	nymblekick: {
		name: "Nymble Kick",
		type: "Steel",
		category: "Steel",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "Extends the duration of Rain by 1 turn.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thunderous Kick", target);
		},
		onHit(target, source) {
			if (target?.effectiveWeather() === 'raindance') this.field.weatherState.duration++;
		},
		secondary: null,
		target: "normal",
	},
	vanilliteattackwithtoomanyeffects: {
		name: "Vanillite Attack With Too Many Effects",
		type: "Fire",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "Burns the user.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Inferno Overdrive", target);
		},
		onHit(target, pokemon) {
			if (pokemon.trySetStatus('brn')) this.field.setWeather('sunnyday');
		},
		secondary: null,
		target: "normal",
	},
	starsmash: {
		name: "Star Smash",
		type: "Fairy",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "Special if user's Sp. Atk > Atk.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sunsteel Strike", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) < pokemon.getStat('spa', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
	},
	mentalspin: {
		name: "Mental Spin",
		type: "Psychic",
		category: "Physical",
		basePower: 30,
		accuracy: 100,
		pp: 15,
		shortDesc: "Confuses foes, frees user from hazards/bind/leech.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Zen Headbutt", target);
		},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mental Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mental Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mental Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mental Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
	},
	wigglinglash: {
		name: "Wiggling Lash",
		type: "Grass",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "If used in Grassy Terrain, sets a layer of Toxic Spikes.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Fire Lash", target);
		},
		onAfterHit(target, source, move) {
			if (this.field.isTerrain('grassyterrain') && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('toxicspikes');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (this.field.isTerrain('grassyterrain') && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('toxicspikes');
				}
			}
		},
		secondary: null,
		target: "normal",
	},
	burialblast: {
		name: "Burial Blast",
		type: "Ground",
		category: "Special",
		basePower: 80,
		onBasePower(basePower, source) {
			if (this.field.isTerrain('grassyterrain')) {
				this.debug('terrain buff');
				return this.chainModify(1.5);
			}
		},
		accuracy: 100,
		pp: 10,
		shortDesc: "Deals 1.5x damage if used in Grassy Terrain.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Earth Power", target);
		},
		secondary: null,
		target: "normal",
	},
	duoshock: {
		name: "Duoshock",
		type: "Psychic",
		category: "Physical",
		basePower: 35,
		accuracy: 100,
		pp: 15,
		shortDesc: "Hits twice. First hit adds Fighting to the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Psyshock", target);
		},
		multihit: 2,
		onHit(target) {
			if (target.hasType('Fighting')) return false;
			if (!target.addType('Fighting')) return false;
			this.add('-start', target, 'typeadd', 'Fighting', '[from] move: Duoshock');
		},
		secondary: null,
		target: "normal",
	},
	ivycudgel: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.species.id !== "farfetchd") return;
			switch (pokemon.item) {
			case 'wellspringmask':
				move.type = 'Water';
				break;
			case 'hearthflamemask':
				move.type = 'Fire';
				break;
			case 'cornerstonemask':
				move.type = 'Rock';
				break;
			case 'stormbringermask':
				move.type = 'Electric';
				break;
			}
		},
	},
	meteorcrash: {
		name: "Meteor Crash",
		type: "Rock",
		category: "Special",
		basePower: 120,
		accuracy: 100,
		pp: 15,
		shortDesc: "Has 33% recoil.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Draco Meteor", target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
	},

	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.side.getSlotCondition(pokemon, 'phantomchute')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	spikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.side.getSlotCondition(pokemon, 'phantomchute')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	toxicspikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('forbiddenjuice') || pokemon.side.getSlotCondition(pokemon, 'phantomchute')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.side.getSlotCondition(pokemon, 'phantomchute')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
			},
		},
	},
};
