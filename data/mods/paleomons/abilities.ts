export const Abilities: {[abilityid: string]: ModdedAbilityData} = {

	bloodsuck: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['heal'] && move.category !== "Status") {
				this.debug('Bloodsuck boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},

		name: "Bloodsuck",
		shortDesc: "User's draining moves deal 1.3x damage.",
		desc: "The user's draining moves have their power multiplied by 1.3x.",
		rating: 3,
		num: -100,
	},

	carboniferous: {
		onModifyMovePriority: -5,
		onModifyMove(move, target) {
			if (move.type === "Bug" /*&& target.hasType("Fairy")*/) {
				(move as any).carboniferousBoosted = true;
			};
		},

		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(0.5);
			}
		},

		name: "Carboniferous",
		shortDesc: "User's Bug moves are super effective against Fairy-types; Fairy moves deal halved damage.",
		desc: "The user's Bug-type moves deal super effective damage against Fairy-types. Fairy-type moves targeting the user deal halved damage.",
		rating: 3,
		num: -101,
	},

	oozingtar: {
		onStart(source) {
			this.field.setTerrain('tarterrain');
		},

		name: "Oozing Tar",
		shortDesc: "Automatically sets Tar Terrain.",
		rating: 4,
		num: -102,
	},

	underbrushtactics: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Dark' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Grass';
			}
		},
		name: "Underbrush Tactics",
		desc: "This Pokemon's Dark-type moves become Grass-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Dark-type moves become Grass-type.",
		rating: 4,
		num: -103,
	},

	corrosivepincers: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				return this.chainModify(0.5);
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				return this.chainModify(2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				return this.chainModify(2);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-message', `${pokemon.name}'s Corrosive Pincers made it immune to being poisoned!`);
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-message', `${target.name}'s Corrosive Pincers made it immune to being poisoned!`);
			}
			return false;
		},
		name: "Corrosive Pincers",
		desc: "This Pokemon's attacking stat is doubled while using a Poison-type attack. If a Pokemon uses a Poison-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon. This Pokemon cannot be poisoned. Gaining this Ability while poisoned cures it.",
		shortDesc: "This Pokemon's Poison power is 2x; it can't be poisoned; Poison power against it is halved.",
		rating: 4.5,
		num: -104,
	},

	chaser: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (/* target.newlySwitched || */ this.queue.willMove(target)) {
					return basePower * 1.3;
				}
				return basePower;
			}
		},
		name: "Chaser",
		desc: "The power of this Pokemon's move is multiplied by 1.3 if it is the first to move in a turn. Does not affect Doom Desire and Future Sight.",
		shortDesc: "This Pokemon's attacks have 1.3x power if it is the first to move in a turn.",
	},

	absorption: {
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectData.switchingIn || this.field.isTerrain('')) {
				return;
			}
			this.add('-message', `Absorption Activation!`);
			this.field.clearTerrain();
			this.heal((pokemon.baseMaxhp / 8), pokemon);
		},

		name: "Absorption",
		desc: "If there is an active terrain, the terrain ends and the user is healed by 12% of its maximum HP",
		shortDesc: "If there is a terrain active, ends the terrain and heals the user by 12% of its max HP",
	},
	
	//
	//
	//
	//
	// Vanilla abilities start here
	//
	//
	//
	//

	mimicry: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				let newType;
				switch (this.field.terrain) {
				case 'electricterrain':
					newType = 'Electric';
					break;
				case 'grassyterrain':
					newType = 'Grass';
					break;
				case 'mistyterrain':
					newType = 'Fairy';
					break;
				case 'psychicterrain':
					newType = 'Psychic';
					break;
				case 'tarterrain':
					newType = 'Psychic';
					break;
				}
				if (!newType || pokemon.getTypes().join() === newType || !pokemon.setType(newType)) return;
				this.add('-start', pokemon, 'typechange', newType, '[from] ability: Mimicry');
			},
		},
	},
};