export const Items: {[itemid: string]: ModdedItemData} = {
  bigroot: {
    inherit: true,
    onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([1.5]);
			}
		},
    shortDesc: "Holder gains 1.5x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap.",
  },
};
