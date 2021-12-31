export const Items: {[itemid: string]: ModdedItemData} = {
	doderriumz: {
		name: "Doderrium Z",
		desc: "If held by Doderror with Battery Failure, it can use Terrifying Thunderstomp.",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Terrifying Thunderstomp",
		zMoveFrom: "Battery Failure",
		itemUser: ["Doderror"],
		num: 1000,
		gen: 7,
	},
	kingphaniumz: {
		name: "Kingphanium Z",
		desc: "If held by Kingphan with Power Whip, it can use Legendary Landslide.",
		spritenum: 635,
		onTakeItem: false,
		zMove: "Legendary Landslide",
		zMoveFrom: "Power Whip",
		itemUser: ["Kingphan"],
		num: 1001,
		gen: 7,
	},
	skuntoniumz: {
		name: "Skuntonium Z",
		desc: "If held by Skuntomic with Toxic, it can use Meltdown Metamorphosis.",
		spritenum: 638,
		onTakeItem: false,
		zMove: "Meltdown Metamorphosis",
		zMoveFrom: "Toxic",
		itemUser: ["Skuntomic"],
		num: 1002,
		gen: 7,
	},
	croantagiumz: {
		name: "Croantagium Z",
		desc: "If held by Croantagion with Flame Charge, it can use Searing Stomach Acid.",
		spritenum: 632,
		onTakeItem: false,
		zMove: "Searing Stomach Acid",
		zMoveFrom: "Flame Charge",
		itemUser: ["Croantagion"],
		num: 1003,
		gen: 7,
	},
	strigniumz: {
		name: "Strignium Z",
		desc: "If held by Strignight with Psyshock, it can use Menacing Mindbreak.",
		spritenum: 641,
		onTakeItem: false,
		zMove: "Menacing Mindbreak",
		zMoveFrom: "Psyshock",
		itemUser: ["Strignight"],
		num: 1004,
		gen: 7,
	},
	solrockiumz: {
		name: "Solrockium Z",
		desc: "If held by Solrock with Earthquake, it can use Satellite Smash.",
		spritenum: 639,
		onTakeItem: false,
		zMove: "Satellite Smash",
		zMoveFrom: "Earthquake",
		itemUser: ["Solrock-Apple"],
		num: 1005,
		gen: 7,
	},
	lunatoniumz: {
		name: "Lunatonium Z",
		desc: "If held by Lunatone with Psychic, it can use Lunar Laserbeam.",
		spritenum: 641,
		onTakeItem: false,
		zMove: "Lunar Laserbeam",
		zMoveFrom: "Psychic",
		itemUser: ["Lunatone-Apple"],
		num: 1006,
		gen: 7,
	},
	hippothagoriumz: {
		name: "Hippothagorium Z",
		desc: "If held by Hippothagoras with Flip Turn, it can use Brainiac Beatdown.",
		spritenum: 633,
		onTakeItem: false,
		zMove: "Brainiac Beatdown",
		zMoveFrom: "Flip Turn",
		itemUser: ["Hippothagoras"],
		num: 1007,
		gen: 7,
	},
	stampyriumz: {
		name: "Stampyrium Z",
		desc: "If held by Stampyro with Flare Blitz, it can use Smoldering Stampede.",
		spritenum: 632,
		onTakeItem: false,
		zMove: "Smoldering Stampede",
		zMoveFrom: "Flare Blitz",
		itemUser: ["Stampyro"],
		num: 1008,
		gen: 7,
	},
	grizzealiumz: {
		name: "Grizzealium Z",
		desc: "If held by Grizzeal with Knock Off, it can use Hypnotic Hysteria.",
		spritenum: 646,
		onTakeItem: false,
		zMove: "Hypnotic Hysteria",
		zMoveFrom: "Knock Off",
		itemUser: ["Grizzeal"],
		num: 1009,
		gen: 7,
	},
	odonagiumz: {
		name: "Odonagium Z",
		desc: "If held by Odonaga with Feudal Harpoon, it can use Baneful Blade Dance.",
		spritenum: 642,
		onTakeItem: false,
		zMove: "Baneful Blade Dance",
		zMoveFrom: "Feudal Harpoon",
		itemUser: ["Odonaga"],
		num: 1010,
		gen: 7,
	},
	/*halloweeniumz: {
		name: "Halloweenium Z",
		desc: "If holder has Peek-a-Boo, can use Z-move.",
		spritenum: 642,
		onTakeItem: false,
		zMove: "Ready or Not",
		zMoveFrom: "Peek-a-Boo",
		num: 1011,
		gen: 7,
	},*/
	nest: {
		name: "Nest",
		desc: "If held by Coowoo, gives +1 Atk, Def, and SpDef, but makes it grounded.",
		shortDesc: "+1 Atk, Def, SpDef for Coowoo - grounded.",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Coowoo') {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Coowoo') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Coowoo') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Coowoo"],
		num: 258,
		gen: 8,
	},
	boazanianmetal:  {
		name: "Boazanian Metal",
		shortDesc: "If held by an Ultranaut, changes its forme to V.",
		spritenum: 699,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 22) || pokemon.baseSpecies.num === 22) {
				return false;
			}
			return true;
		},
		forcedForme: "Ultranaut-V",
		itemUser: ["Ultranaut-V"],
		num: 1104,
		gen: 8,
	},
	luxurycard: {
		name: "Luxury Card",
		shortDesc: "If holder survives a hit, attacker is Taunted (single use).",
		spritenum: 387,
		fling: {
			basePower: 10,
		},
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && source.hp && target.hp && move && move.category !== 'Status') {
				if (target.useItem(source)) {
					if (!source.volatiles['taunt']) {
						source.addVolatile('taunt');
					}
				}
			}
		},
		num: 542,
		gen: 5,
	},
	blankcard: {
		name: "Blank Card",
		shortDesc: "If holder survives a hit, Hazes (single use).",
		spritenum: 387,
		fling: {
			basePower: 10,
		},
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && source.hp && target.hp && move && move.category !== 'Status') {
				if (target.useItem(source)) {
					this.add('-clearallboost');
					for (const pokemon of this.getAllActive()) {
						pokemon.clearBoosts();
					}
				}
			}
		},
		num: 542,
		gen: 5,
	},
	hardhat: {
		name: "Hard Hat",
		shortDesc: "User takes no recoil.",
		spritenum: 417,
		fling: {
			basePower: 60,
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		num: 540,
		gen: 5,
	},
	campfire: {
		name: "Campfire",
		shortDesc: "Heals 25% HP after using a status move (single use).",
		spritenum: 307,
		onAnyTryMove(target, source, move, pokemon) {
			if (move.category === 'Status' && source.useItem()) {
				this.heal(source.baseMaxhp / 4);
			}
		},
		num: 564,
		gen: 5,
	},
	tarpack: {
		name: "Tar Pack",
		shortDesc: "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage.",
		spritenum: 230,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		num: 211,
		gen: 4,
	},
	warhorn: {
		name: "War Horn",
		shortDesc: "Flavor item.",
		spritenum: 272,
		fling: {
			basePower: 120,
		},
		num: 323,
		gen: 4,
	},
	meltcore: {
		name: "Melt Core",
		shortDesc: "Flavor item.",
		spritenum: 272,
		fling: {
			basePower: 120,
		},
		num: 324,
		gen: 4,
	},
	corrodedwaste: {
		name: "Corroded Waste",
		shortDesc: "Flavor item.",
		spritenum: 272,
		fling: {
			basePower: 120,
		},
		num: 325,
		gen: 4,
	},
	meteorite: {
		name: "Meteorite",
		shortDesc: "Vacuum becomes 8 turns instead of 5.",
		spritenum: 193,
		fling: {
			basePower: 60,
		},
		num: 284,
		gen: 4,
	},
};
