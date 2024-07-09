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
			this.add('-message', `${target.name} used the ` + target.addedType + ' Balm to gain the ' + target.addedType + ' type!');
			const balmMoveList = {
				'Photalohm': 'Magnetic Updraft',
				'Smeltusk': 'Leaping Onrush',
				'Panthoard': 'Cupric Deluge',
				'Mustelone': 'Clone Express',
				'Froskua': 'Dive Bomb'
			};
			const species = target.baseSpecies.baseSpecies;
			//...All this to adjust the PP. 
			if (balmMoveList[species]) {
				this.effectState.balmMove = balmMoveList[species];
				let balmMove = this.dex.moves.get(this.effectState.balmMove);
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
	},
};
