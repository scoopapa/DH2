import { consoleips } from "../../../config/config-example";

const slicing = [
	'cut', 'razorleaf', 'slash', 'furycutter', 'aircutter', 'aerialace',
	'leafblade', 'nightslash', 'airslash', 'xscissor', 'psychocutter',
	'crosspoison', 'sacredsword', 'razorshell', 'solarblade', 'behemothblade',
	'stoneaxe', 'ceaselessedge', 'populationbomb', 'kowtowcleave', 'bitterblade',
	'aquacutter'
];
export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	//Paradoxes abilities
	cleansingfire: {
		onAnyFaintPriority: 1,
		onAnyFaint() {
			if(!this.effectData.target.hp) return;
			this.debug('cleansingfire');
			this.add('-activate', this.effectData.target, 'ability: Cleansing Fire');
			this.effectData.target.cureStatus();
		},
		name: "Cleansing Fire",
		shortDesc: "When a Pokemon faints, this Pokemon's status is cured.",
		rating: 3.5,
		num: -1,
	},
	corruptingstorm: {
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.add('-activate', target, 'ability: Corrupting Storm');
				source.addVolatile('storm');
			}
		},
		name: "Corrupting Storm",
		shortDesc: "When this Pokemon is KOed by another Pokemon, the attacker loses 1/8 max HP every turn until it switches out.",
		rating: 2.5,
		num: -2,
	},


	//Gen 9 abilities
	sharpness: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				return this.chainModify(1.5);
			}
		},
		name: "Sharpness",
		shortDesc: "This Pokemon's slicing moves have their power multiplied by 1.5.",
		rating: 3,
		num: 178,
	},
	myceliummight: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				// TODO what exactly does "The Pokémon will always act more slowly when using status moves" mean?
				// Assuming -1 priority.
				return priority - 1;
			}
		},
		// Supress abilities when status moves are involved
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreAbility = true;
			}
		},
		name: "Mycelium Might",
		shortDesc: "This Pokemon's Status moves go last in their priority bracket and ignore Abilities.",
		rating: 2,
		num: 298,
	},
	// broke atm
	/*
	cudchew: {
		onEatItem(item, pokemon) {
			if (!item.isBerry) return;
			pokemon.abilityState.berry = item;
			pokemon.addVolatile('cudchew');
		},
		condition: {
			noCopy: true,
			duration: 2,
			onEnd(pokemon) {
				if (pokemon.hp && pokemon.abilityState.berry) {
					const item = pokemon.abilityState.berry;
					this.add('-activate', pokemon, 'ability: Cud Chew');
					this.add('-enditem', pokemon, item.name);
					if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
					}
					if (item.onEat) pokemon.ateBerry = true;
					delete pokemon.abilityState.berry;
				}
			},
		},
		name: "Cud Chew",
		rating: 3,
		num: 291,
	},
	*/
};