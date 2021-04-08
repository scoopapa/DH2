export const Moves: {[moveid: string]: ModdedMoveData} = {
	citrusysting: {
		accuracy: 90,
		basePower: 0,
		category: "Status",
    shortDesc: "Paralyzes the target. Grass-types are immune.",
		isViable: true,
		name: "Citrusy Sting",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, powder: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Spray", target);
		},
		status: 'par',
		ignoreImmunity: false,
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {spd: 1}},
		contestType: "Cool",
	},
	berryblast: {
		accuracy: 100,
		basePower: 0,
		category: "Special",
    shortDesc: "Power and type depends on the user's berry.",
		isViable: true,
		name: "Berry Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Terrain Pulse", target);
		},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (!item.naturalGift) return;
			move.type = item.naturalGift.type;
		},
		onPrepareHit(target, pokemon, move) {
			if (pokemon.ignoringItem()) return false;
			const item = pokemon.getItem();
			if (!item.naturalGift) return false;
			move.basePower = item.naturalGift.basePower;
			pokemon.setItem('');
			pokemon.lastItem = item.id;
			pokemon.usedItemThisTurn = true;
			this.runEvent('AfterUseItem', pokemon, null, null, item);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	bushclaws: {
		num: 358,
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
    shortDesc: "Power doubles if the target is asleep.",
		isViable: true,
		name: "Bush Claws",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Claw", target);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	revelationspin: {
		num: 686,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
    shortDesc: "Type matches the user's primary type.",
		isViable: true,
		name: "Revelation Spin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
};
