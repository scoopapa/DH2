export const Moves: { [moveid: string]: ModdedMoveData } = {

	giantssiege: {
		num: -1000,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Giant's Siege",
		pp: 10,
		priority: 1,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onBasePower(basePower, pokemon, target) {
			if (pokemon.hp * 2 >= pokemon.maxhp) {
				this.debug('giant\'s siege boost')
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	riverwave: {
		num: -1001,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "River Wave",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacent",
		type: "Water",
		contestType: "Cool",
		shortDesc: "10% chance to lower opponent's speed stat. Hits all adjacent targets.",

	},
	archaicglare: {
		num: -1002,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Archaic Glare",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onBasePower(basePower, source) {
			if (this.field.getPseudoWeather('trickroom')) {
				return this.chainModify(1.5);
			}
			if (['sunnyday', 'desolateland'].includes(source.effectiveWeather())) {
				this.debug('archaic glare sun boost');
				return this.chainModify(1.5);
			}
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
		shortDesc: "50% damage boost in Trick Room or harsh sunlight.",

	},
	blindingblitz: {
		num: -1003,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		name: "Blinding Blitz",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, metronome: 1 },
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('High Jump Kick'));
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
		shortDesc: "If this attack misses, user takes 50% of their max HP as recoil.",
	},
	boilingbash: {
		num: -1004,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Boiling Bash",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "allAdjacent",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "30% to burn. Hits all adjacent targets.",

	},
	boilingdeluge: {
		num: -1005,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Boiling Deluge",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Boiling Deluge');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp * (pokemon.hasType(['Water', 'Fire']) ? 0 : (1/8)));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Boiling Deluge');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'boilingdeluge',
		},
		target: "normal",
		type: "Fire",
		shortDesc: "Pokemon hit by this move take 1/8 max HP every turn. Water and Fire types are immune to residual damage.",

	},
	/*candlelight: {
		num: -1006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Candlelight",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
		onHit(target, source, move) {
			let success = false;
			let removals = 0;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({ evasion: -1 });
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
					success = true;
					removals++;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
					removals++;
				}
			}
			this.field.clearTerrain();
			source.side.addSlotCondition(source, 'candlelight');
			return success;
		},
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.maxhp);
					target.clearStatus();
					this.add('-heal', target, target.getHealth, '[from] move: Healing Wish');
					target.side.removeSlotCondition(target, 'healingwish');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},*/
	dragonhunt: {
		num: -1007,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Dragon Hunt damage boost');
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Dragon Hunt",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('dragonhunt', pokemon);
				const data = side.getSideConditionData('dragonhunt');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('dragonhunt');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('dragonhunt start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Dragon Hunt');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('dragonhunt', source, source.getLocOf(pokemon));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Hits opponents as they switch out and gets a 50% power boost.",

	},
	gundown: {
		num: -1008,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Gun Down",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, distance: 1, metronome: 1, bullet: 1, pulse: 1 },
		secondary: null,
		target: "any",
		type: "Fighting",
		contestType: "Tough",
	},
	huntershot: {
		num: -1009,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Hunter Shot",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, bullet: 1 },
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		shortDesc: "This move always crits.",

	},
	lightthatburnthesky: {
		num: -1010,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Light That Burns The Sky",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "allAdjacent",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "30% to burn. Hits all adjacent opponents.",

	},
	obsidianclaw: {
		num: -1011,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Obsidian Claw",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "20% chance to paralyze.",

	},
	perfectfreeze: {
		num: -1012,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Perfect Freeze",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: { protect: 1, mirror: 1, recharge: 1},
		secondary: {
			chance: 100,
			status: 'frz',
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Perfect Freeze'), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
		shortDesc: "100% chance to freeze. User takes 50% of their max HP as recoil and must recharge.",

	},
	prominenceshock: {
		num: -1013,
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Prominence Shock",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, contact: 1 },
		self: {
			volatileStatus: 'mustrecharge',
		},
		recoil: [50, 100],
		target: "normal",
		type: "Electric",
		shortDesc: "User must recharge. Takes 50% of damage dealt as recoil.",

	},
	sicklysugar: {
		num: -1014,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Sickly Sugar",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onHit(target, source, move) {
			if (target.status === 'psn' || target.status === 'tox') {
				return !!this.boost({ atk: -1, spa: -1, spe: -1 }, target, source, move);
			}
			return false;
		},
		target: "normal",
		type: "Poison",
		shortDesc: "If the opponent is poisoned or badly poisoned, drop Atk and Spa by 1.",
	},
	sulfuricsolution: {
		num: -1015,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Sulfuric Solution",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		onTryHit(target, source, move) {
			if (target.hasType('Poison')) {
				move.basePower = 0;
			}
		},
		onTryMove(source, target, move) {
			if (target.hasType('Poison') && source.volatiles['healblock']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Heal Block', move);
				return false;
			}
		},
		onHit(target, source, move) {
			if (target.hasType('Poison')) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.25))) {
					if (target.volatiles['healblock'] && target.hp !== target.maxhp) {
						this.attrLastMove('[still]');
						// Wrong error message, correct one not supported yet
						this.add('cant', source, 'move: Heal Block', move);
					} else {
						this.add('-immune', target);
					}
					return this.NOT_FAIL;
				}
			}
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
		shortDesc: "Super-effective against Steel-types. If it hits a Poison, they instead heal 25% HP.",

	},
	vitalspark: {
		num: -1016,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Vital Spark",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		self: {
			volatileStatus: 'charge',
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
		shortDesc: "User gains Charge volatile.",

	},
}
