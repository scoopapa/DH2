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
		flags: {nonsky: 1},
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
		flags: {nonsky: 1},
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
			case 'Grenos-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
			this.add('-message', `${move.name}'s type changed to match ${pokemon.species.name}'s!`);
		},
	},
	aurawheel: {
		inherit: true,
		shortDesc: "Type depends on forme. 100% +1 Spe.",
		onTry: true,
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
				case 'Morform':
				case 'Baseball':
					move.type = 'Normal';
					break;
				case 'Morform-Rainy':
				case 'Watermelon':
					move.type = 'Water';
					break;
				case 'Morform-Sunny':
				case 'Basketball':
					move.type = 'Fire';
					break;
				case 'Morform-Snowy':
				case 'Snowball':
					move.type = 'Ice';
					break;
				case 'Football':
					move.type = 'Ground';
					break;
				case 'Soccerball':
					move.type = 'Fighting';
					break;
				case 'Tennisball':
					move.type = 'Flying';
					break;
				case 'Cricketball':
					move.type = 'Bug';
					break;
				case 'Cabbage':
					move.type = 'Grass';
					break;
				case 'Plasmaball':
					move.type = 'Electric';
					break;
				case 'Crystalball':
					move.type = 'Psychic';
					break;
				case '8ball':
					move.type = 'Dark';
					break;
				case 'Gumball':
					move.type = 'Fairy';
					break;
				case 'Discoball':
					move.type = 'Steel';
					break;
				case 'TheMoon':
					move.type = 'Ghost';
					break;
				case 'Rock':
					move.type = 'Rock';
					break;
				case 'Virus':
					move.type = 'Poison';
					break;
				case 'Dragonball':
					move.type = 'Dragon';
					break;
			}
			this.add('-message', `${move.name}'s type changed to match ${pokemon.species.name}'s!`);
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
			const item = pokemon.getItem();
			if (!this.boost({def: 2})) return null;
			pokemon.eatItem(true);
			if (pokemon.hasAbility('swaloseedlol')) {
				pokemon.setItem(item);
				pokemon.lastItem = '';
				this.add('-item', pokemon, item, '[from] ability: Swaloseed-Lol');
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
			this.hint("Only a Pokemon whose form is Hooporant-Unbound can use this move.");
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
			this.add('-message', `${move.name}'s type changed to match ${pokemon.species.name}'s!`);
		},
	},
	terastarstorm: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.species.name === 'Teradoof-Stellar') {
				move.type = 'Stellar';
				if (pokemon.terastallized && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
					move.category = 'Physical';
				}
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.species.name === 'Teradoof-Stellar') {
				move.target = 'allAdjacentFoes';
			}
		},
	},
	rapidspin: {
		inherit: true,
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'toxicspores', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'toxicspores', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
	},
	defog: {
		inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'toxicspores', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},
	courtchange: {
		inherit: true,
		onHitField(target, source) {
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'toxicspores', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
			];
			let success = false;
			if (this.gameType === "freeforall") {
				// random integer from 1-3 inclusive
				const offset = this.random(3) + 1;
				// the list of all sides in counterclockwise order
				const sides = [this.sides[0], this.sides[2]!, this.sides[1], this.sides[3]!];
				const temp: {[k: number]: typeof source.side.sideConditions} = {0: {}, 1: {}, 2: {}, 3: {}};
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if (!sideConditions.includes(id)) continue;
						temp[side.n][id] = side.sideConditions[id];
						delete side.sideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						this.add('-sideend', side, effectName, '[silent]');
						success = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n];
					const targetSide = sides[(i + offset) % 4]; // the next side in rotation
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						let layers = sourceSideConditions[id].layers || 1;
						for (; layers > 0; layers--) this.add('-sidestart', targetSide, effectName, '[silent]');
					}
				}
			} else {
				const sourceSideConditions = source.side.sideConditions;
				const targetSideConditions = source.side.foe.sideConditions;
				const sourceTemp: typeof sourceSideConditions = {};
				const targetTemp: typeof targetSideConditions = {};
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue;
					sourceTemp[id] = sourceSideConditions[id];
					delete sourceSideConditions[id];
					success = true;
				}
				for (const id in targetSideConditions) {
					if (!sideConditions.includes(id)) continue;
					targetTemp[id] = targetSideConditions[id];
					delete targetSideConditions[id];
					success = true;
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id];
				}
				for (const id in targetTemp) {
					sourceSideConditions[id] = targetTemp[id];
				}
				this.add('-swapsideconditions');
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},
};