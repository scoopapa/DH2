const longwhip: ConditionData = {
	// this is a slot condition
	onResidualOrder: 3,
	onResidual(target) {
		// unlike a future move, Long Whip activates each turn
		this.effectState.target = this.effectState.side.active[this.effectState.position];
		const data = this.effectState;
		const move = this.dex.moves.get(data.move);
		if (data.target.fainted || data.target === data.source) {
			this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
			return;
		}

		this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} took the ${move.name} attack!`);
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
		if (data.move.name === 'Triple Axel' || data.move.name === 'Triple Kick') {
			data.moveData.longWhipBoost = 3 - data.duration;
		}
		data.moveData.accuracy = true;
		data.moveData.isFutureMove = true;
		data.move.multihit = null;
		delete data.moveData.flags['contact'];
		delete data.moveData.flags['protect'];

		const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
		if (data.source.isActive) {
			this.add('-anim', data.source, hitMove, data.target);
		}
		this.actions.trySpreadMoveHit([data.target], data.source, hitMove);
	},
	onEnd(target) {
		// unlike a future move, Long Whip activates each turn
		this.effectState.target = this.effectState.side.active[this.effectState.position];
		const data = this.effectState;
		const move = this.dex.moves.get(data.move);
		if (data.target.fainted || data.target === data.source) {
			this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
			return;
		}

		this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} took the ${move.name} attack!`);
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
		if (data.move.name === 'Triple Axel' || data.move.name === 'Triple Kick') {
			data.moveData.longWhipBoost = 3 - data.duration;
		}
		data.moveData.accuracy = true;
		data.moveData.isFutureMove = true;
		data.move.multihit = null;
		delete data.moveData.flags['contact'];
		delete data.moveData.flags['protect'];

		const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
		if (data.source.isActive) {
			this.add('-anim', data.source, hitMove, data.target);
		}
		this.actions.trySpreadMoveHit([data.target], data.source, hitMove);
	},
};
export const Conditions: { [k: string]: ConditionData } = {
	psn: {
		name: 'psn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				if (sourceEffect.name === 'Acid Rock') {
					this.effectState.type = 'acidrock';
				}
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.type === 'acidrock') {
				this.damage(pokemon.baseMaxhp / 16);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
	},
	acidicterrain: {
		name: 'Acidic Terrain',
		effectType: 'Terrain',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('terrainextender')) {
				return 8;
			}
			return 5;
		},
		onBasePowerPriority: 6,
		onBasePower(basePower, attacker, defender, move) {
			if (this.getAllActive().some(x => x.hasAbility('downtoearth'))) return;
			if (move.type === 'Poison' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
				this.debug('acidic terrain boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move, source, target) {
			if (this.getAllActive().some(x => x.hasAbility('downtoearth'))) return;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Poison') {
				if ((!target.isGrounded() || target.isSemiInvulnerable()) && !this.dex.getImmunity('Poison', target)) {
					this.add('-immune', target);
					this.hint(`Only targets that are affected by terrain lose their immunity to Poison.`);
					return null;
				}
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'move: Acidic Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				this.add('-message', "Poison-type moves used by grounded Pokémon will have their power increased.");
				this.add('-message', "Grounded Steel-type Pokémon will also lose their immunity to Poison-type moves.");
			} else {
				this.add('-fieldstart', 'move: Acidic Terrain');
			}
		},
		onFieldResidualOrder: 27,
		onFieldResidualSubOrder: 7,
		onFieldEnd() {
			this.add('-fieldend', 'move: Acidic Terrain');
		},
 	},
	desertgales: {
		name: 'Desert Gales',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-ability', source, 'Desert Gales');
				this.add('-weather', 'Desert Gales', '[silent]');
				this.add('-message', `Desert gales kicked up!`);
				this.add('-message', "Normal-type moves will become Ground-type.");
				this.add('-message', "Rock-, Ground- and Steel-type moves will also have their power increased.");
				this.add('-message', "Other weather-related moves and Abilities will behave as they do in sandstorm.");
			} else {
				this.add('-weather', 'Desert Gales', '[silent]');
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !move.isZ && move.category !== 'Status') {
				move.type = 'Ground';
				this.add('-message', `${move.name} became ${move.type}-type in the desert gales!`);
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
				this.debug('Desert Gales boost');
				this.add('-message', `${move.name} was powered up by the desert gales!`);
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onResidual() {
			this.add('-weather', 'Desert Gales', '[upkeep]');
			this.add('-message', `The desert gales are raging!`);
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', `The desert gales subsided!`);
		},
	},
	diamonddust: {
		name: 'Diamond Dust',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-ability', source, 'Diamond Dust');
				this.add('-weather', 'Diamond Dust', '[silent]');
				this.add('-message', `A cloud of diamond dust blew in!`);
				this.add('-message', "All Rock-type damage, including Stealth Rock, will be nullified.");
				this.add('-message', "Other weather-related moves and Abilities will behave as they do in hail.");
			} else {
				this.add('-weather', 'Diamond Dust', '[silent]');
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				this.add('-message', `${target.name} was protected from Stealth Rock by the diamond dust!`);
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock') {
				this.add('-message', `${target.name} was protected from ${move.name} by the diamond dust!`);
				this.add('-immune', target);
				return null;
			}
		},
		onResidual() {
			this.add('-weather', 'Diamond Dust', '[upkeep]');
			this.add('-message', `The air is sparkling with diamond dust!`);
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', `The cloud of diamond dust blew away!`);
		},
	},
	settle1: {
		name: 'settle1',
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (this.effectState.duration !== 3) return;
			let num = 0;
			for (const moveSlot of this.effectState.target.moveSlots) {
				num++;
				if (num === 1) {
					const move = this.dex.moves.get(moveSlot.move);
					this.add('-message', `${pokemon.name} needs to settle down after using ${move.name}!`);
				}
			}
		},
		onEnd(pokemon) {
			let num = 0;
			for (const moveSlot of this.effectState.target.moveSlots) {
				num++;
				if (num === 1) {
					const move = this.dex.moves.get(moveSlot.move);
					this.add('-message', `${pokemon.name} settled down from using ${move.name}!`);
				}
			}
		},
	},
	settle2: {
		name: 'settle2',
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (this.effectState.duration !== 3) return;
			let num = 0;
			for (const moveSlot of this.effectState.target.moveSlots) {
				num++;
				if (num === 2) {
					const move = this.dex.moves.get(moveSlot.move);
					this.add('-message', `${pokemon.name} needs to settle down after using ${move.name}!`);
				}
			}
		},
		onEnd(pokemon) {
			let num = 0;
			for (const moveSlot of this.effectState.target.moveSlots) {
				num++;
				if (num === 2) {
					const move = this.dex.moves.get(moveSlot.move);
					this.add('-message', `${pokemon.name} settled down from using ${move.name}!`);
				}
			}
		},
	},
	settle3: {
		name: 'settle3',
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (this.effectState.duration !== 3) return;
			let num = 0;
			for (const moveSlot of this.effectState.target.moveSlots) {
				num++;
				if (num === 3) {
					const move = this.dex.moves.get(moveSlot.move);
					this.add('-message', `${pokemon.name} needs to settle down after using ${move.name}!`);
				}
			}
		},
		onEnd(pokemon) {
			let num = 0;
			for (const moveSlot of this.effectState.target.moveSlots) {
				num++;
				if (num === 3) {
					const move = this.dex.moves.get(moveSlot.move);
					this.add('-message', `${pokemon.name} settled down from using ${move.name}!`);
				}
			}
		},
	},
	settle4: {
		name: 'settle4',
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (this.effectState.duration !== 3) return;
			let num = 0;
			for (const moveSlot of this.effectState.target.moveSlots) {
				num++;
				if (num === 4) {
					const move = this.dex.moves.get(moveSlot.move);
					this.add('-message', `${pokemon.name} needs to settle down after using ${move.name}!`);
				}
			}
		},
		onEnd(pokemon) {
			let num = 0;
			for (const moveSlot of this.effectState.target.moveSlots) {
				num++;
				if (num === 4) {
					const move = this.dex.moves.get(moveSlot.move);
					this.add('-message', `${pokemon.name} settled down from using ${move.name}!`);
				}
			}
		},
	},
	longwhip1: longwhip,
	longwhip2: longwhip,
	longwhip3: longwhip,
	longwhip4: longwhip,
	longwhip5: longwhip,
	congestionstatus: {
			// When the slot condition is applied
			onStart(target) {
				this.effectState.congestionQueue = [] as {
					move: Move,
					sourceSlot: number,
					side: Side,
				}[];
			},

			// Intercept and delay all status moves
			onBeforeMove(pokemon, target, move) {
				if (move.category !== 'Status') return;

				const slot = pokemon.position;
				const side = pokemon.side;
				const slotCon = side.slotConditions[slot];

				if (!slotCon.congestionQueue) {
					slotCon.congestionQueue = [];
				}

				slotCon.congestionQueue.push({
					move: this.dex.moves.get(move.id),
					sourceSlot: slot,
					side,
				});

				// Reduce PP immediately
				const moveSlot = pokemon.moveSlots.find(m => m.id === move.id);
				if (moveSlot) moveSlot.pp = Math.max(0, moveSlot.pp - 1);

				this.add('-message', `${pokemon.name}'s ${move.name} was delayed due to Congestion!`);
				return false;
			},

			// Check whether to resolve delayed moves
			onUpdate(pokemon) {
				// If any Congestion user remains on the field, wait
				const congestionStillActive = this.getAllActive().some(p =>
					p.getAbility().id === 'congestion' && !p.fainted
				);
				if (congestionStillActive) return;

				const slot = pokemon.position;
				const side = pokemon.side;
				const slotCon = side.slotConditions[slot];

				if (!slotCon?.congestionQueue?.length) return;

				this.add('-message', `${pokemon.name}'s slot resolves delayed status moves!`);

				for (const { move, sourceSlot, side: moveSide } of slotCon.congestionQueue as {
					move: Move,
					sourceSlot: number,
					side: Side,
				}[]) {
					const source = moveSide.active[sourceSlot];
					if (!source || source.fainted) continue;

					const activeMove = this.dex.getActiveMove(move.id);
					const moveTargetType = activeMove.target ?? 'normal';

					const targets = this.getAllActive().filter(t => {
						if (!t || t.fainted) return false;

						switch (moveTargetType) {
							case 'self': return t === source;
							case 'adjacentAlly': return t !== source && t.side === source.side && source.isAdjacent(t);
							case 'adjacentAllyOrSelf': return t.side === source.side && source.isAdjacent(t);
							case 'allySide': return t === source;
							case 'foeSide': return t.side !== source.side;
							case 'allAdjacentFoes': return t.side !== source.side && source.isAdjacent(t);
							case 'allAdjacent': return source.isAdjacent(t);
							case 'allyTeam': return t.side === source.side;
							case 'all': return true;
							case 'normal': return t !== source && t.side !== source.side;
							default: return false;
						}
					});

					for (const target of targets) {
						if (activeMove.status) target.trySetStatus(activeMove.status, source, activeMove);
						if (activeMove.volatileStatus) target.addVolatile(activeMove.volatileStatus, source, activeMove);
						if (activeMove.boosts) this.boost(activeMove.boosts, target, source, activeMove);
						if (activeMove.heal) {
						// Extract numerator and denominator for healing fraction (e.g., Recover heals 50% of max HP)
							const [numerator, denominator] = activeMove.heal;
							// Calculate the healing amount based on target's max HP
							const healAmount = Math.floor(target.maxhp * (numerator / denominator));
							// Apply the healing effect to the target
							this.heal(healAmount, target, source, activeMove);
						}
						if (typeof activeMove.onHit === 'function') {
							activeMove.onHit.call(this, target, source, activeMove);
						}

					}

					// Apply any side/field conditions
					if (activeMove.sideCondition) {
						source.side.addSideCondition(activeMove.sideCondition, source, activeMove);
					}
					if (activeMove.pseudoWeather) {
						this.field.addPseudoWeather(activeMove.pseudoWeather, source, activeMove);
					}
				}

				// Clean up after applying moves
				slotCon.congestionQueue = [];
				side.removeSlotCondition(pokemon, 'congestionstatus');
			},
		},
	endlessdream: {
		name: "Endless Dream",
		effectType: 'PseudoWeather',
		duration: 0,
		onFieldStart(field, source, effect) {
			this.add('-pseudoweather', 'EndlessDream', '[of] ' + source);
		},
		onSetStatus(status, target, source, effect) {
			if (target.hasAbility('vitalspirit') || target.hasAbility('insomnia')) return;
			if ((effect as Move)?.status || effect?.id === 'yawn') {
				this.add('-fail', target, '[from] Endless Dream');
			}
			return false;
		},
		onResidualOrder: 23,
		onEnd() {
			this.add('-fieldend', 'none');
		},
	},
};
