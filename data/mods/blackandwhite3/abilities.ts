import { consoleips } from "../../../config/config-example";

const kickMoves = ['jumpkick', 'highjumpkick', 'megakick', 'doublekick', 'blazekick', 'tropkick', 'lowkick', 'lowsweep', 'rollingkick', 'triplekick', 'stomp', 'highhorsepower', 'tripleaxel', 'stompingtantrum', 'thunderouskick', 'axekick'];
const tailMoves = ['firelash', 'powerwhip', 'tailslap', 'wrap', 'constrict', 'irontail', 'dragontail', 'poisontail', 'aquatail', 'vinewhip', 'wringout',];

export const Abilities: { [abilityid: string]: ModdedAbilityData; } = {
	strangebody: {
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category !== 'Physical') return;
			if (!target.runImmunity(move.type)) return;
			if (this.dex.getEffectiveness(move, target) === -1) return;
			return 0;
		},
		name: "Strange Body",
		rating: 4,
		shortDesc: "If this Pokemon is hit by a physical super effective move, it takes neutral damage.",
		num: -1,
	},
	toymaker: {
		name: "Toymaker",
		desc: "At the end of each turn, if it doesn't have an held item, the user acquires a random item. (Leftovers, Sitrus Berry, Lum Berry, Figy Berry, Starf Berry, Choice Band, Choice Specs, Choice Scarf, Flame Orb, Para Orb, Toxic Orb, Light Ball, Iron Ball, Rocky Helmet, Heavy-Duty Boots)",
		shortDesc: "Gets a random item from a list at the end of the turn if the user doesn't already have one.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			const itemList = ['leftovers', 'sitrusberry', 'lumberry', 'figyberry', 'starfberry', 'choiceband', 'choicespecs', 'choicescarf', 'flameorb', 'paraorb', 'toxicorb', 'lightball', 'ironball', 'rockyhelmet', 'heavydutyboots'];
			const itemIndex = this.random(itemList.length);
			const itemMade = itemList[itemIndex];
			if (pokemon.hp && !pokemon.item) {
				pokemon.setItem(itemMade);
				this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Toymaker');
			}
		},
		rating: 3,
		num: -2,
	},
	icebreaker: {
		desc: "This Pokemon's Speed is x1.5 on Hail, and this Pokemon's Atk and SpA is x1.5 on Rain. This Pokemon is immune to Hail.",
		shortDesc: "x1.5 Speed on Hail; x1.5 Atk and SpA on Rain. Hail immunity.",
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.5);
			}
		},
		onModifyAtk(atk, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpA(spa, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Icebreaker",
		rating: 3,
		num: -3,
	},
	disillusioned: {
		desc: "This Pokemon is immune to Fairy type moves, and can hit Fairy type opponents for neutral damages with Dark moves.",
		shortDesc: "Hits Fairy opponents for neutral damages with Dark moves; Fairy immune.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				this.add('-immune', target, '[from] ability: Disillusioned');
				return null;
			}
		},
		onModifyMove(move) {

			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Dark'] = true;
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (move.type !== 'Dark') return;
			if (move.type === 'Dark' && target.hasType('Fairy')) {
				this.debug('Disillusioned boost');
				return this.chainModify(2);
			}
		},
		name: "Disillusioned",
		rating: 3.5,
		num: -4,
	},
	invincible: {
		onModifyMovePriority: -5,
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Invincible');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Invincible');
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Invincible', '[of] ' + target);
			}
		},
		name: "Invincible",
		shortDesc: "This Pokemon is immune to status condition. Immune to Intimidate.",
		rating: 3,
		num: -5,
	},
	unconcerned: {
		name: "Unconcerned",
		onAnyModifyBoost(boosts, pokemon) {
			const unconcernedUser = this.effectState.target;
			if (unconcernedUser === this.activePokemon) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['spd'] = 0;
				//boosts['spe'] = 0;
				boosts['accuracy'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unconcernedUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		shortDesc: "This Pokemon ignores its own stat stages when taking or doing damage.",
		rating: 4,
		num: -6,
	},
	oldschool: {
		shortDesc: "This Pokemon's high crit rate moves always crit, and deal damages x2 instead of x1.5. This Pokemon's special moves use SpD in calculation.",
		name: "Old School",
		onModifyMove(move, attacker) {
			if (move.category === 'Special') {
				move.overrideOffensiveStat = 'spd';
			}
		},
		onModifyCritRatio(critRatio, source, target) {
			if (critRatio >= 2) return 5;
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Old School boost');
				return this.chainModify(2 / 1.5);
			}
		},
		rating: 3.5,
		num: -7,
	},
	smartguard: {
		desc: "On switch-in, this Pokémon's Defense or Special Defense is raised by 1 stage based on the weaker combined attacking stat of all opposing Pokémon. Special Defense is raised if their Special Attack is higher, and Defense is raised if their Attack is the same or higher.",
		shortDesc: "On switch-in, Defense or Sp. Def is raised 1 stage based on the foes' weaker Attack.",
		onStart(pokemon) {
			let totalatk = 0;
			let totalspa = 0;
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				totalatk += target.getStat('atk', false, true);
				totalspa += target.getStat('spa', false, true);
			}
			if (totalatk && totalatk >= totalspa) {
				this.boost({def: 1});
			} else if (totalspa) {
				this.boost({spd: 1});
			}
		},
		name: "Smart Guard",
		rating: 4,
		num: -67,
	},
};