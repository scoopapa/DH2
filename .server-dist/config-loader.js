"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Config loader
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * @license MIT
 */

var _configexample = require('../config/config-example'); var defaults = _configexample;

var _processmanager = require('../.lib-dist/process-manager');








const CONFIG_PATH = require.resolve('../config/config');

 function load(invalidate = false) {
	if (invalidate) delete require.cache[CONFIG_PATH];
	const config = ({...defaults, ...require('../config/config')}) ;
	// config.routes is nested - we need to ensure values are set for its keys as well.
	config.routes = {...defaults.routes, ...config.routes};

	// Automatically stop startup if better-sqlite3 isn't installed and SQLite is enabled
	if (config.usesqlite) {
		try {
			require('better-sqlite3');
		} catch (e) {
			throw new Error(`better-sqlite3 is not installed or could not be loaded, but Config.usesqlite is enabled.`);
		}
	}

	cacheGroupData(config);
	return config;
} exports.load = load;

 function cacheGroupData(config) {
	if (config.groups) {
		// Support for old config groups format.
		// Should be removed soon.
		reportError(
			`You are using a deprecated version of user group specification in config.\n` +
			`Support for this will be removed soon.\n` +
			`Please ensure that you update your config.js to the new format (see config-example.js, line 457).\n`
		);
	} else {
		config.punishgroups = Object.create(null);
		config.groups = Object.create(null);
		config.groupsranking = [];
		config.greatergroupscache = Object.create(null);
	}

	const groups = config.groups;
	const punishgroups = config.punishgroups;
	const cachedGroups = {};

	function isPermission(key) {
		return !['symbol', 'id', 'name', 'rank', 'globalGroupInPersonalRoom'].includes(key);
	}
	function cacheGroup(symbol, groupData) {
		if (cachedGroups[symbol] === 'processing') {
			throw new Error(`Cyclic inheritance in group config for symbol "${symbol}"`);
		}
		if (cachedGroups[symbol] === true) return;

		for (const key in groupData) {
			if (isPermission(key)) {
				const jurisdiction = groupData[key ];
				if (typeof jurisdiction === 'string' && jurisdiction.includes('s')) {
					reportError(`Outdated jurisdiction for permission "${key}" of group "${symbol}": 's' is no longer a supported jurisdiction; we now use 'ipself' and 'altsself'`);
					delete groupData[key ];
				}
			}
		}

		if (groupData['inherit']) {
			cachedGroups[symbol] = 'processing';
			const inheritGroup = groups[groupData['inherit']];
			cacheGroup(groupData['inherit'], inheritGroup);
			// Add lower group permissions to higher ranked groups,
			// preserving permissions specifically declared for the higher group.
			for (const key in inheritGroup) {
				if (key in groupData) continue;
				if (!isPermission(key)) continue;
				(groupData )[key] = (inheritGroup )[key];
			}
			delete groupData['inherit'];
		}
		cachedGroups[symbol] = true;
	}

	if (config.grouplist) { // Using new groups format.
		const grouplist = config.grouplist ;
		const numGroups = grouplist.length;
		for (let i = 0; i < numGroups; i++) {
			const groupData = grouplist[i];

			// punish groups
			if (groupData.punishgroup) {
				punishgroups[groupData.id] = groupData;
				continue;
			}

			groupData.rank = numGroups - i - 1;
			groups[groupData.symbol] = groupData;
			config.groupsranking.unshift(groupData.symbol);
		}
	}

	for (const sym in groups) {
		const groupData = groups[sym];
		cacheGroup(sym, groupData);
	}

	// hardcode default punishgroups.
	if (!punishgroups.locked) {
		punishgroups.locked = {
			name: 'Locked',
			id: 'locked',
			symbol: '\u203d',
		};
	}
	if (!punishgroups.muted) {
		punishgroups.muted = {
			name: 'Muted',
			id: 'muted',
			symbol: '!',
		};
	}
} exports.cacheGroupData = cacheGroupData;

 function checkRipgrepAvailability() {
	if (exports.Config.ripgrepmodlog === undefined) {
		exports.Config.ripgrepmodlog = (async () => {
			try {
				await _processmanager.exec.call(void 0, ['rg', '--version'], {cwd: `${__dirname}/../`});
				await _processmanager.exec.call(void 0, ['tac', '--version'], {cwd: `${__dirname}/../`});
				return true;
			} catch (error) {
				return false;
			}
		})();
	}
	return exports.Config.ripgrepmodlog;
} exports.checkRipgrepAvailability = checkRipgrepAvailability;


function reportError(msg) {
	// This module generally loads before Monitor, so we put this in a setImmediate to wait for it to load.
	// Most child processes don't have Monitor.error, but the main process should always have them, and Config
	// errors should always be the same across processes, so this is a neat way to avoid unnecessary logging.
	// @ts-ignore typescript doesn't like us accessing Monitor like this
	setImmediate(() => _optionalChain([global, 'access', _ => _.Monitor, 'optionalAccess', _2 => _2.error, 'optionalCall', _3 => _3(msg)]));
}
 const Config = load(); exports.Config = Config;
