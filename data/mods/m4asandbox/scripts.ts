export const Scripts: ModdedBattleScriptsData = {
	inherit: 'm4auu', // actually better for the teambuilder
	init() {
		// some slight changes around here to account for Legends: Arceus, which I am meant to be adding to the sandbox as convenient presets of sorts (:
		// first adding new moves to old Pokémon
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
		// these are from Legends: Arceus
		newMoves("pichu", ["babydolleyes", "playrough"]);
		newMoves("pikachu", ["calmmind"]);
		newMoves("vulpixalola", ["energyball"]);
		newMoves("tentacool", ["acidarmor"]);
		newMoves("machop", ["drainpunch", "machpunch"]);
		newMoves("chansey", ["babydolleyes"]);
		newMoves("tangela", ["acidspray", "doublehit"]);
		newMoves("scyther", ["calmmind", "closecombat", "psychocut"]);
		newMoves("eevee", ["calmmind"]);
		newMoves("flareon", ["mysticalfire", "powershift"]);
		newMoves("togepi", ["moonblast", "mysticalfire"]);
		newMoves("umbreon", ["powershift"]);
		newMoves("aipom", ["mudbomb"]);
		newMoves("yanma", ["gust"]);
		newMoves("gligar", ["mudbomb"]);
		newMoves("heracross", ["calmmind", "outrage"]);
		newMoves("teddiursa", ["highhorsepower"]);
		newMoves("swinub", ["babydolleyes"]);
		newMoves("mantine", ["powershift"]);
		newMoves("stantler", ["psyshieldbash"]);
		newMoves("blissey", ["powershift"]);
		newMoves("beautifly", ["airslash"]);
		newMoves("dustox", ["extrasensory"]);
		newMoves("ralts", ["icebeam"]);
		newMoves("gardevoir", ["aurasphere", "recover"]);
		newMoves("nosepass", ["powershift"]);
		newMoves("whiscash", ["airslash"]);
		newMoves("duskull", ["leechlife"]);
		newMoves("spheal", ["babydolleyes"]);
		newMoves("torterra", ["headlongrush", "sleeppowder"]);
		newMoves("infernape", ["ragingfury"]);
		newMoves("piplup", ["babydolleyes", "roost"]);
		newMoves("empoleon", ["steelbeam", "wavecrash"]);
		newMoves("starly", ["gigaimpact"]);
		newMoves("kricketot", ["absorb"]);
		newMoves("shinx", ["playrough"]);
		newMoves("rampardos", ["powershift"]);
		newMoves("shieldon", ["steelbeam"]);
		newMoves("bastiodon", ["powershift"]);
		newMoves("wormadamtrash", ["steelbeam"]);
		newMoves("vespiquen", ["recover"]);
		newMoves("pachirisu", ["playrough"]);
		newMoves("cherubi", ["doubleedge", "drainingkiss", "sleeppowder", "stunspore"]);
		newMoves("shellos", ["hydropump"]);
		newMoves("drifloon", ["extrasensory", "mysticalfire"]);
		newMoves("drifblim", ["powershift"]);
		newMoves("buneary", ["doubleedge", "machpunch"]);
		newMoves("glameow", ["doubleedge", "nastyplot"]);
		newMoves("bronzor", ["hex"]);
		newMoves("bonsly", ["calmmind"]);
		newMoves("happiny", ["babydolleyes", "calmmind", "doubleedge", "drainingkiss", "fairywind", "softboiled"]);
		newMoves("chatot", ["hurricane", "playrough", "powershift"]);
		newMoves("spiritomb", ["extrasensory"]);
		newMoves("munchlax", ["bite", "highhorsepower", "gigaimpact"]);
		newMoves("riolu", ["bulletpunch"]);
		newMoves("lucario", ["machpunch"]);
		newMoves("hippopotas", ["highhorsepower", "mudbomb"]);
		newMoves("croagunk", ["earthpower", "closecombat"]);
		newMoves("carnivine", ["leechlife"]);
		newMoves("finneon", ["roost"]);
		newMoves("leafeon", ["leafage"]);
		newMoves("gliscor", ["spikes"]);
		newMoves("probopass", ["steelbeam"]);
		newMoves("dusknoir", ["powershift"]);
		newMoves("uxie", ["doublehit", "hypnosis", "mysticalpower", "powershift"]);
		newMoves("mesprit", ["doublehit", "recover", "mysticalpower"]);
		newMoves("azelf", ["doublehit", "mysticalpower", "powershift"]);
		newMoves("regigigas", ["powershift"]);
		newMoves("cresselia", ["lunarblessing", "powershift", "recover"]);
		newMoves("phione", ["confusion", "moonblast", "takeheart", "zenheadbutt"]);
		newMoves("manaphy", ["confusion", "moonblast", "takeheart", "zenheadbutt"]);
		newMoves("shaymin", ["leafage", "recover", "sleeppowder"]);
		newMoves("arceus", ["quickattack"]);
		newMoves("petilil", ["babydolleyes", "poisonpowder", "recover"]);
		newMoves("rufflet", ["doubleedge", "quickattack", "twister"]);
		newMoves("tornadus", ["bleakwindstorm", "twister"]);
		newMoves("thundurus", ["spark", "twister", "wildboltstorm"]);
		newMoves("landorus", ["crunch", "sandsearstorm", "twister"]);
		newMoves("sylveon", ["magicalleaf"]);
		newMoves("goomy", ["acidspray", "hydropump", "shelter", "watergun"]);
		newMoves("bergmite", ["crunch", "iceshard"]);
		newMoves("rowlet", ["magicalleaf"]);

		// then adding the new Pokémon in the most efficient way possible
		for (const id in this.dataCache.Pokedex) {
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon || !newMon.copyData) continue; // weeding out Pokémon that aren't new
			let copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];

			if (!newMon.types && copyData.types) newMon.types = copyData.types;
			if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
			if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
			if (!newMon.num && copyData.num) newMon.num = copyData.num;
			if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
			if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
			if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
			if (!newMon.color && copyData.color) newMon.color = copyData.color;
			if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;

			if (newMon.copyMoves) let copyMoves = newMon.copyMoves;
			if (copyMoves) {
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}}; // create a blank learnset entry so we don't need a learnsets file (thank you ink)
				const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = ['8M'];
				}
				if (newMon.movepoolAdditions) {
					for (const move of newMon.movepoolAdditions) {
						this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
					}
				}
			}
		}
	},
};
