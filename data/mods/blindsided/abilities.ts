const weatherMoves = ['weatherball', 'solarbeam', 'solarblade', 'thunder', 'hurricane', 'weatherball', 'blizzard'];
export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	balancedout: {
		shortDesc: "The Pokémon's stats rise after using a move: SpA if phys, Atk if spec, Def + SpD if status.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.category === 'Physical') this.boost({spa: 1}, source, source);
			if (move.category === 'Special') this.boost({atk: 1}, source, source);
			if (move.category === 'Status') this.boost({def: 1, spd: 1}, source, source);
		},
		name: "Balanced Out",
		rating: 5, // holy
		num: -1001,
	},
	bananatrap: {
		shortDesc: "Opposing Grass-types are unable to switch out.",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Grass') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.knownType || pokemon.hasType('Grass')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Banana Trap",
		rating: 5,
		num: -1002,
	},
	castlesproud: {
		shortDesc: "Boosts Rock, Ground and Steel moves by 1.2x.",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
				this.debug("Castle's Proud boost");
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Castle's Proud",
		rating: 4,
		num: -1003,
	},
	chickenout: {
		shortDesc: "When its HP reaches 0, this Pokémon retreats to the party, and then...",
		name: "Chicken Out",
		onBeforeSwitchIn(pokemon) {
			if (pokemon.headless) {
				pokemon.setAbility('wonderguard');
				pokemon.baseAbility = 'wonderguard';
				pokemon.ability = 'wonderguard';
				pokemon.headless = false;
				pokemon.switchedIn = undefined;
			}
		},
		onFaint(pokemon) {
			if (pokemon.species.baseSpecies === 'Poultergeist' && !pokemon.transformed && !pokemon.headless && this.canSwitch(pokemon.side)) {
				if (pokemon.formeChange('Poultergeist-Headless', this.effect, true)) {
					this.add('-ability', pokemon, 'Chicken Out');
					this.add('-message', `${pokemon.name} ran off somewhere...`);
					pokemon.headless = true;
					pokemon.maxhp = 1;
					pokemon.hp = 1;
				}
			}
		},
		isUnbreakable: true,
		isPermanent: true,
		rating: 5,
		num: -1004,
	},
	coloredjewel: {
		shortDesc: "Adds a type to the Pokémon that matches the current weather.",
		onStart(pokemon) {
			if (this.field.terrain) {
				pokemon.addVolatile('coloredjewel');
			} else {
				const types = pokemon.baseSpecies.types;
				if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Colored Jewel');
				this.hint("Like Mimicry, Transform Colored Jewel changes you to your original un-transformed types.");
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			delete pokemon.volatiles['coloredjewel'];
			pokemon.addVolatile('coloredjewel');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['coloredjewel'];
		},
		condition: {
			onStart(pokemon) {
				let newType;
				switch (pokemon.effectiveWeather()) {
					case 'sunnyday':
					case 'desolateland':
						newType = 'Fire';
						break;
					case 'raindance':
					case 'primordialsea':
						newType = 'Water';
						break;
					case 'hail':
						newType = 'Ice';
						break;
					case 'sandstorm':
						newType = 'Rock';
						break;
					// Weather Ball doesn't change type for Delta Stream
				}
				if (!newType) return;
				if (pokemon.hasType(newType) || !pokemon.addType(newType)) return;
				this.add('-start', pokemon, 'typeadd', newType, '[from] Ability: Colored Jewel');
			},
			onUpdate(pokemon) {
				if (!this.field.weather) {
					const types = pokemon.species.types;
					if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
					this.add('-activate', pokemon, 'ability: Colored Jewel');
					this.add('-end', pokemon, 'typechange', '[silent]');
					pokemon.removeVolatile('coloredjewel');
				}
			},
		},
		name: "Colored Jewel",
		rating: 3,
		num: -1005,
	},
	debilitate: {
		shortDesc: "Lowers adjacent opponents' Special Attack on entry.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Debilitate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Debilitate",
		rating: 4,
		num: -1006,
	},
	echolocation: {
		shortDesc: "The Pokémon receives 1/2 damage from sound moves. Its own have 1.3x power.",
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Echolocation boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				this.debug('Echolocation weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Echolocation",
		rating: 3.5,
		num: -1007,
	},
	flameboyant: {
		shortDesc: "Special Moxie but your defense lowers by 1 when it activates.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({def: -1 * length, spa: length}, source);
			}
		},
		name: "Flameboyant",
		rating: 3,
		num: -1008,
	},
	freezing: {
		shortDesc: "Speed: -2 stages after using a status move, +2 stages after using an attacking move.",
		onAfterMove(source, target, move) {
			if (!move || !target) return;
			if (move.category === 'Status') {
				this.boost({spe: -2}, source, source);
			} else {
				this.boost({spe: 2}, source, source);
			}
		},
		name: "Freezing",
		rating: 3,
		num: -1009,
	},
	immolate: {
		shortDesc: "Restores HP by 50% of the damage dealt when using a Fire move, 1/8 when an opposing Pokémon is hurt by a burn.",
		onModifyMove(move) {
			if (move.type === 'Fire') {
				move.drain = [1, 2];
			}
		},
		onAnyDamage(damage, target, source, effect) {
			const pokemon = this.effectData.target;
            if (target.side === pokemon.side) return;
            if (effect && effect.id === 'brn') {
                this.heal(pokemon.baseMaxhp / 8, pokemon);
            }
		},
		name: "Immolate",
		rating: 4,
		num: -1010,
	},
	mercifulsky: {
		shortDesc: "The Pokémon is immune to moves that interact with weather.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water' || move.type === 'Fire' || weatherMoves.includes(move.id)) {
				this.add('-immune', target, '[from] ability: Merciful Sky');
				return null;
			}
		},
		name: "Merciful Sky",
		rating: 4,
		num: -1011,
	},
	mythicswordsman: {
		shortDesc: "The Pokémon's contact moves become special.",
		onModifyMove(move) {
			if (move.flags['contact']) {
				if (move.category !== 'Special') move.category = 'Special';
			}
		},
		name: "Mythic Swordsman",
		rating: 3,
		num: -1012,
	},
	mythicalpresence: {
		shortDesc: "Lowers adjacent opponents' Special Attack on entry.", // this happened twice independently haha
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Mythical Presence', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Mythical Presence",
		rating: 4,
		num: -1013,
	},
	persistence: {
		shortDesc: "Immune to flinching. Raises Attack when hit with a move that could cause flinching.",
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onDamagingHit(damage, target, source, move) {
			let activated = false;
			if (move.secondaries) {
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') activated = true;
				}
			}
			if (activated) this.boost({atk: 1});
		},
		name: "Persistence",
		rating: 2.5,
		num: -1014,
	},
	revolution: {
		shortDesc: "The Pokémon's stat changes are inverted each time one of its stats is raised or lowered.",
		onAfterEachBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let success = false;
			let i: BoostName;
			for (i in target.boosts) {
				if (target.boosts[i] === 0) continue;
				target.boosts[i] = -target.boosts[i];
				success = true;
			}
			if (!success) return false;
			this.add('-invertboost', target, '[from] ability: Revolution');
		},
		name: "Revolution",
		rating: 4.5,
		num: -1015,
	},
	toxicarmor: {
		shortDesc: "Poison immunity. Draws in Poison-type moves to raise Special Defense.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				if (!this.boost({spd: 1})) {
					this.add('-immune', target, '[from] ability: Toxic Armor');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Poison' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Toxic Armor');
				}
				return this.effectData.target;
			}
		},
		name: "Toxic Armor",
		rating: 3,
		num: -1016,
	},
	trickster: { // coded by ink
		shortDesc: "Status moves have -1 priority but are used twice.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				return priority - 1;
			}
		},
		onBeforeMove(target, source, move) {
			if (move.category === 'Status') {
				this.useMove(move, target, source);
			}
		},
		name: "Trickster",
		rating: 3,
		num: -1017,
	},
	aromaveil: {
        onAllyTryAddVolatile(status, target, source, effect) {
            if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment', 'piercingrampage'].includes(status.id)) {
                if (effect.effectType === 'Move') {
                    const effectHolder = this.effectData.target;
                    this.add('-block', target, 'ability: Aroma Veil', '[of] ' + effectHolder);
                }
                return null;
            }
        },
        name: "Aroma Veil",
        rating: 2,
        num: 165,
    },
	zenmode: {
		desc: "If this Pokemon is a Darmanitan, Darmanitan-Galar or Zawa, it changes to Zen Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan or Zawa's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode. This Ability cannot be removed or suppressed.",
		shortDesc: "If Darmanitan or Zawa, at end of turn changes Mode to Standard if > 1/2 max HP, else Zen.",
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' && pokemon.baseSpecies.baseSpecies !== 'Zawa' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (pokemon.species.baseSpecies === 'Darmanitan' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.species.name.includes('Zawa')) {
					if (pokemon.species.id !== 'zawazen') pokemon.formeChange('Zawa-Zen');
					if (pokemon.hasGoneZen) {
						const species = this.dex.getSpecies(pokemon.species.name);
						const abilities = species.abilities;
						const baseStats = species.baseStats;
						const type = species.types[0];
						if (species.types[1]) {
							const type2 = species.types[1];
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
						} else {
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
						}
					} else {
						pokemon.hasGoneZen = true;
					}
				} else if (pokemon.species.name.includes('Darmanitan')) {
					if (!pokemon.species.name.includes('Galar')) {
						if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
					} else {
						if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
					}
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		isPermanent: true,
		name: "Zen Mode",
		rating: 0,
		num: 161,
	},
	stancechange: {
		desc: "If this Pokémon is an Aegislash or a Tactaval, it changes to Blade Forme or Torpedo Form before attempting to use an attacking move, and changes to Shield Forme or Anchor Form before attempting to use King's Shield.",
		shortDesc: "Changes Aegislash/Tactaval to Blade Forme/Torpedo Form before an attack, Shield Forme/Anchor Form before King's Shield or Sail Wave.",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (
				(attacker.species.baseSpecies !== 'Aegislash' && attacker.species.baseSpecies !== 'Tactaval') || attacker.transformed
			) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			if (attacker.species.baseSpecies === 'Aegislash') {
				const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
				if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			} else if (attacker.species.baseSpecies === 'Tactaval') {
				const targetForme = (move.id === 'kingsshield' || move.id === 'sailwave' ? 'Tactaval' : 'Tactaval-Torpedo');
				if (attacker.species.name !== targetForme) {
					attacker.formeChange(targetForme);
					if (targetForme === 'Tactaval') {
						this.add('-message', `${attacker.name} changed to Anchor Form!`);
						this.add('-start', attacker, 'typechange', attacker.getTypes(true).join('/'), '[silent]');
					} else {
						this.add('-message', `${attacker.name} changed to Torpedo Form!`);
						this.add('-start', attacker, 'typechange', attacker.getTypes(true).join('/'), '[silent]');
						if (!this.effectData.busted) { // this is just to make a dt that only shows up once per Tactaval
							const species = this.dex.getSpecies(attacker.species.name);
							const abilities = species.abilities;
							const baseStats = species.baseStats;
							const type = species.types[0];
							if (species.types[1]) {
								const type2 = species.types[1];
								this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
							} else {
								this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
							}
							this.effectData.busted = true;
						}
					}
				}
			}
		},
		isPermanent: true,
		name: "Stance Change",
		rating: 4,
		num: 176,
	},
	fluffy: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		onModifyMove(move, attacker) {
            if (move.id === 'fluffypress') {
                move.basePower = 160;
            }
        },
		name: "Fluffy",
		rating: 3.5,
		num: 218,
	},
    persistent: {
		name: "Persistent",
		rating: 3,
		num: -4,
	},
};

