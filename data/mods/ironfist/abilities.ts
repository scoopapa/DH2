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
				this.damage(target.baseMaxhp * 0.28, target, pokemon);
			}
		},
		flags: {},
		name: "Degenerator",
		shortDesc: "When the user switches out, damage active opponents by 28% of their max HP.",
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

	//slate 3
	milf: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.add('-activate', pokemon, 'ability: MILF');
			pokemon.side.addFishingTokens(1);
		},
		flags: {},
		name: "MILF",
		shortDesc: "At the end of each turn, add 1 Fishing Token to the user's side.",
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
					this.actions.useMove('selfdestruct', pokemon, target);
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
		shortDesc: "RKS System + Magic Guard + Technician",
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
	},
	frozenlandscape: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-start', source, 'typechange', 'Ice');
			}
		},
		flags: {},
		name: "Frozen Landscape",
		shortDesc: "If this Pokémon is hit by a contact move, the attacker becomes an Ice-type.",
	},
	thediamondhand: {
		onStart(pokemon) {
			const diamondHand = pokemon.side.pokemon.filter(p => !p.fainted && p.baseSpecies.diamondHand);
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
		shortDesc: "This Pokemon's Atk/SpA -1, but crit rate +1 for each unfainted Diamond Hand ally.",
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
					target.side.addSideCondition('toxicspikes', pokemon);
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
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: River Thief');
				}
				return null;
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark' && target.hasType('Water') && target.side.fishingTokens) {
				this.add('-activate', source, 'ability: River Thief');
				const tokens = target.side.fishingTokens;
				target.side.removeFishingTokens(tokens);
				source.side.addFishingTokens(tokens);
			}
		},
		flags: {breakable: 1},
		name: "River Thief",
		shortDesc: "Speed Storm Drain + using a Dark-type move against a Water-type Pokemon steals that side's tokens.",
	},
	fishysurge: {
		onStart(source) {
			this.field.setTerrain('fishingterrain');
		},
		flags: {},
		name: "Fishy Surge",
		shortDesc: "On switchin, set Fishing Terrain.",
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
			this.add('-ability', pokemon, 'Bramblin Mentality');
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Bramblin Mentality');
			}
			return false;
		},
		// Permanent sleep "status" implemented in the relevant sleep-checking effects
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Bramblin Mentality",
		shortDesc: "Comatose",
	},

	//slate 4
	reaganomics: {
		onStart(pokemon) {
			if(pokemon.side.fishingTokens > 0) pokemon.side.addFishingTokens(pokemon.side.fishingTokens);
			if(this.randomChance(1, 8192)) pokemon.side.foe.addFishingTokens(1);
		},
		flags: {},
		name: "Reaganomics",
		shortDesc: "On switchin, this Pokemon doubles its side's Fishing tokens. 1/8192 chance for opp's side to get 1.",
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
					this.add('-activate', target, 'ability: Gex Server');
					this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|https://twitter.com/Duo__M2`);
					target.addVolatile('gexserver');
				}
			}
		},
		condition: {
			onStart(pokemon) {
				this.add('-message', `${pokemon.name} was hacked!`);
			},
			onPrepareHit(source, target, move) {
				if (this.randomChance(3, 10)) {
					this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(source.name)}|https://twitter.com/Duo__M2`);
					if (target) target.addVolatile('gexserver');
				}
			},
		},
		flags: {},
		name: "Gex Server",
		shortDesc: "On switchin, adjacent opponents may send a link to DuoM2's Twitter.",
	},
	lemonsqueezy: {
		onDamagingHit(damage, target, source, effect) {
			this.add('-activate', source, 'ability: Lemon Squeezy');
			this.add('-activate', source, 'move: Aromatherapy');
			for (const ally of source.side.pokemon) {
				if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
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
			this.add('-start', source, 'typechange', 'Lemon');
		},
		flags: {},
		name: "Lemonade",
		shortDesc: "If this Pokémon is damaged by an attack, the attacker becomes an Lemon-type.",
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
}
