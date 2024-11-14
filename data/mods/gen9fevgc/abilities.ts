export const Abilities: {[k: string]: ModdedAbilityData} = {
	slyslime: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		onSourceDamagingHit(damage, target, source, move) {
         if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				for (const side of [source.side.foeSidesWithConditions()]) {
            	if (target.volatiles['substitute'] || side.getSideCondition(sideCondition)) {
                		this.add('-ability', source, 'Sly Slime');
                		this.boost({spe: -1}, target, source, null, true);
							return;
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
			if (move.priority > 0.1 && target !== pokemon) {
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
		onModifyMove(move, attacker, defender) {
				if (defender.hasAbility(['dryskin', 'flashfire', 'sapsipper', 'lightningrod', 'motordrive', 'stormdrain', 'voltabsorb',
					'waterabsorb', 'eartheater', 'sappyjest', 'heatblade', 'eerieflames', 'mindalign', 'nightlyjokes', 'levitate', 'leafcoat',
					'friendlyprank', 'bulletproof', 'soundproof', 'wellbakedbody', 'clumpingup', 'windrider', 'wonderguard', 'divegoggles',
					'smokeabsorb', 'sandproof', 'pyrotechnic', 'smelting', 'goodasgold', 'owntides', 'sturdyfire', 'speedyfire', 'ghoulfire',
					'clueless', 'sirocco', 'sunlitflight', 'lithoproof', 'shockhorror', 'respark', 'hydrophillic', 'bulletveil', 'rekindle',
					'airdrive', 'winddrive', 'windenergy', 'litnitwit'])) {
						move.ignoreAbility = true;
				}
		},
		flags: {},
		name: "Root Snap",
		shortDesc: "This Pokemon's moves ignore ability-based immunities",
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
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					this.boost({spe: 2}, target, target, null, false, true);
					return;
				}
			}
		},
		flags: {},
		name: "Goo-Getter",
		shortDesc: "This Pokemon's Speed is raised by 2 when its stats are lowered by a foe.",
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
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Hyperfocus', '[of] ' + target);
			}
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
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					this.boost({spa: 2}, target, target, null, false, true);
					return;
				}
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
					if (pokemon.getAbility().flags['cantsuppress'] || pokemon.hasItem('abilityshield')) continue;
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
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
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
				if (action.choice === 'runPrimal') {
					if (action.pokemon === source && source.species.id === 'kyogre') return;
				} else if (action.choice !== 'runSwitch') break;
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
				if (action.choice === 'runPrimal') {
						if (action.pokemon === source && source.species.id === 'groudon') return;
				} else if (action.choice !== 'runSwitch') break;
			}
			this.field.setWeather('sunnyday');
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && this.randomChance(3, 10)) {
				source.trySetStatus('psn', target);
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
			if (unawareUser === this.activePokemon) {
				if (pokemon === this.activeTarget) {
					boosts['def'] = 0;
					boosts['spd'] = 0;
					boosts['evasion'] = 0;
				}
			}
			else if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
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
				if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
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
			noCopy: true,
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
				target.weighthg = Math.max(1, target.weighthg / 2);
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
			if (defender.hasType('Bug')) {
				this.debug('Pestilence weaken');
				return this.chainModify(0.75);
			}
			this.debug('Pestilence boost');
			return this.chainModify(1.25);
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
			move.ignoreImmunity ||= {};
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
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
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
			noCopy: true,
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
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
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
			if (this.checkMoveMakesContact(move, source, target) && this.randomChance(3, 10)) {
				source.trySetStatus('brn', target);
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
			noCopy: true, 
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
				this.add('-immune', target, '[from] ability: Clueless');
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
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
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
			target.addVolatile('eerieflame');
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, this.effectState.target, source);
			target.addVolatile('eerieflame');
			return null;
		},
		condition: {
			duration: 1,
		},
		flags: {breakable: 1},
		name: "Eerie Flames",
		shortDesc: "Bounces back certain status moves. Flash Fire boost when it does.",
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
				if (this.checkMoveMakesContact(move, source, allyActive) && allyActive.status && this.randomChance(3, 10)) {
					this.add('-activate', target, 'ability: Healing Burns');
					allyActive.cureStatus();
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
			if (this.checkMoveMakesContact(move, target, source) && this.randomChance(3, 10)) {
				const oldAbility = target.setAbility('smellytouch', source);
				if (oldAbility) {
					this.add('-activate', source, 'ability: Smelly Touch', this.dex.abilities.get(oldAbility).name, '[of] ' + target);
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
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
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
			if (target !== source && (move.type === 'Grass' || (target.isAlly(source) && move.category !== 'Status'))) {
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
				this.heal(length * source.baseMaxhp / 3, source, source, effect);
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
					this.add('-ability', pokemon, 'Supercharming Syrup', '[silent]');
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({evasion: -1}, target, pokemon, null, true);
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && this.randomChance(3, 10)) {
				this.add('-ability', target, 'Supercharming Syrup');
				this.boost({evasion: -1}, source, target, null, true);
			}
		},
		flags: {breakable: 1},
		name: "Supercharming Syrup",
		shortDesc: "Lowers the foe's evasiveness on switch once per battle. 30% chance to lower the evasiveness of foes making contact.",
	},
	magicsticks: {
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Magic Sticks');
				return false;
			}
		},
		flags: {breakable: 1},
		name: "Magic Sticks",
		shortDesc: "Sticky Hold + Magic Guard",
	},
	recollect: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon) {
				if (pokemon === this.activeTarget) {
					boosts['def'] = 0;
					boosts['spd'] = 0;
					boosts['evasion'] = 0;
				}
			}
			else if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		flags: {breakable: 1},
		name: "Recollect",
		shortDesc: "Regenerator + Unaware",
	},
	surgeoneye: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			for (const target of this.getAllActive()) {
				if (target !== pokemon && this.queue.willMove(target)) {
					return;
				}
			}
			this.debug('Surgeon Eye boost');
			return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Surgeon Eye",
		shortDesc: "Regenerator + Analytic",
	},
	neutralpolarity: {
		onStart(pokemon) {
			for (const foe of pokemon.adjacentFoes()) {
				if (foe.hasType('Steel')) {
					foe.clearBoosts();
					this.add('-clearboost', foe, '[from] ability: Neutral Polarity', '[of] ' + pokemon);
				}
			}
		},
		flags: {},
		name: "Neutral Polarity",
		shortDesc: "On switch-in, opposing Steel-types have their stat changes reset.",
	},
	toughbrains: {
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Tough Brains');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Tough Brains');
				return target.hp - 1;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Tough Brains');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit(target, source, move) {
			if (move?.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Tough Brains');
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Tough Brains', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Tough Brains",
		shortDesc: "Sturdy + Own Tempo",
	},
	allseeing: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: All-Seeing', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
		flags: {},
		name: "All-Seeing",
		shortDesc: "Frisk + No Guard",
	},
	tuffclaws: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {},
		name: "Tuff Claws",
		rating: 3,
		shortDesc: "This Pokemon's contact moves deal 1.2x damage.",
	},
	malfunction: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Malfunction only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					source.addVolatile('embargo');
					return;
				}
			}
		},
		flags: {},
		name: "Malfunction",
		shortDesc: "Foes that lower this Pokemon's stats lose the effects of their item until they switch out.",
	},
	sirocco: {
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				move.hasSheerForce = true;
			}
		}, // add life orb damaging immunity in scripts
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({atk: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Sirocco');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		flags: {breakable: 1},
		name: "Sirocco",
		shortDesc: "Sheer Force + Wind Rider",
	},
	sunbathe: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('sunnyday') || this.field.isWeather('desolateland')) {
				this.debug('sunbathe - enhancing accuracy');
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Sun Bathe",
		shortDesc: "In Sun, this Pokemon's Speed and Accuracy are doubled.",
	},
	combative: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Combative only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
					break;
				}
			}
			if (statsLowered) {
				this.boost({atk: 2}, target, target, null, false, true);
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
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Combative', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Combative', '[of] ' + source);
			}
		},
		flags: {},
		name: "Combative",
		shortDesc: "If a foe lowers this Pokemon's stats, this Pokemon steals its item and gains +2 Attack.",
	},
	eliminate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Eliminate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Eliminate", "[of] " + target);
				}
			}
		},
		flags: {breakable: 1},
		name: "Eliminate",
		shortDesc: "Effects of Intimidate and Hyper Cutter.",
	},
	oasislunch: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onEatItem(item, pokemon) {
			if (item.isBerry && pokemon.addVolatile('oasislunch')) {
				pokemon.volatiles['oasislunch'].berry = item;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['oasislunch'];
		},
		condition: {
			noCopy: true,
			duration: 2,
			onRestart() {
				this.effectState.duration = 2;
			},
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onEnd(pokemon) {
				if (pokemon.hp) {
					const item = this.effectState.berry;
					this.add('-activate', pokemon, 'ability: Oasis Lunch');
					this.add('-enditem', pokemon, item.name, '[eat]');
					if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
					}
					if (item.onEat) pokemon.ateBerry = true;
				}
			},
		},
		flags: {},
		name: "Oasis Lunch",
		shortDesc: "Cud Chew + Sand Rush",
	},
	fightingfury: {
		onFlinch(pokemon) {
			this.boost({atk: 1});
		},
		flags: {},
		name: "Fighting Fury",
		shortDesc: "If this Pokemon flinches, it gains +1 Attack.",
	},
	dominate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Dominate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
		flags: {},
		name: "Dominate",
		shortDesc: "Intimidate + No Guard",
	},
	nightsnack: {
		onEatItem(item, pokemon) {
			if (item.isBerry && pokemon.addVolatile('nightsnack')) {
				pokemon.volatiles['nightsnack'].berry = item;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['nightsnack'];
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Night Snack');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Night Snack');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Night Snack');
				return null;
			}
		},
		condition: {
			noCopy: true,
			duration: 2,
			onRestart() {
				this.effectState.duration = 2;
			},
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onEnd(pokemon) {
				if (pokemon.hp) {
					const item = this.effectState.berry;
					this.add('-activate', pokemon, 'ability: Night Snack');
					this.add('-enditem', pokemon, item.name, '[eat]');
					if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
					}
					if (item.onEat) pokemon.ateBerry = true;
				}
			},
		},
		flags: {breakable: 1},
		name: "Night Snack",
		shortDesc: "Cud Chew + Insomnia",
	},
	rustlerage: {
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move?.effectType === 'Move' && target.getMoveHitData(move).crit) {
				this.boost({atk: 12}, target, target);
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Rustle Rage", "[of] " + target);
				}
			}
		},
		flags: {breakable: 1},
		name: "Rustle Rage",
		shortDesc: "Effects of Anger Point and Hyper Cutter.",
	},
	obliterate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Obliterate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Obliterate",
		shortDesc: "Intimidate + Tough Claws",
	},
	leafcoat: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Leaf Coat');
			}
			return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Leaf Coat');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Leaf Coat",
		shortDesc: "This Pokemon is immune to status conditions, powder moves, weather damage, and Effect Spore.",
	},
	unfiltered: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Unfiltered boost');
				return this.chainModify([5461, 4096]);
			}
		},
		onChangeBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
		flags: {breakable: 1},
		name: "Unfiltered",
		shortDesc: "Stat raises lower stat instead and vice versa. Takes 4/3 damage from SE moves.",
	},
	clumpingup: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (this.boost({def: 2})) {
					this.heal(target.baseMaxhp / 4);
				} else if (!this.heal(target.baseMaxhp / 4)) {
					//Heal is attempted regardless of whether defense boost goes through
					//The message shows up if neither the defense boost nor the healing goes through
					this.add('-immune', target, '[from] ability: Clumping Up');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Clumping Up",
		shortDesc: "Water Compaction + Water Absorb",
	},
	dissolution: {
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number' && this.field.isWeather('raindance')) {
				this.debug('Dissolution - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "Dissolution",
		shortDesc: "If Rain is active, this Pokemon's evasiveness is 1.25x.",
	},
	hydrostaticpressure: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Hydrostatic Pressure');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['pulse']) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Hydrostatic Pressure",
		shortDesc: "Pressure + Mega Launcher",
	},
	germinate: {
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target) return;
			pokemon.addVolatile('germinate');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('germinate');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('germinate');
		},
		condition: {
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Grass') {
					this.debug('Germinate boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Grass') {
					this.debug('Germinate boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpe(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(2);
				}
			},
		},
		flags: {},
		name: "Germinate",
		shortDesc: "This Pokemon's Speed is doubled and its Grass moves deal 1.5x damage after losing its item.",
	},
	sacrifice: {
		onFaint(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'sacrifice');
		},
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					  const source = this.effectState.source;
					  const damage = this.heal(target.baseMaxhp / 4, target, target);
					  if (damage) this.add('-heal', target, target.getHealth, '[from] ability: Sacrifice', '[of] ' + this.effectState.source);
					  target.side.removeSlotCondition(target, 'sacrifice');
				 }
			},
	   },
		name: "Sacrifice",
		shortDesc: "When this Pokemon faints, the replacement is healed by 1/4 of its max HP.",
	},
	sunlitflight: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		// add levitate effects in scripts
		flags: {breakable: 1},
		name: "Sunlit Flight",
		shortDesc: "Levitate + Chlorophyll",
	},
	electricdust: {
		onModifySecondaries(secondaries) {
			this.debug('Electric Dust prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Electric Dust');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Electric Dust",
		shortDesc: "Shield Dust + Motor Drive",
	},
	vitalscales: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Vital Scales');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Vital Scales');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Vital Scales');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Vital Scales",
		shortDesc: "Ice Scales + Vital Spirit",
	},
	careless: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Careless boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Careless",
		shortDesc: "Reckless + Guts", // add guts burn drop immunity in scripts
	},
	lithoproof: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Lithoproof neutralize');
				return this.chainModify(0.75);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.flags['bullet']) {
				this.add('-immune', pokemon, '[from] ability: Lithoproof');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Lithoproof",
		shortDesc: "Solid Rock + Bulletproof",
	},
	shockhorror: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Shock Horror');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Shock Horror');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Shock Horror');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Shock Horror');
				}
				return this.effectState.target;
			}
		},
		flags: {breakable: 1},
		name: "Shock Horror",
		shortDesc: "Lightning Rod + Unnerve",
	},
	movemastery: {
		onModifyDamage(damage, source, target, move) {
			if (!move) return;
			const effectiveness = target.getMoveHitData(move).typeMod;
			if (effectiveness < 0) {
				this.debug('Move Mastery boost');
				return this.chainModify(2);
			} else if (effectiveness > 0) {
				this.debug('Move Mastery boost');
				return this.chainModify([5120, 4096]);
			}
		},
		flags: {},
		name: "Move Mastery",
		shortDesc: "This Pokemon's SE moves deal 1.25x damage, and its NvE moves deal 2x damage.",
	},
	itemlockdown: {
		onStart(source) {
			let activated = false;
			for (const pokemon of source.side.foe.active) {
				if (!activated) {
					this.add('-ability', source, 'Item Lockdown');
					this.add('-item', pokemon, pokemon.getItem().name, '[from] ability: Item Lockdown', '[of] ' + source, '[identify]');
				}
				activated = true;
				if (!pokemon.volatiles['embargo']) {
					pokemon.addVolatile('embargo');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectState.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['embargo']) {
					target.addVolatile('embargo');
				}
			}
		},
		onEnd(pokemon) {
			const source = this.effectState.target;
			for (const target of source.side.foe.active) {
				target.removeVolatile('embargo');
			}
		},
		name: "Item Lockdown",
		shortDesc: "Identifies the foe's items on switch-in. Foes can't use their items while this Pokemon is active.",
	},
	speedy: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length}, source);
			}
		},
		flags: {},
		name: "Speedy",
		shortDesc: "At the end of every turn and after KOing a foe, this Pokemon's Speed goes up by 1 stage.",
	},
	seamonster: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Sea Monster', 'boost');
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
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Sea Monster boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Sea Monster boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Sea Monster",
		shortDesc: "Intimidate + Torrent",
	},
	bladeedge: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Blade Edge boost');
				return this.chainModify(1.5);
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		flags: {},
		name: "Blade Edge",
		shortDesc: "Moxie + Sharpness",
	},
	armorconfidence: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Armor Confidence",
		shortDesc: "Moxie + Shell Armor",
	},
	joltspores: {
		onStart(source) {
			this.field.setTerrain('electricterrain');
		},
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('electricterrain');
		},
		flags: {},
		name: "Jolt Spores",
		shortDesc: "Sets Electric Terrain on switch-in or when hit by a move.",
	},
	respark: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Respark');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Respark');
				}
				return this.effectState.target;
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		flags: {breakable: 1},
		name: "Respark",
		shortDesc: "Regenerator + Lightning Rod",
	},
	friendlyprank: {
		onAnyModifyDamage(damage, source, target, move) {
			if (target !== this.effectState.target && target.isAlly(this.effectState.target)) {
				this.debug('Friendly Prank weaken');
				return this.chainModify(0.75);
			}
		},
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}
			if (((target !== this.effectState.target && target.isAlly(this.effectState.target)) || move.target === 'all')
				 && move.priority > 0.1 && move.pranksterBoosted) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Friendly Prank', move, '[of] ' + target);
				return false;
			}
		},
		flags: {breakable: 1},
		name: "Friendly Prank",
		shortDesc: "This Pokemon's allies take 0.75x damage from attacks and are immune to Prankster-boosted moves.",
	},
	berrydiet: {
		onEatItem(item, pokemon) {
			this.heal(pokemon.baseMaxhp / 3);
		},
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target) return;
			pokemon.addVolatile('berrydiet');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('berrydiet');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('berrydiet');
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(2);
				}
			},
		},
		flags: {},
		name: "Berry Diet",
		shortDesc: "Cheek Pouch + Unburden",
	},
	toxicologist: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Toxicologist boost');
				return this.chainModify(1.5);
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (!target.hasAbility('shielddust') && !target.hasItem('covertcloak')
				 	&& this.checkMoveMakesContact(move, target, source) && this.randomChance(3,10)) {
					target.trySetStatus('psn', source);
			}
		},
		flags: {},
		name: "Toxicologist",
		shortDesc: "Poison Touch + Technician",
	},
	inflame: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Inflame', 'boost');
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
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Inflame boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Inflame boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Inflame",
		shortDesc: "Blaze + Intimidate",
	},
	blazingpassion: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blazing Passion boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blazing Passion boost');
				return this.chainModify(1.5);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Blazing Passion boost');
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {},
		name: "Blazing Passion",
		shortDesc: "Reckless + Blaze",
	},
	revitalize: {
		onDamagingHit(damage, target, source, move) {
			if (!source.volatiles['disable'] && !move.flags['futuremove'] && move.id !== 'struggle' && !move.isMax && this.randomChance(3, 10)) {
				source.addVolatile('disable', this.effectState.target);
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		flags: {},
		name: "Revitalize",
		shortDesc: "Cursed Body + Regenerator",
	},
	growinggrass: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Growing Grass');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit(target, source, move) {
			if (move?.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Growing Grass');
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Growing Grass', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Growing Grass",
		shortDesc: "Own Tempo + Chlorophyll",
	},
	healthylunch: {
		onDamagingHit(damage, target, source, effect) {
			this.boost({def: 1});
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Healthy Lunch');
				}
			}
		},
		flags: {},
		name: "Healthy Lunch",
		shortDesc: "Stamina + Harvest",
	},
	innerpower: {
		onTryAddVolatile(status, target, source) {
			if (status.id === 'flinch') {
				this.add('-immune', target, '[from] ability: Inner Power');
				this.damage(source.baseMaxhp / 8, source, target);
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Power', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Inner Power",
		shortDesc: "This Pokemon can't be flinched and foes that attempt to flinch this Pokemon lose 1/8 of their max HP.",
	},
	friendlylooks: {
		onAnyModifyDamage(damage, source, target, move) {
			if (target !== this.effectState.target && target.isAlly(this.effectState.target)) {
				this.debug('Friendly Looks weaken');
				return this.chainModify(0.75);
			}
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('Friendly Looks - enhancing accuracy');
			return this.chainModify([5325, 4096]);
		},
		flags: {breakable: 1},
		name: "Friendly Looks",
		shortDesc: "Friend Guard + Compound Eyes",
	},
	freakyeyes: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Freaky Eyes');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Freaky Eyes');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('freakyeyes - enhancing accuracy');
			return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Freaky Eyes",
		shortDesc: "Compound Eyes + Unnerve",
	},
	dustybugs: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.secondaries && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Dusty Bugs boost');
				return this.chainModify(1.5);
			}
		},
		onModifySecondaries(secondaries) {
			this.debug('Dusty Bugs prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		flags: {breakable: 1},
		name: "Dusty Bugs",
		shortDesc: "At 1/3 or less of its max HP, 1.5x damage on moves with secondary effects. Immune to secondary effects.",
	},
	hydrophilic: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Hydrophilic');
				}
				return null;
			}
		},
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		flags: {breakable: 1},
		name: "Hydrophilic",
		shortDesc: "Water Absorb + Swift Swim",
	},
	desertshot: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Desert Shot boost');
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('sandstorm')) {
				this.debug('Desert Shot - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "Desert Shot",
		shortDesc: "Sand Veil + Sniper",
	},
	goowiththeflow: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Goo With The Flow');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit(target, source, move) {
			if (move?.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Goo With The Flow');
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.spe && boost.spe < 0) {
				delete boost.spe;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Speed", "[from] ability: Goo With The Flow", "[of] " + target);
				}
			}
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Goo With The Flow', '[of] ' + target);
			}
		},
		flags: {},
		name: "Goo With The Flow",
		shortDesc: "This Pokemon can't be confused or have its Speed lowered.",
	},
	murkywater: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Murky Water boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Murky Water boost');
				return this.chainModify(1.5);
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Murky Water flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
		flags: {},
		name: "Murky Water",
		shortDesc: "Torrent + Stench",
	},
	dawnriser: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		}, // implement this is conditions.ts
		flags: {},
		name: "Dawn Riser",
		shortDesc: "Chlorophyll + Early Bird",
	},
	keenswim: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Keen Swim", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		flags: {breakable: 1},
		name: "Keen Swim",
		shortDesc: "Keen Eye + Swift Swim",
	},
	overguts: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overguts boost');
				return this.chainModify(1.5);
			}			
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		}, // implement burn drop ignore in scripts.ts
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overguts boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Overguts",
		shortDesc: "Guts + Overgrow",
	},
	bulletveil: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('sandstorm')) {
				this.debug('Bullet Veil - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.flags['bullet']) {
				this.add('-immune', pokemon, '[from] ability: Bullet Veil');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Bullet Veil",
		shortDesc: "Sand Veil + Bulletproof",
	},
	greenthumbs: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Green Thumbs boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Green Thumbs boost');
				return this.chainModify(1.5);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.hp && pokemon.status && this.randomChance(33, 100)) {
				this.debug('shed skin');
				this.add('-activate', pokemon, 'ability: Green Thumbs');
				pokemon.cureStatus();
			}
		},
		flags: {},
		name: "Green Thumbs",
		shortDesc: "Shed Skin + Overgrow",
	},
	weatherpreview: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.add('-ability', pokemon, 'Weather Preview');
						return;
					}
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather(['hail', 'snow'])) {
				this.debug('Weather Preview - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "Weather Preview",
		shortDesc: "Snow Cloak + Anticipation",
	},
	snowlayers: {
		onStart(source) {
			this.field.setWeather('snow');
		},
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				if (stab === 2) {
					return 2.25;
				}
				return 2;
			}
		},
		flags: {},
		name: "Snow Layers",
		shortDesc: "Snow Warning + Adaptability",
	},
	visuallearner: {
		onStart(pokemon) {
			if (pokemon.adjacentFoes().some(foeActive => foeActive.ability === 'noability')) {
				this.effectState.gaveUp = true;
			}
			if (pokemon.hasItem('Ability Shield')) {
				this.add('-block', pokemon, 'item: Ability Shield');
				this.effectState.gaveUp = true;
			}
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Visual Learner', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp) return;
			const possibleTargets = pokemon.adjacentFoes().filter(
				target => !target.getAbility().flags['notrace'] && target.ability !== 'noability'
			);
			if (!possibleTargets.length) return;
			const target = this.sample(possibleTargets);
			const ability = target.getAbility();
			if (pokemon.setAbility(ability)) {
				this.add('-ability', pokemon, ability, '[from] ability: Visual Learner', '[of] ' + target);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		name: "Visual Learner",
		shortDesc: "Trace + Frisk",
	},
	sunaway: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Sun Away",
		shortDesc: "If Sunny Day is active, this Pokemon's Speed is doubled.",
	},
	durianbreath: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Durian Breath flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
		flags: {},
		name: "Durian Breath",
		shortDesc: "Stench + Chlorophyll",
	},
	fastflame: {
		onFlinch(damage, target, source, move) {
			this.boost({spe: 2}, target, target);
			source.trySetStatus('brn', target);
		},
		flags: {},
		name: "Fast Flame",
		shortDesc: "If this Pokemon flinches, its Speed is raised by 1 stage and the attacker is burned.",
	},
	bravelook: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Brave Look', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Brave Look", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: {breakable: 1},
		name: "Brave Look",
		shortDesc: "Intimidate + Keen Eye",
	},
	longmoxie: {
		onModifyMove(move) {
			delete move.flags['contact'];
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		flags: {},
		name: "Long Moxie",
		shortDesc: "Long Reach + Moxie",
	},
	speedyfire: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('speedyfire')) {
					this.add('-immune', target, '[from] ability: Speedy Fire');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('speedyfire');
		},
		condition: {
			noCopy: true, 
			onStart(target) {
				this.add('-start', target, 'ability: Speedy Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('speedyfire')) {
					this.debug('Speedy Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('speedyfire')) {
					this.debug('Speedy Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Speedy Fire', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Speedy Fire",
		shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
	},
	ghoulfire: {
		onTryHit(target, source, move) {
			if (target !== source && ['Bug', 'Dark', 'Fire', 'Ghost'].includes(move.type)) {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Ghoul Fire');
				}
				return null;
			}
		},
		onAfterBoost(boost, target, source, effect) {
			if (['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
				this.boost({spe: 1});
			}
		},
		flags: {breakable: 1},
		name: "Ghoul Fire",
		shortDesc: "Speed is raised 1 stage if hit by a Bug-, Dark-, Fire- or Ghost-type move; Immunity to those types.",
	},
	rekindle: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('rekindle')) {
					this.add('-immune', target, '[from] ability: Rekindle');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('rekindle');
		},
		condition: {
			noCopy: true, 
			onStart(target) {
				this.add('-start', target, 'ability: Rekindle');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('rekindle')) {
					this.debug('Rekindle boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('rekindle')) {
					this.debug('Rekindle boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Rekindle', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Rekindle",
		shortDesc: "Regenerator + Flash Fire",
	},
	roughbody: {
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
				this.add("-fail", target, "unboost", "[from] ability: Rough Body", "[of] " + target);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Rough Body Atk weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Rough Body SpA weaken');
				return this.chainModify(0.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return damage / 2;
			}
		},
		flags: {breakable: 1},
		name: "Rough Body",
		shortDesc: "Clear Body + Heatproof",
	},
	aromatricks: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Aroma Tricks', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Aroma Tricks');
				return false;
			}
		},
		flags: {breakable: 1},
		name: "Aroma Tricks",
		shortDesc: "Protects allies from losing their items, as well as Attract, Taunt, Disable, Encore, Torment, and Heal Block.",
	},
	hungryeyes: {
		onStart(pokemon) { // implement gluttony effects in items
			pokemon.abilityState.gluttony = true;
		},
		onDamage(item, pokemon) {
			pokemon.abilityState.gluttony = true;
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Hungry Eyes", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: {breakable: 1},
		name: "Hungry Eyes",
		shortDesc: "Gluttony + Keen Eye",
	},
	innerfat: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Inner Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Inner Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Fat', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Inner Fat",
		shortDesc: "Inner Focus + Thick Fat",
	},
	cutefruit: {
		onTryHeal(damage, target, source, effect) {
			if (!effect) return;
			if (effect.name === 'Berry Juice' || effect.name === 'Leftovers') {
				this.add('-activate', target, 'ability: Cute Fruit');
			}
			if ((effect as Item).isBerry) return this.chainModify(2);
		},
		onChangeBoost(boost, target, source, effect) {
			if (effect && (effect as Item).isBerry) {
				let b: BoostID;
				for (b in boost) {
					boost[b]! *= 2;
				}
			}
		},
		onSourceModifyDamagePriority: -1,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.abilityState.berryWeaken) {
				target.abilityState.berryWeaken = false;
				return this.chainModify(0.5);
			}
		},
		onTryEatItemPriority: -1,
		onTryEatItem(item, pokemon) {
			this.add('-activate', pokemon, 'ability: Cute Fruit');
		},
		onEatItem(item, pokemon) {
			const weakenBerries = [
				'Babiri Berry', 'Charti Berry', 'Chilan Berry', 'Chople Berry', 'Coba Berry', 'Colbur Berry', 'Haban Berry', 'Kasib Berry', 'Kebia Berry', 'Occa Berry', 'Passho Berry', 'Payapa Berry', 'Rindo Berry', 'Roseli Berry', 'Shuca Berry', 'Tanga Berry', 'Wacan Berry', 'Yache Berry',
			];
			pokemon.abilityState.berryWeaken = weakenBerries.includes(item.name);
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && this.randomChance(3, 10)) {
				source.addVolatile('attract', this.effectState.target);
			}
		},
		flags: {},
		name: "Cute Fruit",
		shortDesc: "Ripen + Cute Charm",
	},
	lunchwithfriends: {
		onStart(pokemon) { // implement gluttony effects in items
			pokemon.abilityState.gluttony = true;
		},
		onDamage(item, pokemon) {
			pokemon.abilityState.gluttony = true;
		},
		onAnyModifyDamage(damage, source, target, move) {
			if (target !== this.effectState.target && target.isAlly(this.effectState.target)) {
				this.debug('Lunch With Friends weaken');
				return this.chainModify(0.75);
			}
		},
		flags: {breakable: 1},
		name: "Lunch With Friends",
		shortDesc: "Gluttony + Friend Guard",
	},
	irondiet: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem(pokemon) {
			const target = pokemon.isAdjacent(this.effectState.target);
			if (target.hasType('Steel')) {
				return !this.effectState.unnerved;
			}
		},
		flags: {},
		name: "Iron Diet",
		shortDesc: "Prevents opposing Steel-type Pokemon from eating berries.",
	},
	unfriendguard: {
		onAnyModifyDamage(damage, source, target, move) {
			if (target !== this.effectState.target && target.isAlly(this.effectState.target)) {
				this.debug('Unfriend Guard weaken');
				return this.chainModify(0.75);
			}
		},
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
		flags: {breakable: 1},
		name: "Unfriend Guard",
		shortDesc: "Friend Guard + No Guard",
	},
	sheerbird: {
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		// implement early bird effects in conditions
		flags: {},
		name: "Sheer Bird",
		shortDesc: "Sheer Force + Early Bird",
	},
	robin: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.modify(atk, 1.5);
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Physical' && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (move && target && source.switchFlag !== true && target !== source && move.category === 'Physical') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id;
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Robin', '[of] ' + target);
			}
		},
		flags: {},
		name: "Robin",
		shortDesc: "This Pokemon's physical attacks deal 1.5x damage and steal items, but have 0.8x accuracy.",
	},
	quickstart: {
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are doubled for 5 turns.",
		onStart(pokemon) {
			pokemon.addVolatile('quickstart');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quickstart'];
			this.add('-end', pokemon, 'Quickstart', '[silent]');
		},
		condition: {
			duration: 5,
			onStart(target) {
				this.add('-start', target, 'ability: Quickstart');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(target) {
				this.add('-end', target, 'Quickstart');
			},
		},
		flags: {},
		name: "Quickstart",
    },
	summerbugs: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && ['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.debug('Summer Bugs boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && ['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.debug('Summer Bugs boost');
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Summer Bugs",
		shortDesc: "In Sun, this Pokemon's Speed is doubled and its Bug moves deal 2x damage.",
	},
	solarpanel: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && move.category === 'Special') {
				this.debug('Solar Panel boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Solar Panel",
		shortDesc: "Battery + Chlorophyll",
	},
	staticdust: {
		onModifySecondaries(secondaries) {
			this.debug('Static Dust prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && this.randomChance(3, 10)) {
				source.trySetStatus('par', target);
			}
		},
		flags: {breakable: 1},
		name: "Static Dust",
		shortDesc: "Shield Dust + Static",
	},
	gangly: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Gangly boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.item) return;
			const pickupTargets = this.getAllActive().filter(target => (
				target.lastItem && target.usedItemThisTurn && pokemon.isAdjacent(target)
			));
			if (!pickupTargets.length) return;
			const randomTarget = this.sample(pickupTargets);
			const item = randomTarget.lastItem;
			randomTarget.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] ability: Gangly');
			pokemon.setItem(item);
		},
		flags: {},
		name: "Gangly",
		shortDesc: "Reckless + Pickup",
	},
	zappysap: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Zappy Sap');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Zappy Sap');
				}
				return this.effectState.target;
			}
		},
		flags: {breakable: 1},
		name: "Zappy Sap",
		shortDesc: "This Pokemon draws Electric moves to itself to raise Sp. Atk by 1; Electric immunity.",
	},
	rockfeet: {
		onModifySpe(spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		flags: {},
		name: "Rock Feet",
		shortDesc: "Quick Feet + Rock Head",
	},
	rivalgroup: {
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, attacker, defender, move) {
			if (typeof accuracy !== 'number') return;
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('rivalgroup - enhancing accuracy');
					return this.chainModify([5325, 4096]);
				} else {
					this.debug('rivalgroup - decreasing accuracy');
					return this.chainModify([2867, 4096]);
				}
			}
		},
		flags: {},
		name: "Rival Group",
		shortDesc: "This Pokemon's moves have 1.3x accuracy on same gendered targets, 0.7x on opposite gendered.",
	},
	hitandrun: {
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon, target, move) {
			if (move?.category === 'Status') {
				this.add('cant', pokemon, 'ability: Hit and Run');
				return false;
			}
		},
		flags: {},
		name: "Hit and Run",
		shortDesc: "This Pokemon's status moves have no competitive use.",
	},
	picktempo: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Pick Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit(target, source, move) {
			if (move?.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Pick Tempo');
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && move?.flags['contact']) {
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
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Pick Tempo', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Pick Tempo', '[of] ' + source);
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && ['Intimidate', 'Underestimate', 'Migrate', 'Incorporate', 'Hunger Fate', 'Eliminate', 'Dominate', 'Obliterate',
				  'Sea Monster', 'Inflame', 'Brave Look'].includes(effect.name)) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Pick Tempo', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Pick Tempo",
		shortDesc: "Own Tempo + Pickpocket",
	},
	moreburdens: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.item) return;
			const pickupTargets = this.getAllActive().filter(target => (
				target.lastItem && target.usedItemThisTurn && pokemon.isAdjacent(target)
			));
			if (!pickupTargets.length) return;
			const randomTarget = this.sample(pickupTargets);
			const item = randomTarget.lastItem;
			randomTarget.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] ability: More Burdens');
			pokemon.setItem(item);
		},
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target) return;
			pokemon.addVolatile('moreburdens');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('moreburdens');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('moreburdens');
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(2);
				}
			},
		},
		flags: {},
		name: "More Burdens",
		shortDesc: "Pickup + Unburden",
	},
	fatcat: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Fat Cat boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Fat Cat boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Fat Cat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Fat Cat weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Fat Cat",
		shortDesc: "Thick Fat + Blaze",
	},
	poisonivy: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Poison Ivy boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Poison Ivy boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Poison Ivy",
		shortDesc: "Overgrow + Corrosion",
	},
	offscale: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const toxicSpikes = side.sideConditions['toxicspikes'];
			if (move.category === 'Physical' && (!toxicSpikes || toxicSpikes.layers < 2)) {
				this.add('-activate', target, 'ability: Off-Scale');
				side.addSideCondition('toxicspikes', target);
			}
		},
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target) return;
			pokemon.addVolatile('offscale');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('offscale');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('offscale');
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(2);
				}
			},
		},
		flags: {},
		name: "Off-Scale",
		shortDesc: "Unburden + Toxic Debris",
	},
	litnitwit: {
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
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('litnitwit')) {
					this.add('-immune', target, '[from] ability: Litnitwit');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('litnitwit');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Litnitwit');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('litnitwit')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('litnitwit')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Litnitwit', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Litnitwit",
		shortDesc: "Unaware + Flash Fire",
	},
	boilingspot: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if ((move.type === 'Water' || move.type === 'Fire') && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Boiling Spot boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if ((move.type === 'Water' || move.type === 'Fire') && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Boiling Spot boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Boiling Spot",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Water & Fire attacks.",
	},
	juicyaim: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Juicy Aim boost');
				return this.chainModify(1.5);
			}
		},
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Juicy Aim');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Juicy Aim');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		flags: {},
		name: "Juicy Aim",
		shortDesc: "Sniper + Unnerve",
	},
	windenergy: {
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Electric' || move.flags['wind'])) {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Wind Energy');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({spa: 1}, pokemon, pokemon);
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Wind Energy');
				}
				return this.effectState.target;
			}
		},
		flags: {breakable: 1},
		name: "Wind Energy",
		shortDesc: "Raises the user's SpA by 1 stage when hit by Electric or wind, or when Tailwind begins; Wind & Electric immunity. Redirects Electric.",
	},
	polarity: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Polarity only affects stats lowered by foes.", true, source.side);
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
		flags: {},
		name: "Polarity",
		shortDesc: "Competitive + Static",
	},
	teapartyhost: {
		onStart(pokemon) {
			this.add('-message', `${pokemon.name} is hosting a tea party for its side!`);
			for (const ally of pokemon.adjacentAllies()) {
				this.heal(ally.baseMaxhp / 4, ally, pokemon);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				if (allyActive.status && this.randomChance(3, 10)) {
					this.add('-activate', pokemon, 'ability: Tea Party Host');
					allyActive.cureStatus();
				}
			}
		},
		flags: {},
		name: "Tea Party Host",
		shortDesc: "Hospitality + Healer",
	},
	summerheat: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Summer Heat Atk weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Summer Heat SpA weaken');
				return this.chainModify(0.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return damage / 2;
			}
		},
		flags: {breakable: 1},
		name: "Summer Heat",
		shortDesc: "Heatproof + Chlorophyll",
	},
	phalacrocoracimorphosis: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.isSemiInvulnerable()) return;
			if (['bellicramgulping', 'bellicramgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'bellicramgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('bellicram', move);
				target.addVolatile('charge');
			}
		},
		onSourceTryPrimaryHit(target, source, move) {
			if (move.type === 'Electric' && source.hasAbility('phalacrocoracimorphosis') && source.species.name === 'Bellicram') {
				const forme = source.hp <= source.maxhp / 2 ? 'bellicramgorging' : 'bellicramgulping';
				source.formeChange(forme, move);
			}
		},
		flags: {cantsuppress: 1, notransform: 1},
		name: "Phalacrocoracimorphosis",
		shortDesc: "When hit after Electric move, attacker loses 1/4 max HP and -1 Def/Para, defender is charged.",
	},
	protodyschronometria: {
	  shortDesc: "This Pokemon ignores other Pokemon's Paradox boosters when taking or doing damage.",
		onAnyModifyAtkPriority: 4,
		onAnyModifyAtk(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (attacker.isAlly(abilityHolder) || attacker.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['protopyre', 'protoneuron', 'prototoxin', 'protolithos', 'protoavian',
											'protorefraction', 'protosynthesis', 'quarkdrive', 'jellyfilleddrive',
											'winddrive', 'heavydrive', 'jadedrive', 'airdrive', 'magicdrive', 'phantomdrive']) {
					if (attacker.hasAbility(paradox)) {
						if (attacker?.volatiles[paradox]?.bestStat !== 'atk') return;
						this.debug('Protodyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onAnyModifyDefPriority: 5,
		onAnyModifyDef(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (defender.isAlly(abilityHolder) || defender.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['protopyre', 'protoneuron', 'prototoxin', 'protolithos', 'protoavian',
											'protorefraction', 'protosynthesis', 'quarkdrive', 'jellyfilleddrive',
											'winddrive', 'heavydrive', 'jadedrive', 'airdrive', 'magicdrive', 'phantomdrive']) {
					if (defender.hasAbility(paradox)) {
						if (defender?.volatiles[paradox]?.bestStat !== 'def') return;
						this.debug('Protodyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onAnyModifySpAPriority: 4,
		onAnyModifySpA(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (attacker.isAlly(abilityHolder) || attacker.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['protopyre', 'protoneuron', 'prototoxin', 'protolithos', 'protoavian',
											'protorefraction', 'protosynthesis', 'quarkdrive', 'jellyfilleddrive',
											'winddrive', 'heavydrive', 'jadedrive', 'airdrive', 'magicdrive', 'phantomdrive']) {
					if (attacker.hasAbility(paradox)) {
						if (attacker?.volatiles[paradox]?.bestStat !== 'spa') return;
						this.debug('Protodyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onAnyModifySpDPriority: 5,
		onAnyModifySpD(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (defender.isAlly(abilityHolder) || defender.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['protopyre', 'protoneuron', 'prototoxin', 'protolithos', 'protoavian',
											'protorefraction', 'protosynthesis', 'quarkdrive', 'jellyfilleddrive',
											'winddrive', 'heavydrive', 'jadedrive', 'airdrive', 'magicdrive', 'phantomdrive']) {
					if (defender.hasAbility(paradox)) {
						if (defender?.volatiles[paradox]?.bestStat !== 'spd') return;
						this.debug('Protodyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Protodyschronometria');
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Protodyschronometria",
		rating: 3,
	},
	protopyre: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protopyre');
			} else if (!pokemon.volatiles['protopyre']?.fromBooster) {
				pokemon.removeVolatile('protopyre');
			}
		},
		onUpdate(pokemon) {
			if ((pokemon.hp <= pokemon.maxhp / 3)) {
				pokemon.addVolatile('protopyre');
			} else if (!pokemon.volatiles['protopyre']?.fromBooster) {
				pokemon.removeVolatile('protopyre');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protopyre'];
			this.add('-end', pokemon, 'Protopyre', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protopyre', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protopyre');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Protopyre",
		shortDesc: "Sunny Day active, Booster Energy used or HP drops below 1/3 max HP: highest stat is 1.3x, or 1.5x if Speed.",
	},
	protoneuron: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protoneuron');
			} else if (!pokemon.volatiles['protoneuron']?.fromBooster) {
				pokemon.removeVolatile('protoneuron');
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && target.isAlly(source) && move.category !== 'Status') {
				this.add('-activate', target, 'ability: Protoneuron');
				return null;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protoneuron'];
			this.add('-end', pokemon, 'Protoneuron', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protoneuron', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protoneuron');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protoneuron atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protoneuron def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protoneuron spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protoneuron spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protoneuron spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, breakable: 1},
		name: "Protoneuron",
		shortDesc: "Protosynthesis + Telepathy",
	},
	prototoxin: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('prototoxin');
			} else if (!pokemon.volatiles['prototoxin']?.fromBooster && pokemon.status !== 'psn' && pokemon.status !== 'tox') {
				pokemon.removeVolatile('prototoxin');
			}
		},
		onUpdate(pokemon) {
			if (((pokemon.status === 'psn' || pokemon.status === 'tox'))) {
				pokemon.addVolatile('prototoxin');
			} /*else if (!pokemon.volatiles['prototoxin']?.fromBooster) {
				pokemon.removeVolatile('prototoxin');
			}*/
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['prototoxin'];
			this.add('-end', pokemon, 'Prototoxin', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Prototoxin', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Prototoxin');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Prototoxin atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Prototoxin def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Prototoxin spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Prototoxin spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Prototoxin spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Prototoxin",
		shortDesc: "Protosynthesis + Poison Heal. Gains Paradox boost when poisoned.",
	},
	protolithos: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protolithos');
			} else if (!pokemon.volatiles['protolithos']?.fromBooster) {
				pokemon.removeVolatile('protolithos');
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
				this.add("-fail", target, "unboost", "[from] ability: Protolithos", "[of] " + target);
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protolithos'];
			this.add('-end', pokemon, 'Protolithos', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protolithos', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protolithos');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protolithos atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protolithos def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protolithos spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protolithos spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protolithos spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, breakable: 1},
		name: "Protolithos",
		shortDesc: "Protosynthesis + Clear Body",
	},
	protoavian: {
		onStart(pokemon) {
			this.effectState.bestStat = pokemon.getBestStat(true, true);
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			const bestStat = (this.effectState.bestStat ||= target.getBestStat(true, true));
			if (boost[bestStat] && boost[bestStat]! < 0) {
				delete boost[bestStat];
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", bestStat, "[from] ability: Protoavian", "[of] " + target);
				}
			}
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protoavian');
			} else if (!pokemon.volatiles['protoavian']?.fromBooster) {
				pokemon.removeVolatile('protoavian');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protoavian'];
			this.add('-end', pokemon, 'Protoavian', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protoavian', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protoavian');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protoavian atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protoavian def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protoavian spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protoavian spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protoavian spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, breakable: 1},
		name: "Protoavian",
		shortDesc: "Highest stat can't be dropped by foe. Sunny Day or Booster Energy: highest stat is 1.3x, or 1.5x if Spe.",
	},
	protorefraction: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protorefraction');
			} else if (!pokemon.volatiles['protorefraction']?.fromBooster) {
				pokemon.removeVolatile('protorefraction');
			}
		},
		onTryBoost(boost, target, source, effect) {
			// Don't bounce self stat changes, or boosts that have already bounced
			if (!source || target === source || !boost || effect.name === 'Mirror Armor' || effect.name === 'Protorefraction') return;
			let b: BoostID;
			for (b in boost) {
				if (boost[b]! < 0) {
					if (target.boosts[b] === -6) continue;
					const negativeBoost: SparseBoostsTable = {};
					negativeBoost[b] = boost[b];
					delete boost[b];
					if (source.hp) {
						this.add('-ability', target, 'Protorefraction');
						this.boost(negativeBoost, source, target, null, true);
					}
				}
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protorefraction'];
			this.add('-end', pokemon, 'Protorefraction', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protorefraction', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protorefraction');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protorefraction atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protorefraction def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protorefraction spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protorefraction spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protorefraction spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, breakable: 1},
		name: "Protorefraction",
		shortDesc: "Protosynthesis + Mirror Armor",
	},
	jellyfilleddrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('jellyfilleddrive');
			} else if (!pokemon.volatiles['jellyfilleddrive']?.fromBooster) {
				pokemon.removeVolatile('jellyfilleddrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['jellyfilleddrive'];
			this.add('-end', pokemon, 'Jelly-Filled Drive', '[silent]');
		},
		onUpdate(pokemon) {
			if (this.gameType !== 'doubles') return;
			const ally = pokemon.allies()[0];
			if (!ally || pokemon.baseSpecies.baseSpecies !== 'Iron Onigiri' || ally.baseSpecies.baseSpecies !== 'Great Dozo') {
				// Handle any edge cases
				if (pokemon.getVolatile('commanding')) pokemon.removeVolatile('commanding');
				return;
			}
			if (!pokemon.getVolatile('commanding')) {
				// If Great Dozo already was commanded this fails
				if (ally.getVolatile('commanded')) return;
				// Cancel all actions this turn for pokemon if applicable
				this.queue.cancelAction(pokemon);
				// Add volatiles to both pokemon
				this.add('-activate', pokemon, 'ability: Jelly-Filled Drive', '[of] ' + ally);
				pokemon.addVolatile('commanding');
				ally.addVolatile('commanded', pokemon);
				if (pokemon.species.name === 'Iron Onigiri-Droopy') {
					ally.addVolatile('droopyboost', pokemon);
				} else if (pokemon.species.name === 'Iron Onigiri-Stretchy') {
					ally.addVolatile('stretchyboost', pokemon);
				} else {
					ally.addVolatile('curlyboost', pokemon);
				}
				// Continued in conditions.ts in the volatiles
			} else {
				if (!ally.fainted) return;
				pokemon.removeVolatile('commanding');
			}
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Jelly-Filled Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Jelly-Filled Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Jelly-Filled Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Jelly-Filled Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Jelly-Filled Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Jelly-Filled Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Jelly-Filled Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Jelly-Filled Drive",
		shortDesc: "Quark Drive + Commander. Gives Great Dozo a Paradox boost based on Iron Onigiri form.",
	},
	winddrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
			if (pokemon.side.sideConditions['tailwind']) {
				pokemon.addVolatile('winddrive');
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('winddrive');
			} else if (!pokemon.volatiles['winddrive']?.fromBooster) {
				pokemon.removeVolatile('winddrive');
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!target.addVolatile('winddrive')) {
					this.add('-immune', target, '[from] ability: Wind Drive');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				pokemon.addVolatile('winddrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['winddrive'];
			this.add('-end', pokemon, 'Wind Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Wind Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Wind Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Wind Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Wind Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Wind Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Wind Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Wind Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, breakable: 1},
		name: "Wind Drive",
		shortDesc: "Electric Terrain active, Booster Energy used, hit by a wind move, or Tailwind begins: highest stat is 1.3x, or 1.5x if Speed. Wind move immunity.",
	},
	heavydrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('heavydrive');
			} else if (!pokemon.volatiles['heavydrive']?.fromBooster) {
				pokemon.removeVolatile('heavydrive');
			}
		},
		onModifyWeightPriority: 1,
		onModifyWeight(weighthg) {
			return weighthg * 2;
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['heavydrive'];
			this.add('-end', pokemon, 'Heavy Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Heavy Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Heavy Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Heavy Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Heavy Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Heavy Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Heavy Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Heavy Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, breakable: 1},
		name: "Heavy Drive",
		shortDesc: "Quark Drive + Heavy Metal",
	},
	jadedrive: {
		onStart(pokemon) {
			this.effectState.bestStat = pokemon.getBestStat(true, true);
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			const bestStat = (this.effectState.bestStat ||= target.getBestStat(true, true));
			if (boost[bestStat] && boost[bestStat]! < 0) {
				delete boost[bestStat];
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", bestStat, "[from] ability: Jade Drive", "[of] " + target);
				}
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('jadedrive');
			} else if (!pokemon.volatiles['jadedrive']?.fromBooster) {
				pokemon.removeVolatile('jadedrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['jadedrive'];
			this.add('-end', pokemon, 'Jade Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Jade Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Jade Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Jade Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Jade Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Jade Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Jade Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Jade Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, breakable: 1},
		name: "Jade Drive",
		shortDesc: "Highest stat can't be dropped by foe. Electric Terrain or Booster Energy: highest stat is 1.3x, or 1.5x if Spe.",
	},
	airdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('airdrive');
			} else if (!pokemon.volatiles['airdrive']?.fromBooster) {
				pokemon.removeVolatile('airdrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['airdrive'];
			this.add('-end', pokemon, 'Air Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Air Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Air Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Air Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Air Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Air Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Air Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Air Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Air Drive",
		shortDesc: "Quark Drive + Levitate",
	},
	magicdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('magicdrive');
			} else if (!pokemon.volatiles['magicdrive']?.fromBooster) {
				pokemon.removeVolatile('magicdrive');
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target || source.switchFlag === true) return;
			if (target !== source && move.category !== 'Status') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Magic Drive', '[of] ' + target);
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['magicdrive'];
			this.add('-end', pokemon, 'Magic Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Light Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Light Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Magic Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Magic Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Magic Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Magic Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Magic Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Magic Drive",
		shortDesc: "Quark Drive + Magician",
	},
	phantomdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('phantomdrive');
			} else if (!pokemon.volatiles['phantomdrive']?.fromBooster) {
				pokemon.removeVolatile('phantomdrive');
			}
		},
		onModifyMove(move) {
			delete move.flags['contact'];
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['phantomdrive'];
			this.add('-end', pokemon, 'Phantom Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Light Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Light Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Phantom Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Phantom Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Phantom Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Phantom Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Phantom Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Phantom Drive",
		shortDesc: "Quark Drive + Long Reach",
	},
};
