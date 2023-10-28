export const Abilities: {[k: string]: ModdedAbilityData} = {
	brazenbrawn: {
		onBasePowerPriority: 5,
		onBasePower(basePower, move, accuracy, pokemon, target) {
			if (move.accuracy !== 100) {
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Brazen Brawn",
		shortDesc: "Moves with less than 100% accuracy have 1.3x power.",
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
		shortDesc: "On switch-in, copies opponent's typing.",
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
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
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
		shortDesc: "This Pokemon's moves change category, depending on which is stronger.",
		rating: 2,
		num: -7,
	},
	divineidol: {
		onSourceModifyDamage(damage, source, target, move) {
			if (['Dark', 'Ghost'].includes(move.type)) {
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		name: "Divine Idol",
		shortDesc: "Halves damage taken from Ghost- or Dark-type moves.",
		rating: 4,
		num: -8,
	},
};
