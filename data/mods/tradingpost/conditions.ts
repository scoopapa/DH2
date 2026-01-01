export const Conditions: {[id: string]: ModdedConditionData} = {
	deoxys: {
		name: 'deoxys',
		duration: 1,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Deoxys');
		},
		onModifyAtk(atk, pokemon) {
			return Math.trunc(Math.trunc(2 * 150 + pokemon.set.ivs['atk'] + Math.trunc(pokemon.set.evs['atk'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onModifySpA(spa, pokemon) {
			return Math.trunc(Math.trunc(2 * 150 + pokemon.set.ivs['spa'] + Math.trunc(pokemon.set.evs['spa'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onModifySpe(spe, pokemon) {
			return Math.trunc(Math.trunc(2 * 150 + pokemon.set.ivs['spe'] + Math.trunc(pokemon.set.evs['spe'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onEnd(target) {
			this.add('-end', target, 'Deoxys');
		},
	},
	deoxysatk: {
		name: 'deoxysatk',
		duration: 1,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Deoxys-Attack');
		},
		onModifyAtk(atk, pokemon) {
			return Math.trunc(Math.trunc(2 * 180 + pokemon.set.ivs['atk'] + Math.trunc(pokemon.set.evs['atk'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onModifySpA(spa, pokemon) {
			return Math.trunc(Math.trunc(2 * 180 + pokemon.set.ivs['spa'] + Math.trunc(pokemon.set.evs['spa'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onEnd(target) {
			this.add('-end', target, 'Deoxys-Attack');
		},
	},
	deoxysdef: {
		name: 'deoxysdef',
		duration: 1,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Deoxys-Defense');
		},
		onModifyDef(def, pokemon) {
			return Math.trunc(Math.trunc(2 * 160 + pokemon.set.ivs['def'] + Math.trunc(pokemon.set.evs['def'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onModifySpD(spd, pokemon) {
			return Math.trunc(Math.trunc(2 * 160 + pokemon.set.ivs['spd'] + Math.trunc(pokemon.set.evs['spd'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onEnd(target) {
			this.add('-end', target, 'Deoxys-Defense');
		},
	},
	deoxysspe: {
		name: 'deoxysspe',
		duration: 1,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Deoxys-Speed');
		},
		onModifyDef(def, pokemon) {
			return Math.trunc(Math.trunc(2 * 160 + pokemon.set.ivs['def'] + Math.trunc(pokemon.set.evs['def'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onModifySpe(spe, pokemon) {
			return Math.trunc(Math.trunc(2 * 180 + pokemon.set.ivs['spe'] + Math.trunc(pokemon.set.evs['spe'] / 4)) * pokemon.set.level / 100 + 5);
		},
		onEnd(target) {
			this.add('-end', target, 'Deoxys-Speed');
		},
	},

	raindance: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('rainjacket')) {
				return 6;
			}
			return 5;
		},
	},
};
