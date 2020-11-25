"use strict";Object.defineProperty(exports, "__esModule", {value: true});/**
 * Battle Simulator multi random runner.
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * @license MIT
 */

var _prng = require('../prng');
var _runner = require('./runner');

// @ts-ignore









 class MultiRandomRunner {
	static  __initStatic() {this.FORMATS = [
		'gen8randombattle', 'gen8randomdoublesbattle', 'gen8battlefactory',
		'gen7randombattle', 'gen7randomdoublesbattle', 'gen7battlefactory',
		'gen6randombattle', 'gen6battlefactory',
		'gen5randombattle',
		'gen4randombattle',
		'gen3randombattle',
		'gen2randombattle',
		'gen1randombattle',
	]}

	
	
	
	
	
	
	

	
	

	constructor(options) {
		this.options = {...options};

		this.totalGames = options.totalGames;

		this.prng = (options.prng && !Array.isArray(options.prng)) ?
			options.prng : new (0, _prng.PRNG)(options.prng);
		this.options.prng = this.prng;

		this.format = options.format;
		this.cycle = !!options.cycle;
		this.all = !!options.all;

		this.async = !!options.async;

		this.formatIndex = 0;
		this.numGames = 0;
	}

	async run() {
		let games = [];
		let format;
		let lastFormat = false;
		let failures = 0;
		while ((format = this.getNextFormat())) {
			if (this.all && lastFormat && format !== lastFormat) {
				if (this.async) await Promise.all(games);
				games = [];
			}

			const seed = this.prng.seed;
			const game = new (0, _runner.Runner)({format, ...this.options}).run().catch(err => {
				failures++;
				console.error(
					`Run \`node tools/simulate multi 1 --format=${format} --seed=${seed.join()}\` ` +
					`to debug (optionally with \`--output\` and/or \`--input\` for more info):\n`,
					err
				);
			});

			if (!this.async) await game;
			games.push(game);
			lastFormat = format;
		}

		if (this.async) await Promise.all(games);
		return failures;
	}

	 getNextFormat() {
		const FORMATS = MultiRandomRunner.FORMATS;
		if (this.formatIndex > FORMATS.length) return false;

		if (this.numGames++ < this.totalGames) {
			if (this.format) {
				return this.format;
			} else if (this.all) {
				return FORMATS[this.formatIndex];
			} else if (this.cycle) {
				const format = FORMATS[this.formatIndex];
				this.formatIndex = (this.formatIndex + 1) % FORMATS.length;
				return format;
			} else {
				return this.prng.sample(FORMATS);
			}
		} else if (this.all) {
			this.numGames = 1;
			this.formatIndex++;
			return FORMATS[this.formatIndex];
		}

		return false;
	}
} MultiRandomRunner.__initStatic(); exports.MultiRandomRunner = MultiRandomRunner;
