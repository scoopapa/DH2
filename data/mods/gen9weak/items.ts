export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	aguavberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 10,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'spd') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/8 max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use.",
	},
	berserkgene: {
		inherit: true,
		isNonstandard: "Future",
	},
	blackbelt: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fighting') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Fighting-type attacks have 1.1x power.",
	},
	blackglasses: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Dark') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Dark-type attacks have 1.1x power.",
	},
	buggem: {
		inherit: true,
		isNonstandard: "Future",
	},
	charcoal: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Fire') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Fire-type attacks have 1.1x power.",
	},
	darkgem: {
		inherit: true,
		isNonstandard: "Future",
	},
	dragonfang: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Dragon') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Dragon-type attacks have 1.1x power.",
	},
	dragongem: {
		inherit: true,
		isNonstandard: "Future",
	},
	electricgem: {
		inherit: true,
		isNonstandard: "Future",
	},
	fairygem: {
		inherit: true,
		isNonstandard: "Future",
	},
	fightinggem: {
		inherit: true,
		isNonstandard: "Future",
	},
	figyberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 10,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'atk') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/8 max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use.",
	},
	firegem: {
		inherit: true,
		isNonstandard: "Future",
	},
	flyinggem: {
		inherit: true,
		isNonstandard: "Future",
	},
	grassgem: {
		inherit: true,
		isNonstandard: "Future",
	},
	ghostgem: {
		inherit: true,
		isNonstandard: "Future",
	},
	groundgem: {
		inherit: true,
		isNonstandard: "Future",
	},
	hardstone: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Rock') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Rock-type attacks have 1.1x power.",
	},
	iapapaberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 10,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'def') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/8 max HP at 1/4 max HP or less; confuses if -Def Nature. Single use.",
	},
	icegem: {
		inherit: true,
		isNonstandard: "Future",
	},
	laxincense: {
		inherit: true,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('lax incense - decreasing accuracy');
			return accuracy * 0.95;
		},
		shortDesc: "The accuracy of attacks against the holder is 0.95x.",
	},
	lightball: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.name === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		shortDesc: "If held by a Pikachu, its Special Attack is doubled.",
	},
	magnet: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Electric-type attacks have 1.1x power.",
	},
	magoberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 10,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'spe') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/8 max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use.",
	},
	metalcoat: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Steel') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Steel-type attacks have 1.1x power.",
	},
	metronome: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('metronome')) {
					pokemon.removeVolatile('metronome');
					return;
				}
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 4505, 4915, 5324, 5734, 6144, 6553, 6963, 7372, 7782, 8192];
				const numConsecutive = this.effectState.numConsecutive > 10 ? 10 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 2x after 10 turns.",
	},
	miracleseed: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Grass') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Grass-type attacks have 1.1x power.",
	},
	mysticwater: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Water') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Water-type attacks have 1.1x power.",
	},
	nevermeltice: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ice') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Ice-type attacks have 1.1x power.",
	},
	poisonbarb: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Poison') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Poison-type attacks have 1.1x power.",
	},
	poisongem: {
		inherit: true,
		isNonstandard: "Future",
	},
	psychicgem: {
		inherit: true,
		isNonstandard: "Future",
	},
	rockgem: {
		inherit: true,
		isNonstandard: "Future",
	},
	seaincense: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Water') {
				return this.chainModify([4300, 4096]);
			}
		},
		shortDesc: "Holder's Water-type attacks have 1.05x power.",
	},
	sharpbeak: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Flying') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Flying-type attacks have 1.1x power.",
	},
	silkscarf: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Normal-type attacks have 1.1x power.",
	},
	silverpowder: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Poison') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Poison-type attacks have 1.1x power.",
	},
	softsand: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ground') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Ground-type attacks have 1.1x power.",
	},
	spelltag: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Ghost') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Ghost-type attacks have 1.1x power.",
	},
	steelgem: {
		inherit: true,
		isNonstandard: "Future",
	},
	twistedspoon: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Psychic') {
				return this.chainModify([4505, 4096]);
			}
		},
		shortDesc: "Holder's Psychic-type attacks have 1.1x power.",
	},
	watergem: {
		inherit: true,
		isNonstandard: "Future",
	},
	wikiberry: {
		inherit: true,
		onUpdate() {},
		onResidualOrder: 10,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
			if (pokemon.getNature().minus === 'spa') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/8 max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use.",
	},
};
