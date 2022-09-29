export const Moves: {[moveid: string]: MoveData} = {
	armthrust: {
		inherit: true,
		basePower: 25,
	},
	attackorder: {
		inherit: true,
		shortDesc: "High critical hit ratio. Extra hit at 0.1x power for each ally.",
		onModifyMove(move, pokemon) {
			move.allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
			move.multihit = move.allies.length;
			move.multihitType = 'attackorder';
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'attackorder' && move.hit > 1) return this.chainModify(0.2);
		},
	},
	blastburn: {
		inherit: true,
		onAfterMove(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				delete move.flags['recharge'];
			}
			else if (target || !target.fainted || !target.hp <= 0) {
				pokemon.addVolatile('mustrecharge');
			}
		},
		self: null,
		shortDesc: "Can't move next turn if target or sub is not KOed.",
	},
	brickbreak: {
		inherit: true,
		basePower: 85,
	},
	burnup: {
		inherit: true,
		shortDesc: "Fire-type removed 'til turn ends. User must be Fire.",
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Fire')) return;
			this.add('-fail', pokemon, 'move: Burn Up');
			this.attrLastMove('[still]');
			return null;
		},
		self: {
			volatileStatus: 'burnup',
		},
		condition: {
			duration: 1,
			onResidualOrder: 20,
			onStart(target) {
				this.add('-singleturn', target, 'move: Burn Up');
			},
			onTypePriority: -1,
			onType(types, pokemon) {
				this.effectData.typeWas = types;
				return types.filter(type => type !== 'Fire');
			},
		},
	},
	crushgrip: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			return Math.floor(Math.floor((200 * (100 * Math.floor(target.hp * 4096 / target.maxhp)) + 2048 - 1) / 4096) / 100) || 1;
		},
	},
	curse: {
		num: 174,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Curses if Ghost, else -1 Spe, +1 Atk, +2 Def.",
		isViable: true,
		name: "Curse",
		pp: 10,
		priority: 0,
		flags: {},
		volatileStatus: 'curse',
		onModifyMove(move, source, target) {
			if (!source.hasType('Ghost')) {
				move.target = move.nonGhostTarget as MoveTarget;
			}
		},
		onTryHit(target, source, move) {
			if (!source.hasType('Ghost')) {
				delete move.volatileStatus;
				move.self = {boosts: {spe: -1, atk: 1, def: 2}};
			} else if (move.volatileStatus && target.volatiles['curse'] || (target.hasType('Normal') || target.hasType('Ghost') || target.volatiles['protect'] || target.volatiles['spikyshield'] || target.volatiles['banefulbunker'])) {
				return false;
			}
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Curse');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.effectData.source.side.active[pokemon.volatiles['curse'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to curse');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryImmunity(target) {
			return (!target.hasType('Normal') || !target.hasType('Ghost'));
		},
		secondary: null,
		target: "randomNormal",
		nonGhostTarget: "self",
		type: "Ghost",
	},
	defendorder: {
		inherit: true,
		shortDesc: "Protects from moves. User: +2 Def and SpD.",
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'protect',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		boosts: {
			def: 2,
			spd: 2,
		},
	},
	defog: {
		inherit: true,
		shortDesc: "-1 evasion; clears terrain, weather and hazards on both sides.",
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'raindance', 'sunnyday', 'sandstorm', 'hail',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			this.field.clearWeather();
			return success;
		},
		inherit: true,
	},
	doublehit: {
		inherit: true,
		accuracy: 95,
		basePower: 45,
		pp: 15,
	},
	doublekick: {
		inherit: true,
		accuracy: 95,
		basePower: 45,
		pp: 15,
	},
	drainpunch: {
		inherit: true,
		basePower: 85,
	},
	dragonclaw: {
		inherit: true,
		basePower: 85,
	},
	dualchop: {
		inherit: true,
		accuracy: 95,
		basePower: 45,
	},
	dualwingbeat: {
		inherit: true,
		accuracy: 95,
		basePower: 45,
		pp: 15,
	},
	earthquake: {
		inherit: true,
		shortDesc: "10% chance to confuse the target.",
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
	},
	electricterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				else if (source?.hasAbility('electricsurge')) {
					return 0;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify(1.1);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
	facade: {
		inherit: true,
		basePower: 65,
		shortDesc: "Power doubles if user is statused.",
		onBasePower(basePower, pokemon) {
			if (pokemon.status) {
				return this.chainModify(2);
			}
		},
	},
	firefang: {
		inherit: true,
		basePower: 70,
	},
	firepunch: {
		inherit: true,
		basePower: 85,
	},
	freezedry: {
		inherit: true,
		basePower: 60,
		shortDesc: "10% chance to freeze. Super effective on Water.",
		pp: 15,
		secondary: {
			chance: 10,
			status: 'frz',
		},
	},
	frenzyplant: {
		inherit: true,
		onAfterMove(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				delete move.flags['recharge'];
			}
			else if (target || !target.fainted || !target.hp <= 0) {
				pokemon.addVolatile('mustrecharge');
			}
		},
		self: null,
		shortDesc: "Can't move next turn if target or sub is not KOed.",
	},
	geargrind: {
		inherit: true,
		accuracy: 95,
		basePower: 45,
		pp: 15,
	},
	gigaimpact: {
		inherit: true,
		onAfterMove(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				delete move.flags['recharge'];
			}
			else if (target || !target.fainted || !target.hp <= 0) {
				pokemon.addVolatile('mustrecharge');
			}
		},
		self: null,
		shortDesc: "Can't move next turn if target or sub is not KOed.",
	},
	grassyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				else if (source?.hasAbility('grassysurge')) {
					return 0;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id)) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify(1.1);
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
	},
	hammerarm: {
		inherit: true,
		basePower: 120,
		pp: 5,
	},
	healorder: {
		inherit: true,
		shortDesc: "Heals the user by 75% of its max HP and heals its status.",
		heal: [3, 4],
		onHit(pokemon) {
			pokemon.cureStatus();
		},
	},
	hydrocannon: {
		inherit: true,
		onAfterMove(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				delete move.flags['recharge'];
			}
			else if (target || !target.fainted || !target.hp <= 0) {
				pokemon.addVolatile('mustrecharge');
			}
		},
		self: null,
		shortDesc: "Can't move next turn if target or sub is not KOed.",
	},
	hyperbeam: {
		inherit: true,
		onAfterMove(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				delete move.flags['recharge'];
			}
			else if (target || !target.fainted || !target.hp <= 0) {
				pokemon.addVolatile('mustrecharge');
			}
		},
		self: null,
		shortDesc: "Can't move next turn if target or sub is not KOed.",
	},
	icefang: {
		inherit: true,
		basePower: 75,
	},
	icepunch: {
		inherit: true,
		basePower: 85,
	},
	iciclecrash: {
		inherit: true,
		accuracy: 80,
		basePower: 100,
	},
	junglehealing: {
		inherit: true,
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.33));
			return pokemon.cureStatus() || success;
		},
		shortDesc: "User and allies: healed 1/3 max HP, status cured.",
	},
	knockoff: {
		inherit: true,
		basePower: 50,
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.2);
			}
		},
		shortDesc: "1.2x damage if foe holds an item. Removes item.",
	},
	lavaplume: {
		inherit: true,
		basePower: 60,
		shortDesc: "10% chance to burn. Super effective on Water.",
		pp: 15,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
	},
	lifedew: {
		inherit: true,
		heal: [1, 3],
		flags: {heal: 1, authentic: 1, mystery: 1},
		onHit(pokemon) {
			pokemon.cureStatus();
		},
		shortDesc: "User and allies: healed 1/3 max HP, status cured.",
	},
	lusterpurge: {
		inherit: true,
		basePower: 95,
	},
	mistball: {
		inherit: true,
		basePower: 95,
	},
	mistyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				else if (source?.hasAbility('mistysurge')) {
					return 0;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
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
	},
	psychicterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				else if (source?.hasAbility('psychicsurge')) {
					return 0;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.side === source.side) return;
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
					return this.chainModify(1.1);
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
	},
	rockslide: {
		inherit: true,
		basePower: 85,
	},
	rockwrecker: {
		inherit: true,
		onAfterMove(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				delete move.flags['recharge'];
			}
			else if (target || !target.fainted || !target.hp <= 0) {
				pokemon.addVolatile('mustrecharge');
			}
		},
		self: null,
		shortDesc: "Can't move next turn if target or sub is not KOed.",
	},
	scald: {
		inherit: true,
		basePower: 60,
		shortDesc: "10% chance to burn. Super effective on Ice.",
		pp: 15,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ice') return 1;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
	},
	scorchingsands: {
		inherit: true,
		basePower: 60,
		shortDesc: "10% chance to burn. Super effective on Ice.",
		pp: 15,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ice') return 1;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
	},
	shadowpunch: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		shortDesc: "The attacker ignores substitutes and foe's Reflect/Light Screen/Safeguard/Mist/Aurora Veil.",
		onModifyMove(move) {
			move.infiltrates = true;
		},
	},
	skittersmack: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		shortDesc: "100% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	spikes: {
		inherit: true,
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
				if (!pokemon.hasItem('heavydutyboots')) {
					const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
					this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
				}
				if (pokemon.hasItem('heavydutyboots')) {
					const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
					this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 48);
				}
			},
		},
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.hasItem('heavydutyboots')) {
					const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
				if (pokemon.hasItem('heavydutyboots')) {
					const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 16);
				}
			},
		},
	},
	substitute: {
		inherit: true,
		onHit(target) {
			if (target.hasAbility('magicguard')) return;
			this.directDamage(target.maxhp / 4);
		},
	},
	suckerpunch: {
		inherit: true,
		shortDesc: "Usually goes first. Fails if target is not attacking and -1/4 HP for the user.",
		basePower: 80,
		priority: 3,
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				this.add('-fail', source);
				this.damage(source.baseMaxhp / 4);
				this.attrLastMove('[still]');
				return null;
			}
		},
	},
	surgingstrikes: {
		inherit: true,
		basePower: 20,
	},
	teatime: {
		num: 752,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Activates target's ability for itself. Heals 25% of its max HP.",
		name: "Teatime",
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
		onHitField() {},
		/*onHit(target, source) {
			const targetAbility = target.getAbility();
			const sourceAbility = source.getAbility();
			if (sourceAbility !== targetAbility) {
				this.add('-ability', source, targetAbility, '[from] move: Teatime');
				source.setAbility(targetAbility);
			}
			source.setAbility(sourceAbility);
			this.heal(source.baseMaxhp / 4);
		},*/
		/*onHit(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (pokemon.getAbility() === target.getAbility()) return;
				pokemon.addVolatile('teatime');
				this.heal(pokemon.baseMaxhp / 4);
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Teatime');
			},
			onUpdate(pokemon) {
				for (const target of pokemon.side.foe.active) {
					const sourceAbility = pokemon.getAbility();
					const targetAbility = target.getAbility();
					this.singleEvent('Start', targetAbility, pokemon.abilityData, pokemon);
				}
			},
		},*/
		onHit(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (pokemon.getAbility() === target.getAbility()) return;
				pokemon.addVolatile('teatime');
				this.heal(pokemon.baseMaxhp / 4);
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Teatime');
				for (const target of pokemon.side.foe.active) {
					const ogability = pokemon.ability;
					const oldAbility = pokemon.setAbility(target.ability);
					if (oldAbility) {
						this.add('-ability', pokemon, pokemon.getAbility().name, '[from] move: Teatime', '[of] ' + target);
						return;
					}
					pokemon.setAbility(ogability);
					return false;
				}
			},
			/*onPreStart(pokemon) {
				
			}*/
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	thunderfang: {
		inherit: true,
		basePower: 75,
	},
	thunderpunch: {
		inherit: true,
		basePower: 85,
	},
	toxicspikes: {
		inherit: true,
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
				} else if (pokemon.hasType('Steel')) {
					return;
				} else if (this.effectData.layers >= 2 && !pokemon.hasItem('heavydutyboots')) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else if ((this.effectData.layers >= 2 && pokemon.hasItem('heavydutyboots')) || 
					(this.effectData.layers = 1 && !pokemon.hasItem('heavydutyboots'))) {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	tripleaxel: {
		inherit: true,
		shortDesc: "Hits 3 times. Each hit can miss, but power rises. +1 Spe, then Def, then Atk.",
		accuracy: 80,
		basePower: 15,
		self: {
			onHit(target, source, move) {
				if (move.hit === 1) {
					this.boost({spe: 1}, source);
				}
				else if (move.hit === 2) {
					this.boost({def: 1}, source);
				}
				else if (move.hit === 3) {
					this.boost({atk: 1}, source);
				}
			},
		},
	},
	triplekick: {
		inherit: true,
		shortDesc: "Hits 3 times. Each hit can miss, but power rises. +1 Spe, then Def, then Atk.",
		accuracy: 80,
		basePower: 15,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		self: {
			onHit(target, source, move) {
				if (move.hit === 1) {
					this.boost({spe: 1}, source);
				}
				else if (move.hit === 2) {
					this.boost({def: 1}, source);
				}
				else {
					this.boost({atk: 1}, source);
				}
			},
		},
	},
	twineedle: {
		inherit: true,
		shortDesc: "Hits 2 times in one turn.",
		accuracy: 95,
		basePower: 45,
		pp: 15,
		secondary: null,
	},
	twister: {
		inherit: true,
		shortDesc: "30% chance to confuse target. Can't miss in Delta Stream.",
		accuracy: 70,
		basePower: 120,
		pp: 10,
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
	},
	watershuriken: {
		inherit: true,
		basePower: 25,
		category: "Physical",
	},
	wickedblow: {
		inherit: true,
		basePower: 60,
	},
	wildcharge: {
		inherit: true,
		basePower: 120,
		shortDesc: "Has 33% recoil.",
		recoil: [33, 100],
	},
	
	storyline: {
		num: -1,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Story Line",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'storyline',
				source: source,
				moveData: {
					id: 'storyline',
					name: "Story Line",
					accuracy: 100,
					basePower: 80,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Ghost',
				},
			});
			this.add('-start', source, 'move: Story Line');
			return null;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Future Sight", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	
	//PLA
	ragingfury: {
		num: -1001,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		name: "Raging Fury",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "Fire",
		contestType: "Cool",
	},
	chloroblast: {
		num: -1002,
		accuracy: 95,
		basePower: 140,
		category: "Special",
		shortDesc: "User loses 50% max HP.",
		name: "Chloroblast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bloom Doom", target);
		},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Steel Beam'), true);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	infernalparade: {
		num: -1003,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Power doubles if the target has a status ailment; 30% chance to burn.",
		name: "Infernal Parade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Will-o-Wisp", target);
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	barbbarrage: {
		shortDesc: "Power doubles if the target has a status ailment; 30% chance to poison.",
		num: -1004,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Barb Barrage",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Sting", target);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMove: {basePower: 160},
	},
	direclaw: {
		shortDesc: "50% chance to paralyze or poison or sleep target. High critical hit ratio.",
		num: -1005,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Dire Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		critRatio: 2,
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
		target: "normal",
		type: "Poison",
	},
	ceaselessedge: {
		shortDesc: "Sets Spikes after damage. High critical hit ratio.",
		num: -1006,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Ceaseless Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		critRatio: 2,
		sideCondition: 'spikes',
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
	},
	victorydance: {
		shortDesc: "Raises the user's Attack by 2 and Defense by 1.",
		num: -1007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Victory Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", target);
		},
		boosts: {
			atk: 2,
			def: 1,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
	},
	wavecrash: {
		shortDesc: "Usually goes first. Has 33% recoil.",
		num: -1008,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Wave Crash",
		pp: 10,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Waterfall", target);
		},
		recoil: [1, 3],
		secondary: null,
		target: "normal",
		type: "Water",
	},
	bittermalice: {
		shortDesc: "Power doubles if the target has a status ailment; 30% chance of freeze.",
		num: -1009,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Bitter Malice",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Snarl", target);
		},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "normal",
		type: "Ghost",
	},
	esperwing: {
		shortDesc: "Usually goes first. High critical hit ratio.",
		num: -1010,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Esper Wing",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aeroblast", target);
		},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	shelter: {
		shortDesc: "Raises the user's Defense & Sp. Def by 1. Recovers 1/16 max HP per turn.",
		num: -1011,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shelter",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'shelter',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baneful Bunker", target);
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Shelter');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
		},
		boosts: {
			def: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
	mountaingale: {
		shortDesc: "30% chance to make the target flinch.",
		num: -1011,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		name: "Mountain Gale",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glacial Lance", target);
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ice",
	},
	triplearrows: {
		shortDesc: "Lowers target's Defense by 1. Raises the user's critical hit ratio by 2.",
		num: -1012,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Triple Arrows",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunderous Kick", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		self: {
			volatileStatus: 'focusenergy',
		},
		target: "normal",
		type: "Fighting",
	},
	psyshieldbash: {
		shortDesc: "100% chance to raise the user's Defense by 1.",
		num: -1013,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Psyshield Bash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zen Headbutt", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
	stoneaxe: {
		shortDesc: "Sets Stealth Rock after damage. High critical hit ratio.",
		num: -1014,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stone Edge", target);
		},
		critRatio: 2,
		sideCondition: 'stealthrock',
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
	},
	headlongrush: {
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		num: -1015,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Headlong Rush",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tectonic Rage", target);
		},
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	springtidestorm: {
		shortDesc: "10% chance to raise all stats by 1 (not acc/eva).",
		num: -1016,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Springtide Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fairy Wind", target);
		},
		onTry(pokemon) {
			if (pokemon.species.baseSpecies === 'Enamorus') {
				return;
			}
			this.hint("Only a Pokemon whose form is Enamorus or Enamorus-Therian can use this move.");
			this.add('-fail', pokemon, 'move: Springtide Storm');
			return null;
		},
		onModifyMove(move, pokemon) {
			move.secondaries = [];
			if (pokemon.species.name === 'Enamorus-Therian') {
				move.secondaries.push({
					chance: 30,
					boosts: {
						atk: -1,
						def: -1,
						spa: -1,
						spd: -1,
						spe: -1,
					},
				});
			} else {
				move.secondaries.push({
					chance: 10,
					self: {
						boosts: {
							atk: 1,
							def: 1,
							spa: 1,
							spd: 1,
							spe: 1,
						},
					},
				});
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	powershift: {
		shortDesc: "Switches user's Attack with Defense and Sp. Atk with Sp. Def.",
		num: -1017,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Power Shift",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Topsy-Turvy", target);
		},
		volatileStatus: 'powershift',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Power Shift');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onCopy(pokemon) {
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Power Shift');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onRestart(pokemon) {
				pokemon.removeVolatile('Power Shift');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	mysticalpower: {
		shortDesc: "100% chance to raise the user's most proficient stat by 1.",
		num: -1018,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Mystical Power",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shattered Psyche", target);
		},
		onModifyMove(move, pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in pokemon.storedStats) {
				if (pokemon.storedStats[s] > bestStat) {
					statName = s;
					bestStat = pokemon.storedStats[s];
				}
			}
			if (statName === 'spe') move.self = {boosts: {spe: 1}};
			else if (statName === 'spd') move.self = {boosts: {spd: 1}};
			else if (statName === 'spa') move.self = {boosts: {spa: 1}};
			else if (statName === 'def') move.self = {boosts: {def: 1}};
			else move.self = {boosts: {atk: 1}};
		},
		target: "normal",
		type: "Psychic",
	},
	bleakwindstorm: {
		shortDesc: "30% chance to freeze target. Can't miss in rain.",
		num: -1019,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Bleakwind Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "any",
		type: "Flying",
	},
	wildboltstorm: {
		shortDesc: "30% chance to paralyze target. Can't miss in rain.",
		num: -1020,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Wildbolt Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
	},
	sandsearstorm: {
		shortDesc: "30% chance to burn target. Can't miss in sandstorm.",
		num: -1021,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Sandsear Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scorching Sands", target);
		},
		onModifyMove(move) {
			if (this.field.isWeather('sandstorm')) move.accuracy = true;
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ground",
	},
	lunarblessing: {
		shortDesc: "User cures its status and recovers 1/16 max HP per turn.",
		num: -1022,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lunar Blessing",
		pp: 10,
		priority: 0,
		flags: {heal: 1, authentic: 1, mystery: 1},
		volatileStatus: 'lunarblessing',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", target);
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Lunar Blessing');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
		},
		onHit(pokemon) {
			pokemon.cureStatus();
		},
		secondary: null,
		target: "allies",
		type: "Psychic",
	},
	takeheart: {
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1. User cures its status.",
		num: -1023,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Take Heart",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", target);
		},
		onHit(pokemon) {
			pokemon.cureStatus();
		},
		boosts: {
			spa: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Water",
	},
	
	//Roovnen
	exoskelett: {
		num: 827,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's Defense by 1 and heals the user by 25% of its max HP.",
		name: "Exoskelett",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 3],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Defend Order", target);
			this.add('-anim', source, "Heal Order", target);
		},
		boosts: {
			def: 1,
		},
		secondary: null,
		target: "self",
		type: "Bug",
	},
	darknight: {
		num: 828,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 4 turns, Dark moves do double damage.",
		name: "Dark Night",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Daze", target);
		},
		sideCondition: 'darknight',
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 6;
				}
				return 4;
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Dark Night');
			},
			onAnyBasePowerPriority: 20,
			onAnyBasePower(basePower, source, target, move) {
				if (target === source || move.category === 'Status' || move.type !== 'Dark') return;
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd(side) {
				this.add('-sideend', side, 'move: Dark Night');
			},
		},
		secondary: null,
		target: "all",
		type: "Flying",
	},
	dragonmight: {
		num: 829,
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hasType('Dragon')) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "This move will ignore type interactions, but Dragon-types keep STAB.",
		name: "Dragon Might",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			move.type = '???';
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rush", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	floatingbolt: {
		num: 830,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "For the next turn, the user has immunity to Ground.",
		name: "Floating Bolt",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, gravity: 1, protect: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rising Voltage", target);
		},
		self: {
			volatileStatus: 'floatingbolt',
		},
		condition: {
			duration: 2,
			onStart(target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Floating Bolt');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'Floating Bolt');
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	cuddling: {
		num: 831,
		accuracy: 80,
		basePower: 80,
		category: "Special",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "Cuddling",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Play Rough", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	boxtechnique: {
		num: 832,
		accuracy: true,
		basePower: 80,
		category: "Physical",
		shortDesc: "Protects from moves. User's defense lowers by 2 stages.",
		name: "Box Technique",
		pp: 20,
		priority: 0,
		stallingMove: true,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Box Technique');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Box Technique');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		self: {
			volatileStatus: 'protect',
			boosts: {
				def: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	firework: {
		num: 833,
		accuracy: 70,
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts('accuracy');
		},
		category: "Special",
		shortDesc: "+ 30 power and accuracy for each of the user's Accuracy boosts. Raises Accuracy.",
		name: "Firework",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onSourceModifyAccuracy(pokemon, accuracy) {
			return accuracy + 20 * pokemon.positiveBoosts('accuracy');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overheat", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					accuracy: 1,
				},
			},
		},
		target: "normal",
		type: "Fire",
	},
	soaringassault: {
		num: 834,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (target.isGrounded()) {
				this.debug('Soaring Assault damage boost');
				return move.basePower * 2;
			}
			this.debug('Soaring Assault NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if the target is airbone.",
		name: "Soaring Assault",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fly", target);
			this.add('-anim', source, "Brave Bird", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	traumatize: {
		num: 835,
		accuracy: 100,
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) return move.basePower * 0.5;
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Inflicts Nightmare to sleeping opponents, but has halved power.",
		name: "Traumatize",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			if (target.status === 'slp') {
				target.addVolatile('nightmare');
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Shade", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	deeproots: {
		num: 836,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		shortDesc: "Traps user.",
		name: "Deep Roots",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ingrain", target);
			this.add('-anim', source, "Knock Off", target);
		},
		self: {
			volatileStatus: 'deeproots',
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Deep Roots');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	dustdevil: {
		num: 837,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		shortDesc: "30% chance to confuse. Can't miss in sandstorm.",
		name: "Dust Devil",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move) {
			if (this.field.isWeather('sandstorm')) move.accuracy = true;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sand Tomb", target);
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "Ground",
	},
	freezer: {
		num: 838,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		shortDesc: "Freezes the target.",
		name: "Freezer",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Freeze-Dry", target);
		},
		status: 'frz',
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	speciality: {
		num: 839,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "This Pokemon's highest stat is raised by 3 stages.",
		name: "Speciality",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		onHit(source) {
			for (const pokemon of source.side.active) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatIDExceptHP;
				for (s in pokemon.storedStats) {
					if (pokemon.storedStats[s] > bestStat) {
						statName = s;
						bestStat = pokemon.storedStats[s];
					}
				}
				this.boost({[statName]: 3}, pokemon);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acupressure", target);
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	venom: {
		num: 840,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Steel- and Water-type Pokemon loose their typing.",
		name: "Venom",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		ignoreImmunity: {'Poison': true},
		onHit(target) {
			if (target.hasType('Steel')) {
				target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
				this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: Venom');
			}
			if (target.hasType('Water')) {
				target.setType(target.getTypes(true).map(type => type === "Water" ? "???" : type));
				this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: Venom');
			}
			if (target.hasType('Water') && target.hasType('Steel')) {
				target.setType(target.getTypes(true).map(type => type === "Water" ? "???" : type));
				target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
				this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: Venom');
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Venom Drench", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	mindcontrol: {
		num: 841,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Inflicts Torment on the target.",
		name: "Mind Control",
		volatileStatus: 'torment',
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nasty Plot", target);
			this.add('-anim', source, "Psychic", target);
		},
		target: "normal",
		type: "Psychic",
	},
	bonecrush: {
		num: 842,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		name: "Bone Crush",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
	},
	steelbullet: {
		num: 844,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		shortDesc: "Hits 2-5 times in one turn.",
		name: "Steel Bullet",
		pp: 20,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Steel Beam", target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	saltwater: {
		num: 845,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, Pokemon get damaged for draining HP for as much as they would heal.",
		name: "Salt Water",
		pp: 20,
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'saltwater',
		condition: {
			duration: 5,
			onStart(side, source) {
				this.add('-fieldstart', 'move: Salt Water', '[of] ' + source);
			},
			onTryHeal(damage, target, source, effect) {
				this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
				const canOoze = ['drain', 'leechseed', 'strengthsap'];
				if (canOoze.includes(effect.id)) {
					this.damage(damage);
					return 0;
				}
			},
			onResidualOrder: 21,
			onEnd() {
				this.add('-fieldend', 'move: Salt Water');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Water Sport", target);
		},
		secondary: null,
		target: "all",
		type: "Water",
	},
	drawnline: {
		num: 846,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		shortDesc: "Prevents the target from switching out.",
		name: "Drawn Line",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sketch", target);
			this.add('-anim', source, "Wrap", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Fairy",
	},
	plottwist: {
		num: 847,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Inverts the target's stat stages.",
		name: "Plot Twist",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onHit(target) {
			let success = false;
			let i: BoostName;
			for (i in target.boosts) {
				if (target.boosts[i] === 0) continue;
				target.boosts[i] = -target.boosts[i];
				success = true;
			}
			if (!success) return false;
			this.add('-invertboost', target, '[from] move: Plot Twist');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
			this.add('-anim', source, "Topsy-Turvy", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	hydrovoice: {
		num: 848,
		accuracy: 95,
		basePower: 60,
		basePowerCallback() {
			if (this.field.pseudoWeather.hydrovoice) {
				return 60 * this.field.pseudoWeather.hydrovoice.multiplier;
			}
			return 60;
		},
		category: "Special",
		shortDesc: "Power increases when used on consecutive turns.",
		name: "Hydro Voice",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTry() {
			this.field.addPseudoWeather('hydrovoice');
		},
		condition: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.duration !== 2) {
					this.effectData.duration = 2;
					if (this.effectData.multiplier < 5) {
						this.effectData.multiplier++;
					}
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Voice", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	bodycharge: {
		num: 1001,
		accuracy: 80,
		basePower: 150,
		category: "Physical",
		shortDesc: "Has 1/3 recoil.",
		name: "Body Charge",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	mindclaw: {
		num: 1002,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		shortDesc: "Damages target based on Special Defense, not Def.",
		defensiveCategory: "Special",
		name: "Mind Claw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Claw", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	spiritroar: {
		num: 1003,
		accuracy: 100,
		basePower: 90,
		basePowerCallback() {
			if (this.field.pseudoWeather.spiritroar) {
				return 90 * this.field.pseudoWeather.spiritroar.multiplier;
			}
			return 90;
		},
		category: "Special",
		shortDesc: "Power increases when used on consecutive turns.",
		name: "Spirit Roar",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTry() {
			this.field.addPseudoWeather('spiritroar');
		},
		condition: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.duration !== 2) {
					this.effectData.duration = 2;
					if (this.effectData.multiplier < 5) {
						this.effectData.multiplier++;
					}
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Echoed Voice", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	fearfulstrike: {
		num: 1004,
		accuracy: 80,
		basePower: 110,
		category: "Physical",
		shortDesc: "20% chance to make the target flinch.",
		name: "Fearful Strike",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Pulse", target);
			this.add('-anim', source, "Knock Off", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Dark",
	},
};