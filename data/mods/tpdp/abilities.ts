export const Abilities: {[k: string]: ModdedAbilityData} = {
	absorbent: {
		name: "Absorbent",
		shortDesc: "When hit by a Light-type skill, damage is nullified and SpAtk is raised.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Lights') {
				if(!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Absorbent');
				}
				return null;
			}
		},
	},
	active: {
		name: "Active",
		shortDesc: "Immune to Stop status.",
		onUpdate(pokemon) {
			if (pokemon.status['stp']) {
				pokemon.cureStatus('stp');
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'stp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Active');
			}
			return false;
		},
	},
	adversewind: {
		name: "Adverse Wind",
		shortDesc: "Only Wind-type opponents can flee.",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasAbility("aircushion")) return;
			if (!pokemon.isAdjacent(this.effectState.target)) return;
			if (!pokemon.hasType("Wind")) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (pokemon.hasAbility("aircushion")) return;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.hasType("Wind")) {
				pokemon.maybeTrapped = true;
			}
		},
	},
	affinitytwist: {
		name: "Affinity Twist",
		shortDesc: "Both parties super effective and resisted elements are reversed.",
		onStart(target) {
			this.add('-ability', target, 'Affinity Twist');
		},
		onEffectiveness(typeMod) {
			return typeMod * -1;
		},
		onFoeEffectiveness(typeMod) {
			return typeMod * -1;
		},
	},
	aftermove: {
		name: "After Move",
		shortDesc: "Attack power is boosted by 30% if the user's Speed is lower than the target's.",
		onBasePower(basePower, pokemon, target) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (pokemon.getStat('spe') > target.getStat('spe')){
					this.debug('After Move boost');
					return this.chainModify(1.3);
				}
			}
		},
	},
	aggressive: {
		name: "Aggressive",
		shortDesc: "Adjusts offensive stats based on the foe's defensive stats.",
		onStart(pokemon) {
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
	},
	aircushion: {
		name: "Air Cushion",
		shortDesc: "When hit by an Earth-type skill, damage is nullified. Ignores Adverse Wind ability. Ignores mine/poison trap.",
		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded
	},
	antibody: {
		name: "Antibody",
		shortDesc: "Immune to Poison and Heavy Poison statuses.",
		onUpdate(pokemon) {
			if (pokemon.status['psn'] || pokemon.status['tox']) {
				pokemon.cureStatus(['psn', 'tox']);
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Antibody');
			}
			return false;
		},
	},
	appeasedspirit: {
		name: "Appeased Spirit",
		shortDesc: "When hit by a Nether-type skill, HP is restored.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Nether') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Appeased Spirit');
				}
				return null;
			}
		},
	},
	armorpurge: {
		name: "Armor Purge",
		shortDesc: "When hit by a FoAtk, FoDef decreases and Speed increases.",
		onDamagingHit(damage, target, source, move) {
			if (move.category === "Physical")
				this.boost({def: -1, atk: 1, spe: 1});
		},
	},
	ascertainment: {
		name: "Ascertainment",
		shortDesc: "Opponent's Ability does not boost their attacks.",
	},
	assault: {
		name: "Assault",
		shortDesc: "Attacks have a 10% chance of causing flinching.",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
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
	},
	astronomy: { 
		name: "Astronomy",
		shortDesc: "BU skills have 1.2x power.",
		onBasePower(relayVar, source, target, move) {
			if (move.flags.contact)
				this.chainModify(1.2);
		},
	},
	auroragrace: {
		name: "Aurora Grace",
		shortDesc: "During aurora, Sp.Def is increased by 50% and some HP is restored at the end of every turn.",
		onModifySpD(relayVar, target, source, move) {
			if (this.field.isWeather("aurora"))
				this.chainModify(1.5);
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (this.field.isWeather("aurora"))
				this.heal(pokemon.baseMaxhp / 16);
		},
	},
	autoheal: {
		name: "Auto Heal",
		shortDesc: "HP recovers every turn while not inflicted with a status ailment.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (!pokemon.status)
				this.heal(pokemon.baseMaxhp / 16);
		},
	},
	avarice: {
		name: "Avarice",
		shortDesc: "Afer KOing a Puppet: becomes Extra Yuuma-Avarice.",
		onFoeFaint(target, source, effect) {
			if (source.species.forme !== 'Avarice' && effect.effectType === "Move" && target !== source) {
				this.add('-activate', source, 'ability: Avarice');
				source.formeChange("Extra Yuuma-Avarice", this.effect, true);
				source.heal(source.baseMaxhp / 8);
			}
		},
	},
	badmedicine: {
		name: "Bad Medicine",
		shortDesc: "Enemies will be hurt when they try to use HP leaching skills on you. Ignores Poison Labyrinth ability.",
		onSourceTryHeal(damage, target, source, effect) {
			this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			const canOoze = ['drain', 'leechseed', 'strengthsap'];
			if (canOoze.includes(effect.id)) {
				this.damage(damage);
				return 0;
			}
		},
	},
	battlemania: {
		name: "Battle Mania",
		shortDesc: "Opponents that are Fighting-type cannot flee or swap out.",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Fightings'))
				pokemon.tryTrap(true);
		},
		onFoeMaybeTrapPokemon(pokemon, source?) {
			if (pokemon.hasType('Fightings'))
				pokemon.maybeTrapped = true;
		},
	},
	benefitoffire: {
		name: "Benefit of Fire",
		shortDesc: "When hit by a Fire-type skill, HP is restored.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fires') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Benefit of Fire');
				}
				return null;
			}
		},
	},
	bibliophilia: {
		name: "Bibliophilia",
		shortDesc: "When Extra Kosuzu is holding a youma scroll, a certain stat is doubled, and typing and ability is changed.",
		onStart(pokemon) {
			const youmascrolls = ["youmascrollred","youmascrollblue","youmascrollblack","youmascrollwhite"];
			if (!youmascrolls.includes(pokemon.item) || pokemon.species.id !== "extrakosuzu") return;

			this.add('-activate', pokemon, 'ability: Bibliophilia');
			switch (pokemon.item) {
				case "youmascrollred":
					pokemon.formeChange('Extra Kosuzu-Red', this.effect, true);
					break;
				case "youmascrollblue":
					pokemon.formeChange('Extra Kosuzu-Blue', this.effect, true);
					break;
				case "youmascrollblack":
					pokemon.formeChange('Extra Kosuzu-Black', this.effect, true);
					break;
				case "youmascrollwhite":
					pokemon.formeChange('Extra Kosuzu-White', this.effect, true);
					break;
			}
		},
	},
	boundaryblurrer: {
		name: "Boundary Blurrer",
		shortDesc: "During weather effects, FoAtk, FoDef, SpAtk, and SpDef are doubled.",
		onModifyAtk(relayVar, source, target, move) {
			if (this.field.weather)
				this.chainModify(2);
		},
		onModifyDef(relayVar, source, target, move) {
			if (this.field.weather)
				this.chainModify(2);
		},
		onModifySpA(relayVar, source, target, move) {
			if (this.field.weather)
				this.chainModify(2);
		},
		onModifySpD(relayVar, source, target, move) {
			if (this.field.weather)
				this.chainModify(2);
		},
	},
	boundarysavior: {
		name: "Boundary Savior",
		shortDesc: "During terrain effects, FoDef and SpDef are doubled. Will also recover from ailments at the end of each turn.",
		onModifyDef(relayVar, source, target, move) {
			if (this.field.terrain)
				this.chainModify(2);
		},
		onModifySpD(relayVar, source, target, move) {
			if (this.field.terrain)
				this.chainModify(2);
		},
		onResidual(target, source, effect) {
			if (this.field.terrain) {
				for (const foe of target.foes()) {
					foe.damage(foe.baseMaxhp / 8, target, this.effect);
				}
			}
		},
	},
	breather: {
		name: "Breather",
		shortDesc: "During calm, Fo.Def is increased by 50% and some HP is restored at the end of every turn.",
		onModifyDef(relayVar, source, target, move) {
			if (this.field.isWeather('calm'))
				this.chainModify(1.5);
		},
	},
	brightform: {
		name: "Bright Form",
		shortDesc: "Void-type skills are treated as Light-type skills.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Void')  {
				move.type = 'Lights';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.3);
		},
	},
	brutality: {
		name: "Brutality",
		shortDesc: "SpAtk is boosted by 50% but accuracy is cut by 20%.",
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.modify(spa, 1.5);
		},
		onSourceModifyAccuracyPriority: 7,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Special' && typeof accuracy === 'number') {
				return accuracy * 0.8;
			}
		},
	},
	bruteforce: {
		name: "Brute Force",
		shortDesc: "User is able to ignore the foe's ability, but unable to use items.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Brute Force');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
	},
	byakuteismetal: {
		name: "Byakutei's Metal",
		shortDesc: "Steel skills are 50% more powerful during Byakko. Fire-skill damage is halved.",
		onBasePower(relayVar, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;
			
			if (move.type === 'Steels' && this.field.isTerrain('byakko'))
				this.chainModify(1.5);
		},
		onDamage(damage, target, source, effect) {
			if (this.field.isTerrain('byakko') && effect.effectType === "Move" && effect.type === "Fire")
				this.chainModify(0.5);
		},
	},
	centralexpanse: {
		name: "Central Expanse",
		shortDesc: "During Kohryu, your skills ignore the foe's ability. The user may also use held items and Quick Eye.",
		onModifyMove(move) {
			if (this.field.isTerrain("kohryu"))
				move.ignoreAbility = true;
		},
		onFoeModifyBoost(boosts, pokemon) {
			if (!this.field.isTerrain("kohryu"))
				return;

			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
		},
	},
	chaosinduction: {
		name: "Chaos Induction",
		shortDesc: "Opponent has a 30% chance to become confused from any attack.",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'confusion') return;
				}
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'confusion',
				});
			}
		},
	},
	charge: {
		name: "Charge!",
		shortDesc: "Attack damage is boosted by 30%, but their secondary effects never occur.",
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;
			if (move.hasSheerForce)
				this.chainModify(1.3);
		},
	},
	choleric: {
		name: "Choleric",
		shortDesc: "The weather becomes Dust Storm.",
		onStart(source) {
			this.field.setWeather('duststorm');
		},
	},
	clearedmind: {
		name: "Cleared Mind",
		shortDesc: "Immune to Burn and Heavy Burn statuses.",
		onSetStatus(status, target, source, effect) {
			if (status.id === "brn" || status.id === "brnheavy")
				target.clearStatus();
		},
	},
	cloakofdarkness: {
		name: "Cloak of Darkness",
		shortDesc: "Restores HP when hit by a Dark-type skill and takes Damage against Light-type skills.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Darks' && !this.field.isTerrain('kohryu')) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Cloak of Darkness');
				}
				return null;
			}
		},
		onFoeBasePower(basePower, attacker, defender, move) {
			if (this.effectState.target !== defender) return;
			if (move.type === "Light")
				this.chainModify(1.25);
		},
		onWeather(target, source, effect) {
			if (effect.id === 'heavyfog') {
				target.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'aurora') {
				target.damage(target.baseMaxhp / 8, target, target);
			}
		},
	},
	collectomaniac: {
		name: "Collectomaniac",
		shortDesc: "If no item is held and you receive damage, you may take the foe's held item. Held items cannot be stolen.",
		onAfterMoveSecondary(target, source, move) {
			if (!source.item) {
				source.takeItem(target);
			}
		},
		onTakeItem(item, pokemon, source, move?) {
			return false;
		},
	},
	commonsenseless: {
		name: "Common Senseless",
		shortDesc: "Ignores type immunities when attacking.",
		onModifyMove(move) {
			move.ignoreImmunity = true;
		},
	},
	composed: {
		name: "Composed",
		shortDesc: "Immune to Upbeat.",
		rating: 2,
		onTryAddVolatile(status, target, source, effect) {
			if (['taunt'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Composed', '[of] ' + effectHolder);
				}
				return null;
			}
		},
	},
	counterstance: {
		name: "Counter Stance",
		shortDesc: "Damages the attacker when hit with a BU skill.",
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (move.flags.contact) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	curiosity: {
		name: "Curiosity",
		shortDesc: "Support skills receive +1 to their priority.",
		onModifyPriority(relayVar, source, target, move) {
			if (move.category === "Status")
				return relayVar + 1;
		},
	},
	cursereturn: {
		name: "Curse Return",
		shortDesc: "Reflects the effects of status skills back on the attacker.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || move?.category !== 'Status') {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target === source || move.hasBounced || move?.category !== 'Status') {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, this.effectState.target, source);
			return null;
		},
	},
	daredevil: {
		name: "Daredevil",
		shortDesc: "FoAtk is boosted by 50% but accuracy is cut by 20%.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.modify(atk, 1.5);
		},
		onSourceModifyAccuracyPriority: 7,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Physical' && typeof accuracy === 'number') {
				return accuracy * 0.8;
			}
		},
	},
	darkforce: {
		name: "Dark Force",
		shortDesc: "Opponent has 30% chance to become blinded from their focus attacks.",
		onDamagingHit(damage, target, source, move) {
			if (move.category === "Physical") {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('dark', target);
				}
			}
		},
	},
	deflective: {
		name: "Deflective",
		shortDesc: "Skills you're immune to will increase your Fo.Def and Sp.Def by one stage.",
		onImmunity(type, pokemon) {
			if (this.dex.types.isName(type)) {
				this.boost({def: 1, spd: 1});
			}
		},
	},
	deploysmoke: {
		name: "Deploy Smoke",
		shortDesc: "Lowers the opponent's FoAtk upon switch in.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!activated) {
					this.add('-ability', pokemon, 'Deploy Smoke', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
	},
	desolateform: {
		name: "Desolate Form",
		shortDesc: "Void-type skills are treated as Earth-type skills.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Void')  {
				move.type = 'Earths';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.3);
		},
	},
	desperation: {
		name: "Desperation",
		shortDesc: "When poisoned, FoAtk is boosted by 50%.",
		onModifyAtk(relayVar, source, target, move) {
			if (source.status["psn"]) {
				this.chainModify(1.5);
			}
		},
	},
	discourager: {
		name: "Discourager",
		shortDesc: "Reduces the opponent's FoAtk when hit by a skill that your barrier resists.",
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.category !== "Status" && typeMod < 0)
				target?.boostBy({atk: -1});
		},
	},
	disjointedblow: {
		name: "Disjointed Blow",
		shortDesc: "The power of super effective attacks is increased by 40%.",
		onModifyDamage(damage, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;
			
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(1.4);
			}
		},
	},
	disturber: {
		name: "Disturber",
		shortDesc: "Reduces the foe's FoAtk or SpAtk when hit by a skill that your barrier resists.",
		onEffectiveness(typeMod, target, type, move) {
			if (move && typeMod < 0) {
				if (move.category === "Physical")
					target?.boostBy({atk: -1});
				else if (move.category === "Special")
					target?.boostBy({spa: -1});
			}
		},
	},
	divinefestival: {
		name: "Divine Festival",
		shortDesc: "Status ailments are cured at the end of every turn during Sunshower.",
		onResidual(target, source, effect) {
			if (this.field.isWeather('sunshower')) {
				target.clearStatus();
			}
		},
	},
	divineprotection: {
		name: "Divine Protection",
		shortDesc: "Stats cannot be lowered by the enemy.",
		onBoost(boost, target, source, effect) {
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
				this.add("-fail", target, "unboost", "[from] ability: Divine Protection", "[of] " + target);
			}
		},
	},
	dreamworld: {
		name: "Dream World",
		shortDesc: "Stopped opponents take damage every turn.",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status['stp']) {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
	},
	drunkard: {
		name: "Drunkard",
		shortDesc: "Cannot attack consecutively, however it ignores the foe's ability.",
		onStart(pokemon) {
			pokemon.removeVolatile('drunkard');
			if (pokemon.activeTurns && (pokemon.moveThisTurnResult !== undefined || !this.queue.willMove(pokemon))) {
				pokemon.addVolatile('drunkard');
			}
		},
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.removeVolatile('drunkard')) {
				this.add('cant', pokemon, 'ability: Drunkard');
				return false;
			}
			pokemon.addVolatile('drunkard');
		},
		onModifyMove(move, pokemon, target) {
			move.ignoreAbility = true;
		},
		condition: {},
	},
	duel: {
		name: "Duel",
		shortDesc: "Neither you nor your opponent will be able to miss.",
		onModifyMove(move, pokemon, target) {
			move.accuracy = true;
		},
		onFoeModifyMove(move, pokemon, target) {
			move.accuracy = true;
		},
	},
	easternexpanse: {
		name: "Eastern Expanse",
		shortDesc: "During Seiryu, same-type skills are 33% stronger.",
		onBasePower(relayVar, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;

			if (this.field.isTerrain('seiryu') && source.hasType(move.type)) {
				this.chainModify([4,3]);
			}
		},
		onModifyMove(move) {
			if (this.field.isTerrain('seiryu')) move.ignoreImmunity = true;
		},
	},
	economist: {
		name: "Economist",
		shortDesc: "Charms may be restored after use. During calm, you will always restore them.",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather(['calm']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Economist');
				}
			}
		},
		rating: 2.5,
	},
	electrification: {
		name: "Electrification",
		shortDesc: "Opponent has 30% chance to become paralyzed from any attack.",
		onDamagingHit(damage, target, source, move) {
			if (this.randomChance(3, 10)) {
				source.trySetStatus('par', target);
			}
		},
	},
	electromagnetic: {
		name: "Electromagnetic",
		shortDesc: "When hit by an Electric-type skill, damage is nullified and SpAtk is raised.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electrics') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Electromagnetic');
				}
				return null;
			}
		},
	},
	emergencycure: {
		name: "Emergency Cure",
		shortDesc: "Recovers from status ailments when switching out.",
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
				if (!Object.values(species.abilities).includes('Emergency Cure')) {
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

				if (curPoke.hasAbility('naturalcure')) {
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
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Emergency Cure.)");

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

			pokemon.cureStatus();

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
	},
	empowered: {
		name: "Empowered",
		shortDesc: "EN skills have 1.2x power.",
		onBasePower(relayVar, source, target, move) {
			if (!move.flags.contact)
				this.chainModify(1.2);
		},
	},
	fasttalker: {
		name: "Fast Talker",
		shortDesc: "Two-turn skills can be used in one turn but have 0.9x power.",
		onBasePower(relayVar, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;
			if (move.volatileStatus === "twoturnmove") {
				this.chainModify(0.9);
			}
		},
		onBeforeMove(source, target, move) {
			if (move.volatileStatus === "twoturnmove") {
				delete move.volatileStatus;
			}
		},
	},
	finalform: {
		name: "Final Form",
		shortDesc: "Boosts same-type skills when HP is less than 1/3.",
		onBasePower(relayVar, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;

			if (source.hasType(move.type) && source.hp <= source.baseMaxhp / 3) {
				this.chainModify(1.5);
			}
		},
	},
	firsthit: {
		name: "First Hit",
		shortDesc: "Attack power is boosted by 20% when moving first.",
		onBasePower(basePower, pokemon, target) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;

			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('First Hit boost');
				return this.chainModify(1.2);
			}
		},
	},
	flaminggarment: {
		name: "Flaming Garment",
		shortDesc: "Opponent has a 30% chance to become burned from any attack.",
		onDamagingHit(damage, target, source, move) {
			if (this.randomChance(3, 10)) {
				source.trySetStatus('brn', target);
			}
		},
	},
	flash: {
		name: "Flash",
		shortDesc: "During aurora, Speed is doubled.",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather("aurora")) {
				this.chainModify(2);
			}
		},
	},
	flatspeed: {
		name: "Flat Speed",
		shortDesc: "Lowers increased priority skills to 0 for both sides.",
		onModifyPriorityPriority: -1,
		onModifyPriority(relayVar, source, target, move) {
			if (move.priority > 0)
				return 0;
		},
		onFoeModifyPriority(relayVar, source, target, move) {
			if (move.priority > 0)
				return 0;
		},
	},
	flawless: {
		name: "Flawless",
		shortDesc: "Evasion against status and stat changing skills is increased.",
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof accuracy === 'number') {
				this.debug('Flawless - setting accuracy to 50');
				return 50;
			}
		},
	},
	flexible: {
		name: "Flexible",
		shortDesc: "Immune to Paralysis and Shock statuses.",
		onSetStatus(status, target, source, effect) {
			if (status.id === "par" || status.id === "shk") {
				return false;
			}
		},
	},
	fogtraveler: {
		name: "Fog Traveler",
		shortDesc: "During heavy fog, Speed is doubled.",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('heavyfog')) {
				this.chainModify(2);
			}
		},
	},
	forceofnature: {
		name: "Force of Nature",
		shortDesc: "When hit by a Nature-type skill, damage is nullified and SpAtk is raised.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Nature') {
				if (!target.boostBy({spa: 1})) {
					this.add('-immune', target, '[from] ability: Cloak of Darkness');
				}
				return null;
			}
		},
	},
	forwarddash: {
		name: "Forward Dash",
		shortDesc: "The power of spread skills are doubled.",
		onBasePower(relayVar, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;

			if (move.category === "Special") {
				this.chainModify(2);
			}
		},
	},
	foxswedding: {
		name: "Fox's Wedding",
		shortDesc: "Doubles Speed during Sunshower.",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sunshower')) {
				this.chainModify(2);
			}
		},
	},
	frailhealth: {
		name: "Frail Health",
		shortDesc: "This Puppet can only be damaged by supereffective moves and indirect damage.",
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle' || move.type === "Dream" || this.field.isTerrain('kohryu'))
				return;
			this.debug('Frail Health immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Frail Health');
				}
				return null;
			}
		},
	},
	freewill: {
		name: "Free Will",
		shortDesc: "Immune to skill usage restrictions.",
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Free Will', '[of] ' + effectHolder);
				}
				return null;
			}
		},
	},
	fullpower: {
		name: "Full Power",
		shortDesc: "Skills are 20% more powerful, but takes damage every turn.",
		onModifyDamage(damage, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;

			return this.chainModify(1.2);
		},
		onAfterMoveSecondary(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag) {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.abilities.get('fullpower'));
			}
		},
	},
	gale: {
		name: "Gale",
		shortDesc: "When inflicted with an ailment, Speed is boosted 50%. Speed drop from paralysis is ignored.",
		//Para/Shock negation handled in respective conditions
		onModifySpe(spe, pokemon) {
			if (pokemon.status) {
				this.chainModify(1.5);
			}
		},
	},
	galeform: {
		name: "Gale Form",
		shortDesc: "Void-type skills are treated as Wind-type skills.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Void')  {
				move.type = 'Wind';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.3);
		},
	},
	generalsform: {
		name: "General's Form",
		shortDesc: "Void-type skills are treated as Fighting-type skills.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Void')  {
				move.type = 'Fightings';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.3);
		},
	},
	genteiswater: {
		name: "Gentei's Water",
		shortDesc: "Water skills are 50% more powerful during Genbu. Earth-skill damage is halved.",
		onBasePower(relayVar, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;
			
			if (move.type === 'Waters' && this.field.isTerrain('genbu'))
				this.chainModify(1.5);
		},
		onDamage(damage, target, source, effect) {
			if (this.field.isTerrain('genbu') && effect.effectType === "Move" && effect.type === "Earth")
				this.chainModify(0.5);
		},
	},
	ghostform: {
		name: "Ghost Form",
		shortDesc: "Void-type skills are treated as Nether-type skills.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Void')  {
				move.type = 'Nether';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.3);
		},
	},
	glamorous: {
		name: "Glamorous",
		shortDesc: "Reduces damage of attacks that penetrate your barrier.",
		onDamage(damage, target, source, effect) {
			if (effect.effectType === "Move" && this.dex.getEffectiveness(effect.type, target) > 0)
				this.chainModify(0.75);
		},
	},
	goodmanagement: {
		name: "Good Management",
		shortDesc: "Stat changes from skills and hold items are doubled.",
		onChangeBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= 2;
			}
		},
	},
	graceofwater: {
		name: "Grace of Water",
		shortDesc: "When hit by a Water-type skill, HP is restored.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Waters') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Grace of Water');
				}
				return null;
			}
		},
	},
	grandopening: {
		name: "Grand Opening",
		shortDesc: "This Puppet's Light moves have +1 priority.",
		onModifyPriority(relayVar, source, target, move) {
			if (move.type === "Light")
				return relayVar + 1;
		},
	},
	harassment: {
		name: "Harassment",
		shortDesc: "When your stats drop, so does the foe. When the foe's stats increase, your stats increase as well.",
		onAfterBoost(boost, target, source, effect) {
			console.log(target.name + " " + source.name + " " + effect);
			if (effect?.name === 'Harassment' || effect?.name === 'Bronze Mirror') return;
			const boostPlus = this.effectState.boosts;
			if(target.adjacentFoes().length == 0) return;
			const pokemon = this.sample(target.adjacentFoes());
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					boostPlus[i] = (boostPlus[i] || 0) + boost[i]!;
				}
			}
			this.boost(this.effectState.boosts, pokemon);
		},
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Harassment' || effect?.name === 'Bronze Mirror') return;
			if (!this.effectState.boosts) this.effectState.boosts = {} as SparseBoostsTable;
			const boostPlus = this.effectState.boosts;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					boostPlus[i] = (boostPlus[i] || 0) + boost[i]!;
				}
			}
		},
		onAnySwitchInPriority: -3,
		onAnySwitchIn() {
			if (!this.effectState.boosts || !this.effectState.target) return;
			console.log("1: " + this.effectState.boosts['spa'] + " " + this.effectState.target.name);
			this.boost(this.effectState.boosts, this.effectState.target);
			delete this.effectState.boosts;
			delete this.effectState.target;
		},
		onAnyAfterMove() {
			if (!this.effectState.boosts || !this.effectState.target) return;
			console.log("2: " + this.effectState.boosts['spa'] + " " + this.effectState.target.name);
			this.boost(this.effectState.boosts, this.effectState.target);
			delete this.effectState.boosts;
			delete this.effectState.target;
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (!this.effectState.boosts || !this.effectState.target) return;
			console.log("3: " + this.effectState.boosts['spa'] + " " + this.effectState.target.name);
			this.boost(this.effectState.boosts, this.effectState.target);
			delete this.effectState.boosts;
			delete this.effectState.target;
		},
		onEnd() {
			delete this.effectState.boosts;
			delete this.effectState.target;
		},
	},
	hateincarnate: {
		name: "Hate Incarnate",
		shortDesc: "Damages the opponent if fainting is caused by an attack of 70 or more BP.",
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && move.basePower >= 70)
				source.damage(source.baseMaxhp / 8);
		},
	},
	healingpower: {
		name: "Healing Power",
		shortDesc: "Recovers 1/3 of maximum HP when switching out.",
		onSwitchOut(pokemon) {
			if(!pokemon.status.includes('weak')) 
				pokemon.heal(pokemon.baseMaxhp / 3);
		},
	},
	hobgoblin: {
		name: "Hobgoblin",
		shortDesc: "Changes appearance to match that of the last Puppet in the party. Reverts after taking a hit.",
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (!pokemon.side.pokemon[i].fainted) break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			pokemon.illusion = pokemon.side.pokemon[i];
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.abilities.get('Hobgoblin'), target.abilityData, target, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Hobgoblin');
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
	},
	hothead: {
		name: "Hot Head",
		shortDesc: "FoAtk is increased after taking a critical hit.",
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move?.effectType === 'Move' && target.getMoveHitData(move).crit) {
				target.setBoost({atk: 6});
				this.add('-setboost', target, 'atk', 12, '[from] ability: Hot Head');
			}
		},
	},
	immovable: {
		name: "Immovable",
		shortDesc: "Immune to flinching.",
		onTryAddVolatile(status, target, source, sourceEffect) {
			if (status.id === "flinch")
				return false;
		},
	},
	imposingstance: {
		name: "Imposing Stance",
		shortDesc: "Damage is only received from skills.",
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== "Move")
				return false;
		},
	},
	impulsive: {
		name: "Impulsive",
		shortDesc: "Skills you're immune to will increase your Speed by one stage.",
		onImmunity(type, pokemon) {
			if (this.dex.types.isName(type))
				pokemon.boostBy({spd: 1});
		},
	},
	insync: {
		name: "In Sync",
		shortDesc: "When hit by an Warped-type skill, damage is nullified and any status ailment is cured.",
		onTryHit(source, target, move) {
			if (target !== source && move.type === "Warped") {
				if (!source.clearStatus()) {
					this.add('-immune', target, '[from] ability: In Sync');
				}
				return null;
			}
		},
	},
	indomitable: {
		name: "Indomitable",
		shortDesc: "Cannot be OHKO'd. Will not receive critical hits either.",
		onModifyCritRatioPriority: -1,
		onFoeModifyCritRatio(relayVar, source, target, move) {
			this.chainModify(0);
		},
		onTryHit(source, target, move) {
			if (move.ohko) {
				this.add('-immune', target, '[from] ability: Indomitable');
				return false;
			}
		},
	},
	infectious: {
		name: "Infectious",
		shortDesc: "Spreads Infection through attacks that are below 95 BP.",
		onAfterHit(source, target, move) {
			if (move.basePower <= 95) {
				this.add('-ability', source, 'Infectious');
				target.setAbility('infectious');
			}
		},
	},
	infiltration: {
		name: "Infiltration",
		shortDesc: "Attacks ignore defensive fields.",
		onModifyMove(move) {
			move.infiltrates = true;
		},
	},
	infinitechanges: {
		name: "Infinite Changes",
		shortDesc: "Changes type to match skill immediately before use.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.protean = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Infinite Changes');
			}
		},
	},
	insight: {
		name: "Insight",
		shortDesc: "Easier to score critical hits.",
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
	},
	instantwin: {
		name: "Instant Win",
		shortDesc: "Your speed is increased by 50% on the first turn after entering the field.",
		onModifySpe(spe, pokemon) {
			if (!pokemon.activeTurns) return this.chainModify(1.5);
		},
	},
	intuition: {
		name: "Intuition",
		shortDesc: "Blocks increased priority skills.",
		onTryHit(source, target, move) {
			if (move.priority > 0) {
				this.add('-immune', target, '[from] ability: Intuition');
				return false;
			}
		},
	},
	invalidate: {
		name: "Invalidate",
		shortDesc: "Removes the opponent's Ability on entry.",
		onSwitchIn(pokemon) {
			for (const foe of pokemon.foes()) {
				foe.addVolatile('gastroacid');
			}
		},
	},
	inversereaction: {
		name: "Inverse Reaction",
		shortDesc: "When hit by a Light or Dark-type skill only half the damage is taken.",
		onDamage(damage, target, source, effect) {
			if (effect.effectType === "Move" && (effect.type === "Light" || effect.type === "Dark")) {
				this.chainModify(0.5);
			}
		},
	},
	inversetoxin: {
		name: "Inverse Toxin",
		shortDesc: "When poisoned, HP is restored instead of lost. Ignores Poison Labyrinth ability.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
	},
	invigorative: {
		name: "Invigorative",
		shortDesc: "Skills you're immune to will increase your Fo.Atk by one stage.",
		onImmunity(type, pokemon) {
			if (this.dex.types.isName(type))
				pokemon.boostBy({atk: 1});
		},
	},
	ironresolve: {
		name: "Iron Resolve",
		shortDesc: "Cannot be forced to switch out.",
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Iron Resolve');
			return null;
		},
	},
	jamming: {
		name: "Jamming",
		shortDesc: "Reduces the opponent's Speed after receiving an attack of 80 or more BP.",
		onDamage(damage, target, source, effect) {
			if (target !== source && effect.effectType === "Move" && effect.basePower >= 80) {
				source.boostBy({spe: -1});
			}
		},
	},
	karmicretribution: {
		name: "Karmic Retribution", //SANS UNDERTALE?????????????
		shortDesc: "Damage the opponent after receiving an attack of 90 or more BP.",
		onDamage(damage, target, source, effect) {
			if (target !== source && effect.effectType === "Move" && effect.basePower >= 90) {
				this.add('-ability', target, 'Karmic Retribution');
				source.damage(source.baseMaxhp/8);
			}
		},
	},
	knownlimits: {
		name: "Known Limits",
		shortDesc: "Gives and receives less damage from skills that don't match the user's type.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (!attacker.types.includes(move.type)) {
				return this.chainModify(2, 3);
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (!attacker.types.includes(move.type)) {
				return this.chainModify(2, 3);
			}
		},
	},
	kouteisearth: {
		name: "Koutei's Earth",
		shortDesc: "Earth skills are 50% more powerful during Kohryu. Nature-skill damage is halved.",
		onBasePower(relayVar, source, target, move) {
			if (target.hasAbility('ascertainment'))
				return;
			
			if (move.type === 'Earths' && this.field.isTerrain('kohryu'))
				this.chainModify(1.5);
		},
		onDamage(damage, target, source, effect) {
			if (this.field.isTerrain('kohryu') && effect.effectType === "Move" && effect.type === "Nature")
				this.chainModify(0.5);
		},
	},
	lastdefense: {
		name: "Last Defense",
		shortDesc: "When inflicted with an ailment, FoDef is boosted by 50%.",
		onModifyDef(relayVar, target, source, move) {
			if (source.status)
				this.chainModify(1.5);
		},
	},
	lightcurtain: {
		name: "Light Curtain",
		shortDesc: "During aurora, you're immune to confusion and status ailments are healed at the end of every turn.",
		onResidual(target, source, effect) {
			if (this.field.isWeather('aurora')) {
				target.clearStatus();
			}
		},
		onTryAddVolatile(status, target, source, sourceEffect) {
			if (this.field.isWeather('aurora') && status.id === "confusion")
				return false;
		},
	},
	lucky: {
		name: "Lucky",
		shortDesc: "Secondary effects of skills have double the chance of occurring.",
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
	},
	maintenance: {
		name: "Maintenance",
		shortDesc: "30% chance to heal from ailments every turn.",
		onResidual(target, source, effect) {
			if (this.randomChance(3,10)) {
				if (target.clearStatus()) {
					this.add('-ability', target, 'Maintenance');
				}
			}
		},
	},
	mastersdefense: {
		name: "Master's Defense",
		shortDesc: "When hit by a Fighting-type skill, damage is nullified and FoAtk is raised.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fightings') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, "[from] ability: Master's Defense");
				}
				return null;
			}
		},
	},
	melancholic: {
		name: "Melancholic",
		shortDesc: "The weather becomes Heavy Fog.",
		onStart(target) {
			this.field.setWeather('heavyfog');
		},
	},
	metallurgy: {
		name: "Metallurgy",
		shortDesc: "When hit by a Steel-type skill, damage is nullified and FoAtk is raised.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Steels') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, "[from] ability: Metallurgy");
				}
				return null;
			}
		},
	},
	midnightform: {
		name: "Midnight Form",
		shortDesc: "Void-type skills are treated as Dark-type skills.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Void')  {
				move.type = 'Darks';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.3);
		},
	},
	mindlessdance: {
		name: "Mindless Dance",
		shortDesc: "2-3 turn skills have no special effects, but are 10% less powerful.",
		onBasePower(relayVar, source, target, move) {
			if (move.self && move.self.volatileStatus === "lockedmove") {
				this.chainModify(0.9);
				move.self.volatileStatus = null;
			}
		},
	},
	mindseye: {
		name: "Mind's Eye",
		shortDesc: "When inflicted with a status FoAtk is boosted by 50%. FoAtk drop from blindness is ignored.",
		rating: 3.5,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
	},
	miraclemallet: {
		name: "Miracle Mallet",
		shortDesc: "Defense Sukuna's FoAtk and FoDef are doubled.",
		onModifyAtk(relayVar, source, target, move) {
			this.chainModify(2);
		},
		onModifyDef(relayVar, source, target, move) {
			this.chainModify(2);
		},
	},
	modeshift: {
		name: "Mode Shift",
		shortDesc: "Changes Extra Rika's form when using attack skills. Reverts using Supernatural Border.",
		onBeforeMove(source, target, move) {
			if (move.category !== "Status" && source.species.id !== 'extrarikashift') {
				source.formeChange("Extra Rika-Shift", this.effect);
			}
			else if (move.id === "supernaturalborder" && source.species.id !== 'extrarika') {
				source.formeChange("Extra Rika", this.effect);
			}
		},
	},
	moody: {
		name: "Moody", //yeah
		shortDesc: "Every turn one random stat rises sharply and one random stat falls.",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			let stats: BoostID[] = [];
			const boost: SparseBoostsTable = {};
			let statPlus: BoostID;
			for (statPlus in pokemon.boosts) {
				if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
				if (pokemon.boosts[statPlus] < 6) {
					stats.push(statPlus);
				}
			}
			let randomStat: BoostID | undefined = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = 2;

			stats = [];
			let statMinus: BoostID;
			for (statMinus in pokemon.boosts) {
				if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
				if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
					stats.push(statMinus);
				}
			}
			randomStat = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = -1;

			this.boost(boost, pokemon, pokemon);
		},
	},
	moraleboost: {
		name: "Morale Boost",
		shortDesc: "When an opponent is KO'd, FoAtk is raised.",
		onFoeFaint(target, source, effect) {
			this.boost({atk: 1});
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		}
	},
	naturalform: {
		name: "Natural Form",
		shortDesc: "Void-type skills are treated as Nature-type skills.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Void')  {
				move.type = 'Nature';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.3);
		},
	},
	negativeaura: {
		name: "Negative Aura",
		shortDesc: "When hit by a Dark-type skill, damage is nullified and FoAtk is raised.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Darks') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Negative Aura');
				}
				return null;
			}
		},
	},
	niche: {
		name: "Niche",
		shortDesc: "The power boost from same-type attacks is even higher.",
		onModifyMove(move) {
			move.stab = 2;
		},
	},
	nimble: {
		name: "Nimble",
		shortDesc: "When a held charm is lost or consumed speed is doubled.",
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target) return;
			pokemon.addVolatile('nimble');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('nimble');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('nimble');
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(2);
				}
			},
		},
	},
	northernexpanse: {
		name: "Northern Expanse",
		shortDesc: "During Genbu, speed is halved.",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('genbu'))
				this.chainModify(0.5);
		},
	},
	ontheedge: {
		name: "On the Edge",
		shortDesc: "At 1 HP, Speed is tripled and attacks do 30% more damage.",
		onModifySpe(spe, pokemon) {
			if (pokemon.hp === 1)
				this.chainModify(3);
		},
		onBasePower(relayVar, source, target, move) {
			if (source.hp === 1)
				this.chainModify(1.3);
		},
	},
	optimist: {
		name: "Optimist",
		shortDesc: "Immune to confusion.",
		onTryAddVolatile(status, target, source, sourceEffect) {
			if (status.id === "confusion") {
				this.add('-immune', target, "[from] ability: Optimist");
				return false;
			}
		},
	},
	overcompensate: {
		name: "Overcompensate",
		shortDesc: "Draining skills absorb 30% more HP.",
	},
	overwhelm: {
		name: "Overwhelm",
		shortDesc: "Enemy Puppets cannot use charms.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Overwhelm');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Overwhelm');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onTryEatItem() {
			return !this.effectState.unnerved;
		},
	},
	peaceful: {
		name: "Peaceful",
		shortDesc: "Can always escape from battle. Trumps other locking abilities.",
		onTrapPokemonPriority: -1,
		onTrapPokemon(pokemon) {
			pokemon.trapped = false;
		},
		onMaybeTrapPokemon(pokemon) {
			pokemon.maybeTrapped = false;
		},
	},
	phalanx: {
		name: "Phalanx",
		shortDesc: "Adjusts defensive stats based on the foe's offensive stats.",
		onStart(pokemon) {
			let totalatk = 0;
			let totalspa = 0;
			for (const target of pokemon.foes()) {
				totalatk += target.getStat('atk', false, true);
				totalspa += target.getStat('spa', false, true);
			}
			if (totalatk && totalatk >= totalspa) {
				this.boost({def: 1});
			} else if (totalspa) {
				this.boost({spd: 1});
			}
		},
	},
	phlegmatic: {
		name: "Phlegmatic",
		shortDesc: "The weather becomes Calm.",
		onStart(target) {
			this.field.setWeather('calm');
		},
	},
	placid: {
		name: "Placid",
		shortDesc: "For 5 turns Power Yukari's SpAtk and Speed are cut in half. Ability changes to Serious, afterwards.",
		onStart(pokemon) {
			pokemon.addVolatile('placid');
		},
		condition: {
			duration: 5,
			onModifySpA(relayVar, source, target, move) {
				this.chainModify(0.5);
			},
			onModifySpe(relayVar, source) {
				this.chainModify(0.5);
			},
			onEnd(pokemon) {
				pokemon.setAbility('serious');
			},
		}
	},
	poisonbody: {
		name: "Poison Body",
		shortDesc: "After an attack, the opponent has a 30% chance to become poisoned.",
		onModifyMove(move) {
			if (!move || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.abilities.get('poisonbody'),
			});
		},
	},
	poisonlabyrinth: {
		name: "Poison Labyrinth",
		shortDesc: "Only Poison-type opponents can flee.",
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasType('Poisons') && !pokemon.hasAbility(['inversetoxin', 'strictdosage']))
				pokemon.tryTrap(true);
		},
		onFoeMaybeTrapPokemon(pokemon, source?) {
			if (!pokemon.hasType('Poisons') && !pokemon.hasAbility(['inversetoxin', 'strictdosage']))
				pokemon.maybeTrapped = true;
		},
	},
	poisonthorns: {
		name: "Poison Thorns",
		shortDesc: "Opponent has 30% chance to become poisoned from any attack.",
		onFoeDamagingHit(damage, target, source, move) {
			if (this.randomChance(3, 10)) {
				target.trySetStatus('psn', source);
			}
		},
	},
	pokerface: {
		name: "Poker Face",
		shortDesc: "Ignores the secondary skill effects from attackers.",
		onFoeModifySecondaries(secondaries, target, source, move) {
			return null;
		},
	},
	positive: {
		name: "Positive",
		shortDesc: "When a stat is decreased SpAtk is raised sharply.",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Competitive only affects stats lowered by foes.", true, source.side);
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
	},
	preciseaim: {
		name: "Precise Aim",
		shortDesc: "Accuracy cannot be lowered. Ignores the foe's Evasion modifiers. Never-miss attacks are 50% stronger.",
		onBasePower(relayVar, source, target, move) {
			if (move.accuracy === true) {
				this.chainModify(1.5);
			}
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Precise Aim", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
	},
	pride: {
		name: "Pride",
		shortDesc: "When inflicted with an ailment, SpAtk is boosted 50%. SpAtk drop from Fear is ignored.",
		onModifySpA(relayVar, source, target, move) {
			if (source.status) {
				this.chainModify(1.5);
			}
		},
	},
	projection: {
		name: "Projection",
		shortDesc: "Copies your opponent's ability during battle.",
		onStart(pokemon) {
			// n.b. only affects Hackmons
			// interaction with No Ability is complicated: https://www.smogon.com/forums/threads/pokemon-sun-moon-battle-mechanics-research.3586701/page-76#post-7790209
			if (pokemon.side.foe.active.some(foeActive => foeActive.ability === 'noability')) {
				this.effectState.gaveUp = true;
			}
			// interaction with Ability Shield is similar to No Ability
			if (pokemon.hasItem('Ability Shield')) {
				this.add('-block', pokemon, 'item: Ability Shield');
				this.effectState.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp) return;

			const additionalBannedAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode',
			];
			const possibleTargets = pokemon.side.foe.active.filter(target => (
				!target.getAbility().isPermanent && !additionalBannedAbilities.includes(target.ability)
			));
			if (!possibleTargets.length) return;

			const target = this.sample(possibleTargets);
			const ability = target.getAbility();
			if (pokemon.setAbility(ability)) {
				this.add('-ability', pokemon, ability, '[from] ability: Projection', '[of] ' + target);
			}
		},
	},
	quickeye: {
		name: "Quick Eye",
		shortDesc: "Allows you to see the held item and ability of the opponent.",
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Quick Eye', '[of] ' + pokemon, '[identify]');
					this.add('-ability', target, target.getAbility().name, '[from] ability: Quick Eye', '[of] ' + pokemon, '[identify]');
				}
			}
		},
	},
	recalibration: {
		name: "Recalibration",
		shortDesc: "During calm, SpAtk and SpDef are boosted by 50%.",
		onModifySpA(relayVar, source, target, move) {
			if (this.field.isWeather('calm'))
				this.chainModify(1.5);
		},
		onModifySpD(relayVar, source, target, move) {
			if (this.field.isWeather('calm'))
				this.chainModify(1.5);
		},
	},
	reckless: {
		name: "Reckless",
		shortDesc: "Damage dealt and recoil received by a recoil move is boosted by 20%.",
		onBasePower(relayVar, source, target, move) {
			if (move.recoil)
				this.chainModify(1.2);
		},
	},
	recoiloffset: {
		name: "Recoil Offset",
		shortDesc: "Does not receive recoil damage.",
		onModifyMove(move, pokemon, target) {
			if (move.recoil)
				delete move.recoil;
		},
	},
	reflectguard: {
		name: "Reflect Guard",
		shortDesc: "Damages the attacker when hit with a EN skill.",
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (!move.flags.contact) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	resonance: {
		name: "Resonance",
		shortDesc: "Status ailments are reflected onto opponents when inflicted.",
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (effect && effect.id === 'toxicspikes') return;
			this.add('-activate', target, 'ability: Resonance');
			source.setStatus(status, target);
		},
	},
	restraint: {
		name: "Restraint",
		shortDesc: "If the foe uses a switch-out skill, they are unable to switch for 2 turns.",
		onAnyModifyMove(move, pokemon) {
			if (pokemon.side === this.effectState.target.side) return;
			if (move.selfSwitch && !move.ignoreAbility) {
				delete move.selfSwitch;
				this.add('-message', `${pokemon.name} was restrained by ${this.effectState.target.name}!`);
				this.add('-message', `${pokemon.name} is competely restricted!`);
				pokemon.addVolatile('restraint');
			}
		},
		condition: {
			duration: 2,
			noCopy: true,
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onStart(target) {
				this.add('-activate', target, 'restraint', '[silent]');
			},
		},
	},
	reversefunction: {
		name: "Reverse Function",
		shortDesc: "Opponent's stat changes are reversed.",
		onFoeBoost(boost, target, source, effect) {
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
	},
	salvo: {
		name: "Salvo",
		shortDesc: "Multi-Hit attacks always hit the maximum amount of times.",
		onModifyMove(move) {
			if (move.multihit && Array.isArray(move.multihit) && move.multihit.length) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
	},
	sanddevil: {
		name: "Sand Devil",
		shortDesc: "During dust storm, Speed is doubled. No sand damage is received.",
		onImmunity(type, pokemon) {
			if (type === "duststorm")
				return false;
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('duststorm')) {
				this.chainModify(2);
			}
		},
	},
	sandforce: {
		name: "Sand Force",
		shortDesc: "During dust storm, Fo.Atk is boosted by 30%. No sand damage is received",
		onImmunity(type, pokemon) {
			if (type === "duststorm")
				return false;
		},
		onModifyAtk(atk, pokemon) {
			if (this.field.isWeather('duststorm')) {
				this.chainModify(1.3);
			}
		},
	},
	sandmask: {
		name: "Sand Mask",
		shortDesc: "During dust storm, Evasion is increased. No sand damage is received..",
		onImmunity(type, pokemon) {
			if (type === "duststorm")
				return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('duststorm')) {
				this.debug('Sand Mask - decreasing accuracy');
				return this.chainModify([4, 5]);
			}
		},
	},
	sanguine: {
		name: "Sanguine",
		shortDesc: "The weather becomes Aurora.",
		onStart(target) {
			this.field.setWeather('aurora');
		},
	},
	secretceremony: {
		name: "Secret Ceremony",
		shortDesc: "[Semi-functional placeholder] Changes type based on terrain and weather.",
		onStart(pokemon) {
			if (this.field.terrain) {
				pokemon.addVolatile('secretceremony');
			} else {
				const types = pokemon.baseSpecies.types;
				if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Secret Ceremony');
				this.hint("Transform Secret Ceremony changes you to your original un-transformed types.");
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectState.target;
			delete pokemon.volatiles['secretceremony'];
			pokemon.addVolatile('secretceremony');
		},
		condition: {
			onStart(pokemon) {
				let weatherType = null;
				let terrainType = null;
				switch (pokemon.effectiveWeather()) {
					case 'aurora':
						weatherType = 'Lights';
						break;
					case 'calm':
						weatherType = 'Wind';
						break;
					case 'duststorm':
						weatherType = 'Earths';
						break;
					case 'heavyfog':
						weatherType = 'Darks';
						break;
					case 'sunshower':
						weatherType = 'Warped';
						break;
				}
				switch (this.field.terrain) {
					case 'byakko':
						terrainType = 'Steels';
						break;
					case 'genbu':
						terrainType = 'Waters';
						break;
					case 'kohryu':
						terrainType = 'Earths';
						break;
					case 'seiryu':
						terrainType = 'Nature';
						break;
					case 'suzaku':
						terrainType = 'Fires';
						break;
				}
				
				let newTypes:string[] = [];
				if(terrainType) newTypes.push(terrainType);
				if (!newTypes.length || pokemon.getTypes().join() === newTypes || !pokemon.setType(newTypes)) return;
				if (newTypes.length > 1 && newTypes[1] === newTypes[0]) newTypes.pop(); //Ensure monotype during Dust Storm + Kohryu
				this.add('-start', pokemon, 'typechange', newTypes, '[from] ability: Secret Ceremony');
			},
			onUpdate(pokemon) {
				if (!this.field.terrain) {
					const types = pokemon.species.types;
					if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
					this.add('-activate', pokemon, 'ability: Secret Ceremony');
					this.add('-end', pokemon, 'typechange', '[silent]');
					pokemon.removeVolatile('secretceremony');
				}
			},
		},
	},
	seiteiswood: {
		name: "Seitei's Wood",
		shortDesc: "Nature skills are 50% more powerful during Seiryu. Steel-skill damage is halved.",
		onBasePower(relayVar, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;
			
			if (move.type === 'Nature' && this.field.isTerrain('seiryu'))
				this.chainModify(1.5);
		},
		onDamage(damage, target, source, effect) {
			if (this.field.isTerrain('seiryu') && effect.effectType === "Move" && effect.type === "Steel")
				this.chainModify(0.5);
		},
	},
	selfexorcism: {
		name: "Self Exorcism",
		shortDesc: "When hit by a Nether-type skill FoAtk is raised.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Nether') {
				this.add('-immune', target, '[from] ability: Self Exorcism');
				this.boost({atk: 1});
				return null;
			}
		},
	},
	serious: {
		name: "Serious",
		shortDesc: "Power Yukari's SpAtk and Speed increase one stage every turn.",
		onResidual(target, source, effect) {
			this.boost({spa: 1, spe: 1});
		},
	},
	sermon: {
		name: "Sermon",
		shortDesc: "Opponent has a 30% chance to become weakened from any attack.",
		onDamagingHit(damage, target, source, move) {
			if (this.randomChance(3, 10)) {
				source.trySetStatus('weak', target);
			}
		},
	},
	shadowstitch: {
		name: "Shadow Stitch",
		shortDesc: "The opponent cannot flee or swap Puppets.",
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.isAdjacent(this.effectState.target)) return;
			pokemon.tryTrap(true);
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			
			pokemon.maybeTrapped = true;
		},
	},
	silentrunning: {
		name: "Silent Running",
		shortDesc: "During Calm, Speed is doubled.",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('calm'))
				this.chainModify(2);
		},
	},
	sixthsense: {
		name: "Sixth Sense",
		shortDesc: "Notifies you of barrier-penetrating skills your foe knows.",
		onStart(target) {
			for (const foe of target.foes()) {
				for (const move of foe.moves) {
					if (this.dex.getEffectiveness(this.dex.moves.get(move), target) > 0) {
						this.add('-activate', foe, 'ability: Sixth Sense', this.dex.moves.get(move).name, '[of] ' + target, '[identify]');
					}
				}
			}
		},
	},
	skilledhand: {
		name: "Skilled Hand",
		shortDesc: "Ignores the resistances of enemy barriers.",
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Skilled Hand boost');
				return this.chainModify(2);
			}
		},
	},
	slowtempo: {
		name: "Slow Tempo",
		shortDesc: "Always attacks second but receive 10% less damage.",
		onFractionalPriority: -0.1,
		onDamage(damage, target, source, effect) {
			this.chainModify(0.9);
		},
	},
	smoothsailing: {
		name: "Smooth Sailing",
		shortDesc: "When hit by a Wind-type skill, damage is nullified and Speed is raised.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Wind') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Smooth Sailing');
				}
				return null;
			}
		},
	},
	sniper: {
		name: "Sniper",
		shortDesc: "Boosts the strength of critical hits.",
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
		},
	},
	someguts: {
		name: "Some Guts",
		shortDesc: "Damage the opponent after receiving an attack of 90 or more BP.",
		onDamage(damage, target, source, effect) {
			if (target !== source && effect.effectType === "Move" && effect.basePower >= 90) {
				source.damage(source.baseMaxhp/8);
			}
		},
	},
	soreloser: {
		name: "Sore Loser",
		shortDesc: "When a stat is decreased FoAtk is raised sharply.",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Competitive only affects stats lowered by foes.", true, source.side);
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
				this.boost({atk: 2}, target, target, null, false, true);
			}
		},
	},
	soundabsorb: {
		name: "Sound Absorb",
		shortDesc: "When hit by a Sound-type skill, damage is nullified, FoAtk is raised, and SpAtk is raised.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Sounds') {
				if (!this.boost({atk: 1, spa: 1})) {
					this.add('-immune', target, '[from] ability: Sound Absorb');
				}
				return null;
			}
		},
	},
	southernexpanse: {
		name: "Southern Expanse",
		shortDesc: "During Suzaku, your HP will recover a little bit each turn, ignoring Suzaku's effect.",
		onResidual(target, source, effect) {
			if (this.field.isTerrain('suzaku')) {
				this.heal(target.baseMaxhp / 16);
			}
		},
	},
	spiritofyang: {
		name: "Spirit of Yang",
		shortDesc: "When hit by an Electric, Light, or Illusion-type skill, Speed is raised.",
		onDamagingHit(damage, target, source, move) {
			const affectedTypes = ['Electrics', 'Lights', 'Illusion'];
			if (target !== source && affectedTypes.includes(move.type)) {
				this.chainModify(0.8);
				this.boost({spe: 1});
			}
		},
	},
	spiritofyin: {
		name: "Spirit of Yin",
		shortDesc: "When hit by a Dark, Nether, or Poison-type skill, Speed is raised.",
		onDamagingHit(damage, target, source, move) {
			const affectedTypes = ['Darks', 'Nether', 'Poisons'];
			if (target !== source && affectedTypes.includes(move.type)) {
				this.chainModify(0.8);
				this.boost({spe: 1});
			}
		},
	},
	stargazer: {
		name: "Stargazer",
		shortDesc: "Weather skills last forever.",
		//effect in conditions.ts
	},
	stimulative: {
		name: "Stimulative",
		shortDesc: "Skills you're immune to will increase your Sp.Atk by one stage.",
		onImmunity(type, pokemon) {
			if (this.dex.types.isName(type))
				this.boost({spa: 1});
		},
	},
	stonestacker: {
		name: "Stone Stacker",
		shortDesc: "Status skills activate twice.",
		onModifyMove(move, pokemon, target) {
			if (move.category === "Status") {
				if (move.multiaccuracy)
					delete move.multiaccuracy;
				move.multihit = 2;
			}
		},
	},
	strangerainbow: {
		name: "Strange Rainbow",
		shortDesc: "Boosts FoAtk by 30% during Sunshower.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (this.field.isWeather(['sunshower'])) {
				return this.chainModify(1.3);
			}
		},
	},
	strategist: {
		name: "Strategist",
		shortDesc: "Attacks with a base power of 60 or below are boosted by 50%.",
		onBasePower(relayVar, source, target, move) {
			if (move.basePower <= 60)
				this.chainModify(1.5);
		},
	},
	streamform: {
		name: "Stream Form",
		shortDesc: "Void-type skills are treated as Water-type skills.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Void')  {
				move.type = 'Waters';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.3);
		},
	},
	strictdosage: {
		name: "Strict Dosage",
		shortDesc: "When hit by a Poison-type skill, HP is restored. Ignores poison trap. Ignores Poison Labyrinth ability.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poisons') {
				this.add('-immune', target, '[from] ability: Strict Dosage');
				this.heal(target.baseMaxhp / 4);
				return null;
			}
		},
	},
	strongsmile: {
		name: "Strong Smile",
		shortDesc: "Opponent has a 30% chance to become afraid from their spread attacks.",
		onFoeDamagingHit(damage, target, source, move) {
			if (this.randomChance(3, 10)) {
				target.trySetStatus('fear', source);
			}
		},
	},
	stubborn: {
		name: "Stubborn", //TODO - what are the "certain skills" prevented
		shortDesc: "Cannot be OHKO'd. Neither of you can use certain skills either.",
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Stubborn');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Stubborn');
				return target.hp - 1;
			}
		},
	},
	supine: {
		name: "Supine",
		shortDesc: "The weather becomes Sun Shower.",
		onStart(target) {
			this.field.setWeather('sunshower');
		},
	},
	suppression: {
		name: "Suppression",
		shortDesc: "When hit by an enemy skill there is a 30% chance to seal it.",
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (!move.isMax && !move.isFutureMove && move.id !== 'struggle') {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
	},
	surprisetactics: {
		name: "Surprise Tactics",
		shortDesc: "During heavy fog, SpAtk is boosted by 50%. Damage is received at the end of the turn.",
		onModifySpA(relayVar, source, target, move) {
			if (this.field.isWeather('heavyfog')) {
				this.chainModify(1.5);
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (this.field.isWeather('heavyfog')) {
				source.damage(source.baseMaxhp/8);
			}
		},
	},
	suteisfire: {
		name: "Sutei's Fire",
		shortDesc: "Fire skills are 50% more powerful during Suzaku. Water-skill damage is halved.",
		onBasePower(relayVar, source, target, move) {
			if (target.hasAbility('ascertainment') || this.field.isTerrain('kohryu'))
				return;
			
			if (move.type === 'Fires' && this.field.isTerrain('suzaku'))
				this.chainModify(1.5);
		},
		onDamage(damage, target, source, effect) {
			if (this.field.isTerrain('suzaku') && effect.effectType === "Move" && effect.type === "Water")
				this.chainModify(0.5);
		},
	},
	telescopic: {
		name: "Telescopic",
		shortDesc: "Accuracy is boosted by 30%.",
		onModifyAccuracy(relayVar, target, source, move) {
			this.chainModify(1.3);
		},
	},
	threebodies: {
		name: "Three Bodies",
		shortDesc: "Extra Hecatia's Form changes based on the class of skills used.",
		onBeforeMove(source, target, move) {
			switch (move.category) {
				case "Status":
					if (source.species.id !== "extrahecatia") {
						this.add('-activate', source, 'ability: Three Bodies');
						source.formeChange("Extra Hecatia");
					}
					break;
				case "Physical":
					if (source.species.id !== "extrahecatiaearth") {
						this.add('-activate', source, 'ability: Three Bodies');
						source.formeChange("Extra Hecatia-Earth");
					}
					break;
				case "Special":
					if (source.species.id !== "extrahecatiamoon") {
						this.add('-activate', source, 'ability: Three Bodies');
						source.formeChange("Extra Hecatia-Moon");
					}
					break;
			}
		},
	},
	timegazer: {
		name: "Timegazer",
		shortDesc: "Terrain skills last 8 turns.",
		//Implemented in conditions.ts for each terrain condition
	},
	trueadmin: {
		name: "True Admin",
		shortDesc: "When HP is less than half FoAtk and SpAtk are halved.",
		onModifyAtk(relayVar, pokemon) {
			if (pokemon.hp <= pokemon.baseMaxhp / 2) {
				this.chainModify(0.5);
			}
		},
		onModifySpA(relayVar, pokemon) {
			if (pokemon.hp <= pokemon.baseMaxhp / 2) {
				this.chainModify(0.5);
			}
		},
	},
	twoofakind: {
		name: "Two of a Kind",
		shortDesc: "The power of skills go down by 40%, but you will do an additional attack.",
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if(!this.field.isTerrain("kohryu")) return this.chainModify(0.6);
		},
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct) return;
			if (['dynamaxcannon', 'endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				if (move.multihit) { //Unline Parental Bond, Two of a Kind adds an additional hit to multihits
					if (typeof move.multihit !== 'number') {
						for (let i = 0; i < move.multihit.length; i++) {
							move.multihit[i]++;
						}
					}
					else {
						move.multihit++;
					}
				}
				else {
					move.multihit = 2;
				}
			}
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'twoofakind' && move.hit < 2) {
				if (move.recoil)
					delete move.recoil;
				if (move.secondaries)
					delete move.secondaries;
			}
		},
	},
	unbound: {
		name: "Unbound",
		shortDesc: "Attacks ignore the foe's ability.",
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
	},
	uniqueshield: {
		name: "Unique Shield",
		shortDesc: "Only receive half damage from Focus Attacks.",
		onDamage(damage, target, source, effect) {
			if (effect.effectType === "Move" && effect.category === "Physical") {
				this.chainModify(0.5);
			}
		},
	},
	unjustness: {
		name: "Unjustness",
		shortDesc: "The enemy's SP consumption is increased by +1.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Unjustness');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
	},
	unwaveringheart: {
		name: "Unwavering Heart",
		shortDesc: "When hit by an Illusion-type skill, damage is nullified and any status ailment is cured.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Illusion') {
				if(!target.clearStatus()){
					this.add('-immune', target, '[from] ability: Unwavering Heart');
				}
				return null;
			}
		},
	},
	unyieldingform: {
		name: "Unyielding Form",
		shortDesc: "Void-type skills are treated as Steel-type skills.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Void')  {
				move.type = 'Steels';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.3);
		},
	},
	uptempo: {
		name: "Up Tempo",
		shortDesc: "Speed increases every turn.",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
	},
	usurpation: {
		name: "Usurpation",
		shortDesc: "Inverts the stat changes.",
		onChangeBoost(boost, target, source, effect) {
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
		flags: {breakable: 1},
	},
	vanishingact: {
		name: "Vanishing Act",
		shortDesc: "During heavy fog, evasion is increased.",
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather(['heavyfog'])) {
				this.debug('Vanishing Act - decreasing accuracy');
				return this.chainModify(0.8);
			}
		},
	},
	vigorous: {
		name: "Vigorous",
		shortDesc: "Takes half the turns to return from stop status.",
		// Implemented in conditions.js
	},
	visionbonus: {
		name: "Vision Bonus",
		shortDesc: "Boosts the power of Illusion skills by 40%.",
		onBasePowerPriority: 10,
		onBasePower(relayVar, source, target, move) {
			if (move.type === "Illusion") {
				this.chainModify(1.4);
			}
		},
	},
	wariness: {
		name: "Wariness",
		shortDesc: "Disables skills with 50 or less BP.",
		onTryHitPriority: 30,
		onTryHit(source, target, move) {
			if (source !== target && move.category !== 'Status' && move.basePower <= 50) {
				this.add('-immune', source, '[from] ability: Wariness');
				return false;
			}
		},
	},
	warningshot: {
		name: "Warning Shot",
		shortDesc: "Lowers the opponent's SpAtk upon switch in.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!activated) {
					this.add('-ability', pokemon, 'Warning Shot', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
	},
	wasteful: {
		name: "Wasteful",
		shortDesc: "Effects of held items are ignored.",
		onStart(pokemon) {
			this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
		},
	},
	weatherresist: {
		name: "Weather Resist",
		shortDesc: "This Puppet is immune to the effects of weather.",
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectState.switchingIn) {
				this.add('-ability', pokemon, 'Weather Resist');
				this.effectState.switchingIn = false;
			}
			this.eachEvent('WeatherChange', this.effect);
		},
		onEnd(pokemon) {
			this.eachEvent('WeatherChange', this.effect);
		},
		suppressWeather: true,
	},
	werehakutaku: {
		name: "Were-Hakutaku",
		shortDesc: "When Defense Keine HP is less than half your form is changed.",
		onUpdate(pokemon) {
			if (pokemon.species.forme !== "Hakutaku" && pokemon.hp <= pokemon.baseMaxhp / 2) {
				pokemon.formeChange("Defense Keine-Hakutaku");
			}
		},
	},
	westernexpanse: {
		name: "Western Expanse",
		shortDesc: "During Byakko, 100 acc skills power increases by 20%, no-miss skills power increases by 50%.",
		onBasePower(relayVar, source, target, move) {
			if (this.field.isTerrain("byakko")) {
				if (move.accuracy === 100) {
					this.chainModify(1.2);
				}
				else if (move.accuracy === true) {
					this.chainModify(1.5);
				}
			}
		},
	},
	wisdomeye: {
		name: "Wisdom Eye",
		shortDesc: "Attacks ignore the opponent's stat gains other than speed.",
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
	},
	worrywart: {
		name: "Worrywart",
		shortDesc: "When HP is less than half the held charm is used.",
		onStart(pokemon) {
			pokemon.abilityState.gluttony = true;
		},
		onDamage(item, pokemon) {
			pokemon.abilityState.gluttony = true;
		},
	},
	yatanokagami: {
		name: "Yata no Kagami",
		shortDesc: "Takes half damage when at full HP.",
		onDamage(damage, target, source, effect) {
			if (target.hp === target.baseMaxhp)
				this.chainModify(0.5);
		},
	},
	zen: {
		name: "Zen",
		shortDesc: "During calm, the user is immune to status ailments and recovers some HP at the end of every turn.",
		onSetStatus(status, target, source, effect) {
			if (this.field.isWeather("calm")) {
				target.clearStatus();
			}
		},
		onResidual(target, source, effect) {
			if (this.field.isWeather("calm")) {
				target.heal(target.baseMaxhp / 16);
			}
		},
	},
};
