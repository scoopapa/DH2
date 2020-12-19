export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen5',
	gen: 5,
	init: function () {
		for (let i in this.data.Pokedex) {
			delete this.data.Pokedex[i].abilities['H'];
		}
	},
	
	//directly copying and editing gen2's mod formula
	// May need to remove sandstorm check from this code
	// May need to add abilities
	getDamage: function (pokemon, target, move, suppressMessages) {
		// First of all, we get the move.
		if (typeof move === 'string') move = this.getMove(move);
		if (typeof move === 'number') {
			move = {
				basePower: move,
				type: '???',
				category: 'Physical',
				willCrit: false,
				flags: {},
			};
		}

		// Let's test for immunities.
		if (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) {
			if (!target.runImmunity(move.type, true)) {
				return false;
			}
		}

		// Is it an OHKO move?
		if (move.ohko) {
			return target.maxhp;
		}

		// We edit the damage through move's damage callback
		if (move.damageCallback) {
			return move.damageCallback.call(this, pokemon, target);
		}

		// We take damage from damage=level moves
		if (move.damage === 'level') {
			return pokemon.level;
		}

		// If there's a fix move damage, we run it
		if (move.damage) {
			return move.damage;
		}

		// We check the category and typing to calculate later on the damage
		move.category = this.getCategory(move);
		if (!move.defensiveCategory) move.defensiveCategory = move.category;
		// '???' is typeless damage: used for Struggle and Confusion etc
		if (!move.type) move.type = '???';
		let type = move.type;

		// We get the base power and apply basePowerCallback if necessary
		let basePower = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this, pokemon, target, move);
		}

		// We check for Base Power
		if (!basePower) {
			if (basePower === 0) return; // Returning undefined means not dealing damage
			return basePower;
		}
		basePower = this.clampIntRange(basePower, 1);

		// Checking for the move's Critical Hit ratio
		move.critRatio = this.clampIntRange(move.critRatio, 0, 5);
		let critMult = [0, 16, 8, 4, 3, 2];
		move.crit = move.willCrit || false;
		if (typeof move.willCrit === 'undefined') {
			if (move.critRatio) {
				move.crit = (this.random(critMult[move.critRatio]) === 0);
			}
		}

		if (move.crit) {
			move.crit = this.runEvent('CriticalHit', target, null, move);
		}

		// Happens after crit calculation
		if (basePower) {
			basePower = this.runEvent('BasePower', pokemon, target, move, basePower, true);
			if (move.basePowerModifier) {
				basePower *= move.basePowerModifier;
			}
		}
		if (!basePower) return 0;
		basePower = this.clampIntRange(basePower, 1);

		// We now check for attacker and defender
		let level = pokemon.level;
		let attacker = pokemon;
		let defender = target;
		if (move.useTargetOffensive) attacker = target;
		if (move.useSourceDefensive) defender = pokemon;
		let atkType = (move.category === 'Physical') ? 'atk' : 'spa';
		let defType = (move.defensiveCategory === 'Physical') ? 'def' : 'spd';
		let unboosted = false;
		let noburndrop = false;

		// The move is a critical hit. Several things happen here.
		if (move.crit) {
			// Level is doubled for damage calculation.
			level *= 2;
			if (!suppressMessages) this.add('-crit', target);
			// Stat level modifications are ignored if they are neutral to or favour the defender.
			// Reflect and Light Screen defensive boosts are only ignored if stat level modifications were also ignored as a result of that.
			if (attacker.boosts[atkType] <= defender.boosts[defType]) {
				unboosted = true;
				noburndrop = true;
			}
		}
		// Get stats now.
		let attack = attacker.getStat(atkType, unboosted, noburndrop);
		let defense = defender.getStat(defType, unboosted);

		// Moves that ignore offense and defense respectively.
		if (move.ignoreOffensive) {
			this.debug('Negating (sp)atk boost/penalty.');
			// The attack drop from the burn is only applied when attacker's attack level is higher than defender's defense level.
			attack = attacker.getStat(atkType, true, true);
		}
		if (move.ignoreDefensive) {
			this.debug('Negating (sp)def boost/penalty.');
			defense = target.getStat(defType, true, true);
		}
		


		// When either attack or defense are higher than 256, they are both divided by 4 and moded by 256.
		// This is what cuases the roll over bugs.
		// Fixed in Prism, so commenting out
		/*if (attack >= 256 || defense >= 256) {
			attack = this.clampIntRange(Math.floor(attack / 4) % 256, 1);
			defense = this.clampIntRange(Math.floor(defense / 4) % 256, 1);
		}*/

		// Self destruct moves halve defense at this point.
		// Handled by BP in Prism, so commenting out
		/*if (move.selfdestruct && defType === 'def') {
			defense = this.clampIntRange(Math.floor(defense / 2), 1);
		}*/

		// Let's go with the calculation now that we have what we need.
		// We do it step by step just like the game does.
		// How it was in gen 2, edited to prism
		// alpha calc's damage calculation for reference
//baseDmg = 42 * attackStat * parseInt(document.getElementById("base").value) / (defenseStat * 50) * parseInt(document.getElementById("item").value) / 100 * weatherMod;
		let damage = 42;
		damage = damage * attack * basePower / (defense * 50) //* item
		damage += 2;
		
		//this is baseDmg. need to calculate final result

		// Weather modifiers
		//need to remove rounding. doing so
		if ((this.field.isWeather('raindance') && type === 'Water') || (this.field.isWeather('sunnyday') && type === 'Fire')) {
			damage = Math.floor(damage * 1.5);
		} else if ((this.field.isWeather('raindance') && (type === 'Fire' || move.id === 'solarbeam')) || (this.field.isWeather('sunnyday') && type === 'Water')) {
			damage = Math.floor(damage / 2);
		}

		// STAB damage bonus, the "???" type never gets STAB
		if (type !== '???' && pokemon.hasType(type)) {
			//damage += damage * move.stab;
			//above is correct call, but i don't know if it works yet
			damage = damage + damage / 2;
		}

		// Type effectiveness
		let totalTypeMod = target.runEffectiveness(move);
		// Super effective attack
		if (totalTypeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);
			damage *= 2;
			if (totalTypeMod >= 2) {
				damage *= 2;
			}
		}
		// Resisted attack
		if (totalTypeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);
			damage = Math.floor(damage / 2);
			if (totalTypeMod <= -2) {
				damage = Math.floor(damage / 2);
			}
		}

		// Apply random factor is damage is greater than 1, except for Flail and Reversal
		// Changing to 15% variance in prism
		if (!move.noDamageVariance && damage > 1) {
			damage *= this.random(85, 100);
			damage = Math.floor(damage / 100);
		}

		// If damage is less than 1, we return 1
		if (basePower && !Math.floor(damage)) {
			return 1;
		}

		// We are done, this is the final damage
		return damage;
	},
	
	calcRecoilDamage: function (damageDealt, move) {
		return this.clampIntRange(Math.floor(damageDealt * move.recoil[0] / move.recoil[1]), 1);
	},
};
