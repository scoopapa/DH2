export const Formats: {[k: string]: ModdedFormatData} = {
	earthsky: {
		effectType: 'ValidatorRule',
		name: 'Earth & Sky',
		desc: 'The standard ruleset for all Earth & Sky tiers',
		ruleset: [ 'Hidden Move Limit', 'Obtainable', 'Sketch Gen 8 Moves', 'Species Clause', 'Sleep Clause Mod', 'Endless Battle Clause', 'Baton Pass Clause', 'OHKO Clause', 'Z-Move Clause', 'Dynamax Clause',
			'Team Preview', 'Cancel Mod', 'Data Mod', 'Mega Data Mod',],
		onValidateSet(set, format) { //Re-calculate Hidden Power
			if(!set.hpType){
				const hpTypes = [
					'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
					'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark',
				];
				const stats = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
				let hpTypeX = 0;
				let i = 1;
				for (const s in stats) {
					hpTypeX += i * (set.ivs[s] % 2);
					i *= 2;
				}
				set.hpType = hpTypes[Math.min(15,this.dex.trunc(hpTypeX * 16 / 63))];
			}
		},
	},
	egelaspokedex: {
		effectType: 'ValidatorRule',
		name: 'Egelas Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Egelas Region (Earth/Sky)",
		onValidateSet(set, format) {
			const egelasDex = [
				"Caeleaf","Sprop","Graecust","Iguava","Chucklava","Helmuana","Newtiny","Ruggeft","Claymander","Palrat","Spectrat","Shinx","Luxio","Luxray","Stunky","Skuntank","Fanfowl","Plumifowl","Pealated","Hoothoot-Egelas","Noctowl-Egelas","Toybot","Aibot","Utilitron","Utilitron-Boat","Utilitron-Copter","Trubbish","Garbodor","Faerunee","Caterpie","Metapod","Butterfree","Budew","Roselia","Roserade","Sothodil","Sosphodel","Gulpin","Swalot","Montura","Twintura","Silvurah","Burrorm","Burryrm","Scarabouch","Deerling","Sawsbuck","Azurill","Marill","Azumarill","Ballooffalo","Slowpoke","Slowbro","Slowking","Magikarp","Gyarados","Tigrissle","Beedive","Basculin","Basculin-Blue-Striped","Pikeral","Pikeral-Blue-Striped","Feebas","Milotic","Slakoth","Vigoroth","Slaking","Bounsweet","Steenee","Tsareena","Lithoshroom","Litholich","Geodude","Graveler","Golem","Sableye","Mawile","Rugblin","Runogre","Growlithe","Arcanine","Houndour","Houndoom","Joroo","Jaquol","Thylone","Axew","Fraxure","Haxorus","Fletchling","Fletchinder","Talonflame","Blitzle","Zebstrika","Falinks","Cufant","Copperajah","Phanpy","Donphan","Teddiursa","Ursaring","Trigenee","Hexyon","Hektillion","Termill","Terrazor","Heracross","Pinsir","Rockruff","Lycanroc","Lycanroc-Midnight","Lycanroc-Twilight","Elpine","Freezelk","Moorfrost","Snover","Abomasnow","Swinub","Piloswine","Mamoswine","Vanillite","Vanillish","Vanilluxe","Smoochum","Jynx","Zubat","Golbat","Crobat","Noibat","Noivern","Dunsparce","Drampa","Minior","Prominoid","Cryogonal","Riolu","Lucario","Zorua","Zoroark","Igglybuff","Jigglypuff","Wigglytuff","Delibird-Egelas","Tynamo","Eelektrik-Egelas","Eelektross-Egelas","Elekid","Electabuzz","Electivire","Milcery","Alcremie","Inkay","Malamar","Croagunk","Toxicroak","Farfetch\u2019d","Kendo\u2019no","Deino","Zweilous","Hydreigon","Joltik","Galvantula","Lemurod","Sandygast","Palossand","Crabrawler","Crabominable","Exeggcute","Exeggutor-Alola","Tropius","Wingull","Pelipper","Antarctross","Shellder","Cloyster","Finneon","Lumineon","Gobellos","Dragobellos","Plecuum","Vorplec","Pyukumuku","Pincurchin","Lioxin","Frillish","Jellicent","Scrunge","Dhelmise","Cuttlelass","Dreadnautilus","Kravokalypse","Cubone-Egelas","Marowak-Alola","Duskull","Dusclops","Dusknoir","Ralts","Kirlia","Gardevoir","Gallade","Elgyem","Beheeyem","Unown","Sigilyph","Roggenrola","Boldore","Gigalith","Carbink","Stegrowth","Stegrove","Angkol","Macedon","Tauros-Egelas","Miltank-Egelas","Durant-Egelas","Heatmor-Egelas","Ponyta-Egelas","Rapidash-Egelas","Mienfoo","Mienshao","Ascelyte","Paraiagon","Absol","Helioptile","Heliolisk","Silicobra","Sandaconda","Obelith","Pyramyth","Magby","Magmar","Magmortar","Torkoal","Turtonator","Moroth","Keelmora","Yamask","Cofagrigus","Bronzor","Bronzong","Honedge","Doublade","Aegislash","Druddigon","Deceuceus","Fervintill","Selervis","Helyrion","Daedestus","Apherove","Poleboar","Pallatinel","Jurotera","Oceides","Hatar","Zuros","Norphaval"
			];
			const species = this.dex.getSpecies(set.species || set.name);
			if (!egelasDex.includes(species.name)) {
				return [species.name + " is not in the Egelan Pokedex."];
			}
		},
	},
	hiddenmovelimit: {
		effectType: 'ValidatorRule',
		name: 'Hidden Move Limit',
		desc: "Ensures that no more than one Hidden Move is known per Pok&eacute;mon family and that forme/evolution-exclusive Hidden Moves are respected.",
		onValidateTeam(team) {
			const learnedHiddenTable: Pokemon[] = []; //List of Pokemon on the team with Hidden Moves
			const problems: string[] = [];
			for (const set of team) {
				if (set.moves) {
					const pokemon = this.dex.getSpecies(set.species || set.name);
					const prevo = (pokemon.prevo) ? this.dex.getSpecies(pokemon.prevo) : undefined;
					let isHidden = false;
					for (const moveID of set.moves) {
						let pokeLearnset = this.dex.getLearnsetData(pokemon.id);
						if(!pokeLearnset.learnset){
							pokeLearnset = this.dex.getLearnsetData(this.dex.getSpecies(pokemon.baseSpecies).id);
						}
						const pokeLearnsMove = pokeLearnset.learnset[moveID];
						//console.log(pokemon + " knows " + moveID + " with means " + pokeLearnsMove);
						if(pokeLearnsMove == "8D"){
							if(isHidden){ //Since it can't know the same move twice, it must have gotten it from a family member, and exclusive ones are taken care of.
								problems.push(`${pokemon} can't know ${this.dex.getMove(moveID)} because it already knows a Hidden Move.`);
							} else {
								isHidden = true;
							}
						} else if(pokeLearnsMove === undefined){
							let isNatural = false; //whether it's learned through Sketch
							//console.log("This move is not naturally learned by this stage or form");
							if(pokemon.changesFrom && pokemon.name !== pokemon.changesFrom){ //There is a base forme
								let baseLearns = this.dex.getLearnsetData(this.dex.getSpecies(pokemon.changesFrom).id).learnset[moveID];
								//if(pokemon.changesFrom) console.log("Base form is " + pokemon.changesFrom + " and its accessibility to " + moveID + " is " + baseLearns);
								if(baseLearns) isNatural = true;
								if(baseLearns == "8D"){ //This move is base forme's Hidden Move
									if(pokemon.exclusiveHidden) { //and the Pokemon can't learn it
										problems.push(`${pokemon} can't learn ${this.dex.getMove(moveID)} because it is ${pokemon.baseSpecies}'s exclusive Hidden Move.`);
									} else {
										if(isHidden){
											problems.push(`${pokemon} can't know ${this.dex.getMove(moveID)} because it already knows a Hidden Move.`);
										} else {
											isHidden = true;
										}
									}
								}
							}
							if(prevo){
								let prevoLearns = this.dex.getLearnsetData(prevo.id).learnset[moveID];
								//console.log("Prevo is " + prevo.name + " and its accessibility to " + moveID + " is " + prevoLearns);
								if(prevoLearns) isNatural = true;
								if(prevoLearns == "8D"){//This move is prevo's Hidden Move
									if(pokemon.exclusiveHidden) { //and the Pokemon can't learn it
										problems.push(`${pokemon} can't learn ${this.dex.getMove(moveID)} because it is ${prevo}'s exclusive Hidden Move.`);
									} else {
										if(isHidden){
											problems.push(`${pokemon} can't know ${this.dex.getMove(moveID)} because it already knows a Hidden Move.`);
										} else {
											isHidden = true;
										}
									}
								} else if (this.dex.getLearnsetData(prevo.id).learnset[moveID] === undefined){ //The prevo can't learn it either, therefore...
									const first = (prevo.prevo) ? this.dex.getSpecies(prevo.prevo) : undefined; //there must be a first stage
									if(first){
										let firstLearns = this.dex.getLearnsetData(first.id).learnset[moveID];
										//console.log("First stage is " + first.name + " and its accessibility to " + moveID + " is " + firstLearns);
										if(firstLearns) isNatural = true;
										if(firstLearns == "8D") {//This move is first stage's Hidden Move
											if(pokemon.exclusiveHidden || prevo.exclusiveHidden) { //and the Pokemon can't learn it
												problems.push(`${pokemon} can't learn ${this.dex.getMove(moveID)} because it is ${first}'s exclusive Hidden Move.`);
											} else {
												if(isHidden){
													problems.push(`${pokemon} can't know ${this.dex.getMove(moveID)} because it already knows a Hidden Move.`);
												} else {
													isHidden = true;
												}
											}
										}
									}
								}
							}
							//if(!isNatural) console.log("This move is learned through Sketch");
							if(!isNatural && pokeLearnset.learnset['sketch'] == "8D"){ //Move is Sketched and Sketch is the Hidden Move, so move counts as Hidden too
								if(isHidden){
									problems.push(`${pokemon} can't sketch ${this.dex.getMove(moveID)} because Sketch is its Hidden Move and it already knows a sketched move.`);
								} else {
									isHidden = true;
								}
							}
						}
					}
					if(isHidden){ //Pokemon knows a Hidden Move, therefore we must ensure no one else in its family knows one
						//We start by constructing a family tree
						const family: Species[] = [];
						let base = pokemon; //Get the base Pokemon in the family
						if(prevo){
							if(prevo.prevo) base = this.dex.getSpecies(prevo.prevo);
							else base = prevo;
						}
						if(base.name !== base.baseSpecies) base = this.dex.getSpecies(base.baseSpecies);
						family.push(base.name);
						//console.log("Creating " + base.name + " family");
						if(base.evos){
							for(let evo of base.evos){
								if(!family.includes(evo)){
									//console.log("Adding " + evo);
									family.push(evo);
									const evoMon = this.dex.getSpecies(evo);
									if(evoMon.evos){
										for(let evoFinal of evoMon.evos){
											//console.log("Adding " + evoFinal);
											family.push(evoFinal);
											const evoFinalMon = this.dex.getSpecies(evoFinal);
											if(evoFinalMon.otherFormes){
												for(let evoFinalForme of evoFinalMon.otherFormes){
													//console.log("Adding " + evoFinalForme);
													family.push(evoFinalForme);
												}
											}
										}
									}
									if(evoMon.otherFormes){
										for(let evoForme of evoMon.otherFormes) {
											if(!family.includes(evoForme)){
												//console.log("Adding " + evoForme);
												family.push(evoForme);
												const evoMonForme = this.dex.getSpecies(evoForme);
												if(evoMonForme.evos){
													for(let evoFormeFinal of evoMonForme.evos){
														if(!family.includes(evoFormeFinal)){
															//console.log("Adding " + evoFormeFinal);
															family.push(evoFormeFinal);
														}
													}
												}
											}
										}
									}
								}
							}
						} if (base.otherFormes){
							for(let forme of base.otherFormes){
								//console.log("Adding " + forme);
								family.push(forme);
								const formeMon = this.dex.getSpecies(forme);
								if(formeMon.evos){
									for(let formeEvo of formeMon.evos){
										if(!family.includes(formeEvo)){
											//console.log("Adding " + formeEvo);
											family.push(formeEvo);
											const formeEvoMon = this.dex.getSpecies(formeEvo);
											if(formeEvoMon.evos){
												for(let formeEvoFinal of formeEvoMon.evos)
													if(!family.includes(formeEvoFinal)){
														//console.log("Adding " + formeEvoFinal);
														family.push(formeEvoFinal);
													}
											}
											if(formeEvoMon.otherFormes){
												for(let formeEvoForme of formeEvoMon.otherFormes)
													if(!family.includes(formeEvoForme)){
														//console.log("Adding " + formeEvoForme);
														family.push(formeEvoForme);
													}
												//There are currently no cases of a Pokemon only evolving in an alternate form into a Pokemon that itself only evolves in an alternate form. Thank goodness.
											}
										}
									}
								}
							}
						}
						//console.log("Full family:");
						//console.log(family);
						//Then we make sure none of them are in this team and know a Hidden Move
						for(const poke of learnedHiddenTable){
							if(poke.baseSpecies === pokemon.baseSpecies) //normally useless with Species Clause, but I turned it off during testing and maybe Custom Battles will exist or something
								problems.push(`No more than one ${pokemon.baseSpecies} can know its Hidden Move.`);
							else if(family.includes(poke.name))
								problems.push(`${poke.name} and ${pokemon.name} cannot both know their Hidden Moves because they are in the same family.`);
						}
						learnedHiddenTable.push(pokemon);
					}
				}
			}
			return problems;
		},
	},
};
