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
	
	aurorabeam: {
		num: 802,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Aurora Beam",
		shortDesc: "User faints. Sets up Aurora Veil.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfdestruct: "always",
		self: {
			sideCondition: 'auroraveil',
		},
		secondary: null,
		target: "allAdjacent",
		type: "Ice",
	},
	auroraveil: {
		inherit: true,
		shortDesc: "For 5 turns, damage to allies -25%. Max 2 layers.",
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Aurora Veil weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(1 - (0.25 * this.effectState.layers));
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Aurora Veil');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Aurora Veil');
				this.effectState.layers++;
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Aurora Veil');
			},
		},
	},
	avalanche: {
		inherit: true,
		shortDesc: "Deals supereffective damage if the user was damaged this turn.",
		basePowerCallback: null,
		onEffectiveness(typeMod, target, type) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				if (target.baseSpecies.types[0] === type) return 1;
				else return 0;
			}
		},
	},
	blizzard: {
		inherit: true,
		shortDesc: "30% chance to frostbite the target.",
		basePower: 80,
		accuracy: 100,
		pp: 15,
		secondary: {
			chance: 30,
			status: 'fsb',
		},
	},
	freezeshock: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Is Ice or Electric-type, whichever does more damage.",
		name: "Freeze Shock",
		viable: true,
		pp: 10,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			for (const target of pokemon.side.foe.active) {
			const type1 = 'Ice';
			const type2 = 'Electric';
				if (this.dex.getEffectiveness(type1, target) < this.dex.getEffectiveness(type2, target)) {
					move.type = 'Electric';
				} else if (this.dex.getEffectiveness(type1, target) === this.dex.getEffectiveness(type2, target)) {
					if (pokemon.hasType('Electric') && !pokemon.hasType('Ice')) {
						move.type = 'Electric';
					}
				}
			}
		},
		onHit(target, source, move) {
			this.add('-message', `Freeze Shock dealt ${move.type}-type damage!`);
		},
		priority: 0,
		secondary: null,
		target: "any",
		type: "Ice",
	},
	glaciallance: {
		inherit: true,
		shortDesc: "Lowers the user's Atk and Sp. Def by 1.",
		basePower: 110,
		self: {
			boosts: {
				atk: -1,
				spd: -1,
			},
		},
	},
	iceball: {
		inherit: true,
		isViable: true,
		isNonstandard: null,
		accuracy: 100,
		shortDesc: "Power doubles with each consecutive use.",
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			const iceballData = pokemon.volatiles['iceball'];
			if (iceballData?.hitCount) {
				bp *= Math.pow(2, iceballData.contactHitCount);
			}
			if (iceballData && pokemon.status !== 'slp') {
				iceballData.hitCount++;
				iceballData.contactHitCount++;
				if (iceballData.hitCount < 5) {
					iceballData.duration = 2;
				}
			}
			if (pokemon.volatiles['defensecurl']) {
				bp *= 2;
			}
			if (this.field.pseudoWeather.whiteout) {
				bp *= 2;
			}
			return bp;
		},
		condition: {
			duration: 1,
			onStart() {
				this.effectState.hitCount = 0;
				this.effectState.contactHitCount = 0;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['iceball'];
				}
			},
		},
	},
	icebeam: {
		inherit: true,
		shortDesc: "20% chance to frostbite the target.",
		secondary: {
			chance: 20,
			status: 'fsb',
		},
	},
	iceburn: {
		name: "Ice Burn",
		type: "Ice",
		category: "Special",
		basePower: 70,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits Ice neutrally. 10% chance to burn the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ice') return 0;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
	},
	icefang: {
		inherit: true,
		shortDesc: "Target loses 1/16 max HP.",
		onHit(target, source) {
			this.damage(target.baseMaxhp / 16, source, source);
		},
		secondary: null,
	},
	
	snowballfight: {
		name: "Snowball Fight",
		type: "Ice",
		category: "Special",
		basePower: 10,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits 2-5 times.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nice: 1},
		multihit: [2, 5],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Powder Snow", target);
		},
		secondary: null,
		target: "normal",
	},
	nicebeam: {
		accuracy: 100,
		basePower: 45,
		category: "Special",
		name: "Nice Beam",
		shortDesc: "10% chance to freeze the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nice: 1},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Stellar",
		contestType: "Beautiful",
	},
	niceburn: {
		accuracy: 100,
		basePower: 45,
		category: "Special",
		name: "Nice Burn",
		shortDesc: "30% chance to burn the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nice: 1},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Stellar",
		contestType: "Beautiful",
	},
	nicespinner: {
		name: "Nice Spinner",
		type: "Stellar",
		category: "Physical",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "Ends the effects of terrain.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, nice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Spinner", target);
		},
		onAfterHit(target, source) {
			if (source.hp) {
				this.field.clearTerrain();
			}
		},
		onAfterSubDamage(damage, target, source) {
			if (source.hp) {
				this.field.clearTerrain();
			}
		},
		secondary: null,
		target: "normal",
	},
}
