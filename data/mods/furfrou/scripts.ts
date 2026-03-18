export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["FROU", "FROU Ubers", "FROU (NFE)"],
	},
	actions: {
	  switchIn(pokemon: Pokemon, pos: number, sourceEffect: Effect | null = null, isDrag?: boolean) {
		if (!pokemon || pokemon.isActive) {
			this.battle.hint("A switch failed because the Pokémon trying to switch in is already in.");
			return false;
		}

		const side = pokemon.side;
		if (pos >= side.active.length) {
			throw new Error(`Invalid switch position ${pos} / ${side.active.length}`);
		}
		const oldActive = side.active[pos];
		const unfaintedActive = oldActive?.hp ? oldActive : null;
		if (unfaintedActive) {
			oldActive.beingCalledBack = true;
			let switchCopyFlag: 'copyvolatile' | 'shedtail' | boolean = false;
			if (sourceEffect && typeof (sourceEffect as Move).selfSwitch === 'string') {
				switchCopyFlag = (sourceEffect as Move).selfSwitch!;
			}
			if (!oldActive.skipBeforeSwitchOutEventFlag && !isDrag) {
				this.battle.runEvent('BeforeSwitchOut', oldActive);
				if (this.battle.gen >= 5) {
					this.battle.eachEvent('Update');
				}
			}
			oldActive.skipBeforeSwitchOutEventFlag = false;
			if (!this.battle.runEvent('SwitchOut', oldActive)) {
				// Warning: DO NOT interrupt a switch-out if you just want to trap a pokemon.
				// To trap a pokemon and prevent it from switching out, (e.g. Mean Look, Magnet Pull)
				// use the 'trapped' flag instead.

				// Note: Nothing in the real games can interrupt a switch-out (except Pursuit KOing,
				// which is handled elsewhere); this is just for custom formats.
				return false;
			}
			if (!oldActive.hp) {
				// a pokemon fainted from Pursuit before it could switch
				return 'pursuitfaint';
			}

			// will definitely switch out at this point

			oldActive.illusion = null;
			this.battle.singleEvent('End', oldActive.getAbility(), oldActive.abilityState, oldActive);

			// if a pokemon is forced out by Whirlwind/etc or Eject Button/Pack, it can't use its chosen move
			this.battle.queue.cancelAction(oldActive);

			let newMove = null;
			if (this.battle.gen === 4 && sourceEffect) {
				newMove = oldActive.lastMove;
			}
			if (switchCopyFlag) {
				pokemon.copyVolatileFrom(oldActive, switchCopyFlag);
			}
			if (newMove) pokemon.lastMove = newMove;
			oldActive.clearVolatile();
		}
		if (oldActive) {
			oldActive.isActive = false;
			oldActive.isStarted = false;
			oldActive.usedItemThisTurn = false;
			oldActive.statsRaisedThisTurn = false;
			oldActive.statsLoweredThisTurn = false;
			oldActive.position = pokemon.position;
			pokemon.position = pos;
			side.pokemon[pokemon.position] = pokemon;
			side.pokemon[oldActive.position] = oldActive;
		}
		pokemon.isActive = true;
		side.active[pos] = pokemon;
		pokemon.activeTurns = 0;
		pokemon.activeMoveActions = 0;
		for (const moveSlot of pokemon.moveSlots) {
			moveSlot.used = false;
		}
		this.battle.runEvent('BeforeSwitchIn', pokemon);
		if (sourceEffect) {
			this.battle.add(isDrag ? 'drag' : 'switch', pokemon, pokemon.getDetails, '[from] ' + sourceEffect);
		} else {
			this.battle.add(isDrag ? 'drag' : 'switch', pokemon, pokemon.getDetails);
		}
		pokemon.abilityOrder = this.battle.abilityOrder++;
		if (isDrag && this.battle.gen === 2) pokemon.draggedIn = this.battle.turn;
		pokemon.previouslySwitchedIn++;
		
		pokemon.m.previousPartner = oldActive;
		if (isDrag && this.battle.gen >= 5) {
			// runSwitch happens immediately so that Mold Breaker can make hazards bypass Clear Body and Levitate
			this.battle.singleEvent('PreStart', pokemon.getAbility(), pokemon.abilityState, pokemon);
			this.runSwitch(pokemon);
		} else {
			this.battle.queue.insertChoice({choice: 'runUnnerve', pokemon});
			this.battle.queue.insertChoice({choice: 'runSwitch', pokemon});
		}

		return true;
		},
	},
	pokemon: {
		takeItem(source?: Pokemon) {
			if (!this.item || this.itemState.knockedOff) return false;
			if (!source) source = this;
			if (this.battle.gen === 4) {
				if (toID(this.ability) === 'multitype') return false;
				if (toID(source.ability) === 'multitype') return false;
			}
			const item = this.getItem();
			if (this.battle.runEvent('TakeItem', this, source, null, item)) {
				this.item = '';
				const oldItemState = this.itemState;
				this.itemState = {id: '', target: this};
				this.pendingStaleness = undefined;
				this.battle.singleEvent('End', item, oldItemState, this);
				this.battle.runEvent('AfterTakeItem', this, null, null, item);
				return item;
			}
			return false;
		}
	},
};
