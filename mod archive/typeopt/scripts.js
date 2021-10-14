'use strict';

const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe']);

/**@type {BattleScriptsData} */
let BattleScripts = {
init: function () {

	this.modData('Learnsets', 'vanilluxe').learnset.nastyplot = ['7L1'];
	this.modData('Learnsets', 'vanilluxe').learnset.hypervoice = ['7L1'];
	this.modData('Learnsets', 'vanilluxe').learnset.focusblast = ['7L1'];

	this.modData('Learnsets', 'mightyena').learnset.honeclaws = ['7L1'];
	this.modData('Learnsets', 'mightyena').learnset.iciclecrash = ['7L1'];
	this.modData('Learnsets', 'mightyena').learnset.superpower = ['7L1'];
	
	this.modData('Learnsets', 'sandslashalola').learnset.pinmissile = ['7L1'];
	this.modData('Learnsets', 'sandslashalola').learnset.rockblast = ['7L1'];
	this.modData('Learnsets', 'sandslashalola').learnset.thunderpunch = ['7L1'];
	
	this.modData('Learnsets', 'mandibuzz').learnset.shadowbone = ['7L1'];
	this.modData('Learnsets', 'mandibuzz').learnset.shadowsneak = ['7L1'];
	this.modData('Learnsets', 'mandibuzz').learnset.willowisp = ['7L1'];
	
	this.modData('Learnsets', 'toucannon').learnset.ironhead = ['7L1'];
	this.modData('Learnsets', 'toucannon').learnset.flareblitz = ['7L1'];
	this.modData('Learnsets', 'toucannon').learnset.earthquake = ['7L1'];
	
	this.modData('Learnsets', 'wigglytuff').learnset.airslash = ['7L1'];
	this.modData('Learnsets', 'wigglytuff').learnset.nastyplot = ['7L1'];
	this.modData('Learnsets', 'wigglytuff').learnset.drainingkiss = ['7L1'];
	
	this.modData('Learnsets', 'poliwrath').learnset.aquajet = ['7L1'];
	this.modData('Learnsets', 'poliwrath').learnset.stoneedge = ['7L1'];
	this.modData('Learnsets', 'poliwrath').learnset.drainpunch = ['7L1'];
	
	this.modData('Learnsets', 'gallade').learnset.playrough = ['7L1'];
	this.modData('Learnsets', 'gallade').learnset.machpunch = ['7L1'];
	this.modData('Learnsets', 'gallade').learnset.sacredsword = ['7L1'];
	
	this.modData('Learnsets', 'parasect').learnset.strengthsap = ['7L1'];
	this.modData('Learnsets', 'parasect').learnset.hornleech = ['7L1'];
	this.modData('Learnsets', 'parasect').learnset.drainpunch = ['7L1'];
	
	this.modData('Learnsets', 'golisopod').learnset.spiritshackle = ['7L1'];
	this.modData('Learnsets', 'golisopod').learnset.stickyweb = ['7L1'];
	this.modData('Learnsets', 'golisopod').learnset.uturn = ['7L1'];
	
	this.modData('Learnsets', 'magcargo').learnset.bugbuzz = ['7L1'];
	this.modData('Learnsets', 'magcargo').learnset.uturn = ['7L1'];
	this.modData('Learnsets', 'magcargo').learnset.rapidspin = ['7L1'];
	
	this.modData('Learnsets', 'shiftry').learnset.bravebird = ['7L1'];
	this.modData('Learnsets', 'shiftry').learnset.woodhammer = ['7L1'];
	this.modData('Learnsets', 'shiftry').learnset.uturn = ['7L1'];
	
	this.modData('Learnsets', 'victreebel').learnset.scald = ['7L1'];
	this.modData('Learnsets', 'victreebel').learnset.liquidation = ['7L1'];
	this.modData('Learnsets', 'victreebel').learnset.taunt = ['7L1'];
	
	this.modData('Learnsets', 'lunatone').learnset.clearsmog = ['7L1'];
	
	this.modData('Learnsets', 'meganium').learnset.dracometeor = ['7L1'];
	this.modData('Learnsets', 'meganium').learnset.earthpower = ['7L1'];
	this.modData('Learnsets', 'meganium').learnset.calmmind = ['7L1'];
	
	this.modData('Learnsets', 'jynx').learnset.thunderbolt = ['7L1'];
	
	this.modData('Learnsets', 'porygonz').learnset.hex = ['7L1'];
	this.modData('Learnsets', 'porygonz').learnset.willowisp = ['7L1'];
	this.modData('Learnsets', 'porygonz').learnset.volstswitch = ['7L1'];
	
	this.modData('Learnsets', 'guzzlord').learnset.shadowball = ['7L1'];
	this.modData('Learnsets', 'guzzlord').learnset.nastyplot = ['7L1'];
	this.modData('Learnsets', 'guzzlord').learnset.slackoff = ['7L1'];
	
	this.modData('Learnsets', 'victini').learnset.playrough = ['7L1'];
	this.modData('Learnsets', 'victini').learnset.moonblast = ['7L1'];
	this.modData('Learnsets', 'victini').learnset.hypervoice = ['7L1'];
	
	this.modData('Learnsets', 'talonflame').learnset.extremespeed = ['7L1'];
	this.modData('Learnsets', 'talonflame').learnset.hypervoice = ['7L1'];
	
	this.modData('Learnsets', 'salazzle').learnset.gigadrain = ['7L1'];
	this.modData('Learnsets', 'salazzle').learnset.aurasphere = ['7L1'];
	this.modData('Learnsets', 'salazzle').learnset.calmmind = ['7L1'];
	
	this.modData('Learnsets', 'dunsparce').learnset.dragontail = ['7L1'];
	this.modData('Learnsets', 'dunsparce').learnset.dragondance = ['7L1'];
	this.modData('Learnsets', 'dunsparce').learnset.electricterrain = ['7L1'];
	
	this.modData('Learnsets', 'probopass').learnset.shoreup = ['7L1'];
	this.modData('Learnsets', 'probopass').learnset.rapidspin = ['7L1'];
	this.modData('Learnsets', 'probopass').learnset.spikes = ['7L1'];
	},
};

exports.BattleScripts = BattleScripts;
