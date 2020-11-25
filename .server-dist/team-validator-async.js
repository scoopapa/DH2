"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Team Validator
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Spawns a child process to validate teams.
 *
 * @license MIT
 */

var _crashlogger = require('../.lib-dist/crashlogger');
var _teamvalidator = require('../.sim-dist/team-validator');

 class TeamValidatorAsync {
	

	constructor(format) {
		this.format = Dex.getFormat(format);
	}

	validateTeam(team, options) {
		let formatid = this.format.id;
		if (this.format.customRules) formatid += '@@@' + this.format.customRules.join(',');
		return exports.PM.query({formatid, options, team});
	}

	static get(format) {
		return new TeamValidatorAsync(format);
	}
} exports.TeamValidatorAsync = TeamValidatorAsync;

 const get = TeamValidatorAsync.get; exports.get = get;

/*********************************************************
 * Process manager
 *********************************************************/

var _processmanager = require('../.lib-dist/process-manager');

 const PM = new _processmanager.QueryProcessManager

(module, message => {
	const {formatid, options, team} = message;
	const parsedTeam = Dex.fastUnpackTeam(team);

	if (Config.debugvalidatorprocesses && process.send) {
		process.send('DEBUG\n' + JSON.stringify(message));
	}

	let problems;
	try {
		problems = _teamvalidator.TeamValidator.get(formatid).validateTeam(parsedTeam, options);
	} catch (err) {
		_crashlogger.crashlogger.call(void 0, err, 'A team validation', {
			formatid,
			team,
		});
		problems = [
			`Your team crashed the validator. We'll fix this crash within a few minutes (we're automatically notified),` +
			` but if you don't want to wait, just use a different team for now.`,
		];
	}

	if (_optionalChain([problems, 'optionalAccess', _ => _.length])) {
		return '0' + problems.join('\n');
	}
	const packedTeam = Dex.packTeam(parsedTeam);
	// console.log('FROM: ' + message.substr(pipeIndex2 + 1));
	// console.log('TO: ' + packedTeam);
	return '1' + packedTeam;
}); exports.PM = PM;

if (!exports.PM.isParentProcess) {
	// This is a child process!
	global.Config = require('./config-loader');

	global.Monitor = {
		crashlog(error, source = 'A team validator process', details = null) {
			const repr = JSON.stringify([error.name, error.message, source, details]);
			process.send(`THROW\n@!!@${repr}\n${error.stack}`);
		},
	};

	if (Config.crashguard) {
		process.on('uncaughtException', (err) => {
			Monitor.crashlog(err, `A team validator process`);
		});
		process.on('unhandledRejection', err => {
			Monitor.crashlog(err  || {}, 'A team validator process Promise');
		});
	}

	global.Dex = require('../.sim-dist/dex').Dex.includeData();

	// eslint-disable-next-line no-eval
	require('../.lib-dist/repl').Repl.start(`team-validator-${process.pid}`, (cmd) => eval(cmd));
} else {
	exports.PM.spawn(global.Config ? Config.validatorprocesses : 1);
}
