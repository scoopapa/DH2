export const Abilities: {[k: string]: ModdedAbilityData} = {
	angershell: {
		onAfterMoveSecondary(target, source, move) {
			target.abilityState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 2, spa: 2, spe: 2, def: -1, spd: -1});
			}
		},
		shortDesc: "At 1/2 or less of this Pokemon's max HP: +2 Atk, Sp. Atk, Spe, and -1 Def, Sp. Def.",
		rating: 4.5,
		inherit: true,
	},
	chlorophyll: {
		onModifySpe(spe, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		inherit: true,
	},
	clearbody: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			}
		},
		shortDesc: "This Pokemon's stats cannot be lowered.",
	},
	cursedbody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['curse']) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.randomChance(1, 10)) {
					source.addVolatile('curse', this.effectState.target);
				}
			}
		},
		shortDesc: "If this Pokemon is hit by an attack, there is a 10% chance that the foe gets cursed.",
	},
	electricsurge: {
		inherit: true,
		onStart(source) {
			if (this.field.getPseudoWeather('basaltlayer')) return;
			this.field.setTerrain('electricterrain');
		},
	},
	forecast: {
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			if (pokemon.hasItem('utilityumbrella')) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'snow':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
		inherit: true,
	},
	flowergift: {
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		inherit: true,
	},
	grassysurge: {
		inherit: true,
		onStart(source) {
			if (this.field.getPseudoWeather('basaltlayer')) return;
			this.field.setTerrain('grassyterrain');
		},
	},
	hadronengine: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.getPseudoWeather('basaltlayer')) return;
			if (!this.field.setTerrain('electricterrain') && this.field.isTerrain('electricterrain')) {
				this.add('-activate', pokemon, 'ability: Hadron Engine');
			}
		},
	},
	hydration: {
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
		inherit: true,
	},
	icebody: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'snow') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'snow') return false;
		},
		inherit: true,
	},
	iceface: {
		onStart(pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('snow') && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('snow') && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		inherit: true,
	},
	leafguard: {
		onSetStatus(status, target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (target.hasItem('utilityumbrella')) return;
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-immune', target, '[from] ability: Leaf Guard');
				return null;
			}
		},
		inherit: true,
	},
	mistysurge: {
		inherit: true,
		onStart(source) {
			if (this.field.getPseudoWeather('basaltlayer')) return;
			this.field.setTerrain('mistyterrain');
		},
	},
	moody: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			let stats: BoostName[] = [];
			const boost: SparseBoostsTable = {};
			let statPlus: BoostName;
			for (statPlus in pokemon.boosts) {
				if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
				if (pokemon.boosts[statPlus] < 6) {
					stats.push(statPlus);
				}
			}
			let randomStat: BoostName | undefined = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = 1;

			stats = [];
			let statMinus: BoostName;
			for (statMinus in pokemon.boosts) {
				if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
				if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
					stats.push(statMinus);
				}
			}
			randomStat = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = -1;

			this.boost(boost);
		},
		shortDesc: "Boosts a random stat (except accuracy/evasion) +1 and another stat -1 every turn.",
		inherit: true,
	},
	mummy: {
		inherit: true,
		onFoeBeforeMove(target, source, move) {
			const targetAbility = target.getAbility();
			if (targetAbility.isPermanent || targetAbility.id === 'mummy') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(source))) {
				const oldAbility = target.setAbility('mummy', target);
				if (oldAbility) {
					this.add('-activate', source, 'ability: Mummy', this.dex.abilities.get(oldAbility).name, '[of] ' + target);
				}
			}
		},
		onDamagingHit() {},
		shortDesc: "Pokemon attempting contact with this Pokemon have their Ability changed to Mummy.",
	},
	myceliummight: {
		onFractionalPriority() {},
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreAbility = true;
				move.type = '???';
			}
		},
		shortDesc: "This Pokemon's Status moves ignore Abilities.",
		rating: 3,
		inherit: true,
	},
	psychicsurge: {
		inherit: true,
		onStart(source) {
			if (this.field.getPseudoWeather('basaltlayer')) return;
			this.field.setTerrain('psychicterrain');
		},
	},
	sandforce: {
		onModifyAtk(atk, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'sandstorm') return false;
		},
		name: "Sand Force",
		shortDesc: "If Sandstorm is active, this Pokemon's Attack is 1.5x; immunity to Sandstorm.",
		inherit: true,
	},
	sandrush: {
		onModifySpe(spe, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'sandstorm') return false;
		},
		inherit: true,
	},
	seedsower: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.field.getPseudoWeather('basaltlayer')) return;
			this.field.setTerrain('grassyterrain');
		},
	},
	solarpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		inherit: true,
	},
	slushrush: {
		onModifySpe(spe, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('snow')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'sandstorm') return false;
		},
		name: "Slush Rush",
		inherit: true,
	},
	swiftswim: {
		onModifySpe(spe, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		inherit: true,
	},
	wanderingspirit: {
		inherit: true,
		onFoeBeforeMove(target, source, move) {
			const additionalBannedAbilities = ['hungerswitch', 'illusion', 'neutralizinggas', 'wonderguard'];
			if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
				return;
			}

			if (this.checkMoveMakesContact(move, target, source)) {
				const sourceCanBeSet = this.runEvent('SetAbility', source, target, this.effect, target.ability);
				if (!sourceCanBeSet) return sourceCanBeSet;
				const targetAbility = target.setAbility('wanderingspirit', source);
				if (!targetAbility) return;
				if (source.isAlly(target)) {
					this.add('-activate', source, 'Skill Swap', '', '', '[of] ' + target);
				} else {
					this.add('-activate', source, 'ability: Wandering Spirit', this.dex.abilities.get(targetAbility).name, 'Wandering Spirit', '[of] ' + target);
				}
				source.setAbility(targetAbility);
			}
		},
		shortDesc: "",
	},
	watercompaction: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Water Compaction');
				}
				return null;
			}
		},
		name: "Water Compaction",
		shortDesc: "This Pokemon's Defense is raised 2 stages when hit by a Water-type move; Water immunity.",
		rating: 1.5,
		num: 195,
	},
	
	//CAP
	mountaineer: {
		inherit: true,
		isNonstandard: null,
	},
	
	//Roovnen
	artportrait: {
		onStart(source) {
			for (const target of source.side.foe.active) {
				const types = target.species.types;
				if (types && types !== '???' && source.getTypes().join() !== types) {
					if (!source.setType(types)) return;
					this.add('-activate', source, 'ability: Art Portrait');
					this.add('-start', source, 'typechange', '[from] move: Reflect Type', '[of] ' + target);
				}
			}
		},
		name: "Art Portrait",
		shortDesc: "Upon entry, copies the opponents type.",
		rating: 3.5,
		num: 307,
	},
	plottwist: {
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (target !== pokemon) {
					let success = false;
					let i: BoostName;
					for (i in target.boosts) {
						if (target.boosts[i] === 0) continue;
						target.boosts[i] = -target.boosts[i];
						success = true;
					}
					if (!success) return false;
					this.add('-activate', pokemon, 'ability: Plot Twist');
					this.add('-invertboost', target);
				}
			}
		},
		name: "Plot Twist",
		shortDesc: "Upon entry, this Pokemon doubles and inverts all Pokemon's stat changes.",
		rating: 3.5,
		num: 308,
	},
	synthony: {
		onStart(pokemon) {
			pokemon.addVolatile('synthony');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('synthony')) {
					pokemon.removeVolatile('synthony');
					return;
				}
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
				this.debug(`Current Synthony boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		name: "Synthony",
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
		rating: 4,
		num: 309,
	},
	curingrocks: {
		onStart(pokemon) {
			for (const ally of pokemon.alliesAndSelf()) {
				this.add('-activate', pokemon, 'ability: Curing Rocks');
				ally.addVolatile('curingrocks');
			}
		},
		condition: {
			duration: 5,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Curing Rocks');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Curing Rocks');
			},
		},
		name: "Curing Rocks",
		shortDesc: "For 5 turns, the allies side heals 1/16 of their max HP each turn.",
		rating: 2,
		num: 310,
	},
	happymeal: {
		onEatItem(item, pokemon) {
			if (item.isBerry) {
				pokemon.addVolatile('happymeal')
			}
		},
		condition: {
			duration: 4,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Happy Meal');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 8);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Happy Meal');
			},
		},
		name: "Happy Meal",
		shortDesc: "For 3 turns, this Pokemon restores 1/8 of its max HP after consuming a berry.",
		rating: 3,
		num: 311,
	},
	hailforce: {
		onModifyAtk(atk, pokemon) {
			if (this.field.isWeather('snow')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'snow') return false;
		},
		name: "Hail Force",
		shortDesc: "If Snow is active, this Pokemon's Attack is 1.5x.",
		rating: 3.5,
		num: 312,
	},
	maternalguard: {
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		name: "Maternal Guard",
		shortDesc: "If this Pokemon can evolve, its Defense and Sp. Def are 1.5x.",
		rating: 3.5,
		num: 313,
	},
	maternalpower: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'fling', 'iceball', 'rollout', 'seismictoss', 'nightshade'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 3;
				move.multihitType = 'maternalpower';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'maternalpower' && move.hit > 1) return this.chainModify(0.33);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'maternalpower' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Maternal Power",
		shortDesc: "This Pokemon's damaging moves hit thrice. The second and third hit have their power third.",
		rating: 3.5,
		num: 314,
	},
	adaptingtree: {
		onUpdate(pokemon) {
			const oldprimarytype = pokemon.baseSpecies.types[0];
			let newprimarytype;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				newprimarytype = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				newprimarytype = 'Water';
				break;
			case 'sandstorm':
				newprimarytype = 'Rock';
				break;
			case 'snow':
			case 'hail':
				newprimarytype = 'Ice';
				break;
			default:
				newprimarytype = oldprimarytype;
				break;			
			}
			const types = pokemon.baseSpecies.types;
			let typecombo = [newprimarytype, pokemon.baseSpecies.types[1]];
			if (pokemon.getTypes().join() === typecombo.join() || !pokemon.setType(typecombo)) return;
			this.add('-ability', pokemon, 'Adapting Tree');
			this.add('-start', pokemon, 'typechange', typecombo.join('/'), '[from] ability: Adapting Tree');
		},
		name: "Adapting Tree",
		shortDesc: "The Pokemon's primary typing matches the weather.",
		rating: 4,
		num: 315,
	},
	dashhappy: {
		onStart(pokemon) {
			pokemon.addVolatile('dashhappy');
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dash Happy');
		},
		onUpdate(pokemon) {
			if (!pokemon.volatiles['dashhappy']) {
				pokemon.addVolatile('dashhappy');
			}
		},
		condition: {
			duration: 3,
			onStart(target) {
				this.add('-start', target, 'ability: Dash Happy');
			},
			onEnd(target) {
				this.add('-end', target, 'Dash Happy');
				this.add('-message', `${target.name} is ready to dash!`);
				this.actions.useMove("Dash", target);
			},
		},
		name: "Dash Happy",
		shortDesc: "This Pokemon dashes after being active for 3 turns.",
		rating: 4,
		num: 316,
	},
	cleanup: {
		onSwitchInPriority: 6,
		onSwitchIn(pokemon, target, source) {
			this.add('-activate', pokemon, 'ability: Clean Up');
			let success = false;
			const removeHazards = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeHazards) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			for (const active of this.getAllActive()) {
				if (['sunnyday', 'desolateland', 'raindance', 'primordialsea', 'sandstorm', 'snow', 'hail', 'deltastream'].includes(active.effectiveWeather())) {
					this.field.clearWeather();
					success = true;
				} else if (this.field.isTerrain('electricterrain') || this.field.isTerrain('grassyterrain') || this.field.isTerrain('mistyterrain') || this.field.isTerrain('psychicterrain')) {
					this.field.clearTerrain();
					success = true;
				} else if (this.field.getPseudoWeather('trickroom')) {
					this.field.removePseudoWeather('trickroom');
					success = true;
				} else if (this.field.getPseudoWeather('magicroom')) {
					this.field.removePseudoWeather('magicroom');
					success = true;
				} else if (this.field.getPseudoWeather('wonderroom')) {
					this.field.removePseudoWeather('wonderroom');
					success = true;
				}
			}
			if (success) this.hint("$[pokemon.name] cleaned up the field.");
		},
		name: "Clean Up",
		shortDesc: "Upon entry, this Pokemon removes any terrain, room, weather and hazards on both sides.",
		rating: 4,
		num: 317,
	},
	energybody: {
		onUpdate(pokemon) {
			if (this.effectState.energybody) return;
			if (pokemon.hp <= pokemon.maxhp / 4) {
				this.effectState.energybody = true;
				this.add('-activate', pokemon, 'ability: Energy Body');
				pokemon.heal(pokemon.baseMaxhp / 3 * 2);
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.energybody;
		},
		name: "Energy Body",
		shortDesc: "Once per switch, this Pokemon heals 2/3 of its max HP when at 1/4 of its health.",
		rating: 3,
		num: 318,
	},
	ferriswheel: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (['firespin', 'icespinner', 'mortalspin', 'rapidspin', 'slowspin', 'rollout', 'rollingkick', 'steelroller', 'steamroller', 'flamewheel', 'aurawheel', 'gyroball', 'iceball'].includes(move.id)) {
				this.debug('Ferris Wheel boost');
				return this.chainModify(1.5);
			}
		},
		name: "Ferris Wheel",
		shortDesc: "This Pokemon's spinning and rolling moves do 1.5x damage.",
		rating: 4,
		num: 319,
	},
	hardenedshell: {
		onStart(pokemon) {
			pokemon.addVolatile('hardenedshell');
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				this.add('-immune', target, '[from] ability: Hardened Shell');
				return null;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Hardened Shell');
			}
			return false;
		},
		name: "Hardened Shell",
		shortDesc: "This Pokemon gains Steel resistances and immunities.",
		rating: 4,
		num: 320,
	},
	heavyshoulder: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Heavy Shoulder', 'boost');
					activated = true;
				}
				this.boost({spe: -1}, target, pokemon, null, true);
			}
		},
		name: "Heavy Shoulder",
		shortDesc: "This Pokemon lowers the opposing sides speed by 1 each turn.",
		rating: 3.5,
		num: 321,
	},
	prosthesis: {
		onModifyMove(move) {
			if (['axekick', 'blazekick', 'doublekick', 'highjumpkick', 'lowkick', 'megakick', 'thunderouskick', 'tropkick', 'jumpkick', 'rollingkick', 'triplekick', 'tripleaxel'].includes(move.id)) {
				move.drain = [1, 3];
			}
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (['axekick', 'blazekick', 'doublekick', 'highjumpkick', 'lowkick', 'megakick', 'thunderouskick', 'tropkick', 'jumpkick', 'rollingkick', 'triplekick', 'tripleaxel'].includes(move.id)) {
				this.boost({spe: 1});
			}
		},
		name: "Prosthesis",
		shortDesc: "Kicking moves heal the user by 1/3 of the damage dealt and boost speed.",
		rating: 4,
		num: 322,
	},
	rebirth: {
		onFaint(source) {
			source.side.addSlotCondition(source, 'rebirth');
		},
		condition: {
			duration: 2,
			onSwap(target) {
				if (!target.fainted) {
					this.actions.useMove("Revival Blessing", target);
					target.side.removeSlotCondition(target, 'rebirth');
				}
			},
		},
		isUnbreakable: true,
		isPermanent: true,
		name: "Rebirth",
		shortDesc: "Upon fainting, a Pokemon can be revived.",
		rating: 5,
		num: 323,
	},
	jealouswrath: {
		onAfterMove(target, source, move) {
			let stats: BoostID[] = [];
			const boost: SparseBoostsTable = {};
			
			stats = [];
			let statMinus: BoostID;
			for (statMinus in source.boosts) {
				if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
				if (source.boosts[statMinus] < 6) {
					stats.push(statMinus);
				}
			}
			let randomStat: BoostID | undefined = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = -1;
			
			this.boost(boost, source, target, null, true);
		},
		name: "Jealous Wrath",
		shortDesc: "This Pokemon's attacking moves reduce a target's random stat by 1.",
		rating: 3,
		num: 324,
	},
	ignorance: {
		//Implemented in conditions, moves and items
		name: "Ignorance",
		shortDesc: "This Pokemon cannot be restricted in its move choice.",
		rating: 4,
		num: 325,
	},
	sandarmor: {
		onModifyDef(def, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'sandstorm') return false;
		},
		name: "Sand Armor",
		shortDesc: "If Sandstorm is active, this Pokemon's Defense is 1.5x; immunity to Sandstorm.",
		rating: 2,
		num: 326,
	},
	shielded: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add('-activate', source, 'ability: Shielded');
				source.addVolatile('shielded');
			}
		},
		condition: {
			noCopy: true,
			duration: 2,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Shielded', '[silent]');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'ability: Shielded');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Shielded');
			},
		},
		name: "Shielded",
		shortDesc: "Upon KOing an opposing Pokemon, this Pokemon will take no damage for 1 turn.",
		rating: 4,
		num: 348,
	},
	warriorspirit: {
		onFaint(source) {
			this.add('-activate', source, 'ability: Warrior Spirit');
			source.side.addSlotCondition(source, 'warriorspirit');
		},
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.maxhp);
					target.clearStatus();
					this.add('-heal', target, target.getHealth, '[from] ability: Warrior Spirit');
					target.side.removeSlotCondition(target, 'warriorspirit');
				}
			},
		},
		name: "Warrior Spirit",
		shortDesc: "After fainting, this Pokemon fully heals an ally that comes in.",
		rating: 4,
		num: 349,
	},
	challenger: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Challenger');
		},
		onAnyTryMove(target, source, effect) {
			if (effect.id === 'prepareattack' && ['yorlator', 'mranovo', 'curtowal'].includes(target.species.id)) return;
			if (effect.category === 'Status') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Challenger', effect, '[of] ' + target);
				return false;
			}
		},
		name: "Challenger",
		shortDesc: "While this Pokemon is active, no Status moves can be used.",
		rating: 5,
		num: 350,
	},
	protectivewill: {
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.75);
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			this.damage(source.lastDamage / 3, source, target, this.dex.abilities.get('protectivewill'));
		},
		name: "Protective Will",
		shortDesc: "Damaging moves do 25% less damage and the 25% are bounced back at the attacker.",
		rating: 4.5,
		num: 351,
	},
	prideroar: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0 && move.flags['sound']) {
				this.debug('Pride Roar boost');
				return this.chainModify(2.25);
			}
		},
		name: "Pride Roar",
		shortDesc: "Sound moves that are not very effective on a target deal 2.25x.",
		rating: 4.5,
		num: 352,
	},
	kindheart: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Kind Heart reduce');
				return this.chainModify(0.75);
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				this.heal(source.baseMaxhp / 6, source, source, this.dex.abilities.get('kindheart'));
			}
		},
		name: "Kind Heart",
		shortDesc: "Super effective moves do 25% less damage, but heal the user by 1/6 of its max HP.",
		rating: 4.5,
		num: 353,
	},
	dynamicbattle: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.side.active.length !== 1) {
				this.debug('Dynamic Battle boost');
				return this.chainModify([4915, 4096]);
			}
		},
		name: "Dynamic Battle",
		shortDesc: "This Pokemon's moves have 1.2x more power when an ally is unfainted.",
		rating: 4,
		num: 354,
	},
	chaser: {
		onFoeSwitchOut(source, target) {
			for (const target of source.side.foe.active) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Chaser",
		shortDesc: "Opposing Pokemon loose 1/8 of their maximum HP, rounded down, when it switches out.",
		rating: 5,
		num: 355,
	},
	corruption: {
		onStart(pokemon) {
			let activated = false;
			for (const target of this.getAllActive()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Corruption');
					this.add('-message', `${pokemon.name} corrupted its surroundings!`);
				}
				activated = true;
				if (!target.volatiles['corrupted']) {
					target.addVolatile('corrupted');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			for (const target of this.getAllActive()) {
				if (!target.volatiles['corrupted']) {
					target.addVolatile('corrupted');
				}
			}
		},
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				target.removeVolatile('corrupted');
			}
		},
		name: "Corruption",
		isPermanent: true,
		shortDesc: "Active Pokemon without this ability are weak to Dark.",
		rating: 4,
		num: 356,
	},
};