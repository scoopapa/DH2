export const Abilities: {[k: string]: ModdedAbilityData} = {
  	ultraluck: {
		onModifyCritRatio(critRatio) {
			return critRatio + 3;
		},
		flags: {},
		name: "Ultra Luck",
		shortDesc: "This Pokemon's moves have +3 crit ratio.",
	},
    degenerator: {
		onSwitchOut(pokemon) {
			for (const target of pokemon.foes()) {
				this.damage(target.baseMaxhp * 0.30, target, pokemon);
			}
		},
		flags: {},
		name: "Degenerator",
		shortDesc: "When the user switches out, damage active opponents by 30% of their max HP.",
	},
	dtairslash: {
		onTryHit(target, source, move) {
			if (move.type === 'Flying' && move.name != 'Air Slash') {
				this.add('-immune', target, '[from] ability: !dt air slash');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "!dt air slash",
		shortDesc: "This Pokemon is immune to most Flying-type moves.",
	},
  	alphasigmarizz: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'healblock', 'taunt'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Alpha Sigma Rizz', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Alpha Sigma Rizz');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Alpha Sigma Rizz",
		rating: 2,
		num: 165,
		shortDesc: "This pokemon can't get infatuated, taunted, heal blocked, or statused.",
	},
	perfectionist: {
		onModifyMove(move, pokemon) {
			const basePowerAfterMultiplier = this.modify(move.basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Perfectionist boost');
				move.basePower *= 1.5;
				move.accuracy = true;
			}
		},
		flags: {},
		name: "Perfectionist",
		shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power and can't miss.",
	},
    justalittleguy: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (attacker.getWeight() > defender.getWeight()) {
				this.debug('JALG weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (attacker.getWeight() > defender.getWeight()) {
				this.debug('JALG weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Just a Little Guy",
		shortDesc: "Takes half damage if lighter than opponent.",
	},
  	chainedwrath: {
		onStart(pokemon) {
			let ownspe = 0;
			let foespe = 0;
			for (const target of pokemon.foes()) {
				ownspe += pokemon.getStat('spe', false, true);
				foespe += target.getStat('spe', false, true);
			}
			if (foespe > ownspe) {
				this.boost({atk: 1});
			} 
		},
		flags: {},
		name: "Chained Wrath",
		shortDesc: "When the opponent's speed is higher than this Pokemon's, its Attack is raised by 1 stage.",
		rating: 3.5,
		num: 88,
	},
	identitycrisis: {
        onResidualOrder: 28,
        onResidualSubOrder: 2,
        onResidual(pokemon) {
            if (!pokemon.hp) return;
            const names = ['anaconja', 'earl', 'Orangesodapop', 'Jumpheart', 'zxgzxg', 'TTTech_', 'gekokeso', 'MemesBita', 'regiboat', 'Tanny89k', 'Fragmented', 'Gaboswampert', 'DenebStargazer', 'Beebos', 'PalpitoadChamp', 'Soul Dew Latias', 'woo', 'AquaticPanic', 'Yoshiblaze'];
            const avatars = ['shelly', 'janitor', 'crasherwake', 'bianca', 'miku-water', 'burglar', 'swimmer-gen4dp', 'wattson', 'blue-gen1', 'anabel', 'klara', 'psychic-lgpe', 'maid', 'pokemonbreederf', 'brycenman', 'lyra', 'lana-masters', 'hilda', 'schoolkid-gen4'];
            const pokemons = this.dex.species.all();
            pokemon.formeChange(this.sample(pokemons));
            const randomNumber = this.random(names.length);
            pokemon.side.name = names[randomNumber];
            pokemon.side.avatar = avatars[randomNumber];
        },
        flags: {},
        name: "Identity Crisis",
        shortDesc: "At the end of each turn, change this Pokemon and its side's name and avatar to a random one.",
    },
	auctorwile: {
		onDamagingHit(damage, target, source, move) {
			if(effect.effectType === 'Move' && move.flags['punch']) this.damage(source.baseMaxhp / 4, source, target);
		},
		flags: {},
		name: "Auctor Wile",
		shortDesc: "If this Pokemon is damaged by a punching move, the attacker loses 25% max HP.",
	},
	ironnose: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Steel') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Iron Nose');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Steel' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Iron Nose');
				}
				return this.effectState.target;
			}
		},
		flags: {breakable: 1},
		name: "Iron Nose",
		shortDesc: "This Pokemon draws Steel moves to itself to raise Atk by 1; Steel immunity."
	},
	protostasis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protostasis is not affected by Utility Umbrella
			if (this.field.isWeather('snow')) {
				pokemon.addVolatile('protostasis');
			} else if (!pokemon.volatiles['protostasis']?.fromBooster) {
				pokemon.removeVolatile('protostasis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protostasis'];
			this.add('-end', pokemon, 'Protostasis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protostasis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protostasis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protostasis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protostasis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protostasis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protostasis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protostasis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protostasis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protostasis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Protostasis",
		rating: 3,
		shortDesc: "Snow active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
	},
	illuminate: {
		onStart(pokemon) {
			this.boost({accuracy: 1}, pokemon);
		},
		flags: {},
		name: "Illuminate",
		shortDesc: "On switch-in, this Pokemon's accuracy is raised by one stage.",
	},
	flyeater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Bug') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Fly Eater');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Fly Eater",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Bug moves; Bug immunity.",
	},
	growthveil: { // Too long
		id: "growthveil",
		name: "Growth Veil",
		shortDesc: "Regenerator + Flower Veil",
		desc: "Restores 1/3 max HP on switch-out; ally Grass-types can't have stats lowered or status inflicted.",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onAllyBoost(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Grass')) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Growth Veil', '[of] ' + effectHolder);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (target.hasType('Grass') && source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Growth Veil');
				if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Growth Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target.hasType('Grass') && status.id === 'yawn') {
				this.debug('Growth Veil blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Growth Veil', '[of] ' + effectHolder);
				return null;
			}
		},
	},
	bravery: {
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Bravery');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Bravery');
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
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Bravery', '[of] ' + target);
			}
		},
		flags: {},
		name: "Bravery",
		shortDesc: "Sturdy + Scrappy",
	},
	prismwings: {
		onStart(pokemon) {
			pokemon.addVolatile('prismwings');
		},
		condition: {
			noCopy: true,
			duration: 1,
			onStart(pokemon) {
				const allTypes = this.dex.deepClone(this.dex.types.all());
				pokemon.setType(allTypes);
				this.add('-start', pokemon, 'typechange', allTypes.join('/'), '[from] ability: Prism Wings');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
		flags: {},
		name: "Prism Wings",
		shortDesc: "On switch-in, this Pokemon is all types for one turn.",
	},
	steeldrummer: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || move.type !== 'Steel') {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || move.hasBounced || move.type !== 'Steel') {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, this.effectState.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		flags: {breakable: 1},
		name: "Steel Drummer",
		shortDesc: "This Pokemon blocks Steel-type moves and bounces them back to the user.",
	},
	timebomb: {
		onModifyMove(move) {
			if(move.category !== 'Status') move.selfdestruct = "always";
		},
		flags: {},
		name: "Time Bomb",
		shortDesc: "This Pokemon's attacks cause it to faint.",
	},
	impalpable: {
		onTryHit(target, source, move) {
			if (source.hasType(move.type) && target !== source) {
				this.add('-immune', target, '[from] ability: Impalpable');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Impalpable",
		shortDesc: "This Pokemon is non-grounded, and is immune to its own and the opponent's STABs.",
	},
	getsturdy: {
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (source.getMoveHitData(move).crit) {
				this.boost({spe: -1}, target, source, null, true);
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				const oldAbility = target.setAbility('sturdy', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Get Sturdy', this.dex.abilities.get(oldAbility).name, '[of] ' + target);
				}
				return target.hp - 1;
			}
		},
		flags: {},
		name: "Get Sturdy",
		shortDesc: "Super Luck + Sturdy + crits lower Def by 1 + sets ability to Sturdy at 1 HP.",
	},
	champion: {
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		flags: {},
		name: "champion",
		shortDesc: "Swift Swim + Rain Dish",
	},
}
