export const Scripts: ModdedBattleScriptsData = {
	inherit: 'glacemons',
	gen: 9,
	teambuilderConfig: {
		customTiers: ['Adjusted', 'Uber OU', '(Uber OU)', 'Uber UUBL', 'Uber UU', 'Uber RUBL', 'Uber RU'],
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
		// slate 2
		this.modData("Learnsets", "necrozmadawnwings").learnset.moonblast = ['9L1'];
		this.modData("Learnsets", "necrozmadawnwings").learnset.uturn = ['9L1'];
		this.modData("Learnsets", "necrozmadawnwings").learnset.drainingkiss = ['9L1'];
		this.modData("Learnsets", "necrozmadawnwings").learnset.quicksanddrain = ['9L1'];
		this.modData("Learnsets", "necrozmadawnwings").learnset.clearsmog = ['9L1'];
		this.modData("Learnsets", "necrozmadawnwings").learnset.salvestrike = ['9L1'];
		this.modData("Learnsets", "necrozmadawnwings").learnset.playrough = ['9L1'];
		// courtchange 
		this.modData('Learnsets', 'tinglu').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'zamazenta').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'smeargle').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'necrozma').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'steelix').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'celesteela').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'skarmory').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'toxapex').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'deoxys').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'pheromosa').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'garganacl').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'mandibuzz').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'corviknight').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'wochien').learnset.courtchange = ['9L1'];
		this.modData('Learnsets', 'magearna').learnset.courtchange = ['9L1'];
		// rockthrow 
		this.modData('Learnsets', 'regirock').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'tinglu').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'ursaluna').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'diancie').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'runerigus').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'landorus').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'stakataka').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'steelix').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'aggron').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'solgaleo').learnset.rockthrow = ['9L1'];
		this.modData('Learnsets', 'ferrothorn').learnset.rockthrow = ['9L1'];
		// fairywind 
		this.modData('Learnsets', 'xerneas').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'lunala').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'necrozmadawnwings').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'hooh').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'fluttermane').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'fezandipiti').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'tapukoko').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'tapulele').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'tapubulu').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'tapufini').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'florges').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'magearna').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'floetteeternal').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'audino').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'taurospaldeacombat').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'diancie').learnset.fairywind = ['9L1'];
		this.modData('Learnsets', 'cofagrigus').learnset.fairywind = ['9L1'];
		// mountaingale 
		this.modData('Learnsets', 'regice').learnset.mountaingale = ['9L1'];
		this.modData('Learnsets', 'dondozo').learnset.mountaingale = ['9L1'];
		this.modData('Learnsets', 'palkia').learnset.mountaingale = ['9L1'];
		this.modData('Learnsets', 'chienpao').learnset.mountaingale = ['9L1'];
		this.modData('Learnsets', 'kyurem').learnset.mountaingale = ['9L1'];
		this.modData('Learnsets', 'kyuremblack').learnset.mountaingale = ['9L1'];
		this.modData('Learnsets', 'kyuremwhite').learnset.mountaingale = ['9L1'];
		this.modData('Learnsets', 'avalugg').learnset.mountaingale = ['9L1'];
		this.modData('Learnsets', 'glastrier').learnset.mountaingale = ['9L1'];
		this.modData('Learnsets', 'calyrexice').learnset.mountaingale = ['9L1'];
		// circlethrow 
		this.modData('Learnsets', 'arceus').learnset.circlethrow = ['9L1'];
		this.modData('Learnsets', 'marshadow').learnset.circlethrow = ['9L1'];
		this.modData('Learnsets', 'annihilape').learnset.circlethrow = ['9L1'];
		this.modData('Learnsets', 'okidogi').learnset.circlethrow = ['9L1'];
		this.modData('Learnsets', 'blaziken').learnset.circlethrow = ['9L1'];
		this.modData('Learnsets', 'ursaluna').learnset.circlethrow = ['9L1'];
		this.modData('Learnsets', 'ursalunabloodmoon').learnset.circlethrow = ['9L1'];
		this.modData('Learnsets', 'sneasler').learnset.circlethrow = ['9L1'];
		this.modData('Learnsets', 'buzzwole').learnset.circlethrow = ['9L1'];
		this.modData('Learnsets', 'zamazenta').learnset.circlethrow = ['9L1'];
	}
};
