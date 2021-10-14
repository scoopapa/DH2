export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	conversionz: {
		shortDesc: "If the Pokémon changes its type, the result is permanent. Deletes STAB.",
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'porygonzmega') return;
			const type = this.dex.getSpecies(pokemon.species).types[0];
			if (pokemon.hasType(type) || !pokemon.setType(type)) return;
			this.add('-start', pokemon, 'typechange', type);
		},
		onSourceHit(target, source, move) {
			if (source.species.id !== 'porygonzmega') return;
			if (move.id === 'conversion' || move.id === 'conversion2') {
				this.add('-ability', source, 'Conversion-Z');
				const pokemon = this.dex.getSpecies(source.species);
				pokemon.types[0] = source.types[0];
			}
		},
		onModifyMove(move) {
			delete move.stab;
		},
		isPermanent: true,
		name: "Conversion-Z",
		rating: 5,
		num: -5000,
	},
	gamble: {
		shortDesc: "This Pokémon's Metronome hits five times.",
		onPrepareHit(source, target, move) {
			if (move.multihit) return;
			if (move.id === 'metronome') {
				move.multihit = 5;
			}
		},
		name: "Gamble",
		rating: 3,
		num: -5001,
	},
	secretweapon: {
		shortDesc: "When this Pokémon faints, it restores its teammates' HP, PP and status.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Secret Weapon');
			this.add('-message', `When ${pokemon.name} faints, it will restore the HP, PP and status of its entire team!`);
			this.hint("Pokémon that have already fainted won't be revived.");
		},
		onFaint(pokemon) {
			this.add('-ability', pokemon, 'Secret Weapon');
			this.add('-message', `${pokemon.name} restored the HP, PP and status of its entire team!`);
			for (const ally of pokemon.side.pokemon) {
				if (
					!ally.fainted && (
						ally.hp < ally.maxhp ||
						ally.status ||
						ally.moveSlots.some(moveSlot => moveSlot.pp < moveSlot.maxpp)
					)
				) {
					ally.heal(ally.maxhp);
					ally.setStatus('');
					for (const moveSlot of ally.moveSlots) {
						moveSlot.pp = moveSlot.maxpp;
					}
				}
			}
		},
		name: "Secret Weapon",
		rating: 5,
		num: -5002,
	},
	amalgam: {
		shortDesc: "Eats the Steel type, removing it from other Pokémon to restore HP by 1/3.",
		desc: "This Pokémon eats the Steel type! At every possible opportunity, it removes the Steel type from adjacent Pokémon. Each time it does so, its own HP is restored by 1/3.",
		onUpdate(pokemon) {
			for (const target of this.getAllActive()) {
				if (!target || target === pokemon) continue;
				if (target.hasType('Steel') && this.isAdjacent(target, this.effectData.target)) {
					target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
					this.add('-start', target, 'typechange', target.types.join('/'), '[from] ability: Amalgam', '[of] ' + pokemon);
					pokemon.heal(pokemon.baseMaxhp / 3);
					this.add('-heal', pokemon, pokemon.getHealth, '[silent]'); // not displaying the healing correctly
				}
			}
		},
		name: "Amalgam",
		rating: 4,
		num: -5003,
	},
	flowergift: { // removed species dependence for sandbox
		desc: "If this Pokémon is a Cherrim and Sunny Day is active, it changes to Sunshine Form and the Attack and Special Defense of it and its allies are multiplied by 1.5. If this Pokémon is a Mega Meganium and Sunny Day is active, the Attack and Special Defense of it and its allies are multiplied by 1.5. If this Pokémon is a Cherrim or a Mega Meganium and it is holding Utility Umbrella, it remains in its regular form and the Attack and Special Defense stats of it and its allies are not boosted. If this Pokémon is a Cherrim in its Sunshine form and is given Utility Umbrella, it will immediately switch back to its regular form. If this Pokémon is a Cherrim holding Utility Umbrella and its item is removed while Sunny Day is active, it will transform into its Sunshine Form. If an ally is holding Utility Umbrella while Cherrim is in its Sunshine Form or Meganium is Mega Evolved, they will not receive the Attack and Special Defense boosts.",
		shortDesc: "If user is Cherrim or Mega Meganium and Sunny Day is active: 1.5x ally team Atk and Sp. Def.",
		onStart(pokemon) {
			delete this.effectData.forme;
		},
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Flower Gift",
		rating: 1,
		num: 122,
	},
};
