"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _dexdata = require('./dex-data');














 class Ability extends _dexdata.BasicEffect  {
	

	/** Rating from -1 Detrimental to +5 Essential; see `data/abilities.ts` for details. */
	
	
	
	
	

	constructor(data, ...moreData) {
		super(data, ...moreData);
		data = this;

		this.fullname = `ability: ${this.name}`;
		this.effectType = 'Ability';
		this.suppressWeather = !!data.suppressWeather;
		this.rating = data.rating || 0;

		if (!this.gen) {
			if (this.num >= 234) {
				this.gen = 8;
			} else if (this.num >= 192) {
				this.gen = 7;
			} else if (this.num >= 165) {
				this.gen = 6;
			} else if (this.num >= 124) {
				this.gen = 5;
			} else if (this.num >= 77) {
				this.gen = 4;
			} else if (this.num >= 1) {
				this.gen = 3;
			}
		}
	}
} exports.Ability = Ability;
