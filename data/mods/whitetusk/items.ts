export const Items: {[itemid: string]: ModdedItemData} = {
	coremodule: {
		name: "Core Module",
		desc: "Must be held by Xylyeozop.",
		spritenum: 272,
		fling: {
			basePower: 120,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.name === "Xylyeozop") || pokemon.baseSpecies.name === "Xylyeozop") {
				return false;
			}
			return true;
		},
		itemUser: ["Xylyeozop"],
	},
	freshstick: {
		name: "Fresh Stick",
		desc: "Must be held by Gumbrawl-Fresh.",
		spritenum: 272,
		fling: {
			basePower: 120,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.species.name === "Gumbrawl-Fresh") || pokemon.species.name === "Gumbrawl-Fresh") {
				return false;
			}
			return true;
		},
		itemUser: ["Gumbrawl-Fresh"],
	},
	luminousbubble: {
		name: "Luminous Bubble",
		desc: "Must be held by Gumbrawl-Bubble.",
		spritenum: 272,
		fling: {
			basePower: 120,
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.species.name === "Gumbrawl-Bubble") || pokemon.species.name === "Gumbrawl-Bubble") {
				return false;
			}
			return true;
		},
		itemUser: ["Gumbrawl-Bubble"],
	},
	futuresphere: {
		name: "Future Sphere",
		desc: "If held by a Dormirr, its Steel- and Fairy-type attacks have 1.2x power.",
		spritenum: 180,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name === "Dormirr" && (move.type === 'Steel' || move.type === 'Fairy')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.name === "Dormirr") || pokemon.baseSpecies.name === "Dormirr") {
				return false;
			}
			return true;
		},
		itemUser: ["Dormirr"],
	},
	cursedseal: {
		name: "Cursed Seal",
		desc: "If held by a Blite, allows it to switch formes every turn.",
		spritenum: 461,
		fling: {
			basePower: 30,
		},
		onResidual(pokemon) {
			if (pokemon.species.baseSpecies !== 'Blite' || pokemon.transformed) return;
			const targetForme = pokemon.species.name === 'Blite' ? 'Blite-Blight' : 'Blite';
			pokemon.formeChange(targetForme);
			this.add('-message', `${pokemon.name} transformed!`);
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.name === "Blite") || pokemon.baseSpecies.name === "Blite") {
				return false;
			}
			return true;
		},
		itemUser: ["Blite"],
	},
};