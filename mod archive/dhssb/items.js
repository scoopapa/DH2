'use strict';

exports.BattleItems = {
	"spandansphone": {
		id: "spandansphone",
		name: "Spandan's Phone",
		zMove: "I'm Toxic You're Slippin Under",
		zMoveFrom: "Here's my phone <3",
		zMoveUser: ["Mareanie"],
		spritenum: 537,
		fling: {
			basePower: 90,
		},
		onStart: function(target) {
			this.add('-activate', target, 'ability: Spandan\'s Phone');
			this.add('message', "VALIDATING USER. VALIDATING USER.  VALIDATING USER.");
			if (target.name === 'Spandan' || target.name === 'Mareanie') {
				this.add('message', `USER VALIDATION SUCCESSFUL. WELCOME, ${target.name}`);
				this.boost({def: 2, spd: 2});
				return;
			}
			this.add('message', "INVALID USER. DEVICE WILL NOW GO INTO SELF DESTRUCT");
			this.add('message', "*kaboom*")
			this.directDamage(target.maxhp / 4);
			this.add('-enditem', target, 'Spandan\'s Phone');
			target.item = '';
			this.itemData = {id: '', target: this};
			this.runEvent('AfterUseItem', target, null, null, 'spandansphone');
		},
		desc: "Noone should have Spandan's Phone except Spandan.",
	},
	"unknownsash": {
		id: "unknownsash",
		name: "Unknown Sash",
		megaStone: "Dragonite",
		megaEvolves: "Dratini",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		onDamage: function(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				if (target.useItem()) {
					return target.hp - 1;
				}
			}
		},
		desc: "If holder is Elcrest, this item allows it to Evolve in battle. For some reason, if Elcrest's HP is full, it will survive that would KO it with 1 HP. Single Use"
	},
	"salamencite": {
		id: "salamencite",
		name: "Salamencite",
		spritenum: 627,
		megaStone: "Salamence-Mega",
		megaEvolves: "Salamence",
		zMove: "Total Annhilation",
		zMoveFrom: "Yo Mamma Joke",
		zMoveUser: ["Salamence-Mega", "Salamence"],
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is Spandan, this item allows it to Mega Evolve in battle, and also use its special Z Move.",
	},
	"ransiumz": {
		id: "ransiumz",
		name: "Ransium Z",
		onTakeItem: false,
		zMove: "Z-Ransei",
		zMoveFrom: "Legend's Ambition",
		zMoveUser: ["Rayquaza"],
		desc: "If holder is Ransei it can use Z-Ransei",
	},
	"zapmasteriumz": {
		id: "zapmasteriumz",
		name: "Zapmasterium-Z",
		onTakeItem: false,
		zMove: "Knee of Justice",
		zMoveFrom: "Shitpost",
		zMoveUser: ["Scrafty"],
		desc: "If holder is Zapmaster2010 it can use Knee of Justice.",
	},
	"ludicrousiumz": {
		id: "ludicrousiumz",
		name: "Ludicrousium-Z",
		onTakeItem: false,
		zMove: "Infernal Abyss",
		zMoveFrom: "Infernal Rain",
		zMoveUser: ["Typhlosion"],
		desc: "If holder is Ludicrousity it can use Infernal Abyss.",
	},
};
