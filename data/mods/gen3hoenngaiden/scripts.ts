import type {Dex} from '../sim/dex';

const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe']);

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3',
	init: function () {
		for (const id in this.dataCache.Pokedex) {
			let unbanlist = this.dataCache.Formats['gen3hoenngaiden'].unbanlist;
			let speciesName = this.dataCache.Pokedex[id].name;
			if (!unbanlist.includes(speciesName)) {
				// if (this.dataCache.FormatsData[id] !== undefined) this.dataCache.FormatsData[id].tier = "Illegal";
			}
		const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Dark', 'Psychic', 'Dragon'];
		const physicalTypes = ['Normal', 'Bug', 'Ghost', 'Fighting', 'Steel', 'Flying', 'Rock', 'Poison', 'Ground'];
		let newCategory = '';
		for (const i in this.data.Movedex) {
			if (!this.data.Movedex[i]) console.log(i);
			if (this.data.Movedex[i].category === 'Status') continue;
			newCategory = specialTypes.includes(this.data.Movedex[i].type) ? 'Special' : 'Physical';
			if (newCategory !== this.data.Movedex[i].category) {
				this.modData('Movedex', i).category = newCategory;
			}
		}
		}
	},
	init: function () {
		//Slate 2 Buffs
		this.modData('Learnsets', 'jumpluff').learnset.rapidspin = ['3L1'];
		this.modData('Learnsets', 'jumpluff').learnset.batonpass = ['3L1'];
		
		this.modData('Learnsets', 'tropius').learnset.dragondance = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.outrage = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.rockslide = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.dragonclaw = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.flamethrower = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.calmmind = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.refresh = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.recover = ['3L1'];
		
		this.modData('Learnsets', 'armaldo').learnset.raindance = ['3L1'];
		this.modData('Learnsets', 'armaldo').learnset.signalbeam = ['3L1'];
		
		this.modData('Learnsets', 'crawdaunt').learnset.hydropump = ['3L1'];
		this.modData('Learnsets', 'crawdaunt').learnset.agility = ['3L1'];
		
		this.modData('Learnsets', 'slowpoke').learnset.slackoff = ['3L1'];
		this.modData('Learnsets', 'slowbro').learnset.slackoff = ['3L1'];
		this.modData('Learnsets', 'slowking').learnset.slackoff = ['3L1'];
		
		//Slate 3 Buffs
		this.modData('Learnsets', 'piloswine').learnset.shadowball = ['3L1'];
		
		this.modData('Learnsets', 'delibird').learnset.drillpeck = ['3L1'];
		this.modData('Learnsets', 'delibird').learnset.milkdrink = ['3L1'];
		this.modData('Learnsets', 'delibird').learnset.spikes = ['3L1'];
		this.modData('Learnsets', 'delibird').learnset.surf = ['3L1'];
		
		this.modData('Learnsets', 'ledian').learnset.tailglow = ['3L1'];
		this.modData('Learnsets', 'ledian').learnset.psychic = ['3L1'];
		this.modData('Learnsets', 'ledian').learnset.firepunch = ['3L1'];
		
		this.modData('Learnsets', 'sableye').learnset.yawn = ['3L1'];
		
		this.modData('Learnsets', 'hitmonlee').learnset.submission = ['3L1'];
		
		this.modData('Learnsets', 'roselia').learnset.sleeppowder = ['3L1'];
		this.modData('Learnsets', 'roselia').learnset.extrasensory = ['3L1'];
		this.modData('Learnsets', 'roselia').learnset.recover = ['3L1'];
		
		this.modData('Learnsets', 'dunsparce').learnset.spikes = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.dragonclaw = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.outrage = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.slackoff = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.healbell = ['3L1'];
		
		this.modData('Learnsets', 'grumpig').learnset.thunderwave = ['3L1'];
		this.modData('Learnsets', 'grumpig').learnset.thunderbolt = ['3L1'];
		
		this.modData('Learnsets', 'volbeat').learnset.fly = ['3L1'];
		
		this.modData('Learnsets', 'cloyster').learnset.hydropump = ['3L1'];
		
		this.modData('Learnsets', 'minun').learnset.blizzard = ['3L1'];
		this.modData('Learnsets', 'minun').learnset.icebeam = ['3L1'];
		this.modData('Learnsets', 'minun').learnset.hail = ['3L1'];
		this.modData('Learnsets', 'minun').learnset.acidarmor = ['3L1'];
		this.modData('Learnsets', 'minun').learnset.haze = ['3L1'];
		
		this.modData('Learnsets', 'illumise').learnset.calmmind = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.aromatherapy = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.signalbeam = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.taunt = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.destinybond = ['3L1'];
		
		this.modData('Learnsets', 'ampharos').learnset.growth = ['3L1'];
		this.modData('Learnsets', 'ampharos').learnset.dragonclaw = ['3L1'];
		this.modData('Learnsets', 'ampharos').learnset.slackoff = ['3L1'];
		
		this.modData('Learnsets', 'plusle').learnset.willowisp = ['3L1'];
		this.modData('Learnsets', 'plusle').learnset.fireblast = ['3L1'];
		this.modData('Learnsets', 'plusle').learnset.flamethrower = ['3L1'];
		
		this.modData('Learnsets', 'lanturn').learnset.bodyslam = ['3L1'];
		
		//Slate 5 Move Additions
		//Acrobatics
		this.modData('Learnsets', 'farfetchd').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'crobat').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'jumpluff').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'gligar').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'primeape').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'scyther').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'sceptile').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'blaziken').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'ninjask').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'volbeat').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.acrobatics = ['3L1'];
		
		//Lunge
		this.modData('Learnsets', 'parasect').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'pinsir').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'ariados').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'beautifly').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'butterfree').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'beedrill').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'yanma').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'golem').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'golemalola').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'donphan').learnset.lunge = ['3L1'];
		
		//Foul Play
		this.modData('Learnsets', 'houndoom').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'umbreon').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'absol').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'shiftry').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'cacturne').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'sneasel').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'mightyena').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'murkrow').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'slowking').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'slowbro').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'ninetales').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'porygon2').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.foulplay = ['3L1'];
		
		//Sucker Punch
		this.modData('Learnsets', 'absol').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'cacturne').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'furret').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'gengar').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'golem').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'houndoom').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'mightyena').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'nidoking').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'sableye').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'smeargle').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'umbreon').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.suckerpunch = ['3L1'];
		
		//Spiky Shield
		this.modData('Learnsets', 'cacturne').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'cradily').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'tangela').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'omastar').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'sandslash').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'qwilfish').learnset.spikyshield = ['3L1'];
		
		//Slate 6
		this.modData('Learnsets', 'sunflora').learnset.weatherball = ['3L1'];
		this.modData('Learnsets', 'sunflora').learnset.stunspore = ['3L1'];
		this.modData('Learnsets', 'sunflora').learnset.batonpass = ['3L1'];
		
		this.modData('Learnsets', 'mawile').learnset.meteormash = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.slackoff = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.thunderwave = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.suckerpunch = ['3L1'];
		
		//Slate 7
		this.modData('Learnsets', 'girafarig').learnset.willowisp = ['3L1'];
		this.modData('Learnsets', 'girafarig').learnset.trick = ['3L1'];
		
		this.modData('Learnsets', 'piloswine').learnset.slackoff = ['3L1'];
	},
	
	useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove) {
		if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
		if (sourceEffect && sourceEffect.id === 'instruct') sourceEffect = null;

		let move = this.dex.getActiveMove(moveOrMoveName);

		if (this.activeMove) {
			move.priority = this.activeMove.priority;
		}
		const baseTarget = move.target;
		if (target === undefined) target = this.getRandomTarget(pokemon, move);
		if (move.target === 'self' || move.target === 'allies') {
			target = pokemon;
		}
		if (sourceEffect) {
			move.sourceEffect = sourceEffect.id;
			move.ignoreAbility = false;
		}
		let moveResult = false;

		this.setActiveMove(move, pokemon, target);

		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Target changed in ModifyMove, so we must adjust it here
			// Adjust before the next event so the correct target is passed to the
			// event
			target = this.getRandomTarget(pokemon, move);
		}
		move = this.runEvent('ModifyMove', pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Adjust again
			target = this.getRandomTarget(pokemon, move);
		}
		if (!move || pokemon.fainted) {
			return false;
		}

		let attrs = '';

		let movename = move.name;
		if (move.id === 'hiddenpower') movename = 'Hidden Power';
		if (sourceEffect) attrs += `|[from]${this.dex.getEffect(sourceEffect)}`;
		this.addMove('move', pokemon, movename, target + attrs);

		if (!target) {
			this.attrLastMove('[notarget]');
			this.add('-notarget', pokemon);
			return false;
		}

		const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);

		if (!sourceEffect || sourceEffect.id === 'pursuit') {
			let extraPP = 0;
			for (const source of pressureTargets) {
				const ppDrop = this.runEvent('DeductPP', source, pokemon, move);
				if (ppDrop !== true) {
					extraPP += ppDrop || 0;
				}
			}
			if (extraPP > 0) {
				pokemon.deductPP(move, extraPP);
			}
		}

		if (!this.singleEvent('TryMove', move, null, pokemon, target, move) ||
			!this.runEvent('TryMove', pokemon, target, move)) {
			move.mindBlownRecoil = false;
			return false;
		}

		this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

		if (move.ignoreImmunity === undefined) {
			move.ignoreImmunity = (move.category === 'Status');
		}

		if (move.selfdestruct === 'always') {
			this.faint(pokemon, pokemon, move);
		}

		let damage: number | false | undefined | '' = false;
		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage === this.NOT_FAIL) pokemon.moveThisTurnResult = null;
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		} else if (move.target === 'allAdjacent' || move.target === 'allAdjacentFoes') {
			if (!targets.length) {
				this.attrLastMove('[notarget]');
				this.add('-notarget', pokemon);
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
					if (damage !== false || hitResult !== this.NOT_FAIL) damage = hitResult;
				}
				if (damage === this.NOT_FAIL) pokemon.moveThisTurnResult = null;
			}
			if (move.spreadHit) this.attrLastMove('[spread] ' + hitSlots.join(','));
		} else {
			target = targets[0];
			let lacksTarget = !target || target.fainted;
			if (!lacksTarget) {
				if (['adjacentFoe', 'adjacentAlly', 'normal', 'randomNormal'].includes(move.target)) {
					lacksTarget = !this.isAdjacent(target, pokemon);
				}
			}
			if (lacksTarget && !move.isFutureMove) {
				this.attrLastMove('[notarget]');
				this.add('-notarget', pokemon);
				return false;
			}
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage === this.NOT_FAIL) pokemon.moveThisTurnResult = null;
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		}
		if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
		if (!pokemon.hp) {
			this.faint(pokemon, pokemon, move);
		}

		if (!moveResult) {
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			return false;
		}

		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
		}
		return true;
	},
	tryMoveHit(target, pokemon, move) {
		this.setActiveMove(move, pokemon, target);
		let naturalImmunity = false;
		let accPass = true;

		let hitResult = this.singleEvent('PrepareHit', move, {}, target, pokemon, move);
		if (!hitResult) {
			if (hitResult === false) {
				this.add('-fail', pokemon);
				this.attrLastMove('[still]');
			}
			return false;
		}
		this.runEvent('PrepareHit', pokemon, target, move);

		if (!this.singleEvent('Try', move, null, pokemon, target, move)) {
			return false;
		}

		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			if (move.target === 'all') {
				hitResult = this.runEvent('TryHitField', target, pokemon, move);
			} else {
				hitResult = this.runEvent('TryHitSide', target, pokemon, move);
			}
			if (!hitResult) {
				if (hitResult === false) {
					this.add('-fail', pokemon);
					this.attrLastMove('[still]');
				}
				return false;
			}
			return this.moveHit(target, pokemon, move);
		}

		hitResult = this.runEvent('Invulnerability', target, pokemon, move);
		if (hitResult === false) {
			if (!move.spreadHit) this.attrLastMove('[miss]');
			this.add('-miss', pokemon, target);
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
			hitResult = this.singleEvent('TryImmunity', move, {}, target, pokemon, move);
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
				boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
				boost = this.clampIntRange(boosts['accuracy'], -6, 6);
				if (boost > 0) {
					accuracy *= boostTable[boost];
				} else {
					accuracy /= boostTable[-boost];
				}
			}
			if (!move.ignoreEvasion) {
				boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
				boost = this.clampIntRange(boosts['evasion'], -6, 6);
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
					this.add('-immune', target, '[ohko]');
					return false;
				}
			}
		} else {
			accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
		}
		if (move.alwaysHit) {
			accuracy = true; // bypasses ohko accuracy modifiers
		} else {
			accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
		}
		if (accuracy !== true && !this.randomChance(accuracy, 100)) {
			accPass = false;
		}

		if (accPass) {
			hitResult = this.runEvent('TryHit', target, pokemon, move);
			if (!hitResult) {
				if (hitResult === false) {
					this.add('-fail', pokemon);
					this.attrLastMove('[still]');
				}
				return false;
			} else if (naturalImmunity) {
				this.add('-immune', target);
				return false;
			}
		} else {
			if (naturalImmunity) {
				this.add('-immune', target);
			} else {
				if (!move.spreadHit) this.attrLastMove('[miss]');
				this.add('-miss', pokemon, target);
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
					hits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
				} else {
					hits = this.random(hits[0], hits[1] + 1);
				}
			}
			hits = Math.floor(hits);
			let nullDamage = true;
			let moveDamage: number | undefined | false;
			// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
			const isSleepUsable = move.sleepUsable || this.dex.getMove(move.sourceEffect).sleepUsable;
			let i: number;
			for (i = 0; i < hits && target.hp && pokemon.hp; i++) {
				if (pokemon.status === 'slp' && !isSleepUsable) break;
				move.hit = i + 1;

				if (move.multiaccuracy && i > 0) {
					accuracy = move.accuracy;
					if (accuracy !== true) {
						if (!move.ignoreAccuracy) {
							boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
							boost = this.clampIntRange(boosts['accuracy'], -6, 6);
							if (boost > 0) {
								accuracy *= boostTable[boost];
							} else {
								accuracy /= boostTable[-boost];
							}
						}
						if (!move.ignoreEvasion) {
							boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
							boost = this.clampIntRange(boosts['evasion'], -6, 6);
							if (boost > 0) {
								accuracy /= boostTable[boost];
							} else if (boost < 0) {
								accuracy *= boostTable[-boost];
							}
						}
					}
					accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (!move.alwaysHit) {
						accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
						if (accuracy !== true && !this.randomChance(accuracy, 100)) break;
					}
				}

				moveDamage = this.moveHit(target, pokemon, move);
				if (moveDamage === false) break;
				if (nullDamage && (moveDamage || moveDamage === 0 || moveDamage === undefined)) nullDamage = false;
				// Damage from each hit is individually counted for the
				// purposes of Counter, Metal Burst, and Mirror Coat.
				damage = (moveDamage || 0);
				move.totalDamage += damage;
				this.eachEvent('Update');
			}
			if (i === 0) return false;
			if (nullDamage) damage = false;
			this.add('-hitcount', target, i);
		} else {
			damage = this.moveHit(target, pokemon, move);
			move.totalDamage = damage;
		}

		if (move.recoil && move.totalDamage) {
			this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, target, 'recoil');
		}

		if (target && pokemon !== target) target.gotAttacked(move, damage, pokemon);

		if (move.ohko) this.add('-ohko');

		if (!damage && damage !== 0) return damage;

		this.eachEvent('Update');

		if (target && !move.negateSecondary) {
			this.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
			this.runEvent('AfterMoveSecondary', target, pokemon, move);
		}

		return damage;
	},

	calcRecoilDamage(damageDealt, move) {
		return this.clampIntRange(Math.floor(damageDealt * move.recoil![0] / move.recoil![1]), 1);
	},
};