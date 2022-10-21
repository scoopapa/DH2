export const Items: {[itemid: string]: ItemData} = {
	mawilelite: {
		name: "Mawile-Lite",
		spritenum: 1,
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.name === 'Mawile') {
				pokemon.formeChange('Mawile-Mega', this.effect, true);
				this.add('-message', "Mawile mega evolved!");
			}
		},
		onTakeItem(item, pokemon) {
			if (pokemon.baseSpecies.name === 'Mawile-Mega') {
				pokemon.formeChange('Mawile', this.effect, true);
				this.add('-message', "Mawile's power got sealed!");
			}
		},
		num: -1,
		gen: 8,
		shortDesc: "Transforms Mawile into its Mega. Transforms back when loosing this item.",
	},
	earthplate: {
		inherit: true,
		isNonstandard: null,
		forcedForme: null,
	},
	smokebomb: {
		name: "Smoke Bomb",
		spritenum: 1,
		zMove: true,
		zMoveType: "Ground",
		itemUser: ["Greninja"],
		onTakeItem: false,
		num: -2,
		gen: 8,
		shortDesc: "If holder is Greninja, this item allows it to use an Ground Z-Move.",
	},
	fairymemory: {
		inherit: true,
		forcedForme: null,
	},
	kokoniumz: {
		name: "Kokonium Z",
		spritenum: 634,
		zMove: true,
		zMoveType: "Electric",
		itemUser: ["Tapu Koko"],
		onTakeItem: false,
		num: -3,
		gen: 8,
		shortDesc: "If holder is Tapu Koko, this item allows it to use an Electric Z-Move.",
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