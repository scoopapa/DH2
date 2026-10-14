export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	flashflood: { // finally works
		name: "Flash Flood",
		type: "Water",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Upon usage, sets a side condition on the opponent’s side where any Pokemon weak to Water will take 1/8 of their max HP at the end of each turn. In Rain, this increases to 1/4. Lasts for 3 turns.",
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		sideCondition: 'flashflood',
		condition: {
			duration: 3,
			onSideStart(side) {
				console.log('flashflood debug');
				this.add('-sidestart', side, 'move: Flash Flood');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(pokemon) {
				console.log(pokemon.runEffectiveness('Water'));
				console.log(1);
				console.log(pokemon.effectiveWeather());
				if (pokemon.runEffectiveness('Water') === 1) {
					console.log('supereffectiveness validated');
					if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())){
						this.damage(pokemon.baseMaxhp / 4, pokemon);
					} else {
						this.damage(pokemon.baseMaxhp / 8, pokemon);
					}
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 8,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Flash Flood');
			},
		},
		secondary: null,
		target: "normal",
	},
	originart: { // TODO
		name: "Origin Art",
		type: "Fighting",
		category: "Special",
		basePower: 50,
		accuracy: 100,
		pp: 5,
		shortDesc: "Uses higher offense. Hits 2 times, each hit having a 20% chance to lower their highest offense. Makes contact.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		multihit: 2,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: {
			chance: 20,
			onHit(target, source){
				console.log('originart debug');
				if (target.getStat('atk', false, true) > target.getStat('spa', false, true)) {
					this.boost({atk: -1});
				} else {
					this.boost({spa: -1});
				}
			},
		},
		target: "normal",
	},
	originaura: { // works
		name: "Origin Aura",
		type: "Dragon",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.ignoringItem()) {
				return move.basePower;
			}
			const item = pokemon.getItem()
			if (item.id && item.onPlate && !item.zMove){
				return move.basePower * 2;
			}
			return move.basePower;7
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "Doubles in power if user is holding a plate. Typing changes to reflect the new typing, if so. Uses higher offense.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (item.id && item.onPlate && !item.zMove) {
				move.type = item.onPlate;
			}
		},
		secondary: null,
		target: "normal",
	},
	originclock: { // works
		name: "Origin Clock",
		type: "Steel",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)){
				this.debug('Origin Clock damage boost');
				return move.basePower * 2;
			}
			this.debug('Origin Clock NOT boosted');
			return move.basePower;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "Doubles in power if target hasn't moved yet. User’s Speed increases, but Special Defense decreases. Uses higher offense.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spd: -1,
					spe: 1,
				}
			}
		},
		target: "normal",
	},
	originflare: { // works
		name: "Origin Flare",
		type: "Fire",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			let multiplier = 1;
			if (!target.status && !target.hasAbility('comatose')){
				multiplier *= 2;
			}
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())){
				multiplier *= 1.5;
			}
			return move.basePower * multiplier;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "Hits using the higher offense. 1.5x damage under sun, and another 2x damage if the opponent is not statused; 20% chance to burn.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
	},
	originflux: { // works
		name: "Origin Flux",
		type: "Water",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)){
				this.debug('Origin Flux damage boost');
				return move.basePower * 2;
			}
			this.debug('Origin Flux NOT boosted');
			return move.basePower;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "Doubles in power if target hasn't moved yet. User’s defense lowers by 1 stage, but Speed increases by 1 stage. Hits using higher offense.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: -1,
					spe: 1,
				},
			},
		},
		target: "normal",
	},
	originseed: { // works
		name: "Origin Seed",
		type: "Grass",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.effectiveWeather()){
				return move.basePower * 2;
			}
			return move.basePower;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "Sets Grassy Terrain on hit. Hits with higher offense, and deals double damage if weather is active.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.setTerrain('grassyterrain');
				},
			},
		},
		target: "normal",
	},
	originshimmer: { // works
		name: "Origin Shimmer",
		type: "Fairy",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (!this.field.isTerrain('')){
				return move.basePower * 2;
			}
			return move.basePower;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "Uses higher offense. Sets Misty Terrain on hit; if a terrain is already active, power is boosted by 2x.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.setTerrain('mistyterrain');
				},
			},
		},
		target: "normal",
	},
	originshock: { // works
		name: "Origin Shock",
		type: "Poison",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (['psn', 'tox'].includes(target.status)){
				return move.basePower * 2;
			}
			return move.basePower;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "30% chance to inflict Toxic. Doubles in damage when foe is poisoned. Uses higher offense.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
	},
	originsight: { // works
		name: "Origin Sight",
		type: "Psychic",
		category: "Special",
		basePower: 50,
		accuracy: 100,
		pp: 5,
		shortDesc: "Hits using higher offense and hits like Future Sight. Sets Psychic Terrain on hit.",
		priority: 0,
		flags: {allyanim: 1, futuremove: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'originsight',
				source,
				moveData: {
					id: 'originsight',
					name: "Origin Sight",
					accuracy: 100,
					basePower: 50,
					category: "Special",
					priority: 0,
					flags: { futuremove: 1 },
					onModifyMove(move, pokemon) {
						if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
					},
					effectType: 'Move',
					type: 'Psychic',
					secondary: {
						chance: 100,
						self: {
							onHit() {
								this.field.setTerrain('psychicterrain');
							},
						},
					},
				},
			});
			this.add('-start', source, 'Origin Sight');
			return this.NOT_FAIL;
		},
		target: "normal",
	},
	originspark: { // works
		name: "Origin Spark",
		type: "Electric",
		category: "Special",
		basePower: 50,
		accuracy: 100,
		pp: 5,
		shortDesc: "Hits using higher offense and hits like Future Sight. Sets Electric Terrain on hit.",
		priority: 0,
		flags: {allyanim: 1, futuremove: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'originspark',
				source,
				moveData: {
					id: 'originspark',
					name: "Origin Spark",
					accuracy: 100,
					basePower: 50,
					category: "Special",
					priority: 0,
					flags: { futuremove: 1 },
					onModifyMove(move, pokemon) {
						if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
					},
					effectType: 'Move',
					type: 'Electric',
					secondary: {
						chance: 100,
						self: {
							onHit() {
								this.field.setTerrain('electricterrain');
							},
						},
					},
				},
			});
			this.add('-start', source, 'Origin Spark');
			return this.NOT_FAIL;
		},
		target: "normal",
	},
	originspite: { // works
			name: "Origin Spite",
			type: "Dark",
			category: "Special",
			basePower: 50,
			accuracy: 100,
			pp: 5,
			shortDesc: "Inflicts Heal Block upon hit. Uses higher offense.",
			priority: 0,
			flags: {protect: 1, mirror: 1},
			onModifyMove(move, pokemon) {
				if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
			},
			secondary: {
				chance: 100,
				volatileStatus: 'healblock',
			},
			target: "normal",
		},
	originswarm: { // works
		name: "Origin Swarm",
		type: "Bug",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			let totalBoosts = 0;
			let boostName: BoostID;
			for (boostName in pokemon.boosts) {
				totalBoosts += Math.abs(pokemon.boosts[boostName]);
				totalBoosts += Math.abs(target.boosts[boostName]);
			}
			return move.basePower + 50 * totalBoosts;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "Hits using the higher offense. Gains +50 BP for every stat change on the field, but clears them all after.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			this.add('-clearallboost');
			pokemon.clearBoosts();
			target.clearBoosts();
		},
		onAfterSubDamage(target, pokemon) {
			this.add('-clearallboost');
			pokemon.clearBoosts();
			target.clearBoosts();
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
	},
	origintomb: { // prob works
		name: "Origin Tomb",
		type: "Rock",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)){
				this.debug('Origin Tomb damage boost');
				return move.basePower * 2;
			}
			this.debug('Origin Tomb NOT boosted');
			return move.basePower;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "Uses the user’s defense in damage calculation. Deals 2x more damage if target hasn't moved yet.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		overrideOffensiveStat: 'def',
		secondary: null,
		target: "normal",
	},
	origintremor: { // works
		name: "Origin Tremor",
		type: "Ground",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			let allLayers = 0;
			if (target.side.getSideCondition('stealthrock')) allLayers++;
			if (target.side.getSideCondition('stickyweb')) allLayers++;
			if (target.side.sideConditions['spikes']) {
				allLayers += target.side.sideConditions['spikes'].layers;
			}
			if (target.side.sideConditions['toxicspikes']) {
				allLayers += target.side.sideConditions['toxicspikes'].layers;
			}
			this.debug('Origin Tremor damage boost');
			return 50 + 50 * allLayers;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "BP increases by 50 for every hazard on the opponent’s side of the field. Hits using higher offense.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
	},
	originvoid: { // works
		name: "Origin Void",
		type: "Ice",
		category: "Special",
		basePower: 50,
		accuracy: 100,
		pp: 5,
		shortDesc: "User completely cleanses the field of hazards and side conditions. If this occurs, set Hail. Uses higher offense.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', `[of] ${pokemon}`);
				}
				let setHail = false
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist'];
				for (const condition of sideConditions) {
					if (pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Origin Void', `[of] ${pokemon}`);
						setHail = true
					}
					if (target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Origin Void', `[of] ${target}`);
					setHail = true
					}
				}
				if (setHail) {
					this.field.setWeather('hail');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', `[of] ${pokemon}`);
				}
				let setHail = false
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist'];
				for (const condition of sideConditions) {
					if (pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Origin Void', `[of] ${pokemon}`);
						setHail = true
					}
					if (target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Origin Void', `[of] ${target}`);
					setHail = true
					}
				}
				if (setHail) {
					this.field.setWeather('hail');
				}
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
	},
	originwarp: { // works
		name: "Origin Warp",
		type: "Ghost",
		category: "Special",
		basePower: 50,
		accuracy: 100,
		pp: 5,
		shortDesc: "Sets a side condition that lowers the foe’s highest stat for 3 turns. Uses higher offense.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		sideCondition: 'originwarp',
		condition: {
			duration: 3,
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Origin Warp');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(pokemon) {
				const bestStat = pokemon.getBestStat(true, true);
				this.boost({[bestStat]: -1});
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 8,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Origin Warp');
			},
		},
		secondary: null,
		target: "normal",
	},
	originzone: { // works
		name: "Origin Zone",
		type: "Flying",
		category: "Special",
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)){
				this.debug('Origin Zone damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Origin Zone NOT boosted');
			return move.basePower;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "User uses their Speed stat in damage calculation. 1.5x damage if target hasn't moved yet.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		overrideOffensiveStat: 'spe',
		secondary: null,
		target: "normal",
	},
};
