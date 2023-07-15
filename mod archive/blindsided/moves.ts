export const Moves: {[k: string]: ModdedMoveData} = {
	ashenshield: {
		num: -1000,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ashen Shield",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'ashenshield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Ashen Shield');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Ashen Shield');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		self: {
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "self",
		type: "Fire",
		shortDesc: "Protect clone. The user's Atk and Spa are lowered by 1.",
		contestType: "Cute",
	},
	beachflower: {
		num: -1001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Beach Flower",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'beachflower',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Beach Flower');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('beachflower')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Bloom Doom", target);
        },
		shortDesc: "Sets a hazard that makes every opposing Pokemon lose damage depending on their weakness to Grass.",
		target: "foeSide",
		type: "Grass",
		contestType: "Cool",
	},
	borealshine: {
		num: -1002,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Boreal Shine",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Aurora Veil", target);
        },
		target: "self",
		shortDesc: "Raises the user's Atk, Def and Spe.",
		type: "Ice",
		contestType: "Beautiful",
	},
	cascade: {
		num: -1003,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'brn') return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Cascade",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Surf", target);
        },
		shortDesc: "Doubles damage against burned opponents.",
	},
	enlighten: {
		num: -1004,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Enlighten",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Moonlight", target);
        },
		secondary: null,
		shortDesc: "Boost every stat of the user. Must recharge.",
		target: "self",
		type: "Psychic",
	},
	clearskies: {
        num: -1005,
        accuracy: true,
        basePower: 0,
        category: "Status",
        name: "Clear Skies",
        pp: 20,
        priority: 0,
        flags: {mirror: 1},
        onTryHit() {
            if (this.field.isWeather('')) return false;
        },
        onHitField(target, source) {
            this.field.clearWeather();
        },
        secondary: null,
        target: "all",
        type: "Normal",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Defog", target);
        },
        shortDesc: "Clears all weather effects on the field.",
    },
	rapidspin: {
		inherit: true,
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'beachflower'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'beachflower'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
	},
	gmaxwindrage: {
		inherit: true,
		self: {
			onHit(source) {
				let success = false;
				const removeTarget = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'beachflower',
				];
				const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'beachflower', ];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.getEffect(targetCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				this.field.clearTerrain();
				return success;
			},
		},
	},
	defog: {
		inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'beachflower',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'beachflower',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},
	courtchange: {
		inherit: true,
		onHitField(target, source) {
			const sourceSide = source.side;
			const targetSide = source.side.foe;
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 
				'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 
				'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
				'beachflower',
			];
			let success = false;
			for (const id of sideConditions) {
				const effectName = this.dex.getEffect(id).name;
				if (sourceSide.sideConditions[id] && targetSide.sideConditions[id]) {
					[sourceSide.sideConditions[id], targetSide.sideConditions[id]] = [
						targetSide.sideConditions[id], sourceSide.sideConditions[id],
					];
					this.add('-sideend', sourceSide, effectName, '[silent]');
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else if (sourceSide.sideConditions[id] && !targetSide.sideConditions[id]) {
					targetSide.sideConditions[id] = sourceSide.sideConditions[id];
					delete sourceSide.sideConditions[id];
					this.add('-sideend', sourceSide, effectName, '[silent]');
				} else if (targetSide.sideConditions[id] && !sourceSide.sideConditions[id]) {
					sourceSide.sideConditions[id] = targetSide.sideConditions[id];
					delete targetSide.sideConditions[id];
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else {
					continue;
				}
				let sourceLayers = sourceSide.sideConditions[id] ? (sourceSide.sideConditions[id].layers || 1) : 0;
				let targetLayers = targetSide.sideConditions[id] ? (targetSide.sideConditions[id].layers || 1) : 0;
				for (; sourceLayers > 0; sourceLayers--) {
					this.add('-sidestart', sourceSide, effectName, '[silent]');
				}
				for (; targetLayers > 0; targetLayers--) {
					this.add('-sidestart', targetSide, effectName, '[silent]');
				}
				success = true;
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
	},
	faeconstruct: {
		num: -1006,
		desc: "Boosts the lower defense stat, counting stat stages, of the Pokemon in the user's slot at the end of each turn for three turns.",
		shortDesc: "3 turns: boosts lower defense at the end of each turn.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stockpile", target);
		},
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fae Construct",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'faeconstruct',
		condition: {
			duration: 3,
			onResidualOrder: 4,
			onStart(side) {
				this.add('-sidestart', side, 'move: Fae Construct');
			},
			onResidual(side) {
				for (const pokemon of side.active) {
					const def = pokemon.getStat('def', false, true);
					const spd = pokemon.getStat('spd', false, true);
					this.add('-message', pokemon.name + ' drew power from the earth!')
					if (def && def <= spd) {
						this.boost({def: 1}, pokemon);
					} else if (spd) {
						this.boost({spd: 1}, pokemon);
					}
				}
			},
			onEnd(side) {
				for (const pokemon of side.active) {
					const def = pokemon.getStat('def', false, true);
					const spd = pokemon.getStat('spd', false, true);
					this.add('-message', pokemon.name + ' drew power from the earth!')
					if (def && def <= spd) {
						this.boost({def: 1}, pokemon);
					} else if (spd) {
						this.boost({spd: 1}, pokemon);
					}
				}
				this.add('-sideend', side, 'move: Fae Construct', '[silent]');
				this.add('-message', 'The Fae Construct faded away.')
			},
		},
		secondary: null,
		target: "allySide",
		type: "Ground",
	},
	flicker: {
		num: -1007,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Flicker",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfSwitch: true,
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Moonblast", target);
        },
		secondary: null,
		shortDesc: "The user switches out after using the move.",
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	fluffypress: {
		num: -1008,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Fluffy Press",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Body Press", target);
		},
		secondary: null,
		shortDesc: "Uses Defense instead of Attack. Power doubles if the users's ability is Fluffy",
		target: "normal",
		type: "Fire",
	},
	headrush: {
		num: -1009,
		accuracy: 95,
		basePower: 110,
		category: "Physical",
		name: "Head Rush",
		pp: 10,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		self: {
            volatileStatus: 'confusion',
        },
		shortDesc: "Confuses the user and target",
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Headbutt", target);
        },
		target: "normal",
		type: "Normal",
	},
	igneousdisc: {
		num: -1010,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		name: "Igneous Disc",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				atk: -2,
			},
		},
		shortDesc: "Lowers the user's Attack by two.",
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Rock Slide", target);
        },
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	lighthealing: {
		num: -1011,
		shortDesc: "5 turns: Pokemon on the user's side are healed by 1/16 of their max HP. Light Clay = 8.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", target);
		},
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Light Healing",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'lighthealing',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onResidualOrder: 4,
			onStart(side) {
				this.add('-sidestart', side, 'move: Light Healing');
			},
			onResidual(side) {
				for (const pokemon of side.active) {
					this.add('-message', pokemon.name + ' was healed by the light!')
					this.heal(pokemon.baseMaxhp / 16, pokemon);
				}
			},
			onEnd(side) {
				for (const pokemon of side.active) {
					this.add('-message', pokemon.name + ' was healed by the light!')
					this.heal(pokemon.baseMaxhp / 16, pokemon);
				}
				this.add('-sideend', side, 'move: Light Healing', '[silent]');
				this.add('-message', 'The light faded away.')
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fairy",
	},
	maelstrom: {
		num: -1012,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Maelstrom",
		pp: 10,
		priority: -6,
		flags: {mirror: 1},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
		shortDesc: "-6 priority. Target switches out.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Whirlpool", target);
		},
	},
	metamorphosis: {
		num: -1013,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Metamorphosis",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			def: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Harden", target);
        },
		target: "self",
		shortDesc: "Raises the user's Def, SpA and Spe.",
		type: "Ghost",
		contestType: "Beautiful",
	},
	parakeetpunch: {
		num: -1014,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Parakeet Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
		shortDesc: "10% chance to confuse the target.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acrobatics", target);
		},
	},
	piercingrampage: {
        num: -1015,
        accuracy: 60,
        basePower: 140,
        category: "Physical",
        name: "Piercing Rampage",
        pp: 5,
        priority: 0,
        flags: {contact: 1, mirror: 1},
        breaksProtect: true,
        volatileStatus: 'piercingrampage',
        condition: {
            duration: 0,
            onStart(target) {
                this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} is no longer able to protect itself!`);
            },
            onResidualOrder: 12,
            onEnd(target) {
                this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} is once again able to protect itself!`);
            },
            onDisableMove(pokemon) {
                for (const moveSlot of pokemon.moveSlots) {
                    const move = this.dex.getMove(moveSlot.id);
                    if (move.stallingMove && move.id !== 'endure') {
                        pokemon.disableMove(moveSlot.id);
                    }
                }
            },
            onBeforeMovePriority: 5,
            onBeforeMove(attacker, defender, move) {
                if (!move.isZ && !move.isMax && move.stallingMove && move.id !== 'endure') {
                    this.add('cant', attacker, 'move: Piercing Rampage', move);
                    return false;
                }
            },
        },
        secondary: null,
        target: "normal",
        type: "Steel",
        contestType: "Tough",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Corkscrew Crash", target);
        },
        shortDesc: "User breaks protection and disables protection moves.",
    },
	psonicfist: {
		num: -1016,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Psonic Fist",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		self: {
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
		shortDesc: "Lowers the user's defense by 1 stage.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zen Headbutt", target);
		},
	},
	riptide: {
		num: -1017,
		accuracy: 90,
		basePower: 60,
		category: "Special",
		name: "Riptide",
		pp: 10,
		priority: -6,
		flags: {mirror: 1},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
		shortDesc: "-6 priority. Target switches out.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Snipe Shot", target);
		},
	},
	sapdrink: {
		num: -1018,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sap Drink",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, authentic: 1},
		heal: [1, 4],
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Synthesis", target);
		},
		target: "allies",
		type: "Grass",
		desc: "Heals the user and its allies by 1/4 their max HP.",
	},
	vibrantlight: {
        num: -1019,
        accuracy: true,
        basePower: 0,
        category: "Status",
        shortDesc: "Next turn, 25% of the user's max HP and all statuses are restored.",
        name: "Vibrant Light",
        pp: 10,
        priority: 0,
        flags: {snatch: 1, heal: 1},
        slotCondition: 'Vibrant Light',
        condition: {
            duration: 2,
            onStart(pokemon, source) {
                this.effectData.hp = source.maxhp / 4;
            },
            onResidualOrder: 4,
            onEnd(target) {
                if (target && !target.fainted) {
                    const damage = this.heal(this.effectData.hp, target, target);
                    target.cureStatus();
                }
            },
        },
        secondary: null,
        target: "self",
        type: "Fairy",
        zMove: {boost: {spd: 1}},
        contestType: "Cute",
    },
	washaway: {
		num: -1021,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The effects of binding moves, Reflect, Light Screen, Aurora Veil, Safeguard and Mist end for all affected targets. If this move affects at least one target, all hazards are removed from both sides of the field, and any terrain will be cleared.",
		shortDesc: "Clears trapping/screens from affected, then all hazards/terrain.",
		name: "Wash Away",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHitField(target, source, move) {
			let hasLanded = false;
			let result = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('waterabsorb')) {
					result = true;
					if (pokemon.hp === pokemon.maxHP) {
						this.add('-immune', pokemon, '[from] ability: Water Absorb');
					} else {
						pokemon.heal(this.modify(pokemon.baseMaxhp, 0.75));
						this.add('-heal', pokemon, pokemon.getHealth, '[from] ability: Water Absorb');
					}
				} else if (pokemon.hasAbility('stormdrain')) {
					result = true;
					if (pokemon.boosts.spa >= 6) {
						this.add('-immune', pokemon, '[from] ability: Storm Drain');
					} else {
						this.add('-ability', pokemon, 'Storm Drain');
						this.boost({spa: 1}, pokemon);
					}
				} else {
					hasLanded = true;
					if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
						pokemon.removeVolatile('partiallytrapped');
						result = true;
					}
					const washAway = [
						'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist',
					];
					for (const targetCondition of washAway) {
						if (pokemon.side.removeSideCondition(targetCondition)) {
							this.add('-sideend', pokemon.side, this.dex.getEffect(targetCondition).name, '[from] move: Wash Away', '[of] ' + source);
							result = true;
						}
					}
				}
			}
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'beachflower',
			];
			if (hasLanded === true) {
				for (const targetCondition of removeAll) {
					if (target.side.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Wash Away', '[of] ' + source);
						result = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Wash Away', '[of] ' + source);
						result = true;
					}
				}
				if (this.field.terrain) {
					this.field.clearTerrain();
					result = true;
				}
				return result;
			}
		},
		secondary: null,
		target: "all",
		type: "Water",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Soak", target);
		},
	},
	sailwave: {
		num: -1020,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Sail Wave",
		pp: 5,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		useSourceSpeedAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
		shortDesc: "Uses Speed stat. Changes Tactaval to it's Anchor form prior to use.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Vortex", target);
		},
	},
	sunshinemantra: {
		num: -1022,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sunshine Mantra",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'sunshinemantra',
		onTryHitSide() {
			if (!this.field.isWeather('sunnyday')) return false;
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Sunshine Mantra weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Sunshine Mantra');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Sunshine Mantra');
			},
		},
		secondary: null,
		target: "allySide",
		shortDesc: "Aurora Veil for sun.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sunny Day", target);
		},
		type: "Fire",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	waterwall: {
		num: -1023,
		shortDesc: "5 turns: Halves Water/Fire/Ice moves damage. Light Clay = 8.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aqua Ring", target);
		},
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Water Wall",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'waterwall',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Water Wall');
			},
			onAnyModifyDamage(damage, source, target, move) {
                if (target !== source && target.side === this.effectData.target) {
                    if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						if (move.type === 'Ice' || move.type === 'Fire' || move.type === 'Water') {
                            this.debug('Water Wall weaken');
                            if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
                            return this.chainModify(0.5);
						}
                    }
                }
            },
			onEnd(side) {
				this.add('message', 'The Water Wall faded away')
			},
		},
		secondary: null,
		target: "allySide",
		type: "Water",
	},
};