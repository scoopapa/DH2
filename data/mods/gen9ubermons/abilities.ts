export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	baddreams: {
		inherit: true,
		onResidual() {},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Bad Dreams');
		},
		onAnyTryHealPriority: 1,
		onAnyTryHeal(damage, target, source, effect) {
			if (target.hasType('Dark')) return;
			const healingEffects = ['drain', 'floralhealing', 'healpulse', 'junglehealing', 'lifedew', 'lunarblessing', 'moonlight', 'morningsun', 'purify', 'shoreup', 'strengthsap', 'swallow', 'synthesis', 'wish'];
			if (healingEffects.includes(effect.id)) {
				return this.chainModify(0.5);
			}
		},
		onAnyModifyMove(move, pokemon) {
			if (pokemon.hasType('Dark')) return;
			const healingMoves = ['healorder', 'milkdrink', 'recover', 'roost', 'slackoff', 'softboiled'];
			if (healingMoves.includes(move.id)) {
				move.heal = [1, 4];
			}
		},
		desc: "While a Pokemon with this ability is active, healing via recovery moves is halved as long as the Pokemon does not have Dark-type.",
		shortDesc: "While this ability is active, Pokemon without Dark-type heal 50% less with healing moves.",
	},
	supremeoverlord: {
		inherit: true,
		onModifyMove(move) {
			move.ignoreAccuracy = true;
			move.ignoreDefensive = true;
			move.ignoreEvasion = true;
			move.ignoreOffensive = true;
		},
		desc: "This Pokemon's moves have their power multiplied by 1+(X*0.1), where X is the total number of times any Pokemon has fainted on the user's side when this Ability became active, and X cannot be greater than 5. Stat changes from this Pokemon and its target are ignored.",
		shortDesc: "10% more power for each fainted ally, max 50%. Ignores all stat changes.",
	},
	embodyaspectcornerstone: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Ogerpon-Cornerstone-Tera') {
				this.add('-activate', pokemon, 'ability: Embody Aspect (Cornerstone)');
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			return this.chainModify([4915, 4096]);
		},
		onSwitchIn() {},
		shortDesc: "If this Pokemon is Ogerpon-Cornerstone and terastallized, its Def is multiplied by 1.2.",
	},
	embodyaspecthearthflame: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Ogerpon-Hearthflame-Tera') {
				this.add('-activate', pokemon, 'ability: Embody Aspect (Hearthflame)');
			}
		},
		onSwitchIn() {},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			return this.chainModify([4915, 4096]);
		},
		shortDesc: "If this Pokemon is Ogerpon-Hearthflame and terastallized, its Atk is multiplied by 1.2.",
	},
	embodyaspectteal: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Ogerpon-Teal-Tera') {
				this.add('-activate', pokemon, 'ability: Embody Aspect (Teal)');
			}
		},
		onSwitchIn() {},
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.5);
		},
		shortDesc: "If this Pokemon is Ogerpon and terastallized, its Spe is multiplied by 1.5.",
	},
	embodyaspectwellspring: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Ogerpon-Wellspring-Tera') {
				this.add('-activate', pokemon, 'ability: Embody Aspect (Wellspring)');
			}
		},
		onSwitchIn() {},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			return this.chainModify([4915, 4096]);
		},
		shortDesc: "If this Pokemon is Ogerpon-Wellspring and terastallized, its SpD is multiplied by 1.2.",
	},
};
