export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		for (const id in this.dataCache.Pokedex) {
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset) {
				this.modData('Learnsets', this.toID(id)).learnset.attract = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.endure = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.facade = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.protect = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.rest = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.round = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.sleeptalk = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.snore = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.substitute = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.return = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.frustration = ["8M"];
				this.modData('Learnsets', this.toID(id)).learnset.toxic = ["8M"];
			}
		}
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8L1"];
			}
		}
		newMoves("aggron", ["dragonmight"]);
		newMoves("altaria", ["dragonmight"]);
		newMoves("arceus", ["skittersmack", "lashout", "scaleshot", "risingvoltage", "mistyexplosion", "coaching", "burningjealousy", "dualwingbeat", "poltergeist", "grassyglide", "scorchingsands", "tripleaxel", "terrainpulse", "corrosivegas", "expandingforce", "meteorbeam", "steelroller", "flipturn", "exoskelett", "darknight", "dragonmight", "floatingbolt", "cuddling", "boxtechnique", "firework", "soaringassault", "traumatize", "deeproots", "dustdevil", "freezer", "speciality", "venom", "mindcontrol", "bonecrush", "steelbullet", "saltwater"]);
		newMoves("archen", ["soaringassault", "bonecrush"]);
		newMoves("aron", ["bonecrush"]);
		newMoves("articuno", ["soaringassault", "freezer", "freezingglare"]);
		newMoves("articunogalar", ["soaringassault", "mindcontrol", "roost"]);
		newMoves("audino", ["cuddling"]);
		newMoves("baltoy", ["dustdevil", "mindcontrol"]);
		newMoves("bergmite", ["iceshard", "freezer"]);
		newMoves("blacephalon", ["firework", "traumatize", "darknight", "blueflare", "speciality"]);
		newMoves("blastoise", ["steelbullet"]);
		newMoves("blipbug", ["exoskelett"]);
		newMoves("boldore", ["bonecrush"]);
		newMoves("bonsly", ["irondefense", "headsmash"]);
		newMoves("bounsweet", ["deeproots"]);
		newMoves("braixen", ["traumatize", "mindcontrol"]);
		newMoves("brionne", ["cuddling"]);
		newMoves("bronzor", ["mindcontrol"]);
		newMoves("budew", ["poisonpowder", "poisonsting", "petaldance", "poisonjab", "cuddling", "deeproots"]);
		newMoves("bulbasaur", ["venom", "deeproots"]);
		newMoves("buneary", ["doubleedge", "drainingkiss", "extremespeed", "slackoff", "cuddling"]);
		newMoves("buzzwole", ["exoskelett", "boxtechnique", "cuddling", "attackorder", "speciality"]);
		newMoves("carkol", ["firework"]);
		newMoves("carnivine", ["absorb", "leechlife"]);
		newMoves("celesteela", ["steelbullet", "firework", "fireblast", "speciality"]);
		newMoves("charizard", ["soaringassault", "dragonmight"]);
		newMoves("charjabug", ["floatingbolt"]);
		newMoves("charmander", ["firework"]);
		newMoves("cherubi", ["doubleedge", "absorb", "stunspore", "sleeppowder", "petaldance"]);
		newMoves("chesnaught", ["boxtechnique"]);
		newMoves("chespin", ["deeproots"]);
		newMoves("chikorita", ["deeproots", "cuddling"]);
		newMoves("chimchar", ["firework", "cuddling"]);
		newMoves("chinchou", ["floatingbolt", "saltwater"]);
		newMoves("clauncher", ["saltwater"]);
		newMoves("combee", ["exoskelett", "venom"]);
		newMoves("combusken", ["boxtechnique"]);
		newMoves("cottonee", ["deeproots"]);
		newMoves("cramorant", ["soaringassault", "saltwater"]);
		newMoves("croagunk", ["closecombat", "earthpower", "boxtechnique", "venom"]);
		newMoves("cufant", ["steelbullet"]);
		newMoves("cutiefly", ["exoskelett", "cuddling", "soaringassault"]);
		newMoves("cyndaquil", ["firework"]);
		newMoves("decidueye", ["traumatize"]);
		newMoves("decidueyehisui", ["boxtechnique"]);
		newMoves("dewpider", ["saltwater"]);
		newMoves("dhelmise", ["traumatize", "deeproots", "saltwater"]);
		newMoves("doduo", ["soaringassault"]);
		newMoves("dragalge", ["dragonmight"]);
		newMoves("drapion", ["darknight", "wickedblow"]);
		newMoves("drifblim", ["powershift"]);
		newMoves("drifloon", ["confusion", "extrasensory", "mysticalfire", "soaringassault", "traumatize"]);
		newMoves("drowzee", ["mindcontrol"]);
		newMoves("druddigon", ["dragonmight", "slackoff", "meteormash"]);
		newMoves("dunsparce", ["exoskelett", "steelbullet"]);
		newMoves("duraludon", ["dragonmight", "steelbullet"]);
		newMoves("electrike", ["floatingbolt"]);
		newMoves("empoleon", ["steelbullet"]);
		newMoves("enamorus", ["soaringassault", "nastyplot", "slackoff", "cuddling"]);
		newMoves("falinks", ["cuddling", "steelbullet"]);
		newMoves("feebas", ["saltwater"]);
		newMoves("fennekin", ["firework"]);
		newMoves("ferroseed", ["synthesis", "spikyshield", "deeproots", "steelbullet"]);
		newMoves("ferrothorn", ["rapidspin"]);
		newMoves("fletchinder", ["firework"]);
		newMoves("fletchling", ["soaringassault"]);
		newMoves("flygon", ["extremespeed"]);
		newMoves("fomantis", ["exoskelett"]);
		newMoves("froakie", ["saltwater"]);
		newMoves("girafarig", ["speciality", "mindcontrol"]);
		newMoves("golett", ["darknight", "traumatize"]);
		newMoves("golurk", ["boxtechnique"]);
		newMoves("greninja", ["darknight"]);
		newMoves("grimmsnarl", ["boxtechnique"]);
		newMoves("grookey", ["deeproots"]);
		newMoves("grotle", ["dustdevil"]);
		newMoves("grubbin", ["exoskelett"]);
		newMoves("guzzlord", ["darknight", "dragonmight", "traumatize", "slackoff", "speciality"]);
		newMoves("hatenna", ["cuddling", "mindcontrol"]);
		newMoves("hawlucha", ["soaringassault"]);
		newMoves("heatran", ["dragonclaw", "firelash", "steelbullet", "dragonmight", "firework"]);
		newMoves("helioptile", ["dragonmight", "floatingbolt", "dustdevil"]);
		newMoves("heracross", ["exoskelett", "boxtechnique", "slash", "calmmind", "outrage"]);
		newMoves("herdier", ["dustdevil", "bonecrush"]);
		newMoves("hippopotas", ["mudbomb", "dustdevil", "bonecrush"]);
		newMoves("hitmonchan", ["wickedblow"]);
		newMoves("hitmonlee", ["surgingstrikes"]);
		newMoves("hitmontop", ["wickedblow", "surgingstrikes"]);
		newMoves("honedge", ["poltergeist", "strengthsap", "nastyplot", "traumatize"]);
		newMoves("hoppip", ["soaringassault"]);
		newMoves("horsea", ["saltwater"]);
		newMoves("impidimp", ["darknight", "cuddling", "traumatize", "mindcontrol"]);
		newMoves("incineroar", ["darknight", "bonecrush", "boxtechnique"]);
		newMoves("inkay", ["darknight", "deeproots", "venom", "mindcontrol", "saltwater"]);
		newMoves("inteleon", ["steelbullet"]);
		newMoves("kangaskhan", ["swordsdance", "boxtechnique", "cuddling"]);
		newMoves("kartana", ["boxtechnique", "closecombat", "behemothblade", "speciality"]);
		newMoves("kecleon", ["dragonmight"]);
		newMoves("kingdra", ["dragonmight"]);
		newMoves("landorus", ["soaringassault", "nastyplot", "slackoff", "airslash", "hurricane", "dustdevil", "sandsearstorm"]);
		newMoves("litten", ["firework"]);
		newMoves("lopunny", ["machpunch", "boxtechnique"]);
		newMoves("lucario", ["machpunch"]);
		newMoves("machamp", ["drainpunch"]);
		newMoves("machop", ["tackle", "machpunch", "doublehit", "boxtechnique"]);
		newMoves("mantyke", ["powershift", "roost", "doubleedge"]);
		newMoves("mareanie", ["venom", "saltwater"]);
		newMoves("marowak", ["dustdevil"]);
		newMoves("marowakalola", ["firework", "traumatize"]);
		newMoves("marshtomp", ["dustdevil"]);
		newMoves("melmetal", ["bulletpunch", "drainpunch", "rapidspin", "acid", "acidspray", "gastroacid", "poisonjab"]);
		newMoves("mew", ["skittersmack", "lashout", "scaleshot", "risingvoltage", "mistyexplosion", "coaching", "burningjealousy", "dualwingbeat", "poltergeist", "grassyglide", "scorchingsands", "tripleaxel", "terrainpulse", "corrosivegas", "expandingforce", "meteorbeam", "steelroller", "flipturn", "exoskelett", "darknight", "dragonmight", "floatingbolt", "cuddling", "boxtechnique", "firework", "soaringassault", "traumatize", "deeproots", "dustdevil", "freezer", "speciality", "venom", "mindcontrol", "bonecrush", "steelbullet", "saltwater"]);
		newMoves("milotic", ["dragonmight"]);
		newMoves("miltank", ["cuddling"]);
		newMoves("moltres", ["soaringassault", "firework", "fierywrath"]);
		newMoves("moltresgalar", ["soaringassault", "darknight", "roost"]);
		newMoves("monferno", ["boxtechnique"]);
		newMoves("mudbray", ["shoreup"]);
		newMoves("mudkip", ["saltwater"]);
		newMoves("munchlax", ["slackoff", "iceball", "gigaimpact", "highhorsepower", "cuddling"]);
		newMoves("murkrow", ["soaringassault"]);
		newMoves("natu", ["soaringassault", "mindcontrol"]);
		newMoves("nidoking", ["dustdevil"]);
		newMoves("nidoqueen", ["dustdevil"]);
		newMoves("nidoranf", ["venom"]);
		newMoves("nidoranm", ["venom"]);
		newMoves("nihilego", ["venom", "dustdevil", "saltwater", "gigadrain", "speciality"]);
		newMoves("nincada", ["exoskelett"]);
		newMoves("noibat", ["dragonmight", "soaringassault"]);
		newMoves("onix", ["powershift", "dustdevil", "bonecrush"]);
		newMoves("oricorio", ["soaringassault"]);
		newMoves("oshawott", ["saltwater"]);
		newMoves("pancham", ["darknight", "boxtechnique", "wickedblow"]);
		newMoves("passimian", ["boxtechnique"]);
		newMoves("petilil", ["deeproots", "cuddling", "poisonpowder", "recover", "leafage", "babydolleyes"]);
		newMoves("pheromosa", ["exoskelett", "boxtechnique", "cuddling", "leechlife", "speciality"]);
		newMoves("pignite", ["boxtechnique"]);
		newMoves("pinsir", ["exoskelett", "megahorn"]);
		newMoves("piplup", ["saltwater", "soaringassault"]);
		newMoves("poipole", ["dragonmight", "venom", "speciality"]);
		newMoves("poochyena", ["darknight"]);
		newMoves("popplio", ["saltwater"]);
		newMoves("psyduck", ["triattack", "bubble"]);
		newMoves("regice", ["freezer", "recover", "glaciate"]);
		newMoves("regidrago", ["dragonmight", "flamethrower"]);
		newMoves("regieleki", ["floatingbolt"]);
		newMoves("regigigas", ["boxtechnique", "fakeout", "recover", "speciality", "freezer", "bonecrush", "steelbullet", "floatingbolt", "dragonmight"]);
		newMoves("regirock", ["bonecrush", "dustdevil", "shoreup"]);
		newMoves("registeel", ["steelbullet", "metalburst"]);
		newMoves("remoraid", ["bubble"]);
		newMoves("rillaboom", ["bonecrush"]);
		newMoves("riolu", ["focusenergy", "closecombat", "boxtechnique", "steelbullet"]);
		newMoves("roggenrola", ["dustdevil"]);
		newMoves("rookidee", ["soaringassault"]);
		newMoves("rotom", ["recover", "darknight", "floatingbolt", "traumatize", "steelbullet"]);
		newMoves("rowlet", ["deeproots", "soaringassault"]);
		newMoves("salandit", ["dragonmight", "firework"]);
		newMoves("sandile", ["darknight", "bonecrush", "saltwater"]);
		newMoves("sandygast", ["traumatize", "dustdevil"]);
		newMoves("scorbunny", ["firework", "boxtechnique"]);
		newMoves("scyther", ["exoskelett", "soaringassault", "calmmind", "closecombat", "twineedle"]);
		newMoves("sewaddle", ["exoskelett"]);
		newMoves("sharpedo", ["darknight"]);
		newMoves("shedinja", ["traumatize"]);
		newMoves("shellos", ["tackle", "dustdevil", "saltwater"]);
		newMoves("silicobra", ["dragonmight", "dustdevil", "venom"]);
		newMoves("silvally", ["extremespeed", "stealthrock", "nastyplot", "hypervoice"]);
		newMoves("sizzlipede", ["firework"]);
		newMoves("skarmory", ["soaringassault"]);
		newMoves("skorupi", ["exoskelett", "traumatize", "venom", "bonecrush"]);
		newMoves("skrelp", ["venom"]);
		newMoves("sneasel", ["darknight", "freezer"]);
		newMoves("snivy", ["deeproots"]);
		newMoves("snom", ["freezer"]);
		newMoves("snover", ["iciclecrash", "freezer"]);
		newMoves("sobble", ["saltwater"]);
		newMoves("spheal", ["babydolleyes", "liquidation", "freezer", "bonecrush"]);
		newMoves("spiritomb", ["darknight", "extrasensory"]);
		newMoves("squirtle", ["saltwater"]);
		newMoves("stakataka", ["dustdevil", "steelbullet", "closecombat", "hammerarm", "speciality"]);
		newMoves("stantler", ["confusion", "entrainment", "lunge"]);
		newMoves("steelix", ["iceball", "steelbullet"]);
		newMoves("stoutland", ["doubleedge", "earthquake", "shoreup"]);
		newMoves("stufful", ["cuddling"]);
		newMoves("stunfisk", ["saltwater"]);
		newMoves("stunky", ["darknight", "venom", "tackle", "doubleedge", "poisongas", "slackoff"]);
		newMoves("sudowoodo", ["tackle"]);
		newMoves("sunkern", ["tackle"]);
		newMoves("surskit", ["exoskelett"]);
		newMoves("swablu", ["cuddling", "soaringassault"]);
		newMoves("tapubulu", ["cuddling", "deeproots", "grassyglide", "junglehealing", "playrough"]);
		newMoves("tapufini", ["cuddling", "saltwater", "mistyexplosion", "lifedew", "sparklingaria"]);
		newMoves("tapukoko", ["cuddling", "floatingbolt", "risingvoltage", "closecombat", "playrough"]);
		newMoves("tapulele", ["cuddling", "mindcontrol", "expandingforce", "healorder", "quiverdance"]);
		newMoves("teddiursa", ["tackle", "highhorsepower"]);
		newMoves("tepig", ["firework"]);
		newMoves("thundurus", ["soaringassault", "calmmind", "slackoff", "airslash", "hurricane", "floatingbolt", "wildboltstorm"]);
		newMoves("tirtouga", ["bonecrush", "saltwater"]);
		newMoves("torchic", ["firework"]);
		newMoves("torkoal", ["firework"]);
		newMoves("tornadus", ["soaringassault", "calmmind", "slackoff", "dualwingbeat", "bravebird", "freezer", "bleakwindstorm"]);
		newMoves("totodile", ["saltwater", "cuddling", "bonecrush"]);
		newMoves("toxel", ["floatingbolt"]);
		newMoves("trapinch", ["exoskelett"]);
		newMoves("treecko", ["deeproots", "dragonmight"]);
		newMoves("turtwig", ["deeproots"]);
		newMoves("typenull", ["recover", "skittersmack", "lashout", "scaleshot", "risingvoltage", "mistyexplosion", "coaching", "burningjealousy", "dualwingbeat", "poltergeist", "grassyglide", "scorchingsands", "tripleaxel", "terrainpulse", "corrosivegas", "expandingforce", "meteorbeam", "steelroller", "flipturn", "exoskelett", "darknight", "dragonmight", "floatingbolt", "cuddling", "boxtechnique", "firework", "soaringassault", "traumatize", "deeproots", "dustdevil", "freezer", "speciality", "venom", "mindcontrol", "bonecrush", "steelbullet", "saltwater"]);
		newMoves("typhlosionhisui", ["traumatize"]);
		newMoves("tyrogue", ["boxtechnique"]);
		newMoves("vespiquen", ["recover", "powershift"]);
		newMoves("vibrava", ["dragonmight", "soaringassault"]);
		newMoves("vikavolt", ["floatingbolt"]);
		newMoves("vullaby", ["darknight", "soaringassault"]);
		newMoves("wailmer", ["saltwater"]);
		newMoves("whiscash", ["airslash"]);
		newMoves("wimpod", ["exoskelett"]);
		newMoves("wingull", ["soaringassault"]);
		newMoves("wishiwashi", ["saltwater"]);
		newMoves("xurkitree", ["floatingbolt", "moonblast", "speciality"]);
		newMoves("yamper", ["bonecrush", "floatingbolt"]);
		newMoves("zapdos", ["soaringassault", "floatingbolt", "aurasphere"]);
		newMoves("zapdosgalar", ["soaringassault", "boxtechnique", "roost", "swordsdance"]);
		newMoves("zorua", ["darknight"]);
		newMoves("zubat", ["poisonjab", "hypervoice", "gunkshot", "crosspoison", "soaringassault", "venom"]);
		
		//Event Moves
		this.modData('Learnsets', 'kangaskhan').learnset.doubleedge = ['8S4'];
		this.modData('Learnsets', 'kangaskhan').learnset.crosschop = ['8S4'];
		this.modData('Learnsets', 'kangaskhan').learnset.lovelykiss = ['8S4'];
		this.modData('Learnsets', 'kangaskhan').learnset.slackoff = ['8S4'];
		
		this.modData('Learnsets', 'lugia').learnset.psychicfangs = ['8S12'];
		this.modData('Learnsets', 'lugia').learnset.aeroblast = ['8S12'];
		this.modData('Learnsets', 'lugia').learnset.whirlpool = ['8S12'];
		this.modData('Learnsets', 'lugia').learnset.dragondance = ['8S12'];
		
		this.modData('Learnsets', 'hooh').learnset.fireblast = ['8S11'];
		this.modData('Learnsets', 'hooh').learnset.hurricane = ['8S11'];
		this.modData('Learnsets', 'hooh').learnset.sunnyday = ['8S11'];
		this.modData('Learnsets', 'hooh').learnset.healbell = ['8S11'];
		
		this.modData('Learnsets', 'torterra').learnset.rocktomb = ['7S1'];
		this.modData('Learnsets', 'torterra').learnset.woodhammer = ['7S1'];
		this.modData('Learnsets', 'torterra').learnset.gravity = ['7S1'];
		this.modData('Learnsets', 'torterra').learnset.fissure = ['7S1'];
		
		this.modData('Learnsets', 'infernape').learnset.closecombat = ['7S2'];
		this.modData('Learnsets', 'infernape').learnset.burnup = ['7S2'];
		this.modData('Learnsets', 'infernape').learnset.drainpunch = ['7S2'];
		this.modData('Learnsets', 'infernape').learnset.machpunch = ['7S2'];
		
		this.modData('Learnsets', 'empoleon').learnset.roost = ['7S1'];
		this.modData('Learnsets', 'empoleon').learnset.bravebird = ['7S1'];
		this.modData('Learnsets', 'empoleon').learnset.aquajet = ['7S1'];
		this.modData('Learnsets', 'empoleon').learnset.hydropump = ['7S1'];
		
		this.modData('Learnsets', 'heatran').learnset.magmastorm = ['8S9'];
		this.modData('Learnsets', 'heatran').learnset.burnup = ['8S9'];
		this.modData('Learnsets', 'heatran').learnset.earthpower = ['8S9'];
		this.modData('Learnsets', 'heatran').learnset.outrage = ['8S9'];
		
		this.modData('Learnsets', 'decidueye').learnset.thousandarrows = ['8S1'];
		this.modData('Learnsets', 'decidueye').learnset.swordsdance = ['8S1'];
		this.modData('Learnsets', 'decidueye').learnset.shadowsneak = ['8S1'];
		this.modData('Learnsets', 'decidueye').learnset.poltergeist = ['8S1'];
		
		this.modData('Learnsets', 'incineroar').learnset.coreenforcer = ['8S1'];
		this.modData('Learnsets', 'incineroar').learnset.partingshot = ['8S1'];
		this.modData('Learnsets', 'incineroar').learnset.knockoff = ['8S1'];
		this.modData('Learnsets', 'incineroar').learnset.flareblitz = ['8S1'];
		
		this.modData('Learnsets', 'primarina').learnset.thousandwaves = ['8S1'];
		this.modData('Learnsets', 'primarina').learnset.dive = ['8S1'];
		this.modData('Learnsets', 'primarina').learnset.surf = ['8S1'];
		this.modData('Learnsets', 'primarina').learnset.hypervoice = ['8S1'];
	},
	
	secondaries(targets, pokemon, move, moveData, isSelf) {
		if (!moveData.secondaries) return;
		for (const target of targets) {
			if (target === false) continue;
			const secondaries: Dex.SecondaryEffect[] =
				this.runEvent('ModifySecondaries', target, pokemon, moveData, moveData.secondaries.slice());
			for (const secondary of secondaries) {
				const secondaryRoll = this.random(100);
				if (typeof secondary.chance === 'undefined' || secondaryRoll < secondary.chance) {
					this.moveHit(target, pokemon, move, secondary, true, isSelf);
					this.runEvent('SecondarySuccess', pokemon);
				}
			}
		}
	},
	
	hitStepInvulnerabilityEvent(targets, pokemon, move) {
		if (move.id === 'helpinghand' || (this.gen >= 6 && move.id === 'toxic' && pokemon.hasType('Poison')) 
			|| (this.gen >= 6 && move.id === 'thunderwave' && pokemon.hasType('Electric')) 
			|| (this.gen >= 6 && move.id === 'willowisp' && pokemon.hasType('Fire')) 
			|| (this.gen >= 6 && move.id === 'freezer' && pokemon.hasType('Ice'))) {
			return new Array(targets.length).fill(true);
		}
		const hitResults = this.runEvent('Invulnerability', targets, pokemon, move);
		for (const [i, target] of targets.entries()) {
			if (hitResults[i] === false) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					if (!move.spreadHit) this.attrLastMove('[miss]');
					this.add('-miss', pokemon, target);
				}
			}
		}
		return hitResults;
	},
	
	modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
	) {
		const tr = this.trunc;
		if (!move.type) move.type = '???';
		const type = move.type;

		baseDamage += 2;

		// multi-target modifier (doubles only)
		if (move.spreadHit) {
			const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
			this.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.modify(baseDamage, spreadModifier);
		}

		// weather modifier
		baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.randomizer(baseDamage);

		// STAB
		if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			baseDamage = this.modify(baseDamage, move.stab || 1.5);
		}
		// types
		let typeMod = target.runEffectiveness(move);
		typeMod = this.clampIntRange(typeMod, -6, 6);
		target.getMoveHitData(move).typeMod = typeMod;
		if (typeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);

			for (let i = 0; i < typeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (typeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);

			for (let i = 0; i > typeMod; i--) {
				baseDamage = tr(baseDamage / 2);
			}
		}

		if (isCrit && !suppressMessages) this.add('-crit', target);

		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
			if (this.gen < 6 || move.id !== 'facade') {
				baseDamage = this.modify(baseDamage, 0.5);
			}
		}

		if (pokemon.status === 'frz' && move.category === 'Special') {
			if (this.gen < 6 || move.id !== 'facade') {
				baseDamage = this.modify(baseDamage, 0.5);
			}
		}

		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.modify(baseDamage, 0.25);
			this.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},
	
	hitStepMoveHitLoop(targets, pokemon, move) { // Temporary name
		const damage: (number | boolean | undefined)[] = [];
		for (const i of targets.keys()) {
			damage[i] = 0;
		}
		move.totalDamage = 0;
		pokemon.lastDamage = 0;
		let targetHits = move.multihit || 1;
		if (Array.isArray(targetHits)) {
			// yes, it's hardcoded... meh
			if (targetHits[0] === 2 && targetHits[1] === 5) {
				if (pokemon.hasItem('loadeddice')) {
					// average base power of 100
					targetHits = this.sample([2, 3, 3, 4, 4, 4, 5, 5, 5, 5]);
				} else if (this.gen >= 5) {
					// 35-35-15-15 out of 100 for 2-3-4-5 hits
					targetHits = this.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
				} else {
					targetHits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
				}
			} else {
				targetHits = this.random(targetHits[0], targetHits[1] + 1);
			}
		}
		targetHits = Math.floor(targetHits);
		let nullDamage = true;
		let moveDamage: (number | boolean | undefined)[];
		// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
		const isSleepUsable = move.sleepUsable || this.dex.getMove(move.sourceEffect).sleepUsable;

		let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
		let hit: number;
		for (hit = 1; hit <= targetHits; hit++) {
			if (damage.includes(false)) break;
			if (hit > 1 && pokemon.status === 'slp' && !isSleepUsable) break;
			if (targets.every(target => !target || !target.hp)) break;
			move.hit = hit;
			if (move.smartTarget && targets.length > 1) {
				targetsCopy = [targets[hit - 1]];
			} else {
				targetsCopy = targets.slice(0);
			}
			const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
			if (target && typeof move.smartTarget === 'boolean') {
				if (hit > 1) {
					this.addMove('-anim', pokemon, move.name, target);
				} else {
					this.retargetLastMove(target);
				}
			}

			// like this (Triple Kick)
			if (target && move.multiaccuracy && hit > 1) {
				let accuracy = move.accuracy;
				const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
				if (accuracy !== true) {
					if (!move.ignoreAccuracy) {
						const boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
						const boost = this.clampIntRange(boosts['accuracy'], -6, 6);
						if (boost > 0) {
							accuracy *= boostTable[boost];
						} else {
							accuracy /= boostTable[-boost];
						}
					}
					if (!move.ignoreEvasion) {
						const boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
						const boost = this.clampIntRange(boosts['evasion'], -6, 6);
						if (boost > 0) {
							accuracy /= boostTable[boost];
						} else if (boost < 0) {
							accuracy *= boostTable[-boost];
						}
					}
				}
				accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
				if (!move.alwaysHit) {
					accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
					if (accuracy !== true && !this.randomChance(accuracy, 100)) break;
				}
			}

			const moveData = move;
			if (!moveData.flags) moveData.flags = {};

			// Modifies targetsCopy (which is why it's a copy)
			[moveDamage, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);

			if (!moveDamage.some(val => val !== false)) break;
			nullDamage = false;

			for (const [i, md] of moveDamage.entries()) {
				// Damage from each hit is individually counted for the
				// purposes of Counter, Metal Burst, and Mirror Coat.
				damage[i] = md === true || !md ? 0 : md;
				// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
				move.totalDamage += damage[i] as number;
			}
			if (move.mindBlownRecoil) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Mind Blown'), true);
				move.mindBlownRecoil = false;
			}
			this.eachEvent('Update');
			if (!pokemon.hp && targets.length === 1) {
				hit++; // report the correct number of hits for multihit moves
				break;
			}
		}
		// hit is 1 higher than the actual hit count
		if (hit === 1) return damage.fill(false);
		if (nullDamage) damage.fill(false);
		if (move.multihit && typeof move.smartTarget !== 'boolean') {
			this.add('-hitcount', targets[0], hit - 1);
		}

		if (move.recoil && move.totalDamage) {
			this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, pokemon, 'recoil');
		}

		if (move.struggleRecoil) {
			let recoilDamage;
			if (this.dex.gen >= 5) {
				recoilDamage = this.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
			} else {
				recoilDamage = this.trunc(pokemon.maxhp / 4);
			}
			this.directDamage(recoilDamage, pokemon, pokemon, {id: 'strugglerecoil'} as Condition);
		}

		// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
		if (move.smartTarget) targetsCopy = targets.slice(0);

		for (const [i, target] of targetsCopy.entries()) {
			if (target && pokemon !== target) {
				target.gotAttacked(move, damage[i] as number | false | undefined, pokemon);
			}
		}

		if (move.ohko && !targets[0].hp) this.add('-ohko');

		if (!damage.some(val => !!val || val === 0)) return damage;

		this.eachEvent('Update');

		this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);

		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
			for (const [i, d] of damage.entries()) {
				// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
				// The previous check was for `move.multihit`, but that fails for Dragon Darts
				const curDamage = targets.length === 1 ? move.totalDamage : d;
				if (typeof curDamage === 'number' && targets[i].hp) {
					const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
					if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
						this.runEvent('EmergencyExit', targets[i], pokemon);
					}
				}
			}
		}

		return damage;
	},
};