export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	thunderhead: {
		desc: "This Pokémon ignores other Pokémon's Attack, Special Attack, and accuracy stat stages when taking damage, and ignores other Pokémon's Defense, Special Defense, and evasiveness stat stages when dealing damage. When this Pokémon is hit by an attack, Electric Terrain begins.",
		shortDesc: "Ignores stat changes. Sets Electric Terrain when attacked.",
		name: "Thunderhead",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectData.target;
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
		onDamagingHit(damage, target, source, move) {
			if (!this.field.isTerrain('electricterrain')) {
	  		this.field.setTerrain('electricterrain');
			}
		},
		rating: 4,
		num: -1001,
	},
	coldsweat: {
		desc: "On switch-in, this Pokémon summons hail. It changes the current weather to rain whenever any opposing Pokémon has an attack that is super effective on this Pokémon or an OHKO move. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves.",
		shortDesc: "Summons hail on switch-in. Changes weather to rain if the foe has a supereffective or OHKO move.",
		onStart(source) {
			this.field.setWeather('hail');
			for (const target of source.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, source) && this.dex.getEffectiveness(moveType, source) > 0 ||
						move.ohko
					) {
						this.field.setWeather('raindance');
						return;
					}
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, source) && this.dex.getEffectiveness(moveType, source) > 0 ||
						move.ohko
					) {
						this.field.setWeather('raindance', source);
						return;
					}
				}
			}
		},
		name: "Cold Sweat",
		rating: 4,
		num: -1002,
	},
	trashcompactor: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it clears the hazard and Stockpiles 1.",
		shortDesc: "Hazard immunity. Clears hazards, Stockpiles 1 if switched in on them.",
		onAfterMega(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition) && !this.field.pseudoWeather.stickyresidues) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Trash Compactor');
						activated = true;
						this.useMove('stockpile', pokemon);
					}
					pokemon.side.removeSideCondition(sideCondition);
					this.add('-sideend', pokemon.side, this.dex.getEffect(sideCondition).name, '[from] Ability: Trash Compactor', '[of] ' + pokemon);
				}
			}
		},
		name: "Trash Compactor",
		rating: 5,
		num: -1003,
	},
	timewarp: {
		desc: "On switch-in, the field becomes Trick Room. This room remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Trick Room begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.removePseudoWeather('trickroom');
			this.field.addPseudoWeather('trickroom');
		},
		onAnyTryMove(target, source, effect) {
			if (['trickroom'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Time Warp', effect, '[of] ' + target);
				return false;
			}
		},
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('timewarp')) {
					return;
				}
			}
			this.field.removePseudoWeather('trickroom');
		},
		name: "Time Warp",
		rating: 4.5,
		num: -1004,
	},
	damp: {
		desc: "While this Pokemon is active, Explosion, Mind Blown, Self-Destruct, Sparksplosion and the Aftermath Ability are prevented from having an effect.",
		shortDesc: "Prevents Explosion/Mind Blown/Self-Destruct/Aftermath while this Pokemon is active.",
		onAnyTryMove(target, source, effect) {
			if (['explosion', 'mindblown', 'selfdestruct', 'mistyexplosion', 'sparksplosion'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Damp', effect, '[of] ' + target);
				return false;
			}
		},
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.id === 'aftermath') {
				return false;
			}
		},
		name: "Damp",
		rating: 1,
		num: 6,
	},
	filter: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 1) {
				this.debug('Filter neutralize');
				return this.chainModify(0.5);
			} else if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Filter neutralize');
				return this.chainModify(0.75);
			}
		},
		name: "Filter",
		rating: 3,
		num: 111,
	},
	chlorovolt: {
		onModifySpe(spe, pokemon) {
			if (this.field.isTerrain('electricterrain') && ['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(4);
			} else if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			} else if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(2);
			}
		},
		name: "ChloroVolt",
		rating: 3,
		num: -1005,
	},
	flametouch: {
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'brn',
				ability: this.dex.getAbility('flametouch'),
			});
		},
		name: "Flame Touch",
		rating: 2,
		num: -1006,
	},
	parasomnia: {
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
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in source.storedStats) {
				if (source.storedStats[s] > bestStat) {
					statName = s;
					bestStat = source.storedStats[s];
				}
			}
			this.boost({[statName]: 1}, target);
		},
		name: "Parasomnia",
		rating: 3.5,
		num: -1007,
	},
	guardup: {
		onStart(pokemon) {
			let totalatk = 0;
			let totalspa = 0;
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				totalatk += target.getStat('atk', false, true);
				totalspa += target.getStat('spa', false, true);
			}
			if (totalatk && totalatk >= totalspa) {
				this.boost({def: 1});
			} else if (totalspa) {
				this.boost({spd: 1});
			}
		},
		name: "Guard Up",
		rating: 4,
		num: -1008,
	},
	knightsblade: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			const bladeMoves = [
				'aircutter', 'airslash', 'crosspoison', 'cut', 'furycutter', 'guillotine', 'leafblade', 'nightslash', 'psychocut', 'razorshell', 'sacredsword', 'secretsword', 'slash', 'solarblade', 'xscissor',
			];
			if (bladeMoves.includes(move.id)) {
				return this.chainModify(1.5);
			}
		},
		name: "Knight's Blade",
		rating: 3,
		num: -1009,
	},
	swarm: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		name: "Swarm",
		rating: 2,
		num: 68,
	},
};
