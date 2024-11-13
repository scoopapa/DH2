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
	absorber: {
		name: "Absorber",
		rating: 3,
		shortDesc: "This Pokemon heals 3/16 max HP after being targeted by a NVE/immune move.",
		onDamagingHit(damage, target, source, move) {
			if (target.getMoveHitData(move).typeMod < 0)
				this.heal(target.baseMaxhp * 0.18);
		},
		onImmunity(type, pokemon) {
			if (this.dex.types.isName(type)) {
				this.heal(target.baseMaxhp * 0.18);
			}
		},
		flags: {},
	},
	antimatter: {
		onEffectiveness(typeMod) {
			return typeMod * -1;
		},
		flags: {},
		name: "Antimatter",
		shortDesc: "This Pokemon's defending effectiveness is reversed.",
	},
	asymmetry: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Asymmetry');
					activated = true;
				}
				const nums = [0, 1, 2, 3];
				
				const pickNum1 = this.sample(nums);
				nums.splice(nums.indexOf(pickNum1), 1);
				const pickNum2 = this.sample(nums);
				
				const pokemonMove1 = this.dex.moves.get(pokemon.moves[pickNum1]);
				const pokemonMove2 = this.dex.moves.get(pokemon.moves[pickNum2]);
				const realPokemonMove1 = {
					pokemonMove: pokemonMove1.name,
					id: pokemonMove1.id,
					pp: pokemonMove1.pp * 1.6,
					maxpp: pokemonMove1.pp * 1.6,
					target: pokemonMove1.target,
					disabled: false,
					used: false,
					virtual: true,
				};
				const realPokemonMove2 = {
					pokemonMove: pokemonMove2.name,
					id: pokemonMove2.id,
					pp: pokemonMove2.pp * 1.6,
					maxpp: pokemonMove2.pp * 1.6,
					target: pokemonMove2.target,
					disabled: false,
					used: false,
					virtual: true,
				};
				
				const targetMove1 = this.dex.moves.get(target.moves[pickNum1]);
				const targetMove2 = this.dex.moves.get(target.moves[pickNum2]);
				const realTargetMove1 = {
					targetMove: targetMove1.name,
					id: targetMove1.id,
					pp: targetMove1.pp * 1.6,
					maxpp: targetMove1.pp * 1.6,
					target: targetMove1.target,
					disabled: false,
					used: false,
					virtual: true,
				};
				const realTargetMove2 = {
					targetMove: targetMove2.name,
					id: targetMove2.id,
					pp: targetMove2.pp * 1.6,
					maxpp: targetMove2.pp * 1.6,
					target: targetMove2.target,
					disabled: false,
					used: false,
					virtual: true,
				};
				
				pokemon.moveSlots[pickNum1] = realTargetMove1;
				pokemon.baseMoveSlots[pickNum1] = realTargetMove1;
				pokemon.moveSlots[pickNum2] = realTargetMove2;
				pokemon.baseMoveSlots[pickNum2] = realTargetMove2;
				
				target.moveSlots[pickNum1] = realPokemonMove1;
				target.baseMoveSlots[pickNum1] = realPokemonMove1;
				target.moveSlots[pickNum2] = realPokemonMove2;
				target.baseMoveSlots[pickNum2] = realPokemonMove2;
			}
		},
		flags: {},
		name: "Asymmetry",
		shortDesc: "On switchin, this Pokemon randomly swaps two of its moves with the opponent's.",
	},
	backatya: {
		onDamagingHit(damage, target, source, move) {
			this.add('-activate', source, 'ability: Back at Ya!');
			this.damage(target.getUndynamaxedHP(damage * 2), source, target);
		},
		flags: {},
		name: "Back at Ya!",
		shortDesc: "This Pokemon deals double damage to the opponent when damaged by a move.",
	},
	badpacing: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			pokemon.addVolatile('badpacing');
		},
		condition: {
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'ability: Bad Pacing');
				this.effectState.badpacing = 1;
			},
			onRestart() {
				this.effectState.badpacing ++;
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1 - 0.05 * this.effectState.badpacing);
			},
			onModifyDefPriority: 5,
			onModifyDef(def, attacker, defender, move) {
				return this.chainModify(1 - 0.05 * this.effectState.badpacing);
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				return this.chainModify(1 - 0.05 * this.effectState.badpacing);
			},
			onModifySpDPriority: 5,
			onModifySpD(spd, attacker, defender, move) {
				return this.chainModify(1 - 0.05 * this.effectState.badpacing);
			},
			onModifySpePriority: 5,
			onModifySpe(spe, attacker, defender, move) {
				return this.chainModify(1 - 0.05 * this.effectState.badpacing);
			},
		},
		flags: {},
		name: "Bad Pacing",
		shortDesc: "This Pokemon's non-HP stats are reduced by 5% each turn.",
	},
	bathroombreak: {
		onModifyMove(move, pokemon) {
			if (move.type === 'Water') move.switchFlag = true;
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				target.switchFlag = true;
			}
		},
		name: "Bathroom Break",
		shortDesc: "This Pokemon switches out when using or hit by a Water move.",
	},
	bigstick: {
		onResidual(pokemon) {
			if(pokemon.adjacentFoes().length == 0) return;
			let target = this.sample(pokemon.adjacentFoes());
			const branchpoke = this.dex.getActiveMove('branchpoke');
			this.actions.useMove(branchpoke, pokemon, target);
		},
		flags: {},
		name: "big stick",
		shortDesc: "This Pokemon uses Branch Poke at the end of each turn.",
	},
	bloodsucking: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Bloodsucking');
					activated = true;
				}
				//use move
			}
		},
		flags: {},
		name: "Bloodsucking",
		shortDesc: "On switchin, this Pokemon uses a 20 BP Bug move and heals half the damage dealt.",
	},
	braceforimpact: {
		name: "Brace For Impact",
		shortDesc: "This Pokemon takes half damage from attacks when switching in.",
		onSourceModifyDamage(damage, source, target, move) {
			if (!target.activeTurns) {
				this.debug('Brace For Impact weaken');
				return this.chainModify(0.5);
			}
		},
	},
	brokenwand: {
		onModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(1.3);
			}
		},
		onModifyMove(move, pokemon) {
			if (move.category === 'Special') {
				move.recoil = [1, 3];
			}
		},
		name: "Broken Wand",
		shortDesc: "This Pokemon's special moves have 1.3x more power but 33% recoil.",
	},
	capricious: {
		onBasePower(basePower, pokemon) {
			if (this.randomChance(3, 10)) {
				this.attrLastMove('[anim] Fickle Beam All Out');
				this.add('-activate', pokemon, 'move: Fickle Beam');
				return this.chainModify(2);
			}
		},
		name: "Capricious",
		shortDesc: "This Pokemon's attacks have a 30% chance of dealing double damage.",
	},
	clinch: {
		onBeforeTurn(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('clinch', pokemon);
				const data = side.getSideConditionData('clinch');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onBeforeMove(source, target, move) {
			if (move.volatileStatus === "twoturnmove") {
				delete move.volatileStatus;
			}
		},
		onTryHit(source, target) {
			target.side.removeSideCondition('clinch');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				const move = this.queue.willMove(pokemon.foes()[0]);
				const moveName = move && move.moveid ? this.dex.getActiveMove(move.moveid.toString()) : "";
				console.log(moveName);
				if (!moveName || !moveName.flags['charge']) return;
				delete moveName.onTryMove;
				this.debug('Clinch start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon.foes()[0], 'ability: Clinch');
						alreadyAdded = true;
					}
					this.actions.runMove(moveName, source, source.getLocOf(pokemon));
				}
			},
		},
		flags: {},
		name: "Clinch",
		shortDesc: "This Pokemon's charge moves fully charge and hit a target switching out.",
	},
	colorwheel: {
		onResidual(pokemon) {
			this.add('-ability', pokemon, 'ability: Prismatic');
			const types = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting',
						   'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 
						   'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];
			const possibleTypes = types.filter(type => !pokemon.types.includes(type));
			const newType1 = types[types.indexOf(pokemon.types[0]) + 1];
			const newType2 = pokemon.types[1] !== '' ? types[types.indexOf(pokemon.types[1]) + 1] : '';
			const newTypes = [newType1, newType2];
			if(pokemon.setType(newTypes)) this.add('-start', pokemon, 'typechange', newTypes.join('/'));
		},
		flags: {},
		name: "Color Wheel",
		shortDesc: "This Pokemon changes type(s) to the next one(s) alphabetically at the end of each turn.",
	},
	comeback: {
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.activeMoveActions <= 1) return this.chainModify(1.3);
		},
		flags: {},
		name: "Comeback",
		shortDesc: "For the first turn after this Pokemon is active, its attacks have 1.3x power.",
	},
	contagious: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target.status && !source.status && this.checkMoveMakesContact(move, source, target, true)) {
				source.setStatus(target.status);
				target.cureStatus();
			}
		},
		flags: {},
		name: "Contagious",
		shortDesc: "This Pokemon's non-volatile statuses transfer to Pokemon making contact with it.",
	},
	countermeasures: {
		//coded in scripts/actions/secondaries
		flags: {},
		name: "Countermeasures",
		shortDesc: "When an attacker's secondary activates, it loses HP equal to 100 - secondary chance.",
	},
	crumble: {
		onFaint(pokemon) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const stealthrock = side.sideConditions['stealthrock'];
			if (!stealthrock) {
				this.add('-activate', target, 'ability: Crumble');
				side.addSideCondition('stealthrock', target);
			}
		},
		flags: {},
		name: "Crumble",
		shortDesc: "This Pokemon sets Stealth Rock upon fainting.",
	},
	dewdrop: {
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && ['Grass', 'Water', 'Fairy'].includes(move.type)) {
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {},
		name: "Dewdrop",
		shortDesc: "This Pokemon's Grass/Water/Fairy moves have 1.2x power.",
	},
	diceroller: {
		onSourceDamagingHit(damage, target, source, move) {
			if(!move.flags['bullet']) return;
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in target.boosts) {
				if (target.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 1;
				this.boost(boost);
				randomStat = this.sample(stats);
				boost[randomStat] = 1;
				this.boost(boost);
			} else return;
		},
		flags: {},
		name: "Dice Roller",
		shortDesc: "This Pokemon boosts random stats by 1 twice after using a bullet move.",
	},
	diseased: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
		},
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 10)) {
				target.trySetStatus('psn', source);
			}
		},
		flags: {},
		name: "Diseased",
		shortDesc: "This Pokemon's moves have a 30% chance to poison, but it loses 1/8 max HP every turn.",
	},
	drawfour: {
		shortDesc: "After knocking out target, if user knows less than 12 moves, it learns target's moves.",
		onModifyDamage(damage, source, target, move) {
			if (damage >= target.hp) {
				for (const moveSlot of target.moveSlots) {
					if (moveSlot === null) return;
					if (source.moveSlots.length < 12) {
						this.attrLastMove('[still]');
						if (source.moveSlots.length < 0) return false;
						const learnedMove = {
							move: this.dex.moves.get(moveSlot.id),
							id: moveSlot.id,
							pp: moveSlot.pp,
							maxpp: moveSlot.pp,
							target: moveSlot.target,
							disabled: false,
							used: false,
						};
						source.moveSlots[source.moveSlots.length] = learnedMove;
						source.baseMoveSlots[source.moveSlots.length - 1] = learnedMove;
					}
				}
			}
		},
		name: "Draw Four",
	},
	electromagneticmanipulation: {
		onUpdate(pokemon) {
			console.log(pokemon.adjacentFoes());
			if (pokemon.adjacentFoes().length == 0) return;
			let target = this.sample(pokemon.adjacentFoes());
			if (!target || target.types[0] === 'Electric') return;
			target.addVolatile('electromagneticmanipulation');
		},
		condition: {
			onStart(pokemon) {
				let types = pokemon.types.length === 2 ? ['Electric', pokemon.types[1]] : ['Electric'];
				pokemon.setType(types.join('/'));
				this.add('-start', pokemon, 'typechange', types.join('/'));
			},
		},
		flags: {},
		name: "Electromagnetic Manipulation",
		shortDesc: "While this Pokemon is active, the foe's primary type is Electric.",
	},
	exhaust: {
		
		flags: {},
		name: "Exhaust",
		shortDesc: "While this Pokemon is active, opponents switching out lose 5 PP on the last move they used.",
	},
	firstclassticket: {
		onAfterMove(target, source, move) {
			if (move.type === 'Flying') {
				this.heal(target.baseMaxhp / 4);
			}
		},
		name: "First-Class Ticket",
		shortDesc: "This Pokemon's Flying-type moves heal it for 1/4 max HP.",
	},
	fumigation: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			const poisongas = this.dex.getActiveMove('poisongas');
			this.actions.useMove(poisongas, target, source);
		},
		flags: {},
		name: "Fumigation",
		shortDesc: "When this Pokemon is damaged by a move, it uses Poison Gas against the attacker.",
	},
	gangster: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.type === 'Dark' || move.type === 'Fighting') {
				return 0.1;
			}
		},
		flags: {},
		name: "Gangster",
		shortDesc: "This Pokemon's Dark/Fighting moves go first in its priority bracket.",
	},
	hibernation: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if(pokemon.status === 'slp') this.boost({def: 1, spd: 1});
		},
		flags: {},
		name: "Hibernation",
		shortDesc: "This Pokemon's Def/SpD are raised by 1 each turn while asleep.",
	},
}
