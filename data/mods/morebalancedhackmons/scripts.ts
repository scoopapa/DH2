export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	actions: {
		// for rage fist
		runSwitch(pokemon: Pokemon) {
			this.battle.runEvent('Swap', pokemon);

			if (this.battle.gen >= 5) {
				this.battle.runEvent('SwitchIn', pokemon);
			}

			this.battle.runEvent('EntryHazard', pokemon);

			if (this.battle.gen <= 4) {
				this.battle.runEvent('SwitchIn', pokemon);
			}

			if (this.battle.gen <= 2) {
				// pokemon.lastMove is reset for all Pokemon on the field after a switch. This affects Mirror Move.
				for (const poke of this.battle.getAllActive()) poke.lastMove = null;
				if (!pokemon.side.faintedThisTurn && pokemon.draggedIn !== this.battle.turn) {
					this.battle.runEvent('AfterSwitchInSelf', pokemon);
				}
			}
			if (!pokemon.hp) return false;
			pokemon.isStarted = true;
			if (!pokemon.fainted) {
				this.battle.singleEvent('Start', pokemon.getAbility(), pokemon.abilityState, pokemon);
				this.battle.singleEvent('Start', pokemon.getItem(), pokemon.itemState, pokemon);
			}
			if (this.battle.gen === 4) {
				for (const foeActive of pokemon.foes()) {
					foeActive.removeVolatile('substitutebroken');
				}
			}
			pokemon.draggedIn = null;
			pokemon.timesAttacked = 0;
			return true;
		},
	},
	field: {
		// for utility umbrella
		suppressingWeather() {
			for (const side of this.battle.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.fainted && !pokemon.ignoringAbility() && pokemon.getAbility().suppressWeather) {
						return true;
					}
					if (pokemon && !pokemon.fainted && !pokemon.ignoringItem() &&
						pokemon.getItem().id === 'utilityumbrella') {
						return true;
					}
				}
			}
			return false;
		},
	},
	pokemon: {
		// for neutralizing gas
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;
			if (this.getAbility().isPermanent) return false;
			if (this.volatiles['gastroacid']) return true;

			if (this.hasItem('Ability Shield') || this.ability === ('neutralizinggas' as ID)) return false;
			if (this.volatiles['neutralizinggas']) return true;

			return false;
		},
		// for water bubble
		ignoringItem() {
			return !!(
				this.itemState.knockedOff || // Gen 3-4
				(this.battle.gen >= 5 && !this.isActive) ||
				(!this.getItem().ignoreKlutz && this.hasAbility('klutz')) ||
				this.volatiles['embargo'] || this.battle.field.pseudoWeather['magicroom'] ||
				this.volatiles['magician']
			);
		},
	},
};
