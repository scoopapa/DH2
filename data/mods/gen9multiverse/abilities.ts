export const Abilities: {[k: string]: ModdedAbilityData} = {
	brazenbrawn: {
		onBasePowerPriority: 5,
		onBasePower(basePower, move, accuracy, pokemon, target) {
			if (move.accuracy !== 100) {
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Brazen Brawn",
		shortDesc: "This Pokemon's moves have 1.3x power if they have less than 100% accuracy.",
		rating: 3,
		num: -1,
	},
	chromatophore: {
		onStart(source) {
			for (const target of source.side.foe.active) {
				const types = target.species.types;
				if (types && types !== '???' && source.getTypes().join() !== types) {
					if (!source.setType(types)) return;
					this.add('-activate', source, 'ability: Chromatophore');
					this.add('-start', source, 'typechange', '[from] move: Reflect Type', '[of] ' + target);
				}
			}
		},
		name: "Chromatophore",
		shortDesc: "On switch-in, this Pokemon copies the opponent's typing.",
		rating: 2.5,
		num: -2,
	},
	daymare: {
		onBeforeMove(source, target, move) {
			if (move.type === 'Fire' && !this.field.isWeather('sunnyday')) {
				this.field.setWeather('sunnyday');
			}
		},
		name: "Daymare",
		shortDesc: "User summons Sun before executing a Fire-type move.",
		rating: 0,
		num: -3,
	},
	legendarybeast: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Legendary Beast');
		},
		onAnyModifyAtk(atk, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Legendary Beast')) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Legendary Beast Atk drop');
			return this.chainModify(0.75);
		},
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Legendary Beast')) return;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Legendary Beast SpA drop');
			return this.chainModify(0.75);
		},
		name: "Legendary Beast",
		shortDesc: "Active Pokemon without this Ability have their Atk & SpA multiplied by 0.75.",
		rating: 4.5,
		num: -4,
	},
	pixelgreat: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fairy';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		name: "Pixelgreat",
		shortDesc: "This Pokemon's Normal-type moves become Fairy type and have 1.3x power.",
		rating: 4,
		num: -5,
	},
	accretion: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		name: "Accretion",
		shortDesc: "This Pokemon restores 1/16 of its maximum HP per turn.",
		rating: 3,
		num: -6,
	},
	lionspride: {
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			if (atk > spa || (atk === spa && this.random(2) === 0)) {
				move.category = 'Physical';
			} else {
				move.category = 'Special';
			}
		},
		onHit(target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " " + move.name);
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " " + move.name);
		},
		name: "Lion's Pride",
		shortDesc: "This Pokemon's moves change category, depending on the user's higher attacking stat.",
		rating: 2,
		num: -7,
	},
	divineidol: {
		onSourceModifyDamage(damage, source, target, move) {
			if (['Dark', 'Ghost'].includes(move.type)) {
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Divine Idol",
		shortDesc: "This Pokemon receives 1/2 damage from Ghost- or Dark-type attacks.",
		rating: 4,
		num: -8,
	},
	coldsweat: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.field.setWeather('raindance');
						return;
					} else {
						this.field.setWeather('snow');
						return;
					} 
				}
			}
		},
		onAnySwitchIn(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.field.setWeather('raindance');
						return;
					}
				}
			}
		},
		name: "Cold Sweat",
		shortDesc: "Upon entry, summons Snow. Summons Rain if opponent has SE or OHKO move.",
		rating: 4,
		num: -9,
	},
	ultrarecharge: {
		onAfterUseItem(item, pokemon) {
			if (pokemon.ultraRecharged) return;
			pokemon.ultraRecharged = true;
			pokemon.setItem(pokemon.lastItem);
			pokemon.lastItem = '';
			this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Ultra Recharge');
		},
		onTakeItem(item, pokemon) {
			if (pokemon.ultraRecharged) return;
			pokemon.ultraRecharged = true;
			pokemon.setItem(pokemon.lastItem);
			pokemon.lastItem = '';
			this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Ultra Recharge');
		},
		flags: {},
		name: "Ultra Recharge",
		rating: 3,
		shortDesc: "Once per battle, this Pokemon gains its item back after it's used or taken away.",
		num: -10,
	},
	flyingsaucer: {
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.75);
		},
		onModifySpe(spe, pokemon) {
			return this.chainModify(0.5);
		},
		flags: {breakable: 1},
		name: "Flying Saucer",
		rating: 3,
		shortDesc: "This Pokemon takes 3/4 damage from attacks, but its Speed is halved.",
		num: -11,
	},
	insurance: {
		onTryHit(source, target, move) {
			if (target !== source && move.type === 'Flying') {
				this.add('-immune', source, '[from] ability: Insurance');
				this.add('-anim', source, "Payday", source);
				this.add('-message', `Coins scattered everywhere!`);
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Insurance",
		rating: 3,
		shortDesc: "This Pokemon gains an immunity to Flying-type moves.",
		num: -12,
	},
	hospitality: {
		name: "Hospitality",
		onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'hospitality');
		},
		condition: {
			onSwitchIn(target) {
				if (!target.fainted) {
					target.addVolatile('aquaring');
					target.side.removeSlotCondition(target, 'hospitality');
				}
			},
		},
		rating: 3,
		shortDesc: "When switching out, the next incoming ally gains the effects of Aqua Ring.",
		num: 299,
	},
	lunargift: {
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (this.effectState.lunargift) return;
			if (this.effectState.resisted) return -1; // all hits of multi-hit move should be not very effective
			if (move.category === 'Status') return;
			if (!target.runImmunity(move.type)) return; // immunity has priority
			if (target.hp < target.maxhp) return;
			this.add('-activate', target, 'ability: Lunar Gift');
			this.effectState.resisted = true;
			this.effectState.lunargift = true;
			return -1;
		},
		onAnyAfterMove() {
			this.effectState.lunargift = false;
		},
		flags: {breakable: 1},
		name: "Lunar Gift",
		rating: 3.5,
		shortDesc: "Once per switch, attacks taken have 0.5x effectiveness unless naturally immune.",
		num: -13,
	},
	embodyaspecthearthflame: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Embody Aspect', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({def: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Embody Aspect (Hearthflame)",
		rating: 3.5,
		shortDesc: "On switch-in, this Pokemon lowers the Defense of opponents by 1 stage.",
		num: 303,
	},
	shellbreaker: {
		onPrepareHit(source, target, move) {
			if (this.effectState.shellBreaker) return;
			if (move.id === 'shellsmash') {
				this.boost({def: 1, spd: 1}, source, source);
				this.effectState.shellBreaker = true;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (this.effectState.shellBreaker) return;
			if (move.type === 'Ground') {
				this.debug('Shell Breaker weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (this.effectState.shellBreaker) return;
			if (move.type === 'Ground') {
				this.debug('Shell Breaker weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		shortDesc: "Takes 1/2 from Ground moves. Before using Shell Smash, +1 Def & + 1 SpD.",
		name: "Shell Breaker",
		rating: 2,
	},
};
