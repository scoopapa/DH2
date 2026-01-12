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
	safetygoggles: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'dustdevil' || type === 'absolutezero' || type === 'powder') return false;
		},
	},
	/*
	Mega Stones
	*/
	arzurite: {
		name: "Arzurite",
		gen: 9,
		shortDesc: "If held by Arzuros, allows it to transform into Redhelm. (Mega-Evolution)",
		megaStone: "Arzuros-Redhelm",
		megaEvolves: "Arzuros",
		itemUser: ["Arzuros", "Arzuros-Redhelm"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 585,
	},
	astalite: {
		name: "Astalite",
		gen: 9,
		shortDesc: "If held by Asatalos, allows it to transform into Boltreaver. (Mega-Evolution)",
		megaStone: "Astalos-Boltreaver",
		megaEvolves: "Astalos",
		itemUser: ["Astalos", "Astalos-Boltreaver"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 613,
	},
	bazelnite: {
		name: "Bazelnite",
		gen: 9,
		shortDesc: "If held by Bazelgeuse, allows it to transform into Seething. (Mega-Evolution)",
		megaStone: "Bazelgeuse-Seething",
		megaEvolves: "Bazelgeuse",
		itemUser: ["Bazelgeuse", "Bazelgeuse-Seething"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 591,
	},
	bariothite: {
		name: "Bariothite",
		gen: 9,
		shortDesc: "If held by Barioth, allows it to transform into Frostfang. (Mega-Evolution)",
		megaStone: "Barioth-Frostfang",
		megaEvolves: "Barioth",
		itemUser: ["Barioth", "Barioth-Frostfang"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 685,
	},
	brachylite: {
		name: "Brachylite",
		gen: 9,
		shortDesc: "If held by Brachydios, allows it to transform into Raging. (Mega-Evolution)",
		megaStone: "Brachydios-Raging",
		megaEvolves: "Brachydios",
		itemUser: ["Brachydios", "Brachydios-Raging"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 613,
	},
	devilite: {
		name: "Devilite",
		gen: 9,
		shortDesc: "If held by Deviljho, allows it to transform into Savage. (Mega-Evolution)",
		megaStone: "Deviljho-Savage",
		megaEvolves: "Deviljho",
		itemUser: ["Deviljho", "Deviljho-Savage"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 584,
	},
	diablite: {
		name: "Diablite",
		gen: 9,
		shortDesc: "If held by Diablos, allows it to transform into Massacre. (Mega-Evolution)",
		megaStone: "Diablos-Massacre",
		megaEvolves: "Diablos",
		itemUser: ["Diablos", "Diablos-Massacre"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 589,
	},
	gammothite: {
		name: "Gammothite",
		gen: 9,
		shortDesc: "If held by Gammoth, allows her to transform into Elderfrost. (Mega-Evolution)",
		megaStone: "Gammoth-Elderfrost",
		megaEvolves: "Gammoth",
		itemUser: ["Gammoth", "Gammoth-Elderfrost"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 623,
	},
	garugite: {
		name: "Garugite",
		gen: 9,
		shortDesc: "If held by Yian Garuga, allows it to transform into Deadeye. (Mega-Evolution)",
		megaStone: "Yian Garuga-Deadeye",
		megaEvolves: "Yian Garuga",
		itemUser: ["Yian Garuga", "Yian Garuga-Deadeye"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 577,
	},
	harudomerite: {
		name: "Harudomerite",
		gen: 9,
		shortDesc: "If held by Harudomerugu, allows it to enter it's Zenith Form. (Mega-Evolution)",
		megaStone: "Harudomerugu-Z",
		megaEvolves: "Harudomerugu",
		itemUser: ["Harudomerugu", "Harudomerugu-Z"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 578,
	},
	inagamite: {
		name: "Inagamite",
		gen: 9,
		shortDesc: "If held by Inagami, allows it to enter it's Zenith Form. (Mega-Evolution)",
		megaStone: "Inagami-Z",
		megaEvolves: "Inagami",
		itemUser: ["Inagami", "Inagami-Z"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 613,
	},
	lagialite: {
		name: "Lagialite",
		gen: 9,
		shortDesc: "If held by Lagiacrus, allows it to transform into Abyssal. (Mega-Evolution)",
		megaStone: "Lagiacrus-Abyssal",
		megaEvolves: "Lagiacrus",
		itemUser: ["Lagiacrus", "Lagiacrus-Abyssal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 585,
	},
	lagombite: {
		name: "Lagombite",
		gen: 9,
		shortDesc: "If held by Lagombi, allows it to transform into Snowbaron. (Mega-Evolution)",
		megaStone: "Lagombi-Snowbaron",
		megaEvolves: "Lagombi",
		itemUser: ["Lagombi", "Lagombi-Snowbaron"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 583,
	},
	magnamalite: {
		name: "Magnamalite",
		gen: 9,
		shortDesc: "If held by Magnamalo, allows it to transform into Scorned. (Mega-Evolution)",
		megaStone: "Magnamalo-Scorned",
		megaEvolves: "Magnamalo",
		itemUser: ["Magnamalo", "Magnamalo-Scorned"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 614,
	},
	malfestite: {
		name: "Malfestite",
		gen: 9,
		shortDesc: "If held by Malfestio, allows it to transform into Nightcloak. (Mega-Evolution)",
		megaStone: "Malfestio-Nightcloak",
		megaEvolves: "Malfestio",
		itemUser: ["Malfestio", "Malfestio-Nightcloak"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 577,
	},
	mizutsunite: {
		name: "Mizutsunite",
		gen: 9,
		shortDesc: "If held by Mizutsune, allows it to transform into Soulseer. (Mega-Evolution)",
		megaStone: "Mizutsune-Soulseer",
		megaEvolves: "Mizutsune",
		itemUser: ["Mizutsune", "Mizutsune-Soulseer"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 624,
	},
	narwanite: {
		name: "Narwanite",
		gen: 9,
		shortDesc: "If held by Narwa, allows it to transform into Allmother. (Mega-Evolution)",
		megaStone: "Narwa-Allmother",
		megaEvolves: "Narwa",
		itemUser: ["Narwa", "Narwa-Allmother"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 596,
	},
	plesite: {
		name: "Plesite",
		gen: 9,
		shortDesc: "If held by Plesioth, allows it to enter it's Zenith Form. (Mega-Evolution)",
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
		shortDesc: "If held by Rajang, allows it to transform into Furious. (Mega-Evolution)",
		megaStone: "Rajang-Furious",
		megaEvolves: "Rajang",
		itemUser: ["Rajang", "Rajang-Furious"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 602,
	},
	rathalosite: {
		name: "Rathalosite",
		gen: 9,
		shortDesc: "If held by Rathalos, allows it to transform into Dreadking. (Mega-Evolution)",
		megaStone: "Rathalos-Dreadking",
		megaEvolves: "Rathalos",
		itemUser: ["Rathalos", "Rathalos-Dreadking"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 586,
	},
	rathianite: {
		name: "Rathianite",
		gen: 9,
		shortDesc: "If held by Rathian, allows it to transform into Dreadqueen. (Mega-Evolution)",
		megaStone: "Rathian-Dreadqueen",
		megaEvolves: "Rathian",
		itemUser: ["Rathian", "Rathian-Dreadqueen"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 607,
	},
	risenitec: {
		name: "Risenite-C",
		gen: 9,
		shortDesc: "If held by Chameleos, allows it to enter it's Risen Form. (Mega-Evolution)",
		megaStone: "Chameleos-Risen",
		megaEvolves: "Chameleos",
		itemUser: ["Chameleos", "Chameleos-Risen"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	risenitek: {
		name: "Risenite-K",
		gen: 9,
		shortDesc: "If held by Kushala, allows it to enter it's Risen Form. (Mega-Evolution)",
		megaStone: "Kushala Daora-Risen",
		megaEvolves: "Kushala Daora",
		itemUser: ["Kushala Daora", "Kushala Daora-Risen"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	risenitet: {
		name: "Risenite-T",
		gen: 9,
		shortDesc: "If held by Teostra, allows it to enter it's Risen Form. (Mega-Evolution)",
		megaStone: "Teostra-Risen",
		megaEvolves: "Teostra",
		itemUser: ["Teostra", "Teostra-Risen"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	risenites: {
		name: "Risenite-S",
		gen: 9,
		shortDesc: "If held by Shagaru Magala, allows it to enter it's Risen Form. (Mega-Evolution)",
		megaStone: "Shagaru Magala-Risen",
		megaEvolves: "Shagaru Magala",
		itemUser: ["Shagaru Magala", "Shagaru Magala-Risen"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	tigrexite: {
		name: "Tigrexite",
		gen: 9,
		shortDesc: "If held by Tigrex, allows it to transform into Grimclaw. (Mega-Evolution)",
		megaStone: "Tigrex-Grimclaw",
		megaEvolves: "Tigrex",
		itemUser: ["Tigrex", "Tigrex-Grimclaw"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 619,
	},
	zinogrite: {
		name: "Zinogrite",
		gen: 9,
		shortDesc: "If held by Zinogre, allows it to transform into Thunderlord. (Mega-Evolution)",
		megaStone: "Zinogre-Thunderlord",
		megaEvolves: "Zinogre",
		itemUser: ["Zinogre", "Zinogre-Thunderlord"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	kirinite: {
		name: "Kirinite",
		gen: 9, 
		shortDesc: "If held by Kirin, allows it to transform into Emperor. (Mega-Evolution)",
		megaStone: "Kirin-Emperor",
		megaEvolves: "Kirin",
		itemUser: ["Kirin", "Kirin-Emperor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 602,
	},
	uragaanite: {
		name: "Uragaanite",
		gen: 9,
		shortDesc: "If held by Uragaan, allows it to transform into Crystalbeard. (Mega-Evolution)",
		megaStone: "Uragaan-Crystalbeard",
		megaEvolves: "Uragaan",
		itemUser: ["Uragaan", "Uragaan-Crystalbeard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 663,
	},
	daimyite: {
		name: "Daimyite",
		gen: 9,
		shortDesc: "If held by Daimyo Hermitaur, allows it to transform into Stonefist. (Mega-Evolution)",
		megaStone: "Daimyo Hermitaur-Stonefist",
		megaEvolves: "Daimyo Hermitaur",
		itemUser: ["Daimyo Hermitaur", "Daimyo Hermitaur-Stonefist"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 612,
	},
	glavenite: {
		name: "Glavenite",
		gen: 9,
		shortDesc: "If held by Glavenus, allows it to transform into Hellblade. (Mega-Evolution)",
		megaStone: "Glavenus-Hellblade",
		megaEvolves: "Glavenus",
		itemUser: ["Glavenus", "Glavenus-Hellblade"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 586,
	},
	/*
	Fatalis Orbs
	*/
	crimsongem: {
		name: "Crimson Gem",
		gen: 9,
		shortDesc: "If held by Fatalis, triggers its Crimson Form in battle. (Primal Reversion)",
		itemUser: ["Fatalis", "Fatalis-Crimson"],
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Fatalis') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Fatalis-Crimson', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Fatalis') return false;
			return true;
		},
	},
	whitegem: {
		name: "White Gem",
		gen: 9,
		shortDesc: "If held by Fatalis, triggers its Crimson Form in battle. (Primal Reversion)",
		itemUser: ["Fatalis", "Fatalis-White"],
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Fatalis') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Fatalis-White', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Fatalis') return false;
			return true;
		},
	},
}
