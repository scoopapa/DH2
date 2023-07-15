export const Abilities: {[abilityid: string]: AbilityData} = {
	chillingsqueal: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		name: "Chilling Squeal",
		shortDesc: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
		rating: 3,
		num: -1,
	},
	autoimmune: {
		onUpdate(source) {
			if (!source.status) {
				this.add('-activate', source, 'ability: Autoimmune');
				source.setStatus('psn');
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!source.status) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Autoimmune');
			}
			return false;
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		isPermanent: true,
		isUnbreakable: true,
		name: "Autoimmune",
		desc: "The user is considered poisoned.",
		rating: 4,
		num: -2,
	},
};