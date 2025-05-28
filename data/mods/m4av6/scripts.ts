import {toID} from '../../../sim/dex-data';

// tiering information
const ag = ["gengarmega", "rayquazamega", "zacian", "zaciancrowned", "calyrexshadow"];
const uber = [
	// M4A first
	"butterfreemega", "cinderacemega", "dragapultmega", "clefablemega", "dodriomega", "empoleonmega", "hydreigonmega", "slowkinggalarmega",
	// Natdex second
	"alakazammega", "blastoisemega", "blazikenmega", "cinderace", "darkrai", "darmanitangalar", "deoxysattack", "deoxysspeed", "deoxys", "dialga", "dracovish", "dragapult", "lucariomega", "eternatus", "giratina", "giratinaorigin", "groudon", "groudonprimal", "hooh", "kangaskhanmega", "kyogre", "kyogreprimal", "kyuremblack", "kyuremwhite", "landorus", "lucariomega", "lugia", "lunala", "magearna", "magearnaoriginal", "marshadow", "metagrossmega", "mewtwo", "mewtwomegax", "mewtwomegay", "naganadel", "necrozmadawnwings", "necrozmaduskmane", "necrozmaultra", "palkia", "pheromosa", "rayquaza", "reshiram", "salamencemega", "shayminsky", "solgaleo", "spectrier", "tornadustherian", "urshifu", "xerneas", "yveltal", "zamazenta", "zamazentacrowned", "zekrom", "zygarde", "zygardecomplete", "calyrexice", "arceus", "arceusfire", "arceuswater", "arceuselectric", "arceusgrass", "arceusice", "arceusfighting", "arceuspoison", "arceusground", "arceusflying", "arceuspsychic", "arceusbug", "arceusrock", "arceusghost", "arceusdragon", "arceusdark", "arceussteel", "arceusfairy", "genesect", "genesectburn", "genesectchill", "genesectdouse", "genesectshock",
];
const viabilityList = [
	"aegislash", "alomomola", "amoonguss", "arctozolt", "azumarill", "barraskewda", "bisharp", "blacephalon", "blaziken", "blissey", "buzzwole",
	"clefable", "corviknight", "deoxysdefense", "dragonite", "excadrill", "ferrothorn", "garchomp", "gastrodon", "gengar", "gliscor",
	"greninjaash", "greninja", "grimmsnarl", "hawlucha", "heatran", "hippowdon", "hoopaunbound", "hydreigon", "kartana", "keldeo", "kommoo",
	"kyurem", "landorustherian", "latias", "magnezone", "melmetal", "mew", "moltres", "nidoqueen", "pelipper", "regieleki", "rillaboom", "rotomwash", "scizor",
	"serperior", "skarmory", "slowbro", "slowking", "slowkinggalar", "tangrowth", "tapubulu", "tapufini", "tapukoko", "tapulele", "thundurus", "torkoal",
	"toxapex", "tyranitar", "urshifurapidstrike", "victini", "volcanion", "volcarona", "weavile", "zapdos", "zapdosgalar", "zeraora",
];
const megaViabilityList = [
	"araquanidmega", "bastiodonmega", "bibarelmega", "chandeluremega", "conkeldurrmega", "corviknightmega", "dhelmisemega", "dragalgemega",
	"eelektrossmega", "falinksmega", "flygonmega", "froslassmega", "garbodormega", "hawluchamega", "honchkrowmega", "infernapemega", "inteleonmega",
	"krookodilemega", "lanturnmega", "latiasmega", "lopunnymega", "lurantismega", "luxraymega", "lycanrocmega", "magmortarmega", "medichammega",
	"meowsticmega", "mimikyumega", "mimikyumegabusted", "nidoqueenmega", "noivernmega", "orbeetlemega", "raichumega", "regicemega", "reuniclusmega",
	"scizormega", "sirfetchdmega", "slowkingmega", "staraptormega", "starmiemega", "stoutlandmega", "swampertmega", "talonflamemega",
	"typhlosionmega", "tyranitarmega", "tyrantrummega", "vanilluxemega", "wailordmega",
];
/*
// doubles tiers (currently unused because the teambuilder doesn't support them well)
const vgcbanned = ["mew", "celebi", "jirachi", "deoxys", "deoxysattack", "deoxysdefense", "deoxysspeed", "phione", "manaphy", "darkrai", "shaymin", "shayminsky", "victini", "keldeo", "keldeoresolute", "meloetta", "greninjaash", "diancie", "dianciemega", "hoopa", "hoopaunbound", "volcanion", "magearna", "magearnaoriginal", "marshadow", "zeraora", "zarude", "arceus", "arceusfire", "arceuswater", "arceuselectric", "arceusgrass", "arceusice", "arceusfighting", "arceuspoison", "arceusground", "arceusflying", "arceuspsychic", "arceusbug", "arceusrock", "arceusghost", "arceusdragon", "arceusdark", "arceussteel", "arceusfairy", "genesect", "genesectburn", "genesectchill", "genesectdouse", "genesectshock"];
const restricted = ["mewtwo", "hooh", "lugia", "kyogre", "kyogreprimal", "groudon", "groudonprimal", "rayquaza", "rayquazamega", "dialga", "palkia", "giratina", "giratinaorigin", "reshiram", "zekrom", "kyurem", "kyuremblack", "kyuremwhite", "xerneas", "yveltal", "zygarde", "zygarde10", "zygardecomplete", "cosmog", "cosmoem", "solgaleo", "lunala", "necrozma", "necrozmadawnwings", "necrozmaduskmane", "necrozmaultra", "zacian", "zaciancrowned", "zamazenta", "zamazentacrowned", "eternatus", "calyrex", "calyrexice", "calyrexshadow"];
const s = ["incineroar", "dhelmisemega", "slowkingmega", "tapufini"];
const aplus = ["blastoise", "moltresgalar", "glastrier", "ninetalesalolamega", "mawilemega", "rillaboommega", "regieleki", "spectrier", "urshifu", "whimsicott"];
const a = ["amoonguss", "aurorusmega", "empoleonmega", "falinksmegalegion", "metagrossmega"];
const aminus = ["aegislash", "clefairy", "comfey", "dusclops", "grimmsnarl", "hatterene", "kartana", "landorustherian", "charizardmegay", "cinderacemega", "gengarmega", "gigalithmega", "kangaskhanmega", "orbeetlemega", "reuniclusmega", "murkrow"];
const bplus = ["arctovish", "arctozolt", "dracovish", "dracozolt", "excadrill", "indeedeef", "kommoo", "ludicolo", "hawluchamega", "luxraymega", "salamencemega", "politoed", "tapulele", "torkoal", "venusaur"];
const b = ["araquanid", "gothitelle", "hitmontop", "kingdra", "dragonitemega", "meowsticfmega", "pelipper", "porygon2", "rillaboom", "rotomheat", "stakataka", "urshifurapidstrike", "zapdos"];
const bminus = ["cresselia", "dragapult", "ferrothorn", "weezinggalar", "gastrodon", "araquanidmega", "corviknightmega", "flygonmega", "mudsdalemega", "samurottmega", "milotic", "raichu", "rotomwash", "tapubulu", "togekiss", "tsareena", "weezing"];
const c = ["aerodactyl", "marowakalola", "bronzong", "coalossal", "celesteela", "crobat", "articunogalar", "zapdosgalar", "gyarados", "heatran", "jellicent", "liepard", "dragalgemega", "hydreigonmega", "honchkrowmega", "leavannymega", "registeelmega", "swampertmega", "meowsticm", "ninetales", "regigigas", "sirfetchd", "slaking", "staraptor", "suicune", "terrakion", "tornadus", "weavile"];
*/

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen8',
	gen: 8,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Mega of the Day!', 'Popular', 'Popular Megas', 'Other Megas', 'Heat!', 'NFE'],
	},
	init() {
		if (this.dataCache.Pokedex.raichumega) return; // don't bother generating the dex if it's already stored!
		let megaList = [];
		for (const id in this.dataCache.Pokedex) {
			const pokemon = this.dataCache.Pokedex[id];

			// modding
			if (pokemon.movepoolAdditions) {
				for (const move of pokemon.movepoolAdditions) {
					this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
				}
			}

			// generating Megas
			if (pokemon && pokemon.mega) {
				const newMega = this.dataCache.Pokedex[pokemon.mega] = {name: pokemon.megaName};

				pokemon.otherFormes = pokemon.otherFormes ? pokemon.otherFormes.concat([newMega.name]) : [pokemon.megaName];
				pokemon.formeOrder = pokemon.formeOrder ? pokemon.formeOrder.concat([newMega.name]) : [pokemon.name, pokemon.megaName];

				newMega.num = pokemon.num;
				newMega.baseSpecies = pokemon.name;
				newMega.forme = "Mega";

				newMega.types = pokemon.megaType || pokemon.types;
				newMega.abilities = pokemon.megaAbility || pokemon.abilities;
				newMega.baseStats = pokemon.megaStats || pokemon.baseStats;
				newMega.heightm = pokemon.megaHeightm || pokemon.heightm;
				newMega.weightkg = pokemon.megaWeightkg || pokemon.weightkg;
				newMega.eggGroups = pokemon.eggGroups;
				newMega.color = pokemon.megaColor || pokemon.color;
				newMega.battleOnly = pokemon.name; // just in case

				newMega.creator = pokemon.megaCreator || null;
				newMega.requiredItem = pokemon.megaStone || null;
				if (!this.modData('FormatsData', pokemon.mega)) this.data.FormatsData[pokemon.mega] = { };

				if (uber.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Uber";
				else {
					megaList.push(pokemon.mega);
					if (megaViabilityList.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Popular Megas";
					else this.modData('FormatsData', pokemon.mega).tier = "Other Megas";
				}
			}

			// tiering
			if (!this.modData('FormatsData', id) && this.dataCache.Pokedex[id].creator) this.data.FormatsData[id] = { }; // for non-dynamic Pokémon like Sawsbuck
			if (this.modData('FormatsData', id)) {
				if (this.modData('FormatsData', id).isNonstandard === 'Past') this.modData('FormatsData', id).isNonstandard = null;
				// singles tiers
				if (ag.includes(id)) this.modData('FormatsData', id).tier = "AG";
				else if (uber.includes(id)) this.modData('FormatsData', id).tier = "Uber";
				else if (viabilityList.includes(id)) this.modData('FormatsData', id).tier = "Popular";
				else if (megaViabilityList.includes(id)) this.modData('FormatsData', id).tier = "Popular Megas";
				else if (this.dataCache.Pokedex[id] && this.dataCache.Pokedex[id].name.includes('-Mega')) this.modData('FormatsData', id).tier = "Other Megas";
				else if (!this.modData('FormatsData', id).isNonstandard && this.dataCache.Pokedex[id] && !this.dataCache.Pokedex[id].evos && !id.startsWith('pikachu') && !id.startsWith('meltan')) this.modData('FormatsData', id).tier = "Heat!"; // default (FE)
				else if (!this.modData('FormatsData', id).isNonstandard) this.modData('FormatsData', id).tier = "NFE"; // default (NFE)
				if (id === 'crucibellemega') this.modData('FormatsData', id).tier = "CAP"; // hard-coding for things that don't exist
			}
		}
		// up to three Megas of the Day
		let random1 = Math.floor(Math.random() * megaList.length);
		let random2 = Math.floor(Math.random() * (megaList.length - 1));
		let random3 = Math.floor(Math.random() * (megaList.length - 2));
		if (random2 >= random1) random2 += 1;
		if (random3 >= random1) random3 += 1;
		if (random3 >= random2) random3 += 1;
		this.modData('FormatsData', megaList[random1]).tier = "Mega of the Day!";
		this.modData('FormatsData', megaList[random2]).tier = "Mega of the Day!";
		this.modData('FormatsData', megaList[random3]).tier = "Mega of the Day!";
	// console.log('Megas of the Day: ' + megaList[random1] + ', ' + megaList[random2] + ', ' + megaList[random3]); 
	},

	actions: {
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
		  altForme?.isMega && altForme?.requiredMove &&
		  pokemon.baseMoves.includes(this.dex.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Lycanite" && pokemon.species.name === "Lycanroc-Midnight") return "Lycanroc-Midnight-Mega";
		if (item.name === "Lycanite" && pokemon.species.name === "Lycanroc-Dusk") return "Lycanroc-Dusk-Mega";
		if (item.name === "Raichunite" && pokemon.species.name === "Raichu-Alola") return null;
		if (item.name === "Slowbronite" && pokemon.species.name === "Slowbro-Galar") return null;
		if (item.name === "Slowkinite" && pokemon.species.name === "Slowking-Galar") return "Slowking-Galar-Mega";
		if (item.name === "Gourgeite" && pokemon.species.name === "Gourgeist-Small") return "Gourgeist-Small-Mega";
		if (item.name === "Gourgeite" && pokemon.species.name === "Gourgeist-Large") return "Gourgeist-Large-Mega";
		if (item.name === "Gourgeite" && pokemon.species.name === "Gourgeist-Super") return "Gourgeist-Super-Mega";
		if (item.name === "Reginite") {
				if (pokemon.species.name === "Regice") return "Regice-Mega";
				if (pokemon.species.name === "Registeel") return "Registeel-Mega";
		}
		if (item.name === "Meowsticite" && pokemon.species.name === "Meowstic-F") return "Meowstic-F-Mega";
		if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbucksummer") return "Sawsbuck-Summer-Mega";
		if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckautumn") return "Sawsbuck-Autumn-Mega";
		if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckwinter") return "Sawsbuck-Winter-Mega";
		if (item.name === "Toxtricitite" && pokemon.species.name === "Toxtricity-Low-Key") return "Toxtricity-Low-Key-Mega";
		if (item.name === "Ninetalesite") {
			if (pokemon.species.name === "Ninetales-Alola") return "Ninetales-Alola-Mega";
			else return null;
		}
		if (item.name === "Dugtrionite" && pokemon.species.name === "Dugtrio-Alola") return null;
		if (item.name === "Rapidashinite" && pokemon.species.name === "Rapidash-Galar") return null;
		if (item.name === "Wormadamite") {
			if (pokemon.species.name === "Wormadam-Sandy") return "Wormadam-Sandy-Mega";
			else return null;
		}
		if (item.name === "Hoopanite" && pokemon.species.name === "Hoopa-Unbound") return null;
		if (item.megaEvolves !== pokemon.species.name || item.megaStone === pokemon.species.name) {
			return null;
		}
		return item.megaStone;
	},
	runMegaEvo(pokemon: Pokemon) {
		const speciesid = pokemon.canMegaEvo || pokemon.canUltraBurst;
		if (!speciesid) return false;

		if (pokemon.illusion) this.battle.singleEvent('End', this.battle.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
		pokemon.formeChange(speciesid, pokemon.getItem(), true);

		// Limit one mega evolution
		const wasMega = pokemon.canMegaEvo;
		for (const ally of pokemon.side.pokemon) {
			if (wasMega) {
				ally.canMegaEvo = null;
			} else {
				ally.canUltraBurst = null;
			}
		}

		this.battle.runEvent('AfterMega', pokemon);
		return true;
	},

	},

	 getDamage(
		source: Pokemon, target: Pokemon, move: string | number | ActiveMove,
		suppressMessages = false
	): number | undefined | null | false {
		if (typeof move === 'string') move = this.dex.getActiveMove(move);

		if (typeof move === 'number') {
			const basePower = move;
			move = new Dex.Move({
				basePower,
				type: '???',
				category: 'Physical',
				willCrit: false,
			}) as ActiveMove;
			move.hit = 0;
		}

		if (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) {
			if (!target.runImmunity(move.type, !suppressMessages)) {
				return false;
			}
		}

		if (move.ohko) return target.maxhp;
		if (move.damageCallback) return move.damageCallback.call(this.battle, source, target);
		if (move.damage === 'level') {
			return source.level;
		} else if (move.damage) {
			return move.damage;
		}

		const category = this.battle.getCategory(move);

		let basePower: number | false | null = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this.battle, source, target, move);
		}
		if (!basePower) return basePower === 0 ? undefined : basePower;
		basePower = this.battle.clampIntRange(basePower, 1);

		let critMult;
		let critRatio = this.battle.runEvent('ModifyCritRatio', source, target, move, move.critRatio || 0);
		if (this.battle.gen <= 5) {
			critRatio = this.battle.clampIntRange(critRatio, 0, 5);
			critMult = [0, 16, 8, 4, 3, 2];
		} else {
			critRatio = this.battle.clampIntRange(critRatio, 0, 4);
			if (this.battle.gen === 6) {
				critMult = [0, 16, 8, 2, 1];
			} else {
				critMult = [0, 24, 8, 2, 1];
			}
		}

		const moveHit = target.getMoveHitData(move);
		moveHit.crit = move.willCrit || false;
		if (move.willCrit === undefined) {
			if (critRatio) {
				moveHit.crit = this.battle.randomChance(1, critMult[critRatio]);
			}
		}

		if (moveHit.crit) {
			moveHit.crit = this.battle.runEvent('CriticalHit', target, null, move);
		}

		// happens after crit calculation
		basePower = this.battle.runEvent('BasePower', source, target, move, basePower, true);

		if (!basePower) return 0;
		basePower = this.battle.clampIntRange(basePower, 1);
		// Hacked Max Moves have 0 base power, even if you Dynamax
		if ((!source.volatiles['dynamax'] && move.isMax) || (move.isMax && this.dex.moves.get(move.baseMove).isMax)) {
			basePower = 0;
		}

		if (
			basePower < 60 && source.getTypes(true).includes(move.type) && source.terastallized && move.priority <= 0 &&
			// Hard move.basePower check for moves like Dragon Energy that have variable BP
			!move.multihit && !((move.basePower === 0 || move.basePower === 150) && move.basePowerCallback)
		) {
			basePower = 60;
		}

		const level = source.level;

		const attacker = move.overrideOffensivePokemon === 'target' ? target : source;
		const defender = move.overrideDefensivePokemon === 'source' ? source : target;

		const isPhysical = move.category === 'Physical';
		let attackStat: StatIDExceptHP = move.overrideOffensiveStat || (isPhysical ? 'atk' : 'spa');
		if (move.useTargetOffensive || (move as any).settleBoosted) attackStat = 'atk'; // hard-coding for M4A
		const defenseStat: StatIDExceptHP = move.overrideDefensiveStat || (isPhysical ? 'def' : 'spd');

		const statTable = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};

		let atkBoosts = attacker.boosts[attackStat];
		if ((move as any).bodyofwaterBoosted) { // hard-coding for M4A
			if (attackStat === 'def') {
				atkBoosts = attacker.boosts['atk'];
			} else if (attackStat === 'spd') {
				atkBoosts = attacker.boosts['spa'];
			}
		}
		let defBoosts = defender.boosts[defenseStat];

		let ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
		let ignorePositiveDefensive = !!move.ignorePositiveDefensive;

		if (moveHit.crit) {
			ignoreNegativeOffensive = true;
			ignorePositiveDefensive = true;
		}
		const ignoreOffensive = !!(move.ignoreOffensive || (ignoreNegativeOffensive && atkBoosts < 0));
		const ignoreDefensive = !!(move.ignoreDefensive || (ignorePositiveDefensive && defBoosts > 0));

		if (ignoreOffensive) {
			this.battle.debug('Negating (sp)atk boost/penalty.');
			atkBoosts = 0;
		}
		if (ignoreDefensive) {
			this.battle.debug('Negating (sp)def boost/penalty.');
			defBoosts = 0;
		}

		let attack = attacker.calculateStat(attackStat, atkBoosts, 1, source);
		let defense = defender.calculateStat(defenseStat, defBoosts, 1, target);

		attackStat = (category === 'Physical' ? 'atk' : 'spa');

		// Apply Stat Modifiers
		attack = this.battle.runEvent('Modify' + statTable[attackStat], source, target, move, attack);
		defense = this.battle.runEvent('Modify' + statTable[defenseStat], target, source, move, defense);

		if (this.battle.gen <= 4 && ['explosion', 'selfdestruct'].includes(move.id) && defenseStat === 'def') {
			defense = this.battle.clampIntRange(Math.floor(defense / 2), 1);
		}

		const tr = this.battle.trunc;

		// int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
		const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);

		// Calculate damage modifiers separately (order differs between generations)
		return this.modifyDamage(baseDamage, source, target, move, suppressMessages);
	},

	boost(
		boost: SparseBoostsTable, target: Pokemon | null = null, source: Pokemon | null = null,
		effect: Effect | null = null, isSecondary = false, isSelf = false
	) {
		if (this.event) {
			if (!target) target = this.event.target;
			if (!source) source = this.event.source;
			if (!effect) effect = this.effect;
		}
		if (!target?.hp) return 0;
		if (!target.isActive) return false;
		if (this.gen > 5 && !target.side.foePokemonLeft()) return false;
		boost = this.runEvent('ChangeBoost', target, source, effect, {...boost});
		boost = target.getCappedBoost(boost);
		boost = this.runEvent('TryBoost', target, source, effect, {...boost});
		let success = null;
		let boosted = isSecondary;
		let boostName: BoostID;
		for (boostName in boost) {
			const currentBoost: SparseBoostsTable = {
				[boostName]: boost[boostName],
			};
			let boostBy = target.boostBy(currentBoost);
			let msg = '-boost';
			if (boost[boostName]! < 0 || target.boosts[boostName] === -6) {
				msg = '-unboost';
				boostBy = -boostBy;
			}
			if (target.volatiles['hyperspacemayhem'] && target.volatiles['hyperspacemayhem'].midtransform && !target.volatiles['hyperspacemayhem'].geomancy) {
				this.runEvent('AfterEachBoost', target, source, effect, currentBoost);
				if (target.volatiles['hyperspacemayhem'].fakelegend) {
					// this will be for writing fake boost messages
					let boostMessage = target.name;
					if (effect.effectType === 'Ability' && !boosted) {
						this.add('-ability', target, effect.name, 'boost');
						boosted = true;
					}
					if (boostName === 'atk') boostMessage += `'s Attack`;
					if (boostName === 'def') boostMessage += `'s Defense`;
					if (boostName === 'spa') boostMessage += `'s Sp. Atk`;
					if (boostName === 'spd') boostMessage += `'s Sp. Def`;
					if (boostName === 'spe') boostMessage += `'s Speed`;
					if (boostName === 'evasion') boostMessage += `'s evasion`;
					if (boostName === 'accuracy') boostMessage += `'s accuracy`;
					if (boostBy === 3 && msg !== '-unboost') boostMessage += ` rose drastically!`;
					if (boostBy === 2 && msg !== '-unboost') boostMessage += ` rose sharply!`;
					if (boostBy === 1 && msg !== '-unboost') boostMessage += ` rose!`;
					if (boostBy === 1 && msg === '-unboost') boostMessage += ` fell!`;
					if (boostBy === 2 && msg === '-unboost') boostMessage += ` fell harshly!`;
					if (boostBy === 3 && msg === '-unboost') boostMessage += ` fell severely!`;
					this.add('-message', `${boostMessage}`);
				}
				continue;
			}
			if (target.volatiles['hyperspacemayhem'] && target.volatiles['hyperspacemayhem'].geomancy) {
				target.name = target.volatiles['hyperspacemayhem'].userBackup.name;
				target.fullname = target.volatiles['hyperspacemayhem'].userBackup.fullname;
			}
			if (boostBy) {
				success = true;
				switch (effect?.id) {
				case 'bellydrum': case 'angerpoint':
					this.add('-setboost', target, 'atk', target.boosts['atk'], '[from] ' + effect.fullname);
					break;
				case 'bellydrum2':
					this.add(msg, target, boostName, boostBy, '[silent]');
					this.hint("In Gen 2, Belly Drum boosts by 2 when it fails.");
					break;
				case 'zpower':
					this.add(msg, target, boostName, boostBy, '[zeffect]');
					break;
				default:
					if (!effect) break;
					if (effect.effectType === 'Move') {
						this.add(msg, target, boostName, boostBy);
					} else if (effect.effectType === 'Item') {
						this.add(msg, target, boostName, boostBy, '[from] item: ' + effect.name);
					} else {
						if (effect.effectType === 'Ability' && !boosted) {
							this.add('-ability', target, effect.name, 'boost');
							boosted = true;
						}
						this.add(msg, target, boostName, boostBy);
					}
					break;
				}
				this.runEvent('AfterEachBoost', target, source, effect, currentBoost);
			} else if (effect?.effectType === 'Ability') {
				if (isSecondary || isSelf) this.add(msg, target, boostName, boostBy);
			} else if (!isSecondary && !isSelf) {
				this.add(msg, target, boostName, boostBy);
			}
		}
		this.runEvent('AfterBoost', target, source, effect, boost);
		if (success) {
			if (Object.values(boost).some(x => x > 0)) target.statsRaisedThisTurn = true;
			if (Object.values(boost).some(x => x < 0)) target.statsLoweredThisTurn = true;
		}
		return success;
	},

pokemon: {
	lostItemForDelibird: null,
	setItem(item: string | Item, source?: Pokemon, effect?: Effect) {
		if (!this.hp) return false;
		if (this.itemState.knockedOff) return false;
		if (typeof item === 'string') item = this.battle.dex.items.get(item);

		const effectid = this.battle.effect ? this.battle.effect.id : '';
		const RESTORATIVE_BERRIES = new Set([
			'leppaberry', 'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry',
		] as ID[]); // manually pasted in const RESTORATIVE_BERRIES because its absence caused a bug
		if (RESTORATIVE_BERRIES.has('leppaberry' as ID)) {
			const inflicted = ['trick', 'switcheroo'].includes(effectid);
			const external = inflicted && source && !source.isAlly(this);
			this.pendingStaleness = external ? 'external' : 'internal';
		} else {
			this.pendingStaleness = undefined;
		}
		const oldItem = this.getItem();
		const oldItemState = this.itemState;
		this.item = item.id;
		this.itemState = {id: item.id, target: this};
		if (oldItem.exists) this.battle.singleEvent('End', oldItem, oldItemState, this);
		if (item.id) {
			this.battle.singleEvent('Start', item, this.itemState, this, source, effect);
		}
		return true;
	},
	setAbility(ability: string | Ability, source?: Pokemon | null, isFromFormeChange = false, isTransform = false) {
		if (!this.hp) return false;
		if (typeof ability === 'string') ability = this.battle.dex.abilities.get(ability);
		const oldAbility = this.ability;
		if (!isFromFormeChange) {
			if (ability.isPermanent || this.getAbility().isPermanent) return false;
		}
		if (!isTransform) {
			const setAbilityEvent: boolean | null = this.battle.runEvent('SetAbility', this, source, this.battle.effect, ability);
			if (!setAbilityEvent) return setAbilityEvent;
		}
		this.battle.singleEvent('End', this.battle.dex.abilities.get(oldAbility), this.abilityState, this, source);
		if (this.battle.effect && this.battle.effect.effectType === 'Move' && !isFromFormeChange) {
			this.battle.add('-endability', this, this.battle.dex.abilities.get(oldAbility), '[from] move: ' +
				this.battle.dex.moves.get(this.battle.effect.id));
		}
		this.ability = ability.id;
		this.abilityState = {id: ability.id, target: this};
		if (ability.id && this.battle.gen > 3 &&
			(!isTransform || oldAbility !== ability.id || this.battle.gen <= 4)) {
			this.battle.singleEvent('PreStart', ability, this.abilityState, this, source); // only change
			this.battle.singleEvent('Start', ability, this.abilityState, this, source);
		}
		this.abilityOrder = this.battle.abilityOrder++;
		return oldAbility;
	},
	runEffectiveness(move: ActiveMove) {
		let totalTypeMod = 0;
		for (const type of this.getTypes()) {
			if (type === 'Fairy' && (move as any).prehistoricrageBoosted) {
				totalTypeMod += 1;
			} else {
				let typeMod = this.battle.dex.getEffectiveness(move, type);
				typeMod = this.battle.singleEvent('Effectiveness', move, null, this, type, move, typeMod);
				totalTypeMod += this.battle.runEvent('Effectiveness', this, type, move, typeMod);
			}
		}
		return totalTypeMod;
	},
	isGrounded(negateImmunity = false) {
		if ('gravity' in this.battle.field.pseudoWeather) return true;
		if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
		if ('smackdown' in this.volatiles) return true;
		const item = (this.ignoringItem() ? '' : this.item);
		if (item === 'ironball') return true;
		// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
		if (!negateImmunity && this.hasType('Flying') && !(this.hasType('???') && 'roost' in this.volatiles)) return false;
		if (this.hasAbility('levitate') && !this.battle.suppressingAbility(this)) return null;
		if ('magnetrise' in this.volatiles) return false;
		if ('telekinesis' in this.volatiles) return false;
		if ('poolfloaties' in this.volatiles) return false;
		for (const target of this.battle.getAllActive()) {
			if (target.hasAbility('uplifting')) {
				return null;
			}
		}
		return item !== 'airballoon';
	},
	getMoveTargets(move: ActiveMove, target: Pokemon): {targets: Pokemon[], pressureTargets: Pokemon[]} {
		let targets: Pokemon[] = [];

		switch (move.target) {
		case 'all':
		case 'foeSide':
		case 'allySide':
		case 'allyTeam':
			if (!move.target.startsWith('foe')) {
				targets.push(...this.alliesAndSelf());
			}
			if (!move.target.startsWith('ally')) {
				targets.push(...this.foes(true));
			}
			if (targets.length && !targets.includes(target)) {
				this.battle.retargetLastMove(targets[targets.length - 1]);
			}
			break;
		case 'allAdjacent':
			targets.push(...this.adjacentAllies());
			// falls through
		case 'allAdjacentFoes':
			targets.push(...this.adjacentFoes());
			if (targets.length && !targets.includes(target)) {
				this.battle.retargetLastMove(targets[targets.length - 1]);
			}
			break;
		case 'allies':
			targets = this.alliesAndSelf();
			break;
		default:
			const selectedTarget = target;
			if (!target || (target.fainted && !target.isAlly(this)) && this.battle.gameType !== 'freeforall') {
				// If a targeted foe faints, the move is retargeted
				const possibleTarget = this.battle.getRandomTarget(this, move);
				if (!possibleTarget) return {targets: [], pressureTargets: []};
				target = possibleTarget;
			}
			if (this.battle.activePerHalf > 1 && !move.tracksTarget) {
				const isCharging = move.flags['charge'] && !this.volatiles['twoturnmove'] &&
					!((move.id.startsWith('solarb') || this.hasAbility('solarcore')) && this.battle.field.isWeather(['sunnyday', 'desolateland'])) &&
					!(this.hasItem('powerherb') && move.id !== 'skydrop');
				if (!isCharging) {
					target = this.battle.priorityEvent('RedirectTarget', this, this, move, target);
				}
			}
			if (move.smartTarget) {
				targets = this.getSmartTargets(target, move);
				target = targets[0];
			} else {
				targets.push(target);
			}
			if (target.fainted && !move.flags['futuremove']) {
				return {targets: [], pressureTargets: []};
			}
			if (selectedTarget !== target) {
				this.battle.retargetLastMove(target);
			}
		}

		// Resolve apparent targets for Pressure.
		let pressureTargets = targets;
		if (move.target === 'foeSide') {
			pressureTargets = [];
		}
		if (move.flags['mustpressure']) {
			pressureTargets = this.foes();
		}

		return {targets, pressureTargets};
	},
	cureStatus(pokemon: Pokemon, silent = false) {
		if (!this.hp || !this.status) return false;
		this.battle.add('-curestatus', this, this.status, silent ? '[silent]' : '[msg]');
		if (this.status === 'slp' && this.removeVolatile('nightmare')) {
			this.battle.add('-end', this, 'Nightmare', '[silent]');
		}
		this.setStatus('');
		if (this.volatiles['staccato']) {
			this.volatiles['staccato'].busted = true;
			this.removeVolatile('staccato');
		}
		return true;
	},
	ignoringItem() { // modded for Hyperspace Mayhem: even if the holder has an item, the summoned Pokémon doesn't!
		return !!(
			this.itemState.knockedOff || // Gen 3-4
			(this.battle.gen >= 5 && !this.isActive) ||
			(!this.getItem().ignoreKlutz && this.hasAbility('klutz')) ||
			this.volatiles['embargo'] || this.volatiles['hyperspacemayhem'] || this.battle.field.pseudoWeather['magicroom']
		);
	},
	formeChange( // modified for Hyperspace Mayhem
		speciesId: string | Species, source: Effect = this.battle.effect,
		isPermanent?: boolean, message?: string
	) {
		const rawSpecies = this.battle.dex.species.get(speciesId);

		const species = this.setSpecies(rawSpecies, source);
		if (!species) return false;

		if (this.battle.gen <= 2) return true;

		// The species the opponent sees
		const apparentSpecies =
			this.illusion ? this.illusion.species.name : species.baseSpecies;
		if (isPermanent || source.id === 'hyperspacehole') {
			if (isPermanent) this.baseSpecies = rawSpecies;
			this.details = species.name + (this.level === 100 ? '' : ', L' + this.level) +
				(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
			let details = (this.illusion || this).details;
			if (this.terastallized) details += `, tera:${this.terastallized}`;
			this.battle.add('detailschange', this, details);
			if (source.effectType === 'Item') {
				this.canTerastallize = null; // National Dex behavior
				if (source.zMove) {
					this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
					this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
				} else if (source.onPrimal) {
					if (this.illusion) {
						this.ability = '';
						this.battle.add('-primal', this.illusion, species.requiredItem);
					} else {
						this.battle.add('-primal', this, species.requiredItem);
					}
				} else {
					// So a Mega Evolution message isn't sent while we're waiting on Ogerpon text
					if (source.megaEvolves) {
						this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
					}
					this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
				}
			} else if (source.effectType === 'Status') {
				// Shaymin-Sky -> Shaymin
				this.battle.add('-formechange', this, species.name, message);
			}
		} else {
			if (source.effectType === 'Ability') {
				this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
			} else if (source.id === 'hyperspacehole') {
				this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, '[silent]');
			} else {
				this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, message);
			}
		}
		if (isPermanent && !['disguise', 'iceface'].includes(source.id)) {
			if (this.illusion) {
				this.ability = ''; // Don't allow Illusion to wear off
			}
			this.setAbility(species.abilities['0'], null, true);
			this.baseAbility = this.ability;
		}
		if (source.id === 'hyperspacehole') {
			if (this.volatiles['hyperspacemayhem']) {
				this.setAbility(species.abilities['0'], null, true);
			} else {
				this.setAbility('hyperspacemayhem', null, true);
			}
			if (this.species.forme.startsWith('Mega') || this.species.forme.startsWith('Ultra')) this.battle.add('-start', this, 'typechange', this.getTypes(true).join('/'), '[silent]');
		}
		if (this.terastallized) {
			this.knownType = true;
			this.apparentType = this.terastallized;
		}
		return true;
	}
},

field: { // modified for Arena Rock and Down-to-Earth
	setTerrain(status: string | Effect, source: Pokemon | 'debug' | null = null, sourceEffect: Effect | null = null) {
		status = this.battle.dex.conditions.get(status);
		if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
		if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
		if (source === 'debug') source = this.battle.sides[0].active[0];
		if (!source) throw new Error(`setting terrain without a source`);

		if (this.terrain === status.id) return false;
		if (source) { // modded: this whole section added for Arena Rock
			const result = this.battle.runEvent('SetTerrain', source, source, status);
			if (this.terrain === 'grassyterrain' && this.battle.getAllActive().some(x => x.hasAbility('arenarock') && !x.m.forceCustomBlock)) {
				if ((sourceEffect as Move)?.terrain) {
					this.battle.add('-fail', source, sourceEffect, '[from] ' + this.terrain);
				} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
					this.battle.add('-ability', source, sourceEffect, '[from] ' + this.terrain, '[fail]');
				}
				this.battle.add('-message', `Nothing can break through this unrelenting plant growth!`);
				return null;
			}
		} // end of modded section
		const prevTerrain = this.terrain;
		const prevTerrainState = this.terrainState;
		this.terrain = status.id;
		this.terrainState = {
			id: status.id,
			source,
			sourceSlot: source.getSlot(),
			duration: status.duration,
		};
		if (status.durationCallback) {
			this.terrainState.duration = status.durationCallback.call(this.battle, source, source, sourceEffect);
		}
		if (!this.battle.singleEvent('FieldStart', status, this.terrainState, this, source, sourceEffect)) {
			this.terrain = prevTerrain;
			this.terrainState = prevTerrainState;
			return false;
		}
		if (this.battle.getAllActive().some(x => x.hasAbility('downtoearth') && !x.m.forceCustomBlock)) return true; // modded: skip the TerrainChange
		this.battle.eachEvent('TerrainChange', sourceEffect);
		return true;
	},

	clearTerrain() {
		if (!this.terrain) return false;
		if (this.isTerrain('grassyterrain') && this.battle.getAllActive().some(x => x.hasAbility('arenarock') && !x.m.forceCustomBlock)) return false; // modded for Arena Rock
		const prevTerrain = this.getTerrain();
		this.battle.singleEvent('FieldEnd', prevTerrain, this.terrainState, this);
		this.terrain = '';
		this.terrainState = {id: ''};
		this.battle.eachEvent('TerrainChange');
		return true;
	},

	isTerrain(terrain: string | string[], target?: Pokemon | Side | Battle) {
		if (this.battle.getAllActive().some(x => x.hasAbility('downtoearth') && !x.m.forceCustomBlock)) return false; // modded
		const ourTerrain = this.effectiveTerrain(target);
		if (!Array.isArray(terrain)) {
			return ourTerrain === toID(terrain);
		}
		return terrain.map(toID).includes(ourTerrain);
	},
},

};
