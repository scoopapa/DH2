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
  tippedscales: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Tipped Scales');
			}
		},
		flags: {},
		name: "Tipped Scales",
		rating: 5,
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use. Works multiple times per switch-in.",
	},
	totemtrial: {
		onStart(pokemon) {
			pokemon.addVolatile('totemtrial');
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns && !pokemon.hasItem('strangesouvenir')) {
				pokemon.removeVolatile('totemtrial');
			}
		},
		onTakeItem(item, pokemon) {
			if (item.id === 'strangesouvenir') {
	  			pokemon.removeVolatile('totemtrial');
			}
		},
		condition: {
			onStart(pokemon) {
				this.add('-ability', pokemon, 'Totem Trial');
		  		if ((pokemon.baseSpecies.baseSpecies === 'Gumshoos' && ['Totem'].includes(pokemon.species.forme)) ||
		          (pokemon.baseSpecies.baseSpecies === 'Salazzle' && ['Totem'].includes(pokemon.species.forme)) ||
		          (pokemon.baseSpecies.baseSpecies === 'Mimikyu' && ['Totem', 'Busted-Totem'].includes(pokemon.species.forme))) {
					this.boost({def: 1}, pokemon);
				}
		    	if ((pokemon.baseSpecies.baseSpecies === 'Raticate' && ['Alola-Totem'].includes(pokemon.species.forme)) ||
		          (pokemon.baseSpecies.baseSpecies === 'Togedemaru' && ['Totem'].includes(pokemon.species.forme)) ||
		          (pokemon.baseSpecies.baseSpecies === 'Vikavolt' && ['Totem'].includes(pokemon.species.forme))) {
					this.boost({spd: 1}, pokemon);
				}
		    	if ((pokemon.baseSpecies.baseSpecies === 'Lurantis' && ['Totem'].includes(pokemon.species.forme)) ||
		          (pokemon.baseSpecies.baseSpecies === 'Kommo-o' && ['Totem'].includes(pokemon.species.forme))) {
					this.boost({spe: 1}, pokemon);
				}
	      	if (pokemon.baseSpecies.baseSpecies === 'Araquanid' && ['Totem'].includes(pokemon.species.forme) ||
					 pokemon.baseSpecies.baseSpecies === 'Ribombee' && ['Totem'].includes(pokemon.species.forme)) {
					this.boost({atk: 1}, pokemon);
				}
		    	if (pokemon.baseSpecies.baseSpecies === 'Marowak' && ['Alola-Totem'].includes(pokemon.species.forme)) {
					this.boost({spa: 1}, pokemon);
				}
				this.add('-message', `${pokemon.name} aura flared to life!`);
			},
			onEnd(pokemon) {
			  	// if (pokemon.hasItem('strangesouvenir')) return;
				this.add('-ability', pokemon, 'Totem Trial');
				this.add('-message', `${pokemon.name} aura died down!`);
	    		if ((pokemon.baseSpecies.baseSpecies === 'Gumshoos' && ['Totem'].includes(pokemon.species.forme)) ||
	            (pokemon.baseSpecies.baseSpecies === 'Salazzle' && ['Totem'].includes(pokemon.species.forme)) ||
	            (pokemon.baseSpecies.baseSpecies === 'Mimikyu' && ['Totem', 'Busted-Totem'].includes(pokemon.species.forme))) {
	  			  this.boost({def: -1}, pokemon);
	  			}
	      	if ((pokemon.baseSpecies.baseSpecies === 'Raticate' && ['Alola-Totem'].includes(pokemon.species.forme)) ||
	            (pokemon.baseSpecies.baseSpecies === 'Togedemaru' && ['Totem'].includes(pokemon.species.forme)) ||
	            (pokemon.baseSpecies.baseSpecies === 'Vikavolt' && ['Totem'].includes(pokemon.species.forme))) {
	  			  this.boost({spd: -1}, pokemon);
	  			}
	      	if ((pokemon.baseSpecies.baseSpecies === 'Lurantis' && ['Totem'].includes(pokemon.species.forme)) ||
	            (pokemon.baseSpecies.baseSpecies === 'Kommo-o' && ['Totem'].includes(pokemon.species.forme))) {
	  			  this.boost({spe: -1}, pokemon);
	  			}
	      	if (pokemon.baseSpecies.baseSpecies === 'Araquanid' && ['Totem'].includes(pokemon.species.forme) ||
					 pokemon.baseSpecies.baseSpecies === 'Ribombee' && ['Totem'].includes(pokemon.species.forme)) {
	  			  this.boost({atk: -1}, pokemon);
	  			}
	      	if (pokemon.baseSpecies.baseSpecies === 'Marowak' && ['Alola-Totem'].includes(pokemon.species.forme)) {
	  			  this.boost({spa: -1}, pokemon);
	  			}
	      },
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Totem Trial",
		rating: 3.5,
		shortDesc: "Boosts a certain stat on switch-in. Boost goes away at the end of the next turn.",
	},
	thundercape: {
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			return this.chainModify(2);
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric') {
				this.boost({def: 1});
			}
		},
		flags: {breakable: 1},
		name: "Thunder Cape",
		rating: 4,
		shortDesc: "This Pokemon's Defense is doubled. +1 Defense if hit by an Electric move.",
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
	emergencyexit: {
	  shortDesc: "This Pokemon switches out at the end of the turn after being lowered to 50% of its max HP.",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage || !this.canSwitch(target.side)) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp*.5 && target.hp + damage > target.maxhp*.5) {
				target.addVolatile('emergencyexit');
				this.add('-ability', target, 'Emergency Exit');
				this.add('-message', `${target.name} is planning its escape!`);
			}
		},
		condition: {
			duration: 1,
			onEnd(pokemon) {
				this.add('-ability', pokemon, 'Emergency Exit');
				this.add('-message', `${pokemon.name} made an emergency exit!`);
				pokemon.switchFlag = true;				
			},
		},
		flags: {},
		name: "Emergency Exit",
		rating: 2,
		num: 194,
	},
	teraformzero: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.name !== 'Terapagos-Stellar') return;
			if (this.field.weather || this.field.terrain) {
				this.add('-ability', pokemon, 'Teraform Zero');
				this.field.clearWeather();
				this.field.clearTerrain();
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		shortDesc: "Terapagos: Switching in ends the effects of weather and terrain.",
		name: "Teraform Zero",
		rating: 3,
		num: 309,
	},
	plus: {
		onUpdate(pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					pokemon.addVolatile('plus');
				} else {
					pokemon.removeVolatile('plus');
				}
			}
		},
		condition: {
			noCopy: true,
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Plus",
		rating: 0,
		num: 57,
	},
	minus: {
		onUpdate(pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					pokemon.addVolatile('minus');
				} else {
					pokemon.removeVolatile('minus');
				}
			}
		},
		condition: {
			noCopy: true,
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Minus",
		rating: 0,
		num: 58
	},
	supremeoverlord: {
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Supreme Overlord');
				const fallen = Math.min(pokemon.side.totalFainted, 3);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		flags: {},
		name: "Supreme Overlord",
		rating: 4,
		num: 293,
		shortDesc: "This Pokemon's moves have 10% more power for each fainted ally, up to 3 allies.",
	},
};
