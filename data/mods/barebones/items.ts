export const Items: {[itemid: string]: ModdedItemData} = {
	pinchberry: {
		name: "Pinch Berry",
		shortDesc: "Restores 1/3 max HP at 1/3 max HP or less. Single use.",
		spritenum: 448,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Stellar",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 3);
		},
		num: -1,
		gen: 9,
		rating: 3,
	},
	
	tsersiberry: {
		name: "Tsersi Berry",
		shortDesc: "Halves damage taken from a super-effective attack. Single use.",
		spritenum: 124,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Stellar",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: -2,
		gen: 9,
		rating: 3,
	},
	
	exchanger: {
		name: "Exchanger",
		shortDesc: "Holder has 1.25x Speed, but also has 0.75x Attack and Sp. Attack.",
		spritenum: 137,
		fling: {
			basePower: 10,
		},
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.2);
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			return this.chainModify(0.8);
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			return this.chainModify(0.8);
		},
		num: -3,
		gen: 9,
		rating: 3,
	},
	//To get allowed items to show up higher
	/*
	silkscarf: {
		inherit: true,
		rating: 3,
	},	
	charcoal: {
		inherit: true,
		rating: 3,
	},	
	mysticwater: {
		inherit: true,
		rating: 3,
	},	
	miracleseed: {
		inherit: true,
		rating: 3,
	},	
	magnet: {
		inherit: true,
		rating: 3,
	},	
	nevermeltice: {
		inherit: true,
		rating: 3,
	},
	blackbelt: {
		inherit: true,
		rating: 3,
	},	
	poisonbarb: {
		inherit: true,
		rating: 3,
	},	
	softsand: {
		inherit: true,
		rating: 3,
	},	
	sharpbeak: {
		inherit: true,
		rating: 3,
	},	
	twistedspoon: {
		inherit: true,
		rating: 3,
	},	
	silverpowder: {
		inherit: true,
		rating: 3,
	},	
	hardstone: {
		inherit: true,
		rating: 3,
	},	
	spelltag: {
		inherit: true,
		rating: 3,
	},
	dragonfang: {
		inherit: true,
		rating: 3,
	},	
	blackglasses: {
		inherit: true,
		rating: 3,
	},
	metalcoat: {
		inherit: true,
		rating: 3,
	},
	fairyfeather: {
		inherit: true,
		rating: 3,
	},
	*/
	
	//Just to hide items away (mainly Popular Items, and some others), they are already banned in config/format.ts
	//Doing this until there is a better way to hide illegal items
	lifeorb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	choicescarf: {
		inherit: true,
		isNonstandard: 'Unobtainable', 
	},	
	choiceband: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	choicespecs: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	heavydutyboots: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	assaultvest: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	rockyhelmet: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	eviolite: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	expertbelt: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	salacberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	aguavberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	figyberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	iapapaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	magoberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	wikiberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	powerherb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
	mentalherb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	abilityshield: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	absorbbulb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	adrenalineorb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	airballoon: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	apicotberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	babiriberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	blacksludge: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	blunderpolicy: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	brightpowder: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	cellbattery: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	chartiberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	chestoberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	chilanberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	chopleberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	clearamulet: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	cobaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	colburberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	covertcloak: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	custapberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	damprock: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	ejectbutton: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	ejectpack: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	electricseed: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	flameorb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	galaricacuff: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	galaricawreath: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	ganlonberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	grassyseed: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	gripclaw: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	habanberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	heatrock: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	icyrock: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	jabocaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	kasibberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	kebiaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	keeberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	kingsrock: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	lansatberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	leppaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	liechiberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	lightclay: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	loadeddice: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	lumberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	luminousmoss: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	marangaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	metalalloy: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	metronome: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	micleberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	mirrorherb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	mistyseed: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	normalgem: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	occaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	passhoberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	payapaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	petayaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	protectivepads: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	psychicseed: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	punchingglove: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	quickclaw: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	razorclaw: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	razorfang: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	redcard: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	rindoberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	ringtarget: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	roomservice: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	roseliberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	safetygoggles: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	scopelens: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	shedshell: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	shellbell: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	shucaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	sitrusberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	smoothrock: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	snowball: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	starfberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	stickybarb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	tangaberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	terrainextender: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	throatspray: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	toxicorb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	utilityumbrella: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	wacanberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	weaknesspolicy: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	whiteherb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	widelens: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	yacheberry: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	zoomlens: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	//hiding plate as well, might undo it if adding plates
	dracoplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	dreadplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	earthplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	fistplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	flameplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	icicleplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	insectplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	ironplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	meadowplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	mindplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	pixieplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	skyplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	splashplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	spookyplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	stoneplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	toxicplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	zapplate: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	//end of plates
	adamantcrystal: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	adamantorb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	boosterenergy: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	cornerstonemask: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	griseouscore: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	griseousorb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	hearthflamemask: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	lightball: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	lustrousglobe: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	lustrousorb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	rustedshield: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	rustedsword: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	souldew: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	wellspringmask: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
};



