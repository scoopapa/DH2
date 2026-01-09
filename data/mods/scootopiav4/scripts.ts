export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: "scootopia",
	teambuilderConfig: { excludeStandardTiers: true },
	init(){
		const scoot = this.dataCache
		if (!scoot.scootopia) scoot.scootopia = {};
		scoot.scootopia.weatherTerrain = ["raindance", "sandstorm", "snowscape", "sunnyday", 
										"psychicterrain", "electricterrain", "grassyterrain", "mistyterrain"];
		scoot.scootopia.getIconoblastMove = function(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (scoot.scootopia.weatherTerrain.includes(moveSlot.id)) {
					return moveSlot.id
				}
			}
		}
		
		// Kodokai
		this.modData("Learnsets", "kodokai").learnset.teleport = ["9L1"];
	}
};
