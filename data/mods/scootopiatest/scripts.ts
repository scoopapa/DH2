export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: "scootopia",
	teambuilderConfig: { excludeStandardTiers: true },
	init(){
		this.worldEffects = ["chaoticweather", "chaoticterrain", "cursedfield", "blessedfield", 
							"rainofmeteors", "rainofdew", "silentdomain", "stellaralignment"];
		this.getWorldEffect = function() {
			for (let e of this.worldEffects) {
				if (this.field.getPseudoWeather(e)) {
					return e;
				}
			}
		}				
	}
};
