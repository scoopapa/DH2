export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	asonetorkoal: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Speed Boost and Drought!');
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'groudon') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('sunnyday');
		},
		name: "As One (Torkoal)",
		shortDesc: "The combination of Drought and Speed Boost.",
	},
	asonetentacruel: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Drizzle and Rain Dish!');
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
		name: "As One (Tentacruel)",
		shortDesc: "The combination of Drizzle and Rain Dish.",
	},
	asonegigalith: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Sand Stream and Sand Force!');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		name: "As One (Gigalith)",
		shortDesc: "The combination of Sand Stream and Sand Force.",
	},
	asonebeartic: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Snow Warning and Slush Rush!');
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(2);
			}
		},
		onStart(source) {
			this.field.setWeather('hail');
		},
		name: "As One (Beartic)",
		shortDesc: "The combination of Snow Warning and Slush Rush.",
	},
	asonelanturn: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Compound Eyes and Volt Absorb!');
		},
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('compoundeyes - enhancing accuracy');
			return accuracy * 1.3;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: As One (Lanturn)');
				}
				return null;
			}
		},
		name: "As One (Lanturn)",
		shortDesc: "The combination of Compound Eyes and Volt Absorb.",
	},
	asonehawlucha: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Cheek Pouch and Unburden!');
		},
		onEatItem(item, pokemon) {
			this.heal(pokemon.baseMaxhp / 3);
		},
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectData.target) return;
			pokemon.addVolatile('unburden');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('unburden');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('unburden');
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(2);
				}
			},
		},
		name: "As One (Hawlucha)",
		shortDesc: "The combination of Cheek Pouch and Unburden.",
	},
	asonestakataka: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Gluttony');
			this.add( '-message', 'Gluttony and Beast Boost!');
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		name: "As One (Stakataka)",
		shortDesc: "The combination of Gluttony and Beast Boost.",
	},
	asonetorterra: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Thick Fat and Overgrow!');
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onCriticalHit: false,
		name: "As One (Torterra)",
		shortDesc: "The combination of Thick Fat and Overgrow.",
	},
	asonemudsdale: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Huge Power and Stamina!');
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(2);
		},
		onDamagingHit(damage, target, source, effect) {
			this.boost({def: 1});
		},
		name: "As One (Mudsdale)",
		shortDesc: "The combination of Huge Power and Stamina.",
	},
	asonerapidashgalar: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Scrappy and Pastel Veil!');
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Scrappy');
			}
		},
		onStart(pokemon) {
			for (const ally of pokemon.allies()) {
				if (['psn', 'tox'].includes(ally.status)) {
					this.add('-activate', pokemon, 'ability: Pastel Veil');
					ally.cureStatus();
				}
			}
		},
		onUpdate(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onAllySwitchIn(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', this.effectData.target, 'ability: Pastel Veil');
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
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
		name: "As One (Rapidash-Galar)",
		shortDesc: "The combination of Scrappy and Pastel Veil.",
	},
	asoneheracross: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Protein and Moxie!');
		},
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		name: "As One (Heracross)",
		shortDesc: "The combination of Protean and Moxie.",
	},
	asonedrifblim: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Flash Fire and Unburden!');
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('flashfire')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('flashfire')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectData.target) return;
			pokemon.addVolatile('unburden');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('unburden');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('unburden');
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(2);
				}
			},
		},
		name: "As One (Drifblim)",
		shortDesc: "The combination of Flash Fire and Unburden.",
	},
	asoneexeggutoralola: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Iron Fist and Frisk!');
		},
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Frisk', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "As One (Exeggutor-Alola)",
		shortDesc: "The combination of Iron Fist and Frisk.",
	},
	asonesteelix: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Shield Dust and Sheer Force!');
		},
		onModifySecondaries(secondaries) {
			this.debug('Shield Dust prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
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
			if (move.hasSheerForce) return this.chainModify([0x14CD, 0x1000]);
		},
		name: "As One (Steelix)",
		shortDesc: "The combination of Shield Dust and Sheer Force.",
	},
	asonemagnezone: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Synchronize and Analytic!');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Analytic boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (effect && effect.id === 'toxicspikes') return;
			if (status.id === 'slp' || status.id === 'frz') return;
			this.add('-activate', target, 'ability: Synchronize');
			// Hack to make status-prevention abilities think Synchronize is a status move
			// and show messages when activating against it.
			source.trySetStatus(status, target, {status: status.id, id: 'synchronize'} as Effect);
		},
		name: "As One (Magnezone)",
		shortDesc: "The combination of Synchronize and Analytic.",
	},
	asoneabsol: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Prankster and Justified!');
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				this.boost({atk: 1});
			}
		},
		name: "As One (Absol)",
		shortDesc: "The combination of Prankster and Justified.",
	},
	asonesalazzle: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Merciless and Corrosion!');
		},
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) return 5;
		},
		name: "As One (Salazzle)",
		shortDesc: "The combination of Merciless and Corrosion.",
	},
	asonehippowdon: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Grassy Surge and Sand Force!');
		},
		onStart(source) {
			this.field.setTerrain('grassyterrain');
		},
        onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "As One (Hippowdon)",
		shortDesc: "The combination of Grassy Surge and Sand Force.",
	},
   asonetapufini: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Thick Fat and Misty Surge!');
		},
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
        onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		name: "As One (Tapu Fini)",
		shortDesc: "The combination of Thick Fat and Misty Surge.",
	},
   asonesliggoo: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Electric Surge and Gooey!');
		},
		onStart(source) {
			this.field.setTerrain('electricterrain');
		},
        onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.add('-ability', target, 'Gooey');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		name: "As One (Sliggoo)",
		shortDesc: "The combination of Electric Surge and Gooey.",
	},
   asoneindeedeef: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Beast Boost and Psychic Surge!');
		},
		onStart(source) {
			this.field.setTerrain('psychicterrain');
		},
        onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		name: "As One (Indeedee-F)",
		shortDesc: "The combination of Beast Boost and Psychic Surge.",
	},
   asonedruddigon: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Static and Rough Skin!');
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
                this.damage(source.baseMaxhp / 8, source, target);
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		name: "As One (Druddigon)",
		shortDesc: "The combination of Static and Rough Skin.",
	},
   asonemandibuzz: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Defiant and Overcoat!');
		},
        onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Overcoat');
				return null;
			}
		},
        onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Defiant only affects stats lowered by foes.", true, source.side);
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
				this.add('-ability', target, 'Defiant');
				this.boost({atk: 2}, target, target, null, true);
			}
		},
		name: "As One (Mandibuzz)",
		shortDesc: "The combination of Defiant and Overcoat.",
	},
   asonebraviary: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Analytic and Sheer Force!');
		},
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Analytic boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
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
			if (move.hasSheerForce) return this.chainModify([0x14CD, 0x1000]);
		},
		name: "As One (Braviary)",
		shortDesc: "The combination of Analytic and Sheer Force.",
	},
   asonegourgeistsuper: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Tinted Lens and Frisk!');
		},
        onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Frisk', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		name: "As One (Gourgeist-Super)",
		shortDesc: "The combination of Tinted Lens and Frisk.",
	},
   asonelunatone: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Magic Guard and Levitate!');
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		name: "As One (Lunatone)",
		shortDesc: "The combination of Magic Guard and Levitate.",
	},
   asoneslowkinggalar: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Tinted Lens and Regenerator!');
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
        onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "As One (Slowking-Galar)",
		shortDesc: "The combination of Tinted Lens and Regenerator.",
	},
   asonevileplume: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Unaware and Chlorophyll!');
		},
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectData.target;
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
        onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		name: "As One (Vileplume)",
		shortDesc: "The combination of Unaware and Chlorophyll.",
	},
   asoneaurorus: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Beast Boost and Refrigerate!');
		},
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
			if (move.refrigerateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		name: "As One (Aurorus)",
		shortDesc: "The combination of Beast Boost and Refrigerate.",
	},
   asonegirafarig: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add( '-message', 'Contrary and Inner Focus!');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Inner Focus');
			}
			if (effect && effect.id === 'zpower') return;
			let i: BoostName;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
		name: "As One (Girafarig)",
		shortDesc: "The combination of Contrary and Inner Focus.",
	},
};
