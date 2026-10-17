export const Abilities: {[k: string]: ModdedAbilityData} = {
	stormbringer: {
		onAfterMoveSecondarySelf(source, target, move) {
			if (move && target.getMoveHitData(move).typeMod >= 0) {
				this.field.setWeather('raindance');
			}
		},
		flags: {},
		name: "Stormbringer",
		shortDesc: "This Pokemon summons Rain Dance if it deals non-resisted damage.",
		rating: 2,
		num: -1,
	},
	crownofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Crown of Ruin');
		},
		onAnyModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('Crown of Ruin')) {
				this.debug('Crown of Ruin Spe drop');
				return this.chainModify(0.75);
			}

		},
		flags: {},
		name: "Crown of Ruin",
		shortDesc: "Active Pokemon without this Ability have their Speed multiplied by 0.75.",
		rating: 4.5,
		num: -2,
	},
	silky: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const stickyWebs = side.sideConditions['stickyweb'];
			if (move.category === 'Physical' && (!stickyWebs)) {
				this.add('-activate', target, 'ability: Silky');
				side.addSideCondition('stickyweb', target);
			}
		},
		flags: {},
		name: "Silky",
		shortDesc: "If this Pokemon is hit by a physical attack, Sticky Webs are set on the opposing side.",
		rating: 3.5,
		num: -3,
	},
};
