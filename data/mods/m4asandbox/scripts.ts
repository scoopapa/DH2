export const Scripts: ModdedBattleScriptsData = {
	inherit: 'm4av6',
	init() {
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
		newMoves("porygonz", ["partingshot", "revelationdance"]);
	},
};
