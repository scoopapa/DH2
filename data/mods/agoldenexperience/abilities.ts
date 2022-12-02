import { consoleips } from "../../../config/config-example";

const bladeMoves = ['aerialace','airslash', 'aircutter', 'behemothblade', 'crosspoison', 'cut', 'falseswipe', 'furycutter', 'leafblade', 'nightslash', 'psychocut', 'razorshell', 'razorwind','sacredsword', 'secretsword', 'slash', 'xscissor', 'solarblade', 'ceaselessedge', 'sneakyassault', 'braveblade',];
const kickMoves = ['jumpkick', 'highjumpkick', 'megakick', 'doublekick', 'blazekick', 'tropkick', 'lowkick', 'lowsweep', 'rollingkick', 'triplekick', 'stomp', 'highhorsepower', 'tripleaxel', 'stompingtantrum', 'thunderouskick'];
const tailMoves = ['firelash', 'powerwhip', 'tailslap', 'wrap', 'constrict', 'irontail', 'dragontail', 'poisontail', 'aquatail', 'vinewhip', 'wringout',];

export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	poisonousradula: {
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && move.type ==='Poison' && !(target.getMoveHitData(move).typeMod < 0)) {
				if (move.category === 'Physical'){
					move.secondaries.push({
						chance: 100,
						boosts: {
							def: -1,
						ability: this.dex.getAbility('poisonousradula'),
						},
					})
				}else if (move.category === 'Special'){
					move.secondaries.push({
						chance: 100,
						boosts: {
							spd: -1,
						},
						ability: this.dex.getAbility('poisonousradula'),
					
					});
				}
			}
		},
		name: "Poisonous Radula",
		rating: 2,
		num: -1,
	},
	dardevil: {
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		name: "Dardevil",
		shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
		rating: 3,
		num: -2,
	},
	waterproof: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Waterproof');
				}
				return null;
			}
		},
		name: "Waterproof",
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
		shortDesc: "At 1/3 or less of max HP, Defense and Special Defense are doubled.",
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
					if (!target || !this.isAdjacent(target, pokemon) || !(target.isGrounded())) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Web Weaver', 'boost');
						activated = true;
					}
					if (target.volatiles['substitute']) {
						this.add('-immune', target);
					} else {
						//if (pokemon.isGrounded()){
							this.boost({spe: -1}, target, pokemon, null, true);
						//}
					}
				}
			}
		},
		name: "Web Weaver",
		rating: 4.5,
		num: -7,
	},
	reflex: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectData.target;
			if ((source.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Reflex', move, '[of] ' + target);
				return false;
			}
		},
		name: "Reflex",
		rating: 2.5,
		num: -8,
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
		rating: 3,
		num: -9,
	},
	doublespirit: {
		shortDesc: "Switches to Nocturnal form before using a Physical move, and to Diurnal form before using a Special move.",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Girafatak' || attacker.transformed) return;
			if (move.category === 'Status') return;
			const targetForme = (move.category === 'Special' ? 'Girafatak' : 'Girafatak-Nocturnal');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		isPermanent: true,
		name: "Double Spirit",
		rating: 4,
		num: -10,
	},
	divination: {
        shortDesc: "Reveals a random move of each adjacent opponent on entry.",
        onStart(pokemon) {
            this.add('-ability', pokemon, 'Divination');
            for (const target of pokemon.side.foe.active) {
                if (!target || target.fainted) continue;
                let potentialMoves = 0;
                for (const moveSlot of target.moveSlots) {
                    if (moveSlot.revealed) continue;
                    potentialMoves++;
                }
                let r = 0;
                if (potentialMoves) {
                    r = this.random(potentialMoves);
                }
                for (const moveSlot of target.moveSlots) {
                    if (moveSlot.revealed) continue;
                    if (r === 0) {
                        this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} knows the move ${this.dex.getMove(moveSlot.move).name}!`);
                    }
                    r--;
                    moveSlot.revealed = true;
                    return;
                }
            }
        },
        name: "Divination",
        rating: 3,
        num: -11,
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
		rating: 3.5,
		num: -12,
	},
	strangebody: {
		onEffectiveness(typeMod, target, type, move) {
            if (!target || move.category !== 'Physical') return;
            if (!target.runImmunity(move.type)) return;
            return 0;
        },
		name: "Strange Body",
		rating: 4,
		shortDesc: "This Pokemon will always take neutral damages from super effective damages from physical moves.",
		num: -13,
	},
	//unused due to deleted Fakemons
	/*shortcircuit: {
		onStart(pokemon) {
			let bp = 0;
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.getMove(moveSlot.move);
				if (move.category === 'Status') continue;
				if (move.basePower > bp) {
					bp = move.basePower;
				}
				if (pokemon.volatiles['abilitylock']) {
					this.debug('removing abilitylock: ' + pokemon.volatiles['abilitylock']);
				}
				pokemon.removeVolatile('abilitylock');
			}
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('abilitylock');
		},
		name: "Short Circuit",
		rating: 0.5,
		num: -14,
	},
	sadism: {
		shortDesc: "This Pokemon's moves will always crit on statused target.",
		onModifyCritRatio(critRatio, source, target) {
			if (target.status || target.hasAbility('comatose')) return 5;
		},
		name: "sadism",
		rating: 1.5,
		num: -15,
	},
	bipolar: {
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Bipolectric' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'icebarrier') return;
			const targetForme = (move.id === 'icebarrier' ? 'Bipolectric-Permafrost' : 'Bipolectric');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		isPermanent: true,
		name: "Bipolar",
		rating: 4,
		num: -16,
	},*/
	mistymountain: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Rock' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ice';
				move.refrigerateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.refrigerateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Misty Mountain",
		rating: 4,
		num: -17,
	},
	toymaker: {
		name: "Toymaker",
		desc: "At the end of each turn, if it doesn't have an held item, the user acquires a random item. (Leftovers, Sitrus Berry, Lum Berry, Figy Berry, Starf Berry, Choice Band, Choice Specs, Choice Scarf, Flame Orb, Para Orb, Toxic Orb, Light Ball, Iron Ball, Rocky Helmet, Heavy-Duty Boots)",
		shortDesc: "Gets a random item from a list at the end of the turn if the user doesn't already have one.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			const itemList =  ['leftovers', 'sitrusberry', 'lumberry', 'figyberry', 'starfberry', 'choiceband', 'choicespecs', 'choicescarf', 'flameorb', 'paraorb', 'toxicorb', 'lightball', 'ironball', 'rockyhelmet', 'heavydutyboots'];
			const itemIndex = this.random(itemList.length);
			const itemMade = itemList[itemIndex];
			if (pokemon.hp && !pokemon.item) {
				pokemon.setItem(itemMade);
				this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Toymaker');
			}
		},
		rating: 3,
		num: -18,
	},
	woodclearing: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isTerrain('grassyterrain')) {
				if (move.type === 'Steel') {
					this.debug('Wood Clearing boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		name: "Wood Clearing",
		shortDesc: "gets BP x1.3 on Grassy Surge.",
		rating: 2,
		num: -19,
	},
	nevergonnagiveyouup: {
		desc: "This Pokémon does not suffer the drawbacks of recoil moves and sacrificial moves.",
		shortDesc: "Ignores recoil and self-KO effects of that move.",
		onModifyMove(move) {
			if (move.recoil || move.mindBlownRecoil || (move.selfdestruct && move.selfdestruct === 'always')) {
				this.effectData.target.addVolatile('implode');
				this.effectData.target.volatiles['implode'].move = move;
				this.effectData.target.volatiles['implode'].recoil = move.recoil;
				this.effectData.target.volatiles['implode'].mindBlownRecoil = move.mindBlownRecoil;
				delete move.recoil;
				delete move.mindBlownRecoil;
				if (move.selfdestruct && move.selfdestruct === 'always') {
					this.effectData.target.volatiles['implode'].selfdestruct = move.selfdestruct;
					delete move.selfdestruct;
				}
			}
		},
		onPrepareHit(target, source, move) {
			if (!this.effectData.target.volatiles['implode']) return;
			if (this.effectData.target.volatiles['implode'].selfdestruct) this.add('-anim', target, "Breakneck Blitz", target);
		},
		condition: {
			duration: 1,
			onAfterMove(source, target, move) {
				for (const pokemon of this.getAllActive()) {
					if (pokemon === source) continue;
					/*if (!pokemon.hp) {
						source.removeVolatile('implode');
						return;
					}*/
				}
				if (this.effectData.recoil && move.totalDamage) {
					if (!this.activeMove) throw new Error("Battle.activeMove is null");
					this.damage(this.clampIntRange(Math.round(this.activeMove.totalDamage * this.effectData.recoil![0] / this.effectData.recoil![1]), 1), source, source, 'recoil');
				}
				if (this.effectData.mindBlownRecoil) {
					this.damage(Math.round(source.maxhp / 2), source, source, this.dex.getEffect('Mind Blown'), true);
				}
				if (this.effectData.selfdestruct) {
					this.faint(source, source, this.effectData.move);
				}
				source.removeVolatile('implode');
			},
		},
		name: "Never Gonna Give You Up",
		rating: 4,
		num: -20,
	},
	microclimate: {
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			// Cloud Nine does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectData.switchingIn) return;
			this.add('-ability', pokemon, 'Microclimate');
			this.effectData.switchingIn = false;
		},
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && ['raindance', 'primordialsea'].includes(attacker.effectiveWeather())) {
				this.debug('Microclimate strengthen');
				return this.chainModify(2);
			}
			else if (move.type === 'Water' && ['raindance', 'primordialsea'].includes(attacker.effectiveWeather())) {
				this.debug('Microclimate weaken');
				return this.chainModify(0.5);
			}
			else if (move.type === 'Fire' && ['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.debug('Microclimate weaken');
				return this.chainModify(0.5);
			}
			else if (move.type === 'Water' && ['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.debug('Microclimate strengthen');
				return this.chainModify(2);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && ['raindance', 'primordialsea'].includes(attacker.effectiveWeather())) {
				this.debug('Microclimate strengthen');
				return this.chainModify(2);
			}
			else if (move.type === 'Water' && ['raindance', 'primordialsea'].includes(attacker.effectiveWeather())) {
				this.debug('Microclimate weaken');
				return this.chainModify(0.5);
			}
			else if (move.type === 'Fire' && ['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.debug('Microclimate weaken');
				return this.chainModify(0.5);
			}
			else if (move.type === 'Water' && ['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.debug('Microclimate strengthen');
				return this.chainModify(2);
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (['raindance', 'primordialsea'].includes(attacker.effectiveWeather())) {
				if (move.type === 'Fire') {
					this.debug('Microclimate boost');
					return this.chainModify(2);
				}
				else if (move.type === 'Water') {
					this.debug('Microclimate boost');
					return this.chainModify(0.5);
				}
			}
			else if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				if (move.type === 'Fire') {
					this.debug('Microclimate boost');
					return this.chainModify(0.5);
				}
				else if (move.type === 'Water') {
					this.debug('Microclimate boost');
					return this.chainModify(2);
				}
			}
		},
		suppressWeather: true,
		shortDesc: "Reverses effects of Sun and Rain; negates Sand and Hail.",
		name: "Microclimate",
		rating: 2,
		num: -21,
	},
	voidheart: {
		desc: "When it KOs an opponent with a direct move, it recovers 25% of its max HP.",
		shortDesc: "Heals 25% HP on KO.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.heal(source.baseMaxhp / 4);
			}
		},
		name: "Void Heart",
		rating: 3,
		num: -22,
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
		num: -23,
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
		onAnyTryMove(target, source, effect) {
			if (['ultrasleep'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Endless Dream', move, '[of] ' + target);
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
		num: -24,
	},
	evaporate: {
		desc: "If the Pokemon or the opponent uses a Water type move, it triggers the Haze effect. Immune to Water.",
		shortDesc: "Haze when any Pokemon uses a Water move; Water immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				this.add('-immune', target, '[from] ability: Evaporate');
				return null;
			}
		},
		onAnyPrepareHit(source, target, move){
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type === 'Water') {
				this.add('-clearallboost');
				for (const pokemon of this.getAllActive()) {
					pokemon.clearBoosts();
				}
			}
		},
		name: "Evaporate",
		rating: 4,
		num: -25,
	},
	desertsong: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Ground';
			}
		},
		name: "Desert Song",
		shortDesc: "Turns sounds moves into Ground type moves.",
		rating: 1.5,
		num: -26,
	},
	sundownswitch: {
		name: "Sundown Switch",
		desc: "If Cacturne-Mega-Y: Changes to Day form before using Grass move; to Night before using Dark move.",
		num: -27,
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Cacturne' || attacker.transformed) return;
			if (move.type !== 'Grass' && move.type !== 'Dark') return;
			const targetForme = (move.type === 'Grass' ? 'Cacturne-Mega-Y-Day' : 'Cacturne-Mega-Y-Night');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			this.add('-start', attacker, 'typechange', attacker.getTypes(true).join('/'), '[silent]');
		},
		isPermanent: true,
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
		num: -28,
	},
	blindrage: {
		onDamagingHit(damage, target, source, move) {
			if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod > 0) {
			this.boost({atk: 1});
			}
		},
		name: "Blind Rage",
		shortDesc: "This Pokemon's Atk is raised by 1 when hit by a super effective attack.",
		rating: 3.5,
		num: -29,
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
		num: -30,
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
					!pokemon.side.pokemon[i].item || this.dex.getItem(pokemon.side.pokemon[i].item).zMove ||
					 this.dex.getItem(pokemon.side.pokemon[i].item).megaStone
				) continue;
				break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			const forgery = pokemon.side.pokemon[i];
			this.add('-ability', pokemon, 'Forgery');
			pokemon.item = forgery.item;
			this.add('-message', `${pokemon.name}'s Zoroarkite became a replica of the ${this.dex.getItem(forgery.item).name} belonging to ${forgery.name}!`);
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
		isPermanent: true,
		name: "Forgery",
		rating: 3,
		num: -31,
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
					moveData: this.dex.getMove(move),
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
				this.effectData.target = this.effectData.side.active[this.effectData.position];
				const data = this.effectData;
				const move = this.dex.getMove(data.move);
				this.add('-ability', this.effectData.source, 'Clairvoyance');
				if (!data.target) {
					this.hint(`${move.name} did not hit because there was no target.`);
					return;
				}

				this.add('-message', `${this.effectData.source.name}'s ${move.name} took effect!`);
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
					this.useMove(move, target, data.target);
				} else {
					const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
					if (data.source.isActive) {
						this.add('-anim', data.source, hitMove, data.target);
					}
					this.trySpreadMoveHit([data.target], data.source, hitMove);
				}
			},
		},
		name: "Clairvoyance",
		rating: 3,
		num: -32,
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
		num: -33,
	},
	boarding: {
		onBasePower(basePower, pokemon, target) {
			if (target.trapped) {
				return this.chainModify(1.25);
			}
		},
		name: "Boarding",
		shortDesc: "This Pokemon deals 1.25x damage to trapped opponents.",
		rating: 3,
		num: -34,
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
		num: -35,
	},
	chakrasurge: {
		onStart(source) {
			this.field.setTerrain('chakraterrain');
		},
		name: "Chakra Surge",
		shortDesc: "On switch-in, sets Chakra Terrain.",
		rating: 4,
		num: -36,
	},
	swordsmanship: {
		shortDesc: "Boosts the power of sword, cut, slash, and blade moves by 1.3x",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (bladeMoves.includes(move.id)) {
				return this.chainModify(1.3);
			}
		},
		name: "Swordsmanship",
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
		num: 11,
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
		num: -1233,
	},
	cosmicenergy: {
		desc: "This Pokémon can skip the charging turn of its moves.",
		shortDesc: "Skip charging turns of moves.",
		onChargeMove(pokemon, target, move) {
			this.debug('Solar Core - remove charge turn for ' + move.id);
			this.attrLastMove('[still]');
			this.addMove('-anim', pokemon, move.name, target);
			return false; // skip charge turn
		},
		name: "Cosmic Energy",
		rating: 2,
		num: -1014,
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
		num: -2,
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
		num: -1047,
	},
	icebreaker: {
		desc: "This Pokemon's Speed is x1.5 on Hail, and this Pokemon's Atk and SpA is x1.5 on Rain.",
		shortDesc: "x1.5 Speed on Hail; x1.5 Atk and SpA on Rain.",
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
		onModifySpa(spa, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Ice Breaker",
		rating: 3,
		num: -1202,
	},
	parasitism: {
		name: "Parasitism",
		desc: "When this Pokemon is KO, inflicts Yawn and Leech Seed to the opponent.",
		shortDesc: "Inflicts Yawn and Leech Seed on KO.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !target.hp) {
				if (!target.status && target.runStatusImmunity('slp')) {
					target.addVolatile('yawn');
				}
				if (!(target.hasType('Grass'))) {
					target.addVolatile('leechseed', source);
				}
			}
		},
		rating: 2.5,
		num: -1106,
	},
	explosive: {
		desc: "This Pokémon does not suffer the drawbacks of recoil moves and sacrificial moves.",
		shortDesc: "Ignores recoil and self-KO effects of that move.",
		onModifyMove(move) {
			if (move.recoil || move.mindBlownRecoil || (move.selfdestruct && move.selfdestruct === 'always')) {
				this.effectData.target.addVolatile('implode');
				this.effectData.target.volatiles['implode'].move = move;
				this.effectData.target.volatiles['implode'].recoil = move.recoil;
				this.effectData.target.volatiles['implode'].mindBlownRecoil = move.mindBlownRecoil;
				delete move.recoil;
				delete move.mindBlownRecoil;
				if (move.selfdestruct && move.selfdestruct === 'always') {
					this.effectData.target.volatiles['implode'].selfdestruct = move.selfdestruct;
					delete move.selfdestruct;
				}
			}
		},
		onPrepareHit(target, source, move) {
			if (!this.effectData.target.volatiles['implode']) return;
			if (this.effectData.target.volatiles['implode'].selfdestruct) this.add('-anim', target, "Breakneck Blitz", target);
		},
		condition: {
			duration: 1,
			onAfterMove(source, target, move) {
				for (const pokemon of this.getAllActive()) {
					if (pokemon === source) continue;
					/*if (!pokemon.hp) {
						source.removeVolatile('implode');
						return;
					}*/
				}
				if (this.effectData.recoil && move.totalDamage) {
					if (!this.activeMove) throw new Error("Battle.activeMove is null");
					this.damage(this.clampIntRange(Math.round(this.activeMove.totalDamage * this.effectData.recoil![0] / this.effectData.recoil![1]), 1), source, source, 'recoil');
				}
				if (this.effectData.mindBlownRecoil) {
					this.damage(Math.round(source.maxhp / 2), source, source, this.dex.getEffect('Mind Blown'), true);
				}
				if (this.effectData.selfdestruct) {
					this.faint(source, source, this.effectData.move);
				}
				source.removeVolatile('implode');
			},
		},
		name: "Explosive",
		rating: 4,
		num: -64,
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
		num: -1003,
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
		num: -2011,
	},
	blowhole: {
		desc: "When this Pokemon uses a Water move, it sets Rain Dance.",
		shortDesc: "Sets Rain Dance when using a Water move.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.type === 'Water' && this.field.getWeather().id !== 'raindance'){
				this.field.setWeather('raindance');
			}
		},
		name: "Blowhole",
		rating: 3,
		num: -4551,
	},
	northwind: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			let activated = false;
			if (pokemon.activeTurns) {
				for (const target of pokemon.side.foe.active) {
					if (!target || !this.isAdjacent(target, pokemon) || target.hasType('Ice')) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Web Weaver', 'boost');
						activated = true;
					}
					if (target.volatiles['substitute']) {
						this.add('-immune', target);
					} else {
						this.boost({spe: -1}, target, pokemon, null, true);
					}
				}
			}
		},
		name: "North Wind",
		shortDesc: "At the end of each turn, lowers all of the Pokemons' Speed by one stage.",
		rating: 4.5,
		num: 3,
	},
	everlastingwinter: {
		desc: "On switch-in, the weather becomes Hail. This weather remains in effect until this Ability is no longer active for any Pokémon, or the weather is changed by Delta Stream, Desolate Land or Primordial Sea. Super effective moves only inflict 3/4 damages on this Pokemon.",
		shortDesc: "On switch-in, hail begins until this Ability is not active in battle. Filter effect.",
		onStart(source) {
			if (this.field.setWeather('hail')) {
				this.add('-message', `${source.name} created an unrelenting winter storm!`);
				this.hint("Everlasting Winter doesn't wear off until the user leaves the field!");
				this.field.weatherData.duration = 0;
			} else if (this.field.isWeather('hail') && this.field.weatherData.duration !== 0) {
				this.add('-ability', source, 'Everlasting Winter');
				this.add('-message', `${source.name} created an unrelenting winter storm!`);
				this.hint("Everlasting Winter doesn't wear off until the user leaves the field!");
				this.field.weatherData.source = source;
				this.field.weatherData.duration = 0;
			}
		},
		onAnySetWeather(target, source, weather) {
			if (source.hasAbility('everlastingwinter') && weather.id === 'hail') return;
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'hail' && !strongWeathers.includes(weather.id)) return false;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.isWeather('hail') && target.getMoveHitData(move).typeMod > 0) {
				this.debug('Filter neutralize');
				return this.chainModify(0.75);
			}
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('everlastingwinter')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		name: "Everlasting Winter",
		rating: 4.5,
		num: -49,
	},  
	deltastream: {
		desc: "On switch-in, the weather becomes strong winds that remove the weaknesses of the Flying type from Flying-type Pokemon. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Desolate Land, Everlasting Winter or Primordial Sea.",
		onStart(source) {
			this.field.setWeather('deltastream');
		},
		onAnySetWeather(target, source, weather) {
			if (source.hasAbility('everlastingwinter') && weather.id === 'hail') return;
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'deltastream' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('deltastream')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		name: "Delta Stream",
		rating: 4,
		num: 191,
	},
	desolateland: {
		desc: "On switch-in, the weather becomes extremely harsh sunlight that prevents damaging Water-type moves from executing, in addition to all the effects of Sunny Day. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream, Everlasting Winter or Primordial Sea.",
		onStart(source) {
			this.field.setWeather('desolateland');
		},
		onAnySetWeather(target, source, weather) {
			if (source.hasAbility('everlastingwinter') && weather.id === 'hail') return;
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'desolateland' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('desolateland')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		name: "Desolate Land",
		rating: 4.5,
		num: 190,
	},
	primordialsea: {
		desc: "On switch-in, the weather becomes heavy rain that prevents damaging Fire-type moves from executing, in addition to all the effects of Rain Dance. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream, Desolate Land or Everlasting Winter.",
		onStart(source) {
			this.field.setWeather('primordialsea');
		},
		onAnySetWeather(target, source, weather) {
			if (source.hasAbility('everlastingwinter') && weather.id === 'hail') return;
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'primordialsea' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('primordialsea')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		name: "Primordial Sea",
		rating: 4.5,
		num: 189,
	},
	thorns: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Thorns",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
		rating: 2.5,
		num: 160,
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
		num: 11,
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
		num: 47,
	},
	invincible: {
		onModifyMovePriority: -5,
		onSetStatus(status, target, source, effect) {
			if (status) return;
			if (effect && ((effect as Move).status || effect.id === 'yawn')) {
				this.add('-activate', target, '[from] ability: Invincible');
			}
			return false;
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Invincible');
			}
		},
		name: "Invincible",
		shortDesc: "This Pokemon is immune to status condition. Immune to Intimidate.",
		rating: 3,
		num: 113,
	},
	sonar: {
        shortDesc: "Reveals a random move of each adjacent opponent when this Pokemon hits them with a Sound move.",
		onSourceHit(target, source, move) {
			if (move.flags['sound']) {
				for (const target of pokemon.side.foe.active) {
					if (!target || target.fainted) continue;
					let potentialMoves = 0;
					for (const moveSlot of target.moveSlots) {
						if (moveSlot.revealed) continue;
						potentialMoves++;
					}
					let r = 0;
					if (potentialMoves) {
						r = this.random(potentialMoves);
					}
					for (const moveSlot of target.moveSlots) {
						if (moveSlot.revealed) continue;
						if (r === 0) {
							this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} knows the move ${this.dex.getMove(moveSlot.move).name}!`);
						}
						r--;
						moveSlot.revealed = true;
						return;
					}
				}
			}
		},
        name: "Sonar",
        rating: 3,
        num: -1592,
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
		num: -1160,
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
		num: -1034,
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
		num: -1138,
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
		num: 12,
	},
	pride: {
		onSourceAfterFaint(length, target, source, effect, move) {
			if (effect && effect.effectType === 'Move' && move.category === 'Physical') {
				this.boost({atk: length}, source);
			}
			else if (effect && effect.effectType === 'Move' && move.category === 'Special') {
				this.boost({spa: length}, source);
			}
		},
		name: "Pride",
		shortDesc: "After successfully KOing a foe with a move, gets +1 in the stat of the move that KO'd target.",
		rating: 3,
		num: -1153,
	},
	hydrophilic: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Hydrophilic boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Hydrophilic boost');
				return this.chainModify(1.5);
			}
		},
		name: "Hydrophilic",
		desc: "This user's attacking stat is x1.5 when using a Water type move.",
		shortDesc: "Attacking stat x1.5 when using a Water type move.",
		rating: 3.5,
		num: -1200,
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
				ability: this.dex.getAbility('searingtouch'),
			});
		},
		name: "Searing Touch",
		shortDesc: "This Pokemon's contact moves have a 30% chance of burning.",
		rating: 2,
		num: -1143,
	},
	colorchange: {
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
		name: "Color Change",
		shortDesc: "This Pokemon's type changes to the type of a move it's hit by before being hit, unless it has the type.",
		rating: 0,
		num: 16,
	},
	iceface: {
		onStart(pokemon) {
			if (this.field.isWeather('hail') && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				target.species.id === 'eiscue' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (target.species.id !== 'eiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.species.id !== 'eiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'eiscue' && this.effectData.busted) {
				pokemon.formeChange('Eiscue-Noice', this.effect, true);
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if (this.field.isWeather('hail') && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		isPermanent: true,
		name: "Ice Face",
		rating: 3,
		num: 248,
	},
	powerspot: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectData.target) {
				this.debug('Power Spot boost');
				return this.chainModify(1.5);
			}
		},
		name: "Power Spot",
		shortDesc: "This Pokemon's allies have the power of their moves multiplied by 1.5.",
		rating: 1,
		num: 249,
	},
	arenatrap: {
		onModifyDamage(damage, source, target, move) {
			if (!(source.activeMoveActions > 1)) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		shortDesc: "This Pokemon's attacks deal x1.2 damages during 1 turn.",
		name: "Arena Trap",
		rating: 5,
		num: 71,
	},
	shadowtag: { 
		onFoeSwitchOut(source, target) {
			for (const target of source.side.foe.active) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Shadow Tag",
		shortDesc: "Opposing Pokemon loose 1/8 of their maximum HP, rounded down, when it switches out.",
		rating: 5,
		num: 23,
	},
	sandveil: {
		desc: "If Sandstorm is active, this Pokemon's defence is multiplied by 1.3. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's defence is 1.3x; immunity to Sandstorm.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.3);
			}
		},
		name: "Sand Veil",
		rating: 3,
		num: 146,
	},
	snowcloak: {
		desc: "If Hail is active, this Pokemon's defence is multiplied by 1.3. This Pokemon takes no damage from Hail.",
		shortDesc: "If Hail is active, this Pokemon's defence is 1.3x; immunity to Hail.",
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.3);
			}
		},
		name: "Snow Cloak",
		rating: 3,
		num: 146,
	},
	immunity: {
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Immunity');
			}
			return false;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				this.add('-immune', target, '[from] ability: Immunity');
				return null;
			}
		},
		name: "Immunity",
		shortDesc: "This Pokemon is immune to poison damages and Poison type moves",
		rating: 2,
		num: 17,
	},
	stickyhold: {
		//inherit: true,
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
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
		desc: "This Pokemon's moves have the Normal type, and can hit Ghost-type targets.",
		shortDesc: "Moves have Normal type; bypass Ghost immunity.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id)) {
				move.type = 'Normal';
				move.normalizeBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.normalizeBoosted) return this.chainModify(1.5);
		},
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Normal'] = true;
			}
		},
		name: "Normalize",
		rating: 0,
		num: 96,
	},
	watercompaction: {
		desc: "This Pokemon's Defense goes up 2 stages when hit by a Water-type move; Water immunity",
		shortDesc: "This Pokemon gets +2 Def if targeted by a Water type move; Water immunity.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Water Compaction');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Water') {
				this.boost({def: 2}, this.effectData.target);
			}
		},
		name: "Water Compaction",
		rating: 3,
		num: 195,
	},
	forecast: {
		onUpdate(pokemon) {
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
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					move.type = 'Fire';
					move.forecastBoosted = true;
					break;
				case 'raindance':
				case 'primordialsea':
					move.type = 'Water';
					move.forecastBoosted = true;
					break;
				case 'hail':
					move.type = 'Ice';
					move.forecastBoosted = true;
					break;
				default:
					break;
				}
				}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.forecastBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Forecast",
		shortDesc: "Castform's type and Normal type moves change to the current weather condition's type, except Sandstorm.",
		rating: 2,
		num: 59,
	},
	mimicry: {
		onStart(pokemon) {
			if (this.field.terrain) {
				pokemon.addVolatile('mimicry');
			} else {
				const types = pokemon.baseSpecies.types;
				if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				this.hint("Transform Mimicry changes you to your original un-transformed types.");
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			delete pokemon.volatiles['mimicry'];
			pokemon.addVolatile('mimicry');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['mimicry'];
		},
		condition: {
			onStart(pokemon) {
				let newType;
				switch (this.field.terrain) {
				case 'electricterrain':
					newType = 'Electric';
					break;
				case 'grassyterrain':
					newType = 'Grass';
					break;
				case 'mistyterrain':
					newType = 'Fairy';
					break;
				case 'psychicterrain':
					newType = 'Psychic';
					break;
				case 'chakraterrain':
					newType = 'Fighting';
					break;
				}
				if (!newType || pokemon.getTypes().join() === newType || !pokemon.addType(newType)) return;
				this.add('-start', pokemon, 'typeadd', newType, '[from] ability: Mimicry');
			},
			onUpdate(pokemon) {
				if (!this.field.terrain) {
					const types = pokemon.species.types;
					if (pokemon.getTypes().join() === types.join() || !pokemon.addType(types)) return;
					this.add('-activate', pokemon, 'ability: Mimicry');
					this.add('-end', pokemon, 'typeadd', '[silent]');
					pokemon.removeVolatile('mimicry');
				}
			},
		},
		name: "Mimicry",
		shortDesc: "This Pokemon's type gets a new added type to match the Terrain. Type reverts when Terrain ends.",
		rating: 0.5,
		num: 250,
	},
	disguise: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['mimikyu', 'mimikyutotem'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 16, pokemon, pokemon, this.dex.getSpecies(speciesid)); // 6.25% instead of 12.5% HP lost
			}
		},
		isPermanent: true,
		name: "Disguise",
		rating: 3.5,
		num: 209,
	},
	toxicboost: {
		shortDesc: "1.5x Attack while poisoned; Immune to poison status damage.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				return false;
			 }
		},
		name: "Toxic Boost",
		rating: 2.5,
		num: 137,
	},
	flareboost: {
		shortDesc: "1.5x SpA while burned; Immune to burn damage.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn' && move.category === 'Special') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				return false;
			 }
		},
		name: "Flare Boost",
		rating: 2,
		num: 138,
	},
	zenmode: {
		onResidualOrder: 27,
		onStart(pokemon) {
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
		condition: {
			onStart(pokemon) {
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
				} else {
					if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		isPermanent: true,
		name: "Zen Mode",
		rating: 0,
		num: 161,
	},
	transistor: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.2);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				this.add('-immune', target, '[from] ability: Transistor');
				return null;
			}
		},
		name: "Transistor",
		shortDesc: "This Pokemon gets x1.2 in its attacking stat when using an Electric move. Immune to Electric type moves.",
		rating: 3.5,
		num: 262,
	},
	dragonsmaw: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon\'s Maw boost');
				return this.chainModify(1.2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon\'s Maw boost');
				return this.chainModify(1.2);
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status' && move.type === 'Dragon') {
				this.heal(pokemon.lastDamage / 8, pokemon);
			}
		},
		name: "Dragon's Maw",
		shortDesc: "This Pokemon gets x1.2 in its attacking stat when using an Dragon move. It also heals 1/8 of the damages dealt when using a Dragon type move.",
		rating: 3.5,
		num: 263,
	},
	runaway: {
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
		name: "Run Away",
		shortDesc: "This Pokemon can't be trapped by any mean.",
		rating: 0,
		num: 50,
	},
	illuminate: {
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('illuminate - enhancing accuracy');
			return accuracy * 1.3;
		},
		name: "Illuminate",
		shortDesc: "This Pokemon's Accuracy is x1.3.",
		rating: 3,
		num: 35,
	},
	leafguard: {
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.status && ['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('leafguard');
				this.add('-activate', pokemon, 'ability: Leaf Guard');
				pokemon.cureStatus();
			}
		},
		name: "Leaf Guard",
		shortDesc: "At the end of the turn, if Sunny Day is active, this Pokemon's status is cured.",
		rating: 0.5,
		num: 102,
	},
	honeygather: {
		name: "Honey Gather",
		shortDesc: "At the end of each turn, if this Pokemon has no item, it gets Honey.",
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
		rating: 3,
		num: 118,
	},
	pastelveil: {
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
				this.add('-activate', this.effectData.target, 'ability: Pastel Veil');
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
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
		name: "Pastel Veil",
		rating: 2,
		num: 257,
	},
	defeatist: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				return this.chainModify(0.5);
			}
		},
		name: "Defeatist",
		rating: -1,
		num: 129,
	},
	ironfist: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify(1.3);
			}
		},
		name: "Iron Fist",
		rating: 3,
		num: 89,
	},
	slowstart: {
		shortDesc: "Atk, SpA halved for 5 turns. Boost all stats after 5 turns. Timer does not reset on switch.",
		onStart(pokemon) {
			if ( !pokemon.slowStartInit ) {
				pokemon.slowStartInit = true;
				pokemon.slowStartTurns = 5;
			}
			if (pokemon.slowStartTurns > 0) pokemon.addVolatile('slowstart');
		},
		onResidual(pokemon) {
			if (pokemon.slowStartTurns && pokemon.slowStartTurns > 0) pokemon.slowStartTurns--;
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['slowstart'];
			this.add('-end', pokemon, 'Slow Start', '[silent]');
		},
		condition: {
			duration: 5,
			durationCallback(pokemon) {
				return pokemon.slowStartTurns
			},
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start');
				this.boost({atk: 1});
				this.boost({def: 1});
				this.boost({spa: 1});
				this.boost({spd: 1});
				this.boost({spe: 1});
			},
		},
		name: "Slow Start",
		rating: -1,
		num: 112,
	},
	rkssystem: {
		shortDesc: "Non-STAB moves have 1.2x power.",
		onBasePowerPriority: 23,
		onBasePower (basePower, pokemon, target, move) {
			if (!pokemon.hasType(move.type)) {
				return this.chainModify(1.2);
			}
		},
		name: "RKS System",
		rating: 4,
		num: 225,
	},
	galewings: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp >= pokemon.maxhp /2) return priority + 1;
		},
		name: "Gale Wings",
		rating: 3,
		num: 177,
	},
	parentalbond: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'seismictoss', 'psywave', 'nightshade', 'sonicboom', 'dragonrage', 'superfang', 'naturesmadness', 'bide', 'counter', 'mirrorcoat', 'metalburst'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Parental Bond",
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage quartered. Doesn't affect fixed damages moves.",
		rating: 4.5,
		num: 184,
	},
	schooling: {
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
		isPermanent: true,
		name: "Schooling",
		rating: 3,
		num: 208,
	},
	grasspelt: {
		onModifySpDPriority: 6,
		onModifySpD(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
		name: "Grass Pelt",
		rating: 0.5,
		num: 179,
	},
	flowergift: {
		onStart(pokemon) {
			delete this.effectData.forme;
		},
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifyAtkPriority: 3,
		onModifyAtk(atk, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 4,
		onModifySpD(spd, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 4,
		onModifyDef(def, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (!(['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()))) {
				return this.chainModify(1.5);
			}
		},
		name: "Flower Gift",
		desc: "If user is Cherrim and Sunny Day isn't active, its Def is 1.5x. If user is Cherrim and Sunny Day is active, it and its allies Atk and Sp. Def are 1.5x. and Cherrim gains the Fire type.",
		shortDesc: "Cherrim: If Sunny Day is active, it and its allies Atk and Sp. Def are 1.5x, and Cherrim gains the Fire type; otherwise Def x1.5.",
		rating: 2,
		num: 122,
	},
	gorillatactics: {
		onStart(pokemon) {
			pokemon.addVolatile('gorillatactics');
		},
		condition: {
			onStart(pokemon) {
				this.effectData.lastMove = '';
				this.effectData.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('Gorilla Tactics')) {
					pokemon.removeVolatile('gorillatactics');
					return;
				}
				if (this.effectData.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectData.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove'] && this.effectData.lastMove !== move.id) {
					this.effectData.numConsecutive = 1;
				} else {
					this.effectData.numConsecutive = 0;
				}
				this.effectData.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [0x1000, 0x1333, 0x1666, 0x1999, 0x1CCC, 0x2000];
				const numConsecutive = this.effectData.numConsecutive > 5 ? 5 : this.effectData.numConsecutive;
				return this.chainModify([dmgMod[numConsecutive], 0x1000]);
			},
		},
		name: "Gorilla Tactics",
		shortDesc: "Damage of moves used on consecutive turns is increased. Max x2 after 5 turns.",
		rating: 4.5,
		num: 255,
	},
	quickdraw: {
		desc: "This Pokémon moves first in its priority bracket when its target has 1/3 or less of its maximum HP, rounded down. Does not affect moves that have multiple targets.",
		shortDesc: "This Pokémon moves first in its priority bracket when its target has 1/3 or less HP.",
		onUpdate(pokemon) {
			const action = this.queue.willMove(pokemon);
			if (!action) return;
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return;
			if (!action.move.spreadHit && target.hp && target.hp <= target.maxhp / 2) {
				pokemon.addVolatile('coupdegrass');
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				const action = this.queue.willMove(pokemon);
				if (action) {
					this.add('-ability', pokemon, 'Coup de Grass');
					this.add('-message', `${pokemon.name} prepared to move immediately!`);
				}
			},
			onModifyPriority(priority) {
				return priority + 0.1;
			},
		},
		name: "Quick Draw",
		rating: 3,
		num: -46,
	},
}