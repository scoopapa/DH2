export const Abilities: {[k: string]: ModdedAbilityData} = {
	miracleremedy: {
		name: "Miracle Remedy",
		shortDesc: "Heals the status of the ally switching in.",
		onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'miracleremedy');
		},
		condition: {
			onSwitchIn(target) {
				if (!target.fainted && target.status) {
					target.cureStatus();
					//const refresh = this.dex.getActiveMove('refresh');
					//this.actions.useMove(refresh, target);
					target.side.removeSlotCondition(target, 'miracleremedy');
				}
			},
		},
	},
	cowardly: {
		name: "Cowardly",
		shortDesc: "When stats are lowered, switches out.",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				target.switchFlag = true;
			}
		},
	},
	gravitationalpull: {
		name: "Gravitational Pull",
		shortDesc: "Sets Gravity on switch-in.",
		onStart(source) {
			this.add('-ability', source, 'Gravitational Pull');
			this.field.addPseudoWeather('gravity');
		},
	},
	hoarding: {
		name: "Hoarding",
		shortDesc: "Uses Stockpile at the end of the turn.",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.actions.useMove("Stockpile", pokemon);
		}
	},
};