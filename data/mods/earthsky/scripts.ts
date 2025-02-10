import {EffectState} from '../../../sim/pokemon';
import {Pokemon} from '../../../sim/pokemon';
import {Battle} from '../../../sim/battle';
import {Utils} from '../../../lib';

export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['ESH', 'Uber', 'OU', 'NFE', 'LC'],
		moveIsNotUseless(id: ID, species: Species, moves: string[], set: PokemonSet, dex: ModdedDex): boolean {
			let abilityid: ID = set ? toID(set.ability) : '' as ID;
			const itemid: ID = set ? toID(set.item) : '' as ID;
			const formatType = (dex.modid.indexOf("triples") > 0) ? 'triples' : 'singles'; //Doubles isn't a current format, won't bother right now

			if (itemid === 'pidgeotite') abilityid = 'noguard' as ID;
			if (itemid === 'blastoisinite' || itemid === 'magmortarite') abilityid = 'megalauncher' as ID;
			if (itemid === 'heracronite') abilityid = 'skilllink' as ID;
			if (itemid === 'cameruptite') abilityid = 'sheerforce' as ID;
			if (itemid === 'aerodactylite' || itemid === 'charizarditex') abilityid = 'toughclaws' as ID;
			if (itemid === 'ralitite' || itemid === 'charizarditey') abilityid = 'drought' as ID;
			if (itemid === 'glalitite') abilityid = 'refrigerate' as ID;
			if (itemid === 'galladite') abilityid = 'sharpness' as ID;
			if (itemid === 'sharpedonite') abilityid = 'strongjaw' as ID;
			
			if (species.baseSpecies === "Unown") {
				if(id.startsWith('hiddenpower')) return id === (species.forme ? 'hiddenpowerpsychic' : 'hiddenpower'); //Only A wants regular HP since it changes type anyway
				else return ["G", "P", "Q"].includes(species.forme); //Stored Power
			}

			switch (id) {
			case 'chargebeam': case 'fierydance': case 'torchsong':
				return species.baseStats.spa >= 90 && abilityid !== 'sheerforce';
			case 'poweruppunch': 
				return species.baseStats.atk >= 90 && abilityid !== 'sheerforce';
			case 'aquastep': case 'flamecharge': case 'nuzzle':
				return abilityid !== 'sheerforce';
			case 'solarbeam': case 'solarblade':
				return ['desolateland', 'drought', 'chlorophyll', 'orichalcumpulse'].includes(abilityid) || itemid === 'powerherb';
			case 'dynamicpunch': case 'grasswhistle': case 'inferno': case 'sing': case 'zapcannon': 
				return ['supermassive', 'noguard'].includes(abilityid);
			case 'heatcrash': case 'heavyslam':
				return species.weightkg >= (species.evos ? 75 : 130);
			case 'firepledge': case 'grasspledge': case 'waterpledge':
				return ['fireplaque', 'grassplaque', 'waterplaque'].includes(itemid);

			case 'acrobatics':
				return itemid === '' || dex.items.get(itemid)?.consumable;
			case 'aerialace':
				return ['sharpness', 'technician'].includes(abilityid) && !moves.includes('bravebird');
			case 'ancientpower':
				return ['serenegrace', 'technician', 'sheerforce'].includes(abilityid) || !moves.includes('powergem');
			case 'aromaticmist':
				return abilityid === 'mistysurge';
			case 'attract':
				return abilityid === 'irresistable';
			case 'bellydrum':
				return moves.includes('aquajet') || moves.includes('extremespeed') ||
					['iceface', 'unburden'].includes(abilityid);
			case 'bodypress':
				return species.baseStats.def >= 90 || species.baseStats.def > species.baseStats.atk || (moves.includes('acidarmor') || moves.includes('barrier') || moves.includes('irondefense') || moves.includes('shelter'));
			case 'bugbite':
				return species.types.includes('Bug') && ['technician', 'strongjaw'].includes(abilityid);
			case 'chillywater':
				return !moves.includes('scald');
			case 'coreenforcer':
				return abilityid === 'powerconstruct';
			case 'feint':
				return abilityid === 'refrigerate';
			case 'floralhealing':
			case 'flowershield':
				return abilityid === 'grassysurge';
			case 'hiddenpowerelectric':
				return !(moves.includes('thunderbolt') || moves.includes('discharge'));
			case 'hiddenpowerfighting':
				return abilityid === 'technician' || !(moves.includes('aurasphere') || moves.includes('focusblast'));
			case 'hiddenpowerfire':
				return !(moves.includes('flamethrower') || moves.includes('heatwave') || moves.includes('lavaplume') || moves.includes('mysticalfire'));
			case 'hiddenpowergrass':
				return !(moves.includes('energyball') || moves.includes('grassknot') || moves.includes('gigadrain'));
			case 'hiddenpowerice':
				return !(moves.includes('icebeam') || moves.includes('aurorabeam') || moves.includes('glaciate'));
			case 'hiddenpowerground':
				return !moves.includes('earthpower');
			case 'hypnosis':
				return ['baddreams', 'compoundeyes', 'insomnia'].includes(abilityid) && 
				!(moves.includes('spore') || moves.includes('darkvoid') || moves.includes('grasswhistle') || moves.includes('sing') || moves.includes('sleeppowder'));
			case 'ironhead':
				return !moves.includes('metaledge');
			case 'irontail':
				return abilityid === 'supermassive' || species.types.includes('Steel') || !(moves.includes('ironhead') || moves.includes('gunkshot') || moves.includes('poisonjab'));
			case 'jumpkick':
				return !moves.includes('highjumpkick');
			case 'magneticflux':
				return abilityid === 'induction';
			case 'outrage':
				return abilityid === 'owntempo';
			case 'phantomforce':
				return !(moves.includes('shadowforce') || moves.includes('poltergeist') || moves.includes('shadowclaw')) || formatType !== 'singles';
			case 'poisonfang':
				return species.types.includes('Poison') && !(moves.includes('gunkshot') || moves.includes('poisonjab'));
			case 'psychocut':
				return abilityid === 'sharpness' || !moves.includes('zenheadbutt');
			case 'shadowpunch':
				return abilityid === 'ironfist';
			case 'smackdown':
				return abilityid === 'technician' || species.types.includes('Ground');
			case 'submission':
				return ['reckless', 'rockhead'].includes(abilityid) || itemid === 'protector' || !(moves.includes('closecombat') || moves.includes('highjumpkick') || moves.includes('jumpkick'));
			case 'superpower':
				return !(moves.includes('closecombat') || moves.includes('highjumpkick') || moves.includes('jumpkick'));
			case 'tantrum':
				return !(moves.includes('earthquake') || moves.includes('drillrun') || moves.includes('highhorsepower')) || formatType !== 'singles';
			case 'terablast':
				return itemid.endsWith('terashard');
			case 'wildcharge':
				return !(moves.includes('volttackle') || moves.includes('zingzap') || moves.includes('plasmafists'));
			}

			if (formatType !== 'singles' && this.GOOD_DOUBLES_MOVES.includes(id)) {
				return true;
			}
			const moveData = dex.moves.get(id);
			if (!moveData) return true;
			if (moveData.category === 'Status') {
				return this.GOOD_STATUS_MOVES.includes(id);
			}
			if (moveData.flags?.charge) {
				return abilityid === 'tireless' || itemid === 'powerherb';
			}
			if (moveData.flags?.recharge) {
				return abilityid === 'tireless';
			}
			if (moveData.flags?.slicing && abilityid === 'sharpness') {
				return true;
			}
			if (moveData.flags?.bludg && abilityid === 'bludgeon' && id !== 'bash') {
				return true;
			}
			if (moveData.flags?.bite && abilityid === 'strongjaw' && id !== 'bite') {
				return true;
			}
			if(moveData.multihit && moveData.basePower > 15 && (['skilllink', 'technician'].includes(abilityid) || itemid === 'loadeddice')){
				return true;
			}
			if (moveData.basePower < 75 && !(abilityid === 'technician' && moveData.basePower <= 60 && moveData.basePower >= 50)) {
				return this.GOOD_WEAK_MOVES.includes(id);
			}
			return !this.BAD_STRONG_MOVES.includes(id);
		},
		GOOD_STATUS_MOVES: [
			'acidarmor', 'agility', 'aromatherapy', 'auroraveil', 'autotomize', 'batonpass', 'bellydrum', 'bulkup', 'bunkerdown', 'calmmind', 'coil', 'cottonguard', 'courtchange', 'curse', 'defog', 'destinybond', 'detect', 'disable', 'doubleteam', 'dragondance', 'eminence', 'encore', 'escapetunnel', 'filletaway', 'geomancy', 'glare', 'haze', 'healbell', 'healblock', 'healorder', 'healpulse', 'healingwish', 'heartswap', 'honeclaws', 'irondefense', 'kingsshield', 'leechseed', 'lightscreen', 'lovelykiss', 'lunardance', 'magiccoat', 'meditate', 'memento', 'midnight', 'milkdrink', 'moonlight', 'morningsun', 'nastyplot', 'naturesmadness', 'noretreat', 'obstruct', 'painsplit', 'partingshot', 'perishsong', 'preheat', 'protect', 'psybubble', 'quiverdance', 'rebound', 'recover', 'reflect', 'reflecttype', 'rejuvenate', 'rest', 'restorelife', 'revivalblessing', 'roar', 'rockpolish', 'roost', 'rototiller', 'shellsmash', 'shelter', 'shiftgear', 'shoreup', 'silktrap', 'slackoff', 'sleeppowder', 'sleeptalk', 'slipaway', 'softboiled', 'spiderweb', 'spikes', 'spikyshield', 'spore', 'stasis', 'stealthrock', 'stickyweb', 'strengthsap', 'substitute', 'switcheroo', 'swordsdance', 'synthesis', 'tailglow', 'tailwind', 'taunt', 'thunderwave', 'toxic', 'transform', 'trick', 'victorydance', 'warriorssoul', 'whirlwind', 'willowisp', 'wish', 'yawn',
		],
		GOOD_WEAK_MOVES: [
			'accelerock', 'ambush', 'aquacutter', 'aquajet', 'avalanche', 'bind', 'boltbeak', 'bonemerang', 'bulletpunch', 'circlethrow', 'clamp', 'clearsmog', 'crushgrip', 'doubleironbash', 'dragondarts', 'dragontail', 'drainingkiss', 'endeavor', 'equalizer', 'facade', 'firefang', 'fishiousrend', 'flowertrap', 'freezedry', 'frostbreath', 'frustration', 'geargrind', 'grassknot', 'gyroball', 'hex', 'icefang', 'iceshard', 'knockoff', 'lastrespects', 'lowkick', 'machpunch', 'mortalstrike', 'naturesmadness', 'nightshade', 'nuzzle', 'pelletshot', 'populationbomb', 'psychocut', 'pursuit', 'quickattack', 'rapidspin', 'ruination', 'saltcure', 'scald', 'seismictoss', 'shadowclaw', 'shadowsneak', 'skydrop', 'snaptrap', 'stoneaxe', 'storedpower', 'stormthrow', 'suckerpunch', 'superfang', 'surgingstrikes', 'tailslap', 'trailhead', 'uturn', 'vengefulspirit', 'voltswitch', 'watershuriken', 'weatherball', 'withering',
		],
		BAD_STRONG_MOVES: [
			'belch', 'burnup', 'completeshock', 'crushclaw', 'dreameater', 'eggbomb', 'falsesurrender', 'flyingpress', 'hyperfang', 'hyperspacehole', 'jawlock', 'megapunch', 'muddywater', 'pollenpuff', 'selfdestruct', 'shelltrap', 'slam', 'smartstrike', 'synchronoise', 'takedown', 'thrash', 'uproar', 'vitalthrow',
		],
		GOOD_DOUBLES_MOVES: [
			'allyswitch', 'barbbarrage', 'bulldoze', 'electroweb', 'faketears', 'fling', 'followme', 'helpinghand', 'junglehealing', 'lifedew', 'muddywater', 'pollenpuff', 'psychup', 'ragepowder', 'safeguard', 'skillswap', 'snarl', 'snipeshot', 'wideguard',
		],
	},
	/* sim edits */
	pokemon: {
		previousTurnState: EffectState,
		turnState: EffectState,
		updateTurnState(): null { //New function that stores current stats/status/volatiles each turn for Preservation
			//console.log(this.name + " Turn #" + this.activeTurns);
			this.previousTurnState = Object.assign({}, this.turnState);
			//console.log("previousTurnState:");
			//console.log(this.previousTurnState);
			this.turnState = {status: {...this.statusState}, volatiles: {...this.volatiles}, boosts: {...this.boosts}, weighthg: this.weighthg};
			//console.log("turnState:");
			//console.log(this.turnState);
		},
		isValidTarget(): boolean { //New property to condense fainted, Play Dead, and Commanding checks
			return !(this.fainted || this.volatiles['playdead'] || this.volatiles['commanding']);
		},
		oppositeFoe(): Pokemon { //Direct opposite foe in Doubles/Triples battles
			return this.side.foe.active[this.side.foe.active.length - 1 - this.position];
		},
		getSmartTargets(target: Pokemon, move: ActiveMove) { //Triple Battle targeting and Commander/Play Dead
			let target2: Pokemon = undefined;
			if (target.adjacentAllies().length === 2 && (this.tacticianBoosted || this.position === 1)){
				const targetPos = this.battle.sample([0, 1]); //Pick random ally
				target2 = target.adjacentAllies()[targetPos];
				if (!target2 || target2 === this || !target2.hp || !target2.isValidTarget()) { //Ally is invalid, try the other
					target2 = target.adjacentAllies()[1 - targetPos];
					if (!target2 || target2 === this || !target2.hp || !target2.isValidTarget()) { //Both are invalid, hit the original twice
						move.smartTarget = false;
						return [target];
					}
				}
				if (target === this || !target.hp || !target.isValidTarget()) {
					target = target.adjacentAllies()[1 - targetPos]; //Check other ally
					if (!target || target === this || !target.hp || !target.isValidTarget()) { //Other ally is invalid, hit first twice
						move.smartTarget = false;
						return [target2];
					}
				}
			} else {
				target2 = target.adjacentAllies()[0];
				if (!target2 || target2 === this || !target2.hp || !target2.isValidTarget()) {
					move.smartTarget = false;
					return [target];
				}
				if (target === this || !target.hp || !target.isValidTarget()) {
					move.smartTarget = false;
					return [target2];
				}
			}
			return [target, target2];
		},
		getMoveTargets(move: ActiveMove, target: Pokemon): {targets: Pokemon[], pressureTargets: Pokemon[]} { //Commander and Play Dead
			let targets: Pokemon[] = [];
			let pressureTargets;

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
				if (!target || (!target.isValidTarget && target.side !== this.side)) {
					// If a targeted foe faints, Plays Dead, or is off the field from Commander, the move is retargeted
					const possibleTarget = this.battle.getRandomTarget(this, move);
					if (!possibleTarget) return {targets: [], pressureTargets: []};
					target = possibleTarget;
				}
				if (target.side.active.length > 1 && !move.tracksTarget) {
					const isCharging = move.flags['charge'] && !this.volatiles['twoturnmove'] &&
						!(move.id.startsWith('solarb') && this.battle.field.isWeather(['sunnyday', 'desolateland'])) &&
						!((this.hasItem('powerherb') || !this.hasAbility('tireless')) && move.id !== 'skydrop');
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
				if (!target.isValidTarget()) {
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
			targets.filter(target => !target.volatiles['commanding']);
			return {targets, pressureTargets: pressureTargets || targets};
		},
		getMoves(lockedMove?: string | null, restrictData?: boolean): { //Tactician and 3-charge Spit Up targeting
			move: string, id: string, disabled?: string | boolean, disabledSource?: string,
			target?: string, pp?: number, maxpp?: number,
		}[] {
			if (lockedMove) {
				lockedMove = this.battle.toID(lockedMove);
				this.trapped = true;
				if (lockedMove === 'recharge') {
					return [{
						move: 'Recharge',
						id: 'recharge',
					}];
				}
				for (const moveSlot of this.moveSlots) {
					if (moveSlot.id !== lockedMove) continue;
					return [{
						move: moveSlot.move,
						id: moveSlot.id,
					}];
				}
				// does this happen?
				return [{
					move: this.battle.dex.moves.get(lockedMove).name,
					id: lockedMove,
				}];
			}
			const moves = [];
			let hasValidMove = false;
			for (const moveSlot of this.moveSlots) {
				let moveName = moveSlot.move;
				if (moveSlot.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				} else if (moveSlot.id === 'return' || moveSlot.id === 'frustration') {
					const basePowerCallback = this.battle.dex.moves.get(moveSlot.id).basePowerCallback as (pokemon: Pokemon) => number;
					moveName += ' ' + basePowerCallback(this);
				}
				let target = moveSlot.target;
				switch(moveSlot.id){
					case 'curse':
						if (!this.hasType('Ghost')) {
							target = this.battle.dex.moves.get('curse').nonGhostTarget || moveSlot.target;
						}
						break;
					case 'spitup':
						if (this.volatiles['stockpile']?.layers === 3) {
							target = 'allAdjacentFoes';
						}
						break;
					case 'present':
					case 'pollenpuff':
						if (this.volatiles['healblock']) {
							target = 'adjacentFoe';
						}
						break;
					case 'terastarstorm':
						if (this.species.name === 'Terapagos-Stellar') {
							target = 'allAdjacentFoes';
						}
						break;
				}
				if(this.tacticianBoosted){
					switch(target) {
						case 'normal':
							target = 'any';
							break;
						case 'adjacentAllyOrSelf':
							target = 'anyAlly';
							break;
					}
				}
				let disabled = moveSlot.disabled;
				if (
					(moveSlot.pp <= 0 && !this.volatiles['partialtrappinglock']) || disabled &&
					this.side.active.length >= 2 && this.battle.actions.targetTypeChoices(target!)
				) {
					disabled = true;
				}

				if (!disabled) {
					hasValidMove = true;
				} else if (disabled === 'hidden' && restrictData) {
					disabled = false;
				}

				moves.push({
					move: moveName,
					id: moveSlot.id,
					pp: moveSlot.pp,
					maxpp: moveSlot.maxpp,
					target,
					disabled,
				});
			}
			return hasValidMove ? moves : [];
		},
		getStrongestMove(target: Pokemon, seeItem?: boolean){ //New function used by Forewarn & Glyphic Spell for finding the move to reveal
			let strongestMove: ([String, String][]) = undefined;
			for (const moveSlot of this.moveSlots) {
				let bestBP = 1;
				const move = this.battle.dex.moves.get(moveSlot.move);
				//console.log("Forewarn investigating " + move.name);
				if(!move) continue;
				let bp = move.basePower;
				let direct = false; //direct damage moves won't need additional calcs later
				if ((['powertrip','punishment','storedpower','trumpcard'].includes(move.id)) || !bp && move.category !== 'Status'){ //Special cases
					switch(move.id){
					//Fixed-damage moves: Twice the percentage of max HP the move deals
					case('dragonrage'):
					case('sonicboom'):
						bp = move.damage / target.maxhp * 200;
						direct = true;
						break;
					case('endeavor'):
						bp = (target.hp - target.hp) / target.maxhp * 200;
						direct = true;
						break;
					case('finalgambit'):
						bp = target.hp / target.maxhp * 200;
						direct = true;
						break;
					case('natureswrath'):
					case('superfang'):
						bp = target.hp / 2 / target.maxhp * 200;
						direct = true;
						break;
					case('nightshade'):
					case('psywave'): //Damage variance is ignored
					case('seismictoss'):
						bp = target.level / target.maxhp * 200;
						direct = true;
						break;
					case('fissure'): //OHKOs: Would be faster for these moves to check for move.ohko,
					case('guillotine'): // but the switch is called for everything else anyway
					case('horndrill'): // and I like the organization of this better
					case('sheercold'):
					case('underflame'):
						bp = 200;
						direct = true;
						break;
					//Variable-power moves
					case('beatup'): //The number of unfainted/unstatused Pokemon is known, but their Attack might not be so it assumes 10 (the old BP) for simplicity
						bp = 10 * this.side.target.filter(ally => ally === target || !ally.fainted && !ally.status).length;
						break;
					case('lastrespects'): //Same but fainted
						bp = 10 * this.side.target.filter(ally => ally.fainted).length;
						break;
					case('poltergeist'):
						const item = target.getItem();
						bp = (item.fling) ? 80 + item.fling.basePower : 0;
						break;
					//All these move use basePowerCallback, so use that to get an accurate number
					case('crushgrip'):
					case('flail'):
					case('grassknot'):
					case('heatcrash'):
					case('heavyslam'):
					case('lowkick'):
					case('reversal'):
					case('powertrip'):
					case('punishment'):
					case('storedpower'):
					case('trumpcard'):
					case('wringout'):
						bp = move.basePowerCallback(this, target);
					//VP moves which return default values because they require information the player can't see
					case('fling'): //Held item. I lied, Glyphic Spell also shows items, so it will accurately predict the power in that case
						if(seeItem){
							const item = this.getItem();
							bp = (item.fling) ? item.fling.basePower : 0;
						} else {
							bp = 20; //This value is the most-used
						}
						break;
					case('naturalgift'): //Held item
						if(seeItem){
							const item = this.getItem();
							bp = (item.naturalGift) ? item.naturalGift.basePower : 0;
						} else {
							bp = 70;
						}
						break;
					case('frustration'): //Happiness
						bp = 102;
						break;
					case('return'): //Happiness
						bp = 60;
						break;
					case('electroball'): //Speed
					case('gyroball'):
						bp = 80;
						break;
					//Counter, Mirror Coat, Metal Burst, Rebound are damage reflectors, and Equalizer needs the foe's max HP. Uses default value from original Forewarn
					default:
						bp = 120;
						direct = true;
					}
				}
				if(!direct){ //Further calculations
					//STAB
					if(move.onModifyType) this.battle.singleEvent('ModifyType', move, null, this, target);
					bp *= target.hasType(move.type) ? 1.5 : 1;
					bp *= (move.twoType && target.hasType(move.twoType)) ? 1.5 : 1;
					//Type effectiveness
					bp *= Math.pow(2, this.battle.dex.getEffectiveness(move, target));
					if (move.multihit){
						if(Array.isArray(move.multihit)){ //Move has variable hits
							bp *= move.multihit[1]; //Assumes maximum value
						} else {
							bp *= move.multihit;
						}
					}
				}
				if(!target.runImmunity(move.type) || (move.twoType && !target.runImmunity(move.twoType))) bp = 0;
				//console.log(move.name + "'s base power is " + bp);
				if(bp >= bestBP){
					if(bp === bestBP && strongestMove){ //Multiple equally valid choices, use both
						strongestMove.push([this.fullname, move.id]);
						//console.log("Adding to Forewarn list. " + strongestMove);
					} else {
						strongestMove = [[this.fullname, move.id]];
						//console.log("Overriding Forewarn list. " + strongestMove);
					}
					bestBP = bp;
				}
			}
			return strongestMove;
		},
		getWorstStat(unboosted?: boolean, unmodified?: boolean): StatIDExceptHP { //New function used for Acupressure/Starf Berry
			let statName: StatIDExceptHP = 'atk';
			let bestStat = 3000;
			const stats: StatIDExceptHP[] = ['atk', 'def', 'spa', 'spd', 'spe'];
			for (const i of stats) {
				if (this.getStat(i, unboosted, unmodified) < bestStat) {
					statName = i;
					bestStat = this.getStat(i, unboosted, unmodified);
				}
			}

			return statName;
		},
		setType(newType: string | string[], enforce = false) { //Stasis, Soak and friends can give Arceus/Silvally secondary types
			// First type of Arceus, Silvally cannot be normally changed
			if(this.volatiles['stasis']) return false;
			if (!enforce) {
				if (this.species.num === 493 || this.species.num === 773) {
					return false;
				}
			}

			if (!newType) throw new Error("Must pass type to setType");
			this.types = (typeof newType === 'string' ? [newType] : newType);
			this.addedType = '';
			this.knownType = true;
			this.apparentType = this.types.join('/');

			return true;
		},
		getTypes(excludeAdded?: boolean): string[] { //Roost allows complete typelessness. Also, added types no longer exist.
			const types = this.battle.runEvent('Type', this, null, null, this.types);
			if (types.length) return types;
			return '???';
		},
		isGrounded(negateImmunity = false, smackDownCheck = false) { //Has additional conditions. See also canFloat() below
			if (!this.canFloat()) return true;
			if (this.volatiles['roost'] || this.volatiles['dig'] || this.volatiles['dive']) return true;
			if (this.volatiles['magnetrise'] || this.volatiles['risingchorus'] || this.volatiles['telekinesis']) return false;
			if (!smackDownCheck && this.volatiles['smackdown']) return true; //Smack Down checks this to see if it should stay applied, so this fixes it seeing itself and saying no
			if (!negateImmunity && this.hasType('Flying')) return false; // ???/Flying from Burn Up is no longer typeless.
			if (this.hasAbility('levitate') && !this.battle.suppressingAbility(this)) return false;
			const item = (this.ignoringItem() ? '' : this.item);
			return item !== 'airballoon';
		},
		canFloat(){ //New method. Not all effects that ground a Pokemon force it to stay grounded. Pokemon immune to Telekinesis are now immune to all floating.
			if (['Burrorm', 'Burryrm', 'Colossoil', 'Diglett', 'Dorsoil', 'Dugtrio', 'Palossand', 'Sandygast', 'Wiglett', 'Wugtrio'].includes(this.baseSpecies.baseSpecies)){
				//this.battle.hint("The Burrorm, Diglett, Sandygast, and Wiglett families are unable to float.");
				return false;
			}
			if (this.hasAbility('suctioncups') || this.hasAbility('heavymetal')) return false;
			if ('gravity' in this.battle.field.pseudoWeather) return false;
			if (this.volatiles['ingrain']) return false;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return false;
			return true;
		},
		getMoveRequestData() { //Disable Mega Evolve/Ultra Burst button if Magic Room suppresses
			let lockedMove = this.getLockedMove();
			let magicRoom = 'magicroom' in this.battle.field.pseudoWeather;

			// Information should be restricted for the last active Pokémon
			const isLastActive = this.isLastActive();
			const canSwitchIn = this.battle.canSwitch(this.side) > 0;
			let moves = this.getMoves(lockedMove, isLastActive);

			if (!moves.length) {
				moves = [{move: 'Struggle', id: 'struggle', target: 'randomNormal', disabled: false}];
				lockedMove = 'struggle';
			}

			const data: {
				moves: {move: string, id: string, target?: string, disabled?: string | boolean}[],
				maybeDisabled?: boolean,
				trapped?: boolean,
				canMegaEvo?: boolean,
				canUltraBurst?: boolean,
				canZMove?: AnyObject | null,
				canDynamax?: boolean,
				maxMoves?: DynamaxOptions,
			} = {
				moves,
			};

			if (isLastActive) {
				if (this.maybeDisabled) {
					data.maybeDisabled = true;
				}
				if (canSwitchIn) {
					if (this.trapped === true) {
						data.trapped = true;
					}
				}
			} else if (canSwitchIn) {
				// Discovered by selecting a valid Pokémon as a switch target and cancelling.
				if (this.trapped) data.trapped = true;
			}

			if (!lockedMove) {
				if (this.canMegaEvo && !magicRoom) data.canMegaEvo = true;
				if (this.canUltraBurst && !magicRoom) data.canUltraBurst = true;
			}

			return data;
		},
		cureStatus(silent = false) { //Adds a runEvent to the cure for effects (namely, Stasis) that prevent it.
			if (!this.hp || !this.status) return false;
			const result: boolean = this.battle.runEvent('RemoveStatus', this, null, null, this.status);
			if (!result) {
				this.battle.debug('cure status [' + status.id + '] interrupted');
				return result;
			}
			this.battle.add('-curestatus', this, this.status, silent ? '[silent]' : '[msg]');
			if (this.status === 'slp' && !this.hasAbility('comatose') && this.removeVolatile('nightmare')) {
				this.battle.add('-end', this, 'Nightmare', '[silent]');
			}
			this.setStatus('');
			return true;
		},
		clearStatus() {
			if (!this.hp || !this.status) return false;
			const result: boolean = this.battle.runEvent('RemoveStatus', this, null, null, this.status);
			if (!result) {
				this.battle.debug('cure status [' + status.id + '] interrupted');
				return result;
			}
			if (this.status === 'slp' && this.removeVolatile('nightmare')) {
				this.battle.add('-end', this, 'Nightmare', '[silent]');
			}
			this.setStatus('');
			return true;
		},
		trySetStatus( //Actually uses ignoreImmunities option for Corrosion and Mycelium Might on moves.
		  status: string | Condition, source: Pokemon | null = null, sourceEffect: Effect | null = null) {
			/*status = this.battle.dex.conditions.get(status); //I would like to clean this up if the cases I'm preparing for with this code don't actually exist
			if(!(source?.ignoringAbility()) && source?.hasAbility('potency') && (status.id === 'psn')) status = this.battle.dex.conditions.get('tox');
			console.log("Trying to set " + status.name + " from " + source.name + "'s " + sourceEffect);
			const canIgnore = sourceEffect?.ignoreImmunity;
			console.log("canIgnore = " + canIgnore);
			const ignoreImmunities = (!source || source !== this) && canIgnore && (canIgnore === true || canIgnore[status.id]);
			console.log("ignoreImmunities = " + ignoreImmunities);*/
			let ignoreImmunities = false;
			if(source && source !== this && !source.ignoringAbility()){
				if(source.hasAbility('myceliummight')) ignoreImmunities = true;
				if(source.hasAbility('corrosion') && ['tox','psn'].includes(status.id || status)) ignoreImmunities = true;
			}
			return this.setStatus(this.status || status, source, sourceEffect, ignoreImmunities);
		},
		setStatus( //Simplifies immunity check per above, which also means Corrosion doesn't affect Toxic Orb on self.
			status: string | Condition,
			source: Pokemon | null = null,
			sourceEffect: Effect | null = null,
			ignoreImmunities: boolean = false,
		) {
			if (!this.hp) return false;
			status = this.battle.dex.conditions.get(status);
			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			if (this.status === status.id) {
				if ((sourceEffect as Move)?.status === this.status) {
					this.battle.add('-fail', this, this.status);
				} else if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
				}
				return false;
			}

			if (!ignoreImmunities && status.id) {
				if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
					this.battle.debug('immune to status');
					if ((sourceEffect as Move)?.status) {
						this.battle.add('-immune', this);
					}
					return false;
				}
			}
			const prevStatus = this.status;
			const prevStatusState = this.statusState;
			if (status.id) {
				const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
				if (!result) {
					this.battle.debug('set status [' + status.id + '] interrupted');
					return result;
				}
			}

			this.status = status.id;
			this.statusState = {id: status.id, target: this};
			if (source) this.statusState.source = source;
			if (status.duration) this.statusState.duration = status.duration;
			if (status.durationCallback) {
				this.statusState.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			}

			if (status.id && !this.battle.singleEvent('Start', status, this.statusState, this, source, sourceEffect)) {
				this.battle.debug('status start [' + status.id + '] interrupted');
				// cancel the setstatus
				this.status = prevStatus;
				this.statusState = prevStatusState;
				return false;
			}
			if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
				return false;
			}
			return true;
		},
		addVolatile( //Mycelium Might immunity
			status: string | Condition, source: Pokemon | null = null, sourceEffect: Effect | null = null,
			linkedStatus: string | Condition | null = null
		): boolean | any {
			let result;
			status = this.battle.dex.conditions.get(status);
			if (!this.hp && !status.affectsFainted) return false;
			if (linkedStatus && source && !source.hp) return false;
			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			if (this.volatiles[status.id]) {
				if (!status.onRestart) return false;
				return this.battle.singleEvent('Restart', status, this.volatiles[status.id], this, source, sourceEffect);
			}
			if (!(source && !source.ignoringAbility() && source.hasAbility('myceliummight')) && !this.runStatusImmunity(status.id)) {
				this.battle.debug('immune to volatile status');
				if ((sourceEffect as Move)?.status) {
					this.battle.add('-immune', this);
				}
				return false;
			}
			result = this.battle.runEvent('TryAddVolatile', this, source, sourceEffect, status);
			if (!result) {
				this.battle.debug('add volatile [' + status.id + '] interrupted');
				return result;
			}
			this.volatiles[status.id] = {id: status.id};
			this.volatiles[status.id].target = this;
			if (source) {
				this.volatiles[status.id].source = source;
				this.volatiles[status.id].sourcePosition = source.position;
			}
			if (sourceEffect) this.volatiles[status.id].sourceEffect = sourceEffect;
			if (status.duration) this.volatiles[status.id].duration = status.duration;
			if (status.durationCallback) {
				this.volatiles[status.id].duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			}
			result = this.battle.singleEvent('Start', status, this.volatiles[status.id], this, source, sourceEffect);
			if (!result) {
				// cancel
				delete this.volatiles[status.id];
				return result;
			}
			if (linkedStatus && source) {
				if (!source.volatiles[linkedStatus.toString()]) {
					source.addVolatile(linkedStatus, this, sourceEffect);
					source.volatiles[linkedStatus.toString()].linkedPokemon = [this];
					source.volatiles[linkedStatus.toString()].linkedStatus = status;
				} else {
					source.volatiles[linkedStatus.toString()].linkedPokemon.push(this);
				}
				this.volatiles[status.toString()].linkedPokemon = [source];
				this.volatiles[status.toString()].linkedStatus = linkedStatus;
			}
			return true;
		},
		removeVolatile(status: string | Effect) { //Adds a runEvent to the removal for effects (namely, Stasis) that prevent it.
			if (!this.hp) return false;
			status = this.battle.dex.conditions.get(status) as Effect;
			if (!this.volatiles[status.id]) return false;
			if(this.volatiles['stasis']?.affectedStatuses.includes(status.id)){ //Can't get the RemoveVolatile event to fail, so I'm hardcoding it beforehand
				this.battle.debug('remove volatile [' + status.id + '] interrupted');
				return false;
			}
			const result: boolean = this.battle.singleEvent('TryRemoveVolatile', this, null, null, this.status);
			if(!result){
				this.battle.debug('remove volatile [' + status.id + '] interrupted');
				return false;
			}
			this.battle.singleEvent('End', status, this.volatiles[status.id], this);
			const linkedPokemon = this.volatiles[status.id].linkedPokemon;
			const linkedStatus = this.volatiles[status.id].linkedStatus;
			delete this.volatiles[status.id];
			if (linkedPokemon) {
				this.removeLinkedVolatiles(linkedStatus, linkedPokemon);
			}
			return true;
		},
		ignoringAbility() { //Glyphic Spell's Negate
			// Check if any active pokemon have the ability Neutralizing Gas (MODDED: or Glyphic Spell's Negate)
			let neutralizinggas = false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if ((pokemon.ability === 'neutralizinggas' || (pokemon.ability === 'glyphicspell' && pokemon.abilityState.unownType === 'N')) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.abilityState.ending) {
					neutralizinggas = true;
					break;
				}
			}

			return !!(
				!this.isActive ||
				((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID) && !(this.ability === ('glyphicspell' as ID) && this.abilityState.unownType === 'N'))) &&
				!this.getAbility().isPermanent
				)
			);
		},
		formeChange( //Power Trick
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
			if (isPermanent) {
				this.baseSpecies = rawSpecies;
				this.details = species.name + (this.level === 100 ? '' : ', L' + this.level) +
					(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
				this.battle.add('detailschange', this, (this.illusion || this).details);
				if (source.effectType === 'Item') {
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.onPrimal) {
						if (this.illusion) {
							this.ability = '';
							this.battle.add('-primal', this.illusion);
						} else {
							this.battle.add('-primal', this);
						}
					} else {
						this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
					}
				} else if (source.effectType === 'Status') {
					// Shaymin-Sky -> Shaymin
					this.battle.add('-formechange', this, species.name, message);
				}
			} else {
				if (source.effectType === 'Ability') {
					this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
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
			if(this.volatiles['powertrick']){
				const newatk = this.storedStats.def;
				const newdef = this.storedStats.atk;
				const newspa = this.storedStats.spd;
				const newspd = this.storedStats.spa;
				this.storedStats.atk = newatk;
				this.storedStats.def = newdef;
				this.storedStats.spa = newspa;
				this.storedStats.spd = newspd;
			}
			return true;
		},
		transformInto(pokemon: Pokemon, effect?: Effect) { //Copy Power Trick, and Glyphic Spell if you're an Unown too
			const species = pokemon.species;
			if (pokemon.fainted || pokemon.illusion || pokemon.volatiles['substitute'] || pokemon.transformed || this.transformed) {
				return false;
			}

			if (!this.setSpecies(species, effect, true)) return false;

			this.transformed = true;
			this.weighthg = pokemon.weighthg;

			const types = pokemon.getTypes(true);
			this.setType(pokemon.volatiles['roost'] ? pokemon.volatiles['roost'].typeWas : types, true);
			this.knownType = this.side === pokemon.side && pokemon.knownType;
			this.apparentType = pokemon.apparentType;

			let statName: StatNameExceptHP;
			for (statName in this.storedStats) {
				this.storedStats[statName] = pokemon.storedStats[statName];
			}
			this.moveSlots = [];
			for (const moveSlot of pokemon.moveSlots) {
				let moveName = moveSlot.move;
				if (moveSlot.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				}
				this.moveSlots.push({
					move: moveName,
					id: moveSlot.id,
					pp: moveSlot.maxpp === 1 ? 1 : 5,
					maxpp: (moveSlot.maxpp === 1 ? 1 : 5),
					target: moveSlot.target,
					disabled: false,
					used: false,
					virtual: true,
				});
			}
			let boostName: BoostName;
			for (boostName in pokemon.boosts) {
				this.boosts[boostName] = pokemon.boosts[boostName]!;
			}
			const volatilesToCopy = ['focusenergy', 'laserfocus', 'powertrick'];
			for (const volatile of volatilesToCopy) {
				if (pokemon.volatiles[volatile]) {
					this.addVolatile(volatile);
				} else {
					this.removeVolatile(volatile);
				}
			}
			if(pokemon.species.baseSpecies === 'Unown' && this.species.baseSpecies === 'Unown' && pokemon.abilityState.unownType){
				this.abilityState.unownType = pokemon.abilityState.unownType;
				delete this.abilityState.formeDecided; //will need to re-assign Copy spell on next switch
			}
			if (effect) {
				this.battle.add('-transform', this, pokemon, '[from] ' + effect.fullname);
			} else {
				this.battle.add('-transform', this, pokemon);
			}
			return true;
		},
	},
	field: {
		suppressingWeather() {
			if('midnight' in this.pseudoWeather) return true;
			for (const side of this.battle.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.ignoringAbility() && pokemon.getAbility().suppressWeather) {
						return true;
					}
				}
			}
			return false;
		},
		suppressingTerrain(){
			if('midnight' in this.pseudoWeather) return true;
			for (const side of this.battle.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.ignoringAbility() && pokemon.getAbility().suppressTerrain) {
						return true;
					}
				}
			}
			return false;
		},
		setTerrain(status: string | Effect, source: Pokemon | 'debug' | null = null, sourceEffect: Effect | null = null) {
			status = this.battle.dex.conditions.get(status);
			if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
			if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
			if (source === 'debug') source = this.battle.sides[0].active[0];
			if (!source) throw new Error(`setting terrain without a source`);
			
			const result = this.battle.runEvent('SetTerrain', source, source, status);
			if (!result) {
				if (result === false) {
					if ((sourceEffect as Move)?.terrain) {
						this.battle.add('-fail', source, sourceEffect, '[from] ' + this.terrain);
					} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
						this.battle.add('-ability', source, sourceEffect, '[from] ' + this.terrain, '[fail]');
					}
				}
				return null;
			}

			if (this.terrain === status.id) return false;
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
			this.battle.eachEvent('TerrainChange', sourceEffect);
			return true;
		},
		effectiveTerrain(target?: Pokemon | Side | Battle) {
			if (this.suppressingTerrain()){
				//console.log("Terrain is suppressed");
				return '';
			}
			if (this.battle.event && !target) target = this.battle.event.target;
			return this.battle.runEvent('TryTerrain', target) ? this.terrain : '';
		},
	},
	side: {
		randomActive() { //Play Dead/Commander exclusion
			const actives = this.active.filter(active => active && active.isValidTarget());
			if (!actives.length) return null;
			return this.battle.sample(actives);
		},
		chooseSwitch(slotText?: string) { //totalFainted matches actual fainted and lowers on revival
			if (this.requestState !== 'move' && this.requestState !== 'switch') {
				return this.emitChoiceError(`Can't switch: You need a ${this.requestState} response`);
			}
			const index = this.getChoiceIndex();
			if (index >= this.active.length) {
				if (this.requestState === 'switch') {
					return this.emitChoiceError(`Can't switch: You sent more switches than Pokémon that need to switch`);
				}
				return this.emitChoiceError(`Can't switch: You sent more choices than unfainted Pokémon`);
			}
			const pokemon = this.active[index];
			let slot;
			if (!slotText) {
				if (this.requestState !== 'switch') {
					return this.emitChoiceError(`Can't switch: You need to select a Pokémon to switch in`);
				}
				if (this.slotConditions[pokemon.position]['revivalblessing']) {
					slot = 0;
					while (!this.pokemon[slot].fainted) slot++;
				} else {
					if (!this.choice.forcedSwitchesLeft) return this.choosePass();
					slot = this.active.length;
					while (this.choice.switchIns.has(slot) || this.pokemon[slot].fainted) slot++;
				}
			} else {
				slot = parseInt(slotText!) - 1;
			}
			if (isNaN(slot) || slot < 0) {
				// maybe it's a name/species id!
				slot = -1;
				for (const [i, mon] of this.pokemon.entries()) {
					if (slotText!.toLowerCase() === mon.name.toLowerCase() || toID(slotText) === mon.species.id) {
						slot = i;
						break;
					}
				}
				if (slot < 0) {
					return this.emitChoiceError(`Can't switch: You do not have a Pokémon named "${slotText}" to switch to`);
				}
			}
			if (slot >= this.pokemon.length) {
				return this.emitChoiceError(`Can't switch: You do not have a Pokémon in slot ${slot + 1} to switch to`);
			} else if (slot < this.active.length && !this.slotConditions[pokemon.position]['revivalblessing']) {
				return this.emitChoiceError(`Can't switch: You can't switch to an active Pokémon`);
			} else if (this.choice.switchIns.has(slot)) {
				return this.emitChoiceError(`Can't switch: The Pokémon in slot ${slot + 1} can only switch in once`);
			}
			const targetPokemon = this.pokemon[slot];

			if (this.slotConditions[pokemon.position]['revivalblessing']) {
				if (!targetPokemon.fainted) {
					return this.emitChoiceError(`Can't switch: You have to pass to a fainted Pokémon`);
				}
				// Should always subtract, but stop at 0 to prevent errors.
				this.choice.forcedSwitchesLeft = this.battle.clampIntRange(this.choice.forcedSwitchesLeft - 1, 0);
				this.totalFainted = this.battle.clampIntRange(this.totalFainted - 1, 0);
				pokemon.switchFlag = false;
				this.choice.actions.push({
					choice: 'revivalblessing',
					pokemon,
					target: targetPokemon,
				} as ChosenAction);
				return true;
			}

			if (targetPokemon.fainted) {
				return this.emitChoiceError(`Can't switch: You can't switch to a fainted Pokémon`);
			}

			if (this.requestState === 'move') {
				if (pokemon.trapped) {
					const includeRequest = this.updateRequestForPokemon(pokemon, req => {
						let updated = false;
						if (!req.trapped) {
							req.trapped = true;
							updated = true;
						}
						return updated;
					});
					const status = this.emitChoiceError(`Can't switch: The active Pokémon is trapped`, includeRequest);
					if (includeRequest) this.emitRequest(this.activeRequest!);
					return status;
				}
			} else if (this.requestState === 'switch') {
				if (!this.choice.forcedSwitchesLeft) {
					throw new Error(`Player somehow switched too many Pokemon`);
				}
				this.choice.forcedSwitchesLeft--;
			}

			this.choice.switchIns.add(slot);

			this.choice.actions.push({
				choice: (this.requestState === 'switch' ? 'instaswitch' : 'switch'),
				pokemon,
				target: targetPokemon,
			} as ChosenAction);

			return true;
		}
	},
	//battle: {
		validTargetLoc(targetLoc: number, source: Pokemon, targetType: string) { //Tactician and ally or self targeting
			if (targetLoc === 0) return true;
			const numSlots = this.activePerHalf;
			const sourceLoc = source.getLocOf(source);
			if (Math.abs(targetLoc) > numSlots) return false;
			const isSelf = (sourceLoc === targetLoc);
			const isFoe = (this.gameType === 'freeforall' ? !isSelf : targetLoc > 0);
			const acrossFromTargetLoc = -(numSlots + 1 - targetLoc);
			const isAdjacent = (targetLoc > 0 ?
				Math.abs(acrossFromTargetLoc - sourceLoc) <= 1 :
				Math.abs(targetLoc - sourceLoc) === 1);
			const canTargetAny = source.tacticianBoosted;

			if (this.gameType === 'freeforall' && targetType === 'adjacentAlly') {
				// moves targeting one ally can instead target foes in Battle Royal
				return isAdjacent;
			}

			switch (targetType) {
			case 'randomNormal':
			case 'scripted':
			case 'normal':
				return canTargetAny || isAdjacent;
			case 'adjacentAlly':
				return (canTargetAny || isAdjacent) && !isFoe;
			case 'adjacentAllyOrSelf':
				return (canTargetAny || isAdjacent) && !isFoe || isSelf;
			case 'anyAlly':
				return !isFoe || isSelf;
			case 'adjacentFoe':
				return (canTargetAny || isAdjacent) && isFoe;
			case 'any':
				return !isSelf;
			}
			return false;
		},
		getTarget(pokemon: Pokemon, move: string | Move, targetLoc: number, originalTarget?: Pokemon) {
			move = this.dex.moves.get(move);

			let tracksTarget = move.tracksTarget;
			// Stalwart sets trackTarget in ModifyMove, but ModifyMove happens after getTarget, so
			// we need to manually check for Stalwart here
			if (pokemon.hasAbility(['stalwart', 'propellertail'])) tracksTarget = true;
			if (tracksTarget && originalTarget && originalTarget.isActive && originalTarget.isValidTarget()) {
				// smart-tracking move's original target is on the field: target it
				return originalTarget;
			}

			// banning Dragon Darts from directly targeting itself is done in side.ts, but
			// Dragon Darts can target itself if Ally Switch is used afterwards
			if (move.smartTarget) {
				const curTarget = pokemon.getAtLoc(targetLoc);
				return curTarget && curTarget.isValidTarget() ? curTarget : this.getRandomTarget(pokemon, move);
			}

			// Fails if the target is the user and the move can't target its own position
			const selfLoc = pokemon.getLocOf(pokemon);
			if (['adjacentAlly', 'any', 'normal'].includes(move.target) && targetLoc === selfLoc &&
					!pokemon.volatiles['twoturnmove'] && !pokemon.volatiles['rollout']) {
				return move.flags['futuremove'] ? pokemon : null;
			}
			if (move.target !== 'randomNormal' && this.validTargetLoc(targetLoc, pokemon, move.target)) {
				const target = pokemon.getAtLoc(targetLoc);
				if (target?.fainted) {
					if (this.gameType === 'freeforall') {
						// Target is a fainted opponent in a free-for-all battle; attack shouldn't retarget
						return target;
					}
					if (target.isAlly(pokemon)) {
						// Target is a fainted ally: attack shouldn't retarget
						return target;
					}
				}
				if (target && target.isValidTarget()) {
					// Target is unfainted: use selected target location
					return target;
				}

				// Chosen target not valid,
				// retarget randomly with getRandomTarget
			}
			return this.getRandomTarget(pokemon, move);
		},
		getRandomTarget(pokemon: Pokemon, move: string | Move) { //Tactician, Play Dead, and Commander
			// A move was used without a chosen target

			// For instance: Metronome chooses Ice Beam. Since the user didn't
			// choose a target when choosing Metronome, Ice Beam's target must
			// be chosen randomly.

			// The target is chosen randomly from possible targets, EXCEPT that
			// moves that can target either allies or foes will only target foes
			// when used without an explicit target.

			move = this.dex.moves.get(move);
			if (move.target === 'adjacentAlly') {
				const allyActives = pokemon.side.active;
				let adjacentAllies = [allyActives[pokemon.position - 1], allyActives[pokemon.position + 1]];
				adjacentAllies = adjacentAllies.filter(active => active && !active.fainted);
				return adjacentAllies.length ? this.sample(adjacentAllies) : null;
			}
			if (['self','adjacentAllyOrSelf','anyAlly','all','allySide','allyTeam'].includes(move.target)) {
				return pokemon;
			}
			if (pokemon.side.active.length > 2) {
				if (!pokemon.tacticianBoosted && (move.target === 'adjacentFoe' || move.target === 'normal' || move.target === 'randomNormal')) {
					// even if a move can target an ally, auto-resolution will never make it target an ally
					// i.e. if both your opponents faint before you use Flamethrower, it will fail instead of targeting your ally
					const foeActives = pokemon.side.foe.active;
					const frontPosition = foeActives.length - 1 - pokemon.position;
					let adjacentFoes = foeActives.slice(frontPosition < 1 ? 0 : frontPosition - 1, frontPosition + 2);
					adjacentFoes = adjacentFoes.filter(active => active && active.isValidTarget());
					if (adjacentFoes.length) return this.sample(adjacentFoes);
					// no valid target at all, return a foe for any possible redirection
					return foeActives[frontPosition];
				}
			}
			if(pokemon.side.foe.active.length === 1 && pokemon.side.foe.active[0].volatiles['playdead']) return null; //Ran out of retarget checks, except for randomActive() which will get nothing in Singles
			return pokemon.side.foe.randomActive() || pokemon.side.foe.active[0];
		},
		modifyDamage( //Tactician, Dual-type STAB, Terrain check, removal of P-Bond hardcode
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

			baseDamage += 2;

			// multi-target modifier (doubles only)
			if (move.spreadHit && !pokemon.tacticianBoosted) {
				const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
				this.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.modify(baseDamage, spreadModifier);
			}

			// field modifier
			baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);
			baseDamage = this.runEvent('TerrainModifyDamage', pokemon, target, move, baseDamage);

			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || 1.5));
			}

			// random factor - also not a modifier
			baseDamage = this.randomizer(baseDamage);

			// STAB
			if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
				baseDamage = this.modify(baseDamage, move.stab || 1.5);
			}
			if (move.twoType && pokemon.hasType(move.twoType)) {
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
				if (move.id !== 'facade') {
					baseDamage = this.modify(baseDamage, 0.5);
				}
			}

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			if (!baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		},
		singleEvent(
			eventid: string, effect: Effect, state: AnyObject | null,
			target: string | Pokemon | Side | Field | Battle | null, source?: string | Pokemon | Effect | false | null,
			sourceEffect?: Effect | string | null, relayVar?: any, customCallback?: unknown
		) {
			if (this.eventDepth >= 8) {
				// oh fuck
				this.add('message', 'STACK LIMIT EXCEEDED');
				this.add('message', 'PLEASE REPORT IN BUG THREAD');
				this.add('message', 'Event: ' + eventid);
				this.add('message', 'Parent event: ' + this.event.id);
				throw new Error("Stack overflow");
			}
			if (this.log.length - this.sentLogPos > 1000) {
				this.add('message', 'LINE LIMIT EXCEEDED');
				this.add('message', 'PLEASE REPORT IN BUG THREAD');
				this.add('message', 'Event: ' + eventid);
				this.add('message', 'Parent event: ' + this.event.id);
				throw new Error("Infinite loop");
			}
			// this.add('Event: ' + eventid + ' (depth ' + this.eventDepth + ')');
			let hasRelayVar = true;
			if (relayVar === undefined) {
				relayVar = true;
				hasRelayVar = false;
			}

			if (effect.effectType === 'Status' && (target instanceof Pokemon) && target.status !== effect.id) {
				// it's changed; call it off
				return relayVar;
			}
			if (eventid !== 'Start' && eventid !== 'TakeItem' && eventid !== 'Primal' &&
				effect.effectType === 'Item' && (target instanceof Pokemon) && target.ignoringItem()) {
				this.debug(eventid + ' handler suppressed by Klutz or Magic Room');
				return relayVar;
			}
			if (eventid !== 'End' && effect.effectType === 'Ability' && (target instanceof Pokemon) && target.ignoringAbility()) {
				this.debug(eventid + ' handler suppressed by Gastro Acid or Neutralizing Gas');
				return relayVar;
			}
			if (
				effect.effectType === 'Weather' && eventid !== 'FieldStart' && eventid !== 'FieldResidual' &&
				eventid !== 'FieldEnd' && this.field.suppressingWeather()
			) {
				this.debug(eventid + ' handler suppressed by Cloud Nine or Midnight');
				return relayVar;
			}
			if (
				(effect.effectType === 'Terrain' || eventid === 'Terrain') && eventid !== 'FieldStart' && eventid !== 'FieldResidual' &&
				eventid !== 'FieldEnd' && this.field.suppressingTerrain()
			) {
				this.debug(eventid + ' handler suppressed by Climate Break or Midnight');
				return relayVar;
			}

			const callback = customCallback || (effect as any)[`on${eventid}`];
			if (callback === undefined) return relayVar;

			const parentEffect = this.effect;
			const parentEffectState = this.effectState;
			const parentEvent = this.event;

			this.effect = effect;
			this.effectState = state || {};
			this.event = {id: eventid, target, source, effect: sourceEffect};
			this.eventDepth++;

			const args = [target, source, sourceEffect];
			if (hasRelayVar) args.unshift(relayVar);

			let returnVal;
			if (typeof callback === 'function') {
				returnVal = callback.apply(this, args);
			} else {
				returnVal = callback;
			}

			this.eventDepth--;
			this.effect = parentEffect;
			this.effectState = parentEffectState;
			this.event = parentEvent;

			return returnVal === undefined ? relayVar : returnVal;
		},
		runEvent(
			eventid: string, target?: Pokemon | Pokemon[] | Side | Battle | null, source?: string | Pokemon | false | null,
			sourceEffect?: Effect | null, relayVar?: any, onEffect?: boolean, fastExit?: boolean
		) {
			// if (Battle.eventCounter) {
			// 	if (!Battle.eventCounter[eventid]) Battle.eventCounter[eventid] = 0;
			// 	Battle.eventCounter[eventid]++;
			// }
			if (this.eventDepth >= 8) {
				// oh fuck
				this.add('message', 'STACK LIMIT EXCEEDED');
				this.add('message', 'PLEASE REPORT IN BUG THREAD');
				this.add('message', 'Event: ' + eventid);
				this.add('message', 'Parent event: ' + this.event.id);
				throw new Error("Stack overflow");
			}
			if (!target) target = this;
			let effectSource = null;
			if (source instanceof Pokemon) effectSource = source;
			const handlers = this.findEventHandlers(target, eventid, effectSource);
			if (onEffect) {
				if (!sourceEffect) throw new Error("onEffect passed without an effect");
				// @ts-ignore - dynamic lookup
				const callback = sourceEffect[`on${eventid}`];
				if (callback !== undefined) {
					if (Array.isArray(target)) throw new Error("");
					handlers.unshift(this.resolvePriority({
						effect: sourceEffect, callback, state: {}, end: null, effectHolder: target,
					}, `on${eventid}`));
				}
			}

			if (['Invulnerability', 'TryHit', 'DamagingHit', 'EntryHazard'].includes(eventid)) {
				handlers.sort(Battle.compareLeftToRightOrder);
			} else if (fastExit) {
				handlers.sort(Battle.compareRedirectOrder);
			} else {
				this.speedSort(handlers);
			}
			let hasRelayVar = 1;
			const args = [target, source, sourceEffect];
			// console.log('Event: ' + eventid + ' (depth ' + this.eventDepth + ') t:' + target.id + ' s:' + (!source || source.id) + ' e:' + effect.id);
			if (relayVar === undefined || relayVar === null) {
				relayVar = true;
				hasRelayVar = 0;
			} else {
				args.unshift(relayVar);
			}

			const parentEvent = this.event;
			this.event = {id: eventid, target, source, effect: sourceEffect, modifier: 1};
			this.eventDepth++;

			let targetRelayVars = [];
			if (Array.isArray(target)) {
				if (Array.isArray(relayVar)) {
					targetRelayVars = relayVar;
				} else {
					for (let i = 0; i < target.length; i++) targetRelayVars[i] = true;
				}
			}
			for (const handler of handlers) {
				if (handler.index !== undefined) {
					// TODO: find a better way to do this
					if (!targetRelayVars[handler.index] && !(targetRelayVars[handler.index] === 0 &&
						eventid === 'DamagingHit')) continue;
					if (handler.target) {
						args[hasRelayVar] = handler.target;
						this.event.target = handler.target;
					}
					if (hasRelayVar) args[0] = targetRelayVars[handler.index];
				}
				const effect = handler.effect;
				const effectHolder = handler.effectHolder;
				// this.debug('match ' + eventid + ': ' + status.id + ' ' + status.effectType);
				if (effect.effectType === 'Status' && (effectHolder as Pokemon).status !== effect.id) {
					// it's changed; call it off
					continue;
				}
				if (effect.effectType === 'Ability' && effect.isBreakable !== false &&
					this.suppressingAbility(effectHolder as Pokemon)) {
					if (effect.isBreakable) {
						this.debug(eventid + ' handler suppressed by Mold Breaker');
						continue;
					}
					if (!effect.num) {
						// ignore attacking events for custom abilities
						const AttackingEvents = {
							BeforeMove: 1,
							BasePower: 1,
							Immunity: 1,
							RedirectTarget: 1,
							Heal: 1,
							SetStatus: 1,
							CriticalHit: 1,
							ModifyAtk: 1, ModifyDef: 1, ModifySpA: 1, ModifySpD: 1, ModifySpe: 1, ModifyAccuracy: 1,
							ModifyBoost: 1,
							ModifyDamage: 1,
							ModifySecondaries: 1,
							ModifyWeight: 1,
							TryAddVolatile: 1,
							TryHit: 1,
							TryHitSide: 1,
							TryMove: 1,
							Boost: 1,
							DragOut: 1,
							Effectiveness: 1,
						};
						if (eventid in AttackingEvents) {
							this.debug(eventid + ' handler suppressed by Mold Breaker');
							continue;
						} else if (eventid === 'Damage' && sourceEffect && sourceEffect.effectType === 'Move') {
							this.debug(eventid + ' handler suppressed by Mold Breaker');
							continue;
						}
					}
				}
				if (eventid !== 'Start' && eventid !== 'SwitchIn' && eventid !== 'TakeItem' &&
					effect.effectType === 'Item' && (effectHolder instanceof Pokemon) && effectHolder.ignoringItem()) {
					if (eventid !== 'Update') {
						this.debug(eventid + ' handler suppressed by Klutz or Magic Room');
					}
					continue;
				} else if (eventid !== 'End' && effect.effectType === 'Ability' &&
						(effectHolder instanceof Pokemon) && effectHolder.ignoringAbility()) {
					if (eventid !== 'Update') {
						this.debug(eventid + ' handler suppressed by Gastro Acid or Neutralizing Gas');
					}
					continue;
				}
				if ((effect.effectType === 'Weather' || eventid === 'Weather') &&
					eventid !== 'Residual' && eventid !== 'End' && this.field.suppressingWeather()) {
					this.debug(eventid + ' handler suppressed by Cloud Nine or Midnight');
					continue;
				}
				if ((effect.effectType === 'Terrain' || eventid === 'Terrain') &&
					eventid !== 'Residual' && eventid !== 'End' && this.field.suppressingTerrain()) {
					this.debug(eventid + ' handler suppressed by Climate Break or Midnight');
					continue;
				}
				let returnVal;
				if (typeof handler.callback === 'function') {
					const parentEffect = this.effect;
					const parentEffectState = this.effectState;
					this.effect = handler.effect;
					this.effectState = handler.state || {};
					this.effectState.target = effectHolder;

					returnVal = handler.callback.apply(this, args);

					this.effect = parentEffect;
					this.effectState = parentEffectState;
				} else {
					returnVal = handler.callback;
				}

				if (returnVal !== undefined) {
					relayVar = returnVal;
					if (!relayVar || fastExit) {
						if (handler.index !== undefined) {
							targetRelayVars[handler.index] = relayVar;
							if (targetRelayVars.every(val => !val)) break;
						} else {
							break;
						}
					}
					if (hasRelayVar) {
						args[0] = relayVar;
					}
				}
			}

			this.eventDepth--;
			if (typeof relayVar === 'number' && relayVar === Math.abs(Math.floor(relayVar))) {
				// this.debug(eventid + ' modifier: 0x' +
				// 	('0000' + (this.event.modifier * 4096).toString(16)).slice(-4).toUpperCase());
				relayVar = this.modify(relayVar, this.event.modifier);
			}
			this.event = parentEvent;

			return Array.isArray(target) ? targetRelayVars : relayVar;
		},
		residualEvent(eventid: string, relayVar?: any) { //Stasis
			let stasisMons: Pokemon[] = [];
			const callbackName = `on${eventid}`;
			let handlers = this.findBattleEventHandlers(callbackName, 'duration');
			handlers = handlers.concat(this.findFieldEventHandlers(this.field, `onField${eventid}`, 'duration'));
			for (const side of this.sides) {
				if (side.n < 2 || !side.allySide) {
					handlers = handlers.concat(this.findSideEventHandlers(side, `onSide${eventid}`, 'duration'));
				}
				for (const active of side.active) {
					if (!active) continue;
					if(active.volatiles['stasis']){
						stasisMons.push(active);
					}
					handlers = handlers.concat(this.findPokemonEventHandlers(active, callbackName, 'duration'));
					handlers = handlers.concat(this.findSideEventHandlers(side, callbackName, undefined, active));
					handlers = handlers.concat(this.findFieldEventHandlers(this.field, callbackName, undefined, active));
				}
			}
			this.speedSort(handlers);
			while (handlers.length) {
				const handler = handlers[0];
				handlers.shift();
				const effect = handler.effect;
				const pokemon = (handler.effectHolder as Pokemon);
				if (pokemon.fainted) continue;

				let handlerEventid = eventid;
				if ((handler.effectHolder as Side).sideConditions) handlerEventid = `Side${eventid}`;
				if ((handler.effectHolder as Field).pseudoWeather) handlerEventid = `Field${eventid}`;
				if (handler.callback) {
					this.singleEvent(handlerEventid, effect, handler.state, handler.effectHolder, null, null, relayVar, handler.callback);
				}
				if (handler.end && handler.state && handler.state.duration) {
					if(stasisMons.includes(pokemon)){
						if(pokemon.volatiles['stasis']?.affectedStatuses.includes(effect.id)){
							continue;
						}
					}
					handler.state.duration--;
					if (!handler.state.duration) {
						const endCallArgs = handler.endCallArgs || [handler.effectHolder, effect.id];
						handler.end.call(...endCallArgs as [any, ...any[]]);
						if (this.ended) return;
						continue;
					}
				}

				this.faintMessages();
				if (this.ended) return;
			}
		},
		nextTurn() { //Stat change tracking now per Mon's turn 
			this.turn++;
			this.lastSuccessfulMoveThisTurn = null;

			const trappedBySide: boolean[] = [];
			const stalenessBySide: ('internal' | 'external' | undefined)[] = [];
			for (const side of this.sides) {
				let sideTrapped = true;
				let sideStaleness: 'internal' | 'external' | undefined;
				for (const pokemon of side.active) {
					if (!pokemon) continue;
					pokemon.moveThisTurn = '';
					pokemon.newlySwitched = false;
					pokemon.moveLastTurnResult = pokemon.moveThisTurnResult;
					pokemon.moveThisTurnResult = undefined;
					if (this.turn !== 1) {
						pokemon.usedItemThisTurn = false;
						// It shouldn't be possible in a normal battle for a Pokemon to be damaged before turn 1's move selection
						// However, this could be potentially relevant in certain OMs
						pokemon.hurtThisTurn = null;
					}

					pokemon.maybeDisabled = false;
					for (const moveSlot of pokemon.moveSlots) {
						moveSlot.disabled = false;
						moveSlot.disabledSource = '';
					}
					this.runEvent('DisableMove', pokemon);
					for (const moveSlot of pokemon.moveSlots) {
						const activeMove = this.dex.getActiveMove(moveSlot.id);
						this.singleEvent('DisableMove', activeMove, null, pokemon);
						if (activeMove.flags['cantusetwice'] && pokemon.lastMove?.id === moveSlot.id) {
							pokemon.disableMove(pokemon.lastMove.id);
						}
					}

					// If it was an illusion, it's not any more
					if (pokemon.getLastAttackedBy()) pokemon.knownType = true;

					for (let i = pokemon.attackedBy.length - 1; i >= 0; i--) {
						const attack = pokemon.attackedBy[i];
						if (attack.source.isActive) {
							attack.thisTurn = false;
						} else {
							pokemon.attackedBy.splice(pokemon.attackedBy.indexOf(attack), 1);
						}
					}

					const seenPokemon = pokemon.illusion || pokemon;
					const realTypeString = seenPokemon.getTypes(true).join('/');
					if (realTypeString !== seenPokemon.apparentType) {
						this.add('-start', pokemon, 'typechange', realTypeString, '[silent]');
						seenPokemon.apparentType = realTypeString;
						if (pokemon.addedType) {
							// The typechange message removes the added type, so put it back
							this.add('-start', pokemon, 'typeadd', pokemon.addedType, '[silent]');
						}
					}

					pokemon.trapped = false;
					this.runEvent('TrapPokemon', pokemon);
					if (!pokemon.knownType || this.dex.getImmunity('trapped', pokemon)) {
						this.runEvent('MaybeTrapPokemon', pokemon);
					}
					// canceling switches would leak information
					// if a foe might have a trapping ability
					for (const source of pokemon.foes()) {
						const species = (source.illusion || source).species;
						if (!species.abilities) continue;
						for (const abilitySlot in species.abilities) {
							const abilityName = species.abilities[abilitySlot as keyof Species['abilities']];
							if (abilityName === source.ability) {
								// pokemon event was already run above so we don't need
								// to run it again.
								continue;
							}
							const ruleTable = this.ruleTable;
							if ((ruleTable.has('+hackmons') || !ruleTable.has('obtainableabilities')) && !this.format.team) {
								// hackmons format
								continue;
							} else if (abilitySlot === 'H' && species.unreleasedHidden) {
								// unreleased hidden ability
								continue;
							}
							const ability = this.dex.abilities.get(abilityName);
							if (ruleTable.has('-ability:' + ability.id)) continue;
							if (pokemon.knownType && !this.dex.getImmunity('trapped', pokemon)) continue;
							this.singleEvent('FoeMaybeTrapPokemon', ability, {}, pokemon, source);
						}
					}

					if (pokemon.fainted) continue;

					sideTrapped = sideTrapped && pokemon.trapped;
					const staleness = pokemon.volatileStaleness || pokemon.staleness;
					if (staleness) sideStaleness = sideStaleness === 'external' ? sideStaleness : staleness;
					pokemon.activeTurns++;
				}
				trappedBySide.push(sideTrapped);
				stalenessBySide.push(sideStaleness);
				side.faintedLastTurn = side.faintedThisTurn;
				side.faintedThisTurn = null;
			}

			if (this.maybeTriggerEndlessBattleClause(trappedBySide, stalenessBySide)) return;

			if (this.gameType === 'triples' && this.sides.every(side => side.pokemonLeft === 1)) {
				// If both sides have one Pokemon left in triples and they are not adjacent, they are both moved to the center.
				const actives = this.getAllActive();
				if (actives.length > 1 && !actives[0].isAdjacent(actives[1])) {
					this.swapPosition(actives[0], 1, '[silent]');
					this.swapPosition(actives[1], 1, '[silent]');
					this.add('-center');
				}
			}

			this.add('turn', this.turn);
			this.makeRequest('move');
		},
		ngasActive() { //Glyphic Spell's Negate
			for (const active of this.getAllActive()) {
				if ((active.ability === 'Neutralizing Gas' || (active.ability === 'glyphicspell' && active.abilityState.unownType === 'N')) && !active.volatiles['gastroacid']) {
					return true;
				}
			}
			return false;
		},
	//},
	actions: {
		maxMoveTable: null,
		zMoveTable: null,
		runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) { //Tactician, Full Collide on 0 PP, Own Tempo Dancer immunity, per-Mon stats change tracking
			pokemon.updateTurnState();
			pokemon.activeMoveActions++;
			pokemon.statsRaisedThisTurn = false;
			// Yes, stats raised and stats lowered are separated - 
			// Alluring Voice will activate if the target raised its own stats, but 
			// Compensation will not activate if the user lowered its own stats

			// Tactician allows targeting non-adjacents in any case
			let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
			let baseMove = this.dex.getActiveMove(moveOrMoveName);
			const pranksterBoosted = baseMove.pranksterBoosted;
			if (baseMove.id !== 'struggle' && !externalMove) {
				const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
				if (changedMove && changedMove !== true) {
					baseMove = this.dex.getActiveMove(changedMove);
					if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
					target = this.getRandomTarget(pokemon, baseMove);
				}
			}
			let move = baseMove;

			move.isExternal = externalMove;

			this.battle.setActiveMove(move, pokemon, target);

			/* if (pokemon.moveThisTurn) {
				// THIS IS PURELY A SANITY CHECK
				// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
				// USE this.queue.cancelMove INSTEAD
				this.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
				this.clearActiveMove(true);
				return;
			} */
			const willTryMove = this.battle.runEvent('BeforeMove', pokemon, target, move);
			if (!willTryMove) {
				this.battle.runEvent('MoveAborted', pokemon, target, move);
				this.battle.clearActiveMove(true);
				// The event 'BeforeMove' could have returned false or null
				// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
				// null indicates the opposite, as the Pokemon didn't have an option to choose anything
				pokemon.moveThisTurnResult = willTryMove;
				return;
			}
			if (move.beforeMoveCallback) {
				if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
					this.battle.clearActiveMove(true);
					pokemon.moveThisTurnResult = false;
					return;
				}
			}
			pokemon.lastDamage = 0;
			let lockedMove;
			if (!externalMove) {
				lockedMove = this.battle.runEvent('LockMove', pokemon);
				if (lockedMove === true) lockedMove = false;
				if (!lockedMove) {
					if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle') && !pokemon.volatiles['nointerrupt']) { //Since natural PP deduction will disable move selection, having FC means it was forced down
						this.add('cant', pokemon, 'nopp', move);
						const gameConsole = [
							null, 'Game Boy', 'Game Boy Color', 'Game Boy Advance', 'DS', 'DS', '3DS', '3DS',
						][this.gen] || 'Switch';
						this.hint(`This is not a bug, this is really how it works on the ${gameConsole}; try it yourself if you don't believe us.`);
						this.battle.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						return;
					}
				} else {
					sourceEffect = this.dex.conditions.get('lockedmove');
				}
				pokemon.moveUsed(move, targetLoc);
			}

			// Dancer Petal Dance hack
			// TODO: implement properly
			const noLock = externalMove && !pokemon.volatiles['lockedmove'];

			const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
			this.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
			if (this.activeMove) move = this.activeMove;
			this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
			this.battle.runEvent('AfterMove', pokemon, target, move);
			pokemon.statsLoweredThisTurn = false;

			// Dancer's activation order is completely different from any other event, so it's handled separately
			if (move.flags['dance'] && moveDidSomething && !move.isExternal) {
				const dancers = [];
				for (const currentPoke of this.battle.getAllActive()) {
					if (pokemon === currentPoke) continue;
					if (currentPoke.hasAbility('dancer') && !currentPoke.isSemiInvulnerable()) {
						dancers.push(currentPoke);
					}
				}
				// Dancer activates in order of lowest speed stat to highest
				// Note that the speed stat used is after any volatile replacements like Speed Swap,
				// but before any multipliers like Agility or Choice Scarf
				// Ties go to whichever Pokemon has had the ability for the least amount of time
				dancers.sort(
					(a, b) => -(b.storedStats['spe'] - a.storedStats['spe']) || b.abilityOrder - a.abilityOrder
				);
				const targetOf1stDance = this.battle.activeTarget!;
				for (const dancer of dancers) {
					if (this.battle.faintMessages()) break;
					if (dancer.fainted) continue;
					this.battle.add('-activate', dancer, 'ability: Dancer');
					const dancersTarget = !targetOf1stDance.isAlly(dancer) && pokemon.isAlly(dancer) ?
						targetOf1stDance :
						pokemon;
					const dancersTargetLoc = dancer.getLocOf(dancersTarget);
					this.runMove(move.id, dancer, dancersTargetLoc, this.dex.abilities.get('dancer'), undefined, true);
				}
			}
			if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
			this.battle.faintMessages();
			this.battle.checkWin();
		},
		useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove, maxMove) { //Curse, Sheer Force post-secondary change, Commander
			if (!sourceEffect && this.battle.effect.id) sourceEffect = this.battle.effect;
			if (sourceEffect && ['instruct', 'custapberry'].includes(sourceEffect.id)) sourceEffect = null;

			let move = this.dex.getActiveMove(moveOrMoveName);
			if (move.id === 'weatherball' && zMove) {
				// Z-Weather Ball only changes types if it's used directly,
				// not if it's called by Z-Sleep Talk or something.
				this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
				if (move.type !== 'Normal') sourceEffect = move;
			}
			if (zMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isZ)) {
				move = this.getActiveZMove(move, pokemon);
			}
			if (maxMove && move.category !== 'Status') {
				// Max move outcome is dependent on the move type after type modifications from ability and the move itself
				this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
				this.battle.runEvent('ModifyType', pokemon, target, move, move);
			}
			if (maxMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isMax)) {
				move = this.getActiveMaxMove(move, pokemon);
			}

			if (this.activeMove) {
				move.priority = this.battle.activeMove.priority;
				if (!move.hasBounced) move.pranksterBoosted = this.battle.activeMove.pranksterBoosted;
			}
			const baseTarget = move.target;
			if (target === undefined) target = this.battle.getRandomTarget(pokemon, move);
			if (move.target === 'self' || move.target === 'allies') {
				target = pokemon;
			}
			if (sourceEffect) {
				move.sourceEffect = sourceEffect.id;
				move.ignoreAbility = false;
			}
			let moveResult = false;

			this.battle.setActiveMove(move, pokemon, target);

			this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
			this.battle.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Target changed in ModifyMove, so we must adjust it here
				// Adjust before the next event so the correct target is passed to the
				// event
				target = pokemon.oppositeFoe();
			}
			move = this.battle.runEvent('ModifyType', pokemon, target, move, move);
			move = this.battle.runEvent('ModifyMove', pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Adjust again
				target = pokemon.oppositeFoe();
			}
			if (!move || pokemon.fainted) {
				return false;
			}

			let attrs = '';

			let movename = move.name;
			if (move.id === 'hiddenpower') movename = 'Hidden Power';
			if (sourceEffect) attrs += `|[from]${sourceEffect.fullname}`;
			this.battle.addMove('move', pokemon, movename, target + attrs);

			if (!target) {
				this.battle.attrLastMove('[notarget]');
				this.battle.add('-fail', pokemon);
				return false;
			}

			const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);
			if (targets.length) {
				target = targets[targets.length - 1]; // in case of redirection
			}

			if (!sourceEffect || sourceEffect.id === 'pursuit') {
				let extraPP = 0;
				for (const source of pressureTargets) {
					const ppDrop = this.battle.runEvent('DeductPP', source, pokemon, move);
					if (ppDrop !== true) {
						extraPP += ppDrop || 0;
					}
				}
				if (extraPP > 0) {
					pokemon.deductPP(move, extraPP);
				}
			}

			if (!this.battle.singleEvent('TryMove', move, null, pokemon, target, move) ||
				!this.battle.runEvent('TryMove', pokemon, target, move)) {
				move.mindBlownRecoil = false;
				return false;
			}

			this.battle.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

			if (move.ignoreImmunity === undefined) {
				move.ignoreImmunity = (move.category === 'Status');
			}

			if (move.selfdestruct === 'always') {
				this.battle.faint(pokemon, pokemon, move);
			}

			let damage: number | false | undefined | '' = false;
			if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
				damage = this.tryMoveHit(target, pokemon, move);
				if (damage === this.battle.NOT_FAIL) pokemon.moveThisTurnResult = null;
				if (damage || damage === 0 || damage === undefined) moveResult = true;
			} else {
				if (!targets.length) {
					this.battle.attrLastMove('[notarget]');
					this.battle.add('-fail', pokemon);
					return false;
				}
				moveResult = this.trySpreadMoveHit(targets, pokemon, move);
			}
			if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
			if (!pokemon.hp) {
				this.battle.faint(pokemon, pokemon, move);
			}

			if (!moveResult) {
				this.battle.singleEvent('MoveFail', move, null, target, pokemon, move);
				return false;
			}

			const originalHp = pokemon.hp;
			this.battle.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.battle.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
			if (pokemon && pokemon !== target && move.category !== 'Status') {
				if (pokemon.hp <= pokemon.maxhp / 2 && originalHp > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', target, pokemon);
				}
			}

			return true;
		},
		hitStepAccuracy(targets, pokemon, move) { //Sheer Cold nerf/Toxic buff revert
			const hitResults = [];
			for (const [i, target] of targets.entries()) {
				this.activeTarget = target;
				// calculate true accuracy
				let accuracy = move.accuracy;
				if (move.ohko) { // bypasses accuracy modifiers
					if (!target.isSemiInvulnerable()) {
						//MODDED: Removed Sheer Cold's accuracy drop
						if (pokemon.level >= target.level && (move.ohko === true || !target.hasType(move.ohko))) {
							accuracy += (pokemon.level - target.level);
						} else {
							this.battle.add('-immune', target, '[ohko]');
							hitResults[i] = false;
							continue;
						}
					}
				} else {
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (accuracy !== true) {
						let boost = 0;
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							boost = this.battle.clampIntRange(boost - boosts['evasion'], -6, 6);
						}
						if (boost > 0) {
							accuracy = this.battle.trunc(accuracy * (3 + boost) / 3);
						} else if (boost < 0) {
							accuracy = this.battle.trunc(accuracy * 3 / (3 - boost));
						}
					}
				}
				if (move.alwaysHit) { //MODDED: Removed Toxic's accuracy bypass on Poison-types
					accuracy = true;
				} else {
					accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
				}
				if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
					if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
						this.battle.boost({spe: 2}, pokemon);
					}
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
		},
		hitStepMoveHitLoop(targets, pokemon, move) { //Sheer Force post-secondary change
			const damage: (number | boolean | undefined)[] = [];
			for (const i of targets.keys()) {
				damage[i] = 0;
			}
			move.totalDamage = 0;
			pokemon.lastDamage = 0;
			let targetHits = move.multihit || 1;
			if (Array.isArray(targetHits)) {
				// yes, it's hardcoded... meh
				if (targetHits[0] === 2 && targetHits[1] === 5) {
					targetHits = this.battle.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
					if (targetHits < 4 && pokemon.hasItem('loadeddice')) {
						targetHits = 5 - this.battle.random(2);
					}
				} else {
					targetHits = this.random(targetHits[0], targetHits[1] + 1);
				}
			}
			if (targetHits === 10 && pokemon.hasItem('loadeddice')) targetHits -= this.battle.random(7);
			targetHits = Math.floor(targetHits);
			let nullDamage = true;
			let moveDamage: (number | boolean | undefined)[];
			// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
			const isSleepUsable = move.sleepUsable || this.dex.moves.get(move.sourceEffect).sleepUsable;

			let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
			let hit: number;
			for (hit = 1; hit <= targetHits; hit++) {
				if (damage.includes(false)) break;
				if (hit > 1 && pokemon.status === 'slp' && !isSleepUsable) break;
				if (targets.every(target => !target || !target.hp)) break;
				move.hit = hit;
				if (move.smartTarget && targets.length > 1) {
					targetsCopy = [targets[hit - 1]];
				} else {
					targetsCopy = targets.slice(0);
				}
				const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
				if (target && typeof move.smartTarget === 'boolean') {
					if (hit > 1) {
						this.battle.addMove('-anim', pokemon, move.name, target);
					} else {
						this.battle.retargetLastMove(target);
					}
				}

				// like this (Triple Kick)
				if (target && move.multiaccuracy && hit > 1) {
					let accuracy = move.accuracy;
					const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
					if (accuracy !== true) {
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							const boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
							if (boost > 0) {
								accuracy *= boostTable[boost];
							} else {
								accuracy /= boostTable[-boost];
							}
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							const boost = this.battle.clampIntRange(boosts['evasion'], -6, 6);
							if (boost > 0) {
								accuracy /= boostTable[boost];
							} else if (boost < 0) {
								accuracy *= boostTable[-boost];
							}
						}
					}
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (!move.alwaysHit) {
						accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
						if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) break;
					}
				}

				const moveData = move;
				if (!moveData.flags) moveData.flags = {};

				// Modifies targetsCopy (which is why it's a copy)
				[moveDamage, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);

				if (!moveDamage.some(val => val !== false)) break;
				nullDamage = false;

				for (const [i, md] of moveDamage.entries()) {
					// Damage from each hit is individually counted for the
					// purposes of Counter, Metal Burst, and Mirror Coat.
					damage[i] = md === true || !md ? 0 : md;
					// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
					move.totalDamage += damage[i] as number;
				}
				if (move.mindBlownRecoil) {
					const hpBeforeRecoil = pokemon.hp;
					this.battle.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get(move.id), true);
					move.mindBlownRecoil = false;
					if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
						this.battle.runEvent('EmergencyExit', pokemon, pokemon);
					}
				}
				this.battle.eachEvent('Update');
				if (!pokemon.hp && targets.length === 1) {
					hit++; // report the correct number of hits for multihit moves
					break;
				}
			}
			// hit is 1 higher than the actual hit count
			if (hit === 1) return damage.fill(false);
			if (nullDamage) damage.fill(false);
			this.battle.faintMessages(false, false, !pokemon.hp);
			if (move.multihit && typeof move.smartTarget !== 'boolean') {
				this.battle.add('-hitcount', targets[0], hit - 1);
			}

			if ((move.recoil || move.id === 'chloroblast') && move.totalDamage) {
				const hpBeforeRecoil = pokemon.hp;
				this.battle.damage(this.calcRecoilDamage(move.totalDamage, move, pokemon), pokemon, pokemon, 'recoil');
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}

			if (move.struggleRecoil) {
				let recoilDamage;
				recoilDamage = this.battle.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
				this.battle.directDamage(recoilDamage, pokemon, pokemon, {id: 'strugglerecoil'} as Condition);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}

			// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
			if (move.smartTarget) targetsCopy = targets.slice(0);

			for (const [i, target] of targetsCopy.entries()) {
				if (target && pokemon !== target) {
					target.gotAttacked(move, moveDamage[i] as number | false | undefined, pokemon);
					if (typeof moveDamage[i] === 'number') {
						target.timesAttacked += hit - 1;
					}
				}
			}

			if (move.ohko && !targets[0].hp) this.battle.add('-ohko');

			if (!damage.some(val => !!val || val === 0)) return damage;

			this.battle.eachEvent('Update');

			this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);

			for (const [i, d] of damage.entries()) {
				// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
				// The previous check was for `move.multihit`, but that fails for Dragon Darts
				const curDamage = targets.length === 1 ? move.totalDamage : d;
				if (typeof curDamage === 'number' && targets[i].hp) {
					const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
					if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
						this.battle.runEvent('EmergencyExit', targets[i], pokemon);
					}
				}
			}

			return damage;
		},
		hitStepInvulnerabilityEvent(targets, pokemon, move) { //Toxic buff revert
			if (move.id === 'helpinghand') {
				return new Array(targets.length).fill(true);
			}
			const hitResults = this.battle.runEvent('Invulnerability', targets, pokemon, move);
			for (const [i, target] of targets.entries()) {
				if (hitResults[i] === false) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
				}
			}
			return hitResults;
		},
		hitStepBreakProtect(targets, pokemon, move) { //Renaming Bunker Down
			if (move.breaksProtect) {
				for (const target of targets) {
					let broke = false;
					for (const effectid of ['bunkerdown', 'kingsshield', 'obstruct', 'protect', 'silktrap', 'spikyshield']) {
						if (target.removeVolatile(effectid)) broke = true;
					}
					for (const effectid of ['craftyshield', 'matblock', 'quickguard', 'wideguard']) {
						if (target.side.removeSideCondition(effectid)) broke = true;
					}
					if (broke) {
						if (['feint'/*, 'wickedblow', 'surgingstrikes'*/].includes(move.id)) { //TODO: Implement custom messages so this can be restored
							this.battle.add('-activate', target, 'move: ' + move.name);
						} else {
							this.battle.add('-activate', target, 'move: ' + move.name, '[broken]');
						}
						delete target.volatiles['stall'];
					}
				}
			}
			return undefined;
		},
		hitStepStealBoosts(targets, pokemon, move) { //Own Tempo
			const target = targets[0]; // hardcoded
			if (move.stealsBoosts) {
				const boosts: SparseBoostsTable = {};
				let stolen = false;
				let statName: BoostName;
				for (statName in target.boosts) {
					const stage = target.boosts[statName];
					if (stage > 0) {
						boosts[statName] = stage;
						stolen = true;
					}
				}
				if (stolen) {
					if(target.hasAbility('owntempo')){
						this.battle.add('-activate', target, 'ability: Own Tempo');
						this.battle.hint('Own Tempo blocks effects that steal, copy, or overwrite its attributes');
						return;
					}
					this.battle.attrLastMove('[still]');
					this.battle.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
					this.battle.boost(boosts, pokemon, pokemon);

					let statName2: BoostName;
					for (statName2 in boosts) {
						boosts[statName2] = 0;
					}
					target.setBoost(boosts);
					this.battle.addMove('-anim', pokemon, "Spectral Thief", target);
				}
			}
			return undefined;
		},
		afterMoveSecondaryEvent(targets, pokemon, move) { //Sheer Force post-secondary change
			this.battle.singleEvent('AfterMoveSecondary', move, null, targets[0], pokemon, move);
			this.battle.runEvent('AfterMoveSecondary', targets, pokemon, move);
			return undefined;
		},
		canMegaEvo(pokemon) { //Magic Room suppression, Mega-Ray change, Mega Evolution friendship req
			if('magicroom' in this.battle.field.pseudoWeather || pokemon.happiness < 180) return null;
			const species = pokemon.baseSpecies;
			const altForme = species.otherFormes && this.dex.species.get(species.otherFormes[0]);
			const item = pokemon.getItem();
			if (item.megaEvolves === species.baseSpecies && item.megaStone !== species.name) {
				//Additional check for required move
				if (altForme?.isMega && altForme?.requiredMove) {
					if(pokemon.baseMoves.includes(this.battle.toID(altForme.requiredMove))){
						return item.megaStone;
					}
				} else {
					return item.megaStone;
				}
			}
			return null;
		},
		canUltraBurst(pokemon) { //Magic Room suppression
			if('magicroom' in this.battle.field.pseudoWeather) return null;
			if (['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane'].includes(pokemon.baseSpecies.name) &&
				pokemon.getItem().id === 'ultranecroziumz') {
				return "Necrozma-Ultra";
			}
			return null;
		},
		runMegaEvo(pokemon) { //Extra Magic Room suppression since it doesn't seem to work
			if('magicroom' in this.battle.field.pseudoWeather) return false;
			const speciesid = pokemon.canMegaEvo || pokemon.canUltraBurst;
			if (!speciesid) return false;
			const side = pokemon.side;

			// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
			for (const foeActive of side.foe.active) {
				if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
					return false;
				}
			}

			pokemon.formeChange(speciesid, pokemon.getItem(), true);

			// Limit one mega evolution
			const wasMega = pokemon.canMegaEvo;
			for (const ally of side.pokemon) {
				if (wasMega) {
					ally.canMegaEvo = null;
				} else {
					ally.canUltraBurst = null;
				}
			}

			this.battle.runEvent('AfterMega', pokemon);
			return true;
		},
		switchIn(pokemon: Pokemon, pos: number, sourceEffect: Effect | null = null, isDrag?: boolean) {
			if (!pokemon || pokemon.isActive) {
				this.battle.hint("A switch failed because the Pokémon trying to switch in is already in.");
				return false;
			}

			const side = pokemon.side;
			if (pos >= side.active.length) {
				throw new Error(`Invalid switch position ${pos} / ${side.active.length}`);
			}
			const oldActive = side.active[pos];
			const unfaintedActive = oldActive?.hp ? oldActive : null;
			if (unfaintedActive) {
				oldActive.beingCalledBack = true;
				let switchCopyFlag: 'copyvolatile' | boolean = false;
				if (sourceEffect && typeof (sourceEffect as Move).selfSwitch === 'string') {
					switchCopyFlag = (sourceEffect as Move).selfSwitch!;
				}
				if (!oldActive.skipBeforeSwitchOutEventFlag && !isDrag) {
					this.battle.runEvent('BeforeSwitchOut', oldActive);
					this.battle.eachEvent('Update');
				}
				oldActive.skipBeforeSwitchOutEventFlag = false;
				if (!this.battle.runEvent('SwitchOut', oldActive)) {
					// Warning: DO NOT interrupt a switch-out if you just want to trap a pokemon.
					// To trap a pokemon and prevent it from switching out, (e.g. Mean Look, Magnet Pull)
					// use the 'trapped' flag instead.

					// Note: Nothing in the real games can interrupt a switch-out (except Pursuit KOing,
					// which is handled elsewhere); this is just for custom formats.
					return false;
				}
				if (!oldActive.hp) {
					// a pokemon fainted from Pursuit before it could switch
					return 'pursuitfaint';
				}

				// will definitely switch out at this point

				oldActive.illusion = null;
				this.battle.singleEvent('End', oldActive.getAbility(), oldActive.abilityState, oldActive);

				// if a pokemon is forced out by Whirlwind/etc or Eject Button/Pack, it can't use its chosen move
				this.battle.queue.cancelAction(oldActive);

				let newMove = null;
				if (this.battle.gen === 4 && sourceEffect) {
					newMove = oldActive.lastMove;
				}
				if (switchCopyFlag) {
					pokemon.copyVolatileFrom(oldActive, switchCopyFlag);
				}
				if (newMove) pokemon.lastMove = newMove;
				oldActive.clearVolatile();
			}
			if (oldActive) {
				oldActive.isActive = false;
				oldActive.isStarted = false;
				oldActive.usedItemThisTurn = false;
				oldActive.statsRaisedThisTurn = false;
				oldActive.statsLoweredThisTurn = false;
				delete oldActive.previousTurnState;
				delete oldActive.turnState;
				oldActive.position = pokemon.position;
				pokemon.position = pos;
				side.pokemon[pokemon.position] = pokemon;
				side.pokemon[oldActive.position] = oldActive;
			}
			pokemon.isActive = true;
			side.active[pos] = pokemon;
			pokemon.activeTurns = 0;
			pokemon.activeMoveActions = 0;
			pokemon.updateTurnState();
			for (const moveSlot of pokemon.moveSlots) {
				moveSlot.used = false;
			}
			this.battle.runEvent('BeforeSwitchIn', pokemon);
			if (sourceEffect) {
				this.battle.add(isDrag ? 'drag' : 'switch', pokemon, pokemon.getDetails, '[from] ' + sourceEffect);
			} else {
				this.battle.add(isDrag ? 'drag' : 'switch', pokemon, pokemon.getDetails);
			}
			pokemon.abilityOrder = this.battle.abilityOrder++;
			pokemon.previouslySwitchedIn++;

			if (isDrag) {
				// runSwitch happens immediately so that Mold Breaker can make hazards bypass Clear Body and Levitate
				this.battle.singleEvent('PreStart', pokemon.getAbility(), pokemon.abilityState, pokemon);
				this.runSwitch(pokemon);
			} else {
				this.battle.queue.insertChoice({choice: 'runUnnerve', pokemon});
				this.battle.queue.insertChoice({choice: 'runSwitch', pokemon});
			}

			return true;
		},
	},
	//dex: {
		getImmunity(
			source: {type: string} | string,
			target: {getTypes: () => string[]} | {types: string[]} | string[] | string
		): boolean {
			// Edit for Earth & Sky - can't be done in mod's files
			let sourceType: string = "";
			if(['earthsky','gen9eshorizons'].includes(this.currentMod)){
				if(typeof source !== 'string'){
					if(source.twoType){
						return this.getImmunity(source.type, target) && this.getImmunity(source.twoType, target);
					} else {
						sourceType = source.type;
					}
				} else sourceType = source;
			} else sourceType = typeof source !== 'string' ? source.type : source;
			// End edit
			// @ts-ignore
			const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
			if (Array.isArray(targetTyping)) {
				for (const type of targetTyping) {
					if (!this.getImmunity(sourceType, type)) return false;
				}
				return true;
			}
			const typeData = this.data.TypeChart[targetTyping];
			if (typeData && typeData.damageTaken[sourceType] === 3) return false;
			return true;
		},
		getEffectiveness(
			source: {type: string} | string,
			target: {getTypes: () => string[]} | {types: string[]} | string[] | string
		): number {
			// Edit for Earth & Sky - can't be done in mod's files
			let sourceType: string = "";
			if(['earthsky','gen9eshorizons'].includes(this.currentMod)){
				if(typeof source !== 'string'){
					if(source.twoType){
						return this.getEffectiveness(source.type, target) + this.getEffectiveness(source.twoType, target);
					} else {
						sourceType = source.type;
					}
				} else sourceType = source;
			} else sourceType = typeof source !== 'string' ? source.type : source;
			// End edit
			// @ts-ignore
			const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
			let totalTypeMod = 0;
			if (Array.isArray(targetTyping)) {
				for (const type of targetTyping) {
					totalTypeMod += this.getEffectiveness(sourceType, type);
				}
				return totalTypeMod;
			}
			const typeData = this.data.TypeChart[targetTyping];
			if (!typeData) return 0;
			switch (typeData.damageTaken[sourceType]) {
			case 1: return 1; // super-effective
			case 2: return -1; // resist
			// in case of weird situations like Gravity, immunity is handled elsewhere
			default: return 0;
			}
		},
		getBestEffectiveness(
			source: Pokemon,
			target: {getTypes: () => string[]} | {types: string[]} | string[] | string,
			resistFirst?: boolean
		): string { //New function that picks the most advantageous type, improved from the method used for the Legend Plate.
			const dex = this.dex;
			const typeList = dex.types.names();
			const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
			this.debug("Getting effectiveness against " + targetTyping);
			let bestTypes = Object.assign([], typeList);
			this.debug("bestTypes:");
			this.debug(bestTypes);
			this.debug("Starting with " + (resistFirst ? "resistances" : "weaknesses"));
			let typesTest: string[] = [];
			if(resistFirst){
				//Criterion 1: Immunities or else resistances
				if(Array.isArray(targetTyping)){
					for(const targetType of targetTyping){
						typesTest = typesTest.concat(bestTypes.filter(type => !(dex.getImmunity(targetType, type))));
					}
				} else typesTest = bestTypes.filter(type => !(dex.getImmunity(targetTyping, type)));
				this.debug("Checking for immunities");
				this.debug(typesTest);
				if(typesTest.length){
					if(typesTest.length > 1){
						bestTypes = Object.assign([], typesTest);
					} else return typesTest[0];
				} else {
					this.debug("None found");
					if(Array.isArray(targetTyping)){
						typesTest = [];
						for(const targetType in targetTyping){
							typesTest = typesTest.concat(bestTypes.filter(type => dex.getEffectiveness(targetType, type) < 0)); //No immunities means these are only resistances
						}
						bestTypes = Object.assign([], typesTest);
					} else {
						bestTypes = bestTypes.filter(type => dex.getEffectiveness(targetTyping, type) < 0);
					}
					this.debug("Filtering for resistances");
					this.debug(bestTypes);
					if(bestTypes.length){
						if(bestTypes.length === 1) return bestTypes[0];
						//Check double-resists
						if(targetTyping.length){
							typesTest = [];
							for(const targetType in targetTyping){
								typesTest = typesTest.concat(bestTypes.filter(type => dex.getEffectiveness(targetType, type) === -2)); //No immunities means these are only resistances
							}
						} else typesTest = bestTypes.filter(type => dex.getEffectiveness(targetTyping, type) === -2);
						this.debug("Checking for double resistances");
						this.debug(typesTest);
						if(typesTest.length){
							if(typesTest.length > 1){
								bestTypes = Object.assign([], typesTest);
							} else return typesTest[0];
						} else this.debug("None found");
					} else bestTypes = Object.assign([], typeList);
				}
				this.debug("Current state:");
				this.debug(bestTypes);
				
				//Criterion 2: Super-effective
				typesTest = bestTypes.filter(type => dex.getEffectiveness(type, targetTyping) > 0 && dex.getImmunity(type, targetTyping));
				this.debug("Checking for weaknesses");
				this.debug(typesTest);
				if(typesTest.length){
					this.debug("Some found");
					if(typesTest.length === 1) return typesTest[0];
					bestTypes = Object.assign([], typesTest);
					//Check x4
					typesTest = bestTypes.filter(type => dex.getEffectiveness(type, targetTyping) === 2);
					this.debug("Checking for double weaknesses");
					this.debug(typesTest);
					if(typesTest.length){
						if(typesTest.length > 1){
							bestTypes = Object.assign([], typesTest);
						} else return typesTest[0];
					} else this.debug("None found");
				} else this.debug("None found");
				this.debug("Current state:");
				this.debug(bestTypes);
			} else {
				//Criterion 1: Super-effective
				bestTypes = bestTypes.filter(type => dex.getEffectiveness(type, targetTyping) > 0 && dex.getImmunity(type, targetTyping));
				this.debug("Filtering for weaknesses");
				this.debug(bestTypes);
				if(bestTypes.length){
					if(bestTypes.length === 1) return bestTypes[0];
					//Check x4
					typesTest = bestTypes.filter(type => dex.getEffectiveness(type, targetTyping) === 2);
					this.debug("Checking for double weaknesses");
					this.debug(typesTest);
					if(typesTest.length){
						if(typesTest.length > 1){
							bestTypes = Object.assign([], typesTest);
						} else return typesTest[0];
					} else this.debug("None found");
				} else bestTypes = Object.assign([], typeList);
				this.debug("Current state:");
				this.debug(bestTypes);
				
				//Criterion 2: Immunities or else resistances
				typesTest = [];
				if(Array.isArray(targetTyping)){
					for(const targetType in targetTyping){
						typesTest = typesTest.concat(bestTypes.filter(type => !dex.getImmunity(targetType, type)));
					}
				} else typesTest = bestTypes.filter(type => !dex.getImmunity(targetTyping, type));
				this.debug("Checking for immunities");
				this.debug(typesTest);
				if(typesTest.length){
					if(typesTest.length > 1){
						bestTypes = Object.assign([], typesTest);
					} else return typesTest[0];
				} else {
					this.debug("None found");
					if(Array.isArray(targetTyping)){
						typesTest = [];
						for(const targetType in targetTyping){
							typesTest = typesTest.concat(bestTypes.filter(type => dex.getEffectiveness(targetType, type) < 0)); //No immunities means these are only resistances
						}
					} else typesTest = bestTypes.filter(type => dex.getEffectiveness(targetTyping, type) < 0);
					this.debug("Checking for resistances");
					this.debug(typesTest);
					if(typesTest.length){
						if(typesTest.length === 1) return typesTest[0];
						bestTypes = Object.assign([], typesTest);
						//Check double-resists
						if(targetTyping.length){
							typesTest = [];
							for(const targetType in targetTyping){
								typesTest = typesTest.concat(bestTypes.filter(type => dex.getEffectiveness(targetType, type) === -2)); //No immunities means these are only resistances
							}
						} else typesTest = bestTypes.filter(type => dex.getEffectiveness(targetTyping, type) === -2);
						this.debug("Checking for double resistances");
						this.debug(typesTest);
						if(typesTest.length){
							if(typesTest.length > 1){
								bestTypes = Object.assign([], typesTest);
							} else return typesTest[0];
						} else this.debug("None found");
					} else this.debug("None found");
				}
				this.debug("Current state:");
				this.debug(bestTypes);
			}
			
			//Criterion 3: STAB
			typesTest  = [];
			for(const move in source.moveSlots){
				typesTest = typesTest.concat(bestTypes.filter(type => type === move.type || (move.twoType && type === move.twoType)));
			}
			if(typesTest.length){
				if(typesTest.length > 1){
					bestTypes = Object.assign([], typesTest);
				} else return typesTest[0];
			}
			
			//Now return random from what's left
			return this.sample(bestTypes);
		},
	//},
	init() {
		/* Removed/renamed accessibility and other init stuff */
		const baseSeven = [ //Pokemon modified to use a relative's Gen VII learnset as a base
			"meowthgalar", "perrserker", "growlithehisui", "arcaninehisui", "ponytagalar", "rapidashgalar", "slowpokegalar", "slowbrogalar", "slowkinggalar", "voltorbhisui", "electrodehisui", "weezinggalar", "taurospaldeacombat", "taurospaldeablaze", "taurospaldeaaqua", "articunogalar", "zapdosgalar", "moltresgalar", "typhlosionhisui", "sneaselhisui", "sneasler", "corsolagalar", "cursola", "samurotthisui", "lilliganthisui", "yamaskgalar", "runerigus", "zoruahisui", "zoroarkhisui", "stunfiskgalar", "braviaryhisui", "sliggoohisui", "goodrahisui", "avalugghisui", "decidueyehisui", "regieleki", "regidrago", "wyrdeer", "ursaluna", "toedscool", "toedscruel", "wiglett", "wugtrio", "kingambit"
		];
		const baseEight = [ //Pokemon using their Gen VIII learnsets as a base
			"bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "vileplume", "farfetchd", "farfetchdgalar", "hitmonlee", "hitmonchan", "mrmime", "mrmimegalar", "scyther", "pinsir", "bellossom", "qwilfish", "qwilfishhisui", "overqwil", "scizor", "heracross", "remoraid", "octillery", "tyrogue", "hitmontop", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "zigzagoon", "zigzagoongalar", "linoone", "linoonegalar", "seedot", "nuzleaf", "shiftry", "lotad", "lombre", "lunatone", "solrock", "bagon", "shelgon", "salamence", "kyogre", "groudon", "rayquaza", "mimejr", "uxie", "mesprit", "azelf", "dialga", "palkia", "giratina", "darumaka", "darmanitan", "reshiram", "zekrom", "kyurem", "fletchling", "fletchinder", "talonflame", "swirlix", "slurpuff", "bergmite", "avalugg", "xerneas", "yveltal", "zygarde", "tapukoko", "tapulele", "tapubulu", "tapufini"
		];
		const baseNine = [ //Pokemon using their Gen IX learnsets as a base
			"wooper", "wooperpaldea", "quagsire", "riolu", "lucario", "basculin", "basculinbluestriped", "basculinwhitestriped", "indeedee", "indeedeef", "kleavor"
		];
		/*const renamedAbilities = [
			"aurabreak", "minus", "plus", "powerofalchemy", "powerspot", "queenlymajesty", "slushrush", "tanglinghair",
		];
		const newNameAbilities = [
			"climatebreak", "induction", "induction", "alchemy", "poweraura", "majesty", "snowplow", "tangling",
		];*/
		/*const addedMachines = [ //Machines added in Gen VIII or IX and retained in Earth & Sky - currently not needed in the algorithm, but it's a long list so I don't want to delete it
			"amnesia", "assurance", "avalanche", "brine", "charm", "chillingwater", "eerieimpulse", "electricterrain", "electroball", "encore", "faketears", "futuresight", "grassyterrain", "hex", "hurricane", "hydropump", "mistyterrain", "nastyplot", "phantomforce", "powergem", "psychicterrain", "screech", "trailblaze", "whirlpool"
		];*/
		const renamedMoves = [ //Also includes the replacement of Axe Kick and Hail with Jump Kick and Snowscape, respectively
			"axekick", "banefulbunker", "chillingwater", "clangoroussoul", "doubleshock", "flowertrick", "hail", "moongeistbeam", "psyblade", "psychicfangs", "psyshieldbash", "ragefist", "stompingtantrum", "strangesteam", "sunsteelstrike", "supercellslam", "trailblaze"
		];
		const newNameMoves = [
			"jumpkick", "bunkerdown", "chillywater", "warriorssoul", "completeshock", "flowertrap", "snowscape", "lunarray", "energyblade", "psychicfang", "barrierbash", "vengefulspirit", "tantrum", "strangesmoke", "solarimpact", "particleslam", "trailhead"
		];
		const deletedMoves = [
			"appleacid", "bittermalice", "bleakwindstorm", "burningbulwark", "burningjealousy", "ceaselessedge", "celebrate", "chillyreception", "coaching", "comeuppance", "corrosivegas", "decorate", "doodle", "dragoncheer", "dualwingbeat", "electroshot", "esperwing", "expandingforce", "fierywrath", "flipturn", "gearup", "grassyglide", "gravapple", "headlongrush", "holdhands", "hydrosteam", "hyperdrill", "icespinner", "infernalparade", "kinesis", "kowtowcleave", "luminacrash", "makeitrain", "matchagotcha", "mightycleave", "mistyexplosion", "mortalspin", "mountaingale", "mysticalpower", "psychicnoise", "ragingbull", "ragingfury", "risingvoltage", "sandsearstorm", "scaleshot", "scorchingsands", "shadowstrike", "shellsidearm", "skittersmack", "springtidestorm", "steelroller", "syrupbomb", "tachyoncutter", "takeheart", "terrainpulse", "thunderclap", "thunderouskick", "tidyup", "triplearrows", "tripleaxel", "tripledive", "twinbeam", "upperhand", "wildboltstorm"
		];
		const droppedMachines = [ //Machines dropped from Earth & Sky; includes Flash, Natural Gift, and Toxic, which are re-added to their Pokemon after the algorithm, and the few moves which are still Tutored since they're handled separately
			"agility", "aircutter", "airslash", "alluringvoice", "aurasphere", "batonpass", "beatup", "bind", "blastburn", "blazekick", "bodyslam", "bravebird", "bugbuzz", "bulletseed", "charge", "closecombat", "confide", "cosmicpower", "covet", "crosspoison", "crunch", "cut", "darkestlariat", "disarmingvoice", "doubleteam", "dracometeor", "dragondance", "drainingkiss", "firefang", "firepledge", "firespin", "flareblitz", "flash", "focusenergy", "focuspunch", "frenzyplant", "grasspledge", "guardswap", "hardpress", "haze", "heatcrash", "heavyslam", "highhorsepower", "hydrocannon", "icefang", "iciclespear", "imprison", "leafblade", "leafstorm", "liquidation", "lunge", "magicalleaf", "megakick", "megapunch", "megahorn", "metalclaw", "meteorbeam", "mudshot", "mudslap", "muddywater", "mysticalfire", "naturalgift", "nightshade", "particleslam", "payday", "pinmissile", "playrough", "poisontail", "pollenpuff", "pounce", "powerswap", "poweruppunch", "powerwhip", "psychicfang", "psychocut", "razorshell", "revenge", "reversal", "rockblast", "sandtomb", "scaryface", "selfdestruct", "solarblade", "speedswap", "spikes", "steelbeam", "storedpower", "strugglebug", "superfang", "swagger", "swift", "takedown", "tailslap", "temperflare", "terablast", "throatchop", "thunderfang", "toxic", "toxicspikes", "triattack", "vacuumwave", "venomdrench", "waterpledge", "weatherball", "worryseed"
		];
		const noUniversalTMs = [ //Only Gen 5+ since it's the earliest to lose a universal TM
			"smeargle", "tynamo", "scatterbug", "spewpa", "cosmog", "cosmoem", "blipbug", "applin"
		];
		/* Wide-spread changes */
		const esrules = this.formats.getRuleTable(this.formats.get('gen9earthskyhorizonsou'));
		//const dex = Dex.mod('gen9eshorizons');
		for (let pokemon of this.species.all()) {
			const pokemonID = this.toID(pokemon.name);
			const learnsetTest = false;//["dedenne"].includes(pokemonID);
			const formatsTest = false;//["basculin", "basculinbluestriped", "basculinwhitestriped"].includes(pokemonID);
			if(formatsTest) console.log(pokemonID);
			 //Don't do anything with new or deleted Pokemon
			if(pokemon === null || pokemon.num < -500 || 
				(pokemon.forme && (["Egelas", "Sartori", "Hassrim", "Mega-Statue"].includes(pokemon.forme) || ["tynamoschool", "indeedeehassrimf"].includes(pokemonID) ||
				(pokemon.forme === "Mega" && ["Butterfree", "Slowking", "Torkoal", "Milotic", "Electivire", "Magmortar", "Garbodor", "Beheeyem", "Sandaconda", "Alcremie", "Froslass", "Druddigon"].includes(pokemon.baseSpecies)))))
			continue;
			//Change generational accessibility
			if(this.modData('FormatsData', pokemonID)) {
				if(formatsTest) {
					console.log(this.modData('FormatsData', pokemonID));
				}
				/*switch(this.modData('FormatsData', pokemonID).isNonstandard) {
					case "CAP":
						if(!pokemon.battleOnly){
							if(pokemon.evos) {
								this.modData('FormatsData', pokemonID).tier = pokemon.prevo ? "CAP NFE" : "CAP LC";
							} else {
								this.modData('FormatsData', pokemonID).tier = "CAP";
							}
						}
						break;
					case "Past":
						if(formatsTest) {
							console.log(pokemon.name + " restoration");
						}
						delete this.modData('FormatsData', pokemonID).isNonstandard;
						//delete pokemon.isNonstandard;
					case null:
					case undefined:
						if(!pokemon.battleOnly || (pokemon.forme && ["Mega", "Mega-X", "Mega-Y", "Primal", "Ultra"].includes(pokemon.forme))){ //Reset tiers for all Pokemon that have their own tiering data
							if(pokemon.nfe) {
								this.modData('FormatsData', pokemonID).tier = pokemon.prevo ? "NFE" : "LC";
								this.modData('FormatsData', pokemonID).natDexTier = pokemon.prevo ? "NFE" : "LC";
								//pokemon.tier = pokemon.prevo ? "NFE" : "LC";
								//pokemon.natDexTier = pokemon.prevo ? "NFE" : "LC";
							} else {
								const tier = esrules.isBannedSpecies(pokemon) ? "Uber" : "OU";
								this.modData('FormatsData', pokemonID).tier = tier;
								this.modData('FormatsData', pokemonID).natDexTier = tier;
								//pokemon.tier = tier;
								//pokemon.natDexTier = tier;
							}
							if(this.modData('FormatsData', pokemonID).doublesTier) delete this.modData('FormatsData', pokemonID).doublesTier;
						}
						break;
					default: //All other non-standard Pokemon are to remain unusable
						continue;
				}*/
				//if(pokemon.canGigantamax) delete pokemon.canGigantamax;
				if(formatsTest) {
					console.log(pokemon.tier);
					console.log(pokemon.natDexTier);
				}
			}
			//Don't do move stuff with formes that don't have their own movesets or get them copied later (and Xerneas)
			if(learnsetTest && this.modData('Learnsets',pokemonID) === undefined){
				console.log(pokemonID + " does not have a learnset");
				console.log(pokemon);
			}
			if(pokemon.battleOnly || ["Mega", "Mega-X", "Mega-Y", "Primal", "Ultra"].includes(pokemon.forme) || 
				(["Deoxys", "Rotom", "Giratina", "Shaymin", "Arceus", "Tornadus", "Thundurus", "Landorus", "Keldeo", "Meloetta", "Genesect", "Vivillon", "Aegislash", 
				"Pumpkaboo", "Gourgeist", "Xerneas", "Hoopa", "Silvally", "Oricorio", "Magearna", "Sinistea", "Polteageist", "Eternatus", 
				"Squawkabilly", "Maushold", "Revavroom", "Palafin", "Dudunsparce", "Gimmighoul", "Poltchageist", "Sinistcha", "Ogerpon", "Terapagos", "Venomicon"].includes(pokemon.baseSpecies)
				&& pokemon.baseSpecies !== pokemon.name))
				continue;
			if(learnsetTest) {
				console.log("Modifying learnset of " + pokemon.name);
				console.log(this.modData('Learnsets',pokemonID).learnset);
			}
			/* Moves */
			let moveLearn; //store move learnset to save memory/time
			let startGen; //Tags Gen for level/egg moves
			if(baseSeven.includes(pokemonID)) startGen = 7;
			else if ((pokemon.num > 898 || pokemon.num < -68) || baseNine.includes(pokemonID)) startGen = 9;
			else if ((pokemon.num > 807 || pokemon.num < -60) || baseEight.includes(pokemonID)) startGen = 8;
			else startGen = 7;
			const levelString = new RegExp(startGen + 'L[0-9]+');
			if(learnsetTest) console.log("Starting with Gen " + startGen);
			
			// For Stone Evolutions, import prevo's level-up learnset at level 1
			const stoneCheck = (startGen === 7 && pokemon.prevo && !(["Eevee", "Sunkern", "Charjabug", "Darumaka-Galar", "Capsakid"].includes(pokemon.prevo)) && pokemon.evoItem && 
				["Fire Stone", "Water Stone", "Thunder Stone", "Leaf Stone", "Moon Stone", "Sun Stone", "Shiny Stone", "Dusk Stone", "Ice Stone"].includes(pokemon.evoItem));
			if(stoneCheck){
				if(learnsetTest) console.log("This Pokemon evolves by Evolution Stone and needs its prevo's level-up moves");
				for(const moveID in this.modData('Learnsets',this.toID(pokemon.prevo)).learnset){
					const prevoMove = this.modData('Learnsets',this.toID(pokemon.prevo)).learnset[moveID];
					const esLevelString = new RegExp('9L[0-9]+'); //Prevos will have updated their movepool first (no Pokemon evolves by Stone from one introduced later than it), so moves will always be stored as Gen 9
					if(esLevelString.test(prevoMove[0])){ //Level-up will always be first in updated learnset and we only need it once
						if(learnsetTest) console.log("Importing " + moveID);
						if(this.modData('Learnsets',pokemonID).learnset[moveID]) this.modData('Learnsets',pokemonID).learnset[moveID].unshift("7L1");
						else this.modData('Learnsets',pokemonID).learnset[moveID] = ["7L1"];
					}
				}
				if(learnsetTest) console.log("Commencing update");
			}
			// Move renames
			for(let i = 0; i < renamedMoves.length; i++){
				if(this.modData('Learnsets',pokemonID).learnset[renamedMoves[i]]){
					if(learnsetTest) console.log("Renaming " + renamedMoves[i]);
					this.modData('Learnsets',pokemonID).learnset[newNameMoves[i]] = this.modData('Learnsets',pokemonID).learnset[renamedMoves[i]];
					//delete this.data.Learnsets[pokemonID].learnset[renamedMoves[i]];
					delete this.modData('Learnsets',pokemonID).learnset[renamedMoves[i]];
				}
			}
			// Move deletion
			for(let i = 0; i < deletedMoves.length; i++){
				if(this.modData('Learnsets',pokemonID).learnset[deletedMoves[i]]){
					if(learnsetTest) console.log("Deleting " + deletedMoves[i]);
					//delete this.data.Learnsets[pokemonID].learnset[deletedMoves[i]];
					delete this.modData('Learnsets',pokemonID).learnset[deletedMoves[i]];
				}
			}
			// Now compile valid means of learning moves in Earth & Sky
			for(let move of this.moves.all()) {
				const moveID = this.toID(move.name);
				moveLearn = this.modData('Learnsets',pokemonID).learnset[moveID];
				if(!moveLearn){
					// checks for new universal machines
					if(!(noUniversalTMs.includes(pokemonID))){
						if(moveID === "endure" && pokemon.gen > 4){
							if(learnsetTest) console.log("Adding universal TM Endure");
							this.modData('Learnsets',pokemonID).learnset[moveID] = ["9M"];
						} else if(["hiddenpower", "secretpower", "return", "frustration"].includes(moveID) && pokemon.gen > 7){
							if(learnsetTest) console.log("Adding universal TM " + move.name);
							this.modData('Learnsets',pokemonID).learnset[moveID] = ["9M"];
						} else if(moveID === "attract" && pokemon.gen === 9 && pokemon.gender !== 'N'){
							if(learnsetTest) console.log("Adding universal TM Attract");
							this.modData('Learnsets',pokemonID).learnset[moveID] = ["9M"];
						} else if(moveID === "terablast" && pokemon.gen < 9) {
							if(learnsetTest) console.log("Adding universal Tutor Tera Blast");
							this.modData('Learnsets',pokemonID).learnset[moveID] = ["9T"];
						}
					}
					continue;
				}
				if(learnsetTest) console.log("Found move " + move.name);
				if(learnsetTest) console.log(moveLearn);
				/* Collects means of learning the move in Earth & Sky */
				let moveMeans: string[] = [];
				// Level and egg moves of base gen
				for(const learnType of moveLearn){
					if(levelString.test(learnType)){
						if(stoneCheck) { //Most Stone Evolutions only learn moves at level 1 and therefore we must also make sure they only learn moves once by level
							if(!moveMeans.includes("8L1")) moveMeans.push("9L1");
						/*} else if(learnType === (startGen + "L1") && pokemon.prevo && this.modData('Learnsets',prevo).learnset){ //Removes all instances of evolutions moving moves to level 1
							const prevoLearn = this.modData('Learnsets',prevo).learnset[moveID];
							for(const prevoMeans of prevoLearn){
								if(levelString.test(prevoMeans) && prevoMeans !== (startGen + "L1")){ //Showdown only stores the earliest level, so we only have to check for prevos not having it at 1
									if(learnsetTest) console.log("This move is learned at level 1, but the prevo learns it later; using the later one");
									moveMeans = ["9" + prevoMeans.substring(1)]; //The check comes before non-level means are compiled, so this overrides the level 1 with the other level
								}
							}*/
						} else {
							if(learnsetTest) console.log("This move is learned by level");
							moveMeans.push("9" + learnType.substring(1));
						}
					}
				}
				if(moveLearn.includes("".concat(startGen,"R"))){
					if(learnsetTest) console.log("This move is learned on forme change");
					moveMeans.push("9R");
				}
				// Pulls combined TMs and the three retained Isle Tutors
				if((moveLearn.includes("6M") || moveLearn.includes("7M") || moveLearn.includes("7T") || moveLearn.includes("8M") || moveLearn.includes("9M")) && !droppedMachines.includes(moveID)){
					if(learnsetTest) console.log("This move is taught by machine");
					moveMeans.push("9M");
				}
				if(!moveMeans.includes("9M") && (moveID === "lashout" || moveID === "poltergeist") && moveLearn.includes("8T")){
					if(learnsetTest) console.log("This move is taught by machine");
					moveMeans.push("9M");
				}
				if(['grasspledge', 'firepledge', 'waterpledge', 'frenzyplant', 'blastburn', 'hydrocannon', 'dracometeor', 'steelbeam', 'meteorbeam', 'terablast'].includes(moveID) && 
				  (moveLearn.includes("7T") || moveLearn.includes("8T") || moveLearn.includes("9M") || moveLearn.includes("7M") || moveLearn.includes("8M"))){
					if(learnsetTest) console.log("This move is taught by tutor");
					moveMeans.push("9T");
				}
				if(!moveMeans.length){ //Egg moves, with Gen VIII change of not learning those learned by other means
					if(moveLearn.includes("".concat(startGen,"E"))){
						if(learnsetTest) console.log("This move is learned by egg");
						moveMeans.push("9E");
					}
					if(startGen > 7 && moveLearn.includes("7E")){
						if(learnsetTest) console.log("This move was learned by egg before it got removed");
						moveMeans.push("9E");
					}
				}
				if(learnsetTest) console.log("Compiled: " + moveMeans);
				//Lash Out - differentiating between Gen 8 and ES
				if(moveID === "lashout" && moveMeans == "9M"){ //Gen 8 is machine, ES is not
					if(learnsetTest) console.log("Renaming old Lash Out to Compensation");
					this.modData('Learnsets',pokemonID).learnset['compensation'] = ["9M"];
					delete this.modData('Learnsets',pokemonID).learnset.lashout;
					continue;
				}
				if(!moveMeans.length){
					delete this.modData('Learnsets',pokemonID).learnset[moveID];
					continue;
				}
				this.modData('Learnsets',pokemonID).learnset[moveID] = moveMeans;
			}
			// Ability renames
			/*for(let i = 0; i < renamedAbilities.length; i++){ //Abilities
				const pokeAbilities = pokemon.abilities;
				for(const abilityKey in pokeAbilities){
					if(this.toID(pokeAbilities[abilityKey]) === renamedAbilities[i]){
						//console.log(renamedAbilities[i] + " name change on " + pokemon.name);
						this.modData('Pokedex',pokemonID).abilities[abilityKey] = this.data.Abilities[newNameAbilities[i]].name;
						//console.log(pokemon.abilities);
						break;
					}
				}
			}*/
			if(learnsetTest){
				console.log("Final: ");
				console.log(this.modData('Learnsets',pokemonID).learnset);
				console.log("");
			}
		}
		
		/* Renames, re-additions, and removals */
		/*for(let move of this.moves.all()) {
			const moveID = this.toID(move.name);
			if(moveID.endsWith('torque') || move.isNonstandard === "Past") {
				//this.modData('Moves',moveID).isNonstandard = null;
				//move.isNonstandard = null;
			}
		}
		for(let item of this.items.all()){
			const itemID = this.toID(item.name);
			if((item.isNonstandard === "Past" || item.isNonstandard === "Unobtainable") && !item.zMove){
				//this.modData('Items',itemID).isNonstandard = null;
				//item.isNonstandard = null;
			}
			if(item.fling && item.fling.basePower === 10){ //Fling BP buffs
				item.fling.basePower = 20;
			}
			if(itemID.startsWith('tr')) delete item.fling; //TRs can't be Flung anymore.
		}*/
		
		/* individual Pokemon moveset edits */
		// Bulbasaur
		this.modData('Learnsets','bulbasaur').learnset.belch = ["9D"];
		this.modData('Learnsets','bulbasaur').learnset.leafage = ["9L3"];
		this.modData('Learnsets','bulbasaur').learnset.sludge = ["9L21"];
		this.modData('Learnsets','bulbasaur').learnset.sludgewave = ["9L33", "9M"];
		this.modData('Learnsets','bulbasaur').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','bulbasaur').learnset.toxic = ["9M"];
		this.modData('Learnsets','bulbasaur').learnset.trailhead = ["9M"];
		this.modData('Learnsets','bulbasaur').learnset.vinewhip = ["9E"];
		delete this.modData('Learnsets','bulbasaur').learnset.doubleedge;
		delete this.modData('Learnsets','bulbasaur').learnset.knockoff;
		delete this.modData('Learnsets','bulbasaur').learnset.takedown;
		// Ivysaur
		this.modData('Learnsets','ivysaur').learnset.belch = ["9D"];
		this.modData('Learnsets','ivysaur').learnset.leafage = ["9L3"];
		this.modData('Learnsets','ivysaur').learnset.sludge = ["9L25"];
		this.modData('Learnsets','ivysaur').learnset.sludgewave = ["9L45", "9M"];
		this.modData('Learnsets','ivysaur').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','ivysaur').learnset.toxic = ["9M"];
		this.modData('Learnsets','ivysaur').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','ivysaur').learnset.doubleedge;
		delete this.modData('Learnsets','ivysaur').learnset.knockoff;
		delete this.modData('Learnsets','ivysaur').learnset.takedown;
		// Venusaur
		this.modData('Learnsets','venusaur').learnset.belch = ["9D"];
		this.modData('Learnsets','venusaur').learnset.leafage = ["9L3"];
		this.modData('Learnsets','venusaur').learnset.sludge = ["9L25"];
		this.modData('Learnsets','venusaur').learnset.sludgewave = ["9L51", "9M"];
		this.modData('Learnsets','venusaur').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','venusaur').learnset.toxic = ["9M"];
		this.modData('Learnsets','venusaur').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','venusaur').learnset.doubleedge;
		delete this.modData('Learnsets','venusaur').learnset.knockoff;
		delete this.modData('Learnsets','venusaur').learnset.takedown;
		// Charmander
		this.modData('Learnsets','charmander').learnset.twister = ["9D"];
		this.modData('Learnsets','charmander').learnset.firespin = ["9L17"];
		this.modData('Learnsets','charmander').learnset.firefang = ["9L24"];
		this.modData('Learnsets','charmander').learnset.flamethrower = ["9L32", "9M"];
		this.modData('Learnsets','charmander').learnset.flash = ["9M"];
		this.modData('Learnsets','charmander').learnset.flameburst = ["9E"];
		this.modData('Learnsets','charmander').learnset.temperflare = ["9E"];
		delete this.modData('Learnsets','charmander').learnset.wingattack;
		// Charmeleon
		this.modData('Learnsets','charmeleon').learnset.twister = ["9D"];
		this.modData('Learnsets','charmeleon').learnset.firespin = ["9L19"];
		this.modData('Learnsets','charmeleon').learnset.firefang = ["9L30"];
		this.modData('Learnsets','charmeleon').learnset.flamethrower = ["9L42", "9M"];
		this.modData('Learnsets','charmeleon').learnset.flash = ["9M"];
		// Charizard
		this.modData('Learnsets','charizard').learnset.twister = ["9D"];
		this.modData('Learnsets','charizard').learnset.firespin = ["9L19"];
		this.modData('Learnsets','charizard').learnset.firefang = ["9L30"];
		this.modData('Learnsets','charizard').learnset.flamethrower = ["9L46", "9M"];
		this.modData('Learnsets','charizard').learnset.fellswoop = ["9M"];
		this.modData('Learnsets','charizard').learnset.flash = ["9M"];
		// Squirtle
		this.modData('Learnsets','squirtle').learnset.shellsmash = ["9D"];
		this.modData('Learnsets','squirtle').learnset.whitewater = ["9L16"];
		this.modData('Learnsets','squirtle').learnset.chillywater = ["9M"];
		this.modData('Learnsets','squirtle').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','squirtle').learnset.lifedew = ["9E"];
		this.modData('Learnsets','squirtle').learnset.jetpunch = ["9E"];
		this.modData('Learnsets','squirtle').learnset.liquidation = ["9E"];
		delete this.modData('Learnsets','squirtle').learnset.bite;
		delete this.modData('Learnsets','squirtle').learnset.blizzard;
		delete this.modData('Learnsets','squirtle').learnset.fakeout;
		// Wartortle
		this.modData('Learnsets','wartortle').learnset.shellsmash = ["9D"];
		this.modData('Learnsets','wartortle').learnset.whitewater = ["9L16"];
		this.modData('Learnsets','wartortle').learnset.chillywater = ["9M"];
		this.modData('Learnsets','wartortle').learnset.fullcollide = ["9M"];
		delete this.modData('Learnsets','wartortle').learnset.bite;
		delete this.modData('Learnsets','wartortle').learnset.blizzard;
		// Blastoise
		this.modData('Learnsets','blastoise').learnset.shellsmash = ["9D"];
		this.modData('Learnsets','blastoise').learnset.whitewater = ["9L16"];
		this.modData('Learnsets','blastoise').learnset.chillywater = ["9M"];
		this.modData('Learnsets','blastoise').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','blastoise').learnset.liquidation = ["9L1"];
		delete this.modData('Learnsets','blastoise').learnset.bite;
		delete this.modData('Learnsets','blastoise').learnset.blizzard;
		// Butterfree
		this.modData('Learnsets','butterfree').learnset.pollenpuff = ["9D"];
		this.modData('Learnsets','butterfree').learnset.flash = ["9M"];
		this.modData('Learnsets','butterfree').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','butterfree').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','butterfree').learnset.hurricane;
		// Beedrill
		this.modData('Learnsets','beedrill').learnset.attackorder = ["9D"];
		this.modData('Learnsets','beedrill').learnset.mortalstrike = ["9L47"];
		this.modData('Learnsets','beedrill').learnset.compensation = ["9M"];
		this.modData('Learnsets','beedrill').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','beedrill').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','beedrill').learnset.brutalswing;
		delete this.modData('Learnsets','beedrill').learnset.knockoff;
		// Pidgey
		this.modData('Learnsets','pidgey').learnset.razorwind = ["9D"];
		this.modData('Learnsets','pidgey').learnset.swift = ["9E"];
		// Pidgeotto
		this.modData('Learnsets','pidgeotto').learnset.razorwind = ["9D"];
		// Pidgeot
		this.modData('Learnsets','pidgeot').learnset.razorwind = ["9D"];
		// Rattata
		this.modData('Learnsets','rattata').learnset.odorsleuth = ["9D"];
		this.modData('Learnsets','rattata').learnset.chipaway = ["9M"];
		this.modData('Learnsets','rattata').learnset.cut = ["9L25"];
		this.modData('Learnsets','rattata').learnset.suckerpunch = ["9L28"];
		this.modData('Learnsets','rattata').learnset.superfang = ["9L31"];
		this.modData('Learnsets','rattata').learnset.doubleedge = ["9L34"];
		this.modData('Learnsets','rattata').learnset.endeavor = ["9L37"];
		this.modData('Learnsets','rattata').learnset.chillywater = ["9M"];
		this.modData('Learnsets','rattata').learnset.shockwave = ["9M"];
		this.modData('Learnsets','rattata').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','rattata').learnset.blizzard;
		delete this.modData('Learnsets','rattata').learnset.icebeam;
		delete this.modData('Learnsets','rattata').learnset.thunder;
		delete this.modData('Learnsets','rattata').learnset.thunderbolt;
		// Rattata Alola
		this.modData('Learnsets','rattataalola').learnset.odorsleuth = ["9D"];
		this.modData('Learnsets','rattataalola').learnset.chipaway = ["9M"];
		this.modData('Learnsets','rattataalola').learnset.cut = ["9L25"];
		this.modData('Learnsets','rattataalola').learnset.suckerpunch = ["9L28"];
		this.modData('Learnsets','rattataalola').learnset.superfang = ["9L31"];
		this.modData('Learnsets','rattataalola').learnset.doubleedge = ["9L34"];
		this.modData('Learnsets','rattataalola').learnset.endeavor = ["9L37"];
		this.modData('Learnsets','rattataalola').learnset.chillywater = ["9M"];
		this.modData('Learnsets','rattataalola').learnset.shockwave = ["9M"];
		this.modData('Learnsets','rattataalola').learnset.toxic = ["9M"];
		this.modData('Learnsets','rattataalola').learnset.stuffcheeks = ["9E"];
		delete this.modData('Learnsets','rattataalola').learnset.blizzard;
		delete this.modData('Learnsets','rattataalola').learnset.icebeam;
		delete this.modData('Learnsets','rattataalola').learnset.thunder;
		delete this.modData('Learnsets','rattataalola').learnset.thunderbolt;
		// Raticate
		this.modData('Learnsets','raticate').learnset.odorsleuth = ["9D"];
		this.modData('Learnsets','raticate').learnset.chipaway = ["9M"];
		this.modData('Learnsets','raticate').learnset.cut = ["9L25"];
		this.modData('Learnsets','raticate').learnset.suckerpunch = ["9L28"];
		this.modData('Learnsets','raticate').learnset.superfang = ["9L31"];
		this.modData('Learnsets','raticate').learnset.doubleedge = ["9L34"];
		this.modData('Learnsets','raticate').learnset.endeavor = ["9L37"];
		this.modData('Learnsets','raticate').learnset.chillywater = ["9M"];
		this.modData('Learnsets','raticate').learnset.shockwave = ["9M"];
		this.modData('Learnsets','raticate').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','raticate').learnset.blizzard;
		delete this.modData('Learnsets','raticate').learnset.thunder;
		// Raticate Alola
		this.modData('Learnsets','raticatealola').learnset.odorsleuth = ["9D"];
		this.modData('Learnsets','raticatealola').learnset.chipaway = ["9M"];
		this.modData('Learnsets','raticatealola').learnset.cut = ["9L25"];
		this.modData('Learnsets','raticatealola').learnset.suckerpunch = ["9L28"];
		this.modData('Learnsets','raticatealola').learnset.superfang = ["9L31"];
		this.modData('Learnsets','raticatealola').learnset.doubleedge = ["9L34"];
		this.modData('Learnsets','raticatealola').learnset.endeavor = ["9L37"];
		this.modData('Learnsets','raticatealola').learnset.chillywater = ["9M"];
		this.modData('Learnsets','raticatealola').learnset.shockwave = ["9M"];
		this.modData('Learnsets','raticatealola').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','raticatealola').learnset.blizzard;
		delete this.modData('Learnsets','raticatealola').learnset.icebeam;
		delete this.modData('Learnsets','raticatealola').learnset.thunder;
		// Spearow
		this.modData('Learnsets','spearow').learnset.mortalstrike = ["9D"];
		this.modData('Learnsets','spearow').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','spearow').learnset.chipaway = ["9M"];
		this.modData('Learnsets','spearow').learnset.throatchop = ["9E"];
		// Fearow
		this.modData('Learnsets','fearow').learnset.mortalstrike = ["9D"];
		this.modData('Learnsets','fearow').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','fearow').learnset.chipaway = ["9M"];
		// Ekans
		this.modData('Learnsets','ekans').learnset.dragonbreath = ["9D"];
		this.modData('Learnsets','ekans').learnset.bind = ["9L1"];
		this.modData('Learnsets','ekans').learnset.mortalstrike = ["9L49"];
		this.modData('Learnsets','ekans').learnset.gunkshot = ["9M"];
		this.modData('Learnsets','ekans').learnset.nightmare = ["9M"];
		this.modData('Learnsets','ekans').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','ekans').learnset.earthquake;
		delete this.modData('Learnsets','ekans').learnset.wrap;
		// Arbok
		this.modData('Learnsets','arbok').learnset.dragonbreath = ["9D"];
		this.modData('Learnsets','ekans').learnset.bind = ["9L1"];
		this.modData('Learnsets','ekans').learnset.mortalstrike = ["9L63"];
		this.modData('Learnsets','arbok').learnset.gunkshot = ["9M"];
		this.modData('Learnsets','arbok').learnset.nightmare = ["9M"];
		this.modData('Learnsets','arbok').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','arbok').learnset.earthquake;
		delete this.modData('Learnsets','arbok').learnset.wrap;
		// Pikachu
		this.modData('Learnsets','pikachu').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','pikachu').learnset.particleslam = ["9L50"];
		this.modData('Learnsets','pikachu').learnset.wildcharge = ["9M"];
		this.modData('Learnsets','pikachu').learnset.flash = ["9M"];
		this.modData('Learnsets','pikachu').learnset.metronome = ["9M"];
		delete this.modData('Learnsets','pikachu').learnset.knockoff;
		// Raichu
		this.modData('Learnsets','raichu').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','raichu').learnset.completeshock = ["9L1"];
		this.modData('Learnsets','raichu').learnset.particleslam = ["9L1"];
		this.modData('Learnsets','raichu').learnset.wildcharge = ["9M"];
		this.modData('Learnsets','raichu').learnset.flash = ["9M"];
		this.modData('Learnsets','raichu').learnset.metronome = ["9M"];
		// Raichu Alola
		this.modData('Learnsets','raichualola').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','raichualola').learnset.particleslam = ["9L1"];
		this.modData('Learnsets','raichualola').learnset.flash = ["9M"];
		this.modData('Learnsets','raichualola').learnset.metronome = ["9M"];
		// Sandshrew
		this.modData('Learnsets','sandshrew').learnset.steamroller = ["9D"];
		this.modData('Learnsets','sandshrew').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','sandshrew').learnset.trailhead = ["9M"];
		this.modData('Learnsets','sandshrew').learnset.vitaldrain = ["9M"];
		this.modData('Learnsets','sandshrew').learnset.sandblast = ["9E"];
		delete this.modData('Learnsets','sandshrew').learnset.mudshot;
		delete this.modData('Learnsets','sandshrew').learnset.knockoff;
		delete this.modData('Learnsets','sandshrew').learnset.leechlife;
		// Sandshrew Alola
		this.modData('Learnsets','sandshrewalola').learnset.steamroller = ["9D"];
		this.modData('Learnsets','sandshrewalola').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','sandshrewalola').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','sandshrewalola').learnset.trailhead = ["9M"];
		this.modData('Learnsets','sandshrewalola').learnset.vitaldrain = ["9M"];
		this.modData('Learnsets','sandshrewalola').learnset.rockclimb = ["9E"];
		delete this.modData('Learnsets','sandshrewalola').learnset.knockoff;
		delete this.modData('Learnsets','sandshrewalola').learnset.leechlife;
		// Sandslash
		this.modData('Learnsets','sandslash').learnset.spikes = ["9D"];
		this.modData('Learnsets','sandslash').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','sandslash').learnset.trailhead = ["9M"];
		this.modData('Learnsets','sandslash').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','sandslash').learnset.leechlife;
		// Sandslash Alola
		this.modData('Learnsets','sandslashalola').learnset.spikes = ["9D"];
		this.modData('Learnsets','sandslashalola').learnset.metaledge = ["9L1"];
		this.modData('Learnsets','sandslashalola').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','sandslashalola').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','sandslashalola').learnset.trailhead = ["9M"];
		this.modData('Learnsets','sandslashalola').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','sandslashalola').learnset.knockoff;
		delete this.modData('Learnsets','sandslashalola').learnset.leechlife;
		// Nidoran♀
		this.modData('Learnsets','nidoranf').learnset.moonlight = ["9D"];
		this.modData('Learnsets','nidoranf').learnset.poisonfang = ["9L37"];
		this.modData('Learnsets','nidoranf').learnset.crunch = ["9L45"];
		this.modData('Learnsets','nidoranf').learnset.amnesia = ["9M"];
		this.modData('Learnsets','nidoranf').learnset.chillywater = ["9M"];
		this.modData('Learnsets','nidoranf').learnset.faketears = ["9M"];
		this.modData('Learnsets','nidoranf').learnset.shockwave = ["9M"];
		this.modData('Learnsets','nidoranf').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','nidoranf').learnset.blizzard;
		delete this.modData('Learnsets','nidoranf').learnset.icebeam;
		delete this.modData('Learnsets','nidoranf').learnset.thunder;
		delete this.modData('Learnsets','nidoranf').learnset.thunderbolt;
		// Nidorina
		this.modData('Learnsets','nidorina').learnset.moonlight = ["9D"];
		this.modData('Learnsets','nidorina').learnset.poisonfang = ["9L43"];
		this.modData('Learnsets','nidorina').learnset.crunch = ["9L53"];
		this.modData('Learnsets','nidorina').learnset.barbbarrage = ["9L58"];
		this.modData('Learnsets','nidorina').learnset.amnesia = ["9M"];
		this.modData('Learnsets','nidorina').learnset.chillywater = ["9M"];
		this.modData('Learnsets','nidorina').learnset.faketears = ["9M"];
		this.modData('Learnsets','nidorina').learnset.shockwave = ["9M"];
		this.modData('Learnsets','nidorina').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','nidorina').learnset.blizzard;
		delete this.modData('Learnsets','nidorina').learnset.icebeam;
		delete this.modData('Learnsets','nidorina').learnset.thunder;
		delete this.modData('Learnsets','nidorina').learnset.thunderbolt;
		// Nidoqueen
		this.modData('Learnsets','nidoqueen').learnset.moonlight = ["9D"];
		this.modData('Learnsets','nidoqueen').learnset.barbbarrage = ["9L1"];
		this.modData('Learnsets','nidoqueen').learnset.amnesia = ["9M"];
		this.modData('Learnsets','nidoqueen').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','nidoqueen').learnset.chillywater = ["9M"];
		this.modData('Learnsets','nidoqueen').learnset.faketears = ["9M"];
		this.modData('Learnsets','nidoqueen').learnset.toxic = ["9M"];
		this.modData('Learnsets','nidoqueen').learnset.shockwave = ["9M"];
		this.modData('Learnsets','nidoqueen').learnset.meteorbeam = ["9T"];
		// Nidoran♂
		this.modData('Learnsets','nidoranm').learnset.moonlight = ["9D"];
		this.modData('Learnsets','nidoranm').learnset.mortalstrike = ["9L45"];
		this.modData('Learnsets','nidoranm').learnset.chillywater = ["9M"];
		this.modData('Learnsets','nidoranm').learnset.screech = ["9M"];
		this.modData('Learnsets','nidoranm').learnset.shockwave = ["9M"];
		this.modData('Learnsets','nidoranm').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','nidoranm').learnset.blizzard;
		delete this.modData('Learnsets','nidoranm').learnset.icebeam;
		delete this.modData('Learnsets','nidoranm').learnset.horndrill;
		delete this.modData('Learnsets','nidoranm').learnset.thunder;
		delete this.modData('Learnsets','nidoranm').learnset.thunderbolt;
		// Nidorino
		this.modData('Learnsets','nidorino').learnset.moonlight = ["9D"];
		this.modData('Learnsets','nidorino').learnset.mortalstrike = ["9L53"];
		this.modData('Learnsets','nidorino').learnset.chillywater = ["9M"];
		this.modData('Learnsets','nidorino').learnset.screech = ["9M"];
		this.modData('Learnsets','nidorino').learnset.shockwave = ["9M"];
		this.modData('Learnsets','nidorino').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','nidorino').learnset.blizzard;
		delete this.modData('Learnsets','nidorino').learnset.icebeam;
		delete this.modData('Learnsets','nidorino').learnset.thunder;
		delete this.modData('Learnsets','nidorino').learnset.thunderbolt;
		// Nidoking
		this.modData('Learnsets','nidoking').learnset.moonlight = ["9D"];
		this.modData('Learnsets','nidoking').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','nidoking').learnset.chillywater = ["9M"];
		this.modData('Learnsets','nidoking').learnset.screech = ["9M"];
		this.modData('Learnsets','nidoking').learnset.shockwave = ["9M"];
		this.modData('Learnsets','nidoking').learnset.toxic = ["9M"];
		this.modData('Learnsets','nidoking').learnset.meteorbeam = ["9T"];
		// Clefairy
		this.modData('Learnsets','clefairy').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','clefairy').learnset.flash = ["9M"];
		this.modData('Learnsets','clefairy').learnset.alluringvoice = ["9L24"];
		this.modData('Learnsets','clefairy').learnset.lifedew = ["9L28"];
		this.modData('Learnsets','clefairy').learnset.storedpower = ["9L40"];
		this.modData('Learnsets','clefairy').learnset.chillywater = ["9M"];
		this.modData('Learnsets','clefairy').learnset.nightmare = ["9M"];
		this.modData('Learnsets','clefairy').learnset.shockwave = ["9M"];
		delete this.modData('Learnsets','clefairy').learnset.blizzard;
		delete this.modData('Learnsets','clefairy').learnset.bodyslam;
		delete this.modData('Learnsets','clefairy').learnset.bounce;
		delete this.modData('Learnsets','clefairy').learnset.fireblast;
		delete this.modData('Learnsets','clefairy').learnset.flamethrower;
		delete this.modData('Learnsets','clefairy').learnset.icebeam;
		delete this.modData('Learnsets','clefairy').learnset.knockoff;
		delete this.modData('Learnsets','clefairy').learnset.thunder;
		delete this.modData('Learnsets','clefairy').learnset.thunderbolt;
		// Clefable
		this.modData('Learnsets','clefable').learnset.lunardance = ["9D"];
		this.modData('Learnsets','clefable').learnset.alluringvoice = ["9L1"];
		this.modData('Learnsets','clefable').learnset.lifedew = ["9L1"];
		this.modData('Learnsets','clefable').learnset.chillywater = ["9M"];
		this.modData('Learnsets','clefable').learnset.flash = ["9M"];
		this.modData('Learnsets','clefable').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','clefable').learnset.bodyslam;
		delete this.modData('Learnsets','clefable').learnset.bounce;
		delete this.modData('Learnsets','clefable').learnset.knockoff;
		delete this.modData('Learnsets','clefable').learnset.thunder;
		// Vulpix
		this.modData('Learnsets','vulpix').learnset.weatherball = ["9D"];
		this.modData('Learnsets','vulpix').learnset.mysticalfire = ["9E"];
		// Vulpix Alola
		this.modData('Learnsets','vulpixalola').learnset.weatherball = ["9D"];
		// Ninetales
		this.modData('Learnsets','ninetales').learnset.weatherball = ["9D"];
		// Ninetales Alola
		this.modData('Learnsets','ninetalesalola').learnset.weatherball = ["9D"];
		// Jigglypuff
		this.modData('Learnsets','jigglypuff').learnset.boomburst = ["9D"];
		this.modData('Learnsets','jigglypuff').learnset.pound = ["9L1"];
		this.modData('Learnsets','jigglypuff').learnset.aerate = ["9L3"];
		this.modData('Learnsets','jigglypuff').learnset.alluringvoice = ["9L35"];
		this.modData('Learnsets','jigglypuff').learnset.rebound = ["9L49"];
		this.modData('Learnsets','jigglypuff').learnset.flash = ["9M"];
		delete this.modData('Learnsets','jigglypuff').learnset.blizzard;
		delete this.modData('Learnsets','jigglypuff').learnset.fireblast;
		delete this.modData('Learnsets','jigglypuff').learnset.gyroball;
		delete this.modData('Learnsets','jigglypuff').learnset.flamethrower;
		delete this.modData('Learnsets','jigglypuff').learnset.icebeam;
		delete this.modData('Learnsets','jigglypuff').learnset.knockoff;
		delete this.modData('Learnsets','jigglypuff').learnset.nightmare;
		delete this.modData('Learnsets','jigglypuff').learnset.thunder;
		delete this.modData('Learnsets','jigglypuff').learnset.thunderbolt;
		// Wigglytuff
		this.modData('Learnsets','wigglytuff').learnset.boomburst = ["9D"];
		this.modData('Learnsets','wigglytuff').learnset.aerate = ["9L1"];
		this.modData('Learnsets','wigglytuff').learnset.alluringvoice = ["9L1"];
		this.modData('Learnsets','wigglytuff').learnset.flash = ["9M"];
		this.modData('Learnsets','wigglytuff').learnset.moonblast = ["9L1"];
		this.modData('Learnsets','wigglytuff').learnset.rebound = ["9L1"];
		delete this.modData('Learnsets','wigglytuff').learnset.blizzard;
		delete this.modData('Learnsets','wigglytuff').learnset.fireblast;
		delete this.modData('Learnsets','wigglytuff').learnset.flamethrower;
		delete this.modData('Learnsets','wigglytuff').learnset.gyroball;
		delete this.modData('Learnsets','wigglytuff').learnset.icebeam;
		delete this.modData('Learnsets','wigglytuff').learnset.knockoff;
		delete this.modData('Learnsets','wigglytuff').learnset.nightmare;
		delete this.modData('Learnsets','wigglytuff').learnset.thunder;
		delete this.modData('Learnsets','wigglytuff').learnset.thunderbolt;
		// Zubat
		this.modData('Learnsets','zubat').learnset.synchronoise = ["9D"];
		this.modData('Learnsets','zubat').learnset.acrobatics = ["9L31","9M"];
		this.modData('Learnsets','zubat').learnset.venoshock = ["9M"];
		this.modData('Learnsets','zubat').learnset.vitaldrain = ["9L37","9M"];
		delete this.modData('Learnsets','zubat').learnset.absorb;
		// Golbat
		this.modData('Learnsets','golbat').learnset.synchronoise = ["9D"];
		this.modData('Learnsets','golbat').learnset.acrobatics = ["9L25","9M"];
		this.modData('Learnsets','golbat').learnset.venoshock = ["9M"];
		this.modData('Learnsets','golbat').learnset.vitaldrain = ["9L43","9M"];
		delete this.modData('Learnsets','golbat').learnset.absorb;
		// Oddish
		this.modData('Learnsets','oddish').learnset.minimize = ["9D"];
		this.modData('Learnsets','oddish').learnset.toxic = ["9L35", "9M"];
		// Gloom
		this.modData('Learnsets','gloom').learnset.minimize = ["9D"];
		this.modData('Learnsets','gloom').learnset.toxic = ["9L39", "9M"];
		// Vileplume
		this.modData('Learnsets','vileplume').learnset.bunkerdown = ["9D"];
		this.modData('Learnsets','vileplume').learnset.toxic = ["9L1", "9M"];
		// Paras
		this.modData('Learnsets','paras').learnset.playdead = ["9D"];
		this.modData('Learnsets','paras').learnset.leechlife = ["9L11"];
		this.modData('Learnsets','paras').learnset.vitaldrain = ["9M"];
		this.modData('Learnsets','paras').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','paras').learnset.absorb;
		delete this.modData('Learnsets','paras').learnset.grassyterrain;
		delete this.modData('Learnsets','paras').learnset.knockoff;
		delete this.modData('Learnsets','paras').learnset.synthesis;
		// Parasect
		this.modData('Learnsets','parasect').learnset.playdead = ["9D"];
		this.modData('Learnsets','parasect').learnset.leechlife = ["9L11"];
		this.modData('Learnsets','parasect').learnset.vitaldrain = ["9M"];
		this.modData('Learnsets','parasect').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','parasect').learnset.absorb;
		delete this.modData('Learnsets','parasect').learnset.grassyterrain;
		delete this.modData('Learnsets','parasect').learnset.knockoff;
		delete this.modData('Learnsets','parasect').learnset.synthesis;
		// Venonat
		this.modData('Learnsets','venonat').learnset.powder = ["9D"];
		this.modData('Learnsets','venonat').learnset.bugcloud = ["9L5"];
		this.modData('Learnsets','venonat').learnset.supersonic = ["9L11"];
		this.modData('Learnsets','venonat').learnset.leechlife = ["9L13"];
		this.modData('Learnsets','venonat').learnset.poisonpowder = ["9L17"];
		this.modData('Learnsets','venonat').learnset.poisonfang = ["9L23"];
		this.modData('Learnsets','venonat').learnset.stunspore = ["9L25"];
		this.modData('Learnsets','venonat').learnset.springleap = ["9L29"];
		this.modData('Learnsets','venonat').learnset.sleeppowder = ["9L35"];
		this.modData('Learnsets','venonat').learnset.psybeam = ["9L37"];
		this.modData('Learnsets','venonat').learnset.signalbeam = ["9L41", "9M"];
		this.modData('Learnsets','venonat').learnset.psychic = ["9L47", "9M"];
		this.modData('Learnsets','venonat').learnset.vitaldrain = ["9L49", "9M"];
		this.modData('Learnsets','venonat').learnset.flash = ["9M"];
		this.modData('Learnsets','venonat').learnset.toxic = ["9M"];
		this.modData('Learnsets','venonat').learnset.zenheadbutt = ["9M"];
		delete this.modData('Learnsets','venonat').learnset.bugbuzz;
		delete this.modData('Learnsets','venonat').learnset.confusion;
		// Venomoth
		this.modData('Learnsets','venomoth').learnset.powder = ["9D"];
		this.modData('Learnsets','venomoth').learnset.silverwind = ["9L0"];
		this.modData('Learnsets','venomoth').learnset.bugcloud = ["9L5"];
		this.modData('Learnsets','venomoth').learnset.supersonic = ["9L11"];
		this.modData('Learnsets','venomoth').learnset.leechlife = ["9L13"];
		this.modData('Learnsets','venomoth').learnset.poisonpowder = ["9L17"];
		this.modData('Learnsets','venomoth').learnset.poisonfang = ["9L23"];
		this.modData('Learnsets','venomoth').learnset.stunspore = ["9L25"];
		this.modData('Learnsets','venomoth').learnset.springleap = ["9L29"];
		this.modData('Learnsets','venomoth').learnset.sleeppowder = ["9L37"];
		this.modData('Learnsets','venomoth').learnset.psybeam = ["9L41"];
		this.modData('Learnsets','venomoth').learnset.signalbeam = ["9L47", "9M"];
		this.modData('Learnsets','venomoth').learnset.psychic = ["9L55", "9M"];
		this.modData('Learnsets','venomoth').learnset.vitaldrain = ["9L59", "9M"];
		this.modData('Learnsets','venomoth').learnset.bugbuzz = ["9L63"];
		this.modData('Learnsets','venomoth').learnset.quiverdance = ["9L69"];
		this.modData('Learnsets','venomoth').learnset.flash = ["9M"];
		this.modData('Learnsets','venomoth').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','venomoth').learnset.confusion;
		delete this.modData('Learnsets','venomoth').learnset.gust;
		// Diglett
		this.modData('Learnsets','diglett').learnset.minimize = ["9D"];
		this.modData('Learnsets','diglett').learnset.escapetunnel = ["9L46"];
		delete this.modData('Learnsets','diglett').learnset.allyswitch;
		// Diglett Alola
		this.modData('Learnsets','diglettalola').learnset.minimize = ["9D"];
		this.modData('Learnsets','diglettalola').learnset.escapetunnel = ["9L46"];
		this.modData('Learnsets','diglettalola').learnset.honeclaws = ["9M"];
		delete this.modData('Learnsets','diglettalola').learnset.allyswitch;
		// Dugtrio
		this.modData('Learnsets','dugtrio').learnset.minimize = ["9D"];
		this.modData('Learnsets','dugtrio').learnset.escapetunnel = ["9L58"];
		delete this.modData('Learnsets','dugtrio').learnset.allyswitch;
		delete this.modData('Learnsets','dugtrio').learnset.sludgewave;
		// Dugtrio Alola
		this.modData('Learnsets','dugtrioalola').learnset.minimize = ["9D"];
		this.modData('Learnsets','dugtrioalola').learnset.escapetunnel = ["9L58"];
		this.modData('Learnsets','dugtrioalola').learnset.honeclaws = ["9M"];
		delete this.modData('Learnsets','dugtrioalola').learnset.allyswitch;
		delete this.modData('Learnsets','dugtrioalola').learnset.sludgewave;
		// Meowth
		this.modData('Learnsets','meowth').learnset.mefirst = ["9D"];
		this.modData('Learnsets','meowth').learnset.trumpcard = ["9L55"];
		this.modData('Learnsets','meowth').learnset.flash = ["9M"];
		delete this.modData('Learnsets','meowth').learnset.nightmare;
		delete this.modData('Learnsets','meowth').learnset.thunder;
		delete this.modData('Learnsets','meowth').learnset.thunderbolt;
		// Meowth Alola
		this.modData('Learnsets','meowthalola').learnset.mefirst = ["9D"];
		this.modData('Learnsets','meowthalola').learnset.flash = ["9M"];
		this.modData('Learnsets','meowthalola').learnset.honeclaws = ["9M"];
		delete this.modData('Learnsets','meowthalola').learnset.thunder;
		delete this.modData('Learnsets','meowthalola').learnset.thunderbolt;
		// Meowth Galar
		this.modData('Learnsets','meowthgalar').learnset.mefirst = ["9D"];
		this.modData('Learnsets','meowthgalar').learnset.feintattack = ["9L22"];
		this.modData('Learnsets','meowthgalar').learnset.metalsound = ["9L46"];
		this.modData('Learnsets','meowthgalar').learnset.metaledge = ["9L55"];
		this.modData('Learnsets','meowthgalar').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','meowthgalar').learnset.flash = ["9M"];
		this.modData('Learnsets','meowthgalar').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','meowthgalar').learnset.knockoff = ["9M"];
		this.modData('Learnsets','meowthgalar').learnset.lastresort = ["9M"];
		this.modData('Learnsets','meowthgalar').learnset.psychup = ["9M"];
		this.modData('Learnsets','meowthgalar').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','meowthgalar').learnset.shockwave = ["9M"];
		this.modData('Learnsets','meowthgalar').learnset.snatch = ["9M"];
		this.modData('Learnsets','meowthgalar').learnset.torment = ["9M"];
		delete this.modData('Learnsets','meowthgalar').learnset.captivate;
		delete this.modData('Learnsets','meowthgalar').learnset.gyroball;
		delete this.modData('Learnsets','meowthgalar').learnset.thrash;
		delete this.modData('Learnsets','meowthgalar').learnset.thunder;
		// Persian
		this.modData('Learnsets','persian').learnset.mefirst = ["9D"];
		this.modData('Learnsets','persian').learnset.trumpcard = ["969"];
		this.modData('Learnsets','persian').learnset.flash = ["9M"];
		delete this.modData('Learnsets','persian').learnset.nightmare;
		delete this.modData('Learnsets','persian').learnset.thunder;
		// Persian Alola
		this.modData('Learnsets','persianalola').learnset.mefirst = ["9D"];
		this.modData('Learnsets','persianalola').learnset.flash = ["9M"];
		this.modData('Learnsets','persianalola').learnset.honeclaws = ["9M"];
		delete this.modData('Learnsets','persianalola').learnset.thunder;
		// Psyduck
		this.modData('Learnsets','psyduck').learnset.mindbend = ["9D"];
		delete this.modData('Learnsets','psyduck').learnset.blizzard;
		delete this.modData('Learnsets','psyduck').learnset.trailhead;
		// Golduck
		this.modData('Learnsets','golduck').learnset.spotlight = ["9D"];
		this.modData('Learnsets','golduck').learnset.flash = ["9M"];
		delete this.modData('Learnsets','golduck').learnset.blizzard;
		// Mankey
		this.modData('Learnsets','mankey').learnset.megapunch = ["9D"];
		delete this.modData('Learnsets','mankey').learnset.earthquake;
		delete this.modData('Learnsets','mankey').learnset.thunder;
		delete this.modData('Learnsets','mankey').learnset.thunderbolt;
		// Primeape
		this.modData('Learnsets','primeape').learnset.megapunch = ["9D"];
		delete this.modData('Learnsets','primeape').learnset.thunder;
		delete this.modData('Learnsets','primeape').learnset.thunderbolt;
		// Growlithe
		this.modData('Learnsets','growlithe').learnset.playnice = ["9D"];
		this.modData('Learnsets','growlithe').learnset.charm = ["9M"];
		this.modData('Learnsets','growlithe').learnset.temperflare = ["9E"];
		// Growlithe-Hisui
		this.modData('Learnsets','growlithehisui').learnset.pursuit = ["9D"];
		this.modData('Learnsets','growlithehisui').learnset.temperflare = ["9E"];
		// Arcanine
		this.modData('Learnsets','arcanine').learnset.nobleroar = ["9D"];
		this.modData('Learnsets','arcanine').learnset.charm = ["9M"];
		// Arcanine-Hisui
		this.modData('Learnsets','arcaninehisui').learnset.nobleroar = ["9D"];
		this.modData('Learnsets','arcaninehisui').learnset.laserfocus = ["9M"];
		// Poliwag
		this.modData('Learnsets','poliwag').learnset.slipaway = ["9D"];
		delete this.modData('Learnsets','poliwag').learnset.blizzard;
		// Poliwhirl
		this.modData('Learnsets','poliwhirl').learnset.slipaway = ["9D"];
		delete this.modData('Learnsets','poliwhirl').learnset.blizzard;
		delete this.modData('Learnsets','poliwhirl').learnset.earthquake;
		// Poliwrath
		this.modData('Learnsets','poliwrath').learnset.wavecrash = ["9D"];
		this.modData('Learnsets','poliwrath').learnset.bodypress = ["9M"];
		delete this.modData('Learnsets','poliwrath').learnset.blizzard;
		// Abra
		this.modData('Learnsets','abra').learnset.flash = ["9M"];
		this.modData('Learnsets','abra').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','abra').learnset.knockoff;
		// Kadabra
		this.modData('Learnsets','kadabra').learnset.doubleteam = ["9D"];
		this.modData('Learnsets','kadabra').learnset.confusion = ["9L0"];
		this.modData('Learnsets','kadabra').learnset.flash = ["9M"];
		this.modData('Learnsets','kadabra').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','kadabra').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','kadabra').learnset.knockoff;
		// Alakazam
		this.modData('Learnsets','alakazam').learnset.doubleteam = ["9D"];
		this.modData('Learnsets','alakazam').learnset.eeriespell = ["9L0"];
		this.modData('Learnsets','alakazam').learnset.confusion = ["9L1"];
		this.modData('Learnsets','alakazam').learnset.flash = ["9M"];
		this.modData('Learnsets','alakazam').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','alakazam').learnset.knockoff;
		// Machop
		this.modData('Learnsets','machop').learnset.holdback = ["9D"];
		this.modData('Learnsets','machop').learnset.poweruppunch = ["9E"];
		delete this.modData('Learnsets','machop').learnset.flamethrower;
		// Machoke
		this.modData('Learnsets','machoke').learnset.holdback = ["9D"];
		delete this.modData('Learnsets','machoke').learnset.flamethrower;
		// Machamp
		this.modData('Learnsets','machamp').learnset.lashout = ["9D"];
		delete this.modData('Learnsets','machamp').learnset.flamethrower;
		// Bellsprout
		this.modData('Learnsets','bellsprout').learnset.venomdrench = ["9D"];
		this.modData('Learnsets','bellsprout').learnset.toxic = ["9M"];
		this.modData('Learnsets','bellsprout').learnset.vitaldrain = ["9M"];
		// Weepinbell
		this.modData('Learnsets','weepinbell').learnset.venomdrench = ["9D"];
		this.modData('Learnsets','weepinbell').learnset.toxic = ["9M"];
		this.modData('Learnsets','weepinbell').learnset.vitaldrain = ["9M"];
		// Victreebell
		this.modData('Learnsets','victreebell').learnset.venomdrench = ["9D"];
		this.modData('Learnsets','victreebell').learnset.belch = ["9L1"];
		this.modData('Learnsets','victreebell').learnset.vitaldrain = ["9L1", "9M"];
		this.modData('Learnsets','victreebell').learnset.grassyterrain = ["9M"];
		this.modData('Learnsets','victreebell').learnset.toxic = ["9M"];
		// Tentacool
		this.modData('Learnsets','tentacool').learnset.doublehit = ["9D"];
		this.modData('Learnsets','tentacool').learnset.chillywater = ["9M"];
		this.modData('Learnsets','tentacool').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','tentacool').learnset.blizzard;
		delete this.modData('Learnsets','tentacool').learnset.waterfall;
		// Tentacruel
		this.modData('Learnsets','tentacruel').learnset.lashout = ["9D"];
		this.modData('Learnsets','tentacruel').learnset.chillywater = ["9M"];
		this.modData('Learnsets','tentacruel').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','tentacruel').learnset.blizzard;
		delete this.modData('Learnsets','tentacruel').learnset.waterfall;
		// Geodude
		this.modData('Learnsets','geodude').learnset.camouflage = ["9D"];
		this.modData('Learnsets','geodude').learnset.rapidspin = ["9E"];
		delete this.modData('Learnsets','geodude').learnset.fireblast;
		delete this.modData('Learnsets','geodude').learnset.flamethrower;
		// Geodude Alola
		this.modData('Learnsets','geodudealola').learnset.electrify = ["9D"];
		this.modData('Learnsets','geodudealola').learnset.particleslam = ["9L34"];
		this.modData('Learnsets','geodudealola').learnset.electroball = ["9M"];
		this.modData('Learnsets','geodudealola').learnset.flash = ["9M"];
		this.modData('Learnsets','geodudealola').learnset.incinerate = ["9M"];
		this.modData('Learnsets','geodudealola').learnset.powergem = ["9M"];
		this.modData('Learnsets','geodudealola').learnset.shockwave = ["9M"];
		this.modData('Learnsets','geodudealola').learnset.rapidspin = ["9E"];
		delete this.modData('Learnsets','geodudealola').learnset.brutalswing;
		delete this.modData('Learnsets','geodudealola').learnset.discharge;
		delete this.modData('Learnsets','geodudealola').learnset.fireblast;
		delete this.modData('Learnsets','geodudealola').learnset.flamethrower;
		// Graveler
		this.modData('Learnsets','graveler').learnset.camouflage = ["9D"];
		delete this.modData('Learnsets','graveler').learnset.fireblast;
		delete this.modData('Learnsets','graveler').learnset.flamethrower;
		// Graveler Alola
		this.modData('Learnsets','graveleralola').learnset.electrify = ["9D"];
		this.modData('Learnsets','graveleralola').learnset.particleslam = ["9L40"];
		this.modData('Learnsets','graveleralola').learnset.electroball = ["9M"];
		this.modData('Learnsets','graveleralola').learnset.flash = ["9M"];
		this.modData('Learnsets','graveleralola').learnset.incinerate = ["9M"];
		this.modData('Learnsets','graveleralola').learnset.powergem = ["9M"];
		delete this.modData('Learnsets','graveleralola').learnset.brutalswing;
		delete this.modData('Learnsets','graveleralola').learnset.discharge;
		delete this.modData('Learnsets','graveleralola').learnset.fireblast;
		delete this.modData('Learnsets','graveleralola').learnset.flamethrower;
		// Golem
		this.modData('Learnsets','golem').learnset.shelter = ["9D"];
		delete this.modData('Learnsets','golem').learnset.fireblast;
		delete this.modData('Learnsets','golem').learnset.flamethrower;
		// Golem Alola
		this.modData('Learnsets','golemalola').learnset.rockwrecker = ["9D"];
		this.modData('Learnsets','golemalola').learnset.particleslam = ["9L40"];
		this.modData('Learnsets','golemalola').learnset.electroball = ["9M"];
		this.modData('Learnsets','golemalola').learnset.flash = ["9M"];
		this.modData('Learnsets','golemalola').learnset.incinerate = ["9M"];
		this.modData('Learnsets','golemalola').learnset.powergem = ["9M"];
		delete this.modData('Learnsets','golemalola').learnset.brutalswing;
		delete this.modData('Learnsets','golemalola').learnset.discharge;
		delete this.modData('Learnsets','golemalola').learnset.fireblast;
		delete this.modData('Learnsets','golemalola').learnset.flamethrower;
		// Ponyta
		this.modData('Learnsets','ponyta').learnset.hornleech = ["9D"];
		this.modData('Learnsets','ponyta').learnset.flamecharge = ["9L13", "9M"];
		this.modData('Learnsets','ponyta').learnset.firespin = ["9L21"];
		this.modData('Learnsets','ponyta').learnset.takedown = ["9L25"];
		this.modData('Learnsets','ponyta').learnset.temperflare = ["9L29"];
		this.modData('Learnsets','ponyta').learnset.flash = ["9M"];
		this.modData('Learnsets','ponyta').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','ponyta').learnset.allyswitch;
		delete this.modData('Learnsets','ponyta').learnset.flamewheel;
		// Ponyta Galar
		this.modData('Learnsets','ponytagalar').learnset.hornleech = ["9D"];
		this.modData('Learnsets','ponytagalar').learnset.fairywind = ["9L13"];
		this.modData('Learnsets','ponytagalar').learnset.healpulse = ["9L21"];
		this.modData('Learnsets','ponytagalar').learnset.takedown = ["9L25"];
		this.modData('Learnsets','ponytagalar').learnset.psybeam = ["9L29"];
		this.modData('Learnsets','ponytagalar').learnset.aquatail = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.dreameater = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.healbell = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.psychup = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.roleplay = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.trailhead = ["9M"];
		this.modData('Learnsets','ponytagalar').learnset.moonlight = ["9E"];
		delete this.modData('Learnsets','ponytagalar').learnset.morningsun;
		// Rapidash
		this.modData('Learnsets','rapidash').learnset.hornleech = ["9D"];
		this.modData('Learnsets','rapidash').learnset.flamecharge = ["9L13", "9M"];
		this.modData('Learnsets','rapidash').learnset.firespin = ["9L21"];
		this.modData('Learnsets','rapidash').learnset.takedown = ["9L25"];
		this.modData('Learnsets','rapidash').learnset.temperflare = ["9L29"];
		this.modData('Learnsets','rapidash').learnset.flash = ["9M"];
		this.modData('Learnsets','rapidash').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','rapidash').learnset.allyswitch;
		// Rapidash Galar
		this.modData('Learnsets','rapidashgalar').learnset.hornleech = ["9D"];
		this.modData('Learnsets','rapidashgalar').learnset.fairywind = ["9L13"];
		this.modData('Learnsets','rapidashgalar').learnset.healpulse = ["9L21"];
		this.modData('Learnsets','rapidashgalar').learnset.takedown = ["9L25"];
		this.modData('Learnsets','rapidashgalar').learnset.psybeam = ["9L29"];
		this.modData('Learnsets','rapidashgalar').learnset.aquatail = ["9M"];
		this.modData('Learnsets','rapidashgalar').learnset.dreameater = ["9M"];
		this.modData('Learnsets','rapidashgalar').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','rapidashgalar').learnset.healbell = ["9M"];
		this.modData('Learnsets','rapidashgalar').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','rapidashgalar').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','rapidashgalar').learnset.psychup = ["9M"];
		this.modData('Learnsets','rapidashgalar').learnset.roleplay = ["9M"];
		this.modData('Learnsets','rapidashgalar').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','rapidashgalar').learnset.trailhead = ["9M"];
		// Slowpoke
		this.modData('Learnsets','slowpoke').learnset.autotomize = ["9D"];
		this.modData('Learnsets','slowpoke').learnset.stasis = ["9T"];
		delete this.modData('Learnsets','slowpoke').learnset.blizzard;
		delete this.modData('Learnsets','slowpoke').learnset.earthquake;
		delete this.modData('Learnsets','slowpoke').learnset.fireblast;
		delete this.modData('Learnsets','slowpoke').learnset.flamethrower;
		delete this.modData('Learnsets','slowpoke').learnset.flash;
		delete this.modData('Learnsets','slowpoke').learnset.nightmare;
		delete this.modData('Learnsets','slowpoke').learnset.waterfall;
		// Slowpoke Galar
		this.modData('Learnsets','slowpokegalar').learnset.autotomize = ["9D"];
		this.modData('Learnsets','slowpokegalar').learnset.afteryou = ["9M"];
		this.modData('Learnsets','slowpokegalar').learnset.block = ["9M"];
		this.modData('Learnsets','slowpokegalar').learnset.incinerate = ["9M"];
		this.modData('Learnsets','slowpokegalar').learnset.psychup = ["9M"];
		this.modData('Learnsets','slowpokegalar').learnset.stasis = ["9T"];
		delete this.modData('Learnsets','slowpokegalar').learnset.blizzard;
		delete this.modData('Learnsets','slowpokegalar').learnset.earthquake;
		delete this.modData('Learnsets','slowpokegalar').learnset.fireblast;
		delete this.modData('Learnsets','slowpokegalar').learnset.flamethrower;
		delete this.modData('Learnsets','slowpokegalar').learnset.waterfall;
		// Slowbro
		this.modData('Learnsets','slowbro').learnset.razorshell = ["9D"];
		this.modData('Learnsets','slowbro').learnset.stasis = ["9T"];
		delete this.modData('Learnsets','slowbro').learnset.blizzard;
		delete this.modData('Learnsets','slowbro').learnset.earthquake;
		delete this.modData('Learnsets','slowbro').learnset.fireblast;
		delete this.modData('Learnsets','slowbro').learnset.flash;
		delete this.modData('Learnsets','slowbro').learnset.metronome;
		delete this.modData('Learnsets','slowbro').learnset.nightmare;
		delete this.modData('Learnsets','slowbro').learnset.waterfall;
		// Slowbro Galar
		this.modData('Learnsets','slowbrogalar').learnset.snipeshot = ["9D"];
		this.modData('Learnsets','slowbrogalar').learnset.afteryou = ["9M"];
		this.modData('Learnsets','slowbrogalar').learnset.block = ["9M"];
		this.modData('Learnsets','slowbrogalar').learnset.incinerate = ["9M"];
		this.modData('Learnsets','slowbrogalar').learnset.psychup = ["9M"];
		this.modData('Learnsets','slowbrogalar').learnset.toxic = ["9M"];
		this.modData('Learnsets','slowbrogalar').learnset.stasis = ["9T"];
		delete this.modData('Learnsets','slowbrogalar').learnset.blizzard;
		delete this.modData('Learnsets','slowbrogalar').learnset.earthquake;
		delete this.modData('Learnsets','slowbrogalar').learnset.fireblast;
		delete this.modData('Learnsets','slowbrogalar').learnset.metronome;
		delete this.modData('Learnsets','slowbrogalar').learnset.waterfall;
		// Magnemite
		this.modData('Learnsets','magnemite').learnset.electrify = ["9D"];
		this.modData('Learnsets','magnemite').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','magnemite').learnset.flash = ["9M"];
		// Magneton
		this.modData('Learnsets','magneton').learnset.electrify = ["9D"];
		this.modData('Learnsets','magneton').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','magneton').learnset.flash = ["9M"];
		// Farfetchd
		this.modData('Learnsets','farfetchd').learnset.sacredsword = ["9D"];
		this.modData('Learnsets','farfetchd').learnset.leer = ["9L1"];
		this.modData('Learnsets','farfetchd').learnset.furycutter = ["9L5"];
		this.modData('Learnsets','farfetchd').learnset.falseswipe = ["9L10", "9M"];
		this.modData('Learnsets','farfetchd').learnset.aerialace = ["9L15", "9M"];
		this.modData('Learnsets','farfetchd').learnset.swing = ["9L20"];
		this.modData('Learnsets','farfetchd').learnset.feint = ["9L30"];
		this.modData('Learnsets','farfetchd').learnset.slash = ["9L35"];
		this.modData('Learnsets','farfetchd').learnset.cut = ["9L40"];
		this.modData('Learnsets','farfetchd').learnset.leafblade = ["9L55"];
		this.modData('Learnsets','farfetchd').learnset.punishment = ["9E"];
		// Farfetchd Galar
		this.modData('Learnsets','farfetchdgalar').learnset.woodhammer = ["9D"];
		this.modData('Learnsets','farfetchdgalar').learnset.leer = ["9L1"];
		this.modData('Learnsets','farfetchdgalar').learnset.furycutter = ["9L5"];
		this.modData('Learnsets','farfetchdgalar').learnset.rocksmash = ["9L10", "9M"];
		this.modData('Learnsets','farfetchdgalar').learnset.brutalswing = ["9L15", "9M"];
		this.modData('Learnsets','farfetchdgalar').learnset.swing = ["9L20"];
		this.modData('Learnsets','farfetchdgalar').learnset.compensation = ["9M"];
		this.modData('Learnsets','farfetchdgalar').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','farfetchdgalar').learnset.lastresort = ["9M"];
		this.modData('Learnsets','farfetchdgalar').learnset.strength = ["9M"];
		this.modData('Learnsets','farfetchdgalar').learnset.punishment = ["9E"];
		this.modData('Learnsets','farfetchdgalar').learnset.solarblade = ["9E"];
		delete this.modData('Learnsets','farfetchdgalar').learnset.simplebeam;
		// Doduo
		this.modData('Learnsets','doduo').learnset.eggbomb = ["9D"];
		this.modData('Learnsets','doduo').learnset.screech = ["9M"];
		delete this.modData('Learnsets','doduo').learnset.knockoff;
		// Dodrio
		this.modData('Learnsets','dodrio').learnset.eggbomb = ["9D"];
		this.modData('Learnsets','dodrio').learnset.screech = ["9M"];
		delete this.modData('Learnsets','dodrio').learnset.knockoff;
		// Seel
		this.modData('Learnsets','seel').learnset.slackoff = ["9D"];
		this.modData('Learnsets','seel').learnset.amnesia = ["9M"];
		// Dewgong
		this.modData('Learnsets','dewgong').learnset.slackoff = ["9D"];
		this.modData('Learnsets','dewgong').learnset.watersport = ["9L7"];
		this.modData('Learnsets','dewgong').learnset.amnesia = ["9M"];
		// Grimer
		this.modData('Learnsets','grimer').learnset.slipaway = ["9D"];
		this.modData('Learnsets','grimer').learnset.nightmare = ["9M"];
		this.modData('Learnsets','grimer').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','grimer').learnset.fireblast;
		delete this.modData('Learnsets','grimer').learnset.flamethrower;
		delete this.modData('Learnsets','grimer').learnset.thunder;
		delete this.modData('Learnsets','grimer').learnset.thunderbolt;
		// Grimer Alola
		this.modData('Learnsets','grimeralola').learnset.purify = ["9D"];
		this.modData('Learnsets','grimeralola').learnset.powergem = ["9M"];
		this.modData('Learnsets','grimeralola').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','grimeralola').learnset.brutalswing;
		delete this.modData('Learnsets','grimeralola').learnset.fireblast;
		delete this.modData('Learnsets','grimeralola').learnset.flamethrower;
		delete this.modData('Learnsets','grimeralola').learnset.thunder;
		delete this.modData('Learnsets','grimeralola').learnset.thunderbolt;
		// Muk
		this.modData('Learnsets','muk').learnset.slipaway = ["9D"];
		this.modData('Learnsets','muk').learnset.nightmare = ["9M"];
		this.modData('Learnsets','muk').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','muk').learnset.fireblast;
		delete this.modData('Learnsets','muk').learnset.thunder;
		// Muk Alola
		this.modData('Learnsets','mukalola').learnset.purify = ["9D"];
		this.modData('Learnsets','mukalola').learnset.powergem = ["9M"];
		this.modData('Learnsets','mukalola').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','mukalola').learnset.fireblast;
		delete this.modData('Learnsets','mukalola').learnset.thunder;
		// Shellder
		this.modData('Learnsets','shellder').learnset.sharpen = ["9D"];
		this.modData('Learnsets','shellder').learnset.shelter = ["9L61"];
		this.modData('Learnsets','shellder').learnset.hydropump = ["9M"];
		this.modData('Learnsets','shellder').learnset.liquidation = ["9E"];
		delete this.modData('Learnsets','shellder').learnset.waterfall;
		// Cloyster
		this.modData('Learnsets','cloyster').learnset.sharpen = ["9D"];
		this.modData('Learnsets','cloyster').learnset.shelter = ["9L1"];
		this.modData('Learnsets','cloyster').learnset.hydropump = ["9M"];
		delete this.modData('Learnsets','cloyster').learnset.waterfall;
		// Gastly
		this.modData('Learnsets','gastly').learnset.poisonfang = ["9D"];
		this.modData('Learnsets','gastly').learnset.smog = ["9L1"];
		this.modData('Learnsets','gastly').learnset.poisongas = ["9L12"];
		this.modData('Learnsets','gastly').learnset.curse = ["9L15"];
		this.modData('Learnsets','gastly').learnset.nightshade = ["9L19"];
		this.modData('Learnsets','gastly').learnset.confuseray = ["9L22"];
		this.modData('Learnsets','gastly').learnset.suckerpunch = ["9L26"];
		this.modData('Learnsets','gastly').learnset.terrify = ["9L29"];
		this.modData('Learnsets','gastly').learnset.shadowball = ["9L33","9M"];
		this.modData('Learnsets','gastly').learnset.dreameater = ["9L36","9M"];
		this.modData('Learnsets','gastly').learnset.chillywater = ["9M"];
		this.modData('Learnsets','gastly').learnset.icebeam = ["9M"];
		this.modData('Learnsets','gastly').learnset.payback = ["9M"];
		this.modData('Learnsets','gastly').learnset.shockwave = ["9M"];
		this.modData('Learnsets','gastly').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','gastly').learnset.firepunch;
		delete this.modData('Learnsets','gastly').learnset.icepunch;
		delete this.modData('Learnsets','gastly').learnset.knockoff;
		delete this.modData('Learnsets','gastly').learnset.thunder;
		delete this.modData('Learnsets','gastly').learnset.thunderbolt;
		delete this.modData('Learnsets','gastly').learnset.thunderpunch;
		// Haunter
		this.modData('Learnsets','haunter').learnset.poisonfang = ["9D"];
		this.modData('Learnsets','haunter').learnset.smog = ["9L1"];
		this.modData('Learnsets','haunter').learnset.poisongas = ["9L12"];
		this.modData('Learnsets','haunter').learnset.curse = ["9L15"];
		this.modData('Learnsets','haunter').learnset.nightshade = ["9L19"];
		this.modData('Learnsets','haunter').learnset.confuseray = ["9L22"];
		this.modData('Learnsets','haunter').learnset.suckerpunch = ["9L28"];
		this.modData('Learnsets','haunter').learnset.terrify = ["9L33"];
		this.modData('Learnsets','haunter').learnset.shadowball = ["9L39","9M"];
		this.modData('Learnsets','haunter').learnset.dreameater = ["9L44","9M"];
		this.modData('Learnsets','haunter').learnset.chillywater = ["9M"];
		this.modData('Learnsets','haunter').learnset.icebeam = ["9M"];
		this.modData('Learnsets','haunter').learnset.payback = ["9M"];
		this.modData('Learnsets','haunter').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','haunter').learnset.thunder;
		delete this.modData('Learnsets','haunter').learnset.thunderbolt;
		// Gengar
		this.modData('Learnsets','gengar').learnset.poisonfang = ["9D"];
		this.modData('Learnsets','gengar').learnset.eldritchmight = ["9L0"];
		this.modData('Learnsets','gengar').learnset.smog = ["9L1"];
		this.modData('Learnsets','gengar').learnset.poisongas = ["9L12"];
		this.modData('Learnsets','gengar').learnset.curse = ["9L15"];
		this.modData('Learnsets','gengar').learnset.nightshade = ["9L19"];
		this.modData('Learnsets','gengar').learnset.confuseray = ["9L22"];
		this.modData('Learnsets','gengar').learnset.suckerpunch = ["9L28"];
		this.modData('Learnsets','gengar').learnset.terrify = ["9L33"];
		this.modData('Learnsets','gengar').learnset.shadowball = ["9L39","9M"];
		this.modData('Learnsets','gengar').learnset.dreameater = ["9L44","9M"];
		this.modData('Learnsets','gengar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','gengar').learnset.icebeam = ["9M"];
		this.modData('Learnsets','gengar').learnset.payback = ["9M"];
		this.modData('Learnsets','gengar').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','gengar').learnset.thunder;
		// Onix
		this.modData('Learnsets','onix').learnset.sharpen = ["9D"];
		this.modData('Learnsets','onix').learnset.tussle = ["9L20"];
		this.modData('Learnsets','onix').learnset.escapetunnel = ["9L52"];
		this.modData('Learnsets','onix').learnset.gigaimpact = ["9M"];
		this.modData('Learnsets','onix').learnset.gyroball = ["9M"];
		this.modData('Learnsets','onix').learnset.sandstorm = ["9M"];
		this.modData('Learnsets','onix').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','onix').learnset.meteorbeam;
		// Drowzee
		this.modData('Learnsets','drowzee').learnset.meanlook = ["9D"];
		this.modData('Learnsets','drowzee').learnset.mindbend = ["9L9"];
		this.modData('Learnsets','drowzee').learnset.confusion = ["9L13"];
		this.modData('Learnsets','drowzee').learnset.headbutt = ["9L29"];
		this.modData('Learnsets','drowzee').learnset.amnesia = ["9M"];
		delete this.modData('Learnsets','drowzee').learnset.wakeupslap;
		// Hypno
		this.modData('Learnsets','hypno').learnset.darkvoid = ["9D"];
		this.modData('Learnsets','hypno').learnset.mindbend = ["9L9"];
		this.modData('Learnsets','hypno').learnset.confusion = ["9L13"];
		this.modData('Learnsets','hypno').learnset.headbutt = ["9L29"];
		this.modData('Learnsets','hypno').learnset.amnesia = ["9M"];
		this.modData('Learnsets','hypno').learnset.flash = ["9M"];
		delete this.modData('Learnsets','hypno').learnset.wakeupslap;
		// Krabby
		this.modData('Learnsets','krabby').learnset.clamp = ["9D"];
		this.modData('Learnsets','krabby').learnset.brine = ["9L25", "9M"];
		this.modData('Learnsets','krabby').learnset.razorshell = ["9L31"];
		this.modData('Learnsets','krabby').learnset.guillotine = ["9L39"];
		this.modData('Learnsets','krabby').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','krabby').learnset.allyswitch;
		delete this.modData('Learnsets','krabby').learnset.stomp;
		// Kingler
		this.modData('Learnsets','kingler').learnset.clamp = ["9D"];
		this.modData('Learnsets','kingler').learnset.brine = ["9L25", "9M"];
		this.modData('Learnsets','kingler').learnset.razorshell = ["9L37"];
		this.modData('Learnsets','kingler').learnset.guillotine = ["9L51"];
		this.modData('Learnsets','kingler').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','kingler').learnset.allyswitch;
		delete this.modData('Learnsets','kingler').learnset.stomp;
		// Voltorb
		this.modData('Learnsets','voltorb').learnset.overdrive = ["9D"];
		this.modData('Learnsets','voltorb').learnset.rapidspin = ["9L29"];
		this.modData('Learnsets','voltorb').learnset.lightscreen = ["9L34", "9M"];
		this.modData('Learnsets','voltorb').learnset.magnetrise = ["9L37", "9M"];
		this.modData('Learnsets','voltorb').learnset.discharge = ["9L41"];
		this.modData('Learnsets','voltorb').learnset.particleslam = ["9L43"];
		this.modData('Learnsets','voltorb').learnset.explosion = ["9L49", "9M"];
		this.modData('Learnsets','voltorb').learnset.mirrorcoat = ["9L52"];
		this.modData('Learnsets','voltorb').learnset.flash = ["9M"];
		this.modData('Learnsets','voltorb').learnset.gyroball = ["9M"];
		// Voltorb Hisui
		this.modData('Learnsets','voltorbhisui').learnset.grasswhistle = ["9D"];
		this.modData('Learnsets','voltorbhisui').learnset.rapidspin = ["9L29"];
		this.modData('Learnsets','voltorbhisui').learnset.seedbomb = ["9L34", "9M"];
		this.modData('Learnsets','voltorbhisui').learnset.magnetrise = ["9L37", "9M"];
		this.modData('Learnsets','voltorbhisui').learnset.discharge = ["9L41"];
		this.modData('Learnsets','voltorbhisui').learnset.particleslam = ["9L43"];
		this.modData('Learnsets','voltorbhisui').learnset.explosion = ["9L49", "9M"];
		this.modData('Learnsets','voltorbhisui').learnset.flash = ["9M"];
		this.modData('Learnsets','voltorbhisui').learnset.gyroball = ["9M"];
		// Electrode
		this.modData('Learnsets','electrode').learnset.overdrive = ["9D"];
		this.modData('Learnsets','electrode').learnset.rapidspin = ["9L29"];
		this.modData('Learnsets','electrode').learnset.lightscreen = ["9L36", "9M"];
		this.modData('Learnsets','electrode').learnset.magnetrise = ["9L41", "9M"];
		this.modData('Learnsets','electrode').learnset.discharge = ["9L47"];
		this.modData('Learnsets','electrode').learnset.particleslam = ["9L54"];
		this.modData('Learnsets','electrode').learnset.explosion = ["9L60", "9M"];
		this.modData('Learnsets','electrode').learnset.mirrorcoat = ["9L65"];
		this.modData('Learnsets','electrode').learnset.flash = ["9M"];
		this.modData('Learnsets','electrode').learnset.gyroball = ["9M"];
		// Electrode Hisui
		this.modData('Learnsets','electrodehisui').learnset.grasswhistle = ["9D"];
		this.modData('Learnsets','electrodehisui').learnset.grassyterrain = ["9L1", "9M"];
		this.modData('Learnsets','electrodehisui').learnset.particleslam = ["9L1"];
		this.modData('Learnsets','electrodehisui').learnset.mirrorcoat = ["9L1"];
		// Exeggcute
		this.modData('Learnsets','exeggcute').learnset.softboiled = ["9D"];
		// Exeggutor
		this.modData('Learnsets','exeggutor').learnset.tropkick = ["9D"];
		this.modData('Learnsets','exeggutor').learnset.bodypress = ["9M"];
		this.modData('Learnsets','exeggutor').learnset.trailhead = ["9M"];
		// Exeggutor Tropical
		this.modData('Learnsets','exeggutoralola').learnset.tropkick = ["9D"];
		this.modData('Learnsets','exeggutoralola').learnset.bodypress = ["9M"];
		this.modData('Learnsets','exeggutoralola').learnset.trailhead = ["9M"];
		// Cubone
		this.modData('Learnsets','cubone').learnset.memento = ["9D"];
		this.modData('Learnsets','cubone').learnset.rage = ["9L1"];
		this.modData('Learnsets','cubone').learnset.leer = ["9L3"];
		this.modData('Learnsets','cubone').learnset.falseswipe = ["9L7"];
		this.modData('Learnsets','cubone').learnset.tussle = ["9L11"];
		this.modData('Learnsets','cubone').learnset.swing = ["9L13"];
		this.modData('Learnsets','cubone').learnset.boneclub = ["9L21"];
		this.modData('Learnsets','cubone').learnset.headbutt = ["9L23"];
		this.modData('Learnsets','cubone').learnset.bonemerang = ["9L27"];
		this.modData('Learnsets','cubone').learnset.chillywater = ["9M"];
		this.modData('Learnsets','cubone').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','cubone').learnset.blizzard;
		delete this.modData('Learnsets','cubone').learnset.fireblast;
		delete this.modData('Learnsets','cubone').learnset.flamethrower;
		delete this.modData('Learnsets','cubone').learnset.icebeam;
		delete this.modData('Learnsets','cubone').learnset.tailwhip;
		// Marowak
		this.modData('Learnsets','marowak').learnset.memento = ["9D"];
		this.modData('Learnsets','marowak').learnset.rage = ["9L1"];
		this.modData('Learnsets','marowak').learnset.leer = ["9L3"];
		this.modData('Learnsets','marowak').learnset.falseswipe = ["9L7", "9M"];
		this.modData('Learnsets','marowak').learnset.tussle = ["9L11"];
		this.modData('Learnsets','marowak').learnset.swing = ["9L13"];
		this.modData('Learnsets','marowak').learnset.boneclub = ["9L21"];
		this.modData('Learnsets','marowak').learnset.headbutt = ["9L23"];
		this.modData('Learnsets','marowak').learnset.bonemerang = ["9L27"];
		this.modData('Learnsets','marowak').learnset.chillywater = ["9M"];
		this.modData('Learnsets','marowak').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','marowak').learnset.blizzard;
		delete this.modData('Learnsets','marowak').learnset.fireblast;
		delete this.modData('Learnsets','marowak').learnset.tailwhip;
		// Marowak Tropical
		this.modData('Learnsets','marowakalola').learnset.fierydance = ["9D"];
		this.modData('Learnsets','marowakalola').learnset.firespin = ["9L1"];
		this.modData('Learnsets','marowakalola').learnset.leer = ["9L3"];
		this.modData('Learnsets','marowakalola').learnset.hex = ["9L7", "9M"];
		this.modData('Learnsets','marowakalola').learnset.swing = ["9L13"];
		this.modData('Learnsets','marowakalola').learnset.boneclub = ["9L21"];
		this.modData('Learnsets','marowakalola').learnset.lastrespects = ["9L23"];
		this.modData('Learnsets','marowakalola').learnset.bonemerang = ["9L27"];
		this.modData('Learnsets','marowakalola').learnset.shadowbone = ["9L43"];
		this.modData('Learnsets','marowakalola').learnset.flash = ["9M"];
		delete this.modData('Learnsets','marowakalola').learnset.blizzard;
		delete this.modData('Learnsets','marowakalola').learnset.tailwhip;
		delete this.modData('Learnsets','marowakalola').learnset.thunder;
		// Hitmonlee
		this.modData('Learnsets','hitmonlee').learnset.tropkick = ["9D"];
		this.modData('Learnsets','hitmonlee').learnset.meditate = ["9L8"];
		this.modData('Learnsets','hitmonlee').learnset.lowkick = ["9L12"];
		this.modData('Learnsets','hitmonlee').learnset.endure = ["9L16","9M"];
		this.modData('Learnsets','hitmonlee').learnset.revenge = ["9L21"];
		this.modData('Learnsets','hitmonlee').learnset.jumpkick = ["9L24"];
		this.modData('Learnsets','hitmonlee').learnset.wideguard = ["9L28"];
		this.modData('Learnsets','hitmonlee').learnset.blazekick = ["9L32"];
		this.modData('Learnsets','hitmonlee').learnset.mindreader = ["9L36"];
		this.modData('Learnsets','hitmonlee').learnset.megakick = ["9L40"];
		this.modData('Learnsets','hitmonlee').learnset.closecombat = ["9L44"];
		this.modData('Learnsets','hitmonlee').learnset.reversal = ["9L48"];
		this.modData('Learnsets','hitmonlee').learnset.highjumpkick = ["9L52"];
		this.modData('Learnsets','hitmonlee').learnset.chipaway = ["9M"];
		delete this.modData('Learnsets','hitmonlee').learnset.earthquake;
		// Hitmonchan
		this.modData('Learnsets','hitmonchan').learnset.dynamicpunch = ["9D"];
		this.modData('Learnsets','hitmonchan').learnset.cometpunch = ["9L8"];
		this.modData('Learnsets','hitmonchan').learnset.poweruppunch = ["9L12"];
		this.modData('Learnsets','hitmonchan').learnset.detect = ["9L16"];
		this.modData('Learnsets','hitmonchan').learnset.revenge = ["9L21"];
		this.modData('Learnsets','hitmonchan').learnset.skyuppercut = ["9L24"];
		this.modData('Learnsets','hitmonchan').learnset.quickguard = ["9L28"];
		this.modData('Learnsets','hitmonchan').learnset.firepunch = ["9L32","9M"];
		this.modData('Learnsets','hitmonchan').learnset.icepunch = ["9L32","9M"];
		this.modData('Learnsets','hitmonchan').learnset.thunderpunch = ["9L32","9M"];
		this.modData('Learnsets','hitmonchan').learnset.agility = ["9L36"];
		this.modData('Learnsets','hitmonchan').learnset.megapunch = ["9L40"];
		this.modData('Learnsets','hitmonchan').learnset.closecombat = ["9L44"];
		this.modData('Learnsets','hitmonchan').learnset.counter = ["9L48"];
		this.modData('Learnsets','hitmonchan').learnset.focuspunch = ["9L52"];
		this.modData('Learnsets','hitmonchan').learnset.chipaway = ["9M"];
		delete this.modData('Learnsets','hitmonchan').learnset.earthquake;
		// Lickitung
		this.modData('Learnsets','lickitung').learnset.soak = ["9D"];
		this.modData('Learnsets','lickitung').learnset.bind = ["9L17"];
		this.modData('Learnsets','lickitung').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','lickitung').learnset.earthquake;
		delete this.modData('Learnsets','lickitung').learnset.wrap;
		// Koffing
		this.modData('Learnsets','koffing').learnset.rebound = ["9D"];
		this.modData('Learnsets','koffing').learnset.toxic = ["9L29", "9M"];
		delete this.modData('Learnsets','koffing').learnset.gyroball;
		// Weezing
		this.modData('Learnsets','weezing').learnset.rebound = ["9D"];
		this.modData('Learnsets','weezing').learnset.toxic = ["9L29", "9M"];
		delete this.modData('Learnsets','weezing').learnset.gyroball;
		// Weezing Galar
		this.modData('Learnsets','weezinggalar').learnset.purify = ["9D"];
		this.modData('Learnsets','weezinggalar').learnset.toxic = ["9L29", "9M"];
		delete this.modData('Learnsets','weezinggalar').learnset.gyroball;
		// Rhyhorn
		this.modData('Learnsets','rhyhorn').learnset.headsmash = ["9D"];
		this.modData('Learnsets','rhyhorn').learnset.scaryface = ["9L1"];
		this.modData('Learnsets','rhyhorn').learnset.stomp = ["9L9"];
		this.modData('Learnsets','rhyhorn').learnset.tussle = ["9L17"];
		this.modData('Learnsets','rhyhorn').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','rhyhorn').learnset.trailhead = ["9M"];
		this.modData('Learnsets','rhyhorn').learnset.doubleedge = ["9E"];
		delete this.modData('Learnsets','rhyhorn').learnset.flamethrower;
		delete this.modData('Learnsets','rhyhorn').learnset.icebeam;
		delete this.modData('Learnsets','rhyhorn').learnset.thunderbolt;
		// Rhydon
		this.modData('Learnsets','rhydon').learnset.headsmash = ["9D"];
		this.modData('Learnsets','rhydon').learnset.scaryface = ["9L1"];
		this.modData('Learnsets','rhydon').learnset.stomp = ["9L9"];
		this.modData('Learnsets','rhydon').learnset.tussle = ["9L17"];
		this.modData('Learnsets','rhydon').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','rhydon').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','rhydon').learnset.meteorbeam;
		// Chansey
		this.modData('Learnsets','chansey').learnset.happyhour = ["9D"];
		delete this.modData('Learnsets','chansey').learnset.blizzard;
		delete this.modData('Learnsets','chansey').learnset.earthquake;
		delete this.modData('Learnsets','chansey').learnset.fireblast;
		delete this.modData('Learnsets','chansey').learnset.tantrum;
		delete this.modData('Learnsets','chansey').learnset.thunder;
		delete this.modData('Learnsets','chansey').learnset.trailhead;
		// Tangela
		this.modData('Learnsets','tangela').learnset.morningsun = ["9D"];
		this.modData('Learnsets','tangela').learnset.wrap = ["9L17"];
		this.modData('Learnsets','tangela').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','tangela').learnset.bind;
		// Kangaskhan
		this.modData('Learnsets','kangaskhan').learnset.wish = ["9D"];
		this.modData('Learnsets','kangaskhan').learnset.rage = ["9L1"];
		this.modData('Learnsets','kangaskhan').learnset.deepbreath = ["9L10"];
		this.modData('Learnsets','kangaskhan').learnset.cometpunch = ["9L13"];
		this.modData('Learnsets','kangaskhan').learnset.stomp = ["9L19"];
		this.modData('Learnsets','kangaskhan').learnset.chipaway = ["9L22", "9M"];
		this.modData('Learnsets','kangaskhan').learnset.dizzypunch = ["9L25"];
		this.modData('Learnsets','kangaskhan').learnset.doublehit = ["9L31"];
		this.modData('Learnsets','kangaskhan').learnset.megapunch = ["9L34"];
		this.modData('Learnsets','kangaskhan').learnset.suckerpunch = ["9L37"];
		this.modData('Learnsets','kangaskhan').learnset.megakick = ["9L49"];
		this.modData('Learnsets','kangaskhan').learnset.bodypress = ["9M"];
		this.modData('Learnsets','kangaskhan').learnset.chillywater = ["9M"];
		this.modData('Learnsets','kangaskhan').learnset.faketears = ["9M"];
		this.modData('Learnsets','kangaskhan').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','kangaskhan').learnset.bite;
		delete this.modData('Learnsets','kangaskhan').learnset.crunch;
		delete this.modData('Learnsets','kangaskhan').learnset.tailwhip;
		// Horsea
		this.modData('Learnsets','horsea').learnset.poisongas = ["9D"];
		this.modData('Learnsets','horsea').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','horsea').learnset.blizzard;
		// Seadra
		this.modData('Learnsets','seadra').learnset.poisongas = ["9D"];
		this.modData('Learnsets','seadra').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','seadra').learnset.blizzard;
		// Goldeen
		this.modData('Learnsets','goldeen').learnset.captivate = ["9D"];
		this.modData('Learnsets','goldeen').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','goldeen').learnset.blizzard;
		delete this.modData('Learnsets','goldeen').learnset.knockoff;
		// Seaking
		this.modData('Learnsets','seaking').learnset.captivate = ["9D"];
		this.modData('Learnsets','seaking').learnset.chillywater = ["9M"];
		this.modData('Learnsets','seaking').learnset.wavecrash = ["9L54"];
		delete this.modData('Learnsets','seaking').learnset.blizzard;
		delete this.modData('Learnsets','seaking').learnset.knockoff;
		// Staryu
		this.modData('Learnsets','staryu').learnset.aurorabeam = ["9D"];
		this.modData('Learnsets','staryu').learnset.barrierbash = ["9L24"];
		this.modData('Learnsets','staryu').learnset.flash = ["9M"];
		this.modData('Learnsets','staryu').learnset.gyroball = ["9M"];
		this.modData('Learnsets','staryu').learnset.shockwave = ["9M"];
		delete this.modData('Learnsets','staryu').learnset.blizzard;
		delete this.modData('Learnsets','staryu').learnset.thunder;
		delete this.modData('Learnsets','staryu').learnset.thunderbolt;
		// Starmie
		this.modData('Learnsets','starmie').learnset.prismaticlaser = ["9D"];
		this.modData('Learnsets','starmie').learnset.barrierbash = ["9L1"];
		this.modData('Learnsets','starmie').learnset.flash = ["9M"];
		this.modData('Learnsets','starmie').learnset.futuresight = ["9M"];
		this.modData('Learnsets','starmie').learnset.gyroball = ["9M"];
		this.modData('Learnsets','starmie').learnset.shockwave = ["9M"];
		delete this.modData('Learnsets','starmie').learnset.avalanche;
		// Mr. Mime
		this.modData('Learnsets','mrmime').learnset.followme = ["9D"];
		this.modData('Learnsets','mrmime').learnset.barrier = ["9L0"];
		this.modData('Learnsets','mrmime').learnset.flash = ["9M"];
		this.modData('Learnsets','mrmime').learnset.nightmare = ["9M"];
		this.modData('Learnsets','mrmime').learnset.spotlight = ["9E"];
		this.modData('Learnsets','mrmime').learnset.wakeupslap = ["9L40"];
		delete this.modData('Learnsets','mrmime').learnset.suckerpunch;
		delete this.modData('Learnsets','mrmime').learnset.thunder;
		// Mr. Mime Galar
		this.modData('Learnsets','mrmimegalar').learnset.followme = ["9D"];
		this.modData('Learnsets','mrmimegalar').learnset.icywind = ["9L0"];
		this.modData('Learnsets','mrmimegalar').learnset.mimic = ["9L20"];
		this.modData('Learnsets','mrmimegalar').learnset.wakeupslap = ["9L40"];
		this.modData('Learnsets','mrmimegalar').learnset.afteryou = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.auroraveil = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.dazzlinggleam = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.dreameater = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.encore = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.flash = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.gravity = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.lightscreen = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.mistyterrain = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.nightmare = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.protect = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.psychup = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.recycle = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.reflect = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.roleplay = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.safeguard = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.torment = ["9M"];
		this.modData('Learnsets','mrmimegalar').learnset.spotlight = ["9E"];
		delete this.modData('Learnsets','mrmimegalar').learnset.suckerpunch;
		// Scyther
		this.modData('Learnsets','scyther').learnset.guillotine = ["9D"];
		this.modData('Learnsets','scyther').learnset.pursuit = ["9L16"];
		this.modData('Learnsets','scyther').learnset.cut = ["9L20"];
		this.modData('Learnsets','scyther').learnset.doubleteam = ["9L44"];
		this.modData('Learnsets','scyther').learnset.razorwind = ["9L52"];
		this.modData('Learnsets','scyther').learnset.feint = ["9L56"];
		delete this.modData('Learnsets','scyther').learnset.doublehit;
		delete this.modData('Learnsets','scyther').learnset.knockoff;
		// Jynx
		this.modData('Learnsets','jynx').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','jynx').learnset.amnesia = ["9M"];
		this.modData('Learnsets','jynx').learnset.daydream = ["9L1"];
		this.modData('Learnsets','jynx').learnset.eeriespell = ["9L49"];
		this.modData('Learnsets','jynx').learnset.chillywater = ["9M"];
		this.modData('Learnsets','jynx').learnset.flash = ["9M"];
		this.modData('Learnsets','jynx').learnset.hex = ["9M"];
		this.modData('Learnsets','jynx').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','jynx').learnset.wringout;
		// Electabuzz
		this.modData('Learnsets','electabuzz').learnset.zingzap = ["9D"];
		this.modData('Learnsets','electabuzz').learnset.flash = ["9M"];
		// Magmar
		this.modData('Learnsets','magmar').learnset.pelletshot = ["9D"];
		this.modData('Learnsets','magmar').learnset.amnesia = ["9M"];
		this.modData('Learnsets','magmar').learnset.flash = ["9M"];
		this.modData('Learnsets','magmar').learnset.sludgebomb = ["9M"];
		// Pinsir
		this.modData('Learnsets','pinsir').learnset.furycutter = ["9D"];
		this.modData('Learnsets','pinsir').learnset.revenge = ["9L28"];
		this.modData('Learnsets','pinsir').learnset.strength = ["9L32", "9M"];
		this.modData('Learnsets','pinsir').learnset.xscissor = ["9L36", "9M"];
		this.modData('Learnsets','pinsir').learnset.vitalthrow = ["9L40"];
		this.modData('Learnsets','pinsir').learnset.swordsdance = ["9L44", "9M"];
		this.modData('Learnsets','pinsir').learnset.submission = ["9L48"];
		this.modData('Learnsets','pinsir').learnset.guillotine = ["9L52"];
		this.modData('Learnsets','pinsir').learnset.superpower = ["9L56", "9M"];
		delete this.modData('Learnsets','pinsir').learnset.knockoff;
		delete this.modData('Learnsets','pinsir').learnset.stoneedge;
		// Tauros
		this.modData('Learnsets','tauros').learnset.megahorn = ["9D"];
		this.modData('Learnsets','tauros').learnset.swagger = ["9L47"];
		this.modData('Learnsets','tauros').learnset.thrash = ["9L53"];
		this.modData('Learnsets','tauros').learnset.doubleedge = ["9L59"];
		this.modData('Learnsets','tauros').learnset.highhorsepower = ["9L65"];
		this.modData('Learnsets','tauros').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','tauros').learnset.blizzard;
		delete this.modData('Learnsets','tauros').learnset.fireblast;
		delete this.modData('Learnsets','tauros').learnset.thunder;
		// Tauros Paldea Combat Breed
		this.modData('Learnsets','taurospaldeacombat').learnset.megahorn = ["9D"];
		this.modData('Learnsets','taurospaldeacombat').learnset.roleplay = ["9M"];
		// Tauros Paldea Blaze Breed
		this.modData('Learnsets','taurospaldeablaze').learnset.megahorn = ["9D"];
		this.modData('Learnsets','taurospaldeablaze').learnset.temperflare = ["9L35"];
		this.modData('Learnsets','taurospaldeablaze').learnset.roleplay = ["9M"];
		delete this.modData('Learnsets','taurospaldeablaze').learnset.takedown;
		// Tauros Paldea Aqua Breed
		this.modData('Learnsets','taurospaldeaaqua').learnset.megahorn = ["9D"];
		this.modData('Learnsets','taurospaldeaaqua').learnset.liquidation = ["9L35"];
		this.modData('Learnsets','taurospaldeaaqua').learnset.roleplay = ["9M"];
		delete this.modData('Learnsets','taurospaldeaaqua').learnset.takedown;
		// Gyarados
		this.modData('Learnsets','gyarados').learnset.vengefulspirit = ["9D"];
		this.modData('Learnsets','gyarados').learnset.rage = ["9L21"];
		this.modData('Learnsets','gyarados').learnset.rockslide = ["9M"];
		delete this.modData('Learnsets','gyarados').learnset.leer;
		// Lapras
		this.modData('Learnsets','lapras').learnset.lifedew = ["9D"];
		this.modData('Learnsets','lapras').learnset.sparklingaria = ["9E"];
		this.modData('Learnsets','lapras').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','lapras').learnset.thunder;
		// Eevee
		this.modData('Learnsets','eevee').learnset.mimic = ["9D"];
		this.modData('Learnsets','eevee').learnset.swift = ["9L20"];
		this.modData('Learnsets','eevee').learnset.refresh = ["9L25"];
		this.modData('Learnsets','eevee').learnset.takedown = ["9L29"];
		this.modData('Learnsets','eevee').learnset.charm = ["9L33", "9M"];
		this.modData('Learnsets','eevee').learnset.batonpass = ["9L37"];
		this.modData('Learnsets','eevee').learnset.doubleedge = ["9L41", "9M"];
		this.modData('Learnsets','eevee').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','eevee').learnset.trumpcard = ["9L49"];
		// Vaporeon
		this.modData('Learnsets','vaporeon').learnset.tailslap = ["9D"];
		this.modData('Learnsets','vaporeon').learnset.aurorabeam = ["9L17"];
		this.modData('Learnsets','vaporeon').learnset.waterpulse = ["9L20", "9M"];
		this.modData('Learnsets','vaporeon').learnset.aquatail = ["9L29", "9M"];
		this.modData('Learnsets','vaporeon').learnset.acidarmor = ["9L33"];
		this.modData('Learnsets','vaporeon').learnset.haze = ["9L37"];
		this.modData('Learnsets','vaporeon').learnset.muddywater = ["9L41"];
		this.modData('Learnsets','vaporeon').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','vaporeon').learnset.hydropump = ["9L49", "9M"];
		delete this.modData('Learnsets','vaporeon').learnset.blizzard;
		// Jolteon
		this.modData('Learnsets','jolteon').learnset.particleslam = ["9D"];
		this.modData('Learnsets','jolteon').learnset.pinmissile = ["9L25"];
		this.modData('Learnsets','jolteon').learnset.zingzap = ["9L29"];
		this.modData('Learnsets','jolteon').learnset.agility = ["9L33"];
		this.modData('Learnsets','jolteon').learnset.thunderwave = ["9L37", "9M"];
		this.modData('Learnsets','jolteon').learnset.discharge = ["9L41"];
		this.modData('Learnsets','jolteon').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','jolteon').learnset.thunder = ["9L49", "9M"];
		// Flareon
		this.modData('Learnsets','flareon').learnset.temperflare = ["9D"];
		this.modData('Learnsets','flareon').learnset.rage = ["9L25"];
		this.modData('Learnsets','flareon').learnset.firespin = ["9L29"];
		this.modData('Learnsets','flareon').learnset.scaryface = ["9L33"];
		this.modData('Learnsets','flareon').learnset.preheat = ["9L37"];
		this.modData('Learnsets','flareon').learnset.lavaplume = ["9L41"];
		this.modData('Learnsets','flareon').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','flareon').learnset.flareblitz = ["9L49"];
		this.modData('Learnsets','flareon').learnset.flash = ["9M"];
		delete this.modData('Learnsets','flareon').learnset.smog;
		// Porygon
		this.modData('Learnsets','porygon').learnset.teleport = ["9D"];
		this.modData('Learnsets','porygon').learnset.chillywater = ["9M"];
		this.modData('Learnsets','porygon').learnset.flash = ["9M"];
		this.modData('Learnsets','porygon').learnset.powergem = ["9M"];
		// Omanyte
		this.modData('Learnsets','omanyte').learnset.curse = ["9D"];
		this.modData('Learnsets','omanyte').learnset.dustspray = ["9L16"];
		this.modData('Learnsets','omanyte').learnset.tickle = ["9L19"];
		this.modData('Learnsets','omanyte').learnset.shelter = ["9L43"];
		this.modData('Learnsets','omanyte').learnset.chillywater = ["9M"];
		this.modData('Learnsets','omanyte').learnset.rockslide = ["9M"];
		delete this.modData('Learnsets','omanyte').learnset.blizzard;
		// Omastar
		this.modData('Learnsets','omastar').learnset.curse = ["9D"];
		this.modData('Learnsets','omastar').learnset.dustspray = ["9L16"];
		this.modData('Learnsets','omastar').learnset.tickle = ["9L19"];
		this.modData('Learnsets','omastar').learnset.shelter = ["9L48"];
		this.modData('Learnsets','omastar').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','omastar').learnset.blizzard;
		// Kabuto
		this.modData('Learnsets','kabuto').learnset.rollout = ["9D"];
		this.modData('Learnsets','kabuto').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','kabuto').learnset.harden = ["9L1"];
		this.modData('Learnsets','kabuto').learnset.scratch = ["9L6"];
		this.modData('Learnsets','kabuto').learnset.sandattack = ["9L11"];
		this.modData('Learnsets','kabuto').learnset.aquajet = ["9L16"];
		this.modData('Learnsets','kabuto').learnset.leer = ["9L21"];
		this.modData('Learnsets','kabuto').learnset.mudshot = ["9L26"];
		this.modData('Learnsets','kabuto').learnset.ancientpower = ["9L31"];
		this.modData('Learnsets','kabuto').learnset.brine = ["9L36","9M"];
		this.modData('Learnsets','kabuto').learnset.protect = ["9L41","9M"];
		this.modData('Learnsets','kabuto').learnset.vitaldrain = ["9L46","9M"];
		this.modData('Learnsets','kabuto').learnset.liquidation = ["9L51"];
		this.modData('Learnsets','kabuto').learnset.metalsound = ["9L56"];
		this.modData('Learnsets','kabuto').learnset.stoneedge = ["9M"];
		this.modData('Learnsets','kabuto').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','kabuto').learnset.absorb;
		delete this.modData('Learnsets','kabuto').learnset.blizzard;
		delete this.modData('Learnsets','kabuto').learnset.knockoff;
		// Kabutops
		this.modData('Learnsets','kabutops').learnset.cut = ["9D"];
		this.modData('Learnsets','kabutops').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','kabutops').learnset.harden = ["9L1"];
		this.modData('Learnsets','kabutops').learnset.scratch = ["9L6"];
		this.modData('Learnsets','kabutops').learnset.sandattack = ["9L11"];
		this.modData('Learnsets','kabutops').learnset.aquajet = ["9L16"];
		this.modData('Learnsets','kabutops').learnset.leer = ["9L21"];
		this.modData('Learnsets','kabutops').learnset.mudshot = ["9L26"];
		this.modData('Learnsets','kabutops').learnset.ancientpower = ["9L31"];
		this.modData('Learnsets','kabutops').learnset.brine = ["9L36","9M"];
		this.modData('Learnsets','kabutops').learnset.vitaldrain = ["9L49","9M"];
		this.modData('Learnsets','kabutops').learnset.stoneaxe = ["9L70"];
		this.modData('Learnsets','kabutops').learnset.stoneedge = ["9M"];
		this.modData('Learnsets','kabutops').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','kabutops').learnset.absorb;
		delete this.modData('Learnsets','kabutops').learnset.blizzard;
		delete this.modData('Learnsets','kabutops').learnset.knockoff;
		// Aerodactyl
		this.modData('Learnsets','aerodactyl').learnset.twister = ["9D"];
		this.modData('Learnsets','aerodactyl').learnset.roar = ["9L7","9M"];
		this.modData('Learnsets','aerodactyl').learnset.ancientpower = ["9L13"];
		this.modData('Learnsets','aerodactyl').learnset.agility = ["9L19"];
		this.modData('Learnsets','aerodactyl').learnset.rockslide = ["9L25","9M"];
		this.modData('Learnsets','aerodactyl').learnset.skydrop = ["9L31"];
		this.modData('Learnsets','aerodactyl').learnset.crunch = ["9L37"];
		this.modData('Learnsets','aerodactyl').learnset.ironhead = ["9L43","9M"];
		this.modData('Learnsets','aerodactyl').learnset.stoneaxe = ["9L49"];
		this.modData('Learnsets','aerodactyl').learnset.fellswoop = ["9L55"];
		this.modData('Learnsets','aerodactyl').learnset.hyperbeam = ["9L61","9M"];
		this.modData('Learnsets','aerodactyl').learnset.gigaimpact = ["9L67","9M"];
		this.modData('Learnsets','aerodactyl').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','aerodactyl').learnset.screech = ["9M"];
		// Snorlax
		this.modData('Learnsets','snorlax').learnset.selfdestruct = ["9D"];
		this.modData('Learnsets','snorlax').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','snorlax').learnset.blizzard;
		delete this.modData('Learnsets','snorlax').learnset.fireblast;
		delete this.modData('Learnsets','snorlax').learnset.thunder;
		// Articuno
		this.modData('Learnsets','articuno').learnset.extrasensory = ["9D"];
		this.modData('Learnsets','articuno').learnset.mist = ["9L6"];
		this.modData('Learnsets','articuno').learnset.iceshard = ["9L12"];
		this.modData('Learnsets','articuno').learnset.mindreader = ["9L18"];
		this.modData('Learnsets','articuno').learnset.ancientpower = ["9L24"];
		this.modData('Learnsets','articuno').learnset.agility = ["9L30"];
		this.modData('Learnsets','articuno').learnset.icebeam = ["9L36","9M"];
		this.modData('Learnsets','articuno').learnset.reflect = ["9L42","9M"];
		this.modData('Learnsets','articuno').learnset.snowscape = ["9L48","9M"];
		this.modData('Learnsets','articuno').learnset.auroraveil = ["9L54","9M"];
		this.modData('Learnsets','articuno').learnset.freezedry = ["9L60"];
		this.modData('Learnsets','articuno').learnset.blizzard = ["9L66","9M"];
		this.modData('Learnsets','articuno').learnset.roost = ["9L72","9M"];
		this.modData('Learnsets','articuno').learnset.hurricane = ["9L78","9M"];
		this.modData('Learnsets','articuno').learnset.sheercold = ["9L84"];
		this.modData('Learnsets','articuno').learnset.chillywater = ["9M"];
		// Articuno Galar
		this.modData('Learnsets','articunogalar').learnset.icebeam = ["9D"];
		this.modData('Learnsets','articunogalar').learnset.psychoshift = ["9L6"];
		this.modData('Learnsets','articunogalar').learnset.hypnosis = ["9L12"];
		this.modData('Learnsets','articunogalar').learnset.mindreader = ["9L18"];
		this.modData('Learnsets','articunogalar').learnset.ancientpower = ["9L24"];
		this.modData('Learnsets','articunogalar').learnset.agility = ["9L30"];
		this.modData('Learnsets','articunogalar').learnset.psychocut = ["9L36"];
		this.modData('Learnsets','articunogalar').learnset.reflect = ["9L42","9M"];
		this.modData('Learnsets','articunogalar').learnset.trickroom = ["9L48","9M"];
		this.modData('Learnsets','articunogalar').learnset.doubleteam = ["9L54"];
		this.modData('Learnsets','articunogalar').learnset.extrasensory = ["9L60"];
		this.modData('Learnsets','articunogalar').learnset.futuresight = ["9L66","9M"];
		this.modData('Learnsets','articunogalar').learnset.recover = ["9L72"];
		this.modData('Learnsets','articunogalar').learnset.hurricane = ["9L78","9M"];
		this.modData('Learnsets','articunogalar').learnset.storedpower = ["9L84","9M"];
		this.modData('Learnsets','articunogalar').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','articunogalar').learnset.telekinesis = ["9M"];
		// Zapdos
		this.modData('Learnsets','zapdos').learnset.extrasensory = ["9D"];
		this.modData('Learnsets','zapdos').learnset.thunderwave = ["9L6","9M"];
		this.modData('Learnsets','zapdos').learnset.pluck = ["9L12"];
		this.modData('Learnsets','zapdos').learnset.detect = ["9L18"];
		this.modData('Learnsets','zapdos').learnset.ancientpower = ["9L24"];
		this.modData('Learnsets','zapdos').learnset.agility = ["9L30"];
		this.modData('Learnsets','zapdos').learnset.discharge = ["9L36"];
		this.modData('Learnsets','zapdos').learnset.lightscreen = ["9L42","9M"];
		this.modData('Learnsets','zapdos').learnset.raindance = ["9L48","9M"];
		this.modData('Learnsets','zapdos').learnset.charge = ["9L54"];
		this.modData('Learnsets','zapdos').learnset.boltbeak = ["9L60"];
		this.modData('Learnsets','zapdos').learnset.thunder = ["9L66","9M"];
		this.modData('Learnsets','zapdos').learnset.roost = ["9L72","9M"];
		this.modData('Learnsets','zapdos').learnset.drillpeck = ["9L78"];
		this.modData('Learnsets','zapdos').learnset.zapcannon = ["9L84"];
		this.modData('Learnsets','zapdos').learnset.flash = ["9M"];
		delete this.modData('Learnsets','zapdos').learnset.magneticflux;
		// Zapdos Galar
		this.modData('Learnsets','zapdosgalar').learnset.boltbeak = ["9D"];
		this.modData('Learnsets','zapdosgalar').learnset.focusenergy = ["9L6"];
		this.modData('Learnsets','zapdosgalar').learnset.pluck = ["9L12"];
		this.modData('Learnsets','zapdosgalar').learnset.detect = ["9L18"];
		this.modData('Learnsets','zapdosgalar').learnset.ancientpower = ["9L24"];
		this.modData('Learnsets','zapdosgalar').learnset.agility = ["9L30"];
		this.modData('Learnsets','zapdosgalar').learnset.brickbreak = ["9L36","9M"];
		this.modData('Learnsets','zapdosgalar').learnset.lightscreen = ["9L42","9M"];
		this.modData('Learnsets','zapdosgalar').learnset.bulkup = ["9L48","9M"];
		this.modData('Learnsets','zapdosgalar').learnset.counter = ["9L54"];
		this.modData('Learnsets','zapdosgalar').learnset.reversal = ["9L60"];
		this.modData('Learnsets','zapdosgalar').learnset.jumpkick = ["9L66"];
		this.modData('Learnsets','zapdosgalar').learnset.quickguard = ["9L72"];
		this.modData('Learnsets','zapdosgalar').learnset.drillpeck = ["9L78"];
		this.modData('Learnsets','zapdosgalar').learnset.highjumpkick = ["9L84"];
		this.modData('Learnsets','zapdosgalar').learnset.laserfocus = ["9M"];
		// Moltres
		this.modData('Learnsets','moltres').learnset.extrasensory = ["9D"];
		this.modData('Learnsets','moltres').learnset.firespin = ["9L6"];
		this.modData('Learnsets','moltres').learnset.airslash = ["9L12"];
		this.modData('Learnsets','moltres').learnset.endure = ["9L18","9M"];
		this.modData('Learnsets','moltres').learnset.ancientpower = ["9L24"];
		this.modData('Learnsets','moltres').learnset.agility = ["9L30"];
		this.modData('Learnsets','moltres').learnset.flamethrower = ["9L36","9M"];
		this.modData('Learnsets','moltres').learnset.safeguard = ["9L42","9M"];
		this.modData('Learnsets','moltres').learnset.sunnyday = ["9L48","9M"];
		this.modData('Learnsets','moltres').learnset.preheat = ["9L54"];
		this.modData('Learnsets','moltres').learnset.heatwave = ["9L60","9M"];
		this.modData('Learnsets','moltres').learnset.solarbeam = ["9L66","9M"];
		this.modData('Learnsets','moltres').learnset.roost = ["9L72","9M"];
		this.modData('Learnsets','moltres').learnset.skyattack = ["9L78","9M"];
		this.modData('Learnsets','moltres').learnset.burnup = ["9L84"];
		this.modData('Learnsets','moltres').learnset.flash = ["9M"];
		// Moltres Galar
		this.modData('Learnsets','moltresgalar').learnset.heatwave = ["9D"];
		this.modData('Learnsets','moltresgalar').learnset.payback = ["9L6","9M"];
		this.modData('Learnsets','moltresgalar').learnset.airslash = ["9L12"];
		this.modData('Learnsets','moltresgalar').learnset.endure = ["9L18","9M"];
		this.modData('Learnsets','moltresgalar').learnset.ancientpower = ["9L24"];
		this.modData('Learnsets','moltresgalar').learnset.agility = ["9L30"];
		this.modData('Learnsets','moltresgalar').learnset.suckerpunch = ["9L36"];
		this.modData('Learnsets','moltresgalar').learnset.safeguard = ["9L42","9M"];
		this.modData('Learnsets','moltresgalar').learnset.nastyplot = ["9L48","9M"];
		this.modData('Learnsets','moltresgalar').learnset.embargo = ["9L54","9M"];
		this.modData('Learnsets','moltresgalar').learnset.darkpulse = ["9L60","9M"];
		this.modData('Learnsets','moltresgalar').learnset.foulplay = ["9L66","9M"];
		this.modData('Learnsets','moltresgalar').learnset.quash = ["9L72","9M"];
		this.modData('Learnsets','moltresgalar').learnset.skyattack = ["9L78","9M"];
		this.modData('Learnsets','moltresgalar').learnset.memento = ["9L84"];
		this.modData('Learnsets','moltresgalar').learnset.laserfocus = ["9M"];
		// Dratini
		this.modData('Learnsets','dratini').learnset.extremespeed = ["9D"];
		this.modData('Learnsets','dratini').learnset.bind = ["9L1"];
		this.modData('Learnsets','dratini').learnset.amnesia = ["9M"];
		delete this.modData('Learnsets','dratini').learnset.blizzard;
		delete this.modData('Learnsets','dratini').learnset.icebeam;
		delete this.modData('Learnsets','dratini').learnset.thunderbolt;
		delete this.modData('Learnsets','dratini').learnset.wrap;
		// Dragonair
		this.modData('Learnsets','dragonair').learnset.extremespeed = ["9D"];
		this.modData('Learnsets','dragonair').learnset.bind = ["9L1"];
		this.modData('Learnsets','dragonair').learnset.amnesia = ["9M"];
		delete this.modData('Learnsets','dragonair').learnset.blizzard;
		delete this.modData('Learnsets','dragonair').learnset.icebeam;
		delete this.modData('Learnsets','dragonair').learnset.thunderbolt;
		delete this.modData('Learnsets','dragonair').learnset.wrap;
		// Dragonite
		this.modData('Learnsets','dragonite').learnset.extremespeed = ["9D"];
		this.modData('Learnsets','dragonite').learnset.fellswoop = ["9L0"];
		this.modData('Learnsets','dragonite').learnset.bind = ["9L1"];
		this.modData('Learnsets','dragonite').learnset.amnesia = ["9M"];
		this.modData('Learnsets','dragonite').learnset.hurricane = ["9M"];
		delete this.modData('Learnsets','dragonite').learnset.blizzard;
		delete this.modData('Learnsets','dragonite').learnset.wrap;
		// Mewtwo
		this.modData('Learnsets','mewtwo').learnset.hypnosis = ["9D"];
		this.modData('Learnsets','mewtwo').learnset.flash = ["9M"];
		this.modData('Learnsets','mewtwo').learnset.nightmare = ["9M"];
		this.modData('Learnsets','mewtwo').learnset.teleport = ["9L1"];
		// Mew
		this.modData('Learnsets','mew').learnset.hypnosis = ["9D"];
		this.modData('Learnsets','mew').learnset.teleport = ["9L1"];
		this.modData('Learnsets','mew').learnset.wrap = ["9L10"];
		this.modData('Learnsets','mew').learnset.aurasphere = ["9L90"];
		this.modData('Learnsets','mew').learnset.psybubble = ["9L100"];
		this.modData('Learnsets','mew').learnset.chipaway = ["9M"];
		this.modData('Learnsets','mew').learnset.flash = ["9M"];
		this.modData('Learnsets','mew').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','mew').learnset.midnight = ["9T"];
		this.modData('Learnsets','mew').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','mew').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','mew').learnset.nightmare = ["9M"];
		this.modData('Learnsets','mew').learnset.toxic = ["9M"];
		this.modData('Learnsets','mew').learnset.stasis = ["9T"];
		this.modData('Learnsets','mew').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','mew').learnset.megapunch;
		// Chikorita
		this.modData('Learnsets','chikorita').learnset.spicyextract = ["9D"];
		this.modData('Learnsets','chikorita').learnset.amnesia = ["9M"];
		this.modData('Learnsets','chikorita').learnset.flash = ["9M"];
		this.modData('Learnsets','chikorita').learnset.floralhealing = ["9E"];
		delete this.modData('Learnsets','chikorita').learnset.wringout;
		// Bayleef
		this.modData('Learnsets','bayleef').learnset.spicyextract = ["9D"];
		this.modData('Learnsets','bayleef').learnset.amnesia = ["9M"];
		this.modData('Learnsets','bayleef').learnset.flash = ["9M"];
		// Meganium
		this.modData('Learnsets','meganium').learnset.flowershield = ["9D"];
		this.modData('Learnsets','meganium').learnset.amnesia = ["9M"];
		this.modData('Learnsets','meganium').learnset.bodypress = ["9M"];
		this.modData('Learnsets','meganium').learnset.flash = ["9M"];
		// Cyndaquil
		this.modData('Learnsets','cyndaquil').learnset.preheat = ["9D"];
		this.modData('Learnsets','cyndaquil').learnset.flash = ["9M"];
		// Quilava
		this.modData('Learnsets','quilava').learnset.preheat = ["9D"];
		this.modData('Learnsets','quilava').learnset.flash = ["9M"];
		// Typhlosion
		this.modData('Learnsets','typhlosion').learnset.preheat = ["9D"];
		this.modData('Learnsets','typhlosion').learnset.temperflare = ["9L0"];
		this.modData('Learnsets','typhlosion').learnset.flash = ["9M"];
		// Typhlosion Hisui
		this.modData('Learnsets','typhlosionhisui').learnset.lastrespects = ["9D"];
		this.modData('Learnsets','typhlosionhisui').learnset.nightshade = ["9L0"];
		// Totodile
		this.modData('Learnsets','totodile').learnset.faketears = ["9D"];
		delete this.modData('Learnsets','totodile').learnset.blizzard;
		// Croconaw
		this.modData('Learnsets','croconaw').learnset.faketears = ["9D"];
		delete this.modData('Learnsets','croconaw').learnset.blizzard;
		// Feraligatr
		this.modData('Learnsets','feraligatr').learnset.faketears = ["9D"];
		delete this.modData('Learnsets','feraligatr').learnset.blizzard;
		// Sentret
		this.modData('Learnsets','sentret').learnset.detect = ["9D"];
		this.modData('Learnsets','sentret').learnset.faketears = ["9M"];
		this.modData('Learnsets','sentret').learnset.incinerate = ["9M"];
		delete this.modData('Learnsets','sentret').learnset.blizzard;
		delete this.modData('Learnsets','sentret').learnset.flamethrower;
		delete this.modData('Learnsets','sentret').learnset.icebeam;
		delete this.modData('Learnsets','sentret').learnset.thunder;
		delete this.modData('Learnsets','sentret').learnset.thunderbolt;
		// Furret
		this.modData('Learnsets','furret').learnset.coil = ["9D"];
		this.modData('Learnsets','furret').learnset.faketears = ["9M"];
		this.modData('Learnsets','furret').learnset.incinerate = ["9M"];
		delete this.modData('Learnsets','furret').learnset.blizzard;
		delete this.modData('Learnsets','furret').learnset.flamethrower;
		delete this.modData('Learnsets','furret').learnset.icebeam;
		delete this.modData('Learnsets','furret').learnset.thunder;
		delete this.modData('Learnsets','furret').learnset.thunderbolt;
		// Hoothoot
		this.modData('Learnsets','hoothoot').learnset.imprison = ["9D"];
		this.modData('Learnsets','hoothoot').learnset.nightmare = ["9M"];
		// Noctowl
		this.modData('Learnsets','noctowl').learnset.imprison = ["9D"];
		this.modData('Learnsets','noctowl').learnset.nightmare = ["9M"];
		// Ledyba
		this.modData('Learnsets','ledyba').learnset.barrier = ["9D"];
		this.modData('Learnsets','ledyba').learnset.bugcloud = ["9L1"];
		this.modData('Learnsets','ledyba').learnset.flash = ["9M"];
		this.modData('Learnsets','ledyba').learnset.metronome = ["9M"];
		// Ledian
		this.modData('Learnsets','ledian').learnset.barrier = ["9D"];
		this.modData('Learnsets','ledian').learnset.moonlight = ["9L0"];
		this.modData('Learnsets','ledian').learnset.bugcloud = ["9L1"];
		this.modData('Learnsets','ledian').learnset.flash = ["9M"];
		this.modData('Learnsets','ledian').learnset.metronome = ["9M"];
		this.modData('Learnsets','ledian').learnset.meteorbeam = ["9T"];
		// Spinarak
		this.modData('Learnsets','spinarak').learnset.direclaw = ["9D"];
		this.modData('Learnsets','spinarak').learnset.terrify = ["9L12"];
		this.modData('Learnsets','spinarak').learnset.springleap = ["9L22"];
		this.modData('Learnsets','spinarak').learnset.curse = ["9L33"];
		this.modData('Learnsets','spinarak').learnset.crosspoison = ["9L36"];
		this.modData('Learnsets','spinarak').learnset.pinmissile = ["9L43"];
		this.modData('Learnsets','spinarak').learnset.poisonjab = ["9L47"];
		this.modData('Learnsets','spinarak').learnset.nightmare = ["9M"];
		this.modData('Learnsets','spinarak').learnset.toxic = ["9M"];
		this.modData('Learnsets','spinarak').learnset.vitaldrain = ["9M"];
		this.modData('Learnsets','spinarak').learnset.ambush = ["9E"];
		delete this.modData('Learnsets','spinarak').learnset.absorb;
		delete this.modData('Learnsets','spinarak').learnset.furyswipes;
		delete this.modData('Learnsets','spinarak').learnset.lunge;
		delete this.modData('Learnsets','spinarak').learnset.megahorn;
		delete this.modData('Learnsets','spinarak').learnset.scaryface;
		delete this.modData('Learnsets','spinarak').learnset.sonicboom;
		delete this.modData('Learnsets','spinarak').learnset.trailhead;
		// Ariados
		this.modData('Learnsets','ariados').learnset.direclaw = ["9D"];
		this.modData('Learnsets','ariados').learnset.furyswipes = ["9L0"];
		this.modData('Learnsets','ariados').learnset.terrify = ["9L12"];
		this.modData('Learnsets','ariados').learnset.springleap = ["9L22"];
		this.modData('Learnsets','ariados').learnset.curse = ["9L33"];
		this.modData('Learnsets','ariados').learnset.crosspoison = ["9L36"];
		this.modData('Learnsets','ariados').learnset.pinmissile = ["9L43"];
		this.modData('Learnsets','ariados').learnset.poisonjab = ["9L47", "9M"];
		this.modData('Learnsets','ariados').learnset.nightmare = ["9M"];
		this.modData('Learnsets','ariados').learnset.swordsdance = ["9M"];
		this.modData('Learnsets','ariados').learnset.toxic = ["9M"];
		this.modData('Learnsets','ariados').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','ariados').learnset.absorb;
		delete this.modData('Learnsets','ariados').learnset.scaryface;
		delete this.modData('Learnsets','ariados').learnset.trailhead;
		// Crobat
		this.modData('Learnsets','crobat').learnset.detect = ["9D"];
		this.modData('Learnsets','crobat').learnset.acrobatics = ["9L35", "9M"];
		this.modData('Learnsets','crobat').learnset.vitaldrain = ["9L43", "9M"];
		this.modData('Learnsets','crobat').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','crobat').learnset.absorb;
		// Chinchou
		this.modData('Learnsets','chinchou').learnset.zapcannon = ["9D"];
		this.modData('Learnsets','chinchou').learnset.chillywater = ["9M"];
		this.modData('Learnsets','chinchou').learnset.flash = ["9M"];
		delete this.modData('Learnsets','chinchou').learnset.blizzard;
		delete this.modData('Learnsets','chinchou').learnset.waterfall;
		// Lanturn
		this.modData('Learnsets','lanturn').learnset.zapcannon = ["9D"];
		this.modData('Learnsets','lanturn').learnset.chillywater = ["9M"];
		this.modData('Learnsets','lanturn').learnset.flash = ["9M"];
		delete this.modData('Learnsets','lanturn').learnset.blizzard;
		// Pichu
		this.modData('Learnsets','pichu').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','pichu').learnset.flash = ["9M"];
		// Cleffa
		this.modData('Learnsets','cleffa').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','cleffa').learnset.chillywater = ["9M"];
		this.modData('Learnsets','cleffa').learnset.flash = ["9M"];
		this.modData('Learnsets','cleffa').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','cleffa').learnset.blizzard;
		delete this.modData('Learnsets','cleffa').learnset.icebeam;
		delete this.modData('Learnsets','cleffa').learnset.flamethrower;
		delete this.modData('Learnsets','cleffa').learnset.fireblast;
		delete this.modData('Learnsets','cleffa').learnset.thunder;
		delete this.modData('Learnsets','cleffa').learnset.thunderbolt;
		// Igglybuff
		this.modData('Learnsets','igglybuff').learnset.tickle = ["9D"];
		this.modData('Learnsets','igglybuff').learnset.pound = ["9L1"];
		this.modData('Learnsets','igglybuff').learnset.aerate = ["9L3"];
		this.modData('Learnsets','igglybuff').learnset.confide = ["9E"];
		this.modData('Learnsets','igglybuff').learnset.chillywater = ["9M"];
		this.modData('Learnsets','igglybuff').learnset.flash = ["9M"];
		this.modData('Learnsets','igglybuff').learnset.tearfullook = ["9E"];
		delete this.modData('Learnsets','igglybuff').learnset.blizzard;
		delete this.modData('Learnsets','igglybuff').learnset.icebeam;
		delete this.modData('Learnsets','igglybuff').learnset.flamethrower;
		delete this.modData('Learnsets','igglybuff').learnset.fireblast;
		delete this.modData('Learnsets','igglybuff').learnset.thunder;
		delete this.modData('Learnsets','igglybuff').learnset.thunderbolt;
		// Togepi
		this.modData('Learnsets','togepi').learnset.softboiled = ["9D"];
		this.modData('Learnsets','togepi').learnset.daydream = ["9L1"];
		this.modData('Learnsets','togepi').learnset.flash = ["9M"];
		this.modData('Learnsets','togepi').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','togepi').learnset.growl;
		delete this.modData('Learnsets','togepi').learnset.flamethrower;
		delete this.modData('Learnsets','togepi').learnset.fireblast;
		// Togetic
		this.modData('Learnsets','togetic').learnset.softboiled = ["9D"];
		this.modData('Learnsets','togetic').learnset.daydream = ["9L1"];
		this.modData('Learnsets','togetic').learnset.flash = ["9M"];
		this.modData('Learnsets','togetic').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','togetic').learnset.fireblast;
		delete this.modData('Learnsets','togetic').learnset.growl;
		// Natu
		this.modData('Learnsets','natu').learnset.cosmicpower = ["9D"];
		this.modData('Learnsets','natu').learnset.flash = ["9M"];
		this.modData('Learnsets','natu').learnset.stasis = ["9M"];
		// Xatu
		this.modData('Learnsets','xatu').learnset.cosmicpower = ["9D"];
		this.modData('Learnsets','xatu').learnset.flash = ["9M"];
		this.modData('Learnsets','xatu').learnset.stasis = ["9M"];
		// Mareep
		this.modData('Learnsets','mareep').learnset.tailglow = ["9D"];
		this.modData('Learnsets','mareep').learnset.amnesia = ["9M"];
		this.modData('Learnsets','mareep').learnset.electroball = ["9M"];
		this.modData('Learnsets','mareep').learnset.flash = ["9M"];
		this.modData('Learnsets','mareep').learnset.spotlight = ["9E"];
		delete this.modData('Learnsets','mareep').learnset.trailhead;
		// Flaaffy
		this.modData('Learnsets','flaaffy').learnset.tailglow = ["9D"];
		this.modData('Learnsets','flaaffy').learnset.amnesia = ["9M"];
		this.modData('Learnsets','flaaffy').learnset.electroball = ["9M"];
		this.modData('Learnsets','flaaffy').learnset.flash = ["9M"];
		// Ampharos
		this.modData('Learnsets','ampharos').learnset.tailglow = ["9D"];
		this.modData('Learnsets','ampharos').learnset.amnesia = ["9M"];
		this.modData('Learnsets','ampharos').learnset.electroball = ["9M"];
		this.modData('Learnsets','ampharos').learnset.flash = ["9M"];
		this.modData('Learnsets','ampharos').learnset.metronome = ["9M"];
		// Bellossom
		this.modData('Learnsets','bellossom').learnset.junglehealing = ["9D"];
		this.modData('Learnsets','bellossom').learnset.grasswhistle = ["9L1"];
		this.modData('Learnsets','bellossom').learnset.healbell = ["9L1"];
		this.modData('Learnsets','bellossom').learnset.luckychant = ["9L1"];
		this.modData('Learnsets','bellossom').learnset.morningsun = ["9L1"];
		this.modData('Learnsets','bellossom').learnset.magicalleaf = ["9L1"];
		this.modData('Learnsets','bellossom').learnset.sweetscent = ["9L1"];
		this.modData('Learnsets','bellossom').learnset.flash = ["9M"];
		this.modData('Learnsets','bellossom').learnset.metronome = ["9M"];
		delete this.modData('Learnsets','bellossom').learnset.acid;
		delete this.modData('Learnsets','bellossom').learnset.moonblast;
		delete this.modData('Learnsets','bellossom').learnset.moonlight;
		delete this.modData('Learnsets','bellossom').learnset.poisonpowder;
		delete this.modData('Learnsets','bellossom').learnset.quiverdance;
		delete this.modData('Learnsets','bellossom').learnset.toxic;
		// Marill
		this.modData('Learnsets','marill').learnset.seismictoss = ["9D"];
		this.modData('Learnsets','marill').learnset.jetpunch = ["9L20"];
		this.modData('Learnsets','marill').learnset.aquaring = ["9L23"];
		this.modData('Learnsets','marill').learnset.raindance = ["9L28", "9M"];
		this.modData('Learnsets','marill').learnset.aquatail = ["9L31", "9M"];
		this.modData('Learnsets','marill').learnset.playrough = ["9L37"];
		this.modData('Learnsets','marill').learnset.doubleedge = ["9L40"];
		this.modData('Learnsets','marill').learnset.superpower = ["9L43", "9M"];
		this.modData('Learnsets','marill').learnset.liquidation = ["9L49"];
		this.modData('Learnsets','marill').learnset.hydropump = ["9M"];
		delete this.modData('Learnsets','marill').learnset.blizzard;
		// Azumarill
		this.modData('Learnsets','azumarill').learnset.seismictoss = ["9D"];
		this.modData('Learnsets','azumarill').learnset.jetpunch = ["9L21"];
		this.modData('Learnsets','azumarill').learnset.aquaring = ["9L25"];
		this.modData('Learnsets','azumarill').learnset.raindance = ["9L31", "9M"];
		this.modData('Learnsets','azumarill').learnset.aquatail = ["9L35", "9M"];
		this.modData('Learnsets','azumarill').learnset.playrough = ["9L42"];
		this.modData('Learnsets','azumarill').learnset.doubleedge = ["9L46"];
		this.modData('Learnsets','azumarill').learnset.superpower = ["9L53", "9M"];
		this.modData('Learnsets','azumarill').learnset.liquidation = ["9L57"];
		this.modData('Learnsets','azumarill').learnset.hydropump = ["9M"];
		delete this.modData('Learnsets','azumarill').learnset.blizzard;
		// Sudowoodo
		this.modData('Learnsets','sudowoodo').learnset.camouflage = ["9D"];
		delete this.modData('Learnsets','sudowoodo').learnset.earthquake;
		delete this.modData('Learnsets','sudowoodo').learnset.meteorbeam;
		// Politoed
		this.modData('Learnsets','politoed').learnset.nobleroar = ["9D"];
		this.modData('Learnsets','politoed').learnset.screech = ["9M"];
		delete this.modData('Learnsets','politoed').learnset.blizzard;
		delete this.modData('Learnsets','politoed').learnset.earthquake;
		// Hoppip
		this.modData('Learnsets','hoppip').learnset.pollenpuff = ["9D"];
		this.modData('Learnsets','hoppip').learnset.flash = ["9M"];
		// Skiploom
		this.modData('Learnsets','skiploom').learnset.pollenpuff = ["9D"];
		this.modData('Learnsets','skiploom').learnset.flash = ["9M"];
		// Jumpluff
		this.modData('Learnsets','jumpluff').learnset.pollenpuff = ["9D"];
		this.modData('Learnsets','jumpluff').learnset.flash = ["9M"];
		// Aipom
		this.modData('Learnsets','aipom').learnset.swing = ["9D"];
		this.modData('Learnsets','aipom').learnset.charm = ["9M"];
		delete this.modData('Learnsets','politoed').learnset.thunder;
		// Sunkern
		this.modData('Learnsets','sunkern').learnset.selfdestruct = ["9D"];
		this.modData('Learnsets','sunkern').learnset.flash = ["9M"];
		delete this.modData('Learnsets','sunkern').learnset.trailhead;
		// Sunflora
		this.modData('Learnsets','sunflora').learnset.heatwave = ["9D"];
		this.modData('Learnsets','sunflora').learnset.petalblizzard = ["9L28"];
		this.modData('Learnsets','sunflora').learnset.petaldance = ["9L37"];
		this.modData('Learnsets','sunflora').learnset.chloroblast = ["9L50"];
		this.modData('Learnsets','sunflora').learnset.flash = ["9M"];
		delete this.modData('Learnsets','sunflora').learnset.doubleedge;
		// Yanma
		this.modData('Learnsets','yanma').learnset.aircutter = ["9D"];
		this.modData('Learnsets','yanma').learnset.bugcloud = ["9L1"];
		delete this.modData('Learnsets','yanma').learnset.tackle;
		// Wooper
		this.modData('Learnsets','wooper').learnset.headbutt = ["9D"];
		this.modData('Learnsets','wooper').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','wooper').learnset.icepunch;
		delete this.modData('Learnsets','wooper').learnset.poweruppunch;
		delete this.modData('Learnsets','wooper').learnset.trailhead;
		// Wooper Paldea
		this.modData('Learnsets','wooperpaldea').learnset.headbutt = ["9D"];
		this.modData('Learnsets','wooperpaldea').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','wooperpaldea').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','wooperpaldea').learnset.trailhead;
		// Quagsire
		this.modData('Learnsets','quagsire').learnset.headbutt = ["9D"];
		this.modData('Learnsets','quagsire').learnset.toxic = ["9M"];
		// Espeon
		this.modData('Learnsets','espeon').learnset.extrasensory = ["9D"];
		this.modData('Learnsets','espeon').learnset.miracleeye = ["9L25"];
		this.modData('Learnsets','espeon').learnset.futuresight = ["9L29", "9M"];
		this.modData('Learnsets','espeon').learnset.psychup = ["9L33"];
		this.modData('Learnsets','espeon').learnset.morningsun = ["9L37"];
		this.modData('Learnsets','espeon').learnset.psychic = ["9L41", "9M"];
		this.modData('Learnsets','espeon').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','espeon').learnset.powerswap = ["9L49"];
		this.modData('Learnsets','espeon').learnset.flash = ["9M"];
		this.modData('Learnsets','espeon').learnset.nightmare = ["9M"];
		// Umbreon
		this.modData('Learnsets','umbreon').learnset.moonblast = ["9D"];
		this.modData('Learnsets','umbreon').learnset.meanlook = ["9L25"];
		this.modData('Learnsets','umbreon').learnset.assurance = ["9L29", "9M"];
		this.modData('Learnsets','umbreon').learnset.screech = ["9L33", "9M"];
		this.modData('Learnsets','umbreon').learnset.moonlight = ["9L37"];
		this.modData('Learnsets','umbreon').learnset.nightdaze = ["9L41"];
		this.modData('Learnsets','umbreon').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','umbreon').learnset.guardswap = ["9L49"];
		this.modData('Learnsets','umbreon').learnset.flash = ["9M"];
		this.modData('Learnsets','umbreon').learnset.nightmare = ["9M"];
		this.modData('Learnsets','umbreon').learnset.toxic = ["9M"];
		// Murkrow
		this.modData('Learnsets','murkrow').learnset.beatup = ["9D"];
		this.modData('Learnsets','murkrow').learnset.hex = ["9M"];
		this.modData('Learnsets','murkrow').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','murkrow').learnset.nightmare = ["9M"];
		this.modData('Learnsets','murkrow').learnset.toxic = ["9M"];
		// Slowking
		this.modData('Learnsets','slowking').learnset.skullbash = ["9D"];
		this.modData('Learnsets','slowking').learnset.trumpcard = ["9L0"];
		this.modData('Learnsets','slowking').learnset.raindance = ["9L49", "9M"];
		this.modData('Learnsets','slowking').learnset.flash = ["9M"];
		this.modData('Learnsets','slowking').learnset.stasis = ["9T"];
		delete this.modData('Learnsets','slowking').learnset.blizzard;
		delete this.modData('Learnsets','slowking').learnset.waterfall;
		// Slowking Galar
		this.modData('Learnsets','slowkinggalar').learnset.spicyextract = ["9D"];
		this.modData('Learnsets','slowkinggalar').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','slowkinggalar').learnset.blizzard;
		delete this.modData('Learnsets','slowkinggalar').learnset.waterfall;
		// Misdreavus
		this.modData('Learnsets','misdreavus').learnset.healblock = ["9D"];
		this.modData('Learnsets','misdreavus').learnset.terrify = ["9L37"];
		this.modData('Learnsets','misdreavus').learnset.eeriespell = ["9L59"];
		this.modData('Learnsets','misdreavus').learnset.disarmingvoice = ["9E"];
		this.modData('Learnsets','misdreavus').learnset.flash = ["9M"];
		this.modData('Learnsets','misdreavus').learnset.nightmare = ["9M"];
		this.modData('Learnsets','misdreavus').learnset.payback = ["9M"];
		delete this.modData('Learnsets','misdreavus').learnset.thunder;
		// Unown
		this.modData('Learnsets','unown').learnset.storedpower = ["9D"];
		// Wobbuffet
		this.modData('Learnsets','wobbuffet').learnset.rebound = ["9D"];
		// Girafarig
		this.modData('Learnsets','girafarig').learnset.feint = ["9D"];
		this.modData('Learnsets','girafarig').learnset.barrierbash = ["9L23"];
		this.modData('Learnsets','girafarig').learnset.agility = ["9L32"];
		this.modData('Learnsets','girafarig').learnset.zenheadbutt = ["9L46", "9M"];
		this.modData('Learnsets','girafarig').learnset.flash = ["9M"];
		this.modData('Learnsets','girafarig').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','girafarig').learnset.earthquake;
		delete this.modData('Learnsets','girafarig').learnset.thunder;
		// Pineco
		this.modData('Learnsets','pineco').learnset.leechseed = ["9D"];
		delete this.modData('Learnsets','pineco').learnset.earthquake;
		// Forretress
		this.modData('Learnsets','forretress').learnset.spikecannon = ["9D"];
		this.modData('Learnsets','forretress').learnset.shelter = ["9L60"];
		this.modData('Learnsets','forretress').learnset.zapcannon = ["9L1"];
		this.modData('Learnsets','forretress').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','forretress').learnset.steelbeam = ["9M"];
		delete this.modData('Learnsets','forretress').learnset.earthquake;
		// Dunsparce
		this.modData('Learnsets','dunsparce').learnset.dragondance = ["9D"];
		this.modData('Learnsets','dunsparce').learnset.mudslap = ["9L8"];
		this.modData('Learnsets','dunsparce').learnset.yawn = ["9L13"];
		this.modData('Learnsets','dunsparce').learnset.ancientpower = ["9L16"];
		this.modData('Learnsets','dunsparce').learnset.bodyslam = ["9L18"];
		this.modData('Learnsets','dunsparce').learnset.dig = ["9L21", "9M"];
		this.modData('Learnsets','dunsparce').learnset.roost = ["9L23", "9M"];
		this.modData('Learnsets','dunsparce').learnset.drillrun = ["9L26", "9M"];
		this.modData('Learnsets','dunsparce').learnset.coil = ["9L28"];
		this.modData('Learnsets','dunsparce').learnset.escapetunnel = ["9L31"];
		this.modData('Learnsets','dunsparce').learnset.glare = ["9L33"];
		this.modData('Learnsets','dunsparce').learnset.doubleedge = ["9L36"];
		this.modData('Learnsets','dunsparce').learnset.endeavor = ["9L38", "9M"];
		this.modData('Learnsets','dunsparce').learnset.airslash = ["9L41"];
		this.modData('Learnsets','dunsparce').learnset.dragonrush = ["9L43"];
		this.modData('Learnsets','dunsparce').learnset.endure = ["9L46", "9M"];
		this.modData('Learnsets','dunsparce').learnset.flail = ["9L48"];
		this.modData('Learnsets','dunsparce').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','dunsparce').learnset.thunder;
		// Gligar
		this.modData('Learnsets','gligar').learnset.skydrop = ["9D"];
		this.modData('Learnsets','gligar').learnset.assurance = ["9M"];
		this.modData('Learnsets','gligar').learnset.toxic = ["9M"];
		this.modData('Learnsets','gligar').learnset.lunge = ["9E"];
		// Steelix
		this.modData('Learnsets','steelix').learnset.sharpen = ["9D"];
		this.modData('Learnsets','steelix').learnset.escapetunnel = ["9L52"];
		this.modData('Learnsets','steelix').learnset.sandstorm = ["9M"];
		delete this.modData('Learnsets','steelix').learnset.meteorbeam;
		// Snubbull
		this.modData('Learnsets','snubbull').learnset.beatup = ["9D"];
		this.modData('Learnsets','snubbull').learnset.pounce = ["9L19"];
		this.modData('Learnsets','snubbull').learnset.compensation = ["9M"];
		this.modData('Learnsets','snubbull').learnset.rockslide = ["9M"];
		this.modData('Learnsets','snubbull').learnset.psychicfang = ["9E"];
		delete this.modData('Learnsets','snubbull').learnset.earthquake;
		delete this.modData('Learnsets','snubbull').learnset.flamethrower;
		delete this.modData('Learnsets','snubbull').learnset.fireblast;
		delete this.modData('Learnsets','snubbull').learnset.headbutt;
		delete this.modData('Learnsets','snubbull').learnset.thunderbolt;
		// Granbull
		this.modData('Learnsets','granbull').learnset.beatup = ["9D"];
		this.modData('Learnsets','granbull').learnset.compensation = ["9M"];
		this.modData('Learnsets','granbull').learnset.pounce = ["9L19"];
		delete this.modData('Learnsets','granbull').learnset.fireblast;
		delete this.modData('Learnsets','granbull').learnset.headbutt;
		// Qwilfish
		this.modData('Learnsets','qwilfish').learnset.fellstinger = ["9D"];
		this.modData('Learnsets','qwilfish').learnset.whitewater = ["9L12"];
		this.modData('Learnsets','qwilfish').learnset.pinmissile = ["9L24"];
		this.modData('Learnsets','qwilfish').learnset.barbbarrage = ["9L28"];
		this.modData('Learnsets','qwilfish').learnset.brine = ["9L32","9M"];
		this.modData('Learnsets','qwilfish').learnset.aquatail = ["9L48","9M"];
		this.modData('Learnsets','qwilfish').learnset.toxic = ["9L52", "9M"];
		this.modData('Learnsets','qwilfish').learnset.liquidation = ["9L56"];
		this.modData('Learnsets','qwilfish').learnset.rebound = ["9L60"];
		this.modData('Learnsets','qwilfish').learnset.hydropump = ["9M"];
		this.modData('Learnsets','qwilfish').learnset.nightmare = ["9M"];
		this.modData('Learnsets','qwilfish').learnset.revenge = ["9E"];
		delete this.modData('Learnsets','qwilfish').learnset.acupressure;
		delete this.modData('Learnsets','qwilfish').learnset.blizzard;
		delete this.modData('Learnsets','qwilfish').learnset.gyroball;
		delete this.modData('Learnsets','qwilfish').learnset.takedown;
		// Qwilfish Hisui
		this.modData('Learnsets','qwilfishhisui').learnset.fellstinger = ["9D"];
		this.modData('Learnsets','qwilfishhisui').learnset.whitewater = ["9L12"];
		this.modData('Learnsets','qwilfishhisui').learnset.pinmissile = ["9L24"];
		this.modData('Learnsets','qwilfishhisui').learnset.brine = ["9L32","9M"];
		this.modData('Learnsets','qwilfishhisui').learnset.aquatail = ["9L48","9M"];
		this.modData('Learnsets','qwilfishhisui').learnset.toxic = ["9L52", "9M"];
		this.modData('Learnsets','qwilfishhisui').learnset.mortalstrike = ["9L60"];
		this.modData('Learnsets','qwilfishhisui').learnset.nightmare = ["9M"];
		this.modData('Learnsets','qwilfishhisui').learnset.revenge = ["9E"];
		this.modData('Learnsets','qwilfishhisui').learnset.painsplit = ["9M"];
		this.modData('Learnsets','qwilfishhisui').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','qwilfishhisui').learnset.torment = ["9M"];
		delete this.modData('Learnsets','qwilfishhisui').learnset.acupressure;
		delete this.modData('Learnsets','qwilfishhisui').learnset.blizzard;
		delete this.modData('Learnsets','qwilfishhisui').learnset.gyroball;
		delete this.modData('Learnsets','qwilfishhisui').learnset.shockwave;
		delete this.modData('Learnsets','qwilfishhisui').learnset.thunderwave;
		// Scizor
		this.modData('Learnsets','scizor').learnset.guillotine = ["9D"];
		this.modData('Learnsets','scizor').learnset.pursuit = ["9L16"];
		this.modData('Learnsets','scizor').learnset.metaledge = ["9L36"];
		this.modData('Learnsets','scizor').learnset.razorwind = ["9L52"];
		this.modData('Learnsets','scizor').learnset.feint = ["9L56"];
		this.modData('Learnsets','scizor').learnset.ironhead = ["9M"];
		delete this.modData('Learnsets','scizor').learnset.doubleteam;
		// Shuckle
		this.modData('Learnsets','shuckle').learnset.stockpile = ["9D"];
		this.modData('Learnsets','shuckle').learnset.shelter = ["9L34"];
		this.modData('Learnsets','shuckle').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','shuckle').learnset.recycle = ["9M"];
		this.modData('Learnsets','shuckle').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','shuckle').learnset.earthquake;
		delete this.modData('Learnsets','shuckle').learnset.knockoff;
		delete this.modData('Learnsets','shuckle').learnset.meteorbeam;
		delete this.modData('Learnsets','shuckle').learnset.shellsmash;
		// Heracross
		this.modData('Learnsets','heracross').learnset.horndrill = ["9D"];
		this.modData('Learnsets','heracross').learnset.furyattack = ["9L4"];
		this.modData('Learnsets','heracross').learnset.endure = ["9L8", "9M"];
		this.modData('Learnsets','heracross').learnset.aerialace = ["9L12", "9M"];
		this.modData('Learnsets','heracross').learnset.pinmissile = ["9L16"];
		this.modData('Learnsets','heracross').learnset.armthrust = ["9L20"];
		this.modData('Learnsets','heracross').learnset.hornattack = ["9L24"];
		this.modData('Learnsets','heracross').learnset.reversal = ["9L28"];
		this.modData('Learnsets','heracross').learnset.chipaway = ["9L32", "9M"];
		this.modData('Learnsets','heracross').learnset.brickbreak = ["9L36", "9M"];
		this.modData('Learnsets','heracross').learnset.counter = ["9L40"];
		this.modData('Learnsets','heracross').learnset.swordsdance = ["9L44", "9M"];
		this.modData('Learnsets','heracross').learnset.throatchop = ["9L48"];
		this.modData('Learnsets','heracross').learnset.megahorn = ["9L52"];
		this.modData('Learnsets','heracross').learnset.closecombat = ["9L56"];
		delete this.modData('Learnsets','heracross').learnset.takedown;
		// Sneasel
		this.modData('Learnsets','sneasel').learnset.razorwind = ["9D"];
		this.modData('Learnsets','sneasel').learnset.chillywater = ["9M"];
		this.modData('Learnsets','sneasel').learnset.nightmare = ["9M"];
		// Sneasel Hisui
		this.modData('Learnsets','sneaselhisui').learnset.razorwind = ["9D"];
		this.modData('Learnsets','sneaselhisui').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','sneaselhisui').learnset.knockoff = ["9M"];
		// Teddiursa
		this.modData('Learnsets','teddiursa').learnset.slackoff = ["9D"];
		this.modData('Learnsets','teddiursa').learnset.amnesia = ["9M"];
		delete this.modData('Learnsets','teddiursa').learnset.earthquake;
		// Ursaring
		this.modData('Learnsets','ursaring').learnset.slackoff = ["9D"];
		this.modData('Learnsets','ursaring').learnset.amnesia = ["9M"];
		this.modData('Learnsets','ursaring').learnset.bodypress = ["9M"];
		this.modData('Learnsets','ursaring').learnset.knockoff = ["9M"];
		this.modData('Learnsets','ursaring').learnset.screech = ["9M"];
		// Slugma
		this.modData('Learnsets','slugma').learnset.burnup = ["9D"];
		this.modData('Learnsets','slugma').learnset.flash = ["9M"];
		// Magcargo
		this.modData('Learnsets','magcargo').learnset.magmastorm = ["9D"];
		this.modData('Learnsets','magcargo').learnset.flash = ["9M"];
		// Swinub
		this.modData('Learnsets','swinub').learnset.headbutt = ["9D"];
		this.modData('Learnsets','swinub').learnset.tussle = ["9L18"];
		this.modData('Learnsets','swinub').learnset.mudbomb = ["9L21"];
		this.modData('Learnsets','swinub').learnset.icywind = ["9L24","9M"];
		this.modData('Learnsets','swinub').learnset.iceshard = ["9L28"];
		this.modData('Learnsets','swinub').learnset.takedown = ["9L33"];
		this.modData('Learnsets','swinub').learnset.charm = ["9M"];
		this.modData('Learnsets','swinub').learnset.chillywater = ["9M"];
		// Piloswine
		this.modData('Learnsets','piloswine').learnset.highhorsepower = ["9D"];
		this.modData('Learnsets','piloswine').learnset.tussle = ["9L18"];
		this.modData('Learnsets','piloswine').learnset.mudbomb = ["9L21"];
		this.modData('Learnsets','piloswine').learnset.icywind = ["9L24","9M"];
		this.modData('Learnsets','piloswine').learnset.iceshard = ["9L28"];
		this.modData('Learnsets','piloswine').learnset.takedown = ["9L33"];
		this.modData('Learnsets','piloswine').learnset.charm = ["9M"];
		this.modData('Learnsets','piloswine').learnset.chillywater = ["9M"];
		// Corsola
		this.modData('Learnsets','corsola').learnset.lifedew = ["9D"];
		this.modData('Learnsets','corsola').learnset.dustspray = ["9L17"];
		this.modData('Learnsets','corsola').learnset.ancientpower = ["9L31"];
		this.modData('Learnsets','corsola').learnset.rockblast = ["9E"];
		this.modData('Learnsets','corsola').learnset.chillywater = ["9M"];
		this.modData('Learnsets','corsola').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','corsola').learnset.blizzard;
		delete this.modData('Learnsets','corsola').learnset.earthquake;
		delete this.modData('Learnsets','corsola').learnset.headsmash;
		delete this.modData('Learnsets','corsola').learnset.tantrum;
		delete this.modData('Learnsets','corsola').learnset.waterfall;
		// Corsola Galar
		this.modData('Learnsets','corsolagalar').learnset.clearsmog = ["9D"];
		this.modData('Learnsets','corsolagalar').learnset.dustspray = ["9L17"];
		this.modData('Learnsets','corsolagalar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.dreameater = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.endeavor = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.explosion = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.gravity = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.healblock = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.nightmare = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.painsplit = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.psychup = ["9M"];
		this.modData('Learnsets','corsolagalar').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','corsolagalar').learnset.blizzard;
		delete this.modData('Learnsets','corsolagalar').learnset.earthquake;
		delete this.modData('Learnsets','corsolagalar').learnset.headsmash;
		delete this.modData('Learnsets','corsolagalar').learnset.meteorbeam;
		delete this.modData('Learnsets','corsolagalar').learnset.tantrum;
		// Remoraid
		this.modData('Learnsets','remoraid').learnset.bulletseed = ["9D"];
		this.modData('Learnsets','remoraid').learnset.chillywater = ["9M"];
		this.modData('Learnsets','remoraid').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','remoraid').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','remoraid').learnset.simplebeam = ["9E"];
		this.modData('Learnsets','remoraid').learnset.snipeshot = ["9E"];
		delete this.modData('Learnsets','remoraid').learnset.blizzard;
		// Octillery
		this.modData('Learnsets','octillery').learnset.hydrocannon = ["9D"];
		this.modData('Learnsets','octillery').learnset.liquidation = ["9L1"];
		this.modData('Learnsets','octillery').learnset.signalbeam = ["9L28"];
		this.modData('Learnsets','octillery').learnset.chillywater = ["9M"];
		this.modData('Learnsets','octillery').learnset.laserfocus = ["9M"];
		delete this.modData('Learnsets','octillery').learnset.blizzard;
		delete this.modData('Learnsets','octillery').learnset.bulletseed;
		// Delibird
		this.modData('Learnsets','delibird').learnset.payday = ["9D"];
		this.modData('Learnsets','delibird').learnset.present = ["9L1"];
		this.modData('Learnsets','delibird').learnset.powdersnow = ["9L5"];
		this.modData('Learnsets','delibird').learnset.peck = ["9L10"];
		this.modData('Learnsets','delibird').learnset.icywind = ["9L20","9M"];
		this.modData('Learnsets','delibird').learnset.drillpeck = ["9L25"];
		this.modData('Learnsets','delibird').learnset.blizzard = ["9L35","9M"];
		this.modData('Learnsets','delibird').learnset.fly = ["9L40","9M"];
		this.modData('Learnsets','delibird').learnset.snowscape = ["9L50","9M"];
		this.modData('Learnsets','delibird').learnset.endeavor = ["9M"];
		this.modData('Learnsets','delibird').learnset.knockoff = ["9M"];
		this.modData('Learnsets','delibird').learnset.snatch = ["9M"];
		this.modData('Learnsets','delibird').learnset.trick = ["9M"];
		delete this.modData('Learnsets','delibird').learnset.bounce;
		delete this.modData('Learnsets','delibird').learnset.drillrun;
		// Mantine
		this.modData('Learnsets','mantine').learnset.skydrop = ["9D"];
		this.modData('Learnsets','mantine').learnset.waterpulse = ["9L7","9M"];
		this.modData('Learnsets','mantine').learnset.bubblebeam = ["9L19"];
		this.modData('Learnsets','mantine').learnset.bounce = ["9L44","9M"];
		this.modData('Learnsets','mantine').learnset.hydropump = ["9L47","9M"];
		this.modData('Learnsets','mantine').learnset.wavecrash = ["9L50"];
		this.modData('Learnsets','mantine').learnset.chillywater = ["9M"];
		this.modData('Learnsets','mantine').learnset.bodyslam = ["9E"];
		delete this.modData('Learnsets','mantine').learnset.earthquake;
		delete this.modData('Learnsets','mantine').learnset.roost;
		delete this.modData('Learnsets','mantine').learnset.slam;
		delete this.modData('Learnsets','mantine').learnset.stringshot;
		// Skarmory
		this.modData('Learnsets','skarmory').learnset.detect = ["9D"];
		this.modData('Learnsets','skarmory').learnset.metaledge = ["9L56"];
		this.modData('Learnsets','skarmory').learnset.flash = ["9M"];
		this.modData('Learnsets','skarmory').learnset.fullcollide = ["9M"];
		delete this.modData('Learnsets','skarmory').learnset.bodypress;
		// Houndour
		this.modData('Learnsets','houndour').learnset.throatchop = ["9D"];
		this.modData('Learnsets','houndour').learnset.flash = ["9M"];
		this.modData('Learnsets','houndour').learnset.hex = ["9M"];
		this.modData('Learnsets','houndour').learnset.nightmare = ["9M"];
		this.modData('Learnsets','houndour').learnset.toxic = ["9M"];
		this.modData('Learnsets','houndour').learnset.temperflare = ["9E"];
		// Houndoom
		this.modData('Learnsets','houndoom').learnset.throatchop = ["9D"];
		this.modData('Learnsets','houndoom').learnset.flash = ["9M"];
		this.modData('Learnsets','houndoom').learnset.hex = ["9M"];
		this.modData('Learnsets','houndoom').learnset.nightmare = ["9M"];
		this.modData('Learnsets','houndoom').learnset.toxic = ["9M"];
		// Kingdra
		this.modData('Learnsets','kingdra').learnset.chaoticstorm = ["9D"];
		this.modData('Learnsets','kingdra').learnset.whirlpool = ["9L0", "9M"];
		this.modData('Learnsets','kingdra').learnset.chillywater = ["9M"];
		this.modData('Learnsets','kingdra').learnset.toxic = ["9M"];
		// Phanpy
		this.modData('Learnsets','phanpy').learnset.watergun = ["9D"];
		this.modData('Learnsets','phanpy').learnset.tussle = ["9L10"];
		this.modData('Learnsets','phanpy').learnset.bodypress = ["9M"];
		this.modData('Learnsets','phanpy').learnset.encore = ["9M"];
		this.modData('Learnsets','phanpy').learnset.screech = ["9M"];
		delete this.modData('Learnsets','phanpy').learnset.rollout;
		// Donphan
		this.modData('Learnsets','donphan').learnset.uturn = ["9D"];
		this.modData('Learnsets','donphan').learnset.tussle = ["9L1"];
		this.modData('Learnsets','donphan').learnset.steamroller = ["9L0"];
		this.modData('Learnsets','donphan').learnset.bodypress = ["9M"];
		this.modData('Learnsets','donphan').learnset.encore = ["9M"];
		this.modData('Learnsets','donphan').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','donphan').learnset.screech = ["9M"];
		delete this.modData('Learnsets','donphan').learnset.furyattack;
		// Porygon2
		this.modData('Learnsets','porygon2').learnset.teleport = ["9D"];
		this.modData('Learnsets','porygon2').learnset.flash = ["9M"];
		this.modData('Learnsets','porygon2').learnset.powergem = ["9M"];
		// Stantler
		this.modData('Learnsets','stantler').learnset.followme = ["9D"];
		this.modData('Learnsets','stantler').learnset.barrierbash = ["9L21"];
		this.modData('Learnsets','stantler').learnset.takedown = ["9L27"];
		this.modData('Learnsets','stantler').learnset.calmmind = ["9M"];
		this.modData('Learnsets','stantler').learnset.flash = ["9M"];
		this.modData('Learnsets','stantler').learnset.hex = ["9M"];
		this.modData('Learnsets','stantler').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','stantler').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','stantler').learnset.earthquake;
		delete this.modData('Learnsets','stantler').learnset.thunder;
		// Tyrogue
		this.modData('Learnsets','tyrogue').learnset.submission = ["9D"];
		this.modData('Learnsets','tyrogue').learnset.chipaway = ["9M"];
		delete this.modData('Learnsets','tyrogue').learnset.earthquake;
		delete this.modData('Learnsets','tyrogue').learnset.stoneedge;
		// Hitmontop
		this.modData('Learnsets','hitmontop').learnset.victorydance = ["9D"];
		this.modData('Learnsets','hitmontop').learnset.teeterdance = ["9L8"];
		this.modData('Learnsets','hitmontop').learnset.gyroball = ["9L12","9M"];
		this.modData('Learnsets','hitmontop').learnset.detect = ["9L16"];
		this.modData('Learnsets','hitmontop').learnset.revenge = ["9L21"];
		this.modData('Learnsets','hitmontop').learnset.entrainment = ["9L24"];
		this.modData('Learnsets','hitmontop').learnset.wideguard = ["9L28"];
		this.modData('Learnsets','hitmontop').learnset.quickguard = ["9L28"];
		this.modData('Learnsets','hitmontop').learnset.suckerpunch = ["9L32"];
		this.modData('Learnsets','hitmontop').learnset.agility = ["9L36"];
		this.modData('Learnsets','hitmontop').learnset.dig = ["9L40","9M"];
		this.modData('Learnsets','hitmontop').learnset.closecombat = ["9L44"];
		this.modData('Learnsets','hitmontop').learnset.counter = ["9L48"];
		this.modData('Learnsets','hitmontop').learnset.lashout = ["9L52"];
		this.modData('Learnsets','hitmontop').learnset.chipaway = ["9M"];
		this.modData('Learnsets','hitmontop').learnset.endeavor = ["9M"];
		delete this.modData('Learnsets','hitmontop').learnset.earthquake;
		// Smoochum
		this.modData('Learnsets','smoochum').learnset.lovelykiss = ["9D"];
		this.modData('Learnsets','smoochum').learnset.confide = ["9E"];
		this.modData('Learnsets','smoochum').learnset.daydream = ["9L1"];
		this.modData('Learnsets','smoochum').learnset.amnesia = ["9M"];
		this.modData('Learnsets','smoochum').learnset.hex = ["9M"];
		this.modData('Learnsets','smoochum').learnset.nightmare = ["9M"];
		// Elekid
		this.modData('Learnsets','elekid').learnset.zingzap = ["9D"];
		this.modData('Learnsets','elekid').learnset.flash = ["9M"];
		this.modData('Learnsets','elekid').learnset.overdrive = ["9E"];
		// Magby
		this.modData('Learnsets','magby').learnset.pelletshot = ["9D"];
		this.modData('Learnsets','magby').learnset.amnesia = ["9M"];
		this.modData('Learnsets','magby').learnset.flash = ["9M"];
		this.modData('Learnsets','magby').learnset.sludgebomb = ["9M"];
		// Miltank
		this.modData('Learnsets','miltank').learnset.megakick = ["9D"];
		this.modData('Learnsets','miltank').learnset.steamroller = ["9L24"];
		this.modData('Learnsets','miltank').learnset.safeguard = ["9L29","9M"];
		this.modData('Learnsets','miltank').learnset.bodyslam = ["9L35"];
		this.modData('Learnsets','miltank').learnset.zenheadbutt = ["9L41","9M"];
		this.modData('Learnsets','miltank').learnset.captivate = ["9L47"];
		this.modData('Learnsets','miltank').learnset.playrough = ["9L53"];
		this.modData('Learnsets','miltank').learnset.healbell = ["9L59","9M"];
		this.modData('Learnsets','miltank').learnset.highhorsepower = ["9L65"];
		this.modData('Learnsets','miltank').learnset.endeavor = ["9L71","9M"];
		this.modData('Learnsets','miltank').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','miltank').learnset.thunder;
		delete this.modData('Learnsets','miltank').learnset.wakeupslap;
		// Blissey
		this.modData('Learnsets','blissey').learnset.happyhour = ["9D"];
		this.modData('Learnsets','blissey').learnset.revivalblessing = ["9L0"];
		delete this.modData('Learnsets','blissey').learnset.tantrum;
		delete this.modData('Learnsets','blissey').learnset.trailhead;
		// Raikou
		this.modData('Learnsets','raikou').learnset.extremespeed = ["9D"];
		this.modData('Learnsets','raikou').learnset.flash = ["9M"];
		// Entei
		this.modData('Learnsets','entei').learnset.napalm = ["9D"];
		this.modData('Learnsets','entei').learnset.earthquake = ["9M"];
		this.modData('Learnsets','entei').learnset.flash = ["9M"];
		this.modData('Learnsets','entei').learnset.rockslide = ["9M"];
		delete this.modData('Learnsets','entei').learnset.extremespeed;
		delete this.modData('Learnsets','entei').learnset.sacredfire;
		// Suicune
		this.modData('Learnsets','suicune').learnset.sheercold = ["9D"];
		delete this.modData('Learnsets','suicune').learnset.extremespeed;
		// Larvitar
		this.modData('Learnsets','larvitar').learnset.rage = ["9D"];
		this.modData('Learnsets','larvitar').learnset.rockthrow = ["9L1"];
		this.modData('Learnsets','larvitar').learnset.tussle = ["9L3"];
		this.modData('Learnsets','larvitar').learnset.chipaway = ["9L24", "9M"];
		this.modData('Learnsets','larvitar').learnset.darkpulse = ["9M"];
		// Pupitar
		this.modData('Learnsets','pupitar').learnset.rage = ["9D"];
		this.modData('Learnsets','pupitar').learnset.rockthrow = ["9L1"];
		this.modData('Learnsets','pupitar').learnset.tussle = ["9L3"];
		this.modData('Learnsets','pupitar').learnset.chipaway = ["9L24", "9M"];
		this.modData('Learnsets','pupitar').learnset.darkpulse = ["9M"];
		// Tyranitar
		this.modData('Learnsets','tyranitar').learnset.rage = ["9D"];
		this.modData('Learnsets','tyranitar').learnset.rockthrow = ["9L1"];
		this.modData('Learnsets','tyranitar').learnset.tussle = ["9L3"];
		this.modData('Learnsets','tyranitar').learnset.chipaway = ["9L24", "9M"];
		this.modData('Learnsets','tyranitar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','tyranitar').learnset.darkpulse = ["9M"];
		this.modData('Learnsets','tyranitar').learnset.nightmare = ["9M"];
		// Lugia
		this.modData('Learnsets','lugia').learnset.psychoboost = ["9D"];
		this.modData('Learnsets','lugia').learnset.gust = ["9L1"];
		this.modData('Learnsets','lugia').learnset.mist = ["9L9"];
		this.modData('Learnsets','lugia').learnset.fellswoop = ["9L15"];
		this.modData('Learnsets','lugia').learnset.flash = ["9M"];
		this.modData('Learnsets','lugia').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','lugia').learnset.dragonrush;
		// Ho-oh
		this.modData('Learnsets','hooh').learnset.burnup = ["9D"];
		this.modData('Learnsets','hooh').learnset.gust = ["9L1"];
		this.modData('Learnsets','hooh').learnset.lifedew = ["9L9"];
		this.modData('Learnsets','hooh').learnset.flash = ["9M"];
		this.modData('Learnsets','hooh').learnset.nightmare = ["9M"];
		// Celebi
		this.modData('Learnsets','celebi').learnset.forestscurse = ["9D"];
		this.modData('Learnsets','celebi').learnset.teleport = ["9L9"];
		this.modData('Learnsets','celebi').learnset.magicalleaf = ["9L17"];
		this.modData('Learnsets','celebi').learnset.ancientpower = ["9L25"];
		this.modData('Learnsets','celebi').learnset.lifedew = ["9L33"];
		this.modData('Learnsets','celebi').learnset.batonpass = ["9L41"];
		this.modData('Learnsets','celebi').learnset.naturalgift = ["9L49", "9M"];
		this.modData('Learnsets','celebi').learnset.healblock = ["9L57"];
		this.modData('Learnsets','celebi').learnset.futuresight = ["9L65", "9M"];
		this.modData('Learnsets','celebi').learnset.healingwish = ["9L73"];
		this.modData('Learnsets','celebi').learnset.leafstorm = ["9L81"];
		this.modData('Learnsets','celebi').learnset.perishsong = ["9L89"];
		this.modData('Learnsets','celebi').learnset.restorelife = ["9L97"];
		this.modData('Learnsets','celebi').learnset.safeguard = ["9M"];
		this.modData('Learnsets','celebi').learnset.flash = ["9M"];
		this.modData('Learnsets','celebi').learnset.nightmare = ["9M"];
		this.modData('Learnsets','celebi').learnset.trailhead = ["9M"];
		this.modData('Learnsets','celebi').learnset.stasis = ["9T"];
		// Treecko
		this.modData('Learnsets','treecko').learnset.dragondance = ["9D"];
		this.modData('Learnsets','treecko').learnset.slam = ["9L21"];
		this.modData('Learnsets','treecko').learnset.gigadrain = ["9L29", "9M"];
		this.modData('Learnsets','treecko').learnset.doublehit = ["9L37"];
		this.modData('Learnsets','treecko').learnset.endeavor = ["9L41", "9M"];
		this.modData('Learnsets','treecko').learnset.quickguard = ["9L45"];
		this.modData('Learnsets','treecko').learnset.energyball = ["9L49"];
		this.modData('Learnsets','treecko').learnset.flash = ["9M"];
		this.modData('Learnsets','treecko').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','treecko').learnset.screech = ["9M"];
		this.modData('Learnsets','treecko').learnset.branchpoke = ["9E"];
		// Grovyle
		this.modData('Learnsets','grovyle').learnset.dragondance = ["9D"];
		this.modData('Learnsets','grovyle').learnset.slam = ["9L23"];
		this.modData('Learnsets','grovyle').learnset.leafblade = ["9L33"];
		this.modData('Learnsets','grovyle').learnset.falseswipe = ["9L48", "9M"];
		this.modData('Learnsets','grovyle').learnset.leafstorm = ["9L58"];
		this.modData('Learnsets','grovyle').learnset.flash = ["9M"];
		this.modData('Learnsets','grovyle').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','grovyle').learnset.screech = ["9M"];
		// Sceptile
		this.modData('Learnsets','sceptile').learnset.woodhammer = ["9D"];
		this.modData('Learnsets','sceptile').learnset.solarblade = ["9L1"];
		this.modData('Learnsets','sceptile').learnset.slam = ["9L23"];
		this.modData('Learnsets','sceptile').learnset.leafblade = ["9L33"];
		this.modData('Learnsets','sceptile').learnset.falseswipe = ["9L51", "9M"];
		this.modData('Learnsets','sceptile').learnset.leafstorm = ["9L63"];
		this.modData('Learnsets','sceptile').learnset.flash = ["9M"];
		this.modData('Learnsets','sceptile').learnset.knockoff = ["9M"];
		this.modData('Learnsets','sceptile').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','sceptile').learnset.screech = ["9M"];
		// Torchic
		this.modData('Learnsets','torchic').learnset.pluck = ["9D"];
		this.modData('Learnsets','torchic').learnset.flamecharge = ["9L19"];
		this.modData('Learnsets','torchic').learnset.slash = ["9L23"];
		this.modData('Learnsets','torchic').learnset.firespin = ["9L28"];
		this.modData('Learnsets','torchic').learnset.flameburst = ["9L37"];
		this.modData('Learnsets','torchic').learnset.trailhead = ["9M"];
		this.modData('Learnsets','torchic').learnset.quickattack = ["9E"];
		delete this.modData('Learnsets','torchic').learnset.curse;
		delete this.modData('Learnsets','torchic').learnset.defog;
		// Combusken
		this.modData('Learnsets','combusken').learnset.vacuumwave = ["9D"];
		this.modData('Learnsets','combusken').learnset.slash = ["9L25"];
		this.modData('Learnsets','combusken').learnset.blazekick = ["9L31"];
		this.modData('Learnsets','combusken').learnset.temperflare = ["9L42"];
		this.modData('Learnsets','combusken').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','combusken').learnset.defog;
		// Blaziken
		this.modData('Learnsets','blaziken').learnset.vacuumwave = ["9D"];
		this.modData('Learnsets','blaziken').learnset.firepunch = ["9L0", "9M"];
		this.modData('Learnsets','blaziken').learnset.slash = ["9L25"];
		this.modData('Learnsets','blaziken').learnset.blazekick = ["9L31"];
		this.modData('Learnsets','blaziken').learnset.temperflare = ["9L44"];
		this.modData('Learnsets','blaziken').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','blaziken').learnset.defog;
		delete this.modData('Learnsets','blaziken').learnset.earthquake;
		// Mudkip
		this.modData('Learnsets','mudkip').learnset.liquidation = ["9D"];
		this.modData('Learnsets','mudkip').learnset.whitewater = ["9L4"];
		this.modData('Learnsets','mudkip').learnset.whirlpool = ["9L25", "9M"];
		this.modData('Learnsets','mudkip').learnset.rockslide = ["9L33", "9M"];
		this.modData('Learnsets','mudkip').learnset.wavecrash = ["9L36"];
		this.modData('Learnsets','mudkip').learnset.chipaway = ["9M"];
		delete this.modData('Learnsets','mudkip').learnset.blizzard;
		delete this.modData('Learnsets','mudkip').learnset.rockthrow;
		delete this.modData('Learnsets','mudkip').learnset.takedown;
		delete this.modData('Learnsets','mudkip').learnset.watergun;
		// Marshtomp
		this.modData('Learnsets','marshtomp').learnset.liquidation = ["9D"];
		this.modData('Learnsets','marshtomp').learnset.whitewater = ["9L4"];
		this.modData('Learnsets','marshtomp').learnset.muddywater = ["9L25"];
		this.modData('Learnsets','marshtomp').learnset.rockslide = ["9L38", "9M"];
		this.modData('Learnsets','marshtomp').learnset.wavecrash = ["9L43"];
		this.modData('Learnsets','marshtomp').learnset.chipaway = ["9M"];
		this.modData('Learnsets','marshtomp').learnset.knockoff = ["9M"];
		delete this.modData('Learnsets','marshtomp').learnset.blizzard;
		delete this.modData('Learnsets','marshtomp').learnset.takedown;
		delete this.modData('Learnsets','marshtomp').learnset.watergun;
		// Swampert
		this.modData('Learnsets','swampert').learnset.liquidation = ["9D"];
		this.modData('Learnsets','swampert').learnset.jetpunch = ["9L0"];
		this.modData('Learnsets','swampert').learnset.whitewater = ["9L4"];
		this.modData('Learnsets','swampert').learnset.muddywater = ["9L25"];
		this.modData('Learnsets','swampert').learnset.rockslide = ["9L39", "9M"];
		this.modData('Learnsets','swampert').learnset.wavecrash = ["9L44"];
		this.modData('Learnsets','swampert').learnset.chipaway = ["9M"];
		this.modData('Learnsets','swampert').learnset.knockoff = ["9M"];
		delete this.modData('Learnsets','swampert').learnset.blizzard;
		delete this.modData('Learnsets','swampert').learnset.takedown;
		delete this.modData('Learnsets','swampert').learnset.watergun;
		// Poochyena
		this.modData('Learnsets','poochyena').learnset.partingshot = ["9D"];
		this.modData('Learnsets','poochyena').learnset.toxic = ["9M"];
		// Mightyena
		this.modData('Learnsets','mightyena').learnset.partingshot = ["9D"];
		this.modData('Learnsets','mightyena').learnset.toxic = ["9M"];
		// Zigzagoon
		this.modData('Learnsets','zigzagoon').learnset.extremespeed = ["9D"];
		this.modData('Learnsets','zigzagoon').learnset.odorsleuth = ["9L12"];
		this.modData('Learnsets','zigzagoon').learnset.headbutt = ["9L15"];
		this.modData('Learnsets','zigzagoon').learnset.babydolleyes = ["9L18"];
		this.modData('Learnsets','zigzagoon').learnset.pinmissile = ["9L21"];
		this.modData('Learnsets','zigzagoon').learnset.rest = ["9L24", "9M"];
		this.modData('Learnsets','zigzagoon').learnset.takedown = ["9L27"];
		this.modData('Learnsets','zigzagoon').learnset.fling = ["9L30", "9M"];
		this.modData('Learnsets','zigzagoon').learnset.flail = ["9L33"];
		this.modData('Learnsets','zigzagoon').learnset.bellydrum = ["9L36"];
		this.modData('Learnsets','zigzagoon').learnset.doubleedge = ["9L39"];
		this.modData('Learnsets','zigzagoon').learnset.chillywater = ["9M"];
		this.modData('Learnsets','zigzagoon').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','zigzagoon').learnset.blizzard;
		delete this.modData('Learnsets','zigzagoon').learnset.icebeam;
		delete this.modData('Learnsets','zigzagoon').learnset.thunder;
		delete this.modData('Learnsets','zigzagoon').learnset.thunderbolt;
		// Zigzagoon Galar
		this.modData('Learnsets','zigzagoongalar').learnset.pounce = ["9D"];
		this.modData('Learnsets','zigzagoongalar').learnset.odorsleuth = ["9L12"];
		this.modData('Learnsets','zigzagoongalar').learnset.headbutt = ["9L15"];
		this.modData('Learnsets','zigzagoongalar').learnset.honeclaws = ["9L18", "9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.pinmissile = ["9L21"];
		this.modData('Learnsets','zigzagoongalar').learnset.rest = ["9L24", "9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.takedown = ["9L27"];
		this.modData('Learnsets','zigzagoongalar').learnset.terrify = ["9L30"];
		this.modData('Learnsets','zigzagoongalar').learnset.counter = ["9L33"];
		this.modData('Learnsets','zigzagoongalar').learnset.taunt = ["9L36", "9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.doubleedge = ["9L39"];
		this.modData('Learnsets','zigzagoongalar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.embargo = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.lastresort = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.snatch = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.spite = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.toxic = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.torment = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.trailhead = ["9M"];
		this.modData('Learnsets','zigzagoongalar').learnset.pursuit = ["9E"];
		delete this.modData('Learnsets','zigzagoongalar').learnset.blizzard;
		delete this.modData('Learnsets','zigzagoongalar').learnset.icebeam;
		delete this.modData('Learnsets','zigzagoongalar').learnset.scaryface;
		delete this.modData('Learnsets','zigzagoongalar').learnset.thunder;
		delete this.modData('Learnsets','zigzagoongalar').learnset.thunderbolt;
		// Linoone
		this.modData('Learnsets','linoone').learnset.extremespeed = ["9D"];
		this.modData('Learnsets','linoone').learnset.playrough = ["9L1"];
		this.modData('Learnsets','linoone').learnset.rototiller = ["9L1"];
		this.modData('Learnsets','linoone').learnset.odorsleuth = ["9L12"];
		this.modData('Learnsets','linoone').learnset.headbutt = ["9L15"];
		this.modData('Learnsets','linoone').learnset.babydolleyes = ["9L18"];
		this.modData('Learnsets','linoone').learnset.furyswipes = ["9L21"];
		this.modData('Learnsets','linoone').learnset.rest = ["9L28", "9M"];
		this.modData('Learnsets','linoone').learnset.takedown = ["9L33"];
		this.modData('Learnsets','linoone').learnset.fling = ["9L38", "9M"];
		this.modData('Learnsets','linoone').learnset.flail = ["9L43"];
		this.modData('Learnsets','linoone').learnset.bellydrum = ["9L48"];
		this.modData('Learnsets','linoone').learnset.doubleedge = ["9L53"];
		this.modData('Learnsets','linoone').learnset.chillywater = ["9M"];
		this.modData('Learnsets','linoone').learnset.trailhead = ["9M"];
		this.modData('Learnsets','linoone').learnset.xscissor = ["9M"];
		delete this.modData('Learnsets','linoone').learnset.babydolleyes;
		delete this.modData('Learnsets','linoone').learnset.blizzard;
		delete this.modData('Learnsets','linoone').learnset.pinmissile;
		delete this.modData('Learnsets','linoone').learnset.thunder;
		// Linoone Galar
		this.modData('Learnsets','linoonegalar').learnset.throatchop = ["9D"];
		this.modData('Learnsets','linoonegalar').learnset.playrough = ["9L1"];
		this.modData('Learnsets','linoonegalar').learnset.tussle = ["9L1"];
		this.modData('Learnsets','linoonegalar').learnset.odorsleuth = ["9L12"];
		this.modData('Learnsets','linoonegalar').learnset.headbutt = ["9L15"];
		this.modData('Learnsets','linoonegalar').learnset.honeclaws = ["9L18", "9M"];
		this.modData('Learnsets','linoonegalar').learnset.furyswipes = ["9L21"];
		this.modData('Learnsets','linoonegalar').learnset.rest = ["9L28", "9M"];
		this.modData('Learnsets','linoonegalar').learnset.takedown = ["9L33"];
		this.modData('Learnsets','linoonegalar').learnset.terrify = ["9L38"];
		this.modData('Learnsets','linoonegalar').learnset.counter = ["9L43"];
		this.modData('Learnsets','linoonegalar').learnset.taunt = ["9L48", "9M"];
		this.modData('Learnsets','linoonegalar').learnset.doubleedge = ["9L53"];
		this.modData('Learnsets','linoonegalar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.embargo = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.lastresort = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.snatch = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.spite = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.torment = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.toxic = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.trailhead = ["9M"];
		this.modData('Learnsets','linoonegalar').learnset.xscissor = ["9M"];
		delete this.modData('Learnsets','linoonegalar').learnset.babydolleyes;
		delete this.modData('Learnsets','linoonegalar').learnset.blizzard;
		delete this.modData('Learnsets','linoonegalar').learnset.bodypress;
		delete this.modData('Learnsets','linoonegalar').learnset.pinmissile;
		delete this.modData('Learnsets','linoonegalar').learnset.scaryface;
		delete this.modData('Learnsets','linoonegalar').learnset.thunder;
		// Beautifly
		this.modData('Learnsets','beautifly').learnset.drainingkiss = ["9D"];
		this.modData('Learnsets','beautifly').learnset.leechlife = ["9L20","9M"];
		this.modData('Learnsets','beautifly').learnset.vitaldrain = ["9L37","9M"];
		this.modData('Learnsets','beautifly').learnset.charm = ["9M"];
		this.modData('Learnsets','beautifly').learnset.flash = ["9M"];
		this.modData('Learnsets','beautifly').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','beautifly').learnset.aircutter;
		delete this.modData('Learnsets','beautifly').learnset.rage;
		// Dustox
		this.modData('Learnsets','dustox').learnset.nightdaze = ["9D"];
		this.modData('Learnsets','dustox').learnset.flash = ["9M"];
		this.modData('Learnsets','dustox').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','dustox').learnset.toxic = ["9L38", "9M"];
		// Lotad
		this.modData('Learnsets','lotad').learnset.soak = ["9D"];
		this.modData('Learnsets','lotad').learnset.bubble = ["9L6"];
		this.modData('Learnsets','lotad').learnset.naturalgift = ["9L15", "9M"];
		this.modData('Learnsets','lotad').learnset.bubblebeam = ["9L18"];
		this.modData('Learnsets','lotad').learnset.naturepower = ["9L21", "9M"];
		this.modData('Learnsets','lotad').learnset.raindance = ["9L24", "9M"];
		this.modData('Learnsets','lotad').learnset.gigadrain = ["9L27", "9M"];
		this.modData('Learnsets','lotad').learnset.zenheadbutt = ["9L30", "9M"];
		this.modData('Learnsets','lotad').learnset.energyball = ["9L33"];
		this.modData('Learnsets','lotad').learnset.flail = ["9M"];
		delete this.modData('Learnsets','lotad').learnset.blizzard;
		delete this.modData('Learnsets','lotad').learnset.trailhead;
		// Lombre
		this.modData('Learnsets','lombre').learnset.soak = ["9D"];
		this.modData('Learnsets','lombre').learnset.furyswipes = ["9L0"];
		this.modData('Learnsets','lombre').learnset.bubble = ["9L6"];
		this.modData('Learnsets','lombre').learnset.naturalgift = ["9L16", "9M"];
		this.modData('Learnsets','lombre').learnset.fakeout = ["9L20"];
		this.modData('Learnsets','lombre').learnset.bubblebeam = ["9L24"];
		this.modData('Learnsets','lombre').learnset.grasswhistle = ["9L28"];
		this.modData('Learnsets','lombre').learnset.naturepower = ["9L32", "9M"];
		this.modData('Learnsets','lombre').learnset.raindance = ["9L36", "9M"];
		this.modData('Learnsets','lombre').learnset.gigadrain = ["9L40", "9M"];
		this.modData('Learnsets','lombre').learnset.zenheadbutt = ["9L44", "9M"];
		this.modData('Learnsets','lombre').learnset.knockoff = ["9L48", "9M"];
		this.modData('Learnsets','lombre').learnset.teeterdance = ["9L52"];
		this.modData('Learnsets','lombre').learnset.energyball = ["9L56"];
		this.modData('Learnsets','lombre').learnset.hydropump = ["9L60", "9M"];
		this.modData('Learnsets','lombre').learnset.flail = ["9M"];
		delete this.modData('Learnsets','lombre').learnset.blizzard;
		// Ludicolo
		this.modData('Learnsets','ludicolo').learnset.drumbeating = ["9D"];
		this.modData('Learnsets','ludicolo').learnset.aquastep = ["9L0"];
		this.modData('Learnsets','ludicolo').learnset.furyswipes = ["9L1"];
		this.modData('Learnsets','ludicolo').learnset.grasswhistle = ["9L1"];
		this.modData('Learnsets','ludicolo').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','ludicolo').learnset.flail = ["9M"];
		delete this.modData('Learnsets','ludicolo').learnset.blizzard;
		// Seedot
		this.modData('Learnsets','seedot').learnset.irondefense = ["9D"];
		this.modData('Learnsets','seedot').learnset.bide = ["9L3"];
		this.modData('Learnsets','seedot').learnset.branchpoke = ["9L9"];
		this.modData('Learnsets','seedot').learnset.growth = ["9L15"];
		this.modData('Learnsets','seedot').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','seedot').learnset.falsesurrender = ["9E"];
		delete this.modData('Learnsets','seedot').learnset.absorb;
		delete this.modData('Learnsets','seedot').learnset.defog;
		delete this.modData('Learnsets','seedot').learnset.megadrain;
		delete this.modData('Learnsets','seedot').learnset.nightslash;
		// Nuzleaf
		this.modData('Learnsets','nuzleaf').learnset.forestscurse = ["9D"];
		this.modData('Learnsets','nuzleaf').learnset.bide = ["9L3"];
		this.modData('Learnsets','nuzleaf').learnset.branchpoke = ["9L9"];
		this.modData('Learnsets','nuzleaf').learnset.growth = ["9L16"];
		this.modData('Learnsets','nuzleaf').learnset.fakeout = ["9L20"];
		this.modData('Learnsets','nuzleaf').learnset.payback = ["9L24"];
		this.modData('Learnsets','nuzleaf').learnset.grasswhistle = ["9L28"];
		this.modData('Learnsets','nuzleaf').learnset.naturepower = ["9L32", "9M"];
		this.modData('Learnsets','nuzleaf').learnset.sunnyday = ["9L36", "9M"];
		this.modData('Learnsets','nuzleaf').learnset.synthesis = ["9L40", "9M"];
		this.modData('Learnsets','nuzleaf').learnset.extrasensory = ["9L44"];
		this.modData('Learnsets','nuzleaf').learnset.suckerpunch = ["9L48"];
		this.modData('Learnsets','nuzleaf').learnset.swagger = ["9L52"];
		this.modData('Learnsets','nuzleaf').learnset.leafblade = ["9L56"];
		this.modData('Learnsets','nuzleaf').learnset.explosion = ["9L60", "9M"];
		this.modData('Learnsets','nuzleaf').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','nuzleaf').learnset.absorb;
		delete this.modData('Learnsets','nuzleaf').learnset.chillywater;
		delete this.modData('Learnsets','nuzleaf').learnset.megadrain;
		// Shiftry
		this.modData('Learnsets','shiftry').learnset.forestscurse = ["9D"];
		this.modData('Learnsets','shiftry').learnset.razorwind = ["9L0"];
		this.modData('Learnsets','shiftry').learnset.grasswhistle = ["9L1"];
		this.modData('Learnsets','shiftry').learnset.leaftornado = ["9L1"];
		this.modData('Learnsets','shiftry').learnset.solarblade = ["9L1"];
		this.modData('Learnsets','shiftry').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','shiftry').learnset.chillywater;
		// Taillow
		this.modData('Learnsets','taillow').learnset.featherdance = ["9D"];
		this.modData('Learnsets','taillow').learnset.chatter = ["9E"];
		delete this.modData('Learnsets','taillow').learnset.boomburst;
		// Swellow
		this.modData('Learnsets','swellow').learnset.featherdance = ["9D"];
		// Wingull
		this.modData('Learnsets','wingull').learnset.belch = ["9D"];
		delete this.modData('Learnsets','wingull').learnset.knockoff;
		// Pelipper
		this.modData('Learnsets','pelipper').learnset.belch = ["9D"];
		delete this.modData('Learnsets','pelipper').learnset.knockoff;
		// Ralts
		this.modData('Learnsets','ralts').learnset.sing = ["9D"];
		this.modData('Learnsets','ralts').learnset.confide = ["9L1"];
		this.modData('Learnsets','ralts').learnset.confusion = ["9L1"];
		this.modData('Learnsets','ralts').learnset.daydream = ["9L4"];
		this.modData('Learnsets','ralts').learnset.flash = ["9M"];
		this.modData('Learnsets','ralts').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','ralts').learnset.knockoff;
		delete this.modData('Learnsets','ralts').learnset.thunderbolt;
		// Kirlia
		this.modData('Learnsets','kirlia').learnset.sing = ["9D"];
		this.modData('Learnsets','kirlia').learnset.confide = ["9L1"];
		this.modData('Learnsets','kirlia').learnset.confusion = ["9L1"];
		this.modData('Learnsets','kirlia').learnset.daydream = ["9L4"];
		this.modData('Learnsets','kirlia').learnset.flash = ["9M"];
		this.modData('Learnsets','kirlia').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','kirlia').learnset.knockoff;
		delete this.modData('Learnsets','kirlia').learnset.thunderbolt;
		// Gardevoir
		this.modData('Learnsets','gardevoir').learnset.sing = ["9D"];
		this.modData('Learnsets','gardevoir').learnset.alluringvoice = ["9L0"];
		this.modData('Learnsets','gardevoir').learnset.confide = ["9L1"];
		this.modData('Learnsets','gardevoir').learnset.confusion = ["9L1"];
		this.modData('Learnsets','gardevoir').learnset.daydream = ["9L4"];
		this.modData('Learnsets','gardevoir').learnset.flash = ["9M"];
		this.modData('Learnsets','gardevoir').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','gardevoir').learnset.knockoff;
		// Surskit
		this.modData('Learnsets','surskit').learnset.soak = ["9D"];
		delete this.modData('Learnsets','surskit').learnset.blizzard;
		delete this.modData('Learnsets','surskit').learnset.waterfall;
		// Masquerain
		this.modData('Learnsets','masquerain').learnset.glare = ["9D"];
		this.modData('Learnsets','masquerain').learnset.terrify = ["9L0"];
		this.modData('Learnsets','masquerain').learnset.agility = ["9L22"];
		this.modData('Learnsets','masquerain').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','masquerain').learnset.blizzard;
		delete this.modData('Learnsets','masquerain').learnset.scaryface;
		delete this.modData('Learnsets','masquerain').learnset.waterfall;
		// Shroomish
		this.modData('Learnsets','shroomish').learnset.doubleedge = ["9D"];
		this.modData('Learnsets','shroomish').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','shroomish').learnset.toxic = ["9L33", "9M"];
		delete this.modData('Learnsets','shroomish').learnset.synthesis;
		// Breloom
		this.modData('Learnsets','breloom').learnset.jumpkick = ["9D"];
		this.modData('Learnsets','breloom').learnset.focuspunch = ["9L55"];
		this.modData('Learnsets','breloom').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','breloom').learnset.toxic = ["9M"];
		this.modData('Learnsets','breloom').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','breloom').learnset.stoneedge;
		delete this.modData('Learnsets','breloom').learnset.synthesis;
		// Slakoth
		this.modData('Learnsets','slakoth').learnset.bide = ["9D"];
		this.modData('Learnsets','slakoth').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','slakoth').learnset.blizzard;
		delete this.modData('Learnsets','slakoth').learnset.flamethrower;
		delete this.modData('Learnsets','slakoth').learnset.fireblast;
		delete this.modData('Learnsets','slakoth').learnset.icebeam;
		delete this.modData('Learnsets','slakoth').learnset.metronome;
		delete this.modData('Learnsets','slakoth').learnset.thunder;
		delete this.modData('Learnsets','slakoth').learnset.thunderbolt;
		// Vigoroth
		this.modData('Learnsets','vigoroth').learnset.bide = ["9D"];
		this.modData('Learnsets','vigoroth').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','vigoroth').learnset.blizzard;
		delete this.modData('Learnsets','vigoroth').learnset.earthquake;
		delete this.modData('Learnsets','vigoroth').learnset.flamethrower;
		delete this.modData('Learnsets','vigoroth').learnset.fireblast;
		delete this.modData('Learnsets','vigoroth').learnset.icebeam;
		delete this.modData('Learnsets','vigoroth').learnset.metronome;
		delete this.modData('Learnsets','vigoroth').learnset.thunder;
		delete this.modData('Learnsets','vigoroth').learnset.thunderbolt;
		// Slaking
		this.modData('Learnsets','slaking').learnset.bide = ["9D"];
		this.modData('Learnsets','slaking').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','slaking').learnset.blizzard;
		delete this.modData('Learnsets','slaking').learnset.metronome;
		delete this.modData('Learnsets','slaking').learnset.fireblast;
		delete this.modData('Learnsets','slaking').learnset.thunder;
		// Nincada
		this.modData('Learnsets','nincada').learnset.detect = ["9D"];
		this.modData('Learnsets','nincada').learnset.cut = ["9E"];
		this.modData('Learnsets','nincada').learnset.leechlife = ["9L5"];
		this.modData('Learnsets','nincada').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','nincada').learnset.absorb;
		// Ninjask
		this.modData('Learnsets','ninjask').learnset.aircutter = ["9D"];
		this.modData('Learnsets','ninjask').learnset.flash = ["9M"];
		this.modData('Learnsets','ninjask').learnset.leechlife = ["9L5"];
		this.modData('Learnsets','ninjask').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','ninjask').learnset.absorb;
		// Shedinja
		this.modData('Learnsets','shedinja').learnset.playdead = ["9D"];
		this.modData('Learnsets','shedinja').learnset.leechlife = ["9L5"];
		this.modData('Learnsets','shedinja').learnset.nightmare = ["9M"];
		this.modData('Learnsets','shedinja').learnset.stasis = ["9M"];
		this.modData('Learnsets','shedinja').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','shedinja').learnset.absorb;
		// Whismur
		this.modData('Learnsets','whismur').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','whismur').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','whismur').learnset.blizzard;
		delete this.modData('Learnsets','whismur').learnset.fireblast;
		delete this.modData('Learnsets','whismur').learnset.flamethrower;
		delete this.modData('Learnsets','whismur').learnset.icebeam;
		// Loudred
		this.modData('Learnsets','loudred').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','loudred').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','loudred').learnset.blizzard;
		delete this.modData('Learnsets','loudred').learnset.fireblast;
		delete this.modData('Learnsets','loudred').learnset.flamethrower;
		delete this.modData('Learnsets','loudred').learnset.icebeam;
		// Exploud
		this.modData('Learnsets','exploud').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','exploud').learnset.bodypress = ["9M"];
		this.modData('Learnsets','exploud').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','exploud').learnset.blizzard;
		delete this.modData('Learnsets','exploud').learnset.fireblast;
		// Makuhita
		this.modData('Learnsets','makuhita').learnset.matblock = ["9D"];
		this.modData('Learnsets','makuhita').learnset.wakeupslap = ["9L22"];
		this.modData('Learnsets','makuhita').learnset.bodypress = ["9L34","9M"];
		this.modData('Learnsets','makuhita').learnset.vitalthrow = ["9L40"];
		this.modData('Learnsets','makuhita').learnset.closecombat = ["9L49"];
		delete this.modData('Learnsets','makuhita').learnset.earthquake;
		// Hariyama
		this.modData('Learnsets','hariyama').learnset.matblock = ["9D"];
		this.modData('Learnsets','hariyama').learnset.wakeupslap = ["9L22"];
		this.modData('Learnsets','hariyama').learnset.bodypress = ["9L38","9M"];
		this.modData('Learnsets','hariyama').learnset.vitalthrow = ["9L46"];
		this.modData('Learnsets','hariyama').learnset.closecombat = ["9L60"];
		// Azurill
		this.modData('Learnsets','azurill').learnset.doubleedge = ["9D"];
		this.modData('Learnsets','azurill').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','azurill').learnset.blizzard;
		delete this.modData('Learnsets','azurill').learnset.icebeam;
		delete this.modData('Learnsets','azurill').learnset.waterfall;
		// Nosepass
		this.modData('Learnsets','nosepass').learnset.electrify = ["9D"];
		this.modData('Learnsets','nosepass').learnset.headsmash = ["9E"];
		delete this.modData('Learnsets','nosepass').learnset.thunder;
		// Skitty
		this.modData('Learnsets','skitty').learnset.payday = ["9D"];
		this.modData('Learnsets','skitty').learnset.amnesia = ["9M"];
		this.modData('Learnsets','skitty').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','skitty').learnset.blizzard;
		delete this.modData('Learnsets','skitty').learnset.icebeam;
		delete this.modData('Learnsets','skitty').learnset.thunder;
		delete this.modData('Learnsets','skitty').learnset.thunderbolt;
		// Delcatty
		this.modData('Learnsets','delcatty').learnset.payday = ["9D"];
		this.modData('Learnsets','delcatty').learnset.amnesia = ["9M"];
		this.modData('Learnsets','delcatty').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','delcatty').learnset.blizzard;
		delete this.modData('Learnsets','delcatty').learnset.thunder;
		// Sableye
		this.modData('Learnsets','sableye').learnset.crunch = ["9D"];
		this.modData('Learnsets','sableye').learnset.flash = ["9M"];
		this.modData('Learnsets','sableye').learnset.nightmare = ["9M"];
		// Mawile
		this.modData('Learnsets','mawile').learnset.jawlock = ["9D"];
		this.modData('Learnsets','mawile').learnset.pounce = ["9L1"];
		this.modData('Learnsets','mawile').learnset.psychicfang = ["9E"];
		delete this.modData('Learnsets','mawile').learnset.blizzard;
		delete this.modData('Learnsets','mawile').learnset.fairywind;
		delete this.modData('Learnsets','mawile').learnset.fireblast;
		delete this.modData('Learnsets','mawile').learnset.flamethrower;
		delete this.modData('Learnsets','mawile').learnset.icebeam;
		delete this.modData('Learnsets','mawile').learnset.poweruppunch;
		delete this.modData('Learnsets','mawile').learnset.stoneedge;
		delete this.modData('Learnsets','mawile').learnset.thunder;
		delete this.modData('Learnsets','mawile').learnset.thunderbolt;
		// Aron
		this.modData('Learnsets','aron').learnset.scaryface = ["9D"];
		this.modData('Learnsets','aron').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','aron').learnset.stoneedge = ["9M"];
		delete this.modData('Learnsets','aron').learnset.earthquake;
		// Lairon
		this.modData('Learnsets','lairon').learnset.scaryface = ["9D"];
		this.modData('Learnsets','lairon').learnset.fullcollide = ["9M"];
		// Aggron
		this.modData('Learnsets','aggron').learnset.rototiller = ["9D"];
		this.modData('Learnsets','aggron').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','aggron').learnset.fullcollide = ["9M"];
		delete this.modData('Learnsets','aggron').learnset.meteorbeam;
		// Meditite
		this.modData('Learnsets','meditite').learnset.vacuumwave = ["9D"];
		this.modData('Learnsets','meditite').learnset.amnesia = ["9M"];
		this.modData('Learnsets','meditite').learnset.chipaway = ["9M"];
		this.modData('Learnsets','meditite').learnset.mindbend = ["9L7"];
		this.modData('Learnsets','meditite').learnset.poweruppunch = ["9E"];
		delete this.modData('Learnsets','meditite').learnset.confusion;
		// Medicham
		this.modData('Learnsets','medicham').learnset.vacuumwave = ["9D"];
		this.modData('Learnsets','medicham').learnset.amnesia = ["9M"];
		this.modData('Learnsets','medicham').learnset.chipaway = ["9M"];
		this.modData('Learnsets','medicham').learnset.mindbend = ["9L7"];
		delete this.modData('Learnsets','medicham').learnset.confusion;
		// Electrike
		this.modData('Learnsets','electrike').learnset.playrough = ["9D"];
		this.modData('Learnsets','electrike').learnset.flash = ["9M"];
		this.modData('Learnsets','electrike').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','electrike').learnset.flamethrower;
		// Manectric
		this.modData('Learnsets','manectric').learnset.playrough = ["9D"];
		this.modData('Learnsets','manectric').learnset.flash = ["9M"];
		this.modData('Learnsets','manectric').learnset.trailhead = ["9M"];
		// Plusle
		this.modData('Learnsets','plusle').learnset.magneticflux = ["9D"];
		this.modData('Learnsets','plusle').learnset.flash = ["9M"];
		this.modData('Learnsets','plusle').learnset.trailhead = ["9M"];
		this.modData('Learnsets','plusle').learnset.particleslam = ["9E"];
		// Minun
		this.modData('Learnsets','minun').learnset.magneticflux = ["9D"];
		this.modData('Learnsets','minun').learnset.flash = ["9M"];;
		this.modData('Learnsets','minun').learnset.trailhead = ["9M"];
		this.modData('Learnsets','minun').learnset.particleslam = ["9E"];
		// Volbeat
		this.modData('Learnsets','volbeat').learnset.spotlight = ["9D"];
		this.modData('Learnsets','volbeat').learnset.bugcloud = ["9L1"];
		this.modData('Learnsets','volbeat').learnset.flash = ["9L1", "9M"];
		delete this.modData('Learnsets','volbeat').learnset.chillywater;
		delete this.modData('Learnsets','volbeat').learnset.trailhead;
		delete this.modData('Learnsets','volbeat').learnset.thunder;
		// Illumise
		this.modData('Learnsets','illumise').learnset.ragepowder = ["9D"];
		this.modData('Learnsets','illumise').learnset.bugcloud = ["9L1"];
		this.modData('Learnsets','illumise').learnset.flash = ["9M"];
		this.modData('Learnsets','illumise').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','illumise').learnset.trailhead;
		delete this.modData('Learnsets','illumise').learnset.thunder;
		// Roselia
		this.modData('Learnsets','roselia').learnset.captivate = ["9D"];
		this.modData('Learnsets','roselia').learnset.grasswhistle = ["9L19"];
		this.modData('Learnsets','roselia').learnset.magicalleaf = ["9L22"];
		this.modData('Learnsets','roselia').learnset.sweetscent = ["9L25"];
		this.modData('Learnsets','roselia').learnset.gigadrain = ["9L31"];
		this.modData('Learnsets','roselia').learnset.lifedew = ["9L37"];
		this.modData('Learnsets','roselia').learnset.petalblizzard = ["9L40"];
		this.modData('Learnsets','roselia').learnset.toxic = ["9L43","9M"];
		this.modData('Learnsets','roselia').learnset.aromatherapy = ["9L46"];
		this.modData('Learnsets','roselia').learnset.synthesis = ["9L49","9M"];
		this.modData('Learnsets','roselia').learnset.petaldance = ["9L52"];
		this.modData('Learnsets','roselia').learnset.naturalgift = ["9M"];
		// Gulpin
		this.modData('Learnsets','gulpin').learnset.rebound = ["9D"];
		this.modData('Learnsets','gulpin').learnset.toxic = ["9L28","9M"];
		this.modData('Learnsets','gulpin').learnset.chillywater = ["9M"];
		this.modData('Learnsets','gulpin').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','gulpin').learnset.blizzard;
		delete this.modData('Learnsets','gulpin').learnset.icebeam;
		// Swalot
		this.modData('Learnsets','swalot').learnset.rebound = ["9D"];
		this.modData('Learnsets','swalot').learnset.toxic = ["9L31","9M"];
		this.modData('Learnsets','swalot').learnset.chillywater = ["9M"];
		this.modData('Learnsets','swalot').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','swalot').learnset.blizzard;
		delete this.modData('Learnsets','swalot').learnset.earthquake;
		delete this.modData('Learnsets','swalot').learnset.metronome;
		// Carvanha
		this.modData('Learnsets','carvanha').learnset.fishiousrend = ["9D"];
		this.modData('Learnsets','carvanha').learnset.liquidation = ["9L32"];
		this.modData('Learnsets','carvanha').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','carvanha').learnset.blizzard;
		delete this.modData('Learnsets','carvanha').learnset.earthquake;
		delete this.modData('Learnsets','carvanha').learnset.poisonfang;
		// Sharpedo
		this.modData('Learnsets','sharpedo').learnset.fishiousrend = ["9D"];
		this.modData('Learnsets','sharpedo').learnset.liquidation = ["9L34"];
		this.modData('Learnsets','sharpedo').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','sharpedo').learnset.blizzard;
		delete this.modData('Learnsets','sharpedo').learnset.poisonfang;
		// Wailmer
		this.modData('Learnsets','wailmer').learnset.slackoff = ["9D"];
		this.modData('Learnsets','wailmer').learnset.watergun = ["9L1"];
		this.modData('Learnsets','wailmer').learnset.whitewater = ["9L7"];
		this.modData('Learnsets','wailmer').learnset.chillywater = ["9M"];
		this.modData('Learnsets','wailmer').learnset.rebound = ["9E"];
		this.modData('Learnsets','wailmer').learnset.wavecrash = ["9E"];
		delete this.modData('Learnsets','wailmer').learnset.blizzard;
		delete this.modData('Learnsets','wailmer').learnset.earthquake;
		// Wailord
		this.modData('Learnsets','wailord').learnset.slackoff = ["9D"];
		this.modData('Learnsets','wailord').learnset.watergun = ["9L1"];
		this.modData('Learnsets','wailord').learnset.whitewater = ["9L7"];
		this.modData('Learnsets','wailord').learnset.chillywater = ["9M"];
		// Numel
		this.modData('Learnsets','numel').learnset.highhorsepower = ["9D"];
		this.modData('Learnsets','numel').learnset.temperflare = ["9L31"];
		this.modData('Learnsets','numel').learnset.eruption = ["9L47"];
		this.modData('Learnsets','numel').learnset.heatcrash = ["9E"];
		delete this.modData('Learnsets','numel').learnset.doubleedge;
		delete this.modData('Learnsets','numel').learnset.heavyslam;
		delete this.modData('Learnsets','numel').learnset.takedown;
		// Camerupt
		this.modData('Learnsets','camerupt').learnset.highhorsepower = ["9D"];
		this.modData('Learnsets','camerupt').learnset.temperflare = ["9L31"];
		delete this.modData('Learnsets','camerupt').learnset.takedown;
		// Torkoal
		this.modData('Learnsets','torkoal').learnset.shelltrap = ["9D"];
		this.modData('Learnsets','torkoal').learnset.flash = ["9M"];
		this.modData('Learnsets','torkoal').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','torkoal').learnset.tarshot = ["9L53"];
		// Spoink
		this.modData('Learnsets','spoink').learnset.springleap = ["9D"];
		this.modData('Learnsets','spoink').learnset.psywave = ["9L1"];
		this.modData('Learnsets','spoink').learnset.barrierbash = ["9L5"];
		this.modData('Learnsets','spoink').learnset.odorsleuth = ["9L8"];
		this.modData('Learnsets','spoink').learnset.psybeam = ["9L12"];
		this.modData('Learnsets','spoink').learnset.flash = ["9M"];
		this.modData('Learnsets','spoink').learnset.toxic = ["9M"];
		this.modData('Learnsets','spoink').learnset.heartstamp = ["9E"];
		// Grumpig
		this.modData('Learnsets','grumpig').learnset.followme = ["9D"];
		this.modData('Learnsets','grumpig').learnset.psywave = ["9L1"];
		this.modData('Learnsets','grumpig').learnset.barrierbash = ["9L5"];
		this.modData('Learnsets','grumpig').learnset.odorsleuth = ["9L8"];
		this.modData('Learnsets','grumpig').learnset.psybeam = ["9L12"];
		this.modData('Learnsets','grumpig').learnset.rest = ["9L35", "9M"];
		this.modData('Learnsets','grumpig').learnset.flash = ["9M"];
		this.modData('Learnsets','grumpig').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','grumpig').learnset.psychicterrain = ["9M"];
		this.modData('Learnsets','grumpig').learnset.toxic = ["9M"];
		// Spinda
		this.modData('Learnsets','spinda').learnset.topsyturvy = ["9D"];
		this.modData('Learnsets','spinda').learnset.amnesia = ["9M"];
		this.modData('Learnsets','spinda').learnset.flash = ["9M"];
		this.modData('Learnsets','spinda').learnset.nightmare = ["9M"];
		// Trapinch
		this.modData('Learnsets','trapinch').learnset.strugglebug = ["9D"];
		this.modData('Learnsets','trapinch').learnset.bide = ["9L4"];
		this.modData('Learnsets','trapinch').learnset.sandblast = ["9L36"];
		this.modData('Learnsets','trapinch').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','trapinch').learnset.earthpower = ["9M"];
		this.modData('Learnsets','trapinch').learnset.ambush = ["9E"];
		// Vibrava
		this.modData('Learnsets','vibrava').learnset.silverwind = ["9D"];
		this.modData('Learnsets','vibrava').learnset.bide = ["9L4"];
		this.modData('Learnsets','vibrava').learnset.sandblast = ["9L38"];
		this.modData('Learnsets','vibrava').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','vibrava').learnset.earthpower = ["9M"];
		// Flygon
		this.modData('Learnsets','flygon').learnset.silverwind = ["9D"];
		this.modData('Learnsets','flygon').learnset.dragonrush = ["9L0"];
		this.modData('Learnsets','flygon').learnset.bide = ["9L4"];
		this.modData('Learnsets','flygon').learnset.sandblast = ["9L38"];
		this.modData('Learnsets','flygon').learnset.fellswoop = ["9L60"];
		this.modData('Learnsets','flygon').learnset.dragonclaw = ["9M"];
		this.modData('Learnsets','flygon').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','flygon').learnset.earthpower = ["9M"];
		// Cacnea
		this.modData('Learnsets','cacnea').learnset.mimic = ["9D"];
		this.modData('Learnsets','cacnea').learnset.encore = ["9M"];
		this.modData('Learnsets','cacnea').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','cacnea').learnset.toxic = ["9M"];
		this.modData('Learnsets','cacnea').learnset.falsesurrender = ["9E"];
		this.modData('Learnsets','cacnea').learnset.powertrip = ["9E"];
		delete this.modData('Learnsets','cacnea').learnset.dynamicpunch;
		delete this.modData('Learnsets','cacnea').learnset.poweruppunch;
		delete this.modData('Learnsets','cacnea').learnset.smellingsalts;
		// Cacturne
		this.modData('Learnsets','cacturne').learnset.mimic = ["9D"];
		this.modData('Learnsets','cacturne').learnset.assurance = ["9M"];
		this.modData('Learnsets','cacturne').learnset.encore = ["9M"];
		this.modData('Learnsets','cacturne').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','cacturne').learnset.toxic = ["9M"];
		// Swablu
		this.modData('Learnsets','swablu').learnset.weatherball = ["9D"];
		this.modData('Learnsets','swablu').learnset.alluringvoice = ["9L23"];
		this.modData('Learnsets','swablu').learnset.strangesmoke = ["9L23"];
		this.modData('Learnsets','swablu').learnset.amnesia = ["9M"];
		this.modData('Learnsets','swablu').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','swablu').learnset.moonblast;
		delete this.modData('Learnsets','swablu').learnset.takedown;
		delete this.modData('Learnsets','swablu').learnset.trailhead;
		// Altaria
		this.modData('Learnsets','altaria').learnset.mistball = ["9D"];
		this.modData('Learnsets','altaria').learnset.alluringvoice = ["9L23"];
		this.modData('Learnsets','altaria').learnset.strangesmoke = ["9L52"];
		this.modData('Learnsets','altaria').learnset.amnesia = ["9M"];
		this.modData('Learnsets','altaria').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','altaria').learnset.moonblast;
		delete this.modData('Learnsets','altaria').learnset.takedown;
		delete this.modData('Learnsets','altaria').learnset.trailhead;
		// Zangoose
		this.modData('Learnsets','zangoose').learnset.warriorssoul = ["9D"];
		this.modData('Learnsets','zangoose').learnset.chillywater = ["9M"];
		this.modData('Learnsets','zangoose').learnset.compensation = ["9M"];
		this.modData('Learnsets','zangoose').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','zangoose').learnset.fireblast;
		delete this.modData('Learnsets','zangoose').learnset.thunder;
		// Seviper
		this.modData('Learnsets','seviper').learnset.warriorssoul = ["9D"];
		this.modData('Learnsets','seviper').learnset.bind = ["9L1"];
		this.modData('Learnsets','seviper').learnset.mortalstrike = ["9E"];
		this.modData('Learnsets','seviper').learnset.incinerate = ["9M"];
		this.modData('Learnsets','seviper').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','seviper').learnset.earthquake;
		delete this.modData('Learnsets','seviper').learnset.wrap;
		// Lunatone
		this.modData('Learnsets','lunatone').learnset.midnight = ["9D"];
		this.modData('Learnsets','lunatone').learnset.healblock = ["9L1"];
		this.modData('Learnsets','lunatone').learnset.powergem = ["9L35","9M"];
		this.modData('Learnsets','lunatone').learnset.moonblast = ["9L40"];
		this.modData('Learnsets','lunatone').learnset.futuresight = ["9M"];
		this.modData('Learnsets','lunatone').learnset.stoneedge = ["9M"];
		this.modData('Learnsets','lunatone').learnset.flash = ["9M"];
		// Solrock
		this.modData('Learnsets','solrock').learnset.pyroball = ["9D"];
		this.modData('Learnsets','solrock').learnset.healblock = ["9L1"];
		this.modData('Learnsets','solrock').learnset.mindbend = ["9L1"];
		this.modData('Learnsets','solrock').learnset.barrierbash = ["9L20"];
		this.modData('Learnsets','solrock').learnset.zenheadbutt = ["9L30","9M"];
		this.modData('Learnsets','solrock').learnset.flash = ["9M"];
		this.modData('Learnsets','solrock').learnset.psychic = ["9M"];
		delete this.modData('Learnsets','solrock').learnset.confusion;
		// Barboach
		this.modData('Learnsets','barboach').learnset.mindreader = ["9D"];
		this.modData('Learnsets','barboach').learnset.slipaway = ["9L48"];
		delete this.modData('Learnsets','barboach').learnset.stoneedge;
		// Whiscash
		this.modData('Learnsets','whiscash').learnset.mindreader = ["9D"];
		this.modData('Learnsets','whiscash').learnset.slipaway = ["9L59"];
		// Corphish
		this.modData('Learnsets','corphish').learnset.muddywater = ["9D"];
		this.modData('Learnsets','corphish').learnset.compensation = ["9M"];
		// Crawdaunt
		this.modData('Learnsets','crawdaunt').learnset.muddywater = ["9D"];
		delete this.modData('Learnsets','crawdaunt').learnset.avalanche;
		// Baltoy
		this.modData('Learnsets','baltoy').learnset.refresh = ["9D"];
		this.modData('Learnsets','baltoy').learnset.sandblast = ["9L25"];
		this.modData('Learnsets','baltoy').learnset.powertrick = ["9L28"];
		this.modData('Learnsets','baltoy').learnset.selfdestruct = ["9L31"];
		this.modData('Learnsets','baltoy').learnset.extrasensory = ["9L34"];
		this.modData('Learnsets','baltoy').learnset.guardsplit = ["9L37"];
		this.modData('Learnsets','baltoy').learnset.powersplit = ["9L37"];
		this.modData('Learnsets','baltoy').learnset.earthpower = ["9L40", "9M"];
		this.modData('Learnsets','baltoy').learnset.sandstorm = ["9L43", "9M"];
		this.modData('Learnsets','baltoy').learnset.imprison = ["9L46"];
		this.modData('Learnsets','baltoy').learnset.explosion = ["9L49", "9M"];
		this.modData('Learnsets','baltoy').learnset.chillywater = ["9M"];
		this.modData('Learnsets','baltoy').learnset.flash = ["9M"];
		delete this.modData('Learnsets','baltoy').learnset.blizzard;
		// Claydol
		this.modData('Learnsets','claydol').learnset.refresh = ["9D"];
		this.modData('Learnsets','claydol').learnset.sandblast = ["9L25"];
		this.modData('Learnsets','claydol').learnset.powertrick = ["9L28"];
		this.modData('Learnsets','claydol').learnset.selfdestruct = ["9L31"];
		this.modData('Learnsets','claydol').learnset.extrasensory = ["9L34"];
		this.modData('Learnsets','claydol').learnset.guardsplit = ["9L40"];
		this.modData('Learnsets','claydol').learnset.powersplit = ["9L40"];
		this.modData('Learnsets','claydol').learnset.earthpower = ["9L46", "9M"];
		this.modData('Learnsets','claydol').learnset.sandstorm = ["9L52", "9M"];
		this.modData('Learnsets','claydol').learnset.imprison = ["9L58"];
		this.modData('Learnsets','claydol').learnset.explosion = ["9L64", "9M"];
		this.modData('Learnsets','claydol').learnset.chillywater = ["9M"];
		this.modData('Learnsets','claydol').learnset.flash = ["9M"];
		delete this.modData('Learnsets','claydol').learnset.blizzard;
		delete this.modData('Learnsets','claydol').learnset.bodypress;
		// Lileep
		this.modData('Learnsets','lileep').learnset.leechseed = ["9D"];
		this.modData('Learnsets','lileep').learnset.flash = ["9M"];
		this.modData('Learnsets','lileep').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','lileep').learnset.stoneedge = ["9M"];
		this.modData('Learnsets','lileep').learnset.toxic = ["9M"];
		// Cradily
		this.modData('Learnsets','cradily').learnset.leechseed = ["9D"];
		this.modData('Learnsets','cradily').learnset.flash = ["9M"];
		this.modData('Learnsets','cradily').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','cradily').learnset.toxic = ["9M"];
		// Anorith
		this.modData('Learnsets','anorith').learnset.strugglebug = ["9D"];
		this.modData('Learnsets','anorith').learnset.ancientpower = ["9L10"];
		this.modData('Learnsets','anorith').learnset.metalclaw = ["9L13"];
		this.modData('Learnsets','anorith').learnset.furycutter = ["9L16"];
		this.modData('Learnsets','anorith').learnset.brine = ["9L20", "9M"];
		this.modData('Learnsets','anorith').learnset.smackdown = ["9L24", "9M"];
		this.modData('Learnsets','anorith').learnset.slash = ["9L28"];
		this.modData('Learnsets','anorith').learnset.bugbite = ["9L32", "9M"];
		this.modData('Learnsets','anorith').learnset.aquajet = ["9L36"];
		this.modData('Learnsets','anorith').learnset.rockblast = ["9L41"];
		this.modData('Learnsets','anorith').learnset.crushclaw = ["9L46"];
		this.modData('Learnsets','anorith').learnset.xscissor = ["9L51", "9M"];
		this.modData('Learnsets','anorith').learnset.protect = ["9L56", "9M"];
		this.modData('Learnsets','anorith').learnset.stoneaxe = ["9L61"];
		this.modData('Learnsets','anorith').learnset.stoneedge = ["9M"];
		delete this.modData('Learnsets','anorith').learnset.knockoff;
		// Armaldo
		this.modData('Learnsets','armaldo').learnset.liquidation = ["9D"];
		this.modData('Learnsets','armaldo').learnset.ancientpower = ["9L10"];
		this.modData('Learnsets','armaldo').learnset.metalclaw = ["9L13"];
		this.modData('Learnsets','armaldo').learnset.furycutter = ["9L16"];
		this.modData('Learnsets','armaldo').learnset.brine = ["9L20", "9M"];
		this.modData('Learnsets','armaldo').learnset.smackdown = ["9L24", "9M"];
		this.modData('Learnsets','armaldo').learnset.slash = ["9L28"];
		this.modData('Learnsets','armaldo').learnset.bugbite = ["9L32", "9M"];
		this.modData('Learnsets','armaldo').learnset.aquajet = ["9L36"];
		this.modData('Learnsets','armaldo').learnset.rockblast = ["9L43"];
		this.modData('Learnsets','armaldo').learnset.crushclaw = ["9L50"];
		this.modData('Learnsets','armaldo').learnset.xscissor = ["9L57", "9M"];
		this.modData('Learnsets','armaldo').learnset.protect = ["9L64", "9M"];
		this.modData('Learnsets','armaldo').learnset.stoneaxe = ["9L71"];
		this.modData('Learnsets','armaldo').learnset.fullcollide = ["9M"];
		// Feebas
		this.modData('Learnsets','feebas').learnset.muddywater = ["9D"];
		this.modData('Learnsets','feebas').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','feebas').learnset.blizzard;
		delete this.modData('Learnsets','feebas').learnset.icebeam;
		// Milotic
		this.modData('Learnsets','milotic').learnset.lifedew = ["9D"];
		this.modData('Learnsets','milotic').learnset.bind = ["9L1"];
		this.modData('Learnsets','milotic').learnset.chillywater = ["9M"];
		this.modData('Learnsets','milotic').learnset.dazzlinggleam = ["9M"];
		delete this.modData('Learnsets','milotic').learnset.avalanche;
		delete this.modData('Learnsets','milotic').learnset.wrap;
		// Castform
		this.modData('Learnsets','castform').learnset.lifedew = ["9D"];
		this.modData('Learnsets','castform').learnset.aerate = ["9L5"];
		this.modData('Learnsets','castform').learnset.chillywater = ["9M"];
		this.modData('Learnsets','castform').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','castform').learnset.electroball = ["9M"];
		this.modData('Learnsets','castform').learnset.flash = ["9M"];
		// Kecleon
		this.modData('Learnsets','kecleon').learnset.reflecttype = ["9D"];
		this.modData('Learnsets','kecleon').learnset.trailhead = ["9M"];
		// Shuppet
		this.modData('Learnsets','shuppet').learnset.trickortreat = ["9D"];
		this.modData('Learnsets','shuppet').learnset.astonish = ["9L1"];
		this.modData('Learnsets','shuppet').learnset.terrify = ["9L4"];
		this.modData('Learnsets','shuppet').learnset.flash = ["9M"];
		this.modData('Learnsets','shuppet').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','shuppet').learnset.nightmare = ["9M"];
		this.modData('Learnsets','shuppet').learnset.screech = ["9M"];
		delete this.modData('Learnsets','shuppet').learnset.knockoff;
		delete this.modData('Learnsets','shuppet').learnset.metronome;
		delete this.modData('Learnsets','shuppet').learnset.thunder;
		// Banette
		this.modData('Learnsets','banette').learnset.trickortreat = ["9D"];
		this.modData('Learnsets','banette').learnset.astonish = ["9L1"];
		this.modData('Learnsets','banette').learnset.terrify = ["9L4"];
		this.modData('Learnsets','banette').learnset.flash = ["9M"];
		this.modData('Learnsets','banette').learnset.knockoff = ["9M"];
		this.modData('Learnsets','banette').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','banette').learnset.nightmare = ["9M"];
		this.modData('Learnsets','banette').learnset.screech = ["9M"];
		delete this.modData('Learnsets','banette').learnset.trailhead;
		// Duskull
		this.modData('Learnsets','duskull').learnset.hypnosis = ["9D"];
		this.modData('Learnsets','duskull').learnset.flash = ["9M"];
		this.modData('Learnsets','duskull').learnset.phantomforce = ["9M"];
		this.modData('Learnsets','duskull').learnset.toxic = ["9M"];
		this.modData('Learnsets','duskull').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','duskull').learnset.blizzard;
		delete this.modData('Learnsets','duskull').learnset.leechlife;
		// Dusclops
		this.modData('Learnsets','dusclops').learnset.hypnosis = ["9D"];
		this.modData('Learnsets','dusclops').learnset.drainpunch = ["9M"];
		this.modData('Learnsets','dusclops').learnset.flash = ["9M"];
		this.modData('Learnsets','dusclops').learnset.phantomforce = ["9M"];
		this.modData('Learnsets','dusclops').learnset.toxic = ["9M"];
		this.modData('Learnsets','dusclops').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','dusclops').learnset.blizzard;
		delete this.modData('Learnsets','dusclops').learnset.leechlife;
		// Tropius
		this.modData('Learnsets','tropius').learnset.rejuvenate = ["9D"];
		this.modData('Learnsets','tropius').learnset.leafstorm = ["9L1"];
		this.modData('Learnsets','tropius').learnset.airslash = ["9L30","9M"];
		this.modData('Learnsets','tropius').learnset.naturalgift = ["9L36","9M"];
		this.modData('Learnsets','tropius').learnset.fellswoop = ["9L41"];
		this.modData('Learnsets','tropius').learnset.woodhammer = ["9L61"];
		this.modData('Learnsets','tropius').learnset.bodypress = ["9M"];
		this.modData('Learnsets','tropius').learnset.grassyterrain = ["9M"];
		this.modData('Learnsets','tropius').learnset.hurricane = ["9M"];
		this.modData('Learnsets','tropius').learnset.tropkick = ["9E"];
		delete this.modData('Learnsets','tropius').learnset.bodyslam;
		delete this.modData('Learnsets','tropius').learnset.uturn;
		// Chimecho
		this.modData('Learnsets','chimecho').learnset.lastrespects = ["9D"];
		this.modData('Learnsets','chimecho').learnset.supersonic = ["9L19"];
		this.modData('Learnsets','chimecho').learnset.mirrorcoat = ["9L42"];
		this.modData('Learnsets','chimecho').learnset.flash = ["9M"];
		this.modData('Learnsets','chimecho').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','chimecho').learnset.doubleedge;
		delete this.modData('Learnsets','chimecho').learnset.takedown;
		// Absol
		this.modData('Learnsets','absol').learnset.destinybond = ["9D"];
		this.modData('Learnsets','absol').learnset.chillywater = ["9M"];
		this.modData('Learnsets','absol').learnset.nightmare = ["9M"];
		this.modData('Learnsets','absol').learnset.trailhead = ["9M"];
		this.modData('Learnsets','absol').learnset.cut = ["9E"];
		delete this.modData('Learnsets','absol').learnset.stoneedge;
		// Wynaut
		this.modData('Learnsets','wynaut').learnset.tickle = ["9D"];
		// Snorunt
		this.modData('Learnsets','snorunt').learnset.snowtumble = ["9D"];
		this.modData('Learnsets','snorunt').learnset.flash = ["9M"];
		this.modData('Learnsets','snorunt').learnset.haze = ["9E"];
		this.modData('Learnsets','snorunt').learnset.iceball = ["9E"];
		// Glalie
		this.modData('Learnsets','glalie').learnset.snowtumble = ["9D"];
		this.modData('Learnsets','glalie').learnset.flash = ["9M"];
		// Spheal
		this.modData('Learnsets','spheal').learnset.rebound = ["9D"];
		this.modData('Learnsets','spheal').learnset.amnesia = ["9M"];
		this.modData('Learnsets','spheal').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','spheal').learnset.earthquake;
		// Sealeo
		this.modData('Learnsets','sealeo').learnset.rebound = ["9D"];
		this.modData('Learnsets','sealeo').learnset.amnesia = ["9M"];
		this.modData('Learnsets','sealeo').learnset.bodypress = ["9M"];
		this.modData('Learnsets','sealeo').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','sealeo').learnset.earthquake;
		// Walrein
		this.modData('Learnsets','walrein').learnset.quash = ["9D"];
		this.modData('Learnsets','walrein').learnset.amnesia = ["9M"];
		this.modData('Learnsets','walrein').learnset.chillywater = ["9M"];
		// Clamperl
		this.modData('Learnsets','clamperl').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','clamperl').learnset.blizzard;
		delete this.modData('Learnsets','clamperl').learnset.icebeam;
		delete this.modData('Learnsets','clamperl').learnset.waterfall;
		// Huntail
		this.modData('Learnsets','huntail').learnset.tailglow = ["9D"];
		this.modData('Learnsets','huntail').learnset.terrify = ["9L9"];
		this.modData('Learnsets','huntail').learnset.assurance = ["9M"];
		this.modData('Learnsets','huntail').learnset.chillywater = ["9M"];
		this.modData('Learnsets','huntail').learnset.flash = ["9M"];
		this.modData('Learnsets','huntail').learnset.nastyplot = ["9M"];
		delete this.modData('Learnsets','huntail').learnset.blizzard;
		delete this.modData('Learnsets','huntail').learnset.scaryface;
		// Gorebyss
		this.modData('Learnsets','gorebyss').learnset.strengthsap = ["9D"];
		this.modData('Learnsets','gorebyss').learnset.chillywater = ["9M"];
		this.modData('Learnsets','gorebyss').learnset.nastyplot = ["9M"];
		delete this.modData('Learnsets','gorebyss').learnset.blizzard;
		delete this.modData('Learnsets','gorebyss').learnset.infestation;
		// Relicanth
		this.modData('Learnsets','relicanth').learnset.playdead = ["9D"];
		this.modData('Learnsets','relicanth').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','relicanth').learnset.blizzard;
		// Luvdisc
		this.modData('Learnsets','luvdisc').learnset.lovelykiss = ["9D"];
		this.modData('Learnsets','luvdisc').learnset.chillywater = ["9M"];
		this.modData('Learnsets','luvdisc').learnset.faketears = ["9M"];
		delete this.modData('Learnsets','luvdisc').learnset.blizzard;
		delete this.modData('Learnsets','luvdisc').learnset.waterfall;
		// Bagon
		this.modData('Learnsets','bagon').learnset.wish = ["9D"];
		this.modData('Learnsets','bagon').learnset.focusenergy = ["9L20"];
		this.modData('Learnsets','bagon').learnset.scaryface = ["9L40"];
		this.modData('Learnsets','bagon').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','bagon').learnset.screech = ["9M"];
		delete this.modData('Learnsets','bagon').learnset.fireblast;
		// Shelgon
		this.modData('Learnsets','shelgon').learnset.wish = ["9D"];
		this.modData('Learnsets','shelgon').learnset.focusenergy = ["9L20"];
		this.modData('Learnsets','shelgon').learnset.scaryface = ["9L46"];
		this.modData('Learnsets','shelgon').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','shelgon').learnset.screech = ["9M"];
		delete this.modData('Learnsets','shelgon').learnset.fireblast;
		// Salamence
		this.modData('Learnsets','salamence').learnset.wish = ["9D"];
		this.modData('Learnsets','salamence').learnset.focusenergy = ["9L20"];
		this.modData('Learnsets','salamence').learnset.scaryface = ["9L46"];
		this.modData('Learnsets','salamence').learnset.fellswoop = ["9L73"];
		this.modData('Learnsets','salamence').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','salamence').learnset.screech = ["9M"];
		delete this.modData('Learnsets','salamence').learnset.doubleedge;
		// Metang
		this.modData('Learnsets','metang').learnset.dynamicpunch = ["9D"];
		this.modData('Learnsets','metang').learnset.barrierbash = ["9L32"];
		this.modData('Learnsets','metang').learnset.zenheadbutt = ["9L38", "9M"];
		this.modData('Learnsets','metang').learnset.hardpress = ["9L60"];
		this.modData('Learnsets','metang').learnset.amnesia = ["9M"];
		this.modData('Learnsets','metang').learnset.hyperbeam = ["9M"];
		this.modData('Learnsets','metang').learnset.bodypress = ["9M"];
		this.modData('Learnsets','metang').learnset.flash = ["9M"];
		this.modData('Learnsets','metang').learnset.futuresight = ["9M"];
		this.modData('Learnsets','metang').learnset.psychic = ["9M"];
		// Metagross
		this.modData('Learnsets','metagross').learnset.dynamicpunch = ["9D"];
		this.modData('Learnsets','metagross').learnset.barrierbash = ["9L32"];
		this.modData('Learnsets','metagross').learnset.zenheadbutt = ["9L38", "9M"];
		this.modData('Learnsets','metagross').learnset.amnesia = ["9M"];
		this.modData('Learnsets','metagross').learnset.flash = ["9M"];
		this.modData('Learnsets','metagross').learnset.futuresight = ["9M"];
		this.modData('Learnsets','metagross').learnset.psychic = ["9M"];
		// Regirock
		this.modData('Learnsets','regirock').learnset.shoreup = ["9D"];
		this.modData('Learnsets','regirock').learnset.rockslide = ["9L31", "9M"];
		this.modData('Learnsets','regirock').learnset.ancientpower = ["9L37"];
		this.modData('Learnsets','regirock').learnset.irondefense = ["9L43", "9M"];
		this.modData('Learnsets','regirock').learnset.stoneedge = ["9L49", "9M"];
		this.modData('Learnsets','regirock').learnset.hammerarm = ["9L55"];
		this.modData('Learnsets','regirock').learnset.lockon = ["9L61"];
		this.modData('Learnsets','regirock').learnset.zapcannon = ["9L61"];
		this.modData('Learnsets','regirock').learnset.superpower = ["9L67", "9M"];
		this.modData('Learnsets','regirock').learnset.hyperbeam = ["9L73", "9M"];
		// Regice
		this.modData('Learnsets','regice').learnset.glaciate = ["9D"];
		this.modData('Learnsets','regice').learnset.icebeam = ["9L31", "9M"];
		this.modData('Learnsets','regice').learnset.ancientpower = ["9L37"];
		this.modData('Learnsets','regice').learnset.amnesia = ["9L43", "9M"];
		this.modData('Learnsets','regice').learnset.freezedry = ["9L49"];
		this.modData('Learnsets','regice').learnset.hammerarm = ["9L55"];
		this.modData('Learnsets','regice').learnset.lockon = ["9L61"];
		this.modData('Learnsets','regice').learnset.zapcannon = ["9L61"];
		this.modData('Learnsets','regice').learnset.superpower = ["9L67", "9M"];
		this.modData('Learnsets','regice').learnset.hyperbeam = ["9L73", "9M"];
		this.modData('Learnsets','regice').learnset.chillywater = ["9M"];
		// Registeel
		this.modData('Learnsets','registeel').learnset.metalburst = ["9D"];
		this.modData('Learnsets','registeel').learnset.fullcollide = ["9L31", "9M"];
		this.modData('Learnsets','registeel').learnset.ancientpower = ["9L37"];
		this.modData('Learnsets','registeel').learnset.irondefense = ["9L43", "9M"];
		this.modData('Learnsets','registeel').learnset.amnesia = ["9L43", "9M"];
		this.modData('Learnsets','registeel').learnset.ironhead = ["9L49", "9M"];
		this.modData('Learnsets','registeel').learnset.flashcannon = ["9L49", "9M"];
		this.modData('Learnsets','registeel').learnset.hammerarm = ["9L55"];
		this.modData('Learnsets','registeel').learnset.lockon = ["9L61"];
		this.modData('Learnsets','registeel').learnset.zapcannon = ["9L61"];
		this.modData('Learnsets','registeel').learnset.superpower = ["9L67", "9M"];
		this.modData('Learnsets','registeel').learnset.hyperbeam = ["9L73", "9M"];
		// Latias
		this.modData('Learnsets','latias').learnset.guardswap = ["9D"];
		this.modData('Learnsets','latias').learnset.protect = ["9L4", "9M"];
		this.modData('Learnsets','latias').learnset.meditate = ["9L7"];
		this.modData('Learnsets','latias').learnset.amnesia = ["9M"];
		this.modData('Learnsets','latias').learnset.charm = ["9M"];
		this.modData('Learnsets','latias').learnset.flash = ["9M"];
		delete this.modData('Learnsets','latias').learnset.watersport;
		// Latios
		this.modData('Learnsets','latios').learnset.powerswap = ["9D"];
		this.modData('Learnsets','latios').learnset.telekinesis = ["9L4", "9M"];
		this.modData('Learnsets','latios').learnset.imprison = ["9L36"];
		this.modData('Learnsets','latios').learnset.amnesia = ["9M"];
		this.modData('Learnsets','latios').learnset.flash = ["9M"];
		this.modData('Learnsets','latios').learnset.protect = ["9M"];
		// Kyogre
		this.modData('Learnsets','kyogre').learnset.tidalwave = ["9D"];
		this.modData('Learnsets','kyogre').learnset.bodypress = ["9M"];
		// Groudon
		this.modData('Learnsets','groudon').learnset.landswrath = ["9D"];
		this.modData('Learnsets','groudon').learnset.tussle = ["9L1"];
		this.modData('Learnsets','groudon').learnset.bodypress = ["9M"];
		delete this.modData('Learnsets','groudon').learnset.mudshot;
		// Rayquaza
		this.modData('Learnsets','rayquaza').learnset.dragonascent = ["9D"];
		this.modData('Learnsets','rayquaza').learnset.crunch = ["9L1"];
		this.modData('Learnsets','rayquaza').learnset.airslash = ["9L9"];
		this.modData('Learnsets','rayquaza').learnset.dragonpulse = ["9L27","9M"];
		this.modData('Learnsets','rayquaza').learnset.hypervoice = ["9L36","9M"];
		this.modData('Learnsets','rayquaza').learnset.extremespeed = ["9L45"];
		this.modData('Learnsets','rayquaza').learnset.hyperbeam = ["9L81","9M"];
		this.modData('Learnsets','rayquaza').learnset.outrage = ["9L90","9M"];
		this.modData('Learnsets','rayquaza').learnset.chillywater = ["9M"];
		this.modData('Learnsets','rayquaza').learnset.meteorbeam = ["9T"];
		delete this.modData('Learnsets','rayquaza').learnset.gyroball;
		delete this.modData('Learnsets','rayquaza').learnset.stealthrock;
		// Jirachi
		this.modData('Learnsets','jirachi').learnset.solarimpact = ["9D"];
		this.modData('Learnsets','jirachi').learnset.miracleeye = ["9L40"];
		this.modData('Learnsets','jirachi').learnset.flash = ["9M"];
		this.modData('Learnsets','jirachi').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','jirachi').learnset.doubleedge;
		// Deoxys
		this.modData('Learnsets','deoxys').learnset.refresh = ["9D"]; //Deoxys Normal
		this.modData('Learnsets','deoxys').learnset.meteormash = ["9L73"];
		this.modData('Learnsets','deoxys').learnset.workup = ["9D"]; //Deoxys Attack
		this.modData('Learnsets','deoxys').learnset.zapcannon = ["9L55"];
		this.modData('Learnsets','deoxys').learnset.metalburst = ["9D"]; //Deoxys Defense
		this.modData('Learnsets','deoxys').learnset.barrier = ["9L55"];
		this.modData('Learnsets','deoxys').learnset.feint = ["9D"]; //Deoxys Speed
		this.modData('Learnsets','deoxys').learnset.doubleteam = ["9L37"];
		this.modData('Learnsets','deoxys').learnset.flash = ["9M"]; //All
		this.modData('Learnsets','deoxys').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','deoxys').learnset.nightmare = ["9M"];
		this.modData('Learnsets','deoxys').learnset.psychicterrain = ["9M"];
		this.modData('Learnsets','deoxys').learnset.taunt = ["9M"];
		this.modData('Learnsets','deoxys').learnset.toxic = ["9M"];
		this.modData('Learnsets','deoxys').learnset.meteorbeam = ["9T"];
		delete this.modData('Learnsets','deoxys').learnset.irondefense;
		delete this.modData('Learnsets','deoxys').learnset.swift;
		// Turtwig
		this.modData('Learnsets','turtwig').learnset.ingrain = ["9D"];
		this.modData('Learnsets','turtwig').learnset.flash = ["9M"];
		this.modData('Learnsets','turtwig').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','turtwig').learnset.naturalgift = ["9M"];
		// Grotle
		this.modData('Learnsets','grotle').learnset.ingrain = ["9D"];
		this.modData('Learnsets','grotle').learnset.bodypress = ["9M"];
		this.modData('Learnsets','grotle').learnset.flash = ["9M"];
		this.modData('Learnsets','grotle').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','grotle').learnset.naturalgift = ["9M"];
		// Torterra
		this.modData('Learnsets','torterra').learnset.landswrath = ["9D"];
		this.modData('Learnsets','torterra').learnset.bodypress = ["9M"];
		this.modData('Learnsets','torterra').learnset.chipaway = ["9M"];
		this.modData('Learnsets','torterra').learnset.flash = ["9M"];
		this.modData('Learnsets','torterra').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','torterra').learnset.naturalgift = ["9M"];
		// Chimchar
		this.modData('Learnsets','chimchar').learnset.preheat = ["9D"];
		this.modData('Learnsets','chimchar').learnset.firespin = ["9L31"];
		this.modData('Learnsets','chimchar').learnset.temperflare = ["9L33"];
		this.modData('Learnsets','chimchar').learnset.facade = ["9M"];
		this.modData('Learnsets','chimchar').learnset.flash = ["9M"];
		// Monferno
		this.modData('Learnsets','monferno').learnset.firelash = ["9D"];
		this.modData('Learnsets','monferno').learnset.firespin = ["9L36"];
		this.modData('Learnsets','monferno').learnset.temperflare = ["9L39"];
		this.modData('Learnsets','monferno').learnset.flash = ["9M"];
		delete this.modData('Learnsets','monferno').learnset.closecombat;
		// Infernape
		this.modData('Learnsets','infernape').learnset.firelash = ["9D"];
		this.modData('Learnsets','infernape').learnset.firespin = ["9L37"];
		this.modData('Learnsets','infernape').learnset.temperflare = ["9L42"];
		this.modData('Learnsets','infernape').learnset.flash = ["9M"];
		// Piplup
		this.modData('Learnsets','piplup').learnset.sheercold = ["9D"];
		delete this.modData('Learnsets','piplup').learnset.roost;
		// Prinplup
		this.modData('Learnsets','prinplup').learnset.sheercold = ["9D"];
		this.modData('Learnsets','prinplup').learnset.aquacutter = ["9L54"];
		// Empoleon
		this.modData('Learnsets','empoleon').learnset.sheercold = ["9D"];
		this.modData('Learnsets','empoleon').learnset.aquacutter = ["9L1"];
		this.modData('Learnsets','empoleon').learnset.metaledge = ["9L65"];
		// Starly
		this.modData('Learnsets','starly').learnset.aircutter = ["9D"];
		// Staravia
		this.modData('Learnsets','staravia').learnset.aircutter = ["9D"];
		// Staraptor
		this.modData('Learnsets','staraptor').learnset.skydrop = ["9D"];
		this.modData('Learnsets','staraptor').learnset.hurricane = ["9M"];
		// Bidoof
		this.modData('Learnsets','bidoof').learnset.captivate = ["9D"];
		this.modData('Learnsets','bidoof').learnset.chillywater = ["9M"];
		this.modData('Learnsets','bidoof').learnset.chipaway = ["9M"];
		delete this.modData('Learnsets','bidoof').learnset.blizzard;
		delete this.modData('Learnsets','bidoof').learnset.thunder;
		delete this.modData('Learnsets','bidoof').learnset.thunderbolt;
		// Bibarel
		this.modData('Learnsets','bibarel').learnset.captivate = ["9D"];
		this.modData('Learnsets','bibarel').learnset.chillywater = ["9M"];
		this.modData('Learnsets','bibarel').learnset.chipaway = ["9M"];
		delete this.modData('Learnsets','bibarel').learnset.blizzard;
		delete this.modData('Learnsets','bibarel').learnset.thunder;
		// Kricketune
		this.modData('Learnsets','kricketune').learnset.risingchorus = ["9D"];
		this.modData('Learnsets','kricketune').learnset.springleap = ["9L14"];
		this.modData('Learnsets','kricketune').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','kricketune').learnset.absorb;
		delete this.modData('Learnsets','kricketune').learnset.knockoff;
		delete this.modData('Learnsets','kricketune').learnset.leechlife;
		// Shinx
		this.modData('Learnsets','shinx').learnset.assist = ["9D"];
		this.modData('Learnsets','shinx').learnset.assurance = ["9M"];
		this.modData('Learnsets','shinx').learnset.flash = ["9M"];
		// Luxio
		this.modData('Learnsets','luxio').learnset.assist = ["9D"];
		this.modData('Learnsets','luxio').learnset.assurance = ["9M"];
		this.modData('Learnsets','luxio').learnset.flash = ["9M"];
		// Luxray
		this.modData('Learnsets','luxray').learnset.assist = ["9D"];
		this.modData('Learnsets','luxray').learnset.assurance = ["9M"];
		this.modData('Learnsets','luxray').learnset.flash = ["9M"];
		// Budew
		this.modData('Learnsets','budew').learnset.tearfullook = ["9D"];
		this.modData('Learnsets','budew').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','budew').learnset.toxic = ["9M"];
		this.modData('Learnsets','budew').learnset.lifedew = ["9E"];
		// Roserade
		this.modData('Learnsets','roserade').learnset.captivate = ["9D"];
		this.modData('Learnsets','roserade').learnset.flowertrap = ["9L1"];
		this.modData('Learnsets','roserade').learnset.lifedew = ["9L1"];
		this.modData('Learnsets','roserade').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','roserade').learnset.toxic = ["9M"];
		this.modData('Learnsets','roserade').learnset.trailhead = ["9M"];
		// Cranidos
		this.modData('Learnsets','cranidos').learnset.accelerock = ["9D"];
		this.modData('Learnsets','cranidos').learnset.ancientpower = ["9L28"];
		this.modData('Learnsets','cranidos').learnset.screech = ["9L33"];
		this.modData('Learnsets','cranidos').learnset.chipaway = ["9L37"];
		this.modData('Learnsets','cranidos').learnset.zenheadbutt = ["9L42"];
		this.modData('Learnsets','cranidos').learnset.doubleedge = ["9L46"];
		this.modData('Learnsets','cranidos').learnset.headsmash = ["9L51"];
		this.modData('Learnsets','cranidos').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','cranidos').learnset.meteorbeam = ["9T"];
		delete this.modData('Learnsets','cranidos').learnset.fireblast;
		delete this.modData('Learnsets','cranidos').learnset.flamethrower;
		delete this.modData('Learnsets','cranidos').learnset.thunder;
		delete this.modData('Learnsets','cranidos').learnset.thunderbolt;
		// Rampardos
		this.modData('Learnsets','rampardos').learnset.accelerock = ["9D"];
		this.modData('Learnsets','rampardos').learnset.ancientpower = ["9L28"];
		this.modData('Learnsets','rampardos').learnset.screech = ["9L33","9M"];
		this.modData('Learnsets','rampardos').learnset.chipaway = ["9L37","9M"];
		this.modData('Learnsets','rampardos').learnset.zenheadbutt = ["9L43","9M"];
		this.modData('Learnsets','rampardos').learnset.doubleedge = ["9L51"];
		this.modData('Learnsets','rampardos').learnset.headsmash = ["9L66"];
		this.modData('Learnsets','rampardos').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','rampardos').learnset.meteorbeam = ["9T"];
		// Shieldon
		this.modData('Learnsets','shieldon').learnset.kingsshield = ["9D"];
		this.modData('Learnsets','shieldon').learnset.fullcollide = ["9L15","9M"];
		this.modData('Learnsets','shieldon').learnset.shelter = ["9L51"];
		this.modData('Learnsets','shieldon').learnset.chillywater = ["9M"];
		this.modData('Learnsets','shieldon').learnset.meteorbeam = ["9T"];
		delete this.modData('Learnsets','shieldon').learnset.blizzard;
		delete this.modData('Learnsets','shieldon').learnset.earthquake;
		delete this.modData('Learnsets','shieldon').learnset.fireblast;
		delete this.modData('Learnsets','shieldon').learnset.flamethrower;
		delete this.modData('Learnsets','shieldon').learnset.icebeam;
		delete this.modData('Learnsets','shieldon').learnset.takedown;
		delete this.modData('Learnsets','shieldon').learnset.thunder;
		delete this.modData('Learnsets','shieldon').learnset.trailhead;
		// Bastiodon
		this.modData('Learnsets','bastiodon').learnset.kingsshield = ["9D"];
		this.modData('Learnsets','bastiodon').learnset.fullcollide = ["9L15","9M"];
		this.modData('Learnsets','bastiodon').learnset.shelter = ["9L66"];
		this.modData('Learnsets','bastiodon').learnset.bodypress = ["9M"];
		this.modData('Learnsets','bastiodon').learnset.chillywater = ["9M"];
		this.modData('Learnsets','bastiodon').learnset.meteorbeam = ["9T"];
		delete this.modData('Learnsets','bastiodon').learnset.blizzard;
		delete this.modData('Learnsets','bastiodon').learnset.fireblast;
		delete this.modData('Learnsets','bastiodon').learnset.takedown;
		delete this.modData('Learnsets','bastiodon').learnset.thunder;
		delete this.modData('Learnsets','bastiodon').learnset.trailhead;
		// Wormadam Plant
		this.modData('Learnsets','wormadam').learnset.camouflage = ["9D"];
		this.modData('Learnsets','wormadam').learnset.leafage = ["9L0"];
		this.modData('Learnsets','wormadam').learnset.hiddenpower = ["9L23","9M"];
		this.modData('Learnsets','wormadam').learnset.leaftornado = ["9L26"];
		this.modData('Learnsets','wormadam').learnset.synthesis = ["9L32","9M"];
		this.modData('Learnsets','wormadam').learnset.petalblizzard = ["9L44"];
		this.modData('Learnsets','wormadam').learnset.amnesia = ["9M"];
		this.modData('Learnsets','wormadam').learnset.faketears = ["9M"];
		this.modData('Learnsets','wormadam').learnset.grassyterrain = ["9M"];
		this.modData('Learnsets','wormadam').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','wormadam').learnset.psychic = ["9M"];
		delete this.modData('Learnsets','wormadam').learnset.confusion;
		delete this.modData('Learnsets','wormadam').learnset.psybeam;
		delete this.modData('Learnsets','wormadam').learnset.quiverdance;
		delete this.modData('Learnsets','wormadam').learnset.razorleaf;
		// Wormadam Sandy
		this.modData('Learnsets','wormadamsandy').learnset.camouflage = ["9D"];
		this.modData('Learnsets','wormadamsandy').learnset.sandtomb = ["9L0"];
		this.modData('Learnsets','wormadamsandy').learnset.hiddenpower = ["9L23","9M"];
		this.modData('Learnsets','wormadamsandy').learnset.dustspray = ["9L26"];
		this.modData('Learnsets','wormadamsandy').learnset.irondefense = ["9L29","9M"];
		this.modData('Learnsets','wormadamsandy').learnset.shoreup = ["9L32"];
		this.modData('Learnsets','wormadamsandy').learnset.sandblast = ["9L44"];
		this.modData('Learnsets','wormadamsandy').learnset.psychic = ["9M"];
		this.modData('Learnsets','wormadamsandy').learnset.amnesia = ["9M"];
		this.modData('Learnsets','wormadamsandy').learnset.faketears = ["9M"];
		this.modData('Learnsets','wormadamsandy').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','wormadamsandy').learnset.rockslide = ["9M"];
		delete this.modData('Learnsets','wormadamsandy').learnset.confusion;
		delete this.modData('Learnsets','wormadamsandy').learnset.harden;
		delete this.modData('Learnsets','wormadamsandy').learnset.psybeam;
		delete this.modData('Learnsets','wormadamsandy').learnset.quiverdance;
		delete this.modData('Learnsets','wormadamsandy').learnset.rockblast;
		// Wormadam Trash
		this.modData('Learnsets','wormadamtrash').learnset.camouflage = ["9D"];
		this.modData('Learnsets','wormadamtrash').learnset.bash = ["9L0"];
		this.modData('Learnsets','wormadamtrash').learnset.hiddenpower = ["9L23","9M"];
		this.modData('Learnsets','wormadamtrash').learnset.metalburst = ["9L32"];
		this.modData('Learnsets','wormadamtrash').learnset.flashcannon = ["9L44","9M"];
		this.modData('Learnsets','wormadamtrash').learnset.amnesia = ["9M"];
		this.modData('Learnsets','wormadamtrash').learnset.faketears = ["9M"];
		this.modData('Learnsets','wormadamtrash').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','wormadamtrash').learnset.psychic = ["9M"];
		delete this.modData('Learnsets','wormadamtrash').learnset.confusion;
		delete this.modData('Learnsets','wormadamtrash').learnset.psybeam;
		delete this.modData('Learnsets','wormadamtrash').learnset.quiverdance;
		// Mothim
		this.modData('Learnsets','mothim').learnset.pollenpuff = ["9D"];
		this.modData('Learnsets','mothim').learnset.gust = ["9L0"];
		this.modData('Learnsets','mothim').learnset.aircutter = ["9L26"];
		this.modData('Learnsets','mothim').learnset.roost = ["9L32", "9M"];
		this.modData('Learnsets','mothim').learnset.quiverdance = ["9L41"];
		this.modData('Learnsets','mothim').learnset.airslash = ["9L44", "9M"];
		this.modData('Learnsets','mothim').learnset.amnesia = ["9M"];
		this.modData('Learnsets','mothim').learnset.faketears = ["9M"];
		this.modData('Learnsets','mothim').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','mothim').learnset.psychic = ["9M"];
		delete this.modData('Learnsets','mothim').learnset.confusion;
		delete this.modData('Learnsets','mothim').learnset.psybeam;
		// Vespiquen
		this.modData('Learnsets','vespiquen').learnset.instruct = ["9D"];
		this.modData('Learnsets','vespiquen').learnset.toxic = ["9L33","9M"];
		this.modData('Learnsets','vespiquen').learnset.flash = ["9M"];
		this.modData('Learnsets','vespiquen').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','vespiquen').learnset.nightmare = ["9M"];
		// Pachirisu
		this.modData('Learnsets','pachirisu').learnset.switcheroo = ["9D"];
		this.modData('Learnsets','pachirisu').learnset.particleslam = ["9L45"];
		this.modData('Learnsets','pachirisu').learnset.lastresort = ["9M"];
		this.modData('Learnsets','pachirisu').learnset.flash = ["9M"];
		this.modData('Learnsets','pachirisu').learnset.stuffcheeks = ["9E"];
		// Buizel
		this.modData('Learnsets','buizel').learnset.slackoff = ["9D"];
		this.modData('Learnsets','buizel').learnset.wavecrash = ["9L48"];
		this.modData('Learnsets','buizel').learnset.amnesia = ["9M"];
		this.modData('Learnsets','buizel').learnset.charm = ["9M"];
		this.modData('Learnsets','buizel').learnset.jetpunch = ["9E"];
		delete this.modData('Learnsets','buizel').learnset.blizzard;
		// Floatzel
		this.modData('Learnsets','floatzel').learnset.slackoff = ["9D"];
		this.modData('Learnsets','floatzel').learnset.wavecrash = ["9L63"];
		this.modData('Learnsets','floatzel').learnset.amnesia = ["9M"];
		this.modData('Learnsets','floatzel').learnset.charm = ["9M"];
		delete this.modData('Learnsets','floatzel').learnset.blizzard;
		// Cherubi
		this.modData('Learnsets','cherubi').learnset.happyhour = ["9D"];
		this.modData('Learnsets','cherubi').learnset.flash = ["9M"];
		// Cherrim
		this.modData('Learnsets','cherrim').learnset.happyhour = ["9D"];
		this.modData('Learnsets','cherrim').learnset.flash = ["9M"];
		// Shellos
		this.modData('Learnsets','shellos').learnset.slipaway = ["9D"];
		delete this.modData('Learnsets','shellos').learnset.blizzard;
		delete this.modData('Learnsets','shellos').learnset.waterfall;
		delete this.modData('Learnsets','shellos').learnset.stoneedge;
		// Gastrodon
		this.modData('Learnsets','gastrodon').learnset.slipaway = ["9D"];
		this.modData('Learnsets','gastrodon').learnset.flash = ["9M"];
		delete this.modData('Learnsets','gastrodon').learnset.blizzard;
		delete this.modData('Learnsets','gastrodon').learnset.stoneedge;
		delete this.modData('Learnsets','gastrodon').learnset.waterfall;
		// Ambipom
		this.modData('Learnsets','ambipom').learnset.swing = ["9D"];
		this.modData('Learnsets','ambipom').learnset.charm = ["9M"];
		this.modData('Learnsets','ambipom').learnset.dualchop = ["9L1", "9M"];
		// Drifloon
		this.modData('Learnsets','drifloon').learnset.snatch = ["9D"];
		this.modData('Learnsets','drifloon').learnset.rebound = ["9L48"];
		this.modData('Learnsets','drifloon').learnset.aerate = ["9L8"];
		delete this.modData('Learnsets','drifloon').learnset.brutalswing;
		delete this.modData('Learnsets','drifloon').learnset.gust;
		delete this.modData('Learnsets','drifloon').learnset.gyroball;
		delete this.modData('Learnsets','drifloon').learnset.knockoff;
		delete this.modData('Learnsets','drifloon').learnset.thunder;
		delete this.modData('Learnsets','drifloon').learnset.thunderbolt;
		// Drifblim
		this.modData('Learnsets','drifblim').learnset.snatch = ["9D"];
		this.modData('Learnsets','drifblim').learnset.rebound = ["9L57"];
		this.modData('Learnsets','drifblim').learnset.aerate = ["9L8"];
		delete this.modData('Learnsets','drifblim').learnset.gust;
		delete this.modData('Learnsets','drifblim').learnset.gyroball;
		delete this.modData('Learnsets','drifblim').learnset.thunder;
		// Buneary
		this.modData('Learnsets','buneary').learnset.victorydance = ["9D"];
		this.modData('Learnsets','buneary').learnset.deepbreath = ["9L10"];
		this.modData('Learnsets','buneary').learnset.mirrorcoat = ["9L20"];
		this.modData('Learnsets','buneary').learnset.magiccoat = ["9L30"];
		this.modData('Learnsets','buneary').learnset.entrainment = ["9L40"];
		this.modData('Learnsets','buneary').learnset.followme = ["9L50"];
		this.modData('Learnsets','buneary').learnset.healingwish = ["9L60"];
		this.modData('Learnsets','buneary').learnset.chillywater = ["9M"];
		this.modData('Learnsets','buneary').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','buneary').learnset.blizzard;
		delete this.modData('Learnsets','buneary').learnset.icebeam;
		delete this.modData('Learnsets','buneary').learnset.thunder;
		delete this.modData('Learnsets','buneary').learnset.thunderbolt;
		// Lopunny
		this.modData('Learnsets','lopunny').learnset.victorydance = ["9D"];
		this.modData('Learnsets','lopunny').learnset.deepbreath = ["9L10"];
		this.modData('Learnsets','lopunny').learnset.mirrorcoat = ["9L20"];
		this.modData('Learnsets','lopunny').learnset.magiccoat = ["9L30"];
		this.modData('Learnsets','lopunny').learnset.entrainment = ["9L40"];
		this.modData('Learnsets','lopunny').learnset.followme = ["9L50"];
		this.modData('Learnsets','lopunny').learnset.healingwish = ["9L60"];
		this.modData('Learnsets','lopunny').learnset.highjumpkick = ["9L63"];
		this.modData('Learnsets','lopunny').learnset.chillywater = ["9M"];
		this.modData('Learnsets','lopunny').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','lopunny').learnset.blizzard;
		delete this.modData('Learnsets','lopunny').learnset.thunder;
		// Mismagius
		this.modData('Learnsets','mismagius').learnset.eldritchmight = ["9D"];
		this.modData('Learnsets','mismagius').learnset.alluringvoice = ["9L1"];
		this.modData('Learnsets','mismagius').learnset.eeriespell = ["9L1"];
		this.modData('Learnsets','mismagius').learnset.terrify = ["9L1"];
		this.modData('Learnsets','mismagius').learnset.flash = ["9M"];
		this.modData('Learnsets','mismagius').learnset.nightmare = ["9M"];
		this.modData('Learnsets','mismagius').learnset.payback = ["9M"];
		delete this.modData('Learnsets','mismagius').learnset.thunder;
		// Honchkrow
		this.modData('Learnsets','honchkrow').learnset.midnight = ["9D"];
		this.modData('Learnsets','honchkrow').learnset.hex = ["9M"];
		this.modData('Learnsets','honchkrow').learnset.nightmare = ["9M"];
		this.modData('Learnsets','honchkrow').learnset.toxic = ["9M"];
		// Glameow
		this.modData('Learnsets','glameow').learnset.agility = ["9D"];
		this.modData('Learnsets','glameow').learnset.compensation = ["9M"];
		this.modData('Learnsets','glameow').learnset.screech = ["9M"];
		delete this.modData('Learnsets','glameow').learnset.thunder;
		delete this.modData('Learnsets','glameow').learnset.thunderbolt;
		// Purugly
		this.modData('Learnsets','purugly').learnset.bulkup = ["9D"];
		this.modData('Learnsets','purugly').learnset.compensation = ["9M"];
		this.modData('Learnsets','purugly').learnset.screech = ["9M"];
		delete this.modData('Learnsets','purugly').learnset.thunder;
		// Chingling
		this.modData('Learnsets','chingling').learnset.lastrespects = ["9D"];
		this.modData('Learnsets','chingling').learnset.flash = ["9M"];
		this.modData('Learnsets','chingling').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','chingling').learnset.knockoff;
		// Stunky
		this.modData('Learnsets','stunky').learnset.playdead = ["9D"];
		this.modData('Learnsets','stunky').learnset.toxic = ["9L27","9M"];
		this.modData('Learnsets','stunky').learnset.darkpulse = ["9L31","9M"];
		this.modData('Learnsets','stunky').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','stunky').learnset.nightslash;
		// Skuntank
		this.modData('Learnsets','skuntank').learnset.playdead = ["9D"];
		this.modData('Learnsets','skuntank').learnset.toxic = ["9L27","9M"];
		this.modData('Learnsets','skuntank').learnset.darkpulse = ["9L31","9M"];
		this.modData('Learnsets','skuntank').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','skuntank').learnset.nightslash;
		// Bronzor
		this.modData('Learnsets','bronzor').learnset.mirrorcoat = ["9D"];
		this.modData('Learnsets','bronzor').learnset.bash = ["9L21"];
		this.modData('Learnsets','bronzor').learnset.flash = ["9M"];
		delete this.modData('Learnsets','bronzor').learnset.earthquake;
		delete this.modData('Learnsets','bronzor').learnset.feintattack;
		// Bronzong
		this.modData('Learnsets','bronzong').learnset.healbell = ["9D"];
		this.modData('Learnsets','bronzong').learnset.bash = ["9L21"];
		this.modData('Learnsets','bronzong').learnset.flash = ["9M"];
		delete this.modData('Learnsets','bronzong').learnset.feintattack;
		// Bonsly
		this.modData('Learnsets','bonsly').learnset.minimize = ["9D"];
		delete this.modData('Learnsets','bonsly').learnset.earthquake;
		// Mime Jr.
		this.modData('Learnsets','mimejr').learnset.followme = ["9D"];
		this.modData('Learnsets','mimejr').learnset.wakeupslap = ["9L40"];
		this.modData('Learnsets','mimejr').learnset.nightmare = ["9M"];
		this.modData('Learnsets','mimejr').learnset.barrierbash = ["9E"];
		delete this.modData('Learnsets','mimejr').learnset.suckerpunch;
		delete this.modData('Learnsets','mimejr').learnset.thunder;
		delete this.modData('Learnsets','mimejr').learnset.thunderbolt;
		// Happiny
		this.modData('Learnsets','happiny').learnset.happyhour = ["9D"];
		delete this.modData('Learnsets','happiny').learnset.blizzard;
		delete this.modData('Learnsets','happiny').learnset.earthquake;
		delete this.modData('Learnsets','happiny').learnset.fireblast;
		delete this.modData('Learnsets','happiny').learnset.flamethrower;
		delete this.modData('Learnsets','happiny').learnset.icebeam;
		delete this.modData('Learnsets','happiny').learnset.tantrum;
		delete this.modData('Learnsets','happiny').learnset.thunder;
		delete this.modData('Learnsets','happiny').learnset.thunderbolt;
		// Chatot
		this.modData('Learnsets','chatot').learnset.pluck = ["9D"];
		this.modData('Learnsets','chatot').learnset.featherdance = ["9L53"];
		this.modData('Learnsets','chatot').learnset.partingshot = ["9L61"];
		this.modData('Learnsets','chatot').learnset.hurricane = ["9M"];
		this.modData('Learnsets','chatot').learnset.screech = ["9M"];
		// Spiritomb
		this.modData('Learnsets','spiritomb').learnset.ruination = ["9D"];
		this.modData('Learnsets','spiritomb').learnset.healblock = ["9L55"];
		this.modData('Learnsets','spiritomb').learnset.imprison = ["9L61"];
		this.modData('Learnsets','spiritomb').learnset.flash = ["9M"];
		this.modData('Learnsets','spiritomb').learnset.powergem = ["9M"];
		this.modData('Learnsets','spiritomb').learnset.toxic = ["9M"];
		this.modData('Learnsets','spiritomb').learnset.stasis = ["9T"];
		// Gible
		this.modData('Learnsets','gible').learnset.crunch = ["9D"];
		this.modData('Learnsets','gible').learnset.tussle = ["9L15"];
		this.modData('Learnsets','gible').learnset.takedown = ["9L19"];
		this.modData('Learnsets','gible').learnset.sandtomb = ["9L23"];
		this.modData('Learnsets','gible').learnset.slash = ["9L25"];
		this.modData('Learnsets','gible').learnset.dragonclaw = ["9L29", "9M"];
		this.modData('Learnsets','gible').learnset.sandblast = ["9L33"];
		this.modData('Learnsets','gible').learnset.firefang = ["9L35"];
		this.modData('Learnsets','gible').learnset.dig = ["9L39", "9M"];
		this.modData('Learnsets','gible').learnset.dragonrush = ["9L43"];
		delete this.modData('Learnsets','gible').learnset.fireblast;
		// Gabite
		this.modData('Learnsets','gabite').learnset.furycutter = ["9D"];
		this.modData('Learnsets','gabite').learnset.tussle = ["9L15"];
		this.modData('Learnsets','gabite').learnset.takedown = ["9L19"];
		this.modData('Learnsets','gabite').learnset.sandtomb = ["9L23"];
		this.modData('Learnsets','gabite').learnset.slash = ["9L26"];
		this.modData('Learnsets','gabite').learnset.dragonclaw = ["9L31", "9M"];
		this.modData('Learnsets','gabite').learnset.sandblast = ["9L36"];
		this.modData('Learnsets','gabite').learnset.firefang = ["9L39"];
		this.modData('Learnsets','gabite').learnset.dig = ["9L44", "9M"];
		this.modData('Learnsets','gabite').learnset.dragonrush = ["9L49"];
		delete this.modData('Learnsets','gabite').learnset.fireblast;
		// Garchomp
		this.modData('Learnsets','garchomp').learnset.fellswoop = ["9D"];
		this.modData('Learnsets','garchomp').learnset.tussle = ["9L15"];
		this.modData('Learnsets','garchomp').learnset.takedown = ["9L19"];
		this.modData('Learnsets','garchomp').learnset.sandtomb = ["9L23"];
		this.modData('Learnsets','garchomp').learnset.slash = ["9L26"];
		this.modData('Learnsets','garchomp').learnset.dragonclaw = ["9L31", "9M"];
		this.modData('Learnsets','garchomp').learnset.sandblast = ["9L36"];
		this.modData('Learnsets','garchomp').learnset.firefang = ["9L39"];
		this.modData('Learnsets','garchomp').learnset.dig = ["9L44", "9M"];
		this.modData('Learnsets','garchomp').learnset.dragonrush = ["9L51"];
		// Munchlax
		this.modData('Learnsets','munchlax').learnset.selfdestruct = ["9D"];
		this.modData('Learnsets','munchlax').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','munchlax').learnset.blizzard;
		delete this.modData('Learnsets','munchlax').learnset.earthquake;
		delete this.modData('Learnsets','munchlax').learnset.fireblast;
		delete this.modData('Learnsets','munchlax').learnset.flamethrower;
		delete this.modData('Learnsets','munchlax').learnset.icebeam;
		delete this.modData('Learnsets','munchlax').learnset.thunder;
		delete this.modData('Learnsets','munchlax').learnset.thunderbolt;
		// Riolu
		this.modData('Learnsets','riolu').learnset.aurasphere = ["9D"];
		this.modData('Learnsets','riolu').learnset.deepbreath = ["9L16"];
		this.modData('Learnsets','riolu').learnset.workup = ["9L28", "9M"];
		this.modData('Learnsets','riolu').learnset.metronome = ["9M"];
		this.modData('Learnsets','riolu').learnset.screech = ["9M"];
		this.modData('Learnsets','riolu').learnset.blazekick = ["9E"];
		this.modData('Learnsets','riolu').learnset.mindreader = ["9E"];
		this.modData('Learnsets','riolu').learnset.rollingkick = ["9E"];
		this.modData('Learnsets','riolu').learnset.skyuppercut = ["9E"];
		delete this.modData('Learnsets','riolu').learnset.earthquake;
		delete this.modData('Learnsets','riolu').learnset.magnetrise;
		// Lucario
		this.modData('Learnsets','lucario').learnset.eminence = ["9D"];
		this.modData('Learnsets','lucario').learnset.deepbreath = ["9L1"];
		this.modData('Learnsets','lucario').learnset.screech = ["9M"];
		delete this.modData('Learnsets','lucario').learnset.lifedew;
		// Hippopotas
		this.modData('Learnsets','hippopotas').learnset.rage = ["9D"];
		this.modData('Learnsets','hippopotas').learnset.sandattack = ["9L6"];
		this.modData('Learnsets','hippopotas').learnset.bite = ["9L11"];
		this.modData('Learnsets','hippopotas').learnset.tussle = ["9L16"];
		this.modData('Learnsets','hippopotas').learnset.yawn = ["9L21"];
		this.modData('Learnsets','hippopotas').learnset.takedown = ["9L26"];
		this.modData('Learnsets','hippopotas').learnset.dig = ["9L31", "9M"];
		this.modData('Learnsets','hippopotas').learnset.sandtomb = ["9L36"];
		this.modData('Learnsets','hippopotas').learnset.crunch = ["9L41"];
		this.modData('Learnsets','hippopotas').learnset.sandblast = ["9L46"];
		this.modData('Learnsets','hippopotas').learnset.earthquake = ["9L51", "9M"];
		this.modData('Learnsets','hippopotas').learnset.doubleedge = ["9L56"];
		this.modData('Learnsets','hippopotas').learnset.fissure = ["9L61"];
		this.modData('Learnsets','hippopotas').learnset.tussle = ["9E"];
		// Hippowdon
		this.modData('Learnsets','hippowdon').learnset.rage = ["9D"];
		this.modData('Learnsets','hippowdon').learnset.sandattack = ["9L6"];
		this.modData('Learnsets','hippowdon').learnset.bite = ["9L11"];
		this.modData('Learnsets','hippowdon').learnset.tussle = ["9L16"];
		this.modData('Learnsets','hippowdon').learnset.yawn = ["9L21"];
		this.modData('Learnsets','hippowdon').learnset.takedown = ["9L26"];
		this.modData('Learnsets','hippowdon').learnset.dig = ["9L31", "9M"];
		this.modData('Learnsets','hippowdon').learnset.sandtomb = ["9L38"];
		this.modData('Learnsets','hippowdon').learnset.crunch = ["9L45"];
		this.modData('Learnsets','hippowdon').learnset.sandblast = ["9L52"];
		this.modData('Learnsets','hippowdon').learnset.earthquake = ["9L59", "9M"];
		this.modData('Learnsets','hippowdon').learnset.doubleedge = ["9L66"];
		this.modData('Learnsets','hippowdon').learnset.fissure = ["9L73"];
		// Skorupi
		this.modData('Learnsets','skorupi').learnset.crushclaw = ["9D"];
		this.modData('Learnsets','skorupi').learnset.crosspoison = ["9L38"];
		this.modData('Learnsets','skorupi').learnset.terrify = ["9L41"];
		this.modData('Learnsets','skorupi').learnset.direclaw = ["9L49"];
		this.modData('Learnsets','skorupi').learnset.toxic = ["9M"];
		this.modData('Learnsets','skorupi').learnset.springleap = ["9E"];
		delete this.modData('Learnsets','skorupi').learnset.nightslash;
		delete this.modData('Learnsets','skorupi').learnset.scaryface;
		// Drapion
		this.modData('Learnsets','drapion').learnset.crushclaw = ["9D"];
		this.modData('Learnsets','drapion').learnset.nightslash = ["9L0"];
		this.modData('Learnsets','drapion').learnset.crosspoison = ["9L38"];
		this.modData('Learnsets','drapion').learnset.terrify = ["9L43"];
		this.modData('Learnsets','drapion').learnset.direclaw = ["9L57"];
		this.modData('Learnsets','drapion').learnset.chipaway = ["9M"];
		this.modData('Learnsets','drapion').learnset.toxic = ["9M"];
		this.modData('Learnsets','drapion').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','drapion').learnset.leechlife;
		delete this.modData('Learnsets','drapion').learnset.scaryface;
		// Croagunk
		this.modData('Learnsets','croagunk').learnset.poweruppunch = ["9D"];
		this.modData('Learnsets','croagunk').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','croagunk').learnset.earthquake;
		// Toxicroak
		this.modData('Learnsets','toxicroak').learnset.fellstinger = ["9D"];
		this.modData('Learnsets','toxicroak').learnset.crosspoison = ["9L0"];
		this.modData('Learnsets','toxicroak').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','toxicroak').learnset.earthquake;
		// Carnivine
		this.modData('Learnsets','carnivine').learnset.frenzyplant = ["9D"];
		this.modData('Learnsets','carnivine').learnset.wrap = ["9L1"];
		this.modData('Learnsets','carnivine').learnset.bite = ["9L4"];
		this.modData('Learnsets','carnivine').learnset.vinewhip = ["9L7"];
		this.modData('Learnsets','carnivine').learnset.sweetscent = ["9L11"];
		this.modData('Learnsets','carnivine').learnset.ingrain = ["9L14"];
		this.modData('Learnsets','carnivine').learnset.vicegrip = ["9L17"];
		this.modData('Learnsets','carnivine').learnset.razorleaf = ["9L21"];
		this.modData('Learnsets','carnivine').learnset.leaftornado = ["9L24"];
		this.modData('Learnsets','carnivine').learnset.feintattack = ["9L27"];
		this.modData('Learnsets','carnivine').learnset.stockpile = ["9L31"];
		this.modData('Learnsets','carnivine').learnset.spitup = ["9L31"];
		this.modData('Learnsets','carnivine').learnset.swallow = ["9L31"];
		this.modData('Learnsets','carnivine').learnset.crunch = ["9L34"];
		this.modData('Learnsets','carnivine').learnset.wringout = ["9L37"];
		this.modData('Learnsets','carnivine').learnset.snaptrap = ["9L41"];
		this.modData('Learnsets','carnivine').learnset.powerwhip = ["9L44"];
		this.modData('Learnsets','carnivine').learnset.jawlock = ["9L47"];
		this.modData('Learnsets','carnivine').learnset.grassyterrain = ["9M"];
		this.modData('Learnsets','carnivine').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','carnivine').learnset.trailhead = ["9M"];
		this.modData('Learnsets','carnivine').learnset.bind = ["9E"];
		delete this.modData('Learnsets','carnivine').learnset.defog;
		// Finneon
		this.modData('Learnsets','finneon').learnset.quiverdance = ["9D"];
		this.modData('Learnsets','finneon').learnset.chillywater = ["9M"];
		this.modData('Learnsets','finneon').learnset.flash = ["9M"];
		delete this.modData('Learnsets','finneon').learnset.blizzard;
		// Lumineon
		this.modData('Learnsets','lumineon').learnset.quiverdance = ["9D"];
		this.modData('Learnsets','lumineon').learnset.chillywater = ["9M"];
		this.modData('Learnsets','lumineon').learnset.flash = ["9M"];
		this.modData('Learnsets','lumineon').learnset.naturepower = ["9M"];
		delete this.modData('Learnsets','lumineon').learnset.blizzard;
		// Mantyke
		this.modData('Learnsets','mantyke').learnset.skydrop = ["9D"];
		this.modData('Learnsets','mantyke').learnset.waterpulse = ["9L7","9M"];
		this.modData('Learnsets','mantyke').learnset.bubblebeam = ["9L19"];
		this.modData('Learnsets','mantyke').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','mantyke').learnset.blizzard;
		delete this.modData('Learnsets','mantyke').learnset.earthquake;
		// Snover
		this.modData('Learnsets','snover').learnset.iciclecrash = ["9D"];
		this.modData('Learnsets','snover').learnset.branchpoke = ["9L5"];
		this.modData('Learnsets','snover').learnset.icehammer = ["9E"];
		delete this.modData('Learnsets','snover').learnset.razorleaf;
		// Abomasnow
		this.modData('Learnsets','abomasnow').learnset.iciclecrash = ["9D"];
		this.modData('Learnsets','abomasnow').learnset.icepunch = ["9L0", "9M"];
		this.modData('Learnsets','abomasnow').learnset.branchpoke = ["9L5"];
		this.modData('Learnsets','abomasnow').learnset.icehammer = ["9L43"];
		this.modData('Learnsets','abomasnow').learnset.blizzard = ["9L50", "9M"];
		this.modData('Learnsets','abomasnow').learnset.sheercold = ["9L57"];
		delete this.modData('Learnsets','abomasnow').learnset.razorleaf;
		// Weavile
		this.modData('Learnsets','weavile').learnset.razorwind = ["9D"];
		this.modData('Learnsets','weavile').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','weavile').learnset.metronome;
		// Magnezone
		this.modData('Learnsets','magnezone').learnset.electrify = ["9D"];
		this.modData('Learnsets','magnezone').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','magnezone').learnset.flash = ["9M"];
		// Lickilicky
		this.modData('Learnsets','lickilicky').learnset.soak = ["9D"];
		this.modData('Learnsets','lickilicky').learnset.toxic = ["9M"];
		// Rhyperior
		this.modData('Learnsets','rhyperior').learnset.headsmash = ["9D"];
		this.modData('Learnsets','rhyperior').learnset.scaryface = ["9L1"];
		this.modData('Learnsets','rhyperior').learnset.stomp = ["9L9"];
		this.modData('Learnsets','rhyperior').learnset.tussle = ["9L17"];
		this.modData('Learnsets','rhyperior').learnset.chillywater = ["9M"];
		this.modData('Learnsets','rhyperior').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','rhyperior').learnset.meteorbeam;
		// Tangrowth
		this.modData('Learnsets','tangrowth').learnset.morningsun = ["9D"];
		this.modData('Learnsets','tangrowth').learnset.amnesia = ["9M"];
		this.modData('Learnsets','tangrowth').learnset.trailhead = ["9M"];
		// Electivire
		this.modData('Learnsets','electivire').learnset.plasmafists = ["9D"];
		this.modData('Learnsets','electivire').learnset.completeshock = ["9L69"];
		this.modData('Learnsets','electivire').learnset.flash = ["9M"];
		// Magmortar
		this.modData('Learnsets','magmortar').learnset.searingshot = ["9D"];
		this.modData('Learnsets','magmortar').learnset.napalm = ["9L69"];
		this.modData('Learnsets','magmortar').learnset.amnesia = ["9M"];
		this.modData('Learnsets','magmortar').learnset.flash = ["9M"];
		this.modData('Learnsets','magmortar').learnset.flashcannon = ["9M"];
		this.modData('Learnsets','magmortar').learnset.shockwave = ["9M"];
		this.modData('Learnsets','magmortar').learnset.sludgebomb = ["9M"];
		// Togekiss
		this.modData('Learnsets','togekiss').learnset.softboiled = ["9D"];
		this.modData('Learnsets','togekiss').learnset.daydream = ["9L1"];
		this.modData('Learnsets','togekiss').learnset.flash = ["9M"];
		this.modData('Learnsets','togekiss').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','togekiss').learnset.fireblast;
		delete this.modData('Learnsets','togekiss').learnset.growl;
		// Yanmega
		this.modData('Learnsets','yanmega').learnset.fellswoop = ["9D"];
		this.modData('Learnsets','yanmega').learnset.bugcloud = ["9L1"];
		this.modData('Learnsets','yanmega').learnset.fly = ["9M"];
		this.modData('Learnsets','yanmega').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','yanmega').learnset.leechlife;
		// Leafeon
		this.modData('Learnsets','leafeon').learnset.camouflage = ["9D"];
		this.modData('Learnsets','leafeon').learnset.leafage = ["9L0"];
		this.modData('Learnsets','leafeon').learnset.razorleaf = ["9L20"];
		this.modData('Learnsets','leafeon').learnset.sunnyday = ["9L25","9M"];
		this.modData('Learnsets','leafeon').learnset.magicalleaf = ["9L29"];
		this.modData('Learnsets','leafeon').learnset.swordsdance = ["9L33","9M"];
		this.modData('Learnsets','leafeon').learnset.synthesis = ["9L37","9M"];
		this.modData('Learnsets','leafeon').learnset.leafblade = ["9L41"];
		this.modData('Learnsets','leafeon').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','leafeon').learnset.solarblade = ["9L49"];
		this.modData('Learnsets','leafeon').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','leafeon').learnset.knockoff;
		// Glaceon
		this.modData('Learnsets','glaceon').learnset.spikyshield = ["9D"];
		this.modData('Learnsets','glaceon').learnset.powdersnow = ["9L0"];
		this.modData('Learnsets','glaceon').learnset.snowscape = ["9L25","9M"];
		this.modData('Learnsets','glaceon').learnset.icywind = ["9L29", "9M"];
		this.modData('Learnsets','glaceon').learnset.barrier = ["9L33"];
		this.modData('Learnsets','glaceon').learnset.mirrorcoat = ["9L37"];
		this.modData('Learnsets','glaceon').learnset.icebeam = ["9L41","9M"];
		this.modData('Learnsets','glaceon').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','glaceon').learnset.blizzard = ["9L49","9M"];
		delete this.modData('Learnsets','glaceon').learnset.iceshard;
		// Gliscor
		this.modData('Learnsets','gliscor').learnset.skydrop = ["9D"];
		this.modData('Learnsets','gliscor').learnset.toxic = ["9M"];
		// Mamoswine
		this.modData('Learnsets','mamoswine').learnset.highhorsepower = ["9D"];
		this.modData('Learnsets','mamoswine').learnset.doublehit = ["9L0"];
		this.modData('Learnsets','mamoswine').learnset.tussle = ["9L18"];
		this.modData('Learnsets','mamoswine').learnset.mudbomb = ["9L21"];
		this.modData('Learnsets','mamoswine').learnset.snowscape = ["9L24","9M"];
		this.modData('Learnsets','mamoswine').learnset.icefang = ["9L28"];
		this.modData('Learnsets','mamoswine').learnset.takedown = ["9L33"];
		// Porygon-Z
		this.modData('Learnsets','porygonz').learnset.technoblast = ["9D"];
		this.modData('Learnsets','porygonz').learnset.flash = ["9M"];
		this.modData('Learnsets','porygonz').learnset.powergem = ["9M"];
		// Gallade
		this.modData('Learnsets','gallade').learnset.sacredsword = ["9D"];
		this.modData('Learnsets','gallade').learnset.confide = ["9L1"];
		this.modData('Learnsets','gallade').learnset.confusion = ["9L1"];
		this.modData('Learnsets','gallade').learnset.daydream = ["9L4"];
		this.modData('Learnsets','gallade').learnset.flash = ["9M"];
		this.modData('Learnsets','gallade').learnset.nightmare = ["9M"];
		// Probopass
		this.modData('Learnsets','probopass').learnset.electrify = ["9D"];
		this.modData('Learnsets','probopass').learnset.bodypress = ["9M"];
		this.modData('Learnsets','probopass').learnset.steelbeam = ["9T"];
		// Dusknoir
		this.modData('Learnsets','dusknoir').learnset.spectralthief = ["9D"];
		this.modData('Learnsets','dusknoir').learnset.drainpunch = ["9M"];
		this.modData('Learnsets','dusknoir').learnset.flash = ["9M"];
		this.modData('Learnsets','dusknoir').learnset.midnight = ["9M"];
		this.modData('Learnsets','dusknoir').learnset.nightmare = ["9M"];
		this.modData('Learnsets','dusknoir').learnset.phantomforce = ["9M"];
		this.modData('Learnsets','dusknoir').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','dusknoir').learnset.leechlife;
		// Froslass
		this.modData('Learnsets','froslass').learnset.sheercold = ["9D"];
		this.modData('Learnsets','froslass').learnset.frostbreath = ["9L37","9M"];
		this.modData('Learnsets','froslass').learnset.flash = ["9M"];
		this.modData('Learnsets','froslass').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','froslass').learnset.thunder;
		delete this.modData('Learnsets','froslass').learnset.wakeupslap;
		// Rotom
		this.modData('Learnsets','rotom').learnset.electrify = ["9D"];
		this.modData('Learnsets','rotom').learnset.charge = ["9L1"];
		this.modData('Learnsets','rotom').learnset.eerieimpulse = ["9L57","9M"];
		this.modData('Learnsets','rotom').learnset.flash = ["9M"];
		delete this.modData('Learnsets','rotom').learnset.defog;
		// Rotom Wash
		this.modData('Learnsets','rotomwash').learnset.whirlpool = ["9D"];
		this.modData('Learnsets','rotomwash').learnset.bubble = ["9L1"];
		this.modData('Learnsets','rotomwash').learnset.soak = ["9L1"];
		this.modData('Learnsets','rotomwash').learnset.bubblebeam = ["9L27"];
		this.modData('Learnsets','rotomwash').learnset.muddywater = ["9L50"];
		this.modData('Learnsets','rotomwash').learnset.hydropump = ["9R", "9M"];
		// Rotom Heat
		this.modData('Learnsets','rotomheat').learnset.firespin = ["9D"];
		this.modData('Learnsets','rotomheat').learnset.ember = ["9L1"];
		this.modData('Learnsets','rotomheat').learnset.preheat = ["9L1"];
		this.modData('Learnsets','rotomheat').learnset.incinerate = ["9L27", "9M"];
		this.modData('Learnsets','rotomheat').learnset.heatwave = ["9L50", "9M"];
		this.modData('Learnsets','rotomheat').learnset.overheat = ["9R", "9M"];
		// Rotom Frost
		this.modData('Learnsets','rotomfrost').learnset.frostbreath = ["9D"];
		this.modData('Learnsets','rotomfrost').learnset.icywind = ["9L1", "9M"];
		this.modData('Learnsets','rotomfrost').learnset.snowscape = ["9L1", "9M"];
		this.modData('Learnsets','rotomfrost').learnset.freezedry = ["9L27"];
		this.modData('Learnsets','rotomfrost').learnset.icebeam = ["9L50", "9M"];
		this.modData('Learnsets','rotomfrost').learnset.blizzard = ["9R", "9M"];
		// Rotom Fan
		this.modData('Learnsets','rotomfan').learnset.rapidspin = ["9D"];
		this.modData('Learnsets','rotomfan').learnset.gust = ["9L1"];
		this.modData('Learnsets','rotomfan').learnset.defog = ["9L1", "9M"];
		this.modData('Learnsets','rotomfan').learnset.aerate = ["9L27"];
		this.modData('Learnsets','rotomfan').learnset.airslash = ["9L50"];
		this.modData('Learnsets','rotomfan').learnset.hurricane = ["9R", "9M"];
		// Rotom Mow
		this.modData('Learnsets','rotommow').learnset.cut = ["9D"];
		this.modData('Learnsets','rotommow').learnset.leafage = ["9L1"];
		this.modData('Learnsets','rotommow').learnset.grassyterrain = ["9L1", "9M"];
		this.modData('Learnsets','rotommow').learnset.leaftornado = ["9L27"];
		this.modData('Learnsets','rotommow').learnset.energyball = ["9L50", "9M"];
		this.modData('Learnsets','rotommow').learnset.leafstorm = ["9R"];
		// Uxie
		this.modData('Learnsets','uxie').learnset.guardswap = ["9D"];
		this.modData('Learnsets','uxie').learnset.barrierbash = ["9L21"];
		this.modData('Learnsets','uxie').learnset.flash = ["9M"];
		this.modData('Learnsets','uxie').learnset.nightmare = ["9M"];
		this.modData('Learnsets','uxie').learnset.powergem = ["9M"];
		delete this.modData('Learnsets','uxie').learnset.knockoff;
		// Mesprit
		this.modData('Learnsets','mesprit').learnset.heartswap = ["9D"];
		this.modData('Learnsets','mesprit').learnset.barrierbash = ["9L21"];
		this.modData('Learnsets','mesprit').learnset.calmmind = ["9L42", "9M"];
		this.modData('Learnsets','mesprit').learnset.luckychant = ["9L56"];
		this.modData('Learnsets','mesprit').learnset.charm = ["9M"];
		this.modData('Learnsets','mesprit').learnset.chillywater = ["9M"];
		this.modData('Learnsets','mesprit').learnset.flash = ["9M"];
		this.modData('Learnsets','mesprit').learnset.nightmare = ["9M"];
		this.modData('Learnsets','mesprit').learnset.powergem = ["9M"];
		delete this.modData('Learnsets','mesprit').learnset.flatter;
		delete this.modData('Learnsets','mesprit').learnset.knockoff;
		delete this.modData('Learnsets','mesprit').learnset.thunder;
		// Azelf
		this.modData('Learnsets','azelf').learnset.powerswap = ["9D"];
		this.modData('Learnsets','azelf').learnset.barrierbash = ["9L21"];
		this.modData('Learnsets','azelf').learnset.flash = ["9M"];
		this.modData('Learnsets','azelf').learnset.nightmare = ["9M"];
		this.modData('Learnsets','azelf').learnset.powergem = ["9M"];
		delete this.modData('Learnsets','azelf').learnset.knockoff;
		delete this.modData('Learnsets','azelf').learnset.thunder;
		// Dialga
		this.modData('Learnsets','dialga').learnset.doomdesire = ["9D"];
		this.modData('Learnsets','dialga').learnset.teleport = ["9L1"];
		this.modData('Learnsets','dialga').learnset.metalburst = ["9L32"];
		this.modData('Learnsets','dialga').learnset.flashcannon = ["9L64","9M"];
		this.modData('Learnsets','dialga').learnset.cuttinglaser = ["9L80"];
		this.modData('Learnsets','dialga').learnset.flash = ["9M"];
		this.modData('Learnsets','dialga').learnset.futuresight = ["9M"];
		this.modData('Learnsets','dialga').learnset.irontail = ["9M"];
		this.modData('Learnsets','dialga').learnset.screech = ["9M"];
		this.modData('Learnsets','dialga').learnset.stasis = ["9T"];
		// Palkia
		this.modData('Learnsets','palkia').learnset.hyperspacehole = ["9D"];
		this.modData('Learnsets','palkia').learnset.teleport = ["9L1"];
		this.modData('Learnsets','palkia').learnset.aquacutter = ["9L64"];
		this.modData('Learnsets','palkia').learnset.aquatail = ["9M"];
		this.modData('Learnsets','palkia').learnset.screech = ["9M"];
		this.modData('Learnsets','palkia').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','palkia').learnset.meteorbeam = ["9T"];
		// Heatran
		this.modData('Learnsets','heatran').learnset.eruption = ["9D"];
		// Regigigas
		this.modData('Learnsets','regigigas').learnset.hardpress = ["9D"];
		this.modData('Learnsets','regigigas').learnset.poweruppunch = ["9L15"];
		this.modData('Learnsets','regigigas').learnset.chipaway = ["9M"];
		// Giratina
		this.modData('Learnsets','giratina').learnset.punishment = ["9D"];
		this.modData('Learnsets','giratina').learnset.teleport = ["9L1"];
		this.modData('Learnsets','giratina').learnset.scaryface = ["9L1"];
		this.modData('Learnsets','giratina').learnset.shadowsneak = ["9L1"];
		this.modData('Learnsets','giratina').learnset.dragonbreath = ["9L8"];
		this.modData('Learnsets','giratina').learnset.ancientpower = ["9L16"];
		this.modData('Learnsets','giratina').learnset.slash = ["9L24"];
		this.modData('Learnsets','giratina').learnset.painsplit = ["9L32","9M"];
		this.modData('Learnsets','giratina').learnset.dragonclaw = ["9L40","9M"];
		this.modData('Learnsets','giratina').learnset.aurasphere = ["9L48"];
		this.modData('Learnsets','giratina').learnset.destinybond = ["9L56"];
		this.modData('Learnsets','giratina').learnset.eldritchmight = ["9L64"];
		this.modData('Learnsets','giratina').learnset.earthpower = ["9L72","9M"];
		this.modData('Learnsets','giratina').learnset.shadowforce = ["9L80"];
		this.modData('Learnsets','giratina').learnset.dragonhammer = ["9L88"];
		this.modData('Learnsets','giratina').learnset.bodypress = ["9M"];
		this.modData('Learnsets','giratina').learnset.rockslide = ["9M"];
		this.modData('Learnsets','giratina').learnset.shadowball = ["9M"];
		this.modData('Learnsets','giratina').learnset.shadowclaw = ["9M"];
		this.modData('Learnsets','giratina').learnset.nightmare = ["9M"];
		this.modData('Learnsets','giratina').learnset.screech = ["9M"];
		this.modData('Learnsets','giratina').learnset.midnight = ["9T"];
		// Cresselia
		this.modData('Learnsets','cresselia').learnset.lunarray = ["9D"];
		this.modData('Learnsets','cresselia').learnset.amnesia = ["9M"];
		this.modData('Learnsets','cresselia').learnset.flash = ["9M"];
		this.modData('Learnsets','cresselia').learnset.meteorbeam = ["9T"];
		// Phione
		this.modData('Learnsets','phione').learnset.lifedew = ["9D"];
		this.modData('Learnsets','phione').learnset.amnesia = ["9M"];
		this.modData('Learnsets','phione').learnset.powergem = ["9M"];
		// Manaphy
		this.modData('Learnsets','manaphy').learnset.lifedew = ["9D"];
		this.modData('Learnsets','manaphy').learnset.amnesia = ["9M"];
		this.modData('Learnsets','manaphy').learnset.flash = ["9M"];
		this.modData('Learnsets','manaphy').learnset.powergem = ["9M"];
		// Darkrai
		this.modData('Learnsets','darkrai').learnset.fallenarrow = ["9D"];
		this.modData('Learnsets','darkrai').learnset.hex = ["9M"];
		this.modData('Learnsets','darkrai').learnset.midnight = ["9T"];
		this.modData('Learnsets','darkrai').learnset.phantomforce = ["9M"];
		delete this.modData('Learnsets','darkrai').learnset.flash;
		// Shaymin
		this.modData('Learnsets','shaymin').learnset.cottonguard = ["9D"];
		this.modData('Learnsets','shaymin').learnset.luckychant = ["9L28"];
		this.modData('Learnsets','shaymin').learnset.amnesia = ["9M"];
		this.modData('Learnsets','shaymin').learnset.flash = ["9M"];
		this.modData('Learnsets','shaymin').learnset.synthesis = ["9M"];
		this.modData('Learnsets','shaymin').learnset.grassyterrain = ["9L1","9M"];
		delete this.modData('Learnsets','shaymin').learnset.airslash;
		delete this.modData('Learnsets','shaymin').learnset.leafstorm;
		delete this.modData('Learnsets','shaymin').learnset.quickattack;
		// Shaymin Sky
		this.modData('Learnsets','shayminsky').learnset.cottonspore = ["9D"];
		this.modData('Learnsets','shayminsky').learnset.quickattack = ["9L28"];
		this.modData('Learnsets','shayminsky').learnset.airslash = ["9L64"];
		this.modData('Learnsets','shayminsky').learnset.leafstorm = ["9L91"];
		// Arceus
		this.modData('Learnsets','arceus').learnset.equalizer = ["9D"];
		this.modData('Learnsets','arceus').learnset.ancientpower = ["9L20"];
		this.modData('Learnsets','arceus').learnset.recover = ["9L50"];
		this.modData('Learnsets','arceus').learnset.eminence = ["9L70"];
		this.modData('Learnsets','arceus').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','arceus').learnset.earthpower = ["9M"];
		this.modData('Learnsets','arceus').learnset.flash = ["9M"];
		this.modData('Learnsets','arceus').learnset.hurricane = ["9M"];
		this.modData('Learnsets','arceus').learnset.metronome = ["9M"];
		this.modData('Learnsets','arceus').learnset.nightmare = ["9M"];
		this.modData('Learnsets','arceus').learnset.screech = ["9M"];
		this.modData('Learnsets','arceus').learnset.toxic = ["9M"];
		this.modData('Learnsets','arceus').learnset.superpower = ["9M"];
		this.modData('Learnsets','arceus').learnset.meteorbeam = ["9T"];
		this.modData('Learnsets','arceus').learnset.stasis = ["9T"];
		this.modData('Learnsets','arceus').learnset.steelbeam = ["9T"];
		this.modData('Learnsets','arceus').learnset.blastburn = ["9T"];
		this.modData('Learnsets','arceus').learnset.frenzyplant = ["9T"];
		this.modData('Learnsets','arceus').learnset.hydrocannon = ["9T"];
		this.modData('Learnsets','arceus').learnset.roaroftime = ["9T"];
		this.modData('Learnsets','arceus').learnset.shadowforce = ["9T"];
		this.modData('Learnsets','arceus').learnset.spacialrend = ["9T"];
		// Victini
		this.modData('Learnsets','victini').learnset.vcreate = ["9D"];
		this.modData('Learnsets','victini').learnset.napalm = ["9L1"];
		this.modData('Learnsets','victini').learnset.victorydance = ["9L65"];
		this.modData('Learnsets','victini').learnset.flash = ["9M"];
		this.modData('Learnsets','victini').learnset.metronome = ["9M"];
		this.modData('Learnsets','victini').learnset.blueflare = ["9T"];
		this.modData('Learnsets','victini').learnset.boltstrike = ["9T"];
		this.modData('Learnsets','victini').learnset.glaciate = ["9T"];
		delete this.modData('Learnsets','victini').learnset.doubleedge;
		// Snivy
		this.modData('Learnsets','snivy').learnset.aromatherapy = ["9D"];
		this.modData('Learnsets','snivy').learnset.flash = ["9M"];
		this.modData('Learnsets','snivy').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','snivy').learnset.defog;
		// Servine
		this.modData('Learnsets','servine').learnset.aromatherapy = ["9D"];
		this.modData('Learnsets','servine').learnset.flash = ["9M"];
		this.modData('Learnsets','servine').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','servine').learnset.defog;
		// Serperior
		this.modData('Learnsets','serperior').learnset.aromatherapy = ["9D"];
		this.modData('Learnsets','serperior').learnset.powerwhip = ["9L1"];
		this.modData('Learnsets','serperior').learnset.bind = ["9L1"];
		this.modData('Learnsets','serperior').learnset.flash = ["9M"];
		this.modData('Learnsets','serperior').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','serperior').learnset.defog;
		delete this.modData('Learnsets','serperior').learnset.wrap;
		// Tepig
		this.modData('Learnsets','tepig').learnset.stomp = ["9D"];
		this.modData('Learnsets','tepig').learnset.temperflare = ["9L37"];
		this.modData('Learnsets','tepig').learnset.headsmash = ["9L45"];
		// Pignite
		this.modData('Learnsets','pignite').learnset.submission = ["9D"];
		this.modData('Learnsets','pignite').learnset.bodypress = ["9L39", "9M"];
		this.modData('Learnsets','pignite').learnset.temperflare = ["9L44"];
		this.modData('Learnsets','pignite').learnset.headsmash = ["9L55"];
		this.modData('Learnsets','pignite').learnset.flamethrower = ["9M"];
		// Emboar
		this.modData('Learnsets','emboar').learnset.submission = ["9D"];
		this.modData('Learnsets','emboar').learnset.bodypress = ["9L43", "9M"];
		this.modData('Learnsets','emboar').learnset.temperflare = ["9L50"];
		this.modData('Learnsets','emboar').learnset.headsmash = ["9L67"];
		this.modData('Learnsets','emboar').learnset.flamethrower = ["9M"];
		// Oshawott
		this.modData('Learnsets','oshawott').learnset.sacredsword = ["9D"];
		this.modData('Learnsets','oshawott').learnset.swing = ["9L17"];
		this.modData('Learnsets','oshawott').learnset.razorshell = ["9L23"];
		this.modData('Learnsets','oshawott').learnset.waterpulse = ["9M"];
		this.modData('Learnsets','oshawott').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','oshawott').learnset.blizzard;
		// Dewott
		this.modData('Learnsets','dewott').learnset.sacredsword = ["9D"];
		this.modData('Learnsets','dewott').learnset.swing = ["9L18"];
		this.modData('Learnsets','dewott').learnset.razorshell = ["9L26"];
		this.modData('Learnsets','dewott').learnset.waterpulse = ["9M"];
		this.modData('Learnsets','dewott').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','dewott').learnset.blizzard;
		// Samurott
		this.modData('Learnsets','samurott').learnset.sacredsword = ["9D"];
		this.modData('Learnsets','samurott').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','samurott').learnset.swing = ["9L18"];
		this.modData('Learnsets','samurott').learnset.razorshell = ["9L26"];
		this.modData('Learnsets','samurott').learnset.waterpulse = ["9M"];
		this.modData('Learnsets','samurott').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','samurott').learnset.blizzard;
		// Samurott Hisui
		this.modData('Learnsets','samurotthisui').learnset.metaledge = ["9D"];
		this.modData('Learnsets','samurotthisui').learnset.swing = ["9L18"];
		this.modData('Learnsets','samurotthisui').learnset.razorshell = ["9L26"];
		this.modData('Learnsets','samurotthisui').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','samurotthisui').learnset.waterpulse = ["9M"];
		this.modData('Learnsets','samurotthisui').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','samurotthisui').learnset.blizzard;
		// Patrat
		this.modData('Learnsets','patrat').learnset.stuffcheeks = ["9D"];
		this.modData('Learnsets','patrat').learnset.deepbreath = ["9L16"];
		this.modData('Learnsets','patrat').learnset.crunch = ["9L31"];
		this.modData('Learnsets','patrat').learnset.hyperfang = ["9L41"];
		this.modData('Learnsets','patrat').learnset.dig = ["9M"];
		this.modData('Learnsets','patrat').learnset.flash = ["9M"];
		delete this.modData('Learnsets','patrat').learnset.slam;
		delete this.modData('Learnsets','patrat').learnset.thunder;
		delete this.modData('Learnsets','patrat').learnset.thunderbolt;
		// Watchog
		this.modData('Learnsets','watchog').learnset.obstruct = ["9D"];
		this.modData('Learnsets','watchog').learnset.deepbreath = ["9L16"];
		this.modData('Learnsets','watchog').learnset.crunch = ["9L36"];
		this.modData('Learnsets','watchog').learnset.hyperfang = ["9L50"];
		this.modData('Learnsets','watchog').learnset.dig = ["9M"];
		this.modData('Learnsets','watchog').learnset.flash = ["9M"];
		this.modData('Learnsets','watchog').learnset.incinerate = ["9M"];
		delete this.modData('Learnsets','watchog').learnset.slam;
		delete this.modData('Learnsets','watchog').learnset.thunder;
		// Lillipup
		this.modData('Learnsets','lillipup').learnset.holdback = ["9D"];
		this.modData('Learnsets','lillipup').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','lillipup').learnset.thunderbolt;
		// Herdier
		this.modData('Learnsets','herdier').learnset.holdback = ["9D"];
		this.modData('Learnsets','herdier').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','herdier').learnset.thunderbolt;
		// Stoutland
		this.modData('Learnsets','stoutland').learnset.holdback = ["9D"];
		this.modData('Learnsets','stoutland').learnset.avalanche = ["9M"];
		this.modData('Learnsets','stoutland').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','stoutland').learnset.thunder;
		// Purrloin
		this.modData('Learnsets','purrloin').learnset.partingshot = ["9D"];
		this.modData('Learnsets','purrloin').learnset.doubleteam = ["9E"];
		this.modData('Learnsets','purrloin').learnset.nightmare = ["9M"];
		// Liepard
		this.modData('Learnsets','liepard').learnset.partingshot = ["9D"];
		this.modData('Learnsets','liepard').learnset.nightmare = ["9M"];
		// Pansage
		this.modData('Learnsets','pansage').learnset.grasspledge = ["9D"];
		this.modData('Learnsets','pansage').learnset.amnesia = ["9M"];
		this.modData('Learnsets','pansage').learnset.screech = ["9M"];
		this.modData('Learnsets','pansage').learnset.trailhead = ["9M"];
		// Simisage
		this.modData('Learnsets','simisage').learnset.grasspledge = ["9D"];
		this.modData('Learnsets','simisage').learnset.amnesia = ["9M"];
		this.modData('Learnsets','simisage').learnset.screech = ["9M"];
		this.modData('Learnsets','simisage').learnset.trailhead = ["9M"];
		// Pansear
		this.modData('Learnsets','pansear').learnset.firepledge = ["9D"];
		this.modData('Learnsets','pansear').learnset.preheat = ["9L16"];
		this.modData('Learnsets','pansear').learnset.yawn = ["9L25"];
		this.modData('Learnsets','pansear').learnset.amnesia = ["9M"];
		this.modData('Learnsets','pansear').learnset.flash = ["9M"];
		this.modData('Learnsets','pansear').learnset.screech = ["9M"];
		this.modData('Learnsets','pansear').learnset.trailhead = ["9M"];
		// Simisear
		this.modData('Learnsets','simisear').learnset.firepledge = ["9D"];
		this.modData('Learnsets','simisear').learnset.preheat = ["9L1"];
		this.modData('Learnsets','simisear').learnset.yawn = ["9L1"];
		this.modData('Learnsets','simisear').learnset.amnesia = ["9M"];
		this.modData('Learnsets','simisear').learnset.flash = ["9M"];
		this.modData('Learnsets','simisear').learnset.screech = ["9M"];
		this.modData('Learnsets','simisear').learnset.trailhead = ["9M"];
		// Panpour
		this.modData('Learnsets','panpour').learnset.waterpledge = ["9D"];
		this.modData('Learnsets','panpour').learnset.jetpunch = ["9L22"];
		this.modData('Learnsets','panpour').learnset.scald = ["9L36", "9M"];
		this.modData('Learnsets','panpour').learnset.amnesia = ["9M"];
		this.modData('Learnsets','panpour').learnset.brine = ["9M"];
		this.modData('Learnsets','panpour').learnset.chillywater = ["9M"];
		this.modData('Learnsets','panpour').learnset.screech = ["9M"];
		this.modData('Learnsets','panpour').learnset.trailhead = ["9M"];
		this.modData('Learnsets','panpour').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','panpour').learnset.blizzard;
		// Simipour
		this.modData('Learnsets','simipour').learnset.waterpledge = ["9D"];
		this.modData('Learnsets','simipour').learnset.jetpunch = ["9L22"];
		this.modData('Learnsets','simipour').learnset.scald = ["9L36", "9M"];
		this.modData('Learnsets','simipour').learnset.amnesia = ["9M"];
		this.modData('Learnsets','simipour').learnset.brine = ["9M"];
		this.modData('Learnsets','simipour').learnset.chillywater = ["9M"];
		this.modData('Learnsets','simipour').learnset.screech = ["9M"];
		this.modData('Learnsets','simipour').learnset.trailhead = ["9M"];
		this.modData('Learnsets','simipour').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','simipour').learnset.blizzard;
		// Munna
		this.modData('Learnsets','munna').learnset.aromaticmist = ["9D"];
		this.modData('Learnsets','munna').learnset.daydream = ["9E"];
		// Musharna
		this.modData('Learnsets','musharna').learnset.strangesmoke = ["9D"];
		// Pidove
		this.modData('Learnsets','pidove').learnset.captivate = ["9D"];
		// Tranquill
		this.modData('Learnsets','tranquill').learnset.captivate = ["9D"];
		// Unfezant
		this.modData('Learnsets','unfezant').learnset.captivate = ["9D"];
		// Blitzle
		this.modData('Learnsets','blitzle').learnset.jumpkick = ["9D"];
		this.modData('Learnsets','blitzle').learnset.flash = ["9M"];
		// Zebstrika
		this.modData('Learnsets','zebstrika').learnset.volttackle = ["9D"];
		this.modData('Learnsets','zebstrika').learnset.flash = ["9M"];
		// Roggenrola
		this.modData('Learnsets','roggenrola').learnset.mirrorshot = ["9D"];
		this.modData('Learnsets','roggenrola').learnset.smackdown = ["9L17", "9M"];
		this.modData('Learnsets','roggenrola').learnset.rockclimb = ["9L23"];
		this.modData('Learnsets','roggenrola').learnset.takedown = ["9L33"];
		this.modData('Learnsets','roggenrola').learnset.sandstorm = ["9M"];
		delete this.modData('Learnsets','roggenrola').learnset.earthquake;
		delete this.modData('Learnsets','roggenrola').learnset.meteorbeam;
		delete this.modData('Learnsets','roggenrola').learnset.mudslap;
		// Boldore
		this.modData('Learnsets','boldore').learnset.mirrorshot = ["9D"];
		this.modData('Learnsets','boldore').learnset.smackdown = ["9L17", "9M"];
		this.modData('Learnsets','boldore').learnset.rockclimb = ["9L23"];
		this.modData('Learnsets','boldore').learnset.takedown = ["9L42"];
		this.modData('Learnsets','boldore').learnset.sandstorm = ["9M"];
		delete this.modData('Learnsets','boldore').learnset.meteorbeam;
		delete this.modData('Learnsets','boldore').learnset.mudslap;
		// Gigalith
		this.modData('Learnsets','gigalith').learnset.diamondstorm = ["9D"];
		this.modData('Learnsets','gigalith').learnset.smackdown = ["9L17", "9M"];
		this.modData('Learnsets','gigalith').learnset.rockclimb = ["9L23"];
		this.modData('Learnsets','gigalith').learnset.hardpress = ["9L42"];
		this.modData('Learnsets','gigalith').learnset.sandstorm = ["9M"];
		delete this.modData('Learnsets','gigalith').learnset.mudslap;
		// Woobat
		this.modData('Learnsets','woobat').learnset.pluck = ["9D"];
		this.modData('Learnsets','woobat').learnset.simplebeam = ["9L53"];
		delete this.modData('Learnsets','woobat').learnset.gyroball;
		delete this.modData('Learnsets','woobat').learnset.knockoff;
		// Swoobat
		this.modData('Learnsets','swoobat').learnset.pluck = ["9D"];
		this.modData('Learnsets','swoobat').learnset.psychicfang = ["9L0"];
		this.modData('Learnsets','swoobat').learnset.simplebeam = ["9L53"];
		delete this.modData('Learnsets','swoobat').learnset.gyroball;
		delete this.modData('Learnsets','swoobat').learnset.knockoff;
		// Drilbur
		this.modData('Learnsets','drilbur').learnset.metaledge = ["9D"];
		this.modData('Learnsets','drilbur').learnset.drillrun = ["9L33", "9M"];
		this.modData('Learnsets','drilbur').learnset.earthquake = ["9L43", "9M"];
		this.modData('Learnsets','drilbur').learnset.escapetunnel = ["9L47"];
		this.modData('Learnsets','drilbur').learnset.fissure = ["9L50"];
		this.modData('Learnsets','drilbur').learnset.chipaway = ["9M"];
		// Excadrill
		this.modData('Learnsets','excadrill').learnset.metaledge = ["9D"];
		this.modData('Learnsets','excadrill').learnset.drillrun = ["9L36", "9M"];
		this.modData('Learnsets','excadrill').learnset.earthquake = ["9L45", "9M"];
		this.modData('Learnsets','excadrill').learnset.escapetunnel = ["9L62"];
		this.modData('Learnsets','excadrill').learnset.fissure = ["9L68"];
		this.modData('Learnsets','excadrill').learnset.chipaway = ["9M"];
		this.modData('Learnsets','excadrill').learnset.fullcollide = ["9M"];
		// Audino
		this.modData('Learnsets','audino').learnset.acupressure = ["9D"];
		this.modData('Learnsets','audino').learnset.confide = ["9L1"];
		this.modData('Learnsets','audino').learnset.lifedew = ["9L21"];
		this.modData('Learnsets','audino').learnset.refresh = ["9L33"];
		this.modData('Learnsets','audino').learnset.alluringvoice = ["9L49"];
		this.modData('Learnsets','audino').learnset.attract = ["9M"];
		this.modData('Learnsets','audino').learnset.charm = ["9M"];
		this.modData('Learnsets','audino').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','audino').learnset.shockwave = ["9M"];
		delete this.modData('Learnsets','audino').learnset.doubleedge;
		delete this.modData('Learnsets','audino').learnset.growl;
		delete this.modData('Learnsets','audino').learnset.knockoff;
		delete this.modData('Learnsets','audino').learnset.takedown;
		// Timburr
		this.modData('Learnsets','timburr').learnset.woodhammer = ["9D"];
		this.modData('Learnsets','timburr').learnset.swing = ["9L1"];
		delete this.modData('Learnsets','timburr').learnset.defog;
		delete this.modData('Learnsets','timburr').learnset.pound;
		// Gurdurr
		this.modData('Learnsets','gurdurr').learnset.steelbeam = ["9D"];
		this.modData('Learnsets','gurdurr').learnset.swing = ["9L1"];
		delete this.modData('Learnsets','gurdurr').learnset.defog;
		delete this.modData('Learnsets','gurdurr').learnset.pound;
		// Conkeldurr
		this.modData('Learnsets','conkeldurr').learnset.rockwrecker = ["9D"];
		this.modData('Learnsets','conkeldurr').learnset.hardpress = ["9L1"];
		this.modData('Learnsets','conkeldurr').learnset.swing = ["9L1"];
		delete this.modData('Learnsets','conkeldurr').learnset.defog;
		delete this.modData('Learnsets','conkeldurr').learnset.pound;
		// Tympole
		this.modData('Learnsets','tympole').learnset.boomburst = ["9D"];
		this.modData('Learnsets','tympole').learnset.chillywater = ["9M"];
		this.modData('Learnsets','tympole').learnset.toxic = ["9M"];
		// Palpitoad
		this.modData('Learnsets','palpitoad').learnset.boomburst = ["9D"];
		this.modData('Learnsets','palpitoad').learnset.chillywater = ["9M"];
		this.modData('Learnsets','palpitoad').learnset.toxic = ["9M"];
		// Seismitoad
		this.modData('Learnsets','seismitoad').learnset.boomburst = ["9D"];
		this.modData('Learnsets','seismitoad').learnset.chillywater = ["9M"];
		this.modData('Learnsets','seismitoad').learnset.toxic = ["9M"];
		this.modData('Learnsets','seismitoad').learnset.waterfall = ["9M"];
		// Throh
		this.modData('Learnsets','throh').learnset.smellingsalts = ["9D"];
		this.modData('Learnsets','throh').learnset.deepbreath = ["9L1"];
		delete this.modData('Learnsets','throh').learnset.earthquake;
		delete this.modData('Learnsets','throh').learnset.leer;
		delete this.modData('Learnsets','throh').learnset.stoneedge;
		// Sawk
		this.modData('Learnsets','sawk').learnset.smellingsalts = ["9D"];
		this.modData('Learnsets','sawk').learnset.deepbreath = ["9L1"];
		this.modData('Learnsets','sawk').learnset.throatchop = ["9L1"];
		delete this.modData('Learnsets','sawk').learnset.earthquake;
		delete this.modData('Learnsets','sawk').learnset.leer;
		delete this.modData('Learnsets','sawk').learnset.stoneedge;
		// Sewaddle
		this.modData('Learnsets','sewaddle').learnset.teatime = ["9D"];
		this.modData('Learnsets','sewaddle').learnset.amnesia = ["9M"];
		this.modData('Learnsets','sewaddle').learnset.faketears = ["9M"];
		this.modData('Learnsets','sewaddle').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','sewaddle').learnset.cut = ["9E"];
		this.modData('Learnsets','sewaddle').learnset.silktrap = ["9E"];
		// Swadloon
		this.modData('Learnsets','swadloon').learnset.teatime = ["9D"];
		this.modData('Learnsets','swadloon').learnset.amnesia = ["9M"];
		this.modData('Learnsets','swadloon').learnset.faketears = ["9M"];
		this.modData('Learnsets','swadloon').learnset.naturalgift = ["9M"];
		// Leavanny
		this.modData('Learnsets','leavanny').learnset.teatime = ["9D"];
		this.modData('Learnsets','leavanny').learnset.amnesia = ["9M"];
		this.modData('Learnsets','leavanny').learnset.faketears = ["9M"];
		this.modData('Learnsets','leavanny').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','leavanny').learnset.knockoff;
		// Venipede
		this.modData('Learnsets','venipede').learnset.mortalstrike = ["9D"];
		this.modData('Learnsets','venipede').learnset.barbbarrage = ["9L26"];
		this.modData('Learnsets','venipede').learnset.toxic = ["9L36","9M"];
		this.modData('Learnsets','venipede').learnset.assurance = ["9M"];
		this.modData('Learnsets','venipede').learnset.trailhead = ["9M"];
		this.modData('Learnsets','venipede').learnset.venoshock = ["9M"];
		// Whirlipede
		this.modData('Learnsets','whirlipede').learnset.mortalstrike = ["9D"];
		this.modData('Learnsets','whirlipede').learnset.barbbarrage = ["9L28"];
		this.modData('Learnsets','whirlipede').learnset.toxic = ["9L41","9M"];
		this.modData('Learnsets','whirlipede').learnset.assurance = ["9M"];
		this.modData('Learnsets','whirlipede').learnset.bodypress = ["9M"];
		this.modData('Learnsets','whirlipede').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','whirlipede').learnset.trailhead = ["9M"];
		this.modData('Learnsets','whirlipede').learnset.venoshock = ["9M"];
		// Scolipede
		this.modData('Learnsets','scolipede').learnset.mortalstrike = ["9D"];
		this.modData('Learnsets','scolipede').learnset.crosspoison = ["9L0"];
		this.modData('Learnsets','scolipede').learnset.batonpass = ["9L1"];
		this.modData('Learnsets','scolipede').learnset.barbbarrage = ["9L28"];
		this.modData('Learnsets','scolipede').learnset.toxic = ["9L44","9M"];
		this.modData('Learnsets','scolipede').learnset.assurance = ["9M"];
		this.modData('Learnsets','scolipede').learnset.bodypress = ["9M"];
		this.modData('Learnsets','scolipede').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','scolipede').learnset.trailhead = ["9M"];
		this.modData('Learnsets','scolipede').learnset.venoshock = ["9M"];
		// Cottonee
		this.modData('Learnsets','cottonee').learnset.minimize = ["9D"];
		delete this.modData('Learnsets','cottonee').learnset.grassyterrain;
		// Whimsicott
		this.modData('Learnsets','whimsicott').learnset.minimize = ["9D"];
		this.modData('Learnsets','whimsicott').learnset.aerate = ["9L1"];
		delete this.modData('Learnsets','whimsicott').learnset.grassyterrain;
		delete this.modData('Learnsets','whimsicott').learnset.gust;
		// Petilil
		this.modData('Learnsets','petilil').learnset.aromaticmist = ["9D"];
		this.modData('Learnsets','petilil').learnset.faketears = ["9M"];
		// Lilligant
		this.modData('Learnsets','lilligant').learnset.aromaticmist = ["9D"];
		this.modData('Learnsets','lilligant').learnset.faketears = ["9M"];
		// Lilligant Hisui
		this.modData('Learnsets','lilliganthisui').learnset.rapidspin = ["9D"];
		this.modData('Learnsets','lilliganthisui').learnset.faketears = ["9M"];
		// Basculin Red-Striped
		this.modData('Learnsets','basculin').learnset.glare = ["9D"];
		this.modData('Learnsets','basculin').learnset.compensation = ["9M"];
		this.modData('Learnsets','basculin').learnset.whitewater = ["9L8"];
		this.modData('Learnsets','basculin').learnset.flail = ["9L12"];
		this.modData('Learnsets','basculin').learnset.aquajet = ["9L16"];
		this.modData('Learnsets','basculin').learnset.bite = ["9L20"];
		this.modData('Learnsets','basculin').learnset.scaryface = ["9L24"];
		this.modData('Learnsets','basculin').learnset.headbutt = ["9L28"];
		this.modData('Learnsets','basculin').learnset.soak = ["9L32"];
		this.modData('Learnsets','basculin').learnset.crunch = ["9L36"];
		this.modData('Learnsets','basculin').learnset.takedown = ["9L40"];
		this.modData('Learnsets','basculin').learnset.submission = ["9L44"];
		this.modData('Learnsets','basculin').learnset.finalgambit = ["9L48"];
		this.modData('Learnsets','basculin').learnset.doubleedge = ["9L52"];
		this.modData('Learnsets','basculin').learnset.thrash = ["9L56"];
		this.modData('Learnsets','basculin').learnset.wavecrash = ["9L60"];
		this.modData('Learnsets','basculin').learnset.headsmash = ["9L64"];
		delete this.modData('Learnsets','basculin').learnset.blizzard;
		// Basculin Blue-Striped
		this.modData('Learnsets','basculinbluestriped').learnset = Utils.deepClone(this.modData('Learnsets','basculin').learnset);
		this.modData('Learnsets','basculinbluestriped').learnset.metaledge = ["9L44"];
		delete this.modData('Learnsets','basculinbluestriped').learnset.submission;
		// Basculin White-Striped
		this.modData('Learnsets','basculinwhitestriped').learnset = Utils.deepClone(this.modData('Learnsets','basculin').learnset);
		this.modData('Learnsets','basculinwhitestriped').learnset.destinybond = ["9D"];
		this.modData('Learnsets','basculinwhitestriped').learnset.lastrespects = ["9L44"];
		this.modData('Learnsets','basculinwhitestriped').learnset.uproar = ["9L48", "9M"];
		this.modData('Learnsets','basculinwhitestriped').learnset.vengefulspirit = ["9E"];
		delete this.modData('Learnsets','basculinwhitestriped').learnset.finalgambit;
		delete this.modData('Learnsets','basculinwhitestriped').learnset.glare;
		delete this.modData('Learnsets','basculinwhitestriped').learnset.rage;
		delete this.modData('Learnsets','basculinwhitestriped').learnset.submission;
		// Sandile
		this.modData('Learnsets','sandile').learnset.detect = ["9D"];
		this.modData('Learnsets','sandile').learnset.jawlock = ["9E"];
		this.modData('Learnsets','sandile').learnset.sandblast = ["9E"];
		this.modData('Learnsets','sandile').learnset.nastyplot = ["9M"];
		delete this.modData('Learnsets','sandile').learnset.doubleedge;
		delete this.modData('Learnsets','sandile').learnset.rockclimb;
		delete this.modData('Learnsets','sandile').learnset.stoneedge;
		// Krokorok
		this.modData('Learnsets','krokorok').learnset.detect = ["9D"];
		this.modData('Learnsets','krokorok').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','krokorok').learnset.nightmare = ["9M"];
		// Krookodile
		this.modData('Learnsets','krookodile').learnset.detect = ["9D"];
		this.modData('Learnsets','krookodile').learnset.jawlock = ["9L0"];
		this.modData('Learnsets','krookodile').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','krookodile').learnset.nightmare = ["9M"];
		// Darumaka
		this.modData('Learnsets','darumaka').learnset.selfdestruct = ["9D"];
		this.modData('Learnsets','darumaka').learnset.meditate = ["9L1"];
		this.modData('Learnsets','darumaka').learnset.rollout = ["9L8"];
		this.modData('Learnsets','darumaka').learnset.megapunch = ["9E"];
		this.modData('Learnsets','darumaka').learnset.rockclimb = ["9E"];
		this.modData('Learnsets','darumaka').learnset.psychup = ["9M"];
		delete this.modData('Learnsets','darumaka').learnset.bite;
		// Darumaka Galar
		this.modData('Learnsets','darumakagalar').learnset.memento = ["9D"];
		this.modData('Learnsets','darumakagalar').learnset.meditate = ["9L1"];
		this.modData('Learnsets','darumakagalar').learnset.rollout = ["9L8"];
		this.modData('Learnsets','darumakagalar').learnset.snowtumble = ["9L40"];
		this.modData('Learnsets','darumakagalar').learnset.blizzard = ["9M"];
		this.modData('Learnsets','darumakagalar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','darumakagalar').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','darumakagalar').learnset.endeavor = ["9M"];
		this.modData('Learnsets','darumakagalar').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','darumakagalar').learnset.powergem = ["9M"];
		this.modData('Learnsets','darumakagalar').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','darumakagalar').learnset.snatch = ["9M"];
		this.modData('Learnsets','darumakagalar').learnset.strength = ["9M"];
		this.modData('Learnsets','darumakagalar').learnset.megapunch = ["9E"];
		this.modData('Learnsets','darumakagalar').learnset.rockclimb = ["9E"];
		delete this.modData('Learnsets','darumakagalar').learnset.bite;
		// Darmanitan
		this.modData('Learnsets','darmanitan').learnset.vcreate = ["9D"];
		this.modData('Learnsets','darmanitan').learnset.temperflare = ["9L0"];
		this.modData('Learnsets','darmanitan').learnset.meditate = ["9L1"];
		this.modData('Learnsets','darmanitan').learnset.rollout = ["9L8"];
		this.modData('Learnsets','darmanitan').learnset.hammerarm = ["9M"];
		this.modData('Learnsets','darmanitan').learnset.psychup = ["9M"];
		delete this.modData('Learnsets','darmanitan').learnset.bite;
		// Darmanitan Galar
		this.modData('Learnsets','darmanitangalar').learnset.headcharge = ["9D"];
		this.modData('Learnsets','darmanitangalar').learnset.iciclecrash = ["9L0"];
		this.modData('Learnsets','darmanitangalar').learnset.meditate = ["9L1"];
		this.modData('Learnsets','darmanitangalar').learnset.rollout = ["9L8"];
		this.modData('Learnsets','darmanitangalar').learnset.snowtumble = ["9L44"];
		this.modData('Learnsets','darmanitangalar').learnset.blizzard = ["9M"];
		this.modData('Learnsets','darmanitangalar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','darmanitangalar').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','darmanitangalar').learnset.endeavor = ["9M"];
		this.modData('Learnsets','darmanitangalar').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','darmanitangalar').learnset.powergem = ["9M"];
		this.modData('Learnsets','darmanitangalar').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','darmanitangalar').learnset.snatch = ["9M"];
		this.modData('Learnsets','darmanitangalar').learnset.strength = ["9M"];
		delete this.modData('Learnsets','darmanitangalar').learnset.bite;
		// Maractus
		this.modData('Learnsets','maractus').learnset.weatherball = ["9D"];
		this.modData('Learnsets','maractus').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','maractus').learnset.grassyterrain;
		// Dwebble
		this.modData('Learnsets','dwebble').learnset.crabhammer = ["9D"];
		this.modData('Learnsets','dwebble').learnset.stealthrock = ["9L25", "9M"];
		this.modData('Learnsets','dwebble').learnset.shelter = ["9L43"];
		this.modData('Learnsets','dwebble').learnset.rockwrecker = ["9L47"];
		this.modData('Learnsets','dwebble').learnset.fullcollide = ["9M"];
		// Crustle
		this.modData('Learnsets','crustle').learnset.crabhammer = ["9D"];
		this.modData('Learnsets','crustle').learnset.stealthrock = ["9L25", "9M"];
		this.modData('Learnsets','crustle').learnset.shelter = ["9L55"];
		this.modData('Learnsets','crustle').learnset.rockwrecker = ["9L62"];
		this.modData('Learnsets','crustle').learnset.fullcollide = ["9M"];
		delete this.modData('Learnsets','crustle').learnset.meteorbeam;
		// Scraggy
		this.modData('Learnsets','scraggy').learnset.powertrip = ["9D"];
		delete this.modData('Learnsets','scraggy').learnset.stoneedge;
		// Scrafty
		this.modData('Learnsets','scrafty').learnset.powertrip = ["9D"];
		delete this.modData('Learnsets','scrafty').learnset.stoneedge;
		// Sigilyph
		this.modData('Learnsets','sigilyph').learnset.speedswap = ["9D"];
		this.modData('Learnsets','sigilyph').learnset.barrier = ["9L24"];
		this.modData('Learnsets','sigilyph').learnset.barrierbash = ["9L28"];
		this.modData('Learnsets','sigilyph').learnset.flash = ["9M"];
		this.modData('Learnsets','sigilyph').learnset.lightscreen = ["9M"];
		this.modData('Learnsets','sigilyph').learnset.reflect = ["9M"];
		this.modData('Learnsets','sigilyph').learnset.nightmare = ["9M"];
		// Yamask
		this.modData('Learnsets','yamask').learnset.tearfullook = ["9D"];
		this.modData('Learnsets','yamask').learnset.lastrespects = ["9L37"];
		this.modData('Learnsets','yamask').learnset.flash = ["9M"];
		this.modData('Learnsets','yamask').learnset.shadowball = ["9M"];
		// Yamask Galar
		this.modData('Learnsets','yamaskgalar').learnset.tearfullook = ["9D"];
		this.modData('Learnsets','yamaskgalar').learnset.vengefulspirit = ["9L37"];
		this.modData('Learnsets','yamaskgalar').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','yamaskgalar').learnset.nightmare = ["9M"];
		this.modData('Learnsets','yamaskgalar').learnset.shadowball = ["9M"];
		this.modData('Learnsets','yamaskgalar').learnset.craftyshield = ["9E"];
		// Cofagrigus
		this.modData('Learnsets','cofagrigus').learnset.metalburst = ["9D"];
		this.modData('Learnsets','cofagrigus').learnset.terrify = ["9L0"];
		this.modData('Learnsets','cofagrigus').learnset.bind = ["9L1"];
		this.modData('Learnsets','cofagrigus').learnset.lastrespects = ["9L37"];
		this.modData('Learnsets','cofagrigus').learnset.flash = ["9M"];
		this.modData('Learnsets','cofagrigus').learnset.shadowball = ["9M"];
		delete this.modData('Learnsets','cofagrigus').learnset.scaryface;
		// Tirtouga
		this.modData('Learnsets','tirtouga').learnset.razorshell = ["9D"];
		this.modData('Learnsets','tirtouga').learnset.whitewater = ["9L1"];
		this.modData('Learnsets','tirtouga').learnset.liquidation = ["9L50"];
		this.modData('Learnsets','tirtouga').learnset.chillywater = ["9M"];
		this.modData('Learnsets','tirtouga').learnset.hydropump = ["9M"];
		this.modData('Learnsets','tirtouga').learnset.fullcollide = ["9M"];
		delete this.modData('Learnsets','tirtouga').learnset.watergun;
		// Carracosta
		this.modData('Learnsets','carracosta').learnset.razorshell = ["9D"];
		this.modData('Learnsets','carracosta').learnset.whitewater = ["9L1"];
		this.modData('Learnsets','carracosta').learnset.liquidation = ["9L61"];
		this.modData('Learnsets','carracosta').learnset.chillywater = ["9M"];
		this.modData('Learnsets','carracosta').learnset.hydropump = ["9M"];
		this.modData('Learnsets','carracosta').learnset.fullcollide = ["9M"];
		delete this.modData('Learnsets','carracosta').learnset.watergun;
		// Archen
		this.modData('Learnsets','archen').learnset.aurasphere = ["9D"];
		this.modData('Learnsets','archen').learnset.fellswoop = ["9L48"];
		this.modData('Learnsets','archen').learnset.dragonclaw = ["9M"];
		// Archeops
		this.modData('Learnsets','archeops').learnset.aurasphere = ["9D"];
		this.modData('Learnsets','archeops').learnset.fellswoop = ["9L56"];
		this.modData('Learnsets','archeops').learnset.dragonclaw = ["9M"];
		// Trubbish
		this.modData('Learnsets','trubbish').learnset.bide = ["9D"];
		this.modData('Learnsets','trubbish').learnset.toxic = ["9L36", "9M"];
		// Garbodor
		this.modData('Learnsets','garbodor').learnset.hardpress = ["9D"];
		this.modData('Learnsets','garbodor').learnset.shockwave = ["9D"];
		this.modData('Learnsets','garbodor').learnset.toxic = ["9L39","9M"];
		// Zorua
		this.modData('Learnsets','zorua').learnset.doubleteam = ["9D"];
		this.modData('Learnsets','zorua').learnset.terrify = ["9L21"];
		this.modData('Learnsets','zorua').learnset.hex = ["9M"];
		this.modData('Learnsets','zorua').learnset.nightmare = ["9M"];
		this.modData('Learnsets','zorua').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','zorua').learnset.knockoff;
		delete this.modData('Learnsets','zorua').learnset.scaryface;
		// Zorua Hisui
		this.modData('Learnsets','zoruahisui').learnset.doubleteam = ["9D"];
		this.modData('Learnsets','zoruahisui').learnset.terrify = ["9L21"];
		this.modData('Learnsets','zoruahisui').learnset.eldritchmight = ["9L57"];
		this.modData('Learnsets','zoruahisui').learnset.nightmare = ["9M"];
		this.modData('Learnsets','zoruahisui').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','zoruahisui').learnset.knockoff;
		delete this.modData('Learnsets','zoruahisui').learnset.scaryface;
		// Zoroark
		this.modData('Learnsets','zoroark').learnset.doubleteam = ["9D"];
		this.modData('Learnsets','zoroark').learnset.terrify = ["9L21"];
		this.modData('Learnsets','zoroark').learnset.hex = ["9M"];
		this.modData('Learnsets','zoroark').learnset.midnight = ["9T"];
		this.modData('Learnsets','zoroark').learnset.nightmare = ["9M"];
		this.modData('Learnsets','zoroark').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','zoroark').learnset.scaryface;
		// Zoroark Hisui
		this.modData('Learnsets','zoroarkhisui').learnset.doubleteam = ["9D"];
		this.modData('Learnsets','zoroarkhisui').learnset.terrify = ["9L21"];
		this.modData('Learnsets','zoroarkhisui').learnset.eldritchmight = ["9L64"];
		this.modData('Learnsets','zoroarkhisui').learnset.midnight = ["9T"];
		this.modData('Learnsets','zoroarkhisui').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','zoroarkhisui').learnset.nightmare = ["9M"];
		this.modData('Learnsets','zoroarkhisui').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','zoroarkhisui').learnset.scaryface;
		// Minccino
		this.modData('Learnsets','minccino').learnset.assist = ["9D"];
		delete this.modData('Learnsets','minccino').learnset.knockoff;
		delete this.modData('Learnsets','minccino').learnset.thunder;
		delete this.modData('Learnsets','minccino').learnset.thunderbolt;
		// Cinccino
		this.modData('Learnsets','cinccino').learnset.assist = ["9D"];
		this.modData('Learnsets','cinccino').learnset.covet = ["9L1"];
		this.modData('Learnsets','cinccino').learnset.sweetkiss = ["9L1"];
		delete this.modData('Learnsets','cinccino').learnset.bulletseed;
		delete this.modData('Learnsets','cinccino').learnset.rockblast;
		delete this.modData('Learnsets','cinccino').learnset.thunder;
		// Gothita
		this.modData('Learnsets','gothita').learnset.wish = ["9D"];
		this.modData('Learnsets','gothita').learnset.confide = ["9L1"];
		this.modData('Learnsets','gothita').learnset.charm = ["9L24"];
		this.modData('Learnsets','gothita').learnset.eeriespell = ["9L46"];
		this.modData('Learnsets','gothita').learnset.flash = ["9M"];
		this.modData('Learnsets','gothita').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','gothita').learnset.feintattack;
		// Gothorita
		this.modData('Learnsets','gothorita').learnset.wish = ["9D"];
		this.modData('Learnsets','gothorita').learnset.confide = ["9L1"];
		this.modData('Learnsets','gothorita').learnset.charm = ["9L24"];
		this.modData('Learnsets','gothorita').learnset.eeriespell = ["9L50"];
		this.modData('Learnsets','gothorita').learnset.flash = ["9M"];
		this.modData('Learnsets','gothorita').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','gothorita').learnset.feintattack;
		// Gothitelle
		this.modData('Learnsets','gothitelle').learnset.doomdesire = ["9D"];
		this.modData('Learnsets','gothitelle').learnset.confide = ["9L1"];
		this.modData('Learnsets','gothitelle').learnset.charm = ["9L24"];
		this.modData('Learnsets','gothitelle').learnset.eeriespell = ["9L54"];
		this.modData('Learnsets','gothitelle').learnset.flash = ["9M"];
		this.modData('Learnsets','gothitelle').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','gothitelle').learnset.feintattack;
		// Solosis
		this.modData('Learnsets','solosis').learnset.aquaring = ["9D"];
		this.modData('Learnsets','solosis').learnset.flash = ["9M"];
		this.modData('Learnsets','solosis').learnset.nightmare = ["9M"];
		this.modData('Learnsets','solosis').learnset.thunderbolt = ["9M"];
		delete this.modData('Learnsets','solosis').learnset.gyroball;
		// Duosion
		this.modData('Learnsets','duosion').learnset.aquaring = ["9D"];
		this.modData('Learnsets','duosion').learnset.flash = ["9M"];
		this.modData('Learnsets','duosion').learnset.nightmare = ["9M"];
		this.modData('Learnsets','duosion').learnset.thunderbolt = ["9M"];
		delete this.modData('Learnsets','duosion').learnset.gyroball;
		// Reuniclus
		this.modData('Learnsets','reuniclus').learnset.psybubble = ["9D"];
		this.modData('Learnsets','reuniclus').learnset.flash = ["9M"];
		this.modData('Learnsets','reuniclus').learnset.nightmare = ["9M"];
		this.modData('Learnsets','reuniclus').learnset.thunderbolt = ["9M"];
		delete this.modData('Learnsets','reuniclus').learnset.gyroball;
		// Ducklett
		this.modData('Learnsets','ducklett').learnset.entrainment = ["9D"];
		this.modData('Learnsets','ducklett').learnset.screech = ["9M"];
		this.modData('Learnsets','ducklett').learnset.whirlpool = ["9M"];
		// Swanna
		this.modData('Learnsets','swanna').learnset.entrainment = ["9D"];
		this.modData('Learnsets','swanna').learnset.charm = ["9M"];
		this.modData('Learnsets','swanna').learnset.screech = ["9M"];
		this.modData('Learnsets','swanna').learnset.whirlpool = ["9M"];
		// Vanillite
		this.modData('Learnsets','vanillite').learnset.iciclecrash = ["9D"];
		this.modData('Learnsets','vanillite').learnset.chillywater = ["9M"];
		// Vanillish
		this.modData('Learnsets','vanillish').learnset.iciclecrash = ["9D"];
		this.modData('Learnsets','vanillish').learnset.chillywater = ["9M"];
		// Vanilluxe
		this.modData('Learnsets','vanilluxe').learnset.glaciate = ["9D"];
		this.modData('Learnsets','vanilluxe').learnset.chillywater = ["9M"];
		// Deerling
		this.modData('Learnsets','deerling').learnset.weatherball = ["9D"];
		this.modData('Learnsets','deerling').learnset.bulletseed = ["9L16"];
		this.modData('Learnsets','deerling').learnset.flash = ["9M"];
		this.modData('Learnsets','deerling').learnset.solarblade = ["9E"];
		delete this.modData('Learnsets','deerling').learnset.feintattack;
		// Sawsbuck
		this.modData('Learnsets','sawsbuck').learnset.weatherball = ["9D"];
		this.modData('Learnsets','sawsbuck').learnset.bulletseed = ["9L16"];
		this.modData('Learnsets','sawsbuck').learnset.grassyterrain = ["9M"];
		this.modData('Learnsets','sawsbuck').learnset.flash = ["9M"];
		delete this.modData('Learnsets','sawsbuck').learnset.feintattack;
		// Emolga
		this.modData('Learnsets','emolga').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','emolga').learnset.particleslam = ["9L34"];
		this.modData('Learnsets','emolga').learnset.flash = ["9M"];
		this.modData('Learnsets','emolga').learnset.lightscreen = ["9M"];
		this.modData('Learnsets','emolga').learnset.stuffcheeks = ["9E"];
		// Karrablast
		this.modData('Learnsets','karrablast').learnset.smartstrike = ["9D"];
		this.modData('Learnsets','karrablast').learnset.furyattack = ["9L13"];
		this.modData('Learnsets','karrablast').learnset.furycutter = ["9L16"];
		this.modData('Learnsets','karrablast').learnset.hornattack = ["9L20"];
		this.modData('Learnsets','karrablast').learnset.chipaway = ["9L28", "9M"];
		this.modData('Learnsets','karrablast').learnset.xscissor = ["9L32"];
		this.modData('Learnsets','karrablast').learnset.megahorn = ["9L44"];
		delete this.modData('Learnsets','karrablast').learnset.headbutt;
		delete this.modData('Learnsets','karrablast').learnset.slash;
		// Escavalier
		this.modData('Learnsets','escavalier').learnset.meteorassault = ["9D"];
		this.modData('Learnsets','escavalier').learnset.twineedle = ["9L0"];
		this.modData('Learnsets','escavalier').learnset.furyattack = ["9L13"];
		this.modData('Learnsets','escavalier').learnset.furycutter = ["9L16"];
		this.modData('Learnsets','escavalier').learnset.hornattack = ["9L20"];
		this.modData('Learnsets','escavalier').learnset.chipaway = ["9L28", "9M"];
		this.modData('Learnsets','escavalier').learnset.xscissor = ["9L32"];
		this.modData('Learnsets','escavalier').learnset.megahorn = ["9L44"];
		this.modData('Learnsets','escavalier').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','escavalier').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','escavalier').learnset.headbutt;
		delete this.modData('Learnsets','escavalier').learnset.slash;
		// Foongus
		this.modData('Learnsets','foongus').learnset.copycat = ["9D"];
		this.modData('Learnsets','foongus').learnset.toxic = ["9L32","9M"];
		this.modData('Learnsets','foongus').learnset.recover = ["9L35"];
		delete this.modData('Learnsets','foongus').learnset.synthesis;
		// Amoonguss
		this.modData('Learnsets','amoonguss').learnset.copycat = ["9D"];
		this.modData('Learnsets','amoonguss').learnset.toxic = ["9L32","9M"];
		this.modData('Learnsets','amoonguss').learnset.recover = ["9L35"];
		delete this.modData('Learnsets','amoonguss').learnset.grassyterrain;
		delete this.modData('Learnsets','amoonguss').learnset.synthesis;
		// Frillish
		this.modData('Learnsets','frillish').learnset.quash = ["9D"];
		this.modData('Learnsets','frillish').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','frillish').learnset.blizzard;
		delete this.modData('Learnsets','frillish').learnset.poltergeist;
		// Jellicent
		this.modData('Learnsets','jellicent').learnset.quash = ["9D"];
		this.modData('Learnsets','jellicent').learnset.chillywater = ["9M"];
		delete this.modData('Learnsets','jellicent').learnset.blizzard;
		delete this.modData('Learnsets','jellicent').learnset.poltergeist;
		// Alomomola
		this.modData('Learnsets','alomomola').learnset.heartswap = ["9D"];
		this.modData('Learnsets','alomomola').learnset.amnesia = ["9M"];
		this.modData('Learnsets','alomomola').learnset.charm = ["9M"];
		delete this.modData('Learnsets','alomomola').learnset.blizzard;
		delete this.modData('Learnsets','alomomola').learnset.waterfall;
		// Joltik
		this.modData('Learnsets','joltik').learnset.zingzap = ["9D"];
		this.modData('Learnsets','joltik').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','joltik').learnset.springleap = ["9L12"];
		this.modData('Learnsets','joltik').learnset.electroball = ["9L26", "9M"];
		this.modData('Learnsets','joltik').learnset.agility = ["9L29"];
		this.modData('Learnsets','joltik').learnset.particleslam = ["9L35"];
		this.modData('Learnsets','joltik').learnset.flash = ["9M"];
		this.modData('Learnsets','joltik').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','joltik').learnset.absorb;
		delete this.modData('Learnsets','joltik').learnset.furycutter;
		delete this.modData('Learnsets','joltik').learnset.slash;
		// Galvantula
		this.modData('Learnsets','galvantula').learnset.zingzap = ["9D"];
		this.modData('Learnsets','galvantula').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','galvantula').learnset.springleap = ["9L12"];
		this.modData('Learnsets','galvantula').learnset.electroball = ["9L26", "9M"];
		this.modData('Learnsets','galvantula').learnset.agility = ["9L29"];
		this.modData('Learnsets','galvantula').learnset.particleslam = ["9L40"];
		this.modData('Learnsets','galvantula').learnset.flash = ["9M"];
		this.modData('Learnsets','galvantula').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','galvantula').learnset.absorb;
		delete this.modData('Learnsets','galvantula').learnset.furycutter;
		delete this.modData('Learnsets','galvantula').learnset.slash;
		// Ferroseed
		this.modData('Learnsets','ferroseed').learnset.spikyshield = ["9D"];
		this.modData('Learnsets','ferroseed').learnset.flash = ["9M"];
		this.modData('Learnsets','ferroseed').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','ferroseed').learnset.shockwave = ["9M"];
		// Ferrothorn
		this.modData('Learnsets','ferrothorn').learnset.spikyshield = ["9D"];
		this.modData('Learnsets','ferrothorn').learnset.flash = ["9M"];
		this.modData('Learnsets','ferrothorn').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','ferrothorn').learnset.shockwave = ["9M"];
		delete this.modData('Learnsets','ferrothorn').learnset.thunder;
		// Klink
		this.modData('Learnsets','klink').learnset.metaledge = ["9D"];
		this.modData('Learnsets','klink').learnset.magnetbomb = ["9L16"];
		this.modData('Learnsets','klink').learnset.geargrind = ["9L39"];
		this.modData('Learnsets','klink').learnset.screech = ["9M"];
		// Klang
		this.modData('Learnsets','klang').learnset.metaledge = ["9D"];
		this.modData('Learnsets','klang').learnset.magnetbomb = ["9L16"];
		this.modData('Learnsets','klang').learnset.geargrind = ["9L39"];
		this.modData('Learnsets','klang').learnset.screech = ["9M"];
		// Klinklang
		this.modData('Learnsets','klinklang').learnset.metaledge = ["9D"];
		this.modData('Learnsets','klinklang').learnset.magnetbomb = ["9L16"];
		this.modData('Learnsets','klinklang').learnset.geargrind = ["9L39"];
		this.modData('Learnsets','klinklang').learnset.screech = ["9M"];
		// Eelektrik
		this.modData('Learnsets','eelektrik').learnset.wringout = ["9D"];
		this.modData('Learnsets','eelektrik').learnset.brine = ["9M"];
		this.modData('Learnsets','eelektrik').learnset.dive = ["9M"];
		this.modData('Learnsets','eelektrik').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','eelektrik').learnset.flash = ["9M"];
		this.modData('Learnsets','eelektrik').learnset.surf = ["9M"];
		this.modData('Learnsets','eelektrik').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','eelektrik').learnset.knockoff;
		delete this.modData('Learnsets','eelektrik').learnset.leechlife;
		// Eelektross
		this.modData('Learnsets','eelektross').learnset.wringout = ["9D"];
		this.modData('Learnsets','eelektross').learnset.thunderfang = ["9L0"];
		this.modData('Learnsets','eelektross').learnset.brine = ["9M"];
		this.modData('Learnsets','eelektross').learnset.dive = ["9M"];
		this.modData('Learnsets','eelektross').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','eelektross').learnset.flash = ["9M"];
		this.modData('Learnsets','eelektross').learnset.surf = ["9M"];
		this.modData('Learnsets','eelektross').learnset.thunderpunch = ["9M"];
		this.modData('Learnsets','eelektross').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','eelektross').learnset.leechlife;
		// Elgyem
		this.modData('Learnsets','elgyem').learnset.confuseray = ["9D"];
		this.modData('Learnsets','elgyem').learnset.mindbend = ["9L1"];
		this.modData('Learnsets','elgyem').learnset.barrierbash = ["9L18"];
		this.modData('Learnsets','elgyem').learnset.flash = ["9M"];
		this.modData('Learnsets','elgyem').learnset.nightmare = ["9M"];
		this.modData('Learnsets','elgyem').learnset.powergem = ["9M"];
		this.modData('Learnsets','elgyem').learnset.stasis = ["9M"];
		delete this.modData('Learnsets','elgyem').learnset.headbutt;
		// Beheeyem
		this.modData('Learnsets','beheeyem').learnset.psychoboost = ["9D"];
		this.modData('Learnsets','beheeyem').learnset.mindbend = ["9L1"];
		this.modData('Learnsets','beheeyem').learnset.barrierbash = ["9L18"];
		this.modData('Learnsets','beheeyem').learnset.flash = ["9M"];
		this.modData('Learnsets','beheeyem').learnset.nightmare = ["9M"];
		this.modData('Learnsets','beheeyem').learnset.powergem = ["9M"];
		this.modData('Learnsets','beheeyem').learnset.stasis = ["9M"];
		delete this.modData('Learnsets','beheeyem').learnset.headbutt;
		// Litwick
		this.modData('Learnsets','litwick').learnset.sweetscent = ["9D"];
		this.modData('Learnsets','litwick').learnset.flash = ["9M"];
		this.modData('Learnsets','litwick').learnset.mysticalfire = ["9E"];
		this.modData('Learnsets','litwick').learnset.nightmare = ["9M"];
		// Lampent
		this.modData('Learnsets','lampent').learnset.sweetscent = ["9D"];
		this.modData('Learnsets','lampent').learnset.flash = ["9M"];
		this.modData('Learnsets','lampent').learnset.nightmare = ["9M"];
		// Chandelure
		this.modData('Learnsets','chandelure').learnset.sweetscent = ["9D"];
		this.modData('Learnsets','chandelure').learnset.flash = ["9M"];
		this.modData('Learnsets','chandelure').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','chandelure').learnset.trailhead;
		// Axew
		this.modData('Learnsets','axew').learnset.metaledge = ["9D"];
		this.modData('Learnsets','axew').learnset.cut = ["9E"];
		// Fraxure
		this.modData('Learnsets','fraxure').learnset.metaledge = ["9D"];
		// Haxorus
		this.modData('Learnsets','haxorus').learnset.glaiverush = ["9D"];
		// Cubchoo
		this.modData('Learnsets','cubchoo').learnset.snowtumble = ["9D"];
		// Beartic
		this.modData('Learnsets','beartic').learnset.snowtumble = ["9D"];
		// Cryogonal
		this.modData('Learnsets','cryogonal').learnset.mirrorshot = ["9D"];
		this.modData('Learnsets','cryogonal').learnset.nastyplot = ["9M"];
		delete this.modData('Learnsets','cryogonal').learnset.attract;
		// Shelmet
		this.modData('Learnsets','shelmet').learnset.clamp = ["9D"];
		this.modData('Learnsets','shelmet').learnset.withdraw = ["9L1"];
		this.modData('Learnsets','shelmet').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','shelmet').learnset.vitaldrain = ["9M"];
		this.modData('Learnsets','shelmet').learnset.springleap = ["9E"];
		delete this.modData('Learnsets','shelmet').learnset.absorb;
		// Accelgor
		this.modData('Learnsets','accelgor').learnset.ragepowder = ["9D"];
		this.modData('Learnsets','accelgor').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','accelgor').learnset.stringshot = ["9M"];
		this.modData('Learnsets','accelgor').learnset.toxic = ["9M"];
		this.modData('Learnsets','accelgor').learnset.trailhead = ["9M"];
		this.modData('Learnsets','accelgor').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','accelgor').learnset.absorb;
		// Stunfisk
		this.modData('Learnsets','stunfisk').learnset.thundercage = ["9D"];
		this.modData('Learnsets','stunfisk').learnset.flash = ["9M"];
		delete this.modData('Learnsets','stunfisk').learnset.tantrum;
		// Stunfisk Galar
		this.modData('Learnsets','stunfiskgalar').learnset.jawlock = ["9D"];
		this.modData('Learnsets','stunfiskgalar').learnset.endeavor = ["9M"];
		this.modData('Learnsets','stunfiskgalar').learnset.superfang = ["9M"];
		delete this.modData('Learnsets','stunfiskgalar').learnset.bounce;
		delete this.modData('Learnsets','stunfiskgalar').learnset.tantrum;
		// Mienfoo
		this.modData('Learnsets','mienfoo').learnset.armthrust = ["9D"];
		this.modData('Learnsets','mienfoo').learnset.deepbreath = ["9L5"];
		this.modData('Learnsets','mienfoo').learnset.rollingkick = ["9L17"];
		this.modData('Learnsets','mienfoo').learnset.meditate = ["9L25"];
		this.modData('Learnsets','mienfoo').learnset.calmmind = ["9M"];
		delete this.modData('Learnsets','mienfoo').learnset.doubleslap;
		// Mienshao
		this.modData('Learnsets','mienshao').learnset.lashout = ["9D"];
		this.modData('Learnsets','mienshao').learnset.deepbreath = ["9L5"];
		this.modData('Learnsets','mienshao').learnset.rollingkick = ["9L17"];
		this.modData('Learnsets','mienshao').learnset.meditate = ["9L25"];
		delete this.modData('Learnsets','mienshao').learnset.doubleslap;
		// Druddigon
		this.modData('Learnsets','druddigon').learnset.morningsun = ["9D"];
		this.modData('Learnsets','druddigon').learnset.avalanche = ["9M"];
		this.modData('Learnsets','druddigon').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','druddigon').learnset.screech = ["9M"];
		// Golett
		this.modData('Learnsets','golett').learnset.selfdestruct = ["9D"];
		this.modData('Learnsets','golett').learnset.tussle = ["9L21"];
		this.modData('Learnsets','golett').learnset.tantrum = ["9M"];
		this.modData('Learnsets','golett').learnset.chillywater = ["9M"];
		this.modData('Learnsets','golett').learnset.flash = ["9M"];
		delete this.modData('Learnsets','golett').learnset.blizzard;
		delete this.modData('Learnsets','golett').learnset.icebeam;
		// Golurk
		this.modData('Learnsets','golurk').learnset.meteormash = ["9D"];
		this.modData('Learnsets','golurk').learnset.tussle = ["9L21"];
		this.modData('Learnsets','golurk').learnset.hardpress = ["9L76"];
		this.modData('Learnsets','golurk').learnset.phantomforce = ["9M"];
		this.modData('Learnsets','golurk').learnset.tantrum = ["9M"];
		this.modData('Learnsets','golurk').learnset.explosion = ["9M"];
		this.modData('Learnsets','golurk').learnset.chillywater = ["9M"];
		this.modData('Learnsets','golurk').learnset.flash = ["9M"];
		delete this.modData('Learnsets','golurk').learnset.blizzard;
		// Pawniard
		this.modData('Learnsets','pawniard').learnset.beatup = ["9D"];
		this.modData('Learnsets','pawniard').learnset.metaledge = ["9L54"];
		this.modData('Learnsets','pawniard').learnset.ironhead = ["9M"];
		delete this.modData('Learnsets','pawniard').learnset.stoneedge;
		// Bisharp
		this.modData('Learnsets','bisharp').learnset.beatup = ["9D"];
		this.modData('Learnsets','bisharp').learnset.metaledge = ["9L57"];
		this.modData('Learnsets','bisharp').learnset.ironhead = ["9M"];
		this.modData('Learnsets','bisharp').learnset.rockslide = ["9M"];
		delete this.modData('Learnsets','bisharp').learnset.stoneedge;
		// Bouffalant
		this.modData('Learnsets','bouffalant').learnset.horndrill = ["9D"];
		this.modData('Learnsets','bouffalant').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','bouffalant').learnset.throatchop = ["9E"];
		// Rufflet
		this.modData('Learnsets','rufflet').learnset.nobleroar = ["9D"];
		// Braviary
		this.modData('Learnsets','braviary').learnset.nobleroar = ["9D"];
		// Braviary-Hisui
		this.modData('Learnsets','braviaryhisui').learnset.nobleroar = ["9D"];
		this.modData('Learnsets','braviaryhisui').learnset.laserfocus = ["9M"];
		// Vullaby
		this.modData('Learnsets','vullaby').learnset.shadowbone = ["9D"];
		this.modData('Learnsets','vullaby').learnset.toxic = ["9M"];
		// Mandibuzz
		this.modData('Learnsets','mandibuzz').learnset.shadowbone = ["9D"];
		this.modData('Learnsets','mandibuzz').learnset.toxic = ["9M"];
		// Heatmor
		this.modData('Learnsets','heatmor').learnset.clearsmog = ["9D"];
		this.modData('Learnsets','heatmor').learnset.temperflare = ["9L61"];
		this.modData('Learnsets','heatmor').learnset.flash = ["9M"];
		this.modData('Learnsets','heatmor').learnset.bind = ["9E"];
		delete this.modData('Learnsets','heatmor').learnset.flareblitz;
		delete this.modData('Learnsets','heatmor').learnset.wrap;
		// Durant
		this.modData('Learnsets','durant').learnset.healorder = ["9D"];
		this.modData('Learnsets','durant').learnset.compensation = ["9M"];
		this.modData('Learnsets','durant').learnset.infestation = ["9M"];
		this.modData('Learnsets','durant').learnset.escapetunnel = ["9E"];
		this.modData('Learnsets','durant').learnset.metalburst = ["9E"];
		delete this.modData('Learnsets','durant').learnset.stoneedge;
		delete this.modData('Learnsets','durant').learnset.tantrum;
		// Deino
		this.modData('Learnsets','deino').learnset.rage = ["9D"];
		// Zweilous
		this.modData('Learnsets','zweilous').learnset.rage = ["9D"];
		// Hydreigon
		this.modData('Learnsets','hydreigon').learnset.fellswoop = ["9D"];
		delete this.modData('Learnsets','hydreigon').learnset.stealthrock;
		delete this.modData('Learnsets','hydreigon').learnset.stoneedge;
		// Larvesta
		this.modData('Learnsets','larvesta').learnset.burnup = ["9D"];
		this.modData('Learnsets','larvesta').learnset.flash = ["9M"];
		this.modData('Learnsets','larvesta').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','larvesta').learnset.vitaldrain = ["9M"];
		this.modData('Learnsets','larvesta').learnset.sandblast = ["9E"];
		delete this.modData('Learnsets','larvesta').learnset.absorb;
		delete this.modData('Learnsets','larvesta').learnset.trailhead;
		// Volcarona
		this.modData('Learnsets','volcarona').learnset.burnup = ["9D"];
		this.modData('Learnsets','volcarona').learnset.flash = ["9M"];
		this.modData('Learnsets','volcarona').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','volcarona').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','volcarona').learnset.absorb;
		delete this.modData('Learnsets','volcarona').learnset.trailhead;
		// Cobalion
		this.modData('Learnsets','cobalion').learnset.reversal = ["9D"];
		this.modData('Learnsets','cobalion').learnset.metalburst = ["9L25"];
		this.modData('Learnsets','cobalion').learnset.metaledge = ["9L55"];
		this.modData('Learnsets','cobalion').learnset.chipaway = ["9M"];
		this.modData('Learnsets','cobalion').learnset.ironhead = ["9M"];
		this.modData('Learnsets','cobalion').learnset.rockslide = ["9M"];
		// Terrakion
		this.modData('Learnsets','terrakion').learnset.reversal = ["9D"];
		this.modData('Learnsets','terrakion').learnset.stoneaxe = ["9L55"];
		this.modData('Learnsets','terrakion').learnset.stoneedge = ["9M"];
		this.modData('Learnsets','terrakion').learnset.chipaway = ["9M"];
		// Virizion
		this.modData('Learnsets','virizion').learnset.reversal = ["9D"];
		this.modData('Learnsets','virizion').learnset.chipaway = ["9M"];
		this.modData('Learnsets','virizion').learnset.flash = ["9M"];
		this.modData('Learnsets','virizion').learnset.rockslide = ["9M"];
		// Tornadus
		this.modData('Learnsets','tornadus').learnset.twister = ["9D"];
		delete this.modData('Learnsets','tornadus').learnset.metronome;
		// Tornadus Therian
		this.modData('Learnsets','tornadustherian').learnset.skyattack = ["9D"];
		// Thundurus
		this.modData('Learnsets','thundurus').learnset.iondeluge = ["9D"];
		this.modData('Learnsets','thundurus').learnset.extrasensory = ["9L25"];
		this.modData('Learnsets','thundurus').learnset.raindance = ["9L55","9M"];
		this.modData('Learnsets','thundurus').learnset.nastyplot = ["9M"];
		delete this.modData('Learnsets','thundurus').learnset.defog;
		delete this.modData('Learnsets','thundurus').learnset.healblock;
		// Thundurus Therian
		this.modData('Learnsets','thundurustherian').learnset.dragonpulse = ["9D"];
		// Reshiram
		this.modData('Learnsets','reshiram').learnset.dragonenergy = ["9D"];
		this.modData('Learnsets','reshiram').learnset.flash = ["9M"];
		this.modData('Learnsets','reshiram').learnset.preheat = ["9L8"];
		delete this.modData('Learnsets','reshiram').learnset.slash;
		// Zekrom
		this.modData('Learnsets','zekrom').learnset.dragonenergy = ["9D"];
		this.modData('Learnsets','zekrom').learnset.charge = ["9L8"];
		this.modData('Learnsets','zekrom').learnset.flash = ["9M"];
		delete this.modData('Learnsets','zekrom').learnset.slash;
		delete this.modData('Learnsets','zekrom').learnset.stealthrock;
		// Landorus
		this.modData('Learnsets','landorus').learnset.rototiller = ["9D"];
		this.modData('Learnsets','landorus').learnset.compensation = ["9M"];
		delete this.modData('Learnsets','landorus').learnset.defog;
		// Landorus Therian
		this.modData('Learnsets','landorustherian').learnset.nobleroar = ["9D"];
		// Kyurem
		this.modData('Learnsets','kyurem').learnset.triattack = ["9D"];
		this.modData('Learnsets','kyurem').learnset.scaryface = ["9L8"];
		this.modData('Learnsets','kyurem').learnset.slash = ["9L16"];
		this.modData('Learnsets','kyurem').learnset.endeavor = ["9L24","9M"];
		this.modData('Learnsets','kyurem').learnset.dragonpulse = ["9L32","9M"];
		this.modData('Learnsets','kyurem').learnset.icebeam = ["9L40","9M"];
		this.modData('Learnsets','kyurem').learnset.sheercold = ["9L48"];
		this.modData('Learnsets','kyurem').learnset.hypervoice = ["9L56","9M"];
		this.modData('Learnsets','kyurem').learnset.blizzard = ["9L64","9M"];
		this.modData('Learnsets','kyurem').learnset.imprison = ["9L72"];
		this.modData('Learnsets','kyurem').learnset.outrage = ["9L80","9M"];
		this.modData('Learnsets','kyurem').learnset.glaciate = ["9L88"];
		this.modData('Learnsets','kyurem').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','kyurem').learnset.icepunch = ["9M"];
		// Kyurem Black
		this.modData('Learnsets','kyuremwhite').learnset.triattack = ["9D"];
		this.modData('Learnsets','kyuremblack').learnset.fusionbolt = ["9R"];
		this.modData('Learnsets','kyuremblack').learnset.scaryface = ["9L8"];
		this.modData('Learnsets','kyuremblack').learnset.slash = ["9L16"];
		this.modData('Learnsets','kyuremblack').learnset.endeavor = ["9L24","9M"];
		this.modData('Learnsets','kyuremblack').learnset.dragonpulse = ["9L32","9M"];
		this.modData('Learnsets','kyuremblack').learnset.icebeam = ["9L40","9M"];
		this.modData('Learnsets','kyuremblack').learnset.sheercold = ["9L48"];
		this.modData('Learnsets','kyuremblack').learnset.hypervoice = ["9L56","9M"];
		this.modData('Learnsets','kyuremblack').learnset.blizzard = ["9L64","9M"];
		this.modData('Learnsets','kyuremblack').learnset.imprison = ["9L72"];
		this.modData('Learnsets','kyuremblack').learnset.outrage = ["9L80","9M"];
		this.modData('Learnsets','kyuremblack').learnset.freezeshock = ["9L88"];
		this.modData('Learnsets','kyuremblack').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','kyuremblack').learnset.icepunch = ["9M"];
		// Kyurem White
		this.modData('Learnsets','kyuremblack').learnset.triattack = ["9D"];
		this.modData('Learnsets','kyuremwhite').learnset.fusionflare = ["9R"];
		this.modData('Learnsets','kyuremwhite').learnset.scaryface = ["9L8"];
		this.modData('Learnsets','kyuremwhite').learnset.slash = ["9L16"];
		this.modData('Learnsets','kyuremwhite').learnset.endeavor = ["9L24","9M"];
		this.modData('Learnsets','kyuremwhite').learnset.dragonpulse = ["9L32","9M"];
		this.modData('Learnsets','kyuremwhite').learnset.icebeam = ["9L40","9M"];
		this.modData('Learnsets','kyuremwhite').learnset.sheercold = ["9L48"];
		this.modData('Learnsets','kyuremwhite').learnset.hypervoice = ["9L56","9M"];
		this.modData('Learnsets','kyuremwhite').learnset.blizzard = ["9L64","9M"];
		this.modData('Learnsets','kyuremwhite').learnset.imprison = ["9L72"];
		this.modData('Learnsets','kyuremwhite').learnset.outrage = ["9L80","9M"];
		this.modData('Learnsets','kyuremwhite').learnset.iceburn = ["9L88"];
		this.modData('Learnsets','kyuremwhite').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','kyuremwhite').learnset.icepunch = ["9M"];
		// Keldeo
		this.modData('Learnsets','keldeo').learnset.secretsword = ["9D"];
		this.modData('Learnsets','keldeo').learnset.takedown = ["9L7"];
		this.modData('Learnsets','keldeo').learnset.helpinghand = ["9L13"];
		this.modData('Learnsets','keldeo').learnset.retaliate = ["9L19", "9M"];
		this.modData('Learnsets','keldeo').learnset.aquacutter = ["9L25"];
		this.modData('Learnsets','keldeo').learnset.sacredsword = ["9L31"];
		this.modData('Learnsets','keldeo').learnset.swordsdance = ["9L37", "9M"];
		this.modData('Learnsets','keldeo').learnset.quickguard = ["9L43"];
		this.modData('Learnsets','keldeo').learnset.workup = ["9L49", "9M"];
		this.modData('Learnsets','keldeo').learnset.hydropump = ["9L55", "9M"];
		this.modData('Learnsets','keldeo').learnset.closecombat = ["9L61"];
		this.modData('Learnsets','keldeo').learnset.aquatail = ["9M"];
		// Meloetta Aria
		this.modData('Learnsets','meloetta').learnset.sparklingaria = ["9D"];
		this.modData('Learnsets','meloetta').learnset.round = ["9L1", "9M"];
		this.modData('Learnsets','meloetta').learnset.confusion = ["9L8"];
		this.modData('Learnsets','meloetta').learnset.sing = ["9L15"];
		this.modData('Learnsets','meloetta').learnset.luckychant = ["9L22"];
		this.modData('Learnsets','meloetta').learnset.encore = ["9L29", "9M"];
		this.modData('Learnsets','meloetta').learnset.echoedvoice = ["9L36", "9M"];
		this.modData('Learnsets','meloetta').learnset.psybeam = ["9L43"];
		this.modData('Learnsets','meloetta').learnset.relicsong = ["9L50"];
		this.modData('Learnsets','meloetta').learnset.hypervoice = ["9L57", "9M"];
		this.modData('Learnsets','meloetta').learnset.psychic = ["9L64", "9M"];
		this.modData('Learnsets','meloetta').learnset.roleplay = ["9L71", "9M"];
		this.modData('Learnsets','meloetta').learnset.perishsong = ["9L78"];
		this.modData('Learnsets','meloetta').learnset.chillywater = ["9M"];
		this.modData('Learnsets','meloetta').learnset.flash = ["9M"];
		delete this.modData('Learnsets','meloetta').learnset.acrobatics;
		delete this.modData('Learnsets','meloetta').learnset.closecombat;
		delete this.modData('Learnsets','meloetta').learnset.honeclaws;
		delete this.modData('Learnsets','meloetta').learnset.quickattack;
		delete this.modData('Learnsets','meloetta').learnset.stoneedge;
		delete this.modData('Learnsets','meloetta').learnset.teeterdance;
		delete this.modData('Learnsets','meloetta').learnset.uturn;
		delete this.modData('Learnsets','meloetta').learnset.wakeupslap;
		// Meloetta Pirouette
		this.modData('Learnsets','meloettapirouette').learnset = Utils.deepClone(this.modData('Learnsets','meloetta').learnset);
		this.modData('Learnsets','meloettapirouette').learnset.aquastep = ["9D"];
		this.modData('Learnsets','meloettapirouette').learnset.quickattack = ["9L1"];
		this.modData('Learnsets','meloettapirouette').learnset.lowkick = ["9L8"];
		this.modData('Learnsets','meloettapirouette').learnset.teeterdance = ["9L15"];
		this.modData('Learnsets','meloettapirouette').learnset.entrainment = ["9L22"];
		this.modData('Learnsets','meloettapirouette').learnset.acrobatics = ["9L36", "9M"];
		this.modData('Learnsets','meloettapirouette').learnset.wakeupslap = ["9L43"];
		this.modData('Learnsets','meloettapirouette').learnset.uturn = ["9L57", "9M"];
		this.modData('Learnsets','meloettapirouette').learnset.closecombat = ["9L64"];
		this.modData('Learnsets','meloettapirouette').learnset.victorydance = ["9L78"];
		delete this.modData('Learnsets','meloettapirouette').learnset.round;
		delete this.modData('Learnsets','meloettapirouette').learnset.confusion;
		delete this.modData('Learnsets','meloettapirouette').learnset.sing;
		delete this.modData('Learnsets','meloettapirouette').learnset.luckychant;
		delete this.modData('Learnsets','meloettapirouette').learnset.echoedvoice;
		delete this.modData('Learnsets','meloettapirouette').learnset.psybeam;
		delete this.modData('Learnsets','meloettapirouette').learnset.hypervoice;
		delete this.modData('Learnsets','meloettapirouette').learnset.psychic;
		delete this.modData('Learnsets','meloettapirouette').learnset.perishsong;
		delete this.modData('Learnsets','meloettapirouette').learnset.sparklingaria;
		// Genesect
		this.modData('Learnsets','genesect').learnset.extremespeed = ["9D"];
		this.modData('Learnsets','genesect').learnset.cuttinglaser = ["9L62"];
		this.modData('Learnsets','genesect').learnset.technoblast = ["9L73"];
		this.modData('Learnsets','genesect').learnset.hyperbeam = ["9L77", "9M"];
		this.modData('Learnsets','genesect').learnset.chillywater = ["9M"];
		this.modData('Learnsets','genesect').learnset.flash = ["9M"];
		this.modData('Learnsets','genesect').learnset.incinerate = ["9M"];
		this.modData('Learnsets','genesect').learnset.stringshot = ["9M"];
		delete this.modData('Learnsets','genesect').learnset.selfdestruct;
		// Chespin
		this.modData('Learnsets','chespin').learnset.skullbash = ["9D"];
		this.modData('Learnsets','chespin').learnset.bulletseed = ["9L35"];
		this.modData('Learnsets','chespin').learnset.flash = ["9M"];
		this.modData('Learnsets','chespin').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','chespin').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','chespin').learnset.mudshot;
		// Quilladin
		this.modData('Learnsets','quilladin').learnset.skullbash = ["9D"];
		this.modData('Learnsets','quilladin').learnset.bulletseed = ["9L39"];
		this.modData('Learnsets','quilladin').learnset.flash = ["9M"];
		this.modData('Learnsets','quilladin').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','quilladin').learnset.lowsweep = ["9M"];
		this.modData('Learnsets','quilladin').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','quilladin').learnset.mudshot;
		// Chesnaught
		this.modData('Learnsets','chesnaught').learnset.skullbash = ["9D"];
		this.modData('Learnsets','chesnaught').learnset.bulletseed = ["9L41"];
		this.modData('Learnsets','chesnaught').learnset.chipaway = ["9M"];
		this.modData('Learnsets','chesnaught').learnset.flash = ["9M"];
		this.modData('Learnsets','chesnaught').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','chesnaught').learnset.lowsweep = ["9M"];
		this.modData('Learnsets','chesnaught').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','chesnaught').learnset.mudshot;
		// Fennekin
		this.modData('Learnsets','fennekin').learnset.confuseray = ["9D"];
		this.modData('Learnsets','fennekin').learnset.amnesia = ["9M"];
		this.modData('Learnsets','fennekin').learnset.charm = ["9M"];
		// Braixen
		this.modData('Learnsets','braixen').learnset.confuseray = ["9D"];
		this.modData('Learnsets','braixen').learnset.amnesia = ["9M"];
		this.modData('Learnsets','braixen').learnset.charm = ["9M"];
		this.modData('Learnsets','braixen').learnset.hex = ["9M"];
		this.modData('Learnsets','braixen').learnset.nightmare = ["9M"];
		// Delphox
		this.modData('Learnsets','delphox').learnset.confuseray = ["9D"];
		this.modData('Learnsets','delphox').learnset.eeriespell = ["9L1"];
		this.modData('Learnsets','delphox').learnset.amnesia = ["9M"];
		this.modData('Learnsets','delphox').learnset.charm = ["9M"];
		this.modData('Learnsets','delphox').learnset.hex = ["9M"];
		this.modData('Learnsets','delphox').learnset.nightmare = ["9M"];
		this.modData('Learnsets','delphox').learnset.shadowball = ["9M"];
		// Froakie
		this.modData('Learnsets','froakie').learnset.jetpunch = ["9D"];
		this.modData('Learnsets','froakie').learnset.cut = ["9E"];
		this.modData('Learnsets','froakie').learnset.toxic = ["9M"];
		this.modData('Learnsets','froakie').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','froakie').learnset.blizzard;
		delete this.modData('Learnsets','froakie').learnset.icebeam;
		delete this.modData('Learnsets','froakie').learnset.poweruppunch;
		// Frogadier
		this.modData('Learnsets','frogadier').learnset.jetpunch = ["9D"];
		this.modData('Learnsets','frogadier').learnset.toxic = ["9M"];
		this.modData('Learnsets','frogadier').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','frogadier').learnset.blizzard;
		delete this.modData('Learnsets','frogadier').learnset.icebeam;
		// Greninja
		this.modData('Learnsets','greninja').learnset.spiritshackle = ["9D"];
		this.modData('Learnsets','greninja').learnset.aquacutter = ["9L68"];
		this.modData('Learnsets','greninja').learnset.hydropump = ["9M"];
		this.modData('Learnsets','greninja').learnset.toxic = ["9M"];
		this.modData('Learnsets','greninja').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','froakie').learnset.blizzard;
		// Bunnelby
		this.modData('Learnsets','bunnelby').learnset.crosschop = ["9D"];
		this.modData('Learnsets','bunnelby').learnset.tussle = ["9L12"];
		this.modData('Learnsets','bunnelby').learnset.bulldoze = ["9L22","9M"];
		this.modData('Learnsets','bunnelby').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','bunnelby').learnset.trailhead = ["9M"];
		this.modData('Learnsets','bunnelby').learnset.rockclimb = ["9E"];
		delete this.modData('Learnsets','bunnelby').learnset.mudshot;
		// Diggersby
		this.modData('Learnsets','diggersby').learnset.crosschop = ["9D"];
		this.modData('Learnsets','diggersby').learnset.doubleslap = ["9L10"];
		this.modData('Learnsets','diggersby').learnset.tussle = ["9L12"];
		this.modData('Learnsets','diggersby').learnset.bulldoze = ["9L24","9M"];
		this.modData('Learnsets','diggersby').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','diggersby').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','diggersby').learnset.mudshot;
		// Fletchling
		this.modData('Learnsets','fletchling').learnset.pluck = ["9D"];
		this.modData('Learnsets','fletchling').learnset.mefirst = ["9E"];
		this.modData('Learnsets','fletchling').learnset.razorwind = ["9E"];
		// Fletchinder
		this.modData('Learnsets','fletchinder').learnset.pluck = ["9D"];
		this.modData('Learnsets','fletchinder').learnset.temperflare = ["9L50"];
		this.modData('Learnsets','fletchinder').learnset.steelwing = ["9M"];
		// Talonflame
		this.modData('Learnsets','talonflame').learnset.skydrop = ["9D"];
		this.modData('Learnsets','talonflame').learnset.temperflare = ["9L57"];
		this.modData('Learnsets','talonflame').learnset.steelwing = ["9M"];
		this.modData('Learnsets','talonflame').learnset.screech = ["9M"];
		// Vivillon
		this.modData('Learnsets','vivillon').learnset.reflecttype = ["9D"];
		this.modData('Learnsets','vivillon').learnset.silverwind = ["9L17"];
		this.modData('Learnsets','vivillon').learnset.flash = ["9M"];
		delete this.modData('Learnsets','vivillon').learnset.psybeam;
		// Litleo
		this.modData('Learnsets','litleo').learnset.assist = ["9D"];
		this.modData('Learnsets','litleo').learnset.deepbreath = ["9L15"];
		this.modData('Learnsets','litleo').learnset.temperflare = ["9L46"];
		this.modData('Learnsets','litleo').learnset.incinerate = ["9M"];
		this.modData('Learnsets','litleo').learnset.assurance = ["9M"];
		delete this.modData('Learnsets','litleo').learnset.nobleroar;
		// Pyroar
		this.modData('Learnsets','pyroar').learnset.assist = ["9D"];
		this.modData('Learnsets','pyroar').learnset.nobleroar = ["9L0"];
		this.modData('Learnsets','pyroar').learnset.deepbreath = ["9L15"];
		this.modData('Learnsets','pyroar').learnset.temperflare = ["9L51"];
		this.modData('Learnsets','pyroar').learnset.incinerate = ["9M"];
		this.modData('Learnsets','pyroar').learnset.assurance = ["9M"];
		// Flabébé
		this.modData('Learnsets','flabebe').learnset.sweetscent = ["9D"];
		this.modData('Learnsets','flabebe').learnset.charm = ["9M"];
		this.modData('Learnsets','flabebe').learnset.daydream = ["9L1"];
		this.modData('Learnsets','flabebe').learnset.faketears = ["9M"];
		this.modData('Learnsets','flabebe').learnset.flash = ["9M"];
		this.modData('Learnsets','flabebe').learnset.leafage = ["9L1"];
		this.modData('Learnsets','flabebe').learnset.lifedew = ["9E"];
		this.modData('Learnsets','flabebe').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','flabebe').learnset.vinewhip;
		// Floette
		this.modData('Learnsets','floette').learnset.sweetscent = ["9D"];
		this.modData('Learnsets','floette').learnset.charm = ["9M"];
		this.modData('Learnsets','floette').learnset.daydream = ["9L1"];
		this.modData('Learnsets','floette').learnset.faketears = ["9M"];
		this.modData('Learnsets','floette').learnset.flash = ["9M"];
		this.modData('Learnsets','floette').learnset.leafage = ["9L1"];
		this.modData('Learnsets','floette').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','floette').learnset.vinewhip;
		// Florges
		this.modData('Learnsets','florges').learnset.fleurcannon = ["9D"];
		this.modData('Learnsets','florges').learnset.courtchange = ["9L1"];
		this.modData('Learnsets','florges').learnset.daydream = ["9L1"];
		this.modData('Learnsets','florges').learnset.leafage = ["9L1"];
		this.modData('Learnsets','florges').learnset.charm = ["9M"];
		this.modData('Learnsets','florges').learnset.faketears = ["9M"];
		this.modData('Learnsets','florges').learnset.flash = ["9M"];
		this.modData('Learnsets','florges').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','florges').learnset.defog;
		delete this.modData('Learnsets','florges').learnset.vinewhip;
		// Skiddo
		this.modData('Learnsets','skiddo').learnset.highhorsepower = ["9D"];
		this.modData('Learnsets','skiddo').learnset.trailhead = ["9L13", "9M"];
		this.modData('Learnsets','skiddo').learnset.rockclimb = ["9L26"];
		this.modData('Learnsets','skiddo').learnset.amnesia = ["9M"];
		this.modData('Learnsets','skiddo').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','skiddo').learnset.charm = ["9M"];
		this.modData('Learnsets','skiddo').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','skiddo').learnset.razorleaf;
		// Gogoat
		this.modData('Learnsets','gogoat').learnset.highhorsepower = ["9D"];
		this.modData('Learnsets','gogoat').learnset.trailhead = ["9L13", "9M"];
		this.modData('Learnsets','gogoat').learnset.rockclimb = ["9L26"];
		this.modData('Learnsets','gogoat').learnset.amnesia = ["9M"];
		this.modData('Learnsets','gogoat').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','gogoat').learnset.charm = ["9M"];
		this.modData('Learnsets','gogoat').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','gogoat').learnset.razorleaf;
		// Pancham
		this.modData('Learnsets','pancham').learnset.scaryface = ["9D"];
		this.modData('Learnsets','pancham').learnset.entrainment = ["9L20"];
		this.modData('Learnsets','pancham').learnset.lowsweep = ["9L27", "9M"];
		this.modData('Learnsets','pancham').learnset.skyuppercut = ["9L39"];
		this.modData('Learnsets','pancham').learnset.megapunch = ["9L42"];
		this.modData('Learnsets','pancham').learnset.bulletpunch = ["9E"];
		this.modData('Learnsets','pancham').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','pancham').learnset.crunch;
		delete this.modData('Learnsets','pancham').learnset.slash;
		delete this.modData('Learnsets','pancham').learnset.stoneedge;
		// Pangoro
		this.modData('Learnsets','pangoro').learnset.scaryface = ["9D"];
		this.modData('Learnsets','pangoro').learnset.suckerpunch = ["9L0"];
		this.modData('Learnsets','pangoro').learnset.entrainment = ["9L20"];
		this.modData('Learnsets','pangoro').learnset.lowsweep = ["9L27", "9M"];
		this.modData('Learnsets','pangoro').learnset.skyuppercut = ["9L42"];
		this.modData('Learnsets','pangoro').learnset.megapunch = ["9L45"];
		this.modData('Learnsets','pangoro').learnset.vitalthrow = ["9L52"];
		this.modData('Learnsets','pangoro').learnset.darkestlariat = ["9L57"];
		this.modData('Learnsets','pangoro').learnset.chipaway = ["9M"];
		this.modData('Learnsets','pangoro').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','pangoro').learnset.crunch;
		delete this.modData('Learnsets','pangoro').learnset.slash;
		// Furfrou
		this.modData('Learnsets','furfrou').learnset.swagger = ["9D"];
		delete this.modData('Learnsets','furfrou').learnset.uturn;
		// Espurr
		this.modData('Learnsets','espurr').learnset.payday = ["9D"];
		// Meowstic ♀
		this.modData('Learnsets','meowsticf').learnset.miracleeye = ["9D"];
		// Meowstic ♂
		this.modData('Learnsets','meowstic').learnset.futuresight = ["9D"];
		// Honedge
		this.modData('Learnsets','honedge').learnset.destinybond = ["9D"];
		this.modData('Learnsets','honedge').learnset.scratch = ["9L1"];
		this.modData('Learnsets','honedge').learnset.irondefense = ["9L1", "9M"];
		this.modData('Learnsets','honedge').learnset.slash = ["9L18"];
		this.modData('Learnsets','honedge').learnset.swordsdance = ["9L29", "9M"];
		this.modData('Learnsets','honedge').learnset.ironhead = ["9L32", "9M"];
		this.modData('Learnsets','honedge').learnset.metaledge = ["9L42"];
		this.modData('Learnsets','honedge').learnset.autotomize = ["9L52"];
		this.modData('Learnsets','honedge').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','honedge').learnset.nightmare = ["9M"];
		this.modData('Learnsets','honedge').learnset.terrify = ["9E"];
		delete this.modData('Learnsets','honedge').learnset.tackle;
		// Doublade
		this.modData('Learnsets','doublade').learnset.destinybond = ["9D"];
		this.modData('Learnsets','doublade').learnset.scratch = ["9L1"];
		this.modData('Learnsets','doublade').learnset.irondefense = ["9L1", "9M"];
		this.modData('Learnsets','doublade').learnset.slash = ["9L18"];
		this.modData('Learnsets','doublade').learnset.swordsdance = ["9L29", "9M"];
		this.modData('Learnsets','doublade').learnset.ironhead = ["9L32", "9M"];
		this.modData('Learnsets','doublade').learnset.metaledge = ["9L45"];
		this.modData('Learnsets','doublade').learnset.autotomize = ["9L57"];
		this.modData('Learnsets','doublade').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','doublade').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','doublade').learnset.tackle;
		// Aegislash
		this.modData('Learnsets','aegislash').learnset.bitterblade = ["9D"];
		this.modData('Learnsets','aegislash').learnset.scratch = ["9L1"];
		this.modData('Learnsets','aegislash').learnset.metaledge = ["9L1"];
		this.modData('Learnsets','aegislash').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','aegislash').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','aegislash').learnset.tackle;
		// Spritzee
		this.modData('Learnsets','spritzee').learnset.hypnosis = ["9D"];
		this.modData('Learnsets','spritzee').learnset.nightmare = ["9M"];
		this.modData('Learnsets','spritzee').learnset.alluringvoice = ["9L31"];
		this.modData('Learnsets','spritzee').learnset.strangesmoke = ["9L50"];
		delete this.modData('Learnsets','spritzee').learnset.disarmingvoice;
		delete this.modData('Learnsets','spritzee').learnset.gyroball;
		delete this.modData('Learnsets','spritzee').learnset.moonblast;
		delete this.modData('Learnsets','spritzee').learnset.thunderbolt;
		// Aromatisse
		this.modData('Learnsets','aromatisse').learnset.hypnosis = ["9D"];
		this.modData('Learnsets','aromatisse').learnset.nightmare = ["9M"];
		this.modData('Learnsets','aromatisse').learnset.alluringvoice = ["9L31"];
		this.modData('Learnsets','aromatisse').learnset.strangesmoke = ["9L50"];
		delete this.modData('Learnsets','aromatisse').learnset.disarmingvoice;
		delete this.modData('Learnsets','aromatisse').learnset.gyroball;
		delete this.modData('Learnsets','aromatisse').learnset.moonblast;
		delete this.modData('Learnsets','aromatisse').learnset.thunder;
		// Swirlix
		this.modData('Learnsets','swirlix').learnset.lick = ["9D"];
		this.modData('Learnsets','swirlix').learnset.incinerate = ["9M"];
		this.modData('Learnsets','swirlix').learnset.shockwave = ["9M"];
		this.modData('Learnsets','swirlix').learnset.odorsleuth = ["9E"];
		delete this.modData('Learnsets','swirlix').learnset.flamethrower;
		delete this.modData('Learnsets','swirlix').learnset.thunderbolt;
		// Slurpuff
		this.modData('Learnsets','slurpuff').learnset.lick = ["9D"];
		this.modData('Learnsets','slurpuff').learnset.incinerate = ["9M"];
		this.modData('Learnsets','slurpuff').learnset.shockwave = ["9M"];
		delete this.modData('Learnsets','slurpuff').learnset.stickyweb;
		delete this.modData('Learnsets','slurpuff').learnset.thunder;
		// Inkay
		this.modData('Learnsets','inkay').learnset.liquidation = ["9D"];
		this.modData('Learnsets','inkay').learnset.chillywater = ["9M"];
		this.modData('Learnsets','inkay').learnset.flash = ["9M"];
		this.modData('Learnsets','inkay').learnset.incinerate = ["9M"];
		this.modData('Learnsets','inkay').learnset.nightmare = ["9M"];
		this.modData('Learnsets','inkay').learnset.shockwave = ["9M"];
		this.modData('Learnsets','inkay').learnset.octazooka = ["9E"];
		delete this.modData('Learnsets','inkay').learnset.flamethrower;
		delete this.modData('Learnsets','inkay').learnset.thunderbolt;
		// Malamar
		this.modData('Learnsets','malamar').learnset.liquidation = ["9D"];
		this.modData('Learnsets','malamar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','malamar').learnset.flash = ["9M"];
		this.modData('Learnsets','malamar').learnset.incinerate = ["9M"];
		this.modData('Learnsets','malamar').learnset.nightmare = ["9M"];
		this.modData('Learnsets','malamar').learnset.shockwave = ["9M"];
		// Binacle
		this.modData('Learnsets','binacle').learnset.crushclaw = ["9D"];
		this.modData('Learnsets','binacle').learnset.ancientpower = ["9L20"];
		this.modData('Learnsets','binacle').learnset.furycutter = ["9L28"];
		this.modData('Learnsets','binacle').learnset.stoneaxe = ["9L37"];
		this.modData('Learnsets','binacle').learnset.knockoff = ["9E"];
		this.modData('Learnsets','binacle').learnset.lashout = ["9E"];
		this.modData('Learnsets','binacle').learnset.shelter = ["9E"];
		delete this.modData('Learnsets','binacle').learnset.clamp;
		delete this.modData('Learnsets','binacle').learnset.earthquake;
		// Barbaracle
		this.modData('Learnsets','barbaracle').learnset.crushclaw = ["9D"];
		this.modData('Learnsets','barbaracle').learnset.ancientpower = ["9L20"];
		this.modData('Learnsets','barbaracle').learnset.furycutter = ["9L28"];
		this.modData('Learnsets','barbaracle').learnset.stoneaxe = ["9L37"];
		this.modData('Learnsets','barbaracle').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','barbaracle').learnset.knockoff = ["9M"];
		delete this.modData('Learnsets','barbaracle').learnset.clamp;
		delete this.modData('Learnsets','barbaracle').learnset.meteorbeam;
		// Skrelp
		this.modData('Learnsets','skrelp').learnset.razorleaf = ["9D"];
		this.modData('Learnsets','skrelp').learnset.toxic = ["9L32","9M"];
		this.modData('Learnsets','skrelp').learnset.brine = ["9M"];
		this.modData('Learnsets','skrelp').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','skrelp').learnset.thunderbolt;
		// Dragalge
		this.modData('Learnsets','dragalge').learnset.razorleaf = ["9D"];
		this.modData('Learnsets','dragalge').learnset.toxic = ["9L32","9M"];
		this.modData('Learnsets','dragalge').learnset.brine = ["9M"];
		this.modData('Learnsets','dragalge').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','dragalge').learnset.thunder;
		// Clauncher
		this.modData('Learnsets','clauncher').learnset.flameburst = ["9D"];
		this.modData('Learnsets','clauncher').learnset.mudbomb = ["9L35"];
		this.modData('Learnsets','clauncher').learnset.liquidation = ["9L45"];
		this.modData('Learnsets','clauncher').learnset.bounce = ["9M"];
		this.modData('Learnsets','clauncher').learnset.brine = ["9M"];
		this.modData('Learnsets','clauncher').learnset.electroball = ["9M"];
		this.modData('Learnsets','clauncher').learnset.swordsdance = ["9M"];
		this.modData('Learnsets','clauncher').learnset.whirlpool = ["9M"];
		this.modData('Learnsets','clauncher').learnset.iceball = ["9E"];
		delete this.modData('Learnsets','clauncher').learnset.blizzard;
		delete this.modData('Learnsets','clauncher').learnset.waterfall;
		// Clawitzer
		this.modData('Learnsets','clawitzer').learnset.steameruption = ["9D"];
		this.modData('Learnsets','clawitzer').learnset.mudbomb = ["9L35"];
		this.modData('Learnsets','clawitzer').learnset.liquidation = ["9L49"];
		this.modData('Learnsets','clawitzer').learnset.bounce = ["9M"];
		this.modData('Learnsets','clawitzer').learnset.brine = ["9M"];
		this.modData('Learnsets','clawitzer').learnset.electroball = ["9M"];
		this.modData('Learnsets','clawitzer').learnset.swordsdance = ["9M"];
		this.modData('Learnsets','clawitzer').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','clawitzer').learnset.waterfall;
		// Helioptile
		this.modData('Learnsets','helioptile').learnset.morningsun = ["9D"];
		this.modData('Learnsets','helioptile').learnset.sandblast = ["9L35"];
		this.modData('Learnsets','helioptile').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','helioptile').learnset.flash = ["9M"];
		this.modData('Learnsets','helioptile').learnset.trailhead = ["9M"];
		// Heliolisk
		this.modData('Learnsets','heliolisk').learnset.morningsun = ["9D"];
		this.modData('Learnsets','heliolisk').learnset.particleslam = ["9L1"];
		this.modData('Learnsets','heliolisk').learnset.weatherball = ["9L1"];
		this.modData('Learnsets','heliolisk').learnset.sandblast = ["9L1"];
		this.modData('Learnsets','heliolisk').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','heliolisk').learnset.flash = ["9M"];
		this.modData('Learnsets','heliolisk').learnset.trailhead = ["9M"];
		// Tyrunt
		this.modData('Learnsets','tyrunt').learnset.quash = ["9D"];
		this.modData('Learnsets','tyrunt').learnset.assurance = ["9M"];
		this.modData('Learnsets','tyrunt').learnset.tantrum = ["9L49","9M"];
		this.modData('Learnsets','tyrunt').learnset.closecombat = ["9E"];
		this.modData('Learnsets','tyrunt').learnset.psychicfang = ["9E"];
		delete this.modData('Learnsets','tyrunt').learnset.horndrill;
		// Tyrantrum
		this.modData('Learnsets','tyrantrum').learnset.quash = ["9D"];
		this.modData('Learnsets','tyrantrum').learnset.tantrum = ["9L53","9M"];
		delete this.modData('Learnsets','tyrantrum').learnset.horndrill;
		// Amaura
		this.modData('Learnsets','amaura').learnset.magiccoat = ["9D"];
		this.modData('Learnsets','amaura').learnset.auroraveil = ["9M"];
		this.modData('Learnsets','amaura').learnset.chillywater = ["9M"];
		this.modData('Learnsets','amaura').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','amaura').learnset.flash = ["9M"];
		this.modData('Learnsets','amaura').learnset.powergem = ["9M"];
		this.modData('Learnsets','amaura').learnset.shockwave = ["9M"];
		// Aurorus
		this.modData('Learnsets','aurorus').learnset.magiccoat = ["9D"];
		this.modData('Learnsets','aurorus').learnset.sheercold = ["9L1"];
		this.modData('Learnsets','aurorus').learnset.auroraveil = ["9M"];
		this.modData('Learnsets','aurorus').learnset.chillywater = ["9M"];
		this.modData('Learnsets','aurorus').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','aurorus').learnset.flash = ["9M"];
		this.modData('Learnsets','aurorus').learnset.powergem = ["9M"];
		this.modData('Learnsets','aurorus').learnset.shockwave = ["9M"];
		// Sylveon
		this.modData('Learnsets','sylveon').learnset.wrap = ["9D"];
		this.modData('Learnsets','flareon').learnset.alluringvoice = ["9L29"];
		this.modData('Learnsets','flareon').learnset.psychup = ["9L33", "9M"];
		this.modData('Learnsets','flareon').learnset.lightscreen = ["9L37", "9M"];
		this.modData('Learnsets','flareon').learnset.moonblast = ["9L41"];
		this.modData('Learnsets','flareon').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','flareon').learnset.mistyterrain = ["9L49", "9M"];
		this.modData('Learnsets','sylveon').learnset.flash = ["9M"];
		this.modData('Learnsets','sylveon').learnset.nightmare = ["9M"];
		// Hawlucha
		this.modData('Learnsets','hawlucha').learnset.holdback = ["9D"];
		this.modData('Learnsets','hawlucha').learnset.circlethrow = ["9E"];
		this.modData('Learnsets','hawlucha').learnset.submission = ["9E"];
		delete this.modData('Learnsets','hawlucha').learnset.stoneedge;
		// Dedenne
		this.modData('Learnsets','dedenne').learnset.overdrive = ["9D"];
		this.modData('Learnsets','dedenne').learnset.thundershock = ["9L4"];
		this.modData('Learnsets','dedenne').learnset.charge = ["9L7"];
		this.modData('Learnsets','dedenne').learnset.charm = ["9L10", "9M"];
		this.modData('Learnsets','dedenne').learnset.paraboliccharge = ["9L13"];
		this.modData('Learnsets','dedenne').learnset.nuzzle = ["9L16"];
		this.modData('Learnsets','dedenne').learnset.thunderwave = ["9L19", "9M"];
		this.modData('Learnsets','dedenne').learnset.voltswitch = ["9L22", "9M"];
		this.modData('Learnsets','dedenne').learnset.rest = ["9L25", "9M"];
		this.modData('Learnsets','dedenne').learnset.snore = ["9L28", "9M"];
		this.modData('Learnsets','dedenne').learnset.chargebeam = ["9L31", "9M"];
		this.modData('Learnsets','dedenne').learnset.alluringvoice = ["9L34"];
		this.modData('Learnsets','dedenne').learnset.entrainment = ["9L37"];
		this.modData('Learnsets','dedenne').learnset.playrough = ["9L40"];
		this.modData('Learnsets','dedenne').learnset.particleslam = ["9L43"];
		this.modData('Learnsets','dedenne').learnset.discharge = ["9L46"];
		this.modData('Learnsets','dedenne').learnset.flash = ["9M"];
		this.modData('Learnsets','dedenne').learnset.nastyplot = ["9M"];
		// Carbink
		this.modData('Learnsets','carbink').learnset.mirrorshot = ["9D"];
		this.modData('Learnsets','carbink').learnset.flash = ["9M"];
		// Goomy
		this.modData('Learnsets','goomy').learnset.recover = ["9D"];
		this.modData('Learnsets','goomy').learnset.toxic = ["9M"];
		this.modData('Learnsets','goomy').learnset.lifedew = ["9E"];
		this.modData('Learnsets','goomy').learnset.slipaway = ["9E"];
		delete this.modData('Learnsets','goomy').learnset.thunderbolt;
		// Sliggoo
		this.modData('Learnsets','sliggoo').learnset.recover = ["9D"];
		this.modData('Learnsets','sliggoo').learnset.powerwhip = ["9L53"];
		this.modData('Learnsets','sliggoo').learnset.chillywater = ["9M"];
		this.modData('Learnsets','sliggoo').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','sliggoo').learnset.blizzard;
		delete this.modData('Learnsets','sliggoo').learnset.icebeam;
		delete this.modData('Learnsets','sliggoo').learnset.thunderbolt;
		// Sliggoo Hisui
		this.modData('Learnsets','sliggoohisui').learnset.recover = ["9D"];
		this.modData('Learnsets','sliggoohisui').learnset.shelter = ["9L53"];
		this.modData('Learnsets','sliggoohisui').learnset.bodypress = ["9M"];
		this.modData('Learnsets','sliggoohisui').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','sliggoohisui').learnset.irondefense = ["9M"];
		this.modData('Learnsets','sliggoohisui').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','sliggoohisui').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','sliggoohisui').learnset.blizzard;
		delete this.modData('Learnsets','sliggoohisui').learnset.icebeam;
		// Goodra
		this.modData('Learnsets','goodra').learnset.recover = ["9D"];
		this.modData('Learnsets','goodra').learnset.powerwhip = ["9L55"];
		this.modData('Learnsets','goodra').learnset.outrage = ["9L61", "9M"];
		this.modData('Learnsets','goodra').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','goodra').learnset.blizzard;
		delete this.modData('Learnsets','goodra').learnset.thunder;
		// Goodra Hisui
		this.modData('Learnsets','goodrahisui').learnset.recover = ["9D"];
		this.modData('Learnsets','goodrahisui').learnset.shelter = ["9L55"];
		this.modData('Learnsets','goodrahisui').learnset.outrage = ["9L61", "9M"];
		this.modData('Learnsets','goodrahisui').learnset.bodypress = ["9D"];
		this.modData('Learnsets','goodrahisui').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','goodrahisui').learnset.gyroball = ["9M"];
		this.modData('Learnsets','goodrahisui').learnset.irondefense = ["9M"];
		this.modData('Learnsets','goodrahisui').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','goodrahisui').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','goodrahisui').learnset.blizzard;
		delete this.modData('Learnsets','goodrahisui').learnset.thunder;
		// Klefki
		this.modData('Learnsets','klefki').learnset.sharpen = ["9D"];
		this.modData('Learnsets','klefki').learnset.flash = ["9M"];
		this.modData('Learnsets','klefki').learnset.nastyplot = ["9M"];
		delete this.modData('Learnsets','klefki').learnset.defog;
		// Phantump
		this.modData('Learnsets','phantump').learnset.irondefense = ["9D"];
		this.modData('Learnsets','phantump').learnset.astonish = ["9L1"];
		this.modData('Learnsets','phantump').learnset.tackle = ["9L1"];
		this.modData('Learnsets','phantump').learnset.branchpoke = ["9L5"];
		this.modData('Learnsets','phantump').learnset.leechseed = ["9L8"];
		this.modData('Learnsets','phantump').learnset.confuseray = ["9L13"];
		this.modData('Learnsets','phantump').learnset.willowisp = ["9L19", "9M"];
		this.modData('Learnsets','phantump').learnset.hex = ["9L23", "9M"];
		this.modData('Learnsets','phantump').learnset.terrify = ["9L28"];
		this.modData('Learnsets','phantump').learnset.hornleech = ["9L31"];
		this.modData('Learnsets','phantump').learnset.curse = ["9L35"];
		this.modData('Learnsets','phantump').learnset.phantomforce = ["9L39", "9M"];
		this.modData('Learnsets','phantump').learnset.ingrain = ["9L45"];
		this.modData('Learnsets','phantump').learnset.woodhammer = ["9L49"];
		this.modData('Learnsets','phantump').learnset.destinybond = ["9L54"];
		this.modData('Learnsets','phantump').learnset.forestscurse = ["9L60"];
		this.modData('Learnsets','phantump').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','phantump').learnset.nightmare = ["9M"];
		this.modData('Learnsets','phantump').learnset.growth = ["9E"];
		this.modData('Learnsets','phantump').learnset.worryseed = ["9E"];
		delete this.modData('Learnsets','phantump').learnset.poweruppunch;
		delete this.modData('Learnsets','phantump').learnset.trailhead;
		// Trevenant
		this.modData('Learnsets','trevenant').learnset.naturesmadness = ["9D"];
		this.modData('Learnsets','trevenant').learnset.astonish = ["9L1"];
		this.modData('Learnsets','trevenant').learnset.tackle = ["9L1"];
		this.modData('Learnsets','trevenant').learnset.branchpoke = ["9L5"];
		this.modData('Learnsets','trevenant').learnset.leechseed = ["9L8"];
		this.modData('Learnsets','trevenant').learnset.confuseray = ["9L13"];
		this.modData('Learnsets','trevenant').learnset.willowisp = ["9L19", "9M"];
		this.modData('Learnsets','trevenant').learnset.hex = ["9L23", "9M"];
		this.modData('Learnsets','trevenant').learnset.terrify = ["9L28"];
		this.modData('Learnsets','trevenant').learnset.hornleech = ["9L31"];
		this.modData('Learnsets','trevenant').learnset.curse = ["9L35"];
		this.modData('Learnsets','trevenant').learnset.phantomforce = ["9L39", "9M"];
		this.modData('Learnsets','trevenant').learnset.ingrain = ["9L45"];
		this.modData('Learnsets','trevenant').learnset.woodhammer = ["9L49"];
		this.modData('Learnsets','trevenant').learnset.destinybond = ["9L54"];
		this.modData('Learnsets','trevenant').learnset.forestscurse = ["9L60"];
		this.modData('Learnsets','trevenant').learnset.midnight = ["9T"];
		this.modData('Learnsets','trevenant').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','trevenant').learnset.nightmare = ["9M"];
		this.modData('Learnsets','trevenant').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','trevenant').learnset.growth;
		// Pumpkaboo
		this.modData('Learnsets','pumpkaboo').learnset.magicpowder = ["9D"];
		this.modData('Learnsets','pumpkaboo').learnset.terrify = ["9L4"];
		this.modData('Learnsets','pumpkaboo').learnset.flash = ["9M"];
		this.modData('Learnsets','pumpkaboo').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','pumpkaboo').learnset.nightmare = ["9M"];
		this.modData('Learnsets','pumpkaboo').learnset.imprison = ["9E"];
		this.modData('Learnsets','pumpkaboo').learnset.mysticalfire = ["9E"];
		delete this.modData('Learnsets','pumpkaboo').learnset.scaryface;
		// Gourgeist
		this.modData('Learnsets','gourgeist').learnset.magicpowder = ["9D"];
		this.modData('Learnsets','gourgeist').learnset.terrify = ["9L4"];
		this.modData('Learnsets','gourgeist').learnset.flash = ["9M"];
		this.modData('Learnsets','gourgeist').learnset.midnight = ["9T"];
		this.modData('Learnsets','gourgeist').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','gourgeist').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','gourgeist').learnset.scaryface;
		// Bergmite
		this.modData('Learnsets','bergmite').learnset.surf = ["9D"];
		this.modData('Learnsets','bergmite').learnset.icywind = ["9L6","9M"];
		this.modData('Learnsets','bergmite').learnset.iceball = ["9L12"];
		this.modData('Learnsets','bergmite').learnset.flash = ["9M"];
		this.modData('Learnsets','bergmite').learnset.iciclecrash = ["9E"];
		delete this.modData('Learnsets','bergmite').learnset.powdersnow;
		// Avalugg
		this.modData('Learnsets','avalugg').learnset.surf = ["9D"];
		this.modData('Learnsets','avalugg').learnset.icywind = ["9L6","9M"];
		this.modData('Learnsets','avalugg').learnset.iceball = ["9L12"];
		this.modData('Learnsets','avalugg').learnset.flash = ["9M"];
		delete this.modData('Learnsets','avalugg').learnset.powdersnow;
		// Avalugg Hisui
		this.modData('Learnsets','avalugghisui').learnset.rockclimb = ["9D"];
		this.modData('Learnsets','avalugghisui').learnset.chipaway = ["9M"];
		this.modData('Learnsets','avalugghisui').learnset.icywind = ["9L6","9M"];
		this.modData('Learnsets','avalugghisui').learnset.iceball = ["9L12"];
		delete this.modData('Learnsets','avalugghisui').learnset.meteorbeam;
		delete this.modData('Learnsets','avalugghisui').learnset.powdersnow;
		// Noibat
		this.modData('Learnsets','noibat').learnset.chatter = ["9D"];
		this.modData('Learnsets','noibat').learnset.leechlife = ["9L5"];
		this.modData('Learnsets','noibat').learnset.nightmare = ["9M"];
		this.modData('Learnsets','noibat').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','noibat').learnset.absorb;
		// Noivern
		this.modData('Learnsets','noivern').learnset.chatter = ["9D"];
		this.modData('Learnsets','noivern').learnset.leechlife = ["9L5"];
		this.modData('Learnsets','noivern').learnset.nightmare = ["9M"];
		this.modData('Learnsets','noivern').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','noivern').learnset.absorb;
		// Xerneas
		this.modData('Learnsets','xerneas').learnset.naturesmadness = ["9D"];
		this.modData('Learnsets','xerneas').learnset.aromatherapy = ["9L1"];
		this.modData('Learnsets','xerneas').learnset.ingrain = ["9L1"];
		this.modData('Learnsets','xerneas').learnset.fairywind = ["9L1"];
		this.modData('Learnsets','xerneas').learnset.pounce = ["9L20"];
		this.modData('Learnsets','xerneas').learnset.psychup = ["9L25","9M"];
		this.modData('Learnsets','xerneas').learnset.healpulse = ["9L30"];
		this.modData('Learnsets','xerneas').learnset.dazzlinggleam = ["9L40","9M"];
		this.modData('Learnsets','xerneas').learnset.mistyterrain = ["9L45","9M"];
		this.modData('Learnsets','xerneas').learnset.geomancy = ["9L50"];
		this.modData('Learnsets','xerneas').learnset.takedown = ["9L55"];
		this.modData('Learnsets','xerneas').learnset.megahorn = ["9L65"];
		this.modData('Learnsets','xerneas').learnset.playrough = ["9L70"];
		this.modData('Learnsets','xerneas').learnset.flash = ["9M"];
		this.modData('Learnsets','xerneas').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','xerneas').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','xerneas').learnset.defog;
		delete this.modData('Learnsets','xerneas').learnset.nightslash;
		delete this.modData('Learnsets','xerneas').learnset.tackle;
		// Yveltal
		this.modData('Learnsets','yveltal').learnset.underflame = ["9D"];
		this.modData('Learnsets','yveltal').learnset.phantomforce = ["9L1", "9M"];
		this.modData('Learnsets','yveltal').learnset.ominouswind = ["9L1"];
		this.modData('Learnsets','yveltal').learnset.razorwind = ["9L55"];
		this.modData('Learnsets','yveltal').learnset.fellswoop = ["9L65"];
		this.modData('Learnsets','yveltal').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','yveltal').learnset.dragonrush;
		// Zygarde 50%
		this.modData('Learnsets','zygarde').learnset.equalizer = ["9D"];
		this.modData('Learnsets','zygarde').learnset.bind = ["9L1"];
		this.modData('Learnsets','zygarde').learnset.minimize = ["9L1"];
		this.modData('Learnsets','zygarde').learnset.dragonbreath = ["9L1"];
		this.modData('Learnsets','zygarde').learnset.dig = ["9L1","9M"];
		this.modData('Learnsets','zygarde').learnset.haze = ["9L5"];
		this.modData('Learnsets','zygarde').learnset.bulldoze = ["9L10","9M"];
		this.modData('Learnsets','zygarde').learnset.camouflage = ["9L15"];
		this.modData('Learnsets','zygarde').learnset.slam = ["9L20"];
		this.modData('Learnsets','zygarde').learnset.coil = ["9L25"];
		this.modData('Learnsets','zygarde').learnset.safeguard = ["9L30","9M"];
		this.modData('Learnsets','zygarde').learnset.glare = ["9L35"];
		this.modData('Learnsets','zygarde').learnset.dragonpulse = ["9L40","9M"];
		this.modData('Learnsets','zygarde').learnset.sandstorm = ["9L45","9M"];
		this.modData('Learnsets','zygarde').learnset.landswrath = ["9L50"];
		this.modData('Learnsets','zygarde').learnset.lastresort = ["9L55", "9M"];
		this.modData('Learnsets','zygarde').learnset.dragonrush = ["9L60"];
		this.modData('Learnsets','zygarde').learnset.escapetunnel = ["9L65"];
		this.modData('Learnsets','zygarde').learnset.earthquake = ["9L75","9M"];
		this.modData('Learnsets','zygarde').learnset.outrage = ["9L80","9M"];
		this.modData('Learnsets','zygarde').learnset.thousandwaves = ["9L85"];
		this.modData('Learnsets','zygarde').learnset.thousandarrows = ["9L85"];
		this.modData('Learnsets','zygarde').learnset.coreenforcer = ["9R"];
		this.modData('Learnsets','zygarde').learnset.avalanche = ["9M"];
		this.modData('Learnsets','zygarde').learnset.bodypress = ["9M"];
		this.modData('Learnsets','zygarde').learnset.stasis = ["9T"];
		delete this.modData('Learnsets','zygarde').learnset.bite;
		delete this.modData('Learnsets','zygarde').learnset.crunch;
		delete this.modData('Learnsets','zygarde').learnset.agility;
		delete this.modData('Learnsets','zygarde').learnset.dragondance;
		delete this.modData('Learnsets','zygarde').learnset.extremespeed;
		// Zygarde 10%
		this.modData('Learnsets','zygarde10').learnset.bite = ["9L1"];
		this.modData('Learnsets','zygarde10').learnset.crunch = ["9L20"];
		this.modData('Learnsets','zygarde10').learnset.agility = ["9L25"];
		this.modData('Learnsets','zygarde10').learnset.dragondance = ["9L35"];
		this.modData('Learnsets','zygarde10').learnset.extremespeed = ["9L85"];
		this.modData('Learnsets','zygarde10').learnset.trailhead = ["9M"];
		// Diancie
		this.modData('Learnsets','diancie').learnset.mirrorshot = ["9D"];
		this.modData('Learnsets','diancie').learnset.flash = ["9M"];
		// Hoopa
		this.modData('Learnsets','hoopa').learnset.spiritbreak = ["9D"];
		this.modData('Learnsets','hoopa').learnset.terrify = ["9L1"];
		this.modData('Learnsets','hoopa').learnset.shadowpunch = ["9L15"];
		this.modData('Learnsets','hoopa').learnset.feintattack = ["9L15"];
		this.modData('Learnsets','hoopa').learnset.lightscreen = ["9M"];
		this.modData('Learnsets','hoopa').learnset.nightmare = ["9M"];
		this.modData('Learnsets','hoopa').learnset.poltergeist = ["9M"];
		this.modData('Learnsets','hoopa').learnset.stasis = ["9T"];
		delete this.modData('Learnsets','hoopa').learnset.destinybond;
		// Volcanion
		this.modData('Learnsets','volcanion').learnset.hardpress = ["9D"];
		this.modData('Learnsets','volcanion').learnset.heatcrash = ["9L1"];
		this.modData('Learnsets','volcanion').learnset.heatcrash = ["9L58"];
		this.modData('Learnsets','volcanion').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','volcanion').learnset.flareblitz;
		// Rowlet
		this.modData('Learnsets','rowlet').learnset.aircutter = ["9D"];
		this.modData('Learnsets','rowlet').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','rowlet').learnset.knockoff;
		// Dartrix
		this.modData('Learnsets','dartrix').learnset.aircutter = ["9D"];
		this.modData('Learnsets','dartrix').learnset.naturalgift = ["9M"];
		// Decidueye
		this.modData('Learnsets','decidueye').learnset.fallenarrow = ["9D"];
		this.modData('Learnsets','decidueye').learnset.leafstorm = ["9L66"];
		this.modData('Learnsets','decidueye').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','decidueye').learnset.nightmare = ["9M"];
		this.modData('Learnsets','decidueye').learnset.phantomforce = ["9M"];
		this.modData('Learnsets','decidueye').learnset.retaliate = ["9M"];
		this.modData('Learnsets','decidueye').learnset.uturn = ["9M"];
		delete this.modData('Learnsets','decidueye').learnset.poltergeist;
		// Decidueye Hisui
		this.modData('Learnsets','decidueyehisui').learnset.closecombat = ["9D"];
		this.modData('Learnsets','decidueyehisui').learnset.laserfocus = ["9M"];
		// Litten
		this.modData('Learnsets','litten').learnset.preheat = ["9D"];
		this.modData('Learnsets','litten').learnset.pounce = ["9L16"];
		this.modData('Learnsets','litten').learnset.temperflare = ["9L36"];
		this.modData('Learnsets','litten').learnset.flamethrower = ["9M"];
		this.modData('Learnsets','litten').learnset.flash = ["9M"];
		this.modData('Learnsets','litten').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','litten').learnset.assist = ["9E"];
		delete this.modData('Learnsets','litten').learnset.doublekick;
		delete this.modData('Learnsets','litten').learnset.leechlife;
		delete this.modData('Learnsets','litten').learnset.uturn;
		// Torracat
		this.modData('Learnsets','torracat').learnset.preheat = ["9D"];
		this.modData('Learnsets','torracat').learnset.pounce = ["9L16"];
		this.modData('Learnsets','torracat').learnset.temperflare = ["9L42"];
		this.modData('Learnsets','torracat').learnset.flamethrower = ["9M"];
		this.modData('Learnsets','torracat').learnset.flash = ["9M"];
		this.modData('Learnsets','torracat').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','torracat').learnset.strength = ["9M"];
		delete this.modData('Learnsets','torracat').learnset.doublekick;
		delete this.modData('Learnsets','torracat').learnset.leechlife;
		delete this.modData('Learnsets','torracat').learnset.uturn;
		// Incineroar
		this.modData('Learnsets','incineroar').learnset.heatcrash = ["9D"];
		this.modData('Learnsets','incineroar').learnset.pounce = ["9L16"];
		this.modData('Learnsets','incineroar').learnset.temperflare = ["9L44"];
		this.modData('Learnsets','incineroar').learnset.bulkup = ["9M"];
		this.modData('Learnsets','incineroar').learnset.chipaway = ["9M"];
		this.modData('Learnsets','incineroar').learnset.flamethrower = ["9M"];
		this.modData('Learnsets','incineroar').learnset.flash = ["9M"];
		this.modData('Learnsets','incineroar').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','incineroar').learnset.strength = ["9M"];
		delete this.modData('Learnsets','incineroar').learnset.doublekick;
		delete this.modData('Learnsets','incineroar').learnset.leechlife;
		delete this.modData('Learnsets','incineroar').learnset.uturn;
		// Popplio
		this.modData('Learnsets','popplio').learnset.spotlight = ["9D"];
		this.modData('Learnsets','popplio').learnset.alluringvoice = ["9L36"];
		this.modData('Learnsets','popplio').learnset.flash = ["9M"];
		this.modData('Learnsets','popplio').learnset.lifedew = ["9E"];
		delete this.modData('Learnsets','popplio').learnset.moonblast;
		delete this.modData('Learnsets','popplio').learnset.mistyterrain;
		// Brionne
		this.modData('Learnsets','brionne').learnset.spotlight = ["9D"];
		this.modData('Learnsets','brionne').learnset.alluringvoice = ["9L42"];
		this.modData('Learnsets','brionne').learnset.flash = ["9M"];
		delete this.modData('Learnsets','brionne').learnset.moonblast;
		delete this.modData('Learnsets','brionne').learnset.mistyterrain;
		// Primarina
		this.modData('Learnsets','primarina').learnset.spotlight = ["9D"];
		this.modData('Learnsets','primarina').learnset.drainingkiss = ["9L1"];
		this.modData('Learnsets','primarina').learnset.alluringvoice = ["9L44"];
		this.modData('Learnsets','primarina').learnset.moonblast = ["9L66"];
		this.modData('Learnsets','primarina').learnset.flash = ["9M"];
		// Pikipek
		this.modData('Learnsets','pikipek').learnset.barrage = ["9D"];
		// Trumbeak
		this.modData('Learnsets','trumbeak').learnset.barrage = ["9D"];
		// Toucannon
		this.modData('Learnsets','toucannon').learnset.barrage = ["9D"];
		this.modData('Learnsets','toucannon').learnset.flash = ["9M"];
		this.modData('Learnsets','toucannon').learnset.hurricane = ["9M"];
		// Yungoos
		this.modData('Learnsets','yungoos').learnset.rage = ["9D"];
		this.modData('Learnsets','yungoos').learnset.assurance = ["9M"];
		this.modData('Learnsets','yungoos').learnset.chipaway = ["9M"];
		this.modData('Learnsets','yungoos').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','yungoos').learnset.retaliate = ["9M"];
		this.modData('Learnsets','yungoos').learnset.screech = ["9M"];
		this.modData('Learnsets','yungoos').learnset.strength = ["9M"];
		delete this.modData('Learnsets','yungoos').learnset.earthquake;
		// Gumshoos
		this.modData('Learnsets','gumshoos').learnset.nastyplot = ["9D"];
		this.modData('Learnsets','gumshoos').learnset.assurance = ["9M"];
		this.modData('Learnsets','gumshoos').learnset.chipaway = ["9M"];
		this.modData('Learnsets','gumshoos').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','gumshoos').learnset.retaliate = ["9M"];
		this.modData('Learnsets','gumshoos').learnset.screech = ["9M"];
		this.modData('Learnsets','gumshoos').learnset.strength = ["9M"];
		delete this.modData('Learnsets','gumshoos').learnset.earthquake;
		// Grubbin
		this.modData('Learnsets','grubbin').learnset.strugglebug = ["9D"];
		this.modData('Learnsets','grubbin').learnset.thunderfang = ["9L22"];
		delete this.modData('Learnsets','grubbin').learnset.crunch;
		// Charjabug
		this.modData('Learnsets','charjabug').learnset.particleslam = ["9D"];
		this.modData('Learnsets','charjabug').learnset.thunderfang = ["9L22"];
		this.modData('Learnsets','charjabug').learnset.flash = ["9M"];
		delete this.modData('Learnsets','charjabug').learnset.crunch;
		// Vikavolt
		this.modData('Learnsets','vikavolt').learnset.particleslam = ["9D"];
		this.modData('Learnsets','vikavolt').learnset.thunderfang = ["9L22"];
		this.modData('Learnsets','vikavolt').learnset.flash = ["9M"];
		delete this.modData('Learnsets','vikavolt').learnset.crunch;
		// Crabrawler
		this.modData('Learnsets','crabrawler').learnset.counter = ["9D"];
		this.modData('Learnsets','crabrawler').learnset.chipaway = ["9M"];
		this.modData('Learnsets','crabrawler').learnset.strength = ["9M"];
		this.modData('Learnsets','crabrawler').learnset.hammerarm = ["9E"];
		// Crabominable
		this.modData('Learnsets','crabominable').learnset.thrash = ["9D"];
		this.modData('Learnsets','crabominable').learnset.rockclimb = ["9L17"];
		this.modData('Learnsets','crabominable').learnset.bodypress = ["9M"];
		this.modData('Learnsets','crabominable').learnset.chipaway = ["9M"];
		this.modData('Learnsets','crabominable').learnset.strength = ["9M"];
		delete this.modData('Learnsets','crabominable').learnset.bubblebeam;
		// Oricorio Pom-Pom
		this.modData('Learnsets','oricoriopompom').learnset.boltbeak = ["9D"];
		// Oricorio Pau
		this.modData('Learnsets','oricoriopau').learnset.stasis = ["9D"];
		// Oricorio Baile
		this.modData('Learnsets','oricorio').learnset.fierydance = ["9D"];
		this.modData('Learnsets','oricorio').learnset.flash = ["9M"];
		delete this.modData('Learnsets','oricorio').learnset.quash;
		// Oricorio Sensu
		this.modData('Learnsets','oricoriosensu').learnset.midnight = ["9D"];
		// Cutiefly
		this.modData('Learnsets','cutiefly').learnset.mindreader = ["9D"];
		this.modData('Learnsets','cutiefly').learnset.bugcloud = ["9L1"];
		this.modData('Learnsets','cutiefly').learnset.flash = ["9M"];
		this.modData('Learnsets','cutiefly').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','cutiefly').learnset.stringshot = ["9M"];
		delete this.modData('Learnsets','cutiefly').learnset.absorb;
		// Ribombee
		this.modData('Learnsets','ribombee').learnset.mindreader = ["9D"];
		this.modData('Learnsets','ribombee').learnset.bugcloud = ["9L1"];
		this.modData('Learnsets','ribombee').learnset.flash = ["9M"];
		this.modData('Learnsets','ribombee').learnset.metronome = ["9M"];
		this.modData('Learnsets','ribombee').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','ribombee').learnset.stringshot = ["9M"];
		delete this.modData('Learnsets','ribombee').learnset.absorb;
		// Rockruff
		this.modData('Learnsets','rockruff').learnset.playnice = ["9D"];
		this.modData('Learnsets','rockruff').learnset.stoneedge = ["9M"];
		this.modData('Learnsets','rockruff').learnset.charm = ["9M"];
		delete this.modData('Learnsets','rockruff').learnset.tantrum;
		// Lycanroc Midday
		this.modData('Learnsets','lycanroc').learnset.morningsun = ["9D"];
		this.modData('Learnsets','lycanroc').learnset.roar = ["9L27","9M"];
		this.modData('Learnsets','lycanroc').learnset.stealthrock = ["9L31","9M"];
		this.modData('Learnsets','lycanroc').learnset.rockslide = ["9L37","9M"];
		this.modData('Learnsets','lycanroc').learnset.scaryface = ["9L41"];
		this.modData('Learnsets','lycanroc').learnset.crunch = ["9L45"];
		this.modData('Learnsets','lycanroc').learnset.rockclimb = ["9L51"];
		this.modData('Learnsets','lycanroc').learnset.stoneaxe = ["9L55"];
		this.modData('Learnsets','lycanroc').learnset.stoneedge = ["9M"];
		this.modData('Learnsets','lycanroc').learnset.aquatail = ["9M"];
		this.modData('Learnsets','lycanroc').learnset.flash = ["9M"];
		this.modData('Learnsets','lycanroc').learnset.retaliate = ["9M"];
		// Lycanroc Midnight
		this.modData('Learnsets','lycanrocmidnight').learnset.moonlight = ["9D"];
		this.modData('Learnsets','lycanrocmidnight').learnset.roar = ["9L27","9M"];
		this.modData('Learnsets','lycanrocmidnight').learnset.stealthrock = ["9L31","9M"];
		this.modData('Learnsets','lycanrocmidnight').learnset.rockslide = ["9L37","9M"];
		this.modData('Learnsets','lycanrocmidnight').learnset.scaryface = ["9L41"];
		this.modData('Learnsets','lycanrocmidnight').learnset.crunch = ["9L45"];
		this.modData('Learnsets','lycanrocmidnight').learnset.rockclimb = ["9L51"];
		this.modData('Learnsets','lycanrocmidnight').learnset.stoneaxe = ["9L55"];
		this.modData('Learnsets','lycanrocmidnight').learnset.stoneedge = ["9M"];
		this.modData('Learnsets','lycanrocmidnight').learnset.assurance = ["9M"];
		this.modData('Learnsets','lycanrocmidnight').learnset.avalanche = ["9M"];
		this.modData('Learnsets','lycanrocmidnight').learnset.strength = ["9M"];
		// Lycanroc Twilight
		this.modData('Learnsets','lycanroctwilight').learnset.wish = ["9D"];
		this.modData('Learnsets','lycanroctwilight').learnset.crushclaw = ["9L0"];
		this.modData('Learnsets','lycanroctwilight').learnset.roar = ["9L27","9M"];
		this.modData('Learnsets','lycanroctwilight').learnset.stealthrock = ["9L31","9M"];
		this.modData('Learnsets','lycanroctwilight').learnset.rockslide = ["9L37","9M"];
		this.modData('Learnsets','lycanroctwilight').learnset.scaryface = ["9L41"];
		this.modData('Learnsets','lycanroctwilight').learnset.crunch = ["9L45"];
		this.modData('Learnsets','lycanroctwilight').learnset.rockclimb = ["9L51"];
		this.modData('Learnsets','lycanroctwilight').learnset.stoneaxe = ["9L55"];
		this.modData('Learnsets','lycanroctwilight').learnset.stoneedge = ["9M"];
		this.modData('Learnsets','lycanroctwilight').learnset.aquatail = ["9M"];
		this.modData('Learnsets','lycanroctwilight').learnset.avalanche = ["9M"];
		this.modData('Learnsets','lycanroctwilight').learnset.assurance = ["9M"];
		this.modData('Learnsets','lycanroctwilight').learnset.strength = ["9M"];
		delete this.modData('Learnsets','lycanroctwilight').learnset.thrash;
		// Wishiwashi
		this.modData('Learnsets','wishiwashi').learnset.memento = ["9D"];
		this.modData('Learnsets','wishiwashi').learnset.chillywater = ["9M"];
		this.modData('Learnsets','wishiwashi').learnset.flash = ["9M"];
		// Mareanie
		this.modData('Learnsets','mareanie').learnset.lashout = ["9D"];
		this.modData('Learnsets','mareanie').learnset.toxic = ["9L21","9M"];
		// Toxapex
		this.modData('Learnsets','toxapex').learnset.lashout = ["9D"];
		this.modData('Learnsets','toxapex').learnset.toxic = ["9L21","9M"];
		// Mudbray
		this.modData('Learnsets','mudbray').learnset.slackoff = ["9D"];
		this.modData('Learnsets','mudbray').learnset.tussle = ["9E"];
		// Mudsdale
		this.modData('Learnsets','mudsdale').learnset.slackoff = ["9D"];
		// Dewpider
		this.modData('Learnsets','dewpider').learnset.acidarmor = ["9D"];
		this.modData('Learnsets','dewpider').learnset.leechlife = ["9L13"];
		this.modData('Learnsets','dewpider').learnset.bugbite = ["9L21","9M"];
		this.modData('Learnsets','dewpider').learnset.vitaldrain = ["9L29","9M"];
		this.modData('Learnsets','dewpider').learnset.dive = ["9L32","9M"];
		this.modData('Learnsets','dewpider').learnset.chillywater = ["9M"];
		this.modData('Learnsets','dewpider').learnset.stringshot = ["9M"];
		delete this.modData('Learnsets','dewpider').learnset.bite;
		// Araquanid
		this.modData('Learnsets','araquanid').learnset.acidarmor = ["9D"];
		this.modData('Learnsets','araquanid').learnset.leechlife = ["9L13"];
		this.modData('Learnsets','araquanid').learnset.bugbite = ["9L21","9M"];
		this.modData('Learnsets','araquanid').learnset.vitaldrain = ["9L33","9M"];
		this.modData('Learnsets','araquanid').learnset.dive = ["9L38","9M"];
		this.modData('Learnsets','araquanid').learnset.chillywater = ["9M"];
		this.modData('Learnsets','araquanid').learnset.stringshot = ["9M"];
		delete this.modData('Learnsets','araquanid').learnset.bite;
		// Fomantis
		this.modData('Learnsets','fomantis').learnset.copycat = ["9D"];
		this.modData('Learnsets','fomantis').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','fomantis').learnset.retaliate = ["9M"];
		this.modData('Learnsets','fomantis').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','fomantis').learnset.leechlife;
		delete this.modData('Learnsets','fomantis').learnset.defog;
		// Lurantis
		this.modData('Learnsets','lurantis').learnset.copycat = ["9D"];
		this.modData('Learnsets','lurantis').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','lurantis').learnset.retaliate = ["9M"];
		this.modData('Learnsets','lurantis').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','lurantis').learnset.leechlife;
		// Morelull
		this.modData('Learnsets','morelull').learnset.magicpowder = ["9D"];
		this.modData('Learnsets','morelull').learnset.flash = ["9L1", "9M"];
		this.modData('Learnsets','morelull').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','morelull').learnset.nightmare = ["9M"];
		// Shiinotic
		this.modData('Learnsets','shiinotic').learnset.magicpowder = ["9D"];
		this.modData('Learnsets','shiinotic').learnset.flash = ["9L1", "9M"];
		this.modData('Learnsets','shiinotic').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','shiinotic').learnset.nightmare = ["9M"];
		// Salandit
		this.modData('Learnsets','salandit').learnset.firelash = ["9D"];
		this.modData('Learnsets','salandit').learnset.toxic = ["9L29","9M"];
		this.modData('Learnsets','salandit').learnset.flash = ["9M"];
		delete this.modData('Learnsets','salandit').learnset.leechlife;
		// Salazzle
		this.modData('Learnsets','salazzle').learnset.firelash = ["9D"];
		this.modData('Learnsets','salazzle').learnset.toxic = ["9L29","9M"];
		this.modData('Learnsets','salazzle').learnset.flash = ["9M"];
		delete this.modData('Learnsets','salazzle').learnset.leechlife;
		// Stufful
		this.modData('Learnsets','stufful').learnset.focuspunch = ["9D"];
		this.modData('Learnsets','stufful').learnset.megapunch = ["9E"];
		delete this.modData('Learnsets','stufful').learnset.earthquake;
		// Bewear
		this.modData('Learnsets','bewear').learnset.focuspunch = ["9D"];
		// Bounsweet
		this.modData('Learnsets','bounsweet').learnset.followme = ["9D"];
		this.modData('Learnsets','bounsweet').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','bounsweet').learnset.bounce;
		// Steenee
		this.modData('Learnsets','steenee').learnset.followme = ["9D"];
		this.modData('Learnsets','steenee').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','steenee').learnset.bounce;
		// Tsareena
		this.modData('Learnsets','tsareena').learnset.followme = ["9D"];
		this.modData('Learnsets','tsareena').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','tsareena').learnset.bounce;
		// Comfey
		this.modData('Learnsets','comfey').learnset.aromaticmist = ["9D"];
		delete this.modData('Learnsets','comfey').learnset.defog;
		// Oranguru
		this.modData('Learnsets','oranguru').learnset.aerate = ["9D"];
		this.modData('Learnsets','oranguru').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','oranguru').learnset.thunder;
		// Passimian
		this.modData('Learnsets','passimian').learnset.barrage = ["9D"];
		this.modData('Learnsets','passimian').learnset.courtchange = ["9E"];
		this.modData('Learnsets','passimian').learnset.strength = ["9M"];
		// Wimpod
		this.modData('Learnsets','wimpod').learnset.holdback = ["9D"];
		this.modData('Learnsets','wimpod').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','wimpod').learnset.leechlife;
		// Golisopod
		this.modData('Learnsets','golisopod').learnset.holdback = ["9D"];
		this.modData('Learnsets','golisopod').learnset.chillywater = ["9M"];
		this.modData('Learnsets','golisopod').learnset.strength = ["9M"];
		this.modData('Learnsets','golisopod').learnset.trailhead = ["9M"];
		this.modData('Learnsets','golisopod').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','golisopod').learnset.leechlife;
		// Sandygast
		this.modData('Learnsets','sandygast').learnset.imprison = ["9D"];
		this.modData('Learnsets','sandygast').learnset.sandblast = ["9L45"];
		this.modData('Learnsets','sandygast').learnset.earthpower = ["9M"];
		this.modData('Learnsets','sandygast').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','sandygast').learnset.stoneedge;
		// Palossand
		this.modData('Learnsets','palossand').learnset.imprison = ["9D"];
		this.modData('Learnsets','palossand').learnset.sandblast = ["9L47"];
		this.modData('Learnsets','palossand').learnset.earthpower = ["9M"];
		this.modData('Learnsets','palossand').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','palossand').learnset.stoneedge;
		// Pyukumuku
		this.modData('Learnsets','pyukumuku').learnset.slipaway = ["9D"];
		this.modData('Learnsets','pyukumuku').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','pyukumuku').learnset.quash;
		// Type: Null
		this.modData('Learnsets','typenull').learnset.trumpcard = ["9D"];
		this.modData('Learnsets','typenull').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','typenull').learnset.retaliate = ["9M"];
		this.modData('Learnsets','typenull').learnset.strength = ["9M"];
		delete this.modData('Learnsets','typenull').learnset.uturn;
		// Silvally
		this.modData('Learnsets','silvally').learnset.trumpcard = ["9D"];
		this.modData('Learnsets','silvally').learnset.flash = ["9M"];
		this.modData('Learnsets','silvally').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','silvally').learnset.retaliate = ["9M"];
		this.modData('Learnsets','silvally').learnset.strength = ["9M"];
		delete this.modData('Learnsets','silvally').learnset.firepledge;
		delete this.modData('Learnsets','silvally').learnset.grasspledge;
		delete this.modData('Learnsets','silvally').learnset.uturn;
		delete this.modData('Learnsets','silvally').learnset.waterpledge;
		// Minior
		this.modData('Learnsets','minior').learnset.accelerock = ["9D"];
		this.modData('Learnsets','minior').learnset.flash = ["9M"];
		this.modData('Learnsets','minior').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','minior').learnset.meteorbeam = ["9T"];
		delete this.modData('Learnsets','minior').learnset.attract;
		// Komala
		this.modData('Learnsets','komala').learnset.playdead = ["9D"];
		this.modData('Learnsets','komala').learnset.amnesia = ["9M"];
		delete this.modData('Learnsets','komala').learnset.quash;
		// Turtonator
		this.modData('Learnsets','turtonator').learnset.blastburn = ["9D"];
		this.modData('Learnsets','turtonator').learnset.flash = ["9M"];
		this.modData('Learnsets','turtonator').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','turtonator').learnset.rockslide = ["9M"];
		this.modData('Learnsets','turtonator').learnset.strength = ["9M"];
		this.modData('Learnsets','turtonator').learnset.rapidspin = ["9E"];
		this.modData('Learnsets','turtonator').learnset.temperflare = ["9E"];
		// Togedemaru
		this.modData('Learnsets','togedemaru').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','togedemaru').learnset.nuzzle = ["9L1"];
		this.modData('Learnsets','togedemaru').learnset.pinmissile = ["9L21"];
		this.modData('Learnsets','togedemaru').learnset.zingzap = ["9L29"];
		this.modData('Learnsets','togedemaru').learnset.magnetbomb = ["9L33"];
		this.modData('Learnsets','togedemaru').learnset.wildcharge = ["9L37", "9M"];
		this.modData('Learnsets','togedemaru').learnset.electricterrain = ["9L41", "9M"];
		this.modData('Learnsets','togedemaru').learnset.particleslam = ["9L45"];
		this.modData('Learnsets','togedemaru').learnset.flash = ["9M"];
		delete this.modData('Learnsets','togedemaru').learnset.bounce;
		delete this.modData('Learnsets','togedemaru').learnset.discharge;
		delete this.modData('Learnsets','togedemaru').learnset.thundershock;
		// Mimikyu
		this.modData('Learnsets','mimikyu').learnset.woodhammer = ["9D"];
		this.modData('Learnsets','mimikyu').learnset.swing = ["9L1"];
		delete this.modData('Learnsets','mimikyu').learnset.thunder;
		// Bruxish
		this.modData('Learnsets','bruxish').learnset.hypnosis = ["9D"];
		this.modData('Learnsets','bruxish').learnset.whitewater = ["9L1"];
		this.modData('Learnsets','bruxish').learnset.mindbend = ["9L9"];
		this.modData('Learnsets','bruxish').learnset.wavecrash = ["9L49"];
		this.modData('Learnsets','bruxish').learnset.brine = ["9M"];
		this.modData('Learnsets','bruxish').learnset.flash = ["9M"];
		this.modData('Learnsets','bruxish').learnset.futuresight = ["9M"];
		this.modData('Learnsets','bruxish').learnset.nightmare = ["9M"];
		this.modData('Learnsets','bruxish').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','bruxish').learnset.confusion;
		delete this.modData('Learnsets','bruxish').learnset.watergun;
		// Drampa
		this.modData('Learnsets','drampa').learnset.rage = ["9D"];
		this.modData('Learnsets','drampa').learnset.aerate = ["9E"];
		this.modData('Learnsets','drampa').learnset.fellswoop = ["9E"];
		this.modData('Learnsets','drampa').learnset.strength = ["9M"];
		// Dhelmise
		this.modData('Learnsets','dhelmise').learnset.wringout = ["9D"];
		this.modData('Learnsets','dhelmise').learnset.chillywater = ["9M"];
		this.modData('Learnsets','dhelmise').learnset.nightmare = ["9M"];
		this.modData('Learnsets','dhelmise').learnset.strength = ["9M"];
		delete this.modData('Learnsets','dhelmise').learnset.attract;
		// Jangmo-o
		this.modData('Learnsets','jangmoo').learnset.metalsound = ["9D"];
		this.modData('Learnsets','jangmoo').learnset.flash = ["9M"];
		this.modData('Learnsets','jangmoo').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','jangmoo').learnset.strength = ["9M"];
		this.modData('Learnsets','jangmoo').learnset.trailhead = ["9M"];
		this.modData('Learnsets','jangmoo').learnset.rockclimb = ["9E"];
		delete this.modData('Learnsets','jangmoo').learnset.earthquake;
		// Hakamo-o
		this.modData('Learnsets','hakamoo').learnset.dizzypunch = ["9D"];
		this.modData('Learnsets','hakamoo').learnset.flash = ["9M"];
		this.modData('Learnsets','hakamoo').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','hakamoo').learnset.retaliate = ["9M"];
		this.modData('Learnsets','hakamoo').learnset.strength = ["9M"];
		this.modData('Learnsets','hakamoo').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','hakamoo').learnset.earthquake;
		// Kommo-o
		this.modData('Learnsets','kommoo').learnset.dizzypunch = ["9D"];
		this.modData('Learnsets','kommoo').learnset.warriorssoul = ["9L75"];
		this.modData('Learnsets','kommoo').learnset.closecombat = ["9L83"];
		this.modData('Learnsets','kommoo').learnset.flash = ["9M"];
		this.modData('Learnsets','kommoo').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','kommoo').learnset.retaliate = ["9M"];
		this.modData('Learnsets','kommoo').learnset.strength = ["9M"];
		this.modData('Learnsets','kommoo').learnset.trailhead = ["9M"];
		// Tapu Koko
		this.modData('Learnsets','tapukoko').learnset.aeroblast = ["9D"];
		this.modData('Learnsets','tapukoko').learnset.electricterrain = ["9L1", "9M"];
		this.modData('Learnsets','tapukoko').learnset.holdback = ["9L15"];
		this.modData('Learnsets','tapukoko').learnset.mirrormove = ["9L25"];
		this.modData('Learnsets','tapukoko').learnset.pluck = ["9L40"];
		this.modData('Learnsets','tapukoko').learnset.spiritbreak = ["9L60"];
		this.modData('Learnsets','tapukoko').learnset.powerswap = ["9L65"];
		this.modData('Learnsets','tapukoko').learnset.particleslam = ["9L70"];
		this.modData('Learnsets','tapukoko').learnset.bravebird = ["9L75"];
		this.modData('Learnsets','tapukoko').learnset.flash = ["9M"];
		this.modData('Learnsets','tapukoko').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','tapukoko').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','tapukoko').learnset.retaliate = ["9M"];
		this.modData('Learnsets','tapukoko').learnset.strength = ["9M"];
		// Tapu Lele
		this.modData('Learnsets','tapulele').learnset.lunardance = ["9D"];
		this.modData('Learnsets','tapulele').learnset.psychicterrain = ["9L1", "9M"];
		this.modData('Learnsets','tapulele').learnset.drainingkiss = ["9L10"];
		this.modData('Learnsets','tapulele').learnset.sweetscent = ["9L15"];
		this.modData('Learnsets','tapulele').learnset.tickle = ["9L35"];
		this.modData('Learnsets','tapulele').learnset.aromatherapy = ["9L40"];
		this.modData('Learnsets','tapulele').learnset.guardswap = ["9L65"];
		this.modData('Learnsets','tapulele').learnset.extrasensory = ["9L70"];
		this.modData('Learnsets','tapulele').learnset.pollenpuff = ["9L75"];
		this.modData('Learnsets','tapulele').learnset.flash = ["9M"];
		this.modData('Learnsets','tapulele').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','tapulele').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','tapulele').learnset.nightmare = ["9M"];
		this.modData('Learnsets','tapulele').learnset.retaliate = ["9M"];
		delete this.modData('Learnsets','tapulele').learnset.extrasensory;
		// Tapu Bulu
		this.modData('Learnsets','tapubulu').learnset.landswrath = ["9D"];
		this.modData('Learnsets','tapubulu').learnset.grassyterrain = ["9L1", "9M"];
		this.modData('Learnsets','tapubulu').learnset.hornattack = ["9L1"];
		this.modData('Learnsets','tapubulu').learnset.branchpoke = ["9L1"];
		this.modData('Learnsets','tapubulu').learnset.pounce = ["9L10"];
		this.modData('Learnsets','tapubulu').learnset.razorleaf = ["9L20"];
		this.modData('Learnsets','tapubulu').learnset.rototiller = ["9L30"];
		this.modData('Learnsets','tapubulu').learnset.highhorsepower = ["9L40"];
		this.modData('Learnsets','tapubulu').learnset.hornleech = ["9L45"];
		this.modData('Learnsets','tapubulu').learnset.playrough = ["9L60"];
		this.modData('Learnsets','tapubulu').learnset.skullbash = ["9L65"];
		this.modData('Learnsets','tapubulu').learnset.woodhammer = ["9L70"];
		this.modData('Learnsets','tapubulu').learnset.megahorn = ["9L75"];
		this.modData('Learnsets','tapubulu').learnset.avalanche = ["9M"];
		this.modData('Learnsets','tapubulu').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','tapubulu').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','tapubulu').learnset.retaliate = ["9M"];
		this.modData('Learnsets','tapubulu').learnset.strength = ["9M"];
		this.modData('Learnsets','tapubulu').learnset.trailhead = ["9M"];
		// Tapu Fini
		this.modData('Learnsets','tapufini').learnset.originpulse = ["9D"];
		this.modData('Learnsets','tapufini').learnset.mistyterrain = ["9L1", "9M"];
		this.modData('Learnsets','tapufini').learnset.mist = ["9L1"];
		this.modData('Learnsets','tapufini').learnset.disarmingvoice = ["9L10"];
		this.modData('Learnsets','tapufini').learnset.haze = ["9L25"];
		this.modData('Learnsets','tapufini').learnset.clamp = ["9L40"];
		this.modData('Learnsets','tapufini').learnset.brine = ["9L45"];
		this.modData('Learnsets','tapufini').learnset.strangesmoke = ["9L60"];
		this.modData('Learnsets','tapufini').learnset.soak = ["9L65"];
		this.modData('Learnsets','tapufini').learnset.hydropump = ["9L70"];
		this.modData('Learnsets','tapufini').learnset.muddywater = ["9L75"];
		this.modData('Learnsets','tapufini').learnset.chillywater = ["9M"];
		this.modData('Learnsets','tapufini').learnset.dive = ["9M"];
		this.modData('Learnsets','tapufini').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','tapufini').learnset.futuresight = ["9M"];
		this.modData('Learnsets','tapufini').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','tapufini').learnset.nightmare = ["9M"];
		this.modData('Learnsets','tapufini').learnset.retaliate = ["9M"];
		delete this.modData('Learnsets','tapufini').learnset.knockoff;
		delete this.modData('Learnsets','tapufini').learnset.moonblast;
		// Solgaleo
		this.modData('Learnsets','solgaleo').learnset.miracleeye = ["9D"];
		this.modData('Learnsets','solgaleo').learnset.mindbend = ["9L1"];
		this.modData('Learnsets','solgaleo').learnset.metalclaw = ["9L7"];
		this.modData('Learnsets','solgaleo').learnset.ironhead = ["9L23", "9M"];
		this.modData('Learnsets','solgaleo').learnset.flash = ["9M"];
		this.modData('Learnsets','solgaleo').learnset.flashcannon = ["9M"];
		this.modData('Learnsets','solgaleo').learnset.nightmare = ["9M"];
		this.modData('Learnsets','solgaleo').learnset.strength = ["9M"];
		this.modData('Learnsets','solgaleo').learnset.trailhead = ["9M"];
		// Lunala
		this.modData('Learnsets','lunala').learnset.miracleeye = ["9D"];
		this.modData('Learnsets','lunala').learnset.psychic = ["9L19", "9M"];
		this.modData('Learnsets','lunala').learnset.doubleteam = ["9L59"];
		this.modData('Learnsets','lunala').learnset.dreameater = ["9L61", "9M"];
		this.modData('Learnsets','lunala').learnset.flash = ["9M"];
		this.modData('Learnsets','lunala').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','lunala').learnset.airslash;
		// Nihilego
		this.modData('Learnsets','nihilego').learnset.acidarmor = ["9D"];
		this.modData('Learnsets','nihilego').learnset.bind = ["9L1"];
		this.modData('Learnsets','nihilego').learnset.dive = ["9M"];
		this.modData('Learnsets','nihilego').learnset.flash = ["9M"];
		this.modData('Learnsets','nihilego').learnset.meteorbeam = ["9M"];
		this.modData('Learnsets','nihilego').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','nihilego').learnset.pound;
		// Buzzwole
		this.modData('Learnsets','buzzwole').learnset.skyuppercut = ["9D"];
		this.modData('Learnsets','buzzwole').learnset.vitaldrain = ["9L29", "9M"];
		this.modData('Learnsets','buzzwole').learnset.bodypress = ["9M"];
		this.modData('Learnsets','buzzwole').learnset.strength = ["9M"];
		this.modData('Learnsets','buzzwole').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','buzzwole').learnset.leechlife;
		// Pheromosa
		this.modData('Learnsets','pheromosa').learnset.playdead = ["9D"];
		this.modData('Learnsets','pheromosa').learnset.faketears = ["9M"];
		this.modData('Learnsets','pheromosa').learnset.trailhead = ["9M"];
		// Xurkitree
		this.modData('Learnsets','xurkitree').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','xurkitree').learnset.flash = ["9M"];
		// Celesteela
		this.modData('Learnsets','celesteela').learnset.heatcrash = ["9D"];
		this.modData('Learnsets','celesteela').learnset.bash = ["9L1"];
		this.modData('Learnsets','celesteela').learnset.hardpress = ["9L73"];
		this.modData('Learnsets','celesteela').learnset.bodypress = ["9M"];
		this.modData('Learnsets','celesteela').learnset.flash = ["9M"];
		delete this.modData('Learnsets','celesteela').learnset.tackle;
		delete this.modData('Learnsets','celesteela').learnset.doubleedge;
		// Kartana
		this.modData('Learnsets','kartana').learnset.sharpen = ["9D"];
		this.modData('Learnsets','kartana').learnset.metaledge = ["9L1"];
		this.modData('Learnsets','kartana').learnset.retaliate = ["9M"];
		delete this.modData('Learnsets','kartana').learnset.defog;
		delete this.modData('Learnsets','kartana').learnset.knockoff;
		// Guzzlord
		this.modData('Learnsets','guzzlord').learnset.dragonbreath = ["9D"];
		this.modData('Learnsets','guzzlord').learnset.avalanche = ["9M"];
		this.modData('Learnsets','guzzlord').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','guzzlord').learnset.compensation = ["9M"];
		this.modData('Learnsets','guzzlord').learnset.hex = ["9M"];
		this.modData('Learnsets','guzzlord').learnset.nightmare = ["9M"];
		this.modData('Learnsets','guzzlord').learnset.strength = ["9M"];
		// Necrozma
		this.modData('Learnsets','necrozma').learnset.midnight = ["9D"];
		this.modData('Learnsets','necrozma').learnset.mindbend = ["9L1"];
		this.modData('Learnsets','necrozma').learnset.rockblast = ["9L7"];
		this.modData('Learnsets','necrozma').learnset.stealthrock = ["9L13", "9M"];
		this.modData('Learnsets','necrozma').learnset.barrierbash = ["9L19"];
		this.modData('Learnsets','necrozma').learnset.storedpower = ["9L23"];
		this.modData('Learnsets','necrozma').learnset.psychocut = ["9L37"];
		this.modData('Learnsets','necrozma').learnset.autotomize = ["9L43"];
		this.modData('Learnsets','necrozma').learnset.powergem = ["9L47", "9M"];
		this.modData('Learnsets','necrozma').learnset.photongeyser = ["9L53"];
		this.modData('Learnsets','necrozma').learnset.flash = ["9M"];
		this.modData('Learnsets','necrozma').learnset.nightmare = ["9M"];
		this.modData('Learnsets','necrozma').learnset.painsplit = ["9M"];
		delete this.modData('Learnsets','necrozma').learnset.nightslash;
		delete this.modData('Learnsets','necrozma').learnset.slash;
		// Necrozma Dusk Mane
		this.modData('Learnsets','necrozmaduskmane').learnset.flareblitz = ["9D"];
		this.modData('Learnsets','necrozmaduskmane').learnset.mindbend = ["9L1"];
		this.modData('Learnsets','necrozmaduskmane').learnset.rockblast = ["9L7"];
		this.modData('Learnsets','necrozmaduskmane').learnset.stealthrock = ["9L13", "9M"];
		this.modData('Learnsets','necrozmaduskmane').learnset.psychocut = ["9L19"];
		this.modData('Learnsets','necrozmaduskmane').learnset.storedpower = ["9L23"];
		this.modData('Learnsets','necrozmaduskmane').learnset.nightslash = ["9L23"];
		this.modData('Learnsets','necrozmaduskmane').learnset.autotomize = ["9L43"];
		this.modData('Learnsets','necrozmaduskmane').learnset.powergem = ["9L47"];
		this.modData('Learnsets','necrozmaduskmane').learnset.photongeyser = ["9L53"];
		this.modData('Learnsets','necrozmaduskmane').learnset.flash = ["9M"];
		this.modData('Learnsets','necrozmaduskmane').learnset.nightmare = ["9M"];
		this.modData('Learnsets','necrozmaduskmane').learnset.painsplit = ["9M"];
		this.modData('Learnsets','necrozmaduskmane').learnset.strength = ["9M"];
		this.modData('Learnsets','necrozmaduskmane').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','necrozmaduskmane').learnset.slash;
		// Necrozma Dawn Wings
		this.modData('Learnsets','necrozmadawnwings').learnset.moonblast = ["9D"];
		this.modData('Learnsets','necrozmadawnwings').learnset.mindbend = ["9L1"];
		this.modData('Learnsets','necrozmadawnwings').learnset.rockblast = ["9L7"];
		this.modData('Learnsets','necrozmadawnwings').learnset.stealthrock = ["9L13", "9M"];
		this.modData('Learnsets','necrozmadawnwings').learnset.psychocut = ["9L19"];
		this.modData('Learnsets','necrozmadawnwings').learnset.storedpower = ["9L23"];
		this.modData('Learnsets','necrozmadawnwings').learnset.nightslash = ["9L23"];
		this.modData('Learnsets','necrozmadawnwings').learnset.autotomize = ["9L43"];
		this.modData('Learnsets','necrozmadawnwings').learnset.powergem = ["9L47"];
		this.modData('Learnsets','necrozmadawnwings').learnset.photongeyser = ["9L53"];
		this.modData('Learnsets','necrozmadawnwings').learnset.flash = ["9M"];
		this.modData('Learnsets','necrozmadawnwings').learnset.nightmare = ["9M"];
		this.modData('Learnsets','necrozmadawnwings').learnset.painsplit = ["9M"];
		delete this.modData('Learnsets','necrozmadawnwings').learnset.slash;
		// Magearna
		this.modData('Learnsets','magearna').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','magearna').learnset.chillywater = ["9M"];
		this.modData('Learnsets','magearna').learnset.flash = ["9M"];
		// Magearna Original
		this.modData('Learnsets','magearnaoriginal').learnset = this.modData('Learnsets','magearna').learnset;
		// Marshadow
		this.modData('Learnsets','marshadow').learnset.mimic = ["9D"];
		this.modData('Learnsets','marshadow').learnset.strength = ["9M"];
		// Poipole
		this.modData('Learnsets','poipole').learnset.toxicthread = ["9D"];
		this.modData('Learnsets','poipole').learnset.toxic = ["9L41","9M"];
		this.modData('Learnsets','poipole').learnset.nightmare = ["9M"];
		// Naganadel
		this.modData('Learnsets','naganadel').learnset.toxicthread = ["9D"];
		this.modData('Learnsets','naganadel').learnset.toxic = ["9L41","9M"];
		this.modData('Learnsets','naganadel').learnset.nightmare = ["9M"];
		// Stakataka
		this.modData('Learnsets','stakataka').learnset.minimize = ["9D"];
		this.modData('Learnsets','stakataka').learnset.bash = ["9L1"];
		this.modData('Learnsets','stakataka').learnset.strength = ["9M"];
		delete this.modData('Learnsets','stakataka').learnset.tackle;
		// Blacephalon
		this.modData('Learnsets','blacephalon').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','blacephalon').learnset.flash = ["9M"];
		this.modData('Learnsets','blacephalon').learnset.metronome = ["9M"];
		this.modData('Learnsets','blacephalon').learnset.nightmare = ["9M"];
		delete this.modData('Learnsets','blacephalon').learnset.quash;
		// Zeraora
		this.modData('Learnsets','zeraora').learnset.aurasphere = ["9D"];
		this.modData('Learnsets','zeraora').learnset.particleslam = ["9L72"];
		this.modData('Learnsets','zeraora').learnset.flash = ["9M"];
		this.modData('Learnsets','zeraora').learnset.retaliate = ["9M"];
		this.modData('Learnsets','zeraora').learnset.strength = ["9M"];
		this.modData('Learnsets','zeraora').learnset.trailhead = ["9M"];
		this.modData('Learnsets','zeraora').learnset.wildcharge = ["9M"];
		// Meltan
		this.modData('Learnsets','meltan').learnset.charge = ["9D"];
		this.modData('Learnsets','meltan').learnset.bash = ["9L8"];
		this.modData('Learnsets','meltan').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','meltan').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','meltan').learnset.flash = ["9M"];
		this.modData('Learnsets','meltan').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','meltan').learnset.recycle = ["9M"];
		this.modData('Learnsets','meltan').learnset.shockwave = ["9M"];
		delete this.modData('Learnsets','meltan').learnset.tailwhip;
		// Melmetal
		this.modData('Learnsets','melmetal').learnset.charge = ["9D"];
		this.modData('Learnsets','melmetal').learnset.bash = ["9L8"];
		this.modData('Learnsets','melmetal').learnset.avalanche = ["9M"];
		this.modData('Learnsets','melmetal').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','melmetal').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','melmetal').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','melmetal').learnset.flash = ["9M"];
		this.modData('Learnsets','melmetal').learnset.gravity = ["9M"];
		this.modData('Learnsets','melmetal').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','melmetal').learnset.recycle = ["9M"];
		this.modData('Learnsets','melmetal').learnset.shockwave = ["9M"];
		this.modData('Learnsets','melmetal').learnset.strength = ["9M"];
		delete this.modData('Learnsets','melmetal').learnset.tailwhip;
		// Grookey
		this.modData('Learnsets','grookey').learnset.dizzypunch = ["9D"];
		this.modData('Learnsets','grookey').learnset.chipaway = ["9M"];
		this.modData('Learnsets','grookey').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','grookey').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','grookey').learnset.naturepower = ["9M"];
		this.modData('Learnsets','grookey').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','grookey').learnset.strength = ["9M"];
		// Thwackey
		this.modData('Learnsets','thwackey').learnset.dizzypunch = ["9D"];
		this.modData('Learnsets','thwackey').learnset.chipaway = ["9M"];
		this.modData('Learnsets','thwackey').learnset.dualchop = ["9M"];
		this.modData('Learnsets','thwackey').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','thwackey').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','thwackey').learnset.naturepower = ["9M"];
		this.modData('Learnsets','thwackey').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','thwackey').learnset.strength = ["9M"];
		// Rillaboom
		this.modData('Learnsets','rillaboom').learnset.ivycudgel = ["9D"];
		this.modData('Learnsets','rillaboom').learnset.chipaway = ["9M"];
		this.modData('Learnsets','rillaboom').learnset.dualchop = ["9M"];
		this.modData('Learnsets','rillaboom').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','rillaboom').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','rillaboom').learnset.naturepower = ["9M"];
		this.modData('Learnsets','rillaboom').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','rillaboom').learnset.strength = ["9M"];
		// Scorbunny
		this.modData('Learnsets','scorbunny').learnset.detect = ["9D"];
		this.modData('Learnsets','scorbunny').learnset.afteryou = ["9M"];
		this.modData('Learnsets','scorbunny').learnset.blazekick = ["9E"];
		this.modData('Learnsets','scorbunny').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','scorbunny').learnset.endeavor = ["9M"];
		this.modData('Learnsets','scorbunny').learnset.incinerate = ["9M"];
		this.modData('Learnsets','scorbunny').learnset.lastresort = ["9M"];
		this.modData('Learnsets','scorbunny').learnset.naturepower = ["9M"];
		this.modData('Learnsets','scorbunny').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','scorbunny').learnset.roleplay = ["9M"];
		// Raboot
		this.modData('Learnsets','raboot').learnset.detect = ["9D"];
		this.modData('Learnsets','raboot').learnset.afteryou = ["9M"];
		this.modData('Learnsets','raboot').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','raboot').learnset.endeavor = ["9M"];
		this.modData('Learnsets','raboot').learnset.incinerate = ["9M"];
		this.modData('Learnsets','raboot').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','raboot').learnset.lastresort = ["9M"];
		this.modData('Learnsets','raboot').learnset.naturepower = ["9M"];
		this.modData('Learnsets','raboot').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','raboot').learnset.roleplay = ["9M"];
		// Cinderace
		this.modData('Learnsets','cinderace').learnset.detect = ["9D"];
		this.modData('Learnsets','cinderace').learnset.afteryou = ["9M"];
		this.modData('Learnsets','cinderace').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','cinderace').learnset.endeavor = ["9M"];
		this.modData('Learnsets','cinderace').learnset.incinerate = ["9M"];
		this.modData('Learnsets','cinderace').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','cinderace').learnset.lastresort = ["9M"];
		this.modData('Learnsets','cinderace').learnset.naturepower = ["9M"];
		this.modData('Learnsets','cinderace').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','cinderace').learnset.roleplay = ["9M"];
		// Sobble
		this.modData('Learnsets','sobble').learnset.flail = ["9D"];
		this.modData('Learnsets','sobble').learnset.aquatail = ["9L28", "9M"];
		this.modData('Learnsets','sobble').learnset.chillywater = ["9M"];
		this.modData('Learnsets','sobble').learnset.dragontail = ["9M"];
		this.modData('Learnsets','sobble').learnset.faketears = ["9M"];
		this.modData('Learnsets','sobble').learnset.lastresort = ["9M"];
		this.modData('Learnsets','sobble').learnset.waterpulse = ["9M"];
		this.modData('Learnsets','sobble').learnset.trumpcard = ["9E"];
		delete this.modData('Learnsets','sobble').learnset.fellstinger;
		delete this.modData('Learnsets','sobble').learnset.liquidation;
		// Drizzile
		this.modData('Learnsets','drizzile').learnset.watershuriken = ["9D"];
		this.modData('Learnsets','drizzile').learnset.aquatail = ["9L36", "9M"];
		this.modData('Learnsets','drizzile').learnset.ambush = ["9L54"];
		this.modData('Learnsets','drizzile').learnset.chillywater = ["9M"];
		this.modData('Learnsets','drizzile').learnset.dragontail = ["9M"];
		this.modData('Learnsets','drizzile').learnset.faketears = ["9M"];
		this.modData('Learnsets','drizzile').learnset.lastresort = ["9M"];
		this.modData('Learnsets','drizzile').learnset.recycle = ["9M"];
		this.modData('Learnsets','drizzile').learnset.roleplay = ["9M"];
		this.modData('Learnsets','drizzile').learnset.snatch = ["9M"];
		this.modData('Learnsets','drizzile').learnset.stringshot = ["9M"];
		this.modData('Learnsets','drizzile').learnset.waterpulse = ["9M"];
		delete this.modData('Learnsets','drizzile').learnset.liquidation;
		// Inteleon
		this.modData('Learnsets','inteleon').learnset.watershuriken = ["9D"];
		this.modData('Learnsets','inteleon').learnset.aquatail = ["9L38", "9M"];
		this.modData('Learnsets','inteleon').learnset.ambush = ["9L62"];
		this.modData('Learnsets','inteleon').learnset.chillywater = ["9M"];
		this.modData('Learnsets','inteleon').learnset.chipaway = ["9M"];
		this.modData('Learnsets','inteleon').learnset.dragontail = ["9M"];
		this.modData('Learnsets','inteleon').learnset.faketears = ["9M"];
		this.modData('Learnsets','inteleon').learnset.hydropump = ["9M"];
		this.modData('Learnsets','inteleon').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','inteleon').learnset.lastresort = ["9M"];
		this.modData('Learnsets','inteleon').learnset.recycle = ["9M"];
		this.modData('Learnsets','inteleon').learnset.roleplay = ["9M"];
		this.modData('Learnsets','inteleon').learnset.snatch = ["9M"];
		this.modData('Learnsets','inteleon').learnset.stringshot = ["9M"];
		this.modData('Learnsets','inteleon').learnset.waterpulse = ["9M"];
		delete this.modData('Learnsets','inteleon').learnset.liquidation;
		delete this.modData('Learnsets','inteleon').learnset.metronome;
		// Skwovet
		this.modData('Learnsets','skwovet').learnset.bide = ["9D"];
		this.modData('Learnsets','skwovet').learnset.aquatail = ["9M"];
		this.modData('Learnsets','skwovet').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','skwovet').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','skwovet').learnset.recycle = ["9M"];
		this.modData('Learnsets','skwovet').learnset.snatch = ["9M"];
		this.modData('Learnsets','skwovet').learnset.strength = ["9M"];
		// Greedent
		this.modData('Learnsets','greedent').learnset.bide = ["9D"];
		this.modData('Learnsets','greedent').learnset.aquatail = ["9M"];
		this.modData('Learnsets','greedent').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','greedent').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','greedent').learnset.recycle = ["9M"];
		this.modData('Learnsets','greedent').learnset.snatch = ["9M"];
		this.modData('Learnsets','greedent').learnset.strength = ["9M"];
		delete this.modData('Learnsets','greedent').learnset.earthquake;
		// Rookidee
		this.modData('Learnsets','rookidee').learnset.detect = ["9D"];
		this.modData('Learnsets','rookidee').learnset.aerialace = ["9M"];
		this.modData('Learnsets','rookidee').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','rookidee').learnset.tailwind = ["9M"];
		// Corvisquire
		this.modData('Learnsets','corvisquire').learnset.detect = ["9D"];
		this.modData('Learnsets','corvisquire').learnset.aerialace = ["9M"];
		this.modData('Learnsets','corvisquire').learnset.chipaway = ["9M"];
		this.modData('Learnsets','corvisquire').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','corvisquire').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','corvisquire').learnset.tailwind = ["9M"];
		// Corviknight
		this.modData('Learnsets','corviknight').learnset.detect = ["9D"];
		this.modData('Learnsets','corviknight').learnset.skydrop = ["9L1"];
		this.modData('Learnsets','corviknight').learnset.aerialace = ["9M"];
		this.modData('Learnsets','corviknight').learnset.chipaway = ["9M"];
		this.modData('Learnsets','corviknight').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','corviknight').learnset.flash = ["9M"];
		this.modData('Learnsets','corviknight').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','corviknight').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','corviknight').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','corviknight').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','corviknight').learnset.nightmare = ["9M"];
		this.modData('Learnsets','corviknight').learnset.painsplit = ["9M"];
		this.modData('Learnsets','corviknight').learnset.quash = ["9M"];
		this.modData('Learnsets','corviknight').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','corviknight').learnset.tailwind = ["9M"];
		// Dottler
		this.modData('Learnsets','dottler').learnset.mindreader = ["9D"];
		this.modData('Learnsets','dottler').learnset.bugbite = ["9M"];
		this.modData('Learnsets','dottler').learnset.flash = ["9M"];
		this.modData('Learnsets','dottler').learnset.gravity = ["9M"];
		this.modData('Learnsets','dottler').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','dottler').learnset.psychup = ["9M"];
		this.modData('Learnsets','dottler').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','dottler').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','dottler').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','dottler').learnset.leechlife;
		// Orbeetle
		this.modData('Learnsets','orbeetle').learnset.skydrop = ["9D"];
		this.modData('Learnsets','orbeetle').learnset.bugbite = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.dreameater = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.flash = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.gravity = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.nightmare = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.psychup = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.roleplay = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','orbeetle').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','orbeetle').learnset.leechlife;
		// Nickit
		this.modData('Learnsets','nickit').learnset.stockpile = ["9D"];
		this.modData('Learnsets','nickit').learnset.odorsleuth = ["9L1"];
		this.modData('Learnsets','nickit').learnset.feintattack = ["9L16"];
		this.modData('Learnsets','nickit').learnset.aerialace = ["9M"];
		this.modData('Learnsets','nickit').learnset.aquatail = ["9M"];
		this.modData('Learnsets','nickit').learnset.assurance = ["9M"];
		this.modData('Learnsets','nickit').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','nickit').learnset.embargo = ["9M"];
		this.modData('Learnsets','nickit').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','nickit').learnset.psychup = ["9M"];
		this.modData('Learnsets','nickit').learnset.snatch = ["9M"];
		this.modData('Learnsets','nickit').learnset.spite = ["9M"];
		this.modData('Learnsets','nickit').learnset.trailhead = ["9M"];
		// Thievul
		this.modData('Learnsets','thievul').learnset.stockpile = ["9D"];
		this.modData('Learnsets','thievul').learnset.odorsleuth = ["9L1"];
		this.modData('Learnsets','thievul').learnset.feintattack = ["9L16"];
		this.modData('Learnsets','thievul').learnset.aerialace = ["9M"];
		this.modData('Learnsets','thievul').learnset.aquatail = ["9M"];
		this.modData('Learnsets','thievul').learnset.assurance = ["9M"];
		this.modData('Learnsets','thievul').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','thievul').learnset.embargo = ["9M"];
		this.modData('Learnsets','thievul').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','thievul').learnset.odorsleuth = ["9M"];
		this.modData('Learnsets','thievul').learnset.psychup = ["9M"];
		this.modData('Learnsets','thievul').learnset.snatch = ["9M"];
		this.modData('Learnsets','thievul').learnset.spite = ["9M"];
		this.modData('Learnsets','thievul').learnset.trailhead = ["9M"];
		// Gossifleur
		this.modData('Learnsets','gossifleur').learnset.grasswhistle = ["9D"];
		this.modData('Learnsets','gossifleur').learnset.afteryou = ["9M"];
		this.modData('Learnsets','gossifleur').learnset.flash = ["9M"];
		this.modData('Learnsets','gossifleur').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','gossifleur').learnset.naturepower = ["9M"];
		this.modData('Learnsets','gossifleur').learnset.roleplay = ["9M"];
		this.modData('Learnsets','gossifleur').learnset.trailhead = ["9M"];
		// Eldegoss
		this.modData('Learnsets','eldegoss').learnset.seedflare = ["9D"];
		this.modData('Learnsets','eldegoss').learnset.afteryou = ["9M"];
		this.modData('Learnsets','eldegoss').learnset.flash = ["9M"];
		this.modData('Learnsets','eldegoss').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','eldegoss').learnset.naturepower = ["9M"];
		this.modData('Learnsets','eldegoss').learnset.roleplay = ["9M"];
		this.modData('Learnsets','eldegoss').learnset.trailhead = ["9M"];
		// Wooloo
		this.modData('Learnsets','wooloo').learnset.magnetbomb = ["9D"];
		this.modData('Learnsets','wooloo').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','wooloo').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','wooloo').learnset.trailhead = ["9M"];
		// Dubwool
		this.modData('Learnsets','dubwool').learnset.magnetbomb = ["9D"];
		this.modData('Learnsets','dubwool').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','dubwool').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','dubwool').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','dubwool').learnset.trailhead = ["9M"];
		// Chewtle
		this.modData('Learnsets','chewtle').learnset.fakeout = ["9D"];
		this.modData('Learnsets','chewtle').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','chewtle').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','chewtle').learnset.strength = ["9M"];
		this.modData('Learnsets','chewtle').learnset.superfang = ["9M"];
		this.modData('Learnsets','chewtle').learnset.waterpulse = ["9M"];
		delete this.modData('Learnsets','chewtle').learnset.dragontail;
		delete this.modData('Learnsets','chewtle').learnset.waterfall;
		// Drednaw
		this.modData('Learnsets','drednaw').learnset.fakeout = ["9D"];
		this.modData('Learnsets','drednaw').learnset.aquatail = ["9M"];
		this.modData('Learnsets','drednaw').learnset.chipaway = ["9M"];
		this.modData('Learnsets','drednaw').learnset.dragontail = ["9M"];
		this.modData('Learnsets','drednaw').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','drednaw').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','drednaw').learnset.strength = ["9M"];
		this.modData('Learnsets','drednaw').learnset.superfang = ["9M"];
		this.modData('Learnsets','drednaw').learnset.waterpulse = ["9M"];
		delete this.modData('Learnsets','drednaw').learnset.meteorbeam;
		delete this.modData('Learnsets','drednaw').learnset.waterfall;
		// Yamper
		this.modData('Learnsets','yamper').learnset.nuzzle = ["9D"];
		this.modData('Learnsets','yamper').learnset.thundershock = ["9L5"];
		this.modData('Learnsets','yamper').learnset.thunderfang = ["9L30"];
		this.modData('Learnsets','yamper').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','yamper').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','yamper').learnset.endeavor = ["9M"];
		this.modData('Learnsets','yamper').learnset.flash = ["9M"];
		this.modData('Learnsets','yamper').learnset.healbell = ["9M"];
		this.modData('Learnsets','yamper').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','yamper').learnset.recycle = ["9M"];
		this.modData('Learnsets','yamper').learnset.shockwave = ["9M"];
		this.modData('Learnsets','yamper').learnset.snatch = ["9M"];
		this.modData('Learnsets','yamper').learnset.trailhead = ["9M"];
		this.modData('Learnsets','yamper').learnset.particleslam = ["9E"];
		delete this.modData('Learnsets','yamper').learnset.crunch;
		// Boltund
		this.modData('Learnsets','boltund').learnset.nuzzle = ["9D"];
		this.modData('Learnsets','boltund').learnset.thundershock = ["9L5"];
		this.modData('Learnsets','boltund').learnset.thunderfang = ["9L34"];
		this.modData('Learnsets','boltund').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','boltund').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','boltund').learnset.endeavor = ["9M"];
		this.modData('Learnsets','boltund').learnset.flash = ["9M"];
		this.modData('Learnsets','boltund').learnset.healbell = ["9M"];
		this.modData('Learnsets','boltund').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','boltund').learnset.recycle = ["9M"];
		this.modData('Learnsets','boltund').learnset.shockwave = ["9M"];
		this.modData('Learnsets','boltund').learnset.snatch = ["9M"];
		this.modData('Learnsets','boltund').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','boltund').learnset.crunch;
		// Rolycoly
		this.modData('Learnsets','rolycoly').learnset.accelerock = ["9D"];
		this.modData('Learnsets','rolycoly').learnset.explosion = ["9M"];
		this.modData('Learnsets','rolycoly').learnset.flash = ["9M"];
		this.modData('Learnsets','rolycoly').learnset.spite = ["9M"];
		this.modData('Learnsets','rolycoly').learnset.selfdestruct = ["9E"];
		this.modData('Learnsets','rolycoly').learnset.temperflare = ["9E"];
		delete this.modData('Learnsets','rolycoly').learnset.meteorbeam;
		// Carkol
		this.modData('Learnsets','carkol').learnset.accelerock = ["9D"];
		this.modData('Learnsets','carkol').learnset.explosion = ["9M"];
		this.modData('Learnsets','carkol').learnset.flash = ["9M"];
		this.modData('Learnsets','carkol').learnset.spite = ["9M"];
		delete this.modData('Learnsets','carkol').learnset.meteorbeam;
		// Coalossal
		this.modData('Learnsets','coalossal').learnset.moltenslag = ["9D"];
		this.modData('Learnsets','coalossal').learnset.explosion = ["9M"];
		this.modData('Learnsets','coalossal').learnset.flash = ["9M"];
		this.modData('Learnsets','coalossal').learnset.spite = ["9M"];
		delete this.modData('Learnsets','coalossal').learnset.meteorbeam;
		// Flapple
		this.modData('Learnsets','flapple').learnset.uproar = ["9D"];
		this.modData('Learnsets','flapple').learnset.applebomb = ["9L28"];
		this.modData('Learnsets','flapple').learnset.fly = ["9L32", "9M"];
		this.modData('Learnsets','flapple').learnset.dragonpulse = ["9L40", "9M"];
		this.modData('Learnsets','flapple').learnset.aerialace = ["9M"];
		this.modData('Learnsets','flapple').learnset.bodypress = ["9M"];
		this.modData('Learnsets','flapple').learnset.bugbite = ["9M"];
		this.modData('Learnsets','flapple').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','flapple').learnset.infestation = ["9M"];
		this.modData('Learnsets','flapple').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','flapple').learnset.naturepower = ["9M"];
		this.modData('Learnsets','flapple').learnset.psychup = ["9M"];
		this.modData('Learnsets','flapple').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','flapple').learnset.roleplay = ["9M"];
		this.modData('Learnsets','flapple').learnset.roost = ["9M"];
		this.modData('Learnsets','flapple').learnset.synthesis = ["9M"];
		this.modData('Learnsets','flapple').learnset.worryseed = ["9M"];
		// Appletun
		this.modData('Learnsets','appletun').learnset.yawn = ["9D"];
		this.modData('Learnsets','appletun').learnset.applebomb = ["9L28"];
		this.modData('Learnsets','appletun').learnset.bugbite = ["9M"];
		this.modData('Learnsets','appletun').learnset.dragontail = ["9M"];
		this.modData('Learnsets','appletun').learnset.infestation = ["9M"];
		this.modData('Learnsets','appletun').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','appletun').learnset.naturepower = ["9M"];
		this.modData('Learnsets','appletun').learnset.psychup = ["9M"];
		this.modData('Learnsets','appletun').learnset.roleplay = ["9M"];
		this.modData('Learnsets','appletun').learnset.strength = ["9M"];
		this.modData('Learnsets','appletun').learnset.synthesis = ["9M"];
		this.modData('Learnsets','appletun').learnset.worryseed = ["9M"];
		// Silicobra
		this.modData('Learnsets','silicobra').learnset.rototiller = ["9D"];
		this.modData('Learnsets','silicobra').learnset.constrict = ["9L1"];
		this.modData('Learnsets','silicobra').learnset.sandattack = ["9L5"];
		this.modData('Learnsets','silicobra').learnset.bind = ["9L9"];
		this.modData('Learnsets','silicobra').learnset.minimize = ["9L13"];
		this.modData('Learnsets','silicobra').learnset.brutalswing = ["9L17"];
		this.modData('Learnsets','silicobra').learnset.headbutt = ["9L21"];
		this.modData('Learnsets','silicobra').learnset.glare = ["9L25"];
		this.modData('Learnsets','silicobra').learnset.sandtomb = ["9L29"];
		this.modData('Learnsets','silicobra').learnset.dig = ["9L33"];
		this.modData('Learnsets','silicobra').learnset.sandstorm = ["9L37"];
		this.modData('Learnsets','silicobra').learnset.slam = ["9L41"];
		this.modData('Learnsets','silicobra').learnset.coil = ["9L45"];
		this.modData('Learnsets','silicobra').learnset.sandblast = ["9L49"];
		this.modData('Learnsets','silicobra').learnset.wringout = ["9L53"];
		this.modData('Learnsets','silicobra').learnset.dustspray = ["9E"];
		this.modData('Learnsets','silicobra').learnset.aquatail = ["9M"];
		this.modData('Learnsets','silicobra').learnset.dragontail = ["9M"];
		delete this.modData('Learnsets','silicobra').learnset.stoneedge;
		// Sandaconda
		this.modData('Learnsets','sandaconda').learnset.rototiller = ["9D"];
		this.modData('Learnsets','sandaconda').learnset.constrict = ["9L1"];
		this.modData('Learnsets','sandaconda').learnset.sandattack = ["9L5"];
		this.modData('Learnsets','sandaconda').learnset.bind = ["9L9"];
		this.modData('Learnsets','sandaconda').learnset.minimize = ["9L13"];
		this.modData('Learnsets','sandaconda').learnset.brutalswing = ["9L17"];
		this.modData('Learnsets','sandaconda').learnset.headbutt = ["9L21"];
		this.modData('Learnsets','sandaconda').learnset.glare = ["9L25"];
		this.modData('Learnsets','sandaconda').learnset.sandtomb = ["9L29"];
		this.modData('Learnsets','sandaconda').learnset.dig = ["9L33"];
		this.modData('Learnsets','sandaconda').learnset.sandstorm = ["9L39"];
		this.modData('Learnsets','sandaconda').learnset.slam = ["9L45"];
		this.modData('Learnsets','sandaconda').learnset.coil = ["9L51"];
		this.modData('Learnsets','sandaconda').learnset.sandblast = ["9L57"];
		this.modData('Learnsets','sandaconda').learnset.wringout = ["9L63"];
		this.modData('Learnsets','sandaconda').learnset.aquatail = ["9M"];
		this.modData('Learnsets','sandaconda').learnset.dragontail = ["9M"];
		this.modData('Learnsets','sandaconda').learnset.strength = ["9M"];
		delete this.modData('Learnsets','sandaconda').learnset.stoneedge;
		// Cramorant
		this.modData('Learnsets','cramorant').learnset.eggbomb = ["9D"];
		this.modData('Learnsets','cramorant').learnset.block = ["9M"];
		this.modData('Learnsets','cramorant').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','cramorant').learnset.tailwind = ["9M"];
		this.modData('Learnsets','cramorant').learnset.waterpulse = ["9M"];
		this.modData('Learnsets','cramorant').learnset.iceball = ["9E"];
		// Arrokuda
		this.modData('Learnsets','arrokuda').learnset.skullbash = ["9D"];
		this.modData('Learnsets','arrokuda').learnset.wavecrash = ["9L42"];
		this.modData('Learnsets','arrokuda').learnset.aquatail = ["9M"];
		this.modData('Learnsets','arrokuda').learnset.endeavor = ["9M"];
		this.modData('Learnsets','arrokuda').learnset.waterpulse = ["9M"];
		delete this.modData('Learnsets','arrokuda').learnset.liquidation;
		// Barraskewda
		this.modData('Learnsets','barraskewda').learnset.skullbash = ["9D"];
		this.modData('Learnsets','barraskewda').learnset.wavecrash = ["9L48"];
		this.modData('Learnsets','barraskewda').learnset.aquatail = ["9M"];
		this.modData('Learnsets','barraskewda').learnset.endeavor = ["9M"];
		this.modData('Learnsets','barraskewda').learnset.waterpulse = ["9M"];
		delete this.modData('Learnsets','barraskewda').learnset.liquidation;
		// Toxel
		this.modData('Learnsets','toxel').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','toxel').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','toxel').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','toxel').learnset.flash = ["9M"];
		this.modData('Learnsets','toxel').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','toxel').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','toxel').learnset.shockwave = ["9M"];
		// Toxtricity Amped
		this.modData('Learnsets','toxtricity').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','toxtricity').learnset.toxic = ["9L32","9M"];
		this.modData('Learnsets','toxtricity').learnset.magneticflux = ["9L54"];
		this.modData('Learnsets','toxtricity').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','toxtricity').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','toxtricity').learnset.flash = ["9M"];
		this.modData('Learnsets','toxtricity').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','toxtricity').learnset.gravity = ["9M"];
		this.modData('Learnsets','toxtricity').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','toxtricity').learnset.painsplit = ["9M"];
		this.modData('Learnsets','toxtricity').learnset.psychup = ["9M"];
		this.modData('Learnsets','toxtricity').learnset.shockwave = ["9M"];
		this.modData('Learnsets','toxtricity').learnset.signalbeam = ["9M"];
		delete this.modData('Learnsets','toxtricity').learnset.metronome;
		delete this.modData('Learnsets','toxtricity').learnset.shiftgear;
		// Toxtricity Low Key
		this.modData('Learnsets','toxtricitylowkey').learnset.paraboliccharge = ["9D"];
		this.modData('Learnsets','toxtricitylowkey').learnset.toxic = ["9L32","9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.flash = ["9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.gravity = ["9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.painsplit = ["9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.psychup = ["9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.shockwave = ["9M"];
		this.modData('Learnsets','toxtricitylowkey').learnset.signalbeam = ["9M"];
		delete this.modData('Learnsets','toxtricitylowkey').learnset.metronome;
		// Sizzlipede
		this.modData('Learnsets','sizzlipede').learnset.coil = ["9D"];
		this.modData('Learnsets','sizzlipede').learnset.preheat = ["9L25"];
		this.modData('Learnsets','sizzlipede').learnset.bugbite = ["9M"];
		this.modData('Learnsets','sizzlipede').learnset.flamecharge = ["9M"];
		this.modData('Learnsets','sizzlipede').learnset.flash = ["9M"];
		this.modData('Learnsets','sizzlipede').learnset.incinerate = ["9M"];
		this.modData('Learnsets','sizzlipede').learnset.infestation = ["9M"];
		this.modData('Learnsets','sizzlipede').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','sizzlipede').learnset.knockoff;
		delete this.modData('Learnsets','sizzlipede').learnset.leechlife;
		// Centiskorch
		this.modData('Learnsets','centiskorch').learnset.coil = ["9D"];
		this.modData('Learnsets','centiskorch').learnset.preheat = ["9L25"];
		this.modData('Learnsets','centiskorch').learnset.bugbite = ["9M"];
		this.modData('Learnsets','centiskorch').learnset.flamecharge = ["9M"];
		this.modData('Learnsets','centiskorch').learnset.flash = ["9M"];
		this.modData('Learnsets','centiskorch').learnset.incinerate = ["9M"];
		this.modData('Learnsets','centiskorch').learnset.infestation = ["9M"];
		this.modData('Learnsets','centiskorch').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','centiskorch').learnset.knockoff;
		delete this.modData('Learnsets','centiskorch').learnset.leechlife;
		// Clobbopus
		this.modData('Learnsets','clobbopus').learnset.megapunch = ["9D"];
		this.modData('Learnsets','clobbopus').learnset.chillywater = ["9M"];
		this.modData('Learnsets','clobbopus').learnset.knockoff = ["9M"];
		this.modData('Learnsets','clobbopus').learnset.strength = ["9M"];
		this.modData('Learnsets','clobbopus').learnset.octazooka = ["9E"];
		// Grapploct
		this.modData('Learnsets','grapploct').learnset.lashout = ["9D"];
		this.modData('Learnsets','grapploct').learnset.wringout = ["9L50"];
		this.modData('Learnsets','grapploct').learnset.chillywater = ["9M"];
		this.modData('Learnsets','grapploct').learnset.knockoff = ["9M"];
		this.modData('Learnsets','grapploct').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','grapploct').learnset.strength = ["9M"];
		delete this.modData('Learnsets','grapploct').learnset.octazooka;
		delete this.modData('Learnsets','grapploct').learnset.topsyturvy;
		// Sinistea
		this.modData('Learnsets','sinistea').learnset.soak = ["9D"];
		this.modData('Learnsets','sinistea').learnset.aromaticmist = ["9L1"];
		this.modData('Learnsets','sinistea').learnset.absorb = ["9L6"];
		this.modData('Learnsets','sinistea').learnset.protect = ["9L12", "9M"];
		this.modData('Learnsets','sinistea').learnset.suckerpunch = ["9L18"];
		this.modData('Learnsets','sinistea').learnset.megadrain = ["9L24"];
		this.modData('Learnsets','sinistea').learnset.ominouswind = ["9L30"];
		this.modData('Learnsets','sinistea').learnset.aromatherapy = ["9L36"];
		this.modData('Learnsets','sinistea').learnset.gigadrain = ["9L42", "9M"];
		this.modData('Learnsets','sinistea').learnset.embargo = ["9M"];
		this.modData('Learnsets','sinistea').learnset.flash = ["9M"];
		this.modData('Learnsets','sinistea').learnset.gravity = ["9M"];
		this.modData('Learnsets','sinistea').learnset.healbell = ["9M"];
		this.modData('Learnsets','sinistea').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','sinistea').learnset.nightmare = ["9M"];
		this.modData('Learnsets','sinistea').learnset.psychup = ["9M"];
		this.modData('Learnsets','sinistea').learnset.recycle = ["9M"];
		this.modData('Learnsets','sinistea').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','sinistea').learnset.roleplay = ["9M"];
		this.modData('Learnsets','sinistea').learnset.snatch = ["9M"];
		this.modData('Learnsets','sinistea').learnset.telekinesis = ["9M"];
		delete this.modData('Learnsets','sinistea').learnset.metronome;
		// Polteageist
		this.modData('Learnsets','polteageist').learnset.soak = ["9D"];
		this.modData('Learnsets','polteageist').learnset.aromaticmist = ["9L1"];
		this.modData('Learnsets','polteageist').learnset.absorb = ["9L6"];
		this.modData('Learnsets','polteageist').learnset.protect = ["9L12", "9M"];
		this.modData('Learnsets','polteageist').learnset.suckerpunch = ["9L18"];
		this.modData('Learnsets','polteageist').learnset.megadrain = ["9L24"];
		this.modData('Learnsets','polteageist').learnset.ominouswind = ["9L30"];
		this.modData('Learnsets','polteageist').learnset.aromatherapy = ["9L36"];
		this.modData('Learnsets','polteageist').learnset.gigadrain = ["9L42", "9M"];
		this.modData('Learnsets','polteageist').learnset.embargo = ["9M"];
		this.modData('Learnsets','polteageist').learnset.flash = ["9M"];
		this.modData('Learnsets','polteageist').learnset.gravity = ["9M"];
		this.modData('Learnsets','polteageist').learnset.healbell = ["9M"];
		this.modData('Learnsets','polteageist').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','polteageist').learnset.nightmare = ["9M"];
		this.modData('Learnsets','polteageist').learnset.psychup = ["9M"];
		this.modData('Learnsets','polteageist').learnset.recycle = ["9M"];
		this.modData('Learnsets','polteageist').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','polteageist').learnset.roleplay = ["9M"];
		this.modData('Learnsets','polteageist').learnset.snatch = ["9M"];
		this.modData('Learnsets','polteageist').learnset.telekinesis = ["9M"];
		// Hatenna
		this.modData('Learnsets','hatenna').learnset.imprison = ["9D"];
		this.modData('Learnsets','hatenna').learnset.daydream = ["9L5"];
		this.modData('Learnsets','hatenna').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','hatenna').learnset.dreameater = ["9M"];
		this.modData('Learnsets','hatenna').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','hatenna').learnset.flash = ["9M"];
		this.modData('Learnsets','hatenna').learnset.gravity = ["9M"];
		this.modData('Learnsets','hatenna').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','hatenna').learnset.nightmare = ["9M"];
		this.modData('Learnsets','hatenna').learnset.psychup = ["9M"];
		this.modData('Learnsets','hatenna').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','hatenna').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','hatenna').learnset.drainingkiss = ["9E"];
		delete this.modData('Learnsets','hatenna').learnset.lifedew;
		delete this.modData('Learnsets','hatenna').learnset.metronome;
		delete this.modData('Learnsets','hatenna').learnset.nuzzle;
		// Hattrem
		this.modData('Learnsets','hattrem').learnset.imprison = ["9D"];
		this.modData('Learnsets','hattrem').learnset.daydream = ["9L5"];
		this.modData('Learnsets','hattrem').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','hattrem').learnset.dreameater = ["9M"];
		this.modData('Learnsets','hattrem').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','hattrem').learnset.flash = ["9M"];
		this.modData('Learnsets','hattrem').learnset.gravity = ["9M"];
		this.modData('Learnsets','hattrem').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','hattrem').learnset.nightmare = ["9M"];
		this.modData('Learnsets','hattrem').learnset.psychup = ["9M"];
		this.modData('Learnsets','hattrem').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','hattrem').learnset.telekinesis = ["9M"];
		delete this.modData('Learnsets','hattrem').learnset.lifedew;
		// Hatterene
		this.modData('Learnsets','hatterene').learnset.imprison = ["9D"];
		this.modData('Learnsets','hatterene').learnset.daydream = ["9L5"];
		this.modData('Learnsets','hatterene').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','hatterene').learnset.dreameater = ["9M"];
		this.modData('Learnsets','hatterene').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','hatterene').learnset.flash = ["9M"];
		this.modData('Learnsets','hatterene').learnset.gravity = ["9M"];
		this.modData('Learnsets','hatterene').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','hatterene').learnset.nightmare = ["9M"];
		this.modData('Learnsets','hatterene').learnset.psychup = ["9M"];
		this.modData('Learnsets','hatterene').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','hatterene').learnset.telekinesis = ["9M"];
		delete this.modData('Learnsets','hatterene').learnset.lifedew;
		// Impidimp
		this.modData('Learnsets','impidimp').learnset.astonish = ["9D"];
		this.modData('Learnsets','impidimp').learnset.dreameater = ["9M"];
		this.modData('Learnsets','impidimp').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','impidimp').learnset.embargo = ["9M"];
		this.modData('Learnsets','impidimp').learnset.gravity = ["9M"];
		this.modData('Learnsets','impidimp').learnset.homeclaws = ["9M"];
		this.modData('Learnsets','impidimp').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','impidimp').learnset.psychup = ["9M"];
		this.modData('Learnsets','impidimp').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','impidimp').learnset.snatch = ["9M"];
		this.modData('Learnsets','impidimp').learnset.vitaldrain = ["9M"];
		this.modData('Learnsets','impidimp').learnset.partingshot = ["9E"];
		delete this.modData('Learnsets','impidimp').learnset.leechlife;
		// Morgrem
		this.modData('Learnsets','morgrem').learnset.darkestlariat = ["9D"];
		this.modData('Learnsets','morgrem').learnset.dreameater = ["9M"];
		this.modData('Learnsets','morgrem').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','morgrem').learnset.embargo = ["9M"];
		this.modData('Learnsets','morgrem').learnset.gravity = ["9M"];
		this.modData('Learnsets','morgrem').learnset.homeclaws = ["9M"];
		this.modData('Learnsets','morgrem').learnset.lastresort = ["9M"];
		this.modData('Learnsets','morgrem').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','morgrem').learnset.psychup = ["9M"];
		this.modData('Learnsets','morgrem').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','morgrem').learnset.snatch = ["9M"];
		this.modData('Learnsets','morgrem').learnset.strength = ["9M"];
		this.modData('Learnsets','morgrem').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','morgrem').learnset.leechlife;
		// Grimmsnarl
		this.modData('Learnsets','grimmsnarl').learnset.darkestlariat = ["9D"];
		this.modData('Learnsets','grimmsnarl').learnset.dreameater = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.dualchop = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.embargo = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.feintattack = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.gravity = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.homeclaws = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.lastresort = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.psychup = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.snatch = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.strength = ["9M"];
		this.modData('Learnsets','grimmsnarl').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','grimmsnarl').learnset.leechlife;
		// Obstagoon
		this.modData('Learnsets','obstagoon').learnset.throatchop = ["9D"];
		this.modData('Learnsets','obstagoon').learnset.playrough = ["9L1"];
		this.modData('Learnsets','obstagoon').learnset.tussle = ["9L1"];
		this.modData('Learnsets','obstagoon').learnset.terrify = ["9L35"];
		this.modData('Learnsets','obstagoon').learnset.block = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.dualchop = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.embargo = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.lastresort = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.pursuit = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.quash = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.snatch = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.spite = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.strength = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.torment = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.toxic = ["9M"];
		this.modData('Learnsets','obstagoon').learnset.xscissor = ["9M"];
		delete this.modData('Learnsets','obstagoon').learnset.babydolleyes;
		delete this.modData('Learnsets','obstagoon').learnset.pinmissile;
		delete this.modData('Learnsets','obstagoon').learnset.scaryface;
		// Perrserker
		this.modData('Learnsets','perrserker').learnset.mefirst = ["9D"];
		this.modData('Learnsets','perrserker').learnset.metaledge = ["9L69"];
		this.modData('Learnsets','perrserker').learnset.aerialace = ["9M"];
		this.modData('Learnsets','perrserker').learnset.endeavor = ["9M"];
		this.modData('Learnsets','perrserker').learnset.feintattack = ["9M"];
		this.modData('Learnsets','perrserker').learnset.flash = ["9M"];
		this.modData('Learnsets','perrserker').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','perrserker').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','perrserker').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','perrserker').learnset.strength = ["9M"];
		this.modData('Learnsets','perrserker').learnset.xscissor = ["9M"];
		// Cursola
		this.modData('Learnsets','cursola').learnset.withering = ["9D"];
		this.modData('Learnsets','cursola').learnset.dreameater = ["9M"];
		this.modData('Learnsets','cursola').learnset.dustspray = ["9M"];
		this.modData('Learnsets','cursola').learnset.endeavor = ["9M"];
		this.modData('Learnsets','cursola').learnset.explosion = ["9M"];
		this.modData('Learnsets','cursola').learnset.gravity = ["9M"];
		this.modData('Learnsets','cursola').learnset.healblock = ["9M"];
		this.modData('Learnsets','cursola').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','cursola').learnset.nightmare = ["9M"];
		this.modData('Learnsets','cursola').learnset.painsplit = ["9M"];
		this.modData('Learnsets','cursola').learnset.psychup = ["9M"];
		this.modData('Learnsets','cursola').learnset.telekinesis = ["9M"];
		delete this.modData('Learnsets','cursola').learnset.leechlife;
		delete this.modData('Learnsets','cursola').learnset.meteorbeam;
		delete this.modData('Learnsets','cursola').learnset.poltergeist;
		delete this.modData('Learnsets','cursola').learnset.tantrum;
		// Sirfetch'd
		this.modData('Learnsets','sirfetchd').learnset.megahorn = ["9D"];
		this.modData('Learnsets','sirfetchd').learnset.aerialace = ["9M"];
		this.modData('Learnsets','sirfetchd').learnset.afteryou = ["9M"];
		this.modData('Learnsets','sirfetchd').learnset.block = ["9M"];
		this.modData('Learnsets','sirfetchd').learnset.chipaway = ["9M"];
		this.modData('Learnsets','sirfetchd').learnset.compensation = ["9M"];
		this.modData('Learnsets','sirfetchd').learnset.endeavor = ["9M"];
		this.modData('Learnsets','sirfetchd').learnset.fullcollide = ["9M"];
		// Mr. Rime
		this.modData('Learnsets','mrrime').learnset.followme = ["9D"];
		this.modData('Learnsets','mrrime').learnset.wakeupslap = ["9L40"];
		this.modData('Learnsets','mrrime').learnset.afteryou = ["9M"];
		this.modData('Learnsets','mrrime').learnset.auroraveil = ["9M"];
		this.modData('Learnsets','mrrime').learnset.dreameater = ["9M"];
		this.modData('Learnsets','mrrime').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','mrrime').learnset.flash = ["9M"];
		this.modData('Learnsets','mrrime').learnset.gravity = ["9M"];
		this.modData('Learnsets','mrrime').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','mrrime').learnset.nightmare = ["9M"];
		this.modData('Learnsets','mrrime').learnset.psychup = ["9M"];
		this.modData('Learnsets','mrrime').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','mrrime').learnset.spotlight = ["9M"];
		this.modData('Learnsets','mrrime').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','mrrime').learnset.torment = ["9M"];
		delete this.modData('Learnsets','mrrime').learnset.suckerpunch;
		// Runerigus
		this.modData('Learnsets','runerigus').learnset.grudge = ["9D"];
		this.modData('Learnsets','runerigus').learnset.terrify = ["9L0"];
		this.modData('Learnsets','runerigus').learnset.hardpress = ["9L1"];
		this.modData('Learnsets','runerigus').learnset.block = ["9M"];
		this.modData('Learnsets','runerigus').learnset.dragontail = ["9M"];
		this.modData('Learnsets','runerigus').learnset.dualchop = ["9M"];
		this.modData('Learnsets','runerigus').learnset.nightmare = ["9M"];
		this.modData('Learnsets','runerigus').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','runerigus').learnset.roleplay = ["9M"];
		this.modData('Learnsets','runerigus').learnset.strength = ["9M"];
		delete this.modData('Learnsets','runerigus').learnset.scaryface;
		// Milcery
		this.modData('Learnsets','milcery').learnset.milkdrink = ["9D"];
		this.modData('Learnsets','milcery').learnset.flash = ["9M"];
		this.modData('Learnsets','milcery').learnset.magiccoat = ["9M"];
		// Alcremie
		this.modData('Learnsets','alcremie').learnset.milkdrink = ["9D"];
		this.modData('Learnsets','alcremie').learnset.bestow = ["9L0"];
		this.modData('Learnsets','alcremie').learnset.afteryou = ["9M"];
		this.modData('Learnsets','alcremie').learnset.flash = ["9M"];
		this.modData('Learnsets','alcremie').learnset.magiccoat = ["9M"];
		// Falinks
		this.modData('Learnsets','falinks').learnset.beatup = ["9D"];
		this.modData('Learnsets','falinks').learnset.block = ["9M"];
		this.modData('Learnsets','falinks').learnset.endeavor = ["9M"];
		this.modData('Learnsets','falinks').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','falinks').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','falinks').learnset.psychup = ["9M"];
		this.modData('Learnsets','falinks').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','falinks').learnset.strength = ["9M"];
		// Pincurchin
		this.modData('Learnsets','pincurchin').learnset.spikecannon = ["9D"];
		this.modData('Learnsets','pincurchin').learnset.discharge = ["9L45"];
		this.modData('Learnsets','pincurchin').learnset.particleslam = ["9L60"];
		this.modData('Learnsets','pincurchin').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','pincurchin').learnset.flash = ["9M"];
		this.modData('Learnsets','pincurchin').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','pincurchin').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','pincurchin').learnset.poisonjab = ["9M"];
		this.modData('Learnsets','pincurchin').learnset.shockwave = ["9M"];
		this.modData('Learnsets','pincurchin').learnset.barbbarrage = ["9E"];
		this.modData('Learnsets','pincurchin').learnset.spikes = ["9E"];
		this.modData('Learnsets','pincurchin').learnset.toxicspikes = ["9E"];
		// Snom
		this.modData('Learnsets','snom').learnset.irondefense = ["9D"];
		this.modData('Learnsets','snom').learnset.flash = ["9M"];
		this.modData('Learnsets','snom').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','snom').learnset.infestation = ["9M"];
		this.modData('Learnsets','snom').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','snom').learnset.stringshot = ["9M"];
		// Frosmoth
		this.modData('Learnsets','frosmoth').learnset.cottonguard = ["9D"];
		this.modData('Learnsets','frosmoth').learnset.chillywater = ["9M"];
		this.modData('Learnsets','frosmoth').learnset.flash = ["9M"];
		this.modData('Learnsets','frosmoth').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','frosmoth').learnset.infestation = ["9M"];
		this.modData('Learnsets','frosmoth').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','frosmoth').learnset.roost = ["9M"];
		this.modData('Learnsets','frosmoth').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','frosmoth').learnset.stringshot = ["9M"];
		this.modData('Learnsets','frosmoth').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','frosmoth').learnset.leechlife;
		// Stonjourner
		this.modData('Learnsets','stonjourner').learnset.morningsun = ["9D"];
		this.modData('Learnsets','stonjourner').learnset.embargo = ["9M"];
		this.modData('Learnsets','stonjourner').learnset.explosion = ["9M"];
		this.modData('Learnsets','stonjourner').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','stonjourner').learnset.naturepower = ["9M"];
		this.modData('Learnsets','stonjourner').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','stonjourner').learnset.roleplay = ["9M"];
		this.modData('Learnsets','stonjourner').learnset.strength = ["9M"];
		this.modData('Learnsets','stonjourner').learnset.telekinesis = ["9M"];
		// Eiscue
		this.modData('Learnsets','eiscue').learnset.iceball = ["9D"];
		this.modData('Learnsets','eiscue').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','eiscue').learnset.flash = ["9M"];
		this.modData('Learnsets','eiscue').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','eiscue').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','eiscue').learnset.waterpulse = ["9M"];
		delete this.modData('Learnsets','eiscue').learnset.waterfall;
		// Indeedee ♀
		this.modData('Learnsets','indeedeef').learnset.happyhour = ["9D"];
		this.modData('Learnsets','indeedeef').learnset.teatime = ["9L40"];
		this.modData('Learnsets','indeedeef').learnset.trumpcard = ["9L55"];
		this.modData('Learnsets','indeedeef').learnset.calmmind = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.dreameater = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.embargo = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.flash = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.gravity = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.healbell = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.recycle = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.roleplay = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.snatch = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','indeedeef').learnset.payday = ["9E"];
		delete this.modData('Learnsets','indeedeef').learnset.trickroom;
		// Indeedee ♂
		this.modData('Learnsets','indeedee').learnset.happyhour = ["9D"];
		this.modData('Learnsets','indeedee').learnset.confide = ["9L1"];
		this.modData('Learnsets','indeedee').learnset.teatime = ["9L40"];
		this.modData('Learnsets','indeedee').learnset.dreameater = ["9M"];
		this.modData('Learnsets','indeedee').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','indeedee').learnset.embargo = ["9M"];
		this.modData('Learnsets','indeedee').learnset.flash = ["9M"];
		this.modData('Learnsets','indeedee').learnset.gravity = ["9M"];
		this.modData('Learnsets','indeedee').learnset.healbell = ["9M"];
		this.modData('Learnsets','indeedee').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','indeedee').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','indeedee').learnset.recycle = ["9M"];
		this.modData('Learnsets','indeedee').learnset.roleplay = ["9M"];
		this.modData('Learnsets','indeedee').learnset.snatch = ["9M"];
		this.modData('Learnsets','indeedee').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','indeedee').learnset.payday = ["9E"];
		delete this.modData('Learnsets','indeedee').learnset.playnice;
		// Morpeko
		this.modData('Learnsets','morpeko').learnset.rage = ["9D"];
		this.modData('Learnsets','morpeko').learnset.odorsleuth = ["9L1"];
		this.modData('Learnsets','morpeko').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','morpeko').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','morpeko').learnset.embargo = ["9M"];
		this.modData('Learnsets','morpeko').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','morpeko').learnset.lastresort = ["9M"];
		this.modData('Learnsets','morpeko').learnset.psychup = ["9M"];
		this.modData('Learnsets','morpeko').learnset.shockwave = ["9M"];
		this.modData('Learnsets','morpeko').learnset.snatch = ["9M"];
		this.modData('Learnsets','morpeko').learnset.stuffcheeks = ["9E"];
		this.modData('Learnsets','morpeko').learnset.tantrum = ["9M"];
		delete this.modData('Learnsets','morpeko').learnset.tailwhip;
		// Cufant
		this.modData('Learnsets','cufant').learnset.magnetbomb = ["9D"];
		this.modData('Learnsets','cufant').learnset.bash = ["9L5"];
		this.modData('Learnsets','cufant').learnset.rototiller = ["9L30"];
		this.modData('Learnsets','cufant').learnset.dig = ["9M"];
		this.modData('Learnsets','cufant').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','cufant').learnset.endeavor = ["9M"];
		this.modData('Learnsets','cufant').learnset.gravity = ["9M"];
		this.modData('Learnsets','cufant').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','cufant').learnset.knockoff = ["9M"];
		this.modData('Learnsets','cufant').learnset.lastresort = ["9M"];
		this.modData('Learnsets','cufant').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','cufant').learnset.smackdown = ["9M"];
		this.modData('Learnsets','cufant').learnset.hardpress = ["9E"];
		this.modData('Learnsets','cufant').learnset.powerwhip = ["9E"];
		delete this.modData('Learnsets','cufant').learnset.defensecurl;
		delete this.modData('Learnsets','cufant').learnset.rollout;
		// Copperajah
		this.modData('Learnsets','copperajah').learnset.magnetbomb = ["9D"];
		this.modData('Learnsets','copperajah').learnset.bash = ["9L5"];
		this.modData('Learnsets','copperajah').learnset.rototiller = ["9L30"];
		this.modData('Learnsets','copperajah').learnset.dig = ["9M"];
		this.modData('Learnsets','copperajah').learnset.block = ["9M"];
		this.modData('Learnsets','copperajah').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','copperajah').learnset.endeavor = ["9M"];
		this.modData('Learnsets','copperajah').learnset.gravity = ["9M"];
		this.modData('Learnsets','copperajah').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','copperajah').learnset.lastresort = ["9M"];
		this.modData('Learnsets','copperajah').learnset.rockpolish = ["9M"];
		delete this.modData('Learnsets','copperajah').learnset.rollout;
		// Dracozolt
		this.modData('Learnsets','dracozolt').learnset.twister = ["9D"];
		this.modData('Learnsets','dracozolt').learnset.aquatail = ["9M"];
		this.modData('Learnsets','dracozolt').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','dracozolt').learnset.flash = ["9M"];
		this.modData('Learnsets','dracozolt').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','dracozolt').learnset.painsplit = ["9M"];
		this.modData('Learnsets','dracozolt').learnset.shockwave = ["9M"];
		this.modData('Learnsets','dracozolt').learnset.strength = ["9M"];
		this.modData('Learnsets','dracozolt').learnset.trailhead = ["9M"];
		// Arctozolt
		this.modData('Learnsets','arctozolt').learnset.iondeluge = ["9D"];
		this.modData('Learnsets','arctozolt').learnset.aquatail = ["9M"];
		this.modData('Learnsets','arctozolt').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','arctozolt').learnset.dragontail = ["9M"];
		this.modData('Learnsets','arctozolt').learnset.flash = ["9M"];
		this.modData('Learnsets','arctozolt').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','arctozolt').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','arctozolt').learnset.painsplit = ["9M"];
		this.modData('Learnsets','arctozolt').learnset.shockwave = ["9M"];
		this.modData('Learnsets','arctozolt').learnset.strength = ["9M"];
		this.modData('Learnsets','arctozolt').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','arctozolt').learnset.stoneedge;
		// Dracovish
		this.modData('Learnsets','dracovish').learnset.liquidation = ["9D"];
		this.modData('Learnsets','dracovish').learnset.chillywater = ["9M"];
		this.modData('Learnsets','dracovish').learnset.painsplit = ["9M"];
		this.modData('Learnsets','dracovish').learnset.strength = ["9M"];
		delete this.modData('Learnsets','dracovish').learnset.leechlife;
		// Arctovish
		this.modData('Learnsets','arctovish').learnset.icefang = ["9D"];
		this.modData('Learnsets','arctovish').learnset.chillywater = ["9M"];
		this.modData('Learnsets','arctovish').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','arctovish').learnset.painsplit = ["9M"];
		this.modData('Learnsets','arctovish').learnset.strength = ["9M"];
		this.modData('Learnsets','arctovish').learnset.rockslide = ["9M"];
		delete this.modData('Learnsets','arctovish').learnset.stoneedge;
		// Duraludon
		this.modData('Learnsets','duraludon').learnset.cuttinglaser = ["9D"];
		this.modData('Learnsets','duraludon').learnset.crushclaw = ["9L30"];
		this.modData('Learnsets','duraludon').learnset.metalburst = ["9L42"];
		this.modData('Learnsets','duraludon').learnset.hardpress = ["9L60"];
		this.modData('Learnsets','duraludon').learnset.block = ["9M"];
		this.modData('Learnsets','duraludon').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','duraludon').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','duraludon').learnset.dragontail = ["9M"];
		this.modData('Learnsets','duraludon').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','duraludon').learnset.flash = ["9M"];
		this.modData('Learnsets','duraludon').learnset.gravity = ["9M"];
		this.modData('Learnsets','duraludon').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','duraludon').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','duraludon').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','duraludon').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','duraludon').learnset.strength = ["9M"];
		delete this.modData('Learnsets','duraludon').learnset.thunder;
		// Dreepy
		this.modData('Learnsets','dreepy').learnset.quickguard = ["9D"];
		this.modData('Learnsets','dreepy').learnset.aerialace = ["9M"];
		this.modData('Learnsets','dreepy').learnset.aquatail = ["9M"];
		this.modData('Learnsets','dreepy').learnset.dragontail = ["9M"];
		this.modData('Learnsets','dreepy').learnset.echoiedvoice = ["9M"];
		this.modData('Learnsets','dreepy').learnset.embargo = ["9M"];
		this.modData('Learnsets','dreepy').learnset.flamecharge = ["9M"];
		this.modData('Learnsets','dreepy').learnset.gravity = ["9M"];
		this.modData('Learnsets','dreepy').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','dreepy').learnset.nightmare = ["9M"];
		this.modData('Learnsets','dreepy').learnset.psychup = ["9M"];
		this.modData('Learnsets','dreepy').learnset.painsplit = ["9M"];
		this.modData('Learnsets','dreepy').learnset.snatch = ["9M"];
		this.modData('Learnsets','dreepy').learnset.spite = ["9M"];
		// Drakloak
		this.modData('Learnsets','drakloak').learnset.quickguard = ["9D"];
		this.modData('Learnsets','drakloak').learnset.aerialace = ["9M"];
		this.modData('Learnsets','drakloak').learnset.aquatail = ["9M"];
		this.modData('Learnsets','drakloak').learnset.dragontail = ["9M"];
		this.modData('Learnsets','drakloak').learnset.echoiedvoice = ["9M"];
		this.modData('Learnsets','drakloak').learnset.embargo = ["9M"];
		this.modData('Learnsets','drakloak').learnset.flamecharge = ["9M"];
		this.modData('Learnsets','drakloak').learnset.gravity = ["9M"];
		this.modData('Learnsets','drakloak').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','drakloak').learnset.nightmare = ["9M"];
		this.modData('Learnsets','drakloak').learnset.psychup = ["9M"];
		this.modData('Learnsets','drakloak').learnset.painsplit = ["9M"];
		this.modData('Learnsets','drakloak').learnset.snatch = ["9M"];
		this.modData('Learnsets','drakloak').learnset.spite = ["9M"];
		delete this.modData('Learnsets','drakloak').learnset.thunder;
		// Dragapult
		this.modData('Learnsets','dragapult').learnset.quickguard = ["9D"];
		this.modData('Learnsets','dragapult').learnset.aerialace = ["9M"];
		this.modData('Learnsets','dragapult').learnset.aquatail = ["9M"];
		this.modData('Learnsets','dragapult').learnset.dragontail = ["9M"];
		this.modData('Learnsets','dragapult').learnset.echoiedvoice = ["9M"];
		this.modData('Learnsets','dragapult').learnset.embargo = ["9M"];
		this.modData('Learnsets','dragapult').learnset.flamecharge = ["9M"];
		this.modData('Learnsets','dragapult').learnset.gravity = ["9M"];
		this.modData('Learnsets','dragapult').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','dragapult').learnset.nightmare = ["9M"];
		this.modData('Learnsets','dragapult').learnset.psychup = ["9M"];
		this.modData('Learnsets','dragapult').learnset.painsplit = ["9M"];
		this.modData('Learnsets','dragapult').learnset.smackdown = ["9M"];
		this.modData('Learnsets','dragapult').learnset.snatch = ["9M"];
		this.modData('Learnsets','dragapult').learnset.spite = ["9M"];
		delete this.modData('Learnsets','dragapult').learnset.thunder;
		// Zacian
		this.modData('Learnsets','zacian').learnset.meteorassault = ["9D"];
		this.modData('Learnsets','zacian').learnset.metaledge = ["9L33"];
		this.modData('Learnsets','zacian').learnset.playrough = ["9L66"];
		this.modData('Learnsets','zacian').learnset.aerialace = ["9M"];
		this.modData('Learnsets','zacian').learnset.chipaway = ["9M"];
		this.modData('Learnsets','zacian').learnset.echoidvoice = ["9M"];
		this.modData('Learnsets','zacian').learnset.endeavor = ["9M"];
		this.modData('Learnsets','zacian').learnset.healbell = ["9M"];
		this.modData('Learnsets','zacian').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','zacian').learnset.ironhead = ["9M"];
		this.modData('Learnsets','zacian').learnset.naturepower = ["9M"];
		this.modData('Learnsets','zacian').learnset.quash = ["9M"];
		this.modData('Learnsets','zacian').learnset.strength = ["9M"];
		this.modData('Learnsets','zacian').learnset.xscissor = ["9M"];
		delete this.modData('Learnsets','zacian').learnset.moonblast;
		// Zacian Crowned
		this.modData('Learnsets','zaciancrowned').learnset.meteorassault = ["9D"];
		this.modData('Learnsets','zaciancrowned').learnset.playrough = ["9L66"];
		this.modData('Learnsets','zaciancrowned').learnset.aerialace = ["9M"];
		this.modData('Learnsets','zaciancrowned').learnset.chipaway = ["9M"];
		this.modData('Learnsets','zaciancrowned').learnset.echoidvoice = ["9M"];
		this.modData('Learnsets','zaciancrowned').learnset.endeavor = ["9M"];
		this.modData('Learnsets','zaciancrowned').learnset.healbell = ["9M"];
		this.modData('Learnsets','zaciancrowned').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','zaciancrowned').learnset.naturepower = ["9M"];
		this.modData('Learnsets','zaciancrowned').learnset.quash = ["9M"];
		this.modData('Learnsets','zaciancrowned').learnset.strength = ["9M"];
		this.modData('Learnsets','zaciancrowned').learnset.xscissor = ["9M"];
		delete this.modData('Learnsets','zaciancrowned').learnset.moonblast;
		// Zamazenta
		this.modData('Learnsets','zamazenta').learnset.kingsshield = ["9D"];
		this.modData('Learnsets','zamazenta').learnset.playrough = ["9L66"];
		this.modData('Learnsets','zamazenta').learnset.aerialace = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.block = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.chipaway = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.echoidvoice = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.endeavor = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.healbell = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.naturepower = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.quash = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.rockslide = ["9M"];
		this.modData('Learnsets','zamazenta').learnset.strength = ["9M"];
		delete this.modData('Learnsets','zamazenta').learnset.moonblast;
		// Zamazenta Crowned
		this.modData('Learnsets','zamazentacrowned').learnset.kingsshield = ["9D"];
		this.modData('Learnsets','zamazentacrowned').learnset.playrough = ["9L66"];
		this.modData('Learnsets','zamazentacrowned').learnset.aerialace = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.block = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.chipaway = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.echoidvoice = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.endeavor = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.healbell = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.naturepower = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.quash = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','zamazentacrowned').learnset.strength = ["9M"];
		delete this.modData('Learnsets','zamazentacrowned').learnset.moonblast;
		// Eternatus
		this.modData('Learnsets','eternatus').learnset.growth = ["9D"];
		this.modData('Learnsets','eternatus').learnset.toxic = ["9L8", "9M"];
		this.modData('Learnsets','eternatus').learnset.aquatail = ["9M"];
		this.modData('Learnsets','eternatus').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','eternatus').learnset.dragontail = ["9M"];
		this.modData('Learnsets','eternatus').learnset.dreameater = ["9M"];
		this.modData('Learnsets','eternatus').learnset.gravity = ["9M"];
		this.modData('Learnsets','eternatus').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','eternatus').learnset.shockwave = ["9M"];
		this.modData('Learnsets','eternatus').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','eternatus').learnset.strength = ["9M"];
		// Kubfu
		this.modData('Learnsets','kubfu').learnset.aurasphere = ["9D"];
		this.modData('Learnsets','kubfu').learnset.karatechop = ["9L12"];
		this.modData('Learnsets','kubfu').learnset.rollingkick = ["9L24"];
		this.modData('Learnsets','kubfu').learnset.brickbreak = ["9L36", "9M"];
		this.modData('Learnsets','kubfu').learnset.stormthrow = ["9L40"];
		this.modData('Learnsets','kubfu').learnset.dynamicpunch = ["9L48"];
		this.modData('Learnsets','kubfu').learnset.closecombat = ["9L56"];
		this.modData('Learnsets','kubfu').learnset.aerialace = ["9M"];
		this.modData('Learnsets','kubfu').learnset.chipaway = ["9M"];
		this.modData('Learnsets','kubfu').learnset.dualchop = ["9M"];
		this.modData('Learnsets','kubfu').learnset.ironhead = ["9M"];
		this.modData('Learnsets','kubfu').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','kubfu').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','kubfu').learnset.strength = ["9M"];
		delete this.modData('Learnsets','kubfu').learnset.uturn;
		// Urshifu
		this.modData('Learnsets','urshifu').learnset.aurasphere = ["9D"];
		this.modData('Learnsets','urshifu').learnset.karatechop = ["9L12"];
		this.modData('Learnsets','urshifu').learnset.rollingkick = ["9L24"];
		this.modData('Learnsets','urshifu').learnset.brickbreak = ["9L36", "9M"];
		this.modData('Learnsets','urshifu').learnset.stormthrow = ["9L40"];
		this.modData('Learnsets','urshifu').learnset.dynamicpunch = ["9L48"];
		this.modData('Learnsets','urshifu').learnset.throatchop = ["9L56"];
		this.modData('Learnsets','urshifu').learnset.closecombat = ["9L60"];
		this.modData('Learnsets','urshifu').learnset.aerialace = ["9M"];
		this.modData('Learnsets','urshifu').learnset.chipaway = ["9M"];
		this.modData('Learnsets','urshifu').learnset.dualchop = ["9M"];
		this.modData('Learnsets','urshifu').learnset.ironhead = ["9M"];
		this.modData('Learnsets','urshifu').learnset.knockoff = ["9M"];
		this.modData('Learnsets','urshifu').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','urshifu').learnset.lastresort = ["9M"];
		this.modData('Learnsets','urshifu').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','urshifu').learnset.strength = ["9M"];
		this.modData('Learnsets','urshifu').learnset.torment = ["9M"];
		delete this.modData('Learnsets','urshifu').learnset.uturn;
		// Urshifu Rapid Strike
		this.modData('Learnsets','urshifurapidstrike').learnset.aurasphere = ["9D"];
		this.modData('Learnsets','urshifurapidstrike').learnset.karatechop = ["9L12"];
		this.modData('Learnsets','urshifurapidstrike').learnset.rollingkick = ["9L24"];
		this.modData('Learnsets','urshifurapidstrike').learnset.brickbreak = ["9L36", "9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.stormthrow = ["9L40"];
		this.modData('Learnsets','urshifurapidstrike').learnset.dynamicpunch = ["9L48"];
		this.modData('Learnsets','urshifurapidstrike').learnset.jetpunch = ["9L56"];
		this.modData('Learnsets','urshifurapidstrike').learnset.closecombat = ["9L60"];
		this.modData('Learnsets','urshifurapidstrike').learnset.aerialace = ["9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.chipaway = ["9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.dualchop = ["9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.endeavor = ["9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.ironhead = ["9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.knockoff = ["9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.strength = ["9M"];
		this.modData('Learnsets','urshifurapidstrike').learnset.torment = ["9M"];
		delete this.modData('Learnsets','urshifurapidstrike').learnset.uturn;
		// Zarude
		this.modData('Learnsets','zarude').learnset.beatup = ["9D"];
		this.modData('Learnsets','zarude').learnset.aerialace = ["9M"];
		this.modData('Learnsets','zarude').learnset.chipaway = ["9M"];
		this.modData('Learnsets','zarude').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','zarude').learnset.embargo = ["9M"];
		this.modData('Learnsets','zarude').learnset.endeavor = ["9M"];
		this.modData('Learnsets','zarude').learnset.dualchop = ["9M"];
		this.modData('Learnsets','zarude').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','zarude').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','zarude').learnset.lastresort = ["9M"];
		this.modData('Learnsets','zarude').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','zarude').learnset.naturepower = ["9M"];
		this.modData('Learnsets','zarude').learnset.quash = ["9M"];
		this.modData('Learnsets','zarude').learnset.strength = ["9M"];
		this.modData('Learnsets','zarude').learnset.synthesis = ["9M"];
		this.modData('Learnsets','zarude').learnset.torment = ["9M"];
		this.modData('Learnsets','zarude').learnset.xscissor = ["9M"];
		// Regieleki
		this.modData('Learnsets','regieleki').learnset.charge = ["9D"];
		this.modData('Learnsets','regieleki').learnset.flash = ["9M"];
		this.modData('Learnsets','regieleki').learnset.shockwave = ["9M"];
		// Regidrago
		this.modData('Learnsets','regidrago').learnset.jawlock = ["9D"];
		this.modData('Learnsets','regidrago').learnset.block = ["9M"];
		this.modData('Learnsets','regidrago').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','regidrago').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','regidrago').learnset.rockpolish = ["9M"];
		// Glastrier
		this.modData('Learnsets','glastrier').learnset.iciclespear = ["9D"];
		this.modData('Learnsets','glastrier').learnset.highhorsepower = ["9L54"];
		this.modData('Learnsets','glastrier').learnset.thrash = ["9L60"];
		this.modData('Learnsets','glastrier').learnset.taunt = ["9L66"];
		this.modData('Learnsets','glastrier').learnset.doubleedge = ["9L72"];
		this.modData('Learnsets','glastrier').learnset.swordsdance = ["9L78", "9M"];
		this.modData('Learnsets','glastrier').learnset.block = ["9M"];
		this.modData('Learnsets','glastrier').learnset.chillywater = ["9M"];
		this.modData('Learnsets','glastrier').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','glastrier').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','glastrier').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','glastrier').learnset.strength = ["9M"];
		// Spectrier
		this.modData('Learnsets','spectrier').learnset.shadowsneak = ["9D"];
		this.modData('Learnsets','spectrier').learnset.highhorsepower = ["9L54"];
		this.modData('Learnsets','spectrier').learnset.thrash = ["9L60"];
		this.modData('Learnsets','spectrier').learnset.disable = ["9L66"];
		this.modData('Learnsets','spectrier').learnset.doubleedge = ["9L72"];
		this.modData('Learnsets','spectrier').learnset.nastyplot = ["9L78", "9M"];
		this.modData('Learnsets','spectrier').learnset.dreameater = ["9M"];
		this.modData('Learnsets','spectrier').learnset.nightmare = ["9M"];
		this.modData('Learnsets','spectrier').learnset.painsplit = ["9M"];
		this.modData('Learnsets','spectrier').learnset.spite = ["9M"];
		// Calyrex
		this.modData('Learnsets','calyrex').learnset.solarblade = ["9D"];
		this.modData('Learnsets','calyrex').learnset.embargo = ["9M"];
		this.modData('Learnsets','calyrex').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','calyrex').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','calyrex').learnset.naturepower = ["9M"];
		this.modData('Learnsets','calyrex').learnset.quash = ["9M"];
		this.modData('Learnsets','calyrex').learnset.synthesis = ["9M"];
		this.modData('Learnsets','calyrex').learnset.telekinesis = ["9M"];
		delete this.modData('Learnsets','calyrex').learnset.encore;
		// Calyrex Ice Rider
		this.modData('Learnsets','calyrexice').learnset.solarblade = ["9D"];
		this.modData('Learnsets','calyrexice').learnset.glaciallance = ["9R"];
		this.modData('Learnsets','calyrexice').learnset.highhorsepower = ["9L1"];
		this.modData('Learnsets','calyrexice').learnset.chillywater = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.embargo = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.naturepower = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.quash = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.synthesis = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.block = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','calyrexice').learnset.strength = ["9M"];
		// Calyrex Shadow Rider
		this.modData('Learnsets','calyrexshadow').learnset.solarblade = ["9D"];
		this.modData('Learnsets','calyrexshadow').learnset.astralbarrage = ["9R"];
		this.modData('Learnsets','calyrexshadow').learnset.highhorsepower = ["9L1"];
		this.modData('Learnsets','calyrexshadow').learnset.embargo = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.naturepower = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.quash = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.synthesis = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.dreameater = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.nightmare = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.painsplit = ["9M"];
		this.modData('Learnsets','calyrexshadow').learnset.spite = ["9M"];
		// Wyrdeer
		this.modData('Learnsets','wyrdeer').learnset.followme = ["9D"];
		this.modData('Learnsets','wyrdeer').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','wyrdeer').learnset.psychup = ["9M"];
		this.modData('Learnsets','wyrdeer').learnset.roleplay = ["9M"];
		// Kleavor
		this.modData('Learnsets','kleavor').learnset.guillotine = ["9D"];
		this.modData('Learnsets','kleavor').learnset.pursuit = ["9L12"];
		this.modData('Learnsets','kleavor').learnset.cut = ["9L16"];
		this.modData('Learnsets','kleavor').learnset.razorwind = ["9L52"];
		this.modData('Learnsets','kleavor').learnset.feint = ["9L56"];
		this.modData('Learnsets','kleavor').learnset.laserfocus = ["9M"];
		delete this.modData('Learnsets','kleavor').learnset.doubleteam;
		delete this.modData('Learnsets','kleavor').learnset.doublehit;
		// Ursaluna
		this.modData('Learnsets','ursaluna').learnset.slackoff = ["9D"];
		this.modData('Learnsets','ursaluna').learnset.highhorsepower = ["9L0"];
		this.modData('Learnsets','ursaluna').learnset.rototiller = ["9L1"];
		this.modData('Learnsets','ursaluna').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','ursaluna').learnset.knockoff = ["9M"];
		this.modData('Learnsets','ursaluna').learnset.naturalgift = ["9M"];
		delete this.modData('Learnsets','ursaluna').learnset.drainpunch;
		// Basculegion F
		this.modData('Learnsets','basculegionf').learnset.metalburst = ["9D"];
		this.modData('Learnsets','basculegionf').learnset.shadowsneak = ["9L1"];
		this.modData('Learnsets','basculegionf').learnset.whitewater = ["9L8"];
		this.modData('Learnsets','basculegionf').learnset.flail = ["9L12", "9M"];
		this.modData('Learnsets','basculegionf').learnset.aquajet = ["9L16"];
		this.modData('Learnsets','basculegionf').learnset.bite = ["9L20"];
		this.modData('Learnsets','basculegionf').learnset.scaryface = ["9L24"];
		this.modData('Learnsets','basculegionf').learnset.headbutt = ["9L28"];
		this.modData('Learnsets','basculegionf').learnset.soak = ["9L32"];
		this.modData('Learnsets','basculegionf').learnset.crunch = ["9L36"];
		this.modData('Learnsets','basculegionf').learnset.takedown = ["9L40"];
		this.modData('Learnsets','basculegionf').learnset.lastrespects = ["9L44"];
		this.modData('Learnsets','basculegionf').learnset.uproar = ["9L48", "9M"];
		this.modData('Learnsets','basculegionf').learnset.doubleedge = ["9L52"];
		this.modData('Learnsets','basculegionf').learnset.thrash = ["9L56"];
		this.modData('Learnsets','basculegionf').learnset.wavecrash = ["9L60"];
		this.modData('Learnsets','basculegionf').learnset.headsmash = ["9L64"];
		this.modData('Learnsets','basculegionf').learnset.phantomforce = ["9L68", "9M"];
		this.modData('Learnsets','basculegionf').learnset.nightmare = ["9M"];
		this.modData('Learnsets','basculegionf').learnset.painsplit = ["9M"];
		// Basculegion
		this.modData('Learnsets','basculegion').learnset.reversal = ["9D"];
		this.modData('Learnsets','basculegion').learnset.shadowsneak = ["9L1"];
		this.modData('Learnsets','basculegion').learnset.whitewater = ["9L8"];
		this.modData('Learnsets','basculegion').learnset.flail = ["9L12", "9M"];
		this.modData('Learnsets','basculegion').learnset.aquajet = ["9L16"];
		this.modData('Learnsets','basculegion').learnset.bite = ["9L20"];
		this.modData('Learnsets','basculegion').learnset.scaryface = ["9L24"];
		this.modData('Learnsets','basculegion').learnset.headbutt = ["9L28"];
		this.modData('Learnsets','basculegion').learnset.soak = ["9L32"];
		this.modData('Learnsets','basculegion').learnset.crunch = ["9L36"];
		this.modData('Learnsets','basculegion').learnset.takedown = ["9L40"];
		this.modData('Learnsets','basculegion').learnset.lastrespects = ["9L44"];
		this.modData('Learnsets','basculegion').learnset.uproar = ["9L48", "9M"];
		this.modData('Learnsets','basculegion').learnset.doubleedge = ["9L52"];
		this.modData('Learnsets','basculegion').learnset.thrash = ["9L56"];
		this.modData('Learnsets','basculegion').learnset.wavecrash = ["9L60"];
		this.modData('Learnsets','basculegion').learnset.headsmash = ["9L64"];
		this.modData('Learnsets','basculegion').learnset.phantomforce = ["9L68", "9M"];
		this.modData('Learnsets','basculegion').learnset.nightmare = ["9M"];
		this.modData('Learnsets','basculegion').learnset.painsplit = ["9M"];
		// Sneasler
		this.modData('Learnsets','sneasler').learnset.razorwind = ["9D"];
		this.modData('Learnsets','sneasler').learnset.knockoff = ["9M"];
		// Overqwil
		this.modData('Learnsets','overqwil').learnset.fellstinger = ["9D"];
		this.modData('Learnsets','overqwil').learnset.whitewater = ["9L12"];
		this.modData('Learnsets','overqwil').learnset.pinmissile = ["9L24"];
		this.modData('Learnsets','overqwil').learnset.brine = ["9L32","9M"];
		this.modData('Learnsets','overqwil').learnset.aquatail = ["9L48","9M"];
		this.modData('Learnsets','overqwil').learnset.toxic = ["9L52", "9M"];
		this.modData('Learnsets','overqwil').learnset.mortalstrike = ["9L60"];
		this.modData('Learnsets','overqwil').learnset.nightmare = ["9M"];
		this.modData('Learnsets','overqwil').learnset.revenge = ["9E"];
		this.modData('Learnsets','overqwil').learnset.painsplit = ["9M"];
		this.modData('Learnsets','overqwil').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','overqwil').learnset.torment = ["9M"];
		delete this.modData('Learnsets','overqwil').learnset.acupressure;
		delete this.modData('Learnsets','overqwil').learnset.blizzard;
		delete this.modData('Learnsets','overqwil').learnset.gyroball;
		delete this.modData('Learnsets','overqwil').learnset.shockwave;
		delete this.modData('Learnsets','overqwil').learnset.thunderwave;
		// Enamorus
		this.modData('Learnsets','enamorus').learnset.sweetscent = ["9D"];
		this.modData('Learnsets','enamorus').learnset.captivate = ["9L1"];
		this.modData('Learnsets','enamorus').learnset.fairywind = ["9L1"];
		this.modData('Learnsets','enamorus').learnset.constrict = ["9L1"];
		this.modData('Learnsets','enamorus').learnset.flatter = ["9L1"];
		this.modData('Learnsets','enamorus').learnset.punishment = ["9L7"];
		this.modData('Learnsets','enamorus').learnset.magicalleaf = ["9L13"];
		this.modData('Learnsets','enamorus').learnset.drainingkiss = ["9L19"];
		this.modData('Learnsets','enamorus').learnset.extrasensory = ["9L25"];
		this.modData('Learnsets','enamorus').learnset.nastyplot = ["9L31", "9M"];
		this.modData('Learnsets','enamorus').learnset.playrough = ["9L37"];
		this.modData('Learnsets','enamorus').learnset.petalblizzard = ["9L43"];
		this.modData('Learnsets','enamorus').learnset.moonblast = ["9L49"];
		this.modData('Learnsets','enamorus').learnset.attract = ["9L55", "9M"];
		this.modData('Learnsets','enamorus').learnset.healingwish = ["9L61"];
		this.modData('Learnsets','enamorus').learnset.foulplay = ["9L67", "9M"];
		this.modData('Learnsets','enamorus').learnset.bind = ["9L73"];
		this.modData('Learnsets','enamorus').learnset.petaldance = ["9L79"];
		this.modData('Learnsets','enamorus').learnset.charm = ["9M"];
		this.modData('Learnsets','enamorus').learnset.compensation = ["9M"];
		this.modData('Learnsets','enamorus').learnset.dreameater = ["9M"];
		this.modData('Learnsets','enamorus').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','enamorus').learnset.metronome = ["9M"];
		this.modData('Learnsets','enamorus').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','enamorus').learnset.naturepower = ["9M"];
		this.modData('Learnsets','enamorus').learnset.spite = ["9M"];
		delete this.modData('Learnsets','enamorus').learnset.mysticalfire;
		// Enamorus Therian
		this.modData('Learnsets','enamorustherian').learnset.coil = ["9D"];
		// Sprigatito
		this.modData('Learnsets','sprigatito').learnset.aromatherapy = ["9D"];
		this.modData('Learnsets','sprigatito').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','sprigatito').learnset.lastresort = ["9M"];
		this.modData('Learnsets','sprigatito').learnset.naturepower = ["9M"];
		this.modData('Learnsets','sprigatito').learnset.retaliate = ["9M"];
		this.modData('Learnsets','sprigatito').learnset.snatch = ["9M"];
		this.modData('Learnsets','sprigatito').learnset.synthesis = ["9M"];
		delete this.modData('Learnsets','sprigatito').learnset.allyswitch;
		// Floragato
		this.modData('Learnsets','floragato').learnset.needlearm = ["9D"];
		this.modData('Learnsets','floragato').learnset.dualchop = ["9M"];
		this.modData('Learnsets','floragato').learnset.embargo = ["9M"];
		this.modData('Learnsets','floragato').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','floragato').learnset.knockoff = ["9M"];
		this.modData('Learnsets','floragato').learnset.lastresort = ["9M"];
		this.modData('Learnsets','floragato').learnset.naturepower = ["9M"];
		this.modData('Learnsets','floragato').learnset.payback = ["9M"];
		this.modData('Learnsets','floragato').learnset.retaliate = ["9M"];
		this.modData('Learnsets','floragato').learnset.snatch = ["9M"];
		this.modData('Learnsets','floragato').learnset.stringshot = ["9M"];
		this.modData('Learnsets','floragato').learnset.synthesis = ["9M"];
		this.modData('Learnsets','floragato').learnset.torment = ["9M"];
		// Meowscarada
		this.modData('Learnsets','meowscarada').learnset.pollenpuff = ["9D"];
		this.modData('Learnsets','meowscarada').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.assurance = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.dualchop = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.embargo = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.lastresort = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.naturepower = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.payback = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.retaliate = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.roleplay = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.smackdown = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.snatch = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.stringshot = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.synthesis = ["9M"];
		this.modData('Learnsets','meowscarada').learnset.torment = ["9M"];
		// Fuecoco
		this.modData('Learnsets','fuecoco').learnset.flameburst = ["9D"];
		this.modData('Learnsets','fuecoco').learnset.block = ["9M"];
		this.modData('Learnsets','fuecoco').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','fuecoco').learnset.incinerate = ["9L15", "9M"];
		this.modData('Learnsets','fuecoco').learnset.irontail = ["9M"];
		this.modData('Learnsets','fuecoco').learnset.screech = ["9M"];
		this.modData('Learnsets','fuecoco').learnset.strength = ["9M"];
		// Crocalor
		this.modData('Learnsets','crocalor').learnset.flameburst = ["9D"];
		this.modData('Learnsets','crocalor').learnset.block = ["9M"];
		this.modData('Learnsets','crocalor').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','crocalor').learnset.flash = ["9M"];
		this.modData('Learnsets','crocalor').learnset.incinerate = ["9L15", "9M"];
		this.modData('Learnsets','crocalor').learnset.irontail = ["9M"];
		this.modData('Learnsets','crocalor').learnset.screech = ["9M"];
		this.modData('Learnsets','crocalor').learnset.strength = ["9M"];
		// Skeledirge
		this.modData('Learnsets','skeledirge').learnset.perishsong = ["9D"];
		this.modData('Learnsets','skeledirge').learnset.assurance = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.block = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.flash = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.incinerate = ["9L15", "9M"];
		this.modData('Learnsets','skeledirge').learnset.irontail = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.knockoff = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.nightmare = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.screech = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.strength = ["9M"];
		this.modData('Learnsets','skeledirge').learnset.spite = ["9M"];
		delete this.modData('Learnsets','skeledirge').learnset.poltergeist;
		// Quaxly
		this.modData('Learnsets','quaxly').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','quaxly').learnset.bounce = ["9M"];
		this.modData('Learnsets','quaxly').learnset.dive = ["9M"];
		this.modData('Learnsets','quaxly').learnset.knockoff = ["9M"];
		this.modData('Learnsets','quaxly').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','quaxly').learnset.scald = ["9M"];
		this.modData('Learnsets','quaxly').learnset.torment = ["9M"];
		this.modData('Learnsets','quaxly').learnset.whirlpool = ["9M"];
		// Quaxwell
		this.modData('Learnsets','quaxwell').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','quaxwell').learnset.bounce = ["9M"];
		this.modData('Learnsets','quaxwell').learnset.chipaway = ["9M"];
		this.modData('Learnsets','quaxwell').learnset.dive = ["9M"];
		this.modData('Learnsets','quaxwell').learnset.dualchop = ["9M"];
		this.modData('Learnsets','quaxwell').learnset.knockoff = ["9M"];
		this.modData('Learnsets','quaxwell').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','quaxwell').learnset.scald = ["9M"];
		this.modData('Learnsets','quaxwell').learnset.torment = ["9M"];
		this.modData('Learnsets','quaxwell').learnset.waterfall = ["9M"];
		this.modData('Learnsets','quaxwell').learnset.whirlpool = ["9M"];
		// Quaquaval
		this.modData('Learnsets','quaquaval').learnset.victorydance = ["9D"];
		this.modData('Learnsets','quaquaval').learnset.bounce = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.chipaway = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.dive = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.dualchop = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.knockoff = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.irontail = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.roleplay = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.scald = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.torment = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.waterfall = ["9M"];
		this.modData('Learnsets','quaquaval').learnset.whirlpool = ["9M"];
		// Lechonk
		this.modData('Learnsets','lechonk').learnset.rollout = ["9D"];
		this.modData('Learnsets','lechonk').learnset.odorsleuth = ["9L15"];
		this.modData('Learnsets','lechonk').learnset.covet = ["9L17"];
		this.modData('Learnsets','lechonk').learnset.dig = ["9L21", "9M"];
		this.modData('Learnsets','lechonk').learnset.sweetscent = ["9L24"];
		this.modData('Learnsets','lechonk').learnset.headbutt = ["9L27"];
		this.modData('Learnsets','lechonk').learnset.yawn = ["9L30"];
		this.modData('Learnsets','lechonk').learnset.takedown = ["9L33"];
		this.modData('Learnsets','lechonk').learnset.workup = ["9L36", "9M"];
		this.modData('Learnsets','lechonk').learnset.uproar = ["9L39", "9M"];
		this.modData('Learnsets','lechonk').learnset.doubleedge = ["9L42"];
		this.modData('Learnsets','lechonk').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','lechonk').learnset.endeavor = ["9M"];
		this.modData('Learnsets','lechonk').learnset.recycle = ["9M"];
		this.modData('Learnsets','lechonk').learnset.screech = ["9M"];
		// Oinkologne F
		this.modData('Learnsets','oinkolognef').learnset.flatter = ["9D"];
		this.modData('Learnsets','oinkolognef').learnset.odorsleuth = ["9L14"];
		this.modData('Learnsets','oinkolognef').learnset.covet = ["9L17"];
		this.modData('Learnsets','oinkolognef').learnset.dig = ["9L23", "9M"];
		this.modData('Learnsets','oinkolognef').learnset.sweetscent = ["9L27"];
		this.modData('Learnsets','oinkolognef').learnset.headbutt = ["9L31"];
		this.modData('Learnsets','oinkolognef').learnset.yawn = ["9L35"];
		this.modData('Learnsets','oinkolognef').learnset.takedown = ["9L38"];
		this.modData('Learnsets','oinkolognef').learnset.workup = ["9L44", "9M"];
		this.modData('Learnsets','oinkolognef').learnset.uproar = ["9L48", "9M"];
		this.modData('Learnsets','oinkolognef').learnset.doubleedge = ["9L52"];
		this.modData('Learnsets','oinkolognef').learnset.earthpower = ["9L56"];
		this.modData('Learnsets','oinkolognef').learnset.belch = ["9L59"];
		this.modData('Learnsets','oinkolognef').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','oinkolognef').learnset.endeavor = ["9M"];
		this.modData('Learnsets','oinkolognef').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','oinkolognef').learnset.recycle = ["9M"];
		this.modData('Learnsets','oinkolognef').learnset.retaliate = ["9M"];
		this.modData('Learnsets','oinkolognef').learnset.screech = ["9M"];
		// Oinkologne
		this.modData('Learnsets','oinkologne').learnset.captivate = ["9D"];
		this.modData('Learnsets','oinkologne').learnset.odorsleuth = ["9L14"];
		this.modData('Learnsets','oinkologne').learnset.covet = ["9L17"];
		this.modData('Learnsets','oinkologne').learnset.dig = ["9L23", "9M"];
		this.modData('Learnsets','oinkologne').learnset.sweetscent = ["9L27"];
		this.modData('Learnsets','oinkologne').learnset.headbutt = ["9L31"];
		this.modData('Learnsets','oinkologne').learnset.yawn = ["9L35"];
		this.modData('Learnsets','oinkologne').learnset.takedown = ["9L38"];
		this.modData('Learnsets','oinkologne').learnset.workup = ["9L44", "9M"];
		this.modData('Learnsets','oinkologne').learnset.uproar = ["9L48", "9M"];
		this.modData('Learnsets','oinkologne').learnset.doubleedge = ["9L52"];
		this.modData('Learnsets','oinkologne').learnset.earthpower = ["9L56"];
		this.modData('Learnsets','oinkologne').learnset.belch = ["9L59"];
		this.modData('Learnsets','oinkologne').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','oinkologne').learnset.endeavor = ["9M"];
		this.modData('Learnsets','oinkologne').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','oinkologne').learnset.recycle = ["9M"];
		this.modData('Learnsets','oinkologne').learnset.retaliate = ["9M"];
		this.modData('Learnsets','oinkologne').learnset.screech = ["9M"];
		// Tarountula
		this.modData('Learnsets','tarountula').learnset.rebound = ["9D"];
		this.modData('Learnsets','tarountula').learnset.feintattack = ["9L8"];
		this.modData('Learnsets','tarountula').learnset.springleap = ["9L14"];
		this.modData('Learnsets','tarountula').learnset.bugbite = ["9L25", "9M"];
		this.modData('Learnsets','tarountula').learnset.silktrap = ["9L36"];
		this.modData('Learnsets','tarountula').learnset.spiderweb = ["9L40"];
		this.modData('Learnsets','tarountula').learnset.ambush = ["9L44"];
		this.modData('Learnsets','tarountula').learnset.electroweb = ["9M"];
		this.modData('Learnsets','tarountula').learnset.infestation = ["9M"];
		this.modData('Learnsets','tarountula').learnset.nightmare = ["9M"];
		this.modData('Learnsets','tarountula').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','tarountula').learnset.stringshot = ["9L1", "9M"];
		this.modData('Learnsets','tarountula').learnset.toxic = ["9M"];
		this.modData('Learnsets','tarountula').learnset.foresight = ["9E"];
		this.modData('Learnsets','tarountula').learnset.toxicthread = ["9E"];
		delete this.modData('Learnsets','tarountula').learnset.assurance;
		delete this.modData('Learnsets','tarountula').learnset.headbutt;
		delete this.modData('Learnsets','tarountula').learnset.circlethrow;
		delete this.modData('Learnsets','tarountula').learnset.throatchop;
		delete this.modData('Learnsets','tarountula').learnset.firstimpression;
		delete this.modData('Learnsets','tarountula').learnset.trailhead;
		// Spidops
		this.modData('Learnsets','spidops').learnset.spikes = ["9D"];
		this.modData('Learnsets','spidops').learnset.lockon = ["9L0"];
		this.modData('Learnsets','spidops').learnset.feintattack = ["9L8"];
		this.modData('Learnsets','spidops').learnset.springleap = ["9L14"];
		this.modData('Learnsets','spidops').learnset.bugbite = ["9L28", "9M"];
		this.modData('Learnsets','spidops').learnset.silktrap = ["9L41"];
		this.modData('Learnsets','spidops').learnset.spiderweb = ["9L45"];
		this.modData('Learnsets','spidops').learnset.ambush = ["9L49"];
		this.modData('Learnsets','spidops').learnset.assurance = ["9M"];
		this.modData('Learnsets','spidops').learnset.compensation = ["9M"];
		this.modData('Learnsets','spidops').learnset.electroweb = ["9M"];
		this.modData('Learnsets','spidops').learnset.embargo = ["9M"];
		this.modData('Learnsets','spidops').learnset.infestation = ["9M"];
		this.modData('Learnsets','spidops').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','spidops').learnset.lastresort = ["9M"];
		this.modData('Learnsets','spidops').learnset.nightmare = ["9M"];
		this.modData('Learnsets','spidops').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','spidops').learnset.smackdown = ["9M"];
		this.modData('Learnsets','spidops').learnset.snatch = ["9M"];
		this.modData('Learnsets','spidops').learnset.stringshot = ["9L1", "9M"];
		this.modData('Learnsets','spidops').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','spidops').learnset.headbutt;
		delete this.modData('Learnsets','spidops').learnset.circlethrow;
		delete this.modData('Learnsets','spidops').learnset.throatchop;
		// Nymble
		this.modData('Learnsets','nymble').learnset.cut = ["9D"];
		this.modData('Learnsets','nymble').learnset.springleap = ["922"];
		this.modData('Learnsets','nymble').learnset.assurance = ["9L9", "9M"];
		this.modData('Learnsets','nymble').learnset.compensation = ["9M"];
		this.modData('Learnsets','nymble').learnset.electroweb = ["9M"];
		this.modData('Learnsets','nymble').learnset.endeavor = ["9M"];
		this.modData('Learnsets','nymble').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','nymble').learnset.infestation = ["9M"];
		this.modData('Learnsets','nymble').learnset.lastresort = ["9M"];
		this.modData('Learnsets','nymble').learnset.nightmare = ["9M"];
		this.modData('Learnsets','nymble').learnset.painsplit = ["9M"];
		this.modData('Learnsets','nymble').learnset.retaliate = ["9M"];
		this.modData('Learnsets','nymble').learnset.screech = ["9L14", "9M"];
		this.modData('Learnsets','nymble').learnset.signalbeam = ["9M"];
		// Lokix
		this.modData('Learnsets','lokix').learnset.guillotine = ["9D"];
		this.modData('Learnsets','lokix').learnset.springleap = ["922"];
		this.modData('Learnsets','lokix').learnset.assurance = ["9L9", "9M"];
		this.modData('Learnsets','lokix').learnset.electroweb = ["9M"];
		this.modData('Learnsets','lokix').learnset.endeavor = ["9M"];
		this.modData('Learnsets','lokix').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','lokix').learnset.infestation = ["9M"];
		this.modData('Learnsets','lokix').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','lokix').learnset.lastresort = ["9M"];
		this.modData('Learnsets','lokix').learnset.payback = ["9M"];
		this.modData('Learnsets','lokix').learnset.nightmare = ["9M"];
		this.modData('Learnsets','lokix').learnset.painsplit = ["9M"];
		this.modData('Learnsets','lokix').learnset.retaliate = ["9M"];
		this.modData('Learnsets','lokix').learnset.screech = ["9L14", "9M"];
		this.modData('Learnsets','lokix').learnset.signalbeam = ["9M"];
		// Pawmi
		this.modData('Learnsets','pawmi').learnset.particleslam = ["9D"];
		this.modData('Learnsets','pawmi').learnset.smellingsalts = ["9L17"];
		this.modData('Learnsets','pawmi').learnset.spark = ["9L21"];
		this.modData('Learnsets','pawmi').learnset.thunderwave = ["9L24", "9M"];
		this.modData('Learnsets','pawmi').learnset.entrainment = ["9L26"];
		this.modData('Learnsets','pawmi').learnset.slam = ["9L30"];
		this.modData('Learnsets','pawmi').learnset.discharge = ["9L33"];
		this.modData('Learnsets','pawmi').learnset.agility = ["9L35"];
		this.modData('Learnsets','pawmi').learnset.wildcharge = ["9L37", "9M"];
		this.modData('Learnsets','pawmi').learnset.afteryou = ["9M"];
		this.modData('Learnsets','pawmi').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','pawmi').learnset.electroweb = ["9M"];
		this.modData('Learnsets','pawmi').learnset.flash = ["9M"];
		this.modData('Learnsets','pawmi').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','pawmi').learnset.retaliate = ["9M"];
		this.modData('Learnsets','pawmi').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','pawmi').learnset.shockwave = ["9M"];
		this.modData('Learnsets','pawmi').learnset.smackdown = ["9M"];
		this.modData('Learnsets','pawmi').learnset.strength = ["9M"];
		delete this.modData('Learnsets','pawmi').learnset.bite;
		// Pawmo
		this.modData('Learnsets','pawmo').learnset.particleslam = ["9D"];
		this.modData('Learnsets','pawmo').learnset.smellingsalts = ["9L17"];
		this.modData('Learnsets','pawmo').learnset.spark = ["9L23"];
		this.modData('Learnsets','pawmo').learnset.thunderwave = ["9L28", "9M"];
		this.modData('Learnsets','pawmo').learnset.entrainment = ["9L32"];
		this.modData('Learnsets','pawmo').learnset.slam = ["9L38"];
		this.modData('Learnsets','pawmo').learnset.discharge = ["9L43"];
		this.modData('Learnsets','pawmo').learnset.agility = ["9L47"];
		this.modData('Learnsets','pawmo').learnset.wildcharge = ["9L53", "9M"];
		this.modData('Learnsets','pawmo').learnset.closecombat = ["9L58"];
		this.modData('Learnsets','pawmo').learnset.afteryou = ["9M"];
		this.modData('Learnsets','pawmo').learnset.assurance = ["9M"];
		this.modData('Learnsets','pawmo').learnset.chipaway = ["9M"];
		this.modData('Learnsets','pawmo').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','pawmo').learnset.electroweb = ["9M"];
		this.modData('Learnsets','pawmo').learnset.flash = ["9M"];
		this.modData('Learnsets','pawmo').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','pawmo').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','pawmo').learnset.metronome = ["9M"];
		this.modData('Learnsets','pawmo').learnset.retaliate = ["9M"];
		this.modData('Learnsets','pawmo').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','pawmo').learnset.shockwave = ["9M"];
		this.modData('Learnsets','pawmo').learnset.smackdown = ["9M"];
		this.modData('Learnsets','pawmo').learnset.strength = ["9M"];
		delete this.modData('Learnsets','pawmo').learnset.bite;
		// Pawmot
		this.modData('Learnsets','pawmot').learnset.particleslam = ["9D"];
		this.modData('Learnsets','pawmot').learnset.smellingsalts = ["9L17"];
		this.modData('Learnsets','pawmot').learnset.spark = ["9L23"];
		this.modData('Learnsets','pawmot').learnset.thunderwave = ["9L28", "9M"];
		this.modData('Learnsets','pawmot').learnset.entrainment = ["9L32"];
		this.modData('Learnsets','pawmot').learnset.slam = ["9L38"];
		this.modData('Learnsets','pawmot').learnset.discharge = ["9L43"];
		this.modData('Learnsets','pawmot').learnset.agility = ["9L47"];
		this.modData('Learnsets','pawmot').learnset.wildcharge = ["9L53", "9M"];
		this.modData('Learnsets','pawmot').learnset.closecombat = ["9L58"];
		this.modData('Learnsets','pawmot').learnset.completeshock = ["9L62"];
		this.modData('Learnsets','pawmot').learnset.afteryou = ["9M"];
		this.modData('Learnsets','pawmot').learnset.assurance = ["9M"];
		this.modData('Learnsets','pawmot').learnset.chipaway = ["9M"];
		this.modData('Learnsets','pawmot').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','pawmot').learnset.electroweb = ["9M"];
		this.modData('Learnsets','pawmot').learnset.flash = ["9M"];
		this.modData('Learnsets','pawmot').learnset.healbell = ["9M"];
		this.modData('Learnsets','pawmot').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','pawmot').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','pawmot').learnset.retaliate = ["9M"];
		this.modData('Learnsets','pawmot').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','pawmot').learnset.shockwave = ["9M"];
		this.modData('Learnsets','pawmot').learnset.smackdown = ["9M"];
		this.modData('Learnsets','pawmot').learnset.strength = ["9M"];
		delete this.modData('Learnsets','pawmot').learnset.bite;
		// Tandemaus
		this.modData('Learnsets','tandemaus').learnset.covet = ["9D"];
		this.modData('Learnsets','tandemaus').learnset.batonpass = ["9L1"];
		this.modData('Learnsets','tandemaus').learnset.afteryou = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.endeavor = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.healbell = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.lastresort = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.recycle = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.retaliate = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.roleplay = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.snatch = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.torment = ["9M"];
		this.modData('Learnsets','tandemaus').learnset.trailhead = ["9M"];
		// Maushold
		this.modData('Learnsets','maushold').learnset.wideguard = ["9D"];
		this.modData('Learnsets','maushold').learnset.batonpass = ["9L1"];
		this.modData('Learnsets','maushold').learnset.afteryou = ["9M"];
		this.modData('Learnsets','maushold').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','maushold').learnset.embargo = ["9M"];
		this.modData('Learnsets','maushold').learnset.endeavor = ["9M"];
		this.modData('Learnsets','maushold').learnset.healbell = ["9M"];
		this.modData('Learnsets','maushold').learnset.lastresort = ["9M"];
		this.modData('Learnsets','maushold').learnset.recycle = ["9M"];
		this.modData('Learnsets','maushold').learnset.retaliate = ["9M"];
		this.modData('Learnsets','maushold').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','maushold').learnset.roleplay = ["9M"];
		this.modData('Learnsets','maushold').learnset.snatch = ["9M"];
		this.modData('Learnsets','maushold').learnset.torment = ["9M"];
		// Fidough
		this.modData('Learnsets','fidough').learnset.acidarmor = ["9D"];
		this.modData('Learnsets','fidough').learnset.pounce = ["9L18"];
		this.modData('Learnsets','fidough').learnset.crunch = ["9L33"];
		this.modData('Learnsets','fidough').learnset.playrough = ["9L40"];
		this.modData('Learnsets','fidough').learnset.afteryou = ["9M"];
		this.modData('Learnsets','fidough').learnset.healbell = ["9M"];
		this.modData('Learnsets','fidough').learnset.lastresort = ["9L45", "9M"];
		this.modData('Learnsets','fidough').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','fidough').learnset.retaliate = ["9M"];
		this.modData('Learnsets','fidough').learnset.workup = ["9L22", "9M"];
		this.modData('Learnsets','fidough').learnset.psychicfang = ["9E"];
		delete this.modData('Learnsets','fidough').learnset.doubleedge;
		// Dachsbun
		this.modData('Learnsets','dachsbun').learnset.flowershield = ["9D"];
		this.modData('Learnsets','dachsbun').learnset.pounce = ["9L18"];
		this.modData('Learnsets','dachsbun').learnset.crunch = ["9L33"];
		this.modData('Learnsets','dachsbun').learnset.playrough = ["9L40"];
		this.modData('Learnsets','dachsbun').learnset.afteryou = ["9M"];
		this.modData('Learnsets','dachsbun').learnset.healbell = ["9M"];
		this.modData('Learnsets','dachsbun').learnset.irontail = ["9M"];
		this.modData('Learnsets','dachsbun').learnset.lastresort = ["9L53", "9M"];
		this.modData('Learnsets','dachsbun').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','dachsbun').learnset.retaliate = ["9M"];
		this.modData('Learnsets','dachsbun').learnset.workup = ["9L22", "9M"];
		delete this.modData('Learnsets','dachsbun').learnset.doubleedge;
		// Smoliv
		this.modData('Learnsets','smoliv').learnset.luckychant = ["9D"];
		this.modData('Learnsets','smoliv').learnset.bestow = ["9L13"];
		this.modData('Learnsets','smoliv').learnset.aromatherapy = ["9L23"];
		this.modData('Learnsets','smoliv').learnset.grassyterrain = ["9L38", "9M"];
		this.modData('Learnsets','smoliv').learnset.afteryou = ["9M"];
		this.modData('Learnsets','smoliv').learnset.healbell = ["9M"];
		this.modData('Learnsets','smoliv').learnset.helpinghand = ["9M"];
		this.modData('Learnsets','smoliv').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','smoliv').learnset.naturepower = ["9M"];
		this.modData('Learnsets','smoliv').learnset.synthesis = ["9M"];
		// Dolliv
		this.modData('Learnsets','dolliv').learnset.luckychant = ["9D"];
		this.modData('Learnsets','dolliv').learnset.bestow = ["9L13"];
		this.modData('Learnsets','dolliv').learnset.aromatherapy = ["9L23"];
		this.modData('Learnsets','dolliv').learnset.grassyterrain = ["9L42", "9M"];
		this.modData('Learnsets','dolliv').learnset.afteryou = ["9M"];
		this.modData('Learnsets','dolliv').learnset.healbell = ["9M"];
		this.modData('Learnsets','dolliv').learnset.helpinghand = ["9M"];
		this.modData('Learnsets','dolliv').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','dolliv').learnset.naturepower = ["9M"];
		this.modData('Learnsets','dolliv').learnset.synthesis = ["9M"];
		// Arboliva
		this.modData('Learnsets','arboliva').learnset.restorelife = ["9D"];
		this.modData('Learnsets','arboliva').learnset.bestow = ["9L13"];
		this.modData('Learnsets','arboliva').learnset.aromatherapy = ["9L23"];
		this.modData('Learnsets','arboliva').learnset.grassyterrain = ["9L46", "9M"];
		this.modData('Learnsets','arboliva').learnset.afteryou = ["9M"];
		this.modData('Learnsets','arboliva').learnset.block = ["9M"];
		this.modData('Learnsets','arboliva').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','arboliva').learnset.healbell = ["9M"];
		this.modData('Learnsets','arboliva').learnset.helpinghand = ["9M"];
		this.modData('Learnsets','arboliva').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','arboliva').learnset.naturepower = ["9M"];
		this.modData('Learnsets','arboliva').learnset.synthesis = ["9M"];
		// Squawkabilly
		this.modData('Learnsets','squawkabilly').learnset.beatup = ["9D"];
		this.modData('Learnsets','squawkabilly').learnset.chatter = ["9E"];
		this.modData('Learnsets','squawkabilly').learnset.mirrormove = ["9E"];
		this.modData('Learnsets','squawkabilly').learnset.defog = ["9M"];
		this.modData('Learnsets','squawkabilly').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','squawkabilly').learnset.embargo = ["9M"];
		this.modData('Learnsets','squawkabilly').learnset.lastresort = ["9M"];
		this.modData('Learnsets','squawkabilly').learnset.payback = ["9M"];
		this.modData('Learnsets','squawkabilly').learnset.roleplay = ["9M"];
		this.modData('Learnsets','squawkabilly').learnset.roost = ["9L47", "9M"];
		this.modData('Learnsets','squawkabilly').learnset.screech = ["9M"];
		this.modData('Learnsets','squawkabilly').learnset.snatch = ["9M"];
		this.modData('Learnsets','squawkabilly').learnset.torment = ["9M"];
		this.modData('Learnsets','squawkabillyblue').learnset = Utils.deepClone(this.modData('Learnsets','squawkabilly').learnset);
		this.modData('Learnsets','squawkabillyyellow').learnset = Utils.deepClone(this.modData('Learnsets','squawkabilly').learnset);
		this.modData('Learnsets','squawkabillywhite').learnset = Utils.deepClone(this.modData('Learnsets','squawkabilly').learnset);
		// Nacli
		this.modData('Learnsets','nacli').learnset.refresh = ["9D"];
		this.modData('Learnsets','nacli').learnset.magnitude = ["9L40"];
		this.modData('Learnsets','nacli').learnset.rockpolish = ["9L13", "9M"];
		delete this.modData('Learnsets','nacli').learnset.earthquake;
		delete this.modData('Learnsets','nacli').learnset.meteorbeam;
		// Naclstack
		this.modData('Learnsets','naclstack').learnset.refresh = ["9D"];
		this.modData('Learnsets','naclstack').learnset.magnitude = ["9L45"];
		this.modData('Learnsets','naclstack').learnset.rockpolish = ["9L13", "9M"];
		this.modData('Learnsets','naclstack').learnset.earthquake = ["9M"];
		this.modData('Learnsets','naclstack').learnset.gravity = ["9M"];
		this.modData('Learnsets','naclstack').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','naclstack').learnset.strength = ["9M"];
		delete this.modData('Learnsets','naclstack').learnset.meteorbeam;
		// Garganacl
		this.modData('Learnsets','garganacl').learnset.refresh = ["9D"];
		this.modData('Learnsets','garganacl').learnset.magnitude = ["9L49"];
		this.modData('Learnsets','garganacl').learnset.rockpolish = ["9L13", "9M"];
		this.modData('Learnsets','garganacl').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','garganacl').learnset.dualchop = ["9M"];
		this.modData('Learnsets','garganacl').learnset.earthquake = ["9M"];
		this.modData('Learnsets','garganacl').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','garganacl').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','garganacl').learnset.strength = ["9M"];
		this.modData('Learnsets','garganacl').learnset.superpower = ["9M"];
		delete this.modData('Learnsets','garganacl').learnset.meteorbeam;
		// Charcadet
		this.modData('Learnsets','charcadet').learnset.tarshot = ["9D"];
		this.modData('Learnsets','charcadet').learnset.assurance = ["9M"];
		this.modData('Learnsets','charcadet').learnset.chipaway = ["9M"];
		this.modData('Learnsets','charcadet').learnset.endeavor = ["9M"];
		this.modData('Learnsets','charcadet').learnset.flash = ["9M"];
		this.modData('Learnsets','charcadet').learnset.incinerate = ["9L28", "9M"];
		this.modData('Learnsets','charcadet').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','charcadet').learnset.retaliate = ["9M"];
		this.modData('Learnsets','charcadet').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','charcadet').learnset.meditate = ["9E"];
		this.modData('Learnsets','charcadet').learnset.temperflare = ["9E"];
		// Armarouge
		this.modData('Learnsets','armarouge').learnset.aurasphere = ["9D"];
		this.modData('Learnsets','armarouge').learnset.psybeam = ["9L0"];
		this.modData('Learnsets','armarouge').learnset.pelletshot = ["9L1"];
		this.modData('Learnsets','armarouge').learnset.barrierbash = ["9L1"];
		this.modData('Learnsets','armarouge').learnset.psyshock = ["9L56", "9M"];
		this.modData('Learnsets','armarouge').learnset.allyswitch = ["9L42", "9M"];
		this.modData('Learnsets','armarouge').learnset.assurance = ["9M"];
		this.modData('Learnsets','armarouge').learnset.chipaway = ["9M"];
		this.modData('Learnsets','armarouge').learnset.endeavor = ["9M"];
		this.modData('Learnsets','armarouge').learnset.flash = ["9M"];
		this.modData('Learnsets','armarouge').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','armarouge').learnset.incinerate = ["9L28", "9M"];
		this.modData('Learnsets','armarouge').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','armarouge').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','armarouge').learnset.retaliate = ["9M"];
		this.modData('Learnsets','armarouge').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','armarouge').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','armarouge').learnset.telekinesis = ["9M"];
		delete this.modData('Learnsets','armarouge').learnset.meteorbeam;
		// Ceruledge
		this.modData('Learnsets','ceruledge').learnset.furycutter = ["9D"];
		this.modData('Learnsets','ceruledge').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.assurance = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.chipaway = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.compensation = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.endeavor = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.flash = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.incinerate = ["9L28", "9M"];
		this.modData('Learnsets','ceruledge').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.lastresort = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.nightmare = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.payback = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.retaliate = ["9M"];
		this.modData('Learnsets','ceruledge').learnset.rocksmash = ["9M"];
		delete this.modData('Learnsets','ceruledge').learnset.poltergeist;
		// Tadbulb
		this.modData('Learnsets','tadbulb').learnset.confuseray = ["9D"];
		this.modData('Learnsets','tadbulb').learnset.afteryou = ["9M"];
		this.modData('Learnsets','tadbulb').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','tadbulb').learnset.electroweb = ["9M"];
		this.modData('Learnsets','tadbulb').learnset.flash = ["9M"];
		this.modData('Learnsets','tadbulb').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','tadbulb').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','tadbulb').learnset.painsplit = ["9M"];
		this.modData('Learnsets','tadbulb').learnset.shockwave = ["9M"];
		this.modData('Learnsets','tadbulb').learnset.signalbeam = ["9M"];
		// Bellibolt
		this.modData('Learnsets','bellibolt').learnset.confuseray = ["9D"];
		this.modData('Learnsets','bellibolt').learnset.afteryou = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.block = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.bounce = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.electroweb = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.explosion = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.flash = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.painsplit = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.shockwave = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.sludgewave = ["9M"];
		this.modData('Learnsets','bellibolt').learnset.strength = ["9M"];
		// Wattrel
		this.modData('Learnsets','wattrel').learnset.brine = ["9D"];
		this.modData('Learnsets','wattrel').learnset.aircutter = ["9L27"];
		this.modData('Learnsets','wattrel').learnset.defog = ["9M"];
		this.modData('Learnsets','wattrel').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','wattrel').learnset.electroweb = ["9M"];
		this.modData('Learnsets','wattrel').learnset.roost = ["9L23", "9M"];
		this.modData('Learnsets','wattrel').learnset.shockwave = ["9M"];
		this.modData('Learnsets','wattrel').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','wattrel').learnset.skyattack = ["9M"];
		// Kilowattrel
		this.modData('Learnsets','kilowattrel').learnset.brine = ["9D"];
		this.modData('Learnsets','kilowattrel').learnset.aircutter = ["9L30"];
		this.modData('Learnsets','kilowattrel').learnset.defog = ["9M"];
		this.modData('Learnsets','kilowattrel').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','kilowattrel').learnset.electroweb = ["9M"];
		this.modData('Learnsets','kilowattrel').learnset.roost = ["9L23", "9M"];
		this.modData('Learnsets','kilowattrel').learnset.shockwave = ["9M"];
		this.modData('Learnsets','kilowattrel').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','kilowattrel').learnset.skyattack = ["9M"];
		// Maschiff
		this.modData('Learnsets','maschiff').learnset.powertrip = ["9D"];
		this.modData('Learnsets','maschiff').learnset.assurance = ["9M"];
		this.modData('Learnsets','maschiff').learnset.chipaway = ["9M"];
		this.modData('Learnsets','maschiff').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','maschiff').learnset.embargo = ["9M"];
		this.modData('Learnsets','maschiff').learnset.honeclaws = ["9L10", "9M"];
		this.modData('Learnsets','maschiff').learnset.irontail = ["9M"];
		this.modData('Learnsets','maschiff').learnset.knockoff = ["9M"];
		this.modData('Learnsets','maschiff').learnset.lastresort = ["9M"];
		this.modData('Learnsets','maschiff').learnset.nightmare = ["9M"];
		this.modData('Learnsets','maschiff').learnset.payback = ["9L26", "9M"];
		this.modData('Learnsets','maschiff').learnset.psychup = ["9M"];
		this.modData('Learnsets','maschiff').learnset.retaliate = ["9M"];
		this.modData('Learnsets','maschiff').learnset.roleplay = ["9M"];
		this.modData('Learnsets','maschiff').learnset.screech = ["9M"];
		this.modData('Learnsets','maschiff').learnset.strength = ["9M"];
		this.modData('Learnsets','maschiff').learnset.pursuit = ["9E"];
		// Mabosstiff
		this.modData('Learnsets','mabosstiff').learnset.powertrip = ["9D"];
		this.modData('Learnsets','mabosstiff').learnset.assurance = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.chipaway = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.embargo = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.honeclaws = ["9L10", "9M"];
		this.modData('Learnsets','mabosstiff').learnset.irontail = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.knockoff = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.lastresort = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.nightmare = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.payback = ["9L26", "9M"];
		this.modData('Learnsets','mabosstiff').learnset.psychup = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.quash = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.retaliate = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.roleplay = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.screech = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.strength = ["9M"];
		this.modData('Learnsets','mabosstiff').learnset.superpower = ["9M"];
		// Shroodle
		this.modData('Learnsets','shroodle').learnset.venomdrench = ["9D"];
		this.modData('Learnsets','shroodle').learnset.spite = ["9M"];
		this.modData('Learnsets','shroodle').learnset.torment = ["9M"];
		delete this.modData('Learnsets','shroodle').learnset.metronome;
		// Grafaiai
		this.modData('Learnsets','grafaiai').learnset.sketch = ["9D"];
		this.modData('Learnsets','grafaiai').learnset.toxicthread = ["9L0"];
		this.modData('Learnsets','grafaiai').learnset.assurance = ["9M"];
		this.modData('Learnsets','grafaiai').learnset.irontail = ["9M"];
		this.modData('Learnsets','grafaiai').learnset.roleplay = ["9M"];
		this.modData('Learnsets','grafaiai').learnset.sludgewave = ["9M"];
		this.modData('Learnsets','grafaiai').learnset.snatch = ["9M"];
		this.modData('Learnsets','grafaiai').learnset.spite = ["9M"];
		this.modData('Learnsets','grafaiai').learnset.torment = ["9M"];
		// Bramblin
		this.modData('Learnsets','bramblin').learnset.spikyshield = ["9D"];
		this.modData('Learnsets','bramblin').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','bramblin').learnset.nightmare = ["9M"];
		this.modData('Learnsets','bramblin').learnset.painsplit = ["9L50", "9M"];
		this.modData('Learnsets','bramblin').learnset.payback = ["9M"];
		this.modData('Learnsets','bramblin').learnset.spikes = ["9E"];
		// Brambleghast
		this.modData('Learnsets','brambleghast').learnset.spikyshield = ["9D"];
		this.modData('Learnsets','brambleghast').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','brambleghast').learnset.nightmare = ["9M"];
		this.modData('Learnsets','brambleghast').learnset.painsplit = ["9L50", "9M"];
		this.modData('Learnsets','brambleghast').learnset.payback = ["9M"];
		// Toedscool
		this.modData('Learnsets','toedscool').learnset.doublekick = ["9D"];
		this.modData('Learnsets','toedscool').learnset.bounce = ["9M"];
		this.modData('Learnsets','toedscool').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','toedscool').learnset.naturepower = ["9M"];
		this.modData('Learnsets','toedscool').learnset.screech = ["9L37", "9M"];
		this.modData('Learnsets','toedscool').learnset.spite = ["9M"];
		this.modData('Learnsets','toedscool').learnset.toxic = ["9M"];
		// Toedscruel
		this.modData('Learnsets','toedscruel').learnset.lashout = ["9D"];
		this.modData('Learnsets','toedscruel').learnset.bounce = ["9M"];
		this.modData('Learnsets','toedscruel').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','toedscruel').learnset.naturepower = ["9M"];
		this.modData('Learnsets','toedscruel').learnset.screech = ["9L37", "9M"];
		this.modData('Learnsets','toedscruel').learnset.toxic = ["9M"];
		// Klawf
		this.modData('Learnsets','klawf').learnset.mimic = ["9D"];
		this.modData('Learnsets','klawf').learnset.rockclimb = ["9L33"];
		this.modData('Learnsets','klawf').learnset.ambush = ["9L47"];
		this.modData('Learnsets','klawf').learnset.chipaway = ["9M"];
		this.modData('Learnsets','klawf').learnset.dualchop = ["9M"];
		this.modData('Learnsets','klawf').learnset.endeavor = ["9M"];
		this.modData('Learnsets','klawf').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','klawf').learnset.payback = ["9M"];
		this.modData('Learnsets','klawf').learnset.rocksmash = ["9L9", "9M"];
		this.modData('Learnsets','klawf').learnset.roleplay = ["9M"];
		this.modData('Learnsets','klawf').learnset.strength = ["9M"];
		this.modData('Learnsets','klawf').learnset.superpower = ["9M"];
		this.modData('Learnsets','klawf').learnset.swordsdance = ["9M"];
		delete this.modData('Learnsets','klawf').learnset.highhorsepower;
		delete this.modData('Learnsets','klawf').learnset.meteorbeam;
		// Capsakid
		this.modData('Learnsets','capsakid').learnset.rage = ["9D"];
		this.modData('Learnsets','capsakid').learnset.compensation = ["9M"];
		this.modData('Learnsets','capsakid').learnset.endeavor = ["9M"];
		this.modData('Learnsets','capsakid').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','capsakid').learnset.psychup = ["9M"];
		this.modData('Learnsets','capsakid').learnset.synthesis = ["9M"];
		this.modData('Learnsets','capsakid').learnset.torment = ["9M"];
		// Scovillain
		this.modData('Learnsets','scovillain').learnset.rage = ["9D"];
		this.modData('Learnsets','scovillain').learnset.incinerate = ["9L0", "9M"];
		this.modData('Learnsets','scovillain').learnset.ember = ["9L1"];
		this.modData('Learnsets','scovillain').learnset.firefang = ["9L13"];
		this.modData('Learnsets','scovillain').learnset.temperflare = ["9L21"];
		this.modData('Learnsets','scovillain').learnset.flamethrower = ["9L44", "9M"];
		this.modData('Learnsets','scovillain').learnset.endeavor = ["9M"];
		this.modData('Learnsets','scovillain').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','scovillain').learnset.psychup = ["9M"];
		this.modData('Learnsets','scovillain').learnset.synthesis = ["9M"];
		this.modData('Learnsets','scovillain').learnset.torment = ["9M"];
		// Rellor
		this.modData('Learnsets','rellor').learnset.powertrick = ["9D"];
		this.modData('Learnsets','rellor').learnset.steamroller = ["9L35"];
		this.modData('Learnsets','rellor').learnset.electroweb = ["9M"];
		this.modData('Learnsets','rellor').learnset.infestation = ["9M"];
		this.modData('Learnsets','rellor').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','rellor').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','rellor').learnset.naturepower = ["9M"];
		this.modData('Learnsets','rellor').learnset.recycle = ["9M"];
		this.modData('Learnsets','rellor').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','rellor').learnset.smackdown = ["9M"];
		delete this.modData('Learnsets','rellor').learnset.lunge;
		// Rabsca
		this.modData('Learnsets','rabsca').learnset.topsyturvy = ["9D"];
		this.modData('Learnsets','rabsca').learnset.steamroller = ["9L35"];
		this.modData('Learnsets','rabsca').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','rabsca').learnset.electroweb = ["9M"];
		this.modData('Learnsets','rabsca').learnset.dreameater = ["9M"];
		this.modData('Learnsets','rabsca').learnset.flash = ["9M"];
		this.modData('Learnsets','rabsca').learnset.futuresight = ["9M"];
		this.modData('Learnsets','rabsca').learnset.infestation = ["9M"];
		this.modData('Learnsets','rabsca').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','rabsca').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','rabsca').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','rabsca').learnset.naturepower = ["9M"];
		this.modData('Learnsets','rabsca').learnset.nightmare = ["9M"];
		this.modData('Learnsets','rabsca').learnset.psychup = ["9M"];
		this.modData('Learnsets','rabsca').learnset.recycle = ["9M"];
		this.modData('Learnsets','rabsca').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','rabsca').learnset.smackdown = ["9M"];
		this.modData('Learnsets','rabsca').learnset.stasis = ["9M"];
		this.modData('Learnsets','rabsca').learnset.telekinesis = ["9M"];
		delete this.modData('Learnsets','rabsca').learnset.lunge;
		delete this.modData('Learnsets','rabsca').learnset.poltergeist;
		// Flittle
		this.modData('Learnsets','flittle').learnset.teeterdance = ["9D"];
		this.modData('Learnsets','flittle').learnset.uproar = ["9L34", "9M"];
		this.modData('Learnsets','flittle').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','flittle').learnset.dreameater = ["9M"];
		this.modData('Learnsets','flittle').learnset.flash = ["9M"];
		this.modData('Learnsets','flittle').learnset.gravity = ["9M"];
		this.modData('Learnsets','flittle').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','flittle').learnset.psychup = ["9M"];
		this.modData('Learnsets','flittle').learnset.roleplay = ["9M"];
		this.modData('Learnsets','flittle').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','flittle').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','flittle').learnset.alluringvoice = ["9E"];
		delete this.modData('Learnsets','flittle').learnset.roost;
		// Espathra
		this.modData('Learnsets','espathra').learnset.lusterpurge = ["9D"];
		this.modData('Learnsets','espathra').learnset.storedpower = ["9L0"];
		this.modData('Learnsets','espathra').learnset.uproar = ["9L34", "9M"];
		this.modData('Learnsets','espathra').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','espathra').learnset.bounce = ["9M"];
		this.modData('Learnsets','espathra').learnset.defog = ["9M"];
		this.modData('Learnsets','espathra').learnset.dreameater = ["9M"];
		this.modData('Learnsets','espathra').learnset.flash = ["9M"];
		this.modData('Learnsets','espathra').learnset.futuresight = ["9M"];
		this.modData('Learnsets','espathra').learnset.gravity = ["9M"];
		this.modData('Learnsets','espathra').learnset.irontail = ["9M"];
		this.modData('Learnsets','espathra').learnset.lastresort = ["9M"];
		this.modData('Learnsets','espathra').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','espathra').learnset.psychup = ["9M"];
		this.modData('Learnsets','espathra').learnset.roleplay = ["9M"];
		this.modData('Learnsets','espathra').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','espathra').learnset.skyattack = ["9M"];
		this.modData('Learnsets','espathra').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','espathra').learnset.trailhead = ["9M"];
		delete this.modData('Learnsets','espathra').learnset.roost;
		// Tinkatink
		this.modData('Learnsets','tinkatink').learnset.gyroball = ["9D"];
		this.modData('Learnsets','tinkatink').learnset.bash = ["9L8"];
		this.modData('Learnsets','tinkatink').learnset.swing = ["9L21"];
		this.modData('Learnsets','tinkatink').learnset.sweetkiss = ["9L24"];
		this.modData('Learnsets','tinkatink').learnset.brutalswing = ["9L27", "9M"];
		this.modData('Learnsets','tinkatink').learnset.slam = ["9L30"];
		this.modData('Learnsets','tinkatink').learnset.flashcannon = ["9L33", "9M"];
		this.modData('Learnsets','tinkatink').learnset.playrough = ["9L36"];
		this.modData('Learnsets','tinkatink').learnset.fakeout = ["9L39"];
		this.modData('Learnsets','tinkatink').learnset.flatter = ["9L42"];
		this.modData('Learnsets','tinkatink').learnset.recycle = ["9M"];
		this.modData('Learnsets','tinkatink').learnset.rocksmash = ["9L14", "9M"];
		this.modData('Learnsets','tinkatink').learnset.snatch = ["9M"];
		delete this.modData('Learnsets','tinkatink').learnset.metalclaw;
		// Tinkatuff
		this.modData('Learnsets','tinkatuff').learnset.gyroball = ["9D"];
		this.modData('Learnsets','tinkatuff').learnset.bash = ["9L8"];
		this.modData('Learnsets','tinkatuff').learnset.sweetkiss = ["9L21"];
		this.modData('Learnsets','tinkatuff').learnset.brutalswing = ["9L24", "9M"];
		this.modData('Learnsets','tinkatuff').learnset.slam = ["9L28"];
		this.modData('Learnsets','tinkatuff').learnset.flashcannon = ["9L32", "9M"];
		this.modData('Learnsets','tinkatuff').learnset.playrough = ["9L36"];
		this.modData('Learnsets','tinkatuff').learnset.fakeout = ["9L40"];
		this.modData('Learnsets','tinkatuff').learnset.flatter = ["9L44"];
		this.modData('Learnsets','tinkatuff').learnset.assurance = ["9M"];
		this.modData('Learnsets','tinkatuff').learnset.chipaway = ["9M"];
		this.modData('Learnsets','tinkatuff').learnset.endeavor = ["9M"];
		this.modData('Learnsets','tinkatuff').learnset.payback = ["9M"];
		this.modData('Learnsets','tinkatuff').learnset.recycle = ["9M"];
		this.modData('Learnsets','tinkatuff').learnset.rocksmash = ["9L14", "9M"];
		this.modData('Learnsets','tinkatuff').learnset.snatch = ["9M"];
		this.modData('Learnsets','tinkatuff').learnset.strength = ["9M"];
		delete this.modData('Learnsets','tinkatuff').learnset.metalclaw;
		// Tinkaton
		this.modData('Learnsets','tinkaton').learnset.gyroball = ["9D"];
		this.modData('Learnsets','tinkaton').learnset.bash = ["9L8"];
		this.modData('Learnsets','tinkaton').learnset.sweetkiss = ["9L21"];
		this.modData('Learnsets','tinkaton').learnset.brutalswing = ["9L24", "9M"];
		this.modData('Learnsets','tinkaton').learnset.slam = ["9L28"];
		this.modData('Learnsets','tinkaton').learnset.flashcannon = ["9L32", "9M"];
		this.modData('Learnsets','tinkaton').learnset.playrough = ["9L36"];
		this.modData('Learnsets','tinkaton').learnset.fakeout = ["9L41"];
		this.modData('Learnsets','tinkaton').learnset.flatter = ["9L46"];
		this.modData('Learnsets','tinkaton').learnset.assurance = ["9M"];
		this.modData('Learnsets','tinkaton').learnset.chipaway = ["9M"];
		this.modData('Learnsets','tinkaton').learnset.endeavor = ["9M"];
		this.modData('Learnsets','tinkaton').learnset.payback = ["9M"];
		this.modData('Learnsets','tinkaton').learnset.recycle = ["9M"];
		this.modData('Learnsets','tinkaton').learnset.rocksmash = ["9L14", "9M"];
		this.modData('Learnsets','tinkaton').learnset.snatch = ["9M"];
		this.modData('Learnsets','tinkaton').learnset.strength = ["9M"];
		this.modData('Learnsets','tinkaton').learnset.superpower = ["9M"];
		delete this.modData('Learnsets','tinkaton').learnset.metalclaw;
		// Wiglett
		this.modData('Learnsets','wiglett').learnset.minimize = ["9D"];
		this.modData('Learnsets','wiglett').learnset.slipaway = ["9L46"];
		this.modData('Learnsets','wiglett').learnset.brine = ["9M"];
		this.modData('Learnsets','wiglett').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','wiglett').learnset.knockoff = ["9M"];
		this.modData('Learnsets','wiglett').learnset.scald = ["9M"];
		this.modData('Learnsets','wiglett').learnset.screech = ["9M"];
		this.modData('Learnsets','wiglett').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','wiglett').learnset.blizzard;
		// Wugtrio
		this.modData('Learnsets','wugtrio').learnset.minimize = ["9D"];
		this.modData('Learnsets','wugtrio').learnset.slipaway = ["9L58"];
		this.modData('Learnsets','wugtrio').learnset.brine = ["9M"];
		this.modData('Learnsets','wugtrio').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','wugtrio').learnset.knockoff = ["9M"];
		this.modData('Learnsets','wugtrio').learnset.rockslide = ["9M"];
		this.modData('Learnsets','wugtrio').learnset.scald = ["9M"];
		this.modData('Learnsets','wugtrio').learnset.screech = ["9M"];
		this.modData('Learnsets','wugtrio').learnset.sludgewave = ["9M"];
		this.modData('Learnsets','wugtrio').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','wugtrio').learnset.blizzard;
		// Bombirdier
		this.modData('Learnsets','bombirdier').learnset.eggbomb = ["9D"];
		this.modData('Learnsets','bombirdier').learnset.skydrop = ["9L42"];
		this.modData('Learnsets','bombirdier').learnset.assurance = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.defog = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.embargo = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.honeclaws = ["9L1", "9M"];
		this.modData('Learnsets','bombirdier').learnset.payback = ["9L36", "9M"];
		this.modData('Learnsets','bombirdier').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.roost = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.skyattack = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.smackdown = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.snatch = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.strength = ["9M"];
		this.modData('Learnsets','bombirdier').learnset.torment = ["9L24", "9M"];
		// Finizen
		this.modData('Learnsets','finizen').learnset.aquaring = ["9D"];
		this.modData('Learnsets','finizen').learnset.afteryou = ["9M"];
		this.modData('Learnsets','finizen').learnset.bounce = ["9M"];
		this.modData('Learnsets','finizen').learnset.brine = ["9M"];
		this.modData('Learnsets','finizen').learnset.dive = ["9L21", "9M"];
		this.modData('Learnsets','finizen').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','finizen').learnset.irontail = ["9M"];
		this.modData('Learnsets','finizen').learnset.scald = ["9M"];
		this.modData('Learnsets','finizen').learnset.screech = ["9M"];
		this.modData('Learnsets','finizen').learnset.whirlpool = ["9M"];
		this.modData('Learnsets','finizen').learnset.chatter = ["9E"];
		delete this.modData('Learnsets','finizen').learnset.blizzard;
		delete this.modData('Learnsets','finizen').learnset.boomburst;
		// Palafin
		this.modData('Learnsets','palafin').learnset.poweruppunch = ["9D"];
		this.modData('Learnsets','palafin').learnset.jetpunch = ["9L0"];
		this.modData('Learnsets','palafin').learnset.afteryou = ["9M"];
		this.modData('Learnsets','palafin').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','palafin').learnset.bounce = ["9M"];
		this.modData('Learnsets','palafin').learnset.brine = ["9M"];
		this.modData('Learnsets','palafin').learnset.dive = ["9M"];
		this.modData('Learnsets','palafin').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','palafin').learnset.irontail = ["9M"];
		this.modData('Learnsets','palafin').learnset.retaliate = ["9M"];
		this.modData('Learnsets','palafin').learnset.scald = ["9M"];
		this.modData('Learnsets','palafin').learnset.screech = ["9M"];
		this.modData('Learnsets','palafin').learnset.strength = ["9M"];
		this.modData('Learnsets','palafin').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','palafin').learnset.blizzard;
		// Varoom
		this.modData('Learnsets','varoom').learnset.tarshot = ["9D"];
		this.modData('Learnsets','varoom').learnset.assurance = ["9L10", "9M"];
		this.modData('Learnsets','varoom').learnset.endeavor = ["9M"];
		this.modData('Learnsets','varoom').learnset.explosion = ["9M"];
		this.modData('Learnsets','varoom').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','varoom').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','varoom').learnset.nightmare = ["9M"];
		this.modData('Learnsets','varoom').learnset.payback = ["9M"];
		this.modData('Learnsets','varoom').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','varoom').learnset.screech = ["9L25", "9M"];
		this.modData('Learnsets','varoom').learnset.spite = ["9M"];
		this.modData('Learnsets','varoom').learnset.torment = ["9M"];
		this.modData('Learnsets','varoom').learnset.highhorsepower = ["9E"];
		this.modData('Learnsets','varoom').learnset.metalsound = ["9E"];
		delete this.modData('Learnsets','varoom').learnset.partingshot;
		// Revavroom
		this.modData('Learnsets','revavroom').learnset.tarshot = ["9D"];
		this.modData('Learnsets','revavroom').learnset.endeavor = ["9M"];
		this.modData('Learnsets','revavroom').learnset.explosion = ["9M"];
		this.modData('Learnsets','revavroom').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','revavroom').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','revavroom').learnset.nightmare = ["9M"];
		this.modData('Learnsets','revavroom').learnset.payback = ["9M"];
		this.modData('Learnsets','revavroom').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','revavroom').learnset.screech = ["9L25", "9M"];
		this.modData('Learnsets','revavroom').learnset.spite = ["9M"];
		this.modData('Learnsets','revavroom').learnset.strength = ["9M"];
		this.modData('Learnsets','revavroom').learnset.torment = ["9M"];
		// Revavroom Segin Mod
		this.modData('Learnsets','revavroomsegin').learnset.wickedtorque = ["9R"];
		this.modData('Learnsets','revavroomsegin').learnset.partingshot = ["9L1"];
		this.modData('Learnsets','revavroomsegin').learnset.pursuit = ["9L4"];
		this.modData('Learnsets','revavroomsegin').learnset.snarl = ["9L13", "9M"];
		this.modData('Learnsets','revavroomsegin').learnset.crunch = ["9L36"];
		this.modData('Learnsets','revavroomsegin').learnset.powertrip = ["9L58"];
		// Revavroom Schedar Mod
		this.modData('Learnsets','revavroomschedar').learnset.blazingtorque = ["9R"];
		this.modData('Learnsets','revavroomschedar').learnset.preheat = ["9L1"];
		this.modData('Learnsets','revavroomschedar').learnset.ember = ["9L4"];
		this.modData('Learnsets','revavroomschedar').learnset.flamecharge = ["9L13", "9M"];
		this.modData('Learnsets','revavroomschedar').learnset.heatwave = ["9L36", "9M"];
		this.modData('Learnsets','revavroomschedar').learnset.heatcrash = ["9L58"];
		// Revavroom Navi Mod
		this.modData('Learnsets','revavroomnavi').learnset.noxioustorque = ["9R"];
		this.modData('Learnsets','revavroomnavi').learnset.toxicspikes = ["9L1"];
		this.modData('Learnsets','revavroomnavi').learnset.clearsmog = ["9L4"];
		this.modData('Learnsets','revavroomnavi').learnset.poisonfang = ["9L13"];
		this.modData('Learnsets','revavroomnavi').learnset.sludgewave = ["9L36", "9M"];
		this.modData('Learnsets','revavroomnavi').learnset.mortalstrike = ["9L58"];
		// Revavroom Ruchbah Mod
		this.modData('Learnsets','revavroomruchbah').learnset.magicaltorque = ["9R"];
		this.modData('Learnsets','revavroomruchbah').learnset.craftyshield = ["9L1"];
		this.modData('Learnsets','revavroomruchbah').learnset.disarmingvoice = ["9L4"];
		this.modData('Learnsets','revavroomruchbah').learnset.pounce = ["9L13"];
		this.modData('Learnsets','revavroomruchbah').learnset.strangesmoke = ["9L36"];
		this.modData('Learnsets','revavroomruchbah').learnset.spiritbreak = ["9L58"];
		// Revavroom Caph Mod
		this.modData('Learnsets','revavroomcaph').learnset.combattorque = ["9R"];
		this.modData('Learnsets','revavroomcaph').learnset.bulkup = ["9L1", "9M"];
		this.modData('Learnsets','revavroomcaph').learnset.counter = ["9L4"];
		this.modData('Learnsets','revavroomcaph').learnset.reversal = ["9L13"];
		this.modData('Learnsets','revavroomcaph').learnset.bodypress = ["9L36", "9M"];
		this.modData('Learnsets','revavroomcaph').learnset.superpower = ["9L58", "9M"];
		// Cyclizar
		this.modData('Learnsets','cyclizar').learnset.extremespeed = ["9D"];
		this.modData('Learnsets','cyclizar').learnset.agility = ["9L31"];
		this.modData('Learnsets','cyclizar').learnset.autotomize = ["9L40"];
		this.modData('Learnsets','cyclizar').learnset.afteryou = ["9M"];
		this.modData('Learnsets','cyclizar').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','cyclizar').learnset.chipaway = ["9M"];
		this.modData('Learnsets','cyclizar').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','cyclizar').learnset.endeavor = ["9M"];
		this.modData('Learnsets','cyclizar').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','cyclizar').learnset.irontail = ["9M"];
		this.modData('Learnsets','cyclizar').learnset.screech = ["9M"];
		this.modData('Learnsets','cyclizar').learnset.bodyslam = ["9E"];
		this.modData('Learnsets','cyclizar').learnset.crunch = ["9E"];
		this.modData('Learnsets','cyclizar').learnset.firefang = ["9E"];
		this.modData('Learnsets','cyclizar').learnset.takedown = ["9E"];
		this.modData('Learnsets','cyclizar').learnset.thunderfang = ["9E"];
		delete this.modData('Learnsets','cyclizar').learnset.shiftgear;
		// Orthworm
		this.modData('Learnsets','orthworm').learnset.submission = ["9D"];
		this.modData('Learnsets','orthworm').learnset.bash = ["9L7"];
		this.modData('Learnsets','orthworm').learnset.irondefense = ["9L26", "9M"];
		this.modData('Learnsets','orthworm').learnset.autotomize = ["9L38"];
		this.modData('Learnsets','orthworm').learnset.escapetunnel = ["9L52"];
		this.modData('Learnsets','orthworm').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','orthworm').learnset.gravity = ["9M"];
		this.modData('Learnsets','orthworm').learnset.irontail = ["9L43", "9M"];
		this.modData('Learnsets','orthworm').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','orthworm').learnset.naturepower = ["9M"];
		this.modData('Learnsets','orthworm').learnset.roar = ["9M"];
		this.modData('Learnsets','orthworm').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','orthworm').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','orthworm').learnset.screech = ["9M"];
		this.modData('Learnsets','orthworm').learnset.strength = ["9M"];
		this.modData('Learnsets','orthworm').learnset.superpower = ["9M"];
		delete this.modData('Learnsets','orthworm').learnset.mudslap;
		delete this.modData('Learnsets','orthworm').learnset.takedown;
		// Glimmet
		this.modData('Learnsets','glimmet').learnset.growth = ["9D"];
		this.modData('Learnsets','glimmet').learnset.rockpolish = ["9L15", "9M"];
		this.modData('Learnsets','glimmet').learnset.explosion = ["9M"];
		this.modData('Learnsets','glimmet').learnset.flash = ["9M"];
		this.modData('Learnsets','glimmet').learnset.naturepower = ["9M"];
		this.modData('Learnsets','glimmet').learnset.signalbeam = ["9M"];
		// Glimmora
		this.modData('Learnsets','glimmora').learnset.growth = ["9D"];
		this.modData('Learnsets','glimmora').learnset.rapidspin = ["9L0"];
		this.modData('Learnsets','glimmora').learnset.bunkerdown = ["9L1"];
		this.modData('Learnsets','glimmora').learnset.rockpolish = ["9L15", "9M"];
		this.modData('Learnsets','glimmora').learnset.explosion = ["9M"];
		this.modData('Learnsets','glimmora').learnset.flash = ["9M"];
		this.modData('Learnsets','glimmora').learnset.naturepower = ["9M"];
		this.modData('Learnsets','glimmora').learnset.signalbeam = ["9M"];
		delete this.modData('Learnsets','glimmora').learnset.spikyshield;
		// Greavard
		this.modData('Learnsets','greavard').learnset.vengefulspirit = ["9D"];
		this.modData('Learnsets','greavard').learnset.phantomforce = ["9L32", "9M"];
		this.modData('Learnsets','greavard').learnset.playdead = ["9L37"];
		this.modData('Learnsets','greavard').learnset.shadowbone = ["9L41"];
		this.modData('Learnsets','greavard').learnset.playrough = ["9L52"];
		this.modData('Learnsets','greavard').learnset.dreameater = ["9M"];
		this.modData('Learnsets','greavard').learnset.helpinghand = ["9M"];
		this.modData('Learnsets','greavard').learnset.irontail = ["9M"];
		this.modData('Learnsets','greavard').learnset.nightmare = ["9M"];
		this.modData('Learnsets','greavard').learnset.painsplit = ["9M"];
		this.modData('Learnsets','greavard').learnset.retaliate = ["9M"];
		this.modData('Learnsets','greavard').learnset.spite = ["9M"];
		delete this.modData('Learnsets','greavard').learnset.doubleedge;
		// Houndstone
		this.modData('Learnsets','houndstone').learnset.vengefulspirit = ["9D"];
		this.modData('Learnsets','houndstone').learnset.phantomforce = ["9L36"];
		this.modData('Learnsets','houndstone').learnset.playdead = ["9L41"];
		this.modData('Learnsets','houndstone').learnset.shadowbone = ["9L46"];
		this.modData('Learnsets','houndstone').learnset.playrough = ["9L58"];
		this.modData('Learnsets','houndstone').learnset.dreameater = ["9M"];
		this.modData('Learnsets','houndstone').learnset.healbell = ["9M"];
		this.modData('Learnsets','houndstone').learnset.helpinghand = ["9M"];
		this.modData('Learnsets','houndstone').learnset.irontail = ["9M"];
		this.modData('Learnsets','houndstone').learnset.nightmare = ["9M"];
		this.modData('Learnsets','houndstone').learnset.painsplit = ["9M"];
		this.modData('Learnsets','houndstone').learnset.retaliate = ["9M"];
		this.modData('Learnsets','houndstone').learnset.spite = ["9M"];
		delete this.modData('Learnsets','houndstone').learnset.doubleedge;
		// Flamigo
		this.modData('Learnsets','flamigo').learnset.highjumpkick = ["9D"];
		this.modData('Learnsets','flamigo').learnset.jumpkick = ["9L39"];
		this.modData('Learnsets','flamigo').learnset.afteryou = ["9M"];
		this.modData('Learnsets','flamigo').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','flamigo').learnset.defog = ["9M"];
		this.modData('Learnsets','flamigo').learnset.payback = ["9L27", "9M"];
		this.modData('Learnsets','flamigo').learnset.retaliate = ["9M"];
		this.modData('Learnsets','flamigo').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','flamigo').learnset.roleplay = ["9M"];
		this.modData('Learnsets','flamigo').learnset.roost = ["9L31", "9M"];
		this.modData('Learnsets','flamigo').learnset.screech = ["9M"];
		this.modData('Learnsets','flamigo').learnset.skyattack = ["9M"];
		delete this.modData('Learnsets','flamigo').learnset.megakick;
		// Cetoddle
		this.modData('Learnsets','cetoddle').learnset.rebound = ["9D"];
		this.modData('Learnsets','cetoddle').learnset.blizzard = ["9L44", "9M"];
		this.modData('Learnsets','cetoddle').learnset.snowtumble = ["9L53"];
		this.modData('Learnsets','cetoddle').learnset.auroraveil = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.bounce = ["9L31", "9M"];
		this.modData('Learnsets','cetoddle').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.dualchop = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.echoedvoice = ["9L9", "9M"];
		this.modData('Learnsets','cetoddle').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.gyroball = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.irontail = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.roar = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.screech = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','cetoddle').learnset.strength = ["9M"];
		delete this.modData('Learnsets','cetoddle').learnset.earthquake;
		// Cetitan
		this.modData('Learnsets','cetitan').learnset.rebound = ["9D"];
		this.modData('Learnsets','cetitan').learnset.blizzard = ["9L44", "9M"];
		this.modData('Learnsets','cetitan').learnset.snowtumble = ["9L53"];
		this.modData('Learnsets','cetitan').learnset.auroraveil = ["9M"];
		this.modData('Learnsets','cetitan').learnset.bounce = ["9L31", "9M"];
		this.modData('Learnsets','cetitan').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','cetitan').learnset.dualchop = ["9M"];
		this.modData('Learnsets','cetitan').learnset.echoedvoice = ["9L9", "9M"];
		this.modData('Learnsets','cetitan').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','cetitan').learnset.gyroball = ["9M"];
		this.modData('Learnsets','cetitan').learnset.irontail = ["9M"];
		this.modData('Learnsets','cetitan').learnset.roar = ["9M"];
		this.modData('Learnsets','cetitan').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','cetitan').learnset.screech = ["9M"];
		this.modData('Learnsets','cetitan').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','cetitan').learnset.strength = ["9M"];
		this.modData('Learnsets','cetitan').learnset.superpower = ["9M"];
		// Veluza
		this.modData('Learnsets','veluza').learnset.sharpen = ["9D"];
		this.modData('Learnsets','veluza').learnset.autotomize = ["9L15"];
		this.modData('Learnsets','veluza').learnset.fishiousrend = ["9L45"];
		this.modData('Learnsets','veluza').learnset.metaledge = ["9L50"];
		this.modData('Learnsets','veluza').learnset.brine = ["9M"];
		this.modData('Learnsets','veluza').learnset.dive = ["9M"];
		this.modData('Learnsets','veluza').learnset.endeavor = ["9M"];
		this.modData('Learnsets','veluza').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','veluza').learnset.irontail = ["9M"];
		this.modData('Learnsets','veluza').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','veluza').learnset.painsplit = ["9M"];
		this.modData('Learnsets','veluza').learnset.retaliate = ["9M"];
		this.modData('Learnsets','veluza').learnset.scald = ["9M"];
		this.modData('Learnsets','veluza').learnset.psychicfang = ["9E"];
		delete this.modData('Learnsets','veluza').learnset.blizzard;
		delete this.modData('Learnsets','veluza').learnset.crunch;
		delete this.modData('Learnsets','veluza').learnset.focusenergy;
		delete this.modData('Learnsets','veluza').learnset.liquidation;
		// Dondozo
		this.modData('Learnsets','dondozo').learnset.belch = ["9D"];
		this.modData('Learnsets','dondozo').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','dondozo').learnset.brine = ["9M"];
		this.modData('Learnsets','dondozo').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','dondozo').learnset.dive = ["9L20", "9M"];
		this.modData('Learnsets','dondozo').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','dondozo').learnset.irontail = ["9M"];
		this.modData('Learnsets','dondozo').learnset.roar = ["9M"];
		this.modData('Learnsets','dondozo').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','dondozo').learnset.scald = ["9M"];
		this.modData('Learnsets','dondozo').learnset.screech = ["9M"];
		this.modData('Learnsets','dondozo').learnset.strength = ["9M"];
		this.modData('Learnsets','dondozo').learnset.superpower = ["9M"];
		this.modData('Learnsets','dondozo').learnset.whirlpool = ["9M"];
		// Tatsugiri
		this.modData('Learnsets','tatsugiri').learnset.memento = ["9D"];
		this.modData('Learnsets','tatsugiri').learnset.playdead = ["9L34"];
		this.modData('Learnsets','tatsugiri').learnset.afteryou = ["9M"];
		this.modData('Learnsets','tatsugiri').learnset.assurance = ["9M"];
		this.modData('Learnsets','tatsugiri').learnset.brine = ["9M"];
		this.modData('Learnsets','tatsugiri').learnset.dive = ["9M"];
		this.modData('Learnsets','tatsugiri').learnset.irontail = ["9M"];
		this.modData('Learnsets','tatsugiri').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','tatsugiri').learnset.quash = ["9M"];
		this.modData('Learnsets','tatsugiri').learnset.recycle = ["9M"];
		this.modData('Learnsets','tatsugiri').learnset.roleplay = ["9M"];
		this.modData('Learnsets','tatsugiri').learnset.scald = ["9M"];
		// Annihilape
		this.modData('Learnsets','annihilape').learnset.selfdestruct = ["9D"];
		this.modData('Learnsets','annihilape').learnset.vengefulspirit = ["9L0"];
		this.modData('Learnsets','annihilape').learnset.terrify = ["9L44"];
		this.modData('Learnsets','annihilape').learnset.assurance = ["9M"];
		this.modData('Learnsets','annihilape').learnset.dualchop = ["9M"];
		this.modData('Learnsets','annihilape').learnset.endeavor = ["9M"];
		this.modData('Learnsets','annihilape').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','annihilape').learnset.nightmare = ["9M"];
		this.modData('Learnsets','annihilape').learnset.payback = ["9M"];
		this.modData('Learnsets','annihilape').learnset.retaliate = ["9M"];
		this.modData('Learnsets','annihilape').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','annihilape').learnset.roleplay = ["9M"];
		this.modData('Learnsets','annihilape').learnset.screech = ["9M"];
		this.modData('Learnsets','annihilape').learnset.strength = ["9M"];
		this.modData('Learnsets','annihilape').learnset.superpower = ["9M"];
		delete this.modData('Learnsets','annihilape').learnset.shadowpunch;
		// Clodsire
		this.modData('Learnsets','clodsire').learnset.headbutt = ["9D"];
		this.modData('Learnsets','clodsire').learnset.barbbarrage = ["9L0"];
		this.modData('Learnsets','clodsire').learnset.yawn = ["9L23"];
		this.modData('Learnsets','clodsire').learnset.poisonjab = ["9L28", "9M"];
		this.modData('Learnsets','clodsire').learnset.sludgewave = ["9L34", "9M"];
		this.modData('Learnsets','clodsire').learnset.amnesia = ["9L40", "9M"];
		this.modData('Learnsets','clodsire').learnset.toxic = ["9L46", "9M"];
		this.modData('Learnsets','clodsire').learnset.earthquake = ["9L52", "9M"];
		this.modData('Learnsets','clodsire').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','clodsire').learnset.irontail = ["9M"];
		this.modData('Learnsets','clodsire').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','clodsire').learnset.strength = ["9M"];
		this.modData('Learnsets','clodsire').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','clodsire').learnset.megahorn;
		// Farigiraf
		this.modData('Learnsets','farigiraf').learnset.headsmash = ["9D"];
		this.modData('Learnsets','farigiraf').learnset.barrierbash = ["9L23"];
		this.modData('Learnsets','farigiraf').learnset.agility = ["9L32"];
		this.modData('Learnsets','farigiraf').learnset.zenheadbutt = ["9L46", "9M"];
		this.modData('Learnsets','farigiraf').learnset.assurance = ["9L10", "9M"];
		this.modData('Learnsets','farigiraf').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.dreameater = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.futuresight = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.irontail = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.psychup = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.recycle = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.retaliate = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.strength = ["9M"];
		this.modData('Learnsets','farigiraf').learnset.telekinesis = ["9M"];
		// Dudunsparce
		this.modData('Learnsets','dudunsparce').learnset.dragondance = ["9D"];
		this.modData('Learnsets','dudunsparce').learnset.aerate = ["9L1"];
		this.modData('Learnsets','dudunsparce').learnset.mudslap = ["9L8"];
		this.modData('Learnsets','dudunsparce').learnset.yawn = ["9L13"];
		this.modData('Learnsets','dudunsparce').learnset.ancientpower = ["9L16"];
		this.modData('Learnsets','dudunsparce').learnset.bodyslam = ["9L18"];
		this.modData('Learnsets','dudunsparce').learnset.dig = ["9L21", "9M"];
		this.modData('Learnsets','dudunsparce').learnset.roost = ["9L23", "9M"];
		this.modData('Learnsets','dudunsparce').learnset.drillrun = ["9L26", "9M"];
		this.modData('Learnsets','dudunsparce').learnset.coil = ["9L28"];
		this.modData('Learnsets','dudunsparce').learnset.escapetunnel = ["9L31"];
		this.modData('Learnsets','dudunsparce').learnset.glare = ["9L33"];
		this.modData('Learnsets','dudunsparce').learnset.doubleedge = ["9L36"];
		this.modData('Learnsets','dudunsparce').learnset.endeavor = ["9L38", "9M"];
		this.modData('Learnsets','dudunsparce').learnset.airslash = ["9L41"];
		this.modData('Learnsets','dudunsparce').learnset.dragonrush = ["9L43"];
		this.modData('Learnsets','dudunsparce').learnset.endure = ["9L46", "9M"];
		this.modData('Learnsets','dudunsparce').learnset.flail = ["9L48"];
		this.modData('Learnsets','dudunsparce').learnset.irontail = ["9M"];
		this.modData('Learnsets','dudunsparce').learnset.lastresort = ["9M"];
		this.modData('Learnsets','dudunsparce').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','dudunsparce').learnset.nightmare = ["9M"];
		this.modData('Learnsets','dudunsparce').learnset.painsplit = ["9M"];
		this.modData('Learnsets','dudunsparce').learnset.psychup = ["9M"];
		this.modData('Learnsets','dudunsparce').learnset.retaliate = ["9M"];
		this.modData('Learnsets','dudunsparce').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','dudunsparce').learnset.screech = ["9M"];
		this.modData('Learnsets','dudunsparce').learnset.strength = ["9M"];
		// Kingambit
		this.modData('Learnsets','kingambit').learnset.powertrip = ["9D"];
		this.modData('Learnsets','kingambit').learnset.falsesurrender = ["9L0"];
		this.modData('Learnsets','kingambit').learnset.metaledge = ["9L57"];
		this.modData('Learnsets','kingambit').learnset.assurance = ["9L33", "9M"];
		this.modData('Learnsets','kingambit').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','kingambit').learnset.dualchop = ["9M"];
		this.modData('Learnsets','kingambit').learnset.embargo = ["9L41", "9M"];
		this.modData('Learnsets','kingambit').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','kingambit').learnset.ironhead = ["9M"];
		this.modData('Learnsets','kingambit').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','kingambit').learnset.knockoff = ["9M"];
		this.modData('Learnsets','kingambit').learnset.payback = ["9M"];
		this.modData('Learnsets','kingambit').learnset.quash = ["9M"];
		this.modData('Learnsets','kingambit').learnset.retaliate = ["9M"];
		this.modData('Learnsets','kingambit').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','kingambit').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','kingambit').learnset.roleplay = ["9M"];
		this.modData('Learnsets','kingambit').learnset.screech = ["9M"];
		this.modData('Learnsets','kingambit').learnset.snatch = ["9M"];
		this.modData('Learnsets','kingambit').learnset.torment = ["9M"];
		// Great Tusk
		this.modData('Learnsets','greattusk').learnset.firefang = ["9D"];
		this.modData('Learnsets','greattusk').learnset.slam = ["9L56"];
		this.modData('Learnsets','greattusk').learnset.gigaimpact = ["9L84", "9M"];
		this.modData('Learnsets','greattusk').learnset.headsmash = ["9L91"];
		this.modData('Learnsets','greattusk').learnset.assurance = ["9M"];
		this.modData('Learnsets','greattusk').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','greattusk').learnset.chipaway = ["9M"];
		this.modData('Learnsets','greattusk').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','greattusk').learnset.endeavor = ["9L70", "9M"];
		this.modData('Learnsets','greattusk').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','greattusk').learnset.gyroball = ["9M"];
		this.modData('Learnsets','greattusk').learnset.irontail = ["9M"];
		this.modData('Learnsets','greattusk').learnset.lastresort = ["9M"];
		this.modData('Learnsets','greattusk').learnset.payback = ["9M"];
		this.modData('Learnsets','greattusk').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','greattusk').learnset.screech = ["9M"];
		this.modData('Learnsets','greattusk').learnset.strength = ["9M"];
		this.modData('Learnsets','greattusk').learnset.superpower = ["9M"];
		delete this.modData('Learnsets','greattusk').learnset.psyshock;
		// Scream Tail
		this.modData('Learnsets','screamtail').learnset.bind = ["9D"];
		this.modData('Learnsets','screamtail').learnset.pounce = ["9L42"];
		this.modData('Learnsets','screamtail').learnset.playrough = ["9L77"];
		this.modData('Learnsets','screamtail').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','screamtail').learnset.chillywater = ["9M"];
		this.modData('Learnsets','screamtail').learnset.dragontail = ["9M"];
		this.modData('Learnsets','screamtail').learnset.dreameater = ["9M"];
		this.modData('Learnsets','screamtail').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','screamtail').learnset.endeavor = ["9M"];
		this.modData('Learnsets','screamtail').learnset.gravity = ["9M"];
		this.modData('Learnsets','screamtail').learnset.irontail = ["9M"];
		this.modData('Learnsets','screamtail').learnset.knockoff = ["9M"];
		this.modData('Learnsets','screamtail').learnset.lastresort = ["9M"];
		this.modData('Learnsets','screamtail').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','screamtail').learnset.nightmare = ["9M"];
		this.modData('Learnsets','screamtail').learnset.painsplit = ["9M"];
		this.modData('Learnsets','screamtail').learnset.psychup = ["9M"];
		this.modData('Learnsets','screamtail').learnset.recycle = ["9M"];
		this.modData('Learnsets','screamtail').learnset.roleplay = ["9M"];
		this.modData('Learnsets','screamtail').learnset.screech = ["9M"];
		this.modData('Learnsets','screamtail').learnset.telekinesis = ["9M"];
		delete this.modData('Learnsets','screamtail').learnset.blizzard;
		delete this.modData('Learnsets','screamtail').learnset.fireblast;
		delete this.modData('Learnsets','screamtail').learnset.gyroball;
		delete this.modData('Learnsets','screamtail').learnset.thunder;
		// Brute Bonnet
		this.modData('Learnsets','brutebonnet').learnset.crunch = ["9D"];
		this.modData('Learnsets','brutebonnet').learnset.falsesurrender = ["9L84"];
		this.modData('Learnsets','brutebonnet').learnset.assurance = ["9M"];
		this.modData('Learnsets','brutebonnet').learnset.endeavor = ["9M"];
		this.modData('Learnsets','brutebonnet').learnset.gastroacid = ["9M"];
		this.modData('Learnsets','brutebonnet').learnset.knockoff = ["9M"];
		this.modData('Learnsets','brutebonnet').learnset.payback = ["9M"];
		this.modData('Learnsets','brutebonnet').learnset.roleplay = ["9M"];
		this.modData('Learnsets','brutebonnet').learnset.toxic = ["9M"];
		// Flutter Mane
		this.modData('Learnsets','fluttermane').learnset.lunge = ["9D"];
		this.modData('Learnsets','fluttermane').learnset.terrify = ["9L21"];
		this.modData('Learnsets','fluttermane').learnset.dreameater = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.embargo = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.gravity = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.nightmare = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.painsplit = ["9L77", "9M"];
		this.modData('Learnsets','fluttermane').learnset.payback = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.psychup = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.screech = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.snatch = ["9M"];
		this.modData('Learnsets','fluttermane').learnset.telekinesis = ["9M"];
		delete this.modData('Learnsets','fluttermane').learnset.wish;
		// Slither Wing
		this.modData('Learnsets','slitherwing').learnset.heatcrash = ["9D"];
		this.modData('Learnsets','slitherwing').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','slitherwing').learnset.springleap = ["9L21"];
		this.modData('Learnsets','slitherwing').learnset.whirlwind = ["9L35"];
		this.modData('Learnsets','slitherwing').learnset.bugbite = ["9L42", "9M"];
		this.modData('Learnsets','slitherwing').learnset.superpower = ["9L49", "9M"];
		this.modData('Learnsets','slitherwing').learnset.lunge = ["9L56"];
		this.modData('Learnsets','slitherwing').learnset.bulkup = ["9L63", "9M"];
		this.modData('Learnsets','slitherwing').learnset.morningsun = ["9L70"];
		this.modData('Learnsets','slitherwing').learnset.vitaldrain = ["9L77", "9M"];
		this.modData('Learnsets','slitherwing').learnset.firstimpression = ["9L84"];
		this.modData('Learnsets','slitherwing').learnset.bounce = ["9M"];
		this.modData('Learnsets','slitherwing').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','slitherwing').learnset.defog = ["9M"];
		this.modData('Learnsets','slitherwing').learnset.endeavor = ["9M"];
		this.modData('Learnsets','slitherwing').learnset.irontail = ["9M"];
		this.modData('Learnsets','slitherwing').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','slitherwing').learnset.strength = ["9M"];
		delete this.modData('Learnsets','slitherwing').learnset.poisonpowder;
		delete this.modData('Learnsets','slitherwing').learnset.stomp;
		// Sandy Shocks
		this.modData('Learnsets','sandyshocks').learnset.steelbeam = ["9D"];
		this.modData('Learnsets','sandyshocks').learnset.magnetbomb = ["9L42"];
		this.modData('Learnsets','sandyshocks').learnset.sandblast = ["9L63"];
		this.modData('Learnsets','sandyshocks').learnset.earthpower = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.electroweb = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.explosion = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.flash = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.gravity = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.gyroball = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.psychup = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.recycle = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','sandyshocks').learnset.screech = ["9L35", "9M"];
		this.modData('Learnsets','sandyshocks').learnset.shockwave = ["9M"];
		delete this.modData('Learnsets','sandyshocks').learnset.heavyslam;
		// Iron Treads
		this.modData('Learnsets','irontreads').learnset.thunderfang = ["9D"];
		this.modData('Learnsets','irontreads').learnset.protect = ["9L1", "9M"];
		this.modData('Learnsets','irontreads').learnset.bash = ["9L14"];
		this.modData('Learnsets','irontreads').learnset.wildcharge = ["9L56", "9M"];
		this.modData('Learnsets','irontreads').learnset.heavyslam = ["9L63"];
		this.modData('Learnsets','irontreads').learnset.spinout = ["9L91"];
		this.modData('Learnsets','irontreads').learnset.assurance = ["9M"];
		this.modData('Learnsets','irontreads').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','irontreads').learnset.chipaway = ["9M"];
		this.modData('Learnsets','irontreads').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','irontreads').learnset.endeavor = ["9L70", "9M"];
		this.modData('Learnsets','irontreads').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','irontreads').learnset.lastresort = ["9M"];
		this.modData('Learnsets','irontreads').learnset.payback = ["9M"];
		this.modData('Learnsets','irontreads').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','irontreads').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','irontreads').learnset.screech = ["9M"];
		this.modData('Learnsets','irontreads').learnset.strength = ["9M"];
		this.modData('Learnsets','irontreads').learnset.superpower = ["9M"];
		// Robo Bundle
		this.modData('Learnsets','robobundle').learnset.ancientpower = ["9D"];
		this.modData('Learnsets','robobundle').learnset.liquidation = ["9L49"];
		this.modData('Learnsets','robobundle').learnset.auroraveil = ["9L84", "9M"];
		this.modData('Learnsets','robobundle').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','robobundle').learnset.dive = ["9M"];
		this.modData('Learnsets','robobundle').learnset.endeavor = ["9M"];
		this.modData('Learnsets','robobundle').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','robobundle').learnset.recycle = ["9M"];
		this.modData('Learnsets','robobundle').learnset.snatch = ["9M"];
		this.modData('Learnsets','robobundle').learnset.whirlpool = ["9L14", "9M"];
		// Press Hands
		this.modData('Learnsets','presshands').learnset.completeshock = ["9D"];
		this.modData('Learnsets','presshands').learnset.heavyslam = ["9L63"];
		this.modData('Learnsets','presshands').learnset.closecombat = ["9L70"];
		this.modData('Learnsets','presshands').learnset.hardpress = ["9L77"];
		this.modData('Learnsets','presshands').learnset.chipaway = ["9M"];
		this.modData('Learnsets','presshands').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','presshands').learnset.electroweb = ["9M"];
		this.modData('Learnsets','presshands').learnset.flash = ["9M"];
		this.modData('Learnsets','presshands').learnset.knockoff = ["9M"];
		this.modData('Learnsets','presshands').learnset.payback = ["9M"];
		this.modData('Learnsets','presshands').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','presshands').learnset.roleplay = ["9M"];
		this.modData('Learnsets','presshands').learnset.shockwave = ["9M"];
		this.modData('Learnsets','presshands').learnset.smackdown = ["9M"];
		this.modData('Learnsets','presshands').learnset.strength = ["9M"];
		this.modData('Learnsets','presshands').learnset.superpower = ["9M"];
		delete this.modData('Learnsets','presshands').learnset.detect;
		// Mecha Jugulis
		this.modData('Learnsets','mechajugulis').learnset.dracometeor = ["9D"];
		this.modData('Learnsets','mechajugulis').learnset.assurance = ["9L14", "9M"];
		this.modData('Learnsets','mechajugulis').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.fireblast = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.flash = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.irontail = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.knockoff = ["9L63", "9M"];
		this.modData('Learnsets','mechajugulis').learnset.payback = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.psychup = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.roost = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.screech = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.shockwave = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.spite = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.superpower = ["9M"];
		this.modData('Learnsets','mechajugulis').learnset.torment = ["9M"];
		delete this.modData('Learnsets','mechajugulis').learnset.meteorbeam;
		// Astro Glider
		this.modData('Learnsets','astroglider').learnset.strugglebug = ["9D"];
		this.modData('Learnsets','astroglider').learnset.lockon = ["9L7"];
		this.modData('Learnsets','astroglider').learnset.flash = ["9M"];
		this.modData('Learnsets','astroglider').learnset.incinerate = ["9M"];
		this.modData('Learnsets','astroglider').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','astroglider').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','astroglider').learnset.shockwave = ["9M"];
		this.modData('Learnsets','astroglider').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','astroglider').learnset.meteorbeam = ["9T"];
		// Armor Thorns
		this.modData('Learnsets','armorthorns').learnset.hardpress = ["9D"];
		this.modData('Learnsets','armorthorns').learnset.spark = ["9L14"];
		this.modData('Learnsets','armorthorns').learnset.heavyslam = ["9L63"];
		this.modData('Learnsets','armorthorns').learnset.assurance = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.chillywater = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.chipaway = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.electroweb = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.flash = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.irontail = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.knockoff = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.payback = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.roar = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.screech = ["9L7", "9M"];
		this.modData('Learnsets','armorthorns').learnset.shockwave = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.spite = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.strength = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.superpower = ["9M"];
		this.modData('Learnsets','armorthorns').learnset.torment = ["9M"];
		delete this.modData('Learnsets','armorthorns').learnset.meteorbeam;
		delete this.modData('Learnsets','armorthorns').learnset.pinmissile;
		// Frigibax
		this.modData('Learnsets','frigibax').learnset.metalburst = ["9D"];
		this.modData('Learnsets','frigibax').learnset.chillywater = ["9M"];
		this.modData('Learnsets','frigibax').learnset.flash = ["9M"];
		this.modData('Learnsets','frigibax').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','frigibax').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','frigibax').learnset.irontail = ["9M"];
		this.modData('Learnsets','frigibax').learnset.retaliate = ["9M"];
		this.modData('Learnsets','frigibax').learnset.screech = ["9M"];
		// Arctibax
		this.modData('Learnsets','arctibax').learnset.aquacutter = ["9D"];
		this.modData('Learnsets','arctibax').learnset.chillywater = ["9M"];
		this.modData('Learnsets','arctibax').learnset.chipaway = ["9M"];
		this.modData('Learnsets','arctibax').learnset.dualchop = ["9M"];
		this.modData('Learnsets','arctibax').learnset.endeavor = ["9M"];
		this.modData('Learnsets','arctibax').learnset.flash = ["9M"];
		this.modData('Learnsets','arctibax').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','arctibax').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','arctibax').learnset.irontail = ["9M"];
		this.modData('Learnsets','arctibax').learnset.retaliate = ["9M"];
		this.modData('Learnsets','arctibax').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','arctibax').learnset.screech = ["9M"];
		// Baxcalibur
		this.modData('Learnsets','baxcalibur').learnset.metaledge = ["9D"];
		this.modData('Learnsets','baxcalibur').learnset.chillywater = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.assurance = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.chillywater = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.chipaway = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.dualchop = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.endeavor = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.flash = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.irontail = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.retaliate = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.screech = ["9M"];
		this.modData('Learnsets','baxcalibur').learnset.strength = ["9M"];
		// Gimmighoul
		this.modData('Learnsets','gimmighoul').learnset.shelter = ["9D"];
		this.modData('Learnsets','gimmighoul').learnset.payday = ["9L1"];
		this.modData('Learnsets','gimmighoul').learnset.embargo = ["9M"];
		this.modData('Learnsets','gimmighoul').learnset.flash = ["9M"];
		this.modData('Learnsets','gimmighoul').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','gimmighoul').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','gimmighoul').learnset.roleplay = ["9M"];
		// Gimmighoul Roaming
		this.modData('Learnsets','gimmighoulroaming').learnset.autotomize = ["9D"];
		// Gholdengo
		this.modData('Learnsets','gholdengo').learnset.surf = ["9D"];
		this.modData('Learnsets','gholdengo').learnset.payday = ["9L1"];
		this.modData('Learnsets','gholdengo').learnset.metalburst = ["9L14"];
		this.modData('Learnsets','gholdengo').learnset.mirrorshot = ["9L28"];
		this.modData('Learnsets','gholdengo').learnset.metalsound = ["9L49"];
		this.modData('Learnsets','gholdengo').learnset.flashcannon = ["9L56", "9M"];
		this.modData('Learnsets','gholdengo').learnset.powergem = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.embargo = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.flash = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.gravity = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.healbell = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.knockoff = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.roleplay = ["9M"];
		this.modData('Learnsets','gholdengo').learnset.snatch = ["9M"];
		delete this.modData('Learnsets','gholdengo').learnset.confuseray;
		// Wo-Chien
		this.modData('Learnsets','wochien').learnset.strengthsap = ["9D"];
		this.modData('Learnsets','wochien').learnset.ingrain = ["9L5"];
		this.modData('Learnsets','wochien').learnset.growth = ["9L25"];
		this.modData('Learnsets','wochien').learnset.leechseed = ["9L30"];
		this.modData('Learnsets','wochien').learnset.leaftornado = ["9L35"];
		this.modData('Learnsets','wochien').learnset.ominouswind = ["9L60"];
		this.modData('Learnsets','wochien').learnset.grudge = ["9L65"];
		this.modData('Learnsets','wochien').learnset.grassyterrain = ["9M"];
		this.modData('Learnsets','wochien').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','wochien').learnset.nightmare = ["9M"];
		this.modData('Learnsets','wochien').learnset.painsplit = ["9M"];
		this.modData('Learnsets','wochien').learnset.payback = ["9M"];
		this.modData('Learnsets','wochien').learnset.poltergeist = ["9M"];
		this.modData('Learnsets','wochien').learnset.snatch = ["9M"];
		this.modData('Learnsets','wochien').learnset.midnight = ["9T"];
		delete this.modData('Learnsets','wochien').learnset.stunspore;
		delete this.modData('Learnsets','wochien').learnset.tickle;
		// Chien-Pao
		this.modData('Learnsets','chienpao').learnset.hyperfang = ["9D"];
		this.modData('Learnsets','chienpao').learnset.mist = ["9L30"];
		this.modData('Learnsets','chienpao').learnset.chipaway = ["9M"];
		this.modData('Learnsets','chienpao').learnset.frostbreath = ["9M"];
		this.modData('Learnsets','chienpao').learnset.snowscape = ["9M"];
		this.modData('Learnsets','chienpao').learnset.irontail = ["9M"];
		this.modData('Learnsets','chienpao').learnset.nightmare = ["9M"];
		this.modData('Learnsets','chienpao').learnset.painsplit = ["9M"];
		this.modData('Learnsets','chienpao').learnset.payback = ["9M"];
		this.modData('Learnsets','chienpao').learnset.poltergeist = ["9M"];
		this.modData('Learnsets','chienpao').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','chienpao').learnset.screech = ["9M"];
		this.modData('Learnsets','chienpao').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','chienpao').learnset.snatch = ["9M"];
		this.modData('Learnsets','chienpao').learnset.midnight = ["9T"];
		// Ting-Lu
		this.modData('Learnsets','tinglu').learnset.headcharge = ["9D"];
		this.modData('Learnsets','tinglu').learnset.tussle = ["9L1"];
		this.modData('Learnsets','tinglu').learnset.whirlwind = ["9L5"];
		this.modData('Learnsets','tinglu').learnset.spikes = ["9L15"];
		this.modData('Learnsets','tinglu').learnset.bulkup = ["9L25", "9M"];
		this.modData('Learnsets','tinglu').learnset.stomp = ["9L35"];
		this.modData('Learnsets','tinglu').learnset.falsesurrender = ["9L55"];
		this.modData('Learnsets','tinglu').learnset.chipaway = ["9M"];
		this.modData('Learnsets','tinglu').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','tinglu').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','tinglu').learnset.nightmare = ["9M"];
		this.modData('Learnsets','tinglu').learnset.painsplit = ["9M"];
		this.modData('Learnsets','tinglu').learnset.payback = ["9M"];
		this.modData('Learnsets','tinglu').learnset.poltergeist = ["9M"];
		this.modData('Learnsets','tinglu').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','tinglu').learnset.screech = ["9M"];
		this.modData('Learnsets','tinglu').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','tinglu').learnset.snatch = ["9M"];
		this.modData('Learnsets','tinglu').learnset.superpower = ["9M"];
		this.modData('Learnsets','tinglu').learnset.midnight = ["9T"];
		delete this.modData('Learnsets','tinglu').learnset.sandtomb;
		delete this.modData('Learnsets','tinglu').learnset.throatchop;
		// Chi-Yu
		this.modData('Learnsets','chiyu').learnset.hypnosis = ["9D"];
		this.modData('Learnsets','chiyu').learnset.confuseray = ["9L5"];
		this.modData('Learnsets','chiyu').learnset.nastyplot = ["9L25", "9M"];
		this.modData('Learnsets','chiyu').learnset.swagger = ["9L30"];
		this.modData('Learnsets','chiyu').learnset.incinerate = ["9L35", "9M"];
		this.modData('Learnsets','chiyu').learnset.flameburst = ["9L45"];
		this.modData('Learnsets','chiyu').learnset.lavaplume = ["9L55"];
		this.modData('Learnsets','chiyu').learnset.bounce = ["9L60", "9M"];
		this.modData('Learnsets','chiyu').learnset.memento = ["9L65", "9M"];
		this.modData('Learnsets','chiyu').learnset.overheat = ["9L70"];
		this.modData('Learnsets','chiyu').learnset.nightmare = ["9M"];
		this.modData('Learnsets','chiyu').learnset.painsplit = ["9M"];
		this.modData('Learnsets','chiyu').learnset.payback = ["9M"];
		this.modData('Learnsets','chiyu').learnset.poltergeist = ["9M"];
		this.modData('Learnsets','chiyu').learnset.snatch = ["9M"];
		this.modData('Learnsets','chiyu').learnset.midnight = ["9T"];
		delete this.modData('Learnsets','chiyu').learnset.flamewheel;
		// Roaring Moon
		this.modData('Learnsets','roaringmoon').learnset.jawlock = ["9D"];
		this.modData('Learnsets','roaringmoon').learnset.nightslash = ["9L35"];
		this.modData('Learnsets','roaringmoon').learnset.crunch = ["9L49"];
		this.modData('Learnsets','roaringmoon').learnset.fellswoop = ["9L90"];
		this.modData('Learnsets','roaringmoon').learnset.assurance = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.defog = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.dualchop = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.irontail = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.payback = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.roost = ["9L84", "9M"];
		this.modData('Learnsets','roaringmoon').learnset.screech = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.spite = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.strength = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.superpower = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.torment = ["9M"];
		this.modData('Learnsets','roaringmoon').learnset.zenheadbutt = ["9M"];
		delete this.modData('Learnsets','roaringmoon').learnset.doubleedge;
		delete this.modData('Learnsets','roaringmoon').learnset.uturn;
		// Valiant Droid
		this.modData('Learnsets','valiantdroid').learnset.energyblade = ["9D"];
		this.modData('Learnsets','valiantdroid').learnset.metaledge = ["9L70"];
		this.modData('Learnsets','valiantdroid').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.dreameater = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.dualchop = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.futuresight = ["9L21", "9M"];
		this.modData('Learnsets','valiantdroid').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.painsplit = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.psychup = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.recycle = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.snatch = ["9M"];
		this.modData('Learnsets','valiantdroid').learnset.torment = ["9M"];
		delete this.modData('Learnsets','valiantdroid').learnset.knockoff;
		// Koraidon
		this.modData('Learnsets','koraidon').learnset.bellydrum = ["9D"];
		this.modData('Learnsets','koraidon').learnset.rocksmash = ["9L1", "9M"];
		this.modData('Learnsets','koraidon').learnset.karatechop = ["9L7"];
		this.modData('Learnsets','koraidon').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','koraidon').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','koraidon').learnset.chipaway = ["9M"];
		this.modData('Learnsets','koraidon').learnset.dualchop = ["9M"];
		this.modData('Learnsets','koraidon').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','koraidon').learnset.fly = ["9M"];
		this.modData('Learnsets','koraidon').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','koraidon').learnset.irontail = ["9M"];
		this.modData('Learnsets','koraidon').learnset.knockoff = ["9M"];
		this.modData('Learnsets','koraidon').learnset.screech = ["9L63", "9M"];
		this.modData('Learnsets','koraidon').learnset.strength = ["9M"];
		this.modData('Learnsets','koraidon').learnset.superpower = ["9M"];
		// Miraidon
		this.modData('Learnsets','miraidon').learnset.volttackle = ["9D"];
		this.modData('Learnsets','miraidon').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','miraidon').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','miraidon').learnset.dualchop = ["9M"];
		this.modData('Learnsets','miraidon').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','miraidon').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','miraidon').learnset.electroweb = ["9M"];
		this.modData('Learnsets','miraidon').learnset.flash = ["9M"];
		this.modData('Learnsets','miraidon').learnset.fly = ["9M"];
		this.modData('Learnsets','miraidon').learnset.irontail = ["9M"];
		this.modData('Learnsets','miraidon').learnset.knockoff = ["9M"];
		this.modData('Learnsets','miraidon').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','miraidon').learnset.roar = ["9M"];
		this.modData('Learnsets','miraidon').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','miraidon').learnset.screech = ["9M"];
		this.modData('Learnsets','miraidon').learnset.shockwave = ["9L7", "9M"];
		this.modData('Learnsets','miraidon').learnset.signalbeam = ["9M"];
		// Walking Wake
		this.modData('Learnsets','walkingwake').learnset.steameruption = ["9D"];
		this.modData('Learnsets','walkingwake').learnset.honeclaws = ["9L14", "9M"];
		this.modData('Learnsets','walkingwake').learnset.waterpulse = ["9L35", "9M"];
		this.modData('Learnsets','walkingwake').learnset.breakingswipe = ["9L42", "9M"];
		this.modData('Learnsets','walkingwake').learnset.scald = ["9L49", "9M"];
		this.modData('Learnsets','walkingwake').learnset.chaoticstorm = ["9L56"];
		this.modData('Learnsets','walkingwake').learnset.dragonrush = ["9L63"];
		this.modData('Learnsets','walkingwake').learnset.dragonpulse = ["9L70", "9M"];
		this.modData('Learnsets','walkingwake').learnset.outrage = ["9L91", "9M"];
		this.modData('Learnsets','walkingwake').learnset.brine = ["9M"];
		this.modData('Learnsets','walkingwake').learnset.chipaway = ["9M"];
		this.modData('Learnsets','walkingwake').learnset.dive = ["9M"];
		this.modData('Learnsets','walkingwake').learnset.dualchop = ["9M"];
		this.modData('Learnsets','walkingwake').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','walkingwake').learnset.irontail = ["9M"];
		this.modData('Learnsets','walkingwake').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','walkingwake').learnset.screech = ["9M"];
		this.modData('Learnsets','walkingwake').learnset.whirlpool = ["9M"];
		// Saber Leaves
		this.modData('Learnsets','saberleaves').learnset.metaledge = ["9D"];
		this.modData('Learnsets','saberleaves').learnset.confusion = ["9L1"];
		this.modData('Learnsets','saberleaves').learnset.slash = ["9L7"];
		this.modData('Learnsets','saberleaves').learnset.magicalleaf = ["9L14"];
		this.modData('Learnsets','saberleaves').learnset.psychocut = ["9L28"];
		this.modData('Learnsets','saberleaves').learnset.mirrorcoat = ["9L70"];
		this.modData('Learnsets','saberleaves').learnset.allyswitch = ["9L84", "9M"];
		this.modData('Learnsets','saberleaves').learnset.chipaway = ["9M"];
		this.modData('Learnsets','saberleaves').learnset.endeavor = ["9M"];
		this.modData('Learnsets','saberleaves').learnset.helpinghand = ["9M"];
		this.modData('Learnsets','saberleaves').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','saberleaves').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','saberleaves').learnset.quash = ["9M"];
		this.modData('Learnsets','saberleaves').learnset.retaliate = ["9L14", "9M"];
		this.modData('Learnsets','saberleaves').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','saberleaves').learnset.synthesis = ["9M"];
		delete this.modData('Learnsets','saberleaves').learnset.imprison;
		delete this.modData('Learnsets','saberleaves').learnset.nightslash;
		// Dipplin
		this.modData('Learnsets','dipplin').learnset.shelter = ["9D"];
		this.modData('Learnsets','dipplin').learnset.growth = ["9L1"];
		this.modData('Learnsets','dipplin').learnset.constrict = ["9L4"];
		this.modData('Learnsets','dipplin').learnset.dragontail = ["9L8", "9M"];
		this.modData('Learnsets','dipplin').learnset.infestation = ["9L12", "9M"];
		this.modData('Learnsets','dipplin').learnset.dragonbreath = ["9L20"];
		this.modData('Learnsets','dipplin').learnset.bulletseed = ["9L24"];
		this.modData('Learnsets','dipplin').learnset.applebomb = ["9L28"];
		this.modData('Learnsets','dipplin').learnset.substitute = ["9L32", "9M"];
		this.modData('Learnsets','dipplin').learnset.dragonpulse = ["9L40", "9M"];
		this.modData('Learnsets','dipplin').learnset.energyball = ["9L44", "9M"];
		this.modData('Learnsets','dipplin').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','dipplin').learnset.applebomb = ["9M"];
		this.modData('Learnsets','dipplin').learnset.bugbite = ["9M"];
		this.modData('Learnsets','dipplin').learnset.frustration = ["9M"];
		this.modData('Learnsets','dipplin').learnset.hiddenpower = ["9M"];
		this.modData('Learnsets','dipplin').learnset.irontail = ["9M"];
		this.modData('Learnsets','dipplin').learnset.naturepower = ["9M"];
		this.modData('Learnsets','dipplin').learnset.nightmare = ["9M"];
		this.modData('Learnsets','dipplin').learnset.return = ["9M"];
		this.modData('Learnsets','dipplin').learnset.secretpower = ["9M"];
		this.modData('Learnsets','dipplin').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','dipplin').learnset.synthesis = ["9M"];
		// Poltchageist
		this.modData('Learnsets','poltchageist').learnset.soak = ["9D"];
		this.modData('Learnsets','poltchageist').learnset.embargo = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.frustration = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.hiddenpower = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.nightmare = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.psychup = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.return = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.roleplay = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.secretpower = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.snatch = ["9M"];
		this.modData('Learnsets','poltchageist').learnset.telekinesis = ["9M"];
		// Sinistcha
		this.modData('Learnsets','sinistcha').learnset.soak = ["9D"];
		this.modData('Learnsets','sinistcha').learnset.teatime = ["9L0"];
		this.modData('Learnsets','sinistcha').learnset.embargo = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.frustration = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.hiddenpower = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.nightmare = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.psychup = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.return = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.roleplay = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.secretpower = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.snatch = ["9M"];
		this.modData('Learnsets','sinistcha').learnset.telekinesis = ["9M"];
		// Okidogi
		this.modData('Learnsets','okidogi').learnset.darkestlariat = ["9D"];
		this.modData('Learnsets','okidogi').learnset.pound = ["9L1"];
		this.modData('Learnsets','okidogi').learnset.brutalswing = ["9L40"];
		this.modData('Learnsets','okidogi').learnset.poisonjab = ["9L48", "9M"];
		this.modData('Learnsets','okidogi').learnset.assurance = ["9M"];
		this.modData('Learnsets','okidogi').learnset.block = ["9M"];
		this.modData('Learnsets','okidogi').learnset.chipaway = ["9M"];
		this.modData('Learnsets','okidogi').learnset.dualchop = ["9M"];
		this.modData('Learnsets','okidogi').learnset.frustration = ["9M"];
		this.modData('Learnsets','okidogi').learnset.hiddenpower = ["9M"];
		this.modData('Learnsets','okidogi').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','okidogi').learnset.naturepower = ["9M"];
		this.modData('Learnsets','okidogi').learnset.nightmare = ["9M"];
		this.modData('Learnsets','okidogi').learnset.payback = ["9M"];
		this.modData('Learnsets','okidogi').learnset.return = ["9M"];
		this.modData('Learnsets','okidogi').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','okidogi').learnset.screech = ["9M"];
		this.modData('Learnsets','okidogi').learnset.secretpower = ["9M"];
		this.modData('Learnsets','okidogi').learnset.strength = ["9M"];
		this.modData('Learnsets','okidogi').learnset.torment = ["9M"];
		// Munkidori
		this.modData('Learnsets','munkidori').learnset.doubleteam = ["9D"];
		this.modData('Learnsets','munkidori').learnset.clearsmog = ["9L16"];
		this.modData('Learnsets','munkidori').learnset.psybeam = ["9L24"];
		this.modData('Learnsets','munkidori').learnset.imprison = ["9L32"];
		this.modData('Learnsets','munkidori').learnset.darkpulse = ["9L40", "9M"];
		this.modData('Learnsets','munkidori').learnset.sludgebomb = ["9L48", "9M"];
		this.modData('Learnsets','munkidori').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','munkidori').learnset.dualchop = ["9M"];
		this.modData('Learnsets','munkidori').learnset.frustration = ["9M"];
		this.modData('Learnsets','munkidori').learnset.hiddenpower = ["9M"];
		this.modData('Learnsets','munkidori').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','munkidori').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','munkidori').learnset.nightmare = ["9M"];
		this.modData('Learnsets','munkidori').learnset.payback = ["9M"];
		this.modData('Learnsets','munkidori').learnset.psychic = ["9M"];
		this.modData('Learnsets','munkidori').learnset.psychup = ["9M"];
		this.modData('Learnsets','munkidori').learnset.return = ["9M"];
		this.modData('Learnsets','munkidori').learnset.screech = ["9M"];
		this.modData('Learnsets','munkidori').learnset.secretpower = ["9M"];
		this.modData('Learnsets','munkidori').learnset.sludgewave = ["9M"];
		this.modData('Learnsets','munkidori').learnset.snatch = ["9M"];
		this.modData('Learnsets','munkidori').learnset.telekinesis = ["9M"];
		this.modData('Learnsets','munkidori').learnset.torment = ["9M"];
		delete this.modData('Learnsets','munkidori').learnset.poltergeist;
		// Fezandipiti
		this.modData('Learnsets','fezandipiti').learnset.ragepowder = ["9D"];
		this.modData('Learnsets','fezandipiti').learnset.attract = ["9L8", "9M"];
		this.modData('Learnsets','fezandipiti').learnset.smog = ["9L16"];
		this.modData('Learnsets','fezandipiti').learnset.pounce = ["9L24"];
		this.modData('Learnsets','fezandipiti').learnset.wingattack = ["9L32"];
		this.modData('Learnsets','fezandipiti').learnset.tailslap = ["9L40"];
		this.modData('Learnsets','fezandipiti').learnset.crosspoison = ["9L48"];
		this.modData('Learnsets','fezandipiti').learnset.strangesmoke = ["9L64"];
		this.modData('Learnsets','fezandipiti').learnset.fellswoop = ["9L72"];
		this.modData('Learnsets','fezandipiti').learnset.defog = ["9M"];
		this.modData('Learnsets','fezandipiti').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','fezandipiti').learnset.frustration = ["9M"];
		this.modData('Learnsets','fezandipiti').learnset.hiddenpower = ["9M"];
		this.modData('Learnsets','fezandipiti').learnset.irontail = ["9M"];
		this.modData('Learnsets','fezandipiti').learnset.return = ["9M"];
		this.modData('Learnsets','fezandipiti').learnset.screech = ["9M"];
		this.modData('Learnsets','fezandipiti').learnset.secretpower = ["9M"];
		this.modData('Learnsets','fezandipiti').learnset.skyattack = ["9M"];
		this.modData('Learnsets','fezandipiti').learnset.torment = ["9M"];
		delete this.modData('Learnsets','fezandipiti').learnset.beatup;
		delete this.modData('Learnsets','fezandipiti').learnset.flatter;
		delete this.modData('Learnsets','fezandipiti').learnset.moonblast;
		delete this.modData('Learnsets','fezandipiti').learnset.quickattack;
		// Ogerpon
		this.modData('Learnsets','ogerpon').learnset.highjumpkick = ["9D"];
		this.modData('Learnsets','ogerpon').learnset.afteryou = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.assurance = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.chipaway = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.endeavor = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.frustration = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.hiddenpower = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.lastresort = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.naturepower = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.payback = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.psychup = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.retaliate = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.return = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.rocksmash = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.roleplay = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.secretpower = ["9M"];
		this.modData('Learnsets','ogerpon').learnset.synthesis = ["9M"];
		// Ogerpon Wellspring
		this.modData('Learnsets','ogerponwellspring').learnset = Utils.deepClone(this.modData('Learnsets','ogerpon').learnset);
		this.modData('Learnsets','ogerponwellspring').learnset.wavecrash = ["9D"];
		delete this.modData('Learnsets','ogerponwellspring').learnset.highjumpkick;
		// Ogerpon Hearthflame
		this.modData('Learnsets','ogerponhearthflame').learnset = Utils.deepClone(this.modData('Learnsets','ogerpon').learnset);
		this.modData('Learnsets','ogerponhearthflame').learnset.flareblitz = ["9D"];
		delete this.modData('Learnsets','ogerponhearthflame').learnset.highjumpkick;
		// Ogerpon Cornerstone
		this.modData('Learnsets','ogerponcornerstone').learnset = Utils.deepClone(this.modData('Learnsets','ogerpon').learnset);
		this.modData('Learnsets','ogerponcornerstone').learnset.headsmash = ["9D"];
		delete this.modData('Learnsets','ogerponcornerstone').learnset.highjumpkick;
		// Archaludon
		this.modData('Learnsets','archaludon').learnset.cuttinglaser = ["9D"];
		this.modData('Learnsets','archaludon').learnset.zapcannon = ["9L0"];
		this.modData('Learnsets','archaludon').learnset.crushclaw = ["9L30"];
		this.modData('Learnsets','archaludon').learnset.metalburst = ["9L42"];
		this.modData('Learnsets','archaludon').learnset.hardpress = ["9L60"];
		this.modData('Learnsets','archaludon').learnset.block = ["9M"];
		this.modData('Learnsets','archaludon').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','archaludon').learnset.chargebeam = ["9M"];
		this.modData('Learnsets','archaludon').learnset.dragontail = ["9M"];
		this.modData('Learnsets','archaludon').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','archaludon').learnset.flash = ["9M"];
		this.modData('Learnsets','archaludon').learnset.gravity = ["9M"];
		this.modData('Learnsets','archaludon').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','archaludon').learnset.magnetrise = ["9M"];
		this.modData('Learnsets','archaludon').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','archaludon').learnset.strength = ["9M"];
		// Hydrapple
		this.modData('Learnsets','hydrapple').learnset.shelter = ["9D"];
		this.modData('Learnsets','hydrapple').learnset.growth = ["9L1"];
		this.modData('Learnsets','hydrapple').learnset.constrict = ["9L4"];
		this.modData('Learnsets','hydrapple').learnset.dragontail = ["9L8", "9M"];
		this.modData('Learnsets','hydrapple').learnset.infestation = ["9L12", "9M"];
		this.modData('Learnsets','hydrapple').learnset.dragonbreath = ["9L20"];
		this.modData('Learnsets','hydrapple').learnset.bulletseed = ["9L24"];
		this.modData('Learnsets','hydrapple').learnset.applebomb = ["9L28"];
		this.modData('Learnsets','hydrapple').learnset.substitute = ["9L32", "9M"];
		this.modData('Learnsets','hydrapple').learnset.dragonpulse = ["9L40", "9M"];
		this.modData('Learnsets','hydrapple').learnset.energyball = ["9L44", "9M"];
		this.modData('Learnsets','hydrapple').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.applebomb = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.bugbite = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.frustration = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.hiddenpower = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.irontail = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.naturepower = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.nightmare = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.return = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.secretpower = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','hydrapple').learnset.synthesis = ["9M"];
		// Gouging Fire
		this.modData('Learnsets','gougingfire').learnset.morningsun = ["9D"];
		this.modData('Learnsets','gougingfire').learnset.bite = ["9L7"];
		this.modData('Learnsets','gougingfire').learnset.nobleroar = ["9L21"];
		this.modData('Learnsets','gougingfire').learnset.firefang = ["9L35"];
		this.modData('Learnsets','gougingfire').learnset.crushclaw = ["9L42"];
		this.modData('Learnsets','gougingfire').learnset.lavaplume = ["9L49"];
		this.modData('Learnsets','gougingfire').learnset.chaoticstorm = ["9L56"];
		this.modData('Learnsets','gougingfire').learnset.dragonrush = ["9L63"];
		this.modData('Learnsets','gougingfire').learnset.temperflare = ["9L70"];
		this.modData('Learnsets','gougingfire').learnset.psychicfang = ["9L77"];
		this.modData('Learnsets','gougingfire').learnset.heatcrash = ["9L84"];
		this.modData('Learnsets','gougingfire').learnset.outrage = ["9L91", "9M"];
		delete this.modData('Learnsets','gougingfire').learnset.ancientpower;
		delete this.modData('Learnsets','gougingfire').learnset.doublekick;
		delete this.modData('Learnsets','gougingfire').learnset.flareblitz;
		delete this.modData('Learnsets','gougingfire').learnset.stomp;
		// Raging Bolt
		this.modData('Learnsets','ragingbolt').learnset.zapcannon = ["9D"];
		this.modData('Learnsets','ragingbolt').learnset.leer = ["9L1"];
		this.modData('Learnsets','ragingbolt').learnset.chargebeam = ["9L1", "9M"];
		this.modData('Learnsets','ragingbolt').learnset.bite = ["9L7"];
		this.modData('Learnsets','ragingbolt').learnset.charge = ["9L14"];
		this.modData('Learnsets','ragingbolt').learnset.electricterrain = ["9L28", "9M"];
		this.modData('Learnsets','ragingbolt').learnset.dragonbreath = ["9L35"];
		this.modData('Learnsets','ragingbolt').learnset.shockwave = ["9L42", "9M"];
		this.modData('Learnsets','ragingbolt').learnset.dragontail = ["9L49", "9M"];
		this.modData('Learnsets','ragingbolt').learnset.discharge = ["9L56"];
		this.modData('Learnsets','ragingbolt').learnset.chaoticstorm = ["9L63"];
		this.modData('Learnsets','ragingbolt').learnset.dragonhammer = ["9L70"];
		this.modData('Learnsets','ragingbolt').learnset.paraboliccharge = ["9L77"];
		this.modData('Learnsets','ragingbolt').learnset.weatherball = ["9L84"];
		this.modData('Learnsets','ragingbolt').learnset.dragonpulse = ["9L91", "9M"];
		this.modData('Learnsets','ragingbolt').learnset.bulldoze = ["9M"];
		delete this.modData('Learnsets','ragingbolt').learnset.ancientpower;
		delete this.modData('Learnsets','ragingbolt').learnset.stomp;
		// Power Chassis
		this.modData('Learnsets','powerchassis').learnset.meteorassault = ["9D"];
		this.modData('Learnsets','powerchassis').learnset.quickattack = ["9L1"];
		this.modData('Learnsets','powerchassis').learnset.leer = ["9L1"];
		this.modData('Learnsets','powerchassis').learnset.confusion = ["9L1"];
		this.modData('Learnsets','powerchassis').learnset.hornattack = ["9L7"];
		this.modData('Learnsets','powerchassis').learnset.rocktomb = ["9L14", "9M"];
		this.modData('Learnsets','powerchassis').learnset.quickguard = ["9L21"];
		this.modData('Learnsets','powerchassis').learnset.rockpolish = ["9L35", "9M"];
		this.modData('Learnsets','powerchassis').learnset.sacredsword = ["9L42"];
		this.modData('Learnsets','powerchassis').learnset.stoneaxe = ["9L49"];
		this.modData('Learnsets','powerchassis').learnset.energyblade = ["9L56"];
		this.modData('Learnsets','powerchassis').learnset.closecombat = ["9L63"];
		this.modData('Learnsets','powerchassis').learnset.counter = ["9L70"];
		this.modData('Learnsets','powerchassis').learnset.hardpress = ["9L77"];
		this.modData('Learnsets','powerchassis').learnset.firstimpression = ["9L84"];
		this.modData('Learnsets','powerchassis').learnset.rockslide = ["9M"];
		delete this.modData('Learnsets','powerchassis').learnset.rockthrow;
		delete this.modData('Learnsets','powerchassis').learnset.slash;
		// Laser Crown
		this.modData('Learnsets','lasercrown').learnset.metalsound = ["9D"];
		this.modData('Learnsets','lasercrown').learnset.quickattack = ["9L1"];
		this.modData('Learnsets','lasercrown').learnset.workup = ["9L1", "9M"];
		this.modData('Learnsets','lasercrown').learnset.mirrorshot = ["9L7"];
		this.modData('Learnsets','lasercrown').learnset.quickguard = ["9L14"];
		this.modData('Learnsets','lasercrown').learnset.psychocut = ["9L21"];
		this.modData('Learnsets','lasercrown').learnset.irondefense = ["9L35", "9M"];
		this.modData('Learnsets','lasercrown').learnset.sacredsword = ["9L42"];
		this.modData('Learnsets','lasercrown').learnset.cuttinglaser = ["9L49"];
		this.modData('Learnsets','lasercrown').learnset.energyblade = ["9L56"];
		this.modData('Learnsets','lasercrown').learnset.closecombat = ["9L63"];
		this.modData('Learnsets','lasercrown').learnset.metalburst = ["9L70"];
		this.modData('Learnsets','lasercrown').learnset.futuresight = ["9L77", "9M"];
		this.modData('Learnsets','lasercrown').learnset.voltswitch = ["9L84", "9M"];
		delete this.modData('Learnsets','lasercrown').learnset.metalclaw;
		delete this.modData('Learnsets','lasercrown').learnset.slash;
		// Terapagos
		this.modData('Learnsets','terapagos').learnset.preservation = ["9D"];
		this.modData('Learnsets','terapagos').learnset.terablast = ["9L60", "9M"];
		this.modData('Learnsets','terapagos').learnset.terastarstorm = ["9L100"];
		this.modData('Learnsets','terapagos').learnset.bulldoze = ["9M"];
		this.modData('Learnsets','terapagos').learnset.dive = ["9M"];
		this.modData('Learnsets','terapagos').learnset.dreameater = ["9M"];
		this.modData('Learnsets','terapagos').learnset.flash = ["9M"];
		this.modData('Learnsets','terapagos').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','terapagos').learnset.lastresort = ["9M"];
		this.modData('Learnsets','terapagos').learnset.naturepower = ["9M"];
		this.modData('Learnsets','terapagos').learnset.psychup = ["9M"];
		this.modData('Learnsets','terapagos').learnset.rockpolish = ["9M"];
		this.modData('Learnsets','terapagos').learnset.signalbeam = ["9M"];
		// Pecharunt
		this.modData('Learnsets','pecharunt').learnset.toxicthread = ["9D"];
		this.modData('Learnsets','pecharunt').learnset.embargo = ["9M"];
		this.modData('Learnsets','pecharunt').learnset.torment = ["9M"];

		// Syclar
		this.modData('Learnsets','syclar').learnset.ambush = ["9D"];
		this.modData('Learnsets','syclar').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','syclar').learnset.chillywater = ["9M"];
		this.modData('Learnsets','syclar').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','syclar').learnset.absorb;
		// Syclant
		this.modData('Learnsets','syclant').learnset.ambush = ["9D"];
		this.modData('Learnsets','syclant').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','syclant').learnset.chillywater = ["9M"];
		this.modData('Learnsets','syclant').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','syclant').learnset.screech = ["9M"];
		this.modData('Learnsets','syclant').learnset.stringshot = ["9M"];
		this.modData('Learnsets','syclant').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','syclant').learnset.absorb;
		// Revenankh
		this.modData('Learnsets','revenankh').learnset.poweruppunch = ["9D"];
		this.modData('Learnsets','revenankh').learnset.phantomforce = ["9M"];
		this.modData('Learnsets','revenankh').learnset.poltergeist = ["9M"];
		// Embirch
		this.modData('Learnsets','embirch').learnset.strangesmoke = ["9D"];
		this.modData('Learnsets','embirch').learnset.pelletshot = ["9E"];
		// Flarelm
		this.modData('Learnsets','flarelm').learnset.strangesmoke = ["9D"];
		this.modData('Learnsets','flarelm').learnset.preheat = ["9L1"];
		this.modData('Learnsets','flarelm').learnset.fullcollide = ["9M"];
		delete this.modData('Learnsets','flarelm').learnset.earthquake;
		// Pyroak
		this.modData('Learnsets','pyroak').learnset.strangesmoke = ["9D"];
		this.modData('Learnsets','pyroak').learnset.leafstorm = ["9L1"];
		this.modData('Learnsets','pyroak').learnset.preheat = ["9L1"];
		this.modData('Learnsets','pyroak').learnset.napalm = ["9L64"];
		this.modData('Learnsets','pyroak').learnset.fullcollide = ["9M"];
		// Breezi
		this.modData('Learnsets','breezi').learnset.aerate = ["9D"];
		this.modData('Learnsets','breezi').learnset.bounce = ["9M"];
		this.modData('Learnsets','breezi').learnset.gunkshot = ["9M"];
		this.modData('Learnsets','breezi').learnset.toxic = ["9M"];
		// Fidgit
		this.modData('Learnsets','fidgit').learnset.aerate = ["9D"];
		this.modData('Learnsets','fidgit').learnset.bounce = ["9M"];
		this.modData('Learnsets','fidgit').learnset.gunkshot = ["9M"];
		this.modData('Learnsets','fidgit').learnset.smartstrike = ["9M"];
		this.modData('Learnsets','fidgit').learnset.tantrum = ["9M"];
		this.modData('Learnsets','fidgit').learnset.toxic = ["9M"];
		// Rebble
		this.modData('Learnsets','rebble').learnset.cosmicpower = ["9D"];
		this.modData('Learnsets','rebble').learnset.dustspray = ["9L8"];
		delete this.modData('Learnsets','rebble').learnset.mudslap;
		// Tactite
		this.modData('Learnsets','tactite').learnset.cosmicpower = ["9D"];
		this.modData('Learnsets','tactite').learnset.dustspray = ["9L8"];
		delete this.modData('Learnsets','tactite').learnset.mudslap;
		// Stratagem
		this.modData('Learnsets','stratagem').learnset.cosmicpower = ["9D"];
		this.modData('Learnsets','stratagem').learnset.dustspray = ["9L8"];
		this.modData('Learnsets','stratagem').learnset.meteorbeam = ["9L0", "9T"];
		delete this.modData('Learnsets','stratagem').learnset.mudslap;
		delete this.modData('Learnsets','stratagem').learnset.paleowave;
		// Privatyke
		this.modData('Learnsets','privatyke').learnset.throatchop = ["9D"];
		this.modData('Learnsets','privatyke').learnset.whitewater = ["9L4"];
		this.modData('Learnsets','privatyke').learnset.aquacutter = ["9L32"];
		this.modData('Learnsets','privatyke').learnset.bubblebeam = ["9E"];
		this.modData('Learnsets','privatyke').learnset.octazooka = ["9E"];
		delete this.modData('Learnsets','privatyke').learnset.blizzard;
		delete this.modData('Learnsets','privatyke').learnset.earthquake;
		// Arghonaut
		this.modData('Learnsets','arghonaut').learnset.throatchop = ["9D"];
		this.modData('Learnsets','arghonaut').learnset.lashout = ["9L0"];
		this.modData('Learnsets','arghonaut').learnset.whitewater = ["9L4"];
		this.modData('Learnsets','arghonaut').learnset.aquacutter = ["9L32"];
		this.modData('Learnsets','arghonaut').learnset.hydropump = ["9M"];
		delete this.modData('Learnsets','arghonaut').learnset.blizzard;
		// Nohface
		this.modData('Learnsets','nohface').learnset.playdead = ["9D"];
		this.modData('Learnsets','nohface').learnset.pounce = ["9L8"];
		this.modData('Learnsets','nohface').learnset.doubleteam = ["9E"];
		this.modData('Learnsets','nohface').learnset.odorsleuth = ["9E"];
		this.modData('Learnsets','nohface').learnset.phantomforce = ["9M"];
		// Kitsunoh
		this.modData('Learnsets','kitsunoh').learnset.playdead = ["9D"];
		this.modData('Learnsets','kitsunoh').learnset.pounce = ["9L8"];
		this.modData('Learnsets','kitsunoh').learnset.shadowbone = ["9L48"];
		this.modData('Learnsets','kitsunoh').learnset.phantomforce = ["9M"];
		this.modData('Learnsets','kitsunoh').learnset.poltergeist = ["9M"];
		this.modData('Learnsets','kitsunoh').learnset.midnight = ["9T"];
		this.modData('Learnsets','kitsunoh').learnset.steelbeam = ["9T"];
		delete this.modData('Learnsets','kitsunoh').learnset.doubleteam;
		delete this.modData('Learnsets','kitsunoh').learnset.icepunch;
		delete this.modData('Learnsets','kitsunoh').learnset.odorsleuth;
		delete this.modData('Learnsets','kitsunoh').learnset.shadowstrike;
		delete this.modData('Learnsets','kitsunoh').learnset.thunderpunch;
		// Monohm
		this.modData('Learnsets','monohm').learnset.mindreader = ["9D"];
		this.modData('Learnsets','monohm').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','monohm').learnset.electroball = ["9M"];
		delete this.modData('Learnsets','monohm').learnset.blizzard;
		delete this.modData('Learnsets','monohm').learnset.fireblast;
		delete this.modData('Learnsets','monohm').learnset.icebeam;
		// Duohm
		this.modData('Learnsets','duohm').learnset.mindreader = ["9D"];
		this.modData('Learnsets','duohm').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','duohm').learnset.electroball = ["9M"];
		delete this.modData('Learnsets','duohm').learnset.blizzard;
		delete this.modData('Learnsets','duohm').learnset.fireblast;
		delete this.modData('Learnsets','duohm').learnset.icebeam;
		// Cyclohm
		this.modData('Learnsets','cyclohm').learnset.chaoticstorm = ["9D"];
		this.modData('Learnsets','cyclohm').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','cyclohm').learnset.electroball = ["9M"];
		this.modData('Learnsets','cyclohm').learnset.hurricane = ["9M"];
		delete this.modData('Learnsets','cyclohm').learnset.fireblast;
		// Dorsoil
		this.modData('Learnsets','dorsoil').learnset.rebound = ["9D"];
		this.modData('Learnsets','dorsoil').learnset.dustspray = ["9L16"];
		this.modData('Learnsets','dorsoil').learnset.tussle = ["9L21"];
		this.modData('Learnsets','dorsoil').learnset.rapidspin = ["9L26"];
		this.modData('Learnsets','dorsoil').learnset.rototiller = ["9E"];
		this.modData('Learnsets','dorsoil').learnset.bodypress = ["9M"];
		delete this.modData('Learnsets','dorsoil').learnset.mudslap;
		delete this.modData('Learnsets','dorsoil').learnset.furyattack;
		// Colossoil
		this.modData('Learnsets','colossoil').learnset.rebound = ["9D"];
		this.modData('Learnsets','colossoil').learnset.dustspray = ["9L16"];
		this.modData('Learnsets','colossoil').learnset.tussle = ["9L21"];
		this.modData('Learnsets','colossoil').learnset.rapidspin = ["9L26"];
		this.modData('Learnsets','colossoil').learnset.bodypress = ["9M"];
		delete this.modData('Learnsets','colossoil').learnset.mudslap;
		delete this.modData('Learnsets','colossoil').learnset.furyattack;
		// Protowatt
		this.modData('Learnsets','protowatt').learnset.mefirst = ["9D"];
		this.modData('Learnsets','protowatt').learnset.flash = ["9M"];
		// Krilowatt
		this.modData('Learnsets','krilowatt').learnset.heartswap = ["9D"];
		this.modData('Learnsets','krilowatt').learnset.mindreader = ["9L46"];
		this.modData('Learnsets','krilowatt').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','krilowatt').learnset.electricterrain = ["9M"];
		this.modData('Learnsets','krilowatt').learnset.electroball = ["9M"];
		delete this.modData('Learnsets','krilowatt').learnset.blizzard;
		delete this.modData('Learnsets','krilowatt').learnset.earthquake;
		// Voodoll
		this.modData('Learnsets','voodoll').learnset.playdead = ["9D"];
		this.modData('Learnsets','voodoll').learnset.swing = ["9E"];
		// Voodoom
		this.modData('Learnsets','voodoom').learnset.spiritbreak = ["9D"];
		this.modData('Learnsets','voodoom').learnset.suckerpunch = ["9L1"];
		this.modData('Learnsets','voodoom').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','voodoom').learnset.poltergeist = ["9M"];
		// Scratchet
		this.modData('Learnsets','scratchet').learnset.morningsun = ["9D"];
		this.modData('Learnsets','scratchet').learnset.harden = ["9L1"];
		this.modData('Learnsets','scratchet').learnset.tussle = ["9L4"];
		this.modData('Learnsets','scratchet').learnset.pounce = ["9L23"];
		this.modData('Learnsets','scratchet').learnset.roar = ["9M"];
		// Tomohawk
		this.modData('Learnsets','tomohawk').learnset.morningsun = ["9D"];
		this.modData('Learnsets','tomohawk').learnset.whirlwind = ["9L0"];
		this.modData('Learnsets','tomohawk').learnset.aurasphere = ["9L1"];
		this.modData('Learnsets','tomohawk').learnset.sunnyday = ["9L1", "9M"];
		this.modData('Learnsets','tomohawk').learnset.raindance = ["9L1", "9M"];
		this.modData('Learnsets','tomohawk').learnset.scratch = ["9L1"];
		this.modData('Learnsets','tomohawk').learnset.harden = ["9L1"];
		this.modData('Learnsets','tomohawk').learnset.tussle = ["9L4"];
		this.modData('Learnsets','tomohawk').learnset.rocksmash = ["9L9", "9M"];
		this.modData('Learnsets','tomohawk').learnset.focusenergy = ["9L13"];
		this.modData('Learnsets','tomohawk').learnset.furyswipes = ["9L18"];
		this.modData('Learnsets','tomohawk').learnset.pounce = ["9L23"];
		this.modData('Learnsets','tomohawk').learnset.airslash = ["9L29"];
		this.modData('Learnsets','tomohawk').learnset.submission = ["9L37"];
		this.modData('Learnsets','tomohawk').learnset.hypervoice = ["9L43", "9M"];
		this.modData('Learnsets','tomohawk').learnset.skydrop = ["9L49"];
		this.modData('Learnsets','tomohawk').learnset.superpower = ["9L57", "9M"];
		this.modData('Learnsets','tomohawk').learnset.fellswoop = ["9L63"];
		this.modData('Learnsets','tomohawk').learnset.rest = ["9L69", "9M"];
		this.modData('Learnsets','tomohawk').learnset.healingwish = ["9L75"];
		this.modData('Learnsets','tomohawk').learnset.aerialace = ["9M"];
		this.modData('Learnsets','tomohawk').learnset.heatwave = ["9M"];
		this.modData('Learnsets','tomohawk').learnset.hurricane = ["9M"];
		this.modData('Learnsets','tomohawk').learnset.roar = ["9M"];
		this.modData('Learnsets','tomohawk').learnset.skyattack = ["9M"];
		// Necturine
		this.modData('Learnsets','necturine').learnset.sketch = ["9D"];
		this.modData('Learnsets','necturine').learnset.toxic = ["9M"];
		this.modData('Learnsets','necturine').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','necturine').learnset.leechlife;
		// Necturna
		this.modData('Learnsets','necturna').learnset.sketch = ["9D"];
		this.modData('Learnsets','necturna').learnset.toxic = ["9M"];
		this.modData('Learnsets','necturna').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','necturna').learnset.leechlife;
		// Mollux
		this.modData('Learnsets','mollux').learnset.lifedew = ["9D"];
		this.modData('Learnsets','mollux').learnset.preheat = ["9L1"];
		this.modData('Learnsets','mollux').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','mollux').learnset.leechlife;
		// Cupra
		this.modData('Learnsets','cupra').learnset.imprison = ["9D"];
		this.modData('Learnsets','cupra').learnset.doubleteam = ["9L1"];
		// Argalis
		this.modData('Learnsets','argalis').learnset.imprison = ["9D"];
		this.modData('Learnsets','argalis').learnset.doubleteam = ["9L1"];
		// Aurumoth
		this.modData('Learnsets','aurumoth').learnset.imprison = ["9D"];
		this.modData('Learnsets','aurumoth').learnset.doubleteam = ["9L1"];
		this.modData('Learnsets','aurumoth').learnset.silverwind = ["9L7"];
		this.modData('Learnsets','aurumoth').learnset.compensation = ["9M"];
		delete this.modData('Learnsets','aurumoth').learnset.blizzard;
		delete this.modData('Learnsets','aurumoth').learnset.thunder;
		// Brattler
		this.modData('Learnsets','brattler').learnset.spikyshield = ["9D"];
		this.modData('Learnsets','brattler').learnset.bind = ["9L1"];
		this.modData('Learnsets','brattler').learnset.powertrip = ["9L52"]; //Will update when Brattler itself is
		this.modData('Learnsets','brattler').learnset.compensation = ["9M"];
		this.modData('Learnsets','brattler').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','brattler').learnset.toxic = ["9M"];
		this.modData('Learnsets','brattler').learnset.coil = ["9E"];
		delete this.modData('Learnsets','brattler').learnset.wrap;
		// Malaconda
		this.modData('Learnsets','malaconda').learnset.rejuvenate = ["9D"];
		this.modData('Learnsets','malaconda').learnset.applebomb = ["9L0"];
		this.modData('Learnsets','malaconda').learnset.bind = ["9L1"];
		this.modData('Learnsets','malaconda').learnset.powertrip = ["9L52"];
		this.modData('Learnsets','malaconda').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','malaconda').learnset.compensation = ["9M"];
		this.modData('Learnsets','malaconda').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','malaconda').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','malaconda').learnset.wrap;
		// Cawdet
		this.modData('Learnsets','cawdet').learnset.throatchop = ["9D"];
		this.modData('Learnsets','cawdet').learnset.whirlpool = ["9M"];
		delete this.modData('Learnsets','cawdet').learnset.bellydrum;
		// Cawmodore
		this.modData('Learnsets','cawmodore').learnset.throatchop = ["9D"];
		this.modData('Learnsets','cawmodore').learnset.whirlpool = ["9M"];
		// Volkritter
		this.modData('Learnsets','volkritter').learnset.firelash = ["9D"];
		this.modData('Learnsets','volkritter').learnset.preheat = ["9L35"];
		this.modData('Learnsets','volkritter').learnset.liquidation = ["9E"];
		// Volkraken
		this.modData('Learnsets','volkraken').learnset.firelash = ["9D"];
		this.modData('Learnsets','volkraken').learnset.preheat = ["9L35"];
		// Snugglow
		this.modData('Learnsets','snugglow').learnset.overdrive = ["9D"];
		this.modData('Learnsets','snugglow').learnset.poisonsting = ["9L1"];
		this.modData('Learnsets','snugglow').learnset.thundershock = ["9L1"];
		this.modData('Learnsets','snugglow').learnset.supersonic = ["9L6"];
		this.modData('Learnsets','snugglow').learnset.acid = ["9L9"];
		this.modData('Learnsets','snugglow').learnset.pounce = ["9L12"];
		this.modData('Learnsets','snugglow').learnset.dive = ["9M"];
		this.modData('Learnsets','snugglow').learnset.electroball = ["9M"];
		this.modData('Learnsets','snugglow').learnset.surf = ["9M"];
		this.modData('Learnsets','snugglow').learnset.toxic = ["9M"];
		// Plasmanta
		this.modData('Learnsets','plasmanta').learnset.overdrive = ["9D"];
		this.modData('Learnsets','plasmanta').learnset.poisonsting = ["9L1"];
		this.modData('Learnsets','plasmanta').learnset.thundershock = ["9L1"];
		this.modData('Learnsets','plasmanta').learnset.supersonic = ["9L6"];
		this.modData('Learnsets','plasmanta').learnset.acid = ["9L9"];
		this.modData('Learnsets','plasmanta').learnset.pounce = ["9L12"];
		this.modData('Learnsets','plasmanta').learnset.bodypress = ["9M"];
		this.modData('Learnsets','plasmanta').learnset.dive = ["9M"];
		this.modData('Learnsets','plasmanta').learnset.electroball = ["9M"];
		this.modData('Learnsets','plasmanta').learnset.surf = ["9M"];
		this.modData('Learnsets','plasmanta').learnset.toxic = ["9M"];
		// Floatoy
		this.modData('Learnsets','floatoy').learnset.playnice = ["9D"];
		this.modData('Learnsets','floatoy').learnset.splash = ["9L1"];
		this.modData('Learnsets','floatoy').learnset.whitewater = ["9L3"];
		delete this.modData('Learnsets','floatoy').learnset.blizzard;
		// Caimanoe
		this.modData('Learnsets','caimanoe').learnset.muddywater = ["9D"];
		this.modData('Learnsets','caimanoe').learnset.splash = ["9L1"];
		this.modData('Learnsets','caimanoe').learnset.whitewater = ["9L3"];
		delete this.modData('Learnsets','caimanoe').learnset.blizzard;
		// Naviathan
		this.modData('Learnsets','naviathan').learnset.dragonhammer = ["9D"];
		this.modData('Learnsets','naviathan').learnset.nobleroar = ["9L0"];
		this.modData('Learnsets','naviathan').learnset.splash = ["9L1"];
		this.modData('Learnsets','naviathan').learnset.whitewater = ["9L3"];
		this.modData('Learnsets','naviathan').learnset.wavecrash = ["9L74"];
		this.modData('Learnsets','naviathan').learnset.bodypress = ["9M"];
		this.modData('Learnsets','naviathan').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','naviathan').learnset.screech = ["9M"];
		this.modData('Learnsets','naviathan').learnset.steelbeam = ["9T"];
		delete this.modData('Learnsets','naviathan').learnset.selfdestruct;
		// Crucibelle
		this.modData('Learnsets','crucibelle').learnset.venomdrench = ["9D"];
		this.modData('Learnsets','crucibelle').learnset.assurance = ["9M"];
		this.modData('Learnsets','crucibelle').learnset.faketears = ["9M"];
		this.modData('Learnsets','crucibelle').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','crucibelle').learnset.irondefense = ["9M"];
		this.modData('Learnsets','crucibelle').learnset.powergem = ["9M"];
		this.modData('Learnsets','crucibelle').learnset.toxic = ["9M"];
		// Pluffle
		this.modData('Learnsets','pluffle').learnset.rebound = ["9D"];
		this.modData('Learnsets','pluffle').learnset.daydream = ["9L1"];
		this.modData('Learnsets','pluffle').learnset.pounce = ["9L16"];
		this.modData('Learnsets','pluffle').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','pluffle').learnset.encore = ["9M"];
		// Kerfluffle
		this.modData('Learnsets','kerfluffle').learnset.rebound = ["9D"];
		this.modData('Learnsets','kerfluffle').learnset.daydream = ["9L1"];
		this.modData('Learnsets','kerfluffle').learnset.fairywind = ["9L5"];
		this.modData('Learnsets','kerfluffle').learnset.pounce = ["9L16"];
		this.modData('Learnsets','kerfluffle').learnset.snore = ["9L41", "9M"];
		this.modData('Learnsets','kerfluffle').learnset.allyswitch = ["9M"];
		this.modData('Learnsets','kerfluffle').learnset.endure = ["9M"];
		// Pajantom
		this.modData('Learnsets','pajantom').learnset.imprison = ["9D"];
		this.modData('Learnsets','pajantom').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','pajantom').learnset.hex = ["9M"];
		this.modData('Learnsets','pajantom').learnset.nastyplot = ["9M"];
		this.modData('Learnsets','pajantom').learnset.poltergeist = ["9M"];
		// Mumbao
		this.modData('Learnsets','mumbao').learnset.wish = ["9D"];
		this.modData('Learnsets','mumbao').learnset.daydream = ["9L21"];
		this.modData('Learnsets','mumbao').learnset.gigadrain = ["9L31"];
		this.modData('Learnsets','mumbao').learnset.naturalgift = ["9M"];
		this.modData('Learnsets','mumbao').learnset.teeterdance = ["9E"];
		// Jumbao
		this.modData('Learnsets','jumbao').learnset.wish = ["9D"];
		this.modData('Learnsets','jumbao').learnset.daydream = ["9L21"];
		this.modData('Learnsets','jumbao').learnset.gigadrain = ["9L32"];
		this.modData('Learnsets','jumbao').learnset.naturalgift = ["9M"];
		// Fawnifer
		this.modData('Learnsets','fawnifer').learnset.solarblade = ["9D"];
		this.modData('Learnsets','fawnifer').learnset.charm = ["9M"];
		this.modData('Learnsets','fawnifer').learnset.endure = ["9M"];
		this.modData('Learnsets','fawnifer').learnset.trailhead = ["9M"];
		// Electrelk
		this.modData('Learnsets','electrelk').learnset.solarblade = ["9D"];
		this.modData('Learnsets','electrelk').learnset.charm = ["9M"];
		this.modData('Learnsets','electrelk').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','electrelk').learnset.trailhead = ["9M"];
		// Caribolt
		this.modData('Learnsets','caribolt').learnset.solarblade = ["9D"];
		this.modData('Learnsets','caribolt').learnset.charm = ["9M"];
		this.modData('Learnsets','caribolt').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','caribolt').learnset.trailhead = ["9M"];
		// Smogecko
		this.modData('Learnsets','smogecko').learnset.strangesmoke = ["9D"];
		this.modData('Learnsets','smogecko').learnset.tussle = ["9L13"];
		this.modData('Learnsets','smogecko').learnset.preheat = ["9L44"];
		this.modData('Learnsets','smogecko').learnset.screech = ["9M"];
		this.modData('Learnsets','smogecko').learnset.toxic = ["9M"];
		// Smoguana
		this.modData('Learnsets','smoguana').learnset.strangesmoke = ["9D"];
		this.modData('Learnsets','smoguana').learnset.tussle = ["9L13"];
		this.modData('Learnsets','smoguana').learnset.preheat = ["9L46"];
		this.modData('Learnsets','smoguana').learnset.screech = ["9M"];
		this.modData('Learnsets','smoguana').learnset.toxic = ["9M"];
		// Smokomodo
		this.modData('Learnsets','smokomodo').learnset.strangesmoke = ["9D"];
		this.modData('Learnsets','smokomodo').learnset.tussle = ["9L13"];
		this.modData('Learnsets','smokomodo').learnset.preheat = ["9L49"];
		this.modData('Learnsets','smokomodo').learnset.screech = ["9M"];
		this.modData('Learnsets','smokomodo').learnset.toxic = ["9M"];
		// Swirlpool
		this.modData('Learnsets','swirlpool').learnset.lifedew = ["9D"];
		this.modData('Learnsets','swirlpool').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','swirlpool').learnset.blizzard;
		// Coribalis
		this.modData('Learnsets','coribalis').learnset.lifedew = ["9D"];
		this.modData('Learnsets','coribalis').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','coribalis').learnset.blizzard;
		// Snaelstrom
		this.modData('Learnsets','snaelstrom').learnset.lifedew = ["9D"];
		this.modData('Learnsets','snaelstrom').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','snaelstrom').learnset.blizzard;
		// Justyke
		this.modData('Learnsets','justyke').learnset.revenge = ["9D"];
		this.modData('Learnsets','justyke').learnset.gravity = ["9M"];
		this.modData('Learnsets','justyke').learnset.steelbeam = ["9T"];
		// Equilibra
		this.modData('Learnsets','equilibra').learnset.equalizer = ["9D"];
		this.modData('Learnsets','equilibra').learnset.gravity = ["9M"];
		this.modData('Learnsets','equilibra').learnset.steelbeam = ["9T"];
		// Solotl
		this.modData('Learnsets','solotl').learnset.lifedew = ["9D"];
		// Astrolotl
		this.modData('Learnsets','astrolotl').learnset.lifedew = ["9D"];
		// Miasmite
		this.modData('Learnsets','miasmite').learnset.jawlock = ["9D"];
		this.modData('Learnsets','miasmite').learnset.bugbite = ["9L17", "9M"];
		this.modData('Learnsets','miasmite').learnset.dragontail = ["9M"];
		this.modData('Learnsets','miasmite').learnset.nightmare = ["9M"];
		this.modData('Learnsets','miasmite').learnset.ambush = ["9E"];
		this.modData('Learnsets','miasmite').learnset.firefang = ["9E"];
		this.modData('Learnsets','miasmite').learnset.icefang = ["9E"];
		this.modData('Learnsets','miasmite').learnset.thunderfang = ["9E"];
		// Miasmaw
		this.modData('Learnsets','miasmaw').learnset.jawlock = ["9D"];
		this.modData('Learnsets','miasmaw').learnset.bugbite = ["9L17", "9M"];
		this.modData('Learnsets','miasmaw').learnset.block = ["9M"];
		this.modData('Learnsets','miasmaw').learnset.dragontail = ["9M"];
		this.modData('Learnsets','miasmaw').learnset.nightmare = ["9M"];
		// Chromera
		this.modData('Learnsets','chromera').learnset.octazooka = ["9D"];
		this.modData('Learnsets','chromera').learnset.pounce = ["9L10"];
		this.modData('Learnsets','chromera').learnset.aerialace = ["9L15", "9M"];
		this.modData('Learnsets','chromera').learnset.imprison = ["9L20"];
		this.modData('Learnsets','chromera').learnset.icefang = ["9L25"];
		this.modData('Learnsets','chromera').learnset.firefang = ["9L25"];
		this.modData('Learnsets','chromera').learnset.thunderfang = ["9L25"];
		this.modData('Learnsets','chromera').learnset.spite = ["9L30", "9M"];
		this.modData('Learnsets','chromera').learnset.firstimpression = ["9L35"];
		this.modData('Learnsets','chromera').learnset.tantrum = ["9L40", "9M"];
		this.modData('Learnsets','chromera').learnset.crunch = ["9L45"];
		this.modData('Learnsets','chromera').learnset.toxic = ["9L50", "9M"];
		this.modData('Learnsets','chromera').learnset.wideguard = ["9L55"];
		this.modData('Learnsets','chromera').learnset.lifedew = ["9L60"];
		this.modData('Learnsets','chromera').learnset.aromatherapy = ["9L65"];
		this.modData('Learnsets','chromera').learnset.block = ["9M"];
		this.modData('Learnsets','chromera').learnset.embargo = ["9M"];
		this.modData('Learnsets','chromera').learnset.honeclaws = ["9M"];
		this.modData('Learnsets','chromera').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','chromera').learnset.nightmare = ["9M"];
		this.modData('Learnsets','chromera').learnset.roar = ["9M"];
		this.modData('Learnsets','chromera').learnset.signalbeam = ["9M"];
		this.modData('Learnsets','chromera').learnset.strength = ["9M"];
		// Venomicon
		this.modData('Learnsets','venomicon').learnset.jawlock = ["9D"];
		this.modData('Learnsets','venomicon').learnset.curse = ["9L50"];
		this.modData('Learnsets','venomicon').learnset.fellswoop = ["9L55"];
		this.modData('Learnsets','venomicon').learnset.hurricane = ["9M"];
		this.modData('Learnsets','venomicon').learnset.toxic = ["9M"];
		delete this.modData('Learnsets','venomicon').learnset.coil;
		// Saharascal
		this.modData('Learnsets','saharascal').learnset.jumpkick = ["9D"];
		this.modData('Learnsets','saharascal').learnset.dustspray = ["9L4"];
		this.modData('Learnsets','saharascal').learnset.tussle = ["9L16"];
		this.modData('Learnsets','saharascal').learnset.bulldoze = ["9L32", "9M"];
		this.modData('Learnsets','saharascal').learnset.sandblast = ["9L44"];
		this.modData('Learnsets','saharascal').learnset.earthquake = ["9M"];
		this.modData('Learnsets','saharascal').learnset.fissure = ["9L48"];
		this.modData('Learnsets','saharascal').learnset.smackdown = ["9M"];
		this.modData('Learnsets','saharascal').learnset.waterpulse = ["9M"];
		this.modData('Learnsets','saharascal').learnset.watergun = ["9E"];
		// Saharaja
		this.modData('Learnsets','saharaja').learnset.diamondstorm = ["9D"];
		this.modData('Learnsets','saharaja').learnset.highhorsepower = ["9L0"];
		this.modData('Learnsets','saharaja').learnset.dustspray = ["9L1"];
		this.modData('Learnsets','saharaja').learnset.tussle = ["9L1"];
		this.modData('Learnsets','saharaja').learnset.sandblast = ["9L1"];
		this.modData('Learnsets','saharaja').learnset.earthquake = ["9M"];
		this.modData('Learnsets','saharaja').learnset.flash = ["9M"];
		this.modData('Learnsets','saharaja').learnset.quash = ["9M"];
		this.modData('Learnsets','saharaja').learnset.smackdown = ["9M"];
		this.modData('Learnsets','saharaja').learnset.strength = ["9M"];
		this.modData('Learnsets','saharaja').learnset.waterpulse = ["9M"];
		delete this.modData('Learnsets','saharaja').learnset.watergun;
		// Ababo
		this.modData('Learnsets','ababo').learnset.splash = ["9D"];
		this.modData('Learnsets','ababo').learnset.tackle = ["9L1"];
		this.modData('Learnsets','ababo').learnset.drainingkiss = ["9L12"];
		this.modData('Learnsets','ababo').learnset.explosion = ["9M"];
		this.modData('Learnsets','ababo').learnset.gigadrain = ["9M"];
		this.modData('Learnsets','ababo').learnset.incinerate = ["9M"];
		this.modData('Learnsets','ababo').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','ababo').learnset.nightmare = ["9M"];
		this.modData('Learnsets','ababo').learnset.shockwave = ["9M"];
		this.modData('Learnsets','ababo').learnset.disarmingvoice = ["9E"];
		this.modData('Learnsets','ababo').learnset.quickattack = ["9E"];
		this.modData('Learnsets','ababo').learnset.rapidspin = ["9E"];
		delete this.modData('Learnsets','ababo').learnset.extremespeed;
		delete this.modData('Learnsets','ababo').learnset.flamethrower;
		delete this.modData('Learnsets','ababo').learnset.metronome;
		delete this.modData('Learnsets','ababo').learnset.pound;
		// Scattervein
		this.modData('Learnsets','scattervein').learnset.lovelykiss = ["9D"];
		this.modData('Learnsets','scattervein').learnset.leechlife = ["9L0"];
		this.modData('Learnsets','scattervein').learnset.tackle = ["9L1"];
		this.modData('Learnsets','scattervein').learnset.drainingkiss = ["9L1"];
		this.modData('Learnsets','scattervein').learnset.bind = ["9L1"];
		this.modData('Learnsets','scattervein').learnset.pounce = ["9L8"];
		this.modData('Learnsets','scattervein').learnset.recover = ["9L28"];
		this.modData('Learnsets','scattervein').learnset.strangesmoke = ["9L36"];
		this.modData('Learnsets','scattervein').learnset.terrify = ["9L40"];
		this.modData('Learnsets','scattervein').learnset.brutalswing = ["9L12", "9M"];
		this.modData('Learnsets','scattervein').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','scattervein').learnset.block = ["9M"];
		this.modData('Learnsets','scattervein').learnset.explosion = ["9M"];
		this.modData('Learnsets','scattervein').learnset.gigadrain = ["9M"];
		this.modData('Learnsets','scattervein').learnset.incinerate = ["9M"];
		this.modData('Learnsets','scattervein').learnset.knockoff = ["9M"];
		this.modData('Learnsets','scattervein').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','scattervein').learnset.nightmare = ["9M"];
		this.modData('Learnsets','scattervein').learnset.painsplit = ["9M"];
		this.modData('Learnsets','scattervein').learnset.roleplay = ["9M"];
		this.modData('Learnsets','scattervein').learnset.screech = ["9M"];
		this.modData('Learnsets','scattervein').learnset.shockwave = ["9M"];
		this.modData('Learnsets','scattervein').learnset.torment = ["9M"];
		this.modData('Learnsets','scattervein').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','scattervein').learnset.extremespeed;
		delete this.modData('Learnsets','scattervein').learnset.moonblast;
		delete this.modData('Learnsets','scattervein').learnset.moonlight;
		delete this.modData('Learnsets','scattervein').learnset.thunder;
		delete this.modData('Learnsets','scattervein').learnset.thunderbolt;
		delete this.modData('Learnsets','scattervein').learnset.wrap;
		// Hemogoblin
		this.modData('Learnsets','hemogoblin').learnset.lovelykiss = ["9D"];
		this.modData('Learnsets','hemogoblin').learnset.flameburst = ["9L0"];
		this.modData('Learnsets','hemogoblin').learnset.flareblitz = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.fairyfire = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.pelletshot = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.playrough = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.leechlife = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.tackle = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.drainingkiss = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.bind = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.pounce = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.recover = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.strangesmoke = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.terrify = ["9L1"];
		this.modData('Learnsets','hemogoblin').learnset.brutalswing = ["9L1", "9M"];
		this.modData('Learnsets','hemogoblin').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.block = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.chipaway = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.eerieimpulse = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.endeavor = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.explosion = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.gigadrain = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.incinerate = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.knockoff = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.nightmare = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.painsplit = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.roleplay = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.screech = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.shockwave = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.torment = ["9M"];
		this.modData('Learnsets','hemogoblin').learnset.vitaldrain = ["9M"];
		delete this.modData('Learnsets','hemogoblin').learnset.bitterblade;
		delete this.modData('Learnsets','hemogoblin').learnset.moonblast;
		delete this.modData('Learnsets','hemogoblin').learnset.moonlight;
		delete this.modData('Learnsets','hemogoblin').learnset.thunder;
		delete this.modData('Learnsets','hemogoblin').learnset.wrap;
		// Cresceidon
		this.modData('Learnsets','cresceidon').learnset.moonlight = ["9D"];
		this.modData('Learnsets','cresceidon').learnset.whitewater = ["9L1"];
		this.modData('Learnsets','cresceidon').learnset.liquidation = ["9L60"];
		this.modData('Learnsets','cresceidon').learnset.block = ["9M"];
		this.modData('Learnsets','cresceidon').learnset.brine = ["9M"];
		this.modData('Learnsets','cresceidon').learnset.dive = ["9M"];
		this.modData('Learnsets','cresceidon').learnset.dreameater = ["9M"];
		this.modData('Learnsets','cresceidon').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','cresceidon').learnset.flash = ["9M"];
		this.modData('Learnsets','cresceidon').learnset.gravity = ["9M"];
		this.modData('Learnsets','cresceidon').learnset.magiccoat = ["9M"];
		this.modData('Learnsets','cresceidon').learnset.heavyslam = ["9E"];
		delete this.modData('Learnsets','cresceidon').learnset.doubleedge;
		delete this.modData('Learnsets','cresceidon').learnset.pound;
		// Chuggon
		/*this.modData('Learnsets','chuggon').learnset.lovelykiss = ["9D"];
		this.modData('Learnsets','chuggon').learnset.block = ["9M"];
		this.modData('Learnsets','chuggon').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','chuggon').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','chuggon').learnset.incinerate = ["9M"];
		this.modData('Learnsets','chuggon').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','chuggon').learnset.screech = ["9M"];
		// Draggalong
		this.modData('Learnsets','draggalong').learnset.lovelykiss = ["9D"];
		this.modData('Learnsets','draggalong').learnset.bind = ["9L1"];
		this.modData('Learnsets','draggalong').learnset.dragonhammer = ["9L1"];
		this.modData('Learnsets','draggalong').learnset.block = ["9M"];
		this.modData('Learnsets','draggalong').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','draggalong').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','draggalong').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','draggalong').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','draggalong').learnset.incinerate = ["9M"];
		this.modData('Learnsets','draggalong').learnset.irontail = ["9M"];
		this.modData('Learnsets','draggalong').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','draggalong').learnset.screech = ["9M"];
		// Chuggalong
		this.modData('Learnsets','chuggalong').learnset.lovelykiss = ["9D"];
		this.modData('Learnsets','chuggalong').learnset.bind = ["9L1"];
		this.modData('Learnsets','chuggalong').learnset.dragonhammer = ["9L1"];
		this.modData('Learnsets','chuggalong').learnset.block = ["9M"];
		this.modData('Learnsets','chuggalong').learnset.breakingswipe = ["9M"];
		this.modData('Learnsets','chuggalong').learnset.brutalswing = ["9M"];
		this.modData('Learnsets','chuggalong').learnset.echoedvoice = ["9M"];
		this.modData('Learnsets','chuggalong').learnset.fullcollide = ["9M"];
		this.modData('Learnsets','chuggalong').learnset.incinerate = ["9M"];
		this.modData('Learnsets','chuggalong').learnset.irontail = ["9M"];
		this.modData('Learnsets','chuggalong').learnset.laserfocus = ["9M"];
		this.modData('Learnsets','chuggalong').learnset.screech = ["9M"];*/
	},
};