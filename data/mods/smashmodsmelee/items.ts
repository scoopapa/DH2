export const Items: {[itemid: string]: ModdedItemData} = {
	raichunite: {
		name: "Raichunite",
		spritenum: 628,
		megaStone: "Raichu-Mega",
		megaEvolves: "Raichu",
		itemUser: ["Raichu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 8,
		desc: "If held by a Raichu, this item allows it to Mega Evolve in battle.",
	},
	garbodorite: {
		name: "Garbodorite",
		spritenum: 578,
		megaStone: "Garbodor-Mega",
		megaEvolves: "Garbodor",
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 8,
		desc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
	},
	vanillite: {
		name: "Vanillite",
		spritenum: 578,
		megaStone: "Vanilluxe-Mega",
		megaEvolves: "Vanilluxe",
		itemUser: ["Vanilluxe"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Vanilluxe, this item allows it to Mega Evolve in battle.",
	},
	machobrace: {
		name: "Macho Brace",
		spritenum: 269,
		fling: {
			basePower: 60,
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 215,
		gen: 3,
		desc: "Holder's attacks do 1.3x damage, but its Speed is halved.",
	},
	serenitybrace: {
		name: "Serenity Brace",
		spritenum: 269,
		fling: {
			basePower: 60,
		},
		onModifySecondaries(secondaries) {
			this.debug('Serenity Brace prevents secondary effects');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		num: -1004,
		gen: 8,
		desc: "The holder is protected from the secondary effects of moves.",
	},
	weatherwarriorscrystal: {
		name: "Weather Warrior's Crystal",
		spritenum: 307,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && !this.field.isWeather('')) {
				pokemon.useItem();
			}
		},
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === '') return;
			this.effectData.target.useItem();
		},
		boosts: {
			atk: 1,
			spa: 1,
		},
		num: -1005,
		gen: 8,
		desc: "If there is a weather effect, raises holder's Attack and Sp. Atk by 1 stage. Single use.",
	},
	marshadiumz: {
		name: "Marshadium Z",
		spritenum: 654,
		onTakeItem: false,
		zMove: "Scum-Stealing 7-Scrap Strike",
		zMoveFrom: "Spectral Residue",
		itemUser: ["Trubbish-Marshadow"],
		num: 802,
		gen: 7,
		desc: "If held by Trubbish-Marshadow with Spectral Residue, it can use Scum-Stealing 7-Scrap Strike.",
	},
	silkscarf: {
		name: "Silk Scarf",
		spritenum: 444,
		fling: {
			basePower: 10,
		},
		onModifyMove(move) {
			move.stab = 1.8;
		},
		num: 251,
		gen: 3,
		desc: "Holder's STAB attacks have 1.2x power.",
	},
};
