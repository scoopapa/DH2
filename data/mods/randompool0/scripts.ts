export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;
		*/
		this.modData('Learnsets', 'baltoy').learnset.futuresight = ['8L1'];
		this.modData('Learnsets', 'baltoy').learnset.doomdesire = ['8L1'];
		this.modData('Learnsets', 'baltoy').learnset.teleport = ['8L1'];
		this.modData('Learnsets', 'baltoy').learnset.flashcannon = ['8L1'];
		delete this.modData('Learnsets', 'baltoy').learnset.stealthrock;
		delete this.modData('Learnsets', 'baltoy').learnset.psychic;
		delete this.modData('Learnsets', 'baltoy').learnset.confusion;
		delete this.modData('Learnsets', 'baltoy').learnset.extrasensory;
		delete this.modData('Learnsets', 'baltoy').learnset.psybeam;
		
		this.modData('Learnsets', 'barraskewda').learnset.spikes = ['8L1'];
		this.modData('Learnsets', 'barraskewda').learnset.knockoff = ['8L1'];
		
		this.modData('Learnsets', 'blastoise').learnset.bulkup = ['8L1'];
		delete this.modData('Learnsets', 'blastoise').learnset.aquajet;
		delete this.modData('Learnsets', 'blastoise').learnset.avalanche;
		delete this.modData('Learnsets', 'blastoise').learnset.icebeam;
		delete this.modData('Learnsets', 'blastoise').learnset.icepunch;
		
		this.modData('Learnsets', 'blaziken').learnset.machpunch = ['8L1'];
		this.modData('Learnsets', 'blaziken').learnset.stealthrock = ['8L1'];
		delete this.modData('Learnsets', 'blaziken').learnset.knockoff;
		delete this.modData('Learnsets', 'blaziken').learnset.nightslash;
		delete this.modData('Learnsets', 'blaziken').learnset.defog;
		
		this.modData('Learnsets', 'boltund').learnset.slackoff = ['8L1'];
		delete this.modData('Learnsets', 'boltund').learnset.bulkup;
		
		this.modData('Learnsets', 'carvanha').learnset.anchortoss = ['8L1'];
		delete this.modData('Learnsets', 'carvanha').learnset.agility;
		delete this.modData('Learnsets', 'carvanha').learnset.icebeam;
		delete this.modData('Learnsets', 'carvanha').learnset.icywind;
		delete this.modData('Learnsets', 'carvanha').learnset.blizzard;
		
		this.modData('Learnsets', 'chansey').learnset.knockoff = ['8L1'];
		delete this.modData('Learnsets', 'chansey').learnset.stealthrock;
		delete this.modData('Learnsets', 'chansey').learnset.teleport;
		delete this.modData('Learnsets', 'chansey').learnset.toxic;
		delete this.modData('Learnsets', 'chansey').learnset.wish;
		delete this.modData('Learnsets', 'chansey').learnset.substitute;
		
		this.modData('Learnsets', 'clauncher').learnset.bugbuzz = ['8L1'];
		delete this.modData('Learnsets', 'clauncher').learnset.swordsdance;
		
		this.modData('Learnsets', 'duosion').learnset.teleport = ['8L1'];
		this.modData('Learnsets', 'duosion').learnset.toxic = ['8L1'];
		this.modData('Learnsets', 'duosion').learnset.wish = ['8L1'];
		delete this.modData('Learnsets', 'duosion').learnset.calmmind;
		
		this.modData('Learnsets', 'eiscue').learnset.meltymash = ['8L1'];
		this.modData('Learnsets', 'eiscue').learnset.slackoff = ['8L1'];
		this.modData('Learnsets', 'eiscue').learnset.swordsdance = ['8L1'];
		this.modData('Learnsets', 'eiscue').learnset.iceshard = ['8L1'];
		delete this.modData('Learnsets', 'eiscue').learnset.bellydrum;
		delete this.modData('Learnsets', 'eiscue').learnset.agility;
		delete this.modData('Learnsets', 'eiscue').learnset.substitute;
		
		delete this.modData('Learnsets', 'genesect').learnset.flashcannon;
		delete this.modData('Learnsets', 'genesect').learnset.shiftgear;
		
		this.modData('Learnsets', 'guzzlord').learnset.toxicspikes = ['8L1'];
		this.modData('Learnsets', 'guzzlord').learnset.nastyplot = ['8L1'];
		this.modData('Learnsets', 'guzzlord').learnset.recycle = ['8L1'];
		this.modData('Learnsets', 'guzzlord').learnset.teatime = ['8L1'];
		
		this.modData('Learnsets', 'klink').learnset.doubleironbash = ['8L1'];
		this.modData('Learnsets', 'klink').learnset.bulldoze = ['8L1'];
		
		this.modData('Learnsets', 'magmar').learnset.thunderbolt = ['8L1'];
		this.modData('Learnsets', 'magmar').learnset.thunder = ['8L1'];
		this.modData('Learnsets', 'magmar').learnset.wildcharge = ['8L1'];
		this.modData('Learnsets', 'magmar').learnset.voltswitch = ['8L1'];
		
		this.modData('Learnsets', 'mamoswine').learnset.slackoff = ['8L1'];
		this.modData('Learnsets', 'mamoswine').learnset.hornleech = ['8L1'];
		
		this.modData('Learnsets', 'reshiram').learnset.moonblast = ['8L1'];
		this.modData('Learnsets', 'reshiram').learnset.spiritbreak = ['8L1'];
		this.modData('Learnsets', 'reshiram').learnset.calmmind = ['8L1'];
		delete this.modData('Learnsets', 'reshiram').learnset.blueflare;
		delete this.modData('Learnsets', 'reshiram').learnset.fireblast;
		delete this.modData('Learnsets', 'reshiram').learnset.firefang;
		delete this.modData('Learnsets', 'reshiram').learnset.flamecharge;
		delete this.modData('Learnsets', 'reshiram').learnset.flamethrower;
		delete this.modData('Learnsets', 'reshiram').learnset.flareblitz;
		delete this.modData('Learnsets', 'reshiram').learnset.fusionflare;
		delete this.modData('Learnsets', 'reshiram').learnset.heatcrash;
		delete this.modData('Learnsets', 'reshiram').learnset.heatwave;
		delete this.modData('Learnsets', 'reshiram').learnset.incinerate;
		delete this.modData('Learnsets', 'reshiram').learnset.mysticalfire;
		delete this.modData('Learnsets', 'reshiram').learnset.overheat;
		delete this.modData('Learnsets', 'reshiram').learnset.sunnyday;
		delete this.modData('Learnsets', 'reshiram').learnset.willowisp;
		delete this.modData('Learnsets', 'reshiram').learnset.earthpower;
		
		this.modData('Learnsets', 'shiinotic').learnset.powergem = ['8L1'];
		this.modData('Learnsets', 'shiinotic').learnset.earthpower = ['8L1'];
		delete this.modData('Learnsets', 'shiinotic').learnset.synthesis;
		
		this.modData('Learnsets', 'spinarak').learnset.earthquake = ['8L1'];
		this.modData('Learnsets', 'spinarak').learnset.dig = ['8L1'];
		this.modData('Learnsets', 'spinarak').learnset.drillrun = ['8L1'];
		this.modData('Learnsets', 'spinarak').learnset.rockslide = ['8L1'];
		delete this.modData('Learnsets', 'spinarak').learnset.toxicspikes;
		
		this.modData('Learnsets', 'vaporeon').learnset.lifedew = ['8L1'];
		this.modData('Learnsets', 'vaporeon').learnset.leechseed = ['8L1'];
		this.modData('Learnsets', 'vaporeon').learnset.gigadrain = ['8L1'];
		this.modData('Learnsets', 'vaporeon').learnset.energyball = ['8L1'];
		this.modData('Learnsets', 'vaporeon').learnset.leafstorm = ['8L1'];
		delete this.modData('Learnsets', 'vaporeon').learnset.haze;
		
		this.modData('Learnsets', 'yanmega').learnset.hurricane = ['8L1'];
		this.modData('Learnsets', 'yanmega').learnset.dragonrush = ['8L1'];
		this.modData('Learnsets', 'yanmega').learnset.dracometeor = ['8L1'];
		this.modData('Learnsets', 'yanmega').learnset.outrage = ['8L1'];
		this.modData('Learnsets', 'yanmega').learnset.dragonpulse = ['8L1'];
		this.modData('Learnsets', 'yanmega').learnset.dragonclaw = ['8L1'];
		this.modData('Learnsets', 'yanmega').learnset.dragonascent = ['8L1'];
		delete this.modData('Learnsets', 'yanmega').learnset.defog;
		delete this.modData('Learnsets', 'yanmega').learnset.nightslash;
		delete this.modData('Learnsets', 'yanmega').learnset.shadowball;
	},
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['RP0'],
	},
};