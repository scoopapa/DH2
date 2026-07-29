export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	pyroball: {
		inherit: true,
		onEffectiveness(typeMod, target, type, source) {
			if (source.ability?.fullname !== 'chargedstriker') return;
			return typeMod + this.dex.getEffectiveness('Electric', type);
		},
	},
	explosion: {
		inherit: true,
		// double to simulate halved defense
		onDamage(damage, target, source, effect) {
			return damage * 2;
		},
		shortDesc: "Hits adjacent Pokemon. The user faints. Damage is doubled.",
	},
	selfdestruct: {
		inherit: true,
		// double to simulate halved defense
		onDamage(damage, target, source, effect) {
			return damage * 2;
		},
		shortDesc: "Hits adjacent Pokemon. The user faints. Damage is doubled.",
	},
	gigaimpact: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	hyperbeam: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	hydrocannon: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	frenzyplant: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	blastburn: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	roaroftime: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	dracometeor: {
		inherit: true,
		basePower: 140,
	},
	leafstorm: {
		inherit: true,
		basePower: 140,
	},
	overheat: {
		inherit: true,
		basePower: 140,
	},
	blizzard: {
		inherit: true,
		accuracy: 80,
	},
	thunder: {
		inherit: true,
		accuracy: 80,
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	stealthrock: {
		inherit: true,
		sideCondition: 'stealthrock',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				this.damage(pokemon.maxhp * Math.trunc(pokemon.isGrounded() ? 1 : 2) / 8);
			},
		},
	},
	knockoff: {
		inherit: true,
		basePower: 40,
	},
	thief: {
		inherit: true,
		basePower: 70,
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
	},
	fissure: {
		inherit: true,
		ohko: false,
		basePower: 150,
		accuracy: 50,
		shortDesc: "No additional effect.",
	},
	guillotine: {
		inherit: true,
		basePower: 200,
		accuracy: 40,
		ohko: false,
		shortDesc: "No additional effect.",
	},
	sheercold: {
		inherit: true,
		category: "Special",
		basePower: 150,
		ohko: false,
		accuracy: 50,
		secondary: {
			chance: 100,
			status: 'frz',
		},
		shortDesc: "Freezes the target.",
	},
	recover: {
		inherit: true,
		pp: 10,
	},
};
