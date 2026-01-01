export const Abilities: { [abilityid: string]: ModdedAbilityData } = {

    // abilities modified to interact with Eternal Krokorok's Kleptomania
    magician: {
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target || source.switchFlag === true) return;
			if (target !== source && move.category !== 'Status') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Magician', '[of] ' + target);
                if (source.timesStolen) source.timesStolen++; // added for Kleptomania
                else source.timesStolen = 1;
			}
		},
		flags: {},
		name: "Magician",
		rating: 1,
		num: 170,
	},
    pickpocket: {
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && move?.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				if (!target.setItem(yourItem)) {
					source.item = yourItem.id;
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Pickpocket', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Pickpocket', '[of] ' + source);
                if (source.timesStolen) source.timesStolen++; // added for Kleptomania
                else source.timesStolen = 1;
			}
		},
		flags: {},
		name: "Pickpocket",
		rating: 1,
		num: 124,
	},
};
