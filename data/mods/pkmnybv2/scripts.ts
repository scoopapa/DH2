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
	},
};
