export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['DAF'],
		customDoublesTiers: ['DAF'],
	},
	
	// set types
	pokemon: {
		inherit: true,
		constructor(set: string | AnyObject, side: Side) {
			this.side = side;
			this.battle = side.battle;

			this.m = {};

			const pokemonScripts = this.battle.format.pokemon || this.battle.dex.data.Scripts.pokemon;
			if (pokemonScripts) Object.assign(this, pokemonScripts);

			if (typeof set === 'string') set = {name: set};

			this.baseSpecies = this.battle.dex.species.get(set.species || set.name);
			if (!this.baseSpecies.exists) {
				throw new Error(`Unidentified species: ${this.baseSpecies.name}`);
			}
			this.set = set as PokemonSet;

			this.species = this.baseSpecies;
			if (set.name === set.species || !set.name) {
				set.name = this.baseSpecies.baseSpecies;
			}
			this.speciesState = {id: this.species.id};

			this.name = set.name.substr(0, 20);
			this.fullname = this.side.id + ': ' + this.name;

			set.level = this.battle.clampIntRange(set.adjustLevel || set.level || 100, 1, 9999);
			this.level = set.level;
			const genders: {[key: string]: GenderName} = {M: 'M', F: 'F', N: 'N'};
			this.gender = genders[set.gender] || this.species.gender || (this.battle.random() * 2 < 1 ? 'M' : 'F');
			if (this.gender === 'N') this.gender = '';
			this.happiness = typeof set.happiness === 'number' ? this.battle.clampIntRange(set.happiness, 0, 255) : 255;
			this.pokeball = this.set.pokeball || 'pokeball';
			this.dynamaxLevel = typeof set.dynamaxLevel === 'number' ? this.battle.clampIntRange(set.dynamaxLevel, 0, 10) : 10;
			this.gigantamax = this.set.gigantamax || false;

			this.baseMoveSlots = [];
			this.moveSlots = [];
			if (!this.set.moves?.length) {
				throw new Error(`Set ${this.name} has no moves`);
			}
			for (const moveid of this.set.moves) {
				let move = this.battle.dex.moves.get(moveid);
				if (!move.id) continue;
				if (move.id === 'hiddenpower' && move.type !== 'Normal') {
					if (!set.hpType) set.hpType = move.type;
					move = this.battle.dex.moves.get('hiddenpower');
				}
				let basepp = (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5;
				if (this.battle.gen < 3) basepp = Math.min(61, basepp);
				this.baseMoveSlots.push({
					move: move.name,
					id: move.id,
					pp: basepp,
					maxpp: basepp,
					target: move.target,
					disabled: false,
					disabledSource: '',
					used: false,
				});
			}

			this.position = 0;
			let displayedSpeciesName = this.species.name;
			if (displayedSpeciesName === 'Greninja-Bond') displayedSpeciesName = 'Greninja';
			this.details = displayedSpeciesName + (this.level === 100 ? '' : ', L' + this.level) +
				(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');

			this.status = '';
			this.statusState = {};
			this.volatiles = {};
			this.showCure = undefined;

			if (!this.set.evs) {
				this.set.evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			}
			if (!this.set.ivs) {
				this.set.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
			}
			const stats: StatsTable = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
			let stat: StatID;
			for (stat in stats) {
				if (!this.set.evs[stat]) this.set.evs[stat] = 0;
				if (!this.set.ivs[stat] && this.set.ivs[stat] !== 0) this.set.ivs[stat] = 31;
			}
			for (stat in this.set.evs) {
				this.set.evs[stat] = this.battle.clampIntRange(this.set.evs[stat], 0, 255);
			}
			for (stat in this.set.ivs) {
				this.set.ivs[stat] = this.battle.clampIntRange(this.set.ivs[stat], 0, 31);
			}
			if (this.battle.gen && this.battle.gen <= 2) {
				// We represent DVs using even IVs. Ensure they are in fact even.
				for (stat in this.set.ivs) {
					this.set.ivs[stat] &= 30;
				}
			}			

			const hpData = this.battle.dex.getHiddenPower(this.set.ivs);
			this.hpType = set.hpType || hpData.type;
			this.hpPower = hpData.power;

			this.baseHpType = this.hpType;
			this.baseHpPower = this.hpPower;

			// initialized in this.setSpecies(this.baseSpecies)
			this.baseStoredStats = null!;
			this.storedStats = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			this.boosts = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0};

			this.baseAbility = toID(set.ability);
			this.ability = this.baseAbility;
			this.abilityState = {id: this.ability};

			this.item = toID(set.item);
			this.itemState = {id: this.item};
			this.lastItem = '';
			this.usedItemThisTurn = false;
			this.ateBerry = false;

			this.trapped = false;
			this.maybeTrapped = false;
			this.maybeDisabled = false;

			this.illusion = null;
			this.transformed = false;

			this.fainted = false;
			this.faintQueued = false;
			this.subFainted = null;
			
			//trying to display types, if it doesn't work (it doesn't), it's non-functional
			const modtypes = new Set<string>();
			const ivtypes = [
				'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 
				'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water',
			];
			modtypes.add(this.set.ivs['hp']<18 ? ivtypes[this.set.ivs['hp']] : species.types[0]);
			modtypes.add(this.set.ivs['spe']<18 ? ivtypes[this.set.ivs['spe']] : species.types[1]);

			this.types = modtypes;
			this.baseTypes = this.types;
			this.addedType = '';
			this.knownType = true;
			this.apparentType = modtypes.join('/');
			// Every Pokemon has a Terastal type
			this.teraType = this.set.teraType || this.types[0];

			this.switchFlag = false;
			this.forceSwitchFlag = false;
			this.skipBeforeSwitchOutEventFlag = false;
			this.draggedIn = null;
			this.newlySwitched = false;
			this.beingCalledBack = false;

			this.lastMove = null;
			// This is used in gen 2 only, here to avoid code repetition.
			// Only declared if gen 2 to avoid declaring an object we aren't going to need.
			if (this.battle.gen === 2) this.lastMoveEncore = null;
			this.lastMoveUsed = null;
			this.moveThisTurn = '';
			this.statsRaisedThisTurn = false;
			this.statsLoweredThisTurn = false;
			this.hurtThisTurn = null;
			this.lastDamage = 0;
			this.attackedBy = [];
			this.timesAttacked = 0;

			this.isActive = false;
			this.activeTurns = 0;
			this.activeMoveActions = 0;
			this.previouslySwitchedIn = 0;
			this.truantTurn = false;
			this.swordBoost = false;
			this.shieldBoost = false;
			this.syrupTriggered = false;
			this.stellarBoostedTypes = [];
			this.isStarted = false;
			this.duringMove = false;

			this.weighthg = 1;
			this.speed = 0;
			/**
			 * Determines the order in which redirect abilities like Lightning Rod
			 * activate if speed tied. Surprisingly not random like every other speed
			 * tie, but based on who first switched in or acquired the ability!
			 */
			this.abilityOrder = 0;

			this.canMegaEvo = this.battle.actions.canMegaEvo(this);
			this.canMegaEvoX = this.battle.actions.canMegaEvoX?.(this);
			this.canMegaEvoY = this.battle.actions.canMegaEvoY?.(this);
			this.canUltraBurst = this.battle.actions.canUltraBurst(this);
			this.canGigantamax = this.baseSpecies.canGigantamax || null;
			this.canTerastallize = this.battle.actions.canTerastallize(this);

			// This is used in gen 1 only, here to avoid code repetition.
			// Only declared if gen 1 to avoid declaring an object we aren't going to need.
			if (this.battle.gen === 1) this.modifiedStats = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0};

			this.maxhp = 0;
			this.baseMaxhp = 0;
			this.hp = 0;
			this.clearVolatile();
			this.hp = this.maxhp;
			
			/*
			if (this.battle.ruleTable.has('denseafmod')) {
				this.details += `, createmons:`;
				this.details += `${Object.values(this.set.evs).join(',')},`;
				this.details += `${this.hpType},${this.teraType}`;
			}
			*/
		}
	},
	
	//adapting Nihilslaves's Createmons script
	spreadModify(baseStats: StatsTable, set: PokemonSet): StatsTable {
		const modStats: SparseStatsTable = {hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10};
		const tr = this.trunc;
		let statName: keyof StatsTable;
		for (statName in modStats) {
			const stat = baseStats[statName];
			modStats[statName] = tr(2 * stat + 31 + set.evs[statName]/4) + 5;
		}
		if ('hp' in baseStats) {
			const stat = baseStats['hp'];
			modStats['hp'] = tr(2 * stat + 31 + set.evs['hp']/4 + 100) + 10;
		}
		return this.natureModify(modStats as StatsTable, set);
	},	
};

