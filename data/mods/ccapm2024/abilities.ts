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
				target.addVolatile('asymmetry');
				const createArray = (n) => Array.from({ length: n }, (_, i) => i);
				const pokemonArray = createArray(pokemon.moves.length);
				const targetArray = createArray(target.moves.length);
				
				const pickNum1 = this.sample(pokemonArray);
				pokemonArray.splice(pokemonArray.indexOf(pickNum1), 1);
				let pickNum2;
				if (pokemonArray.length === 0) pickNum2 = -1;
				else pickNum2 = this.sample(pokemonArray);
				
				const pickNum3 = this.sample(targetArray);
				targetArray.splice(targetArray.indexOf(pickNum3), 1);
				let pickNum4;
				if (targetArray.length === 0) pickNum4 = -1;
				else pickNum4 = this.sample(targetArray);
				
				const pokemonMove1 = this.dex.moves.get(pokemon.moves[pickNum1]);
				const realPokemonMove1 = {
					move: pokemonMove1.name,
					id: pokemonMove1.id,
					pp: pokemonMove1.pp * 1.6,
					maxpp: pokemonMove1.pp * 1.6,
					target: pokemonMove1.target,
					disabled: false,
					used: false,
					virtual: true,
				};
				const targetMove1 = this.dex.moves.get(target.moves[pickNum3]);
				const realTargetMove1 = {
					move: targetMove1.name,
					id: targetMove1.id,
					pp: targetMove1.pp * 1.6,
					maxpp: targetMove1.pp * 1.6,
					target: targetMove1.target,
					disabled: false,
					used: false,
					virtual: true,
				};				
				
				pokemon.moveSlots[pickNum1] = realTargetMove1;
				pokemon.baseMoveSlots[pickNum1] = realTargetMove1;
				target.moveSlots[pickNum3] = realPokemonMove1;
				target.baseMoveSlots[pickNum3] = realPokemonMove1;
				
				if (pickNum2 === -1 || pickNum4 === -1) return;
				const pokemonMove2 = this.dex.moves.get(pokemon.moves[pickNum2]);
				const realPokemonMove2 = {
					move: pokemonMove2.name,
					id: pokemonMove2.id,
					pp: pokemonMove2.pp * 1.6,
					maxpp: pokemonMove2.pp * 1.6,
					target: pokemonMove2.target,
					disabled: false,
					used: false,
					virtual: true,
				};
				const targetMove2 = this.dex.moves.get(target.moves[pickNum4]);
				const realTargetMove2 = {
					move: targetMove2.name,
					id: targetMove2.id,
					pp: targetMove2.pp * 1.6,
					maxpp: targetMove2.pp * 1.6,
					target: targetMove2.target,
					disabled: false,
					used: false,
					virtual: true,
				};
				
				pokemon.moveSlots[pickNum2] = realTargetMove2;
				pokemon.baseMoveSlots[pickNum2] = realTargetMove2;
				target.moveSlots[pickNum4] = realPokemonMove2;
				target.baseMoveSlots[pickNum4] = realPokemonMove2;
			}
		},
		condition: {
			duration: 1,
			noCopy: true,
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (pokemon.moveSlots.filter(m => m.id === move.id).length === 0) {
					const newMove = this.dex.moves.get(move);
					this.actions.useMove(newMove, pokemon, target);
					return null;
				}
			},
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
		onAfterMove(target, source, move) {
			if (move.type === 'Water') {
				this.add('-activate', target, 'ability: Bathroom Break');
				target.switchFlag = true;
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') target.switchFlag = true;
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
					activated = true;
				}
				pokemon.addVolatile('bloodsucking');
				const leechlife = this.dex.getActiveMove('leechlife');
				this.actions.useMove(leechlife, pokemon, target);
			}
		},
		flags: {},
		name: "Bloodsucking",
		shortDesc: "On switchin, this Pokemon uses a 20 BP Bug move and heals equal to the damage dealt.",
	},
	braceforimpact: {
		name: "Brace for Impact",
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
				move.accuracy = true;
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
			const side = pokemon.side.foe;
			const stealthrock = side.sideConditions['stealthrock'];
			if (!stealthrock) {
				this.add('-activate', pokemon, 'ability: Crumble');
				side.addSideCondition('stealthrock', pokemon);
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
				if (source.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 1;
				randomStat = this.sample(stats);
				boost[randomStat] = 1;
				this.boost(boost, source, source);
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
		onFoeSwitchOut(pokemon) {
			if (!pokemon.lastMoveUsed) return;
			const moveUsed = pokemon.lastMoveUsed;
			const moveIndex = pokemon.moves.indexOf(moveUsed.id);
			console.log(pokemon.moveSlots[moveIndex]);
			pokemon.moveSlots[moveIndex].pp -= 5;
		},
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
	ironfistening: {
		onStart(source) {
			source.side.addFishingTokens(1);
		},
		flags: {},
		name: "Iron Fistening",
		shortDesc: "On switchin, this Pokemon's side gains a Fishing Token.",
	},
	magicmissile: {
		/*
		Need to test:
		- any Berry
		- Toxic Orb, Flame Orb or Light Ball (just one they're the same code)
		- White Herb
		- Mental Herb
		- um, I guess making sure Razor Claw or Razor Fang (just one they're the same code) doesn't immediately crash,
		but it would be basically impossible for them to cause a flinch in a singles context
		(how does this behave with Instruct? maybe you could test with that if you're doing the doubles format Aquatic mentioned)
		*/
		name: "Magic Missile",
		shortDesc: "Magician + when damaged, fling item for 25% max HP.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Magic Missile', '[of] ' + target);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.isSemiInvulnerable()) return;
			if (target.ignoringItem()) return false;
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return false;
			if (item.id && !item.megaStone) {
				this.damage(source.baseMaxhp / 4, source, target);
				target.addVolatile('fling');
				if (item.is
				) {
					if (this.singleEvent('Eat', item, null, source, null, null)) {
						this.runEvent('EatItem', source, null, null, item);
						if (item.id === 'leppaberry') source.staleness = 'external';
					}
					if (item.onEat) source.ateBerry = true;
				} else if (item.id === 'mentalherb') {
					const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
					for (const firstCondition of conditions) {
						if (source.volatiles[firstCondition]) {
							for (const secondCondition of conditions) {
								source.removeVolatile(secondCondition);
								if (firstCondition === 'attract' && secondCondition === 'attract') {
									this.add('-end', source, 'move: Attract', '[from] item: Mental Herb');
								}
							}
							return;
						}
					}
				} else if (item.id === 'whiteherb') {
					let activate = false;
					const boosts: SparseBoostsTable = {};
					let i: BoostName;
					for (i in source.boosts) {
						if (source.boosts[i] < 0) {
							activate = true;
							boosts[i] = 0;
						}
					}
					if (activate) {
						source.setBoost(boosts);
						this.add('-clearnegativeboost', source, '[silent]');
					}
				} else {
					if (item.fling && item.fling.status) {
						source.trySetStatus(item.fling.status, target);
					} else if (item.fling && item.fling.volatileStatus) {
						source.addVolatile(item.fling.volatileStatus, target);
					}
				}
			}
		},
	},
	medic: {
		onSwitchOut(pokemon) {
			pokemon.side.addSideCondition('medic');
		},
		flags: {},
		name: "Medic",
		shortDesc: "Upon switching out, the replacement heals 1/6 max HP and has its status cured.",
	},
	mindbloom: {
		onModifyMove(move, pokemon) {
			if (move.category === 'Status' && move.target === 'normal') {
				move.boosts = {
					spd: -1,
				};
			}
		},
		onAfterMove(pokemon, source, move) {
			if (move.category === 'Status') {
				if (pokemon.adjacentFoes().length == 0) return;
				let target = this.sample(pokemon.adjacentFoes());
				this.boost({spd: -1}, target, pokemon, null, true);
			}
		},
		flags: {},
		name: "Mind Bloom",
		shortDesc: "This Pokemon's status moves lower the opponent's Sp. Def by 1.",
	},
	momentum: {
		name: "Momentum",
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
		flags: {},
		onStart(pokemon) {
			pokemon.addVolatile('momentum');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('momentum')) {
					pokemon.removeVolatile('momentum');
					return;
				}
				if (move.callsMove) return;
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
	},
	nightlight: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Night Light weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Night Light weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Night Light",
		shortDesc: "This Pokemon takes halved damage from Dark and Ghost-type moves.",
	},
	nightmarch: {
		onBasePower(basePower, pokemon, target, move) {
			const allies = pokemon.side.pokemon.filter(p => p != pokemon && p.set.moves.toString().indexOf(move) != -1);
			return basePower += 20 * allies.length;
		},
		name: "Night March",
		shortDesc: "This Pokemon's attacks gain +20 power for each ally that also has that move.",
	},
	nocturnal: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Nocturnal');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Nocturnal",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Dark moves; Dark immunity.",
	},
	outclass: {
        onSourceHit(target, source, move) {
            if (!move || !target || target.hasItem('terashard')) return;
            let targetType = target.types[0];
            let sourceSecondaryType = '???'
            if (source.types[1]) sourceSecondaryType = source.types[1];
            if (target !== source && move.category !== 'Status' &&
                 !source.hasType(targetType) && targetType !== '???' &&
                 !(source.volatiles['outclass'] && !source.side.removeFishingTokens(1))) {
                    source.setType([source.types[0]]);
                    if (source.addType(targetType)) {
                        target.setType(target.getTypes(true).map(type => type === targetType ? "???" : type));
                        this.add('-start', target, 'typechange', target.types.join('/'));
                        this.add('-start', source, 'typeadd', targetType, '[from] ability: Outclass');
                        source.addVolatile('outclass');
                    }
                    else {
                        this.debug('Failed to take target type.');
                        if (sourceSecondaryType !== '???') source.setType([source.types[0], sourceSecondaryType]);
                    }
                }
        },
        condition: {},
        flags: {},
        name: "Outclass",
        shortDesc: "Fishing token or first contact: steals target primary type and replaces its own secondary type.",
        rating: 4,
    },
	peckingorder: {
		name: "Pecking Order",
		shortDesc: "On switch-in, this Pokemon lowers the Defense of adjacent opponents by 1 stage.",
		flags: {},
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !target.isAdjacent(pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Pecking Order', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({def: -1}, target, pokemon, null, true);
				}
			}
		},
	},
	polychrome: {
		onBasePower(basePower, pokemon, target, move) {
			if(!pokemon.hasType(move.type)) return this.chainModify(1.25);
		},
		name: "Polychrome",
		shortDesc: "This Pokemon's non-STAB moves have 1.25x power.",
	},
	precognition: {
		onBeforeTurn(pokemon) {
			if (pokemon.adjacentFoes().length == 0) return;
			let target = this.sample(pokemon.adjacentFoes());
			const targetAction = this.queue.willMove(target);
			if (!targetAction) return;
			const pokemonAction = this.queue.willMove(pokemon);
			const targetMove = this.dex.getActiveMove(targetAction.move.id);
			const pokemonMove = this.dex.getActiveMove(pokemonAction.move.id);
			if (!pokemon.volatiles['substitute'] && targetMove.type === pokemonMove.type) {
				const substitute = this.dex.getActiveMove('substitute');
				this.actions.useMove(substitute, pokemon, pokemon);
			}
		},
		flags: {},
		name: "Precognition",
		shortDesc: "If a foe selects the same type move as the user, the user uses Substitute at the beginning of the turn."
	},
	preeminence: {
		onModifyPriority(priority, pokemon, target, move) {
			const basePowerAfterMultiplier = this.modify(move.basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Preeminence boost');
				return priority + 1;
			}
		},
		flags: {},
		name: "Preeminence",
		shortDesc: "This Pokemon's moves of 60 power or less have +1 priority, including Struggle.",
	},
	preparation: {
		onAfterMove(source, target, move) {
			if (move.category === 'Status' && move.name !== 'Substitute' && !move.stallingMove) {
				source.addVolatile('preparation');
			}
		},
		condition: {
			duration: 2,
			onBasePower(basePower, attacker, defender, move) {
				return this.chainModify(2);
			}
		},
		name: "Preparation",
		shortDesc: "Deals 2x damage the turn after using a status move.",
	},
	puppetmaster: {
		onSwitchIn(pokemon) {
			this.effectState.puppetmaster = pokemon;
		},
		onAnyPrepareHitPriority: -1,
		onAnyPrepareHit(source, target, move) {
			const puppetmaster = this.effectState.puppetmaster;
			console.log(move.sourceEffect);
			if (!move || move.name !== 'Substitute' || move.isZ || move.isMax || move.sourceEffect === 'puppetmaster') return;
			this.actions.useMove(move.id, puppetmaster);
			return null;
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.adjacentFoes().length == 0) return;
			let target = this.sample(pokemon.adjacentFoes());
			if (target.volatiles['substitute']) this.damage(target.baseMaxhp / 8, target, pokemon);
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true) && this.randomChance(1, 1000)) {
				source.formeChange('Cradily');
			}
		},
		flags: {},
		name: "Puppet Master",
		shortDesc: "This Pokemon steals foes' Substitute. Foes under Substitute lose 1/5 max HP per turn.",
	},
	quickthinking: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.newlySwitched || this.queue.willMove(target)) {
					return this.chainModify(1.3);
				}
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (this.queue.willMove(target)) {
				this.debug('Slow and Steady neutralize');
				return this.chainModify(0.7);
			}
		},
		flags: {breakable: 1},
		name: "Quick Thinking",
		shortDesc: "This Pokemon deals 1.3x damage when moving first and takes 0.7x damage when moving last.",
	},
	refraction: {
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Refraction');
			pokemon.side.addSideCondition('waterpledge');
		},
		flags: {},
		name: "Refraction",
		shortDesc: "On switchin, this Pokemon sets Rainbow on its side.",
	},
	royalguard: {
        onStart(pokemon) {
			if (pokemon.royalguard) return;
			pokemon.royalguard = true;
            this.actions.useMove("substitute", pokemon);
        },
        name: "Royal Guard",
        shortDesc: "On switchin, this Pokemon uses Substitute. Once per battle.",
    },
	sealedoff: {
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Sealed Off');
			this.actions.useMove("imprison", pokemon);
		},
        name: "Sealed Off",
        shortDesc: "On switchin, this Pokemon uses Imprison.",
    },
	searingremark: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.flags['sound'] && this.randomChance(3, 10)) {
				if (!target.hasAbility('shielddust') && !target.hasItem('covertcloak')) target.trySetStatus('brn', source);
			}
		},
		flags: {},
		name: "Searing Remark",
		shortDesc: "This Pokemon's sound moves have a 30% of burning the target.",
	},
	selfrepair: {
		onAfterMove(target, source, move) {
			if (move.category === 'Status') {
				this.heal(target.baseMaxhp / 4);
			}
		},
		name: "Self-Repair",
		shortDesc: "This Pokemon heals 25% its max HP after using a Status move.",
	},
	snowhazard: {
		onDamagingHit(damage, target, source, move) {
			this.field.setWeather('snow');
		},
		flags: {},
		name: "Snowhazard",
		shortDesc: "When this Pokemon is hit by an attack, the effect of Snow begins."
	},
	spinthewheel: {
		onResidual(pokemon) {
			const metronome = this.dex.getActiveMove('metronome');
			this.actions.useMove(metronome, pokemon);
		},
		flags: {},
		name: "Spin the Wheel",
		shortDesc: "This Pokemon uses Metronome at the end of each turn."
	},
	statleeching: {
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Stat Leeching' || effect?.name === 'Mirror Herb') return;
			const pokemon = this.effectState.target;
			const boosts: Partial<BoostsTable> = {};
			let i: BoostID;
			for (i in boost) {
				boosts[i] = -boost[i];
			}
			if (Object.keys(boosts).length < 1) return;
			this.boost(boosts, pokemon);
		},
		flags: {},
		name: "Stat Leeching",
		shortDesc: "This Pokemon gains the opposite stat change as opposing Pokemon."
	},
	strongbreeze: {
        onStart(pokemon) {
			if (pokemon.strongbreeze) return;
			pokemon.strongbreeze = true;
			this.add('-activate', pokemon, 'ability: Strong Breeze');
            pokemon.side.addSideCondition('tailwind');
        },
        name: "Strong Breeze",
        shortDesc: "On switchin, this Pokemon sets Tailwind. Once per battle.",
    },
	superrod: {
		onAfterMove(target, source, move) {
			if (move.type === 'Flying' && target.side.fishingTokens > 0) {
				this.heal(target.baseMaxhp / 16 * target.side.fishingTokens);
			}
		},
		name: "Super Rod",
		shortDesc: "This Pokemon's Water-type moves heal it for 1/16 max HP for each Fishing Token.",
	},
	treasurecraze: {
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target) return;
			this.boost({atk: 2}, pokemon, pokemon, null, false, true);
		},
		onTakeItem(item, pokemon) {
			this.boost({atk: 2}, pokemon, pokemon, null, false, true);
		},
		flags: {},
		name: "Treasure Craze",
		shortDesc: "When this Pokemon loses its held item, its Attack is raised by 2.",
	},
	troubled: {
		onStart(source) {
			source.addVolatile('troubled');
		},
		condition: {
			noCopy: true,
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			},
		},
		name: "Troubled",
		shortDesc: "This Pokemon cannot use the same move twice in a row.",
	},
}
