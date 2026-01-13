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
		// Sturgard
		this.modData("Learnsets", "sturgard").learnset.dragontail = ["9L1"];
		// Dracoil
		this.modData("Learnsets", "dracoil").learnset.scaleshot = ["9L1"];
		this.modData("Learnsets", "dracoil").learnset.supercellslam = ["9L1"];
		this.modData("Learnsets", "dracoil").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "dracoil").learnset.temperflare = ["9L1"];
		this.modData("Learnsets", "dracoil").learnset.poisonfang = ["9L1"];
		this.modData("Learnsets", "dracoil").learnset.wrap = ["9L1"];
	}
};
