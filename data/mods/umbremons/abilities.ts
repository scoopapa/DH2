export const Abilities: { [abilityid: string]: ModdedAbilityData; } = {
	// New Abilities
	massive: {
		onFoeModifyDamage(relayVar, target, source, move) {
		// If an allAdjacentFoes move is targeting a massive Pokemon's side, it's now a single target move and has its spread damage nerf neutralized
		if (move.target === 'allAdjacentFoes')
			this.chainModify(1 / 0.75);
		},
		onAllyTryHit(target, source, move) {
			if (['allAdjacentFoes', 'allAdjacent'].includes(move.target)) {
				for (const allyActive of target.adjacentAllies()) {
					// Announcing the ability when it procs
                			if (allyActive.ability === 'massive' && allyActive != source) {
						this.add('-ability', allyActive, 'Massive');
						return null;
					}
            	}
			}
		},
		num: -1,
		flags: {breakable: 1},
		name: "Massive",
		shortDesc: "Allies are always protected from spread moves.",
	},
	masquerade: {
		num: -2,
		desc: "This Pokémon inherits the Ability of the last unfainted Pokemon in its party until it takes direct damage from another Pokémon's attack. Permanent abilities cannot be copied.",
		shortDesc: "Inherits the Ability of the last party member. Wears off when attacked.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp || pokemon.volatiles['masquerade']) return;
			pokemon.addVolatile('masquerade');
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (
					pokemon.side.pokemon[i].fainted ||
					pokemon.side.pokemon[i].getAbility().flags['notrace']) {
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
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Masquerade",
	},
	// Adjusted Abilities
	moldbreaker: {
		inherit: true,
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			move.ignoreAbility = true;
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		shortDesc: "This Pokemon's moves and their effects ignore abilities and redirection.",
		desc: "This Pokemon's moves and their effects ignore abilities and redirection.",
	},
	stalwart: {
		inherit: true,
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Stalwart');
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			move.ignoreAbility = true;
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		shortDesc: "This Pokemon's moves and their effects ignore abilities and redirection.",
		desc: "This Pokemon's moves and their effects ignore abilities and redirection.",
	},
	propellertail: {
		inherit: true,
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Propeller Tail');
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			move.ignoreAbility = true;
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		shortDesc: "This Pokemon's moves and their effects ignore abilities and redirection.",
		desc: "This Pokemon's moves and their effects ignore abilities and redirection.",
	},
	thickfat: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Thick Fat');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn' && status.id !== 'frz') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Thick Fat');
			}
			return false;
		},
		shortDesc: "Fire-/Ice-type deal half to this Pokemon. Cannot be burned or frozen.",
		desc: "If a Pokemon uses a Fire- or Ice-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon. Additionally, this Pokemon cannot be burned or frozen, and obtaining this ability will also cure them of these statuses.",
	},
	healer: {
		inherit: true,
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				this.heal(allyActive.baseMaxhp / 8, allyActive, pokemon);
			}
		},
	},
};
