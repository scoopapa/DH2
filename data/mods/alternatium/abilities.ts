/*

Ratings and how they work:

-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start

 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus

 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups

 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat

 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy

 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce

 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag

*/

export const Abilities: {[abilityid: string]: AbilityData} = {
	galewings: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp === pokemon.maxhp || pokemon.species.id === 'silvallyflying' && move.id === 'multiattack' && pokemon.hp === pokemon.maxhp) return priority + 1;
		},
		name: "Gale Wings",
		rating: 3,
		num: 177,
	},
	powerofalchemy: {
		onAnyFaint(target) {
			if (!this.effectData.target.hp) return;
			const ability = target.getAbility();
			const additionalBannedAbilities = [
				'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'wonderguard',
			];
			if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) return;
			this.add('-ability', this.effectData.target, ability, '[from] ability: Power of Alchemy', '[of] ' + target);
			this.effectData.target.setAbility(ability);
		},
		name: "Power of Alchemy",
		shortDesc: "This Pokémon copies the ability of the last fainted Pokémon.",
		rating: 0,
		num: 223,
	},
	quickdraw: {
		onModifyPriority(priority, source, move) {
			if (source.activeMoveActions < 1) {
				return priority + 1;
			}
			else if (source.activeMoveActions > 1) {
				return priority + 0;
			}
		},
		name: "Quick Draw",
		shortDesc: "User's moves have increased priority in the first turn.",
		rating: 2.5,
		num: 259,
	},
	rkssystem: {
		onStart(pokemon) {
			if (pokemon.species.id === 'silvally') {
				this.add('-ability', pokemon, 'Adaptability', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('adaptability');
				pokemon.baseAbility = 'adaptability';
			}
			else if (pokemon.species.id === 'silvallybug') {
				this.add('-ability', pokemon, 'Tinted Lens', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('tintedlens');
				pokemon.baseAbility = 'tintedlens';
			}
			if (pokemon.species.id === 'silvallydark') {
				this.add('-ability', pokemon, 'Dark Aura', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('darkaura');
				pokemon.baseAbility = 'darkaura';
			}
			if (pokemon.species.id === 'silvallydragon') {
				this.add('-ability', pokemon, 'Multiscale', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('multiscale');
				pokemon.baseAbility = 'multiscale';
			}
			if (pokemon.species.id === 'silvallyelectric') {
				this.add('-ability', pokemon, 'Lightning Rod', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('lightningrod');
				pokemon.baseAbility = 'lightningrod';
			}
			if (pokemon.species.id === 'silvallyfairy') {
				this.add('-ability', pokemon, 'Misty Surge', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('mistysurge');
				pokemon.baseAbility = 'mistysurge';
			}
			if (pokemon.species.id === 'silvallyfighting') {
				this.add('-ability', pokemon, 'Scrappy', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('scrappy');
				pokemon.baseAbility = 'scrappy';
			}
			if (pokemon.species.id === 'silvallyfire') {
				this.add('-ability', pokemon, 'Flash Fire', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('flashfire');
				pokemon.baseAbility = 'flashfire';
			}
			if (pokemon.species.id === 'silvallyflying') {
				this.add('-ability', pokemon, 'Gale Wings', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('galewings');
				pokemon.baseAbility = 'galewings';
			}
			if (pokemon.species.id === 'silvallyghost') {
				this.add('-ability', pokemon, 'Prankster', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('prankster');
				pokemon.baseAbility = 'prankster';
			}
			if (pokemon.species.id === 'silvallygrass') {
				this.add('-ability', pokemon, 'Grassy Surge', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('grassysurge');
				pokemon.baseAbility = 'grassysurge';
			}
			if (pokemon.species.id === 'silvallyground') {
				this.add('-ability', pokemon, 'Mold Breaker', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('moldbreaker');
				pokemon.baseAbility = 'moldbreaker';
			}
			if (pokemon.species.id === 'silvallyice') {
				this.add('-ability', pokemon, 'Refrigerate', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('refrigerate');
				pokemon.baseAbility = 'refrigerate';
			}
			if (pokemon.species.id === 'silvallypoison') {
				this.add('-ability', pokemon, 'Corrosion', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('corrosion');
				pokemon.baseAbility = 'corrosion';
			}
			if (pokemon.species.id === 'silvallypsychic') {
				this.add('-ability', pokemon, 'Magic Guard', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('magicguard');
				pokemon.baseAbility = 'magicguard';
			}
			if (pokemon.species.id === 'silvallyrock') {
				this.add('-ability', pokemon, 'Sand Stream', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('sandstream');
				pokemon.baseAbility = 'sandstream';
			}
			if (pokemon.species.id === 'silvallysteel') {
				this.add('-ability', pokemon, 'Magnet Pull', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('magnetpull');
				pokemon.baseAbility = 'magnetpull';
			}
			if (pokemon.species.id === 'silvallywater') {
				this.add('-ability', pokemon, 'Water Absorb', '[from] ability: RKS System', '[of] ' + pokemon);
				pokemon.setAbility('waterabsorb');
				pokemon.baseAbility = 'waterabsorb';
			}
		},
		isPermanent: null,
		name: "RKS System",
		shortDesc: "Ability varies based on the user's type.",
		rating: 4,
		num: 225,
	},
	staticcling: {
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Static Cling');
				return false;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				if (!target.setItem(yourItem)) {
					source.item = yourItem.id;
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Static Cling', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Static Cling', '[of] ' + source);
			}
		},
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.flags['contact']) {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Static Cling', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Static Cling', '[of] ' + source);
			}
		},
		name: "Static Cling",
		shortDesc: "This Pokemon cannot lose its held item. Contact: Steals opponent's item on contact, if the user has no item.",
		rating: 0,
		num: 1001,
	},
	rarecold: {
		onSourceModifyDamage(damage, source, target, move) {
			if (source.getStat('spe', false, true) <= target.getStat('spe', false, true) && !move.priority > 0.1) {
				return this.chainModify(0.7);
			}
		},
		name: "Rare Cold",
		shortDesc: "User takes 30% less damage if user moves before the target.",
		rating: 0,
		num: 1002,
	},
	watercycle: {
		onBasePower(basePower, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (defender.volatiles['partiallytrapped']) {
					return this.chainModify(1.3);
				}
			}
		},
		name: "Water Cycle",
		shortDesc: "User deal 1.3x damage to trapped targets.",
		rating: 0,
		num: 1003,
	},
	cloudburst: {
		onBeforeMove(source, target, move) {
			if (move.type === 'Electric' && !this.field.isWeather('raindance')) {
				this.useMove('raindance', source);
			}
		},
		name: "Cloud Burst",
		shortDesc: "User summons Rain before executing an Electric-type move.",
		rating: 0,
		num: 1004,
	},
	packleader: {
		onModifyAtk(atk, source, target, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (target.newlySwitched || this.queue.willMove(target)) {
					this.debug('Pack Leader boost');
					return this.chainModify(1.3);
				}
			}
		},
		name: "Pack Leader",
		shortDesc: "If this Pokemon goes first, it deals 1.3x damage.",
		rating: 0,
		num: 1005,
	},
	privatewifi: {
		onStart(source) {
			if (source.hasItem('burndrive')) {
				source.types[1] = 'Fire';
			}
			else if (source.hasItem('chilldrive')) {
				source.types[1] = 'Ice';
			}
			else if (source.hasItem('dousedrive')) {
				source.types[1] = 'Water';
			}
			else if (source.hasItem('shockdrive')) {
				source.types[1] = 'Electric';
			}
			this.add('-activate', source, 'ability: Private Wi-Fi');
			this.add('-message', `${source.name} changed its type to match its Drive!`);
			for (const foeactive of source.side.foe.active) {
				console.log(foeactive.hasType("Steel"));
				if (
					!foeactive || 
					foeactive.fainted || 
					(
						!foeactive.hasType(source.types[1]) && 
						!foeactive.hasType("Steel")
					)
				) continue;
				// Boosts player's Pokemon's highest stat
				let statName = 'atk';
				let bestStat = 0;
				let s: StatIDExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, source);

				// Boosts opponent's Pokemon's highest stat
				let statNameOpp = 'atk';
				let bestStatOpp = 0;
				let sOpp: StatIDExceptHP;
				for (sOpp in foeactive.storedStats) {
					if (foeactive.storedStats[sOpp] > bestStatOpp) {
						statNameOpp = sOpp;
						bestStatOpp = foeactive.storedStats[sOpp];
					}
				}
				this.boost({[statNameOpp]: 1}, foeactive);
			}
		},
		name: "Private Wi-Fi",
		shortDesc: "If this Pokemon switches in and the opposing Pokemon shares its type, both have their highest stat boosted.",
		rating: 0,
		num: 1006,
	},
	mountaineer: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Mountaineer');
				return null;
			}
		},
		isNonstandard: null,
		name: "Mountaineer",
		rating: 3,
		num: -2,
	},
	lifegem: {
		onModifyDamage(damage, source, target, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				return this.chainModify(1.3);
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status') {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.getAbility('lifegem'));
			}
		},
		name: "Life Gem",
		shortDesc: "Holder's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack.",
		rating: 3,
		num: 1007,
	},
	powercore: {
		// Hazard Immunity implemented in moves.js
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostName;
			for (i in boost) {
				delete boost[i];
				this.add('-ability', target, 'Power Core');
				this.hint("Power Core prevents stat changes for the user.");
			}
		},
		name: "Power Core",
		shortDesc: "Immunity to hazards and any kind of stat changes.",
		rating: 3,
		num: 1008,
	},
	aerialmenace: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Aerial Menace');
				}
				return null;
			}
		},
		name: "Aerial Menace",
		shortDesc: "This Pokemon's attack is raised by one stage if hit by a Flying-type move; Flying-type immunity.",
		rating: 3,
		num: 1009,
	},
	shadowworld: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Shadow World');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (target !== source || move.category !== 'Status' || move.type === 'Ghost' || move.type === 'Dark') {
					if (!move.auraBooster) move.auraBooster = this.effectData.target;
					if (move.auraBooster !== this.effectData.target) return;
					return this.chainModify(1.2);
				}
				else if (target !== source || move.category !== 'Status' || move.type === 'Fairy' || move.type === 'Psychic') {
					if (!move.auraBooster) move.auraBooster = this.effectData.target;
					if (move.auraBooster !== this.effectData.target) return;
					return this.chainModify(0.8);
				}
			}
		},
		isUnbreakable: true,
		name: "Shadow World",
		shortDesc: "When this Ability is active, Ghost & Dark moves have 1.2x power. Psychic & Fairy have 0.8x power.",
		rating: 3,
		num: 1010,
	},
	burnheal: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		name: "Burn Heal",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when burned; no HP loss or damage reduction.",
		rating: 4,
		num: 1011,
	},
	sharpshooter: {
		onStart(source) {
			this.useMove('lockon', source);
		},
		name: "Sharpshooter",
		shortDesc: "On switch-in, this Pokemon activates the Lock-On effect.",
		rating: 2,
		num: 1012,
	},
	forecast: {
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if (this.effectData.switchingIn) {
				if (this.field.isWeather('raindance')) {
					this.field.clearWeather();
					this.field.setWeather('raindance');
				}
				if (this.field.isWeather('sunnyday')) {
					this.field.clearWeather();
					this.field.setWeather('sunnyday');
				}
				if (this.field.isWeather('sandstorm')) {
					this.field.clearWeather();
					this.field.setWeather('sandstorm');
				}
				if (this.field.isWeather('hail')) {
					this.field.clearWeather();
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
		shortDesc: "Upon Entry, resets any regular weather. Gets secondary typing matching weather.",
		rating: 2,
		num: 59,
	},
	liquidscales: {
		onDamagingHit(damage, target, source, move) {
			if (move.category !== 'Status') {
				this.heal(target.baseMaxhp / 10);
			}
		},
		name: "Liquid Scales",
		shortDesc: "If targeted by a foe's move, this Pokemon restores 1/10 max HP.",
		rating: 3,
		num: 1013,
	},
	flowergift: {
		onModifyAtkPriority: 3,
		onModifyAtk(atk, pokemon) {
			if (pokemon.species.id !== 'shayminsky') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 4,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id !== 'shayminsky') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Flower Gift",
		shortDesc: "If user is Shaymin-Sky and Sunny Day is active, its Attack and Sp. Def are 1.5x.",
		rating: 1,
		num: 122,
	},
	mistycoat: {
		onModifySpDPriority: 6,
		onModifySpD(pokemon) {
			if (this.field.isTerrain('mistyterrain')) return this.chainModify(1.5);
		},
		name: "Misty Coat",
		shortDesc: "If Misty Terrain is active, this Pokemon's Special Defense is multiplied by 1.5.",
		rating: 0.5,
		num: 1014,
	},
	pulpup: {
		onStart(pokemon, layers) {
			if (pokemon.hp >= pokemon.maxhp - pokemon.maxhp / 3) {
				this.effectData.layers = 1;
				this.effectData.def = 0;
				this.effectData.spd = 0;
				this.add('-start', target, 'stockpile' + this.effectData.layers);
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectData.def--;
				if (curSpD !== target.boosts.spd) this.effectData.spd--;
			}
			else if (pokemon.hp <= pokemon.maxhp / 3) {
				this.effectData.layers = 3;
				this.effectData.def = 2;
				this.effectData.spd = 2;
				this.add('-start', target, 'stockpile' + this.effectData.layers);
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				this.boost({def: 3, spd: 3}, target, target);
				if (curDef !== target.boosts.def) this.effectData.def--;
				if (curSpD !== target.boosts.spd) this.effectData.spd--;
			}
			else if (pokemon.maxhp - pokemon.maxhp / 3 > pokemon.hp > pokemon.maxhp / 3) {
				this.effectData.layers = 2;
				this.effectData.def = 1;
				this.effectData.spd = 1;
				this.add('-start', target, 'stockpile' + this.effectData.layers);
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				this.boost({def: 2, spd: 2}, target, target);
				if (curDef !== target.boosts.def) this.effectData.def--;
				if (curSpD !== target.boosts.spd) this.effectData.spd--;
			}
		},
		name: "Pulp Up",
		shortDesc: "On entry, at >= 2/3 HP; 1x Stockpile, at <= 1/3 HP; 3x Stockpile, else 2x Stockpile.",
		rating: 3,
		num: 1015,
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
		num: 1016,
	},
	iceface: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Ice Face weaken');
				return this.chainModify(0.5);
			}
			else if (move.type === 'Fire') {
				this.debug('Ice Face stronger');
				return this.chainModify(2);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Ice Face weaken');
				return this.chainModify(0.5);
			}
			else if (move.type === 'Fire') {
				this.debug('Ice Face stronger');
				return this.chainModify(2);
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		name: "Ice Face",
		shortDesc: "Takes 2x damage from Fire and 0.5x damage from Water. Immune to flinch.",
		rating: 3,
		num: 248,
	},
	washup: {
		onStart(source) {
			this.field.addPseudoWeather('watersport');
		},
		name: "Wash Up",
		shortDesc: "On switch-in, this Pokemon summons the Water Sport effect.",
		rating: 2,
		num: 1017,
	},
	darkaura: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Dark Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (target === source || move.category === 'Status' || move.type !== 'Dark') return;
				if (!move.auraBooster) move.auraBooster = this.effectData.target;
				if (move.auraBooster !== this.effectData.target) return;
				return this.chainModify(1.33);
			}
		},
		isUnbreakable: true,
		name: "Dark Aura",
		rating: 3,
		num: 186,
	},
	fairyaura: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Fairy Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (target === source || move.category === 'Status' || move.type !== 'Fairy') return;
				if (!move.auraBooster) move.auraBooster = this.effectData.target;
				if (move.auraBooster !== this.effectData.target) return;
				return this.chainModify(1.33);
			}
		},
		isUnbreakable: true,
		name: "Fairy Aura",
		rating: 3,
		num: 187,
	},
	aurabreak: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Aura Break');
		},
		name: "Aura Break",
		shortDesc: "This Pokemon ignores the effects certain Abilities of other Pokemon have on their moves.",
		rating: 2.5,
		num: 188,
	},
	adaptability: {
		onModifyMove(move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				move.stab = 2;
			}
		},
		name: "Adaptability",
		rating: 4,
		num: 91,
	},
	aerilate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Flying';
				move.aerilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.aerilateBoosted) return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Aerilate",
		rating: 4,
		num: 185,
	},
	analytic: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, source, target) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				let boosted = true;
				for (const target of this.getAllActive()) {
					if (target === source) continue;
					if (this.queue.willMove(target)) {
						boosted = false;
						break;
					}
				}
				if (boosted) {
					this.debug('Analytic boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		name: "Analytic",
		rating: 2.5,
		num: 148,
	},
	flareboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (attacker.status === 'brn' && move.category === 'Special') {
					return this.chainModify(1.5);
				}
			}
		},
		name: "Flare Boost",
		rating: 2,
		num: 138,
	},
	galvanize: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Electric';
				move.galvanizeBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.galvanizeBoosted) return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Galvanize",
		rating: 4,
		num: 206,
	},
	guts: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon, source) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (source.status) {
					return this.chainModify(1.5);
				}
			}
		},
		name: "Guts",
		rating: 3,
		num: 62,
	},
	hustle: {
		// This should be applied directly to the stat as opposed to chaining with the others
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				return this.modify(atk, 1.5);
			}
		},
		onSourceModifyAccuracyPriority: 7,
		onSourceModifyAccuracy(accuracy, target, source, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.category === 'Physical' && typeof accuracy === 'number') {
					return accuracy * 0.8;
				}
			}
		},
		name: "Hustle",
		rating: 3.5,
		num: 55,
	},
	ironfist: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.flags['punch']) {
					this.debug('Iron Fist boost');
					return this.chainModify([0x1333, 0x1000]);
				}
			}
		},
		name: "Iron Fist",
		rating: 3,
		num: 89,
	},
	pixilate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fairy';
				move.pixilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.pixilateBoosted) return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Pixilate",
		rating: 4,
		num: 182,
	},
	poisontouch: {
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove(move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (!move || !move.flags['contact'] || move.target === 'self') return;
				if (!move.secondaries) {
					move.secondaries = [];
				}
				move.secondaries.push({
					chance: 30,
					status: 'psn',
					ability: this.dex.getAbility('poisontouch'),
				});
			}
		},
		name: "Poison Touch",
		rating: 2,
		num: 143,
	},
	punkrock: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.flags['sound']) {
					this.debug('Punk Rock boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Punk Rock",
		rating: 3.5,
		num: 244,
	},
	refrigerate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ice';
				move.refrigerateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.refrigerateBoosted) return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Refrigerate",
		rating: 4,
		num: 174,
	},
	sandforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				for (const pokemon of this.getAllActive()) {
					if (pokemon.hasAbility('aurabreak')) return;
					if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
						this.debug('Sand Force boost');
						return this.chainModify([0x14CD, 0x1000]);
					}
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Sand Force",
		rating: 2,
		num: 159,
	},
	sheerforce: {
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.hasSheerForce) return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Sheer Force",
		rating: 3.5,
		num: 125,
	},
	solarpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
					return this.chainModify(1.5);
				}
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		name: "Solar Power",
		rating: 2,
		num: 94,
	},
	steelworker: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.type === 'Steel') {
					this.debug('Steelworker boost');
					return this.chainModify(1.5);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.type === 'Steel') {
					this.debug('Steelworker boost');
					return this.chainModify(1.5);
				}
			}
		},
		name: "Steelworker",
		rating: 3.5,
		num: 200,
	},
	strongjaw: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.flags['bite']) {
					return this.chainModify(1.5);
				}
			}
		},
		name: "Strong Jaw",
		rating: 3,
		num: 173,
	},
	technician: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move, pokemon) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (basePowerAfterMultiplier <= 60) {
					this.debug('Technician boost');
					return this.chainModify(1.5);
				}
			}
		},
		name: "Technician",
		rating: 3.5,
		num: 101,
	},
	toughclaws: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.flags['contact']) {
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		name: "Tough Claws",
		rating: 3.5,
		num: 181,
	},
	transistor: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.type === 'Electric') {
					this.debug('Transistor boost');
					return this.chainModify(1.5);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move, pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.type === 'Electric') {
					this.debug('Transistor boost');
					return this.chainModify(1.5);
				}
			}
		},
		name: "Transistor",
		rating: 3.5,
		num: 262,
	},
	waterbubble: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.type === 'Water') {
					return this.chainModify(2);
				}
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('aurabreak')) return;
				if (move.type === 'Water') {
					return this.chainModify(2);
				}
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
		rating: 4.5,
		num: 199,
	},
	powerconstruct: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dragon' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Power Construct boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dragon' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Power Construct boost');
				return this.chainModify(1.5);
			}
		},
		name: "Power Construct",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Dragon attacks.",
		rating: 2,
		num: 211,
	},
};
