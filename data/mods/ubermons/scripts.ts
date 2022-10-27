export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		//Changes
		this.modData('Learnsets', 'landorus').learnset.airslash = ['8L1'];
		
		this.modData('Learnsets', 'shaymin').learnset.knockoff = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.taunt = ['8L1'];
		
		delete this.modData('Learnsets', 'genesect').learnset.blizzard;
		delete this.modData('Learnsets', 'genesect').learnset.thunder;
		delete this.modData('Learnsets', 'genesect').learnset.thunderbolt;
		
		delete this.modData('Learnsets', 'dreepy').learnset.fireblast;
		delete this.modData('Learnsets', 'dreepy').learnset.hydropump;
		delete this.modData('Learnsets', 'dreepy').learnset.thunder;
		delete this.modData('Learnsets', 'dreepy').learnset.phantomforce;
		delete this.modData('Learnsets', 'drakloak').learnset.fireblast;
		delete this.modData('Learnsets', 'drakloak').learnset.hydropump;
		delete this.modData('Learnsets', 'drakloak').learnset.thunder;
		delete this.modData('Learnsets', 'drakloak').learnset.phantomforce;
		delete this.modData('Learnsets', 'dragapult').learnset.fireblast;
		delete this.modData('Learnsets', 'dragapult').learnset.hydropump;
		delete this.modData('Learnsets', 'dragapult').learnset.thunder;
		delete this.modData('Learnsets', 'dragapult').learnset.phantomforce;
		this.modData('Learnsets', 'dragapult').learnset.shadowclaw = ['8L1'];
		this.modData('Learnsets', 'dragapult').learnset.nightslash = ['8L1'];
		
		delete this.modData('Learnsets', 'spectrier').learnset.nastyplot;
		
		delete this.modData('Learnsets', 'groudon').learnset.eruption;
		
		delete this.modData('Learnsets', 'kyogre').learnset.waterspout;
		this.modData('Learnsets', 'kyogre').learnset.flipturn = ['8L1'];
		this.modData('Learnsets', 'kyogre').learnset.earthpower = ['8L1'];
		
		delete this.modData('Learnsets', 'rayquaza').learnset.vcreate;
		
		this.modData('Learnsets', 'deoxys').learnset.topsyturvy = ['8L1'];
		//delete this.modData('Learnsets', 'deoxys').learnset.spikes;
		delete this.modData('Learnsets', 'deoxys').learnset.nastyplot;
		//delete this.modData('Learnsets', 'deoxys').learnset.superpower;
		//delete this.modData('Learnsets', 'deoxys').learnset.extremespeed;
		delete this.modData('Learnsets', 'deoxys').learnset.magiccoat;
		//delete this.modData('Learnsets', 'deoxys').learnset.taunt;
		//delete this.modData('Learnsets', 'deoxys').learnset.focusblast;
		delete this.modData('Learnsets', 'deoxys').learnset.drainpunch;
		delete this.modData('Learnsets', 'deoxys').learnset.brickbreak;
		delete this.modData('Learnsets', 'deoxys').learnset.agility;
		
		this.modData('Learnsets', 'darmanitangalar').learnset.switcheroo = ['8L1'];
		
		delete this.modData('Learnsets', 'kangaskhan').learnset.seismictoss;
		
		delete this.modData('Learnsets', 'alakazam').learnset.nastyplot;
		
		this.modData('Learnsets', 'beldum').learnset.heavyslam = ['8L1'];
		this.modData('Learnsets', 'beldum').learnset.heatcrash = ['8L1'];
		
		delete this.modData('Learnsets', 'squirtle').learnset.shellsmash;
		delete this.modData('Learnsets', 'wartortle').learnset.shellsmash;
		delete this.modData('Learnsets', 'blastoise').learnset.shellsmash;
		this.modData('Learnsets', 'squirtle').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'squirtle').learnset.vacuumwave = ['8L1'];
		
		delete this.modData('Learnsets', 'lugia').learnset.calmmind;
		this.modData('Learnsets', 'lugia').learnset.workup = ['8L1'];
		
		delete this.modData('Learnsets', 'pheromosa').learnset.tripleaxel;
		delete this.modData('Learnsets', 'pheromosa').learnset.quiverdance;
		delete this.modData('Learnsets', 'pheromosa').learnset.blizzard;
		
		delete this.modData('Learnsets', 'magearna').learnset.agility;
		delete this.modData('Learnsets', 'magearna').learnset.shiftgear;
		delete this.modData('Learnsets', 'magearna').learnset.calmmind;
		delete this.modData('Learnsets', 'magearna').learnset.focusblast;
		delete this.modData('Learnsets', 'magearna').learnset.aurasphere;
		delete this.modData('Learnsets', 'magearna').learnset.icebeam;
		delete this.modData('Learnsets', 'magearna').learnset.aurorabeam;
		delete this.modData('Learnsets', 'magearnaoriginal').learnset.agility;
		delete this.modData('Learnsets', 'magearnaoriginal').learnset.shiftgear;
		delete this.modData('Learnsets', 'magearnaoriginal').learnset.calmmind;
		delete this.modData('Learnsets', 'magearnaoriginal').learnset.focusblast;
		delete this.modData('Learnsets', 'magearnaoriginal').learnset.aurasphere;
		delete this.modData('Learnsets', 'magearnaoriginal').learnset.icebeam;
		delete this.modData('Learnsets', 'magearnaoriginal').learnset.aurorabeam;
		
		this.modData('Learnsets', 'reshiram').learnset.uturn = ['8L1'];
		
		this.modData('Learnsets', 'zekrom').learnset.knockoff = ['8L1'];
		
		this.modData('Learnsets', 'mudkip').learnset.fissure = ['8L1'];
		this.modData('Learnsets', 'beldum').learnset.fissure = ['8L1'];
		this.modData('Learnsets', 'gible').learnset.fissure = ['8L1'];
		this.modData('Learnsets', 'zekrom').learnset.fissure = ['8L1'];
		this.modData('Learnsets', 'dracozolt').learnset.fissure = ['8L1'];
		this.modData('Learnsets', 'dracovish').learnset.fissure = ['8L1'];
		
		this.modData('Learnsets', 'honedge').learnset.horndrill = ['8L1'];
		this.modData('Learnsets', 'pawniard').learnset.horndrill = ['8L1'];
		
		this.modData('Learnsets', 'zigzagoongalar').learnset.guillotine = ['8L1'];
		this.modData('Learnsets', 'tauros').learnset.guillotine = ['8L1'];
		
		this.modData('Learnsets', 'darumakagalar').learnset.sheercold = ['8L1'];
		this.modData('Learnsets', 'vulpixalola').learnset.sheercold = ['8L1'];
		this.modData('Learnsets', 'arctozolt').learnset.sheercold = ['8L1'];
		this.modData('Learnsets', 'arctovish').learnset.sheercold = ['8L1'];
		this.modData('Learnsets', 'typenull').learnset.sheercold = ['8L1'];
		this.modData('Learnsets', 'snom').learnset.sheercold = ['8L1'];
		this.modData('Learnsets', 'glaceon').learnset.sheercold = ['8L1'];
		
		this.modData('Learnsets', 'necrozma').learnset.crunch = ['8L1'];
		delete this.modData('Learnsets', 'necrozma').learnset.knockoff;
		delete this.modData('Learnsets', 'necrozma').learnset.dragondance;
		
		delete this.modData('Learnsets', 'dialga').learnset.icebeam;
		delete this.modData('Learnsets', 'dialga').learnset.blizzard;
		this.modData('Learnsets', 'dialga').learnset.meteorbeam = ['8L1'];
		this.modData('Learnsets', 'dialga').learnset.magicroom = ['8L1'];
		this.modData('Learnsets', 'dialga').learnset.wonderroom = ['8L1'];
		
		this.modData('Learnsets', 'palkia').learnset.aquajet = ['8L1'];
		this.modData('Learnsets', 'palkia').learnset.flipturn = ['8L1'];
		
		this.modData('Learnsets', 'giratina').learnset.flamethrower = ['8L1'];
		this.modData('Learnsets', 'giratina').learnset.fireblast = ['8L1'];
		
		this.modData('Learnsets', 'solgaleo').learnset.firelash = ['8L1'];
		
		this.modData('Learnsets', 'lunala').learnset.spiritbreak = ['8L1'];
		
		delete this.modData('Learnsets', 'xerneas').learnset.focusblast;
		
		this.modData('Learnsets', 'yveltal').learnset.nastyplot = ['8L1'];
		
		delete this.modData('Learnsets', 'zygarde').learnset.coil;
		delete this.modData('Learnsets', 'zygarde').learnset.dragondance;
		this.modData('Learnsets', 'zygarde').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'zygarde').learnset.flamethrower = ['8L1'];
		this.modData('Learnsets', 'zygarde').learnset.sludgebomb = ['8L1'];
		
		this.modData('Learnsets', 'calyrex').learnset.recycle = ['8L1'];
		this.modData('Learnsets', 'calyrex').learnset.teatime = ['8L1'];
		this.modData('Learnsets', 'calyrexice').learnset.recycle = ['8L1'];
		this.modData('Learnsets', 'calyrexice').learnset.teatime = ['8L1'];
		this.modData('Learnsets', 'calyrexshadow').learnset.recycle = ['8L1'];
		this.modData('Learnsets', 'calyrexshadow').learnset.teatime = ['8L1'];
		delete this.modData('Learnsets', 'calyrex').learnset.calmmind;
		delete this.modData('Learnsets', 'calyrexice').learnset.calmmind;
		delete this.modData('Learnsets', 'calyrexshadow').learnset.calmmind;
		delete this.modData('Learnsets', 'calyrexshadow').learnset.nastyplot;
		
		delete this.modData('Learnsets', 'zacian').learnset.closecombat;
		this.modData('Learnsets', 'zacian').learnset.secretsword = ['8L1'];
		
		this.modData('Learnsets', 'zamazenta').learnset.toxic = ['8L1'];
		this.modData('Learnsets', 'zamazenta').learnset.bodypress = ['8L1'];
		this.modData('Learnsets', 'zamazenta').learnset.knockoff = ['8L1'];
		
		this.modData('Learnsets', 'arceus').learnset.storedpower = ['8L1'];
		this.modData('Learnsets', 'arceus').learnset.leechseed = ['8L1'];
		
		this.modData('Learnsets', 'torchic').learnset.roost = ['8L1'];
		
		this.modData('Learnsets', 'riolu').learnset.triplekick = ['8L1'];
		
		delete this.modData('Learnsets', 'tornadus').learnset.nastyplot;
		
		delete this.modData('Learnsets', 'darkrai').learnset.sludgebomb;
		delete this.modData('Learnsets', 'darkrai').learnset.nastyplot;
		
		delete this.modData('Learnsets', 'poipole').learnset.nastyplot;
		delete this.modData('Learnsets', 'naganadel').learnset.nastyplot;
		delete this.modData('Learnsets', 'naganadel').learnset.dragondance;
		this.modData('Learnsets', 'poipole').learnset.earthquake = ['8L1'];
		this.modData('Learnsets', 'poipole').learnset.firstimpression = ['8L1'];
	},
	
	pokemon: {
		ignoringItem() {
			return !!((this.battle.gen >= 5 && !this.isActive) ||
            (this.hasAbility(['klutz', 'gorillatactics']) && !this.getItem().ignoreKlutz) ||
            this.volatiles['embargo'] || this.volatiles['dynamax'] || this.battle.field.pseudoWeather['magicroom']);
		}
	},
	
	canMegaEvo(pokemon) {
		const species = pokemon.baseSpecies;
		const altForme = species.otherFormes && this.dex.getSpecies(species.otherFormes[0]);
		const item = pokemon.getItem();
		// Mega Rayquaza
		if ((this.gen <= 7 || this.ruleTable.has('standardnatdex') || this.ruleTable.has('standarddoubles')) &&
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove) {
			return altForme.name;
		}
		// a hacked-in Megazard X can mega evolve into Megazard Y, but not into Megazard X
		if (item.megaEvolves === species.baseSpecies && item.megaStone !== species.name) {
			return item.megaStone;
		}
		return null;
	},
	
	//New functions
	/*doMaxBoostFormeChange(pokemon, isPermanent){
		if (!pokemon.hasDynamaxed) return;
		let template = this.dex.deepClone(pokemon.species);
		if (pokemon.lastFormeBoosted !== pokemon.species.forme){ // don't boost the same forme twice in a row
			for (let statName in template.baseStats){
				let boost = this.getMaxBoost(statName, pokemon);
				template.baseStats[statName] = template.baseStats[statName] + boost;
			}
		}
		pokemon.lastFormeBoosted = pokemon.species.forme;
		pokemon.formeChange(template, "dynamax", isPermanent);
	},
	
	newGMaxPower(move){
		let oldMaxPowers = [100, 110, 120, 130, 140, 150];
		let weakMaxPowers = [70, 75, 80, 85, 90, 95];
		let maxPowers = [80, 90, 100, 110, 120, 130];
		let gmaxPower = [100, 110, 120, 130, 140, 150];
		for (const i in oldMaxPowers){
			if (!move.basePower) {
				return gmaxPower;
			} else if (!move.maxMove?.basePower){
				return null;
			} else if (['Fighting', 'Poison'].includes(move.type)) {
				return move.maxMove?.basePower;
			} else if (['Flying'].includes(move.type)) {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						gmaxPower = weakMaxPowers[i]
						break
					}
				}
			} else {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						gmaxPower = maxPowers[i]
						break
					}
				}
			}
			return gmaxPower;
		}
	},*/
};
