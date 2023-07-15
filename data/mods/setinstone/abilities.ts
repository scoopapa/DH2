export const Abilities: {[abilityid: string]: AbilityData} = {
	risingsun: {
        onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.category === 'Physical') this.boost({spa: 1}, source, source);
			if (move.category === 'Special') this.boost({atk: 1}, source, source);
        },
		name: "Rising Sun",
		shortDesc: "This Pokemon raises its Attack by 1 stage when using a special attack and vice versa.",
		num: -1,
	},
}