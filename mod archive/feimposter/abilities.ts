export const Abilities: {[k: string]: ModdedAbilityData} = {
	raggedsenses: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Ragged Senses boost');
				return this.chainModify(2);
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Ragged Senses",
		shortDesc: "Tinted Lens + Rough Skin",
		rating: 5,
		num: -1,
	},
	ignorantadapting: {
		onModifyMove(move) {
			move.stab = 2;
		},
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Ignorant Adapting only affects stats lowered by foes.", true, source.side);
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
				this.add('-ability', target, 'Ignorant Adapting');
				this.boost({atk: 2}, target, target, null, true);
			}
		},
		name: "Ignorant Adapting",
		shortDesc: "Adaptability + Defiant",
		rating: 5,
		num: -2,
	},
	needlesurge: {
		onStart(source) {
			this.field.setTerrain('grassyterrain');
		},
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Needle Surge');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Needle Surge');
				return target.hp - 1;
			}
		},
		name: "Needle Surge",
		shortDesc: "Grassy Surge + Sturdy",
		rating: 5,
		num: -3,
	},
	epidermisrecovery: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Epidermis Recovery');
				return null;
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Epidermis Recovery",
		shortDesc: "Overcoat + Regenerator",
		rating: 5,
		num: -4,
	},
	royalpressure: {
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasRoyalPressure = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasRoyalPressure) return this.chainModify([0x14CD, 0x1000]);
		},
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectData.target;
			if ((source.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Queenly Majesty', move, '[of] ' + target);
				return false;
			}
		},
		name: "Royal Pressure",
		shortDesc: "Sheer Force + Queenly Majesty",
		rating: 5,
		num: -5,
	},
	mybodymychoice: {
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: My Body, My Choice');
				return false;
			}
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: My Body, My Choice", "[of] " + target);
			}
		},
		name: "My Body, My Choice",
		shortDesc: "Sticky Hold + Clear Body",
		rating: 5,
		num: -6,
	},
	domination: {
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasDomination = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasDomination) return this.chainModify([0x14CD, 0x1000]);
		},
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Domination', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Domination",
		shortDesc: "Sheer Force + Intimidate",
		rating: 5,
		num: -7,
	},
	completeignorance: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		onAnyModifyBoost(boosts, pokemon) {
			const completeignoranceUser = this.effectData.target;
			if (completeignoranceUser === pokemon) return;
			if (completeignoranceUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && completeignoranceUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		name: "Complete Ignorance",
		shortDesc: "Infiltrator + Unaware",
		rating: 5,
		num: -8,
	},
	shocker: {
		onStart(pokemon) {
			pokemon.removeVolatile('truant');
			if (pokemon.activeTurns && (pokemon.moveThisTurnResult !== undefined || !this.queue.willMove(pokemon))) {
				pokemon.addVolatile('truant');
			}
		},
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant', pokemon, 'ability: Truant');
				return false;
			}
			pokemon.addVolatile('truant');
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric') {
				pokemon.removeVolatile('truant')
			}
		},
		condition: {},
		name: "Shocker",
		shortDesc: "Truant + when hit by an Electric move, it removes the Truant effect.",
		rating: 5,
		num: -9,
	},
	voltyfur: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.type === 'Electric') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		name: "Volty Fur",
		shortDesc: "Fluffy + Static + takes 2x damage from Fire and Electric moves.",
		rating: 5,
		num: -10,
	},
	mumblerap: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Mumble Rap boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				this.debug('Mumble Rap weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpe(spe, pokemon, move) {
			if (move.flags['sound']) {
				return this.chainModify(1.3);
			}
		},
		name: "Mumble Rap",
		shortDesc: "Punk Rock + this Pokemon's speed is 1.3x when using a sound move.",
		rating: 5,
		num: -11,
	},
	healingscent: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectData.target;
					this.add('-block', target, 'ability: Healing Scent', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		name: "Healing Scent",
		shortDesc: "Poison Heal + Aroma Veil",
		rating: 5,
		num: -12,
	},
	hitandrun: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Hit and Run');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Hit and Run');
		},
		name: "Hit and Run",
		shortDesc: "Pressure + Emergency Exit",
		rating: 5,
		num: -13,
	},
	recoveringfumes: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Recovering Fumes');
			pokemon.abilityData.ending = false;
			for (const target of this.getAllActive()) {
				if (target.illusion) {
					this.singleEvent('End', this.dex.getAbility('Illusion'), target.abilityData, target, pokemon, 'recoveringfumes');
				}
				if (target.volatiles['slowstart']) {
					delete target.volatiles['slowstart'];
					this.add('-end', target, 'Slow Start', '[silent]');
				}
			}
		},
		onEnd(source) {
			source.abilityData.ending = true;
			for (const pokemon of this.getAllActive()) {
				if (pokemon !== source) {
					this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityData, pokemon);
				}
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Recovering Fumes",
		shortDesc: "Neutralizing Gas + Regenerator",
		rating: 5,
		num: -14,
	},
	fireybreakthrough: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('fireybreakthrough')) {
					this.add('-immune', target, '[from] ability: Firey Breakthrough');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('fireybreakthrough');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Firey Breakthrough');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('fireybreakthrough')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('fireybreakthrough')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Firey Breakthrough', '[silent]');
			},
		},
		onModifyMove(move) {
			move.infiltrates = true;
		},
		name: "Firey Breakthrough",
		shortDesc: "Flash Fire + Infiltrator",
		rating: 5,
		num: -15,
	},
	airborneoppression: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Airborne Oppression');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		name: "Airborne Oppression",
		shortDesc: "Levitate + Pressure",
		rating: 5,
		num: -16,
	},
	visualprofessional: {
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Visual Professional', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Visual Professional boost');
				return this.chainModify(1.5);
			}
		},
		name: "Visual Professional",
		shortDesc: "Frisk + Technician",
		rating: 5,
		num: -17,
	},
	identitytheft: {
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
			const type = target.getTypes().join();
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Identity Theft');
			}
		},
		name: "Identity Theft",
		shortDesc: "This Pokemon's highest stat is raised by 1 when it KOes another Pokemon and copies its typing.",
		rating: 5,
		num: -18,
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
	scammer: {
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Scammer', '[of] ' + target);
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('brn', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
		name: "Scammer",
		shortDesc: "If this Pokemon has no item, it steals the item off a Pokemon with an attack and either brn, prz or psn it.",
		rating: 5,
		num: -20,
	},
	entomophobia: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Entomophobia boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Entomophobia boost');
				return this.chainModify(1.5);
			}
		},
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Entomophobia', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Entomophobia",
		shortDesc: "Swarm + Intimidate",
		rating: 5,
		num: -21,
	},
	freightingcostume: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['mimidactyl'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Freighting Costume');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimidactyl'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['mimidactyl'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimidactyl'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = pokemon.species.id === 'Mimidactyl-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(speciesid));
			}
		},
		name: "Freighting Costume",
		shortDesc: "Disguise + Unnerve",
		rating: 5,
		num: -22,
	},
	beastysipping: {
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
		onTryHitPriority: 1,
		onTryHit(length, target, source, move, effect) {
			if (target !== source && move.type === 'Grass') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				if (!this.boost({[statName]: length}, source)) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		onAllyTryHitSide(length, target, source, move, effect) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Grass') {
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
		name: "Beasty Sipping",
		shortDesc: "Beast Boost + highest stat is raised by 1 if it gets hit by a Grass move.",
		rating: 5,
		num: -23,
	},
	healingstress: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Healing Stress');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		onCheckShow(pokemon) {
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;
			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				if (!curPoke || !curPoke.status) {
					continue;
				}
				if (curPoke.showCure) {
					continue;
				}
				const species = curPoke.species;
				if (!Object.values(species.abilities).includes('Healing Stress')) {
					continue;
				}
				if (!species.abilities['1'] && !species.abilities['H']) {
					continue;
				}
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					continue;
				}
				if (curPoke.hasAbility('healingstress')) {
					cureList.push(curPoke);
				} else {
					noCureCount++;
				}
			}
			if (!cureList.length || !noCureCount) {
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Healing Stress.)");
				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;
			if (pokemon.showCure === undefined) pokemon.showCure = true;
			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Healing Stress');
			pokemon.setStatus('');
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		name: "Healing Stress",
		shortDesc: "Natural Cure + Pressure",
		rating: 5,
		num: -24,
	},
	asoneampharos: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One (Ampharos)', pokemon.side.foe);
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		name: "As One (Ampharos)",
		shortDesc: "Unnerve + Static",
		rating: 5,
		num: -25,
	},
	bugspray: {
		onTryHit(pokemon, target, move) {
			if (move.flags['bullet'] || move.type === 'Bug') {
				this.add('-immune', pokemon, '[from] ability: Bug Spray');
				return null;
			}
		},
		name: "Bug Spray",
		shortDesc: "Bulletproof + Immunity to Bug.",
		rating: 5,
		num: -26,
	},
	thinkingprocess: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Thinking Process boost');
				return this.chainModify(1.5);
			}
		},
		name: "Thinking Process",
		shortDesc: "Regenerator + Technician",
		rating: 5,
		num: -27,
	},
	flamingrage: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Flaming Rage only affects stats lowered by foes.", true, source.side);
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
				this.add('-ability', target, 'Flaming Rage');
				this.boost({spa: 2}, target, target, null, true);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		name: "Flaming Rage",
		shortDesc: "Competitive + Flame Body",
		rating: 5,
		num: -28,
	},
};
 
