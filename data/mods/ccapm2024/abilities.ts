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
			let target = target = this.sample(pokemon.adjacentFoes());;
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
}
