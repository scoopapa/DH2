export const Items: {[itemid: string]: ModdedItemData} = {
	altarianite: {
		name: "Altarianite",
		spritenum: 615,
		megaStone: "Muktaria-Alola-Mega",
		megaEvolves: "Muktaria-Alola",
		itemUser: ["Muktaria-Alola"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 755,
		desc: "If held by an Alolan Muktaria, this item allows it to Mega Evolve in battle.",
	},
	metagrossite: {
		name: "Metagrossite",
		spritenum: 618,
		megaStone: "Iron Meta-Mega",
		megaEvolves: "Iron Meta",
		itemUser: ["Iron Meta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 758,
		desc: "If held by an Iron Meta, this item allows it to Mega Evolve in battle.",
	},
	boosterenergy: {
		inherit: true,
		onStart() {
			this.effectState.started = true;
		},
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;

			if (!this.field.isWeather('sunnyday')) {
				for (const proto of ['protosynthesis', 'onceuponatime', 'primitive', 'openingact', 'weightoflife',
											'prehistorichunter', 'ancientmarble']) { 
					if (pokemon.hasAbility(proto)) {
						if (!pokemon.volatiles[proto] /* && !this.field.isWeather('sunnyday') */ && pokemon.useItem()) {
							pokemon.addVolatile(proto);
						}
						return;
					}
				}
			}
			if (!this.field.isTerrain('electricterrain')) {
				for (const quark of ['quarkdrive', 'lightdrive', 'quarksurge', 'nanorepairs', 'circuitbreaker', 'dyschronometria',
											'faultyphoton', 'firewall']) { 
					if (pokemon.hasAbility(quark)) {
						if (!pokemon.volatiles[quark] && pokemon.useItem()) {
							pokemon.addVolatile(quark);
						}
						return;
					}
				}
			}
			if (pokemon.hasAbility('systempurge') && !pokemon.volatiles['systempurge'] && pokemon.useItem()) {
				pokemon.addVolatile('systempurge');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
	},
	absolite: {
		name: "Absolite",
		spritenum: 576,
		megaStone: "Sol Valiant-Mega",
		megaEvolves: "Sol Valiant",
		itemUser: ["Sol Valiant"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 677,
		desc: "If held by a Sol Valiant, this item allows it to Mega Evolve in battle.",
	},
	garchompite: {
		name: "Garchompite",
		spritenum: 589,
		megaStone: "Garpyuku-Mega",
		megaEvolves: "Garpyuku",
		itemUser: ["Garpyuku"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 683,
		desc: "If held by a Garpyuku, this item allows it to Mega Evolve in battle.",
	},
	gengarite: {
		name: "Gengarite",
		spritenum: 588,
		megaStone: "Crygargonal-Mega",
		megaEvolves: "Crygargonal",
		itemUser: ["Crygargonal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 656,
		desc: "If held by a Crygargonal, this item allows it to Mega Evolve in battle.",
	},
	ampharosite: {
		name: "Ampharosite",
		spritenum: 580,
		megaStone: "Amphamence-Mega-Y",
		megaEvolves: "Amphamence",
		itemUser: ["Amphamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 658,
		desc: "If held by an Amphamence, this item allows it to Mega Evolve in battle.",
	},
	salamencite: {
		name: "Salamencite",
		spritenum: 627,
		megaStone: "Amphamence-Mega-X",
		megaEvolves: "Amphamence",
		itemUser: ["Amphamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 769,
		desc: "If held by an Amphamence, this item allows it to Mega Evolve in battle.",
	},
	swampertite: {
		name: "Swampertite",
		spritenum: 612,
		megaStone: "Goopert-Hisui-Mega",
		megaEvolves: "Goopert-Hisui",
		itemUser: ["Goopert-Hisui"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 752,
		desc: "If held by a Goopert, this item allows it to Mega Evolve in battle.",
	},
	tyranitarite: {
		name: "Tyranitarite",
		spritenum: 607,
		megaStone: "Tyranix-Mega-X",
		megaEvolves: "Tyranix",
		itemUser: ["Tyranix"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 669,
		desc: "If held by a Tyranix, this item allows it to Mega Evolve in battle.",
	},
	steelixite: {
		name: "Steelixite",
		spritenum: 621,
		megaStone: "Tyranix-Mega-Y",
		megaEvolves: "Tyranix",
		itemUser: ["Tyranix"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 761,
		desc: "If held by a Tyranix, this item allows it to Mega Evolve in battle.",
	},
	depletedultranecroziumz: {
		name: "Depleted Ultranecrozium Z",
		spritenum: 687,
		itemUser: ["Necrotrik-Dawn-Wings"],
		onTakeItem: false,
		num: -1001,
		desc: "If held by a Necrotrik-Dawn-Wings, this item allows it to Ultra Burst in battle. This does not allow it to use a Z-Move.",
	},
	alakazite: {
		name: "Alakazite",
		spritenum: 579,
		megaStone: "Mawlakazam-Mega-Y",
		megaEvolves: "Mawlakazam",
		itemUser: ["Mawlakazam"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 679,
		desc: "If held by a Mawlakazam, this item allows it to Mega Evolve in battle.",
	},
	mawilite: {
		name: "Mawilite",
		spritenum: 598,
		megaStone: "Mawlakazam-Mega-X",
		megaEvolves: "Mawlakazam",
		itemUser: ["Mawlakazam"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 681,
		desc: "If held by a Mawlakazam, this item allows it to Mega Evolve in battle.",
	},
	scizorite: {
		name: "Scizorite",
		spritenum: 605,
		megaStone: "Druddizor-Mega",
		megaEvolves: "Druddizor",
		itemUser: ["Druddizor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 670,
		desc: "If held by a Druddizor, this item allows it to Mega Evolve in battle.",
	},
	
	lifeorb: {
		name: "Life Orb",
		spritenum: 249,
		fling: {
			basePower: 30,
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096]);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag && !source.hasAbility(['sandwrath','forceofnature'])) {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.items.get('lifeorb'));
			}
		},
		num: 270,
	},
	jabocaberry: {
		name: "Jaboca Berry",
		spritenum: 230,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dragon",
		},
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical' && source.hp && source.isActive && !source.hasAbility(['magicguard','overwhelming']) && target.eatItem()) {
				this.damage(source.baseMaxhp / (target.hasAbility('ripen') ? 4 : 8), source, target);
			}
		},
		onEat() { },
		num: 211,
		gen: 4,
	},
	quickclaw: {
		onFractionalPriorityPriority: -2,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === "Status" && pokemon.hasAbility(["myceliummight","galvanicrelay"])) return;
			if (priority <= 0 && this.randomChance(1, 5)) {
				this.add('-activate', pokemon, 'item: Quick Claw');
				return 0.1;
			}
		},
		name: "Quick Claw",
		spritenum: 373,
		fling: {
			basePower: 80,
		},
		num: 217,
		gen: 2,
	},
	rowapberry: {
		name: "Rowap Berry",
		spritenum: 420,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dark",
		},
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special' && source.hp && source.isActive && !source.hasAbility(['magicguard','overwhelming']) && target.eatItem()) {
				this.damage(source.baseMaxhp / (target.hasAbility('ripen') ? 4 : 8), source, target);
			}
		},
		onEat() { },
		num: 212,
		gen: 4,
		rating: 1,
	},
};
