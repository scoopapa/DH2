export const Items: {[itemid: string]: ModdedItemData} = {
    wellwornparasol: {
		name: "Well-Worn Parasol",
		fling: {
			basePower: 30,
			status: 'erd',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('erd', pokemon);
		},
	},
    rustedchain: {
		name: "Rusted Chain",
		fling: {
			basePower: 30,
			status: 'bld',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('bld', pokemon);
		},
	},
    prescript: {
		name: "Prescript",
		fling: {
			basePower: 40,
		},
        onStart (target) {
			target.prescriptCombo = 0
			target.buffedSlot = 0
            let slots: number[] = [0, 1, 2, 3];
            var randIndex = Math.floor(Math.random() * slots.length);
			slots[randIndex] = toBuff;
			slots.splice(randIndex, 1);
            if (toBuff === 0) {
                target.addVolatile('prescript1')
            } else if (toBuff === 1) {
                target.addVolatile('prescript2')
            } else if (tobuff === 2) {
                target.addVolatile('prescript3')
            } else {
                target.addVolatile('prescript4')
            }
			if (slots?.length === 0) slots = [0,1,2,3];
        },
		onTakeItem(item, source) {
			if (['yan', 'hubert', 'esther', 'gloria'].includes(target.species.id)) return false;
			return true;
		},
	},
    tiangshastarsblade: {
		name: "Tiangsha Star's Blade",
		fling: {
			basePower: 60,
            status: 'bld',
		},
		onSourceModifyDamage(pokemon, target, move) {
			if (pokemon.baseSpeciesName = 'ryoshu' && move.flags['slicing']) {
                    return this.chainModify(1.5)
            }
		},
        onModifyMove(move, pokemon) {
			if (pokemon.baseSpeciesName = 'ryoshu' && move.flags['slicing']) {
				this.debug('Adding Heal Block');
                if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.status === 'healblock') return;
				}
				move.secondaries.push({
					chance: 100,
					status: 'healblock',
				});
                this.debug('Lowering Level')
                pokemon.level = (pokemon.level -5)
                pokemon.set.level = (pokemon.level -5)
                pokemon.baseMaxhp = Math.floor(Math.floor(2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
			    const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
		    	pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
		    	pokemon.maxhp = newMaxHP;
		    	pokemon.recalcStats();
		    	this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		    	const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
		    	this.add('replace', pokemon, details, '[silent]');
			}
		},
		onTakeItem(item, source) {
			if (target.species.id === 'ryoshu') return false;
			return true;
		},
	},
	blacksilencegloves: {
		name: "The Black Silence's Gloves",
		megaStone: "The Black Silence",
		megaEvolves: "Roland",
		itemUser: ["Roland"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	mimicryego: {
		name: "Mimicry-Ego",
		megaStone: "The Red Mist",
		megaEvolves: "Gebura",
		itemUser: ["Gebura"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	anapple: {
		name: "An Apple",
		megaStone: "UNGEZEIFER KAISER",
		megaEvolves: "Gregor",
		itemUser: ["Gregor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	fadedphotograph: {
		name: "Faded Photograph",
		megaStone: "The Red Gaze",
		megaEvolves: "Vergilius",
		itemUser: ["Vergilius"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	whalesheart: {
		name: "Whale's Heart",
		megaStone: "Ahab-Gasharpoon",
		megaEvolves: "Ahab",
		itemUser: ["Ahab"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	tornprescript: {
		name: "Torn Prescript",
		megaStone: "Distorted-Yan",
		megaEvolves: "Yan Vismok",
		itemUser: ["Yan Vismok"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	rocinante: {
		name: "Rocinante",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies === 'donquixote')) {
				return false;
			}
			return true;
		},
		itemUser: ["Sancho"],
	},
	cathysmirror: {
		name: "\▮\▮\▮\▮\▮'s Mirror",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies === 'heathcliff')) {
				return false;
			}
			return true;
		},
		itemUser: ["Erlking Heathcliff"],
	},
	moteoflight: {
		name: "Mote of Light",
		onTakeItem(item, pokemon, source) {
			if ((source && source.ensemble)) {
				return false;
			}
			return true;
		},
	},
}
