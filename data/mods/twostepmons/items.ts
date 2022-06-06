
export const Items: {[k: string]: ModdedItemData} = {
	moltenrock: {
		name: "Molten Rock",
		fling: {
			basePower: 60,
		},
		spritenum: 1001,
		onModifyMove(move) {
			if (move.type !== "Rock" && move.type !== "Ground") return;
			const brnChance = {chance: 20, status: 'brn'};
			if (!move.secondaries) move.secondaries = [];
			if (move.secondary) move.secondaries.push(move.secondary);
			move.secondary = null;
			move.secondaries.push(brnChance);
		},
		itemUser: ["Camerupt"],
		num: 10001,
		gen: 8,
    desc: "If held by a Camerupt, Rock and Ground moves have a 20% chance to burn.",
	},
};

