export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	nextTurn() {
		this.turn++;
		this.lastSuccessfulMoveThisTurn = null;
		const trappedBySide: boolean[] = [];
		const stalenessBySide: ('internal' | 'external' | undefined)[] = [];
		for (const side of this.sides) {
			let sideTrapped = true;
			let sideStaleness: 'internal' | 'external' | undefined;
			for (const pokemon of side.active) {
				if (!pokemon) continue;
				pokemon.moveThisTurn = '';
				pokemon.usedItemThisTurn = false;
				pokemon.newlySwitched = false;
				pokemon.moveLastTurnResult = pokemon.moveThisTurnResult;
				pokemon.moveThisTurnResult = undefined;
				pokemon.hurtThisTurn = null;
				pokemon.statsRaisedThisTurn = false;
				pokemon.statsLoweredThisTurn = false;

				pokemon.maybeDisabled = false;
				for (const moveSlot of pokemon.moveSlots) {
					moveSlot.disabled = false;
					moveSlot.disabledSource = '';
				}
				this.runEvent('DisableMove', pokemon);
				// if (!pokemon.ateBerry) pokemon.disableMove('belch');
				if (!pokemon.getItem().isBerry) pokemon.disableMove('stuffcheeks');

				// If it was an illusion, it's not any more
				if (pokemon.getLastAttackedBy() && this.gen >= 7) pokemon.knownType = true;

				for (let i = pokemon.attackedBy.length - 1; i >= 0; i--) {
					const attack = pokemon.attackedBy[i];
					if (attack.source.isActive) {
						attack.thisTurn = false;
					} else {
						pokemon.attackedBy.splice(pokemon.attackedBy.indexOf(attack), 1);
					}
				}
				if (this.gen >= 7) {
					// In Gen 7, the real type of every Pokemon is visible to all players via the bottom screen while making choices
					const seenPokemon = pokemon.illusion || pokemon;
					const realTypeString = seenPokemon.getTypes(true).join('/');
					if (realTypeString !== seenPokemon.apparentType) {
						this.add('-start', pokemon, 'typechange', realTypeString, '[silent]');
						seenPokemon.apparentType = realTypeString;
						if (pokemon.addedType) {
							// The typechange message removes the added type, so put it back
							this.add('-start', pokemon, 'typeadd', pokemon.addedType, '[silent]');
						}
					}
				}
				pokemon.trapped = pokemon.maybeTrapped = false;
				this.runEvent('TrapPokemon', pokemon);
				if (!pokemon.knownType || this.dex.getImmunity('trapped', pokemon)) {
					this.runEvent('MaybeTrapPokemon', pokemon);
				}
				// canceling switches would leak information
				// if a foe might have a trapping ability
				if (this.gen > 2) {
					for (const source of pokemon.side.foe.active) {
						if (!source || source.fainted) continue;
						const species = (source.illusion || source).species;
						if (!species.abilities) continue;
						for (const abilitySlot in species.abilities) {
							const abilityName = species.abilities[abilitySlot as keyof Species['abilities']];
							if (abilityName === source.ability) {
								// pokemon event was already run above so we don't need
								// to run it again.
								continue;
							}
							const ruleTable = this.ruleTable;
							if ((ruleTable.has('+hackmons') || !ruleTable.has('obtainableabilities')) && !this.format.team) {
								// hackmons format
								continue;
							} else if (abilitySlot === 'H' && species.unreleasedHidden) {
								// unreleased hidden ability
								continue;
							}
							const ability = this.dex.getAbility(abilityName);
							if (ruleTable.has('-ability:' + ability.id)) continue;
							if (pokemon.knownType && !this.dex.getImmunity('trapped', pokemon)) continue;
							this.singleEvent('FoeMaybeTrapPokemon', ability, {}, pokemon, source);
						}
					}
				}
				if (pokemon.fainted) continue;
				sideTrapped = sideTrapped && pokemon.trapped;
				const staleness = pokemon.volatileStaleness || pokemon.staleness;
				if (staleness) sideStaleness = sideStaleness === 'external' ? sideStaleness : staleness;
				pokemon.activeTurns++;
			}
			trappedBySide.push(sideTrapped);
			stalenessBySide.push(sideStaleness);
			side.faintedLastTurn = side.faintedThisTurn;
			side.faintedThisTurn = null;
		}
		if (this.maybeTriggerEndlessBattleClause(trappedBySide, stalenessBySide)) return;
		if (this.gameType === 'triples' && !this.sides.filter(side => side.pokemonLeft > 1).length) {
			// If both sides have one Pokemon left in triples and they are not adjacent, they are both moved to the center.
			const actives = this.getAllActive();
			if (actives.length > 1 && !this.isAdjacent(actives[0], actives[1])) {
				this.swapPosition(actives[0], 1, '[silent]');
				this.swapPosition(actives[1], 1, '[silent]');
				this.add('-center');
			}
		}
		this.add('turn', this.turn);
		this.makeRequest('move');
},
	init: function () {
/*
		for (const id in this.dataCache.Pokedex) {
			const poke = this.dataCache.Pokedex[id];
			if (poke.restrictedLearnset) {
				console.log(this.toID(poke.name));
				const thisPoke = this.toID(poke.name);
				const learnset = this.dataCache.Learnsets[this.toID(poke.name)].learnset;
				for (const move in learnset) {
					console.log(thisPoke + " has " + move);
					const moveid = this.dataCache.Moves[move];
					if (moveid.isNonstandard) {
						console.log(moveid.isNonstandard);
						delete this.modData('Learnsets', thisPoke).learnset.moveid;
					}
				}
			}
		}
*/
this.modData('Learnsets', 'vanillite').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'vanillish').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'vanilluxe').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'swirlix').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'slurpuff').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'milcery').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'alcremie').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'pansage').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'pansear').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'panpour').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'simisage').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'simisear').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'simipour').learnset.batterup = ['8L1'];
this.modData('Learnsets', 'passimian').learnset.batterup = ['8L1'];

this.modData('Learnsets', 'tropius').learnset.bananapeel = ['8L1'];
this.modData('Learnsets', 'pansage').learnset.bananapeel = ['8L1'];
this.modData('Learnsets', 'pansear').learnset.bananapeel = ['8L1'];
this.modData('Learnsets', 'panpour').learnset.bananapeel = ['8L1'];
this.modData('Learnsets', 'simisage').learnset.bananapeel = ['8L1'];
this.modData('Learnsets', 'simisear').learnset.bananapeel = ['8L1'];
this.modData('Learnsets', 'simipour').learnset.bananapeel = ['8L1'];

this.modData('Learnsets', 'tropius').learnset.bananasplit = ['8L1'];
this.modData('Learnsets', 'vanilluxe').learnset.bananasplit = ['8L1'];

this.modData('Learnsets', 'pinsir').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'gyarados').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'meowthgalar').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'perrserker').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'axew').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'fraxure').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'haxorus').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'spearow').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'fearow').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'obstagoon').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'tauros').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'incineroar').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'garchomp').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'tyranitar').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'krookodile').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'nidoking').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'rhyperior').learnset.berserker = ['8L1'];
this.modData('Learnsets', 'regidrago').learnset.berserker = ['8L1'];

this.modData('Learnsets', 'guzzlord').learnset.breakthrough = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.breakthrough = ['8L1'];
this.modData('Learnsets', 'meowstic').learnset.breakthrough = ['8L1'];
this.modData('Learnsets', 'alakazam').learnset.breakthrough = ['8L1'];
this.modData('Learnsets', 'kadabra').learnset.breakthrough = ['8L1'];
this.modData('Learnsets', 'espurr').learnset.breakthrough = ['7L1'];

this.modData('Learnsets', 'slowbro').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'morpeko').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'vanillite').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'vanilluxe').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'swirlix').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'slurpuff').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'applin').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'flapple').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'appletun').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'sinistea').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'polteageist').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'tropius').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'bounsweet').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'steenee').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'tsareena').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'milcery').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'alcremie').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'chansey').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'blissey').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'shuckle').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'cherubi').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'cherrim').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'greedent').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'miltank').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'calyrex').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'gulpin').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'swalot').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'combee').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'vespiquen').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'farfetchd').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'farfetchdgalar').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'sirfetchd').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'passimian').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'pansage').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'pansear').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'panpour').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'simisear').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'simisage').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'simipour').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'azumarill').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'marill').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'azurill').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'dewgong').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'seel').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'grumpig').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'spoink').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'hariyama').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'makuhita').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'swinub').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'piloswine').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'mamoswine').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'munchlax').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'snorlax').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'tepig').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'pignite').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'emboar').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'purugly').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'rattataalola').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'raticatealola').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'raticatealolatotem').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'spheal').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'sealeo').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'walrein').learnset.caloray = ['8L1'];
this.modData('Learnsets', 'venusaur').learnset.caloray = ['8L1'];

this.modData('Learnsets', 'swirlix').learnset.cherryontop = ['8L1'];
this.modData('Learnsets', 'slurpuff').learnset.cherryontop = ['8L1'];
this.modData('Learnsets', 'alcremie').learnset.cherryontop = ['8L1'];
this.modData('Learnsets', 'cherubi').learnset.cherryontop = ['8L1'];
this.modData('Learnsets', 'cherrim').learnset.cherryontop = ['8L1'];

this.modData('Learnsets', 'slurpuff').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'tropius').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'tsareena').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'shuckle').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'cherrim').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'miltank').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'calyrex').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'vespiquen').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'pansage').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'pansear').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'panpour').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'simisage').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'simisear').learnset.decorate = ['8L1'];
this.modData('Learnsets', 'simipour').learnset.decorate = ['8L1'];

this.modData('Learnsets', 'slowbro').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'morpeko').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'vanillite').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'vanilluxe').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'swirlix').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'slurpuff').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'applin').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'flapple').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'appletun').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'sinistea').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'polteageist').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'tropius').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'bounsweet').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'steenee').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'tsareena').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'milcery').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'alcremie').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'chansey').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'blissey').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'shuckle').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'cherubi').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'cherrim').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'greedent').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'miltank').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'calyrex').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'gulpin').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'swalot').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'combee').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'vespiquen').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'farfetchd').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'farfetchdgalar').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'sirfetchd').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'passimian').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'pansage').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'pansear').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'panpour').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'simisear').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'simisage').learnset.eggbomb = ['8L1'];
this.modData('Learnsets', 'simipour').learnset.eggbomb = ['8L1'];

this.modData('Learnsets', 'cherrim').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'bewear').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'hariyama').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'pangoro').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'throh').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'lickilicky').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'slurpuff').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'alcremie').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'chansey').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'blissey').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'miltank').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'swalot').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'pansage').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'pansear').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'panpour').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'simisage').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'simisear').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'simipour').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'passimian').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'slowbro').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'morpeko').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'azumarill').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'marill').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'spoink').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'grumpig').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'snorlax').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'pignite').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'emboar').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'abomasnow').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'snover').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'bellossom').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'vileplume').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'gloom').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'breloom').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'cacturne').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'cacnea').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'shroomish').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'chesnaught').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'ludicolo').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'maractus').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'rillaboom').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'thwackey').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'grookey').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'sceptile').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'grovyle').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'treecko').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'shiftry').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'shiinotic').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'trevenant').learnset.fruitpunch = ['8L1'];
this.modData('Learnsets', 'zarude').learnset.fruitpunch = ['8L1'];

this.modData('Learnsets', 'vespiquen').learnset.honeybomb = ['8L1'];
this.modData('Learnsets', 'ribombee').learnset.honeybomb = ['8L1'];

this.modData('Learnsets', 'tauros').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'rampardos').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'pinsir').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'darmanitan').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'carvanha').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'sharpedo').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'seviper').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'guzzlord').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'poochyena').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'mightyena').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'lycanroc').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'lycanrocmidnight').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'lycanrocdusk').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'gyarados').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'dodrio').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'basculin').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'carnivine').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'glastrier').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'spectrier').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'banette').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'marowak').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'staraptor').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'axew').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'fraxure').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'haxorus').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'luxray').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'zapdosgalar').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'moltresgalar').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'manectric').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'morpeko').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'spearow').learnset.furyswipes = ['8L1'];
this.modData('Learnsets', 'fearow').learnset.furyswipes = ['8L1'];

this.modData('Learnsets', 'tauros').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'rampardos').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'pinsir').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'darmanitan').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'carvanha').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'sharpedo').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'seviper').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'guzzlord').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'poochyena').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'mightyena').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'lycanroc').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'lycanrocmidnight').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'lycanrocdusk').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'gyarados').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'dodrio').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'basculin').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'carnivine').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'glastrier').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'spectrier').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'banette').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'marowak').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'staraptor').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'axew').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'fraxure').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'haxorus').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'luxray').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'zapdosgalar').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'moltresgalar').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'manectric').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'morpeko').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'spearow').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'fearow').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'zeraora').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'mankey').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'primeape').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'meowthgalar').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'perrserker').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'ursaring').learnset.huntinggaze = ['8L1'];
this.modData('Learnsets', 'beartic').learnset.huntinggaze = ['8L1'];
		
this.modData('Learnsets', 'tauros').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'rampardos').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'pinsir').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'darmanitan').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'carvanha').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'sharpedo').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'seviper').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'guzzlord').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'poochyena').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'mightyena').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'lycanroc').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'lycanrocmidnight').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'lycanrocdusk').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'gyarados').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'dodrio').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'basculin').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'carnivine').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'glastrier').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'spectrier').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'banette').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'marowak').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'staraptor').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'axew').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'fraxure').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'haxorus').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'luxray').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'zapdosgalar').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'moltresgalar').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'manectric').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'morpeko').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'spearow').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'fearow').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'zeraora').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'mankey').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'primeape').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'meowthgalar').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'perrserker').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'ursaring').learnset.hyperfang = ['8L1'];
this.modData('Learnsets', 'beartic').learnset.hyperfang = ['8L1'];

this.modData('Learnsets', 'sharpedo').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'gyarados').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'guzzlord').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'poochyena').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'mightyena').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'lycanroc').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'lycanrocmidnight').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'lycanrocdusk').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'rockruff').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'carnivine').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'gumshoos').learnset.jawlock = ['8L1'];
this.modData('Learnsets', 'gumshoostotem').learnset.jawlock = ['8L1'];

this.modData('Learnsets', 'applin').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'flapple').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'appletun').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'sinistea').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'polteageist').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'tropius').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'bounsweet').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'steenee').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'tsareena').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'shuckle').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'cherubi').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'cherrim').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'greedent').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'calyrex').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'gulpin').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'swalot').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'farfetchd').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'farfetchdgalar').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'sirfetchd').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'passimian').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.laserbean = ['8L1'];
this.modData('Learnsets', 'claydol').learnset.laserbean = ['8L1'];

this.modData('Learnsets', 'shuckle').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'pansage').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'pansear').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'panpour').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'simisage').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'simisear').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'simipour').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'carnivine').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'lickilicky').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'tangela').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'tangrowth').learnset.spaghettem = ['8L1'];
this.modData('Learnsets', 'serperior').learnset.spaghettem = ['8L1'];

this.modData('Learnsets', 'carnivine').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'swirlix').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'slurpuff').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'appletun').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'greedent').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'gulpin').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'swalot').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'morpeko').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'snorlax').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'lickilicky').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'pachirisu').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'dedenne').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'togedemaru').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'togedemarutotem').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'boltund').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'mawile').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'gumshoos').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'gumshoostotem').learnset.sweettooth = ['8L1'];
this.modData('Learnsets', 'granbull').learnset.sweettooth = ['8L1'];

this.modData('Learnsets', 'pinsir').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'zangoose').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'guzzlord').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'lycanroc').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'lycanrocmidnight').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'lycanrocdusk').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'zeraora').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'dodrio').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'ursaring').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'beartic').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'meowthgalar').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'perrserker').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'staraptor').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'axew').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'fraxure').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'haxorus').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'barbaracle').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'zapdosgalar').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'sneasel').learnset.tearapart = ['8L1'];
this.modData('Learnsets', 'weavile').learnset.tearapart = ['8L1'];

this.modData('Learnsets', 'necrozma').learnset.thrash = ['8L1'];
this.modData('Learnsets', 'banette').learnset.thrash = ['8L1'];

this.modData('Learnsets', 'tauros').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'mankey').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'primeape').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'sharpedo').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'seviper').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'guzzlord').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'zeraora').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'gyarados').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'glastrier').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'spectrier').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'banette').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'zapdosgalar').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'moltresgalar').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'camerupt').learnset.untamedanger = ['8L1'];
this.modData('Learnsets', 'krookodile').learnset.untamedanger = ['8L1'];

this.modData('Learnsets', 'swirlix').learnset.whiskaway = ['8L1'];
this.modData('Learnsets', 'slurpuff').learnset.whiskaway = ['8L1'];
this.modData('Learnsets', 'milcery').learnset.whiskaway = ['8L1'];
this.modData('Learnsets', 'alcremie').learnset.whiskaway = ['8L1'];
	},
};
