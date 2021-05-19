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
				}
			}
		},
		name: "Amalgam",
		rating: 4,
		num: -5003,
	},
};
