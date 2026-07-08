export const Scripts: ModdedBattleScriptsData = {
	inherit: 'champions',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Uber', 'OU', 'UUBL', 'UU', 'NFE', '(OU)'],
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
		// Hematite note: I added a new function for this so it would be easier to list movepool additions in Data Mod!
		// You can add multiple moves to the same Pokémon and/or add the same move to multiple Pokémon in one line;
		// if you want that, just put ['brackets'] around the list - see the slate 1 examples below!
		const addMove = (movelist, pokemonlist) => {
			if (!movelist || !pokemonlist) return;
			const moves = [];
			const pokemon = [];
			if (Array.isArray(movelist)) for (const move of movelist) if (!moves.includes(move)) moves.push(move);
			if (typeof movelist === 'string') moves.push(movelist);
			if (Array.isArray(pokemonlist)) for (const mon of pokemonlist) if (!pokemon.includes(mon)) pokemon.push(mon);
			if (typeof pokemonlist === 'string') pokemon.push(pokemonlist);

			for (const move of moves) {
				for (const mon of pokemon) {
					this.modData('Learnsets', mon).learnset[move] = ['9M'];
					if (this.dataCache.Pokedex[mon] && this.dataCache.Moves[move]) {
						if (!this.dataCache.Pokedex[mon].movepoolAdditions) this.dataCache.Pokedex[mon].movepoolAdditions = [];
						this.dataCache.Pokedex[mon].movepoolAdditions.push(this.dataCache.Moves[move].name);
					}
				}
			}
		}
		
		// // SLATE 1
		
		// species adjustments
		addMove(['taunt', 'toxicspikes', 'disable', 'encore'], 'meowstic');
		addMove(['earthpower', 'moonblast'], 'meowsticf');
		addMove('fakeout', 'gallade');
		addMove(['fakeout', 'suckerpunch', 'partingshot'], 'krookodile');
		addMove(['mysticalfire', 'psychicnoise', 'tickle'], 'musharna');
		addMove(['bulkup', 'coil', 'bodypress', 'powertrip', 'stringshot'], 'scolipede');
		
		// move adjustments
		addMove('rapidfire', [
			'armarouge', 'blastoise', 'blaziken', 'camerupt', 'clawitzer', 'dragapult', 'drampa', 'flareon', 'houndoom', 'ninetales', 'rhyperior', 'sandaconda', 'scovillain', 'simisear', 'skeledirge', 'slowbrogalar', 'talonflame',
			'toucannon', 'manectric', 'decidueye', 'decidueyehisui', 'chandelure'
		]);
		addMove('sunkenlunge', [
			'feraligatr', 'samurott', 'samurotthisui', 'gyarados', 'sharpedo', 'qwilfish', 'overqwil', 'araquanid', 'clawitzer', 'basculegionf', 'hippowdon'
		]);
		addMove('rockslide', 'glalie');
		addMove('snatch', [
			'weavile', 'banette', 'snorlax', 'liepard', 'reuniclus', 'arbok', 'clefable', 'alakazam', 'gengar', 'umbreon', 'houndoom', 'gardevoir', 'gallade', 'sableye', 'mawile', 'chimecho', 'absol', 'spiritomb', 'froslass',
			'rotom', 'serperior', 'audino', 'scolipede', 'krookodile', 'scrafty', 'cofagrigus', 'zoroark', 'kingambit', 'delphox', 'greninja', 'diggersby', 'talonflame', 'pyroar', 'pangoro', 'meowstic', 'malamar', 'noivern',
			'incineroar', 'toxapex', 'salazzle', 'oranguru', 'mimikyu', 'sneasler', 'qwilfish', 'overqwil', 'wyrdeer', 'runerigus', 'castform', 'corviknight', 'barbaracle', 'sandaconda', 'hatterene', 'grimmsnarl', 'mrrime',
			'falinks', 'morpeko', 'dragapult', 'meowscarada', 'maushold', 'scovillain', 'espathra', 'tinkaton', 'farigiraf', 'gholdengo', 'sinistcha', 'polteageist', 'zoroarkhisui'
		]);
		addMove('starburst', [
			'azumarill', 'clefable', 'hatterene', 'primarina', 'altaria', 'slurpuff', 'tinkaton', 'starmie', 'watchog', 'gardevoir', 'gallade'
		]);
	},
};
