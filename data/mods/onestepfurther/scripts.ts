export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	init() {
		for (const id in this.dataCache.Pokedex) {
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.agility) {
				this.modData('Learnsets', this.toID(id)).learnset.shiftgear = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.aircutter) {
				this.modData('Learnsets', this.toID(id)).learnset.aeroblast = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.aquajet) {
				this.modData('Learnsets', this.toID(id)).learnset.jetpunch = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.aquatail) {
				this.modData('Learnsets', this.toID(id)).learnset.crabhammer = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.barrage) {
				this.modData('Learnsets', this.toID(id)).learnset.tailslap = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.bulkup) {
				this.modData('Learnsets', this.toID(id)).learnset.coil = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.victorydance = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.calmmind) {
				this.modData('Learnsets', this.toID(id)).learnset.quiverdance = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.takeheart = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.cometpunch) {
				this.modData('Learnsets', this.toID(id)).learnset.tailslap = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.curse) {
				this.modData('Learnsets', this.toID(id)).learnset.bulkup = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.coil = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.victorydance = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.darkpulse) {
				this.modData('Learnsets', this.toID(id)).learnset.fierywrath = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.dazzlinggleam) {
				this.modData('Learnsets', this.toID(id)).learnset.moonblast = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.detect) {
				this.modData('Learnsets', this.toID(id)).learnset.banefulbunker = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.protect = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.spikyshield = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.doubleslap) {
				this.modData('Learnsets', this.toID(id)).learnset.tailslap = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.doubleedge) {
				this.modData('Learnsets', this.toID(id)).learnset.headcharge = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.multiattack = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.dragonclaw) {
				this.modData('Learnsets', this.toID(id)).learnset.dragonhammer = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.dragondance) {
				this.modData('Learnsets', this.toID(id)).learnset.shiftgear = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.victorydance = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.dragonpulse) {
				this.modData('Learnsets', this.toID(id)).learnset.coreenforcer = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.dynamaxcannon = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.eggbomb) {
				this.modData('Learnsets', this.toID(id)).learnset.megapunch = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.falsesurrender) {
				this.modData('Learnsets', this.toID(id)).learnset.kowtowcleave = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.fierydance) {
				this.modData('Learnsets', this.toID(id)).learnset.torchsong = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.fireblast) {
				this.modData('Learnsets', this.toID(id)).learnset.blueflare = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.firepledge) {
				this.modData('Learnsets', this.toID(id)).learnset.torchsong = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.fusionflare = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.lavaplume = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.searingshot = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.flamethrower = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.firepunch) {
				this.modData('Learnsets', this.toID(id)).learnset.blazingtorque = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.flamewheel) {
				this.modData('Learnsets', this.toID(id)).learnset.blazingtorque = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.sizzlyslide = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.flamethrower) {
				this.modData('Learnsets', this.toID(id)).learnset.searingshot = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.fly) {
				this.modData('Learnsets', this.toID(id)).learnset.floatyfall = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.forcepalm) {
				this.modData('Learnsets', this.toID(id)).learnset.combattorque = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.furyattack) {
				this.modData('Learnsets', this.toID(id)).learnset.tailslap = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.furyswipes) {
				this.modData('Learnsets', this.toID(id)).learnset.tailslap = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.grasspledge) {
				this.modData('Learnsets', this.toID(id)).learnset.appleacid = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.highhorsepower) {
				this.modData('Learnsets', this.toID(id)).learnset.earthquake = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.honeclaws) {
				this.modData('Learnsets', this.toID(id)).learnset.coil = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.hornattack) {
				this.modData('Learnsets', this.toID(id)).learnset.hyperdrill = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.multiattack = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.howl) {
				this.modData('Learnsets', this.toID(id)).learnset.bulkup = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.coil = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.shiftgear = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.victorydance = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.hydropump) {
				this.modData('Learnsets', this.toID(id)).learnset.originpulse = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.hypervoice) {
				this.modData('Learnsets', this.toID(id)).learnset.judgment = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.technoblast = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.terastarstorm = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.boomburst = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.lavaplume) {
				this.modData('Learnsets', this.toID(id)).learnset.searingshot = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.leafblade) {
				this.modData('Learnsets', this.toID(id)).learnset.ivycudgel = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.lovelykiss) {
				this.modData('Learnsets', this.toID(id)).learnset.spore = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.megakick) {
				this.modData('Learnsets', this.toID(id)).learnset.hyperdrill = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.multiattack = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.strength = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.nastyplot) {
				this.modData('Learnsets', this.toID(id)).learnset.tailglow = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.phantomforce) {
				this.modData('Learnsets', this.toID(id)).learnset.shadowforce = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.poisonjab) {
				this.modData('Learnsets', this.toID(id)).learnset.direclaw = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.noxioustorque = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.protect) {
				this.modData('Learnsets', this.toID(id)).learnset.banefulbunker = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.spikyshield = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.psychic) {
				this.modData('Learnsets', this.toID(id)).learnset.lusterpurge = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.psyshock) {
				this.modData('Learnsets', this.toID(id)).learnset.psystrike = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.quickattack) {
				this.modData('Learnsets', this.toID(id)).learnset.extremespeed = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.rockpolish) {
				this.modData('Learnsets', this.toID(id)).learnset.shiftgear = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.rocksmash) {
				this.modData('Learnsets', this.toID(id)).learnset.triplearrows = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.seedbomb) {
				this.modData('Learnsets', this.toID(id)).learnset.drumbeating = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.gravapple = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.ivycudgel = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.leafblade = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.petalblizzard = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.selfdestruct) {
				this.modData('Learnsets', this.toID(id)).learnset.explosion = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.slam) {
				this.modData('Learnsets', this.toID(id)).learnset.megakick = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.strength = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.sleeppowder) {
				this.modData('Learnsets', this.toID(id)).learnset.spore = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.sludge) {
				this.modData('Learnsets', this.toID(id)).learnset.malignantchain = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.sludgebomb) {
				this.modData('Learnsets', this.toID(id)).learnset.malignantchain = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.sludgewave) {
				this.modData('Learnsets', this.toID(id)).learnset.malignantchain = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.stomp) {
				this.modData('Learnsets', this.toID(id)).learnset.headbutt = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.strength) {
				this.modData('Learnsets', this.toID(id)).learnset.multiattack = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.surf) {
				this.modData('Learnsets', this.toID(id)).learnset.splishysplash = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.takedown) {
				this.modData('Learnsets', this.toID(id)).learnset.headcharge = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.thief) {
				this.modData('Learnsets', this.toID(id)).learnset.knockoff = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.thundershock) {
				this.modData('Learnsets', this.toID(id)).learnset.buzzybuzz = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.thunderwave) {
				this.modData('Learnsets', this.toID(id)).learnset.glare = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.watergun) {
				this.modData('Learnsets', this.toID(id)).learnset.bouncybubble = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.waterpledge) {
				this.modData('Learnsets', this.toID(id)).learnset.hydrosteam = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.scald = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.snipeshot = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.splishysplash = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.surf = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.wildcharge) {
				this.modData('Learnsets', this.toID(id)).learnset.aurawheel = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.fusionbolt = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.plasmafists = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.wingattack) {
				this.modData('Learnsets', this.toID(id)).learnset.drillpeck = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.xscissor) {
				this.modData('Learnsets', this.toID(id)).learnset.leechlife = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.lunge = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.irondefense) {
				this.modData('Learnsets', this.toID(id)).learnset.cottonguard = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.acidarmor) {
				this.modData('Learnsets', this.toID(id)).learnset.cottonguard = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.shelter) {
				this.modData('Learnsets', this.toID(id)).learnset.cottonguard = ["9M"];
			}
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset.withdraw) {
				this.modData('Learnsets', this.toID(id)).learnset.irondefense = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.acidarmor = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.shelter = ["9M"];
				this.modData('Learnsets', this.toID(id)).learnset.cottonguard = ["9M"];
			}
		}
	},
};
