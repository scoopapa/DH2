export const Formats: {[k: string]: FormatData} = {
	megadatamod: {
		effectType: 'Rule',
		name: 'Mega Data Mod',
		desc: 'Gives data on stats, Ability and types when a Pokémon Mega Evolves or undergoes Ultra Burst.',
		onBegin() {
			this.add(`raw|<img src="https://www.smogon.com/forums/attachments/banner_2-png.302358/" height="65" width="381">`);
			this.add('-message', `Welcome to Mix and M4A!`);
			this.add('-message', `This is an Ubers-based format where the Mega Stones from Megas for All can be given to any Pokémon.`);
			this.add('-message', `You can Mega Evolve every Pokémon on your team! However, some Pokémon (mostly Ubers) are not allowed to Mega Evolve.`);
			this.add('-message', `You can find our thread and metagame resources here:`);
			this.add('-message', `https://www.smogon.com/forums/threads/3671140/`);
			for (const pokemon of this.getAllPokemon()) {
				(pokemon as any).lostItemForDelibird = pokemon.item;
			}
		},
		onChangeSet(set) {
			const item = this.toID(set.item);
			const silvally = [
				'Silvally', 'Silvally-Fighting', 'Silvally-Flying', 'Silvally-Poison', 'Silvally-Ground', 'Silvally-Rock', 'Silvally-Bug', 'Silvally-Ghost', 'Silvally-Steel',
				'Silvally-Fire', 'Silvally-Water', 'Silvally-Grass', 'Silvally-Electric', 'Silvally-Psychic', 'Silvally-Ice', 'Silvally-Dragon', 'Silvally-Dark', 'Silvally-Fairy',
			];
			if (silvally.includes(set.species)) {
				if (item === 'rksmegamemory') {
					if (set.hpType) {
						set.species = 'Silvally-' + set.hpType;
					} else {
						set.species = 'Silvally-Dark';
					}
				}
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.illusion) {
				if (pokemon.illusion.species.isMega || pokemon.illusion.species.forme.startsWith('Ultra')) {
					this.add('-start', pokemon, 'typechange', pokemon.illusion.getTypes(true).join('/'), '[silent]');
				}
			} else {
				if (pokemon.species.isMega || pokemon.species.forme.startsWith('Ultra')) {
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				}
			}
		},
	},
};
