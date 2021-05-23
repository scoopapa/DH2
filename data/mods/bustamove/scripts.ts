const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe']);

//this.modData('Learnsets', 'pkmn').learnset.move = ['8L1'];
export const Scripts: BattleScriptsData = {
	/*init: function() {
	
		this.modData('Learnsets', 'houndoom').learnset.burningjealousy = ['8L1'];
		this.modData('Learnsets', 'infernape').learnset.burningjealousy = ['8L1'];
		this.modData('Learnsets', 'pyroar').learnset.burningjealousy = ['8L1'];
		
		this.modData('Learnsets', 'hatterene').learnset.decorate = ['8L1'];
		this.modData('Learnsets', 'jirachi').learnset.decorate = ['8L1'];
		this.modData('Learnsets', 'victini').learnset.decorate = ['8L1'];
	
		this.modData('Learnsets', 'delphox').learnset.eeriespell = ['8L1'];
		this.modData('Learnsets', 'hatterene').learnset.eeriespell = ['8L1'];
		this.modData('Learnsets', 'mismagius').learnset.eeriespell = ['8L1'];
	
		this.modData('Learnsets', 'celffa').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'clefairy').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'clefable').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'hatenna').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'hattrem').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'hatterene').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'primarina').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'mew').learnset.fairywind = ['8L1'];
	
		this.modData('Learnsets', 'rockruff').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'lycanroc').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'lycanrocdusk').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'lycanrocmidnight').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'tyrunt').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'tyrantrum').learnset.jawlock = ['8L1'];
	
		this.modData('Learnsets', 'tornadus').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'thundurus').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'landorus').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'articunogalar').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'zapdosgalar').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'celesteela').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'xatu').learnset.razorwind = ['8L1'];
	
		this.modData('Learnsets', 'beedrill').learnset.strength = ['8L1'];
	},
	

	
	getMaxMove(move, pokemon) {
		if (typeof move === 'string') move = this.dex.getMove(move);
		if (move.name === 'Struggle') return move;
		if (pokemon.gigantamax && pokemon.canGigantamax && move.category !== 'Status') {
			const gMaxSpecies = this.dex.getSpecies(pokemon.species.name + '-Gmax');
			if (gMaxSpecies.gMaxMoves) {
				for (const thisMove in gMaxSpecies.gMaxMoves) {
					const gMaxMove = this.dex.getMove(gMaxSpecies.gMaxMoves[thisMove]);
					if (gMaxMove.exists && gMaxMove.type === move.type) return gMaxMove;
				}
			}
			else {
				const gMaxMove = this.dex.getMove(gMaxSpecies.isGigantamax);
				if (gMaxMove.exists && gMaxMove.type === move.type) return gMaxMove;
			}
			
		}
		const maxMove = this.dex.getMove(this.maxMoveTable[move.category === 'Status' ? move.category : move.type]);
		if (maxMove.exists) return maxMove;
	},

	getActiveMaxMove(move, pokemon) {
		if (typeof move === 'string') move = this.dex.getActiveMove(move);
		if (move.name === 'Struggle') return this.dex.getActiveMove(move);
		let maxMove = this.dex.getActiveMove(this.maxMoveTable[move.category === 'Status' ? move.category : move.type]);
		if (move.category !== 'Status') {
			
			if (pokemon.gigantamax && pokemon.canGigantamax) {
				const gMaxSpecies = this.dex.getSpecies(pokemon.species.name + '-Gmax');
				if (gMaxSpecies.gMaxMoves) {
					for (const thisMove in gMaxSpecies.gMaxMoves) {
						const gMaxMove = this.dex.getActiveMove(gMaxSpecies.gMaxMoves[thisMove]);
						if (gMaxMove.exists && gMaxMove.type === move.type) maxMove = gMaxMove;
					}
				}
				else {
					const gMaxMove = this.dex.getActiveMove(gMaxSpecies.isGigantamax ? gMaxSpecies.isGigantamax : '');
					if (gMaxMove.exists && gMaxMove.type === move.type) maxMove = gMaxMove;
				}
			}
			if (!move.maxMove?.basePower) throw new Error(`${move.name} doesn't have a maxMove basePower`);
			maxMove.basePower = move.maxMove.basePower;
			if (['gmaxdrumsolo', 'gmaxfireball', 'gmaxhydrosnipe'].includes(maxMove.id)) maxMove.basePower = 160;
			maxMove.category = move.category;
		}
		maxMove.baseMove = move.id;
		// copy the priority for Psychic Terrain, Quick Guard
		maxMove.priority = move.priority;
		maxMove.isZOrMaxPowered = true;
		return maxMove;
	},
	
	
	hitStepStealBoosts(targets, pokemon, move) {
		const target = targets[0]; // hardcoded
		if (move.stealsBoosts) {
			const boosts: SparseBoostsTable = {};
			let stolen = false;
			let statName: BoostName;
			for (statName in target.boosts) {
				const stage = target.boosts[statName];
				if (stage > 0) {
					boosts[statName] = stage;
					stolen = true;
				}
			}
			if (stolen) {
				this.attrLastMove('[still]');
				this.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
				this.boost(boosts, pokemon, pokemon);

				let statName2: BoostName;
				for (statName2 in boosts) {
					boosts[statName2] = 0;
				}
				target.setBoost(boosts);
				this.addMove('-anim', pokemon, "Spectral Thief", target);
			}
		}

		if (move.swapsBoosts) {
			const boosts: SparseBoostsTable = {};
			let swapped = false;
			const targetBoosts: SparseBoostsTable = {};
			const sourceBoosts: SparseBoostsTable = {};

			let i: BoostName;
			for (i in target.boosts) {
				targetBoosts[i] = target.boosts[i];
				sourceBoosts[i] = pokemon.boosts[i];
				swapped = true;
			}

			if (swapped) {
				this.attrLastMove('[still]');
				this.add('-swapboost', pokemon, target, '[from] move: Spectral Trick');
				
				target.setBoost(sourceBoosts);
				pokemon.setBoost(targetBoosts);
				
				this.addMove('-anim', pokemon, "Spectral Thief", target);
			}
		}
		return undefined;
	},
	
	
	runZPower(move, pokemon) {
		const zPower = this.dex.getEffect('zpower');
		if (move.category !== 'Status') {
			this.attrLastMove('[zeffect]');
		} else if (move.zMove?.boost) {
			this.boost(move.zMove.boost, pokemon, pokemon, zPower);
		} else if (move.zMove?.effect) {
			switch (move.zMove.effect) {
			case 'heal':
				this.heal(pokemon.maxhp, pokemon, pokemon, zPower);
				break;
			case 'healreplacement':
				move.self = {slotCondition: 'healreplacement'};
				break;
			case 'clearnegativeboost':
				const boosts: SparseBoostsTable = {};
				let i: BoostName;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[zeffect]');
				break;
			case 'redirect':
				pokemon.addVolatile('followme', pokemon, zPower);
				break;
			case 'crit2':
				pokemon.addVolatile('focusenergy', pokemon, zPower);
				break;
			case 'sunnyday':
				this.field.setWeather('sunnyday', pokemon);
				break;
			case 'raindance':
				this.field.setWeather('raindance', pokemon);
				break;
			case 'hail':
				this.field.setWeather('hail', pokemon);
				break;
			case 'sandstorm':
				this.field.setWeather('sandstorm', pokemon);
				break;
			case 'electricterrain':
				this.field.setTerrain('electricterrain', pokemon);
				break;
			case 'mistyterrain':
				this.field.setTerrain('mistyterrain', pokemon);
				break;
			case 'grassyterrain':
				this.field.setTerrain('grassyterrain', pokemon);
				break;
			case 'psychicterrain':
				this.field.setTerrain('psychicterrain', pokemon);
				break;
			case 'curse':
				if (pokemon.hasType('Ghost')) {
					this.heal(pokemon.maxhp, pokemon, pokemon, zPower);
				} else {
					this.boost({atk: 1}, pokemon, pokemon, zPower);
				}
			}
			
		}
	},*/
};
