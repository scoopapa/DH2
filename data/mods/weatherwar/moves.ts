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
	twineedle: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.theswarm) {
				move.multihit = 5;
			}
		},
	},
	dragonrage: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.lotsofreallysmalldragons) {
				move.damage = 100;
			}
		},
	},
	charge: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.thunderstorm) {
				move.heal = [1, 4];
			}
		},
	},
	mistyexplosion: {
		inherit: true,
		basePower: 150,
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.fable) {
				delete move.selfdestruct;
			}
		},
	},
	upperhand: {
		inherit: true,
		onTry(source, target) {
			console.log(this.field.pseudoWeather.colosseum);
			if (this.field.pseudoWeather.colosseum) return true;
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || move.priority <= 0.1 || move.category === 'Status') {
				return false;
			}
		},
		onModifyMove(move, source, target) {
			console.log("modify " + this.field.pseudoWeather.colosseum);
			if (this.field.pseudoWeather.colosseum) {
				const action = this.queue.willMove(target);
				const targetMove = action?.choice === 'move' ? action.move : null;
				if (!targetMove || targetMove.priority <= 0.1 || targetMove.category === 'Status') {
					delete move.secondaries;
				}			
			}
		},
	},
	firepledge: {
		inherit: true,
		basePowerCallback: null,
		onPrepareHit: null,
		onModifyMove(move) {
			if (this.field.pseudoWeather.drought) move.sideCondition = 'firepledge';
		},
	},
	tailwind: {
		inherit: true,
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (this.field.pseudoWeather.deltastream) {
					return 6;
				}
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
		onPrepareHit(pokemon) {
			if(this.field.pseudoWeather.thevoices) pokemon.removeVolatile('destinybond');
		},
	},
	grasspledge: {
		inherit: true,
		basePowerCallback: null,
		onPrepareHit: null,
		onModifyMove(move) {
			if (this.field.pseudoWeather.overgrowth) move.sideCondition = 'grasspledge';
		},
	},
	sandtomb: {
		inherit: true,
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
				this.boost({def: -1}, pokemon, source, this.dex.getActiveMove('sandtomb'));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sand Tomb', '[silent]');
			},
		},
	},
	iceball: {
		inherit: true,
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
			this.debug("BP: " + bp);
			return bp;
		},
		condition: {
			duration: 1,
			onLockMove: 'iceball',
			onStart() {
				this.effectState.hitCount = 0;
				this.effectState.contactHitCount = 0;
			},
			onResidual(target) {
				if (this.field.pseudoWeather.whiteout || (target.lastMove && target.lastMove.id === 'struggle')) {
					// don't lock
					delete target.volatiles['iceball'];
				}
			},
		},
	},
	metronome: {
		inherit: true,
		onHit(target, source, effect) {
			const GOOD_STATUS_MOVES = [
				'acidarmor', 'agility', 'aromatherapy', 'auroraveil', 'autotomize', 'banefulbunker', 'batonpass', 'bellydrum', 'bulkup', 'calmmind', 'chillyreception', 'clangoroussoul', 'coil', 'cottonguard', 'courtchange', 'curse', 'defog', 'destinybond', 'detect', 'disable', 'dragondance', 'encore', 'extremeevoboost', 'filletaway', 'geomancy', 'glare', 'haze', 'healbell', 'healingwish', 'healorder', 'heartswap', 'honeclaws', 'kingsshield', 'leechseed', 'lightscreen', 'lovelykiss', 'lunardance', 'magiccoat', 'maxguard', 'memento', 'milkdrink', 'moonlight', 'morningsun', 'nastyplot', 'naturesmadness', 'noretreat', 'obstruct', 'painsplit', 'partingshot', 'perishsong', 'protect', 'quiverdance', 'recover', 'reflect', 'reflecttype', 'rest', 'revivalblessing', 'roar', 'rockpolish', 'roost', 'shedtail', 'shellsmash', 'shiftgear', 'shoreup', 'silktrap', 'slackoff', 'sleeppowder', 'sleeptalk', 'softboiled', 'spikes', 'spikyshield', 'spore', 'stealthrock', 'stickyweb', 'strengthsap', 'substitute', 'switcheroo', 'swordsdance', 'synthesis', 'tailglow', 'tailwind', 'taunt', 'thunderwave', 'tidyup', 'toxic', 'transform', 'trick', 'victorydance', 'whirlwind', 'willowisp', 'wish', 'yawn',
			];
			const GOOD_WEAK_MOVES = [
				'accelerock', 'acrobatics', 'aquacutter', 'avalanche', 'barbbarrage', 'bonemerang', 'bouncybubble', 'bulletpunch', 'buzzybuzz', 'ceaselessedge', 'circlethrow', 'clearsmog', 'doubleironbash', 'dragondarts', 'dragontail', 'drainingkiss', 'endeavor', 'facade', 'firefang', 'flipturn', 'flowertrick', 'freezedry', 'frustration', 'geargrind', 'grassknot', 'gyroball', 'icefang', 'iceshard', 'iciclespear', 'infernalparade', 'jetpunch', 'knockoff', 'lastrespects', 'lowkick', 'machpunch', 'mortalspin', 'mysticalpower', 'naturesmadness', 'nightshade', 'nuzzle', 'pikapapow', 'populationbomb', 'psychocut', 'psyshieldbash', 'pursuit', 'quickattack', 'ragefist', 'rapidspin', 'return', 'rockblast', 'ruination', 'saltcure', 'scorchingsands', 'seismictoss', 'shadowclaw', 'shadowsneak', 'sizzlyslide', 'skydrop', 'stoneaxe', 'storedpower', 'stormthrow', 'suckerpunch', 'superfang', 'surgingstrikes', 'tailslap', 'trailblaze', 'tripleaxel', 'tripledive', 'twinbeam', 'uturn', 'veeveevolley', 'voltswitch', 'watershuriken', 'weatherball',
			];
			const moves = this.dex.moves.all().filter(move => (
				(this.field.pseudoWeather.metronomebattle ? (move.bp >= 75 || GOOD_STATUS_MOVES.includes(move) || GOOD_WEAK_MOVES.includes(move)) : //any viable move
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
		},
	},
	belch: {
		inherit: true,
		onDisableMove(pokemon) {
			if (!this.field.pseudoWeather.shitstorm && !pokemon.ateBerry) pokemon.disableMove('belch');
		},
	},
	amnesia: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.pseudoWeather.idk) move.boosts = {spa: 2, spd: 2};
		},
	},
	ancientpower: {
		inherit: true,
		onModifyMove(move) {
			if (this.field.pseudoWeather.landslide) move.secondaries.chance = 100;
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
		damageCallback(pokemon) {
			if (this.field.pseudoWeather.timewarp) return 65535;
			const lastDamagedBy = pokemon.getLastDamagedBy(true);
			if (lastDamagedBy !== undefined) {
				return (lastDamagedBy.damage * 1.5) || 1;
			}
			return 0;
		},
	},
	steelbeam: {
		onModifyMove(move) {
			if (this.field.pseudoWeather.timewarp) {
				delete move.mindBlownRecoil;
				move.recoil = [1, 4];
			}
		},
	},
	waterpledge: {
		inherit: true,
		basePowerCallback: null,
		onPrepareHit: null,
		onModifyMove(move) {
			if (this.field.pseudoWeather.flashflood) move.sideCondition = 'waterpledge';
		},
	},
}