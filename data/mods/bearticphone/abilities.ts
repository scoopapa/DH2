export const Abilities: {[abilityid: string]: AbilityData} = {
	bigswinger: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				this.debug('Big Swinger boost');
				return this.chainModify(1.5);
			}
		},
		name: "Big Swinger",
		shortDesc: "This Pokemon's ball and bullet moves have their power multiplied by 1.5.",
		rating: 3.5,
		num: 292,
	},
	boombox: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Boombox's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 10)) {
				target.addVolatile('confusion', source);
			}
		},
		name: "Boombox",
		shortDesc: "This Pokemon's moves have a 30% chance of badly poisoning.",
		rating: 4.5,
		num: 305,
	},
	cosmicbody: {
		onDamagingHit(damage, target, source, effect) {
			if (this.randomChance(3, 10)) {
			  this.boost({def: 1, spd: 1});
			}
		},
		name: "Cosmic Body",
		shortDesc: "This Pokemon's Def and SpD has a 30% chance to be raised by 1 after it's damaged by a move.",
		rating: 2,
		num: 49,
	},
	electrivore: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Electrivore",
		shortDesc: "This Pokemon's Normal-type moves become Electric type and have 1.2x power.",
		rating: 4,
		num: 206,
	},
	immolate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fire';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Immolate",
		shortDesc: "This Pokemon's Normal-type moves become Fire type and have 1.2x power.",
		rating: 4,
		num: 184,
	},
	moltenfury: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Rock') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Molten Fury');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Rock') {
				this.boost({atk: 1}, this.effectState.target);
			}
		},
		isBreakable: true,
		name: "Molten Fury",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Rock move; Rock immunity.",
		rating: 3,
		num: 157,
	},
	phantomthief: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Ghost'] = true;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Phantom Thief', '[of] ' + target);
			}
		},
		name: "Phantom Thief",
		shortDesc: "Ghost moves hit Normal. Immune to Intimidate.",
		rating: 3,
		num: 113,
	},
	quackery: {
		onStart(pokemon) {
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
				this.add('-clearboost', pokemon, '[from] ability: Quackery', '[of] ' + pokemon);
			}
		},
		name: "Quackery",
		shortDesc: "On switch-in, every Pokemon has their stat stages reset to 0.",
		rating: 4,
		num: 261,
	},
	rocketpropulsion: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Rocket Propulsion');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Fire') {
				this.boost({spe: 1}, this.effectState.target);
			}
		},
		isBreakable: true,
		name: "Rocket Propulsion",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Fire move; Fire immunity.",
		rating: 3,
		num: 157,
	},
	sharpshooter: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				this.debug('Sharpshooter boost');
				return this.chainModify(1.5);
			}
		},
		name: "Sharpshooter",
		shortDesc: "This Pokemon's ball and bullet moves have their power multiplied by 1.5.",
		rating: 3.5,
		num: 292,
	},
  twoleftfeet: {
	 // Two Left Feet confusion copying implemented in scripts.ts
    name: "Two Left Feet",
	 shortDesc: "After another Pokemon uses a move that can cause confusion, this Pokemon uses the same move.",
    rating: 4,
  },
};
