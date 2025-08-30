export const Items: {[itemid: string]: ModdedItemData} = {
	/*
	Battle Items
	*/
	boosterenergy: {
		inherit: true,
		desc: "Activates abilities with Protosynthesis or Quark Drive effects. Single use.",
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed || this.queue.peek(true)?.choice === 'runSwitch') return;
			if (!this.field.isWeather('sunnyday')) {
				for (const proto of ['protopyre', 'protoneuron', 'prototoxin', 'protolithos', 'protoavian',
											'protorefraction', 'protosynthesis']) { 
					if (pokemon.hasAbility(proto)) {
						if (!pokemon.volatiles[proto] /* && !this.field.isWeather('sunnyday') */ && pokemon.useItem()) {
							pokemon.addVolatile(proto);
						}
						return;
					}
				}
			}
			if (!this.field.isTerrain('electricterrain')) {
				for (const quark of ['quarkdrive', 'jellyfilleddrive', 'winddrive', 'heavydrive', 'jadedrive', 'airdrive',
											'magicdrive', 'phantomdrive', 'toxicdrive']) { 
					if (pokemon.hasAbility(quark)) {
						if (!pokemon.volatiles[quark] && pokemon.useItem()) {
							pokemon.addVolatile(quark);
						}
						return;
					}
				}
			}
		},
	},
	frostorb: {
		name: "Frost Orb",
		gen: 9,
		num: 1000,
		desc: "At the end of each turn, tries to freeze the holder.",
		shortDesc: "At the end of each turn, tries to freeze the holder.",
		fling: {
			basePower: 30,
			status: 'frz',
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			pokemon.trySetStatus('frz', pokemon);
		},
	},
	/*
	Mega Stones
	*/
	arzurite: {
		name: "Arzurite",
		gen: 9,
		shortDesc: "If held by Arzuros, this item allows it to Mega Evolve into Redhelm.",
		megaStone: "Redhelm Arzuros",
		megaEvolves: "Arzuros",
		itemUser: ["Arzuros", "Redhelm Arzuros"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 585,
	},
	astalite: {
		name: "Astalite",
		gen: 9,
		shortDesc: "If held by Astalos, this item allows it to Mega Evolve into Boltreaver.",
		megaStone: "Boltreaver Astalos",
		megaEvolves: "Astalos",
		itemUser: ["Astalos", "Boltreaver Astalos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 613,
	},
	bazelnite: {
		name: "Bazelnite",
		gen: 9,
		shortDesc: "If held by Bazelgeuse, this item allows it to Mega Evolve in battle.",
		megaStone: "Seething Bazelgeuse",
		megaEvolves: "Bazelgeuse",
		itemUser: ["Bazelgeuse", "Seething Bazelgeuse"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 591,
	},
	brachylite: {
		name: "Brachylite",
		gen: 9,
		shortDesc: "If held by Brachydios, this item allows it to Mega Evolve in battle.",
		megaStone: "Raging Brachydios",
		megaEvolves: "Brachydios",
		itemUser: ["Brachydios", "Raging Brachydios"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 613,
	},
	devilite: {
		name: "Devilite",
		gen: 9,
		shortDesc: "If held by Deviljho, this item allows it to Mega Evolve in battle.",
		megaStone: "Savage Deviljho",
		megaEvolves: "Deviljho",
		itemUser: ["Deviljho", "Savage Deviljho"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 584,
	},
	diablite: {
		name: "Diablite",
		gen: 9,
		shortDesc: "If held by Diablos, this item allows it to Mega Evolve in battle.",
		megaStone: "Massacre Diablos",
		megaEvolves: "Diablos",
		itemUser: ["Diablos", "Massacre Diablos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 589,
	},
	harudomerite: {
		name: "Harudomerite",
		gen: 9,
		shortDesc: "If held by Harudomerugu, this item allows it to Mega Evolve in battle.",
		megaStone: "Harudomerugu-Z",
		megaEvolves: "Harudomerugu",
		itemUser: ["Harudomerugu", "Harudomerugu-Z"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 578,
	},
	lagialite: {
		name: "Lagialite",
		gen: 9,
		shortDesc: "If held by Lagiacrus, this item allows it to Mega Evolve in battle.",
		megaStone: "Abyssal Lagiacrus",
		megaEvolves: "Lagiacrus",
		itemUser: ["Lagiacrus", "Abyssal Lagiacrus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 585,
	},
	lagombite: {
		name: "Lagombite",
		gen: 9,
		shortDesc: "If held by Lagombi, this item allows it to Mega Evolve in battle.",
		megaStone: "Snowbaron Lagombi",
		megaEvolves: "Lagombi",
		itemUser: ["Lagombi", "Snowbaron Lagombi"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 583,
	},
	magnamalite: {
		name: "Magnamalite",
		gen: 9,
		shortDesc: "If held by Magnamalo, this item allows it to Mega Evolve in battle.",
		megaStone: "Scorned Magnamalo",
		megaEvolves: "Magnamalo",
		itemUser: ["Magnamalo", "Scorned Magnamalo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 614,
	},
	malfestite: {
		name: "Malfestite",
		gen: 9,
		shortDesc: "If held by Malfestio, this item allows it to Mega Evolve in battle.",
		megaStone: "Nightcloak Malfestio",
		megaEvolves: "Malfestio",
		itemUser: ["Malfestio", "Nightcloak Malfestio"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 577,
	},
	mizutsunite: {
		name: "Mizutsunite",
		gen: 9,
		shortDesc: "If held by Mizutsune, this item allows it to Mega Evolve in battle.",
		megaStone: "Soulseer Mizutsune",
		megaEvolves: "Mizutsune",
		itemUser: ["Mizutsune", "Soulseer Mizutsune"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 624,
	},
	narwanite: {
		name: "Narwanite",
		gen: 9,
		shortDesc: "If held by Narwa, this item allows it to Mega Evolve in battle.",
		megaStone: "Allmother Narwa",
		megaEvolves: "Narwa",
		itemUser: ["Narwa", "Allmother Narwa"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 596,
	},
	plesite: {
		name: "Plesite",
		gen: 9,
		shortDesc: "If held by Plesioth, this item allows it to Mega Evolve in battle.",
		megaStone: "Plesioth-Z",
		megaEvolves: "Plesioth",
		itemUser: ["Plesioth", "Plesioth-Z"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 621,
	},
	rajanite: {
		name: "Rajanite",
		gen: 9,
		shortDesc: "If held by Rajang, this item allows it to Mega Evolve in battle.",
		megaStone: "Furious Rajang",
		megaEvolves: "Rajang",
		itemUser: ["Rajang", "Furious Rajang"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 602,
	},
	rathalosite: {
		name: "Rathalosite",
		gen: 9,
		shortDesc: "If held by Rathalos, this item allows it to Mega Evolve in battle.",
		megaStone: "Dreadking Rathalos",
		megaEvolves: "Rathalos",
		itemUser: ["Rathalos", "Dreadking Rathalos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 586,
	},
	rathianite: {
		name: "Rathianite",
		gen: 9,
		shortDesc: "If held by Rathian, this item allows it to Mega Evolve in battle.",
		megaStone: "Dreadqueen Rathian",
		megaEvolves: "Rathian",
		itemUser: ["Rathian", "Dreadqueen Rathian"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 607,
	},
	risenitec: {
		name: "Risenite-C",
		gen: 9,
		shortDesc: "If held by Chameleos, this item allows it to Mega Evolve in battle.",
		megaStone: "Risen Chameleos",
		megaEvolves: "Chameleos",
		itemUser: ["Chameleos", "Risen Chameleos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	risenitek: {
		name: "Risenite-K",
		gen: 9,
		shortDesc: "If held by Kushala, this item allows it to Mega Evolve in battle.",
		megaStone: "Risen Kushala",
		megaEvolves: "Kushala Daora",
		itemUser: ["Kushala Daora", "Risen Kushala"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	risenitet: {
		name: "Risenite-T",
		gen: 9,
		shortDesc: "If held by Teostra, this item allows it to Mega Evolve in battle.",
		megaStone: "Risen Teostra",
		megaEvolves: "Teostra",
		itemUser: ["Teostra", "Risen Teostra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	zinogrite: {
		name: "Zinogrite",
		gen: 9,
		shortDesc: "If held by Zinogre, this item allows it to Mega Evolve in battle.",
		megaStone: "Thunderlord Zinogre",
		megaEvolves: "Zinogre",
		itemUser: ["Zinogre", "Thunderlord Zinogre"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	/*
	Fatalis Orbs
	*/
	crimsongem: {
		name: "Crimson Gem",
		gen: 9,
		shortDesc: "If held by Fatalis, this item triggers its Crimson Form in battle.",
		itemUser: ["Fatalis", "Crimson-Fatalis"],
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Fatalis') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Crimson-Fatalis', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Fatalis') return false;
			return true;
		},
	},
	whitegem: {
		name: "White Gem",
		gen: 9,
		shortDesc: "If held by Fatalis, this item triggers its White Form in battle.",
		itemUser: ["Fatalis", "White-Fatalis"],
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Fatalis') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('White-Fatalis', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Fatalis') return false;
			return true;
		},
	}
}
