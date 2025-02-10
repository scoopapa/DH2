export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	aerodynamic: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Aerodynamic boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Aerodynamic boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Aerodynamic",
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Flying-type attack.",
		rating: 3.5,
		num: -1,
	},
	ionization: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity('powder')) {
				const r = this.random(100);
				if (r < 9) {
					source.setStatus('psn', target);
				} else if (r < 19) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('brn', target);
				}
			}
		},
		flags: {},
		name: "Ionization",
		desc: "Successful contact moves against this Pokemon result in a 9% chance of poisoning, a 10% chance of paralysis, and an 11% chance of a burn being inflicted upon the attacker.",
		shortDesc: "Contact with the Pokémon may inflict poison, paralysis, or a burn on the attacker.",
		rating: 2,
		num: -2,
	},
	frenzyvirus: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					target.addVolatile('taunt');
				}
			}
		},
		flags: {},
		name: "Frenzy Virus",
		desc: "This Pokemon's contact moves have a 30% chance of inflicting Taunt. This effect comes after a move's inherent secondary effect chance.",
		shortDesc: "This Pokemon's contact moves have a 30% chance of inflicting Taunt.",
		rating: 2,
		num: -3,
	},
	softshell: {
		onStart(pokemon) {
			pokemon.addVolatile('softshell');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['softshell'];
			this.add('-end', pokemon, 'Soft Shell', '[silent]');
		},
		condition: {
			duration: 5,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Soft Shell');
			},
			onResidual(pokemon) {
				if (!pokemon.activeTurns) {
					this.effectState.duration += 1;
				}
			},
			onModifyDefPriority: 5,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpD(spd, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Soft Shell');
			},
		},
		shortDesc: "On switch-in, this Pokemon's Defense and Sp.Defense are halved for 5 turns.",
		start: "  [POKEMON] can't get it going!",
		end: "  [POKEMON] finally got its act together!",
		flags: {},
		name: "Soft Shell",
		rating: -4,
		num: 112,
	},
	suller: {
		// Implemented in scripts.ts
		flags: {},
		name: "Suller",
		rating: 2.5,
		num: -5,
		shortDesc: "This Pokemon can make a Pokemon fall asleep regardless of its immunities.",
	},
	draconate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Dragon';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Draconate",
		rating: 4,
		num: -6,
		desc: "This Pokemon's Normal-type moves become Dragon-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Dragon type and have 1.2x power.",
	},
};
