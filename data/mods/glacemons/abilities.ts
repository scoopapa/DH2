export const Abilities: { [abilityid: string]: ModdedAbilityData; } = {
	protean: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onSwitchIn() { },
		rating: 4.5,
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type.",
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
	},
	velocity: {
		onModifyMove(move) {
			if (move.flags['contact']) {
				move.overrideOffensiveStat = 'spe';
			}
		},
		onAnyModifyBoost(boosts, pokemon) {
			const velocityUser = this.effectState.target;
			if (velocityUser === this.activePokemon) {
				boosts['spe'] = 0;
			}
		},
		flags: {},
		name: "Velocity",
		shortDesc: "This Pokemon's contact moves use its Speed for damage calculation. Doesn't take Speed boost into account in the damage calculation.",
		desc: "This Pokemon's contact moves use its Speed for damage calculation, without Speed boosts.",
		rating: 3.5,
		num: -1,
	},
	routeclosed: {
		onTryHit(target, source, move) {
			if (target !== source && move.selfSwitch) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Route Closed');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Route Closed",
		desc: "This Pokemon is immune to pivot moves and restores 1/4 of its maximum HP, rounded down, when hit by a pivot move. The opponent does not get switched out by its pivot move if used on a Pokémon with this ability. Ex. Landorus-T uses U-Turn on Pokemon with this ability, the Pokemon with the ability is healed 25% HP and Landorus does not get switched out by the move.",
		shortDesc: "This Pokemon is immune to pivot moves and restores 1/4 of its maximum HP when hit by a pivot move. Blocks pivoting.",
		rating: 3.5,
		num: -2,
	},
	honeygather: {
		name: "Honey Gather",
		shortDesc: "At the end of each turn, if this Pokemon has no item, 50% chance to get Honey, 100% chance in Misty Terrain.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hp && !pokemon.item) {
				if (this.field.isTerrain('mistyterrain')) {
					pokemon.setItem('honey');
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Honey Gather');
				}
				if (this.randomChance(5, 10)) {
					pokemon.setItem('honey');
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Honey Gather');
				}
			}
			if (pokemon.hasItem('honey')) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		rating: 3,
		num: 118,
	},
	runitback: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Run It Back');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					target.addVolatile('encore');
				}
			}
		},
		flags: {},
		name: "Run It Back",
		shortDesc: "On switch-in, encore the opponents for one turn.",
		rating: 3.5,
		num: -3,
	},
	solarpower: {
		inherit: true,
		// All effects are coded on the moves in moves.ts
		desc: "If Sunny Day is active, this Pokemon's Special Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn. These effects are prevented if the Pokemon is holding a Utility Umbrella. This Pokemon's moves behave as if Sunny Day is always active.",
		shortDesc: "If Sunny Day is active, this Pokemon's Sp. Atk is 1.5x; loses 1/8 max HP per turn. Pokemon's moves act as if Sunny Day is always active.",
	},
	battlearmor: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.8);
		},
		shortDesc: "This Pokemon cannot be struck by a critical hit. Damage taken from attacks is reduced by 20%.",
	},
	shellarmor: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.8);
		},
		shortDesc: "This Pokemon cannot be struck by a critical hit. Damage taken from attacks is reduced by 20%.",
	},
	anticipation: {
		inherit: true,
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						const sourceDef = pokemon.storedStats.def;
						const sourceSpD = pokemon.storedStats.spd;
						if (sourceDef >= sourceSpD) {
							this.boost({ def: 1 }, pokemon);
						}
						else {
							this.boost({ spd: 1 }, pokemon);
						}
						this.add('-ability', pokemon, 'Anticipation');
						return;
					}
				}
			}
		},
		desc: "On switch-in, this Pokemon is alerted and raises its highest defense stat by 1 if any opposing Pokemon has an attack that is super effective against this Pokemon, or an OHKO move. This effect considers any move that deals direct damage as an attacking move of its respective type, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves.",
		shortDesc: "On switch-in, this Pokemon shudders if any foe has a supereffective or OHKO move. Raises its highest defense stat by 1.",
	},
	rkssystem: {
		inherit: true,
		flags: {}, // yes deleting the flags is an ugly way to do it but I need to find a better one lol
		onStart(pokemon) {
			const allTypes = {
				"Normal": "Tough Claws",
				"Grass": "Overgrow",
				"Fire": "Blaze",
				"Water": "Torrent",
				"Electric": "Download",
				"Ice": "Snow Warning",
				"Fighting": "Scrappy",
				"Poison": "Regenerator",
				"Ground": "Rocky Payload",
				"Flying": "Air Lock",
				"Psychic": "Magic Bounce",
				"Bug": "Tinted Lens",
				"Rock": "Solid Rock",
				"Ghost": "Intimidate",
				"Dragon": "Marvel Scale",
				"Dark": "Moxie",
				"Steel": "Iron Fist",
				"Fairy": "Pastel Veil"
			};
			const item = pokemon.getItem();
			if (!item.onMemory) return;
			const abilityToGive = allTypes[pokemon.types[0]];
			const oldAbility = pokemon.setAbility(abilityToGive);
			if (oldAbility) {
				this.add('-ability', pokemon, abilityToGive, '[from] ability: RKS System');
				return;
			}
			return oldAbility as false | null;
		}
	},
	hospitality: {
		inherit: true,
		onResidualOrder: 6,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'hospitality');
		},
		condition: {
			onSwap(target) {
				if (!target.fainted) {
					target.addVolatile('healoneturn');
					target.side.removeSlotCondition(target, 'hospitality');
				}
			},
			onResidual(pokemon) {
				if (pokemon.volatiles['healoneturn']) {
					this.heal(pokemon.baseMaxhp / 16);
					pokemon.removeVolatile('healoneturn');
				}
			},
		},
		shortDesc: "User and switch-in restore 1/16 Max HP at end of each turn.",
	},
	terashift: {
		inherit: true,
		onPreStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Terapagos') return;
			if (pokemon.getItem() === 'Special Tera Orb') return;
			if (pokemon.species.forme !== 'Terastal') {
				this.add('-activate', pokemon, 'ability: Tera Shift');
				pokemon.formeChange('Terapagos-Terastal', this.effect, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
	},
};
