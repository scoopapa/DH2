"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } const Conditions = {
	sweetveilscreen: {
		name: "SweetVeilScreen",
		duration: 5,
		durationCallback(target, source, effect) {
			if (_optionalChain([source, 'optionalAccess', _ => _.hasItem, 'call', _2 => _2('lightclay')])) {
				return 8;
			}
			return 5;
		},
		onStart(side) {
			this.add('-sidestart', side, 'ability: Sweet Veil');
		},
		onEnd(side) {
			this.add('-sideend', side, 'ability: Sweet Veil');
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(side) {
			if (this.field.isTerrain('grassyterrain')) return;
			for (const ally of side.active) {
				this.heal(ally.maxhp / 16);
			}
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			for (const ally of pokemon.side.active) {
				this.heal(ally.maxhp / 16);
			}
		},
	},
}; exports.Conditions = Conditions;
