const csi = ["horatekku", "aroofaondo", "exoltol", "animon", "esscargoo", "tunguru", "terricks", "skunkle", "skunking", "kipuro", "kamebi", "pyronoir", "kazappelin", "pierzer", "oatu", "lunaraknid", "cumulos", "altocumulos"];

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen2',
	gen: 2,

	
	init: function () {
		const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Dark', 'Psychic', 'Dragon', 'Cosmic'];
		let newCategory = '';
		for (const i in this.data.Moves) {
			if (!this.data.Moves[i]) console.log(i);
			if (this.data.Moves[i].category === 'Status') continue;
			newCategory = specialTypes.includes(this.data.Moves[i].type) ? 'Special' : 'Physical';
			if (newCategory !== this.data.Moves[i].category) {
				this.modData('Moves', i).category = newCategory;
			}
		}
		for (const id in this.dataCache.Pokedex) {
			const pokemon = this.dataCache.Pokedex[id];
			if (this.modData('FormatsData', id)) {
				if (this.modData('FormatsData', id).isNonstandard === 'Past') this.modData('FormatsData', id).isNonstandard = null;
				// singles tiers
				if (csi.includes(id)) this.modData('FormatsData', id).tier = "C:SI";
			}
		};
		
		this.modData('Learnsets', 'scyther').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'heracross').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'pinsir').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'forretress').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'beedrill').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'ariados').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'yanma').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'ledian').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'parasect').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'crobat').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'pierzer').learnset.swarmattack = ['2L1'];
		
		this.modData('Learnsets', 'umbreon').learnset.blackhole = ['2L1'];
		this.modData('Learnsets', 'houndoom').learnset.blackhole = ['2L1'];
		this.modData('Learnsets', 'murkrow').learnset.blackhole = ['2L1'];
		this.modData('Learnsets', 'clefable').learnset.blackhole = ['2L1'];
		
		this.modData('Learnsets', 'machamp').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'electabuzz').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'magmar').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'golduck').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'primeape').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'hitmonchan').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'hitmonlee').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'hitmontop').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'wobbuffet').learnset.parry = ['2L1'];
		
		this.modData('Learnsets', 'entei').learnset.sacredcandle = ['2L1'];
		this.modData('Learnsets', 'hooh').learnset.sacredcandle = ['2L1'];
		this.modData('Learnsets', 'aroofaondo').learnset.sacredcandle = ['2L1'];
		this.modData('Learnsets', 'esscargoo').learnset.sacredcandle = ['2L1'];
		
		this.modData('Learnsets', 'venusaur').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'vileplume').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'bellossom').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'meganium').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'sunflora').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'golduck').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'raichu').learnset.flowermortar = ['2L1'];
		
		this.modData('Learnsets', 'phanpy').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'miltank').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'eevee').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'lickitung').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'tunguru').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'snubbull').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'ursaring').learnset.hypeup = ['2L1'];

		this.modData('Learnsets', 'horatekku').learnset.bytetorment = ['2L1'];

		this.modData('Learnsets', 'chansey').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'blissey').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'cleffa').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'clefairy').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'clefable').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'slugma').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'magcargo').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'esscargoo').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'articuno').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'suicune').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'lapras').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'kamebi').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'venusaur').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'meganium').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'squirtle').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'wartortle').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'blastoise').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'natu').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'xatu').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'omanyte').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'omastar').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'cloyster').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'mewtwo').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'mew').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'hooh').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'ekans').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'arbok').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'paras').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'parasect').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'grimer').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'muk').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'koffing').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'weezing').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'skuntank').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'lickitung').learnset.expel = ['2L1'];
		this.modData('Learnsets', 'tunguru').learnset.expel = ['2L1'];
		
		this.modData('Learnsets', 'meowth').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'persian').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'kangaskhan').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'tauros').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'scyther').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'scizor').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'pinsir').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'skarmory').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'heracross').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'teddiursa').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'ursaring').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'sandshrew').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'sandslash').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'gligar').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'aroofaondo').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'raticate').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'paras').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'parasect').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'growlithe').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'arcanine').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'sneasel').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'kabuto').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'kabutops').learnset.preyingswipe = ['2L1'];
		this.modData('Learnsets', 'pierzer').learnset.preyingswipe = ['2L1'];
		
		this.modData('Learnsets', 'kingdra').learnset.draconicdrive = ['2L1'];
		this.modData('Learnsets', 'dragonite').learnset.draconicdrive = ['2L1'];
		this.modData('Learnsets', 'feraligatr').learnset.draconicdrive = ['2L1'];
		this.modData('Learnsets', 'ampharos').learnset.draconicdrive = ['2L1'];
		this.modData('Learnsets', 'gyarados').learnset.draconicdrive = ['2L1'];
		
		this.modData('Learnsets', 'gastly').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'haunter').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'gengar').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'misdreavus').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'pyronoir').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'drowzee').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'hypno').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'murkrow').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'umbreon').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'slowking').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'girafarig').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'ninetales').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'ariados').learnset.essencesteal = ['2L1'];
		this.modData('Learnsets', 'spinarak').learnset.essencesteal = ['2L1'];
		
		this.modData('Learnsets', 'kabuto').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'kabutops').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'omanyte').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'omastar').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'magcargo').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'esscargoo').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'grimer').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'muk').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'heracross').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'gligar').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'forretress').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'shellder').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'cloyster').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'lapras').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'slowbro').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'krabby').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'kingler').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'exeggcute').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'exeggutor').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'graveler').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'golem').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'koffing').learnset.softshell = ['2L1'];
		this.modData('Learnsets', 'weezing').learnset.softshell = ['2L1'];
		
		this.modData('Learnsets', 'venusaur').learnset.malnourish = ['2L1'];
		this.modData('Learnsets', 'muk').learnset.malnourish = ['2L1'];
		this.modData('Learnsets', 'tentacruel').learnset.malnourish = ['2L1'];

		this.modData('Learnsets', 'aerodactyl').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'tyranitar').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'esscargoo').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'rhydon').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'geodude').learnset.boulderrush = ['2E'];
		this.modData('Learnsets', 'graveler').learnset.boulderrush = ['2E'];
		this.modData('Learnsets', 'golem').learnset.boulderrush = ['2E'];
		this.modData('Learnsets', 'kabutops').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'omastar').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'shuckle').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'onix').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'steelix').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'snorlax').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'tauros').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'arcanine').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'donphan').learnset.boulderrush = ['2L1'];
		this.modData('Learnsets', 'kingler').learnset.boulderrush = ['2L1'];

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

		if (!sourceEffect || sourceEffect.id === 'pursuit' || sourceEffect.id === 'preyingswipe') {
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

	pokemon: {
		inherit: true,
		getStat(statName, unboosted, unmodified, fastReturn) {
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// Stat boosts.
			if (!unboosted) {
				let boost = this.boosts[statName];
				if (boost > 6) boost = 6;
				if (boost < -6) boost = -6;
				if (boost >= 0) {
					const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
					stat = Math.floor(stat * boostTable[boost]);
				} else {
					const numerators = [100, 66, 50, 40, 33, 28, 25];
					stat = Math.floor(stat * numerators[-boost] / 100);
				}
			}

			if (this.status === 'par' && statName === 'spe') {
				stat = Math.floor(stat / 4);
			}

			if (!unmodified) {
				// Burn attack drop is checked when you get the attack stat upon switch in and used until switch out.
				if (this.status === 'brn' && statName === 'atk') {
					stat = Math.floor(stat / 2);
				}
			}

			// Gen 2 caps stats at 999 and min is 1.
			stat = this.battle.clampIntRange(stat, 1, 999);
			if (fastReturn) return stat;

			// Screens
			if (!unboosted) {
				if (
					(statName === 'def' && this.side.sideConditions['reflect']) ||
					(statName === 'spd' && this.side.sideConditions['lightscreen'])
				) {
					stat *= 2;
				}
			}

			// Parry
			if (this.volatiles['parry']) {
				if (statName === 'def' || statName === 'spd') {
					stat *= 1.5;
				}
			}

			// Handle boosting items
			if (
				(['Cubone', 'Marowak'].includes(this.species.name) && this.item === 'thickclub' && statName === 'atk') ||
				(this.species.name === 'Pikachu' && this.item === 'lightball' && statName === 'spa')
			) {
				stat *= 2;
			} else if (this.species.name === 'Ditto' && this.item === 'metalpowder' && ['def', 'spd'].includes(statName)) {
				stat *= 1.5;
			}

			return stat;
		},
	}
};
