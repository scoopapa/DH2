export const Scripts: ModdedBattleScriptsData = {
	inherit: 'glacemons',
	gen: 9,
	teambuilderConfig: {
		customTiers: ['Adjusted', 'Uber OU', 'Uber UUBL', 'Uber UU', 'Uber RUBL', 'Uber RU'],
	},

	actions: {
		canMegaEvo(pokemon) {
			const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
			const item = pokemon.getItem();
			if (
				altForme?.isMega && altForme?.requiredMove &&
				pokemon.baseMoves.includes(this.dex.toID(altForme.requiredMove)) && !item.zMove
			) {
				return altForme.name;
			}
			if (item.name === "Soul Dew" && pokemon.baseSpecies.name === "Latias") {
				return "Latias-Mega";
			}
			else if (item.name === "Soul Dew" && pokemon.baseSpecies.name === "Latios") {
				return "Latios-Mega";
			}
			return item.megaStone;
		},
	},

	init(){
		// slate 1
		delete this.modData('Learnsets', 'necrozma').learnset.dragondance;
		delete this.modData('Learnsets', 'necrozmaduskmane').learnset.dragondance;
		delete this.modData('Learnsets', 'necrozmadawnwings').learnset.dragondance;
		this.modData("Learnsets", "kyurem").learnset.willowisp = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.defog = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.uturn = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.calmmind = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.fireblast = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.flamethrower = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.hurricane = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.iciclespear = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.dragondance = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.scaleshot = ['9L1'];
		this.modData("Learnsets", "kyurem").learnset.frostnip = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.willowisp = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.defog = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.uturn = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.calmmind = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.fireblast = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.flamethrower = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.hurricane = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.iciclespear = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.dragondance = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.scaleshot = ['9L1'];
		this.modData("Learnsets", "kyuremblack").learnset.frostnip = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.willowisp = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.defog = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.uturn = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.calmmind = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.fireblast = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.flamethrower = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.hurricane = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.iciclespear = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.dragondance = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.scaleshot = ['9L1'];
		this.modData("Learnsets", "kyuremwhite").learnset.frostnip = ['9L1'];
		this.modData("Learnsets", "ursaluna").learnset.slackoff = ['9L1'];
		// Pursuit
		this.modData("Learnsets", "yveltal").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "chienpao").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "urshifu").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "hoopa").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "mewtwo").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "roaringmoon").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "meowscarada").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "greninja").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "obstagoon").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "gyarados").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "zarude").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "lokix").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "houndstone").learnset.pursuit = ['9M'];
		this.modData("Learnsets", "tinglu").learnset.pursuit = ['9M'];
	}
};
