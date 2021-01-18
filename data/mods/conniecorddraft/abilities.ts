export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	chickenout: {
		shortDesc: "When its HP reaches 0, this Pokémon retreats to the party, and then...",
		name: "Chicken Out",
		onBeforeSwitchIn(pokemon) {
			if (pokemon.headless) {
				pokemon.setAbility('wonderguard');
				pokemon.baseAbility = 'wonderguard';
				pokemon.ability = 'wonderguard';
				pokemon.headless = false;
				pokemon.switchedIn = false;
				delete pokemon.switchedIn;
			}
		},
		onFaint(pokemon) {
			if (pokemon.headless === true) {
				if (pokemon.formeChange('Poultergeist-Headless', this.effect, true)) {
					this.add('-ability', pokemon, 'Chicken Out');
					this.add('-message', `${pokemon.name} ran off somewhere...`);
					pokemon.maxhp = 1;
					pokemon.hp = 1;
				}
			}
		},
		isUnbreakable: true,
		isPermanent: true,
		rating: 5,
		num: -1001,
	},
	dialogue: {
		name: "Dialogue",
		num: -1002,
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (target.getAbility().isPermanent || target.ability === 'contrary') continue;
				const oldAbility = target.setAbility('contrary');
				if (oldAbility) {
					this.add('-ability', target, 'Contrary', '[from] Ability: Dialogue', '[of] ' + pokemon);
					return;
				}
			}
		},
		shortDesc: "On entry, changes the Abilities of all adjacent Pokémon to Contrary.",
	},
	frozenpower: {
		name: "Frozen Power",
		num: -1003,
		onBoost(boost, target, source, effect) {
			if (!this.field.isWeather('hail')) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Frozen Power", "[of] " + target);
			}
		},
		shortDesc: "In Hail, this Pokémon's stats cannot be lowered.",
	},
	permafrost: {
		name: "Permafrost",
		num: -1004,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Permafrost', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		shortDesc: "On switch-in, this Pokémon lowers the Speed of adjacent opponents by 1 stage.",
	},
	grampandemonium: { // have yet to account for sacrificial KOs
		name: "Grampandemonium",
		num: -1005,
		onStart(pokemon) {
			console.log("Allies: " + pokemon.side.pokemon);
			console.log("Fainted allies: " + pokemon.side.pokemon.filter(ally => ally.fainted));
			console.log("NFE allies: " + pokemon.side.pokemon.filter(ally => ally.baseSpecies.nfe));
			let allies = pokemon.side.pokemon.filter(ally => ally.fainted && ally.baseSpecies.nfe);
			console.log("Fainted NFE allies: " + allies);
			console.log("Stages to boost: " + allies.length);
			if (allies.length) {
				console.log("Should be boosting by that many stages");
				this.boost({spa: allies.length}, pokemon);
			} else {
				console.log("No fainted NFE allies");
			}
		},
		desc: "On switch-in, this Pokemon gets +1 SpA for every NFE ally that is KOed. Self-KOs, e.g. Life Orb recoil or sacrificial moves such as Explosion or Memento, do not trigger this.",
		shortDesc: "+1 SpA on switch-in for every fainted NFE in the party.",
	},
	stonilate: {
		name: "Stonilate",
		num: -1006,
		shortDesc: "Normal attacks become Rock; 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Rock';
				move.refrigerateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.refrigerateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
	},
	shpeedforce: {
		name: "Shpeed Force",
		num: -1007,
		shortDesc: "Electric power 1.5x. At the end of each turn, +1 Spe.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.5);
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
	},
	viciousjaw: {
		name: "Vicious Jaw",
		num: -1008,
		onSourceHit(target, source, move) {
			if (!move || !target || !target.hp) return;
			if (target !== source && move.flags['bite']) {
				target.addVolatile('viciousjaw');
			}
		},
		condition: {
			noCopy: true,
			duration: 4,
			onStart(pokemon) {
				this.add('-message', `${pokemon.name}'s bite is bleeding!`);
				this.add('-start', pokemon, 'ability: Vicious Jaw', '[silent]');
			},
			onResidualOrder: 20,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 16);
			},
			onEnd(pokemon) {
				this.damage(pokemon.baseMaxhp / 16);
				this.add('-end', pokemon, 'ability: Vicious Jaw', '[silent]');
			},
		},
		shortDesc: "On landing a biting move, inflicts Bleed (1/16 max HP for 4 turns).",
	},
	playtime: {
		name: "Playtime",
		num: -1009,
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) {
				return this.chainModify(0.25);
				this.add('-message', "Koda wants to play too!");
			}
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		desc: "This Pokémon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "This Pokémon's damaging moves hit twice. The second hit has its damage quartered.",
	},
	inversionwarp: {
		name: "Inversion Warp",
		num: -1010,
		onStart(source) {
			this.field.addPseudoWeather('inversionwarp');
		},
		condition: {
			duration: 5,
			onEffectiveness(typeMod, target, type, move) {
				if (move && this.dex.getImmunity(move, type) === false) return 1;
				return typeMod * -1;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Inversion Warp', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('inversionwarp');
			},
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Inversion Warp');
			},
		},
		shortDesc: "5 turns: Type effectiveness is inverted.",
	},
	damagewarp: {
		name: "Damage Warp",
		num: -1011,
		onStart(source) {
			this.field.addPseudoWeather('damagewarp');
		},
		condition: {
			duration: 5,
			onStart(target, source) {
				this.add('-fieldstart', 'move: Damage Warp', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('damagewarp');
			},
			onModifyAtk(atk, pokemon) {
				return pokemon.getStat('def', false, true);
			},
			onModifyDef(def, pokemon) {
				return pokemon.getStat('atk', false, true);
			},
			onModifySpA(spa, pokemon) {
				return pokemon.getStat('spd', false, true);
			},
			onModifySpD(spd, pokemon) {
				return pokemon.getStat('spa', false, true);
			},
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Damage Warp');
			},
		},
		shortDesc: "5 turns: Atk is swapped for Def, Sp. Atk for Sp. Def.",
	},
	epipelagicdeity: {
		name: "Epipelagic Deity", 
		num: -1012,
		onModifySpe(spe, pokemon) {
			const action = this.queue.willMove(pokemon);
			const move = action?.choice === 'move' ? action.move : null;
			if (move && move.type === 'Water') {
				return spe * 1.1;
			}
		},
		shortDesc: "This Pokémon's Spe is 1.1x on a turn where it selects a Water-type move.",
	},
	bathypelagicdeity: {
		name: "Bathypelagic Deity",
		num: -1013,
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
				this.debug('Bathypelagic Deity boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		shortDesc: "This Pokémon's attacks have 1.3x power if it is the last to move in a turn.",
	},
	mesopelagicdeity: {
		name: "Mesopelagic Deity",
		num: -1014,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if ((defender.hp <= defender.maxhp / 2) && (move.type === 'Water')) {
				this.debug('Mesopelagic Deity boost');
				return this.chainModify(1.2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if ((defender.hp <= defender.maxhp / 2) && (move.type === 'Water')) {
				this.debug('Mesopelagic Deity boost');
				return this.chainModify(1.2);
			}
		},
		shortDesc: "This Pokémon's attacks have 1.2x power against foes under 1/2 health.",
	},
	venomdrain: {
		name: "Venom Drain",
		num: -1015,
		onAnyDamage(damage, target, source, effect) {
			if (effect && (effect.id === 'tox' || effect.id === 'psn')) {
				if (damage > 0) {
					this.heal(damage / 2, this.effectData.target, target);
				}
			}
		},
		desc: "If another Pokémon is poisoned, heals 1/2 the damage taken from that poison.",
	},
};
