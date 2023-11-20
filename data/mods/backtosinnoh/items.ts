export const Items: { [itemid: string]: ModdedItemData; } = {
	sugarbag: {
		onStart(pokemon) {
			this.add('-item', pokemon, 'Sugar Bag');
			this.hint("Sugar Bag!");
		},
		onModifySpe(spe, pokemon) {
			if (!(pokemon.activeMoveActions > 1)) {
				return this.chainModify(1.5);
			}
		},
		name: "Sugar Bag",
		fling: {
			basePower: 30,
		},
		desc: "Holder's Speed is 1.5x the first turn it comes in.",
		num: -1,
		gen: 4,
	},
	tormentspecs: {
		name: "Torment Specs",
		fling: {
			basePower: 30,
		},
		onDisableMove: function(pokemon) {
			if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.3);
		},
		desc: "Holder's Sp. Atk is 1.3x,, but it can't use the same move twice in a row.",
		num: -2,
		gen: 4,
	},

	adamantorb: {
		inherit: true,
		isNonstandard: "Past",
	},
	armorfossil: {
		inherit: true,
		isNonstandard: "Past",
	},
	bigroot: {
		inherit: true,
		isNonstandard: "Past",
	},
	blacksludge: {
		inherit: true,
		isNonstandard: "Past",
	},
	cherishball: {
		inherit: true,
		isNonstandard: "Past",
	},
	choicescarf: {
		inherit: true,
		isNonstandard: "Past",
	},
	choicespecs: {
		inherit: true,
		isNonstandard: "Past",
	},
	custapberry: {
		inherit: true,
		isNonstandard: "Past",
	},
	damprock: {
		inherit: true,
		isNonstandard: "Past",
	},
	dawnstone: {
		inherit: true,
		isNonstandard: "Past",
	},
	destinyknot: {
		inherit: true,
		isNonstandard: "Past",
	},
	dracoplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	dreadplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	dubiousdisc: {
		inherit: true,
		isNonstandard: "Past",
	},
	duskball: {
		inherit: true,
		isNonstandard: "Past",
	},
	duskstone: {
		inherit: true,
		isNonstandard: "Past",
	},
	earthplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	electirizer: {
		inherit: true,
		isNonstandard: "Past",
	},
	expertbelt: {
		inherit: true,
		isNonstandard: "Past",
	},
	fistplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	flameorb: {
		inherit: true,
		isNonstandard: "Past",
	},
	flameplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	focussash: {
		inherit: true,
		isNonstandard: "Past",
	},
	fullincense: {
		inherit: true,
		isNonstandard: "Past",
	},
	gripclaw: {
		inherit: true,
		isNonstandard: "Past",
	},
	griseousorb: {
		inherit: true,
		isNonstandard: "Past",
	},
	healball: {
		inherit: true,
		isNonstandard: "Past",
	},
	heatrock: {
		inherit: true,
		isNonstandard: "Past",
	},
	icicleplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	icyrock: {
		inherit: true,
		isNonstandard: "Past",
	},
	insectplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	ironball: {
		inherit: true,
		isNonstandard: "Past",
	},
	ironplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	jabocaberry: {
		inherit: true,
		isNonstandard: "Past",
	},
	laggingtail: {
		inherit: true,
		isNonstandard: "Past",
	},
	lifeorb: {
		inherit: true,
		isNonstandard: "Past",
	},
	lightclay: {
		inherit: true,
		isNonstandard: "Past",
	},
	lustrousorb: {
		inherit: true,
		isNonstandard: "Past",
	},
	magmarizer: {
		inherit: true,
		isNonstandard: "Past",
	},
	meadowplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	metronome: {
		inherit: true,
		isNonstandard: "Past",
	},
	micleberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	mindplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	muscleband: {
		inherit: true,
		isNonstandard: "Past",
	},
	oddincense: {
		inherit: true,
		isNonstandard: "Past",
	},
	ovalstone: {
		inherit: true,
		isNonstandard: "Past",
	},
	parkball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	poweranklet: {
		inherit: true,
		isNonstandard: "Past",
	},
	powerband: {
		inherit: true,
		isNonstandard: "Past",
	},
	powerbelt: {
		inherit: true,
		isNonstandard: "Past",
	},
	powerbracer: {
		inherit: true,
		isNonstandard: "Past",
	},
	powerherb: {
		inherit: true,
		isNonstandard: "Past",
	},
	powerlens: {
		inherit: true,
		isNonstandard: "Past",
	},
	powerweight: {
		inherit: true,
		isNonstandard: "Past",
	},
	protector: {
		inherit: true,
		isNonstandard: "Past",
	},
	quickball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	quickpowder: {
		inherit: true,
		isNonstandard: "Past",
	},
	rarebone: {
		inherit: true,
		isNonstandard: "Past",
	},
	razorclaw: {
		inherit: true,
		isNonstandard: "Past",
	},
	razorfang: {
		inherit: true,
		isNonstandard: "Past",
	},
	reapercloth: {
		inherit: true,
		isNonstandard: "Past",
	},
	rockincense: {
		inherit: true,
		isNonstandard: "Past",
	},
	roseincense: {
		inherit: true,
		isNonstandard: "Past",
	},
	rowapberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	shedshell: {
		inherit: true,
		isNonstandard: "Past",
	},
	shinystone: {
		inherit: true,
		isNonstandard: "Past",
	},
	skullfossil: {
		inherit: true,
		isNonstandard: "Past",
	},
	skyplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	smoothrock: {
		inherit: true,
		isNonstandard: "Past",
	},
	splashplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	spookyplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	stickybarb: {
		inherit: true,
		isNonstandard: "Past",
	},
	stoneplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	toxicorb: {
		inherit: true,
		isNonstandard: "Past",
	},
	toxicplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	waveincense: {
		inherit: true,
		isNonstandard: "Past",
	},
	widelens: {
		inherit: true,
		isNonstandard: "Past",
	},
	wiseglasses: {
		inherit: true,
		isNonstandard: "Past",
	},
	zapplate: {
		inherit: true,
		isNonstandard: "Past",
	},
	zoomlens: {
		inherit: true,
	}

};
