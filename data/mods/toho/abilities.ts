export const Abilities: {[abilityid: string]: AbilityData} = {
	shadowshroud: {
		onTryHit(pokemon, target, move) {
			if (pokemon !== target && move.type === 'Fairy') {
				this.add('-immune', pokemon, '[from] ability: Shadow Shroud');
				return null;
			}
		},
		//sun immunity implemented in scripts/pokemon
		flags: {breakable: 1},
		name: "Shadow Shroud",
		shortDesc: "This Pokemon is immune to Fairy-type moves and ignores the effects of sun.",
	},
	chronoblade: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move.flags['slicing'] && pokemon.hp >= pokemon.maxhp / 2) return priority + 1;
		},
		flags: {},
		name: "Chrono Blade",
		shortDesc: "This Pokemon's slicing moves have +1 priority while above half HP.",
	},
	vampirism: {
		onModifyMove(move) {
			if (move.flags['bite']) { 
				move.drain ||= [1, 2];
			}
		},
		flags: {},
		name: "Vampirism",
		shortDesc: "This Pokemon's biting moves heal 50% of the damage dealt.",
	},
	frozenworld: {
		onStart(source) {
			this.field.setWeather('blizzard');
		},
		flags: {},
		name: "Frozen World",
		shortDesc: "On switchin, this Pokemon sets Blizzard.",
	},
	shikigami: {
		onBeforeSwitchIn(pokemon) {
			pokemon.shikigami = false;
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				console.log(possibleTarget.set);
				if (!possibleTarget.fainted && possibleTarget.set.ability === 'Shikigami Master') {
					pokemon.shikigami = true;
					break;
				}
			}
		},
		onStart(pokemon) {
			if(pokemon.shikigami) this.add('-message', `${pokemon.name}'s magical abilities are being enhanced!`);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker) {
			if(attacker.shikigami) return this.chainModify(2);
		},
		flags: {},
		name: "Shikigami",
		shortDesc: "If a non-fainted teammate has Shikigami Master, this Pokemon's Sp. Atk is doubled.",
	},
	shikigamimaster: {
		onBeforeSwitchIn(pokemon) {
			pokemon.master = false;
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted && possibleTarget.set.ability === 'Shikigami Grandmaster') {
					pokemon.master = true;
					break;
				}
			}
		},
		onStart(pokemon) {
			if(pokemon.master) this.boost({spe: 1}, pokemon);
		},
		flags: {},
		name: "Shikigami Master",
		shortDesc: "If a non-fainted teammate has Shikigami Grandmaster, this Pokemon's Speed is raised by 1 on switchin.",
	},
	shikigamigrandmaster: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Shikigami Grandmaster');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		flags: {},
		name: "Shikigami Grandmaster",
		shortDesc: "If this Pokemon is the target of a foe's move, that move loses one additional PP.",
	},
	demonparade: {
		onModifySpe(spe, pokemon) {
			if(pokemon.adjacentFoes().length == 0) return;
			let target = this.sample(pokemon.adjacentFoes());
			if (target.status) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Demon Parade",
		shortDesc: "If any Pokémon on the opponent's side of the field is burned, this Pokémon's Speed is doubled.",
	},
	blindingsong: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Dark';
			}
		},
		flags: {},
		name: "Blinding Song",
		shortDesc: "This Pokemon's sound-based moves become Dark type.",
	},
	clearingstorm: {
		onAfterHit(target, pokemon, move) {
			if (move.flags['wind'] && !move.hasSheerForce) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] ability: Clearing Storm', '[of] ' + pokemon);
					}
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (move.flags['wind'] && !move.hasSheerForce) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] ability: Clearing Storm', '[of] ' + pokemon);
					}
				}
			}
		},
		flags: {},
		name: "Clearing Storm",
		shortDesc: "This Pokemon's wind moves remove its side's hazards.",
	},
	autumndecay: {
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status" && move.flags['wind']) {
				this.debug('Adding Autumn Decay poison');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.status === 'psn') return;
				}
				move.secondaries.push({
					chance: 100,
					status: 'psn',
				});
			}
		},
		flags: {},
		name: "Autumn Decay",
		shortDesc: "This Pokemon's wind moves have a 100% chance to poison the target.",
	},
	jealousy: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.target === 'normal' || move.target === 'any') {
				return this.chainModify(Math.min(2, 1 + 0.1 * defender.positiveBoosts()));
			}
		},
		flags: {},
		name: "Jealousy",
		shortDesc: "This Pokemon's single-target attacks deal 10% more damage for each of the target's stat boosts, up to 100%.",
	},
	delusion: {
		onResidual(pokemon) {
			if (pokemon.volatiles['confusion'] || this.field.isTerrain('psychicterrain')) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		flags: {},
		name: "Surge Surfer",
		shortDesc: "This Pokemon heals 1/8 of its max HP at the end of each turn while confused or in Psychic Terrain.",
	},
	surprise: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Surprise', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Surprise",
		shortDesc: "On switch-in, this Pokemon lowers the Sp. Atk of opponents by 1 stage.",
	},
	waterygrave: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.field.setWeather('raindance');
			}
		},
		flags: {},
		name: "Watery Grave",
		shortDesc: "This Pokemon summons Rain Dance if it attacks and KOes another Pokemon.",
	},
	magicoverdrive: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(1.3);
			}
		},
		onResidual(pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
			}
		},
		flags: {},
		name: "Magic Overdrive",
		shortDesc: "In Psychic Terrain, this Pokemon's Special Attack is 1.3x; loses 1/8 max HP per turn.",
	},
	echo: {
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Echo');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectState.target, '[from] ability: Echo');
			}
		},
		// echo part implemented in runMove in scripts/actions
		flags: {},
		name: "Echo",
		shortDesc: "After another Pokémon uses a sound move, this Pokémon uses the same move; Sound move immunity.",
	},
	healbydesire: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Heal by Desire');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Heal by Desire",
		shortDesc: "This Pokémon heals 1/4 of its max HP when hit by Ghost moves; Ghost Immunity.",
	},
	escapeartist: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			const trappingMoves = ['thousandwaves', 'anchorshot', 'spiritshackle', 'jawlock', 'ironring'];
			if(move.volatileStatus === 'partiallytrapped' || trappingMoves.includes(move.id)) this.boost({spa: 1}, target);
		},
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
		name: "Escape Artist",
		shortDesc: "This Pokémon cannot be trapped; If hit by a move with that effect, its Sp. Attack is increased by 1 stage.",
	},
	miraclemallet: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move.flags['hammer']) return priority + 1;
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags['hammer']) return this.chainModify(0.75);
		},
		flags: {},
		name: "Miracle Mallet",
		shortDesc: "This Pokemon's hammer moves have +1 priority but 0.75x power.",
	},
	pristinerhythm: {
		onStart(pokemon) {
			pokemon.addVolatile('pristinerhythm');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('pristinerhythm')) {
					pokemon.removeVolatile('pristinerhythm');
					return;
				}
				if (move.callsMove) return;
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 4505, 4915, 5324, 5734, 6144];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		flags: {},
		name: "Pristine Rhythm",
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 1.5x after 5 turns.",
	},
	worldofnightmares: {
		onStart(source) {
			if (this.field.getPseudoWeather('ultrasleep')) {
				this.add('-ability', source, 'World of Nightmares');
				//this.hint("All Pokemon are under Comatose effect!");
				this.field.pseudoWeather.ultrasleep.source = source;
				this.field.pseudoWeather.ultrasleep.duration = 0;
			} else {
				this.add('-ability', source, 'World of Nightmares');
				this.field.addPseudoWeather('ultrasleep');
				//this.hint("All Pokemon are under Comatose effect!");
				this.field.pseudoWeather.ultrasleep.duration = 0;
			}
		},
		onAnyTryMove(target, source, move) {
			if (['ultrasleep'].includes(move.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: World of Nightmares', move, '[of] ' + target);
				return false;
			}
		},
		onResidualOrder: 21,
		onResidualSubOrder: 2,
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('worldofnightmares')) {
					return;
				}
			}
			this.field.removePseudoWeather('ultrasleep');
		},
		name: "World of Nightmares",
		shortDesc: "This pokémon's opponents are considered asleep but are still able to move normally.",
	},
	lunatictorch: {
		onStart(source) {
			if (this.field.isTerrain('psychicterrain') && pokemon.effectiveWeather() == '') this.field.setWeather('sunnyday');
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('psychicterrain') && pokemon.effectiveWeather() == '') this.field.setWeather('sunnyday');
		},
		flags: {},
		name: "Lunatic Torch",
		shortDesc: "While Psychic Terrain is active, this Pokemon summons Sunny Day if there is no other weather.",
	},
	winterchill: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'blizzard'])) {
				return this.chainModify(1.3);
			}
		},
		flags: {},
		name: "Winter Chill",
		shortDesc: "If Snow/Blizzard is active, this Pokémon's Special Attack is 1.3x.",
	},
	fourseasons: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.id !== 'okinamatara' || pokemon.effectiveWeather() === '') return;
			let newType = [];
			newType.push(pokemon.baseSpecies.types[0]);
			switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					newType.push('Fire');
					break;
				case 'raindance':
				case 'primordialsea':
					newType.push('Water');
					break;
				case 'sandstorm':
					newType.push('Rock');
					break;
				case 'hail':
				case 'snow':
				case 'blizzard':
					newType.push('Ice');
					break;
			}
			this.add('-ability', pokemon, 'Four Seasons');
			if(pokemon.setType(newType)) this.add('-start', pokemon, 'typechange', newType.join('/'));
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		name: "Four Seasons",
		shortDesc: "If this Pokemon is Okina, its secondary type changes to match the active weather.",
	},
	haniwaforces: {
		onPrepareHit(source, target, move) {
			if (!source.volatiles['substitute'] || move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
			move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax) return;
			move.multihit = 2;
			move.multihitType = 'parentalbond';
		},
		// Damage modifier implemented in BattleActions#modifyDamage()
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		flags: {},
		name: "Haniwa Forces",
		shortDesc: "If this Pokémon has a substitute, its attacks hit twice. The second hit's damage is quartered.",
	},
	stampede: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.addVolatile('stampede');
			}
		},
		condition: {
			noCopy: true,
			duration: 2,
			onRestart() {
				this.effectState.duration = 2;
			},
			onFractionalPriorityPriority: -1,
			onFractionalPriority(priority, pokemon, target, move) {
				if (move.category !== 'Status') {
					pokemon.removeVolatile('stampede');
					return priority + 0.1;
				}
			},
		},
		flags: {},
		name: "Stampede",
		shortDesc: "If this Pokémon attacks and knocks out an opponent, its attack on the following turn goes first in its priority bracket.",
	},
	blacksmoke: {
		name: "Black Smoke",
		onStart(source) {
			let activated = false;
			for (const pokemon of source.foes()) {
				if (!activated) {
					this.add('-ability', source, 'Black Smoke');
					//this.add('-message', `${source.name} wants to have a fair fight!`);
				}
				activated = true;
				if (!pokemon.volatiles['blacksmoke']) {
					pokemon.addVolatile('blacksmoke');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectState.target;
			if (pokemon === source) return;
			for (const target of source.foes()) {
				if (!target.volatiles['blacksmoke']) {
					target.addVolatile('blacksmoke');
				}
			}
		},
		onEnd(pokemon) {
			for (const target of pokemon.foes()) {
				target.removeVolatile('blacksmoke');
			}
		},
		condition: {
			onTryBoost(boost, target, source, effect) {
				let showMsg = false;
				let i: BoostID;
				for (i in boost) {
					if (boost[i]! > 0) {
						delete boost[i];
						showMsg = true;
					}
				}
				if (showMsg && !(effect as ActiveMove).secondaries) {
					this.add('-activate', source, 'ability: Black Smoke');
					//this.add('-message', `${target.name} can't change its stats!`);
				}
			},
		},
		shortDesc: "Pokemon on the opponent's side cannot have their stats increased.",
	},
	ownership: {
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Ownership');
				return false;
			}
		},
		flags: {breakable: 1},
		name: "Ownership",
		shortDesc: "This Pokemon cannot lose its item due to another Pokémon's Ability or attack.",
	},
	dragoneater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dragon Eater');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Dragon Eater",
		shortDesc: "This Pokémon heals 1/4 of its max HP when hit by Dragon moves; Dragon Immunity.",
	},
};
