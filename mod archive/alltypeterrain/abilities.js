'use strict';

exports.BattleAbilities = {
	// Surge abilities
	"pollensurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('pollenterrain');
		},
		id: "pollensurge",
		name: "Pollen Surge",
	},
	"murkysurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('murkyterrain');
		},
		id: "murkysurge",
		name: "Murky Surge",
	},
	"regalsurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('regalterrain');
		},
		id: "regalsurge",
		name: "Regal Surge",
	},
	"electricsurge": {
		inherit: true,
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('electricterrain');
		},
	},
	"mistysurge": {
		inherit: true,
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('mistyterrain');
		},
	},
	"fierysurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('fieryterrain');
		},
		id: "fierysurge",
		name: "Fiery Surge",
	},
	"chakrasurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('chakraterrain');
		},
		id: "chakrasurge",
		name: "Chakra Surge",
	},
	"elevatedsurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('elevatedterrain');
		},
		id: "elevatedsurge",
		name: "Elevated Surge",
	},
	"ominoussurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('ominousterrain');
		},
		id: "ominoussurge",
		name: "Ominous Surge",
	},
	"grassysurge": {
		inherit: true,
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('grassyterrain');
		},
	},
	"sandysurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('sandyterrain');
		},
		id: "sandysurge",
		name: "Sandy Surge",
	},
	"frostysurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('frostyterrain');
		},
		id: "frostysurge",
		name: "Frosty Surge",
	},
	"cloudysurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('cloudyterrain');
		},
		id: "cloudysurge",
		name: "Cloudy Surge",
	},
	"rockysurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('rockyterrain');
		},
		id: "rockysurge",
		name: "Rocky Surge",
	},
	"corrosivesurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('corrosiveterrain');
		},
		id: "corrosivesurge",
		name: "Corrosive Surge",
	},
	"psychicsurge": {
		inherit: true,
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('psychicterrain');
		},
	},
	"metallicsurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('metallicterrain');
		},
		id: "metallicsurge",
		name: "Metallic Surge",
	},
	"seasurge": {
		onStart: function (source) {
			let foeactive = source.side.foe.active;
			let scorchedEarth = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].ability === 'scorchedearth') scorchedEarth = true;
			}
			if (!this.field.isTerrain('fieryterrain') || !scorchedEarth) this.field.setTerrain('seaterrain');
		},
		id: "seasurge",
		name: "Sea Surge",
	},

	// Pollen terrain
	"beehivecall": {
		onPrepareHit: function (source, target, move) {
			if (this.field.isTerrain('pollenterrain') && move.type === 'Bug' && move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit && !move.isZ) {
				move.multihit = 4;
				move.hasParentalBond = true;
				move.hit = 0;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, pokemon, target, move) {
			if (move.hasParentalBond && ++move.hit > 1) return this.chainModify(1.0/9.0); // myfix: 1/6
		},
		id: "beehivecall",
		name: "Beehive Call",
	},
	"pollenshield": {
		onModifyDefPriority: 6,
		onModifyDef: function (pokemon) {
			if (this.field.isTerrain('pollenterrain')) return this.chainModify(1.5);
		},
		id: "pollenshield",
		name: "Pollen Shield",
	},
	"pollinatorzeal": {
		onModifySpe: function (spe, pokemon) {
			if (this.field.isTerrain('pollenterrain')) {
				return this.chainModify(2);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual: function (pokemon) {
			if (this.field.isTerrain('pollenterrain')) {
				this.heal(pokemon.maxhp / 16);
			}
		},
		id: "pollinatorzeal",
		name: "Pollinator Zeal",
	},

	// Murky terrain abilities
	"dirtyfighting": {
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (this.field.isTerrain('murkyterrain')) {
				if (move.type === 'Dark' || move.type === 'Fighting' || move.type === 'Poison') {
					this.debug('Dirty Fighting boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		id: "dirtyfighting",
		name: "Dirty Fighting",
	},
	"disenchanted": {
		onTryHit: function (target, source, move) {
			if (this.field.isTerrain('murkyterrain') && move.type === 'Fairy') {
				this.add('-immune', target, '[msg]', '[from] ability: Disenchanted');
				return null;
			}
		},
		id: "disenchanted",
		name: "Disenchanted",
	},
	"murkycover": {
		onModifySpe: function (spe, pokemon) {
			if (this.field.isTerrain('murkyterrain')) {
				return this.chainModify(1.5);
			}
		},
		onSourceModifyAccuracy: function (accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('murkycover - enhancing accuracy');
			if (this.field.isTerrain('murkyterrain')) return accuracy * (4.0/3.0);
		},
		id: "murkycover",
		name: "Murky Cover",
	},

	// Regal terrain abilities
	"auraofdestruction": {
		// partially implemented in moves.js:regalterrain
		onStart: function (pokemon) {
			if (this.field.isTerrain('regalterrain')) {
				this.add('-ability', pokemon, 'Aura of Destruction');
				let foeactive = pokemon.side.foe.active;
				for (let i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					foeactive[i].addVolatile('gastroacid');
				}
			}
		},
		onModifyMove: function (move) {
			if (this.field.isTerrain('regalterrain')) move.ignoreAbility = true;
		},
		onEnd: function (pokemon) {
			if (this.field.isTerrain('regalterrain')) {
				let foeactive = pokemon.side.foe.active;
				for (let i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					foeactive[i].removeVolatile('gastroacid');
				}
			}
		},
		id: "auraofdestruction",
		name: "Aura of Destruction",
	},
	"teethbared": {
		onModifyMove: function (move, pokemon) {
			if (this.field.isTerrain('regalterrain') && move.flags['bite']) {
				move.willCrit = true;
			}
		},
		id: "teethbared",
		name: "Teeth Bared",
	},
	"tyranny": {
		onModifyAtkPriority: 5,
		onModifyAtk: function (spa, pokemon) {
			if (this.field.isTerrain('regalterrain')) {
				return this.chainModify(4.0/3.0);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			if (this.field.isTerrain('regalterrain')) {
				return this.chainModify(4.0/3.0);
			}
		},
		id: "tyranny",
		name: "Tyranny",
	},

	// Electric terrain abilities
	"electriccharger": {
		onStart: function (pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('charge');
			}
		},
		id: "electriccharger",
		name: "Electric Charger",
	},
	"overcharge": {
		onModifyAtkPriority: 5,
		onModifyAtk: function (spa, pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.5);
			}
		},
		onResidualOrder: 1,
		onResidual: function (pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				this.damage(pokemon.maxhp / 16, pokemon, pokemon);
			}
		},
		id: "overcharge",
		name: "Overcharge",
	},

	// Misty terrain abilities
	"magicessence": {
		// implemented in moves.js:mistyterrain
		id: "magicessence",
		name: "Magic Essence",
	},
	"mistybliss": {
		onModifySpDPriority: 6,
		onModifySpD: function (spa, pokemon) {
			if (this.field.isTerrain('mistyterrain')) {
				return this.chainModify(1.5);
			}
		},
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (this.field.isTerrain('mistyterrain') && (move.type === 'Poison' || move.type === 'Steel')) {
				this.debug('Misty Bliss weaken');
				return this.chainModify(2.0/3.0);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (this.field.isTerrain('mistyterrain') && (move.type === 'Poison' || move.type === 'Steel')) {
				this.debug('Misty Bliss weaken');
				return this.chainModify(2.0/3.0);
			}
		},
		id: "mistybliss",
		name: "Misty Bliss",
	},
	"mistydamp": {
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (this.field.isTerrain('mistyterrain')) {
				if (move.type === 'Fairy' || move.type === 'Ice' || move.type === 'Water') {
					this.debug('Misty Damp boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		id: "mistydamp",
		name: "Misty Damp",
	},

	// Chakra terrain abilities
	"innerpeace": {
		onModifyDefPriority: 6,
		onModifyDef: function (spa, pokemon) {
			if (this.field.isTerrain('chakraterrain')) {
				return this.chainModify(1.5); // myfix: 4/3
			}
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spa, pokemon) {
			if (this.field.isTerrain('chakraterrain')) {
				return this.chainModify(1.5); // myfix: 4/3
			}
		},
		id: "innerpeace",
		name: "Inner Peace",
	},
	"perfectzen": {
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (this.field.isTerrain('chakraterrain') && move.isZ) {
				this.debug('Perfect Zen boost');
				return this.chainModify(1.5);
			}
		},
		id: "perfectzen",
		name: "Perfect Zen",
	},
	"quickdraw": {
		onModifyPriority: function (priority, pokemon, target, move) {
			if (this.field.isTerrain('chakraterrain') && target.hp === target.maxhp && move.category !== 'Status') {
				return priority + 0.1;
			}
		},
		onModifyDamage: function (damage, source, target, move) {
			if (this.field.isTerrain('chakraterrain') && target.hp === target.maxhp && move.category !== 'Status') {
				return this.chainModify(2);
			}
		},
		id: "quickdraw",
		name: "Quick Draw",
	},

	// Fiery terrain abilities
	"hotheaded": {
		onModifySpe: function (spe, pokemon) {
			if (this.field.isTerrain('fieryterrain')) {
				return this.chainModify(1.5);
			}
		},
		onModifyDamage: function (damage, source, target, move) {
			if (this.field.isTerrain('fieryterrain') && move.typeMod < 0) {
				this.debug('Hot-Headed boost');
				return this.chainModify(1.5);
			}
		},
		id: "hotheaded",
		name: "Hot-Headed",
	},
	"scorchedearth": {
		// implemented in surge abilities and moves.js:fieryterrain; that was one huge pain
		id: "scorchedearth",
		name: "Scorched Earth",
	},
	"soulburn": {
		onModifyMove: function (move, source, target) {
			if (this.field.isTerrain('fieryterrain') && move.category === 'Special' && !move.drain && !move.recoil && move.id !== 'mindblown') {
				move.drain = [1, 2];
			}
		},
		id: "soulburn",
		name: "Soul Burn",
	},

	// Elevated terrain abilities
	"eagleeye": {
		onModifyCritRatio: function (critRatio) {
			if (this.field.isTerrain('elevatedterrain')) return critRatio + 1;
		},
		onSourceModifyAccuracy: function (accuracy) {
			this.debug('eagleeye - enhancing accuracy');
			if (this.field.isTerrain('elevatedterrain')) return true;
		},
		id: "eagleeye",
		name: "Eagle Eye",
	},
	"galeforce": {
		onStart: function (pokemon) {
			if (this.field.isTerrain('elevatedterrain')) {
				pokemon.side.addSideCondition('tailwind');
			}
		},
		onModifyMove: function (move, source, target) {
			if (move.id === 'elevatedterrain') {
				move.sideCondition = 'tailwind';
			}
		},
		id: "galeforce",
		name: "Gale Force",
	},
	"weightless": {
		onModifySpe: function (spe, pokemon) {
			if (this.field.isTerrain('elevatedterrain')) {
				return this.chainModify(2);
			}
		},
		onModifyWeight: function (weight) {
			if (this.field.isTerrain('elevatedterrain')) {
				return weight / 2;
			}
		},
		id: "weightless",
		name: "Weightless",
	},

	// Ominous terrain abilities
	"graveguardian": {
		onModifyAtkPriority: 5,
		onModifyAtk: function (spa, pokemon) {
			if (this.field.isTerrain('ominousterrain')) {
				return this.chainModify(1.5);
			}
		},
		onModifyDamage: function (damage, source, target, move) {
			if (this.field.isTerrain('ominousterrain') && target.types.indexOf('Dark') >= 0) {
				return this.chainModify(2);
			}
		},
		id: "graveguardian",
		name: "Grave Guardian",
	},
	"seance": {
		onStart: function (pokemon) {
			if (this.field.isTerrain('ominousterrain')) {
				let foeactive = pokemon.side.foe.active;
				for (let i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || foeactive[i].fainted) continue;
					if (foeactive[i].item) {
						this.add('-ability', pokemon, 'Se\u0301ance');
						this.add('-item', foeactive[i], foeactive[i].getItem().name, '[from] ability: Se\u0301ance', '[of] ' + pokemon, '[identify]');
					}
				}
			}
		},
		onSourceModifyAccuracy: function (accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('seance - enhancing accuracy');
			if (this.field.isTerrain('ominousterrain')) return accuracy * (4.0/3.0); // myfix: true
		},
		id: "seance",
		name: "Se\u0301ance",
	},
	"trickster": {
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (this.field.isTerrain('ominousterrain') && move.secondaries) {
				for (let i = 0; i < move.secondaries.length; i++) {
					if (move.secondaries[i].status || move.id === 'triattack') move.secondaries[i].chance = 100;
				}
			}
		},
		id: "trickster",
		name: "Trickster",
	},

	// Grassy terrain abilities
	"herbalsprout": {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (this.field.isTerrain('grassyterrain')) {
				if (pokemon.hp && !pokemon.item && this.getItem(pokemon.lastItem).name.substr(-4) === 'Herb') {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Herbal Sprout');
				}
			}
		},
		id: "herbalsprout",
		name: "Herbal Sprout",
	},
	"leafyshield": {
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (this.field.isTerrain('grassyterrain') && (move.type in {'Bug':1, 'Fire':1, 'Flying':1, 'Ice':1, 'Poison':1,})) {
				this.debug('Leafy Shield weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (this.field.isTerrain('grassyterrain') && (move.type in {'Bug':1, 'Fire':1, 'Flying':1, 'Ice':1, 'Poison':1,})) {
				this.debug('Leafy Shield weaken');
				return this.chainModify(0.5);
			}
		},
		id: "leafyshield",
		name: "Leafy Shield",
	},

	// Sandy terrain abilities
	"fairydust": {
		// partially implemented in moves.js:sandyterrain
		onStart: function (pokemon) {
			if (this.field.isTerrain('sandyterrain')) {
				if (pokemon.hasType('Fairy')) return false;
				if (!pokemon.addType('Fairy')) return false;
				this.add('-start', pokemon, 'typeadd', 'Fairy', '[from] ability: Fairy Dust');
			}
		},
		onTryHit: function (target, source, move) {
			if (this.field.isTerrain('sandyterrain') && (move.type === 'Ground')) {
				this.add('-immune', target, '[msg]', '[from] ability: Fairy Dust');
				return null;
			}
		},
		id: "fairydust",
		name: "Fairy Dust",
	},
	"earthshattering": {
		onModifyDamage: function (damage, source, target, move) {
			if (this.field.isTerrain('sandyterrain') && move.typeMod > 0) {
				return this.chainModify(2);
			}
		},
		id: "earthshattering",
		name: "Earth Shattering",
	},
	"stickysand": {
		onBoost: function (boost, target, source, effect) {
			if (!this.field.isTerrain('sandyterrain')) return;
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Sticky Sand", "[of] " + target);
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual: function (pokemon) {
			if (this.field.isTerrain('sandyterrain')) {
				this.heal(pokemon.maxhp / 8);
			} else if (this.field.isTerrain('rockyterrain')) {
				this.damage(pokemon.maxhp / 8);
			}
		},
		id: "stickysand",
		name: "Sticky Sand",
	},

	// Frosty terrain abilities
	"coldhearted": {
		onStart: function (pokemon) {
			if (this.field.isTerrain('frostyterrain')) this.boost({atk: 1, def: -1, spa: 1, spd: -1, spe: 1,});
		},
		id: "coldhearted",
		name: "Cold-Hearted",
	},
	"coldshoulder": {
		onAnyModifyBoost: function (boosts, target) {
			if (this.field.isTerrain('frostyterrain')) {
				let source = this.effectData.target;
				if (source === target) return;
				if (source === this.activePokemon && target === this.activeTarget) {
					boosts['def'] = 0;
					boosts['spd'] = 0;
					boosts['evasion'] = 0;
				}
				if (target === this.activePokemon && source === this.activeTarget) {
					boosts['atk'] = 0;
					boosts['spa'] = 0;
					boosts['accuracy'] = 0;
				}
			}
		},
		onModifyMove: function (move) {
			if (this.field.isTerrain('frostyterrain')) move.infiltrates = true;
		},
		id: "coldshoulder",
		name: "Cold Shoulder",
	},
	"snapfreeze": {
		onSourceHit: function (target, source, move) {
			if (this.field.isTerrain('frostyterrain') && move.type === 'Ice' && move.category !== 'Status') this.damage(target.maxhp / 8, target, source, 'Snap Freeze');
		},
		id: "snapfreeze",
		name: "Snap Freeze",
	},

	// Cloudy terrain abilities
	"clearskies": {
		onModifyAtkPriority: 5,
		onModifyAtk: function (spa, pokemon) {
			if (this.field.isTerrain('cloudyterrain') && !this.weather) {
				return this.chainModify(1.2);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef: function (spa, pokemon) {
			if (this.field.isTerrain('cloudyterrain') && !this.weather) {
				return this.chainModify(1.2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			if (this.field.isTerrain('cloudyterrain') && !this.weather) {
				return this.chainModify(1.2);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD: function (spa, pokemon) {
			if (this.field.isTerrain('cloudyterrain') && !this.weather) {
				return this.chainModify(1.2);
			}
		},
		onModifySpe: function (spa, pokemon) {
			if (this.field.isTerrain('cloudyterrain') && !this.weather) {
				return this.chainModify(1.2);
			}
		},
		id: "clearskies",
		name: "Clear Skies",
	},
	"cloudcleanse": {
		onStart: function (pokemon) {
			if (this.field.isTerrain('cloudyterrain')) {
				this.add('-activate', pokemon, 'ability: Cloud Cleanse');
				let side = pokemon.side;
				let success = false;
				for (const ally of side.pokemon) {
					if (ally.hasAbility('soundproof')) continue;
					if (ally.cureStatus()) success = true;
				}
				return success;
			}
		},
		id: "cloudcleanse",
		name: "Cloud Cleanse",
	},
	"nimbusforce": {
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (this.field.isTerrain('cloudyterrain') && move.ignoreImmunity !== true) {
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onModifyDamage: function (damage, source, target, move) {
			if (this.field.isTerrain('cloudyterrain') && move.type === 'Normal' && target.types.indexOf('Ghost') >= 0) {
				return this.chainModify(2);
			}
		},
		id: "nimbusforce",
		name: "Nimbus Force",
	},

	// Corrosive terrain abilities
	"cauldronbubble": { // test if broken
		onStart: function (pokemon) {
			if (this.field.isTerrain('corrosiveterrain')) this.boost({spa: 1, spd: 1,});
		},
		onAfterDamage: function (damage, target, source, move) {
			if (this.field.isTerrain('corrosiveterrain') && move && move.flags['contact']) {
				source.addVolatile('curse', this.effectData.target);
			}
		},
		id: "cauldronbubble",
		name: "Cauldron Bubble",
	},
	"neurotoxin": {
		onModifyMove: function (move, source, target) {
			if (this.field.isTerrain('corrosiveterrain') && move.category === 'Special' && !move.drain && !move.recoil && move.id !== 'mindblown') {
				move.drain = [1, 2];
			}
		},
		id: "neurotoxin",
		name: "Neurotoxin",
	},
	"toxicwaste": {
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (this.field.isTerrain('corrosiveterrain')) {
				if (move.status && move.status === 'psn') move.status = 'tox';
				if (move.secondaries) {
					for (let i = 0; i < move.secondaries.length; i++) {
						if (move.secondaries[i].status && move.secondaries[i].status === 'psn') move.secondaries[i].status = 'tox';
					}
				}
			}
		},
		// Toxic Spikes buff implemented in moves.js:toxicspikes
		id: "toxicwaste",
		name: "Toxic Waste",
	},

	// Psychic terrain abilities
	"enchantedregalia": {
		// partially implemented in moves.js:psychicicterrain
		onStart: function (pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
				let foeactive = pokemon.side.foe.active;
				let activated = false;
				for (let i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Enchanted Regalia');
						activated = true;
					}
					foeactive[i].addVolatile('embargo');
				}
			}
		},
		onModifyDamage: function (damage, source, target, move) {
			if (this.field.isTerrain('psychicterrain') && source.item) {
				return this.chainModify(1.2);
			}
		},
		// need to apply it every turn because Embargo has limited duration
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
				let foeactive = pokemon.side.foe.active;
				for (let i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					foeactive[i].addVolatile('embargo');
				}
			}
		},
		onEnd: function (pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
				let foeactive = pokemon.side.foe.active;
				for (let i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					foeactive[i].removeVolatile('embargo');
				}
			}
		},
		id: "enchantedregalia",
		name: "Enchanted Regalia",
	},
	"mindovermatter": {
		onModifyMove: function (move, pokemon) {
			if (this.field.isTerrain('psychicterrain') && move.category === 'Physical') move.category = 'Special';
		},
		id: "mindovermatter",
		name: "Mind over Matter",
	},
	"otherwordlyvoice": {
		onBasePower: function (basePower, attacker, defender, move) {
			if (this.field.isTerrain('psychicterrain') && move.flags['sound']) {
				this.debug('Otherwordly Voice boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (this.field.isTerrain('psychicterrain') && (move.type === 'Dark' || move.type === 'Ghost')) {
				this.debug('Otherwordly Voice');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (this.field.isTerrain('psychicterrain') && (move.type === 'Dark' || move.type === 'Ghost')) {
				this.debug('Otherwordly Voice');
				return this.chainModify(0.5);
			}
		},
		id: "otherwordlyvoice",
		name: "Otherwordly Voice",
	},

	// Rocky terrain abilities
	"gemenergy": {
		// implemented in moves.js and statuses.js; that was a pain too
		id: "gemenergy",
		name: "Gem Energy",
	},
	"metalcrush": {
		// implemented in moves.js:rockyterrain
		onModifyMove: function (move, pokemon) {
			if (this.field.isTerrain('rockyterrain') && move && move.type === 'Rock') {
				move.metalCrushBoosted = true;
			}
		},
		id: "metalcrush",
		name: "Metal Crush",
	},
	"meteorstrike": {
		onModifyPriority: function (priority, pokemon, target, move) {
			if (this.field.isTerrain('rockyterrain') && pokemon.activeTurns <= 1 && move.category !== 'Status') {
				return priority += 3;
			}
		},
		onModifyDamage: function (damage, source, target, move) {
			if (this.field.isTerrain('rockyterrain') && source.activeTurns <= 1) {
				return this.chainModify(2);
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove: function (pokemon, target, move) {
			if (this.field.isTerrain('rockyterrain') && pokemon.activeTurns <= 1 && move.category !== 'Status' && this.getEffectiveness(move.type, target) < 0) {
				this.add('cant', pokemon, 'ability: Meteor Strike', move);
				return false;
			}
		},
		id: "meteorstrike",
		name: "Meteor Strike",
	},

	// Metallic terrain
	"juryrig": {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (this.field.isTerrain('metallicterrain')) {
				if (pokemon.hp && !pokemon.item && !this.getItem(pokemon.lastItem).isBerry && this.getItem(pokemon.lastItem).name.substr(-4) !== 'Herb') {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Jury Rug');
				}
			}
		},
		id: "juryrig",
		name: "Jury Rig",
	},
	"mirrorimage": {
		// implemented in scripts.js:getDamage
		id: "mirrorimage",
		name: "Mirror Image",
	},
	"smartmetal": {
		onSourceFaint: function (target, source, effect) {
			if (this.field.isTerrain('metallicterrain') && effect && effect.effectType === 'Move') {
				let stat = 'atk';
				let bestStat = 0;
				for (let i in source.stats) {
					if (source.stats[i] > bestStat) {
						stat = i;
						bestStat = source.stats[i];
					}
				}
				this.boost({[stat]: 2}, source);
			}
		},
		id: "smartmetal",
		name: "Smart Metal",
	},

	// Sea terrain
	"seafoamsplash": {
		onSourceModifyDamage: function (damage, source, target, move) {
			if (this.field.isTerrain('seaterrain')) {
				return this.chainModify(0.75);
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (this.field.isTerrain('seaterrain')) {
				if (effect && effect.status) this.add('-immune', target, '[msg]', '[from] ability: Seafoam Splash');
				return false;
			}
		},
		onTryAddVolatile: function (status, target) {
			if (status.id === 'yawn' && this.field.isTerrain('seaterrain')) {
				this.add('-immune', target, '[msg]', '[from] ability: Seafoam Splash');
				return null;
			}
		},
		id: "seafoamsplash",
		name: "Seafoam Splash",
	},
	"stormrage": {
		onModifyDamage: function (damage, source, target, move) {
			if (this.field.isTerrain('seaterrain') && target.types.indexOf('Grass') >= 0) {
				return this.chainModify(1.5);
			}
		},
		onModifyMove: function (move) {
			if (this.field.isTerrain('seaterrain') && move.type === 'Water') move.ignoreAbility = true;
		},
		id: "stormrage",
		name: "Storm Rage",
	},
	"waterwalker": {
		onModifySpe: function (spe, pokemon) {
			if (this.field.isTerrain('seaterrain')) {
				return this.chainModify(4.0/3.0); // myfix: 1.5
			}
		},
		onTryHit: function (target, source, move) {
			if (this.field.isTerrain('seaterrain') && move.type === 'Ground' && move.id !== 'thousandarrows') {
				this.add('-immune', target, '[msg]', '[from] ability: Water Walker');
				return null;
			}
		},
		onDamage: function (damage, target, source, effect) {
			if (!effect) return;
			if (this.field.isTerrain('seaterrain') && effect.id === 'spikes') {
				return false;
			}
		},
		onBoost: function (boost, target, source, effect) {
			if (!effect) return;
			if (this.field.isTerrain('seaterrain')) {
				if (effect.id === 'rototiller') {
					delete boost['atk'];
					delete boost['spa'];
				}
				if (effect.id === 'stickyweb') delete boost['spe'];
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (!effect) return false;
			if (this.field.isTerrain('seaterrain') && effect.id === 'toxicspikes') return false;
		},
		// also implemented in Arena Trap below
		id: "waterwalker",
		name: "Water Walker",
	},

	"arenatrap": {
		inherit: true,
		onFoeTrapPokemon: function (pokemon) {
			if (!this.isAdjacent(pokemon, this.effectData.target)) return;
			if (pokemon.isGrounded() && (!this.field.isTerrain('seaterrain') || pokemon.ability !== 'waterwalker')) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!this.isAdjacent(pokemon, source)) return;
			if (pokemon.isGrounded(!pokemon.knownType) && (!this.field.isTerrain('seaterrain') || pokemon.ability !== 'waterwalker')) { // Negate immunity if the type is unknown
				pokemon.maybeTrapped = true;
			}
		},
	},
};
