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
		shortDesc: "Halves damage from super-effective attacks, boosts Spe by 1 when eaten. Single use.",
		spritenum: 124,
		isBerry: true,
		naturalGift: {
			basePower: 90,
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
		onEat(pokemon) { 
			this.boost({spe:1});
		},
		num: -2,
		gen: 9,
		rating: 3,
	},
	
	notaberry: {
		name: "Nota Berry",
		shortDesc: "Restores 1/16 HP at the end of each turn. At 25% HP or less, consumed to restore 25% HP.",
		isBerry: true,
		naturalGift: {
			basePower: 70,
			type: "Stellar",
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 4);
		},
		num: -2,
		gen: 9,
		rating: 3,
	},
	
	/*
	speedexchanger: {
		name: "Speed Exchanger",
		shortDesc: "Holder has 1.2x Speed, but also has 0.8x Attack and Sp. Attack.",
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
	
	damageamp: {
		name: "Damage Amp",
		shortDesc: "Holder deals 1.1x more damage, but has 0.9x defenses and speed.",
		spritenum: 269,
		fling: {
			basePower: 10,
		},
		onModifySpe(spe) {
			return this.chainModify(0.9);
		},
		onModifySpDPriority: 1,
		onModifySpD(spd) {
			return this.chainModify(0.9);
		},
		onModifyDefPriority: 1,
		onModifyDef(def) {
			return this.chainModify(0.9);
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk) {
			return this.chainModify(1.1);
		},
		onModifySpAPriority: 1,
		onModifySpA(spa) {
			return this.chainModify(1.1);
		},
		num: -3,
		gen: 9,
		rating: 3,
	},
	*/
	
	adrenalineorb: {
		name: "Adrenaline Orb",
		shortDesc: "Boosts Speed by 1.3x, but loses 1/10 HP after attacking.",
		spritenum: 660,
		fling: {
			basePower: 30,
		},
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.3);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag) {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.items.get('adrenalineorb'));
			}
		},
		num: -3,
		gen: 9,
	},
	
	softsilvermagnet: {
		name: "Soft Silver Magnet",
		shortDesc: "Holder's Ground, Bug, and Electric attacks have 1.2x power.",
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ground' || move.type === 'Bug' || move.type === 'Electric')) {
				return this.chainModify([4915, 4096]);
			} 
		},
		num: -4,
		gen: 9,
		rating: 3,
	},
	
	miraclestonebelt: {
		name: "Miracle Stone Belt",
		shortDesc: "Holder's Grass, Rock, and Fighting attacks have 1.2x power.",
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Grass' || move.type === 'Rock' || move.type === 'Fighting')) {
				return this.chainModify([4915, 4096]);
			}
		},
		num: -5,
		gen: 9,
		rating: 3,
	},
	
	//big neutral energy
  bigneutralenergy: {
		name: "Big Neutral Energy",
		shortDesc: "Holder's Normal, Dragon, and Ghost attacks have 1.2x power.",
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Normal' || move.type === 'Dragon' || move.type === 'Ghost')) {
				return this.chainModify([4915, 4096]);
			}
		},
		num: -6,
		gen: 9,
		rating: 3,
	},
	
	twistedmysticcoal: {
		name: "Twisted Mystic Coal",
		shortDesc: "Holder's Psychic, Water, and Fire attacks have 1.2x power.",
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Psychic' || move.type === 'Water' || move.type === 'Fighting')) {
				return this.chainModify([4915, 4096]);
			}
		},
		num: -7,
		gen: 9,
		rating: 3,
	},
	
	blackicecoat: {
		name: "Black Ice Coat",
		shortDesc: "Holder's Dark, Ice, and Steel attacks have 1.2x power.",
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Dark' || move.type === 'Ice' || move.type === 'Steel')) {
				return this.chainModify([4915, 4096]);
			}
		},
		num: -8,
		gen: 9,
		rating: 3,
	},
	
	sharpfeatherbarb: {
		name: "Sharp Feather Barb",
		shortDesc: "Holder's Flying, Fairy, and Poison attacks have 1.2x power.",
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Flying' || move.type === 'Fairy' || move.type === 'Poison')) {
				return this.chainModify([4915, 4096]);
			}
		},
		num: -9,
		gen: 9,
		rating: 3,
	},
	
	//hiding in builder
	silkscarf: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	charcoal: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	mysticwater: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	miracleseed: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	magnet: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	nevermeltice: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},
	blackbelt: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	poisonbarb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	softsand: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	sharpbeak: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	twistedspoon: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	silverpowder: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	hardstone: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	spelltag: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},
	dragonfang: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},	
	blackglasses: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},
	metalcoat: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},
	fairyfeather: {
		inherit: true,
		isNonstandard: 'Unobtainable',
		rating: 3,
	},
	wiseglasses: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	muscleband: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	
	
	//Just to hide items away (mainly Popular Items, and some others), they are already banned in config/format.ts
	//Doing this until there is a better way to hide illegal items
	leftovers: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},	
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
	/*
	adrenalineorb: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},
	*/
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
	/*
	shedshell: {
		inherit: true,
		isNonstandard: 'Unobtainable',
	},*/
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



