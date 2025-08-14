import { ModdedDex } from "../../../sim/dex";

export function learnsetUpdate(dex: ModdedDex) {
	//Slate 1
	dex.modData('Learnsets', 'golem').learnset.rapidspin = ['3M'];
	dex.modData('Learnsets', 'golem').learnset.curse = ['3M'];
	dex.modData('Learnsets', 'golem').learnset.sludgebomb = ['3M'];
	delete dex.modData('Learnsets', 'golem').learnset.endure;
	delete dex.modData('Learnsets', 'graveler').learnset.endure;
	delete dex.modData('Learnsets', 'geodude').learnset.endure;
	dex.modData('Learnsets', 'aerodactyl').learnset.drillpeck = ['3M'];
	dex.modData('Learnsets', 'aerodactyl').learnset.refresh = ['3M'];
	dex.modData('Learnsets', 'lunatone').learnset.icywind = ['3M'];
	dex.modData('Learnsets', 'lunatone').learnset.blizzard = ['3M'];
	dex.modData('Learnsets', 'lunatone').learnset.hail = ['3M'];
	dex.modData('Learnsets', 'lunatone').learnset.moonlight = ['3M'];
	delete dex.modData('Learnsets', 'lunatone').learnset.hypnosis;
	dex.modData('Learnsets', 'solrock').learnset.curse = ['3M'];
	dex.modData('Learnsets', 'solrock').learnset.destinybond = ['3M'];
	dex.modData('Learnsets', 'solrock').learnset.morningsun = ['3M'];
	delete dex.modData('Learnsets', 'solrock').learnset.hypnosis;
	dex.modData('Learnsets', 'armaldo').learnset.thunderwave = ['3M'];
	dex.modData('Learnsets', 'armaldo').learnset.megahorn = ['3M'];
	dex.modData('Learnsets', 'armaldo').learnset.rapidspin = ['3M'];
	dex.modData('Learnsets', 'kabutops').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'omastar').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'aerodactyl').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'armaldo').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'cradily').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'regirock').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'regice').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'registeel').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'relicanth').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'mew').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'celebi').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'claydol').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'piloswine').learnset.ancientpower = ['3M'];
	dex.modData('Learnsets', 'dunsparce').learnset.ancientpower = ['3M'];
	//Moves Update
	dex.modData('Learnsets', 'sceptile').learnset.frenzyplant = ['3M'];
	dex.modData('Learnsets', 'blaziken').learnset.blastburn = ['3M'];
	dex.modData('Learnsets', 'swampert').learnset.hydrocannon = ['3M'];
}
