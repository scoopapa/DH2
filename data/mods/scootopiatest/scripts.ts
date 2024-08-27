export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: "scootopia",
	teambuilderConfig: { excludeStandardTiers: true },
	init(){
		this.worldEffects = ["chaoticweather", "chaoticterrain", "cursedfield", "blessedfield", 
							"rainofmeteors", "rainofdew", "silentdomain", "stellaralignment"];
		this.worldEffect = {};
		this.worldEffect.getWorldEffect = function() {
			for (let e of this.worldEffects) {
				if (this.field.getPseudoWeather(e)) {
					return e;
				}
			}
			return false;
		}
		this.worldEffect.worldEffectStart = function(w) {
			for (let e of this.worldEffects) {
				if (this.field.getPseudoWeather(e) && e !== w) {
					this.field.removePseudoWeather(e);
				} else if ( !this.field.getPseudoWeather(e) && e === w ) {
					this.field.addPseudoWeather(w);
				}
			}
		}
	}
};
