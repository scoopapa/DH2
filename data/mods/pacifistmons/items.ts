export const Items: {[itemid: string]: ModdedItemData} = {
	eviolite: {
		inherit: true,
		shortDesc: "If holder's species can evolve, it takes halved damage from indirect sources.",
		fling: {
			effect(target) {
				if (target.baseSpecies.prevo) target.formeChange(target.baseSpecies.prevo, this.effect, true);
			},
		},
		onDamage(damage, target, source, effect) {
			if (target.baseSpecies.nfe && effect.effectType !== 'Move') {
				return Math.floor(damage / 2);
			}
		},
	},
	gripclaw: {
		inherit: true,
		rating: 3,
		shortDesc: "Holder's trapping moves last 4 turns instead of 2.",
		fling: {
			effect(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
				if (target.volatiles['trapped']) target.volatiles['trapped'].duration = 5;
			},
		},
		//handled in conditions
	},
	spelltag: {
		inherit: true,
		rating: 3,
		shortDesc: "Holder is treated as a Ghost-type when using Curse.",
		onBasePower: null,
		fling: {
			effect(target) {
				target.addVolatile('perishsong');
			},
		},
		//handled in moves
	},
	stunseed: {
		name: "Stun Seed",
		rating: 3,
		shortDesc: "Opponent is inflicted with Stun if the holder faints.",
		desc: "Opponent is inflicted with Stun if the holder faints.",
		fling: {
			volatileStatus: "stun",
		},
		onFaint(pokemon) {
			if (pokemon.adjacentFoes().length == 0) return;
			const foe = pokemon.adjacentFoes()[0];
			foe.addVolatile('stun');
		},
	},
	fullincense: {
		inherit: true,
		rating: 2,
		fling: {
			status: 'slp',
		},
	},
	nevermeltice: {
		inherit: true,
		rating: 3,
		shortDesc: "Holder is immune to Taunt if it is Ice-type.",
		fling: {
			status: 'frz',
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'taunt' && pokemon.hasType("Ice")) return null;
		},
	},
	energyroot: {
		name: "Energy Root",
		rating: 2,
		shortDesc: "Restores 1/2 max HP if at 1/2 max HP or less, but purifies the user.",
		desc: "Restores 1/2 max HP if at 1/2 max HP or less, but purifies the user.",
		fling: {
			status: 'pur',
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			pokemon.setStatus('pur');
		},
	},
	zygardite: {
		name: "Zygardite",
		spritenum: 568,
		megaEvolves: "Zygarde-Complete",
		megaStone: "Zygarde-Mega",
		itemUser: ["Zygarde-Complete"],
		shortDesc: "If held by a Zygarde-Complete, this item allows it to Mega Evolve in battle.",
		desc: "If held by a Zygarde-Complete, this item allows it to Mega Evolve in battle.",
		onTakeItem(item, source) {
			return source.baseSpecies.baseSpecies !== 'Zygarde';
		},
	},

	/*
	//Good
	airballoon: {
		inherit: true,
		rating: 3,
	},
	blacksludge: {
		inherit: true,
		rating: 3,
	},

	//Ok
	lightball: {
		inherit: true,
		rating: 2,
	},

	//Bad
	assaultvest: {
		inherit: true,
		rating: 1,
	},
	berryjuice: {
		inherit: true,
		rating: 0,
	},
	choicescarf: {
		inherit: true,
		rating: 0,
	},
	choicespecs: {
		inherit: true,
		rating: 0,
	},
	flyinggem: {
		inherit: true,
		rating: 0,
	},
	focussash: {
		inherit: true,
		rating: 0,
	},
	lifeorb: {
		inherit: true,
		rating: 0,
	},
	powerherb: {
		inherit: true,
		rating: 0,
	},
	rockyhelmet: {
		inherit: true,
		rating: 0,
	},
	absorbbulb: {
		inherit: true,
		rating: 0,
	},
	apicot: {
		inherit: true,
		rating: 0,
	},
	babiriberry: {
		inherit: true,
		rating: 0,
	},
	berserkgene: {
		inherit: true,
		rating: 0,
	},
	blackbelt: {
		inherit: true,
		rating: 0,
	},
	blackglasses: {
		inherit: true,
		rating: 0,
	},
	blunderpolicy: {
		inherit: true,
		rating: 0,
	},
	brightpowder: {
		inherit: true,
		rating: 0,
	},
	buggem: {
		inherit: true,
		rating: 0,
	},
	cellbattery: {
		inherit: true,
		rating: 0,
	},
	charcoal: {
		inherit: true,
		rating: 0,
	},
	chartiberry: {
		inherit: true,
		rating: 0,
	},
	chilanberry: {
		inherit: true,
		rating: 0,
	},
	clearamulet: {
		inherit: true,
		rating: 0,
	},
	cobaberry: {
		inherit: true,
		rating: 0,
	},
	covertcloak: {
		inherit: true,
		rating: 0,
	},
	darkgem: {
		inherit: true,
		rating: 0,
	},
	dracoplate: {
		inherit: true,
		rating: 0,
	},
	dragonfang: {
		inherit: true,
		rating: 0,
	},
	dragongem: {
		inherit: true,
		rating: 0,
	},
	dreadplate: {
		inherit: true,
		rating: 0,
	},
	earthplate: {
		inherit: true,
		rating: 0,
	},
	ejectbutton: {
		inherit: true,
		rating: 0,
	},
	ejectpack: {
		inherit: true,
		rating: 0,
	},
	electricgem: {
		inherit: true,
		rating: 0,
	},
	electricseed: {
		inherit: true,
		rating: 0,
	},
	fairyfeather: {
		inherit: true,
		rating: 0,
	},
	fairygem: {
		inherit: true,
		rating: 0,
	},
	fightinggem: {
		inherit: true,
		rating: 0,
	},
	firegem: {
		inherit: true,
		rating: 0,
	},
	fistplate: {
		inherit: true,
		rating: 0,
	},
	flameplate: {
		inherit: true,
		rating: 0,
	},
	galaricacuff: {
		inherit: true,
		rating: 0,
	},
	galaricawreath: {
		inherit: true,
		rating: 0,
	},
	ganlonberry: {
		inherit: true,
		rating: 0,
	},
	ghostgem: {
		inherit: true,
		rating: 0,
	},
	goldberry: {
		inherit: true,
		rating: 0,
	},
	grassgem: {
		inherit: true,
		rating: 0,
	},
	groundgem: {
		inherit: true,
		rating: 0,
	},
	habanberry: {
		inherit: true,
		rating: 0,
	},
	icegem: {
		inherit: true,
		rating: 0,
	},
	icicleplate: {
		inherit: true,
		rating: 0,
	},
	insectplate: {
		inherit: true,
		rating: 0,
	},
	ironplate: {
		inherit: true,
		rating: 0,
	},
	jabocaberry: {
		inherit: true,
		rating: 0,
	},
	kasibberry: {
		inherit: true,
		rating: 0,
	},
	kebiaberry: {
		inherit: true,
		rating: 0,
	},
	keeberry: {
		inherit: true,
		rating: 0,
	},
	lansatberry: {
		inherit: true,
		rating: 0,
	},
	laxincense: {
		inherit: true,
		rating: 0,
	},	
	liechiberry: {
		inherit: true,
		rating: 0,
	},
	lightclay: {
		inherit: true,
		rating: 0,
	},
	loadeddice: {
		inherit: true,
		rating: 0,
	},
	luminousmoss: {
		inherit: true,
		rating: 0,
	},
	magnet: {
		inherit: true,
		rating: 0,
	},
	mail: {
		inherit: true,
		rating: 0,
	},
	marangaberry: {
		inherit: true,
		rating: 0,
	},
	meadowplate: {
		inherit: true,
		rating: 0,
	},
	metalalloy: {
		inherit: true,
		rating: 0,
	},
	metalcoat: {
		inherit: true,
		rating: 0,
	},
	metronome: {
		inherit: true,
		rating: 0,
	},
	micleberry: {
		inherit: true,
		rating: 0,
	},
	mindplate: {
		inherit: true,
		rating: 0,
	},
	mintberry: {
		inherit: true,
		rating: 0,
	},
	miracleberry: {
		inherit: true,
		rating: 0,
	},
	miracleseed: {
		inherit: true,
		rating: 0,
	},
	mirrorherb: {
		inherit: true,
		rating: 0,
	},
	mistyseed: {
		inherit: true,
		rating: 0,
	},
	muscleband: {
		inherit: true,
		rating: 0,
	},
	mysteryberry: {
		inherit: true,
		rating: 0,
	},
	mysticwater: {
		inherit: true,
		rating: 0,
	},
	normalgem: {
		inherit: true,
		rating: 0,
	},
	occaberry: {
		inherit: true,
		rating: 0,
	},
	oddincense: {
		inherit: true,
		rating: 0,
	},
	passhoberry: {
		inherit: true,
		rating: 0,
	},
	payapaberry: {
		inherit: true,
		rating: 0,
	},
	petayaberry: {
		inherit: true,
		rating: 0,
	},
	pinkbow: {
		inherit: true,
		rating: 0,
	},
	pixieplate: {
		inherit: true,
		rating: 0,
	},
	poisongem: {
		inherit: true,
		rating: 0,
	},
	polkadotbow: {
		inherit: true,
		rating: 0,
	},
	protectivepads: {
		inherit: true,
		rating: 0,
	},
	psychicgem: {
		inherit: true,
		rating: 0,
	},
	psychicseed: {
		inherit: true,
		rating: 0,
	},
	punchingglove: {
		inherit: true,
		rating: 0,
	},
	quickclaw: {
		inherit: true,
		rating: 0,
	},
	razorclaw: {
		inherit: true,
		rating: 0,
	},
	razorfang: {
		inherit: true,
		rating: 0,
	},
	redcard: {
		inherit: true,
		rating: 0,
	},
	rindoberry: {
		inherit: true,
		rating: 0,
	},
	ringtarget: {
		inherit: true,
		rating: 0,
	},
	rockgem: {
		inherit: true,
		rating: 0,
	},
	rockincense: {
		inherit: true,
		rating: 0,
	},
	roseincense: {
		inherit: true,
		rating: 0,
	},
	roseliberry: {
		inherit: true,
		rating: 0,
	},
	scopelens: {
		inherit: true,
		rating: 0,
	},
	seaincense: {
		inherit: true,
		rating: 0,
	},
	shucaberry: {
		inherit: true,
		rating: 0,
	},
	shellbell: {
		inherit: true,
		rating: 0,
	},
	silkscarf: {
		inherit: true,
		rating: 0,
	},
	silverpowder: {
		inherit: true,
		rating: 0,
	},
	skyplate: {
		inherit: true,
		rating: 0,
	},
	snowball: {
		inherit: true,
		rating: 0,
	},
	softsand: {
		inherit: true,
		rating: 0,
	},
	splashplate: {
		inherit: true,
		rating: 0,
	},
	spookyplate: {
		inherit: true,
		rating: 0,
	},
	starfberry: {
		inherit: true,
		rating: 0,
	},
	steelgem: {
		inherit: true,
		rating: 0,
	},
	stickybarb: {
		inherit: true,
		rating: 0,
	},
	stoneplate: {
		inherit: true,
		rating: 0,
	},
	tangaberry: {
		inherit: true,
		rating: 0,
	},
	throatspray: {
		inherit: true,
		rating: 0,
	},
	toxicplate: {
		inherit: true,
		rating: 0,
	},
	twistedspoon: {
		inherit: true,
		rating: 0,
	},
	utilityumbrella: {
		inherit: true,
		rating: 0,
	},
	wacanberry: {
		inherit: true,
		rating: 0,
	},
	watergem: {
		inherit: true,
		rating: 0,
	},
	waveincense: {
		inherit: true,
		rating: 0,
	},
	weaknesspolicy: {
		inherit: true,
		rating: 0,
	},
	whiteherb: {
		inherit: true,
		rating: 0,
	},
	widelens: {
		inherit: true,
		rating: 0,
	},
	wiseglasses: {
		inherit: true,
		rating: 0,
	},
	yacheberry: {
		inherit: true,
		rating: 0,
	},
	zapplate: {
		inherit: true,
		rating: 0,
	},
	zoomlens: {
		inherit: true,
		rating: 0,
	},*/
};
