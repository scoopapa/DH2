export const Abilities: {[k: string]: ModdedAbilityData} = {
	berserk: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1});
			}
		},
		name: "Berserk",
		rating: 2,
		num: 201,
	},
	dimensionalstream: {
		desc: "On switch-in, the field becomes Trick Room. This room remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Trick Room begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.removePseudoWeather('trickroom');
			this.field.addPseudoWeather('trickroom');
		},
		onAnyTryMove(target, source, effect) {
			if (['trickroom'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Dimensional Stream', effect, '[of] ' + target);
				return false;
			}
		},
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('dimensionalstream')) {
					return;
				}
			}
			this.field.removePseudoWeather('trickroom');
		},
		name: "Dimensional Stream",
		rating: 4.5,
		num: 268,
	},
	furcoat: {
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify([0x14CD, 0x1000]);
		},
		name: "Fur Coat",
		rating: 4,
		num: 169,
	},
};