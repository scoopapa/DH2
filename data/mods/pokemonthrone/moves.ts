export const Moves: {[moveid: string]: MoveData} = {
	/*
	CUSTOM MOVES
	*/
	/*
	Edits
	*/
	aircutter: {
		inherit: true,
		basePower: 70,
	},
	revivalblessing: {
		inherit: true,
		flags: {heal: 1, nosketch: 1, noasssist: 1},
	},
	attract: {
		inherit: true,
		// Come back to this one.
	},
	aurasphere: {
		inherit: true,
		basePower: 90,
	},
	batonpass: {
    inherit: true,
    selfSwitch: true,
    onHit(pokemon) {
			if (!this.canSwitch(pokemon.side) || pokemon.volatiles['commanded']) {
				this.attrLastMove('[still]');
				this.add('-fail', pokemon);
				return this.NOT_FAIL;
			}
		},
	},
	bind: {
		inherit: true,
		basePower: 30,
		accuracy: 90,
	},
	blazekick: {
		inherit: true,
		accuracy: 95,
	},
	boneclub: {
		inherit: true,
		basePower: 85,
		accuracy: 95,
	},
	bonerush: {
		inherit: true,
		accuracy: 95,
	},
	bounce: {
		inherit: true,
		accuracy: 95,
	},
	brickbreak: {
		inherit: true,
		critRatio: 2,
	},
	captivate: {
    inherit: true,
    onTryImmunity() {
			return true; // Always works now, regardless of gender
		},
	},
	chargebeam: {
		inherit: true,
		basePower: 60,
	},
	clamp: {
		inherit: true,
		accuracy: 90,
	},
	cometpunch: {
		inherit: true,
		basePower: 20,
		accuracy: 90,
	},
	covet: {
		inherit: true,
		basePower: 75,
	},
	crosshop: {
		inherit: true,
		willCrit: true,
		basePower: 75,
	},
	crosspoison: {
		inherit: true,
		basePower: 80,
	},
	crunch: {
		inherit: true,
		basePower: 85,
	},
	crushclaw: {
		inherit: true,
		accuracy: 90,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	cut: {
		inherit: true,
		basePower: 90,
	},
	defog: {
		inherit: true,
		flags: {protect: 1, bypasssub: 1, metronome: 1},
		onHitField(target, source, move) {
			let success = false;
			for (const foe of source.side.foe.active) {
				if (!foe || foe.fainted) continue;
				if (this.boost({evasion: -1}, foe, source)) {
					success = true;
				}
			}
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist',
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const cond of removeTarget) {
				if (source.side.foe.removeSideCondition(cond)) {
					this.add('-sideend', source.side.foe, this.dex.conditions.get(cond).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const cond of removeAll) {
				if (source.side.removeSideCondition(cond)) {
					this.add('-sideend', source.side, this.dex.conditions.get(cond).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			if (this.field.terrain) {
				this.field.clearTerrain();
				success = true;
			}
			return success;
		},
		target: "all",
	},
	doublekick: {
		inherit: true,
		basePower: 40,
	},
	doubleslap: {
		inherit: true,
		basePower: 20,
	},
	dragonclaw: {
		inherit: true,
		critRatio: 2,
	},
	dragonenergy: {
		inherit: true,
		drain: [3, 4],
		// Come back to this one.
	},
	dragonhammer: {
		inherit: true,
		basePower: 120,
		ignoreEvasion: true,
		ignoreDefensive: true,
	},
	dragpnpulse: {
		inherit: true,
		basePower: 90,
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
	},
	dragonrush: {
		inherit: true,
		accuracy: 85,
		recoil: [33, 100],
	},
	drillpeck: {
		inherit: true,
		critRatio: 2,
	},
	drillrun: {
		inherit: true,
		accuracy: 100,
	},
	dynamicpunch: {
		inherit: true,
		basePower: 150,
	},
	eggbomb: {
		inherit: true,
		accuracy: 100,
	},
	electroweb: {
		inherit: true,
		basePower: 65,
	},
	explosion: {
		inherit: true,
		basePower: 300,
	},
	fairywind: {
		inherit: true,
		basePower: 60,
	},
	falseswipe: {
		inherit: true,
		basePower: 90,
	},
	feint: {
    inherit: true,
    basePower: 60,
    onBasePower(basePower, source, target, move) {
			// If the target is under any protection, Feint becomes 90 BP
			if (target.volatiles['protect'] || target.volatiles['kingsshield'] ||
				target.volatiles['spikyshield'] || target.volatiles['banefulbunker'] ||
				target.volatiles['silktrap'] || target.volatiles['obstruct']) {
				return 90;
			}
		},
	},
	firefang: {
		inherit: true,
		basePower: 70,
	},
	firepunch: {
		inherit: true,
		basePower: 80,
	},
	fishiousrend: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
	},
	flyingpress: {
		inherit: true,
		// Come back to this one.
	},
	furyattack: {
		inherit: true,
		basePower: 20,
		accuracy: 90,
	},
	furyswipes: {
		inherit: true,
		basePower: 20,
		accuracy: 90,
	},
	frostbreath: {
		inherit: true,
		basePower: 65,
		accuracy: 95,
	},
	geargrind: {
		inherit: true,
		accuracy: 95,
	},
	headbutt: {
		inherit: true,
		basePower: 80,
	},
	headsmash: {
		inherit: true,
		accuracy: 85,
	},
	hiddenpower: {
		inherit: true,
		// Come back to this one.
	},
	holdback: {
		inherit: true,
		basePower: 100,
	},
	hydrosteam: {
		inherit: true,
		// Come back to this one.
	},
	hyperfang: {
		inherit: true,
		accuracy: 95,
	},
	icefang: {
		inherit: true,
		basePower: 75,
	},
	icepunch: {
		inherit: true,
		basePower: 80,
	},
	ingrain: {
    inherit: true,
    condition: {
			inherit: true,
			onTrapPokemon: undefined, // removes trapping
		},
	},
	irontail: {
		inherit: true,
		accuracy: 85,
	},
	judgement: {
		inherit: true,
		basePower: 120,
	},
	lastrespects: {
		inherit: true,
		pp: 5,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
		},
		onBasePower(basePower, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				this.debug('Boosted for a faint last turn');
				return this.chainModify(2);
			}
		},
	},
	lowsweep: {
		inherit: true,
		basePower: 75,
	},
	magmastorm: {
		inherit: true,
		accuracy: 85,
	},
	megakick: {
		inherit: true,
		pp: 20,
		accuracy: 85,
	},
	megapunch: {
		inherit: true,
		basePower: 65,
		accuracy: 95,
	},
	metalclaw: {
		inherit: true,
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
	},
	meteorbeam: {
		inherit: true,
		accuracy: 95,
	},
	muddywater: {
		inherit: true,
		accuracy: 95,
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
	},
	mysticalpower: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
					spd: 1,
				},
			},
		},
	},
	needlearm: {
		inherit: true,
		basePower: 80,
	},
	nightdaze: {
		inherit: true,
		basePower: 95,
	},
	nightslash: {
		inherit: true,
		basePower: 80,
	},
	noretreat: {
		inherit: true,
		boosts: {
			atk: 2,
			def: 2,
			spa: 2,
			spd: 2,
			spe: 2,
		},
	},
	paraboliccharge: {
		inherit: true,
		basePower: 80,
	},
	payback: {
		inherit: true,
		basePower: 60,
	},
	payday: {
		inherit: true,
		basePower: 50,
		boosts: {
			atk: -1,
			spa: -1,
		},
	},
	petaldance: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (this.field.isTerrain('grassyterrain') && source.isGrounded()) {
				return priority + 1;
			}
		},
	},
	photongeyser: {
		inherit: true,
		// Come back to this one.
	},
	powergem: {
		inherit: true,
		basePower: 90,
	},
	present: {
		inherit: true,
		accuracy: 95,
	},
	quickattack: {
		inherit: true,
		basePower: 50,
	},
	ragefist: {
    inherit: true,
    basePower: 80,
    basePowerCallback(pokemon) {
			// 80 + 16 per hit, capped at 176
			return Math.min(176, 80 + 16 * pokemon.timesAttacked);
		},
	},
	razorshell: {
		inherit: true,
		basePower: 80,
	},
	razorwind: {
		inherit: true,
		type: "Flying",
		basePower: 90,
	},
	relicsong: {
		inherit: true,
		basePower: 80,
	},
	rockclimb: {
		inherit: true,
		accuracy: 95,
	},
	rockslide: {
		inherit: true,
		basePower: 80,
		accuracy: 95,
	},
	rocksmash: {
		inherit: true,
		basePower: 60,
	},
	rollingkick: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
	},
	sacredfire: {
		inherit: true,
		secondary: {
			chance: 100,
			status: 'brn',
		},
	},
	sandtomb: {
		inherit: true,
		basePower: 40,
	},
	secretpower: {
		inherit: true,
		basePower: 80,
	},
	seedbomb: {
		inherit: true,
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
	},
	shadowclaw: {
		inherit: true,
		basePower: 80,
	},
	shedtail: {
		inherit: true,
		// Come back to this one.
	},
	signalbeam: {
		inherit: true,
		basePower: 80,
	},
	sing: {
		inherit: true,
		accuracy: 70,
	},
	// Sketch
	skyattack: {
		inherit: true,
		accuracy: 100,
	},
	skyuppercut: {
    inherit: true,
    onEffectiveness(typeMod, target, type) {
			// Ignore the Flying typing when calculating effectiveness
			if (type === 'Fighting' && target.hasType('Flying')) {
				return 0;
			}
		},
	},
	slam: {
		inherit: true,
		basePower: 90,
		accuracy: 90,
	},
	smackdown: {
		inherit: true,
		basePower: 60,
	},
	smog: {
		inherit: true,
		accuracy: 100,
	},
	snarl: {
		inherit: true,
		basePower: 60,
	},
	snipeshot: {
		inherit: true,
		basePower: 70,
		willCrit: true,
	},
	snore: {
		inherit: true,
		basePower: 75,
	},
	steamroller: {
		inherit: true,
		basePower: 75,
	},
	steelwing: {
		inherit: true,
		basePower: 80,
		accuracy: 95,
	},
	stomp: {
		inherit: true,
		basePower: 70,
	},
	sweetkiss: {
		inherit: true,
		accuracy: 90,
	},
	synchronoise: {
		inherit: true,
		basePower: 150,
	},
	tailslap: {
		inherit: true,
		accuracy: 90,
	},
	takedown: {
		inherit: true,
		basePower: 100,
	},
	thief: {
		inherit: true,
		basePower: 70,
	},
	thrash: {
		inherit: true,
		// Come back to this one.
	},
	thunderfang: {
		inherit: true,
		basePower: 70,
	},
	thunderpunch: {
		inherit: true,
		basePower: 80,
	},
	toxicthread: {
		inherit: true,
		category: "Physical",
		basePower: 80,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		status: null,
		boosts: {def: -2},
	},
	tripledive: {
    inherit: true,
    secondary: {
			chance: 50,
			boosts: {def: -1},
		},
	},
	triplekick: {
		inherit: true,
		basePower: 18,
	},
	tropkick: {
		inherit: true,
		basePower: 85,
	},
	twineedle: {
		inherit: true,
		basePower: 40,
	},
	twister: {
		inherit: true,
		basePower: 60,
	},
	whirlpool: {
		inherit: true,
		basePower: 40,
		accuracy: 90,
	},
	wildcharge: {
		inherit: true,
		basePower: 100,
	},
	wrap: {
		inherit: true,
		basePower: 25,
	},
	xscissor: {
		inherit: true,
		critRatio: 2,
	},
	zenheadbutt: {
		inherit: true,
		basePower: 95,
	},
}
