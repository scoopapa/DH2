export const Items: {[itemid: string]: ModdedItemData} = {
	starsweet: {
		inherit: true,
		shortDesc: "Holder's use of Meteor Shower lasts 8 turns instead of 5.",
		rating: 2,
	},
	sligmaball: {
		name: "Sligma Ball",
		spritenum: 625,
		megaStone: "Sligma-Mega",
		megaEvolves: "Sligma",
		itemUser: ["Sligma", "Sligma-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
		desc: "If held by Sligma, this item allows it to Mega Evolve in battle.",
	},
	stunfiskite: {
		name: "Stunfiskite",
		spritenum: 628,
		megaStone: "Stunfisk-Galar-Mega",
		megaEvolves: "Stunfisk-Galar",
		itemUser: ["Stunfisk-Galar", "Stunfisk-Galar-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2,
		gen: 9,
		desc: "If held by Stunfisk-Galar, this item allows it to Mega Evolve in battle.",
	},
	jokerite: {
		name: "Jokerite",
		spritenum: 589,
		megaStone: "Hamburger-Mega",
		megaEvolves: "Hamburger",
		itemUser: ["Hamburger", "Hamburger-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -3,
		gen: 9,
		desc: "If held by Hamburger, this item allows it to Mega Evolve in battle.",
	},
	boosterenergy: {
			name: "Booster Energy",
			spritenum: 745,
			fling: {
				basePower: 30,
			},
			onStart() {
				this.effectState.started = true;
			},
			onUpdate(pokemon) {
				if (!this.effectState.started || pokemon.transformed) return;
				if (this.queue.peek(true)?.choice === 'runSwitch') return;
	
				if (pokemon.hasAbility('protosynthesis') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
					pokemon.addVolatile('protosynthesis');
				}
				if (pokemon.hasAbility('protosandthesis') && !this.field.isWeather('sandstorm') && pokemon.useItem()) {
					pokemon.addVolatile('protosandthesis');
				}
				if (pokemon.hasAbility('quarkdrive') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
					pokemon.addVolatile('quarkdrive');
				}
			},
			onTakeItem(item, source) {
				if (source.baseSpecies.tags.includes("Paradox")) return false;
				return true;
			},
			num: 1880,
			gen: 9,
			desc: "Activates Paradox Abilities. Single Use."
		},
};