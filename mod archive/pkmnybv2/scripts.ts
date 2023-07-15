export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
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

		// Venusaur
		this.modData("Learnsets", "venusaur").learnset.websling = ["8L1"];
		// Charizard
		this.modData("Learnsets", "charizard").learnset.dracometeor = ["8L1"];
		// Butterfree
		this.modData("Learnsets", "butterfree").learnset.psyshock = ["8L1"];
		this.modData("Learnsets", "butterfree").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "butterfree").learnset.magicpowder = ["8L1"];
		this.modData("Learnsets", "butterfree").learnset.trick = ["8L1"];
		// Beedrill
		this.modData("Learnsets", "beedrill").learnset.dualwingbeat = ["8L1"];
		// Pidgeot
		this.modData("Learnsets", "pidgeot").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "pidgeot").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "pidgeot").learnset.weatherball = ["8L1"];
		// Raticate
		this.modData("Learnsets", "raticate").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "raticate").learnset.lashout = ["8L1"];
		// Raticate-Alola
		this.modData("Learnsets", "raticatealola").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "raticatealola").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "raticatealola").learnset.pluck = ["8L1"];
		this.modData("Learnsets", "raticatealola").learnset.flamewheel = ["8L1"];
		// Fearow
		this.modData("Learnsets", "fearow").learnset.bravebird = ["8L1"];
		this.modData("Learnsets", "fearow").learnset.cloudcrush = ["8L1"];
		this.modData("Learnsets", "fearow").learnset.honeclaws = ["8L1"];
		this.modData("Learnsets", "fearow").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "fearow").learnset.lashout = ["8L1"];
		// Ekans
		this.modData("Learnsets", "ekans").learnset.dracometeor = ["8L1"];
		// Arbok
		this.modData("Learnsets", "arbok").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.chipaway = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.psychicfangs = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.fireblast = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.morningsun = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.dragonrush = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.outrage = ["8L1"];
		// Sandslash
		this.modData("Learnsets", "sandslash").learnset.ballup = ["8L1"];
		this.modData("Learnsets", "sandslash").learnset.skittersmack = ["8L1"];
		// Sandslash-Alola
		this.modData("Learnsets", "sandslashalola").learnset.ballup = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.chillout = ["8L1"];
		// Nidoqueen
		this.modData("Learnsets", "nidoqueen").learnset.rockclimb = ["8L1"];
		// Nidoking
		this.modData("Learnsets", "nidoking").learnset.rockclimb = ["8L1"];
		// Clefable
		this.modData("Learnsets", "clefable").learnset.dizzypunch = ["8L1"];
		// Ninetales-Alola
		this.modData("Learnsets", "ninetalesalola").learnset.chillout = ["8L1"];
		// Wigglytuff
		this.modData("Learnsets", "wigglytuff").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "wigglytuff").learnset.spitfire = ["8L1"];
		this.modData("Learnsets", "wigglytuff").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "wigglytuff").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "wigglytuff").learnset.explosion = ["8L1"];
		this.modData("Learnsets", "wigglytuff").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "wigglytuff").learnset.dizzypunch = ["8L1"];
		// Parasect
		this.modData("Learnsets", "parasect").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "parasect").learnset.shadowclaw = ["8L1"];
		this.modData("Learnsets", "parasect").learnset.shadowsneak = ["8L1"];
		this.modData("Learnsets", "parasect").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "parasect").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "parasect").learnset.hex = ["8L1"];
		this.modData("Learnsets", "parasect").learnset.spite = ["8L1"];
		this.modData("Learnsets", "parasect").learnset.skittersmack = ["8L1"];
		// Dugtrio
		this.modData("Learnsets", "dugtrio").learnset.rockclimb = ["8L1"];
		// Dugtrio-Alola
		this.modData("Learnsets", "dugtrioalola").learnset.rockclimb = ["8L1"];
		this.modData("Learnsets", "dugtrioalola").learnset.cobaltwave = ["8L1"];
		// Persian
		this.modData("Learnsets", "persian").learnset.thunderwave = ["8L1"];
		// Persian-Alola
		this.modData("Learnsets", "persianalola").learnset.thunderwave = ["8L1"];
		// Golduck
		this.modData("Learnsets", "golduck").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "golduck").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "golduck").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "golduck").learnset.washaway = ["8L1"];
		// Primeape
		this.modData("Learnsets", "primeape").learnset.flamewheel = ["8L1"];
		this.modData("Learnsets", "primeape").learnset.flareblitz = ["8L1"];
		// Growlithe
		this.modData("Learnsets", "growlithe").learnset.growl = ["8L1"];
		// Arcanine
		this.modData("Learnsets", "arcanine").learnset.growl = ["8L1"];
		this.modData("Learnsets", "arcanine").learnset.nobleroar = ["8L1"];
		// Poliwrath
		this.modData("Learnsets", "poliwrath").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "poliwrath").learnset.washaway = ["8L1"];
		// Victreebel
		this.modData("Learnsets", "victreebel").learnset.bellydrum = ["8L1"];
		this.modData("Learnsets", "victreebel").learnset.lashout = ["8L1"];
		// Tentacruel
		this.modData("Learnsets", "tentacruel").learnset.poisonfang = ["8L1"];
		// Golem
		this.modData("Learnsets", "golem").learnset.icepunch = ["8L1"];
		this.modData("Learnsets", "golem").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "golem").learnset.scorchingsands = ["8L1"];
		// Golem-Alola
		this.modData("Learnsets", "golemalola").learnset.icepunch = ["8L1"];
		this.modData("Learnsets", "golemalola").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "golemalola").learnset.scorchingsands = ["8L1"];
		// Rapidash
		this.modData("Learnsets", "rapidash").learnset.extremespeed = ["8L1"];
		this.modData("Learnsets", "rapidash").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "rapidash").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "rapidash").learnset.dazzlinggleam = ["8L1"];
		this.modData("Learnsets", "rapidash").learnset.terrainpulse = ["8L1"];
		// Rapidash-Galar
		this.modData("Learnsets", "rapidashgalar").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.extremespeed = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.disarmingvoice = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.terrainpulse = ["8L1"];
		// Slowbro-Galar
		this.modData("Learnsets", "slowbrogalar").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "slowbrogalar").learnset.hiddenpower = ["8L1"];
		// Farfetchd-Galar
		this.modData("Learnsets", "farfetchdgalar").learnset.roost = ["8L1"];
		// Dodrio
		this.modData("Learnsets", "dodrio").learnset.doublekick = ["8L1"];
		// Dewgong
		this.modData("Learnsets", "dewgong").learnset.bellydrum = ["8L1"];
		this.modData("Learnsets", "dewgong").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "dewgong").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "dewgong").learnset.imprison = ["8L1"];
		// Muk
		this.modData("Learnsets", "muk").learnset.corrosiveacid = ["8L1"];
		this.modData("Learnsets", "muk").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "muk").learnset.lashout = ["8L1"];
		// Muk-Alola
		this.modData("Learnsets", "mukalola").learnset.corrosiveacid = ["8L1"];
		this.modData("Learnsets", "mukalola").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "mukalola").learnset.lashout = ["8L1"];
		// Cloyster
		this.modData("Learnsets", "cloyster").learnset.chillout = ["8L1"];
		// Hypno
		this.modData("Learnsets", "hypno").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "hypno").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "hypno").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "hypno").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "hypno").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "hypno").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "hypno").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "hypno").learnset.punishment = ["8L1"];
		this.modData("Learnsets", "hypno").learnset.payback = ["8L1"];
		// Kingler
		this.modData("Learnsets", "kingler").learnset.wipeout = ["8L1"];
		// Electrode
		this.modData("Learnsets", "electrode").learnset.energyball = ["8L1"];
		this.modData("Learnsets", "electrode").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "electrode").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "electrode").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "electrode").learnset.ballup = ["8L1"];
		this.modData("Learnsets", "electrode").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "electrode").learnset.mistyexplosion = ["8L1"];
		// Cubone
		this.modData("Learnsets", "cubone").learnset.rockclimb = ["8L1"];
		// Marowak
		this.modData("Learnsets", "marowak").learnset.rockclimb = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.icepunch = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.bulkup = ["8L1"];
		// Marowak-Alola
		this.modData("Learnsets", "marowakalola").learnset.rockclimb = ["8L1"];
		this.modData("Learnsets", "marowakalola").learnset.bulkup = ["8L1"];
		// Hitmonchan
		this.modData("Learnsets", "hitmonchan").learnset.shadowpunch = ["8L1"];
		this.modData("Learnsets", "hitmonchan").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "hitmonchan").learnset.swordsdance = ["8L1"];
		// Weezing
		this.modData("Learnsets", "weezing").learnset.gunkshot = ["8L1"];
		// Weezing-Galar
		this.modData("Learnsets", "weezinggalar").learnset.terrainpulse = ["8L1"];
		// Seadra
		this.modData("Learnsets", "seadra").learnset.sludgebomb = ["8L1"];
		// Seaking
		this.modData("Learnsets", "seaking").learnset.quickattack = ["8L1"];
		this.modData("Learnsets", "seaking").learnset.fakeout = ["8L1"];
		// Mr. Mime
		this.modData("Learnsets", "mrmime").learnset.disarmingvoice = ["8L1"];
		// Mr. Mime-Galar
		this.modData("Learnsets", "mrmimegalar").learnset.chillout = ["8L1"];
		// Jynx
		this.modData("Learnsets", "jynx").learnset.chillout = ["8L1"];
		// Eevee
		this.modData("Learnsets", "eevee").learnset.adaptableattack = ["8L1"];
		// Vaporeon
		this.modData("Learnsets", "vaporeon").learnset.adaptableattack = ["8L1"];
		this.modData("Learnsets", "vaporeon").learnset.chillout = ["8L1"];
		// Jolteon
		this.modData("Learnsets", "jolteon").learnset.adaptableattack = ["8L1"];
		this.modData("Learnsets", "jolteon").learnset.spikes = ["8L1"];
		// Flareon
		this.modData("Learnsets", "flareon").learnset.adaptableattack = ["8L1"];
		this.modData("Learnsets", "flareon").learnset.doublekick = ["8L1"];
		this.modData("Learnsets", "flareon").learnset.shadowclaw = ["8L1"];
		// Porygon
		this.modData("Learnsets", "porygon").learnset.adaptableattack = ["8L1"];
		this.modData("Learnsets", "porygon").learnset.bittrip = ["8L1"];
		// Snorlax
		this.modData("Learnsets", "snorlax").learnset.slackoff = ["8L1"];
		// Articuno
		this.modData("Learnsets", "articuno").learnset.chillout = ["8L1"];
		// Articuno-Galar
		this.modData("Learnsets", "articunogalar").learnset.synchronoise = ["8L1"];
		this.modData("Learnsets", "articunogalar").learnset.icebeam = ["8L1"];
		this.modData("Learnsets", "articunogalar").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "articunogalar").learnset.haze = ["8L1"];
		this.modData("Learnsets", "articunogalar").learnset.roost = ["8L1"];
		this.modData("Learnsets", "articunogalar").learnset.defog = ["8L1"];
		// Zapdos-Galar
		this.modData("Learnsets", "zapdosgalar").learnset.doublekick = ["8L1"];
		this.modData("Learnsets", "zapdosgalar").learnset.wildcharge = ["8L1"];
		this.modData("Learnsets", "zapdosgalar").learnset.zingzap = ["8L1"];
		this.modData("Learnsets", "zapdosgalar").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "zapdosgalar").learnset.roost = ["8L1"];
		this.modData("Learnsets", "zapdosgalar").learnset.defog = ["8L1"];
		// Moltres-Galar
		this.modData("Learnsets", "moltresgalar").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "moltresgalar").learnset.heatwave = ["8L1"];
		this.modData("Learnsets", "moltresgalar").learnset.mysticalfire = ["8L1"];
		this.modData("Learnsets", "moltresgalar").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "moltresgalar").learnset.roost = ["8L1"];
		this.modData("Learnsets", "moltresgalar").learnset.defog = ["8L1"];
		// Dragonite
		this.modData("Learnsets", "dragonite").learnset.chillout = ["8L1"];
		// Mew
		this.modData("Learnsets", "mew").learnset.adaptableattack = ["8L1"];

		// Meganium
		this.modData("Learnsets", "meganium").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "meganium").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "meganium").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "meganium").learnset.zenheadbutt = ["8L1"];
		this.modData("Learnsets", "meganium").learnset.grassyglide = ["8L1"];
		// Cyndaquil
		this.modData("Learnsets", "cyndaquil").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "cyndaquil").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "cyndaquil").learnset.burningjealousy = ["8L1"];
		// Quilava
		this.modData("Learnsets", "quilava").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "quilava").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "quilava").learnset.burningjealousy = ["8L1"];
		// Typhlosion
		this.modData("Learnsets", "typhlosion").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "typhlosion").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "typhlosion").learnset.burningjealousy = ["8L1"];
		// Feraligatr
		this.modData("Learnsets", "feraligatr").learnset.poisonfang = ["8L1"];
		this.modData("Learnsets", "feraligatr").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "feraligatr").learnset.lashout = ["8L1"];
		// Furret
		this.modData("Learnsets", "furret").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "furret").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "furret").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "furret").learnset.healbell = ["8L1"];
		this.modData("Learnsets", "furret").learnset.bodypress = ["8L1"];
		// Noctowl
		this.modData("Learnsets", "noctowl").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "noctowl").learnset.teleport = ["8L1"];
		// Ledian
		this.modData("Learnsets", "ledian").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "ledian").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "ledian").learnset.bulletpunch = ["8L1"];
		this.modData("Learnsets", "ledian").learnset.shadowpunch = ["8L1"];
		this.modData("Learnsets", "ledian").learnset.meditate = ["8L1"];
		this.modData("Learnsets", "ledian").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "ledian").learnset.dualwingbeat = ["8L1"];
		// Ariados
		this.modData("Learnsets", "ariados").learnset.poisonfang = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.glare = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.websling = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.twineedle = ["8L1"];
		// Crobat
		this.modData("Learnsets", "crobat").learnset.cloudcrush = ["8L1"];
		// Lanturn
		this.modData("Learnsets", "lanturn").learnset.wish = ["8L1"];
		// Togetic
		this.modData("Learnsets", "togetic").learnset.dizzypunch = ["8L1"];
		// Xatu
		this.modData("Learnsets", "xatu").learnset.taunt = ["8L1"];
		// Ampharos
		this.modData("Learnsets", "ampharos").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "ampharos").learnset.tailglow = ["8L1"];
		this.modData("Learnsets", "ampharos").learnset.slackoff = ["8L1"];
		// Bellossom
		this.modData("Learnsets", "bellossom").learnset.raindance = ["8L1"];
		this.modData("Learnsets", "bellossom").learnset.fierydance = ["8L1"];
		// Azumarill
		this.modData("Learnsets", "azumarill").learnset.wipeout = ["8L1"];
		// Sudowoodo
		this.modData("Learnsets", "sudowoodo").learnset.strengthsap = ["8L1"];
		// Politoed
		this.modData("Learnsets", "politoed").learnset.flipturn = ["8L1"];
		// Jumpluff
		this.modData("Learnsets", "jumpluff").learnset.cloudcrush = ["8L1"];
		this.modData("Learnsets", "jumpluff").learnset.oxidation = ["8L1"];
		this.modData("Learnsets", "jumpluff").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "jumpluff").learnset.pollenpuff = ["8L1"];
		// Quagsire
		this.modData("Learnsets", "quagsire").learnset.wipeout = ["8L1"];
		// Espeon
		this.modData("Learnsets", "espeon").learnset.aurasphere = ["8L1"];
		// Umbreon
		this.modData("Learnsets", "umbreon").learnset.hex = ["8L1"];
		this.modData("Learnsets", "umbreon").learnset.venoshock = ["8L1"];
		this.modData("Learnsets", "umbreon").learnset.eclipse = ["8L1"];
		// Slowking-Galar
		this.modData("Learnsets", "slowkinggalar").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.hiddenpower = ["8L1"];
		// Misdreavus
		this.modData("Learnsets", "misdreavus").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "misdreavus").learnset.moonlight = ["8L1"];
		// Wobbuffet
		this.modData("Learnsets", "wobbuffet").learnset.torment = ["8L1"];
		this.modData("Learnsets", "wobbuffet").learnset.meanlook = ["8L1"];
		// Girafarig
		this.modData("Learnsets", "girafarig").learnset.meditate = ["8L1"];
		this.modData("Learnsets", "girafarig").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "girafarig").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "girafarig").learnset.skittersmack = ["8L1"];
		// Forretress
		this.modData("Learnsets", "forretress").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "forretress").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "forretress").learnset.ballup = ["8L1"];
		this.modData("Learnsets", "forretress").learnset.steelbeam = ["8L1"];
		// Dunsparce
		this.modData("Learnsets", "dunsparce").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "dunsparce").learnset.dragontail = ["8L1"];
		this.modData("Learnsets", "dunsparce").learnset.chipaway = ["8L1"];
		this.modData("Learnsets", "dunsparce").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "dunsparce").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "dunsparce").learnset.meditate = ["8L1"];
		// Granbull
		this.modData("Learnsets", "granbull").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.agility = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.sandstorm = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.wideguard = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.leechlife = ["8L1"];
		// Qwilfish
		this.modData("Learnsets", "qwilfish").learnset.wipeout = ["8L1"];
		// Shuckle
		this.modData("Learnsets", "shuckle").learnset.bodypress = ["8L1"];
		// Magcargo
		this.modData("Learnsets", "magcargo").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "magcargo").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "magcargo").learnset.scorchingsands = ["8L1"];
		// Corsola
		this.modData("Learnsets", "corsola").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.wipeout = ["8L1"];
		// Corsola-Galar
		this.modData("Learnsets", "corsolagalar").learnset.infestation = ["8L1"];
		// Remoraid
		this.modData("Learnsets", "remoraid").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "remoraid").learnset.aurasphere = ["8L1"];
		// Octillery
		this.modData("Learnsets", "octillery").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.mysticalfire = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.websling = ["8L1"];
		// Delibird
		this.modData("Learnsets", "delibird").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "delibird").learnset.healpulse = ["8L1"];
		// Houndoom
		this.modData("Learnsets", "houndoom").learnset.spitfire = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.lashout = ["8L1"];
		// Kingdra
		this.modData("Learnsets", "kingdra").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "kingdra").learnset.aquajet = ["8L1"];
		// Donphan
		this.modData("Learnsets", "donphan").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "donphan").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "donphan").learnset.hydropump = ["8L1"];
		this.modData("Learnsets", "donphan").learnset.surf = ["8L1"];
		// Porygon2
		this.modData("Learnsets", "porygon2").learnset.adaptableattack = ["8L1"];
		this.modData("Learnsets", "porygon2").learnset.bittrip = ["8L1"];
		this.modData("Learnsets", "porygon2").learnset.risingvoltage = ["8L1"];
		// Stantler
		this.modData("Learnsets", "stantler").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "stantler").learnset.icebeam = ["8L1"];
		this.modData("Learnsets", "stantler").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "stantler").learnset.blizzard = ["8L1"];
		this.modData("Learnsets", "stantler").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "stantler").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "stantler").learnset.synchronoise = ["8L1"];
		// Tyranitar
		this.modData("Learnsets", "tyranitar").learnset.meteorbeam = ["8L1"];
		// Lugia
		this.modData("Learnsets", "lugia").learnset.oxidation = ["8L1"];

		// Sceptile
		this.modData("Learnsets", "sceptile").learnset.dracometeor = ["8L1"];
		// Combusken
		this.modData("Learnsets", "combusken").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "combusken").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "combusken").learnset.aurasphere = ["8L1"];
		// Mightyena
		this.modData("Learnsets", "mightyena").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "mightyena").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "mightyena").learnset.poisonfang = ["8L1"];
		this.modData("Learnsets", "mightyena").learnset.burningjealousy = ["8L1"];
		// Beautifly
		this.modData("Learnsets", "beautifly").learnset.hurricane = ["8L1"];
		this.modData("Learnsets", "beautifly").learnset.strengthsap = ["8L1"];
		// Dustox
		this.modData("Learnsets", "dustox").learnset.sleeppowder = ["8L1"];
		this.modData("Learnsets", "dustox").learnset.ragepowder = ["8L1"];
		// Ludicolo
		this.modData("Learnsets", "ludicolo").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "ludicolo").learnset.wipeout = ["8L1"];
		// Shiftry
		this.modData("Learnsets", "shiftry").learnset.closecombat = ["8L1"];
		// Pelipper
		this.modData("Learnsets", "pelipper").learnset.washaway = ["8L1"];
		// Gardevoir
		this.modData("Learnsets", "gardevoir").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "gardevoir").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "gardevoir").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "gardevoir").learnset.chillout = ["8L1"];
		// Masquerain
		this.modData("Learnsets", "masquerain").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "masquerain").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "masquerain").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "masquerain").learnset.chillout = ["8L1"];
		// Breloom
		this.modData("Learnsets", "breloom").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "breloom").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "breloom").learnset.skittersmack = ["8L1"];
		// Ninjask
		this.modData("Learnsets", "ninjask").learnset.earthquake = ["8L1"];
		// Exploud
		this.modData("Learnsets", "exploud").learnset.spitfire = ["8L1"];
		this.modData("Learnsets", "exploud").learnset.synchronoise = ["8L1"];
		this.modData("Learnsets", "exploud").learnset.heartbeat = ["8L1"];
		// Hariyama
		this.modData("Learnsets", "hariyama").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "hariyama").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "hariyama").learnset.drainpunch = ["8L1"];
		// Nosepass
		this.modData("Learnsets", "nosepass").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "nosepass").learnset.bittrip = ["8L1"];
		this.modData("Learnsets", "nosepass").learnset.risingvoltage = ["8L1"];
		// Skitty
		this.modData("Learnsets", "skitty").learnset.skittersmack = ["8L1"];
		// Delcatty
		this.modData("Learnsets", "delcatty").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "delcatty").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "delcatty").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "delcatty").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "delcatty").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "delcatty").learnset.skittersmack = ["8L1"];
		// Aggron
		this.modData("Learnsets", "aggron").learnset.meteormash = ["8L1"];
		// Medicham
		this.modData("Learnsets", "medicham").learnset.dizzypunch = ["8L1"];
		// Plusle
		this.modData("Learnsets", "plusle").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.fireblast = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.solarbeam = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.heatwave = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.mefirst = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.spotlight = ["8L1"];
		// Minun
		this.modData("Learnsets", "minun").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "minun").learnset.icebeam = ["8L1"];
		this.modData("Learnsets", "minun").learnset.blizzard = ["8L1"];
		this.modData("Learnsets", "minun").learnset.hail = ["8L1"];
		this.modData("Learnsets", "minun").learnset.waterpulse = ["8L1"];
		this.modData("Learnsets", "minun").learnset.auroraveil = ["8L1"];
		this.modData("Learnsets", "minun").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "minun").learnset.afteryou = ["8L1"];
		this.modData("Learnsets", "minun").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "minun").learnset.haze = ["8L1"];
		this.modData("Learnsets", "minun").learnset.followme = ["8L1"];
		// Volbeat
		this.modData("Learnsets", "volbeat").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "volbeat").learnset.partingshot = ["8L1"];
		this.modData("Learnsets", "volbeat").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "volbeat").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "volbeat").learnset.wildcharge = ["8L1"];
		this.modData("Learnsets", "volbeat").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "volbeat").learnset.risingvoltage = ["8L1"];
		// Illumise
		this.modData("Learnsets", "illumise").learnset.tailglow = ["8L1"];
		this.modData("Learnsets", "illumise").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "illumise").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "illumise").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "illumise").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "illumise").learnset.partingshot = ["8L1"];
		this.modData("Learnsets", "illumise").learnset.mistyexplosion = ["8L1"];
		// Swalot
		this.modData("Learnsets", "swalot").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "swalot").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "swalot").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "swalot").learnset.corrosivegas = ["8L1"];
		// Sharpedo
		this.modData("Learnsets", "sharpedo").learnset.wipeout = ["8L1"];
		// Wailmer
		this.modData("Learnsets", "wailmer").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "wailmer").learnset.wipeout = ["8L1"];
		// Wailord
		this.modData("Learnsets", "wailord").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "wailord").learnset.wipeout = ["8L1"];
		// Camerupt
		this.modData("Learnsets", "camerupt").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.spitfire = ["8L1"];
		// Grumpig
		this.modData("Learnsets", "grumpig").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "grumpig").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "grumpig").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "grumpig").learnset.workup = ["8L1"];
		this.modData("Learnsets", "grumpig").learnset.meditate = ["8L1"];
		this.modData("Learnsets", "grumpig").learnset.meteorbeam = ["8L1"];
		// Spinda
		this.modData("Learnsets", "spinda").learnset.overheat = ["8L1"];
		this.modData("Learnsets", "spinda").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "spinda").learnset.expandingforce = ["8L1"];
		// Trapinch
		this.modData("Learnsets", "trapinch").learnset.leechlife = ["8L1"];
		// Vibrava
		this.modData("Learnsets", "vibrava").learnset.leechlife = ["8L1"];
		// Flygon
		this.modData("Learnsets", "flygon").learnset.leechlife = ["8L1"];
		// Cacturne
		this.modData("Learnsets", "cacturne").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "cacturne").learnset.throatchop = ["8L1"];
		this.modData("Learnsets", "cacturne").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "cacturne").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "cacturne").learnset.rockslide = ["8L1"];
		this.modData("Learnsets", "cacturne").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "cacturne").learnset.ancientpower = ["8L1"];
		this.modData("Learnsets", "cacturne").learnset.pursuit = ["8L1"];
		// Altaria
		this.modData("Learnsets", "altaria").learnset.cloudcrush = ["8L1"];
		// Zangoose
		this.modData("Learnsets", "zangoose").learnset.lashout = ["8L1"];
		// Seviper
		this.modData("Learnsets", "seviper").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "seviper").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "seviper").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "seviper").learnset.scaleshot = ["8L1"];
		// Whiscash
		this.modData("Learnsets", "whiscash").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "whiscash").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "whiscash").learnset.wildcharge = ["8L1"];
		this.modData("Learnsets", "whiscash").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "whiscash").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "whiscash").learnset.thunder = ["8L1"];
		// Milotic
		this.modData("Learnsets", "milotic").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "milotic").learnset.spiritbreak = ["8L1"];
		this.modData("Learnsets", "milotic").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "milotic").learnset.dazzlinggleam = ["8L1"];
		// Castform
		this.modData("Learnsets", "castform").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "castform").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "castform").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "castform").learnset.powergem = ["8L1"];
		this.modData("Learnsets", "castform").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "castform").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "castform").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "castform").learnset.recover = ["8L1"];
		this.modData("Learnsets", "castform").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "castform").learnset.rockslide = ["8L1"];
		this.modData("Learnsets", "castform").learnset.rocktomb = ["8L1"];
		// Kecleon
		this.modData("Learnsets", "kecleon").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.firstimpression = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.machpunch = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.gyroball = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.hammerarm = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.submission = ["8L1"];
		// Banette
		this.modData("Learnsets", "banette").learnset.copycat = ["8L1"];
		this.modData("Learnsets", "banette").learnset.revenge = ["8L1"];
		this.modData("Learnsets", "banette").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "banette").learnset.brickbreak = ["8L1"];
		this.modData("Learnsets", "banette").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "banette").learnset.shadowpunch = ["8L1"];
		this.modData("Learnsets", "banette").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "banette").learnset.swordsdance = ["8L1"];
		// Dusclops
		this.modData("Learnsets", "dusclops").learnset.circlethrow = ["8L1"];
		// Tropius
		this.modData("Learnsets", "tropius").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "tropius").learnset.dragontail = ["8L1"];
		this.modData("Learnsets", "tropius").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "tropius").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "tropius").learnset.calmmind = ["8L1"];
		this.modData("Learnsets", "tropius").learnset.breakingswipe = ["8L1"];
		// Chimecho
		this.modData("Learnsets", "chimecho").learnset.cobaltwave = ["8L1"];
		this.modData("Learnsets", "chimecho").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "chimecho").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "chimecho").learnset.irondefense = ["8L1"];
		this.modData("Learnsets", "chimecho").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "chimecho").learnset.steelbeam = ["8L1"];
		// Absol
		this.modData("Learnsets", "absol").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "absol").learnset.spiritbreak = ["8L1"];
		this.modData("Learnsets", "absol").learnset.eclipse = ["8L1"];
		// Wynaut
		this.modData("Learnsets", "wynaut").learnset.meanlook = ["8L1"];
		this.modData("Learnsets", "wynaut").learnset.torment = ["8L1"];
		// Glalie
		this.modData("Learnsets", "glalie").learnset.quickattack = ["8L1"];
		this.modData("Learnsets", "glalie").learnset.doublehit = ["8L1"];
		// Walrein
		this.modData("Learnsets", "walrein").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "walrein").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "walrein").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "walrein").learnset.wipeout = ["8L1"];
		// Clamperl
		this.modData("Learnsets", "clamperl").learnset.recover = ["8L1"];
		this.modData("Learnsets", "clamperl").learnset.washaway = ["8L1"];
		// Huntail
		this.modData("Learnsets", "huntail").learnset.recover = ["8L1"];
		this.modData("Learnsets", "huntail").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "huntail").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "huntail").learnset.washaway = ["8L1"];
		// Gorebyss
		this.modData("Learnsets", "gorebyss").learnset.recover = ["8L1"];
		this.modData("Learnsets", "gorebyss").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "gorebyss").learnset.drainingkiss = ["8L1"];
		this.modData("Learnsets", "gorebyss").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "gorebyss").learnset.psyshock = ["8L1"];
		this.modData("Learnsets", "gorebyss").learnset.dazzlinggleam = ["8L1"];
		this.modData("Learnsets", "gorebyss").learnset.sparklingaria = ["8L1"];
		this.modData("Learnsets", "gorebyss").learnset.snarl = ["8L1"];
		// Relicanth
		this.modData("Learnsets", "relicanth").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "relicanth").learnset.recover = ["8L1"];
		// Luvdisc
		this.modData("Learnsets", "luvdisc").learnset.dazzlinggleam = ["8L1"];
		// Metagross
		this.modData("Learnsets", "metagross").learnset.cobaltwave = ["8L1"];
		// Regice
		this.modData("Learnsets", "regice").learnset.chillout = ["8L1"];
		// Registeel
		this.modData("Learnsets", "registeel").learnset.cobaltwave = ["8L1"];
		// Deoxys
		this.modData("Learnsets", "deoxys").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "deoxys").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "deoxys").learnset.venoshock = ["8L1"];
		this.modData("Learnsets", "deoxys").learnset.clearsmog = ["8L1"];
		this.modData("Learnsets", "deoxys").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "deoxys").learnset.terrainpulse = ["8L1"];

		// Torterra
		this.modData("Learnsets", "torterra").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "torterra").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "torterra").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "torterra").learnset.rototiller = ["8L1"];
		// Infernape
		this.modData("Learnsets", "infernape").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "infernape").learnset.spitfire = ["8L1"];
		this.modData("Learnsets", "infernape").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "infernape").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "infernape").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "infernape").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "infernape").learnset.shadowpunch = ["8L1"];
		// Empoleon
		this.modData("Learnsets", "empoleon").learnset.cobaltwave = ["8L1"];
		this.modData("Learnsets", "empoleon").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "empoleon").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "empoleon").learnset.roost = ["8L1"];
		this.modData("Learnsets", "empoleon").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "empoleon").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "empoleon").learnset.oxidation = ["8L1"];
		// Staraptor
		this.modData("Learnsets", "staraptor").learnset.wildcharge = ["8L1"];
		this.modData("Learnsets", "staraptor").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "staraptor").learnset.lashout = ["8L1"];
		// Bibarel
		this.modData("Learnsets", "bibarel").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "bibarel").learnset.agility = ["8L1"];
		// Kricketune
		this.modData("Learnsets", "kricketune").learnset.boomburst = ["8L1"];
		this.modData("Learnsets", "kricketune").learnset.disarmingvoice = ["8L1"];
		this.modData("Learnsets", "kricketune").learnset.websling = ["8L1"];
		// Luxray
		this.modData("Learnsets", "luxray").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "luxray").learnset.pursuit = ["8L1"];
		this.modData("Learnsets", "luxray").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "luxray").learnset.spotlight = ["8L1"];
		this.modData("Learnsets", "luxray").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "luxray").learnset.bulkup = ["8L1"];
		// Roserade
		this.modData("Learnsets", "roserade").learnset.disarmingvoice = ["8L1"];
		// Rampardos
		this.modData("Learnsets", "rampardos").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "rampardos").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "rampardos").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "rampardos").learnset.jumpkick = ["8L1"];
		this.modData("Learnsets", "rampardos").learnset.lowsweep = ["8L1"];
		this.modData("Learnsets", "rampardos").learnset.bulkup = ["8L1"];
		// Shieldon
		this.modData("Learnsets", "shieldon").learnset.steelbeam = ["8L1"];
		// Bastiodon
		this.modData("Learnsets", "bastiodon").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.cobaltwave = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.meteorbeam = ["8L1"];
		// Wormadam
		this.modData("Learnsets", "wormadam").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.stickyweb = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.morningsun = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.leechseed = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.rapidspin = ["8L1"];
		// Wormadam-Sandy
		this.modData("Learnsets", "wormadamsandy").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "wormadamsandy").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "wormadamsandy").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "wormadamsandy").learnset.morningsun = ["8L1"];
		this.modData("Learnsets", "wormadamsandy").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "wormadamsandy").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "wormadamsandy").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "wormadamsandy").learnset.rockslide = ["8L1"];
		// Wormadam-Trash
		this.modData("Learnsets", "wormadamtrash").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.morningsun = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.cobaltwave = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.toxicspikes = ["8L1"];
		// Mothim
		this.modData("Learnsets", "mothim").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.seedbomb = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.cloudcrush = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.quickattack = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.steelwing = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.stickyweb = ["8L1"];
		// Vespiquen
		this.modData("Learnsets", "vespiquen").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "vespiquen").learnset.brickbreak = ["8L1"];
		// Pachirisu
		this.modData("Learnsets", "pachirisu").learnset.wish = ["8L1"];
		this.modData("Learnsets", "pachirisu").learnset.bulletseed = ["8L1"];
		this.modData("Learnsets", "pachirisu").learnset.leechseed = ["8L1"];
		this.modData("Learnsets", "pachirisu").learnset.powerwhip = ["8L1"];
		this.modData("Learnsets", "pachirisu").learnset.wildcharge = ["8L1"];
		this.modData("Learnsets", "pachirisu").learnset.energyball = ["8L1"];
		this.modData("Learnsets", "pachirisu").learnset.rototiller = ["8L1"];
		// Floatzel
		this.modData("Learnsets", "floatzel").learnset.assurance = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.bite = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.throatchop = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.foulplay = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.nightslash = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.thief = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.aerialace = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.doublekick = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.wipeout = ["8L1"];
		// Cherrim
		this.modData("Learnsets", "cherrim").learnset.shadowsneak = ["8L1"];
		this.modData("Learnsets", "cherrim").learnset.shadowpunch = ["8L1"];
		this.modData("Learnsets", "cherrim").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "cherrim").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "cherrim").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "cherrim").learnset.spite = ["8L1"];
		this.modData("Learnsets", "cherrim").learnset.curse = ["8L1"];
		// Ambipom
		this.modData("Learnsets", "ambipom").learnset.doublekick = ["8L1"];
		this.modData("Learnsets", "ambipom").learnset.tripleaxel = ["8L1"];
		// Drifblim
		this.modData("Learnsets", "drifblim").learnset.oxidation = ["8L1"];
		this.modData("Learnsets", "drifblim").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "drifblim").learnset.mysticalfire = ["8L1"];
		this.modData("Learnsets", "drifblim").learnset.poltergeist = ["8L1"];
		// Mismagius
		this.modData("Learnsets", "mismagius").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "mismagius").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "mismagius").learnset.healingwish = ["8L1"];
		// Honchkrow
		this.modData("Learnsets", "honchkrow").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "honchkrow").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "honchkrow").learnset.throatchop = ["8L1"];
		this.modData("Learnsets", "honchkrow").learnset.dualwingbeat = ["8L1"];
		// Purugly
		this.modData("Learnsets", "purugly").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "purugly").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "purugly").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "purugly").learnset.lashout = ["8L1"];
		// Skuntank
		this.modData("Learnsets", "skuntank").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.flamecharge = ["8L1"];
		// Chingling
		this.modData("Learnsets", "chingling").learnset.steelbeam = ["8L1"];
		// Bronzong
		this.modData("Learnsets", "bronzong").learnset.cobaltwave = ["8L1"];
		// Chatot
		this.modData("Learnsets", "chatot").learnset.spitfire = ["8L1"];
		this.modData("Learnsets", "chatot").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "chatot").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "chatot").learnset.dualwingbeat = ["8L1"];
		// Lucario
		this.modData("Learnsets", "lucario").learnset.cobaltwave = ["8L1"];
		// Toxicroak
		this.modData("Learnsets", "toxicroak").learnset.doublekick = ["8L1"];
		// Carnivine
		this.modData("Learnsets", "carnivine").learnset.strengthsap = ["8L1"];
		this.modData("Learnsets", "carnivine").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "carnivine").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "carnivine").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "carnivine").learnset.brickbreak = ["8L1"];
		// Lumineon
		this.modData("Learnsets", "lumineon").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "lumineon").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "lumineon").learnset.hurricane = ["8L1"];
		this.modData("Learnsets", "lumineon").learnset.encore = ["8L1"];
		this.modData("Learnsets", "lumineon").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "lumineon").learnset.washaway = ["8L1"];
		// Abomasnow
		this.modData("Learnsets", "abomasnow").learnset.chillout = ["8L1"];
		// Weavile
		this.modData("Learnsets", "weavile").learnset.chillout = ["8L1"];
		// Lickilicky
		this.modData("Learnsets", "lickilicky").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "lickilicky").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "lickilicky").learnset.barrier = ["8L1"];
		this.modData("Learnsets", "lickilicky").learnset.gunkshot = ["8L1"];
		// Rhyperior
		this.modData("Learnsets", "rhyperior").learnset.stalagbite = ["8L1"];
		// Electivire
		this.modData("Learnsets", "electivire").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "electivire").learnset.jumpkick = ["8L1"];
		this.modData("Learnsets", "electivire").learnset.bulletpunch = ["8L1"];
		this.modData("Learnsets", "electivire").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "electivire").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "electivire").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "electivire").learnset.terrainpulse = ["8L1"];
		// Magmortar
		this.modData("Learnsets", "magmortar").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "magmortar").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "magmortar").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "magmortar").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "magmortar").learnset.calmmind = ["8L1"];
		this.modData("Learnsets", "magmortar").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "magmortar").learnset.terrainpulse = ["8L1"];
		// Togekiss
		this.modData("Learnsets", "togekiss").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "togekiss").learnset.oxidation = ["8L1"];
		// Yanmega
		this.modData("Learnsets", "yanmega").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.chipaway = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.dragontail = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.breakingswipe = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.twister = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.dualwingbeat = ["8L1"];
		// Leafeon
		this.modData("Learnsets", "leafeon").learnset.bulldoze = ["8L1"];
		this.modData("Learnsets", "leafeon").learnset.doublekick = ["8L1"];
		this.modData("Learnsets", "leafeon").learnset.dualchop = ["8L1"];
		// Glaceon
		this.modData("Learnsets", "glaceon").learnset.psychic = ["8L1"];
		this.modData("Learnsets", "glaceon").learnset.chillout = ["8L1"];
		// Porygon-Z
		this.modData("Learnsets", "porygonz").learnset.adaptableattack = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.bittrip = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.risingvoltage = ["8L1"];
		// Gallade
		this.modData("Learnsets", "gallade").learnset.sacredsword = ["8L1"];
		this.modData("Learnsets", "gallade").learnset.smartstrike = ["8L1"];
		this.modData("Learnsets", "gallade").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "gallade").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "gallade").learnset.chillout = ["8L1"];
		// Probopass
		this.modData("Learnsets", "probopass").learnset.cobaltwave = ["8L1"];
		this.modData("Learnsets", "probopass").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "probopass").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "probopass").learnset.bittrip = ["8L1"];
		this.modData("Learnsets", "probopass").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "probopass").learnset.electricterrain = ["8L1"];
		// Dusknoir
		this.modData("Learnsets", "dusknoir").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "dusknoir").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "dusknoir").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "dusknoir").learnset.circlethrow = ["8L1"];
		// Rotom
		this.modData("Learnsets", "rotom").learnset.bittrip = ["8L1"];
		// Dialga
		this.modData("Learnsets", "dialga").learnset.cobaltwave = ["8L1"];
		// Regigigas
		this.modData("Learnsets", "regigigas").learnset.lifedew = ["8L1"];
		// Phione
		this.modData("Learnsets", "phione").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "phione").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "phione").learnset.mistyexplosion = ["8L1"];
		this.modData("Learnsets", "phione").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "phione").learnset.wipeout = ["8L1"];
		// Manaphy
		this.modData("Learnsets", "manaphy").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "manaphy").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "manaphy").learnset.mistyexplosion = ["8L1"];
		this.modData("Learnsets", "manaphy").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "manaphy").learnset.wipeout = ["8L1"];
		// Shaymin
		this.modData("Learnsets", "shaymin").learnset.cloudcrush = ["8L1"];
		this.modData("Learnsets", "shaymin").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "shaymin").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "shaymin").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "shaymin").learnset.oxidation = ["8L1"];
		// Arceus
		this.modData("Learnsets", "arceus").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "arceus").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "arceus").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "arceus").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "arceus").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "arceus").learnset.adaptableattack = ["8L1"];

		// Serperior
		this.modData("Learnsets", "serperior").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "serperior").learnset.scaleshot = ["8L1"];
		// Emboar
		this.modData("Learnsets", "emboar").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.sandstorm = ["8L1"];
		// Samurott
		this.modData("Learnsets", "samurott").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "samurott").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "samurott").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "samurott").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "samurott").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "samurott").learnset.calmmind = ["8L1"];
		this.modData("Learnsets", "samurott").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "samurott").learnset.counter = ["8L1"];
		// Watchog
		this.modData("Learnsets", "watchog").learnset.psychicfangs = ["8L1"];
		this.modData("Learnsets", "watchog").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "watchog").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "watchog").learnset.shadowpunch = ["8L1"];
		// Stoutland
		this.modData("Learnsets", "stoutland").learnset.doubleedge = ["8L1"];
		this.modData("Learnsets", "stoutland").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "stoutland").learnset.bulkup = ["8L1"];
		// Liepard
		this.modData("Learnsets", "liepard").learnset.partingshot = ["8L1"];
		// Simisage
		this.modData("Learnsets", "simisage").learnset.petalblizzard = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.rototiller = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.thunder = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.triattack = ["8L1"];
		// Simisear
		this.modData("Learnsets", "simisear").learnset.spitfire = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.snarl = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.thunder = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.triattack = ["8L1"];
		// Simipour
		this.modData("Learnsets", "simipour").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.laserfocus = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.extrasensory = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.thunder = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.triattack = ["8L1"];
		// Musharna
		this.modData("Learnsets", "musharna").learnset.teleport = ["8L1"];
		// Unfezant
		this.modData("Learnsets", "unfezant").learnset.oxidation = ["8L1"];
		this.modData("Learnsets", "unfezant").learnset.slash = ["8L1"];
		this.modData("Learnsets", "unfezant").learnset.blazekick = ["8L1"];
		// Zebstrika
		this.modData("Learnsets", "zebstrika").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "zebstrika").learnset.highhorsepower = ["8L1"];
		this.modData("Learnsets", "zebstrika").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "zebstrika").learnset.blazekick = ["8L1"];
		// Gigalith
		this.modData("Learnsets", "gigalith").learnset.stalagbite = ["8L1"];
		// Audino
		this.modData("Learnsets", "audino").learnset.chillout = ["8L1"];
		// Seismitoad
		this.modData("Learnsets", "seismitoad").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "seismitoad").learnset.waterfall = ["8L1"];
		this.modData("Learnsets", "seismitoad").learnset.chillout = ["8L1"];
		// Leavanny
		this.modData("Learnsets", "leavanny").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "leavanny").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "leavanny").learnset.websling = ["8L1"];
		// Whimsicott
		this.modData("Learnsets", "whimsicott").learnset.cloudcrush = ["8L1"];
		// Lilligant
		this.modData("Learnsets", "lilligant").learnset.psychic = ["8L1"];
		this.modData("Learnsets", "lilligant").learnset.shadowball = ["8L1"];
		// Basculin
		this.modData("Learnsets", "basculin").learnset.wipeout = ["8L1"];
		// Krookodile
		this.modData("Learnsets", "krookodile").learnset.poisonfang = ["8L1"];
		// Maractus
		this.modData("Learnsets", "maractus").learnset.rototiller = ["8L1"];
		this.modData("Learnsets", "maractus").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "maractus").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "maractus").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "maractus").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "maractus").learnset.disarmingvoice = ["8L1"];
		// Scrafty
		this.modData("Learnsets", "scrafty").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "scrafty").learnset.suckerpunch = ["8L1"];
		// Sigilyph
		this.modData("Learnsets", "sigilyph").learnset.oxidation = ["8L1"];
		// Carracosta
		this.modData("Learnsets", "carracosta").learnset.stalagbite = ["8L1"];
		// Archeops
		this.modData("Learnsets", "archeops").learnset.bravebird = ["8L1"];
		this.modData("Learnsets", "archeops").learnset.powergem = ["8L1"];
		this.modData("Learnsets", "archeops").learnset.stalagbite = ["8L1"];
		// Trubbish
		this.modData("Learnsets", "trubbish").learnset.powergem = ["8L1"];
		// Garbodor
		this.modData("Learnsets", "garbodor").learnset.cobaltwave = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.gyroball = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.irondefense = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.icepunch = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "garbodor").learnset.magnetrise = ["8L1"];
		// Zoroark
		this.modData("Learnsets", "zoroark").learnset.eclipse = ["8L1"];
		// Cinccino
		this.modData("Learnsets", "cinccino").learnset.wish = ["8L1"];
		this.modData("Learnsets", "cinccino").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "cinccino").learnset.encore = ["8L1"];
		this.modData("Learnsets", "cinccino").learnset.rapidspin = ["8L1"];
		// Gothitelle
		this.modData("Learnsets", "gothitelle").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "gothitelle").learnset.agility = ["8L1"];
		this.modData("Learnsets", "gothitelle").learnset.chillout = ["8L1"];
		// Swanna
		this.modData("Learnsets", "swanna").learnset.oxidation = ["8L1"];
		this.modData("Learnsets", "swanna").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "swanna").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "swanna").learnset.dualwingbeat = ["8L1"];
		// Vanilluxe
		this.modData("Learnsets", "vanilluxe").learnset.chillout = ["8L1"];
		// Sawsbuck
		this.modData("Learnsets", "sawsbuck").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.solarblade = ["8L1"];
		// Emolga
		this.modData("Learnsets", "emolga").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "emolga").learnset.hurricane = ["8L1"];
		this.modData("Learnsets", "emolga").learnset.seedbomb = ["8L1"];
		this.modData("Learnsets", "emolga").learnset.brickbreak = ["8L1"];
		// Alomomola
		this.modData("Learnsets", "alomomola").learnset.dazzlinggleam = ["8L1"];
		this.modData("Learnsets", "alomomola").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "alomomola").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "alomomola").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "alomomola").learnset.chillout = ["8L1"];
		// Galvantula
		this.modData("Learnsets", "galvantula").learnset.websling = ["8L1"];
		// Klinklang
		this.modData("Learnsets", "klinklang").learnset.earthquake = ["8L1"];
		// Eelektross
		this.modData("Learnsets", "eelektross").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.liquidation = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.surf = ["8L1"];
		// Haxorus
		this.modData("Learnsets", "haxorus").learnset.chipaway = ["8L1"];
		// Beartic
		this.modData("Learnsets", "beartic").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "beartic").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "beartic").learnset.submission = ["8L1"];
		// Accelgor
		this.modData("Learnsets", "accelgor").learnset.hiddenleafstrike = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.embargo = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.thief = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.throatchop = ["8L1"];
		// Stunfisk
		this.modData("Learnsets", "stunfisk").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.washaway = ["8L1"];
		// Stunfisk-Galar
		this.modData("Learnsets", "stunfiskgalar").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "stunfiskgalar").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "stunfiskgalar").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "stunfiskgalar").learnset.irontail = ["8L1"];
		this.modData("Learnsets", "stunfiskgalar").learnset.thunderfang = ["8L1"];
		this.modData("Learnsets", "stunfiskgalar").learnset.psychicfangs = ["8L1"];
		this.modData("Learnsets", "stunfiskgalar").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "stunfiskgalar").learnset.superfang = ["8L1"];
		// Mienshao
		this.modData("Learnsets", "mienshao").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "mienshao").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "mienshao").learnset.disarmingvoice = ["8L1"];
		this.modData("Learnsets", "mienshao").learnset.dazzlinggleam = ["8L1"];
		this.modData("Learnsets", "mienshao").learnset.dizzypunch = ["8L1"];
		// Druddigon
		this.modData("Learnsets", "druddigon").learnset.morningsun = ["8L1"];
		// Bouffalant
		this.modData("Learnsets", "bouffalant").learnset.headsmash = ["8L1"];
		this.modData("Learnsets", "bouffalant").learnset.bodypress = ["8L1"];
		// Braviary
		this.modData("Learnsets", "braviary").learnset.finalgambit = ["8L1"];
		this.modData("Learnsets", "braviary").learnset.focusblast = ["8L1"];
		// Heatmor
		this.modData("Learnsets", "heatmor").learnset.strengthsap = ["8L1"];
		this.modData("Learnsets", "heatmor").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "heatmor").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "heatmor").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "heatmor").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "heatmor").learnset.flashcannon = ["8L1"];
		// Zweilous
		this.modData("Learnsets", "zweilous").learnset.chipaway = ["8L1"];
		// Hydreigon
		this.modData("Learnsets", "hydreigon").learnset.chipaway = ["8L1"];
		// Cobalion
		this.modData("Learnsets", "cobalion").learnset.cobaltwave = ["8L1"];
		// Terrakion
		this.modData("Learnsets", "terrakion").learnset.meteorbeam = ["8L1"];
		// Tornadus
		this.modData("Learnsets", "tornadus").learnset.cloudcrush = ["8L1"];
		// Thundurus
		this.modData("Learnsets", "thundurus").learnset.cloudcrush = ["8L1"];
		// Genesect
		this.modData("Learnsets", "genesect").learnset.adaptableattack = ["8L1"];
		this.modData("Learnsets", "genesect").learnset.bittrip = ["8L1"];

		// Chesnaught
		this.modData("Learnsets", "chesnaught").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "chesnaught").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "chesnaught").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "chesnaught").learnset.bodypress = ["8L1"];
		// Delphox
		this.modData("Learnsets", "delphox").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "delphox").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "delphox").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "delphox").learnset.speedswap = ["8L1"];
		// Greninja
		this.modData("Learnsets", "greninja").learnset.hiddenleafstrike = ["8L1"];
		// Vivillon
		this.modData("Learnsets", "vivillon").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.pollenpuff = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.steelwing = ["8L1"];
		// Pyroar
		this.modData("Learnsets", "pyroar").learnset.spitfire = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.mysticalfire = ["8L1"];
		// Florges
		this.modData("Learnsets", "florges").learnset.mistyexplosion = ["8L1"];
		this.modData("Learnsets", "florges").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "florges").learnset.leechseed = ["8L1"];
		this.modData("Learnsets", "florges").learnset.pollenpuff = ["8L1"];
		// Gogoat
		this.modData("Learnsets", "gogoat").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.rototiller = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.stoneedge = ["8L1"];
		// Pangoro
		this.modData("Learnsets", "pangoro").learnset.machpunch = ["8L1"];
		// Furfrou
		this.modData("Learnsets", "furfrou").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "furfrou").learnset.healbell = ["8L1"];
		this.modData("Learnsets", "furfrou").learnset.bodypress = ["8L1"];
		// Meowstic
		this.modData("Learnsets", "meowstic").learnset.aurasphere = ["8L1"];
		// Meowstic-F
		this.modData("Learnsets", "meowsticf").learnset.aurasphere = ["8L1"];
		// Doublade
		this.modData("Learnsets", "doublade").learnset.smartstrike = ["8L1"];
		// Aromatisse
		this.modData("Learnsets", "aromatisse").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "aromatisse").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "aromatisse").learnset.venoshock = ["8L1"];
		this.modData("Learnsets", "aromatisse").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "aromatisse").learnset.poisongas = ["8L1"];
		this.modData("Learnsets", "aromatisse").learnset.clearsmog = ["8L1"];
		this.modData("Learnsets", "aromatisse").learnset.acidspray = ["8L1"];
		// Slurpuff
		this.modData("Learnsets", "slurpuff").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "slurpuff").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "slurpuff").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "slurpuff").learnset.websling = ["8L1"];
		// Malamar
		this.modData("Learnsets", "malamar").learnset.overheat = ["8L1"];
		this.modData("Learnsets", "malamar").learnset.eclipse = ["8L1"];
		// Barbaracle
		this.modData("Learnsets", "barbaracle").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "barbaracle").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "barbaracle").learnset.icepunch = ["8L1"];
		// Dragalge
		this.modData("Learnsets", "dragalge").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.synthesis = ["8L1"];
		// Clawitzer
		this.modData("Learnsets", "clawitzer").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "clawitzer").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "clawitzer").learnset.chillout = ["8L1"];
		// Heliolisk
		this.modData("Learnsets", "heliolisk").learnset.powergem = ["8L1"];
		// Tyrunt
		this.modData("Learnsets", "tyrunt").learnset.stalagbite = ["8L1"];
		// Tyrantrum
		this.modData("Learnsets", "tyrantrum").learnset.stalagbite = ["8L1"];
		// Aurorus
		this.modData("Learnsets", "aurorus").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "aurorus").learnset.wildcharge = ["8L1"];
		this.modData("Learnsets", "aurorus").learnset.iceshard = ["8L1"];
		// Sylveon
		this.modData("Learnsets", "sylveon").learnset.feint = ["8L1"];
		// Dedenne
		this.modData("Learnsets", "dedenne").learnset.stuffcheeks = ["8L1"];
		this.modData("Learnsets", "dedenne").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "dedenne").learnset.disarmingvoice = ["8L1"];
		// Carbink
		this.modData("Learnsets", "carbink").learnset.storedpower = ["8L1"];
		this.modData("Learnsets", "carbink").learnset.drainingkiss = ["8L1"];
		// Goodra
		this.modData("Learnsets", "goodra").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "goodra").learnset.liquidation = ["8L1"];
		this.modData("Learnsets", "goodra").learnset.whirlpool = ["8L1"];
		// Trevenant
		this.modData("Learnsets", "trevenant").learnset.shadowpunch = ["8L1"];
		this.modData("Learnsets", "trevenant").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "trevenant").learnset.stoneedge = ["8L1"];
		// Gourgeist
		this.modData("Learnsets", "gourgeist").learnset.firepunch = ["8L1"];
		this.modData("Learnsets", "gourgeist").learnset.shadowpunch = ["8L1"];
		// Avalugg
		this.modData("Learnsets", "avalugg").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "avalugg").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "avalugg").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "avalugg").learnset.iciclecrash = ["8L1"];
		// Noivern
		this.modData("Learnsets", "noivern").learnset.spitfire = ["8L1"];
		// Diancie
		this.modData("Learnsets", "diancie").learnset.dizzypunch = ["8L1"];
		// Volcanion
		this.modData("Learnsets", "volcanion").learnset.mysticalfire = ["8L1"];
		this.modData("Learnsets", "volcanion").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "volcanion").learnset.aurasphere = ["8L1"];

		// Toucannon
		this.modData("Learnsets", "toucannon").learnset.spikecannon = ["8L1"];
		this.modData("Learnsets", "toucannon").learnset.heartbeat = ["8L1"];
		this.modData("Learnsets", "toucannon").learnset.quickattack = ["8L1"];
		this.modData("Learnsets", "toucannon").learnset.spitfire = ["8L1"];
		this.modData("Learnsets", "toucannon").learnset.flareblitz = ["8L1"];
		this.modData("Learnsets", "toucannon").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "toucannon").learnset.cloudcrush = ["8L1"];
		this.modData("Learnsets", "toucannon").learnset.lashout = ["8L1"];
		// Gumshoos
		this.modData("Learnsets", "gumshoos").learnset.trickroom = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.psychicfangs = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.poisonfang = ["8L1"];
		// Vikavolt
		this.modData("Learnsets", "vikavolt").learnset.calmmind = ["8L1"];
		// Crabominable
		this.modData("Learnsets", "crabominable").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.coaching = ["8L1"];
		// Oricorio
		this.modData("Learnsets", "oricorio").learnset.quiverdance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.fierydance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.teeterdance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.eclipse = ["8L1"];
		// Ribombee
		this.modData("Learnsets", "ribombee").learnset.endeavor = ["8L1"];
		// Lycanroc
		this.modData("Learnsets", "lycanroc").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "lycanroc").learnset.extremespeed = ["8L1"];
		this.modData("Learnsets", "lycanroc").learnset.doubleedge = ["8L1"];
		this.modData("Learnsets", "lycanroc").learnset.icefang = ["8L1"];
		this.modData("Learnsets", "lycanroc").learnset.poisonfang = ["8L1"];
		this.modData("Learnsets", "lycanroc").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "lycanroc").learnset.morningsun = ["8L1"];
		this.modData("Learnsets", "lycanroc").learnset.solarblade = ["8L1"];
		// Lycanroc-Midnight
		this.modData("Learnsets", "lycanrocmidnight").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.icepunch = ["8L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.icefang = ["8L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.poisonfang = ["8L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.moonlight = ["8L1"];
		// Lycanroc-Dusk
		this.modData("Learnsets", "lycanrocdusk").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.poisonfang = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.doublekick = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.lowkick = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.finalgambit = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.morningsun = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.solarblade = ["8L1"];
		// Wishiwashi
		this.modData("Learnsets", "wishiwashi").learnset.painsplit = ["8L1"];
		this.modData("Learnsets", "wishiwashi").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "wishiwashi").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "wishiwashi").learnset.lifedew = ["8L1"];
		// Araquanid
		this.modData("Learnsets", "araquanid").learnset.washaway = ["8L1"];
		// Lurantis
		this.modData("Learnsets", "lurantis").learnset.tailwind = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.curse = ["8L1"];
		// Shiinotic
		this.modData("Learnsets", "shiinotic").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "shiinotic").learnset.thunder = ["8L1"];
		// Bewear
		this.modData("Learnsets", "bewear").learnset.helpinghand = ["8L1"];
		this.modData("Learnsets", "bewear").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "bewear").learnset.faketears = ["8L1"];
		this.modData("Learnsets", "bewear").learnset.nobleroar = ["8L1"];
		// Salazzle
		this.modData("Learnsets", "salazzle").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.spitfire = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.corrosiveacid = ["8L1"];
		// Tsareena
		this.modData("Learnsets", "tsareena").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "tsareena").learnset.doublekick = ["8L1"];
		// Comfey
		this.modData("Learnsets", "comfey").learnset.dreameater = ["8L1"];
		this.modData("Learnsets", "comfey").learnset.hypnosis = ["8L1"];
		this.modData("Learnsets", "comfey").learnset.healingwish = ["8L1"];
		// Oranguru
		this.modData("Learnsets", "oranguru").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "oranguru").learnset.recover = ["8L1"];
		this.modData("Learnsets", "oranguru").learnset.powerswap = ["8L1"];
		this.modData("Learnsets", "oranguru").learnset.speedswap = ["8L1"];
		this.modData("Learnsets", "oranguru").learnset.guardswap = ["8L1"];
		this.modData("Learnsets", "oranguru").learnset.beatup = ["8L1"];
		// Passimian
		this.modData("Learnsets", "passimian").learnset.batonpass = ["8L1"];
		this.modData("Learnsets", "passimian").learnset.psychup = ["8L1"];
		// Golisopod
		this.modData("Learnsets", "golisopod").learnset.wipeout = ["8L1"];
		// Pyukumuku
		this.modData("Learnsets", "pyukumuku").learnset.aquaring = ["8L1"];
		this.modData("Learnsets", "pyukumuku").learnset.charm = ["8L1"];
		this.modData("Learnsets", "pyukumuku").learnset.captivate = ["8L1"];
		this.modData("Learnsets", "pyukumuku").learnset.disable = ["8L1"];
		this.modData("Learnsets", "pyukumuku").learnset.refresh = ["8L1"];
		// Type: Null
		this.modData("Learnsets", "typenull").learnset.adaptableattack = ["8L1"];
		this.modData("Learnsets", "typenull").learnset.cobaltwave = ["8L1"];
		// Silvally
		this.modData("Learnsets", "silvally").learnset.adaptableattack = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.cobaltwave = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.recover = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.dazzlinggleam = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.aquatail = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.waterpledge = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.firepledge = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.calmmind = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.bittrip = ["8L1"];
		// Minior
		this.modData("Learnsets", "minior").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "minior").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "minior").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "minior").learnset.meteormash = ["8L1"];
		this.modData("Learnsets", "minior").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "minior").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "minior").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "minior").learnset.cloudcrush = ["8L1"];
		// Komala
		this.modData("Learnsets", "komala").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "komala").learnset.nightmare = ["8L1"];
		this.modData("Learnsets", "komala").learnset.doubleedge = ["8L1"];
		this.modData("Learnsets", "komala").learnset.amnesia = ["8L1"];
		// Togedemaru
		this.modData("Learnsets", "togedemaru").learnset.spikes = ["8L1"];
		// Mimikyu
		this.modData("Learnsets", "mimikyu").learnset.dizzypunch = ["8L1"];
		// Bruxish
		this.modData("Learnsets", "bruxish").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "bruxish").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "bruxish").learnset.expandingforce = ["8L1"];
		// Xurkitree
		this.modData("Learnsets", "xurkitree").learnset.gigadrain = ["8L1"];
		this.modData("Learnsets", "xurkitree").learnset.paraboliccharge = ["8L1"];
		// Necrozma
		this.modData("Learnsets", "necrozma").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "necrozma").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "necrozma").learnset.adaptableattack = ["8L1"];
		// Meltan
		this.modData("Learnsets", "meltan").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "meltan").learnset.return = ["8L1"];
		this.modData("Learnsets", "meltan").learnset.frustration = ["8L1"];
		// Melmetal
		this.modData("Learnsets", "melmetal").learnset.meteormash = ["8L1"];
		this.modData("Learnsets", "melmetal").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "melmetal").learnset.return = ["8L1"];
		this.modData("Learnsets", "melmetal").learnset.frustration = ["8L1"];

		// Grookey
		this.modData("Learnsets", "grookey").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "grookey").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "grookey").learnset.return = ["8L1"];
		this.modData("Learnsets", "grookey").learnset.frustration = ["8L1"];
		// Thwackey
		this.modData("Learnsets", "thwackey").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "thwackey").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "thwackey").learnset.return = ["8L1"];
		this.modData("Learnsets", "thwackey").learnset.frustration = ["8L1"];
		// Rillaboom
		this.modData("Learnsets", "rillaboom").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "rillaboom").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "rillaboom").learnset.return = ["8L1"];
		this.modData("Learnsets", "rillaboom").learnset.frustration = ["8L1"];
		// Scorbunny
		this.modData("Learnsets", "scorbunny").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "scorbunny").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "scorbunny").learnset.return = ["8L1"];
		this.modData("Learnsets", "scorbunny").learnset.frustration = ["8L1"];
		// Raboot
		this.modData("Learnsets", "raboot").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "raboot").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "raboot").learnset.return = ["8L1"];
		this.modData("Learnsets", "raboot").learnset.frustration = ["8L1"];
		// Cinderace
		this.modData("Learnsets", "cinderace").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "cinderace").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "cinderace").learnset.return = ["8L1"];
		this.modData("Learnsets", "cinderace").learnset.frustration = ["8L1"];
		// Sobble
		this.modData("Learnsets", "sobble").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "sobble").learnset.laserfocus = ["8L1"];
		this.modData("Learnsets", "sobble").learnset.signalbeam = ["8L1"];
		this.modData("Learnsets", "sobble").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "sobble").learnset.return = ["8L1"];
		this.modData("Learnsets", "sobble").learnset.frustration = ["8L1"];
		// Drizzile
		this.modData("Learnsets", "drizzile").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "drizzile").learnset.laserfocus = ["8L1"];
		this.modData("Learnsets", "drizzile").learnset.signalbeam = ["8L1"];
		this.modData("Learnsets", "drizzile").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "drizzile").learnset.return = ["8L1"];
		this.modData("Learnsets", "drizzile").learnset.frustration = ["8L1"];
		// Inteleon
		this.modData("Learnsets", "inteleon").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "inteleon").learnset.laserfocus = ["8L1"];
		this.modData("Learnsets", "inteleon").learnset.signalbeam = ["8L1"];
		this.modData("Learnsets", "inteleon").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "inteleon").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "inteleon").learnset.return = ["8L1"];
		this.modData("Learnsets", "inteleon").learnset.frustration = ["8L1"];
		// Skwovet
		this.modData("Learnsets", "skwovet").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "skwovet").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "skwovet").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "skwovet").learnset.curse = ["8L1"];
		this.modData("Learnsets", "skwovet").learnset.doubleedge = ["8L1"];
		this.modData("Learnsets", "skwovet").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "skwovet").learnset.return = ["8L1"];
		this.modData("Learnsets", "skwovet").learnset.frustration = ["8L1"];
		// Greedent
		this.modData("Learnsets", "greedent").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "greedent").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "greedent").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "greedent").learnset.curse = ["8L1"];
		this.modData("Learnsets", "greedent").learnset.doubleedge = ["8L1"];
		this.modData("Learnsets", "greedent").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "greedent").learnset.return = ["8L1"];
		this.modData("Learnsets", "greedent").learnset.frustration = ["8L1"];
		// Rookidee
		this.modData("Learnsets", "rookidee").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "rookidee").learnset.return = ["8L1"];
		this.modData("Learnsets", "rookidee").learnset.frustration = ["8L1"];
		// Corvisquire
		this.modData("Learnsets", "corvisquire").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "corvisquire").learnset.return = ["8L1"];
		this.modData("Learnsets", "corvisquire").learnset.frustration = ["8L1"];
		// Corviknight
		this.modData("Learnsets", "corviknight").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "corviknight").learnset.return = ["8L1"];
		this.modData("Learnsets", "corviknight").learnset.frustration = ["8L1"];
		// Blipbug
		this.modData("Learnsets", "blipbug").learnset.hiddenpower = ["8L1"];
		// Dottler
		this.modData("Learnsets", "dottler").learnset.gravity = ["8L1"];
		this.modData("Learnsets", "dottler").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "dottler").learnset.speedswap = ["8L1"];
		// Orbeetle
		this.modData("Learnsets", "orbeetle").learnset.gravity = ["8L1"];
		this.modData("Learnsets", "orbeetle").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "orbeetle").learnset.speedswap = ["8L1"];
		this.modData("Learnsets", "orbeetle").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "orbeetle").learnset.return = ["8L1"];
		this.modData("Learnsets", "orbeetle").learnset.frustration = ["8L1"];
		// Nickit
		this.modData("Learnsets", "nickit").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.return = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.frustration = ["8L1"];
		// Thievul
		this.modData("Learnsets", "thievul").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "thievul").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "thievul").learnset.return = ["8L1"];
		this.modData("Learnsets", "thievul").learnset.frustration = ["8L1"];
		// Gossifleur
		this.modData("Learnsets", "gossifleur").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "gossifleur").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "gossifleur").learnset.return = ["8L1"];
		this.modData("Learnsets", "gossifleur").learnset.frustration = ["8L1"];
		// Eldegoss
		this.modData("Learnsets", "eldegoss").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "eldegoss").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "eldegoss").learnset.return = ["8L1"];
		this.modData("Learnsets", "eldegoss").learnset.frustration = ["8L1"];
		// Wooloo
		this.modData("Learnsets", "wooloo").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "wooloo").learnset.return = ["8L1"];
		this.modData("Learnsets", "wooloo").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "wooloo").learnset.earthquake = ["8L1"];
		// Dubwool
		this.modData("Learnsets", "dubwool").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "dubwool").learnset.return = ["8L1"];
		this.modData("Learnsets", "dubwool").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "dubwool").learnset.earthquake = ["8L1"];
		// Chewtle
		this.modData("Learnsets", "chewtle").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "chewtle").learnset.return = ["8L1"];
		this.modData("Learnsets", "chewtle").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "chewtle").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "chewtle").learnset.wipeout = ["8L1"];
		// Drednaw
		this.modData("Learnsets", "drednaw").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "drednaw").learnset.return = ["8L1"];
		this.modData("Learnsets", "drednaw").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "drednaw").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "drednaw").learnset.wipeout = ["8L1"];
		// Yamper
		this.modData("Learnsets", "yamper").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "yamper").learnset.return = ["8L1"];
		this.modData("Learnsets", "yamper").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "yamper").learnset.signalbeam = ["8L1"];
		this.modData("Learnsets", "yamper").learnset.disarmingvoice = ["8L1"];
		// Boltund
		this.modData("Learnsets", "boltund").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.return = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.doublekick = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.icefang = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.signalbeam = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.disarmingvoice = ["8L1"];
		// Rolycoly
		this.modData("Learnsets", "rolycoly").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "rolycoly").learnset.return = ["8L1"];
		this.modData("Learnsets", "rolycoly").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "rolycoly").learnset.lavapulme = ["8L1"];
		// Carkol
		this.modData("Learnsets", "carkol").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "carkol").learnset.return = ["8L1"];
		this.modData("Learnsets", "carkol").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "carkol").learnset.lavapulme = ["8L1"];
		// Coalossal
		this.modData("Learnsets", "coalossal").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "coalossal").learnset.return = ["8L1"];
		this.modData("Learnsets", "coalossal").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "coalossal").learnset.lavapulme = ["8L1"];
		// Applin
		this.modData("Learnsets", "applin").learnset.toxic = ["8L1"];
		// Flapple
		this.modData("Learnsets", "flapple").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "flapple").learnset.return = ["8L1"];
		this.modData("Learnsets", "flapple").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "flapple").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "flapple").learnset.chipaway = ["8L1"];
		this.modData("Learnsets", "flapple").learnset.gravity = ["8L1"];
		this.modData("Learnsets", "flapple").learnset.rockslide = ["8L1"];
		// Appletun
		this.modData("Learnsets", "appletun").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "appletun").learnset.return = ["8L1"];
		this.modData("Learnsets", "appletun").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "appletun").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "appletun").learnset.chipaway = ["8L1"];
		this.modData("Learnsets", "appletun").learnset.earthpower = ["8L1"];
		// Silicobra
		this.modData("Learnsets", "silicobra").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "silicobra").learnset.return = ["8L1"];
		this.modData("Learnsets", "silicobra").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "silicobra").learnset.slackoff = ["8L1"];
		// Sandaconda
		this.modData("Learnsets", "sandaconda").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.return = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.slackoff = ["8L1"];
		// Cramorant
		this.modData("Learnsets", "cramorant").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.return = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.washaway = ["8L1"];
		// Arrokuda
		this.modData("Learnsets", "arrokuda").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "arrokuda").learnset.return = ["8L1"];
		this.modData("Learnsets", "arrokuda").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "arrokuda").learnset.aquatail = ["8L1"];
		// Barraskewda
		this.modData("Learnsets", "barraskewda").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "barraskewda").learnset.return = ["8L1"];
		this.modData("Learnsets", "barraskewda").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "barraskewda").learnset.aquatail = ["8L1"];
		// Toxel
		this.modData("Learnsets", "toxel").learnset.toxic = ["8L1"];
		// Toxtricity
		this.modData("Learnsets", "toxtricity").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "toxtricity").learnset.return = ["8L1"];
		this.modData("Learnsets", "toxtricity").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "toxtricity").learnset.shadowball = ["8L1"];
		// Toxtricity-Lowkey
		this.modData("Learnsets", "toxtricitylowkey").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.return = ["8L1"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "toxtricitylowkey").learnset.shadowball = ["8L1"];
		// Sizzlipede
		this.modData("Learnsets", "sizzlipede").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "sizzlipede").learnset.return = ["8L1"];
		this.modData("Learnsets", "sizzlipede").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "sizzlipede").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "sizzlipede").learnset.websling = ["8L1"];
		// Centiskorch
		this.modData("Learnsets", "centiskorch").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "centiskorch").learnset.return = ["8L1"];
		this.modData("Learnsets", "centiskorch").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "centiskorch").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "centiskorch").learnset.websling = ["8L1"];
		// Clobbopus
		this.modData("Learnsets", "clobbopus").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.return = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.recover = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.darkestlariat = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.throatchop = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.foulplay = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.memento = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.powertrip = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.scald = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.raindance = ["8L1"];
		this.modData("Learnsets", "clobbopus").learnset.aquajet = ["8L1"];
		// Grapploct
		this.modData("Learnsets", "grapploct").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.return = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.recover = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.scald = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.washaway = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.raindance = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.aquajet = ["8L1"];
		// Sinistea
		this.modData("Learnsets", "sinistea").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "sinistea").learnset.return = ["8L1"];
		this.modData("Learnsets", "sinistea").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "sinistea").learnset.scald = ["8L1"];
		// Polteageist
		this.modData("Learnsets", "polteageist").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "polteageist").learnset.return = ["8L1"];
		this.modData("Learnsets", "polteageist").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "polteageist").learnset.scald = ["8L1"];
		// Hatenna
		this.modData("Learnsets", "hatenna").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "hatenna").learnset.return = ["8L1"];
		this.modData("Learnsets", "hatenna").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "hatenna").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "hatenna").learnset.heartbeat = ["8L1"];
		// Hattrem
		this.modData("Learnsets", "hattrem").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "hattrem").learnset.return = ["8L1"];
		this.modData("Learnsets", "hattrem").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "hattrem").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "hattrem").learnset.heartbeat = ["8L1"];
		// Hatterene
		this.modData("Learnsets", "hatterene").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "hatterene").learnset.return = ["8L1"];
		this.modData("Learnsets", "hatterene").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "hatterene").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "hatterene").learnset.heartbeat = ["8L1"];
		// Impidimp
		this.modData("Learnsets", "impidimp").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "impidimp").learnset.return = ["8L1"];
		this.modData("Learnsets", "impidimp").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "impidimp").learnset.dizzypunch = ["8L1"];
		// Morgrem
		this.modData("Learnsets", "morgrem").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "morgrem").learnset.return = ["8L1"];
		this.modData("Learnsets", "morgrem").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "morgrem").learnset.dizzypunch = ["8L1"];
		// Grimmsnarl
		this.modData("Learnsets", "grimmsnarl").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "grimmsnarl").learnset.return = ["8L1"];
		this.modData("Learnsets", "grimmsnarl").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "grimmsnarl").learnset.dizzypunch = ["8L1"];
		// Obstagoon
		this.modData("Learnsets", "obstagoon").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "obstagoon").learnset.return = ["8L1"];
		this.modData("Learnsets", "obstagoon").learnset.frustration = ["8L1"];
		// Perrserker
		this.modData("Learnsets", "perrserker").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "perrserker").learnset.return = ["8L1"];
		this.modData("Learnsets", "perrserker").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "perrserker").learnset.bulletpunch = ["8L1"];
		this.modData("Learnsets", "perrserker").learnset.colbaltwave = ["8L1"];
		this.modData("Learnsets", "perrserker").learnset.thunderwave = ["8L1"];
		// Cursola
		this.modData("Learnsets", "cursola").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "cursola").learnset.return = ["8L1"];
		this.modData("Learnsets", "cursola").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "cursola").learnset.eclipse = ["8L1"];
		this.modData("Learnsets", "cursola").learnset.wipeout = ["8L1"];
		this.modData("Learnsets", "cursola").learnset.infestation = ["8L1"];
		this.modData("Learnsets", "cursola").learnset.block = ["8L1"];
		// Sirfetchd
		this.modData("Learnsets", "sirfetchd").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "sirfetchd").learnset.return = ["8L1"];
		this.modData("Learnsets", "sirfetchd").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "sirfetchd").learnset.roost = ["8L1"];
		// Mr Rime
		this.modData("Learnsets", "mrrime").learnset.chillout = ["8L1"];
		// Runerigus
		this.modData("Learnsets", "runerigus").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "runerigus").learnset.return = ["8L1"];
		this.modData("Learnsets", "runerigus").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "runerigus").learnset.painsplit = ["8L1"];
		this.modData("Learnsets", "runerigus").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "runerigus").learnset.shadowpunch = ["8L1"];
		this.modData("Learnsets", "runerigus").learnset.dizzypunch = ["8L1"];
		this.modData("Learnsets", "runerigus").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "runerigus").learnset.shadowsneak = ["8L1"];
		// Milcery
		this.modData("Learnsets", "milcery").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "milcery").learnset.return = ["8L1"];
		this.modData("Learnsets", "milcery").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "milcery").learnset.moonblast = ["8L1"];
		// Alcremie
		this.modData("Learnsets", "alcremie").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.return = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.moonblast = ["8L1"];
		// Falinks
		this.modData("Learnsets", "falinks").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "falinks").learnset.return = ["8L1"];
		this.modData("Learnsets", "falinks").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "falinks").learnset.rockblast = ["8L1"];
		this.modData("Learnsets", "falinks").learnset.steelbeam = ["8L1"];
		// Pincurchin
		this.modData("Learnsets", "pincurchin").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "pincurchin").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "pincurchin").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "pincurchin").learnset.acidspray = ["8L1"];
		this.modData("Learnsets", "pincurchin").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "pincurchin").learnset.spikyshield = ["8L1"];
		// Snom
		this.modData("Learnsets", "snom").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "snom").learnset.return = ["8L1"];
		this.modData("Learnsets", "snom").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "snom").learnset.chillout = ["8L1"];
		// Frosmoth
		this.modData("Learnsets", "frosmoth").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "frosmoth").learnset.return = ["8L1"];
		this.modData("Learnsets", "frosmoth").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "frosmoth").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "frosmoth").learnset.roost = ["8L1"];
		// Stonjourner
		this.modData("Learnsets", "stonjourner").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "stonjourner").learnset.return = ["8L1"];
		this.modData("Learnsets", "stonjourner").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "stonjourner").learnset.helpinghand = ["8L1"];
		this.modData("Learnsets", "stonjourner").learnset.followme = ["8L1"];
		this.modData("Learnsets", "stonjourner").learnset.trickroom = ["8L1"];
		// Eiscue
		this.modData("Learnsets", "eiscue").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.return = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.nastyplot = ["8L1"];
		// Indeedee
		this.modData("Learnsets", "indeedee").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "indeedee").learnset.return = ["8L1"];
		this.modData("Learnsets", "indeedee").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "indeedee").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "indeedee").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "indeedee").learnset.nastyplot = ["8L1"];
		// Indeedee-F
		this.modData("Learnsets", "indeedeef").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "indeedeef").learnset.return = ["8L1"];
		this.modData("Learnsets", "indeedeef").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "indeedeef").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "indeedeef").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "indeedeef").learnset.nastyplot = ["8L1"];
		// Morpeko
		this.modData("Learnsets", "morpeko").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "morpeko").learnset.return = ["8L1"];
		this.modData("Learnsets", "morpeko").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "morpeko").learnset.helpinghand = ["8L1"];
		// Cufant
		this.modData("Learnsets", "cufant").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "cufant").learnset.return = ["8L1"];
		this.modData("Learnsets", "cufant").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "cufant").learnset.cobaltwave = ["8L1"];
		this.modData("Learnsets", "cufant").learnset.spikes = ["8L1"];
		// Copperajah
		this.modData("Learnsets", "copperajah").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "copperajah").learnset.return = ["8L1"];
		this.modData("Learnsets", "copperajah").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "copperajah").learnset.cobaltwave = ["8L1"];
		this.modData("Learnsets", "copperajah").learnset.spikes = ["8L1"];
		// Dracozolt
		this.modData("Learnsets", "dracozolt").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "dracozolt").learnset.return = ["8L1"];
		this.modData("Learnsets", "dracozolt").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "dracozolt").learnset.chipaway = ["8L1"];
		this.modData("Learnsets", "dracozolt").learnset.zingzap = ["8L1"];
		// Arctozolt
		this.modData("Learnsets", "arctozolt").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "arctozolt").learnset.return = ["8L1"];
		this.modData("Learnsets", "arctozolt").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "arctozolt").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "arctozolt").learnset.zingzap = ["8L1"];
		// Dracovish
		this.modData("Learnsets", "dracovish").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "dracovish").learnset.return = ["8L1"];
		this.modData("Learnsets", "dracovish").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "dracovish").learnset.chipaway = ["8L1"];
		this.modData("Learnsets", "dracovish").learnset.stalagbite = ["8L1"];
		this.modData("Learnsets", "dracovish").learnset.washaway = ["8L1"];
		// Arctovish
		this.modData("Learnsets", "arctovish").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "arctovish").learnset.return = ["8L1"];
		this.modData("Learnsets", "arctovish").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "arctovish").learnset.chillout = ["8L1"];
		this.modData("Learnsets", "arctovish").learnset.washaway = ["8L1"];
		// Duraludon
		this.modData("Learnsets", "duraludon").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "duraludon").learnset.return = ["8L1"];
		this.modData("Learnsets", "duraludon").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "duraludon").learnset.cobaltwave = ["8L1"];
		// Dreepy
		this.modData("Learnsets", "dreepy").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "dreepy").learnset.return = ["8L1"];
		this.modData("Learnsets", "dreepy").learnset.frustration = ["8L1"];
		// Drakloak
		this.modData("Learnsets", "drakloak").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "drakloak").learnset.return = ["8L1"];
		this.modData("Learnsets", "drakloak").learnset.frustration = ["8L1"];
		// Dragapult
		this.modData("Learnsets", "dragapult").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "dragapult").learnset.return = ["8L1"];
		this.modData("Learnsets", "dragapult").learnset.frustration = ["8L1"];
		// Zacian
		this.modData("Learnsets", "zacian").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "zacian").learnset.return = ["8L1"];
		this.modData("Learnsets", "zacian").learnset.frustration = ["8L1"];
		// Zamazenta
		this.modData("Learnsets", "zamazenta").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.return = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.bodypress = ["8L1"];
		// Eternatus
		this.modData("Learnsets", "eternatus").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "eternatus").learnset.return = ["8L1"];
		this.modData("Learnsets", "eternatus").learnset.frustration = ["8L1"];
		// Kubfu
		this.modData("Learnsets", "kubfu").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "kubfu").learnset.return = ["8L1"];
		this.modData("Learnsets", "kubfu").learnset.frustration = ["8L1"];
		// Urshifu
		this.modData("Learnsets", "urshifu").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.return = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.frustration = ["8L1"];
		// Urshifu-Rapid-Strike
		this.modData("Learnsets", "urshifurapidstrike").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "urshifurapidstrike").learnset.return = ["8L1"];
		this.modData("Learnsets", "urshifurapidstrike").learnset.frustration = ["8L1"];
		// Zarude
		this.modData("Learnsets", "zarude").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "zarude").learnset.return = ["8L1"];
		this.modData("Learnsets", "zarude").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "zarude").learnset.knockoff = ["8L1"];
		// Regieleki
		this.modData("Learnsets", "regieleki").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.return = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.hammerarm = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.chargebeam = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.bulldoze = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.stomp = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.curse = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.amnesia = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.quickattack = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "regieleki").learnset.magnetbomb = ["8L1"];
		// Regidrago
		this.modData("Learnsets", "regidrago").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.return = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.lockon = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.chargebeam = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.bulldoze = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.stomp = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.curse = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.irondefense = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.zapcannon = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.fireblast = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "regidrago").learnset.thunder = ["8L1"];
		// Glastrier
		this.modData("Learnsets", "glastrier").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "glastrier").learnset.return = ["8L1"];
		this.modData("Learnsets", "glastrier").learnset.frustration = ["8L1"];
		// Spectrier
		this.modData("Learnsets", "spectrier").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "spectrier").learnset.return = ["8L1"];
		this.modData("Learnsets", "spectrier").learnset.frustration = ["8L1"];
		// Calyrex
		this.modData("Learnsets", "calyrex").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "calyrex").learnset.return = ["8L1"];
		this.modData("Learnsets", "calyrex").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "calyrex").learnset.rototiller = ["8L1"];
		// Calyrex-Shadow
		this.modData("Learnsets", "calyrexshadow").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "calyrexshadow").learnset.return = ["8L1"];
		this.modData("Learnsets", "calyrexshadow").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "calyrexshadow").learnset.rototiller = ["8L1"];
		// Calyrex-Ice
		this.modData("Learnsets", "calyrexice").learnset.hiddenpower = ["8L1"];
		this.modData("Learnsets", "calyrexice").learnset.return = ["8L1"];
		this.modData("Learnsets", "calyrexice").learnset.frustration = ["8L1"];
		this.modData("Learnsets", "calyrexice").learnset.rototiller = ["8L1"];

// Extra Moves
this.modData('Learnsets', 'bagon').learnset.submission = ['8L1'];
this.modData('Learnsets', 'azelf').learnset.submission = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.submission = ['8L1'];
this.modData('Learnsets', 'aerodactyl').learnset.submission = ['8L1'];
this.modData('Learnsets', 'kingler').learnset.submission = ['8L1'];
this.modData('Learnsets', 'thundurus').learnset.submission = ['8L1'];
this.modData('Learnsets', 'grimmsnarl').learnset.submission = ['8L1'];
this.modData('Learnsets', 'toxicroak').learnset.submission = ['8L1'];
this.modData('Learnsets', 'emboar').learnset.submission = ['8L1'];
this.modData('Learnsets', 'incineroar').learnset.submission = ['8L1'];
this.modData('Learnsets', 'luxray').learnset.submission = ['8L1'];
this.modData('Learnsets', 'steelix').learnset.submission = ['8L1'];
this.modData('Learnsets', 'rowlet').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'cyndaquil').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'oshawott').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'starly').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'rapidash').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'eevee').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'zubat').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'floatzel').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'pichu').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'abra').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'chimchar').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'buneary').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'scyther').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'mimejr').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'aipom').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'budew').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'petilil').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'yanma').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'pachirisu').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'porygon').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'gastly').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'skorupi').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'growlithe').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'glameow').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'chatot').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'basculin').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'vulpix').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'vulpixalola').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'tentacool').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'lumineon').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'magby').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'elekid').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'gligar').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'gible').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'voltorb').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'rotom').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'misdreavus').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'sneasel').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'snorunt').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'zorua').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'riolu').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'uxie').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'azelf').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'mesprit').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'arceus').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'dialga').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'shaymin').learnset.agilestance = ['8L1'];
this.modData('Learnsets', 'rowlet').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'cyndaquil').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'oshawott').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'luxray').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'eevee').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'kricketot').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'wormadam').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'wormadamsandy').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'wormadamtrash').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'mothim').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'geodude').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'stantler').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'munchlax').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'paras').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'vespiquen').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'shellos').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'happiny').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'tangela').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'barboach').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'hippopotas').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'teddiursa').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'onix').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'rhyhorn').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'bonsly').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'lickitung').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'turtwig').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'piplup').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'murkrow').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'spheal').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'remoraid').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'machop').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'duskull').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'magnemite').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'bronzor').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'nosepass').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'chingling').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'cleffa').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'cranidos').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'shieldon').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'bergmite').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'rufflet').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'regigigas').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'palkia').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'arceus').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'mesprit').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'uxie').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'azelf').learnset.powerstance = ['8L1'];
this.modData('Learnsets', 'lunatone').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'braixen').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'spoink').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'espeon').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'slowpoke').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'slowpokegalar').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'cortefauna').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'creaviary').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'gammaroo').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'smoochum').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'neurowatt').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'mustellar').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'petradvena').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'solrock').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'nimbless').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'shaymin').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'swablu').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'drampa').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'psyduck').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'lickitung').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'igglybuff').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'chingling').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'girafarig').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'staryu').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'indeedee').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'indeedeef').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'claydol').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'oranguru').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'woobat').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'mesprit').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'necrozma').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'elgyem').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'swinub').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'slurpuff').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'treecko').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'munchlax').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'nickit').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'doduo').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'cleffa').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'wooper').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'bidoof').learnset.absentmind = ['8L1'];
this.modData('Learnsets', 'hitmonlee').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'pawniard').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'leavanny').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'simisage').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'carnivine').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'tropius').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'victreebel').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'shaymin').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'pumpkaboo').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'stantler').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'zangoose').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'komala').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'escavalier').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'parasect').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'exeggutor').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'exeggutoralola').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'skiddo').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'snivy').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'meganium').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'oddish').learnset.solarblade = ['8L1'];
this.modData('Learnsets', 'delphox').learnset.meteorbeam = ['8L1'];
this.modData('Learnsets', 'magcargo').learnset.shelltrap = ['8L1'];
this.modData('Learnsets', 'jangmoo').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'treecko').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'cortefauna').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'thermodo').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'ptarabola').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'feebas').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'charmander').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'dratini').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'arbok').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'totodile').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'krookodile').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'seviper').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'carvanha').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'tropius').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'yanma').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'zygarde').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'axew').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'drampa').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'arrokuda').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'flygon').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'inteleon').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'tyrunt').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'kingdra').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'sandaconda').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'basculin').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'dunsparce').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'qwilfish').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'relicanth').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'turtonator').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'wishiwashi').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'regidrago').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'poipole').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'goblizz').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'goodra').learnset.scaledown = ['8L1'];
this.modData('Learnsets', 'skrelp').learnset.scaledown = ['8L1'];
	},
};
