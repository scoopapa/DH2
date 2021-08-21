export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen7',
	init: function () {
		for (const id in this.dataCache.Pokedex) {
			let unbanlist = this.dataCache.Formats['gen7dlcmons'].unbanlist;
			let speciesName = this.dataCache.Pokedex[id].name;
			if (!unbanlist.includes(speciesName)) {
				// if (this.dataCache.FormatsData[id] !== undefined) this.dataCache.FormatsData[id].tier = "Illegal";
			}
		}
		this.modData('Learnsets', 'kommoo').learnset.clangoroussoul = ['7T'];
		
		this.modData('Learnsets', 'tapukoko').learnset.hurricane = ['7T'];
		this.modData('Learnsets', 'tapukoko').learnset.airslash = ['7T'];
		this.modData('Learnsets', 'tapukoko').learnset.tailwind = ['7T'];
		
		this.modData('Learnsets', 'tapulele').learnset.leechlife = ['7T'];
		this.modData('Learnsets', 'tapulele').learnset.strengthsap = ['7T'];
		
		this.modData('Learnsets', 'tapubulu').learnset.stealthrock = ['7T'];
		
		this.modData('Learnsets', 'tapufini').learnset.smartstrike = ['7T'];
		this.modData('Learnsets', 'tapufini').learnset.swordsdance = ['7T'];
		this.modData('Learnsets', 'tapufini').learnset.playrough = ['7T'];
		
		
		this.modData('Learnsets', 'eelektrikalola').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'sunkernalola').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'alomomola').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'popplio').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'dewpider').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'mantine').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'frillish').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'vaporeon').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'luvdisc').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'whiscash').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'anglevolt').learnset.refreshingtide = ['7T'];
		this.modData('Learnsets', 'komodond').learnset.refreshingtide = ['7T'];
		
		this.modData('Learnsets', 'blacephalon').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'numel').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'clauncher').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'litten').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'magby').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'fletchinder').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'torkoal').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'toucannon').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'volcanion').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'flarenix').learnset.misfire = ['7T'];
		this.modData('Learnsets', 'steelixalola').learnset.misfire = ['7T'];
		
		this.modData('Learnsets', 'growlithe').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'comfey').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'eevee').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'flabebe').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'petilil').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'fomantis').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'electrike').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'mienfoo').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'vulpix').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'oranguru').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'passimian').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'cutiefly').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'shaymin').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'bounsweet').learnset.fieldday = ['7T'];
		this.modData('Learnsets', 'cottonee').learnset.fieldday = ['7T'];
		
		this.modData('Learnsets', 'mareep').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'dedenne').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'elekid').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'geodudealola').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'chinchou').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'magnemite').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'pikachu').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'rotom').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'grubbin').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'xurkitree').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'anglevolt').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'thundigeist').learnset.shortcircuit = ['7T'];
		this.modData('Learnsets', 'milotic').learnset.shortcircuit = ['7T'];
		
		this.modData('Learnsets', 'pikipek').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'litleo').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'stufful').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'rufflet').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'lopunny').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'tauros').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'eevee').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'firmlio').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'incineroar').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'kangaskhan').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'tapubulu').learnset.quickblitz = ['7T'];
		this.modData('Learnsets', 'tapukoko').learnset.quickblitz = ['7T'];
		
		this.modData('Learnsets', 'dragonite').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'salamence').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'dragalge').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'goodra').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'milotic').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'salazzle').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'tyrantrum').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'druddigon').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'scrafty').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'drampa').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'arbok').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'turtonator').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'feraligatr').learnset.draconiccrash = ['7T'];
		this.modData('Learnsets', 'flygon').learnset.draconiccrash = ['7T'];
	},
};