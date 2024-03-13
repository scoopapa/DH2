export const Abilities: {[k: string]: ModdedAbilityData} = {
  // New Abilities
	graviseeds: {
		onDamagingHit(damage, target, source, move) {
			this.add('-activate', target, 'ability: Graviseeds');
			this.field.addPseudoWeather('gravity', target, target.ability);
			if (!source.hasType('Grass')) {
				source.addVolatile('leechseed', this.effectState.target);
			}
		},
		flags: {},
		name: "Graviseeds",
		shortDesc: "When this Pokemon is hit by an attack, the effect of Leech Seed begins.",
		rating: 3,
	},
	flockrock: {
    shortDesc: "If Squawkabilly: 50% boost to all stats if ally is Flying-type.", 
		onUpdate(pokemon) {
			const ally = pokemon.allies()[0];
			if (!ally || pokemon.baseSpecies.baseSpecies !== 'Squawkabilly' || !ally.hasType('Flying')) {
				if (pokemon.getVolatile('flockrock')) pokemon.removeVolatile('flockrock');
				return;
			}
			if (!pokemon.getVolatile('flockrock')) {
				this.add('-activate', pokemon, 'ability: Flock Rock', '[of] ' + ally);
				pokemon.addVolatile('flockrock');
			} else {
				if (!ally.fainted) return;
				pokemon.removeVolatile('flockrock');
			}
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'ability: Flock Rock');
				this.add('-message', `${target.name} is ready to rock!`);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
		   onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.5);
			},
		   onModifySpAPriority: 5,
		   onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
		   },
		   onModifySpDPriority: 6,
		   onModifySpD(spd, pokemon) {
				return this.chainModify(1.5);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Flock Rock');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Flock Rock",
		rating: 0,
	},
	pureheart: {
    shortDesc: "This Pokemon is immune to Shadow moves and deals 1.2x damage to Shadow Pokemon. Can't be a Shadow Pokemon.", 
		onTryHit(pokemon, target, move) {
			if (move.type === 'Shadow') {
				this.add('-immune', pokemon, '[from] ability: Pure Heart');
				return null;
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (defender.hasItem('shadowadapter')) {
  				this.debug('Pure Heart boost');
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {noentrain: 1, failskillswap: 1, cantsuppress: 1},
		name: "Pure Heart",
		rating: 3,
  },

  // Old Abilities
	regenerator: {
		onSwitchOut(pokemon) {
			if (!pokemon.volatiles['healblock']) {
				pokemon.heal(pokemon.baseMaxhp / 3);
			}
		},
		flags: {},
		name: "Regenerator",
		rating: 4.5,
		num: 144,
	},
	normalize: {
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id) &&
				// TODO: Figure out actual interaction
				!(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Normal';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(2);
		},
		flags: {},
		name: "Normalize",
		rating: 0,
		num: 96,
		shortDesc: "This Pokemon's moves are changed to be Normal type and have 2x power.",
	},
	powerspot: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
      this.debug('Power Spot boost');
      return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Power Spot",
		rating: 4,
		num: 249,
		shortDesc: "This Pokemon and its allies' moves have their power multiplied by 1.3.",
	},
	rattled: {
		onDamagingHit(damage, target, source, move) {
			if (['Dark', 'Bug', 'Ghost', 'Shadow'].includes(move.type)) {
				this.boost({spe: 1});
			}
		},
		onAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Intimidate') {
				this.boost({spe: 1});
			}
		},
		flags: {},
		name: "Rattled",
		rating: 1,
		num: 155,
		shortDesc: "Speed is raised 1 stage if hit by a Bug-, Dark-, Ghost-, or Shadow-type attack, or Intimidated.",
	},
	rivalry: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				}
			}
		},
		flags: {},
		name: "Rivalry",
		rating: 3,
		num: 79,
		shortDesc: "This Pokemon's attacks do 1.25x on same gender targets.",
	},
};
