export const Items: {[itemid: string]: ItemData} = {
	crystalorb: {
		name: "Crystal Orb",
		num: 1001,
		desc: "The holder's secondary type is replaced with Crystal. 20% boost to Crystal attacks.",
		onBeforeSwitchIn(pokemon) {
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser !== pokemon.fullname) return false;
			if (pokemon.hasType('Crystal')) return false;
			if (!pokemon.addType('Crystal')) return false;
			pokemon.setType([pokemon.types[0],"Crystal"]);
			pokemon.side.usedSuperType = true;
			pokemon.side.superTypeUser = "first_switch";
		},
		onStart(pokemon) {
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser === "first_switch"){
				this.add('-message',pokemon.name + " is a Crystal type!");
				pokemon.side.superTypeUser = pokemon.fullname;
			}
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser === pokemon.fullname) {
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			}
		},
		onUpdate(pokemon) {
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser === pokemon.fullname && !pokemon.hasType('Crystal')) {
				pokemon.setType([pokemon.types[0],"Crystal"]);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source && source.hasType("Crystal")) {
				return false;
			}
			return true;
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Crystal') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: 275,
		gen: 8,
	},
	feralorb: {
		name: "Feral Orb",
		num: 1001,
		desc: "The holder's secondary type is replaced with Feral. 20% boost to Feral attacks.",
		onBeforeSwitchIn(pokemon) {
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser !== pokemon.fullname) return false;
			if (pokemon.hasType('Feral')) return false;
			if (!pokemon.addType('Feral')) return false;
			pokemon.setType([pokemon.types[0],"Feral"]);
			pokemon.side.usedSuperType = true;
			pokemon.side.superTypeUser = "first_switch";
		},
		onStart(pokemon) {
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser === "first_switch"){
				this.add('-message',pokemon.name + " is a Feral type!");
				pokemon.side.superTypeUser = pokemon.fullname;
			}
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser === pokemon.fullname) {
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			}
		},
		onUpdate(pokemon) {
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser === pokemon.fullname && !pokemon.hasType('Feral')) {
				pokemon.setType([pokemon.types[0],"Feral"]);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source && source.hasType("Feral")) {
				return false;
			}
			return true;
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Feral') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: 275,
		gen: 8,
	},
};