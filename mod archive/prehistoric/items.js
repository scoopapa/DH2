'use strict';

exports.BattleItems = {
	"abomasite": {
		id: "abomasite",
		name: "Abomasite",
		isUnreleased: true,
		spritenum: 575,
		megaStone: "Abomasnow-Mega",
		megaEvolves: "Abomasnow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If holder is an Abomasnow, this item allows it to Mega Evolve in battle.",
	},
  "stoneorb": {
		id: "stoneorb",
		name: "Stone Orb",
		spritenum: 390,
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && pokemon.baseTemplate.species === 'Carracosta') {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			let template = this.getTemplate('Carracosta-Primal');
			pokemon.formeChange(template);
			pokemon.baseTemplate = template;
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			if (pokemon.illusion) {
				pokemon.ability = ''; // Don't allow Illusion to wear off
				this.add('-primal', pokemon.illusion);
			} else {
				this.add('detailschange', pokemon, pokemon.details);
				this.add('-primal', pokemon);
			}
			pokemon.setAbility(template.abilities['0']);
			pokemon.baseAbility = pokemon.ability;
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Carracosta') return false;
			return true;
		},
		num: 1000,
		gen: 7,
		desc: "If holder is a Carracosta, this item triggers its Primal Reversion in battle.",
	},
  "shellorb": {
		id: "shellorb",
		name: "Shell Orb",
		spritenum: 41,
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && pokemon.baseTemplate.species === 'Barbaracle') {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			let template = this.getTemplate('Barbaracle-Primal');
			pokemon.formeChange(template);
			pokemon.baseTemplate = template;
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			if (pokemon.illusion) {
				pokemon.ability = ''; // Don't allow Illusion to wear off
				this.add('-primal', pokemon.illusion);
			} else {
				this.add('detailschange', pokemon, pokemon.details);
				this.add('-primal', pokemon);
			}
			pokemon.setAbility(template.abilities['0']);
			pokemon.baseAbility = pokemon.ability;
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Barbaracle') return false;
			return true;
		},
		num: 1001,
		gen: 7,
		desc: "If holder is a Barbaracle, this item triggers its Primal Reversion in battle.",
	},
  "spikedorb": {
		id: "spikedorb",
		name: "Spiked Orb",
		spritenum: 390,
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && pokemon.baseTemplate.species === 'Chesnaught') {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			let template = this.getTemplate('Chesnaught-Primal');
			pokemon.formeChange(template);
			pokemon.baseTemplate = template;
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			if (pokemon.illusion) {
				pokemon.ability = ''; // Don't allow Illusion to wear off
				this.add('-primal', pokemon.illusion);
			} else {
				this.add('detailschange', pokemon, pokemon.details);
				this.add('-primal', pokemon);
			}
			pokemon.setAbility(template.abilities['0']);
			pokemon.baseAbility = pokemon.ability;
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Chesnaught') return false;
			return true;
		},
		num: 1002,
		gen: 7,
		desc: "If holder is a Chesnaught, this item triggers its Primal Reversion in battle.",
	},
  "moonorb": {
		id: "moonorb",
		name: "Moon Orb",
		spritenum: 41,
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && pokemon.baseTemplate.species === 'Guzzlord') {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			let template = this.getTemplate('Guzzlord-Primal');
			pokemon.formeChange(template);
			pokemon.baseTemplate = template;
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			if (pokemon.illusion) {
				pokemon.ability = ''; // Don't allow Illusion to wear off
				this.add('-primal', pokemon.illusion);
			} else {
				this.add('detailschange', pokemon, pokemon.details);
				this.add('-primal', pokemon);
			}
			pokemon.setAbility(template.abilities['0']);
			pokemon.baseAbility = pokemon.ability;
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Guzzlord') return false;
			return true;
		},
		num: 1003,
		gen: 7,
		desc: "If holder is a Guzzlord, this item triggers its Primal Reversion in battle.",
	},
  "blueorb": {
		id: "rageorb",
		name: "Rage Orb",
		spritenum: 590,
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && pokemon.baseTemplate.species === 'Darmanitan') {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			let template = this.getTemplate('Darmanitan-Primal');
			pokemon.formeChange(template);
			pokemon.baseTemplate = template;
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			if (pokemon.illusion) {
				pokemon.ability = ''; // Don't allow Illusion to wear off
				this.add('-primal', pokemon.illusion);
			} else {
				this.add('detailschange', pokemon, pokemon.details);
				this.add('-primal', pokemon);
			}
			pokemon.setAbility(template.abilities['0']);
			pokemon.baseAbility = pokemon.ability;
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Darmanitan') return false;
			return true;
		},
		num: 1004,
		gen: 7,
		desc: "If holder is a Darmanitan, this item triggers its Primal Reversion in battle.",
	},
  };
