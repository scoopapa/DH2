export const Abilities: {[k: string]: ModdedAbilityData} = {
	slyslime: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		onSourceDamagingHit(damage, target, source, move) {
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				for (const side of [source.side.foeSidesWithConditions()]) {
            	if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
            	if (target.volatiles['substitute'] || side.getSideCondition(sideCondition)) {
              		if (this.randomChance(10, 10)) {
                		this.add('-ability', source, 'Sly Slime');
                		this.boost({spe: -1}, target, source, null, true);
						}
					}
				}
			}
		},
		flags: {},
		name: "Sly Slime",
		shortDesc: "User's moves ignore screens and Substitute. -1 Speed to hit foes behind screens or Substitute.",
	},
	sappyjest: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true; // add dark immunity in scripts
				return priority + 1;
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.priority > 0.1) {
				this.add('-immune', pokemon, '[from] ability: Sappy Jest');
				return null;
			}
		},
		flags: {},
		name: "Sappy Jest",
		shortDesc: "User's status moves have +1 priority. User is immune to priority moves.",
	},
	knightseye: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Knight\'s Eye", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Knight's Eye",
		shortDesc: "Keen Eye + Shell Armor",
	},
	rootsnap: {
		onModifyMove(move) {
			move.ignoreAbility = true;
      // come back and add a check for all immunity abilities
		},
		flags: {},
		name: "Root Snap",
		shortDesc: "(Placeholder) This Pokemon's moves ignore ability-based immunities",
	},
	hydrovision: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydrovision');
				pokemon.cureStatus();
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: {breakable: 1},
		name: "Hydrovision",
		shortDesc: "Keen Eye + Hydration",
	},
	googetter: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Goo-Getter only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({spe: 2}, target, target, null, false, true);
			}
		},
		flags: {},
		name: "Goo-Getter",
		shortDesc: "This Pokemon's Speed is raised by 2 for each of its stats that is lowered by a foe.",
	},
	restlessspeed: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Restless Speed');
				pokemon.cureStatus();
        this.boost({spe: 1}, pokemon, pokemon, null, false, true);
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Restless Speed');
			}
      this.boost({spe: 1}, target, target, null, false, true);
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' || status.id === 'flinch') {
				this.add('-immune', target, '[from] ability: Restless Speed');
        this.boost({spe: 1}, target, target, null, false, true);
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Restless Speed",
		shortDesc: "Can't be flinched or put to sleep. +1 Speed if either is attempted.",
	},
	hyperfocus: {
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Hyperfocus",
		shortDesc: "This Pokemon's crit ratio is increased by 1 stage. Cannot be struck by a crit or flinched.",
	},
	heroego: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				this.boost({atk: 1});
			}
		},
		flags: {},
		name: "Hero Ego",
		shortDesc: "Justified + Moxie",
	},
	magicsurge: {
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Magic Surge boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Magic Surge boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Magic Surge",
		shortDesc: "Torrent + Misty Surge",
	},
	neutralmatch: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Neutral Match only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({spa: 2}, target, target, null, false, true);
			}
		},
		// add ngas functionality in scripts
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Neutral Match');
			pokemon.abilityState.ending = false;
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			for (const target of this.getAllActive()) {
				if (target.hasItem('Ability Shield')) {
					this.add('-block', target, 'item: Ability Shield');
					continue;
				}
				if (target.volatiles['commanding']) {
					continue;
				}
				if (target.illusion) {
					this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, pokemon, 'neutralmatch');
				}
				if (target.volatiles['slowstart']) {
					delete target.volatiles['slowstart'];
					this.add('-end', target, 'Slow Start', '[silent]');
				}
				if (strongWeathers.includes(target.getAbility().id)) {
					this.singleEvent('End', this.dex.abilities.get(target.getAbility().id), target.abilityState, target, pokemon, 'neutralmatch');
				}
			}
		},
		onEnd(source) {
			if (source.transformed) return;
			for (const pokemon of this.getAllActive()) {
				if (pokemon !== source && pokemon.hasAbility('Neutral Match')) {
					return;
				}
			}
			this.add('-end', source, 'ability: Neutral Match');
			if (source.abilityState.ending) return;
			source.abilityState.ending = true;
			const sortedActive = this.getAllActive();
			this.speedSort(sortedActive);
			for (const pokemon of sortedActive) {
				if (pokemon !== source) {
					if (pokemon.getAbility().flags['cantsuppress']) continue; // does not interact with e.g Ice Face, Zen Mode
					if (pokemon.hasItem('abilityshield')) continue; // don't restart abilities that weren't suppressed
					this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityState, pokemon);
					if (pokemon.ability === "gluttony") {
						pokemon.abilityState.gluttony = false;
					}
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Neutral Match",
		shortDesc: "Competitive + Neutralizing Gas",
	},
	focusfalls: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Magic Surge boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Magic Surge boost');
				return this.chainModify(1.5);
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onTryBoost(boost, target, source, effect) { // add other intim clones here
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Focus Falls', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Focus Falls",
		shortDesc: "Torrent + Inner Focus",
	},
	armorsurge: {
		onStart(source) {
			this.field.setTerrain('psychicterrain');
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Armor Surge",
		shortDesc: "Shell Armor + Psychic Surge",
	},
	divegoggles: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Dive Goggles boost');
				return this.chainModify(2);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dive Goggles');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Dive Goggles",
		shortDesc: "Tinted Lens + Water Absorb",
	},
	highenergy: {
		onAnyTryMove(target, source, move) {
			if (move.status && move.status === 'slp') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: High Energy', move, '[of] ' + target);
				return false;
			}
		},
		flags: {breakable: 1},
		name: "High Energy",
		shortDesc: "Prevents the use of sleep-inducing moves while the user is active.",
	},
	stormysight: {
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Stormy Sight", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: {breakable: 1},
		name: "Stormy Sight",
		shortDesc: "Keen Eye + Drizzle",
	},
	smokeabsorb: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Smoke Absorb", "[of] " + target);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Smoke Absorb');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Smoke Absorb",
		shortDesc: "White Smoke + Water Absorb",
	},
	solarradiation: {
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'groudon') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('sunnyday');
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Solar Radiation",
		shortDesc: "Drought + Poison Point",
	},
	daftshield: {
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
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
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Daft Shield",
		shortDesc: "Shell Armor + Unaware",
	},
	forbiddengarden: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Forbidden Garden');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Forbidden Garden');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onFoeTryMove(target, source, move) {
			if (move.type === 'Grass') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Forbidden Garden', move, '[of] ' + target);
				return false;
			}
		},
		flags: {},
		name: "Forbidden Garden",
		shortDesc: "While this Pokemon is active, opposing Pokemon can't use Grass moves or Berries.",
	},
	sandproof: {
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		onTryHit(pokemon, target, move) {
			if (move.flags['bullet']) {
				this.add('-immune', pokemon, '[from] ability: Sandproof');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Sandproof",
		shortDesc: "Sand Stream + Bulletproof",
	},
	cryowarning: {
		onStart(source) {
			this.field.setWeather('snow');
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		flags: {},
		name: "Cryowarning",
		shortDesc: "Snow Warning + Ice Body",
	},
	tundraveil: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather(['hail', 'snow', 'sandstorm'])) {
				this.debug('Tundra Veil - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "Tundra Veil",
		shortDesc: "Snow Cloak + Sand Veil",
	},
	tundrarush: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'sandstorm'])) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Tundra Rush",
		shortDesc: "Slush Rush + Sand Rush",
	},
	nightvision: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Night Vision', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		onModifyMove(move) {
			move.stab = 2;
		},
		flags: {},
		name: "Night Vision",
		shortDesc: "Adaptability + Frisk",
	},
	malware: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Malware');
			this.add('-message', `${pokemon.name}'s malicious code exerts pressure!`);
			let totaldef = 0;
			let totalspd = 0;
			for (const target of pokemon.foes()) {
				totaldef += target.getStat('def', false, true);
				totalspd += target.getStat('spd', false, true);
			}
			if (totaldef && totaldef >= totalspd) {
				this.boost({spa: 1});
			} else if (totalspd) {
				this.boost({atk: 1});
			}
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		flags: {},
		name: "Malware",
		shortDesc: "Download + Pressure",
	},
	quickdelivery: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onStart(pokemon) { // double-check items.ts for implementation
			pokemon.abilityState.gluttony = true;
		},
		onDamage(item, pokemon) {
			pokemon.abilityState.gluttony = true;
		},
		flags: {},
		name: "Quick Delivery",
		shortDesc: "Chlorophyll + Gluttony",
	},
	fastvenom: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onDamagingHit(damage, target, source, move) {
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
		name: "Fast Venom",
		shortDesc: "Chlorophyll + Effect Spore",
	},
	overbloom: {
		onAllyTryBoost(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Grass')) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Overbloom', '[of] ' + effectHolder);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (target.hasType('Grass') && source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Flower Veil');
				if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) { // add any synchro clones here
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Overbloom', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target.hasType('Grass') && status.id === 'yawn') {
				this.debug('Flower Veil blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Overbloom', '[of] ' + effectHolder);
				return null;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overbloom boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overbloom boost');
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Overbloom",
		shortDesc: "Flower Veil + Overgrow",
	},
	teamwork: {
		onAllyAfterUseItem(item, pokemon) {
			if (pokemon.switchFlag) return;
			const source = this.effectState.target;
			const myItem = source.takeItem();
			if (!myItem) return;
			if (
				!this.singleEvent('TakeItem', myItem, source.itemState, pokemon, source, this.effect, myItem) ||
				!pokemon.setItem(myItem)
			) {
				source.item = myItem.id;
				return;
			}
			this.add('-activate', source, 'ability: Teamwork', myItem, '[of] ' + pokemon);
		},
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Teamwork');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-immune', target, '[from] ability: Teamwork');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Teamwork",
		shortDesc: "Symbiosis + Leaf Guard",
	},
	pyrotechnic: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Pyrotechnic boost');
				return this.chainModify(1.5);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('pyrotechnic')) {
					this.add('-immune', target, '[from] ability: Pyrotechnic');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('pyrotechnic');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Pyrotechnic');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('pyrotechnic')) {
					this.debug('Pyrotechnic boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('pyrotechnic')) {
					this.debug('Pyrotechnic boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Pyrotechnic', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Pyrotechnic",
		shortDesc: "Flash Fire + Technician",
	},
	lightarmor: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 2}, target, target);
				pokemon.weighthg = Math.max(1, pokemon.weighthg / 2);
			}
		},
		flags: {},
		name: "Light Armor",
		shortDesc: "If hit by a physical move, -1 Def, +2 Spe, halved weight.",
	},
	strongarmor: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 2}, target, target);
			}
		},
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// remember to add lo recoil immunity to sheer force clones
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Strong Armor",
		shortDesc: "Weak Armor + Sheer Force", 
	},
	heatblade: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Heatblade boost');
				return this.chainModify(1.5);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.flags['slicing']) {
				this.add('-immune', pokemon, '[from] ability: Heatblade');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Heatblade",
		shortDesc: "User's slicing moves deal 1.5x damage. User is immune to slicing moves.", 
	},
	underestimate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Underestimate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Underestimate boost');
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {},
		name: "Underestimate",
		shortDesc: "Intimidate + Reckless", 
	},
	migrate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Migrate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Migrate",
		shortDesc: "Intimidate + Guts", // add guts burn immunity to scripts
	},
	seizethemoment: {
		// placeholder
		flags: {},
		name: "Seize the Moment",
		shortDesc: "(Placeholder) If a screen is set on the foe's side of the field, it is also set on this Pokemon's side of the field.",
	},
	safeentry: {
		onSetStatus(status, target, source, effect) {
			if (!target.activeTurns) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Safe Entry');
				}
				return false;
			}
		},
		flags: {},
		name: "Safe Entry",
		shortDesc: "This Pokemon cannot be inflicted with status when switching in.",
	},
	speeddemon: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Speed Demon",
		shortDesc: "Speed Boost + Chlorophyll",
	},
	pestilence: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (!defender.hasType('Bug')) {
				this.debug('Pestilence boost');
				return this.chainModify(1.25);
			} else {
				this.debug('Pestilence weaken');
				return this.chainModify(0.75);
			}
		},
		flags: {},
		name: "Pestilence",
		shortDesc: "This Pokemon's Bug attacks do 1.25x damage to non-Bug targets; 0.75x on Bugs.",
	},
	breakingcharacter: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Breaking Character');
			this.add('-message', `${pokemon.name} is breaking character!`);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		flags: {},
		name: "Breaking Character",
		shortDesc: "Mold Breaker + Moxie",
	},
	unsettling: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Unsettling');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Unsettling');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		flags: {}, // add burn immunity in scripts.ts
		name: "Unsettling",
		shortDesc: "While this Pokemon is active, foes can't eat berries. Ignores burn Attack drop.",
	},
	kelppower: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (['Water', 'Grass'].includes(move.type) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Kelp Power boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (['Water', 'Grass'].includes(move.type) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Kelp Power boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Kelp Power",
		shortDesc: "Torrent + Overgrow",
	},
	prideful: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) { // add all intim clones later
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Prideful', '[of] ' + target);
			}
		},
		flags: {},
		name: "Prideful",
		shortDesc: "Scrappy + Moxie",
	},
	smelting: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Smelting');
				return null;
			}
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('smelting')) {
					this.add('-immune', target, '[from] ability: Smelting');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('smelting');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Smelting');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('smelting')) {
					this.debug('Smelting boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('smelting')) {
					this.debug('Smelting boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Smelting', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Smelting",
		shortDesc: "Good as Gold + Flash Fire",
	},
	downinflames: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Down In Flames boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Down In Flames boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Down In Flames boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Down In Flames",
		shortDesc: "Reckless + Blaze",
	},
	fromashes: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: From Ashes', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		flags: {},
		name: "From Ashes",
		shortDesc: "Regenerator + Frisk",
	},
	bubbleburster: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Bubble Burster');
			this.add('-message', `${pokemon.name} bursts the foe's bubble!`);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
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
			if (move.type === 'Water') {
				return this.chainModify(2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(2);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Bubble Burster');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Bubble Burster');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Bubble Burster",
		shortDesc: "Mold Breaker + Water Bubble",
	},
	owntides: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Own Tides');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Own Tides');
				}
				return null;
			}
		},
		onHit(target, source, move) {
			if (move?.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Own Tides');
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) { // add intim clones here later
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tides', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Own Tides",
		shortDesc: "Own Tempo + Water Absorb",
	},
	saltwatersauna: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Saltwater Sauna');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Saltwater Sauna');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (['Water', 'Fire', 'Ghost'].includes(move.type)) {
				this.debug('Saltwater Sauna weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (['Water', 'Fire', 'Ghost'].includes(move.type)) {
				this.debug('Saltwater Sauna weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Saltwater Sauna",
		shortDesc: "Ghost/Fire/Water-type moves against this Pokemon deal 0.5x damage; can't be statused.",
	},
	obsidianbody: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Obsidian Body", "[of] " + target);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Obsidian Body');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Obsidian Body');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Obsidian Body",
		shortDesc: "Pokemon making contact have a 30% chance to be burnt. Foes can't lower this Pokemon's stats or burn it.",
	},
	sturdyfire: {
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Sturdy Fire');
				return null;
			}
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('sturdyfire')) {
					this.add('-immune', target, '[from] ability: Sturdy Fire');
				}
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy Fire');
				return target.hp - 1;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('sturdyfire');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Sturdy Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('sturdyfire')) {
					this.debug('Sturdy Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('sturdyfire')) {
					this.debug('Sturdy Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Sturdy Fire', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Sturdy Fire",
		shortDesc: "Sturdy + Flash Fire",
	},
	deeptoxin: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		// implement corrosion effect in scripts.ts
		flags: {},
		name: "Deep Toxin",
		shortDesc: "Corrosion + Infiltrator",
	},
	clueless: {
		onTryHit(target, source, move) {
			if (target !== source && target.isAlly(source) && move.category !== 'Status') {
				this.add('-activate', target, 'ability: Clueless');
				return null;
			}
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Clueless');
				return null;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Clueless');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Clueless');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Clueless');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) { // add all intim clones here
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Clueless', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Clueless",
		shortDesc: "Oblivious + Telepathy",
	},
	eerieflames: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, source);
			return null;
			if (move.type === 'Fire') {
				this.add('-immune', pokemon, '[from] ability: Eerie Flames');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, this.effectState.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		flags: {breakable: 1},
		name: "Eerie Flames",
		shortDesc: "Bounces back certain status moves; Fire immunity.",
	},
	guardsup: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (['reflect', 'lightscreen', 'auroraveil', 'substitute'].includes(move.id)) {
						this.add('-ability', pokemon, 'Guards Up');
						return;
					}
				}
			}
		},
		flags: {},
		name: "Guards Up",
		shortDesc: "This Pokemon shudders if any foe has Reflect/Light Screen/Aurora Veil/Substitute.",
	},
	healingburns: {
		onDamagingHit(damage, target, source, move) {
			for (const allyActive of target.adjacentAllies()) {
				if (this.checkMoveMakesContact(move, source, allyActive)) {
					if (allyActive.status && this.randomChance(3, 10)) {
						this.add('-activate', target, 'ability: Healing Burns');
						allyActive.cureStatus();
					}
				}
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				if (allyActive.status && this.randomChance(3, 10)) {
					this.add('-activate', pokemon, 'ability: Healing Burns');
					allyActive.cureStatus();
				}
			}
		},
		flags: {},
		name: "Healing Burns",
		shortDesc: "30% chance to heal ally's status each turn or if they get hit by a contact move.",
	},
	smellytouch: {
		onSourceDamagingHit(damage, target, source, move) {
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			const targetAbility = target.getAbility();
			if (targetAbility.flags['cantsuppress'] || targetAbility.id === 'smellytouch') {
				return;
			}
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					const oldAbility = target.setAbility('smellytouch', source);
					if (oldAbility) {
						this.add('-activate', source, 'ability: Smelly Touch', this.dex.abilities.get(oldAbility).name, '[of] ' + target);
					}
				}
			}
		},
		flags: {},
		name: "Smelly Touch",
		shortDesc: "This Pokemon's contact moves have a 30% chance of replacing the target's ability with Smelly Touch.",
	},
	berryfeast: {
		onStart(pokemon) { // add gluttony effects in items.ts
			pokemon.abilityState.gluttony = true;
		},
		onDamage(item, pokemon) {
			pokemon.abilityState.gluttony = true;
		},
		onEatItem(item, pokemon) {
			if (item.isBerry) {
				pokemon.addVolatile('berryfeast');
			}
		},
		onTakeItem(item, pokemon) {
			if (item.isBerry) {
				pokemon.addVolatile('berryfeast');
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('unburden');
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(2);
				}
			},
		},
		flags: {},
		name: "Berry Feast",
		shortDesc: "Gluttony + Unburden (for berries only)",
	},
	thickpressure: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Thick Pressure');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Pressure weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Pressure weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Thick Pressure",
		shortDesc: "Thick Fat + Pressure",
	},
	incorporate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Incorporate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onTryBoost(boost, target, source, effect) { // add all other intim clones here
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Incorporate', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Incorporate",
		shortDesc: "Intimidate + Inner Focus",
	},
	itemmeddler: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				const source = pokemon.allies()[0];
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Item Meddler', '[of] ' + pokemon, '[identify]');
					if (!source.item) {
						const myItem = target.getItem().name;
						if (!myItem) return;
						if (!pokemon.setItem(myItem)) {
							source.item = myItem.id;
							return;
						}
						this.add('-activate', source, 'ability: Item Meddler', myItem, '[of] ' + pokemon);
					}
				}
			}
		},
		flags: {},
		name: "Item Meddler",
		shortDesc: "Identifies all foes' items and gives one to its ally if they don't have one.",
	},
	mindalign: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if ((target !== source && move.type === 'Grass') ||
				 (target !== source && target.isAlly(source) && move.category !== 'Status')) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Mind Align');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Grass') {
				this.boost({atk: 1}, this.effectState.target);
			}
		},
		flags: {breakable: 1},
		name: "Mind Align",
		shortDesc: "Attack is raised 1 stage if hit by a Grass move or ally's moves; Grass & Ally move immunity.",
	},
	scavenge: {
		shortDesc: "This Pokemon's heals 33% of its HP after KOing a foe or eating a berry.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add('-activate', source, 'ability: Scavenge');
				this.heal(source.baseMaxhp / 3, source, source, effect);
			}
		},
		onEatItem(item, pokemon) {
			this.heal(pokemon.baseMaxhp / 3);
		},
		name: "Scavenge",
		rating: 3.5,
	},
	hungerfate: {
		onStart(pokemon) { // add gluttony effects later
			pokemon.abilityState.gluttony = true;
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Incorporate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onDamage(item, pokemon) {
			pokemon.abilityState.gluttony = true;
		},
		flags: {},
		name: "Hunger Fate",
		shortDesc: "Intimidate + Gluttony",
	},
	parroting: {
		// implement dancer effects in scripts
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound'] || move.flags['dance']) {
				this.debug('Parroting weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Parroting",
		shortDesc: "Uses a dance or sound move after another Pokemon does. Takes 0.5x damage from dance and sound moves.",
	},
	telescopicsight: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Telescopic Sight", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Telescopic Sight boost');
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Telescopic Sight",
		shortDesc: "Keen Eye + Sniper",
	},
	slowbugs: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.type === 'Bug') {
				return -0.1;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Slow Bugs boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Slow Bugs boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Slow Bugs",
		shortDesc: "User's Bug moves deal 1.5x damage, but move last in their priority bracket.",
	},
	nightlyjokes: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Nightly Jokes');
				return null;
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true; // add dark-type prankster immunity in scripts
				return priority + 1;
			}
		},
		flags: {breakable: 1},
		name: "Nightly Jokes",
		shortDesc: "This Pokemon is immune to status moves and its own have +1 priority.",
	},
	supercharmingsyrup: {
		onStart(pokemon) {
			if (pokemon.syrupTriggered) return;
			pokemon.syrupTriggered = true;
			this.add('-ability', pokemon, 'Supercharming Syrup');
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Supersweet Syrup', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({evasion: -1}, target, pokemon, null, true);
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					this.add('-ability', target, 'Gooey');
					this.boost({evasion: -1}, source, target, null, true);
				}
			}
		},
		flags: {breakable: 1},
		name: "Supercharming Syrup",
		shortDesc: "Lowers the foe's evasiveness once per battle. 30% chance to lower the evasiveness of foes making contact.",
	},
};
