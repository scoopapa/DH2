export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	absorb: {
		inherit: true,
		pp: 15,
	},
	aircutter: {
		inherit: true,
		basePower: 55,
	},
	assurance: {
		inherit: true,
		basePower: 50,
	},
	astralbarrage: {
		inherit: true,
		basePower: 110,
	},
	bide: {
		inherit: true,
		accuracy: 100,
	},
	bind: {
		inherit: true,
		accuracy: 75,
	},
	bite: {
		inherit: true,
		shortDesc: "10% chance to make the target flinch.",
		desc: "Has a 10% chance to make the target flinch.",
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
	},
	bittermalice: {
		inherit: true,
		basePower: 60,
	},
	bleakwindstorm: {
		inherit: true,
		basePower: 95,
		pp: 5,
		target: "normal",
	},
	blizzard: {
		inherit: true,
		shortDesc: "10% chance to freeze the target.",
		desc: "Has a 10% chance to freeze the target.",
		onModifyMove() {},
		target: "normal",
	},
	bloodmoon: {
		inherit: true,
		basePower: 130,
	},
	boltbeak: {
		inherit: true,
		basePower: 80,
	},
	bonerush: {
		inherit: true,
		accuracy: 80,
	},
	bubble: {
		inherit: true,
		basePower: 20,
	},
	bulletseed: {
		inherit: true,
		basePower: 10,
	},
	chatter: {
		inherit: true,
		basePower: 60,
		shortDesc: "For Chatot, 10% chance to confuse the target.",
		desc: "Has an X% chance to confuse the target, where X is 0 unless the user is a Chatot that hasn't Transformed. If the user is a Chatot, X is 0 or 10 depending on the volume of Chatot's recorded cry, if any; 0 for a low volume or no recording, 10 for a medium to high volume recording.",
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
	},
	chloroblast: {
		inherit: true,
		basePower: 120,
	},
	clamp: {
		inherit: true,
		accuracy: 75,
		pp: 10,
	},
	cottonspore: {
		inherit: true,
		accuracy: 85,
	},
	covet: {
		inherit: true,
		basePower: 25,
	},
	crabhammer: {
		inherit: true,
		basePower: 90,
		accuracy: 85,
	},
	defog: {
		inherit: true,
		desc: "Lowers the target's evasiveness by 1 stage. If this move is successful and whether or not the target's evasiveness was affected, the effects of Reflect, Light Screen, Safeguard, Mist, Spikes, Toxic Spikes, and Stealth Rock end for the target's side. Ignores a target's substitute, although a substitute will still block the lowering of evasiveness.",
		shortDesc: "-1 evasion; clears target side's hazards/screens.",
		onHit(pokemon) {
			if (!pokemon.volatiles['substitute']) this.boost({evasion: -1});
			const sideConditions = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Defog', '[of] ' + pokemon);
				}
			}
		},
	},
	diamondstorm: {
		inherit: true,
		shortDesc: "50% chance to raise user's Def by 1 for each hit.",
		desc: "Has a 50% chance to raise the user's Defense by 1 stage for each hit.",
		self: {
			chance: 50,
			boosts: {
				def: 1,
			},
		},
	},
	dig: {
		inherit: true,
		basePower: 60,
	},
	direclaw: {
		inherit: true,
		basePower: 60,
		desc: "Has a 30% chance to cause the target to either fall asleep, become poisoned, or become paralyzed.",
		shortDesc: "30% chance to sleep, poison, or paralyze target.",
		secondary: {
			chance: 30,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
	},
	disable: {
		inherit: true,
		accuracy: 55,
	},
	dive: {
		inherit: true,
		basePower: 60,
	},
	dizzypunch: {
		inherit: true,
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		secondary: null,
	},
	doomdesire: {
		inherit: true,
		basePower: 120,
		accuracy: 85,
	},
	doubleedge: {
		inherit: true,
		basePower: 100,
	},
	drainpunch: {
		inherit: true,
		basePower: 60,
		pp: 5,
	},
	energyball: {
		inherit: true,
		basePower: 80,
	},
	esperwing: {
		inherit: true,
		basePower: 75,
		accuracy: 90,
	},
	explosion: {
		inherit: true,
		basePower: 170,
	},
	fellstinger: {
		inherit: true,
		basePower: 30,
		shortDesc: "Raises user's Attack by 2 if this KOes the target.",
		desc: "Raises the user's Attack by 2 stages if this move knocks out the target.",
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 2}, pokemon, pokemon, move);
		},
	},
	firepledge: {
		inherit: true,
		basePower: 50,
	},
	firespin: {
		inherit: true,
		basePower: 15,
		accuracy: 75,
	},
	fishiousrend: {
		inherit: true,
		basePower: 80,
	},
	flash: {
		inherit: true,
		accuracy: 70,
	},
	fly: {
		inherit: true,
		basePower: 70,
	},
	flyingpress: {
		inherit: true,
		basePower: 80,
	},
	foresight: {
		inherit: true,
		accuracy: 100,
	},
	freezedry: {
		inherit: true,
		desc: "This move's type effectiveness against Water is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Water.",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: null,
	},
	frostbreath: {
		inherit: true,
		basePower: 40,
	},
	furycutter: {
		inherit: true,
		basePower: 10,
	},
	futuresight: {
		inherit: true,
		basePower: 80,
		accuracy: 90,
	},
	gigadrain: {
		inherit: true,
		basePower: 60,
		pp: 5,
	},
	glare: {
		inherit: true,
		accuracy: 75,
	},
	grasspledge: {
		inherit: true,
		basePower: 50,
	},
	gunkshot: {
		inherit: true,
		accuracy: 70,
	},
	headlongrush: {
		inherit: true,
		basePower: 100,
	},
	healingwish: {
		inherit: true,
		shortDesc: "User faints. Replacement is fully healed.",
		desc: "The user faints and the Pokemon brought out to replace it has its HP fully restored along with having any non-volatile status condition cured. The new Pokemon is sent out immediately and the healing happens after hazards take effect. Fails if the user is the last unfainted Pokemon in its party.",
		flags: {heal: 1, metronome: 1},
		onAfterMove(pokemon) {
			pokemon.switchFlag = true;
		},
		condition: {
			duration: 1,
			onSwitchInPriority: -1,
			onSwitchIn(target) {
				if (target.hp > 0) {
					target.heal(target.maxhp);
					target.clearStatus();
					this.add('-heal', target, target.getHealth, '[from] move: Healing Wish');
					target.side.removeSlotCondition(target, 'healingwish');
					target.lastMove = this.lastMove;
				} else {
					target.switchFlag = true;
				}
			},
		},
	},
	hex: {
		inherit: true,
		basePower: 50,
	},
	highjumpkick: {
		inherit: true,
		basePower: 85,
	},
	iciclespear: {
		inherit: true,
		basePower: 10,
	},
	incinerate: {
		inherit: true,
		basePower: 30,
	},
	ironhead: {
		inherit: true,
		desc: "Has a 20% chance to make the target flinch.",
		shortDesc: "20% chance to make the target flinch.",
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
	},
	jumpkick: {
		inherit: true,
		basePower: 70,
	},
	knockoff: {
		inherit: true,
		basePower: 20,
		shortDesc: "Removes the target's held item.",
		desc: "If the user has not fainted, the target loses its held item. This move cannot cause Pokemon with the Sticky Hold Ability to lose their held item, or force a Giratina, an Arceus, or a Genesect to lose their Griseous Orb, Plate, or Drive, respectively. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
		onBasePower() {},
	},
	lastresort: {
		inherit: true,
		basePower: 130,
	},
	leafblade: {
		inherit: true,
		basePower: 70,
	},
	leechlife: {
		inherit: true,
		basePower: 20,
	},
	leechseed: {
		inherit: true,
		desc: "The Pokemon at the user's position steals 1/16 of the target's maximum HP, rounded down, at the end of each turn. If Big Root is held by the recipient, the HP recovered is 1.3x normal, rounded half down. If the target uses Baton Pass, the replacement will continue being leeched. If the target switches out or uses Mortal Spin or Rapid Spin successfully, the effect ends. Grass-type Pokemon are immune to this move on use, but not its effect.",
		shortDesc: "1/16 of target's HP is restored to user every turn.",
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['leechseed'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 16, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
	},
	lick: {
		inherit: true,
		basePower: 20,
	},
	lockon: {
		inherit: true,
		accuracy: 100,
	},
	lowkick: {
		inherit: true,
		accuracy: 90,
	},
	lowsweep: {
		inherit: true,
		basePower: 60,
	},
	lusterpurge: {
		inherit: true,
		basePower: 70,
	},
	magmastorm: {
		inherit: true,
		accuracy: 70,
	},
	makeitrain: {
		inherit: true,
		accuracy: 95,
	},
	megadrain: {
		inherit: true,
		pp: 10,
	},
	meteormash: {
		inherit: true,
		accuracy: 85,
	},
	mimic: {
		inherit: true,
		accuracy: 100,
	},
	mindreader: {
		inherit: true,
		accuracy: 100,
	},
	mistball: {
		inherit: true,
		basePower: 70,
	},
	moonblast: {
		inherit: true,
		desc: "Has a 10% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "10% chance to lower the target's Sp. Atk by 1.",
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
	},
	mountaingale: {
		inherit: true,
		pp: 5,
	},
	multiattack: {
		inherit: true,
		basePower: 90,
	},
	mysticalfire: {
		inherit: true,
		basePower: 65,
	},
	odorsleuth: {
		inherit: true,
		accuracy: 100,
	},
	outrage: {
		inherit: true,
		basePower: 90,
	},
	painsplit: {
		inherit: true,
		accuracy: 100,
	},
	paraboliccharge: {
		inherit: true,
		basePower: 50,
	},
	petaldance: {
		inherit: true,
		basePower: 70,
	},
	pinmissile: {
		inherit: true,
		basePower: 14,
		accuracy: 85,
	},
	poisonfang: {
		inherit: true,
		shortDesc: "30% chance to badly poison the target.",
		desc: "Has a 30% chance to badly poison the target.",
		secondary: {
			chance: 30,
			status: 'tox',
		},
	},
	poisongas: {
		inherit: true,
		accuracy: 55,
		target: "normal",
	},
	poisonsting: {
		inherit: true,
		shortDesc: "30% chance to poison the target.",
		desc: "Has a 30% chance to poison the target.",
		secondary: {
			chance: 20,
			status: 'psn',
		},
	},
	powergem: {
		inherit: true,
		basePower: 70,
	},
	psychoshift: {
		inherit: true,
		accuracy: 90,
	},
	psywave: {
		inherit: true,
		accuracy: 80,
	},
	ragingfury: {
		inherit: true,
		basePower: 90,
		accuracy: 85,
	},
	rapidspin: {
		inherit: true,
		basePower: 20,
		shortDesc: "Frees user from hazards, binding, Leech Seed.",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field.",
		secondary: null,
	},
	razorwind: {
		inherit: true,
		accuracy: 75,
		shortDesc: "Charges turn 1. Hits turn 2.",
		desc: "This attack charges on the first turn and executes on the second.",
		critRatio: null,
	},
	roar: {
		inherit: true,
		accuracy: 100,
	},
	rockblast: {
		inherit: true,
		accuracy: 80,
	},
	rockslide: {
		inherit: true,
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		secondary: null,
	},
	rocksmash: {
		inherit: true,
		basePower: 20,
	},
	rockthrow: {
		inherit: true,
		accuracy: 65,
	},
	rocktomb: {
		inherit: true,
		basePower: 50,
		accuracy: 80,
		pp: 10,
	},
	saltcure: {
		inherit: true,
		desc: "Causes damage to the target equal to 1/16 of its maximum HP (1/8 if the target is Steel or Water type), rounded down, at the end of each turn during effect. This effect ends when the target is no longer active.",
		shortDesc: "Deals 1/16 max HP each turn; 1/8 on Steel, Water.",
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Salt Cure');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Water', 'Steel']) ? 8 : 16));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Salt Cure');
			},
		},
	},
	sandsearstorm: {
		inherit: true,
		basePower: 95,
		pp: 5,
		target: "normal",
	},
	sandtomb: {
		inherit: true,
		basePower: 15,
		accuracy: 70,
	},
	scaryface: {
		inherit: true,
		accuracy: 90,
	},
	selfdestruct: {
		inherit: true,
		basePower: 130,
	},
	skullbash: {
		inherit: true,
		basePower: 100,
	},
	skyattack: {
		inherit: true,
		shortDesc: "Charges turn 1. Hits turn 2.",
		desc: "This attack charges on the first turn and executes on the second.",
		critRatio: null,
		secondary: null,
	},
	smellingsalts: {
		inherit: true,
		basePower: 60,
	},
	smog: {
		inherit: true,
		basePower: 20,
	},
	snore: {
		inherit: true,
		basePower: 40,
	},
	spikes: {
		inherit: true,
		shortDesc: "Hurts grounded foes on switch-in. Max 1 layer.",
		desc: "Sets up a hazard on the opposing side of the field, causing each opposing Pokemon that switches in to lose 1/8 of their maximum HP, rounded down, unless it is a Flying-type Pokemon. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully.",
		condition: {
			// this is a side condition
			onSideStart(side) {
				if (!this.effectState.layers || this.effectState.layers === 0) {
					this.add('-sidestart', side, 'Spikes');
					this.effectState.layers = 1;
				} else {
					return false;
				}
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 3];
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	springtidestorm: {
		inherit: true,
		basePower: 95,
		target: "normal",
	},
	stockpile: {
		inherit: true,
		pp: 10,
	},
	stormthrow: {
		inherit: true,
		basePower: 40,
	},
	stringshot: {
		inherit: true,
		shortDesc: "Lowers the target's Speed by 1.",
		desc: "Lowers the target's Speed by 1 stage.",
		boosts: {
			spe: -1,
		},
		target: "normal",
	},
	struggle: {
		inherit: true,
		accuracy: 100,
	},
	strugglebug: {
		inherit: true,
		basePower: 30,
	},
	synchronoise: {
		inherit: true,
		basePower: 70,
	},
	tackle: {
		inherit: true,
		basePower: 35,
		accuracy: 95,
	},
	tailglow: {
		inherit: true,
		shortDesc: "Raises the user's Sp. Atk by 2.",
		desc: "Has a 50% chance to raise the user's Defense by 1 stage for each hit.",
		self: {
			boosts: {
				spa: 2,
			},
		},
	},
	technoblast: {
		inherit: true,
		basePower: 85,
	},
	thief: {
		inherit: true,
		basePower: 40,
		pp: 10,
	},
	thrash: {
		inherit: true,
		basePower: 90,
	},
	thunder: {
		inherit: true,
		shortDesc: "10% chance to paralyze the target.",
		desc: "Has a 10% chance to paralyze the target.",
		secondary: {
			chance: 10,
			status: 'par',
		},
	},
	topsyturvy: {
		inherit: true,
		accuracy: 100,
	},
	toxic: {
		inherit: true,
		accuracy: 85,
	},
	triattack: {
		inherit: true,
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		secondary: null,
	},
	triplearrows: {
		inherit: true,
		basePower: 50,
	},
	twineedle: {
		inherit: true,
		shortDesc: "Hits 2 times. Last hit has 20% chance to poison.",
		desc: "Hits twice, with each hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		secondary: {
			chance: 20,
			onHit(target, source, move) {
				if (move.hit === 2) {
					status: 'psn';
				}
			},
		},
	},
	uproar: {
		inherit: true,
		basePower: 50,
	},
	vinewhip: {
		inherit: true,
		basePower: 35,
		pp: 10,
	},
	volttackle: {
		inherit: true,
		shortDesc: "Has 1/3 recoil.",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/3 the HP lost by the target, rounded down, but not less than 1 HP.",
		secondary: null,
	},
	wakeupslap: {
		inherit: true,
		basePower: 60,
	},
	waterfall: {
		inherit: true,
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		secondary: null,
	},
	waterpledge: {
		inherit: true,
		basePower: 50,
	},
	wavecrash: {
		inherit: true,
		basePower: 75,
	},
	whirlpool: {
		inherit: true,
		basePower: 15,
		accuracy: 70,
	},
	whirlwind: {
		inherit: true,
		accuracy: 85,
	},
	wildboltstorm: {
		inherit: true,
		basePower: 95,
		pp: 5,
		target: "normal",
	},
	willowisp: {
		inherit: true,
		accuracy: 75,
	},
	wingattack: {
		inherit: true,
		basePower: 35,
	},
	wrap: {
		inherit: true,
		accuracy: 85,
	},
	zapcannon: {
		inherit: true,
		basePower: 100,
	},
};
