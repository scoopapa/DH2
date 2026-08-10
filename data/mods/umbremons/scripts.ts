import {toID} from '../../../sim/dex'; // needed for field: {},

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'champions',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Uber', 'OU', 'UUBL', 'UU', 'NFE', '(OU)'],
	},
	gen: 9,
	pokemon: {
		getMoveTargets(move: ActiveMove, target: Pokemon): {targets: Pokemon[], pressureTargets: Pokemon[]} {
			let targets: Pokemon[] = [];

			switch (move.target) {
			case 'all':
			case 'foeSide':
			case 'allySide':
			case 'allyTeam':
				if (!move.target.startsWith('foe')) {
					targets.push(...this.alliesAndSelf());
				}
				if (!move.target.startsWith('ally')) {
					targets.push(...this.foes(true));
				}
				if (targets.length && !targets.includes(target)) {
					this.battle.retargetLastMove(targets[targets.length - 1]);
				}
				break;
			case 'allAdjacent':
				targets.push(...this.adjacentAllies());
				// falls through
			case 'allAdjacentFoes':
				targets.push(...this.adjacentFoes());
				if (targets.length && !targets.includes(target)) {
					this.battle.retargetLastMove(targets[targets.length - 1]);
				}
				break;
			case 'allies':
				targets = this.alliesAndSelf();
				break;
			default:
				const selectedTarget = target;
				if (!target || (target.fainted && !target.isAlly(this)) && this.battle.gameType !== 'freeforall') {
					// If a targeted foe faints, the move is retargeted
					const possibleTarget = this.battle.getRandomTarget(this, move);
					if (!possibleTarget) return {targets: [], pressureTargets: []};
					target = possibleTarget;
				}
				if (this.battle.activePerHalf > 1 && !move.tracksTarget) {
					const isCharging = move.flags['charge'] && !this.volatiles['twoturnmove'] &&
						!(move.id.startsWith('solarb') && ['sunnyday', 'desolateland'].includes(this.effectiveWeather())) &&
						!(move.id === 'electroshot' && ['raindance', 'primordialsea'].includes(this.effectiveWeather())) &&
						!(this.hasAbility('sandclock') && ['sandstorm'].includes(this.effectiveWeather())) &&
						!(this.hasItem('powerherb') && move.id !== 'skydrop');
					if (!isCharging) {
						target = this.battle.priorityEvent('RedirectTarget', this, this, move, target);
					}
				}
				if (move.smartTarget) {
					targets = this.getSmartTargets(target, move);
					target = targets[0];
				} else {
					targets.push(target);
				}
				if (target.fainted && !move.flags['futuremove']) {
					return {targets: [], pressureTargets: []};
				}
				if (selectedTarget !== target) {
					this.battle.retargetLastMove(target);
				}
			}

			// Resolve apparent targets for Pressure.
			let pressureTargets = targets;
			if (move.target === 'foeSide') {
				pressureTargets = [];
			}
			if (move.flags['mustpressure']) {
				pressureTargets = this.foes();
			}

			return {targets, pressureTargets};
		},
		useItem(source?: Pokemon, sourceEffect?: Effect) {
			if ((!this.hp && !this.getItem().isGem && this.getItem().id !== 'wishbone') || !this.isActive) return false;
			if (!this.item || this.itemState.knockedOff) return false;

			if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
			if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
			const item = this.getItem();
			if (this.battle.runEvent('UseItem', this, null, null, item)) {
				switch (item.id) {
				case 'redcard':
					this.battle.add('-enditem', this, item, '[of] ' + source);
					break;
				default:
					if (item.isGem) {
						this.battle.add('-enditem', this, item, '[from] gem');
					} else {
						this.battle.add('-enditem', this, item);
					}
					break;
				}
				if (item.boosts) {
					this.battle.boost(item.boosts, this, source, item);
				}

				this.battle.singleEvent('Use', item, this.itemState, this, source, sourceEffect);

				this.lastItem = this.item;
				this.item = '';
				this.itemState = {id: '', target: this};
				this.usedItemThisTurn = true;
				this.battle.runEvent('AfterUseItem', this, null, null, item);
				return true;
			}
			return false;
		},
	},
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
	field: {
		suppressingTerrain() { // new function for Down-to-Earth
			for (const side of this.battle.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.fainted && !pokemon.ignoringAbility() &&
						pokemon.hasAbility('downtoearth') && !pokemon.abilityState.ending) {
						return true;
					}
				}
			}
			return false;
		},
		isTerrain(terrain: string | string[], target?: Pokemon | Side | Battle) {
			if (this.suppressingTerrain()) return false; // modded for Down-to-Earth
			const ourTerrain = this.effectiveTerrain(target);
			if (!Array.isArray(terrain)) {
				return ourTerrain === toID(terrain);
			}
			return terrain.map(toID).includes(ourTerrain);
		},
	},
	actions: {
		hitStepMoveHitLoop(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) { // Temporary name
			let damage: (number | boolean | undefined)[] = [];
			for (const i of targets.keys()) {
				damage[i] = 0;
			}
			move.totalDamage = 0;
			pokemon.lastDamage = 0;
			let targetHits = move.multihit || 1;
			if (Array.isArray(targetHits)) {
				// yes, it's hardcoded... meh
				if (targetHits[0] === 2 && targetHits[1] === 5) {
					if (this.battle.gen >= 5) {
						// 35-35-15-15 out of 100 for 2-3-4-5 hits
						targetHits = this.battle.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
						if (targetHits < 4 && pokemon.hasItem('loadeddice')) {
							targetHits = 5 - this.battle.random(2);
						}
					} else {
						targetHits = this.battle.sample([2, 2, 2, 3, 3, 3, 4, 5]);
					}
				} else {
					targetHits = this.battle.random(targetHits[0], targetHits[1] + 1);
				}
			}
			if (targetHits === 10 && pokemon.hasItem('loadeddice')) targetHits -= this.battle.random(7);
			targetHits = Math.floor(targetHits);
			let nullDamage = true;
			let moveDamage: (number | boolean | undefined)[] = [];
			// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
			const isSleepUsable = move.sleepUsable || this.dex.moves.get(move.sourceEffect).sleepUsable;

			let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
			let hit: number;
			for (hit = 1; hit <= targetHits; hit++) {
				if (damage.includes(false)) break;
				if (hit > 1 && pokemon.status === 'slp' && (!isSleepUsable || this.battle.gen === 4)) break;
				if (targets.every(target => !target?.hp)) break;
				move.hit = hit;
				if (move.smartTarget && targets.length > 1) {
					targetsCopy = [targets[hit - 1]];
					damage = [damage[hit - 1]];
				} else {
					targetsCopy = targets.slice(0);
				}
				const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
				if (target && typeof move.smartTarget === 'boolean') {
					if (hit > 1) {
						this.battle.addMove('-anim', pokemon, move.name, target);
					} else {
						this.battle.retargetLastMove(target);
					}
				}

				// like this (Triple Kick)
				if (target && move.multiaccuracy && hit > 1) {
					let accuracy = move.accuracy;
					const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
					if (accuracy !== true) {
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							const boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
							if (boost > 0) {
								accuracy *= boostTable[boost];
							} else {
								accuracy /= boostTable[-boost];
							}
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							const boost = this.battle.clampIntRange(boosts['evasion'], -6, 6);
							if (boost > 0) {
								accuracy /= boostTable[boost];
							} else if (boost < 0) {
								accuracy *= boostTable[-boost];
							}
						}
					}
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (!move.alwaysHit) {
						accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
						if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) break;
					}
				}

				const moveData = move;
				if (!moveData.flags) moveData.flags = {};

				let moveDamageThisHit;
				// Modifies targetsCopy (which is why it's a copy)
				[moveDamageThisHit, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);
				// When Dragon Darts targets two different pokemon, targetsCopy is a length 1 array each hit
				// so spreadMoveHit returns a length 1 damage array
				if (move.smartTarget) {
					moveDamage.push(...moveDamageThisHit);
				} else {
					moveDamage = moveDamageThisHit;
				}

				if (!moveDamage.some(val => val !== false)) break;
				nullDamage = false;

				for (const [i, md] of moveDamage.entries()) {
					if (move.smartTarget && i !== hit - 1) continue;
					// Damage from each hit is individually counted for the
					// purposes of Counter, Metal Burst, and Mirror Coat.
					damage[i] = md === true || !md ? 0 : md;
					// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
					move.totalDamage += damage[i] as number;
				}
				if (move.mindBlownRecoil) {
					const recoilMult = (move.id === 'cardiotoxin' && pokemon.hasType('Poison')) ? 1 : 2;
					const hpBeforeRecoil = pokemon.hp;
					this.battle.damage(Math.round(pokemon.maxhp * recoilMult / 2), pokemon, pokemon, this.dex.conditions.get(move.id), true);
					move.mindBlownRecoil = false;
					if (pokemon.hp <= pokemon.maxhp * recoilMult / 2 && hpBeforeRecoil > pokemon.maxhp * recoilMult / 2) {
						this.battle.runEvent('EmergencyExit', pokemon, pokemon);
					}
				}
				this.battle.eachEvent('Update');
				if (!pokemon.hp && targets.length === 1) {
					hit++; // report the correct number of hits for multihit moves
					break;
				}
			}
			// hit is 1 higher than the actual hit count
			if (hit === 1) return damage.fill(false);
			if (nullDamage) damage.fill(false);
			this.battle.faintMessages(false, false, !pokemon.hp);
			if (move.multihit && typeof move.smartTarget !== 'boolean') {
				this.battle.add('-hitcount', targets[0], hit - 1);
			}

			if ((move.recoil || move.id === 'chloroblast') && move.totalDamage) {
				const hpBeforeRecoil = pokemon.hp;
				this.battle.damage(this.calcRecoilDamage(move.totalDamage, move, pokemon), pokemon, pokemon, 'recoil');
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}

			if (move.struggleRecoil) {
				const hpBeforeRecoil = pokemon.hp;
				let recoilDamage;
				if (this.dex.gen >= 5) {
					recoilDamage = this.battle.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
				} else {
					recoilDamage = this.battle.clampIntRange(this.battle.trunc(pokemon.maxhp / 4), 1);
				}
				this.battle.directDamage(recoilDamage, pokemon, pokemon, {id: 'strugglerecoil'} as Condition);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}

			// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
			if (move.smartTarget) {
				targetsCopy = targets.slice(0);
			}

			for (const [i, target] of targetsCopy.entries()) {
				if (target && pokemon !== target) {
					target.gotAttacked(move, moveDamage[i] as number | false | undefined, pokemon);
					if (typeof moveDamage[i] === 'number') {
						target.timesAttacked += move.smartTarget ? 1 : hit - 1;
					}
				}
			}

			if (move.ohko && !targets[0].hp) this.battle.add('-ohko');

			if (!damage.some(val => !!val || val === 0)) return damage;

			this.battle.eachEvent('Update');

			this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);

			if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
				for (const [i, d] of damage.entries()) {
					// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
					// The previous check was for `move.multihit`, but that fails for Dragon Darts
					const curDamage = targets.length === 1 ? move.totalDamage : d;
					if (typeof curDamage === 'number' && targets[i].hp) {
						const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
						if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
							this.battle.runEvent('EmergencyExit', targets[i], pokemon);
						}
					}
				}
			}

			return damage;
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

		const noLearn = ['beldum', 'burmy', 'cascoon', 'caterpie', 'combee', 'cosmoem', 'cosmog', 'ditto', 'kakuna', 'kricketot', 'magikarp', 'metapod', 'pyukumuku', 'scatterbug', 
			  'silcoon', 'spewpa', 'tynamo', 'weedle', 'wobbuffet', 'wurmple', 'wynaut'];
		const universalTM = [];
		for (const id in this.dataCache.Pokedex) {
			if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset && !noLearn.includes(id)) {
				universalTM.push(id);
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
			'feraligatr', 'samurott', 'samurotthisui', 'gyarados', 'sharpedo', 'qwilfish', 'overqwil', 'araquanid', 'clawitzer', 'hippowdon'
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

		// // SLATE 2
		
		// species adjustments
		addMove(['howl', 'trickroom', 'lunarblessing'], 'umbreon');
		addMove(['hypervoice', 'weatherball'], 'ampharos');
		addMove(['bellydrum', 'stompingtantrum', 'overheat', 'encore', 'disable', 'howl', 'finalgambit', 'healpulse', 'stuffcheeks', 'electroball'], 'slurpuff');

		// move adjustments
		addMove('astonish', [
			'absol', 'arbok', 'ariados', 'banette', 'beedrill', 'chandelure', 'chimecho', 'clawitzer', 'cofagrigus', 'decidueye', 'dragapult', 'forretress', 'glalie', 'golurk', 'gourgeist', 'greninja', 'hatterene', 'houndoom', 
			'klefki', 'liepard', 'luxray', 'lycanrocmidnight', 'malamar', 'meowstic', 'meowsticf', 'mimikyu', 'noivern', 'oranguru', 'overqwil', 'qwilfish', 'rotom', 'runerigus', 'scrafty', 'sharpedo', 'spiritomb', 'stunfisk',
			'stunfiskgalar', 'tinkaton', 'typhlosionhisui', 'umbreon', 'watchog', 'zoroark', 'zoroarkhisui'
		]);
		addMove('lasercut', [
			'aegislash', 'alakazam', 'aggron', 'beedrill', 'bastiodon', 'ceruledge', 'chimecho', 'empoleon', 'espeon', 'excadrill', 'forretress', 'gallade', 'gardevoir', 'garganacl', 'glimmora', 'klefki', 'kleavor', 'lucario',
			'malamar', 'manectric', 'mawile', 'meowstic', 'meowsticf', 'metagross', 'rhyperior', 'rotom', 'samurott', 'samurotthisui', 'scizor', 'skarmory', 'starmie', 'stunfisk', 'stunfiskgalar', 'tinkaton', 'goodrahisui',
			'meowscarada'
		]);
		addMove('return', universalTM);
		addMove('prevailingwind', [
			'aerodactyl', 'altaria', 'aromatisse', 'blaziken', 'castform', 'chimecho', 'clefable', 'corviknight', 'decidueye', 'decidueyehisui', 'dragonite', 'drampa', 'emolga', 'empoleon', 'espathra', 'flapple', 'gallade',
			'gliscor', 'hawlucha', 'hydreigon', 'kleavor', 'noivern', 'pidgeot', 'pinsir', 'pelipper', 'quaquaval', 'sandaconda', 'scizor', 'skarmory', 'staraptor', 'talonflame', 'toucannon', 'vivillon', 'volcarona', 'gyarados'
		]);

		// // SLATE 3

		// species adjustments
		addMove(['encore', 'grasspledge', 'partingshot'], 'simisage');
		addMove(['encore', 'firepledge', 'uturn'], 'simisear');
		addMove(['encore', 'waterpledge'], 'simipour');
		addMove('terrainpulse', 'chandelure');
		addMove('fakeout', 'luxray');
		addMove(['flipturn', 'risingvoltage', 'snatch'], 'stunfisk');

		// move adjustments
		addMove('skydrop', ['aerodactyl', 'charizard', 'dragonite', 'hawlucha', 'pelipper', 'skarmory', 'corviknight', 'gliscor', 'pidgeot', 'toucannon', 'talonflame', 'decidueye', 'decidueyehisui', 'gyarados']);
		addMove('thunderclap', ['bellibolt', 'eelektross', 'luxray', 'jolteon', 'castform', 'drampa']);
		addMove('matblock', ['greninja', 'blaziken', 'beedrill', 'arbok', 'conkeldurr', 'palafin', 'medicham', 'malamar', 'toxicroak', 'sceptile']);
		addMove('cardiotoxin', ['victreebel', 'vivillon', 'scolipede', 'ariados', 'slowbrogalar', 'arbok', 'dragalge', 'houndoom', 'umbreon', 'spiritomb', 'beedrill', 'zoroark', 'alcremie']);
		addMove('miststep', ['delphox', 'mimikyu', 'vanilluxe', 'altaria', 'audino']);
		addMove('fistbump', ['annihilape', 'blaziken', 'chesnaught', 'crabominable', 'emboar', 'falinks', 'gallade', 'hawlucha', 'infernape', 'kommoo', 'lucario', 'machamp', 'medicham', 'pangoro', 'passimian', 'scrafty', 'toxicroak']);
		addMove('reflexjolt', ['bellibolt', 'dedenne', 'emolga', 'heliolisk', 'jolteon', 'luxray', 'manectric', 'morpeko', 'pikachu', 'raichu', 'raichualola']);
	},
};
