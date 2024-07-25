export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
  absorption: {
	  shortDesc: "Increases user's base Def or SpD in terrain.",
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain') || this.field.isTerrain('electricterrain')) return this.chainModify(1.5);
		},
	   onModifySpDPriority: 6,
		onModifySpD(pokemon) {
			if (this.field.isTerrain('acidicterrain') || this.field.isTerrain('mistyterrain') || this.field.isTerrain('psychicterrain')) return this.chainModify(1.5);
		},
		flags: {breakable: 1},
		name: "Absorption",
		rating: 2,
		num: -1,
	},
	// end

	// start
	acidicsurge: {
		desc: "On switch-in, this Pokémon summons Acidic Terrain for 5 turns. During the effect, the power of Poison-type attacks made by grounded Pokémon is multiplied by 1.3, and grounded Steel-types are not immune to Poison-type damage. Steel-type Pokémon are still immune to being poisoned and badly poisoned, except by Pokémon with Corrosion. Camouflage transforms the user into a Poison-type, Nature Power becomes Sludge Bomb, and Secret Power has a 30% chance to cause poison. Lasts for 8 turns if the user is holding a Terrain Extender (such as through Skill Swap).",
		shortDesc: "5 turns. Grounded: +Poison power, Steel not immune to Poison type.",
		onStart(source) {
			this.field.setTerrain('acidicterrain');
		},
		flags: {},
		name: "Acidic Surge",
		rating: 4,
		num: -2,
	},
	// end

	// start
	mimicry: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			let types;
			switch (this.field.terrain) {
			case 'electricterrain':
				types = ['Electric'];
				break;
			case 'grassyterrain':
				types = ['Grass'];
				break;
			case 'mistyterrain':
				types = ['Fairy'];
				break;
			case 'psychicterrain':
				types = ['Psychic'];
				break;
			case 'acidicterrain':
				types = ['Poison'];
				break;		
			default:
				types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
		flags: {},
		name: "Mimicry",
		rating: 0,
		num: 250,
	},
	// end

	// start
	agitation: {
		desc: "When this Pokémon raises or lowers another Pokémon's stat stages, the effect is increased by one stage for each affected stat.",
		shortDesc: "Increases stat stage changes the Pokémon inflicts by 1 stage.",
		onAnyBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			if (!target || !source || target === source || source !== this.effectState.target) return; // doesn't work on itself
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) boost[i]! -= 1; // exacerbate debuffs
				if (boost[i]! > 0) boost[i]! += 1; // augment buffs
			}
		},
		flags: {},
		name: "Agitation",
		rating: 4,
		num: -3,
	},
	// end

	// start
   ampup: {
		desc: "When this Pokémon's move misses, raises its Speed by 2 stages.",
		shortDesc: "Raises user's Speed by 2 stages if its move misses.",
		onModifySpe(spe, pokemon) {
			if (pokemon.moveThisTurnResult === false) {
				this.boost({spe: 2});
			}
		},
		flags: {},
		name: "Amp Up",
	   rating: 2,
	   num: -4,
	},
	// end

	// start
   buzz: {
		desc: "When this Pokémon uses a Sound move, the target(s) will be inflicted with a Torment effect.",
		shortDesc: "Inflicts Torment effect if the Pokémon uses a Sound move.",
		onHit(source, target, move) {
			if (move.flags['sound']) {
				pokemon.addVolatile('torment', source, effect);
			}
		},
		flags: {},
	   name: "Buzz",
		rating: 3,
		num: -5,
	},		
	// end

	// start
   chainlink: {
		shortDesc: "In a double battle, the Pokémon steals its partner's Steel type.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return; // should activate *after* Data Mod
			if (!pokemon.hasType('Steel')) {
				for (const ally of pokemon.allies()) {
					if (ally.hasAbility('chainlink')) continue; // don't bounce back and forth indefinitely
					if (ally.hasType('Steel') && pokemon.addType('Steel')) {
						this.add('-ability', pokemon, 'Chain Link');
						this.add('-message', `${pokemon.name} stole its partner's armor!`);
						this.add('-start', pokemon, 'typeadd', 'Steel', '[from] Ability: Chain Link');
						ally.addVolatile('chainlink');
					}
				}
			}
		},
		onEnd(pokemon) {
			if (!pokemon.hasType('Steel')) return;
			// doesn't happen twice if the ally has already returned the armor
			for (const ally of pokemon.allies()) {
				ally.removeVolatile('chainlink');
			}
		},
		condition: {
			onStart(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Steel" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
			},
			onSwitchOut(pokemon) { // it seems like volatiles may not run onEnd on their own the way Abilities do
				pokemon.removeVolatile('chainlink');
			},
			onFaint(pokemon) {
				pokemon.removeVolatile('chainlink');
			},
			onEnd(pokemon) {
				for (const ally of pokemon.allies()) { // revert Chain Link user's type first
					if (ally.hasAbility('chainlink') && ally.hasType('Steel')) {
						let types = ally.baseSpecies.types;
						if (ally.getTypes().join() === types.join() || !ally.setType(types)) return;
						this.add('-ability', ally, 'Chain Link');
						this.add('-message', `${ally.name} returned its partner's armor!`);
						this.add('-start', ally, 'typechange', ally.types.join('/'));
						types = pokemon.baseSpecies.types;
						if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
						this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
					}
				}
			},
		},
		flags: {},
		name: "Chain Link",
		rating: 3,
		num: -6,
	},
	// end

	// start
	coupdegrass: {
		desc: "This Pokémon moves first in its priority bracket when its target has 1/2 or less of its maximum HP, rounded down. Does not affect moves that have multiple targets.",
		shortDesc: "This Pokémon moves first in its priority bracket when its target has 1/2 or less HP.",
		onUpdate(pokemon) {
			const action = this.queue.willMove(pokemon);
			if (!action) return;
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return;
			if (!action.move.spreadHit && target.hp && target.hp <= target.maxhp / 2) {
				pokemon.addVolatile('coupdegrass');
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				const action = this.queue.willMove(pokemon);
				if (action) {
					this.add('-ability', pokemon, 'Coup de Grass');
					this.add('-message', `${pokemon.name} prepared to move immediately!`);
				}
			},
			onModifyPriority(priority) {
				return priority + 0.1;
			},
		},
		flags: {},
		name: "Coup de Grass",
		rating: 3,
		num: -7,
	},
	// end

	// start: currently, only heals user rather than ally as well
	cultivation: {
		shortDesc: "User recovers 1/16 of its HP, 1/8 in terrain.",
			onTerrainChange(target, source) {
			if (this.field.isTerrain('electricterrain') || this.field.isTerrain('grassyterrain') || this.field.isTerrain('mistyterrain') || this.field.isTerrain('psychicterrain') || this.field.isTerrain('acidicterrain')) {
				this.heal(target.baseMaxhp / 16);
			}
		},
		flags: {},
		name: "Cultivation",
		rating: 2,
		num: -8,
	},
	// end

	// start
	gravitas: {
		shortDesc: "On switch-in, this Pokémon summons Gravity.",
		onStart(source) {
			this.field.addPseudoWeather('gravity');
		},
		flags: {},
		name: "Gravitas",
		rating: 4,
		num: -9,
	},
	// end

	// start
	illwind: {
		shortDes: "Sets Tailwind when user replaces a fainted ally.",
		onAfterMega(pokemon) {
			if (!pokemon.side.faintedLastTurn) return;
			this.field.addPseudoWeather('tailwind');
	   },
		onStart(pokemon) {
			if (!pokemon.side.faintedThisTurn) return;
			this.field.addPseudoWeather('tailwind');
		},
		flags: {},
		name: "Ill Wind",
		rating: 5,
		num: -10,
	},
	// end

	// start
	inoculum: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Inoculum');
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Inoculum Atk weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Inoculum SpA weaken');
				return this.chainModify(0.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return damage / 2;
			}
		},
		flags: {},
		name: "Inoculum",
		rating: 2,
		num: -11,
	},
	// end

	// start
	interference: {
		shortDesc: "If user gets hurt by a contact move, inflicts Torment on the attacker.",
   	onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				source.addVolatile('torment', this.effectState.target);
			}
		},
		flags: {},
		name: "Interference",
		rating: 3,
		num: -12,
	},
	// end
	
	// start
	malware: {
		desc: "On switch-in, this Pokémon poisons every Pokémon on the field. Poison deals half as much damage as normal poison.",
		shortDesc: "On switch-in, this Pokémon poisons every Pokémon on the field.",
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (!target || !target.isAdjacent(pokemon) || target.status) continue;
				if (!target.runStatusImmunity('psn')) {
					this.add('-ability', pokemon, 'Malware');
					this.add('-immune', target);
				} else {
					if (target.setStatus('psn', pokemon)) {
						this.hint(`Poison inflicted through Malware is only half as damaging as normal poison.`);
					}
				}
			}
		},
		name: "Malware",
		rating: 4,
		num: -13,
	},
	// end
	
	// start
	masquerade: {
		desc: "This Pokémon inherits the Ability of the last unfainted Pokemon in its party until it takes direct damage from another Pokémon's attack. Abilities that cannot be copied are \"No Ability\", As One, Battle Bond, Comatose, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Power of Alchemy, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, and Zen Mode.",
		shortDesc: "Inherits the Ability of the last party member. Wears off when attacked.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp || pokemon.volatiles['masquerade']) return;
			pokemon.addVolatile('masquerade');
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				const additionalBannedAbilities = [
					'noability', 'flowergift', 'forecast', 'hugepower', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas',
					'powerofalchemy', 'purepower', 'receiver', 'trace', 'wonderguard',
				];
				if (
					pokemon.side.pokemon[i].fainted ||
					pokemon.side.pokemon[i].getAbility().isPermanent || additionalBannedAbilities.includes(pokemon.side.pokemon[i].ability)
				) {
					continue;
				}
				break;
			}
			if (!pokemon.side.pokemon[i] || pokemon === pokemon.side.pokemon[i]) {
				this.effectState.gaveUp = true;
				return;
			}
			const masquerade = pokemon.side.pokemon[i];
			this.add('-ability', pokemon, 'Masquerade');
			pokemon.setAbility(masquerade.ability);
			this.hint(`${pokemon.name} inherited ${this.dex.abilities.get(pokemon.ability).name} from ${masquerade.name}!`);
			this.add('-ability', pokemon, this.dex.abilities.get(pokemon.ability).name, '[silent]');
		},
		condition: {
			onDamagingHit(damage, target, source, move) {
				this.effectState.busted = true;
			},
			onFaint(pokemon) {
				this.effectState.busted = true;
			},
			onUpdate(pokemon) {
				if (pokemon.hasAbility('masquerade')) return;
				if (this.effectState.busted) {
					this.add('-ability', pokemon, 'Masquerade');
					this.add('-message', `${pokemon.name}'s Masquerade wore off!`);
					pokemon.setAbility('masquerade');
				}
			},
		},
		flags: {},
		name: "Masquerade",
		rating: 3,
		num: -14,
	},
	// end

	// start
	permafrost: {
		shortDesc: "Boosts Ice moves by 50% on user's side.",
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Permafrost boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Permafrost",
		rating: 3.5,
		num: -15,
	},
	// end

	// start
	poisonspit: {
		shortDesc: "Sets Acidic Terrain when hurt.",
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('acidicterrain');
		},
		flags: {},
		name: "Poison Spit",
		rating: 2,
		num: -16,
	},
	// end

	// start
	reconfiguration: {
		shortDesc: "Boosts user's stat depending on target's best stat.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position]) {
				totalatk += target.getStat('atk', false, true);
				totaldef += target.getStat('def', false, true);
				totalspa += target.getStat('spa', false, true);
				totalspd += target.getStat('spd', false, true);
				totalspe += target.getStat('spe', false, true);
			}
			if (totalatk && totalatk >= (totaldef || totalspa || totalspd || totalspe)) {
				this.boost({atk: 1});
			}
			if (totaldef && totaldef >= (totalspa || totalspd || totalspe)) {
				this.boost({def: 1});
			}
			if (totaldef && totaldef > (totalatk)) {
				this.boost({def: 1});
			}
			if (totalspa && totalspa >= (totalspd || totalspe)) {
				this.boost({spa: 1});
			}
			if (totalspa && totalspa > (totalatk || totaldef)) {
				this.boost({spa: 1});
			}
			if (totalspd && totalspd >= (totalspe)) {
				this.boost({spd: 1});
			}
			if (totalspd && totalspd > (totalatk || totaldef || totalspa)) {
				this.boost({spd: 1});
			}
			if (totalspe && totalspe > (totalatk || totaldef || totalspa || totalspd)) {
				this.boost({spe: 1});
			}
		},
		flags: {},
		name: "Reconfiguration",
		rating: 3,
		num: -17,
	},
	// end

	// start: currently, it only affects the user, rather than the ally as well
	rewind: {
		shortDesc: "Recovers item when hit by a move causing its HP to get to 50% or below.",
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedRewind = false;
			} else {
				this.effectState.checkedRewind = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedRewind;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedRewind = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.actions.useMove('Recycle', pokemon);
			}
		},
		flags: {},
		name: "Rewind",
		rating: 4,
		num: -18,
	},
	// end

	// start
	scaleshift: {
		shortDesc: "In a double battle, the Pokémon copies its partner's first type.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return; // should activate *after* Data Mod
			let newtype = null;
			for (const ally of pokemon.side.active) {
				if (
					ally !== pokemon && !ally.hasAbility('scaleshift') && ally.types[0] !== pokemon.baseSpecies.types[0] &&
					ally.types[0] !== pokemon.baseSpecies.types[1]
				) {
					newtype = ally.types[0];
				}
			}
			if (newtype) {
				const typecombo = [newtype, pokemon.baseSpecies.types[1]];
				if (pokemon.getTypes().join() === typecombo.join() || !pokemon.setType(typecombo)) return;
				this.add('-ability', pokemon, 'Scale Shift');
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
			} else {
				if (pokemon.getTypes().join() === pokemon.baseSpecies.types.join() || !pokemon.setType(pokemon.baseSpecies.types)) return;
				this.add('-ability', pokemon, 'Scale Shift');
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
			}
		},
		onEnd(pokemon) {
			if (pokemon.getTypes().join() === pokemon.baseSpecies.types.join() || !pokemon.setType(pokemon.baseSpecies.types)) return;
			this.add('-ability', pokemon, 'Scale Shift');
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
		},
		flags: {},
		name: "Scale Shift",
		rating: 3,
		num: -19,
	},
	// end

	// start
	solarcore: {
		shortDesc: "During intense sunlight, this Pokémon can skip the charging turn of its moves.",
		onChargeMove(pokemon, target, move) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('Solar Core - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', pokemon, move.name, target);
				return false; // skip charge turn
			}
		},
		flags: {},
		name: "Solar Core",
		rating: 2,
		num: -20,
	},
	// end

	// start
	steelbreaker: {
		shortDesc: "This Pokémon's attacks are critical hits if the target is a Steel-type Pokémon.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && target.hasType('Steel')) return 5;
		},
		flags: {},
		name: "Steelbreaker",
		rating: 3,
		num: -21,
	},
	// end

	// start
	tempestuous: {
		desc: "When replacing a fainted party member, this Pokémon's Special Defense is boosted, and it charges power to double the power of its Electric-type move on its first turn.",
		shortDesc: "Gains the effect of Charge when replacing a fainted ally.",
		onAfterMega(pokemon) {
			if (!pokemon.side.faintedLastTurn) return;
			this.boost({spd: 1}, pokemon);
			this.add('-activate', pokemon, 'move: Charge');
			pokemon.addVolatile('charge');
		},
		onStart(pokemon) {
			if (!pokemon.side.faintedThisTurn) return;
			this.boost({spd: 1}, pokemon);
			this.add('-activate', pokemon, 'move: Charge');
			pokemon.addVolatile('charge');
		},
		name: "Tempestuous",
		rating: 3,
		num: -22,
	},
	// end

	// start
	// thermal expansion
	thermalexpansion: {
		onDamage(damage, target, source, effect) {
			if (!target.hasType('Ice')) return;
			if (effect && effect.id === 'stealthrock') {
				target.setType(target.getTypes(true).map(type => type === "Ice" ? "???" : type));
				this.add('-start', target, 'typechange', target.getTypes().join('/'));
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (!target.hasType('Ice')) return;
			if (move.type === 'Rock') {
				this.add('-immune', target, '[from] ability: Thermal Expansion');
				target.setType(target.getTypes(true).map(type => type === "Ice" ? "???" : type));
				this.add('-start', target, 'typechange', target.getTypes().join('/'));
				return null;
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (target.hasType('Ice')) return;
			if (!target.addType('Ice')) return false;
			if (effect.id === 'snow') {
				this.add('-start', target, 'typeadd', 'Ice', '[from] ability: Thermal Expansion');
			}
		},
		flags: {},
		name: "Thermal Expansion",
		shortDesc: "If user is Ice-type, immunity to Stealth Rock and Rock-type moves. On immunity, lose Ice-type. Regain in Hail or switch.",
		rating: 4,
		num: -23,
	},

	// end

	// start
	vampirism: {
		shortDesc: "Replaces target's ability with Vampirism if user made contact.",
		onSourceDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['cantsuppress'] || sourceAbility.id === 'vampirism') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('vampirism', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Vampirism', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		flags: {},
		name: "Vampirism",
		rating: 3,
		num: -24,
	},
	// end

	// start
	woodstove: {
		shortDesc: "50% less damage from Fire moves dealt to user's side. Also, less Burn damage.",
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Wood Stove');
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Wood Stove Atk weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Wood Stove SpA weaken');
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Magma Armor');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'frz') return false;
		},
		flags: {},
		name: "Wood Stove",
		rating: 2,
		num: -25,
	},
	// end
};
