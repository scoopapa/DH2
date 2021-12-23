export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Slowbronite" && pokemon.baseSpecies.name === "Slowbro-Galar") {
			return null;
		}
		return item.megaStone;
	},

	pokemon: {
        hasAbility(ability) {
            if (this.ignoringAbility()) return false;
            ability = toID(ability);
            return this.ability === ability || !!this.volatiles['ability' + ability];
            if(this.ability === 'powerofalchemy'){
                return this.species.abilities.some(checkAbility => toID(checkAbility) === ability || !!this.volatiles['ability' + toID(checkAbility)]);
            }
        },
		transformInto(pokemon, effect) {
			let template = pokemon.template;
			if (pokemon.fainted || pokemon.illusion || (pokemon.volatiles['substitute'] && this.battle.gen >= 5)) {
				return false;
			}
			if (!template.abilities || (pokemon && pokemon.transformed && this.battle.gen >= 2) || (this.transformed && this.battle.gen >= 5)) {
				return false;
			}
			if (!this.formeChange(template, null)) {
				return false;
			}
			this.transformed = true;

			this.types = pokemon.types;
			this.addedType = pokemon.addedType;
			this.knownType = this.side === pokemon.side && pokemon.knownType;

			for (let statName in this.stats) {
				this.stats[statName] = pokemon.stats[statName];
			}
			this.moveSlots = [];
			this.set.ivs = (this.battle.gen >= 5 ? this.set.ivs : pokemon.set.ivs);
			this.hpType = (this.battle.gen >= 5 ? this.hpType : pokemon.hpType);
			this.hpPower = (this.battle.gen >= 5 ? this.hpPower : pokemon.hpPower);
			for (let i = 0; i < pokemon.moveSlots.length; i++) {
				let moveData = pokemon.moveSlots[i];
				let moveName = moveData.move;
				if (moveData.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				}
				this.moveSlots.push({
					move: moveName,
					id: moveData.id,
					pp: moveData.maxpp === 1 ? 1 : 5,
					maxpp: this.battle.gen >= 5 ? (moveData.maxpp === 1 ? 1 : 5) : moveData.maxpp,
					target: moveData.target,
					disabled: false,
					used: false,
					virtual: true,
				});
			}
			for (let j in pokemon.boosts) {
				// @ts-ignore
				this.boosts[j] = pokemon.boosts[j];
			}
			if (effect) {
				this.battle.add('-transform', this, pokemon, '[from] ' + effect.fullname);
			} else {
				this.battle.add('-transform', this, pokemon);
			}
			this.setAbility(pokemon.ability, this, true);
			if (this.innates) {
				for (let innate of this.innates) {
					this.removeVolatile('ability' + innate);
				}
			}
			if (pokemon.innates) {
				for (let innate of pokemon.innates) {
					this.addVolatile('ability' + innate, this);
				}
			}
			return true;
		},
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

this.modData('Learnsets', 'wigglytuff').learnset.geomancy = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.defog = ['8L1'];
this.modData('Learnsets', 'zapdosgalar').learnset.defog = ['8L1'];
this.modData('Learnsets', 'moltresgalar').learnset.defog = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.toxic = ['8L1'];
this.modData('Learnsets', 'zapdosgalar').learnset.toxic = ['8L1'];
this.modData('Learnsets', 'moltresgalar').learnset.toxic = ['8L1'];
this.modData('Learnsets', 'magmortar').learnset.recover = ['8L1'];
this.modData('Learnsets', 'girafarig').learnset.focusblast = ['8L1'];
this.modData('Learnsets', 'zarude').learnset.focusblast = ['8L1'];
this.modData('Learnsets', 'samurott').learnset.focusblast = ['8L1'];
this.modData('Learnsets', 'jirachi').learnset.focusblast = ['8L1'];
this.modData('Learnsets', 'delphox').learnset.focusblast = ['8L1'];
this.modData('Learnsets', 'ninetalesalola').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'sandslashalola').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'abomasnow').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'arctozolt').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'arctovish').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'avalugg').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'articuno').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'crabominable').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'cryogonal').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'dewgong').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'froslass').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'frosmoth').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'glaceon').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'glalie').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'glastrier').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'jynx').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'lapras').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'mrrime').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'vanilluxe').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'walrein').learnset.meltdown = ['8L1'];
this.modData('Learnsets', 'spinarak').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'weedle').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'wurmple').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'venonat').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'combee').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'volbeat').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'illumise').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'shuckle').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'surskit').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'bulbasaur').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'joltik').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'dewpider').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'slowbrogalar').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'tentacool').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'poipole').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'umbreon').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'tangrowth').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'accelgor').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'leavanny').learnset.toxicthread = ['8L1'];
this.modData('Learnsets', 'anorith').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'croagunk').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'cubone').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'diglett').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'diglettalola').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'drilbur').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'geodude').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'geodudealola').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'gible').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'gligar').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'groudon').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'helioptile').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'jynx').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'mudbray').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'numel').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'lileep').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'onix').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'paras').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'rhyhorn').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'rolycoly').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'salandit').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'sandile').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'sandshrew').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'shuckle').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'silicobra').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'torkoal').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'trapinch').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'volcanion').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'wormadamsandy').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'yamaskgalar').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'solrock').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'lunatone').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'minior').learnset.aridabsorption = ['8L1'];
this.modData('Learnsets', 'aegislash').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'aggron').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'arceus').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'bastiodon').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'bronzong').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'carbink').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'celesteela').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'copperajah').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'dialga').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'duraludon').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'empoleon').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'escavalier').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'forretress').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'genesect').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'jirachi').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'kartana').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'klinklang').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'magearna').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'magnezone').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'melmetal').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'probopass').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'regice').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'regigigas').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'registeel').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'regirock').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'scizor').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'skarmory').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'solgaleo').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'stakataka').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'steelix').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'wormadamtrash').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'wormadam').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'wormadamsandy').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'zamazenta').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'reuniclus').learnset.reconstruct = ['8L1'];
this.modData('Learnsets', 'porygon').learnset.reconstruct = ['8L1'];
delete this.modData('Learnsets', 'alakazam').learnset.nastyplot;
this.modData('Learnsets', 'meganium').learnset.wish = ['8L1'];
this.modData('Learnsets', 'meganium').learnset.weatherball = ['8L1'];
this.modData('Learnsets', 'meganium').learnset.bodypress = ['8L1'];
this.modData('Learnsets', 'ampharos').learnset.dracometeor = ['8L1'];
this.modData('Learnsets', 'ampharos').learnset.slackoff = ['8L1'];
this.modData('Learnsets', 'ambipom').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'breloom').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'grapploct').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'sawk').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'infernape').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'scrafty').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'hitmonchan').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'crabominable').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'machamp').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'conkeldurr').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'melmetal').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'pangoro').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'ledian').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'toxicroak').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'mukalola').learnset.armthrust = ['8L1'];
this.modData('Learnsets', 'trevenant').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'exeggcute').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'landorus').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'thundurus').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'tornadus').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'ferrothorn').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'calyrex').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'dhelmise').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'leafeon').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'meganium').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'torterra').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'dubwool').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'sawsbuck').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'comfey').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'maractus').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'abomasnow').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'scolipede').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'regigigas').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'simisage').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'simisear').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'simipour').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'sirfetchd').learnset.rototiller = ['8L1'];
this.modData('Learnsets', 'chansey').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'umbreon').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'milotic').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'amoonguss').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'mismagius').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'braixen').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'murkrow').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'ninetales').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'lumineon').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'volbeat').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'solrock').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'pachirisu').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'gigalith').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'watchog').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'gourgeist').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'zekrom').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'electivire').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'golemalola').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'luxray').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'thundurus').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'eelektross').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'zeraora').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'pincurchin').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'arctozolt').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'dracozolt').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'regieleki').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'zebstrika').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'togedemaru').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'toxtricity').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'toxtricitylowkey').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'morpeko').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'zapdos').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'raichualola').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'raichu').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'raikou').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'xurkitree').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'marowak').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'marowakalola').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'rhydon').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'goldeen').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'manectric').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'terrakion').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'virizion').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'keldeo').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'cobalion').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'sirfetchd').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'gallade').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'escavalier').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'celesteela').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'zacian').learnset.lightninglance = ['8L1'];
this.modData('Learnsets', 'cleffa').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'ralts').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'mawile').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'tapukoko').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'tapulele').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'tapubulu').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'tapufini').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'azurill').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'diancie').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'flabebe').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'snubbull').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'impidimp').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'hatenna').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'ninetalesalola').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'primarina').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'klefki').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'mimikyu').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'togepi').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'weezinggalar').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'swirlix').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'comfey').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'carbink').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'sylveon').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'spritzee').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'cutiefly').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'cottonee').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'milcery').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'dedenne').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'mimejr').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'ponytagalar').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'morelull').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'igglybuff').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'xerneas').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'magearna').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'zacian').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'hoopa').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'latias').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'latios').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'meditite').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'slowpoke').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'slowpokegalar').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'abra').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'victini').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'azelf').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'bruxish').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'chingling').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'delphox').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'deoxys').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'girafarig').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'spoink').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'drowzee').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'jirachi').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'meloetta').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'mew').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'beldum').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'solosis').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'cresselia').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'indeedee').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'indeedeef').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'sigilyph').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'bronzor').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'celebi').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'espeon').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'starmie').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'raichualola').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'calyrex').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'baltoy').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'mesprit').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'natu').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'elgyem').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'exeggcute').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'gothita').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'smoochum').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'lunatone').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'inkay').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'espurr').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'munna').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'oranguru').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'dottler').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'woobat').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'uxie').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'mewtwo').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'lugia').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'arceus').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'solgaleo').learnset.counterspell = ['8L1'];
this.modData('Learnsets', 'lunala').learnset.counterspell = ['8L1'];
this.modData("Learnsets", "oshawott").learnset.secretsword = ["8L1"];
this.modData("Learnsets", "oshawott").learnset.firstimpression = ["8L1"];
this.modData("Learnsets", "oshawott").learnset.tripleaxel = ["8L1"];
this.modData("Learnsets", "dewott").learnset.brickbreak = ["8L1"];
this.modData("Learnsets", "dewott").learnset.closecombat = ["8L1"];
this.modData("Learnsets", "samurott").learnset.shellsmash = ["8L1"];
this.modData("Learnsets", "samurott").learnset.drillrun = ["8L1"];
this.modData("Learnsets", "samurott").learnset.lightninglance = ["8L1"];
this.modData("Learnsets", "muk").learnset.recover = ["8L1"];
this.modData("Learnsets", "mukalola").learnset.recover = ["8L1"];
this.modData("Learnsets", "mukalola").learnset.toxicspikes = ["8L1"];
delete this.modData('Learnsets', 'grimeralola').learnset.knockoff;
delete this.modData('Learnsets', 'mukalola').learnset.knockoff;
this.modData("Learnsets", "mismagius").learnset.moonblast = ["8L1"];
this.modData("Learnsets", "mismagius").learnset.partingshot = ["8L1"];
this.modData("Learnsets", "mismagius").learnset.toxicspikes = ["8L1"];
this.modData("Learnsets", "mismagius").learnset.venoshock = ["8L1"];
	},
};
