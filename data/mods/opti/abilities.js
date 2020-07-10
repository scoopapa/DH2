'use strict';

exports.BattleAbilities = {
	"fluid": {
		shortDesc: "This Pokemon's Normal-type moves become Water type and Water-type moves cannot miss and ignore all protection",
		onModifyMovePriority: 8,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Water';
			}
			if (move.type === 'Water') { // Add protection break
				delete move.flags['protect'];
				move.breaksProtect = true;
				move.accuracy = true; 
			}
		},
		id: "fluid",
		name: "Fluid",
	},
	/*"jubileespirit": {
    shortDesc: "40% chance to raise this Pokemon's higher attacking stat after successfully hitting the foe with a Dance move.",
    onAfterMove: function(pokemon, move) {
        for (const source of pokemon.side.active) {
            if (move && move.flags['dance']) {
                if (this.randomChance(4, 10)) {
                    if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
                        this.boost({
                            atk: 1
                        })
                    } else {
                        this.boost({
                            spa: 1
                        })
                    }
                }
            }
        }
    },
    id: "jubileespirit",
    name: "Jubilee Spirit",
},*/
	"selfrepair": {
		desc: "This Pokemon is immune to Rock-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Rock-type move.", //Need to code Stealth Rock + Spike health recovery
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Rock moves, Stealth Rocks or Spikes and removes them on switch-in.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Rock') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Self-Repair');
				}
				return null;
			}
		},
		onSwitchInPriority: 6,
		onSwitchIn: function(pokemon, target, source) {
			let sideConditions = ['spikes', 'stealthrock'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] ability: Self-Repair', '[of] ' + pokemon);
				}
			}
		},
		id: "selfrepair",
		name: "Self-Repair",
	},
	"unmelting": {
		desc: "This Pokemon is immune to Fire-type moves and burns; Takes half damage from Water-type moves.", //Code may be a little messy, need to sort Fire immunity
		shortDesc: "This Pokemon is immune to Fire Moves and Burns, and takes half damage from Water Moves",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
					this.add('-immune', target, '[msg]', '[from] ability: Unmelting');
				return null;
			}
		},
	   onModifyAtkPriority: 5,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		onUpdate: function (pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Unmelting');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'brn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Unmelting');
			return false;
		},
		id: "unmelting",
		name: "Unmelting",
	},
	"slowstart": {
		shortDesc: "On switch-in, this Pokemon's Speed is halved for 5 turns.",
		onStart: function (pokemon) {
			pokemon.addVolatile('slowstart');
		},
		onEnd: function (pokemon) {
			delete pokemon.volatiles['slowstart'];
			this.add('-end', pokemon, 'Slow Start', '[silent]');
		},
		effect: {
			duration: 5,
			onStart: function (target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd: function (target) {
				this.add('-end', target, 'Slow Start');
			},
		},
		id: "slowstart",
		name: "Slow Start",
		rating: -2,
		num: 112,
	},
	"rkssystem": {
		desc: "If this Pokemon is a Silvally, its type changes to match its held Memory. Also boosts types of the held memory by 20%",
		shortDesc: "If this Pokemon is a Silvally, its type changes to match its held Memory; boosts types of the held memory by 20%",
		onModifyMove: function (move) {
			move.stab = 1.8;
		},
		id: "rkssystem",
		name: "RKS System",
		rating: 4,
		num: 225,
	},
	"schooling": {
		desc: "On switch-in, if this Pokemon is a Wishiwashi that is level 20 or above and has more than 1/4 of its maximum HP left, it changes to School Form. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
		shortDesc: "If user is Wishiwashi, changes to School Form if it has > 1/4 max HP, else Solo Form.",
		onStart: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.template.speciesid === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.template.speciesid === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		onResidualOrder: 27,
		onResidual: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.template.speciesid === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.template.speciesid === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		id: "schooling",
		name: "Schooling",
		rating: 4,
		num: 208,
	},
	"gardener": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Grass-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Gardener boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Gardener boost');
				return this.chainModify(1.5);
			}
		},
		id: "gardener",
		name: "Gardener",
	},
	"Lunatic": {
		shortDesc: "On switch-in, this Pokemon summons Wonder Room.",
		onStart: function(source) {
			this.useMove("Wonder Room", source);
		},
		id: "lunatic",
		name: "Lunatic",
	},
	"jackolantern": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Ghost-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Jack-O-Lantern boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Jack-O-Lantern boost');
				return this.chainModify(1.5);
			}
		},
		id: "jackolantern",
		name: "Jack-O-Lantern",
	},	
};
