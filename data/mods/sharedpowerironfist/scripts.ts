export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ironfist',
	field: {
		suppressingWeather() {
			for (const pokemon of this.battle.getAllActive()) {
				const innates = Object.keys(pokemon.volatiles).filter(x => x.startsWith('ability:'));
				if (pokemon && !pokemon.ignoringAbility() &&
					(pokemon.getAbility().suppressWeather || innates.some(x => (
						this.battle.dex.abilities.get(x.replace('ability:', '')).suppressWeather
					)))) {
					return true;
				}
			}
			return false;
		},
	},
	pokemon: {
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
			const abilityid = this.battle.toID(ability);
			return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
		},
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let neutralizinggas = false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (
					(pokemon.ability === ('neutralizinggas' as ID) || pokemon.m.abils?.includes('ability:neutralizinggas')) &&
					!pokemon.volatiles['gastroacid'] && !pokemon.abilityState.ending
				) {
					neutralizinggas = true;
					break;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] ||
					(neutralizinggas && (this.ability !== ('neutralizinggas' as ID) ||
						this.m.abils?.includes('ability:neutralizinggas'))
					)) && !this.getAbility().flags['cantsuppress']
				)
			);
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball' || item === 'ironfist') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (
				(this.hasAbility('levitate') || 
				this.hasAbility('impalpable')) && 
				!this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
		effectiveWeather(message?: string | boolean) {
			const weather = this.battle.field.effectiveWeather();
			switch (weather) {
			case 'sunnyday':
			case 'raindance':
			case 'desolateland':
			case 'primordialsea':
				if (this.hasItem('utilityumbrella')) return '';
			}
			// TODO: check interactions of Mega Sol with Utility Umbrella and Desolate Land
			if (this.hasAbility('lemongasour') && weather !== 'acidrain') {
				if (message) this.battle.add('-activate', this, 'ability: Lemonga Sour');
				return 'acidrain' as ID;
			}
			return weather;
		},
		recalcStats(this: Pokemon) {
			const set = this.set;
			const nature = this.battle.dex.natures.get(set.nature);
			for (const statName of ['atk', 'def', 'spa', 'spd', 'spe'] as const) {
				let value = Math.trunc(Math.trunc(
					2 * this.baseSpecies.baseStats[statName] + set.ivs[statName] + Math.trunc(set.evs[statName] / 4)
				) * this.level / 100 + 5);
				if (nature.plus === statName) value = Math.trunc(value * 1.1);
				else if (nature.minus === statName) value = Math.trunc(value * 0.9);
				this.storedStats[statName] = value;
			}
		},
	},
};
