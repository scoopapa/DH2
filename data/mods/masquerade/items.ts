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
		desc: "Gardevoir-Sandshroud: Terastallize to gain Dry Skin.",
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
		desc: "Gardevoir-Blightbent: Terastallize to gain Poison Point.",
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
		desc: "Gardevoir-All-Ice: Terastallize to gain Clear Body.",
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
	volcanicmask: {
		name: "Volcanic Mask",
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
			if (source.baseSpecies.baseSpecies === 'Feraligatr') return false;
			return true;
		},
		forcedForme: "Feraligatr-Volcanic",
		itemUser: ["Feraligatr-Volcanic"],
		num: -1027,
		gen: 9,
		desc: "Feraligatr-Volcanic: Terastallize to gain Grassy Surge.",
	},
	irradiatingmask: {
		name: "Irradiating Mask",
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
			if (source.baseSpecies.baseSpecies === 'Feraligatr') return false;
			return true;
		},
		forcedForme: "Feraligatr-Irradiating",
		itemUser: ["Feraligatr-Irradiating"],
		num: -1028,
		gen: 9,
		desc: "Feraligatr-Irradiating: Terastallize to gain Water Veil.",
	},
	zenithbugmask: {
		name: "Zenithbug Mask",
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
			if (source.baseSpecies.baseSpecies === 'Porygon2') return false;
			return true;
		},
		forcedForme: "Porygon2-Zenithbug",
		itemUser: ["Porygon2-Zenithbug"],
		num: -1029,
		gen: 9,
		desc: "Porygon2-Zenithbug: Terastallize to gain System Override.",
	},
	retrowavemask: {
		name: "Retrowave Mask",
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
			if (source.baseSpecies.baseSpecies === 'Porygon2') return false;
			return true;
		},
		forcedForme: "Porygon2-Retrowave",
		itemUser: ["Porygon2-Retrowave"],
		num: -1030,
		gen: 9,
		desc: "Porygon2-Retrowave: Terastallize to gain Surge Surfer.",
	},
	dreamnetmask: {
		name: "Dreamnet Mask",
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
			if (source.baseSpecies.baseSpecies === 'Porygon2') return false;
			return true;
		},
		forcedForme: "Porygon2-Dreamnet",
		itemUser: ["Porygon2-Dreamnet"],
		num: -1031,
		gen: 9,
		desc: "Porygon2-Dreamnet: Terastallize to gain Serene Grace.",
	},
	foamflowmask: {
		name: "Foamflow Mask",
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
			if (source.baseSpecies.baseSpecies === 'Kingdra') return false;
			return true;
		},
		forcedForme: "Kingdra-Foamflow",
		itemUser: ["Kingdra-Foamflow"],
		num: -1032,
		gen: 9,
		desc: "Kingdra-Foamflow: Terastallize to gain Competitive.",
	},
	rushwashmask: {
		name: "Rushwash Mask",
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
			if (source.baseSpecies.baseSpecies === 'Kingdra') return false;
			return true;
		},
		forcedForme: "Kingdra-Rushwash",
		itemUser: ["Kingdra-Rushwash"],
		num: -1033,
		gen: 9,
		desc: "Kingdra-Rushwash: Terastallize to gain Scrappy.",
	},
	frostshotmask: {
		name: "Frostshot Mask",
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
			if (source.baseSpecies.baseSpecies === 'Kingdra') return false;
			return true;
		},
		forcedForme: "Kingdra-Frostshot",
		itemUser: ["Kingdra-Frostshot"],
		num: -1034,
		gen: 9,
		desc: "Kingdra-Frostshot: Terastallize to gain Super Luck.",
	},
	webcrawlermask: {
		name: "Webcrawler Mask",
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
			if (source.baseSpecies.baseSpecies === 'Galvantula') return false;
			return true;
		},
		forcedForme: "Galvantula-Webcrawler",
		itemUser: ["Galvantula-Webcrawler"],
		num: -1035,
		gen: 9,
		desc: "Galvantula-Webcrawler: Terastallize to gain Oblivious.",
	},
	pyrefangmask: {
		name: "Pyrefang Mask",
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
			if (source.baseSpecies.baseSpecies === 'Galvantula') return false;
			return true;
		},
		forcedForme: "Galvantula-Pyrefang",
		itemUser: ["Galvantula-Pyrefang"],
		num: -1036,
		gen: 9,
		desc: "Galvantula-Pyrefang: Terastallize to gain Infiltrator.",
	},
	widowmakermask: {
		name: "Widowmaker Mask",
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
			if (source.baseSpecies.baseSpecies === 'Galvantula') return false;
			return true;
		},
		forcedForme: "Galvantula-Widowmaker",
		itemUser: ["Galvantula-Widowmaker"],
		num: -1037,
		gen: 9,
		desc: "Galvantula-Widowmaker: Terastallize to gain Purifying Salt.",
	},
	rubyheadmask: {
		name: "Rubyhead Mask",
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
			if (source.baseSpecies.baseSpecies === 'Druddigon') return false;
			return true;
		},
		forcedForme: "Druddigon-Rubyhead",
		itemUser: ["Druddigon-Rubyhead"],
		num: -1038,
		gen: 9,
		desc: "Druddigon-Rubyhead: Terastallize to gain Sheer Force.",
	},
	sharpshotmask: {
		name: "Sharpshot Mask",
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
			if (source.baseSpecies.baseSpecies === 'Druddigon') return false;
			return true;
		},
		forcedForme: "Druddigon-Sharpshot",
		itemUser: ["Druddigon-Sharpshot"],
		num: -1039,
		gen: 9,
		desc: "Druddigon-Sharpshot: Terastallize to gain Technician.",
	},
	freezeflamemask: {
		name: "Freezeflame Mask",
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
			if (source.baseSpecies.baseSpecies === 'Aurorus') return false;
			return true;
		},
		forcedForme: "Aurorus-Freezeflame",
		itemUser: ["Aurorus-Freezeflame"],
		num: -1040,
		gen: 9,
		desc: "Aurorus-Freezeflame: Terastallize to gain Sheer Force.",
	},
	glaciermask: {
		name: "Glacier Mask",
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
			if (source.baseSpecies.baseSpecies === 'Aurorus') return false;
			return true;
		},
		forcedForme: "Aurorus-Glacier",
		itemUser: ["Aurorus-Glacier"],
		num: -1041,
		gen: 9,
		desc: "Aurorus-Glacier: Terastallize to gain Water Absorb.",
	},
	jungletrimmermask: {
		name: "Jungletrimmer Mask",
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
			if (source.baseSpecies.baseSpecies === 'Excadrill') return false;
			return true;
		},
		forcedForme: "Excadrill-Jungletrimmer",
		itemUser: ["Excadrill-Jungletrimmer"],
		num: -1042,
		gen: 9,
		desc: "Excadrill-Jungletrimmer: Terastallize to gain Tough Claws.",
	},
	ancientspearmask: {
		name: "Ancientspear Mask",
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
			if (source.baseSpecies.baseSpecies === 'Excadrill') return false;
			return true;
		},
		forcedForme: "Excadrill-Ancientspear",
		itemUser: ["Excadrill-Ancientspear"],
		num: -1043,
		gen: 9,
		desc: "Excadrill-Ancientspear: Terastallize to gain Solid Rock.",
	},
	exoslashermask: {
		name: "Exoslasher Mask",
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
			if (source.baseSpecies.baseSpecies === 'Excadrill') return false;
			return true;
		},
		forcedForme: "Excadrill-Exoslasher",
		itemUser: ["Excadrill-Exoslasher"],
		num: -1044,
		gen: 9,
		desc: "Excadrill-Exoslasher: Terastallize to gain Defiant.",
	},
	scaresporemask: {
		name: "Scarespore Mask",
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
			if (source.baseSpecies.baseSpecies === 'Whimsicott') return false;
			return true;
		},
		forcedForme: "Whimsicott-Scarespore",
		itemUser: ["Whimsicott-Scarespore"],
		num: -1045,
		gen: 9,
		desc: "Whimsicott-Scarespore: Terastallize to gain Analytic.",
	},
	steelsporemask: {
		name: "Steelspore Mask",
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
			if (source.baseSpecies.baseSpecies === 'Whimsicott') return false;
			return true;
		},
		forcedForme: "Whimsicott-Steelspore",
		itemUser: ["Whimsicott-Steelspore"],
		num: -1046,
		gen: 9,
		desc: "Whimsicott-Steelspore: Terastallize to gain Infiltrator.",
	},
	windsporemask: {
		name: "Windspore Mask",
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
			if (source.baseSpecies.baseSpecies === 'Whimsicott') return false;
			return true;
		},
		forcedForme: "Whimsicott-Windspore",
		itemUser: ["Whimsicott-Windspore"],
		num: -1047,
		gen: 9,
		desc: "Whimsicott-Windspore: Terastallize to gain No Guard.",
	},
	mothmanmask: {
		name: "Mothman Mask",
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
			if (source.baseSpecies.baseSpecies === 'Absol') return false;
			return true;
		},
		forcedForme: "Absol-Mothman",
		itemUser: ["Absol-Mothman"],
		num: -1048,
		gen: 9,
		desc: "Absol-Mothman: Terastallize to gain Sharpness.",
	},
	sandscythemask: {
		name: "Sandscythe Mask",
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
			if (source.baseSpecies.baseSpecies === 'Absol') return false;
			return true;
		},
		forcedForme: "Absol-Sandscythe",
		itemUser: ["Absol-Sandscythe"],
		num: -1049,
		gen: 9,
		desc: "Absol-Sandscythe: Terastallize to gain Victory Star.",
	},
	archangelsmask: {
		name: "Archangels Mask",
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
			if (source.baseSpecies.baseSpecies === 'Absol') return false;
			return true;
		},
		forcedForme: "Absol-Archangels",
		itemUser: ["Absol-Archangels"],
		num: -1050,
		gen: 9,
		desc: "Absol-Archangels: Terastallize to gain Shield Dust.",
	},
	blackholemask: {
		name: "Black-Hole Mask",
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
			if (source.baseSpecies.baseSpecies === 'Guzzlord') return false;
			return true;
		},
		forcedForme: "Guzzlord-Black-Hole",
		itemUser: ["Guzzlord-Black-Hole"],
		num: -1051,
		gen: 9,
		desc: "Guzzlord-Black-Hole: Terastallize to gain Gravitas Body.",
	},
	miasmamask: {
		name: "Miasma Mask",
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
			if (source.baseSpecies.baseSpecies === 'Guzzlord') return false;
			return true;
		},
		forcedForme: "Guzzlord-Miasma",
		itemUser: ["Guzzlord-Miasma"],
		num: -1052,
		gen: 9,
		desc: "Guzzlord-Miasma: Terastallize to gain Regenerator.",
	},
	rainbowmask: {
		name: "Rainbow Mask",
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
			if (source.baseSpecies.baseSpecies === 'Guzzlord') return false;
			return true;
		},
		forcedForme: "Guzzlord-Rainbow",
		itemUser: ["Guzzlord-Rainbow"],
		num: -1053,
		gen: 9,
		desc: "Guzzlord-Rainbow: Terastallize to gain Magic Bounce.",
	},
	incensemask: {
		name: "Incense Mask",
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
			if (source.baseSpecies.baseSpecies === 'Gigalith') return false;
			return true;
		},
		forcedForme: "Gigalith-Incense",
		itemUser: ["Gigalith-Incense"],
		num: -1054,
		gen: 9,
		desc: "Gigalith-Incense: Terastallize to gain Unaware.",
	},
	graveyardmask: {
		name: "Graveyard Mask",
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
			if (source.baseSpecies.baseSpecies === 'Gigalith') return false;
			return true;
		},
		forcedForme: "Gigalith-Graveyard",
		itemUser: ["Gigalith-Graveyard"],
		num: -1055,
		gen: 9,
		desc: "Gigalith-Graveyard: Terastallize to gain Purifying Salt.",
	},
	swarmrockmask: {
		name: "Swarmrock Mask",
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
			if (source.baseSpecies.baseSpecies === 'Gigalith') return false;
			return true;
		},
		forcedForme: "Gigalith-Swarmrock",
		itemUser: ["Gigalith-Swarmrock"],
		num: -1056,
		gen: 9,
		desc: "Gigalith-Swarmrock: Terastallize to gain Honeystone.",
	},
	starfightermask: {
		name: "Starfighter Mask",
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
			if (source.baseSpecies.baseSpecies === 'Starmie') return false;
			return true;
		},
		forcedForme: "Starmie-Starfighter",
		itemUser: ["Starmie-Starfighter"],
		num: -1057,
		gen: 9,
		desc: "Starmie-Starfighter: Terastallize to gain Scrappy.",
	},
	ufomask: {
		name: "UFO Mask",
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
			if (source.baseSpecies.baseSpecies === 'Starmie') return false;
			return true;
		},
		forcedForme: "Starmie-UFO",
		itemUser: ["Starmie-UFO"],
		num: -1058,
		gen: 9,
		desc: "Starmie-UFO: Terastallize to gain Iron Barbs.",
	},
	burningstarmask: {
		name: "Burningstar Mask",
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
			if (source.baseSpecies.baseSpecies === 'Starmie') return false;
			return true;
		},
		forcedForme: "Starmie-Burningstar",
		itemUser: ["Starmie-Burningstar"],
		num: -1059,
		gen: 9,
		desc: "Starmie-Burningstar: Terastallize to gain Flash Fire.",
	},
	scarabshieldmask: {
		name: "Scarabshield Mask",
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
			if (source.baseSpecies.baseSpecies === 'Kommo-o') return false;
			return true;
		},
		forcedForme: "Kommo-o-Scarabshield",
		itemUser: ["Kommo-o-Scarabshield"],
		num: -1060,
		gen: 9,
		desc: "Kommo-o-Scarabshield: Terastallize to gain Shield Dust.",
	},
	metalscalemask: {
		name: "Metalscale Mask",
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
			if (source.baseSpecies.baseSpecies === 'Kommo-o') return false;
			return true;
		},
		forcedForme: "Kommo-o-Metalscale",
		itemUser: ["Kommo-o-Metalscale"],
		num: -1061,
		gen: 9,
		desc: "Kommo-o-Metalscale: Terastallize to gain Justified.",
	},
	combatwingmask: {
		name: "Combatwing Mask",
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
			if (source.baseSpecies.baseSpecies === 'Kommo-o') return false;
			return true;
		},
		forcedForme: "Kommo-o-Combatwing",
		itemUser: ["Kommo-o-Combatwing"],
		num: -1062,
		gen: 9,
		desc: "Kommo-o-Combatwing: Terastallize to gain Mold Breaker.",
	},
	seawitchmask: {
		name: "Sea-Witch Mask",
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
			if (source.baseSpecies.baseSpecies === 'Jellicent') return false;
			return true;
		},
		forcedForme: "Jellicent-Sea-Witch",
		itemUser: ["Jellicent-Sea-Witch"],
		num: -1063,
		gen: 9,
		desc: "Jellicent-Sea-Witch: Terastallize to gain Purifying Salt.",
	},
	ironcladmask: {
		name: "Ironclad Mask",
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
			if (source.baseSpecies.baseSpecies === 'Jellicent') return false;
			return true;
		},
		forcedForme: "Jellicent-Ironclad",
		itemUser: ["Jellicent-Ironclad"],
		num: -1064,
		gen: 9,
		desc: "Jellicent-Ironclad: Terastallize to gain Bulletproof.",
	},
	fairydustmask: {
		name: "Fairydust Mask",
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
			if (source.baseSpecies.baseSpecies === 'Toedscruel') return false;
			return true;
		},
		forcedForme: "Toedscruel-Fairydust",
		itemUser: ["Toedscruel-Fairydust"],
		num: -1065,
		gen: 9,
		desc: "Toedscruel-Fairydust: Terastallize to gain Shield Dust.",
	},
	wyrmstoolmask: {
		name: "Wyrmstool Mask",
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
			if (source.baseSpecies.baseSpecies === 'Toedscruel') return false;
			return true;
		},
		forcedForme: "Toedscruel-Wyrmstool",
		itemUser: ["Toedscruel-Wyrmstool"],
		num: -1066,
		gen: 9,
		desc: "Toedscruel-Wyrmstool: Terastallize to gain Purifying Salt.",
	},
	mushrootmask: {
		name: "Mushroot Mask",
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
			if (source.baseSpecies.baseSpecies === 'Toedscruel') return false;
			return true;
		},
		forcedForme: "Toedscruel-Mushroot",
		itemUser: ["Toedscruel-Mushroot"],
		num: -1067,
		gen: 9,
		desc: "Toedscruel-Mushroot: Terastallize to gain Seed Sower.",
	},
	winterstylemask: {
		name: "Winterstyle Mask",
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
			if (source.baseSpecies.baseSpecies === 'Tsareena') return false;
			return true;
		},
		forcedForme: "Tsareena-Winterstyle",
		itemUser: ["Tsareena-Winterstyle"],
		num: -1068,
		gen: 9,
		desc: "Tsareena-Winterstyle: Terastallize to gain Skill Link.",
	},
	feathercrownmask: {
		name: "Feathercrown Mask",
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
			if (source.baseSpecies.baseSpecies === 'Tsareena') return false;
			return true;
		},
		forcedForme: "Tsareena-Feathercrown",
		itemUser: ["Tsareena-Feathercrown"],
		num: -1069,
		gen: 9,
		desc: "Tsareena-Feathercrown: Terastallize to gain Aerilate.",
	},
	warmaidensmask: {
		name: "Warmaidens Mask",
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
			if (source.baseSpecies.baseSpecies === 'Tsareena') return false;
			return true;
		},
		forcedForme: "Tsareena-Warmaidens",
		itemUser: ["Tsareena-Warmaidens"],
		num: -1070,
		gen: 9,
		desc: "Tsareena-Warmaidens: Terastallize to gain Rock Head.",
	},
	scaldingmask: {
		name: "Scalding Mask",
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
			if (source.baseSpecies.baseSpecies === 'Sinistcha') return false;
			return true;
		},
		forcedForme: "Sinistcha-Scalding",
		itemUser: ["Sinistcha-Scalding", "Sinistcha-Scalding-Corrosive"],
		num: -1071,
		gen: 9,
		desc: "Sinistcha-Scalding: Terastallize to gain Turboblaze.",
	},
	corrosivemask: {
		name: "Corrosive Mask",
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
			if (source.baseSpecies.baseSpecies === 'Sinistcha') return false;
			return true;
		},
		forcedForme: "Sinistcha-Corrosive",
		itemUser: ["Sinistcha-Corrosive", "Sinistcha-Masterpiece-Corrosive"],
		num: -1072,
		gen: 9,
		desc: "Sinistcha-Corrosive: Terastallize to gain Noxious Liquid.",
	},
	puremask: {
		name: "Pure Mask",
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
			if (source.baseSpecies.baseSpecies === 'Sinistcha') return false;
			return true;
		},
		forcedForme: "Sinistcha-Pure",
		itemUser: ["Sinistcha-Pure", "Sinistcha-Masterpiece-Pure"],
		num: -1073,
		gen: 9,
		desc: "Sinistcha-Pure: Terastallize to gain Pure Water.",
	},
	ricerollmask: {
		name: "Riceroll Mask",
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
			if (source.baseSpecies.baseSpecies === 'Tatsugiri') return false;
			return true;
		},
		forcedForme: "Tatsugiri-Riceroll",
		itemUser: ["Tatsugiri-Riceroll"],
		num: -1075,
		gen: 9,
		desc: "Tatsugiri-Riceroll: Terastallize to gain Pixilate.",
	},
	tempuramask: {
		name: "Tempura Mask",
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
			if (source.baseSpecies.baseSpecies === 'Tatsugiri') return false;
			return true;
		},
		forcedForme: "Tatsugiri-Tempura",
		itemUser: ["Tatsugiri-Tempura"],
		num: -1076,
		gen: 9,
		desc: "Tatsugiri-Tempura: Terastallize to gain Flame Body.",
	},
	stormcloudmask: {
		name: "Stormcloud Mask",
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
			if (source.baseSpecies.baseSpecies === 'Wigglytuff') return false;
			return true;
		},
		forcedForme: "Wigglytuff-Stormcloud",
		itemUser: ["Wigglytuff-Stormcloud"],
		num: -1077,
		gen: 9,
		desc: "Wigglytuff-Stormcloud: Terastallize to gain Electric Surge.",
	},
	moonlightmask: {
		name: "Moonlight Mask",
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
			if (source.baseSpecies.baseSpecies === 'Wigglytuff') return false;
			return true;
		},
		forcedForme: "Wigglytuff-Moonlight",
		itemUser: ["Wigglytuff-Moonlight"],
		num: -1078,
		gen: 9,
		desc: "Wigglytuff-Moonlight: Terastallize to gain Psychic Surge.",
	},
	nightballoonmask: {
		name: "Nightballoon Mask",
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
			if (source.baseSpecies.baseSpecies === 'Wigglytuff') return false;
			return true;
		},
		forcedForme: "Wigglytuff-Nightballoon",
		itemUser: ["Wigglytuff-Nightballoon"],
		num: -1079,
		gen: 9,
		desc: "Wigglytuff-Nightballoon: Terastallize to gain Misty Surge.",
	},
	nightkitemask: {
		name: "Nightkite Mask",
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
			if (source.baseSpecies.baseSpecies === 'Crobat') return false;
			return true;
		},
		forcedForme: "Crobat-Nightkite",
		itemUser: ["Crobat-Nightkite"],
		num: -1080,
		gen: 9,
		desc: "Crobat-Nightkite: Terastallize to gain Wind Rider.",
	},
	herowingmask: {
		name: "Herowing Mask",
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
			if (source.baseSpecies.baseSpecies === 'Crobat') return false;
			return true;
		},
		forcedForme: "Crobat-Herowing",
		itemUser: ["Crobat-Herowing"],
		num: -1081,
		gen: 9,
		desc: "Crobat-Herowing: Terastallize to gain Reckless.",
	},
	petalvampmask: {
		name: "Petalvamp Mask",
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
			if (source.baseSpecies.baseSpecies === 'Crobat') return false;
			return true;
		},
		forcedForme: "Crobat-Petalvamp",
		itemUser: ["Crobat-Petalvamp"],
		num: -1082,
		gen: 9,
		desc: "Crobat-Petalvamp: Terastallize to gain Sharpness.",
	},
	sunfishmask: {
		name: "Sunfish Mask",
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
			if (source.baseSpecies.baseSpecies === 'Solgaleo') return false;
			return true;
		},
		forcedForme: "Solgaleo-Sunfish",
		itemUser: ["Solgaleo-Sunfish"],
		num: -1083,
		gen: 9,
		desc: "Solgaleo-Sunfish: Terastallize to gain Clear Body.",
	},
	suncoremask: {
		name: "Suncore Mask",
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
			if (source.baseSpecies.baseSpecies === 'Solgaleo') return false;
			return true;
		},
		forcedForme: "Solgaleo-Suncore",
		itemUser: ["Solgaleo-Suncore"],
		num: -1084,
		gen: 9,
		desc: "Solgaleo-Suncore: Terastallize to gain Flame Body.",
	},
	sunflowermask: {
		name: "Sunflower Mask",
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
			if (source.baseSpecies.baseSpecies === 'Solgaleo') return false;
			return true;
		},
		forcedForme: "Solgaleo-Sunflower",
		itemUser: ["Solgaleo-Sunflower"],
		num: -1085,
		gen: 9,
		desc: "Solgaleo-Sunflower: Terastallize to gain Heatproof.",
	},
	guardianmask: {
		name: "Guardian Mask",
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
			if (source.baseSpecies.baseSpecies === 'Granbull') return false;
			return true;
		},
		forcedForme: "Granbull-Guardian",
		itemUser: ["Granbull-Guardian"],
		num: -1086,
		gen: 9,
		desc: "Granbull-Guardian: Terastallize to gain Regenerator.",
	},
	wardenmask: {
		name: "Warden Mask",
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
			if (source.baseSpecies.baseSpecies === 'Granbull') return false;
			return true;
		},
		forcedForme: "Granbull-Warden",
		itemUser: ["Granbull-Warden"],
		num: -1087,
		gen: 9,
		desc: "Granbull-Warden: Terastallize to gain Chlorophyll.",
	},
	shadowspearmask: {
		name: "Shadowspear Mask",
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
			if (source.baseSpecies.baseSpecies === 'Iron Bundle') return false;
			return true;
		},
		forcedForme: "Iron Bundle-Shadowspear",
		itemUser: ["Iron Bundle-Shadowspear"],
		num: -1088,
		gen: 9,
		desc: "Iron Bundle-Shadowspear: Terastallize to gain Sheer Force.",
	},
	voltchurnermask: {
		name: "Voltchurner Mask",
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
			if (source.baseSpecies.baseSpecies === 'Iron Bundle') return false;
			return true;
		},
		forcedForme: "Iron Bundle-Voltchurner",
		itemUser: ["Iron Bundle-Voltchurner"],
		num: -1089,
		gen: 9,
		desc: "Iron Bundle-Voltchurner: Terastallize to gain Intimidate.",
	},
	hydramuraimask: {
		name: "Hydramurai Mask",
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
			if (source.baseSpecies.baseSpecies === 'Kingambit') return false;
			return true;
		},
		forcedForme: "Kingambit-Hydramurai",
		itemUser: ["Kingambit-Hydramurai"],
		num: -1090,
		gen: 9,
		desc: "Kingambit-Hydramurai: Terastallize to gain Bulletproof.",
	},
	poisonforgedmask: {
		name: "Poisonforged Mask",
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
			if (source.baseSpecies.baseSpecies === 'Kingambit') return false;
			return true;
		},
		forcedForme: "Kingambit-Poisonforged",
		itemUser: ["Kingambit-Poisonforged"],
		num: -1091,
		gen: 9,
		desc: "Kingambit-Poisonforged: Terastallize to gain Flash Fire.",
	},
	kusarimask: {
		name: "Kusari Mask",
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
			if (source.baseSpecies.baseSpecies === 'Kingambit') return false;
			return true;
		},
		forcedForme: "Kingambit-Kusari",
		itemUser: ["Kingambit-Kusari"],
		num: -1092,
		gen: 9,
		desc: "Kingambit-Kusari: Terastallize to gain Armor Tail.",
	},
	laserswordmask: {
		name: "Lasersword Mask",
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
			if (source.baseSpecies.baseSpecies === 'Lokix') return false;
			return true;
		},
		forcedForme: "Lokix-Lasersword",
		itemUser: ["Lokix-Lasersword"],
		num: -1093,
		gen: 9,
		desc: "Lokix-Lasersword: Terastallize to gain Surge Surfer.",
	},
	stridermask: {
		name: "Strider Mask",
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
			if (source.baseSpecies.baseSpecies === 'Lokix') return false;
			return true;
		},
		forcedForme: "Lokix-Strider",
		itemUser: ["Lokix-Strider"],
		num: -1094,
		gen: 9,
		desc: "Lokix-Strider: Terastallize to gain Moxie.",
	},
	leechfistmask: {
		name: "Leechfist Mask",
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
			if (source.baseSpecies.baseSpecies === 'Lokix') return false;
			return true;
		},
		forcedForme: "Lokix-Leechfist",
		itemUser: ["Lokix-Leechfist"],
		num: -1095,
		gen: 9,
		desc: "Lokix-Leechfist: Terastallize to gain Triage.",
	},
	chestomask: {
		name: "Chesto Mask",
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
			if (source.baseSpecies.baseSpecies === 'Pecharunt') return false;
			return true;
		},
		forcedForme: "Pecharunt-Chesto",
		itemUser: ["Pecharunt-Chesto"],
		num: -1096,
		gen: 9,
		desc: "Pecharunt-Chesto: Terastallize to gain Insomnia.",
	},
	lummask: {
		name: "Lum Mask",
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
			if (source.baseSpecies.baseSpecies === 'Pecharunt') return false;
			return true;
		},
		forcedForme: "Pecharunt-Lum",
		itemUser: ["Pecharunt-Lum"],
		num: -1097,
		gen: 9,
		desc: "Pecharunt-Lum: Terastallize to gain Purifying Salt.",
	},
	babirimask: {
		name: "Babiri Mask",
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
			if (source.baseSpecies.baseSpecies === 'Pecharunt') return false;
			return true;
		},
		forcedForme: "Pecharunt-Babiri",
		itemUser: ["Pecharunt-Babiri"],
		num: -1098,
		gen: 9,
		desc: "Pecharunt-Babiri: Terastallize to gain Pressure.",
	},
	hearthflamemask: {
		name: "Hearthflame Mask",
		spritenum: 760,
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
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Hearthflame",
		itemUser: ["Ogerpon-Hearthflame"],
		num: 2408,
		gen: 9,
		desc: "Ogerpon-Hearthflame: Terastallize to gain Sheer Force.",
	},
	wellspringmask: {
		name: "Wellspring Mask",
		spritenum: 759,
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
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Wellspring",
		itemUser: ["Ogerpon-Wellspring"],
		num: 2407,
		gen: 9,
		desc: "Ogerpon-Wellspring: Terastallize to gain Embody Aspect.",
	},
	mournstonemask: {
		name: "Mournstone Mask",
		spritenum: 759,
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
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Mournstone",
		itemUser: ["Ogerpon-Mournstone"],
		num: -1099,
		gen: 9,
		desc: "Ogerpon-Mournstone: Terastallize to gain Moxie.",
	},
};
