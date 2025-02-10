import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';

// Similar to User.usergroups. Cannot import here due to users.ts requiring Chat
// This also acts as a cache, meaning ranks will only update when a hotpatch/restart occurs
const usergroups: {[userid: string]: string} = {};
const usergroupData = FS('config/usergroups.csv').readIfExistsSync().split('\n');
for (const row of usergroupData) {
	if (!toID(row)) continue;

	const cells = row.split(',');
	if (cells.length > 3) throw new Error(`Invalid entry when parsing usergroups.csv`);
	usergroups[toID(cells[0])] = cells[1].trim() || ' ';
}

export function getName(name: string): string {
	const userid = toID(name);
	if (!userid) throw new Error('No/Invalid name passed to getSymbol');

	const group = usergroups[userid] || ' ';
	return group + name;
}

export const Moves: {[k: string]: ModdedMoveData} = {
	//weather setting moves
	settheswarm: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set The Swarm",
		shortDesc: "Sets The Swarm.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'theswarm',
		secondary: null,
		target: "all",
		type: "Bug",
	},
	settwilightzone: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Twilight Zone",
		shortDesc: "Sets Twilight Zone.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'twilightzone',
		secondary: null,
		target: "all",
		type: "Dark",
	},
	setlotsofreallysmalldragons: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Lots of Really Small Dragons",
		shortDesc: "Sets Lots of Really Small Dragons.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'lotsofreallysmalldragons',
		secondary: null,
		target: "all",
		type: "Dragon",
	},
	setthunderstorm: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Thunderstorm",
		shortDesc: "Sets Thunderstorm.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'thunderstorm',
		secondary: null,
		target: "all",
		type: "Electric",
	},
	setfable: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Fable",
		shortDesc: "Sets Fable.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'fable',
		secondary: null,
		target: "all",
		type: "Fairy",
	},
	setcolosseum: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Colosseum",
		shortDesc: "Sets Colosseum.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'colosseum',
		secondary: null,
		target: "all",
		type: "Fighting",
	},
	setdrought: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Drought",
		shortDesc: "Sets Drought.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'drought',
		secondary: null,
		target: "all",
		type: "Fire",
	},
	setdeltastream: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Delta Stream",
		shortDesc: "Sets Delta Stream.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'deltastream',
		secondary: null,
		target: "all",
		type: "Flying",
	},
	setthevoices: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set THE VOICES",
		shortDesc: "Sets THE VOICES.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'thevoices',
		secondary: null,
		target: "all",
		type: "Ghost",
	},
	setovergrowth: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Overgrowth",
		shortDesc: "Sets Overgrowth.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'overgrowth',
		secondary: null,
		target: "all",
		type: "Grass",
	},
	setduststorm: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Dust Storm",
		shortDesc: "Sets Dust Storm.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'duststorm',
		secondary: null,
		target: "all",
		type: "Ground",
	},
	setwhiteout: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Whiteout",
		shortDesc: "Sets Whiteout.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'whiteout',
		secondary: null,
		target: "all",
		type: "Ice",
	},
	setmetronomebattle: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Metronome Battle",
		shortDesc: "Sets Metronome Battle.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'metronomebattle',
		secondary: null,
		target: "all",
		type: "Normal",
	},
	setshitstorm: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Shitstorm",
		shortDesc: "Sets Shitstorm.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'shitstorm',
		secondary: null,
		target: "all",
		type: "Poison",
	},
	setmindfuck: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Mindfuck",
		shortDesc: "Sets Mindfuck.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'mindfuck',
		secondary: null,
		target: "all",
		type: "Psychic",
	},
	setlandslide: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Landslide",
		shortDesc: "Sets Landslide.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'landslide',
		secondary: null,
		target: "all",
		type: "Rock",
	},
	settimewarp: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Time Warp",
		shortDesc: "Sets Time Warp.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'timewarp',
		secondary: null,
		target: "all",
		type: "Steel",
	},
	setflashflood: {
		isViable: false,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Set Flash Flood",
		shortDesc: "Sets Flash Flood.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1},
		pseudoWeather: 'flashflood',
		secondary: null,
		target: "all",
		type: "Water",
	},
	
	//weather abusing moves
	twineedle: {
		inherit: true,
		isViable: true,
		isNonstandard: null,
		shortDesc: "Hits 2 times; 20% to poison; 5 times in The Swarm.",
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.theswarm) {
				move.multihit = 5;
			}
		},
	},
	snatch: {
		inherit: true,
		isViable: true,
		isNonstandard: null,
		shortDesc: "Steals certain status moves. Steals <= 60 BP moves in Twilight Zone.",
		volatileStatus: 'snatch',
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'Snatch');
			},
			onAnyPrepareHitPriority: -1,
			onAnyPrepareHit(source, target, move) {
				const snatchUser = this.effectState.source;
				if (snatchUser.isSkyDropped()) return;
				if (this.field.pseudoWeather.twilightzone && (!move || move.basePower > 60)) return;
				if (!this.field.pseudoWeather.twilightzone && (!move || move.isZ || move.isMax || !move.flags['snatch'] || move.sourceEffect === 'snatch')) {
					return;
				}
				snatchUser.removeVolatile('snatch');
				this.add('-activate', snatchUser, 'move: Snatch', '[of] ' + source);
				this.actions.useMove(move.id, snatchUser);
				return null;
			},
		},
	},
	dragonrage: {
		inherit: true,
		isViable: true,
		isNonstandard: null,
		shortDesc: "Deals 40 damage. 100 damage in LoRSD.",
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.lotsofreallysmalldragons) {
				move.damage = 100;
			}
		},
	},
	charge: {
		inherit: true,
		isViable: true,
		shortDesc: "+1 SpD, next Electric move 2x, 33% heal in Thunderstorm.",
		condition: {
			onStart(pokemon, source, effect) {
				if (effect && ['Short Circuit', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Charge');
				}
				if (this.field.pseudoWeather.thunderstorm) {
					this.heal(pokemon.maxhp / 3, pokemon, pokemon, effect);
				}
			},
			onRestart(pokemon, source, effect) {
				if (effect && ['Short Circuit', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Charge');
				}
				if (this.field.pseudoWeather.thunderstorm) {
					this.heal(pokemon.maxhp / 3, pokemon, pokemon, effect);
				}
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
			onMoveAborted(pokemon, target, move) {
				if (move.type === 'Electric' && move.id !== 'charge') {
					pokemon.removeVolatile('charge');
				}
			},
			onAfterMove(pokemon, target, move) {
				if (move.type === 'Electric' && move.id !== 'charge') {
					pokemon.removeVolatile('charge');
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Charge', '[silent]');
			},
		},
	},
	mistyexplosion: {
		inherit: true,
		isViable: true,
		shortDesc: "Doesn't faint and 1.5x power in Fable.",
		basePower: 100,
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.fable) {
				move.basePower = 150;
				delete move.selfdestruct;
			}
		},
	},
	upperhand: {
		inherit: true,
		isViable: true,
		shortDesc: "Doesn't fail, doesn't flinch in Colosseum.",
		onTryHit(target, pokemon, move) {
			if (this.field.getPseudoWeather('colosseum')) {
				delete move.secondaries;
				return;
			}
            const action = this.queue.willMove(target);
            const targetMove = action?.choice === 'move' ? action.move : null;
            if (!targetMove || targetMove.priority <= 0.1 || targetMove.category === 'Status') {
                return false;
            }
        },
	},
	firepledge: {
		inherit: true,
		isViable: true,
		shortDesc: "Sets Sea of Fire if Drought.",
		onModifyMove(move) {
			if (this.field.pseudoWeather.drought) move.sideCondition = 'firepledge';
		},
	},
	tailwind: {
		inherit: true,
		shortDesc: "Sets Tailwind for 4 turns, 6 if Delta Stream.",
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (this.field.pseudoWeather.deltastream) {
					return 6;
				}
				if (!effect) return 2;
				return 4;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Tailwind', '[persistent]');
				} else {
					this.add('-sidestart', side, 'move: Tailwind');
				}
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
	},
	destinybond: {
		inherit: true,
		shortDesc: "Can be used consecutively if THE VOICES is active.",
		onPrepareHit(pokemon) {
			if(this.field.pseudoWeather.thevoices) pokemon.removeVolatile('destinybond');
		},
	},
	grasspledge: {
		inherit: true,
		isViable: true,
		shortDesc: "Sets Swamp if Overgrowth is active.",
		onModifyMove(move) {
			if (this.field.pseudoWeather.overgrowth) move.sideCondition = 'grasspledge';
		},
	},
	spikes: {
		inherit: true,
		shortDesc: "Sets twice at a time and deals double damage if Dust Storm is active.",
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = this.field.pseudoWeather.duststorm ? 2 : 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				const additive = this.field.pseudoWeather.duststorm ? 2 : 1;
				this.effectState.layers += additive;
				if(this.effectState.layers > 3) this.effectState.layers = 3;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				const denominator = this.field.pseudoWeather.duststorm ? 12 : 24;
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / denominator);
			},
		},
	},
	sandtomb: {
		inherit: true,
		isViable: true,
		shortDesc: "Traps and lowers Defense by 1 if Dust Storm is active.",
		onModifyMove(move) {
			if (this.field.pseudoWeather.duststorm) move.volatileStatus = 'sandtomb';
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Sand Tomb', '[silent]');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				if (this.field.pseudoWeather.duststorm) this.boost({def: -1}, pokemon, pokemon, this.dex.getActiveMove('sandtomb'));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sand Tomb', '[silent]');
			},
		},
	},
	iceball: {
		inherit: true,
		isViable: true,
		isNonstandard: null,
		accuracy: 100,
		shortDesc: "2x power and doesn't lock in Whiteout.",
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			const iceballData = pokemon.volatiles['iceball'];
			if (iceballData?.hitCount) {
				bp *= Math.pow(2, iceballData.contactHitCount);
			}
			if (iceballData && pokemon.status !== 'slp') {
				iceballData.hitCount++;
				iceballData.contactHitCount++;
				if (iceballData.hitCount < 5) {
					iceballData.duration = 2;
				}
			}
			if (pokemon.volatiles['defensecurl']) {
				bp *= 2;
			}
			if (this.field.pseudoWeather.whiteout) {
				bp *= 2;
			}
			return bp;
		},
		condition: {
			duration: 1,
			onLockMove(pokemon) {
				if (this.field.getPseudoWeather('whiteout')) return;
				return 'iceball';
			},
			onStart() {
				this.effectState.hitCount = 0;
				this.effectState.contactHitCount = 0;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['iceball'];
				}
			},
		},
	},
	metronome: {
		inherit: true,
		isViable: true,
		shortDesc: "Picks good moves in Metronome battle.",
		onHit(target, source, effect) {
			const GOOD_STATUS_MOVES = [
				'acidarmor', 'agility', 'aromatherapy', 'auroraveil', 'autotomize', 'banefulbunker', 'batonpass', 'bellydrum', 'bulkup', 'calmmind', 'chillyreception', 'clangoroussoul', 'coil', 'cottonguard', 'courtchange', 'curse', 'defog', 'destinybond', 'detect', 'disable', 'dragondance', 'encore', 'extremeevoboost', 'filletaway', 'geomancy', 'glare', 'haze', 'healbell', 'healingwish', 'healorder', 'heartswap', 'honeclaws', 'kingsshield', 'leechseed', 'lightscreen', 'lovelykiss', 'lunardance', 'magiccoat', 'maxguard', 'memento', 'milkdrink', 'moonlight', 'morningsun', 'nastyplot', 'naturesmadness', 'noretreat', 'obstruct', 'painsplit', 'partingshot', 'perishsong', 'protect', 'quiverdance', 'recover', 'reflect', 'reflecttype', 'rest', 'revivalblessing', 'roar', 'rockpolish', 'roost', 'shedtail', 'shellsmash', 'shiftgear', 'shoreup', 'silktrap', 'slackoff', 'sleeppowder', 'sleeptalk', 'softboiled', 'spikes', 'spikyshield', 'spore', 'stealthrock', 'stickyweb', 'strengthsap', 'substitute', 'switcheroo', 'swordsdance', 'synthesis', 'tailglow', 'tailwind', 'taunt', 'thunderwave', 'tidyup', 'toxic', 'transform', 'trick', 'victorydance', 'whirlwind', 'willowisp', 'wish', 'yawn',
			];
			const GOOD_WEAK_MOVES = [
				'accelerock', 'acrobatics', 'aquacutter', 'avalanche', 'barbbarrage', 'bonemerang', 'bouncybubble', 'bulletpunch', 'buzzybuzz', 'ceaselessedge', 'circlethrow', 'clearsmog', 'doubleironbash', 'dragondarts', 'dragontail', 'drainingkiss', 'endeavor', 'facade', 'firefang', 'flipturn', 'flowertrick', 'freezedry', 'frustration', 'geargrind', 'grassknot', 'gyroball', 'icefang', 'iceshard', 'iciclespear', 'infernalparade', 'jetpunch', 'knockoff', 'lastrespects', 'lowkick', 'machpunch', 'mortalspin', 'mysticalpower', 'naturesmadness', 'nightshade', 'nuzzle', 'pikapapow', 'populationbomb', 'psychocut', 'psyshieldbash', 'pursuit', 'quickattack', 'ragefist', 'rapidspin', 'return', 'rockblast', 'ruination', 'saltcure', 'scorchingsands', 'seismictoss', 'shadowclaw', 'shadowsneak', 'sizzlyslide', 'skydrop', 'stoneaxe', 'storedpower', 'stormthrow', 'suckerpunch', 'superfang', 'surgingstrikes', 'tailslap', 'trailblaze', 'tripleaxel', 'tripledive', 'twinbeam', 'uturn', 'veeveevolley', 'voltswitch', 'watershuriken', 'weatherball',
			];
			const moves = this.dex.moves.all().filter(move => (
				(this.field.pseudoWeather.metronomebattle ? ((move.basePower >= 75 && !move.flags['charge']) || GOOD_STATUS_MOVES.includes(move) || GOOD_WEAK_MOVES.includes(move)) : //any viable move
				((![2, 4].includes(this.gen) || !source.moves.includes(move.id)) &&
				(!move.isNonstandard || move.isNonstandard === 'Unobtainable') &&
				move.flags['metronome'])
			)));
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num);
				randomMove = this.sample(moves).id;
			}
			if (!randomMove) return false;
			source.side.lastSelectedMove = this.toID(randomMove);
			this.actions.useMove(randomMove, target);
			if (!target.metronomeUsed && target.hasAbility("duomodreference")) {
				this.add('-ability', target, 'Duomod Reference??');
				target.metronomeUsed = true;
				this.actions.useMove(this.dex.getActiveMove('metronome'), target);
				target.metronomeUsed = false;
			}
		},
	},
	belch: {
		inherit: true,
		accuracy: 100,
		isViable: true,
		shortDesc: "Cannot be selected unless it is Shitstorm or the user eats a Berry.",
		onDisableMove(pokemon) {
			if (!this.field.pseudoWeather.shitstorm && !pokemon.ateBerry) pokemon.disableMove('belch');
		},
	},
	amnesia: {
		inherit: true,
		isViable: true,
		shortDesc: "Raises SpD by 2, SpA by 2 if Mindfuck.",
		onModifyMove(move, pokemon) {
			if (this.field.pseudoWeather.mindfuck) move.boosts = {spa: 2, spd: 2};
		},
	},
	ancientpower: {
		inherit: true,
		isViable: true,
		shortDesc: "10% to raise all stats, 100% in Landslide.",
		    onModifyMove(move, pokemon) {
            if (!this.field.pseudoWeather.landslide) return;
            move.secondaries = [];
            if (this.field.pseudoWeather.landslide) {
                move.secondaries.push({
                    chance: 100,
                    self: {
                        boosts: {
                            atk: 1,
                            def: 1,
                            spa: 1,
                            spd: 1,
                            spe: 1,
                        },
                    },
                });
            }
        },
	},
	gyroball: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			if (this.field.pseudoWeather.timewarp) return 150;
			let power = Math.floor(25 * target.getStat('spe') / pokemon.getStat('spe')) + 1;
			if (!isFinite(power)) power = 1;
			if (power > 150) power = 150;
			this.debug('BP: ' + power);
			return power;
		},
	},
	hardpress: {
		inherit: true,
		isViable: true,
		basePowerCallback(pokemon, target) {
			if (this.field.pseudoWeather.timewarp) return 100;
			const hp = target.hp;
			const maxHP = target.maxhp;
			const bp = Math.floor(Math.floor((100 * (100 * Math.floor(hp * 4096 / maxHP)) + 2048 - 1) / 4096) / 100) || 1;
			this.debug('BP for ' + hp + '/' + maxHP + " HP: " + bp);
			return bp;
		},
	},
	heavyslam: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			if (this.field.pseudoWeather.timewarp) return 120;
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			let bp;
			if (pokemonWeight >= targetWeight * 5) {
				bp = 120;
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100;
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80;
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
	},
	metalburst: {
		inherit: true,
		isViable: true,
		damageCallback(pokemon) {
			if (this.field.pseudoWeather.timewarp) return 65535;
			const lastDamagedBy = pokemon.getLastDamagedBy(true);
			if (lastDamagedBy !== undefined) {
				return (lastDamagedBy.damage * 1.5) || 1;
			}
			return 0;
		},
	},
	metalclaw: {
		inherit: true,
		shortDesc: "Sets Steel hazards in Time Warp.",
		onModifyMove(move) {
			if (this.field.pseudoWeather.timewarp) {
				move.onAfterHit = function(target, source, move) {
					for (const side of source.side.foeSidesWithConditions()) {
						side.addSideCondition('gmaxsteelsurge');
					}
				};
			}
		},
	},
	waterpledge: {
		inherit: true,
		isViable: true,
		shortDesc: "Sets Rainbow if Flash Flood.",
		onModifyMove(move) {
			if (this.field.pseudoWeather.flashflood) move.sideCondition = 'waterpledge';
		},
	},

	//duomod reference
	neutralair: {
		num: 3005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, abilities become nullified.",
		name: "Neutral Air",
		pp: 5,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Defog", target);
		},
		pseudoWeather: 'neutralair',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('floatstone')) {
					return 8;
				}
				for (const moveSlot of source.moveSlots) {
					if (moveSlot.id !== 'neutralair') {
						return 2;
					}
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Neutral Air', '[of] ' + source);
				for (const pokemon of this.getAllActive()) {
					pokemon.addVolatile('gastroacid');
				}
			},
			onSwitchIn(pokemon) {
				for (const pokemon of this.getAllActive()) {
					pokemon.addVolatile('gastroacid');
				}
			},
			onRestart(target, source) {
				return false;
			},
			onResidualOrder: 24,
			onEnd() {
				this.add('-fieldend', 'move: Neutral Air');
				for (const pokemon of this.getAllActive()) {
					pokemon.removeVolatile('gastroacid');
				}
			},
		},
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	ultranome: {
		num: 118,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultranome",
		pp: 40,
		shortDesc: "Uses Metronome 3 times; not learnable.",
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Metronome", target);
		},
		onHit(pokemon) {
			this.actions.useMove("Metronome", pokemon);
			this.actions.useMove("Metronome", pokemon);
			this.actions.useMove("Metronome", pokemon);
		},
		secondary: null,
		target: "self",
		type: "Dark",
		contestType: "Cute",
	},
	sickhacks: {
		num: 3021,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sick Hacks",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Heart Swap", target);
		},
		onHit(target, source, move) {
			const pokHP = (source.hp / source.maxhp);
			const tarHP = (target.hp / target.maxhp);
			source.sethp(tarHP * source.maxhp);
			this.add('-sethp', source, target.getHealth, '[from] move: Pain Split', '[silent]');
			target.sethp(pokHP * target.maxhp);
			this.add('-sethp', target, target.getHealth, '[from] move: Pain Split', '[silent]');
			this.add('-message', "The Pokemon traded HP bars!");
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	roulettespin: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Activates the Roulette Wheel an additional time.",
		name: "Roulette Spin",
		pp: 40,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Metronome", target);
		},
		onHit(source) {
			let result: number;
			let pickSide: number;
			this.hint("Time for a bonus wheel!");
			result = this.random(50);
	        pickSide = this.random(2);
			if (result === 0) {
				this.hint("Roulette Wheel Result 1 - Fully heal every active Pokemon.");
	            for (const pokemon of this.getAllActive()) {
	                this.heal(pokemon.maxhp, pokemon);
	                pokemon.cureStatus();
	            }
	        } else if (result === 1) {
				this.hint("Roulette Wheel Result 2 - Greatly increase everyone's highest stat.");
	            for (const pokemon of this.getAllActive()) {
	                let statName = 'atk';
	                let bestStat = 0;
	                let s: StatNameExceptHP;
	                for (s in pokemon.storedStats) {
	                    if (pokemon.storedStats[s] > bestStat) {
	                        statName = s;
	                        bestStat = pokemon.storedStats[s];
	                    }
	                }
	                this.boost({[statName]: 3}, pokemon);
	            }
	        } else if (result === 2) {
				this.hint("Roulette Wheel Result 3 - Give one Pokemon an omniboost.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
						}
					}
				}
	        } else if (result === 3) {
				this.hint("Roulette Wheel Result 4 - Set one Pokemon to 1 HP.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.directDamage(target.hp - 1, target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.directDamage(target.hp - 1, target);
						}
					}
				}
	        } else if (result === 4) {
				this.hint("Roulette Wheel Result 5 - screw you both");
	            for (const pokemon of this.getAllActive()) {
					this.directDamage(pokemon.hp, pokemon);
		    }
			} else if (result === 5) {
				this.hint("Roulette Wheel Result 6 - Set hazards on both sides.");
		    for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Spikes", pokemon);
					this.actions.useMove("Stealth Electric", pokemon);
		    }
			} else if (result === 6) {
				this.hint("Roulette Wheel Result 7 - Set a random weather and terrain.");
				const result2 = this.random(3);
				const result3 = this.random(3);
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							if (result2 === 0) {
								this.actions.useMove("Grassy Terrain", target);
							} else if (result2 === 1) {
								this.actions.useMove("Electric Terrain", target);
							} else {
								this.actions.useMove("Misty Terrain", target);
							}
							if (result3 === 0) {
								this.actions.useMove("Sunny Day", target);
							} else if (result3 === 1) {
								this.actions.useMove("Rain Dance", target);
							} else {
								this.actions.useMove("Sandstorm", target);
							}
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							if (result2 === 0) {
								this.actions.useMove("Grassy Terrain", target);
							} else if (result2 === 1) {
								this.actions.useMove("Electric Terrain", target);
							} else {
								this.actions.useMove("Misty Terrain", target);
							}
							if (result3 === 0) {
								this.actions.useMove("Sunny Day", target);
							} else if (result3 === 1) {
								this.actions.useMove("Rain Dance", target);
							} else {
								this.actions.useMove("Sandstorm", target);
							}
						}
					}
				}
			} else if (result === 7) {
				this.hint("Roulette Wheel Result 8 - lmao");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.directDamage(1, target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.directDamage(1, target);
						}
					}
				}
	        } else if (result === 8) {
				this.hint("Roulette Wheel Result 9 - Minimize every stat of one Pokemon.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive && target.hasAbility('contrary')) {
							this.boost({atk: 12, def: 12, spa: 12, spd: 12, spe: 12}, target, target, null, true);
						} else if (target.isActive) {
							this.boost({atk: -12, def: -12, spa: -12, spd: -12, spe: -12}, target, target, null, true);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive && target.hasAbility('contrary')) {
							this.boost({atk: 12, def: 12, spa: 12, spd: 12, spe: 12}, target, target, null, true);
						} else if (target.isActive) {
							this.boost({atk: -12, def: -12, spa: -12, spd: -12, spe: -12}, target, target, null, true);
						}
					}
				}
	   } else if (result === 9) {
				this.hint("Roulette Wheel Result 10 - Forcibly switch every Pokemon.");
				for (const pokemon of this.getAllActive()) {
					pokemon.forceSwitchFlag = true;
				}
			} else if (result === 10) {
				this.hint("Roulette Wheel Result 11 - Make every Pokemon use Conversion 2.");
				for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Conversion 2", pokemon);
				}
			} else if (result === 11) {
				this.hint("Roulette Wheel Result 12 - Make one Pokemon Transform into the other.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Transform", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Transform", target);
						}
					}
				}
			} else if (result === 12) {
				this.hint("Roulette Wheel Result 13 - Make both Pokemon trade stat changes.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Heart Swap", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Heart Swap", target);
						}
					}
				}
			} else if (result === 13) {
				this.hint("Roulette Wheel Result 14 - Slightly heal both Pokemon.");
				for (const pokemon of this.getAllActive()) {
					this.heal(pokemon.maxhp / 4, pokemon);
	        	}
	        } else if (result === 14) {
				this.hint("Roulette Wheel Result 15 - heard you guys liked scald");
				for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Scald", pokemon);
				}
			} else if (result === 15) {
				this.hint("Roulette Wheel Result 16 - Attempt to Toxic both Pokemon.");
				for (const pokemon of this.getAllActive()) {
					if (!pokemon.side.getSideCondition('safeguard')) {
						pokemon.trySetStatus('tox', pokemon);
					}
	      }
			} else if (result === 16) {
				this.hint("Roulette Wheel Result 17 - Switch both sides' field effects.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Court Change", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Court Change", target);
						}
					}
				}
			} else if (result === 17) {
				this.hint("Roulette Wheel Result 18 - Raise both active Pokemons' attacking stats.");
				for (const pokemon of this.getAllActive()) {
		                this.boost({atk: 2, spa: 2}, pokemon);
				}
	        } else if (result === 18) {
				this.hint("Roulette Wheel Result 19 - Make both Pokemon use Camouflage.");
				for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Camouflage", pokemon);
				}
			} else if (result === 19) {
				this.hint("Roulette Wheel Result 20 - Make both Pokemon swap abilities.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Skill Swap", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Skill Swap", target);
						}
					}
				}
			} else if (result === 20) {
				this.hint("Roulette Wheel Result 21 - wahoo");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Celebrate", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Celebrate", target);
						}
					}
				}
			} else if (result === 21) {
				this.hint("Roulette Wheel Result 22 - Sets Trick Room.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Trick Room", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Trick Room", target);
						}
					}
				}
			} else if (result === 22) {
				this.hint("Roulette Wheel Result 23 - Pocket sand go");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.boost({accuracy: -1}, target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.boost({accuracy: -1}, target);
						}
					}
				}
			} else if (result === 23) {
				this.hint("Roulette Wheel Result 24 - Removes all active stat changes.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Haze", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Haze", target);
						}
					}
				}
			} else if (result === 24) {
				this.hint("Roulette Wheel Result 25 - Sets Magic Room.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Magic Room", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Magic Room", target);
						}
					}
				}
			} else if (result === 25) {
				this.hint("Roulette Wheel Result 26 - Sets Wonder Room.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Wonder Room", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Wonder Room", target);
						}
					}
				}
			} else if (result === 26) {
				this.hint("Roulette Wheel Result 27 - Averages out the HP of active Pokemon.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Pain Split", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Pain Split", target);
						}
					}
				}
			} else if (result === 27) {
				this.hint("Roulette Wheel Result 28 - Cures all active Pokemons' statuses.");
				for (const pokemon of this.getAllActive()) {
	                	pokemon.cureStatus();
	        	}
	        } else if (result === 28) {
				this.hint("Roulette Wheel Result 29 - Sets up Screens for one side.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Reflect", target);
							this.actions.useMove("Light Screen", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Reflect", target);
							this.actions.useMove("Light Screen", target);
						}
					}
				}
			} else if (result === 29) {
				this.hint("Roulette Wheel Result 30 - Starts a status immunity for both sides.");
				for (const pokemon of this.getAllActive()) {
	                	this.actions.useMove("Safeguard", pokemon);
	        	}
	        } else if (result === 30) {
				this.hint("Roulette Wheel Result 31 - Deactivates all abilities that are active within 2 turns.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Neutral Air", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Neutral Air", target);
						}
					}
				}
			} else if (result === 31) {
				this.hint("Roulette Wheel Result 32 - Attempts to Freeze all active Pokemon.");
				for (const pokemon of this.getAllActive()) {
					pokemon.trySetStatus('frz', pokemon);
	        	}
			} else if (result === 32) {
				this.hint("Roulette Wheel Result 33 - Switches out one Pokemon.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							target.forceSwitchFlag = true;
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							target.forceSwitchFlag = true;
						}
					}
				}
			} else if (result === 33) {
				this.hint("Roulette Wheel Result 34 - Sets up Aqua Ring for both sides.");
				for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Aqua Ring", pokemon);
				}
			} else if (result === 34) {
				this.hint("Roulette Wheel Result 35 - One active Pokemon Defogs.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Defog", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Defog", target);
						}
					}
				}
			} else if (result === 35) {
				this.hint("Roulette Wheel Result 36 - Both active Pokemon share a type combination.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Reflect Type", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Reflect Type", target);
						}
					}
				}
			} else if (result === 36) {
				this.hint("Roulette Wheel Result 37 - glhf");
				for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Sheer Cold", pokemon);
				}
			} else if (result === 37) {
				this.hint("Roulette Wheel Result 38 - uh oh");
				for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Octolock", pokemon);
				}
			} else if (result === 38) {
				this.hint("Roulette Wheel Result 39 - Both active Pokemon use Metronome.");
				for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Metronome", pokemon);
				}
			} else if (result === 39) {
				this.hint("Roulette Wheel Result 40 - get ready");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						const oldAbility = target.setAbility('Moody');
						if (oldAbility) {
							this.add('-ability', target, 'Moody', '[from] move: Roulette Spin');
							return;
						}
					}
				}
				if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						const oldAbility = target.setAbility('Moody');
						if (oldAbility) {
							this.add('-ability', target, 'Moody', '[from] move: Roulette Spin');
							return;
						}
					}
				}
			} else if (result === 40) {
				this.hint("Roulette Wheel Result 41 - Both active Pokemon swap items.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Trick", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Switcheroo", target);
						}
					}
				}
			} else if (result === 41) {
				this.hint("Roulette Wheel Result 42 - Both active Pokemon trade HP bars.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Sick Hacks", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Sick Hacks", target);
						}
					}
				}
			} else if (result === 42) {
				this.hint("Roulette Wheel Result 43 - Both active Pokemon use their first move.");
				for (const pokemon of this.getAllActive()) {
					const frstMove = this.dex.moves.get(pokemon.moveSlots[0].id);
					this.actions.useMove(frstMove, pokemon);
				}
			} else if (result === 43) {
				this.hint("Roulette Wheel Result 44 - One active Pokemon gains a higher crit rate.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Focus Energy", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Focus Energy", target);
						}
					}
				}
			} else if (result === 44) {
				this.hint("Roulette Wheel Result 45 - One new spin for each active Pokemon!");
				for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Roulette Spin", pokemon);
				}
			} else if (result === 45) {
				this.hint("Roulette Wheel Result 46 - One active Pokemon becomes way faster than the other.");
				for (const pokemon of this.sides[0].active) {
					for (const target of this.sides[1].active) {
						if (pickSide === 0) {
							this.boost({spe: 12}, pokemon, pokemon, null, true);
							this.boost({spe: -12}, target, target, null, true);
						} else if (pickSide === 1) {
							this.boost({spe: 12}, target, target, null, true);
							this.boost({spe: -12}, pokemon, pokemon, null, true);
						}
					}
				}
			} else if (result === 46) {
				this.hint("Roulette Wheel Result 47 - sussie");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Vote Out", target);
							return false;
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.actions.useMove("Vote Out", target);
							return false;
						}
					}
				}
			} else if (result === 47) {
				this.hint("Roulette Wheel Result 48 - Time for some good ol' Mario Kart Wii");
				for (const pokemon of this.sides[0].active) {
					for (const target of this.sides[1].active) {
						if (target.storedStats.spe < pokemon.storedStats.spe) {
							this.actions.useMove("Flame Runner", pokemon);
							const oldAbility = target.setAbility('Slow Start');
							if (oldAbility) {
								this.add('-ability', target, 'Slow Start', '[from] move: Flame Runner', '[silent]');
								if (target.side !== pokemon.side) target.volatileStaleness = 'external';
								return;
							}
						} else if (target.storedStats.spe > pokemon.storedStats.spe) {
							this.actions.useMove("Flame Runner", target);
							const oldAbility = pokemon.setAbility('Slow Start');
							if (oldAbility) {
								this.add('-ability', pokemon, 'Slow Start', '[from] move: Flame Runner', '[silent]');
								if (target.side !== pokemon.side) pokemon.volatileStaleness = 'external';
								return;
							}
						} else {
							for (const active of this.getAllActive()) {
								this.actions.useMove("Flame Runner", active);
							}
						}
					}
				}
			} else if (result === 48) {
				this.hint("Roulette Wheel Result 49 - Ad break.");
				this.add('-message', "Hello Duomod v3 enjoyer!");
				this.add('-message', "The fact that you're spending your time on Pokemon Showdown must mean you're really bored!");
				this.add('-message', "Well today's your lucky day! Because I've got just the cure!");
				this.add('-message', "Head on over to DuoM2's YouTube channel, featuring several videos from the one and only DuoM2!");
				this.add('-message', "He's smart, funny, a gamer, handsome, and the best Mewtwo main in South Carolina Smash!");
				this.add('-message', "With 4 hours of content right now and more to come, your boredom will soar off into space!");
				this.add('-message', "Plus, as a special promotional bonus, if you subscribe now, you'll get to say you knew him before it was cool!");
				this.add('-message', "Head on over to DuoM2's YouTube channel for the time of your life! Linked down below!");
				this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
				this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
				this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
			} else {
				this.hint("Roulette Wheel Result 50 - THE ULTIMATE EFFECT");
				for (const pokemon of this.getAllActive()) {
					this.actions.useMove("Ultranome", pokemon);
				}
			}
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Cute",
	},
	voteout: {
		num: 3020,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Vote Out",
		pp: 1,
		noPPBoosts: true,
		priority: -7,
		flags: {mirror: 1, authentic: 1, mystery: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Acupressure", target);
		},
		onHit(target) {
			target.formeChange('Impsaustor', this.effect, true);
			const ms0 = {
				move: "Knock Off",
				id: "knockoff",
				pp: 32,
				maxpp: 32,
				target: "normal",
				disabled: false,
				used: false,
				virtual: true,
			};
			const ms1 = {
				move: "Recover",
				id: "recover",
				pp: 16,
				maxpp: 16,
				target: "self",
				disabled: false,
				used: false,
				virtual: true,
			};
			const ms2 = {
				move: "Gunk Shot",
				id: "gunkshot",
				pp: 8,
				maxpp: 8,
				target: "normal",
				disabled: false,
				used: false,
				virtual: true,
			};
			const ms3 = {
				move: "Swords Dance",
				id: "swordsdance",
				pp: 32,
				maxpp: 32,
				target: "self",
				disabled: false,
				used: false,
				virtual: true,
			};
			target.moveSlots[0] = ms0;
			target.baseMoveSlots[0] = ms0;
			target.moveSlots[1] = ms1;
			target.baseMoveSlots[1] = ms1;
			target.moveSlots[2] = ms2;
			target.baseMoveSlots[2] = ms2;
			target.moveSlots[3] = ms3;
			target.baseMoveSlots[3] = ms3;
			const oldAbility = target.setAbility('Vent');
			if (oldAbility) {
				this.add('-ability', target, 'Vent', '[from] move: Vote Out', '[silent]');
				target.volatileStaleness = 'external';
				return;
			}
			this.add('-message', target + " was the Impsaustor!");
			this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
			const species = this.dex.species.get(target.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
			this.add('-start', target, 'typechange', target.species.types.join('/'), '[silent]');
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	flamerunner: {
		num: 1002.1,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "User becomes part Fire.",
		name: "Flame Runner",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1, contact: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Flame Charge", target);
		},
		self: {
			onHit(pokemon) {
				if (pokemon.hasType('Fire')) return false;
				if (!pokemon.addType('Fire')) return false;
				this.add('-start', pokemon, 'typeadd', 'Fire', '[from] move: Flame Runner');
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	
	//vanilla
	toxicspikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('sandrush')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('sandrush')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	milkdrink: {
		inherit: true,
		pp: 10,
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	rest: {
		inherit: true,
		pp: 10,
	},
	roost: {
		inherit: true,
		pp: 10,
	},
	shoreup: {
		inherit: true,
		pp: 10,
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	synthesis: {
		inherit: true,
		shortDesc: "Heals the user by 50% of its max HP.",
		onHit: null,
		heal: [1, 2],
		pp: 10,
	},
	morningsun: {
		inherit: true,
		shortDesc: "Heals the user by 50% of its max HP.",
		onHit: null,
		heal: [1, 2],
		pp: 10,
	},
	moonlight: {
		inherit: true,
		shortDesc: "Heals the user by 50% of its max HP.",
		onHit: null,
		heal: [1, 2],
		pp: 10,
	},
	electroshot: {
		inherit: true,
		shortDesc: "Charges instantly if Thunderstorm or Flash Flood.",
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({spa: 1}, attacker, attacker, move);
			if (this.field.pseudoWeather.thunderstorm || this.field.pseudoWeather.flashflood) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	solarbeam: {
		inherit: true,
		shortDesc: "Charges instantly if Overgrowth or Drought.",
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (this.field.pseudoWeather.overgrowth || this.field.pseudoWeather.drought) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	solarblade: {
		inherit: true,
		shortDesc: "Charges instantly if Overgrowth or Drought.",
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (this.field.pseudoWeather.overgrowth || this.field.pseudoWeather.drought) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	growth: {
		inherit: true,
		shortDesc: "+2 Atk, +2 SpA in Overgrowth or Drought.",
		onModifyMove(move, pokemon) {
			if (this.field.pseudoWeather.overgrowth || this.field.pseudoWeather.drought) move.boosts = {atk: 2, spa: 2};
		},
	},
	blizzard: {
		inherit: true,
		shortDesc: "Can't miss in Whiteout.",
		onModifyMove(move) {
			if (this.field.pseudoWeather.whiteout) move.accuracy = true;
		},
	},
	auroraveil: {
		inherit: true,
		shortDesc: "Fails unless there is Whiteout.",
		onTry() {
			return this.field.pseudoWeather.whiteout;
		},
	},
	weatherball: {
		inherit: true,
		basePower: 75,
		type: 'Stellar',
		shortDesc: "2x in any weather. Gains type effectiveness for each weather.",
		onEffectiveness(typeMod, target, type, move) {
			if(this.field.pseudoWeather.length == 0) return;
			const ids = [];
			for(const pseudoWeather in this.field.pseudoWeather) {
				ids.push(pseudoWeather);
			}
			for(let i = 1; i < ids.length; i ++) {
				const weather = ids[i];
				console.log(weather);
				switch (weather) {
					case 'theswarm':
						typeMod += this.dex.getEffectiveness('Bug', type);
						break;
					case 'twilightzone':
						typeMod += this.dex.getEffectiveness('Dark', type);
						break;
					case 'lotsofreallysmalldragons':
						typeMod += this.dex.getEffectiveness('Dragon', type);
						break;
					case 'thunderstorm':
						typeMod += this.dex.getEffectiveness('Electric', type);
						break;
					case 'fable':
						typeMod += this.dex.getEffectiveness('Fairy', type);
						break;
					case 'colosseum':
						typeMod += this.dex.getEffectiveness('Fighting', type);
						break;
					case 'drought':
						typeMod += this.dex.getEffectiveness('Fire', type);
						break;
					case 'deltastream':
						typeMod += this.dex.getEffectiveness('Flying', type);
						break;
					case 'thevoices':
						typeMod += this.dex.getEffectiveness('Ghost', type);
						break;
					case 'overgrowth':
						typeMod += this.dex.getEffectiveness('Grass', type);
						break;
					case 'duststorm':
						typeMod += this.dex.getEffectiveness('Grass', type);
						break;
					case 'whiteout':
						typeMod += this.dex.getEffectiveness('Ice', type);
						break;
					case 'metronomebattle':
						typeMod += this.dex.getEffectiveness('Normal', type);
						break;
					case 'shitstorm':
						typeMod += this.dex.getEffectiveness('Poison', type);
						break;
					case 'mindfuck':
						typeMod += this.dex.getEffectiveness('Psychic', type);
						break;
					case 'landslide':
						typeMod += this.dex.getEffectiveness('Rock', type);
						break;
					case 'timewarp':
						typeMod += this.dex.getEffectiveness('Steel', type);
						break;
					case 'flashflood':
						typeMod += this.dex.getEffectiveness('Water', type);
						break;
				}
				console.log("typemod: " + typeMod);
				return typeMod;
			}
		},
		onModifyMove(move, pokemon) {
			if(this.field.pseudoWeather.length > 0) move.basePower *= 2;
		},
	},
	hyperspacefury: {
		inherit: true,
		onTry: null,
	},
	hurricane: {
		inherit: true,
		shortDesc: "30% chance to confuse target. Delta Stream: can't miss.",
		onModifyMove(move, pokemon, target) {
			if (this.field.pseudoWeather.deltastream) move.accuracy = true;
		},
	},
	bleakwindstorm: {
		inherit: true,
		accuracy: 85,
		shortDesc: "30% to lower Speed by 1. Delta Stream: 1.3x power.",
		onModifyMove(move, pokemon, target) {
			if (this.field.pseudoWeather.deltastream) move.basePower = 130;
		},
	},
	crushclaw: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
	},
	razorshell: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
	},
	wildboltstorm: {
		inherit: true,
		accuracy: 85,
		shortDesc: "30% chance to paralyze. Thunderstorm: 1.3x power.",
		onModifyMove(move, pokemon, target) {
			if (this.field.pseudoWeather.deltastream) move.basePower = 130;
		},
	},
	springtidestorm: {
		inherit: true,
		accuracy: 85,
		shortDesc: "30% to lower Attack by 1. Fable: 1.3x power.",
		onModifyMove(move, pokemon, target) {
			if (this.field.pseudoWeather.fable) move.basePower = 130;
		},
	},
	sandsearstorm: {
		inherit: true,
		accuracy: 85,
		shortDesc: "30% chance to burn. Dust Storm: 1.3x power.",
		onModifyMove(move, pokemon, target) {
			if (this.field.pseudoWeather.duststorm) move.basePower = 130;
		},
	},
	defog: {
		inherit: true,
		shortDesc: "Clears hazards. Ends Twilight Zone.",
		onHit(target, source, move) {
			let success = false;
			if (this.field.pseudoWeather.twilightzone) {
				this.field.removePseudoWeather("twilightzone");
				success = true;
			}
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},
}