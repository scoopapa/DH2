export const Scripts: ModdedBattleScriptsData = {
	/*
	init() {
		Object.values(this.data.Abilities).forEach(ability => {
			if (ability.id === 'trace') return;
			let id = 'ability' + ability.id;
			this.data.Statuses[id] = Object.assign({}, ability);
			this.data.Statuses[id].id = id;
			this.data.Statuses[id].noCopy = true;
			this.data.Statuses[id].effectType = "Ability";
			this.data.Statuses[id].fullname = 'ability: ' + ability.name;
		});
	},
	*/
	field: {
		suppressingWeather() {
			for (const side of this.battle.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.ignoringAbility() && pokemon.hasAbility('Cloud Nine')) {
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
			ability = this.battle.toID(ability);
			return this.ability === ability || !!this.volatiles['ability:' + ability];
		},
		transformInto(pokemon, effect = null) {
			const template = pokemon.species;
			if (pokemon.fainted || pokemon.illusion || (pokemon.volatiles['substitute'] && this.battle.gen >= 5)) {
				return false;
			}
			if (!template.abilities || (pokemon?.transformed && this.battle.gen >= 2) || (this.transformed && this.battle.gen >= 5)) {
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
			for (const moveData of pokemon.moveSlots) {
				let moveName = moveData.move;
				if (moveData.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				}
				this.moveSlots.push({
					move: moveName,
					id: moveData.id,
					pp: moveData.maxpp === 1 ? 1 : 5,
					maxpp: this.battle.gen >= 5 ? (moveData.maxpp === 1 ? 1 : 5) : moveData.maxpp,
					target: moveData.target,
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
			(this.m.innates as string[]).forEach(innate => this.removeVolatile('ability:' + innate, this));
			(pokemon.m.innates as string[]).forEach(innate => this.addVolatile('ability:' + innate, this));
			return true;
		},
	},
};
