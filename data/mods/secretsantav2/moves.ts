export const Moves: {[k: string]: ModdedMoveData} = {
	fertilize: {
		num: -1,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "50% chance to inflict Leech Seed on foe.",
		name: "Fertilize",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Shot", target);
			this.add('-anim', source, "Leech Seed", target);
		},
		secondary: {
			chance: 50,
			volatileStatus: 'leechseed',
		},
		target: "normal",
		type: "Rock",
	},
	mycamel: {
		num: -2,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises user's SpA, SpD and Spe by 1; 2 in Sun.",
		name: "MYCAMEL",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) move.boosts = {spa: 2, spd: 2, spe: 2};
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Growth", target);
		},
		boosts: {
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	dragoncall: {
		num: -3,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		name: "Dragon Call",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Boomburst", target);
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
		type: "Dragon",
	},
	clampact: {
		num: -4,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects from damaging attacks. Raises Def or SpD.",
		name: "Clampact",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		volatileStatus: 'clampact',
		onPrepareHit(pokemon) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Protect");
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.isZOrMaxPowered && move.category === "Physical") {
					this.boost({def: 1}, this.dex.getActiveMove("Clampact"));
				} else if (move.isZOrMaxPowered && move.category === "Special") {
					this.boost({spd: 1}, this.dex.getActiveMove("Clampact"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.category === "Physical") {
					this.boost({def: 1}, this.dex.getActiveMove("Clampact"));
				} else if (move.isZOrMaxPowered && move.category === "Special") {
					this.boost({spd: 1}, this.dex.getActiveMove("Clampact"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	scavengingbite: {
		num: -5,
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			const userspeed = pokemon.getStat('spe', false, true);
			const targetspeed = target.getStat('spe', false, true);
			if (targetspeed >= userspeed) {
				return move.basePower + 70;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Heals/Boosts/Does more damage if target is healthier/boosted/faster.",
		name: "Scavenging Bite",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leech Life", target);
		},
		onHit(target, source) {
			if (target.hp >= source.hp) {
				this.heal(source.maxhp / 3, source, source);
			}
			if (target.positiveBoosts() >= source.positiveBoosts()) {
				this.boost({def: 1, spd: 1}, source, source);
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	},
	biohazardblast: {
		num: -6,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Inflicts severe poison to the target.",
		name: "Biohazard Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Bomb", target);
		},
		secondary: {
			chance: 100,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	thulianmaw: {
		num: -7,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Raises speed. Arctovish transforms.",
		name: "Thulian Maw",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bite: 1, contact: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fishious Rend", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Arctovish' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'arctovishleviathan' ? '' : '-Leviathan';
				pokemon.formeChange('Arctovish' + meloettaForme, this.effect, false, '[msg]');
			}
		},
		target: "normal",
		type: "Dragon",
	},
	scythewings: {
		num: -8,
		accuracy: 90,
		basePower: 75,
		category: "Special",
		shortDesc: "Hits twice. If target does not switch: -1 SpA for each hit.",
		name: "Scythe Wings",
		pp: 5,
		priority: 0,
		flags: {slicing: 1, wind: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "X-Scissor", target);
		},
		onHit(pokemon, target, move) {
			if (!pokemon.newlySwitched && (move.multihit === 1 || move.multihit === 2)) {
				this.boost({spa: -1}, target);
			}
		},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Bug",
	},
	
	doubleironbash: {
		inherit: true,
		isNonstandard: null,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	relicsong: {
		inherit: true,
		isNonstandard: null,
	},
	polarflare: {
		num: -1000,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Polar Flare",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1, nosketch: 1 },
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Armor Cannon", target);
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		onAfterMoveSecondarySelf(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Ramnarok' && !pokemon.transformed) {
				const forme = pokemon.species.id === 'ramnarokradiant' ? '' : '-Radiant';
				pokemon.formeChange('Ramnarok' + forme, this.effect, false, '0', '[msg]');
			}
		},
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Beautiful",
	},
};
