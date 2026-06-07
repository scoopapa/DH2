export const Abilities: {[k: string]: ModdedAbilityData} = {
	adrenaline: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length, spa: length}, source);
			}
		},
		flags: {},
		name: "Adrenaline",
		shortDesc: "Raises this Yo-kai's Strength and Spirit by 1 when KOing another Yo-kai.",
    	desc: "This Yo-kai's Strength and Spirit are raised by 1 stage when it attacks and KOes another Yo-kai.",
	},
	alpha: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['omega'])) {
					return this.chainModify(1.5);
				}
			}
		},
		flags: {},
		name: "Alpha",
		shortDesc: "This Yo-kai's Spirit is 1.5x if an active ally has the Omega ability.",
    	desc: "This Yo-kai's Spirit is 1.5x if an active ally has the Omega ability.",
	},
	annoyance: {
		onStart(pokemon) {
			pokemon.addVolatile('annoyance');
		},
		condition: {
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				if (this.randomChance(1, 4)) {
					const allies = pokemon.adjacentAllies();
					if (!allies.length) return;
					const allyTarget = this.sample(allies);
					this.add('-message', `${pokemon.name} got annoyed and attacked an ally!`);
					this.actions.useMove('slash', pokemon, allyTarget);
				}
			}
		},
		flags: {},
		name: "Annoyance",
		shortDesc: "This Yo-kai has a 25% chance to attack an adjacent ally after moving.",
    	desc: "This Yo-kai has a 25% chance to attack a random adjacent ally after using a move.",
	},
	bladedbody: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.add('-activate', this.effectState.target, 'ability: Bladed Body');
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Bladed Body",
		shortDesc: "Yo-kai hitting this Yo-kai with a physical attack lose 1/8 of their max HP.",
    	desc: "Yo-kai hitting this Yo-kai with a physical attack lose 1/8 of their max HP.",
	},
	blazingspirit: {
		onAllyFaint(target) {
			const pokemon = this.effectState.target;
			if (pokemon.fainted) return;
			this.add('-activate', this.effectState.target, 'ability: Blazing Spirit');
        	this.boost({atk: 1, spa: 1}, pokemon);
			this.add('-message', `${pokemon.name} has hardened its resolve!`);
		},
		flags: {},
		name: "Blazing Spirit",
		shortDesc: "Raises this Yo-kai's Strength and Spirit by 1 when an ally faints.",
    	desc: "This Yo-kai's Strength and Spirit are raised by 1 stage when an ally faints.",
	},
	blessedbody: {
		onFaint(pokemon) {
			this.add('-ability', pokemon, 'Blessed Body');
			this.add('-message', `${pokemon.name}'s Blessed Body healed its allies!`);
			for (const ally of pokemon.side.active) {
				if (!ally || ally.fainted) continue;
				this.heal(Math.floor(ally.maxhp / 3), ally);
			}
		},
		flags: {},
		name: "Blessed Body",
		shortDesc: "When this Yo-kai faints, its active allies recover 1/3 of their max HP.",
    	desc: "When this Yo-kai faints, its active allies recover 1/3 of their max HP.",
	},
	blocker: {
		onStart(pokemon) {
			this.actions.useMove('guard', pokemon);
		},
		flags: {},
		name: "Blocker",
		shortDesc: "This Yo-kai Guards on switchin.",
    	desc: "When switching in, this Yo-kai uses the move Guard.",
	},
	bronzeguard: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying' || move.type === 'Rock') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying' || move.type === 'Rock') {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Bronze Guard",
		shortDesc: "This Yo-kai takes halved damage from Flying and Rock attacks.",
    	desc: "Halves the damage this Yo-kai takes from Flying and Rock-type attacks, including elemental attacks.",
	},
	brothersvow: {
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				if (ally.hasAbility('brothersvow')) {
					this.add('-ability', pokemon, 'Brother\'s Vow');
					this.add('-message', `${pokemon.name} and ${ally.name} share a Brother's Vow!`);
				}
			}
		},
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && attacker.hasAbility('brothersvow')) {
				const source = this.effectState.target;
				if (source.adjacentAllies().includes(attacker)) {
					this.debug('Brother\'s Vow boost');
					return this.chainModify(1.5);
				}
			}
		},
		onAllyModifyDefPriority: 6,
		onAllyModifyDef(def, pokemon) {
			if (pokemon !== this.effectState.target && pokemon.hasAbility('brothersvow')) {
				const source = this.effectState.target;
				if (source.adjacentAllies().includes(pokemon)) {
					this.debug('Brothers Vow boost');
					return this.chainModify(1.5);
				}
			}
		},
		onAllyModifySpePriority: 6,
		onAllyModifySpe(spe, pokemon) {
			if (pokemon !== this.effectState.target && pokemon.hasAbility('brothersvow')) {
				const source = this.effectState.target;
				if (source.adjacentAllies().includes(pokemon)) {
					this.debug('Brothers Vow boost');
					return this.chainModify(1.5);
				}
			}
		},
		flags: {},
		name: "Brother's Vow",
		shortDesc: "Adjacent allies with the same ability have all stats boosted by 1.5x.",
    	desc: "Adjacent allies with the same ability have their Strength, Spirit, Defense, and Speed boosted by 1.5x.",
	},
	careless: {
		onSourceModifyCritRatio(critRatio, source, target) {
			return critRatio + 1;
		},
		flags: {},
		name: "Careless",
		shortDesc: "This Yo-kai is more likely to be dealt critical hits.",
    	desc: "Attacks targeting this Yo-kai have their critical hit ratio increased by 1.",
	},
	caring: {
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			const allies = pokemon.adjacentAllies();
			if (!allies.length) return;
			this.add('-activate', this.effectState.target, 'ability: Caring');
			for (const ally of allies) {
				this.heal(Math.floor(ally.baseMaxhp / 16), ally, pokemon);
			}
		},
		flags: {},
		name: "Caring",
		shortDesc: "Restores the HP of adjacent allies by 1/16 at end of turn.",
    	desc: "This Yo-kai restores the HP of adjacent allies by 1/16 at the end of each turn.",
	},
	courageousspirit: {
		onAllyFaint(target) {
			const pokemon = this.effectState.target;
			if (pokemon.fainted) return;
			this.add('-activate', this.effectState.target, 'ability: Courageous Spirit');
        	this.boost({atk: 1, spa: 1}, pokemon);
			this.add('-message', `${pokemon.name} has hardened its resolve!`);
		},
		flags: {},
		name: "Courageous Spirit",
		shortDesc: "Raises this Yo-kai's Strength and Spirit by 1 when an ally faints.",
    	desc: "This Yo-kai's Strength and Spirit are raised by 1 stage when an ally faints.",
	},
	cursedskin: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (Object.keys(pokemon.volatiles).some(v => {
				const condition = this.dex.conditions.get(v);
				return (condition as any).isInspirit === true && (condition as any).isGood === false;
			})) return this.chainModify(1.5);
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (Object.keys(pokemon.volatiles).some(v => {
				const condition = this.dex.conditions.get(v);
				return (condition as any).isInspirit === true && (condition as any).isGood === false;
			})) return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (Object.keys(pokemon.volatiles).some(v => {
				const condition = this.dex.conditions.get(v);
				return (condition as any).isInspirit === true && (condition as any).isGood === false;
			})) return this.chainModify(1.5);
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (Object.keys(pokemon.volatiles).some(v => {
				const condition = this.dex.conditions.get(v);
				return (condition as any).isInspirit === true && (condition as any).isGood === false;
			})) return this.chainModify(1.5);
		},
		onModifySpePriority: 6,
		onModifySpe(spe, pokemon) {
			if (Object.keys(pokemon.volatiles).some(v => {
				const condition = this.dex.conditions.get(v);
				return (condition as any).isInspirit === true && (condition as any).isGood === false;
			})) return this.chainModify(1.5);
		},
		flags: {},
		name: "Cursed Skin",
		shortDesc: "All of this Yo-kai's stats are increased by 1.5x when Inspirited by a foe.",
		desc: "This Yo-kai's Strength, Spirit, Defense, and Speed are increased by 1.5x when it is afflicted by a negative Inspirit.",
	},
	deathsphere: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Death Sphere');
			this.add('-message', `${pokemon.name}'s Death Sphere covers the field!`);
		},
		onAnyTryHeal(damage, target, source, effect) {
			return Math.floor(damage / 2);
		},
		flags: {},
		name: "Death Sphere",
		shortDesc: "Halves the effectiveness of all healing while this Yo-kai is active.",
    	desc: "Halves the effectiveness of all healing while this Yo-kai is active.",
	},
	dodge: {
		onTryHit(pokemon, target, move) {
			if (move.flags['soultimate'] && !pokemon.isAlly(target)) {
				this.add('-immune', pokemon, '[from] ability: Dodge');
				return null;
			}
		},
		flags: {},
		name: "Dodge",
		shortDesc: "This Yo-kai is immune to foes' Soultimate moves.",
    	desc: "This Yo-kai is immune to foes' Soultimate moves.",
	},
	dragonforce: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Dragon Force boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Dragon Force boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Dragon Force",
		shortDesc: "This Yo-kai's Strength and Spirit are 1.5x when it is below 1/3 max HP.",
    	desc: "This Yo-kai's Strength and Spirit are 1.5x when it is below 1/3 max HP.",
	},
	endurance: {
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.shieldBoost) return;
			if (damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Endurance');
				target.shieldBoost = true;
				return target.hp - 1;
			}
		},
		flags: {},
		name: "Endurance",
		shortDesc: "This Yo-kai will survive an attack with 1 HP once per battle.",
    	desc: "This Yo-kai will survive an attack with 1 HP once per battle.",
	},
	equipmentforbidden: {
		onStart(source) {
			this.add('-ability', source, 'Equipment Forbidden!');
			for (const pokemon of source.side.foe.active) {
				if (!pokemon.volatiles['embargo']) {
					pokemon.addVolatile('embargo');
				}
			}
			for (const pokemon of source.side.active) {
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
		flags: {},
		name: "Equipment Forbidden!",
		shortDesc: "While this Yo-kai is active, held items have no effect.",
    	desc: "While this Yo-kai is active, held items have no effect.",
	},
	extremecritical: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Extreme Critical boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Extreme Critical",
		shortDesc: "This Yo-kai's critical hits deal 2x damage instead of 1.5x.",
    	desc: "This Yo-kai's critical hits deal 2x damage instead of 1.5x.",
	},
	eyesighta: {
		onModifyAccuracyPriority: 1,
		onModifyAccuracy(accuracy) {
			return true;
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		flags: {},
		name: "Eyesight A",
		shortDesc: "This Yo-kai's attacks cannot miss or be redirected.",
    	desc: "This Yo-kai's attacks cannot miss or be redirected.",
	},
	fireplay: {
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(1.2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Fire Play",
		shortDesc: "This Yo-kai's Fire attacks deal 1.2x damage.",
    	desc: "This Yo-kai's Fire attacks deal 1.2x damage.",
	},
	firewatchout: {
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
		flags: {},
		name: "Fire Watchout",
		shortDesc: "This Yo-kai takes halved damage from Fire attacks.",
    	desc: "Halves the damage this Yo-kai takes from Fire-type attacks, including elemental attacks.",
	},
	forgottoguard: {
		onAnyTryMove(target, source, effect) {
			if (['guard'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Forgot to Guard', effect, '[of] ' + target);
				return false;
			}
		},
		flags: {},
		name: "Forgot to Guard",
		shortDesc: "Yo-kai cannot Guard while this Yo-kai is active.",
    	desc: "Prevents Yo-kai from using Guard while this Yo-kai is active.",
	},
	gambler: {
		onModifyCritRatio(critRatio) {
			return critRatio + 2;
		},
		onSourceModifyCritRatio(critRatio, source, target) {
			return critRatio + 1;
		},
		flags: {},
		name: "Gambler",
		shortDesc: "This Yo-kai's crit ratio is +2, Yo-kai targeting it have +1 crit ratio.",
    	desc: "Attacks used by this Yo-kai have their critical hit ratio increased by 2. Attacks targeting this Yo-kai have their critical hit ratio increased by 1.",
	},
	gassysphere: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Gassy Sphere');
			this.add('-message', `${pokemon.name} smells horrible! Nobody wants to go near it!`);
		},
		onAnyModifyAccuracyPriority: 1,
		onAnyModifyAccuracy(accuracy, target, source) {
			if (typeof accuracy !== 'number') return;
			if (target !== this.effectState.target) return;
			this.debug('Gassy Sphere - decreasing accuracy');
			return this.chainModify(0.5);
		},
		flags: {},
		name: "Gassy Sphere",
		shortDesc: "Attacks targeting this Yo-kai have their Accuracy halved.",
    	desc: "Attacks targeting this Yo-kai have their Accuracy halved.",
	},
	glossyskin: {
		onCriticalHit: false,
		flags: {},
		name: "Glossy Skin",
		shortDesc: "This Yo-kai cannot be critical hit.",
    	desc: "This Yo-kai cannot be critical hit.",
	},
	goldguard: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric' || move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric' || move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Gold Guard",
		shortDesc: "This Yo-kai takes halved damage from Electric and Water attacks.",
    	desc: "Halves the damage this Yo-kai takes from Electric and Water-type attacks, including elemental attacks.",
	},
	goodfortune: {
		onAnyAccuracy(accuracy, target, source, move) {
			if (target === this.effectState.target && source !== this.effectState.target && typeof accuracy === 'number' && accuracy < 100) {
				return false;
			}
			return accuracy;
		},
		flags: {},
		name: "Good Fortune",
		shortDesc: "Inaccurate moves targeting this Yo-kai will always miss.",
    	desc: "This Yo-kai will always dodge moves with less than 100% Accuracy.",
	},
	greed: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Greed');
			this.add('-message', `${pokemon.name}'s Greed knows no limits!`);
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		flags: {},
		name: "Greed",
		shortDesc: "Foes' moves will use an additional PP while this Yo-kai is active.",
    	desc: "Foes' moves will use an additional PP while this Yo-kai is active.",
	},
	griponyou: {
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain'];
			if (heals.includes(effect.id)) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Grip on You",
		shortDesc: "This Yo-kai's draining moves restore double the HP.",
    	desc: "This Yo-kai's draining moves restore double the HP.",
	},
	guardbreak: {
		onModifyMove(move) {
			delete move.flags['protect'];
		},
		flags: {},
		name: "Guard Break",
		shortDesc: "Ignores the foe's Guard when attacking.",
    	desc: "This Yo-kai ignores the foe's Guard when attacking.",
	},
	hangingin: {
		onTryAddVolatile(status, target) {
			if (target === this.effectState.target && status.isInspirit === true && status.isGood === false) {
				this.add('-immune', target, '[from] ability: Hanging In');
				return null;
			}
		},
		flags: {},
		name: "Hanging In",
		shortDesc: "This Yo-kai is immune to foes' Inspirits.",
    	desc: "This Yo-kai is immune to foes' Inspirits.",
	},
	insecure: {
		onModifyCritRatio(critRatio) {
			return critRatio + 2;
		},
		onSourceModifyCritRatio(critRatio, source, target) {
			return critRatio + 1;
		},
		flags: {},
		name: "Insecure",
		shortDesc: "This Yo-kai's crit ratio is +2, Yo-kai targeting it have +1 crit ratio.",
    	desc: "Attacks used by this Yo-kai have their critical hit ratio increased by 2. Attacks targeting this Yo-kai have their critical hit ratio increased by 1.",
	},
	insulator: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Insulator",
		shortDesc: "This Yo-kai takes halved damage from Electric attacks.",
    	desc: "Halves the damage this Yo-kai takes from Electric-type attacks, including elemental attacks.",
	},
	intimidation: {
		// the actual effect of this ability is handled in conditions.ts
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Intimidation');
			this.add('-message', `${pokemon.name}'s Intimidation prevents Yo-kai from Loafing!`);
		},
		flags: {},
		name: "Intimidation",
		shortDesc: "Yo-kai will not Loaf while this Yo-kai is active.",
    	desc: "Yo-kai will not Loaf while this Yo-kai is active.",
	},
	jarguard: {
		// the actual effect of this ability is handled in the code for Guard
		flags: {},
		name: "Jar Guard",
		shortDesc: "This Yo-kai takes 1/8 damage while Guarding instead of 1/4.",
    	desc: "This Yo-kai takes 1/8 damage while Guarding instead of 1/4.",
	},
	lightspeed: {
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		flags: {},
		name: "Light Speed",
		shortDesc: "This Yo-kai's critical hit ratio is increased by 1 stage.",
    	desc: "This Yo-kai's critical hit ratio is increased by 1 stage.",
	},
	lightningplay: {
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify(1.2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Lightning Play",
		shortDesc: "This Yo-kai's Electric attacks deal 1.2x damage.",
    	desc: "This Yo-kai's Electric attacks deal 1.2x damage.",
	},
	linkedtogether: {
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				if (ally.hasAbility('linkedtogether')) {
					this.add('-ability', pokemon, 'Linked Together');
					this.add('-message', `${pokemon.name} and ${ally.name} are Linked Together!`);
				}
			}
		},
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && attacker.hasAbility('linkedtogether')) {
				const source = this.effectState.target;
				if (source.adjacentAllies().includes(attacker)) {
					this.debug('Linked Together boost');
					return this.chainModify(1.5);
				}
			}
		},
		onAllyModifyDefPriority: 6,
		onAllyModifyDef(def, pokemon) {
			if (pokemon !== this.effectState.target && pokemon.hasAbility('linkedtogether')) {
				const source = this.effectState.target;
				if (source.adjacentAllies().includes(pokemon)) {
					this.debug('Linked Together boost');
					return this.chainModify(1.5);
				}
			}
		},
		onAllyModifySpePriority: 6,
		onAllyModifySpe(spe, pokemon) {
			if (pokemon !== this.effectState.target && pokemon.hasAbility('linkedtogether')) {
				const source = this.effectState.target;
				if (source.adjacentAllies().includes(pokemon)) {
					this.debug('Linked Together boost');
					return this.chainModify(1.5);
				}
			}
		},
		flags: {},
		name: "Linked Together",
		shortDesc: "Adjacent allies with the same ability have all stats boosted by 1.5x.",
    	desc: "Adjacent allies with the same ability have their Strength, Spirit, Defense, and Speed boosted by 1.5x.",
	},
	loiterer: {
		// the actual effect of this ability is handled in conditions.ts
		flags: {},
		name: "Loiterer",
		shortDesc: "This Yo-kai recovers 1/3 of its max HP when it Loafs.",
    	desc: "This Yo-kai recovers 1/3 of its max HP when it Loafs.",
	},
	matchlessshell: {
		onTryAddVolatile(status, target) {
			if (target === this.effectState.target && status.isInspirit === true && status.isGood === false) {
				this.add('-immune', target, '[from] ability: Matchless Shell');
				return null;
			}
		},
		flags: {},
		name: "Matchless Shell",
		shortDesc: "This Yo-kai is immune to foes' Inspirits.",
    	desc: "This Yo-kai is immune to foes' Inspirits.",
	},
	mine: {
		onAnyTryAddVolatile(status, target, source, effect) {
			const pokemon = this.effectState.target;
			if (target !== pokemon && !target.hasAbility('mine', 'stealing') && !['gluttony', 'stinginess'].some(v => target.volatiles[v]) && status.isInspirit === true && status.isGood === true) {
				this.add('-activate', this.effectState.target, 'ability: Mine');
				pokemon.addVolatile(status.id);
				this.add('-message', `${pokemon.name} stole the Inspirit!`);
				return null;
			}
		},
		flags: {},
		name: "Mine",
		shortDesc: "This Yo-kai takes good Inspirits for itself.",
    	desc: "This Yo-kai will redirect all good Inspirits to itself.",
	},
	miraculousscales: {
		onTryAddVolatile(status, target) {
			if (target === this.effectState.target && status.isInspirit === true && status.isGood === false) {
				this.add('-immune', target, '[from] ability: Miraculous Scales');
				return null;
			}
		},
		flags: {},
		name: "Miraculous Scales",
		shortDesc: "This Yo-kai is immune to foes' Inspirits.",
    	desc: "This Yo-kai is immune to foes' Inspirits.",
	},
	mirrorbody: {
		onDamagingHit(damage, target, source, move) {
			if (this.getCategory(move) === 'Special') {
				this.damage(Math.floor(damage * 0.5), source, target);
			}
		},
		flags: {},
		name: "Mirror Body",
		shortDesc: "Yo-kai hitting this Yo-kai with a Special Attack are hurt for 50% of damage taken.",
    	desc: "Yo-kai damaging this Yo-kai with a Special Attack lose HP equal to 50% of the damage taken.",
	},
	modest: {
		onFoeRedirectTargetPriority: 2,
		onFoeRedirectTarget(target, source, source2, move) {
			if (target !== this.effectState.target) return;
			if (!this.randomChance(1, 2)) return;
			const allies = this.effectState.target.adjacentAllies();
			if (!allies.length) return;
			const ally = this.sample(allies);
			this.add('-activate', this.effectState.target, 'ability: Modest');
			return ally;
		},
		flags: {},
		name: "Modest",
		shortDesc: "50% chance for foes targeting this Yo-kai to target one of its adjacent allies instead.",
    	desc: "50% chance for foes targeting this Yo-kai to target one of its adjacent allies instead.",
	},
	moistskin: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Moist Skin",
		shortDesc: "This Yo-kai takes halved damage from Water attacks.",
    	desc: "Halves the damage this Yo-kai takes from Water-type attacks, including elemental attacks.",
	},
	muttsparadise: {
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				if (ally.hasAbility('muttsparadise')) {
					this.add('-ability', pokemon, 'Mutt\'s Paradise');
					this.add('-message', `${pokemon.name} and ${ally.name} are in Mutt's Paradise!`);
				}
			}
		},
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && attacker.hasAbility('muttsparadise')) {
				const source = this.effectState.target;
				if (source.adjacentAllies().includes(attacker)) {
					this.debug("Mutt's Paradise boost");
					return this.chainModify(1.5);
				}
			}
		},
		onAllyModifyDefPriority: 6,
		onAllyModifyDef(def, pokemon) {
			if (pokemon !== this.effectState.target && pokemon.hasAbility('muttsparadise')) {
				const source = this.effectState.target;
				if (source.adjacentAllies().includes(pokemon)) {
					this.debug("Mutt's Paradise boost");
					return this.chainModify(1.5);
				}
			}
		},
		onAllyModifySpePriority: 6,
		onAllyModifySpe(spe, pokemon) {
			if (pokemon !== this.effectState.target && pokemon.hasAbility('muttsparadise')) {
				const source = this.effectState.target;
				if (source.adjacentAllies().includes(pokemon)) {
					this.debug("Mutt's Paradise boost");
					return this.chainModify(1.5);
				}
			}
		},
		flags: {},
		name: "Mutt's Paradise",
		shortDesc: "Adjacent allies with the same ability have all stats boosted by 1.5x.",
		desc: "Adjacent allies with the same ability have their Strength, Spirit, Defense, and Speed boosted by 1.5x.",
	},
	oldnesszone: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Oldness Zone');
			this.add('-message', `${pokemon.name}'s Oldness Zone slows everyone down, making dodging impossible!`);
		},
		onAnyModifyAccuracyPriority: -1,
		onAnyModifyAccuracy(accuracy, target, source) {
			if (typeof accuracy !== 'number') return;
			if (target !== this.effectState.target) return;
			this.debug('Oldness Zone - increasing accuracy');
			return true;
		},
		flags: {},
		name: "Oldness Zone",
		shortDesc: "Moves will not miss while this Yo-kai is active.",
    	desc: "Moves will not miss while this Yo-kai is active.",
	},
	omega: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['alpha'])) {
					return this.chainModify(1.5);
				}
			}
		},
		flags: {},
		name: "Omega",
		shortDesc: "This Yo-kai's Strength is 1.5x if an active ally has the Alpha ability.",
    	desc: "This Yo-kai's Strength is 1.5x if an active ally has the Alpha ability.",
	},
	optimismpower: {
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			const allies = pokemon.adjacentAllies();
			if (!allies.length) return;
			this.add('-activate', this.effectState.target, 'ability: Optimism Power');
			for (const ally of allies) {
				this.heal(Math.floor(ally.baseMaxhp / 16), ally, pokemon);
			}
		},
		flags: {},
		name: "Optimism Power",
		shortDesc: "Restores the HP of adjacent allies by 1/16 at end of turn.",
    	desc: "This Yo-kai restores the HP of adjacent allies by 1/16 at the end of each turn.",
	},
	penetrate: {
		onEffectivenessPriority: 2,
		onEffectiveness(typeMod, target, type, move) {
			if (move.category !== 'Physical') return;
			if (!(move.type === this.effectState.target.element ||
				(move.type === 'Rock' && this.effectState.target.element === 'Earth') ||
				(move.type === 'Flying' && this.effectState.target.element === 'Wind') ||
				(move.type === 'Electric' && this.effectState.target.element === 'Lightning'))) return;
			if (type === 'Drain' || type === 'Restoration') return 0;
			if (target.element === type ||
			(target.element === 'Earth' && type === 'Rock') ||
			(target.element === 'Wind' && type === 'Flying') ||
			(target.element === 'Lightning' && type === 'Electric')) return 2;
			else if ((target.element === 'Fire' && type === 'Water') ||
					(target.element === 'Water' && type === 'Electric') ||
					(target.element === 'Lightning' && type === 'Rock') ||
					(target.element === 'Earth' && type === 'Flying') ||
					(target.element === 'Wind' && type === 'Ice') ||
					(target.element === 'Ice' && type === 'Fire')) return 1;
			else return 0;
		},
		flags: {},
		name: "Penetrate",
		shortDesc: "This Yo-kai's physical attacks of its Element do Elemental damage.",
    	desc: "This Yo-kai's physical attacks of its Element do Elemental damage.",
	},
	platinumguard: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Flying' || move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Flying' || move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Platinum Guard",
		shortDesc: "This Yo-kai takes halved damage from Ice, Flying, and Water attacks.",
    	desc: "Halves the damage this Yo-kai takes from Ice, Flying, and Water-type attacks, including elemental attacks.",
	},
	pompadour: {
		onTryHit(pokemon, target, move) {
			if (move.flags['head']) {
				this.add('-immune', pokemon, '[from] ability: Pompadour');
				return null;
			}
		},
		flags: {},
		name: "Pompadour",
		shortDesc: "This Yo-kai is immune to headbutt attacks.",
    	desc: "This Yo-kai is immune to attacks with the Head flag.",
	},
	popularity: {
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.8);
		},
		flags: {},
		name: "Popularity",
		shortDesc: "This Yo-kai takes 0.8x damage from attacks.",
    	desc: "This Yo-kai takes 0.8x damage from attacks.",
	},
	prayer: {
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			const allies = pokemon.adjacentAllies();
			if (!allies.length) return;
			this.add('-activate', this.effectState.target, 'ability: Prayer');
			for (const ally of allies) {
				this.heal(Math.floor(ally.baseMaxhp / 16), ally, pokemon);
			}
		},
		flags: {},
		name: "Prayer",
		shortDesc: "Restores the HP of adjacent allies by 1/16 at end of turn.",
    	desc: "This Yo-kai restores the HP of adjacent allies by 1/16 at the end of each turn.",
	},
	prediction: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Prediction');
			this.add('-message', `${pokemon.name} can read the minds of its opponents!`);
		},
		onAnyModifyAccuracyPriority: 1,
		onAnyModifyAccuracy(accuracy, target, source) {
			if (typeof accuracy !== 'number') return;
			if (target !== this.effectState.target) return;
			this.debug('Prediction - decreasing accuracy');
			return this.chainModify(0.5);
		},
		flags: {},
		name: "Prediction",
		shortDesc: "Attacks targeting this Yo-kai have their Accuracy halved.",
    	desc: "Attacks targeting this Yo-kai have their Accuracy halved.",
	},
	revenge: {
		onDamagingHit(damage, target, source, move) {
			if (!target.fainted && move.type !== 'Drain') {
				this.add('-activate', this.effectState.target, 'ability: Revenge');
				this.damage(Math.floor(damage * 0.25), source, target);
			}
		},
		flags: {},
		name: "Revenge",
		shortDesc: "When hit without fainting; attacker is hurt for 25% of damage taken.",
    	desc: "Yo-kai damaging this Yo-kai lose HP equal to 25% of the damage taken if this Yo-kai doesn't faint. Will not reflect damage from Drain-type attacks.",
	},
	secrecy: {
		onFoeRedirectTargetPriority: 2,
		onFoeRedirectTarget(target, source, source2, move) {
			if (target !== this.effectState.target) return;
			const allies = target.adjacentAllies();
			if (!allies.length) return;
			const ally = this.sample(allies);
			this.add('-activate', target, 'ability: Secrecy');
			return ally;
		},
		flags: {},
		name: "Secrecy",
		shortDesc: "Foes targeting this Yo-kai to target one of its adjacent allies instead.",
    	desc: "Foes targeting this Yo-kai to target one of its adjacent allies instead.",
	},
	senseofsmell: {
		onModifyAccuracyPriority: 1,
		onModifyAccuracy(accuracy) {
			return true;
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		flags: {},
		name: "Sense of Smell",
		shortDesc: "This Yo-kai's attacks cannot miss or be redirected.",
    	desc: "This Yo-kai's attacks cannot miss or be redirected.",
	},
	sharkskin: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.add('-activate', this.effectState.target, 'ability: Shark Skin');
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Shark Skin",
		shortDesc: "Yo-kai hitting this Yo-kai with a physical attack lose 1/8 of their max HP.",
    	desc: "Yo-kai hitting this Yo-kai with a physical attack lose 1/8 of their max HP.",
	},
	shiningspirit: {
		onAllyFaint(target) {
			const pokemon = this.effectState.target;
			if (pokemon.fainted) return;
			this.add('-activate', this.effectState.target, 'ability: Shining Spirit');
        	this.boost({atk: 1, spa: 1}, pokemon);
			this.add('-message', `${pokemon.name} has hardened its resolve!`);
		},
		flags: {},
		name: "Shining Spirit",
		shortDesc: "Raises this Yo-kai's Strength and Spirit by 1 when an ally faints.",
    	desc: "This Yo-kai's Strength and Spirit are raised by 1 stage when an ally faints.",
	},
	silverguard: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' || move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' || move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Silver Guard",
		shortDesc: "This Yo-kai takes halved damage from Fire and Ice attacks.",
    	desc: "Halves the damage this Yo-kai takes from Fire and Ice-type attacks, including elemental attacks.",
	},
	skilledloafer: {
		// the actual effect of this ability is handled in conditions.ts
		flags: {},
		name: "Skilled Loafer",
		shortDesc: "This Yo-kai recovers 1/3 of its max HP when it Loafs.",
    	desc: "This Yo-kai recovers 1/3 of its max HP when it Loafs.",
	},
	snitch: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.add('-activate', source, 'ability: Vampiric');
				this.heal(Math.floor(damage * 0.25), source);
			}
		},
		flags: {},
		name: "Snitch",
		shortDesc: "This Yo-kai's physical attacks restore HP equal to 25% of the damage dealt.",
    	desc: "This Yo-kai's physical attacks restore HP equal to 25% of the damage dealt.",
	},
	snowplay: {
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Snow Play",
		shortDesc: "This Yo-kai's Ice attacks deal 1.2x damage.",
    	desc: "This Yo-kai's Ice attacks deal 1.2x damage.",
	},
	softskin: {
		onCriticalHit(target, type, move) {
			if (!target) return;
			this.boost({def: 2}, target);
		},
		flags: {},
		name: "Soft Skin",
		shortDesc: "This Yo-kai's Defense is increased 2 stages when it is struck by a critical hit.",
    	desc: "This Yo-kai's Defense is increased 2 stages when it is struck by a critical hit.",
	},
	soothingrhythm: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Soothing Rhythm');
			this.add('-message', `${pokemon.name}'s Soothing Rhythm makes its foes want to take a break!`);
			for (const foe of pokemon.side.foe.active) {
				if (!foe || foe.fainted) continue;
				if (!foe.volatiles['loafing']) foe.addVolatile('loafing');
				foe.volatiles['loafing'].loafChance += 33;
			}
		},
		onEnd(pokemon) {
			for (const foe of pokemon.side.foe.active) {
				if (!foe || foe.fainted) continue;
				if (!foe.volatiles['loafing']) continue;
				foe.volatiles['loafing'].loafChance -= 33;
				if (foe.volatiles['loafing'].loafChance <= 0) foe.removeVolatile('loafing');
			}
		},
		flags: {},
		name: "Soothing Rhythm",
		shortDesc: "Foes have a 33% chance to Loaf each turn while this Yo-kai is active.",
    	desc: "Foes have a 33% chance to Loaf each turn while this Yo-kai is active.",
	},
	spikyguard: {
		onDamagingHit(damage, target, source, move) {
			if (target.volatiles['guard']) {
				this.add('-activate', this.effectState.target, 'ability: Spiky Guard');
				this.damage(source.baseMaxhp / 6, source, target);
			}
		},
		flags: {},
		name: "Spiky Guard",
		shortDesc: "Yo-kai hitting this Yo-kai while it is Guarding lose 1/6 of their max HP.",
    	desc: "Yo-kai hitting this Yo-kai while it is Guarding lose 1/6 of their max HP.",
	},
	spiritguard: {
		// the actual code for this ability is handled within the Elemental Damage Mod
		flags: {},
		name: "Spirit Guard",
		shortDesc: "This Yo-kai doesn't take Elemental weakness damage when Guarding.",
    	desc: "This Yo-kai doesn't take Elemental weakness damage when Guarding.",
	},
	starver: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Starver');
			this.add('-message', `${pokemon.name} is making everyone hungry!`);
		},
		onAnyTryHeal(damage, target, source, effect) {
			return Math.floor(damage * 2);
		},
		flags: {},
		name: "Starver",
		shortDesc: "Doubles the effectiveness of all healing while this Yo-kai is active.",
    	desc: "Doubles the effectiveness of all healing while this Yo-kai is active.",
	},
	stealing: {
		onAnyTryAddVolatile(status, target, source, effect) {
			const pokemon = this.effectState.target;
			if (target !== pokemon && !target.hasAbility('mine', 'stealing') && !['gluttony', 'stinginess'].some(v => target.volatiles[v]) && status.isInspirit === true && status.isGood === true) {
				this.add('-activate', this.effectState.target, 'ability: Stealing');
				pokemon.addVolatile(status.id);
				this.add('-message', `${pokemon.name} stole the Inspirit!`);
				return null;
			}
		},
		flags: {},
		name: "Stealing",
		shortDesc: "This Yo-kai takes good Inspirits for itself.",
    	desc: "This Yo-kai will redirect all good Inspirits to itself.",
	},
	stiffskin: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Stiff Skin",
		shortDesc: "This Yo-kai takes halved damage from Ice attacks.",
    	desc: "Halves the damage this Yo-kai takes from Ice-type attacks, including elemental attacks.",
	},
	strict: {
		// the actual effect of this ability is handled in conditions.ts
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Strict');
			this.add('-message', `${pokemon.name}'s presence makes its allies less likely to Loaf!`);
		},
		flags: {},
		name: "Strict",
		shortDesc: "This Yo-kai's allies are half as likely to Loaf while it is active.",
    	desc: "This Yo-kai's allies are half as likely to Loaf while it is active.",
	},
	summon: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.adjacentAllies().length > 0) return;

			const wispSet: PokemonSet = {
				name: 'Wisp',
				species: 'Wisp',
				item: '',
				ability: 'Good Fortune',
				moves: ['Ecto Slam', 'Flare Blitz', 'Incinerate', 'Guard'],
				nature: 'Serious',
				evs: {hp: 100, atk: 100, def: 100, spa: 100, spd: 0, spe: 100},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				level: 100,
				gender: 'N',
				shiny: false,
			};

			const wisp = pokemon.side.addPokemon(wispSet);
			if (!wisp) return;

			const emptySlot = pokemon.side.active.findIndex(p => !p || p.fainted);
			if (emptySlot === -1) return;

			
			this.add('-ability', pokemon, 'Summon');
			this.add('-message', `${pokemon.name} summoned a Wisp!`);
			this.actions.switchIn(wisp, emptySlot);
		},
		flags: {},
		name: "Summon",
		shortDesc: "If this Yo-kai has no adjacent allies, it will create an allied Wisp at end of turn.",
    	desc: "If this Yo-kai has no adjacent allies, it will create an allied Wisp at end of turn.",
	},
	suspicion: {
		onStart(pokemon) {
			pokemon.addVolatile('suspicion');
		},
		condition: {
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (this.randomChance(1, 4)) {
					const allies = pokemon.adjacentAllies();
					if (!allies.length) return;
					const allyTarget = this.sample(allies);
					this.add('-message', `${pokemon.name} got suspicious and attacked an ally!`);
					this.actions.useMove('bash', pokemon, allyTarget);
				}
			}
		},
		flags: {},
		name: "Suspicion",
		shortDesc: "This Yo-kai has a 25% chance to attack an adjacent ally after moving.",
    	desc: "This Yo-kai has a 25% chance to attack a random adjacent ally after using a move.",
	},
	tooafraid: {
		onStart(pokemon) {
			if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
			pokemon.volatiles['loafing'].loafChance += 50;
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['loafing']) return;
			pokemon.volatiles['loafing'].loafChance -= 50;
			if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
		},
		flags: {},
		name: "Too Afraid",
		shortDesc: "This Yo-kai has a 50% chance to Loaf each turn.",
    	desc: "This Yo-kai has a 50% chance to Loaf each turn.",
	},
	tooserious: {
		// the actual effect of this ability is handled in conditions.ts
		flags: {},
		name: "Too Serious",
		shortDesc: "This Yo-kai will never Loaf.",
    	desc: "This Yo-kai will never Loaf.",
	},
	ultimatedark: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Ultimate Dark');
			this.add('-message', `${pokemon.name} cloaks the field in a menacing darkness!`);
		},
		onAnyModifyMove(move) {
			if (move.flags['inspirit']) {
				move.accuracy = true;
				move.ignoreImmunity = true;
				move.ignoreAbility = true;
			}
		},
		flags: {},
		name: "Ultimate Dark",
		shortDesc: "While this Yo-kai is active, Inspirits cannot miss and ignore immunities.",
    	desc: "While this Yo-kai is active, Inspirits cannot miss and ignore immunities.",
	},
	unpopularity: {
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(1.2);
		},
		flags: {},
		name: "Unpopularity",
		shortDesc: "This Yo-kai takes 1.2x damage from attacks.",
    	desc: "This Yo-kai takes 1.2x damage from attacks.",
	},
	vampiric: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.add('-activate', source, 'ability: Vampiric');
				this.heal(Math.floor(damage * 0.25), source);
			}
		},
		flags: {},
		name: "Vampiric",
		shortDesc: "This Yo-kai's physical attacks restore HP equal to 25% of the damage dealt.",
    	desc: "This Yo-kai's physical attacks restore HP equal to 25% of the damage dealt.",
	},
	venocharge: {
		onResidualOrder: 10,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.soultimateMove) return;
			const maxCharge = this.dex.moves.get(pokemon.soultimateMove).soultimateMaxCharge!;
			if (pokemon.soultimateCharge >= maxCharge) return;
			pokemon.soultimateCharge = Math.min(pokemon.soultimateCharge + 1, maxCharge);
		},
		flags: {},
		name: "Venocharge",
		shortDesc: "This Yo-kai's Soultimate gains an additional charge at the end of each turn.",
    	desc: "This Yo-kai's Soultimate gains an additional charge at the end of each turn.",
	},
	waterproof: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Waterproof",
		shortDesc: "This Yo-kai takes halved damage from Water attacks.",
    	desc: "Halves the damage this Yo-kai takes from Water-type attacks, including elemental attacks.",
	},
	waterplay: {
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Water Play",
		shortDesc: "This Yo-kai's Water attacks deal 1.2x damage.",
    	desc: "This Yo-kai's Water attacks deal 1.2x damage.",
	},
	wavybody: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Wavy Body');
			this.add('-message', `${pokemon.name} wiggles its body to the rhythm!`);
		},
		onAnyModifyAccuracyPriority: 1,
		onAnyModifyAccuracy(accuracy, target, source) {
			if (typeof accuracy !== 'number') return;
			if (target !== this.effectState.target) return;
			this.debug('Wavy Body - decreasing accuracy');
			return this.chainModify(0.5);
		},
		flags: {},
		name: "Wavy Body",
		shortDesc: "Attacks targeting this Yo-kai have their Accuracy halved.",
    	desc: "Attacks targeting this Yo-kai have their Accuracy halved.",
	},
	windshield: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Windshield",
		shortDesc: "This Yo-kai takes halved damage from Flying attacks.",
    	desc: "Halves the damage this Yo-kai takes from Flying-type attacks, including elemental attacks.",
	},
	windplay: {
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				return this.chainModify(1.2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Wind Play",
		shortDesc: "This Yo-kai's Flying attacks deal 1.2x damage.",
    	desc: "This Yo-kai's Flying attacks deal 1.2x damage.",
	},
};