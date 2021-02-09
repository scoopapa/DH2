export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init() {
		for (const pkmnid in this.data.Learnsets) {
			let preHomeDist = ['toxic', 'knockoff'];
			const learnset = this.data.Learnsets[pkmnid].learnset;
			for (const i in preHomeDist) {
				if (learnset && learnset[preHomeDist[i]]) {
					let gLearn = false
					for (const j in learnset[preHomeDist[i]]) {
						const learnType = learnset[preHomeDist[i]][j];
						if (learnType.includes('8') && !learnType.includes('V')) gLearn = true;
					}
					if (!gLearn) delete this.modData('Learnsets', pkmnid).learnset[preHomeDist[i]];
				}
			}
		}
		
		//These are in roughly chronological order by slate
		// Butterfree
		this.modData('Learnsets', 'butterfree').learnset.dazzlinggleam = ['8L1'];
		this.modData('Learnsets', 'butterfree').learnset.defog = ['8L1'];
		this.modData('Learnsets', 'butterfree').learnset.moonblast = ['8L1'];
		
		// Kingler
		this.modData('Learnsets', 'kingler').learnset.closecombat = ['8L1'];
		this.modData('Learnsets', 'kingler').learnset.earthquake = ['8L1'];
		this.modData('Learnsets', 'kingler').learnset.stoneedge = ['8L1'];
		
		// Seaking
		this.modData('Learnsets', 'seaking').learnset.aquajet = ['8L1'];
		this.modData('Learnsets', 'seaking').learnset.drillpeck = ['8L1'];
		
		// Garbodor
		this.modData('Learnsets', 'garbodor').learnset.earthquake = ['8L1'];
		this.modData('Learnsets', 'garbodor').learnset.irontail = ['8L1'];
		this.modData('Learnsets', 'garbodor').learnset.knockoff = ['8L1'];
		this.modData('Learnsets', 'garbodor').learnset.stealthrock = ['8L1'];
		
		// Pikachu
		delete this.modData('Learnsets', 'pikachu').learnset.extremespeed;
		delete this.modData('Learnsets', 'pikachu').learnset.nastyplot;
		
		// Flapple
		this.modData('Learnsets', 'flapple').learnset.crunch = ['8L1'];
		this.modData('Learnsets', 'flapple').learnset.refresh = ['8L1'];
		
		// Appletun
		this.modData('Learnsets', 'appletun').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'appletun').learnset.toxic = ['8L1'];
		
		// Qwilfish
		this.modData('Learnsets', 'qwilfish').learnset.recover = ['8L1'];
		
		// Pincurchin
		this.modData('Learnsets', 'pincurchin').learnset.spikyshield = ['8L1'];
		this.modData('Learnsets', 'pincurchin').learnset.taunt = ['8L1'];
		this.modData('Learnsets', 'pincurchin').learnset.voltswitch = ['8L1'];
		
		// Rotom
		this.modData('Learnsets', 'rotom').learnset.aurasphere = ['8L1'];
		this.modData('Learnsets', 'rotom').learnset.rapidspin = ['8L1'];
		this.modData('Learnsets', 'rotom').learnset.sludgebomb = ['8L1'];
		
		// Charizard
		this.modData('Learnsets', 'charizard').learnset.closecombat = ['8L1'];
		
		// Silvally
		this.modData('Learnsets', 'silvally').learnset.recover = ['8L1'];
		
		// Weezing-Galar
		this.modData('Learnsets', 'weezinggalar').learnset.toxicthread = ['8L1'];
		this.modData('Learnsets', 'weezinggalar').learnset.banefulbunker = ['8L1'];
		this.modData('Learnsets', 'weezinggalar').learnset.acidarmor = ['8L1'];
		this.modData('Learnsets', 'weezinggalar').learnset.wonderroom = ['8L1'];
		this.modData('Learnsets', 'weezinggalar').learnset.sunnyday = ['8L1'];
		
		// Gloom
		this.modData('Learnsets', 'gloom').learnset.toxicspikes = ['8M'];
		
		// Melmetal
		delete this.modData('Learnsets', 'melmetal').learnset.superpower;
		delete this.modData('Learnsets', 'melmetal').learnset.bodypress;
		delete this.modData('Learnsets', 'melmetal').learnset.brickbreak;
		this.modData('Learnsets', 'melmetal').learnset.bulkup = ['8L1'];
		
		// Persian-Kanto
		this.modData('Learnsets', 'persian').learnset.crunch = ['8L1'];
		this.modData('Learnsets', 'persian').learnset.flamewheel = ['8L1'];
		
		// Meowstic
		this.modData('Learnsets', 'meowstic').learnset.defog = ['8L1'];
		this.modData('Learnsets', 'meowstic').learnset.taunt = ['8L1'];
		
		// Meowstic F
		this.modData('Learnsets', 'meowsticf').learnset.aurasphere = ['8L1'];
		this.modData('Learnsets', 'meowsticf').learnset.taunt = ['8L1'];
		
		// Luxray
		this.modData('Learnsets', 'luxray').learnset.zingzap = ['8L1'];
		this.modData('Learnsets', 'luxray').learnset.bulkup = ['8L1'];
		
		// Bouffalant
		this.modData('Learnsets', 'bouffalant').learnset.flareblitz = ['8L1'];
		
		// Sky Uppercut
		this.modData('Learnsets', 'mankey').learnset.skyuppercut = ['8L1'];
		this.modData('Learnsets', 'primeape').learnset.skyuppercut = ['8L1'];
		this.modData('Learnsets', 'poliwrath').learnset.skyuppercut = ['8L1'];
		this.modData('Learnsets', 'grapploct').learnset.skyuppercut = ['8L1'];
		this.modData('Learnsets', 'clobbopus').learnset.skyuppercut = ['8L1'];
		delete this.modData('Learnsets', 'kommoo').learnset.skyuppercut;
		delete this.modData('Learnsets', 'hakamoo').learnset.skyuppercut;
		delete this.modData('Learnsets', 'jangmoo').learnset.skyuppercut;
		
		// Pursuit
		this.modData('Learnsets', 'zigzagoongalar').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'linoonegalar').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'obstagoon').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'nickit').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'thievul').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'arrokuda').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'barraskewda').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'grapploct').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'falinks').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'dreepy').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'drakloak').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'dragapult').learnset.pursuit = ['8L1'];
		this.modData('Learnsets', 'zarude').learnset.pursuit = ['8L1'];
		
		// Sonic Boom
		this.modData('Learnsets', 'noibat').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'noivern').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'exploud').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'toxtricity').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'toxtricitylowkey').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'primarina').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'indeedee').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'indeedeef').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'drampa').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'jigglypuff').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.sonicboom = ['8L1'];
		
		// Trump Card
		this.modData('Learnsets', 'indeedeef').learnset.trumpcard = ['8L1'];
		this.modData('Learnsets', 'mimejr').learnset.trumpcard = ['8L1'];
		this.modData('Learnsets', 'mrmime').learnset.trumpcard = ['8L1'];
		this.modData('Learnsets', 'mrmimegalar').learnset.trumpcard = ['8L1'];
		this.modData('Learnsets', 'mrrime').learnset.trumpcard = ['8L1'];
		this.modData('Learnsets', 'silvally').learnset.trumpcard = ['8L1'];
		this.modData('Learnsets', 'keldeo').learnset.trumpcard = ['8L1'];
		
		// Regirock
		this.modData('Learnsets', 'regirock').learnset.bulkup = ['8L1'];
		this.modData('Learnsets', 'regirock').learnset.shoreup = ['8L1'];
		
		// Regice
		this.modData('Learnsets', 'regice').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'regice').learnset.freezyfrost = ['8L1'];
		this.modData('Learnsets', 'regice').learnset.dazzlinggleam = ['8L1'];
		this.modData('Learnsets', 'regice').learnset.rapidspin = ['8L1'];
		
		// Registeel
		this.modData('Learnsets', 'registeel').learnset.icebeam = ['8L1'];
		this.modData('Learnsets', 'registeel').learnset.knockoff = ['8L1'];
		this.modData('Learnsets', 'registeel').learnset.shiftgear = ['8L1'];
		this.modData('Learnsets', 'registeel').learnset.painsplit = ['8L1'];
		
		//Regieleki
		this.modData('Learnsets', 'regieleki').learnset.flashcannon = ['8L1'];
		this.modData('Learnsets', 'regieleki').learnset.smartstrike = ['8L1'];
		this.modData('Learnsets', 'regieleki').learnset.sonicboom = ['8L1'];
		this.modData('Learnsets', 'regieleki').learnset.thundercage = ['8L1'];
		this.modData('Learnsets', 'regieleki').learnset.superpower = ['8L1'];
		
		//Regidrago
		this.modData('Learnsets', 'regidrago').learnset.aurasphere = ['8L1'];
		this.modData('Learnsets', 'regidrago').learnset.fireblast = ['8L1'];
		this.modData('Learnsets', 'regidrago').learnset.flamethrower = ['8L1'];
		this.modData('Learnsets', 'regidrago').learnset.icefang = ['8L1'];
		this.modData('Learnsets', 'regidrago').learnset.poisonfang = ['8L1'];
		this.modData('Learnsets', 'regidrago').learnset.superpower = ['8L1'];
		
		//Regigigas
		this.modData('Learnsets', 'regigigas').learnset.crushgrip = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.dragonclaw = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.dragonpulse = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.flashcannon = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.icebeam = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.meteormash = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.outrage = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.powergem = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.stealthrock = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.triattack = ['8L1'];
		
		//Articuno-Galar
		this.modData('Learnsets', 'articunogalar').learnset.roost = ['8L1'];
		this.modData('Learnsets', 'articunogalar').learnset.icebeam = ['8L1'];
		this.modData('Learnsets', 'articunogalar').learnset.focusblast = ['8L1'];
		
		//Zapdos-Galar
		this.modData('Learnsets', 'zapdosgalar').learnset.roost = ['8L1'];
		this.modData('Learnsets', 'zapdosgalar').learnset.wildcharge = ['8L1'];
		this.modData('Learnsets', 'zapdosgalar').learnset.highjumpkick = ['8L1'];
		
		//Moltres-Galar
		this.modData('Learnsets', 'moltresgalar').learnset.roost = ['8L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.powertrip = ['8L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.flamethrower = ['8L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.bulkup = ['8L1'];
		
		//Crobat
		this.modData('Learnsets', 'crobat').learnset.toxicspikes = ['8L1'];
		this.modData('Learnsets', 'crobat').learnset.sludgewave = ['8L1'];
		this.modData('Learnsets', 'crobat').learnset.clearsmog = ['8L1'];
		
		//Slowking-Galar
		this.modData('Learnsets', 'slowkinggalar').learnset.recover = ['8L1'];
		
		//Urshifu
		delete this.modData('Learnsets', 'urshifu').learnset.suckerpunch;
		delete this.modData('Learnsets', 'urshifurapidstrike').learnset.aquajet;
		
		//Zarude
		this.modData('Learnsets', 'zarude').learnset.knockoff = ['8L1'];
		
		//Glastrier
		this.modData('Learnsets', 'glastrier').learnset.glaciallance = ['8L1'];
		this.modData('Learnsets', 'glastrier').learnset.iceshard = ['8L1'];
		this.modData('Learnsets', 'glastrier').learnset.trickroom = ['8L1'];
		
		//Spectrier
		this.modData('Learnsets', 'spectrier').learnset.astralbarrage = ['8L1'];
		this.modData('Learnsets', 'spectrier').learnset.extrasensory = ['8L1'];
		this.modData('Learnsets', 'spectrier').learnset.gigadrain = ['8L1'];
		delete this.modData('Learnsets', 'spectrier').learnset.nastyplot;
		
		//Cursola
		this.modData('Learnsets', 'cursola').learnset.focusblast = ['8L1'];
		this.modData('Learnsets', 'cursola').learnset.psyshock = ['8L1'];
		this.modData('Learnsets', 'cursola').learnset.thunderwave = ['8L1'];
		
		//Calyrex
		this.modData('Learnsets', 'calyrex').learnset.blizzard = ['8L1'];
		this.modData('Learnsets', 'calyrex').learnset.hex = ['8L1'];
		this.modData('Learnsets', 'calyrex').learnset.teleport = ['8L1'];
		this.modData('Learnsets', 'calyrex').learnset.thunderwave = ['8L1'];
		this.modData('Learnsets', 'calyrex').learnset.teleport = ['8L1'];
		this.modData('Learnsets', 'calyrex').learnset.kingsshield = ['8L1'];
		
		//Zamaenta
		this.modData('Learnsets', 'zamazenta').learnset.behemothbash = ['8L1'];
		this.modData('Learnsets', 'zamazenta').learnset.bodypress = ['8L1'];
		this.modData('Learnsets', 'zamazenta').learnset.haze = ['8L1'];
		this.modData('Learnsets', 'zamazenta').learnset.healingwish = ['8L1'];
		this.modData('Learnsets', 'zamazenta').learnset.moonlight = ['8L1'];
		
		//Zacian
		this.modData('Learnsets', 'zacian').learnset.zacian = ['8L1'];
		this.modData('Learnsets', 'zacian').learnset.behemothblade = ['8L1'];
		delete this.modData('Learnsets', 'zacian').learnset.haze;
		delete this.modData('Learnsets', 'zacian').learnset.healingwish;
		
		//Heatmor
		this.modData('Learnsets', 'heatmor').learnset.spikes = ['8L1'];
		
		//Pangoro
		this.modData('Learnsets', 'pangoro').learnset.machpunch = ['8L1'];
		this.modData('Learnsets', 'pangoro').learnset.suckerpunch = ['8L1'];
		
		//Machamp
		this.modData('Learnsets', 'machamp').learnset.gunkshot = ['8L1'];
		this.modData('Learnsets', 'machamp').learnset.powerwhip = ['8L1'];
		
		//Clefable
		this.modData('Learnsets', 'cleffa').learnset.wish = ["7E", "6E", "5E", "4E", "3E"];
		
		//Vespiquen
		this.modData('Learnsets', 'vespiquen').learnset.stickyweb = ["8L1"];
	},
	//Modded functions
	canDynamax(pokemon, skipChecks) {
		// {gigantamax?: string, maxMoves: {[k: string]: string} | null}[]
		if (!skipChecks) {
			if (!pokemon.canDynamax) return;
			if (pokemon.template.isMega || pokemon.template.isPrimal || pokemon.template.forme === "Ultra" || pokemon.getItem().zMove || this.canMegaEvo(pokemon)) {
				return;
			}
			// Some pokemon species are unable to dynamax
			const cannotDynamax = ['zacian', 'zamazenta', 'eternatus'];
			if (cannotDynamax.includes(toID(pokemon.template.baseSpecies))) {
				return;
			}
		}
		/** @type {DynamaxOptions} */
		let result = {maxMoves: []};
		for ( let moveSlot of pokemon.moveSlots ) {
			if ( !moveSlot.disabled ){
				let move = this.dex.getMove(moveSlot.id);
				let maxMove = this.getMaxMove(move, pokemon);
				if (maxMove) result.maxMoves.push({move: maxMove.id, target: maxMove.target});
			}
		}
		if (pokemon.canGigantamax) result.gigantamax = pokemon.canGigantamax;
		return result;
	},
	getMaxMove(move, pokemon) {
		if (typeof move === 'string') move = this.dex.getMove(move);
		if (move.name === 'Struggle') return move;
		if (pokemon.gigantamax && pokemon.canGigantamax && move.category !== 'Status') {
			const gMaxMove = this.dex.getMove(pokemon.canGigantamax);
			if (gMaxMove.exists && gMaxMove.type === move.type) return gMaxMove;
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
				const gMaxMove = this.dex.getActiveMove(pokemon.canGigantamax);
				if (gMaxMove.exists && gMaxMove.type === move.type) maxMove = gMaxMove;
			}
			if (!move.maxMove?.basePower) throw new Error(`${move.name} doesn't have a maxMove basePower`);
			if (!['gmaxdrumsolo', 'gmaxfireball', 'gmaxhydrosnipe'].includes(maxMove.id)) {
				maxMove.basePower = move.maxMove.basePower;
			}
			maxMove.category = move.category;
		}
		let gmaxPower = this.newGMaxPower( move ); // new max power
		maxMove.basePower = gmaxPower; // bypass old max power
		maxMove.baseMove = move.id;
		// copy the priority for Psychic Terrain, Quick Guard
		maxMove.priority = move.priority;
		maxMove.isZOrMaxPowered = true;
		return maxMove;
	},
	//New functions
	doMaxBoostFormeChange( pokemon, isPermanent ){
		if ( !pokemon.hasDynamaxed ) return;
		let template = this.dex.deepClone( pokemon.species );
		if ( pokemon.lastFormeBoosted !== pokemon.species.forme ){ // don't boost the same forme twice in a row
			for ( let statName in template.baseStats ){
				let boost = this.getMaxBoost( statName, pokemon );
				template.baseStats[ statName ] = template.baseStats[ statName ] + boost;
			}
		}
		pokemon.lastFormeBoosted = pokemon.species.forme;
		pokemon.formeChange(template, "dynamax", isPermanent);
	},
	
	newGMaxPower( move ){
		let oldMaxPowers = [100, 110, 120, 130, 140, 150];
		let weakMaxPowers = [75, 80, 85, 90, 95, 100];
		let maxPowers = [85, 90, 95, 100, 105, 110];
		let gmaxPower = 90;
		if (!move.basePower) {
			return gmaxPower;
		} else if ( !move.maxMove?.basePower ){
			return null;
		} else if (['Fighting', 'Poison'].includes(move.type)) {
			return move.maxMove?.basePower;
		} else if (['Flying'].includes(move.type)) {
			for ( const i in oldMaxPowers ){
				if ( move.maxMove?.basePower === oldMaxPowers[i] ){
					gmaxPower = weakMaxPowers[i]
					break
				}
			}
		} else {
			for ( const i in oldMaxPowers ){
				if ( move.maxMove?.basePower === oldMaxPowers[i] ){
					gmaxPower = maxPowers[i]
					break
				}
			}
		}
		return gmaxPower;
	},
	
	getMaxBoost( statName, pokemon ){
		let statBoosts = {
			dynamax: { hp: 0, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 },
			alcremie: { hp: 0, atk: 0, def: 30, spa: 10, spd: 10, spe: 0 },
			appletun: { hp: 0, atk: 0, def: 30, spa: 20, spd: 0, spe: 0 },
			butterfree: { hp: 0, atk: 0, def: 0, spa: 10, spd: 0, spe: 40 },
			centiscorch: { hp: 0, atk: 20, def: 30, spa: 0, spd: 0, spe: 0 },
			charizard: { hp: 0, atk: 30, def: 0, spa: 10, spd: 0, spe: 10 },
			coalossal: { hp: 0, atk: 0, def: 0, spa: 35, spd: 15, spe: 0 },
			copperajah: { hp: 0, atk: 0, def: 30, spa: 0, spd: 20, spe: 0 },
			corviknight: { hp: 0, atk: 10, def: 10, spa: 0, spd: 30, spe: 0 },
			drednaw: { hp: 0, atk: 25, def: 15, spa: 0, spd: 0, spe: 10 },
			duraludon: { hp: 0, atk: 0, def: 5, spa: 20, spd: 25, spe: 0 },
			eevee: { hp: 0, atk: 50, def: 0, spa: 0, spd: 0, spe: 0 },
			flapple: { hp: 20, atk: 5, def: 10, spa: 0, spd: 10, spe: 5 },
			garbodor: { hp: 0, atk: 10, def: 25, spa: 0, spd: 25, spe: -10 },
			gengar: { hp: 0, atk: 0, def: 25, spa: 10, spd: 15, spe: 0 },
			hatterene: { hp: 0, atk: 10, def: 0, spa: 16, spd: 24, spe: 0 },
			kingler: { hp: 0, atk: 20, def: 0, spa: 0, spd: 0, spe: 30 },
			lapras: { hp: 0, atk: 0, def: 20, spa: 0, spd: 30, spe: 0 },
			machamp: { hp: 0, atk: 30, def: 0, spa: 0, spd: 0, spe: 20 },
			melmetal: { hp: 0, atk: 10, def: 10, spa: 0, spd: 0, spe: 30 },
			meowth: { hp: 0, atk: 5, def: 0, spa: 0, spd: 0, spe: 45 },
			orbeetle: { hp: 0, atk: 0, def: 0, spa: 30, spd: 0, spe: 20 },
			pikachu: { hp: 30, atk: 10, def: 10, spa: 20, spd: 10, spe: -30 },
			sandaconda: { hp: 0, atk: 0, def: 20, spa: 0, spd: 0, spe: 30 },
			toxtricity: { hp: 0, atk: 20, def: 0, spa: 4, spd: 16, spe: 10 },
			toxtricitylowkey: { hp: 0, atk: 20, def: 0, spa: 4, spd: 16, spe: 10 },
			urshifu: { hp: 0, atk: 15, def: 10, spa: 0, spd: 25, spe: 10 },
			urshifurapidstrike: { hp: 0, atk: 10, def: 5, spa: 0, spd: 5, spe: 30 },
		};
		let boostType = statBoosts.dynamax;
		if ( pokemon.gigantamax ) boostType = statBoosts[ pokemon.species.id ];
		let statBoost = boostType[ statName ];
		return statBoost;
	},
};
