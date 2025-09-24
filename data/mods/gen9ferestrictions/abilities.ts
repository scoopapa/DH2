export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	rkstech: {
		shortDesc: "This Pokemon's moves that match its held Memory have 1.5x power.",
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const memoryType = this.runEvent('Memory', attacker, null, move);
			if (move.type === memoryType) {
				this.debug('RKS Tech boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "RKS Tech",
		rating: 3.5,
	},
	leafarmor: {
		shortDesc: "Leaf Guard + Battle Armor",
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Armor');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-immune', target, '[from] ability: Leaf Armor');
				return null;
			}
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Leaf Armor",
		rating: 0.5,
	},
	magmapurge: {
		shortDesc: "Flash Fire + Mold Breaker",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Magma Purge');
  		this.add('-message', `${pokemon.name} breaks the mold!`);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('magmapurge')) {
					this.add('-immune', target, '[from] ability: Magma Purge');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('magmapurge');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('magmapurge')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('magmapurge')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Magma Purge",
		rating: 3.5,
	},
	smokebomb: {
		shortDesc: "White Smoke + Pickpocket",
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && move?.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				if (!target.setItem(yourItem)) {
					source.item = yourItem.id;
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Smoke Bomb', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Smoke Bomb', '[of] ' + source);
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Smoke Bomb", "[of] " + target);
			}
		},
		flags: {breakable: 1},
		name: "Smoke Bomb",
		rating: 1,
	},
	aerialassassin: {
		shortDesc: "Moxie + Levitate",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		flags: {breakable: 1},
		name: "Aerial Assassin",
		rating: 3,
	},
};
