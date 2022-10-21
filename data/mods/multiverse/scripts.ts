export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		//Generation 1
		this.modData('Learnsets', 'venusaur').learnset.mysticalfire = ['8L1'];
		this.modData('Learnsets', 'venusaur').learnset.slackoff = ['8L1'];
		
		delete this.modData('Learnsets', 'clefable').learnset.moonblast;
		delete this.modData('Learnsets', 'clefable').learnset.teleport;
		delete this.modData('Learnsets', 'clefairy').learnset.moonblast;
		delete this.modData('Learnsets', 'clefairy').learnset.teleport;
		
		this.modData('Learnsets', 'victreebel').learnset.flytrap = ['8L1'];
		this.modData('Learnsets', 'victreebel').learnset.taunt = ['8L1'];
		this.modData('Learnsets', 'victreebel').learnset.darkpulse = ['8L1'];
		this.modData('Learnsets', 'victreebel').learnset.sharpleaves = ['8L1'];
		
		this.modData('Learnsets', 'golem').learnset.swordsdance = ['8L1'];
		
		this.modData('Learnsets', 'omastar').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'omastar').learnset.flameburst = ['8L1'];
		this.modData('Learnsets', 'omastar').learnset.thunderburst = ['8L1'];
		this.modData('Learnsets', 'omastar').learnset.leafburst = ['8L1'];
		delete this.modData('Learnsets', 'omastar').learnset.shellsmash;
		delete this.modData('Learnsets', 'omanyte').learnset.shellsmash;
		
		this.modData('Learnsets', 'articuno').learnset.focusblast = ['8L1'];
		this.modData('Learnsets', 'articuno').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'articuno').learnset.taunt = ['8L1'];
		
		delete this.modData('Learnsets', 'mew').learnset.dragondance;
		delete this.modData('Learnsets', 'mew').learnset.icebeam;
		delete this.modData('Learnsets', 'mew').learnset.spikes;
		delete this.modData('Learnsets', 'mew').learnset.swordsdance;
		delete this.modData('Learnsets', 'mew').learnset.trick;
		
		
		//Generation 2
		this.modData('Learnsets', 'noctowl').learnset.flashcannon = ['8L1'];
		this.modData('Learnsets', 'noctowl').learnset.steelbeam = ['8L1'];
		this.modData('Learnsets', 'noctowl').learnset.metalsound = ['8L1'];
		
		this.modData('Learnsets', 'jumpluff').learnset.defog = ['8L1'];
		this.modData('Learnsets', 'jumpluff').learnset.heavyflip = ['8L1'];
		this.modData('Learnsets', 'jumpluff').learnset.drainpunch = ['8L1'];
		
		this.modData('Learnsets', 'murkrow').learnset.leafburst = ['8L1'];
		this.modData('Learnsets', 'murkrow').learnset.workup = ['8L1'];
		delete this.modData('Learnsets', 'murkrow').learnset.defog;
		
		this.modData('Learnsets', 'houndoom').learnset.huntdown = ['8L1'];
		delete this.modData('Learnsets', 'houndoom').learnset.nastyplot;
		delete this.modData('Learnsets', 'houndour').learnset.nastyplot;
		
		this.modData('Learnsets', 'magby').learnset.drainpunch = ['8L1'];
		
		this.modData('Learnsets', 'entei').learnset.leafburst = ['8L1'];
		delete this.modData('Learnsets', 'entei').learnset.ironhead;
		delete this.modData('Learnsets', 'entei').learnset.stompingtantrum;
		
		
		//Generation 3
		this.modData('Learnsets', 'breloom').learnset.lowswept = ['8L1'];
		delete this.modData('Learnsets', 'breloom').learnset.spore;
		delete this.modData('Learnsets', 'shroomish').learnset.spore;
		
		this.modData('Learnsets', 'hariyama').learnset.ironhead = ['8L1'];
		this.modData('Learnsets', 'hariyama').learnset.drainpunch = ['8L1'];
		
		this.modData('Learnsets', 'mawile').learnset.naturesmadness = ['8L1'];
		
		delete this.modData('Learnsets', 'flygon').learnset.defog;
		delete this.modData('Learnsets', 'vibrava').learnset.defog;
		
		delete this.modData('Learnsets', 'bagon').learnset.return;
		delete this.modData('Learnsets', 'shelgon').learnset.return;
		delete this.modData('Learnsets', 'salamence').learnset.return;
		delete this.modData('Learnsets', 'bagon').learnset.refresh;
		delete this.modData('Learnsets', 'shelgon').learnset.refresh;
		delete this.modData('Learnsets', 'salamence').learnset.refresh;
		
		this.modData('Learnsets', 'regice').learnset.overcharge = ['8L1'];
		this.modData('Learnsets', 'regice').learnset.flameburst = ['8L1'];
		this.modData('Learnsets', 'regice').learnset.recover = ['8L1'];
		delete this.modData('Learnsets', 'regice').learnset.rockpolish;
		
		
		//Generation 4
		this.modData('Learnsets', 'munchlax').learnset.playrough = ['8L1'];
		this.modData('Learnsets', 'munchlax').learnset.bodypress = ['8L1'];
		delete this.modData('Learnsets', 'munchlax').learnset.recycle;
		
		delete this.modData('Learnsets', 'froslass').learnset.thunder;
		delete this.modData('Learnsets', 'froslass').learnset.thunderbolt;
		
		delete this.modData('Learnsets', 'mesprit').learnset.calmmind;
		
		
		//Generation 5
		this.modData('Learnsets', 'stoutland').learnset.bringsticks = ['8L1'];
		this.modData('Learnsets', 'stoutland').learnset.earthquake = ['8L1'];
		this.modData('Learnsets', 'stoutland').learnset.shoreup = ['8L1'];
		
		this.modData('Learnsets', 'musharna').learnset.teleport = ['8L1'];
		
		this.modData('Learnsets', 'whimsicott').learnset.growth = ['8L1'];
		this.modData('Learnsets', 'whimsicott').learnset.thunderwave = ['8L1'];
		this.modData('Learnsets', 'whimsicott').learnset.leafstorm = ['8L1'];
		
		this.modData('Learnsets', 'eelektross').learnset.gunkshot = ['8L1'];
		this.modData('Learnsets', 'eelektross').learnset.painsplit = ['8L1'];
		this.modData('Learnsets', 'eelektross').learnset.sludgebomb = ['8L1'];
		this.modData('Learnsets', 'eelektross').learnset.sludgewave = ['8L1'];
		
		delete this.modData('Learnsets', 'hydreigon').learnset.nastyplot;
		delete this.modData('Learnsets', 'zweilous').learnset.nastyplot;
		delete this.modData('Learnsets', 'deino').learnset.nastyplot;
		
		this.modData('Learnsets', 'landorus').learnset.chillburst = ['8L1'];
		
		
		//Generation 6
		this.modData('Learnsets', 'chesnaught').learnset.slackoff = ['8L1'];
		
		this.modData('Learnsets', 'delphox').learnset.uturn = ['8L1'];
		this.modData('Learnsets', 'delphox').learnset.meteorbeam = ['8L1'];
		
		delete this.modData('Learnsets', 'frogadier').learnset.gunkshot;
		delete this.modData('Learnsets', 'greninja').learnset.gunkshot;
		
		this.modData('Learnsets', 'gogoat').learnset.powerwhip = ['8L1'];
		
		this.modData('Learnsets', 'tyrantrum').learnset.absoluteimpact = ['8L1'];
		
		this.modData('Learnsets', 'sliggoo').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'sliggoo').learnset.earthquake = ['8L1'];
		this.modData('Learnsets', 'sliggoo').learnset.liquidation = ['8L1'];
		this.modData('Learnsets', 'sliggoo').learnset.surf = ['8L1'];
		this.modData('Learnsets', 'sliggoo').learnset.bodypress = ['8L1'];
		
		
		//Generation 7
		this.modData('Learnsets', 'vikavolt').learnset.chillburst = ['8L1'];
		
		this.modData('Learnsets', 'araquanid').learnset.uturn = ['8L1'];
		this.modData('Learnsets', 'araquanid').learnset.aquajet = ['8L1'];
		this.modData('Learnsets', 'araquanid').learnset.taunt = ['8L1'];
		
		this.modData('Learnsets', 'mimikyu').learnset.spiritbreak = ['8L1'];
		this.modData('Learnsets', 'mimikyu').learnset.spiritshackle = ['8L1'];
		delete this.modData('Learnsets', 'mimikyu').learnset.bulkup;
		delete this.modData('Learnsets', 'mimikyu').learnset.swordsdance;
		
		this.modData('Learnsets', 'silvallyfairy').learnset.playrough = ['8L1'];
		this.modData('Learnsets', 'silvallyfairy').learnset.dazzlinggleam = ['8L1'];
		
		this.modData('Learnsets', 'tapukoko').learnset.icefang = ['8L1'];
		delete this.modData('Learnsets', 'tapukoko').learnset.calmmind;
		delete this.modData('Learnsets', 'tapukoko').learnset.thunder;
		delete this.modData('Learnsets', 'tapukoko').learnset.thunderbolt;
		delete this.modData('Learnsets', 'tapukoko').learnset.dazzlinggleam;
		delete this.modData('Learnsets', 'tapukoko').learnset.grassknot;
		delete this.modData('Learnsets', 'tapukoko').learnset.lightscreen;
		delete this.modData('Learnsets', 'tapukoko').learnset.reflect;
		
		this.modData('Learnsets', 'tapufini').learnset.foggymist = ['8L1'];
		delete this.modData('Learnsets', 'tapufini').learnset.defog;
		delete this.modData('Learnsets', 'tapufini').learnset.drainingkiss;
		
		this.modData('Learnsets', 'solgaleo').learnset.partingshot = ['8L1'];
		this.modData('Learnsets', 'solgaleo').learnset.icefang = ['8L1'];
		delete this.modData('Learnsets', 'solgaleo').learnset.morningsun;
		
		this.modData('Learnsets', 'marshadow').learnset.hiddenforce = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcebug = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcedark = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcedragon = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforceelectric = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcefighting = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcefire = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforceflying = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforceghost = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcegrass = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforceground = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforceice = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcepoison = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcepsychic = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcerock = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcesteel = ['8L1'];
		this.modData('Learnsets', 'marshadow').learnset.hiddenforcewater = ['8L1'];
		
		
		//Generation 8
		this.modData('Learnsets', 'cinderace').learnset.jumpkick = ['8L1'];
		this.modData('Learnsets', 'cinderace').learnset.drainpunch = ['8L1'];
		this.modData('Learnsets', 'cinderace').learnset.poisonjab = ['8L1'];
		delete this.modData('Learnsets', 'cinderace').learnset.gunkshot;
		delete this.modData('Learnsets', 'cinderace').learnset.highjumpkick;
		delete this.modData('Learnsets', 'raboot').learnset.gunkshot;
		delete this.modData('Learnsets', 'raboot').learnset.highjumpkick;
		delete this.modData('Learnsets', 'scorbunny').learnset.gunkshot;
		delete this.modData('Learnsets', 'scorbunny').learnset.highjumpkick;
		
		this.modData('Learnsets', 'perrserker').learnset.bulletpunch = ['8L1'];
		this.modData('Learnsets', 'perrserker').learnset.drainpunch = ['8L1'];
		this.modData('Learnsets', 'perrserker').learnset.perrserkpaw = ['8L1'];
		
		this.modData('Learnsets', 'corsolagalar').learnset.triattack = ['8L1'];
		
		this.modData('Learnsets', 'mrrime').learnset.earthpower = ['8L1'];
		this.modData('Learnsets', 'mrrime').learnset.hypervoice = ['8L1'];
		delete this.modData('Learnsets', 'mrrime').learnset.healingwish;
		delete this.modData('Learnsets', 'mrmimegalar').learnset.healingwish;
		delete this.modData('Learnsets', 'mimejr').learnset.healingwish;
		
		this.modData('Learnsets', 'stonjourner').learnset.trick = ['8L1'];
		
		this.modData('Learnsets', 'arctozolt').learnset.plasmafists = ['8L1'];
		delete this.modData('Learnsets', 'arctozolt').learnset.boltbeak;
		
		this.modData('Learnsets', 'calyrex').learnset.synthesis = ['8L1'];
		this.modData('Learnsets', 'calyrex').learnset.kingsshield = ['8L1'];
		this.modData('Learnsets', 'calyrex').learnset.superpower = ['8L1'];
	},
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['MV'],
		//customTiers: ['S', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'],
	},
};