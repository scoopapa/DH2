export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	accumulate: {
		desc: "If this Pokémon is a Mega Brambleghast, it calls for help and changes form at the end of each full turn it has been on the field, building up to Mega Brambleghast (Tangled Form) over five turns.",
		shortDesc: "More Brambleghast tangle up at the end of each turn.",
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Brambleghast' || pokemon.transformed || !pokemon.hp || !pokemon.activeTurns ||
				pokemon.species.id === 'brambleghast' || pokemon.species.id === 'brambleghastmegatangled'
			) return;
			this.add('-activate', pokemon, 'ability: Accumulate');
			this.add('-message', `${pokemon.name} called for help!`);
			if (pokemon.species.id === 'brambleghastmega') {
				pokemon.formeChange('Brambleghast-Mega-1', this.effect, true);
			} else if (pokemon.species.id === 'brambleghastmega1') {
				pokemon.formeChange('Brambleghast-Mega-2', this.effect, true);
			} else if (pokemon.species.id === 'brambleghastmega2') {
				pokemon.formeChange('Brambleghast-Mega-3', this.effect, true);
			} else if (pokemon.species.id === 'brambleghastmega3') {
				pokemon.formeChange('Brambleghast-Mega-4', this.effect, true);
			} else if (pokemon.species.id === 'brambleghastmega4') {
				pokemon.formeChange('Brambleghast-Mega-Tangled', this.effect, true);
			}
			this.add('-message', `More of ${pokemon.name}'s friends are getting tangled up!`);
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			const species = this.dex.species.get(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			const type2 = species.types[1];
			this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
      // no HP change unlike Wishiwashi
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Accumulate",
		rating: 5,
		num: -2001,
	},
	renaturalization: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it clears the hazard and sets Grassy Terrain.",
		shortDesc: "Hazard immunity. Clears hazards, sets Grassy Terrain if switched in on them.",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition) && !this.field.getPseudoWeather('stickyresidues')) {
					if (!activated && !this.field.setTerrain('grassyterrain')) {
						this.add('-activate', pokemon, 'ability: Renaturalization');
						activated = true;
					}
					pokemon.side.removeSideCondition(sideCondition);
					this.add('-sideend', pokemon.side, this.dex.conditions.get(sideCondition).name, '[from] Ability: Renaturalization', '[of] ' + pokemon);
				}
			}
		},
		hazardImmune: true,
		name: "Renaturalization",
		rating: 5,
		num: -2002,
	},
	pavise: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Pavise');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Dark' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Pavise');
				}
				return this.effectState.target;
			}
		},
		flags: {breakable: 1},
		desc: "This Pokemon is immune to Dark-type moves and raises its Special Attack by 1 stage when hit by a Dark-type move. If this Pokemon is not the target of a single-target Dark-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move. If multiple Pokemon could redirect with this Ability, it goes to the one with the highest Speed, or in the case of a tie to the one that has had this Ability active longer.",
		shortDesc: "This Pokemon draws Dark moves to itself to raise Sp. Atk by 1; Dark immunity.",
		name: "Pavise",
		rating: 3,
		num: -2003,
	},
	uplifting: {
		shortDesc: "While this Pokémon is present, all Pokémon are non-grounded.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Uplifting');
			this.add('-message', `While ${pokemon.name} is present, all Pokémon are non-grounded.`);
		},
		// effect is in scripts.ts
		name: "Uplifting",
		rating: 4,
		num: -2004,
	},
	tarslosh: {
		onStart(pokemon) {
			let activated = false;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Tar Slosh', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
					target.addVolatile('tarslosh');
				}
			}
		},
		condition: {
			onStart(pokemon, source, effect) {
				this.add('-start', pokemon, 'Tar', '[from] ability: Tar Slosh', '[of] ' + source);
			},
			onAnyDamage(damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && effect.type === 'Fire' && target === this.effectState.target) {
					return damage * 2;
				}
			},
		},
		shortDesc: "On switch-in, lowers the Speed of every other Pokemon by 1 stage and makes them weak to Fire moves.",
		name: "Tar Slosh",
		rating: 3.5,
		num: -2005,
	},
	lusterswap: {
		desc: "On entry, this Pokémon's type changes to match its first move that's super effective against an adjacent opponent.",
		shortDesc: "On entry: type changes to match its first move that's super effective against an adjacent opponent.",
		onStart(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.move);
				if (move.category === 'Status') continue;
				const moveType = move.id === 'hiddenpower' ? pokemon.hpType : move.type;
				for (const target of pokemon.side.foe.active) {
					if (!target || target.fainted || !target.isAdjacent(pokemon)) continue;
					if (
						this.dex.getImmunity(moveType, target) && this.dex.getEffectiveness(moveType, target) > 0
					) {
						this.add('-ability', pokemon, 'Luster Swap');
						if (!pokemon.setType(moveType)) continue;
						this.add('-message', `${pokemon.name} changed its type to match its ${move.name}!`);
						this.add('-start', pokemon, 'typechange', moveType);
						return;
					}
				}
			}
			this.add('-ability', pokemon, 'Luster Swap');
			this.add('-message', `${pokemon.name} can't hit any opponent super effectively!`);
			return;
		},
		name: "Luster Swap",
		rating: 3,
		num: -2006,
	},
	twominded: {
		desc: "When this Pokémon's Attack is modified, its Special Attack is modified in the opposite way, and vice versa. The same is true for its Defense and Special Defense.",
		shortDesc: "Applies the opposite of stat changes to the opposite stat (Atk/Sp. Atk, Def/Sp. Def).",
		onAfterBoost(boost, target, source, effect) {
			if (!boost || effect.id === 'twominded') return;
			let activated = false;
			const twoMindedBoost: SparseBoostsTable = {};
			if (boost.spa) {
				twoMindedBoost.atk = -1 * boost.spa;
				activated = true;
			}
			if (boost.spd) {
				twoMindedBoost.def = -1 * boost.spd;
				activated = true;
			}
			if (boost.atk) {
				twoMindedBoost.spa = -1 * boost.atk;
				activated = true;
			}
			if (boost.def) {
				twoMindedBoost.spd = -1 * boost.def;
				activated = true;
			}
			if (activated === true) {
				this.add('-ability', target, 'Two-Minded');
				this.boost(twoMindedBoost, target, target, null, true);
			}
		},
		name: "Two-Minded",
		rating: 4,
		num: -2007,
	},
	colorspray: {
		desc: "The first damaging move used against a target since it has switched in turns the target into that type.",
		shortDesc: "Turns a target into the type of the first damaging move used against it.",
		onSourceDamagingHit(damage, target, source, move) {
			if (!target.hp) return;
			if (this.effectState.colorspray) return;
			const type = move.type;
			if (
				target.isActive && move.effectType === 'Move' && move.category !== 'Status' &&
				type !== '???' && !target.hasType(type)
			) {
				if (!target.setType(type)) return false;
				this.effectState.colorspray = true;
				this.add('-start', target, 'typechange', type, '[from] ability: Color Change');

				if (target.side.active.length === 2 && target.position === 1) {
					// Curse Glitch
					const action = this.queue.willMove(target);
					if (action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.colorspray;
		},
		name: "Color Spray",
		rating: 4,
		num: -2008,
	},
	endlessdream: {
		desc: "While this Pokemon is active, every other Pokemon is treated as if it has the Comatose ability. Pokemon that are either affected by Sweet Veil, or have Insomnia or Vital Spirit as their abilities are immune this effect.",
		shortDesc: "All Pokemon are under Comatose effect.",
		onStart(source) {
			if (this.field.getPseudoWeather('ultrasleep')) {
				this.add('-ability', source, 'Endless Dream');
				this.hint("All Pokemon are under Comatose effect!");
				this.field.pseudoWeather.ultrasleep.source = source;
				this.field.pseudoWeather.ultrasleep.duration = 0;
			} else {
				this.add('-ability', source, 'Endless Dream');
				this.field.addPseudoWeather('ultrasleep');
				this.hint("All Pokemon are under Comatose effect!");
				this.field.pseudoWeather.ultrasleep.duration = 0;
			}
		},
		onAnyTryMove(target, source, move) {
			if (['ultrasleep'].includes(move.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Endless Dream', move, '[of] ' + target);
				return false;
			}
		},
		onResidualOrder: 21,
		onResidualSubOrder: 2,
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('endlessdream')) {
					return;
				}
			}
			this.field.removePseudoWeather('ultrasleep');
		},
		name: "Endless Dream",
		rating: 3,
		num: -22,
	},
	hairtrigger: {
		onModifyPriority(priority, source) {
			console.log(source.volatiles['hairtrigger']);
			if (source.volatiles['hairtrigger']) {
				source.removeVolatile('hairtrigger');
				return priority + 0.1;
			}
		},
		onSwitchIn(pokemon) {
			pokemon.addVolatile('hairtrigger');
		},
		desc: "The user moves first in their priority bracket on the first turn after switching in.",
		shortDesc: "Moves first in priority bracket on the first turn after switching in.",
		name: "Hair Trigger",
		rating: 5,
		num: -23,
	},
};
