export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	serratedskin: {
		shortDesc: "Contact moves cause the opponent to lose 10% of their max HP.",
		onSourceDamagingHit: 1,
		onSourceDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(target.baseMaxhp / 10, target, source);
			}
		},
		name: "Serrated Skin",
		rating: 2.5,
		num: 1001,
	},
	adaptivearmor: {
		shortDesc: "Raises Def or SpD depending on the opponent's attacking stats.",
		onStart(pokemon) {
			let totalatk = 0;
			let totalspa = 0;
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				totalatk += target.getStat('atk', false, true);
				totalspa += target.getStat('spa', false, true);
			}
			if (totalatk && totalatk >= totalspa) {
				this.boost({def: 1});
			} else if (totalspa) {
				this.boost({spd: 1});
			}
		},
		name: "Adaptive Armor",
		rating: 3.5,
		num: 1002,
	},
	shortcircuit: {
		shortDesc: "Electric moves fail and instead cause every pokemon to lose 25% of its max HP.",
		onAnyTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				let activated = false;
				for (const pokemon of this.getAllActive()) {
					if (pokemon.hasAbility("Short Circuit") && !activated) {
						this.add('-activate', pokemon, 'ability: Short Circuit');
						activated = true;
					}
				}
				for (const pokemon of this.getAllActive()) {
					if (pokemon.fainted) continue;
					this.damage(pokemon.baseMaxhp / 4, pokemon, target);
				}
				return null;
			}
		},
		name: "Short Circuit",
		rating: 3,
		num: 1003,
	},
	appropriation: {
		shortDesc: "On switch-in copies the foes type(s).",
		onStart(source) {
			for (const target of source.side.foe.active) {
				let newBaseTypes = target.getTypes(true).filter(type => type !== '???');
				if (!newBaseTypes.length) {
					if (target.addedType) {
						newBaseTypes = ['Normal'];
					} else {
						return false;
					}
				}
				this.add('-start', source, 'typechange', '[from] move: Reflect Type', '[of] ' + target);
				source.setType(newBaseTypes);
				source.addedType = target.addedType;
				source.knownType = target.side === source.side && target.knownType;
			}
		},
		name: "Appropriation",
		rating: 3.5,
		num: 1004,
	},
	hibernation: {
		shortDesc: "+50% Def and SpD when this pokemon is asleep.",
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (pokemon.status === 'slp') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (pokemon.status === 'slp') {
				return this.chainModify(1.5);
			}
		},
		name: "Hibernation",
		rating: 2.5,
		num: 1005,
	},
	crystallize: {
		shortDesc: "Normal moves become Rock-type and gain 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Rock';
				move.crystallizeBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.crystallizeBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Crystallize",
		rating: 4,
		num: 206,
	},
	squishybody: {
		shortDesc: "Lowers Def by 1 stage when hit by a damaging move.",
		onDamagingHit(damage, target, source, effect) {
			this.boost({def: -1});
		},
		name: "Squishy Body",
		rating: 3.5,
		num: 192,
	},
};