'use strict';

const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe']);

/**@type {BattleScriptsData} */
const BattleScripts = {
	targetTypeChoices(targetType) {
		return CHOOSABLE_TARGETS.has(targetType);
	},
};

exports.BattleScripts = BattleScripts;
