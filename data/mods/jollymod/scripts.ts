export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['JM'],
	},	
	
	init() {
		
	},
	battle: {
	},
	actions: {
		getDamage(
		source: Pokemon, target: Pokemon, move: string | number | ActiveMove,
		suppressMessages = false
	): number | undefined | null | false {
		if (typeof move === 'string') move = this.dex.getActiveMove(move);

		if (typeof move === 'number') {
			const basePower = move;
			move = new Dex.Move({
				basePower,
				type: '???',
				category: 'Physical',
				willCrit: false,
			}) as ActiveMove;
			move.hit = 0;
		}

		if (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) {
			if (!target.runImmunity(move.type, !suppressMessages)) {
				return false;
			}
		}

		if (move.ohko) return target.maxhp;
		if (move.damageCallback) return move.damageCallback.call(this.battle, source, target);
		if (move.damage === 'level') {
			return source.level;
		} else if (move.damage) {
			return move.damage;
		}

		const category = this.battle.getCategory(move);

		let basePower: number | false | null = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this.battle, source, target, move);
		}
		if (!basePower) return basePower === 0 ? undefined : basePower;
		basePower = this.battle.clampIntRange(basePower, 1);

		let critMult;
		let critRatio = this.battle.runEvent('ModifyCritRatio', source, target, move, move.critRatio || 0);
		if (this.battle.gen <= 5) {
			critRatio = this.battle.clampIntRange(critRatio, 0, 5);
			critMult = [0, 16, 8, 4, 3, 2];
		} else {
			critRatio = this.battle.clampIntRange(critRatio, 0, 4);
			if (this.battle.gen === 6) {
				critMult = [0, 16, 8, 2, 1];
			} else {
				critMult = [0, 24, 8, 2, 1];
			}
		}

		const moveHit = target.getMoveHitData(move);
		moveHit.crit = move.willCrit || false;
		if (move.willCrit === undefined) {
			if (critRatio) {
				moveHit.crit = this.battle.randomChance(1, critMult[critRatio]);
			}
		}

		if (moveHit.crit) {
			moveHit.crit = this.battle.runEvent('CriticalHit', target, null, move);
		}

		// happens after crit calculation
		basePower = this.battle.runEvent('BasePower', source, target, move, basePower, true);

		if (!basePower) return 0;
		basePower = this.battle.clampIntRange(basePower, 1);
		// Hacked Max Moves have 0 base power, even if you Dynamax
		if ((!source.volatiles['dynamax'] && move.isMax) || (move.isMax && this.dex.moves.get(move.baseMove).isMax)) {
			basePower = 0;
		}

		if (
			basePower < 60 && source.getTypes(true).includes(move.type) && source.terastallized && move.priority <= 0 &&
			// Hard move.basePower check for moves like Dragon Energy that have variable BP
			!move.multihit && !((move.basePower === 0 || move.basePower === 150) && move.basePowerCallback)
		) {
			basePower = 60;
		}

		let level = source.level;

		const attacker = move.overrideOffensivePokemon === 'target' ? target : source;
		const defender = move.overrideDefensivePokemon === 'source' ? source : target;

		const isPhysical = move.category === 'Physical';
		let attackStat: StatIDExceptHP = move.overrideOffensiveStat || (isPhysical ? 'atk' : 'spa');
		const defenseStat: StatIDExceptHP = move.overrideDefensiveStat || (isPhysical ? 'def' : 'spd');

		const statTable = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};

		let atkBoosts = attacker.boosts[attackStat];
		let defBoosts = defender.boosts[defenseStat];

		let ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
		let ignorePositiveDefensive = !!move.ignorePositiveDefensive;

		if (moveHit.crit) {
			ignoreNegativeOffensive = true;
			ignorePositiveDefensive = true;
		}
		const ignoreOffensive = !!(move.ignoreOffensive || (ignoreNegativeOffensive && atkBoosts < 0));
		const ignoreDefensive = !!(move.ignoreDefensive || (ignorePositiveDefensive && defBoosts > 0));

		if (ignoreOffensive) {
			this.battle.debug('Negating (sp)atk boost/penalty.');
			atkBoosts = 0;
		}
		if (ignoreDefensive) {
			this.battle.debug('Negating (sp)def boost/penalty.');
			defBoosts = 0;
		}

		let attack = attacker.calculateStat(attackStat, atkBoosts, 1, source);
		let defense = defender.calculateStat(defenseStat, defBoosts, 1, target);

		attackStat = (category === 'Physical' ? 'atk' : 'spa');

		// Apply Stat Modifiers
		attack = this.battle.runEvent('Modify' + statTable[attackStat], source, target, move, attack);
		defense = this.battle.runEvent('Modify' + statTable[defenseStat], target, source, move, defense);

		if (this.battle.gen <= 4 && ['explosion', 'selfdestruct'].includes(move.id) && defenseStat === 'def') {
			defense = this.battle.clampIntRange(Math.floor(defense / 2), 1);
		}
		
		// Gen 2 Present has a glitched damage calculation using the secondary types of the Pokemon for the Attacker's Level and Defender's Defense.
		if (move.id === 'present') {
			const typeIndexes = {"Normal": 0, "Fighting": 1, "Flying": 2, "Poison": 3, "Ground": 4, "Rock": 5, "Bug": 7, "Ghost": 8, "Steel": 9, "Fire": 20, "Water": 21, "Grass": 22, "Electric": 23, "Psychic": 24, "Ice": 25, "Dragon": 26, "Dark": 27};
			attack = 10;

			const attackerLastType = attacker.getTypes().slice(-1)[0];
			const defenderLastType = defender.getTypes().slice(-1)[0];

			defense = typeIndexes[attackerLastType] || 1;
			level = typeIndexes[defenderLastType] || 1;
			if (move.crit) {
				level *= 2;
			}
		}

		const tr = this.battle.trunc;

		// int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
		const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);

		// Calculate damage modifiers separately (order differs between generations)
		return this.modifyDamage(baseDamage, source, target, move, suppressMessages);
	}
	},
	side: {
		addKarma(amount: number) {
			if(amount === 0) return;
			if(this.karma === undefined) this.karma = 0;
			this.karma += amount;
			this.battle.add('-message', `${this.name} gained ${amount} karma!`);
			this.battle.hint(`They now have ${this.karma} karma.`);
		},
		removeKarma(amount: number) {
			if(amount === 0) return;
			if(this.karma === undefined) this.karma = 0;
			this.karma -= amount;
			this.battle.add('-message', `${this.name} lost ${amount} karma!`);
			this.battle.hint(`They now have ${this.karma} karma.`);
		},
		punish() {
			if (!this.active) {
				this.battle.add('-message', "But there was no one home...");
				return;
			}
			const n = this.random(100);
			const pokemon = this.active[0];
			if (n < 40) {
				this.battle.add('-message', `Santa gave ${this.name} coal!`);
				this.add('-anim', pokemon, "G-Max Volcalith", pokemon);
				this.addSideCondition('gmaxvolcalith');
			} else if (n < 60) {
				this.battle.add('-message', `Santa lectured ${pokemon.name} about right and wrong!`);
				const bestStat = pokemon.getBestStat(true, true);
				this.boost({[bestStat]: -1}, pokemon);
			} else if (n < 80) {
				this.battle.add('-message', `Santa sent a chilling breeze!`);
				this.battle.add('-message', `${pokemon.name} became weak to Ice!`);
				pokemon.addVolatile('hypothermia');
			} else if (n < 90) {
				this.battle.add('-message', `Santa passed down chilling judgement!`);
				const newMove = this.dex.getActiveMove('judgment');
				const newSet = {
					name: 'Mew',
					species: 'Mew',
					item: 'Icicle Plate',
					ability: 'Static',
					moves: [ 'Judgment' ],
					nature: 'Serious',
					evs: { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 },
					gender: 'N',
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Ice',
					level: 100
				};
				const newMon = new Pokemon(newSet, pokemon.side);
				this.add('-anim', pokemon, "Judgment", pokemon);
				this.actions.useMove(newMove, newMon, pokemon);
			} else if (n < 95) {
				this.battle.add('-message', `Santa gave ${this.name} coal!`);
				this.add('-anim', pokemon, "Stealth Rock", pokemon);
				this.addSideCondition('stealthrock');
			} else if (n < 99) {
				this.battle.add('-message', `Santa sent a chilling breeze!`);
				this.battle.add('-message', `${pokemon.name} became frozen!`);
				pokemon.setStatus('frz');
			} else {
				this.battle.add('-message', `Santa took out his hammer!`);
				const newMove = this.dex.getActiveMove('gigatonhammer');
				const newSet = {
					name: 'Mew',
					species: 'Mew',
					item: 'Icicle Plate',
					ability: 'Static',
					moves: [ 'Gigaton Hammer' ],
					nature: 'Serious',
					evs: { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 },
					gender: 'N',
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Ice',
					level: 100
				};
				const newMon = new Pokemon(newSet, pokemon.side);
				this.add('-anim', pokemon, "Gigaton Hammer", pokemon);
				this.actions.useMove(newMove, newMon, pokemon);
			}
		},
	},
	pokemon: {
		inherit: true,
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
			const abilityid = this.battle.toID(ability);
			return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
		},
	},
};