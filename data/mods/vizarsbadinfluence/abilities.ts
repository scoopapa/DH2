export const Abilities: {[abilityid: string]: AbilityData} = {
	forecast: {
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if (this.effectData.switchingIn) {
				if (pokemon.hasItem('damprock')) {
					this.field.setWeather('raindance');
				}
				if (pokemon.hasItem('heatrock')) {
					this.field.setWeather('sunnyday');
				}
				if (pokemon.hasItem('smoothrock')) {
					this.field.setWeather('sandstorm');
				}
				if (pokemon.hasItem('icyrock')) {
					this.field.setWeather('hail');
				}
			}
		},
		onUpdate(pokemon) {
			if (pokemon.species.id !== 'catastroform') return;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id === 'catastroform') pokemon.types[1] = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id === 'catastroform') pokemon.types[1] = 'Water';
				break;
			case 'hail':
				if (pokemon.species.id === 'catastroform') pokemon.types[1] = 'Ice';
				break;
			case 'sandstorm':
				if (pokemon.species.id === 'catastroform') pokemon.types[1] = 'Rock';
				break;
			default:
				if (pokemon.species.id === 'catastroform') return;
				break;
			}
		},
		name: "Forecast",
		shortDesc: "Upon Entry, summons Weather depending on held Weather Rock. Gets secondary typing matching weather.",
		rating: 2,
		num: 59,
	},
	asonearrokuda: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		isPermanent: true,
		name: "As One (Arrokuda)",
		shortDesc: "Mold Breaker + Swift Swim",
		rating: 4,
		num: 1001,
	},
	shadowworld: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Shadow World');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target !== source || move.category !== 'Status' || move.type === 'Ghost' || move.type === 'Dark') {
				if (!move.auraBooster) move.auraBooster = this.effectData.target;
				if (move.auraBooster !== this.effectData.target) return;
				return this.chainModify(1.2);
			} else if (target !== source || move.category !== 'Status' || move.type === 'Fairy' || move.type === 'Psychic') {
				if (!move.auraBooster) move.auraBooster = this.effectData.target;
				if (move.auraBooster !== this.effectData.target) return;
				return this.chainModify(0.8);
			}
		},
		name: "Shadow World",
		shortDesc: "When this Ability is active, Ghost & Dark moves have 1.2x power. Psychic & Fairy have 0.8x power.",
		rating: 3,
		num: 1002,
	},
	quickdraw: {
		onModifyPriority(priority, source, move) {
			if (source.activeMoveActions < 1) {
				return priority + 1;
			} else if (source.activeMoveActions > 1) {
				return priority + 0;
			}
		},
		name: "Quick Draw",
		shortDesc: "User's moves have increased priority in the first turn.",
		rating: 2.5,
		num: 259,
	},
	sinkorswim: {
		name: "Sink or Swim",
		shortDesc: "On switch-in, lowers adjacent opponents' Speed by 1 stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Sink or Swim', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		rating: 3,
		num: 1003,
	},
	oblivious: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Oblivious');
			} else if (effect.id === 'sinkorswim') {
				delete boost.spe; 
				this.add('-immune', target, '[from] ability: Oblivious');
			}
		},
	},
	owntempo: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Own Tempo');
			} else if (effect.id === 'sinkorswim') {
				delete boost.spe; 
				this.add('-immune', target, '[from] ability: Own Tempo');
			}
		},
	},
	scrappy: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, "[from] ability: Scrappy");
			} else if (effect.id === 'sinkorswim') {
				delete boost.spe; 
				this.add('-immune', target, "[from] ability: Scrappy");
			}
		},
	},
	sandveil: {
		shortDesc: "If Sandstorm is active, this Pokemon's defence is 1.5x; immunity to Sandstorm.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		id: "sandveil",
		name: "Sand Veil",
		rating: 3,
		num: 146,
	},
	springfever: {
		shortDesc: "While active, any Pokémon using a Fire move loses 1/4 max HP.",
		onStart(pokemon) {
			this.add('-message', `${pokemon.name} fills the air with explosive powder!`);
		},
		onAnyTryMove(target, source, move) {
			if (move.type === 'Fire') {
				this.add('-activate', source, 'move: Powder');
				this.damage(this.clampIntRange(Math.round(source.maxhp / 4), 1));
				return false;
			}
		},
		name: "Spring Fever",
		rating: 4,
		num: 1004,
	},
	summerdays: {
		shortDesc: "If Sunny Day is active, this Pokemon's Sp. Atk is 1.5x; loses 1/8 max HP per turn.",
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		name: "Summer Days",
		rating: 2,
		num: 1005,
	},
	autumnleaves: {
		shortDesc: "This Pokémon's Grass attacks add Ghost to the targets' type(s).",
		onSourceHit(target, source, move) {
			if (move.category !== 'Status' && move.type === 'Grass') {
				if (target.hasType('Ghost')) return;
				if (!target.addType('Ghost')) return;
				this.add('-start', target, 'typeadd', 'Ghost', '[from] Ability: Autumn Leaves');

				if (target.side.active.length === 2 && target.position === 1) {
					// Curse Glitch
					const action = this.queue.willMove(target);
					if (action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			}
		},
		name: "Autumn Leaves",
		rating: 4,
		num: 1006,
	},
	winterstale: {
		shortDesc: "Damage of Ice moves used on consecutive turns is increased, max 1.5x (2x in Hail).",
		onStart(pokemon) {
			pokemon.addVolatile('winterstale');
		},
		condition: {
			onStart(pokemon) {
				this.effectData.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('winterstale') && !pokemon.hasAbility('asonesawsbuck')) {
					pokemon.removeVolatile('winterstale');
					return;
				}
				if (move.type === 'Ice' && pokemon.moveLastTurnResult) {
					this.effectData.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					this.effectData.numConsecutive = 1;
				} else {
					this.effectData.numConsecutive = 0;
				}
				this.effectData.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [0x1000, 0x1333, 0x1666, 0x1999, 0x1CCC, 0x2000];
				const numConsecutive = this.effectData.numConsecutive > 5 ? 5 : this.effectData.numConsecutive;
				if (['hail'].includes(source.effectiveWeather())) {
					return this.chainModify([dmgMod[numConsecutive], 0x1000]);
				} else {
					return damage * (1 + (this.effectData.numConsecutive / 10));
				}
			},
		},
		name: "Winter's Tale",
		rating: 4,
		num: 1007,
	},
	libero: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['bullet']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['bullet']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		name: "Libero",
		shortDesc: "This Pokemon blocks ballistic moves and instead uses the move against the original user.",
		rating: 4.5,
		num: 236,
	},
	intrepidblade: {
		onModifyMove(pokemon, move) {
			if (['solarblade', 'leafblade', 'precipiceblades', 'behemothblades', 'sacredsword', 'secretsword', 'cut', 'psychocut', 
			'aircutter', 'furycutter', 'slash', 'airslash', 'nightslash'].includes(move.id) && pokemon.species.id !== 'zacian') {
				move.basePower *= 0.8;
			}
		},
		onModifyPriority(priority, source, target, move) {
			if (['solarblade', 'leafblade', 'precipiceblades', 'behemothblades', 'sacredsword', 'secretsword', 'cut', 'psychocut', 
			'aircutter', 'furycutter', 'slash', 'airslash', 'nightslash'].includes(move.id) && source.species.id !== 'zacian') {
				return priority + 1;
			}
		},
		name: "Intrepid Blade",
		shortDesc: "If Zacian: Blade/Slash/Cut moves have +1 priority & 20% less power.",
		rating: 3.5,
		num: 1008,
	},
	intrepidcrown: {
		onModifyMove(pokemon, move) {
			if (['solarblade', 'leafblade', 'precipiceblades', 'behemothblades', 'sacredsword', 'secretsword', 'cut', 'psychocut', 
			'aircutter', 'furycutter', 'slash', 'airslash', 'nightslash'].includes(move.id) && pokemon.species.id !== 'zaciancrowned') {
				move.basePower *= 1.2;
			}
		},
		onModifyPriority(priority, source, target, move) {
			if (['solarblade', 'leafblade', 'precipiceblades', 'behemothblades', 'sacredsword', 'secretsword', 'cut', 'psychocut', 
			'aircutter', 'furycutter', 'slash', 'airslash', 'nightslash'].includes(move.id) && source.species.id !== 'zaciancrowned') {
				return priority - 1;
			}
		},
		name: "Intrepid Crown",
		shortDesc: "If Zacian-Crowned: Blade/Slash/Cut moves have -1 priority & 20% more power.",
		rating: 3.5,
		num: 1009,
	},
	
	mountaineer: {
		inherit: true,
		isNonstandard: null,
	},
	persistent: {
		inherit: true,
		isNonstandard: null,
	},
};