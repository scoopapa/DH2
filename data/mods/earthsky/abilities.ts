export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	//New Abilities
	againstcurrent: {
		onBeforeTurn(pokemon){
			pokemon.addVolatile('nointerrupt');
		},
		onModifyMove(move) {
			// this doesn't actually do anything because ModifyMove happens after the tracksTarget check
			// the actual implementation is in Battle#getTarget
			move.tracksTarget = true;
		},
		name: "Against Current",
		desc: "This Pokemon's attacks cannot be interrupted once selected. The Pokemon will ignore sleep, freeze, flinch, Disable, Encore, Imprison, and PP drain to 0 inflicted earlier in the same turn, and bypass the checks for full paralysis, confusion, and attraction if inflicted earlier in the same turn. If given a Choice item earlier in the turn, the move locking will be ignored. Gravity and Heal Block will still prevent moves from executing. Additionally, this Pokemon's moves cannot be redirected to a different target by any effect.",
		shortDesc: "This Pokemon's attacks cannot be interrupted or redirected after selection.",
        flags: {},
		rating: 1,
		num: 1020,
	},
	bludgeon: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bludg']) {
				this.debug('Bludgeon boost');
				return this.chainModify(1.5);
			}
		},
		name: "Bludgeon",
		desc: "This Pokemon's tail and hammer attacks have their power multiplied by 1.5.",
		shortDesc: "This Pokemon's tail and hammer attacks have 1.5x power.",
        flags: {},
		rating: 2.5,
		num: 1001,
	},
	cacophony: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Cacophony boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Cacophony",
		desc: "This Pokemon's sound-based attacks have their power multiplied by 1.2.",
		shortDesc: "This Pokemon's sound-based attacks have 1.2x power.",
        flags: {},
		rating: 3,
		num: 1002,
	},
	cleanhouse: {
		onStart(source) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			const sides = [source.side, ...source.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			if (success){
				this.add('-activate', source, 'ability: Clean House');
				this.add('-activate', source, 'move: Tidy Up');
			}
		},
		name: "Clean House",
		shortDesc: "On switch-in, removes hazards and substitutes.",
        flags: {},
		rating: 3,
		num: 1022,
	},
	deepterror: {
		onFoeEmergencyExitPriority: 2,
		onFoeEmergencyExit(target, source) {
			if (!(source === this.effectState.target) || !this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.forceSwitchFlag = false;
				}
			}
			target.forceSwitchFlag = true;
			this.add('-activate', source, 'ability: Deep Terror');
			this.add('-switchOut', target, 'ability: Deep Terror', '[of] ' + source);
		},
		name: "Deep Terror",
		desc: "When a Pokemon has more than 1/2 its maximum HP and damage from this Pokemon's attack brings it to 1/2 or less of its maximum HP, it is forced to switch out and be replaced with a random unfainted ally, assuming such an ally exists. This effect applies after all hits from a multi-hit move; This effect applies to both direct and indirect damage, except Curse and Substitute on use, Belly Drum, Pain Split, and confusion damage.",
		shortDesc: "If this Pokemon brings a foe under 50% HP, it scares them out.",
        flags: {},
		rating: 2,
		num: 1003,
		switchOut: "  [POKEMON] was scared off of the battlefield!",
	},
	disturbance: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Disturbance', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Disturbance",
		desc: "On switch-in, this Pokemon lowers the Special Attack of opposing Pokemon by 1 stage. Pokemon with the Inner Focus, Oblivious, Own Tempo, or Scrappy Abilities and Pokemon behind a substitute are immune. This Ability triggers the Rattled Ability and a held Adrenaline Orb.",
		shortDesc: "On switch-in, this Pokemon lowers the Sp. Atk of opponents by 1 stage.",
        flags: {},
		rating: 3.5,
		num: 1026,
	},
	heatsink: {
		onTryHit(target, source, move) {
			if (move.target !== "self" && (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Heat Sink');
				}
				return null;
			}
		},
		onFoeRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Fire' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Heat Sink');
				}
				return this.effectState.target;
			}
		},
		name: "Heat Sink",
		desc: "This Pokemon is immune to Fire-type moves and raises its Special Attack by 1 stage when hit by a Fire-type move. If this Pokemon is not the target of a single-target Fire-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move. If multiple Pokemon could redirect with this Ability, it goes to the one with the highest Speed, or in the case of a tie to the one that has had this Ability active longer.",
		shortDesc: "This Pokemon draws Fire moves to itself to raise Sp. Atk by 1; Fire immunity.",
        flags: {breakable: 1},
		rating: 3,
		num: 1024,
	},
	icebreaker: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('snow')) {
				this.debug('Ice Breaker boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'snow') return false;
		},
		name: "Ice Breaker",
		desc: "If Snow is active, this Pokemon's attacks have their power multiplied by 1.3. This Pokemon takes no damage from Snow.",
		shortDesc: "This Pokemon's attacks have 1.3x power in snow; immunity to it.",
        flags: {},
		rating: 2.5,
		num: 1004,
	},
	irresistable: {
		// Implemented in moves.ts as edit to the attract condition
		name: "Irresistable",
		desc: "This Pokemon can cause other Pokemon to become attracted to it even if they are the same gender as it or are genderless. Pokemon with the Ability Oblivious are still immune to attraction.",
		shortDesc: "Attraction works regardless of gender. Oblivious is unaffected.",
        flags: {},
		rating: 1.5,
		num: 1005,
	},
	mistyshroud: {
		onStart(pokemon){
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
				return;
			}
			if(this.field.isTerrain("Misty Terrain")){
				pokemon.addVolatile('evade', pokemon, 'mistyterrain');
				pokemon.addVolatile('evadestall');
				this.add('-singleturn', pokemon, 'ability: Misty Shroud');
			} else if (this.effectState.source === 'mistyterrain'){
				pokemon.removeVolatile('evade');
				this.add('-end', pokemon, 'ability: Misty Shroud');
			}
		},
		name: "Misty Shroud",
		desc: "If this Pokemon is sent out during Misty Terrain, or if Misty Terrain is set while it is on the field, it becomes Evasive for the rest of the turn. While Evasive, all moves used on this Pokemon will fail accuracy checks, unless they ignore the condition.",
		shortDesc: "This Pokemon becomes Evasive on the turn it encounters Misty Terrain.",
        flags: {},
		rating: 1.5,
		num: 1006,
		start: "  [POKEMON] disappeared into the mist!",
		end: "  [POKEMON] became visible again.",
	},
	nightwalker: {
		onModifySpe(spe, pokemon) {
			if ('midnight' in this.field.pseudoWeather) {
				return this.chainModify(2);
			}
		},
		name: "Night Walker",
		shortDesc: "If Midnight is active, this Pokemon's Speed is doubled.",
        flags: {},
		rating: 2.5,
		num: 1007,
	},
	potency: {
		onModifyMove(move, source, target) {
			if (move.status === 'psn'){
				this.debug("Potency upgrading poison to bad poison");
				move.status = 'tox';
			} else if(move.secondaries){
				for (const secondary of move.secondaries){
					if(secondary.status === 'psn'){
						this.debug("Potency upgrading poison to bad poison");
						secondary.status = 'tox';
					}
				}
			}
		},
		//Toxic Spikes upgrade implemented in Toxic Spikes
		name: "Potency",
		desc: "When this Pokemon poisons another, the poison is automatically upgraded to bad poison. If this Pokemon uses Toxic Spikes, it will set two layers so as to badly poison Pokemon affected.",
		shortDesc: "All poison inflicted by this Pokemon is turned into bad poison.",
        flags: {},
		rating: 1,
		num: 1008,
	},
	ragemode: {
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (!['Darmanitan-Galar', 'Darmanitan-Rage'].includes(pokemon.species.name) || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Rage'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('ragemode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Rage'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('ragemode'); // in case of base Darmanitan-Rage
				pokemon.removeVolatile('ragemode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['ragemode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['ragemode'];
			if (pokemon.species.baseSpecies === 'Darmanitan-Galar' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.species.id !== 'darmanitanrage') pokemon.formeChange('Darmanitan-Rage');
			},
			onEnd(pokemon) {
				if (['Rage'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		name: "Rage Mode",
		desc: "If this Pokemon is a Darmanitan-Galar, it changes to Rage Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode. This Ability cannot be removed or suppressed.",
		shortDesc: "If Darmanitan-Galar, at end of turn changes Mode to Standard if > 1/2 max HP, else Rage.",
        flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		rating: 0,
		num: 1009,
	},
	relentless: {
		onStart(pokemon) {
			this.effectState.lastMove = '';
			this.effectState.numConsecutive = 0;
		},
		onTryMovePriority: -2,
		onTryMove(pokemon, target, move) {
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
			const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
			const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
			this.debug(`Current Relentless boost: ${dmgMod[numConsecutive]}/4096`);
			return this.chainModify([dmgMod[numConsecutive], 4096]);
		},
		name: "Relentless",
		desc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
        flags: {},
		num: 1025,
		rating: 2,
	},
	slumberveil: {
		onHit(target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('slp', target);
				}
			}
		},
		name: "Slumber Veil",
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will fall asleep.",
        flags: {},
		rating: 2.5,
		num: 1010,
	},
	stoneskin: {
		onStart(pokemon) {
			if (!['Druddigon-Mega', 'Druddigon-Mega-Statue'].includes(pokemon.species.name)) return;
			if (pokemon.species.name !== 'Druddigon-Mega-Statue') pokemon.formeChange('Druddigon-Mega-Statue');
		},
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (!['Druddigon-Mega', 'Druddigon-Mega-Statue'].includes(attacker.species.name)) return;
			const targetForme = (move.category === 'Status' ? 'Druddigon-Mega-Statue' : 'Druddigon-Mega');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		onSetStatus(status, target, source, effect) {
			if (!effect || !source || target.species.name !== 'Druddigon-Mega-Statue') return;
			if (effect.id === 'yawn') return;
			if (target !== source) {
				this.debug('interrupting setStatus');
				if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					this.add('-immune', target, '[from] ability: Stoneskin');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target, source, effect) {
			if (!effect || !source || target.species.name !== 'Druddigon-Mega-Statue') return;
			if (['confusion', 'curse', 'leechseed', 'nightmare', 'saltcure', 'yawn'].includes(status.id) && target !== source) {
				if (effect.effectType === 'Move' && !effect.secondaries) this.add('-immune', target, '[from] ability: Stoneskin');
				return false;
			}
		},
		onDamage(damage, target, source, effect){
			if (target.species.name !== 'Druddigon-Mega-Statue') return;
			if(effect && ['spikes','stealthrock', 'firepledge'].includes(effect.id)) return false;
		},
		onImmunity(type, pokemon) {
			if (pokemon.species.name !== 'Druddigon-Mega-Statue') return;
			if (['sandstorm', 'snow'].includes(type)) return false;
		},
		onChangeBoost(boost, target, source, effect) {
			if (target.species.name !== 'Druddigon-Mega-Statue' || (source && target === source)) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				this.add("-fail", target, "unboost", "[from] ability: Stoneskin", "[of] " + target);
			}
		},
		name: "Stoneskin",
		desc: "On switch-in and before using a non-attacking move, enters Statue Form. When in Statue Form, the Pokemon cannot be inflicted with statuses or have its stats dropped, and it will not take damage from field effects. Exits Statue Form when using an attacking move. This Ability has no effect if used by a Pokemon other than Mega Druddigon.",
		shortDesc: "Status move = Statue, attack = regular. When Statue, no status/stat drop/residual dmg.",
		flags: {breakable: 1, cantsuppress: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		rating: 4,
		num: 1023,
	},
	souldrain: {
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.category !== 'Status' && !source.forceSwitchFlag) {
				this.heal(move.totalDamage / 5, source);
			}
		},
		name: "Soul Drain",
		desc: "The user recovers 1/5 of the damage, rounded half up, dealt by each of its attacks. The healing occurs even if an attack hits a substitute.",
		shortDesc: "After an attack, holder gains 1/5 of the damage in HP dealt to other Pokemon.",
		heal: "  [POKEMON] restored a little HP with Soul Drain!",
        flags: {},
		rating: 2,
		num: 1011,
	},
	supermassive: {
		onStart(source) {
			this.add('-activate', source, 'ability: Supermassive');
			this.field.addPseudoWeather('gravity');
		},
		name: "Supermassive",
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
        flags: {},
		rating: 3.5,
		num: 1012,
	},
	tactician: {
		onStart(pokemon){
			for(const ally of pokemon.side.active){
				ally.tacticianBoosted = true;
			}
		},
		//Actual effects implemented in scripts.ts as edits to pokemon.getMoves(), actions.runMove(), the various battle.targetting functions, and battle.modifyDamage()
		onAllySwitchIn(pokemon){
			pokemon.tacticianBoosted = true;
		},
		onAllySwitchOut(pokemon){
			delete pokemon.tacticianBoosted;
		},
		onEnd(pokemon){
			for(const ally of pokemon.side.active){
				delete ally.tacticianBoosted;
			}
		},
		name: "Tactician",
		desc: "All single-target moves used by this Pokemon and its allies can target non-adjacent Pokemon. When this Pokemon or its ally uses a move that hits multiple targets, the move does not have the 25% damage reduction.",
		shortDesc: "This Pokemon and its allies ignore spread damage drops and can target anyone.",
        flags: {},
		rating: 2,
		num: 1013,
	},
	tireless: {
		onChargeMove(pokemon, target, move) {
			this.debug('tireless - remove charge turn for ' + move.id);
			this.add('-activate', pokemon, 'ability: Tireless');
			this.attrLastMove('[still]');
			this.addMove('-anim', pokemon, move.name, target);
			return false; // skip charge turn
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['mustrecharge']) {
				pokemon.removeVolatile('mustrecharge');
				this.debug('tireless - remove recharge');
				this.add('-activate', pokemon, 'ability: Tireless');
			}
		},
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			if (pokemon.volatiles['mustrecharge']) {
				pokemon.removeVolatile('mustrecharge');
				this.debug('tireless - failsafe remove recharge');
			}
		},
		name: "Tireless",
		desc: "When this Pokemon uses a move that must spend a turn charging, it executes on the first turn, after any effects are applied from the charge. When it uses a move that must spend a turn recharging, it does not need to recharge.",
		shortDesc: "This Pokemon's attacks skip charging and recharging turns.",
		activate: "  [POKEMON] became energized immediately!",
        flags: {},
		rating: 2,
		num: 1014,
	},
	tradewinds: {
		onStart(source) {
			this.add('-ability', source, 'Trade Winds');
			source.side.addSideCondition('tailwind');
		},
		name: "Trade Winds",
		shortDesc: "On switch-in, this Pokemon summons Tailwind.",
        flags: {},
		rating: 4,
		num: 1015,
	},
	warmonger: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !pokemon.isAdjacent(target)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'ability: Warmonger');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					target.addVolatile('taunt');
				}
			}
		},
		name: "Warmonger",
		shortDesc: "On switch-in, this Pokemon Taunts adjacent foes.",
        flags: {},
		rating: 3.5,
		num: 1016,
		activate: "  [POKEMON] is belligerent!",
	},
	glyphicspell: {
		onSwitchIn(pokemon) {
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityState.unownType === 'C') pokemon.abilityState.switchingIn = true;
		},
		onPreStart(pokemon) {
			if(pokemon.species.baseSpecies === 'Unown'){
				if(!pokemon.abilityState.formeDecided){//Determines forme if it hasn't already.
					pokemon.abilityState.unownType = pokemon.species.forme;
					while(pokemon.abilityState.unownType === 'Question'){ //?????: Randomly picks another form each time.
						pokemon.abilityState.unownType = this.dex.species.get(this.sample(pokemon.species.formeOrder)).forme;
					}
					if(pokemon.abilityState.unownType === pokemon.species.forme){ //Non-? formes only need to determine once.
						pokemon.abilityState.formeDecided = true;
					}
					if(pokemon.abilityState.unownType === '') pokemon.abilityState.unownType = 'A'; //A is the default, this is purely for code legibility
				}
				if(pokemon.abilityState.unownType === 'F'){ //Fear: Unnerve
					this.add('-activate', pokemon, 'ability: Glyphic Spell');
					this.add('-start', pokemon, 'Unnerve', pokemon.side.foe);
					pokemon.getAbility().onFoeTryEatItem = false;
				}
				if(pokemon.abilityState.unownType === 'N'){ //Negate: Neutralizing Gas
					//Main implementation is in scripts.ts as an edit to ignoringAbility()
					this.add('-n', pokemon, 'ability: Glyphic Spell');
					pokemon.abilityState.ending = false;
					const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
					for (const target of this.getAllActive()) {
						if (target.hasItem('Ability Shield')) {
							this.add('-block', target, 'item: Ability Shield');
							continue;
						}
						this.singleEvent('End', target.getAbility(), target.abilityState, target, pokemon, 'neutralizinggas');
					}
				}
			}
		},
		onStart(pokemon){
			if(pokemon.species.baseSpecies === 'Unown'){
				//These variables are not needed for most of them, but the code considers one being defined in one case to apply to all cases, might as well put them here
				const oppositeFoe = pokemon.oppositeFoe();
				let activated = false;
				switch(pokemon.abilityState.unownType){
					case 'B': //Block: Ally protection
						this.add('-ability', pokemon, 'Glyphic Spell');
						for (const ally of pokemon.allies()) {
							ally.addVolatile('protect');
							ally.addVolatile('stall');
						}
						break;
					case 'C': //Copy: Imposter
						if (!pokemon.abilityState.switchingIn) return;
						if (oppositeFoe) {
							if(oppositeFoe.hasAbility('owntempo')){
								this.add('-ability', pokemon, 'Glyphic Spell');
								this.add('-immune', oppositeFoe, '[from] ability: Own Tempo');
								this.hint('Own Tempo blocks effects that steal or copy its attributes');
								return;
							}
							pokemon.transformInto(oppositeFoe, this.dex.abilities.get('glyphicspell'));
						}
						break;
					case 'D': //Darkness: Sets Midnight
						this.add('-ability', pokemon, 'Glyphic Spell');
						this.field.addPseudoWeather('midnight');
						break;
					case 'F': //Fear: Attack/Sp. Attack/Speed -2 on foes
						for (const target of pokemon.side.foe.active) {
							if (!target) continue;
							if(!activated){
								this.add('-ability', pokemon, 'Glyphic Spell');
								activated = true;
							}
							if (target.volatiles['substitute']) {
								this.add('-immune', target);
							} else {
								this.boost({atk: -2, spa: -2, spe: -2}, target, pokemon, null, true);
							}
						}
						break;
					case 'G': //Grow: All stats +1
						this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon);
						break;
					case 'H': //Heal: Full Restore
						this.add('-h', pokemon, 'ability: Glyphic Spell');
						this.heal(pokemon.baseMaxhp, pokemon);
						pokemon.cureStatus();
						break;
					case 'I': //Invert: Topsy-Turvy
						activated = false;
						for (const foe of pokemon.side.foe.active) {
							let success = false;
							let i: BoostName;
							for (i in foe.boosts) {
								if (foe.boosts[i] === 0) continue;
								foe.boosts[i] = -foe.boosts[i];
								success = true;
							}
							if(success){
								if(!activated){
									this.add('-ability', pokemon, 'Glyphic Spell');
									activated = true;
								}
								this.add('-invertboost', foe, '[from] move: Topsy-Turvy');
							}
						}
						break;
					case 'J': //Join: Pain Split, split all stats
						const targetHP = oppositeFoe.getUndynamaxedHP();
						const averagehp = Math.floor((targetHP + pokemon.hp) / 2) || 1;
						const targetChange = targetHP - averagehp;
						oppositeFoe.sethp(oppositeFoe.hp - targetChange);
						this.add('-sethp', oppositeFoe, oppositeFoe.getHealth, '[from] move: Pain Split', '[silent]');
						pokemon.sethp(averagehp);
						this.add('-sethp', pokemon, pokemon.getHealth, '[from] move: Pain Split', '[silent]');
						const newatk = Math.floor((oppositeFoe.storedStats.atk + pokemon.storedStats.atk) / 2);
						oppositeFoe.storedStats.atk = newatk;
						pokemon.storedStats.atk = newatk;
						const newdef = Math.floor((oppositeFoe.storedStats.def + pokemon.storedStats.def) / 2);
						oppositeFoe.storedStats.def = newdef;
						pokemon.storedStats.def = newdef;
						const newspa = Math.floor((oppositeFoe.storedStats.spa + pokemon.storedStats.spa) / 2);
						oppositeFoe.storedStats.spa = newspa;
						pokemon.storedStats.spa = newspa;
						const newspd = Math.floor((oppositeFoe.storedStats.spd + pokemon.storedStats.spd) / 2);
						oppositeFoe.storedStats.spd = newspd;
						pokemon.storedStats.spd = newspd;
						const newspe = Math.floor((oppositeFoe.storedStats.spe + pokemon.storedStats.spe) / 2);
						oppositeFoe.storedStats.spe = newspe;
						pokemon.storedStats.spe = newspe;
						this.add('-j', pokemon, 'ability: Glyphic Spell', oppositeFoe);
						break;
					case 'K': //Klepto: Steal direct foe's item, confiscate the rest
						if (!pokemon.item) {
							this.add('-ability', pokemon, 'Glyphic Spell');
							activated = true;
							const yourItem = oppositeFoe.takeItem(pokemon);
							if (yourItem && this.singleEvent('TakeItem', yourItem, oppositeFoe.itemData, pokemon, oppositeFoe, pokemon.getAbility(), yourItem) && pokemon.setItem(yourItem)) {
								this.add('-enditem', oppositeFoe, yourItem, '[silent]', '[from] move: Thief', '[of] ' + pokemon);
								this.add('-item', pokemon, yourItem, '[from] move: Thief', '[of] ' + oppositeFoe);
							} else {
								oppositeFoe.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
							}
						}
						for (const foe of pokemon.side.foe.active) {
							if (!foe) continue;
							if(!activated){
								this.add('-ability', pokemon, 'Glyphic Spell');
								activated = true;
							}
							const item = foe.takeItem(pokemon);
							if (item) {
								this.add('-enditem', foe, item.name, '[from] move: Embargo', '[of] ' + pokemon);
							}
						}
						break;
					case 'L': //Loop: Encores foes
						this.add('-ability', pokemon, 'Glyphic Spell');
						for (const target of pokemon.side.foe.active) {
							if (!target) continue;
							target.addVolatile('encore');
						}
						break;
					case 'M': //Mirror: Wonder Room
						this.add('-ability', pokemon, 'Glyphic Spell');
						this.field.addPseudoWeather('wonderroom');
						break;
					case 'O': //Observe: Frisk, Forewarn, Miracle Eye
						pokemon.addVolatile('forewarn', pokemon, "Glyphic Spell");
						for (const target of pokemon.side.foe.active) {
							if (!target || target.fainted) continue;
							if (target.item) {
								this.add('-activate', pokemon, 'ability: Glyphic Spell');
								this.add('-item', target, target.getItem().name, '[from] Frisk', '[of] ' + pokemon, '[identify]');
							}
						}
						pokemon.addVolatile('miracleeye');
						break;
					case 'P': //Power: Sp. Attack to +6
						this.add('-ability', pokemon, 'Glyphic Spell');
						this.boost({spa: 12}, pokemon);
						break;
					case 'Q': //Quicken: Speed to +6
						this.add('-ability', pokemon, 'Glyphic Spell');
						this.boost({spe: 12}, pokemon);
						break;
					case 'R': //Reverse: Trick Room
						this.add('-ability', pokemon, 'Glyphic Spell');
						this.field.addPseudoWeather('trickroom');
						break;
					case 'S': //Seal: Apply Stasis, Heal Block, and Imprison
						this.add('-ability', pokemon, 'Glyphic Spell');
						for (const target of pokemon.side.foe.active) {
							if (!target || target.fainted) continue;
							target.addVolatile('stasis');
						}
						pokemon.side.foe.addSideCondition('healblock');
						pokemon.addVolatile('imprison');
						break;
					case 'T': //Turnabout: Rebound
						this.add('-t', pokemon, 'ability: Glyphic Spell');
						pokemon.addVolatile('rebound');
						break;
					case 'U': //Undo: Clears hazards, screens, weather, and terrain
						const removeEffects = [
							'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'healblock', 'luckychant', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb',
						];
						for (const condition of removeEffects) {
							if (pokemon.side.removeSideCondition(condition)) {
								this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name);
							}
							if (pokemon.side.foe.removeSideCondition(condition)) {
								this.add('-sideend', pokemon.side.foe, this.dex.conditions.get(condition).name);
							}
						}
						this.field.clearWeather();
						this.field.clearTerrain();
						break;
					case 'V': //Vanish: Forces out opposite foe
						this.add('-ability', pokemon, 'Glyphic Spell');
						oppositeFoe.forceSwitchFlag = true;
						break;
					case 'W': //Weird: Psychic Surge
						this.add('-ability', pokemon, 'Glyphic Spell');
						this.field.setTerrain('psychicterrain');
						break;
					case 'Y': //Yield: Quashes foes
						if (pokemon.side.active.length < 2) return; // fails in singles
						for (const target of pokemon.side.foe.active) {
							const action = this.queue.willMove(target);
							if (!action) continue;
							if(!activated){
								this.add('-ability', pokemon, 'Glyphic Spell');
								activated = true;
							}
							action.order = 201;
							this.add('-activate', target, 'Quash');
						}
						break;
					case 'Z': //Zero-G: Floating status on everyone
						if('gravity' in this.field.pseudoWeather){
							this.add('-ability', pokemon, 'Glyphic Spell');
							activated = true;
							this.field.removePseudoWeather('gravity');
						}
						for (const target of pokemon.side.active) {
							if (!target || target.fainted || !target.canFloat()) continue;
							if(!activated){
								this.add('-ability', pokemon, 'Glyphic Spell');
								activated = true;
							}
							target.addVolatile('magnetrise');
							//this.add('-start', target, 'Telekinesis');
						}
						for (const target of pokemon.side.foe.active) {
							if (!target || target.fainted || !target.canFloat()) continue;
							if(!activated){
								this.add('-ability', pokemon, 'Glyphic Spell');
								activated = true;
							}
							if(target.addVolatile('telekinesis')){
								target.volatiles['telekinesis'].duration = 5;
							}
						}
						break;
					case '!': //!!!!! Primes itself for Explosion
						this.add('-ex', pokemon, 'ability: Glyphic Spell');
						break;
				}
			}
		},
		onBeforeTurn(pokemon){
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityState.unownType === 'Y'){ //Yield: Quashes foes
				if(this.turn !== 1) return; //This only needs to be called if Unown is in on the first turn, because it will activate on switch-in otherwise.
				let activated = false;
				//does NOT fail in Singles - Unown can move on the first turn
				for (const target of pokemon.side.foe.active) {
					const action = this.queue.willMove(target);
					if (!action) continue;
					if(!activated){
						this.add('-ability', pokemon, 'Glyphic Spell');
						activated = true;
					}
					action.order = 201;
					this.add('-activate', target, 'Quash');
				}
			}
		},
		onFoeSwitchIn(target) {
			const pokemon = this.effectState.target;
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityState.unownType === 'O'){ //Observe: Forewarn
				pokemon.addVolatile('forewarn', pokemon, "Glyphic Spell");
			}
		},
		onModifyTypePriority: 99,
		onModifyType(move, source, target) {
			if(source.species.baseSpecies === 'Unown' && source.abilityState.unownType === 'A'){ //Adapt: Change source and HP type
				if (move.hasBounced) return;
				const type = this.getBestEffectiveness(source, target);
				if (type && type !== '???' && source.getTypes().join() !== type) {
					this.add('-ability', source, 'Glyphic Spell');
					source.setType(type);
					source.hpType = type;
					if(move.id === 'hiddenpower'){
						move.onModifyType(move, source);
					}
					this.add('-start', source, 'typechange', type);
				}
			}
		},
		onTryHit(target, source, move) {
			if(target.species.baseSpecies === 'Unown' && target.abilityState.unownType === 'M'){ //Mirror: Magic Bounce
				if (target === source || move.hasBounced || !move.flags['reflectable']) {
					return;
				}
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, target, source);
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if(target.species.baseSpecies === 'Unown' && target.abilityState.unownType === 'M'){ //Mirror: Magic Bounce
				if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
					return;
				}
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, target, source);
				return null;
			}
		},
		onModifyPriority(priority, source, target, move) {
			if(source.species.baseSpecies === 'Unown' && source.abilityState.unownType === 'E'){ //Engage: +4 priority to first move
				if(source.activeMoveActions === 0 && priority < 4){
					return 4;
				}
			}
		},
		onModifyMove(move, source, target) {
			if(source.species.baseSpecies === 'Unown'){
				if(source.abilityState.unownType === 'A'){ //Adapt: Adaptability
					move.stab = 2;
				}
				if(source.abilityState.unownType === 'E'){ //Engage: Lots of boosts to first move
					if(source.activeMoveActions === 1){
						this.debug('Glyphic Spell: Engage boosts');
						move.accuracy = true;
						move.willCrit = true;
						move.infiltrates = true;
						move.breaksProtect = true;
					}
				}
			}
		},
		onAnyModifyBoost(boosts, pokemon) {
			//Negate: Unaware
			const unawareUser = this.effectState.target;
			if(unawareUser.species.baseSpecies === 'Unown' && unawareUser.abilityState.unownType === 'N'){ 
				if (unawareUser === pokemon) return;
				if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
					boosts['def'] = 0;
					boosts['spd'] = 0;
					boosts['evasion'] = 0;
				}
				if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
					boosts['atk'] = 0;
					boosts['def'] = 0;
					boosts['spa'] = 0;
					boosts['accuracy'] = 0;
				}
			}
		},
		onDamagingHit(damage, pokemon, source, move) {
			if(pokemon.species.baseSpecies === 'Unown'){
				if(pokemon.abilityState.unownType === 'X'){ //X-Out: Disable the move
				if(!pokemon.HP) return; //don't bother since the attacker is about to be Destiny Bonded lol
					if (!move.flags['futuremove'] && move.id !== 'struggle') {
						this.add('-ability', pokemon, 'Glyphic Spell');
						if(source.volatiles['disable']) source.removeVolatile('disable');
						source.addVolatile('disable', this.effectState.target);
					}
				}
				if(pokemon.abilityState.unownType === 'Exclamation'){//!!!!!: Blows up if it gets hit
					const kaboom = this.dex.getMove('explosion');
					kaboom.willCrit = true;
					kaboom.ignoreImmunity = {'Normal': true,};
					this.actions.useMove(kaboom, pokemon);
				}
			}
		},
		onEntryHazard(pokemon) {
			if(pokemon.species.baseSpecies === 'Unown' && ['U','Z'].includes(pokemon.abilityState.unownType)){ //Undo and Zero-G: Ignores hazards because removing/floating
				return null;
			}
		},
		onChangeBoost(boost, target, source, effect) {
			if(target.species.baseSpecies === 'Unown' && target.abilityState.unownType === 'I'){ //Invert: Contrary
				let i: BoostName;
				for (i in boost) {
					boost[i]! *= -1;
				}
			}
		},
		onFaint(target, source, effect) {
			if(target.species.baseSpecies === 'Unown' && target.abilityState.unownType === 'X'){ //X-Out: Attacker faints too
				if (!source || !effect || target.isAlly(source)) return;
				if (effect.effectType === 'Move' && !effect.flags['futuremove']) {
					this.add('-ability', target, 'Glyphic Spell');
					this.add('-activate', target, 'move: Destiny Bond');
					source.faint();
				}
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if(source.species.baseSpecies === 'Unown' && source.abilityState.unownType === 'G') //Grow: Stats up on KO
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length, def: length, spa: length, spd: length, spe: length}, source);
			}
		},
		onResidual(pokemon){
			if(pokemon.species.baseSpecies === 'Unown' && pokemon.abilityState.unownType === 'Exclamation'){ //!!!!!: Blows up at the end of the turn
				const kaboom = this.dex.moves.get('explosion');
				kaboom.willCrit = true;
				kaboom.ignoreImmunity = {};
				kaboom.ignoreImmunity['Normal'] = true;
				this.actions.useMove(kaboom, pokemon);
			}
			pokemon.abilityState.warnMoves = [];
		},
		name: "Glyphic Spell",
		desc: `This Ability functions differently based on Unown's forme. Each letter is given a designated word (similar to the TCG) starting with that letter that grants effects while Unown is on the field. They are as follows:
		A - Adapt:		When attacking a foe, Unown's type changes to the one with the greatest advantage over it. Its Hidden Power also changes to this type, and its STAB bonus is boosted to 2x.
		B - Block:		Protects itself and allies from attacks this turn. Doesn't check the counter of consecutively-used protective moves to have a chance to fail, but it does increment it.
		C - Copy:		Immediately transforms into its direct opponent.
		D - Darkness:	Summons supernatural darkness for five turns.
		E - Engage:		Unown's first attack gains +4 priority, skips its accuracy check, always scores a critical hit, breaks protective effects, and ignores enemy screens and substitutes.
		F - Fear:		Lowers the Attack, Sp. Attack, and Speed of all foes by two stages. The opposing team wil also be unable to eat Berries while Unown is in battle.
		G - Grow:		Unown's Attack, Defense, Sp. Attack, Sp. Defense, and Speed are raised one stage. Every time Unown scores a KO, all of them raise again.
		H - Heal:		Fully restores Unown's HP and cures its status conditions.
		I - Invert:		All foes' stat changes are inverted, and stat changes made to Unown will have the opposite effect.
		J - Join:		The HPs and non-HP stats of Unown and its direct opponent are added up and then split evenly between them.
		K - Klepto:		Steals the item of its direct opponent, then removes all remaining foes' items.
		L - Loop:		All foes are inflicted with an Encore.
		M - Mirror:		Summons Wonder Room for five turns. Grants Unown the effects of Magic Bounce.
		N - Negate:		Grants Unown the effects of Neutralizing Gas and Unaware.
		O - Observe:	Reveals all foes' held items and each of their strongest moves. If the Pokemon uses its identified move on Unown, Unown will become Evasive to it. Grants Unown the effects of Miracle Eye.
		P - Power:		Raises Unown's Sp. Attack to +6.
		Q - Quicken:	Raises Unown's Speed to +6.
		R - Reverse:	Summons Trick Room for five turns.
		S - Seal:		Puts all foes into Stasis and applies Imprison and Heal Block to the enemy team.
		T - Turnabout:	The first attack to hit Unown this turn has its damage Rebound, using the same calculation as the move.
		U - Undo:		Clears all weather effects, terrains, entry hazards, side conditions, and screens.
		V - Vanish:		Forces Unown's direct opponent to switch out, ignoring substitutes.
		W - Weird:		Summons Psychic Terrain for five turns.
		X - X-Out:		If Unown faints from an attack, the attacker also faints. If not, the move becomes disabled, releasing any previously disabled move.
		Y - Yield:		All opponents are forced to move after Unown and its allies this turn.
		Z - Zero-G:		Applies floating status to all Pokémon for five turns, and lifted opponents will be unable to dodge moves. Removes Gravity.
		? - ?????:		Randomly uses one of the other letters' effects each time.
		! - !!!!!:		Unown primes itself. If it takes damage, or at the end of the turn if it doesn't, it uses Explosion, ignoring immunities to the move and always scoring critical hits.
		Glyphic Spell cannot be copied, swapped, suppressed, or overridden, and will not have any effect if acquired through Transform/Imposter or if hacked onto another Pokemon.`,
		shortDesc: "Has a special effect depending on Unown's letter.",
        flags: {cantsuppress: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		rating: 3,
		num: 1019,
		fitem: "  [POKEMON] observed [TARGET]'s [ITEM]!",
		fmove: "  [TARGET]'s [MOVE] was observed!",
		h: "  [POKEMON] was healed!",
		n: "  [POKEMON] is suppressing abilities!",
		j: "  [POKEMON] and [TARGET] had their stats shared!",
		t: "  [POKEMON] is preparing a counterattack!",
		ex: "  [POKEMON] radiates a lot of power...",
	},
	//Changed Abilities
	airlock: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'ability: Air Lock');
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (!strongWeathers.includes(this.field.weather)){
				this.field.clearWeather();
			}
			this.effectState.switchingIn = false;
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (!strongWeathers.includes(weather.id)){
				this.add('-activate', this.effectState.target, 'ability: Air Lock');
				return false;
			}
		},
		suppressWeather: true,
		name: "Air Lock",
		shortDesc: "When this Pokemon is active, weather disappears and cannot be set.",
		desc: "When this Pokemon is sent in, active weather is cleared. Using a weather-changing move will fail, and weather-changing Abilities will not work, except for Primordial Sea, Desolate Land, and Delta Stream.",
        flags: {},
		rating: 2,
		num: 76,
		start: "  The skies cleared above the battlefield.",
		activate: "  The air remained calm!",
	},
	alchemy: {
		onSwitchIn(pokemon){
			this.effectState.switchingIn = true;
		},
		onStart(pokemon){
			const replaced = pokemon.side.faintedThisTurn;
			if (!this.effectState.switchingIn || !replaced) return;
			const ability = replaced.getAbility();
			if (ability.flags['noreceiver'] || ability.id === 'noability') return;
			this.add('-ability', this.effectState.target, ability, '[from] ability: Alchemy', '[of] ' + replaced);
			this.effectState.target.setAbility(ability);
			this.effectState.switchingIn = false;
			
		},
		name: "Alchemy",
		desc: "This Pokemon copies the Ability of an ally that fainted this turn. Abilities that cannot be copied are \"No Ability\", Alchemy, Comatose, Commander, Disguise, Flower Gift, Forecast, Glyphic Spell, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Rage Mode, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, Zen Mode, and Zero to Hero.",
		shortDesc: "This Pokemon copies the Ability of an ally that fainted.",
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		rating: 1,
		num: 223,
	},
	analytic: {
		inherit: true,
		onBasePower(basePower, pokemon, singleTarget, move) {
			if(['allAdjacent','allAdjacentFoes'].includes(move.target)){ //If multi-target move, first check all targets to determine if the boost happens.
				if(this.effectState.boosted === undefined){ //Only needs to check this once in the Pokemon's turn, since it applies either to everyone or no one.
					for (const target of pokemon.getMoveTargets(move).targets) {
						if (target.newlySwitched || this.queue.willMove(target)) {
							this.effectState.boosted = false;
							break;
						}
						this.effectState.boosted = true;
					}
				}
				if (this.effectState.boosted === true) {
					this.debug('Analytic boost');
					return this.chainModify(1.5);
				}
			} else {
				if (!(singleTarget.newlySwitched || this.queue.willMove(singleTarget))) {
					this.debug('Analytic boost');
					return this.chainModify(1.5);
				}
			}
		},
		onResidualOrder: 1,
		onResidual(pokemon) {
			if(this.effectState.boosted !== undefined){
				this.debug('Resetting Analytic tracker')
				this.effectState.boosted = undefined;
			}
		},
		desc: "The power of this Pokemon's move is multiplied by 1.5 if it moves after all of the move's target. Does not affect Doom Desire and Future Sight.",
		shortDesc: "This Pokemon's attacks have 1.5x power if it moves after its targets.",
	},
	anticipation: {
		inherit: true,
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					if(move.onModifyType) this.battle.singleEvent('ModifyType', move, null, pokemon, target);
					if (move.twoType){
						if (this.dex.getImmunity(move, pokemon) && this.dex.getEffectiveness(move, pokemon) >= 2) {
							this.add('-ability', pokemon, 'ability: Anticipation');
							return;
						}
					}
					const moveType = move.type;
					if (this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) >= 2) {
						this.add('-ability', pokemon, 'ability: Anticipation');
						return;
					}
				}
			}
		},
		onFoeSwitchIn(target) {
			if(!this.turn) return; //only true on initial sending out at battle start
			const pokemon = this.effectState.target;
			for (const moveSlot of target.moveSlots) {
				const move = this.dex.moves.get(moveSlot.move);
				if (move.category === 'Status') continue;
				if(move.onModifyType) this.battle.singleEvent('ModifyType', move, null, pokemon, target);
				if (move.twoType){
					if (this.dex.getImmunity(move, pokemon) && this.dex.getEffectiveness(move, pokemon) >= 2) {
						this.add('-ability', pokemon, 'ability: Anticipation');
						return;
					}
				}
				const moveType = move.type;
				if (this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) >= 2) {
					this.add('-ability', pokemon, 'ability: Anticipation');
					return;
				}
			}
		},
		onAccuracy(accuracy, target, source, move) {
			if (target !== this.effectState.target || typeof(accuracy) !== 'number' || move.ignoreEvasion) return;
			if(move.onModifyType) this.battle.singleEvent('ModifyType', move, null, pokemon, target);
			if (!move.twoType){
				if (this.dex.getImmunity(move, target) && this.dex.getEffectiveness(move, target) >= 2) {
					this.add('-miss', source, target);
					return false;
				}
			}
			const moveType = move.type;
			if (this.dex.getImmunity(moveType, target) && this.dex.getEffectiveness(moveType, target) >= 2) {
				this.add('-miss', source, target);
				return false;
			}
		},
		rating: 3,
		desc: "On switch-in, this Pokemon is alerted if any opposing Pokemon has an attack that is doubly super effective on this Pokemon. If any such moves are used on this Pokemon, it will become Evasive to them. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types. Bullfight, Hidden Power, Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball use their determined types.",
		shortDesc: "Shudders to detect x4 effective moves and becomes Evasive to them.",
		miss: "  [POKEMON] anticipated the attack and evaded!",
	},
	arenatrap: {
		onStart(pokemon){
			this.add('-activate', pokemon, 'ability: Arena Trap');
			this.field.addPseudoWeather('arenatrapped');
		},
		flags: {},
		name: "Arena Trap",
		rating: 4.5,
		num: 71,
		desc: "Prevents all Pokemon from choosing to switch out next turn unless they are airborne, are holding a Shed Shell, have the Run Away or Arena Trap Abilities, or are a Ghost type.",
		shortDesc: "Prevents Pokemon from switching next turn unless they are airborne.",
	},
	asoness: {
		num: 266,
		name: "As One S-S",
		onPreStart(pokemon) {
			pokemon.abilityState.forme = (pokemon.species.forme === 'Ice' ? 'Ice' : 'Shadow');
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onWeather(target, source, effect) {
			if(target.abilityState.forme === 'Shadow') return;
			if (effect.id === 'snow') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		onImmunity(type, pokemon) {
			if(pokemon.abilityState.forme === 'Shadow') return;
			if (type === 'snow') return false;
		},
		onDamagingHit(damage, pokemon, source, move) {
			if (pokemon.abilityState.forme === 'Ice' || source.volatiles['disable']) return;
			if (!move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		desc: "As One that combines the two standard Abilities of Calyrex (Unnerve) and its mount (Glastrier's Ice Body or Spectrier's Cursed Body.)",
		shortDesc: "Combines Unnerve and either Ice Body or Cursed Body.",
        flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
	},
	asonesh: {
		num: 266,
		name: "As One S-H",
		onPreStart(pokemon) {
			pokemon.abilityState.forme = (pokemon.species.forme === 'Ice' ? 'Ice' : 'Shadow');
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, defender, move) {
			if(pokemon.abilityState.forme === 'Shadow') return;
			if (this.field.isWeather('snow')) {
				this.debug('Ice Breaker boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(source, target, move) {
			if(source.abilityState.forme === 'Ice') return;
			if (move.category !== 'Status' && !source.forceSwitchFlag) {
				this.heal(move.totalDamage / 5, source);
			}
		},
		onImmunity(type, pokemon) {
			if(pokemon.abilityState.forme === 'Shadow') return;
			if (type === 'snow') return false;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		desc: "As One that combines the standard Ability of Calyrex (Unnerve) and Hidden Ability of its mount (Glastrier's Ice Breaker or Spectrier's Soul Drain).",
		shortDesc: "Combines Unnerve and either Ice Breaker or Soul Drain.",
        flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
	},
	asonehs: {
		num: 267,
		name: "As One H-S",
		onPreStart(pokemon) {
			pokemon.abilityState.forme = (pokemon.species.forme === 'Ice' ? 'Ice' : 'Shadow');
			this.add('-ability', pokemon, 'As One');
		},
		onFoeTryMove(source, target, move) {
			if (move.target === 'foeSide' || (move.target === 'all' &&  move.id !== 'perishsong')) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((target.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Majesty', move, '[of] ' + source);
				return false;
			}
		},
		onWeather(target, source, effect) {
			if(target.abilityState.forme === 'Shadow') return;
			if (effect.id === 'snow') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		onImmunity(type, pokemon) {
			if(pokemon.abilityState.forme === 'Shadow') return;
			if (type === 'snow') return false;
		},
		onDamagingHit(damage, pokemon, source, move) {
			if (pokemon.abilityState.forme === 'Ice' || source.volatiles['disable']) return;
			if (!move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
		desc: "As One that combines the Hidden Ability of Calyrex (Majesty) and standard Ability of its mount (Glastrier's Ice Body or Spectrier's Cursed Body).",
		shortDesc: "Combines Majesty and either Ice Body or Cursed Body.",
        flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
	},
	asonehh: {
		num: 267,
		name: "As One H-H",
		onPreStart(pokemon) {
			pokemon.abilityState.forme = (pokemon.species.forme === 'Ice' ? 'Ice' : 'Shadow');
			this.add('-ability', pokemon, 'As One');
		},
		onFoeTryMove(source, target, move) {
			if (move.target === 'foeSide' || (move.target === 'all' &&  move.id !== 'perishsong')) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((target.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Majesty', move, '[of] ' + source);
				return false;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, defender, move) {
			if(pokemon.abilityState.forme === 'Shadow') return;
			if (this.field.isWeather('snow')) {
				this.debug('Ice Breaker boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(source, target, move) {
			if(source.abilityState.forme === 'Ice') return;
			if (move.category !== 'Status' && !source.forceSwitchFlag) {
				this.heal(move.totalDamage / 5, source);
			}
		},
		onImmunity(type, pokemon) {
			if(pokemon.abilityState.forme === 'Shadow') return;
			if (type === 'snow') return false;
		},
		desc: "As One that combines the two Hidden Abilities of Calyrex (Majesty) and its mount (Glastrier's Ice Breaker or Spectrier's Soul Drain).",
		shortDesc: "Combines Majesty and either Ice Breaker or Soul Drain.",
        flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
	},
	berserk: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1, spe: 1});
			}
		},
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Attack, Special Attack, and Speed are raised by 1 stage. This effect applies after all hits from a multi-hit move.",
		shortDesc: "This Pokemon's Atk, Sp. Atk, Speed +1 at <1/2 max HP from an attack.",
	},
	bigpecks: {
		onChangeBoost(boost, target, source, effect) {
			if (source && target !== source && boost.def && boost.def < 0) {
				this.boost({def: -boost.def}, target, target, null, false, true);
				delete boost.def;
			}
		},
		name: "Big Pecks",
		desc: "If another Pokemon tries to lower this Pokemon's Defense stat stage, it raises by that amount instead.",
		shortDesc: "If Defense is attempted to be lowered by others, raises by that amount instead.",
        flags: {breakable: 1},
		rating: 1.5,
		num: 145,
	},
	climatebreak: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'ability: Climate Break');
			this.field.clearTerrain();
			this.effectState.switchingIn = false;
		},
		onAnyTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			move.hasAuraBreak = true;
		},
		onAnySetTerrain(target, source, terrain) {
			this.add('-ability', pokemon, 'ability: Climate Break');
			return false;
		},
		suppressTerrain: true,
		name: "Climate Break",
		desc: "This Pokemon clears terrain from the field on switch-in. While this Pokemon is active, terrain cannot be set, and the effects of the Dark Aura, Fairy Aura, and Power Aura Abilities are negated.",
		shortDesc: "While this Pokemon is active, terrain disappears and Aura Abilities are negated.",
        flags: {breakable: 1},
		rating: 2,
		num: 188,
		start: "  [POKEMON] is regulating the climate of the battlefield!",
		activate: "  The terrain remained the same!",
	},
	cloudnine: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'ability: Cloud Nine');
		},
		onAnySetWeather(target, source, weather) {
			if(this.effectState.target.beingCalledBack) return; //Don't suppress weather being resumed as it's leaving
			return false;
		},
		onSwitchOut(pokemon) {
			let returningWeather = '';
			const everyone = this.getAllActive();
			this.speedSort(everyone, (a, b) => b.speed - a.speed);
			for (const target of everyone) {
				if (target.hasAbility('desolateland')) {
					returningWeather = 'desolateland';
				} else if (target.hasAbility('primordialsea')) {
					returningWeather = 'primordialsea';
				} else if (target.hasAbility('deltastream')) {
					returningWeather = 'deltastream';
				}
			}
			if(returningWeather) this.field.setWeather(returningWeather);
		},
		suppressWeather: true,
		name: "Cloud Nine",
        flags: {breakable: 1},
		rating: 2,
		num: 13,
	},
	colorchange: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (!target.hp || !target.isActive || move.effectType !== 'Move' || move.category === 'Status') return;
			const type = this.getBestEffectiveness(target, (move.twoType ? [move.type, move.twoType] : move.type), true);
			if (target.getTypes().join() !== type) {
				if (type === '???' || !target.setType(type)) return false;
				this.add('-start', target, 'typechange', type, '[from] ability: Color Change');
			}
		},
		desc: "After being hit by a move, the user's typing changes to the type that has the best advantage over the move's type, after modifications. It will prioritize any type that is immune to the move, followed by types that are doubly resistant, then normally resistant, then neutral to the move. If multiple types are possible after any of these choices, it will prioritize types that are super effective against that type. If multiple types are still possible, it will prioritize types matching any of the user's damaging moves. Fails if the target has not made a move, if the user cannot change its type, or if this move would only be able to select the user's current type.",
		shortDesc: "This Pokemon's type changes to the type most advantageous against a move it's hit by.",
	},
	commander: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Tatsugiri') {
				// Handle any edge cases
				if (pokemon.getVolatile('commanding')) pokemon.removeVolatile('commanding');
				return;
			}
			for(const ally of pokemon.adjacentAllies()){
				if(ally.baseSpecies.baseSpecies !== 'Dondozo') continue;
				if (!pokemon.getVolatile('commanding')) {
					// If Dondozo already was commanded this fails
					if (ally.getVolatile('commanded')) return;
					// Cancel all actions this turn for pokemon if applicable
					this.queue.cancelAction(pokemon);
					// Add volatiles to both pokemon
					this.add('-activate', pokemon, 'ability: Commander');
					pokemon.addVolatile('commanding', ally);
					ally.addVolatile('commanded', pokemon);
					// Continued in conditions.ts in the volatiles
				}
			}
		},
		desc: "If this Pokemon is a Tatsugiri and a Dondozo is an active ally, this Pokemon goes into the Dondozo's mouth. The Dondozo has its Attack, Special Attack, Speed, Defense, and Special Defense raised by 2 stages. During the effect, this Pokemon cannot select an action, and it is treated as an invalid target for other moves, causing them to redirect, fail, or miss. This Pokemon still takes indirect damage during the effect; if it faints, the effect ends, and Dondozo's stats will be reduced by 2 stages. If the Dondozo switches out or faints during the effect, this Pokemon regains the ability to select an action on its next turn.",
	},
	corrosion: {
		inherit: true,
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
				move.ignoreImmunity['psn'] = true;
				move.ignoreImmunity['tox'] = true;
			}
		},
		//Self-poison prevention implemented in scripts.ts as an edit to setStatus in pokemon.ts.
		rating: 3,
		desc: "This Pokemon can hit Steel types with Poison-type moves. It can also poison or badly poison other Pokemon regardless of their typing.",
		shortDesc: "Poison moves hit Steel and moves can poison Poison and Steel types.",
	},
	costar: {
		inherit: true,
		name: "Co-Star",
		onStart(pokemon) {
			let activated = false;
			for(const ally of pokemon.adjacentAllies()){
				if (ally.fainted) return;
				if(ally.hasAbility('owntempo')){
					if(!activated){
						this.add('-activate', pokemon, 'ability: Co-Star');
						activated = true;
					}
					this.add('-activate', ally, '[from] ability: Own Tempo');
					this.hint('Own Tempo blocks effects that steal or copy its moves');
					continue;
				}

				let i: BoostID;
				for (i in ally.boosts) {
					pokemon.boosts[i] = ally.boosts[i];
				}
				if(!activated){
					this.add('activate', pokemon, 'ability: Co-Star');
					activated = true;
				}
				this.add('-copyboost', pokemon, ally);
			}
		},
		shortDesc: "On switch-in, this Pokemon copies all of its allies' stat stage changes.",
		desc: "On switch-in, this Pokemon copies all of its adjacent allies' stat stage changes, unless that ally has Own Tempo.",
	},
	damp: {
		inherit: true,
		onAnyTryMove(target, source, effect) {
			if (['eggbomb', 'explosion', 'mindblown', 'napalm', 'searingshot', 'selfdestruct', 'shelltrap'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Damp', effect, '[of] ' + target);
				return false;
			}
		},
		desc: "While this Pokemon is active, Egg Bomb, Explosion, Mind Blown, Napalm, Searing Shot, Self-Destruct, Shell Trap, and the Aftermath Ability are prevented from having an effect.",
		shortDesc: "Prevents explosion-based moves and Abilities while this Pokemon is active.",
	},
	dauntlessshield: {
		inherit: true, //woo, two lines of code since I override the onStart
		onStart(pokemon) {
			if (pokemon.hp > pokemon.maxhp / 2) return;
			if (this.boost({def: 1, spd: 1}, pokemon)) {
				this.effectState.shieldBoost = true;
			}
		},
		onAfterMoveSecondary(pokemon, source, move) {
			if (this.effectState.shieldBoost || pokemon.hp > pokemon.maxhp / 2) return;
			if (this.boost({def: 1, spd: 1}, pokemon)) {
				this.effectState.shieldBoost = true;
			}
		},
		onResidualOrder: -99,
		onResidual(pokemon, source, move) {
			if (this.effectState.shieldBoost || pokemon.hp > pokemon.maxhp / 2) return;
			if (this.boost({def: 1, spd: 1}, pokemon)) {
				this.effectState.shieldBoost = true;
			}
		},
		onEnd(pokemon) {
			delete this.effectState.shieldBoost;
		},
		desc: "When this Pokemon switches in at or drops below 1/2 of its max HP, its Defense and Sp. Defense are raised one stage. This effect can only happen once per switch-in.",
		shortDesc: "When below half health, boosts Defense and Sp. Def by 1 stage. Once per switch-in.",
	},
	defeatist: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify([0x0AAB,0x1000]);
			}
		},
		onModifySpA(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify([0x0AAB,0x1000]);
			}
		},
		desc: "While this Pokemon has 1/2 or less of its maximum HP, its Attack and Special Attack are reduced by 1/3.",
		shortDesc: "When this Pokemon has 1/2 or less of its max HP, Atk and Sp. Atk are reduced by 1/3.",
	},
	dryskin: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dry Skin');
				}
				return null;
			}
		},
		onFoeBasePowerPriority: 17,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (this.effectState.target !== defender) return;
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) {
				return this.chainModify(1.25);
			}
		},
		onWeather(target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 16);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 16, target, target);
			}
		},
		desc: "This Pokemon is immune to Water-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Water-type move. The power of Fire-type moves is multiplied by 1.25 when used on this Pokemon. At the end of each turn, this Pokemon restores 1/16 of its maximum HP, rounded down, if the weather is Rain Dance, and loses 1/16 of its maximum HP, rounded down, if the weather is Sunny Day. The weather effects are prevented if this Pokemon is holding a Utility Umbrella.",
		shortDesc: "This Pokemon is healed 1/4 by Water, 1/16 by Rain; is hurt 1.25x by Fire, 1/16 by Sun.",
	},
	embodyaspect: {
		onStart(pokemon) {
			if (pokemon.hp > pokemon.maxhp / 2) return;
			if (this.boost({def: 1, spd: 1}, pokemon)) {
				this.effectState.embodyBoost = true;
			}
		},
		onAfterMoveSecondary(pokemon, source, move) {
			if(pokemon.baseSpecies !== "Ogerpon" || this.effectState.embodyBoost || pokemon.hp > pokemon.maxhp / 2) return;
			switch(pokemon.forme){
			case "Wellspring":
				if (this.boost({spd: 1}, pokemon)) {
					this.effectState.embodyBoost = true;
				}
				break;
			case "Hearthflame":
				if (this.boost({atk: 1}, pokemon)) {
					this.effectState.embodyBoost = true;
				}
				break;
			case "Cornerstone":
				if (this.boost({def: 1}, pokemon)) {
					this.effectState.embodyBoost = true;
				}
				break;
			default:
				if (this.boost({spe: 1}, pokemon)) {
					this.effectState.embodyBoost = true;
				}
				break;
			}
		},
		onResidualOrder: -99,
		onResidual(pokemon, source, move) {
			if(pokemon.baseSpecies !== "Ogerpon" || this.effectState.embodyBoost || pokemon.hp > pokemon.maxhp / 2) return;
			switch(pokemon.forme){
			case "Wellspring":
				if (this.boost({spd: 1}, pokemon)) {
					this.effectState.embodyBoost = true;
				}
				break;
			case "Hearthflame":
				if (this.boost({atk: 1}, pokemon)) {
					this.effectState.embodyBoost = true;
				}
				break;
			case "Cornerstone":
				if (this.boost({def: 1}, pokemon)) {
					this.effectState.embodyBoost = true;
				}
				break;
			default:
				if (this.boost({spe: 1}, pokemon)) {
					this.effectState.embodyBoost = true;
				}
				break;
			}
		},
		onEnd(pokemon) {
			delete this.effectState.embodyBoost;
		},
		name: "Embody Aspect",
		desc: "If this Pokemon is Ogerpon and switches in at or drops below 1/2 of its max HP, raises a stat one stage based on its held Mask: Teal Mask raises Speed, Wellspring Mask raises Special Defense, Hearthstone Mask raises Attack, and Cornerstone Mask raises Defense. This effect can only happen once per switch-in.",
		shortDesc: "Ogerpon: Below half health, +1 to a stat based on Mask. Once per switch-in.",
        flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		rating: 3.5,
		num: 301,
	},
	flareboost: {
		name: "Flare Boost",
		rating: 3,
		num: 138,
		onModifySpA(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(2);
			}
		},
		desc: "If this Pokemon is burned, its Special Attack is multiplied by 2.",
		shortDesc: "If this Pokemon is burned, its Sp. Atk is 2x.",
	},
	flashfire: {
		onTryHit(target, source, move) {
			if (move.target !== "self" && (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) {
				move.accuracy = true;
				if (!target.addVolatile('preheat')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('preheat');
		},
		name: "Flash Fire",
		desc: "This Pokemon is immune to Fire-type moves and gains the Preheat effect when hit by a Fire-type move. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
		shortDesc: "This Pokemon gains the Preheat effect if hit by one Fire move; Fire immunity.",
        flags: {breakable: 1},
		rating: 3.5,
		num: 18,
	},
	flowerveil: {
		onAllySetStatus(status, target, source, effect) {
			if (this.field.effectiveTerrain(this.effectState.target) === 'grassyterrain' && source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Flower Veil');
				if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Flower Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (this.field.effectiveTerrain(this.effectState.target) === 'grassyterrain' && status.id === 'yawn') {
				this.debug('Flower Veil blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Flower Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		name: "Flower Veil",
		desc: "If Grassy Terrain is active and affecting this Pokemon, itself and its allies cannot gain a non-volatile status condition or the Yawn condition, and Rest will fail for any of them.",
		shortDesc: "If Grassy Terrain is active, this Pokemon and its allies cannot be statused.",
        flags: {breakable: 1},
		rating: 0.5,
		num: 166,
	},
	forewarn: {
		inherit: true,
		onStart(pokemon){
			pokemon.addVolatile('forewarn', pokemon, "Forewarn");
		},
		condition: { //This is a condition because Glyphic Spell can also add it. It should work as part of the ability otherwise.
			onStart(pokemon) {
				//let warnPokeMove: ([String, String][]) = undefined;
				let warnPokeMove: [String] = undefined;
				this.effectState.warnMoves = {};
				for (let i = 0; i < pokemon.side.foe.active.length; i++) {
					const target = pokemon.side.foe.active[i];
					warnPokeMove = target.getStrongestMove(pokemon);
					if(!warnPokeMove) continue;
					const newWarning = this.sample(warnPokeMove);
					this.effectState.warnMoves[newWarning[0]] = newWarning[1];
					this.add('-activate', pokemon, `ability: $(this.effectState.source)`, newWarning[0].id, '[of] ' + newWarning[1]); //$ is used because Glyphic Spell also adds this volatile
					//console.log("Forewarn found " + newWarning[0] + "'s " + newWarning[1]);
				}
			},
			onFoeSwitchIn(target){
				let warnPokeMove: ([String, String][]) = undefined;
				const pokemon = this.effectState.target;
				warnPokeMove = target.getStrongestMove(pokemon);
				if(!warnPokeMove) return;
				const newWarning = this.sample(warnPokeMove);
				this.effectState.warnMoves[newWarning[0]] = newWarning[1];
				this.add('-activate', pokemon, `ability: $(this.effectState.source)`, newWarning[0].id, '[of] ' + newWarning[1]); //$ is used because Glyphic Spell also adds this volatile
				//console.log("Forewarn found " + newWarning[0] + "'s " + newWarning[1]);
			},
			onFoeSwitchOut(target){
				if(this.effectState.warnMoves[target.fullname]) delete this.effectState.warnMoves[target.fullname];
			},
			onAccuracy(accuracy, target, source, move) {
				//console.log(this.effectState.warnMoves);
				if (target === source || typeof(accuracy) !== 'number' || move.ignoreEvasion) return;
				//console.log("Attack by [" + source.fullname + ", " + move.id + "]");
				//console.log(move);
				//console.log(source);
				if (this.effectState.warnMoves[source.fullname] === move.id){
					return false;
				}
			},
		},
		rating: 2.5,
		desc: "On switch-in, this Pokemon is alerted to each opposing Pokemon's move with the highest power. When an opposing Pokemon uses its identified attack on this Pokemon, it will dodge it using the rules of Evasiveness.",
		shortDesc: "This Pokemon is alerted to each foe's strongest attack and becomes Evasive to them.",
		miss: "  [POKEMON] foresaw the attack and evaded!",
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move && (move.type === 'Flying' || (move.twoType && move.twoType === 'Flying')) && pokemon.hp > pokemon.maxhp / 2) return priority + 1;
		},
		rating: 4,
		shortDesc: "This Pokemon's Flying-type attacks have +1 Priority when above 1/2 of its max HP.",
	},
	grasspelt: {
		inherit: true,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(2);
		},
		shortDesc: "If Grassy Terrain is active, this Pokemon's Defense is multiplied by 2.",
	},
	guarddog: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Guard Dog');
			return null;
		},
		onChangeBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Guard Dog", "[of] " + target);
				}
			}
			if (boost.def && boost.def < 0) {
				delete boost.def;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Defense", "[from] ability: Guard Dog", "[of] " + target);
				}
			}
		},
		name: "Guard Dog",
		desc: "Prevents other Pokemon from lowering this Pokemon's Attack or Defense stat stages. This Pokemon cannot be forced to switch out by another Pokemon's attack or item.",
		shortDesc: "Immune to Attack and Defense stat stage lowering. Cannot be forced to switch out.",
        flags: {breakable: 1},
		rating: 2,
		num: 275,
	},
	hadronengine: {
		inherit: true,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.effectiveTerrain() === 'electricterrain') {
				this.debug('Hadron Engine boost');
				return this.chainModify([0x119A, 0x1000]);
			}
		},
		rating: 4,
		shortDesc: "On switch-in, summons Electric Terrain. During Electric Terrain, Sp. Atk is 1.1x.",
	},
	//Harvest change implemented in the item-removing effects.
	healer: {
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				this.add('-activate', pokemon, 'ability: Healer');
				ally.cureStatus();
			}
		},
		name: "Healer",
		shortDesc: "On switch-in, this Pokemon cures adjacent allies' non-volatile status.",
		flags: {},
		rating: 0,
		num: 131,
	},
	heatproof: {
		inherit: true,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				return this.chainModify(0.5);
			}
		},
		onDamage(damage, target, source, effect) {},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Heatproof');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Heatproof');
			}
			return false;
		},
		desc: "The power of Fire-type attacks against this Pokemon is halved, and it is immune to burns.",
		shortDesc: "The power of Fire-type attacks against this Pokemon is halved; burns are prevented.",
	},
	heavymetal: {
		inherit: true,
		onStart(pokemon){
			pokemon.removeVolatile('magnetrise');
			pokemon.removeVolatile('telekinesis');
			pokemon.removeVolatile('risingchorus');
		},
		//Rest of floating block implemented in scripts.ts as part of pokemon.canFloat()
		shortDesc: "This Pokemon's weight is doubled. It is unable to float in the air.",
		block: "  [POKEMON] is weighed down with heavy metal!",
	},
	hypercutter: {
		onChangeBoost(boost, target, source, effect) {
			if (source && target !== source && boost.atk && boost.atk < 0) {
				this.boost({atk: -boost.atk}, target, target, null, false, true);
				delete boost.atk;
			}
		},
		name: "Hyper Cutter",
		desc: "If another Pokemon tries to lower this Pokemon's Attack stat stage, it raises by that amount instead.",
		shortDesc: "If Attack is attempted to be lowered by others, raises by that amount instead.",
        flags: {breakable: 1},
		rating: 2,
		num: 52,
	},
	icebody: {
		inherit: true,
		onWeather(target, source, effect) {
			if (effect.id === 'snow') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'snow') return false;
		},
		onDamage(damage, pokemon, soruce, effect) {
			if (effect.id === 'frz') return null;
		},
		desc: "If Snow is active, this Pokemon restores 1/8 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no cold damage resulting from Snow or Freeze.",
		shortDesc: "If Snow is active, this Pokemon heals 1/8 of its max HP each turn. No cold damage.",
	},
	illuminate: {
		onStart(pokemon){
			if ('midnight' in this.field.pseudoWeather) {
				this.field.removePseudoWeather('midnight');
			}
		},
		onAnyTryMove(target, source, effect) {
			if (effect.id === 'midnight') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.source, 'ability: Illuminate', effect, '[of] ' + this.effectState.target);
				return false;
			}
		},
		name: "Illuminate",
		desc: "Prevents other Pokemon from lowering this Pokemon's accuracy stat stage. This Pokemon ignores a target's Evasiveness. While this Pokemon is active, supernatural darkness is dispelled and cannot be set.",
		shortDesc: "Accuracy can't be lowered by others, ignores Evasiveness, and dispels Midnight.",
        flags: {breakable: 1},
		rating: 0.5,
		num: 35,
	},
	immunity: {
		inherit: true,
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Immunity');
				return null;
			}
		},
		shortDesc: "This Pokemon cannot be poisoned and is immune to powder moves.",
	},
	innerfocus: {
		inherit: true,
		onModifyMove(move) {
			// this doesn't actually do anything because ModifyMove happens after the tracksTarget check
			// the actual implementation is in Battle#getTarget
			move.tracksTarget = true;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', '[of] ' + target);
			}
			if (effect.name === 'Disturbance' && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Inner Focus', '[of] ' + target);
			}
		},
		onDamagingHit(damage, target, source){
			if(target.volatiles['focuspunch']?.lostFocus) delete target.volatiles['focuspunch'].lostFocus;
		},
		desc: "This Pokemon cannot be made to flinch, its moves cannot be redirected to a different target by any effect, and it will never lose focus when using Focus Punch. This Pokemon is immune to the effect of the Intimidate and Disturbance Abilities.",
		shortDesc: "This Pokemon cannot flinch, ignores redirection. Immune to Intimidate/Disturbance.",
	},
	insomnia: {
		inherit: true,
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number' || !('midnight' in this.field.pseudoWeather)) return;
			this.debug('insomnia - enhancing accuracy');
			return accuracy * 1.3;
		},
		desc: "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it. During supernatural darkness, this Pokemon's moves have their accuracy multiplied by 1.3.",
		shortDesc: "Cannot fall asleep; gaining while asleep cures it. Accuracy 1.3x in Midnight.",
	},
	intrepidsword: {
		inherit: true, //woo, two lines of code since I override the onStart
		onStart(pokemon) {
			if (pokemon.hp > pokemon.maxhp / 2) return;
			if (this.boost({atk: 1}, pokemon)) {
				this.effectState.swordBoost = true;
			}
		},
		onAfterMoveSecondary(pokemon, source, move) {
			if (this.effectState.swordBoost || pokemon.hp > pokemon.maxhp / 2) return;
			if (this.boost({atk: 1}, pokemon)) {
				this.effectState.swordBoost = true;
			}
		},
		onResidualOrder: -99,
		onResidual(pokemon, source, move) {
			if (this.effectState.swordBoost || pokemon.hp > pokemon.maxhp / 2) return;
			if (this.boost({atk: 1}, pokemon)) {
				this.effectState.swordBoost = true;
			}
		},
		onEnd(pokemon) {
			delete this.effectState.shieldBoost;
		},
		desc: "When this Pokemon switches in at or drops below 1/2 of its max HP, its Attack is raised one stage. This effect can only happen once per switch-in.",
		shortDesc: "When below half health, boosts Attack by 1 stage. Once per switch-in.",
	},
	ironfist: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3x power.",
	},
	klutz: {
		inherit: true,
		//Preventing Speed drops from training items implemented in items.ts on the items themselves.
		desc: "This Pokemon's held item has no effect. This Pokemon cannot use Fling successfully, and Swing will not have its power boosted if an appropriate item is held.",
		shortDesc: "This Pokemon's held item has no effect. Fling cannot be used.",
	},
	leafguard: {
		inherit: true,
		onChangeBoost(boost, target, source, effect) {
			if (!['sunnyday', 'desolateland'].includes(target.effectiveWeather()) || (source && target === source)) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				this.add("-fail", target, "unboost", "[from] ability: Leaf Guard", "[of] " + target);
			}
		},
		desc: "If Sunny Day is active, this Pokemon cannot gain a non-volatile status condition or have its stats lowered by an opponent.",
		shortDesc: "If Sunny Day is active, this Pokemon cannot be statused or have stats lowered.",
		rating: 1.5,
	},
	lightmetal: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.2);
		},
		shortDesc: "This Pokemon's weight is halved and its Speed is boosted by 20%.",
	},
	limber: {
		inherit: true,
		onEntryHazard(pokemon) {
			return null;
		},
		shortDesc: "This Pokemon cannot be paralyzed. When switching in, it is unaffected by hazards.",
	},
	liquidooze: {
		inherit: true,
		onSourceTryHeal(damage, target, source, effect) {
			//console.log("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			const canOoze = ['drain', 'leechseed', 'strengthsap'];
			if (canOoze.includes(effect.id)) {
				const boost = (!target.ignoringItem() && target.item === 'bigroot' && effect.id === 'leechseed');
				this.damage(boost ? (damage * 1.5) : damage, target, source);
				return 0;
			}
		},
	},
	magician: { //Can't inherit because otherwise onAfterMoveSecondarySelf DOESN'T OVERRIDE ITSELF
		onAfterMoveSecondarySelf(source, target, move) {
			//console.log("magicked? " + this.effectState.magicked);
			if (!move || !target || target === source || move.category === 'Status' || this.effectState.magicked) return;
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return;
			}
			this.effectState.magicked = true;
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemState, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return;
			}
			this.add('-ability', source, 'ability: Magician');
			this.add('-activate', source, 'move: Trick', '[of] ' + source);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Trick');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Trick');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Trick');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Trick');
			}
		},
		onSwitchOut(pokemon) {
			delete this.effectState.magicked;
		},
		name: "Magician",
		desc: "The user swaps its held item with the held item of a Pokemon it hits with an attack. This effect fails if neither the user or the target is holding an item or if the user is trying to give or take a Mega Stone or form-changing item to or from the species that can Mega Evolve or change forms with it. The target is immune to this effect if it has the Sticky Hold Ability. This effect can only trigger once per switch-in. Does not affect Doom Desire and Future Sight.",
		shortDesc: "Swaps items with a Pokemon it hits with an attack. Once per switch-in.",
        flags: {},
		num: 170,
		rating: 1.5,
	},
	magicguard: {
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move' && effect.name !== 'Recoil' && 
				![this.dex.items.get('lifeorb'), this.dex.conditions.get('High Jump Kick'), this.dex.conditions.get('Jump Kick'), this.dex.conditions.get('Steel Beam'), this.dex.conditions.get('Chloroblast'), this.dex.conditions.get('Mind Blown')].includes(effect)
			) {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		name: "Magic Guard",
		desc: "This Pokemon can only be damaged by direct attacks. Curse and Substitute on use, Belly Drum, Pain Split, recoil, and confusion damage are considered direct damage.",
		shortDesc: "This Pokemon can only be damaged by direct attacks or recoil.",
        flags: {},
		rating: 4,
		num: 98,
	},
	magmaarmor: {
		inherit: true,
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'snow') return false;
		},
		desc: "The power of Ice-type attacks against this Pokemon is halved, and it is immune to being frozen or taking cold damage from Snow.",
		shortDesc: "Halves power of Ice-type moves against this Pokemon; prevents freeze and cold damage.",
	},
	magnetpull: {
		onStart(pokemon){
			let activated = false;
			for(const target of pokemon.adjacentFoes()){
				if (target.hasType('Steel') && !target.volatiles['trapped']) {
					if(!activated){
						this.add('-ability', pokemon, 'Magnet Pull');
						activated = true;
					}
					target.addVolatile('trapped', pokemon, 'magnetpull', 'trapper');
				}
			}
		},
		onFoeSwitchIn(target){
			if (target.hasType('Steel') && !target.volatiles['trapped']) {
				target.addVolatile('trapped', this.effectState.target, '[from] ability: Magnet Pull', 'trapper');
			}
		},
		onEnd(pokemon){
			if(pokemon.volatiles['trapper']){
				for(const trapped of pokemon.volatiles['trapper'].linkedPokemon){
					trapped.removeVolatile('trapped');
				}
			}
		},
		flags: {},
		name: "Magnet Pull",
		rating: 4,
		num: 42,
		desc: "Prevents opposing Steel-types from switching out for four turns (six turns if the user is holding Grip Claw), starting from when either the user or a valid foe switches in. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field.",
		shortDesc: "Traps enemy Steel-types for 4 turns.",
	},
	megalauncher: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		desc: "This Pokemon's ball, bomb, cannon, and pulse moves have their power multiplied by 1.3. Heal Pulse restores 2/3 of a target's maximum HP, rounded half down.",
		shortDesc: "This Pokemon's ballistic moves have 1.3x power.",
	},
	mimicry: {
		inherit: true,
		onTerrainChange(pokemon) {
			let newType;
			switch (this.field.effectiveTerrain()) {
			case 'electricterrain':
				newType = "Electric";
				break;
			case 'grassyterrain':
				newType = "Grass";
				break;
			case 'mistyterrain':
				newType = "Fairy";
				break;
			case 'psychicterrain':
				newType = "Psychic";
				break;
			default:
				newType = pokemon.species.types[0];
				break;
			}
			const types = pokemon.getTypes();
			if (types[0] === newType || !pokemon.setType(types[1] ? [newType, types[1]] : newType)) return;
			this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] ability: Mimicry');
		},
		desc: "This Pokemon's primary type changes to match the active Terrain when this Pokemon acquires this Ability, or whenever a Terrain begins. Electric type during Electric Terrain, Grass type during Grassy Terrain, Fairy type during Misty Terrain, and Psychic type during Psychic Terrain. If this Ability is acquired without an active Terrain, or a Terrain ends or is suppressed, this Pokemon's types become the original types for its species.",
		shortDesc: "This Pokemon's first type changes to match the Terrain. Type reverts when Terrain ends.",
		rating: 1,
	},
	moody: {
		onSourceHit(target, source, move) {
			if(move.category === "Physical"){
				this.effectState.boost = {spa: 2, atk: -1};
			}
			if(move.category === "Special"){
				this.effectState.boost = {atk: 2, spa: -1};
			}
		},
		onDamagingHit(damage, target, source, move){
			if(move.category === "Physical"){
				this.effectState.boost = {def: 2, spd: -1};
			}
			if(move.category === "Special"){
				this.effectState.boost = {spd: 2, def: -1};
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.effectState.boost = {def: 1, spd: 1, spe: -1};
			}
		},
		onTryHeal(damage, target, source, effect) {
			if(damage >= this.effectState.target.maxhp / 5){
				this.effectState.boost = {atk: 1, spa: 1, spe: 1, def: -1, spd: -1};
			}
		},
		onResidualOrder: 1,
		onResidual(pokemon) {
			if(this.effectState.boost !== null) this.boost(this.effectState.boost);
			this.effectState.boost = null;
		},
		name: "Moody",
		desc: `At the end of each turn, this Pokemon has stats raised and lowered based on what it has done during that turn:
		-Using an attacking move lowers the attacking stat used and sharply raises the other one.
		-Getting hit by an attack sharply raises the defensive stat used and lowers the other one.
		-Causing another Pokemon to faint raises both defenses but lowers Speed.
		-Receiving a healing effect of 20% or more of its max HP raises both attacking stats and Speed, but lowers both defenses.
		If multiple conditions are met in one turn, only the latest-occuring one will determine the stat change.`,
		shortDesc: "Raises and lowers stats each turn depending on what happens in battle.",
		flags: {},
		rating: 3,
		num: 141,
	},
	myceliummight: {
		inherit: true,
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreAbility = true;
				move.ignoreImmunity = true;
			}
		},
		desc: "This Pokemon's Status moves ignore immunities of other Pokemon, and go last among Pokemon using the same or greater priority moves.",
		shortDesc: "This Pokemon's Status moves go last in their priority bracket and ignore immunities.",
	},
	noguard: {
		inherit: true,
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
	},
	normalize: {
		onModifyTypePriority: 1,
		onAnyModifyType(move, source, target) {
			console.log("Normalizer: ");
			console.log(this.effectState.target);
			console.log(source === this.effectState.target);
			console.log(target === this.effectState.target);
			if (move.id === 'struggle'|| !(source === this.effectState.target || target === this.effectState.target)) return;
			const noModifyType = [
				'bullfight', 'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'secretpower', 'technoblast', 'terablast', 'weatherball',
			];
			if (!(source === this.effectState.target && noModifyType.includes(move.id))) {
				move.type = 'Normal';
				if (move.twoType) delete move.twoType;
			}
		},
		flags: {breakable: 1},
		name: "Normalize",
		rating: 1,
		num: 96,
		desc: "This Pokemon's moves and moves used against this Pokemon are changed to be Normal type. This effect comes before other effects that change a move's type.",
		shortDesc: "Moves used by or on this Pokemon are changed to Normal type.",
	},
	orichalcumpulse: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
				this.debug('Orichalcum boost');
				return this.chainModify([0x119A, 0x1000]);
			}
		},
		rating: 4,
		shortDesc: "On switch-in, summons sun. During sun, Attack is 1.1x.",
	},
	overcoat: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (['powder','sandstorm','snow'].includes(type)) return false;
		},
		desc: "This Pokemon is immune to powder effects and damage from Sandstorm and Snow.",
		shortDesc: "This Pokemon is immune to powder effects and damage from Sandstorm and Snow.",
	},
	owntempo: {
		inherit: true,
		onModifyMove(move) {
			move.flags = {...move.flags, 'failcopycat': 1, 'failmefirst': 1, 'failmimic': 1,};
			delete move.flags['mirror'];
			delete move.flags['snatch'];
			move.noSketch = true; //Currently does nothing
			move.uncopyable = true;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', '[of] ' + target);
			}
			if (effect.name === 'Disturbance' && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Own Tempo', '[of] ' + target);
			}
		},
		//The rest of the immunity is implemented in the moves/abilities themselves.
		desc: `This Pokemon cannot be confused or have its stats lowered by Intimidate or Disturbance. Its moves and attributes also cannot be copied or stolen:
		-Copycat, Mimic, Mirror Move, Sketch, and Dancer will fail to copy a move it used; Snatch will fail to steal such a move, and Me First will fail to use it.
		-Trace and Role Play will fail to copy its Ability. Trace will consider this an executed attempt and not wait to copy another Ability.
		-Reflect Type will fail to copy its type(s).
		-Psych Up, Co-Star, Opportunist, and a Mirror Herb will fail to copy its stat changes, and Spectral Thief will fail to steal them. A Mirror Herb will still be consumed.
		-Transform, Imposter, and Glyphic Spell Copy will fail to transform into it.`,
		shortDesc: "This Pokemon cannot be confused. Attempts to copy or steal its moves and attributes fail.",
        flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, failskillswap: 1},
		activate: "  [POKEMON]'s mannerisms couldn't be acquired!",
	},
	parentalbond: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'fling', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.damage) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1){
				if(move.secondary) delete move.secondary;
				return this.chainModify(0.5);
			}
		},
		name: "Parental Bond",
		flags: {},
		rating: 4.5,
		num: 184,
	},
	pastelveil: {
		onUpdate(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Pastel Veil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
		name: "Pastel Veil",
		shortDesc: "This Pokemon and its allies cannot be poisoned.",
        flags: {breakable: 1},
		rating: 2,
		num: 257,
	},
	pickpocket: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && move?.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Pickpocket', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Pickpocket', '[of] ' + source);
			}
		},
		desc: "If this Pokemon is hit by a contact move, it steals the attacker's item; if this Pokemon is already holding an item, it will discard the stolen item. This move cannot cause Pokemon with the Sticky Hold Ability to lose their held item or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, a Silvally, a Zacian, or a Zamazenta to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, Memory, Rusted Sword, or Rusted Shield, respectively. This effect applies after all hits from a multi-hit move.",
		shortDesc: "If this Pokemon is hit by a contact move, it steals the attacker's item.",
	},
	poweraura: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (!move.hasAuraBreak && attacker !== this.effectState.target) {
				if (!move.auraBooster) move.auraBooster = this.effectState.target;
				if (move.auraBooster !== this.effectState.target) return;
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Power Aura",
		shortDesc: "This Pokemon's allies have the power of their moves multiplied by 1.3.",
		flags: {},
		rating: 1,
		num: 249,
		start: "  [POKEMON] is radiating a power aura!",
	},
	prismarmor: {
		onModifyMovePriority: -100,
		onAnyModifyMove(move, source, target){ //Fake unbreakableness by deleting ignoringAbility, except for Teravolt and Turboblaze.
			if(target !== this.effectState.source) return;
			if(move.ignoringAbility && !['teravolt','turboblaze'].includes(source.ability)){
				delete move.ignoringAbility;
			}
		},
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 10, pokemon, pokemon);
		},
		name: "Prism Armor",
		desc: "This Pokemon receives 3/4 damage from supereffective attacks. It also loses 10% of its max HP at the end of each turn. Lunar Ray, Solar Impact, Smite, and Mold Breaker cannot ignore this Ability.",
		shortDesc: "3/4 damage from supereffective attacks but loses 10% max HP each turn.",
        flags: {breakable: 1},
		rating: 1,
		num: 232,
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		name: "Protean",
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type.",
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
		flags: {},
		rating: 4.5,
		num: 168,
	},
	protosynthesis: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		onEnd(pokemon){
			if(pokemon.volatiles['protosynthesis']) delete pokemon.volatiles['protosynthesis'];
		},
		flags: {},
		desc: "If Sunny Day is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.3. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Sunny Day, a held Booster Energy will not activate and the effect ends when Sunny Day is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Sunny Day active or Booster Energy used: highest stat is 1.3x.",
	},
	purifyingsalt: {
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Purifying Salt');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'snow' || type === 'frz') return false;
		},
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if ((move.type === 'Ghost' || (move.twoType && move.twoType === 'Ghost'))) {
				return this.chainModify(0.5);
			}
		},
		name: "Purifying Salt",
		desc: "The power of Ghost-type attacks against this Pokemon is halved, and it is immune to freeze and cold damage from Snow.",
		shortDesc: "Halves power of Ghost-type attacks against this Pokemon; no freeze or cold damage.",
        flags: {breakable: 1},
		rating: 2,
		num: 272,
	},
	quarkdrive: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		onEnd(pokemon){
			if(pokemon.volatiles['quarkdrive']) delete pokemon.volatiles['quarkdrive'];
		},
		flags: {},
		desc: "If Electric Terrain is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.3. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Electric Terrain, a held Booster Energy will not activate and the effect ends when Electric Terrain is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Electric Terrain active or Booster Energy used: highest stat is 1.3x.",
	},
	raindish: {
		inherit: true,
		onWeather(target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		desc: "If Rain is active, this Pokemon restores 1/8 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Rain is active, this Pokemon heals 1/8 of its max HP each turn.",
	},
	receiver: {
		onSwitchIn(pokemon){
			this.effectState.switchingIn = true;
		},
		onStart(pokemon){
			const replaced = pokemon.side.faintedThisTurn;
			if (!this.effectState.switchingIn || !replaced) return;
			const ability = replaced.getAbility();
			if (ability.flags['noreceiver'] || ability.id === 'noability') return;
			this.add('-ability', this.effectState.target, ability, '[from] ability: Receiver', '[of] ' + replaced);
			this.effectState.target.setAbility(ability);
			this.effectState.switchingIn = false;
		},
		name: "Receiver",
		desc: "This Pokemon copies the Ability of an ally that fainted this turn. Abilities that cannot be copied are \"No Ability\", Alchemy, As One, Comatose, Disguise, Flower Gift, Forecast, Glyphic Spell, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Rage Mode, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, Zen Mode, and Zero to Hero.",
		shortDesc: "This Pokemon copies the Ability of an ally that fainted.",
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		rating: 1,
		num: 223,
	},
	rivalry: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.5);
				} else {
					this.debug('Rivalry weaken');
					return this.chainModify(0.75);
				}
			}
		},
		desc: "This Pokemon's attacks have their power multiplied by 1.5 against targets of the same gender or multiplied by 0.75 against targets of the opposite gender. There is no modifier if either this Pokemon or the target is genderless.",
		shortDesc: "This Pokemon's attacks do 1.5x on same gender targets; 0.75x on opposite gender.",
	},
	runaway: {
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			if(!pokemon.volatiles['meanlooked']){
				pokemon.trapped = false;
			}
		},
		name: "Run Away",
		desc: "This Pokemon may switch out even when trapped by another Pokemon.",
        flags: {},
		rating: 1,
		num: 50,
	},
	sandveil: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onStart(pokemon){
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (this.field.isWeather('sandstorm')){
				if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
					return;
				}
				pokemon.addVolatile('evade', pokemon, 'sandstorm');
				pokemon.addVolatile('evadestall');
				this.add('-singleturn', pokemon, 'ability: Sand Veil');
			} else if (pokemon.volatiles['evade'] && pokemon.volatiles['evade'].source === 'sandstorm'){
				pokemon.removeVolatile('evade');
				this.add('-end', pokemon, 'ability: Sand Veil');
			}
		},
		name: "Sand Veil",
		desc: "If this Pokemon is sent out during a Sandstorm, or if a Sandstorm activates while it is on the field, it becomes Evasive for the rest of the turn. While Evasive, all moves used on this Pokemon will fail accuracy checks, unless they ignore the condition. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "This Pokemon becomes Evasive when it encounters a Sandstorm; immunity to it.",
		flags: {},
		rating: 1.5,
		num: 8,
		start: "  [POKEMON] disappeared into the sandstorm!",
		end: "  [POKEMON] became visible again.",
	},
	schooling: {
		onStart(pokemon) {
			if (!['Wishiwashi', 'Tynamo'].includes(pokemon.baseSpecies.baseSpecies) || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				} else if (pokemon.species.id === 'tynamo') {
					pokemon.formeChange('Tynamo-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				} else if (pokemon.species.id === 'tynamoschool') {
					pokemon.formeChange('Tynamo');
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (
				!['Wishiwashi', 'Tynamo'].includes(pokemon.baseSpecies.baseSpecies) || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				} else if (pokemon.species.id === 'tynamo') {
					pokemon.formeChange('Tynamo-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				} else if (pokemon.species.id === 'tynamoschool') {
					pokemon.formeChange('Tynamo');
				}
			}
		},
		name: "Schooling",
		desc: "On switch-in, if this Pokemon is a Wishiwashi or Tynamo that is level 20 or above and has more than 1/4 of its maximum HP left, it changes to School Form. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
		shortDesc: "If user is Wishiwashi/Tynamo, changes to School Form if it has > 1/4 max HP, else Solo Form.",
        flags: {cantsuppress: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		rating: 3,
		num: 208,
	},
	shadowtag: {
		onStart(pokemon){
			let activated = false;
			for(const target of pokemon.adjacentFoes()){
				if (!target.hasAbility('shadowtag') && !target.volatiles['trapped']) {
					if(!activated){
						this.add('-ability', pokemon, 'Shadow Tag');
						activated = true;
					}
					target.addVolatile('trapped', pokemon, 'shadowtag', 'trapper');
				}
			}
		},
		onFoeSwitchIn(target){
			if (!target.hasAbility('shadowtag') && !target.volatiles['trapped']) {
				this.add('-ability', this.effectState.target, 'Shadow Tag');
				target.addVolatile('trapped', this.effectState.target, '[from] ability: Shadow Tag', 'trapper');
			}
		},
		onEnd(pokemon){
			if(pokemon.volatiles['trapper']){
				for(const trapped of pokemon.volatiles['trapper'].linkedPokemon){
					trapped.removeVolatile('trapped');
				}
			}
		},
		flags: {},
		name: "Shadow Tag",
		rating: 4.5,
		num: 23,
		desc: "Prevents opposing Pokemon from switching out for four turns (six turns if the user is holding Grip Claw), starting from when either the user or a valid foe switches in. The target can still switch out if it is holding Shed Shell, is behind a Substitute, has Shadow Tag or Run Away, or uses Baton Pass, Escape Tunnel, Parting Shot, Psy Bubble, Slip Away, Teleport, U-turn, or Volt Switch. The effect ends if the user leaves the field.",
		shortDesc: "Traps enemies without Shadow Tag for 4 turns.",
	},
	sharpness: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Shapness boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Sharpness",
		shortDesc: "This Pokemon's slicing moves have their power multiplied by 1.3.",
	},
	sheerforce: {
		inherit: true,
		//Actual changes made in scripts.ts as edits to useMoveInner and hitStepMoveHitLoop.
		desc: "This Pokemon's attacks with secondary effects have their power multiplied by 1.3, but the secondary effects are removed.",
		shortDesc: "This Pokemon's attacks with secondary effects have 1.3x power; nullifies the effects.",
	},
	shieldsdown: {
		onSwitchIn(pokemon) {
			if (!['Minior','Prominoid'].includes(pokemon.baseSpecies.baseSpecies) || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor') {
					if(pokemon.baseSpecies.baseSpecies === 'Minior') {
						pokemon.formeChange('Minior-Meteor');
					} else {
						pokemon.formeChange('Prominoid-Meteor');
					}
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onStart(pokemon) {
			if (!['Minior','Prominoid'].includes(pokemon.baseSpecies.baseSpecies) || pokemon.transformed || !pokemon.activeTurns) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor') {
					if(pokemon.baseSpecies.baseSpecies === 'Minior') {
						pokemon.formeChange('Minior-Meteor');
					} else {
						pokemon.formeChange('Prominoid-Meteor');
					}
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (!['Minior','Prominoid'].includes(pokemon.baseSpecies.baseSpecies) || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor') {
					if(pokemon.baseSpecies.baseSpecies === 'Minior') {
						pokemon.formeChange('Minior-Meteor');
					} else {
						pokemon.formeChange('Prominoid-Meteor');
					}
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['miniormeteor', 'prominoidmeteor'].includes(target.species.id) || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shields Down');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (!['miniormeteor', 'prominoidmeteor'].includes(target.species.id) || target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Shields Down');
			return null;
		},
		onModifyMovePriority: -100,
		onAnyModifyMove(move, source, target){ //Fake unbreakableness by deleting ignoringAbility, except for Teravolt and Turboblaze.
			if(target !== this.effectState.source) return;
			if(move.ignoringAbility && !['teravolt','turboblaze'].includes(source.ability)){
				delete move.ignoringAbility;
			}
		},
		name: "Shields Down",
		desc: "If this Pokemon is a Minior or Prominoid, it changes to its Core forme if it has 1/2 or less of its maximum HP, and changes to Meteor Form if it has more than 1/2 its maximum HP. This check is done on switch-in and at the end of each turn. While in its Meteor Form, it cannot become affected by non-volatile status conditions. Lunar Ray, Solar Impact, Smite, and Mold Breaker cannot ignore this Ability.",
		shortDesc: "If Minior/Prominoid, on switch-in/turn end, changes to Core at <= 1/2 max HP, else Meteor.",
        flags: {breakable: 1, cantsuppress: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		rating: 3,
		num: 197,
	},
	slowstart: {
		onStart(pokemon) {
			if(!this.effectState.time){
				this.effectState.time = 5;
				this.add('-start', pokemon, 'ability: Slow Start');
			}
			//console.log("Slow Start count: " + this.effectState.time);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if(this.effectState.time > 0) return this.chainModify(0.5);
		},
		onModifySpe(spe, pokemon) {
			if(this.effectState.time > 0) return this.chainModify(0.5);
		},
		onResidualOrder: 1,
		onResidual(pokemon) {
			if(pokemon.activeTurns && this.effectState.time > 0) this.effectState.time--;
			if(this.effectState.time === 0){
				this.effectState.time = -1; //-1 is truthy, so it doesn't get re-applied in onStart, but won't decrement or re-trigger the ending here either
				this.add('-end', pokemon, 'Slow Start');
			}
		},
		name: "Slow Start",
		desc: "This Pokemon's Attack and Speed are halved for the first 5 turns it is on the field in battle.",
		shortDesc: "This Pokemon's Attack and Speed are halved for its first 5 turns.",
		flags: {},
		rating: -1,
		num: 112,
	},
	snowcloak: {
		onImmunity(type, pokemon) {
			if (type === 'snow') return false;
		},
		onStart(pokemon){
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if(this.field.isWeather('snow')){
				if (pokemon.volatiles['odorsleuth'] || pokemon.volatiles['evade'] || pokemon.volatiles['minimize'] || pokemon.volatiles['doubleteam'] || pokemon.volatiles['tangledfeet']){
					return;
				}
				pokemon.addVolatile('evade', pokemon, 'snow');
				pokemon.addVolatile('evadestall');
				this.add('-singleturn', pokemon, 'ability: Snow Cloak');
			} else if (pokemon.volatiles['evade'] && pokemon.volatiles['evade'].source === 'snow'){
				pokemon.removeVolatile('evade');
				this.add('-end', pokemon, 'ability: Snow Cloak');
			}
		},
		name: "Snow Cloak",
		desc: "If this Pokemon is sent out during Snow, or if Snow activates while it is on the field, it becomes Evasive for the rest of the turn. While Evasive, all moves used on this Pokemon will fail accuracy checks, unless they ignore the condition. This Pokemon takes no damage from Snow.",
		shortDesc: "This Pokemon becomes Evasive when it encounters Snow; immunity to it.",
		flags: {},
		rating: 1.5,
		num: 81,
		start: "  [POKEMON] disappeared into the snow!",
		end: "  [POKEMON] became visible again.",
	},
	snowplow: {
		onImmunity(type, pokemon) {
			if (type === 'snow') return false;
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('snow')) {
				return this.chainModify(2);
			}
		},
		name: "Snow Plow",
		shortDesc: "If Snow is active, this Pokemon's Speed is doubled; immunity to it.",
		flags: {},
		rating: 3,
		num: 202,
	},
	stalwart: {
		inherit: true,
		onBeforeTurn(pokemon){
			pokemon.addVolatile('nointerrupt');
		},
		desc: "This Pokemon's attacks cannot be interrupted once selected. The Pokemon will ignore sleep, freeze, flinch, Disable, Encore, Imprison, and PP drain to 0 inflicted earlier in the same turn, and bypass the checks for full paralysis, confusion, and attraction if inflicted earlier in the same turn. If given a Choice item earlier in the turn, the move locking will be ignored. Gravity and Heal Block will still prevent moves from executing. Additionally, this Pokemon's moves cannot be redirected to a different target by any effect.",
		shortDesc: "This Pokemon's attacks cannot be interrupted or redirected after selection.",
		rating: 1,
	},
	steadfast: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Steadfast only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', target, 'Steadfast');
				this.boost({spe: 1}, target, target, null, true);
			}
		},
		name: "Steadfast",
		desc: "This Pokemon's Speed is raised by 1 stage for each of its stat stages that is lowered by an opposing Pokemon.",
		shortDesc: "This Pokemon's Speed is raised by 1 for each of its stats that is lowered by a foe.",
		flags: {},
		rating: 2.5,
		num: 128,
	},
	suctioncups: {
		inherit: true,
		onStart(pokemon){
			pokemon.removeVolatile('magnetrise');
			pokemon.removeVolatile('telekinesis');
			pokemon.removeVolatile('risingchorus');
		},
		//Suction Cups floating block implemented in scripts.ts as part of pokemon.canFloat()
		shortDesc: "This Pokemon cannot be forced out by another Pokemon's attack/item. Prevents floating.",
		desc: "This Pokemon cannot be forced out by another Pokemon's attack/item. This Pokemon cannot gain floating status.",
	},
	sweetveil: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Sweet Veil');
				pokemon.cureStatus();
			}
		},
	},
	synchronize: {
		inherit: true,
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (effect && effect.id === 'toxicspikes') return;
			this.add('-activate', target, 'ability: Synchronize');
			// Hack to make status-prevention abilities think Synchronize is a status move
			// and show messages when activating against it.
			source.trySetStatus(status, target, {status: status.id, id: 'synchronize'} as Effect);
		},
		desc: "If another Pokemon inflicts a non-volatile status condition on this Pokemon, that Pokemon receives the same non-volatile status condition.",
		shortDesc: "If status is inflicted by another Pokemon, it also gets that status.",
	},
	tangledfeet: {
		onDamage(damage, target, source, effect) {
			if (effect.id === this.toID('confused') && !pokemon.volatiles['odorsleuth']) {
				target.addVolatile('tangledfeet');
			}
		},
		condition: {
			duration: 2, //Should get removed in onBeforeMove, so this is a failsafe
			onStart(pokemon, source) {
				this.add('-activate', pokemon, 'ability: Tangled Feet');
			},
			onBeforeMove(pokemon, move) {
				pokemon.removeVolatile('tangledfeet');
			},
			onAccuracy(accuracy, target, source, move) {
				if (!move.ignoreEvasion && typeof(move.accuracy) === 'number') return false;
			},
			onEnd(pokemon){
				this.add('-end', pokemon, 'ability: Tangled Feet', '[silent]');
			}
		},
		name: "Tangled Feet",
		desc: "If the Pokemon is confused and hits itself in confusion, it becomes Evasive until its next turn. While Evasive, all moves used on this Pokemon will fail accuracy checks, unless they ignore the condition.",
		shortDesc: "Becomes Evasive after hitting itself in confusion.",
		flags: {},
		rating: 1,
		num: 77,
		activate: "  [POKEMON] became hard to hit!",
	},
	tangling: {
		onHit(target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) 
				this.add('-activate', target, 'ability: Tangling');{
				source.addVolatile('singletrap', target, Dex.abilities.get('tangling'), 'trapper');
			}
		},
		name: "Tangling",
		desc: "Pokemon making contact with this Pokemon become trapped on the following turn.",
		shortDesc: "Pokemon making contact with this Pokemon become trapped for a turn.",
        flags: {breakable: 1},
		rating: 2,
		num: 221,
	},
	teraformzero: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Teraform Zero');
			this.field.clearWeather();
			this.field.clearTerrain();
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (!strongWeathers.includes(weather.id)){
				this.add('-activate', this.effectState.target, 'ability: Teraform Zero');
				return false;
			}
		},
		onAnySetTerrain(target, source, terrain) {
			this.add('-ability', pokemon, 'ability: Teraform Zero');
			return false;
		},
		suppressWeather: true,
		suppressTerrain: true,
		name: "Teraform Zero",
		shortDesc: "Clears weather and terrain from the field and prevents them from being set.",
		desc: "When this Pokemon is sent in, active weather and terrain is cleared. Using a weather- or terrain-changing move will fail, and weather- or terrain-changing Abilities will not work, except for Primordial Sea, Desolate Land, and Delta Stream.",
        flags: {breakable: 1}, 
		rating: 3.5,
		num: 309,
	},
	terashell: {
		inherit: true,
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (this.effectState.resisted) return -1; // all hits of multi-hit move should be not very effective
			if (move.category === 'Status') return;
			if (!target.runImmunity(move.type)) return; // immunity has priority
			if (target.hp < target.maxhp) return;

			this.add('-activate', target, 'ability: Tera Shell');
			this.effectState.resisted = true;
			delete move.twoType; //Don't want double resistance
			return -1;
		},
		onBasePowerPriority: 22,
		onBasePower(basePower, attacker, defender, move) {
			const itemName = attacker.getItem().name;
			if (itemName.endsWith('Tera Shard') && itemName.substr(0, itemName.length - 11) === move.type) {
				this.debug('Tera Shell boost: ' + move.type);
				return this.chainModify(1.5);
			}
		},
		desc: "If this Pokemon is at full HP, any damage-dealing attack used on it will be treated as not very effective. The user's moves whose type matches that of its held Tera Shard will have their base power multiplied by 1.5x.",
		shortDesc: "Full HP: damaging attacks not very effective. Moves of Tera Shard type: 1.5x pwr.",
        flags: {breakable: 1},
	},
	terashift: {
		inherit: true,
		onPreStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Terapagos' || pokemon.transformed || 'magicroom' in this.field.pseudoWeather) return;
			switch(pokemon.getItem().name){
			case "Stellar Tera Shard":
				this.add('-activate', pokemon, 'ability: Tera Shift');
				pokemon.formeChange('Terapagos-Stellar', this.effect, true);
				break;
			case "Normal Tera Shard":
			case "Fire Tera Shard":
			case "Water Tera Shard":
			case "Electric Tera Shard":
			case "Grass Tera Shard":
			case "Ice Tera Shard":
			case "Fighting Tera Shard":
			case "Poison Tera Shard":
			case "Ground Tera Shard":
			case "Flying Tera Shard":
			case "Psychic Tera Shard":
			case "Bug Tera Shard":
			case "Rock Tera Shard":
			case "Ghost Tera Shard":
			case "Dragon Tera Shard":
			case "Dark Tera Shard":
			case "Steel Tera Shard":
			case "Fairy Tera Shard":
				this.add('-activate', pokemon, 'ability: Tera Shift');
				pokemon.formeChange('Terapagos-Terastal', this.effect, true);
				break;
			}
		},
		desc: "If this Pokemon is a Terapagos and it is holding a Tera Shard, it will transform when it enters battle. If holding a Stellar Tera Shard, it will become its Stellar Form; with any other Tera Shard, it will become its Terastal Form.",
		shortDesc: "If Terapagos, transforms if holding Tera Shard. Stellar = Stellar, else Terastal.",
	},
	telepathy: {
		inherit: true,
		onTryHit(target, source, move) {
			if (['any', 'normal', 'allAdjacent'].includes(move.target) && target !== source && target.side === source.side) {
				this.add('-activate', target, 'ability: Telepathy');
				return null;
			}
		},
		onAllyTryHit(target, source, move) {
			if (['any', 'normal', 'allAdjacent'].includes(move.target) && target !== source && target.side === source.side) {
				this.add('-activate', this.effectState.target, 'ability: Telepathy');
				return null;
			}
		},
		rating: 1,
		shortDesc: "The Pokemon and its allies cannot hit each other with attacks.",
	},
	teravolt: {
		inherit: true,
		//Ignoring Full Metal Body, Prism Armor, Shadow Shield, and Shields Down implemented in those Abilities because of annoying coding setups
		onBasePowerPriority: 21,
		onBasePower(damage, source, target, move) {
			if(move.hasAuraBreak) delete move.hasAuraBreak;
		},
		desc: "This Pokemon's moves and their effects completely ignore Abilities that could potentially interfere with them. Abilities which are usually immune to ignoring are still affected, unless it would interfere with the Ability's core mechanics. Additionally, the move Complete Shock will not remove the user's Electric typing.",
	},
	thermalexchange: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.boost({atk: 2});
			}
		},
		name: "Thermal Exchange",
		desc: "This Pokemon's Attack is raised 2 stages after it is damaged by a Fire-type move.",
		shortDesc: "This Pokemon's Attack is raised by 2 when damaged by Fire moves.",
		flags: {},
		rating: 2,
		num: 270,
	},
	toughclaws: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.2.",
	},
	toxicboost: {
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(2);
			}
		},
		name: "Toxic Boost",
		desc: "If this Pokemon is poisoned or badly poisoned, its Attack is multiplied by 2.",
		shortDesc: "If this Pokemon is poisoned, its Attack is 2x.",
        flags: {breakable: 1},
		rating: 3,
		num: 137,
	},
	turboblaze: {
		inherit: true,
		onBasePowerPriority: 21,
		onBasePower(damage, source, target, move) {
			if(move.hasAuraBreak) delete move.hasAuraBreak;
		},
		desc: "This Pokemon's moves and their effects completely ignore Abilities that could potentially interfere with them. Abilities which are usually immune to ignoring are still affected, unless it would interfere with the Ability's core mechanics. Additionally, the move Burn Up will not remove the user's Fire typing.",
	},
	vitalspirit: {
		inherit: true,
		onChangeBoost(boost, target, source, effect) {
			if(source && target === source) return;
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Vital Spirit only affects Speed lowered by other Pokemon.", true, source.side);
				}
				return;
			}
			if (boost.spe && boost.spe < 0) {
				delete boost.spe;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Speed", "[from] ability: Vital Spirit", "[of] " + target);
				}
			}
		},
		shortDesc: "This Pokemon cannot fall asleep or have its Speed lowered.",
	},
	waterbubble: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Bubble');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Bubble');
			}
			return false;
		},
		name: "Water Bubble",
		desc: "The power of Fire-type attacks against this Pokemon is halved, and it is immune to burns.",
		shortDesc: "The power of Fire-type attacks against this Pokemon is halved; burns are prevented.",
        flags: {breakable: 1},
		rating: 2,
		num: 199,
	},
	waterveil: {
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (status.id === 'brn') {
				this.debug('Water Veil prevents burns');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Water Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		name: "Water Veil",
		shortDesc: "This Pokemon and its allies cannot be burned.",
		block: "  [POKEMON] can't be burned due to a watery veil!",
        flags: {breakable: 1},
		rating: 2,
		num: 175,
	},
	whitesmoke: {
		onUpdate(pokemon) {
			let activate = false;
			const boosts: SparseBoostsTable = {};
			let i: BoostName;
			for (i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					activate = true;
					boosts[i] = 0;
				}
			}
			if (activate) {
				pokemon.setBoost(boosts);
				this.add('-activate', pokemon, 'ability: White Smoke');
				this.add('-clearnegativeboost', pokemon);
			}
		},
		name: "White Smoke",
		desc: "Restores all lowered stat stages to 0 when one is less than 0.",
		flags: {},
		rating: 3,
		num: 73,
	},
	windpower: {
		inherit: true,
		onChangeBoost(boost, target, source, effect) {
			if (effect.name === 'Defog' && boost.eva) {
				target.addVolatile('charge');
			}
		},
	},
	windrider: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({spe: 1}, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({spe: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Rider');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({spe: 1}, pokemon, pokemon);
			}
		},
		onChangeBoost(boost, target, source, effect) {
			if (effect.name === 'Defog' && boost.eva) {
				delete boost.eva;
				this.add("-fail", target, "unboost", "Evasion", "[from] ability: Wind Rider", "[of] " + target);
				this.boost({spe: 1}, target, target, null, false, true);
			}
		},
		desc: "This Pokemon is immune to wind moves and raises its Speed by 1 stage when hit by a wind move or when it encounters Tailwind.",
		shortDesc: "Speed raised by 1 if hit by a wind move or encounters Tailwind. Wind move immunity.",
	},
	zerotohero: {
		onSwitchIn() {
			this.effectState.switchingIn = true;
		},
		onPreStart(pokemon){ //Presumably, onSwitchIn only activates when not dragged in, and we want the transformation always to activate.
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin' || pokemon.transformed || !pokemon.side.totalFainted) return;
			if (pokemon.species.forme !== 'Hero') {
				pokemon.formeChange('Palafin-Hero', this.effect, true);
			}
		},
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin' || pokemon.transformed) return;
			if (pokemon.species.forme === 'Hero') {
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen:${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
				if (!this.effectState.switchingIn) return;
				this.effectState.switchingIn = false;
				if(!this.effectState.heroMessageDisplayed){
					this.add('-activate', pokemon, 'ability: Zero to Hero');
					this.effectState.heroMessageDisplayed = true;
				}
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Zero to Hero boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		name: "Zero to Hero",
		desc: "This Pokemon transforms into its Hero Form when it enters the field after an ally has fainted. While in Hero Form, its moves have their power multiplied by 1+(X*0.1), where X is the total number of times any Pokemon has fainted on the user's side when this Ability became active, and X cannot be greater than 5.",
		shortDesc: "This Pokemon transforms when an ally faints; moves have 10% more power for each one, max 5.",
        flags: {cantsuppress: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		rating: 3.5,
		num: 278,
	},
	/* Abilities edited as changes to other elements */
	clearbody: {
		inherit: true,
		onChangeBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			}
		},
	},
	cutecharm: {
		onHit(target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('attract', this.effectState.target);
				}
			}
		},
		flags: {},
		name: "Cute Charm",
		rating: 0.5,
		num: 56,
	},
	dazzling: {
		onFoeTryMove(source, target, move) {
			if (move.target === 'foeSide' || (move.target === 'all' &&  move.id !== 'perishsong')) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((target.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'ability: Dazzling', move, '[of] ' + dazzlingHolder);
				return false;
			}
		},
		name: "Dazzling",
        flags: {breakable: 1},
		rating: 2.5,
		num: 219,
	},
	effectspore: {
		onHit(target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity('powder')) {
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('slp', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Effect Spore",
		rating: 2,
		num: 27,
	},
	flamebody: {
		onHit(target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		flags: {},
		name: "Flame Body",
		rating: 2,
		num: 49,
	},
	fullmetalbody: {
		onChangeBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				this.add("-fail", target, "unboost", "[from] ability: Full Metal Body", "[of] " + target);
			}
		},
		onModifyMovePriority: -100,
		onAnyModifyMove(move, source, target){ //Fake unbreakableness by deleting ignoringAbility, except for Teravolt and Turboblaze.
			if(target !== this.effectState.source) return;
			if(move.ignoringAbility && !['teravolt','turboblaze'].includes(source.ability)){
				delete move.ignoringAbility;
			}
		},
		name: "Full Metal Body",
		desc: "Prevents other Pokemon from lowering this Pokemon's stat stages. Lunar Ray, Solar Impact, Smite, and Mold Breaker cannot ignore this Ability.",
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
        flags: {breakable: 1},
		rating: 2,
		num: 230,
	},
	gooey: {
		onHit(target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Gooey');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		flags: {},
		name: "Gooey",
		rating: 2,
		num: 183,
	},
	imposter: {
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// Imposter does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectState.switchingIn) return;
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				if(target.hasAbility('owntempo')){
					this.add('-activate', target, '[from] ability: Own Tempo');
					this.hint('Own Tempo blocks effects that steal or copy its attributes');
					return;
				}
				pokemon.transformInto(target, this.dex.abilities.get('imposter'));
			}
			this.effectState.switchingIn = false;
		},
		name: "Imposter",
		rating: 5,
		num: 150,
        flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
	},
	ironbarbs: {
		onHitOrder: 1,
		onHit(target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Iron Barbs",
		rating: 2.5,
		num: 160,
	},
	mummy: {
		onHit(target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['cantsuppress'] || sourceAbility.id === 'mummy') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('mummy', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Mummy', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		flags: {},
		name: "Mummy",
		rating: 2,
		num: 152,
	},
	neutralizinggas: {
		inherit: true,
		onPreStart(pokemon) {
			if (pokemon.transformed) return;
			this.add('-ability', pokemon, 'Neutralizing Gas');
			pokemon.abilityState.ending = false;
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			for (const target of this.getAllActive()) {
				if (target.hasItem('Ability Shield')) {
					this.add('-block', target, 'item: Ability Shield');
					continue;
				}
				this.singleEvent('End', target.getAbility(), target.abilityState, target, pokemon, 'neutralizinggas');
			}
		},
	},
	oblivious: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'attract' || type === 'taunt') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Oblivious');
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', '[of] ' + target);
			}
			if (effect.name === 'Disturbance' && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Oblivious', '[of] ' + target);
			}
		},
		desc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability while infatuated or taunted cures it. This Pokemon is immune to the effect of the Intimidate and Disturbance Abilities.",
		shortDesc: "Immunity to infatuation, taunt, Intimidate, and Disturbance.",
	},
	opportunist: {
		inherit: true,
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			if(target.hasAbility('owntempo')){
				this.add('-activate', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its attributes');
				return;
			}
			const pokemon = this.effectState.target;
			const positiveBoosts: Partial<BoostsTable> = {};
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					positiveBoosts[i] = boost[i];
				}
			}
			if (Object.keys(positiveBoosts).length < 1) return;
			this.boost(positiveBoosts, pokemon);
		},
		desc: "When an opposing Pokemon has a stat stage raised, this Pokemon copies the effect, unless the opponent has the Own Tempo Ability or was already copying the boost through Opportunist or a held Mirror Herb.",
	},
	poisonpoint: {
		onHit(target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Poison Point",
		rating: 1.5,
		num: 38,
	},
	poisontouch: {
		onSourceHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					target.trySetStatus('psn', source);
				}
			}
		},
		flags: {},
		name: "Poison Touch",
		rating: 2,
		num: 143,
	},
	roughskin: {
		onHitOrder: 1,
		onHit(target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Rough Skin",
		rating: 2.5,
		num: 24,
	},
	scrappy: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', '[of] ' + target);
			}
			if (effect.name === 'Disturbance' && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Scrappy', '[of] ' + target);
			}
		},
		desc: "This Pokemon can hit Ghost types with Normal- and Fighting-type moves. This Pokemon is immune to the effect of the Intimidate and Disturbance Abilities.",
		shortDesc: "Fighting, Normal moves hit Ghost. Immune to Intimidate/Disturbance.",
	},
	shadowshield: {
		onModifyMovePriority: -100,
		onAnyModifyMove(move, source, target){ //Fake unbreakableness by deleting ignoringAbility, except for Teravolt and Turboblaze.
			if(target !== this.effectState.source) return;
			if(move.ignoringAbility && !['teravolt','turboblaze'].includes(source.ability)){
				delete move.ignoringAbility;
			}
		},
		name: "Shadow Shield",
		desc: "If this Pokemon is at full HP, damage taken from attacks is halved. Lunar Ray, Solar Impact, Smite, and Mold Breaker cannot ignore this Ability.",
		shortDesc: "If this Pokemon is at full HP, damage taken from attacks is halved.",
        flags: {breakable: 1},
		rating: 3.5,
		num: 231,
	},
	static: {
		onHit(target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		flags: {},
		name: "Static",
		rating: 2,
		num: 9,
	},
	stickyhold: {
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAbility(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || (this.activeMove && this.activeMove.id === 'knockoff')) {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		name: "Sticky Hold",
        flags: {breakable: 1},
		rating: 2,
		num: 60,
	},
	strongjaw: {
		inherit: true,
		desc: "This Pokemon's bite-based attacks have their power multiplied by 1.5. Super Fang will do damage equal to 75% of the target's current HP.",
		shortDesc: "This Pokemon's bite-based attacks have 1.5x power.",
	},
	trace: {
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp) return;

			const possibleTargets = pokemon.adjacentFoes().filter(
				target => !target.getAbility().flags['notrace'] && target.ability !== 'noability'
			);
			if (!possibleTargets.length) return;

			const target = this.sample(possibleTargets);
			const ability = target.getAbility();
			if(target.ability === 'owntempo'){ //Own Tempo isn't exempt from copying, it causes it to fail
				this.add('-activate', pokemon, 'ability: Trace');
				this.add('-immune', target, '[from] ability: Own Tempo');
				this.hint('Own Tempo blocks effects that steal or copy its attributes');
				this.effectState.gaveUp = true;
				return;
			}
			if (pokemon.setAbility(ability)) {
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
			}
		},
		onEnd(pokemon){
			if(this.effectState.gaveUp) delete this.effectState.gaveUp;
		},
		name: "Trace",
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		rating: 2.5,
		num: 36,
	},
	wanderingspirit: {
		onHit(target, source, move) {
			if (source.getAbility().flags['failskillswap']) return;
			if (this.checkMoveMakesContact(move, source, target)) {
				const targetCanBeSet = this.runEvent('SetAbility', target, source, this.effect, source.ability);
				if (!targetCanBeSet) return targetCanBeSet;
				const sourceAbility = source.setAbility('wanderingspirit', target);
				if (!sourceAbility) return;
				if (target.isAlly(source)) {
					this.add('-activate', target, 'Skill Swap', '', '', '[of] ' + source);
				} else {
					this.add('-activate', target, 'ability: Wandering Spirit', this.dex.abilities.get(sourceAbility).name, 'Wandering Spirit', '[of] ' + source);
				}
				target.setAbility(sourceAbility);
			}
		},
		flags: {},
		name: "Wandering Spirit",
		rating: 2.5,
		num: 254,
	},
	zenmode: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.species.forme !== 'Zen') {
				pokemon.addVolatile('zenmode');
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && pokemon.species.forme === 'Zen') {
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
				if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
			},
			onEnd(pokemon) {
				if (pokemon.species.forme === 'Zen') {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
	},
	/* Abilities edited as part of the dual-type update*/
	aerilate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball',
			];
			if ((move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Flying';
				if(move.twoType) delete move.twoType;
				move.aerilateBoosted = true;
			}
		},
	},
	blaze: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
	},
	darkaura: {
		inherit: true,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.hasAuraBreak || (move.type !== 'Dark' && (!move.twoType || move.twoType !== 'Dark'))) return;
			if (!move.auraBooster) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([0x1547, 0x1000]);
		},
	},
	disguise: {
		inherit: true,
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (target.species.id !== 'mimikyu' || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
			if (hitSub) return;

			if (!target.runImmunity(move.type) || !(move.twoType && target.runImmunity(move.twoType))) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.species.id !== 'mimikyu' || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !move.infiltrates;
			if (hitSub) return;

			if (!target.runImmunity(move.type) || !(move.twoType && target.runImmunity(move.twoType))) return;
			return 0;
		},
	},
	eartheater: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Ground' || (move.twoType && move.twoType === 'Ground'))) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
			}
		},
	},
	fairyaura: {
		inherit: true,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.hasAuraBreak || (move.type !== 'Fairy' && (!move.twoType || move.twoType !== 'Fairy'))) return;
			if (!move.auraBooster) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([0x1547, 0x1000]);
		},
	},
	fluffy: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if ((move.type === 'Fire' || (move.twoType && move.twoType === 'Fire'))) mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
	},
	galvanize: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball',
			];
			if ((move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Electric';
				if(move.twoType) delete move.twoType;
				move.galvanizeBoosted = true;
			}
		},
	},
	iceface: {
		inherit: true,
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type) || !(move.twoType && target.runImmunity(move.twoType))) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type) || !(move.twoType && target.runImmunity(move.twoType))) return;
			return 0;
		},
	},
	justified: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if ((move.type === 'Dark' || (move.twoType && move.twoType === 'Dark'))) {
				this.boost({atk: 1});
			}
		},
	},
	lightningrod: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Lightning Rod');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if ((move.type !== 'Electric' && (!move.twoType || move.twoType !== 'Electric')) || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Lightning Rod');
				}
				return this.effectState.target;
			}
		},
	},
	liquidvoice: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (move.flags['sound']) { // hardcode
				move.type = 'Water';
				delete move.twoType;
			}
		},
	},
	motordrive: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Motor Drive');
				}
				return null;
			}
		},
	},
	overgrow: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
	},
	pixilate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball',
			];
			if ((move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fairy';
				if(move.twoType) delete move.twoType;
				move.pixilateBoosted = true;
			}
		},
	},
	rattled: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (['Dark', 'Bug', 'Ghost'].includes(move.type) || (move.twoType && ['Dark', 'Bug', 'Ghost'].includes(move.twoType))) {
				this.boost({spe: 1});
			}
		},
		onAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Intimidate' || effect?.name === 'Disturbance') {
				this.boost({spe: 1});
			}
		},
		desc: "This Pokemon's Speed is raised by 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or if an opposing Pokemon's Intimidate or Disturbance Ability affected this Pokemon.",
		shortDesc: "+1 Speed if hit by a Bug/Dark/Ghost-type attack or Intimidate/Disturbance.",
	},
	refrigerate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball',
			];
			if ((move.type === 'Normal' || (move.twoType && move.twoType === 'Normal')) && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ice';
				if(move.twoType) delete move.twoType;
				move.refrigerateBoosted = true;
			}
		},
	},
	rockypayload: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Rock' || (move.twoType && move.twoType === 'Rock'))) {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Rock' || (move.twoType && move.twoType === 'Rock'))) {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
	},
	sandforce: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (['Rock', 'Ground', 'Steel'].includes(move.type) || (move.twoType && ['Rock', 'Ground', 'Steel'].includes(move.twoType))) {
					this.debug('Sand Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
	},
	sapsipper: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass'))) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectState.target || target.side !== source.side) return;
			if (move.type === 'Grass' || (move.twoType && move.twoType === 'Grass')) {
				this.boost({atk: 1}, this.effectState.target);
			}
		},
	},
	steamengine: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (['Water', 'Fire'].includes(move.type) || (move.twoType && ['Water', 'Fire'].includes(move.twoType))) {
				this.boost({spe: 6});
			}
		},
	},
	steelworker: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Steel' || (move.twoType && move.twoType === 'Steel')) {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Steel' || (move.twoType && move.twoType === 'Steel')) {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
	},
	stormdrain: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Storm Drain');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if ((move.type !== 'Water' && (!move.twoType || move.twoType !== 'Water')) || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Storm Drain');
				}
				return this.effectState.target;
			}
		},
	},
	swarm: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Bug' || (move.twoType && move.twoType === 'Bug')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Bug' || (move.twoType && move.twoType === 'Bug')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
	},
	thickfat: {
		inherit: true,
		onSourceModifyAtk(atk, attacker, defender, move) {
			let moveTypes = 0;
			if (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) {
				this.debug('Thick Fat weaken');
				moveTypes++;
			}
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('Thick Fat weaken');
				moveTypes++;
			}
			if(moveTypes) return this.chainModify(Math.pow(0.5,moveTypes)); //.5 for 1 match, .25 for 2 matches; works for 0 matches but doesn't need to return
		},
		onSourceModifySpA(atk, attacker, defender, move) {
			let moveTypes = 0;
			if (move.type === 'Ice' || (move.twoType && move.twoType === 'Ice')) {
				this.debug('Thick Fat weaken');
				moveTypes++;
			}
			if (move.type === 'Fire' || (move.twoType && move.twoType === 'Fire')) {
				this.debug('Thick Fat weaken');
				moveTypes++;
			}
			if(moveTypes) return this.chainModify(Math.pow(0.5,moveTypes)); //.5 for 1 match, .25 for 2 matches; works for 0 matches but doesn't need to return
		},
	},
	torrent: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Water' || (move.twoType && move.twoType === 'Water')) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
	},
	voltabsorb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Electric' || (move.twoType && move.twoType === 'Electric'))) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volt Absorb');
				}
				return null;
			}
		},
	},
	waterabsorb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Water' || (move.twoType && move.twoType === 'Water'))) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Water Absorb');
				}
				return null;
			}
		},
	},
	watercompaction: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || (move.twoType && move.twoType === 'Water')) {
				this.boost({def: 2});
			}
		},
	},
	
	/* Renamed and deleted Abilities */
	escapeplan: {
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Escape Plan');
		},
		name: "Escape Plan",
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage bringing it to 1/2 or less of its maximum HP, it immediately switches out to a chosen ally. This effect applies after all hits from a multi-hit move; This effect applies to both direct and indirect damage, except Curse and Substitute on use, Belly Drum, Pain Split, and confusion damage.",
		shortDesc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP.",
		flags: {},
		rating: 1,
		num: 1017,
	},
	wimpout: null,
	emergencyexit: null,
	induction: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.side.active.length === 1) {
				return;
			}
			for (const allyActive of pokemon.side.active) {
				if (
					allyActive && allyActive.position !== pokemon.position &&
					!allyActive.fainted && allyActive.hasAbility('induction')
				) {
					return this.chainModify(1.5);
				}
			}
		},
		name: "Induction",
		desc: "If an active ally also has this Ability, this Pokemon's Special Attack is multiplied by 1.5.",
		shortDesc: "If an active ally also has this Ability, this Pokemon's Sp. Atk is 1.5x.",
		flags: {},
		rating: 0,
		num: 1018,
	},
	plus: null,
	minus: null,
	powerofalchemy: null,
	powerspot: null,
	majesty: {
		onFoeTryMove(source, target, move) {
			if (move.target === 'foeSide' || (move.target === 'all' &&  move.id !== 'perishsong')) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((target.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'ability: Majesty', move, '[of] ' + dazzlingHolder);
				return false;
			}
		},
		name: "Majesty",
		desc: "While this Pokemon is active, priority moves from opposing Pokemon targeted at allies are prevented from having an effect.",
		shortDesc: "While this Pokemon is active, allies are protected from opposing priority moves.",
        flags: {breakable: 1},
		rating: 2.5,
		num: 214,
	},
	queenlymajesty: null,
	rebound: null,
	slushrush: null,
	tanglinghair: null,
	angershell: null,
	asoneglastrier: null,
	asonespectrier: null,
	battlebond: null,
	chillingneigh: null,
	curiousmedicine: null,
	dragonsmaw: null,
	gorillatactics: null,
	grimneigh: null,
	libero: null,
	lingeringaroma: null,
	mirrorarmor: null,
	perishbody: null,
	punkrock: null,
	steelyspirit: null,
	supersweetsyrup: null,
	supremeoverlord: null,
	transistor: null,
	unseenfist: null,
	wellbakedbody: null,
	embodyaspectteal: null,
	embodyaspectwellspring: null,
	embodyaspecthearthflame: null,
	embodyaspectcornerstone: null,
	
	/* CAP */
	emergence: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (this.effectState.target.activeTurns) return;

			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.actions.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (this.effectState.target.activeTurns) return;

			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.actions.useMove(newMove, this.effectState.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		isNonstandard: "CAP",
		name: "Emergence",
		desc: "On switch-in, this Pokemon blocks certain status moves and instead uses the move against the original user.",
		shortDesc: "On switch-in, blocks certain status moves and bounces them back to the user.",
        flags: {breakable: 1},
		rating: 3,
		num: -3,
	},
	mountaineer: null,
};
