export const Items: {[itemid: string]: ModdedItemData} = {
	//New Items
	cursedjewel: {
		name: "Cursed Jewel",
		fling: {
			basePower: 40,
		},
		desc: "Holder's use of Midnight lasts 8 turns instead of 5.",
		num: 1001,
	},
	koknuberry: {
		name: "Koknu Berry",
		isBerry: true,
		consumable: true,
		naturalGift: {
			basePower: 100,
			type: "Steel",
		},
		//onBeforeMovePriority: 10,
		onOverrideAction(pokemon) { //only event that happens before BeforeMove, which flinch has to be stopped before.
			if (pokemon.volatiles['flinch'] && pokemon.eatItem()) {
				pokemon.removeVolatile('flinch');
			}
		},
		onEat(pokemon) {
		},
		desc: "Cures flinching. Single use.",
		num: 1002,
	},
	meteorite: {
		name: "Meteorite",
		megaStone: "Rayquaza-Mega",
		megaEvolves: "Rayquaza",
		itemUser: ["Rayquaza"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "Evolves Minior into Prominoid if it is at least level 50. If held by a Rayquaza, this item allows it to Mega Evolve in battle, if it also knows the move Dragon Ascent.",
		shortDesc: "Evolves Minior. Must be held for Rayquaza to Mega Evolve in battle.",
		num: 1013,
	},
	butterfreenite: {
		name: "Butterfreenite",
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
		num: 1003,
	},
	slowkinginite: {
		name: "Slowkinginite",
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		itemUser: ["Slowking"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Slowking, this item allows it to Mega Evolve in battle.",
		num: 1004,
	},
	torkoalite: {
		name: "Torkoalite",
		megaStone: "Torkoal-Mega",
		megaEvolves: "Torkoal",
		itemUser: ["Torkoal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Torkoal, this item allows it to Mega Evolve in battle.",
		num: 1005,
	},
	milotite: {
		name: "Milotite",
		megaStone: "Milotic-Mega",
		megaEvolves: "Milotic",
		itemUser: ["Milotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Milotic, this item allows it to Mega Evolve in battle.",
		num: 1006,
	},
	electivirite: {
		name: "Electivirite",
		megaStone: "Electivire-Mega",
		megaEvolves: "Electivire",
		itemUser: ["Electivire"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by an Electivire, this item allows it to Mega Evolve in battle.",
		num: 1007,
	},
	magmortarite: {
		name: "Magmortarite",
		megaStone: "Magmortar-Mega",
		megaEvolves: "Magmortar",
		itemUser: ["Magmortar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Magmortar, this item allows it to Mega Evolve in battle.",
		num: 1008,
	},
	garbodorite: {
		name: "Garbodorite",
		megaStone: "Garbodor-Mega",
		megaEvolves: "Garbodor",
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
		num: 1009,
	},
	beheeyemite: {
		name: "Beheeyemite",
		megaStone: "Beheeyem-Mega",
		megaEvolves: "Beheeyem",
		itemUser: ["Beheeyem"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Beheeyem, this item allows it to Mega Evolve in battle.",
		num: 1010,
	},
	sandacondite: {
		name: "Sandacondite",
		megaStone: "Sandaconda-Mega",
		megaEvolves: "Sandaconda",
		itemUser: ["Sandaconda"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by a Sandaconda, this item allows it to Mega Evolve in battle.",
		num: 1011,
	},
	alcremite: {
		name: "Alcremite",
		megaStone: "Alcremie-Mega",
		megaEvolves: "Alcremie",
		itemUser: ["Alcremie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		desc: "If held by an Alcremie, this item allows it to Mega Evolve in battle.",
		num: 1012,
	},
	//Edited items
	adamantorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		desc: "If held by a Dialga, its Steel- and Dragon-type attacks have 1.2x power. When Flung, counts as a projectile move.",
		shortDesc: "If held by a Dialga, its Steel- and Dragon-type attacks have 1.2x power.",
	},
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		consumable: true,
		fling: {
			basePower: 0,
			boosts: {accuracy: -2},
			flags: {powder: 1},
		},
		onFoeTryMove(source, target, move) {
			if (move.target === 'foeSide' || (move.target === 'all' && move.id !== 'perishsong')) {
				return;
			}
			if (move.priority > 0.1 && target.useItem())
			{
				this.add('activate', target, 'item: BrightPowder');
				if(!this.dex.getImmunity('powder', source)) return;
				this.attrLastMove('[still]');
				this.add('cant', source, 'item: BrightPowder', move);
				return false;
			}
		},
		num: 213,
		gen: 2,
		desc: "Causes a priority move that targets the holder to fail, which consumes the item. The effect fails if the attacker is immune to powder moves, but the item is still consumed. When Flung, the target's accuracy is lowered 2 stages.",
		shortDesc: "Protects from a priority move. When Flung, -2 accuracy.",
		block: '#damp',
	},
	dragonscale: {
		inherit: true,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			return this.chainModify([0x1199, 0x1000]);
		},
		desc: "Holder's Defense is multiplied by 1.1x. Evolves Seadra into Kingdra and Burrorm into Burryrm when traded.",
		shortDesc: "Holder Defense is multiplied by 1.1x.",
	},
	electirizer: {
		inherit: true,
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		desc: "Holder and allies' Electric-type moves have 1.1x power. Evolves Electabuzz into Electivire when traded.",
		shortDesc: "Holder and allies' Electric-type moves have 1.1x power.",
	},
	flameorb: {
		inherit: true,
		fling: {
			basePower: 30,
			status: 'brn',
			flags: {bullet: 1},
		},
		desc: "At the end of every turn, this item attempts to burn the holder. When Flung, burns the target and counts as a projectile move.",
		shortDesc: "At the end of every turn, this item attempts to burn the holder.",
	},
	fullincense: {
		name: "Full Incense",
		spritenum: 155,
		fling: {
			basePower: 20,
		},
		onAllyModifySpe(spe) {
			return this.chainModify(0.75);
		},
		num: 316,
		gen: 4,
		desc: "Halves all allies' speed.",
	},
	griseousorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		desc: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power, and it becomes its Origin Forme. When Flung, counts as a projectile move.",
		shortDesc: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power.",
	},
	ironball: {
		inherit: true,
		onStart(pokemon){
			pokemon.removeVolatile('magnetrise');
			pokemon.removeVolatile('telekinesis');
			pokemon.removeVolatile('risingchorus');
		},
		fling: {
			basePower: 130,
			volatileStatus: 'smackdown',
			flags: {bullet: 1},
		},
		desc: "The holder is grounded and cannot be made to float. The holder's Speed is halved. When Flung, grounds the target and counts as a projectile move.",
		shortDesc: "Holder is grounded, Speed halved. If Flying type, takes neutral Ground damage.",
	},
	laxincense: {
		name: "Lax Incense",
		spritenum: 240,
		fling: {
			basePower: 20,
		},
		num: 255,
		gen: 3,
		desc: "No competitive use.",
	},
	lifeorb: {
		inherit: true,
		fling: {
			basePower: 30,
			flags: {bullet: 1},
		},
		desc: "Holder's attacks have their power boosted by 1.3x, but it loses 10% its max HP after each attack. When Flung, counts as a projectile move.",
		shortDesc: "Holder's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack.",
	},
	lightball: {
		inherit: true,
		fling: {
			basePower: 30,
			status: 'par',
			flags: {bullet: 1},
		},
		desc: "If held by a Pikachu, its Attack and Sp. Attack stats are doubled. When Flung, paralyzes the target and counts as a projectile move.",
		shortDesc: "If held by a Pikachu, its Attack and Sp. Atk are doubled.",
	},
	lustrousorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		desc: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power. When Flung, counts as a projectile move.",
		shortDesc: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power.",
	},
	magmarizer: {
		inherit: true,
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		desc: "Holder and allies' Fire-type moves have 1.1x power. Evolves Magmar into Magmortar when traded.",
		shortDesc: "Holder and allies' Fire-type moves have 1.1x power.",
	},
	metalpowder: {
		name: "Metal Powder",
		fling: {
			basePower: 0,
			boosts: {def: 1, spd: 1},
			flags: {powder: 1},
		},
		spritenum: 287,
		num: 257,
		gen: 2,
		desc: "When Flung, increases the target's Defense and Sp. Def stats by 1 stage. Fails if target is immune to powder.",
		shortDesc: "When Flung, +1 Def and Sp. Def. Counts as a powder move.",
	},
	muscleband: {
		name: "Muscle Band",
		spritenum: 297,
		fling: {
			basePower: 10,
		},
		onModifyAtkPriority: 2,
		onModifyAtk(atk, pokemon) {
			return this.chainModify([0x1199, 0x1000]);
		},
		num: 266,
		gen: 4,
		desc: "Holder's Attack is multiplied by 1.1x.",
	},
	oddincense: {
		name: "Odd Incense",
		spritenum: 312,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 314,
		gen: 4,
		desc: "Holder and allies' Psychic-type moves have 1.1x power.",
	},
	prismscale: {
		inherit: true,
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			return this.chainModify([0x1199, 0x1000]);
		},
		desc: "Holder's Sp. Defense is multiplied by 1.1x. Evolves Feebas into Milotic when traded.",
		shortDesc: "Holder Special Defense is multiplied by 1.1x.",
	},
	protector: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		desc: "This Pokemon does not take recoil damage besides Struggle and crash damage. Evolves Rhydon into Rhyperior when traded.",
		shortDesc: "This Pokemon does not take recoil damage besides Struggle/crash damage.",
	},
	quickpowder: {
		name: "Quick Powder",
		spritenum: 374,
		fling: {
			basePower: 0,
			boosts: {speed: 1},
			flags: {powder: 1},
		},
		num: 274,
		gen: 4,
		desc: "When Flung, increases the target's Speed by 1 stage. Fails if target is immune to powder.",
		shortDesc: "When Flung, +1 Speed. Counts as a powder move.",
	},
	reapercloth: {
		inherit: true,
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		desc: "Holder and allies' Ghost-type moves have 1.1x power. Evolves Dusclops into Dusknoir when traded.",
		shortDesc: "Holder and allies' Ghost-type moves have 1.1x power.",
	},
	rockincense: {
		name: "Rock Incense",
		spritenum: 416,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Rock' || (move.twoType && move.twoType === 'Rock')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 315,
		gen: 4,
		desc: "Holder and allies' Rock-type moves have 1.1x power.",
	},
	roseincense: {
		name: "Rose Incense",
		spritenum: 419,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 318,
		gen: 4,
		desc: "Holder and allies' Grass-type moves have 1.1x power.",
	},
	sachet: {
		inherit: true,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy' || (move.twoType && move.twoType === 'Fairy')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		desc: "Holder and allies' Fairy-type moves have 1.1x power. Evolves Spritzee into Aromatisse when traded.",
		shortDesc: "Holder and allies' Fairy-type moves have 1.1x power.",
	},
	seaincense: {
		name: "Sea Incense",
		spritenum: 430,
		fling: {
			basePower: 20,
		},
		onAllyBasePowerPriority: 15,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				return this.chainModify([0x1199, 0x1000]);
			}
		},
		num: 254,
		gen: 3,
		desc: "Holder and allies' Water-type moves have 1.1x power.",
	},
	silverpowder: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Bug' || (move.twoType && move.twoType === 'Bug'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		fling: {
			basePower: 0,
			flags: {powder: 1},
			volatileStatus: 'powder',
		},
		desc: "Holder's Bug-type attacks have 1.2x power. When Flung, applies Powder to the target, but fails if target is immune to powder attacks. Evolves Twintura into Silvurah when traded.",
		shortDesc: "Holder's Bug-type attacks 1.2x power; applies Powder when Flung.",
	},
	starfberry: {
		inherit: true,
		consumable: true,
		onEat(pokemon) {
			let statName = 'atk';
			let worstStat = 3000; //The highest possible stat number (with boosts) is 2,676
			let s: StatNameExceptHP;
			for (s in pokemon.storedStats) {
				if (pokemon.storedStats[s] < worstStat) {
					statName = s;
					worstStat = pokemon.storedStats[s];
				}
			}
			this.boost({[statName]: 2}, pokemon);
		},
	},
	toxicorb: {
		inherit: true,
		fling: {
			basePower: 30,
			status: 'tox',
			flags: {bullet: 1},
		},
		desc: "At the end of every turn, this item attempts to badly poison the holder. When Flung, badly poisons the target and counts as a projectile move.",
		shortDesc: "At the end of every turn, this item attempts to badly poison the holder.",
	},
	ultranecroziumz: {
		name: "Ultranecrozium Z",
		spritenum: 687,
		onTakeItem(item, source) {
			if (item.itemUser === source.baseSpecies) return false;
			return true;
		},
		itemUser: ["Necrozma-Dusk-Mane", "Necrozma-Dawn-Wings", "Necrozma-Ultra"],
		num: 923,
		gen: 7,
		desc: "If held by Dusk Mane or Dawn Wings Necrozma, this item allows it to Ultra Burst in battle.",
	},
	waveincense: {
		name: "Wave Incense",
		spritenum: 531,
		fling: {
			basePower: 20,
		},
		onAnyTryMove(target, source, effect) {
			if (['eggbomb', 'explosion', 'mindblown', 'napalm', 'searingshot', 'selfdestruct', 'shelltrap'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', target, 'item: Wave Incense', effect, '[of] ' + source);
				return false;
			}
		},
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.id === 'aftermath') {
				return false;
			}
		},
		num: 317,
		gen: 4,
		desc: "Prevents Egg Bomb, Explosion, Mind Blown, Napalm, Searing Shot, Self-Destruct, Shell Trap, and the Aftermath Ability from having an effect.",
		shortDesc: "Prevents explosion-based moves and Abilities.",
	},
	whippeddream: {
		inherit: true,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fairy') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		desc: "Holder's Fairy-type attacks have 1.2x power. Evolves Swirlix into Slurpuff when traded.",
		shortDesc: "Holder's Fairy-type attacks have 1.2x power.",
	},
	wiseglasses: {
		name: "Wise Glasses",
		spritenum: 539,
		fling: {
			basePower: 10,
		},
		onModifySpAPriority: 2,
		onModifySpA(spa, pokemon) {
			return this.chainModify([0x1199, 0x1000]);
		},
		num: 267,
		gen: 4,
		desc: "Holder's Sp. Attack is multiplied by 1.1x.",
	},
	aguavberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Dragon",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'spd') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Bitter food (-Sp. Defense Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -SpD Nature, it's 50%, but confuses. Single use.",
	},
	figyberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Bug",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'atk') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Spicy food (-Attack Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -Atk Nature, it's 50%, but confuses. Single use.",
	},
	iapapaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Dark",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'spa') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Dry food (-Sp. Attack Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -SpA Nature, it's 50%, but confuses. Single use.",
	},
	magoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Ghost",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'spe') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Sweet food (-Speed Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -Spe Nature, it's 50%, but confuses. Single use.",
	},
	wikiberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Rock",
		},
		onEat(pokemon) {
			if (pokemon.getNature().minus === 'def') {
				this.heal(pokemon.baseMaxhp * 0.5);
				pokemon.addVolatile('confusion');
			} else {
				this.heal(pokemon.baseMaxhp * 0.125);
			}
		},
		desc: "Restores 12.5% max HP at 1/4 max HP or less. If the Pokemon dislikes Sour food (-Defense Nature), it restores 50% instead, but confuses. Single use.",
		shortDesc: "Heals 12.5% at 1/4 max HP; if -Def Nature, it's 50%, but confuses. Single use.",
	},
	/* Items edited as part of other elements */
	blueorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Kyogre' && !('magicroom' in this.field.pseudoWeather)) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
	},
	redorb: {
		inherit: true,
		fling: {
			basePower: 60,
			flags: {bullet: 1},
		},
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Groudon' && !('magicroom' in this.field.pseudoWeather)) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
	},
	rockyhelmet: {
		name: "Rocky Helmet",
		spritenum: 417,
		fling: {
			basePower: 60,
		},
		onHitOrder: 2,
		onHit(target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 6, source, target);
			}
		},
		num: 540,
		gen: 5,
	},
	
	/* Items edited for dual-type moves */
	absorbbulb: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				target.useItem();
			}
		},
	},
	buggem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Bug' || (move.twoType && move.twoType === 'Bug')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	blackbelt: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Fighting' || (move.twoType && move.twoType === 'Fighting'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	blackglasses: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Dark' || (move.twoType && move.twoType === 'Dark'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	cellbattery: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) {
				target.useItem();
			}
		},
	},
	charcoal: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	darkgem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Dark' || (move.twoType && move.twoType === 'Dark')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	dracoplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	dragonfang: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		desc: "Holder's Dragon-type attacks have 1.2x power. Evolves Gobellos into Dragobellos when traded.",
		shortDesc: "Holder's Dragon-type attacks have 1.2x power.",
	},
	dragongem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Dragon' || (move.twoType && move.twoType === 'Dr')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	dreadplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Dark' || (move.twoType && move.twoType === 'Dark'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	earthplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ground' || (move.twoType && move.twoType === 'Ground'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	electricgem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	fairygem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Fairy' || (move.twoType && move.twoType === 'Fairy')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	fightinggem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Fighting' || (move.twoType && move.twoType === 'Fighting')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	firegem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	flameplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	flyinggem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Flying' || (move.twoType && move.twoType === 'Flying')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	ghostgem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	grassgem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	groundgem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Ground' || (move.twoType && move.twoType === 'Ground')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	hardstone: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Rock' || (move.twoType && move.twoType === 'Rock'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	icegem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	icicleplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	insectplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Bug' || (move.twoType && move.twoType === 'Bug'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	ironplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Steel' || (move.twoType && move.twoType === 'Steel'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	luminousmoss: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				target.useItem();
			}
		},
	},
	magnet: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	meadowplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	metalcoat: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Steel' || (move.twoType && move.twoType === 'Steel'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		desc: "Holder's Steel-type attacks have 1.2x power. Evolves Onix into Steelix, Scyther into Scizor, and Plecuum into Vorplec when traded.",
		shortDesc: "Holder's Steel-type attacks have 1.2x power.",
	},
	mindplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	miracleseed: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	mysticwater: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	nevermeltice: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	normalgem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	pixieplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Fairy' || (move.twoType && move.twoType === 'Fairy'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	poisonbarb: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Poison' || (move.twoType && move.twoType === 'Poison'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		desc: "Holder's Poison-type attacks have 1.2x power. Evolves Monutra into Twintura when held and leveled up.",
		shortDesc: "Holder's Poison-type attacks have 1.2x power.",
	},
	poisongem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Poison' || (move.twoType && move.twoType === 'Poison')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	psychicgem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	rockgem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Rock' || (move.twoType && move.twoType === 'Rock')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	sharpbeak: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Flying' || (move.twoType && move.twoType === 'Flying'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	shedshell: {
		inherit: true,
		onTrapPokemon(pokemon) {
			if(!pokemon.volatiles['meanlooked']){
				pokemon.trapped = pokemon.maybeTrapped = false;
			}
		},
	},
	silkscarf: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Normal' || (move.twoType && move.twoType === 'Normal'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	skyplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Flying' || (move.twoType && move.twoType === 'Flying'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	snowball: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) {
				target.useItem();
			}
		},
	},
	softsand: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ground' || (move.twoType && move.twoType === 'Ground'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	spelltag: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	splashplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	spookyplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	steelgem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Steel' || (move.twoType && move.twoType === 'Steel')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	stoneplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Rock' || (move.twoType && move.twoType === 'Rock'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	toxicplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Poison' || (move.twoType && move.twoType === 'Poison'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	twistedspoon: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	watergem: {
		inherit: true,
		consumable: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	zapplate: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	/* Misc. changes related to other elements */
	airballoon: {
		inherit: true,
		consumable: true,
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Air Balloon');
			target.lastItem = target.item;
			target.item = '';
			target.itemData = {id: '', target};
			this.runEvent('AfterUseItem', target, null, null, this.dex.getItem('airballoon'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Air Balloon');
				target.lastItem = target.item;
				target.item = '';
				target.itemData = {id: '', target};
				this.runEvent('AfterUseItem', target, null, null, this.dex.getItem('airballoon'));
			}
		},
		num: 541,
		gen: 5,
	},
	heavydutyboots: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect && ['spikes','stealthrock'].includes(effect.id)) {
				return null;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'stickyweb') {
				return null;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (effect && effect.id === 'toxicspikes') {
				return null;
			}
		},
	},
	leek: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd", "kendono"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		itemUser: ["Farfetch\u2019d", "Sirfetch\u2019d", "Kendo\u2019no"],
		desc: "If held by a Farfetch’d, Sirfetch’d, or Kendo'no, its critical hit ratio is raised by 2 stages.",
		shortDesc: "If held by a Farfetch’d family member, its critical hit ratio is raised by 2 stages.",
	},
	machobrace: {
		inherit: true,
		ignoreKlutz: false,
	},
	poweranklet: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerband: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerbelt: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerbracer: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerlens: {
		inherit: true,
		ignoreKlutz: false,
	},
	powerweight: {
		inherit: true,
		ignoreKlutz: false,
	},
	/* Natural Gift adjustments (also type-reduction edits for dual-type moves) */
	cheriberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Fire",
		},
	},
	chestoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Water",
		},
	},
	pechaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Electric",
		},
	},
	rawstberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Grass",
		},
	},
	aspearberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Ice",
		},
	},
	leppaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Fighting",
		},
	},
	oranberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Poison",
		},
	},
	persimberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Ground",
		},
	},
	lumberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Flying",
		},
	},
	sitrusberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Psychic",
		},
	},
	razzberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 70,
			type: "Steel",
		},
	},
	blukberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Fire",
		},
	},
	nanabberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Water",
		},
	},
	wepearberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Electric",
		},
	},
	pinapberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Grass",
		},
	},
	pomegberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Ice",
		},
	},
	kelpsyberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting",
		},
	},
	qualotberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Poison",
		},
	},
	hondewberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Ground",
		},
	},
	grepaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Flying",
		},
	},
	tamatoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic",
		},
	},
	cornnberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Bug",
		},
	},
	magostberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Rock",
		},
	},
	rabutaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost",
		},
	},
	nomelberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon",
		},
	},
	spelonberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Dark",
		},
	},
	pamtreberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 80,
			type: "Steel",
		},
	},
	chilanberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Normal",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (
				(move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) &&
				(!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))
			) {
				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	occaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Fire",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	passhoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Water",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	wacanberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Electric",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Electric' || (move.twoType && move.twoType === 'Electric')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	rindoberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Grass",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	yacheberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Ice",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	chopleberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Fighting",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Fighting' || (move.twoType && move.twoType === 'Fighting')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	kebiaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Poison",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Poison' || (move.twoType && move.twoType === 'Poison')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	shucaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Ground",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Ground' || (move.twoType && move.twoType === 'Ground')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	cobaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Flying",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Flying' || (move.twoType && move.twoType === 'Flying')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	payapaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Psychic",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Psychic' || (move.twoType && move.twoType === 'Psychic')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	tangaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Bug",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Bug' || (move.twoType && move.twoType === 'Bug')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	chartiberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Rock",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Rock' || (move.twoType && move.twoType === 'Rock')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	kasibberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Ghost",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	habanberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Dragon",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Dragon' || (move.twoType && move.twoType === 'Dragon')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	colburberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Dark",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Dark' || (move.twoType && move.twoType === 'Dark')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	babiriberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Steel",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Steel' || (move.twoType && move.twoType === 'Steel')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	roseliberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 90,
			type: "Fairy",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if ((move.type === 'Fairy' || (move.twoType && move.twoType === 'Fairy')) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	marangaberry: {
		inherit: true,
		consumable: true,
		naturalGift: {
			basePower: 100,
			type: "Normal",
		},
	},
	/* Fling adjustments */
	blunderpolicy: {
		inherit: true,
		consumable: true,
		fling: {
			basePower: 30,
		},
	},
	laggingtail: {
		inherit: true,
		fling: {
			basePower: 70,
		},
	},
	relicstatue: {
		num: 590,
		name: "Relic Statue",
		desc: "An item valuable to collectors.",
		fling: {
			basePower: 100,
		},
		spritenum: 590,
	},
	smoothrock: {
		inherit: true,
		fling: {
			basePower: 40,
		},
	},
	weaknesspolicy: {
		inherit: true,
		consumable: true,
		fling: {
			basePower: 30,
		},
	},
	/* Consumable item flags*/
	adrenalineorb: {
		inherit: true,
		consumable: true,
	},
	berryjuice: {
		inherit: true,
		consumable: true,
	},
	ejectbutton: {
		inherit: true,
		consumable: true,
	},
	ejectpack: {
		inherit: true,
		consumable: true,
	},
	electricseed: {
		inherit: true,
		consumable: true,
	},
	focussash: {
		inherit: true,
		consumable: true,
	},
	grassyseed: {
		inherit: true,
		consumable: true,
	},
	mentalherb: {
		inherit: true,
		consumable: true,
	},
	mistyseed: {
		inherit: true,
		consumable: true,
	},
	powerherb: {
		inherit: true,
		consumable: true,
	},
	psychicseed: {
		inherit: true,
		consumable: true,
	},
	redcard: {
		inherit: true,
		consumable: true,
	},
	roomservice: {
		inherit: true,
		consumable: true,
	},
	throatspray: { //I removed this item, but meh
		inherit: true,
		consumable: true,
	},
	whiteherb: {
		inherit: true,
		consumable: true,
	},
};
