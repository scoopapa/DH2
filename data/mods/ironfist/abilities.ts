import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';
import {Pokemon} from "../../../sim/pokemon";

// Similar to User.usergroups. Cannot import here due to users.ts requiring Chat
// This also acts as a cache, meaning ranks will only update when a hotpatch/restart occurs
const usergroups: {[userid: string]: string} = {};
const usergroupData = FS('config/usergroups.csv').readIfExistsSync().split('\n');
for (const row of usergroupData) {
	if (!toID(row)) continue;

	const cells = row.split(',');
	if (cells.length > 3) throw new Error(`Invalid entry when parsing usergroups.csv`);
	usergroups[toID(cells[0])] = cells[1].trim() || ' ';
}

export function getName(name: string): string {
	const userid = toID(name);
	if (!userid) throw new Error('No/Invalid name passed to getSymbol');

	const group = usergroups[userid] || ' ';
	return group + name;
}

export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
  	//slate 1
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
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|Please grow and change as a person.`);
				this.damage(target.baseMaxhp * 0.22, target, pokemon);
			}
		},
		flags: {},
		name: "Degenerator",
		shortDesc: "When the user switches out, damage active opponents by 22% of their max HP.",
	},
	dtairslash: {
		onTryHit(target, source, move) {
			if (move.type === 'Flying' && move.name !== 'Air Slash') {
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
		shortDesc: "This Pokemon takes halved damage from heavier attackers.",
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
        shortDesc: "End of turn: change this Pokemon and its side's name and avatar to a random one.",
    },
	auctorwile: {
		onDamagingHit(damage, target, source, move) {
			if(move.flags['punch']) this.damage(source.baseMaxhp / 4, source, target);
		},
		flags: {},
		name: "Auctor Wile",
		shortDesc: "If this Pokemon is damaged by a punching move, the attacker loses 25% max HP.",
	},
	
	//slate 2
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
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Illuminate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({evasion: -2}, target, pokemon, null, true);
					this.boost({accuracy: 1}, pokemon);
				}
			}
		},
		flags: {},
		name: "Illuminate",
		shortDesc: "On switch-in, this Pokemon's accuracy +1 and foe(s)' evasion -2.",
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
	growthveil: {
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
		//screens code in moves.ts; weather code in conditions.ts
		flags: {},
		name: "Time Bomb",
		shortDesc: "This Pokemon's attacks cause it to faint. Its use of Reflect/Light Screen/weather lasts 10 turns.",
	},
	impalpable: {
		onSourceModifyDamage(damage, target, source, move) {
			if ((source.hasType(move.type) || target.hasType(move.type)) && target !== source) {
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Impalpable",
		shortDesc: "This Pokemon is non-grounded, and takes halved damage from its/foe's STABs.",
	},
	getsilly: {
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (target.getMoveHitData(move).crit) {
				this.boost({def: -1}, target, source, null, true);
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-activate', target, 'ability: Get Silly');
				source.addVolatile('clownnose');
				return target.hp - 2;
			}
		},
		flags: {},
		name: "Get Silly",
		shortDesc: "Super Luck + Sturdy + crits lower Def by 1 + attacker grows a clown nose at 2 HP.",
	},
	champion: {
		onStart(pokemon) {
			pokemon.addVolatile('ability:swiftswim');
			pokemon.addVolatile('ability:hydration');
			pokemon.addVolatile('ability:waterabsorb');
		},
		flags: {},
		name: "champion",
		shortDesc: "Swift Swim + Hydration + Water Absorb",
	},

	//slate 3
	milf: {
		//code in rulesets.ts
		flags: {},
		name: "MILF",
		shortDesc: "At the start of the battle, add 2 Fishing Tokens to the user's side.",
	},
	benevolentblessing: {
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
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if(this.randomChance(1, 20)) pokemon.setStatus('slp');
			if(this.randomChance(1, 100)) {
				for (const target of pokemon.adjacentFoes()) {
					this.actions.useMove('finalgambit', pokemon, target);
				}
			}
		},
		//mogoff effect in its entry
		flags: {},
		name: "Benevolent Blessing",
		shortDesc: "Serene Grace + 5% slp, 1% Final Gambit; Mog Off: 50% Swagger, 50% Self-Destruct.",
	},
	fishercat: {
		onSourceDamagingHit(damage, target, source, move) {
			if(move.flags['fishing']) {
				this.heal(source.baseMaxhp / 4, source, source);
				source.side.addFishingTokens(1);
			}
		},
		flags: {},
		name: "Fishercat",
		shortDesc: "This Pokemon heals 1/4 of its max HP and adds 1 Fishing Token after using a fishing move.",
	},
	rkssystem: {
		inherit: true,
		shortDesc: "RKS System + Magic Guard",
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
	},
	frozenlandscape: {
		onStart(source) {
			this.field.setTerrain('frigidterrain');
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				if(source.setType('Ice')) this.add('-start', source, 'typechange', 'Ice');
			}
		},
		flags: {},
		name: "Frozen Landscape",
		shortDesc: "On contact, attacker becomes Ice-type. Sets Frigid Terrain on switchin.",
	},
	thediamondhand: {
		onStart(pokemon) {
			const diamondHand = pokemon.side.pokemon.filter(p => p != pokemon && !p.fainted && p.baseSpecies.diamondHand);
			if (diamondHand.length > 0) {
				this.add('-activate', pokemon, 'ability: The Diamond Hand');
				this.add('-start', pokemon, `diamondHand${diamondHand.length}`, '[silent]');
				this.effectState.diamondHand = diamondHand.length;
				this.boost({atk: -1 * diamondHand.length, spa: -1 * diamondHand.length}, pokemon, pokemon);
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `diamondHand${this.effectState.diamondHand}`, '[silent]');
		},
		onModifyCritRatio(critRatio) {
			return critRatio + this.effectState.diamondHand;
		},
		flags: {},
		name: "The Diamond Hand",
		shortDesc: "This Pokemon's Atk/SpA -1, but crit rate +1 for each other unfainted Diamond Hand ally.",
	},
	ilovefishing: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['fishing']) {
				return this.chainModify(1.5);
			}
		},
		//tera effect in scripts.ts
		flags: {},
		name: "I Love Fishing",
		shortDesc: "This Pokemon's fishing moves have 1.5x power; Big Button Teras Water.",
	},
	toxicmasculinity: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					target.side.addSideCondition('toxicspikes', source);
					this.add("-fail", target, "unboost", "Attack", "[from] ability: toxic masculinity", "[of] " + target);
				}
			}
		},
		flags: {},
		name: "toxic masculinity",
		shortDesc: "This Pokemon's Attack cannot be lowered. If it would, set Toxic Spikes on the opponent's side.",
	},
	magneticstorm: {
		shortDesc: "Magnet Pull + Storm Drain",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Steel') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!(source ||= this.effectState.target) || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Steel')) {
				pokemon.maybeTrapped = true;
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Magnetic Storm');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Magnetic Storm');
				}
				return this.effectState.target;
			}
		},
		flags: {breakable: 1},
		name: "Magnetic Storm",
	},
	riverthief: {
		onSourceModifyDamage(damage, source, target, move) {
			if (source.baseSpecies.fish || source.hasType('Water')) {
				this.debug('River Thief neutralize');
				return this.chainModify(0.75);
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (move && source.baseSpecies.fish || source.hasType('Water')) {
				return this.chainModify([5120, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "River Thief",
		shortDesc: "Takes 0.75x damage from Fish/Water Pokemon and deals 1.25x damage to them.",
	},
	fishysurge: {
		onStart(source) {
			this.field.setTerrain('fishingterrain');
		},
		flags: {},
		name: "Fishy Surge",
		shortDesc: "On switchin, this Pokemon sets Fishing Terrain.",
	},
	biglady: {
		onUpdate(pokemon) {
			if (!pokemon.bigLadyBoosted && pokemon.volatiles['bigbutton']) {
				pokemon.bigLadyBoosted = true;
				this.add('-activate', pokemon, 'ability: Big Lady');
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1});
			}
		},
		onSwitchOut(pokemon) {
			pokemon.bigLadyBoosted = false;
		},
		flags: {breakable: 1},
		name: "Big Lady",
		shortDesc: "When this Pokemon uses Big Button, its stats are raised by 1 stage.",
	},
	pvzfishing: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: PVZ Fishing');
			return null;
		},
		onEffectiveness(typeMod, target, type, move) {
			if(move.type === 'Grass') return 1;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass') return this.chainModify(2);
		},
		onModifyMove(move) {
			delete move.flags['contact'];
		},
		flags: {breakable: 1},
		name: "PVZ Fishing",
		shortDesc: "Suction Cups + Long Reach; this Pokemon is 4x weak to Grass moves.",
	},
	kaijukiller: {
		onUpdate(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (!pokemon.kaijuKillerBoosted && target.volatiles['bigbutton']) {
					pokemon.kaijuKillerBoosted = true;
					this.add('-activate', pokemon, 'ability: Kaiju Killer');
					this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1});
				}
			}
		},
		onSwitchOut(pokemon) {
			pokemon.kaijuKillerBoosted = false;
		},
		flags: {breakable: 1},
		name: "Kaiju Killer",
		shortDesc: "When another Pokemon uses Big Button, this Pokemon's stats are raised by 1 stage.",
	},
	ironlady: {
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Iron Lady');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Iron Lady boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		onModifyMove(move) {
			move.forceSTAB = true;
		},
		flags: {},
		name: "Iron Lady",
		shortDesc: "Supreme Overlord + This Pokemon's moves have STAB.",
	},
	skillissue: {
		onFlinch(pokemon) {
			this.boost({spe: 1});
		},
		onStart(pokemon) {
			// n.b. only affects Hackmons
			// interaction with No Ability is complicated: https://www.smogon.com/forums/threads/pokemon-sun-moon-battle-mechanics-research.3586701/page-76#post-7790209
			if (pokemon.adjacentFoes().some(foeActive => foeActive.ability === 'noability')) {
				this.effectState.gaveUp = true;
			}
			// interaction with Ability Shield is similar to No Ability
			if (pokemon.hasItem('Ability Shield')) {
				this.add('-block', pokemon, 'item: Ability Shield');
				this.effectState.gaveUp = true;
			}
			
			if (!pokemon.isStarted || this.effectState.gaveUp) return;

			const possibleTargets = pokemon.adjacentFoes().filter(
				target => !target.getAbility().flags['notrace'] && target.ability !== 'noability'
			);
			if (!possibleTargets.length) return;

			const target = this.sample(possibleTargets);
			const oldAbility = target.setAbility(pokemon.ability);
			if (oldAbility) {
				this.add('-ability', target, target.getAbility().name, '[from] ability: Skill Issue');
				return;
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		name: "Skill Issue",
		shortDesc: "Steadfast + On switchin, this Pokemon changes the ability of the opponent to this one.",
	},
	mysticslicer: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fairy';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			let mod = 1;
			if (move.typeChangerBoosted === this.effect) mod *= 1.2;
			if (move.flags['slicing']) mod *= 1.5;
			return this.chainModify(mod);
		},
		flags: {},
		name: "Mystic Slicer",
		shortDesc: "Sharpness + Pixilate",
	},
	partinggift: {
		onFaint(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (pokemon.item) this.actions.useMove('fling', pokemon, target);
			}
		},
		flags: {},
		name: "Parting Gift",
		shortDesc: "When this Pokemon's HP drops to 0, it uses Fling before fainting.",
	},
	abomacare: {
		onSwitchOut(pokemon) {
			this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
			pokemon.side.addSideCondition('abomacarespikes');
		},
		flags: {},
		name: "Aboma Care",
		shortDesc: "Upon switching out, this Pokemon loses 12% HP but the incoming Pokemon heals 25% HP.",
	},
	bramblinmentality: {
		onStart(pokemon) {
			pokemon.addVolatile('ability:comatose');
			if (pokemon.side.faintedThisTurn && ['bramblin', 'abomasnow', 'margaretthatcher', 'ronaldreagan'].includes(pokemon.side.faintedThisTurn.baseSpecies.id)) this.boost({atk: 1, def: 1, spe: -1}, pokemon);
		},
		// Permanent sleep "status" implemented in the relevant sleep-checking effects
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Bramblin Mentality",
		shortDesc: "Comatose; +1 Atk/Def/-1 Spe when replacing a fainted Bramblin/Abomasnow/Thatcher/Reagan.",
	},

	//slate 4
	reaganomics: {
		onStart(pokemon) {
			if (pokemon.reagan) return;
			pokemon.reagan = true;
			if(pokemon.side.fishingTokens > 0) pokemon.side.addFishingTokens(pokemon.side.fishingTokens);
			if(this.randomChance(1, 8192)) pokemon.side.foe.addFishingTokens(1);
		},
		flags: {},
		name: "Reaganomics",
		shortDesc: "On switchin, side's Fishing tokens x2. 1/8192 chance for +1 token for the foe. Once per battle.",
	},
	gexserver: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Gex Server');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|https://twitter.com/Duo__M2`);
					target.addVolatile('ability:hacked');
				}
			}
		},
		flags: {},
		name: "Gex Server",
		shortDesc: "On switchin, adjacent opponents have a 30% chance for -6 priority.",
	},
	lemonsqueezy: {
		onDamagingHit(damage, target, source, effect) {
			this.add('-activate', target, 'ability: Lemon Squeezy');
			this.add('-activate', target, 'move: Aromatherapy');
			for (const ally of target.side.pokemon) {
				if (ally !== target && (ally.volatiles['substitute'] && !move.infiltrates)) {
					continue;
				}
				ally.cureStatus();
			}
		},
		flags: {},
		name: "Lemon Squeezy",
		shortDesc: "This Pokemon cures its party of status conditions after it is damaged by a move.",
	},
	clownery: {
		onTryHit(target, source, move) {
			if (['Normal', 'Fighting'].includes(move.type) && target !== source) {
				this.add('-immune', target, '[from] ability: Clownery');
				return null;
			}
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			return -0.1;
		},
		flags: {breakable: 1},
		name: "Clownery",
		shortDesc: "This Pokemon moves last in its priority bracket, but is immune to Normal/Fighting.",
	},
	zesty: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Lemon' || move.type === 'Silly') {
				return this.chainModify(1.3);
			}
		},
		flags: {},
		name: "Zesty",
		shortDesc: "This Pokemon's Lemon/Silly-type moves have 1.3x power.",
	},
	lemonade: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if(source.setType('Lemon')) this.add('-start', source, 'typechange', 'Lemon');
		},
		flags: {},
		name: "Lemonade",
		shortDesc: "If this Pokémon is damaged by an attack, the attacker becomes a Lemon-type.",
	},
	wreckingball: {
		onTryHit(pokemon) {
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		flags: {},
		name: "Wrecking Ball",
		shortDesc: "This Pokemon's moves destroy screens.",

	},

	//slate 5
	crossover: {
		onModifyPriority(priority, pokemon, target, move) {
			const nonVanilla = ["Anarlvet",  "Kingler-Mega",  "microwave",  "Lytlegai",  "Ohmyrod",  "Big Crammer",  "Samurott-Sinnoh",  "Goomba",  "Fridgile",  "Melmetal 2",  "Pidown",  "Kurayami",  "Zelda",  "Drigike",  "Phish",  "Smelmetal",  "Bondra",  "Tangette-Eternal",  "Donmigo",  "Dragoone",  "Collachet",  "Guiltrism",  "Swooliobat",  "Electrode-Mega",  "Mario Kart Wii",  "Impalpitoad",  "Scrubby",  "Ogerpon-Cornerstone",  "palpitoad is so cool",  "Moltres-Mega",  "Jirachitwo",  "Shinx-Fishing",  "Conquescape",  "Daiyakuza",  "Pokestar Fisherman",  "Magnegiri",  "mario",  "Contamicow",  "Whonhef",  "Fish Factory",  "cowboy_bandido",  "Pokestar Giant",  "Richard Petty",  "Impidimp-Mega",  "Lemon",  "Fishing Zombie",  "Pokestar MT",  "Margaret Thatcher",  "Flesh Valiant",  "Flesh Valiant-Mega",  "Ronald Reagan",  "Lime Lips",  "Lemotic",  "Zestii",  "Rawring Moon",  "Boogerpon-CLOWNerstone",  "Keisberg-IF",  "Apple's Newest Emoji",  "Lemon Fish",  "Goddease",  "Jableye",  "Kyrum",  "Raccoon",  "Lucario-Calm",  "Nedontrol",  "Princirang",  "Iron Clown",  "The Pearl Hand",  "McFish",  "Applwirm",  "minun and plusle :D", "Traike", "Dr. Liberty", "Sunflora-Grave", "Hydralemon", "Hiveweb", "Syndican\'t", "Fish Marketing 3", "Lemonganium", "Carnivine-IF", "Grumpig", "Impromancer", "Pander Dragoon", "Soruarc", "Skibidragon", "Hitmontop-Mega", "Porygon-Z-Mega", "Furumo", "mega man", "Fudgesaur", "Fudgesaur-Mega", "darkpoison", "Sigma Rice Lion", "Lickilord", "Citrus Jams", "Everhál", "Grimace", "Pyroaring", "Tyler the Creator", "Bart", "Upvybones", "Ludicolo", "T'La'Ágh", "Regibloom", "Old Duke"];
			if (!target || target === pokemon) {
				if (!pokemon.adjacentFoes().length) return;
				target = this.sample(pokemon.adjacentFoes());
			}
			if (nonVanilla.includes(target.baseSpecies.name)) return priority + 1;
		},
		flags: {},
		name: "Crossover",
		shortDesc: "This Pokemon's moves have +1 priority against Fakemon.",
	},
	whatthesigma: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Silly') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: What the Sigma');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "What the Sigma",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Silly move; Silly immunity.",
	},
	steadfast: {
		inherit: true,
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') {
				this.boost({spe: 1});
				return null;
			}
		},
		shortDesc: "If this Pokemon were to flinch, its Speed is raised by 1 instead.",
	},
	justified: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Justified');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Justified",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Dark move; Dark immunity.",
	},
	bonappetit: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.hp < pokemon.baseMaxhp && pokemon.side.fishingTokens > 0) {
				pokemon.side.removeFishingTokens(1);
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		flags: {},
		name: "Bon Appetit",
		shortDesc: "At the end of each turn, consume 1 Fishing Token to heal 1/8 max HP.",
	},
	thepearlhand: {
		onStart(pokemon) {
			const diamondHand = pokemon.side.foe.pokemon.filter(p => p.baseSpecies.diamondHand);
			if (diamondHand.length === 0) return;
			const diamondHandFainted = pokemon.side.foe.pokemon.filter(p => p.fainted && p.baseSpecies.diamondHand);
			if (diamondHandFainted.length) {
				this.add('-activate', pokemon, 'ability: The Pearl Hand');
				const fallen = Math.min(diamondHandFainted.length, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
				this.boost({atk: fallen, spa: fallen});
			} else this.boost({spe: -2}, pokemon);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		flags: {},
		name: "The Pearl Hand",
		shortDesc: "+1 Atk/SpA per fainted Diamond Hand on foe side (max 5). Else -2 Spe.",
	},
	theevergrowinghungerofcapitalism: {
		onSourceDamagingHit(damage, target, source, move) {
			if(target.side.fishingTokens > 0) {
				target.side.removeFishingTokens(1);
				source.side.addFishingTokens(1);
			} else this.boost({spe: 1}, source, source);
		},
		flags: {},
		name: "The Ever-Growing Hunger of Capitalism™",
		shortDesc: "This Pokemon's attacks steal one token. If there are none, +1 Spe instead.",
	},
	katabaticwinds: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (this.field.getPseudoWeather('gravity') && move.type === 'Flying' && target !== source) {
				this.add('-immune', target, '[from] ability: Katabatic Winds');
				return null;
			}
		},
		flags: {},
		name: "Katabatic Winds",
		shortDesc: "This Pokemon is immune to Flying-type moves in Gravity.",
	},
	bestfriends: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
			move.flags['futuremove'] || move.isZ || move.isMax) return;
			move.multihit = 2;
			move.multihitType = 'bestfriends';
		},
		// Damage modifier implemented in BattleActions#modifyDamage()
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'bestfriends' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		flags: {},
		name: "best friends",
		shortDesc: "This Pokemon's moves hit twice at 0.33x power.",
	},
	honorstudent: {
		onStart(pokemon) {
			let activated = false;
			const diamondHand = pokemon.side.pokemon.filter(p => p !== pokemon && !p.fainted && p.baseSpecies.diamondHand);
			for (const target of pokemon.adjacentFoes()) {
				if (diamondHand.length > 0) {
					this.add('-ability', pokemon, 'Honor Student');
					activated = true;
					this.damage(0.02 * diamondHand.length * target.baseMaxhp, target, pokemon);
				}
			}
		},
		flags: {},
		name: "Honor Student",
		shortDesc: "On switchin, foes lose 2% max HP for each other allied Diamond Hand member.",
	},
	jankster: {
		onDamagingHit(damage, target, source, move) {
			this.add('-ability', target, 'Jankster');
			const newatk = Math.floor((target.storedStats.atk + source.storedStats.atk) / 2);
			target.storedStats.atk = newatk;
			source.storedStats.atk = newatk;
			const newspa = Math.floor((target.storedStats.spa + source.storedStats.spa) / 2);
			target.storedStats.spa = newspa;
			source.storedStats.spa = newspa;
			this.add('-activate', source, 'move: Power Split', '[of] ' + target);
		},
		flags: {breakable: 1},
		name: "Jankster",
		shortDesc: "When this Pokemon is hit, it splits its corresponding attack stat with the attacker.",
	},
	
	//slate 6
	honeyedweb: {
		onDamagingHit(damage, target, source, effect) {
			this.heal(target.baseMaxhp / 8, target, target);
			for (const allyActive of target.adjacentAllies()) {
                this.heal(allyActive.baseMaxhp / 8, allyActive);
            }
		},
		flags: {},
		name: "Honeyed Web",
		shortDesc: "This Pokemon and its allies heal 1/8 max HP on hit.",
	},
	acidicdrizzle: {
		onStart(source) {
			this.field.setWeather('acidrain');
		},
		flags: {},
		name: "Acidic Drizzle",
		shortDesc: "On switchin, this Pokemon sets Acid Rain.",
	},
	madscientist: {
		onStart(source) {
			source.side.addSideCondition('madnesscounter');
			console.log(source.side.sideConditions);
		},
		flags: {},
		name: "Mad Scientist",
		shortDesc: "On switchin, this Pokemon adds a Madness Counter to its side.",
	},
	divininghorn: {
		onTryHit(target, source, move) {
			if (move.flags['disaster']) {
				this.add('-immune', target, '[from] ability: Divining Horn');
				return null;
			}
		},
		onAllyTryHit(target, source, move) {
			if (move.flags['disaster']) {
				this.add('-immune', target, '[from] ability: Divining Horn');
				return null;
			}
		},
		onAllyTryHitField(target, source, move) {
			if (move.flags['disaster']) {
				this.add('-immune', target, '[from] ability: Divining Horn');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['disaster']) {
				this.add('-immune', target, '[from] ability: Divining Horn');
				return null;
			}
		},
		//effects of weather in scripts/pokemon
		onImmunity(type, pokemon) {
			if (['sandstorm', 'hail', 'acidrain', 'graveyard', 'spikes', 'stealthrock'].includes(type)) return false;
		},
		onAllyImmunity(type, pokemon) {
			if (['sandstorm', 'hail', 'acidrain', 'graveyard', 'spikes', 'stealthrock'].includes(type)) return false;
		},
		flags: {breakable: 1},
		name: "Divining Horn",
		shortDesc: "This Pokemon and its allies are immune to disasters and hazards, and ignore weather.",
	},
	hoennstan: {
		onStart(pokemon) {
			let hoenn = pokemon.side.pokemon.filter(p => p !== pokemon && p.fainted && p.baseSpecies.gen === 3).length;
			if (hoenn) {
				this.add('-activate', pokemon, 'ability: Hoenn Stan');
				hoenn = Math.min(hoenn, 5);
				this.add('-start', pokemon, `hoenn${hoenn}`, '[silent]');
				this.effectState.hoenn = hoenn;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `hoenn${this.effectState.hoenn}`, '[silent]');
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (this.effectState.hoenn) {
				return this.chainModify(1 + 0.15 * this.effectState.hoenn);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.effectState.hoenn) {
				return this.chainModify(1 + 0.15 * this.effectState.hoenn);
			}
		},
		flags: {},
		name: "Hoenn Stan",
		shortDesc: "This Pokemon's Atk/SpA gain 15% for each other fainted Gen 3 ally.",
	},
	zombiesonyourlawn: {
		onStart(source) {
			this.add('-message', 'The angry ghost returns to haunt Iron Fist...');
			this.field.setWeather('graveyard');
		},
		flags: {},
		name: "Zombies on Your Lawn",
		shortDesc: "On switchin, this Pokemon sets Graveyard.",
	},
	supersoursyrup: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Supersour Syrup', 'boost');
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
		name: "Supersour Syrup",
		shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
	},
	
	//slate 7
	inningsout: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				source.trySetStatus('baseball', target);
			}
		},
		flags: {},
		name: "Innings Out",
		shortDesc: "If this Pokemon is KOed with a move, that move's user gets Baseballed.",
	},
	eusociality: {
		onFaint(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				this.actions.useMove('pounce', pokemon, target);
			}
		},
		flags: {},
		name: "Eusociality",
		shortDesc: "When this Pokemon's HP drops to 0, it uses Pounce before fainting.",
	},
	buyfish: {
		onSourceDamagingHit(damage, target, source, move) {
			source.side.addFishingTokens(1);
		},
		flags: {},
		name: "buy fish",
		shortDesc: "This Pokemon's attacks add one token to its side.",
	},
	sourhour: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Grass') { // hardcode
				move.type = 'Lemon';
			}
		},
		flags: {},
		name: "Sour Hour",
		shortDesc: "This Pokemon's Grass-type moves are Lemon-type.",
	},
	ghoulgobbler: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Ghoul Gobbler');
				}
				return null;
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(1.25);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'graveyard') return false;
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'graveyard') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: {breakable: 1},
		name: "Ghoul Gobbler",
		shortDesc: "This Pokemon is healed 1/4 by Ghost, 1/8 by Graveyard; is hurt 1.25x by Fire, 1/8 by Sun.",
	},
	
	//slate 8
	blightofthefallen: {
		onSourceTryPrimaryHit(target, source, move) {
			if (move.type === 'Ghost' && target.hp <= target.maxhp / 4 && this.field.isWeather('graveyard')) {
				this.add('-activate', source, 'ability: Blight of the Fallen');
				target.faint();
			}
		},
		flags: {},
		name: "Blight of the Fallen",
		shortDesc: "This Pokemon's Ghost-type moves faint targets under 25% HP in Graveyard.",
	},
	timefrozenbody: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.boost({spe: -1});
			if(pokemon.boosts['spe'] === -6 && pokemon.status !== 'frz') {
				pokemon.cureStatus();
				pokemon.setStatus('frz');
			}
		},
		onSwitchOut(pokemon) {
			if (pokemon.status === 'frz') pokemon.cureStatus();
		},
		flags: {},
		name: "Timefrozen Body",
		shortDesc: "-1 Spe each turn. -6 Spe: frozen. Thaws upon switching out.",
	},
	bloodlinespellblazeball: {
		onStart(pokemon) {
			for (const move of pokemon.moveSlots) {
				if (move.id === 'blazeball') return;
			}
			const blazeball = this.dex.moves.get('blazeball');
			const newMove = {
				move: blazeball.name,
				id: blazeball.id,
				pp: blazeball.pp * 1.6,
				maxpp: blazeball.pp * 1.6,
				target: blazeball.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			pokemon.moveSlots[pokemon.moveSlots.length] = newMove;
			pokemon.baseMoveSlots[pokemon.baseMoveSlots.length] = newMove;
		},
		flags: {},
		name: "Bloodline Spell: Blazeball",
		shortDesc: "This Pokemon has Blazeball as an additional moveslot.",
	},
	unitedparty: {
		//Death
		onStart(pokemon) {
			const copen = pokemon.side.pokemon.filter(p => p != pokemon && !p.fainted && p.baseSpecies.copen);
			if (copen.length > 0) {
				this.add('-activate', pokemon, 'ability: United Party');
				this.add('-start', pokemon, `copen${copen.length}`, '[silent]');
				pokemon.copen = copen.length;
			}
			//effects in respective fields (gonna do this later lol...)
		},
		flags: {},
		name: "United Party",
		shortDesc: "(Non-functional) Field effects have 1 extra turn per Copen Pokemon.",
	},
	bathroombreak: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') target.switchFlag = true;
		},
		name: "Bathroom Break",
		shortDesc: "This Pokemon switches out when hit by a Water move.",
	},
	necrodancer: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.effectiveWeather() === 'graveyard') {
					this.damage(target.baseMaxhp / 16, target, pokemon);
				}
			}
		},
		flags: {},
		name: "Necrodancer",
		shortDesc: "If Graveyard is active, foes lose 1/16 of their max HP at the end of each turn.",
	},
	conversionz: {
		shortDesc: "If the Pokémon changes its type, the result is permanent. Deletes STAB.",
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'porygonzmega') return;
			const type = this.dex.species.get(pokemon.species).types[0];
			if (pokemon.hasType(type) || !pokemon.setType(type)) return;
			this.add('-start', pokemon, 'typechange', type);
		},
		onSourceHit(target, source, move) {
			if (source.species.id !== 'porygonzmega') return;
			if (move.id === 'conversion' || move.id === 'conversion2') {
				this.add('-ability', source, 'Conversion-Z');
				const pokemon = this.dex.species.get(source.species);
				pokemon.types[0] = source.types[0];
			}
		},
		onModifyMove(move) {
			delete move.stab;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Conversion-Z",
		rating: 5,
		num: -5000,
	},
	snakewood: {
		onStart(pokemon) {
			pokemon.addVolatile('ability:bulletproof');
			pokemon.addVolatile('ability:gluttony');
			pokemon.addVolatile('ability:quickfeet');
		},
		flags: {breakable: 1},
		name: "Snakewood",
		shortDesc: "Bulletproof + Gluttony + Quick Feet",
	},
	pristinedessert: {
		onTryHit(target, source, move) {
			if (['Bug', 'Grass'].includes(move.type) && target !== source) {
				this.add('-immune', target, '[from] ability: Pristine Dessert');
				return null;
			}
		},
		onStart(pokemon) {
			pokemon.addVolatile('pristinedessert');
		},
		condition: {
			duration: 3,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Pristine Dessert');
			},
			onResidual(pokemon) {
				if (!pokemon.activeTurns) {
					this.effectState.duration += 1;
				}
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Pristine Dessert');
			},
		},
		flags: {breakable: 1},
		name: "Pristine Dessert",
		shortDesc: "This Pokemon is immune to Bug/Grass, but has halved Spe for 3 turns.",
	},
	disgustingrepulsivedessert: {
		onStart(pokemon) {
			pokemon.addVolatile('ability:aromaveil');
		},
		flags: {breakable: 1},
		name: "Disgusting, Repulsive Dessert",
		shortDesc: "Aroma Veil",
	},
	
	//slate 9
	carcinization: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			source.addVolatile('carcinization');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 2,
			onStart(target, source) {
				this.add('-start', target, 'Carcinization', '[silent]');
			},
			onResidualOrder: 23,
			onEnd(target) {
				this.add('-start', target, 'Carcinization', '[silent]');
				target.formeChange('Kingler');
			},
		},
		flags: {},
		name: "Carcinization",
		shortDesc: "Pokemon who damage this Pokemon forme change into Kingler in 1 turn.",
	},
	soursipper: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Lemon') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Sour Sipper');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Lemon') {
				this.boost({atk: 1}, this.effectState.target);
			}
		},
		flags: {breakable: 1},
		name: "Sour Sipper",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Lemon move; Lemon immunity.",
	},
	sigmasurge: {
		onStart(source) {
			this.field.addPseudoWeather('liondeluge');
		},
		flags: {},
		name: "Sigma Surge",
		shortDesc: "On switchin, this Pokemon sets Lion Deluge.",
	},
	ultranecrozmaclause: {
		onStart(pokemon) {
			pokemon.addVolatile('trapped', pokemon);
			pokemon.addVolatile('perishsong');
		},
		flags: {},
		name: "Ultra Necrozma Clause",
		shortDesc: "On switchin, this Pokemon becomes trapped and faints in 3 turns.",
	},
	skeptic: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (['Fairy', 'Dragon', 'Dark'].includes(move.type)) {
				this.debug('Skeptic weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (['Fairy', 'Dragon', 'Dark'].includes(move.type)) {
				this.debug('Skeptic weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Skeptic",
		shortDesc: "This Pokemon takes halved damage from Fairy/Dragon/Dark moves.",
	},
	justthebirds: {
		onSourceDamagingHit(damage, target, source, move) {
			target.addVolatile('justthebirds');
		},
		condition: {
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'Bird', '[silent]');
				const targetSide = target.side;
				if (targetSide.getSideCondition('stealthrock')) {
					if (target.hasItem('heavydutyboots')) return;
					const typeMod = this.clampIntRange(target.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
					this.damage(target.maxhp * Math.pow(2, typeMod) / 8);
					this.add('-message', `Pointed stones dug into ${target.name}!`);
				}
			},
		},
		flags: {},
		name: "just the birds",
		shortDesc: "When this Pokemon damages a target, they gain the Bird volatile.",
	},
	slayerofbeasts: {
		onBasePower(basePower, pokemon, target, move) {
			const nonVanilla = ["Anarlvet",  "Kingler-Mega",  "microwave",  "Lytlegai",  "Ohmyrod",  "Big Crammer",  "Samurott-Sinnoh",  "Goomba",  "Fridgile",  "Melmetal 2",  "Pidown",  "Kurayami",  "Zelda",  "Drigike",  "Phish",  "Smelmetal",  "Bondra",  "Tangette-Eternal",  "Donmigo",  "Dragoone",  "Collachet",  "Guiltrism",  "Swooliobat",  "Electrode-Mega",  "Mario Kart Wii",  "Impalpitoad",  "Scrubby",  "Ogerpon-Cornerstone",  "palpitoad is so cool",  "Moltres-Mega",  "Jirachitwo",  "Shinx-Fishing",  "Conquescape",  "Daiyakuza",  "Pokestar Fisherman",  "Magnegiri",  "mario",  "Contamicow",  "Whonhef",  "Fish Factory",  "cowboy_bandido",  "Pokestar Giant",  "Richard Petty",  "Impidimp-Mega",  "Lemon",  "Fishing Zombie",  "Pokestar MT",  "Margaret Thatcher",  "Flesh Valiant",  "Flesh Valiant-Mega",  "Ronald Reagan",  "Lime Lips",  "Lemotic",  "Zestii",  "Rawring Moon",  "Boogerpon-CLOWNerstone",  "Keisberg-IF",  "Apple's Newest Emoji",  "Lemon Fish",  "Goddease",  "Jableye",  "Kyrum",  "Raccoon",  "Lucario-Calm",  "Nedontrol",  "Princirang",  "Iron Clown",  "The Pearl Hand",  "McFish",  "Applwirm",  "minun and plusle :D", "Traike", "Dr. Liberty", "Sunflora-Grave", "Hydralemon", "Hiveweb", "Syndican\'t", "Fish Marketing 3", "Lemonganium", "Carnivine-IF", "Grumpig", "Impromancer", "Pander Dragoon", "Soruarc", "Skibidragon", "Hitmontop-Mega", "Porygon-Z-Mega", "Furumo", "mega man", "Fudgesaur", "Fudgesaur-Mega", "darkpoison", "Sigma Rice Lion", "Lickilord", "Citrus Jams", "Everhál", "Grimace", "Pyroaring", "Tyler the Creator", "Bart", "Upvybones", "Ludicolo", "T'La'Ágh", "Regibloom", "Old Duke"];
			if (nonVanilla.includes(target.baseSpecies.name)) return this.chainModify([4915, 4096]);
		},
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			const nonVanilla = ["Anarlvet",  "Kingler-Mega",  "microwave",  "Lytlegai",  "Ohmyrod",  "Big Crammer",  "Samurott-Sinnoh",  "Goomba",  "Fridgile",  "Melmetal 2",  "Pidown",  "Kurayami",  "Zelda",  "Drigike",  "Phish",  "Smelmetal",  "Bondra",  "Tangette-Eternal",  "Donmigo",  "Dragoone",  "Collachet",  "Guiltrism",  "Swooliobat",  "Electrode-Mega",  "Mario Kart Wii",  "Impalpitoad",  "Scrubby",  "Ogerpon-Cornerstone",  "palpitoad is so cool",  "Moltres-Mega",  "Jirachitwo",  "Shinx-Fishing",  "Conquescape",  "Daiyakuza",  "Pokestar Fisherman",  "Magnegiri",  "mario",  "Contamicow",  "Whonhef",  "Fish Factory",  "cowboy_bandido",  "Pokestar Giant",  "Richard Petty",  "Impidimp-Mega",  "Lemon",  "Fishing Zombie",  "Pokestar MT",  "Margaret Thatcher",  "Flesh Valiant",  "Flesh Valiant-Mega",  "Ronald Reagan",  "Lime Lips",  "Lemotic",  "Zestii",  "Rawring Moon",  "Boogerpon-CLOWNerstone",  "Keisberg-IF",  "Apple's Newest Emoji",  "Lemon Fish",  "Goddease",  "Jableye",  "Kyrum",  "Raccoon",  "Lucario-Calm",  "Nedontrol",  "Princirang",  "Iron Clown",  "The Pearl Hand",  "McFish",  "Applwirm",  "minun and plusle :D", "Traike", "Dr. Liberty", "Sunflora-Grave", "Hydralemon", "Hiveweb", "Syndican\'t", "Fish Marketing 3", "Lemonganium", "Carnivine-IF", "Grumpig", "Impromancer", "Pander Dragoon", "Soruarc", "Skibidragon", "Hitmontop-Mega", "Porygon-Z-Mega", "Furumo", "mega man", "Fudgesaur", "Fudgesaur-Mega", "darkpoison", "Sigma Rice Lion", "Lickilord", "Citrus Jams", "Everhál", "Grimace", "Pyroaring", "Tyler the Creator", "Bart", "Upvybones", "Ludicolo", "T'La'Ágh", "Regibloom", "Old Duke"];
			if (nonVanilla.includes(defender.baseSpecies.name)) move.accuracy = true;
		},
		flags: {},
		name: "Slayer of Beasts",
		shortDesc: "This Pokemon's moves have 1.2x power and cannot miss against Fakemon.",
	},
	doomer: {
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags['futuremove']) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Doomer",
		shortDesc: "This Pokemon's future moves have 1.2x power.",
	},
	fruitybars: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound']) move.type = 'Lemon';
		},
		flags: {},
		name: "Fruity Bars",
		shortDesc: "This Pokemon's sound moves are Lemon-type.",
	},
	sociallyunaware: {
		onStart(pokemon) {
			pokemon.addVolatile('ability:unaware');
			pokemon.addVolatile('ability:oblivious');
		},
		flags: {breakable: 1},
		name: "Socially Unaware",
		shortDesc: "Unaware + Oblivious",
	},
	
	//slate 10
	fashionicon: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['graveyard'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'graveyard') return false;
		},
		flags: {},
		name: "Fashion icon",
		shortDesc: "This Pokemon's Sp. Atk is 1.5x in Graveyard; immunity to Graveyard.",
	},
	dilf: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			pokemon.side.addFishingTokens(1);
		},
		flags: {},
		name: "DILF",
		shortDesc: "This Pokemon gains one Fishing Token at the end of each turn.",
	},
	stillwater: {
		//effect in madness counter
		flags: {},
		name: "Still Water",
		shortDesc: "When this Pokemon consumes a Madness Counter, it adds 3 Fishing Tokens instead of raising its highest stat.",
	},
	racersspirit: {
		onStart(pokemon) {
			pokemon.addVolatile('ability:adaptability');
			pokemon.addVolatile('ability:moxie');
			pokemon.addVolatile('ability:scrappy');
		},
		//tera steel in scripts.ts
		flags: {},
		name: "Racer's Spirit",
		shortDesc: "Adaptability + Moxie + Scrappy + Big Button Teras Steel.",
	},
	hoennlover: {
		onStart(pokemon) {
			let hoenn = pokemon.side.pokemon.filter(p => p !== pokemon && p.baseSpecies.gen === 3).length;
			if (hoenn) {
				this.add('-activate', pokemon, 'ability: Hoenn Lover');
				hoenn = Math.min(hoenn, 5);
				this.add('-start', pokemon, `hoenn${hoenn}`, '[silent]');
				this.effectState.hoenn = hoenn;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.hoenn}`, '[silent]');
		},
		onModifySpe(spe) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1 + 0.15 * this.effectState.hoenn);
			}
		},
		flags: {},
		name: "Hoenn Lover",
		shortDesc: "This Pokemon's Spe is 1.15x for each other Hoenn Pokemon on its team.",
	},
	macabremourner: {
		onStart(source) {
			this.field.setWeather('graveyard');
			const fainted = source.side.totalFainted + source.side.foe.totalFainted;
			if (fainted) this.heal(source.baseMaxhp / 10 * fainted);
			if (source.addType('Ghost')) this.add('-start', source, 'typeadd', 'Ghost', '[from] ability: Macabre Mourner');
		},
		flags: {},
		name: "Macabre Mourner",
		shortDesc: "On switchin, sets Graveyard, adds Ghost, heals 10% for each fainted Pokemon.",
	},
	jestersfolly: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('insanity', target);
				}
			}
		},
		flags: {},
		name: "Jester's Folly",
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will get Insanity."
	},
	wrathofthesmogonbird: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying') return priority + 1;
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire') return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "WRATH OF THE SMOGONBIRD",
		shortDesc: "This Pokemon's Fire-type moves have 1.2x power, and its Flying moves +1 priority.",
	},
	toxicwisdom: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('acidrain')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'acidrain') return false;
		},
		flags: {},
		name: "Toxic Wisdom",
		shortDesc: "This Pokemon's Spe is doubled in Acid Rain; immunity to Acid Rain.",
	},
	monstermash: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('graveyard')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'graveyard') return false;
		},
		flags: {},
		name: "Monster Mash",
		shortDesc: "This Pokemon's Spe is doubled in Graveyard; immunity to Graveyard.",
	},
	
	//vanilla
	mimicry: {
		inherit: true,
		onTerrainChange(pokemon) {
			let types;
			switch (this.field.terrain) {
			case 'electricterrain':
				types = ['Electric'];
				break;
			case 'grassyterrain':
				types = ['Grass'];
				break;
			case 'mistyterrain':
				types = ['Fairy'];
				break;
			case 'psychicterrain':
				types = ['Psychic'];
				break;
			case 'fishingterrain':
				types = ['Water'];
				break;
			default:
				types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
	},
	poisonpuppeteer: {
		inherit: true,
		shortDesc: "Thatcher: If this Pokemon poisons a target, the target also becomes confused.",
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source.baseSpecies.name !== "Margaret Thatcher") return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('confusion');
			}
		},
	},
	libero: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.libero = source.previouslySwitchedIn;
				this.add('-start', source, 'typechange', type, '[from] ability: Libero');
			}
		},
		shortDesc: "This Pokemon's type changes to the type of the move it is using.",
	},
	drought: {
		inherit: true,
		onStart(source) {
			if (this.field.isTerrain('fishingterrain')) {
				this.add('-message', 'The fishing terrain blocked out the sun!');
				return;
			}
			this.field.setWeather('sunnyday');
		},
	},
	
	//fake ability
	hacked: {
		onStart(pokemon) {
			this.add('-message', `${pokemon.name} was hacked!`);
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (this.randomChance(3, 10)) {
				this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|https://twitter.com/Duo__M2`);
				if (target) target.addVolatile('ability:hacked');
				return priority - 6.0;
			}
		},
		flags: {},
		name: "Hacked",
	},
};
