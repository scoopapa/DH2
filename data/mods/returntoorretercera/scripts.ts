export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["TERCERA", "TERCERA NFE"],
   },
	pokemon: {
	   setStatus(
	      if (!ignoreImmunities && status.id &&
				!(source?.hasAbility('combustion') && ['brn'].includes(status.id))) {
			// the game currently never ignores immunities
		      if (!this.runStatusImmunity(status.id === 'brn' : status.id)) {
				   this.battle.debug('immune to status');
				   if ((sourceEffect as Move)?.status) {
					   this.battle.add('-immune', this);
			      }
				   return false;
				}
			}
		},
	},
};
