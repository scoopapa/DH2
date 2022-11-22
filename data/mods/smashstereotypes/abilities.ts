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
	persistent: {
		isNonstandard: null,
		name: "Persistent",
		// implemented in the corresponding move
		rating: 3,
		num: -4,
	},
	veteran: {
		shortDesc: "Sniper + Merciless; If a move crits, it poisons the target.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) return 5;
		},
		onModifyDamage(damage, source, target, move) {
			if (move.crit) {
				this.debug('Sniper boost');
				source.trySetStatus('psn', target);
				return this.chainModify(1.5);
			}
		},
		name: "Veteran",
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
	gunkmissile: {
		onDamagingHit(damage, target, source, move) {
			if (target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantalolagulping', 'cramorantalolagorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantalolagulping') {
					this.boost({spd: -1}, source, target, null, true);
				} else {
					source.trySetStatus('psn', target, move);
				}
				target.formeChange('cramorantalola', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (
				effect && effect.id === 'sludgewave' || effect.id === 'gunkshot' && source.hasAbility('gunkmissile') &&
				source.species.name === 'Cramorant-Alola' && !source.transformed
			) {
				const forme = source.hp <= source.maxhp / 2 ? 'cramorantalolagorging' : 'cramorantalolagulping';
				source.formeChange(forme, effect);
			}
		},
		isPermanent: true,
		name: "Gunk Missile",
		shortDesc: "When hit after Sludge Wave/Gunk Shot, attacker takes 1/4 max HP and -1 Sp. Def. or poisons.",
		rating: 2.5,
		num: 241,
	},
	ultraimpulse: { 
		shortDesc: "If this Pokemon is statused, its highest stat is 1.5x; ignores burn halving physical damage.",
		name: "Ultra Impulse",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			/** @type {StatNameExceptHP} */
			let s;
			for (s in this.effectData.target.storedStats) {
				if (this.effectData.target.storedStats[s] > bestStat) {
					statName = s;
					bestStat = this.effectData.target.storedStats[s];
				}
			}
			if (pokemon.status && statName === 'atk') {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			/** @type {StatNameExceptHP} */
			let s;
			for (s in this.effectData.target.storedStats) {
				if (this.effectData.target.storedStats[s] > bestStat) {
					statName = s;
					bestStat = this.effectData.target.storedStats[s];
				}
			}
			if (pokemon.status && statName === 'def') {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			/** @type {StatNameExceptHP} */
			let s;
			for (s in this.effectData.target.storedStats) {
				if (this.effectData.target.storedStats[s] > bestStat) {
					statName = s;
					bestStat = this.effectData.target.storedStats[s];
				}
			}
			if (pokemon.status && statName === 'spa') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			/** @type {StatNameExceptHP} */
			let s;
			for (s in this.effectData.target.storedStats) {
				if (this.effectData.target.storedStats[s] > bestStat) {
					statName = s;
					bestStat = this.effectData.target.storedStats[s];
				}
			}
			if (pokemon.status && statName === 'spd') {
				return this.chainModify(1.5);
			}
		},
		onModifySpe(spe, pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			/** @type {StatNameExceptHP} */
			let s;
			for (s in this.effectData.target.storedStats) {
				if (this.effectData.target.storedStats[s] > bestStat) {
					statName = s;
					bestStat = this.effectData.target.storedStats[s];
				}
			}
			if (pokemon.status && statName === 'spe') {
				return this.chainModify(1.5);
			}
		},
	},
	leviflame: {
		name: "Leviflame",
		shortDesc: "Levitate + Flame Body",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground' && !target.volatiles['smackdown'] ) {
				this.add('-immune', target, '[from] ability: Leviflame');
				return null;
			}
		},
	},
	iceface: {
		onStart(pokemon) {
			if (this.field.isWeather('hail') && pokemon.species.id === 'escavaliereiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Escavalier-Eiscue', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' && effect.category === 'Physical' &&
				target.species.id === 'escavaliereiscue' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'escavaliereiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'escavaliereiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'escavaliereiscue' && this.effectData.busted) {
				pokemon.formeChange('Escavalier-Eiscue-Noice', this.effect, true);
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if (this.field.isWeather('hail') && pokemon.species.id === 'escavaliereiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Escavalier-Eiscue', this.effect, true);
			}
		},
		isPermanent: true,
		name: "Ice Face",
		shortDesc: "If Escavalier-Eiscue, the first physical hit it takes deals 0 damage. This effect is restored in Hail.",
		rating: 3,
		num: 248,
	},
	flamingskin: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Flaming Skin');
				}
				return null;
			}
		},
		onFoeBasePowerPriority: 17,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (this.effectData.target !== defender) return;
			if (move.type === 'Fire') {
				return this.chainModify(1.25);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		name: "Flaming Skin",
		shortDesc: "Dry Skin + Flame Body",
	},
	fromashes: {
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when burned; ignores burn's effects.",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		id: "fromashes",
		name: "From Ashes",
	},
	sandbubbler: {
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Sand Bubbler boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Sand Bubbler",
		shortDesc: "Sand Stream + Iron Fist.",
	},
	debilitate: {
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
		shortDesc: "On switch-in, this Pokemon lowers the Sp. Atk of adjacent opponents by 1 stage.",
		rating: 3.5,
		num: 22,
	},
	oblivious: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Oblivious');
			}
			else if (effect.id === 'debilitate') {
				delete boost.spa;
				this.add('-immune', target, '[from] ability: Oblivious');
			}
		},
	},
	innerfocus: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Inner Focus');
			}
			else if (effect.id === 'debilitate') {
				delete boost.spa;
				this.add('-immune', target, '[from] ability: Inner Focus');
			}
		},
	},
	owntempo: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Own Tempo');
			}
			else if (effect.id === 'debilitate') {
				delete boost.spa;
				this.add('-immune', target, '[from] ability: Own Tempo');
			}
		},
	},
	rattled: {
		inherit: true,
		onAfterBoost(boost, target, source, effect) {
			if (effect && effect.id === 'intimidate' || effect && effect.id === 'debilitate') {
				this.boost({spe: 1});
			}
		},
	},
	scrappy: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Scrappy');
			}
			else if (effect.id === 'debilitate') {
				delete boost.spa;
				this.add('-immune', target, '[from] ability: Scrappy');
			}
		},
	},
	lethalleafage: {
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact'] || move.type === 'Grass') {
				return this.chainModify(1.3);
			}
		},
		name: "Lethal Leafage",
		shortDesc: "This Pokemon's contact and Grass-type moves are boost by 1.3x.",
		num: -100000,
	},
	evolutionburst: {
		onModifyAtkPriority: 2,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 2,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.3);
			}
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.3);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.3);
			}
		},
		name: "Evolution Burst",
		shortDesc: "If pokemon's species can evolve, its Atk, Def, Sp. Atk and Sp. Def are 1.5x.",
		rating: 4,
		num: 23,
	},
	wetreflection: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		name: "Wet Reflection",
		shortDesc: "Magic Bounce + Swift Swim",
		rating: 5,
		num: -19,
	},
	sandveiljolte: {
		desc: "If Sandstorm is active, this Pokemon's SpD is multiplied by 1.5. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's SpD is boosted 1.5x; immunity to Sandstorm.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifySpD(spd, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		id: "sandveiljolte",
		name: "Sand Veil (Jolte)",
		rating: 3,
		num: 146,
	},
	divinegrace: {
		shortDesc: "This Pokemon's healing moves are boosted 1.5x.",
		name: "Divine Grace",
		rating: 3,
		num: -1020,
	},
	allseeingeye: {
        onAfterMove(target, source, move) {
			if (move.type === 'Psychic' && move.category === 'Status') {
				this.heal(target.baseMaxhp / 4);
			}
		},
		name: "All-Seeing Eye",
		shortDesc: "This Pokemon's Psychic-type status moves heal it for 1/4 max HP.",
		num: -1017,
	},
	retribution: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') {
				return;
			}
			if (source.species.id === 'greninja' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Battle Bond');
				source.formeChange('Greninja-Ash', this.effect, true);
			}
		},
		onBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && target.species.id === 'thunjust' && target.hp && !target.transformed && target.side.foe.pokemonLeft) {
				this.add('-activate', target, 'ability: Retribution');
				target.formeChange('Thunjust-Super', this.effect, true);
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move, attacker) {
			if (move.id === 'boltarang' && attacker.species.name === 'Thunjust-Super') {
				move.multihit = 3;
			}
		},
		isPermanent: true,
		name: "Retribution",
		shortDesc: "When this Pokemon has a stat raised or lowered (including self-inflicted changes), it transforms into Super form. Boltarang: 25 power, hits 3x.",
		rating: 4,
		num: -100,
	},
	tacticschange: {
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if ((attacker.species.baseSpecies !== 'Aegislash' && !attacker.species.name.includes('Ancient'))|| attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'foragerspoise') return;
			const targetForme = (move.id === 'foragerspoise' ? 'Aegislash-Ancient' : 'Aegislash-Ancient-Hunter');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		isPermanent: true,
		name: "Tactics Change",
		shortDesc: "If Aegislash-Ancient, changes Forme to Ancient-Hunter before attacks and Ancient before King's Shield.",
		rating: 5,
		num: -117
	},
	refreshment: {
		onSwitchIn(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 16);
		},
		name: "Refreshment",
		rating: 4.5,
		num: -118,
		shortDesc: "(Partially functional) When the user switches in, all non-fainted team members regain 1/16 HP.",
	},
};
