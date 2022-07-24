export const Moves: {[moveid: string]: ModdedMoveData} = {
	plaquefang: {
		num: -1001,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Poisons the target if the user is statused.",
		name: "Plaque Fang",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Fang", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.status && source.status !== 'slp') {
					target.trySetStatus('psn', source, move);
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	flurry: {
		num: -1002,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Flurry",
		pp: 20,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Chatter", target);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'flurry')) return false;
			Object.assign(target.side.slotConditions[target.position]['flurry'], {
				duration: 5,
				move: 'flurry',
				source: source,
				position: target.position,
				side: target.side,
				moveData: {
					id: 'flurry',
					name: "Flurry",
					accuracy: 100,
					basePower: 25,
					category: "Physical",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Flying',
				},
			});
			this.add('-message', `${(source.illusion ? source.illusion.name : source.name)} called for help!`);
			return null;
		},
		condition: {
			// this is a slot condition
			duration: 5,
			onResidualOrder: 3,
			onResidual(target) {
				// unlike a future move, Flurry activates each turn
				this.effectData.target = this.effectData.side.active[this.effectData.position];
				const data = this.effectData;
				const move = this.dex.getMove('flurry');
				if (data.target.fainted || data.target === data.source) {
					this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
					return;
				}

				this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} is being swarmed by a flurry of Starly!`);
				data.target.removeVolatile('Endure');

				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
					data.moveData.infiltrates = true;
				}
				if (data.source.hasAbility('normalize') && this.gen >= 6) {
					data.moveData.type = 'Normal';
				}
				if (data.source.hasAbility('adaptability') && this.gen >= 6) {
					data.moveData.stab = 2;
				}

				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
				if (data.source.isActive) {
					this.add('-anim', data.source, "Sky Attack", data.target);
				}
				this.trySpreadMoveHit([data.target], data.source, hitMove);
			},
			onEnd(target) {
				// unlike a future move, Flurry activates each turn
				this.effectData.target = this.effectData.side.active[this.effectData.position];
				const data = this.effectData;
				const move = this.dex.getMove('flurry');
				if (data.target.fainted || data.target === data.source) {
					this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
					return;
				}

				this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} is being swarmed by a flurry of Starly!`);
				data.target.removeVolatile('Endure');

				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
					data.moveData.infiltrates = true;
				}
				if (data.source.hasAbility('normalize') && this.gen >= 6) {
					data.moveData.type = 'Normal';
				}
				if (data.source.hasAbility('adaptability') && this.gen >= 6) {
					data.moveData.stab = 2;
				}

				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
				if (data.source.isActive) {
					this.add('-anim', data.source, "Sky Attack", data.target);
				}
				this.trySpreadMoveHit([data.target], data.source, hitMove);
				this.add('-message', `The flurry of Starly dispersed!`);
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	dispersion: {
		num: -1003,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Type varies based on the user's primary type. Hits foes.",
		name: "Dispersion",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Silver Wind", target);
		},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Beautiful",
	},
	axonrush: {
		num: -1004,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's and ally's Atk, Def, Spe by 1 in Electric Terrain.",
		name: "Axon Rush",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onTryHit() {
			if (!this.field.isTerrain('electricterrain')) return false;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acupressure", target);
		},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		target: "allies",
		type: "Electric",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},

// restored official moves

	baddybad: { // Gen VII Baddy Bad for Curski
		inherit: true,
		accuracy: 100,
		basePower: 90,
		isNonstandard: null,
	},
};
