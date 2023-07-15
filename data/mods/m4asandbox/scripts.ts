// TOP PART INHERITED FROM M4A

// tiering information
const ag = ["gengarmega", "rayquazamega", "zacian", "zaciancrowned", "calyrexshadow"];
const uber = ["butterfreemega", "cinderacemega", "rillaboommega", "dragapultmega", "alakazammega", "blastoisemega", "blazikenmega", "cinderace", "darkrai", "darmanitangalar", "deoxysattack", "deoxys", "dialga", "dracovish", "dragapult", "lucariomega", "eternatus", "giratina", "giratinaorigin", "groudon", "groudonprimal", "hooh", "kangaskhanmega", "kyogre", "kyogreprimal", "kyurem", "kyuremblack", "kyuremwhite", "landorus", "lucariomega", "lugia", "lunala", "magearna", "magearnaoriginal", "marshadow", "metagrossmega", "mewtwo", "mewtwomegax", "mewtwomegay", "naganadel", "necrozmadawnwings", "necrozmaduskmane", "necrozmaultra", "palkia", "pheromosa", "rayquaza", "reshiram", "salamencemega", "shayminsky", "solgaleo", "spectrier", "urshifu", "xerneas", "yveltal", "zamazenta", "zamazentacrowned", "zekrom", "zygarde", "zygardecomplete", "calyrexice", "arceus", "arceusfire", "arceuswater", "arceuselectric", "arceusgrass", "arceusice", "arceusfighting", "arceuspoison", "arceusground", "arceusflying", "arceuspsychic", "arceusbug", "arceusrock", "arceusghost", "arceusdragon", "arceusdark", "arceussteel", "arceusfairy", "genesect", "genesectburn", "genesectchill", "genesectdouse", "genesectshock"];
const newest = ["grapploctmega", "lickilickymega", "tsareenamega", "snorlaxmega", "swalotmega", "wailordmega"];
const aprilfools = ["floetteeternalmega", "meltanmega", "pichuspikyearedmega", "porygodzmega"];
const hisui = ["arcaninehisui", "avalugghisui", "basculegion", "basculegionf", "braviaryhisui", "decidueyehisui", "dialgaorigin", "electrodehisui", "enamorus", "enamorustherian", "goodrahisui", "kleavor", "lilliganthisui", "overqwil", "palkiaorigin", "samurotthisui", "sneasler", "typhlosionhisui", "ursaluna", "wyrdeer", "zoroarkhisui"]; // only fully-evolved Pokémon from Legends: Arceus
const tourbanned = ["bisharpmega", "clefablemega", "dodriomega", "empoleonmega", "goodramega", "gourgeistmega", "hydreigonmega", "meowsticfmega", "slowkinggalarmega", "starmiemega", "tapulele", "tornadustherian", "toxtricitylowkeymega", "trevenantmega", "walreinmega"];
const tier1mega = ["corviknightmega", "dhelmisemega", "mudsdalemega"];
const tier1 = ["blissey", "clefable", "corviknight", "ferrothorn", "gliscor", "heatran", "landorustherian", "rillaboom", "slowbro", "tapufini", "toxapex"];
const tier2mega = ["dragalgemega", "latiasmega", "lopunnymega", "mawilemega", "medichammega", "raichumega", "reuniclusmega", "scizormega", "talonflamemega", "vikavoltmega"];
const tier2 = ["garchomp", "greninjaash", "hippowdon", "kartana", "nidoqueen", "slowkinggalar", "tangrowth", "tapukoko", "volcarona", "weavile", "zapdos"];
const tier3mega = ["bastiodonmega", "charizardmegax", "drapionmega", "exploudmega", "falinksmegalegion", "garchompmega", "garbodormega", "lycanrocmega", "nidoqueenmega", "noivernmega", "parasectmega", "sableyemega", "spiritombmega", "swampertmega", "wishiwashimega"];
const tier3 = ["aegislash", "amoonguss", "buzzwole", "blacephalon", "chansey", "deoxysspeed", "greninja", "hydreigon", "keldeo", "kommoo", "magnezone", "melmetal", "terrakion", "thundurus"];
const tier4mega = ["aurorusmega", "bibarelmega", "delphoxmega", "inteleonmega", "luxraymega", "typhlosionmega", "zoroarkmega"];
const tier4 = ["arctozolt", "barraskewda", "bisharp", "dragonite", "gengar", "gastrodon", "grimmsnarl", "hatterene", "hawlucha", "jirachi", "latias", "latios", "moltres", "ninetalesalola", "pelipper", "reuniclus", "rotomheat", "rotomwash", "scizor", "serperior", "shuckle", "skarmory", "slowking", "tapubulu", "tyranitar", "urshifurapidstrike", "zapdosgalar", "victini", "volcanion"];
const nichemega = ["delibirdmega", "feraligatrmega", "lycanrocmidnightmega", "nidokingmega"];
const niche = ["alakazam", "alomomola", "araquanid", "azumarill", "blaziken", "celesteela", "conkeldurr", "crawdaunt", "deoxysdefense", "diancie", "ditto", "dracozolt", "dragalge", "empoleon", "excadrill", "gyarados", "hoopaunbound", "infernape", "mamoswine", "manaphy", "mantine", "mew", "mukalola", "porygonz", "regieleki", "salamence", "swampert", "thundurustherian", "zeraora"];
const heat = ["yanmega"]; // it has Mega in its name, so it needs this, haha
const canonmega = ["venusaurmega", "charizardmegax", "charizardmegay", "blastoisemega", "beedrillmega", "pidgeotmega", "alakazammega", "slowbromega", "gengarmega", "kangaskhanmega", "pinsirmega", "gyaradosmega", "aerodactylmega", "mewtwomegax", "mewtwomegay", "ampharosmega", "steelixmega", "scizormega", "heracrossmega", "houndoommega", "tyranitarmega", "sceptilemega", "blazikenmega", "swampertmega", "gardevoirmega", "sableyemega", "mawilemega", "aggronmega", "medichammega", "manectricmega", "sharpedomega", "cameruptmega", "altariamega", "banettemega", "absolmega", "glaliemega", "salamencemega", "metagrossmega", "latiasmega", "latiosmega", "rayquazamega", "lopunnymega", "garchompmega", "lucariomega", "abomasnowmega", "gallademega", "audinomega", "dianciemega"];
const notier = ["wishiwashimega1", "wishiwashimega2", "wishiwashimega3", "wishiwashimega4", "wishiwashimegaschool", "falinksmegacombat"]; // should not appear in the teambuilder
const illegal = ["floetteeternal", "pichuspikyeared"];
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
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['April Fools', 'Hisui', 'Tourbanned', 'Newest', 'Tier 1 Mega', 'Tier 1', 'Tier 2 Mega', 'Tier 2', 'Tier 3 Mega', 'Tier 3', 'Tier 4 Mega', 'Tier 4', 'Uncommon Mega', 'Uncommon', 'Undecided', 'Underrated'],
	},
	// SANDBOX CHANGE: removed init, canMegaEvo(pokemon) and runMegaEvo(pokemon) relative to m4av6
	getDamage(
		pokemon: Pokemon, target: Pokemon, move: string | number | ActiveMove,
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
		if (move.damageCallback) return move.damageCallback.call(this, pokemon, target);
		if (move.damage === 'level') {
			return pokemon.level;
		} else if (move.damage) {
			return move.damage;
		}

		const category = this.getCategory(move);
		const defensiveCategory = move.defensiveCategory || category;

		let basePower: number | false | null = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this, pokemon, target, move);
		}
		if (!basePower) return basePower === 0 ? undefined : basePower;
		basePower = this.clampIntRange(basePower, 1);

		let critMult;
		let critRatio = this.runEvent('ModifyCritRatio', pokemon, target, move, move.critRatio || 0);
		if (this.gen <= 5) {
			critRatio = this.clampIntRange(critRatio, 0, 5);
			critMult = [0, 16, 8, 4, 3, 2];
		} else {
			critRatio = this.clampIntRange(critRatio, 0, 4);
			if (this.gen === 6) {
				critMult = [0, 16, 8, 2, 1];
			} else {
				critMult = [0, 24, 8, 2, 1];
			}
		}

		const moveHit = target.getMoveHitData(move);
		moveHit.crit = move.willCrit || false;
		if (move.willCrit === undefined) {
			if (critRatio) {
				moveHit.crit = this.randomChance(1, critMult[critRatio]);
			}
		}

		if (moveHit.crit) {
			moveHit.crit = this.runEvent('CriticalHit', target, null, move);
		}

		// happens after crit calculation
		basePower = this.runEvent('BasePower', pokemon, target, move, basePower, true);

		if (!basePower) return 0;
		basePower = this.clampIntRange(basePower, 1);

		const level = pokemon.level;

		const attacker = pokemon;
		const defender = target;
		let attackStat: StatNameExceptHP = category === 'Physical' ? 'atk' : 'spa';
		const defenseStat: StatNameExceptHP = defensiveCategory === 'Physical' ? 'def' : 'spd';
		if (move.useSourceDefensiveAsOffensive) {
			attackStat = defenseStat;
			// Body press really wants to use the def stat,
			// so it switches stats to compensate for Wonder Room.
			// Of course, the game thus miscalculates the boosts...
			if ('wonderroom' in this.field.pseudoWeather) {
				if (attackStat === 'def') {
					attackStat = 'spd';
				} else if (attackStat === 'spd') {
					attackStat = 'def';
				}
				if (attacker.boosts['def'] || attacker.boosts['spd']) {
					this.hint("Body Press uses Sp. Def boosts when Wonder Room is active.");
				}
			}
		}
		if (move.useSourceSpeedAsOffensive) { // currently only used by sandbox Abilities, but useful in general
			attackStat = 'spe';
		}
		if (move.useTargetOffensive || (move as any).settleBoosted) {
			attackStat = 'atk'; // hard-coding for Sleight of Hand: do not use Special Attack
		}

		const statTable = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
		let attack;
		let defense;

		let atkBoosts = move.useTargetOffensive ? defender.boosts[attackStat] : attacker.boosts[attackStat];
		if ((move as any).bodyofwaterBoosted) {
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
			this.debug('Negating (sp)atk boost/penalty.');
			atkBoosts = 0;
		}
		if (ignoreDefensive) {
			this.debug('Negating (sp)def boost/penalty.');
			defBoosts = 0;
		}

		if (move.useTargetOffensive) {
			attack = defender.calculateStat(attackStat, atkBoosts);
		} else {
			attack = attacker.calculateStat(attackStat, atkBoosts);
		}

		attackStat = (category === 'Physical' ? 'atk' : 'spa');
		defense = defender.calculateStat(defenseStat, defBoosts);

		// Apply Stat Modifiers
		attack = this.runEvent('Modify' + statTable[attackStat], attacker, defender, move, attack);
		defense = this.runEvent('Modify' + statTable[defenseStat], defender, attacker, move, defense);

		if (this.gen <= 4 && ['explosion', 'selfdestruct'].includes(move.id) && defenseStat === 'def') {
			defense = this.clampIntRange(Math.floor(defense / 2), 1);
		}

		const tr = this.trunc;

		// int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
		const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);

		// Calculate damage modifiers separately (order differs between generations)
		return this.modifyDamage(baseDamage, pokemon, target, move, suppressMessages);
	},

	pokemon: {
		lostItemForDelibird: null,
		setItem(item: string | Item, source?: Pokemon, effect?: Effect) {
			if (!this.hp) return false;
			if (typeof item === 'string') item = this.battle.dex.items.get(item);

			const effectid = this.battle.effect ? this.battle.effect.id : '';
			const RESTORATIVE_BERRIES = new Set([
				'leppaberry', 'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry',
			] as ID[]);
			if (RESTORATIVE_BERRIES.has('leppaberry' as ID)) {
				const inflicted = ['trick', 'switcheroo'].includes(effectid);
				const external = inflicted && source && source.side.id !== this.side.id;
				this.pendingStaleness = external ? 'external' : 'internal';
			} else {
				this.pendingStaleness = undefined;
			}
			this.item = item.id;
			this.itemData = {id: item.id, target: this};
			if (item.id) {
				this.battle.singleEvent('Start', item, this.itemData, this, source, effect);
			}
			return true;
		},
		setAbility(ability: string | Ability, source?: Pokemon | null, isFromFormeChange?: boolean) { // edited so Megas can have Neutralizing Gas and similar
			if (!this.hp) return false;
			if (typeof ability === 'string') ability = this.battle.dex.abilities.get(ability);
			const oldAbility = this.ability;
			if (!isFromFormeChange) {
				if (ability.isPermanent || this.getAbility().isPermanent) return false;
			}
			if (!this.battle.runEvent('SetAbility', this, source, this.battle.effect, ability)) return false;
			this.battle.singleEvent('End', this.battle.dex.abilities.get(oldAbility), this.abilityData, this, source);
			if (this.battle.effect && this.battle.effect.effectType === 'Move') {
				this.battle.add('-endability', this, this.battle.dex.abilities.get(oldAbility), '[from] move: ' +
									 this.battle.dex.moves.get(this.battle.effect.id));
			}
			this.ability = ability.id;
			this.abilityData = {id: ability.id, target: this};
			if (ability.id && this.battle.gen > 3) {
				this.battle.singleEvent('PreStart', ability, this.abilityData, this, source); // only change
				this.battle.singleEvent('Start', ability, this.abilityData, this, source);
			}
			this.abilityOrder = this.battle.abilityOrder++;
			return oldAbility;
		},
		runEffectiveness(move: ActiveMove) {
			let totalTypeMod = 0;
			for (const type of this.getTypes()) {
				if (type === 'Fairy' && (move as any).prehistoricrageBoosted || type === 'Normal' && (move as any).spiralpowerBoosted) { // MODIFIED FOR SANDBOX
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
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
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
			let pressureTargets;

			switch (move.target) {
				case 'all':
				case 'foeSide':
				case 'allySide':
				case 'allyTeam':
					if (!move.target.startsWith('foe')) {
						targets.push(...this.allies());
					}
					if (!move.target.startsWith('ally')) {
						targets.push(...this.foes());
					}
					if (targets.length && !targets.includes(target)) {
						this.battle.retargetLastMove(targets[targets.length - 1]);
					}
					break;
				case 'allAdjacent':
					targets.push(...this.nearbyAllies());
					// falls through
				case 'allAdjacentFoes':
					targets.push(...this.nearbyFoes());
					if (targets.length && !targets.includes(target)) {
						this.battle.retargetLastMove(targets[targets.length - 1]);
					}
					break;
				case 'allies':
					targets = this.allies();
					break;
				default:
					const selectedTarget = target;
					if (!target || (target.fainted && target.side !== this.side)) {
						// If a targeted foe faints, the move is retargeted
						const possibleTarget = this.battle.getRandomTarget(this, move);
						if (!possibleTarget) return {targets: [], pressureTargets: []};
						target = possibleTarget;
					}
					if (target.side.active.length > 1 && !move.tracksTarget) {
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
					if (target.fainted) {
						return {targets: [], pressureTargets: []};
					}
					if (selectedTarget !== target) {
						this.battle.retargetLastMove(target);
					}

					// Resolve apparent targets for Pressure.
					if (move.pressureTarget) {
						// At the moment, this is the only supported target.
						if (move.pressureTarget === 'foeSide') {
							pressureTargets = this.foes();
						}
					}
			}

			return {targets, pressureTargets: pressureTargets || targets};
		},
		cureStatus(pokemon: Pokemon, silent = false) {
			if (!this.hp || !this.status) return false;
			this.battle.add('-curestatus', this, this.status, silent ? '[silent]' : '[msg]');
			if (this.status === 'slp' && !this.hasAbility('comatose') && this.removeVolatile('nightmare')) {
				this.battle.add('-end', this, 'Nightmare', '[silent]');
			}
			this.setStatus('');
			if (this.volatiles['staccato']) {
				this.volatiles['staccato'].busted = true;
				this.removeVolatile('staccato')
			}
			return true;
		},
	},

// SANDBOX CONTENT STARTS HERE

	init() {
		
		// from main M4A
		
		for (const id in this.dataCache.Pokedex) {
			let pokemon = this.dataCache.Pokedex[id];

			// modding
			if (pokemon.movepoolAdditions) {
				for (const move of pokemon.movepoolAdditions) {
					this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
				}
			}

			// generating Megas
			if (pokemon && pokemon.mega) {
				const newMega = this.dataCache.Pokedex[pokemon.mega] = { name: pokemon.megaName };

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
				else if (uber.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Uber";
				else if (aprilfools.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "April Fools";
				else if (tourbanned.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Tourbanned";
				else if (tier1mega.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Tier 1 Mega";
				else if (tier2mega.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Tier 2 Mega";
				else if (tier3mega.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Tier 3 Mega";
				else if (tier4mega.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Tier 4 Mega";
				else if (nichemega.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Uncommon Mega";
				else if (illegal.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = "Illegal";
				else if (notier.includes(pokemon.mega)) this.modData('FormatsData', pokemon.mega).tier = null; // special exception for Wishiwashi, Falinks, et cetera
				else this.modData('FormatsData', pokemon.mega).tier = "Undecided";
			}

			// tiering
			if (this.modData('FormatsData', id)) {
				if (this.modData('FormatsData', id).isNonstandard === 'Past') this.modData('FormatsData', id).isNonstandard = null;
				// singles tiers
				if (ag.includes(id)) this.modData('FormatsData', id).tier = "AG";
				else if (uber.includes(id)) this.modData('FormatsData', id).tier = "Uber";
				else if (aprilfools.includes(id)) this.modData('FormatsData', id).tier = "April Fools";
				else if (hisui.includes(id)) this.modData('FormatsData', id).tier = "Hisui";
				else if (tourbanned.includes(id)) this.modData('FormatsData', id).tier = "Tourbanned";
				else if (newest.includes(id)) this.modData('FormatsData', id).tier = "Newest";
				else if (tier1mega.includes(id)) this.modData('FormatsData', id).tier = "Tier 1 Mega";
				else if (tier1.includes(id)) this.modData('FormatsData', id).tier = "Tier 1";
				else if (tier2mega.includes(id)) this.modData('FormatsData', id).tier = "Tier 2 Mega";
				else if (tier2.includes(id)) this.modData('FormatsData', id).tier = "Tier 2";
				else if (tier3mega.includes(id)) this.modData('FormatsData', id).tier = "Tier 3 Mega";
				else if (tier3.includes(id)) this.modData('FormatsData', id).tier = "Tier 3";
				else if (tier4mega.includes(id)) this.modData('FormatsData', id).tier = "Tier 4 Mega";
				else if (tier4.includes(id)) this.modData('FormatsData', id).tier = "Tier 4";
				else if (nichemega.includes(id)) this.modData('FormatsData', id).tier = "Uncommon Mega";
				else if (niche.includes(id)) this.modData('FormatsData', id).tier = "Uncommon";
				else if (illegal.includes(id)) this.modData('FormatsData', id).tier = "Illegal";
				else if (notier.includes(id)) this.modData('FormatsData', id).tier = null; // special exception for Wishiwashi, Falinks, et cetera
				else if (heat.includes(id) || canonmega.includes(id)) this.modData('FormatsData', id).tier = "Underrated"; // special exception for Yanmega
				else if (id.endsWith('mega')) this.modData('FormatsData', id).tier = "Undecided"; // guaranteeing M4A Megas that haven't been tiered appear in their own place
				else if (!this.modData('FormatsData', id).isNonstandard) this.modData('FormatsData', id).tier = "Underrated"; // default (untiered)
				if (id === 'crucibellemega') this.modData('FormatsData', id).tier = "CAP"; // hard-coding for things that don't exist
				/*
				// doubles tiers are commented out right now because they cause problems :pensive:
				if (vgcbanned.includes(id)) this.modData('FormatsData', id).doublesTier = "Illegal";
				else if (restricted.includes(id)) this.modData('FormatsData', id).doublesTier = "Restricted";
				else if (s.includes(id)) this.modData('FormatsData', id).doublesTier = "Tier 1";
				else if (aplus.includes(id) || a.includes(id) || aminus.includes(id)) this.modData('FormatsData', id).doublesTier = "Tier 2";
				else if (bplus.includes(id) || b.includes(id) || bminus.includes(id)) this.modData('FormatsData', id).doublesTier = "Tier 3";
				else if (c.includes(id)) this.modData('FormatsData', id).doublesTier = "Tier 4";
				else if (!this.modData('FormatsData', id).isNonstandard) this.modData('FormatsData', id).doublesTier = "Unranked";
				*/
			}
		};
		
		// MnM4A
		for (const i in this.data.Items) {
			if (!this.data.Items[i].megaStone) continue;
			this.modData('Items', i).onTakeItem = false;
			const id = this.toID(this.data.Items[i].megaStone);
			if (this.modData('FormatsData', id)) this.modData('FormatsData', id).isNonstandard = null;
		}
		// some slight changes around here to account for Legends: Arceus, which I am meant to be adding to the sandbox as convenient presets of sorts (:
		// first adding new moves to old Pokémon
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
		// these are from Legends: Arceus
		newMoves("abomasnow", ["iciclecrash"]);
		newMoves("aipom", ["doubleedge", "mudbomb", "quickattack"]);
		newMoves("ambipom", ["doubleedge", "mudbomb", "quickattack"]);
		newMoves("arceus", ["ancientpower", "confusion", "quickattack", "extrasensory", "dazzlinggleam", "dracometeor", "mysticalfire", "steelbeam"]);
		newMoves("azelf", ["doublehit", "mysticalpower", "powershift"]);
		newMoves("barboach", ["zenheadbutt"]);
		newMoves("bastiodon", ["powershift", "steelbeam"]);
		newMoves("beautifly", ["airslash"]);
		newMoves("bergmite", ["iceshard"]);
		newMoves("bibarel", ["bite"]);
		newMoves("bidoof", ["bite"]);
		newMoves("blissey", ["babydolleyes", "drainingkiss", "fairywind", "powershift", "tackle"]);
		newMoves("bonsly", ["headsmash", "irondefense", "tackle"]);
		newMoves("budew", ["petaldance", "poisonjab", "poisonpowder", "poisonsting"]);
		newMoves("buneary", ["doubleedge", "drainingkiss"]);
		newMoves("burmy", ["strugglebug"]);
		newMoves("carnivine", ["absorb", "leechlife"]);
		newMoves("chansey", ["babydolleyes", "drainingkiss", "fairywind", "tackle"]);
		newMoves("chatot", ["airslash", "gust", "hurricane", "powershift", "playrough", "snarl"]);
		newMoves("cherrim", ["absorb", "doubleedge", "sleeppowder", "stunspore"]);
		newMoves("cherubi", ["absorb", "doubleedge", "petaldance", "sleeppowder", "stunspore"]);
		newMoves("chimchar", ["doubleedge", "tackle"]);
		newMoves("chimecho", ["doubleedge", "extrasensory", "ominouswind"]);
		newMoves("chingling", ["doubleedge", "extrasensory", "ominouswind", "energyball"]);
		newMoves("clefable", ["babydolleyes", "doubleedge", "fairywind", "tackle"]);
		newMoves("clefairy", ["babydolleyes", "doubleedge", "fairywind", "tackle"]);
		newMoves("cleffa", ["babydolleyes", "calmmind", "doubleedge", "fairywind", "moonblast", "tackle"]);
		newMoves("cranidos", ["bite", "tackle"]);
		newMoves("cresselia", ["lunarblessing", "powershift", "recover", "tackle"]);
		newMoves("croagunk", ["closecombat", "earthpower"]);
		newMoves("cyndaquil", ["irontail"]);
		newMoves("darkrai", ["hex", "shadowsneak"]);
		newMoves("dartrix", ["aerialace", "airslash", "gust", "magicalleaf", "leafstorm", "psychocut"]);
		newMoves("dewott", ["slash"]);
		newMoves("drifblim", ["confusion", "extrasensory", "mysticalfire", "powershift"]);
		newMoves("drifloon", ["confusion", "extrasensory", "mysticalfire"]);
		newMoves("dusclops", ["absorb", "leechlife", "powershift"]);
		newMoves("dusknoir", ["absorb", "leechlife", "powershift"]);
		newMoves("duskull", ["absorb", "leechlife"]);
		newMoves("dustox", ["extrasensory"]);
		newMoves("eevee", ["calmmind", "mimic"]);
		newMoves("electabuzz", ["spark"]);
		newMoves("electivire", ["spark"]);
		newMoves("elekid", ["spark"]);
		newMoves("empoleon", ["doubleedge", "roost", "steelbeam", "wavecrash"]);
		newMoves("espeon", ["mimic", "rocksmash"]);
		newMoves("finneon", ["babydolleyes", "bubble", "airslash", "roost", "hydropump"]);
		newMoves("flareon", ["calmmind", "powershift", "mimic"]);
		newMoves("gallade", ["focusenergy", "icebeam"]);
		newMoves("gardevoir", ["aurasphere", "recover", "icebeam"]);
		newMoves("gastly", ["poisongas"]);
		newMoves("gastrodon", ["tackle"]);
		newMoves("gastrodoneast", ["tackle"]);
		newMoves("gengar", ["poisongas", "powershift"]);
		newMoves("glaceon", ["calmmind", "mimic", "powdersnow"]);
		newMoves("glalie", ["iceball"]);
		newMoves("glameow", ["doubleedge", "nastyplot", "nightslash", "tackle"]);
		newMoves("gligar", ["mudbomb"]);
		newMoves("gliscor", ["pinmissile", "spikes", "powershift"]);
		newMoves("golbat", ["crosspoison"]);
		newMoves("golduck", ["bubble", "triattack"]);
		newMoves("goomy", ["acidspray", "hydropump", "shelter"]);
		newMoves("grotle", ["bulldoze", "leafblade", "sleeppowder"]);
		newMoves("gyarados", ["focusenergy"]);
		newMoves("happiny", ["babydolleyes", "calmmind", "doubleedge", "drainingkiss", "fairywind", "softboiled", "tackle"]);
		newMoves("haunter", ["poisongas"]);
		newMoves("heatran", ["ember"]);
		newMoves("heracross", ["slash", "calmmind", "outrage"]);
		newMoves("hippopotas", ["mudbomb"]);
		newMoves("hippowdon", ["mudbomb"]);
		newMoves("honchkrow", ["airslash"]);
		newMoves("infernape", ["doubleedge", "drainpunch", "ragingfury"]);
		newMoves("jolteon", ["calmmind", "mimic"]);
		newMoves("kadabra", ["hypnosis"]);
		newMoves("kirlia", ["icebeam"]);
		newMoves("kricketot", ["absorb", "tackle"]);
		newMoves("kricketune", ["tackle"]);
		newMoves("landorus", ["bite", "crunch", "sandsearstorm", "tackle", "twister"]);
		newMoves("leafeon", ["calmmind", "leafage", "mimic"]);
		newMoves("lickilicky", ["doubleedge", "tackle", "iceball"]);
		newMoves("lickitung", ["doubleedge", "tackle", "iceball"]);
		newMoves("lopunny", ["doubleedge", "drainingkiss", "machpunch"]);
		newMoves("lucario", ["machpunch"]);
		newMoves("lumineon", ["aerialace", "bubble", "airslash", "roost", "hydropump"]);
		newMoves("machamp", ["doublehit", "drainpunch", "machpunch", "tackle"]);
		newMoves("machoke", ["doublehit", "machpunch", "tackle"]);
		newMoves("machop", ["doublehit", "machpunch", "tackle"]);
		newMoves("magby", ["poisongas", "tackle"]);
		newMoves("magmar", ["poisongas", "tackle"]);
		newMoves("magmortar", ["poisongas", "tackle"]);
		newMoves("mamoswine", ["babydolleyes"]);
		newMoves("manaphy", ["bubble", "confusion", "hydropump", "moonblast", "takeheart", "zenheadbutt", "calmmind"]);
		newMoves("mantine", ["doubleedge", "powershift"]);
		newMoves("mantyke", ["doubleedge", "roost"]);
		newMoves("mesprit", ["doublehit", "mysticalpower", "recover"]);
		newMoves("mimejr", ["irondefense", "zenheadbutt"]);
		newMoves("misdreavus", ["extrasensory", "hypnosis"]);
		newMoves("mismagius", ["extrasensory", "hypnosis"]);
		newMoves("monferno", ["doubleedge"]);
		newMoves("mrmime", ["powershift"]);
		newMoves("munchlax", ["gigaimpact", "highhorsepower", "iceball"]);
		newMoves("murkrow", ["airslash", "nightslash"]);
		newMoves("ninetales", ["flamewheel", "nastyplot"]);
		newMoves("ninetalesalola", ["icefang"]);
		newMoves("nosepass", ["flashcannon", "powershift"]);
		newMoves("onix", ["powershift"]);
		newMoves("oshawott", ["slash"]);
		newMoves("pachirisu", ["crunch", "thundershock", "playrough"]);
		newMoves("paras", ["energyball"]);
		newMoves("petilil", ["leafage", "poisonpowder", "recover", "babydolleyes"]);
		newMoves("phione", ["bubble", "confusion", "hydropump", "moonblast", "takeheart", "zenheadbutt", "calmmind"]);
		newMoves("pichu", ["babydolleyes", "quickattack", "spark"]);
		newMoves("pikachu", ["babydolleyes", "calmmind"]);
		newMoves("piloswine", ["babydolleyes"]);
		newMoves("piplup", ["doubleedge", "liquidation", "roost", "tackle"]);
		newMoves("ponyta", ["doublehit"]);
		newMoves("porygon", ["spark"]);
		newMoves("porygon2", ["spark"]);
		newMoves("porygonz", ["powershift", "spark"]);
		newMoves("prinplup", ["doubleedge", "liquidation", "roost"]);
		newMoves("probopass", ["steelbeam", "powershift"]);
		newMoves("psyduck", ["bubble", "triattack"]);
		newMoves("purugly", ["doubleedge", "nastyplot", "nightslash", "tackle"]);
		newMoves("quilava", ["irontail"]);
		newMoves("raichu", ["babydolleyes", "calmmind"]);
		newMoves("ralts", ["icebeam"]);
		newMoves("rampardos", ["powershift", "bite"]);
		newMoves("rapidash", ["doublehit"]);
		newMoves("regigigas", ["ancientpower", "powershift", "tackle"]);
		newMoves("remoraid", ["bubble"]);
		newMoves("rhydon", ["doubleedge"]);
		newMoves("rhyhorn", ["doubleedge", "gigaimpact"]);
		newMoves("rhyperior", ["doubleedge"]);
		newMoves("riolu", ["aurasphere", "closecombat", "focusenergy"]);
		newMoves("roselia", ["poisonpowder"]);
		newMoves("roserade", ["poisonpowder"]);
		newMoves("rowlet", ["aerialace", "airslash", "gust", "magicalleaf", "leafstorm", "psychocut"]);
		newMoves("rufflet", ["doubleedge", "quickattack", "twister", "ominouswind"]);
		newMoves("scizor", ["closecombat", "calmmind"]);
		newMoves("scyther", ["closecombat", "calmmind"]);
		newMoves("sealeo", ["liquidation", "babydolleyes"]);
		newMoves("shaymin", ["leafage", "recover", "sleeppowder", "aerialace", "babydolleyes", "playrough"]);
		newMoves("shellos", ["tackle"]);
		newMoves("shieldon", ["steelbeam", "tackle"]);
		newMoves("snorlax", ["iceball"]);
		newMoves("snover", ["iciclecrash"]);
		newMoves("spheal", ["liquidation", "babydolleyes"]);
		newMoves("spiritomb", ["extrasensory"]);
		newMoves("stantler", ["confusion", "psyshieldbash"]);
		newMoves("staraptor", ["airslash", "gust", "focusenergy"]);
		newMoves("staravia", ["airslash", "gigaimpact", "gust"]);
		newMoves("starly", ["airslash", "gigaimpact", "gust"]);
		newMoves("steelix", ["iceball", "powershift"]);
		newMoves("stunky", ["doubleedge", "poisonjab", "tackle"]);
		newMoves("sudowoodo", ["tackle"]);
		newMoves("swinub", ["highhorsepower", "babydolleyes"]);
		newMoves("sylveon", ["magicalleaf", "mimic", "rocksmash"]);
		newMoves("tangela", ["acidspray", "doublehit"]);
		newMoves("tangrowth", ["acidspray", "doublehit"]);
		newMoves("teddiursa", ["highhorsepower", "focusenergy", "tackle"]);
		newMoves("tentacool", ["acidarmor"]);
		newMoves("thundurus", ["powershift", "spark", "tackle", "twister", "wildboltstorm"]);
		newMoves("togekiss", ["babydolleyes", "calmmind", "moonblast", "tackle"]);
		newMoves("togepi", ["babydolleyes", "calmmind", "fairywind", "moonblast", "tackle"]);
		newMoves("togetic", ["airslash", "babydolleyes", "calmmind", "moonblast", "tackle"]);
		newMoves("tornadus", ["bleakwindstorm", "tackle", "twister"]);
		newMoves("torterra", ["leafblade", "headlongrush", "sleeppowder"]);
		newMoves("toxicroak", ["closecombat", "earthpower"]);
		newMoves("turtwig", ["bulldoze", "leafblade", "sleeppowder"]);
		newMoves("umbreon", ["calmmind", "mimic", "powershift", "rocksmash"]);
		newMoves("ursaring", ["highhorsepower", "focusenergy"]);
		newMoves("uxie", ["doublehit", "hypnosis", "mysticalpower", "powershift"]);
		newMoves("vaporeon", ["bubble", "calmmind", "mimic"]);
		newMoves("vespiquen", ["powershift", "recover"]);
		newMoves("vulpix", ["flamewheel", "nastyplot"]);
		newMoves("vulpixalola", ["dazzlinggleam", "energyball", "icefang", "nastyplot", "quickattack"]);
		newMoves("walrein", ["babydolleyes"]);
		newMoves("whiscash", ["aerialace"]);
		newMoves("wormadam", ["gust", "silverwind", "magicalleaf"]);
		newMoves("wormadamsandy", ["gust", "silverwind"]);
		newMoves("wormadamtrash", ["gust", "silverwind", "steelbeam"]);
		newMoves("yanma", ["gust"]);
		newMoves("yanmega", ["crunch"]);
		newMoves("zubat", ["crosspoison"]);

		// then adding the new Pokémon in the most efficient way possible
		for (const id in this.dataCache.Pokedex) {
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon) continue; // weeding out Pokémon that aren't new

			if (newMon.copyData) {
				let copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];
				if (!newMon.types && copyData.types) newMon.types = copyData.types;
				if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
				if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
				if (!newMon.num && copyData.num) newMon.num = copyData.num;
				if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
				if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
				if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
				if (!newMon.color && copyData.color) newMon.color = copyData.color;
				if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;
			} else if (!newMon.name.startsWith('Enamorus')) continue;

			if (!this.dataCache.Learnsets[id]) continue; // just in case
			const movepoolAdditions = ["attract", "endure", "facade", "protect", "rest", "round", "sleeptalk", "snore", "substitute"];
			for (const move of movepoolAdditions) {
				this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
			}
		}
	},

	// modifyDamage added for frostbite for Hisuian Zoroark specifically
	// I do not know restraint when I see this Pokémon I'm sorry
	// it's not even mod-related what am I doing

	modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
	) {
		const tr = this.trunc;
		if (!move.type) move.type = '???';
		const type = move.type;

		baseDamage += 2;

		// multi-target modifier (doubles only)
		if (move.spreadHit) {
			const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
			this.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.modify(baseDamage, spreadModifier);
		}

		// weather modifier
		baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.randomizer(baseDamage);

		// STAB
		if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			baseDamage = this.modify(baseDamage, move.stab || 1.5);
		}
		// types
		let typeMod = target.runEffectiveness(move);
		typeMod = this.clampIntRange(typeMod, -6, 6);
		target.getMoveHitData(move).typeMod = typeMod;
		if (typeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);

			for (let i = 0; i < typeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (typeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);

			for (let i = 0; i > typeMod; i--) {
				baseDamage = tr(baseDamage / 2);
			}
		}

		if (isCrit && !suppressMessages) this.add('-crit', target);

		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
			if (this.gen < 6 || move.id !== 'facade') {
				baseDamage = this.modify(baseDamage, 0.5);
			}
		}

		if (pokemon.status === 'frz' && pokemon.statusData.frostbite && move.category === 'Special') { // the only changed section
			baseDamage = this.modify(baseDamage, 0.5);
		}

		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.modify(baseDamage, 0.25);
			this.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},

	// MnM4A scripts

	canMegaEvo(pokemon) {
		if (pokemon.species.isMega) return null;

		const item = pokemon.getItem();
		if (item.megaStone) {
			if (item.megaStone === pokemon.baseSpecies.name) return null;
			else if (item.name === "Lycanite" && pokemon.baseSpecies.name === "Lycanroc-Midnight") return "Lycanroc-Midnight-Mega";
			else if (item.name === "Lycanite" && pokemon.baseSpecies.name === "Lycanroc-Dusk") return "Lycanroc-Dusk-Mega";
			else if (item.name === "Slowkinite" && pokemon.baseSpecies.name === "Slowking-Galar") return "Slowking-Galar-Mega";
			else if (item.name === "Gourgeite" && pokemon.baseSpecies.name === "Gourgeist-Small") return "Gourgeist-Small-Mega";
			else if (item.name === "Gourgeite" && pokemon.baseSpecies.name === "Gourgeist-Large") return "Gourgeist-Large-Mega";
			else if (item.name === "Gourgeite" && pokemon.baseSpecies.name === "Gourgeist-Super") return "Gourgeist-Super-Mega";
			else if (item.name === "Reginite" && pokemon.baseSpecies.name === "Regice") return "Regice-Mega";
			else if (item.name === "Reginite" && pokemon.baseSpecies.name === "Registeel") return "Registeel-Mega";
			else if (item.name === "Meowsticite" && pokemon.baseSpecies.name === "Meowstic-F") return "Meowstic-F-Mega";
			else if (item.name === "Sawsbuckite" && pokemon.baseSpecies.id === "sawsbucksummer") return "Sawsbuck-Summer-Mega";
			else if (item.name === "Sawsbuckite" && pokemon.baseSpecies.id === "sawsbuckautumn") return "Sawsbuck-Autumn-Mega";
			else if (item.name === "Sawsbuckite" && pokemon.baseSpecies.id === "sawsbuckwinter") return "Sawsbuck-Winter-Mega";
			else if (item.name === "Toxtricitite" && pokemon.baseSpecies.name === "Toxtricity-Low-Key") return "Toxtricity-Low-Key-Mega";
			else return item.megaStone;
		} else {
			return null;
		}
	},
	runMegaEvo(pokemon) {
		if (pokemon.species.isMega) return false;
		if (pokemon.illusion) {
			this.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityData, pokemon);
		}

		// @ts-ignore
		let species: Species = this.getMixedSpecies(pokemon.species, pokemon.canMegaEvo);
		species.isMega = true;
		const side = pokemon.side;

		// Pokémon affected by Sky Drop cannot Mega Evolve. Enforce it here for now.
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		// Do we have a proper sprite for it?
		if (this.dex.species.get(pokemon.canMegaEvo!).baseSpecies === pokemon.m.originalSpecies) {
			species.id = this.dex.species.get(pokemon.canMegaEvo!).id ? this.dex.species.get(pokemon.canMegaEvo!).id : species.id;
			species.name = this.dex.species.get(pokemon.canMegaEvo!).name ? this.dex.species.get(pokemon.canMegaEvo!).name : species.name;
			pokemon.formeChange(species, pokemon.getItem(), true);
			this.add('-start', pokemon, pokemon.getItem(), '[silent]');
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		} else {
			let oSpecies = pokemon.m.originalSpecies;
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(species.originalMega);
			pokemon.formeChange(species, pokemon.getItem(), true);
			if (oMegaSpecies.requiredItem) this.add('-start', pokemon, oMegaSpecies.requiredItem, '[silent]');
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		}
		pokemon.canMegaEvo = null;
		return true;
	},
	getMixedSpecies(originalForme, megaForme) {
		let originalSpecies = originalForme;
		// @ts-ignore
		const deltas = this.getMegaDeltas(this.dex.species.get(megaForme));
		// @ts-ignore
		const species = this.doGetMixedSpecies(originalSpecies, deltas);
		return species;
	},
	getMegaDeltas(megaSpecies) {
		const baseSpecies = this.dex.species.get(megaSpecies.baseSpecies);
		const deltas: {
			ability: string,
			baseStats: SparseStatsTable,
			weighthg: number,
			originalMega: string,
			requiredItem: string | undefined,
			type?: string,
			isMega?: boolean,
		} = {
			ability: megaSpecies.abilities['0'],
			baseStats: {},
			weighthg: megaSpecies.weighthg - baseSpecies.weighthg,
			originalMega: megaSpecies.name,
			requiredItem: megaSpecies.requiredItem,
		};
		let statId: StatName;
		for (statId in megaSpecies.baseStats) {
			deltas.baseStats[statId] = megaSpecies.baseStats[statId] - baseSpecies.baseStats[statId];
		}
		if (megaSpecies.types.length > baseSpecies.types.length) {
			deltas.type = 'type1';
			deltas.type1 = megaSpecies.types[1];
		} else if (megaSpecies.types.length < baseSpecies.types.length) {
			deltas.type = 'mono';
		} else if (megaSpecies.types[0] !== baseSpecies.types[0]) {
			deltas.type = 'type0';
			deltas.type0 = megaSpecies.types[0];
		} else if (megaSpecies.types[1] !== baseSpecies.types[1]) {
			deltas.type = 'type1';
			deltas.type1 = megaSpecies.types[1];
		}
		deltas.isMega = true;
		return deltas;
	},
	doGetMixedSpecies(speciesOrForme, deltas) {
		if (!deltas) throw new TypeError("Must specify deltas!");
		const preMegaForme = this.dex.species.get(speciesOrForme);
		let species = this.dex.deepClone(preMegaForme);
		species.abilities = {'0': deltas.ability};
		if (deltas.type === 'mono') {
			species.types = [species.types[0]];
		} else if (deltas.type === 'type1') {
			if (species.types[0] === deltas.type1) {
				species.types = [deltas.type1];
			} else {
				species.types = [species.types[0], deltas.type1];
			}
		} else if (deltas.type === 'type0') {
			if (species.types[1] === deltas.type0) {
				species.types = [deltas.type0];
			} else if (!species.types[1] && species.types[0] !== deltas.type0) {
				// single-typed Pokémon can still have a primary type as their secondary type
				species.types = [species.types[0], deltas.type0];
			} else {
				species.types = [deltas.type0, species.types[1]];
			}
		}
		const baseStats = species.baseStats;
		for (const statName in baseStats) {
			baseStats[statName] = this.clampIntRange(baseStats[statName] + deltas.baseStats[statName], 1, 255);
		}
		species.weighthg = Math.max(1, species.weighthg + deltas.weighthg);
		species.originalMega = deltas.originalMega;
		species.requiredItem = deltas.requiredItem;
		if (deltas.isMega) species.isMega = true;
		species.deltas = deltas; // preserving deltas for potential form change compatibility
		return species;
	},
	
};
