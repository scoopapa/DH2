export const Scripts: ModdedBattleScriptsData = {
	init() {
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
		newMoves("exploud", ["overdrive", "partingshot", "sparklingaria", "bugbuzz", "knockoff", "flashcannon", "eeriespell", "clangingscales", "grasswhistle"]);
	},
		this.modData("Learnsets", "taaban").learnset.jawlock = ["8L1"];
		this.modData("Learnsets", "taaban").learnset.crunch = ["8L1"];
		this.modData("Learnsets", "taaban").learnset.bite = ["8L1"];
		this.modData("Learnsets", "taaban").learnset.assurance = ["8L1"];
		this.modData("Learnsets", "taaban").learnset.gigadrain = ["8L1"];
		this.modData("Learnsets", "taaban").learnset.absorb = ["8L1"];
		this.modData("Learnsets", "taaban").learnset.megadrain = ["8L1"];
		this.modData("Learnsets", "taaban").learnset.noretreat = ["8L1"];
	},	
};
