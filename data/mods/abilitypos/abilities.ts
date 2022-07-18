/*
Ratings and how they work:
-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start
 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus
 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups
 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat
 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy
 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce
 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag
*/

export const Abilities: {[abilityid: string]: AbilityData} = {
	overflow: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Overflow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Overflow boost');
				return this.chainModify(1.5);
			}
		},
		name: "Overflow",
		desc: "This Pokémon’s Water moves deal 1.5x damage.",
		rating: 3.5,
		num: 300,
	},
	abhorrent: {
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
				boosts: {
				atk: -1,
				},
				ability: this.dex.getAbility('abhorrent'),
			});
		},
		name: "Abhorrent",
		desc: "This Pokemon's contact moves lower the opponent's Attack by 1.",
		rating: 2,
		num: 301,
	},
	hostabsorb: {
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
				volatileStatus: 'leechseed',
				ability: this.dex.getAbility('hostabsorb'),
			});
		},
		name: "Host Absorb",
		desc: "This Pokémon's contact moves apply Leech Seed to its target.",
		rating: 2,
		num: 302,
	},
	worm: {
		onBasePowerPriority: 21,
		onBasePower(basePower, source, target, move) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === source) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted && move.type === 'Bug') {
				this.debug('Worm boost');
				return this.chainModify(1.5);
			}
		},
		name: "Worm",
		desc: "If this Pokémon moves last in a turn, it's Bug moves deal 1.5x damage.",
		rating: 2.5,
		num: 303,
	},
	deathmetal: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Ghost' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Steel';
				move.deathmetalBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.deathmetalBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Death Metal",
		desc: "This Pokemon's Ghost moves become Steel moves and deal 1.2x damage.",
		rating: 4,
		num: 304,
	},
	graze: {
		onAccuracyPriority: -2,
		onAccuracy(accuracy, target, source, move) {
			if (accuracy !== true && !this.randomChance(accuracy, 100)) {
			move.graze = true;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			if (!move.totalDamage || move.graze !== true) return;
			const damage = move.totalDamage
			this.damage(move.totalDamage / 4, target);
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
		name: "Graze",
		desc: "(Bugged)If this Pokémon misses a damaging move, the target takes damage equal to 1/4 of the damage they would've taken. Secondary effects don't activate.",
		rating: 4.5,
		num: 305,
	},
};