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
	},
};
