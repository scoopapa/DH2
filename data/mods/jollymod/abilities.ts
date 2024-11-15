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
	christmascarol: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound']) {
				move.type = 'Ice';
				move.kindanice = true;
			}
		},
		flags: {},
		name: "Christmas Carol",
		shortDesc: "This Pokemon's sound moves become Ice-type and have halved karma loss.",
	},
	evergreen: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Moss Coat boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Moss Coat boost');
				return this.chainModify(1.3);
			}
		},
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.id === 'earthquake' || move.id === 'magnitude' || move.id === 'bulldoze') {
				return this.chainModify(0.5);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.maxhp / 16);
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.maxhp / 16);
		},
		name: "Evergreen",
		shortDesc: "This Pokemon is considered to be under the effects of Grassy Terrain.",
	},
	fightningrod: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fighting') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Fightning Rod');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Fighting' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Fightning Rod');
				}
				return this.effectState.target;
			}
		},
		flags: {breakable: 1},
		name: "Fightning Rod",
		shortDesc: "This Pokemon draws Fighting moves to itself to raise Atk by 1; Fighting immunity.",
	},
	ghostofchristmaspresent: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.side.karma != defender.side.karma) {
				if (attacker.side.karma > defender.side.karma) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				} else {
					this.debug('Rivalry weaken');
					return this.chainModify(0.75);
				}
			}
		},
		flags: {},
		name: "Ghost of Christmas Present",
		shortDesc: "This Pokemon deals 1.25x damage to Pokemon with less karma but 0.75x damage to those with more karma.",
	},
	ghostofchristmasyettocome: {
		onAnyFaintPriority: 1,
		onAnyFaint() {
			this.boost({atk: 1}, this.effectState.target);
		},
		flags: {},
		name: "Ghost of Christmas Yet to Come",
		shortDesc: "This Pokemon's Attack is raised by 1 stage when another Pokemon faints.",
	},
	grinchsapprentice: {
		onModifyMove(move) {
			move.naughty = true;
		},
		flags: {},
		name: "Grinch's Apprentice",
		shortDesc: "This Pokemon's attacks lower its karma by an additional point.",
	},
	heatproof: {
		onTryHit(target, source, move) {
			if (move.type === 'Fire' && target !== source) {
				this.add('-immune', target, '[from] ability: Heatproof');
				return null;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Heatproof');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Heatproof');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Heatproof",
		shortDesc: "This Pokemon is immune to Fire-type moves and burn.",
	},
	iceface: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Eiscue' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'protect') return;
			const targetForme = (move.id === 'protect' ? 'Eiscue' : 'Eiscue-Noice');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Ice Face",
		shortDesc: "If Eiscue, changes Forme to Noice before attacks and base before Protect.",
	},
	jollyspirit: {
		onModifyMove(move) {
			if(move.flags['nice']) move.extranice = true;
		},
		flags: {},
		name: "Jolly Spirit",
		shortDesc: "This Pokemon's nice moves raise its karma by an additional point.",
	},
	meltingsnow: {
		onStart(source) {
			this.field.addPseudoWeather('watersport');
		},
		flags: {},
		name: "Melting Snow",
		shortDesc: "On switchin, this Pokemon summons Water Sport.",
	},
	mountaineer: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock') {
				this.add('-immune', target, '[from] ability: Mountaineer');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Mountaineer",
		shortDesc: "This Pokemon is immune to Rock-type moves and Stealth Rock.",
	},
	permafrost: {
		// Implemented in scripts/pokemon/setStatus
		flags: {},
		name: "Permafrost",
		shortDesc: "This Pokemon can inflict Frostbite regardless of typing.",
	},
	snowcloak: {
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isWeather('snow')) return this.chainModify(1.5);
		},
		flags: {breakable: 1},
		name: "Snow Cloak",
		shortDesc: "If Snow is active, this Pokemon's Defense is 1.5x.",
	},
	spiritofgiving: {
		desc: "On switch-in, every Pokémon in this Pokémon's party regains the item it started with, even if the item was a popped Air Balloon, if the item was picked up by a Pokémon with the Pickup Ability, or the item was lost to Bug Bite, Covet, Incinerate, Knock Off, Pluck, or Thief. It doesn't work if the Pokémon is already holding something else.",
		shortDesc: "On switchin, this Pokemon restores the party's used or removed items.",
		name: "Spirit of Giving",
		onStart(pokemon) {
			const side = pokemon.side;
			let activated = false;
			for (const ally of side.pokemon) {
				if (ally.item) continue;
				if ((ally as any).lostItemForDelibird) {
					const item = (ally as any).lostItemForDelibird;
					if (ally.setItem(item)) {
						if (!activated) {
							this.add('-ability', pokemon, 'Spirit of Giving');
						}
						activated = true;
						this.add('-item', ally, this.dex.items.get(item), '[from] Ability: Spirit of Giving');
					}
				}
			}
		},
		rating: 4,
		num: -36,
	},
	zenmode: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zen Galarian Darmanitan' || pokemon.transformed) {
				return;
			}
			if (pokemon.species.id !== 'zengalariandarmanitanzen') pokemon.formeChange('Zen Galarian Darmanitan-Zen');
		},
		name: "Zen Mode",
		shortDesc: "If Zen Galarian Darmanitan, change Mode to Zen when damaged by an attack.",
	},
	moody: {
		onModifyMove(move) {
			if(this.randomChance(1, 2)) move.naughty = true;
			else move.extranice = true;
		},
		flags: {},
		name: "Moody",
		shortDesc: "This Pokemon's moves randomly increase its karma by 2 or decrease it by 1.",
	},
}
