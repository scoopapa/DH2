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
				if (this.dex.getMove(moveSlot.move).category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		num: 640,
		gen: 6,
	},
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			this.boost({accuracy: -1}, pokemon);
		},
		num: 213,
		gen: 2,
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
	},
	quickclaw: {
		name: "Quick Claw",
		spritenum: 373,
		fling: {
			basePower: 80,
		},
		onModifySpe(spe, pokemon) {
			this.chainModify(1.05);
		},
		num: 217,
		gen: 2,
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
	},
}