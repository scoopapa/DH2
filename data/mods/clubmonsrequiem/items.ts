export const Items: {[k: string]: ModdedItemData} = {
	absorbbulb: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.boost({spa: 1}, target);
			}
		},
		boosts: {},
		shortDesc: "Raises Special Attack by 1 stage if hit by an Water-type attack.",
	},
	berryjuice: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		onUpdate() {},
		shortDesc: "User will heal 1/8 of its max HP whenever they fall under half HP.",
	},
	blukberry: {
		name: "Bluk Berry",
		spritenum: 44,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Fire",
		},
		onEat: false,
		num: 165,
		gen: 3,
		rating: 0,
	},
	watmelberry: {
		name: "Watmel Berry",
		spritenum: 530,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fire",
		},
		onEat: false,
		num: 181,
		gen: 3,
		rating: 0,
	},
	cellbattery: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric') {
				this.boost({atk: 1}, target);
			}
		},
		boosts: {},
		shortDesc: "Raises Attack by 1 stage if hit by an Electric-type attack.",
	},
	fuelcell: {
		name: "Fuel Cell",
		shortDesc: "User will gain an omniboost if they must recharge. Consumable.",
		spritenum: 272,
		fling: {
			basePower: 100,
		},
		onTry(source) {
			if (source.volatiles["mustrecharge"]) {	
				source.useItem();
			}
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		num: 282,
	},
	newtonsapple: {
		name: "Newton's Apple",
		shortDesc: "Extends Gravity by 3 turns.",
		spritenum: 711,
		fling: {
			basePower: 20,
		},
		num: 282,
	},
	magneticsoles: {
		name: "Magnetic Soles",
		spritenum: 715,
		fling: {
			basePower: 60,
		},
		shortDesc: "If Gravity is active, +1 Speed. Consumable.",
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.getPseudoWeather('gravity')) {
				pokemon.useItem();
			}
		},
		onAnyPseudoWeatherChange() {
			const pokemon = this.effectState.target;
			if (this.field.getPseudoWeather('gravity')) {
				pokemon.useItem(pokemon);
			}
		},
		boosts: {
			spe: 1,
		},
		num: 1122,
		gen: 8,
	},
	metronome: {
		name: "Metronome",
		spritenum: 289,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			pokemon.addVolatile('metronome');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('metronome')) {
					pokemon.removeVolatile('metronome');
					return;
				}
				if (this.effectState.lastMove === move.id) {
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
				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		num: 277,
		gen: 4,
	},
	snowball: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice') {
				this.boost({atk: 1}, target);
			}
		},
		boosts: {},
		shortDesc: "Raises Attack by 1 stage if hit by an Ice-type attack.",
	},
	throatspray: {
		inherit: true,
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (!this.effectState.switchingIn) return;
			if (move.flags['sound']) {
				this.boost({spa: 1});
			}
			this.effectState.switchingIn = false;
		},
		boosts: {},
		shortDesc: "Raises holder's Special Attack by 1 stage after it uses a sound move. Once per switch-in.",
	},
	trickortreatbag: {
		name: "Trick-or-Treat Bag",
		spritenum: 385,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (pokemon.hp === pokemon.maxhp) return;
			let activated = 0;
			this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name}: Boo!`);
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				let scaredThisGuy = false;
				for (const moveSlot of ((pokemon.illusion && pokemon.illusion.moveSlots) ? pokemon.illusion.moveSlots : pokemon.moveSlots)) {
					if (scaredThisGuy === true) continue;
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, target) && this.dex.getEffectiveness(moveType, target) > 0
					) {
						scaredThisGuy = true;
						continue;
					}
				}
				if (scaredThisGuy === true) {
					this.add('-message', `${target.illusion ? target.illusion.name : target.name}: Eeeek!`);
					activated++;
				}
			}
			this.add('-message', `...`);
			if (activated) {
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} got some candy!`);
				this.heal(pokemon.baseMaxhp * 0.25 * activated);
			} else {
				this.add('-message', `It wasn't that scary, so nothing happened.`);
			}
		},
		desc: "On entry, the holder scares the target to restore HP.",
		num: -7,
	},
	costarmask: {
		name: "Costar Mask",
		spritenum: 760,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Ogerpon-Costar')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Costar",
		itemUser: ["Ogerpon-Costar"],
		shortDesc: "If this Pokemon is Ogerpon-Costar, its attacks have 1.2x power.",
		num: 2408,
		gen: 9,
	},
};
