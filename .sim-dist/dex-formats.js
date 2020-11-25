"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _utils = require('../.lib-dist/utils');
var _dexdata = require('./dex-data');















/**
 * A RuleTable keeps track of the rules that a format has. The key can be:
 * - '[ruleid]' the ID of a rule in effect
 * - '-[thing]' or '-[category]:[thing]' ban a thing
 * - '+[thing]' or '+[category]:[thing]' allow a thing (override a ban)
 * [category] is one of: item, move, ability, species, basespecies
 *
 * The value is the name of the parent rule (blank for the active format).
 */
 class RuleTable extends Map {
	
	
	// eslint-disable-next-line @typescript-eslint/ban-types
	
	
	

	constructor() {
		super();
		this.complexBans = [];
		this.complexTeamBans = [];
		this.checkLearnset = null;
		this.timer = null;
		this.minSourceGen = null;
	}

	isBanned(thing) {
		if (this.has(`+${thing}`)) return false;
		return this.has(`-${thing}`);
	}

	isBannedSpecies(species) {
		if (this.has(`+pokemon:${species.id}`)) return false;
		if (this.has(`-pokemon:${species.id}`)) return true;
		if (this.has(`+basepokemon:${_dexdata.toID.call(void 0, species.baseSpecies)}`)) return false;
		if (this.has(`-basepokemon:${_dexdata.toID.call(void 0, species.baseSpecies)}`)) return true;
		const tier = species.tier === '(PU)' ? 'ZU' : species.tier === '(NU)' ? 'PU' : species.tier;
		if (this.has(`+pokemontag:${_dexdata.toID.call(void 0, tier)}`)) return false;
		if (this.has(`-pokemontag:${_dexdata.toID.call(void 0, tier)}`)) return true;
		const doublesTier = species.doublesTier === '(DUU)' ? 'DNU' : species.doublesTier;
		if (this.has(`+pokemontag:${_dexdata.toID.call(void 0, doublesTier)}`)) return false;
		if (this.has(`-pokemontag:${_dexdata.toID.call(void 0, doublesTier)}`)) return true;
		return this.has(`-pokemontag:allpokemon`);
	}

	isRestricted(thing) {
		if (this.has(`+${thing}`)) return false;
		return this.has(`*${thing}`);
	}

	isRestrictedSpecies(species) {
		if (this.has(`+pokemon:${species.id}`)) return false;
		if (this.has(`*pokemon:${species.id}`)) return true;
		if (this.has(`+basepokemon:${_dexdata.toID.call(void 0, species.baseSpecies)}`)) return false;
		if (this.has(`*basepokemon:${_dexdata.toID.call(void 0, species.baseSpecies)}`)) return true;
		const tier = species.tier === '(PU)' ? 'ZU' : species.tier === '(NU)' ? 'PU' : species.tier;
		if (this.has(`+pokemontag:${_dexdata.toID.call(void 0, tier)}`)) return false;
		if (this.has(`*pokemontag:${_dexdata.toID.call(void 0, tier)}`)) return true;
		const doublesTier = species.doublesTier === '(DUU)' ? 'DNU' : species.doublesTier;
		if (this.has(`+pokemontag:${_dexdata.toID.call(void 0, doublesTier)}`)) return false;
		if (this.has(`*pokemontag:${_dexdata.toID.call(void 0, doublesTier)}`)) return true;
		return this.has(`*pokemontag:allpokemon`);
	}

	check(thing, setHas = null) {
		if (this.has(`+${thing}`)) return '';
		if (setHas) setHas[thing] = true;
		return this.getReason(`-${thing}`);
	}

	getReason(key) {
		const source = this.get(key);
		if (source === undefined) return null;
		if (key === '-nonexistent' || key.startsWith('obtainable')) {
			return 'not obtainable';
		}
		return source ? `banned by ${source}` : `banned`;
	}

	getComplexBanIndex(complexBans, rule) {
		const ruleId = _dexdata.toID.call(void 0, rule);
		let complexBanIndex = -1;
		for (let i = 0; i < complexBans.length; i++) {
			if (_dexdata.toID.call(void 0, complexBans[i][0]) === ruleId) {
				complexBanIndex = i;
				break;
			}
		}
		return complexBanIndex;
	}

	addComplexBan(rule, source, limit, bans) {
		const complexBanIndex = this.getComplexBanIndex(this.complexBans, rule);
		if (complexBanIndex !== -1) {
			if (this.complexBans[complexBanIndex][2] === Infinity) return;
			this.complexBans[complexBanIndex] = [rule, source, limit, bans];
		} else {
			this.complexBans.push([rule, source, limit, bans]);
		}
	}

	addComplexTeamBan(rule, source, limit, bans) {
		const complexBanTeamIndex = this.getComplexBanIndex(this.complexTeamBans, rule);
		if (complexBanTeamIndex !== -1) {
			if (this.complexTeamBans[complexBanTeamIndex][2] === Infinity) return;
			this.complexTeamBans[complexBanTeamIndex] = [rule, source, limit, bans];
		} else {
			this.complexTeamBans.push([rule, source, limit, bans]);
		}
	}
} exports.RuleTable = RuleTable;

 class Format extends _dexdata.BasicEffect  {
	
	/**
	 * Name of the team generator algorithm, if this format uses
	 * random/fixed teams. null if players can bring teams.
	 */
	
	
	
	/**
	 * Whether or not a format will update ladder points if searched
	 * for using the "Battle!" button.
	 * (Challenge and tournament games will never update ladder points.)
	 * (Defaults to `true`.)
	 */
	
	/** Game type. */
	
	/** List of rule names. */
	
	/**
	 * Base list of rule names as specified in "./config/formats.ts".
	 * Used in a custom format to correctly display the altered ruleset.
	 */
	
	/** List of banned effects. */
	
	/** List of effects that aren't completely banned. */
	
	/** List of inherited banned effects to override. */
	
	/** List of ruleset and banlist changes in a custom format. */
	
	/** Table of rule names and banned effects. */
	
	/**
	 * The number of Pokemon players can bring to battle and
	 * the number that can actually be used.
	 */
	
	/** An optional function that runs at the start of a battle. */
	
	/** Pokemon must be obtained from this generation or later. */
	
	/**
	 * Maximum possible level pokemon you can bring. Note that this is
	 * still 100 in VGC, because you can bring level 100 pokemon,
	 * they'll just be set to level 50. Can be above 100 in special
	 * formats.
	 */
	
	/**
	 * Default level of a pokemon without level specified. Mainly
	 * relevant to Custom Game where the default level is still 100
	 * even though higher level pokemon can be brought.
	 */
	
	/**
	 * Forces all pokemon brought in to this level. Certain Game Freak
	 * formats will change level 1 and level 100 pokemon to level 50,
	 * which is what this does.
	 *
	 * You usually want maxForcedLevel instead, which will bring level
	 * 100 pokemon down, but not level 1 pokemon up.
	 */
	
	/**
	 * Forces all pokemon above this level down to this level. This
	 * will allow e.g. level 50 Hydreigon in Gen 5, which is not
	 * normally legal because Hydreigon doesn't evolve until level
	 * 64.
	 */
	
	

	
	
	
	
	
	
	
	
	
	
	


	
	
	
	


	


	
	
	


	


	
	



	
	

	constructor(data, ...moreData) {
		super(data, ...moreData);
		data = this;

		this.mod = _utils.Utils.getString(data.mod) || 'gen8';
		this.effectType = _utils.Utils.getString(data.effectType)  || 'Format';
		this.debug = !!data.debug;
		this.rated = (typeof data.rated === 'string' ? data.rated : data.rated !== false);
		this.gameType = data.gameType || 'singles';
		this.ruleset = data.ruleset || [];
		this.baseRuleset = data.baseRuleset || [];
		this.banlist = data.banlist || [];
		this.restricted = data.restricted || [];
		this.unbanlist = data.unbanlist || [];
		this.customRules = data.customRules || null;
		this.ruleTable = null;
		this.teamLength = data.teamLength || undefined;
		this.onBegin = data.onBegin || undefined;
		this.minSourceGen = data.minSourceGen || undefined;
		this.maxLevel = data.maxLevel || 100;
		this.defaultLevel = data.defaultLevel || this.maxLevel;
		this.forcedLevel = data.forcedLevel || undefined;
		this.maxForcedLevel = data.maxForcedLevel || undefined;
		this.noLog = !!data.noLog;
	}
} exports.Format = Format;

/** merges format lists from config/formats and config/custom-formats */
 function mergeFormatLists(main, custom) {
	// interface for the builder.
	





	// result that is return and makes the actual list for formats.
	const result = [];

	// used as a intermediary to build the final list.
	const build = [];

	// used to track current section to keep formats under their sections.
	let current = {section: "", formats: []};

	// populates the original sections and formats easily
	// there should be no repeat sections at this point.
	for (const element of main) {
		if (element.section) {
			current = {section: element.section, column: element.column, formats: []};
			build.push(current);
		} else if ((element ).name) {
			current.formats.push((element ));
		}
	}

	// merges the second list the hard way. Accounts for repeats.
	if (custom !== undefined) {
		for (const element of custom) {
			// finds the section and makes it if it doesn't exist.
			if (element.section) {
				current = build.find(e => e.section === element.section);

				// if it's new it makes a new entry.
				if (current === undefined) {
					current = {section: element.section, column: element.column, formats: []};
					build.push(current);
				}
			} else if ((element ).name) { // otherwise, adds the element to its section.
				current.formats.push(element );
			}
		}
	}

	// builds the final result.
	for (const element of build) {
		// adds the section to the list.
		result.push({section: element.section, column: element.column}, ...element.formats);
	}

	return result;
} exports.mergeFormatLists = mergeFormatLists;
