export const Scripts: ModdedBattleScriptsData = {
	init() {
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
		newMoves("exploud", ["overdrive", "partingshot", "sparklingaria", "bugbuzz", "knockoff", "flashcannon", "eeriespell", "clangingscales", "grasswhistle"]);
	},	
};
