export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	runaway: {
		flags: {},
		name: "Run Away",
		rating: 0,
		num: 50,
		shortDesc: "This Pokemon can escape from Arena Trap and Mean Look.",
	},
	oblivious: {
		onModifyMove(move) {
			move.ignoreEvasion = true;
			move.ignoreDefensive = true;
		},
		flags: {},
		name: "Oblivious",
		rating: 1.5,
		num: 12,
		shortDesc: "This Pokemon ignores defensive stat stages when attacking.",
	},
	illuminate: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Illuminate",
		rating: 0.5,
		num: 35,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using an Electric-type attack.",
	},
	owntempo: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['encore', 'taunt'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Aroma Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		flags: {breakable: 1},
		name: "Own Tempo",
		rating: 1.5,
		num: 20,
		shortDesc: "This Pokemon cannot be taunted, Encored, or have its move redirected.",
	},
	pickup: { //placeholder
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.item) return;
			const pickupTargets = this.getAllActive().filter(target => (
				target.lastItem && target.usedItemThisTurn && pokemon.isAdjacent(target)
			));
			if (!pickupTargets.length) return;
			const randomTarget = this.sample(pickupTargets);
			const item = randomTarget.lastItem;
			randomTarget.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] ability: Pickup');
			pokemon.setItem(item);
		},
		flags: {},
		name: "Pickup",
		rating: 0.5,
		num: 53,
		shortDesc: "After this Pokemon loses its item, it will pick it back up the next turn.",
	},
  prankster: {
		inherit: true,
		gen: 3,
	},
	snowwarning: {
		onStart(source) {
			this.field.setWeather('snow');
		},
		flags: {},
		name: "Snow Warning",
		rating: 4,
		num: 117,
		gen: 3,
	},
	corrosion: {
		// Implemented in sim/pokemon.js:Pokemon#setStatus
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		flags: {},
		name: "Corrosion",
		rating: 2.5,
		num: 212,
		shortDesc: "This Pokemon can poison and hit Poison moves on a Pokemon regardless of its typing.",
		gen: 3,
	},
	arenatrap: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.isAdjacent(this.effectState.target)) return;
  		if (pokemon.hasAbility('runaway')) return;
			if (pokemon.isGrounded()) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source) || pokemon.hasAbility('runaway')) return;
			if (pokemon.isGrounded(!pokemon.knownType)) { // Negate immunity if the type is unknown
				pokemon.maybeTrapped = true;
			}
		},
		flags: {},
		name: "Arena Trap",
		rating: 5,
		num: 71,
	},
	disguise: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && ['mimikyu', 'mimikyutotem'].includes(target.species.id)) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id)) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id)) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id) && this.effectState.busted) {
				const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 4, pokemon, pokemon, this.dex.species.get(speciesid));
			}
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1,
		},
		name: "Disguise",
		rating: 3.5,
		num: 209,
		gen: 3,
		shortDesc: "(Mimikyu only) First hit deals 0 damage, breaks disguise and Mimikyu loses 1/4 of its max HP.",
  },
  slushrush: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow'])) {
				return this.chainModify(2);
			}
		},
		gen: 3,
	},
	frisk: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Frisk', '[of] ' + pokemon);
				}
			}
		},
		flags: {},
		name: "Frisk",
		rating: 1.5,
		num: 119,
		gen: 3,
	},
  	dryskin: {
		inherit: true,
		gen: 3,
	},
  	solidrock: {
		inherit: true,
		gen: 3,
	},
  	infiltrator: {
		inherit: true,
		gen: 3,
	},
  	longreach: {
		inherit: true,
		gen: 3,
	},
  	poisontouch: {
		inherit: true,
		gen: 3,
	},
	magmaarmor: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true) && (source.hasType('Fire') || source.status === 'brn')) {
				this.damage(source.baseMaxhp / 4, source, target);
			}
		},
		flags: {},
		name: "Magma Armor",
		rating: 0.5,
		num: 40,
		shortDesc: "Fire or burned foes making contact with this Pokemon lose 1/4 of their max HP.",
	},
  	hydration: {
		inherit: true,
		gen: 3,
	},
};
