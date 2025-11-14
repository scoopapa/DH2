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
			if (['Intimidate', 'Fairy Portal'].includes(effect.name) && boost.atk) {
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
			if (['Intimidate', 'Fairy Portal'].includes(effect.name) && boost.atk) {
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
			if (['Intimidate', 'Fairy Portal'].includes(effect.name) && boost.atk) {
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
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
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
	// collateral
	guarddog: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Fairy Portal'].includes(effect.name) && boost.atk) {
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
			if (['Intimidate', 'Fairy Portal'].includes(effect.name) && boost.atk) {
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
			if (['Intimidate', 'Fairy Portal'].includes(effect.name) && boost.atk) {
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
			if (['Intimidate', 'Fairy Portal'].includes(effect.name) && boost.atk) {
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
			if (['Intimidate', 'Fairy Portal'].includes(effect.name) && boost.atk) {
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
			if (['Intimidate', 'Fairy Portal'].includes(effect.name) && boost.atk) {
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
