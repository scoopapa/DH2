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


	},
};
