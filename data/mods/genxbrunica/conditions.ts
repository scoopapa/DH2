export const Conditions: {[k: string]: ConditionData} = {
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
	//There was an error so this edit to accommodate for Cloning Genes is being archived
	
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
				'Photalohm': 'Magnetic Updraft',
				'Smeltusk': 'Leaping Onrush',
				'Panthoard': 'Cupric Deluge',
				'Mustelone': 'Clone Express',
				'Froskua': 'Dive Bomb',
				'Muk': 'Mud Devourment',
				'Muk-Alola': 'Mud Devourment',
				'Syruptitious': 'Adulteration',
				'Steelix': 'Olive Rampage',
				'Crobat': 'Venomous Fang',
				'Saunusca': 'Tectonic Shift',
				'Raatilus': 'Ammolite Vortex',
				'Blootilus': 'Ammolite Vortex',
				'Yleltilus': 'Ammolite Vortex',
				'Acktilus': 'Ammolite Vortex',
				'Whitilus': 'Ammolite Vortex',
				'Dodrio': 'Asura Barrage',
				'Roserade': 'Vive Le\u0301 Rose',
				'Bouffalant': 'Dread Stampede',
				'Pichat': 'Thunder Armor',
				'Pikachat': 'Thunder Armor',
				'Raichat': 'Thunder Armor',
			};
			const species = target.baseSpecies.baseSpecies;
			//...All this to adjust the PP. 
			if (balmMoveList[species]) {
				this.effectState.balmMove = balmMoveList[species];
				this.effectState.balmType = target.addedType;
				const balmMove = this.dex.moves.get(this.effectState.balmMove);
				if (balmMove.type === target.addedType) {
					const newMoveSlots = [];
					for (const moveSlot of target.moveSlots) {
						let move = this.dex.moves.get(moveSlot.id);
						let type = move.type;
						if (moveSlot.id === 'hiddenpower') {
							type = target.hpType;
						}
						if (type !== balmMove.type || 
							(move.category !== balmMove.category && [move.category,balmMove.category].includes('Status'))
						) {
							newMoveSlots.push(moveSlot);
						} else {
							const movepp = move.category === 'Status' ? 16 : 8;
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
			const balmMove = this.dex.moves.get(this.effectState.balmMove);
			if (move.type === balmMove.type && 
				(move.category === balmMove.category || ![move.category,balmMove.category].includes('Status'))
			) {
				return balmMove.priority;
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
};
