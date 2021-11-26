import { Pokemon } from "../../../sim";
import { PokemonSources } from "../../../sim/team-validator";

export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	contaminate: {
		desc: "This Pokémon's Normal-type moves become Fire-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokémon's Normal-type moves become Fire-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Poison';
				move.contaminateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.contaminateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Contaminate",
		rating: 4,
		num: -6000,
	},
	buildup: {
		desc: "If this Pokemon has used an attacking move, but has not been attacked, at the end of turn, it recovers 1/8th of its HP.",
		shortDesc: "Recover 1/8 HP on each attacking turn if not attacked.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.addVolatile('buildup')
		},
		onPrepareHit(source, target, move) {
			if (move.category === 'Status') {
				source.addVolatile('buildup');
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns && !pokemon.volatiles['buildup']) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		condition: {
			duration: 1,
		},
		name: "Buildup",
		rating: 4.5,
		num: -6001,
	},
	implode: {
		desc: "If this Pokemon's self-damaging or self-destructing moves faint an opposing Pokemon, this Pokemon does not take damage or self-destruct.",
		shortDesc: "User takes no self-damage or self-destruct if it kills the target.",
		onAfterMove(source, target, move) {
			if (move.implodeCheck && !source.volatiles['implode'])
			{
				source.faint();
			}
		},
		onModifyMove(move, target) {
            if (move.selfdestruct) {
				move.selfdestruct = false;
				move.implodeCheck = true;
			}
			else {
				move.implodeCheck = false;
			}
        },
		onFoeDamage(damage, target, source, effect) {
			if (source.ability == "Implode" || source.ability == "implode") var implode = true;
			else var implode = false;
			if (damage >= target.hp && this.activeMove && implode){
				this.activeMove.recoil = [0,0];
				this.activeMove.mindBlownRecoil = false;
				source.addVolatile('implode');
			}
		},
		condition: {
			duration: 1,
		},
		name: "Implode",
		rating: 4.5,
		num: -6002,
	},
	defibrillator: {
		desc: "When this pokemon uses an electric type move, if any members of its party have status conditions they are cured and affected teammates restore 1/6th of their maximum HP.",
		shortDesc: "Electric moves cure ally status and heal cured allies",
		onAfterMove(source, target, move) {
			if (move.type === 'Electric') {
				for (const ally of source.side.pokemon) {
					if (ally.cureStatus()) ally.heal(ally.baseMaxhp / 6);
				}
			}
		},
		name: "Defibrillator",
		rating: 4.5,
		num: -6003,
	},
	tetramorph: {
		desc: "After using a move, the user's type changes to the type of that move. Multi-Attack will change type as well.",
		shortDesc: "User and Multiattack's type change to move's type after use.",
		onAfterMove(source, target, move) {
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Tetramorph');
			}
		},
		onModifyType(move, pokemon) {
			if (move.name === 'Multi-Attack')
			{
				move.type = pokemon.types[0];
			}
		},
		name: "Tetramorph",
		rating: 4.5,
		num: -6004,
	},
	josefscurse: {
		desc: 'Golurk summons spirits from the dead, which come to haunt its teammates. On switch in, it applies the "Trick or Treat" effect on itself and any allies on the field.',
		shortDesc: "Applies Trick-or-Treat to itself and allies on switch-in",
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.side === pokemon.side)
				{
					if (target.hasType('Ghost')) continue;
					if (!target.addType('Ghost')) continue;
					this.add('-start', target, 'typeadd', 'Ghost', '[from] move: Trick-or-Treat');
				}
			}
		},
		name: "Josef's Curse",
		rating: 4.5,
		num: -6005,
	},
	highreward: {
		desc: 'All moves with an accuracy less than 100% get a 20% boost to their base power.',
		shortDesc: "Boosts inaccurate moves.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.accuracy < 100) return this.chainModify([0x1333, 0x1000]);
		},
		name: "High Reward",
		rating: 4.5,
		num: -6006,
	},
	modify: {
		desc: 'As soon as this Pokemon Mega Evolves/switches in, it gains a random type. All Normal-Type moves of this Pokemon become that type and gain a 1.25x boost.',
		shortDesc: "Gain a random type on switch and convert Normal moves to that type with a boost.",
		onStart(pokemon) {
			const types = [];
			for (const type in this.dex.data.TypeChart) {
				if (pokemon.hasType(type)) continue;
				types.push(type);
			}
			const randomType = this.sample(types);
			if (!pokemon.setType(randomType)) return;
			this.add('-start', pokemon, 'typechange', randomType, '[from] ability: Modify');
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = pokemon.types[0];
				move.modifyBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.modifyBoosted) return this.chainModify([0x1400, 0x1000]);
		},
		name: "Modify",
		rating: 4.5,
		num: -6007,
	},
	sacrificialbarrier: {
		desc: 'As soon as this Pokemon uses a move or deals damage (in the case of Volt Switch), the Pokemon sets up Reflect, Light Screen, and then explodes. These Reflect and Light Screens last 15 turns.',
		shortDesc: "Set 15 turn screens after using a move then explode.",
		onAfterMove(source, target, move) {
			if (source.side.addSideCondition('reflect') && source.side.addSideCondition('lightscreen')) {
				source.side.sideConditions['reflect'].duration = 15;
				source.side.sideConditions['lightscreen'].duration = 15;
				this.add('-message', `${source.name} put up a sacrificial barrier!`);
			}
			this.useMove('explosion', source);
		},
		name: "Sacrificial Barrier",
		rating: 4.5,
		num: -6008,
	},
	omniscientsentinel: {
		desc: "This pokemon's type becomes the type of its first two moveslots. Multi-Attack changes type to match this pokemon's primary type.",
		shortDesc: "Type changes to first two move slots; Multi-Attack becomes primary type.",
		onStart(pokemon) {
			pokemon.types[0] = this.dex.getMove(pokemon.moves[0]).type;
			pokemon.types[1] = this.dex.getMove(pokemon.moves[1]).type;
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[from] ability: Omniscient Sentinel');
		},
		onModifyType(move, pokemon) {
			if (move.name === 'Multi-Attack')
			{
				move.type = pokemon.types[0];
			}
		},
		name: "Omniscient Sentinel",
		rating: 4.5,
		num: -6009,
	},
	rusty: {
		desc: "For every turn that this pokemon is out of its pokeball, its speed, defense and special defense fall one stage. Becomes two stages if hit with a water type move.",
		shortDesc: "-1 DEF, SPD, SPE at end of turn, becomes -2 after hit by Water attack.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				target.addVolatile('rusty');
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns && !pokemon.volatiles['rusty']) {
				this.boost({def: -1, spd: -1, spe: -1});
			}
			else if (pokemon.activeTurns && pokemon.volatiles['rusty']) {
				this.boost({def: -2, spd: -2, spe: -2});
			}
		},
		condition: {
			onStart(pokemon, source, effect) {
				this.add('-start', pokemon, 'Rusted', '[from] ability: Rusty', '[of] ' + pokemon);
			},
		},
		name: "Rusty",
		rating: 4.5,
		num: -6010,
	},
	afterburner: {
		desc: "When this Pokémon uses a Fire-type move, or is hit by a damaging Fire-type move, its speed is boosted by one stage. If this Pokémon becomes burned, it will immediately be cured of its burn status and its speed will be boosted by one stage.",
		shortDesc: "Using or being hit by a fire move or being burned will +1 SPE; cures burn.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({spe: 1});
			}
		},
		onAfterMove(source, target, move) {
			if (move.type === 'Fire') {
				this.boost({spe: 1});
			}
		},
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (status.id === 'brn') {
				this.boost({spe: 1});
				target.cureStatus();
			};
		},
		name: "Afterburner",
		rating: 4.5,
		num: -6011,
	},
	failsafe: {
		desc: "This Pokémon heals itself by 1/8 when the move it uses fails. [Stomping Tantrum Trigger]",
		shortDesc: "Failing a move heals itself 1/8",
		onAfterMove(source, target, move) {
			if (source.moveThisTurnResult === false) this.heal(source.maxhp / 8);
		},
		name: "Fail Safe",
		rating: 4.5,
		num: -6012,
	},
	angelsguidance: {
		desc: "When this Pokemon deals direct damage to an opponent, changes type to resist the opponent's STAB (for example, normal/fairy type MSilvally attacks an Arctozolt, it becomes a pure Ground type to resist electric). Multi-Attack changes type to match the user's primary type. If Mega Silvally already resists the opponent's primary stab, Angel's Guidance fails.",
		shortDesc: "Change type to resist opponent's primary type after damaging them; Multi-Type changes to match.",
		onFoeDamagingHit(damage, target, source, move) {
			if (source.ability == "Angel's Guidance" || source.ability == "angelsguidance") var angel = true;
			else var angel = false;
			if(!angel) return;
			const possibleTypes = [];
			const enemyType = target.types[0];
			for (const type in this.dex.data.TypeChart) {
				const typeCheck = this.dex.data.TypeChart[type].damageTaken[enemyType];
				if (typeCheck === 2 || typeCheck === 3) {
					possibleTypes.push(type);
				}
			}
			if (!possibleTypes.length) {
				return false;
			}
			if (possibleTypes.includes(source.types[0]) || possibleTypes.includes(source.types[1])) return;
			const randomType = this.sample(possibleTypes);

			if (!source.setType(randomType)) return;
			this.add('-start', source, 'typechange', randomType, "[from] ability: Angel's Guidance");
		},
		onModifyType(move, pokemon) {
			if (move.name === 'Multi-Attack')
			{
				move.type = pokemon.types[0];
			}
		},
		name: "Angel's Guidance",
		rating: 4.5,
		num: -6013,
	},
	irradiation: {
		desc: "If this pokemon successfully lands an attack, for the next two turns, opponent's pokemon will have their defense and special defense lowered by one at the end of the turn. This effect does not stack with itself.",
		shortDesc: "Lower opponents' defenses at end of turn for two turns after attacking.",
		onAfterMove(source, target) {
			target.side.addSideCondition('irradiation')
		},
		condition: {
			duration: 2,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'Irradiation');
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (pokemon) {
						this.boost({def: -1, spd: -1}, pokemon);
					}
				}
				this.add('-sideend', targetSide, 'Irradiation');
			},
			onResidual(side) {
				for (const pokemon of side.active) {
					if (pokemon) {
						this.boost({def: -1, spd: -1}, pokemon);
					}
				}
			},
		},
		name: "Irradiation",
		rating: 4.5,
		num: -6014,
	},
	avicebron: {
		desc: "This pokemon receives an additional 1.5x boost in base power to physical STAB moves, but always moves last in the turn (priority equivalent to dragon tail/teleport)",
		shortDesc: "Physical STAB 1.5x boost but always moves last.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.type == pokemon.types[0] || move.type == pokemon.types[1] || pokemon.types[3]) if (move.category == "Physical") return this.chainModify([0x14CD, 0x1000]);
		},
		onModifyPriority(priority, pokemon, target, move) {
			return -6;
		},
		name: "Avicebron",
		rating: 4.5,
		num: -6015,
	},
	rkssystem20: {
		desc: "When this Pokemon uses a move that is not Multi-attack (activating before the move takes effect), Multi-attack's type changes to match the type of the move used. When this Pokemon uses Multi-attack, its type changes to Multi-attack's current type at the end of the turn. This Pokemon's Defense and Special Defense increase by 1.5x when it is the same type as Multi-Attack.",
		shortDesc: "MA changes type to last used move; MA changes users type at end of turn; 1.5x defenses if MA and user are same type",
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (!pokemon.multiType) pokemon.multiType = "Normal";
			if (pokemon.multiType == pokemon.types[0]) {
				this.debug('RKS System 2.0 boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (!pokemon.multiType) pokemon.multiType = "Normal";
			if (pokemon.multiType == pokemon.types[0]) {
				this.debug('RKS System 2.0 boost');
				return this.chainModify(1.5);
			}
		},
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			source.multiType = type;
		},
		onModifyType(move, pokemon) {
			if (!pokemon.multiType) pokemon.multiType = "Normal";
			if (move.name === 'Multi-Attack')
			{
				move.type = pokemon.multiType;
				pokemon.addVolatile("rkssystem20");
			}
		},
		onResidual(pokemon) {
			//for (const pokemon of side.active) {
				if (pokemon.volatiles['rkssystem20']) {
					pokemon.setType(pokemon.multiType);
					this.add('-start', pokemon, 'typechange', pokemon.multiType, '[from] ability: RKS System 2.0');
				}	
			//}
		},
		condition: {
			duration: 2,
		},
		name: "RKS System 2.0",
		rating: 3,
		num: -6016,
	},
	kamikaze: {
		desc: "When this Pokémon's health drops to 1/16th or lower, it will immediately attempt to use Explosion. This ability will not activate if the opposing Pokémon is a Ghost type or has the Damp ability.",
		shortDesc: "Use Explosion at 1/16 health if possible.",
		onUpdate(target) {
			if (target.hp <= target.maxhp / 16 && !target.kamikaze)
			{
				for (const enemy of target.side.foe.active) {
					if (!target || !this.isAdjacent(enemy, target)) continue;
					if (!enemy.hasType("Ghost") && enemy.ability != "Damp")
					{
						target.kamikaze = true;
						this.useMove("Explosion", target);
					}
				}
			}
		},
		name: "Kamikaze",
		rating: 4.5,
		num: -6017,
	},
	inertia: {
		desc: "This pokemon takes up to 50% reduced damage from direct attacks, based on how much faster it is than the attacker. Damage Reduced = 25 × User's Current Speed / Target's Current Speed.",
		shortDesc: "Takes less damage based on how much faster it is than the opponent.",
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let inertia = Math.floor(25 * target.getStat('spe', false, false) / source.getStat('spe', false, false),);
				if (inertia > 50) inertia = 50;
				inertia = (100 - inertia) / 100;
				return damage * inertia;
			}
		},
		name: "Inertia",
		rating: 4.5,
		num: -6018,
	},
	deusexmachina: {
		desc: "At half health it's highest stat goes up by one stage.",
		shortDesc: "At half health it's highest stat goes up by one stage.",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, target);
			}
		},
		name: "Deus Ex Machina",
		rating: 4.5,
		num: -6019,
	},
	spiralpower: {
		desc: "This Pokémon's and this Pokemon's allies Ghost-type moves' type effectiveness against Normal is changed to be super effective.",
		shortDesc: "This Pokémon and its allies' Ghost-type moves are super effective against Normal-types.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Spiral Power');
			this.add('-message', `${pokemon.name} and its allies' Ghost-type moves are super effective against Normal-types!`);
		},
		onModifyMovePriority: -5,
		onAllyModifyMove(move) {
			if (move.type !== 'Ghost') return;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Ghost'] = true;
				(move as any).spiralpowerBoosted = true;
			}
		},
		name: "Spiral Power",
		rating: 3,
		num: -6020,
	},
	jetengine: {
		desc: "Raises the user's Speed by one stage when being hit by a Fire-type move.",
		shortDesc: "Speed +1 when hit with Fire-type move.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Jet Engine');
				}
				return null;
			}
		},
		name: "Jet Engine",
		rating: 4.5,
		num: -6021,
	},
	vigilante: {
		desc: "Draws in all Dark-type moves. Instead of beeing hit by dark-type moves, it decreases it's attacker SpA and Atk by one stage. Intimidate immunity.",
		shortDesc: "Draws in and is immune to Dark moves, decreases attacker's offenses on doing so; Intimidate immune.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				this.add('-ability', target, 'Vigilante', 'boost');
				this.boost({atk: -1, spa: -1}, source, target, null, true);
				this.add('-immune', target, '[from] ability: Vigilante');
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Dark' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Vigilante');
				}
				return this.effectData.target;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Vigilante');
			}
		},
		name: "Vigilante",
		rating: 4.5,
		num: -6022,
	},
	brokendlc: {
		desc: "Upon gaining this ability or entering the battle, the user changes type to the target's secondary typing, and so does the type of its Multi-Attack. If the target lacks a secondary typing, the ??? type (completely neutral offensively and defensively) is used.",
		shortDesc: "User becomes the target's secondary type, or ??? if none, along with Multi-Type",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.types[1]) {
					pokemon.setType(target.types[1]);
					this.add('-start', pokemon, 'typechange', target.types[1], '[from] ability: Broken DLC');
				}
				else {
					pokemon.setType("???");
					this.add('-start', pokemon, 'typechange', '???', '[from] ability: Broken DLC');
				}
			}
		},
		onModifyType(move, pokemon) {
			if (move.name === 'Multi-Attack')
			{
				move.type = pokemon.types[0];
			}
		},
		name: "Broken DLC",
		rating: 4.5,
		num: -6023,
	},
	rksoverload: {
		desc: "This pokemon's typing is determined by its first move (think Camomons but monotype).",
		shortDesc: "User's type changes to its first move's type.",
		onStart(pokemon) {
			pokemon.setType(this.dex.getMove(pokemon.moves[0]).type);
			this.add('-start', pokemon, 'typechange', pokemon.types[0], '[from] ability: RKS Overload');
		},
		name: "RKS Overload",
		rating: 4.5,
		num: -6024,
	},
	triggerhappy: {
		desc: "This pokemon's self-destructiive move only deal 1/4th damage to the user.",
		shortDesc: "This pokemon's self-destructiive move only deal 1/4th damage to the user.",
		onModifyMove(move, target) {
            if (move.selfdestruct) {
				move.selfdestruct = false;
				move.triggered = true;
			}
			else {
				move.triggered = false;
			}
        },
		onAfterMove(source, target, move) {
			if (move.triggered) {
				this.damage(Math.round(source.maxhp / 4), source, source);
			}
		},
		name: "Trigger Happy",
		rating: 4.5,
		num: -6025,
	},
	superconductor1: {
		desc: "The damage that this Pokémon takes from contact moves is halved, but it also takes double damage from Electric-type moves. (Fluffy clone but an Electric weakness instead of a Fire weakness)",
		shortDesc: "Half damage from contact moves; double damage from Electric moves.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Electric') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		name: "Superconductor1",
		rating: 4.5,
		num: -6026,
	},
	mugarkssystem: {
		desc: "Whenever the user gets hits by an attack, its type changes in accordance with Conversion 2. Multi-Attack changes type to account for the user's type.",
		shortDesc: "Type changes like Conversion2 when hit; Multi-type matches",
		onAfterMoveSecondary(target, source, move) {
			if (!target.hp) return;
			const possibleTypes = [];
			const attackType = move.type;
			for (const type in this.dex.data.TypeChart) {
				if (target.hasType(type)) continue;
				const typeCheck = this.dex.data.TypeChart[type].damageTaken[attackType];
				if (typeCheck === 2 || typeCheck === 3) {
					possibleTypes.push(type);
				}
			}
			if (!possibleTypes.length) {
				return false;
			}
			const randomType = this.sample(possibleTypes);
			if (
				target.isActive && move.effectType === 'Move' && move.category !== 'Status' &&
				randomType !== '???' && !target.hasType(randomType)
			) {
				if (!target.setType(randomType)) return false;
				this.add('-start', target, 'typechange', randomType, '[from] ability: Color Change');
			}
		},
		name: "MuGa RKS System",
		rating: 4.5,
		num: -6027,
	},
	protector: {
		desc: "When hit by a Dark, Ghost or Bug type move, raises Defense by two stages.",
		shortDesc: "+2 DEF when hit by Dark/Ghost/Bug.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark' || move.type === 'Ghost' || move.type === 'Bug') {
				this.boost({def: 2});
			}
		},
		name: "Protector",
		rating: 4.5,
		num: -6028,
	},
	lovingexplosions: {
		desc: "This Pokemon's self-KO moves (Self-Destruct, Explosion, Misty Explosion) deal damage with the opponent's Defense or Special Defense halved, depending on if the move is a physical or special attack (physical attack - physical defense, special attack - special defense).",
		shortDesc: "This Pokemon's self-destructing moves deal damage with the opponent's defenses halved.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.selfdestruct) return this.chainModify(2);
		},
		name: "Loving Explosions",
		rating: 4.5,
		num: -6029,
	},
	mechanic: {
		desc: "Moves that have a guaranted secondary effects have their power doubled.",
		shortDesc: "Moves with 100% chance secondary effects have doubled power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.secondaries) {
				for (const secondary of move.secondaries) {
					if (secondary.chance = 100) return this.chainModify(2);
				}
			}
		},
		name: "Mechanic",
		rating: 4.5,
		num: -6030,
	},
	pounce: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it lowers the Defense of adjacent opponents.",
		shortDesc: "Hazard immunity. Lowers adjacent opponents' Defense by 1 stage if switched in on them.",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					for (const target of pokemon.side.foe.active) {
						if (!target || !this.isAdjacent(target, pokemon)) continue;
						if (!activated) {
							this.add('-ability', pokemon, 'Pounce', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({def: -1}, target, pokemon, null, true);
						}
					}
					return;
				}
			}
		},
		hazardImmune: true,
		name: "Pounce",
		rating: 4,
		num: -6031,
	},
	residrain: {
		desc: "Every time another Pokémon is damaged indirectly, this Pokémon's HP is restored by the same amount.",
		shortDesc: "Heals from the indirect damage dealt to others.",
		onAnyDamage(damage, target, source, effect) {
			const pokemon = this.effectData.target;
			if (effect.effectType !== 'Move' && target !== pokemon && effect.id !== 'leechseed') {
				pokemon.heal(damage);
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		name: "Residrain",
		rating: 4,
		num: -6032,
	},
	residrainhalf: {
		desc: "Every time another Pokémon is damaged indirectly, this Pokémon's HP is restored by half of the same amount.",
		shortDesc: "Heals from half of the indirect damage dealt to others.",
		onAnyDamage(damage, target, source, effect) {
			const pokemon = this.effectData.target;
			if (effect.effectType !== 'Move' && target !== pokemon && effect.id !== 'leechseed') {
				pokemon.heal(damage / 2);
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		name: "Residrain (Half)",
		rating: 4,
		num: -6033,
	},
	overflow: {
		desc: "When this Pokemon uses a Fire-type move, it receives a 50% damage boost, but loses the Fire type and this boost for 2 turns.",
		shortDesc: "1.5x Fire moves; loses Fire type and boost for 2 turns after.",
		onModifyMove(move, pokemon, target) {
            if (move.type === "Fire" && !pokemon.volatiles['overflow']) {
				move.overflow = true;
			}
			else move.overflow = false;
			
        },
		onBasePower(basePower, pokemon, target, move) {
			if (move.overflow) return this.chainModify(1.5);
		},
		onAfterMove(source, target, move) {
			if (move.overflow) {
				source.addVolatile('overflow');
			}
		},
		name: "Overflow",
		rating: 4,
		num: -6034,
	},
	lasttoxin: {
		desc: "When this Pokemon brings an opponent to 50% or under using an attacking move, it badly poisons that opponent.",
		shortDesc: "Badly poison enemies brought under half health..",
		onAfterMove(source, target, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				target.setStatus('tox');
			}
		},
		name: "Last Toxin",
		rating: 4,
		num: -6035,
	},
	junkprocessor: {
		desc: "Every time this Pokemon's stats are lowered, heals 20% of its max HP.",
		shortDesc: "Heal 1/5 HP on stat drops.",
		onAfterEachBoost(boost, target, source, effect) {
			let statsLowered = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', target, 'Junk Processor');
				this.heal(target.baseMaxhp / 5, target);
			}
		},
		name: "Junk Processor",
		rating: 4,
		num: -6036,
	},
	danceofthorns: {
		desc: "If this pokemon has it’s stats lowered, it sets a layer of toxic spikes on the opponent’s side of the field.",
		shortDesc: "Set Toxic Spikes on stat drops.",
		onAfterEachBoost(boost, target, source, effect) {
			let statsLowered = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', this.effectData.target, 'Dance of Thorns');
				this.effectData.target.side.foe.addSideCondition('toxicspikes');
			}
		},
		name: "Dance of Thorns",
		rating: 4,
		num: -6037,
	},
	boobytrap: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it uses Tar Shot on all active enemy Pokemon.",
		shortDesc: "Hazard immunity. Adjacent opponents get Tar Shot if switched in on them.",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					for (const target of pokemon.side.foe.active) {
						if (!target || !this.isAdjacent(target, pokemon)) continue;
						if (!activated) {
							this.add('-ability', pokemon, 'Pounce', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({spe: -1}, target, pokemon, null, true);
							target.addVolatile('tarshot');
						}
					}
					return;
				}
			}
		},
		hazardImmune: true,
		name: "Booby Trap",
		rating: 4,
		num: -6038,
	},
	wonderseal: {
		desc: "All super effective and not very effective moves used on this Pokemon or by this Pokemon fail.",
		shortDesc: "All non-neutrally effective moves used on or by this Pokemon fail.",
		onAnyTryHit(target, source, move) {
			const pokemon = this.effectData.target;
			if (source !== pokemon && target !== pokemon) return;
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Seal immunity: ' + move.id);
			if (target.runEffectiveness(move) !== 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Seal', '[of] ' + pokemon);
				}
				return null;
			}
		},
		name: "Wonder Seal",
		rating: 4,
		num: -6039,
	},
	powerplant: {
        desc: "This Pokemon heals for 1/4 of its max health upon lowering an enemy's stats.",
		shortDesc: "Heal 1/4 on foe stat drop.",
		onAnyAfterEachBoost(boost, target, source) {
            this.hint(source.name);
			this.hint(target.name);
			if (!source || source === target || source !== this.effectData.target) return;
			let statsLowered = false;
            let i: BoostName;
            for (i in boost) {
               if (boost[i]! < 0) {
                   statsLowered = true;
            	}
           	if (statsLowered) {
                this.add('-ability', source, 'Power Plant');
                this.heal(source.baseMaxhp / 4, source);
            	}
			}
        },
        name: "Power Plant",
        rating: 4,
        num: -6040,
    },
	climaticchange: {
        desc: "Upon using a Water, Fire, or Ice move, this Pokemon changes to that type and sets the corresponding weather.",
		shortDesc: "Changes type and weather when using Water/Fire/Ice moves.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type) {
				switch (type) {
					case "Water":
						this.field.setWeather('raindance');	
						if (!source.setType(type)) return;
						this.add('-start', source, 'typechange', type, '[from] ability: Climatic Change');
						break;
					case "Fire":
						this.field.setWeather('sunnyday');	
						if (!source.setType(type)) return;
						this.add('-start', source, 'typechange', type, '[from] ability: Climatic Change');
						break;
					case "Ice":
						this.field.setWeather('hail');	
						if (!source.setType(type)) return;
						this.add('-start', source, 'typechange', type, '[from] ability: Climatic Change');
						break;
					
				}
			}
		},
        name: "Climatic Change",
        rating: 4,
        num: -6041,
    },
	soulguard: {
        desc: "This Pokemon is immune to types it resists.",
		shortDesc: "Resistances become immunities.",
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Soul Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) < 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Soul Guard');
				}
				return null;
			}
		},
        name: "Soul Guard",
        rating: 4,
        num: -6042,
    },
	evaporate: {
        desc: "If the Pokemon or the opponent uses a Water type move, it triggers the Haze effect. Immune to Water.",
		shortDesc: "Haze when any Pokemon uses a Water move; Water immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				this.add('-immune', target, '[from] ability: Evaporate');
				return null;
			}
		},
		onAnyPrepareHit(source, target, move){
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type === 'Water') {
				this.add('-clearallboost');
				for (const pokemon of this.getAllActive()) {
					pokemon.clearBoosts();
				}
			}
		},
        name: "Evaporate",
        rating: 4,
        num: -6043,
    },
	scavenger: {
        desc: "This Pokemon's Dark-type moves have +1 priority",
		shortDesc: "+1 Priority to Dark moves.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Dark') return priority + 1;
		},
        name: "Scavenger",
        rating: 4,
        num: -6044,
    },
	infatigable: {
        desc: "If this Pokemon's recharge moves faint an opposing Pokemon, the user doesn't have to recharge.",
		shortDesc: "Recharge moves don't recharge if the opponent faints.",
		onAfterMove(source, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon === source) continue;
				if (!pokemon.hp) {
					source.removeVolatile('mustrecharge');
					return;
				}
			}
		},
        name: "Infatigable",
        rating: 4,
        num: -6045,
    },
};
