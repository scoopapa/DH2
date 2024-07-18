export const Items: {[k: string]: ModdedItemData} = {
acidicseed: {
		name: "Acidic Seed",
		spritenum: 666,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('acidicterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('acidicterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: -1001,
		desc: "If the terrain is Acidic Terrain, raises holder's Sp. Def by 1 stage. Single use.",
	},
	// end

	// start
	ancientarmor: {
		name: "Ancient Armor",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Ancient Armor neutralize');
				return this.chainModify(0.75);
			},
		num: -1002,
		desc: "User receives 25% less damage from a super effective move.",
	},
};
