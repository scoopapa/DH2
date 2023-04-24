export const Abilities: {[abilityid: string]: AbilityData} = {
	soulreap: {
		onBasePower(basePower, attacker, defender, move) {
			if (defender.volatiles['partiallytrapped'] || defender.volatiles['trapped']) {
				return this.chainModify(1.5);
			}
		},
		name: "Soul Reap",
		shortDesc: "This Pokemon's attacks have 1.5x power against trapped targets.",
		rating: 4,
		num: -1,
	},
	immolation: {
		onModifySpDPriority: 6,
		onModifySpD(spd, source, target) {
			if (target.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		name: "Immolation",
		shortDesc: "This Pokemon's Special Defense is 1.5x against burned attackers.",
		rating: 4,
		num: -2,
	},
	staccato: {
		onDamagingHit(damage, target, source, move) {
			if (!this.field.isTerrain('electricterrain')) {
				this.field.setTerrain('electricterrain');
				target.addVolatile('staccato');
			}
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false;
				if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) applies = true;
				if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] ||
					this.field.getPseudoWeather('gravity')) applies = false;
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				if (!applies) return false;
				this.add('-start', pokemon, 'Staccato');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					this.add('-start', pokemon, 'Staccato');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		name: "Staccato",
		shortDesc: "If this Pokemon is attacked, it sets Electric Terrain and grounds itself.",
		rating: 4,
		num: -3,
	},
	necrodancer: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.addVolatile('necrodancer');
			}
		},
		onAfterMove(source) {
			if (source.volatiles['necrodancer']) {
				source.removeVolatile('necrodancer');
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Necro Dancer');
			},
			onModifyPriority(priority, pokemon, target, move) {
				if (move.flags['dance'] && pokemon.hasAbility('necrodancer')) return priority + 1;
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Necro Dancer', '[silent]');
			},
		},
		name: "Necro Dancer",
		shortDesc: "This Pokemon's next dance move gains +1 priority when another Pokémon faints.",
		rating: 3.5,
		num: -4,
	},
	electricfusion: {
		onAfterBoost(boost, target, source, effect) {
			if (!boost || effect.id === 'electricfusion') return;
			let activated = false;
			const electricfusionBoost: SparseBoostsTable = {};
			if (boost.spa) {
				electricfusionBoost.spd = 1 * boost.spa;
				activated = true;
			}
			if (boost.spd) {
				electricfusionBoost.spa = 1 * boost.spd;
				activated = true;
			}
			if (activated === true) {
				this.add('-ability', target, 'Electric Fusion');
				this.boost(electricfusionBoost, target, target, null, true);
			}
		},
		name: "Electric Fusion",
		shortDesc: "This Pokemon's stat changes to Sp. Atk. are shared with Sp. Def. and vice versa.",
		rating: 4,
		num: -5,
	},
	splitsystem: { //Not used in this mod, but the code can be helpful
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.type === "Dark") {
				move.category === 'Special';
			}
			if (move.type === "Steel") {
				move.category === 'Physical';
			}
		},
		name: "Split System",
		shortDesc: "This Pokemon's Dark-type moves are special and its Steel-type moves are physical.",
		rating: 2,
		num: -6,
	},
	surgesurfer: {
		onModifySpe(spe) {
			if (!this.field.isTerrain('')) {
				return this.chainModify(2);
			}
		},
		name: "Surge Surfer",
		shortDesc: "If any Terrain is active, this Pokemon's Speed is doubled.",
		rating: 3,
		num: 207,
	},
	rubberarmor: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Rubber Armor');
		},
		name: "Rubber Armor",
		shortDesc: "Negates opponent's abilities when targeted by an attacking move.",
		rating: 2,
		num: -7,
	},
	asoneglastrier: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
		},
		onStart(source) {
			this.field.setWeather('hail');
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		isPermanent: true,
		name: "As One (Glastrier)",
		shortDesc: "The combination of Ice Body and Snow Warning.",
		rating: 3.5,
		num: 266,
	},
	grimneigh: {
		onFaint(source, target) {
			for (const target of this.getAllActive()) {
				target.clearBoosts();
				this.add('-clearboost', target, '[from] ability: Grim Neigh', '[of] ' + source);
				target.cureStatus();
			}
		},
		name: "Grim Neigh",
		shortDesc: "Upon fainting, all active Pokemon have their stat changes and non-volatile status cleared.",
		rating: 3,
		num: 265,
	},
	excavate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Rock';
				move.excavateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.excavateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Excavate",
		shortDesc: "This Pokemon's Normal-type moves become Rock type and have 1.2x power.",
		rating: 4,
		num: -8,
	},
	exoskelett: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Exoskelett boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Exoskelett boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting' || move.type === 'Grass' || move.type === 'Ground') {
				this.debug('Exoskelett weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting' || move.type === 'Grass' || move.type === 'Ground') {
				this.debug('Exoskelett weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Exoskelett",
		shortDesc: "User gains STAB on Bug moves and also gains Bug-type resistances.",
		rating: 4.5,
		num: -9,
	},
	screencleaner: {
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.removeSideCondition(sideCondition);
				}
				if (pokemon.side.foe.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.foe.removeSideCondition(sideCondition);
				}
			}
			for (const pseudoWeather of ['wonderroom', 'trickroom', 'magicroom']) {
				if (pokemon.side.getPseudoWeather(pseudoWeather)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.removePseudoWeather(pseudoWeather);
				}
				if (pokemon.side.foe.getPseudoWeather(pseudoWeather)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.foe.removePseudoWeather(pseudoWeather);
				}
			}
			this.field.clearTerrain();
		},
		shortDesc: "On switch-in, the effects of Screens, Terrains and Rooms end for both sides.",
		inherit: true,
	},
	lightarmor: {
		onSourceModifyDamage(damage, source, target, move) {
			if (['Dark', 'Fairy', 'Ghost'].includes(move.type)) {
				this.debug('Light Armor neutralize');
				return this.chainModify(0.67);
			}
		},
		isUnbreakable: true,
		name: "Light Armor",
		shortDesc: "This Pokemon takes 2/3 damage from Dark-, Fairy- and Ghost-moves.",
		rating: 3,
		num: -10,
	},
	neuroforce: {
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod === 0) {
				return this.chainModify(1.1);
			}
		},
		shortDesc: "This Pokemon does 1.1x damage on neutral targets.",
		inherit: true,
	},
	battlescarred: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1});
			}
		},
		name: "Battle-Scarred",
		shortDesc: "This Pokemon's Attack is raised by 1 when it reaches 1/2 or less of its max HP.",
		rating: 2,
		num: -11,
	},
	grounding: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Grounding');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Ground' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Grounding');
				}
				return this.effectData.target;
			}
		},
		name: "Grounding",
		shortDesc: "This Pokemon draws Ground moves to itself to raise Sp. Atk by 1; Ground immunity.",
		rating: 3,
		num: -12,
	},
	snowcloak: {
		onBoost(boost, target, source, effect) {
			if(!this.field.isWeather('hail')) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Snow Cloak", "[of] " + target);
			}
		},
		name: "Snow Cloak",
		shortDesc: "If Hail is active, this Pokemon cannot have its stats lowered or lower its own stats.",
		rating: 3,
		num: 81,
	},
	plus: {
		onDamagingHit(damage, target, source, effect) {
			this.boost({spa: 1});
		},
		name: "Plus",
		shortDesc: "This Pokemon's SpA is raised by 1 stage when hit by an attack.",
		rating: 3.5,
		num: 57,
	},
	energyloop: {
		onPrepareHit(source, target, move) {
			if(move?.category !== 'Status') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		name: "Energy Loop",
		shortDesc: "This Pokemon heals 1/16 of its max HP before using an attacking move.",
		rating: 3.5,
		num: -13,
	},
	coldblooded: {
		onStart(pokemon) {
			pokemon.abilityData.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityData.choiceLock && pokemon.abilityData.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Cold-Blooded");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityData.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityData.choiceLock = move.id;
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			this.debug('Cold-Blooded SpA Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityData.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityData.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectData.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityData.choiceLock = "";
		},
		name: "Cold-Blooded",
		shortDesc: "This Pokemon's Sp. Atk. is 1.5x, but it can only select the first move it executes.",
		rating: 4.5,
		num: -14,
	},
	transience: {
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.pseudoWeather.trickroom) {
				this.debug('Transience weaken');
				return this.chainModify(0.75);
			}
		},
		name: "Transience",
		shortDesc: "Under Trick Room, this Pokemon takes 0.75x damage from attacks.",
		rating: 3.5,
		num: -15,
	},
	originorb: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
				move.ignoreImmunity['Poison'] = true;
				move.ignoreImmunity['Ground'] = true;
				move.ignoreImmunity['Ghost'] = true;
				move.ignoreImmunity['Electric'] = true;
				move.ignoreImmunity['Psychic'] = true;
				move.ignoreImmunity['Dragon'] = true;
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (
			((move.type === 'Fighting' || move.type === 'Normal') && target.hasType('Ghost')) ||
			move.type === 'Poison' && target.hasType('Steel') ||
			move.type === 'Ground' && target.hasType('Flying') ||
			move.type === 'Ghost' && target.hasType('Normal') ||
			move.type === 'Electric' && target.hasType('Ground') ||
			move.type === 'Psychic' && target.hasType('Dark') ||
			move.type === 'Dragon' && target.hasType('Fairy')
			) {
				this.debug('Origin Orb decrease');
				return this.chainModify(0.5);
			}
		},
		name: "Origin Orb",
		shortDesc: "(Semifunctional placeholder) This Pokemon deals resisted damage to immunities.",
		rating: 5,
		num: -16,
	},
	rewind: {
		onSwitchOut(pokemon) {
            this.useMove('Recycle', pokemon);
        },
		name: "Rewind",
		shortDesc: "(Semifunctional placeholder) This Pokemon restores its held item upon switching out.",
		rating: 3.5,
		num: -17,
	},
	spacedivide: {
		onAfterBoost(boost, target, source, effect) {
			if (!boost || effect.id === 'spacedivide') return;
			let activated = false;
			const spacedivideBoost: SparseBoostsTable = {};
			if (boost.spa) {
				spacedivideBoost.atk = -1 * boost.spa;
				activated = true;
			}
			if (boost.spd) {
				spacedivideBoost.def = -1 * boost.spd;
				activated = true;
			}
			if (boost.atk) {
				spacedivideBoost.spa = -1 * boost.atk;
				activated = true;
			}
			if (boost.def) {
				spacedivideBoost.spd = -1 * boost.def;
				activated = true;
			}
			if (activated === true) {
				this.add('-ability', target, 'Space Divide');
				this.boost(spacedivideBoost, target, target, null, true);
			}
		},
		name: "Space Divide",
		shortDesc: "Applies the opposite of stat changes to the opposite stat (Atk/Sp. Atk, Def/Sp. Def).",
		rating: 4,
		num: -18,
	},
	skybreach: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Water' && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Flying';
			}
		},
		name: "Sky Breach",
		shortDesc: "This Pokemon's Water-type moves become Flying-type.",
		rating: 3,
		num: -19,
	},
	windupkey: {
        onAnyFaintPriority: 1,
        onAnyFaint(target, source) {
                const boosts: SparseBoostsTable = {};
                let i: BoostName;
                for (i in source.boosts) {
                    if (source.boosts[i] < 0) {
                        boosts[i] = 0;
                    }
                }
                source.setBoost(boosts);
                this.add('-clearnegativeboost', source, '[silent]');
                this.add('-message', source.name + "'s negative stat changes were removed!");
        },
        name: "Wind-up Key",
        shortDesc: "This Pokemon's negative stat changes are removed when a Pokemon faints.",
        rating: 3,
        num: -20,
    },
	mountaineer: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Mountaineer');
				return null;
			}
		},
		isBreakable: true,
		name: "Mountaineer",
		rating: 3,
		num: -2,
	},
	zergrush: {
		onPrepareHit(source, target, move) {
			if (move.multihit) return;
			if (move.flags['contact'] && !move.isZ && !move.isMax) {
				move.multihit = 4;
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags['contact']) return this.chainModify([0x0555, 0x1000]);
		},
		name: "Zerg Rush",
		shortDesc: "This Pokemon's contact moves have 33% power but hit 4 times.",
		rating: 4,
		num: -22,
	},
	lingeringaroma: {
		onDamagingHit(damage, target, source, move) {
			const additionalBannedAbilities = ['hungerswitch', 'illusion', 'neutralizinggas', 'wonderguard'];
			if (source.getAbility().isPermanent || additionalBannedAbilities.includes(source.ability) ||
				target.volatiles['dynamax']
			) {
				return;
			}

			if (move.flags['contact']) {
				const targetCanBeSet = this.runEvent('SetAbility', target, source, this.effect, source.ability);
				if (!targetCanBeSet) return targetCanBeSet;
				const sourceAbility = source.setAbility('lingeringaroma', target);
				if (!sourceAbility) return;
				if (target.side === source.side) {
					this.add('-activate', target, 'Skill Swap', '', '', '[of] ' + source);
				} else {
					this.add('-activate', target, 'ability: Lingering Aroma', this.dex.getAbility(sourceAbility).name, 'Lingering Aroma', '[of] ' + source);
				}
				target.setAbility(sourceAbility);
			}
		},
		name: "Lingering Aroma",
		shortDesc: "Pokemon making contact with this Pokemon have their Ability swapped with this one.",
		rating: 2.5,
		num: -23,
	},
	bubblemane: {
		onAnyTryMove(target, source, effect) {
            if (['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'].includes(effect.id)) {
                this.attrLastMove('[still]');
				this.boost({spa: 1}, source);
                this.add('cant', this.effectData.target, 'ability: Bubble Mane', effect, '[of] ' + target);
                return false;
            }
        },
		name: "Bubble Mane",
		shortDesc: "If a hazard move is used on this Pokemon, it fails and this Pokemon's Special Attack is raised by 1.",
		rating: 3.5,
		num: -24,
	},
	frenziedmight: {
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return this.chainModify(0.5);
			}
		},
		name: "Frenzied Might",
		shortDesc: "This Pokemon takes halved damage from residual sources.",
		rating: 4,
		num: -25,
	},
	reflectivesurface: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				this.add('-immune', target, '[from] ability: Reflective Surface')
				if (this.runEvent('DragOut', source, target, move)){
                        source.forceSwitchFlag = true;
                    }
				return null;
			}
		},
		name: "Reflective Surface",
		shortDesc: "This Pokemon forces the attacker out if hit by a Fire move; Fire immunity.",
		rating: 3.5,
		num: -26,
	},
	iceage: {
		shortDesc: "This Pokemon takes halved damage from Ice-type attacks. Its own have 1.3x power.",
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.3);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.3);
			}
		},
		isBreakable: true,
		name: "Ice Age",
		rating: 4.5,
		num: -27,
	},
	flock: {
        onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Flock boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Flock boost');
				return this.chainModify(1.5);
			}
		},
		name: "Flock",
		shortDesc: "When this Pokemon has 1/3 HP or less, its Flying-type moves have 1.5x power.",
		num: -28,
	},
	costar: {
		/*onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Costar', 'boost');
					activated = true;
				}
				pokemon.boosts[spe] = target.boosts[spe];
			}
		},*/
		/*onBoost(boost, target, source, effect) {
			if (target.newlySwitched ) {
				const boost = boosts['spe']!;
				for (boost in target.boosts) {
					source.boosts[boost] = target.boosts[boost];
				}
				this.add('-copyboost', source, target, '[from] move: Psych Up');
			}
		},*/
		name: "Costar",
		shortDesc: "(Non-functional placeholder) On switch-in, this Pokemon copies the speed boosts of the opponent.",
		num: 294,
	},
	overthehead: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp >= pokemon.maxhp / 4) {
				return this.chainModify(0.8);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(atk, pokemon) {
			if (pokemon.hp >= pokemon.maxhp / 4) {
				return this.chainModify(0.8);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, pokemon) {
			if (pokemon.hp >= pokemon.maxhp / 4) {
				return this.chainModify(0.8);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(atk, pokemon) {
			if (pokemon.hp >= pokemon.maxhp / 4) {
				return this.chainModify(0.8);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hp >= pokemon.maxhp / 4) {
				return this.chainModify(0.8);
			}
		},
		name: "Over the Head",
		shortDesc: "When this Pokemon has more than 1/4 max HP, its stats are 0.8x.",
		rating: -1,
		num: -29,
	},
	zerotohero: {
		onTryAddVolatile(status, pokemon) {
			if (pokemon.species.id !== 'palafin') return;
            if (status.id === 'flinch' ||
				status.id === 'trapped' ||
				status.id === 'partiallytrapped' ||
				status.id === 'leechseed' ||
				status.id === 'confusion' ||
				status.id === 'curse' ||
				status.id === 'drowsy' ||
				status.id === 'taunt' ||
				status.id === 'torment' ||
				status.id === 'encore' ||
				status.id === 'disable' ||
				status.id === 'embargo' ||
				status.id === 'healblock' ||
				status.id === 'infatuation' ||
				status.id === 'nightmare' ||
				status.id === 'perishsong' ||
				status.id === 'telekinesis') {
				this.add('-immune', pokemon, '[from] ability: Zero to Hero');
				return null;
			}
        },
		onCheckShow(pokemon) {
			if (target.species.id !== 'palafin') return;
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke?.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Zero to Hero')) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('Zero to Hero')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Zero to Hero.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Cure');
			pokemon.clearStatus();

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		isPermanent: true,
		isUnbreakable: true,
		name: "Zero to Hero",
		shortDesc: "If Palafin: Non-volatile status condition are cured when switching out. Immune to volatile status.",
		rating: 3.5,
		num: 278,
	},
	moody: {
      shortDesc: "This Pokemon's lowest stat goes up by 1 every turn.",
        onResidualOrder: 26,
        onResidualSubOrder: 1,
        onResidual(pokemon) {
            if (pokemon.activeTurns) {
            let statName = 'atk';
            let worstStat = 3000; //The highest possible stat number (with boosts) is 2,676
            let s: StatNameExceptHP;
            for (s in pokemon.storedStats) {
                if (pokemon.storedStats[s] < worstStat) {
                    statName = s;
                    worstStat = pokemon.storedStats[s];
                }
            }
            this.boost({[statName]: 1}, pokemon);
            }
        },
        name: "Moody",
        rating: 3,
        num: 141,
    },
	spikyandround: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		onStart(pokemon) {
			pokemon.addVolatile('spikyandround');
		},
		condition: {
			onStart(pokemon) {
				this.effectData.lastMove = '';
				this.effectData.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
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
				if (source.hasType(move.type)) {
					const dmgMod = [0x1000, 0x1199, 0x1333, 0x14CC, 0x1666, 0x1800];
					const numConsecutive = this.effectData.numConsecutive > 5 ? 5 : this.effectData.numConsecutive;
					return this.chainModify([dmgMod[numConsecutive], 0x1000]);
				}
			},
		},
		name: "Spiky and Round",
		shortDesc: "Damage of STAB moves used on consecutive turns is increased. Max 1.5x after 5 turns. Contact: -1/8 max HP.",
		rating: 3.5,
		num: -30,
	},
	rollromp: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Roll Romp');
				}
				return null;
			}
		},
		name: "Roll Romp",
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by an Ground move; Ground immunity.",
		rating: 3,
		num: -31,
	},
	angerpoint: {
		onUpdate(target, source, move) {
			if (target.volatiles['angerpoint']) return;
			if (target.hp <= target.maxhp / 2) {
				this.add('-activate', target, 'ability: Anger Point');
				target.cureStatus();
				target.addVolatile('angerpoint');
			}
		},
		condition: {
			onSetStatus(status, target, source, effect) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Anger Point');
				}
				return false;
			},
		},
		name: "Anger Point",
		shortDesc: "When this Pokemon reaches 1/2 or less max HP, it cures its status and becomes immune to status.",
		rating: 2.5,
		num: 83,
	},
	tactician: {
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		name: "Tactician",
		shortDesc: "This Pokemon's attacks that are super effective against the target do 1.25x damage.",
		rating: 2.5,
		num: -32,
	},
	pastelveil: {
		onStart(source) {
			for (const ally of source.side.pokemon) {
				if (['psn', 'tox'].includes(ally.status)) {
					ally.cureStatus();
				}
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				this.add('-immune', target, '[from] ability: Pastel Veil');
				return null;
			}
		},
		name: "Pastel Veil",
		shortDesc: "This Pokemon is immune to Poison-type moves. On switch-in, cures its team of poison.",
		rating: 3,
		num: 257,
	},
	cannonstyle: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, item) {
			if (attacker.item === 'ironball') {
				this.debug('Cannon Style boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, item) {
			if (attacker.item === 'ironball') {
				this.debug('Cannon Style boost');
				return this.chainModify(1.5);
			}
		},
		name: "Cannon Style",
		shortDesc: "This Pokemon's Atk and SpA is 1.5x when holding an Iron Ball. Fling: 2x damage.",
		rating: 3.5,
		num: -33,
	},
	thermofist: {
		onAfterMoveSecondarySelf(pokemon, target, move) {
			const thermofistBoost: SparseBoostsTable = {};
			if (move.flags['punch']) {
				this.boost({atk: 1}, pokemon);
			} else if (!move.flags['flags']) {
				thermofistBoost.atk = -1 * pokemon.boosts['atk'];
				this.boost(thermofistBoost, pokemon, pokemon);
            }
		},
		onUpdate(pokemon) {
			const boost: SparseBoostsTable = {};
			if (pokemon.boosts['atk'] === 6) {
				pokemon.trySetStatus('brn', pokemon);
			}
		},
		name: "Thermo Fist",
		shortDesc: "+1 Atk if using a Punching move. If not: Atk reset. If +6 Atk: Burned.",
		rating: 3.5,
		num: -34,
	},
	
	//SV Ability Descriptions
	toxicdebris: {
		inherit: true,
		shortDesc: "If this Pokemon is hit by a physical attack, Toxic Spikes are set on the opposing side.",
	},
	sharpness: {
		inherit: true,
		shortDesc: "This Pokemon's slicing moves have their power multiplied by 1.5.",
	},
	hadronengine: {
		inherit: true,
		shortDesc: "On switch-in, summons Electric Terrain. During Electric Terrain, Sp. Atk is 1.3333x.",
	},
	supremeoverlord: {
		inherit: true,
		shortDesc: "This Pokemon's moves have 10% more power for each fainted ally, up to 5 allies.",
	},
	opportunist: {
		inherit: true,
		shortDesc: "When an opposing Pokemon has a stat stage raised, this Pokemon copies the effect.",
	},
	cudchew: {
		inherit: true,
		shortDesc: "If this Pokemon eats a Berry, it will eat that Berry again at the end of the next turn.",
	},
	windpower: {
		inherit: true,
		shortDesc: "This Pokemon gains the Charge effect when hit by a wind move or Tailwind begins.",
	},
	electromorphosis: {
		inherit: true,
		shortDesc: "This Pokemon gains the Charge effect when it takes a hit from an attack.",
	},
	quarkdrive: {
		inherit: true,
		shortDesc: "Electric Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
	},
	purifyingsalt: {
		inherit: true,
		shortDesc: "Ghost damage to this Pokemon dealt with a halved offensive stat; can't be statused.",
	},
};