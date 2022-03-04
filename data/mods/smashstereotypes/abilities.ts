export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	disperal: {
		shortDesc: "Boosts Bullet Seed, Seed Bomb, Seed Flare, Apple Acid, and Grav Apple by 1.2x. Leech Seed deals 20% more damage and heals 30% more HP each turn.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.name === 'Bullet Seed' || move.name === 'Seed Bomb' || move.name === 'Seed Flare' || move.name === 'Grav Apple' || move.name === 'Apple Acid') {
				return this.chainModify(1.2);
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			let heals = {
				drain: 1,
				leechseed: 1,
				ingrain: 1,
				aquaring: 1,
				strengthsap: 1
			};
			if (heals[effect.id]) {
				return Math.ceil((damage * 1.3) - 0.5);
			}
		},
		id: "disperal",
		name: "Disperal",
	},
	ecopy: {
		onStart(pokemon) {
			this.field.setTerrain('electricterrain');
			
			if (pokemon.side.foe.active.some(
				foeActive => foeActive && this.isAdjacent(pokemon, foeActive) && foeActive.ability === 'noability'
			)) {
				this.effectData.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectData.gaveUp) return;
			const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				const ability = target.getAbility();
				const additionalBannedAbilities = [
					// Zen Mode included here for compatability with Gen 5-6
					'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 
					'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode',
					'magicmissile', 'pillage', 'ecopy', 'lemegeton', 'modeshift', 
				];
				if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				this.add('-ability', pokemon, ability, '[from] ability: E-Copy', '[of] ' + target);
				pokemon.setAbility(ability);
				return;
			}
		},
		name: "E-Copy",
		shortDesc: "Sets Electric Terrain, and then copies the foe's Ability.",
	},
	rkssystem: {
		onStart(pokemon) {
			if (pokemon.species.id === 'silvallyrock') {
				this.add('-ability', pokemon, 'Sand Stream', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('sandstream');
				pokemon.baseAbility = 'sandstream';
			}
		},
		isPermanent: null,
		name: "RKS System",
		shortDesc: "If Silvally-Rock, changes to Sand Stream.",
		rating: 4,
		num: 225,
	},
	grimneigh: {
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		name: "Grim Neigh",
		shortDesc: "This Pokemon deals 1.5x damage to burned opponents.",
		rating: 3,
		num: 265,
	},
	teachingtech: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			if (defender.hasAbility('sturdymold')) return;
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		onSourceHit(target, source, move) {
			if (!move || !target || move.category === 'Status') return;
			console.log('Teaching Tech: Move BP = ' + move.basePower);
			const targetAbility = target.getAbility();
			if (targetAbility.isPermanent || targetAbility.id === 'teachingtech') return;
			if (move.basePower <= 60) {
				const oldAbility = target.setAbility('teachingtech', source);
				if (oldAbility) {
					this.add('-activate', source, 'ability: Teaching Tech');
					this.add('-activate', target, 'ability: Teaching Tech');
				}
			}
		},
		name: "Teaching Tech",
		shortDesc: "Moves <=60 BP: 1.5x power. If hitting something with such a move: changes their ability to Teaching Tech.",
	},
	justifiedsylve: {
		onFoeTrapPokemon (pokemon) {
			if (pokemon.hasType('Dark') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon (pokemon, source) {
			if (!source) source = this.effectData.target;
			if ((!pokemon.knownType || pokemon.hasType('Dark')) && this.isAdjacent(pokemon, source)) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Justified (Sylve)",
		shortDesc: "Prevents adjacent Dark-type foes from choosing to switch.",
		rating: 2.5,
		num: 154,
	},
	shadowtag: {
		onFoeSwitchOut(source, target) {
			for (const target of source.side.foe.active) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Shadow Tag",
		shortDesc: "Opposing Pokemon loose 1/8 of their maximum HP, rounded down, when it switches out.",
		rating: 5,
		num: 23,
	},
	vigilante: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting') {
				this.debug('Vigilante boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting') {
				this.debug('Vigilante boost');
				return this.chainModify(1.5);
			}
		},
		name: "Vigilante",
		shortDesc: "This Pokemon's Fighting moves deal 1.5x damage.",
		rating: 3.5,
	},
	naturalheal: {
		id: "naturalheal",
		name: "Natural Heal",
		shortDesc: "Restores 1/3 max HP and cures non-volatile status on switch-out.",
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Natural Cure') && !Object.values(species.abilities).includes('Natural Heal')) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('naturalcure') || curPoke.hasAbility('naturalheal')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Heal.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Heal');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
	},
	wonderguard: {
		onDamage(damage, target, source, effect) {
			if (effect && ['stealthrock', 'spikes', 'hail', 'sandstorm', 'lifeorb'].includes(effect.id)) {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Guard');
				}
				return null;
			}
		},
		name: "Wonder Guard",
		shortDesc: "This Pokemon can only be damaged by supereffective moves and status effects.",
		rating: 5,
		num: 25,
	},
	bulletpecks: {
		onTryHit(pokemon, target, move) {
			if (move.flags['bullet'] || move.name === 'Crunch' || move.name === 'Crush Claw' || move.name === 'Fire Lash' || move.name === 'Grav Apple' || move.name === 'Iron Tail' || move.name === 'Leer' || move.name === 'Liquidation' || move.name === 'Octolock' || move.name === 'Razor Shell' || move.name === 'Rock Smash' || move.name === 'Screech' || move.name === 'Secret Power' || move.name === 'Shadow Bone' || move.name === 'Tail Whip' || move.name === 'Thunderous Kick' || move.name === 'Tickle') {
				this.add('-immune', pokemon, '[from] ability: Bulletpecks');
				return null;
			}
		},
		name: "Bulletpecks",
		shortDesc: "This Pokemon is immune to ballistic moves and moves that lower Defense.",
	},
	ignorant: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (move.category !== 'Status' && !move.ignoreImmunity) {
				move.ignoreImmunity = true;
			}
		},
		name: "Ignorant",
		shortDesc: "This Pokemon's attacking moves ignore type immunities.",
	},
	executioner: {
		desc: "When this Pokémon's target has 1/2 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using an attack.",
		shortDesc: "This Pokémon's attacking stat is 1.5x when its target has 1/2 or less HP.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.hp <= defender.maxhp / 2) {
				this.debug('Executioner boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (defender.hp <= defender.maxhp / 2) {
				this.debug('Executioner boost');
				return this.chainModify(1.5);
			}
		},
		name: "Executioner",
		rating: 4,
		num: -13,
	},
	toxicboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(1.3);
			}
		},
		name: "Toxic Boost",
		shortDesc: "If Pokemon is poisoned, physical attacks have 1.3x power. Immunity to Poison status.",
		rating: 2.5,
		num: 137,
	},
	lowflight: {
		name: "Low Flight",
		shortDesc: "User takes half damage when switching in or at full HP.",
		onSourceModifyDamage(damage, source, target, move) {
			if (!target.activeTurns) {
				this.debug('Low Flight weaken');
				return this.chainModify(0.5);
			}
			else if (target.hp >= target.maxhp) {
				this.debug('Low Flight weaken');
				return this.chainModify(0.5);
			}
		},
		rating: 0,
		num: 123009,
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
	kalibersfury: {
		shortDesc: "Any attacks with 60 bp or less get a +1 to priority.",
		onModifyPriority: function(priority, pokemon, target, move, basePower) {
			if (move.category !== "Status" && move.basePower <= 60)
			return priority + 1;
		},
		id: "kalibersfury",
		name: "Kaliber's Fury"
	},
};
