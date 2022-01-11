export const Items: {[k: string]: ModdedItemData} = {
	aguavberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
	},
	apicotberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.eatItem();
			}
		},
	},
	berryjuice: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				if (this.runEvent('TryHeal', pokemon) && pokemon.useItem()) {
					this.heal(20);
				}
			}
		},
		isNonstandard: "Unobtainable",
	},
	blackbelt: {
		inherit: true,
		desc: "Holder's Fighting-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				return basePower * 1.1;
			}
		},
	},
	blackglasses: {
		inherit: true,
		desc: "Holder's Dark-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dark') {
				return basePower * 1.1;
			}
		},
	},
	charcoal: {
		inherit: true,
		desc: "Holder's Fire-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fire') {
				return basePower * 1.1;
			}
		},
	},
	dragonfang: {
		inherit: true,
		desc: "Holder's Dragon-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dragon') {
				return basePower * 1.1;
			}
		},
	},
	enigmaberry: {
		name: "Enigma Berry",
		desc: "No competitive use.",
		spritenum: 124,
		isBerry: true,
		num: 208,
		gen: 3,
		isNonstandard: "Unobtainable",
	},
	figyberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
	},
	ganlonberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.eatItem();
			}
		},
	},
	hardstone: {
		inherit: true,
		desc: "Holder's Rock-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Rock') {
				return basePower * 1.1;
			}
		},
	},
	iapapaberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
	},
	kingsrock: {
		inherit: true,
		onModifyMove(move) {
			const affectedByKingsRock = [
				'aerialace', 'aeroblast', 'aircutter', 'armthrust', 'barrage', 'beatup', 'bide', 'bind', 'blastburn', 'bonerush', 'bonemerang', 'bounce', 'brickbreak', 'bulletseed', 'clamp', 'cometpunch', 'crabhammer', 'crosschop', 'cut', 'dig', 'dive', 'doublekick', 'doubleslap', 'doubleedge', 'dragonbreath', 'dragonclaw', 'dragonrage', 'drillpeck', 'earthquake', 'eggbomb', 'endeavor', 'eruption', 'explosion', 'extremespeed', 'falseswipe', 'feintattack', 'firespin', 'flail', 'fly', 'frenzyplant', 'frustration', 'furyattack', 'furycutter', 'furyswipes', 'gust', 'hiddenpower', 'highjumpkick', 'hornattack', 'hydrocannon', 'hydropump', 'hyperbeam', 'iceball', 'iciclespear', 'jumpkick', 'karatechop', 'leafblade', 'lowkick', 'machpunch', 'magicalleaf', 'magnitude', 'megakick', 'megapunch', 'megahorn', 'meteormash', 'mudshot', 'muddywater', 'nightshade', 'outrage', 'overheat', 'payday', 'peck', 'petaldance', 'pinmissile', 'poisontail', 'pound', 'psychoboost', 'psywave', 'quickattack', 'rage', 'rapidspin', 'razorleaf', 'razorwind', 'return', 'revenge', 'reversal', 'rockblast', 'rockthrow', 'rollingkick', 'rollout', 'sandtomb', 'scratch', 'seismictoss', 'selfdestruct', 'shadowpunch', 'shockwave', 'signalbeam', 'silverwind', 'skullbash', 'skyattack', 'skyuppercut', 'slam', 'slash', 'snore', 'solarbeam', 'sonicboom', 'spikecannon', 'spitup', 'steelwing', 'strength', 'struggle', 'submission', 'surf', 'swift', 'tackle', 'takedown', 'thrash', 'tickle', 'triplekick', 'twister', 'uproar', 'visegrip', 'vinewhip', 'vitalthrow', 'volttackle', 'watergun', 'waterpulse', 'waterfall', 'weatherball', 'whirlpool', 'wingattack', 'wrap',
			];
			if (affectedByKingsRock.includes(move.id)) {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
	},
	lansatberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.eatItem();
			}
		},
	},
	laxincense: {
		inherit: true,
		desc: "The accuracy of attacks against the holder is 0.95x.",
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('lax incense - decreasing accuracy');
			return accuracy * 0.95;
		},
	},
	liechiberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.eatItem();
			}
		},
	},
	lightball: {
		inherit: true,
		desc: "If held by a Pikachu, its Special Attack is doubled.",
		onModifyAtk() {},
	},
	magnet: {
		inherit: true,
		desc: "Holder's Electric-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Electric') {
				return basePower * 1.1;
			}
		},
	},
	magoberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
	},
	metalcoat: {
		inherit: true,
		desc: "Holder's Steel-type attacks have 1.1x power. Evolves Onix into Steelix and Scyther into Scizor when traded.",
		shortDesc: "Holder's Steel-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Steel') {
				return basePower * 1.1;
			}
		},
	},
	miracleseed: {
		inherit: true,
		desc: "Holder's Grass-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Grass') {
				return basePower * 1.1;
			}
		},
	},
	mysticwater: {
		inherit: true,
		desc: "Holder's Water-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Water') {
				return basePower * 1.1;
			}
		},
	},
	nevermeltice: {
		inherit: true,
		desc: "Holder's Ice-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ice') {
				return basePower * 1.1;
			}
		},
	},
	oranberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
	},
	petayaberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.eatItem();
			}
		},
	},
	poisonbarb: {
		inherit: true,
		desc: "Holder's Poison-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Poison') {
				return basePower * 1.1;
			}
		},
	},
	quickclaw: {
		inherit: true,
		onFractionalPriority(priority, pokemon) {
			if (this.randomChance(1, 5)) {
				return Math.round(priority) + 0.1;
			}
		},
	},
	salacberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.eatItem();
			}
		},
	},
	seaincense: {
		inherit: true,
		desc: "Holder's Water-type attacks have 1.05x power.",
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Water') {
				return basePower * 1.05;
			}
		},
	},
	sharpbeak: {
		inherit: true,
		desc: "Holder's Flying-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Flying') {
				return basePower * 1.1;
			}
		},
	},
	silkscarf: {
		inherit: true,
		desc: "Holder's Normal-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return basePower * 1.1;
			}
		},
	},
	silverpowder: {
		inherit: true,
		desc: "Holder's Bug-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Bug') {
				return basePower * 1.1;
			}
		},
	},
	sitrusberry: {
		inherit: true,
		desc: "Restores 30 HP when at 1/2 max HP or less. Single use.",
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(30);
		},
	},
	softsand: {
		inherit: true,
		desc: "Holder's Ground-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ground') {
				return basePower * 1.1;
			}
		},
	},
	spelltag: {
		inherit: true,
		desc: "Holder's Ghost-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ghost') {
				return basePower * 1.1;
			}
		},
	},
	starfberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				pokemon.eatItem();
			}
		},
	},
	twistedspoon: {
		inherit: true,
		desc: "Holder's Psychic-type attacks have 1.1x power.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Psychic') {
				return basePower * 1.1;
			}
		},
	},
	wikiberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
	},
	bugmemory: {
		onMemory: 'Bug',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Bug",
		itemUser: ["Silvally-Bug"],
	},
	darkmemory: {
		name: "Dark Memory",
		onMemory: 'Dark',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Dark",
		itemUser: ["Silvally-Dark"],
	},
	dragonmemory: {
		name: "Dragon Memory",
		onMemory: 'Dragon',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Dragon",
		itemUser: ["Silvally-Dragon"],
	},
	electricmemory: {
		name: "Electric Memory",
		onMemory: 'Electric',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Electric",
		itemUser: ["Silvally-Electric"],
	},
	fightingmemory: {
		name: "Fighting Memory",
		onMemory: 'Fighting',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Fighting",
		itemUser: ["Silvally-Fighting"],
	},
	firememory: {
		name: "Fire Memory",
		onMemory: 'Fire',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Fire",
		itemUser: ["Silvally-Fire"],
	},
	flyingmemory: {
		name: "Flying Memory",
		onMemory: 'Flying',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Flying",
		itemUser: ["Silvally-Flying"],
	},
	ghostmemory: {
		name: "Ghost Memory",
		onMemory: 'Ghost',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Ghost",
		itemUser: ["Silvally-Ghost"],
	},
	grassmemory: {
		name: "Grass Memory",
		onMemory: 'Grass',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Grass",
		itemUser: ["Silvally-Grass"],
	},
	groundmemory: {
		name: "Ground Memory",
		onMemory: 'Ground',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Ground",
		itemUser: ["Silvally-Ground"],
	},
	icememory: {
		name: "Ice Memory",
		onMemory: 'Ice',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Ice",
		itemUser: ["Silvally-Ice"],
	},
	poisonmemory: {
		name: "Poison Memory",
		spritenum: 670,
		onMemory: 'Poison',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Poison",
		itemUser: ["Silvally-Poison"],
	},
	psychicmemory: {
		name: "Psychic Memory",
		onMemory: 'Psychic',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Psychic",
		itemUser: ["Silvally-Psychic"],
	},
	rockmemory: {
		name: "Rock Memory",
		onMemory: 'Rock',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Rock",
		itemUser: ["Silvally-Rock"],
	},
	steelmemory: {
		name: "Steel Memory",
		onMemory: 'Steel',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Steel",
		itemUser: ["Silvally-Steel"],
	},
	watermemory: {
		name: "Water Memory",
		onMemory: 'Water',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Water",
		itemUser: ["Silvally-Water"],
	},
	assaultvest: {
		name: "Assault Vest",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifySpDPriority: 1,
		onModifySpD(spd) {
			return this.chainModify(1.5);
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
		isNonstandard: "Past",
	},
	choicescarf: {
		name: "Choice Scarf",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.5);
		},
		isChoice: true,
		num: 287,
		gen: 4,
		isNonstandard: "Past",
	},
	choicespecs: {
		name: "Choice Specs",
		spritenum: 70,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.5);
		},
		isChoice: true,
		num: 297,
		gen: 4,
		isNonstandard: "Past",
	},
	eviolite: {
		name: "Eviolite",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		num: 538,
		gen: 5,
		isNonstandard: "Past",
	},
	expertbelt: {
		name: "Expert Belt",
		spritenum: 132,
		fling: {
			basePower: 10,
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: 268,
		gen: 4,
		isNonstandard: "Past",
	},
	focussash: {
		name: "Focus Sash",
		spritenum: 151,
		fling: {
			basePower: 10,
		},
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				if (target.useItem()) {
					return target.hp - 1;
				}
			}
		},
		num: 275,
		gen: 4,
		isNonstandard: "Past",
	},
	heavydutyboots: {
		name: "Heavy-Duty Boots",
		spritenum: 715,
		fling: {
			basePower: 80,
		},
		num: 1120,
		gen: 8,
		isNonstandard: "Past",
	},
	lifeorb: {
		name: "Life Orb",
		spritenum: 249,
		fling: {
			basePower: 30,
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status') {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.getItem('lifeorb'));
			}
		},
		num: 270,
		gen: 4,
		isNonstandard: "Past",
	},
	powerherb: {
		onChargeMove(pokemon, target, move) {
			if (pokemon.useItem()) {
				this.debug('power herb - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', pokemon, move.name, target);
				return false; // skip charge turn
			}
		},
		name: "Power Herb",
		spritenum: 358,
		fling: {
			basePower: 10,
		},
		num: 271,
		gen: 4,
		isNonstandard: "Past",
	},
	rockyhelmet: {
		name: "Rocky Helmet",
		spritenum: 417,
		fling: {
			basePower: 60,
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 6, source, target);
			}
		},
		num: 540,
		gen: 5,
		isNonstandard: "Past",
	},
	expertbelt: {
		name: "Expert Belt",
		spritenum: 132,
		fling: {
			basePower: 10,
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: 268,
		gen: 4,
	},
	thickclub: {
		name: "Thick Club",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Cubone' || pokemon.baseSpecies.baseSpecies === 'Marowak') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Marowak", "Cubone", "Marowak-Alola"],
		num: 258,
		gen: 2,
	},
	stick: {
		name: "Stick",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		itemUser: ["Farfetch\u2019d", "Farfetch\u2019d-Galar", "Sirfetch\u2019d"],
		num: 259,
		gen: 2,
	},
	occaberry: {
		inherit: true,
		isNonstandard: null,
	},
	passhoberry: {
		inherit: true,
		isNonstandard: null,
	},
	wacanberry: {
		inherit: true,
		isNonstandard: null,
	},
	rindoberry: {
		inherit: true,
		isNonstandard: null,
	},
	yacheberry: {
		inherit: true,
		isNonstandard: null,
	},
	chopleberry: {
		inherit: true,
		isNonstandard: null,
	},
	kebiaberry: {
		inherit: true,
		isNonstandard: null,
	},
	shucaberry: {
		inherit: true,
		isNonstandard: null,
	},
	cobaberry: {
		inherit: true,
		isNonstandard: null,
	},
	payapaberry: {
		inherit: true,
		isNonstandard: null,
	},
	tangaberry: {
		inherit: true,
		isNonstandard: null,
	},
	chartiberry: {
		inherit: true,
		isNonstandard: null,
	},
	kasibberry: {
		inherit: true,
		isNonstandard: null,
	},
	habanberry: {
		inherit: true,
		isNonstandard: null,
	},
	colburberry: {
		inherit: true,
		isNonstandard: null,
	},
	babiriberry: {
		inherit: true,
		isNonstandard: null,
	},
	chilanberry: {
		inherit: true,
		isNonstandard: null,
	},
	custapberry: {
		inherit: true,
		isNonstandard: null,
	},
	airballoon: {
		inherit: true,
		isNonstandard: null,
	},
};
