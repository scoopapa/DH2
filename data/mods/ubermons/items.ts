export const Items: {[itemid: string]: ItemData} = {
	blueorb: {
		name: "Blue Orb",
		spritenum: 41,
		onStart(source) {
			if (source.baseSpecies.name !== 'Kyogre') return;
			for (const pokemon of source.side.foe.active) {
				if (!pokemon || pokemon.fainted) continue;
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? pokemon.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, source) && this.dex.getEffectiveness(moveType, source) > 0 ||
						move.ohko
					) {
						source.formeChange('Kyogre-Primal', this.effect, true);
						return;
					}
				}
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Kyogre') return false;
			return true;
		},
		itemUser: ["Kyogre"],
		num: 535,
		gen: 6,
		isNonstandard: null,
		shortDesc: "This item triggers Kyogre's Primal Reversion when switching into a Pokemon with a SE move.",
	},
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		fling: {
			basePower: 10,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.gender === 'F') {
				this.debug('-20% reduction');
				return this.chainModify(0.8);
			}
		},
		onSetStatus(status, target, source, effect) {
			if (target.gender !== 'F') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] item: Bright Powder');
			}
			return false;
		},
		num: 213,
		gen: 2,
		shortDesc: "If the holder is female, it takes 0.8x from moves and is immune to status.",
	},
	focusband: {
		name: "Focus Band",
		spritenum: 150,
		fling: {
			basePower: 10,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.useItem()) {
				this.debug('-25% reduction');
				return this.chainModify(0.75);
			}
		},
		num: 230,
		gen: 2,
		shortDesc: "Holder takes 25% less damage from the first hit. Single use.",
	},
	kingsrock: {
		name: "King's Rock",
		spritenum: 236,
		fling: {
			basePower: 30,
			volatileStatus: 'flinch',
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.spe && boost.spe < 0) {
				delete boost.spe;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Speed", "[from] item: King's Rock", "[of] " + target);
				}
			}
		},
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const kingsrockHolder = this.effectData.target;
			if ((source.side === kingsrockHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', kingsrockHolder, 'item: King\u2019s Rock', move, '[of] ' + target);
				return false;
			}
		},
		num: 221,
		gen: 2,
		shortDesc: "This Pokemon is protected from opposing priority moves. Its speed cannot be lowered.",
	},
	laxincense: {
		name: "Lax Incense",
		spritenum: 240,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Lax Incense boost');
				return this.chainModify(1.2);
			}
		},
		num: 255,
		gen: 3,
		shortDesc: "This Pokemon's attacks have 1.2x power if it is the last to move in a turn.",
	},
	quickclaw: {
		name: "Quick Claw",
		spritenum: 373,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.newlySwitched || this.queue.willMove(target)) return;
				boosted = false;
				break;
			}
			if (boosted) {
				this.debug('Quick Claw boost');
				return this.chainModify(1.2);
			}
		},
		num: 217,
		gen: 2,
		shortDesc: "This Pokemon's attacks have 1.2x power if it moves before the target.",
	},
	razorfang: {
		name: "Razor Fang",
		spritenum: 382,
		fling: {
			basePower: 80,
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		num: 326,
		gen: 4,
		shortDesc: "Ignores the Abilities of other Pokemon.",
	},
	redorb: {
		name: "Red Orb",
		spritenum: 390,
		onStart(source) {
			if (source.baseSpecies.name !== 'Groudon') return;
			for (const pokemon of source.side.foe.active) {
				if (!pokemon || pokemon.fainted) continue;
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? pokemon.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, source) && this.dex.getEffectiveness(moveType, source) > 0 ||
						move.ohko
					) {
						source.formeChange('Groudon-Primal', this.effect, true);
						return;
					}
				}
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Groudon') return false;
			return true;
		},
		itemUser: ["Groudon"],
		num: 534,
		gen: 6,
		isNonstandard: null,
		shortDesc: "This item triggers Groudon's Primal Reversion when switching into a Pokemon with a SE move.",
	},
	rustedshield: {
		name: "Rusted Shield",
		spritenum: 699,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 889) || pokemon.baseSpecies.num === 889) {
				return false;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			if ((target && target.baseSpecies.num !== 889) || target.baseSpecies.num !== 889) return;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 4 && target.hp + damage > target.maxhp / 4) {
				this.boost({def: 1});
			}
		},
		forcedForme: "Zamazenta-Crowned",
		itemUser: ["Zamazenta-Crowned"],
		num: 1104,
		gen: 8,
		shortDesc: "If Zamazenta-Crowned: Defense is raised by 1 when it reaches 1/4 or less of its max HP.",
	},
	rustedsword: {
		name: "Rusted Sword",
		spritenum: 698,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 888) || pokemon.baseSpecies.num === 888) {
				return false;
			}
			return true;
		},
		onSourceAfterFaint(length, target, source, effect) {
			if ((source && source.baseSpecies.num !== 888) || source.baseSpecies.num !== 888) return;
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		forcedForme: "Zacian-Crowned",
		itemUser: ["Zacian-Crowned"],
		num: 1103,
		gen: 8,
		shortDesc: "If Zacian-Crowned: Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
	},
};
