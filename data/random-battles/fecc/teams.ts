import {Dex, toID} from '../../../sim/dex';
import {Utils} from '../../../lib';
import {PRNG, PRNGSeed} from '../../../sim/prng';
import {RuleTable} from '../../../sim/dex-formats';
import {Tags} from '../../tags';

export interface TeamData {
	typeCount: {[k: string]: number};
	typeComboCount: {[k: string]: number};
	baseFormes: {[k: string]: number};
	megaCount?: number;
	zCount?: number;
	has: {[k: string]: number};
	forceResult: boolean;
	weaknesses: {[k: string]: number};
	resistances: {[k: string]: number};
	weather?: string;
	eeveeLimCount?: number;
	gigantamax?: boolean;
}
export interface BattleFactorySpecies {
	flags: {limEevee?: 1};
	sets: BattleFactorySet[];
}
interface BattleFactorySet {
	species: string;
	item: string;
	ability: string;
	nature: string;
	moves: string[];
	evs?: Partial<StatsTable>;
	ivs?: Partial<StatsTable>;
}
export class MoveCounter extends Utils.Multiset<string> {
	damagingMoves: Set<Move>;
	ironFist: number;

	constructor() {
		super();
		this.damagingMoves = new Set();
		this.ironFist = 0;
	}

	get(key: string): number {
		return super.get(key) || 0;
	}
}

type MoveEnforcementChecker = (
	movePool: string[], moves: Set<string>, abilities: Set<string>, types: string[],
	counter: MoveCounter, species: Species, teamDetails: RandomTeamsTypes.TeamDetails,
	isLead: boolean, isDoubles: boolean, teraType: string, role: RandomTeamsTypes.Role,
) => boolean;

// Moves that restore HP:
const RECOVERY_MOVES = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis',
];
// Moves that drop stats:
const CONTRARY_MOVES = [
	'armorcannon', 'closecombat', 'leafstorm', 'makeitrain', 'overheat', 'spinout', 'superpower', 'vcreate',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'swordsdance', 'tidyup', 'victorydance',
];
// Moves which boost Special Attack:
const SPECIAL_SETUP = [
	'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow', 'torchsong',
];
// Moves that boost Attack AND Special Attack:
const MIXED_SETUP = [
	'clangoroussoul', 'growth', 'happyhour', 'holdhands', 'noretreat', 'shellsmash', 'workup',
];
// Some moves that only boost Speed:
const SPEED_SETUP = [
	'agility', 'autotomize', 'flamecharge', 'rockpolish', 'trailblaze',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'clangoroussoul', 'coil', 'cosmicpower', 'curse',
	'dragondance', 'flamecharge', 'growth', 'honeclaws', 'howl', 'irondefense', 'meditate', 'nastyplot', 'noretreat', 'poweruppunch',
	'quiverdance', 'rockpolish', 'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'tidyup', 'trailblaze', 'workup', 'victorydance',
];
const SPEED_CONTROL = [
	'electroweb', 'glare', 'icywind', 'lowsweep', 'quash', 'rocktomb', 'stringshot', 'tailwind', 'thunderwave', 'trickroom',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'accelerock', 'aquajet', 'bounce', 'breakingswipe', 'bulletpunch', 'chatter', 'chloroblast', 'clearsmog', 'covet',
	'dragontail', 'doomdesire', 'electroweb', 'eruption', 'explosion', 'fakeout', 'feint', 'flamecharge', 'flipturn', 'futuresight',
	'grassyglide', 'iceshard', 'icywind', 'incinerate', 'infestation', 'machpunch', 'meteorbeam', 'mortalspin', 'nuzzle', 'pluck', 'pursuit',
	'quickattack', 'rapidspin', 'reversal', 'selfdestruct', 'shadowsneak', 'skydrop', 'snarl', 'strugglebug', 'suckerpunch', 'uturn',
	'vacuumwave', 'voltswitch', 'watershuriken', 'waterspout',
];
// Hazard-setting moves
const HAZARDS = [
	'spikes', 'stealthrock', 'stickyweb', 'toxicspikes',
];
// Protect and its variants
const PROTECT_MOVES = [
	'banefulbunker', 'burningbulwark', 'protect', 'silktrap', 'spikyshield',
];
// Moves that switch the user out
const PIVOT_MOVES = [
	'chillyreception', 'flipturn', 'partingshot', 'shedtail', 'teleport', 'uturn', 'voltswitch',
];

// Moves that should be paired together when possible
const MOVE_PAIRS = [
	['lightscreen', 'reflect'],
	['sleeptalk', 'rest'],
	['protect', 'wish'],
	['leechseed', 'protect'],
	['leechseed', 'substitute'],
];

/** Pokemon who always want priority STAB, and are fine with it as its only STAB move of that type */
const PRIORITY_POKEMON = [
	'breloom', 'brutebonnet', 'honchkrow', 'mimikyu', 'scizor',
];

/** Pokemon who should never be in the lead slot */
const NO_LEAD_POKEMON = [
	'Iron Boulder', 'Slither Wing', 'Zacian', 'Zamazenta',
];
const DOUBLES_NO_LEAD_POKEMON = [
	'Basculegion', 'Houndstone', 'Roaring Moon', 'Zacian', 'Zamazenta',
];

const DEFENSIVE_TERA_BLAST_USERS = [
	'alcremie', 'bellossom', 'comfey', 'florges',
];

function sereneGraceBenefits(move: Move) {
	return move.secondary?.chance && move.secondary.chance > 20 && move.secondary.chance < 100;
}

export class RandomTeams {
	dex: ModdedDex;
	gen: number;
	factoryTier: string;
	format: Format;
	prng: PRNG;
	noStab: string[];
	readonly maxTeamSize: number;
	readonly adjustLevel: number | null;
	readonly maxMoveCount: number;
	readonly forceMonotype: string | undefined;

	/**
	 * Checkers for move enforcement based on types or other factors
	 *
	 * returns true to try to force the move type, false otherwise.
	 */
	moveEnforcementCheckers: {[k: string]: MoveEnforcementChecker};

	constructor(format: Format | string, prng: PRNG | PRNGSeed | null) {
		format = Dex.formats.get(format);
		this.dex = Dex.forFormat(format);
		this.gen = this.dex.gen;
		this.noStab = NO_STAB;

		const ruleTable = Dex.formats.getRuleTable(format);
		this.maxTeamSize = ruleTable.maxTeamSize;
		this.adjustLevel = ruleTable.adjustLevel;
		this.maxMoveCount = ruleTable.maxMoveCount;
		const forceMonotype = ruleTable.valueRules.get('forcemonotype');
		this.forceMonotype = forceMonotype && this.dex.types.get(forceMonotype).exists ?
			this.dex.types.get(forceMonotype).name : undefined;

		this.factoryTier = '';
		this.format = format;
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				movePool.includes('megahorn') || movePool.includes('xscissor') ||
				(!counter.get('Bug') && types.includes('Electric'))
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fairy: (movePool, moves, abilities, types, counter) => !counter.get('Fairy'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter, species) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter) => !counter.get('Flying'),
			Ghost: (movePool, moves, abilities, types, counter) => !counter.get('Ghost'),
			Grass: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Grass') && (
					movePool.includes('leafstorm') || species.baseStats.atk >= 100 ||
					types.includes('Electric') || abilities.has('Seed Sower')
				)
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => (
				movePool.includes('freezedry') || movePool.includes('blizzard') || !counter.get('Ice')
			),
			Normal: (movePool, moves, types, counter) => (movePool.includes('boomburst') || movePool.includes('hypervoice')),
			Poison: (movePool, moves, abilities, types, counter) => {
				if (types.includes('Ground')) return false;
				return !counter.get('Poison');
			},
			Psychic: (movePool, moves, abilities, types, counter, species, teamDetails, isLead, isDoubles) => {
				if (counter.get('Psychic')) return false;
				if (movePool.includes('calmmind') || abilities.has('Strong Jaw')) return true;
				if (isDoubles && movePool.includes('psychicfangs')) return true;
				return abilities.has('Psychic Surge') || ['Electric', 'Fighting', 'Fire', 'Grass', 'Poison'].some(m => types.includes(m));
			},
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 80,
			Steel: (movePool, moves, abilities, types, counter, species, teamDetails, isLead, isDoubles) => (
				!counter.get('Steel') &&
				(isDoubles || species.baseStats.atk >= 90 || movePool.includes('gigatonhammer') || movePool.includes('makeitrain'))
			),
			Water: (movePool, moves, abilities, types, counter) => (!counter.get('Water') && !types.includes('Ground')),
		};
	}

	setSeed(prng?: PRNG | PRNGSeed) {
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);
	}

	getTeam(options?: PlayerOptions | null): PokemonSet[] {
		const generatorName = (
			typeof this.format.team === 'string' && this.format.team.startsWith('random')
		 ) ? this.format.team + 'Team' : '';
		// @ts-ignore
		return this[generatorName || 'randomTeam'](options);
	}

	randomChance(numerator: number, denominator: number) {
		return this.prng.randomChance(numerator, denominator);
	}

	sample<T>(items: readonly T[]): T {
		return this.prng.sample(items);
	}

	sampleIfArray<T>(item: T | T[]): T {
		if (Array.isArray(item)) {
			return this.sample(item);
		}
		return item;
	}

	random(m?: number, n?: number) {
		return this.prng.next(m, n);
	}

	/**
	 * Remove an element from an unsorted array significantly faster
	 * than .splice
	 */
	fastPop(list: any[], index: number) {
		// If an array doesn't need to be in order, replacing the
		// element at the given index with the removed element
		// is much, much faster than using list.splice(index, 1).
		const length = list.length;
		if (index < 0 || index >= list.length) {
			// sanity check
			throw new Error(`Index ${index} out of bounds for given array`);
		}

		const element = list[index];
		list[index] = list[length - 1];
		list.pop();
		return element;
	}

	/**
	 * Remove a random element from an unsorted array and return it.
	 * Uses the battle's RNG if in a battle.
	 */
	sampleNoReplace(list: any[]) {
		const length = list.length;
		if (length === 0) return null;
		const index = this.random(length);
		return this.fastPop(list, index);
	}

	/**
	 * Removes n random elements from an unsorted array and returns them.
	 * If n is less than the array's length, randomly removes and returns all the elements
	 * in the array (so the returned array could have length < n).
	 */
	multipleSamplesNoReplace<T>(list: T[], n: number): T[] {
		const samples = [];
		while (samples.length < n && list.length) {
			samples.push(this.sampleNoReplace(list));
		}

		return samples;
	}

	/**
	 * Check if user has directly tried to ban/unban/restrict things in a custom battle.
	 * Doesn't count bans nested inside other formats/rules.
	 */
	private hasDirectCustomBanlistChanges() {
		if (this.format.banlist.length || this.format.restricted.length || this.format.unbanlist.length) return true;
		if (!this.format.customRules) return false;
		for (const rule of this.format.customRules) {
			for (const banlistOperator of ['-', '+', '*']) {
				if (rule.startsWith(banlistOperator)) return true;
			}
		}
		return false;
	}

	/**
	 * Inform user when custom bans are unsupported in a team generator.
	 */
	protected enforceNoDirectCustomBanlistChanges() {
		if (this.hasDirectCustomBanlistChanges()) {
			throw new Error(`Custom bans are not currently supported in ${this.format.name}.`);
		}
	}

	/**
	 * Inform user when complex bans are unsupported in a team generator.
	 */
	protected enforceNoDirectComplexBans() {
		if (!this.format.customRules) return false;
		for (const rule of this.format.customRules) {
			if (rule.includes('+') && !rule.startsWith('+')) {
				throw new Error(`Complex bans are not currently supported in ${this.format.name}.`);
			}
		}
	}

	/**
	 * Validate set element pool size is sufficient to support size requirements after simple bans.
	 */
	private enforceCustomPoolSizeNoComplexBans(
		effectTypeName: string,
		basicEffectPool: BasicEffect[],
		requiredCount: number,
		requiredCountExplanation: string
	) {
		if (basicEffectPool.length >= requiredCount) return;
		throw new Error(`Legal ${effectTypeName} count is insufficient to support ${requiredCountExplanation} (${basicEffectPool.length} / ${requiredCount}).`);
	}

	queryMoves(
		moves: Set<string> | null,
		species: Species,
		teraType: string,
		abilities: Set<string> = new Set(),
	): MoveCounter {
		// This is primarily a helper function for random setbuilder functions.
		const counter = new MoveCounter();
		const types = species.types;
		if (!moves?.size) return counter;

		const categories = {Physical: 0, Special: 0, Status: 0};

		// Iterate through all moves we've chosen so far and keep track of what they do:
		for (const moveid of moves) {
			const move = this.dex.moves.get(moveid);

			const moveType = this.getMoveType(move, species, abilities, teraType);
			if (move.damage || move.damageCallback) {
				// Moves that do a set amount of damage:
				counter.add('damage');
				counter.damagingMoves.add(move);
			} else {
				// Are Physical/Special/Status moves:
				categories[move.category]++;
			}
			// Moves that have a low base power:
			if (moveid === 'lowkick' || (move.basePower && move.basePower <= 60 && moveid !== 'rapidspin')) {
				counter.add('technician');
			}
			// Moves that hit up to 5 times:
			if (move.multihit && Array.isArray(move.multihit) && move.multihit[1] === 5) counter.add('skilllink');
			if (move.recoil || move.hasCrashDamage) counter.add('recoil');
			if (move.drain) counter.add('drain');
			// Moves which have a base power:
			if (move.basePower || move.basePowerCallback) {
				if (!this.noStab.includes(moveid) || PRIORITY_POKEMON.includes(species.id) && move.priority > 0) {
					counter.add(moveType);
					if (types.includes(moveType)) counter.add('stab');
					if (teraType === moveType) counter.add('stabtera');
					counter.damagingMoves.add(move);
				}
				if (move.flags['bite']) counter.add('strongjaw');
				if (move.flags['punch']) counter.ironFist++;
				if (move.flags['sound']) counter.add('sound');
				if (move.priority > 0 || (moveid === 'grassyglide' && abilities.has('Grassy Surge'))) {
					counter.add('priority');
				}
			}
			// Moves with secondary effects:
			if (move.secondary || move.hasSheerForce) {
				counter.add('sheerforce');
				if (sereneGraceBenefits(move)) {
					counter.add('serenegrace');
				}
			}
			// Moves with low accuracy:
			if (move.accuracy && move.accuracy !== true && move.accuracy < 90) counter.add('inaccurate');

			// Moves that change stats:
			if (RECOVERY_MOVES.includes(moveid)) counter.add('recovery');
			if (CONTRARY_MOVES.includes(moveid)) counter.add('contrary');
			if (PHYSICAL_SETUP.includes(moveid)) counter.add('physicalsetup');
			if (SPECIAL_SETUP.includes(moveid)) counter.add('specialsetup');
			if (MIXED_SETUP.includes(moveid)) counter.add('mixedsetup');
			if (SPEED_SETUP.includes(moveid)) counter.add('speedsetup');
			if (SETUP.includes(moveid)) counter.add('setup');
			if (HAZARDS.includes(moveid)) counter.add('hazards');
		}

		counter.set('Physical', Math.floor(categories['Physical']));
		counter.set('Special', Math.floor(categories['Special']));
		counter.set('Status', categories['Status']);
		return counter;
	}

	cullMovePool(
		types: string[],
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): void {
		if (moves.size + movePool.length <= this.maxMoveCount) return;
		// If we have two unfilled moves and only one unpaired move, cull the unpaired move.
		if (moves.size === this.maxMoveCount - 2) {
			const unpairedMoves = [...movePool];
			for (const pair of MOVE_PAIRS) {
				if (movePool.includes(pair[0]) && movePool.includes(pair[1])) {
					this.fastPop(unpairedMoves, unpairedMoves.indexOf(pair[0]));
					this.fastPop(unpairedMoves, unpairedMoves.indexOf(pair[1]));
				}
			}
			if (unpairedMoves.length === 1) {
				this.fastPop(movePool, movePool.indexOf(unpairedMoves[0]));
			}
		}

		// These moves are paired, and shouldn't appear if there is not room for them both.
		if (moves.size === this.maxMoveCount - 1) {
			for (const pair of MOVE_PAIRS) {
				if (movePool.includes(pair[0]) && movePool.includes(pair[1])) {
					this.fastPop(movePool, movePool.indexOf(pair[0]));
					this.fastPop(movePool, movePool.indexOf(pair[1]));
				}
			}
		}

		// Develop additional move lists
		const statusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status')
			.map(move => move.id);

		// Team-based move culls
		if (teamDetails.screens && movePool.length >= this.maxMoveCount + 2) {
			if (movePool.includes('reflect')) this.fastPop(movePool, movePool.indexOf('reflect'));
			if (movePool.includes('lightscreen')) this.fastPop(movePool, movePool.indexOf('lightscreen'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.stickyWeb) {
			if (movePool.includes('stickyweb')) this.fastPop(movePool, movePool.indexOf('stickyweb'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.stealthRock) {
			if (movePool.includes('stealthrock')) this.fastPop(movePool, movePool.indexOf('stealthrock'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.defog || teamDetails.rapidSpin) {
			if (movePool.includes('defog')) this.fastPop(movePool, movePool.indexOf('defog'));
			if (movePool.includes('rapidspin')) this.fastPop(movePool, movePool.indexOf('rapidspin'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.toxicSpikes && teamDetails.toxicSpikes >= 2) {
			if (movePool.includes('toxicspikes')) this.fastPop(movePool, movePool.indexOf('toxicspikes'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.spikes && teamDetails.spikes >= 2) {
			if (movePool.includes('spikes')) this.fastPop(movePool, movePool.indexOf('spikes'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}

		if (isDoubles) {
			const doublesIncompatiblePairs = [
				// In order of decreasing generalizability
				[SPEED_CONTROL, SPEED_CONTROL],
				[HAZARDS, HAZARDS],
				[PROTECT_MOVES, PROTECT_MOVES],
				['rockslide', 'stoneedge'],
				[SETUP, ['fakeout', 'helpinghand']],
				[PROTECT_MOVES, 'wideguard'],
				[['fierydance', 'fireblast'], 'heatwave'],
				['dazzlinggleam', ['fleurcannon', 'moonblast']],
				['poisongas', ['toxicspikes', 'willowisp']],
				[RECOVERY_MOVES, 'healpulse'],
				['lifedew', 'healpulse'],
				['haze', 'icywind'],
				[['hydropump', 'muddywater'], ['muddywater', 'scald']],
				['disable', 'encore'],
				['freezedry', 'icebeam'],
				['energyball', 'leafstorm'],
				['wildcharge', 'thunderbolt'],
				['earthpower', 'sandsearstorm'],
				['coaching', ['helpinghand', 'howl']],
			];

			for (const pair of doublesIncompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

			if (role !== 'Offensive Protect') this.incompatibleMoves(moves, movePool, PROTECT_MOVES, ['flipturn', 'uturn']);
		}

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[statusMoves, ['healingwish', 'switcheroo', 'trick']],
			[SETUP, PIVOT_MOVES],
			[SETUP, HAZARDS],
			[SETUP, ['defog', 'nuzzle', 'toxic', 'waterspout', 'yawn', 'haze']],
			[PHYSICAL_SETUP, PHYSICAL_SETUP],
			[SPECIAL_SETUP, 'thunderwave'],
			['substitute', PIVOT_MOVES],
			[SPEED_SETUP, ['aquajet', 'rest', 'trickroom']],
			['curse', ['irondefense', 'rapidspin']],
			['dragondance', 'dracometeor'],

			// These attacks are redundant with each other
			[['psychic', 'psychicnoise'], ['psyshock', 'psychicnoise']],
			['surf', 'hydropump'],
			['liquidation', 'wavecrash'],
			['aquajet', 'flipturn'],
			['gigadrain', 'leafstorm'],
			['powerwhip', 'hornleech'],
			[['airslash', 'bravebird', 'hurricane'], ['airslash', 'bravebird', 'hurricane']],
			['knockoff', 'foulplay'],
			['throatchop', ['crunch', 'lashout']],
			['doubleedge', ['bodyslam', 'headbutt']],
			['fireblast', ['fierydance', 'flamethrower']],
			['lavaplume', 'magmastorm'],
			['thunderpunch', 'wildcharge'],
			['gunkshot', ['direclaw', 'poisonjab', 'sludgebomb']],
			['aurasphere', 'focusblast'],
			['closecombat', 'drainpunch'],
			['bugbite', 'pounce'],
			[['dragonpulse', 'spacialrend'], 'dracometeor'],
			['alluringvoice', 'dazzlinggleam'],

			// These status moves are redundant with each other
			['taunt', 'disable'],
			['toxic', ['willowisp', 'thunderwave']],
			[['thunderwave', 'toxic', 'willowisp'], 'toxicspikes'],

			// This space reserved for assorted hardcodes that otherwise make little sense out of context
			// Landorus and Thundurus
			['nastyplot', ['rockslide', 'knockoff']],
			// Persian
			['switcheroo', 'fakeout'],
			// Beartic
			['snowscape', 'swordsdance'],
			// Magnezone
			['bodypress', 'mirrorcoat'],
			// Amoonguss, though this can work well as a general rule later
			['toxic', 'clearsmog'],
			// Chansey and Blissey
			['healbell', 'stealthrock'],
			// Azelf and Zoroarks
			['trick', 'uturn'],
			// Araquanid
			['mirrorcoat', 'hydropump'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (!types.includes('Ice')) this.incompatibleMoves(moves, movePool, 'icebeam', 'icywind');

		if (!isDoubles) this.incompatibleMoves(moves, movePool, ['taunt', 'strengthsap'], 'encore');

		if (!types.includes('Dark') && teraType !== 'Dark') this.incompatibleMoves(moves, movePool, 'knockoff', 'suckerpunch');

		if (!abilities.has('Prankster')) this.incompatibleMoves(moves, movePool, 'thunderwave', 'yawn');

		// This space reserved for assorted hardcodes that otherwise make little sense out of context
		if (species.id === 'luvdisc') {
			this.incompatibleMoves(moves, movePool, ['charm', 'flipturn', 'icebeam'], ['charm', 'flipturn']);
		}
		if (species.id === "cyclizar") this.incompatibleMoves(moves, movePool, 'taunt', 'knockoff');
		if (species.baseSpecies === 'Dudunsparce') this.incompatibleMoves(moves, movePool, 'earthpower', 'shadowball');
		if (species.id === 'mesprit') this.incompatibleMoves(moves, movePool, 'healingwish', 'uturn');
	}

	// Checks for and removes incompatible moves, starting with the first move in movesA.
	incompatibleMoves(
		moves: Set<string>,
		movePool: string[],
		movesA: string | string[],
		movesB: string | string[],
	): void {
		const moveArrayA = (Array.isArray(movesA)) ? movesA : [movesA];
		const moveArrayB = (Array.isArray(movesB)) ? movesB : [movesB];
		if (moves.size + movePool.length <= this.maxMoveCount) return;
		for (const moveid1 of moves) {
			if (moveArrayB.includes(moveid1)) {
				for (const moveid2 of moveArrayA) {
					if (moveid1 !== moveid2 && movePool.includes(moveid2)) {
						this.fastPop(movePool, movePool.indexOf(moveid2));
						if (moves.size + movePool.length <= this.maxMoveCount) return;
					}
				}
			}
			if (moveArrayA.includes(moveid1)) {
				for (const moveid2 of moveArrayB) {
					if (moveid1 !== moveid2 && movePool.includes(moveid2)) {
						this.fastPop(movePool, movePool.indexOf(moveid2));
						if (moves.size + movePool.length <= this.maxMoveCount) return;
					}
				}
			}
		}
	}

	// Adds a move to the moveset, returns the MoveCounter
	addMove(
		move: string,
		moves: Set<string>,
		types: string[],
		abilities: Set<string>,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		movePool: string[],
		teraType: string,
		role: RandomTeamsTypes.Role,
	): MoveCounter {
		moves.add(move);
		this.fastPop(movePool, movePool.indexOf(move));
		const counter = this.queryMoves(moves, species, teraType, abilities);
		this.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead, isDoubles, teraType, role);
		return counter;
	}

	// Returns the type of a given move for STAB/coverage enforcement purposes
	getMoveType(move: Move, species: Species, abilities: Set<string>, teraType: string): string {
		if (move.id === 'terablast') return teraType;
		if (['judgment', 'revelationdance'].includes(move.id)) return species.types[0];

		if (move.name === "Raging Bull" && species.name.startsWith("Tauros-Paldea")) {
			if (species.name.endsWith("Combat")) return "Fighting";
			if (species.name.endsWith("Blaze")) return "Fire";
			if (species.name.endsWith("Aqua")) return "Water";
		}

		if (move.name === "Ivy Cudgel" && species.name.startsWith("Ogerpon")) {
			if (species.name.endsWith("Wellspring")) return "Water";
			if (species.name.endsWith("Hearthflame")) return "Fire";
			if (species.name.endsWith("Cornerstone")) return "Rock";
		}

		const moveType = move.type;
		if (moveType === 'Normal') {
			if (abilities.has('Aerilate')) return 'Flying';
			if (abilities.has('Galvanize')) return 'Electric';
			if (abilities.has('Pixilate')) return 'Fairy';
			if (abilities.has('Refrigerate')) return 'Ice';
		}
		return moveType;
	}

	// Generate random moveset for a given species, role, tera type.
	randomMoveset(
		types: string[],
		abilities: Set<string>,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		movePool: string[],
		teraType: string,
		role: RandomTeamsTypes.Role,
	): Set<string> {
		const moves = new Set<string>();
		let counter = this.queryMoves(moves, species, teraType, abilities);
		this.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead, isDoubles, teraType, role);

		// If there are only four moves, add all moves and return early
		if (movePool.length <= this.maxMoveCount) {
			for (const moveid of movePool) {
				moves.add(moveid);
			}
			return moves;
		}

		const runEnforcementChecker = (checkerName: string) => {
			if (!this.moveEnforcementCheckers[checkerName]) return false;
			return this.moveEnforcementCheckers[checkerName](
				movePool, moves, abilities, types, counter, species, teamDetails, isLead, isDoubles, teraType, role
			);
		};

		if (role === 'Tera Blast user') {
			counter = this.addMove('terablast', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}
		// Add required move (e.g. Relic Song for Meloetta-P)
		if (species.requiredMove) {
			const move = this.dex.moves.get(species.requiredMove).id;
			counter = this.addMove(move, moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Add other moves you really want to have, e.g. STAB, recovery, setup.

		// Enforce Facade if Guts is a possible ability
		if (movePool.includes('facade') && abilities.has('Guts')) {
			counter = this.addMove('facade', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce wacky moves
		for (const moveid of ['stuffcheeks', 'headsmash', 'bloodmoon', 'eternabeam', 'terastarstorm', 'attract', 'dragontail', 'boltbeak', 'saltcure', 'sandtomb', 'finalgambit', 'darkvoid', 'aurawheel']) {
			if (movePool.includes(moveid)) {
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Trick Room on Parasex
		if (movePool.includes('trickroom') && role === 'Bulky Attacker') {
			counter = this.addMove('trickroom', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce hazard removal on Bulky Support if the team doesn't already have it
		if (role === 'Bulky Support' && !teamDetails.defog && !teamDetails.rapidSpin) {
			if (movePool.includes('rapidspin')) {
				counter = this.addMove('rapidspin', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
			if (movePool.includes('defog')) {
				counter = this.addMove('defog', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Knock Off on pure Normal- and Fighting-types in singles
		if (!isDoubles && types.length === 1 && (types.includes('Normal') || types.includes('Fighting'))) {
			if (movePool.includes('knockoff')) {
				counter = this.addMove('knockoff', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Flip Turn on pure Water-type Wallbreakers
		if (types.length === 1 && types.includes('Water') && role === 'Wallbreaker') {
			if (movePool.includes('flipturn')) {
				counter = this.addMove('flipturn', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Spore on Smeargle
		if (species.id === 'smeargle') {
			if (movePool.includes('spore')) {
				counter = this.addMove('spore', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce STAB priority
		if (
			['Bulky Attacker', 'Bulky Setup', 'Wallbreaker', 'Doubles Wallbreaker'].includes(role) ||
			PRIORITY_POKEMON.includes(species.id)
		) {
			const priorityMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, teraType);
				if (
					types.includes(moveType) && (move.priority > 0 || (moveid === 'grassyglide' && abilities.has('Grassy Surge'))) &&
					(move.basePower || move.basePowerCallback)
				) {
					priorityMoves.push(moveid);
				}
			}
			if (priorityMoves.length) {
				const moveid = this.sample(priorityMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce STAB
		for (const type of types) {
			// Check if a STAB move of that type should be required
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, teraType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && type === moveType) {
					stabMoves.push(moveid);
				}
			}
			while (runEnforcementChecker(type)) {
				if (!stabMoves.length) break;
				const moveid = this.sampleNoReplace(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Tera STAB
		if (!counter.get('stabtera') && !['Bulky Support', 'Doubles Support'].includes(role)) {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, teraType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && teraType === moveType) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// If no STAB move was added, add a STAB move
		if (!counter.get('stab')) {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, teraType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && types.includes(moveType)) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce recovery
		if (['Bulky Support', 'Bulky Attacker', 'Bulky Setup'].includes(role)) {
			const recoveryMoves = movePool.filter(moveid => RECOVERY_MOVES.includes(moveid));
			if (recoveryMoves.length) {
				const moveid = this.sample(recoveryMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce setup
		if (role.includes('Setup') || role === 'Tera Blast user') {
			// First, try to add a non-Speed setup move
			const nonSpeedSetupMoves = movePool.filter(moveid => SETUP.includes(moveid) && !SPEED_SETUP.includes(moveid));
			if (nonSpeedSetupMoves.length) {
				const moveid = this.sample(nonSpeedSetupMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			} else {
				// No non-Speed setup moves, so add any (Speed) setup move
				const setupMoves = movePool.filter(moveid => SETUP.includes(moveid));
				if (setupMoves.length) {
					const moveid = this.sample(setupMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}

		// Enforce Protect
		if (role.includes('Protect')) {
			const protectMoves = movePool.filter(moveid => PROTECT_MOVES.includes(moveid));
			if (protectMoves.length) {
				const moveid = this.sample(protectMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce a move not on the noSTAB list
		if (!counter.damagingMoves.size) {
			// Choose an attacking move
			const attackingMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				if (!this.noStab.includes(moveid) && (move.category !== 'Status')) attackingMoves.push(moveid);
			}
			if (attackingMoves.length) {
				const moveid = this.sample(attackingMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce coverage move
		if (!['AV Pivot', 'Fast Support', 'Bulky Support', 'Bulky Protect', 'Doubles Support'].includes(role)) {
			if (counter.damagingMoves.size === 1) {
				// Find the type of the current attacking move
				const currentAttackType = counter.damagingMoves.values().next().value.type;
				// Choose an attacking move that is of different type to the current single attack
				const coverageMoves = [];
				for (const moveid of movePool) {
					const move = this.dex.moves.get(moveid);
					const moveType = this.getMoveType(move, species, abilities, teraType);
					if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback)) {
						if (currentAttackType !== moveType) coverageMoves.push(moveid);
					}
				}
				if (coverageMoves.length) {
					const moveid = this.sample(coverageMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}

		// Add (moves.size < this.maxMoveCount) as a condition if moves is getting larger than 4 moves.
		// If you want moves to be favored but not required, add something like && this.randomChance(1, 2) to your condition.

		// Choose remaining moves randomly from movepool and add them to moves list:
		while (moves.size < this.maxMoveCount && movePool.length) {
			if (moves.size + movePool.length <= this.maxMoveCount) {
				for (const moveid of movePool) {
					moves.add(moveid);
				}
				break;
			}
			const moveid = this.sample(movePool);
			counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
			for (const pair of MOVE_PAIRS) {
				if (moveid === pair[0] && movePool.includes(pair[1])) {
					counter = this.addMove(pair[1], moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
				if (moveid === pair[1] && movePool.includes(pair[0])) {
					counter = this.addMove(pair[0], moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}
		return moves;
	}

	shouldCullAbility(
		ability: string,
		types: string[],
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): boolean {
		if ([
			'Armor Tail', 'Battle Bond', 'Early Bird', 'Flare Boost', 'Galvanize', 'Gluttony', 'Harvest', 'Hydration', 'Ice Body', 'Immunity',
			'Liquid Voice', 'Marvel Scale', 'Misty Surge', 'Moody', 'Pressure', 'Quick Feet', 'Rain Dish', 'Sand Veil', 'Shed Skin',
			'Sniper', 'Snow Cloak', 'Steadfast', 'Steam Engine', 'Sweet Veil',
		].includes(ability)) return true;

		switch (ability) {
		// Abilities which are primarily useful for certain moves
		case 'Contrary': case 'Serene Grace': case 'Skill Link': case 'Strong Jaw':
			return !counter.get(toID(ability));
		case 'Chlorophyll':
			return (!moves.has('sunnyday') && !teamDetails.sun && species.id !== 'lilligant');
		case 'Cloud Nine':
			return (species.id !== 'golduck');
		case 'Competitive':
			return (species.id === 'kilowattrel' && !isDoubles);
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Cursed Body':
			return abilities.has('Infiltrator');
		case 'Defiant':
			return (!counter.get('Physical') || (abilities.has('Prankster') && (moves.has('thunderwave') || moves.has('taunt'))));
		case 'Flame Body':
			return (species.id === 'magcargo' && moves.has('shellsmash'));
		case 'Flash Fire':
			return (
				['Drought', 'Flame Body', 'Intimidate', 'Rock Head', 'Weak Armor'].some(m => abilities.has(m)) &&
				this.dex.getEffectiveness('Fire', species) < 0
			);
		case 'Guts':
			return (!moves.has('facade') && !moves.has('sleeptalk'));
		case 'Hustle':
			// some of this is just for Delibird in singles/doubles
			return (!counter.get('Physical') || moves.has('fakeout') || moves.has('rapidspin'));
		case 'Infiltrator':
			return (isDoubles && abilities.has('Clear Body'));
		case 'Insomnia':
			return (role === 'Wallbreaker');
		case 'Intimidate':
			if (abilities.has('Hustle')) return true;
			if (abilities.has('Sheer Force') && !!counter.get('sheerforce')) return true;
			if (species.id === 'hitmontop' && moves.has('tripleaxel')) return true;
			return (abilities.has('Stakeout'));
		case 'Iron Fist':
			return !counter.ironFist || moves.has('dynamicpunch');
		case 'Justified':
			return !counter.get('Physical');
		case 'Libero': case 'Protean':
			return role === 'Offensive Protect' || (species.id === 'meowscarada' && role === 'Fast Attacker');
		case 'Lightning Rod':
			return species.id === 'rhyperior';
		case 'Mold Breaker':
			return (['Pickpocket', 'Sharpness', 'Sheer Force', 'Unburden'].some(m => abilities.has(m)));
		case 'Moxie':
			return (!counter.get('Physical') || moves.has('stealthrock'));
		case 'Natural Cure':
			return species.id === 'pawmot';
		case 'Neutralizing Gas':
			return !isDoubles;
		case 'Overcoat':
			return types.includes('Grass');
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Own Tempo':
			return (!isDoubles || (counter.get('Special')) > 1);
		case 'Prankster':
			return (!counter.get('Status') || (species.id === 'grafaiai' && role === 'Setup Sweeper'));
		case 'Reckless':
			return !counter.get('recoil');
		case 'Regenerator':
			return (species.id === 'mienshao' && role === 'Wallbreaker');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Force': case 'Sand Rush':
			return !teamDetails.sand;
		case 'Sap Sipper':
			return species.id === 'wyrdeer';
		case 'Seed Sower':
			return role === 'Bulky Support';
		case 'Sheer Force':
			const braviaryCase = (species.id === 'braviaryhisui' && (role === 'Wallbreaker' || role === 'Bulky Protect'));
			const abilitiesCase = (abilities.has('Guts') || abilities.has('Sharpness'));
			const movesCase = (moves.has('bellydrum') || moves.has('flamecharge'));
			return (!counter.get('sheerforce') || braviaryCase || abilitiesCase || movesCase);
		case 'Slush Rush':
			return !teamDetails.snow;
		case 'Solar Power':
			return (!teamDetails.sun || !counter.get('Special'));
		case 'Speed Boost':
			return (species.id === 'yanmega' && !moves.has('protect'));
		case 'Sticky Hold':
			return (species.id === 'muk');
		case 'Sturdy':
			return (!!counter.get('recoil') && species.id !== 'skarmory');
		case 'Swarm':
			return (!counter.get('Bug') || !!counter.get('recovery'));
		case 'Swift Swim':
			return (abilities.has('Intimidate') || (!moves.has('raindance') && !teamDetails.rain));
		case 'Synchronize':
			return (species.id !== 'umbreon' && species.id !== 'rabsca');
		case 'Technician':
			return (!counter.get('technician') || abilities.has('Punk Rock') || abilities.has('Fur Coat'));
		case 'Tinted Lens':
			const hbraviaryCase = (species.id === 'braviaryhisui' && (role === 'Setup Sweeper' || role === 'Doubles Wallbreaker'));
			const yanmegaCase = (species.id === 'yanmega' && moves.has('protect'));
			return (yanmegaCase || hbraviaryCase || species.id === 'illumise');
		case 'Unaware':
			return (species.id === 'clefable' && role !== 'Bulky Support');
		case 'Unburden':
			return (abilities.has('Prankster') || !counter.get('setup') || species.id === 'sceptile');
		case 'Vital Spirit':
			// Magmar and Electabuzz want their contact status abilities in Doubles
			return (species.nfe && isDoubles);
		case 'Volt Absorb':
			if (abilities.has('Iron Fist') && counter.ironFist >= 2) return true;
			return (this.dex.getEffectiveness('Electric', species) < -1);
		case 'Water Absorb':
			return (['lanturn', 'politoed', 'quagsire'].includes(species.id) || moves.has('raindance'));
		case 'Weak Armor':
			return (moves.has('shellsmash') && species.id !== 'magcargo');
		}

		return false;
	}

	getAbility(
		types: string[],
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): string {
		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData.length <= 1) return abilityData[0].name;

		// Hard-code abilities here
		if (species.id === 'florges') return 'Flower Veil';
		if (species.id === 'bombirdier' && !counter.get('Rock')) return 'Big Pecks';
		if (species.id === 'scovillain') return 'Chlorophyll';
		if (species.id === 'empoleon') return 'Competitive';
		if (species.id === 'swampert' && !counter.get('Water') && !moves.has('flipturn')) return 'Damp';
		if (species.id === 'dodrio') return 'Early Bird';
		if (species.id === 'chandelure') return 'Flash Fire';
		if (species.id === 'golemalola' && moves.has('doubleedge')) return 'Galvanize';
		if (abilities.has('Guts') && (moves.has('facade') || moves.has('sleeptalk') || species.id === 'gurdurr')) return 'Guts';
		if (species.id === 'copperajah' && moves.has('heavyslam')) return 'Heavy Metal';
		if (species.id === 'jumpluff') return 'Infiltrator';
		if (species.id === 'toucannon' && !counter.get('skilllink')) return 'Keen Eye';
		if (species.id === 'reuniclus') return 'Magic Guard';
		if (species.id === 'smeargle' && !counter.get('technician')) return 'Own Tempo';
		// If Ambipom doesn't qualify for Technician, Skill Link is useless on it
		if (species.id === 'ambipom' && !counter.get('technician')) return 'Pickup';
		if (species.id === 'zebstrika') return (moves.has('wildcharge')) ? 'Sap Sipper' : 'Lightning Rod';
		if (species.id === 'sandaconda' || (species.id === 'scrafty' && moves.has('rest'))) return 'Shed Skin';
		if (species.id === 'cetitan' && (role === 'Wallbreaker' || isDoubles)) return 'Sheer Force';
		if (species.id === 'cinccino') return (role === 'Wallbreaker') ? 'Skill Link' : 'Technician';
		if (species.id === 'dipplin') return 'Sticky Hold';
		if (species.id === 'breloom') return 'Technician';
		if (species.id === 'shiftry' && moves.has('tailwind')) return 'Wind Rider';

		// singles
		if (!isDoubles) {
			if (species.id === 'hypno') return 'Insomnia';
			if (species.id === 'staraptor') return 'Reckless';
			if (species.id === 'arcaninehisui') return 'Rock Head';
			if (['raikou', 'suicune', 'vespiquen'].includes(species.id)) return 'Pressure';
			if (species.id === 'enamorus' && moves.has('calmmind')) return 'Cute Charm';
			if (species.id === 'klawf' && role === 'Setup Sweeper') return 'Anger Shell';
			if (abilities.has('Cud Chew') && moves.has('substitute')) return 'Cud Chew';
			if (abilities.has('Harvest') && (moves.has('protect') || moves.has('substitute'))) return 'Harvest';
			if (abilities.has('Serene Grace') && moves.has('headbutt')) return 'Serene Grace';
			if (abilities.has('Own Tempo') && moves.has('petaldance')) return 'Own Tempo';
			if (abilities.has('Slush Rush') && moves.has('snowscape')) return 'Slush Rush';
			if (abilities.has('Soundproof') && (moves.has('substitute') || counter.get('setup'))) return 'Soundproof';
		}

		// doubles, multi, and ffa
		if (isDoubles) {
			if (species.id === 'gumshoos' || species.id === 'porygonz') return 'Adaptability';
			if (species.id === 'farigiraf') return 'Armor Tail';
			if (species.id === 'dragapult') return 'Clear Body';
			if (species.id === 'altaria') return 'Cloud Nine';
			if (species.id === 'meowsticf') return 'Competitive';
			if (species.id === 'armarouge' && !moves.has('meteorbeam')) return 'Flash Fire';
			if (species.id === 'talonflame') return 'Gale Wings';
			if (
				['oinkologne', 'oinkolognef', 'snorlax', 'swalot'].includes(species.id) && role !== 'Doubles Wallbreaker'
			) return 'Gluttony';
			if (species.id === 'conkeldurr' && role === 'Doubles Wallbreaker') return 'Guts';
			if (species.id !== 'arboliva' && abilities.has('Harvest')) return 'Harvest';
			if (species.id === 'dragonite' || species.id === 'lucario') return 'Inner Focus';
			if (species.id === 'ariados') return 'Insomnia';
			if (species.id === 'primarina') return 'Liquid Voice';
			if (species.id === 'kommoo') return 'Soundproof';
			if (
				(species.id === 'flapple' && role === 'Doubles Bulky Attacker') ||
				(species.id === 'appletun' && this.randomChance(1, 2))
			) return 'Ripen';
			if (species.id === 'magnezone') return 'Sturdy';
			if (species.id === 'clefable' && role === 'Doubles Support') return 'Unaware';
			if (['drifblim', 'hitmonlee', 'sceptile'].includes(species.id) && !moves.has('shedtail')) return 'Unburden';
			if (abilities.has('Intimidate')) return 'Intimidate';

			if (this.randomChance(1, 2) && species.id === 'kingambit') return 'Defiant';

			// just doubles and multi
			if (this.format.gameType !== 'freeforall') {
				if (
					species.id === 'clefairy' ||
					(species.baseSpecies === 'Maushold' && role === 'Doubles Support')
				) return 'Friend Guard';
				if (species.id === 'blissey') return 'Healer';
				if (species.id === 'sinistcha') return 'Hospitality';
				if (species.id === 'duraludon') return 'Stalwart';
				if (species.id === 'barraskewda') return 'Propeller Tail';
				if (species.id === 'oranguru' || abilities.has('Pressure') && abilities.has('Telepathy')) return 'Telepathy';

				if (this.randomChance(1, 2) && species.id === 'mukalola') return 'Power of Alchemy';
			}
		}

		let abilityAllowed: Ability[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilityData) {
			if (ability.rating >= 1 && !this.shouldCullAbility(
				ability.name, types, moves, abilities, counter, teamDetails, species, isLead, isDoubles, teraType, role
			)) {
				abilityAllowed.push(ability);
			}
		}

		// If all abilities are rejected, re-allow all abilities
		if (!abilityAllowed.length) {
			for (const ability of abilityData) {
				if (ability.rating > 0) abilityAllowed.push(ability);
			}
			if (!abilityAllowed.length) abilityAllowed = abilityData;
		}

		if (abilityAllowed.length === 1) return abilityAllowed[0].name;
		// Sort abilities by rating with an element of randomness
		// All three abilities can be chosen
		if (abilityAllowed[2] && abilityAllowed[0].rating - 0.5 <= abilityAllowed[2].rating) {
			if (abilityAllowed[1].rating <= abilityAllowed[2].rating) {
				if (this.randomChance(1, 2)) [abilityAllowed[1], abilityAllowed[2]] = [abilityAllowed[2], abilityAllowed[1]];
			} else {
				if (this.randomChance(1, 3)) [abilityAllowed[1], abilityAllowed[2]] = [abilityAllowed[2], abilityAllowed[1]];
			}
			if (abilityAllowed[0].rating <= abilityAllowed[1].rating) {
				if (this.randomChance(2, 3)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			} else {
				if (this.randomChance(1, 2)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			}
		} else {
			// Third ability cannot be chosen
			if (abilityAllowed[0].rating <= abilityAllowed[1].rating) {
				if (this.randomChance(1, 2)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			} else if (abilityAllowed[0].rating - 0.5 <= abilityAllowed[1].rating) {
				if (this.randomChance(1, 3)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			}
		}

		// After sorting, choose the first ability
		return abilityAllowed[0].name;
	}

	getPriorityItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	) {
		if (!isDoubles) {
			if (
				!isLead && role === 'Bulky Setup' &&
				(ability === 'As One (OU)' || ability === 'Iron Thorn')
			) {
				return 'Booster Energy';
			}
		}
		if (role === 'Mega') {
			if (species.id === 'necromaneduskmane') return 'Depleted Ultranecrozmium Z';
			if (species.id === 'woopquaza') return this.sample(['Life Orb', 'Leftovers']);
			let mega = species.id + 'mega';
			if (mega === 'blasgronmega') {
				if (moves.has('shellsmash')) mega += 'b';
				else mega += 'a';
			}
			return this.dex.species.get(mega).requiredItems[0];
		}
		if (role === 'AV Pivot') return 'Assault Vest';
		//mon hardcodes
		if (species.id === 'hooporantunbound') return 'Light Ball';
		if (species.id === 'zacianoh') return 'Rusted Sword';
		if (species.id === 'shitto') return 'Black Sludge';
		if (species.id === 'swalos') return 'Starf Berry';
		if (species.id === 'koraisle' || species.id === 'mirainun') return 'Destiny Knot';
		if (species.id === 'tipplin') return 'Metronome';
		if (species.id === 'mimighold') return 'Lum Berry';
		if (species.id === 'zamadactylcrowned') return 'Rusted Shield';
		if (species.id === 'basbal' || species.id === 'naclinch' || species.id === 'glimmgar') return 'Eviolite';
		if (species.id === 'exeggumoramora') return 'White Herb';
		if (species.id === 'rolyklawfy') return 'Focus Sash';
		if (species.id === 'necromaneduskmane' || species.id === 'ferrothorns') return 'Booster Energy';
		if (species.id === 'gigawrath') return 'Choice Band';
		if (species.id === 'yvenne') return this.sample(['Shell Bell', 'Life Orb', 'Leftovers', 'Heavy-Duty Boots']);
		if (species.id === 'raichudus' && moves.has('swagger')) return 'lumberry';
		if (moves.has('lastrespects') || moves.has('dragonenergy')) return 'Choice Scarf';
		if (moves.has('bellydrum') && moves.has('substitute')) return 'Salac Berry';
		if (['healingwish', 'switcheroo', 'trick'].some(m => moves.has(m))) {
			if (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				role !== 'Wallbreaker' && role !== 'Doubles Wallbreaker' && !counter.get('priority')
			) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (species.nfe) return 'Eviolite';
		if ((ability === 'Goon Drive' || moves.has('facade')) && !moves.has('sleeptalk')) {
			return (types.includes('Fire') || ability === 'Toxic Boost') ? 'Toxic Orb' : 'Flame Orb';
		}
		if (moves.has('courtchange')) return 'Heavy-Duty Boots';
		if (
			moves.has('scaleshot') || (species.id === 'torterra' && !isDoubles) ||
			(species.id === 'cinccino' && role !== 'Wallbreaker')
		) return 'Loaded Dice';
		if (moves.has('shellsmash') && ability !== 'Weak Armor') return 'White Herb';
		if (moves.has('meteorbeam') || (moves.has('electroshot') && !teamDetails.rain)) return 'Power Herb';
		if (moves.has('acrobatics') && ability !== 'Protosynthesis') return '';
		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (
			moves.has('rest') && !moves.has('sleeptalk') &&
			ability !== 'Natural Cure' && ability !== 'Shed Skin'
		) {
			return 'Chesto Berry';
		}
		if (
			species.id !== 'yanmega' &&
			this.dex.getEffectiveness('Rock', species) >= 2 && (!types.includes('Flying') || !isDoubles)
		) return 'Heavy-Duty Boots';
	}

	/** Item generation specific to Random Doubles */
	getDoublesItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): string {
		const scarfReqs = (
			!counter.get('priority') && ability !== 'Speed Boost' && role !== 'Doubles Wallbreaker' &&
			species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
			this.randomChance(1, 2)
		);
		const offensiveRole = (
			['Doubles Fast Attacker', 'Doubles Wallbreaker', 'Doubles Setup Sweeper', 'Offensive Protect'].some(m => role === m)
		);

		if (species.id === 'ursalunabloodmoon' || (moves.has('doubleedge') && moves.has('fakeout'))) return 'Silk Scarf';
		if (
			moves.has('flipturn') && moves.has('protect') && (moves.has('aquajet') || (moves.has('jetpunch')))
		) return 'Mystic Water';
		if (moves.has('dragondance')) return 'Clear Amulet';
		if (moves.has('waterspout')) return 'Choice Scarf';
		if (counter.get('speedsetup') && role === 'Doubles Bulky Setup') return 'Weakness Policy';
		if (species.id === 'toxapex') return 'Binding Band';
		if (moves.has('blizzard') && ability !== 'Snow Warning' && !teamDetails.snow) return 'Blunder Policy';

		if (role === 'Choice Item user') {
			if (scarfReqs || (counter.get('Physical') < 4 && counter.get('Special') < 3 && !moves.has('memento'))) {
				return 'Choice Scarf';
			}
			return (counter.get('Physical') >= 3) ? 'Choice Band' : 'Choice Specs';
		}
		if (counter.get('Physical') >= 4 &&
			['fakeout', 'feint', 'firstimpression', 'rapidspin', 'suckerpunch'].every(m => !moves.has(m)) &&
			(moves.has('flipturn') || moves.has('uturn') || role === 'Doubles Wallbreaker')
		) {
			return (scarfReqs) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			((counter.get('Special') >= 4 && (moves.has('voltswitch') || role === 'Doubles Wallbreaker')) || (
				counter.get('Special') >= 3 && (moves.has('uturn') || moves.has('flipturn'))
			)) && !moves.has('electroweb')
		) {
			return (scarfReqs) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (species.name === 'Latias' || species.name === 'Latios') return 'Soul Dew';
		if (
			(role === 'Bulky Protect' && counter.get('setup')) || moves.has('substitute') ||
			species.id === 'eternatus'
		) return 'Leftovers';
		if (species.id === 'sylveon') return 'Pixie Plate';
		if (
			(offensiveRole || (role === 'Tera Blast user' && (species.baseStats.spe >= 80 || moves.has('trickroom')))) &&
			(!moves.has('fakeout') || species.id === 'ambipom') && !moves.has('incinerate') &&
			(!moves.has('uturn') || types.includes('Bug') || species.baseStats.atk >= 120 || ability === 'Libero') &&
			((!moves.has('icywind') && !moves.has('electroweb')) || species.id === 'ironbundle')
		) {
			return (
				(ability === 'As One (OU)' || ability === 'Ancient Pyramid') &&
				['firstimpression', 'uturn', 'voltswitch'].every(m => !moves.has(m)) && species.id !== 'ironvaliant'
			) ? 'Booster Energy' : 'Life Orb';
		}
		if (isLead && (species.id === 'glimmora' ||
			(['Doubles Fast Attacker', 'Doubles Wallbreaker', 'Offensive Protect'].includes(role) &&
			species.baseStats.hp + species.baseStats.def + species.baseStats.spd <= 230))
		) return 'Focus Sash';
		if (
			['Doubles Fast Attacker', 'Doubles Wallbreaker', 'Offensive Protect'].includes(role) &&
			moves.has('fakeout') || moves.has('incinerate')
		) {
			return (this.dex.getEffectiveness('Rock', species) >= 1) ? 'Heavy-Duty Boots' : 'Clear Amulet';
		}
		if (!counter.get('Status')) return 'Assault Vest';
		return 'Sitrus Berry';
	}

	getItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): string {
		if (types.includes('Normal') && moves.has('fakeout')) return 'Silk Scarf';
		if (
			species.id !== 'jirachi' && (counter.get('Physical') >= 4) &&
			['fakeout', 'firstimpression', 'flamecharge', 'rapidspin', 'ruination', 'superfang'].every(m => !moves.has(m))
		) {
			const scarfReqs = (
				role !== 'Wallbreaker' &&
				(species.baseStats.atk >= 100 || ability === 'Huge Power' || ability === 'Pure Power') &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && !counter.get('priority') && !moves.has('aquastep')
			);
			return (scarfReqs && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			(counter.get('Special') >= 4) ||
			(counter.get('Special') >= 3 && ['flipturn', 'partingshot', 'uturn'].some(m => moves.has(m)))
		) {
			const scarfReqs = (
				role !== 'Wallbreaker' &&
				species.baseStats.spa >= 100 &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && ability !== 'Tinted Lens' && !counter.get('Physical')
			);
			return (scarfReqs && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (counter.get('speedsetup') && role === 'Bulky Setup') return 'Weakness Policy';
		if (
			!counter.get('Status') &&
			(moves.has('rapidspin') || !['Fast Attacker', 'Wallbreaker', 'Tera Blast user'].includes(role))
		) {
			return 'Assault Vest';
		}
		
		if (moves.has('substitute')) return 'Leftovers';
		if (this.dex.getEffectiveness('Rock', species) >= 1) return 'Heavy-Duty Boots';
		if (
			(moves.has('chillyreception') || (
				role === 'Fast Support' &&
				[...PIVOT_MOVES, 'defog', 'mortalspin', 'rapidspin'].some(m => moves.has(m)) &&
				!types.includes('Flying') && ability !== 'Levitate'
			))
		) return 'Heavy-Duty Boots';

		// Low Priority
		if (
			(species.id === 'garchomp' && role === 'Fast Support') || (
				ability === 'Regenerator' && (role === 'Bulky Support' || role === 'Bulky Attacker') &&
				(species.baseStats.hp + species.baseStats.def) >= 180 && this.randomChance(1, 2)
			)
		) return 'Rocky Helmet';
		if (moves.has('outrage')) return 'Lum Berry';
		if (moves.has('protect')) return 'Leftovers';
		if (
			role === 'Fast Support' && isLead &&
			!counter.get('recovery') && !counter.get('recoil') &&
			(species.baseStats.hp + species.baseStats.def + species.baseStats.spd) < 258
		) return 'Focus Sash';
		if (
			!['Fast Attacker', 'Wallbreaker', 'Tera Blast user'].includes(role) && ability !== 'Levitate' &&
			this.dex.getEffectiveness('Ground', species) >= 2
		) return 'Air Balloon';
		if (['Bulky Attacker', 'Bulky Support', 'Bulky Setup'].some(m => role === (m))) return 'Leftovers';
		if (
			['Fast Bulky Setup', 'Fast Attacker', 'Setup Sweeper', 'Wallbreaker'].some(m => role === m) &&
			types.includes('Dark') && moves.has('suckerpunch') && !PRIORITY_POKEMON.includes(species.id) &&
			counter.get('physicalsetup') && counter.get('Dark')
		) return 'Black Glasses';
		if (role === 'Fast Support' || role === 'Fast Bulky Setup') {
			return (counter.get('Physical') + counter.get('Special') >= 3 && !moves.has('nuzzle')) ? 'Life Orb' : 'Leftovers';
		}
		if (role === 'Tera Blast user' && DEFENSIVE_TERA_BLAST_USERS.includes(species.id)) return 'Leftovers';
		if (
			['flamecharge', 'rapidspin', 'trailblaze'].every(m => !moves.has(m)) &&
			['Fast Attacker', 'Setup Sweeper', 'Tera Blast user', 'Wallbreaker'].some(m => role === (m))
		) return 'Life Orb';
		return 'Leftovers';
	}

	getLevel(
		species: Species,
		isDoubles: boolean,
	): number {
		if (this.adjustLevel) return this.adjustLevel;
		if (!isDoubles && this.randomSets[species.id]["level"]) return this.randomSets[species.id]["level"]!;
		// Default to tier-based levelling
		const tier = species.tier;
		const tierScale: Partial<Record<Species['tier'], number>> = {
			Uber: 76,
			OU: 80,
			UUBL: 81,
			UU: 82,
			RUBL: 83,
			RU: 84,
			NUBL: 85,
			NU: 86,
			PUBL: 87,
			PU: 88, "(PU)": 88, NFE: 88,
		};
		return tierScale[tier] || 80;
	}

	randomSet(
		s: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false,
		isDoubles = false
	): RandomTeamsTypes.RandomSet {
		const species = this.dex.species.get(s);
		let forme = species.name;

		if (typeof species.battleOnly === 'string') {
			// Only change the forme. The species has custom moves, and may have different typing and requirements.
			forme = species.battleOnly;
		}
		if (species.cosmeticFormes) {
			forme = this.sample([species.name].concat(species.cosmeticFormes));
		}
		const sets = (this as any)['randomSets'][species.id]["sets"];
		const possibleSets = [];

		const ruleTable = this.dex.formats.getRuleTable(this.format);

		for (const set of sets) {
			// Prevent Tera Blast user if the team already has one, or if Terastallizion is prevented.
			if ((teamDetails.teraBlast || ruleTable.has('terastalclause')) && set.role === 'Tera Blast user') {
				continue;
			}
			possibleSets.push(set);
		}
		const set = this.sampleIfArray(possibleSets);
		const role = set.role;
		const movePool: string[] = [];
		for (const movename of set.movepool) {
			movePool.push(this.dex.moves.get(movename).id);
		}
		const teraTypes = set.teraTypes;
		const teraType = this.sampleIfArray(teraTypes);

		let ability = '';
		let item = undefined;

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = species.types;
		const abilities = new Set(Object.values(species.abilities));
		if (species.unreleasedHidden) abilities.delete(species.abilities.H);

		// Get moves
		const moves = this.randomMoveset(types, abilities, teamDetails, species, isLead, isDoubles, movePool, teraType, role);
		const counter = this.queryMoves(moves, species, teraType, abilities);

		// Get ability
		ability = this.getAbility(types, moves, abilities, counter, teamDetails, species, isLead, isDoubles, teraType, role);

		// Get items
		// First, the priority items
		item = this.getPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, isDoubles, teraType, role);
		if (item === undefined) {
			if (isDoubles) {
				item = this.getDoublesItem(ability, types, moves, counter, teamDetails, species, isLead, teraType, role);
			} else {
				item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, teraType, role);
			}
		}

		// Get level
		const level = this.getLevel(species, isDoubles);

		// Prepare optimal HP
		const srImmunity = ability === 'Magic Guard' || item === 'Heavy-Duty Boots';
		let srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		// Crash damage move users want an odd HP to survive two misses
		if (['axekick', 'highjumpkick', 'jumpkick'].some(m => moves.has(m))) srWeakness = 2;
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if ((moves.has('substitute') && ['Sitrus Berry', 'Salac Berry'].includes(item))) {
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if ((moves.has('bellydrum') || moves.has('filletaway')) && (item === 'Sitrus Berry' || ability === 'Gluttony')) {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else if (moves.has('substitute') && moves.has('endeavor')) {
				// Luvdisc should be able to Substitute down to very low HP
				if (hp % 4 > 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || ability === 'Regenerator' || ['Leftovers', 'Life Orb'].includes(item)) break;
				if (item !== 'Sitrus Berry' && hp % (4 / srWeakness) > 0) break;
				// Minimise number of Stealth Rock switch-ins to activate Sitrus Berry
				if (item === 'Sitrus Berry' && hp % (4 / srWeakness) === 0) break;
			}
			evs.hp -= 4;
		}

		// Minimize confusion damage
		const noAttackStatMoves = [...moves].every(m => {
			const move = this.dex.moves.get(m);
			if (move.damageCallback || move.damage) return true;
			if (move.id === 'shellsidearm') return false;
			// Magearna and doubles Dragonite, though these can work well as a general rule
			if (move.id === 'terablast' && (
				species.id === 'porygon2' || moves.has('shiftgear') || species.baseStats.atk > species.baseStats.spa)
			) return false;
			return move.category !== 'Physical' || move.id === 'bodypress' || move.id === 'foulplay';
		});
		if (noAttackStatMoves && !moves.has('transform') && this.format.mod !== 'partnersincrime') {
			evs.atk = 0;
			ivs.atk = 0;
		}

		if (moves.has('gyroball') || moves.has('trickroom') || species.baseSpecies === 'Bearlamar') {
			evs.spe = 0;
			ivs.spe = 0;
		}
		
		//the funny
		if (species.baseSpecies === 'Kyuwear') {
			evs.hp = 252;
			evs.atk = 0;
			ivs.atk = 31;
			evs.def = 0;
			evs.spa = 0;
			evs.spd = 0;
			evs.spe = 0;
		}

		// shuffle moves to add more randomness to camomons
		const shuffledMoves = Array.from(moves);
		this.prng.shuffle(shuffledMoves);
		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.baseSpecies === 'Greninja' ? 'M' : species.gender,
			shiny: this.randomChance(1, 100),
			level,
			moves: shuffledMoves,
			ability,
			evs,
			ivs,
			item,
			teraType,
			role,
		};
	}

	getPokemonPool(
		type: string,
		pokemonToExclude: RandomTeamsTypes.RandomSet[] = [],
		isMonotype = false,
		pokemonList: string[]
	) {
		const exclude = pokemonToExclude.map(p => toID(p.species));
		const pokemonPool = [];
		const baseSpeciesPool = [];
		const baseSpeciesCount: {[k: string]: number} = {};
		//if(pokemonList.length == 1) console.log(exclude);
		for (const pokemon of pokemonList) {
			let species = this.dex.species.get(pokemon);
			if (exclude.includes(species.id) && pokemonList.length != 1) continue;
			if (isMonotype) {
				if (!species.types.includes(type)) continue;
				if (typeof species.battleOnly === 'string') {
					species = this.dex.species.get(species.battleOnly);
					if (!species.types.includes(type)) continue;
				}
			}
			pokemonPool.push(pokemon);
			baseSpeciesCount[species.baseSpecies] = (baseSpeciesCount[species.baseSpecies] || 0) + 1;
		}
		// Include base species 1x if 1-3 formes, 2x if 4-6 formes, 3x if 7+ formes
		for (const baseSpecies of Object.keys(baseSpeciesCount)) {
			for (let i = 0; i < Math.min(Math.ceil(baseSpeciesCount[baseSpecies] / 3), 3); i++) {
				baseSpeciesPool.push(baseSpecies);
				// Squawkabilly has 4 formes, but only 2 functionally different formes, so only include it 1x
				if (baseSpecies === 'Squawkabilly') break;
			}
		}
		if(pokemonPool.length == 0) pokemonPool.push(pokemonList[0]);
		return [pokemonPool, baseSpeciesPool];
	}

	randomSets: {[species: string]: RandomTeamsTypes.RandomSpeciesData} = require('./random-sets.json');

	randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.seed;
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const isDoubles = this.format.gameType !== 'singles';
		const typePool = this.dex.types.names().filter(name => name !== "Stellar");
		const type = this.forceMonotype || this.sample(typePool);

		// PotD stuff
		const usePotD = global.Config && Config.potd && ruleTable.has('potd');
		const potd = usePotD ? this.dex.species.get(Config.potd) : null;

		const baseFormes: {[k: string]: number} = {};

		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};
		let numMaxLevelPokemon = 0;

		const pokemonList = Object.keys(this.randomSets);
		const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, pokemonList);
		const [darkPool, darkBasePool] = this.getPokemonPool('Dark', pokemon, true, pokemonList);
		const [koraislePool, koraisleBasePool] = this.getPokemonPool(type, pokemon, true, ['koraisle']);
		const [mirainunPool, mirainunBasePool] = this.getPokemonPool(type, pokemon, true, ['mirainun']);

		let leadsRemaining = this.format.gameType === 'doubles' ? 2 : 1;
		while (baseSpeciesPool.length && pokemon.length < this.maxTeamSize) {
			let temp;
			let species;
			//if koraisle, pick mirainun immediately
			if(teamDetails.koraisle && teamDetails.koraisle == 1) {
				if(mirainunPool.length != 0) {
					temp = mirainunPool[0];
					species = this.dex.species.get(temp);
				}
				teamDetails.koraisle ++;
			}
			//if mirainun, pick koraisle immediately
			else if(teamDetails.mirainun && teamDetails.mirainun == 1) {
				if(koraislePool.length != 0) {
					temp = koraislePool[0];
					species = this.dex.species.get(temp);
				}
				teamDetails.mirainun ++;
			}
			else if(teamDetails.beetar && teamDetails.beetar == 1 && this.randomChance(1, 2)) {
				species = this.dex.species.get('scolislash');
				teamDetails.beetar ++;
			}
			else if(teamDetails.scolislash && teamDetails.scolislash == 1 && this.randomChance(1, 2)) {
				species = this.dex.species.get('scolislash');
				teamDetails.scolislash ++;
			}
			else if(teamDetails.chiruno && teamDetails.chiruno == 1 && this.randomChance(1, 4)) {
				species = this.dex.species.get('avalluxe');
				teamDetails.chiruno ++;
			}
			else if(teamDetails.avalluxe && teamDetails.avalluxe == 1 && this.randomChance(1, 4)) {
				species = this.dex.species.get('chiruno');
				teamDetails.avalluxe ++;
			}
			//if kingcario, pick a dark half the time
			else if(teamDetails.dark && this.randomChance(1, 2)) {
				temp = this.sampleNoReplace(darkBasePool);
				const baseSpecies = temp;
				const currentSpeciesPool: Species[] = [];
				for (const poke of pokemonPool) {
					const species = this.dex.species.get(poke);
					if (species.baseSpecies === baseSpecies) currentSpeciesPool.push(species);
				}
				species = this.sample(currentSpeciesPool);
			}
			//otherwise sample normally
			else {
				temp = this.sampleNoReplace(baseSpeciesPool);
				const baseSpecies = temp;
				const currentSpeciesPool: Species[] = [];
				for (const poke of pokemonPool) {
					const species = this.dex.species.get(poke);
					if (species.baseSpecies === baseSpecies) currentSpeciesPool.push(species);
				}
				species = this.sample(currentSpeciesPool);
			}

			if (!species.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[species.baseSpecies]) {
				continue;
			}

			// koraisle/mirainun cant be last slot if there isnt the respective pair already there
			if (((species.baseSpecies === 'Koraisle' && !teamDetails.mirainun) || (species.baseSpecies === 'Mirainun' && !teamDetails.koraisle)) && pokemon.length >= (this.maxTeamSize - 1)) {
				continue;
			}
			
			// pair koraisle and mirainun together
			if (species.baseSpecies === 'Koraisle' && !teamDetails.mirainun) teamDetails.koraisle = 1;
			if (species.baseSpecies === 'Mirainun' && !teamDetails.koraisle) teamDetails.mirainun = 1;
			
			// have higher likelihood to pair beetar and scolislash together
			if (species.baseSpecies === 'Beetar' && !teamDetails.scolislash) teamDetails.beetar = 1;
			if (species.baseSpecies === 'Scolislash' && !teamDetails.beetar) teamDetails.scolislash = 1;
			
			// have higher likelihood to pair chiruno and avalluxe together
			if (species.baseSpecies === 'Chiruno' && !teamDetails.avalluxe) teamDetails.beetar = 1;
			if (species.baseSpecies === 'Avalluxe' && !teamDetails.chiruno) teamDetails.avalluxe = 1;
			
			// if kingcario start ignoring combining type weaknesses
			if (species.baseSpecies === 'Kingcario') teamDetails.dark = true;

			const types = species.types;
			const typeCombo = types.slice().sort().join();
			const weakToFreezeDry = (
				this.dex.getEffectiveness('Ice', species) > 0 ||
				(this.dex.getEffectiveness('Ice', species) > -2 && types.includes('Water'))
			);
			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			if (!isMonotype && !this.forceMonotype) {
				let skip = false;

				// Limit two of any type
				for (const typeName of types) {
					if (!teamDetails.dark && !teamDetails.koraisle && !teamDetails.mirainun && !teamDetails.beetar && !teamDetails.scolislash && typeCount[typeName] >= 2 * limitFactor) {
						skip = true;
						break;
					}
				}
				if (skip) continue;

				// Limit three weak to any type
				for (const typeName of this.dex.types.names()) {
					// it's weak to the type
					if (!teamDetails.dark && !teamDetails.koraisle && !teamDetails.mirainun && !teamDetails.beetar && !teamDetails.scolislash && this.dex.getEffectiveness(typeName, species) > 0) {
						if (!typeWeaknesses[typeName]) typeWeaknesses[typeName] = 0;
						if (typeWeaknesses[typeName] >= 3 * limitFactor) {
							skip = true;
							break;
						}
					}
				}
				if (skip) continue;

				// Limit four weak to Freeze-Dry
				if (weakToFreezeDry) {
					if (!typeWeaknesses['Freeze-Dry']) typeWeaknesses['Freeze-Dry'] = 0;
					if (typeWeaknesses['Freeze-Dry'] >= 4 * limitFactor){
						continue;
					}
				}
			}

			// The Pokemon of the Day
			if (potd?.exists && (pokemon.length === 1 || this.maxTeamSize === 1)) species = potd;

			let set: RandomTeamsTypes.RandomSet;

			if (leadsRemaining) {
				if (
					isDoubles && DOUBLES_NO_LEAD_POKEMON.includes(species.baseSpecies) ||
					!isDoubles && NO_LEAD_POKEMON.includes(species.baseSpecies)
				) {
					if (pokemon.length + leadsRemaining === this.maxTeamSize) continue;
					set = this.randomSet(species, teamDetails, false, false);
					pokemon.push(set);
				} else {
					set = this.randomSet(species, teamDetails, true, false);
					pokemon.unshift(set);
					leadsRemaining--;
				}
			} else {
				set = this.randomSet(species, teamDetails, false, false);
				pokemon.push(set);
			}

			// Don't bother tracking details for the last Pokemon
			if (pokemon.length === this.maxTeamSize) break;

			// Now that our Pokemon has passed all checks, we can increment our counters
			baseFormes[species.baseSpecies] = 1;

			// Increment type counters
			for (const typeName of types) {
				if (typeName in typeCount) {
					typeCount[typeName]++;
				} else {
					typeCount[typeName] = 1;
				}
			}
			if (typeCombo in typeComboCount) {
				typeComboCount[typeCombo]++;
			} else {
				typeComboCount[typeCombo] = 1;
			}

			// Increment weakness counter
			for (const typeName of this.dex.types.names()) {
				// it's weak to the type
				if (this.dex.getEffectiveness(typeName, species) > 0) {
					typeWeaknesses[typeName]++;
				}
			}
			if (weakToFreezeDry) typeWeaknesses['Freeze-Dry']++;

			// Increment level 100 counter
			if (set.level === 100) numMaxLevelPokemon++;

			// Track what the team has
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Drought' || set.ability === 'Orichalcum Pulse' || set.moves.includes('sunnyday')) {
				teamDetails.sun = 1;
			}
			//if (set.role === 'Mega') teamDetails.mega = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.ability === 'Defensive Ice' || set.moves.includes('snowscape') || set.moves.includes('chillyreception')) {
				teamDetails.snow = 1;
			}
			if (set.moves.includes('spikes') || set.moves.includes('ceaselessedge')) {
				teamDetails.spikes = (teamDetails.spikes || 0) + 1;
			}
			if (set.moves.includes('toxicspikes') || set.ability === 'Toxic Debris') {
				teamDetails.toxicSpikes = (teamDetails.toxicSpikes || 0) + 1;
			}
			if (set.moves.includes('stealthrock') || set.moves.includes('stoneaxe')) teamDetails.stealthRock = 1;
			if (set.moves.includes('stickyweb')) teamDetails.stickyWeb = 1;
			if (set.moves.includes('defog')) teamDetails.defog = 1;
			if (set.moves.includes('rapidspin') || set.moves.includes('mortalspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('auroraveil') || (set.moves.includes('reflect') && set.moves.includes('lightscreen'))) {
				teamDetails.screens = 1;
			}
			if (set.role === 'Tera Blast user' || species.baseSpecies === "Ogerpon" || species.baseSpecies === "Terapagos") {
				teamDetails.teraBlast = 1;
			}
		}
		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) { // large teams sometimes cannot be built
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}
		return pokemon;
	}

	randomCCTeam(): RandomTeamsTypes.RandomSet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const dex = this.dex;
		const team = [];

		const natures = this.dex.natures.all();
		const items = this.dex.items.all();

		const randomN = this.randomNPokemon(this.maxTeamSize, this.forceMonotype, undefined, undefined, true);

		for (let forme of randomN) {
			let species = dex.species.get(forme);
			if (species.isNonstandard) species = dex.species.get(species.baseSpecies);

			// Random legal item
			let item = '';
			let isIllegalItem;
			let isBadItem;
			if (this.gen >= 2) {
				do {
					item = this.sample(items).name;
					isIllegalItem = this.dex.items.get(item).gen > this.gen || this.dex.items.get(item).isNonstandard;
					isBadItem = item.startsWith("TR") || this.dex.items.get(item).isPokeball;
				} while (isIllegalItem || (isBadItem && this.randomChance(19, 20)));
			}

			// Make sure forme is legal
			if (species.battleOnly) {
				if (typeof species.battleOnly === 'string') {
					species = dex.species.get(species.battleOnly);
				} else {
					species = dex.species.get(this.sample(species.battleOnly));
				}
				forme = species.name;
			} else if (species.requiredItems && !species.requiredItems.some(req => toID(req) === item)) {
				if (!species.changesFrom) throw new Error(`${species.name} needs a changesFrom value`);
				species = dex.species.get(species.changesFrom);
				forme = species.name;
			}

			// Make sure that a base forme does not hold any forme-modifier items.
			let itemData = this.dex.items.get(item);
			if (itemData.forcedForme && forme === this.dex.species.get(itemData.forcedForme).baseSpecies) {
				do {
					itemData = this.sample(items);
					item = itemData.name;
				} while (
					itemData.gen > this.gen ||
					itemData.isNonstandard ||
					(itemData.forcedForme && forme === this.dex.species.get(itemData.forcedForme).baseSpecies)
				);
			}

			// Random legal ability
			const abilities = Object.values(species.abilities).filter(a => this.dex.abilities.get(a).gen <= this.gen);
			const ability: string = this.gen <= 2 ? 'No Ability' : this.sample(abilities);

			// Four random unique moves from the movepool
			let pool = ['struggle'];
			if (forme === 'Smeargle') {
				pool = this.dex.moves.all()
					.filter(move => !(move.isNonstandard || move.isZ || move.isMax || move.realMove))
					.map(m => m.id);
			} else {
				pool = [...this.dex.species.getMovePool(species.id)];
			}

			const moves = this.multipleSamplesNoReplace(pool, this.maxMoveCount);

			// Random EVs
			const evs: StatsTable = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			const s: StatID[] = ["hp", "atk", "def", "spa", "spd", "spe"];
			let evpool = 510;
			do {
				const x = this.sample(s);
				const y = this.random(Math.min(256 - evs[x], evpool + 1));
				evs[x] += y;
				evpool -= y;
			} while (evpool > 0);

			// Random IVs
			const ivs = {
				hp: this.random(32),
				atk: this.random(32),
				def: this.random(32),
				spa: this.random(32),
				spd: this.random(32),
				spe: this.random(32),
			};

			// Random nature
			const nature = this.sample(natures).name;

			// Level balance--calculate directly from stats rather than using some silly lookup table
			const mbstmin = 1307; // Sunkern has the lowest modified base stat total, and that total is 807

			let stats = species.baseStats;
			// If Wishiwashi, use the school-forme's much higher stats
			if (species.baseSpecies === 'Wishiwashi') stats = Dex.species.get('wishiwashischool').baseStats;
			// If Terapagos, use Terastal-forme's stats
			if (species.baseSpecies === 'Terapagos') stats = Dex.species.get('terapagosterastal').baseStats;

			// Modified base stat total assumes 31 IVs, 85 EVs in every stat
			let mbst = (stats["hp"] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats["atk"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["def"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spa"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spd"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spe"] * 2 + 31 + 21 + 100) + 5;

			let level;
			if (this.adjustLevel) {
				level = this.adjustLevel;
			} else {
				level = Math.floor(100 * mbstmin / mbst); // Initial level guess will underestimate

				while (level < 100) {
					mbst = Math.floor((stats["hp"] * 2 + 31 + 21 + 100) * level / 100 + 10);
					// Since damage is roughly proportional to level
					mbst += Math.floor(((stats["atk"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["def"] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor(((stats["spa"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["spd"] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor((stats["spe"] * 2 + 31 + 21 + 100) * level / 100 + 5);

					if (mbst >= mbstmin) break;
					level++;
				}
			}

			// Random happiness
			const happiness = this.random(256);

			// Random shininess
			const shiny = this.randomChance(1, 1024);

			const set: RandomTeamsTypes.RandomSet = {
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item,
				ability,
				moves,
				evs,
				ivs,
				nature,
				level,
				happiness,
				shiny,
			};
			if (this.gen === 9) {
				// Tera type
				set.teraType = this.sample(this.dex.types.all()).name;
			}
			team.push(set);
		}

		return team;
	}

	randomNPokemon(n: number, requiredType?: string, minSourceGen?: number, ruleTable?: RuleTable, requireMoves = false) {
		// Picks `n` random pokemon--no repeats, even among formes
		// Also need to either normalize for formes or select formes at random
		// Unreleased are okay but no CAP
		if (requiredType && !this.dex.types.get(requiredType).exists) {
			throw new Error(`"${requiredType}" is not a valid type.`);
		}

		const isNotCustom = !ruleTable;

		const pool: number[] = [];
		let speciesPool: Species[] = [];
		if (isNotCustom) {
			speciesPool = [...this.dex.species.all()];
			for (const species of speciesPool) {
				if (species.isNonstandard && species.isNonstandard !== 'Unobtainable') continue;
				if (requireMoves) {
					const hasMovesInCurrentGen = this.dex.species.getMovePool(species.id).size;
					if (!hasMovesInCurrentGen) continue;
				}
				if (requiredType && !species.types.includes(requiredType)) continue;
				if (minSourceGen && species.gen < minSourceGen) continue;
				const num = species.num;
				if (num <= 0 || pool.includes(num)) continue;
				pool.push(num);
			}
		} else {
			const EXISTENCE_TAG = ['past', 'future', 'lgpe', 'unobtainable', 'cap', 'custom', 'nonexistent'];
			const nonexistentBanReason = ruleTable.check('nonexistent');
			// Assume tierSpecies does not differ from species here (mega formes can be used without their stone, etc)
			for (const species of this.dex.species.all()) {
				if (requiredType && !species.types.includes(requiredType)) continue;

				let banReason = ruleTable.check('pokemon:' + species.id);
				if (banReason) continue;
				if (banReason !== '') {
					if (species.isMega && ruleTable.check('pokemontag:mega')) continue;

					banReason = ruleTable.check('basepokemon:' + toID(species.baseSpecies));
					if (banReason) continue;
					if (banReason !== '' || this.dex.species.get(species.baseSpecies).isNonstandard !== species.isNonstandard) {
						const nonexistentCheck = Tags.nonexistent.genericFilter!(species) && nonexistentBanReason;
						let tagWhitelisted = false;
						let tagBlacklisted = false;
						for (const ruleid of ruleTable.tagRules) {
							if (ruleid.startsWith('*')) continue;
							const tagid = ruleid.slice(12);
							const tag = Tags[tagid];
							if ((tag.speciesFilter || tag.genericFilter)!(species)) {
								const existenceTag = EXISTENCE_TAG.includes(tagid);
								if (ruleid.startsWith('+')) {
									if (!existenceTag && nonexistentCheck) continue;
									tagWhitelisted = true;
									break;
								}
								tagBlacklisted = true;
								break;
							}
						}
						if (tagBlacklisted) continue;
						if (!tagWhitelisted) {
							if (ruleTable.check('pokemontag:allpokemon')) continue;
						}
					}
				}
				speciesPool.push(species);
				const num = species.num;
				if (pool.includes(num)) continue;
				pool.push(num);
			}
		}

		const hasDexNumber: {[k: string]: number} = {};
		for (let i = 0; i < n; i++) {
			const num = this.sampleNoReplace(pool);
			hasDexNumber[num] = i;
		}

		const formes: string[][] = [];
		for (const species of speciesPool) {
			if (!(species.num in hasDexNumber)) continue;
			if (isNotCustom && (species.gen > this.gen ||
				(species.isNonstandard && species.isNonstandard !== 'Unobtainable'))) continue;
			if (requiredType && !species.types.includes(requiredType)) continue;
			if (!formes[hasDexNumber[species.num]]) formes[hasDexNumber[species.num]] = [];
			formes[hasDexNumber[species.num]].push(species.name);
		}

		if (formes.length < n) {
			throw new Error(`Legal Pokemon forme count insufficient to support Max Team Size: (${formes.length} / ${n}).`);
		}

		const nPokemon = [];
		for (let i = 0; i < n; i++) {
			if (!formes[i].length) {
				throw new Error(`Invalid pokemon gen ${this.gen}: ${JSON.stringify(formes)} numbers ${JSON.stringify(hasDexNumber)}`);
			}
			nPokemon.push(this.sample(formes[i]));
		}
		return nPokemon;
	}

	randomHCTeam(): PokemonSet[] {
		const hasCustomBans = this.hasDirectCustomBanlistChanges();
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const hasNonexistentBan = hasCustomBans && ruleTable.check('nonexistent');
		const hasNonexistentWhitelist = hasCustomBans && (hasNonexistentBan === '');

		if (hasCustomBans) {
			this.enforceNoDirectComplexBans();
		}

		// Item Pool
		const doItemsExist = this.gen > 1;
		let itemPool: Item[] = [];
		if (doItemsExist) {
			if (!hasCustomBans) {
				itemPool = [...this.dex.items.all()].filter(item => (item.gen <= this.gen && !item.isNonstandard));
			} else {
				const hasAllItemsBan = ruleTable.check('pokemontag:allitems');
				for (const item of this.dex.items.all()) {
					let banReason = ruleTable.check('item:' + item.id);
					if (banReason) continue;
					if (banReason !== '' && item.id) {
						if (hasAllItemsBan) continue;
						if (item.isNonstandard) {
							banReason = ruleTable.check('pokemontag:' + toID(item.isNonstandard));
							if (banReason) continue;
							if (banReason !== '' && item.isNonstandard !== 'Unobtainable') {
								if (hasNonexistentBan) continue;
								if (!hasNonexistentWhitelist) continue;
							}
						}
					}
					itemPool.push(item);
				}
				if (ruleTable.check('item:noitem')) {
					this.enforceCustomPoolSizeNoComplexBans('item', itemPool, this.maxTeamSize, 'Max Team Size');
				}
			}
		}

		// Ability Pool
		const doAbilitiesExist = (this.gen > 2) && (this.dex.currentMod !== 'gen7letsgo');
		let abilityPool: Ability[] = [];
		if (doAbilitiesExist) {
			if (!hasCustomBans) {
				abilityPool = [...this.dex.abilities.all()].filter(ability => (ability.gen <= this.gen && !ability.isNonstandard));
			} else {
				const hasAllAbilitiesBan = ruleTable.check('pokemontag:allabilities');
				for (const ability of this.dex.abilities.all()) {
					let banReason = ruleTable.check('ability:' + ability.id);
					if (banReason) continue;
					if (banReason !== '') {
						if (hasAllAbilitiesBan) continue;
						if (ability.isNonstandard) {
							banReason = ruleTable.check('pokemontag:' + toID(ability.isNonstandard));
							if (banReason) continue;
							if (banReason !== '') {
								if (hasNonexistentBan) continue;
								if (!hasNonexistentWhitelist) continue;
							}
						}
					}
					abilityPool.push(ability);
				}
				if (ruleTable.check('ability:noability')) {
					this.enforceCustomPoolSizeNoComplexBans('ability', abilityPool, this.maxTeamSize, 'Max Team Size');
				}
			}
		}

		// Move Pool
		const setMoveCount = ruleTable.maxMoveCount;
		let movePool: Move[] = [];
		if (!hasCustomBans) {
			movePool = [...this.dex.moves.all()].filter(move =>
				(move.gen <= this.gen && !move.isNonstandard));
		} else {
			const hasAllMovesBan = ruleTable.check('pokemontag:allmoves');
			for (const move of this.dex.moves.all()) {
				let banReason = ruleTable.check('move:' + move.id);
				if (banReason) continue;
				if (banReason !== '') {
					if (hasAllMovesBan) continue;
					if (move.isNonstandard) {
						banReason = ruleTable.check('pokemontag:' + toID(move.isNonstandard));
						if (banReason) continue;
						if (banReason !== '' && move.isNonstandard !== 'Unobtainable') {
							if (hasNonexistentBan) continue;
							if (!hasNonexistentWhitelist) continue;
						}
					}
				}
				movePool.push(move);
			}
			this.enforceCustomPoolSizeNoComplexBans('move', movePool, this.maxTeamSize * setMoveCount, 'Max Team Size * Max Move Count');
		}

		// Nature Pool
		const doNaturesExist = this.gen > 2;
		let naturePool: Nature[] = [];
		if (doNaturesExist) {
			if (!hasCustomBans) {
				naturePool = [...this.dex.natures.all()];
			} else {
				const hasAllNaturesBan = ruleTable.check('pokemontag:allnatures');
				for (const nature of this.dex.natures.all()) {
					let banReason = ruleTable.check('nature:' + nature.id);
					if (banReason) continue;
					if (banReason !== '' && nature.id) {
						if (hasAllNaturesBan) continue;
						if (nature.isNonstandard) {
							banReason = ruleTable.check('pokemontag:' + toID(nature.isNonstandard));
							if (banReason) continue;
							if (banReason !== '' && nature.isNonstandard !== 'Unobtainable') {
								if (hasNonexistentBan) continue;
								if (!hasNonexistentWhitelist) continue;
							}
						}
					}
					naturePool.push(nature);
				}
				// There is no 'nature:nonature' rule so do not constrain pool size
			}
		}

		const randomN = this.randomNPokemon(this.maxTeamSize, this.forceMonotype, undefined,
			hasCustomBans ? ruleTable : undefined);

		const team = [];
		for (const forme of randomN) {
			// Choose forme
			const species = this.dex.species.get(forme);

			// Random unique item
			let item = '';
			let itemData;
			let isBadItem;
			if (doItemsExist) {
				// We discard TRs and Balls with 95% probability because of their otherwise overwhelming presence
				do {
					itemData = this.sampleNoReplace(itemPool);
					item = itemData?.name;
					isBadItem = item.startsWith("TR") || itemData.isPokeball;
				} while (isBadItem && this.randomChance(19, 20) && itemPool.length > this.maxTeamSize);
			}

			// Random unique ability
			let ability = 'No Ability';
			let abilityData;
			if (doAbilitiesExist) {
				abilityData = this.sampleNoReplace(abilityPool);
				ability = abilityData?.name;
			}

			// Random unique moves
			const m = [];
			do {
				const move = this.sampleNoReplace(movePool);
				m.push(move.id);
			} while (m.length < setMoveCount);

			// Random EVs
			const evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			if (this.gen === 6) {
				let evpool = 510;
				do {
					const x = this.sample(Dex.stats.ids());
					const y = this.random(Math.min(256 - evs[x], evpool + 1));
					evs[x] += y;
					evpool -= y;
				} while (evpool > 0);
			} else {
				for (const x of Dex.stats.ids()) {
					evs[x] = this.random(256);
				}
			}

			// Random IVs
			const ivs: StatsTable = {
				hp: this.random(32),
				atk: this.random(32),
				def: this.random(32),
				spa: this.random(32),
				spd: this.random(32),
				spe: this.random(32),
			};

			// Random nature
			let nature = '';
			if (doNaturesExist && (naturePool.length > 0)) {
				nature = this.sample(naturePool).name;
			}

			// Level balance
			const mbstmin = 1307;
			const stats = species.baseStats;
			let mbst = (stats['hp'] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats['atk'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['def'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spa'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spd'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spe'] * 2 + 31 + 21 + 100) + 5;

			let level;
			if (this.adjustLevel) {
				level = this.adjustLevel;
			} else {
				level = Math.floor(100 * mbstmin / mbst);
				while (level < 100) {
					mbst = Math.floor((stats['hp'] * 2 + 31 + 21 + 100) * level / 100 + 10);
					mbst += Math.floor(((stats['atk'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats['def'] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor(((stats['spa'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats['spd'] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor((stats['spe'] * 2 + 31 + 21 + 100) * level / 100 + 5);
					if (mbst >= mbstmin) break;
					level++;
				}
			}

			// Random happiness
			const happiness = this.random(256);

			// Random shininess
			const shiny = this.randomChance(1, 1024);

			const set: PokemonSet = {
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item,
				ability,
				moves: m,
				evs,
				ivs,
				nature,
				level,
				happiness,
				shiny,
			};
			if (this.gen === 9) {
				// Random Tera type
				set.teraType = this.sample(this.dex.types.all()).name;
			}
			team.push(set);
		}

		return team;
	}
}

export default RandomTeams;
