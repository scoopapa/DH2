export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
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
						delete this.modData('Learnsets', [thisPoke]).learnset.[moveid];
					}
				}
			}
		}
		this.modData('Learnsets', 'raichu').learnset.highjumpkick = ['7L1'];
		this.modData('Learnsets', 'trubbishmarshadow').learnset.spectralresidue = ['7L1'];
		this.modData('Learnsets', 'beheeyem').learnset.inverseroom = ['7L1'];
		this.modData('Learnsets', 'beheeyem').learnset.magicroom = ['7L1'];
		this.modData('Learnsets', 'beheeyem').learnset.meteorshower = ['7L1'];
		this.modData('Learnsets', 'beheeyem').learnset.pragmastrike = ['7L1'];
		this.modData('Learnsets', 'beheeyem').learnset.psywave = ['7L1'];
		this.modData('Learnsets', 'garbodor').learnset.knockoff = ['7L1'];
		this.modData('Learnsets', 'garbodor').learnset.stealthrock = ['7L1'];
		this.modData('Learnsets', 'miltank').learnset.playrough = ['7L1'];
		this.modData('Learnsets', 'camomander').learnset.breakingswipe = ['7L1'];
		this.modData('Learnsets', 'camomander').learnset.dragonclaw = ['7L1'];
		this.modData('Learnsets', 'camomander').learnset.dragondance = ['7L1'];
		this.modData('Learnsets', 'camomander').learnset.earthquake = ['7L1'];
		this.modData('Learnsets', 'camomander').learnset.flareblitz = ['7L1'];
		this.modData('Learnsets', 'camomander').learnset.outrage = ['7L1'];
		this.modData('Learnsets', 'camomander').learnset.stompingtantrum = ['7L1'];
		this.modData('Learnsets', 'camomander').learnset.stoneedge = ['7L1'];
		this.modData('Learnsets', 'camomander').learnset.superpower = ['7L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.bulkup = ['8L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.flamethrower = ['8L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.powertrip = ['8L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.roost = ['8L1'];
		this.modData('Learnsets', 'copperajahforge').learnset.flareblitz = ['8L1'];
		this.modData('Learnsets', 'copperajahforge').learnset.rapidspin = ['8L1'];
		this.modData('Learnsets', 'copperajahforge').learnset.spikes = ['8L1'];
		this.modData('Learnsets', 'copperajahforge').learnset.stealthrock = ['8L1'];
		this.modData('Learnsets', 'copperajahforge').learnset.willowisp = ['8L1'];
		this.modData('Learnsets', 'claydol').learnset.powergem = ['7L1'];
		this.modData('Learnsets', 'claydol').learnset.recover = ['7L1'];
		delete this.modData('Learnsets', 'claydol').learnset.gigaimpact;
		delete this.modData('Learnsets', 'claydol').learnset.hyperbeam;
		delete this.modData('Learnsets', 'claydol').learnset.toxic;
		this.modData('Learnsets', 'escavalier').learnset.guillotine = ['7L1'];
		this.modData('Learnsets', 'escavalier').learnset.horndrill = ['7L1'];
		this.modData('Learnsets', 'escavalier').learnset.shieldslam = ['7L1'];
		this.modData('Learnsets', 'escavalier').learnset.spikecannon = ['7L1'];
		this.modData('Learnsets', 'escavalier').learnset.stalwartsword = ['7L1'];
		this.modData('Learnsets', 'escavalier').learnset.pluck = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.burningjealousy = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.dazzlinggleam = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.earthquake = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.ember = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.fieryboost = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.fireblast = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.firelash = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.firepunch = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.firespin = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.flamethrower = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.flareblitz = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.incinerate = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.leafblade = ['7L1'];
		this.modData('Learnsets', 'floraflare').learnset.solarblade = ['7L1'];
		this.modData('Learnsets', 'lycanrocdusk').learnset.stormshardslash = ['7L1'];
		this.modData('Learnsets', 'roseradescarfed').learnset.drainingkiss = ['7L1'];
		this.modData('Learnsets', 'roseradescarfed').learnset.moonblast = ['7L1'];
		this.modData('Learnsets', 'roseradescarfed').learnset.quiverdance = ['7L1'];
		this.modData('Learnsets', 'roseradescarfed').learnset.stickyweb = ['7L1'];
		this.modData('Learnsets', 'roseradescarfed').learnset.uturn = ['7L1'];
		this.modData('Learnsets', 'vespiquen').learnset.earthquake = ['7L1'];
		this.modData('Learnsets', 'vespiquen').learnset.stickyweb = ['7L1'];
		this.modData('Learnsets', 'vespiquen').learnset.suckerpunch = ['7L1'];
		this.modData('Learnsets', 'phione').learnset.cleansinglight = ['7L1'];
		this.modData('Learnsets', 'phione').learnset.hydropump = ['7L1'];
		this.modData('Learnsets', 'phione').learnset.moonblast = ['7L1'];
		this.modData('Learnsets', 'phione').learnset.psychic = ['7L1'];
		this.modData('Learnsets', 'slowbro').learnset.healbell = ['7L1'];
		this.modData('Learnsets', 'slowbro').learnset.roar = ['7L1'];
		this.modData('Learnsets', 'slowbro').learnset.willowisp = ['7L1'];
		this.modData('Learnsets', 'appletun').learnset.calmmind = ['7L1'];
		this.modData('Learnsets', 'appletun').learnset.dragontail = ['7L1'];
		this.modData('Learnsets', 'appletun').learnset.earthquake = ['7L1'];
		this.modData('Learnsets', 'appletun').learnset.flamethrower = ['7L1'];
		this.modData('Learnsets', 'appletun').learnset.sludgebomb = ['7L1'];
		this.modData('Learnsets', 'mamoswine').learnset.agility = ['7L1'];
		this.modData('Learnsets', 'mamoswine').learnset.focusblast = ['7L1'];
		delete this.modData('Learnsets', 'mamoswine').learnset.freezedry;
		delete this.modData('Learnsets', 'mamoswine').learnset.iceshard;
		delete this.modData('Learnsets', 'mamoswine').learnset.knockoff;
		this.modData('Learnsets', 'gengar').learnset.agility = ['7L1'];
		this.modData('Learnsets', 'gengar').learnset.bulkup = ['7L1'];
		this.modData('Learnsets', 'gengar').learnset.closecombat = ['7L1'];
		this.modData('Learnsets', 'gengar').learnset.earthquake = ['7L1'];
		this.modData('Learnsets', 'gengar').learnset.fakeout = ['7L1'];
		this.modData('Learnsets', 'gengar').learnset.quickattack = ['7L1'];
		this.modData('Learnsets', 'gengar').learnset.quickattack = ['7L1'];
		this.modData('Learnsets', 'drapion').learnset.coil = ['7L1'];
		this.modData('Learnsets', 'drapion').learnset.firstimpression = ['7L1'];
		this.modData('Learnsets', 'drapion').learnset.gunkshot = ['7L1'];
		this.modData('Learnsets', 'drapion').learnset.playrough = ['7L1'];
		this.modData('Learnsets', 'drapion').learnset.stoneedge = ['7L1'];
		this.modData('Learnsets', 'drapion').learnset.suckerpunch = ['7L1'];
		this.modData('Learnsets', 'drapion').learnset.uturn = ['7L1'];
		this.modData('Learnsets', 'alcremie').learnset.reflect = ['7L1'];
		this.modData('Learnsets', 'alcremie').learnset.moonblast = ['7L1'];
		this.modData('Learnsets', 'alcremie').learnset.willowisp = ['7L1'];
		this.modData('Learnsets', 'alcremie').learnset.wish = ['7L1'];
		this.modData('Learnsets', 'falinks').learnset.bonerush = ['7L1'];
		this.modData('Learnsets', 'falinks').learnset.pinmissile = ['7L1'];
		this.modData('Learnsets', 'falinks').learnset.powertrip = ['7L1'];
		this.modData('Learnsets', 'falinks').learnset.rockblast = ['7L1'];
		this.modData('Learnsets', 'rapidashgalar').learnset.blazekick = ['7L1'];
		this.modData('Learnsets', 'rapidashgalar').learnset.knockoff = ['7L1'];
		this.modData('Learnsets', 'rapidashgalar').learnset.uturn = ['7L1'];
	},
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Altarianite" && pokemon.baseSpecies.name === "Altaria-Unova") {
			return "Altaria-Unova-Mega";
		}
		if (item.megaEvolves !== pokemon.baseSpecies.name || item.megaStone === pokemon.species.name) {
			return null;
		}
		return item.megaStone;
	},
};
