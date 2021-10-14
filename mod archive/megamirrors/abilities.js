'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
"savagery": {
		desc: "This Pokemon's Sp. Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
		shortDesc: "This Pokemon's Sp. Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: 1}, source);
			}
		},
		id: "savagery",
		name: "savagery",
		rating: 3.5,
		num: 153,
	},
};

