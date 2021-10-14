'use strict';

exports.BattleItems = {
	"pollenseed": {
		id: "pollenseed",
		name: "Pollen Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('pollenterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"murkyseed": {
		id: "murkyseed",
		name: "Murky Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('murkyterrain') && pokemon.useItem()) {
				this.add('-clearallboost');
				for (let i = 0; i < this.sides.length; i++) {
					for (let j = 0; j < this.sides[i].active.length; j++) {
						if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
					}
				}
			}
		},
		gen: 7,
	},
	"regalseed": {
		id: "regalseed",
		name: "Regal Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('regalterrain') && pokemon.useItem()) {
				this.boost({acc: 1});
			}
		},
		gen: 7,
	},
	"fieryseed": {
		id: "fieryseed",
		name: "Fiery Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('fieryterrain') && pokemon.useItem()) {
				this.boost({def: 1});
			}
		},
		gen: 7,
	},
	"chakraseed": {
		id: "chakraseed",
		name: "Chakra Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('chakraterrain') && pokemon.useItem()) {
				pokemon.addVolatile('focusenergy');
			}
		},
		gen: 7,
	},
	"elevationseed": {
		id: "elevationseed",
		name: "Elevation Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('elevatedterrain') && pokemon.useItem()) {
				this.boost({def: 1});
			}
		},
		gen: 7,
	},
	"ominousseed": {
		id: "ominousseed",
		name: "Ominous Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('ominousterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"sandyseed": {
		id: "sandyseed",
		name: "Sandy Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('sandyterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"frostyseed": {
		id: "frostyseed",
		name: "Frosty Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('frostyterrain') && pokemon.useItem()) {
				this.boost({def: 1});
			}
		},
		gen: 7,
	},
	"cloudyseed": {
		id: "cloudyseed",
		name: "Cloudy Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('cloudyterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"rockyseed": {
		id: "rockyseed",
		name: "Rocky Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('rockyterrain') && pokemon.useItem()) {
				this.boost({def: 1});
			}
		},
		gen: 7,
	},
	"corrosiveseed": {
		id: "corrosiveseed",
		name: "Corrosive Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('corrosiveterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"metallicseed": {
		id: "metallicseed",
		name: "Metallic Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('metallicterrain') && pokemon.useItem()) {
				this.boost({spe: 1});
			}
		},
		gen: 7,
	},
	"seaseed": {
		id: "seaseed",
		name: "Sea Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.field.isTerrain('seaterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
};
