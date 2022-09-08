export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	fighter: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Fighter boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Fighter boost');
				return this.chainModify(1.5);
			}
		},
		name: "Fighter",
		rating: 2,
		num: -1,
	},
	darken: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Darken boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Darken boost');
				return this.chainModify(1.5);
			}
		},
		name: "Darken",
		rating: 2,
		num: -2,
	},
	enlight: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Enlight boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Enlight boost');
				return this.chainModify(1.5);
			}
		},
		name: "Enlight",
		rating: 2,
		num: -3,
	},
	imperium: {
		onModifySpAPriority: 5,
		onModifySpA(atk) {
			return this.chainModify(2);
		},
		name: "Imperium",
		rating: 5,
		num: -4,
	},
	wonderguard: {
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Guard');
				}
				return null;
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		name: "Wonder Guard",
		rating: 5,
		num: 25,
	},
	stancechangev: {
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.name.startsWith !== 'Aegislash-Venizia' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			const targetForme = (move.id === 'kingsshield' ? 'Aegislash-Venizia' : 'Aegislash-Blade-Venizia');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		isPermanent: true,
		name: "Stance Change (V)",
		rating: 4,
		num: 176,
	},
};