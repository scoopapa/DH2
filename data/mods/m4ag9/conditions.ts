export const Conditions: {[k: string]: ConditionData} = {
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
