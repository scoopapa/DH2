export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen7',
	init: function () {
		/*for (const id in this.dataCache.Pokedex) {
			let unbanlist = this.dataCache.Formats['gen7dlcmons'].unbanlist;
			let speciesName = this.dataCache.Pokedex[id].name;
			if (!unbanlist.includes(speciesName)) {
				// if (this.dataCache.FormatsData[id] !== undefined) this.dataCache.FormatsData[id].tier = "Illegal";
			}
		}*/
		this.modData('Learnsets', 'kommoo').learnset.clangoroussoul = ['7T'];
		
		this.modData('Learnsets', 'tapukoko').learnset.hurricane = ['7T'];
		this.modData('Learnsets', 'tapukoko').learnset.airslash = ['7T'];
		this.modData('Learnsets', 'tapukoko').learnset.tailwind = ['7T'];
		
		this.modData('Learnsets', 'tapulele').learnset.leechlife = ['7T'];
		this.modData('Learnsets', 'tapulele').learnset.healorder = ['7T'];
		
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
		
		this.modData('Learnsets', 'mantine').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'archen').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'braviary').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'chindle').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'dragonite').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'drifloon').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'fletchling').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'gyarados').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'hawlucha').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'hoothoot').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'lunala').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'murkrow').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'natu').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'noibat').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'oricorio').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'pikipek').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'rowlet').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'salamence').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'skarmory').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'spearow').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'wingull').learnset.jetstream = ['7T'];
		this.modData('Learnsets', 'zubat').learnset.jetstream = ['7T'];
		
		this.modData('Learnsets', 'snorunt').learnset.sinterstorm = ['7T'];
		this.modData('Learnsets', 'snoxin').learnset.sinterstorm = ['7T'];
		this.modData('Learnsets', 'amaura').learnset.sinterstorm = ['7T'];
		this.modData('Learnsets', 'glaceon').learnset.sinterstorm = ['7T'];
		this.modData('Learnsets', 'jynx').learnset.sinterstorm = ['7T'];
		this.modData('Learnsets', 'lapras').learnset.sinterstorm = ['7T'];
		this.modData('Learnsets', 'snoxin').learnset.sinterstorm = ['7T'];
		this.modData('Learnsets', 'vanillite').learnset.sinterstorm = ['7T'];
		
		this.modData('Learnsets', 'drilbur').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'shieldon').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'celesteela').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'diglett').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'diglettalola').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'forretress').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'roggenrola').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'geodude').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'geodudealola').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'metang').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'onix').learnset.excavation = ['7T'];
		this.modData('Learnsets', 'onixalola').learnset.excavation = ['7T'];
		
		this.modData('Learnsets', 'plubia').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'croagunk').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'tikilohi').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'snorunt').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'gastly').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'marowakalola').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'sandygast').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'irotyke').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'hawlucha').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'jangmoo').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'riolu').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'buzzwole').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'heracross').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'pancham').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'scraggy').learnset.indomitablespirit = ['7T'];
		this.modData('Learnsets', 'poliwag').learnset.indomitablespirit = ['7T'];
		
		this.modData('Learnsets', 'buzzwole').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'metapod').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'ledyba').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'spinarak').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'grubbin').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'cutiefly').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'surskit').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'dewpider').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'paras').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'larvesta').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'pinsir').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'wimpod').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'anorith').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'pineco').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'scizor').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'heracross').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'pheromosa').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'arachsoil').learnset.hivemind = ['7T'];
		this.modData('Learnsets', 'accelgoralola').learnset.hivemind = ['7T'];
		
		this.modData('Learnsets', 'whiscash').learnset.mudsling = ['7T'];
		this.modData('Learnsets', 'arachsoil').learnset.mudsling = ['7T'];
		this.modData('Learnsets', 'diglett').learnset.mudsling = ['7T'];
		this.modData('Learnsets', 'diglettalola').learnset.mudsling = ['7T'];
		this.modData('Learnsets', 'geodude').learnset.mudsling = ['7T'];
		this.modData('Learnsets', 'mudbray').learnset.mudsling = ['7T'];
		
		this.modData('Learnsets', 'pawniard').learnset.contrariety = ['7T'];
		this.modData('Learnsets', 'sandile').learnset.contrariety = ['7T'];
		this.modData('Learnsets', 'carvanha').learnset.contrariety = ['7T'];
		this.modData('Learnsets', 'larvitar').learnset.contrariety = ['7T'];
		this.modData('Learnsets', 'zorua').learnset.contrariety = ['7T'];
		this.modData('Learnsets', 'inkay').learnset.contrariety = ['7T'];
		this.modData('Learnsets', 'guzzlord').learnset.contrariety = ['7T'];
		this.modData('Learnsets', 'rowlet').learnset.contrariety = ['7T'];
		this.modData('Learnsets', 'tyrunt').learnset.contrariety = ['7T'];
		this.modData('Learnsets', 'houndour').learnset.contrariety = ['7T'];
		
		this.modData('Learnsets', 'trapinch').learnset.buildupstrike = ['7T'];
		this.modData('Learnsets', 'tyrunt').learnset.buildupstrike = ['7T'];
		this.modData('Learnsets', 'roggenrola').learnset.buildupstrike = ['7T'];
		this.modData('Learnsets', 'geodude').learnset.buildupstrike = ['7T'];
		this.modData('Learnsets', 'trapinch').learnset.buildupstrike = ['7T'];
		this.modData('Learnsets', 'sandshrew').learnset.buildupstrike = ['7T'];
		this.modData('Learnsets', 'archen').learnset.buildupstrike = ['7T'];
		
		this.modData('Learnsets', 'tapukoko').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'blacephalon').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'hawlucha').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'buneary').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'tapulele').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'tapubulu').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'tapufini').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'stufful').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'golett').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'mienfoo').learnset.happyfail = ['7T'];
		this.modData('Learnsets', 'bounsweet').learnset.happyfail = ['7T'];

		this.modData('Learnsets', 'golett').learnset.hauntingdance = ['7T'];
		this.modData('Learnsets', 'blacephalon').learnset.hauntingdance = ['7T'];
		this.modData('Learnsets', 'gastly').learnset.hauntingdance = ['7T'];
		this.modData('Learnsets', 'snorunt').learnset.hauntingdance = ['7T'];

		this.modData('Learnsets', 'marowakalola').learnset.hauntingdance = ['7T'];
		this.modData('Learnsets', 'oricorio').learnset.hauntingdance = ['7T'];
		this.modData('Learnsets', 'rowlet').learnset.hauntingdance = ['7T'];
		this.modData('Learnsets', 'jangmoo').learnset.hauntingdance = ['7T'];
		this.modData('Learnsets', 'mimikyu').learnset.hauntingdance = ['7T'];
		
		this.modData('Learnsets', 'tapulele').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'abra').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'arceus').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'audino').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'baltoy').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'elgyem').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'happiny').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'roggenrola').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'bronzor').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'carbink').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'celesteela').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'chingling').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'cleffa').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'cresselia').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'deoxys').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'dialga').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'diancie').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'solosis').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'duskull').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'espurr').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'exeggcute').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'ferroseed').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'genesect').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'girafarig').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'giratina').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'golett').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'gothita').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'hoopa').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'igglybuff').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'jirachi').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'klink').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'landorus').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'lunatone').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'magnemite').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'meditite').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'meloetta').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'mew').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'mewtwo').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'minior').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'munna').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'necrozma').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'nosepass').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'oranguru').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'palkia').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'pineco').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'porygon').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'regice').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'regigigas').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'regirock').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'registeel').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'sableye').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'sandygast').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'sigilyph').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'solrock').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'stakataka').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'stantler').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'staryu').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'tapufini').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'togedemaru').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'xerneas').learnset.gravitation = ['7T'];
		this.modData('Learnsets', 'xurkitree').learnset.gravitation = ['7T'];
		
		this.modData('Learnsets', 'foongus').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'weedle').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'dustox').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'gulpin').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'koffing').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'grimer').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'spinarak').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'nidoranm').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'nidoranf').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'venipede').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'bellsprout').learnset.poisondrain = ['7T'];
		this.modData('Learnsets', 'gastly').learnset.poisondrain = ['7T'];
	},
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Steelixite" && pokemon.baseSpecies.name === "Steelix-Alola") {
			return "Steelix-Alola-Mega";
		}
		if (item.megaEvolves !== pokemon.baseSpecies.name || item.megaStone === pokemon.species.name) {
			return null;
		}
		return item.megaStone;
	},
	runMegaEvo(pokemon) {
		const speciesid = pokemon.canMegaEvo || pokemon.canUltraBurst;
		if (!speciesid) return false;
		const side = pokemon.side;

		// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		if (pokemon.illusion) {
			this.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityData, pokemon);
		} // only part that's changed
		pokemon.formeChange(speciesid, pokemon.getItem(), true);

		// Limit one mega evolution
		const wasMega = pokemon.canMegaEvo;
		for (const ally of side.pokemon) {
			if (wasMega) {
				ally.canMegaEvo = null;
			} else {
				ally.canUltraBurst = null;
			}
		}

		this.runEvent('AfterMega', pokemon);
		return true;
	},
	hitStepAccuracy(targets, pokemon, move) {
		const hitResults = [];
		for (const [i, target] of targets.entries()) {
			this.activeTarget = target;
			// calculate true accuracy
			let accuracy = move.accuracy;
			if (move.ohko) { // bypasses accuracy modifiers
				if (!target.isSemiInvulnerable()) {
					accuracy = 30;
					if (move.ohko === 'Ice' && this.gen >= 7 && !pokemon.hasType('Ice')) {
						accuracy = 20;
					}
					if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
						(move.ohko === true || !target.hasType(move.ohko))) {
						accuracy += (pokemon.level - target.level);
					} else {
						this.add('-immune', target, '[ohko]');
						hitResults[i] = false;
						continue;
					}
				}
			} else {
				const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];

				let boosts;
				let boost!: number;
				if (accuracy !== true) {
					if (!move.ignoreAccuracy) {
						boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
						boost = this.clampIntRange(boosts['accuracy'], -6, 6);
						if (boost > 0) {
							accuracy *= boostTable[boost];
						} else {
							accuracy /= boostTable[-boost];
						}
					}
					if (!move.ignoreEvasion) {
						boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
						boost = this.clampIntRange(boosts['evasion'], -6, 6);
						if (boost > 0) {
							accuracy /= boostTable[boost];
						} else if (boost < 0) {
							accuracy *= boostTable[-boost];
						}
					}
				}
				accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
			}
			if (move.alwaysHit || (move.id === 'toxic' && this.gen >= 6 && pokemon.hasType('Poison'))) {
				accuracy = true; // bypasses ohko accuracy modifiers
			} else {
				accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
			}
			if (accuracy !== true && !this.randomChance(accuracy, 100)) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					if (!move.spreadHit) this.attrLastMove('[miss]');
					this.add('-miss', pokemon, target);
				}
				if (!move.ohko && move.id === 'misfire') {
					pokemon.switchFlag = true;
					this.attrLastMove('[still]');
				}
				if (!move.ohko && move.id === 'happyfail') {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon, '[from] move: Happy Fail');
					this.attrLastMove('[still]');
				}
				hitResults[i] = false;
				continue;
			}
			hitResults[i] = true;
		}
		return hitResults;
	},
	runSwitch(pokemon: Pokemon) { // modified for both Hive Mind and Indomitable Spirit
		this.runEvent('Swap', pokemon);
		this.runEvent('SwitchIn', pokemon);
		if (this.gen <= 2 && !pokemon.side.faintedThisTurn && pokemon.draggedIn !== this.turn) {
			this.runEvent('AfterSwitchInSelf', pokemon);
		}
		if (!pokemon.hp) return false;
		pokemon.isStarted = true;
		if (!pokemon.fainted) {
			this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityData, pokemon);
			pokemon.abilityOrder = this.abilityOrder++;
			this.singleEvent('Start', pokemon.getItem(), pokemon.itemData, pokemon);
		}
		if (this.gen === 4) {
			for (const foeActive of pokemon.side.foe.active) {
				foeActive.removeVolatile('substitutebroken');
			}
		}
		this.runEvent('HiveMind', pokemon); // making Hive Mind activate at the appropriate time
		pokemon.addVolatile('indomitablespirit'); // yes this is a really ugly way to do this but it's better than a ruleset okay
		pokemon.draggedIn = null;
		return true;
	}
};