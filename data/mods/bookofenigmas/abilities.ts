const slicing = [
	'cut', 'razorleaf', 'slash', 'furycutter', 'aircutter', 'aerialace',
	'leafblade', 'nightslash', 'airslash', 'xscissor', 'psychocutter',
	'crosspoison', 'sacredsword', 'razorshell', 'solarblade', 'behemothblade',
	'stoneaxe', 'ceaselessedge', 'populationbomb', 'kowtowcleave', 'bitterblade',
	'aquacutter'
];
export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	sharpness: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				return this.chainModify(1.5);
			}
		},
		name: "Sharpness",
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