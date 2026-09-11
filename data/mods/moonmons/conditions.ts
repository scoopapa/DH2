export const Conditions: {[id: string]: ModdedConditionData} = {
    erd: {
        name:'erd',
        effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (pokemon.hasType('Poison')) {
				this.add('-immune', pokemon, '[from] status: Erosion');
				return false;
            }
        	this.add('-message', `${target.name} was Eroded!`);
            if (sourceEffect && sourceEffect.id === 'wellwornparasol') {
				this.add('-status', target, 'erd', '[from] item: Well-Worn Parasol');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'erd', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'erd');
			}
    	},
        onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(Math.floor(pokemon.baseMaxhp / 16));
		},
        onSourceModifyDamage(damage, source, target, move ,typeMod) {
            if (typeMod = 2) {
                return this.chainModify(1.5)
            }
        },
	},
    bld: {
        name:'bld',
        effectType: 'Status',
        onStart(target, source, sourceEffect){
            this.add('-message', `${target.name} is Bleeding!`);
            if (sourceEffect && sourceEffect.id === 'rustedchain') {
				this.add('-status', target, 'bld', '[from] item: Rusted Chain');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'bld', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'bld');
			}
        },
        onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag) {
				this.damage(Math.floor(source.baseMaxhp / 12), source, source);
                for (const target of pokemon.adjacent()) {
                    if (this.target.baseSpecies = 'bloodfiend'){
                        this.heal(Math.floor(source.baseMaxhp / 12));
                    }
                }
                    
            };
		}
    },
    prescript1: {
        name:'prescriptslot1',
        onStart(target, source, sourceEffect){
            this.add('-message', `${target.name}'s first moveslot is empowered!`);
            target.buffedSlot = 0
        },
        onSourceModifyDamage (source,move) {
            if (move.moveSlot = [0]) {
                return this.chainModify(1.3)
                if (!source.prescriptCombo > 4) {
                    source.prescriptCombo++
                }
            } else {
                this.damage(Math.floor(source.baseMaxhp/10))
                source.prescriptCombo = 0
            }

        }
    },
    prescript2: {
        name:'prescriptslot2',
        onStart(target, source, sourceEffect){
            this.add('-message', `${target.name}'s second moveslot is empowered!`);
            target.buffedSlot = 1
        },
        onSourceModifyDamage (source,move) {
            if (move.moveSlot = [1]) {
                return this.chainModify(1.3)
                if (!source.prescriptCombo > 4) {
                    source.prescriptCombo++
                }
            } else {
                this.damage(Math.floor(source.baseMaxhp/10))
                source.prescriptCombo = 0
            }

        }
    },
    prescript3: {
        name:'prescriptslot3',
        onStart(target, source, sourceEffect){
            this.add('-message', `${target.name}'s third moveslot is empowered!`);
            target.buffedSlot = 2
        },
        onSourceModifyDamage (source,move) {
            if (move.moveSlot = [2]) {
                return this.chainModify(1.3)
                if (!source.prescriptCombo > 4) {
                    source.prescriptCombo++
                }
            } else {
                this.damage(Math.floor(source.baseMaxhp/10))
                source.prescriptCombo = 0
            }

        }
    },
    prescript4: {
        name:'prescriptslot4',
        onStart(target, source, sourceEffect){
            this.add('-message', `${target.name}'s fourth moveslot is empowered!`);
            target.buffedSlot = 3
        },
        onSourceModifyDamage (source,move) {
            if (move.moveSlot = [3]) {
                return this.chainModify(1.3)
                if (!source.prescriptCombo > 4) {
                    source.prescriptCombo++
                }
            } else {
                this.damage(Math.floor(source.baseMaxhp/10))
                source.prescriptCombo = 0
            }

        }
    },
    surprisegift: {
        name:'surprisegift',
        onStart(target, source, sourceEffect){
            this.add('-message', `${target.name} was given a gift by ${target.name}!`);
        },
        onSwitchOut(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.baseSpeciesName = 'hod'){
                    this.damage(Math.floor(pokemon.baseMaxHp/10));
                    target.trySetStatus('bld', pokemon);
                    return
                }
			}
		}
    },
};
