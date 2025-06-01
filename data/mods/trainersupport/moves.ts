export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	dragonclaw: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['irisboost']) return 100;
		},
	},
	dragonpulse: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['irisboost']) return 100;
		},
	},
	quickattack: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['joeyboost']) return basePower + 20;
		},
	},
	tackle: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['joeyboost']) return basePower + 80;
		},
	},
	tailwhip: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.volatiles['joeyboost']) move.selfSwitch = true;
		},
	},
	futuresight: {
		inherit: true,
		onTry(source, target) {
			let bp = 120;
			if (pokemon.volatiles['willboost']) bp *= 1.3;
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'futuresight',
				source,
				moveData: {
					id: 'futuresight',
					name: "Future Sight",
					accuracy: 100,
					basePower: bp,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Psychic',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return this.NOT_FAIL;
		},
	},
	poltergeist: {
		inherit: true,
		onTry(source, target) {
			return !!target.item && !target.volatiles['ltsurgeboost'];
		},
	},	
	knockoff: {
		inherit: true,
		onBasePower(basePower, source, target, move) {
			if (target.volatiles['ltsurgeboost']) return;
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
	},
};
