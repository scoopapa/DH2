export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["TMFE", "TMNFE", "TMLC"],
	},
	actions: {
	inherit: true,
		getActiveMaxMove(move: Move, pokemon: Pokemon) {
			if (typeof move === 'string') move = this.dex.getActiveMove(move);
			if (move.name === 'Struggle') return this.dex.getActiveMove(move);
			let maxMove = this.dex.getActiveMove(this.MAX_MOVES[move.category === 'Status' ? move.category : move.type]);
			if (move.category !== 'Status') {
				if (pokemon.gigantamax && pokemon.canGigantamax) {
					const gMaxMove = this.dex.getActiveMove(pokemon.canGigantamax);
					if (gMaxMove.exists && gMaxMove.type === move.type) maxMove = gMaxMove;
				}
				if (!move.maxMove?.basePower) throw new Error(`${move.name} doesn't have a maxMove basePower`);
				if (!['gmaxdrumsolo', 'gmaxfireball', 'gmaxhydrosnipe'].includes(maxMove.id)) {
					maxMove.basePower = move.maxMove.basePower;
				}
				maxMove.category = move.category;
			}
			let maxNewPower = this.newMaxPower(move); // new max power
			maxMove.basePower = maxNewPower; // bypass old max power
			maxMove.baseMove = move.id;
			// copy the priority for Psychic Terrain, Quick Guard
			maxMove.priority = move.priority;
			maxMove.isZOrMaxPowered = true;
			return maxMove;
		}
		newMaxPower(move){
			let oldMaxPowers = [100, 110, 120, 130, 140, 150];
			let oldweakMaxPowers = [70, 80, 85, 90, 95, 100];
			let weakMaxPowers = [60, 70, 75, 80, 85, 90];
			let maxPowers = [80, 90, 100, 110, 120, 130];
			let maxNewPower = 110;
			if (!move.basePower) {
				return maxNewPower;
			} else if (!move.maxMove?.basePower){
				return null;
			} else if (['Fighting', 'Poison'].includes(move.type)) {
				for (const i in oldweakMaxPowers){
					if (move.maxMove?.basePower === oldweakMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else if (['Flying'].includes(move.type)) {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = maxPowers[i]
						break
					}
				}
			}
			return maxNewPower;
		}
  },
	init() {
		this.modData("Learnsets", "darmanitangalar").learnset.terablast = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.iceshard = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.lavaplume = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.bugbuzz = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.skittersmack = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.quiverdance = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.ragepowder = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.leechlife = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.bugbite = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.strugglebug = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.morningsun = ["9L1"];
		delete this.modData('Learnsets', 'fluttermane').learnset.moonblast;
		delete this.modData('Learnsets', 'fluttermane').learnset.mysticalfire;
		delete this.modData('Learnsets', 'fluttermane').learnset.dazzlinggleam;
		delete this.modData('Learnsets', 'fluttermane').learnset.drainingkiss;
		delete this.modData('Learnsets', 'fluttermane').learnset.charm;
		delete this.modData('Learnsets', 'fluttermane').learnset.mistyterrain;
		this.modData("Learnsets", "palafin").learnset.superpower = ["9L1"];
		delete this.modData('Learnsets', 'palafin').learnset.bulkup;
		delete this.modData('Learnsets', 'palafin').learnset.closecombat;
		this.modData("Learnsets", "ironbundle").learnset.surf = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.defog = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.haze = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.fakeout = ["9L1"];
		delete this.modData('Learnsets', 'ironbundle').learnset.freezedry;
		delete this.modData('Learnsets', 'ironbundle').learnset.hydropump;
		this.modData("Learnsets", "dracovish").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "dracovish").learnset.terablast = ["9L1"];
		this.modData("Learnsets", "annihilape").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "annihilape").learnset.strengthsap = ["9L1"];
		delete this.modData('Learnsets', 'annihilape').learnset.bulkup;
		delete this.modData('Learnsets', 'primeape').learnset.bulkup;
		delete this.modData('Learnsets', 'mankey').learnset.bulkup;    
  },
};
