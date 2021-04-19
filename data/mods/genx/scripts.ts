export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
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
	},
};
