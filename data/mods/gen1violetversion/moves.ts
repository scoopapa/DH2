export const Moves: {[k: string]: ModdedMoveData} = {
	acid: {
		inherit: true,
		desc: "Drops defense 1 stage.",
		shortDesc: "Drops def -1.",
		basePower: 60,
		pp: 15,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	aquaring: {
		num: 392,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Aqua Ring",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		volatileStatus: 'aquaring',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Aqua Ring');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 8);
			},
		},
	},
	bind: {
		inherit: true,
		basePower: 40,
		accuracy: 75,
		pp: 5,
		type: "Bug",
		ignoreImmunity: true,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
	},
	clamp: {
		inherit: true,
		basePower: 70,
		accuracy: 75,
		pp: 5,
		ignoreImmunity: true,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
	},
	conversion: { //Typing needs to be retained after switch-out
		inherit: true,
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		onHit(target, source, move) {
// bad solution incoming
			this.heal(Math.floor(target.maxhp / 2), source, source);
			
			source.side.removeSideCondition('convertmoltres')
			source.side.removeSideCondition('convertalakazam')
			source.side.removeSideCondition('convertarbok')
			source.side.removeSideCondition('convertarticuno')
			source.side.removeSideCondition('convertbeedrill')
			source.side.removeSideCondition('convertblastoise')
			source.side.removeSideCondition('convertbutterfree')
			source.side.removeSideCondition('convertchansey')
			source.side.removeSideCondition('convertcharizard')
			source.side.removeSideCondition('convertcloyster')
			source.side.removeSideCondition('convertdragonite')
			source.side.removeSideCondition('convertdugtrio')
			source.side.removeSideCondition('convertelectabuzz')
			source.side.removeSideCondition('convertelectrode')
			source.side.removeSideCondition('convertexeggutor')
			source.side.removeSideCondition('convertflareon')
			source.side.removeSideCondition('convertgengar')
			source.side.removeSideCondition('convertgolbat')
			source.side.removeSideCondition('convertgolduck')
			source.side.removeSideCondition('convertgolem')
			source.side.removeSideCondition('convertgyarados')
			source.side.removeSideCondition('convertjynx')
			source.side.removeSideCondition('convertkabutops')
			source.side.removeSideCondition('convertmachamp')
			source.side.removeSideCondition('convertmagmar')
			source.side.removeSideCondition('convertmagneton')
			source.side.removeSideCondition('convertnidoqueen')
			source.side.removeSideCondition('convertninetales')
			source.side.removeSideCondition('convertparasect')
			source.side.removeSideCondition('convertpidgeot')
			source.side.removeSideCondition('convertpinsir')
			source.side.removeSideCondition('convertpoliwrath')
			source.side.removeSideCondition('convertporygon')
			source.side.removeSideCondition('convertslowbro')
			source.side.removeSideCondition('converttangela')
			source.side.removeSideCondition('convertvileplume')
			source.side.removeSideCondition('convertzapdos')
				
			//very bad solution incoming
			switch (target.species.name) {
				case 'Moltres':
					source.side.addSideCondition('convertmoltres')
					break;
				case 'Aerodactyl':
					source.side.addSideCondition('convertaerodactyl')
					break;
				case 'Alakazam':
				case 'Hypno':
				case 'Mew':
					source.side.addSideCondition('convertalakazam')
					break;
				case 'Arbok':
				case 'Muk':
					source.side.addSideCondition('convertarbok')
					break;
				case 'Articuno':
					source.side.addSideCondition('convertarticuno')
					break;
				case 'Beedrill':
					source.side.addSideCondition('convertbeedrill')
					break;
				case 'Blastoise':
					source.side.addSideCondition('convertblastoise')
					break;
				case 'Butterfree':
					source.side.addSideCondition('convertbutterfree')
					break;
				case 'Chansey':
				case 'Snorlax':
				case 'Tauros':
					source.side.addSideCondition('convertchansey')
					break;
				case 'Charizard':
					source.side.addSideCondition('convertcharizard')
					break;
				case 'Cloyster':
					source.side.addSideCondition('convertcloyster')
					break;
				case 'Dragonite':
					source.side.addSideCondition('convertdragonite')
					break;
				case 'Dugtrio':
					source.side.addSideCondition('convertdugtrio')
					break;
				case 'Electabuzz':
					source.side.addSideCondition('convertelectabuzz')
					break;
				case 'Electrode':
					source.side.addSideCondition('convertelectrode')
					break;
				case 'Exeggutor':
					source.side.addSideCondition('convertexeggutor')
					break;
				case 'Flareon':
					source.side.addSideCondition('convertflareon')
					break;
				case 'Gengar':
					source.side.addSideCondition('convertgengar')
					break;
				case 'Golbat':
					source.side.addSideCondition('convertgolbat')
					break;
				case 'Golduck':
					source.side.addSideCondition('convertgolduck')
					break;
				case 'Golem':
					source.side.addSideCondition('convertgolem')
					break;
				case 'Gyarados':
					source.side.addSideCondition('convertgyarados')
					break;
				case 'Jynx':
					source.side.addSideCondition('convertjynx')
					break;
				case 'Kabutops':
					source.side.addSideCondition('convertkabutops')
					break;
				case 'Machamp':
					source.side.addSideCondition('convertmachamp')
					break;
				case 'Magmar':
					source.side.addSideCondition('convertmagmar')
					break;
				case 'Magneton':
					source.side.addSideCondition('convertmagneton')
					break;
				case 'Nidoqueen':
					source.side.addSideCondition('convertnidoqueen')
					break;
				case 'Ninetales':
					source.side.addSideCondition('convertninetales')
					break;
				case 'Parasect':
					source.side.addSideCondition('convertparasect')
					break;
				case 'Pidgeot':
					source.side.addSideCondition('convertpidgeot')
					break;
				case 'Pinsir':
					source.side.addSideCondition('convertpinsir')
					break;
				case 'Poliwrath':
					source.side.addSideCondition('convertpoliwrath')
					break;
				case 'Porygon':
					source.side.addSideCondition('convertporygon')
					break;
				case 'Slowbro':
				case 'Starmie':
					source.side.addSideCondition('convertslowbro')
					break;
				case 'Tangela':
					source.side.addSideCondition('converttangela')
					break;
				case 'Vileplume':
					source.side.addSideCondition('convertvileplume')
					break;
				case 'Zapdos':
					source.side.addSideCondition('convertzapdos')
					break;
			}
		},
	},
	convertmoltres: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertmoltres',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Fire') && pokemon.hasType('Flying'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Fire');
					this.add('-start', pokemon, 'typeadd', 'Flying');
					pokemon.setType(['Fire','Flying']);
					}
				}
			},
		},
	},
	convertaerodactyl: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertaerodactyl',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Rock') && pokemon.hasType('Flying'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Rock');
					this.add('-start', pokemon, 'typeadd', 'Flying');
					pokemon.setType(['Rock','Flying']);
					}
				}
			},
		},
	},
	convertalakazam: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertalakazam',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Psychic')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Psychic');
					pokemon.setType('Psychic');
					}
				}
			},
		},
	},
	convertarbok: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertarbok',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Poison')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Rock');
					pokemon.setType('Poison');
					}
				}
			},
		},
	},
	convertarticuno: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertarticuno',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Ice') && pokemon.hasType('Flying'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Ice');
					this.add('-start', pokemon, 'typeadd', 'Flying');
					pokemon.setType(['Ice','Flying']);
					}
				}
			},
		},
	},
	convertbeedrill: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertbeedrill',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Bug') && pokemon.hasType('Poison'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Bug');
					this.add('-start', pokemon, 'typeadd', 'Poison');
					pokemon.setType(['Bug','Poison']);
					}
				}
			},
		},
	},
	convertblastoise: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertblastoise',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Water') && pokemon.hasType('Ground'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Water');
					this.add('-start', pokemon, 'typeadd', 'Ground');
					pokemon.setType(['Water','Ground']);
					}
				}
			},
		},
	},
	convertbutterfree: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertbutterfree',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Bug') && pokemon.hasType('Psychic'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Bug');
					this.add('-start', pokemon, 'typeadd', 'Psychic');
					pokemon.setType(['Bug','Psychic']);
					}
				}
			},
		},
	},
	convertchansey: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertchansey',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Normal')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Normal');
					pokemon.setType('Normal');
					}
				}
			},
		},
	},
	convertcharizard: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertcharizard',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Fire') && pokemon.hasType('Dragon'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Fire');
					this.add('-start', pokemon, 'typeadd', 'Dragon');
					pokemon.setType(['Fire','Dragon']);
					}
				}
			},
		},
	},
	convertcloyster: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertcloyster',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Water') && pokemon.hasType('Ice'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Water');
					this.add('-start', pokemon, 'typeadd', 'Ice');
					pokemon.setType(['Water','Ice']);
					}
				}
			},
		},
	},
	convertdragonite: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertdragonite',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Dragon') && pokemon.hasType('Flying'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Dragon');
					this.add('-start', pokemon, 'typeadd', 'Flying');
					pokemon.setType(['Dragon','Flying']);
					}
				}
			},
		},
	},
	convertdugtrio: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertdugtrio',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Ground')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Ground');
					pokemon.setType('Ground');
					}
				}
			},
		},
	},
	convertelectabuzz: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertelectabuzz',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Electric') && pokemon.hasType('Fighting'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Electric');
					this.add('-start', pokemon, 'typeadd', 'Fighting');
					pokemon.setType(['Electric','Fighting']);
					}
				}
			},
		},
	},
	convertelectrode: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertelectrode',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Electric')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Electric');
					pokemon.setType('Electric');
					}
				}
			},
		},
	},
	convertexeggutor: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertexeggutor',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Grass') && pokemon.hasType('Psychic'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Grass');
					this.add('-start', pokemon, 'typeadd', 'Psychic');
					pokemon.setType(['Grass','Psychic']);
					}
				}
			},
		},
	},
	convertflareon: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertaerodactyl',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Fire')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Fire');
					pokemon.setType('Fire');
					}
				}
			},
		},
	},
	convertgengar: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertgengar',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Ghost') && pokemon.hasType('Poison'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Ghost');
					this.add('-start', pokemon, 'typeadd', 'Poison');
					pokemon.setType(['Ghost','Poison']);
					}
				}
			},
		},
	},
	convertgolbat: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertgolbat',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Poison') && pokemon.hasType('Flying'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Poison');
					this.add('-start', pokemon, 'typeadd', 'Flying');
					pokemon.setType(['Poison','Flying']);
					}
				}
			},
		},
	},
	convertgolduck: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertgolduck',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Water') && pokemon.hasType('Ghost'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Water');
					this.add('-start', pokemon, 'typeadd', 'Ghost');
					pokemon.setType(['Water','Ghost']);
					}
				}
			},
		},
	},
	convertgolem: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertgolem',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Rock') && pokemon.hasType('Ground'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Rock');
					this.add('-start', pokemon, 'typeadd', 'Ground');
					pokemon.setType(['Rock','Ground']);
					}
				}
			},
		},
	},
	convertgyarados: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertgyarados',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Water') && pokemon.hasType('Flying'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Water');
					this.add('-start', pokemon, 'typeadd', 'Flying');
					pokemon.setType(['Water','Flying']);
					}
				}
			},
		},
	},
	convertjynx: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertjynx',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Ice') && pokemon.hasType('Psychic'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Ice');
					this.add('-start', pokemon, 'typeadd', 'Psychic');
					pokemon.setType(['Ice','Psychic']);
					}
				}
			},
		},
	},
	convertkabutops: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertkabutops',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Rock') && pokemon.hasType('Water'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Rock');
					this.add('-start', pokemon, 'typeadd', 'Water');
					pokemon.setType(['Rock','Water']);
					}
				}
			},
		},
	},
	convertmachamp: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertmachamp',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Machamp')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Fighting');
					pokemon.setType('Fighting');
					}
				}
			},
		},
	},
	convertmagmar: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertmagmar',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Fire') && pokemon.hasType('Fighting'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Fire');
					this.add('-start', pokemon, 'typeadd', 'Fighting');
					pokemon.setType(['Fire','Fighting']);
					}
				}
			},
		},
	},
	convertmagneton: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertmagneton',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Electric') && pokemon.hasType('Rock'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Electric');
					this.add('-start', pokemon, 'typeadd', 'Rock');
					pokemon.setType(['Electric','Rock']);
					}
				}
			},
		},
	},
	convertnidoqueen: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertnidoqueen',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Ground') && pokemon.hasType('Poison'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Ground');
					this.add('-start', pokemon, 'typeadd', 'Poison');
					pokemon.setType(['Ground','Poison']);
					}
				}
			},
		},
	},
	convertninetales: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertninetales',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Fire') && pokemon.hasType('Psychic'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Fire');
					this.add('-start', pokemon, 'typeadd', 'Psychic');
					pokemon.setType(['Fire','Psychic']);
					}
				}
			},
		},
	},
	convertparasect: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertparasect',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Bug') && pokemon.hasType('Grass'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Bug');
					this.add('-start', pokemon, 'typeadd', 'Grass');
					pokemon.setType(['Bug','Grass']);
					}
				}
			},
		},
	},
	convertpidgeot: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertpidgeot',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Normal') && pokemon.hasType('Flying'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Normal');
					this.add('-start', pokemon, 'typeadd', 'Flying');
					pokemon.setType(['Normal','Flying']);
					}
				}
			},
		},
	},
	convertpinsir: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertpinsir',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Bug')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Bug');
					pokemon.setType('Bug');
					}
				}
			},
		},
	},
	convertpoliwrath: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertpoliwrath',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Water') && pokemon.hasType('Fighting'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Water');
					this.add('-start', pokemon, 'typeadd', 'Fighting');
					pokemon.setType(['Water','Fighting']);
					}
				}
			},
		},
	},
	convertporygon: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertporygon',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Ghost')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Ghost');
					pokemon.setType('Ghost');
					}
				}
			},
		},
	},
	convertslowbro: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertslowbro',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Water') && pokemon.hasType('Psychic'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Water');
					this.add('-start', pokemon, 'typeadd', 'Psychic');
					pokemon.setType(['Water','Psychic']);
					}
				}
			},
		},
	},
	converttangela: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'converttangela',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.getTypes().join() === 'Grass')) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Grass');
					pokemon.setType('Grass');
					}
				}
			},
		},
	},
	convertvileplume: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertvileplume',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Grass') && pokemon.hasType('Poison'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Grass');
					this.add('-start', pokemon, 'typeadd', 'Poison');
					pokemon.setType(['Grass','Poison']);
					}
				}
			},
		},
	},
	convertzapdos: {
		target: "normal",
		pp: 20,
		accuracy: true,
		category: "Status",
		sideCondition: 'convertzapdos',
		condition: {
			onUpdate(pokemon) {
				if (!(pokemon.hasType('Electric') && pokemon.hasType('Flying'))) {
					if (pokemon.species.baseSpecies === 'Porygon') {
					this.add('-start', pokemon, 'typechange', 'Electric');
					this.add('-start', pokemon, 'typeadd', 'Flying');
					pokemon.setType(['Electric','Flying']);
					}
				}
			},
		},
	},
	disable: {
		accuracy: 100,
		category: "Status",
		id: "disable",
		isViable: true,
		name: "Disable",
		pp: 5,
		priority: 0,
		sideCondition: 'disable',
		target: "normal",
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
	/**	onTryHit(pokemon) {
			let sideCondition = pokemon.side.sideConditions['disable'];
			if (sideCondition) {
				pokemon.side.removeSideCondition('disable');
			}
		},**/
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onHit (target, source, move) {
				if (move.id === 'disable') {
					const moveSlot = this.sample(target.moveSlots.filter(ms => ms.pp > 0));
					this.effectState.move = moveSlot.id; 
					for (const pokemon of target.side.pokemon) {	
						pokemon.timesAttacked = 0
					}
					target.timesAttacked = 500
					if (moveSlot.id === this.effectState.move) {
						this.add('-start', target, 'Disable', moveSlot.move)
					}
					return;
				}
			},
			onBeforeMovePriority: 7,
			onBeforeMove(attacker, defender, move) {
				if (this.effectState.source !== attacker) return;
				if (move.id === this.effectState.move) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				if (pokemon.timesAttacked >= 500) {
					for (const moveSlot of pokemon.moveSlots) {
						if (moveSlot.id === this.effectState.move) {
							pokemon.disableMove(moveSlot.id);
						}
					}
				}
			},
		},
	},
	dreameater: {
		inherit: true,
		category: "Physical",
		basePower: 200,
		drain: [1, 1],
		onTryImmunity(target) {
			return target.status === 'slp' || target.status === 'psn' || target.status === 'tox' || target.hasAbility('comatose');
		},
		type: "Ghost",
	},
	firespin: {
		inherit: true,
		basePower: 30,
		accuracy: 70,
		pp: 5,
		ignoreImmunity: true,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
	},
	glare: {
		inherit: true,
		accuracy: 100,
	},
	gust: {
		inherit: true,
		desc: "Always drops attack 1 stage.",
		shortDesc: "Atk drops -1.",
		basePower: 80,
		pp: 15,
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		type: "Flying",
    },
	haze: {
		desc: "Eliminates any stat stage changes and status from all active Pokemon. Heal both Pokemon by 33%.",
		shortDesc: "Remove stat changes, own status, both heal 33%",
		accuracy: true,
		pp: 15,
		onHit(target, source) {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
				this.heal(Math.floor(pokemon.maxhp * 0.33), pokemon, pokemon);

				if (pokemon === source) {
					// Clears the status from the user
					pokemon.cureStatus();
				}
			}
		},
		target: "self",
	},
	karatechop: {
		inherit: true,
		type: "Fighting",
	},
	leechlife: {
		inherit: true,
		basePower: 60,
		drain: [1, 1],
	},
	leechseed: {
		inherit: true,
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['leechseed'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryImmunity(target) {
			return !target.hasType('Grass');
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
  	meditate: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Meditate",
		pp: 10,
		priority: 0,
		volatileStatus: 'aquaring',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Meditate');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 8);
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	megadrain: {
		inherit: true,
		drain: [1, 1],
	},
	mimic: { 
		inherit: true,
		desc: "Permanently learns a random move from the foe's moveset.",
		shortDesc: "Keeps a random move from foe.",
		onHit(target, source) {
			let moveslot = source.moves.indexOf('mimic');
			if (moveslot < 0) return false;
			let noMimic = source.moves;
			
			let moves = [];
			
			for (const moveSlot of target.moveSlots) {
				let moveid = moveSlot.id;
				if (noMimic.includes(moveid)) continue;
				moves.push(moveid);
			}
			
			let moveid = this.sample(moves);
			if (!moveid) return false;
			let move = this.dex.moves.get(moveid);
			let mimicMove = {
				move: move.name,
				id: move.id,
				pp: source.moveSlots[moveslot].pp,
				maxpp: move.pp * 8 / 5,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			source.moveSlots[moveslot] = mimicMove;
			source.baseMoveSlots[moveslot] = mimicMove;
			this.add('-start', source, 'Mimic', move.name);
		},
	},
	mirrormove: {
		inherit: true,
		desc: "The user uses the last move used by the target. Fails if the target has not made a move, or if the last move used was Mirror Move.",
		onHit(pokemon) {
			let foe = pokemon.side.foe.active[0];
			if (foe.side.lastMove.id === 'mirrormove') {
				return false;
			}
			this.actions.useMove(foe.side.lastMove.id, pokemon);
		},
	},
	poisonsting: {
		inherit: true,
		basePower: 95,
		pp: 15,
		secondary: {
			chance: 30,
			status: 'psn',
		},
  },
	recover: {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Recover",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	rockslide: {
		inherit: true,
		basePower: 85,
	},
	skyattack: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile('twoturnmove')) {
				attacker.removeVolatile('invulnerability');
				return;
			}
			this.add('-prepare', attacker, move.name);
			attacker.addVolatile('twoturnmove', defender);
			this.boost({def:1}, attacker, attacker, move);
			return null;
		},
	},
	softboiled: {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Soft-Boiled",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	solarbeam: {
		inherit: true,
		basePower: 100,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile('twoturnmove')) {
				attacker.removeVolatile('invulnerability');
				return;
			}
			this.add('-prepare', attacker, move.name);
			attacker.addVolatile('twoturnmove', defender);
			this.boost({spa:1}, attacker, attacker, move);
			this.boost({spd:1}, attacker, attacker, move);
			return null;
		},
	},
	submission: {
		inherit: true,
		basePower: 100,
		accuracy: 100,
  },
	thrash: {
		inherit: true,
		category: "Special",
		basePower: 60,
		type: "Dragon",
		secondary: {
			chance: 30,
			status: 'par',
		}
	},
	toxic: {
		inherit: true,
		accuracy: 100,
  },
	transform: {
		inherit: true,
		desc: "The user transforms into the target. The target's current stats, stat stages, types, moves, DVs, species, and sprite are copied. The user's level and HP remain the same and each copied move receives only 5 PP. This move can hit a target using Dig or Fly.",
	},
	triattack: {
		inherit: true,
		accuracy: 100,
		type: "Ghost",
		onHit() {},
		secondary: null,
  },
	twineedle: {
		inherit: true,
		basePower: 40,
		multihit: 2,
		secondary: {
			chance: 20,
			status: 'psn',
		}
	},
	visegrip: {
		inherit: true,
		critRatio: 2,
		type: "Bug",
	},
	wrap: {
		inherit: true,
		basePower: 40,
		accuracy: 85,
		pp: 5,
		ignoreImmunity: true,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
	},
};
