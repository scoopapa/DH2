'use strict';

exports.BattleScripts = {
	init: function() {
		Object.values(this.data.Movedex).forEach(move => {
			let bannedMoves = ['Assist', 'Baneful Bunker', 'Block', 'Copycat', 'Detect', 'Mat Block', 'Mean Look', 'Nature Power', 'Protect', 'Roar', 'Spider Web', 'Spiky Shield', 'Whirlwind'];
			if (move.category === 'Status' && !bannedMoves.includes(move.name) && !(move.status && move.status === 'slp')) {
				this.data.Abilities[move.id] = {
					desc: move.desc,
					shortDesc: move.shortDesc,
					id: move.id,
					name: move.name,
					onStart: function (pokemon) {
						this.add('-activate', pokemon, 'ability: ' + move.name);
						this.useMove(move.id, pokemon);
					},
				};
			}
		});
	},
}
