import { consoleips } from "../../../config/config-example";

const kickMoves = ['jumpkick', 'highjumpkick', 'megakick', 'doublekick', 'blazekick', 'tropkick', 'lowkick', 'lowsweep', 'rollingkick', 'triplekick', 'stomp', 'highhorsepower', 'tripleaxel', 'stompingtantrum', 'thunderouskick', 'axekick'];
const tailMoves = ['firelash', 'powerwhip', 'tailslap', 'wrap', 'constrict', 'irontail', 'dragontail', 'poisontail', 'aquatail', 'vinewhip', 'wringout',];

export const Abilities: { [abilityid: string]: ModdedAbilityData; } = {
	poisonousradula: {
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && move.type === 'Poison' && !(target.getMoveHitData(move).typeMod < 0)) {
				if (!move.secondaries) move.secondaries = [];
				if (move.category === 'Physical') {
					move.secondaries.push({
						chance: 100,
						boosts: {
							def: -1,	
						},
						ability: this.dex.abilities.get('poisonousradula'),
					});
				} else if (move.category === 'Special') {
					move.secondaries.push({
						chance: 100,
						boosts: {
							spd: -1,
						},
						ability: this.dex.abilities.get('poisonousradula'),

					});
				}
			}
		},
		name: "Poisonous Radula",
		shortDesc: "Non resisted Poison moves lowers the target's corresponding defense by one stage.",
		rating: 2,
		num: -1,
	},
	daredevil: {
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		name: "Daredevil",
		shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
		rating: 3,
		num: -2,
	},
	waterproof: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({ spe: 1 })) {
					this.add('-immune', target, '[from] ability: Waterproof');
				}
				return null;
			}
		},
		name: "Waterproof",
		desc: "This Pokemon is immune to Water-type moves and raises its Speed by 1 stage when hit by an Water-type move.",
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by an Water move; Water immunity.",
		rating: 3,
		num: -3,
	},
	racketeering: {
		shortDesc: "Boosts the power of Knock Off, Thief and Pluck by 1.5x",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.name === 'Knock Off' || move.name === 'Thief' || move.name === 'Pluck') {
				return this.chainModify(1.5);
			}
		},
		name: "Racketeering",
		rating: 3,
		num: -4,
	},
	snobbery: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Poison' || move.type === 'Bug' || move.type === 'Dark') {
				this.debug('Snobbery weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Poison' || move.type === 'Bug' || move.type === 'Dark') {
				this.debug('Snobbery weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Snobbery",
		shortDesc: "This Pokemon gets half damages from Bug, Poison and Dark type moves.",
		rating: 3.5,
		num: -5,
	},
	starsforce: {
		desc: "When this Pokémon has 1/3 or less of its maximum HP, rounded down, all of its stats are x1.5.",
		shortDesc: "At 1/3 or less of max HP, all stats are x1.5.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Stars Force boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Stars Force boost');
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3) {
				this.debug('Stars Force boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3) {
				this.debug('Stars Force boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpePriority: 6,
		onModifySpe(def, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3) {
				this.debug('Stars Force boost');
				return this.chainModify(1.5);
			}
		},
		name: "Star's Force",
		rating: 2,
		num: -6,
	},
	webweaver: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			let activated = false;
			if (pokemon.activeTurns) {
				for (const target of pokemon.side.foe.active) {
					if (!target || !target.isAdjacent(pokemon) || !(target.isGrounded())) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Web Weaver', 'boost');
						activated = true;
					}
					if (target.volatiles['substitute']) {
						this.add('-immune', target);
					} else {
						//if (pokemon.isGrounded()){
						this.boost({ spe: -1 }, target, pokemon, null, true);
						//}
					}
				}
			}
		},
		name: "Web Weaver",
      shortDesc: "A the end of each turn, lowers by one stage the speed stat of every other grounded Pokemon.",
		rating: 4.5,
		num: -7,
	},
	perforating: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0 && (move.type === 'Bug' || move.type === 'Poison')) {
				this.debug('Perforating boost');
				return this.chainModify(2);
			}
		},
		name: "Perforating",
		shortDesc: "Bug & Poison moves deal 2x damage if resisted, can poison Steel types, Poison moves hit Steel types",
		rating: 3,
		num: -8,
	},
	doublespirit: {
		shortDesc: "Switches to Nocturnal form before using a Physical move, and to Diurnal form before using a Special move.",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Girafatak' || attacker.transformed) return;
			if (move.category === 'Status') return;
			const targetForme = (move.category === 'Special' ? 'Girafatak' : 'Girafatak-Nocturnal');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			const newatk = attacker.storedStats.spa;
			const newspa = attacker.storedStats.atk;
			attacker.storedStats.atk = newatk;
			attacker.storedStats.spa = newspa;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Double Spirit",
		rating: 4,
		num: -9,
	},
	divination: {
		shortDesc: "Reveals a random move of each adjacent opponent on entry.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (target.fainted) return;
				const temp = this.sample(target.moveSlots);
				this.add('-message', pokemon.name + "'s Divination revealed the move " + temp.move + "!");
			}
		},
		name: "Divination",
		rating: 3,
		num: -10,
	},
	arcanemastery: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Psychic' || move.type === 'Dark') {
				this.debug('Arcane Mastery boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Psychic' || move.type === 'Dark') {
				this.debug('Arcane Mastery boost');
				return this.chainModify(1.5);
			}
		},
		name: "Arcane Mastery",
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Psychic/Dark type attack.",
		rating: 3.5,
		num: -11,
	},
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
		num: -12,
	},
	mistymountain: { 
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Rock' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ice';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Misty Mountain",
		shortDesc: "This Pokemon's Rock-type moves become Ice-type and have 1.2x power.",
		rating: 4,
		num: -13,
	},
	coldwind: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Flying' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ice';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Cold Wind",
		shortDesc: "This Pokemon's Flying-type moves become Ice-type and have 1.2x power.",
		rating: 4,
		num: -14,
	},
	maddancer: {
		shortDesc: "This Pokemon's Dance move boost its Speed by 1 stage upon use.",
		onBasePowerPriority: 19,
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.flags['dance']) {
				this.boost({ spe: 1 }, source);
			}
		},
		name: "Mad Dancer",
		num: -15,
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
		num: -16,
	},
	woodclearing: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isTerrain('grassyterrain')) {
				this.debug('Wood Clearing boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Wood Clearing",
		shortDesc: "This Pokemon's attacks do 1.3x in Grassy Terrain.",
		rating: 2,
		num: -17,
	},
	rickroll: {
		desc: "This Pokémon does not suffer the drawbacks of recoil moves and sacrificial moves.",
		shortDesc: "Ignores recoil and self-KO effects of that move.",
		onModifyMove(move) {
			if (move.recoil || move.mindBlownRecoil || (move.selfdestruct && move.selfdestruct === 'always')) {
				if (move.selfdestruct && move.selfdestruct === 'always') {
					delete move.selfdestruct;
				}
				if (move.recoil) {
					delete move.recoil;
				}
				if (move.mindBlownRecoil) {
					move.mindBlownRecoil = false;
				}
			}
		},
		name: "Rick Roll",
		rating: 4,
		num: -18,
	},
	microclimate: {
		onStart(pokemon) {
			if (this.field.isWeather('sunnyday')) {
			   this.field.setWeather('raindance');
			} else if (this.field.isWeather('raindance')) {
				this.field.setWeather('sunnyday');
			} else if (this.field.isWeather('desolateland')) {
				this.field.setWeather('primordialsea');
			} else if (this.field.isWeather('primodialsea')) {
				this.field.setWeather('desolateland');
			} else if (this.field.isWeather(['hail', 'snow', 'everlastingwinter']) || this.field.isWeather('sand')) {
				this.field.clearWeather();
			}
		},
		onEnd(pokemon) {
			if (this.field.isWeather('raindance')) {
			   this.field.setWeather('sunnyday');
			} else if (this.field.isWeather('sunnyday')) {
				this.field.setWeather('raindance');
			} else if (this.field.isWeather('primordialsea')) {
				this.field.setWeather('desolateland');
			} else if (this.field.isWeather('desolateland')) {
				this.field.setWeather('primordialsea');
			}
		},
		shortDesc: "Reverses effects of Sun and Rain; negates Sand and Hail.",
		name: "Microclimate",
		rating: 2,
		num: -19,
	},
	voidheart: {
		desc: "When it KOs an opponent with a direct move, it recovers 25% of its max HP.",
		shortDesc: "Heals 25% HP on KO.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.heal(source.baseMaxhp / 4);
			}
		},
		name: "Void-Heart",
		rating: 3,
		num: -20,
	},
	convectioncurrent: {
		desc: "If Gravity is active, this Pokemon's Speed is doubled.",
		shortDesc: "Speed x2 on Gravity.",
		onModifySpe(spe, pokemon) {
			if (this.field.getPseudoWeather('gravity')) {
				return this.chainModify(2);
			}
		},
		name: "Convection Current",
		rating: 3,
		num: -21,
	},
	endlessdream: {
		desc: "While this Pokemon is active, every other Pokemon is treated as if it has the Comatose ability. Pokemon that are either affected by Sweet Veil, or have Insomnia or Vital Spirit as their abilities are immune this effect.",
		shortDesc: "All Pokemon are under Comatose effect.",
		onStart(source) {
			if (this.field.getPseudoWeather('ultrasleep')) {
				this.add('-ability', source, 'Endless Dream');
				this.hint("All Pokemon are under Comatose effect!");
				this.field.pseudoWeather.ultrasleep.source = source;
				this.field.pseudoWeather.ultrasleep.duration = 0;
			} else {
				this.add('-ability', source, 'Endless Dream');
				this.field.addPseudoWeather('ultrasleep');
				this.hint("All Pokemon are under Comatose effect!");
				this.field.pseudoWeather.ultrasleep.duration = 0;
			}
		},
		onAnyTryMove(target, source, move) {
			if (['ultrasleep'].includes(move.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Endless Dream', move, '[of] ' + target);
				return false;
			}
		},
		onResidualOrder: 21,
		onResidualSubOrder: 2,
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('endlessdream')) {
					return;
				}
			}
			this.field.removePseudoWeather('ultrasleep');
		},
		name: "Endless Dream",
		rating: 3,
		num: -22,
	},
	evaporate: {
		desc: "If the Pokemon or the opponent uses a Water type move, it triggers the Haze effect. Immune to Water.",
		shortDesc: "Haze when any Pokemon uses a Water move; Water immunity.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.type === 'Water') {
				for (const pokemon of this.getAllActive()) {
					pokemon.clearBoosts();
				   return null;
				}
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				this.add('-immune', target, '[from] ability: Evaporate');
				for (const pokemon of this.getAllActive()) {
					pokemon.clearBoosts();
				   return null;
				}
			}
		},
		name: "Evaporate",
		rating: 4,
		num: -23,
	},
	desertsong: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Ground';
			}
		},
		name: "Desert Song",
		desc: "This Pokemon's sound-based moves become Ground-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's sound-based moves become Ground type.",
		rating: 1.5,
		num: -24,
	},
	sundownswitch: {
		name: "Sundown Switch",
		desc: "If Cacturne-Mega-Y: Changes to Day form before using Grass move; to Night before using Dark move.",
		num: -25,
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Cacturne' || attacker.transformed) return;
			if (move.type !== 'Grass' && move.type !== 'Dark') return;
			const targetForme = (move.type === 'Grass' ? 'Cacturne-Mega-Y-Day' : 'Cacturne-Mega-Y-Night');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			this.add('-start', attacker, 'typechange', attacker.getTypes(true).join('/'), '[silent]');
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
	},
	coldvengeance: {
		desc: "When replacing a fainted party member, its next move has x1.5 BP.",
		shortDesc: "Its first move has x1.5 BP when replacing a fainted ally.",
		onAfterMega(pokemon) {
			if (!pokemon.side.faintedLastTurn) return;
			pokemon.addVolatile('coldvengeance');
		},
		onStart(pokemon) {
			if (!pokemon.side.faintedThisTurn) return;
			pokemon.addVolatile('coldvengeance');
		},
		onModifyDamage(damage, source, target, move) {
			if (source.volatiles['coldvengeance']) {
				return this.chainModify(1.5);
			}
		},
		name: "Cold Vengeance",
		rating: 3,
		num: -26,
	},
	blindrage: {
		onDamagingHit(damage, target, source, move) {
			if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod > 0) {
				this.boost({ atk: 1 });
			}
		},
		name: "Blind Rage",
		shortDesc: "This Pokemon's Atk is raised by 1 when hit by a super effective attack.",
		rating: 3.5,
		num: -27,
	},
	hardrock: {
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			return this.chainModify(1.5);
		},
		onModifySpDPriority: 6,
		onModifySpD(pokemon) {
			return this.chainModify(0.5);
		},
		name: "Hard Rock",
		shortDesc: "Gets x1.5 Def but x0.5 SpD.",
		rating: 1.5,
		num: -28,
	},
	forgery: {
		desc: "This Pokémon inherits the item of the last unfainted Pokemon in its party.",
		shortDesc: "Inherits the item of the last party member.",
		onStart(pokemon) {
			if (pokemon.species.name !== 'Zoroark-Mega') return;
			pokemon.addVolatile('forgery');
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (
					!pokemon.side.pokemon[i] || pokemon.side.pokemon[i].fainted ||
					!pokemon.side.pokemon[i].item || this.dex.items.get(pokemon.side.pokemon[i].item).zMove ||
					 this.dex.items.get(pokemon.side.pokemon[i].item).megaStone
				) continue;
				break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			const forgery = pokemon.side.pokemon[i];
			this.add('-ability', pokemon, 'Forgery');
			pokemon.item = forgery.item;
			this.add('-message', `${pokemon.name}'s Zoroarkite became a replica of the ${this.dex.items.get(forgery.item).name} belonging to ${forgery.name}!`);
		},
		onUpdate(pokemon) {
			if (pokemon.species.name !== 'Zoroark-Mega') return;
			if (!pokemon.item) {
				this.add('-ability', pokemon, 'Forgery');
				this.add('-message', `${pokemon.name}'s Zoroarkite returned to normal!`);
				pokemon.item = 'zoroarkite' as ID;
			}
		},
		onEnd(pokemon) {
			if (pokemon.species.name !== 'Zoroark-Mega') return;
			if (pokemon.item !== 'zoroarkite') {
				this.add('-ability', pokemon, 'Forgery');
				this.add('-message', `${pokemon.name}'s Zoroarkite returned to normal!`);
				pokemon.item = 'zoroarkite' as ID;
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Forgery",
		rating: 3,
		num: -29,
	},
	clairvoyance: {
		desc: "This Pokémon's Psychic-type moves take effect two turns after being used. At the end of that turn, the damage is calculated at that time and dealt to the Pokémon at the position the target had when the move was used. Only one move can be delayed at a time. If the user is no longer active at the time an attacking move should hit, damage is calculated based on the user's natural Attack or Special Attack stat, types, and level, with no boosts from its held item or Ability. Status moves are used by the Pokémon at the position the user had when the move was used.",
		shortDesc: "Psychic-type moves delayed until two turns later, but only one at a time.",
		onBeforeMove(source, target, move) {
			if (
				move && move.type === 'Psychic' && source.hasAbility('clairvoyance') &&
				source.side.addSlotCondition(source, 'clairvoyance')
			) {
				Object.assign(source.side.slotConditions[source.position]['clairvoyance'], {
					duration: 3,
					source: source,
					target: null,
					move: move,
					position: target.position,
					side: target.side,
					moveData: this.dex.moves.get(move),
				});
				this.add('-ability', source, 'Clairvoyance');
				this.add('-message', `${source.name} cast ${move.name} into the future!`);
				source.deductPP(move.id, 1);
				return null;
			}
		},
		condition: {
			duration: 3,
			onResidualOrder: 3,
			onEnd(target) {
				this.effectState.target = this.effectState.side.active[this.effectState.position];
				const data = this.effectState;
				const move = this.dex.moves.get(data.move);
				this.add('-ability', this.effectState.source, 'Clairvoyance');
				if (!data.target) {
					this.hint(`${move.name} did not hit because there was no target.`);
					return;
				}

				this.add('-message', `${this.effectState.source.name}'s ${move.name} took effect!`);
				data.target.removeVolatile('Endure');

				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
					data.moveData.infiltrates = true;
				}
				if (data.source.hasAbility('normalize') && this.gen >= 6) {
					data.moveData.type = 'Normal';
				}
				if (data.source.hasAbility('adaptability') && this.gen >= 6) {
					data.moveData.stab = 2;
				}
				data.moveData.isFutureMove = true;
				delete data.moveData.flags['contact'];
				delete data.moveData.flags['protect'];

				if (move.category === 'Status') {
					this.actions.useMove(move, target, data.target);
				} else {
					const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
					if (data.source.isActive) {
						this.add('-anim', data.source, hitMove, data.target);
					}
					this.actions.trySpreadMoveHit([data.target], data.source, hitMove);
				}
			},
		},
		name: "Clairvoyance",
		rating: 3,
		num: -30,
	},
	longtail: {
		shortDesc: "Boosts the power of tail and whip moves by 1.3x",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (tailMoves.includes(move.id)) {
				return this.chainModify(1.3);
			}
		},
		name: "Long Tail",
		num: -31,
	},
	boarding: {
		onBasePower(basePower, pokemon, target) {
			if (target.volatiles['trapped']) {
				return this.chainModify(1.25);
			}
		},
		name: "Boarding",
		shortDesc: "This Pokemon deals 1.25x damage to trapped opponents.",
		rating: 3,
		num: -32,
	},
	lasttoxin: {
		desc: "When this Pokemon brings an opponent to 50% or under using an attacking move, it badly poisons that opponent.",
		shortDesc: "Badly poison enemies brought under half health..",
		onAfterMove(source, target, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				target.setStatus('tox');
			}
		},
		name: "Last Toxin",
		rating: 4,
		num: -33,
	},
	chakrasurge: {
		onStart(source) {
			this.field.setTerrain('chakraterrain');
		},
		name: "Chakra Surge",
		shortDesc: "On switch-in, sets Chakra Terrain.",
		rating: 4,
		num: -34,
	},
	striker: {
		shortDesc: "Boosts the power of kicking moves by 1.3x",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (kickMoves.includes(move.id)) {
				return this.chainModify(1.3);
			}
		},
		name: "Striker",
		num: -35,
	},
	insectivorous: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Bug') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Insectivorous');
				}
				return null;
			}
		},
		name: "Insectivorous",
		shortDesc: "This Pokemon heals 1/4 HP when hit by a Bug type move. Immune to Bug type moves.",
		rating: 3.5,
		num: -36,
	},
	deadlyblasts: {
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		name: "Deadly Blasts",
		shortDesc: "This Pokemon's super effective moves get x1.2 BP.",
		rating: 2.5,
		num: -37,
	},
	cosmicenergy: {
		desc: "This Pokémon can skip the charging turn of its moves.",
		shortDesc: "Skip charging turns of moves.",
		onChargeMove(pokemon, target, move) {
			this.debug('Solar Core - remove charge turn for ' + move.id);
			this.attrLastMove('[still]');
			this.addMove('-anim', pokemon, move.name, target);
			return false; 
		},
		name: "Cosmic Energy",
		rating: 2,
		num: -38,
	},
	ignite: {
		desc: "This Pokémon's Normal-type moves become Fire-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokémon's Normal-type moves become Fire-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fire';
				(move as any).igniteBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if ((move as any).igniteBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Ignite",
		rating: 4,
		num: -39,
	},
	nightlight: {
		desc: "This Pokemon takes halves damages against Ghost-type and Dark-type moves.",
		shortDesc: "This Pokemon takes halves damages against Ghost-type and Dark-type moves.",
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost' || move.type === 'Dark') {
				this.debug('Night Light weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost' || move.type === 'Dark') {
				this.debug('Night Light weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Night Light",
		rating: 3.5,
		num: -40,
	},
	icebreaker: {
		desc: "This Pokemon's Speed is x1.5 on Hail, and this Pokemon's Atk and SpA is x1.5 on Rain. This Pokemon is immune to Hail.",
		shortDesc: "x1.5 Speed on Hail; x1.5 Atk and SpA on Rain. Hail immunity.",
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'everlastingwinter'])) {
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
		num: -41,
	},
	parasitism: {
		name: "Parasitism",
		desc: "When this Pokemon is KO, inflicts Yawn and Leech Seed to the opponent.",
		shortDesc: "Inflicts Yawn and Leech Seed on KO.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				if (!source.status && source.runStatusImmunity('slp')) {
					source.addVolatile('yawn');
				}
				if (!(source.hasType('Grass'))) {
					source.addVolatile('leechseed', source);
				}
			}
		},
		rating: 2.5,
		num: -42,
	},
	explosive: {
		desc: "This Pokémon does not suffer the drawbacks of recoil moves and sacrificial moves.",
		shortDesc: "Ignores recoil and self-KO effects of its moves.",
		onModifyMove(move) {
			if (move.recoil || move.mindBlownRecoil || (move.selfdestruct && move.selfdestruct === 'always')) {
				if (move.selfdestruct && move.selfdestruct === 'always') {
					delete move.selfdestruct;
				}
				if (move.recoil) {
					delete move.recoil;
				}
				if (move.mindBlownRecoil) {
					move.mindBlownRecoil = false;
				}
			}
		},
		name: "Explosive",
		rating: 4,
		num: -43,
	},
	unimpressed: {
		shortDesc: "Moves used against this Pokemon don't receive STAB.",
		onSourceModifyDamage(damage, source, target, move) {
			if (source.hasType(move.type) && (!source.hasAbility('adaptability'))) {
				this.debug('Unimpressed weaken');
				return this.chainModify(0.67);
			}
			if (source.hasType(move.type) && (source.hasAbility('adaptability'))) {
				this.debug('Unimpressed weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Unimpressed",
		rating: 3.5,
		num: -44,
	},
	accumulate: {
		desc: "At the end of each turn, this Pokemon gets 1 Stockpile.",
		shortDesc: "Stockpiles at the end of each turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				pokemon.addVolatile('stockpile');
			}
		},
		name: "Accumulate",
		rating: 4.5,
		num: -45,
	},
	angelicnature: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Angelic Nature');
				}
				return null;
			}
		},
		name: "Angelic Nature",
		shortDesc: "This Pokemon heals 1/4 HP when hit by a Fairy type move. Immune to Fairy type moves.",
		rating: 3.5,
		num: -46,
	},
	blowhole: {
		desc: "Before this Pokemon uses Water Spout, it sets Rain Dance. Water Spout is always at max BP.",
		shortDesc: "Sets Rain Dance before using Water Spout. Water Spout is at max BP.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.id === 'waterspout' && this.field.getWeather().id !== 'raindance') {
				this.field.setWeather('raindance');
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move, attacker) {
			if (move.id === 'waterspout') {
				move.basePower = 150;
			}
		},
		name: "Blowhole",
		rating: 3,
		num: -47,
	},
	northwind: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			let activated = false;
			if (pokemon.activeTurns) {
				for (const target of pokemon.side.foe.active) {
					if (!target || !target.isAdjacent(pokemon) || target.hasType('Ice')) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Web Weaver', 'boost');
						activated = true;
					}
					if (target.volatiles['substitute']) {
						this.add('-immune', target);
					} else {
						this.boost({ spe: -1 }, target, pokemon, null, true);
					}
				}
			}
		},
		name: "North Wind",
		shortDesc: "At the end of each turn, lowers all of the Pokemons' Speed by one stage.",
		rating: 4.5,
		num: -48,
	},
	everlastingwinter: {
		desc: "On switch-in, the weather becomes Snow Hail. This weather remains in effect until this Ability is no longer active for any Pokémon, or the weather is changed by Delta Stream, Desolate Land or Primordial Sea. Super effective moves only inflict 3/4 damages on this Pokemon.",
		shortDesc: "On switch-in, snow hail begins until this Ability is not active in battle. Filter effect.",
		onStart(source) {
			this.field.setWeather('everlastingwinter');
			this.add('-ability', source, 'Everlasting Winter');
			this.add('-message', `${source.name} created an unrelenting winter storm!`);
			this.hint("Everlasting Winter doesn't wear off until the user leaves the field!");
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream', 'everlastingwinter'];
			if (this.field.getWeather().id === 'everlastingwinter' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('everlastingwinter')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		name: "Everlasting Winter",
		rating: 4.5,
		num: -49,
	},
	// other strong weathers
	deltastream: {
		inherit: true,
		desc: "On switch-in, the weather becomes strong winds that remove the weaknesses of the Flying type from Flying-type Pokemon. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Desolate Land, Everlasting Winter or Primordial Sea.",
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream', 'everlastingwinter'];
			if (this.field.getWeather().id === 'deltastream' && !strongWeathers.includes(weather.id)) return false;
		},
	},
	desolateland: {
		inherit: true,
		desc: "On switch-in, the weather becomes extremely harsh sunlight that prevents damaging Water-type moves from executing, in addition to all the effects of Sunny Day. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream, Everlasting Winter or Primordial Sea.",
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream', 'everlastingwinter'];
			if (this.field.getWeather().id === 'desolateland' && !strongWeathers.includes(weather.id)) return false;
		},
	},
	primordialsea: {
		inherit: true,
		desc: "On switch-in, the weather becomes heavy rain that prevents damaging Fire-type moves from executing, in addition to all the effects of Rain Dance. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream, Desolate Land or Everlasting Winter.",
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream', 'everlastingwinter'];
			if (this.field.getWeather().id === 'primordialsea' && !strongWeathers.includes(weather.id)) return false;
		},
	},
	// all snow and hail abilities
	icebody: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'hail' || type === 'everlastingwinter') return false;
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow' || effect.id === 'everlastingwinter') {
				this.heal(target.baseMaxhp / 16);
			}
		},
	},
	slushrush: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'everlastingwinter'])) {
				return this.chainModify(2);
			}
		},
	},
	overcoat: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'everlastingwinter' || type === 'powder') return false;
		},
	},
	// end of snow and hail abilities
	spikybody: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Spiky Body",
		desc: "Pokemon making contact with this Pokemon lose 1/8 of their maximum HP, rounded down.",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
		rating: 2.5,
		num: -50,
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
		num: -51,
	},
	leafdress: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire' || move.type === 'Poison' || move.type === 'Flying' || move.type === 'Bug') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire' || move.type === 'Poison' || move.type === 'Flying' || move.type === 'Bug') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Leaf Dress",
		shortDesc: "Negates Grass type weaknesses.",
		rating: 3.5,
		num: -52,
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
		num: -53,
	},
	sonar: {
		shortDesc: "Reveals a random move of each adjacent opponent when this Pokemon hits them with a Sound move.",
		onSourceHit(target, source, move){
			if (move.flags['sound']) {
				for (const targ of source.side.foe.active) {
					if (targ.fainted) return;
					const temp = this.sample(targ.moveSlots);
					this.add('-message', target.name + "'s Sonar revealed the move " + temp.move + "!");
				}
			}
		},
		name: "Sonar",
		rating: 3,
		num: -54,
	},
	unstableshell: {
		shortDesc: "If a pokemon makes contact to this pokemon, this Pokemon loses 25% max HP and returns doubles of lost HP.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(Math.round(target.maxhp / 4), target, target);
				this.damage(Math.round(target.maxhp / 2), source, target);
			}
		},
		name: "Unstable Shell",
		rating: 2.5,
		num: -55,
	},
	sleightofhand: {
		desc: "This Pokémon's contact moves become special attacks and do not make contact with the target.",
		shortDesc: "This Pokémon's contact moves become special and non-contact.",
		onModifyMove(move) {
			if (move.flags['contact']) {
				if (move.category !== 'Special') move.category = 'Special';
				delete move.flags['contact'];
			}
		},
		name: "Sleight of Hand",
		rating: 3,
		num: -56,
	},
	newtonslaw: {
		onModifySpe(spe, pokemon) {
			if (this.field.getPseudoWeather('gravity')) {
				return this.chainModify(2);
			}
		},
		name: "Newton's Law",
		shortDesc: "On Gravity, this Pokemon's Speed is doubled.",
		rating: 3,
		num: -57,
	},
	hyperthermia: {
		onSourceHit(target, source, move) {
			if (move.category !== 'Status') {
				if (source.volatiles['warming']) {
					delete source.volatiles['warming'];
					source.addVolatile('warm');
				}
				else {
					source.addVolatile('warming');
				}
			}
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['warm']) {
				pokemon.clearBoosts();
				this.add('-clearboost', pokemon);
				delete pokemon.volatiles['warm'];
			}
		},
		name: "Hyperthermia",
		desc: "After this Pokemon used 2 offensive moves, all of its stat changes are reseted.",
		shortDesc: "Resets all stat changes after 2 offensive moves.",
		rating: 1,
		num: -58,
	},
	mentalfortitude: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Mental Fortitude');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Mental Fortitude');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Mental Fortitude');
				pokemon.removeVolatile('taunt');
			}
			if (pokemon.volatiles['encore']) {
				this.add('-activate', pokemon, 'ability: Mental Fortitude');
				pokemon.removeVolatile('encore');
			}
			if (pokemon.volatiles['torment']) {
				this.add('-activate', pokemon, 'ability: Mental Fortitude');
				pokemon.removeVolatile('torment');
			}
			if (pokemon.volatiles['disable']) {
				this.add('-activate', pokemon, 'ability: Mental Fortitude');
				pokemon.removeVolatile('disable');
			}
			if (pokemon.volatiles['healblock']) {
				this.add('-activate', pokemon, 'ability: Mental Fortitude');
				pokemon.removeVolatile('healblock');
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Oblivious');
				return null;
			}
		},
		name: "Mental Fortitude",
		shortDesc: "This Pokemon is immune to Attract, Disable, Encore, Heal Block, Taunt, Torment.",
		rating: 1.5,
		num: -59,
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
		num: -61,
	},
	hydrophilic: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(2);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Bubble');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Bubble');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Hydrophilic",
		desc: "This Pokemon's offensive stat is doubled while using a Water-type attack. If a Pokemon uses a Fire-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
		shortDesc: "This Pokemon's Water power is 2x; it can't be burned; Fire power against it is halved.",
		rating: 3.5,
		num: -62,
	},
	searingtouch: {
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'brn',
				ability: this.dex.abilities.get('searingtouch'),
			});
		},
		name: "Searing Touch",
		shortDesc: "This Pokemon's contact moves have a 30% chance of burning.",
		rating: 2,
		num: -63,
	},
	virality: {
		name: "Virality",
		shortDesc: "Pokemon making contact with this Pokemon have their Ability changed to Mummy.",
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['cantsuppress'] || sourceAbility.id === 'virality') {
				return;
			}
			if (move.flags['contact']) {
				const oldAbility = source.setAbility('virality', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Virality', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
		},
		rating: 2,
		num: -64,
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
		num: -65,
	},
	justified: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.boost({ atk: 1 })) {
					this.add('-immune', target, '[from] ability: Justified');
				}
				return null;
			}
		},
		shortDesc: "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move. Dark immunity.",
	},
	colorchange: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {},
		onTryHit(target, source, move) {
			if (!target.hp) return;
			const type = move.type;
			if (
				target.isActive && move.effectType === 'Move' && move.category !== 'Status' &&
				type !== '???' && !target.hasType(type)
			) {
				if (!target.setType(type)) return false;
				this.add('-start', target, 'typechange', type, '[from] ability: Color Change');

				if (target.side.active.length === 2 && target.position === 1) {
					// Curse Glitch
					const action = this.queue.willMove(target);
					if (action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			}
		},
		shortDesc: "This Pokemon's type changes to the type of a move it's hit by before being hit, unless it has the type.",
	},
	iceface: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'everlastingwinter']) && pokemon.species.id === 'eiscuenoice') {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && target.species.id === 'eiscue') {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (target.species.id !== 'eiscue') return;
			if (target.volatiles['substitute'] && !(move.flags['bypasssub'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.species.id !== 'eiscue') return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onWeatherChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			if (this.field.isWeather(['hail', 'snow', 'everlastingwinter']) && pokemon.species.id === 'eiscuenoice') {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		desc: "If this Pokemon is an Eiscue, the first hit it takes in battle deals 0 neutral damage. Its ice face is then broken and it changes forme to Noice Face. Eiscue regains its Ice Face forme when Snow begins or when Eiscue switches in while Snow is active. Confusion damage also breaks the ice face.",
		shortDesc: "If Eiscue, the first hit it takes deals 0 damage. Effect is restored in Snow.",
	},
	battlebond: {
		inherit: true,
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') {
				return;
			}
			if (source.species.id === 'greninjabond' && source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.add('-activate', source, 'ability: Battle Bond');
				source.formeChange('Greninja-Ash', this.effect, true);
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move, attacker) {
			if (move.id === 'watershuriken' && attacker.species.name === 'Greninja-Ash' &&
				!attacker.transformed) {
				move.multihit = 3;
			}
		},
		shortDesc: "After KOing a Pokemon: becomes Ash-Greninja, Water Shuriken hits 3 times.",
		desc: "After KOing a Pokemon: becomes Ash-Greninja, Water Shuriken hits 3 times.",
		isNonstandard: null,
		rating: 4,
	},
	powerspot: {
		inherit: true,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target) {
				this.debug('Power Spot boost');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "This Pokemon's allies have the power of their moves multiplied by 1.5.",
	},
	arenatrap: {
		inherit: true,
		onFoeTrapPokemon(pokemon) {},
		onFoeMaybeTrapPokemon(pokemon, source) {},
		onModifyDamage(damage, source, target, move) {
			if (!(source.activeMoveActions > 1)) {
				return this.chainModify(1.3);
			}
		},
		shortDesc: "This Pokemon's attacks deal x1.3 damages during 1 turn.",
	},
	shadowtag: {
		inherit: true,
		onFoeTrapPokemon(pokemon) {	},
		onFoeMaybeTrapPokemon(pokemon, source) {},
		onFoeSwitchOut(source, target) {
			for (const target of source.side.foe.active) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		shortDesc: "Opposing Pokemon loose 1/8 of their maximum HP, rounded down, when it switches out.",
	},
	sandveil: {
		inherit: true,
		onSetStatus(status, target, source, effect) {
			if (this.field.isWeather('sandstorm')) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Sand Veil');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && this.field.isWeather('sandstorm')) {
				this.add('-immune', target, '[from] ability: Sand Veil');
				return null;
			}
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.3);
			}
		},
		onModifyAccuracy(accuracy) {},
		desc: "If Sandstorm is active, this Pokemon's Defense is multiplied by 1.3, and it cannot become affected by a non-volatile status condition or Yawn, and Rest will fail for it. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
		shortDesc: "If Sandstorm is active, this Pokemon's Def is 1.3x; cannot be statused and Rest will fail for it.",
	},
	snowcloak: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'hail' || type === 'everlastingwinter') return false;
		},
		onSetStatus(status, target, source, effect) {
			if (this.field.isWeather(['hail', 'snow', 'everlastingwinter'])) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Snow Cloak');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && this.field.isWeather(['hail', 'snow', 'everlastingwinter'])) {
				this.add('-immune', target, '[from] ability: Snow Cloak');
				return null;
			}
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'everlastingwinter'])) {
				return this.chainModify(1.3);
			}
		},
		onModifyAccuracy(accuracy) {},
		desc: "If Snow is active, this Pokemon's Defense is multiplied by 1.3, and it cannot become affected by a non-volatile status condition or Yawn, and Rest will fail for it. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
		shortDesc: "If Snow is active, this Pokemon's Def is 1.3x; cannot be statused and Rest will fail for it.",
	},
	leafguard: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.3);
			}
		},
		desc: "If Sunny Day is active, this Pokemon's Defense is multiplied by 1.3, and it cannot become affected by a non-volatile status condition or Yawn, and Rest will fail for it. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
		shortDesc: "If Sunny Day is active, this Pokemon's Def is 1.3x; cannot be statused and Rest will fail for it.",
	},
	immunity: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				this.add('-immune', target, '[from] ability: Immunity');
				return null;
			}
		},
		shortDesc: "This Pokemon is immune to poison damages and Poison type moves",
	},
	stickyhold: {
		//inherit: true,
		onTakeItem(item, pokemon, source) {
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.name === 'Knock Off') {
				this.debug('Sticky Hold weaken');
				return this.chainModify(0.67);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.name === 'Poltergeist') {
				this.add('-immune', pokemon, '[from] ability: Sticky Hold');
				return null;
			}
		},
		name: "Sticky Hold",
		rating: 2,
		num: 60,
	},
	normalize: {
		inherit: true,
		desc: "This Pokemon's moves are changed to be Normal type and have their power multiplied by 1.5. This effect comes before other effects that change a move's type.",
		shortDesc: "This Pokemon's moves are changed to be Normal type and have 1.5x power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.5);
		},
	},
	watercompaction: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Water Compaction');
				}
				return null;
			}
		},
		shortDesc: "This Pokemon's Defense is raised 2 stages after it is damaged by a Water-type move. Water immunity.",
	},
	forecast: {
		inherit: true,
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
			case 'snow':
			case 'everlastingwinter':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type) {
				switch (type) {
					case "Water":
						this.field.setWeather('raindance');	
						if (!source.setType(type)) return;
						this.add('-start', source, 'typechange', type, '[from] ability: Forecast');
						break;
					case "Fire":
						this.field.setWeather('sunnyday');	
						if (!source.setType(type)) return;
						this.add('-start', source, 'typechange', type, '[from] ability: Forecast');
						break;
					case "Ice":
						this.field.setWeather('snow');	
						if (!source.setType(type)) return;
						this.add('-start', source, 'typechange', type, '[from] ability: Forecast');
						break;
					
				}
			}
		},
		desc: "Castform's type changes to the current weather condition's type, except Sandstorm. Upon using a Water, Fire, or Ice move, this Pokemon changes to that type and sets the corresponding weather.",
		shortDesc: "Changes type, form and weather when using Water/Fire/Ice moves.",
    },
	mimicry: {
		inherit: true,
		onTerrainChange(pokemon) {
			let types;
			switch (this.field.terrain) {
			case 'electricterrain':
				types = ['Electric'];
				break;
			case 'grassyterrain':
				types = ['Grass'];
				break;
			case 'mistyterrain':
				types = ['Fairy'];
				break;
			case 'psychicterrain':
				types = ['Psychic'];
				break;
			case 'chakraterrain':
				types = ['Fighting'];
				break;
			default:
				types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typeadd', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typeadd', '[silent]');
			}
		},
	},
	disguise: {
		inherit: true,
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id) && this.effectState.busted) {
				const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 16, pokemon, pokemon, this.dex.species.get(speciesid)); // 6.25% instead of 12.5% HP lost
			}
		},
		desc: "If this Pokemon is a Mimikyu, the first hit it takes in battle deals 0 neutral damage. Its disguise is then broken, it changes to Busted Form, and it loses 1/16 of its max HP. Confusion damage also breaks the disguise.",
		shortDesc: "(Mimikyu only) The first hit it takes is blocked, and it takes 1/16 HP damage instead.",
	},
	toxicboost: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				return false;
			}
		},
		shortDesc: "1.5x Attack while poisoned; Immune to poison status damage.",
	},
	flareboost: {
		inherit: true,
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				return false;
			}
		},
		shortDesc: "1.5x SpA while burned; Immune to burn damage.",
	},
	zenmode: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (!['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			} else if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
		shortDesc: "If Darmanitan, changes Mode to Zen.",
	},
	dragonsmaw: {
		inherit: true,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status' && move.type === 'Dragon') {
				this.heal(pokemon.lastDamage / 8, pokemon);
			}
		},
		name: "Dragon's Maw",
		shortDesc: "This Pokemon gets x1.5 in its attacking stat when using an Dragon move. It also heals 1/8 of the damages dealt when using a Dragon type move.",
		rating: 3.5,
		num: 263,
	},
	runaway: {
		inherit: true,
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
		shortDesc: "This Pokemon can't be trapped by any mean.",
	},
	illuminate: {
		inherit: true,
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('illuminate - enhancing accuracy');
			return accuracy * 1.3;
		},
		desc: "This Pokemon's Accuracy is x1.3. Prevents other Pokemon from lowering this Pokemon's accuracy stat stage. This Pokemon ignores a target's evasiveness stat stage.",
		shortDesc: "This Pokemon's Accuracy is x1.3. This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat.",
	},
	honeygather: {
		inherit: true,
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hp && !pokemon.item) {
				pokemon.setItem('honey');
				this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Honey Gather');
			}
			if (pokemon.hasItem('honey')) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		shortDesc: "At the end of each turn, if this Pokemon has no item, it gets Honey. If it has honey, it heals 1/8 of its HP.",
	},
	pastelveil: {
		inherit: true,
		desc: "This Pokemon and its allies cannot be poisoned or burned. Gaining this Ability while this Pokemon or its ally is poisoned or burned cures them. If this Ability is being ignored during an effect that causes poison or burn, this Pokemon is cured immediately but its ally is not.",
		shortDesc: "This Pokemon and its allies cannot be poisoned or burned. On switch-in, cures poisoned and burned allies.",
		onStart(pokemon) {
			for (const ally of pokemon.allies()) {
				if (['psn', 'tox', 'brn'].includes(ally.status)) {
					this.add('-activate', pokemon, 'ability: Pastel Veil');
					ally.cureStatus();
				}
			}
		},
		onUpdate(pokemon) {
			if (['psn', 'tox', 'brn'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onAllySwitchIn(pokemon) {
			if (['psn', 'tox', 'brn'].includes(pokemon.status)) {
				this.add('-activate', this.effectState.target, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox', 'brn'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Pastel Veil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox', 'brn'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
	},
	defeatist: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.side.totalFainted === 5) {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.side.totalFainted === 5) {
				return this.chainModify(0.5);
			}
		},
		desc: "If this Pokemon is the last Pokemon of the team, its Attack and Special Attack are halved.",
		shortDesc: "If this Pokemon is the last Pokemon of the team, its Attack and Sp. Atk are halved.",
	},
	ironfist: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([5325, 4096]);
			}
		},
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3x power. Sucker Punch is not boosted.",
	},
	rkssystem: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (!pokemon.hasType(move.type)) {
				return this.chainModify(1.2);
			}
		},
		shortDesc: "Non-STAB moves have 1.2x power.",
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
		rating: 4,
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
	},
	schooling: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.species.id === 'wishiwashi') {
				pokemon.formeChange('Wishiwashi-School');
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.species.id === 'wishiwashi') {
				pokemon.formeChange('Wishiwashi-School');
			}
		},
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('schooling - enhancing accuracy');
			return accuracy * 1.3;
		},
		desc: "On switch-in, if this Pokemon is a Wishiwashi that is level 20 or above, it changes to School Form, and raises its Accuracy by 1.3. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
		shortDesc: "If user is Wishiwashi, changes to School Form, else Solo Form. Accuracy x1.3.",
	},
	grasspelt: {
		inherit: true,
		onStart(pokemon) {
			if (
				!this.field.setTerrain('grassyterrain') &&
				this.field.isTerrain('grassyterrain') && pokemon.isGrounded()
			) {
				this.add('-activate', pokemon, 'ability: Grass Pelt');
			}
		},
		onTerrainChange(pokemon) {
			if (pokemon === this.field.weatherState.source) return;
			if (this.field.isTerrain('grassyterrain') && pokemon.isGrounded()) {
				this.add('-activate', pokemon, 'ability: Grass Pelt');
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def, attacker, defender, move) {
			if (this.field.isTerrain('grassyterrain') && attacker.isGrounded()) {
				this.debug('Grass Pelt boost');
				return this.chainModify([5461, 4096]);
			}
		},
		shortDesc: "On switch-in, summons Grassy Terrain. During Grassy Terrain, Def is 1.3333x.",
	},
	flowergift: {
		inherit: true,
		onModifyAtkPriority: 3,
		onModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 4,
		onModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 4,
		onModifyDef(def, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (!(['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()))) {
				return this.chainModify(1.5);
			}
		},
		desc: "If user is Cherrim and Sunny Day isn't active, its Def is 1.5x. If user is Cherrim and Sunny Day is active, it and its allies Atk and Sp. Def are 1.5x. and Cherrim gains the Fire type.",
		shortDesc: "Cherrim: If Sunny Day is active, it and its allies Atk and Sp. Def are 1.5x, and Cherrim gains the Fire type; otherwise Def x1.5.",
	},
	gorillatactics: {
		inherit: true,
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
			if (pokemon.hasItem('choiceband') || pokemon.hasItem('choicescarf') || pokemon.hasItem('choicespecs')) {
				pokemon.addVolatile('embargo');
			}
		},
		shortDesc: "Pokemon's Atk is 1.5x, but it can only select one move. Choice items are disabled.",
	},
	quickdraw: {
		inherit: true,
		onFractionalPriority(priority, pokemon, target, move) {},
		desc: "This Pokémon moves first in its priority bracket when its target has 1/3 or less of its maximum HP, rounded down. Does not affect moves that have multiple targets.",
		shortDesc: "This Pokémon moves first in its priority bracket when its target has 1/3 or less HP.",
		onUpdate(pokemon) {
			const action = this.queue.willMove(pokemon);
			if (!action) return;
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return;
			if (action.move.target != 'allAdjacentFoes' && action.move.target != 'allAdjacent' && target.hp && target.hp <= target.maxhp / 2) {
				pokemon.addVolatile('quickdraw');
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				const action = this.queue.willMove(pokemon);
				if (action) {
					this.add('-ability', pokemon, 'Quick Draw');
					this.add('-message', `${pokemon.name} prepared to move immediately!`);
				}
			},
			onModifyPriority(priority) {
				return priority + 0.1;
			},
		},
	},
	icescales: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special' || target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(0.5);
			}
		},
		shortDesc: "This Pokemon receives 1/2 damage from special attacks, as well as super effective attacks.",
		desc: "This Pokemon receives 1/2 damage from special attacks, as well as super effective attacks.",
	},
	strongwill: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		name: "Strong Will",
		shortDesc: "This Pokemon receives 1/2 damage from special attacks.",
		desc: "This Pokemon receives 1/2 damage from special attacks.",
		rating: 4,
		num: -66,
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
	dodge: {
		shortDesc: "When taking damages, this Pokemon adds 50% of its Speed to its corresponding defense.",
		name: "Dodge",
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const newDef = def + (spe / 2);
			return newDef;
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const newSpD = spd + (spe / 2);
			return newSpD;
		},
		rating: 3.5,
		num: -68,
	},
	wonderskin: {
		inherit: true,
		onModifyAccuracy(accuracy, target, source, move) {},
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Wonder Skin');
				return null;
			}
		},
		shortDesc: "This Pokemon is immune to Status moves.",
	},
	cutecharm: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {},
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(0.75);
		},
		flags: {breakable: 1},
		shortDesc: "This Pokemon receives 25% less damage from all attacks.",
		desc: "This Pokemon receives 25% less damage from all attacks.",
	},
	rebound: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target !== source && move?.category === 'Special' && !move.flags['sound']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Rebound",
		shortDesc: "The opponent receives 1/8 recoil damage from special non-Sound moves.",
		rating: 2.5,
		num: -69,
	},
	faithfulcompanion: {
		onUpdate(pokemon) {
			if (this.gameType !== 'doubles') return;
			const ally = pokemon.allies()[0];
			if (!ally || pokemon.transformed ||
				pokemon.baseSpecies.baseSpecies !== 'Parrotnair' || ally.baseSpecies.baseSpecies !== 'Piratcy') {
				return;
			}
		},
		onAllyAfterUseItem(item, pokemon) {
			if (pokemon.switchFlag) return;
			const ally = pokemon.allies()[0];
			if (!ally || pokemon.transformed ||
				pokemon.baseSpecies.baseSpecies !== 'Parrotnair' || ally.baseSpecies.baseSpecies !== 'Piratcy') {
				return;
			}
			const source = this.effectState.target;
			const myItem = source.takeItem();
			if (!myItem) return;
			if (
				!this.singleEvent('TakeItem', myItem, source.itemState, pokemon, source, this.effect, myItem) ||
				!pokemon.setItem(myItem)
			) {
				source.item = myItem.id;
				return;
			}
			this.add('-activate', source, 'ability: Faithful Companion', myItem, '[of] ' + pokemon);
		},
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && move?.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				if (!target.setItem(yourItem)) {
					source.item = yourItem.id;
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Faithful Companion', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Faithful Companion', '[of] ' + source);
			}
		},
		name: "Faithful Companion",
		shortDesc: "If the ally is Piratcy, gives to the ally this Pokemon's item, and steals an item from the opponent.",
		rating: 0,
		num: -70,
	},
	truant: {
		inherit: true,
		onStart(pokemon) {},
		onBeforeMove(pokemon) {},
		shortDesc: "No competitive effect.",
		desc: "No competitive effect.",
	},
	sharpness: {
		inherit: true,
		shortDesc: "Boosts the power of sword, cut, slash, and blade moves by 1.3x",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				return this.chainModify(1.3);
			}
		},
	},
	cheerleader: {
		onStart(pokemon) {
			this.boost({atk: 1}, pokemon);
		},
		shortDesc: "If the ally has Cheerleader: if Plusle, Atk, SpA and Speed x1.5; if Minun, Def, SpD and Speed x1.5.",
		desc: "If the ally has Cheerleader: if Plusle, its Atk, SpA and Speed are x1.5; if Minun, its Def, SpD and Speed are x1.5.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['cheerleader']) && pokemon.baseSpecies.baseSpecies === 'Plusle') {
					return this.chainModify(1.5);
				}
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['cheerleader']) && pokemon.baseSpecies.baseSpecies === 'Minun') {
					return this.chainModify(1.5);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['cheerleader']) && pokemon.baseSpecies.baseSpecies === 'Plusle') {
					return this.chainModify(1.5);
				}
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['cheerleader']) && pokemon.baseSpecies.baseSpecies === 'Minun') {
					return this.chainModify(1.5);
				}
			}
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['cheerleader'])) {
					return this.chainModify(1.5);
				}
			}
		},
		name: "Cheerleader",
		rating: 0,
		num: -70,
	},
	seedsower: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!source.hasType('Grass')) {
				this.add('-activate', target, 'ability: Seed Sower');
				source.addVolatile('leechseed', this.effectState.target);
			}
		},
		shortDesc: "When this Pokemon is hit by an attack, the effect of Leech Seed begins.",
	},
	angershell: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp < target.maxhp) {
				this.boost({atk: 1, spa: 1, spe: 1, def: -1, spd: -1}, target, target);
			}
		},
		shortDesc: "If this Pokemon is hit by an attack, its Attack, Sp. Atk, and Speed are raised by 1 stage. Its Defense and Sp. Def are lowered by 1 stage.",
	},
	electromorphosis: {
		inherit: true,
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.addVolatile('charge');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.volatiles['charge']) {
				return this.chainModify(0.75);
			}
		},
	},
	withering: {
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
				boosts: {
					spe: -1,
				},
				ability: this.dex.abilities.get('withering'),
			});
		},
		name: "Withering",
		shortDesc: "This Pokemon's contact moves lower the target's Speed by one stage.",
		rating: 2,
		num: -71,
	},
	zerotohero: {
		inherit: true,
		onSwitchOut(pokemon) {},
		onSwitchIn() {},
		onStart(pokemon) {},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') {
				return;
			}
			if (source.species.id === 'palafin' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Zero to Hero');
				source.formeChange('Palafin-Hero', this.effect, true);
			}
		},
		shortDesc: "If this Pokemon is a Palafin in Zero Form, KOing a foe has it change to Hero Form.",
	},
	lusterswap: { // taken from M4A
		desc: "On entry, this Pokémon's type changes to match its first move that's super effective against an adjacent opponent.",
		shortDesc: "On entry: type changes to match its first move that's super effective against an adjacent opponent.",
		onStart(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.move);
				if (move.category === 'Status') continue;
				const moveType = move.id === 'hiddenpower' ? pokemon.hpType : move.type;
				for (const target of pokemon.side.foe.active) {
					if (!target || target.fainted || !target.isAdjacent(pokemon)) continue;
					if (
						this.dex.getImmunity(moveType, target) && this.dex.getEffectiveness(moveType, target) > 0
					) {
						this.add('-ability', pokemon, 'Luster Swap');
						if (!pokemon.setType(moveType)) continue;
						this.add('-message', `${pokemon.name} changed its type to match its ${move.name}!`);
						this.add('-start', pokemon, 'typechange', moveType);
						return;
					}
				}
			}
			this.add('-ability', pokemon, 'Luster Swap');
			this.add('-message', `${pokemon.name} can't hit any opponent super effectively!`);
			return;
		},
		name: "Luster Swap",
		rating: 3,
		num: -72,
	},
	cacophony: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Cacophony boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				this.debug('Cacophony weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		desc: "This Pokemon's sound-based moves have their power multiplied by 1.3. This Pokemon takes halved damage from sound-based moves.",
		shortDesc: "This Pokemon receives 1/2 damage from sound moves. Its own have 1.3x power.",
		name: "Cacophony",
		rating: 3.5,
		num: -73,
	},
	happygolucky: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			const newAtk = atk * (1 + Math.floor(pokemon.happiness / 25));
			return newAtk;
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			const newDef = def * (1 + Math.floor(pokemon.happiness / 25));
			return newDef;
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			const newSpA = spa * (1 + Math.floor(pokemon.happiness / 25));
			return newSpA;
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			const newSpD = spd * (1 + Math.floor(pokemon.happiness / 25));
			return newSpD;
		},
		flags: {},
		name: "Happy-Go-Lucky",
		desc: "This Pokemon's Attack, Defense, Special Attack, and Special Defense get a boost depending on the happiness of the Pokemon (maximum 10%).",
		shortDesc: "Boosts Attack, Defense, Special Attack, and Special Defense by 1% per 25 happiness.",
		rating: 4,
		num: -74,
	},
	mightywall: {
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (!(pokemon.activeMoveActions > 1)) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (!(pokemon.activeMoveActions > 1)) {
				return this.chainModify(1.5);
			}
		},
		desc: "On first turn of arrival, this Pokemon's Defense and Special Defense are multiplied by 1.5.",
		shortDesc: "On first turn of arrival, this Pokemon's Defense and Special Defense are multiplied by 1.5.",
		name: "Mighty Wall",
		rating: 4,
		num: -75,
	},
	karma: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['futuremove']) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		desc: "This Pokemon's delayed moves have their power multiplied by 1.5. Wish restores 50% more HP, rounded half down.",
		shortDesc: "This Pokemon's delayed moves have 1.5x power. Wish heals for 50% more HP.",
		name: "Karma",
		rating: 3,
		num: -76,
	},
	souldevourer: {
		onResidualOrder: 8,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.volatiles['trapped']) {
					const damage = this.damage(pokemon.baseMaxhp / 8, target, pokemon);
					if (damage) {
						this.heal(damage, pokemon, pokemon);
					}
				}
			}
		},
		flags: {},
		desc: "If any target is trapped, this target loses 1/8 of its max HP, and this Pokemon heals for the same amount.",
		shortDesc: "If any target is trapped, this target loses 1/8 of its max HP, and this Pokemon heals for the same amount.",
		name: "Soul Devourer",
		rating: 3,
		num: -77,
	},
	tacticalescape: {
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Tactical Escape');
		},
		flags: {},
		name: "Tactical Escape",
		rating: 2,
		num: -78,
		desc: "This Pokemon is immune to hazards. When this Pokemon has more than 1/2 its maximum HP and takes damage bringing it to 1/2 or less of its maximum HP, it immediately switches out to a chosen ally. This effect applies after all hits from a multi-hit move. This effect is prevented if the move had a secondary effect removed by the Sheer Force Ability. This effect applies to both direct and indirect damage, except Curse and Substitute on use, Belly Drum, Pain Split, and confusion damage.",
		shortDesc: "Immune to hazards. This Pokemon switches out when it reaches 1/2 or less of its maximum HP.",
	},
	rockypayload: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.getPseudoWeather('gravity')) {
				return this.chainModify(1.5);
			}
		},
		shortDesc: "This Pokemon's Speed is x1.5 under Gravity, and this Pokemon's offensive stat is multiplied by 1.5 while using a Rock-type attack.",
	},
	lingeringaroma: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {},
		onAnyModifyDef(def, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.side === source.side) return;
			if (!move.ruinedDef?.hasAbility('Sword of Ruin')) move.ruinedDef = abilityHolder;
			if (move.ruinedDef !== abilityHolder) return;
			this.debug('Lingering Aroma Def drop');
			return this.chainModify(0.75);
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			return this.chainModify(1.25);
		},
		desc: "Opposing Pokemon have their Defense reduced by 25%, and allies have their Attack raised by 25%.",
		shortDesc: "Opposing Pokemon have their Defense reduced by 25%, and allies have their Attack raised by 25%.",
	},
	soothingfragrance: {
		onAnyModifyAtk(atk, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (target.side === source.side) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Soothing Fragrance Atk drop');
			return this.chainModify(0.75);
		},
		onAllyModifyDefPriority: 3,
		onAllyModifyDef(def, pokemon) {
			return this.chainModify(1.25);
		},
		desc: "Opposing Pokemon have their Attack reduced by 25%, and allies have their Defense raised by 25%.",
		shortDesc: "Opposing Pokemon have their Attack reduced by 25%, and allies have their Defense raised by 25%.",
		flags: {},
		name: "Soothing Fragrance",
		rating: 2,
		num: -79,
	},
};