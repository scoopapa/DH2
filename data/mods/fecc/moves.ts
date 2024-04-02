export const Moves: {[moveid: string]: MoveData} = {
	//fake moves
	bigassmagnetterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Big Ass Magnet Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'bigassmagnetterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onFoeTrapPokemon(pokemon) {
				if (!pokemon.isAdjacent(this.effectState.target)) return;
				if (!pokemon.types.includes("Electric")) {
					pokemon.tryTrap(true);
				}
			},
			onFoeMaybeTrapPokemon(pokemon, source) {
				if (!source) source = this.effectState.target;
				if (!source || !pokemon.isAdjacent(source)) return;
				if (!pokemon.types.includes("Electric")) {
					pokemon.maybeTrapped = true;
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Big Ass Magnet Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Big Ass Magnet Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Big Ass Magnet Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	toxicspores: {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Toxic Spores",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'toxicspores',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spores');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spores', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspores');
				} else if (pokemon.hasType('Steel') || pokemon.hasType('Electric') || !pokemon.isGrounded || pokemon.hasItem('heavydutyboots')) return;
				else {
					const r = this.random(30);
					if (r < 11) {
						pokemon.trySetStatus('slp', pokemon);
					} else if (r < 21) {
						pokemon.trySetStatus('par', pokemon);
					} else if (r < 30) {
						pokemon.trySetStatus('psn', pokemon);
					}
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	goodvibe: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Good Vibe",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		sidecondition: 'goodvibe',
		condition: {
			duration: 5,
			onSideStart(side, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-sidestart', side, 'move: Good Vibe', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-sidestart', side, 'move: Good Vibe');
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 6,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Good Vibe');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	badvibe: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bad Vibe",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		sidecondition: 'badvibe',
		condition: {
			duration: 5,
			onSideStart(side, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-sidestart', side, 'move: Bad Vibe', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-sidestart', side, 'move: Bad Vibe');
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 6,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Bad Vibe');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	curseofshocking: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Curse Of Shocking",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		volatileStatus: 'curseofshocking',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Curse Of Shocking', "[silent]");
			},
			onModifyTypePriority: -2,
			onModifyType(move) {
				if (move.id !== 'struggle') {
					this.debug('Curse Of Shocking making move type electric');
					move.type = 'Electric';
				}
			},
		},
		secondary: null,
		target: "allySide",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	gorilla: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gorilla",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		volatileStatus: 'gorilla',
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				this.add('-message', `${pokemon.name} is going apeshit!`)
				if (effect && ['Gorillomorphosis'].includes(effect.name)) {
					this.add('-start', pokemon, 'Gorilla', this.activeMove!.name, '[from] ability: ' + effect.name, '[silent]');
				} else {
					this.add('-start', pokemon, 'Gorilla', '[silent]');
				}
			},
			onRestart(pokemon, source, effect) {
				this.add('-message', `${pokemon.name} is still going apeshit!`)
				if (effect && ['Gorillomorphosis'].includes(effect.name)) {
					this.add('-start', pokemon, 'Gorilla', this.activeMove!.name, '[from] ability: ' + effect.name, '[silent]');
				} else {
					this.add('-start', pokemon, 'Gorilla', '[silent]');
				}
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				this.debug('Gorilla boost');
				return this.chainModify(1.5);
			},
			onAfterMove(pokemon, target, move) {
				if (move.category === 'Physical') {
					pokemon.removeVolatile('gorilla');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Gorilla', '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	moisturizer: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Moisturizer",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		volatileStatus: 'moisturizer',
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				this.add('-message', `${pokemon.name} is moisturizing itself!`)
				this.effectState.layers = 1;
				if (effect && ['Wet Chain'].includes(effect.name)) {
					this.add('-start', pokemon, 'Moisturizer', this.activeMove!.name, '[from] ability: ' + effect.name, '[silent]');
				} else {
					this.add('-start', pokemon, 'Moisturizer', '[silent]');
				}
			},
			onRestart(pokemon, source, effect) {
				if (this.effectState.layers == 16) return;
				this.add('-message', `${pokemon.name} got moistier!`);
				this.effectState.layers ++;
				if (effect && ['Wet Chain'].includes(effect.name)) {
					this.add('-start', pokemon, 'Moisturizer', this.activeMove!.name, '[from] ability: ' + effect.name, '[silent]');
				} else {
					this.add('-start', pokemon, 'Moisturizer', '[silent]');
				}
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.add('-message', `${pokemon.name} is applying skincare!`);
				this.heal(pokemon.baseMaxhp / 16 * this.effectState.layers);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Moisturizer', '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Water",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	
	//vanilla moves
	ragingbull: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Combat':
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Blaze':
			case 'Meowscauros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
		},
	},
	aurawheel: {
		inherit: true,
		shortDesc: "Morform: Normal; Rainy: Water; Sunny: Fire; Snowy: Ice; 100% +1 Spe.",
		onTry(source) {
			if (source.species.baseSpecies === 'Morform') {
				return;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Aura Wheel');
			this.hint("Only a Pokemon whose base species is Morform can use this move.");
			return null;
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
				case 'Morform':
					move.type = 'Normal';
					break;
				case 'Morform-Rainy':
					move.type = 'Water';
					break;
				case 'Morform-Sunny':
					move.type = 'Fire';
					break;
				case 'Morform-Snowy':
					move.type = 'Ice'
					break;
			}
		},
	},
	attract: {
		inherit: true,
		onTryImmunity(target, source) {
			return (source.hasAbility("pansexual")) || (target.gender === 'M' && source.gender === 'F') || (target.gender === 'F' && source.gender === 'M');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (effect.name === 'Pansexual' || source.hasAbility("pansexual")) {
					this.add('-start', pokemon, 'Attract', '[from] ability: Pansexual', '[of] ' + source);
				}  else if (!source.hasAbility("pansexual") && !(pokemon.gender === 'M' && source.gender === 'F') && !(pokemon.gender === 'F' && source.gender === 'M')) {
					this.debug('incompatible gender');
					return false;
				} else if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				} else if (effect.name === 'Destiny Knot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectState.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
	},
	stuffcheeks: {
		inherit: true,
		onHit(pokemon) {
			if (!this.boost({def: 2})) return null;
			pokemon.eatItem(true);
			if (pokemon.hasAbility('swaloseedlol')) {
				pokemon.setItem(pokemon.lastItem);
				pokemon.lastItem = '';
				this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Swaloseed-Lol');
			}
		},
	},
	darkvoid: {
		inherit: true,
		onTry(source, target, move) {
			if (source.species.name === 'Darkerupt' || move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: Dark Void');
			this.hint("Only a Pokemon whose form is Darkerupt can use this move.");
			return null;
		},
	},
	hyperspacefury: {
		inherit: true,
		onTry(source) {
			if (source.species.name === 'Hooporant-Unbound') {
				return;
			}
			this.hint("Only a Pokemon whose form is Hooporant Unbound can use this move.");
			if (source.species.name === 'Hooporant') {
				this.attrLastMove('[still]');
				this.add('-fail', source, 'move: Hyperspace Fury', '[forme]');
				return null;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Hyperspace Fury');
			return null;
		},
	},
	judgment: {
		inherit: true,
		onModifyType(move, pokemon) {
			let type = pokemon.getTypes()[0];
			if (type === "Bird") type = "???";
			if (type === "Stellar") type = pokemon.getTypes(false, true)[0];
			move.type = type;
		},
	},
};