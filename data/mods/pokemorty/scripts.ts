export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['PM OU', 'PM NFE', 'PM LC'],
	},
	init() {
	// Morty
	this.modData("Learnsets", "morty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "morty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "morty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "morty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "morty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "morty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "morty").learnset.mortify = ["9L22"];
	this.modData("Learnsets", "morty").learnset.fiercelunge = ["9L26"];
	this.modData("Learnsets", "morty").learnset.staredown = ["9L30"];
	this.modData("Learnsets", "morty").learnset.unleash = ["9L36"];

	// Scruffy Morty
	this.modData("Learnsets", "scruffymorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "scruffymorty").learnset.fixerupper = ["9L6"];
	this.modData("Learnsets", "scruffymorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "scruffymorty").learnset.examine = ["9L11"];
	this.modData("Learnsets", "scruffymorty").learnset.dropout = ["9L15"];
	this.modData("Learnsets", "scruffymorty").learnset.bunt = ["9L20"];
	this.modData("Learnsets", "scruffymorty").learnset.grossout = ["9L23"];
	this.modData("Learnsets", "scruffymorty").learnset.crush = ["9L28"];

	// Unkempt Morty
	this.modData("Learnsets", "unkemptmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "unkemptmorty").learnset.fixerupper = ["9L6"];
	this.modData("Learnsets", "unkemptmorty").learnset.flail = ["9L9"];
	this.modData("Learnsets", "unkemptmorty").learnset.examine = ["9L12"];
	this.modData("Learnsets", "unkemptmorty").learnset.dropout = ["9L16"];
	this.modData("Learnsets", "unkemptmorty").learnset.bunt = ["9L22"];
	this.modData("Learnsets", "unkemptmorty").learnset.grossout = ["9L24"];
	this.modData("Learnsets", "unkemptmorty").learnset.crush = ["9L29"];
	this.modData("Learnsets", "unkemptmorty").learnset.humiliate = ["9L34"];

	// Hobo Morty
	this.modData("Learnsets", "hobomorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "hobomorty").learnset.fixerupper = ["9L6"];
	this.modData("Learnsets", "hobomorty").learnset.flail = ["9L9"];
	this.modData("Learnsets", "hobomorty").learnset.examine = ["9L13"];
	this.modData("Learnsets", "hobomorty").learnset.dropout = ["9L17"];
	this.modData("Learnsets", "hobomorty").learnset.bunt = ["9L22"];
	this.modData("Learnsets", "hobomorty").learnset.grossout = ["9L24"];
	this.modData("Learnsets", "hobomorty").learnset.crush = ["9L30"];
	this.modData("Learnsets", "hobomorty").learnset.humiliate = ["9L35"];
	this.modData("Learnsets", "hobomorty").learnset.nickelanddime = ["9L41"];

	// Old Morty
	this.modData("Learnsets", "oldmorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "oldmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "oldmorty").learnset.hug = ["9L8"];
	this.modData("Learnsets", "oldmorty").learnset.moisten = ["9L13"];
	this.modData("Learnsets", "oldmorty").learnset.gooeydischarge = ["9L17"];
	this.modData("Learnsets", "oldmorty").learnset.bloodpressure = ["9L21"];
	this.modData("Learnsets", "oldmorty").learnset.deathstare = ["9L25"];
	this.modData("Learnsets", "oldmorty").learnset.grossout = ["9L27"];

	// Geriatric Morty
	this.modData("Learnsets", "geriatricmorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "geriatricmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "geriatricmorty").learnset.hug = ["9L9"];
	this.modData("Learnsets", "geriatricmorty").learnset.moisten = ["9L13"];
	this.modData("Learnsets", "geriatricmorty").learnset.gooeydischarge = ["9L17"];
	this.modData("Learnsets", "geriatricmorty").learnset.bloodpressure = ["9L22"];
	this.modData("Learnsets", "geriatricmorty").learnset.deathstare = ["9L25"];
	this.modData("Learnsets", "geriatricmorty").learnset.grossout = ["9L29"];
	this.modData("Learnsets", "geriatricmorty").learnset.bunt = ["9L35"];

	// Ancient Morty
	this.modData("Learnsets", "ancientmorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "ancientmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "ancientmorty").learnset.hug = ["9L9"];
	this.modData("Learnsets", "ancientmorty").learnset.moisten = ["9L14"];
	this.modData("Learnsets", "ancientmorty").learnset.gooeydischarge = ["9L18"];
	this.modData("Learnsets", "ancientmorty").learnset.bloodpressure = ["9L22"];
	this.modData("Learnsets", "ancientmorty").learnset.deathstare = ["9L25"];
	this.modData("Learnsets", "ancientmorty").learnset.grossout = ["9L30"];
	this.modData("Learnsets", "ancientmorty").learnset.bunt = ["9L36"];
	this.modData("Learnsets", "ancientmorty").learnset.boilsqueeze = ["9L41"];

	// Rabbit Morty
	this.modData("Learnsets", "rabbitmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "rabbitmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "rabbitmorty").learnset.provoke = ["9L7"];
	this.modData("Learnsets", "rabbitmorty").learnset.dig = ["9L11"];
	this.modData("Learnsets", "rabbitmorty").learnset.puffytail = ["9L16"];
	this.modData("Learnsets", "rabbitmorty").learnset.rush = ["9L21"];
	this.modData("Learnsets", "rabbitmorty").learnset.snub = ["9L24"];
	this.modData("Learnsets", "rabbitmorty").learnset.scratchingpost = ["9L29"];

	// Evil Rabbit Morty
	this.modData("Learnsets", "evilrabbitmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "evilrabbitmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "evilrabbitmorty").learnset.provoke = ["9L9"];
	this.modData("Learnsets", "evilrabbitmorty").learnset.dig = ["9L13"];
	this.modData("Learnsets", "evilrabbitmorty").learnset.puffytail = ["9L17"];
	this.modData("Learnsets", "evilrabbitmorty").learnset.rush = ["9L22"];
	this.modData("Learnsets", "evilrabbitmorty").learnset.snub = ["9L24"];
	this.modData("Learnsets", "evilrabbitmorty").learnset.scratchingpost = ["9L30"];
	this.modData("Learnsets", "evilrabbitmorty").learnset.mindmeld = ["9L34"];
	this.modData("Learnsets", "evilrabbitmorty").learnset.hypnotize = ["9L39"];

	// No Eye Morty
	this.modData("Learnsets", "noeyemorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "noeyemorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "noeyemorty").learnset.erase = ["9L8"];
	this.modData("Learnsets", "noeyemorty").learnset.blindswing = ["9L11"];
	this.modData("Learnsets", "noeyemorty").learnset.lick = ["9L16"];
	this.modData("Learnsets", "noeyemorty").learnset.deathstare = ["9L21"];
	this.modData("Learnsets", "noeyemorty").learnset.blink = ["9L23"];
	this.modData("Learnsets", "noeyemorty").learnset.mutate = ["9L27"];

	// One Eye Morty
	this.modData("Learnsets", "oneeyemorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "oneeyemorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "oneeyemorty").learnset.erase = ["9L8"];
	this.modData("Learnsets", "oneeyemorty").learnset.blindswing = ["9L13"];
	this.modData("Learnsets", "oneeyemorty").learnset.lick = ["9L17"];
	this.modData("Learnsets", "oneeyemorty").learnset.deathstare = ["9L22"];
	this.modData("Learnsets", "oneeyemorty").learnset.blink = ["9L25"];
	this.modData("Learnsets", "oneeyemorty").learnset.mutate = ["9L29"];
	this.modData("Learnsets", "oneeyemorty").learnset.staredown = ["9L33"];

	// Three Eye Morty
	this.modData("Learnsets", "threeeyemorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "threeeyemorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "threeeyemorty").learnset.erase = ["9L8"];
	this.modData("Learnsets", "threeeyemorty").learnset.blindswing = ["9L13"];
	this.modData("Learnsets", "threeeyemorty").learnset.lick = ["9L17"];
	this.modData("Learnsets", "threeeyemorty").learnset.deathstare = ["9L23"];
	this.modData("Learnsets", "threeeyemorty").learnset.blink = ["9L26"];
	this.modData("Learnsets", "threeeyemorty").learnset.mutate = ["9L31"];
	this.modData("Learnsets", "threeeyemorty").learnset.staredown = ["9L35"];
	this.modData("Learnsets", "threeeyemorty").learnset.piercingstare = ["9L42"];

	// Test X1 Morty
	this.modData("Learnsets", "testx1morty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "testx1morty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "testx1morty").learnset.plasmaburst = ["9L6"];
	this.modData("Learnsets", "testx1morty").learnset.cellsplitter = ["9L12"];
	this.modData("Learnsets", "testx1morty").learnset.moisten = ["9L16"];
	this.modData("Learnsets", "testx1morty").learnset.gooeydischarge = ["9L21"];
	this.modData("Learnsets", "testx1morty").learnset.grossout = ["9L23"];
	this.modData("Learnsets", "testx1morty").learnset.mutate = ["9L28"];

	// Test X46 Morty
	this.modData("Learnsets", "testx46morty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "testx46morty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "testx46morty").learnset.plasmaburst = ["9L6"];
	this.modData("Learnsets", "testx46morty").learnset.cellsplitter = ["9L13"];
	this.modData("Learnsets", "testx46morty").learnset.moisten = ["9L16"];
	this.modData("Learnsets", "testx46morty").learnset.gooeydischarge = ["9L21"];
	this.modData("Learnsets", "testx46morty").learnset.grossout = ["9L23"];
	this.modData("Learnsets", "testx46morty").learnset.mutate = ["9L28"];
	this.modData("Learnsets", "testx46morty").learnset.wrangle = ["9L33"];

	// Test X72 Morty
	this.modData("Learnsets", "testx72morty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "testx72morty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "testx72morty").learnset.plasmaburst = ["9L6"];
	this.modData("Learnsets", "testx72morty").learnset.cellsplitter = ["9L13"];
	this.modData("Learnsets", "testx72morty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "testx72morty").learnset.gooeydischarge = ["9L22"];
	this.modData("Learnsets", "testx72morty").learnset.grossout = ["9L25"];
	this.modData("Learnsets", "testx72morty").learnset.mutate = ["9L29"];
	this.modData("Learnsets", "testx72morty").learnset.wrangle = ["9L33"];
	this.modData("Learnsets", "testx72morty").learnset.purplesquirt = ["9L39"];

	// Self-Defense Morty
	this.modData("Learnsets", "selfdefensemorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "selfdefensemorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "selfdefensemorty").learnset.weardown = ["9L9"];
	this.modData("Learnsets", "selfdefensemorty").learnset.spar = ["9L14"];
	this.modData("Learnsets", "selfdefensemorty").learnset.retainstrength = ["9L18"];
	this.modData("Learnsets", "selfdefensemorty").learnset.swing = ["9L21"];
	this.modData("Learnsets", "selfdefensemorty").learnset.staredown = ["9L25"];
	this.modData("Learnsets", "selfdefensemorty").learnset.crush = ["9L30"];

	// Karate Morty
	this.modData("Learnsets", "karatemorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "karatemorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "karatemorty").learnset.weardown = ["9L10"];
	this.modData("Learnsets", "karatemorty").learnset.spar = ["9L14"];
	this.modData("Learnsets", "karatemorty").learnset.retainstrength = ["9L18"];
	this.modData("Learnsets", "karatemorty").learnset.swing = ["9L21"];
	this.modData("Learnsets", "karatemorty").learnset.staredown = ["9L25"];
	this.modData("Learnsets", "karatemorty").learnset.crush = ["9L30"];
	this.modData("Learnsets", "karatemorty").learnset.pout = ["9L35"];

	// No Mercy Morty
	this.modData("Learnsets", "nomercymorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "nomercymorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "nomercymorty").learnset.weardown = ["9L10"];
	this.modData("Learnsets", "nomercymorty").learnset.spar = ["9L14"];
	this.modData("Learnsets", "nomercymorty").learnset.retainstrength = ["9L18"];
	this.modData("Learnsets", "nomercymorty").learnset.swing = ["9L21"];
	this.modData("Learnsets", "nomercymorty").learnset.staredown = ["9L25"];
	this.modData("Learnsets", "nomercymorty").learnset.crush = ["9L31"];
	this.modData("Learnsets", "nomercymorty").learnset.pout = ["9L35"];
	this.modData("Learnsets", "nomercymorty").learnset.legsweep = ["9L40"];

	// Mustache Morty
	this.modData("Learnsets", "mustachemorty").learnset.comb = ["9L1"];
	this.modData("Learnsets", "mustachemorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "mustachemorty").learnset.crimp = ["9L8"];
	this.modData("Learnsets", "mustachemorty").learnset.provoke = ["9L10"];
	this.modData("Learnsets", "mustachemorty").learnset.snippet = ["9L14"];
	this.modData("Learnsets", "mustachemorty").learnset.defend = ["9L19"];
	this.modData("Learnsets", "mustachemorty").learnset.shave = ["9L25"];
	this.modData("Learnsets", "mustachemorty").learnset.pout = ["9L29"];

	// Beard Morty
	this.modData("Learnsets", "beardmorty").learnset.comb = ["9L1"];
	this.modData("Learnsets", "beardmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "beardmorty").learnset.crimp = ["9L8"];
	this.modData("Learnsets", "beardmorty").learnset.provoke = ["9L10"];
	this.modData("Learnsets", "beardmorty").learnset.snippet = ["9L15"];
	this.modData("Learnsets", "beardmorty").learnset.defend = ["9L20"];
	this.modData("Learnsets", "beardmorty").learnset.shave = ["9L26"];
	this.modData("Learnsets", "beardmorty").learnset.pout = ["9L30"];
	this.modData("Learnsets", "beardmorty").learnset.bunt = ["9L33"];

	// Hipster Morty
	this.modData("Learnsets", "hipstermorty").learnset.comb = ["9L1"];
	this.modData("Learnsets", "hipstermorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "hipstermorty").learnset.crimp = ["9L8"];
	this.modData("Learnsets", "hipstermorty").learnset.provoke = ["9L10"];
	this.modData("Learnsets", "hipstermorty").learnset.snippet = ["9L15"];
	this.modData("Learnsets", "hipstermorty").learnset.defend = ["9L20"];
	this.modData("Learnsets", "hipstermorty").learnset.shave = ["9L26"];
	this.modData("Learnsets", "hipstermorty").learnset.pout = ["9L31"];
	this.modData("Learnsets", "hipstermorty").learnset.bunt = ["9L34"];
	this.modData("Learnsets", "hipstermorty").learnset.effetecharm = ["9L39"];

	// Ad Space Morty
	this.modData("Learnsets", "adspacemorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "adspacemorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "adspacemorty").learnset.flail = ["9L6"];
	this.modData("Learnsets", "adspacemorty").learnset.provoke = ["9L12"];
	this.modData("Learnsets", "adspacemorty").learnset.swing = ["9L16"];
	this.modData("Learnsets", "adspacemorty").learnset.staredown = ["9L20"];
	this.modData("Learnsets", "adspacemorty").learnset.monetize = ["9L23"];
	this.modData("Learnsets", "adspacemorty").learnset.entertain = ["9L27"];

	// Jerry's Game Morty
	this.modData("Learnsets", "jerrysgamemorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "jerrysgamemorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "jerrysgamemorty").learnset.flail = ["9L7"];
	this.modData("Learnsets", "jerrysgamemorty").learnset.provoke = ["9L12"];
	this.modData("Learnsets", "jerrysgamemorty").learnset.swing = ["9L16"];
	this.modData("Learnsets", "jerrysgamemorty").learnset.staredown = ["9L20"];
	this.modData("Learnsets", "jerrysgamemorty").learnset.monetize = ["9L23"];
	this.modData("Learnsets", "jerrysgamemorty").learnset.entertain = ["9L28"];
	this.modData("Learnsets", "jerrysgamemorty").learnset.selfie = ["9L32"];

	// Pocket Mortys Morty
	this.modData("Learnsets", "pocketmortysmorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "pocketmortysmorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "pocketmortysmorty").learnset.flail = ["9L7"];
	this.modData("Learnsets", "pocketmortysmorty").learnset.provoke = ["9L12"];
	this.modData("Learnsets", "pocketmortysmorty").learnset.swing = ["9L16"];
	this.modData("Learnsets", "pocketmortysmorty").learnset.staredown = ["9L21"];
	this.modData("Learnsets", "pocketmortysmorty").learnset.monetize = ["9L23"];
	this.modData("Learnsets", "pocketmortysmorty").learnset.entertain = ["9L29"];
	this.modData("Learnsets", "pocketmortysmorty").learnset.selfie = ["9L33"];
	this.modData("Learnsets", "pocketmortysmorty").learnset.selfpromote = ["9L37"];

	// Blue Shirt Morty
	this.modData("Learnsets", "blueshirtmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "blueshirtmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "blueshirtmorty").learnset.bluespray = ["9L8"];
	this.modData("Learnsets", "blueshirtmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "blueshirtmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "blueshirtmorty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "blueshirtmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "blueshirtmorty").learnset.fiercelunge = ["9L31"];
	this.modData("Learnsets", "blueshirtmorty").learnset.staredown = ["9L35"];
	this.modData("Learnsets", "blueshirtmorty").learnset.unleash = ["9L39"];

	// Red Shirt Morty
	this.modData("Learnsets", "redshirtmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "redshirtmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "redshirtmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "redshirtmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "redshirtmorty").learnset.redmist = ["9L14"];
	this.modData("Learnsets", "redshirtmorty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "redshirtmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "redshirtmorty").learnset.fiercelunge = ["9L31"];
	this.modData("Learnsets", "redshirtmorty").learnset.staredown = ["9L35"];
	this.modData("Learnsets", "redshirtmorty").learnset.unleash = ["9L39"];

	// Orange Shirt Morty
	this.modData("Learnsets", "orangeshirtmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "orangeshirtmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "orangeshirtmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "orangeshirtmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "orangeshirtmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "orangeshirtmorty").learnset.orangeshower = ["9L19"];
	this.modData("Learnsets", "orangeshirtmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "orangeshirtmorty").learnset.fiercelunge = ["9L31"];
	this.modData("Learnsets", "orangeshirtmorty").learnset.staredown = ["9L35"];
	this.modData("Learnsets", "orangeshirtmorty").learnset.unleash = ["9L39"];

	// Green Shirt Morty
	this.modData("Learnsets", "greenshirtmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "greenshirtmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "greenshirtmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "greenshirtmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "greenshirtmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "greenshirtmorty").learnset.greenblur = ["9L19"];
	this.modData("Learnsets", "greenshirtmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "greenshirtmorty").learnset.fiercelunge = ["9L31"];
	this.modData("Learnsets", "greenshirtmorty").learnset.staredown = ["9L35"];
	this.modData("Learnsets", "greenshirtmorty").learnset.unleash = ["9L39"];

	// Purple Shirt Morty
	this.modData("Learnsets", "purpleshirtmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "purpleshirtmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "purpleshirtmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "purpleshirtmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "purpleshirtmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "purpleshirtmorty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "purpleshirtmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "purpleshirtmorty").learnset.purplesquirt = ["9L31"];
	this.modData("Learnsets", "purpleshirtmorty").learnset.staredown = ["9L35"];
	this.modData("Learnsets", "purpleshirtmorty").learnset.unleash = ["9L39"];

	// Rainbow Shirt Morty
	this.modData("Learnsets", "rainbowshirtmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "rainbowshirtmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "rainbowshirtmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "rainbowshirtmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "rainbowshirtmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "rainbowshirtmorty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "rainbowshirtmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "rainbowshirtmorty").learnset.fiercelunge = ["9L31"];
	this.modData("Learnsets", "rainbowshirtmorty").learnset.rainbow = ["9L35"];
	this.modData("Learnsets", "rainbowshirtmorty").learnset.unleash = ["9L39"];

	// Exo-Alpha Morty
	this.modData("Learnsets", "exoalphamorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "exoalphamorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "exoalphamorty").learnset.probe = ["9L7"];
	this.modData("Learnsets", "exoalphamorty").learnset.stargaze = ["9L11"];
	this.modData("Learnsets", "exoalphamorty").learnset.snippet = ["9L14"];
	this.modData("Learnsets", "exoalphamorty").learnset.protect = ["9L20"];
	this.modData("Learnsets", "exoalphamorty").learnset.beam = ["9L24"];
	this.modData("Learnsets", "exoalphamorty").learnset.invasion = ["9L30"];

	// Exo-Omega Morty
	this.modData("Learnsets", "exoomegamorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "exoomegamorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "exoomegamorty").learnset.probe = ["9L7"];
	this.modData("Learnsets", "exoomegamorty").learnset.stargaze = ["9L11"];
	this.modData("Learnsets", "exoomegamorty").learnset.snippet = ["9L15"];
	this.modData("Learnsets", "exoomegamorty").learnset.protect = ["9L20"];
	this.modData("Learnsets", "exoomegamorty").learnset.beam = ["9L25"];
	this.modData("Learnsets", "exoomegamorty").learnset.invasion = ["9L32"];
	this.modData("Learnsets", "exoomegamorty").learnset.staredown = ["9L37"];

	// Exo-Prime Morty
	this.modData("Learnsets", "exoprimemorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "exoprimemorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "exoprimemorty").learnset.probe = ["9L7"];
	this.modData("Learnsets", "exoprimemorty").learnset.stargaze = ["9L11"];
	this.modData("Learnsets", "exoprimemorty").learnset.snippet = ["9L15"];
	this.modData("Learnsets", "exoprimemorty").learnset.protect = ["9L20"];
	this.modData("Learnsets", "exoprimemorty").learnset.beam = ["9L25"];
	this.modData("Learnsets", "exoprimemorty").learnset.invasion = ["9L32"];
	this.modData("Learnsets", "exoprimemorty").learnset.staredown = ["9L37"];
	this.modData("Learnsets", "exoprimemorty").learnset.mindmeld = ["9L44"];

	// Spoon Morty
	this.modData("Learnsets", "spoonmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "spoonmorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "spoonmorty").learnset.poke = ["9L7"];
	this.modData("Learnsets", "spoonmorty").learnset.belch = ["9L13"];
	this.modData("Learnsets", "spoonmorty").learnset.swing = ["9L17"];
	this.modData("Learnsets", "spoonmorty").learnset.mortify = ["9L22"];
	this.modData("Learnsets", "spoonmorty").learnset.blink = ["9L26"];
	this.modData("Learnsets", "spoonmorty").learnset.servingup = ["9L30"];

	// Fork Morty
	this.modData("Learnsets", "forkmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "forkmorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "forkmorty").learnset.poke = ["9L8"];
	this.modData("Learnsets", "forkmorty").learnset.belch = ["9L14"];
	this.modData("Learnsets", "forkmorty").learnset.swing = ["9L17"];
	this.modData("Learnsets", "forkmorty").learnset.mortify = ["9L22"];
	this.modData("Learnsets", "forkmorty").learnset.blink = ["9L26"];
	this.modData("Learnsets", "forkmorty").learnset.servingup = ["9L31"];
	this.modData("Learnsets", "forkmorty").learnset.wrangle = ["9L34"];

	// Spork Morty
	this.modData("Learnsets", "sporkmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "sporkmorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "sporkmorty").learnset.poke = ["9L9"];
	this.modData("Learnsets", "sporkmorty").learnset.belch = ["9L14"];
	this.modData("Learnsets", "sporkmorty").learnset.swing = ["9L17"];
	this.modData("Learnsets", "sporkmorty").learnset.mortify = ["9L22"];
	this.modData("Learnsets", "sporkmorty").learnset.blink = ["9L26"];
	this.modData("Learnsets", "sporkmorty").learnset.servingup = ["9L31"];
	this.modData("Learnsets", "sporkmorty").learnset.wrangle = ["9L34"];
	this.modData("Learnsets", "sporkmorty").learnset.dinnertime = ["9L40"];

	// Peace Morty
	this.modData("Learnsets", "peacemorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "peacemorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "peacemorty").learnset.relax = ["9L8"];
	this.modData("Learnsets", "peacemorty").learnset.dig = ["9L9"];
	this.modData("Learnsets", "peacemorty").learnset.flowerchild = ["9L13"];
	this.modData("Learnsets", "peacemorty").learnset.lovebug = ["9L19"];
	this.modData("Learnsets", "peacemorty").learnset.greenblur = ["9L21"];
	this.modData("Learnsets", "peacemorty").learnset.defend = ["9L26"];

	// Hippie Morty
	this.modData("Learnsets", "hippiemorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "hippiemorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "hippiemorty").learnset.relax = ["9L8"];
	this.modData("Learnsets", "hippiemorty").learnset.dig = ["9L11"];
	this.modData("Learnsets", "hippiemorty").learnset.flowerchild = ["9L14"];
	this.modData("Learnsets", "hippiemorty").learnset.lovebug = ["9L20"];
	this.modData("Learnsets", "hippiemorty").learnset.greenblur = ["9L22"];
	this.modData("Learnsets", "hippiemorty").learnset.defend = ["9L26"];
	this.modData("Learnsets", "hippiemorty").learnset.fiercelunge = ["9L31"];

	// Off The Grid Morty
	this.modData("Learnsets", "offthegridmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "offthegridmorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "offthegridmorty").learnset.relax = ["9L8"];
	this.modData("Learnsets", "offthegridmorty").learnset.dig = ["9L11"];
	this.modData("Learnsets", "offthegridmorty").learnset.flowerchild = ["9L14"];
	this.modData("Learnsets", "offthegridmorty").learnset.lovebug = ["9L20"];
	this.modData("Learnsets", "offthegridmorty").learnset.greenblur = ["9L22"];
	this.modData("Learnsets", "offthegridmorty").learnset.defend = ["9L26"];
	this.modData("Learnsets", "offthegridmorty").learnset.fiercelunge = ["9L32"];
	this.modData("Learnsets", "offthegridmorty").learnset.rootdown = ["9L37"];

	// Big Head Morty
	this.modData("Learnsets", "bigheadmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "bigheadmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "bigheadmorty").learnset.lick = ["9L6"];
	this.modData("Learnsets", "bigheadmorty").learnset.stonegaze = ["9L11"];
	this.modData("Learnsets", "bigheadmorty").learnset.blink = ["9L15"];
	this.modData("Learnsets", "bigheadmorty").learnset.swing = ["9L19"];
	this.modData("Learnsets", "bigheadmorty").learnset.bunt = ["9L22"];
	this.modData("Learnsets", "bigheadmorty").learnset.defend = ["9L26"];

	// Giant Head Morty
	this.modData("Learnsets", "giantheadmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "giantheadmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "giantheadmorty").learnset.lick = ["9L8"];
	this.modData("Learnsets", "giantheadmorty").learnset.stonegaze = ["9L12"];
	this.modData("Learnsets", "giantheadmorty").learnset.blink = ["9L16"];
	this.modData("Learnsets", "giantheadmorty").learnset.swing = ["9L20"];
	this.modData("Learnsets", "giantheadmorty").learnset.bunt = ["9L22"];
	this.modData("Learnsets", "giantheadmorty").learnset.defend = ["9L27"];
	this.modData("Learnsets", "giantheadmorty").learnset.crush = ["9L31"];

	// Colossal Head Morty
	this.modData("Learnsets", "colossalheadmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "colossalheadmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "colossalheadmorty").learnset.lick = ["9L8"];
	this.modData("Learnsets", "colossalheadmorty").learnset.stonegaze = ["9L12"];
	this.modData("Learnsets", "colossalheadmorty").learnset.blink = ["9L16"];
	this.modData("Learnsets", "colossalheadmorty").learnset.swing = ["9L20"];
	this.modData("Learnsets", "colossalheadmorty").learnset.bunt = ["9L23"];
	this.modData("Learnsets", "colossalheadmorty").learnset.defend = ["9L27"];
	this.modData("Learnsets", "colossalheadmorty").learnset.crush = ["9L32"];
	this.modData("Learnsets", "colossalheadmorty").learnset.rollingstone = ["9L37"];

	// Spooky Morty
	this.modData("Learnsets", "spookymorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "spookymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "spookymorty").learnset.cry = ["9L5"];
	this.modData("Learnsets", "spookymorty").learnset.plasmaburst = ["9L9"];
	this.modData("Learnsets", "spookymorty").learnset.negativeenergy = ["9L13"];
	this.modData("Learnsets", "spookymorty").learnset.erase = ["9L19"];
	this.modData("Learnsets", "spookymorty").learnset.grossout = ["9L24"];
	this.modData("Learnsets", "spookymorty").learnset.ouija = ["9L29"];

	// Ghostly Morty
	this.modData("Learnsets", "ghostlymorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "ghostlymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "ghostlymorty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "ghostlymorty").learnset.plasmaburst = ["9L9"];
	this.modData("Learnsets", "ghostlymorty").learnset.negativeenergy = ["9L14"];
	this.modData("Learnsets", "ghostlymorty").learnset.erase = ["9L19"];
	this.modData("Learnsets", "ghostlymorty").learnset.grossout = ["9L25"];
	this.modData("Learnsets", "ghostlymorty").learnset.ouija = ["9L31"];
	this.modData("Learnsets", "ghostlymorty").learnset.piercingstare = ["9L36"];

	// Phantom Morty
	this.modData("Learnsets", "phantommorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "phantommorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "phantommorty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "phantommorty").learnset.plasmaburst = ["9L10"];
	this.modData("Learnsets", "phantommorty").learnset.negativeenergy = ["9L14"];
	this.modData("Learnsets", "phantommorty").learnset.erase = ["9L19"];
	this.modData("Learnsets", "phantommorty").learnset.grossout = ["9L25"];
	this.modData("Learnsets", "phantommorty").learnset.ouija = ["9L31"];
	this.modData("Learnsets", "phantommorty").learnset.piercingstare = ["9L38"];
	this.modData("Learnsets", "phantommorty").learnset.exofragment = ["9L43"];

	// Double Morty
	this.modData("Learnsets", "doublemorty").learnset.crimp = ["9L1"];
	this.modData("Learnsets", "doublemorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "doublemorty").learnset.swing = ["9L8"];
	this.modData("Learnsets", "doublemorty").learnset.protect = ["9L12"];
	this.modData("Learnsets", "doublemorty").learnset.mindrage = ["9L16"];
	this.modData("Learnsets", "doublemorty").learnset.grossout = ["9L21"];
	this.modData("Learnsets", "doublemorty").learnset.mutate = ["9L24"];
	this.modData("Learnsets", "doublemorty").learnset.wrangle = ["9L29"];

	// Triple Morty
	this.modData("Learnsets", "triplemorty").learnset.crimp = ["9L1"];
	this.modData("Learnsets", "triplemorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "triplemorty").learnset.swing = ["9L8"];
	this.modData("Learnsets", "triplemorty").learnset.protect = ["9L13"];
	this.modData("Learnsets", "triplemorty").learnset.mindrage = ["9L17"];
	this.modData("Learnsets", "triplemorty").learnset.grossout = ["9L22"];
	this.modData("Learnsets", "triplemorty").learnset.mutate = ["9L24"];
	this.modData("Learnsets", "triplemorty").learnset.wrangle = ["9L30"];
	this.modData("Learnsets", "triplemorty").learnset.mindmeld = ["9L35"];

	// Multi Morty
	this.modData("Learnsets", "multimorty").learnset.crimp = ["9L1"];
	this.modData("Learnsets", "multimorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "multimorty").learnset.swing = ["9L9"];
	this.modData("Learnsets", "multimorty").learnset.protect = ["9L13"];
	this.modData("Learnsets", "multimorty").learnset.mindrage = ["9L17"];
	this.modData("Learnsets", "multimorty").learnset.grossout = ["9L22"];
	this.modData("Learnsets", "multimorty").learnset.mutate = ["9L24"];
	this.modData("Learnsets", "multimorty").learnset.wrangle = ["9L30"];
	this.modData("Learnsets", "multimorty").learnset.mindmeld = ["9L35"];
	this.modData("Learnsets", "multimorty").learnset.mangle = ["9L41"];

	// Greaser Morty
	this.modData("Learnsets", "greasermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "greasermorty").learnset.belch = ["9L1"];
	this.modData("Learnsets", "greasermorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "greasermorty").learnset.harden = ["9L14"];
	this.modData("Learnsets", "greasermorty").learnset.stonegaze = ["9L18"];
	this.modData("Learnsets", "greasermorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "greasermorty").learnset.servingup = ["9L26"];
	this.modData("Learnsets", "greasermorty").learnset.retainstrength = ["9L30"];

	// Biker Morty
	this.modData("Learnsets", "bikermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "bikermorty").learnset.belch = ["9L1"];
	this.modData("Learnsets", "bikermorty").learnset.flail = ["9L9"];
	this.modData("Learnsets", "bikermorty").learnset.harden = ["9L14"];
	this.modData("Learnsets", "bikermorty").learnset.stonegaze = ["9L18"];
	this.modData("Learnsets", "bikermorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "bikermorty").learnset.servingup = ["9L26"];
	this.modData("Learnsets", "bikermorty").learnset.retainstrength = ["9L30"];
	this.modData("Learnsets", "bikermorty").learnset.fiercelunge = ["9L34"];
	this.modData("Learnsets", "bikermorty").learnset.rollingstone = ["9L41"];

	// Stray Cat Morty
	this.modData("Learnsets", "straycatmorty").learnset.puffytail = ["9L1"];
	this.modData("Learnsets", "straycatmorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "straycatmorty").learnset.lick = ["9L8"];
	this.modData("Learnsets", "straycatmorty").learnset.snippet = ["9L10"];
	this.modData("Learnsets", "straycatmorty").learnset.outburst = ["9L14"];
	this.modData("Learnsets", "straycatmorty").learnset.scratchingpost = ["9L19"];
	this.modData("Learnsets", "straycatmorty").learnset.snub = ["9L22"];
	this.modData("Learnsets", "straycatmorty").learnset.clawsout = ["9L28"];

	// Two Cat Morty
	this.modData("Learnsets", "twocatmorty").learnset.puffytail = ["9L1"];
	this.modData("Learnsets", "twocatmorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "twocatmorty").learnset.lick = ["9L8"];
	this.modData("Learnsets", "twocatmorty").learnset.snippet = ["9L11"];
	this.modData("Learnsets", "twocatmorty").learnset.outburst = ["9L15"];
	this.modData("Learnsets", "twocatmorty").learnset.scratchingpost = ["9L19"];
	this.modData("Learnsets", "twocatmorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "twocatmorty").learnset.clawsout = ["9L29"];
	this.modData("Learnsets", "twocatmorty").learnset.sparkle = ["9L34"];

	// Crazy Cat Morty
	this.modData("Learnsets", "crazycatmorty").learnset.puffytail = ["9L1"];
	this.modData("Learnsets", "crazycatmorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "crazycatmorty").learnset.lick = ["9L8"];
	this.modData("Learnsets", "crazycatmorty").learnset.snippet = ["9L11"];
	this.modData("Learnsets", "crazycatmorty").learnset.outburst = ["9L15"];
	this.modData("Learnsets", "crazycatmorty").learnset.scratchingpost = ["9L19"];
	this.modData("Learnsets", "crazycatmorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "crazycatmorty").learnset.clawsout = ["9L29"];
	this.modData("Learnsets", "crazycatmorty").learnset.sparkle = ["9L34"];
	this.modData("Learnsets", "crazycatmorty").learnset.dinnertime = ["9L38"];

	// Buff Morty
	this.modData("Learnsets", "buffmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "buffmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "buffmorty").learnset.spar = ["9L8"];
	this.modData("Learnsets", "buffmorty").learnset.harden = ["9L10"];
	this.modData("Learnsets", "buffmorty").learnset.swing = ["9L15"];
	this.modData("Learnsets", "buffmorty").learnset.crush = ["9L19"];
	this.modData("Learnsets", "buffmorty").learnset.humiliate = ["9L24"];
	this.modData("Learnsets", "buffmorty").learnset.staredown = ["9L30"];

	// Wrestler Morty
	this.modData("Learnsets", "wrestlermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "wrestlermorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "wrestlermorty").learnset.spar = ["9L8"];
	this.modData("Learnsets", "wrestlermorty").learnset.harden = ["9L11"];
	this.modData("Learnsets", "wrestlermorty").learnset.swing = ["9L16"];
	this.modData("Learnsets", "wrestlermorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "wrestlermorty").learnset.humiliate = ["9L26"];
	this.modData("Learnsets", "wrestlermorty").learnset.staredown = ["9L33"];
	this.modData("Learnsets", "wrestlermorty").learnset.suplex = ["9L42"];

	// Veiny Morty
	this.modData("Learnsets", "veinymorty").learnset.harden = ["9L1"];
	this.modData("Learnsets", "veinymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "veinymorty").learnset.grossout = ["9L8"];
	this.modData("Learnsets", "veinymorty").learnset.melt = ["9L10"];
	this.modData("Learnsets", "veinymorty").learnset.haunt = ["9L15"];
	this.modData("Learnsets", "veinymorty").learnset.gooeydischarge = ["9L21"];
	this.modData("Learnsets", "veinymorty").learnset.transplant = ["9L24"];
	this.modData("Learnsets", "veinymorty").learnset.bloodpressure = ["9L30"];

	// No Skin Morty
	this.modData("Learnsets", "noskinmorty").learnset.harden = ["9L1"];
	this.modData("Learnsets", "noskinmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "noskinmorty").learnset.grossout = ["9L8"];
	this.modData("Learnsets", "noskinmorty").learnset.melt = ["9L11"];
	this.modData("Learnsets", "noskinmorty").learnset.haunt = ["9L16"];
	this.modData("Learnsets", "noskinmorty").learnset.gooeydischarge = ["9L21"];
	this.modData("Learnsets", "noskinmorty").learnset.transplant = ["9L25"];
	this.modData("Learnsets", "noskinmorty").learnset.bloodpressure = ["9L31"];
	this.modData("Learnsets", "noskinmorty").learnset.mutate = ["9L35"];

	// Skeleton Morty
	this.modData("Learnsets", "skeletonmorty").learnset.harden = ["9L1"];
	this.modData("Learnsets", "skeletonmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "skeletonmorty").learnset.grossout = ["9L8"];
	this.modData("Learnsets", "skeletonmorty").learnset.melt = ["9L11"];
	this.modData("Learnsets", "skeletonmorty").learnset.haunt = ["9L16"];
	this.modData("Learnsets", "skeletonmorty").learnset.gooeydischarge = ["9L21"];
	this.modData("Learnsets", "skeletonmorty").learnset.transplant = ["9L25"];
	this.modData("Learnsets", "skeletonmorty").learnset.bloodpressure = ["9L31"];
	this.modData("Learnsets", "skeletonmorty").learnset.mutate = ["9L36"];
	this.modData("Learnsets", "skeletonmorty").learnset.boneextract = ["9L42"];

	// Magic Morty
	this.modData("Learnsets", "magicmorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "magicmorty").learnset.mindread = ["9L1"];
	this.modData("Learnsets", "magicmorty").learnset.negativeenergy = ["9L6"];
	this.modData("Learnsets", "magicmorty").learnset.guillotine = ["9L9"];
	this.modData("Learnsets", "magicmorty").learnset.sparkle = ["9L13"];
	this.modData("Learnsets", "magicmorty").learnset.ouija = ["9L19"];
	this.modData("Learnsets", "magicmorty").learnset.mortify = ["9L23"];
	this.modData("Learnsets", "magicmorty").learnset.nickelanddime = ["9L29"];

	// Mystic Morty
	this.modData("Learnsets", "mysticmorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "mysticmorty").learnset.mindread = ["9L1"];
	this.modData("Learnsets", "mysticmorty").learnset.negativeenergy = ["9L6"];
	this.modData("Learnsets", "mysticmorty").learnset.guillotine = ["9L9"];
	this.modData("Learnsets", "mysticmorty").learnset.sparkle = ["9L13"];
	this.modData("Learnsets", "mysticmorty").learnset.ouija = ["9L19"];
	this.modData("Learnsets", "mysticmorty").learnset.mortify = ["9L24"];
	this.modData("Learnsets", "mysticmorty").learnset.nickelanddime = ["9L30"];
	this.modData("Learnsets", "mysticmorty").learnset.hypnotize = ["9L35"];

	// Wizard Morty
	this.modData("Learnsets", "wizardmorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "wizardmorty").learnset.mindread = ["9L1"];
	this.modData("Learnsets", "wizardmorty").learnset.negativeenergy = ["9L6"];
	this.modData("Learnsets", "wizardmorty").learnset.guillotine = ["9L9"];
	this.modData("Learnsets", "wizardmorty").learnset.sparkle = ["9L13"];
	this.modData("Learnsets", "wizardmorty").learnset.ouija = ["9L19"];
	this.modData("Learnsets", "wizardmorty").learnset.mortify = ["9L24"];
	this.modData("Learnsets", "wizardmorty").learnset.nickelanddime = ["9L30"];
	this.modData("Learnsets", "wizardmorty").learnset.hypnotize = ["9L35"];
	this.modData("Learnsets", "wizardmorty").learnset.fireball = ["9L41"];

	// Telepathic Morty
	this.modData("Learnsets", "telepathicmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "telepathicmorty").learnset.plasmaburst = ["9L1"];
	this.modData("Learnsets", "telepathicmorty").learnset.stargaze = ["9L8"];
	this.modData("Learnsets", "telepathicmorty").learnset.mindrage = ["9L10"];
	this.modData("Learnsets", "telepathicmorty").learnset.haunt = ["9L14"];
	this.modData("Learnsets", "telepathicmorty").learnset.beam = ["9L18"];
	this.modData("Learnsets", "telepathicmorty").learnset.invasion = ["9L23"];
	this.modData("Learnsets", "telepathicmorty").learnset.hypnotize = ["9L29"];

	// Telekinetic Morty
	this.modData("Learnsets", "telekineticmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "telekineticmorty").learnset.plasmaburst = ["9L1"];
	this.modData("Learnsets", "telekineticmorty").learnset.stargaze = ["9L8"];
	this.modData("Learnsets", "telekineticmorty").learnset.mindrage = ["9L10"];
	this.modData("Learnsets", "telekineticmorty").learnset.haunt = ["9L14"];
	this.modData("Learnsets", "telekineticmorty").learnset.beam = ["9L19"];
	this.modData("Learnsets", "telekineticmorty").learnset.invasion = ["9L24"];
	this.modData("Learnsets", "telekineticmorty").learnset.mindmeld = ["9L29"];
	this.modData("Learnsets", "telekineticmorty").learnset.hypnotize = ["9L33"];

	// Psychokinetic Morty
	this.modData("Learnsets", "psychokineticmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "psychokineticmorty").learnset.plasmaburst = ["9L1"];
	this.modData("Learnsets", "psychokineticmorty").learnset.stargaze = ["9L8"];
	this.modData("Learnsets", "psychokineticmorty").learnset.mindrage = ["9L10"];
	this.modData("Learnsets", "psychokineticmorty").learnset.haunt = ["9L14"];
	this.modData("Learnsets", "psychokineticmorty").learnset.beam = ["9L19"];
	this.modData("Learnsets", "psychokineticmorty").learnset.invasion = ["9L24"];
	this.modData("Learnsets", "psychokineticmorty").learnset.hypnotize = ["9L29"];
	this.modData("Learnsets", "psychokineticmorty").learnset.mindmeld = ["9L34"];
	this.modData("Learnsets", "psychokineticmorty").learnset.bloodpressure = ["9L41"];

	// Swimmer Morty
	this.modData("Learnsets", "swimmermorty").learnset.dropout = ["9L1"];
	this.modData("Learnsets", "swimmermorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "swimmermorty").learnset.bunt = ["9L8"];
	this.modData("Learnsets", "swimmermorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "swimmermorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "swimmermorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "swimmermorty").learnset.splash = ["9L24"];
	this.modData("Learnsets", "swimmermorty").learnset.rush = ["9L30"];

	// Mermaid Morty
	this.modData("Learnsets", "mermaidmorty").learnset.dropout = ["9L1"];
	this.modData("Learnsets", "mermaidmorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "mermaidmorty").learnset.bunt = ["9L8"];
	this.modData("Learnsets", "mermaidmorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "mermaidmorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "mermaidmorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "mermaidmorty").learnset.splash = ["9L25"];
	this.modData("Learnsets", "mermaidmorty").learnset.rush = ["9L31"];
	this.modData("Learnsets", "mermaidmorty").learnset.sing = ["9L35"];

	// Reverse Mermaid Morty
	this.modData("Learnsets", "reversemermaidmorty").learnset.dropout = ["9L1"];
	this.modData("Learnsets", "reversemermaidmorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "reversemermaidmorty").learnset.bunt = ["9L8"];
	this.modData("Learnsets", "reversemermaidmorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "reversemermaidmorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "reversemermaidmorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "reversemermaidmorty").learnset.splash = ["9L25"];
	this.modData("Learnsets", "reversemermaidmorty").learnset.rush = ["9L31"];
	this.modData("Learnsets", "reversemermaidmorty").learnset.sing = ["9L35"];
	this.modData("Learnsets", "reversemermaidmorty").learnset.hydroblast = ["9L42"];

	// Business Morty
	this.modData("Learnsets", "businessmorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "businessmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "businessmorty").learnset.suitandboot = ["9L8"];
	this.modData("Learnsets", "businessmorty").learnset.staredown = ["9L13"];
	this.modData("Learnsets", "businessmorty").learnset.rush = ["9L18"];
	this.modData("Learnsets", "businessmorty").learnset.selfpromote = ["9L23"];
	this.modData("Learnsets", "businessmorty").learnset.monetize = ["9L27"];
	this.modData("Learnsets", "businessmorty").learnset.bloodpressure = ["9L32"];
	this.modData("Learnsets", "businessmorty").learnset.stockcrash = ["9L37"];

	// Gaseous Morty
	this.modData("Learnsets", "gaseousmorty").learnset.solidify = ["9L1"];
	this.modData("Learnsets", "gaseousmorty").learnset.belch = ["9L1"];
	this.modData("Learnsets", "gaseousmorty").learnset.neutralise = ["9L8"];
	this.modData("Learnsets", "gaseousmorty").learnset.negativeenergy = ["9L12"];
	this.modData("Learnsets", "gaseousmorty").learnset.ouija = ["9L17"];
	this.modData("Learnsets", "gaseousmorty").learnset.sparkle = ["9L23"];
	this.modData("Learnsets", "gaseousmorty").learnset.shrinkinggas = ["9L24"];
	this.modData("Learnsets", "gaseousmorty").learnset.grossout = ["9L31"];
	this.modData("Learnsets", "gaseousmorty").learnset.vapefume = ["9L36"];

	// Sausage Morty
	this.modData("Learnsets", "sausagemorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "sausagemorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "sausagemorty").learnset.crimp = ["9L9"];
	this.modData("Learnsets", "sausagemorty").learnset.probe = ["9L12"];
	this.modData("Learnsets", "sausagemorty").learnset.protect = ["9L17"];
	this.modData("Learnsets", "sausagemorty").learnset.grossout = ["9L22"];
	this.modData("Learnsets", "sausagemorty").learnset.mutate = ["9L25"];
	this.modData("Learnsets", "sausagemorty").learnset.wrangle = ["9L30"];
	this.modData("Learnsets", "sausagemorty").learnset.dinnertime = ["9L35"];

	// Shadow Morty
	this.modData("Learnsets", "shadowmorty").learnset.melt = ["9L1"];
	this.modData("Learnsets", "shadowmorty").learnset.distract = ["9L1"];
	this.modData("Learnsets", "shadowmorty").learnset.haunt = ["9L9"];
	this.modData("Learnsets", "shadowmorty").learnset.ouija = ["9L13"];
	this.modData("Learnsets", "shadowmorty").learnset.mindrage = ["9L17"];
	this.modData("Learnsets", "shadowmorty").learnset.retainstrength = ["9L21"];
	this.modData("Learnsets", "shadowmorty").learnset.shadowpuppet = ["9L24"];
	this.modData("Learnsets", "shadowmorty").learnset.hypnotize = ["9L30"];
	this.modData("Learnsets", "shadowmorty").learnset.effetecharm = ["9L36"];

	// Aqua Morty
	this.modData("Learnsets", "aquamorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "aquamorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "aquamorty").learnset.bunt = ["9L8"];
	this.modData("Learnsets", "aquamorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "aquamorty").learnset.scrunch = ["9L14"];
	this.modData("Learnsets", "aquamorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "aquamorty").learnset.fangrage = ["9L26"];
	this.modData("Learnsets", "aquamorty").learnset.wrangle = ["9L32"];
	this.modData("Learnsets", "aquamorty").learnset.descale = ["9L38"];

	// Cyclops Morty
	this.modData("Learnsets", "cyclopsmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "cyclopsmorty").learnset.distract = ["9L1"];
	this.modData("Learnsets", "cyclopsmorty").learnset.flail = ["9L7"];
	this.modData("Learnsets", "cyclopsmorty").learnset.belch = ["9L9"];
	this.modData("Learnsets", "cyclopsmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "cyclopsmorty").learnset.mortify = ["9L18"];
	this.modData("Learnsets", "cyclopsmorty").learnset.invasion = ["9L25"];
	this.modData("Learnsets", "cyclopsmorty").learnset.mindread = ["9L31"];
	this.modData("Learnsets", "cyclopsmorty").learnset.mindmeld = ["9L34"];

	// Mini Morty
	this.modData("Learnsets", "minimorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "minimorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "minimorty").learnset.flail = ["9L6"];
	this.modData("Learnsets", "minimorty").learnset.belch = ["9L9"];
	this.modData("Learnsets", "minimorty").learnset.swing = ["9L15"];
	this.modData("Learnsets", "minimorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "minimorty").learnset.shrinkinggas = ["9L25"];
	this.modData("Learnsets", "minimorty").learnset.retainstrength = ["9L29"];
	this.modData("Learnsets", "minimorty").learnset.antbite = ["9L35"];

	// Cowboy Morty
	this.modData("Learnsets", "cowboymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "cowboymorty").learnset.criticize = ["9L1"];
	this.modData("Learnsets", "cowboymorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "cowboymorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "cowboymorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "cowboymorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "cowboymorty").learnset.lasso = ["9L26"];
	this.modData("Learnsets", "cowboymorty").learnset.wrangle = ["9L32"];
	this.modData("Learnsets", "cowboymorty").learnset.quickdraw = ["9L38"];

	// Robot Morty
	this.modData("Learnsets", "robotmorty").learnset.melt = ["9L1"];
	this.modData("Learnsets", "robotmorty").learnset.weardown = ["9L1"];
	this.modData("Learnsets", "robotmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "robotmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "robotmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "robotmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "robotmorty").learnset.defragment = ["9L26"];
	this.modData("Learnsets", "robotmorty").learnset.compute = ["9L32"];
	this.modData("Learnsets", "robotmorty").learnset.reboot = ["9L38"];

	// Hammerhead Morty
	this.modData("Learnsets", "hammerheadmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "hammerheadmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "hammerheadmorty").learnset.bunt = ["9L8"];
	this.modData("Learnsets", "hammerheadmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "hammerheadmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "hammerheadmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "hammerheadmorty").learnset.nail = ["9L26"];
	this.modData("Learnsets", "hammerheadmorty").learnset.defend = ["9L32"];
	this.modData("Learnsets", "hammerheadmorty").learnset.claw = ["9L38"];

	// Guard Morty
	this.modData("Learnsets", "guardmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "guardmorty").learnset.distract = ["9L1"];
	this.modData("Learnsets", "guardmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "guardmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "guardmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "guardmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "guardmorty").learnset.invasion = ["9L26"];
	this.modData("Learnsets", "guardmorty").learnset.defend = ["9L32"];
	this.modData("Learnsets", "guardmorty").learnset.legislate = ["9L38"];

	// Cronenberg Morty
	this.modData("Learnsets", "cronenbergmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "cronenbergmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "cronenbergmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "cronenbergmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "cronenbergmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "cronenbergmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "cronenbergmorty").learnset.mutate = ["9L25"];
	this.modData("Learnsets", "cronenbergmorty").learnset.grossout = ["9L31"];
	this.modData("Learnsets", "cronenbergmorty").learnset.mangle = ["9L39"];

	// Mascot Morty
	this.modData("Learnsets", "mascotmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "mascotmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "mascotmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "mascotmorty").learnset.belch = ["9L11"];
	this.modData("Learnsets", "mascotmorty").learnset.scrunch = ["9L15"];
	this.modData("Learnsets", "mascotmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "mascotmorty").learnset.selfie = ["9L25"];
	this.modData("Learnsets", "mascotmorty").learnset.entertain = ["9L31"];
	this.modData("Learnsets", "mascotmorty").learnset.signautograph = ["9L36"];

	// Egg Morty
	this.modData("Learnsets", "eggmorty").learnset.harden = ["9L1"];

	// The One True Morty
	this.modData("Learnsets", "theonetruemorty").learnset.harden = ["9L1"];
	this.modData("Learnsets", "theonetruemorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "theonetruemorty").learnset.ascend = ["9L20"];
	this.modData("Learnsets", "theonetruemorty").learnset.sparkle = ["9L24"];
	this.modData("Learnsets", "theonetruemorty").learnset.pray = ["9L33"];
	this.modData("Learnsets", "theonetruemorty").learnset.goldentouch = ["9L42"];

	// V Neck Morty
	this.modData("Learnsets", "vneckmorty").learnset.comb = ["9L1"];
	this.modData("Learnsets", "vneckmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "vneckmorty").learnset.machinewash = ["9L7"];
	this.modData("Learnsets", "vneckmorty").learnset.weardown = ["9L11"];
	this.modData("Learnsets", "vneckmorty").learnset.shave = ["9L15"];
	this.modData("Learnsets", "vneckmorty").learnset.pout = ["9L19"];
	this.modData("Learnsets", "vneckmorty").learnset.stitch = ["9L25"];
	this.modData("Learnsets", "vneckmorty").learnset.wedgie = ["9L29"];

	// Tank Top Morty
	this.modData("Learnsets", "tanktopmorty").learnset.comb = ["9L1"];
	this.modData("Learnsets", "tanktopmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "tanktopmorty").learnset.machinewash = ["9L7"];
	this.modData("Learnsets", "tanktopmorty").learnset.weardown = ["9L12"];
	this.modData("Learnsets", "tanktopmorty").learnset.shave = ["9L16"];
	this.modData("Learnsets", "tanktopmorty").learnset.pout = ["9L20"];
	this.modData("Learnsets", "tanktopmorty").learnset.stitch = ["9L25"];
	this.modData("Learnsets", "tanktopmorty").learnset.wedgie = ["9L29"];
	this.modData("Learnsets", "tanktopmorty").learnset.aura = ["9L33"];
	this.modData("Learnsets", "tanktopmorty").learnset.made100cotton = ["9L38"];

	// Mullet Morty
	this.modData("Learnsets", "mulletmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "mulletmorty").learnset.moisten = ["9L5"];
	this.modData("Learnsets", "mulletmorty").learnset.comb = ["9L7"];
	this.modData("Learnsets", "mulletmorty").learnset.curl = ["9L13"];
	this.modData("Learnsets", "mulletmorty").learnset.mortify = ["9L17"];
	this.modData("Learnsets", "mulletmorty").learnset.blowdry = ["9L21"];
	this.modData("Learnsets", "mulletmorty").learnset.criticize = ["9L25"];
	this.modData("Learnsets", "mulletmorty").learnset.transplant = ["9L28"];

	// Chops Morty
	this.modData("Learnsets", "chopsmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "chopsmorty").learnset.moisten = ["9L5"];
	this.modData("Learnsets", "chopsmorty").learnset.comb = ["9L7"];
	this.modData("Learnsets", "chopsmorty").learnset.curl = ["9L13"];
	this.modData("Learnsets", "chopsmorty").learnset.mortify = ["9L17"];
	this.modData("Learnsets", "chopsmorty").learnset.blowdry = ["9L23"];
	this.modData("Learnsets", "chopsmorty").learnset.criticize = ["9L25"];
	this.modData("Learnsets", "chopsmorty").learnset.transplant = ["9L28"];
	this.modData("Learnsets", "chopsmorty").learnset.humiliate = ["9L32"];

	// Afro Morty
	this.modData("Learnsets", "afromorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "afromorty").learnset.moisten = ["9L5"];
	this.modData("Learnsets", "afromorty").learnset.comb = ["9L8"];
	this.modData("Learnsets", "afromorty").learnset.curl = ["9L13"];
	this.modData("Learnsets", "afromorty").learnset.mortify = ["9L18"];
	this.modData("Learnsets", "afromorty").learnset.blowdry = ["9L23"];
	this.modData("Learnsets", "afromorty").learnset.criticize = ["9L25"];
	this.modData("Learnsets", "afromorty").learnset.transplant = ["9L28"];
	this.modData("Learnsets", "afromorty").learnset.humiliate = ["9L32"];
	this.modData("Learnsets", "afromorty").learnset.delouse = ["9L38"];

	// Tired Morty
	this.modData("Learnsets", "tiredmorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "tiredmorty").learnset.dribble = ["9L5"];
	this.modData("Learnsets", "tiredmorty").learnset.deadstare = ["9L9"];
	this.modData("Learnsets", "tiredmorty").learnset.salivate = ["9L13"];
	this.modData("Learnsets", "tiredmorty").learnset.drowse = ["9L17"];
	this.modData("Learnsets", "tiredmorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "tiredmorty").learnset.hibernate = ["9L25"];
	this.modData("Learnsets", "tiredmorty").learnset.nodoff = ["9L30"];

	// Sleepy Morty
	this.modData("Learnsets", "sleepymorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "sleepymorty").learnset.dribble = ["9L5"];
	this.modData("Learnsets", "sleepymorty").learnset.deadstare = ["9L9"];
	this.modData("Learnsets", "sleepymorty").learnset.salivate = ["9L13"];
	this.modData("Learnsets", "sleepymorty").learnset.drowse = ["9L17"];
	this.modData("Learnsets", "sleepymorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "sleepymorty").learnset.hibernate = ["9L25"];
	this.modData("Learnsets", "sleepymorty").learnset.nodoff = ["9L30"];
	this.modData("Learnsets", "sleepymorty").learnset.doze = ["9L34"];

	// Asleep Morty
	this.modData("Learnsets", "asleepmorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "asleepmorty").learnset.dribble = ["9L5"];
	this.modData("Learnsets", "asleepmorty").learnset.deadstare = ["9L9"];
	this.modData("Learnsets", "asleepmorty").learnset.salivate = ["9L13"];
	this.modData("Learnsets", "asleepmorty").learnset.drowse = ["9L17"];
	this.modData("Learnsets", "asleepmorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "asleepmorty").learnset.hibernate = ["9L25"];
	this.modData("Learnsets", "asleepmorty").learnset.nodoff = ["9L30"];
	this.modData("Learnsets", "asleepmorty").learnset.doze = ["9L34"];
	this.modData("Learnsets", "asleepmorty").learnset.snooze = ["9L39"];

	// Hot Morty
	this.modData("Learnsets", "hotmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "hotmorty").learnset.absorb = ["9L5"];
	this.modData("Learnsets", "hotmorty").learnset.burn = ["9L10"];
	this.modData("Learnsets", "hotmorty").learnset.torch = ["9L18"];
	this.modData("Learnsets", "hotmorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "hotmorty").learnset.redmist = ["9L26"];
	this.modData("Learnsets", "hotmorty").learnset.engulf = ["9L32"];
	this.modData("Learnsets", "hotmorty").learnset.fireball = ["9L36"];

	// Flaming Morty
	this.modData("Learnsets", "flamingmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "flamingmorty").learnset.absorb = ["9L5"];
	this.modData("Learnsets", "flamingmorty").learnset.burn = ["9L10"];
	this.modData("Learnsets", "flamingmorty").learnset.torch = ["9L18"];
	this.modData("Learnsets", "flamingmorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "flamingmorty").learnset.redmist = ["9L26"];
	this.modData("Learnsets", "flamingmorty").learnset.engulf = ["9L32"];
	this.modData("Learnsets", "flamingmorty").learnset.fireball = ["9L36"];
	this.modData("Learnsets", "flamingmorty").learnset.aura = ["9L42"];
	this.modData("Learnsets", "flamingmorty").learnset.supernova = ["9L45"];

	// Cold Morty
	this.modData("Learnsets", "coldmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "coldmorty").learnset.absorb = ["9L5"];
	this.modData("Learnsets", "coldmorty").learnset.icytouch = ["9L10"];
	this.modData("Learnsets", "coldmorty").learnset.vaporize = ["9L18"];
	this.modData("Learnsets", "coldmorty").learnset.harden = ["9L23"];
	this.modData("Learnsets", "coldmorty").learnset.shatter = ["9L26"];
	this.modData("Learnsets", "coldmorty").learnset.thaw = ["9L32"];
	this.modData("Learnsets", "coldmorty").learnset.brainfreeze = ["9L36"];

	// Frozen Morty
	this.modData("Learnsets", "frozenmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "frozenmorty").learnset.absorb = ["9L5"];
	this.modData("Learnsets", "frozenmorty").learnset.icytouch = ["9L10"];
	this.modData("Learnsets", "frozenmorty").learnset.vaporize = ["9L18"];
	this.modData("Learnsets", "frozenmorty").learnset.harden = ["9L23"];
	this.modData("Learnsets", "frozenmorty").learnset.shatter = ["9L26"];
	this.modData("Learnsets", "frozenmorty").learnset.thaw = ["9L32"];
	this.modData("Learnsets", "frozenmorty").learnset.brainfreeze = ["9L36"];
	this.modData("Learnsets", "frozenmorty").learnset.aura = ["9L42"];
	this.modData("Learnsets", "frozenmorty").learnset.letitgo = ["9L45"];

	// Flu Morty
	this.modData("Learnsets", "flumorty").learnset.sneeze = ["9L1"];
	this.modData("Learnsets", "flumorty").learnset.examine = ["9L5"];
	this.modData("Learnsets", "flumorty").learnset.cough = ["9L10"];
	this.modData("Learnsets", "flumorty").learnset.medicate = ["9L18"];
	this.modData("Learnsets", "flumorty").learnset.vomit = ["9L23"];
	this.modData("Learnsets", "flumorty").learnset.grossout = ["9L26"];
	this.modData("Learnsets", "flumorty").learnset.jab = ["9L32"];
	this.modData("Learnsets", "flumorty").learnset.bloodpressure = ["9L36"];

	// Mutant Flu Morty
	this.modData("Learnsets", "mutantflumorty").learnset.sneeze = ["9L1"];
	this.modData("Learnsets", "mutantflumorty").learnset.examine = ["9L5"];
	this.modData("Learnsets", "mutantflumorty").learnset.cough = ["9L10"];
	this.modData("Learnsets", "mutantflumorty").learnset.medicate = ["9L18"];
	this.modData("Learnsets", "mutantflumorty").learnset.vomit = ["9L23"];
	this.modData("Learnsets", "mutantflumorty").learnset.grossout = ["9L27"];
	this.modData("Learnsets", "mutantflumorty").learnset.jab = ["9L32"];
	this.modData("Learnsets", "mutantflumorty").learnset.bloodpressure = ["9L37"];
	this.modData("Learnsets", "mutantflumorty").learnset.vaccinate = ["9L42"];
	this.modData("Learnsets", "mutantflumorty").learnset.immunization = ["9L46"];

	// Diamond Eyes Morty
	this.modData("Learnsets", "diamondeyesmorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "diamondeyesmorty").learnset.distract = ["9L5"];
	this.modData("Learnsets", "diamondeyesmorty").learnset.encrust = ["9L10"];
	this.modData("Learnsets", "diamondeyesmorty").learnset.harden = ["9L18"];
	this.modData("Learnsets", "diamondeyesmorty").learnset.clarity = ["9L23"];
	this.modData("Learnsets", "diamondeyesmorty").learnset.cuttinggaze = ["9L26"];
	this.modData("Learnsets", "diamondeyesmorty").learnset.sparkle = ["9L31"];
	this.modData("Learnsets", "diamondeyesmorty").learnset.flutter = ["9L35"];

	// Cocoon Morty
	this.modData("Learnsets", "cocoonmorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "cocoonmorty").learnset.distract = ["9L5"];
	this.modData("Learnsets", "cocoonmorty").learnset.encrust = ["9L10"];
	this.modData("Learnsets", "cocoonmorty").learnset.harden = ["9L18"];
	this.modData("Learnsets", "cocoonmorty").learnset.clarity = ["9L23"];
	this.modData("Learnsets", "cocoonmorty").learnset.cuttinggaze = ["9L26"];
	this.modData("Learnsets", "cocoonmorty").learnset.sparkle = ["9L32"];
	this.modData("Learnsets", "cocoonmorty").learnset.flutter = ["9L36"];
	this.modData("Learnsets", "cocoonmorty").learnset.hibernate = ["9L42"];

	// Butterfly Morty
	this.modData("Learnsets", "butterflymorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "butterflymorty").learnset.distract = ["9L5"];
	this.modData("Learnsets", "butterflymorty").learnset.encrust = ["9L10"];
	this.modData("Learnsets", "butterflymorty").learnset.harden = ["9L18"];
	this.modData("Learnsets", "butterflymorty").learnset.clarity = ["9L23"];
	this.modData("Learnsets", "butterflymorty").learnset.cuttinggaze = ["9L26"];
	this.modData("Learnsets", "butterflymorty").learnset.sparkle = ["9L32"];
	this.modData("Learnsets", "butterflymorty").learnset.flutter = ["9L37"];
	this.modData("Learnsets", "butterflymorty").learnset.hibernate = ["9L43"];
	this.modData("Learnsets", "butterflymorty").learnset.wingblast = ["9L47"];

	// Punk Morty
	this.modData("Learnsets", "punkmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "punkmorty").learnset.sneer = ["9L5"];
	this.modData("Learnsets", "punkmorty").learnset.kick = ["9L10"];
	this.modData("Learnsets", "punkmorty").learnset.protect = ["9L18"];
	this.modData("Learnsets", "punkmorty").learnset.flair = ["9L23"];
	this.modData("Learnsets", "punkmorty").learnset.criticize = ["9L26"];
	this.modData("Learnsets", "punkmorty").learnset.crewcut = ["9L32"];
	this.modData("Learnsets", "punkmorty").learnset.mortify = ["9L35"];
	this.modData("Learnsets", "punkmorty").learnset.punked = ["9L40"];
	this.modData("Learnsets", "punkmorty").learnset.straightedge = ["9L44"];

	// Big Tongue Morty
	this.modData("Learnsets", "bigtonguemorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "bigtonguemorty").learnset.lick = ["9L5"];
	this.modData("Learnsets", "bigtonguemorty").learnset.soggykiss = ["9L10"];
	this.modData("Learnsets", "bigtonguemorty").learnset.salivate = ["9L18"];
	this.modData("Learnsets", "bigtonguemorty").learnset.caress = ["9L23"];
	this.modData("Learnsets", "bigtonguemorty").learnset.smooch = ["9L26"];
	this.modData("Learnsets", "bigtonguemorty").learnset.wrangle = ["9L32"];
	this.modData("Learnsets", "bigtonguemorty").learnset.suck = ["9L36"];
	this.modData("Learnsets", "bigtonguemorty").learnset.mouthoff = ["9L42"];
	this.modData("Learnsets", "bigtonguemorty").learnset.slobber = ["9L45"];

	// Pizza Morty
	this.modData("Learnsets", "pizzamorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "pizzamorty").learnset.dribble = ["9L1"];
	this.modData("Learnsets", "pizzamorty").learnset.melt = ["9L5"];
	this.modData("Learnsets", "pizzamorty").learnset.encrust = ["9L10"];
	this.modData("Learnsets", "pizzamorty").learnset.salivate = ["9L16"];
	this.modData("Learnsets", "pizzamorty").learnset.sliceanddice = ["9L21"];
	this.modData("Learnsets", "pizzamorty").learnset.defend = ["9L26"];
	this.modData("Learnsets", "pizzamorty").learnset.thaw = ["9L30"];

	// Mushroom Pizza Morty
	this.modData("Learnsets", "mushroompizzamorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "mushroompizzamorty").learnset.dribble = ["9L1"];
	this.modData("Learnsets", "mushroompizzamorty").learnset.melt = ["9L5"];
	this.modData("Learnsets", "mushroompizzamorty").learnset.encrust = ["9L11"];
	this.modData("Learnsets", "mushroompizzamorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "mushroompizzamorty").learnset.sliceanddice = ["9L22"];
	this.modData("Learnsets", "mushroompizzamorty").learnset.defend = ["9L26"];
	this.modData("Learnsets", "mushroompizzamorty").learnset.thaw = ["9L30"];
	this.modData("Learnsets", "mushroompizzamorty").learnset.mouthoff = ["9L34"];

	// Pepperoni Pizza Morty
	this.modData("Learnsets", "pepperonipizzamorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "pepperonipizzamorty").learnset.dribble = ["9L1"];
	this.modData("Learnsets", "pepperonipizzamorty").learnset.melt = ["9L5"];
	this.modData("Learnsets", "pepperonipizzamorty").learnset.encrust = ["9L12"];
	this.modData("Learnsets", "pepperonipizzamorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "pepperonipizzamorty").learnset.sliceanddice = ["9L22"];
	this.modData("Learnsets", "pepperonipizzamorty").learnset.defend = ["9L26"];
	this.modData("Learnsets", "pepperonipizzamorty").learnset.thaw = ["9L30"];
	this.modData("Learnsets", "pepperonipizzamorty").learnset.mouthoff = ["9L34"];
	this.modData("Learnsets", "pepperonipizzamorty").learnset.gooeycheese = ["9L40"];

	// Unicorn Chaser Morty
	this.modData("Learnsets", "unicornchasermorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "unicornchasermorty").learnset.glitterblast = ["9L1"];
	this.modData("Learnsets", "unicornchasermorty").learnset.kick = ["9L7"];
	this.modData("Learnsets", "unicornchasermorty").learnset.flair = ["9L12"];
	this.modData("Learnsets", "unicornchasermorty").learnset.lovebug = ["9L17"];
	this.modData("Learnsets", "unicornchasermorty").learnset.caress = ["9L22"];
	this.modData("Learnsets", "unicornchasermorty").learnset.spear = ["9L26"];
	this.modData("Learnsets", "unicornchasermorty").learnset.sparkle = ["9L32"];

	// Unicorn Morty
	this.modData("Learnsets", "unicornmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "unicornmorty").learnset.glitterblast = ["9L1"];
	this.modData("Learnsets", "unicornmorty").learnset.kick = ["9L7"];
	this.modData("Learnsets", "unicornmorty").learnset.flair = ["9L13"];
	this.modData("Learnsets", "unicornmorty").learnset.lovebug = ["9L17"];
	this.modData("Learnsets", "unicornmorty").learnset.caress = ["9L22"];
	this.modData("Learnsets", "unicornmorty").learnset.spear = ["9L27"];
	this.modData("Learnsets", "unicornmorty").learnset.sparkle = ["9L32"];
	this.modData("Learnsets", "unicornmorty").learnset.crush = ["9L35"];

	// Super Unicorn Morty
	this.modData("Learnsets", "superunicornmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "superunicornmorty").learnset.glitterblast = ["9L1"];
	this.modData("Learnsets", "superunicornmorty").learnset.kick = ["9L7"];
	this.modData("Learnsets", "superunicornmorty").learnset.flair = ["9L13"];
	this.modData("Learnsets", "superunicornmorty").learnset.lovebug = ["9L17"];
	this.modData("Learnsets", "superunicornmorty").learnset.caress = ["9L22"];
	this.modData("Learnsets", "superunicornmorty").learnset.spear = ["9L27"];
	this.modData("Learnsets", "superunicornmorty").learnset.sparkle = ["9L32"];
	this.modData("Learnsets", "superunicornmorty").learnset.crush = ["9L35"];
	this.modData("Learnsets", "superunicornmorty").learnset.straightedge = ["9L39"];

	// Moon Morty
	this.modData("Learnsets", "moonmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "moonmorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "moonmorty").learnset.slam = ["9L6"];
	this.modData("Learnsets", "moonmorty").learnset.gforce = ["9L12"];
	this.modData("Learnsets", "moonmorty").learnset.vaporize = ["9L17"];
	this.modData("Learnsets", "moonmorty").learnset.implode = ["9L22"];
	this.modData("Learnsets", "moonmorty").learnset.stargaze = ["9L24"];
	this.modData("Learnsets", "moonmorty").learnset.engulf = ["9L30"];

	// Sun Morty
	this.modData("Learnsets", "sunmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "sunmorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "sunmorty").learnset.slam = ["9L7"];
	this.modData("Learnsets", "sunmorty").learnset.gforce = ["9L12"];
	this.modData("Learnsets", "sunmorty").learnset.vaporize = ["9L17"];
	this.modData("Learnsets", "sunmorty").learnset.implode = ["9L22"];
	this.modData("Learnsets", "sunmorty").learnset.stargaze = ["9L24"];
	this.modData("Learnsets", "sunmorty").learnset.engulf = ["9L30"];
	this.modData("Learnsets", "sunmorty").learnset.sparkle = ["9L35"];

	// Black Hole Morty
	this.modData("Learnsets", "blackholemorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "blackholemorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "blackholemorty").learnset.slam = ["9L7"];
	this.modData("Learnsets", "blackholemorty").learnset.gforce = ["9L13"];
	this.modData("Learnsets", "blackholemorty").learnset.vaporize = ["9L17"];
	this.modData("Learnsets", "blackholemorty").learnset.implode = ["9L22"];
	this.modData("Learnsets", "blackholemorty").learnset.stargaze = ["9L24"];
	this.modData("Learnsets", "blackholemorty").learnset.engulf = ["9L30"];
	this.modData("Learnsets", "blackholemorty").learnset.sparkle = ["9L35"];
	this.modData("Learnsets", "blackholemorty").learnset.darkvoid = ["9L41"];

	// Morticia
	this.modData("Learnsets", "morticia").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "morticia").learnset.cry = ["9L6"];
	this.modData("Learnsets", "morticia").learnset.flail = ["9L8"];
	this.modData("Learnsets", "morticia").learnset.belch = ["9L10"];
	this.modData("Learnsets", "morticia").learnset.swing = ["9L14"];
	this.modData("Learnsets", "morticia").learnset.rush = ["9L19"];
	this.modData("Learnsets", "morticia").learnset.mortify = ["9L22"];
	this.modData("Learnsets", "morticia").learnset.fiercelunge = ["9L26"];
	this.modData("Learnsets", "morticia").learnset.staredown = ["9L30"];
	this.modData("Learnsets", "morticia").learnset.unleash = ["9L36"];

	// Single Snoozle Morty
	this.modData("Learnsets", "singlesnoozlemorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "singlesnoozlemorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "singlesnoozlemorty").learnset.cough = ["9L8"];
	this.modData("Learnsets", "singlesnoozlemorty").learnset.snotblast = ["9L13"];
	this.modData("Learnsets", "singlesnoozlemorty").learnset.snub = ["9L18"];
	this.modData("Learnsets", "singlesnoozlemorty").learnset.gooeydischarge = ["9L21"];
	this.modData("Learnsets", "singlesnoozlemorty").learnset.staticshock = ["9L25"];
	this.modData("Learnsets", "singlesnoozlemorty").learnset.engulf = ["9L30"];

	// Double Snoozle Morty
	this.modData("Learnsets", "doublesnoozlemorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "doublesnoozlemorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "doublesnoozlemorty").learnset.cough = ["9L8"];
	this.modData("Learnsets", "doublesnoozlemorty").learnset.snotblast = ["9L13"];
	this.modData("Learnsets", "doublesnoozlemorty").learnset.snub = ["9L18"];
	this.modData("Learnsets", "doublesnoozlemorty").learnset.gooeydischarge = ["9L22"];
	this.modData("Learnsets", "doublesnoozlemorty").learnset.staticshock = ["9L26"];
	this.modData("Learnsets", "doublesnoozlemorty").learnset.engulf = ["9L30"];
	this.modData("Learnsets", "doublesnoozlemorty").learnset.wrangle = ["9L33"];

	// Triple Snoozle Morty
	this.modData("Learnsets", "triplesnoozlemorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "triplesnoozlemorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "triplesnoozlemorty").learnset.cough = ["9L9"];
	this.modData("Learnsets", "triplesnoozlemorty").learnset.snotblast = ["9L14"];
	this.modData("Learnsets", "triplesnoozlemorty").learnset.snub = ["9L18"];
	this.modData("Learnsets", "triplesnoozlemorty").learnset.gooeydischarge = ["9L22"];
	this.modData("Learnsets", "triplesnoozlemorty").learnset.staticshock = ["9L26"];
	this.modData("Learnsets", "triplesnoozlemorty").learnset.engulf = ["9L30"];
	this.modData("Learnsets", "triplesnoozlemorty").learnset.wrangle = ["9L34"];
	this.modData("Learnsets", "triplesnoozlemorty").learnset.suck = ["9L38"];

	// Super Morty Fan Morty
	this.modData("Learnsets", "supermortyfanmorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "supermortyfanmorty").learnset.salivate = ["9L1"];
	this.modData("Learnsets", "supermortyfanmorty").learnset.soggykiss = ["9L10"];
	this.modData("Learnsets", "supermortyfanmorty").learnset.caress = ["9L18"];
	this.modData("Learnsets", "supermortyfanmorty").learnset.fanart = ["9L25"];
	this.modData("Learnsets", "supermortyfanmorty").learnset.selfie = ["9L27"];
	this.modData("Learnsets", "supermortyfanmorty").learnset.selfpromote = ["9L30"];
	this.modData("Learnsets", "supermortyfanmorty").learnset.loveyourself = ["9L35"];

	// Super Rick Fan Morty
	this.modData("Learnsets", "superrickfanmorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "superrickfanmorty").learnset.salivate = ["9L1"];
	this.modData("Learnsets", "superrickfanmorty").learnset.soggykiss = ["9L10"];
	this.modData("Learnsets", "superrickfanmorty").learnset.caress = ["9L18"];
	this.modData("Learnsets", "superrickfanmorty").learnset.stargaze = ["9L22"];
	this.modData("Learnsets", "superrickfanmorty").learnset.fanart = ["9L25"];
	this.modData("Learnsets", "superrickfanmorty").learnset.beam = ["9L27"];
	this.modData("Learnsets", "superrickfanmorty").learnset.defend = ["9L30"];
	this.modData("Learnsets", "superrickfanmorty").learnset.rickytikkitavi = ["9L37"];

	// Blob Morty
	this.modData("Learnsets", "blobmorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "blobmorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "blobmorty").learnset.negativeenergy = ["9L7"];
	this.modData("Learnsets", "blobmorty").learnset.soggykiss = ["9L12"];
	this.modData("Learnsets", "blobmorty").learnset.vaporize = ["9L17"];
	this.modData("Learnsets", "blobmorty").learnset.grossout = ["9L21"];
	this.modData("Learnsets", "blobmorty").learnset.vilespew = ["9L24"];
	this.modData("Learnsets", "blobmorty").learnset.aura = ["9L30"];

	// Jelly Morty
	this.modData("Learnsets", "jellymorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "jellymorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "jellymorty").learnset.negativeenergy = ["9L8"];
	this.modData("Learnsets", "jellymorty").learnset.soggykiss = ["9L12"];
	this.modData("Learnsets", "jellymorty").learnset.vaporize = ["9L17"];
	this.modData("Learnsets", "jellymorty").learnset.grossout = ["9L21"];
	this.modData("Learnsets", "jellymorty").learnset.vilespew = ["9L24"];
	this.modData("Learnsets", "jellymorty").learnset.aura = ["9L30"];
	this.modData("Learnsets", "jellymorty").learnset.poisonspit = ["9L35"];

	// Goo Morty
	this.modData("Learnsets", "goomorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "goomorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "goomorty").learnset.negativeenergy = ["9L8"];
	this.modData("Learnsets", "goomorty").learnset.soggykiss = ["9L13"];
	this.modData("Learnsets", "goomorty").learnset.vaporize = ["9L17"];
	this.modData("Learnsets", "goomorty").learnset.grossout = ["9L22"];
	this.modData("Learnsets", "goomorty").learnset.vilespew = ["9L24"];
	this.modData("Learnsets", "goomorty").learnset.aura = ["9L30"];
	this.modData("Learnsets", "goomorty").learnset.poisonspit = ["9L35"];
	this.modData("Learnsets", "goomorty").learnset.slobber = ["9L41"];

	// Infected Morty
	this.modData("Learnsets", "infectedmorty").learnset.probe = ["9L1"];
	this.modData("Learnsets", "infectedmorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "infectedmorty").learnset.energydrain = ["9L7"];
	this.modData("Learnsets", "infectedmorty").learnset.drool = ["9L13"];
	this.modData("Learnsets", "infectedmorty").learnset.mortify = ["9L17"];
	this.modData("Learnsets", "infectedmorty").learnset.mindrage = ["9L22"];
	this.modData("Learnsets", "infectedmorty").learnset.mindread = ["9L24"];
	this.modData("Learnsets", "infectedmorty").learnset.bloodsuck = ["9L31"];

	// Parasitic Morty
	this.modData("Learnsets", "parasiticmorty").learnset.probe = ["9L1"];
	this.modData("Learnsets", "parasiticmorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "parasiticmorty").learnset.energydrain = ["9L7"];
	this.modData("Learnsets", "parasiticmorty").learnset.drool = ["9L13"];
	this.modData("Learnsets", "parasiticmorty").learnset.mortify = ["9L17"];
	this.modData("Learnsets", "parasiticmorty").learnset.mindrage = ["9L22"];
	this.modData("Learnsets", "parasiticmorty").learnset.mindread = ["9L26"];
	this.modData("Learnsets", "parasiticmorty").learnset.bloodsuck = ["9L32"];
	this.modData("Learnsets", "parasiticmorty").learnset.wrangle = ["9L36"];

	// Host Morty
	this.modData("Learnsets", "hostmorty").learnset.probe = ["9L1"];
	this.modData("Learnsets", "hostmorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "hostmorty").learnset.energydrain = ["9L7"];
	this.modData("Learnsets", "hostmorty").learnset.drool = ["9L13"];
	this.modData("Learnsets", "hostmorty").learnset.mortify = ["9L17"];
	this.modData("Learnsets", "hostmorty").learnset.mindrage = ["9L22"];
	this.modData("Learnsets", "hostmorty").learnset.mindread = ["9L26"];
	this.modData("Learnsets", "hostmorty").learnset.bloodsuck = ["9L32"];
	this.modData("Learnsets", "hostmorty").learnset.wrangle = ["9L36"];
	this.modData("Learnsets", "hostmorty").learnset.mindmeld = ["9L42"];

	// Strawberry Morty
	this.modData("Learnsets", "strawberrymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "strawberrymorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "strawberrymorty").learnset.sprout = ["9L1"];
	this.modData("Learnsets", "strawberrymorty").learnset.flail = ["9L11"];
	this.modData("Learnsets", "strawberrymorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "strawberrymorty").learnset.swing = ["9L22"];
	this.modData("Learnsets", "strawberrymorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "strawberrymorty").learnset.redmist = ["9L30"];

	// Orange Morty
	this.modData("Learnsets", "orangemorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "orangemorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "orangemorty").learnset.sprout = ["9L1"];
	this.modData("Learnsets", "orangemorty").learnset.flail = ["9L12"];
	this.modData("Learnsets", "orangemorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "orangemorty").learnset.swing = ["9L22"];
	this.modData("Learnsets", "orangemorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "orangemorty").learnset.orangeshower = ["9L30"];
	this.modData("Learnsets", "orangemorty").learnset.dinnertime = ["9L35"];

	// Banana Morty
	this.modData("Learnsets", "bananamorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "bananamorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "bananamorty").learnset.sprout = ["9L1"];
	this.modData("Learnsets", "bananamorty").learnset.flail = ["9L12"];
	this.modData("Learnsets", "bananamorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "bananamorty").learnset.swing = ["9L22"];
	this.modData("Learnsets", "bananamorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "bananamorty").learnset.lasso = ["9L30"];
	this.modData("Learnsets", "bananamorty").learnset.dinnertime = ["9L35"];
	this.modData("Learnsets", "bananamorty").learnset.rootdown = ["9L41"];

	// Stoned Morty
	this.modData("Learnsets", "stonedmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "stonedmorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "stonedmorty").learnset.provoke = ["9L7"];
	this.modData("Learnsets", "stonedmorty").learnset.stonefists = ["9L10"];
	this.modData("Learnsets", "stonedmorty").learnset.harden = ["9L15"];
	this.modData("Learnsets", "stonedmorty").learnset.jab = ["9L20"];
	this.modData("Learnsets", "stonedmorty").learnset.protect = ["9L24"];
	this.modData("Learnsets", "stonedmorty").learnset.crush = ["9L29"];

	// Petrified Morty
	this.modData("Learnsets", "petrifiedmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "petrifiedmorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "petrifiedmorty").learnset.provoke = ["9L7"];
	this.modData("Learnsets", "petrifiedmorty").learnset.stonefists = ["9L11"];
	this.modData("Learnsets", "petrifiedmorty").learnset.harden = ["9L16"];
	this.modData("Learnsets", "petrifiedmorty").learnset.jab = ["9L20"];
	this.modData("Learnsets", "petrifiedmorty").learnset.protect = ["9L24"];
	this.modData("Learnsets", "petrifiedmorty").learnset.crush = ["9L29"];
	this.modData("Learnsets", "petrifiedmorty").learnset.retainstrength = ["9L34"];

	// Boulder Morty
	this.modData("Learnsets", "bouldermorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "bouldermorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "bouldermorty").learnset.provoke = ["9L7"];
	this.modData("Learnsets", "bouldermorty").learnset.stonefists = ["9L11"];
	this.modData("Learnsets", "bouldermorty").learnset.harden = ["9L16"];
	this.modData("Learnsets", "bouldermorty").learnset.jab = ["9L20"];
	this.modData("Learnsets", "bouldermorty").learnset.protect = ["9L24"];
	this.modData("Learnsets", "bouldermorty").learnset.crush = ["9L29"];
	this.modData("Learnsets", "bouldermorty").learnset.retainstrength = ["9L34"];
	this.modData("Learnsets", "bouldermorty").learnset.tombstone = ["9L41"];

	// Reptile Morty
	this.modData("Learnsets", "reptilemorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "reptilemorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "reptilemorty").learnset.dig = ["9L6"];
	this.modData("Learnsets", "reptilemorty").learnset.fossilise = ["9L12"];
	this.modData("Learnsets", "reptilemorty").learnset.salivate = ["9L16"];
	this.modData("Learnsets", "reptilemorty").learnset.scratchingpost = ["9L21"];
	this.modData("Learnsets", "reptilemorty").learnset.grossout = ["9L25"];
	this.modData("Learnsets", "reptilemorty").learnset.scratchandsniff = ["9L30"];

	// Raptor Morty
	this.modData("Learnsets", "raptormorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "raptormorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "raptormorty").learnset.dig = ["9L7"];
	this.modData("Learnsets", "raptormorty").learnset.fossilise = ["9L13"];
	this.modData("Learnsets", "raptormorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "raptormorty").learnset.scratchingpost = ["9L22"];
	this.modData("Learnsets", "raptormorty").learnset.grossout = ["9L24"];
	this.modData("Learnsets", "raptormorty").learnset.scratchandsniff = ["9L30"];
	this.modData("Learnsets", "raptormorty").learnset.prey = ["9L35"];

	// Mortysaurus
	this.modData("Learnsets", "mortysaurus").learnset.condition = ["9L1"];
	this.modData("Learnsets", "mortysaurus").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "mortysaurus").learnset.dig = ["9L7"];
	this.modData("Learnsets", "mortysaurus").learnset.fossilise = ["9L13"];
	this.modData("Learnsets", "mortysaurus").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "mortysaurus").learnset.scratchingpost = ["9L21"];
	this.modData("Learnsets", "mortysaurus").learnset.grossout = ["9L26"];
	this.modData("Learnsets", "mortysaurus").learnset.scratchandsniff = ["9L31"];
	this.modData("Learnsets", "mortysaurus").learnset.prey = ["9L35"];
	this.modData("Learnsets", "mortysaurus").learnset.boneextract = ["9L41"];

	// Dog Bite Morty
	this.modData("Learnsets", "dogbitemorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "dogbitemorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "dogbitemorty").learnset.nibble = ["9L7"];
	this.modData("Learnsets", "dogbitemorty").learnset.wettongue = ["9L13"];
	this.modData("Learnsets", "dogbitemorty").learnset.puffytail = ["9L17"];
	this.modData("Learnsets", "dogbitemorty").learnset.drowse = ["9L22"];
	this.modData("Learnsets", "dogbitemorty").learnset.snub = ["9L24"];
	this.modData("Learnsets", "dogbitemorty").learnset.clawsout = ["9L29"];

	// Dog Morty
	this.modData("Learnsets", "dogmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "dogmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "dogmorty").learnset.nibble = ["9L7"];
	this.modData("Learnsets", "dogmorty").learnset.wettongue = ["9L13"];
	this.modData("Learnsets", "dogmorty").learnset.puffytail = ["9L17"];
	this.modData("Learnsets", "dogmorty").learnset.drowse = ["9L22"];
	this.modData("Learnsets", "dogmorty").learnset.snub = ["9L24"];
	this.modData("Learnsets", "dogmorty").learnset.clawsout = ["9L30"];
	this.modData("Learnsets", "dogmorty").learnset.defend = ["9L33"];

	// Werewolf Morty
	this.modData("Learnsets", "werewolfmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "werewolfmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "werewolfmorty").learnset.nibble = ["9L7"];
	this.modData("Learnsets", "werewolfmorty").learnset.wettongue = ["9L13"];
	this.modData("Learnsets", "werewolfmorty").learnset.puffytail = ["9L18"];
	this.modData("Learnsets", "werewolfmorty").learnset.drowse = ["9L23"];
	this.modData("Learnsets", "werewolfmorty").learnset.snub = ["9L27"];
	this.modData("Learnsets", "werewolfmorty").learnset.clawsout = ["9L30"];
	this.modData("Learnsets", "werewolfmorty").learnset.defend = ["9L33"];
	this.modData("Learnsets", "werewolfmorty").learnset.regenerate = ["9L40"];

	// Boot Camp Morty
	this.modData("Learnsets", "bootcampmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "bootcampmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "bootcampmorty").learnset.suitandboot = ["9L7"];
	this.modData("Learnsets", "bootcampmorty").learnset.attention = ["9L13"];
	this.modData("Learnsets", "bootcampmorty").learnset.blitz = ["9L17"];
	this.modData("Learnsets", "bootcampmorty").learnset.harden = ["9L22"];
	this.modData("Learnsets", "bootcampmorty").learnset.crewcut = ["9L25"];
	this.modData("Learnsets", "bootcampmorty").learnset.bloodpressure = ["9L30"];

	// Shell Shocked Morty
	this.modData("Learnsets", "shellshockedmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "shellshockedmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "shellshockedmorty").learnset.suitandboot = ["9L7"];
	this.modData("Learnsets", "shellshockedmorty").learnset.attention = ["9L13"];
	this.modData("Learnsets", "shellshockedmorty").learnset.blitz = ["9L17"];
	this.modData("Learnsets", "shellshockedmorty").learnset.harden = ["9L22"];
	this.modData("Learnsets", "shellshockedmorty").learnset.crewcut = ["9L25"];
	this.modData("Learnsets", "shellshockedmorty").learnset.bloodpressure = ["9L30"];
	this.modData("Learnsets", "shellshockedmorty").learnset.rush = ["9L35"];

	// Renegade Morty
	this.modData("Learnsets", "renegademorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "renegademorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "renegademorty").learnset.suitandboot = ["9L7"];
	this.modData("Learnsets", "renegademorty").learnset.attention = ["9L13"];
	this.modData("Learnsets", "renegademorty").learnset.blitz = ["9L17"];
	this.modData("Learnsets", "renegademorty").learnset.harden = ["9L22"];
	this.modData("Learnsets", "renegademorty").learnset.crewcut = ["9L26"];
	this.modData("Learnsets", "renegademorty").learnset.bloodpressure = ["9L30"];
	this.modData("Learnsets", "renegademorty").learnset.rush = ["9L35"];
	this.modData("Learnsets", "renegademorty").learnset.fiercelunge = ["9L38"];

	// Headism Morty
	this.modData("Learnsets", "headismmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "headismmorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "headismmorty").learnset.preach = ["9L8"];
	this.modData("Learnsets", "headismmorty").learnset.reminisce = ["9L10"];
	this.modData("Learnsets", "headismmorty").learnset.certitude = ["9L14"];
	this.modData("Learnsets", "headismmorty").learnset.stargaze = ["9L19"];
	this.modData("Learnsets", "headismmorty").learnset.ascend = ["9L26"];
	this.modData("Learnsets", "headismmorty").learnset.denial = ["9L32"];
	this.modData("Learnsets", "headismmorty").learnset.recitation = ["9L38"];

	// Turbulent Juice Morty
	this.modData("Learnsets", "turbulentjuicemorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "turbulentjuicemorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "turbulentjuicemorty").learnset.curl = ["9L8"];
	this.modData("Learnsets", "turbulentjuicemorty").learnset.salivate = ["9L10"];
	this.modData("Learnsets", "turbulentjuicemorty").learnset.crush = ["9L14"];
	this.modData("Learnsets", "turbulentjuicemorty").learnset.exfoliate = ["9L19"];
	this.modData("Learnsets", "turbulentjuicemorty").learnset.pout = ["9L26"];
	this.modData("Learnsets", "turbulentjuicemorty").learnset.selfie = ["9L32"];
	this.modData("Learnsets", "turbulentjuicemorty").learnset.juice = ["9L38"];

	// Jerry Fan Morty
	this.modData("Learnsets", "jerryfanmorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "jerryfanmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "jerryfanmorty").learnset.chastise = ["9L8"];
	this.modData("Learnsets", "jerryfanmorty").learnset.flair = ["9L10"];
	this.modData("Learnsets", "jerryfanmorty").learnset.fortify = ["9L14"];
	this.modData("Learnsets", "jerryfanmorty").learnset.shatter = ["9L19"];
	this.modData("Learnsets", "jerryfanmorty").learnset.engulf = ["9L26"];
	this.modData("Learnsets", "jerryfanmorty").learnset.defend = ["9L32"];
	this.modData("Learnsets", "jerryfanmorty").learnset.signautograph = ["9L38"];

	// Exoskeleton Morty
	this.modData("Learnsets", "exoskeletonmorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "exoskeletonmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "exoskeletonmorty").learnset.slam = ["9L8"];
	this.modData("Learnsets", "exoskeletonmorty").learnset.strengthen = ["9L10"];
	this.modData("Learnsets", "exoskeletonmorty").learnset.vaporize = ["9L14"];
	this.modData("Learnsets", "exoskeletonmorty").learnset.wrangle = ["9L19"];
	this.modData("Learnsets", "exoskeletonmorty").learnset.swing = ["9L26"];
	this.modData("Learnsets", "exoskeletonmorty").learnset.grab = ["9L32"];
	this.modData("Learnsets", "exoskeletonmorty").learnset.claw = ["9L38"];

	// Sexy Devil Morty
	this.modData("Learnsets", "sexydevilmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "sexydevilmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "sexydevilmorty").learnset.curl = ["9L8"];
	this.modData("Learnsets", "sexydevilmorty").learnset.snub = ["9L10"];
	this.modData("Learnsets", "sexydevilmorty").learnset.clarity = ["9L14"];
	this.modData("Learnsets", "sexydevilmorty").learnset.engulf = ["9L19"];
	this.modData("Learnsets", "sexydevilmorty").learnset.sixsixsix = ["9L26"];
	this.modData("Learnsets", "sexydevilmorty").learnset.bloodpressure = ["9L32"];
	this.modData("Learnsets", "sexydevilmorty").learnset.inferno = ["9L38"];

	// Summer Morty
	this.modData("Learnsets", "summermorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "summermorty").learnset.repress = ["9L1"];
	this.modData("Learnsets", "summermorty").learnset.mope = ["9L7"];
	this.modData("Learnsets", "summermorty").learnset.haunt = ["9L12"];
	this.modData("Learnsets", "summermorty").learnset.flowerchild = ["9L16"];
	this.modData("Learnsets", "summermorty").learnset.erase = ["9L20"];
	this.modData("Learnsets", "summermorty").learnset.negativeenergy = ["9L25"];
	this.modData("Learnsets", "summermorty").learnset.moodkill = ["9L30"];

	// Jerry Morty
	this.modData("Learnsets", "jerrymorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "jerrymorty").learnset.repress = ["9L1"];
	this.modData("Learnsets", "jerrymorty").learnset.mope = ["9L7"];
	this.modData("Learnsets", "jerrymorty").learnset.haunt = ["9L12"];
	this.modData("Learnsets", "jerrymorty").learnset.reminisce = ["9L16"];
	this.modData("Learnsets", "jerrymorty").learnset.denial = ["9L20"];
	this.modData("Learnsets", "jerrymorty").learnset.outpour = ["9L25"];
	this.modData("Learnsets", "jerrymorty").learnset.moodkill = ["9L30"];
	this.modData("Learnsets", "jerrymorty").learnset.grieve = ["9L36"];

	// Beth Morty
	this.modData("Learnsets", "bethmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "bethmorty").learnset.repress = ["9L1"];
	this.modData("Learnsets", "bethmorty").learnset.mope = ["9L7"];
	this.modData("Learnsets", "bethmorty").learnset.haunt = ["9L12"];
	this.modData("Learnsets", "bethmorty").learnset.reminisce = ["9L16"];
	this.modData("Learnsets", "bethmorty").learnset.denial = ["9L20"];
	this.modData("Learnsets", "bethmorty").learnset.outpour = ["9L25"];
	this.modData("Learnsets", "bethmorty").learnset.moodkill = ["9L30"];
	this.modData("Learnsets", "bethmorty").learnset.soulsearch = ["9L36"];

	// Rick Morty
	this.modData("Learnsets", "rickmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "rickmorty").learnset.repress = ["9L1"];
	this.modData("Learnsets", "rickmorty").learnset.mope = ["9L7"];
	this.modData("Learnsets", "rickmorty").learnset.haunt = ["9L12"];
	this.modData("Learnsets", "rickmorty").learnset.reminisce = ["9L16"];
	this.modData("Learnsets", "rickmorty").learnset.harden = ["9L20"];
	this.modData("Learnsets", "rickmorty").learnset.belch = ["9L25"];
	this.modData("Learnsets", "rickmorty").learnset.moodkill = ["9L30"];
	this.modData("Learnsets", "rickmorty").learnset.grieve = ["9L36"];
	this.modData("Learnsets", "rickmorty").learnset.soulsearch = ["9L40"];

	// Cabin Boy Morty
	this.modData("Learnsets", "cabinboymorty").learnset.legsweep = ["9L1"];
	this.modData("Learnsets", "cabinboymorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "cabinboymorty").learnset.sing = ["9L7"];
	this.modData("Learnsets", "cabinboymorty").learnset.probe = ["9L12"];
	this.modData("Learnsets", "cabinboymorty").learnset.grossout = ["9L16"];
	this.modData("Learnsets", "cabinboymorty").learnset.cuttinggaze = ["9L19"];
	this.modData("Learnsets", "cabinboymorty").learnset.heavedown = ["9L22"];
	this.modData("Learnsets", "cabinboymorty").learnset.hornswoggle = ["9L27"];

	// Swashbuckle Morty
	this.modData("Learnsets", "swashbucklemorty").learnset.legsweep = ["9L1"];
	this.modData("Learnsets", "swashbucklemorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "swashbucklemorty").learnset.sing = ["9L7"];
	this.modData("Learnsets", "swashbucklemorty").learnset.probe = ["9L12"];
	this.modData("Learnsets", "swashbucklemorty").learnset.grossout = ["9L16"];
	this.modData("Learnsets", "swashbucklemorty").learnset.cuttinggaze = ["9L19"];
	this.modData("Learnsets", "swashbucklemorty").learnset.heavedown = ["9L22"];
	this.modData("Learnsets", "swashbucklemorty").learnset.hornswoggle = ["9L27"];
	this.modData("Learnsets", "swashbucklemorty").learnset.scuttle = ["9L38"];

	// Cap'n Morty
	this.modData("Learnsets", "capnmorty").learnset.legsweep = ["9L1"];
	this.modData("Learnsets", "capnmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "capnmorty").learnset.sing = ["9L7"];
	this.modData("Learnsets", "capnmorty").learnset.probe = ["9L12"];
	this.modData("Learnsets", "capnmorty").learnset.grossout = ["9L16"];
	this.modData("Learnsets", "capnmorty").learnset.cuttinggaze = ["9L19"];
	this.modData("Learnsets", "capnmorty").learnset.heavedown = ["9L22"];
	this.modData("Learnsets", "capnmorty").learnset.hornswoggle = ["9L27"];
	this.modData("Learnsets", "capnmorty").learnset.scuttle = ["9L38"];
	this.modData("Learnsets", "capnmorty").learnset.piracy = ["9L38"];

	// Miami Morty
	this.modData("Learnsets", "miamimorty").learnset.flair = ["9L1"];
	this.modData("Learnsets", "miamimorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "miamimorty").learnset.party = ["9L12"];
	this.modData("Learnsets", "miamimorty").learnset.lovebug = ["9L18"];
	this.modData("Learnsets", "miamimorty").learnset.pout = ["9L14"];
	this.modData("Learnsets", "miamimorty").learnset.newwave = ["9L23"];
	this.modData("Learnsets", "miamimorty").learnset.loveyourself = ["9L30"];
	this.modData("Learnsets", "miamimorty").learnset.glitterblast = ["9L37"];
	this.modData("Learnsets", "miamimorty").learnset.juice = ["9L44"];

	// New Blood Morty
	this.modData("Learnsets", "newbloodmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "newbloodmorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "newbloodmorty").learnset.suck = ["9L8"];
	this.modData("Learnsets", "newbloodmorty").learnset.sparkle = ["9L10"];
	this.modData("Learnsets", "newbloodmorty").learnset.biokinesis = ["9L14"];
	this.modData("Learnsets", "newbloodmorty").learnset.hypnotize = ["9L19"];
	this.modData("Learnsets", "newbloodmorty").learnset.mindmeld = ["9L26"];
	this.modData("Learnsets", "newbloodmorty").learnset.bloodsuck = ["9L32"];

	// Count Morty
	this.modData("Learnsets", "countmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "countmorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "countmorty").learnset.suck = ["9L8"];
	this.modData("Learnsets", "countmorty").learnset.sparkle = ["9L10"];
	this.modData("Learnsets", "countmorty").learnset.biokinesis = ["9L14"];
	this.modData("Learnsets", "countmorty").learnset.hypnotize = ["9L19"];
	this.modData("Learnsets", "countmorty").learnset.mindmeld = ["9L26"];
	this.modData("Learnsets", "countmorty").learnset.bloodsuck = ["9L32"];
	this.modData("Learnsets", "countmorty").learnset.grieve = ["9L38"];

	// Old One Morty
	this.modData("Learnsets", "oldonemorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "oldonemorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "oldonemorty").learnset.suck = ["9L8"];
	this.modData("Learnsets", "oldonemorty").learnset.sparkle = ["9L10"];
	this.modData("Learnsets", "oldonemorty").learnset.biokinesis = ["9L14"];
	this.modData("Learnsets", "oldonemorty").learnset.hypnotize = ["9L19"];
	this.modData("Learnsets", "oldonemorty").learnset.mindmeld = ["9L26"];
	this.modData("Learnsets", "oldonemorty").learnset.bloodsuck = ["9L32"];
	this.modData("Learnsets", "oldonemorty").learnset.grieve = ["9L38"];
	this.modData("Learnsets", "oldonemorty").learnset.aerokinesis = ["9L41"];

	// Denim Shorts Morty
	this.modData("Learnsets", "denimshortsmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "denimshortsmorty").learnset.crease = ["9L1"];
	this.modData("Learnsets", "denimshortsmorty").learnset.breakin = ["9L7"];
	this.modData("Learnsets", "denimshortsmorty").learnset.protect = ["9L9"];
	this.modData("Learnsets", "denimshortsmorty").learnset.machinewash = ["9L13"];
	this.modData("Learnsets", "denimshortsmorty").learnset.weardown = ["9L16"];
	this.modData("Learnsets", "denimshortsmorty").learnset.ironout = ["9L22"];
	this.modData("Learnsets", "denimshortsmorty").learnset.snub = ["9L30"];

	// Double Denim Morty
	this.modData("Learnsets", "doubledenimmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "doubledenimmorty").learnset.crease = ["9L1"];
	this.modData("Learnsets", "doubledenimmorty").learnset.breakin = ["9L7"];
	this.modData("Learnsets", "doubledenimmorty").learnset.protect = ["9L9"];
	this.modData("Learnsets", "doubledenimmorty").learnset.machinewash = ["9L13"];
	this.modData("Learnsets", "doubledenimmorty").learnset.weardown = ["9L16"];
	this.modData("Learnsets", "doubledenimmorty").learnset.ironout = ["9L22"];
	this.modData("Learnsets", "doubledenimmorty").learnset.snub = ["9L30"];
	this.modData("Learnsets", "doubledenimmorty").learnset.stonewash = ["9L33"];

	// Triple Denim Morty
	this.modData("Learnsets", "tripledenimmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "tripledenimmorty").learnset.crease = ["9L1"];
	this.modData("Learnsets", "tripledenimmorty").learnset.breakin = ["9L7"];
	this.modData("Learnsets", "tripledenimmorty").learnset.protect = ["9L9"];
	this.modData("Learnsets", "tripledenimmorty").learnset.machinewash = ["9L13"];
	this.modData("Learnsets", "tripledenimmorty").learnset.weardown = ["9L16"];
	this.modData("Learnsets", "tripledenimmorty").learnset.ironout = ["9L22"];
	this.modData("Learnsets", "tripledenimmorty").learnset.snub = ["9L30"];
	this.modData("Learnsets", "tripledenimmorty").learnset.stonewash = ["9L33"];
	this.modData("Learnsets", "tripledenimmorty").learnset.tateochi = ["9L38"];

	// Cup Morty
	this.modData("Learnsets", "cupmorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "cupmorty").learnset.soggykiss = ["9L1"];
	this.modData("Learnsets", "cupmorty").learnset.repress = ["9L7"];
	this.modData("Learnsets", "cupmorty").learnset.gooeydischarge = ["9L9"];
	this.modData("Learnsets", "cupmorty").learnset.moisten = ["9L13"];
	this.modData("Learnsets", "cupmorty").learnset.salivate = ["9L16"];
	this.modData("Learnsets", "cupmorty").learnset.prey = ["9L22"];
	this.modData("Learnsets", "cupmorty").learnset.smooch = ["9L30"];
	this.modData("Learnsets", "cupmorty").learnset.grossout = ["9L33"];
	this.modData("Learnsets", "cupmorty").learnset.vilespew = ["9L38"];

	// Fawn Morty
	this.modData("Learnsets", "fawnmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "fawnmorty").learnset.mope = ["9L1"];
	this.modData("Learnsets", "fawnmorty").learnset.cry = ["9L7"];
	this.modData("Learnsets", "fawnmorty").learnset.kick = ["9L9"];
	this.modData("Learnsets", "fawnmorty").learnset.flowerchild = ["9L13"];
	this.modData("Learnsets", "fawnmorty").learnset.blink = ["9L16"];
	this.modData("Learnsets", "fawnmorty").learnset.darkvoid = ["9L22"];
	this.modData("Learnsets", "fawnmorty").learnset.denial = ["9L30"];
	this.modData("Learnsets", "fawnmorty").learnset.grieve = ["9L38"];
	this.modData("Learnsets", "fawnmorty").learnset.soulsearch = ["9L41"];

	// Seedling Morty
	this.modData("Learnsets", "seedlingmorty").learnset.dig = ["9L1"];
	this.modData("Learnsets", "seedlingmorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "seedlingmorty").learnset.cellsplitter = ["9L7"];
	this.modData("Learnsets", "seedlingmorty").learnset.flowerchild = ["9L9"];
	this.modData("Learnsets", "seedlingmorty").learnset.gooeydischarge = ["9L16"];
	this.modData("Learnsets", "seedlingmorty").learnset.dinnertime = ["9L22"];
	this.modData("Learnsets", "seedlingmorty").learnset.hypnotize = ["9L30"];
	this.modData("Learnsets", "seedlingmorty").learnset.rootdown = ["9L35"];

	// Morty of the Valley
	this.modData("Learnsets", "mortyofthevalley").learnset.dig = ["9L1"];
	this.modData("Learnsets", "mortyofthevalley").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "mortyofthevalley").learnset.cellsplitter = ["9L7"];
	this.modData("Learnsets", "mortyofthevalley").learnset.flowerchild = ["9L9"];
	this.modData("Learnsets", "mortyofthevalley").learnset.gooeydischarge = ["9L16"];
	this.modData("Learnsets", "mortyofthevalley").learnset.dinnertime = ["9L22"];
	this.modData("Learnsets", "mortyofthevalley").learnset.hypnotize = ["9L30"];
	this.modData("Learnsets", "mortyofthevalley").learnset.rootdown = ["9L35"];
	this.modData("Learnsets", "mortyofthevalley").learnset.sprout = ["9L39"];

	// Mortydrangea
	this.modData("Learnsets", "mortydrangea").learnset.dig = ["9L1"];
	this.modData("Learnsets", "mortydrangea").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "mortydrangea").learnset.cellsplitter = ["9L7"];
	this.modData("Learnsets", "mortydrangea").learnset.flowerchild = ["9L9"];
	this.modData("Learnsets", "mortydrangea").learnset.gooeydischarge = ["9L16"];
	this.modData("Learnsets", "mortydrangea").learnset.dinnertime = ["9L22"];
	this.modData("Learnsets", "mortydrangea").learnset.hypnotize = ["9L30"];
	this.modData("Learnsets", "mortydrangea").learnset.rootdown = ["9L35"];
	this.modData("Learnsets", "mortydrangea").learnset.sprout = ["9L39"];
	this.modData("Learnsets", "mortydrangea").learnset.poisonspit = ["9L41"];

	// Rookie Morty
	this.modData("Learnsets", "rookiemorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "rookiemorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "rookiemorty").learnset.blindswing = ["9L5"];
	this.modData("Learnsets", "rookiemorty").learnset.staredown = ["9L8"];
	this.modData("Learnsets", "rookiemorty").learnset.bloodpressure = ["9L14"];
	this.modData("Learnsets", "rookiemorty").learnset.nail = ["9L21"];
	this.modData("Learnsets", "rookiemorty").learnset.extort = ["9L31"];
	this.modData("Learnsets", "rookiemorty").learnset.nodoff = ["9L35"];

	// Detective Morty
	this.modData("Learnsets", "detectivemorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "detectivemorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "detectivemorty").learnset.blindswing = ["9L5"];
	this.modData("Learnsets", "detectivemorty").learnset.staredown = ["9L8"];
	this.modData("Learnsets", "detectivemorty").learnset.bloodpressure = ["9L14"];
	this.modData("Learnsets", "detectivemorty").learnset.nail = ["9L21"];
	this.modData("Learnsets", "detectivemorty").learnset.extort = ["9L31"];
	this.modData("Learnsets", "detectivemorty").learnset.nodoff = ["9L35"];
	this.modData("Learnsets", "detectivemorty").learnset.humiliate = ["9L39"];

	// Hardboiled Morty
	this.modData("Learnsets", "hardboiledmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "hardboiledmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "hardboiledmorty").learnset.blindswing = ["9L5"];
	this.modData("Learnsets", "hardboiledmorty").learnset.staredown = ["9L8"];
	this.modData("Learnsets", "hardboiledmorty").learnset.bloodpressure = ["9L14"];
	this.modData("Learnsets", "hardboiledmorty").learnset.nail = ["9L21"];
	this.modData("Learnsets", "hardboiledmorty").learnset.extort = ["9L31"];
	this.modData("Learnsets", "hardboiledmorty").learnset.nodoff = ["9L35"];
	this.modData("Learnsets", "hardboiledmorty").learnset.humiliate = ["9L39"];
	this.modData("Learnsets", "hardboiledmorty").learnset.attention = ["9L41"];

	// Poorly Cloned Morty
	this.modData("Learnsets", "poorlyclonedmorty").learnset.cough = ["9L1"];
	this.modData("Learnsets", "poorlyclonedmorty").learnset.negativeenergy = ["9L1"];
	this.modData("Learnsets", "poorlyclonedmorty").learnset.stitch = ["9L5"];
	this.modData("Learnsets", "poorlyclonedmorty").learnset.snub = ["9L8"];
	this.modData("Learnsets", "poorlyclonedmorty").learnset.nodoff = ["9L14"];
	this.modData("Learnsets", "poorlyclonedmorty").learnset.salivate = ["9L21"];
	this.modData("Learnsets", "poorlyclonedmorty").learnset.boneextract = ["9L31"];
	this.modData("Learnsets", "poorlyclonedmorty").learnset.denial = ["9L35"];
	this.modData("Learnsets", "poorlyclonedmorty").learnset.vilespew = ["9L39"];
	this.modData("Learnsets", "poorlyclonedmorty").learnset.energydrain = ["9L41"];

	// Kitchen Boy Morty
	this.modData("Learnsets", "kitchenboymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "kitchenboymorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "kitchenboymorty").learnset.nibble = ["9L5"];
	this.modData("Learnsets", "kitchenboymorty").learnset.lick = ["9L8"];
	this.modData("Learnsets", "kitchenboymorty").learnset.flair = ["9L14"];
	this.modData("Learnsets", "kitchenboymorty").learnset.salivate = ["9L21"];
	this.modData("Learnsets", "kitchenboymorty").learnset.dinnertime = ["9L31"];
	this.modData("Learnsets", "kitchenboymorty").learnset.mouthoff = ["9L35"];

	// Pastry Chef Morty
	this.modData("Learnsets", "pastrychefmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "pastrychefmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "pastrychefmorty").learnset.nibble = ["9L5"];
	this.modData("Learnsets", "pastrychefmorty").learnset.lick = ["9L8"];
	this.modData("Learnsets", "pastrychefmorty").learnset.flair = ["9L14"];
	this.modData("Learnsets", "pastrychefmorty").learnset.salivate = ["9L21"];
	this.modData("Learnsets", "pastrychefmorty").learnset.dinnertime = ["9L31"];
	this.modData("Learnsets", "pastrychefmorty").learnset.mouthoff = ["9L35"];
	this.modData("Learnsets", "pastrychefmorty").learnset.sliceanddice = ["9L39"];

	// Head Chef Morty
	this.modData("Learnsets", "headchefmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "headchefmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "headchefmorty").learnset.nibble = ["9L5"];
	this.modData("Learnsets", "headchefmorty").learnset.lick = ["9L8"];
	this.modData("Learnsets", "headchefmorty").learnset.flair = ["9L14"];
	this.modData("Learnsets", "headchefmorty").learnset.salivate = ["9L21"];
	this.modData("Learnsets", "headchefmorty").learnset.dinnertime = ["9L31"];
	this.modData("Learnsets", "headchefmorty").learnset.mouthoff = ["9L35"];
	this.modData("Learnsets", "headchefmorty").learnset.sliceanddice = ["9L39"];
	this.modData("Learnsets", "headchefmorty").learnset.gooeycheese = ["9L41"];

	// Skin Suit Morty
	this.modData("Learnsets", "skinsuitmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "skinsuitmorty").learnset.medicate = ["9L1"];
	this.modData("Learnsets", "skinsuitmorty").learnset.poke = ["9L5"];
	this.modData("Learnsets", "skinsuitmorty").learnset.suitandboot = ["9L10"];
	this.modData("Learnsets", "skinsuitmorty").learnset.selfpromote = ["9L15"];
	this.modData("Learnsets", "skinsuitmorty").learnset.flutter = ["9L20"];
	this.modData("Learnsets", "skinsuitmorty").learnset.aura = ["9L25"];
	this.modData("Learnsets", "skinsuitmorty").learnset.energydrain = ["9L30"];

	// Motion Capture Morty
	this.modData("Learnsets", "motioncapturemorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "motioncapturemorty").learnset.medicate = ["9L1"];
	this.modData("Learnsets", "motioncapturemorty").learnset.poke = ["9L5"];
	this.modData("Learnsets", "motioncapturemorty").learnset.suitandboot = ["9L10"];
	this.modData("Learnsets", "motioncapturemorty").learnset.selfpromote = ["9L15"];
	this.modData("Learnsets", "motioncapturemorty").learnset.flutter = ["9L20"];
	this.modData("Learnsets", "motioncapturemorty").learnset.aura = ["9L25"];
	this.modData("Learnsets", "motioncapturemorty").learnset.energydrain = ["9L30"];
	this.modData("Learnsets", "motioncapturemorty").learnset.attention = ["9L35"];

	// Rainbow Suit Morty
	this.modData("Learnsets", "rainbowsuitmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "rainbowsuitmorty").learnset.medicate = ["9L1"];
	this.modData("Learnsets", "rainbowsuitmorty").learnset.poke = ["9L5"];
	this.modData("Learnsets", "rainbowsuitmorty").learnset.suitandboot = ["9L10"];
	this.modData("Learnsets", "rainbowsuitmorty").learnset.selfpromote = ["9L15"];
	this.modData("Learnsets", "rainbowsuitmorty").learnset.flutter = ["9L20"];
	this.modData("Learnsets", "rainbowsuitmorty").learnset.aura = ["9L25"];
	this.modData("Learnsets", "rainbowsuitmorty").learnset.energydrain = ["9L30"];
	this.modData("Learnsets", "rainbowsuitmorty").learnset.attention = ["9L35"];
	this.modData("Learnsets", "rainbowsuitmorty").learnset.outpour = ["9L40"];

	// Loner Morty
	this.modData("Learnsets", "lonermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "lonermorty").learnset.grab = ["9L1"];
	this.modData("Learnsets", "lonermorty").learnset.flail = ["9L5"];
	this.modData("Learnsets", "lonermorty").learnset.harden = ["9L9"];
	this.modData("Learnsets", "lonermorty").learnset.stonefists = ["9L15"];
	this.modData("Learnsets", "lonermorty").learnset.strengthen = ["9L21"];
	this.modData("Learnsets", "lonermorty").learnset.wedgie = ["9L26"];
	this.modData("Learnsets", "lonermorty").learnset.crush = ["9L32"];

	// Dangerous Morty
	this.modData("Learnsets", "dangerousmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "dangerousmorty").learnset.grab = ["9L1"];
	this.modData("Learnsets", "dangerousmorty").learnset.flail = ["9L5"];
	this.modData("Learnsets", "dangerousmorty").learnset.harden = ["9L9"];
	this.modData("Learnsets", "dangerousmorty").learnset.stonefists = ["9L15"];
	this.modData("Learnsets", "dangerousmorty").learnset.strengthen = ["9L21"];
	this.modData("Learnsets", "dangerousmorty").learnset.wedgie = ["9L26"];
	this.modData("Learnsets", "dangerousmorty").learnset.crush = ["9L32"];
	this.modData("Learnsets", "dangerousmorty").learnset.extort = ["9L36"];

	// Violent Morty
	this.modData("Learnsets", "violentmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "violentmorty").learnset.grab = ["9L1"];
	this.modData("Learnsets", "violentmorty").learnset.flail = ["9L5"];
	this.modData("Learnsets", "violentmorty").learnset.harden = ["9L9"];
	this.modData("Learnsets", "violentmorty").learnset.stonefists = ["9L15"];
	this.modData("Learnsets", "violentmorty").learnset.strengthen = ["9L21"];
	this.modData("Learnsets", "violentmorty").learnset.wedgie = ["9L26"];
	this.modData("Learnsets", "violentmorty").learnset.crush = ["9L32"];
	this.modData("Learnsets", "violentmorty").learnset.extort = ["9L36"];
	this.modData("Learnsets", "violentmorty").learnset.fiercelunge = ["9L40"];

	// Birdosaur Morty
	this.modData("Learnsets", "birdosaurmorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "birdosaurmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "birdosaurmorty").learnset.dig = ["9L5"];
	this.modData("Learnsets", "birdosaurmorty").learnset.certitude = ["9L11"];
	this.modData("Learnsets", "birdosaurmorty").learnset.protect = ["9L16"];
	this.modData("Learnsets", "birdosaurmorty").learnset.fangrage = ["9L23"];
	this.modData("Learnsets", "birdosaurmorty").learnset.bloodpressure = ["9L28"];
	this.modData("Learnsets", "birdosaurmorty").learnset.hypnotize = ["9L33"];

	// Volcan Morty
	this.modData("Learnsets", "volcanmorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "volcanmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "volcanmorty").learnset.dig = ["9L5"];
	this.modData("Learnsets", "volcanmorty").learnset.certitude = ["9L11"];
	this.modData("Learnsets", "volcanmorty").learnset.protect = ["9L16"];
	this.modData("Learnsets", "volcanmorty").learnset.fangrage = ["9L23"];
	this.modData("Learnsets", "volcanmorty").learnset.bloodpressure = ["9L28"];
	this.modData("Learnsets", "volcanmorty").learnset.hypnotize = ["9L35"];
	this.modData("Learnsets", "volcanmorty").learnset.delouse = ["9L37"];

	// Prancer Morty
	this.modData("Learnsets", "prancermorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "prancermorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "prancermorty").learnset.dig = ["9L5"];
	this.modData("Learnsets", "prancermorty").learnset.certitude = ["9L11"];
	this.modData("Learnsets", "prancermorty").learnset.protect = ["9L16"];
	this.modData("Learnsets", "prancermorty").learnset.fangrage = ["9L23"];
	this.modData("Learnsets", "prancermorty").learnset.bloodpressure = ["9L28"];
	this.modData("Learnsets", "prancermorty").learnset.hypnotize = ["9L35"];
	this.modData("Learnsets", "prancermorty").learnset.delouse = ["9L39"];
	this.modData("Learnsets", "prancermorty").learnset.regenerate = ["9L43"];

	// Ace Pilot Morty
	this.modData("Learnsets", "acepilotmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "acepilotmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "acepilotmorty").learnset.fortify = ["9L5"];
	this.modData("Learnsets", "acepilotmorty").learnset.shave = ["9L10"];
	this.modData("Learnsets", "acepilotmorty").learnset.fixerupper = ["9L15"];
	this.modData("Learnsets", "acepilotmorty").learnset.invasion = ["9L20"];
	this.modData("Learnsets", "acepilotmorty").learnset.defend = ["9L25"];
	this.modData("Learnsets", "acepilotmorty").learnset.wingblast = ["9L30"];
	this.modData("Learnsets", "acepilotmorty").learnset.mouthoff = ["9L35"];
	this.modData("Learnsets", "acepilotmorty").learnset.blitz = ["9L40"];

	// Survivor Morty
	this.modData("Learnsets", "survivormorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "survivormorty").learnset.fortify = ["9L1"];
	this.modData("Learnsets", "survivormorty").learnset.flail = ["9L5"];
	this.modData("Learnsets", "survivormorty").learnset.protect = ["9L10"];
	this.modData("Learnsets", "survivormorty").learnset.grab = ["9L15"];
	this.modData("Learnsets", "survivormorty").learnset.drowse = ["9L20"];
	this.modData("Learnsets", "survivormorty").learnset.crush = ["9L25"];
	this.modData("Learnsets", "survivormorty").learnset.spear = ["9L32"];

	// Survivalist Morty
	this.modData("Learnsets", "survivalistmorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "survivalistmorty").learnset.fortify = ["9L1"];
	this.modData("Learnsets", "survivalistmorty").learnset.flail = ["9L5"];
	this.modData("Learnsets", "survivalistmorty").learnset.protect = ["9L10"];
	this.modData("Learnsets", "survivalistmorty").learnset.grab = ["9L15"];
	this.modData("Learnsets", "survivalistmorty").learnset.drowse = ["9L20"];
	this.modData("Learnsets", "survivalistmorty").learnset.crush = ["9L25"];
	this.modData("Learnsets", "survivalistmorty").learnset.spear = ["9L32"];
	this.modData("Learnsets", "survivalistmorty").learnset.retainstrength = ["9L36"];

	// Wild Man Morty
	this.modData("Learnsets", "wildmanmorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "wildmanmorty").learnset.fortify = ["9L1"];
	this.modData("Learnsets", "wildmanmorty").learnset.flail = ["9L5"];
	this.modData("Learnsets", "wildmanmorty").learnset.protect = ["9L10"];
	this.modData("Learnsets", "wildmanmorty").learnset.grab = ["9L15"];
	this.modData("Learnsets", "wildmanmorty").learnset.drowse = ["9L20"];
	this.modData("Learnsets", "wildmanmorty").learnset.crush = ["9L25"];
	this.modData("Learnsets", "wildmanmorty").learnset.spear = ["9L32"];
	this.modData("Learnsets", "wildmanmorty").learnset.retainstrength = ["9L36"];
	this.modData("Learnsets", "wildmanmorty").learnset.claw = ["9L42"];

	// Wild Mascot Morty
	this.modData("Learnsets", "wildmascotmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "wildmascotmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "wildmascotmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "wildmascotmorty").learnset.belch = ["9L11"];
	this.modData("Learnsets", "wildmascotmorty").learnset.scrunch = ["9L15"];
	this.modData("Learnsets", "wildmascotmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "wildmascotmorty").learnset.deathstare = ["9L23"];
	this.modData("Learnsets", "wildmascotmorty").learnset.spear = ["9L26"];
	this.modData("Learnsets", "wildmascotmorty").learnset.entertain = ["9L31"];
	this.modData("Learnsets", "wildmascotmorty").learnset.signautograph = ["9L36"];

	// Animatronic Morty
	this.modData("Learnsets", "animatronicmorty").learnset.melt = ["9L1"];
	this.modData("Learnsets", "animatronicmorty").learnset.weardown = ["9L1"];
	this.modData("Learnsets", "animatronicmorty").learnset.flail = ["9L6"];
	this.modData("Learnsets", "animatronicmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "animatronicmorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "animatronicmorty").learnset.swing = ["9L17"];
	this.modData("Learnsets", "animatronicmorty").learnset.staticshock = ["9L20"];
	this.modData("Learnsets", "animatronicmorty").learnset.mortify = ["9L24"];
	this.modData("Learnsets", "animatronicmorty").learnset.defragment = ["9L28"];
	this.modData("Learnsets", "animatronicmorty").learnset.compute = ["9L33"];
	this.modData("Learnsets", "animatronicmorty").learnset.reboot = ["9L38"];

	// Plumbus Slave Morty
	this.modData("Learnsets", "plumbusslavemorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "plumbusslavemorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "plumbusslavemorty").learnset.probe = ["9L5"];
	this.modData("Learnsets", "plumbusslavemorty").learnset.snub = ["9L10"];
	this.modData("Learnsets", "plumbusslavemorty").learnset.stonewash = ["9L16"];
	this.modData("Learnsets", "plumbusslavemorty").learnset.blowdry = ["9L21"];
	this.modData("Learnsets", "plumbusslavemorty").learnset.staticshock = ["9L26"];
	this.modData("Learnsets", "plumbusslavemorty").learnset.wrangle = ["9L30"];

	// Plumbus Worker Morty
	this.modData("Learnsets", "plumbusworkermorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "plumbusworkermorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "plumbusworkermorty").learnset.probe = ["9L5"];
	this.modData("Learnsets", "plumbusworkermorty").learnset.snub = ["9L10"];
	this.modData("Learnsets", "plumbusworkermorty").learnset.stonewash = ["9L16"];
	this.modData("Learnsets", "plumbusworkermorty").learnset.blowdry = ["9L21"];
	this.modData("Learnsets", "plumbusworkermorty").learnset.staticshock = ["9L26"];
	this.modData("Learnsets", "plumbusworkermorty").learnset.wrangle = ["9L30"];
	this.modData("Learnsets", "plumbusworkermorty").learnset.suck = ["9L34"];

	// Plumbus Master Morty
	this.modData("Learnsets", "plumbusmastermorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "plumbusmastermorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "plumbusmastermorty").learnset.probe = ["9L5"];
	this.modData("Learnsets", "plumbusmastermorty").learnset.snub = ["9L10"];
	this.modData("Learnsets", "plumbusmastermorty").learnset.stonewash = ["9L16"];
	this.modData("Learnsets", "plumbusmastermorty").learnset.blowdry = ["9L21"];
	this.modData("Learnsets", "plumbusmastermorty").learnset.staticshock = ["9L26"];
	this.modData("Learnsets", "plumbusmastermorty").learnset.wrangle = ["9L30"];
	this.modData("Learnsets", "plumbusmastermorty").learnset.suck = ["9L34"];
	this.modData("Learnsets", "plumbusmastermorty").learnset.boneextract = ["9L41"];

	// Plumbus Prawn Morty
	this.modData("Learnsets", "plumbusprawnmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.sprout = ["9L6"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.poisonspit = ["9L14"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.swing = ["9L17"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.rush = ["9L21"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.fiercelunge = ["9L29"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.staredown = ["9L34"];
	this.modData("Learnsets", "plumbusprawnmorty").learnset.slobber = ["9L44"];

	// Plumbonia Morty
	this.modData("Learnsets", "plumboniamorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "plumboniamorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "plumboniamorty").learnset.kick = ["9L7"];
	this.modData("Learnsets", "plumboniamorty").learnset.stargaze = ["9L11"];
	this.modData("Learnsets", "plumboniamorty").learnset.stonegaze = ["9L15"];
	this.modData("Learnsets", "plumboniamorty").learnset.protect = ["9L20"];
	this.modData("Learnsets", "plumboniamorty").learnset.beam = ["9L25"];
	this.modData("Learnsets", "plumboniamorty").learnset.claw = ["9L32"];
	this.modData("Learnsets", "plumboniamorty").learnset.staredown = ["9L37"];
	this.modData("Learnsets", "plumboniamorty").learnset.hydroblast = ["9L44"];

	// Armomaly Morty
	this.modData("Learnsets", "armomalymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "armomalymorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "armomalymorty").learnset.poisonspit = ["9L5"];
	this.modData("Learnsets", "armomalymorty").learnset.flail = ["9L13"];
	this.modData("Learnsets", "armomalymorty").learnset.medicate = ["9L16"];
	this.modData("Learnsets", "armomalymorty").learnset.blindswing = ["9L22"];
	this.modData("Learnsets", "armomalymorty").learnset.vilespew = ["9L26"];
	this.modData("Learnsets", "armomalymorty").learnset.snub = ["9L32"];

	// Mutagen Morty
	this.modData("Learnsets", "mutagenmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "mutagenmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "mutagenmorty").learnset.poisonspit = ["9L5"];
	this.modData("Learnsets", "mutagenmorty").learnset.flail = ["9L13"];
	this.modData("Learnsets", "mutagenmorty").learnset.medicate = ["9L16"];
	this.modData("Learnsets", "mutagenmorty").learnset.blindswing = ["9L22"];
	this.modData("Learnsets", "mutagenmorty").learnset.vilespew = ["9L26"];
	this.modData("Learnsets", "mutagenmorty").learnset.snub = ["9L32"];
	this.modData("Learnsets", "mutagenmorty").learnset.mutate = ["9L39"];

	// Carcinogenic Morty
	this.modData("Learnsets", "carcinogenicmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "carcinogenicmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "carcinogenicmorty").learnset.poisonspit = ["9L5"];
	this.modData("Learnsets", "carcinogenicmorty").learnset.flail = ["9L13"];
	this.modData("Learnsets", "carcinogenicmorty").learnset.medicate = ["9L16"];
	this.modData("Learnsets", "carcinogenicmorty").learnset.blindswing = ["9L22"];
	this.modData("Learnsets", "carcinogenicmorty").learnset.vilespew = ["9L26"];
	this.modData("Learnsets", "carcinogenicmorty").learnset.snub = ["9L32"];
	this.modData("Learnsets", "carcinogenicmorty").learnset.mutate = ["9L39"];
	this.modData("Learnsets", "carcinogenicmorty").learnset.vaccinate = ["9L43"];

	// Mega Morty
	this.modData("Learnsets", "megamorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "megamorty").learnset.fortify = ["9L1"];
	this.modData("Learnsets", "megamorty").learnset.weardown = ["9L5"];
	this.modData("Learnsets", "megamorty").learnset.energydrain = ["9L10"];
	this.modData("Learnsets", "megamorty").learnset.vaporize = ["9L15"];
	this.modData("Learnsets", "megamorty").learnset.harden = ["9L20"];
	this.modData("Learnsets", "megamorty").learnset.beam = ["9L25"];
	this.modData("Learnsets", "megamorty").learnset.regenerate = ["9L30"];
	this.modData("Learnsets", "megamorty").learnset.mangle = ["9L40"];

	// Spliced Morty
	this.modData("Learnsets", "splicedmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "splicedmorty").learnset.strengthen = ["9L1"];
	this.modData("Learnsets", "splicedmorty").learnset.negativeenergy = ["9L5"];
	this.modData("Learnsets", "splicedmorty").learnset.pillage = ["9L10"];
	this.modData("Learnsets", "splicedmorty").learnset.vaporize = ["9L15"];
	this.modData("Learnsets", "splicedmorty").learnset.salivate = ["9L20"];
	this.modData("Learnsets", "splicedmorty").learnset.beam = ["9L25"];
	this.modData("Learnsets", "splicedmorty").learnset.regenerate = ["9L30"];
	this.modData("Learnsets", "splicedmorty").learnset.mangle = ["9L40"];

	// Crewman Morty
	this.modData("Learnsets", "crewmanmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "crewmanmorty").learnset.attention = ["9L1"];
	this.modData("Learnsets", "crewmanmorty").learnset.suitandboot = ["9L7"];
	this.modData("Learnsets", "crewmanmorty").learnset.staredown = ["9L14"];
	this.modData("Learnsets", "crewmanmorty").learnset.reminisce = ["9L19"];
	this.modData("Learnsets", "crewmanmorty").learnset.vaporize = ["9L24"];
	this.modData("Learnsets", "crewmanmorty").learnset.rush = ["9L29"];

	// Ensign Morty
	this.modData("Learnsets", "ensignmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "ensignmorty").learnset.attention = ["9L1"];
	this.modData("Learnsets", "ensignmorty").learnset.suitandboot = ["9L7"];
	this.modData("Learnsets", "ensignmorty").learnset.staredown = ["9L14"];
	this.modData("Learnsets", "ensignmorty").learnset.reminisce = ["9L19"];
	this.modData("Learnsets", "ensignmorty").learnset.vaporize = ["9L24"];
	this.modData("Learnsets", "ensignmorty").learnset.rush = ["9L29"];
	this.modData("Learnsets", "ensignmorty").learnset.mortify = ["9L37"];

	// Lieutenant Morty
	this.modData("Learnsets", "lieutenantmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "lieutenantmorty").learnset.attention = ["9L1"];
	this.modData("Learnsets", "lieutenantmorty").learnset.suitandboot = ["9L7"];
	this.modData("Learnsets", "lieutenantmorty").learnset.staredown = ["9L14"];
	this.modData("Learnsets", "lieutenantmorty").learnset.reminisce = ["9L19"];
	this.modData("Learnsets", "lieutenantmorty").learnset.vaporize = ["9L24"];
	this.modData("Learnsets", "lieutenantmorty").learnset.rush = ["9L29"];
	this.modData("Learnsets", "lieutenantmorty").learnset.mortify = ["9L37"];
	this.modData("Learnsets", "lieutenantmorty").learnset.recitation = ["9L39"];

	// Mortaion Morty
	this.modData("Learnsets", "mortaionmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "mortaionmorty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "mortaionmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "mortaionmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "mortaionmorty").learnset.mindrage = ["9L14"];
	this.modData("Learnsets", "mortaionmorty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "mortaionmorty").learnset.mortify = ["9L22"];
	this.modData("Learnsets", "mortaionmorty").learnset.fiercelunge = ["9L26"];
	this.modData("Learnsets", "mortaionmorty").learnset.staredown = ["9L30"];
	this.modData("Learnsets", "mortaionmorty").learnset.mindmeld = ["9L36"];

	// Mortox Morty
	this.modData("Learnsets", "mortoxmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "mortoxmorty").learnset.gforce = ["9L1"];
	this.modData("Learnsets", "mortoxmorty").learnset.vaporize = ["9L5"];
	this.modData("Learnsets", "mortoxmorty").learnset.mindread = ["9L10"];
	this.modData("Learnsets", "mortoxmorty").learnset.newwave = ["9L16"];
	this.modData("Learnsets", "mortoxmorty").learnset.aerokinesis = ["9L22"];
	this.modData("Learnsets", "mortoxmorty").learnset.inferno = ["9L27"];
	this.modData("Learnsets", "mortoxmorty").learnset.vapefume = ["9L33"];
	this.modData("Learnsets", "mortoxmorty").learnset.soulsearch = ["9L39"];

	// Girl Morty
	this.modData("Learnsets", "girlmorty").learnset.comb = ["9L1"];
	this.modData("Learnsets", "girlmorty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "girlmorty").learnset.curl = ["9L8"];
	this.modData("Learnsets", "girlmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "girlmorty").learnset.blowdry = ["9L14"];
	this.modData("Learnsets", "girlmorty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "girlmorty").learnset.mortify = ["9L22"];
	this.modData("Learnsets", "girlmorty").learnset.fiercelunge = ["9L27"];
	this.modData("Learnsets", "girlmorty").learnset.staredown = ["9L32"];
	this.modData("Learnsets", "girlmorty").learnset.mindmeld = ["9L36"];

	// Lawyer Morty
	this.modData("Learnsets", "lawyermorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "lawyermorty").learnset.chastise = ["9L5"];
	this.modData("Learnsets", "lawyermorty").learnset.dig = ["9L9"];
	this.modData("Learnsets", "lawyermorty").learnset.strengthen = ["9L13"];
	this.modData("Learnsets", "lawyermorty").learnset.erase = ["9L17"];
	this.modData("Learnsets", "lawyermorty").learnset.fortify = ["9L21"];
	this.modData("Learnsets", "lawyermorty").learnset.soulsearch = ["9L25"];
	this.modData("Learnsets", "lawyermorty").learnset.hornswoggle = ["9L30"];
	this.modData("Learnsets", "lawyermorty").learnset.recitation = ["9L35"];

	// Judge Morty
	this.modData("Learnsets", "judgemorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "judgemorty").learnset.chastise = ["9L5"];
	this.modData("Learnsets", "judgemorty").learnset.dig = ["9L9"];
	this.modData("Learnsets", "judgemorty").learnset.strengthen = ["9L13"];
	this.modData("Learnsets", "judgemorty").learnset.erase = ["9L17"];
	this.modData("Learnsets", "judgemorty").learnset.fortify = ["9L21"];
	this.modData("Learnsets", "judgemorty").learnset.soulsearch = ["9L25"];
	this.modData("Learnsets", "judgemorty").learnset.hornswoggle = ["9L30"];
	this.modData("Learnsets", "judgemorty").learnset.recitation = ["9L35"];
	this.modData("Learnsets", "judgemorty").learnset.outpour = ["9L39"];

	// Android Morty
	this.modData("Learnsets", "androidmorty").learnset.solidify = ["9L1"];
	this.modData("Learnsets", "androidmorty").learnset.weardown = ["9L1"];
	this.modData("Learnsets", "androidmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "androidmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "androidmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "androidmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "androidmorty").learnset.crush = ["9L25"];
	this.modData("Learnsets", "androidmorty").learnset.compute = ["9L31"];
	this.modData("Learnsets", "androidmorty").learnset.darkvoid = ["9L37"];

	// Giant Arm Morty
	this.modData("Learnsets", "giantarmmorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "giantarmmorty").learnset.strengthen = ["9L1"];
	this.modData("Learnsets", "giantarmmorty").learnset.scrunch = ["9L8"];
	this.modData("Learnsets", "giantarmmorty").learnset.harden = ["9L10"];
	this.modData("Learnsets", "giantarmmorty").learnset.swing = ["9L15"];
	this.modData("Learnsets", "giantarmmorty").learnset.lasso = ["9L19"];
	this.modData("Learnsets", "giantarmmorty").learnset.loveyourself = ["9L24"];
	this.modData("Learnsets", "giantarmmorty").learnset.staredown = ["9L27"];
	this.modData("Learnsets", "giantarmmorty").learnset.recitation = ["9L30"];

	// Wasteland Morty
	this.modData("Learnsets", "wastelandmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "wastelandmorty").learnset.tateochi = ["9L1"];
	this.modData("Learnsets", "wastelandmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "wastelandmorty").learnset.belch = ["9L11"];
	this.modData("Learnsets", "wastelandmorty").learnset.probe = ["9L15"];
	this.modData("Learnsets", "wastelandmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "wastelandmorty").learnset.mindrage = ["9L23"];
	this.modData("Learnsets", "wastelandmorty").learnset.spear = ["9L26"];
	this.modData("Learnsets", "wastelandmorty").learnset.entertain = ["9L31"];
	this.modData("Learnsets", "wastelandmorty").learnset.boneextract = ["9L36"];

	// Sunday Best Morty
	this.modData("Learnsets", "sundaybestmorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "sundaybestmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "sundaybestmorty").learnset.machinewash = ["9L7"];
	this.modData("Learnsets", "sundaybestmorty").learnset.weardown = ["9L11"];
	this.modData("Learnsets", "sundaybestmorty").learnset.smooch = ["9L15"];
	this.modData("Learnsets", "sundaybestmorty").learnset.pout = ["9L19"];
	this.modData("Learnsets", "sundaybestmorty").learnset.wedgie = ["9L25"];
	this.modData("Learnsets", "sundaybestmorty").learnset.recitation = ["9L29"];

	// Cucumber Morty
	this.modData("Learnsets", "cucumbermorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "cucumbermorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "cucumbermorty").learnset.sprout = ["9L1"];
	this.modData("Learnsets", "cucumbermorty").learnset.flail = ["9L12"];
	this.modData("Learnsets", "cucumbermorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "cucumbermorty").learnset.swing = ["9L22"];
	this.modData("Learnsets", "cucumbermorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "cucumbermorty").learnset.transplant = ["9L30"];

	// Pickle Morty
	this.modData("Learnsets", "picklemorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "picklemorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "picklemorty").learnset.sprout = ["9L1"];
	this.modData("Learnsets", "picklemorty").learnset.flail = ["9L12"];
	this.modData("Learnsets", "picklemorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "picklemorty").learnset.swing = ["9L22"];
	this.modData("Learnsets", "picklemorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "picklemorty").learnset.transplant = ["9L30"];
	this.modData("Learnsets", "picklemorty").learnset.regenerate = ["9L35"];

	// Pickled Morty
	this.modData("Learnsets", "pickledmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "pickledmorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "pickledmorty").learnset.sprout = ["9L1"];
	this.modData("Learnsets", "pickledmorty").learnset.flail = ["9L12"];
	this.modData("Learnsets", "pickledmorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "pickledmorty").learnset.swing = ["9L22"];
	this.modData("Learnsets", "pickledmorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "pickledmorty").learnset.transplant = ["9L30"];
	this.modData("Learnsets", "pickledmorty").learnset.regenerate = ["9L35"];
	this.modData("Learnsets", "pickledmorty").learnset.mindmeld = ["9L41"];

	// Concerto Morty
	this.modData("Learnsets", "concertomorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "concertomorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "concertomorty").learnset.slam = ["9L8"];
	this.modData("Learnsets", "concertomorty").learnset.strengthen = ["9L10"];
	this.modData("Learnsets", "concertomorty").learnset.ouija = ["9L14"];
	this.modData("Learnsets", "concertomorty").learnset.wrangle = ["9L19"];
	this.modData("Learnsets", "concertomorty").learnset.rush = ["9L26"];
	this.modData("Learnsets", "concertomorty").learnset.grab = ["9L32"];
	this.modData("Learnsets", "concertomorty").learnset.goldentouch = ["9L38"];

	// Vindicator Morty
	this.modData("Learnsets", "vindicatormorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "vindicatormorty").learnset.attention = ["9L1"];
	this.modData("Learnsets", "vindicatormorty").learnset.suitandboot = ["9L7"];
	this.modData("Learnsets", "vindicatormorty").learnset.staredown = ["9L14"];
	this.modData("Learnsets", "vindicatormorty").learnset.clarity = ["9L19"];
	this.modData("Learnsets", "vindicatormorty").learnset.stargaze = ["9L24"];
	this.modData("Learnsets", "vindicatormorty").learnset.rush = ["9L29"];
	this.modData("Learnsets", "vindicatormorty").learnset.mortify = ["9L37"];
	this.modData("Learnsets", "vindicatormorty").learnset.reboot = ["9L39"];

	// Hawaiian Morty
	this.modData("Learnsets", "hawaiianmorty").learnset.flair = ["9L1"];
	this.modData("Learnsets", "hawaiianmorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "hawaiianmorty").learnset.reminisce = ["9L8"];
	this.modData("Learnsets", "hawaiianmorty").learnset.lovebug = ["9L14"];
	this.modData("Learnsets", "hawaiianmorty").learnset.pout = ["9L19"];
	this.modData("Learnsets", "hawaiianmorty").learnset.newwave = ["9L23"];
	this.modData("Learnsets", "hawaiianmorty").learnset.loveyourself = ["9L28"];
	this.modData("Learnsets", "hawaiianmorty").learnset.exfoliate = ["9L32"];
	this.modData("Learnsets", "hawaiianmorty").learnset.rickytikkitavi = ["9L38"];

	// Sherlock Morty
	this.modData("Learnsets", "sherlockmorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "sherlockmorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "sherlockmorty").learnset.blindswing = ["9L5"];
	this.modData("Learnsets", "sherlockmorty").learnset.staredown = ["9L8"];
	this.modData("Learnsets", "sherlockmorty").learnset.protect = ["9L14"];
	this.modData("Learnsets", "sherlockmorty").learnset.shatter = ["9L21"];
	this.modData("Learnsets", "sherlockmorty").learnset.extort = ["9L31"];
	this.modData("Learnsets", "sherlockmorty").learnset.nodoff = ["9L35"];
	this.modData("Learnsets", "sherlockmorty").learnset.signautograph = ["9L39"];
	this.modData("Learnsets", "sherlockmorty").learnset.attention = ["9L41"];

	// Prisoner Morty
	this.modData("Learnsets", "prisonermorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "prisonermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "prisonermorty").learnset.deadstare = ["9L5"];
	this.modData("Learnsets", "prisonermorty").learnset.staredown = ["9L8"];
	this.modData("Learnsets", "prisonermorty").learnset.bloodpressure = ["9L14"];
	this.modData("Learnsets", "prisonermorty").learnset.nail = ["9L21"];
	this.modData("Learnsets", "prisonermorty").learnset.heavedown = ["9L31"];
	this.modData("Learnsets", "prisonermorty").learnset.nodoff = ["9L35"];

	// Felon Morty
	this.modData("Learnsets", "felonmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "felonmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "felonmorty").learnset.deadstare = ["9L5"];
	this.modData("Learnsets", "felonmorty").learnset.staredown = ["9L8"];
	this.modData("Learnsets", "felonmorty").learnset.bloodpressure = ["9L14"];
	this.modData("Learnsets", "felonmorty").learnset.nail = ["9L21"];
	this.modData("Learnsets", "felonmorty").learnset.heavedown = ["9L31"];
	this.modData("Learnsets", "felonmorty").learnset.nodoff = ["9L35"];
	this.modData("Learnsets", "felonmorty").learnset.humiliate = ["9L39"];

	// Federation Prisoner Morty
	this.modData("Learnsets", "federationprisonermorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "federationprisonermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "federationprisonermorty").learnset.deadstare = ["9L5"];
	this.modData("Learnsets", "federationprisonermorty").learnset.staredown = ["9L8"];
	this.modData("Learnsets", "federationprisonermorty").learnset.bloodpressure = ["9L14"];
	this.modData("Learnsets", "federationprisonermorty").learnset.nail = ["9L21"];
	this.modData("Learnsets", "federationprisonermorty").learnset.heavedown = ["9L31"];
	this.modData("Learnsets", "federationprisonermorty").learnset.nodoff = ["9L35"];
	this.modData("Learnsets", "federationprisonermorty").learnset.humiliate = ["9L39"];
	this.modData("Learnsets", "federationprisonermorty").learnset.juice = ["9L41"];

	// Poorhouse Morty
	this.modData("Learnsets", "poorhousemorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "poorhousemorty").learnset.fixerupper = ["9L6"];
	this.modData("Learnsets", "poorhousemorty").learnset.flail = ["9L9"];
	this.modData("Learnsets", "poorhousemorty").learnset.examine = ["9L13"];
	this.modData("Learnsets", "poorhousemorty").learnset.scrunch = ["9L17"];
	this.modData("Learnsets", "poorhousemorty").learnset.bunt = ["9L22"];
	this.modData("Learnsets", "poorhousemorty").learnset.grossout = ["9L24"];
	this.modData("Learnsets", "poorhousemorty").learnset.rush = ["9L30"];

	// Chimney Sweep Morty
	this.modData("Learnsets", "chimneysweepmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "chimneysweepmorty").learnset.fixerupper = ["9L6"];
	this.modData("Learnsets", "chimneysweepmorty").learnset.flail = ["9L9"];
	this.modData("Learnsets", "chimneysweepmorty").learnset.examine = ["9L13"];
	this.modData("Learnsets", "chimneysweepmorty").learnset.scrunch = ["9L17"];
	this.modData("Learnsets", "chimneysweepmorty").learnset.bunt = ["9L22"];
	this.modData("Learnsets", "chimneysweepmorty").learnset.grossout = ["9L24"];
	this.modData("Learnsets", "chimneysweepmorty").learnset.rush = ["9L30"];
	this.modData("Learnsets", "chimneysweepmorty").learnset.humiliate = ["9L35"];

	// Master Morty
	this.modData("Learnsets", "mastermorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "mastermorty").learnset.fixerupper = ["9L6"];
	this.modData("Learnsets", "mastermorty").learnset.flail = ["9L9"];
	this.modData("Learnsets", "mastermorty").learnset.examine = ["9L13"];
	this.modData("Learnsets", "mastermorty").learnset.scrunch = ["9L17"];
	this.modData("Learnsets", "mastermorty").learnset.bunt = ["9L22"];
	this.modData("Learnsets", "mastermorty").learnset.grossout = ["9L24"];
	this.modData("Learnsets", "mastermorty").learnset.rush = ["9L30"];
	this.modData("Learnsets", "mastermorty").learnset.humiliate = ["9L35"];
	this.modData("Learnsets", "mastermorty").learnset.descale = ["9L41"];

	// Slime Morty
	this.modData("Learnsets", "slimemorty").learnset.melt = ["9L1"];
	this.modData("Learnsets", "slimemorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "slimemorty").learnset.negativeenergy = ["9L8"];
	this.modData("Learnsets", "slimemorty").learnset.vaporize = ["9L13"];
	this.modData("Learnsets", "slimemorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "slimemorty").learnset.clarity = ["9L22"];
	this.modData("Learnsets", "slimemorty").learnset.vilespew = ["9L24"];
	this.modData("Learnsets", "slimemorty").learnset.aura = ["9L30"];

	// Snot Morty
	this.modData("Learnsets", "snotmorty").learnset.melt = ["9L1"];
	this.modData("Learnsets", "snotmorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "snotmorty").learnset.negativeenergy = ["9L8"];
	this.modData("Learnsets", "snotmorty").learnset.vaporize = ["9L13"];
	this.modData("Learnsets", "snotmorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "snotmorty").learnset.clarity = ["9L22"];
	this.modData("Learnsets", "snotmorty").learnset.vilespew = ["9L24"];
	this.modData("Learnsets", "snotmorty").learnset.aura = ["9L30"];
	this.modData("Learnsets", "snotmorty").learnset.regenerate = ["9L35"];

	// Gunk Morty
	this.modData("Learnsets", "gunkmorty").learnset.melt = ["9L1"];
	this.modData("Learnsets", "gunkmorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "gunkmorty").learnset.negativeenergy = ["9L8"];
	this.modData("Learnsets", "gunkmorty").learnset.vaporize = ["9L13"];
	this.modData("Learnsets", "gunkmorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "gunkmorty").learnset.clarity = ["9L22"];
	this.modData("Learnsets", "gunkmorty").learnset.vilespew = ["9L24"];
	this.modData("Learnsets", "gunkmorty").learnset.aura = ["9L30"];
	this.modData("Learnsets", "gunkmorty").learnset.regenerate = ["9L35"];
	this.modData("Learnsets", "gunkmorty").learnset.boneextract = ["9L41"];

	// Detox Morty
	this.modData("Learnsets", "detoxmorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "detoxmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "detoxmorty").learnset.crimp = ["9L8"];
	this.modData("Learnsets", "detoxmorty").learnset.provoke = ["9L10"];
	this.modData("Learnsets", "detoxmorty").learnset.stonegaze = ["9L15"];
	this.modData("Learnsets", "detoxmorty").learnset.defend = ["9L20"];
	this.modData("Learnsets", "detoxmorty").learnset.juice = ["9L26"];
	this.modData("Learnsets", "detoxmorty").learnset.pout = ["9L31"];
	this.modData("Learnsets", "detoxmorty").learnset.bunt = ["9L34"];
	this.modData("Learnsets", "detoxmorty").learnset.straightedge = ["9L39"];

	// Parade Morty
	this.modData("Learnsets", "parademorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "parademorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "parademorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "parademorty").learnset.glitterblast = ["9L10"];
	this.modData("Learnsets", "parademorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "parademorty").learnset.snooze = ["9L19"];
	this.modData("Learnsets", "parademorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "parademorty").learnset.vapefume = ["9L31"];

	// Pride Morty
	this.modData("Learnsets", "pridemorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "pridemorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "pridemorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "pridemorty").learnset.glitterblast = ["9L10"];
	this.modData("Learnsets", "pridemorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "pridemorty").learnset.snooze = ["9L19"];
	this.modData("Learnsets", "pridemorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "pridemorty").learnset.vapefume = ["9L31"];
	this.modData("Learnsets", "pridemorty").learnset.loveyourself = ["9L35"];

	// Festival Morty
	this.modData("Learnsets", "festivalmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "festivalmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "festivalmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "festivalmorty").learnset.glitterblast = ["9L10"];
	this.modData("Learnsets", "festivalmorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "festivalmorty").learnset.snooze = ["9L19"];
	this.modData("Learnsets", "festivalmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "festivalmorty").learnset.vapefume = ["9L31"];
	this.modData("Learnsets", "festivalmorty").learnset.loveyourself = ["9L35"];
	this.modData("Learnsets", "festivalmorty").learnset.rollingstone = ["9L39"];

	// Big Morty
	this.modData("Learnsets", "bigmorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "bigmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "bigmorty").learnset.suitandboot = ["9L8"];
	this.modData("Learnsets", "bigmorty").learnset.staredown = ["9L13"];
	this.modData("Learnsets", "bigmorty").learnset.rush = ["9L18"];
	this.modData("Learnsets", "bigmorty").learnset.selfpromote = ["9L23"];
	this.modData("Learnsets", "bigmorty").learnset.stitch = ["9L27"];
	this.modData("Learnsets", "bigmorty").learnset.bloodpressure = ["9L32"];
	this.modData("Learnsets", "bigmorty").learnset.legislate = ["9L37"];

	// Flower Morty
	this.modData("Learnsets", "flowermorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "flowermorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "flowermorty").learnset.relax = ["9L8"];
	this.modData("Learnsets", "flowermorty").learnset.dig = ["9L11"];
	this.modData("Learnsets", "flowermorty").learnset.flowerchild = ["9L14"];
	this.modData("Learnsets", "flowermorty").learnset.staredown = ["9L20"];
	this.modData("Learnsets", "flowermorty").learnset.greenblur = ["9L22"];
	this.modData("Learnsets", "flowermorty").learnset.protect = ["9L26"];
	this.modData("Learnsets", "flowermorty").learnset.mutate = ["9L32"];
	this.modData("Learnsets", "flowermorty").learnset.rootdown = ["9L37"];

	// Mindblower Morty
	this.modData("Learnsets", "mindblowermorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "mindblowermorty").learnset.mindread = ["9L1"];
	this.modData("Learnsets", "mindblowermorty").learnset.negativeenergy = ["9L6"];
	this.modData("Learnsets", "mindblowermorty").learnset.stonegaze = ["9L9"];
	this.modData("Learnsets", "mindblowermorty").learnset.sparkle = ["9L13"];
	this.modData("Learnsets", "mindblowermorty").learnset.soulsearch = ["9L19"];
	this.modData("Learnsets", "mindblowermorty").learnset.mortify = ["9L24"];
	this.modData("Learnsets", "mindblowermorty").learnset.darkvoid = ["9L30"];
	this.modData("Learnsets", "mindblowermorty").learnset.hypnotize = ["9L35"];
	this.modData("Learnsets", "mindblowermorty").learnset.brainfreeze = ["9L41"];

	// Possessed Morty
	this.modData("Learnsets", "possessedmorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "possessedmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "possessedmorty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "possessedmorty").learnset.plasmaburst = ["9L10"];
	this.modData("Learnsets", "possessedmorty").learnset.negativeenergy = ["9L14"];
	this.modData("Learnsets", "possessedmorty").learnset.clarity = ["9L19"];
	this.modData("Learnsets", "possessedmorty").learnset.grossout = ["9L25"];
	this.modData("Learnsets", "possessedmorty").learnset.drowse = ["9L31"];

	// Ingested Morty
	this.modData("Learnsets", "ingestedmorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "ingestedmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "ingestedmorty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "ingestedmorty").learnset.plasmaburst = ["9L10"];
	this.modData("Learnsets", "ingestedmorty").learnset.negativeenergy = ["9L14"];
	this.modData("Learnsets", "ingestedmorty").learnset.clarity = ["9L19"];
	this.modData("Learnsets", "ingestedmorty").learnset.grossout = ["9L25"];
	this.modData("Learnsets", "ingestedmorty").learnset.drowse = ["9L31"];
	this.modData("Learnsets", "ingestedmorty").learnset.soulsearch = ["9L36"];

	// Voltamatron Morty
	this.modData("Learnsets", "voltamatronmorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "voltamatronmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "voltamatronmorty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "voltamatronmorty").learnset.plasmaburst = ["9L10"];
	this.modData("Learnsets", "voltamatronmorty").learnset.negativeenergy = ["9L14"];
	this.modData("Learnsets", "voltamatronmorty").learnset.clarity = ["9L19"];
	this.modData("Learnsets", "voltamatronmorty").learnset.grossout = ["9L25"];
	this.modData("Learnsets", "voltamatronmorty").learnset.drowse = ["9L31"];
	this.modData("Learnsets", "voltamatronmorty").learnset.soulsearch = ["9L38"];
	this.modData("Learnsets", "voltamatronmorty").learnset.mindmeld = ["9L41"];

	// Space Trooper Morty
	this.modData("Learnsets", "spacetroopermorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "spacetroopermorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "spacetroopermorty").learnset.fortify = ["9L5"];
	this.modData("Learnsets", "spacetroopermorty").learnset.erase = ["9L10"];
	this.modData("Learnsets", "spacetroopermorty").learnset.fixerupper = ["9L15"];
	this.modData("Learnsets", "spacetroopermorty").learnset.lasso = ["9L20"];
	this.modData("Learnsets", "spacetroopermorty").learnset.defend = ["9L25"];
	this.modData("Learnsets", "spacetroopermorty").learnset.quickdraw = ["9L30"];
	this.modData("Learnsets", "spacetroopermorty").learnset.mouthoff = ["9L35"];
	this.modData("Learnsets", "spacetroopermorty").learnset.blitz = ["9L40"];

	// Snuffles Morty
	this.modData("Learnsets", "snufflesmorty").learnset.sneeze = ["9L1"];
	this.modData("Learnsets", "snufflesmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "snufflesmorty").learnset.provoke = ["9L9"];
	this.modData("Learnsets", "snufflesmorty").learnset.dig = ["9L13"];
	this.modData("Learnsets", "snufflesmorty").learnset.puffytail = ["9L17"];
	this.modData("Learnsets", "snufflesmorty").learnset.rush = ["9L22"];
	this.modData("Learnsets", "snufflesmorty").learnset.snub = ["9L24"];
	this.modData("Learnsets", "snufflesmorty").learnset.snooze = ["9L30"];
	this.modData("Learnsets", "snufflesmorty").learnset.vaccinate = ["9L34"];
	this.modData("Learnsets", "snufflesmorty").learnset.scratchandsniff = ["9L39"];

	// Monster Morty
	this.modData("Learnsets", "monstermorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "monstermorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "monstermorty").learnset.cellsplitter = ["9L7"];
	this.modData("Learnsets", "monstermorty").learnset.wettongue = ["9L13"];
	this.modData("Learnsets", "monstermorty").learnset.weardown = ["9L18"];
	this.modData("Learnsets", "monstermorty").learnset.drowse = ["9L23"];
	this.modData("Learnsets", "monstermorty").learnset.fortify = ["9L27"];
	this.modData("Learnsets", "monstermorty").learnset.fangrage = ["9L30"];
	this.modData("Learnsets", "monstermorty").learnset.strengthen = ["9L33"];
	this.modData("Learnsets", "monstermorty").learnset.regenerate = ["9L40"];

	// War Paint Morty
	this.modData("Learnsets", "warpaintmorty").learnset.poke = ["9L1"];
	this.modData("Learnsets", "warpaintmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "warpaintmorty").learnset.suitandboot = ["9L7"];
	this.modData("Learnsets", "warpaintmorty").learnset.attention = ["9L13"];
	this.modData("Learnsets", "warpaintmorty").learnset.juice = ["9L17"];
	this.modData("Learnsets", "warpaintmorty").learnset.harden = ["9L22"];
	this.modData("Learnsets", "warpaintmorty").learnset.crush = ["9L26"];
	this.modData("Learnsets", "warpaintmorty").learnset.bloodpressure = ["9L30"];
	this.modData("Learnsets", "warpaintmorty").learnset.rush = ["9L34"];
	this.modData("Learnsets", "warpaintmorty").learnset.fiercelunge = ["9L37"];

	// Froopy Shloop Morty
	this.modData("Learnsets", "froopyshloopmorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "froopyshloopmorty").learnset.scuttle = ["9L1"];
	this.modData("Learnsets", "froopyshloopmorty").learnset.cough = ["9L9"];
	this.modData("Learnsets", "froopyshloopmorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "froopyshloopmorty").learnset.snub = ["9L18"];
	this.modData("Learnsets", "froopyshloopmorty").learnset.gooeydischarge = ["9L22"];
	this.modData("Learnsets", "froopyshloopmorty").learnset.staticshock = ["9L26"];
	this.modData("Learnsets", "froopyshloopmorty").learnset.aerokinesis = ["9L30"];

	// Froopy Bloop Morty
	this.modData("Learnsets", "froopybloopmorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "froopybloopmorty").learnset.scuttle = ["9L1"];
	this.modData("Learnsets", "froopybloopmorty").learnset.cough = ["9L9"];
	this.modData("Learnsets", "froopybloopmorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "froopybloopmorty").learnset.snub = ["9L18"];
	this.modData("Learnsets", "froopybloopmorty").learnset.gooeydischarge = ["9L22"];
	this.modData("Learnsets", "froopybloopmorty").learnset.staticshock = ["9L26"];
	this.modData("Learnsets", "froopybloopmorty").learnset.aerokinesis = ["9L30"];
	this.modData("Learnsets", "froopybloopmorty").learnset.wrangle = ["9L34"];

	// Froopy Moop Morty
	this.modData("Learnsets", "froopymoopmorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "froopymoopmorty").learnset.scuttle = ["9L1"];
	this.modData("Learnsets", "froopymoopmorty").learnset.cough = ["9L9"];
	this.modData("Learnsets", "froopymoopmorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "froopymoopmorty").learnset.snub = ["9L18"];
	this.modData("Learnsets", "froopymoopmorty").learnset.gooeydischarge = ["9L22"];
	this.modData("Learnsets", "froopymoopmorty").learnset.staticshock = ["9L26"];
	this.modData("Learnsets", "froopymoopmorty").learnset.aerokinesis = ["9L30"];
	this.modData("Learnsets", "froopymoopmorty").learnset.wrangle = ["9L34"];
	this.modData("Learnsets", "froopymoopmorty").learnset.exofragment = ["9L38"];

	// Mountain Sweater Morty
	this.modData("Learnsets", "mountainsweatermorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "mountainsweatermorty").learnset.dribble = ["9L5"];
	this.modData("Learnsets", "mountainsweatermorty").learnset.flail = ["9L9"];
	this.modData("Learnsets", "mountainsweatermorty").learnset.salivate = ["9L13"];
	this.modData("Learnsets", "mountainsweatermorty").learnset.drowse = ["9L17"];
	this.modData("Learnsets", "mountainsweatermorty").learnset.smooch = ["9L21"];
	this.modData("Learnsets", "mountainsweatermorty").learnset.hibernate = ["9L25"];
	this.modData("Learnsets", "mountainsweatermorty").learnset.nodoff = ["9L30"];
	this.modData("Learnsets", "mountainsweatermorty").learnset.doze = ["9L34"];
	this.modData("Learnsets", "mountainsweatermorty").learnset.recitation = ["9L39"];

	// Blocky Morty
	this.modData("Learnsets", "blockymorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "blockymorty").learnset.fortify = ["9L1"];
	this.modData("Learnsets", "blockymorty").learnset.breakin = ["9L7"];
	this.modData("Learnsets", "blockymorty").learnset.stonefists = ["9L11"];
	this.modData("Learnsets", "blockymorty").learnset.grab = ["9L16"];
	this.modData("Learnsets", "blockymorty").learnset.jab = ["9L20"];
	this.modData("Learnsets", "blockymorty").learnset.protect = ["9L24"];
	this.modData("Learnsets", "blockymorty").learnset.crush = ["9L29"];
	this.modData("Learnsets", "blockymorty").learnset.retainstrength = ["9L34"];
	this.modData("Learnsets", "blockymorty").learnset.mutate = ["9L41"];

	// Wonder Morty
	this.modData("Learnsets", "wondermorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "wondermorty").learnset.absorb = ["9L5"];
	this.modData("Learnsets", "wondermorty").learnset.reminisce = ["9L10"];
	this.modData("Learnsets", "wondermorty").learnset.blindswing = ["9L18"];
	this.modData("Learnsets", "wondermorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "wondermorty").learnset.shatter = ["9L26"];
	this.modData("Learnsets", "wondermorty").learnset.engulf = ["9L32"];
	this.modData("Learnsets", "wondermorty").learnset.ascend = ["9L36"];

	// Mighty Morty
	this.modData("Learnsets", "mightymorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "mightymorty").learnset.absorb = ["9L5"];
	this.modData("Learnsets", "mightymorty").learnset.reminisce = ["9L10"];
	this.modData("Learnsets", "mightymorty").learnset.blindswing = ["9L18"];
	this.modData("Learnsets", "mightymorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "mightymorty").learnset.shatter = ["9L26"];
	this.modData("Learnsets", "mightymorty").learnset.engulf = ["9L32"];
	this.modData("Learnsets", "mightymorty").learnset.ascend = ["9L36"];
	this.modData("Learnsets", "mightymorty").learnset.aura = ["9L42"];

	// The Dark Morty
	this.modData("Learnsets", "thedarkmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "thedarkmorty").learnset.absorb = ["9L5"];
	this.modData("Learnsets", "thedarkmorty").learnset.reminisce = ["9L10"];
	this.modData("Learnsets", "thedarkmorty").learnset.blindswing = ["9L18"];
	this.modData("Learnsets", "thedarkmorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "thedarkmorty").learnset.shatter = ["9L26"];
	this.modData("Learnsets", "thedarkmorty").learnset.engulf = ["9L32"];
	this.modData("Learnsets", "thedarkmorty").learnset.ascend = ["9L36"];
	this.modData("Learnsets", "thedarkmorty").learnset.aura = ["9L42"];
	this.modData("Learnsets", "thedarkmorty").learnset.supernova = ["9L45"];

	// Lil' Bits Morty
	this.modData("Learnsets", "lilbitsmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "lilbitsmorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "lilbitsmorty").learnset.snub = ["9L1"];
	this.modData("Learnsets", "lilbitsmorty").learnset.flail = ["9L12"];
	this.modData("Learnsets", "lilbitsmorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "lilbitsmorty").learnset.swing = ["9L22"];
	this.modData("Learnsets", "lilbitsmorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "lilbitsmorty").learnset.shrinkinggas = ["9L30"];
	this.modData("Learnsets", "lilbitsmorty").learnset.dinnertime = ["9L35"];
	this.modData("Learnsets", "lilbitsmorty").learnset.antbite = ["9L41"];

	// Season 3 Morty
	this.modData("Learnsets", "season3morty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "season3morty").learnset.medicate = ["9L1"];
	this.modData("Learnsets", "season3morty").learnset.brand = ["9L5"];
	this.modData("Learnsets", "season3morty").learnset.suitandboot = ["9L10"];
	this.modData("Learnsets", "season3morty").learnset.selfpromote = ["9L15"];
	this.modData("Learnsets", "season3morty").learnset.newwave = ["9L20"];
	this.modData("Learnsets", "season3morty").learnset.aura = ["9L25"];
	this.modData("Learnsets", "season3morty").learnset.energydrain = ["9L30"];
	this.modData("Learnsets", "season3morty").learnset.attention = ["9L35"];
	this.modData("Learnsets", "season3morty").learnset.outpour = ["9L40"];

	// Street Loco Morty
	this.modData("Learnsets", "streetlocomorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "streetlocomorty").learnset.sneer = ["9L5"];
	this.modData("Learnsets", "streetlocomorty").learnset.probe = ["9L10"];
	this.modData("Learnsets", "streetlocomorty").learnset.protect = ["9L18"];
	this.modData("Learnsets", "streetlocomorty").learnset.flair = ["9L23"];
	this.modData("Learnsets", "streetlocomorty").learnset.criticize = ["9L26"];
	this.modData("Learnsets", "streetlocomorty").learnset.cuttinggaze = ["9L32"];
	this.modData("Learnsets", "streetlocomorty").learnset.mortify = ["9L35"];

	// Soldado Loco Morty
	this.modData("Learnsets", "soldadolocomorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "soldadolocomorty").learnset.sneer = ["9L5"];
	this.modData("Learnsets", "soldadolocomorty").learnset.probe = ["9L10"];
	this.modData("Learnsets", "soldadolocomorty").learnset.protect = ["9L18"];
	this.modData("Learnsets", "soldadolocomorty").learnset.flair = ["9L23"];
	this.modData("Learnsets", "soldadolocomorty").learnset.criticize = ["9L26"];
	this.modData("Learnsets", "soldadolocomorty").learnset.cuttinggaze = ["9L32"];
	this.modData("Learnsets", "soldadolocomorty").learnset.mortify = ["9L35"];
	this.modData("Learnsets", "soldadolocomorty").learnset.punked = ["9L40"];

	// Enforcer Loco Morty
	this.modData("Learnsets", "enforcerlocomorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "enforcerlocomorty").learnset.sneer = ["9L5"];
	this.modData("Learnsets", "enforcerlocomorty").learnset.probe = ["9L10"];
	this.modData("Learnsets", "enforcerlocomorty").learnset.protect = ["9L18"];
	this.modData("Learnsets", "enforcerlocomorty").learnset.flair = ["9L23"];
	this.modData("Learnsets", "enforcerlocomorty").learnset.criticize = ["9L26"];
	this.modData("Learnsets", "enforcerlocomorty").learnset.cuttinggaze = ["9L32"];
	this.modData("Learnsets", "enforcerlocomorty").learnset.mortify = ["9L35"];
	this.modData("Learnsets", "enforcerlocomorty").learnset.punked = ["9L40"];
	this.modData("Learnsets", "enforcerlocomorty").learnset.effetecharm = ["9L44"];

	// Trunk Morty
	this.modData("Learnsets", "trunkmorty").learnset.solidify = ["9L1"];
	this.modData("Learnsets", "trunkmorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "trunkmorty").learnset.negativeenergy = ["9L8"];
	this.modData("Learnsets", "trunkmorty").learnset.vomit = ["9L13"];
	this.modData("Learnsets", "trunkmorty").learnset.gooeydischarge = ["9L17"];
	this.modData("Learnsets", "trunkmorty").learnset.grossout = ["9L22"];
	this.modData("Learnsets", "trunkmorty").learnset.vilespew = ["9L24"];
	this.modData("Learnsets", "trunkmorty").learnset.aura = ["9L30"];
	this.modData("Learnsets", "trunkmorty").learnset.poisonspit = ["9L35"];
	this.modData("Learnsets", "trunkmorty").learnset.vaccinate = ["9L41"];

	// Scaly Morty
	this.modData("Learnsets", "scalymorty").learnset.probe = ["9L1"];
	this.modData("Learnsets", "scalymorty").learnset.distract = ["9L1"];
	this.modData("Learnsets", "scalymorty").learnset.flail = ["9L7"];
	this.modData("Learnsets", "scalymorty").learnset.repress = ["9L9"];
	this.modData("Learnsets", "scalymorty").learnset.jab = ["9L14"];
	this.modData("Learnsets", "scalymorty").learnset.mortify = ["9L18"];
	this.modData("Learnsets", "scalymorty").learnset.invasion = ["9L25"];
	this.modData("Learnsets", "scalymorty").learnset.hypnotize = ["9L31"];
	this.modData("Learnsets", "scalymorty").learnset.mindmeld = ["9L34"];

	// Squid Face Morty
	this.modData("Learnsets", "squidfacemorty").learnset.soggykiss = ["9L1"];
	this.modData("Learnsets", "squidfacemorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "squidfacemorty").learnset.engulf = ["9L8"];
	this.modData("Learnsets", "squidfacemorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "squidfacemorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "squidfacemorty").learnset.fangrage = ["9L21"];
	this.modData("Learnsets", "squidfacemorty").learnset.splash = ["9L25"];
	this.modData("Learnsets", "squidfacemorty").learnset.rush = ["9L31"];

	// Tentacle Morty
	this.modData("Learnsets", "tentaclemorty").learnset.soggykiss = ["9L1"];
	this.modData("Learnsets", "tentaclemorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "tentaclemorty").learnset.engulf = ["9L8"];
	this.modData("Learnsets", "tentaclemorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "tentaclemorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "tentaclemorty").learnset.fangrage = ["9L21"];
	this.modData("Learnsets", "tentaclemorty").learnset.splash = ["9L25"];
	this.modData("Learnsets", "tentaclemorty").learnset.rush = ["9L31"];
	this.modData("Learnsets", "tentaclemorty").learnset.sing = ["9L35"];

	// Octo Morty
	this.modData("Learnsets", "octomorty").learnset.soggykiss = ["9L1"];
	this.modData("Learnsets", "octomorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "octomorty").learnset.engulf = ["9L8"];
	this.modData("Learnsets", "octomorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "octomorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "octomorty").learnset.fangrage = ["9L21"];
	this.modData("Learnsets", "octomorty").learnset.splash = ["9L25"];
	this.modData("Learnsets", "octomorty").learnset.rush = ["9L31"];
	this.modData("Learnsets", "octomorty").learnset.sing = ["9L35"];
	this.modData("Learnsets", "octomorty").learnset.supernova = ["9L42"];

	// Pumpkin Morty
	this.modData("Learnsets", "pumpkinmorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "pumpkinmorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "pumpkinmorty").learnset.sprout = ["9L1"];
	this.modData("Learnsets", "pumpkinmorty").learnset.flail = ["9L12"];
	this.modData("Learnsets", "pumpkinmorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "pumpkinmorty").learnset.swing = ["9L22"];
	this.modData("Learnsets", "pumpkinmorty").learnset.staredown = ["9L24"];
	this.modData("Learnsets", "pumpkinmorty").learnset.aura = ["9L30"];
	this.modData("Learnsets", "pumpkinmorty").learnset.claw = ["9L35"];
	this.modData("Learnsets", "pumpkinmorty").learnset.mangle = ["9L41"];

	// Scary Morty
	this.modData("Learnsets", "scarymorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "scarymorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "scarymorty").learnset.weardown = ["9L10"];
	this.modData("Learnsets", "scarymorty").learnset.probe = ["9L14"];
	this.modData("Learnsets", "scarymorty").learnset.retainstrength = ["9L18"];
	this.modData("Learnsets", "scarymorty").learnset.swing = ["9L21"];
	this.modData("Learnsets", "scarymorty").learnset.staredown = ["9L25"];
	this.modData("Learnsets", "scarymorty").learnset.scratchingpost = ["9L31"];
	this.modData("Learnsets", "scarymorty").learnset.mouthoff = ["9L35"];
	this.modData("Learnsets", "scarymorty").learnset.regenerate = ["9L40"];

	// Pre Atlantis Morty
	this.modData("Learnsets", "preatlantismorty").learnset.wettongue = ["9L1"];
	this.modData("Learnsets", "preatlantismorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "preatlantismorty").learnset.flair = ["9L8"];
	this.modData("Learnsets", "preatlantismorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "preatlantismorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "preatlantismorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "preatlantismorty").learnset.splash = ["9L25"];
	this.modData("Learnsets", "preatlantismorty").learnset.rush = ["9L31"];

	// Atlantis Morty
	this.modData("Learnsets", "atlantismorty").learnset.wettongue = ["9L1"];
	this.modData("Learnsets", "atlantismorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "atlantismorty").learnset.flair = ["9L8"];
	this.modData("Learnsets", "atlantismorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "atlantismorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "atlantismorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "atlantismorty").learnset.splash = ["9L25"];
	this.modData("Learnsets", "atlantismorty").learnset.rush = ["9L31"];
	this.modData("Learnsets", "atlantismorty").learnset.vilespew = ["9L35"];

	// Post Atlantis Morty
	this.modData("Learnsets", "postatlantismorty").learnset.wettongue = ["9L1"];
	this.modData("Learnsets", "postatlantismorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "postatlantismorty").learnset.flair = ["9L8"];
	this.modData("Learnsets", "postatlantismorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "postatlantismorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "postatlantismorty").learnset.crush = ["9L21"];
	this.modData("Learnsets", "postatlantismorty").learnset.splash = ["9L25"];
	this.modData("Learnsets", "postatlantismorty").learnset.rush = ["9L31"];
	this.modData("Learnsets", "postatlantismorty").learnset.vilespew = ["9L35"];
	this.modData("Learnsets", "postatlantismorty").learnset.darkvoid = ["9L42"];

	// Specs Morty
	this.modData("Learnsets", "specsmorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "specsmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "specsmorty").learnset.crimp = ["9L8"];
	this.modData("Learnsets", "specsmorty").learnset.provoke = ["9L10"];
	this.modData("Learnsets", "specsmorty").learnset.erase = ["9L15"];
	this.modData("Learnsets", "specsmorty").learnset.defend = ["9L20"];
	this.modData("Learnsets", "specsmorty").learnset.recitation = ["9L26"];
	this.modData("Learnsets", "specsmorty").learnset.pout = ["9L31"];
	this.modData("Learnsets", "specsmorty").learnset.bunt = ["9L34"];
	this.modData("Learnsets", "specsmorty").learnset.signautograph = ["9L39"];

	// Cult of Morty Morty
	this.modData("Learnsets", "cultofmortymorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "cultofmortymorty").learnset.mindread = ["9L1"];
	this.modData("Learnsets", "cultofmortymorty").learnset.negativeenergy = ["9L6"];
	this.modData("Learnsets", "cultofmortymorty").learnset.clarity = ["9L9"];
	this.modData("Learnsets", "cultofmortymorty").learnset.sparkle = ["9L13"];
	this.modData("Learnsets", "cultofmortymorty").learnset.sixsixsix = ["9L19"];
	this.modData("Learnsets", "cultofmortymorty").learnset.mortify = ["9L24"];
	this.modData("Learnsets", "cultofmortymorty").learnset.mindmeld = ["9L30"];

	// Cult Leader Morty
	this.modData("Learnsets", "cultleadermorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "cultleadermorty").learnset.mindread = ["9L1"];
	this.modData("Learnsets", "cultleadermorty").learnset.negativeenergy = ["9L6"];
	this.modData("Learnsets", "cultleadermorty").learnset.clarity = ["9L9"];
	this.modData("Learnsets", "cultleadermorty").learnset.sparkle = ["9L13"];
	this.modData("Learnsets", "cultleadermorty").learnset.sixsixsix = ["9L19"];
	this.modData("Learnsets", "cultleadermorty").learnset.mortify = ["9L24"];
	this.modData("Learnsets", "cultleadermorty").learnset.mindmeld = ["9L30"];
	this.modData("Learnsets", "cultleadermorty").learnset.hypnotize = ["9L35"];

	// Grand Sage Morty
	this.modData("Learnsets", "grandsagemorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "grandsagemorty").learnset.mindread = ["9L1"];
	this.modData("Learnsets", "grandsagemorty").learnset.negativeenergy = ["9L6"];
	this.modData("Learnsets", "grandsagemorty").learnset.clarity = ["9L9"];
	this.modData("Learnsets", "grandsagemorty").learnset.sparkle = ["9L13"];
	this.modData("Learnsets", "grandsagemorty").learnset.sixsixsix = ["9L19"];
	this.modData("Learnsets", "grandsagemorty").learnset.mortify = ["9L24"];
	this.modData("Learnsets", "grandsagemorty").learnset.mindmeld = ["9L30"];
	this.modData("Learnsets", "grandsagemorty").learnset.hypnotize = ["9L35"];
	this.modData("Learnsets", "grandsagemorty").learnset.fireball = ["9L41"];

	// Campaign Manager Morty
	this.modData("Learnsets", "campaignmanagermorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "campaignmanagermorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "campaignmanagermorty").learnset.suitandboot = ["9L8"];
	this.modData("Learnsets", "campaignmanagermorty").learnset.staredown = ["9L13"];
	this.modData("Learnsets", "campaignmanagermorty").learnset.rush = ["9L18"];
	this.modData("Learnsets", "campaignmanagermorty").learnset.selfpromote = ["9L23"];
	this.modData("Learnsets", "campaignmanagermorty").learnset.juice = ["9L27"];
	this.modData("Learnsets", "campaignmanagermorty").learnset.bloodpressure = ["9L32"];
	this.modData("Learnsets", "campaignmanagermorty").learnset.nickelanddime = ["9L37"];

	// Left Handed Morty
	this.modData("Learnsets", "lefthandedmorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "lefthandedmorty").learnset.fixerupper = ["9L6"];
	this.modData("Learnsets", "lefthandedmorty").learnset.flail = ["9L9"];
	this.modData("Learnsets", "lefthandedmorty").learnset.examine = ["9L13"];
	this.modData("Learnsets", "lefthandedmorty").learnset.scrunch = ["9L17"];
	this.modData("Learnsets", "lefthandedmorty").learnset.bunt = ["9L22"];
	this.modData("Learnsets", "lefthandedmorty").learnset.grossout = ["9L24"];
	this.modData("Learnsets", "lefthandedmorty").learnset.smooch = ["9L30"];
	this.modData("Learnsets", "lefthandedmorty").learnset.humiliate = ["9L35"];
	this.modData("Learnsets", "lefthandedmorty").learnset.ironout = ["9L41"];

	// Ronin Morty
	this.modData("Learnsets", "roninmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "roninmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "roninmorty").learnset.weardown = ["9L10"];
	this.modData("Learnsets", "roninmorty").learnset.cellsplitter = ["9L14"];
	this.modData("Learnsets", "roninmorty").learnset.retainstrength = ["9L18"];
	this.modData("Learnsets", "roninmorty").learnset.vaporize = ["9L21"];
	this.modData("Learnsets", "roninmorty").learnset.deathstare = ["9L25"];
	this.modData("Learnsets", "roninmorty").learnset.staredown = ["9L31"];

	// Samurai Morty
	this.modData("Learnsets", "samuraimorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "samuraimorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "samuraimorty").learnset.weardown = ["9L10"];
	this.modData("Learnsets", "samuraimorty").learnset.cellsplitter = ["9L14"];
	this.modData("Learnsets", "samuraimorty").learnset.retainstrength = ["9L18"];
	this.modData("Learnsets", "samuraimorty").learnset.vaporize = ["9L21"];
	this.modData("Learnsets", "samuraimorty").learnset.deathstare = ["9L25"];
	this.modData("Learnsets", "samuraimorty").learnset.staredown = ["9L31"];
	this.modData("Learnsets", "samuraimorty").learnset.piercingstare = ["9L35"];

	// Shogun Morty
	this.modData("Learnsets", "shogunmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "shogunmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "shogunmorty").learnset.weardown = ["9L10"];
	this.modData("Learnsets", "shogunmorty").learnset.cellsplitter = ["9L14"];
	this.modData("Learnsets", "shogunmorty").learnset.retainstrength = ["9L18"];
	this.modData("Learnsets", "shogunmorty").learnset.vaporize = ["9L21"];
	this.modData("Learnsets", "shogunmorty").learnset.deathstare = ["9L25"];
	this.modData("Learnsets", "shogunmorty").learnset.staredown = ["9L31"];
	this.modData("Learnsets", "shogunmorty").learnset.piercingstare = ["9L35"];
	this.modData("Learnsets", "shogunmorty").learnset.fiercelunge = ["9L40"];

	// Cop Morty
	this.modData("Learnsets", "copmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "copmorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "copmorty").learnset.blindswing = ["9L5"];
	this.modData("Learnsets", "copmorty").learnset.staredown = ["9L8"];
	this.modData("Learnsets", "copmorty").learnset.bloodpressure = ["9L14"];
	this.modData("Learnsets", "copmorty").learnset.cuttinggaze = ["9L21"];
	this.modData("Learnsets", "copmorty").learnset.extort = ["9L31"];
	this.modData("Learnsets", "copmorty").learnset.nodoff = ["9L35"];
	this.modData("Learnsets", "copmorty").learnset.humiliate = ["9L39"];
	this.modData("Learnsets", "copmorty").learnset.invasion = ["9L41"];

	// Stool Morty
	this.modData("Learnsets", "stoolmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "stoolmorty").learnset.criticize = ["9L1"];
	this.modData("Learnsets", "stoolmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "stoolmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "stoolmorty").learnset.caress = ["9L14"];
	this.modData("Learnsets", "stoolmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "stoolmorty").learnset.crush = ["9L24"];
	this.modData("Learnsets", "stoolmorty").learnset.wrangle = ["9L29"];

	// Wooden Chair Morty
	this.modData("Learnsets", "woodenchairmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "woodenchairmorty").learnset.criticize = ["9L1"];
	this.modData("Learnsets", "woodenchairmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "woodenchairmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "woodenchairmorty").learnset.caress = ["9L14"];
	this.modData("Learnsets", "woodenchairmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "woodenchairmorty").learnset.crush = ["9L24"];
	this.modData("Learnsets", "woodenchairmorty").learnset.wrangle = ["9L29"];
	this.modData("Learnsets", "woodenchairmorty").learnset.wedgie = ["9L34"];

	// Arm Chair Morty
	this.modData("Learnsets", "armchairmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "armchairmorty").learnset.criticize = ["9L1"];
	this.modData("Learnsets", "armchairmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "armchairmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "armchairmorty").learnset.caress = ["9L14"];
	this.modData("Learnsets", "armchairmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "armchairmorty").learnset.crush = ["9L24"];
	this.modData("Learnsets", "armchairmorty").learnset.wrangle = ["9L29"];
	this.modData("Learnsets", "armchairmorty").learnset.wedgie = ["9L34"];
	this.modData("Learnsets", "armchairmorty").learnset.straightedge = ["9L38"];

	// Turkey Morty
	this.modData("Learnsets", "turkeymorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "turkeymorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "turkeymorty").learnset.provoke = ["9L9"];
	this.modData("Learnsets", "turkeymorty").learnset.dig = ["9L13"];
	this.modData("Learnsets", "turkeymorty").learnset.puffytail = ["9L17"];
	this.modData("Learnsets", "turkeymorty").learnset.bunt = ["9L22"];
	this.modData("Learnsets", "turkeymorty").learnset.snub = ["9L24"];
	this.modData("Learnsets", "turkeymorty").learnset.cuttinggaze = ["9L30"];
	this.modData("Learnsets", "turkeymorty").learnset.hypnotize = ["9L34"];
	this.modData("Learnsets", "turkeymorty").learnset.wingblast = ["9L39"];

	// Pilgrim Morty
	this.modData("Learnsets", "pilgrimmorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "pilgrimmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "pilgrimmorty").learnset.machinewash = ["9L7"];
	this.modData("Learnsets", "pilgrimmorty").learnset.weardown = ["9L12"];
	this.modData("Learnsets", "pilgrimmorty").learnset.smooch = ["9L16"];
	this.modData("Learnsets", "pilgrimmorty").learnset.pout = ["9L20"];
	this.modData("Learnsets", "pilgrimmorty").learnset.lasso = ["9L25"];
	this.modData("Learnsets", "pilgrimmorty").learnset.wedgie = ["9L29"];
	this.modData("Learnsets", "pilgrimmorty").learnset.aura = ["9L33"];
	this.modData("Learnsets", "pilgrimmorty").learnset.piercingstare = ["9L38"];

	// Good Time Morty
	this.modData("Learnsets", "goodtimemorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "goodtimemorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "goodtimemorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "goodtimemorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "goodtimemorty").learnset.blowdry = ["9L14"];
	this.modData("Learnsets", "goodtimemorty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "goodtimemorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "goodtimemorty").learnset.mindmeld = ["9L31"];

	// Construction Dancer Morty
	this.modData("Learnsets", "constructiondancermorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "constructiondancermorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "constructiondancermorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "constructiondancermorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "constructiondancermorty").learnset.blowdry = ["9L14"];
	this.modData("Learnsets", "constructiondancermorty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "constructiondancermorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "constructiondancermorty").learnset.mindmeld = ["9L31"];
	this.modData("Learnsets", "constructiondancermorty").learnset.staredown = ["9L35"];

	// Cowboy Dancer Morty
	this.modData("Learnsets", "cowboydancermorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "cowboydancermorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "cowboydancermorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "cowboydancermorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "cowboydancermorty").learnset.blowdry = ["9L14"];
	this.modData("Learnsets", "cowboydancermorty").learnset.rush = ["9L19"];
	this.modData("Learnsets", "cowboydancermorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "cowboydancermorty").learnset.mindmeld = ["9L31"];
	this.modData("Learnsets", "cowboydancermorty").learnset.staredown = ["9L35"];
	this.modData("Learnsets", "cowboydancermorty").learnset.unleash = ["9L39"];

	// Slick Morty
	this.modData("Learnsets", "slickmorty").learnset.scrunch = ["9L1"];
	this.modData("Learnsets", "slickmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "slickmorty").learnset.suitandboot = ["9L8"];
	this.modData("Learnsets", "slickmorty").learnset.staredown = ["9L13"];
	this.modData("Learnsets", "slickmorty").learnset.rush = ["9L18"];
	this.modData("Learnsets", "slickmorty").learnset.snub = ["9L23"];
	this.modData("Learnsets", "slickmorty").learnset.piercingstare = ["9L27"];
	this.modData("Learnsets", "slickmorty").learnset.bloodpressure = ["9L32"];
	this.modData("Learnsets", "slickmorty").learnset.ironout = ["9L37"];

	// Christmas Sweater Morty
	this.modData("Learnsets", "christmassweatermorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "christmassweatermorty").learnset.dribble = ["9L1"];
	this.modData("Learnsets", "christmassweatermorty").learnset.hug = ["9L8"];
	this.modData("Learnsets", "christmassweatermorty").learnset.preach = ["9L12"];
	this.modData("Learnsets", "christmassweatermorty").learnset.rickytikkitavi = ["9L17"];
	this.modData("Learnsets", "christmassweatermorty").learnset.certitude = ["9L23"];
	this.modData("Learnsets", "christmassweatermorty").learnset.mortify = ["9L28"];
	this.modData("Learnsets", "christmassweatermorty").learnset.selfie = ["9L32"];

	// Elf Morty
	this.modData("Learnsets", "elfmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "elfmorty").learnset.dribble = ["9L1"];
	this.modData("Learnsets", "elfmorty").learnset.hug = ["9L8"];
	this.modData("Learnsets", "elfmorty").learnset.preach = ["9L12"];
	this.modData("Learnsets", "elfmorty").learnset.rickytikkitavi = ["9L17"];
	this.modData("Learnsets", "elfmorty").learnset.certitude = ["9L23"];
	this.modData("Learnsets", "elfmorty").learnset.mortify = ["9L28"];
	this.modData("Learnsets", "elfmorty").learnset.selfie = ["9L32"];
	this.modData("Learnsets", "elfmorty").learnset.regenerate = ["9L37"];

	// Santa Morty
	this.modData("Learnsets", "santamorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "santamorty").learnset.dribble = ["9L1"];
	this.modData("Learnsets", "santamorty").learnset.hug = ["9L8"];
	this.modData("Learnsets", "santamorty").learnset.preach = ["9L12"];
	this.modData("Learnsets", "santamorty").learnset.rickytikkitavi = ["9L17"];
	this.modData("Learnsets", "santamorty").learnset.certitude = ["9L23"];
	this.modData("Learnsets", "santamorty").learnset.mortify = ["9L28"];
	this.modData("Learnsets", "santamorty").learnset.selfie = ["9L32"];
	this.modData("Learnsets", "santamorty").learnset.regenerate = ["9L37"];
	this.modData("Learnsets", "santamorty").learnset.signautograph = ["9L44"];

	// Snowman Morty
	this.modData("Learnsets", "snowmanmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "snowmanmorty").learnset.absorb = ["9L5"];
	this.modData("Learnsets", "snowmanmorty").learnset.stonegaze = ["9L10"];
	this.modData("Learnsets", "snowmanmorty").learnset.vaporize = ["9L18"];
	this.modData("Learnsets", "snowmanmorty").learnset.harden = ["9L23"];
	this.modData("Learnsets", "snowmanmorty").learnset.thaw = ["9L28"];
	this.modData("Learnsets", "snowmanmorty").learnset.brainfreeze = ["9L34"];
	this.modData("Learnsets", "snowmanmorty").learnset.aura = ["9L38"];
	this.modData("Learnsets", "snowmanmorty").learnset.goldentouch = ["9L42"];

	// Krampus Morty
	this.modData("Learnsets", "krampusmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "krampusmorty").learnset.mope = ["9L1"];
	this.modData("Learnsets", "krampusmorty").learnset.cry = ["9L7"];
	this.modData("Learnsets", "krampusmorty").learnset.probe = ["9L9"];
	this.modData("Learnsets", "krampusmorty").learnset.flowerchild = ["9L13"];
	this.modData("Learnsets", "krampusmorty").learnset.blink = ["9L16"];
	this.modData("Learnsets", "krampusmorty").learnset.effetecharm = ["9L22"];
	this.modData("Learnsets", "krampusmorty").learnset.denial = ["9L30"];
	this.modData("Learnsets", "krampusmorty").learnset.grieve = ["9L38"];
	this.modData("Learnsets", "krampusmorty").learnset.soulsearch = ["9L41"];

	// Butt Face Morty
	this.modData("Learnsets", "buttfacemorty").learnset.harden = ["9L1"];
	this.modData("Learnsets", "buttfacemorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "buttfacemorty").learnset.grossout = ["9L8"];
	this.modData("Learnsets", "buttfacemorty").learnset.soggykiss = ["9L11"];
	this.modData("Learnsets", "buttfacemorty").learnset.haunt = ["9L16"];
	this.modData("Learnsets", "buttfacemorty").learnset.gooeydischarge = ["9L21"];
	this.modData("Learnsets", "buttfacemorty").learnset.smooch = ["9L25"];
	this.modData("Learnsets", "buttfacemorty").learnset.bloodpressure = ["9L31"];
	this.modData("Learnsets", "buttfacemorty").learnset.mutate = ["9L36"];
	this.modData("Learnsets", "buttfacemorty").learnset.slobber = ["9L42"];

	// VR Morty
	this.modData("Learnsets", "vrmorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "vrmorty").learnset.grab = ["9L1"];
	this.modData("Learnsets", "vrmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "vrmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "vrmorty").learnset.swing = ["9L14"];
	this.modData("Learnsets", "vrmorty").learnset.mortify = ["9L19"];
	this.modData("Learnsets", "vrmorty").learnset.bunt = ["9L26"];
	this.modData("Learnsets", "vrmorty").learnset.compute = ["9L32"];
	this.modData("Learnsets", "vrmorty").learnset.darkvoid = ["9L38"];

	// Ball Drop Morty
	this.modData("Learnsets", "balldropmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "balldropmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "balldropmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "balldropmorty").learnset.glitterblast = ["9L10"];
	this.modData("Learnsets", "balldropmorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "balldropmorty").learnset.newwave = ["9L19"];
	this.modData("Learnsets", "balldropmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "balldropmorty").learnset.regenerate = ["9L31"];
	this.modData("Learnsets", "balldropmorty").learnset.loveyourself = ["9L35"];
	this.modData("Learnsets", "balldropmorty").learnset.reboot = ["9L39"];

	// New Year's Morty
	this.modData("Learnsets", "newyearsmorty").learnset.flair = ["9L1"];
	this.modData("Learnsets", "newyearsmorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "newyearsmorty").learnset.clarity = ["9L12"];
	this.modData("Learnsets", "newyearsmorty").learnset.lovebug = ["9L14"];
	this.modData("Learnsets", "newyearsmorty").learnset.pout = ["9L18"];
	this.modData("Learnsets", "newyearsmorty").learnset.newwave = ["9L23"];
	this.modData("Learnsets", "newyearsmorty").learnset.energydrain = ["9L30"];
	this.modData("Learnsets", "newyearsmorty").learnset.glitterblast = ["9L37"];
	this.modData("Learnsets", "newyearsmorty").learnset.reboot = ["9L44"];

	// Grinder Morty
	this.modData("Learnsets", "grindermorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "grindermorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "grindermorty").learnset.caress = ["9L6"];
	this.modData("Learnsets", "grindermorty").learnset.chastise = ["9L9"];
	this.modData("Learnsets", "grindermorty").learnset.smooch = ["9L12"];
	this.modData("Learnsets", "grindermorty").learnset.pillage = ["9L15"];
	this.modData("Learnsets", "grindermorty").learnset.grab = ["9L17"];
	this.modData("Learnsets", "grindermorty").learnset.hypnotize = ["9L30"];
	this.modData("Learnsets", "grindermorty").learnset.loveyourself = ["9L34"];
	this.modData("Learnsets", "grindermorty").learnset.monetize = ["9L40"];

	// Friendly Morty
	this.modData("Learnsets", "friendlymorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "friendlymorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "friendlymorty").learnset.spar = ["9L5"];
	this.modData("Learnsets", "friendlymorty").learnset.lovebug = ["9L10"];
	this.modData("Learnsets", "friendlymorty").learnset.stonefists = ["9L15"];
	this.modData("Learnsets", "friendlymorty").learnset.sparkle = ["9L22"];
	this.modData("Learnsets", "friendlymorty").learnset.hornswoggle = ["9L30"];
	this.modData("Learnsets", "friendlymorty").learnset.straightedge = ["9L38"];
	this.modData("Learnsets", "friendlymorty").learnset.soulsearch = ["9L40"];

	// Hunter Morty
	this.modData("Learnsets", "huntermorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "huntermorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "huntermorty").learnset.swing = ["9L7"];
	this.modData("Learnsets", "huntermorty").learnset.salivate = ["9L12"];
	this.modData("Learnsets", "huntermorty").learnset.staredown = ["9L19"];
	this.modData("Learnsets", "huntermorty").learnset.spear = ["9L23"];
	this.modData("Learnsets", "huntermorty").learnset.clawsout = ["9L28"];
	this.modData("Learnsets", "huntermorty").learnset.doze = ["9L34"];
	this.modData("Learnsets", "huntermorty").learnset.mindmeld = ["9L41"];

	// Box Morty
	this.modData("Learnsets", "boxmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "boxmorty").learnset.crease = ["9L1"];
	this.modData("Learnsets", "boxmorty").learnset.breakin = ["9L7"];
	this.modData("Learnsets", "boxmorty").learnset.protect = ["9L9"];
	this.modData("Learnsets", "boxmorty").learnset.nodoff = ["9L13"];
	this.modData("Learnsets", "boxmorty").learnset.weardown = ["9L16"];
	this.modData("Learnsets", "boxmorty").learnset.ironout = ["9L22"];
	this.modData("Learnsets", "boxmorty").learnset.humiliate = ["9L30"];
	this.modData("Learnsets", "boxmorty").learnset.fortify = ["9L33"];
	this.modData("Learnsets", "boxmorty").learnset.fanart = ["9L47"];

	// SEAL Morty
	this.modData("Learnsets", "sealmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "sealmorty").learnset.distract = ["9L1"];
	this.modData("Learnsets", "sealmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "sealmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "sealmorty").learnset.swing = ["9L18"];
	this.modData("Learnsets", "sealmorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "sealmorty").learnset.invasion = ["9L31"];
	this.modData("Learnsets", "sealmorty").learnset.defend = ["9L40"];
	this.modData("Learnsets", "sealmorty").learnset.mindmeld = ["9L48"];

	// Pancake Morty
	this.modData("Learnsets", "pancakemorty").learnset.dribble = ["9L1"];
	this.modData("Learnsets", "pancakemorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "pancakemorty").learnset.crush = ["9L12"];
	this.modData("Learnsets", "pancakemorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "pancakemorty").learnset.sliceanddice = ["9L22"];
	this.modData("Learnsets", "pancakemorty").learnset.defend = ["9L26"];
	this.modData("Learnsets", "pancakemorty").learnset.thaw = ["9L30"];
	this.modData("Learnsets", "pancakemorty").learnset.juice = ["9L40"];
	this.modData("Learnsets", "pancakemorty").learnset.goldentouch = ["9L45"];

	// Washington Morty
	this.modData("Learnsets", "washingtonmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "washingtonmorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "washingtonmorty").learnset.deathstare = ["9L13"];
	this.modData("Learnsets", "washingtonmorty").learnset.piercingstare = ["9L19"];
	this.modData("Learnsets", "washingtonmorty").learnset.sliceanddice = ["9L28"];
	this.modData("Learnsets", "washingtonmorty").learnset.snub = ["9L36"];
	this.modData("Learnsets", "washingtonmorty").learnset.thaw = ["9L40"];
	this.modData("Learnsets", "washingtonmorty").learnset.fortify = ["9L43"];
	this.modData("Learnsets", "washingtonmorty").learnset.ironout = ["9L48"];

	// Bartender Morty
	this.modData("Learnsets", "bartendermorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "bartendermorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "bartendermorty").learnset.crimp = ["9L8"];
	this.modData("Learnsets", "bartendermorty").learnset.provoke = ["9L10"];
	this.modData("Learnsets", "bartendermorty").learnset.party = ["9L15"];
	this.modData("Learnsets", "bartendermorty").learnset.defend = ["9L20"];
	this.modData("Learnsets", "bartendermorty").learnset.pout = ["9L26"];
	this.modData("Learnsets", "bartendermorty").learnset.servingup = ["9L31"];
	this.modData("Learnsets", "bartendermorty").learnset.bunt = ["9L34"];
	this.modData("Learnsets", "bartendermorty").learnset.straightedge = ["9L39"];

	// Froopy Land Morty
	this.modData("Learnsets", "froopylandmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "froopylandmorty").learnset.scuttle = ["9L1"];
	this.modData("Learnsets", "froopylandmorty").learnset.cough = ["9L9"];
	this.modData("Learnsets", "froopylandmorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "froopylandmorty").learnset.snub = ["9L18"];
	this.modData("Learnsets", "froopylandmorty").learnset.mindrage = ["9L22"];
	this.modData("Learnsets", "froopylandmorty").learnset.staticshock = ["9L26"];
	this.modData("Learnsets", "froopylandmorty").learnset.aerokinesis = ["9L30"];
	this.modData("Learnsets", "froopylandmorty").learnset.wrangle = ["9L34"];
	this.modData("Learnsets", "froopylandmorty").learnset.mindmeld = ["9L38"];

	// Purge Morty
	this.modData("Learnsets", "purgemorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "purgemorty").learnset.gforce = ["9L1"];
	this.modData("Learnsets", "purgemorty").learnset.vaporize = ["9L5"];
	this.modData("Learnsets", "purgemorty").learnset.mindread = ["9L10"];
	this.modData("Learnsets", "purgemorty").learnset.newwave = ["9L16"];
	this.modData("Learnsets", "purgemorty").learnset.recitation = ["9L22"];
	this.modData("Learnsets", "purgemorty").learnset.inferno = ["9L27"];
	this.modData("Learnsets", "purgemorty").learnset.quickdraw = ["9L33"];

	// Purge Suit Morty
	this.modData("Learnsets", "purgesuitmorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "purgesuitmorty").learnset.gforce = ["9L1"];
	this.modData("Learnsets", "purgesuitmorty").learnset.vaporize = ["9L5"];
	this.modData("Learnsets", "purgesuitmorty").learnset.mindread = ["9L10"];
	this.modData("Learnsets", "purgesuitmorty").learnset.newwave = ["9L16"];
	this.modData("Learnsets", "purgesuitmorty").learnset.recitation = ["9L22"];
	this.modData("Learnsets", "purgesuitmorty").learnset.inferno = ["9L27"];
	this.modData("Learnsets", "purgesuitmorty").learnset.quickdraw = ["9L33"];
	this.modData("Learnsets", "purgesuitmorty").learnset.soulsearch = ["9L39"];

	// St Patrick Morty
	this.modData("Learnsets", "stpatrickmorty").learnset.flair = ["9L1"];
	this.modData("Learnsets", "stpatrickmorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "stpatrickmorty").learnset.stonegaze = ["9L12"];
	this.modData("Learnsets", "stpatrickmorty").learnset.lovebug = ["9L18"];
	this.modData("Learnsets", "stpatrickmorty").learnset.pout = ["9L14"];
	this.modData("Learnsets", "stpatrickmorty").learnset.newwave = ["9L23"];
	this.modData("Learnsets", "stpatrickmorty").learnset.loveyourself = ["9L30"];
	this.modData("Learnsets", "stpatrickmorty").learnset.flutter = ["9L37"];
	this.modData("Learnsets", "stpatrickmorty").learnset.goldentouch = ["9L44"];

	// Cob Morty
	this.modData("Learnsets", "cobmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "cobmorty").learnset.sneer = ["9L5"];
	this.modData("Learnsets", "cobmorty").learnset.probe = ["9L10"];
	this.modData("Learnsets", "cobmorty").learnset.protect = ["9L18"];
	this.modData("Learnsets", "cobmorty").learnset.flair = ["9L23"];
	this.modData("Learnsets", "cobmorty").learnset.sprout = ["9L26"];
	this.modData("Learnsets", "cobmorty").learnset.mindrage = ["9L32"];
	this.modData("Learnsets", "cobmorty").learnset.mortify = ["9L35"];
	this.modData("Learnsets", "cobmorty").learnset.punked = ["9L40"];

	// Gangster Cob Morty
	this.modData("Learnsets", "gangstercobmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "gangstercobmorty").learnset.sneer = ["9L5"];
	this.modData("Learnsets", "gangstercobmorty").learnset.probe = ["9L10"];
	this.modData("Learnsets", "gangstercobmorty").learnset.protect = ["9L18"];
	this.modData("Learnsets", "gangstercobmorty").learnset.flair = ["9L23"];
	this.modData("Learnsets", "gangstercobmorty").learnset.sprout = ["9L26"];
	this.modData("Learnsets", "gangstercobmorty").learnset.mindrage = ["9L32"];
	this.modData("Learnsets", "gangstercobmorty").learnset.mortify = ["9L35"];
	this.modData("Learnsets", "gangstercobmorty").learnset.punked = ["9L40"];
	this.modData("Learnsets", "gangstercobmorty").learnset.reboot = ["9L44"];

	// Ants in my Eyes Morty
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.burn = ["9L8"];
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.blindswing = ["9L13"];
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.moisten = ["9L17"];
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.recitation = ["9L23"];
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.blink = ["9L26"];
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.mutate = ["9L31"];
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.staredown = ["9L35"];
	this.modData("Learnsets", "antsinmyeyesmorty").learnset.piercingstare = ["9L42"];

	// Easter Egg Morty
	this.modData("Learnsets", "eastereggmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "eastereggmorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "eastereggmorty").learnset.sprout = ["9L1"];
	this.modData("Learnsets", "eastereggmorty").learnset.flail = ["9L12"];
	this.modData("Learnsets", "eastereggmorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "eastereggmorty").learnset.wettongue = ["9L22"];
	this.modData("Learnsets", "eastereggmorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "eastereggmorty").learnset.servingup = ["9L30"];
	this.modData("Learnsets", "eastereggmorty").learnset.dinnertime = ["9L35"];

	// Chick Morty
	this.modData("Learnsets", "chickmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "chickmorty").learnset.bunchup = ["9L1"];
	this.modData("Learnsets", "chickmorty").learnset.sprout = ["9L1"];
	this.modData("Learnsets", "chickmorty").learnset.flail = ["9L12"];
	this.modData("Learnsets", "chickmorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "chickmorty").learnset.wettongue = ["9L22"];
	this.modData("Learnsets", "chickmorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "chickmorty").learnset.servingup = ["9L30"];
	this.modData("Learnsets", "chickmorty").learnset.dinnertime = ["9L35"];
	this.modData("Learnsets", "chickmorty").learnset.goldentouch = ["9L41"];

	// Resurrected Morty
	this.modData("Learnsets", "resurrectedmorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "resurrectedmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "resurrectedmorty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "resurrectedmorty").learnset.energydrain = ["9L10"];
	this.modData("Learnsets", "resurrectedmorty").learnset.negativeenergy = ["9L14"];
	this.modData("Learnsets", "resurrectedmorty").learnset.clarity = ["9L19"];
	this.modData("Learnsets", "resurrectedmorty").learnset.grossout = ["9L25"];
	this.modData("Learnsets", "resurrectedmorty").learnset.ouija = ["9L31"];
	this.modData("Learnsets", "resurrectedmorty").learnset.regenerate = ["9L38"];
	this.modData("Learnsets", "resurrectedmorty").learnset.mindmeld = ["9L43"];

	// Roller Disco Morty
	this.modData("Learnsets", "rollerdiscomorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "rollerdiscomorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "rollerdiscomorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "rollerdiscomorty").learnset.glitterblast = ["9L10"];
	this.modData("Learnsets", "rollerdiscomorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "rollerdiscomorty").learnset.deathstare = ["9L19"];
	this.modData("Learnsets", "rollerdiscomorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "rollerdiscomorty").learnset.fiercelunge = ["9L31"];
	this.modData("Learnsets", "rollerdiscomorty").learnset.grab = ["9L35"];

	// Roller Derby Morty
	this.modData("Learnsets", "rollerderbymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "rollerderbymorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "rollerderbymorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "rollerderbymorty").learnset.glitterblast = ["9L10"];
	this.modData("Learnsets", "rollerderbymorty").learnset.energydrain = ["9L14"];
	this.modData("Learnsets", "rollerderbymorty").learnset.deathstare = ["9L19"];
	this.modData("Learnsets", "rollerderbymorty").learnset.mortify = ["9L25"];
	this.modData("Learnsets", "rollerderbymorty").learnset.fiercelunge = ["9L31"];
	this.modData("Learnsets", "rollerderbymorty").learnset.grab = ["9L35"];
	this.modData("Learnsets", "rollerderbymorty").learnset.moodkill = ["9L39"];

	// Loo Roll Morty
	this.modData("Learnsets", "loorollmorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "loorollmorty").learnset.moisten = ["9L5"];
	this.modData("Learnsets", "loorollmorty").learnset.dig = ["9L9"];
	this.modData("Learnsets", "loorollmorty").learnset.strengthen = ["9L13"];
	this.modData("Learnsets", "loorollmorty").learnset.party = ["9L17"];
	this.modData("Learnsets", "loorollmorty").learnset.fortify = ["9L21"];
	this.modData("Learnsets", "loorollmorty").learnset.soulsearch = ["9L25"];
	this.modData("Learnsets", "loorollmorty").learnset.hornswoggle = ["9L30"];
	this.modData("Learnsets", "loorollmorty").learnset.juice = ["9L35"];
	this.modData("Learnsets", "loorollmorty").learnset.outpour = ["9L39"];

	// Doctor Morty
	this.modData("Learnsets", "doctormorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "doctormorty").learnset.examine = ["9L5"];
	this.modData("Learnsets", "doctormorty").learnset.cough = ["9L10"];
	this.modData("Learnsets", "doctormorty").learnset.medicate = ["9L18"];
	this.modData("Learnsets", "doctormorty").learnset.probe = ["9L23"];
	this.modData("Learnsets", "doctormorty").learnset.grossout = ["9L27"];
	this.modData("Learnsets", "doctormorty").learnset.jab = ["9L32"];
	this.modData("Learnsets", "doctormorty").learnset.bloodpressure = ["9L37"];
	this.modData("Learnsets", "doctormorty").learnset.effetecharm = ["9L42"];

	// Surgeon Morty
	this.modData("Learnsets", "surgeonmorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "surgeonmorty").learnset.examine = ["9L5"];
	this.modData("Learnsets", "surgeonmorty").learnset.cough = ["9L10"];
	this.modData("Learnsets", "surgeonmorty").learnset.medicate = ["9L18"];
	this.modData("Learnsets", "surgeonmorty").learnset.probe = ["9L23"];
	this.modData("Learnsets", "surgeonmorty").learnset.grossout = ["9L27"];
	this.modData("Learnsets", "surgeonmorty").learnset.jab = ["9L32"];
	this.modData("Learnsets", "surgeonmorty").learnset.bloodpressure = ["9L37"];
	this.modData("Learnsets", "surgeonmorty").learnset.effetecharm = ["9L42"];
	this.modData("Learnsets", "surgeonmorty").learnset.immunization = ["9L46"];

	// Car Morty
	this.modData("Learnsets", "carmorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "carmorty").learnset.strengthen = ["9L1"];
	this.modData("Learnsets", "carmorty").learnset.negativeenergy = ["9L5"];
	this.modData("Learnsets", "carmorty").learnset.pillage = ["9L10"];
	this.modData("Learnsets", "carmorty").learnset.redmist = ["9L15"];
	this.modData("Learnsets", "carmorty").learnset.weardown = ["9L20"];
	this.modData("Learnsets", "carmorty").learnset.beam = ["9L25"];
	this.modData("Learnsets", "carmorty").learnset.regenerate = ["9L30"];
	this.modData("Learnsets", "carmorty").learnset.mangle = ["9L40"];

	// Funny Morty
	this.modData("Learnsets", "funnymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "funnymorty").learnset.snub = ["9L1"];
	this.modData("Learnsets", "funnymorty").learnset.jab = ["9L5"];
	this.modData("Learnsets", "funnymorty").learnset.mortify = ["9L10"];
	this.modData("Learnsets", "funnymorty").learnset.recitation = ["9L15"];
	this.modData("Learnsets", "funnymorty").learnset.signautograph = ["9L20"];
	this.modData("Learnsets", "funnymorty").learnset.mouthoff = ["9L25"];
	this.modData("Learnsets", "funnymorty").learnset.selfpromote = ["9L30"];
	this.modData("Learnsets", "funnymorty").learnset.unleash = ["9L40"];

	// Yankee Doodle Morty
	this.modData("Learnsets", "yankeedoodlemorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "yankeedoodlemorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "yankeedoodlemorty").learnset.blindswing = ["9L5"];
	this.modData("Learnsets", "yankeedoodlemorty").learnset.stonefists = ["9L10"];
	this.modData("Learnsets", "yankeedoodlemorty").learnset.sing = ["9L15"];
	this.modData("Learnsets", "yankeedoodlemorty").learnset.entertain = ["9L20"];
	this.modData("Learnsets", "yankeedoodlemorty").learnset.fortify = ["9L25"];
	this.modData("Learnsets", "yankeedoodlemorty").learnset.straightedge = ["9L30"];
	this.modData("Learnsets", "yankeedoodlemorty").learnset.defend = ["9L40"];

	// Soccer Ball Morty
	this.modData("Learnsets", "soccerballmorty").learnset.absorb = ["9L1"];
	this.modData("Learnsets", "soccerballmorty").learnset.kick = ["9L1"];
	this.modData("Learnsets", "soccerballmorty").learnset.rush = ["9L5"];
	this.modData("Learnsets", "soccerballmorty").learnset.scuttle = ["9L10"];
	this.modData("Learnsets", "soccerballmorty").learnset.legsweep = ["9L15"];
	this.modData("Learnsets", "soccerballmorty").learnset.gforce = ["9L20"];
	this.modData("Learnsets", "soccerballmorty").learnset.fireball = ["9L25"];
	this.modData("Learnsets", "soccerballmorty").learnset.pray = ["9L30"];
	this.modData("Learnsets", "soccerballmorty").learnset.goldentouch = ["9L45"];

	// Ice Cream Morty
	this.modData("Learnsets", "icecreammorty").learnset.melt = ["9L1"];
	this.modData("Learnsets", "icecreammorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "icecreammorty").learnset.suck = ["9L5"];
	this.modData("Learnsets", "icecreammorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "icecreammorty").learnset.drool = ["9L15"];
	this.modData("Learnsets", "icecreammorty").learnset.mindmeld = ["9L20"];
	this.modData("Learnsets", "icecreammorty").learnset.wettongue = ["9L25"];
	this.modData("Learnsets", "icecreammorty").learnset.salivate = ["9L30"];
	this.modData("Learnsets", "icecreammorty").learnset.brainfreeze = ["9L45"];

	// Lasagna Morty
	this.modData("Learnsets", "lasagnamorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "lasagnamorty").learnset.dribble = ["9L1"];
	this.modData("Learnsets", "lasagnamorty").learnset.melt = ["9L5"];
	this.modData("Learnsets", "lasagnamorty").learnset.encrust = ["9L12"];
	this.modData("Learnsets", "lasagnamorty").learnset.salivate = ["9L17"];
	this.modData("Learnsets", "lasagnamorty").learnset.sliceanddice = ["9L22"];
	this.modData("Learnsets", "lasagnamorty").learnset.defend = ["9L26"];
	this.modData("Learnsets", "lasagnamorty").learnset.thaw = ["9L30"];
	this.modData("Learnsets", "lasagnamorty").learnset.mouthoff = ["9L34"];
	this.modData("Learnsets", "lasagnamorty").learnset.gooeycheese = ["9L40"];

	// The Pale Morty
	this.modData("Learnsets", "thepalemorty").learnset.stalk = ["9L1"];
	this.modData("Learnsets", "thepalemorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "thepalemorty").learnset.suitandboot = ["9L5"];
	this.modData("Learnsets", "thepalemorty").learnset.creep = ["9L12"];
	this.modData("Learnsets", "thepalemorty").learnset.cuttinggaze = ["9L17"];
	this.modData("Learnsets", "thepalemorty").learnset.sicken = ["9L22"];
	this.modData("Learnsets", "thepalemorty").learnset.clawsout = ["9L26"];
	this.modData("Learnsets", "thepalemorty").learnset.traumatize = ["9L30"];
	this.modData("Learnsets", "thepalemorty").learnset.grossout = ["9L34"];
	this.modData("Learnsets", "thepalemorty").learnset.abduct = ["9L45"];

	// Headless Morty
	this.modData("Learnsets", "headlessmorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "headlessmorty").learnset.fixerupper = ["9L1"];
	this.modData("Learnsets", "headlessmorty").learnset.deadstare = ["9L5"];
	this.modData("Learnsets", "headlessmorty").learnset.staredown = ["9L12"];
	this.modData("Learnsets", "headlessmorty").learnset.guillotine = ["9L17"];
	this.modData("Learnsets", "headlessmorty").learnset.sliceanddice = ["9L22"];
	this.modData("Learnsets", "headlessmorty").learnset.headbutt = ["9L26"];
	this.modData("Learnsets", "headlessmorty").learnset.headache = ["9L30"];
	this.modData("Learnsets", "headlessmorty").learnset.grossout = ["9L34"];
	this.modData("Learnsets", "headlessmorty").learnset.skullcrash = ["9L40"];

	// Forbidden Morty
	this.modData("Learnsets", "forbiddenmorty").learnset.pnakoticchant = ["9L1"];
	this.modData("Learnsets", "forbiddenmorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "forbiddenmorty").learnset.erase = ["9L5"];
	this.modData("Learnsets", "forbiddenmorty").learnset.negativeenergy = ["9L12"];
	this.modData("Learnsets", "forbiddenmorty").learnset.necrosis = ["9L17"];
	this.modData("Learnsets", "forbiddenmorty").learnset.eldercurse = ["9L22"];
	this.modData("Learnsets", "forbiddenmorty").learnset.piercingstare = ["9L26"];
	this.modData("Learnsets", "forbiddenmorty").learnset.denial = ["9L30"];
	this.modData("Learnsets", "forbiddenmorty").learnset.arkhamtrap = ["9L34"];
	this.modData("Learnsets", "forbiddenmorty").learnset.arcanecast = ["9L45"];

	// Christmas Future Morty
	this.modData("Learnsets", "christmasfuturemorty").learnset.probe = ["9L1"];
	this.modData("Learnsets", "christmasfuturemorty").learnset.haunt = ["9L1"];
	this.modData("Learnsets", "christmasfuturemorty").learnset.grieve = ["9L5"];
	this.modData("Learnsets", "christmasfuturemorty").learnset.criticize = ["9L10"];
	this.modData("Learnsets", "christmasfuturemorty").learnset.mindrage = ["9L15"];
	this.modData("Learnsets", "christmasfuturemorty").learnset.mindread = ["9L20"];
	this.modData("Learnsets", "christmasfuturemorty").learnset.soulsearch = ["9L25"];
	this.modData("Learnsets", "christmasfuturemorty").learnset.tombstone = ["9L30"];
	this.modData("Learnsets", "christmasfuturemorty").learnset.mindmeld = ["9L34"];
	this.modData("Learnsets", "christmasfuturemorty").learnset.pray = ["9L40"];

	// Christmas Past Morty
	this.modData("Learnsets", "christmaspastmorty").learnset.icytouch = ["9L1"];
	this.modData("Learnsets", "christmaspastmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "christmaspastmorty").learnset.energydrain = ["9L5"];
	this.modData("Learnsets", "christmaspastmorty").learnset.chastise = ["9L10"];
	this.modData("Learnsets", "christmaspastmorty").learnset.mope = ["9L15"];
	this.modData("Learnsets", "christmaspastmorty").learnset.staredown = ["9L20"];
	this.modData("Learnsets", "christmaspastmorty").learnset.piercingstare = ["9L26"];
	this.modData("Learnsets", "christmaspastmorty").learnset.pout = ["9L30"];
	this.modData("Learnsets", "christmaspastmorty").learnset.moodkill = ["9L34"];
	this.modData("Learnsets", "christmaspastmorty").learnset.humiliate = ["9L40"];

	// Christmas Present Morty
	this.modData("Learnsets", "christmaspresentmorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "christmaspresentmorty").learnset.loveyourself = ["9L1"];
	this.modData("Learnsets", "christmaspresentmorty").learnset.party = ["9L5"];
	this.modData("Learnsets", "christmaspresentmorty").learnset.criticize = ["9L12"];
	this.modData("Learnsets", "christmaspresentmorty").learnset.juice = ["9L17"];
	this.modData("Learnsets", "christmaspresentmorty").learnset.lovebug = ["9L22"];
	this.modData("Learnsets", "christmaspresentmorty").learnset.servingup = ["9L26"];
	this.modData("Learnsets", "christmaspresentmorty").learnset.sparkle = ["9L30"];
	this.modData("Learnsets", "christmaspresentmorty").learnset.goldentouch = ["9L34"];
	this.modData("Learnsets", "christmaspresentmorty").learnset.sing = ["9L40"];

	// Trover Morty
	this.modData("Learnsets", "trovermorty").learnset.sneeze = ["9L1"];
	this.modData("Learnsets", "trovermorty").learnset.fanart = ["9L1"];
	this.modData("Learnsets", "trovermorty").learnset.nail = ["9L5"];
	this.modData("Learnsets", "trovermorty").learnset.splash = ["9L12"];
	this.modData("Learnsets", "trovermorty").learnset.exfoliate = ["9L17"];
	this.modData("Learnsets", "trovermorty").learnset.staredown = ["9L22"];
	this.modData("Learnsets", "trovermorty").learnset.snooze = ["9L26"];
	this.modData("Learnsets", "trovermorty").learnset.sneer = ["9L30"];
	this.modData("Learnsets", "trovermorty").learnset.suplex = ["9L34"];
	this.modData("Learnsets", "trovermorty").learnset.retainstrength = ["9L40"];

	// Morty Jr.
	this.modData("Learnsets", "mortyjr").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "mortyjr").learnset.furball = ["9L1"];
	this.modData("Learnsets", "mortyjr").learnset.cry = ["9L5"];
	this.modData("Learnsets", "mortyjr").learnset.blindswing = ["9L9"];
	this.modData("Learnsets", "mortyjr").learnset.pillage = ["9L13"];
	this.modData("Learnsets", "mortyjr").learnset.spewfire = ["9L18"];
	this.modData("Learnsets", "mortyjr").learnset.fourarmsmash = ["9L25"];
	this.modData("Learnsets", "mortyjr").learnset.grab = ["9L32"];

	// Struggling Artist Morty
	this.modData("Learnsets", "strugglingartistmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "strugglingartistmorty").learnset.denial = ["9L1"];
	this.modData("Learnsets", "strugglingartistmorty").learnset.erase = ["9L7"];
	this.modData("Learnsets", "strugglingartistmorty").learnset.soulsearch = ["9L12"];
	this.modData("Learnsets", "strugglingartistmorty").learnset.negativespace = ["9L17"];
	this.modData("Learnsets", "strugglingartistmorty").learnset.repress = ["9L22"];
	this.modData("Learnsets", "strugglingartistmorty").learnset.piercingstare = ["9L26"];
	this.modData("Learnsets", "strugglingartistmorty").learnset.outpour = ["9L32"];
	this.modData("Learnsets", "strugglingartistmorty").learnset.existentialdread = ["9L40"];

	// Robot Chicken Morty
	this.modData("Learnsets", "robotchickenmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "robotchickenmorty").learnset.beam = ["9L2"];
	this.modData("Learnsets", "robotchickenmorty").learnset.wingblast = ["9L6"];
	this.modData("Learnsets", "robotchickenmorty").learnset.henpeck = ["9L11"];
	this.modData("Learnsets", "robotchickenmorty").learnset.blink = ["9L14"];
	this.modData("Learnsets", "robotchickenmorty").learnset.flutter = ["9L20"];
	this.modData("Learnsets", "robotchickenmorty").learnset.dinnertime = ["9L24"];
	this.modData("Learnsets", "robotchickenmorty").learnset.laserstare = ["9L30"];
	this.modData("Learnsets", "robotchickenmorty").learnset.spear = ["9L35"];

	// Nerd Morty
	this.modData("Learnsets", "nerdmorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "nerdmorty").learnset.blindswing = ["9L1"];
	this.modData("Learnsets", "nerdmorty").learnset.cry = ["9L6"];
	this.modData("Learnsets", "nerdmorty").learnset.mope = ["9L11"];
	this.modData("Learnsets", "nerdmorty").learnset.wedgieproof = ["9L17"];
	this.modData("Learnsets", "nerdmorty").learnset.boilsqueeze = ["9L23"];
	this.modData("Learnsets", "nerdmorty").learnset.mintcondition = ["9L28"];
	this.modData("Learnsets", "nerdmorty").learnset.fanart = ["9L34"];

	// Dethklok Morty
	this.modData("Learnsets", "dethklokmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "dethklokmorty").learnset.swing = ["9L3"];
	this.modData("Learnsets", "dethklokmorty").learnset.dethharmonic = ["9L8"];
	this.modData("Learnsets", "dethklokmorty").learnset.vomit = ["9L13"];
	this.modData("Learnsets", "dethklokmorty").learnset.rehab = ["9L18"];
	this.modData("Learnsets", "dethklokmorty").learnset.sing = ["9L23"];
	this.modData("Learnsets", "dethklokmorty").learnset.provoke = ["9L28"];
	this.modData("Learnsets", "dethklokmorty").learnset.straightedge = ["9L34"];
	this.modData("Learnsets", "dethklokmorty").learnset.facefisted = ["9L40"];

	// Dethklok Fan Morty
	this.modData("Learnsets", "dethklokfanmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "dethklokfanmorty").learnset.party = ["9L1"];
	this.modData("Learnsets", "dethklokfanmorty").learnset.blindswing = ["9L5"];
	this.modData("Learnsets", "dethklokfanmorty").learnset.headbang = ["9L9"];
	this.modData("Learnsets", "dethklokfanmorty").learnset.metalhorns = ["9L15"];
	this.modData("Learnsets", "dethklokfanmorty").learnset.belch = ["9L20"];
	this.modData("Learnsets", "dethklokfanmorty").learnset.headbutt = ["9L26"];
	this.modData("Learnsets", "dethklokfanmorty").learnset.headache = ["9L31"];
	this.modData("Learnsets", "dethklokfanmorty").learnset.straightedge = ["9L36"];

	// Kissing Cats Morty
	this.modData("Learnsets", "kissingcatsmorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "kissingcatsmorty").learnset.cough = ["9L1"];
	this.modData("Learnsets", "kissingcatsmorty").learnset.caress = ["9L5"];
	this.modData("Learnsets", "kissingcatsmorty").learnset.smooch = ["9L9"];
	this.modData("Learnsets", "kissingcatsmorty").learnset.puffytail = ["9L14"];
	this.modData("Learnsets", "kissingcatsmorty").learnset.lick = ["9L19"];
	this.modData("Learnsets", "kissingcatsmorty").learnset.scratchandsniff = ["9L25"];
	this.modData("Learnsets", "kissingcatsmorty").learnset.wettongue = ["9L32"];
	this.modData("Learnsets", "kissingcatsmorty").learnset.fanart = ["9L40"];

	// Wasp Morty
	this.modData("Learnsets", "waspmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "waspmorty").learnset.sting = ["9L1"];
	this.modData("Learnsets", "waspmorty").learnset.wingblast = ["9L8"];
	this.modData("Learnsets", "waspmorty").learnset.enrage = ["9L12"];
	this.modData("Learnsets", "waspmorty").learnset.lick = ["9L17"];
	this.modData("Learnsets", "waspmorty").learnset.salivate = ["9L22"];
	this.modData("Learnsets", "waspmorty").learnset.provoke = ["9L28"];
	this.modData("Learnsets", "waspmorty").learnset.extremereaction = ["9L35"];

	// Shrimp Morty
	this.modData("Learnsets", "shrimpmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "shrimpmorty").learnset.harden = ["9L1"];
	this.modData("Learnsets", "shrimpmorty").learnset.jab = ["9L8"];
	this.modData("Learnsets", "shrimpmorty").learnset.grab = ["9L12"];
	this.modData("Learnsets", "shrimpmorty").learnset.tempura = ["9L17"];
	this.modData("Learnsets", "shrimpmorty").learnset.scuttle = ["9L23"];
	this.modData("Learnsets", "shrimpmorty").learnset.claw = ["9L27"];
	this.modData("Learnsets", "shrimpmorty").learnset.relax = ["9L32"];
	this.modData("Learnsets", "shrimpmorty").learnset.splash = ["9L38"];

	// High Intern Morty
	this.modData("Learnsets", "highinternmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "highinternmorty").learnset.delegate = ["9L1"];
	this.modData("Learnsets", "highinternmorty").learnset.icytouch = ["9L5"];
	this.modData("Learnsets", "highinternmorty").learnset.absorb = ["9L9"];
	this.modData("Learnsets", "highinternmorty").learnset.prioritize = ["9L13"];
	this.modData("Learnsets", "highinternmorty").learnset.blindswing = ["9L20"];
	this.modData("Learnsets", "highinternmorty").learnset.eldercurse = ["9L24"];
	this.modData("Learnsets", "highinternmorty").learnset.fossilise = ["9L28"];
	this.modData("Learnsets", "highinternmorty").learnset.headache = ["9L34"];
	this.modData("Learnsets", "highinternmorty").learnset.caress = ["9L38"];
	this.modData("Learnsets", "highinternmorty").learnset.piercingstare = ["9L42"];

	// Vermigurber Morty
	this.modData("Learnsets", "vermigurbermorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "vermigurbermorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "vermigurbermorty").learnset.spar = ["9L6"];
	this.modData("Learnsets", "vermigurbermorty").learnset.vomit = ["9L11"];
	this.modData("Learnsets", "vermigurbermorty").learnset.lick = ["9L15"];
	this.modData("Learnsets", "vermigurbermorty").learnset.slurp = ["9L21"];
	this.modData("Learnsets", "vermigurbermorty").learnset.poisonspit = ["9L25"];
	this.modData("Learnsets", "vermigurbermorty").learnset.swat = ["9L29"];
	this.modData("Learnsets", "vermigurbermorty").learnset.crush = ["9L34"];
	this.modData("Learnsets", "vermigurbermorty").learnset.prey = ["9L40"];

	// Charred Morty
	this.modData("Learnsets", "charredmorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "charredmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "charredmorty").learnset.combustion = ["9L8"];
	this.modData("Learnsets", "charredmorty").learnset.compute = ["9L11"];
	this.modData("Learnsets", "charredmorty").learnset.brand = ["9L15"];
	this.modData("Learnsets", "charredmorty").learnset.fireplay = ["9L21"];
	this.modData("Learnsets", "charredmorty").learnset.weardown = ["9L24"];
	this.modData("Learnsets", "charredmorty").learnset.burn = ["9L27"];
	this.modData("Learnsets", "charredmorty").learnset.shadowpuppet = ["9L35"];
	this.modData("Learnsets", "charredmorty").learnset.engulf = ["9L40"];

	// Ventriloquiver Morty
	this.modData("Learnsets", "ventriloquivermorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "ventriloquivermorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "ventriloquivermorty").learnset.flail = ["9L5"];
	this.modData("Learnsets", "ventriloquivermorty").learnset.snub = ["9L10"];
	this.modData("Learnsets", "ventriloquivermorty").learnset.cuttinggaze = ["9L16"];
	this.modData("Learnsets", "ventriloquivermorty").learnset.mock = ["9L20"];
	this.modData("Learnsets", "ventriloquivermorty").learnset.punked = ["9L25"];
	this.modData("Learnsets", "ventriloquivermorty").learnset.grab = ["9L28"];
	this.modData("Learnsets", "ventriloquivermorty").learnset.entertain = ["9L34"];
	this.modData("Learnsets", "ventriloquivermorty").learnset.volley = ["9L40"];

	// Amoeba Morty
	this.modData("Learnsets", "amoebamorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "amoebamorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "amoebamorty").learnset.fixerupper = ["9L6"];
	this.modData("Learnsets", "amoebamorty").learnset.medicate = ["9L13"];
	this.modData("Learnsets", "amoebamorty").learnset.pseudopodsmash = ["9L17"];
	this.modData("Learnsets", "amoebamorty").learnset.redmist = ["9L22"];
	this.modData("Learnsets", "amoebamorty").learnset.bunchup = ["9L26"];
	this.modData("Learnsets", "amoebamorty").learnset.osmosis = ["9L32"];
	this.modData("Learnsets", "amoebamorty").learnset.traumatize = ["9L35"];
	this.modData("Learnsets", "amoebamorty").learnset.ironout = ["9L41"];

	// Dragon Rider Morty
	this.modData("Learnsets", "dragonridermorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "dragonridermorty").learnset.poke = ["9L2"];
	this.modData("Learnsets", "dragonridermorty").learnset.blindswing = ["9L6"];
	this.modData("Learnsets", "dragonridermorty").learnset.sneer = ["9L12"];
	this.modData("Learnsets", "dragonridermorty").learnset.crush = ["9L16"];
	this.modData("Learnsets", "dragonridermorty").learnset.dragoncall = ["9L20"];
	this.modData("Learnsets", "dragonridermorty").learnset.flutter = ["9L26"];
	this.modData("Learnsets", "dragonridermorty").learnset.divingshot = ["9L32"];
	this.modData("Learnsets", "dragonridermorty").learnset.heavedown = ["9L37"];
	this.modData("Learnsets", "dragonridermorty").learnset.claw = ["9L42"];

	// Archmage Morty
	this.modData("Learnsets", "archmagemorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "archmagemorty").learnset.haunt = ["9L3"];
	this.modData("Learnsets", "archmagemorty").learnset.icytouch = ["9L6"];
	this.modData("Learnsets", "archmagemorty").learnset.ouija = ["9L9"];
	this.modData("Learnsets", "archmagemorty").learnset.stargaze = ["9L13"];
	this.modData("Learnsets", "archmagemorty").learnset.hypnotize = ["9L17"];
	this.modData("Learnsets", "archmagemorty").learnset.aura = ["9L21"];
	this.modData("Learnsets", "archmagemorty").learnset.frostbolt = ["9L25"];
	this.modData("Learnsets", "archmagemorty").learnset.lightningbolt = ["9L31"];
	this.modData("Learnsets", "archmagemorty").learnset.eldercurse = ["9L35"];
	this.modData("Learnsets", "archmagemorty").learnset.supernova = ["9L40"];

	// Snake Morty
	this.modData("Learnsets", "snakemorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "snakemorty").learnset.absorb = ["9L4"];
	this.modData("Learnsets", "snakemorty").learnset.vomit = ["9L9"];
	this.modData("Learnsets", "snakemorty").learnset.salivate = ["9L15"];
	this.modData("Learnsets", "snakemorty").learnset.grab = ["9L20"];
	this.modData("Learnsets", "snakemorty").learnset.crush = ["9L24"];
	this.modData("Learnsets", "snakemorty").learnset.venomousbite = ["9L28"];
	this.modData("Learnsets", "snakemorty").learnset.staredown = ["9L31"];
	this.modData("Learnsets", "snakemorty").learnset.constrict = ["9L35"];
	this.modData("Learnsets", "snakemorty").learnset.bunchup = ["9L39"];

	// Space Suit Morty
	this.modData("Learnsets", "spacesuitmorty").learnset.harden = ["9L1"];
	this.modData("Learnsets", "spacesuitmorty").learnset.lift = ["9L3"];
	this.modData("Learnsets", "spacesuitmorty").learnset.plasmaburst = ["9L8"];
	this.modData("Learnsets", "spacesuitmorty").learnset.stargaze = ["9L14"];
	this.modData("Learnsets", "spacesuitmorty").learnset.hermeticallysealed = ["9L18"];
	this.modData("Learnsets", "spacesuitmorty").learnset.vaporize = ["9L22"];
	this.modData("Learnsets", "spacesuitmorty").learnset.blindswing = ["9L26"];
	this.modData("Learnsets", "spacesuitmorty").learnset.bloodpressure = ["9L29"];
	this.modData("Learnsets", "spacesuitmorty").learnset.engulf = ["9L33"];
	this.modData("Learnsets", "spacesuitmorty").learnset.blink = ["9L36"];
	this.modData("Learnsets", "spacesuitmorty").learnset.eventhorizon = ["9L40"];

	// Hobo Santa Morty
	this.modData("Learnsets", "hobosantamorty").learnset.lick = ["9L1"];
	this.modData("Learnsets", "hobosantamorty").learnset.snotblast = ["9L3"];
	this.modData("Learnsets", "hobosantamorty").learnset.gooeydischarge = ["9L8"];
	this.modData("Learnsets", "hobosantamorty").learnset.staredown = ["9L12"];
	this.modData("Learnsets", "hobosantamorty").learnset.holidayspirit = ["9L16"];
	this.modData("Learnsets", "hobosantamorty").learnset.cuttinggaze = ["9L20"];
	this.modData("Learnsets", "hobosantamorty").learnset.naughtyornice = ["9L25"];
	this.modData("Learnsets", "hobosantamorty").learnset.bloodpressure = ["9L30"];
	this.modData("Learnsets", "hobosantamorty").learnset.scratchandsniff = ["9L36"];
	this.modData("Learnsets", "hobosantamorty").learnset.transplant = ["9L40"];

	// Fan Dancer Morty
	this.modData("Learnsets", "fandancermorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "fandancermorty").learnset.flair = ["9L1"];
	this.modData("Learnsets", "fandancermorty").learnset.waft = ["9L4"];
	this.modData("Learnsets", "fandancermorty").learnset.entertain = ["9L9"];
	this.modData("Learnsets", "fandancermorty").learnset.flutter = ["9L14"];
	this.modData("Learnsets", "fandancermorty").learnset.pout = ["9L19"];
	this.modData("Learnsets", "fandancermorty").learnset.letitgo = ["9L24"];
	this.modData("Learnsets", "fandancermorty").learnset.powerpose = ["9L29"];
	this.modData("Learnsets", "fandancermorty").learnset.sparkle = ["9L35"];
	this.modData("Learnsets", "fandancermorty").learnset.mock = ["9L38"];

	// Year of the Rat Morty
	this.modData("Learnsets", "yearoftheratmorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "yearoftheratmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "yearoftheratmorty").learnset.squeak = ["9L5"];
	this.modData("Learnsets", "yearoftheratmorty").learnset.lick = ["9L10"];
	this.modData("Learnsets", "yearoftheratmorty").learnset.scratchandsniff = ["9L14"];
	this.modData("Learnsets", "yearoftheratmorty").learnset.sneer = ["9L18"];
	this.modData("Learnsets", "yearoftheratmorty").learnset.gnaw = ["9L22"];
	this.modData("Learnsets", "yearoftheratmorty").learnset.wettongue = ["9L29"];
	this.modData("Learnsets", "yearoftheratmorty").learnset.clawsout = ["9L35"];
	this.modData("Learnsets", "yearoftheratmorty").learnset.rush = ["9L39"];

	// Tanggu Drummer Morty
	this.modData("Learnsets", "tanggudrummermorty").learnset.blindswing = ["9L1"];
	this.modData("Learnsets", "tanggudrummermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "tanggudrummermorty").learnset.headbang = ["9L5"];
	this.modData("Learnsets", "tanggudrummermorty").learnset.swing = ["9L9"];
	this.modData("Learnsets", "tanggudrummermorty").learnset.party = ["9L15"];
	this.modData("Learnsets", "tanggudrummermorty").learnset.downbeat = ["9L20"];
	this.modData("Learnsets", "tanggudrummermorty").learnset.harden = ["9L24"];
	this.modData("Learnsets", "tanggudrummermorty").learnset.upbeat = ["9L29"];
	this.modData("Learnsets", "tanggudrummermorty").learnset.weardown = ["9L35"];
	this.modData("Learnsets", "tanggudrummermorty").learnset.thunderousbarrage = ["9L42"];

	// Mytholog Morty
	this.modData("Learnsets", "mythologmorty").learnset.cough = ["9L1"];
	this.modData("Learnsets", "mythologmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "mythologmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "mythologmorty").learnset.piteouswretch = ["9L8"];
	this.modData("Learnsets", "mythologmorty").learnset.salivate = ["9L13"];
	this.modData("Learnsets", "mythologmorty").learnset.gooeydischarge = ["9L17"];
	this.modData("Learnsets", "mythologmorty").learnset.cower = ["9L22"];
	this.modData("Learnsets", "mythologmorty").learnset.sting = ["9L26"];
	this.modData("Learnsets", "mythologmorty").learnset.soggykiss = ["9L30"];
	this.modData("Learnsets", "mythologmorty").learnset.slobber = ["9L35"];

	// Cupid Morty
	this.modData("Learnsets", "cupidmorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "cupidmorty").learnset.attraction = ["9L1"];
	this.modData("Learnsets", "cupidmorty").learnset.sing = ["9L5"];
	this.modData("Learnsets", "cupidmorty").learnset.caress = ["9L10"];
	this.modData("Learnsets", "cupidmorty").learnset.cry = ["9L15"];
	this.modData("Learnsets", "cupidmorty").learnset.sparkle = ["9L20"];
	this.modData("Learnsets", "cupidmorty").learnset.flutter = ["9L26"];
	this.modData("Learnsets", "cupidmorty").learnset.lovebug = ["9L32"];
	this.modData("Learnsets", "cupidmorty").learnset.wingblast = ["9L37"];
	this.modData("Learnsets", "cupidmorty").learnset.lovestruck = ["9L40"];

	// Love Heart Morty
	this.modData("Learnsets", "loveheartmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "loveheartmorty").learnset.stalk = ["9L1"];
	this.modData("Learnsets", "loveheartmorty").learnset.harden = ["9L4"];
	this.modData("Learnsets", "loveheartmorty").learnset.engulf = ["9L8"];
	this.modData("Learnsets", "loveheartmorty").learnset.bloodpressure = ["9L13"];
	this.modData("Learnsets", "loveheartmorty").learnset.crush = ["9L17"];
	this.modData("Learnsets", "loveheartmorty").learnset.brokenheart = ["9L24"];
	this.modData("Learnsets", "loveheartmorty").learnset.grieve = ["9L30"];
	this.modData("Learnsets", "loveheartmorty").learnset.heartattack = ["9L35"];
	this.modData("Learnsets", "loveheartmorty").learnset.denial = ["9L40"];

	// Hopeless Romantic Morty
	this.modData("Learnsets", "hopelessromanticmorty").learnset.cough = ["9L1"];
	this.modData("Learnsets", "hopelessromanticmorty").learnset.hug = ["9L3"];
	this.modData("Learnsets", "hopelessromanticmorty").learnset.cry = ["9L7"];
	this.modData("Learnsets", "hopelessromanticmorty").learnset.repress = ["9L12"];
	this.modData("Learnsets", "hopelessromanticmorty").learnset.mope = ["9L16"];
	this.modData("Learnsets", "hopelessromanticmorty").learnset.selfpromote = ["9L22"];
	this.modData("Learnsets", "hopelessromanticmorty").learnset.romanticgesture = ["9L27"];
	this.modData("Learnsets", "hopelessromanticmorty").learnset.boilsqueeze = ["9L32"];
	this.modData("Learnsets", "hopelessromanticmorty").learnset.prominvite = ["9L40"];

	// Good Boy Morty
	this.modData("Learnsets", "goodboymorty").learnset.dig = ["9L1"];
	this.modData("Learnsets", "goodboymorty").learnset.nibble = ["9L2"];
	this.modData("Learnsets", "goodboymorty").learnset.drool = ["9L8"];
	this.modData("Learnsets", "goodboymorty").learnset.lick = ["9L14"];
	this.modData("Learnsets", "goodboymorty").learnset.bite = ["9L18"];
	this.modData("Learnsets", "goodboymorty").learnset.scratchandsniff = ["9L22"];
	this.modData("Learnsets", "goodboymorty").learnset.wettongue = ["9L27"];
	this.modData("Learnsets", "goodboymorty").learnset.fetch = ["9L34"];
	this.modData("Learnsets", "goodboymorty").learnset.puppyeyes = ["9L40"];
	this.modData("Learnsets", "goodboymorty").learnset.markterritory = ["9L50"];

	// Flannel Morteh
	this.modData("Learnsets", "flannelmorteh").learnset.jab = ["9L1"];
	this.modData("Learnsets", "flannelmorteh").learnset.kick = ["9L1"];
	this.modData("Learnsets", "flannelmorteh").learnset.repress = ["9L7"];
	this.modData("Learnsets", "flannelmorteh").learnset.sorry = ["9L12"];
	this.modData("Learnsets", "flannelmorteh").learnset.universalhealthcare = ["9L17"];
	this.modData("Learnsets", "flannelmorteh").learnset.medicate = ["9L22"];
	this.modData("Learnsets", "flannelmorteh").learnset.thaw = ["9L26"];
	this.modData("Learnsets", "flannelmorteh").learnset.strengthen = ["9L32"];
	this.modData("Learnsets", "flannelmorteh").learnset.aboot = ["9L38"];
	this.modData("Learnsets", "flannelmorteh").learnset.mock = ["9L45"];

	// Hockey Morteh
	this.modData("Learnsets", "hockeymorteh").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "hockeymorteh").learnset.jab = ["9L1"];
	this.modData("Learnsets", "hockeymorteh").learnset.slam = ["9L5"];
	this.modData("Learnsets", "hockeymorteh").learnset.swing = ["9L10"];
	this.modData("Learnsets", "hockeymorteh").learnset.distract = ["9L18"];
	this.modData("Learnsets", "hockeymorteh").learnset.spar = ["9L25"];
	this.modData("Learnsets", "hockeymorteh").learnset.headbutt = ["9L30"];
	this.modData("Learnsets", "hockeymorteh").learnset.facefisted = ["9L35"];
	this.modData("Learnsets", "hockeymorteh").learnset.bodycheck = ["9L40"];
	this.modData("Learnsets", "hockeymorteh").learnset.charging = ["9L50"];

	// Hockey Stick Morteh
	this.modData("Learnsets", "hockeystickmorteh").learnset.condition = ["9L1"];
	this.modData("Learnsets", "hockeystickmorteh").learnset.swing = ["9L1"];
	this.modData("Learnsets", "hockeystickmorteh").learnset.protect = ["9L4"];
	this.modData("Learnsets", "hockeystickmorteh").learnset.bunt = ["9L8"];
	this.modData("Learnsets", "hockeystickmorteh").learnset.trip = ["9L14"];
	this.modData("Learnsets", "hockeystickmorteh").learnset.strengthen = ["9L24"];
	this.modData("Learnsets", "hockeystickmorteh").learnset.hook = ["9L32"];
	this.modData("Learnsets", "hockeystickmorteh").learnset.legsweep = ["9L40"];
	this.modData("Learnsets", "hockeystickmorteh").learnset.slash = ["9L45"];

	// Maple Leaf Morteh
	this.modData("Learnsets", "mapleleafmorteh").learnset.curl = ["9L1"];
	this.modData("Learnsets", "mapleleafmorteh").learnset.sorry = ["9L1"];
	this.modData("Learnsets", "mapleleafmorteh").learnset.scrunch = ["9L6"];
	this.modData("Learnsets", "mapleleafmorteh").learnset.flutter = ["9L12"];
	this.modData("Learnsets", "mapleleafmorteh").learnset.photosynthesize = ["9L18"];
	this.modData("Learnsets", "mapleleafmorteh").learnset.anthocyanin = ["9L24"];
	this.modData("Learnsets", "mapleleafmorteh").learnset.rootdown = ["9L30"];
	this.modData("Learnsets", "mapleleafmorteh").learnset.sing = ["9L38"];
	this.modData("Learnsets", "mapleleafmorteh").learnset.universalhealthcare = ["9L44"];
	this.modData("Learnsets", "mapleleafmorteh").learnset.sprout = ["9L50"];

	// Maple Syrup Morteh
	this.modData("Learnsets", "maplesyrupmorteh").learnset.gooeydischarge = ["9L1"];
	this.modData("Learnsets", "maplesyrupmorteh").learnset.shatter = ["9L1"];
	this.modData("Learnsets", "maplesyrupmorteh").learnset.harden = ["9L7"];
	this.modData("Learnsets", "maplesyrupmorteh").learnset.sorry = ["9L13"];
	this.modData("Learnsets", "maplesyrupmorteh").learnset.rush = ["9L17"];
	this.modData("Learnsets", "maplesyrupmorteh").learnset.gradea = ["9L21"];
	this.modData("Learnsets", "maplesyrupmorteh").learnset.crystalize = ["9L27"];
	this.modData("Learnsets", "maplesyrupmorteh").learnset.piercingstare = ["9L32"];
	this.modData("Learnsets", "maplesyrupmorteh").learnset.universalhealthcare = ["9L40"];
	this.modData("Learnsets", "maplesyrupmorteh").learnset.sparkle = ["9L48"];

	// Wendy Morty
	this.modData("Learnsets", "wendymorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "wendymorty").learnset.comb = ["9L1"];
	this.modData("Learnsets", "wendymorty").learnset.provoke = ["9L8"];
	this.modData("Learnsets", "wendymorty").learnset.baconated = ["9L14"];
	this.modData("Learnsets", "wendymorty").learnset.criticize = ["9L20"];
	this.modData("Learnsets", "wendymorty").learnset.buuurn = ["9L27"];
	this.modData("Learnsets", "wendymorty").learnset.selfpromote = ["9L32"];
	this.modData("Learnsets", "wendymorty").learnset.blowdry = ["9L37"];
	this.modData("Learnsets", "wendymorty").learnset.sliceanddice = ["9L42"];
	this.modData("Learnsets", "wendymorty").learnset.gooeycheese = ["9L50"];

	// Breakfast Morty
	this.modData("Learnsets", "breakfastmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "breakfastmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "breakfastmorty").learnset.flail = ["9L5"];
	this.modData("Learnsets", "breakfastmorty").learnset.drowse = ["9L11"];
	this.modData("Learnsets", "breakfastmorty").learnset.breakfastrush = ["9L17"];
	this.modData("Learnsets", "breakfastmorty").learnset.alwaysfresh = ["9L25"];
	this.modData("Learnsets", "breakfastmorty").learnset.slobber = ["9L30"];
	this.modData("Learnsets", "breakfastmorty").learnset.hibernate = ["9L35"];
	this.modData("Learnsets", "breakfastmorty").learnset.nodoff = ["9L40"];
	this.modData("Learnsets", "breakfastmorty").learnset.salivate = ["9L45"];

	// Goomby Morty
	this.modData("Learnsets", "goombymorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "goombymorty").learnset.caress = ["9L1"];
	this.modData("Learnsets", "goombymorty").learnset.glitterblast = ["9L7"];
	this.modData("Learnsets", "goombymorty").learnset.clingy = ["9L12"];
	this.modData("Learnsets", "goombymorty").learnset.hug = ["9L16"];
	this.modData("Learnsets", "goombymorty").learnset.dinnertime = ["9L20"];
	this.modData("Learnsets", "goombymorty").learnset.presentportal = ["9L25"];
	this.modData("Learnsets", "goombymorty").learnset.holidayspirit = ["9L30"];

	// Tickets Please Morty
	this.modData("Learnsets", "ticketspleasemorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "ticketspleasemorty").learnset.jab = ["9L5"];
	this.modData("Learnsets", "ticketspleasemorty").learnset.examine = ["9L10"];
	this.modData("Learnsets", "ticketspleasemorty").learnset.nibble = ["9L16"];
	this.modData("Learnsets", "ticketspleasemorty").learnset.ticketpunch = ["9L23"];
	this.modData("Learnsets", "ticketspleasemorty").learnset.staredown = ["9L28"];
	this.modData("Learnsets", "ticketspleasemorty").learnset.surprisinglybuff = ["9L32"];
	this.modData("Learnsets", "ticketspleasemorty").learnset.snippet = ["9L36"];
	this.modData("Learnsets", "ticketspleasemorty").learnset.rush = ["9L42"];

	// Badass Suit Morty
	this.modData("Learnsets", "badasssuitmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "badasssuitmorty").learnset.gforce = ["9L1"];
	this.modData("Learnsets", "badasssuitmorty").learnset.plasmaburst = ["9L5"];
	this.modData("Learnsets", "badasssuitmorty").learnset.slam = ["9L10"];
	this.modData("Learnsets", "badasssuitmorty").learnset.compute = ["9L15"];
	this.modData("Learnsets", "badasssuitmorty").learnset.powersword = ["9L20"];
	this.modData("Learnsets", "badasssuitmorty").learnset.combustion = ["9L25"];
	this.modData("Learnsets", "badasssuitmorty").learnset.hydroblast = ["9L30"];
	this.modData("Learnsets", "badasssuitmorty").learnset.scanweakness = ["9L40"];
	this.modData("Learnsets", "badasssuitmorty").learnset.laserstare = ["9L50"];

	// Glorzo Disguise Morty
	this.modData("Learnsets", "glorzodisguisemorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "glorzodisguisemorty").learnset.salivate = ["9L1"];
	this.modData("Learnsets", "glorzodisguisemorty").learnset.mope = ["9L4"];
	this.modData("Learnsets", "glorzodisguisemorty").learnset.infiltrate = ["9L8"];
	this.modData("Learnsets", "glorzodisguisemorty").learnset.pout = ["9L14"];
	this.modData("Learnsets", "glorzodisguisemorty").learnset.sneer = ["9L20"];
	this.modData("Learnsets", "glorzodisguisemorty").learnset.purplesquirt = ["9L26"];
	this.modData("Learnsets", "glorzodisguisemorty").learnset.impersonate = ["9L31"];
	this.modData("Learnsets", "glorzodisguisemorty").learnset.delouse = ["9L38"];
	this.modData("Learnsets", "glorzodisguisemorty").learnset.slobber = ["9L45"];

	// S.O.S. Morty
	this.modData("Learnsets", "sosmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "sosmorty").learnset.deadstare = ["9L5"];
	this.modData("Learnsets", "sosmorty").learnset.sneeze = ["9L10"];
	this.modData("Learnsets", "sosmorty").learnset.frostbite = ["9L15"];
	this.modData("Learnsets", "sosmorty").learnset.thaw = ["9L21"];
	this.modData("Learnsets", "sosmorty").learnset.harden = ["9L28"];
	this.modData("Learnsets", "sosmorty").learnset.shiver = ["9L33"];
	this.modData("Learnsets", "sosmorty").learnset.stargaze = ["9L37"];
	this.modData("Learnsets", "sosmorty").learnset.fortify = ["9L44"];

	// Nargles Morty
	this.modData("Learnsets", "narglesmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "narglesmorty").learnset.swing = ["9L1"];
	this.modData("Learnsets", "narglesmorty").learnset.staredown = ["9L6"];
	this.modData("Learnsets", "narglesmorty").learnset.stickup = ["9L11"];
	this.modData("Learnsets", "narglesmorty").learnset.cut = ["9L17"];
	this.modData("Learnsets", "narglesmorty").learnset.intimidate = ["9L23"];
	this.modData("Learnsets", "narglesmorty").learnset.cuttinggaze = ["9L28"];
	this.modData("Learnsets", "narglesmorty").learnset.extort = ["9L34"];
	this.modData("Learnsets", "narglesmorty").learnset.mangle = ["9L40"];

	// Brake Fluid Morty
	this.modData("Learnsets", "brakefluidmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "brakefluidmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "brakefluidmorty").learnset.mope = ["9L6"];
	this.modData("Learnsets", "brakefluidmorty").learnset.bluespray = ["9L12"];
	this.modData("Learnsets", "brakefluidmorty").learnset.enrage = ["9L18"];
	this.modData("Learnsets", "brakefluidmorty").learnset.brainfreeze = ["9L22"];
	this.modData("Learnsets", "brakefluidmorty").learnset.focus = ["9L25"];
	this.modData("Learnsets", "brakefluidmorty").learnset.piercingstare = ["9L30"];
	this.modData("Learnsets", "brakefluidmorty").learnset.dogfight = ["9L36"];

	// Drone Morty
	this.modData("Learnsets", "dronemorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "dronemorty").learnset.compute = ["9L1"];
	this.modData("Learnsets", "dronemorty").learnset.vaporize = ["9L5"];
	this.modData("Learnsets", "dronemorty").learnset.negativeenergy = ["9L11"];
	this.modData("Learnsets", "dronemorty").learnset.grab = ["9L16"];
	this.modData("Learnsets", "dronemorty").learnset.wall = ["9L21"];
	this.modData("Learnsets", "dronemorty").learnset.crush = ["9L25"];
	this.modData("Learnsets", "dronemorty").learnset.staticshock = ["9L30"];
	this.modData("Learnsets", "dronemorty").learnset.claw = ["9L35"];
	this.modData("Learnsets", "dronemorty").learnset.weldingtorch = ["9L40"];

	// Dragon Morty
	this.modData("Learnsets", "dragonmorty").learnset.cough = ["9L1"];
	this.modData("Learnsets", "dragonmorty").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "dragonmorty").learnset.sicken = ["9L5"];
	this.modData("Learnsets", "dragonmorty").learnset.soulsearch = ["9L10"];
	this.modData("Learnsets", "dragonmorty").learnset.hibernate = ["9L16"];
	this.modData("Learnsets", "dragonmorty").learnset.fireball = ["9L22"];
	this.modData("Learnsets", "dragonmorty").learnset.soulbondage = ["9L28"];
	this.modData("Learnsets", "dragonmorty").learnset.dragoncall = ["9L34"];
	this.modData("Learnsets", "dragonmorty").learnset.claw = ["9L40"];
	this.modData("Learnsets", "dragonmorty").learnset.soulsteal = ["9L48"];

	// Beth's Pet Morty
	this.modData("Learnsets", "bethspetmorty").learnset.furball = ["9L1"];
	this.modData("Learnsets", "bethspetmorty").learnset.prey = ["9L1"];
	this.modData("Learnsets", "bethspetmorty").learnset.nibble = ["9L6"];
	this.modData("Learnsets", "bethspetmorty").learnset.fireplay = ["9L12"];
	this.modData("Learnsets", "bethspetmorty").learnset.hibernate = ["9L16"];
	this.modData("Learnsets", "bethspetmorty").learnset.twinflame = ["9L22"];
	this.modData("Learnsets", "bethspetmorty").learnset.fetch = ["9L27"];
	this.modData("Learnsets", "bethspetmorty").learnset.fury = ["9L32"];
	this.modData("Learnsets", "bethspetmorty").learnset.scratchandsniff = ["9L40"];
	this.modData("Learnsets", "bethspetmorty").learnset.fiercelunge = ["9L48"];

	// Rick's Pet Morty
	this.modData("Learnsets", "rickspetmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "rickspetmorty").learnset.protect = ["9L1"];
	this.modData("Learnsets", "rickspetmorty").learnset.cry = ["9L5"];
	this.modData("Learnsets", "rickspetmorty").learnset.mirrorimage = ["9L11"];
	this.modData("Learnsets", "rickspetmorty").learnset.cower = ["9L16"];
	this.modData("Learnsets", "rickspetmorty").learnset.fetch = ["9L21"];
	this.modData("Learnsets", "rickspetmorty").learnset.thunderclap = ["9L28"];
	this.modData("Learnsets", "rickspetmorty").learnset.vilespew = ["9L32"];
	this.modData("Learnsets", "rickspetmorty").learnset.headache = ["9L40"];
	this.modData("Learnsets", "rickspetmorty").learnset.mangle = ["9L45"];

	// MortyBot
	this.modData("Learnsets", "mortybot").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "mortybot").learnset.compute = ["9L1"];
	this.modData("Learnsets", "mortybot").learnset.plasmaburst = ["9L6"];
	this.modData("Learnsets", "mortybot").learnset.laserstare = ["9L12"];
	this.modData("Learnsets", "mortybot").learnset.vaporize = ["9L18"];
	this.modData("Learnsets", "mortybot").learnset.crush = ["9L24"];
	this.modData("Learnsets", "mortybot").learnset.flavorpunch = ["9L29"];
	this.modData("Learnsets", "mortybot").learnset.beam = ["9L35"];
	this.modData("Learnsets", "mortybot").learnset.flavorcombo = ["9L40"];
	this.modData("Learnsets", "mortybot").learnset.implode = ["9L45"];

	// Cookout Morty
	this.modData("Learnsets", "cookoutmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "cookoutmorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "cookoutmorty").learnset.torch = ["9L6"];
	this.modData("Learnsets", "cookoutmorty").learnset.belch = ["9L10"];
	this.modData("Learnsets", "cookoutmorty").learnset.fireplay = ["9L15"];
	this.modData("Learnsets", "cookoutmorty").learnset.burgervolley = ["9L22"];
	this.modData("Learnsets", "cookoutmorty").learnset.grillseason = ["9L29"];
	this.modData("Learnsets", "cookoutmorty").learnset.jab = ["9L35"];
	this.modData("Learnsets", "cookoutmorty").learnset.slash = ["9L40"];
	this.modData("Learnsets", "cookoutmorty").learnset.inferno = ["9L45"];

	// Declaration Morty
	this.modData("Learnsets", "declarationmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "declarationmorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "declarationmorty").learnset.curl = ["9L8"];
	this.modData("Learnsets", "declarationmorty").learnset.erase = ["9L10"];
	this.modData("Learnsets", "declarationmorty").learnset.righteousretribution = ["9L14"];
	this.modData("Learnsets", "declarationmorty").learnset.deathstare = ["9L19"];
	this.modData("Learnsets", "declarationmorty").learnset.flutter = ["9L24"];
	this.modData("Learnsets", "declarationmorty").learnset.ideclare = ["9L29"];
	this.modData("Learnsets", "declarationmorty").learnset.signautograph = ["9L35"];
	this.modData("Learnsets", "declarationmorty").learnset.retainstrength = ["9L42"];

	// Liberty Morty
	this.modData("Learnsets", "libertymorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "libertymorty").learnset.slam = ["9L5"];
	this.modData("Learnsets", "libertymorty").learnset.blindswing = ["9L9"];
	this.modData("Learnsets", "libertymorty").learnset.oxidize = ["9L13"];
	this.modData("Learnsets", "libertymorty").learnset.wall = ["9L17"];
	this.modData("Learnsets", "libertymorty").learnset.swing = ["9L22"];
	this.modData("Learnsets", "libertymorty").learnset.focus = ["9L26"];
	this.modData("Learnsets", "libertymorty").learnset.lighttheway = ["9L30"];
	this.modData("Learnsets", "libertymorty").learnset.charging = ["9L36"];
	this.modData("Learnsets", "libertymorty").learnset.bodycheck = ["9L42"];

	// Child of Gaia
	this.modData("Learnsets", "childofgaia").learnset.slumber = ["9L1"];
	this.modData("Learnsets", "childofgaia").learnset.dig = ["9L3"];
	this.modData("Learnsets", "childofgaia").learnset.fixerupper = ["9L8"];
	this.modData("Learnsets", "childofgaia").learnset.blindswing = ["9L13"];
	this.modData("Learnsets", "childofgaia").learnset.lackofabandonment = ["9L18"];
	this.modData("Learnsets", "childofgaia").learnset.medicate = ["9L23"];
	this.modData("Learnsets", "childofgaia").learnset.stonegaze = ["9L28"];
	this.modData("Learnsets", "childofgaia").learnset.productivepunches = ["9L33"];
	this.modData("Learnsets", "childofgaia").learnset.bunchup = ["9L39"];
	this.modData("Learnsets", "childofgaia").learnset.traumatize = ["9L46"];

	// Back to the Past Morty
	this.modData("Learnsets", "backtothepastmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "backtothepastmorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "backtothepastmorty").learnset.grieve = ["9L9"];
	this.modData("Learnsets", "backtothepastmorty").learnset.jab = ["9L15"];
	this.modData("Learnsets", "backtothepastmorty").learnset.usethelight = ["9L20"];
	this.modData("Learnsets", "backtothepastmorty").learnset.rush = ["9L24"];
	this.modData("Learnsets", "backtothepastmorty").learnset.slash = ["9L29"];
	this.modData("Learnsets", "backtothepastmorty").learnset.jumpgood = ["9L33"];
	this.modData("Learnsets", "backtothepastmorty").learnset.defend = ["9L38"];
	this.modData("Learnsets", "backtothepastmorty").learnset.retainstrength = ["9L41"];

	// Supernova Morty
	this.modData("Learnsets", "supernovamorty").learnset.cellsplitter = ["9L1"];
	this.modData("Learnsets", "supernovamorty").learnset.absorb = ["9L1"];
	this.modData("Learnsets", "supernovamorty").learnset.stellarexplosion = ["9L4"];
	this.modData("Learnsets", "supernovamorty").learnset.deathstare = ["9L9"];
	this.modData("Learnsets", "supernovamorty").learnset.soulsearch = ["9L15"];
	this.modData("Learnsets", "supernovamorty").learnset.mindread = ["9L20"];
	this.modData("Learnsets", "supernovamorty").learnset.aura = ["9L25"];
	this.modData("Learnsets", "supernovamorty").learnset.supernova = ["9L28"];
	this.modData("Learnsets", "supernovamorty").learnset.unspokenbond = ["9L32"];
	this.modData("Learnsets", "supernovamorty").learnset.eventhorizon = ["9L37"];

	// Birdperson Morty
	this.modData("Learnsets", "birdpersonmorty").learnset.squeak = ["9L1"];
	this.modData("Learnsets", "birdpersonmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "birdpersonmorty").learnset.henpeck = ["9L5"];
	this.modData("Learnsets", "birdpersonmorty").learnset.perchandpoop = ["9L9"];
	this.modData("Learnsets", "birdpersonmorty").learnset.strengthen = ["9L15"];
	this.modData("Learnsets", "birdpersonmorty").learnset.flutter = ["9L20"];
	this.modData("Learnsets", "birdpersonmorty").learnset.prey = ["9L26"];
	this.modData("Learnsets", "birdpersonmorty").learnset.wingblast = ["9L31"];
	this.modData("Learnsets", "birdpersonmorty").learnset.sonicsquawk = ["9L36"];
	this.modData("Learnsets", "birdpersonmorty").learnset.mindmeld = ["9L40"];

	// Stone Age Morty
	this.modData("Learnsets", "stoneagemorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "stoneagemorty").learnset.relax = ["9L6"];
	this.modData("Learnsets", "stoneagemorty").learnset.stone = ["9L11"];
	this.modData("Learnsets", "stoneagemorty").learnset.staredown = ["9L16"];
	this.modData("Learnsets", "stoneagemorty").learnset.pillage = ["9L22"];
	this.modData("Learnsets", "stoneagemorty").learnset.gatherbythefire = ["9L27"];
	this.modData("Learnsets", "stoneagemorty").learnset.stonefists = ["9L32"];
	this.modData("Learnsets", "stoneagemorty").learnset.fiercelunge = ["9L36"];

	// Bronze Age Morty
	this.modData("Learnsets", "bronzeagemorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "bronzeagemorty").learnset.relax = ["9L6"];
	this.modData("Learnsets", "bronzeagemorty").learnset.stone = ["9L11"];
	this.modData("Learnsets", "bronzeagemorty").learnset.staredown = ["9L16"];
	this.modData("Learnsets", "bronzeagemorty").learnset.pillage = ["9L22"];
	this.modData("Learnsets", "bronzeagemorty").learnset.gatherbythefire = ["9L27"];
	this.modData("Learnsets", "bronzeagemorty").learnset.stonefists = ["9L32"];
	this.modData("Learnsets", "bronzeagemorty").learnset.fiercelunge = ["9L36"];
	this.modData("Learnsets", "bronzeagemorty").learnset.essedumhitandrun = ["9L40"];

	// Iron Age Morty
	this.modData("Learnsets", "ironagemorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "ironagemorty").learnset.relax = ["9L6"];
	this.modData("Learnsets", "ironagemorty").learnset.stone = ["9L11"];
	this.modData("Learnsets", "ironagemorty").learnset.staredown = ["9L16"];
	this.modData("Learnsets", "ironagemorty").learnset.pillage = ["9L22"];
	this.modData("Learnsets", "ironagemorty").learnset.gatherbythefire = ["9L27"];
	this.modData("Learnsets", "ironagemorty").learnset.stonefists = ["9L32"];
	this.modData("Learnsets", "ironagemorty").learnset.fiercelunge = ["9L36"];
	this.modData("Learnsets", "ironagemorty").learnset.essedumhitandrun = ["9L40"];
	this.modData("Learnsets", "ironagemorty").learnset.shieldwall = ["9L45"];

	// Chicken Trader Morty
	this.modData("Learnsets", "chickentradermorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "chickentradermorty").learnset.stockup = ["9L1"];
	this.modData("Learnsets", "chickentradermorty").learnset.delegate = ["9L5"];
	this.modData("Learnsets", "chickentradermorty").learnset.blindswing = ["9L10"];
	this.modData("Learnsets", "chickentradermorty").learnset.pricegouge = ["9L16"];
	this.modData("Learnsets", "chickentradermorty").learnset.distract = ["9L21"];
	this.modData("Learnsets", "chickentradermorty").learnset.icytouch = ["9L25"];
	this.modData("Learnsets", "chickentradermorty").learnset.stockcrash = ["9L30"];

	// Stock Trader Morty
	this.modData("Learnsets", "stocktradermorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "stocktradermorty").learnset.stockup = ["9L1"];
	this.modData("Learnsets", "stocktradermorty").learnset.delegate = ["9L5"];
	this.modData("Learnsets", "stocktradermorty").learnset.blindswing = ["9L10"];
	this.modData("Learnsets", "stocktradermorty").learnset.pricegouge = ["9L16"];
	this.modData("Learnsets", "stocktradermorty").learnset.distract = ["9L21"];
	this.modData("Learnsets", "stocktradermorty").learnset.icytouch = ["9L25"];
	this.modData("Learnsets", "stocktradermorty").learnset.stockcrash = ["9L30"];
	this.modData("Learnsets", "stocktradermorty").learnset.arbitrage = ["9L36"];

	// Space Trader Morty
	this.modData("Learnsets", "spacetradermorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "spacetradermorty").learnset.stockup = ["9L1"];
	this.modData("Learnsets", "spacetradermorty").learnset.piteouswretch = ["9L5"];
	this.modData("Learnsets", "spacetradermorty").learnset.blindswing = ["9L10"];
	this.modData("Learnsets", "spacetradermorty").learnset.pricegouge = ["9L16"];
	this.modData("Learnsets", "spacetradermorty").learnset.distract = ["9L21"];
	this.modData("Learnsets", "spacetradermorty").learnset.lasso = ["9L25"];
	this.modData("Learnsets", "spacetradermorty").learnset.stockcrash = ["9L30"];
	this.modData("Learnsets", "spacetradermorty").learnset.arbitrage = ["9L36"];
	this.modData("Learnsets", "spacetradermorty").learnset.astronomicaldeal = ["9L41"];

	// Blogger Morty
	this.modData("Learnsets", "bloggermorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "bloggermorty").learnset.preach = ["9L5"];
	this.modData("Learnsets", "bloggermorty").learnset.lifestory = ["9L9"];
	this.modData("Learnsets", "bloggermorty").learnset.selfie = ["9L15"];
	this.modData("Learnsets", "bloggermorty").learnset.negativeenergy = ["9L19"];
	this.modData("Learnsets", "bloggermorty").learnset.listicle = ["9L24"];
	this.modData("Learnsets", "bloggermorty").learnset.selfpromote = ["9L28"];
	this.modData("Learnsets", "bloggermorty").learnset.monetize = ["9L33"];

	// Vlogger Morty
	this.modData("Learnsets", "vloggermorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "vloggermorty").learnset.preach = ["9L5"];
	this.modData("Learnsets", "vloggermorty").learnset.lifestory = ["9L9"];
	this.modData("Learnsets", "vloggermorty").learnset.selfie = ["9L15"];
	this.modData("Learnsets", "vloggermorty").learnset.negativeenergy = ["9L19"];
	this.modData("Learnsets", "vloggermorty").learnset.listicle = ["9L24"];
	this.modData("Learnsets", "vloggermorty").learnset.selfpromote = ["9L28"];
	this.modData("Learnsets", "vloggermorty").learnset.monetize = ["9L33"];
	this.modData("Learnsets", "vloggermorty").learnset.collaborate = ["9L39"];

	// Influencer Morty
	this.modData("Learnsets", "influencermorty").learnset.brand = ["9L1"];
	this.modData("Learnsets", "influencermorty").learnset.preach = ["9L5"];
	this.modData("Learnsets", "influencermorty").learnset.lifestory = ["9L9"];
	this.modData("Learnsets", "influencermorty").learnset.selfie = ["9L15"];
	this.modData("Learnsets", "influencermorty").learnset.negativeenergy = ["9L19"];
	this.modData("Learnsets", "influencermorty").learnset.listicle = ["9L24"];
	this.modData("Learnsets", "influencermorty").learnset.selfpromote = ["9L28"];
	this.modData("Learnsets", "influencermorty").learnset.monetize = ["9L33"];
	this.modData("Learnsets", "influencermorty").learnset.collaborate = ["9L39"];
	this.modData("Learnsets", "influencermorty").learnset.apologyvideo = ["9L45"];

	// Baby Morty
	this.modData("Learnsets", "babymorty").learnset.vomit = ["9L1"];
	this.modData("Learnsets", "babymorty").learnset.noxiousfumes = ["9L3"];
	this.modData("Learnsets", "babymorty").learnset.nap = ["9L8"];
	this.modData("Learnsets", "babymorty").learnset.belch = ["9L12"];
	this.modData("Learnsets", "babymorty").learnset.mope = ["9L17"];
	this.modData("Learnsets", "babymorty").learnset.grab = ["9L22"];
	this.modData("Learnsets", "babymorty").learnset.grossout = ["9L26"];
	this.modData("Learnsets", "babymorty").learnset.wedgie = ["9L32"];

	// College Morty
	this.modData("Learnsets", "collegemorty").learnset.vomit = ["9L1"];
	this.modData("Learnsets", "collegemorty").learnset.noxiousfumes = ["9L3"];
	this.modData("Learnsets", "collegemorty").learnset.nap = ["9L8"];
	this.modData("Learnsets", "collegemorty").learnset.belch = ["9L12"];
	this.modData("Learnsets", "collegemorty").learnset.mope = ["9L17"];
	this.modData("Learnsets", "collegemorty").learnset.grab = ["9L22"];
	this.modData("Learnsets", "collegemorty").learnset.grossout = ["9L26"];
	this.modData("Learnsets", "collegemorty").learnset.wedgie = ["9L32"];
	this.modData("Learnsets", "collegemorty").learnset.kegstand = ["9L37"];

	// Adult Morty
	this.modData("Learnsets", "adultmorty").learnset.vomit = ["9L1"];
	this.modData("Learnsets", "adultmorty").learnset.noxiousfumes = ["9L3"];
	this.modData("Learnsets", "adultmorty").learnset.nap = ["9L8"];
	this.modData("Learnsets", "adultmorty").learnset.belch = ["9L12"];
	this.modData("Learnsets", "adultmorty").learnset.mope = ["9L17"];
	this.modData("Learnsets", "adultmorty").learnset.grab = ["9L22"];
	this.modData("Learnsets", "adultmorty").learnset.grossout = ["9L26"];
	this.modData("Learnsets", "adultmorty").learnset.wedgie = ["9L32"];
	this.modData("Learnsets", "adultmorty").learnset.kegstand = ["9L37"];
	this.modData("Learnsets", "adultmorty").learnset.funandgames = ["9L41"];

	// Agent Morty
	this.modData("Learnsets", "agentmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "agentmorty").learnset.breakin = ["9L1"];
	this.modData("Learnsets", "agentmorty").learnset.getdownmrpresident = ["9L7"];
	this.modData("Learnsets", "agentmorty").learnset.intimidate = ["9L11"];
	this.modData("Learnsets", "agentmorty").learnset.probe = ["9L16"];
	this.modData("Learnsets", "agentmorty").learnset.bodytackle = ["9L21"];
	this.modData("Learnsets", "agentmorty").learnset.rush = ["9L27"];
	this.modData("Learnsets", "agentmorty").learnset.blitz = ["9L33"];

	// Spy Morty
	this.modData("Learnsets", "spymorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "spymorty").learnset.breakin = ["9L1"];
	this.modData("Learnsets", "spymorty").learnset.getdownmrpresident = ["9L7"];
	this.modData("Learnsets", "spymorty").learnset.intimidate = ["9L11"];
	this.modData("Learnsets", "spymorty").learnset.probe = ["9L16"];
	this.modData("Learnsets", "spymorty").learnset.bodytackle = ["9L21"];
	this.modData("Learnsets", "spymorty").learnset.rush = ["9L27"];
	this.modData("Learnsets", "spymorty").learnset.blitz = ["9L33"];
	this.modData("Learnsets", "spymorty").learnset.espionage = ["9L39"];

	// Spec Ops Morty
	this.modData("Learnsets", "specopsmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "specopsmorty").learnset.breakin = ["9L1"];
	this.modData("Learnsets", "specopsmorty").learnset.getdownmrpresident = ["9L7"];
	this.modData("Learnsets", "specopsmorty").learnset.intimidate = ["9L11"];
	this.modData("Learnsets", "specopsmorty").learnset.probe = ["9L16"];
	this.modData("Learnsets", "specopsmorty").learnset.bodytackle = ["9L21"];
	this.modData("Learnsets", "specopsmorty").learnset.rush = ["9L27"];
	this.modData("Learnsets", "specopsmorty").learnset.blitz = ["9L33"];
	this.modData("Learnsets", "specopsmorty").learnset.espionage = ["9L39"];
	this.modData("Learnsets", "specopsmorty").learnset.covertoperation = ["9L45"];

	// Static Morty
	this.modData("Learnsets", "staticmorty").learnset.plasmaburst = ["9L1"];
	this.modData("Learnsets", "staticmorty").learnset.engulf = ["9L1"];
	this.modData("Learnsets", "staticmorty").learnset.electroshock = ["9L6"];
	this.modData("Learnsets", "staticmorty").learnset.powerpose = ["9L11"];
	this.modData("Learnsets", "staticmorty").learnset.focus = ["9L17"];
	this.modData("Learnsets", "staticmorty").learnset.thunderclap = ["9L23"];
	this.modData("Learnsets", "staticmorty").learnset.lightningbolt = ["9L28"];
	this.modData("Learnsets", "staticmorty").learnset.fastcharging = ["9L33"];

	// High Voltage Morty
	this.modData("Learnsets", "highvoltagemorty").learnset.plasmaburst = ["9L1"];
	this.modData("Learnsets", "highvoltagemorty").learnset.engulf = ["9L1"];
	this.modData("Learnsets", "highvoltagemorty").learnset.electroshock = ["9L6"];
	this.modData("Learnsets", "highvoltagemorty").learnset.powerpose = ["9L11"];
	this.modData("Learnsets", "highvoltagemorty").learnset.focus = ["9L17"];
	this.modData("Learnsets", "highvoltagemorty").learnset.thunderclap = ["9L23"];
	this.modData("Learnsets", "highvoltagemorty").learnset.lightningbolt = ["9L28"];
	this.modData("Learnsets", "highvoltagemorty").learnset.fastcharging = ["9L33"];
	this.modData("Learnsets", "highvoltagemorty").learnset.zap = ["9L38"];

	// Electrokinesis Morty
	this.modData("Learnsets", "electrokinesismorty").learnset.plasmaburst = ["9L1"];
	this.modData("Learnsets", "electrokinesismorty").learnset.engulf = ["9L1"];
	this.modData("Learnsets", "electrokinesismorty").learnset.electroshock = ["9L6"];
	this.modData("Learnsets", "electrokinesismorty").learnset.powerpose = ["9L11"];
	this.modData("Learnsets", "electrokinesismorty").learnset.focus = ["9L17"];
	this.modData("Learnsets", "electrokinesismorty").learnset.thunderclap = ["9L23"];
	this.modData("Learnsets", "electrokinesismorty").learnset.lightningbolt = ["9L28"];
	this.modData("Learnsets", "electrokinesismorty").learnset.fastcharging = ["9L33"];
	this.modData("Learnsets", "electrokinesismorty").learnset.zap = ["9L38"];
	this.modData("Learnsets", "electrokinesismorty").learnset.electricslide = ["9L44"];

	// Season 4 Morty
	this.modData("Learnsets", "season4morty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "season4morty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "season4morty").learnset.provoke = ["9L6"];
	this.modData("Learnsets", "season4morty").learnset.combustion = ["9L10"];
	this.modData("Learnsets", "season4morty").learnset.blink = ["9L16"];
	this.modData("Learnsets", "season4morty").learnset.slurp = ["9L20"];
	this.modData("Learnsets", "season4morty").learnset.mock = ["9L24"];
	this.modData("Learnsets", "season4morty").learnset.constrict = ["9L29"];
	this.modData("Learnsets", "season4morty").learnset.deathcrystal = ["9L34"];
	this.modData("Learnsets", "season4morty").learnset.seethetruth = ["9L38"];

	// Tourist Morty
	this.modData("Learnsets", "touristmorty").learnset.poke = ["9L1"];
	this.modData("Learnsets", "touristmorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "touristmorty").learnset.flail = ["9L6"];
	this.modData("Learnsets", "touristmorty").learnset.familytree = ["9L9"];
	this.modData("Learnsets", "touristmorty").learnset.party = ["9L16"];
	this.modData("Learnsets", "touristmorty").learnset.cameraflash = ["9L20"];
	this.modData("Learnsets", "touristmorty").learnset.frostbite = ["9L24"];
	this.modData("Learnsets", "touristmorty").learnset.pray = ["9L29"];

	// Tour Guide Morty
	this.modData("Learnsets", "tourguidemorty").learnset.poke = ["9L1"];
	this.modData("Learnsets", "tourguidemorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "tourguidemorty").learnset.flail = ["9L6"];
	this.modData("Learnsets", "tourguidemorty").learnset.familytree = ["9L9"];
	this.modData("Learnsets", "tourguidemorty").learnset.party = ["9L16"];
	this.modData("Learnsets", "tourguidemorty").learnset.cameraflash = ["9L20"];
	this.modData("Learnsets", "tourguidemorty").learnset.frostbite = ["9L24"];
	this.modData("Learnsets", "tourguidemorty").learnset.pray = ["9L29"];
	this.modData("Learnsets", "tourguidemorty").learnset.gigaphone = ["9L34"];

	// Mountain Guide Morty
	this.modData("Learnsets", "mountainguidemorty").learnset.poke = ["9L1"];
	this.modData("Learnsets", "mountainguidemorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "mountainguidemorty").learnset.flail = ["9L6"];
	this.modData("Learnsets", "mountainguidemorty").learnset.familytree = ["9L9"];
	this.modData("Learnsets", "mountainguidemorty").learnset.party = ["9L16"];
	this.modData("Learnsets", "mountainguidemorty").learnset.cameraflash = ["9L20"];
	this.modData("Learnsets", "mountainguidemorty").learnset.frostbite = ["9L24"];
	this.modData("Learnsets", "mountainguidemorty").learnset.pray = ["9L29"];
	this.modData("Learnsets", "mountainguidemorty").learnset.gigaphone = ["9L34"];
	this.modData("Learnsets", "mountainguidemorty").learnset.altitudesickness = ["9L40"];

	// Employee Morty
	this.modData("Learnsets", "employeemorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "employeemorty").learnset.mope = ["9L1"];
	this.modData("Learnsets", "employeemorty").learnset.delegate = ["9L6"];
	this.modData("Learnsets", "employeemorty").learnset.salesstrike = ["9L9"];
	this.modData("Learnsets", "employeemorty").learnset.prioritize = ["9L14"];
	this.modData("Learnsets", "employeemorty").learnset.piercingstare = ["9L20"];
	this.modData("Learnsets", "employeemorty").learnset.workforcewallop = ["9L28"];
	this.modData("Learnsets", "employeemorty").learnset.stockcrash = ["9L33"];

	// Assistant Manager Morty
	this.modData("Learnsets", "assistantmanagermorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "assistantmanagermorty").learnset.mope = ["9L1"];
	this.modData("Learnsets", "assistantmanagermorty").learnset.delegate = ["9L6"];
	this.modData("Learnsets", "assistantmanagermorty").learnset.salesstrike = ["9L9"];
	this.modData("Learnsets", "assistantmanagermorty").learnset.prioritize = ["9L14"];
	this.modData("Learnsets", "assistantmanagermorty").learnset.piercingstare = ["9L20"];
	this.modData("Learnsets", "assistantmanagermorty").learnset.workforcewallop = ["9L28"];
	this.modData("Learnsets", "assistantmanagermorty").learnset.stockcrash = ["9L33"];
	this.modData("Learnsets", "assistantmanagermorty").learnset.leadershiplariat = ["9L38"];

	// Night Manager Morty
	this.modData("Learnsets", "nightmanagermorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "nightmanagermorty").learnset.mope = ["9L1"];
	this.modData("Learnsets", "nightmanagermorty").learnset.delegate = ["9L6"];
	this.modData("Learnsets", "nightmanagermorty").learnset.salesstrike = ["9L9"];
	this.modData("Learnsets", "nightmanagermorty").learnset.prioritize = ["9L14"];
	this.modData("Learnsets", "nightmanagermorty").learnset.piercingstare = ["9L20"];
	this.modData("Learnsets", "nightmanagermorty").learnset.workforcewallop = ["9L28"];
	this.modData("Learnsets", "nightmanagermorty").learnset.stockcrash = ["9L33"];
	this.modData("Learnsets", "nightmanagermorty").learnset.leadershiplariat = ["9L38"];
	this.modData("Learnsets", "nightmanagermorty").learnset.capitalismcrush = ["9L45"];

	// Prince Morty
	this.modData("Learnsets", "princemorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "princemorty").learnset.snub = ["9L1"];
	this.modData("Learnsets", "princemorty").learnset.entitlement = ["9L6"];
	this.modData("Learnsets", "princemorty").learnset.beam = ["9L10"];
	this.modData("Learnsets", "princemorty").learnset.deathstare = ["9L15"];
	this.modData("Learnsets", "princemorty").learnset.staredown = ["9L19"];
	this.modData("Learnsets", "princemorty").learnset.sparkle = ["9L24"];
	this.modData("Learnsets", "princemorty").learnset.royalprerogative = ["9L29"];

	// Princess Morty
	this.modData("Learnsets", "princessmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "princessmorty").learnset.snub = ["9L1"];
	this.modData("Learnsets", "princessmorty").learnset.entitlement = ["9L6"];
	this.modData("Learnsets", "princessmorty").learnset.beam = ["9L10"];
	this.modData("Learnsets", "princessmorty").learnset.deathstare = ["9L15"];
	this.modData("Learnsets", "princessmorty").learnset.staredown = ["9L19"];
	this.modData("Learnsets", "princessmorty").learnset.sparkle = ["9L24"];
	this.modData("Learnsets", "princessmorty").learnset.royalprerogative = ["9L29"];
	this.modData("Learnsets", "princessmorty").learnset.wickedfruit = ["9L34"];

	// Queen Morty
	this.modData("Learnsets", "queenmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "queenmorty").learnset.snub = ["9L1"];
	this.modData("Learnsets", "queenmorty").learnset.entitlement = ["9L6"];
	this.modData("Learnsets", "queenmorty").learnset.beam = ["9L10"];
	this.modData("Learnsets", "queenmorty").learnset.deathstare = ["9L15"];
	this.modData("Learnsets", "queenmorty").learnset.staredown = ["9L19"];
	this.modData("Learnsets", "queenmorty").learnset.sparkle = ["9L24"];
	this.modData("Learnsets", "queenmorty").learnset.royalprerogative = ["9L29"];
	this.modData("Learnsets", "queenmorty").learnset.wickedfruit = ["9L34"];
	this.modData("Learnsets", "queenmorty").learnset.sceptresmash = ["9L40"];

	// Sands of Time Morty
	this.modData("Learnsets", "sandsoftimemorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "sandsoftimemorty").learnset.weardown = ["9L5"];
	this.modData("Learnsets", "sandsoftimemorty").learnset.timedilation = ["9L8"];
	this.modData("Learnsets", "sandsoftimemorty").learnset.flutter = ["9L15"];
	this.modData("Learnsets", "sandsoftimemorty").learnset.clarity = ["9L22"];
	this.modData("Learnsets", "sandsoftimemorty").learnset.timehealsall = ["9L26"];
	this.modData("Learnsets", "sandsoftimemorty").learnset.stitch = ["9L32"];
	this.modData("Learnsets", "sandsoftimemorty").learnset.focus = ["9L36"];

	// Hands of Time Morty
	this.modData("Learnsets", "handsoftimemorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "handsoftimemorty").learnset.weardown = ["9L5"];
	this.modData("Learnsets", "handsoftimemorty").learnset.timedilation = ["9L8"];
	this.modData("Learnsets", "handsoftimemorty").learnset.flutter = ["9L15"];
	this.modData("Learnsets", "handsoftimemorty").learnset.clarity = ["9L22"];
	this.modData("Learnsets", "handsoftimemorty").learnset.timehealsall = ["9L26"];
	this.modData("Learnsets", "handsoftimemorty").learnset.stitch = ["9L32"];
	this.modData("Learnsets", "handsoftimemorty").learnset.focus = ["9L36"];
	this.modData("Learnsets", "handsoftimemorty").learnset.bighandlittlehand = ["9L40"];

	// Man of Time Morty
	this.modData("Learnsets", "manoftimemorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "manoftimemorty").learnset.weardown = ["9L5"];
	this.modData("Learnsets", "manoftimemorty").learnset.timedilation = ["9L8"];
	this.modData("Learnsets", "manoftimemorty").learnset.flutter = ["9L15"];
	this.modData("Learnsets", "manoftimemorty").learnset.clarity = ["9L22"];
	this.modData("Learnsets", "manoftimemorty").learnset.timehealsall = ["9L26"];
	this.modData("Learnsets", "manoftimemorty").learnset.stitch = ["9L32"];
	this.modData("Learnsets", "manoftimemorty").learnset.focus = ["9L36"];
	this.modData("Learnsets", "manoftimemorty").learnset.bighandlittlehand = ["9L40"];
	this.modData("Learnsets", "manoftimemorty").learnset.timewaitsfornoone = ["9L46"];

	// Wine Boy Morty
	this.modData("Learnsets", "wineboymorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "wineboymorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "wineboymorty").learnset.mope = ["9L6"];
	this.modData("Learnsets", "wineboymorty").learnset.sicken = ["9L12"];
	this.modData("Learnsets", "wineboymorty").learnset.toxicchromiumspit = ["9L19"];
	this.modData("Learnsets", "wineboymorty").learnset.traumatize = ["9L24"];
	this.modData("Learnsets", "wineboymorty").learnset.toxicmetalparticles = ["9L29"];
	this.modData("Learnsets", "wineboymorty").learnset.bloodpressure = ["9L31"];
	this.modData("Learnsets", "wineboymorty").learnset.vapefume = ["9L36"];
	this.modData("Learnsets", "wineboymorty").learnset.regenerate = ["9L40"];

	// Gardener Morty
	this.modData("Learnsets", "gardenermorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "gardenermorty").learnset.breakin = ["9L1"];
	this.modData("Learnsets", "gardenermorty").learnset.mope = ["9L6"];
	this.modData("Learnsets", "gardenermorty").learnset.salivate = ["9L12"];
	this.modData("Learnsets", "gardenermorty").learnset.waft = ["9L15"];
	this.modData("Learnsets", "gardenermorty").learnset.magicdoor = ["9L18"];
	this.modData("Learnsets", "gardenermorty").learnset.regenerate = ["9L20"];
	this.modData("Learnsets", "gardenermorty").learnset.humiliate = ["9L24"];
	this.modData("Learnsets", "gardenermorty").learnset.sugarhoof = ["9L30"];
	this.modData("Learnsets", "gardenermorty").learnset.headache = ["9L37"];

	// Squid Morty
	this.modData("Learnsets", "squidmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "squidmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "squidmorty").learnset.relax = ["9L6"];
	this.modData("Learnsets", "squidmorty").learnset.clarity = ["9L12"];
	this.modData("Learnsets", "squidmorty").learnset.focus = ["9L16"];
	this.modData("Learnsets", "squidmorty").learnset.drowse = ["9L20"];
	this.modData("Learnsets", "squidmorty").learnset.heavedown = ["9L24"];
	this.modData("Learnsets", "squidmorty").learnset.soulsearch = ["9L29"];
	this.modData("Learnsets", "squidmorty").learnset.stripdance = ["9L34"];
	this.modData("Learnsets", "squidmorty").learnset.theend = ["9L38"];

	// Glockenspiel Morty
	this.modData("Learnsets", "glockenspielmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "glockenspielmorty").learnset.spar = ["9L1"];
	this.modData("Learnsets", "glockenspielmorty").learnset.flail = ["9L8"];
	this.modData("Learnsets", "glockenspielmorty").learnset.grab = ["9L12"];
	this.modData("Learnsets", "glockenspielmorty").learnset.mortify = ["9L18"];
	this.modData("Learnsets", "glockenspielmorty").learnset.swing = ["9L23"];
	this.modData("Learnsets", "glockenspielmorty").learnset.decoyline = ["9L26"];
	this.modData("Learnsets", "glockenspielmorty").learnset.squidcostume = ["9L29"];
	this.modData("Learnsets", "glockenspielmorty").learnset.splash = ["9L34"];
	this.modData("Learnsets", "glockenspielmorty").learnset.hydroblast = ["9L38"];

	// Toxic Metal Morty
	this.modData("Learnsets", "toxicmetalmorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "toxicmetalmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "toxicmetalmorty").learnset.blindswing = ["9L8"];
	this.modData("Learnsets", "toxicmetalmorty").learnset.fanart = ["9L15"];
	this.modData("Learnsets", "toxicmetalmorty").learnset.impersonate = ["9L21"];
	this.modData("Learnsets", "toxicmetalmorty").learnset.heavedown = ["9L25"];
	this.modData("Learnsets", "toxicmetalmorty").learnset.deathstare = ["9L29"];
	this.modData("Learnsets", "toxicmetalmorty").learnset.canofvarnish = ["9L32"];
	this.modData("Learnsets", "toxicmetalmorty").learnset.gloryofdeath = ["9L36"];
	this.modData("Learnsets", "toxicmetalmorty").learnset.retainstrength = ["9L41"];

	// Acid Rain Morty
	this.modData("Learnsets", "acidrainmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "acidrainmorty").learnset.fixerupper = ["9L1"];
	this.modData("Learnsets", "acidrainmorty").learnset.spar = ["9L6"];
	this.modData("Learnsets", "acidrainmorty").learnset.sicken = ["9L13"];
	this.modData("Learnsets", "acidrainmorty").learnset.crueltyfreedonuts = ["9L19"];
	this.modData("Learnsets", "acidrainmorty").learnset.lovebug = ["9L25"];
	this.modData("Learnsets", "acidrainmorty").learnset.newwave = ["9L28"];
	this.modData("Learnsets", "acidrainmorty").learnset.protect = ["9L32"];
	this.modData("Learnsets", "acidrainmorty").learnset.wildfire = ["9L37"];
	this.modData("Learnsets", "acidrainmorty").learnset.pout = ["9L40"];

	// Pizza Delivery Morty
	this.modData("Learnsets", "pizzadeliverymorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "pizzadeliverymorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "pizzadeliverymorty").learnset.lick = ["9L5"];
	this.modData("Learnsets", "pizzadeliverymorty").learnset.encrust = ["9L8"];
	this.modData("Learnsets", "pizzadeliverymorty").learnset.negativeenergy = ["9L15"];
	this.modData("Learnsets", "pizzadeliverymorty").learnset.elementalstrike = ["9L20"];
	this.modData("Learnsets", "pizzadeliverymorty").learnset.focus = ["9L24"];
	this.modData("Learnsets", "pizzadeliverymorty").learnset.gooeycheese = ["9L27"];
	this.modData("Learnsets", "pizzadeliverymorty").learnset.mouthoff = ["9L34"];
	this.modData("Learnsets", "pizzadeliverymorty").learnset.airs = ["9L38"];

	// Robe Morty
	this.modData("Learnsets", "robemorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "robemorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "robemorty").learnset.fetch = ["9L7"];
	this.modData("Learnsets", "robemorty").learnset.cough = ["9L12"];
	this.modData("Learnsets", "robemorty").learnset.bunchup = ["9L18"];
	this.modData("Learnsets", "robemorty").learnset.probe = ["9L22"];
	this.modData("Learnsets", "robemorty").learnset.entertain = ["9L27"];
	this.modData("Learnsets", "robemorty").learnset.dinnertime = ["9L30"];
	this.modData("Learnsets", "robemorty").learnset.horseray = ["9L33"];
	this.modData("Learnsets", "robemorty").learnset.afternoondelight = ["9L37"];

	// Professor Shabooboo Morty
	this.modData("Learnsets", "professorshabooboomorty").learnset.stalk = ["9L1"];
	this.modData("Learnsets", "professorshabooboomorty").learnset.plasmaburst = ["9L1"];
	this.modData("Learnsets", "professorshabooboomorty").learnset.attention = ["9L5"];
	this.modData("Learnsets", "professorshabooboomorty").learnset.specimensecured = ["9L9"];
	this.modData("Learnsets", "professorshabooboomorty").learnset.protect = ["9L13"];
	this.modData("Learnsets", "professorshabooboomorty").learnset.fanart = ["9L17"];
	this.modData("Learnsets", "professorshabooboomorty").learnset.weardown = ["9L21"];
	this.modData("Learnsets", "professorshabooboomorty").learnset.geneticcode = ["9L25"];
	this.modData("Learnsets", "professorshabooboomorty").learnset.mirrorimage = ["9L28"];
	this.modData("Learnsets", "professorshabooboomorty").learnset.energydrain = ["9L31"];

	// Changeformer Bro Morty
	this.modData("Learnsets", "changeformerbromorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "changeformerbromorty").learnset.provoke = ["9L2"];
	this.modData("Learnsets", "changeformerbromorty").learnset.combustion = ["9L6"];
	this.modData("Learnsets", "changeformerbromorty").learnset.compute = ["9L10"];
	this.modData("Learnsets", "changeformerbromorty").learnset.changeform = ["9L16"];
	this.modData("Learnsets", "changeformerbromorty").learnset.weardown = ["9L19"];
	this.modData("Learnsets", "changeformerbromorty").learnset.grab = ["9L21"];
	this.modData("Learnsets", "changeformerbromorty").learnset.bodycheck = ["9L25"];
	this.modData("Learnsets", "changeformerbromorty").learnset.cutthechut = ["9L28"];
	this.modData("Learnsets", "changeformerbromorty").learnset.fastcharging = ["9L32"];

	// Hell Demon Morty
	this.modData("Learnsets", "helldemonmorty").learnset.stalk = ["9L1"];
	this.modData("Learnsets", "helldemonmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "helldemonmorty").learnset.mindread = ["9L5"];
	this.modData("Learnsets", "helldemonmorty").learnset.probe = ["9L9"];
	this.modData("Learnsets", "helldemonmorty").learnset.humiliate = ["9L12"];
	this.modData("Learnsets", "helldemonmorty").learnset.energydrain = ["9L17"];
	this.modData("Learnsets", "helldemonmorty").learnset.essenceofhell = ["9L21"];
	this.modData("Learnsets", "helldemonmorty").learnset.constrict = ["9L25"];
	this.modData("Learnsets", "helldemonmorty").learnset.hypnotize = ["9L28"];
	this.modData("Learnsets", "helldemonmorty").learnset.greatdayforsuffering = ["9L32"];

	// Turkey Soldier Morty
	this.modData("Learnsets", "turkeysoldiermorty").learnset.absorb = ["9L1"];
	this.modData("Learnsets", "turkeysoldiermorty").learnset.vomit = ["9L1"];
	this.modData("Learnsets", "turkeysoldiermorty").learnset.lick = ["9L4"];
	this.modData("Learnsets", "turkeysoldiermorty").learnset.suitandboot = ["9L8"];
	this.modData("Learnsets", "turkeysoldiermorty").learnset.weardown = ["9L14"];
	this.modData("Learnsets", "turkeysoldiermorty").learnset.party = ["9L19"];
	this.modData("Learnsets", "turkeysoldiermorty").learnset.sing = ["9L25"];
	this.modData("Learnsets", "turkeysoldiermorty").learnset.vilespew = ["9L30"];
	this.modData("Learnsets", "turkeysoldiermorty").learnset.mindnumbinghello = ["9L36"];
	this.modData("Learnsets", "turkeysoldiermorty").learnset.explodingsun = ["9L40"];

	// Soldier Morty
	this.modData("Learnsets", "soldiermorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "soldiermorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "soldiermorty").learnset.enrage = ["9L6"];
	this.modData("Learnsets", "soldiermorty").learnset.kick = ["9L11"];
	this.modData("Learnsets", "soldiermorty").learnset.staredown = ["9L16"];
	this.modData("Learnsets", "soldiermorty").learnset.defend = ["9L20"];
	this.modData("Learnsets", "soldiermorty").learnset.pray = ["9L25"];
	this.modData("Learnsets", "soldiermorty").learnset.gobbletango = ["9L30"];
	this.modData("Learnsets", "soldiermorty").learnset.perchandpoop = ["9L34"];
	this.modData("Learnsets", "soldiermorty").learnset.truckfullofturkeys = ["9L39"];

	// Supernova Party Morty
	this.modData("Learnsets", "supernovapartymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "supernovapartymorty").learnset.attention = ["9L1"];
	this.modData("Learnsets", "supernovapartymorty").learnset.reminisce = ["9L5"];
	this.modData("Learnsets", "supernovapartymorty").learnset.provoke = ["9L8"];
	this.modData("Learnsets", "supernovapartymorty").learnset.crewcut = ["9L13"];
	this.modData("Learnsets", "supernovapartymorty").learnset.righteousretribution = ["9L16"];
	this.modData("Learnsets", "supernovapartymorty").learnset.holdmybaby = ["9L20"];
	this.modData("Learnsets", "supernovapartymorty").learnset.weardown = ["9L22"];
	this.modData("Learnsets", "supernovapartymorty").learnset.lockandload = ["9L25"];
	this.modData("Learnsets", "supernovapartymorty").learnset.defend = ["9L29"];

	// Boob World Morty
	this.modData("Learnsets", "boobworldmorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "boobworldmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "boobworldmorty").learnset.deadstare = ["9L5"];
	this.modData("Learnsets", "boobworldmorty").learnset.grab = ["9L8"];
	this.modData("Learnsets", "boobworldmorty").learnset.attention = ["9L13"];
	this.modData("Learnsets", "boobworldmorty").learnset.mope = ["9L18"];
	this.modData("Learnsets", "boobworldmorty").learnset.harden = ["9L22"];
	this.modData("Learnsets", "boobworldmorty").learnset.fanart = ["9L27"];
	this.modData("Learnsets", "boobworldmorty").learnset.obsessed = ["9L31"];
	this.modData("Learnsets", "boobworldmorty").learnset.voiceover = ["9L35"];

	// Gotron Morty
	this.modData("Learnsets", "gotronmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "gotronmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "gotronmorty").learnset.strengthen = ["9L5"];
	this.modData("Learnsets", "gotronmorty").learnset.kick = ["9L11"];
	this.modData("Learnsets", "gotronmorty").learnset.combustion = ["9L17"];
	this.modData("Learnsets", "gotronmorty").learnset.protect = ["9L22"];
	this.modData("Learnsets", "gotronmorty").learnset.regenerate = ["9L30"];
	this.modData("Learnsets", "gotronmorty").learnset.staredown = ["9L36"];
	this.modData("Learnsets", "gotronmorty").learnset.goteamgotron = ["9L41"];
	this.modData("Learnsets", "gotronmorty").learnset.gotronregroup = ["9L45"];

	// Birding Man Morty
	this.modData("Learnsets", "birdingmanmorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "birdingmanmorty").learnset.glitterblast = ["9L1"];
	this.modData("Learnsets", "birdingmanmorty").learnset.party = ["9L5"];
	this.modData("Learnsets", "birdingmanmorty").learnset.flowerchild = ["9L10"];
	this.modData("Learnsets", "birdingmanmorty").learnset.upbeat = ["9L16"];
	this.modData("Learnsets", "birdingmanmorty").learnset.stargaze = ["9L23"];
	this.modData("Learnsets", "birdingmanmorty").learnset.artsyfartsy = ["9L28"];
	this.modData("Learnsets", "birdingmanmorty").learnset.sparkle = ["9L32"];
	this.modData("Learnsets", "birdingmanmorty").learnset.psychedelicsmash = ["9L36"];
	this.modData("Learnsets", "birdingmanmorty").learnset.shieldwall = ["9L42"];

	// Tammy Morty
	this.modData("Learnsets", "tammymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "tammymorty").learnset.staredown = ["9L1"];
	this.modData("Learnsets", "tammymorty").learnset.vaporize = ["9L6"];
	this.modData("Learnsets", "tammymorty").learnset.protect = ["9L12"];
	this.modData("Learnsets", "tammymorty").learnset.rush = ["9L16"];
	this.modData("Learnsets", "tammymorty").learnset.intimidate = ["9L22"];
	this.modData("Learnsets", "tammymorty").learnset.birdlover = ["9L28"];
	this.modData("Learnsets", "tammymorty").learnset.focus = ["9L34"];
	this.modData("Learnsets", "tammymorty").learnset.squanchysquanch = ["9L40"];
	this.modData("Learnsets", "tammymorty").learnset.humiliate = ["9L48"];

	// Super Soldier Morty
	this.modData("Learnsets", "supersoldiermorty").learnset.suitandboot = ["9L1"];
	this.modData("Learnsets", "supersoldiermorty").learnset.absorb = ["9L1"];
	this.modData("Learnsets", "supersoldiermorty").learnset.clarity = ["9L6"];
	this.modData("Learnsets", "supersoldiermorty").learnset.weardown = ["9L10"];
	this.modData("Learnsets", "supersoldiermorty").learnset.bodytackle = ["9L15"];
	this.modData("Learnsets", "supersoldiermorty").learnset.compute = ["9L19"];
	this.modData("Learnsets", "supersoldiermorty").learnset.slash = ["9L24"];
	this.modData("Learnsets", "supersoldiermorty").learnset.righteousretribution = ["9L29"];
	this.modData("Learnsets", "supersoldiermorty").learnset.buckshot = ["9L33"];
	this.modData("Learnsets", "supersoldiermorty").learnset.turnupthebroiler = ["9L38"];

	// Crow Morty
	this.modData("Learnsets", "crowmorty").learnset.machinewash = ["9L1"];
	this.modData("Learnsets", "crowmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "crowmorty").learnset.swing = ["9L4"];
	this.modData("Learnsets", "crowmorty").learnset.mindread = ["9L8"];
	this.modData("Learnsets", "crowmorty").learnset.perchandpoop = ["9L13"];
	this.modData("Learnsets", "crowmorty").learnset.noxiousfumes = ["9L18"];
	this.modData("Learnsets", "crowmorty").learnset.scrunch = ["9L22"];
	this.modData("Learnsets", "crowmorty").learnset.grossout = ["9L25"];
	this.modData("Learnsets", "crowmorty").learnset.apexgenius = ["9L28"];
	this.modData("Learnsets", "crowmorty").learnset.trainingcomplete = ["9L31"];

	// Jetpack Morty
	this.modData("Learnsets", "jetpackmorty").learnset.flail = ["9L1"];
	this.modData("Learnsets", "jetpackmorty").learnset.breakin = ["9L1"];
	this.modData("Learnsets", "jetpackmorty").learnset.mope = ["9L7"];
	this.modData("Learnsets", "jetpackmorty").learnset.enrage = ["9L13"];
	this.modData("Learnsets", "jetpackmorty").learnset.jab = ["9L17"];
	this.modData("Learnsets", "jetpackmorty").learnset.negativeenergy = ["9L22"];
	this.modData("Learnsets", "jetpackmorty").learnset.charging = ["9L27"];
	this.modData("Learnsets", "jetpackmorty").learnset.mouthoff = ["9L32"];
	this.modData("Learnsets", "jetpackmorty").learnset.portalspillage = ["9L35"];
	this.modData("Learnsets", "jetpackmorty").learnset.lickthis = ["9L39"];

	// Forty Morty
	this.modData("Learnsets", "fortymorty").learnset.comb = ["9L1"];
	this.modData("Learnsets", "fortymorty").learnset.belch = ["9L1"];
	this.modData("Learnsets", "fortymorty").learnset.mope = ["9L4"];
	this.modData("Learnsets", "fortymorty").learnset.protect = ["9L7"];
	this.modData("Learnsets", "fortymorty").learnset.shave = ["9L11"];
	this.modData("Learnsets", "fortymorty").learnset.sicken = ["9L16"];
	this.modData("Learnsets", "fortymorty").learnset.soulsearch = ["9L20"];
	this.modData("Learnsets", "fortymorty").learnset.bloodpressure = ["9L24"];
	this.modData("Learnsets", "fortymorty").learnset.bonebreaker = ["9L28"];
	this.modData("Learnsets", "fortymorty").learnset.timegoby = ["9L36"];

	// Evil Morty
	this.modData("Learnsets", "evilmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "evilmorty").learnset.distract = ["9L1"];
	this.modData("Learnsets", "evilmorty").learnset.erase = ["9L6"];
	this.modData("Learnsets", "evilmorty").learnset.espionage = ["9L10"];
	this.modData("Learnsets", "evilmorty").learnset.ascend = ["9L15"];
	this.modData("Learnsets", "evilmorty").learnset.negativeenergy = ["9L19"];
	this.modData("Learnsets", "evilmorty").learnset.huntdown = ["9L24"];
	this.modData("Learnsets", "evilmorty").learnset.infiltrate = ["9L28"];
	this.modData("Learnsets", "evilmorty").learnset.finitecurve = ["9L33"];
	this.modData("Learnsets", "evilmorty").learnset.humiliate = ["9L37"];

	// Starfetus Morty
	this.modData("Learnsets", "starfetusmorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "starfetusmorty").learnset.distract = ["9L1"];
	this.modData("Learnsets", "starfetusmorty").learnset.plasmaburst = ["9L5"];
	this.modData("Learnsets", "starfetusmorty").learnset.dribble = ["9L9"];
	this.modData("Learnsets", "starfetusmorty").learnset.snotblast = ["9L15"];
	this.modData("Learnsets", "starfetusmorty").learnset.motherofmercy = ["9L20"];
	this.modData("Learnsets", "starfetusmorty").learnset.legsweep = ["9L26"];
	this.modData("Learnsets", "starfetusmorty").learnset.stargaze = ["9L31"];
	this.modData("Learnsets", "starfetusmorty").learnset.animestrike = ["9L35"];
	this.modData("Learnsets", "starfetusmorty").learnset.clingy = ["9L40"];

	// Dapper Morty
	this.modData("Learnsets", "dappermorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "dappermorty").learnset.denial = ["9L1"];
	this.modData("Learnsets", "dappermorty").learnset.erase = ["9L7"];
	this.modData("Learnsets", "dappermorty").learnset.soulsearch = ["9L12"];
	this.modData("Learnsets", "dappermorty").learnset.negativespace = ["9L17"];
	this.modData("Learnsets", "dappermorty").learnset.repress = ["9L22"];
	this.modData("Learnsets", "dappermorty").learnset.piercingstare = ["9L26"];
	this.modData("Learnsets", "dappermorty").learnset.outpour = ["9L32"];
	this.modData("Learnsets", "dappermorty").learnset.existentialdread = ["9L40"];
	this.modData("Learnsets", "dappermorty").learnset.butisitart = ["9L45"];

	// Preppy Morty
	this.modData("Learnsets", "preppymorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "preppymorty").learnset.denial = ["9L1"];
	this.modData("Learnsets", "preppymorty").learnset.erase = ["9L7"];
	this.modData("Learnsets", "preppymorty").learnset.soulsearch = ["9L12"];
	this.modData("Learnsets", "preppymorty").learnset.negativespace = ["9L17"];
	this.modData("Learnsets", "preppymorty").learnset.repress = ["9L22"];
	this.modData("Learnsets", "preppymorty").learnset.piercingstare = ["9L26"];
	this.modData("Learnsets", "preppymorty").learnset.outpour = ["9L32"];
	this.modData("Learnsets", "preppymorty").learnset.existentialdread = ["9L40"];
	this.modData("Learnsets", "preppymorty").learnset.butisitart = ["9L45"];
	this.modData("Learnsets", "preppymorty").learnset.abstractedform = ["9L50"];

	// Boy Band Morty
	this.modData("Learnsets", "boybandmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "boybandmorty").learnset.combustion = ["9L2"];
	this.modData("Learnsets", "boybandmorty").learnset.suitandboot = ["9L6"];
	this.modData("Learnsets", "boybandmorty").learnset.hitthebooks = ["9L12"];
	this.modData("Learnsets", "boybandmorty").learnset.theoldbostonwallop = ["9L18"];
	this.modData("Learnsets", "boybandmorty").learnset.danceoff = ["9L22"];
	this.modData("Learnsets", "boybandmorty").learnset.headbutt = ["9L26"];
	this.modData("Learnsets", "boybandmorty").learnset.tallyho = ["9L31"];

	// Ruby Morty
	this.modData("Learnsets", "rubymorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "rubymorty").learnset.combustion = ["9L2"];
	this.modData("Learnsets", "rubymorty").learnset.suitandboot = ["9L6"];
	this.modData("Learnsets", "rubymorty").learnset.hitthebooks = ["9L12"];
	this.modData("Learnsets", "rubymorty").learnset.theoldbostonwallop = ["9L18"];
	this.modData("Learnsets", "rubymorty").learnset.danceoff = ["9L22"];
	this.modData("Learnsets", "rubymorty").learnset.headbutt = ["9L26"];
	this.modData("Learnsets", "rubymorty").learnset.tallyho = ["9L31"];
	this.modData("Learnsets", "rubymorty").learnset.highereducation = ["9L34"];

	// Sapphire Morty
	this.modData("Learnsets", "sapphiremorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "sapphiremorty").learnset.combustion = ["9L2"];
	this.modData("Learnsets", "sapphiremorty").learnset.suitandboot = ["9L6"];
	this.modData("Learnsets", "sapphiremorty").learnset.hitthebooks = ["9L12"];
	this.modData("Learnsets", "sapphiremorty").learnset.theoldbostonwallop = ["9L18"];
	this.modData("Learnsets", "sapphiremorty").learnset.danceoff = ["9L22"];
	this.modData("Learnsets", "sapphiremorty").learnset.headbutt = ["9L26"];
	this.modData("Learnsets", "sapphiremorty").learnset.tallyho = ["9L31"];
	this.modData("Learnsets", "sapphiremorty").learnset.highereducation = ["9L34"];
	this.modData("Learnsets", "sapphiremorty").learnset.takethat = ["9L37"];

	// Emerald Morty
	this.modData("Learnsets", "emeraldmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "emeraldmorty").learnset.energydrain = ["9L1"];
	this.modData("Learnsets", "emeraldmorty").learnset.psychicprotection = ["9L6"];
	this.modData("Learnsets", "emeraldmorty").learnset.flair = ["9L10"];
	this.modData("Learnsets", "emeraldmorty").learnset.fossilise = ["9L15"];
	this.modData("Learnsets", "emeraldmorty").learnset.extremepressure = ["9L19"];
	this.modData("Learnsets", "emeraldmorty").learnset.sparkle = ["9L23"];
	this.modData("Learnsets", "emeraldmorty").learnset.beam = ["9L28"];

	// Candelabra Morty
	this.modData("Learnsets", "candelabramorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "candelabramorty").learnset.energydrain = ["9L1"];
	this.modData("Learnsets", "candelabramorty").learnset.psychicprotection = ["9L6"];
	this.modData("Learnsets", "candelabramorty").learnset.flair = ["9L10"];
	this.modData("Learnsets", "candelabramorty").learnset.fossilise = ["9L15"];
	this.modData("Learnsets", "candelabramorty").learnset.extremepressure = ["9L19"];
	this.modData("Learnsets", "candelabramorty").learnset.sparkle = ["9L23"];
	this.modData("Learnsets", "candelabramorty").learnset.beam = ["9L28"];
	this.modData("Learnsets", "candelabramorty").learnset.diamonddazzler = ["9L33"];

	// Lamp Morty
	this.modData("Learnsets", "lampmorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "lampmorty").learnset.energydrain = ["9L1"];
	this.modData("Learnsets", "lampmorty").learnset.psychicprotection = ["9L6"];
	this.modData("Learnsets", "lampmorty").learnset.flair = ["9L10"];
	this.modData("Learnsets", "lampmorty").learnset.fossilise = ["9L15"];
	this.modData("Learnsets", "lampmorty").learnset.extremepressure = ["9L19"];
	this.modData("Learnsets", "lampmorty").learnset.sparkle = ["9L23"];
	this.modData("Learnsets", "lampmorty").learnset.beam = ["9L28"];
	this.modData("Learnsets", "lampmorty").learnset.diamonddazzler = ["9L33"];
	this.modData("Learnsets", "lampmorty").learnset.energybalance = ["9L36"];

	// Decorative Fireplace Morty
	this.modData("Learnsets", "decorativefireplacemorty").learnset.spewfire = ["9L1"];
	this.modData("Learnsets", "decorativefireplacemorty").learnset.absorb = ["9L1"];
	this.modData("Learnsets", "decorativefireplacemorty").learnset.spittinghotcoals = ["9L6"];
	this.modData("Learnsets", "decorativefireplacemorty").learnset.meltedwax = ["9L10"];
	this.modData("Learnsets", "decorativefireplacemorty").learnset.negativeenergy = ["9L15"];
	this.modData("Learnsets", "decorativefireplacemorty").learnset.protect = ["9L19"];
	this.modData("Learnsets", "decorativefireplacemorty").learnset.inferno = ["9L23"];
	this.modData("Learnsets", "decorativefireplacemorty").learnset.fireplay = ["9L28"];

	// Art Critic Morty
	this.modData("Learnsets", "artcriticmorty").learnset.spewfire = ["9L1"];
	this.modData("Learnsets", "artcriticmorty").learnset.absorb = ["9L1"];
	this.modData("Learnsets", "artcriticmorty").learnset.spittinghotcoals = ["9L6"];
	this.modData("Learnsets", "artcriticmorty").learnset.meltedwax = ["9L10"];
	this.modData("Learnsets", "artcriticmorty").learnset.negativeenergy = ["9L15"];
	this.modData("Learnsets", "artcriticmorty").learnset.protect = ["9L19"];
	this.modData("Learnsets", "artcriticmorty").learnset.inferno = ["9L23"];
	this.modData("Learnsets", "artcriticmorty").learnset.fireplay = ["9L28"];
	this.modData("Learnsets", "artcriticmorty").learnset.burningoil = ["9L33"];
	this.modData("Learnsets", "artcriticmorty").learnset.boldanddaring = ["9L36"];

	// Cubism Morty
	this.modData("Learnsets", "cubismmorty").learnset.spewfire = ["9L1"];
	this.modData("Learnsets", "cubismmorty").learnset.absorb = ["9L1"];
	this.modData("Learnsets", "cubismmorty").learnset.spittinghotcoals = ["9L6"];
	this.modData("Learnsets", "cubismmorty").learnset.meltedwax = ["9L10"];
	this.modData("Learnsets", "cubismmorty").learnset.negativeenergy = ["9L15"];
	this.modData("Learnsets", "cubismmorty").learnset.protect = ["9L19"];
	this.modData("Learnsets", "cubismmorty").learnset.inferno = ["9L23"];
	this.modData("Learnsets", "cubismmorty").learnset.fireplay = ["9L28"];
	this.modData("Learnsets", "cubismmorty").learnset.burningoil = ["9L33"];

	// Bloodthirsty Morty
	this.modData("Learnsets", "bloodthirstymorty").learnset.nibble = ["9L1"];
	this.modData("Learnsets", "bloodthirstymorty").learnset.stalk = ["9L1"];
	this.modData("Learnsets", "bloodthirstymorty").learnset.strengthen = ["9L5"];
	this.modData("Learnsets", "bloodthirstymorty").learnset.blindswing = ["9L9"];
	this.modData("Learnsets", "bloodthirstymorty").learnset.protect = ["9L12"];
	this.modData("Learnsets", "bloodthirstymorty").learnset.stayalive = ["9L15"];
	this.modData("Learnsets", "bloodthirstymorty").learnset.hook = ["9L21"];
	this.modData("Learnsets", "bloodthirstymorty").learnset.slurp = ["9L28"];
	this.modData("Learnsets", "bloodthirstymorty").learnset.entertain = ["9L30"];
	this.modData("Learnsets", "bloodthirstymorty").learnset.multiversalrupture = ["9L36"];

	// Helmet Morty
	this.modData("Learnsets", "helmetmorty").learnset.spar = ["9L1"];
	this.modData("Learnsets", "helmetmorty").learnset.attention = ["9L1"];
	this.modData("Learnsets", "helmetmorty").learnset.season2vibes = ["9L10"];
	this.modData("Learnsets", "helmetmorty").learnset.rush = ["9L15"];
	this.modData("Learnsets", "helmetmorty").learnset.staredown = ["9L24"];
	this.modData("Learnsets", "helmetmorty").learnset.hydroblast = ["9L31"];
	this.modData("Learnsets", "helmetmorty").learnset.turnupthebroiler = ["9L35"];
	this.modData("Learnsets", "helmetmorty").learnset.bigexplosion = ["9L46"];

	// Marta Morty
	this.modData("Learnsets", "martamorty").learnset.curl = ["9L1"];
	this.modData("Learnsets", "martamorty").learnset.absorb = ["9L1"];
	this.modData("Learnsets", "martamorty").learnset.piteouswretch = ["9L5"];
	this.modData("Learnsets", "martamorty").learnset.compute = ["9L10"];
	this.modData("Learnsets", "martamorty").learnset.kick = ["9L15"];
	this.modData("Learnsets", "martamorty").learnset.grab = ["9L24"];
	this.modData("Learnsets", "martamorty").learnset.darkvoid = ["9L31"];
	this.modData("Learnsets", "martamorty").learnset.timedilation2 = ["9L35"];
	this.modData("Learnsets", "martamorty").learnset.arcade = ["9L41"];

	// Larry Morty
	this.modData("Learnsets", "larrymorty").learnset.cough = ["9L1"];
	this.modData("Learnsets", "larrymorty").learnset.fortify = ["9L5"];
	this.modData("Learnsets", "larrymorty").learnset.kick = ["9L9"];
	this.modData("Learnsets", "larrymorty").learnset.mope = ["9L15"];
	this.modData("Learnsets", "larrymorty").learnset.focus = ["9L24"];
	this.modData("Learnsets", "larrymorty").learnset.shatter = ["9L31"];
	this.modData("Learnsets", "larrymorty").learnset.imyourfather = ["9L35"];
	this.modData("Learnsets", "larrymorty").learnset.stockcrash = ["9L39"];
	this.modData("Learnsets", "larrymorty").learnset.virtualcurrency = ["9L43"];

	// Nightmare Morty
	this.modData("Learnsets", "nightmaremorty").learnset.mope = ["9L1"];
	this.modData("Learnsets", "nightmaremorty").learnset.absorb = ["9L5"];
	this.modData("Learnsets", "nightmaremorty").learnset.provoke = ["9L9"];
	this.modData("Learnsets", "nightmaremorty").learnset.swing = ["9L15"];
	this.modData("Learnsets", "nightmaremorty").learnset.mortify = ["9L22"];
	this.modData("Learnsets", "nightmaremorty").learnset.despair = ["9L28"];
	this.modData("Learnsets", "nightmaremorty").learnset.rejection = ["9L34"];
	this.modData("Learnsets", "nightmaremorty").learnset.moodkill = ["9L39"];
	this.modData("Learnsets", "nightmaremorty").learnset.traumatize = ["9L44"];

	// Pill Bug Morty
	this.modData("Learnsets", "pillbugmorty").learnset.dig = ["9L1"];
	this.modData("Learnsets", "pillbugmorty").learnset.cower = ["9L1"];
	this.modData("Learnsets", "pillbugmorty").learnset.gooeydischarge = ["9L5"];
	this.modData("Learnsets", "pillbugmorty").learnset.scuttle = ["9L7"];
	this.modData("Learnsets", "pillbugmorty").learnset.harden = ["9L10"];
	this.modData("Learnsets", "pillbugmorty").learnset.jab = ["9L15"];
	this.modData("Learnsets", "pillbugmorty").learnset.creep = ["9L24"];
	this.modData("Learnsets", "pillbugmorty").learnset.openup = ["9L31"];
	this.modData("Learnsets", "pillbugmorty").learnset.rollout = ["9L35"];
	this.modData("Learnsets", "pillbugmorty").learnset.retainstrength = ["9L39"];

	// Holodeck Morty
	this.modData("Learnsets", "holodeckmorty").learnset.repress = ["9L1"];
	this.modData("Learnsets", "holodeckmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "holodeckmorty").learnset.compute = ["9L4"];
	this.modData("Learnsets", "holodeckmorty").learnset.deadstare = ["9L9"];
	this.modData("Learnsets", "holodeckmorty").learnset.negativeenergy = ["9L14"];
	this.modData("Learnsets", "holodeckmorty").learnset.bodytackle = ["9L16"];
	this.modData("Learnsets", "holodeckmorty").learnset.weardown = ["9L21"];
	this.modData("Learnsets", "holodeckmorty").learnset.levelup = ["9L29"];
	this.modData("Learnsets", "holodeckmorty").learnset.funandgames = ["9L36"];
	this.modData("Learnsets", "holodeckmorty").learnset.streetfight = ["9L43"];

	// Washboard Morty
	this.modData("Learnsets", "washboardmorty").learnset.provoke = ["9L1"];
	this.modData("Learnsets", "washboardmorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "washboardmorty").learnset.hug = ["9L7"];
	this.modData("Learnsets", "washboardmorty").learnset.waft = ["9L12"];
	this.modData("Learnsets", "washboardmorty").learnset.ripped = ["9L15"];
	this.modData("Learnsets", "washboardmorty").learnset.swing = ["9L21"];
	this.modData("Learnsets", "washboardmorty").learnset.surprisinglybuff = ["9L24"];
	this.modData("Learnsets", "washboardmorty").learnset.checkoutthispodcast = ["9L31"];
	this.modData("Learnsets", "washboardmorty").learnset.energydrain = ["9L35"];
	this.modData("Learnsets", "washboardmorty").learnset.defend = ["9L39"];

	// Night Person Morty
	this.modData("Learnsets", "nightpersonmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "nightpersonmorty").learnset.relax = ["9L4"];
	this.modData("Learnsets", "nightpersonmorty").learnset.nap = ["9L8"];
	this.modData("Learnsets", "nightpersonmorty").learnset.sleepparalysis = ["9L13"];
	this.modData("Learnsets", "nightpersonmorty").learnset.notincharge = ["9L19"];
	this.modData("Learnsets", "nightpersonmorty").learnset.hypnotize = ["9L23"];
	this.modData("Learnsets", "nightpersonmorty").learnset.focus = ["9L34"];
	this.modData("Learnsets", "nightpersonmorty").learnset.slobber = ["9L37"];

	// Operation Morty
	this.modData("Learnsets", "operationmorty").learnset.deadstare = ["9L1"];
	this.modData("Learnsets", "operationmorty").learnset.preach = ["9L1"];
	this.modData("Learnsets", "operationmorty").learnset.blindswing = ["9L4"];
	this.modData("Learnsets", "operationmorty").learnset.espionage = ["9L12"];
	this.modData("Learnsets", "operationmorty").learnset.clarity = ["9L17"];
	this.modData("Learnsets", "operationmorty").learnset.heymom = ["9L19"];
	this.modData("Learnsets", "operationmorty").learnset.headshot = ["9L24"];
	this.modData("Learnsets", "operationmorty").learnset.covertoperation = ["9L32"];
	this.modData("Learnsets", "operationmorty").learnset.headache = ["9L37"];

	// Businesswoman Morty
	this.modData("Learnsets", "businesswomanmorty").learnset.condition = ["9L1"];
	this.modData("Learnsets", "businesswomanmorty").learnset.distract = ["9L1"];
	this.modData("Learnsets", "businesswomanmorty").learnset.deadstare = ["9L4"];
	this.modData("Learnsets", "businesswomanmorty").learnset.exfoliate = ["9L12"];
	this.modData("Learnsets", "businesswomanmorty").learnset.shatter = ["9L17"];
	this.modData("Learnsets", "businesswomanmorty").learnset.snub = ["9L21"];
	this.modData("Learnsets", "businesswomanmorty").learnset.negativeenergy = ["9L24"];
	this.modData("Learnsets", "businesswomanmorty").learnset.orderup = ["9L27"];
	this.modData("Learnsets", "businesswomanmorty").learnset.focus = ["9L31"];
	this.modData("Learnsets", "businesswomanmorty").learnset.controldestiny = ["9L36"];

	// Triceratops Morty
	this.modData("Learnsets", "triceratopsmorty").learnset.outburst = ["9L1"];
	this.modData("Learnsets", "triceratopsmorty").learnset.relax = ["9L4"];
	this.modData("Learnsets", "triceratopsmorty").learnset.cellsplitter = ["9L8"];
	this.modData("Learnsets", "triceratopsmorty").learnset.strengthen = ["9L13"];
	this.modData("Learnsets", "triceratopsmorty").learnset.deathstare = ["9L17"];
	this.modData("Learnsets", "triceratopsmorty").learnset.negativeenergy = ["9L19"];
	this.modData("Learnsets", "triceratopsmorty").learnset.spear = ["9L24"];
	this.modData("Learnsets", "triceratopsmorty").learnset.defend = ["9L29"];
	this.modData("Learnsets", "triceratopsmorty").learnset.dimensionjump = ["9L37"];
	this.modData("Learnsets", "triceratopsmorty").learnset.threehorns = ["9L41"];

	// Tyrant Lizard Morty
	this.modData("Learnsets", "tyrantlizardmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "tyrantlizardmorty").learnset.stalk = ["9L2"];
	this.modData("Learnsets", "tyrantlizardmorty").learnset.cut = ["9L6"];
	this.modData("Learnsets", "tyrantlizardmorty").learnset.examine = ["9L11"];
	this.modData("Learnsets", "tyrantlizardmorty").learnset.fossilise = ["9L16"];
	this.modData("Learnsets", "tyrantlizardmorty").learnset.newreligion = ["9L22"];
	this.modData("Learnsets", "tyrantlizardmorty").learnset.prey = ["9L28"];
	this.modData("Learnsets", "tyrantlizardmorty").learnset.claw = ["9L33"];
	this.modData("Learnsets", "tyrantlizardmorty").learnset.asteroidimpact = ["9L43"];

	// Bacterium Morty
	this.modData("Learnsets", "bacteriummorty").learnset.curl = ["9L1"];
	this.modData("Learnsets", "bacteriummorty").learnset.blink = ["9L1"];
	this.modData("Learnsets", "bacteriummorty").learnset.celldivision = ["9L6"];
	this.modData("Learnsets", "bacteriummorty").learnset.bite = ["9L10"];
	this.modData("Learnsets", "bacteriummorty").learnset.mutate = ["9L15"];
	this.modData("Learnsets", "bacteriummorty").learnset.infection = ["9L19"];
	this.modData("Learnsets", "bacteriummorty").learnset.prey = ["9L24"];
	this.modData("Learnsets", "bacteriummorty").learnset.snooze = ["9L29"];

	// Land Fish Morty
	this.modData("Learnsets", "landfishmorty").learnset.curl = ["9L1"];
	this.modData("Learnsets", "landfishmorty").learnset.blink = ["9L1"];
	this.modData("Learnsets", "landfishmorty").learnset.celldivision = ["9L6"];
	this.modData("Learnsets", "landfishmorty").learnset.bite = ["9L10"];
	this.modData("Learnsets", "landfishmorty").learnset.mutate = ["9L15"];
	this.modData("Learnsets", "landfishmorty").learnset.infection = ["9L19"];
	this.modData("Learnsets", "landfishmorty").learnset.prey = ["9L24"];
	this.modData("Learnsets", "landfishmorty").learnset.snooze = ["9L29"];
	this.modData("Learnsets", "landfishmorty").learnset.deepbreath = ["9L34"];

	// Primate Morty
	this.modData("Learnsets", "primatemorty").learnset.curl = ["9L1"];
	this.modData("Learnsets", "primatemorty").learnset.blink = ["9L1"];
	this.modData("Learnsets", "primatemorty").learnset.celldivision = ["9L6"];
	this.modData("Learnsets", "primatemorty").learnset.bite = ["9L10"];
	this.modData("Learnsets", "primatemorty").learnset.mutate = ["9L15"];
	this.modData("Learnsets", "primatemorty").learnset.infection = ["9L19"];
	this.modData("Learnsets", "primatemorty").learnset.prey = ["9L24"];
	this.modData("Learnsets", "primatemorty").learnset.snooze = ["9L29"];
	this.modData("Learnsets", "primatemorty").learnset.deepbreath = ["9L34"];
	this.modData("Learnsets", "primatemorty").learnset.flingmuck = ["9L40"];

	// Hiker Morty
	this.modData("Learnsets", "hikermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "hikermorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "hikermorty").learnset.bugrepellent = ["9L6"];
	this.modData("Learnsets", "hikermorty").learnset.weardown = ["9L12"];
	this.modData("Learnsets", "hikermorty").learnset.spawncamp = ["9L18"];
	this.modData("Learnsets", "hikermorty").learnset.gatherbythefire = ["9L23"];
	this.modData("Learnsets", "hikermorty").learnset.lighttheway = ["9L27"];
	this.modData("Learnsets", "hikermorty").learnset.stargaze = ["9L31"];

	// Backpacker Morty
	this.modData("Learnsets", "backpackermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "backpackermorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "backpackermorty").learnset.bugrepellent = ["9L6"];
	this.modData("Learnsets", "backpackermorty").learnset.weardown = ["9L12"];
	this.modData("Learnsets", "backpackermorty").learnset.spawncamp = ["9L18"];
	this.modData("Learnsets", "backpackermorty").learnset.gatherbythefire = ["9L23"];
	this.modData("Learnsets", "backpackermorty").learnset.lighttheway = ["9L27"];
	this.modData("Learnsets", "backpackermorty").learnset.stargaze = ["9L31"];
	this.modData("Learnsets", "backpackermorty").learnset.setuptent = ["9L40"];

	// Explorer Morty
	this.modData("Learnsets", "explorermorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "explorermorty").learnset.sneer = ["9L1"];
	this.modData("Learnsets", "explorermorty").learnset.bugrepellent = ["9L6"];
	this.modData("Learnsets", "explorermorty").learnset.weardown = ["9L12"];
	this.modData("Learnsets", "explorermorty").learnset.spawncamp = ["9L18"];
	this.modData("Learnsets", "explorermorty").learnset.gatherbythefire = ["9L23"];
	this.modData("Learnsets", "explorermorty").learnset.lighttheway = ["9L27"];
	this.modData("Learnsets", "explorermorty").learnset.stargaze = ["9L31"];
	this.modData("Learnsets", "explorermorty").learnset.setuptent = ["9L40"];
	this.modData("Learnsets", "explorermorty").learnset.naturalremedy = ["9L47"];

	// Story Lord Morty
	this.modData("Learnsets", "storylordmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "storylordmorty").learnset.examine = ["9L3"];
	this.modData("Learnsets", "storylordmorty").learnset.lifestory = ["9L6"];
	this.modData("Learnsets", "storylordmorty").learnset.reminisce = ["9L12"];
	this.modData("Learnsets", "storylordmorty").learnset.meta = ["9L26"];
	this.modData("Learnsets", "storylordmorty").learnset.staredown = ["9L30"];
	this.modData("Learnsets", "storylordmorty").learnset.energydrain = ["9L32"];
	this.modData("Learnsets", "storylordmorty").learnset.thetwist = ["9L39"];
	this.modData("Learnsets", "storylordmorty").learnset.surprisinglybuff = ["9L43"];

	// Jesus Christ Morty
	this.modData("Learnsets", "jesuschristmorty").learnset.curl = ["9L1"];
	this.modData("Learnsets", "jesuschristmorty").learnset.moisten = ["9L4"];
	this.modData("Learnsets", "jesuschristmorty").learnset.haunt = ["9L9"];
	this.modData("Learnsets", "jesuschristmorty").learnset.soulsearch = ["9L15"];
	this.modData("Learnsets", "jesuschristmorty").learnset.sixsixsix = ["9L21"];
	this.modData("Learnsets", "jesuschristmorty").learnset.thecreator = ["9L24"];
	this.modData("Learnsets", "jesuschristmorty").learnset.pray = ["9L29"];
	this.modData("Learnsets", "jesuschristmorty").learnset.killedwithcoffee = ["9L33"];
	this.modData("Learnsets", "jesuschristmorty").learnset.rollingstone = ["9L37"];
	this.modData("Learnsets", "jesuschristmorty").learnset.hibernate = ["9L42"];

	// Pissmaster Morty
	this.modData("Learnsets", "pissmastermorty").learnset.cry = ["9L1"];
	this.modData("Learnsets", "pissmastermorty").learnset.machinewash = ["9L1"];
	this.modData("Learnsets", "pissmastermorty").learnset.repress = ["9L5"];
	this.modData("Learnsets", "pissmastermorty").learnset.thirstforjustice = ["9L9"];
	this.modData("Learnsets", "pissmastermorty").learnset.sparkle = ["9L16"];
	this.modData("Learnsets", "pissmastermorty").learnset.juice = ["9L21"];
	this.modData("Learnsets", "pissmastermorty").learnset.splash = ["9L26"];
	this.modData("Learnsets", "pissmastermorty").learnset.outpour = ["9L29"];
	this.modData("Learnsets", "pissmastermorty").learnset.goldenshower = ["9L35"];
	this.modData("Learnsets", "pissmastermorty").learnset.hydroblast = ["9L41"];

	// Cookie Magneto Morty
	this.modData("Learnsets", "cookiemagnetomorty").learnset.curl = ["9L1"];
	this.modData("Learnsets", "cookiemagnetomorty").learnset.examine = ["9L1"];
	this.modData("Learnsets", "cookiemagnetomorty").learnset.gforce = ["9L5"];
	this.modData("Learnsets", "cookiemagnetomorty").learnset.engulf = ["9L10"];
	this.modData("Learnsets", "cookiemagnetomorty").learnset.flutter = ["9L19"];
	this.modData("Learnsets", "cookiemagnetomorty").learnset.salivate = ["9L23"];
	this.modData("Learnsets", "cookiemagnetomorty").learnset.slash = ["9L28"];
	this.modData("Learnsets", "cookiemagnetomorty").learnset.troll = ["9L31"];
	this.modData("Learnsets", "cookiemagnetomorty").learnset.bloodpressure = ["9L34"];
	this.modData("Learnsets", "cookiemagnetomorty").learnset.cookiecontrol = ["9L39"];

	// King of the Sun Morty
	this.modData("Learnsets", "kingofthesunmorty").learnset.suitandboot = ["9L1"];
	this.modData("Learnsets", "kingofthesunmorty").learnset.relax = ["9L4"];
	this.modData("Learnsets", "kingofthesunmorty").learnset.chastise = ["9L9"];
	this.modData("Learnsets", "kingofthesunmorty").learnset.pillage = ["9L15"];
	this.modData("Learnsets", "kingofthesunmorty").learnset.stargaze = ["9L17"];
	this.modData("Learnsets", "kingofthesunmorty").learnset.criticize = ["9L22"];
	this.modData("Learnsets", "kingofthesunmorty").learnset.headbutt = ["9L26"];
	this.modData("Learnsets", "kingofthesunmorty").learnset.sceptresmash = ["9L31"];
	this.modData("Learnsets", "kingofthesunmorty").learnset.brotherhood = ["9L35"];
	this.modData("Learnsets", "kingofthesunmorty").learnset.stupidsun = ["9L39"];

	// Mortanial Morty
	this.modData("Learnsets", "mortanialmorty").learnset.reminisce = ["9L1"];
	this.modData("Learnsets", "mortanialmorty").learnset.relax = ["9L4"];
	this.modData("Learnsets", "mortanialmorty").learnset.flair = ["9L9"];
	this.modData("Learnsets", "mortanialmorty").learnset.flowerchild = ["9L13"];
	this.modData("Learnsets", "mortanialmorty").learnset.noxiousfumes = ["9L19"];
	this.modData("Learnsets", "mortanialmorty").learnset.powersword = ["9L25"];
	this.modData("Learnsets", "mortanialmorty").learnset.stargaze = ["9L30"];
	this.modData("Learnsets", "mortanialmorty").learnset.blackholesun = ["9L34"];
	this.modData("Learnsets", "mortanialmorty").learnset.grillseason = ["9L37"];
	this.modData("Learnsets", "mortanialmorty").learnset.knightofthesun = ["9L42"];

	// Old Man Hucksbee Morty
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.cheekpinch = ["9L1"];
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.distract = ["9L6"];
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.drool = ["9L12"];
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.fossilise = ["9L16"];
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.wettongue = ["9L21"];
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.lovebug = ["9L27"];
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.moodkill = ["9L32"];
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.unspokenbond = ["9L34"];
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.butterflyonacorncob = ["9L39"];
	this.modData("Learnsets", "oldmanhucksbeemorty").learnset.fortune500 = ["9L42"];

	// Laser Sword Morty
	this.modData("Learnsets", "laserswordmorty").learnset.melt = ["9L1"];
	this.modData("Learnsets", "laserswordmorty").learnset.fixerupper = ["9L5"];
	this.modData("Learnsets", "laserswordmorty").learnset.gforce = ["9L9"];
	this.modData("Learnsets", "laserswordmorty").learnset.suitandboot = ["9L14"];
	this.modData("Learnsets", "laserswordmorty").learnset.laserstare = ["9L19"];
	this.modData("Learnsets", "laserswordmorty").learnset.forcepush = ["9L24"];
	this.modData("Learnsets", "laserswordmorty").learnset.denial = ["9L29"];
	this.modData("Learnsets", "laserswordmorty").learnset.perfectlyvertical = ["9L35"];

	// Droid Morty
	this.modData("Learnsets", "droidmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "droidmorty").learnset.repress = ["9L4"];
	this.modData("Learnsets", "droidmorty").learnset.redmist = ["9L7"];
	this.modData("Learnsets", "droidmorty").learnset.staredown = ["9L13"];
	this.modData("Learnsets", "droidmorty").learnset.progressreport = ["9L19"];
	this.modData("Learnsets", "droidmorty").learnset.darkness = ["9L23"];
	this.modData("Learnsets", "droidmorty").learnset.beam = ["9L26"];
	this.modData("Learnsets", "droidmorty").learnset.selfpromote = ["9L30"];
	this.modData("Learnsets", "droidmorty").learnset.grab = ["9L32"];
	this.modData("Learnsets", "droidmorty").learnset.quickdraw = ["9L36"];

	// No Dinos Morty
	this.modData("Learnsets", "nodinosmorty").learnset.cough = ["9L1"];
	this.modData("Learnsets", "nodinosmorty").learnset.cry = ["9L4"];
	this.modData("Learnsets", "nodinosmorty").learnset.fetch = ["9L9"];
	this.modData("Learnsets", "nodinosmorty").learnset.nodoff = ["9L15"];
	this.modData("Learnsets", "nodinosmorty").learnset.fanart = ["9L21"];
	this.modData("Learnsets", "nodinosmorty").learnset.squeak = ["9L24"];
	this.modData("Learnsets", "nodinosmorty").learnset.dinnertime = ["9L28"];
	this.modData("Learnsets", "nodinosmorty").learnset.movietime = ["9L33"];
	this.modData("Learnsets", "nodinosmorty").learnset.weirdspacerift = ["9L36"];
	this.modData("Learnsets", "nodinosmorty").learnset.clingy = ["9L40"];

	// Squanchy Morty
	this.modData("Learnsets", "squanchymorty").learnset.itssquanchingtime = ["9L1"];
	this.modData("Learnsets", "squanchymorty").learnset.season2vibes = ["9L1"];
	this.modData("Learnsets", "squanchymorty").learnset.grab = ["9L7"];
	this.modData("Learnsets", "squanchymorty").learnset.jab = ["9L10"];
	this.modData("Learnsets", "squanchymorty").learnset.rehab = ["9L12"];
	this.modData("Learnsets", "squanchymorty").learnset.motherofmercy = ["9L23"];
	this.modData("Learnsets", "squanchymorty").learnset.mutate = ["9L30"];
	this.modData("Learnsets", "squanchymorty").learnset.charging = ["9L35"];
	this.modData("Learnsets", "squanchymorty").learnset.bighandlittlehand = ["9L38"];
	this.modData("Learnsets", "squanchymorty").learnset.suckmysquanch = ["9L45"];

	// Gene Morty
	this.modData("Learnsets", "genemorty").learnset.trip = ["9L1"];
	this.modData("Learnsets", "genemorty").learnset.lighttease = ["9L1"];
	this.modData("Learnsets", "genemorty").learnset.bugrepellent = ["9L5"];
	this.modData("Learnsets", "genemorty").learnset.chastise = ["9L11"];
	this.modData("Learnsets", "genemorty").learnset.snippet = ["9L15"];
	this.modData("Learnsets", "genemorty").learnset.mock = ["9L20"];
	this.modData("Learnsets", "genemorty").learnset.imyourfather = ["9L23"];
	this.modData("Learnsets", "genemorty").learnset.troll = ["9L28"];
	this.modData("Learnsets", "genemorty").learnset.grillseason = ["9L34"];
	this.modData("Learnsets", "genemorty").learnset.grassclipper = ["9L39"];

	// Jerry Rick Morty
	this.modData("Learnsets", "jerryrickmorty").learnset.familytree = ["9L1"];
	this.modData("Learnsets", "jerryrickmorty").learnset.rakesituation = ["9L1"];
	this.modData("Learnsets", "jerryrickmorty").learnset.fortify = ["9L3"];
	this.modData("Learnsets", "jerryrickmorty").learnset.erase = ["9L12"];
	this.modData("Learnsets", "jerryrickmorty").learnset.rickytikkitavi = ["9L15"];
	this.modData("Learnsets", "jerryrickmorty").learnset.impersonate = ["9L22"];
	this.modData("Learnsets", "jerryrickmorty").learnset.thetwist = ["9L25"];
	this.modData("Learnsets", "jerryrickmorty").learnset.mirrorimage = ["9L31"];
	this.modData("Learnsets", "jerryrickmorty").learnset.finitecurve = ["9L38"];
	this.modData("Learnsets", "jerryrickmorty").learnset.newfriend = ["9L42"];

	// Rick Jerry Morty
	this.modData("Learnsets", "rickjerrymorty").learnset.waft = ["9L1"];
	this.modData("Learnsets", "rickjerrymorty").learnset.dribble = ["9L1"];
	this.modData("Learnsets", "rickjerrymorty").learnset.mope = ["9L5"];
	this.modData("Learnsets", "rickjerrymorty").learnset.fullvoicemail = ["9L13"];
	this.modData("Learnsets", "rickjerrymorty").learnset.lifestory = ["9L15"];
	this.modData("Learnsets", "rickjerrymorty").learnset.despair = ["9L20"];
	this.modData("Learnsets", "rickjerrymorty").learnset.aboot = ["9L25"];
	this.modData("Learnsets", "rickjerrymorty").learnset.moodkill = ["9L30"];
	this.modData("Learnsets", "rickjerrymorty").learnset.fortify = ["9L35"];
	this.modData("Learnsets", "rickjerrymorty").learnset.laserblaster = ["9L48"];

	// Mr. Stabby Morty
	this.modData("Learnsets", "mrstabbymorty").learnset.cut = ["9L1"];
	this.modData("Learnsets", "mrstabbymorty").learnset.relax = ["9L1"];
	this.modData("Learnsets", "mrstabbymorty").learnset.clarity = ["9L6"];
	this.modData("Learnsets", "mrstabbymorty").learnset.danceoff = ["9L11"];
	this.modData("Learnsets", "mrstabbymorty").learnset.jab = ["9L14"];
	this.modData("Learnsets", "mrstabbymorty").learnset.hook = ["9L21"];
	this.modData("Learnsets", "mrstabbymorty").learnset.slash = ["9L25"];
	this.modData("Learnsets", "mrstabbymorty").learnset.welcomeback = ["9L32"];
	this.modData("Learnsets", "mrstabbymorty").learnset.collaborate = ["9L35"];
	this.modData("Learnsets", "mrstabbymorty").learnset.fameobsessed = ["9L41"];

	// Unity Morty
	this.modData("Learnsets", "unitymorty").learnset.familytree = ["9L1"];
	this.modData("Learnsets", "unitymorty").learnset.hug = ["9L1"];
	this.modData("Learnsets", "unitymorty").learnset.celldivision = ["9L5"];
	this.modData("Learnsets", "unitymorty").learnset.stayalive = ["9L10"];
	this.modData("Learnsets", "unitymorty").learnset.heymom = ["9L15"];
	this.modData("Learnsets", "unitymorty").learnset.energydrain = ["9L20"];
	this.modData("Learnsets", "unitymorty").learnset.bigdome = ["9L23"];
	this.modData("Learnsets", "unitymorty").learnset.huntdown = ["9L30"];
	this.modData("Learnsets", "unitymorty").learnset.piercingstare = ["9L35"];
	this.modData("Learnsets", "unitymorty").learnset.fullapproval = ["9L41"];

	// Ethical Spaghetti Morty
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.drool = ["9L1"];
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.melt = ["9L1"];
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.skullemoji = ["9L4"];
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.wettongue = ["9L9"];
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.loveyourself = ["9L15"];
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.drowse = ["9L20"];
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.burgervolley = ["9L22"];
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.flavorcombo = ["9L30"];
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.spicymeatball = ["9L33"];
	this.modData("Learnsets", "ethicalspaghettimorty").learnset.cookiecontrol = ["9L39"];

	// Can of Spaghetti Morty
	this.modData("Learnsets", "canofspaghettimorty").learnset.encrust = ["9L1"];
	this.modData("Learnsets", "canofspaghettimorty").learnset.moisten = ["9L1"];
	this.modData("Learnsets", "canofspaghettimorty").learnset.vomit = ["9L3"];
	this.modData("Learnsets", "canofspaghettimorty").learnset.staredown = ["9L9 "];
	this.modData("Learnsets", "canofspaghettimorty").learnset.pricegouge = ["9L14"];
	this.modData("Learnsets", "canofspaghettimorty").learnset.openup = ["9L20"];
	this.modData("Learnsets", "canofspaghettimorty").learnset.grillseason = ["9L22"];
	this.modData("Learnsets", "canofspaghettimorty").learnset.flavorpunch = ["9L30"];
	this.modData("Learnsets", "canofspaghettimorty").learnset.hopeyouredelicious = ["9L35"];
	this.modData("Learnsets", "canofspaghettimorty").learnset.torsosrights = ["9L39"];

	// Hippie Cultist Morty
	this.modData("Learnsets", "hippiecultistmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "hippiecultistmorty").learnset.repress = ["9L1"];
	this.modData("Learnsets", "hippiecultistmorty").learnset.celldivision = ["9L5"];
	this.modData("Learnsets", "hippiecultistmorty").learnset.bigbarf = ["9L10"];
	this.modData("Learnsets", "hippiecultistmorty").learnset.fourarmsmash = ["9L15"];
	this.modData("Learnsets", "hippiecultistmorty").learnset.fortify = ["9L20"];
	this.modData("Learnsets", "hippiecultistmorty").learnset.rush = ["9L25"];
	this.modData("Learnsets", "hippiecultistmorty").learnset.bloodsuck = ["9L30"];
	this.modData("Learnsets", "hippiecultistmorty").learnset.unspokenbond = ["9L35"];
	this.modData("Learnsets", "hippiecultistmorty").learnset.sweetrelease = ["9L40"];

	// Original Grandson Morty
	this.modData("Learnsets", "originalgrandsonmorty").learnset.distract = ["9L1"];
	this.modData("Learnsets", "originalgrandsonmorty").learnset.hundredyearsforever = ["9L1"];
	this.modData("Learnsets", "originalgrandsonmorty").learnset.deadstare = ["9L3"];
	this.modData("Learnsets", "originalgrandsonmorty").learnset.espionage = ["9L10"];
	this.modData("Learnsets", "originalgrandsonmorty").learnset.stayalive = ["9L15"];
	this.modData("Learnsets", "originalgrandsonmorty").learnset.goldenportal = ["9L21"];
	this.modData("Learnsets", "originalgrandsonmorty").learnset.huntdown = ["9L26"];
	this.modData("Learnsets", "originalgrandsonmorty").learnset.thetwist = ["9L30"];
	this.modData("Learnsets", "originalgrandsonmorty").learnset.infiltrate = ["9L36"];
	this.modData("Learnsets", "originalgrandsonmorty").learnset.finitecurve = ["9L42"];

	// Uncle Slow Morty
	this.modData("Learnsets", "uncleslowmorty").learnset.neutralise = ["9L1"];
	this.modData("Learnsets", "uncleslowmorty").learnset.nap = ["9L1"];
	this.modData("Learnsets", "uncleslowmorty").learnset.waft = ["9L5"];
	this.modData("Learnsets", "uncleslowmorty").learnset.gforce = ["9L10"];
	this.modData("Learnsets", "uncleslowmorty").learnset.nodoff = ["9L15"];
	this.modData("Learnsets", "uncleslowmorty").learnset.timewaitsfornoone = ["9L20"];
	this.modData("Learnsets", "uncleslowmorty").learnset.timedilation = ["9L25"];
	this.modData("Learnsets", "uncleslowmorty").learnset.weirdspacerift = ["9L35"];
	this.modData("Learnsets", "uncleslowmorty").learnset.slowmobious = ["9L40"];
	this.modData("Learnsets", "uncleslowmorty").learnset.familykillingtime = ["9L48"];

	// Sailboat Morty
	this.modData("Learnsets", "sailboatmorty").learnset.slam = ["9L1"];
	this.modData("Learnsets", "sailboatmorty").learnset.altitudesickness = ["9L1"];
	this.modData("Learnsets", "sailboatmorty").learnset.knucklepie = ["9L5"];
	this.modData("Learnsets", "sailboatmorty").learnset.oxidize = ["9L10"];
	this.modData("Learnsets", "sailboatmorty").learnset.tallyho = ["9L15"];
	this.modData("Learnsets", "sailboatmorty").learnset.notincharge = ["9L20"];
	this.modData("Learnsets", "sailboatmorty").learnset.extremepressure = ["9L25"];
	this.modData("Learnsets", "sailboatmorty").learnset.turnupthebroiler = ["9L30"];
	this.modData("Learnsets", "sailboatmorty").learnset.sos = ["9L35"];
	this.modData("Learnsets", "sailboatmorty").learnset.hydroblast = ["9L40"];

	// Apeborg Morty
	this.modData("Learnsets", "apeborgmorty").learnset.herocharge = ["9L1"];
	this.modData("Learnsets", "apeborgmorty").learnset.lift = ["9L1"];
	this.modData("Learnsets", "apeborgmorty").learnset.grieve = ["9L4"];
	this.modData("Learnsets", "apeborgmorty").learnset.hug = ["9L9"];
	this.modData("Learnsets", "apeborgmorty").learnset.strengthen = ["9L12"];
	this.modData("Learnsets", "apeborgmorty").learnset.slurp = ["9L20"];
	this.modData("Learnsets", "apeborgmorty").learnset.shieldwall = ["9L26"];
	this.modData("Learnsets", "apeborgmorty").learnset.tombstone = ["9L30"];
	this.modData("Learnsets", "apeborgmorty").learnset.fury = ["9L32"];
	this.modData("Learnsets", "apeborgmorty").learnset.westernbacon = ["9L42"];
	}
}