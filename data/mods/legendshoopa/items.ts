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

	weaknesspolicy: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod > 0) {
				target.useItem();
				target.addVolatile('primed');
			}
		}
	},
};