export const Moves: {[k: string]: ModdedMoveData} = {
	aquaticlight: {
		num: 100001,
		accuracy: 100,
		shortDesc: "20% chance to paralyze",
		basePower: 100,
		category: "Special",
		name: "Aquatic Light",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	stonedance: {
		num: 100002,
		accuracy: 100,
		shortDesc: "30% chance to paralyze",
		basePower: 85,
		category: "Special",
		name: "Stone Dance",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	xyzalphabeam: {
		num: 100003,
		accuracy: 100,
		shortDesc: "Lowers the foe's highest stat.",
		basePower: 90,
		category: "Special",
		name: "XYZ-Alpha Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				this.boost({[statName]: -1}, target);
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	hydroustoxin: {
		num: 100004,
		accuracy: 100,
		shortDesc: "Automatically crits against poisoned foes.",
		basePower: 80,
		category: "Special",
		name: "Hydrous Toxin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		onModifyMove(move, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) move.critRatio = 5;
		},
	},
	tranbeam: {
		num: 100005,
		shortDesc: "Changes opponent's type to Normal",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Tran Beam",
		pp: 10,
		onHit(target) {
			if (target.getTypes().join() === 'Normal' || !target.setType('Normal')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Normal');
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	musicalrenaissance: {
		num: 100006,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Musical Renaissance",
		shortDesc: "Changes the user's ability from Orichalcum Pulse to Hadron Engine and vice versa.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
		onModifyType(move, pokemon) {
			switch (pokemon.ability) {
			case 'orichalcumpulse':
				move.type = 'Fire';
				break;
			case 'hadronengine':
				move.type = 'Electric';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.ability === 'orichalcumpulse') move.category = "Physical";
		},
		onHit(target, source, move) {
			switch (source.ability) {
			case 'orichalcumpulse':
				source.setAbility('hadronengine');
				break;
			case 'hadronengine':
				source.setAbility('orichalcumpulse');
				break;
			}
		}
	},
	// Slate 2
	aminoacid: {
		num: 100007,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Amino Acid",
		shortDesc: "After hitting, averages user and target's HP.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, allyanim: 1, metronome: 1},
		onAfterHit(target, pokemon) {
			const targetHP = target.getUndynamaxedHP();
			const averagehp = Math.floor((targetHP + pokemon.hp) / 2) || 1;
			const targetChange = targetHP - averagehp;
			target.sethp(target.hp - targetChange);
			this.add('-sethp', target, target.getHealth, '[from] move: Amino Acid', '[silent]');
			pokemon.sethp(averagehp);
			this.add('-sethp', pokemon, pokemon.getHealth, '[from] move: Amino Acid');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	crystallize: {
		num: 349,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystallize",
		shortDesc: "Boosts Def and Spe by 1.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			def: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Rock",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	flareup: {
		num: 100008,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Flare-Up",
		shortDesc: "+1 Priority. 10% chance to Burn.",
		pp: 15,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacent",
		type: "Fire",
		contestType: "Tough",
	},
	maelstrom: {
		num: 100009,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Maelstrom",
		shortDesc: "Changes foe's ability to Desolate Land",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Water",
		contestType: "Beautiful",
		onHit(target, source, move){
			target.setAbility("desolateland");
		},
	},
	papercut: {
		num: 100010,
		accuracy: true,
		basePower: 70,
		category: "Physical",
		name: "Paper Cut",
		shortDesc: "Always hits, always lands a critical hit.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, slicing: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	reapandsow: {
		num: 100011,
		name: "Reap and Sow",
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 15,
		type: "Ghost",
		shortDesc: "If it faints a pokemon, sets Grassy Terrain",
		priority: 0,
		flags: {contact: 1, slicing: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.field.setTerrain('grassyterrain');
		},
		target: "normal",
		secondary: null,
	},
	selfimagebreak: {
		num: 100016,
		basePower: 70,
		category: "Special",
		accuracy: 85,
		pp: 5,
		name: "Self-Image Break",
		shortDesc: "Traps 4-5 turns, lowers SpD each turn",
		volatileStatus: 'selfimagebreak',
		condition: {
			name: 'selfimagebreak',
			duration: 5,
			durationCallback(target, source) {
				if (source?.hasItem('gripclaw')) return 8;
				return this.random(4, 5);
			},
			onStart(pokemon, source) {
				this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				const source = this.effectState.source;
				// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
				const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
					delete pokemon.volatiles['selfimagebreak'];
					this.add('-end', pokemon, this.effectState.sourceEffect, '[selfimagebreak]', '[silent]');
					return;
				}
				this.boost({spd: -1});
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, this.effectState.sourceEffect, '[selfimagebreak]');
			},
			onTrapPokemon(pokemon) {
				const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
				if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	slideout: {
		num: 100012,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Slide Out",
		shortDesc: "User switches out.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	smite: {
		num: 100013,
		accuracy: true,
		basePower: 80,
		category: "Physical",
		name: "Smite",
		shortDesc: "Never misses.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	sparklingslice: {
		num: 100014,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		name: "Sparkling Slice",
		shortDesc: "50% chance to lower foe's Atk and SpA.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, slicing: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 50,
			boosts: {
				spa: -1,
				atk: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	sporeeruption: {
		num: 100015,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Spore Eruption",
		shortDesc: "If the opponent makes contact, sets Leech Seed.",
		pp: 15,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, bullet: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('sporeeruption');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Spore Eruption');
			},
			onHit(target, source, move) {
				if (this.checkMoveMakesContact(move, source, target) && !target.hasType('Grass')) {
					target.addVolatile('leechseed', source);
				}
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('beakblast')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('sporeeruption');
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	// Dexin't
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
	grasswhistle: {
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
