'use strict';
const feDex = require('../../data/mods/fe/pokedex.js').BattlePokedex;

exports.commands = {

learnistor: function(target, room, user) {
		if (!this.runBroadcast()) return;
		let learnstor = Dex.mod('istor').data.Learnsets, movestor = Dex.mod('istor').data.Movedex, dexstor = Dex.mod('istor').data.Pokedex;
		if (!target || toID(target) === '') return this.sendReply("/learnistor: Shows the whether a Pokemon can learn a move, including Pokemon and Moves from istor.");
		let targets = target.split(','), mon = targets[0], move = targets[1];
		if (!mon || !dexstor[toID(mon)]) return this.errorReply("Error: Pokemon not found");
		if (!learnstor[toID(mon)]) return this.errorReply("Error: Learnset not found");
		if (!move || !movestor[toID(move)]) return this.errorReply("Error: Move not found");
		mon = dexstor[toID(mon)];
		move = movestor[toID(move)];
		if (learnstor[toID(mon.species)].learnset[toID(move.name)]) {
			return this.sendReplyBox("In Istor, " + mon.species + ' <font color="green"><u><b>can<b><u></font> learn ' + move.name);
		}
		return this.sendReplyBox("In Istor, " + mon.species + ' <font color="red"><u><b>can\'t<b><u></font> learn ' + move.name);
	},

	istorlist: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Istor Pokemon</h2></center>`;
		let istorDex = require('../../data/mods/istor/pokedex.js').BattlePokedex;
		if (!istorDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(istorDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, Istor" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	istorlisthelp: ["/istorlist - Shows the list of Istor Pokemon."],
	crossoverchaos: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Crossover Chaos Pokemon</h2></center>`;
		let ccDex = require('../../data/mods/crossoverchaos/pokedex.js').BattlePokedex;
		if (!ccDex) return this.errorReply("Error Fetching Crossover Chaos Data.");
		Object.values(ccDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, crossoverchaos" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	crossoverchaoshelp: ["/crossoverchaos - Shows the list of Pokemon in Crossover Chaos."],
	crossovermoves: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Crossover Chaos Moves</h2></center>`;
		let eternalDex = require('../../data/mods/crossoverchaos/moves.js').BattleMovedex;
		if (!eternalDex) return this.errorReply("Error Fetching Eternal Data.");
		Object.values(eternalDex).forEach(move => {
			buf += `<button name="send" value="/dt ${move.id}, crossoverchaos" style="background:none;border:none;">${move.id}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	felist: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, FE" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	felisthelp: ["/felist - Shows the list of Pokemon in Fusion Evolution."],
	fedex: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>Fusion Evolution Lab Reports</h2></center>`;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let separated = target.split(" ");
			let fusionmon = (("" + separated[0]).trim());
			if (mon.species === fusionmon) {
			buf += `<strong>${mon.species}:</strong> <i>${mon.dexentry}</i><br>`;
			}
			else if (fusionmon === "") {
			buf += `<strong>${mon.species}:</strong> <i>${mon.dexentry}</i><br><br>`;
			}
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	fedexhelp: ["/fedex - Shows the dex entries of Pokemon in Fusion Evolution."],
		mfastone: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<center><img src="https://play.pokemonshowdown.com/sprites/xyani/marshadow.gif" widht="48" height="63"><h3>Megas For All Mega Stones</h3><img src="https://play.pokemonshowdown.com/sprites/xyani/marshadow.gif" widht="48" height="63"></center>`;
		let sylveDex = require('../../data/mods/megasforall/items.js').BattleItems;
		if (!sylveDex) return this.errorReply("Error Fetching MFA Data.");
		Object.values(sylveDex).forEach(item => {
			let separated = target.split(" ");
			let megamon = (("" + separated[0]).trim());
			if (item.megaEvolves === megamon) {
			buf += `<strong>${megamon}:</strong> ${item.name}`;
			}
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	nerfmons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Nerfed Pokemon</h2></center>`;
		let feDex = require('../../data/mods/nerfmons/pokedex.js').BattlePokedex;
		if (!feDex) return this.errorReply("Error Fetching Nerf Data.");
		Object.values(feDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, nerfmons" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	nerfmonshelp: ["/nerfmons - Shows the list of Nerfed Pokemon."],
	optimons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Optimized Pokemon</h2></center>`;
		let feDex = require('../../data/mods/opti/pokedex.js').BattlePokedex;
		if (!feDex) return this.errorReply("Error Fetching Opti Data.");
		Object.values(feDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, opti" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	optimonshelp: ["/optimons - Shows the list of Optimized."],
	jillianlist: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Jillian Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/jillian/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, Jillian" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	jillianlisthelp: ["/jillianlist - Shows the list of Pokemon in Jillian."],
	eternalmons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Eternal Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/eternal/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, Eternal" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	eternalmonsthelp: ["/eternalmons - Shows the list of Pokemon in Eternal Pokemon."],
	eternallearn: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Eternal Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/eternal/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `this.modData('Learnsets', '${mon.baseSpecies}').learnset.move = ['7L1']&#59; <br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	eternallearnthelp: ["/eternalmons - Shows the list of Pokemon in Eternal Pokemon."],
	eternalmoves: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Eternal Pokemon Moves</h2></center>`;
		let eternalDex = require('../../data/mods/eternal/moves.js').BattleMovedex;
		if (!eternalDex) return this.errorReply("Error Fetching Eternal Data.");
		Object.values(eternalDex).forEach(move => {
			buf += `<button name="send" value="/dt ${move.id}, Eternal" style="background:none;border:none;">${move.id}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
		zmoves: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Z-Moves</h2></center>`;
		let eternalDex = require('../../data/mods/zmoveseverywhere/moves.js').BattleMovedex;
		if (!eternalDex) return this.errorReply("Error Fetching Eternal Data.");
		Object.values(eternalDex).forEach(move => {
			buf += `<button name="send" value="/dt ${move.id}, zmoveseverywhere" style="background:none;border:none;">${move.name}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	fusionmoves: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Pokemon Moves</h2></center>`;
		let eternalDex = require('../../data/mods/fe/moves.js').BattleMovedex;
		if (!eternalDex) return this.errorReply("Error Fetching Fusion Data.");
		Object.values(eternalDex).forEach(move => {
			buf += `<button name="send" value="/dt ${move.id}, Fusion" style="background:none;border:none;">${move.name}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	femovescalc: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Pokemon Moves</h2></center>`;
		let eternalDex = require('../../data/mods/fe/moves.js').BattleMovedex;
		if (!eternalDex) return this.errorReply("Error Fetching Fusion Data.");
		Object.values(eternalDex).forEach(move => {
			buf += `'${move.name}':{<br>bp:${move.basePower}, <br>type:'${move.type}',<br>category:'${move.category}',<br>},<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	usv: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Ultra Space Variants Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/usv/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, Usv" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	usvhelp: ["/eternalmons - Shows the list of Pokemon in Ultra Space Variant."],
	clovermons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Clovermons</h2></center>`;
		let jillianDex = require('../../data/mods/clovermons/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, Clovermons" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	clovermonshelp: ["/clovermons - Shows the list of Clovermons."],
		eeveed: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Eeeved Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/eeveed/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, eeveed" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	eeveedhelp: ["/eeveed - Shows the list of Pokemon in Eeevee'd."],
	eeveedmegas: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Eeveed Mega Stones</h2></center>`;
		let feDex = require('../../data/mods/eeveed/items.js').BattleItems;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(item => {
			buf += `<button name="send" value="/dt ${item.name}, FE" style="background:none;border:none;">${item.id}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	eeveedmegashelp: ["/femegas - Shows the list of Mega Stones in Fusion Evolution."],
	eeveedabilities: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Coded Eeveed Abilities</h2></center>`;
		let feDex = require('../../data/mods/eeveed/abilities.js').BattleAbilities;
		if (!feDex) return this.errorReply("Error Fetching Eeveed Data.");
		Object.values(feDex).forEach(ability => {
			buf += `<b>${ability.name}</b>: ${ability.shortDesc}<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	eeveedlearnsets: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Eeveed Movepools</h2></center>`;
		let feDex = require('../../data/mods/eeveed/learnsets.js').BattleLearnsets;
		if (!feDex) return this.errorReply("Error Fetching Eeveed Data.");
		Object.values(feDex).forEach(movepool => {
			buf += `<b>${movepool}</b>:<br> ${movepool.learnset.value}<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	tnfg: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of PTNFG Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/thefirstnewgen/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, thefirstnewgen" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	tnfghelp: ["/tnfg - Shows the list of Pokemon in Pokemon: The New First Gen."],

		mfa: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of MFA Pokemon</h2><br>Clickable list!</center>`;
		let mfaDex = require('../../data/mods/megasforall/pokedex.js').BattlePokedex;
		if (!mfaDex) return this.errorReply("Error Fetching MFA Data.");
		Object.values(mfaDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, megasforall" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
		mfahelp: ["/mfa - Shows the list of Pokemon in Megas For All."],
	mfaitem: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of MFA Pokemon</h2><br>Clickable list!</center>`;
		let mfaDex = require('../../data/mods/megasforall/formats-data.js').BattleFormatsData ;
		if (!mfaDex) return this.errorReply("Error Fetching MFA Data.");
		Object.values(mfaDex).forEach(mon => {
			buf += `requiredItem: &quot;${mon.requiredItem}&quot;<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
		mfaitemhelp: ["/mfa - Shows the list of Pokemon in Megas For All."],
	 alola: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Alola Formes Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/alola/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, alola" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	alolahelp: ["/alola - Shows the list of Pokemon in Alola Formes."],
	femegas: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Mega Stones</h2></center>`;
		let feDex = require('../../data/mods/fe/items.js').BattleItems;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(item => {
			buf += `<button name="send" value="/dt ${item.name}, FE" style="background:none;border:none;">${item.id}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	femegashelp: ["/femegas - Shows the list of Mega Stones in Fusion Evolution."],
	feabilities: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Coded Fusion Evolution Abilities</h2></center>`;
		let feDex = require('../../data/mods/fe/abilities.js').BattleAbilities;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(ability => {
			buf += `<button name="send" value="/dt ${ability.id}, FE" style="background:none;border:none;">${ability.name}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	feate: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Coded Fusion Evolution Abilities</h2></center>`;
		let feDex = require('../../data/mods/fe/abilities.js').BattleAbilities;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(ability => {
			if (ability.name.includes('ate')) {
			buf += `<button name="send" value="/dt ${ability.id}, FE" style="background:none;border:none;">${ability.name}</button><br>`;
				 }
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	sylvemoves: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Coded Fusion Moves</h2></center>`;
		let sylveDex = require('../../data/mods/fe/moves.js').BattleMovedex;
		if (!sylveDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(sylveDex).forEach(move => {
			buf += `<button name="send" value="/dt ${move.id}, FE" style="background:none;border:none;">${move.id}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
sylveitems: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Sylvemons Items Additions/Alterations</h2></center>`;
		let sylveDex = require('../../data/mods/sylvemons/items.js').BattleItems;
		if (!sylveDex) return this.errorReply("Error Fetching Sylvemons Data.");
		Object.values(sylveDex).forEach(item => {
			buf += `<button name="send" value="/dt ${item.id}, Sylvemons" style="background:none;border:none;">${item.id}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	sylvemoves: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Sylvemons Moves Additions/Alterations</h2></center>`;
		let sylveDex = require('../../data/mods/sylvemons/moves.js').BattleMovedex;
		if (!sylveDex) return this.errorReply("Error Fetching Sylvemons Data.");
		Object.values(sylveDex).forEach(move => {
			buf += `<button name="send" value="/dt ${move.id}, Sylvemons" style="background:none;border:none;">${move.id}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	sylveabilities: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Sylvemons Abilities Additions/Alterations</h2></center>`;
		let sylveDex = require('../../data/mods/sylvemons/abilities.js').BattleAbilities;
		if (!sylveDex) return this.errorReply("Error Fetching Sylvemons Data.");
		Object.values(sylveDex).forEach(ability => {
			buf += `<button name="send" value="/dt ${ability.id}, Sylvemons" style="background:none;border:none;">${ability.id}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
gutter: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Alola Formes Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/fe/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `&quot;${mon.species}&quot;: {<br> &quot;t1&quot;: &quot;${mon.types[0]}&quot;, <br>&quot;t2&quot;: &quot;${mon.types[1]}&quot;,<br> &quot;bs&quot;: { <br>&quot;hp&quot;: ${mon.baseStats.hp}, <br>&quot;at&quot;: ${mon.baseStats.atk}, <br> &quot;df&quot;: ${mon.baseStats.def}, <br> &quot;sa&quot;: ${mon.baseStats.spa},<br>&quot;sd&quot;: ${mon.baseStats.spd}, <br>&quot;sp&quot;: ${mon.baseStats.spe} <br> }, <br> },<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	egutter: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Alola Formes Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/eternal/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `&quot;${mon.species}&quot;: {<br> &quot;t1&quot;: &quot;${mon.types[0]}&quot;, <br>&quot;t2&quot;: &quot;${mon.types[1]}&quot;,<br> &quot;bs&quot;: { <br>&quot;hp&quot;: ${mon.baseStats.hp}, <br>&quot;at&quot;: ${mon.baseStats.atk}, <br> &quot;df&quot;: ${mon.baseStats.def}, <br> &quot;sa&quot;: ${mon.baseStats.spa},<br>&quot;sd&quot;: ${mon.baseStats.spd}, <br>&quot;sp&quot;: ${mon.baseStats.spe} <br> }, <br> &quot;w&quot;: ${mon.weightkg}<br> },<br>`;
});
		this.sendReplyBox(`${buf}</div>`);
	},
		csgutter: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Alola Formes Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/cleanslate/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `&quot;${mon.species}&quot;: {<br> &quot;t1&quot;: &quot;${mon.types[0]}&quot;, <br>&quot;t2&quot;: &quot;${mon.types[1]}&quot;,<br> &quot;bs&quot;: { <br>&quot;hp&quot;: ${mon.baseStats.hp}, <br>&quot;at&quot;: ${mon.baseStats.atk}, <br> &quot;df&quot;: ${mon.baseStats.def}, <br> &quot;sa&quot;: ${mon.baseStats.spa},<br>&quot;sd&quot;: ${mon.baseStats.spd}, <br>&quot;sp&quot;: ${mon.baseStats.spe} <br> }, <br> &quot;w&quot;: ${mon.weightkg}<br> },<br>`;
});
		this.sendReplyBox(`${buf}</div>`);
	},
	mbhgutter: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Alola Formes Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/morebalancedhackmons/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `&quot;${mon.species}&quot;: {<br> &quot;t1&quot;: &quot;${mon.types[0]}&quot;, <br>&quot;t2&quot;: &quot;${mon.types[1]}&quot;,<br> &quot;bs&quot;: { <br>&quot;hp&quot;: ${mon.baseStats.hp}, <br>&quot;at&quot;: ${mon.baseStats.atk}, <br> &quot;df&quot;: ${mon.baseStats.def}, <br> &quot;sa&quot;: ${mon.baseStats.spa},<br>&quot;sd&quot;: ${mon.baseStats.spd}, <br>&quot;sp&quot;: ${mon.baseStats.spe} <br> }, <br> &quot;w&quot;: ${mon.weightkg}<br> },<br>`;
});
		this.sendReplyBox(`${buf}</div>`);
	},
	e4egutter: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Alola Formes Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/evosforeveryone/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			buf += `&quot;${mon.species}&quot;: {<br> &quot;t1&quot;: &quot;${mon.types[0]}&quot;, <br>&quot;t2&quot;: &quot;${mon.types[1]}&quot;,<br> &quot;bs&quot;: { <br>&quot;hp&quot;: ${mon.baseStats.hp}, <br>&quot;at&quot;: ${mon.baseStats.atk}, <br> &quot;df&quot;: ${mon.baseStats.def}, <br> &quot;sa&quot;: ${mon.baseStats.spa},<br>&quot;sd&quot;: ${mon.baseStats.spd}, <br>&quot;sp&quot;: ${mon.baseStats.spe} <br> }, <br> &quot;w&quot;: ${mon.weightkg}<br> },<br>`;
});
		this.sendReplyBox(`${buf}</div>`);
	},
		mgutter: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Alola Formes Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/megasforall/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			if (mon.forme === 'Mega') {
			buf += `&quot;${mon.species}&quot;: {<br> &quot;t1&quot;: &quot;${mon.types[0]}&quot;, <br>&quot;t2&quot;: &quot;${mon.types[1]}&quot;,<br> &quot;bs&quot;: { <br>&quot;hp&quot;: ${mon.baseStats.hp}, <br>&quot;at&quot;: ${mon.baseStats.atk}, <br> &quot;df&quot;: ${mon.baseStats.def}, <br> &quot;sa&quot;: ${mon.baseStats.spa},<br>&quot;sd&quot;: ${mon.baseStats.spd}, <br>&quot;sp&quot;: ${mon.baseStats.spe} <br> }, <br> &quot;w&quot;: ${mon.weightkg}<br> },<br>`;
}});
		this.sendReplyBox(`${buf}</div>`);
	},
evgutter: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Alola Formes Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/eeveed/pokedex.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(mon => {
			if (mon.num > 9000) {
			buf += `&quot;${mon.species}&quot;: {<br> &quot;t1&quot;: &quot;${mon.types[0]}&quot;, <br>&quot;t2&quot;: &quot;${mon.types[1]}&quot;,<br> &quot;bs&quot;: { <br>&quot;hp&quot;: ${mon.baseStats.hp}, <br>&quot;at&quot;: ${mon.baseStats.atk}, <br> &quot;df&quot;: ${mon.baseStats.def}, <br> &quot;sa&quot;: ${mon.baseStats.spa},<br>&quot;sd&quot;: ${mon.baseStats.spd}, <br>&quot;sp&quot;: ${mon.baseStats.spe} <br> }, <br> },<br>`;
			}
			});
		this.sendReplyBox(`${buf}</div>`);
	},
	egutter2: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Alola Formes Pokemon</h2></center>`;
		let jillianDex = require('../../data/mods/eternal/moves.js').BattlePokedex;
		if (!jillianDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(jillianDex).forEach(move => {
			buf += `'${move.name}': {<br> ${move.basePower}, 'category': ${move.category},<br>},`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},

	fespeed: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let speedtierplusscarf = (2.2 * mon.baseStats.spe + 108.9) * 1.5;
			let speedtierscarf = (2 * mon.baseStats.spe + 99) * 1.5;
			let speedtierplus = 2.2 * mon.baseStats.spe + 108.9;
			let speedtier = 2 * mon.baseStats.spe + 99;
			let speedtierzero = 2 * mon.baseStats.spe + 36;
			buf += `${speedtierplus}: Fast+ ${mon.species}<br>${speedtier}: Fast ${mon.species}<br>${speedtierzero}: Bulky ${mon.species}<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	featk: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let speedtierplus =mon.baseStats.atk;
			buf += `${speedtierplus}: ${mon.species}<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	fespa: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let speedtierplus =mon.baseStats.spa;
			buf += `${speedtierplus}: ${mon.species}<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	eternalspeed: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		let feDex = require('../../data/mods/eternal/pokedex.js').BattlePokedex;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let speedtierplusscarf = (2.2 * mon.baseStats.spe + 108.9) * 1.5;
			let speedtierscarf = (2 * mon.baseStats.spe + 99) * 1.5;
			let speedtierplus = 2.2 * mon.baseStats.spe + 108.9;
			let speedtier = 2 * mon.baseStats.spe + 99;
			let speedtierzero = 2 * mon.baseStats.spe + 36;
			buf += `${speedtierplusscarf}: Scarf Fast+ ${mon.species}<br>${speedtierscarf}: Scarf Fast ${mon.species}<br>${speedtierplus}: Fast+ ${mon.species}<br>${speedtier}: Fast ${mon.species}<br>${speedtierzero}: Bulky ${mon.species}<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	typeoptspeed: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		let feDex = require('../../data/mods/typeopt/pokedex.js').BattlePokedex;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let speedtierplusscarf = (2.2 * mon.baseStats.spe + 108.9) * 1.5;
			let speedtierscarf = (2 * mon.baseStats.spe + 99) * 1.5;
			let speedtierplus = 2.2 * mon.baseStats.spe + 108.9;
			let speedtier = 2 * mon.baseStats.spe + 99;
			let speedtierzero = 2 * mon.baseStats.spe + 36;
			let nameo = mon;
			buf += `${speedtierplusscarf}: Scarf Fast+ ${mon.species}<br>${speedtierscarf}: Scarf Fast ${mon.species}<br>${speedtierplus}: Fast+ ${mon.species}<br>${speedtier}: Fast ${mon.species}<br>${speedtierzero}: Bulky ${mon.species}<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	mfaspeed: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		let feDex = require('../../data/mods/megasforall/pokedex.js').BattlePokedex;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let speedtierplusscarf = (2.2 * mon.baseStats.spe + 108.9) * 1.5;
			let speedtierscarf = (2 * mon.baseStats.spe + 99) * 1.5;
			let speedtierplus = 2.2 * mon.baseStats.spe + 108.9;
			let speedtier = 2 * mon.baseStats.spe + 99;
			let speedtierzero = 2 * mon.baseStats.spe + 36;
			if (mon.forme === 'Mega') {
			buf += `${speedtierplus}: Fast+ ${mon.species}<br>${speedtier}: Fast ${mon.species}<br>${speedtierzero}: Bulky ${mon.species}<br>`;
		}
		}
		);
		this.sendReplyBox(`${buf}</div>`);
	},
	fespeedscarf: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let speedtierplusscarf = (2.2 * mon.baseStats.spe + 108.9) * 1.5;
			let speedtierscarf = (2 * mon.baseStats.spe + 99) * 1.5;
			let speedtierplus = 2.2 * mon.baseStats.spe + 108.9;
			let speedtier = 2 * mon.baseStats.spe + 99;
			let speedtierzero = 2 * mon.baseStats.spe + 36;
			buf += `${speedtierplusscarf}: Scarf Fast+ ${mon.species}<br>${speedtierscarf}: Scarf Fast ${mon.species}<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},

	apdata: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Moves</h2></center>`;
		let feDex = require('../../data/moves.js').BattleMovedex;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(move => {
			if (move.category === 'Status' && move.target !=="normal" & move.boosts || move.volatileStatus) {
			buf += `${move.name}<br>`;
			}
		}
		);
		this.sendReplyBox(`${buf}</div>`);
	},
	multidata: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Moves</h2></center>`;
		let feDex = require('../data/moves.js').BattleMovedex;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(move => {
			let separated = target.split(" ");
			let movetype = (("" + separated[0]).trim());
			if (move.type === movetype && move.multihit) {
			buf += `${move.name}<br>`;
			}
		}
		);
		this.sendReplyBox(`${buf}</div>`);
	},
	evomons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Moves</h2></center>`;
		let feDex = require('../data/pokedex.js').BattlePokedex;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let separated = target.split(" ");
			if (mon.prevo && !mon.evos) {
			buf += `${mon.species}<br>`;
			}
		}
		);
		this.sendReplyBox(`${buf}</div>`);
	},
	epcheck: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Eternal Pokemon Moves</h2></center>`;
		let eternalDex = require('../../data/mods/eternal/moves.js').BattleMovedex;
		if (!eternalDex) return this.errorReply("Error Fetching Eternal Data.");
		Object.values(eternalDex).forEach(move => {
			if (!move.onPrepareHit) {
			buf += `'${move.name}': { <br>bp: ${move.basePower}, <br>type: '${move.type}', <br>category: '${move.category}',<br> zp: ${move.zMovePower}<br> },<br>`;
			}
		});
		this.sendReplyBox(`${buf}</div>`);
	},
		csmoves: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Eternal Pokemon Moves</h2></center>`;
		let eternalDex = require('../../data/mods/cleanslate/moves.js').BattleMovedex;
		if (!eternalDex) return this.errorReply("Error Fetching Eternal Data.");
		Object.values(eternalDex).forEach(move => {
			if (!move.onPrepareHit) {
			buf += `'${move.name}': { <br>bp: ${move.basePower}, <br>type: '${move.type}', <br>category: '${move.category}',<br> zp: ${move.zMovePower}<br> },<br>`;
			}
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	sylvecheck: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Eternal Pokemon Moves</h2></center>`;
		let eternalDex = require('../../data/mods/sylvemons/moves.js').BattleMovedex;
		if (!eternalDex) return this.errorReply("Error Fetching Eternal Data.");
		Object.values(eternalDex).forEach(move => {
			if (!move.onPrepareHit) {
			buf += `${move.name} | ${move.basePower} | ${move.accuracy} | ${move.type} | ${move.category} | ${move.shortDesc}<br><br>`;
			}
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	datalistool: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Moves</h2></center>`;
		let feDex = require('../data/pokedex.js').BattlePokedex;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			if (mon.forme !== 'Mega') {
			buf += `if (fuse1 === '${mon.species}') {<br>num = ${mon.num}; <br>document.getElementById("oldhp").innerHTML = "${mon.baseStats.hp}"; <br>document.getElementById("oldatk").innerHTML = "${mon.baseStats.atk}"; <br>document.getElementById("olddef").innerHTML = "${mon.baseStats.def}"; <br>document.getElementById("oldspa").innerHTML = "${mon.baseStats.spa}"; <br>document.getElementById("oldspd").innerHTML = "${mon.baseStats.spd}"; <br>document.getElementById("oldspe").innerHTML = "${mon.baseStats.spe}"; <br>wt = "${mon.weightkg}; <br>}<br>`;
			}
		}
		);
		this.sendReplyBox(`${buf}</div>`);
	},
		datalistool3: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Moves</h2></center>`;
		let feDex = require('../data/pokedex.js').BattlePokedex;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			if (mon.types[1] === undefined) {
			buf += `if (fuse1 === '${mon.species}') {<br>document.getElementById("typearea1").innerHTML = "&lt;img src=http://play.pokemonshowdown.com/sprites/types/${mon.types[0]}.png&gt;";<br>document.getElementById("oldhp").innerHTML = "${mon.baseStats.hp}"; <br>document.getElementById("oldatk").innerHTML = "${mon.baseStats.atk}"; <br>document.getElementById("olddef").innerHTML = "${mon.baseStats.def}"; <br>document.getElementById("oldspa").innerHTML = "${mon.baseStats.spa}"; <br>document.getElementById("oldspd").innerHTML = "${mon.baseStats.spd}"; <br>document.getElementById("oldspe").innerHTML = "${mon.baseStats.spe}"; <br>wt = "${mon.weightkg}; <br>}<br>if (fuse2 === '${mon.species}') {<br>document.getElementById("typearea1").innerHTML = "&lt;img src=http://play.pokemonshowdown.com/sprites/types/${mon.types[0]}.png&gt;";<br>document.getElementById("oldhp").innerHTML = "${mon.baseStats.hp}"; <br>document.getElementById("oldatk").innerHTML = "${mon.baseStats.atk}"; <br>document.getElementById("olddef").innerHTML = "${mon.baseStats.def}"; <br>document.getElementById("oldspa").innerHTML = "${mon.baseStats.spa}"; <br>document.getElementById("oldspd").innerHTML = "${mon.baseStats.spd}"; <br>document.getElementById("oldspe").innerHTML = "${mon.baseStats.spe}"; <br>wt = "${mon.weightkg}; <br>}<br>`;
			}
				else {
					buf += `if (fuse1 === '${mon.species}') {<br>document.getElementById("typearea1").innerHTML = "&lt;img src=http://play.pokemonshowdown.com/sprites/types/${mon.types[0]}.png&gt;&lt;img src=http://play.pokemonshowdown.com/sprites/types/${mon.types[1]}.png&gt;";<br>document.getElementById("oldhp").innerHTML = "${mon.baseStats.hp}"; <br>document.getElementById("oldatk").innerHTML = "${mon.baseStats.atk}"; <br>document.getElementById("olddef").innerHTML = "${mon.baseStats.def}"; <br>document.getElementById("oldspa").innerHTML = "${mon.baseStats.spa}"; <br>document.getElementById("oldspd").innerHTML = "${mon.baseStats.spd}"; <br>document.getElementById("oldspe").innerHTML = "${mon.baseStats.spe}"; <br>wt = "${mon.weightkg}; <br>}<br>if (fuse2 === '${mon.species}') {<br>document.getElementById("typearea1").innerHTML = "&lt;img src=http://play.pokemonshowdown.com/sprites/types/${mon.types[0]}.png&gt;&lt;img src=http://play.pokemonshowdown.com/sprites/types/${mon.types[1]}.png&gt;";<br>document.getElementById("oldhp").innerHTML = "${mon.baseStats.hp}"; <br>document.getElementById("oldatk").innerHTML = "${mon.baseStats.atk}"; <br>document.getElementById("olddef").innerHTML = "${mon.baseStats.def}"; <br>document.getElementById("oldspa").innerHTML = "${mon.baseStats.spa}"; <br>document.getElementById("oldspd").innerHTML = "${mon.baseStats.spd}"; <br>document.getElementById("oldspe").innerHTML = "${mon.baseStats.spe}"; <br>wt = "${mon.weightkg}; <br>}<br>`;
			}
		}
		);
		this.sendReplyBox(`${buf}</div>`);
	},
		felist2: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			buf += `&lt;option value="${mon.species}"&gt;<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	feabilities2: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Coded Fusion Evolution Abilities</h2></center>`;
		let feDex = require('../../data/mods/fe/abilities.js').BattleAbilities;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(ability => {
			buf += `"${ability.id}":{shortDesc: "${ability.shortDesc}",name: "${ability.name}",id: "${ability.id}",},<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	sylvespeed: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fusion Evolution Pokemon</h2></center>`;
		let feDex = require('../data/pokedex.js').BattlePokedex;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(mon => {
			let speedtierplusscarf = Math.floor((2.2 * mon.baseStats.spe + 108.9) * 1.5);
			let speedtierscarf = Math.floor((2 * mon.baseStats.spe + 99) * 1.5);
			let speedtierplus = Math.floor(2.2 * mon.baseStats.spe + 108.9);
			let speedtier = Math.floor(2 * mon.baseStats.spe + 99);
			let speedtierzero = Math.floor(2 * mon.baseStats.spe + 36);
			if (mon.species === "Chansey" || mon.species === "Jirachi" || mon.species === "Hawlucha" || mon.species === "Kartana" || mon.species === "Magearna" || mon.species === "Scizor-Mega" || mon.species === "Tapu Koko" || mon.species === "Greninja-Ash" || mon.species === "Landorus-Therian" || mon.species === "Tapu Lele" || mon.species === "Tornadus" || mon.species === "Greninja" || mon.species === "Heatran" || mon.species === "Keldeo" || mon.species === "Pinsir-Mega" || mon.species === "Serperior" || mon.species === "Tapu Bulu" || mon.species === "Toxapex" || mon.species === "Aerodactyl-Mega" || mon.species === "Articuno" || mon.species === "Charizard-Mega-X" || mon.species === "Emolga" || mon.species === "Ferrothorn" || mon.species === "Infernape" || mon.species === "Klinklang" || mon.species === "Mawile-Mega" || mon.species === "Medicham-Mega" || mon.species === "Zapdos" || mon.species === "AlakazamMega" || mon.species === "Celesteela" || mon.species === "Flygon" || mon.species === "Gallade-Mega" || mon.species === "Goodra" || mon.species === "Nihilego" || mon.species === "Parasect" || mon.species === "Raichu" || mon.species === "Togedemaru" || mon.species === "Celebi" || mon.species === "Latios-Mega" || mon.species === "Meloetta-Pirouette" || mon.species === "Metagross" || mon.species === "Palossand" || mon.species === "Slaking" || mon.species === "Tapu Fini" || mon.species === "Wishiwashi" || mon.species === "Xurkitree" || mon.species === "Azumarill" || mon.species === "Garchomp" || mon.species === "Latias-Mega" || mon.species === "Manaphy" || mon.species === "Mimikyu" || mon.species === "Scizor" || mon.species === "Terrakion" || mon.species === "Venusaur-Mega" || mon.species === "Latios" || mon.species === "Staraptor" || mon.species === "Victini" || mon.species === "Garchomp-Mega" || mon.species === "Meloetta" || mon.species === "Skarmory" || mon.species === "Shuckle") {
			buf += `${speedtierplus}: Fast+ ${mon.species}<br>${speedtier}: Fast ${mon.species}<br>${speedtierzero}: Bulky ${mon.species}<br>`;
			}
			if (mon.forme !== "Mega") {
				buf += `${speedtierplusscarf}: +1 Fast+ ${mon.species}<br>${speedtierscarf}: +1 Fast ${mon.species}<br>`;
			}

			});
		this.sendReplyBox(`${buf}</div>`);
	},
	abilities2: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Coded Fusion Evolution Abilities</h2></center>`;
		let feDex = require('../data/abilities.js').BattleAbilities;
		if (!feDex) return this.errorReply("Error Fetching FE Data.");
		Object.values(feDex).forEach(ability => {
			buf += `"${ability.id}":{shortDesc: "${ability.shortDesc}",name: "${ability.name}",id: "${ability.id}",},<br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},

};
