export const Rulesets: {[k: string]: ModdedFormatData} = {
	trainersupportrule: {
		name: "Trainer Support Rule",
		effectType: "Rule",
		desc: `Naming your first Pokemon the name of certain trainers grants the team a boost.`,
		onBegin() {
			for (const side of this.sides) {
				switch (side.pokemon[0].name.toLowerCase()) {
					case 'miriam':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/miriam.png" height="80" width="80">`);
						side.trainerBoost = 'miriam';
						break;
					case 'larry':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/larry.png" height="80" width="80">`);
						side.trainerBoost = 'larry';
						break;
					case 'steven':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/steven.png" height="80" width="80">`);
						side.trainerBoost = 'steven';
						break;
					case 'lance':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/lance.png" height="80" width="80">`);
						side.trainerBoost = 'lance';
						break;
					case 'cynthia':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/cynthia.png" height="80" width="80">`);
						side.trainerBoost = 'cynthia';
						break;
					case 'iris':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/iris-gen5bw2.png" height="80" width="80">`);
						side.trainerBoost = 'iris';
						break;
					case 'roxie':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/roxie.png" height="80" width="80">`);
						side.trainerBoost = 'roxie';
						break;
					case 'roxanne':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/roxanne.png" height="80" width="80">`);
						side.trainerBoost = 'roxanne';
						break;
					case 'sidney':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/sidney.png" height="80" width="80">`);
						side.trainerBoost = 'sidney';
						break;
					case 'brycen-man':
					case 'brycen man':
					case 'brycenman':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/brycenman.png" height="80" width="80">`);
						side.trainerBoost = 'brycenman';
						break;
					case 'lear':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://archives.bulbagarden.net/media/upload/thumb/d/dc/Masters_Lear.png/348px-Masters_Lear.png" height="80" width="46.4774624">`);
						side.trainerBoost = 'lear';
						break;
					case 'flint':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/flint.png" height="80" width="80">`);
						side.trainerBoost = 'flint';
						break;
					case 'mina':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/mina.png" height="80" width="80">`);
						side.trainerBoost = 'mina';
						break;
					case 'dustin':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/worker.png" height="80" width="80">`);
						side.trainerBoost = 'dustin';
						break;
					case 'youngsterjoey':
					case 'youngster joey':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/youngster-gen4.png" height="80" width="80">`);
						side.trainerBoost = 'joey';
						break;
					case 'lacey':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/lacey.png" height="80" width="80">`);
						side.trainerBoost = 'lacey';
						break;
					case 'will':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/will.png" height="80" width="80">`);
						side.trainerBoost = 'will';
						break;
					case 'marshal':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/marshal.png" height="80" width="80">`);
						side.trainerBoost = 'marshal';
						break;
					case 'chili':
					case 'cilan':
					case 'cress':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/${side.pokemon[0].name.toLowerCase()}.png" height="80" width="80">`);
						let grass = false;
						let fire = false;
						let water = false;
						for (const pokemon of side.pokemon) {
							if (!grass && pokemon.hasType('Grass')) {
								grass = true;
								continue;
							}
							if (!fire && pokemon.hasType('Fire')) {
								fire = true;
								continue;
							}
							if (!water && pokemon.hasType('Water')) {
								water = true;
								continue;
							}
						}
						if (grass && fire && water) side.trainerBoost = 'cguys';
						break;
					case 'lysandre':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/lysandre.png" height="80" width="80">`);
						side.trainerBoost = 'lysandre';
						break;
					case 'whitney':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/whitney.png" height="80" width="80">`);
						side.trainerBoost = 'whitney';
						break;
					case 'mikuice':
					case 'miku ice':
					case 'miku-ice':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/miku-ice.png" height="80" width="80">`);
						side.trainerBoost = 'miku-ice';
						break;
					case 'ltsurge':
					case 'lt.surge':
					case 'lt. surge':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/ltsurge.png" height="80" width="80">`);
						side.trainerBoost = 'ltsurge';
						break;
					case 'riley':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/riley.png" height="80" width="80">`);
						side.trainerBoost = 'riley';
						break;
					case 'lusamine':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/lusamine.png" height="80" width="80">`);
						side.trainerBoost = 'lusamine';
						break;
					case 'mikughost':
					case 'miku ghost':
					case 'miku-ghost':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/miku-ghost.png" height="80" width="80">`);
						side.trainerBoost = 'mikughost';
						break;
					case 'bugsy':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://play.pokemonshowdown.com/sprites/trainers/bugsy.png" height="80" width="80">`);
						side.trainerBoost = 'bugsy';
						break;
					case 'asa':
						this.add('-message', `${side.name}'s Trainer Support:`);
						this.add(`raw|<img src="https://archives.bulbagarden.net/media/upload/7/75/Conquest_Warrior_F_02.png" height="80" width="47.2483221">`);
						side.trainerBoost = 'asa';
						break;
					default:
						this.add('-message', `Note: ${side.name} does not a trainer support.`);
				}
				side.pokemon[0].set.name = side.pokemon[0].set.species;
			}
		},
		onSwitchIn(pokemon) {
			if (!pokemon.side.trainerBoost) return;
			switch(pokemon.side.trainerBoost) {
				case 'miriam':
					pokemon.addVolatile('ability:merciless');
					break;
				case 'larry':
					pokemon.addVolatile('larryboost');
					break;
				case 'steven':
					pokemon.addVolatile('stevenboost');
					break;
				case 'lance':
					pokemon.addVolatile('lanceboost');
					break;
				case 'cynthia':
					pokemon.addVolatile('cynthiaboost');
					break;
				case 'iris':
					pokemon.addVolatile('irisboost');
					break;
				case 'roxie':
					pokemon.addVolatile('roxieboost');
					break;
				case 'roxanne':
					pokemon.addVolatile('roxanneboost');
					break;
				case 'sidney':
					pokemon.addVolatile('sidneyboost');
					break;
				case 'brycenman':
					pokemon.addVolatile('brycenmanboost');
					break;
				case 'lear':
					pokemon.addVolatile('learboost');
					break;
				case 'flint':
					pokemon.addVolatile('flintboost');
					break;
				case 'mina':
					pokemon.addVolatile('minaboost');
					break;
				case 'dustin':
					pokemon.addVolatile('dustinboost');
					break;
				case 'joey':
					pokemon.addVolatile('joeyboost');
					break;
				case 'lacey':
					pokemon.addVolatile('laceyboost');
					break;
				case 'will':
					pokemon.addVolatile('willboost');
					break;
				case 'marshal':
					pokemon.addVolatile('marshalboost');
					break;
				case 'cguys':
					pokemon.addVolatile('cguysboost');
					break;
				case 'lysandre':
					pokemon.addVolatile('lysandreboost');
					break;
				case 'whitney':
					pokemon.addVolatile('whitneyboost');
					break;
				case 'miku-ice':
					pokemon.addVolatile('mikuiceboost');
					break;
				case 'ltsurge':
					if (pokemon.hasType('Electric')) pokemon.addVolatile('ltsurgeboost');
					break;
				case 'riley':
					pokemon.addVolatile('rileyboost');
					break;
				case 'mikughost':
					if (pokemon.hasType('Ghost')) {
						pokemon.addVolatile('ability:pressure');
						pokemon.addVolatile('ability:perishbody');
					}
					break;
				case 'bugsy':
					if (pokemon.hasType('Bug')) pokemon.addVolatile('bugsyboost');
					break;
				case 'lusamine':
					pokemon.addVolatile('lusamineboost');
					break;
				case 'asa':
					if (pokemon.hasType('Ghost') || pokemon.hasType('Poison')) pokemon.addVolatile('asaboost');
					break;
			}
		}
	},
};