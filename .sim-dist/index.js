"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _createNamedExportFrom(obj, localName, importedName) { Object.defineProperty(exports, localName, {enumerable: true, get: () => obj[importedName]}); }/**
 * Simulator process
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This file is where the battle simulation itself happens.
 *
 * The most important part of the simulation happens in runEvent -
 * see that function's definition for details.
 *
 * @license MIT
 */

var _battle = require('./battle'); _createNamedExportFrom(_battle, 'Battle', 'Battle');
var _battlestream = require('./battle-stream'); _createNamedExportFrom(_battlestream, 'BattleStream', 'BattleStream');
var _dex = require('./dex'); _createNamedExportFrom(_dex, 'Dex', 'Dex');
var _pokemon = require('./pokemon'); _createNamedExportFrom(_pokemon, 'Pokemon', 'Pokemon');
var _prng = require('./prng'); _createNamedExportFrom(_prng, 'PRNG', 'PRNG');
var _side = require('./side'); _createNamedExportFrom(_side, 'Side', 'Side');
var _teamvalidator = require('./team-validator'); _createNamedExportFrom(_teamvalidator, 'TeamValidator', 'TeamValidator');
