export const Moves: {[moveid: string]: ModdedMoveData} = {
	//World Effects
	cursedfield: { // CURSED FIELD
		name: "Cursed Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Ground",
		shortDesc: "1/8 Dmg on switch-in. Tox after 3 turns. Dark and Ghost immune.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'cursedfield',
		condition: {
			duration: 0,
			onSwitchIn(pokemon) {
				if (pokemon.hasType("Ghost") || pokemon.hoasType("Dark")) return;
				if (pokemon.hasAbility("overcoat")) return;
				this.damage(pokemon.maxhp / 8);
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Cursed Field', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Cursed Field');
				}
			},
			onResidual(field) {
				for (const side of field.battle.sides) {
					for (const pokemon of side.active) {
						if (!pokemon.m.lastField || pokemon.m.lastField !== "cursedfield") {
							pokemon.m.lastField = "cursedfield";
							pokemon.m.fieldTurns = 0;
						}
						pokemon.m.fieldTurns++;
						if (pokemon.m.fieldTurns > pokemon.activeTurns) pokemon.m.fieldTurns = pokemon.activeTurns;
						if (pokemon.m.fieldTurns === 3) {
							if (!pokemon.hasType('Ghost') && !pokemon.hasType('Dark')) {
								pokemon.trySetStatus('tox', pokemon.side.foe.active[0], this.field.getTerrain());
							}
							pokemon.m.fieldTurns = 0;
						}
					}
				}
			},
			onEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Cursed Field');
			},
		},
		secondary: null,
		target: "all",
	},
	
	blessedfield: { // BLESSED FIELD
		name: "Blessed Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Ground",
		shortDesc: "1/8 Heal on switch-in. Status heal after 3 turns. Dark and Ghost unaffected.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'blessedfield',
		condition: {
			duration: 0,
			onSwitchIn(pokemon) {
				if (pokemon.hasType("Ghost") || pokemon.hasType("Dark")) return;
				// if (pokemon.hasAbility("Overcoat")) return;
				this.heal(pokemon.maxhp / 8);
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Blessed Field', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Blessed Field');
				}
			},
			onResidual(field) {
				for (const side of field.battle.sides) {
					for (const pokemon of side.active) {
						if (!pokemon.m.lastField || pokemon.m.lastField !== "blessedfield") {
							pokemon.m.lastField = "blessedfield";
							pokemon.m.fieldTurns = 0;
						}
						pokemon.m.fieldTurns++;
						if (pokemon.m.fieldTurns > pokemon.activeTurns) pokemon.m.fieldTurns = pokemon.activeTurns;
						if (pokemon.m.fieldTurns === 3) {
							if (!pokemon.hasType('Ghost') && !pokemon.hasType('Dark')) {
								pokemon.cureStatus();
							}
							pokemon.m.fieldTurns = 0;
						}
					}
				}
			},
			onEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Blessed Field');
			},
		},
		secondary: null,
		target: "all",
	},
	
	rainofmeteors: { // RAIN OF METEORS
		name: "Rain of Meteors",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Flying",
		shortDesc: "1/8 damage to all active Pokemon each turn. Rock and Steel take 1/16.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'rainofmeteors',
		condition: {
			duration: 0,
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Rain of Meteors', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Rain of Meteors');
				}
			},
			onResidual(field) {
				for (const side of field.battle.sides) {
					for (const pokemon of side.active) {
						if (!pokemon.m.lastField || pokemon.m.lastField !== "rainofmeteors") {
							pokemon.m.lastField = "rainofmeteors";
							pokemon.m.fieldTurns = 0;
						}
						let dmgDiv = 8;
						if (pokemon.hasAbility("overcoat") || pokemon.hasType("Rock") || pokemon.hasType("Steel")) dmgDiv = 16;
						pokemon.damage(pokemon.maxhp / dmgDiv);
					}
				}
				
			},
			onEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Rain of Meteors');
			},
		},
		secondary: null,
		target: "all",
	},
	
	rainofdew: { // RAIN OF DEW
		name: "Rain of Dew",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Flying",
		shortDesc: "1/8 damage to all active Pokemon each turn. Rock and Steel take 1/16.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'rainofdew',
		condition: {
			duration: 0,
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Rain of Dew', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Rain of Dew');
				}
			},
			onResidual(field) {
				for (const side of field.battle.sides) {
					for (const pokemon of side.active) {
						if (!pokemon.m.lastField || pokemon.m.lastField !== "rainofdew") {
							pokemon.m.lastField = "rainofdew";
							pokemon.m.fieldTurns = 0;
						}
						let dmgDiv = 16;
						if (pokemon.hasAbility("Rain Dish")) dmgDiv = 8;
						pokemon.heal(pokemon.maxhp / dmgDiv);
					}
				}
				
			},
			onEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Rain of Dew');
			},
		},
		secondary: null,
		target: "all",
	},
	
	silentdomain: { // SILENT DOMAIN
		name: "Silent Domain",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Psychic",
		shortDesc: "Reduces stat changes each turn. No Sound Moves or Critical Hits.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'silentdomain',
		condition: {
			duration: 0,
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Silent Domain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Silent Domain');
				}
			},
			onCriticalHit: false,
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
			onResidual(field) {
				for (const side of field.battle.sides) {
					for (const pokemon of side.active) {
						if (!pokemon.m.lastField || pokemon.m.lastField !== "silentdomain") {
							pokemon.m.lastField = "silentdomain";
							pokemon.m.fieldTurns = 0;
						}
						const toBoost = {};
						for (const boost in pokemon.boosts) {
							if (pokemon.boosts[boost] > 0) toBoost[boost] = -1;
							else if (pokemon.boosts[boost] < 0) toBoost[boost] = 1;
						}
						this.boost(toBoost, target, source, null, true, false);
					}
				}
			},
			onEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Silent Domain');
			},
		},
		secondary: null,
		target: "all",
	},
	
	
	
	// Custom Moves
	shedtail: {
		num: 880,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shed Tail",
		pp: 10,
		priority: 0,
		flags: {},
		shortDesc: "Sac 12.5% HP, switch, heal ally 25%. Ally: 50% dmg redux this turn.",
		onTryHit(source) {
			if (!this.canSwitch(source.side)) {
				this.add('-fail', source);
				return this.NOT_FAIL;
			}
			if (source.hp <= Math.ceil(source.maxhp / 8)) {
				this.add('-fail', source, 'move: Shed Tail', '[weak]');
				return this.NOT_FAIL;
			}
		},
		onHit(target) {
			this.directDamage(Math.ceil(target.maxhp / 8));
		},
		slotCondition: 'shedtail',
		condition: {
			duration: 1,
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.maxhp / 4);
					this.add('-heal', target, target.getHealth, '[from] move: Healing Wish');
				}
			},
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onModifySpD(spd, pokemon) {
				return this.chainModify(2);
			},
		},
		selfSwitch: 'shedtail',
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
	},
	energysiphon: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Energy Siphon",
		shortDesc: "Drains target's HP for 3 turns.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, contact: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		volatileStatus: 'energysiphon',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fell Stinger", target);
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Energy Siphon');
			},
			duration: 3,
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['energysiphon'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					console.log('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage / 2, target, pokemon);
				}
			},
		},
	},
	// Modified Status Moves
	sheercold: {
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Sheer Cold",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'frz',
		shortDesc: "Inflicts Freeze status on the opponent (1/16 Residual damage, halved SpA).",
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
		viable: true,
	},
	spore: {
		inherit: true,
		pp: 10,
		desc: "Puts the opponent to sleep for 1 turn",
	},
	sleeppowder: {
		inherit: true,
		pp: 15,
		accuracy: 90,
		desc: "Puts the opponent to sleep for 1 turn",
	},
	hypnosis: {
		inherit: true,
		pp: 20,
		accuracy: 85,
		desc: "Puts the opponent to sleep for 1 turn",
	},
	grasswhistle: {
		inherit: true,
		isNonstandard: null,
		pp: 25,
		accuracy: 80,
		desc: "Puts the opponent to sleep for 1 turn",
	},
	
	
	karatechop: {
		inherit: true,
		isNonstandard: null,
	},
	doubleslap: {
		inherit: true,
		isNonstandard: null,
	},
	cometpunch: {
		inherit: true,
		isNonstandard: null,
	},
	razorwind: {
		inherit: true,
		isNonstandard: null,
	},
	jumpkick: {
		inherit: true,
		isNonstandard: null,
	},
	rollingkick: {
		inherit: true,
		isNonstandard: null,
	},
	twineedle: {
		inherit: true,
		isNonstandard: null,
	},
	sonicboom: {
		inherit: true,
		isNonstandard: null,
	},
	submission: {
		inherit: true,
		isNonstandard: null,
	},
	dragonrage: {
		inherit: true,
		isNonstandard: null,
	},
	meditate: {
		inherit: true,
		isNonstandard: null,
	},
	rage: {
		inherit: true,
		isNonstandard: null,
	},
	barrier: {
		inherit: true,
		isNonstandard: null,
	},
	bide: {
		inherit: true,
		isNonstandard: null,
	},
	mirrormove: {
		inherit: true,
		isNonstandard: null,
	},
	eggbomb: {
		inherit: true,
		isNonstandard: null,
	},
	boneclub: {
		inherit: true,
		isNonstandard: null,
	},
	clamp: {
		inherit: true,
		isNonstandard: null,
	},
	skullbash: {
		inherit: true,
		isNonstandard: null,
	},
	spikecannon: {
		inherit: true,
		isNonstandard: null,
	},
	constrict: {
		inherit: true,
		isNonstandard: null,
	},
	kinesis: {
		inherit: true,
		isNonstandard: null,
	},
	barrage: {
		inherit: true,
		isNonstandard: null,
	},
	lovelykiss: {
		inherit: true,
		isNonstandard: null,
	},
	bubble: {
		inherit: true,
		isNonstandard: null,
	},
	dizzypunch: {
		inherit: true,
		isNonstandard: null,
	},
	flash: {
		inherit: true,
		isNonstandard: null,
	},
	psywave: {
		inherit: true,
		isNonstandard: null,
	},
	bonemerang: {
		inherit: true,
		isNonstandard: null,
	},
	hyperfang: {
		inherit: true,
		isNonstandard: null,
	},
	sharpen: {
		inherit: true,
		isNonstandard: null,
	},
	conversion: {
		inherit: true,
		isNonstandard: null,
	},
	sketch: {
		inherit: true,
		isNonstandard: null,
	},
	triplekick: {
		inherit: true,
		isNonstandard: null,
	},
	spiderweb: {
		inherit: true,
		isNonstandard: null,
	},
	mindreader: {
		inherit: true,
		isNonstandard: null,
	},
	nightmare: {
		inherit: true,
		isNonstandard: null,
	},
	conversion2: {
		inherit: true,
		isNonstandard: null,
	},
	aeroblast: {
		inherit: true,
		isNonstandard: null,
	},
	feintattack: {
		inherit: true,
		isNonstandard: null,
	},
	octazooka: {
		inherit: true,
		isNonstandard: null,
	},
	foresight: {
		inherit: true,
		isNonstandard: null,
	},
	return: {
		inherit: true,
		isNonstandard: null,
	},
	frustration: {
		inherit: true,
		isNonstandard: null,
	},
	sacredfire: {
		inherit: true,
		isNonstandard: null,
	},
	magnitude: {
		inherit: true,
		isNonstandard: null,
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	vitalthrow: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	hail: {
		inherit: true,
		isNonstandard: null,
	},
	smellingsalts: {
		inherit: true,
		isNonstandard: null,
	},
	naturepower: {
		inherit: true,
		isNonstandard: null,
	},
	assist: {
		inherit: true,
		isNonstandard: null,
	},
	magiccoat: {
		inherit: true,
		isNonstandard: null,
	},
	revenge: {
		inherit: true,
		isNonstandard: null,
	},
	refresh: {
		inherit: true,
		isNonstandard: null,
	},
	grudge: {
		inherit: true,
		isNonstandard: null,
	},
	snatch: {
		inherit: true,
		isNonstandard: null,
	},
	secretpower: {
		inherit: true,
		isNonstandard: null,
	},
	camouflage: {
		inherit: true,
		isNonstandard: null,
	},
	tailglow: {
		inherit: true,
		isNonstandard: null,
	},
	lusterpurge: {
		inherit: true,
		isNonstandard: null,
	},
	mistball: {
		inherit: true,
		isNonstandard: null,
	},
	mudsport: {
		inherit: true,
		isNonstandard: null,
	},
	iceball: {
		inherit: true,
		isNonstandard: null,
	},
	needlearm: {
		inherit: true,
		isNonstandard: null,
	},
	aromatherapy: {
		inherit: true,
		isNonstandard: null,
	},
	odorsleuth: {
		inherit: true,
		isNonstandard: null,
	},
	silverwind: {
		inherit: true,
		isNonstandard: null,
	},
	signalbeam: {
		inherit: true,
		isNonstandard: null,
	},
	skyuppercut: {
		inherit: true,
		isNonstandard: null,
	},
	watersport: {
		inherit: true,
		isNonstandard: null,
	},
	doomdesire: {
		inherit: true,
		isNonstandard: null,
	},
	psychoboost: {
		inherit: true,
		isNonstandard: null,
	},
	miracleeye: {
		inherit: true,
		isNonstandard: null,
	},
	wakeupslap: {
		inherit: true,
		isNonstandard: null,
	},
	naturalgift: {
		inherit: true,
		isNonstandard: null,
	},
	embargo: {
		inherit: true,
		isNonstandard: null,
	},
	psychoshift: {
		inherit: true,
		isNonstandard: null,
	},
	trumpcard: {
		inherit: true,
		isNonstandard: null,
	},
	healblock: {
		inherit: true,
		isNonstandard: null,
	},
	wringout: {
		inherit: true,
		isNonstandard: null,
	},
	luckychant: {
		inherit: true,
		isNonstandard: null,
	},
	mefirst: {
		inherit: true,
		isNonstandard: null,
	},
	punishment: {
		inherit: true,
		isNonstandard: null,
	},
	mudbomb: {
		inherit: true,
		isNonstandard: null,
	},
	mirrorshot: {
		inherit: true,
		isNonstandard: null,
	},
	rockclimb: {
		inherit: true,
		isNonstandard: null,
	},
	rockwrecker: {
		inherit: true,
		isNonstandard: null,
	},
	magnetbomb: {
		inherit: true,
		isNonstandard: null,
	},
	captivate: {
		inherit: true,
		isNonstandard: null,
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
	},
	healorder: {
		inherit: true,
		isNonstandard: null,
	},
	crushgrip: {
		inherit: true,
		isNonstandard: null,
	},
	darkvoid: {
		inherit: true,
		isNonstandard: null,
	},
	seedflare: {
		inherit: true,
		isNonstandard: null,
	},
	ominouswind: {
		inherit: true,
		isNonstandard: null,
	},
	autotomize: {
		inherit: true,
		isNonstandard: null,
	},
	telekinesis: {
		inherit: true,
		isNonstandard: null,
	},
	stormthrow: {
		inherit: true,
		isNonstandard: null,
	},
	flameburst: {
		inherit: true,
		isNonstandard: null,
	},
	synchronoise: {
		inherit: true,
		isNonstandard: null,
	},
	chipaway: {
		inherit: true,
		isNonstandard: null,
	},
	skydrop: {
		inherit: true,
		isNonstandard: null,
	},
	bestow: {
		inherit: true,
		isNonstandard: null,
	},
	dualchop: {
		inherit: true,
		isNonstandard: null,
	},
	heartstamp: {
		inherit: true,
		isNonstandard: null,
	},
	leaftornado: {
		inherit: true,
		isNonstandard: null,
	},
	steamroller: {
		inherit: true,
		isNonstandard: null,
	},
	headcharge: {
		inherit: true,
		isNonstandard: null,
	},
	geargrind: {
		inherit: true,
		isNonstandard: null,
	},
	searingshot: {
		inherit: true,
		isNonstandard: null,
	},
	technoblast: {
		inherit: true,
		isNonstandard: null,
	},
	secretsword: {
		inherit: true,
		isNonstandard: null,
	},
	glaciate: {
		inherit: true,
		isNonstandard: null,
	},
	boltstrike: {
		inherit: true,
		isNonstandard: null,
	},
	blueflare: {
		inherit: true,
		isNonstandard: null,
	},
	freezeshock: {
		inherit: true,
		isNonstandard: null,
	},
	iceburn: {
		inherit: true,
		isNonstandard: null,
	},
	fusionflare: {
		inherit: true,
		isNonstandard: null,
	},
	fusionbolt: {
		inherit: true,
		isNonstandard: null,
	},
	matblock: {
		inherit: true,
		isNonstandard: null,
	},
	rototiller: {
		inherit: true,
		isNonstandard: null,
	},
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	iondeluge: {
		inherit: true,
		isNonstandard: null,
	},
	forestscurse: {
		inherit: true,
		isNonstandard: null,
	},
	topsyturvy: {
		inherit: true,
		isNonstandard: null,
	},
	craftyshield: {
		inherit: true,
		isNonstandard: null,
	},
	flowershield: {
		inherit: true,
		isNonstandard: null,
	},
	electrify: {
		inherit: true,
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	venomdrench: {
		inherit: true,
		isNonstandard: null,
	},
	powder: {
		inherit: true,
		isNonstandard: null,
	},
	geomancy: {
		inherit: true,
		isNonstandard: null,
	},
	poweruppunch: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	thousandarrows: {
		inherit: true,
		isNonstandard: null,
	},
	thousandwaves: {
		inherit: true,
		isNonstandard: null,
	},
	landswrath: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	sparklingaria: {
		inherit: true,
		isNonstandard: null,
	},
	floralhealing: {
		inherit: true,
		isNonstandard: null,
	},
	spotlight: {
		inherit: true,
		isNonstandard: null,
	},
	toxicthread: {
		inherit: true,
		isNonstandard: null,
	},
	laserfocus: {
		inherit: true,
		isNonstandard: null,
	},
	gearup: {
		inherit: true,
		isNonstandard: null,
	},
	anchorshot: {
		inherit: true,
		isNonstandard: null,
	},
	purify: {
		inherit: true,
		isNonstandard: null,
	},
	coreenforcer: {
		inherit: true,
		isNonstandard: null,
	},
	beakblast: {
		inherit: true,
		isNonstandard: null,
	},
	clangingscales: {
		inherit: true,
		isNonstandard: null,
	},
	dragonhammer: {
		inherit: true,
		isNonstandard: null,
	},
	shelltrap: {
		inherit: true,
		isNonstandard: null,
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
	},
	prismaticlaser: {
		inherit: true,
		isNonstandard: null,
	},
	spectralthief: {
		inherit: true,
		isNonstandard: null,
	},
	sunsteelstrike: {
		inherit: true,
		isNonstandard: null,
	},
	moongeistbeam: {
		inherit: true,
		isNonstandard: null,
	},
	naturesmadness: {
		inherit: true,
		isNonstandard: null,
	},
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	mindblown: {
		inherit: true,
		isNonstandard: null,
	},
	plasmafists: {
		inherit: true,
		isNonstandard: null,
	},
	photongeyser: {
		inherit: true,
		isNonstandard: null,
	},
	doubleironbash: {
		inherit: true,
		isNonstandard: null,
	},
	maxguard: {
		inherit: true,
		isNonstandard: null,
	},
	octolock: {
		inherit: true,
		isNonstandard: null,
	},
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	clangoroussoul: {
		inherit: true,
		isNonstandard: null,
	},
	decorate: {
		inherit: true,
		isNonstandard: null,
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
	},
	aurawheel: {
		inherit: true,
		isNonstandard: null,
	},
	strangesteam: {
		inherit: true,
		isNonstandard: null,
	},
	obstruct: {
		inherit: true,
		isNonstandard: null,
	},
	meteorassault: {
		inherit: true,
		isNonstandard: null,
	},
	eternabeam: {
		inherit: true,
		isNonstandard: null,
	},
};
