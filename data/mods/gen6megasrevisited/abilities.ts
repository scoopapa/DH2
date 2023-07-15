export const Abilities: {[k: string]: ModdedAbilityData} = {
// Old Abilities
	aerilate: {
		inherit: true,
		desc: "This Pokemon's Normal-type moves become Flying-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Flying type and have 1.3x power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.aerilateBoosted /* && !target.hasAbility('neutralizinggas') */) return this.chainModify([0x14CD, 0x1000]);
		},
		rating: 4.5,
	},
	aftermath: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !target.hp) {
				this.damage(source.baseMaxhp / 4, source, target, null, true);
			}
		},
	},
	anticipation: {
		inherit: true,
		desc: "On switch-in, this Pokemon is alerted if any opposing Pokemon has an attack that is super effective against this Pokemon, or an OHKO move. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types, Hidden Power counts as its determined type, and Judgment, Natural Gift, Techno Blast, and Weather Ball are considered Normal-type moves.",
	},
	contrary: {
		inherit: true,
		desc: "If this Pokemon has a stat stage raised it is lowered instead, and vice versa.",
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower' /* && !this.field.getPseudoWeather('neutralizinggas') */) return;
			let i: BoostName;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
	},
	damp: {
		inherit: true,
		desc: "While this Pokemon is active, Explosion, Self-Destruct, and the Aftermath Ability are prevented from having an effect.",
		shortDesc: "Prevents Explosion/Self-Destruct/Aftermath while this Pokemon is active.",
	},
	/*
	galewings: {
		inherit: true,
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
		rating: 4,
	},
	*/
	galewings: {
		// for ngas
		inherit: true,
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('neutralizinggas') && poke.side.id !== pokemon.side.id &&
					!poke.volatiles['gastroacid'] && !poke.transformed) {
					return;
				}
			}
			if (move?.type === 'Flying') return priority + 1;
		},
	},
	infiltrator: {
		inherit: true,
		desc: "This Pokemon's moves ignore substitutes and the opposing side's Reflect, Light Screen, Safeguard, and Mist.",
		shortDesc: "Moves ignore substitutes and the foe's Reflect, Light Screen, Safeguard, and Mist.",
	},
	ironbarbs: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target, null, true);
			}
		},
	},
	liquidooze: {
		inherit: true,
		onSourceTryHeal(damage, target, source, effect) {
			this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			const canOoze = ['drain', 'leechseed'];
			if (canOoze.includes(effect.id)) {
				this.damage(damage, null, null, null, true);
				return 0;
			}
		},
	},
	magicguard: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') return false;
		},
	},
	multitype: {
		inherit: true,
		shortDesc: "If this Pokemon is an Arceus, its type changes to match its held Plate.",
	},
	mummy: {
		inherit: true,
		desc: "Pokemon making contact with this Pokemon have their Ability changed to Mummy. Does not affect the Multitype or Stance Change Abilities.",
	},
	normalize: {
		inherit: true,
		desc: "This Pokemon's moves are changed to be Normal type. This effect comes before other effects that change a move's type.",
		shortDesc: "This Pokemon's moves are changed to be Normal type.",
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.id !== 'struggle' && this.dex.moves.get(move.id).type !== 'Normal' /* && !this.field.getPseudoWeather('neutralizinggas') */) {
				move.type = 'Normal';
			}
		},
		rating: -1,
	},
	parentalbond: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'seismictoss', 'psywave', 'nightshade', 'sonicboom', 'dragonrage', 'superfang', 'naturesmadness', 'bide', 'counter', 'mirrorcoat', 'metalburst'].includes(move.id)) return;
			if (!move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.5);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Parental Bond",
		rating: 4.5,
		num: 184,
	},
	pixilate: {
		inherit: true,
		desc: "This Pokemon's Normal-type moves become Fairy-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Fairy type and have 1.3x power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.pixilateBoosted /* && !target.hasAbility('neutralizinggas') */) return this.chainModify([0x14CD, 0x1000]);
		},
		rating: 4.5,
	},
	prankster: {
		// for ngas
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('neutralizinggas') && poke.side.id !== pokemon.side.id &&
					!poke.volatiles['gastroacid'] && !poke.transformed) {
					return;
				}
			}
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
	},
	refrigerate: {
		inherit: true,
		desc: "This Pokemon's Normal-type moves become Ice-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ice type and have 1.3x power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.refrigerateBoosted /* && !target.hasAbility('neutralizinggas') */) return this.chainModify([0x14CD, 0x1000]);
		},
		rating: 4.5,
	},
	roughskin: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target, null, true);
			}
		},
	},
	simple: {
		inherit: true,
		desc: "When this Pokemon's stat stages are raised or lowered, the effect is doubled instead.",
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower' /* && !this.field.getPseudoWeather('neutralizinggas') */) return;
			let i: BoostName;
			for (i in boost) {
				boost[i]! *= 2;
			}
		},
	},
	stancechange: {
		inherit: true,
		onBeforeMovePriority: 11,
	},
	weakarmor: {
		inherit: true,
		desc: "If a physical attack hits this Pokemon, its Defense is lowered by 1 stage and its Speed is raised by 1 stage.",
		shortDesc: "If a physical attack hits this Pokemon, Defense is lowered by 1, Speed is raised by 1.",
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 1}, target, target);
			}
		},
		rating: 0.5,
	},
	zenmode: {
		inherit: true,
		desc: "If this Pokemon is a Darmanitan, it changes to Zen Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode. If Darmanitan loses this Ability while in Zen Mode, it reverts to Standard Mode immediately.",
	},
	
// New Abilities	
	merciless: {
		shortDesc: "This Pokemon's attacks are critical hits if the target is statused.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox', 'brn', 'frz', 'slp', 'par'].includes(target.status) /* && !target.hasAbility('neutralizinggas') */) return 5;
		},
		name: "Merciless",
		rating: 1.5,
		num: 196,
		gen: 6,
	},
	pocketdimension: {
	  shortDesc: "This Pokemon switches out after using a status move.",
	  onModifyMove(move, pokemon) {
			if (move.category === 'Status' /* && !this.field.getPseudoWeather('neutralizinggas') */) {
			  move.selfSwitch = true;
			  this.add('-ability', pokemon, 'Pocket Dimension');
			}
	  },
	  name: "Pocket Dimension",
	  rating: 4.5,
    },
	grassysurge: {
		onStart(source) {
			this.field.setTerrain('grassyterrain');
		},
		name: "Grassy Surge",
		rating: 4,
		num: 229,
		gen: 6,
	},
	mistysurge: {
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
		name: "Misty Surge",
		rating: 3.5,
		num: 228,
		gen: 6,
	},
	neutralizinggas: {
		inherit: true,
		// Ability suppression cancelled in scripts.ts
		// new Ability suppression implemented in scripts.ts
		onPreStart(pokemon) {},
		onEnd(source) {},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Neutralizing Gas');
		},
		// onModifyPriority implemented in relevant abilities
		onFoeBeforeMovePriority: 13,
		onFoeBeforeMove(attacker, defender, move) {
			attacker.addVolatile('neutralizinggas');
		},
		condition: {
			onAfterMove(pokemon) {
				pokemon.removeVolatile('neutralizinggas');
			},
		},
		desc: "While this Pokemon is active, opposing Pokemon's moves and their effects ignore its own Ability. Does not affect the As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, or Zen Mode Abilities.",
		shortDesc: "While this Pokemon is active, opposing Pokemon's Ability has no effect when it uses moves.",
		gen: 6,
		num: 256,
	},
	nostalgiatrip: {
      shortDesc: "This Pokemon's moves have the damage categories they would have in Gen 3. Fairy-type moves are Special.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Nostalgia Trip');
			this.add('-message', `This Pokemon is experiencing a nostalgia trip!`);
		},
		onModifyMovePriority: 8,
		onModifyMove(move, pokemon) {
			if ((move.type === 'Fire' || move.type === 'Water' || move.type === 'Grass' || move.type === 'Electric' || move.type === 'Dark' || move.type === 'Psychic' || move.type === 'Dragon' || move.type === 'Fairy')  && move.category === 'Physical') move.category = 'Special';
			if ((move.type === 'Normal' || move.type === 'Fighting' || move.type === 'Flying' || move.type === 'Ground' || move.type === 'Rock' || move.type === 'Bug' || move.type === 'Ghost' || move.type === 'Poison' || move.type === 'Steel')  && move.category === 'Special') move.category = 'Physical';
		},
		name: "Nostalgia Trip",
		rating: 4,
		gen: 6,
	},
	weatherreport: {
      onBeforeMovePriority: 0.5,
		onBeforeMove(target, source, move) {
          if (move.type === 'Fire') {
				this.field.setWeather('sunnyday');
          }
          else if (move.type === 'Water') {
				this.field.setWeather('raindance');
          }
      },
		name: "Weather Report",
		shortDesc: "Before using a Water or Fire-type move, this Pokemon sets Rain Dance or Sunny Day respectively.",
		rating: 4,
		gen: 6,
	},	
	armortail: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const armortailHolder = this.effectState.target;
			if ((source.side === armortailHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', armortailHolder, 'ability: Armor Tail', move, '[of] ' + target);
				return false;
			}
		},
		name: "Armor Tail",
    	shortDesc: "While this Pokemon is active, allies are protected from opposing priority moves.",
		rating: 2.5,
		gen: 6,
	},
	brainpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Brain Power",
    	shortDesc: "This Pokemon's Special Attack is doubled.",
		rating: 5,
	},
	neuroforce: {
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		name: "Neuroforce",
		rating: 2.5,
		num: 233,
		gen: 6,
	},
	bugzapper: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Bug') {
				if (!source.addVolatile('trapped', target, move, 'trapper')) {
					this.add('-immune', target, '[from] ability: Bug Zapper');
				}
				return null;
			}
		},
		name: "Bug Zapper",
    	shortDesc: "This Pokemon is immune to Bug-type moves and traps the foe it hit by one.",
		rating: 5,
	},
	exoskeleton: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Physical') {
				return this.chainModify(0.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && (effect.id === 'stealthrock' || effect.id === 'spikes')) {
				return damage / 2;
			}
		},
		name: "Exoskeleton",
    	shortDesc: "This Pokemon takes halved damage from hazards and physical moves.",
		rating: 4,
	},
	icescales: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		name: "Ice Scales",
		rating: 4,
		num: 246,
		gen: 6,
	},
	eartheater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Earth Eater",
		rating: 3.5,
		num: 297,
		gen: 6,
    	shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Ground moves; Ground immunity.",
	},
	shellejection: {
		onModifyMovePriority: -1,
		onModifyMove(move, attacker) {
			if (move.category === 'Special') {
				attacker.addVolatile('shellejection');
				this.add('-ability', attacker, 'Shell Ejection');
				this.add('-message', `Slowbro is getting ready to leave the battlefield!`);
				this.add('-message', `Slowbro can no longer use status moves!`);
			}
		},
		condition: {
			duration: 2,
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onEnd(pokemon) {
				this.add('-ability', pokemon, 'Shell Ejection');
				this.add('-message', `Slowbro ejected itself from its shell!`);
				pokemon.switchFlag = true;				
			},
		},
		name: "Shell Ejection",
		rating: 3.5,
		gen: 6,
    	shortDesc: "After using a Special move, this Pokemon switches out at the end of the next turn and it can't use status moves.",
	},
	sharpness: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Shapness boost');
				return this.chainModify(1.5);
			}
		},
		name: "Sharpness",
		rating: 3.5,
		gen: 6,
		num: 292,
    	shortDesc: "This Pokemon's slicing moves deal 50% more damage.",
	},
	dauntlessshield: {
		onStart(pokemon) {
			this.boost({def: 1}, pokemon);
			pokemon.addVolatile('dauntlessshield');
			this.add('-message', `Aggron has its shield up!`);
		},
		condition: {
			duration: 2,
			onEnd(pokemon) {
				this.add('-ability', pokemon, 'Dauntless Shield');
				this.add('-message', `Aggron lowered its shield!`);
				this.boost({def: -1}, pokemon);
			},
		},
		name: "Dauntless Shield",
		rating: 3.5,
		num: 235,
    	shortDesc: "+1 Defense on switch-in. Boost goes away at the end of the next turn.",
		gen: 6,
	},
	confidence: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source);
			}
		},
		name: "Confidence",
		rating: 3,
    	shortDesc: "This Pokemon's Sp. Atk is raised by 1 stage if it attacks and KOes another Pokemon.",
		gen: 6,
	},
	electricsurge: {
		onStart(source) {
			this.field.setTerrain('electricterrain');
		},
		name: "Electric Surge",
		rating: 4,
		num: 226,
		gen: 6,
	},				
	goodasgold: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Good as Gold');
				return null;
			}
		},
		isBreakable: true,
		name: "Good as Gold",
		rating: 5,
		num: 283,
    	shortDesc: "This Pokemon is immune to Status moves.",
	},
	opportunist: {
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist') return;
			const pokemon = this.effectState.target;
			const positiveBoosts: Partial<BoostsTable> = {};
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! > 0) {
					positiveBoosts[i] = boost[i];
				}
			}
			if (Object.keys(positiveBoosts).length < 1) return;
			this.boost(positiveBoosts, pokemon);
		},
		name: "Opportunist",
		rating: 3,
		num: 290,
    	shortDesc: "When an opposing Pokemon has a stat stage raised, this Pokemon copies the effect.",																	
	},
	intoxicate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'technoblast', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Poison';
				move.intoxicateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.intoxicateBoosted) return this.chainModify([0x14CD, 0x1000]);
		},
		name: "Intoxicate",
		rating: 4,
		shortDesc: "This Pokemon's Normal-type moves become Poison type and have 1.3x power.",
	},	
	
/*	
// ngas is so cringe
	analytic: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target) || this.field.getPseudoWeather('neutralizinggas')) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Analytic boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Analytic",
		rating: 2.5,
		num: 148,
	},	
	compoundeyes: {
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number' || this.field.getPseudoWeather('neutralizinggas')) return;
			this.debug('compoundeyes - enhancing accuracy');
			return accuracy * 1.3;
		},
		name: "Compound Eyes",
		rating: 3,
		num: 14,
	},
	guts: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status  && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Guts",
		rating: 3,
		num: 62,
	},
	ironfist: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch'] && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Iron Fist",
		rating: 3,
		num: 89,
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type && !this.field.getPseudoWeather('neutralizinggas')) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		name: "Protean",
		rating: 4.5,
		num: 168,
	},
	magician: {
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && !this.field.getPseudoWeather('neutralizinggas')) {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Magician', '[of] ' + target);
			}
		},
	megalauncher: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['pulse'] && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Mega Launcher",
		rating: 3,
		num: 178,
	},
	noguard: {
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target) && !this.field.getPseudoWeather('neutralizinggas')) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target) && !this.field.getPseudoWeather('neutralizinggas')) {
				return true;
			}
			return accuracy;
		},
		name: "No Guard",
		rating: 4,
		num: 99,
	},
	blaze: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		name: "Blaze",
		rating: 2,
		num: 66,
	},
	overgrow: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		name: "Overgrow",
		rating: 2,
		num: 65,
	},
	swarm: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		name: "Swarm",
		rating: 2,
		num: 68,
	},
	torrent: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		name: "Torrent",
		rating: 2,
		num: 67,
	},
	reckless: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if ((move.recoil || move.hasCrashDamage) && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Reckless boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Reckless",
		rating: 3,
		num: 120,
	},
	rivalry: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender && !this.field.getPseudoWeather('neutralizinggas')) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				} else {
					this.debug('Rivalry weaken');
					return this.chainModify(0.75);
				}
			}
		},
		name: "Rivalry",
		rating: 0,
		num: 79,
	},
	sandforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm') && !this.field.getPseudoWeather('neutralizinggas')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Sand Force",
		rating: 2,
		num: 159,
	},
	scrappy: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true && !this.field.getPseudoWeather('neutralizinggas')) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		name: "Scrappy",
		rating: 3,
		num: 113,
	},
	serenegrace: {
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
		name: "Serene Grace",
		rating: 3.5,
		num: 32,
	},
	sheerforce: {
		onModifyMove(move, pokemon) {
			if (move.secondaries && !this.field.getPseudoWeather('neutralizinggas')) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce && !this.field.getPseudoWeather('neutralizinggas')) return this.chainModify([0x14CD, 0x1000]);
		},
		name: "Sheer Force",
		rating: 3.5,
		num: 125,
	},
	skilllink: {
		onModifyMove(move) {
			if (move.multihit && Array.isArray(move.multihit) && move.multihit.length && !this.field.getPseudoWeather('neutralizinggas')) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy && !this.field.getPseudoWeather('neutralizinggas')) {
				delete move.multiaccuracy;
			}
		},
		name: "Skill Link",
		rating: 3,
		num: 92,
	},
	sniper: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
		},
		name: "Sniper",
		rating: 2,
		num: 97,
	},
	solarpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (this.field.getPseudoWeather('neutralizinggas')) return;
			if ((effect.id === 'sunnyday' || effect.id === 'desolateland') && !this.field.getPseudoWeather('neutralizinggas')) {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		name: "Solar Power",
		rating: 2,
		num: 94,
	},
	strongjaw: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite'] && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Strong Jaw",
		rating: 3,
		num: 173,
	},
	technician: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		name: "Technician",
		rating: 3.5,
		num: 101,
	},
	tintedlens: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		name: "Tinted Lens",
		rating: 4,
		num: 110,
	},
	toughclaws: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact'] && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Tough Claws",
		rating: 3.5,
		num: 181,
	},
	toxicboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical' && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Toxic Boost",
		rating: 2.5,
		num: 137,
	},
	flareboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn' && move.category === 'Special' && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Flare Boost",
		rating: 2,
		num: 138,
	},
*/
};
