export const Moves: {[moveid: string]: MoveData} = {
	// general moves that might need changes to match other mods' stuff //
	psychoboost: {
		inherit: true,
		isNonstandard: null,
	},
	hyperspacehole: {
		inherit: true,
		isNonstandard: null,
	},
	beakblast: {
		inherit: true,
		isNonstandard: null,
	},
	relicsong: {
		inherit: true,
		isNonstandard: null,
	},
	revelationdance: {
		inherit: true,
		isNonstandard: null,
	},
	
	smackdown: {
		num: 479,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Smack Down",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		volatileStatus: 'smackdown',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false;
				if (
					pokemon.hasType('Flying') || pokemon.hasAbility('levitate') 
					|| pokemon.hasAbility('magneticwaves') || pokemon.hasAbility('leviflame') 
					|| pokemon.hasAbility('levitability') || pokemon.hasAbility('stickyfloat') 
					|| pokemon.hasAbility('etativel') || pokemon.hasAbility('lighthearted') 
					|| pokemon.hasAbility('clearlyfloating') || pokemon.hasAbility('floatguise') 
					|| pokemon.hasAbility('aerialbreak') || pokemon.hasAbility('levimetal') || pokemon.hasAbility('hoverboard') || pokemon.hasAbility('levistatic') || pokemon.hasAbility('lovelessfloat') || pokemon.hasAbility('ghoulaway') || pokemon.hasAbility('spiritascent')
				) applies = true;
				if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] ||
					this.field.getPseudoWeather('gravity')) applies = false;
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				if (!applies) return false;
				this.add('-start', pokemon, 'Smack Down');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					this.add('-start', pokemon, 'Smack Down');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	thousandarrows: {
		num: 614,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Thousand Arrows",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Ground')) {
				if (target.hasType('Flying')) return 0;
			}
		},
		onModifyMove(move, source, target) {
			if (target.hasAbility('magneticwaves') || target.hasAbility('leviflame') 
					|| target.hasAbility('levitability') || target.hasAbility('stickyfloat') 
					|| target.hasAbility('etativel') || target.hasAbility('lighthearted') 
					|| target.hasAbility('clearlyfloating') || target.hasAbility('floatguise') 
					|| target.hasAbility('aerialbreak') || target.hasAbility('levimetal') || target.hasAbility('hoverboard') || target.hasAbility('levistatic') || target.hasAbility('lovelessfloat') || target.hasAbility('ghoulaway') || target.hasAbility('spiritascent')) {
				move.ignoreAbility = true;
			}
		},
		volatileStatus: 'smackdown',
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		zMove: {basePower: 180},
		contestType: "Beautiful",
	},
	mistyterrain: {
		num: 581,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Misty Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'mistyterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable() || source.hasAbility('mystic')) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable() || source.hasAbility('mystic')) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable() && !attacker.hasAbility('mystic')) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	grassyterrain: {
		num: 580,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Grassy Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'grassyterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id) && !attacker.hasAbility('mystic')) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onTerrain(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded, healing through Grassy Terrain.');
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	psychicterrain: {
		num: 678,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Psychic Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'psychicterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.side === source.side || source.hasAbility('mystic')) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.getMove(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
					}
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('psychic terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	hyperspacefury: {
		num: 621,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		isNonstandard: null,
		name: "Hyperspace Fury",
		pp: 5,
		priority: 0,
		flags: {mirror: 1, authentic: 1},
		breaksProtect: true,
		onTry(pokemon) {
			if (pokemon.species.name === 'Hoopa-Unbound' || pokemon.species.name === 'Monferpa-Unbound' || pokemon.species.name === 'Hoopagigas-Unbound') {
				return;
			}
			this.hint("Only a Pokemon whose form is Hoopa Unbound can use this move.");
			if (pokemon.species.name === 'Hoopa') {
				this.add('-fail', pokemon, 'move: Hyperspace Fury', '[forme]');
				return null;
			}
			this.add('-fail', pokemon, 'move: Hyperspace Fury');
			return null;
		},
		self: {
			boosts: {
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	icehammer: {
		inherit: true,
		isNonstandard: null,
	},
	stickyweb: {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sticky Web",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stickyweb',
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				if (pokemon.hasAbility('etativel') || pokemon.hasAbility('lighthearted') || pokemon.hasAbility('clearlyfloating') || pokemon.hasAbility('aerialbreak') || pokemon.hasAbility('levimetal') || pokemon.hasAbility('hoverboard') || pokemon.hasAbility('levistatic') || pokemon.hasAbility('lovelessfloat') || pokemon.hasAbility('ghoulaway') || pokemon.hasAbility('spiritascent')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	spikes: {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'spikes',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				if (pokemon.hasAbility('etativel') || pokemon.hasAbility('lighthearted') || pokemon.hasAbility('clearlyfloating') || pokemon.hasAbility('aerialbreak') || pokemon.hasAbility('levimetal') || pokemon.hasAbility('hoverboard') || pokemon.hasAbility('levistatic') || pokemon.hasAbility('lovelessfloat') || pokemon.hasAbility('ghoulaway') || pokemon.hasAbility('spiritascent')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'toxicspikes',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('etativel') || pokemon.hasAbility('leviflame') || pokemon.hasAbility('magneticwaves') || pokemon.hasAbility('stickyfloat') || pokemon.hasAbility('levitability') || pokemon.hasAbility('feelnopain') || pokemon.hasAbility('lighthearted') || pokemon.hasAbility('clearlyfloating') || pokemon.hasAbility('aerialbreak') || pokemon.hasAbility('levimetal') || pokemon.hasAbility('hoverboard') || pokemon.hasAbility('levistatic') || pokemon.hasAbility('lovelessfloat') || pokemon.hasAbility('ghoulaway') || pokemon.hasAbility('spiritascent')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	dive: {
		num: 291,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dive",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, nonsky: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				attacker.formeChange(forme, move);
			}
			if (attacker.hasAbility('gulprock') && attacker.species.name === 'Cramotricity' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'cramotricitygorging' : 'cramotricitygulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'surf' || move.id === 'whirlpool') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	poisonfang: {
		num: 305,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Poison Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon) {
			if (pokemon.hasAbility('gnawrly')) {
				return this.chainModify(1.5);
			}
		},
		secondary: {
			chance: 50,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	dreameater: {
		num: 138,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Dream Eater",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		onTryImmunity(target) {
			return target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('shadowydreams');
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	hex: {
		num: 506,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose') || target.hasAbility('shadowydreams')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Hex",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	nightmare: {
		num: 171,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Nightmare",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'nightmare',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp' && (!pokemon.hasAbility('comatose') || !pokemon.hasAbility('shadowydreams'))) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	rest: {
		num: 156,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rest",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryMove(pokemon) {
			if (pokemon.hp === pokemon.maxhp) {
				this.add('-fail', pokemon, 'heal');
				return null;
			}
			if (pokemon.status === 'slp' || pokemon.hasAbility('comatose') || pokemon.hasAbility('shadowydreams')) {
				this.add('-fail', pokemon);
				return null;
			}
		},
		onHit(target, source, move) {
			if (!target.setStatus('slp', source, move)) return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	sleeptalk: {
		num: 214,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sleep Talk",
		pp: 10,
		priority: 0,
		flags: {},
		sleepUsable: true,
		onTryHit(pokemon) {
			if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose') && !pokemon.hasAbility('shadowydreams')) return false;
		},
		onHit(pokemon) {
			const noSleepTalk = [
				'assist', 'beakblast', 'belch', 'bide', 'celebrate', 'chatter', 'copycat', 'dynamaxcannon', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'sleeptalk', 'uproar',
			];
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				if (!moveid) continue;
				const move = this.dex.getMove(moveid);
				if (noSleepTalk.includes(moveid) || move.flags['charge'] || (move.isZ && move.basePower !== 1)) {
					continue;
				}
				moves.push(moveid);
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, pokemon);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'crit2'},
		contestType: "Cute",
	},
	snore: {
		num: 173,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Snore",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		sleepUsable: true,
		onTryHit(target, source) {
			if (source.status !== 'slp' && !source.hasAbility('comatose') && !source.hasAbility('shadowydreams')) return false;
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	wakeupslap: {
		num: 358,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('shadowydreams')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		isNonstandard: "Past",
		name: "Wake-Up Slap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target) {
			if (target.status === 'slp') target.cureStatus();
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	
	// DUOMOD START //
	stupidcannon: {
		num: 3010,
		accuracy: 100,
		basePower: 0,
		damage: 5,
		category: "Special",
		shortDesc: "For your own sake, please don't use this.",
		name: "Stupid Cannon",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Bulk Up", target);
		    this.add('-anim', source, "Dragon Dance", target);
		    this.add('-anim', source, "Dragon Dance", target);
		    this.add('-anim', source, "Dragon Dance", target);
		    this.add('-anim', source, "Charge", target);
		    this.add('-anim', source, "Extreme Evoboost", target);
		    this.add('-anim', source, "Luster Purge", target);
		    this.add('-anim', source, "Hyper Beam", target);
		    this.add('-anim', source, "Draco Meteor", target);
		    this.add('-anim', source, "Doom Desire", target);
		    this.add('-anim', source, "Clangorous Soulblaze", target);
		},
		secondary: null,
		multihit: 22,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	watershield: {
		num: 3011,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User's side gains armor; deals 1/16th to attackers using contact moves.",
		name: "Water Shield",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Aqua Ring", target);
		},
		sideCondition: 'watershield',
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'Water Shield');
				this.effectData.layers = 8;
			},
			onDamagingHitOrder: 1,
			onDamagingHit(damage, target, source, move) {
				if (move.flags['contact']) {
					this.damage(source.baseMaxhp / 16, source, target);
					this.effectData.layers--;
				}
				if (this.effectData.layers === 0) {
					const side = target.side;
					this.add('-sideend', side, 'Water Shield');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},		
	skitterout: {
		num: 3008,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "The user switches the target out, then switches out.",
		name: "Skitter Out",
		pp: 1,
		noPPBoosts: true,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Teleport", target);
		},
		forceSwitch: true,
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cute",
	},
	dustknuckles: {
		num: 3009,
		accuracy: 100,
		basePower: 90,
		onHit(target, source, move) {
			if (target.boosts['def'] > 0) {
				this.boost({'def': -target.boosts['def']}, target, source, move);
			}
		},
		category: "Physical",
		shortDesc: "Removes foe's positive Defense boosts.",
		name: "Dust Knuckles",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Close Combat", target);
		},
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Cool", 
	},

	dedefog: {
		num: 3008,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Prevents the target from using Spinning Web or Defog.",
		shortDesc: "Target can't remove hazards.",
		name: "De-Defog",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Block", target);
		},
		volatileStatus: 'dedefog',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Dedefog');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (moveSlot.id === 'defog' || moveSlot.id === 'spinningweb' || moveSlot.id === 'rapidspin') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
				
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	dundaboat: {
		num: 3001,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Paralyzes target or user; can't use if statused.",
		name: "Dundaboat",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Thunderbolt", target);
		},
		onTry(pokemon) {
			if (pokemon.status) {
				this.add('-fail', pokemon, 'move: Dundaboat');
				return null;
			}
		},
		onHit(target, source, move) {
			const result = this.random(2);
			if (result === 0) {
				target.trySetStatus('par', source);
			}
			else {
				if (source.hasType('Electric')) {
					source.setType(source.getTypes(true).map(type => type === "Electric" ? "???" : type));
					this.add('-start', source, 'typechange', source.types.join('/'), '[from] move: Dundaboat');
					source.trySetStatus('par', source);
					source.setType(source.getTypes(true).map(type => type === "???" ? "Electric" : type));
					this.add('-start', source, 'typechange', source.types.join('/'), '[from] move: Dundaboat');
				}
				else {
					source.trySetStatus('par', source);
				}
			}
			},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	neutralair: {
		num: 3005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, abilities become nullified.",
		name: "Neutral Air",
		pp: 5,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Defog", target);
		},
		pseudoWeather: 'neutralair',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('floatstone')) {
					return 8;
				}
				for (const moveSlot of source.moveSlots) {
					if (moveSlot.id !== 'neutralair') {
						return 2;
					}
				}
				return 5;				
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Neutral Air', '[of] ' + source);
				for (const pokemon of this.getAllActive()) {
					pokemon.addVolatile('gastroacid');
				}
			},
			onSwitchIn(pokemon) {
				for (const pokemon of this.getAllActive()) {
					pokemon.addVolatile('gastroacid');
				}
			},
			onRestart(target, source) {
				return false;
			},
			onResidualOrder: 24,
			onEnd() {
				this.add('-fieldend', 'move: Neutral Air');
				for (const pokemon of this.getAllActive()) {
					pokemon.removeVolatile('gastroacid');
				}
			},
		},
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	roulettespin: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Activates the Roulette Wheel an additional time.",
		name: "Roulette Spin",
		pp: 40,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Metronome", target);
		},
		onHit(source) {
		var result: number;
		var pickSide: number;
		for (const allPokemon of this.getAllActive()) {
			if (allPokemon.hasAbility('obtrusive')) {
				return;
			}
		} 
		this.hint("Time for a bonus wheel!");
		result = this.random(50);
	        pickSide = this.random(2);
		if (result === 0) {
			this.hint("Roulette Wheel Result 1 - Fully heal every active Pokemon.");
	            for (const pokemon of this.getAllActive()) {
	                this.heal(pokemon.maxhp, pokemon);
	                pokemon.cureStatus();
	            }
	        } 
	        else if (result === 1) {
			this.hint("Roulette Wheel Result 2 - Greatly increase everyone's highest stat.");
	            for (const pokemon of this.getAllActive()) {
	                let statName = 'atk';
	                let bestStat = 0;
	                let s: StatNameExceptHP;
	                for (s in pokemon.storedStats) {
	                    if (pokemon.storedStats[s] > bestStat) {
	                        statName = s;
	                        bestStat = pokemon.storedStats[s];
	                    }
	                }
	                this.boost({[statName]: 3}, pokemon);
	            }
	        } 

	        else if (result === 2) {
			this.hint("Roulette Wheel Result 3 - Give one Pokemon an omniboost.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
				}
				}
			}
	        } 
	        else if (result === 3) {
			this.hint("Roulette Wheel Result 4 - Set one Pokemon to 1 HP.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.directDamage(target.hp - 1, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.directDamage(target.hp - 1, target);
				}
				}
			}
	        }
	        else if (result === 4) {
			this.hint("Roulette Wheel Result 5 - screw you both");
	            for (const pokemon of this.getAllActive()) {
			this.directDamage(pokemon.hp, pokemon);
		    }
		}
		else if (result === 5) {
			this.hint("Roulette Wheel Result 6 - Set hazards on both sides.");
		    for (const pokemon of this.getAllActive()) {
			this.useMove("Spikes", pokemon);
			this.useMove("Stealth Electric", pokemon);
		    }
		}
		else if (result === 6) {
			this.hint("Roulette Wheel Result 7 - Set a random weather and terrain.");
			const result2 = this.random(3);
			const result3 = this.random(3);
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
					if (target.isActive) {
					if (result2 === 0) {
						this.useMove("Grassy Terrain", target);
					} else if (result2 === 1) {
						this.useMove("Electric Terrain", target);
					} else {
						this.useMove("Misty Terrain", target);
					}
					if (result3 === 0) {
						this.useMove("Sunny Day", target);
					} else if (result3 === 1) {
						this.useMove("Rain Dance", target);
					} else {
						this.useMove("Sandstorm", target);
					}
					}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
					if (target.isActive) {
					if (result2 === 0) {
						this.useMove("Grassy Terrain", target);
					} else if (result2 === 1) {
						this.useMove("Electric Terrain", target);
					} else {
						this.useMove("Misty Terrain", target);
					}
					if (result3 === 0) {
						this.useMove("Sunny Day", target);
					} else if (result3 === 1) {
						this.useMove("Rain Dance", target);
					} else {
						this.useMove("Sandstorm", target);
					}
					}
				}
			}
		}

		else if (result === 7) {
			this.hint("Roulette Wheel Result 8 - lmao");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.directDamage(1, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.directDamage(1, target);
				}
				}
			}
	        }

		else if (result === 8) {
			this.hint("Roulette Wheel Result 9 - Minimize every stat of one Pokemon.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive && target.hasAbility('contrary')) {
					this.boost({atk: 12, def: 12, spa: 12, spd: 12, spe: 12}, target, target, null, true);
				}
				else if (target.isActive) {
					this.boost({atk: -12, def: -12, spa: -12, spd: -12, spe: -12}, target, target, null, true);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive && target.hasAbility('contrary')) {
					this.boost({atk: 12, def: 12, spa: 12, spd: 12, spe: 12}, target, target, null, true);
				}
				else if (target.isActive) {
					this.boost({atk: -12, def: -12, spa: -12, spd: -12, spe: -12}, target, target, null, true);
				}
				}
			}
	   } 

		else if (result === 9) {
			this.hint("Roulette Wheel Result 10 - Forcibly switch every Pokemon.");
			for (const pokemon of this.getAllActive()) {
				pokemon.forceSwitchFlag = true;
			}	
		}

		else if (result === 10) {
			this.hint("Roulette Wheel Result 11 - Make every Pokemon use Conversion 2.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Conversion 2", pokemon);
			}
		}

		else if (result === 11) {
			this.hint("Roulette Wheel Result 12 - Make one Pokemon Transform into the other.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
				}
				}
			}
			
		}

		else if (result === 12) {
			this.hint("Roulette Wheel Result 13 - Make both Pokemon trade stat changes.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Heart Swap", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Heart Swap", target);
				}
				}
			}
		}

		else if (result === 13) {
			this.hint("Roulette Wheel Result 14 - Slightly heal both Pokemon.");
			for (const pokemon of this.getAllActive()) {
				this.heal(pokemon.maxhp / 4, pokemon);
	        	}
	        } 

		else if (result === 14) {
			this.hint("Roulette Wheel Result 15 - heard you guys liked scald");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Scald", pokemon);
			}
		}

		else if (result === 15) {
			this.hint("Roulette Wheel Result 16 - Attempt to Toxic both Pokemon.");
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.side.getSideCondition('safeguard')) { 
					pokemon.trySetStatus('tox', pokemon);
				}
	      }
		}

		else if (result === 16) {
			this.hint("Roulette Wheel Result 17 - Switch both sides' field effects.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Court Change", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Court Change", target);
				}
				}
			}	
		}


		else if (result === 17) {
			this.hint("Roulette Wheel Result 18 - Raise both active Pokemons' attacking stats.");
			for (const pokemon of this.getAllActive()) {
		                this.boost({atk: 2, spa: 2}, pokemon);
			}
	        }

		else if (result === 18) {
			this.hint("Roulette Wheel Result 19 - Make both Pokemon use Camouflage.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Camouflage", pokemon);
			}
		}

		else if (result === 19) {
			this.hint("Roulette Wheel Result 20 - Make both Pokemon swap abilities.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Skill Swap", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Skill Swap", target);
				}
				}
			}	
		}

		else if (result === 20) {
			this.hint("Roulette Wheel Result 21 - wahoo");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Celebrate", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Celebrate", target);
				}
				}
			}	
		}

		else if (result === 21) {
			this.hint("Roulette Wheel Result 22 - Sets Trick Room.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Trick Room", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Trick Room", target);
				}
				}
			}	
		}

		else if (result === 22) {
			this.hint("Roulette Wheel Result 23 - Pocket sand go");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.boost({accuracy: -1}, target);	
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.boost({accuracy: -1}, target);	
				}
				}
			}	
		}

		else if (result === 23) {
			this.hint("Roulette Wheel Result 24 - Removes all active stat changes.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Haze", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Haze", target);
				}
				}
			}	
		}

		else if (result === 24) {
			this.hint("Roulette Wheel Result 25 - Sets Magic Room.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Magic Room", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Magic Room", target);
				}
				}
			}	
		}

		else if (result === 25) {
			this.hint("Roulette Wheel Result 26 - Sets Wonder Room.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Wonder Room", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Wonder Room", target);
				}
				}
			}	
		}

		else if (result === 26) {
			this.hint("Roulette Wheel Result 27 - Averages out the HP of active Pokemon.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Pain Split", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Pain Split", target);
				}
				}
			}	
		}

		else if (result === 27) {
			this.hint("Roulette Wheel Result 28 - Cures all active Pokemons' statuses.");
			for (const pokemon of this.getAllActive()) {
	                	pokemon.cureStatus();
	        	}
	        }

		else if (result === 28) {
			this.hint("Roulette Wheel Result 29 - Sets up Screens for one side.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Reflect", target);
					this.useMove("Light Screen", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Reflect", target);
					this.useMove("Light Screen", target);
				}
				}
			}	
		}			

		else if (result === 29) {
			this.hint("Roulette Wheel Result 30 - Starts a status immunity for both sides.");
			for (const pokemon of this.getAllActive()) {
	                	this.useMove("Safeguard", pokemon);
	        	}
	        }

		else if (result === 30) {
			this.hint("Roulette Wheel Result 31 - Deactivates all abilities that are active within 2 turns.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Neutral Air", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Neutral Air", target);
				}
				}
			}	
		}

		else if (result === 31) {
			this.hint("Roulette Wheel Result 32 - Attempts to Freeze all active Pokemon.");
			for (const pokemon of this.getAllActive()) {
				pokemon.trySetStatus('frz', pokemon);
	        	}
		}

		else if (result === 32) {
			this.hint("Roulette Wheel Result 33 - Switches out one Pokemon.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					target.forceSwitchFlag = true;
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					target.forceSwitchFlag = true;
				}
				}
			}	
		}

		else if (result === 33) {
			this.hint("Roulette Wheel Result 34 - Sets up Aqua Ring for both sides.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Aqua Ring", pokemon);
			}
		}

		else if (result === 34) {
			this.hint("Roulette Wheel Result 35 - One active Pokemon Defogs.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Defog", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Defog", target);
				}
				}
			}
		}

		else if (result === 35) {
			this.hint("Roulette Wheel Result 36 - Both active Pokemon share a type combination.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Reflect Type", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Reflect Type", target);
				}
				}
			}
		}

		else if (result === 36) {
			this.hint("Roulette Wheel Result 37 - glhf");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Sheer Cold", pokemon);
			}
		}

		else if (result === 37) {
			this.hint("Roulette Wheel Result 38 - uh oh");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Octolock", pokemon);
			}
		}

		else if (result === 38) {
			this.hint("Roulette Wheel Result 39 - Both active Pokemon use Metronome.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Metronome", pokemon);
			}
		}
		
		else if (result === 39) {
			this.hint("Roulette Wheel Result 40 - get ready");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
					const oldAbility = target.setAbility('Moody');
					if (oldAbility) {
						this.add('-ability', target, 'Moody', '[from] move: Roulette Spin');
						return;
					}
				}
			}
			if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
					const oldAbility = target.setAbility('Moody');
					if (oldAbility) {
						this.add('-ability', target, 'Moody', '[from] move: Roulette Spin');
						return;
					}
				}
			}
		}
		
		else if (result === 40) {
			this.hint("Roulette Wheel Result 41 - Both active Pokemon swap items.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Trick", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Switcheroo", target);
				}
				}
			}	
		}	
		
		else if (result === 41) {
			this.hint("Roulette Wheel Result 42 - Both active Pokemon trade HP bars.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Sick Hacks", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Sick Hacks", target);
				}
				}
			}
		} 
		
		else if (result === 42) {
			this.hint("Roulette Wheel Result 43 - Both active Pokemon use their first move.");
			for (const pokemon of this.getAllActive()) {
				const frstMove = this.dex.getMove(pokemon.moveSlots[0].id);
				this.useMove(frstMove, pokemon);
			}
		}
			
		else if (result === 43) {
			this.hint("Roulette Wheel Result 44 - One active Pokemon gains a higher crit rate.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Focus Energy", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Focus Energy", target);
				}
				}
			}
		}	
			
		else if (result === 44) {
			this.hint("Roulette Wheel Result 45 - One new spin for each active Pokemon!");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Roulette Spin", pokemon);
			}
		}			
		
		else if (result === 45) {
			this.hint("Roulette Wheel Result 46 - One active Pokemon becomes way faster than the other.");
			for (const pokemon of this.sides[0].active) {
				for (const target of this.sides[1].active) {
					if (pickSide === 0) {
						this.boost({spe: 12}, pokemon, pokemon, null, true);
						this.boost({spe: -12}, target, target, null, true);
					}
					else if (pickSide === 1) {
						this.boost({spe: 12}, target, target, null, true);
						this.boost({spe: -12}, pokemon, pokemon, null, true);
					}
				}
			}
		}			
			
		else if (result === 46) {
			this.hint("Roulette Wheel Result 47 - sussie");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Vote Out", target);
					return false;
					}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Vote Out", target);
					return false;
					}
				}
			}
		}	
			
		else if (result === 47) {
			this.hint("Roulette Wheel Result 48 - Time for some good ol' Mario Kart Wii");
			for (const pokemon of this.sides[0].active) {
				for (const target of this.sides[1].active) {
					if (target.storedStats.spe < pokemon.storedStats.spe) {
						this.useMove("Flame Runner", pokemon);
						const oldAbility = target.setAbility('Slow Start');
						if (oldAbility) {
							this.add('-ability', target, 'Slow Start', '[from] move: Flame Runner', '[silent]');
							if (target.side !== pokemon.side) target.volatileStaleness = 'external';
							return;
						}
					}
					else if (target.storedStats.spe > pokemon.storedStats.spe) {
						this.useMove("Flame Runner", target);
						const oldAbility = pokemon.setAbility('Slow Start');
						if (oldAbility) {
							this.add('-ability', pokemon, 'Slow Start', '[from] move: Flame Runner', '[silent]');
							if (target.side !== pokemon.side) pokemon.volatileStaleness = 'external';
							return;
						}
					}
					else {
						for (const active of this.getAllActive()) {
							this.useMove("Flame Runner", active);
						}
					}
				}
			}
		}
						
		else if (result === 48) {
			this.hint("Roulette Wheel Result 49 - Ad break.");
			this.add('-message', "Hello Duomod v3 enjoyer!");
			this.add('-message', "The fact that you're spending your time on Pokemon Showdown must mean you're really bored!");
			this.add('-message', "Well today's your lucky day! Because I've got just the cure!");
			this.add('-message', "Head on over to DuoM2's YouTube channel, featuring several videos from the one and only DuoM2!");
			this.add('-message', "He's smart, funny, a gamer, handsome, and the best Mewtwo main in South Carolina Smash!");
			this.add('-message', "With 4 hours of content right now and more to come, your boredom will soar off into space!");
			this.add('-message', "Plus, as a special promotional bonus, if you subscribe now, you'll get to say you knew him before it was cool!");
			this.add('-message', "Head on over to DuoM2's YouTube channel for the time of your life! Linked down below!");
			this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
			this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
			this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
		}		
		
		else {
			this.hint("Roulette Wheel Result 50 - THE ULTIMATE EFFECT");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Ultranome", pokemon);
			}
		}
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Cute",
	},

	deeznutsjoke: { 
		num: 669,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Does stuff.",
		name: "Deez Nuts Joke",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Taunt", target);
		},
		volatileStatus: 'deeznutsjoke',
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: Deez Nuts Joke');
		},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Deez Nuts Joke');
	},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
					if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
				}
		},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Deez Nuts Joke', move);
					return false;
				}
			},
		},
		boosts: {
			atk: 3
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	extremebeam: {
		num: 3002,
		accuracy: 99,
		basePower: 250,
		category: "Special",
		desc: "If this move is successful, the user begins to Bide.",
		shortDesc: "User Bides. Priority -6.",
		name: "EXTREME BEAM",
		pp: 5,
		priority: -6,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Photon Geyser", target);
		},
		self: {
			volatileStatus: 'bide',
		},
		condition: {
			duration: 2,
			onLockMove: 'bide',
		},		
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	quadrupleaxel: {
		num: 3006,
		accuracy: 70,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		desc: "Hits three times. Power increases to 40 for the second hit, 60 for the third, and 80 for the fourth. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. The user does not have Skill Link because I'm not doing that.",
		shortDesc: "Hits 4 times. Each hit can miss, but power rises.",
		name: "Quadruple Axel",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Triple Axel", target);
		},
		multihit: 4,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	tearapart: {
		num: 2006,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		shortDesc: "Hits twice. Each hits lowers Def.",
		name: "Tear Apart",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Dual Chop", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		multihit: 2,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	clearbeam: {
		num: 1033.1,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Does not factor type effectiveness.",
		name: "Clear Beam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Mirror Shot", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 0;
			if (type === 'Grass') return 0;
			if (type === 'Fire') return 0;
			if (type === 'Water') return 0;
			if (type === 'Electric') return 0;
			if (type === 'Flying') return 0;
			if (type === 'Ground') return 0;
			if (type === 'Dragon') return 0;
			if (type === 'Fairy') return 0;
			if (type === 'Steel') return 0;
			if (type === 'Bug') return 0;
			if (type === 'Poison') return 0;
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	pitfall: {
		num: 2004,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(1);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 12}, pokemon, pokemon, move);
		},
		category: "Physical",
		shortDesc: "Does 1 damage, maximizes user's Attack if target faints.",
		name: "Pitfall",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Earthquake", target);
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	rancidrush: {
		num: 1026.1,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		shortDesc: "+1 Priority; badly poisons.",
		name: "Rancid Rush",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Toxic", target);
		},
		status: 'tox',
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	spinningweb: {
		num: 3009,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Also removes Water Shield from the user's side, but triples the move's power.",
		shortDesc: "Free user from hazards/bind/Leech Seed.",
		name: "Spinning Web",
		pp: 40,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Savage Spin-Out", target);
		},
		onTryImmunity(target) {
			return !target.hasType('Fire');
		},
		onBasePower(basePower, pokemon, target) {
			const sideConditions = ['watershield'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Spinning Web', '[of] ' + pokemon);
					return this.chainModify(3);
				}
			}
		},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Spinning Web', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'stickyweb', 'stealthrock', 'toxic spikes'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Spinning Web', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'stickyweb', 'stealthrock', 'toxic spikes'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Spinning Web', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	destructiveblow: {
		num: 1008.1,
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		shortDesc: "If the target faints, the user faints.",
		name: "Destructive Blow",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Corkscrew Crash", target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				this.hint("uh oh");
				this.damage(pokemon.baseMaxhp, pokemon, pokemon, move);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	vibrantlight: {
		num: 2008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Next turn, 33% of the user's max HP and all statuses are restored.",
		name: "Vibrant Light",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Geomancy", target);
		},
		slotCondition: 'Vibrant Light',
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectData.hp = source.maxhp / 3;
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectData.hp, target, target);
					target.cureStatus();
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Cute",
	},
/*	dewyflowers: {
		num: 1001.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the user's side every turn; entry hazard.",
		name: "Dewy Flowers",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Ingrain", target);
		},
		sideCondition: 'Dewy Flowers',
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'Dewy Flowers');				
			},
			onResidualOrder: 6,
			onResidual(side) {
				for (const ally of side.active) {
					if (ally.hasItem('heavydutyboots')) return;
					this.heal(ally.baseMaxhp / 16, ally);
				}
			},
		},
		secondary: null,
		target: "allySide",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	}, */
	scorch: {
		num: 3004,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		desc: "Has a 100% chance to burn the target.",
		shortDesc: "100% chance to burn the target.",
		name: "Scorch",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Ember", target);
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
/*	stealthelectric: {
		num: 3006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/40, 1/20, 1/10, 1/5, or 1/2.5 of their maximum HP, rounded down, based on their weakness to the Electric type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Spinning Web or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Factors Electric weakness.",
		name: "Stealth Electric",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Charge Beam", target);
		},
		sideCondition: 'stealthelectric',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Electric');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				if (pokemon.hasType('Ground')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthelectric')), -6, 6);
				if (pokemon.hasItem('lightclay')) {
					 this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 16);
				}
				else {
					 this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Electric",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	}, */
	dirtyscheme: {
		num: 3003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's primary stats by 1 stage. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then raises most stats by 1.",
		name: "Dirty Scheme",
		pp: 5,
		priority: 0,
		flags: {charge: 1, nonsky: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Dragon Dance", source);
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			this.attrLastMove('[still]');
		   this.add('-anim', attacker, "Nasty Plot", attacker);
			this.add('-message', attacker + " is forming a plan...");
			return null;
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Dark",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	flamerunner: {
		num: 1002.1,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "User becomes part Fire.",
		name: "Flame Runner",
		pp:  15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Flame Charge", target);
		},
		self: {
			onHit(pokemon) {
				if (pokemon.hasType('Fire')) return false;
				if (!pokemon.addType('Fire')) return false;
				this.add('-start', pokemon, 'typeadd', 'Fire', '[from] move: Flame Runner');
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	injection: {
		num: 1021.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The target transforms into the user. The target's current stats, stat stages, types, moves, Ability, weight, gender, and sprite are copied. The user's level and HP remain the same and each copied move receives only 5 PP, with a maximum of 5 PP each. This move fails if it hits a substitute, if either the user or the target is already transformed, or if either is behind an Illusion.",
		shortDesc: "Target copies user's stats, moves, types, and Ability.",
		name: "Injection",
		pp: 10,
		priority: -7,
		flags: {mystery: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Poison Sting", target);
		},
		onHit(target, pokemon) {
			if (!target.transformInto(pokemon)) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {effect: 'heal'},
		contestType: "Clever",
	},
	ultranome: {
		num: 118,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultranome",
		pp: 40,
		shortDesc: "Uses Metronome 3 times; not learnable.",
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Metronome", target);
		},
		onHit(pokemon) {
			this.useMove("Metronome", pokemon);
			this.useMove("Metronome", pokemon);
			this.useMove("Metronome", pokemon);
		},
		secondary: null,
		target: "self",
		type: "Dark",
		contestType: "Cute",
	},
	scald2: {
		num: 503,
		accuracy: 100,
		basePower: 5,
		category: "Special",
		name: "Scald 2",
		shortDesc: "30% burn chance; not learnable.",
		pp: 40,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Scald", target);
		},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	gnome: {
		num: 301999,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "G'Nome",
		shortDesc: "Uses Metronome three times if all other moves have been used.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.moveSlots.length < 2) return false; // Last Resort fails unless the user knows at least 2 moves
			let hasLastResort = false; // User must actually have Last Resort for it to succeed
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id === 'gnome') {
					hasLastResort = true;
					continue;
				}
				if (!moveSlot.used) return false;
			}
			return hasLastResort;
		},
		onHit(pokemon) {
			this.useMove("Metronome", pokemon);
			this.useMove("Metronome", pokemon);
			this.useMove("Metronome", pokemon);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	voteout: {
		num: 3020,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Vote Out",
		pp: 1,
		noPPBoosts: true,
		priority: -7,
		flags: {mirror: 1, authentic: 1, mystery: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Acupressure", target);
		},
		onHit (target) {
			target.formeChange('Impsaustor', this.effect, true);
			const ms0 = {
				move: "Knock Off",
				id: "knockoff",
				pp: 32,
				maxpp: 32,
				target: "normal",
				disabled: false,
				used: false,
				virtual: true,
			};
			const ms1 = {
				move: "Recover",
				id: "recover",
				pp: 16,
				maxpp: 16,
				target: "self",
				disabled: false,
				used: false,
				virtual: true,
			};
			const ms2 = {
				move: "Gunk Shot",
				id: "gunkshot",
				pp: 8,
				maxpp: 8,
				target: "normal",
				disabled: false,
				used: false,
				virtual: true,
			};
			const ms3 = {
				move: "Swords Dance",
				id: "swordsdance",
				pp: 32,
				maxpp: 32,
				target: "self",
				disabled: false,
				used: false,
				virtual: true,
			};
			target.moveSlots[0] = ms0;
			target.baseMoveSlots[0] = ms0;
			target.moveSlots[1] = ms1;
			target.baseMoveSlots[1] = ms1;
			target.moveSlots[2] = ms2;
			target.baseMoveSlots[2] = ms2;
			target.moveSlots[3] = ms3;
			target.baseMoveSlots[3] = ms3;
			const oldAbility = target.setAbility('Vent');
				if (oldAbility) {
				this.add('-ability', target, 'Vent', '[from] move: Vote Out', '[silent]');
				target.volatileStaleness = 'external';
				return;
			}
			this.add('-message', target + " was the Impsaustor!");
			this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
			const species = this.dex.getSpecies(target.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
			this.add('-start', target, 'typechange', target.species.types.join('/'), '[silent]');
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	sickhacks: {
		num: 3021,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sick Hacks",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Heart Swap", target);
		},
		onHit(target, source, move) {
			const pokHP = (source.hp / source.maxhp);
			const tarHP = (target.hp / target.maxhp);
			source.sethp(tarHP * source.maxhp);
			this.add('-sethp', source, target.getHealth, '[from] move: Pain Split', '[silent]');
			target.sethp(pokHP * target.maxhp);
			this.add('-sethp', target, target.getHealth, '[from] move: Pain Split', '[silent]');
			this.add('-message', "The Pokemon traded HP bars!");
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
};
