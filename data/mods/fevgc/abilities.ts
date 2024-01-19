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
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Pyrotechnic');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('flashfire');
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
};
