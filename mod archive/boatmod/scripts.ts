export const Scripts: ModdedBattleScriptsData = {
	init() {
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
		newMoves("pidgeot", ["focusblast", "hypervoice"]);
		newMoves("drapion", ["gunkshot", "uturn", "firstimpression"]);
		newMoves("flygon", ["calmmind", "powergem"]);
		newMoves("dodrio", ["tripleaxel", "uturn", "blazekick", "wildcharge"]);
	},
};