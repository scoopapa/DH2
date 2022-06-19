
export const Items: {[k: string]: ModdedItemData} = {
	moltenrock: {
		name: "Molten Rock",
		fling: {
			basePower: 60,
		},
		spritenum: 1001,
		onSourceHit(target, source, move) {
			if (move.type !== "Rock" && move.type !== "Ground") return;
			const brnChance = true;
			if (!source.hasAbility("Sheer Force")) {
				if (move.secondaries) {
					for (const sec of move.secondaries) {
						if (sec.status && sec.status === 'brn') brnChance = false;
					}
				} else if (move.secondary && move.secondary.status && move.secondary.status === 'brn') {
					brnChance = false;
				}
			}
			if (brnChance) {
				const r = this.random(100);
				if (r < 20) {
					target.trySetStatus('brn');
				}
			}
		},
		itemUser: ["Camerupt"],
		num: 10001,
		gen: 8,
    desc: "If held by a Camerupt, Rock and Ground moves have a 20% chance to burn. Doesn't effect moves that already have a burn chance.",
	},
};

