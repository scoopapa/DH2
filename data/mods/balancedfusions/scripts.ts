export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen8',
	field: {
		suppressingWeather() {
			for (const side of this.battle.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.ignoringAbility() && (pokemon.getAbility().suppressWeather || pokemon.m.innate === 'cloudnine' || pokemon.m.innate === 'airlock')) {
						return true;
					}
				}
			}
			return false;
		},
	},
	pokemon: {
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(this.hasAbility, this);
			return this.ability === ability || !!this.volatiles['ability:' + ability];
		},
		transformInto(pokemon, effect) {
			const template = pokemon.species;
			if (pokemon.fainted || pokemon.illusion || (pokemon.volatiles['substitute'] && this.battle.gen >= 5)) {
				return false;
			}
			if ((pokemon.transformed && this.battle.gen >= 2) || (this.transformed && this.battle.gen >= 5)) {
				return false;
			}
			if (!this.setSpecies(template)) {
				return false;
			}
			this.transformed = true;

			const types = pokemon.getTypes(true);
			this.setType(pokemon.volatiles.roost ? pokemon.volatiles.roost.typeWas : types, true);
			this.addedType = pokemon.addedType;
			this.knownType = this.side === pokemon.side && pokemon.knownType;
			this.apparentType = pokemon.apparentType;

			let statName: StatNameExceptHP;
			for (statName in this.storedStats) {
				this.storedStats[statName] = pokemon.storedStats[statName];
			}
			this.moveSlots = [];
			this.set.ivs = (this.battle.gen >= 5 ? this.set.ivs : pokemon.set.ivs);
			this.hpType = (this.battle.gen >= 5 ? this.hpType : pokemon.hpType);
			this.hpPower = (this.battle.gen >= 5 ? this.hpPower : pokemon.hpPower);
			for (const moveSlot of pokemon.moveSlots) {
				let moveName = moveSlot.move;
				if (moveSlot.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				}
				this.moveSlots.push({
					move: moveName,
					id: moveSlot.id,
					pp: moveSlot.maxpp === 1 ? 1 : 5,
					maxpp: this.battle.gen >= 5 ? (moveSlot.maxpp === 1 ? 1 : 5) : moveSlot.maxpp,
					target: moveSlot.target,
					disabled: false,
					used: false,
					virtual: true,
				});
			}
			let j: BoostName;
			for (j in pokemon.boosts) {
				this.boosts[j] = pokemon.boosts[j];
			}
			if (this.battle.gen >= 6 && pokemon.volatiles['focusenergy']) this.addVolatile('focusenergy');
			if (effect) {
				this.battle.add('-transform', this, pokemon, '[from] ' + effect.fullname);
			} else {
				this.battle.add('-transform', this, pokemon);
			}
			this.setAbility(pokemon.ability, this, true);
			this.removeVolatile('ability:' + this.m.innate, this);
			this.addVolatile('ability:' + pokemon.m.innate, this);
			return true;
		},
	},
};
