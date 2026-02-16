import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['NB', 'NBU'],
	},	
	
	init() {
			// Celebi
		this.modData("Learnsets", "celebi").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.leafstorm = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.lightscreen = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.perishsong = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.recover = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.reflect = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.rest = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.trick = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.weatherball = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.chargebeam = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.lifedew = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.metronome = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.solarbeam = ["9L1"];
		// Deoxys
		this.modData("Learnsets", "deoxys").learnset.agility = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.drainunch = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.expandingforce = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.extremespeed = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.focuspunch = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.futuresight = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.lowkick = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.magiccoat = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.psyshock = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.pursuit = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.rockslide = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.stompingtantrum = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.throatchop = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.thunder = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.cosmicpower = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.dynamicpunch = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.icywind = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.psychicterrain = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.solarbeam = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.zapcannon = ["9L1"];
		// Diancie
		this.modData("Learnsets", "diancie").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.lightscreen = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.meteorbeam = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.playrought = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.powergem = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.psyshock = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.reflect = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.rest = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.rockpolish = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.rockslide = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.scordhingsands = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.metronome = ["9L1"];
		// Genesect
		this.modData("Learnsets", "genesect").learnset.bugbuzz = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.extrenespeed = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.flamecharge = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.shadowclaw = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.signalbeam = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.thunder = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.chargebeam = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.electroweb = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.solarbeam = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.zapcannon = ["9L1"];
		// Hoopa
		this.modData("Learnsets", "hoopa").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.drainpunch = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.expandingforce = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.futuresight = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.psyshock = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.signalbeam = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.trick = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.trickroom = ["9L1"];
		// Jirachi
		this.modData("Learnsets", "jirachi").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.expandingforce = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.futuresight = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.playrough = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.psyshock = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.thunder = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.trick = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.wish = ["9L1"];
		// Magearna
		this.modData("Learnsets", "magearna").learnset.agility = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.malignantchain = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.shiftgea = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.trick = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.solarbeam = ["9L1"];
		// Manaphy
		this.modData("Learnsets", "manaphy").learnset.alluringvoice = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.blizzard = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.scald = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.surf = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.tailglow = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.waterfall = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.icywind = ["9L1"];
		// Raticate
		this.modData("Learnsets", "raticate").learnset.extremespeed = ["9L1"];
		this.modData("Learnsets", "raticate").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "raticate").learnset.megakick = ["9L1"];
		this.modData("Learnsets", "raticate").learnset.bellydrum = ["9L1"];

	},
};