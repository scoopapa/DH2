export const Items: { [itemid: string]: ItemData } = {

	absorbbulb: {
		name: "Absorb Bulb",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.boost({spa: 1}, target);
			}
		},
		shortDesc: "Raises Special Attack by 1 stage if hit by an Water-type attack.",
		num: 545,
		gen: 5,
	},
	berryjuice: {
		name: "Berry Juice",
		spritenum: 22,
		fling: {
			basePower: 30,
		},
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		shortDesc: "User will heal 1/8 of its max HP whenever they fall under half HP.",
		num: 43,
		gen: 2,
		isNonstandard: "Past",
		rating: 3,
	},
	cellbattery: {
		name: "Cell Battery",
		spritenum: 60,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric') {
				this.boost({atk: 1}, target);
			}
		},
		shortDesc: "Raises Attack by 1 stage if hit by an Electric-type attack.",
		num: 546,
		gen: 5,
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
		name: "Snowball",
		spritenum: 606,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice') {
				this.boost({atk: 1}, target);
			}
		},
		shortDesc: "Raises Attack by 1 stage if hit by an Ice-type attack.",
		num: 649,
		gen: 6,
	},
	throatspray: {
		name: "Throat Spray",
		spritenum: 713,
		fling: {
			basePower: 30,
		},
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
		shortDesc: "Raises holder's Special Attack by 1 stage after it uses a sound move. Once per switch-in.",
		num: 1118,
		gen: 8,
	},
};
