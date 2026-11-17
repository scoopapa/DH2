export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	multitype: {
		inherit: true,
		onType(types, pokemon) {
			if (pokemon.baseSpecies.id !== 'megaman' || pokemon.transformed) return types;
			return [pokemon.getItem().onPlate || 'Normal'];
		},
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (move.id === 'megabuster') this.effectState.protean = false;
			if (this.effectState.protean) return;
			if (
				move.hasBounced ||
				move.flags['futuremove'] ||
				move.sourceEffect === 'snatch' ||
				move.callsMove
			) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.protean = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onAfterMove(target, source, move) {
			if (source && move.id === 'megabuster') this.effectState.protean = false;
		},
		flags: {},
		name: "Protean",
		rating: 4,
		num: 168,
	},
};
