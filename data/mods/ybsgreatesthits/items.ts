export const Items: {[itemid: string]: ModdedItemData} = {
	venusauriumz: {
		name: "Venusaurium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Swampy Smackdown",
		zMoveFrom: "Energy Ball",
		itemUser: ["Venusaur"],
		num: -1001,
		gen: 8,
		desc: "If held by a Venusaur with Energy Ball, allows it to use the Z-Move Swampy Smackdown.",
	},
	charizardiumz: {
		name: "Charizardium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Intensified Inferno",
		zMoveFrom: "Flare Blitz",
		itemUser: ["Charizard"],
		num: -1002,
		gen: 8,
		desc: "If held by a Charizard with Flare Blitz, allows it to use the Z-Move Intensified Inferno.",
	},
	blastoisiumz: {
		name: "Blastoisium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Intensified Inferno",
		zMoveFrom: "Flare Blitz",
		itemUser: ["Blastoise"],
		num: -1003,
		gen: 8,
		desc: "If held by a Blastoise with Scald, allows it to use the Z-Move Destructive Downpour.",
	},
	decidiumz: {
		name: "Decidium Z",
		spritenum: 650,
		onTakeItem: false,
		zMove: "Sinister Arrow Raid",
		zMoveFrom: "Poltergeist",
		itemUser: ["Decidueye"],
		num: 798,
		gen: 7,
		isNonstandard: null,
		desc: "If held by a Decidueye with Poltergeist, allows it to use the Z-Move Sinister Arrow Raid.",
	},
	missingbonei: {
		name: "Missing Bone I",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Krookodile') {
			  this.boost({spa: 1});
			}
		},
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Psychic') {
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Krookodile') return false;
			return true;
		},
		itemUser: ["Krookodile"],
		num: -1004,
		gen: 8,
		desc: "If held by Krookodile: +1 SpA on entry, 1.5x power Psychic-type attacks.",
	},
	missingboneg: {
		name: "Missing Bone G",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Carracosta') {
			  this.boost({spe: 1});
			}
		},
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Carracosta') return false;
			return true;
		},
		itemUser: ["Carracosta"],
		num: -1004,
		gen: 8,
		desc: "If held by Carracosta: +1 Spe on entry, 1.5x power Fighting-type attacks.",
	},
};
