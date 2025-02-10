export const Scripts: ModdedBattleScriptsData = {
	gen: 6,
	inherit: 'gen6',
	pokemon: {
		// for neutralizing gas
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;
			if (this.getAbility().flags['cantsuppress']) return false;
			if (this.volatiles['gastroacid']) return true;
			if (this.ability === ('neutralizinggas' as ID)) return false;
			if (this.volatiles['neutralizinggas']) return true;
			return false;
		},
	},
	init() {
		for (const i in this.data.Items) {
			if (!this.data.Items[i].megaStone) continue;
			this.modData('Items', i).onTakeItem = false;
			const id = this.toID(this.data.Items[i].megaStone);
			this.modData('FormatsData', id).isNonstandard = null;
		}
		this.modData("Learnsets", "lucario").learnset.meteormash = ["6L1"];
		this.modData("Learnsets", "lucario").learnset.machpunch = ["6L1"];
		this.modData("Learnsets", "houndoom").learnset.toxicspikes = ["6L1"];
		this.modData("Learnsets", "houndoom").learnset.venoshock = ["6L1"];
		this.modData("Learnsets", "houndoom").learnset.hex = ["6L1"];
		this.modData("Learnsets", "audino").learnset.discharge = ["6L1"];
		this.modData("Learnsets", "audino").learnset.voltswitch = ["6L1"];
		this.modData("Learnsets", "audino").learnset.chargebeam = ["6L1"];
		this.modData("Learnsets", "audino").learnset.charge = ["6L1"];
		this.modData("Learnsets", "audino").learnset.zapcannon = ["6L1"];
		this.modData("Learnsets", "glalie").learnset.thunderfang = ["6L1"];
		this.modData("Learnsets", "glalie").learnset.partingshot = ["6L1"];
		this.modData("Learnsets", "glalie").learnset.boomburst = ["6L1"];
		this.modData("Learnsets", "banette").learnset.ironhead = ["6L1"];
		this.modData("Learnsets", "banette").learnset.metalsound = ["6L1"];
		this.modData("Learnsets", "banette").learnset.powder = ["6L1"];
		this.modData("Learnsets", "banette").learnset.stealthrock = ["6L1"];
		this.modData("Learnsets", "banette").learnset.defog = ["6L1"];
		this.modData("Learnsets", "venusaur").learnset.psychic = ["6L1"];
		this.modData("Learnsets", "venusaur").learnset.calmmind = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.moonblast = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.mistyterrain = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.taunt = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.drainingkiss = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.dazzlinggleam = ["6L1"];
		this.modData("Learnsets", "charizard").learnset.calmmind = ["6L1"];
		this.modData("Learnsets", "charizard").learnset.hurricane = ["6L1"];
		this.modData("Learnsets", "charizard").learnset.lavaplume = ["6L1"];
		this.modData("Learnsets", "gengar").learnset.reflecttype = ["6L1"];
		this.modData("Learnsets", "gengar").learnset.calmmind = ["6L1"];
		this.modData("Learnsets", "alakazam").learnset.blizzard = ["6L1"];
		this.modData("Learnsets", "alakazam").learnset.flashcannon = ["6L1"];
		this.modData("Learnsets", "alakazam").learnset.icebeam = ["6L1"];
		this.modData("Learnsets", "alakazam").learnset.hail = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.hail = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.megahorn = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.uturn = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.iceshard = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.iciclecrash = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.icebeam = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.blizzard = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.roost = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.iciclespear = ["6L1"];
		this.modData("Learnsets", "aerodactyl").learnset.powergem = ["6L1"];
		this.modData("Learnsets", "aerodactyl").learnset.shadowball = ["6L1"];
		this.modData("Learnsets", "aerodactyl").learnset.hurricane = ["6L1"];
		this.modData("Learnsets", "steelix").learnset.heatcrash = ["6L1"];
		this.modData("Learnsets", "steelix").learnset.rapidspin = ["6L1"];
		this.modData("Learnsets", "steelix").learnset.smackdown = ["6L1"];
		this.modData("Learnsets", "altaria").learnset.scald = ["6L1"];
		this.modData("Learnsets", "altaria").learnset.hydropump = ["6L1"];
		this.modData("Learnsets", "altaria").learnset.thunder = ["6L1"];
		this.modData("Learnsets", "sceptile").learnset.calmmind = ["6L1"];
		this.modData("Learnsets", "sceptile").learnset.sludgewave = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.sludgebomb = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.bulkup = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.toxicspikes = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.aquajet = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.gunkshot = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.poisonjab = ["6L1"];
		this.modData("Learnsets", "pidgeot").learnset.focusblast = ["6L1"];
		this.modData("Learnsets", "absol").learnset.closecombat = ["6L1"];
		this.modData("Learnsets", "absol").learnset.moonblast = ["6L1"];
		this.modData("Learnsets", "absol").learnset.moonlight = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.aurasphere = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.thunderbolt = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.closecombat = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.gunkshot = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.healingwish = ["6L1"];
		this.modData("Learnsets", "beedrill").learnset.earthquake = ["6L1"];
		this.modData("Learnsets", "beedrill").learnset.stoneedge = ["6L1"];
		this.modData("Learnsets", "beedrill").learnset.rockslide = ["6L1"];
		this.modData("Learnsets", "beedrill").learnset.smackdown = ["6L1"];
		this.modData("Learnsets", "beedrill").learnset.stealthrock = ["6L1"];
		this.modData("Learnsets", "beedrill").learnset.diamondstorm = ["6L1"];
		this.modData("Learnsets", "mawile").learnset.firepunch = ["6L1"];
		this.modData("Learnsets", "mawile").learnset.rockslide = ["6L1"];
		this.modData("Learnsets", "mawile").learnset.slackoff = ["6L1"];
		this.modData("Learnsets", "camerupt").learnset.morningsun = ["6L1"];
		this.modData("Learnsets", "abomasnow").learnset.spikyshield = ["6L1"];
		this.modData("Learnsets", "abomasnow").learnset.earthpower = ["6L1"];
		this.modData("Learnsets", "abomasnow").learnset.hornleech = ["6L1"];
		this.modData("Learnsets", "gallade").learnset.sacredsword = ["6L1"];
		this.modData("Learnsets", "gallade").learnset.machpunch = ["6L1"];
		this.modData('Moves', 'aerialace').flags.slicing = 1;
		this.modData('Moves', 'aircutter').flags.slicing = 1;
		this.modData('Moves', 'airslash').flags.slicing = 1;
		this.modData('Moves', 'behemothblade').flags.slicing = 1;
		this.modData('Moves', 'crosspoison').flags.slicing = 1;
		this.modData('Moves', 'cut').flags.slicing = 1;
		this.modData('Moves', 'furycutter').flags.slicing = 1;
		this.modData('Moves', 'nightslash').flags.slicing = 1;
		this.modData('Moves', 'psychocut').flags.slicing = 1;
		this.modData('Moves', 'razorleaf').flags.slicing = 1;
		this.modData('Moves', 'razorshell').flags.slicing = 1;
		this.modData('Moves', 'sacredsword').flags.slicing = 1;
		this.modData('Moves', 'slash').flags.slicing = 1;
		this.modData('Moves', 'solarblade').flags.slicing = 1;
		this.modData('Moves', 'xscissor').flags.slicing = 1;
		this.modData("Learnsets", "ampharos").learnset.waterpulse = ["6L1"];
		this.modData("Learnsets", "ampharos").learnset.aurasphere = ["6L1"];
		this.modData("Learnsets", "ampharos").learnset.darkpulse = ["6L1"];
		this.modData("Learnsets", "ampharos").learnset.defog = ["6L1"];
		this.modData("Learnsets", "ampharos").learnset.slackoff = ["6L1"];
		this.modData("Learnsets", "heracross").learnset.healorder = ["6L1"];
		this.modData("Learnsets", "heracross").learnset.circlethrow = ["6L1"];
		this.modData("Learnsets", "heracross").learnset.spikes = ["6L1"];
		this.modData("Learnsets", "heracross").learnset.icepunch = ["6L1"];
		this.modData("Learnsets", "sharpedo").learnset.thunder = ["6L1"];
		this.modData("Learnsets", "gardevoir").learnset.rapidspin = ["6L1"];
		this.modData("Learnsets", "gardevoir").learnset.mysticalfire = ["6L1"];
		this.modData("Learnsets", "aggron").learnset.voltswitch = ["6L1"];
		this.modData("Learnsets", "kangaskhan").learnset.milkdrink = ["6L1"];
		this.modData("Learnsets", "salamence").learnset.hurricane = ["6L1"];
		this.modData("Learnsets", "salamence").learnset.airslash = ["6L1"];
		this.modData("Learnsets", "salamence").learnset.ironhead = ["6L1"];
		this.modData("Learnsets", "tyranitar").learnset.wildcharge = ["6L1"];
		this.modData("Learnsets", "tyranitar").learnset.waterfall = ["6L1"];
		this.modData("Learnsets", "diancie").learnset.spikyshield = ["6L1"];
		this.modData("Learnsets", "blaziken").learnset.uturn = ["6L1"];
		this.modData("Learnsets", "blaziken").learnset.spikes = ["6L1"];
		this.modData("Learnsets", "blaziken").learnset.roost = ["6L1"];
		this.modData("Learnsets", "blaziken").learnset.closecombat = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.extremespeed = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.sludgewave = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.swordsdance = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.uturn = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.closecombat = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.drainpunch = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.machpunch = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.scald = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.surf = ["6L1"];
		this.modData("Learnsets", "mewtwo").learnset.hydropump = ["6L1"];
		this.modData("Learnsets", "rayquaza").learnset.coil = ["6L1"];
		this.modData("Learnsets", "rayquaza").learnset.defog = ["6L1"];
	},
	start() {
		// Deserialized games should use restart()
		if (this.deserialized) return;
		// need all players to start
		if (!this.sides.every(side => !!side)) throw new Error(`Missing sides: ${this.sides}`);

		if (this.started) throw new Error(`Battle already started`);

		const format = this.format;
		this.started = true;
		if (this.gameType === 'multi') {
			this.sides[1].foe = this.sides[2]!;
			this.sides[0].foe = this.sides[3]!;
			this.sides[2]!.foe = this.sides[1];
			this.sides[3]!.foe = this.sides[0];
			this.sides[1].allySide = this.sides[3]!;
			this.sides[0].allySide = this.sides[2]!;
			this.sides[2]!.allySide = this.sides[0];
			this.sides[3]!.allySide = this.sides[1];
			// sync side conditions
			this.sides[2]!.sideConditions = this.sides[0].sideConditions;
			this.sides[3]!.sideConditions = this.sides[1].sideConditions;
		} else {
			this.sides[1].foe = this.sides[0];
			this.sides[0].foe = this.sides[1];
			if (this.sides.length > 2) { // ffa
				this.sides[2]!.foe = this.sides[3]!;
				this.sides[3]!.foe = this.sides[2]!;
			}
		}

		for (const side of this.sides) {
			this.add('teamsize', side.id, side.pokemon.length);
		}

		this.add('gen', this.gen);

		this.add('tier', format.name);
		if (this.rated) {
			if (this.rated === 'Rated battle') this.rated = true;
			this.add('rated', typeof this.rated === 'string' ? this.rated : '');
		}

		if (format.onBegin) format.onBegin.call(this);
		for (const rule of this.ruleTable.keys()) {
			if ('+*-!'.includes(rule.charAt(0))) continue;
			const subFormat = this.dex.formats.get(rule);
			if (subFormat.onBegin) subFormat.onBegin.call(this);
		}
		for (const pokemon of this.getAllPokemon()) {
			const item = pokemon.getItem();
			if (['adamantcrystal', 'griseouscore', 'lustrousglobe', 'vilevial'].includes(item.id) &&
				item.forcedForme !== pokemon.species.name) {
				// @ts-ignore
				const rawSpecies = this.actions.getMixedSpecies(pokemon.m.originalSpecies, item.forcedForme!, pokemon);
				const species = pokemon.setSpecies(rawSpecies);
				if (!species) continue;
				pokemon.baseSpecies = rawSpecies;
				pokemon.details = species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				pokemon.ability = this.toID(species.abilities['0']);
				pokemon.baseAbility = pokemon.ability;
			}
		}

		if (this.sides.some(side => !side.pokemon[0])) {
			throw new Error('Battle not started: A player has an empty team.');
		}

		if (this.debugMode) {
			this.checkEVBalance();
		}

		if (format.onTeamPreview) format.onTeamPreview.call(this);
		for (const rule of this.ruleTable.keys()) {
			if ('+*-!'.includes(rule.charAt(0))) continue;
			const subFormat = this.dex.formats.get(rule);
			if (subFormat.onTeamPreview) subFormat.onTeamPreview.call(this);
		}

		this.queue.addChoice({choice: 'start'});
		this.midTurn = true;
		if (!this.requestState) this.go();
	},
	runAction(action) {
		const pokemonOriginalHP = action.pokemon?.hp;
		let residualPokemon: (readonly [Pokemon, number])[] = [];
		// returns whether or not we ended in a callback
		switch (action.choice) {
		case 'start': {
			for (const side of this.sides) {
				if (side.pokemonLeft) side.pokemonLeft = side.pokemon.length;
			}

			this.add('start');

			// Change Pokemon holding Rusted items into their Crowned formes
			for (const pokemon of this.getAllPokemon()) {
				let rawSpecies: Species | null = null;
				const item = pokemon.getItem();
				if (item.id === 'rustedsword') {
					// @ts-ignore
					rawSpecies = this.actions.getMixedSpecies(pokemon.m.originalSpecies, 'Zacian-Crowned', pokemon);
				} else if (item.id === 'rustedshield') {
					// @ts-ignore
					rawSpecies = this.actions.getMixedSpecies(pokemon.m.originalSpecies, 'Zamazenta-Crowned', pokemon);
				}
				if (!rawSpecies) continue;
				const species = pokemon.setSpecies(rawSpecies);
				if (!species) continue;
				pokemon.baseSpecies = rawSpecies;
				pokemon.details = species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				pokemon.ability = this.toID(species.abilities['0']);
				pokemon.baseAbility = pokemon.ability;

				const behemothMove: {[k: string]: string} = {
					'Rusted Sword': 'behemothblade', 'Rusted Shield': 'behemothbash',
				};
				const ironHead = pokemon.baseMoves.indexOf('ironhead');
				if (ironHead >= 0) {
					const move = this.dex.moves.get(behemothMove[pokemon.getItem().name]);
					pokemon.baseMoveSlots[ironHead] = {
						move: move.name,
						id: move.id,
						pp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
						maxpp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
						target: move.target,
						disabled: false,
						disabledSource: '',
						used: false,
					};
					pokemon.moveSlots = pokemon.baseMoveSlots.slice();
				}
			}

			if (this.format.onBattleStart) this.format.onBattleStart.call(this);
			for (const rule of this.ruleTable.keys()) {
				if ('+*-!'.includes(rule.charAt(0))) continue;
				const subFormat = this.dex.formats.get(rule);
				if (subFormat.onBattleStart) subFormat.onBattleStart.call(this);
			}

			for (const side of this.sides) {
				for (let i = 0; i < side.active.length; i++) {
					if (!side.pokemonLeft) {
						// forfeited before starting
						side.active[i] = side.pokemon[i];
						side.active[i].fainted = true;
						side.active[i].hp = 0;
					} else {
						this.actions.switchIn(side.pokemon[i], i);
					}
				}
			}
			for (const pokemon of this.getAllPokemon()) {
				this.singleEvent('Start', this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
			}
			this.midTurn = true;
			break;
		}

		case 'move':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.actions.runMove(action.move, action.pokemon, action.targetLoc, action.sourceEffect,
				action.zmove, undefined, action.maxMove, action.originalTarget);
			break;
		case 'megaEvo':
			this.actions.runMegaEvo(action.pokemon);
			break;
		case 'runDynamax':
			action.pokemon.addVolatile('dynamax');
			action.pokemon.side.dynamaxUsed = true;
			if (action.pokemon.side.allySide) action.pokemon.side.allySide.dynamaxUsed = true;
			break;
		case 'terastallize':
			this.actions.terastallize(action.pokemon);
			break;
		case 'beforeTurnMove':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.debug('before turn callback: ' + action.move.id);
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return false;
			if (!action.move.beforeTurnCallback) throw new Error(`beforeTurnMove has no beforeTurnCallback`);
			action.move.beforeTurnCallback.call(this, action.pokemon, target);
			break;
		case 'priorityChargeMove':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.debug('priority charge callback: ' + action.move.id);
			if (!action.move.priorityChargeCallback) throw new Error(`priorityChargeMove has no priorityChargeCallback`);
			action.move.priorityChargeCallback.call(this, action.pokemon);
			break;

		case 'event':
			this.runEvent(action.event!, action.pokemon);
			break;
		case 'team':
			if (action.index === 0) {
				action.pokemon.side.pokemon = [];
			}
			action.pokemon.side.pokemon.push(action.pokemon);
			action.pokemon.position = action.index;
			// we return here because the update event would crash since there are no active pokemon yet
			return;

		case 'pass':
			return;
		case 'instaswitch':
		case 'switch':
			if (action.choice === 'switch' && action.pokemon.status) {
				this.singleEvent('CheckShow', this.dex.abilities.getByID('naturalcure' as ID), null, action.pokemon);
			}
			if (this.actions.switchIn(action.target, action.pokemon.position, action.sourceEffect) === 'pursuitfaint') {
				// a pokemon fainted from Pursuit before it could switch
				if (this.gen <= 4) {
					// in gen 2-4, the switch still happens
					this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
					action.priority = -101;
					this.queue.unshift(action);
					break;
				} else {
					// in gen 5+, the switch is cancelled
					this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
					break;
				}
			}
			break;
		case 'revivalblessing':
			action.pokemon.side.pokemonLeft++;
			if (action.target.position < action.pokemon.side.active.length) {
				this.queue.addChoice({
					choice: 'instaswitch',
					pokemon: action.target,
					target: action.target,
				});
			}
			action.target.fainted = false;
			action.target.faintQueued = false;
			action.target.subFainted = false;
			action.target.status = '';
			action.target.hp = 1; // Needed so hp functions works
			action.target.sethp(action.target.maxhp / 2);
			this.add('-heal', action.target, action.target.getHealth, '[from] move: Revival Blessing');
			action.pokemon.side.removeSlotCondition(action.pokemon, 'revivalblessing');
			break;
		case 'runUnnerve':
			this.singleEvent('PreStart', action.pokemon.getAbility(), action.pokemon.abilityState, action.pokemon);
			break;
		case 'runSwitch':
			this.actions.runSwitch(action.pokemon);
			break;
		case 'runPrimal':
			if (!action.pokemon.transformed) {
				this.singleEvent('Primal', action.pokemon.getItem(), action.pokemon.itemState, action.pokemon);
			}
			break;
		case 'shift':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.swapPosition(action.pokemon, 1);
			break;

		case 'beforeTurn':
			this.eachEvent('BeforeTurn');
			break;
		case 'residual':
			this.add('');
			this.clearActiveMove(true);
			this.updateSpeed();
			residualPokemon = this.getAllActive().map(pokemon => [pokemon, pokemon.getUndynamaxedHP()] as const);
			this.residualEvent('Residual');
			this.add('upkeep');
			break;
		}

		// phazing (Roar, etc)
		for (const side of this.sides) {
			for (const pokemon of side.active) {
				if (pokemon.forceSwitchFlag) {
					if (pokemon.hp) this.actions.dragIn(pokemon.side, pokemon.position);
					pokemon.forceSwitchFlag = false;
				}
			}
		}

		this.clearActiveMove();

		// fainting

		this.faintMessages();
		if (this.ended) return true;

		// switching (fainted pokemon, U-turn, Baton Pass, etc)

		if (!this.queue.peek() || (this.gen <= 3 && ['move', 'residual'].includes(this.queue.peek()!.choice))) {
			// in gen 3 or earlier, switching in fainted pokemon is done after
			// every move, rather than only at the end of the turn.
			this.checkFainted();
		} else if (action.choice === 'megaEvo' && this.gen === 7) {
			this.eachEvent('Update');
			// In Gen 7, the action order is recalculated for a Pokémon that mega evolves.
			for (const [i, queuedAction] of this.queue.list.entries()) {
				if (queuedAction.pokemon === action.pokemon && queuedAction.choice === 'move') {
					this.queue.list.splice(i, 1);
					queuedAction.mega = 'done';
					this.queue.insertChoice(queuedAction, true);
					break;
				}
			}
			return false;
		} else if (this.queue.peek()?.choice === 'instaswitch') {
			return false;
		}

		if (this.gen >= 5) {
			this.eachEvent('Update');
			for (const [pokemon, originalHP] of residualPokemon) {
				const maxhp = pokemon.getUndynamaxedHP(pokemon.maxhp);
				if (pokemon.hp && pokemon.getUndynamaxedHP() <= maxhp / 2 && originalHP > maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon);
				}
			}
		}

		if (action.choice === 'runSwitch') {
			const pokemon = action.pokemon;
			if (pokemon.hp && pokemon.hp <= pokemon.maxhp / 2 && pokemonOriginalHP! > pokemon.maxhp / 2) {
				this.runEvent('EmergencyExit', pokemon);
			}
		}

		const switches = this.sides.map(
			side => side.active.some(pokemon => pokemon && !!pokemon.switchFlag)
		);

		for (let i = 0; i < this.sides.length; i++) {
			let reviveSwitch = false; // Used to ignore the fake switch for Revival Blessing
			if (switches[i] && !this.canSwitch(this.sides[i])) {
				for (const pokemon of this.sides[i].active) {
					if (this.sides[i].slotConditions[pokemon.position]['revivalblessing']) {
						reviveSwitch = true;
						continue;
					}
					pokemon.switchFlag = false;
				}
				if (!reviveSwitch) switches[i] = false;
			} else if (switches[i]) {
				for (const pokemon of this.sides[i].active) {
					if (pokemon.switchFlag && pokemon.switchFlag !== 'revivalblessing' && !pokemon.skipBeforeSwitchOutEventFlag) {
						this.runEvent('BeforeSwitchOut', pokemon);
						pokemon.skipBeforeSwitchOutEventFlag = true;
						this.faintMessages(); // Pokemon may have fainted in BeforeSwitchOut
						if (this.ended) return true;
						if (pokemon.fainted) {
							switches[i] = this.sides[i].active.some(sidePokemon => sidePokemon && !!sidePokemon.switchFlag);
						}
					}
				}
			}
		}

		for (const playerSwitch of switches) {
			if (playerSwitch) {
				this.makeRequest('switch');
				return true;
			}
		}

		if (this.gen < 5) this.eachEvent('Update');

		if (this.gen >= 8 && (this.queue.peek()?.choice === 'move' || this.queue.peek()?.choice === 'runDynamax')) {
			// In gen 8, speed is updated dynamically so update the queue's speed properties and sort it.
			this.updateSpeed();
			for (const queueAction of this.queue.list) {
				if (queueAction.pokemon) this.getActionSpeed(queueAction);
			}
			this.queue.sort();
		}

		return false;
	},
	actions: {
		// for parental bond
		modifyDamage(
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.battle.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;
			baseDamage += 2;
			if (move.spreadHit) {
				// multi-target modifier (doubles only)
				const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
				this.battle.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.battle.modify(baseDamage, spreadModifier);
			} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
				// Parental Bond modifier
				const bondModifier = this.battle.gen > 6 ? 0.25 : 0.25;
				this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
				baseDamage = this.battle.modify(baseDamage, bondModifier);
			}
			baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
			}
			baseDamage = this.battle.randomizer(baseDamage);
			if (type !== '???') {
				let stab: number | [number, number] = 1;
				const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
				if (isSTAB) {
					stab = 1.5;
				}
				if (pokemon.terastallized === 'Stellar') {
					if (!pokemon.stellarBoostedTypes.includes(type) || move.stellarBoosted) {
						stab = isSTAB ? 2 : [4915, 4096];
						move.stellarBoosted = true;
						if (pokemon.species.name !== 'Terapagos-Stellar') {
							pokemon.stellarBoostedTypes.push(type);
						}
					}
				} else {
					if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
						stab = 2;
					}
					stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, stab);
				}
				baseDamage = this.battle.modify(baseDamage, stab);
			}
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
					baseDamage = tr(baseDamage / 2);
				}
			}
			if (isCrit && !suppressMessages) this.battle.add('-crit', target);
			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
				if (this.battle.gen < 6 || move.id !== 'facade') {
					baseDamage = this.battle.modify(baseDamage, 0.5);
				}
			}
			if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;
			baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);
			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.battle.modify(baseDamage, 0.25);
				this.battle.add('-zbroken', target);
			}
			if (this.battle.gen !== 5 && !baseDamage) return 1;
			return tr(baseDamage, 16);
		},
		canMegaEvo(pokemon) {
			if (pokemon.species.isMega) return null;

			const item = pokemon.getItem();
			if (item.megaStone) {
				if (item.megaStone === pokemon.baseSpecies.name) return null;
				return item.megaStone;
			} else {
				return null;
			}
		},
		runMegaEvo(pokemon) {
			if (pokemon.species.isMega) return false;

			// @ts-ignore
			const species: Species = this.getMixedSpecies(pokemon.m.originalSpecies, pokemon.canMegaEvo, pokemon);

			// Do we have a proper sprite for it?
			if (this.dex.species.get(pokemon.canMegaEvo!).baseSpecies === pokemon.m.originalSpecies) {
				pokemon.formeChange(species, pokemon.getItem(), true);
			} else {
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				// @ts-ignore
				const oMegaSpecies = this.dex.species.get(species.originalSpecies);
				pokemon.formeChange(species, pokemon.getItem(), true);
				this.battle.add('-start', pokemon, oMegaSpecies.requiredItem, '[silent]');
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.battle.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}

			pokemon.canMegaEvo = null;
			return true;
		},
		getMixedSpecies(originalForme, megaForme, pokemon) {
			const originalSpecies = this.dex.species.get(originalForme);
			const megaSpecies = this.dex.species.get(megaForme);
			if (originalSpecies.baseSpecies === megaSpecies.baseSpecies) return megaSpecies;
			// @ts-ignore
			const deltas = this.getFormeChangeDeltas(megaSpecies, pokemon);
			// @ts-ignore
			const species = this.mutateOriginalSpecies(originalSpecies, deltas);
			return species;
		},
		getFormeChangeDeltas(formeChangeSpecies, pokemon) {
			const baseSpecies = this.dex.species.get(formeChangeSpecies.baseSpecies);
			const deltas: {
				ability: string,
				baseStats: SparseStatsTable,
				weighthg: number,
				originalSpecies: string,
				requiredItem: string | undefined,
				type?: string,
				formeType?: string,
			} = {
				ability: formeChangeSpecies.abilities['0'],
				baseStats: {},
				weighthg: formeChangeSpecies.weighthg - baseSpecies.weighthg,
				originalSpecies: formeChangeSpecies.name,
				requiredItem: formeChangeSpecies.requiredItem,
			};
			let statId: StatID;
			for (statId in formeChangeSpecies.baseStats) {
				deltas.baseStats[statId] = formeChangeSpecies.baseStats[statId] - baseSpecies.baseStats[statId];
			}
			if (formeChangeSpecies.types.length > baseSpecies.types.length) {
				deltas.type = formeChangeSpecies.types[1];
			} else if (formeChangeSpecies.types.length < baseSpecies.types.length) {
				deltas.type = 'mono';
			} else if (formeChangeSpecies.types[1] !== baseSpecies.types[1]) {
				deltas.type = formeChangeSpecies.types[1];
			}
			let formeType: string | null = null;
			if (formeChangeSpecies.isMega) formeType = 'Mega';
			if (formeChangeSpecies.isPrimal) formeType = 'Primal';
			if (formeChangeSpecies.name.endsWith('Crowned')) formeType = 'Crowned';
			if (formeType) deltas.formeType = formeType;
			if (!deltas.formeType && formeChangeSpecies.abilities['H'] &&
				pokemon && pokemon.baseSpecies.abilities['H'] === pokemon.getAbility().name) {
				deltas.ability = formeChangeSpecies.abilities['H'];
			}
			return deltas;
		},
		mutateOriginalSpecies(speciesOrForme, deltas) {
			if (!deltas) throw new TypeError("Must specify deltas!");
			const species = this.dex.deepClone(this.dex.species.get(speciesOrForme));
			species.abilities = {'0': deltas.ability};
			if (species.types[0] === deltas.type) {
				species.types = [deltas.type];
			} else if (deltas.type === 'mono') {
				species.types = [species.types[0]];
			} else if (deltas.type) {
				species.types = [species.types[0], deltas.type];
			}
			const baseStats = species.baseStats;
			for (const statName in baseStats) {
				baseStats[statName] = this.battle.clampIntRange(baseStats[statName] + deltas.baseStats[statName], 1, 255);
			}
			species.weighthg = Math.max(1, species.weighthg + deltas.weighthg);
			species.originalSpecies = deltas.originalSpecies;
			species.requiredItem = deltas.requiredItem;
			switch (deltas.formeType) {
			case 'Mega': species.isMega = true; break;
			case 'Primal': species.isPrimal = true; break;
			}
			return species;
		},
	},
};
