export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	rkstech: {
		shortDesc: "This Pokemon's moves that match its held Memory have 1.5x power.",
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const memoryType = this.runEvent('Memory', attacker, null, move);
			if (move.type === memoryType) {
				this.debug('RKS Tech boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "RKS Tech",
		rating: 3.5,
	},
	leafarmor: {
		shortDesc: "Leaf Guard + Battle Armor",
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Armor');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-immune', target, '[from] ability: Leaf Armor');
				return null;
			}
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Leaf Armor",
		rating: 0.5,
	},
	magmapurge: {
		shortDesc: "Flash Fire + Mold Breaker",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Magma Purge');
  		this.add('-message', `${pokemon.name} breaks the mold!`);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('magmapurge')) {
					this.add('-immune', target, '[from] ability: Magma Purge');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('magmapurge');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('magmapurge')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('magmapurge')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Magma Purge",
		rating: 3.5,
	},
	smokebomb: {
		shortDesc: "White Smoke + Pickpocket",
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
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Smoke Bomb', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Smoke Bomb', '[of] ' + source);
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
				this.add("-fail", target, "unboost", "[from] ability: Smoke Bomb", "[of] " + target);
			}
		},
		flags: {breakable: 1},
		name: "Smoke Bomb",
		rating: 1,
	},
	aerialassassin: {
		shortDesc: "Moxie + Levitate",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		flags: {breakable: 1},
		name: "Aerial Assassin",
		rating: 3,
	},
	landingblade: {
		shortDesc: "This Pokemon's slicing and Ground-type moves have their power multiplied by 1.5.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing'] || move.type === 'Ground') {
				this.debug('Landing Blade boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Landing Blade",
		rating: 3.5,
	},
	tripwire: {
		shortDesc: "(Non-functional placeholder) If this Pokemon flinches: +1 Speed, opposing grounded Pokemon is now trapped.",
		/* onFlinch(attacker, defender) {
			this.boost({spe: 1}, defender, defender);
			if (attacker.isGrounded()) {
				this.actions.useMove("Block", defender);
			}
		}, */
		flags: {},
		name: "Tripwire",
		rating: 3,
	},
	bugforce: {
		shortDesc: "This Pokemon's Bug-type moves and attacks with secondary effects have 1.3x power; nullifies the effects.",
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
			if (move.hasSheerForce || move.type === 'Bug') return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Bug Force",
		rating: 3.5,
	},
	techwarranty: {
		shortDesc: "Hyper Cutter + Technician",
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Tech Warranty boost');
				return this.chainModify(1.5);
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Tech Warranty", "[of] " + target);
				}
			}
		},
		flags: {breakable: 1},
		name: "Tech Warranty",
		rating: 3.5,
	},
	fairyportal: {
		shortDesc: "On switch-in: only takes direct damage, foe(s) get -1 Atk.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Fairy Portal', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onSwitchIn() {
			this.effectState.switchingIn = true;
		},
		onDamage(damage, target, source, effect) {
			if (!this.effectState.switchingIn) return;
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		flags: {},
		name: "Fairy Portal",
		rating: 3.5,
	},
	synchronizedswimming: {
		shortDesc: "If Rain Dance is active, this Pokemon and its allies' Speed is doubled and they take 3/4x damage from attacks.",
		onAnyModifyDamage(damage, source, target, move) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				if (target !== this.effectState.target && target.isAlly(this.effectState.target)) {
					this.debug('Friend Guard weaken');
					return this.chainModify(0.75);
				}
			}
		},
		onAllyModifySpePriority: 3,
		onAllyModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		flags: {breakable: 1},
		name: "Synchronized Swimming",
		rating: 0,
	},
	phobiaphilia: {
		shortDesc: "When this Pokemon is damaged by a Bug/Dark/Ghost move or is intimidated, the attacker becomes infatuated.",
		onDamagingHit(damage, target, source, move) {
			if (['Dark', 'Bug', 'Ghost'].includes(move.type)) {
				source.addVolatile('attract', this.effectState.target);
			}
		},
		onAfterBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				source.addVolatile('attract', this.effectState.target);
			}
		},
		flags: {},
		name: "Phobiaphilia",
		rating: 1,
	},
	protoveil: {
		shortDesc: "Effects of Pastel Veil. If Pastel Veil activates: highest stat is 1.3x, or 1.5x if Speed.",
		onStart(pokemon) {
			for (const ally of pokemon.alliesAndSelf()) {
				if (['psn', 'tox'].includes(ally.status)) {
					this.add('-activate', pokemon, 'ability: Proto Veil');
					ally.cureStatus();
					pokemon.addVolatile('protoveil');
				}
			}
		},
		onUpdate(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Proto Veil');
				pokemon.cureStatus();
				pokemon.addVolatile('protoveil');
			}
		},
		onAllySwitchIn(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', this.effectState.target, 'ability: Proto Veil');
				pokemon.cureStatus();
				pokemon.addVolatile('protoveil');
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Proto Veil');
				target.addVolatile('protoveil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Proto Veil', '[of] ' + effectHolder);
				effectHolder.addVolatile('protoveil');
			}
			return false;
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protoveil'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-activate', pokemon, 'ability: Proto Veil');
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Proto Veil atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Proto Veil def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Proto Veil spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Proto Veil spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Proto Veil spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1, breakable: 1},
		name: "Proto Veil",
		rating: 3,
	},
	sinkorswim: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Sink or Swim', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Sink or Swim",
		rating: 3.5,
		shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
	},
	debilitate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Sink or Swim', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Debilitate",
		rating: 3.5,
		shortDesc: "On switch-in, this Pokemon lowers the SpA of opponents by 1 stage.",
	},
	smarts: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Smarts",
		rating: 3.5,
		shortDesc: "If this Pokemon is statused, its SpA is 1.5x.",
	},
	innersync: {
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox' || 
				 pokemon.status === 'brn' || pokemon.status === 'par') {
				this.add('-activate', pokemon, 'ability: Inner Sync');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id === 'slp' || status.id === 'frz') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Inner Sync');
			}
			return false;
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Sync', '[of] ' + target);
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Inner Sync', '[of] ' + target);
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Inner Sync', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Inner Sync",
		rating: 1,
		shortDesc: "This Pokemon is immune to Burn, Poison, Paralysis, flinching, and Intimidate.",
	},
	berserker: {
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
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Berserker boost');
				return this.chainModify([4915, 4096]);
			}
		},
		condition: {
			duration: 1,
		},
		flags: {breakable: 1},
		name: "Berserker",
		rating: 3.5,
		shortDesc: "Magic Bounce + Reckless",
	},
	migration: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		flags: {},
		name: "Migration",
		rating: 4.5,
		shortDesc: "Regenerator + Early Bird",
	},
	purifyingmold: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Purifying Mold');
			this.add('-message', `${pokemon.name} breaks the mold!`);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Purifying Mold');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Purifying Mold');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Mold weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Mold weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Purifying Mold",
		rating: 4,
		shortDesc: "Purifying Salt + Mold Breaker",
	},
	glassknuckles: {
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
				this.add("-fail", target, "unboost", "[from] ability: Glass Knuckles", "[of] " + target);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Glass Knuckles boost');
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "Glass Knuckles",
		rating: 2,
		shortDesc: "Clear Body + Iron Fist",
	},
	rockyii: {
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Rocky II');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Rocky II');
				return target.hp - 1;
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Rocky II', '[of] ' + target);
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Rocky II', '[of] ' + target);
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Rocky II', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Rocky II",
		rating: 3,
		shortDesc: "Sturdy + Scrappy",
	},
	degenerator: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') ||
				 target.hasAbility('nopressure') ||
				 target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					target.trySetStatus('psn', source);
				}
			}
		},
		flags: {},
		name: "Degenerator",
		rating: 4.5,
		shortDesc: "Regenerator + Poison Touch",
	},
	toxiccleansing: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10) && !source.hasAbility('toxiccleansing')) {
					source.trySetStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Toxic Cleansing",
		rating: 1.5,
		shortDesc: "Effects of Poison Point. This Pokemon avoids status infliction from making contact.",
	},
	solarzenith: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
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
		name: "Solar Zenith",
		rating: 3,
		shortDesc: "Chlorophyll + Adaptability",
	},
	fungalsurveillance: {
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
				this.debug('Fungal Surveillance boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifyMove(move, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				move.ignoreAbility = true;
			}
		},
		flags: {},
		name: "Fungal Surveillance",
		rating: 2.5,
		shortDesc: "This Pokemon's attacks have 1.3x power and ignore abilities if it moves last.",
	},
	thermalconductor: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({atk: 1});
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Thermal Conductor');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Thermal Conductor');
			}
			return false;
		},
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Steel') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Steel')) {
				pokemon.maybeTrapped = true;
			}
		},
		flags: {breakable: 1},
		name: "Thermal Conductor",
		rating: 2.5,
		shortDesc: "Thermal Exchange + Magnet Pull",
	},
	chilledcharge: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.type === 'Electric') {
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
		flags: {},
		name: "Chilled Charge",
		rating: 4,
		shortDesc: "Normal-type moves become Electric type, have 1.2x power, and heal the user by 1/16.",
	},
	nopressure: {
		onModifySecondaries(secondaries) {
			this.debug('No Pressure prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		flags: {breakable: 1},
		name: "No Pressure",
		rating: 2,
		shortDesc: "Attacks targeting this Pokemon have their secondary effects removed.",
	},
	fetch: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Fetch');
			this.add('-message', `${pokemon.name} is exerting its Pressure!`);
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
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
			this.add('-item', pokemon, this.dex.items.get(item), '[from] ability: Pickup');
			pokemon.setItem(item);
		},
		flags: {},
		name: "Fetch",
		rating: 2.5,
		shortDesc: "Pressure + Pickup",
	},
	zentrance: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmacroak' || pokemon.transformed) {
				return;
			}
			if (!['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zentrance');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zentrance'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zentrance'];
			if (pokemon.species.baseSpecies === 'Darmacroak' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmacroakzen') pokemon.formeChange('Darmacroak-Zen');
				} else {
					if (pokemon.species.id !== 'darmacroakgalarzen') pokemon.formeChange('Darmacroak-Galar-Zen');
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Zentrance",
		rating: 0,
		shortDesc: "If Darmacroak, enters Zen Mode on switch-in.",
	},
	dryforce: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dry Force');
				}
				return null;
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
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
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		flags: {breakable: 1},
		name: "Dry Force",
		rating: 3,
		shortDesc: "Dry Skin + Sheer Force",
	},
	callousedskin: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Calloused Skin');
				}
				return null;
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
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
		// This should be applied directly to the stat as opposed to chaining with the others
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
		flags: {breakable: 1},
		name: "Calloused Skin",
		rating: 3,
		shortDesc: "Dry Skin + Sheer Force",
	},
	prediction: {
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
						this.add('-ability', pokemon, 'Prediction');
						return;
					}
				}
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Prediction', '[of] ' + target);
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Prediction', '[of] ' + target);
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Prediction', '[of] ' + target);
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		flags: {breakable: 1},
		name: "Prediction",
		rating: 0.5,
		shortDesc: "Anticipation + Inner Focus",
	},
	immunesystem: {
		onDamagingHit(damage, target, source, effect) {
			this.boost({def: 1});
		},
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
				if (!curPoke?.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Immune System')) {
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
				if (curPoke.hasAbility('immunesystem')) {
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
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Immune System.)");
				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;
			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;
			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Immune System');
			pokemon.clearStatus();
			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		flags: {},
		name: "Immune System",
		rating: 4,
		shortDesc: "Stamina + Natural Cure",
	},
	healingwind: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// Air Lock does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			pokemon.abilityState.ending = false; // Clear the ending flag
			if (this.effectState.switchingIn) {
				this.add('-ability', pokemon, 'Healing Wind');
				this.add('-message', `The effects of weather disappeared.`);
				this.effectState.switchingIn = false;
			}
			this.eachEvent('WeatherChange', this.effect);
		},
		onEnd(pokemon) {
			pokemon.abilityState.ending = true;
			this.eachEvent('WeatherChange', this.effect);
		},
		suppressWeather: true,
		flags: {},
		name: "Healing Wind",
		rating: 4.5,
		shortDesc: "Regenerator + Air Lock",
	},
	malocchio: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Malocchio', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('malocchio - enhancing accuracy');
			return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Malocchio",
		rating: 3.5,
		shortDesc: "Compound Eyes + Intimidate",
	},
	coolshades: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		flags: {},
		name: "cool shades",
		rating: 4,
		shortDesc: "Tinted Lens + Moxie",
	},
	rockskin: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.hp && pokemon.status && this.randomChance(33, 100)) {
				this.debug('rock skin');
				this.add('-activate', pokemon, 'ability: Rock Skin');
				pokemon.cureStatus();
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		flags: {},
		name: "Rock Skin",
		rating: 3,
		shortDesc: "Shed Skin + Rock Head",
	},
	dusthead: {
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onModifySecondaries(secondaries) {
			this.debug('Shield Dust prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		flags: {breakable: 1},
		name: "Dust Head",
		rating: 3,
		shortDesc: "Shield Dust + Rock Head",
	},
	amazingasamber: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('amazingasamber');
			} else if (!pokemon.volatiles['amazingasamber']?.fromBooster && this.field.weather !== 'sunnyday') {
				// Protosynthesis will not deactivite if Sun is suppressed, hence the direct ID check (isWeather respects supression)
				pokemon.removeVolatile('amazingasamber');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['amazingasamber'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Amazing as Amber', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Amazing as Amber');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onTryHit(target, source, move) {
				if (move.category === 'Status' && target !== source) {
					this.add('-immune', target, '[from] ability: Amazing as Amber');
					return null;
				}
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
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Amazing as Amber",
		rating: 3,
		shortDesc: "Effects of Protosynthesis. Immune to status moves while Protosynthesis is active.",
	},
	lasergun: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Laser Gun');
				}
				return null;
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Laser Gun', '[of] ' + target);
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Laser Gun', '[of] ' + target);
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Laser Gun', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Laser Gun",
		rating: 3.5,
		shortDesc: "Volt Absorb + Inner Focus",
	},
	resilience: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Resilience');
			this.add('-message', `${pokemon} is exerting pressure!`);
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		onCheckShow(pokemon) {
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;
			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				if (!curPoke?.status) {
					continue;
				}
				if (curPoke.showCure) {
					continue;
				}
				const species = curPoke.species;
				if (!Object.values(species.abilities).includes('Resilience')) {
					continue;
				}
				if (!species.abilities['1'] && !species.abilities['H']) {
					continue;
				}
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					continue;
				}
				if (curPoke.hasAbility('resilience')) {
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
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Resilience.)");
				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;
			if (pokemon.showCure === undefined) pokemon.showCure = true;
			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Resilience');
			pokemon.clearStatus();
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		flags: {},
		name: "Resilience",
		rating: 2.5,
		shortDesc: "Natural Cure + Pressure",
	},
	survivalist: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.boost({atk: 1})) {
					target.cureStatus();
					this.add('-immune', target, '[from] ability: Survivalist');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Grass') {
				this.boost({atk: 1}, this.effectState.target);
				target.cureStatus();
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.hp && pokemon.status && this.randomChance(33, 100)) {
				this.debug('shed skin');
				this.add('-activate', pokemon, 'ability: Survivalist');
				pokemon.cureStatus();
			} 
			if (pokemon.hp && this.randomChance(33, 100)) {
				this.debug('attack boost');
				this.add('-activate', pokemon, 'ability: Survivalist');
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		flags: {breakable: 1},
		name: "Survivalist",
		rating: 3,
		shortDesc: "Hit by Grass move or 1/3 chance at end of turn: +1 Atk, cures status; Grass immunity.",
	},
	desertshell: {
		onDamagingHit(damage, target, source, move) {
			this.field.setWeather('sandstorm');
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Desert Shell",
		rating: 1,
		shortDesc: "Shell Armor + Sand Spit",
	},
	stayinghydrated: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				move.accuracy = true;
				if (!target.addVolatile('stayinghydrated')) {
					this.add('-immune', target, '[from] ability: Staying Hydrated');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('stayinghydrated');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Staying Hydrated');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if ((move.type === 'Water' || move.type === 'Grass') && attacker.hasAbility('stayinghydrated')) {
					this.debug('Staying Hydrated boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if ((move.type === 'Water' || move.type === 'Grass') && attacker.hasAbility('stayinghydrated')) {
					this.debug('Staying Hydrated boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Staying Hydrated', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Staying Hydrated",
		rating: 3.5,
		shortDesc: "This Pokemon's Water/Grass attacks do 1.5x damage if hit by one Water move; Water immunity.",
	},
	sandsummons: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Summons boost');
					return this.chainModify([5325, 4096]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		flags: {},
		name: "Sand Summons",
		rating: 2.5,
		shortDesc: "Infiltrator + Sand Force",
	},
	glasshalffull: {
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
				this.add("-fail", target, "unboost", "[from] ability: Glass Half Full", "[of] " + target);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Glass Half Full');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Glass Half Full');
				}
				return this.effectState.target;
			}
		},
		flags: {breakable: 1},
		name: "Glass Half Full",
		rating: 2,
		shortDesc: "Clear Body + Storm Drain",
	},
	ghoulishgrip: {
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Ghoulish Grip');
				return false;
			}
		},
		flags: {breakable: 1},
		name: "Ghoulish Grip",
		rating: 2,
		shortDesc: "Cursed Body + Sticky Hold",
	},
	// collateral
	guarddog: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.boost({atk: 1}, target, target, null, false, true);
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				delete boost.spa;
				this.boost({atk: 1}, target, target, null, false, true);
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				delete boost.spe;
				this.boost({atk: 1}, target, target, null, false, true);
			}
		},
	},
	innerfocus: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', '[of] ' + target);
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Inner Focus', '[of] ' + target);
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Inner Focus', '[of] ' + target);
			}
		},
	},
	oblivious: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', '[of] ' + target);
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Oblivious', '[of] ' + target);
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Oblivious', '[of] ' + target);
			}
		},
	},
	owntempo: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', '[of] ' + target);
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Own Tempo', '[of] ' + target);
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Own Tempo', '[of] ' + target);
			}
		},
	},
	scrappy: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', '[of] ' + target);
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Special Attack', '[from] ability: Scrappy', '[of] ' + target);
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Scrappy', '[of] ' + target);
			}
		},
	},
	rattled: {
		inherit: true,
		onAfterBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal', 'Malocchio'].includes(effect.name) && boost.atk) {
				this.boost({spe: 1});
			}
			if (['Debilitate'].includes(effect.name) && boost.spa) {
				this.boost({spe: 1});
			}
			if (['Sink or Swim'].includes(effect.name) && boost.spe) {
				this.boost({spe: 1});
			}
		},
	},
	poisonpoint: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10) && !source.hasAbility('toxiccleansing')) {
					source.trySetStatus('psn', target);
				}
			}
		},
	},
	static: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10) && !source.hasAbility('toxiccleansing')) {
					source.trySetStatus('par', target);
				}
			}
		},
	},
	flamebody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10) && !source.hasAbility('toxiccleansing')) {
					source.trySetStatus('brn', target);
				}
			}
		},
	},
	effectspore: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) &&
				 !source.status &&
				 source.runStatusImmunity('powder') &&
				 !source.hasAbility('toxiccleansing')
				) {
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
	},
};
