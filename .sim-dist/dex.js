"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Dex
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Handles getting data about pokemon, items, etc. Also contains some useful
 * helper functions for using dex data.
 *
 * By default, nothing is loaded until you call Dex.mod(mod) or
 * Dex.forFormat(format).
 *
 * You may choose to preload some things:
 * - Dex.includeMods() ~10ms
 *   This will populate Dex.dexes, giving you a list of possible mods.
 *   Note that you don't need this for Dex.mod, Dex.mod will
 *   automatically populate this.
 * - Dex.includeFormats() ~30ms
 *   As above, but will also populate Dex.formats, giving an object
 *   containing formats.
 * - Dex.includeData() ~500ms
 *   As above, but will also preload all of Dex.data, giving access to
 *   the data access functions like Dex.getSpecies, Dex.getMove, etc.
 * - Dex.includeModData() ~1500ms
 *   As above, but will also preload Dex.dexes[...].data for all mods.
 *
 * Note that preloading is only necessary for iterating Dex.dexes. Getters
 * like Dex.getSpecies will automatically load this data as needed.
 *
 * @license MIT license
 */

var _fs = require('fs'); var fs = _fs;
var _path = require('path'); var path = _path;

var _dexdata = require('./dex-data'); var Data = _dexdata;
var _dexconditions = require('./dex-conditions');
var _dexmoves = require('./dex-moves');
var _dexitems = require('./dex-items');
var _dexabilities = require('./dex-abilities');
var _dexspecies = require('./dex-species');
var _dexformats = require('./dex-formats');

var _utils = require('../.lib-dist/utils');

const BASE_MOD = 'gen8' ;
const DEFAULT_MOD = BASE_MOD;
const DATA_DIR = path.resolve(__dirname, '../.data-dist');
const MODS_DIR = path.resolve(__dirname, '../.data-dist/mods');
const MAIN_FORMATS = path.resolve(__dirname, '../.config-dist/formats');
const CUSTOM_FORMATS = path.resolve(__dirname, '../.config-dist/custom-formats');

const dexes = Object.create(null);




const DATA_TYPES = [
	'Abilities', 'Formats', 'FormatsData', 'Items', 'Learnsets', 'Moves',
	'Natures', 'Pokedex', 'Scripts', 'Conditions', 'TypeChart',
];

const DATA_FILES = {
	Abilities: 'abilities',
	Aliases: 'aliases',
	Formats: 'rulesets',
	FormatsData: 'formats-data',
	Items: 'items',
	Learnsets: 'learnsets',
	Moves: 'moves',
	Natures: 'natures',
	Pokedex: 'pokedex',
	Scripts: 'scripts',
	Conditions: 'conditions',
	TypeChart: 'typechart',
};

const nullEffect = new (0, _dexconditions.Condition)({name: '', exists: false});























 const toID = Data.toID; exports.toID = toID;

 class ModdedDex {
	 __init() {this.Data = Data}
	 __init2() {this.Condition = _dexconditions.Condition}
	 __init3() {this.Ability = _dexabilities.Ability}
	 __init4() {this.Item = _dexitems.Item}
	 __init5() {this.Move = _dexmoves.DataMove}
	 __init6() {this.Species = _dexspecies.Species}
	 __init7() {this.Format = _dexformats.Format}
	 __init8() {this.ModdedDex = exports.ModdedDex = ModdedDex}

	 __init9() {this.name = "[ModdedDex]"}
	
	

	 __init10() {this.toID = Data.toID}

	 __init11() {this.abilityCache = new Map()}
	 __init12() {this.effectCache = new Map()}
	 __init13() {this.itemCache = new Map()}
	 __init14() {this.learnsetCache = new Map()}
	 __init15() {this.moveCache = new Map()}
	 __init16() {this.speciesCache = new Map()}
	 __init17() {this.natureCache = new Map()}
	 __init18() {this.typeCache = new Map()}

	__init19() {this.gen = 0}
	__init20() {this.parentMod = ''}
	__init21() {this.modsLoaded = false}

	
	
	

	__init22() {this.deepClone = _utils.Utils.deepClone}

	constructor(mod = 'base', isOriginal = false) {;ModdedDex.prototype.__init.call(this);ModdedDex.prototype.__init2.call(this);ModdedDex.prototype.__init3.call(this);ModdedDex.prototype.__init4.call(this);ModdedDex.prototype.__init5.call(this);ModdedDex.prototype.__init6.call(this);ModdedDex.prototype.__init7.call(this);ModdedDex.prototype.__init8.call(this);ModdedDex.prototype.__init9.call(this);ModdedDex.prototype.__init10.call(this);ModdedDex.prototype.__init11.call(this);ModdedDex.prototype.__init12.call(this);ModdedDex.prototype.__init13.call(this);ModdedDex.prototype.__init14.call(this);ModdedDex.prototype.__init15.call(this);ModdedDex.prototype.__init16.call(this);ModdedDex.prototype.__init17.call(this);ModdedDex.prototype.__init18.call(this);ModdedDex.prototype.__init19.call(this);ModdedDex.prototype.__init20.call(this);ModdedDex.prototype.__init21.call(this);ModdedDex.prototype.__init22.call(this);
		this.isBase = (mod === 'base');
		this.currentMod = mod;

		this.dataCache = null;
		this.textCache = null;
		this.formatsCache = null;

		if (!isOriginal) {
			const original = dexes['base'].mod(mod).includeData();
			this.currentMod = original.currentMod;

			this.gen = original.gen;
			this.parentMod = original.parentMod;

			this.abilityCache = original.abilityCache;
			this.itemCache = original.itemCache;
			this.learnsetCache = original.learnsetCache;
			this.moveCache = original.moveCache;
			this.speciesCache = original.speciesCache;

			this.dataCache = original.dataCache;
			this.formatsCache = original.formatsCache;
		}
	}

	get dataDir() {
		return (this.isBase ? DATA_DIR : MODS_DIR + '/' + this.currentMod);
	}

	get data() {
		return this.loadData();
	}

	get formats() {
		this.includeFormats();
		return this.formatsCache;
	}

	get dexes() {
		this.includeMods();
		return dexes;
	}

	mod(mod) {
		if (!dexes['base'].modsLoaded) dexes['base'].includeMods();
		return dexes[mod || 'base'];
	}

	forGen(gen) {
		if (!gen) return this;
		return this.mod(`gen${gen}`);
	}

	forFormat(format) {
		if (!this.modsLoaded) this.includeMods();
		const mod = this.getFormat(format).mod;
		return dexes[mod || BASE_MOD].includeData();
	}

	modData(dataType, id) {
		if (this.isBase) return this.data[dataType][id];
		if (this.data[dataType][id] !== dexes[this.parentMod].data[dataType][id]) return this.data[dataType][id];
		return (this.data[dataType][id] = _utils.Utils.deepClone(this.data[dataType][id]));
	}

	effectToString() {
		return this.name;
	}

	/**
	 * Sanitizes a username or Pokemon nickname
	 *
	 * Returns the passed name, sanitized for safe use as a name in the PS
	 * protocol.
	 *
	 * Such a string must uphold these guarantees:
	 * - must not contain any ASCII whitespace character other than a space
	 * - must not start or end with a space character
	 * - must not contain any of: | , [ ]
	 * - must not be the empty string
	 * - must not contain Unicode RTL control characters
	 *
	 * If no such string can be found, returns the empty string. Calling
	 * functions are expected to check for that condition and deal with it
	 * accordingly.
	 *
	 * getName also enforces that there are not multiple consecutive space
	 * characters in the name, although this is not strictly necessary for
	 * safety.
	 */
	getName(name) {
		if (typeof name !== 'string' && typeof name !== 'number') return '';
		name = ('' + name).replace(/[|\s[\],\u202e]+/g, ' ').trim();
		if (name.length > 18) name = name.substr(0, 18).trim();

		// remove zalgo
		name = name.replace(
			// eslint-disable-next-line max-len
			/[\u0300-\u036f\u0483-\u0489\u0610-\u0615\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06ED\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]{3,}/g,
			''
		);
		name = name.replace(/[\u239b-\u23b9]/g, '');

		return name;
	}

	/**
	 * Returns false if the target is immune; true otherwise.
	 * Also checks immunity to some statuses.
	 */
	getImmunity(
		source,
		target
	) {
		const sourceType = typeof source !== 'string' ? source.type : source;
		// @ts-ignore
		const targetTyping = _optionalChain([target, 'access', _ => _.getTypes, 'optionalCall', _2 => _2()]) || target.types || target;
		if (Array.isArray(targetTyping)) {
			for (const type of targetTyping) {
				if (!this.getImmunity(sourceType, type)) return false;
			}
			return true;
		}
		const typeData = this.data.TypeChart[targetTyping];
		if (typeData && typeData.damageTaken[sourceType] === 3) return false;
		return true;
	}

	getEffectiveness(
		source,
		target
	) {
		const sourceType = typeof source !== 'string' ? source.type : source;
		// @ts-ignore
		const targetTyping = _optionalChain([target, 'access', _3 => _3.getTypes, 'optionalCall', _4 => _4()]) || target.types || target;
		let totalTypeMod = 0;
		if (Array.isArray(targetTyping)) {
			for (const type of targetTyping) {
				totalTypeMod += this.getEffectiveness(sourceType, type);
			}
			return totalTypeMod;
		}
		const typeData = this.data.TypeChart[targetTyping];
		if (!typeData) return 0;
		switch (typeData.damageTaken[sourceType]) {
		case 1: return 1; // super-effective
		case 2: return -1; // resist
		// in case of weird situations like Gravity, immunity is handled elsewhere
		default: return 0;
		}
	}

	getSpecies(name) {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		let id = exports.toID.call(void 0, name);
		if (id === 'nidoran' && name.endsWith('♀')) {
			id = 'nidoranf' ;
		} else if (id === 'nidoran' && name.endsWith('♂')) {
			id = 'nidoranm' ;
		}
		let species = this.speciesCache.get(id);
		if (species) return species;
		if (this.data.Aliases.hasOwnProperty(id)) {
			if (this.data.FormatsData.hasOwnProperty(id)) {
				// special event ID, like Rockruff-Dusk
				const baseId = exports.toID.call(void 0, this.data.Aliases[id]);
				species = new (0, _dexspecies.Species)({name}, this.data.Pokedex[baseId], this.data.FormatsData[id]);
				species.name = id;
				species.name = id;
				species.id = id;
				species.abilities = {0: species.abilities['S']};
			} else {
				species = this.getSpecies(this.data.Aliases[id]);
				if (species.cosmeticFormes) {
					for (const forme of species.cosmeticFormes) {
						if (exports.toID.call(void 0, forme) === id) {
							species = new (0, _dexspecies.Species)(species, {
								name: forme,
								id,
								forme: forme.slice(species.name.length + 1),
								baseForme: "",
								baseSpecies: species.name,
								otherFormes: null,
								cosmeticFormes: null,
							});
							break;
						}
					}
				}
			}
			if (species) {
				this.speciesCache.set(id, species);
			}
			return species;
		}
		if (!this.data.Pokedex.hasOwnProperty(id)) {
			let aliasTo = '';
			const formeNames = {
				alola: ['a', 'alola', 'alolan'],
				galar: ['g', 'galar', 'galarian'],
				mega: ['m', 'mega'],
				primal: ['p', 'primal'],
			};
			for (const forme in formeNames) {
				let pokeName = '';
				for (const i of formeNames[forme]) {
					if (id.startsWith(i)) {
						pokeName = id.slice(i.length);
					} else if (id.endsWith(i)) {
						pokeName = id.slice(0, -i.length);
					}
				}
				if (this.data.Aliases.hasOwnProperty(pokeName)) pokeName = exports.toID.call(void 0, this.data.Aliases[pokeName]);
				if (this.data.Pokedex[pokeName + forme]) {
					aliasTo = pokeName + forme;
					break;
				}
			}
			if (aliasTo) {
				species = this.getSpecies(aliasTo);
				if (species.exists) {
					this.speciesCache.set(id, species);
					return species;
				}
			}
		}
		if (id && this.data.Pokedex.hasOwnProperty(id)) {
			species = new (0, _dexspecies.Species)({name}, this.data.Pokedex[id], this.data.FormatsData[id]);
			// Inherit any statuses from the base species (Arceus, Silvally).
			const baseSpeciesStatuses = this.data.Conditions[exports.toID.call(void 0, species.baseSpecies)];
			if (baseSpeciesStatuses !== undefined) {
				let key;
				for (key in baseSpeciesStatuses) {
					if (!(key in species)) species[key] = baseSpeciesStatuses[key];
				}
			}
			if (!species.tier && !species.doublesTier && species.baseSpecies !== species.name) {
				if (species.baseSpecies === 'Mimikyu') {
					species.tier = this.data.FormatsData[exports.toID.call(void 0, species.baseSpecies)].tier || 'Illegal';
					species.doublesTier = this.data.FormatsData[exports.toID.call(void 0, species.baseSpecies)].doublesTier || 'Illegal';
				} else if (species.id.endsWith('totem')) {
					species.tier = this.data.FormatsData[species.id.slice(0, -5)].tier || 'Illegal';
					species.doublesTier = this.data.FormatsData[species.id.slice(0, -5)].doublesTier || 'Illegal';
				} else if (species.battleOnly) {
					species.tier = this.data.FormatsData[exports.toID.call(void 0, species.battleOnly)].tier || 'Illegal';
					species.doublesTier = this.data.FormatsData[exports.toID.call(void 0, species.battleOnly)].doublesTier || 'Illegal';
				} else {
					const baseFormatsData = this.data.FormatsData[exports.toID.call(void 0, species.baseSpecies)];
					if (!baseFormatsData) {
						throw new Error(`${species.baseSpecies} has no formats-data entry`);
					}
					species.tier = baseFormatsData.tier || 'Illegal';
					species.doublesTier = baseFormatsData.doublesTier || 'Illegal';
				}
			}
			if (!species.tier) species.tier = 'Illegal';
			if (!species.doublesTier) species.doublesTier = species.tier;
			if (species.gen > this.gen) {
				species.tier = 'Illegal';
				species.doublesTier = 'Illegal';
				species.isNonstandard = 'Future';
			}
			if (this.currentMod === 'letsgo' && !species.isNonstandard) {
				const isLetsGo = (
					(species.num <= 151 || ['Meltan', 'Melmetal'].includes(species.name)) &&
					(!species.forme || ['Alola', 'Mega', 'Mega-X', 'Mega-Y', 'Starter'].includes(species.forme))
				);
				if (!isLetsGo) species.isNonstandard = 'Past';
			}
			species.nfe = species.evos.length && this.getSpecies(species.evos[0]).gen <= this.gen;
			species.canHatch = species.canHatch ||
				(!['Ditto', 'Undiscovered'].includes(species.eggGroups[0]) && !species.prevo && species.name !== 'Manaphy');
			if (this.gen === 1) species.bst -= species.baseStats.spd;
		} else {
			species = new (0, _dexspecies.Species)({
				id, name, exists: false, tier: 'Illegal', doublesTier: 'Illegal', isNonstandard: 'Custom',
			});
		}
		if (species.exists) this.speciesCache.set(id, species);
		return species;
	}

	getLearnsetData(id) {
		let learnsetData = this.learnsetCache.get(id);
		if (learnsetData) return learnsetData;
		if (!this.data.Learnsets.hasOwnProperty(id)) {
			return new Data.Learnset({exists: false});
		}
		learnsetData = new Data.Learnset(this.data.Learnsets[id]);
		this.learnsetCache.set(id, learnsetData);
		return learnsetData;
	}

	getDescs(table, id, dataEntry) {
		if (dataEntry.shortDesc) {
			return {
				desc: dataEntry.desc,
				shortDesc: dataEntry.shortDesc,
			};
		}
		const entry = this.loadTextData()[table][id];
		if (!entry) return null;
		const descs = {
			desc: '',
			shortDesc: '',
		};
		for (let i = this.gen; i < dexes['base'].gen; i++) {
			const curDesc = _optionalChain([entry, 'access', _5 => _5[`gen${i}`], 'optionalAccess', _6 => _6.desc]);
			const curShortDesc = _optionalChain([entry, 'access', _7 => _7[`gen${i}`], 'optionalAccess', _8 => _8.shortDesc]);
			if (!descs.desc && curDesc) {
				descs.desc = curDesc;
			}
			if (!descs.shortDesc && curShortDesc) {
				descs.shortDesc = curShortDesc;
			}
			if (descs.desc && descs.shortDesc) break;
		}
		if (!descs.shortDesc) descs.shortDesc = entry.shortDesc || '';
		if (!descs.desc) descs.desc = entry.desc || descs.shortDesc;
		return descs;
	}

	getMove(name) {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		let id = exports.toID.call(void 0, name);
		let move = this.moveCache.get(id);
		if (move) return move;
		if (this.data.Aliases.hasOwnProperty(id)) {
			move = this.getMove(this.data.Aliases[id]);
			if (move.exists) {
				this.moveCache.set(id, move);
			}
			return move;
		}
		if (id.substr(0, 11) === 'hiddenpower') {
			id = /([a-z]*)([0-9]*)/.exec(id)[1] ;
		}
		if (id && this.data.Moves.hasOwnProperty(id)) {
			const moveData = this.data.Moves[id];
			const moveTextData = this.getDescs('Moves', id, moveData);
			move = new (0, _dexmoves.DataMove)({name}, moveData, moveTextData);
			if (move.gen > this.gen) {
				(move ).isNonstandard = 'Future';
			}
		} else {
			move = new (0, _dexmoves.DataMove)({id, name, exists: false});
		}
		if (move.exists) this.moveCache.set(id, move);
		return move;
	}

	/**
	 * Ensure we're working on a copy of a move (and make a copy if we aren't)
	 *
	 * Remember: "ensure" - by default, it won't make a copy of a copy:
	 *     moveCopy === Dex.getActiveMove(moveCopy)
	 *
	 * If you really want to, use:
	 *     moveCopyCopy = Dex.getActiveMove(moveCopy.id)
	 */
	getActiveMove(move) {
		if (move && typeof (move ).hit === 'number') return move ;
		move = this.getMove(move);
		const moveCopy = this.deepClone(move);
		moveCopy.hit = 0;
		return moveCopy;
	}

	/**
	 * While this function can technically return any kind of effect at
	 * all, that's not a feature TypeScript needs to know about.
	 */
	getEffect(name) {
		if (!name) return nullEffect;
		if (typeof name !== 'string') return name ;

		const id = exports.toID.call(void 0, name);
		let effect = this.effectCache.get(id);
		if (effect) return effect ;

		if (name.startsWith('move:')) {
			effect = this.getMove(name.slice(5));
		} else if (name.startsWith('item:')) {
			effect = this.getItem(name.slice(5));
		} else if (name.startsWith('ability:')) {
			const ability = this.getAbility(name.slice(8));
			effect = Object.assign(Object.create(ability), {id: 'ability:' + ability.id});
		}
		if (effect) {
			this.effectCache.set(id, effect);
			return effect ;
		}
		return this.getEffectByID(id, effect);
	}

	getEffectByID(id, effect) {
		if (!id) return nullEffect;

		if (!effect) effect = this.effectCache.get(id);
		if (effect) return effect ;

		let found;
		if (this.data.Formats.hasOwnProperty(id)) {
			effect = new (0, _dexformats.Format)({name: id}, this.data.Formats[id]);
		} else if (this.data.Conditions.hasOwnProperty(id)) {
			effect = new (0, _dexconditions.Condition)({name: id}, this.data.Conditions[id]);
		} else if (
			(this.data.Moves.hasOwnProperty(id) && (found = this.data.Moves[id]).condition) ||
			(this.data.Abilities.hasOwnProperty(id) && (found = this.data.Abilities[id]).condition) ||
			(this.data.Items.hasOwnProperty(id) && (found = this.data.Items[id]).condition)
		) {
			effect = new (0, _dexconditions.Condition)({name: found.name || id}, found.condition);
		} else if (id === 'recoil') {
			effect = new (0, _dexconditions.Condition)({id, name: 'Recoil', effectType: 'Recoil'});
		} else if (id === 'drain') {
			effect = new (0, _dexconditions.Condition)({id, name: 'Drain', effectType: 'Drain'});
		} else {
			effect = new (0, _dexconditions.Condition)({id, name: id, exists: false});
		}

		this.effectCache.set(id, effect);
		return effect ;
	}

	/**
	 * Returns a sanitized format ID if valid, or throws if invalid.
	 */
	validateFormat(name) {
		const [formatName, customRulesString] = name.split('@@@', 2);
		const format = this.getFormat(formatName);
		if (!format.exists) throw new Error(`Unrecognized format "${formatName}"`);
		if (!customRulesString) return format.id;
		const ruleTable = this.getRuleTable(format);
		const customRules = customRulesString.split(',').map(rule => {
			rule = rule.replace(/[\r\n|]*/g, '').trim();
			const ruleSpec = this.validateRule(rule);
			if (typeof ruleSpec === 'string' && ruleTable.has(ruleSpec)) return null;
			return rule;
		}).filter(Boolean);
		if (!customRules.length) throw new Error(`The format already has your custom rules`);
		const validatedFormatid = format.id + '@@@' + customRules.join(',');
		const moddedFormat = this.getFormat(validatedFormatid, true);
		this.getRuleTable(moddedFormat);
		return validatedFormatid;
	}

	getFormat(name, isTrusted = false) {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		let id = exports.toID.call(void 0, name);
		if (this.data.Aliases.hasOwnProperty(id)) {
			name = this.data.Aliases[id];
			id = exports.toID.call(void 0, name);
		}
		if (this.data.Formats.hasOwnProperty(DEFAULT_MOD + id)) {
			id = (DEFAULT_MOD + id) ;
		}
		let supplementaryAttributes = null;
		if (name.includes('@@@')) {
			if (!isTrusted) {
				try {
					name = this.validateFormat(name);
					isTrusted = true;
				} catch (e) {}
			}
			const [newName, customRulesString] = name.split('@@@', 2);
			name = newName;
			id = exports.toID.call(void 0, name);
			if (isTrusted && customRulesString) {
				supplementaryAttributes = {
					customRules: customRulesString.split(','),
					searchShow: false,
				};
			}
		}
		let effect;
		if (this.data.Formats.hasOwnProperty(id)) {
			effect = new (0, _dexformats.Format)({name}, this.data.Formats[id], supplementaryAttributes);
		} else {
			effect = new (0, _dexformats.Format)({id, name, exists: false});
		}
		return effect;
	}

	getItem(name) {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		const id = exports.toID.call(void 0, name);
		let item = this.itemCache.get(id);
		if (item) return item;
		if (this.data.Aliases.hasOwnProperty(id)) {
			item = this.getItem(this.data.Aliases[id]);
			if (item.exists) {
				this.itemCache.set(id, item);
			}
			return item;
		}
		if (id && !this.data.Items[id] && this.data.Items[id + 'berry']) {
			item = this.getItem(id + 'berry');
			this.itemCache.set(id, item);
			return item;
		}
		if (id && this.data.Items.hasOwnProperty(id)) {
			const itemData = this.data.Items[id];
			const itemTextData = this.getDescs('Items', id, itemData);
			item = new (0, _dexitems.Item)({name}, itemData, itemTextData);
			if (item.gen > this.gen) {
				(item ).isNonstandard = 'Future';
			}
			// hack for allowing mega evolution in LGPE
			if (this.currentMod === 'letsgo' && !item.isNonstandard && !item.megaStone) {
				(item ).isNonstandard = 'Past';
			}
		} else {
			item = new (0, _dexitems.Item)({id, name, exists: false});
		}

		if (item.exists) this.itemCache.set(id, item);
		return item;
	}

	getAbility(name = '') {
		if (name && typeof name !== 'string') return name;

		const id = exports.toID.call(void 0, name);
		let ability = this.abilityCache.get(id);
		if (ability) return ability;
		if (this.data.Aliases.hasOwnProperty(id)) {
			ability = this.getAbility(this.data.Aliases[id]);
			if (ability.exists) {
				this.abilityCache.set(id, ability);
			}
			return ability;
		}
		if (id && this.data.Abilities.hasOwnProperty(id)) {
			const abilityData = this.data.Abilities[id];
			const abilityTextData = this.getDescs('Abilities', id, abilityData);
			ability = new (0, _dexabilities.Ability)({name}, abilityData, abilityTextData);
			if (ability.gen > this.gen) {
				(ability ).isNonstandard = 'Future';
			}
			if (this.currentMod === 'letsgo' && ability.id !== 'noability') {
				(ability ).isNonstandard = 'Past';
			}
			if ((this.currentMod === 'letsgo' || this.gen <= 2) && ability.id === 'noability') {
				(ability ).isNonstandard = null;
			}
		} else {
			ability = new (0, _dexabilities.Ability)({id, name, exists: false});
		}

		if (ability.exists) this.abilityCache.set(id, ability);
		return ability;
	}

	getType(name) {
		if (name && typeof name !== 'string') return name;

		const id = exports.toID.call(void 0, name);
		const typeName = id.charAt(0).toUpperCase() + id.substr(1);
		let type = this.typeCache.get(typeName);
		if (type) return type;
		if (typeName && this.data.TypeChart.hasOwnProperty(typeName)) {
			type = new Data.TypeInfo({id, name: typeName}, this.data.TypeChart[typeName]);
		} else {
			type = new Data.TypeInfo({id, name, exists: false, effectType: 'EffectType'});
		}

		if (type.exists) this.typeCache.set(id, type);
		return type;
	}

	getNature(name) {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		const id = exports.toID.call(void 0, name);
		let nature = this.natureCache.get(id);
		if (nature) return nature;
		if (this.data.Aliases.hasOwnProperty(id)) {
			nature = this.getNature(this.data.Aliases[id]);
			if (nature.exists) {
				this.natureCache.set(id, nature);
			}
			return nature;
		}
		if (id && this.data.Natures.hasOwnProperty(id)) {
			const natureData = this.data.Natures[id];
			nature = new Data.Nature(natureData);
			if (nature.gen > this.gen) nature.isNonstandard = 'Future';
		} else {
			nature = new Data.Nature({id, name, exists: false});
		}

		if (nature.exists) this.natureCache.set(id, nature);
		return nature;
	}

	getHiddenPower(ivs) {
		const hpTypes = [
			'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
			'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark',
		];
		const tr = this.trunc;
		const stats = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
		if (this.gen <= 2) {
			// Gen 2 specific Hidden Power check. IVs are still treated 0-31 so we get them 0-15
			const atkDV = tr(ivs.atk / 2);
			const defDV = tr(ivs.def / 2);
			const speDV = tr(ivs.spe / 2);
			const spcDV = tr(ivs.spa / 2);
			return {
				type: hpTypes[4 * (atkDV % 4) + (defDV % 4)],
				power: tr(
					(5 * ((spcDV >> 3) + (2 * (speDV >> 3)) + (4 * (defDV >> 3)) + (8 * (atkDV >> 3))) + (spcDV % 4)) / 2 + 31
				),
			};
		} else {
			// Hidden Power check for Gen 3 onwards
			let hpTypeX = 0;
			let hpPowerX = 0;
			let i = 1;
			for (const s in stats) {
				hpTypeX += i * (ivs[s] % 2);
				hpPowerX += i * (tr(ivs[s] / 2) % 2);
				i *= 2;
			}
			return {
				type: hpTypes[tr(hpTypeX * 15 / 63)],
				// After Gen 6, Hidden Power is always 60 base power
				power: (this.gen && this.gen < 6) ? tr(hpPowerX * 40 / 63) + 30 : 60,
			};
		}
	}

	getRuleTable(format, depth = 1, repeals) {
		if (format.ruleTable && !repeals) return format.ruleTable;
		if (depth === 1 && dexes[format.mod || 'base'] !== this) {
			// throw new Error(`${format.mod} ${this.currentMod}`);
			return this.mod(format.mod).getRuleTable(format, depth + 1);
		}
		const ruleTable = new (0, _dexformats.RuleTable)();

		const ruleset = format.ruleset.slice();
		for (const ban of format.banlist) {
			ruleset.push('-' + ban);
		}
		for (const ban of format.restricted) {
			ruleset.push('*' + ban);
		}
		for (const ban of format.unbanlist) {
			ruleset.push('+' + ban);
		}
		if (format.customRules) {
			ruleset.push(...format.customRules);
		}
		if (format.checkLearnset) {
			ruleTable.checkLearnset = [format.checkLearnset, format.name];
		}
		if (format.timer) {
			ruleTable.timer = [format.timer, format.name];
		}
		if (format.minSourceGen) {
			ruleTable.minSourceGen = [format.minSourceGen, format.name];
		}

		// apply rule repeals before other rules
		// repeals is a ruleid:depth map
		for (const rule of ruleset) {
			if (rule.startsWith('!')) {
				const ruleSpec = this.validateRule(rule, format) ;
				if (!repeals) repeals = new Map();
				repeals.set(ruleSpec.slice(1), depth);
			}
		}

		for (const rule of ruleset) {
			const ruleSpec = this.validateRule(rule, format);

			if (typeof ruleSpec !== 'string') {
				if (ruleSpec[0] === 'complexTeamBan') {
					const complexTeamBan = ruleSpec.slice(1) ;
					ruleTable.addComplexTeamBan(complexTeamBan[0], complexTeamBan[1], complexTeamBan[2], complexTeamBan[3]);
				} else if (ruleSpec[0] === 'complexBan') {
					const complexBan = ruleSpec.slice(1) ;
					ruleTable.addComplexBan(complexBan[0], complexBan[1], complexBan[2], complexBan[3]);
				} else {
					throw new Error(`Unrecognized rule spec ${ruleSpec}`);
				}
				continue;
			}

			if (rule.startsWith('!')) {
				const repealDepth = repeals.get(ruleSpec.slice(1));
				if (repealDepth === undefined) throw new Error(`Multiple "${rule}" rules in ${format.name}`);
				if (repealDepth === depth) {
					throw new Error(`Rule "${rule}" did nothing because "${rule.slice(1)}" is not in effect`);
				}
				if (repealDepth === -depth) repeals.delete(ruleSpec.slice(1));
				continue;
			}

			if ("+*-".includes(ruleSpec.charAt(0))) {
				if (ruleTable.has(ruleSpec)) {
					throw new Error(`Rule "${rule}" was added by "${format.name}" but already exists in "${ruleTable.get(ruleSpec) || format.name}"`);
				}
				for (const prefix of "-*+") ruleTable.delete(prefix + ruleSpec.slice(1));
				ruleTable.set(ruleSpec, '');
				continue;
			}
			const subformat = this.getFormat(ruleSpec);
			if (_optionalChain([repeals, 'optionalAccess', _9 => _9.has, 'call', _10 => _10(subformat.id)])) {
				repeals.set(subformat.id, -Math.abs(repeals.get(subformat.id)));
				continue;
			}
			if (ruleTable.has(subformat.id)) {
				throw new Error(`Rule "${rule}" was added by "${format.name}" but already exists in "${ruleTable.get(subformat.id) || format.name}"`);
			}
			ruleTable.set(subformat.id, '');
			if (!subformat.exists) continue;
			if (depth > 16) {
				throw new Error(`Excessive ruleTable recursion in ${format.name}: ${ruleSpec} of ${format.ruleset}`);
			}
			const subRuleTable = this.getRuleTable(subformat, depth + 1, repeals);
			for (const [k, v] of subRuleTable) {
				// don't check for "already exists" here; multiple inheritance is allowed
				if (!_optionalChain([repeals, 'optionalAccess', _11 => _11.has, 'call', _12 => _12(k)])) {
					ruleTable.set(k, v || subformat.name);
				}
			}
			for (const [subRule, source, limit, bans] of subRuleTable.complexBans) {
				ruleTable.addComplexBan(subRule, source || subformat.name, limit, bans);
			}
			for (const [subRule, source, limit, bans] of subRuleTable.complexTeamBans) {
				ruleTable.addComplexTeamBan(subRule, source || subformat.name, limit, bans);
			}
			if (subRuleTable.checkLearnset) {
				if (ruleTable.checkLearnset) {
					throw new Error(
						`"${format.name}" has conflicting move validation rules from ` +
						`"${ruleTable.checkLearnset[1]}" and "${subRuleTable.checkLearnset[1]}"`
					);
				}
				ruleTable.checkLearnset = subRuleTable.checkLearnset;
			}
			if (subRuleTable.timer) {
				if (ruleTable.timer) {
					throw new Error(
						`"${format.name}" has conflicting timer validation rules from "${ruleTable.timer[1]}" and "${subRuleTable.timer[1]}"`
					);
				}
				ruleTable.timer = subRuleTable.timer;
			}
			// minSourceGen is automatically ignored if higher than current gen
			// this helps the common situation where Standard has a minSourceGen in the
			// latest gen but not in any past gens
			if (subRuleTable.minSourceGen && subRuleTable.minSourceGen[0] <= this.gen) {
				if (ruleTable.minSourceGen) {
					throw new Error(
						`"${format.name}" has conflicting minSourceGen from "${ruleTable.minSourceGen[1]}" and "${subRuleTable.minSourceGen[1]}"`
					);
				}
				ruleTable.minSourceGen = subRuleTable.minSourceGen;
			}
		}

		format.ruleTable = ruleTable;
		return ruleTable;
	}

	validateRule(rule, format = null) {
		if (rule !== rule.trim()) throw new Error(`Rule "${rule}" should be trimmed`);
		switch (rule.charAt(0)) {
		case '-':
		case '*':
		case '+':
			if (_optionalChain([format, 'optionalAccess', _13 => _13.team])) throw new Error(`We don't currently support bans in generated teams`);
			if (rule.slice(1).includes('>') || rule.slice(1).includes('+')) {
				let buf = rule.slice(1);
				const gtIndex = buf.lastIndexOf('>');
				let limit = rule.startsWith('+') ? Infinity : 0;
				if (gtIndex >= 0 && /^[0-9]+$/.test(buf.slice(gtIndex + 1).trim())) {
					if (limit === 0) limit = parseInt(buf.slice(gtIndex + 1));
					buf = buf.slice(0, gtIndex);
				}
				let checkTeam = buf.includes('++');
				const banNames = buf.split(checkTeam ? '++' : '+').map(v => v.trim());
				if (banNames.length === 1 && limit > 0) checkTeam = true;
				const innerRule = banNames.join(checkTeam ? ' ++ ' : ' + ');
				const bans = banNames.map(v => this.validateBanRule(v));

				if (checkTeam) {
					return ['complexTeamBan', innerRule, '', limit, bans];
				}
				if (bans.length > 1 || limit > 0) {
					return ['complexBan', innerRule, '', limit, bans];
				}
				throw new Error(`Confusing rule ${rule}`);
			}
			return rule.charAt(0) + this.validateBanRule(rule.slice(1));
		default:
			const id = exports.toID.call(void 0, rule);
			if (!this.data.Formats.hasOwnProperty(id)) {
				throw new Error(`Unrecognized rule "${rule}"`);
			}
			if (rule.startsWith('!')) return `!${id}`;
			return id;
		}
	}

	validateBanRule(rule) {
		let id = exports.toID.call(void 0, rule);
		if (id === 'unreleased') return 'unreleased';
		if (id === 'nonexistent') return 'nonexistent';
		const matches = [];
		let matchTypes = ['pokemon', 'move', 'ability', 'item', 'nature', 'pokemontag'];
		for (const matchType of matchTypes) {
			if (rule.startsWith(`${matchType}:`)) {
				matchTypes = [matchType];
				id = id.slice(matchType.length) ;
				break;
			}
		}
		const ruleid = id;
		if (this.data.Aliases.hasOwnProperty(id)) id = exports.toID.call(void 0, this.data.Aliases[id]);
		for (const matchType of matchTypes) {
			let table;
			switch (matchType) {
			case 'pokemon': table = this.data.Pokedex; break;
			case 'move': table = this.data.Moves; break;
			case 'item': table = this.data.Items; break;
			case 'ability': table = this.data.Abilities; break;
			case 'nature': table = this.data.Natures; break;
			case 'pokemontag':
				// valid pokemontags
				const validTags = [
					// singles tiers
					'uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', 'lcuber', 'lc', 'cap', 'caplc', 'capnfe', 'ag',
					// doubles tiers
					'duber', 'dou', 'dbl', 'duu', 'dnu',
					// custom tags -- nduubl is used for national dex teambuilder formatting
					'mega', 'nduubl',
					// illegal/nonstandard reasons
					'past', 'future', 'unobtainable', 'lgpe', 'custom',
					// all
					'allpokemon', 'allitems', 'allmoves', 'allabilities', 'allnatures',
				];
				if (validTags.includes(ruleid)) matches.push('pokemontag:' + ruleid);
				continue;
			default:
				throw new Error(`Unrecognized match type.`);
			}
			if (table.hasOwnProperty(id)) {
				if (matchType === 'pokemon') {
					const species = table[id] ;
					if (species.otherFormes && ruleid !== species.id + exports.toID.call(void 0, species.baseForme)) {
						matches.push('basepokemon:' + id);
						continue;
					}
				}
				matches.push(matchType + ':' + id);
			} else if (matchType === 'pokemon' && id.endsWith('base')) {
				id = id.slice(0, -4) ;
				if (table.hasOwnProperty(id)) {
					matches.push('pokemon:' + id);
				}
			}
		}
		if (matches.length > 1) {
			throw new Error(`More than one thing matches "${rule}"; please specify one of: ` + matches.join(', '));
		}
		if (matches.length < 1) {
			throw new Error(`Nothing matches "${rule}"`);
		}
		return matches[0];
	}

	/**
	 * Truncate a number into an unsigned 32-bit integer, for
	 * compatibility with the cartridge games' math systems.
	 */
	trunc(num, bits = 0) {
		if (bits) return (num >>> 0) % (2 ** bits);
		return num >>> 0;
	}

	getTeamGenerator(format, seed = null) {
		const TeamGenerator = require(dexes['base'].forFormat(format).dataDir + '/random-teams').default;
		return new TeamGenerator(format, seed);
	}

	generateTeam(format, options = null) {
		return this.getTeamGenerator(format, _optionalChain([options, 'optionalAccess', _14 => _14.seed])).getTeam(options);
	}

	dataSearch(target, searchIn, isInexact) {
		if (!target) return false;

		searchIn = searchIn || ['Pokedex', 'Moves', 'Abilities', 'Items', 'Natures'];

		const searchFunctions = {
			Pokedex: 'getSpecies', Moves: 'getMove', Abilities: 'getAbility', Items: 'getItem', Natures: 'getNature',
		};
		const searchTypes = {
			Pokedex: 'pokemon', Moves: 'move', Abilities: 'ability', Items: 'item', Natures: 'nature',
		};
		let searchResults = [];
		for (const table of searchIn) {
			// @ts-ignore
			const res = this[searchFunctions[table]](target);
			if (res.exists && res.gen <= this.gen) {
				searchResults.push({
					isInexact,
					searchType: searchTypes[table],
					name: res.name,
				});
			}
		}
		if (searchResults.length) return searchResults;
		if (isInexact) return false; // prevent infinite loop

		const cmpTarget = exports.toID.call(void 0, target);
		let maxLd = 3;
		if (cmpTarget.length <= 1) {
			return false;
		} else if (cmpTarget.length <= 4) {
			maxLd = 1;
		} else if (cmpTarget.length <= 6) {
			maxLd = 2;
		}
		searchResults = false;
		for (const table of [...searchIn, 'Aliases'] ) {
			const searchObj = this.data[table];
			if (!searchObj) continue;

			for (const j in searchObj) {
				const ld = _utils.Utils.levenshtein(cmpTarget, j, maxLd);
				if (ld <= maxLd) {
					const word = searchObj[j].name || searchObj[j].species || j;
					const results = this.dataSearch(word, searchIn, word);
					if (results) {
						searchResults = results;
						maxLd = ld;
					}
				}
			}
		}

		return searchResults;
	}

	packTeam(team) {
		if (!team) return '';

		function getIv(ivs, s) {
			return ivs[s] === 31 || ivs[s] === undefined ? '' : ivs[s].toString();
		}

		let buf = '';
		for (const set of team) {
			if (buf) buf += ']';

			// name
			buf += (set.name || set.species);

			// species
			const id = exports.toID.call(void 0, set.species || set.name);
			buf += '|' + (exports.toID.call(void 0, set.name || set.species) === id ? '' : id);

			// item
			buf += '|' + exports.toID.call(void 0, set.item);

			// ability
			buf += '|' + exports.toID.call(void 0, set.ability);

			// moves
			buf += '|' + set.moves.map(exports.toID).join(',');

			// nature
			buf += '|' + (set.nature || '');

			// evs
			let evs = '|';
			if (set.evs) {
				evs = '|' + (set.evs['hp'] || '') + ',' + (set.evs['atk'] || '') + ',' + (set.evs['def'] || '') + ',' + (set.evs['spa'] || '') + ',' + (set.evs['spd'] || '') + ',' + (set.evs['spe'] || '');
			}
			if (evs === '|,,,,,') {
				buf += '|';
			} else {
				buf += evs;
			}

			// gender
			if (set.gender) {
				buf += '|' + set.gender;
			} else {
				buf += '|';
			}

			// ivs
			let ivs = '|';
			if (set.ivs) {
				ivs = '|' + getIv(set.ivs, 'hp') + ',' + getIv(set.ivs, 'atk') + ',' + getIv(set.ivs, 'def') +
					',' + getIv(set.ivs, 'spa') + ',' + getIv(set.ivs, 'spd') + ',' + getIv(set.ivs, 'spe');
			}
			if (ivs === '|,,,,,') {
				buf += '|';
			} else {
				buf += ivs;
			}

			// shiny
			if (set.shiny) {
				buf += '|S';
			} else {
				buf += '|';
			}

			// level
			if (set.level && set.level !== 100) {
				buf += '|' + set.level;
			} else {
				buf += '|';
			}

			// happiness
			if (set.happiness !== undefined && set.happiness !== 255) {
				buf += '|' + set.happiness;
			} else {
				buf += '|';
			}

			if (set.pokeball || set.hpType || set.gigantamax) {
				buf += ',' + (set.hpType || '');
				buf += ',' + exports.toID.call(void 0, set.pokeball || '');
				buf += ',' + (set.gigantamax ? 'G' : '');
			}
		}

		return buf;
	}

	fastUnpackTeam(buf) {
		if (!buf) return null;
		if (typeof buf !== 'string') return buf;
		if (buf.startsWith('[') && buf.endsWith(']')) {
			buf = this.packTeam(JSON.parse(buf));
		}

		const team = [];
		let i = 0;
		let j = 0;

		// limit to 24
		for (let count = 0; count < 24; count++) {
			const set = {} ;
			team.push(set);

			// name
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			set.name = buf.substring(i, j);
			i = j + 1;

			// species
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			set.species = buf.substring(i, j) || set.name;
			i = j + 1;

			// item
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			set.item = buf.substring(i, j);
			i = j + 1;

			// ability
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			const ability = buf.substring(i, j);
			const species = dexes['base'].getSpecies(set.species);
			set.ability = ['', '0', '1', 'H', 'S'].includes(ability) ?
				species.abilities[ability  || '0'] || (ability === '' ? '' : '!!!ERROR!!!') :
				ability;
			i = j + 1;

			// moves
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			set.moves = buf.substring(i, j).split(',', 24).filter(x => x);
			i = j + 1;

			// nature
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			set.nature = buf.substring(i, j);
			i = j + 1;

			// evs
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			if (j !== i) {
				const evs = buf.substring(i, j).split(',', 6);
				set.evs = {
					hp: Number(evs[0]) || 0,
					atk: Number(evs[1]) || 0,
					def: Number(evs[2]) || 0,
					spa: Number(evs[3]) || 0,
					spd: Number(evs[4]) || 0,
					spe: Number(evs[5]) || 0,
				};
			}
			i = j + 1;

			// gender
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			if (i !== j) set.gender = buf.substring(i, j);
			i = j + 1;

			// ivs
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			if (j !== i) {
				const ivs = buf.substring(i, j).split(',', 6);
				set.ivs = {
					hp: ivs[0] === '' ? 31 : Number(ivs[0]) || 0,
					atk: ivs[1] === '' ? 31 : Number(ivs[1]) || 0,
					def: ivs[2] === '' ? 31 : Number(ivs[2]) || 0,
					spa: ivs[3] === '' ? 31 : Number(ivs[3]) || 0,
					spd: ivs[4] === '' ? 31 : Number(ivs[4]) || 0,
					spe: ivs[5] === '' ? 31 : Number(ivs[5]) || 0,
				};
			}
			i = j + 1;

			// shiny
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			if (i !== j) set.shiny = true;
			i = j + 1;

			// level
			j = buf.indexOf('|', i);
			if (j < 0) return null;
			if (i !== j) set.level = parseInt(buf.substring(i, j));
			i = j + 1;

			// happiness
			j = buf.indexOf(']', i);
			let misc;
			if (j < 0) {
				if (i < buf.length) misc = buf.substring(i).split(',', 4);
			} else {
				if (i !== j) misc = buf.substring(i, j).split(',', 4);
			}
			if (misc) {
				set.happiness = (misc[0] ? Number(misc[0]) : 255);
				set.hpType = misc[1] || '';
				set.pokeball = this.toID(misc[2] || '');
				set.gigantamax = !!misc[3];
			}
			if (j < 0) break;
			i = j + 1;
		}

		return team;
	}

	/**
	* Use instead of Dex.packTeam to generate more human-readable team output.
	*/
	stringifyTeam(team, nicknames, hideStats) {
		let output = '';
		for (const [i, mon] of team.entries()) {
			const species = exports.Dex.getSpecies(mon.species);
			const nickname = _optionalChain([nicknames, 'optionalAccess', _15 => _15[i]]);
			output += nickname && nickname !== species.baseSpecies ? `${nickname} (${species.name})` : species.name;
			output += mon.item ? ` @ ${exports.Dex.getItem(mon.item).name}<br />` : `<br />`;
			output += `Ability: ${exports.Dex.getAbility(mon.ability).name}<br />`;
			if (typeof mon.happiness === 'number' && mon.happiness !== 255) output += `Happiness: ${mon.happiness}<br />`;
			if (mon.gigantamax) output += `Gigantamax: Yes<br />`;
			if (!hideStats) {
				const evs = [];
				for (const stat in mon.evs) {
					if (mon.evs[stat ]) evs.push(`${mon.evs[stat ]} ${stat}`);
				}
				if (evs.length) output += `EVs: ${evs.join(' / ')}<br />`;
				if (mon.nature) output += `${this.getNature(mon.nature).name} Nature<br />`;
				const ivs = [];
				for (const stat in mon.ivs) {
					if (mon.ivs[stat ] !== 31) ivs.push(`${mon.ivs[stat ]} ${stat}`);
				}
				if (ivs.length) output += `IVs: ${ivs.join(' / ')}<br />`;
			}
			output += mon.moves.map(move => `- ${exports.Dex.getMove(move).name}<br />`).join('');
			output += '<br />';
		}
		return output;
	}

	loadDataFile(basePath, dataType) {
		try {
			const filePath = basePath + DATA_FILES[dataType];
			const dataObject = require(filePath);
			if (!dataObject || typeof dataObject !== 'object') {
				throw new TypeError(`${filePath}, if it exists, must export a non-null object`);
			}
			if (_optionalChain([dataObject, 'access', _16 => _16[dataType], 'optionalAccess', _17 => _17.constructor, 'optionalAccess', _18 => _18.name]) !== 'Object') {
				throw new TypeError(`${filePath}, if it exists, must export an object whose '${dataType}' property is an Object`);
			}
			return dataObject[dataType];
		} catch (e) {
			if (e.code !== 'MODULE_NOT_FOUND' && e.code !== 'ENOENT') {
				throw e;
			}
		}
		return {};
	}

	loadTextFile(
		name, exportName
	) {
		return require(`${DATA_DIR}/text/${name}`)[exportName];
	}

	includeMods() {
		if (!this.isBase) throw new Error(`This must be called on the base Dex`);
		if (this.modsLoaded) return this;

		for (const mod of fs.readdirSync(MODS_DIR)) {
			dexes[mod] = new ModdedDex(mod, true);
		}
		this.modsLoaded = true;

		return this;
	}

	includeModData() {
		for (const mod in this.dexes) {
			dexes[mod].includeData();
		}
		return this;
	}

	includeData() {
		this.loadData();
		return this;
	}

	loadTextData() {
		if (dexes['base'].textCache) return dexes['base'].textCache;
		dexes['base'].textCache = {
			Pokedex: this.loadTextFile('pokedex', 'PokedexText') ,
			Moves: this.loadTextFile('moves', 'MovesText') ,
			Abilities: this.loadTextFile('abilities', 'AbilitiesText') ,
			Items: this.loadTextFile('items', 'ItemsText') ,
			Default: this.loadTextFile('default', 'DefaultText') ,
		};
		return dexes['base'].textCache;
	}

	loadData() {
		if (this.dataCache) return this.dataCache;
		dexes['base'].includeMods();
		const dataCache = {};

		const basePath = this.dataDir + '/';

		const Scripts = this.loadDataFile(basePath, 'Scripts');
		this.parentMod = this.isBase ? '' : (Scripts.inherit || 'base');

		let parentDex;
		if (this.parentMod) {
			parentDex = dexes[this.parentMod];
			if (!parentDex || parentDex === this) {
				throw new Error(
					`Unable to load ${this.currentMod}. 'inherit' should specify a parent mod from which to inherit data, or must be not specified.`
				);
			}
		}

		for (const dataType of DATA_TYPES.concat('Aliases')) {
			const BattleData = this.loadDataFile(basePath, dataType);
			if (BattleData !== dataCache[dataType]) dataCache[dataType] = Object.assign(BattleData, dataCache[dataType]);
			if (dataType === 'Formats' && !parentDex) Object.assign(BattleData, this.formats);
		}
		if (!parentDex) {
			// Formats are inherited by mods
			this.includeFormats();
		} else {
			for (const dataType of DATA_TYPES) {
				const parentTypedData = parentDex.data[dataType];
				const childTypedData = dataCache[dataType] || (dataCache[dataType] = {});
				for (const entryId in parentTypedData) {
					if (childTypedData[entryId] === null) {
						// null means don't inherit
						delete childTypedData[entryId];
					} else if (!(entryId in childTypedData)) {
						// If it doesn't exist it's inherited from the parent data
						if (dataType === 'Pokedex') {
							// Pokedex entries can be modified too many different ways
							// e.g. inheriting different formats-data/learnsets
							childTypedData[entryId] = this.deepClone(parentTypedData[entryId]);
						} else {
							childTypedData[entryId] = parentTypedData[entryId];
						}
					} else if (childTypedData[entryId] && childTypedData[entryId].inherit) {
						// {inherit: true} can be used to modify only parts of the parent data,
						// instead of overwriting entirely
						delete childTypedData[entryId].inherit;

						// Merge parent into children entry, preserving existing childs' properties.
						for (const key in parentTypedData[entryId]) {
							if (key in childTypedData[entryId]) continue;
							childTypedData[entryId][key] = parentTypedData[entryId][key];
						}
					}
				}
			}
			dataCache['Aliases'] = parentDex.data['Aliases'];
		}

		// Flag the generation. Required for team validator.
		this.gen = dataCache.Scripts.gen;
		if (!this.gen) throw new Error(`Mod ${this.currentMod} needs a generation number in scripts.js`);
		this.dataCache = dataCache ;

		// Execute initialization script.
		if (Scripts.init) Scripts.init.call(this);

		return this.dataCache;
	}

	includeFormats() {
		if (!this.isBase) throw new Error(`This should only be run on the base mod`);
		this.includeMods();
		if (this.formatsCache) return this;

		if (!this.formatsCache) this.formatsCache = {};

		// Load formats
		let Formats;
		let customFormats;
		try {
			customFormats = require(CUSTOM_FORMATS).Formats;
		} catch (e) {
			if (e.code !== 'MODULE_NOT_FOUND' && e.code !== 'ENOENT') {
				throw e;
			}
		}
		try {
			Formats = _dexformats.mergeFormatLists.call(void 0, require(MAIN_FORMATS).Formats, customFormats);
		} catch (e) {
			if (e.code !== 'MODULE_NOT_FOUND' && e.code !== 'ENOENT') {
				throw e;
			}
		}
		if (!Array.isArray(Formats)) {
			throw new TypeError(`Exported property 'Formats' from "./config/formats.ts" must be an array`);
		}
		let section = '';
		let column = 1;
		for (const [i, format] of Formats.entries()) {
			const id = exports.toID.call(void 0, format.name);
			if (format.section) section = format.section;
			if (format.column) column = format.column;
			if (!format.name && format.section) continue;
			if (!id) {
				throw new RangeError(`Format #${i + 1} must have a name with alphanumeric characters, not '${format.name}'`);
			}
			if (!format.section) format.section = section;
			if (!format.column) format.column = column;
			if (this.formatsCache[id]) throw new Error(`Format #${i + 1} has a duplicate ID: '${id}'`);
			format.effectType = 'Format';
			format.baseRuleset = format.ruleset ? format.ruleset.slice() : [];
			if (format.challengeShow === undefined) format.challengeShow = true;
			if (format.searchShow === undefined) format.searchShow = true;
			if (format.tournamentShow === undefined) format.tournamentShow = true;
			if (format.mod === undefined) format.mod = 'gen8';
			if (!dexes[format.mod]) throw new Error(`Format "${format.name}" requires nonexistent mod: '${format.mod}'`);
			this.formatsCache[id] = format;
		}

		return this;
	}
} exports.ModdedDex = ModdedDex;

dexes['base'] = new ModdedDex(undefined, true);

// "gen8" is an alias for the current base data
dexes[BASE_MOD] = dexes['base'];

 const Dex = dexes['base']; exports.Dex = Dex;










