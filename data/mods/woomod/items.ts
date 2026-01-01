export const Items: {[itemid: string]: ModdedItemData} = {
	belliboltkeychain: {
		name: "Bellibolt Keychain",
		shortDesc: "Tadbulb: contact moves lower the target's SpD by 1.",
		onSourceDamagingHit(damage, target, source, move) {
			if (!source.baseSpecies.name === 'Tadbulb') return;
			this.boost({spd: -1}, target, source, null, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.name === 'Tadbulb') return false;
			return true;
		},
		itemUser: ["Tadbulb"],
	},
	stormbringermask: {
		name: "Stormbringer Mask",
		shortDesc: "Farfetch'd: 1.2x power attacks; Ivy Cudgel is Electric type.",
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, source, target, move) {
			if (source.species.id === "farfetchd") {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.species.id === "farfetchd") return false;
			return true;
		},
		itemUser: ["Farfetch'd"],
	},
	hearthflamemask: {
		inherit: true,
		shortDesc: "Farfetch'd: 1.2x power attacks; Ivy Cudgel is Fire type.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.species.id === "farfetchd") {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.species.id === "farfetchd") return false;
			return true;
		},
		itemUser: ["Farfetch'd"],
	},
	wellspringmask: {
		inherit: true,
		shortDesc: "Farfetch'd: 1.2x power attacks; Ivy Cudgel is Water type.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.species.id === "farfetchd") {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.species.id === "farfetchd") return false;
			return true;
		},
		itemUser: ["Farfetch'd"],
	},
	cornerstonemask: {
		inherit: true,
		shortDesc: "Farfetch'd: 1.2x power attacks; Ivy Cudgel is Rock type.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.species.id === "farfetchd") {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.species.id === "farfetchd") return false;
			return true;
		},
		itemUser: ["Farfetch'd"],
	},
	leek: {
		inherit: true,
		onTakeItem(item, source) {
			if (source.species.id === "farfetchd") return false;
			return true;
		},
		itemUser: ["Farfetch'd"],
	},
}
