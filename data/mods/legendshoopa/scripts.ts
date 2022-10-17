export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['ANL OU', 'ANL NFE', 'ANL LC'],
	},

	init() { // pasted in by Hematite because I am far too lazy to manage learnsets.ts
		delete this.modData('Learnsets', 'crustle').learnset.gigaimpact;
		delete this.modData('Learnsets', 'crustle').learnset.hyperbeam;
		this.modData('Learnsets', 'lanturn').learnset.thunderfang = ["8M"];
		this.modData('Learnsets', 'kecleon').learnset.camoscope = ["8M"];
		this.modData('Learnsets', 'tropius').learnset.berryblast = ["8M"];
		for (const id in this.dataCache.Pokedex) {
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon || !newMon.copyData) continue; // weeding out Pokémon that aren't specifically using this feature
			let copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];

			if (!newMon.types && copyData.types) newMon.types = copyData.types;
			if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
			if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
			if (!newMon.num && copyData.num) newMon.num = copyData.num * -1; // inverting the original's dex number
			if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
			if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
			if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
			if (!newMon.color && copyData.color) newMon.color = copyData.color;
			if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;

			let copyMoves = newMon.copyData;
			if (newMon.copyMoves) copyMoves = newMon.copyMoves;
			if (copyMoves) {
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};
				const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = learnset[moveid];
				}
				if (newMon.movepoolAdditions) {
					for (const move of newMon.movepoolAdditions) {
						this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
					}
				}
				if (newMon.movepoolDeletions) {
					for (const move of newMon.movepoolDeletions) {
						delete this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)];
					}
				}
			}
		}
	},

	hitStepAccuracy(targets, pokemon, move) {
		const hitResults = [];
		for (const [i, target] of targets.entries()) {
			this.activeTarget = target;
			// calculate true accuracy
			let accuracy = move.accuracy;
			if (move.ohko) { // bypasses accuracy modifiers
				if (!target.isSemiInvulnerable()) {
					accuracy = 30;
					if (move.ohko === 'Ice' && this.gen >= 7 && !pokemon.hasType('Ice')) {
						accuracy = 20;
					}
					if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
						(move.ohko === true || !target.hasType(move.ohko))) {
						accuracy += (pokemon.level - target.level);
					} else {
						this.add('-immune', target, '[ohko]');
						hitResults[i] = false;
						continue;
					}
				}
			} else {
				const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];

				let boosts;
				let boost!: number;
				if (accuracy !== true) {
					if (!move.ignoreAccuracy) {
						boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
						boost = this.clampIntRange(boosts['accuracy'], -6, 6);
						if (boost > 0) {
							accuracy *= boostTable[boost];
						} else {
							accuracy /= boostTable[-boost];
						}
					}
					if (!move.ignoreEvasion) {
						boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
						boost = this.clampIntRange(boosts['evasion'], -6, 6);
						if (boost > 0) {
							accuracy /= boostTable[boost];
						} else if (boost < 0) {
							accuracy *= boostTable[-boost];
						}
					}
				}
				accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
			}
			if (move.alwaysHit || (move.id === 'toxic' && this.gen >= 6 && pokemon.hasType('Poison'))) {
				accuracy = true; // bypasses ohko accuracy modifiers
			} else {
				accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
			}
			if (accuracy !== true && !this.randomChance(accuracy, 100)) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					if (!move.spreadHit) this.attrLastMove('[miss]');
					this.add('-miss', pokemon, target);
				}
				if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
					this.boost({spe: 2}, pokemon);
				}
				hitResults[i] = false;
				continue;
			}
			if (move.secondaries && move.id !== 'secretpower') {
				for (const secondary of move.secondaries) {
					if (secondary.status !== ('brn' || 'par' || 'tox' || 'psn' || 'frz')) return;
					//this.add('-curestatus', target, target.status, '[Silent]');
					target.setStatus('');
				}
			}	else if (move.status) {
					//this.add('-curestatus', target, target.status, '[Silent]');
					target.setStatus('');
			}
			hitResults[i] = true;
		}
		return hitResults;
	},

	calculateStat(statName: StatNameExceptHP, boost: number, modifier?: number) {
		statName = toID(statName) as StatNameExceptHP;
		// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
		if (statName === 'hp') throw new Error("Please read `maxhp` directly");

		// base stat
		let stat = this.storedStats[statName];

		// Wonder Room swaps defenses before calculating anything else
		if ('wonderroom' in this.battle.field.pseudoWeather) {
			if (statName === 'def') {
				stat = this.storedStats['spd'];
			} else if (statName === 'spd') {
				stat = this.storedStats['def'];
			}
		}

		// stat boosts
		let boosts: SparseBoostsTable = {};
		const boostName = statName as BoostName;
		boosts[boostName] = boost;
		boosts = this.battle.runEvent('ModifyBoost', this, null, null, boosts);
		boost = boosts[boostName]!;
		const boostTable = [1, 1.5];
		if (boost > 1) boost = 1;
		if (boost < -1) boost = -1;
		if (boost >= 0) {
			stat = Math.floor(stat * boostTable[boost]);
		} else {
			stat = Math.floor(stat / boostTable[-boost]);
		}

		// stat modifier
		return this.battle.modify(stat, (modifier || 1));
	},

	getStat(statName: StatNameExceptHP, unboosted?: boolean, unmodified?: boolean) {
		statName = toID(statName) as StatNameExceptHP;
		// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
		if (statName === 'hp') throw new Error("Please read `maxhp` directly");

		// base stat
		let stat = this.storedStats[statName];

		// Download ignores Wonder Room's effect, but this results in
		// stat stages being calculated on the opposite defensive stat
		if (unmodified && 'wonderroom' in this.battle.field.pseudoWeather) {
			if (statName === 'def') {
				statName = 'spd';
			} else if (statName === 'spd') {
				statName = 'def';
			}
		}

		// stat boosts
		if (!unboosted) {
			const boosts = this.battle.runEvent('ModifyBoost', this, null, null, {...this.boosts});
			let boost = boosts[statName];
			const boostTable = [1, 1.5];
			if (boost > 1) boost = 1;
			if (boost < -1) boost = -1;
			if (boost >= 0) {
				stat = Math.floor(stat * boostTable[boost]);
			} else {
				stat = Math.floor(stat / boostTable[-boost]);
			}
		}

		// stat modifier effects
		if (!unmodified) {
			const statTable: {[s in StatNameExceptHP]?: string} = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
			stat = this.battle.runEvent('Modify' + statTable[statName], this, null, null, stat);
		}

		if (statName === 'spe' && stat > 10000) stat = 10000;
		return stat;
	},

	heal(damage: number, target?: Pokemon, source: Pokemon | null = null, effect: 'drain' | Effect | null = null) {
		if (this.event) {
			if (!target) target = this.event.target;
			if (!source) source = this.event.source;
			if (!effect) effect = this.effect;
		}
		if (effect === 'drain') effect = this.dex.getEffectByID(effect as ID);
		if (damage && damage <= 1) damage = 1;
		damage = this.trunc(damage);
		// for things like Liquid Ooze, the Heal event still happens when nothing is healed.
		damage = this.runEvent('TryHeal', target, source, effect, damage);
		if (!damage) return damage;
		if (!target || !target.hp) return false;
		if (!target.isActive) return false;
		if (target.hp >= target.maxhp) return false;
		const finalDamage = target.heal(damage, source, effect);
		switch (effect?.id) {
		case 'leechseed':
			/*
		case 'rest':
			this.add('-heal', target, target.getHealth, '[silent]');
			break;
		*/
		case 'drain':
			this.add('-heal', target, target.getHealth, '[from] drain', '[of] ' + source);
			break;
		case 'wish':
			break;
		case 'zpower':
			this.add('-heal', target, target.getHealth, '[zeffect]');
			break;
		default:
			if (!effect) break;
			if (effect.effectType === 'Move') {
				this.add('-heal', target, target.getHealth);
			} else if (source && source !== target) {
				this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname, '[of] ' + source);
			} else {
				this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname);
			}
			break;
		}
		this.runEvent('Heal', target, source, effect, finalDamage);
		return finalDamage;
	},

	pokemon: {
		boostBy(boosts: SparseBoostsTable) {
			let delta = 0;
			let boostName: BoostName;
			for (boostName in boosts) {
				delta = boosts[boostName]!;
				this.boosts[boostName] += delta;
				if (this.boosts[boostName] > 1) {
					delta -= this.boosts[boostName] - 1;
					this.boosts[boostName] = 1;
				}
				if (this.boosts[boostName] < -1) {
					delta -= this.boosts[boostName] - (-1);
					this.boosts[boostName] = -1;
				}
			}
			return delta;
		},

		/*
		getStat(statName: StatNameExceptHP, unboosted?: boolean, unmodified?: boolean) {
			statName = toID(statName) as StatNameExceptHP;
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");
	
			// base stat
			let stat = this.storedStats[statName];
	
			// Download ignores Wonder Room's effect, but this results in
			// stat stages being calculated on the opposite defensive stat
			if (unmodified && 'wonderroom' in this.battle.field.pseudoWeather) {
				if (statName === 'def') {
					statName = 'spd';
				} else if (statName === 'spd') {
					statName = 'def';
				}
			}
	
			// stat boosts
			if (!unboosted) {
				const boosts = this.battle.runEvent('ModifyBoost', this, null, null, {...this.boosts});
				let boost = boosts[statName];
				const boostTable = [1, 1.5];
				if (boost > 1) boost = 1;
				if (boost < -1) boost = -1;
				if (boost >= 0) {
					stat = Math.floor(stat * boostTable[boost]);
				} else {
					stat = Math.floor(stat / boostTable[-boost]);
				}
			}
	
			// stat modifier effects
			if (!unmodified) {
				const statTable: {[s in StatNameExceptHP]?: string} = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
				stat = this.battle.runEvent('Modify' + statTable[statName], this, null, null, stat);
			}
	
			if (statName === 'spe' && stat > 10000) stat = 10000;
			return stat;
		},
		*/

		modifyDamage(
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;
	
			baseDamage += 2;
	
			// multi-target modifier (doubles only)
			if (move.spreadHit) {
				const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
				this.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.modify(baseDamage, spreadModifier);
			}
	
			// weather modifier
			baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);
	
			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
			}
	
			// random factor - also not a modifier
			baseDamage = this.randomizer(baseDamage);
	
			// STAB
			if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
				// The "???" type never gets STAB
				// Not even if you Roost in Gen 4 and somehow manage to use
				// Struggle in the same turn.
				// (On second thought, it might be easier to get a MissingNo.)
				baseDamage = this.modify(baseDamage, move.stab || 1.5);
			}
			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.add('-supereffective', target);
	
				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.add('-resisted', target);
	
				for (let i = 0; i > typeMod; i--) {
					baseDamage = tr(baseDamage / 2);
				}
			}
	
			if (isCrit && !suppressMessages) this.add('-crit', target);
	
			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
				if (this.gen < 6 || move.id !== 'facade') {
					baseDamage = this.modify(baseDamage, 0.5);
				}
			}

			if (pokemon.status === 'frz' && move.category === 'Special' && pokemon.hasAbility('guts')) {
				baseDamage = this.modify(baseDamage, 0.5);
			}
	
			// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
			if (this.gen === 5 && !baseDamage) baseDamage = 1;
	
			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);
	
			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.modify(baseDamage, 0.25);
				this.add('-zbroken', target);
			}
	
			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (this.gen !== 5 && !baseDamage) return 1;
	
			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		},
	},
};
