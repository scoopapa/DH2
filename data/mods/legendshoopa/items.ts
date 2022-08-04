export const Items: {[itemid: string]: ModdedItemData} = {
	toxicorb: {
		inherit: true,
		onResidual(pokemon) {
			if(pokemon.status) {
				this.add('-curestatus', pokemon, pokemon.status, '[Silent]');
				pokemon.setStatus('');
			}
			pokemon.trySetStatus('tox', pokemon);
		}
	},

	flameorb: {
	inherit: true,
	onResidual(pokemon) {
		if(pokemon.status) {
			//this.add('-curestatus', pokemon, pokemon.status, '[Silent]');
			pokemon.setStatus('');
		}
		pokemon.trySetStatus('brn', pokemon);
	}
	},
};