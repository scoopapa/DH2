export const Scripts: ModdedBattleScriptsData = {
	inherit: 'm4av6',
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
		newMoves("whiscash", ["aerialace"]);
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
		}
	},

	// modifyDamage added for frostbite for Hisuian Zoroark specifically
	// I do not know restraint when I see this Pokémon I'm sorry
	// it's not even mod-related what am I doing

	modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
	) {
		const tr = this.trunc;
		if (!move.type) move.type = '???';
		const type = move.type;

		baseDamage += 2;

		// multi-target modifier (doubles only)
		if (move.spreadHit) {
			const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
			this.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.modify(baseDamage, spreadModifier);
		}

		// weather modifier
		baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.randomizer(baseDamage);

		// STAB
		if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			baseDamage = this.modify(baseDamage, move.stab || 1.5);
		}
		// types
		let typeMod = target.runEffectiveness(move);
		typeMod = this.clampIntRange(typeMod, -6, 6);
		target.getMoveHitData(move).typeMod = typeMod;
		if (typeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);

			for (let i = 0; i < typeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (typeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);

			for (let i = 0; i > typeMod; i--) {
				baseDamage = tr(baseDamage / 2);
			}
		}

		if (isCrit && !suppressMessages) this.add('-crit', target);

		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
			if (this.gen < 6 || move.id !== 'facade') {
				baseDamage = this.modify(baseDamage, 0.5);
			}
		}

		if (pokemon.status === 'frz' && pokemon.status.effectData.frostbite && move.category === 'Special') { // the only changed section
			baseDamage = this.modify(baseDamage, 0.5);
		}

		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.modify(baseDamage, 0.25);
			this.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},

};
