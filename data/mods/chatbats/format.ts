import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] ChatBats",
		desc: `A Random Battles Solomod made by the Pet Mods chatroom on Showdown.`,
		mod: 'chatbats',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
		// Dachsbun causes Koraidon to generate on enemy team. Implemented here.
		onBegin() {
			this.add(`raw|<div class='broadcast-green'><b>Need help with all of the new moves, abilities, and adjustments?<br />Then make sure to use the <a href="https://www.smogon.com/forums/threads/chatbats.3760234/" target="_blank">ChatBats thread</a> or use /dt!</b></div>`);
			this.add('-message', `Welcome to ChatBats!`);
			this.add('-message', `ChatBats is a Random Battles format created by the Pet Mods room here on Showdown!`);
			this.add('-message', `If you want to help create new sets, we will host events periodically in the Pet Mods room!`);
			this.add('-message', `Anyone who is there can help create a new set for a random mon, changing moves, abilities, stats, and even custom formes.`);
			this.add('-message', `yes working`);
			for (const side of this.sides) {
				for (const pokemon of side.pokemon) {
					if (pokemon.species.id === 'dachsbun') {
						// Get the opposing side
						const foeSide = side.foe;
						// Filter out Dachsbun from opponent's team
						const foeTeamNoDog = foeSide.pokemon.filter(p => p.species.id !== 'dachsbun');
						// Pick a random foe
						const randomFoe = this.sample(foeTeamNoDog);
						const rawSpecies = this.dex.species.get('koraidon');
						randomFoe.setSpecies(rawSpecies, pokemon);
						randomFoe.baseSpecies = rawSpecies;
						randomFoe.details = randomFoe.getUpdatedDetails();
						randomFoe.setAbility('Orichalcum Pulse', null, true);
						randomFoe.baseAbility = randomFoe.ability;
						if (this.randomChance(1, 2)) {
							const randomFoeItem = (this.randomChance(1, 2) ? 'choicescarf' : 'choiceband');
							randomFoe.item = randomFoeItem;
							randomFoe.itemState = { id: randomFoeItem, target: randomFoe };
							// Define new moves
							const newMoves = ['closecombat', 'flareblitz', 'outrage', 'uturn'];

							// Update move slots
							randomFoe.moveSlots = newMoves.map(move => {
								const moveData = this.dex.moves.get(move);
								return {
									move: moveData.name,
									id: moveData.id,
									pp: moveData.pp,
									maxpp: moveData.pp,
									target: moveData.target,
									disabled: false,
									used: false,
								};
							});
						}
						else {
							const randomFoeItem = 'loadeddice';
							randomFoe.item = randomFoeItem;
							randomFoe.itemState = { id: randomFoeItem, target: randomFoe };
							// Define new moves
							const newMoves = ['collisioncourse', 'flareblitz', 'scaleshot', 'swordsdance'];

							// Update move slots
							randomFoe.moveSlots = newMoves.map(move => {
								const moveData = this.dex.moves.get(move);
								return {
									move: moveData.name,
									id: moveData.id,
									pp: moveData.pp,
									maxpp: moveData.pp,
									target: moveData.target,
									disabled: false,
									used: false,
								};
							});
						}
						// this forces the UI to update move slots visually
						randomFoe.baseMoveSlots = randomFoe.moveSlots.slice();
						randomFoe.teraType = 'fire'
					}
				}
			}
		}
	};