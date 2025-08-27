export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['SSB'],
	},
	init() {
		this.modData('Learnsets', "delibird").learnset.healingwish = ["9L1"];
		this.modData('Learnsets', "delibird").learnset.celebrate = ["9L1"];
		this.modData('Learnsets', "delibird").learnset.uturn = ["9L1"];
		this.modData('Learnsets', "delibird").learnset.roost = ["9L1"];
		this.modData('Learnsets', "delibird").learnset.wish = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.firstimpression = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.superpower = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.wildcharge = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.agility = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.breakingswipe = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.dragonbreath = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.ominouswind = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.recover = ["9L1"];
		delete this.modData('Learnsets', 'amaura').learnset.ancientpower;
		delete this.modData('Learnsets', 'amaura').learnset.aurorabeam;
		delete this.modData('Learnsets', 'amaura').learnset.auroraveil;
		delete this.modData('Learnsets', 'amaura').learnset.avalanche;
		delete this.modData('Learnsets', 'amaura').learnset.freezedry;
		delete this.modData('Learnsets', 'amaura').learnset.frostbreath;
		delete this.modData('Learnsets', 'amaura').learnset.meteorbeam;
		delete this.modData('Learnsets', 'amaura').learnset.powdersnow;
		delete this.modData('Learnsets', 'amaura').learnset.rockblast;
		delete this.modData('Learnsets', 'amaura').learnset.rockpolish;
		delete this.modData('Learnsets', 'amaura').learnset.rockslide;
		delete this.modData('Learnsets', 'amaura').learnset.rockthrow;
		delete this.modData('Learnsets', 'amaura').learnset.rocktomb;
		delete this.modData('Learnsets', 'amaura').learnset.stealthrock;
		delete this.modData('Learnsets', 'amaura').learnset.stoneedge;
		this.modData('Learnsets', "aurorus").learnset.agility = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.breakingswipe = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.dracometeor = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.dragonbreath = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.dragonpulse = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.nastyplot = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.ominouswind = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.hex = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.phantomforce = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.shadowball = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.shadowsneak = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.recover = ["9L1"];
		delete this.modData('Learnsets', 'aurorus').learnset.ancientpower;
		delete this.modData('Learnsets', 'aurorus').learnset.aurorabeam;
		delete this.modData('Learnsets', 'aurorus').learnset.auroraveil;
		delete this.modData('Learnsets', 'aurorus').learnset.avalanche;
		delete this.modData('Learnsets', 'aurorus').learnset.freezedry;
		delete this.modData('Learnsets', 'aurorus').learnset.frostbreath;
		delete this.modData('Learnsets', 'aurorus').learnset.iciclespear;
		delete this.modData('Learnsets', 'aurorus').learnset.meteorbeam;
		delete this.modData('Learnsets', 'aurorus').learnset.powdersnow;
		delete this.modData('Learnsets', 'aurorus').learnset.rockblast;
		delete this.modData('Learnsets', 'aurorus').learnset.rockpolish;
		delete this.modData('Learnsets', 'aurorus').learnset.rockslide;
		delete this.modData('Learnsets', 'aurorus').learnset.rockthrow;
		delete this.modData('Learnsets', 'aurorus').learnset.rocktomb;
		delete this.modData('Learnsets', 'aurorus').learnset.stealthrock;
		delete this.modData('Learnsets', 'aurorus').learnset.stoneedge;
		this.modData('Learnsets', "centiskorch").learnset.attract = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.bite = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.brutalswing = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.bugbite = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.bugbuzz = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.burnup = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.coil = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.crunch = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.defensecurl = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.ember = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.endure = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.facade = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.fireblast = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.firefang = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.firelash = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.firespin = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.flamewheel = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.flamethrower = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.flareblitz = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.gigaimpact = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.heatcrash = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.heatwave = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.hyperbeam = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.inferno = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.knockoff = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.leechlife = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.lunge = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.mysticalfire = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.overheat = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.powerwhip = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.protect = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.rest = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.rollout = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.round = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.scald = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.scorchingsands = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.skittersmack = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.slam = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.sleeptalk = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.smokescreen = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.snore = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.solarbeam = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.strugglebug = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.substitute = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.sunnyday = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.thunderfang = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.venoshock = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.willowisp = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.wrap = ["9L1"];
		this.modData('Learnsets', "centiskorch").learnset.xscissor = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.aquatail = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.attract = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.barrier = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.blizzard = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.bodyslam = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.bulldoze = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.calmmind = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.chargebeam = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.confide = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.darkpulse = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.discharge = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.doubleteam = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.dragontail = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.dreameater = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.earthpower = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.earthquake = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.echoedvoice = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.encore = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.endure = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.facade = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.flash = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.flashcannon = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.frustration = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.gigaimpact = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.growl = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.hail = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.haze = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.hiddenpower = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.hyperbeam = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.hypervoice = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.icebeam = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.icywind = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.irondefense = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.ironhead = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.irontail = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.lightscreen = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.magnetrise = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.mirrorcoat = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.mist = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.mudshot = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.naturepower = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.outrage = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.protect = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.psychup = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.psychic = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.raindance = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.reflect = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.rest = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.return = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.roar = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.rocksmash = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.round = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.safeguard = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.sandstorm = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.secretpower = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.sleeptalk = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.snore = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.substitute = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.swagger = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.takedown = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.thunder = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.thunderwave = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.thunderbolt = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.toxic = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.waterpulse = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.weatherball = ["9L1"];
		this.modData('Learnsets', "aurorus").learnset.zenheadbutt = ["9L1"];
		this.modData('Learnsets', "dialga").learnset.doomdesire = ["9L1"];
		this.modData('Learnsets', "dialga").learnset.teleport = ["9L1"];
		this.modData('Learnsets', "dialga").learnset.focusblast = ["9L1"];
		this.modData('Learnsets', "dialga").learnset.trick = ["9L1"];
    	this.modData('Learnsets', 'gogoat').learnset.natureswrath = ['9M'];
   	this.modData('Learnsets', 'gogoat').learnset.golemstrike = ['9L1'];
	   this.modData('Learnsets', 'gogoat').learnset.stealthrock = ['9L1'];
	   this.modData('Learnsets', 'gogoat').learnset.swordsdance = ['9L1'];
	   this.modData('Learnsets', 'gogoat').learnset.stoneedge = ['9L1'];
	   this.modData('Learnsets', 'gyarados').learnset.acrobatics = ['9L1'];
	   this.modData('Learnsets', 'gyarados').learnset.ragingtorrent = ['9L1'];
	   this.modData('Learnsets', 'dhelmise').learnset.wavecrash = ['9L1'];
	   this.modData('Learnsets', 'dhelmise').learnset.waterfall = ['9L1'];
	},
	pokemon: {
		inherit: true,
	  	lostItemForDelibird: null,
	  	setItem(item: string | Item, source?: Pokemon, effect?: Effect) {
	  		if (!this.hp) return false;
	  		if (this.itemState.knockedOff) return false;
	  		if (typeof item === 'string') item = this.battle.dex.items.get(item);
	  
	  		const effectid = this.battle.effect ? this.battle.effect.id : '';
	  		const RESTORATIVE_BERRIES = new Set([
	  			'leppaberry', 'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry',
	  		] as ID[]); // manually pasted in const RESTORATIVE_BERRIES because its absence caused a bug
	  		if (RESTORATIVE_BERRIES.has('leppaberry' as ID)) {
	  			const inflicted = ['trick', 'switcheroo'].includes(effectid);
	  			const external = inflicted && source && !source.isAlly(this);
	  			this.pendingStaleness = external ? 'external' : 'internal';
	  		} else {
	  			this.pendingStaleness = undefined;
	  		}
	  		const oldItem = this.getItem();
	  		const oldItemState = this.itemState;
	  		this.item = item.id;
	  		this.itemState = {id: item.id, target: this};
	  		if (oldItem.exists) this.battle.singleEvent('End', oldItem, oldItemState, this);
	  		if (item.id) {
	  			this.battle.singleEvent('Start', item, this.itemState, this, source, effect);
	  		}
	  		return true;
  		},
		getDynamaxRequest(skipChecks?: boolean) {
			// {gigantamax?: string, maxMoves: {[k: string]: string} | null}[]
			if (!skipChecks) {
				if (!this.side.canDynamaxNow()) return;
				if (
					this.species.isMega || this.species.isPrimal || this.species.forme === "Ultra" || this.canMegaEvo || this.item !== 'wishingstone'
				) {
					return;
				}
				// Some pokemon species are unable to dynamax
				if (this.species.cannotDynamax || this.illusion?.species.cannotDynamax) return;
			}
			const result: DynamaxOptions = {maxMoves: []};
			let atLeastOne = false;
			for (const moveSlot of this.moveSlots) {
				const move = this.battle.dex.moves.get(moveSlot.id);
				const maxMove = this.battle.actions.getMaxMove(move, this);
				if (maxMove) {
					if (this.maxMoveDisabled(move)) {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target, disabled: true});
					} else {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target});
						atLeastOne = true;
					}
				}
			}
			if (!atLeastOne) return;
			if (this.canGigantamax) result.gigantamax = this.canGigantamax;
			return result;
		},
	},
	side: {
		inherit: true,
		constructor(name: string, battle: Battle, sideNum: number, team: PokemonSet[]) {
			const sideScripts = battle.dex.data.Scripts.side;
			if (sideScripts) Object.assign(this, sideScripts);
	
			this.battle = battle;
			this.id = ['p1', 'p2', 'p3', 'p4'][sideNum] as SideID;
			this.n = sideNum;
	
			this.name = name;
			this.avatar = '';
	
			this.team = team;
			this.pokemon = [];
			for (let i = 0; i < this.team.length && i < 24; i++) {
				// console.log("NEW POKEMON: " + (this.team[i] ? this.team[i].name : '[unidentified]'));
				this.pokemon.push(new Pokemon(this.team[i], this));
				this.pokemon[i].position = i;
			}
	
			switch (this.battle.gameType) {
			case 'doubles':
				this.active = [null!, null!];
				break;
			case 'triples': case 'rotation':
				this.active = [null!, null!, null!];
				break;
			default:
				this.active = [null!];
			}
	
			this.pokemonLeft = this.pokemon.length;
			this.faintedLastTurn = null;
			this.faintedThisTurn = null;
			this.totalFainted = 0;
			this.zMoveUsed = false;
			this.dynamaxUsed = false;
	
			this.sideConditions = {};
			this.slotConditions = [];
			// Array#fill doesn't work for this
			for (let i = 0; i < this.active.length; i++) this.slotConditions[i] = {};
	
			this.activeRequest = null;
			this.choice = {
				cantUndo: false,
				error: ``,
				actions: [],
				forcedSwitchesLeft: 0,
				forcedPassesLeft: 0,
				switchIns: new Set(),
				zMove: false,
				mega: false,
				ultra: false,
				terastallize: false,
				dynamax: false,
			};
	
			// old-gens
			this.lastMove = null;
			
			//fishing tokens?
			this.fishingTokens = 0;
		},
		getChoice() {
			if (this.choice.actions.length > 1 && this.choice.actions.every(action => action.choice === 'team')) {
				return `team ` + this.choice.actions.map(action => action.pokemon!.position + 1).join(', ');
			}
			return this.choice.actions.map(action => {
				switch (action.choice) {
				case 'move':
					let details = ``;
					if (action.targetLoc && this.active.length > 1) details += ` ${action.targetLoc > 0 ? '+' : ''}${action.targetLoc}`;
					if (action.mega) details += (action.pokemon!.item === 'ultranecroziumz' ? ` ultra` : ` mega`);
					if (action.zmove) details += ` zmove`;
					if (action.maxMove) details += ` dynamax`;
					if (action.terastallize) details += ` terastallize`;
					return `move ${action.moveid}${details}`;
				case 'switch':
				case 'instaswitch':
				case 'revivalblessing':
				case 'epicbeam':
					return `switch ${action.target!.position + 1}`;
				case 'team':
					return `team ${action.pokemon!.position + 1}`;
				default:
					return action.choice;
				}
			}).join(', ');
		},
		chooseSwitch(slotText?: string) {
			if (this.requestState !== 'move' && this.requestState !== 'switch') {
				return this.emitChoiceError(`Can't switch: You need a ${this.requestState} response`);
			}
			const index = this.getChoiceIndex();
			if (index >= this.active.length) {
				if (this.requestState === 'switch') {
					return this.emitChoiceError(`Can't switch: You sent more switches than Pokémon that need to switch`);
				}
				return this.emitChoiceError(`Can't switch: You sent more choices than unfainted Pokémon`);
			}
			const pokemon = this.active[index];
			let slot;
			if (!slotText) {
				if (this.requestState !== 'switch') {
					return this.emitChoiceError(`Can't switch: You need to select a Pokémon to switch in`);
				}
				if (this.slotConditions[pokemon.position]['revivalblessing']) {
					slot = 0;
					while (!this.pokemon[slot].fainted) slot++;
				} else if (this.slotConditions[pokemon.position]['epicbeam']) {
					slot = 0;
					while (this.pokemon[slot].fainted) slot++;
				} else {
					if (!this.choice.forcedSwitchesLeft) return this.choosePass();
					slot = this.active.length;
					while (this.choice.switchIns.has(slot) || this.pokemon[slot].fainted) slot++;
				}
			} else {
				slot = parseInt(slotText) - 1;
			}
			if (isNaN(slot) || slot < 0) {
				// maybe it's a name/species id!
				slot = -1;
				for (const [i, mon] of this.pokemon.entries()) {
					if (slotText!.toLowerCase() === mon.name.toLowerCase() || toID(slotText) === mon.species.id) {
						slot = i;
						break;
					}
				}
				if (slot < 0) {
					return this.emitChoiceError(`Can't switch: You do not have a Pokémon named "${slotText}" to switch to`);
				}
			}
			if (slot >= this.pokemon.length) {
				return this.emitChoiceError(`Can't switch: You do not have a Pokémon in slot ${slot + 1} to switch to`);
			} else if (slot < this.active.length && !this.slotConditions[pokemon.position]['revivalblessing']) {
				return this.emitChoiceError(`Can't switch: You can't switch to an active Pokémon`);
			} else if (slot < this.active.length && !this.slotConditions[pokemon.position]['epicbeam']) {
				return this.emitChoiceError(`Can't switch: You can't switch to an active Pokémon`);
			} else if (this.choice.switchIns.has(slot)) {
				return this.emitChoiceError(`Can't switch: The Pokémon in slot ${slot + 1} can only switch in once`);
			}
			const targetPokemon = this.pokemon[slot];

			//console.log("pokemon: " + pokemon.baseSpecies + "\ntargetPokemon: " + targetPokemon.baseSpecies + "\nindex: " + index + "\nslot: " + slot + "\npokemon.position: " + pokemon.position);
			if (this.slotConditions[pokemon.position]['revivalblessing']) {
				if (!targetPokemon.fainted) {
					return this.emitChoiceError(`Can't switch: You have to pass to a fainted Pokémon`);
				}
				// Should always subtract, but stop at 0 to prevent errors.
				this.choice.forcedSwitchesLeft = this.battle.clampIntRange(this.choice.forcedSwitchesLeft - 1, 0);
				pokemon.switchFlag = false;
				this.choice.actions.push({
					choice: 'revivalblessing',
					pokemon,
					target: targetPokemon,
				} as ChosenAction);
				return true;
			}
			
			if (this.slotConditions[pokemon.position]['epicbeam']) {
				if (targetPokemon.fainted) {
					return this.emitChoiceError(`Can't switch: You have to sacrifice an unfainted Pokémon`);
				}
				// Should always subtract, but stop at 0 to prevent errors.
				this.choice.forcedSwitchesLeft = this.battle.clampIntRange(this.choice.forcedSwitchesLeft - 1, 0);
				pokemon.switchFlag = false;
				this.battle.faint(targetPokemon, targetPokemon, this.battle.dex.moves.get('epicbeam'));
				this.choice.actions.push({
					choice: 'epicbeam',
					pokemon,
					target: targetPokemon,
				} as ChosenAction);
				return true;
			}

			if (targetPokemon.fainted) {
				return this.emitChoiceError(`Can't switch: You can't switch to a fainted Pokémon`);
			}

			if (this.requestState === 'move') {
				if (pokemon.trapped) {
					const includeRequest = this.updateRequestForPokemon(pokemon, req => {
						let updated = false;
						if (req.maybeTrapped) {
							delete req.maybeTrapped;
							updated = true;
						}
						if (!req.trapped) {
							req.trapped = true;
							updated = true;
						}
						return updated;
					});
					const status = this.emitChoiceError(`Can't switch: The active Pokémon is trapped`, includeRequest);
					if (includeRequest) this.emitRequest(this.activeRequest!);
					return status;
				} else if (pokemon.maybeTrapped) {
					this.choice.cantUndo = this.choice.cantUndo || pokemon.isLastActive();
				}
			} else if (this.requestState === 'switch') {
				if (!this.choice.forcedSwitchesLeft) {
					throw new Error(`Player somehow switched too many Pokemon`);
				}
				this.choice.forcedSwitchesLeft--;
			}

			this.choice.switchIns.add(slot);

			this.choice.actions.push({
				choice: (this.requestState === 'switch' ? 'instaswitch' : 'switch'),
				pokemon,
				target: targetPokemon,
			} as ChosenAction);

			return true;
		},
		canDynamaxNow(): boolean {
			if (this.battle.gen === 9) return false;
			return true;
		},
		addFishingTokens(amount: number) {
			if (amount === 0 || Number.isNaN(amount)) return false;
			if(this.fishingTokens === undefined) this.fishingTokens = 0;
			this.fishingTokens += amount;
			const word = (amount === 1) ? 'token was' : 'tokens were';
			this.battle.add('-message', `${amount} fishing ${word} added to ${this.name}'s side!`);
			this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
		},
		removeFishingTokens(amount: number) {
			if (this.fishingTokens === undefined) this.fishingTokens = 0;
			if (amount === 0 || Number.isNaN(amount) || amount > this.fishingTokens) return false;
			this.fishingTokens -= amount;
			const word = (amount === 1) ? 'token was' : 'tokens were';
			this.battle.add('-message', `${amount} fishing ${word} removed from ${this.name}'s side!`);
			this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
			if (this.battle.field.isWeather('acidrain')) this.removeFishingToken();
			return true;
		},
		removeFishingToken() {
			if (this.fishingTokens === undefined) this.fishingTokens = 0;
			if (this.fishingTokens < 1) return false;
			this.fishingTokens -= 1;
			this.battle.add('-message', `1 fishing token was removed from ${this.name}'s side!`);
			this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
			return true;
		},
	},
	actions: {
		inherit: true,
		canTerastallize(pokemon: Pokemon) {
			if (pokemon.getItem().zMove || pokemon.canMegaEvo ||
				this.dex.gen !== 9 || pokemon.volatiles['bigbutton'] || pokemon.hasItem('wishingstone')) {
				return null;
			}
			return pokemon.teraType;
		},
		terastallize(pokemon: Pokemon) {
			if (pokemon.volatiles['bigbutton']) return;
			if (pokemon.illusion && ['Ogerpon', 'Terapagos'].includes(pokemon.illusion.species.baseSpecies)) {
				this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
			}

			let type = pokemon.teraType;
			if (pokemon.set.ability === 'I Love Fishing') {
				type = 'Water';
			}
			if (pokemon.set.ability === 'Racer\'s Spirit') {
				type = 'Steel';
			}
			if (['Zapdos', 'Big Crammer'].includes(pokemon.species.name) && pokemon.teraType !== 'Bug') {
				pokemon.addVolatile('bigbutton');
				return;
			}
			this.battle.add('-terastallize', pokemon, type);
			pokemon.terastallized = type;
			for (const ally of pokemon.side.pokemon) {
				ally.canTerastallize = null;
			}
			pokemon.addedType = '';
			pokemon.knownType = true;
			pokemon.apparentType = type;
			if (pokemon.species.baseSpecies === 'Ogerpon') {
				const tera = pokemon.species.id === 'ogerpon' ? 'tealtera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.name === 'Terapagos-Terastal' && type === 'Stellar') {
				pokemon.formeChange('Terapagos-Stellar', null, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
			this.battle.runEvent('AfterTerastallization', pokemon);
		},
		getActiveMaxMove(move: Move, pokemon: Pokemon) {
			if (typeof move === 'string') move = this.dex.getActiveMove(move);
			if (move.name === 'Struggle') return this.dex.getActiveMove(move);
			let maxMove = this.dex.getActiveMove(this.MAX_MOVES[move.category === 'Status' ? move.category : move.type]);
			if (move.category !== 'Status') {
				if (pokemon.gigantamax && pokemon.canGigantamax) {
					const gMaxMove = this.dex.getActiveMove(pokemon.canGigantamax);
					if (gMaxMove.exists) { 
						if ((move.name === 'Drum Beating' && pokemon.baseSpecies.baseSpecies === 'Rillaboom') ||
							(move.name === 'Frenzy Plant' && pokemon.baseSpecies.baseSpecies === 'Venusaur') ||
							(move.name === 'Blast Burn' && pokemon.baseSpecies.baseSpecies === 'Charizard') ||
							(move.name === 'Hydro Cannon' && pokemon.baseSpecies.baseSpecies === 'Blastoise') ||
							(move.name === 'Pollen Puff' && pokemon.baseSpecies.baseSpecies === 'Butterfree') ||
							(move.name === 'Volt Tackle' && pokemon.baseSpecies.baseSpecies === 'Pikachu') ||
							(move.name === 'Pay Day' && pokemon.baseSpecies.baseSpecies === 'Meowth') ||
							(move.name === 'Dynamic Punch' && pokemon.baseSpecies.baseSpecies === 'Machamp') ||
							(move.name === 'Shadow Ball' && pokemon.baseSpecies.baseSpecies === 'Gengar') ||
							(move.name === 'Crabhammer' && pokemon.baseSpecies.baseSpecies === 'Kingler') ||
							(move.name === 'Freeze-Dry' && pokemon.baseSpecies.baseSpecies === 'Lapras') ||
							(move.name === 'Last Resort' && pokemon.baseSpecies.baseSpecies === 'Eevee') ||
							(move.name === 'Body Slam' && pokemon.baseSpecies.baseSpecies === 'Snorlax') ||
							(move.name === 'Gunk Shot' && pokemon.baseSpecies.baseSpecies === 'Garbodor') ||
							(move.name === 'Double Iron Bash' && pokemon.baseSpecies.baseSpecies === 'Melmetal') ||
							(move.name === 'Pyro Ball' && pokemon.baseSpecies.baseSpecies === 'Cinderace') ||
							(move.name === 'Snipe Shot' && pokemon.baseSpecies.baseSpecies === 'Inteleon') ||
							(move.name === 'Brave Bird' && pokemon.baseSpecies.baseSpecies === 'Corviknight') ||
							(move.name === 'Psychic' && pokemon.baseSpecies.baseSpecies === 'Orbeetle') ||
							(move.name === 'Razor Shell' && pokemon.baseSpecies.baseSpecies === 'Drednaw') || 
							(move.name === 'Tar Shot' && pokemon.baseSpecies.baseSpecies === 'Coalossal') ||
							(move.name === 'Grav Apple' && pokemon.baseSpecies.baseSpecies === 'Flapple') ||
							(move.name === 'Apple Acid' && pokemon.baseSpecies.baseSpecies === 'Appletun') ||
							(move.name === 'Sand Tomb' && pokemon.baseSpecies.baseSpecies === 'Sandaconda') ||
							(move.name === 'Fire Lash' && pokemon.baseSpecies.baseSpecies === 'Centiskorch') ||
							(move.name === 'Overdrive' && pokemon.baseSpecies.baseSpecies === 'Toxtricity') ||
							(move.name === 'Dazzling Gleam' && pokemon.baseSpecies.baseSpecies === 'Hatterene') ||
							(move.name === 'False Surrender' && pokemon.baseSpecies.baseSpecies === 'Grimmsnarl') ||
							(move.name === 'Draining Kiss' && pokemon.baseSpecies.baseSpecies === 'Alcremie') ||
							(move.name === 'Heavy Slam' && pokemon.baseSpecies.baseSpecies === 'Copperajah') ||
							(move.name === 'Draco Meteor' && pokemon.baseSpecies.baseSpecies === 'Duraludon') ||
							(move.name === 'Wicked Blow' && pokemon.baseSpecies.baseSpecies === 'Urshifu') ||
							(move.name === 'Surging Strikes' && pokemon.baseSpecies.baseSpecies === 'Urshifu')) maxMove = gMaxMove;
					}
				}
				if (!move.maxMove?.basePower) throw new Error(`${move.name} doesn't have a maxMove basePower`);
				if (!['gmaxdrumsolo', 'gmaxfireball', 'gmaxhydrosnipe', 'gmaxwindrage',
					  'gmaxbefuddle', 'gmaxcannonade', 'gmaxcentiferno', 'gmaxchistrike',
					  'gmaxcuddle', 'gmaxdepletion', 'gmaxfinale', 'gmaxfoamburst',
					  'gmaxgoldrush', 'gmaxgravitas', 'gmaxmalodor', 'gmaxmeltdown',
					  'gmaxoneblow', 'gmaxrapidflow', 'gmaxreplenish', 'gmaxresonance',
					  'gmaxsandblast', 'gmaxsmite', 'gmaxsnooze', 'gmaxsteelsurge',
					  'gmaxterror', 'gmaxvinelash', 'gmaxvolcalith', 'gmaxvoltcrash', 'gmaxwildfire',
					  'gmaxstonesurge', 'gmaxstunshock', 'gmaxsweetness', 'gmaxtartness'].includes(maxMove.id)) {
					maxMove.basePower = move.maxMove.basePower;
				}
				maxMove.category = move.category;
			}
			let maxNewPower = this.newMaxPower(move); // new max power
			maxMove.basePower = maxNewPower; // bypass old max power
			maxMove.baseMove = move.id;
			// copy the priority for Psychic Terrain, Quick Guard
			maxMove.priority = move.priority;
			maxMove.isZOrMaxPowered = true;
			return maxMove;
		},
		newMaxPower(move){
			let oldMaxPowers = [0, 90, 100, 110, 120, 130, 140, 150];
			let oldweakMaxPowers = [0, 70, 75, 80, 85, 90, 95, 100];
			let weakMaxPowers = [0, 60, 65, 70, 75, 80, 85, 90];
			let maxPowers = [0, 70, 80, 90, 100, 110, 120, 130];
			let maxNewPower = 110;
			if (!move.basePower) {
				return maxNewPower;
			} else if (!move.maxMove?.basePower){
				return null;
			} else if (['Fighting', 'Poison'].includes(move.type)) {
				for (const i in oldweakMaxPowers){
					if (move.maxMove?.basePower === oldweakMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else if (['Flying'].includes(move.type)) {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = maxPowers[i]
						break
					}
				}
			}
			return maxNewPower;
		},
		hitStepInvulnerabilityEvent(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
			if (move.id === 'helpinghand') return new Array(targets.length).fill(true);
			const hitResults: boolean[] = [];
			for (const [i, target] of targets.entries()) {
				if (target && target.volatiles['commanding']) {
					hitResults[i] = false;
				} else if (this.battle.gen >= 8 && move.id === 'toxic' && pokemon.hasType('Poison')) {
					hitResults[i] = true;
				} else {
					hitResults[i] = this.battle.runEvent('Invulnerability', target, pokemon, move);
				}
				if (hitResults[i] === false) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
				}
			}
			return hitResults;
		},
		getZMove(move: Move, pokemon: Pokemon, skipChecks?: boolean): string | undefined {
			const Z_MOVES: {readonly [k: string]: string} = {
				Poison: "Acid Downpour",
				Fighting: "All-Out Pummeling",
				Dark: "Black Hole Eclipse",
				Grass: "Bloom Doom",
				Normal: "Breakneck Blitz",
				Rock: "Continental Crush",
				Steel: "Corkscrew Crash",
				Dragon: "Devastating Drake",
				Electric: "Gigavolt Havoc",
				Water: "Hydro Vortex",
				Fire: "Inferno Overdrive",
				Ghost: "Never-Ending Nightmare",
				Bug: "Savage Spin-Out",
				Psychic: "Shattered Psyche",
				Ice: "Subzero Slammer",
				Flying: "Supersonic Skystrike",
				Ground: "Tectonic Rage",
				Fairy: "Twinkle Tackle",
				Stellar: "Tera Triple Basedball Barrage",
			};
			const item = pokemon.getItem();
			if (!skipChecks) {
				if (pokemon.side.zMoveUsed) return;
				if (!item.zMove) return;
				if (item.itemUser && !item.itemUser.includes(pokemon.species.name)) return;
				const moveData = pokemon.getMoveData(move);
				// Draining the PP of the base move prevents the corresponding Z-move from being used.
				if (!moveData?.pp) return;
			}

			if (item.zMoveFrom) {
				if (move.name === item.zMoveFrom) return item.zMove as string;
			} else if (item.zMove === true) {
				if (move.type === item.zMoveType || item.name === 'Stellarium Z') {
					if (move.category === "Status") {
						return move.name;
					} else if (move.zMove?.basePower) {
						if (item.name === 'Stellarium Z') return "Tera Triple Basedball Barrage";
						else return Z_MOVES[move.type];
					}
				}
			}
		},
		getActiveZMove(move: Move, pokemon: Pokemon): ActiveMove {
			const Z_MOVES: {readonly [k: string]: string} = {
				Poison: "Acid Downpour",
				Fighting: "All-Out Pummeling",
				Dark: "Black Hole Eclipse",
				Grass: "Bloom Doom",
				Normal: "Breakneck Blitz",
				Rock: "Continental Crush",
				Steel: "Corkscrew Crash",
				Dragon: "Devastating Drake",
				Electric: "Gigavolt Havoc",
				Water: "Hydro Vortex",
				Fire: "Inferno Overdrive",
				Ghost: "Never-Ending Nightmare",
				Bug: "Savage Spin-Out",
				Psychic: "Shattered Psyche",
				Ice: "Subzero Slammer",
				Flying: "Supersonic Skystrike",
				Ground: "Tectonic Rage",
				Fairy: "Twinkle Tackle",
				Stellar: "Tera Triple Basedball Barrage",
			};
			let item;
			if (pokemon) {
				item = pokemon.getItem();
				if (move.name === item.zMoveFrom) {
					const zMove = this.dex.getActiveMove(item.zMove as string);
					zMove.isZOrMaxPowered = true;
					return zMove;
				}
			}

			if (move.category === 'Status') {
				const zMove = this.dex.getActiveMove(move);
				zMove.isZ = true;
				zMove.isZOrMaxPowered = true;
				return zMove;
			}
			let zMove = this.dex.getActiveMove(Z_MOVES[move.type]);
			if(item && item.name === 'Stellarium Z') zMove = this.dex.getActiveMove("Tera Triple Basedball Barrage");
			zMove.basePower = move.zMove!.basePower!;
			zMove.category = move.category;
			// copy the priority for Quick Guard
			zMove.priority = move.priority;
			zMove.isZOrMaxPowered = true;
			return zMove;
		},
		canZMove(pokemon: Pokemon) {
			if (pokemon.side.zMoveUsed ||
				(pokemon.transformed &&
					(pokemon.species.isMega || pokemon.species.isPrimal || pokemon.species.forme === "Ultra"))
			) return;
			const item = pokemon.getItem();
			if (!item.zMove) return;
			if (item.itemUser && !item.itemUser.includes(pokemon.species.name)) return;
			let atLeastOne = false;
			let mustStruggle = true;
			const zMoves: ZMoveOptions = [];
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.pp <= 0) {
					zMoves.push(null);
					continue;
				}
				if (!moveSlot.disabled) {
					mustStruggle = false;
				}
				const move = this.dex.moves.get(moveSlot.move);
				let zMoveName = this.getZMove(move, pokemon, true) || '';
				if (zMoveName) {
					const zMove = this.dex.moves.get(zMoveName);
					if (!zMove.isZ && zMove.category === 'Status') zMoveName = "Z-" + zMoveName;
					zMoves.push({move: zMoveName, target: zMove.target});
				} else {
					zMoves.push(null);
				}
				if (zMoveName) atLeastOne = true;
			}
			if (atLeastOne && !mustStruggle) return zMoves;
		},
	},
	battle: {
		runAction(action: Action) {
			const pokemonOriginalHP = action.pokemon?.hp;
			let residualPokemon: (readonly [Pokemon, number])[] = [];
			console.log(action);
			// returns whether or not we ended in a callback
			switch (action.choice) {
			case 'start': {
				for (const side of this.sides) {
					if (side.pokemonLeft) side.pokemonLeft = side.pokemon.length;
				}

				this.add('start');

				// Change Zacian/Zamazenta into their Crowned formes
				for (const pokemon of this.getAllPokemon()) {
					let rawSpecies: Species | null = null;
					if (pokemon.species.id === 'zacian' && pokemon.item === 'rustedsword') {
						rawSpecies = this.dex.species.get('Zacian-Crowned');
					} else if (pokemon.species.id === 'zamazenta' && pokemon.item === 'rustedshield') {
						rawSpecies = this.dex.species.get('Zamazenta-Crowned');
					}
					if (!rawSpecies) continue;
					const species = pokemon.setSpecies(rawSpecies);
					if (!species) continue;
					pokemon.baseSpecies = rawSpecies;
					pokemon.details = species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
						(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
					pokemon.setAbility(species.abilities['0'], null, true);
					pokemon.baseAbility = pokemon.ability;

					const behemothMove: {[k: string]: string} = {
						'Zacian-Crowned': 'behemothblade', 'Zamazenta-Crowned': 'behemothbash',
					};
					const ironHead = pokemon.baseMoves.indexOf('ironhead');
					if (ironHead >= 0) {
						const move = this.dex.moves.get(behemothMove[rawSpecies.name]);
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
			case 'megaEvoX':
				this.actions.runMegaEvoX?.(action.pokemon);
				break;
			case 'megaEvoY':
				this.actions.runMegaEvoY?.(action.pokemon);
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
			case 'epicbeam':
				console.log("runaction: " + action.target.position + " " + action.pokemon.side.active.length);
				action.pokemon.side.pokemonLeft--;
				if (action.target.position < action.pokemon.side.active.length) {
					this.queue.addChoice({
						choice: 'instaswitch',
						pokemon: action.target,
						target: action.target,
					});
				}
				action.target.fainted = true;
				this.add('-faint', action.target, '[from] move: Epic Beam');
				action.pokemon.side.removeSlotCondition(action.pokemon, 'epicbeam');
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
			} else if (['megaEvo', 'megaEvoX', 'megaEvoY'].includes(action.choice) && this.gen === 7) {
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
						if (pokemon.hp && pokemon.switchFlag && pokemon.switchFlag !== 'revivalblessing' &&
								!pokemon.skipBeforeSwitchOutEventFlag) {
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
		heal(damage: number, target?: Pokemon, source: Pokemon | null = null, effect: 'drain' | Effect | null = null) {
			if (this.event) {
				target ||= this.event.target;
				source ||= this.event.source;
				effect ||= this.effect;
			}
			if (effect === 'drain') effect = this.dex.conditions.getByID(effect as ID);
			if (damage && damage <= 1) damage = 1;
			damage = this.trunc(damage);
			// for things like Liquid Ooze, the Heal event still happens when nothing is healed.
			damage = this.runEvent('TryHeal', target, source, effect, damage);
			if (!damage) return damage;
			if (!target?.hp) return false;
			if (!target.isActive) return false;
			if (target.hp >= target.maxhp) return false;
			const finalDamage = target.heal(damage, source, effect);
			switch (effect?.id) {
			case 'leechseed':
			case 'rest':
				this.add('-heal', target, target.getHealth, '[silent]');
				break;
			case 'drain':
				this.add('-heal', target, target.getHealth, '[from] drain', '[of] ' + source);
				break;
			case 'wish':
				break;
			case 'zpower':
				this.add('-heal', target, target.getHealth, '[zeffect]');
				break;
			default:
				if (!effect) break;
				if (effect.effectType === 'Move') {
					this.add('-heal', target, target.getHealth);
				} else if (source && source !== target) {
					this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname, '[of] ' + source);
				} else {
					this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname);
				}
				break;
			}
			this.runEvent('Heal', target, source, effect, finalDamage);
			target.addVolatile('healed');
			return finalDamage;
		},
	},
};
