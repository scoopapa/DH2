export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	par: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (!sourceEffect) {
				this.add('-status', target, 'par');
			} else if (sourceEffect.id === 'thunderorb') {
				//TODO: Make the anim and message play concurrently?
				this.add('-status', target, 'par', '[from] item: Thunder Orb', '[silent]');
				this.add('-message', `${target.name} was paralyzed by the Thunder Orb!`);
			} else if (sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4) && !(pokemon.hasAbility('quickfeet') && pokemon.hasItem('thunderorb'))) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	
	twoturnmove: {
		// Cloning Genes
		inherit: true,
		onStart(attacker, defender, effect) {
			// ("attacker" is the Pokemon using the two turn move and the Pokemon this condition is being applied to)
			this.effectState.move = effect.id;
			attacker.addVolatile(effect.id);
			// lastMoveTargetLoc is the location of the originally targeted slot before any redirection
			// note that this is not updated for moves called by other moves
			// i.e. if Dig is called by Metronome, lastMoveTargetLoc will still be the user's location
			let moveTargetLoc: number = attacker.lastMoveTargetLoc!;
			if (effect.sourceEffect && this.dex.moves.get(effect.id).target !== 'self') {
				// this move was called by another move such as Metronome
				// and needs a random target to be determined this turn
				// it will already have one by now if there is any valid target
				// but if there isn't one we need to choose a random slot now
				if (defender.fainted) {
					defender = this.sample(attacker.foes(true));
				}
				moveTargetLoc = attacker.getLocOf(defender);
			}
			attacker.volatiles[effect.id].targetLoc = moveTargetLoc;
			this.attrLastMove('[still]');
			if (defender.hasAbility('cloninggenes')) {
				defender.addVolatile('cloninggenes', defender);
			}
			// Run side-effects normally associated with hitting (e.g., Protean, Libero)
			this.runEvent('PrepareHit', attacker, defender, effect);
		},
	},
	typebalm: {
		//This is here to track whether a mon has used a Type Balm this switch-in
		duration: 0,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'typechange', target.getTypes(false, true).join('/'), '[silent]');
			this.add('-message', `${target.name} gained the ${target.addedType} type from the Type Balm!`);
			const balmMoveList = {
				photalohm: 'Magnetic Updraft',
				smeltusk: 'Leaping Onrush',
				panthoard: 'Cupric Deluge',
				mustelone: 'Clone Express',
				froskua: 'Dive Bomb',
				muk: 'Mud Devourment',
				mukalola: 'Mud Devourment',
				syruptitious: 'Adulteration',
				steelix: 'Olive Rampage',
				crobat: 'Venomous Fang',
				saunusca: 'Tectonic Shift',
				raatilus: 'Ammolite Vortex',
				blootilus: 'Ammolite Vortex',
				yleltilus: 'Ammolite Vortex',
				acktilus: 'Ammolite Vortex',
				whitilus: 'Ammolite Vortex',
				dodrio: 'Asura Barrage',
				roserade: 'Vive Le\u0301 Rose',
				bouffalant: 'Dread Stampede',
				pichat: 'Thunder Armor',
				pikachat: 'Thunder Armor',
				raichat: 'Thunder Armor',
				trippletop: 'Mystic Burst',
				violagarie: 'Violet Seed',
				yiseng: 'Mental Extract',
				garoupe: 'Discovery',
				frostabone: 'Shaking Tundra',
				moskitoski: 'Venom Drain',
				moskitoskiswarm: 'Venom Drain',
				gastly: 'Maiden\'s Peak',
				haunter: 'Maiden\'s Peak',
				gengar: 'Maiden\'s Peak',
				cryophtore: 'Neural Network',
				pantaray: 'Electrified Jet',
				wreckitanic: 'Iceberg Crash',
				wailord: 'Northern Collapse',
				talonflame: 'Bright Wing',
				milotic: 'Sea Monster',
				kelpurion: 'Sunblast',
				kirlia: 'Spiritual Embrace',
				gardevoir: 'Spiritual Embrace',
				gallade: 'Spiritual Embrace',
				meowth: 'Go West, Young Feline',
				persian: 'Go West, Young Feline',
				pikachu: '100,000 Volt Kahuna Wave',
				raichu: '100,000 Volt Kahuna Wave',
				raichualola: '100,000 Volt Kahuna Wave',
				azdharsha: 'Furious Flare',
				icypenser: 'Cryptic Chill',
				adoraboa: 'Sneaky Squeeze',
				sagachelys: 'Pearl of Wisdom',
				lakegishi: 'Luscious Lake',
				plowudji: 'Prolific Plow',
			};
			const species = target.species.id;
			//...All this to adjust the PP. 
			if (balmMoveList[species]) {
				const balmMove = this.dex.moves.get(balmMoveList[species]);
				if (balmMove.type === target.addedType) {
					this.effectState.balmMove = balmMoveList[species];
					this.effectState.balmType = target.addedType;
					this.effectState.balmPriority = balmMove.priority;
					const balmCategory = balmMove.category;
					this.effectState.isBalmStatus = (balmCategory === 'Status');
					const newMoveSlots = [];
					for (const moveSlot of target.moveSlots) {
						let move = this.dex.moves.get(moveSlot.id);
						let type = move.type;
						if (moveSlot.id === 'hiddenpower') {
							type = target.hpType;
						}
						if (type !== balmMove.type || 
							(move.category !== balmCategory && [move.category,balmCategory].includes('Status'))
						) {
							newMoveSlots.push(moveSlot);
						} else {
							const movepp = balmCategory === 'Status' ? 16 : 8;
							//I can't specify BP in these new moveslots D:
							newMoveSlots.push({
								move: moveSlot.move,
								id: moveSlot.id,
								pp: movepp,
								maxpp: movepp,
								target: moveSlot.target,
								disabled: false,
								used: false,
								virtual: true,
							});
						}
					}
					target.moveSlots = newMoveSlots;
				}
			}
		},
		//Priority's kinda janky so this should iron it out
		onModifyPriority(priority, pokemon, target, move) {
			if (!this.effectState.balmMove) return;
			const isStatus = this.effectState.isBalmStatus;
			if (move.type === this.effectState.balmType && (move.category === 'Status' ? isStatus : !isStatus)) {
				let bPriority = this.effectState.balmPriority;
				//Sunlight priority hack for Bright Wing
				if (pokemon.species.id === 'talonflame' && 
					['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) bPriority++;
				return bPriority;
			}
		},
	},
	thunderarmorboost: {
		duration: 2,
		onBasePowerPriority: 6,
		onBasePower(basePower, attacker, defender, move) {
			return this.chainModify(2);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.type === 'Electric' && move.category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
	},
	sunnyday: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water' && (!attacker.hasAbility('hydrosynthesis') || attacker.hasItem('utilityumbrella'))) {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
	},
};
