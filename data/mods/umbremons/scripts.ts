export const Scripts: ModdedBattleScriptsData = {
	inherit: 'champions',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Uber', 'OU', 'UUBL', 'UU', 'NFE'],
	},
	gen: 9,
	battle: {
		getTarget(pokemon: Pokemon, move: string | Move, targetLoc: number, originalTarget?: Pokemon) {
			move = this.dex.moves.get(move);

			let tracksTarget = move.tracksTarget;
			// Stalwart sets trackTarget in ModifyMove, but ModifyMove happens after getTarget, so
			// we need to manually check for Stalwart here
			if (pokemon.hasAbility(['stalwart', 'propellertail', 'moldbreaker'])) tracksTarget = true;
			if (tracksTarget && originalTarget && originalTarget.isActive) {
				// smart-tracking move's original target is on the field: target it
				return originalTarget;
			}

			// banning Dragon Darts from directly targeting itself is done in side.ts, but
			// Dragon Darts can target itself if Ally Switch is used afterwards
			if (move.smartTarget) {
				const curTarget = pokemon.getAtLoc(targetLoc);
				return curTarget && !curTarget.fainted ? curTarget : this.getRandomTarget(pokemon, move);
			}

			// Fails if the target is the user and the move can't target its own position
			const selfLoc = pokemon.getLocOf(pokemon);
			if (['adjacentAlly', 'any', 'normal'].includes(move.target) && targetLoc === selfLoc &&
					!pokemon.volatiles['twoturnmove'] && !pokemon.volatiles['iceball'] && !pokemon.volatiles['rollout']) {
				return move.flags['futuremove'] ? pokemon : null;
			}
			if (move.target !== 'randomNormal' && this.validTargetLoc(targetLoc, pokemon, move.target)) {
				const target = pokemon.getAtLoc(targetLoc);
				if (target?.fainted) {
					if (this.gameType === 'freeforall') {
						// Target is a fainted opponent in a free-for-all battle; attack shouldn't retarget
						return target;
					}
					if (target.isAlly(pokemon)) {
						// Target is a fainted ally: attack shouldn't retarget
						return target;
					}
				}
				if (target && !target.fainted) {
					// Target is unfainted: use selected target location
					return target;
				}

				// Chosen target not valid,
				// retarget randomly with getRandomTarget
			}
			return this.getRandomTarget(pokemon, move);
		}
	},
	init() {
		// Slate 1
		this.modData('Learnsets', 'meowstic').learnset.taunt = ['9M'];
		this.modData('Learnsets', 'meowstic').learnset.toxicspikes = ['9M'];
		this.modData('Learnsets', 'meowstic').learnset.disable = ['9M'];
		this.modData('Learnsets', 'meowstic').learnset.encore = ['9M'];

		this.modData('Learnsets', 'meowsticf').learnset.earthpower = ['9M'];
		this.modData('Learnsets', 'meowsticf').learnset.moonblast = ['9M'];

		this.modData('Learnsets', 'gallade').learnset.fakeout = ['9M'];

		this.modData('Learnsets', 'krookodile').learnset.fakeout = ['9M'];
		this.modData('Learnsets', 'krookodile').learnset.suckerpunch = ['9M'];
		this.modData('Learnsets', 'krookodile').learnset.partingshot = ['9M'];

		this.modData('Learnsets', 'musharna').learnset.mysticalfire = ['9M'];
		this.modData('Learnsets', 'musharna').learnset.psychicnoise = ['9M'];
		this.modData('Learnsets', 'musharna').learnset.tickle = ['9M'];

		this.modData('Learnsets', 'scolipede').learnset.bulkup = ['9M'];
		this.modData('Learnsets', 'scolipede').learnset.coil = ['9M'];
		this.modData('Learnsets', 'scolipede').learnset.bodypress = ['9M'];
		this.modData('Learnsets', 'scolipede').learnset.powertrip = ['9M'];
		this.modData('Learnsets', 'scolipede').learnset.stringshot = ['9M'];

		this.modData("Learnsets", "armarouge").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "blastoise").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "blaziken").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "camerupt").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "clawitzer").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "dragapult").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "drampa").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "flareon").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "houndoom").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "rhyperior").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "scovillain").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "simisear").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "skeledirge").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "slowbro").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "talonflame").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "toucannon").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "manectric").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "decidueye").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "decidueyehisui").learnset.rapidfire = ["9L1"];
		this.modData("Learnsets", "chandelure").learnset.rapidfire = ["9L1"];

		this.modData("Learnsets", "feraligatr").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "samurott").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "samurotthisui").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "gyarados").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "sharpedo").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "qwilfish").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "overqwil").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "araquanid").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "clawitzer").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "basculegionf").learnset.sunkenlunge = ["9L1"];
		this.modData("Learnsets", "hippowdon").learnset.sunkenlunge = ["9L1"];

		this.modData("Learnsets", "glalie").learnset.rockslide = ["9L1"];

		this.modData("Learnsets", "weavile").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "banette").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "snorlax").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "liepard").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "reuniclus").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "arbok").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "clefable").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "alakazam").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "gengar").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "umbreon").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "houndoom").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "gardevoir").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "gallade").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "mawile").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "chimecho").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "absol").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "spiritomb").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "rotom").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "serperior").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "audino").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "scolipede").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "krookodile").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "scrafty").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "cofagrigus").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "zoroark").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "kingambit").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "delphox").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "greninja").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "diggersby").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "talonflame").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "pyroar").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "pangoro").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "meowstic").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "noivern").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "incineroar").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "oranguru").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "mimikyu").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "sneasler").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "qwilfish").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "overqwil").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "wyrdeer").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "runerigus").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "castform").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "corviknight").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "barbaracle").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "hatterene").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "grimmsnarl").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "mrrime").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "falinks").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "morpeko").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "dragapult").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "meowscarada").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "maushold").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "scovillain").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "espathra").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "tinkaton").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "farigiraf").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "gholdengo").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "sinistcha").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "polteageist").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "zoroarkhisui").learnset.snatch = ["9L1"];

		this.modData("Learnsets", "azumarill").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "clefable").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "hatterene").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "primarina").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "altaria").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "slurpuff").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "tinkaton").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "starmie").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "watchog").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "gardevoir").learnset.starburst = ["9L1"];
		this.modData("Learnsets", "gallade").learnset.starburst = ["9L1"];
	},
};
