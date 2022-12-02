export const Items: {[itemid: string]: ModdedItemData} = {
    paraorb: {
		name: "Para Orb",
		spritenum: 515,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			pokemon.trySetStatus('par', pokemon);
		},
		num: 272,
		gen: 4,
	},
	relicsheet: {
		name: "Relic Sheet",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Meloetta') {
				pokemon.formeChange('Meloetta-Pirouette');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Meloetta') return false;
			return true;
		},
		itemUser: ["Meloetta"],
		num: -1005,
		gen: 8,
		desc: "If held by Meloetta: Pirouette Forme on entry.",
	},
	nullifyorb: {
		name: "Nullify Orb",
		shortDesc: "Nullify all abilities on the field.",
		fling: {
			basePower: 30,
		},
		onPreStart(pokemon) {
			this.add('-item', pokemon, 'Nullify Orb');
			pokemon.abilityData.ending = false;
			for (const target of this.getAllActive()) {
				if (target.illusion) {
					this.singleEvent('End', this.dex.getAbility('Illusion'), target.abilityData, target, pokemon, 'nullifyorb');
				}
				if (target.volatiles['slowstart']) {
					delete target.volatiles['slowstart'];
					this.add('-end', target, 'Slow Start', '[silent]');
				}
			}
		},
		onEnd(source) {
			source.abilityData.ending = true;
			for (const pokemon of this.getAllActive()) {
				if (pokemon !== source) {

					this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityData, pokemon);
				}
			}
		},
		num: -1270,
		gen: 8,
	},
	normalgem: {
		name: "Normal Gem",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Normal' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 5,
	},
	grassgem: {
		name: "Grass Gem",
		spritenum: 172,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Grass' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 551,
		gen: 5,
	},
	firegem: {
		name: "Fire Gem",
		spritenum: 141,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Fire' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 548,
		gen: 5,
	},
	watergem: {
		name: "Water Gem",
		spritenum: 528,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Water' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 549,
		gen: 5,
	},
	electricgem: {
		name: "Electric Gem",
		spritenum: 120,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const pledges = ['firepledge', 'grasspledge', 'waterpledge'];
			if (target === source || move.category === 'Status' || pledges.includes(move.id)) return;
			if (move.type === 'Electric' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 550,
		gen: 5,
	},
	icegem: {
		name: "Ice Gem",
		spritenum: 218,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Ice' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 552,
		gen: 5,
	},
	fightinggem: {
		name: "Fighting Gem",
		spritenum: 139,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fighting' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 553,
		gen: 5,
	},
	poisongem: {
		name: "Poison Gem",
		spritenum: 344,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Poison' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 554,
		gen: 5,
	},
	groundgem: {
		name: "Ground Gem",
		spritenum: 182,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Ground' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 555,
		gen: 5,
	},
	flyinggem: {
		name: "Flying Gem",
		spritenum: 149,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Flying' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 556,
		gen: 5,
	},
	psychicgem: {
		name: "Psychic Gem",
		spritenum: 369,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Psychic' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 557,
		gen: 5,
	},
	buggem: {
		name: "Bug Gem",
		spritenum: 53,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Bug' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 558,
		gen: 5,
	},
	rockgem: {
		name: "Rock Gem",
		spritenum: 415,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Rock' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 559,
		gen: 5,
	},
	ghostgem: {
		name: "Ghost Gem",
		spritenum: 161,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Ghost' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 560,
		gen: 5,
	},
	dragongem: {
		name: "Dragon Gem",
		spritenum: 107,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Dragon' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 561,
		gen: 5,
	},
	darkgem: {
		name: "Dark Gem",
		spritenum: 89,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Dark' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 562,
		gen: 5,
	},
	steelgem: {
		name: "Steel Gem",
		spritenum: 473,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Steel' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 563,
		gen: 5,
	},
	fairygem: {
		name: "Fairy Gem",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fairy' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 564,
		gen: 5,
	},

	//mega stones
	meteorfragment: {
		name: "Meteor Fragment",
		spritenum: 578,
		megaStone: "Rayquaza-Mega",
		megaEvolves: "Rayquaza",
		itemUser: ["Rayquaza"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Rayquaza, this item allows it to Mega Evolve in battle.",
	},
	necrosolunite: {
		name: "Necrosolunite",
		spritenum: 687,
		megaStone: "Necrozma-Ultra",
		itemUser: ["Necrozma-Ultra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Necrozma-Dusk-Mane, this item allows it to Ultra Burst in battle.",
	},
	butterfrite: {
		name: "Butterfrite",
		spritenum: 578,
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	arbokinite: {
		name: "Arbokinite",
		spritenum: 578,
		megaStone: "Arbok-Mega",
		megaEvolves: "Arbok",
		itemUser: ["Arbok"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Arbok, this item allows it to Mega Evolve in battle.",
	},
	wigglytite: {
		name: "Wigglytite",
		spritenum: 578,
		megaStone: "Wigglytuff-Mega",
		megaEvolves: "Wigglytuff",
		itemUser: ["Wigglytuff"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Wigglytuff, this item allows it to Mega Evolve in battle.",
	},
	machampite: {
		name: "Machampite",
		spritenum: 578,
		megaStone: "Machamp-Mega",
		megaEvolves: "Machamp",
		itemUser: ["Machamp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Machamp, this item allows it to Mega Evolve in battle.",
	},
	meganite: {
		name: "Meganite",
		spritenum: 578,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		itemUser: ["Meganium"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Meganium, this item allows it to Mega Evolve in battle.",
	},
	typhlosionite: {
		name: "Typhlosionite",
		spritenum: 578,
		megaStone: "Typhlosion-Mega",
		megaEvolves: "Typhlosion",
		itemUser: ["Typhlosion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Typhlosion, this item allows it to Mega Evolve in battle.",
	},
	feraligatrite: {
		name: "Feraligatrite",
		spritenum: 578,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		itemUser: ["Feraligatr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Feraligatr, this item allows it to Mega Evolve in battle.",
	},
	noctowlite: {
		name: "Noctowlite",
		spritenum: 578,
		megaStone: "Noctowl-Mega",
		megaEvolves: "Noctowl",
		itemUser: ["Noctowl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Noctowl, this item allows it to Mega Evolve in battle.",
	},
	crobatite: {
		name: "Crobatite",
		spritenum: 578,
		megaStone: "Crobat-Mega",
		megaEvolves: "Crobat",
		itemUser: ["Crobat"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Crobat, this item allows it to Mega Evolve in battle.",
	},
	magcargonite: {
		name: "Magcargonite",
		spritenum: 578,
		megaStone: "Magcargo-Mega",
		megaEvolves: "Magcargo",
		itemUser: ["Magcargo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Magcargo, this item allows it to Mega Evolve in battle.",
	},
	volbite: {
		name: "Volbite",
		spritenum: 578,
		megaStone: "Volbeat-Mega",
		megaEvolves: "Volbeat",
		itemUser: ["Volbeat"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Volbeat, this item allows it to Mega Evolve in battle.",
	},
	illumite: {
		name: "Illumite",
		spritenum: 578,
		megaStone: "Illumise-Mega",
		megaEvolves: "Illumise",
		itemUser: ["Illumise"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Illumise, this item allows it to Mega Evolve in battle.",
	},
	flygonite: {
		name: "Flygonite",
		spritenum: 578,
		megaStone: "Flygon-Mega",
		megaEvolves: "Flygon",
		itemUser: ["Flygon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Flygon, this item allows it to Mega Evolve in battle.",
	},
	cacturnitex: {
		name: "Cacturnite X",
		spritenum: 578,
		megaStone: "Cacturne-Mega-X",
		megaEvolves: "Cacturne",
		itemUser: ["Cacturne"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Cacturne, this item allows it to Mega Evolve in battle.",
	},
	cacturnitey: {
		name: "Cacturnite Y",
		spritenum: 578,
		megaStone: "Cacturne-Mega-Y-Day",
		megaEvolves: "Cacturne",
		itemUser: ["Cacturne"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Cacturne, this item allows it to Mega Evolve in battle.",
	},
	whiscashite: {
		name: "Whiscashite",
		spritenum: 578,
		megaStone: "Whiscash-Mega",
		megaEvolves: "Whiscash",
		itemUser: ["Whiscash"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Whiscash, this item allows it to Mega Evolve in battle.",
	},
	froslassite: {
		name: "Froslassite",
		spritenum: 578,
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Froslass, this item allows it to Mega Evolve in battle.",
	},
	krookodite: {
		name: "Krookodite",
		spritenum: 578,
		megaStone: "Krookodile-Mega",
		megaEvolves: "Krookodile",
		itemUser: ["Krookodile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Krookodile, this item allows it to Mega Evolve in battle.",
	},
	crustlite: {
		name: "Crustlite",
		spritenum: 578,
		megaStone: "Crustle-Mega",
		megaEvolves: "Crustle",
		itemUser: ["Crustle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Crustle, this item allows it to Mega Evolve in battle.",
	},
	zoroarkite: {
		name: "Zoroarkite",
		spritenum: 578,
		megaStone: "Zoroark-Mega",
		megaEvolves: "Zoroark",
		itemUser: ["Zoroark"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Zoroark, this item allows it to Mega Evolve in battle.",
	},
	chesnaughtite: {
		name: "Chesnaughtite",
		spritenum: 578,
		megaStone: "Chesnaught-Mega",
		megaEvolves: "Chesnaught",
		itemUser: ["Chesnaught"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Chesnaught, this item allows it to Mega Evolve in battle.",
	},
	delphite: {
		name: "Delphite",
		spritenum: 578,
		megaStone: "Delphox-Mega",
		megaEvolves: "Delphox",
		itemUser: ["Delphox"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Delphox, this item allows it to Mega Evolve in battle.",
	},
	ribombinite: {
		name: "Ribombinite",
		spritenum: 578,
		megaStone: "Ribombee-Mega",
		megaEvolves: "Ribombee",
		itemUser: ["Ribombee"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Ribombee, this item allows it to Mega Evolve in battle.",
	},
	salazzlite: {
		name: "Salazzlite",
		spritenum: 578,
		megaStone: "Salazzle-Mega",
		megaEvolves: "Salazzle",
		itemUser: ["Salazzle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Salazzle, this item allows it to Mega Evolve in battle.",
	},
	golisopodite: {
		name: "Golisopodite",
		spritenum: 578,
		megaStone: "Golisopod-Mega",
		megaEvolves: "Golisopod",
		itemUser: ["Golisopod"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Golisopod, this item allows it to Mega Evolve in battle.",
	},
	dhelmite: {
		name: "Dhelmite",
		spritenum: 578,
		megaStone: "Dhelmise-Mega",
		megaEvolves: "Dhelmise",
		itemUser: ["Dhelmise"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Dhelmise, this item allows it to Mega Evolve in battle.",
	},
	centiskorchitex: {
		name: "Centiskorchite X",
		spritenum: 578,
		megaStone: "Centiskorch-Mega-X",
		megaEvolves: "Centiskorch",
		itemUser: ["Centiskorch"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Centiskorch, this item allows it to Mega Evolve in battle.",
	},
	centiskorchitey: {
		name: "Centiskorchite Y",
		spritenum: 578,
		megaStone: "Centiskorch-Mega-Y",
		megaEvolves: "Centiskorch",
		itemUser: ["Centiskorch"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Centiskorch, this item allows it to Mega Evolve in battle.",
	},
	frosmite: {
		name: "Frosmite",
		spritenum: 578,
		megaStone: "Frosmoth-Mega",
		megaEvolves: "Frosmoth",
		itemUser: ["Frosmoth"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Frosmoth, this item allows it to Mega Evolve in battle.",
	},
	baskironite: {
		name: "Baskironite",
		spritenum: 578,
		megaStone: "Baskiron-Mega",
		megaEvolves: "Baskiron",
		itemUser: ["Baskiron"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Baskiron, this item allows it to Mega Evolve in battle.",
	},
	terreptilite: {
		name: "Terreptilite",
		spritenum: 578,
		megaStone: "Terreptile-Mega",
		megaEvolves: "Terreptile",
		itemUser: ["Terreptile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Terreptile, this item allows it to Mega Evolve in battle.",
	},
	rocksterite: {
		name: "Rocksterite",
		spritenum: 578,
		megaStone: "Rockster-Mega",
		megaEvolves: "Rockster",
		itemUser: ["Rockster"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1080,
		gen: 8,
		desc: "If held by a Rockster, this item allows it to Mega Evolve in battle.",
	},
	infarmatemite: {
		name: "Infarmatemite",
		spritenum: 578,
		megaStone: "Infarmatem-Mega",
		megaEvolves: "Infarmatem",
		itemUser: ["Infarmatem"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1079,
		gen: 8,
		desc: "If held by a Infarmatem, this item allows it to Mega Evolve in battle.",
	},

	chakraseed: {
		name: "Chakra Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('chakraterrain')) {
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('chakraterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: -1881,
		gen: 8,
	},
	honey: {
		name: "Honey",
		fling: {
			basePower: 30,
		},
		num: -1003,
		gen: 4,
    	shortDesc: "Pokemon with the ability Honey Gather or Sweet Veil heal 12.5% when holding this item. Heals status.",
		onAfterSetStatus(status, pokemon) {
			pokemon.eatItem();
		},
		onUpdate(pokemon) {
			if (pokemon.status || pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.cureStatus();
			pokemon.removeVolatile('confusion');
		},
	},
	indecisiveorb: {
		name: "Indecisive Orb",
		fling: {
			basePower: 30,
		},
		onDisableMove: function(pokemon) {
			if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
		},
		onStart(target) {
			this.add('-message', `${target.name} is being tormented!`);
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		desc: "Holder's move have 1.2x BP, but it can't use the same move twice in a row.",
		num: -1270,
		gen: 8,
	},
	deepseascale: {
		name: "Deep Sea Scale",
		spritenum: 93,
		fling: {
			basePower: 30,
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl' || pokemon.baseSpecies.name === 'Gorebyss') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Clamperl", "Gorebyss"],
		num: 227,
		gen: 3,
	},
	deepseatooth: {
		name: "Deep Sea Tooth",
		spritenum: 94,
		fling: {
			basePower: 90,
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl' || pokemon.baseSpecies.name === 'Huntail') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Clamperl", "Huntail"],
		num: 226,
		gen: 3,
	},
}