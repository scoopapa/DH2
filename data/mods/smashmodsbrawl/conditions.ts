export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	bigbutton: {
		inherit: true,
		duration: null,
		onStart(pokemon) {
			const ironFist = ['zapdos', 'bigcrammer'].includes(pokemon.species.name);
			if (!target || target.volatiles['bigbutton']) return;
			if (!pokemon.big) pokemon.big = true;
			this.add('-start', pokemon, 'Dynamax', '[silent]');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (['grassknot', 'lowkick'].includes(move.id)) {
				return 120;
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (!target || target.volatiles['bigbutton']) return;
			const boostedMoves = [
				'aerialace', 'aquatail', 'crabhammer', 'forcepalm', 'furyattack', 'gigaimpact', 'heatcrash', 'heavyslam', 'highhorsepower', 'irontail', 'lethalhug', 'meteormash', 'nuzzle', 'peck', 'playrough', 'slam', 'strugglebug', 'visegrip'
			];
			const minimizeMoves = [
				'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'supercellslam',
			];
			if (boostedMoves.includes(move.id) || minimizeMoves.includes(move.id)) {
				move.accuracy = true;
				if (['heatcrash', 'heavyslam'].includes(move.id)) return 120;
				if (move.basePower < 60) return this.chainModify(2);
				if (minimizeMoves.includes(move.id)) return this.chainModify(1.5);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (!target || target.volatiles['bigbutton']) return;
			const boostedMoves = [
				'aerialace', 'aquatail', 'crabhammer', 'forcepalm', 'furyattack', 'gigaimpact', 'heatcrash', 'heavyslam', 'highhorsepower', 'irontail', 'lethalhug', 'meteormash', 'nuzzle', 'peck', 'playrough', 'slam', 'strugglebug', 'visegrip'
			];
			const minimizeMoves = [
				'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'supercellslam',
			];
			if (boostedMoves.includes(move.id) || minimizeMoves.includes(move.id)) move.accuracy = true;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax', '[silent]');
		}
	},
};
