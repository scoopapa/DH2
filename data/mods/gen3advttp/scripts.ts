export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen4',
	gen: 3,
	pokemon: {
		inherit: true,
		getActionSpeed() {
			let speed = this.getStat('spe', false, false);
			if (this.battle.field.getPseudoWeather('trickroom')) {
				speed = -speed;
			}
			if (this.battle.quickClawRoll && this.hasItem('quickclaw')) {
				speed = 65535;
			}
			return speed;
		},
	},
	actions: {
		inherit: true,
		modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
			// RSE divides modifiers into several mathematically important stages
			// The modifiers run earlier than other generations are called with ModifyDamagePhase1 and ModifyDamagePhase2

			if (!move.type) move.type = '???';
			const type = move.type;

			// Burn
			if (pokemon.status === 'brn' && baseDamage && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
				baseDamage = this.battle.modify(baseDamage, 0.5);
			}

			// Other modifiers (Reflect/Light Screen/etc)
			baseDamage = this.battle.runEvent('ModifyDamagePhase1', pokemon, target, move, baseDamage);

			// Double battle multi-hit
			// In Generation 3, the spread move modifier is 0.5x instead of 0.75x. Moves that hit both foes
			// and the user's ally, like Earthquake and Explosion, don't get affected by spread modifiers
			if (move.spreadHit && move.target === 'allAdjacentFoes') {
				const spreadModifier = move.spreadModifier || 0.5;
				this.battle.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.battle.modify(baseDamage, spreadModifier);
			}

			// Weather
			baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

			if (move.category === 'Physical' && !Math.floor(baseDamage)) {
				baseDamage = 1;
			}

			baseDamage += 2;

			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = this.battle.modify(baseDamage, move.critModifier || 2);
			}

			// Mod 2 (Damage is floored after all multipliers are in)
			baseDamage = Math.floor(this.battle.runEvent('ModifyDamagePhase2', pokemon, target, move, baseDamage));

			// STAB
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			if (type !== '???') {
				let stab: number | [number, number] = 1;
				if (move.forceSTAB || pokemon.hasType(type)) {
					stab = 1.5;
				}
				stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, stab);
				baseDamage = this.battle.modify(baseDamage, stab);
			}
			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.battle.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.battle.add('-supereffective', target);

				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.battle.add('-resisted', target);

				for (let i = 0; i > typeMod; i--) {
					baseDamage = Math.floor(baseDamage / 2);
				}
			}

			if (isCrit && !suppressMessages) this.battle.add('-crit', target);

			// Final modifier.
			baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			// this is not a modifier
			baseDamage = this.battle.randomizer(baseDamage);

			if (!Math.floor(baseDamage)) {
				return 1;
			}

			return Math.floor(baseDamage);
		},
		useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove) {
			if (!sourceEffect && this.battle.effect.id) sourceEffect = this.battle.effect;
			if (sourceEffect && sourceEffect.id === 'instruct') sourceEffect = null;

			let move = this.dex.getActiveMove(moveOrMoveName);
			pokemon.lastMoveUsed = move;

			if (this.battle.activeMove) {
				move.priority = this.battle.activeMove.priority;
			}
			const baseTarget = move.target;
			if (target === undefined) target = this.battle.getRandomTarget(pokemon, move);
			if (move.target === 'self' || move.target === 'allies') {
				target = pokemon;
			}
			if (sourceEffect) {
				move.sourceEffect = sourceEffect.id;
				move.ignoreAbility = false;
			}
			let moveResult = false;

			this.battle.setActiveMove(move, pokemon, target);

			this.battle.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Target changed in ModifyMove, so we must adjust it here
				// Adjust before the next event so the correct target is passed to the
				// event
				target = this.battle.getRandomTarget(pokemon, move);
			}
			move = this.battle.runEvent('ModifyMove', pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Adjust again
				target = this.battle.getRandomTarget(pokemon, move);
			}
			if (!move || pokemon.fainted) {
				return false;
			}

			let attrs = '';

			let movename = move.name;
			if (move.id === 'hiddenpower') movename = 'Hidden Power';
			if (sourceEffect) attrs += `|[from]${this.dex.conditions.get(sourceEffect)}`;
			this.battle.addMove('move', pokemon, movename, target + attrs);

			if (!target) {
				this.battle.attrLastMove('[notarget]');
				this.battle.add('-notarget', pokemon);
				return false;
			}

			const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);

			if (!sourceEffect || sourceEffect.id === 'pursuit') {
				let extraPP = 0;
				for (const source of pressureTargets) {
					const ppDrop = this.battle.runEvent('DeductPP', source, pokemon, move);
					if (ppDrop !== true) {
						extraPP += ppDrop || 0;
					}
				}
				if (extraPP > 0) {
					pokemon.deductPP(move, extraPP);
				}
			}

			if (!this.battle.singleEvent('TryMove', move, null, pokemon, target, move) ||
				!this.battle.runEvent('TryMove', pokemon, target, move)) {
				move.mindBlownRecoil = false;
				return false;
			}

			this.battle.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

			if (move.ignoreImmunity === undefined) {
				move.ignoreImmunity = (move.category === 'Status');
			}

			if (move.selfdestruct === 'always') {
				this.battle.faint(pokemon, pokemon, move);
			}

			let damage: number | false | undefined | '' = false;
			if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
				damage = this.tryMoveHit(target, pokemon, move);
				if (damage === this.battle.NOT_FAIL) pokemon.moveThisTurnResult = null;
				if (damage || damage === 0 || damage === undefined) moveResult = true;
			} else if (move.target === 'allAdjacent' || move.target === 'allAdjacentFoes') {
				if (!targets.length) {
					this.battle.attrLastMove('[notarget]');
					this.battle.add('-notarget', pokemon);
					return false;
				}
				if (targets.length > 1) move.spreadHit = true;
				const hitSlots = [];
				for (const source of targets) {
					const hitResult = this.tryMoveHit(source, pokemon, move);
					if (hitResult || hitResult === 0 || hitResult === undefined) {
						moveResult = true;
						hitSlots.push(source.getSlot());
					}
					if (damage) {
						damage += hitResult || 0;
					} else {
						if (damage !== false || hitResult !== this.battle.NOT_FAIL) damage = hitResult;
					}
					if (damage === this.battle.NOT_FAIL) pokemon.moveThisTurnResult = null;
				}
				if (move.spreadHit) this.battle.attrLastMove('[spread] ' + hitSlots.join(','));
			} else {
				target = targets[0];
				let lacksTarget = !target || target.fainted;
				if (!lacksTarget) {
					if (['adjacentFoe', 'adjacentAlly', 'normal', 'randomNormal'].includes(move.target)) {
						lacksTarget = !target.isAdjacent(pokemon);
					}
				}
				if (lacksTarget && !move.flags['futuremove']) {
					this.battle.attrLastMove('[notarget]');
					this.battle.add('-notarget', pokemon);
					return false;
				}
				damage = this.tryMoveHit(target, pokemon, move);
				if (damage === this.battle.NOT_FAIL) pokemon.moveThisTurnResult = null;
				if (damage || damage === 0 || damage === undefined) moveResult = true;
			}
			if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
			if (!pokemon.hp) {
				this.battle.faint(pokemon, pokemon, move);
			}

			if (!moveResult) {
				this.battle.singleEvent('MoveFail', move, null, target, pokemon, move);
				return false;
			}

			if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
				this.battle.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
				this.battle.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
			}
			return true;
		},
		tryMoveHit(target, pokemon, move) {
			this.battle.setActiveMove(move, pokemon, target);
			let naturalImmunity = false;
			let accPass = true;

			let hitResult = this.battle.singleEvent('PrepareHit', move, {}, target, pokemon, move) &&
				this.battle.runEvent('PrepareHit', pokemon, target, move);
			if (!hitResult) {
				if (hitResult === false) {
					this.battle.add('-fail', pokemon);
					this.battle.attrLastMove('[still]');
				}
				return false;
			}

			if (!this.battle.singleEvent('Try', move, null, pokemon, target, move)) {
				return false;
			}

			if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
				if (move.target === 'all') {
					hitResult = this.battle.runEvent('TryHitField', target, pokemon, move);
				} else {
					hitResult = this.battle.runEvent('TryHitSide', target, pokemon, move);
				}
				if (!hitResult) {
					if (hitResult === false) {
						this.battle.add('-fail', pokemon);
						this.battle.attrLastMove('[still]');
					}
					return false;
				}
				return this.moveHit(target, pokemon, move);
			}

			hitResult = this.battle.runEvent('Invulnerability', target, pokemon, move);
			if (hitResult === false) {
				if (!move.spreadHit) this.battle.attrLastMove('[miss]');
				this.battle.add('-miss', pokemon, target);
				return false;
			}

			if (move.ignoreImmunity === undefined) {
				move.ignoreImmunity = (move.category === 'Status');
			}

			if (
				(!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) &&
				!target.runImmunity(move.type)
			) {
				naturalImmunity = true;
			} else {
				hitResult = this.battle.singleEvent('TryImmunity', move, {}, target, pokemon, move);
				if (hitResult === false) {
					naturalImmunity = true;
				}
			}

			const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];

			// calculate true accuracy
			let accuracy = move.accuracy;
			let boosts: SparseBoostsTable = {};
			let boost: number;
			if (accuracy !== true) {
				if (!move.ignoreAccuracy) {
					boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
					boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
					if (boost > 0) {
						accuracy *= boostTable[boost];
					} else {
						accuracy /= boostTable[-boost];
					}
				}
				if (!move.ignoreEvasion) {
					boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
					boost = this.battle.clampIntRange(boosts['evasion'], -6, 6);
					if (boost > 0) {
						accuracy /= boostTable[boost];
					} else if (boost < 0) {
						accuracy *= boostTable[-boost];
					}
				}
			}
			if (move.ohko) { // bypasses accuracy modifiers
				if (!target.isSemiInvulnerable()) {
					accuracy = 30;
					if (pokemon.level >= target.level && (move.ohko === true || !target.hasType(move.ohko))) {
						accuracy += (pokemon.level - target.level);
					} else {
						this.battle.add('-immune', target, '[ohko]');
						return false;
					}
				}
			} else {
				accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
			}
			if (move.alwaysHit) {
				accuracy = true; // bypasses ohko accuracy modifiers
			} else {
				accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
			}
			if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
				accPass = false;
			}

			if (accPass) {
				hitResult = this.battle.runEvent('TryHit', target, pokemon, move);
				if (!hitResult) {
					if (hitResult === false) {
						this.battle.add('-fail', pokemon);
						this.battle.attrLastMove('[still]');
					}
					return false;
				} else if (naturalImmunity) {
					this.battle.add('-immune', target);
					return false;
				}
			} else {
				if (naturalImmunity) {
					this.battle.add('-immune', target);
				} else {
					if (!move.spreadHit) this.battle.attrLastMove('[miss]');
					this.battle.add('-miss', pokemon, target);
				}
				return false;
			}

			move.totalDamage = 0;
			let damage: number | undefined | false = 0;
			pokemon.lastDamage = 0;
			if (move.multihit) {
				let hits = move.multihit;
				if (Array.isArray(hits)) {
					// yes, it's hardcoded... meh
					if (hits[0] === 2 && hits[1] === 5) {
						hits = this.battle.sample([2, 2, 2, 3, 3, 3, 4, 5]);
					} else {
						hits = this.battle.random(hits[0], hits[1] + 1);
					}
				}
				hits = Math.floor(hits);
				let nullDamage = true;
				let moveDamage: number | undefined | false;
				// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
				const isSleepUsable = move.sleepUsable || this.dex.moves.get(move.sourceEffect).sleepUsable;
				let i: number;
				for (i = 0; i < hits && target.hp && pokemon.hp; i++) {
					if (pokemon.status === 'slp' && !isSleepUsable) break;
					move.hit = i + 1;

					if (move.multiaccuracy && i > 0) {
						accuracy = move.accuracy;
						if (accuracy !== true) {
							if (!move.ignoreAccuracy) {
								boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
								boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
								if (boost > 0) {
									accuracy *= boostTable[boost];
								} else {
									accuracy /= boostTable[-boost];
								}
							}
							if (!move.ignoreEvasion) {
								boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
								boost = this.battle.clampIntRange(boosts['evasion'], -6, 6);
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

					moveDamage = this.moveHit(target, pokemon, move);
					if (moveDamage === false) break;
					if (nullDamage && (moveDamage || moveDamage === 0 || moveDamage === undefined)) nullDamage = false;
					// Damage from each hit is individually counted for the
					// purposes of Counter, Metal Burst, and Mirror Coat.
					damage = (moveDamage || 0);
					move.totalDamage += damage;
					this.battle.eachEvent('Update');
				}
				if (i === 0) return false;
				if (nullDamage) damage = false;
				this.battle.add('-hitcount', target, i);
			} else {
				damage = this.moveHit(target, pokemon, move);
				move.totalDamage = damage;
			}

			if (move.recoil && move.totalDamage) {
				this.battle.damage(this.calcRecoilDamage(move.totalDamage, move, pokemon), pokemon, target, 'recoil');
			}

			if (target && pokemon !== target) target.gotAttacked(move, damage, pokemon);

			if (move.ohko && !target.hp) this.battle.add('-ohko');

			if (!damage && damage !== 0) return damage;

			this.battle.eachEvent('Update');

			if (target && !move.negateSecondary) {
				this.battle.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
				this.battle.runEvent('AfterMoveSecondary', target, pokemon, move);
			}

			return damage;
		},

		calcRecoilDamage(damageDealt, move) {
			return this.battle.clampIntRange(Math.floor(damageDealt * move.recoil![0] / move.recoil![1]), 1);
		},
	},

	init() {

		const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Dark', 'Psychic', 'Dragon'];
		let newCategory = '';
		for (const i in this.data.Moves) {
			if (!this.data.Moves[i]) console.log(i);
			if (this.data.Moves[i].category === 'Status') continue;
			newCategory = specialTypes.includes(this.data.Moves[i].type) ? 'Special' : 'Physical';
			if (newCategory !== this.data.Moves[i].category) {
				this.modData('Moves', i).category = newCategory;
			}
		};

		//learnset stuff starts here

		// skull bash -> head smash
		delete this.modData('Learnsets', 'bulbasaur').learnset.skullbash;
		delete this.modData('Learnsets', 'ivysaur').learnset.skullbash;
		delete this.modData('Learnsets', 'venusaur').learnset.skullbash;
		delete this.modData('Learnsets', 'squirtle').learnset.skullbash;
		delete this.modData('Learnsets', 'wartortle').learnset.skullbash;
		delete this.modData('Learnsets', 'blastoise').learnset.skullbash;
		delete this.modData('Learnsets', 'cubone').learnset.skullbash;
		delete this.modData('Learnsets', 'marowak').learnset.skullbash;
		delete this.modData('Learnsets', 'sharpedo').learnset.skullbash;
		delete this.modData('Learnsets', 'relicanth').learnset.skullbash;

		this.modData('Learnsets', 'bulbasaur').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'ivysaur').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'venusaur').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'squirtle').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'wartortle').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'blastoise').learnset.headsmash = ['3M'];
		//this.modData('Learnsets', 'cubone').learnset.headsmash = ['3M'];
		//this.modData('Learnsets', 'marowak').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'sharpedo').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'relicanth').learnset.headsmash = ['3M'];

		//fury cutter -> x-scissor

		delete this.modData('Learnsets', 'absol').learnset.furycutter;
		delete this.modData('Learnsets', 'aggron').learnset.furycutter;
		delete this.modData('Learnsets', 'aipom').learnset.furycutter;
		delete this.modData('Learnsets', 'anorith').learnset.furycutter;
		delete this.modData('Learnsets', 'armaldo').learnset.furycutter;
		delete this.modData('Learnsets', 'aron').learnset.furycutter;
		delete this.modData('Learnsets', 'bagon').learnset.furycutter;
		delete this.modData('Learnsets', 'bayleef').learnset.furycutter;
		delete this.modData('Learnsets', 'beedrill').learnset.furycutter;
		delete this.modData('Learnsets', 'blaziken').learnset.furycutter;
		delete this.modData('Learnsets', 'breloom').learnset.furycutter;
		delete this.modData('Learnsets', 'bulbasaur').learnset.furycutter;
		delete this.modData('Learnsets', 'cacnea').learnset.furycutter;
		delete this.modData('Learnsets', 'cacturne').learnset.furycutter;
		delete this.modData('Learnsets', 'carvanha').learnset.furycutter;
		delete this.modData('Learnsets', 'charizard').learnset.furycutter;
		delete this.modData('Learnsets', 'charmander').learnset.furycutter;
		delete this.modData('Learnsets', 'charmeleon').learnset.furycutter;
		delete this.modData('Learnsets', 'combusken').learnset.furycutter;
		delete this.modData('Learnsets', 'corphish').learnset.furycutter;
		delete this.modData('Learnsets', 'crawdaunt').learnset.furycutter;
		delete this.modData('Learnsets', 'croconaw').learnset.furycutter;
		delete this.modData('Learnsets', 'dragonite').learnset.furycutter;
		delete this.modData('Learnsets', 'farfetchd').learnset.furycutter;
		delete this.modData('Learnsets', 'feraligatr').learnset.furycutter;
		delete this.modData('Learnsets', 'flygon').learnset.furycutter;
		delete this.modData('Learnsets', 'furret').learnset.furycutter;
		delete this.modData('Learnsets', 'gligar').learnset.furycutter;
		delete this.modData('Learnsets', 'golduck').learnset.furycutter;
		delete this.modData('Learnsets', 'golem').learnset.furycutter;
		delete this.modData('Learnsets', 'groudon').learnset.furycutter;
		delete this.modData('Learnsets', 'grovyle').learnset.furycutter;
		delete this.modData('Learnsets', 'heracross').learnset.furycutter;
		delete this.modData('Learnsets', 'ivysaur').learnset.furycutter;
		delete this.modData('Learnsets', 'kabutops').learnset.furycutter;
		delete this.modData('Learnsets', 'kangaskhan').learnset.furycutter;
		delete this.modData('Learnsets', 'kecleon').learnset.furycutter;
		delete this.modData('Learnsets', 'kingler').learnset.furycutter;
		delete this.modData('Learnsets', 'krabby').learnset.furycutter;
		delete this.modData('Learnsets', 'lairon').learnset.furycutter;
		delete this.modData('Learnsets', 'latias').learnset.furycutter;
		delete this.modData('Learnsets', 'latios').learnset.furycutter;
		delete this.modData('Learnsets', 'meganium').learnset.furycutter;
		delete this.modData('Learnsets', 'metagross').learnset.furycutter;
		delete this.modData('Learnsets', 'linoone').learnset.furycutter;
		delete this.modData('Learnsets', 'metang').learnset.furycutter;
		delete this.modData('Learnsets', 'mew').learnset.furycutter;
		delete this.modData('Learnsets', 'nidoqueen').learnset.furycutter;
		delete this.modData('Learnsets', 'nidoking').learnset.furycutter;
		delete this.modData('Learnsets', 'nincada').learnset.furycutter;
		delete this.modData('Learnsets', 'ninjask').learnset.furycutter;
		delete this.modData('Learnsets', 'nuzleaf').learnset.furycutter;
		delete this.modData('Learnsets', 'paras').learnset.furycutter;
		delete this.modData('Learnsets', 'parasect').learnset.furycutter;
		delete this.modData('Learnsets', 'pinsir').learnset.furycutter;
		delete this.modData('Learnsets', 'quilava').learnset.furycutter;
		delete this.modData('Learnsets', 'rayquaza').learnset.furycutter;
		delete this.modData('Learnsets', 'rhydon').learnset.furycutter;
		delete this.modData('Learnsets', 'roselia').learnset.furycutter;
		delete this.modData('Learnsets', 'sableye').learnset.furycutter;
		delete this.modData('Learnsets', 'salamence').learnset.furycutter;
		delete this.modData('Learnsets', 'sandshrew').learnset.furycutter;
		delete this.modData('Learnsets', 'sandslash').learnset.furycutter;
		delete this.modData('Learnsets', 'sceptile').learnset.furycutter;
		delete this.modData('Learnsets', 'scizor').learnset.furycutter;
		delete this.modData('Learnsets', 'scyther').learnset.furycutter;
		delete this.modData('Learnsets', 'sentret').learnset.furycutter;
		delete this.modData('Learnsets', 'seviper').learnset.furycutter;
		delete this.modData('Learnsets', 'sharpedo').learnset.furycutter;
		delete this.modData('Learnsets', 'shedinja').learnset.furycutter;
		delete this.modData('Learnsets', 'shelgon').learnset.furycutter;
		delete this.modData('Learnsets', 'shiftry').learnset.furycutter;
		delete this.modData('Learnsets', 'slaking').learnset.furycutter;
		delete this.modData('Learnsets', 'slakoth').learnset.furycutter;
		delete this.modData('Learnsets', 'slowbro').learnset.furycutter;
		delete this.modData('Learnsets', 'slowking').learnset.furycutter;
		delete this.modData('Learnsets', 'sneasel').learnset.furycutter;
		delete this.modData('Learnsets', 'teddiursa').learnset.furycutter;
		delete this.modData('Learnsets', 'treecko').learnset.furycutter;
		delete this.modData('Learnsets', 'tropius').learnset.furycutter;
		delete this.modData('Learnsets', 'typhlosion').learnset.furycutter;
		delete this.modData('Learnsets', 'tyranitar').learnset.furycutter;
		delete this.modData('Learnsets', 'ursaring').learnset.furycutter;
		delete this.modData('Learnsets', 'venusaur').learnset.furycutter;
		delete this.modData('Learnsets', 'vigoroth').learnset.furycutter;
		delete this.modData('Learnsets', 'zangoose').learnset.furycutter;
		delete this.modData('Learnsets', 'zigzagoon').learnset.furycutter;

		this.modData('Learnsets', 'absol').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'aggron').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'aipom').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'anorith').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'armaldo').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'aron').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'bagon').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'bayleef').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'beedrill').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'blaziken').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'breloom').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'bulbasaur').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'cacnea').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'cacturne').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'carvanha').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'charizard').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'charmander').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'charmeleon').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'combusken').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'corphish').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'crawdaunt').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'croconaw').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'dragonite').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'farfetchd').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'feraligatr').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'flygon').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'furret').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'gligar').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'golduck').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'golem').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'groudon').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'grovyle').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'heracross').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'ivysaur').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'kabutops').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'kangaskhan').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'kecleon').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'kingler').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'krabby').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'lairon').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'latias').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'latios').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'meganium').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'metagross').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'linoone').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'metang').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'mew').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'nidoqueen').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'nidoking').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'nincada').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'ninjask').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'nuzleaf').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'paras').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'parasect').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'pinsir').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'quilava').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'rayquaza').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'rhydon').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'roselia').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'sableye').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'salamence').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'sandshrew').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'sandslash').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'sceptile').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'scizor').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'scyther').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'sentret').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'seviper').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'sharpedo').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'shedinja').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'shelgon').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'shiftry').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'slaking').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'slakoth').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'slowbro').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'slowking').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'sneasel').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'teddiursa').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'treecko').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'tropius').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'typhlosion').learnset.xscissor = ['3M'];
		//this.modData('Learnsets', 'tyranitar').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'ursaring').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'venusaur').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'vigoroth').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'zangoose').learnset.xscissor = ['3M'];
		this.modData('Learnsets', 'zigzagoon').learnset.xscissor = ['3M'];

		// arm thrust -> force palm

		delete this.modData('Learnsets', 'hariyama').learnset.armthrust;
		delete this.modData('Learnsets', 'makuhita').learnset.armthrust;

		this.modData('Learnsets', 'hariyama').learnset.forcepalm = ['3M'];
		this.modData('Learnsets', 'makuhita').learnset.forcepalm = ['3M'];

		// astonish -> shadow sneak

		delete this.modData('Learnsets', 'aipom').learnset.astonish;
		delete this.modData('Learnsets', 'altaria').learnset.astonish;
		delete this.modData('Learnsets', 'banette').learnset.astonish;
		delete this.modData('Learnsets', 'chimecho').learnset.astonish;
		delete this.modData('Learnsets', 'cradily').learnset.astonish;
		delete this.modData('Learnsets', 'crobat').learnset.astonish;
		delete this.modData('Learnsets', 'dunsparce').learnset.astonish;
		delete this.modData('Learnsets', 'duskull').learnset.astonish;
		delete this.modData('Learnsets', 'dusclops').learnset.astonish;
		delete this.modData('Learnsets', 'exploud').learnset.astonish;
		delete this.modData('Learnsets', 'fearow').learnset.astonish;
		delete this.modData('Learnsets', 'gastly').learnset.astonish;
		delete this.modData('Learnsets', 'gengar').learnset.astonish;
		delete this.modData('Learnsets', 'girafarig').learnset.astonish;
		delete this.modData('Learnsets', 'golbat').learnset.astonish;
		delete this.modData('Learnsets', 'haunter').learnset.astonish;
		delete this.modData('Learnsets', 'kecleon').learnset.astonish;
		delete this.modData('Learnsets', 'lileep').learnset.astonish;
		delete this.modData('Learnsets', 'lombre').learnset.astonish;
		delete this.modData('Learnsets', 'lotad').learnset.astonish;
		delete this.modData('Learnsets', 'loudred').learnset.astonish;
		delete this.modData('Learnsets', 'ludicolo').learnset.astonish;
		delete this.modData('Learnsets', 'mawile').learnset.astonish;
		delete this.modData('Learnsets', 'mightyena').learnset.astonish;
		delete this.modData('Learnsets', 'misdreavus').learnset.astonish;
		delete this.modData('Learnsets', 'murkrow').learnset.astonish;
		delete this.modData('Learnsets', 'poochyena').learnset.astonish;
		delete this.modData('Learnsets', 'qwilfish').learnset.astonish;
		delete this.modData('Learnsets', 'sableye').learnset.astonish;
		delete this.modData('Learnsets', 'shuppet').learnset.astonish;
		delete this.modData('Learnsets', 'spearow').learnset.astonish;
		delete this.modData('Learnsets', 'stantler').learnset.astonish;
		delete this.modData('Learnsets', 'swablu').learnset.astonish;
		delete this.modData('Learnsets', 'wailmer').learnset.astonish;
		delete this.modData('Learnsets', 'wailord').learnset.astonish;
		delete this.modData('Learnsets', 'whismur').learnset.astonish;
		delete this.modData('Learnsets', 'zubat').learnset.astonish;

		this.modData('Learnsets', 'aipom').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'altaria').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'banette').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'chimecho').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'cradily').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'crobat').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'dunsparce').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'duskull').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'dusclops').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'exploud').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'fearow').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'gastly').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'gengar').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'girafarig').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'golbat').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'haunter').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'kecleon').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'lileep').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'lombre').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'lotad').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'loudred').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'ludicolo').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'mawile').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'mightyena').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'misdreavus').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'murkrow').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'poochyena').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'qwilfish').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'sableye').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'shuppet').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'spearow').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'stantler').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'swablu').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'wailmer').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'wailord').learnset.shadowsneak = ['3M'];
		//this.modData('Learnsets', 'whismur').learnset.shadowsneak = ['3M'];
		this.modData('Learnsets', 'zubat').learnset.shadowsneak = ['3M'];

		// Iron Tail -> Flash Cannon
		
		delete this.modData('Learnsets', 'abra').learnset.irontail;
		delete this.modData('Learnsets', 'absol').learnset.irontail;
		delete this.modData('Learnsets', 'aerodactyl').learnset.irontail;
		delete this.modData('Learnsets', 'aggron').learnset.irontail;
		delete this.modData('Learnsets', 'aipom').learnset.irontail;
		delete this.modData('Learnsets', 'alakazam').learnset.irontail;
		delete this.modData('Learnsets', 'altaria').learnset.irontail;
		delete this.modData('Learnsets', 'ampharos').learnset.irontail;
		delete this.modData('Learnsets', 'arbok').learnset.irontail;
		delete this.modData('Learnsets', 'arcanine').learnset.irontail;
		delete this.modData('Learnsets', 'armaldo').learnset.irontail;
		delete this.modData('Learnsets', 'aron').learnset.irontail;
		delete this.modData('Learnsets', 'azumarill').learnset.irontail;
		delete this.modData('Learnsets', 'azurill').learnset.irontail;
		delete this.modData('Learnsets', 'bayleef').learnset.irontail;
		delete this.modData('Learnsets', 'blastoise').learnset.irontail;
		delete this.modData('Learnsets', 'blissey').learnset.irontail;
		delete this.modData('Learnsets', 'breloom').learnset.irontail;
		delete this.modData('Learnsets', 'chansey').learnset.irontail;
		delete this.modData('Learnsets', 'charizard').learnset.irontail;
		delete this.modData('Learnsets', 'charmander').learnset.irontail;
		delete this.modData('Learnsets', 'charmeleon').learnset.irontail;
		delete this.modData('Learnsets', 'chikorita').learnset.irontail;
		delete this.modData('Learnsets', 'clefairy').learnset.irontail;
		delete this.modData('Learnsets', 'clefable').learnset.irontail;
		delete this.modData('Learnsets', 'cleffa').learnset.irontail;
		delete this.modData('Learnsets', 'croconaw').learnset.irontail;
		delete this.modData('Learnsets', 'cubone').learnset.irontail;
		delete this.modData('Learnsets', 'delcatty').learnset.irontail;
		delete this.modData('Learnsets', 'donphan').learnset.irontail;
		delete this.modData('Learnsets', 'dragonair').learnset.irontail;
		delete this.modData('Learnsets', 'dragonite').learnset.irontail;
		delete this.modData('Learnsets', 'dratini').learnset.irontail;
		delete this.modData('Learnsets', 'eevee').learnset.irontail;
		delete this.modData('Learnsets', 'dunsparce').learnset.irontail;
		delete this.modData('Learnsets', 'ekans').learnset.irontail;
		delete this.modData('Learnsets', 'electabuzz').learnset.irontail;
		delete this.modData('Learnsets', 'electrike').learnset.irontail;
		delete this.modData('Learnsets', 'entei').learnset.irontail;
		delete this.modData('Learnsets', 'espeon').learnset.irontail;
		delete this.modData('Learnsets', 'farfetchd').learnset.irontail;
		delete this.modData('Learnsets', 'feraligatr').learnset.irontail;
		delete this.modData('Learnsets', 'flaaffy').learnset.irontail;
		delete this.modData('Learnsets', 'flareon').learnset.irontail;
		delete this.modData('Learnsets', 'flygon').learnset.irontail;
		delete this.modData('Learnsets', 'furret').learnset.irontail;
		delete this.modData('Learnsets', 'girafarig').learnset.irontail;
		delete this.modData('Learnsets', 'gligar').learnset.irontail;
		delete this.modData('Learnsets', 'golduck').learnset.irontail;
		delete this.modData('Learnsets', 'granbull').learnset.irontail;
		delete this.modData('Learnsets', 'groudon').learnset.irontail;
		delete this.modData('Learnsets', 'grovyle').learnset.irontail;
		delete this.modData('Learnsets', 'growlithe').learnset.irontail;
		delete this.modData('Learnsets', 'grumpig').learnset.irontail;
		delete this.modData('Learnsets', 'houndoom').learnset.irontail;
		delete this.modData('Learnsets', 'houndour').learnset.irontail;
		delete this.modData('Learnsets', 'jolteon').learnset.irontail;
		delete this.modData('Learnsets', 'kadabra').learnset.irontail;
		delete this.modData('Learnsets', 'kangaskhan').learnset.irontail;
		delete this.modData('Learnsets', 'kecleon').learnset.irontail;
		delete this.modData('Learnsets', 'lairon').learnset.irontail;
		delete this.modData('Learnsets', 'lapras').learnset.irontail;
		delete this.modData('Learnsets', 'lickitung').learnset.irontail;
		delete this.modData('Learnsets', 'linoone').learnset.irontail;
		delete this.modData('Learnsets', 'lugia').learnset.irontail;
		delete this.modData('Learnsets', 'magby').learnset.irontail;
		delete this.modData('Learnsets', 'magmar').learnset.irontail;
		delete this.modData('Learnsets', 'manectric').learnset.irontail;
		delete this.modData('Learnsets', 'mankey').learnset.irontail;
		delete this.modData('Learnsets', 'mareep').learnset.irontail;
		delete this.modData('Learnsets', 'marill').learnset.irontail;
		delete this.modData('Learnsets', 'marowak').learnset.irontail;
		delete this.modData('Learnsets', 'marshtomp').learnset.irontail;
		delete this.modData('Learnsets', 'meganium').learnset.irontail;
		delete this.modData('Learnsets', 'meowth').learnset.irontail;
		delete this.modData('Learnsets', 'mew').learnset.irontail;
		delete this.modData('Learnsets', 'mewtwo').learnset.irontail;
		delete this.modData('Learnsets', 'mightyena').learnset.irontail;
		delete this.modData('Learnsets', 'milotic').learnset.irontail;
		delete this.modData('Learnsets', 'miltank').learnset.irontail;
		delete this.modData('Learnsets', 'minun').learnset.irontail;
		delete this.modData('Learnsets', 'mudkip').learnset.irontail;
		delete this.modData('Learnsets', 'nidoking').learnset.irontail;
		delete this.modData('Learnsets', 'nidoqueen').learnset.irontail;
		delete this.modData('Learnsets', 'nidoranf').learnset.irontail;
		delete this.modData('Learnsets', 'nidoranm').learnset.irontail;
		delete this.modData('Learnsets', 'nidorina').learnset.irontail;
		delete this.modData('Learnsets', 'nidorino').learnset.irontail;
		delete this.modData('Learnsets', 'ninetales').learnset.irontail;
		delete this.modData('Learnsets', 'onix').learnset.irontail;
		delete this.modData('Learnsets', 'persian').learnset.irontail;
		delete this.modData('Learnsets', 'phanpy').learnset.irontail;
		delete this.modData('Learnsets', 'pichu').learnset.irontail;
		delete this.modData('Learnsets', 'pikachu').learnset.irontail;
		delete this.modData('Learnsets', 'plusle').learnset.irontail;
		delete this.modData('Learnsets', 'ponyta').learnset.irontail;
		delete this.modData('Learnsets', 'poochyena').learnset.irontail;
		delete this.modData('Learnsets', 'porygon').learnset.irontail;
		delete this.modData('Learnsets', 'porygon2').learnset.irontail;
		delete this.modData('Learnsets', 'primeape').learnset.irontail;
		delete this.modData('Learnsets', 'psyduck').learnset.irontail;
		delete this.modData('Learnsets', 'quagsire').learnset.irontail;
		delete this.modData('Learnsets', 'raichu').learnset.irontail;
		delete this.modData('Learnsets', 'raikou').learnset.irontail;
		delete this.modData('Learnsets', 'rapidash').learnset.irontail;
		delete this.modData('Learnsets', 'raticate').learnset.irontail;
		delete this.modData('Learnsets', 'rattata').learnset.irontail;
		delete this.modData('Learnsets', 'rayquaza').learnset.irontail;
		delete this.modData('Learnsets', 'rhydon').learnset.irontail;
		delete this.modData('Learnsets', 'rhyhorn').learnset.irontail;
		delete this.modData('Learnsets', 'salamence').learnset.irontail;
		delete this.modData('Learnsets', 'sandshrew').learnset.irontail;
		delete this.modData('Learnsets', 'sandslash').learnset.irontail;
		delete this.modData('Learnsets', 'sceptile').learnset.irontail;
		delete this.modData('Learnsets', 'sealeo').learnset.irontail;
		delete this.modData('Learnsets', 'sentret').learnset.irontail;
		delete this.modData('Learnsets', 'seviper').learnset.irontail;
		delete this.modData('Learnsets', 'skitty').learnset.irontail;
		delete this.modData('Learnsets', 'slowbro').learnset.irontail;
		delete this.modData('Learnsets', 'slowking').learnset.irontail;
		delete this.modData('Learnsets', 'slowpoke').learnset.irontail;
		delete this.modData('Learnsets', 'sneasel').learnset.irontail;
		delete this.modData('Learnsets', 'spheal').learnset.irontail;
		delete this.modData('Learnsets', 'spoink').learnset.irontail;
		delete this.modData('Learnsets', 'squirtle').learnset.irontail;
		delete this.modData('Learnsets', 'stantler').learnset.irontail;
		delete this.modData('Learnsets', 'steelix').learnset.irontail;
		delete this.modData('Learnsets', 'suicune').learnset.irontail;
		delete this.modData('Learnsets', 'swampert').learnset.irontail;
		delete this.modData('Learnsets', 'torkoal').learnset.irontail;
		delete this.modData('Learnsets', 'tauros').learnset.irontail;
		delete this.modData('Learnsets', 'totodile').learnset.irontail;
		delete this.modData('Learnsets', 'treecko').learnset.irontail;
		delete this.modData('Learnsets', 'tyranitar').learnset.irontail;
		delete this.modData('Learnsets', 'umbreon').learnset.irontail;
		delete this.modData('Learnsets', 'vaporeon').learnset.irontail;
		delete this.modData('Learnsets', 'vulpix').learnset.irontail;
		delete this.modData('Learnsets', 'walrein').learnset.irontail;
		delete this.modData('Learnsets', 'wartortle').learnset.irontail;
		delete this.modData('Learnsets', 'wooper').learnset.irontail;
		delete this.modData('Learnsets', 'zangoose').learnset.irontail;
		delete this.modData('Learnsets', 'zigzagoon').learnset.irontail;

		this.modData('Learnsets', 'abra').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'absol').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'aerodactyl').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'aggron').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'aipom').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'alakazam').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'altaria').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'ampharos').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'arbok').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'arcanine').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'armaldo').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'aron').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'azumarill').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'azurill').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'bayleef').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'blastoise').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'blissey').learnset.flashcannon = ['3M'];
		//this.modData('Learnsets', 'breloom').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'chansey').learnset.flashcannon = ['3M'];
		//this.modData('Learnsets', 'charizard').learnset.flashcannon = ['3M'];
		//this.modData('Learnsets', 'charmander').learnset.flashcannon = ['3M'];
		//this.modData('Learnsets', 'charmeleon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'chikorita').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'clefairy').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'clefable').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'cleffa').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'croconaw').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'cubone').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'delcatty').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'donphan').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'dragonair').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'dragonite').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'dratini').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'eevee').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'dunsparce').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'ekans').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'electabuzz').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'electrike').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'entei').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'espeon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'farfetchd').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'feraligatr').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'flaaffy').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'flareon').learnset.flashcannon = ['3M'];
		//this.modData('Learnsets', 'flygon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'furret').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'girafarig').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'gligar').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'golduck').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'granbull').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'groudon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'grovyle').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'growlithe').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'grumpig').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'houndoom').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'houndour').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'jolteon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'kadabra').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'kangaskhan').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'kecleon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'lairon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'lapras').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'lickitung').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'linoone').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'lugia').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'magby').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'magmar').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'manectric').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'mankey').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'mareep').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'marill').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'marowak').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'marshtomp').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'meganium').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'meowth').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'mew').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'mewtwo').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'mightyena').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'milotic').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'miltank').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'minun').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'mudkip').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'nidoking').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'nidoqueen').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'nidoranf').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'nidoranm').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'nidorina').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'nidorino').learnset.flashcannon = ['3M'];
		//this.modData('Learnsets', 'ninetales').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'onix').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'persian').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'phanpy').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'pichu').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'pikachu').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'plusle').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'ponyta').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'poochyena').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'porygon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'porygon2').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'primeape').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'psyduck').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'quagsire').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'raichu').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'raikou').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'rapidash').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'raticate').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'rattata').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'rayquaza').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'rhydon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'rhyhorn').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'salamence').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'sandshrew').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'sandslash').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'sceptile').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'sealeo').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'sentret').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'seviper').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'skitty').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'slowbro').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'slowking').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'slowpoke').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'sneasel').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'spheal').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'spoink').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'squirtle').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'stantler').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'steelix').learnset.flashcannon = ['3M'];
		//this.modData('Learnsets', 'suicune').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'swampert').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'torkoal').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'tauros').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'totodile').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'treecko').learnset.flashcannon = ['3M'];
		//this.modData('Learnsets', 'tyranitar').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'umbreon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'vaporeon').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'vulpix').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'walrein').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'wartortle').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'wooper').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'zangoose').learnset.flashcannon = ['3M'];
		this.modData('Learnsets', 'zigzagoon').learnset.flashcannon = ['3M'];

		//icicle spear -> ice shard

		delete this.modData('Learnsets', 'cloyster').learnset.iciclespear;
		delete this.modData('Learnsets', 'corsola').learnset.iciclespear;
		delete this.modData('Learnsets', 'dewgong').learnset.iciclespear;
		delete this.modData('Learnsets', 'piloswine').learnset.iciclespear;
		delete this.modData('Learnsets', 'seel').learnset.iciclespear;
		delete this.modData('Learnsets', 'shellder').learnset.iciclespear;
		delete this.modData('Learnsets', 'swinub').learnset.iciclespear;

		this.modData('Learnsets', 'cloyster').learnset.iceshard = ['3M'];
		this.modData('Learnsets', 'corsola').learnset.iceshard = ['3M'];
		this.modData('Learnsets', 'dewgong').learnset.iceshard = ['3M'];
		this.modData('Learnsets', 'piloswine').learnset.iceshard = ['3M'];
		this.modData('Learnsets', 'seel').learnset.iceshard = ['3M'];
		this.modData('Learnsets', 'shellder').learnset.iceshard = ['3M'];
		this.modData('Learnsets', 'swinub').learnset.iceshard = ['3M'];

		//misc

		this.modData('Learnsets', 'nidoranf').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'nidorina').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'nidoqueen').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'nidoranm').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'nidorino').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'nidoking').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'ekans').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'arbok').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'shroomish').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'breloom').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'clamperl').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'gorebyss').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'huntail').learnset.poisontail = ['3M'];
		this.modData('Learnsets', 'poliwrath').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'feraligatr').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'hariyama').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'makuhita').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'machamp').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'machoke').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'machop').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'primeape').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'mankey').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'hitmonlee').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'hitmonchan').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'entei').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'nidoqueen').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'nidoking').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'exploud').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'flareon').learnset.superpower = ['3M'];
		this.modData('Learnsets', 'donphan').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'armaldo').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'tauros').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'golem').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'granbull').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'aggron').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'crawdaunt').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'entei').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'rhydon').learnset.headsmash = ['3M'];
		this.modData('Learnsets', 'blaziken').learnset.forcepalm = ['3M'];
		this.modData('Learnsets', 'poliwrath').learnset.forcepalm = ['3M'];
		this.modData('Learnsets', 'hitmonchan').learnset.forcepalm = ['3M'];
		this.modData('Learnsets', 'swampert').learnset.forcepalm = ['3M'];
		delete this.modData('Learnsets', 'dodrio').learnset.skyattack;
		delete this.modData('Learnsets', 'doduo').learnset.skyattack;
		delete this.modData('Learnsets', 'aerodactyl').learnset.skyattack;
		this.modData('Learnsets', 'gligar').learnset.slackoff = ['3M'];
		this.modData('Learnsets', 'xatu').learnset.heatwave = ['3M'];
		this.modData('Learnsets', 'salamence').learnset.heatwave = ['3M'];
		this.modData('Learnsets', 'dragonite').learnset.heatwave = ['3M'];
		this.modData('Learnsets', 'pelipper').learnset.heatwave = ['3M'];
		this.modData('Learnsets', 'noctowl').learnset.heatwave = ['3M'];
		this.modData('Learnsets', 'pidgeot').learnset.bulkup = ['3M'];
		this.modData('Learnsets', 'feraligatr').learnset.bulkup = ['3M'];
		this.modData('Learnsets', 'meganium').learnset.bulkup = ['3M'];
		this.modData('Learnsets', 'tropius').learnset.bulkup = ['3M'];
		this.modData('Learnsets', 'venusaur').learnset.bulkup = ['3M'];
		this.modData('Learnsets', 'piloswine').learnset.bulkup = ['3M'];
		this.modData('Learnsets', 'arbok').learnset.bulkup = ['3M'];

	}
};
