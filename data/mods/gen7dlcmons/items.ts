export const Items: {[itemid: string]: ModdedItemData} = {
	throatspray: {
		inherit: true,
		gen: 7,
	},
	roomservice: {
		inherit: true,
		gen: 7,
	},
	photosynthesizer: {
		name: "Photosynthesizer",
		shortDesc: "When sun is active, increases the holder's Spe stat by 1 stage.",
		onUpdate(pokemon) {
			if (this.field.isWeather(['sunnyday']) && pokemon.useItem()) {
				this.boost({
					spe: 1,
				});
			}
		},
		fling: {
			basePower: 60,
		},
		gen: 7,
		num: -1000,
	},
	raincatcher: {
		name: "Rain Catcher",
		shortDesc: "When rain is active, increases the holder's Sp. Atk stat by 1 stage.",
		onUpdate(pokemon) {
			if (this.field.isWeather(['raindance']) && pokemon.useItem()) {
				this.boost({
					spa: 1,
				});
			}
		},
		fling: {
			basePower: 60,
		},
		gen: 7,
		num: -1001,
	},
	sandyrock: {
		name: "Sandy Rock",
		shortDesc: "When sand is active, increases the holder's Def stat by 1 stage.",
		onUpdate(pokemon) {
			if (this.field.isWeather(['sandstorm']) && pokemon.useItem()) {
				this.boost({
					def: 1,
				});
			}
		},
		fling: {
			basePower: 60,
		},
		gen: 7,
		num: -1002,
	},
	snowglobe: {
		name: "Snow Globe",
		shortDesc: "When hail is active, increases the holder's Atk stat by 1 stage.",
		onUpdate(pokemon) {
			if (this.field.isWeather(['hail']) && pokemon.useItem()) {
				this.boost({
					atk: 1,
				});
			}
		},
		fling: {
			basePower: 60,
		},
		gen: 7,
		num: -1003,
	},
	dittoplush: {
		name: "Ditto Plush",
		shortDesc: "Temporarily copies the item of an adjacent opponent on entry.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted || !this.isAdjacent(target, pokemon)) continue;
				if (!target.item || this.dex.getItem(target.item).zMove || this.dex.getItem(target.item).megaStone) continue;
				if (!pokemon.useItem) return;
				pokemon.item = target.item;
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} copied the ${this.dex.getItem(pokemon.item).name} belonging to ${target.illusion ? target.illusion.name : target.name}!`);
				pokemon.addVolatile('dittoplush');
				return;
			}
		},
		condition: {
			onEnd(pokemon) {
				if (pokemon.item && pokemon.item !== 'dittoplush') { // don't return Ditto Plush if the Pokémon has lost its item
					this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name}'s Ditto Plush returned to normal!`);
					pokemon.item = 'dittoplush' as ID;
				}
			},
		},
		fling: {
			basePower: 60,
		},
		gen: 7,
		num: -1004,
	},
	roomstop: {
		name: "Room Stop",
		shortDesc: "Clears rooms on entry, but only once.",
		onUpdate(pokemon) {
			if (this.field.getPseudoWeather('trickroom') || this.field.getPseudoWeather('magicroom') || this.field.getPseudoWeather('wonderroom')) {
				// do not check to use item, because then it wouldn't be able to clear Magic Room which would be really silly
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} used its Room Stop!`);
				this.field.removePseudoWeather('trickroom');
				this.field.removePseudoWeather('magicroom');
				this.field.removePseudoWeather('wonderroom');
				this.add('-enditem', pokemon, 'Room Stop');
				pokemon.item = '';
				pokemon.itemData = {id: '', target};
				this.runEvent('AfterUseItem', pokemon, null, null, this.dex.getItem('roomstop'));
			}
		},
		gen: 7,
		num: -1005,
	},
	weathermachine: {
		name: "Weather Machine",
		shortDesc: "Clears weather on entry, but only three times.",
		onUpdate(pokemon) {
			if (pokemon.ignoringItem) return;
			if (this.field.isWeather(['sunnyday', 'desolateland', 'hail', 'raindance', 'primordialsea', 'sandstorm'])) {
				if (!this.effectData.uses) {
					this.effectData.uses = 0;
				}
				this.effectData.uses++;
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} used its Weather Machine!`);
				if (this.effectData.uses === 3) {
					pokemon.useItem;
				}
				this.field.clearWeather();
			}
		},
		gen: 7,
		num: -1006,
	},
	terrainshovel: {
		name: "Terrain Shovel",
		shortDesc: "Clears terrain on entry, but only three times.",
		onUpdate(pokemon) {
			if (pokemon.ignoringItem) return;
			if (this.field.terrain) {
				if (!this.effectData.uses) {
					this.effectData.uses = 0;
				}
				this.effectData.uses++;
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} used its Terrain Shovel!`);
				if (this.effectData.uses === 3) {
					pokemon.useItem;
				}
				this.field.clearTerrain();
			}
		},
		gen: 7,
		num: -1007,
	},
	burningcoal: {
		name: "Burning Coal",
		shortDesc: "Burns an attacker on contact, but only once.",
		fling: {
			basePower: 30,
			status: 'brn',
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !this.dex.getImmunity('brn', source) && target.useItem()) {
				source.trySetStatus('brn', target);
			}
		},
		num: -1008,
		gen: 7,
	},
	venomslime: {
		name: "Venom Slime",
		shortDesc: "Poisons an attacker on contact, but only once.",
		fling: {
			basePower: 30,
			status: 'psn',
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !this.dex.getImmunity('psn', source) && target.useItem()) {
				source.trySetStatus('psn', target);
			}
		},
		num: -1009,
		gen: 7,
	},
	fishingrod: {
		name: "Fishing Rod",
		shortDesc: "Suppresses the Abilities of Water-type Pokémon on the field.",
		fling: {
			basePower: 30,
		},
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target, 'Fishing Rod');
			}
		},
		// implemented in scripts.ts
		num: -1010,
		gen: 7,
	},
	darkredemerald: {
		name: "Dark Red Emerald",
		shortDesc: "Boosts Fire power by 50% but halves the holder's Speed.",
		fling: {
			basePower: 130,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fire') {
				return this.chainModify(1.5);
			}
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: -1011,
		gen: 7,
	},
	darkblueemerald: {
		name: "Dark Blue Emerald",
		shortDesc: "Boosts Water power by 50% but halves the holder's Speed.",
		fling: {
			basePower: 130,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.5);
			}
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: -1012,
		gen: 7,
	},
	ultrasword: {
		name: "Ultra Sword",
		shortDesc: "Boosts the holder's power by 30% when the target is an Ultra Beast.",
		fling: {
			basePower: 30,
		},
		onModifyDamage(damage, source, target, move) {
			if (
				[
					'nihilego', 'buzzwole', 'pheromosa', 'xurkitree', 'celesteela', 'kartana', 'guzzlord', 'necrozma',
					'poipole', 'naganadel', 'blacephalon', 'stakataka',
					'plubia', 'snoxin', 'anglevolt', 'thundigeist', 'komodond', 'forsnaken', 'arachsoil'
				].includes(this.toID(target.baseSpecies.baseSpecies))
			) {
				return this.chainModify(1.3);
			}
		},
		num: -1013,
		gen: 7,
	},
	karmamirror: {
		name: "Karma Mirror",
		shortDesc: "Removes the item of an attacker that attempts to knock it off.",
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp) return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				if (source.hasItem('karmamirror')) return false;
				const sourceItem = source.takeItem(pokemon);
				if (sourceItem) {
					this.add('-enditem', source, sourceItem, '[silent]', '[from] item: Karma Mirror', '[of] ' + pokemon);
				}
				return false;
			}
		},
		num: -1014,
		gen: 7,
	},
	toughcape: {
		name: "Tough Cape",
		shortDesc: "Consumed to protect from damage once. Restores HP by 10% at the end of the first turn.",
		fling: {
			basePower: 10,
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (target.useItem) return false;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (!pokemon.activeTurns) this.heal(pokemon.baseMaxhp / 10);
		},
		num: -1015,
		gen: 7,
	},
	itemscrapper: {
		name: "Item Scrapper",
		shortDesc: "Removes the item of an adjacent opponent on entry.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted || !this.isAdjacent(target, pokemon)) continue;
				if (!target.item || this.dex.getItem(target.item).zMove || this.dex.getItem(target.item).megaStone) continue;
				const item = target.getItem();
				if (!this.singleEvent('TakeItem', item, target.itemData, target, target, item, item)) return;
				pokemon.useItem;
			}
		},
		num: -1016,
		gen: 7,
	},
	iviolite: {
		name: "Iviolite",
		shortDesc: "Raises the Atk and Sp. Atk of NFE Pokémon by 1.3x.",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyAtkPriority: 2,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 2,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.3);
			}
		},
		num: -1017,
		gen: 7,
	},
	minersshovel: {
		name: "Miner's Shovel",
		shortDesc: "Clears one layer of one random hazard on entry.", // assuming no hazard immunity because it would otherwise outclass Parachute completely, but not consumable?
		fling: {
			basePower: 80,
		},
		onStart(pokemon) {
			let hazards = 0;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes', 'cinders']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					hazards++;
				}
			}
			if (!hazards || pokemon.ignoringItem()) return;
			this.add('-item', pokemon, "Miner's Shovel");
			hazards = this.random(hazards);
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes', 'cinders']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					if (hazards = 0) {
						if (pokemon.side.getSideCondition(sideCondition).layers && pokemon.side.getSideCondition(sideCondition).layers > 0) {
							pokemon.side.getSideCondition(sideCondition).layers--;
							this.add('-sideend', pokemon.side, this.dex.getEffect(sideCondition).name, "[from] item: Miner's Shovel", '[of] ' + pokemon);
							this.hint(`The Miner's Shovel only removes one layer at a time!`);
							if (pokemon.side.getSideCondition(sideCondition).layers > 1) {
								this.hint(`This may not display properly, but there are still ${pokemon.side.getSideCondition(sideCondition).layers} layers remaining.`);
							} else {
								this.hint(`This may not display properly, but there is still ${pokemon.side.getSideCondition(sideCondition).layers} layer remaining.`);
							}
						} else {
							pokemon.side.removeSideCondition(sideCondition);
							this.add('-sideend', pokemon.side, this.dex.getEffect(sideCondition).name, "[from] item: Miner's Shovel", '[of] ' + pokemon);
						}
						return;
					} else {
						hazards--;
					}
				}
			}
		},
		num: -1018,
		gen: 7,
	},
	parachute: {
		name: "Parachute",
		shortDesc: "Hazard immunity, but only once.",
		fling: {
			basePower: 10,
		},
		num: -1019,
		gen: 7,
		// implemented in moves.ts
	},
	adventurerspickaxe: {
		name: "Adventurer's Pickaxe",
		shortDesc: "Hazard immunity when held by an Ice-type.",
		fling: {
			basePower: 80,
		},
		num: -1020,
		gen: 7,
		// implemented in moves.ts
	},
	gravelberry: {
		name: "Gravel Berry",
		shortDesc: "Clears Stealth Rock on entry. Stealth Rock immunity.",
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Rock",
		},
		onEat(pokemon) {
			if (pokemon.side.getSideCondition('stealthrock')) {
				this.add('-sideend', pokemon.side, 'move: Stealth Rock', '[of] ' + pokemon);
				pokemon.side.removeSideCondition('stealthrock');
			}
		},
		num: -1021,
		gen: 7,
		// implemented in moves.ts
	},
	spikyberry: {
		name: "Spiky Berry",
		shortDesc: "Clears Spikes on entry. Spikes immunity.",
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ground",
		},
		onEat(pokemon) {
			if (pokemon.side.getSideCondition('spikes')) {
				this.add('-sideend', pokemon.side, 'move: Spikes', '[of] ' + pokemon);
				pokemon.side.removeSideCondition('spikes');
			}
		},
		num: -1022,
		gen: 7,
		// implemented in moves.ts
	},
	toxicspikyberry: {
		name: "Toxic Spiky Berry",
		shortDesc: "Clears Toxic Spikes on entry. Toxic Spikes immunity.",
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Poison",
		},
		onEat(pokemon) {
			if (pokemon.side.getSideCondition('toxicspikes')) {
				this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
				pokemon.side.removeSideCondition('toxicspikes');
			}
		},
		num: -1023,
		gen: 7,
		// implemented in moves.ts
	},
	gooeyberry: {
		name: "Gooey Berry",
		shortDesc: "Clears Sticky Web on entry. Sticky Web immunity.",
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Bug",
		},
		onEat(pokemon) {
			if (pokemon.side.getSideCondition('stickyweb')) {
				this.add('-sideend', pokemon.side, 'move: Sticky Web', '[of] ' + pokemon);
				pokemon.side.removeSideCondition('stickyweb');
			}
		},
		num: -1024,
		gen: 7,
		// implemented in moves.ts
	},
	cinderberry: {
		name: "Cinder Berry",
		shortDesc: "Clears Cinders on entry. Cinders immunity.",
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire",
		},
		onEat(pokemon) {
			if (pokemon.side.getSideCondition('cinders')) {
				this.add('-sideend', pokemon.side, 'move: Cinders', '[of] ' + pokemon);
				pokemon.side.removeSideCondition('cinders');
			}
		},
		num: -1025,
		gen: 7,
		// implemented in moves.ts
	},
	tikilohiumz: {
		name: "Tikilohium Z",
		desc: "If held by Tikilohi with Helping Souls, it can use Wrathful Soulstrike.",
		spritenum: 644,
		onTakeItem: false,
		zMove: "Wrathful Soulstrike",
		zMoveFrom: "Helping Souls",
		itemUser: ["Tikilohi"],
		num: -1026,
		gen: 7,
	},
	plubiumz: {
		name: "Plubium Z",
		desc: "If held by Plubia with Shadow Ball, it can use Eternal Nightmare.",
		spritenum: 644,
		onTakeItem: false,
		zMove: "Eternal Nightmare",
		zMoveFrom: "Shadow Ball",
		itemUser: ["Plubia"],
		num: -1027,
		gen: 7,
	},
	forsnakiumz: {
		name: "Forsnakium Z",
		desc: "If held by Forsnaken with Shed Strike, it can use Shed Impact.",
		spritenum: 631,
		onTakeItem: false,
		zMove: "Shed Impact",
		zMoveFrom: "Shed Strike",
		itemUser: ["Forsnaken"],
		num: -1028,
		gen: 7,
	},
	angleviumz: {
		name: "Anglevium Z",
		desc: "If held by Anglevolt with Liquidation, it can use Deep Sea Strike.",
		spritenum: 633,
		onTakeItem: false,
		zMove: "Deep Sea Strike",
		zMoveFrom: "Liquidation",
		itemUser: ["Anglevolt"],
		num: -1029,
		gen: 7,
	},
	castforiumz: {
		name: "Castforium Z",
		desc: "If held by Castform with Weather Ball, it can use Precipitation Crash.",
		spritenum: 631,
		onTakeItem: false,
		zMove: "Precipitation Crash",
		zMoveFrom: "Weather Ball",
		itemUser: ["Castform"],
		num: -1030,
		gen: 7,
	},
	snoxiumz: {
		name: "Snoxium Z",
		desc: "If held by Snoxin with Infection, it can use Viral Freeze.",
		spritenum: 636,
		onTakeItem: false,
		zMove: "Viral Freeze",
		zMoveFrom: "Infection",
		itemUser: ["Snoxin"],
		num: -1031,
		gen: 7,
	},
	komodondiumz: {
		name: "Komodondium Z",
		desc: "If held by Komodond with Clangorous Soul, it can use Clangorous Ascent.",
		spritenum: 690,
		onTakeItem: false,
		zMove: "Clangorous Ascent",
		zMoveFrom: "Clangorous Soul",
		itemUser: ["Komodond"],
		num: -1032,
		gen: 7,
	},
};