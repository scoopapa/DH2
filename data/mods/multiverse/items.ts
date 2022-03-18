export const Items: {[itemid: string]: ItemData} = {
	mawilelite: {
		name: "Mawile-Lite",
		spritenum: 1,
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Huge Power', '[from] ability: Intimidate', '[of] ' + pokemon);
			pokemon.setAbility('hugepower');
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Mawile') return false;
			return true;
		},
		num: -1,
		gen: 8,
		shortDesc: "When held by Mawile, Changes Intimidate to Huge Power.",
	},
	earthplate: {
		inherit: true,
		isNonstandard: null,
	},
	smokebomb: {
		name: "Smoke Bomb",
		spritenum: 1,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Greninja') return false;
			return true;
		},
		num: -2,
		gen: 8,
		shortDesc: "When held by Greninja, Dig: +20 BP & 1 turn. Single Use.",
	},
	kokoniumz: {
		name: "Kokonium Z",
		spritenum: 634,
		zMove: "Gigavolt Havoc",
		zMoveFrom: ["Wild Charge", "Thunder Punch", "Volt Switch", "Thunder Wave", "Charge", "Eerie Impulse", "Electric Terrain", "Electro Ball", "Electroweb", "Shock Wave", "Spark", "Thunder Shock"],
		itemUser: ["Tapu Koko"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -3,
		gen: 8,
		shortDesc: "(Bugged) If holder is Tapu Koko, this item allows it to use an Electric Z-Move.",
	},
	solgolumz: {
		name: "Solgolum Z",
		spritenum: 685,
		onTakeItem: false,
		itemUser: ["Solgaleo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		onBasePower(basePower, user, target, move) {
			if (move.id === 'sunsteelstrike') {
				return this.chainModify(1.25);
			}
		},
		num: -4,
		gen: 8,
		shortDesc: "When held by Solgaleo, Sunsteel Strike has 1.25x power. Can't be knocked off.",
	},
};