export const Items: {[itemid: string]: ModdedItemData} = {
	stormmask: {
		name: "Storm Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Emboar') return false;
			return true;
		},
		forcedForme: "Emboar-Storm",
		itemUser: ["Emboar-Storm"],
		num: -1000,
		gen: 9,
		desc: "Emboar-Storm: Terastallize to gain No Guard.",
	},
	metalmask: {
		name: "Metal Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) { 			
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null; 			
			} else {
				pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Emboar') return false;
			return true;
		},
		forcedForme: "Emboar-Metal",
		itemUser: ["Emboar-Metal"],
		num: -1001,
		gen: 9,
		desc: "Emboar-Metal: Terastallize to gain Sheer Force.",
	},
	frostbitemask: {
		name: "Frostbite Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Emboar') return false;
			return true;
		},
		forcedForme: "Emboar-Frostbite",
		itemUser: ["Emboar-Frostbite"],
		num: -1002,
		gen: 9,
		desc: "Emboar-Frostbite: Terastallize to gain Parental Bond.",
	},
	oraclemask: {
		name: "Oracle Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Delphox') return false;
			return true;
		},
		forcedForme: "Delphox-Oracle",
		itemUser: ["Delphox-Oracle"],
		num: -1003,
		gen: 9,
		desc: "Delphox-Oracle: Terastallize to gain Neuroforce.",
	},
	lakelurkermask: {
		name: "Lakelurker Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Swampert') return false;
			return true;
		},
		forcedForme: "Swampert-Lakelurker",
		itemUser: ["Swampert-Lakelurker"],
		num: -1004,
		gen: 9,
		desc: "Swampert-Lakelurker: Terastallize to gain Regenerator.",
	},
	armoredmask: {
		name: "Armored Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Chesnaught') return false;
			return true;
		},
		forcedForme: "Chesnaught-Armored",
		itemUser: ["Chesnaught-Armored"],
		num: -1004,
		gen: 9,
		desc: "Chesnaught-Armored: Terastallize to gain Heatproof.",
	},
	coldmask: {
		name: "Cold Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Boltund') return false;
			return true;
		},
		forcedForme: "Boltund-Cold",
		itemUser: ["Boltund-Cold"],
		num: -1005,
		gen: 9,
		desc: "Boltund-Cold: Terastallize to gain Tough Claws.",
	},
	lightsmask: {
		name: "Lights Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Boltund') return false;
			return true;
		},
		forcedForme: "Boltund-Lights",
		itemUser: ["Boltund-Lights"],
		num: -1006,
		gen: 9,
		desc: "Boltund-Lights: Terastallize to gain Dazzling.",
	},
	crashmask: {
		name: "Crash Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Boltund') return false;
			return true;
		},
		forcedForme: "Boltund-Crash",
		itemUser: ["Boltund-Crash"],
		num: -1007,
		gen: 9,
		desc: "Boltund-Crash: Terastallize to gain Guts.",
	},
	sandshroudmask: {
		name: "Sandshroud Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Gardevoir') return false;
			return true;
		},
		forcedForme: "Gardevoir-Sandshroud",
		itemUser: ["Gardevoir-Sandshroud"],
		num: -1008,
		gen: 9,
		desc: "Gardevoir-Sandshroud: Terastallize to gain Sand Stream.",
	},
	blightbentmask: {
		name: "Blightbent Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Gardevoir') return false;
			return true;
		},
		forcedForme: "Gardevoir-Blightbent",
		itemUser: ["Gardevoir-Blightbent"],
		num: -1009,
		gen: 9,
		desc: "Gardevoir-Blightbent: Terastallize to gain Toxic Chain.",
	},
	allicemask: {
		name: "All Ice Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Gardevoir') return false;
			return true;
		},
		forcedForme: "Gardevoir-All-Ice",
		itemUser: ["Gardevoir-All-Ice"],
		num: -1010,
		gen: 9,
		desc: "Gardevoir-All-Ice: Terastallize to gain Snow Warning.",
	},
	pondweedmask: {
		name: "Pondweed Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Arboliva') return false;
			return true;
		},
		forcedForme: "Arboliva-Pondweed",
		itemUser: ["Arboliva-Pondweed"],
		num: -1011,
		gen: 9,
		desc: "Arboliva-Pondweed: Terastallize to gain Unaware.",
	},
	sundewmask: {
		name: "Sundew Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Arboliva') return false;
			return true;
		},
		forcedForme: "Arboliva-Sundew",
		itemUser: ["Arboliva-Sundew"],
		num: -1012,
		gen: 9,
		desc: "Arboliva-Sundew: Terastallize to gain Toxic Chain.",
	},
	jetmask: {
		name: "Jet Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Corviknight') return false;
			return true;
		},
		forcedForme: "Corviknight-Jet",
		itemUser: ["Corviknight-Jet"],
		num: -1013,
		gen: 9,
		desc: "Corviknight-Jet: Terastallize to gain Gale Wings.",
	},
	burrowingmask: {
		name: "Burrowing Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Corviknight') return false;
			return true;
		},
		forcedForme: "Corviknight-Burrowing",
		itemUser: ["Corviknight-Burrowing"],
		num: -1014,
		gen: 9,
		desc: "Corviknight-Burrowing: Terastallize to gain Earth Eater.",
	},
	dragonblademask: {
		name: "Dragonblade Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Drapion') return false;
			return true;
		},
		forcedForme: "Drapion-Dragonblade",
		itemUser: ["Drapion-Dragonblade"],
		num: -1015,
		gen: 9,
		desc: "Drapion-Dragonblade: Terastallize to gain Stakeout.",
	},
	hydroscythemask: {
		name: "Hydroscythe Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Drapion') return false;
			return true;
		},
		forcedForme: "Drapion-Hydroscythe",
		itemUser: ["Drapion-Hydroscythe"],
		num: -1016,
		gen: 9,
		desc: "Drapion-Hydroscythe: Terastallize to gain Merciless.",
	},
	wispaxemask: {
		name: "Wispaxe Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Drapion') return false;
			return true;
		},
		forcedForme: "Drapion-Wispaxe",
		itemUser: ["Drapion-Wispaxe"],
		num: -1017,
		gen: 9,
		desc: "Drapion-Wispaxe: Terastallize to gain Defiant.",
	},
	lionheartmask: {
		name: "Lionheart Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Flygon') return false;
			return true;
		},
		forcedForme: "Flygon-Lionheart",
		itemUser: ["Flygon-Lionheart"],
		num: -1018,
		gen: 9,
		desc: "Flygon-Lionheart: Terastallize to gain Compound Eyes.",
	},
	cicadasongmask: {
		name: "Cicadasong Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Flygon') return false;
			return true;
		},
		forcedForme: "Flygon-Cicadasong",
		itemUser: ["Flygon-Cicadasong"],
		num: -1019,
		gen: 9,
		desc: "Flygon-Cicadasong: Terastallize to gain Liquid Voice.",
	},
	beetlestonemask: {
		name: "Beetlestone Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Flygon') return false;
			return true;
		},
		forcedForme: "Flygon-Beetlestone",
		itemUser: ["Flygon-Beetlestone"],
		num: -1020,
		gen: 9,
		desc: "Flygon-Beetlestone: Terastallize to gain Analytic.",
	},
	hotheadedmask: {
		name: "Hot-Headed Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Drifblim') return false;
			return true;
		},
		forcedForme: "Drifblim-Hot-Headed",
		itemUser: ["Drifblim-Hot-Headed"],
		num: -1021,
		gen: 9,
		desc: "Drifblim-Hot-Headed: Terastallize to gain Hot-Headed.",
	},
	calmedmask: {
		name: "Calmed Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Drifblim') return false;
			return true;
		},
		forcedForme: "Drifblim-Calmed",
		itemUser: ["Drifblim-Calmed"],
		num: -1022,
		gen: 9,
		desc: "Drifblim-Calmed: Terastallize to gain Calm Demeanor.",
	},
	noxiousmask: {
		name: "Noxious Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Drifblim') return false;
			return true;
		},
		forcedForme: "Drifblim-Noxious",
		itemUser: ["Drifblim-Noxious"],
		num: -1023,
		gen: 9,
		desc: "Drifblim-Noxious: Terastallize to gain Aroma Veil.",
	},
	arrowedgemask: {
		name: "Arrowedge Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Kleavor') return false;
			return true;
		},
		forcedForme: "Kleavor-Arrowedge",
		itemUser: ["Kleavor-Arrowedge"],
		num: -1024,
		gen: 9,
		desc: "Kleavor-Arrowedge: Terastallize to gain Sharpness.",
	},
	galenaheadmask: {
		name: "Galenahead Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Kleavor') return false;
			return true;
		},
		forcedForme: "Kleavor-Galenahead",
		itemUser: ["Kleavor-Galenahead"],
		num: -1025,
		gen: 9,
		desc: "Kleavor-Galenahead: Terastallize to gain Levitate.",
	},
	expertblademask: {
		name: "Expertblade Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Kleavor') return false;
			return true;
		},
		forcedForme: "Kleavor-Expertblade",
		itemUser: ["Kleavor-Expertblade"],
		num: -1026,
		gen: 9,
		desc: "Kleavor-Expertblade: Terastallize to gain Normalize.",
	},
};
