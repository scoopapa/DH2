import { ModdedDex } from "../../../sim/dex";

export function learnsetUpdate(dex: ModdedDex) {
	/*dex.modData('Learnsets', 'golem').learnset.rapidspin = ['3M'];
	dex.modData('Learnsets', 'golem').learnset.curse = ['3M'];
	dex.modData('Learnsets', 'golem').learnset.sludgebomb = ['3M'];
	delete dex.modData('Learnsets', 'golem').learnset.endure;
	delete dex.modData('Learnsets', 'graveler').learnset.endure;
	delete dex.modData('Learnsets', 'geodude').learnset.endure;*/
	delete dex.modData('Learnsets', 'budew').learnset.swordsdance;
}
