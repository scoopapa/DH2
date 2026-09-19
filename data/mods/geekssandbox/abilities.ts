export const Abilities: {[k: string]: ModdedAbilityData} = {
	jackofalltrades: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Jack Of All Trades');
				return null;
			}
		},
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
		},
		onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'ability: Jack Of All Trades');
					}
					return null;
				}
		},
		onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if ((status.id === 'confusion' || status.id === 'yawn' || status.id === 'flinch') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'ability: Jack Of All Trades');
					return null;
				}
		},
		onModifyMove(move, pokemon) {
			const moveSlot = pokemon.moveSlots.find(move => move.pp === 0) ||
				pokemon.moveSlots.find(move => move.pp < move.maxpp);
			if (!moveSlot) return;
			moveSlot.pp += 10;
			if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp;
			this.add('-activate', pokemon, 'ability: Jack Of All Trades', moveSlot.move, '[restored]');
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Jack Of All Trades",
		rating: 5,
		num: 2000,
	},
	fearless: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target.hp && target.volatiles['laserfocus']) {
				this.actions.useMove('retaliate', this.effectState.target); 
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.id === 'retaliate') { 
				move.type = 'Water';
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.id === 'retaliate') { 
			return typeMod + this.dex.getEffectiveness('Fire', type);
			}
		},
		flags: {},
		name: "Fearless",
		rating: 5,
		num: 2001,
	},
	stillhunter: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				source.addVolatile('stillhunter');
			}
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'Still Hunter');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['stillhunter'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to Hunt');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				for (const target of pokemon.foes()) {
				if (damage) {
					this.heal(damage, target, pokemon);
					}
				}
			},
		},
		flags: {},
		name: "Still Hunter",
		rating: 5,
		shortDesc: "When hit by an attack, pokemon gains 1/8th of attacker's hp each turn.",
		num: 2002,
	},
	flurryfighter: {
		num: -7,
		name: "Flurry Fighter",
		shortDesc: "Contact moves hit four times, but have 1/2 damage.",
		onModifyMove(move, pokemon) {
			if (move.flags['contact']) {
				if(!move.multihit) {
					move.multihit = 1;
				}
				move.multihit = move.multihit * 4;
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				this.debug('Flurry Fighter debuff');
				return this.chainModify(0.5);
			}
		},
		flags: {},
	},
	blackpearls: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Black Pearls's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 10)) {
				target.addVolatile('confusion', source, move);
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.volatiles['confusion']) {
					this.add('-activate', pokemon, 'ability: Black Pearls');
					target.addVolatile('coerce');
				}
			}
		},
		flags: {},
		name: "Black Pearls",
		rating: 4.5,
		shortDesc: "Moves: 30% Confuse. If Confused, Coerces the target at the end of the turn.",
		num: 3000,
	},
	seismicsense: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				move.accuracy = true;
				if (!target.addVolatile('seismicsense')) {
					this.add('-immune', target, '[from] ability: Seismic Sense');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('seismicsense');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Seismic Sense');
			},
			onModifyDefPriority: 6,
			onModifyDef(def) {
				return this.chainModify(1.5);
			},
			onBasePowerPriority: 19,
			onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Ground') {
				return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Seismic Sense', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Seismic Sense",
		rating: 3.5,
		shortDesc: "When hit by ground move, Def 1.5x and ground move power 1.5x. ground Immunity.",
		num: 2090,
	},
	flytrap: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.id === 'snaptrap') return;
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.actions.useMove('Snap Trap', this.effectState.target);
			}
		},
		flags: {},
		name: "Flytrap",
		rating: 5,
		shortDesc: "When hit by a contact move, uses Snap Trap on that pokemon.",
		num: 2008,
	},
	megasol: {
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (this.field.weather !== 'sunnyday') {
				(this.dex.conditions.getByID('sunnyday' as ID) as any).onWeatherModifyDamage
					.call(this, damage, attacker, defender, move);
			}
		},
		flags: {},
		name: "Mega Sol",
		rating: 3,
		shortDesc: "This Pokemon's moves are used as if the effects of Sun were active.",
		num: 315,
		// Partially implemented in Pokemon.effectiveWeather() in sim/pokemon.ts
	},
};
