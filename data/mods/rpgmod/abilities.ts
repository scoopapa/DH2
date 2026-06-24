export const Abilities: {[k: string]: ModdedAbilityData} = {
	ultimaweapon: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing'] && attacker.hp === attacker.maxhp) {
				this.debug('Sharpness boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Ultima Weapon",
		rating: 3.5,
		num: 1000,
		desc: "User's slicing moves have 1.5x power at if user is at max HP.",
	},
	psishield: {
		onDamagingHit(damage, target, source, effect) {
			this.boost({spd: 1});
		},
		flags: {},
		name: "Psi Shield",
		rating: 4,
		num: 1001,
		desc: "This pokemon's spd is raised by 1 stage after it is damaged by a move.",
	},
	beemerang: {
		onBeforeMove(pokemon, target, move){
			if (move.type !== 'Bug') return;
			if (!target) return; 
			this.add('-ability', pokemon, 'Beemerang')
			target.addVolatile('smackdown');
		},
		flags: {},
		name: "Beemerang",
		rating: 4,
		num: 1002,
		desc: "This pokemon's Bug type moves ground the opponent.",
	},
	hydrologist: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.15);
			}
		},
		flags: {},
		name: "Hydrologist",
		rating: 3,
		num: 1003,
		desc: "This pokemon's water type moves have 1.15x power.",
	},
	righteousheart: {
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.activeMoveActions === 1) {
				this.add('-ability', pokemon, 'Righteous Heart');
				this.chainModify([4506, 4096]);
			} else if (pokemon.activeMoveActions === 2) {
					this.add('-ability', pokemon, 'Righteous Heart');
					this.chainModify([4916, 4096]);
				} else if (pokemon.activeMoveActions === 3) {
					this.add('-ability', pokemon, 'Righteous Heart');
					this.chainModify([5325, 4096]);
					} else if (pokemon.activeMoveActions === 4) {
						this.add('-ability', pokemon, 'Righteous Heart');
						this.chainModify([5735, 4096]);
					} else if (pokemon.activeMoveActions >= 5) {
						this.add('-ability', pokemon, 'Righteous Heart');
						this.chainModify([6144, 4096]);
					}
		},
		name: "Righteous Heart",
		shortDesc: "Damage increases by 10% eveytime this pokemon attacks and completes a turn. Max 1.5x",
		rating: 4,
		num: 1004,
	},
	incidentalattack: {
		onAfterMove(target, source, move) {
			if (move.category !== 'Status') return;
			if (!move || !target || !target.hp) return;
			const moves = [];
			for (const moveSlot of target.moveSlots) {
				const moveid = moveSlot.id;
				const move = this.dex.moves.get(moveid);
				if (moveid && move.category !== 'Status') {
					if (this.randomChance(1,2)) {
					moves.push(moveid);
					}
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) return false;
			this.actions.useMove(randomMove, this.effectState.target);
		},
		name: "Incidental Attack",
		rating: 4,
		num:1005,
		desc: "When using a status move, has a 50% chance to use a known move thats not status.",
	},
	solblade: {
		onStart(pokemon) {},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.id === 'megiddo') return this.chainModify(3);
		},
		onAfterMove(target, source, move) {
			if (!move || !target || !target.hp) return;
			if (target !== source && target.hp && move.category !== 'Status') {
				if (this.randomChance(35,100)) {
				this.actions.useMove('Megiddo', this.effectState.target); 
				}
			}
		},
		shortDesc: "35% Chance to unleash a Meggido at 3x power after an Attack. ",
		name: "Sol Blade",
		rating: 4,
		num:1006
	},
	floramancy: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			let activated = false;
			for (const sideCondition of ['floraconda']) {
				for (const side of [pokemon.side, ...pokemon.side.foeSidesWithConditions()]) {
					if (side.getSideCondition(sideCondition)) {
						if (!activated) {
							this.add('-activate', pokemon, 'ability: Floramancy');
							this.heal(pokemon.baseMaxhp / 4);
							activated = true;
						}
					}
				}
			}
		},
		flags: {},
		name: "Floramancy",
		rating: 2,
		num: 1008,
		desc: "Heals 25% max HP when Floraconda is active.",
	},
};
