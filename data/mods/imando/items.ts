export const Items: {[itemid: string]: ModdedItemData} = {
	aloraichiumz: {
		name: "Aloraichium Z",
		spritenum: 655,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Stoked Sparksurfer",
		zMoveFrom: "Thunderbolt",
		itemUser: ["Raichu-Alola"],
		num: 803,
		gen: 7,
		desc: "Makes Raichu-Alola use Stoked Sparksurfer.",
	},
	assaultvest: {
		name: "Assault Vest",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifySpDPriority: 1,
		onModifySpD(spd) {
			return this.chainModify(1.8);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.move).category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		num: 640,
		gen: 6,
		desc: "User's SpD is 1.8x but can't use status moves.",
	},
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			this.boost({accuracy: -1}, pokemon);
			pokemon.setItem('');
		},
		num: 213,
		gen: 2,
		desc: "Lowers user's Acc by 1. Consumable.",
	},
	decidiumz: {
		name: "Decidium Z",
		spritenum: 650,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Sinister Arrow Raid",
		zMoveFrom: "Spirit Shackle",
		itemUser: ["Decidueye"],
		num: 798,
		gen: 7,
		desc: "Makes Decidueye use Sinister Arrow Raid.",
	},
	eeviumz: {
		name: "Eevium Z",
		spritenum: 657,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Extreme Evoboost",
		zMoveFrom: "Last Resort",
		itemUser: ["Eevee"],
		num: 805,
		gen: 7,
		desc: "Makes Eevee use Extreme Evoboost.",
	},
	expertbelt: {
		name: "Expert Belt",
		spritenum: 132,
		fling: {
			basePower: 10,
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(1.3);
			}
		},
		num: 268,
		gen: 4,
		desc: "User's Super Effective moves deal 1.3x damage.",
	},
	inciniumz: {
		name: "Incinium Z",
		spritenum: 651,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Malicious Moonsault",
		zMoveFrom: "Darkest Lariat",
		itemUser: ["Incineroar"],
		num: 799,
		gen: 7,
		desc: "Makes Incineroar use Malicious Moonsault.",
	},
	kingsrock: {
		name: "King's Rock",
		spritenum: 236,
		fling: {
			basePower: 30,
			volatileStatus: 'flinch',
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		num: 221,
		gen: 2,
		desc: "Nullifies non-Struggle recoil.",
	},
	kommoniumz: {
		name: "Kommonium Z",
		spritenum: 690,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Clangorous Soulblaze",
		zMoveFrom: "Clanging Scales",
		itemUser: ["Kommo-o"],
		num: 926,
		gen: 7,
		desc: "Makes Kommo-O use Clangorous Soulblaze.",
	},
	laxincense: {
		name: "Lax Incense",
		spritenum: 240,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Lax Incense boost');
				return this.chainModify(1.25);
			}
		},
		num: 255,
		gen: 3,
		desc: "Deals 1.25x damage if moving last.",
	},
	leppaberry: {
		name: "Leppa Berry",
		spritenum: 244,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting",
		},
		onUpdate(pokemon) {
			if (!pokemon.hp) return;
			if (pokemon.moveSlots.some(move => move.pp === 0)) {
				const moveSlot = pokemon.moveSlots.find(move => move.pp === 0) ||
					pokemon.moveSlots.find(move => move.pp < move.maxpp);
				if (!moveSlot) return;
				moveSlot.pp += 10;
				if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp;
			}
		},
		num: 154,
		gen: 3,
		desc: "Leppa Berry is no longer consumable.",
	},
	lunaliumz: {
		name: "Lunalium Z",
		spritenum: 686,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Menacing Moonraze Maelstrom",
		zMoveFrom: "Moongeist Beam",
		itemUser: ["Lunala", "Necrozma-Dawn-Wings"],
		num: 922,
		gen: 7,
		desc: "Makes Lunala/NDW use Menacing Moonraze Maelstrom.",
	},
	lycaniumz: {
		name: "Lycanium Z",
		spritenum: 689,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Splintered Stormshards",
		zMoveFrom: "Stone Edge",
		itemUser: ["Lycanroc", "Lycanroc-Midnight", "Lycanroc-Dusk"],
		num: 925,
		gen: 7,
		desc: "Makes Lycanroc (any) use Splintered Stormshards.",
	},
	marshadiumz: {
		name: "Marshadium Z",
		spritenum: 654,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Soul-Stealing 7-Star Strike",
		zMoveFrom: "Spectral Thief",
		itemUser: ["Marshadow"],
		num: 802,
		gen: 7,
		desc: "Makes Marshadow use Soul-Stealing 7-Star Strike.",
	},
	metronome: {
		name: "Metronome",
		spritenum: 289,
		fling: {
			basePower: 30,
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.useMove("Metronome", pokemon);
			}
		},
		num: 277,
		gen: 4,
		desc: "the almighty lord of all.",
	},
	mewniumz: {
		name: "Mewnium Z",
		spritenum: 658,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Genesis Supernova",
		zMoveFrom: "Psychic",
		itemUser: ["Mew"],
		num: 806,
		gen: 7,
		desc: "Makes Mew use Genesis Supernova.",
	},
	mimikiumz: {
		name: "Mimikium Z",
		spritenum: 688,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Let's Snuggle Forever",
		zMoveFrom: "Play Rough",
		itemUser: ["Mimikyu", "Mimikyu-Busted"],
		num: 924,
		gen: 7,
		desc: "Makes Mimikyu use Let's Snuggle Forever. (unworking)",
	},
	pikaniumz: {
		name: "Pikanium Z",
		spritenum: 649,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Catastropika",
		zMoveFrom: "Volt Tackle",
		itemUser: ["Pikachu"],
		num: 794,
		gen: 7,
		desc: "Makes Pikachu use Catastropika.",
	},
	pikashuniumz: {
		name: "Pikashunium Z",
		spritenum: 659,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "10,000,000 Volt Thunderbolt",
		zMoveFrom: "Thunderbolt",
		itemUser: ["Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner"],
		num: 836,
		gen: 7,
		desc: "Makes Pikachu-Cap use 10,000,000 Volt Thunderbolt.",
	},
	primariumz: {
		name: "Primarium Z",
		spritenum: 652,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Oceanic Operetta",
		zMoveFrom: "Sparkling Aria",
		itemUser: ["Primarina"],
		num: 800,
		gen: 7,
		desc: "Makes Primarina use Sparkling Aria.",
	},
	punchingglove: {
		name: "Punching Glove",
		spritenum: 0, // TODO
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Punching Glove boost');
				return this.chainModify(1.2);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['punch']) delete move.flags['contact'];
		},
		num: 1884,
		gen: 9,
		desc: "Punch moves deal 1.2x damage and don't make contact.",
	},
	quickclaw: {
		name: "Quick Claw",
		spritenum: 373,
		fling: {
			basePower: 80,
		},
		onModifySpe(spe, pokemon) {
			this.chainModify(1.01);
		},
		num: 217,
		gen: 2,
		desc: "User's Spe is 1.01x.",
	},
	shellbell: {
		name: "Shell Bell",
		spritenum: 438,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
				this.heal(pokemon.lastDamage / 3, pokemon);
			}
		},
		num: 253,
		gen: 3,
		desc: "User restores 1/3 of the damage delt from attacks.",
	},
	silkscarf: {
		name: "Silk Scarf",
		spritenum: 444,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return this.chainModify(1.3);
			}
		},
		num: 251,
		gen: 3,
		desc: "User's Normal moves deal 1.3x damage.",
	},
	snorliumz: {
		name: "Snorlium Z",
		spritenum: 656,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Pulverizing Pancake",
		zMoveFrom: "Giga Impact",
		itemUser: ["Snorlax"],
		num: 804,
		gen: 7,
		desc: "Makes Snorlax use Pulverizing Pancake.",
	},
	solganiumz: {
		name: "Solganium Z",
		spritenum: 685,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Searing Sunraze Smash",
		zMoveFrom: "Sunsteel Strike",
		itemUser: ["Solgaleo", "Necrozma-Dusk-Mane"],
		num: 921,
		gen: 7,
		desc: "Makes Solgaleo/NDM use Searing Sunraze Smash.",
	},
	tapuniumz: {
		name: "Tapunium Z",
		spritenum: 653,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Guardian of Alola",
		zMoveFrom: "Nature's Madness",
		itemUser: ["Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini"],
		num: 801,
		gen: 7,
		desc: "Makes Tapus use Guardian of Alola.",
	},
	ultranecroziumz: {
		name: "Ultranecrozium Z",
		spritenum: 687,
		onTakeItem: true,
		fling: {
			basePower: 30,
		},
		zMove: "Light That Burns the Sky",
		zMoveFrom: "Photon Geyser",
		itemUser: ["Necrozma-Ultra"],
		num: 923,
		gen: 7,
		desc: "Makes Necrozma-Ultra use Light That Burns the Sky.",
	},
	widelens: {
		name: "Wide Lens",
		spritenum: 537,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracyPriority: 4,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return accuracy * 1.3;
			}
		},
		num: 265,
		gen: 4,
		desc: "Holder's Acc is 1.3x.",
	},
	zoomlens: {
		name: "Zoom Lens",
		spritenum: 574,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracyPriority: 4,
		onSourceModifyAccuracy(accuracy, target) {
			if (typeof accuracy === 'number' && !this.queue.willMove(target)) {
				this.debug('Zoom Lens boosting accuracy');
				return accuracy * 1.5;
			}
		},
		num: 276,
		gen: 4,
		desc: "Holder's Acc is 1.5x when moving last.",
	},
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 0, // TODO
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;

			if (pokemon.hasAbility('protosynthesis') && !pokemon.volatiles['protosynthesis'] && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('protosmosis') && !pokemon.volatiles['protosmosis'] && !this.field.isWeather('raindance') && pokemon.useItem()) {
				pokemon.addVolatile('protosmosis');
			}
			if (pokemon.hasAbility('protocrysalis') && !pokemon.volatiles['protocrysalis'] && !this.field.isWeather('sandstorm') && pokemon.useItem()) {
				pokemon.addVolatile('protocrysalis');
			}
			if (pokemon.hasAbility('protostasis') && !pokemon.volatiles['protostasis'] && !this.field.isWeather('hail') && pokemon.useItem()) {
				pokemon.addVolatile('protostasis');
			}
			if (pokemon.hasAbility('quarkdrive') && !pokemon.volatiles['quarkdrive'] && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.addVolatile('quarkdrive');
			}
			if (pokemon.hasAbility('photondrive') && !pokemon.volatiles['photondrive'] && !this.field.isTerrain('grassyterrain') && pokemon.useItem()) {
				pokemon.addVolatile('photondrive');
			}
			if (pokemon.hasAbility('neurondrive') && !pokemon.volatiles['neurondrive'] && !this.field.isTerrain('psychicterrain') && pokemon.useItem()) {
				pokemon.addVolatile('neurondrive');
			}
			if (pokemon.hasAbility('runedrive') && !pokemon.volatiles['runedrive'] && !this.field.isTerrain('mistyterrain') && pokemon.useItem()) {
				pokemon.addVolatile('runedrive');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		desc: "Activates the Protosynthesis/Quark Drive Variants. Single use.",
		gen: 9,
	},
}