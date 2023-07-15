export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	// Coded
	absorptive: {
		num: 1001,
		name: "Absorptive",
		desc: "Draining moves restore 1.5x more HP than normal",
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain'];
			if (heals.includes(effect.id)) {
				return this.chainModify(1.5);
			}
		},
	},
	// Coded
	acrid: {
		num: 1002,
		name: "Acrid",
		desc: "Lowers an opponent's speed in switch-in",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Acrid', 'boost');
					activated = true;
				}
				if (target.volatiles['decoy']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
	},
	// Coded
	alchemy: {
		num: 1003,
		name: "Alchemy",
		desc: "When this pokemon attacks a Poisoned pokemon, it does a random effect from the list. (Replaces Poison with Fear, Curse, or Sleep; Inflicts the target with the Taunt, Torment, or Encore effect; Choosing 2 stats and lowering or raising each one by 1.)",
		onHit(target, source, move) {
			if (target.status !== 'psn') return;
			const r = this.random(3);
			if (r === 1) {
				r = this.random(3);
				const statuses = ['psn', 'fer', 'crs'];
				target.setStatus(statuses[r - 1]);
			} else if (r === 2) {
				r = this.random(3);
				const volatiles = ['taunt', 'torment', 'encore'];
				target.addVolatile( volatiles[ r - 1]);
			} else {
				r = this.random(5);
				const stats = ['atk', 'def', 'spa', 'spd', 'spe'];
				const stat1 = stats[r-1];
				stats.splice(r-1);
				r = this.random(4);
				const stat2 = stats[r-1];
				const boosts = [1,-1];
				const toBoost = {};
				toBoost[stat1] = boosts[this.random(2) - 1];
				toBoost[stat2] = boosts[this.random(2) - 1];
				this.boost(toBoost, target, source, move);
			}				
		}
	},
	// Coded
	allseeingeye: {
		num: 1004,
		name: "All-Seeing Eye",
		desc: "Bypasses accuracy checks, but takes 15% more damage from attacks.",
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(1.15);
		},
		onSourceAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
	},
	// Coded
	almsgiver: {
		num: 1005,
        shortDesc: "On switching out, shares a copy of its item with its replacement.",
        onSwitchOut(pokemon) {
            if (pokemon.item && pokemon.side.addSlotCondition(pokemon, 'almsgiver')) {
                Object.assign(pokemon.side.slotConditions[pokemon.position]['almsgiver'], {
                    item: pokemon.item,
                });
            }
        },
        condition: {
            onSwap(target) {
                target.side.removeSlotCondition(target, 'almsgiver'); // always remove immediately even if it doesn't activate (you can remove this if you want it to be stored like Healing Wish)
                if (!target.fainted) {
                    if (!target.item && this.effectData.item && target.setItem(this.effectData.item)) {
                        this.add('-ability', this.effectData.source, 'Almsgiver');
                        this.add('-item', target, this.dex.getItem(this.effectData.item), '[from] Ability: Almsgiver', '[of] ' + this.effectData.source);
                    }
                }
            },
        },
        name: "Almsgiver",
        rating: 3,
        num: -1,
    },
	// Coded
	amplify: {
		num: 1006,
		name: "Amplify",
		desc: "Increases power of pulse and sound moves by 1.3x.",
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound'] || move.flags['pulse']) {
				this.debug('Amplify boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
	},
	// Coded
	arbiter: { //implemented in rules rewrite
		num: 1007,
		name: "Arbiter",
		desc: "Extends the duration of Rules Rewrite by 2 turns when used by this pokemon.",
	},
	// Coded
	ataraxia: {
		num: 1008,
		name: "Ataraxia",
		desc: "Immune to moves' secondary effects",
		onModifySecondaries(secondaries) {
			this.debug('Ataraxia prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
	},
	// Coded
	berserker: {
		num: 1009,
		name: "Berserker",
		desc: "This pokemon's attack is raised by 1 if it falls below 50% HP.",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1});
			}
		},
	},
	// Coded
	bigbellied: { // implemented in Rice Field
		num: 1010,
		name: "Big Bellied",
		desc: "If rice feild is active when this pokemon switches in, it instatnly get's the healing without waiting for a countdown. Immune to rice feild damage.",
	},
	// Coded
	bingchilling: {
		num: 1011,
		name: "Bing Chilling",
		desc: "This Pokémon's Typless moves become Winter-type and gain a 1.2x. power boost. Existing Winter-type moves also get the power boost.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				"Season's Greetings", "Season's End",
			];
			if (move.type === 'Typeless' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Winter';
				move.bingChillingBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.bingChillingBoosted || move.type === "Winter") return this.chainModify([0x1333, 0x1000]);
		},
	},
	// Coded
	bipolar: {
		num: 1012,
		name: "Bipolar",
		desc: "Turns Storm-type moves into Serenity-type moves and Serenity-type moves into Storm-type moves, and boosts them by x1.2.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [

			];
			if (move.type === 'Serenity' && !noModifyType.includes(move.id) && move.category !== 'Status') {
				move.type = 'Storm';
				move.bipolarBoosted = true;
			} else if (move.type === 'Storm' && !noModifyType.includes(move.id) && move.category !== 'Status') {
				move.type = 'Serenity';
				move.bipolarBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.bipolarBoosted) return this.chainModify([0x1333, 0x1000]);
		},
	},
	// Coded
	blessed: {
		num: 1013,
		name: "Blessed",
		desc: "This Pokemon cannot be cursed, and is considered to have Serenity type as its secondary type.",
		onStart(pokemon) {
			if (pokemon.hasType('Serenity')) return false;
			if (!pokemon.addType('Serenity')) return false;
			pokemon.setType([pokemon.types[1],"Serenity"]);
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		}
	},
	// Coded
	blightboost: {
		num: 1014,
		name: "Blight Boost",
		desc: "While this Pokemon is cursed, the power of its special attacks is multiplied by 1.5 and takes no HP loss from it.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'crs' && move.category === 'Special') {
				return this.chainModify(1.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'crs') {
				return false;
			}
		},
		name: "Blight Boost",
		rating: 2,
		num: 138,
	},
	// Coded
	blindrage: {
		num: 1015,
		name: "Blind Rage",
		desc: "Hustle",
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.modify(atk, 1.5);
		},
		onSourceModifyAccuracyPriority: 7,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Physical' && typeof accuracy === 'number') {
				return accuracy * 0.8;
			}
		},
	},
	// Coded
	blossom: {
		num: 1016,
		name: "Blossom",
		desc: "The first time this pokemon uses a damaging Spring move, its attacking stats will be multiplied by 1.5x when using his next Spring moves.",
		onSourceHit(target, source, move) {
			if (!move || !target || move.type !== "Spring") return;
			if (target !== source && move.category !== 'Status') {
				source.addVolatile("blossom");
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Blossom');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Spring' && attacker.hasAbility('blossom')) {
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Spring' && attacker.hasAbility('blossom')) {
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Blossom', '[silent]');
			},
		},
	},
	// Coded
	burningrage: {
		num: 1017,
		name: "Burning Rage",
		desc: "Whenever this Pokemon has Sunburn, its highest attacking stat gains a 1.2x boost.",
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn') {
				if ((attacker.storedStats['atk'] >= attacker.storedStats['spa'] && move.category === "Physical") ||
					(attacker.storedStats['atk'] < attacker.storedStats['spa'] && move.category === "Special"))
				{
					return this.chainModify(1.2);
				}
			}
		},
	},
	// Coded
	burnout: {
		num: 1018,
		name: "Burnout",
		desc: "This Pokemon's moves that lower its stats have 1.3x power, but the amount the stat is lowered is doubled.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.self && move.self.boosts) { 
				let negBoost = false;
				for (const stat in move.self.boosts) {
					if (move.self.boosts[stat] < 0) { 
						negBoost = true;
						move.self.boosts[stat] = move.self.boosts[stat] * 2;
					}
				}
				if (negBoost) return this.chainModify(1.3);
			}
		},
	},
	// Coded
	celestial: {
		num: 1019,
		name: "Celestial",
		desc: "Status conditions are cured after 2 active turns. 1 for sleep.",
		onSetStatus(status, target, source, effect) {
			target.m.statusT = this.turn;
		},
		onUpdate(pokemon) {
			if (!pokemon.status) return; 
			const duration = this.turn - pokemon.m.statusT;
			if (duration > 2) {
				this.add('-activate', pokemon, 'ability: Celestial');
				pokemon.cureStatus();
			}
		},
	},
	// Coded
	checkmate: {
		num: 1020,
		name: "Checkmate",
		desc: "If the enemy has 33% health or less, it is trapped and cannot escape.",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hp / pokemon.baseMaxhp <= 0.33 && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (pokemon.hp / pokemon.baseMaxhp <= 0.33) {
				pokemon.maybeTrapped = true;
			}
		},
	},
	// Coded
	chill: {
		num: 1021,
		name: "Chill",
		desc: "Pokemon making contact with this pokemon have a 30% chance to be inflicted with chill.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && move.id !== 'wildpunch') {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('frz', target);
				}
			}
		},
	},
	// Not Fully Implemented (Only one mon learns it, and it's only affected move is a Tackle clone)
	climaticchange: {
		num: 1022,
		name: "Climatic Change",
		// desc: "Every Season type attack became the next one.(Spring become summer,summer become autumn,autumn become winter and winter become spring)",
		desc: "Placeholder"
	},
	// Coded
	contagious: {
		num: 1023,
		name: "Contagious",
		desc: "Contact moves used against this pokemon have a 25% chance to poison the one who made contact.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && move.id !== 'wildpunch') {
				if (this.randomChance(1, 4)) {
					source.trySetStatus('psn', target);
				}
			}
		},
	},
	// Coded
	contrary: {
		num: 1024,
		name: "Contrary",
		desc: "Inverts stat boosts",
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostName;
			for (let i in boost) {
				boost[i]! *= -1;
			}
		},
	},
	// Coded
	conversion: {
		num: 1025,
		name: "Conversion",
		desc: "This pokemon's typeless moves change to match its primary type and deal 1.2x damage.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				"Season's Greetings", "Season's End",
			];
			if (move.type === 'Typeless' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = pokemon.getTypes()[0];
				move.conversionBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.conversionBoosted || move.type === "Winter") return this.chainModify([0x1333, 0x1000]);
		},
	},
	// Coded
	counterswirl: {
		num: 1026,
		name: "Counterswirl",
		desc: "This Pokemon is immune to Storm attacks, and if it were to be hit by one, the attacker loses 1/8 of their max health.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				this.damage(source.maxhp/8, source, target, move);
				return null;
			}
		},
	},
	// Coded
	courageous: {
		num: 1027,
		name: "Courageous",
		desc: "This Pokemon is immume to fear, and its Atk and SpA cannot be lowered by other Pokemon. Gaining this Ability while under fear cures it.",
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if ((boost.atk && boost.atk < 0) || (boost.spa && boost.spa < 0)) {
				if (boost.atk) {
					delete boost.atk;
					if (!(effect as ActiveMove).secondaries) {
						this.add("-fail", target, "unboost", "Attack", "[from] ability: Courageous", "[of] " + target);
					}
				}
				if (boost.spa) {
					delete boost.spa;
					if (!(effect as ActiveMove).secondaries) {
						this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Courageous", "[of] " + target);
					}
				}
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'fer' || pokemon.status === 'fer') {
				this.add('-activate', pokemon, 'ability: Courageous');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'fer' && status.id !== 'fer') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Courageous');
			}
			return false;
		},
	},
	// Coded
	critique: {
		num: 1099,
		name: "Critique",
		desc: "Bounces back Folklore-type moves as Manmade type at 50% BP.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || move.type !== "Folklore") {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.type = "Manmade";
			newMove.basePower = newMove.basePower / 2;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || move.type !== "Folklore") {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.type = "Manmade";
			newMove.basePower = newMove.basePower / 2;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
	},
	// Coded
	dataupgrade: {
		num: 1028,
		name: "Data Upgrade",
		desc: "When hit by a Special move, raises SpD by 1, but lowers Def by 1. When hit by a Physical move, raises Def by 1, but lowers SpD by 1.",
		onDamagingHit(damage, target, source, move) {
			if (move.category === "Physical") {
				this.boost({def: 1, spd: -1});
			} else if (move.category === "Special") {
				this.boost({def: -1, spd: 1});
			}
		},
	},
	// Coded
	decay: {
		num: 1029,
		name: "Decay",
		desc: "The first time this pokemon uses a damaging Autumn move, its attacking stats will be multiplied by 1.5x when using his next Autumn moves.",
		onSourceHit(target, source, move) {
			if (!move || !target || move.type !== "Autumn") return;
			if (target !== source && move.category !== 'Status') {
				source.addVolatile("decay");
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Decay');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Autumn' && attacker.hasAbility('decay')) {
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Autumn' && attacker.hasAbility('decay')) {
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Decay', '[silent]');
			},
		},
	},
	// Coded
	equivalentexchange: {
		num: 1030,
		name: "Equivalent Exchange",
		desc: "When this Pokémon's Attack is modified, its Special Attack is modified in the opposite way, and vice versa. The same is true for its Defense and Special Defense.",
		onBoost(boost, target, source, effect) {
			let invBoost = {};
			let swapBoost = {atk: 'spa', spa: 'atk', def: 'spd', spd: 'def'};
			for (let i in swapBoost) {
				if (boost[i]) {
					invBoost[swapBoost[i]] = boost[i] * -1;
				}
			}
			for (let i in invBoost) {
				if (!swapBoost[i]) continue;
				if (!boost[i]) boost[i] = 0;
				boost[i] += invBoost[i];
			}
		},
	},
	// Coded
	farreach: {
		num: 1031,
		name: "Far Reach",
		desc: "This pokemon's non-contact moves to 1.2x damage.",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (!move.flags['contact']) {
				return this.chainModify(1.2);
			}
		},
	},
	// Coded
	fluffyfloat: {
		num: 1032,
		name: "Fluffy Float",
		desc: "If Cotton Field is active, this Pokemon's Defense and Speed are boosted by x1.5. This Pokemon takes no damage from Cotton Field.",
		onModifyDef(pokemon) {
			if (this.field.isTerrain('cottonfield')) return this.chainModify(1.5);
		},
		onModifySpe(pokemon) {
			if (this.field.isTerrain('cottonfield')) return this.chainModify(1.5);
		},
	},
	// Coded
	glide: {
		num: 1033,
		name: "Glide",
		desc: "This pokemon has it's speed raised by 1 when a Pokemon on the field uses a sky move.",
		onAnyHit(target, source, move) {
			if (move.type !== "Sky") return;
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon.hasAbility("Glide")) continue;
					// if (!pokemon.m.glideBoost || pokemon.m.glideBoost !== this.turn) {
						// pokemon.m.glideBoost = this.turn;
					this.boost({spe:1}, pokemon);
					// }
				}
			}
		}
	},
	// Coded
	hotfeet: {
		num: 1034,
		name: "Hot Feet",
		desc: "If this Pokemon is sunburned, its Speed is multiplied by 2",
		onModifySpe(spe, pokemon) {
			if (pokemon.status === 'brn') {
				return this.chainModify(2);
			}
		},
	},
	// Coded
	ignorance: {
		num: 1035,
		name: "Ignorance",
		desc: "All Pokemon on the field ignore each others' stat changes.",
		onAnyModifyBoost(boosts, pokemon) {
			boosts['def'] = 0;
			boosts['spd'] = 0;
			boosts['evasion'] = 0;
			boosts['atk'] = 0;
			boosts['spa'] = 0;
			boosts['accuracy'] = 0;
		},
	},
	// Coded 
	infinitescaling: {
		num: 1036,
		name: "Infinite Scaling",
		desc: "The damage of this Pokémon increases infinitely. (Turn 1: 0.8x, Turn 2: 0.9x, Turn 3: 1x, Turn 4: 1.1x, etc.) Resets upon switching out.",
		onModifyDamage(damage, source, target, move) {
			let damageMod = 0.8;
			damageMod = damageMod + (source.activeTurns * 0.1);
			return this.chainModify(damageMod);
		},
	},
	// Not Fully Implemented (only pokemon with this ability has no moves (and isn't manmade or storm type)
	internetrage: {
		num: 1037,
		name: "Internet Rage",
		desc: "(Placeholder) This Pokemon's Manmade-type moves become Storm-type, and Storm-type moves become Manmade-type.",
	},
	// Coded
	jacko: {
		num: 1038,
		name: "Jack-O'",
		desc: "1.3x Atk and SpA in Pumpkin Field. Immune to Pumpkin Field",
		onModifyDamage(damage, source, target, move) {
			if (this.field.isTerrain("pumpkinfield")) return this.chainModify([0x14CC, 0x1000]);
		},
	},
	// Coded
	lesspell: {
		num: 1039,
		name: "Lesspell",
		desc: "Lowers opposing Pokemon Special Attack by 1 stage when switching in.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Lesspell', 'boost');
					activated = true;
				}
				if (target.volatiles['decoy']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
	},
	// Coded
	lifecycle: {
		name: "Life Cycle",
		onResidual(pokemon) {
			if (!pokemon.activeTurns) return;
			const seasons = ["Spring", "Summer", "Autumn", "Winter"];
			let types = [...pokemon.getTypes(true)];
			for (const i in types) {
				if (seasons.includes(types[i])) { 
					types[i] = seasons[(seasons.indexOf(types[i]) + 1) % 4];
				}
			}
			pokemon.setType(types);
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[from] ability: Life Cycle');
		},
		onSwitchIn(pokemon) {
			pokemon.setType(["Spring", "Sky"]);
		},
	},
	// Coded
	linger: {
		num: 1040,
		name: "Linger",
		desc: "The first time this pokemon uses a damaging Winter move, its attacking stats will be multiplied by 1.5x when using his next Winter moves.",
		onSourceHit(target, source, move) {
			if (!move || !target || move.type !== "Winter") return;
			if (target !== source && move.category !== 'Status') {
				source.addVolatile("linger");
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Linger');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Winter' && attacker.hasAbility('linger')) {
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Winter' && attacker.hasAbility('linger')) {
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Linger', '[silent]');
			},
		},
	},
	// Coded
	magimorph: {
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Salamoon' || attacker.transformed) return;
			const targetForme = (move.category === 'Status' ? 'Salamoon' : 'Salamoon-Allegro');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		isPermanent: true,
		name: "Magi-Morph",
		rating: 4,
	},
	// Not Used
	// megatonburst: {
		// num: 1041,
		// name: "Megaton Burst",
		// desc: "This Pokemon uses a 60 BP physical Earth-type move (uses the user's Attack stat) after using a Sound-based move.",
	// },
	// Coded
	metalcoat: {
		num: 1042,
		name: "Metal Coat",
		desc: "This pokemon is immune to moves that are 60 bp or lower.",
		onTryHit(pokemon, target, move) {
			if (move.basePower <= 60 && move.category !== "Status") {
				this.add('-immune', pokemon, '[from] ability: Metal Coat');
				return null;
			}
		},
	},
	// Coded
	modernadaptation: {
		num: 1043,
		name: "Modern Adaptation",
		desc: "Transform any Folklore type move used by the pokemon into Manmade type.",
		onModifyType(move, pokemon) {
			if (move.type === 'Folklore') {
				move.type = 'Manmade';
			}
		},
	},
	// Coded
	nanobarrier: {
		num: 1044,
		name: "Nanobarrier",
		desc: "This pokemon receives 3/4 damage from neutrally effective attacks.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod === 0) {
				this.debug('Filter neutralize');
				return this.chainModify(0.75);
			}
		},
	},
	// Coded
	necromancer: {
		num: 1045,
		name: "Necromancer",
		desc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Folklore-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Folklore') {
				// this.debug('Dragon\'s Maw boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Folklore') {
				// this.debug('Dragon\'s Maw boost');
				return this.chainModify(1.5);
			}
		},
	},
	// Coded
	nocturnal: {
		num: 1046,
		name: "Nocturnal",
		desc: "Immune to Night-type moves, raises Spe by  1 if hit by one",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Night') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Nocturnal');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Night') {
				this.boost({spe: 1}, this.effectData.target);
			}
		},
	},
	// Coded
	nonbeliever: {
		num: 1047,
		name: "Non-Believer",
		desc: "This Pokemon is immune to Folklore-type moves",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Folklore') {
				this.add('-immune', target, '[from] ability: Non-Believer');
				return null;
			}
		},
	},
	// Coded
	petalbody: {
		num: 1048,
		name: "Petal Body",
		desc: "If Rose Field is active, this Pokemon restores 1/8 of its maximum HP, rounded down, at the end of each turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isTerrain('rosefield')) this.heal(pokemon.baseMaxhp / 8);
		}
	},
	// Coded and Tested
	prudentplow: {
		num: 1049,
		name: "Prudent Plow",
		desc: "Autumn-type moves become two-hit moves. 2nd hit of attacking moves has 1/4 damage.",
		onPrepareHit(source, target, move) {
			if (move.selfdestruct || move.multihit) return;
			if (['beachball', 'boulder'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) {
				return this.chainModify(0.25);
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const move = this.activeMove;
			if (effect.id !== 'drain' && move && move.multihitType === 'parentalbond' && move.hit === 2) {
				return this.chainModify(0.25);
			}
		},
	},
	// Coded
	ragingsea: {
		num: 1050,
		name: "Raging Sea",
		desc: "Increases the power of Sea-type moves by up to 40% the lower its HP gets.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Sea') {
				let mod = 1 + (.4 * (1 - (attacker.hp / attacker.maxhp)));
				if (attacker.hp === 1) mod = 1.4;
				return this.chainModify(mod);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Sea') {
				let mod = 1 + (.4 * (1 - (attacker.hp / attacker.maxhp)));
				if (attacker.hp === 1) mod = 1.4;
				return this.chainModify(mod);
			}
		},
	},
	// Coded
	rainbringer: {
		num: 1051,
		name: "Rainbringer",
		desc: "Sets weather to Rain for the next 5 turns. Spring and Sea deals 1.3x damage.",
		onStart(source) {
			this.field.setWeather('rainyseason');
		},
	},
	// Coded
	reality: {
		num: 1052,
		name: "Reality",
		desc: "Immune to Folklore-type, boosts its Attack by 1 stage if hit by Folklore-type moves.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Folklore') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Reality');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Folklore') {
				this.boost({atk: 1}, this.effectData.target);
			}
		},
	},
	rebirth: {
		num: 1152,
		name: "Rebirth",
		desc: "Fully resets pokemon when an attack would KO it.",
		onUpdate(pokemon) {
			if (!pokemon.m.rebirthFlag) return;
			pokemon.heal(pokemon.maxhp);
			pokemon.setStatus('');
			pokemon.clearBoosts();
			for (const moveSlot of pokemon.moveSlots) {
				moveSlot.pp = moveSlot.maxpp;
			}
			const negativeVolatiles = ['energysiphon', 'tantalize', 'shroomspores', 'partiallytrapped', 'rabidmaw', 'pollinate', 'pheromonalgas', 
									'moonblade', 'mindcleansing', 'torment', 'Deafened', 'hypnotize', 'blasphemy', 'void', 'technocut', 
									'temporarytrap', 'hitodama'
			];
			for (const vol of negativeVolatiles) {
				if (pokemon.volatiles[vol]) pokemon.removeVolatile('vol');
			}
			this.add('-heal', pokemon, pokemon.getHealth, "[from] ability: Rebirth");
			pokemon.m.reborn = true;
			pokemon.m.rebirthFlag = false;
		},
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (damage >= target.hp && effect && effect.effectType === 'Move' && !target.m.rebirthFlag && !target.m.reborn) {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
				!target.m.rebirthFlag;
			}
		},
	},
	// Coded
	reaper: {
		num: 1053,
		name: "Reaper",
		desc: "This Pokemon's Autumn-type moves do 1.2x damage and restore the user 50% of the damage dealt.",
		onModifyMove(move) {
			if (move.drain || move.type !== "Autumn") return;
			move.drain = [1, 2];
		},
	},
	// Coded
	regenerator: {
		num: 1054,
		name: "Regenerator",
		desc: "This pokemon has 1/4 of its max hp, rounded down, restored when it switches out",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 4);
		},
	},
	// Coded
	rigormortis: {
		num: 1055,
		name: "Rigor Mortis",
		desc: "If the user takes a physical hit, it gains +1 defense stage.",
		onDamagingHit(damage, target, source, move) {
			if (move.category === "Physical") {
				this.boost({def: 1});
			}
		},
	},
	// Coded
	sacrificer: {
		num: 1056,
		name: "Sacrificer",
		desc: "This Pokemon loses 1/3 of its max HP when it switches out. Next Pokemon gets those HP.",
		onSwitchOut(pokemon) {
            if (pokemon.side.addSlotCondition(pokemon, 'sacrificer')) {
				const hp = pokemon.baseMaxhp / 3;
                Object.assign(pokemon.side.slotConditions[pokemon.position]['sacrificer'], {
                    hp: hp,
                });
				this.damage( hp, pokemon, pokemon);
            }
        },
        condition: {
            onSwap(target) {
                target.side.removeSlotCondition(target, 'sacrificer'); // always remove immediately even if it doesn't activate (you can remove this if you want it to be stored like Healing Wish)
                if (!target.fainted) {
                    if (this.heal(this.effectData.hp, target, this.effectData.source)) {
                        this.add('-ability', this.effectData.source, 'Sacrificer');
                    }
                }
            },
        },
	},
	// Coded
	scavenge: {
		num: 1057,
		name: "Scavenge",
		desc: "This Pokemon restores 1/3 of its max health if another Pokemon on the field faints.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add('-activate', source, 'ability: Scavenge'); 
				this.heal(source.baseMaxhp / 3, source, source, effect);
			}
		},
	},
	// Coded
	shatter: {
		num: 1058,
		name: "Shatter",
		desc: "This pokemon's attacks are guaranteed to be critical hits if the opponent is statused.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && target.status) return 5;
		},
	},
	// Coded
	shine: {
		num: 1059,
		name: "Shine",
		desc: "The first time this pokemon uses a damaging Summer move, its attacking stats will be multiplied by 1.5x when using his next Summer moves.",
		onSourceHit(target, source, move) {
			if (!move || !target || move.type !== "Summer") return;
			if (target !== source && move.category !== 'Status') {
				source.addVolatile("shine");
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Shine');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Summer' && attacker.hasAbility('shine')) {
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Summer' && attacker.hasAbility('shine')) {
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Shine', '[silent]');
			},
		},
	},
	// Coded
	smite: {
		num: 1060,
		name: "Smite",
		desc: "Moves' power is boosted by 1.3x if the target is below half health",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (defender.hp / defender.baseMaxhp < 0.5) {
				return this.chainModify(1.3);
			}
		},
	},
	// Coded
	snowbringer: {
		num: 1061,
		name: "Snowbringer",
		desc: "Sets weather to Snow for the next 5 turns. Winter deals 1.5x damage, Summer deals 0.5x",
		onStart(source) {
			this.field.setWeather('snowfall');
		},
	},
	// Coded
	spectralshifter: {
		num: 1062,
		name: "Spectral Shifter",
		desc: "While this Pokemon is active, opposing Pokemons' stat raises will be lowers instead, and vice versa.",
		onFoeBoost(boost, target, source, effect) {
			let i: BoostName;
			for (let i in boost) {
				boost[i]! *= -1;
			}
		},
	},
	// Coded
	starlite: {
		num: 1100,
		name: "Starlite",
		desc: "This pokemon takes half damage from Summer type attacks.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Summer') {
				return this.chainModify(0.5);
			}
		},
	},
	// Coded
	steadfast: { // implemented in conditions.ts
		num: 1063,
		name: "Steadfast",
		desc: "Inverts Sunburn and Chill effects on the user.",
	},
	// Coded
	stoneskin: {
		num: 1064,
		name: "Stone Skin",
		desc: "User takes 25% less damage from contact moves.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['contact'] && move.id !== 'wildpunch') return this.chainModify(0.75);
		},
	},
	// Coded
	stormwatch: {
		num: 1065,
		name: "Storm Watch",
		desc: "Immunity to Storm, being targeted by a Storm move will boost both defenses by 1 stage.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Storm') {
				if (!this.boost({def: 1, spd: 1})) {
					this.add('-immune', target, '[from] ability: Storm Watch');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Storm') {
				this.boost({def: 1, spd: 1}, this.effectData.target);
			}
		},
	},
	// Coded and Tested
	strategicretreat: {
		num: 1066,
		name: "Strategic Retreat",
		desc: "emergency exit but activates in 25% of max HP and heals 25% of max HP on switch",
		onUpdate(pokemon){
			if (pokemon.hp >= pokemon.maxhp / 4) {
				pokemon.m.SRActive = true;
			}
			if (pokemon.hp < pokemon.maxhp / 4 && pokemon.m.SRActive) {
				if (!this.canSwitch(pokemon.side) || pokemon.forceSwitchFlag || pokemon.switchFlag) return;
				for (const side of this.sides) {
					for (const active of side.active) {
						active.switchFlag = false;
					}
				}
				pokemon.m.SRActive = false;
				this.add('-activate', pokemon, 'ability: Strategic Retreat');
				pokemon.switchFlag = true;
			}
		},
		onSwitchOut(pokemon) {
			if (pokemon.hp < pokemon.maxhp / 4) pokemon.heal(pokemon.baseMaxhp / 4);
		},
	},
	// Coded
	subrosa: {
		num: 1067,
		name: "Sub Rosa",
		desc: "This Pokemon is unharmed by Rose Field. This Pokemon restores 1/8 of its maximum HP, rounded down, if any Pokemon (including itself) switches into Rose Field.",
	},
	// Coded
	sunbringer: {
		num: 1068,
		name: "Sunbringer",
		desc: "Sets weather to Sun for the next 5 turns. Summer deals 1.5x damage, Winter deals 0.5x",
		onStart(source) {
			this.field.setWeather('highnoon');
		},
	},
	// Not Used
	// supersapience: {
		// num: 1069,
		// name: "Super Sapience",
		// desc: "Boosts moves that start with S by 1.5x. Moves that start with any other letter receive a 0.5x  decrease in power.",
	// },
	// Coded
	thickheaded: {
		num: 1070,
		name: "Thick Headed",
		desc: "When this pokemon makes contact with the foe, nullifies their type-based immunities.",
		onFoeDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				target.addVolatile('thickheaded');
			}
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Thick Headed');
			},
			onNegateImmunity(pokemon, type) {
				return false;
			},
		}
	},
	// Coded
	thickskin: {// implemented in conditions.ts
		num: 1071,
		name: "Thick Skin",
		desc: "This Pokemon is immune to the negative effects of Sunburn, and its defenses are 1.5x if it is Sunburned.",
	},
	// Coded
	toughclaws: {
		num: 1072,
		name: "Tough Claws",
		desc: "Contact moves are boosted by 1.3x",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
	},
	// Not Fully Implemented (only used on a primarily Folklore type)
	transcription: {
		num: 1073,
		name: "Transcription",
		desc: "(Placeholder) First type and matching moves become Folklore and get a 10% boost.",
	},
	// Coded
	tropicalspirit: {
		num: 1074,
		name: "Tropical Spirit",
		desc: "This Pokemon's attacks are critical hits if the target is sunburnt. Winter-type moves against this Pokemon deal half damage.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Winter') {
				return this.chainModify(0.5);
			}
		},
		onModifyCritRatio(critRatio, source, target) {
			if (target && target.status === 'brn') return 5;
		},
	},
	// Coded
	unstable: {
		num: 1075,
		name: "Unstable",
		desc: "The pokemon is immune to serenity move.But the fear status is doubled if applied on the pokemon with the ability.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Storm') {
				this.add('-immune', target, '[from] ability: Storm Watch');
				return null;
			}
		},
	},
	// Coded
	wavecrasher: {
		num: 1076,
		name: "Wave Crasher",
		desc: "After another Pokemon uses a Sea-type move, the user uses the same move. Sea-type moves against this Pokemon deal half damage. Other Pokemon cannot force the user to switch out.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Sea') {
				return this.chainModify(0.5);
			}
		},
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Suction Cups');
			return null;
		},
	},
	// Coded
	wintercoat: {
		num: 1077,
		name: "Winter Coat",
		desc: "This Pokemon is immune to Winter-type moves and is immune to chill. Gaining this Ability while under chill cures it.",
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'frz') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Winter Coat');
			}
			return false;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Winter') {
				this.add('-immune', target, '[from] ability: Storm Watch');
				return null;
			}
		},
	},
};