export const Abilities: {[abilityid: string]: AbilityData} = {
	//new
	dustdevil: {
		name: "Dust Devil",
		shortDesc: "The Pokémon's Attack is boosted by 50% if Sandstorm is active.",
		onModifyAtk(atk, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				this.chainModify(1.5);
			}
		},
	},
	poisonsurge: {
		name: "Poison Surge",
		shortDesc: "On switchin, this Pokemon sets Poison Terrain.",
		onStart(source) {
			this.field.setTerrain('poisonterrain');
		},
	},
	snowcoat: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Snow Coat');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Snow Coat",
		shortDesc: "The Pokemon heals 25% of its max HP when hit by an Ice-type move; Ice-type immunity.",
	},
	sludgerush: {
		onModifySpe(spe) {
			if (this.field.isTerrain('poisonterrain')) {
				return this.chainModify(2);
			}
		},
		name: "Sludge Rush",
		shortDesc: "The Pokémon's Speed is doubled if Poison Terrain is active.",
	},
	railgunner: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['beam']) {
				return this.chainModify(1.3);
			}
		},
		name: "Railgunner",
		shortDesc: "This Pokemon's beam moves have 1.3x power.",
	},
	powerlock: {
		name: "Power Lock",
		shortDesc: "Pokemon without this ability lose 1/8 max HP at the end of each turn if they have a positive stat boost. If they boost their own stats, they take 1/4 max HP instead.",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.positiveBoosts() > 0) {
					if(!source.hasAbility('Power Lock')) this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
		onFoeAfterBoost(boost, target, source, effect) {
			const pokemon = this.effectState.target;
			let activated = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					boost[i] = 0;
					activated = true;
				}
			}
			if (activated) this.damage(target.baseMaxhp / 4, target, source);
		},
	},
	mastermind: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Mastermind",
		shortDesc: "This Pokemon's Special Attack is doubled.",
	},
	gulpcannon: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantdesvegangulping', 'toxirantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantdesvegangulping') {
					this.boost({spd: -1}, source, target, null, true);
					target.formeChange('cramorantdesvegan', move);
				} else {
					source.trySetStatus('psn', target, move);
					target.formeChange('toxirant', move);
				}
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (
				effect && effect.id === 'surf' && source.hasAbility('gulpcannon') && !source.transformed
			) {
				source.formeChange((target.species.id === 'cramorantdesvegangulping') ? "Cramorant-Desvegan-Gulping": "Toxirant-Gorging", effect);
			}
		},
		isPermanent: true,
		name: "Gulp Cannon",
		shortDesc: "When hit after Surf/Dive, attacker takes 1/4 max HP and -1 Sp. Defense or poison.",
	},
	//buffed
	keeneye: {
		inherit: true,
		shortDesc: "This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat, immune to hazards.",
	},
	suctioncups: {
		inherit: true,
		shortDesc: "This Pokemon and its allies are protected from moves that force them out.",
		onFoeTryMove(target, source, move) {
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.forceSwitch) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Suction Cups', move, '[of] ' + target);
				return false;
			}
		},
	},
	//keen eye buff implemented in moves.ts
};
