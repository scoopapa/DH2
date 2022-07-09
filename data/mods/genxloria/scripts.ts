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
		if (item.name === "Salamencite" && pokemon.baseSpecies.name === "Salamence-Loria") {
			return null;
		}
		if (item.name === "Samurite" && pokemon.baseSpecies.name === "Samurott-Hisui") {
			return null;
		}
		if (item.name === "Grumpigite" && pokemon.baseSpecies.name === "Grumpig-Loria") {
			return "Grumpig-Loria-Mega"; 
		}
		return item.megaStone;
	},
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["Loria FE", "Loria NFE", "Loria LC"],
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
// bushclaws
this.modData('Learnsets', 'absol').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'meowth').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'persian').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'sneasel').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'weavile').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'skitty').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'delcatty').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'glameow').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'purugly').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'espurr').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'meowstic').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'meowsticf').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'purrloin').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'liepard').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'oricorio').learnset.revelationspin = ['7L1'];
		
// drainfang
this.modData('Learnsets', 'carvanha').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'sharpedo').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'snorunt').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'glalie').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'froslass').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'hydreigon').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'deino').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'zweilous').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'rockruff').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'lycanrocmidnight').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'lycanrocdusk').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'silvally').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'guzzlord').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'zubat').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'golbat').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'crobat').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'noibat').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'noivern').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'mimikyu').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'impidimp').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'morgrem').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'grimmsnarl').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'ekans').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'arbok').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'houndour').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'houndoom').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'girafarig').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'poochyena').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'mightyena').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'seviper').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'huntail').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'eelektrik').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'eelektross').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'gastly').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'haunter').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'gengar').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'shuppet').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'banette').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'sableye').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'giratina').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'trevenant').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'lunala').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'dreepy').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'dragapult').learnset.drainfang = ['7L1'];
this.modData('Learnsets', 'drakloak').learnset.drainfang = ['7L1'];
		
// terracharge
this.modData('Learnsets', 'rhyhorn').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'rhydon').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'rhyperior').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'mudkip').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'marshtomp').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'swampert').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'numel').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'camerupt').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'swinub').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'piloswine').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'mamoswine').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'mudbray').learnset.terracharge = ['7L1'];
this.modData('Learnsets', 'mudsdale').learnset.terracharge = ['7L1'];
		
// poisondart
this.modData('Learnsets', 'mienfoo').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'mienshao').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'croagunk').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'toxicroak').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'ekans').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'arbok').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'seviper').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'trapinch').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'vibrava').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'flygon').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'skorupi').learnset.poisondart = ['7L1'];
this.modData('Learnsets', 'drapion').learnset.poisondart = ['7L1'];
		
// pressurecook
this.modData('Learnsets', 'spoink').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'darumaka').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'darmanitan').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'oranguru').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'woobat').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'swoobat').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'grumpig').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'pikipek').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'trumbeak').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'toucannon').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'espurr').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'meowstic').learnset.pressurecook = ['7L1'];
this.modData('Learnsets', 'meowsticf').learnset.pressurecook = ['7L1'];
		
// Loria Additions
// Shock Tail
this.modData('Learnsets', 'srinbow').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'elekid').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'mareep').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'shinx').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'pachirisu').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'blitzle').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'eelektrik').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'eelektross').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'yamper').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'toxel').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'rhyhorn').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'absol').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'pichu').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'raichu').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'plusle').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'minun').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'pachirisu').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'emolga').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'dedenne').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'togedemaru').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'rikomoco').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'aipom').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'jolteon').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'flareon').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'vibrava').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'galliwatt').learnset.shocktail = ['8L1'];
this.modData('Learnsets', 'cougaquil').learnset.shocktail = ['8L1'];

// Banana Split 
this.modData('Learnsets', 'vanillite').learnset.bananasplit = ['8L1'];
this.modData('Learnsets', 'tropius').learnset.bananasplit = ['8L1'];
this.modData('Learnsets', 'snover').learnset.bananasplit = ['8L1'];
this.modData('Learnsets', 'skittyloria').learnset.bananasplit = ['8L1'];
this.modData('Learnsets', 'oranguru').learnset.bananasplit = ['8L1'];
this.modData('Learnsets', 'passimian').learnset.bananasplit = ['8L1'];
this.modData('Learnsets', 'aipom').learnset.bananasplit = ['8L1'];
this.modData('Learnsets', 'darumakagalar').learnset.bananasplit = ['8L1'];

// Sparking Leap 
this.modData('Learnsets', 'usawald').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'plusle').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'minun').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'eelektrik').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'joltik').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'chinchou').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'regieleki').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'stunfisk').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'togedemaru').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'blitzle').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'zeraora').learnset.sparkingleap = ['8L1'];
this.modData('Learnsets', 'rotom').learnset.sparkingleap = ['8L1'];

// Firework Leaf
this.modData('Learnsets', 'firack').learnset.fireworkleaf = ['8L1'];
this.modData('Learnsets', 'zarude').learnset.fireworkleaf = ['8L1'];
this.modData('Learnsets', 'rowlet').learnset.fireworkleaf = ['8L1'];
this.modData('Learnsets', 'cacnea').learnset.fireworkleaf = ['8L1'];
this.modData('Learnsets', 'phantump').learnset.fireworkleaf = ['8L1'];
this.modData('Learnsets', 'carnivine').learnset.fireworkleaf = ['8L1'];
this.modData('Learnsets', 'leafeon').learnset.fireworkleaf = ['8L1'];

// Quick Shot
this.modData('Learnsets', 'nymphire').learnset.quickshot = ['8L1'];
this.modData('Learnsets', 'magby').learnset.quickshot = ['8L1'];
this.modData('Learnsets', 'cyndaquil').learnset.quickshot = ['8L1'];
this.modData('Learnsets', 'fennekin').learnset.quickshot = ['8L1'];
this.modData('Learnsets', 'salandit').learnset.quickshot = ['8L1'];
this.modData('Learnsets', 'litleo').learnset.quickshot = ['8L1'];

// Cripple Clobber
this.modData('Learnsets', 'sawkprehistoric').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'rhyhorn').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'onix').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'aron').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'armaldo').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'regirock').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'rampardos').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'gigalith').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'barbaracle').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'lycanrocmidnight').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'stonjourner').learnset.crippleclobber = ['8L1'];
this.modData('Learnsets', 'stantler').learnset.psyshieldbash = ['8L1'];

// Dex Additions
this.modData("Learnsets", "spearow").learnset.payday = ["8L1"];
this.modData("Learnsets", "oranguru").learnset.bushclaws = ["8L1"];
this.modData("Learnsets", "passimian").learnset.bushclaws = ["8L1"];
this.modData("Learnsets", "aipom").learnset.highjumpkick = ["8L1"];
this.modData("Learnsets", "aipom").learnset.bushclaws = ["8L1"];
this.modData("Learnsets", "aipom").learnset.clinch = ["8L1"];
this.modData("Learnsets", "aipom").learnset.revenge = ["8L1"];
this.modData("Learnsets", "ambipom").learnset.highjumpkick = ["8L1"];
this.modData("Learnsets", "ambipom").learnset.bushclaws = ["8L1"];
this.modData("Learnsets", "ambipom").learnset.clinch = ["8L1"];
this.modData("Learnsets", "ambipom").learnset.revenge = ["8L1"];
this.modData("Learnsets", "eevee").learnset.drainfang = ["8L1"];
this.modData("Learnsets", "flareon").learnset.bulkup = ["8L1"];
this.modData("Learnsets", "glaceon").learnset.surf = ["8L1"];
this.modData("Learnsets", "glaceon").learnset.hydropump = ["8L1"];
this.modData("Learnsets", "leafeon").learnset.bushclaws = ["8L1"];
this.modData("Learnsets", "bronzor").learnset.gravity = ["8L1"];
this.modData("Learnsets", "bronzor").learnset.imprison = ["8L1"];
this.modData("Learnsets", "cufant").learnset.gunkshot = ["8L1"];
this.modData("Learnsets", "poliwrath").learnset.bodypress = ["8L1"];
this.modData("Learnsets", "politoed").learnset.aquaballet = ["8L1"];
this.modData("Learnsets", "politoed").learnset.hurricane = ["8L1"];
this.modData("Learnsets", "hippopotas").learnset.terracharge = ["8L1"];
this.modData("Learnsets", "solosis").learnset.pressurecook = ["8L1"];
this.modData("Learnsets", "gastly").learnset.drainfang = ["8L1"];
this.modData("Learnsets", "mimikyu").learnset.bushclaws = ["8L1"];
this.modData("Learnsets", "luxray").learnset.thunderstrike = ["8L1"];
this.modData("Learnsets", "elekid").learnset.thunderstrike = ["8L1"];
this.modData("Learnsets", "klinklang").learnset.thunderstrike = ["8L1"];
this.modData("Learnsets", "shroomish").learnset.revenge = ["8L1"];
this.modData("Learnsets", "breloom").learnset.revenge = ["8L1"];
this.modData("Learnsets", "glameow").learnset.bushclaws = ["8L1"];
this.modData("Learnsets", "purugly").learnset.bushclaws = ["8L1"];
this.modData("Learnsets", "galliwatt").learnset.thunderstrike = ["8L1"];
this.modData("Learnsets", "basculin").learnset.drainfang = ["8L1"];
this.modData("Learnsets", "florges").learnset.leechseed = ["8L1"];
this.modData("Learnsets", "spiritomb").learnset.recover = ["8L1"];
this.modData("Learnsets", "spiritomb").learnset.astonish = ["8L1"];
this.modData("Learnsets", "spiritomb").learnset.confuseray = ["8L1"];
		/*
// Hisuian Evolutions
this.modData("Learnsets", "wyrdeer").learnset.expandingforce = ["8L1"];
this.modData("Learnsets", "wyrdeer").learnset.hyperbeam = ["8L1"];
this.modData("Learnsets", "wyrdeer").learnset.hypervoice = ["8L1"];
this.modData("Learnsets", "wyrdeer").learnset.recover = ["8L1"];
this.modData("Learnsets", "wyrdeer").learnset.bodypress = ["8L1"];
this.modData("Learnsets", "wyrdeer").learnset.focusblast = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.ceaselessedge = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.nightslash = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.slash = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.darkpulse = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.psychocut = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.megahorn = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.hydrocannon = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.gigaimpact = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.hyperbeam = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.superpower = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.dragontail = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.spikes = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.shadowclaw = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.snarl = ["8L1"];
this.modData("Learnsets", "samurotthisui").learnset.knockoff = ["8L1"];
*/
// Megas
this.modData("Learnsets", "esplada").learnset.calmmind = ["8L1"];
this.modData("Learnsets", "esplada").learnset.aurasphere = ["8L1"];
this.modData("Learnsets", "esplada").learnset.vacuumwave = ["8L1"];
this.modData("Learnsets", "macawphony").learnset.flareblitz = ["8L1"];
this.modData("Learnsets", "macawphony").learnset.dualwingbeat = ["8L1"];
this.modData("Learnsets", "macawphony").learnset.quickshot = ["8L1"];
this.modData("Learnsets", "arapaitan").learnset.crippleclobber = ["8L1"];
this.modData("Learnsets", "luxray").learnset.closecombat = ["8L1"];
this.modData("Learnsets", "luxray").learnset.morningsun = ["8L1"];
this.modData("Learnsets", "luxray").learnset.bulkup = ["8L1"];
this.modData("Learnsets", "woodensect").learnset.grassyglide = ["8L1"];
this.modData("Learnsets", "woodensect").learnset.woodhammer = ["8L1"];
this.modData("Learnsets", "woodensect").learnset.skittersmack = ["8L1"];
this.modData("Learnsets", "frozuna").learnset.icebeam = ["8L1"];
this.modData("Learnsets", "frozuna").learnset.freezedry = ["8L1"];
this.modData("Learnsets", "frozuna").learnset.iciclecrash = ["8L1"];
this.modData("Learnsets", "torkoal").learnset.painsplit = ["8L1"];
this.modData("Learnsets", "torkool").learnset.hail = ["8L1"];
this.modData("Learnsets", "zetztream").learnset.eerieimpulse = ["8L1"];
this.modData("Learnsets", "arbok").learnset.scaleshot = ["8L1"];
this.modData("Learnsets", "arbok").learnset.uturn = ["8L1"];
this.modData("Learnsets", "arbok").learnset.dragonrush = ["8L1"];
this.modData("Learnsets", "serperior").learnset.dragonhammer = ["8L1"];
this.modData("Learnsets", "serperior").learnset.drillrun = ["8L1"];
this.modData("Learnsets", "serperior").learnset.shocktail = ["8L1"];
this.modData("Learnsets", "emboar").learnset.shocktail = ["8L1"];
this.modData("Learnsets", "emboar").learnset.calmmind = ["8L1"];
this.modData("Learnsets", "emboar").learnset.earthpower = ["8L1"];
this.modData("Learnsets", "samurott").learnset.shadowball = ["8L1"];
this.modData("Learnsets", "samurott").learnset.hypervoice = ["8L1"];
this.modData("Learnsets", "samurott").learnset.focusblast = ["8L1"];
	},
	// BattlePokemon scripts. Commented out for safety but an implementation for Tree-Topper is there.
	/*
	pokemon: {
		//
		isGrounded(negateImmunity) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if (!(['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(this.baseSpecies.baseSpecies) || this.baseSpecies.name === 'Gengar-Mega')) {
				for (const side of this.battle.sides) {
					for (const pokemon of side.active) {
						if (pokemon && !pokemon.ignoringAbility() && pokemon.hasAbility('treetopper')) {
							return true;
						}
					}
				}
				//Those mons are immune to telekinesis anyway.
				if ('telekinesis' in this.volatiles) return false;
			}
			return item !== 'airballoon';
		}
	},
	*/
	pokemon: {
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!(type in this.battle.dex.data.TypeChart)) {
				if (type === 'Fairy' || type === 'Dark' || type === 'Steel') return true;
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;

			const negateResult = this.battle.runEvent('NegateImmunity', this, type);
			let isGrounded;
			if (type === 'Ground') {
				isGrounded = this.isGrounded(!negateResult);
				if (isGrounded === null) {
					if (message) {
						if (this.hasAbility('soaringspirit')) {
							this.battle.add('-immune', this, '[from] ability: Soaring Spirit');
						} else {
							this.battle.add('-immune', this, '[from] ability: Levitate');
						}
					}
					return false;
				}
			}
			if (!negateResult) return true;
			if ((isGrounded === undefined && !this.battle.dex.getImmunity(type, this)) || isGrounded === false) {
				if (message) {
					this.battle.add('-immune', this);
				}
				return false;
			}
			return true;
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (
				(this.hasAbility('levitate') ||
				this.hasAbility('soaringspirit')) &&
				!this.battle.suppressingAttackEvents()
			) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
	},
};
