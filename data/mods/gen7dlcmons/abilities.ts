export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	guardian: {
		shortDesc: "On switch-in, protects the team from critical hits.",
		onStart(source) {
			source.side.addSideCondition('luckychant');
		},
		name: "Guardian",
		rating: 3,
		num: -1000,
	},
	duelist: {
		shortDesc: "Raises Attack when a target switches out.",
		onAnySwitchOut(pokemon) {
			const action = this.queue.willMove(this.effectData.target);
			if (!action) return;
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return;
			if (target === pokemon) {
				this.boost({atk: 1}, this.effectData.target);
			}
		},
		name: "Duelist",
		rating: 5,
		num: -1001,
	},
	knowledge: {
		shortDesc: "Reveals a random move of each adjacent opponent on entry.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Knowledge');
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				let potentialMoves = 0;
				for (const moveSlot of target.moveSlots) {
					if (moveSlot.revealed) continue;
					potentialMoves++;
				}
				let r = 0;
				if (potentialMoves) {
					r = this.random(potentialMoves);
				}
				for (const moveSlot of target.moveSlots) {
					if (moveSlot.revealed) continue;
					if (r === 0) {
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} knows the move ${this.dex.getMove(moveSlot.move).name}!`);
					}
					r--;
					moveSlot.revealed = true;
					return;
				}
			}
		},
		name: "Knowledge",
		rating: 3,
		num: -1002,
	},
	willpower: {
		shortDesc: "This Pokémon receives 3/4 damage from supereffective attacks.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Willpower neutralize');
				return this.chainModify(0.75);
			}
		},
		name: "Willpower",
		rating: 3,
		num: -1003,
	},
	emotion: {
		shortDesc: "On entry, this Pokémon's secondary type changes to match an adjacent opponent.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted || !this.isAdjacent(target, pokemon)) continue;
				if (!target.getTypes()[1]) continue;
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Psychic" ? target.getTypes()[1] : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] ability: Emotion');
				return;
			}
		},
		name: "Emotion",
		rating: 3,
		num: -1004,
	},
	joust: {
		desc: "The power of any Pokémon's move is multiplied by 1.3 if it is the first to move in a turn. Does not affect Doom Desire and Future Sight.",
		shortDesc: "The attacks of the first Pokémon to move in a turn have 1.3x power.",
		onAnyBasePowerPriority: 21,
		onAnyBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Joust boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Joust",
		rating: 2.5,
		num: -1005,
	},
	hidingcapabilities: {
		shortDesc: "Protected from damage on switch-in, but trapped for two turns.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && !target.activeTurns) {
				this.add('-ability', target, 'Hiding Capabilities');
				this.add('-message', `${target.name} is protected from direct damage this turn!`)
				return 0;
			}
		},
		onTrapPokemon(pokemon) {
			if (pokemon.activeTurns >= 2) return;
			pokemon.tryTrap();
		},
		onModifyMove(source, move) {
			if (source.activeTurns >= 2) return;
			if (move.selfSwitch) {
				this.add('-ability', source, 'Hiding Capabilities');
				this.add('-message', `${source.name} can't switch out!`);
				delete move.selfSwitch;
			}
		},
		name: "Hiding Capabilities",
		rating: 5,
		num: -1006,
	},
	ballistician: {
		desc: "This Pokémon's ballistic moves have their power multiplied by 1.5. Ballistic moves include Bullet Seed, Octazooka, Barrage, Rock Wrecker, Zap Cannon, Acid Spray, Aura Sphere, Focus Blast, and all moves with Ball or Bomb in their name.",
		shortDesc: "This Pokémon's ballistic moves have 1.5x power.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.5);
			}
		},
		name: "Ballistician",
		rating: 3,
		num: -1007,
	},
	lifeabsorption: {
		shortDesc: "Restores HP by 50% of the damage dealt when KOing a target.",
		name: "Life Absorption",
		onAnyDamagingHitOrder: 1,
		onAnyDamagingHit(damage, target, source, move) {
			if (!target.hp && source === this.effectData.target) {
				source.heal(target.getUndynamaxedHP(damage) / 2);
			}
		},
		rating: 3,
		num: -1008,
	},
	sifting: {
		shortDesc: "The Pokémon can switch out during a semi-invulnerable turn.",
		name: "Sifting",
		// implemented in conditions.ts
		rating: 3,
		num: -1009,
	},
};