export const Abilities: {[k: string]: ModdedAbilityData} = {
	lightpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Light Power",
    shortDesc: "This Pokemon's Special Attack is doubled.",
	},
	raindish: {
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) return;
			this.heal(pokemon.maxhp / 16);
		},
		onWeather(target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		name: "Rain Dish",
    shortDesc: "Heals 6.25% of user's max HP at the end of each turn. Heals 12.5% in Rain.",
		num: 44,
	},
	icebody: {
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather('hail')) return;
			this.heal(pokemon.maxhp / 16);
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		name: "Ice Body",
    shortDesc: "Heals 6.25% of user's max HP at the end of each turn. Heals 12.5% in Hail.",
		num: 115,
	},
	sweetveil: {
		name: "Sweet Veil",
      shortDesc: "This Pokemon and its allies can't fall asleep. This Pokemon heals 1/8 of its max HP if it's holding Honey.",
		onAllySetStatus(status, target, source, effect) {
			if (status.id === 'slp') {
				this.debug('Sweet Veil interrupts sleep');
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Sweet Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.debug('Sweet Veil blocking yawn');
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Sweet Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hasItem('honey')) {
					this.heal(pokemon.baseMaxhp / 8);
			}
		},
		rating: 2,
		num: 175,
	},
	libero: {
      shortDesc: "Non-STAB moves have 1.2x power.",
		onBasePowerPriority: 23,
		onBasePower (basePower, pokemon, target, move) {
			if (!pokemon.hasType(move.type)) {
				return this.chainModify(1.2);
			}
		},
		name: "Libero",
		rating: 4.5,
		num: 236,
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
	stickyhold: {
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
	watercompaction: {
		shortDesc: "This Pokemon's Defense goes up 2 stages when hit by a Water-type move; Water immunity",
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
	ironfist: {
		shortDesc: "This Pokemon's punch attacks have 1.25x power and don't make contact. Sucker Punch is not boosted.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		onModifyMove(move) {
			if (move.flags['punch']) {
				delete move.flags['contact'];
			}
		},
		name: "Iron Fist",
		rating: 3,
		num: 89,
	},
	overclock: {
		shortDesc: "This Pokemon's moves that lower its stats have 1.3x power.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.name === 'Draco Meteor' || move.name === 'Fleur Cannon' || move.name === 'Leaf Storm' || move.name === 'Overheat' || move.name === 'Psycho Boost' || move.name === 'Superpower' || move.name === 'Lightning Lance' || move.name === 'Clanging Scales' || move.name === 'Close Combat' || move.name === 'Dragon Ascent' || move.name === 'Hyperspace Fury' || move.name === 'Scale Shot' || move.name === 'V-Create' || move.name === 'Hammer Arm' || move.name === 'Ice Hammer') {
				return this.chainModify(1.3);
			}
		},
		name: "Overclock",
	},
	pricklycoat: {
		shortDesc: "This Pokemon sets a layer of Spikes when hit by a contact move, or Toxic Spikes if it's a Poison-type or hit by a Poison-type move.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && (move.type === 'Poison' || target.hasType('Poison'))) {
				this.add('-ability', target, 'Prickly Coat');
				target.side.foe.addSideCondition('toxicspikes');
			} else {
				if (move.flags['contact']) {
					this.add('-ability', target, 'Prickly Coat');
					target.side.foe.addSideCondition('spikes');
				}
			}
		},
		name: "Prickly Coat",
	},
	sandveil: {
		desc: "If Sandstorm is active, this Pokemon's SpD is multiplied by 1.5. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's SpD is boosted 1.5x; immunity to Sandstorm.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifySpD(spd, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		id: "sandveil",
		name: "Sand Veil",
		rating: 3,
		num: 146,
	},
	snowcloak: {
		desc: "If Hail is active, this Pokemon's Ice, Water, and Fairy-type moves deal 1.3x damage. This Pokemon takes no damage from Hail.",
		shortDesc: "This Pokemon's Ice/Water/Fairy attacks deal 1.3x damage in Hail; immunity to Hail.",
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('hail')) {
				if (move.type === 'Ice' || move.type === 'Water' || move.type === 'Fairy') {
					this.debug('Snow Cloak boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		id: "snowcloak",
		name: "Snow Cloak",
		rating: 3,
		num: 81,
	},
	powerofalchemy: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		isPermanent: true,
		name: "Power of Alchemy",
		rating: 0,
		num: 223,
	},
	powerofalchemymukalola: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.getAbility('poisontouch'),
			});
		},
		onAnyFaintPriority: 1,
		onAnyFaint(source, target, effect) {
			this.add('-activate', target, 'ability: Scavenge'); 
			this.heal(target.baseMaxhp / 3, target, target, effect);
		},
		isPermanent: true,
		name: "Power of Alchemy (Muk-Alola)",
		rating: 0,
	},
	merciless: {
		shortDesc: "This Pokemon's attacks are critical hits if the target is statused.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox', 'brn', 'frz', 'slp', 'par'].includes(target.status)) return 5;
		},
		name: "Merciless",
		rating: 1.5,
		num: 196,
	},
	pastelveil: {
		shortDesc: "This Pokemon and its allies cannot be poisoned. Poison-type moves have 0.5x power against this Pokemon and its allies. On switch-in, cures poisoned allies.",
		onStart(pokemon) {
			for (const ally of pokemon.allies()) {
				if (['psn', 'tox'].includes(ally.status)) {
					this.add('-activate', pokemon, 'ability: Pastel Veil');
					ally.cureStatus();
				}
			}
		},
		onUpdate(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onAllySwitchIn(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', this.effectData.target, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Pastel Veil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Pastel Veil weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Pastel Veil weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Pastel Veil",
		rating: 2,
		num: 257,
	},
	gravitas: {
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
		onStart(source) {
			this.add('-ability', source, 'Gravitas');
			this.field.addPseudoWeather('gravity', source, source.ability);
		},
		name: "Gravitas",
		rating: 4,
	},
	buzzoff: {
	  shortDesc: "This Pokemon switches out after using a Bug-type move.",
	  onModifyMove(move, pokemon) {
			if (move.type === 'Bug') {
			  move.selfSwitch = true;
			  this.add('-ability', pokemon, 'Buzz Off');
			}
	  },
	  name: "Buzz Off",
	  rating: 2.5,
    },
	magmaarmor: {
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Magma Armor');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === ('hail')) return false;
			if (type === ('frz')) return false;
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Water') {
				this.debug('Magma Armor weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Water') {
				this.debug('Magma Armor weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Magma Armor",
		rating: 1,
		num: 40,
		shortDesc: "Water/Ice-type moves against this Pokemon deal damage with a halved attacking stat. Hail & Freeze immunity.",
	},
	leafguard: {
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if ((status.id === 'yawn' || status.id === 'flinch') && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-immune', target, '[from] ability: Leaf Guard');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying' || move.type === 'Bug') {
				this.debug('Leaf Guard weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying' || move.type === 'Bug') {
				this.debug('Leaf Guard weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Leaf Guard",
		rating: 0.5,
		num: 102,
		shortDesc: "Flying/Bug-type moves against this Pokemon deal damage with a halved attacking stat. Can't be statused or flinched by others in Sun.",
	},

	soullink: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !source.hasType('Ghost') && source.addType('Ghost')) {
				this.add('-start', source, 'typeadd', 'Ghost', '[from] ability: Soul Link');
			}
		},
		name: "Soul Link",
		shortDesc: "Pokémon that make contact with this Pokémon have the Ghost-type added to their existing typings until they switch out (Trick-or-Treat effect).",
	},
/*
	soullink: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Soul Link');
			this.add('-message', `Opponents that make contact will become a part-Ghost-type!`);
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !source.hasType('Ghost') && !source.addType('Ghost')) {
           	this.useMove("Trick-or-Treat", target);
			}
		},
		name: "Soul Link",
		shortDesc: "Pokémon that make contact with this Pokémon have the Ghost-type added to their existing typings until they switch out (Trick-or-Treat effect).",
	},
*/
	wanderingspirit: {
		shortDesc: "On switch-in, swaps ability with the opponent.",
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if ((pokemon.side.foe.active.some(
				foeActive => foeActive && this.isAdjacent(pokemon, foeActive) && foeActive.ability === 'noability'
			))
			|| pokemon.species.id !== 'spiritomb' && pokemon.species.id !== 'spectrier' && pokemon.species.id !== 'yamaskgalar' && pokemon.species.id !== 'runerigus' && pokemon.species.id !== 'cofagrigus' && pokemon.species.id !== 'cacturne' && pokemon.species.id !== 'hoopa' && pokemon.species.id !== 'marowak' && pokemon.species.id !== 'rotom') {
				this.effectData.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectData.gaveUp) return;
			if (!this.effectData.switchingIn) return;
			const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				const ability = target.getAbility();
				const additionalBannedAbilities = [
					// Zen Mode included here for compatability with Gen 5-6
					'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'wanderingspirit',
					'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode', 'concussion', 'gorillatactics',
				];
				if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				target.setAbility('wanderingspirit', pokemon);
				pokemon.setAbility(ability);
				
				this.add('-activate', pokemon, 'ability: Wandering Spirit');
				this.add('-activate', pokemon, 'Skill Swap', '', '', '[of] ' + target);
				this.add('-activate', pokemon, 'ability: ' + ability.name);
				this.add('-activate', target, 'ability: Wandering Spirit');
				return;
			}
		},
		name: "Wandering Spirit",
		rating: 2.5,
		num: 254,
	},
	honeygather: {
		name: "Honey Gather",
		shortDesc: "At the end of each turn, if this Pokemon has no item, it gets Honey. Knock Off doesn't get boosted against Pokemon with this ability.",
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
		onSourceModifyDamage(damage, source, target, move) {
			if (move.name === 'Knock Off') {
				this.debug('Honey Gather weaken');
				return this.chainModify(0.67);
			}
		},
		rating: 0,
		num: 118,
	},
	hydration: {
		shortDesc: "This Pokemon has its status cured at the end of each turn if Rain Dance is active or it gets hit by a Water move; Water immunity.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				this.add('-message', `Hydration activated!`);
				pokemon.cureStatus();
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!target.cureStatus()) {
					this.add('-immune', target, '[from] ability: Hydration');
				}
				return null;
			}
		},
		name: "Hydration",
		rating: 1.5,
		num: 93,
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
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
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
  scavenge: {
		shortDesc: "This Pokemon's heals 33% of its HP when another Pokemon faints.",
		onAnyFaintPriority: 1,
		onAnyFaint(source, target, effect) {
			this.add('-activate', target, 'ability: Scavenge'); 
			this.heal(target.baseMaxhp / 3, target, target, effect);
		},
		name: "Scavenge",
		rating: 3.5,
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
	},
/*
	counterfeit: {
		shortDesc: "On switch-in, identifies and copies the effect of the opponent's held item.",
		onStart(pokemon) {
			pokemon.addVolatile('counterfeit');
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
			const counterfeit = pokemon.side.pokemon[i];
			this.add('-ability', pokemon, 'Counterfeit');
			pokemon.item = counterfeit.item;
			this.add('-message', `${pokemon.name}'s item became a replica of the ${this.dex.getItem(counterfeit.item).name} belonging to ${counterfeit.name}!`);
		},
		name: "Counterfeit",
		rating: 3.5,
	},
	counterfeit: {
		shortDesc: "On switch-in, identifies and copies the effect of the opponent's held item.",
		onStart(pokemon) {
			if (pokemon.side.foe.active.some(
				foeActive => foeActive && this.isAdjacent(pokemon, foeActive) && !foeActive.item
			)) {
				this.effectData.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectData.gaveUp) return;
			const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				const item = target.getItem();
				const additionalBannedItems = [
					// Zen Mode included here for compatability with Gen 5-6
					'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode',
				];
				if (!this.singleEvent('TakeItem', item, target.itemData, target, target, item) || additionalBannedItems.includes(target.item)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				this.add('-ability', pokemon, item, '[from] ability: Counterfeit', '[of] ' + target);
				pokemon.setAbility(item);
				return;
			}
		},
		name: "Counterfeit",
		rating: 3.5,
	},

	counterfeit: {
		shortDesc: "On switch-in, identifies and copies the effect of the opponent's held item.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted || !this.isAdjacent(target, pokemon)) continue;
				if (!target.item || this.dex.getItem(target.item).zMove || this.dex.getItem(target.item).megaStone) continue;
				if (!pokemon.useItem) return;
				pokemon.ability = target.item;
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} counterfeited the ${this.dex.getItem(target.item).name} belonging to ${target.illusion ? target.illusion.name : target.name}!`);
				return;
			}
		},
		name: "Counterfeit",
		rating: 3.5,
	},
*/
	counterfeit: {
		shortDesc: "(Non-functional placeholder) On switch-in, identifies and copies the effect of the opponent's held item.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Counterfeit', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		isPermanent: true,
		name: "Counterfeit",
		rating: 1.5,
	},
	optimistic: {
		onBoost(boost, target, source, effect) {
			if (source && target !== source) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Optimistic", "[of] " + target);
			}
		},
		shortDesc: "This Pokemon can't lower its own stats.",
		name: "Optimistic",
		rating: 2,
	},
	rivalry: {
		onBasePowerPriority: 24,
		onBasePower(basePower, pokemon, target) {
			if (target.hasType(pokemon.getTypes())) {
				return this.chainModify(1.33);
			}
		},
		name: "Rivalry",
		rating: 0,
		num: 79,
		shortDesc: "This Pokemon's moves deal 1.33x damage to targets that share a type with it.",
	},
	vaporcontrol: {
		onUpdate(pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) && !pokemon.side.getSideCondition('mist')) {
           	this.useMove("Mist", pokemon);
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sunnyday') || this.field.isWeather('desolateland')) {
				if (move.type === 'Water') {
					this.debug('Vapor Control boost');
				return this.chainModify(1.5);
				}
			}
		},
		shortDesc: "If Sun is active, 1.5x power Water moves and sets Mist; Ignores Sun Water drop.",
		name: "Vapor Control",
		rating: 2,
	},

// Edited by proxy
	oblivious: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
			if (pokemon.volatiles['trashtalk']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('trashtalk');
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract' || type === 'trashtalk') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Oblivious');
				return null;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Oblivious');
			}
		},
		name: "Oblivious",
		rating: 1.5,
		num: 12,
	},
	aromaveil: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment', 'trashtalk'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectData.target;
					this.add('-block', target, 'ability: Aroma Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		name: "Aroma Veil",
		rating: 2,
		num: 165,
	},
	trace: {
		onStart(pokemon) {
			if (pokemon.side.foe.active.some(
				foeActive => foeActive && this.isAdjacent(pokemon, foeActive) && foeActive.ability === 'noability'
			)) {
				this.effectData.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectData.gaveUp) return;
			const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				const ability = target.getAbility();
				const additionalBannedAbilities = [
					// Zen Mode included here for compatability with Gen 5-6
					'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode', 'wanderingspirit',
				];
				if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
				pokemon.setAbility(ability);
				return;
			}
		},
		name: "Trace",
		rating: 2.5,
		num: 36,
	},
	concussion: {
		id: "concussion",
		name: "Concussion",
		shortDesc: "While this Pokemon is active, the opponents' held items have no effect.",
		onStart(source) {
			let activated = false;
			for (const pokemon of source.side.foe.active) {
				if (!activated) {
					this.add('-ability', source, 'Concussion');
				}
				activated = true;
				if (!pokemon.volatiles['embargo'] && !pokemon.hasItem('morningblossom')) {
					pokemon.addVolatile('embargo');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['embargo'] && !target.hasItem('morningblossom')) {
					target.addVolatile('embargo');
				}
			}
		},
		onEnd(pokemon) {
			const source = this.effectData.target;
			for (const target of source.side.foe.active) {
				target.removeVolatile('embargo');
			}
		},
		rating: 4,
	},
	gorillatactics: {
		name: "Gorilla Tactics",
		shortDesc: "While this Pokemon is active, the opponents' held items have no effect.",
		onStart(source) {
			let activated = false;
			for (const pokemon of source.side.foe.active) {
				if (!activated) {
					this.add('-ability', source, 'Gorilla Tactics');
				}
				activated = true;
				if (!pokemon.volatiles['embargo'] && !pokemon.hasItem('morningblossom')) {
					pokemon.addVolatile('embargo');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['embargo'] && !target.hasItem('morningblossom')) {
					target.addVolatile('embargo');
				}
			}
		},
		onEnd(pokemon) {
			const source = this.effectData.target;
			for (const target of source.side.foe.active) {
				target.removeVolatile('embargo');
			}
		},
		rating: 4,
		num: 255,
	},
	toxicboost: {
		shortDesc: "1.5x Attack and Defense while poisoned; Immune to poison status damage.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
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
		shortDesc: "1.5x SpA and SpD while burned; Immune to burn damage.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn' && move.category === 'Special') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (pokemon.status === 'brn') {
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

// The other Power of Alchemies
		powerofalchemyweezing: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Neutralizing Gas');
			pokemon.abilityData.ending = false;
			for (const target of this.getAllActive()) {
				if (target.illusion) {
					this.singleEvent('End', this.dex.getAbility('Illusion'), target.abilityData, target, pokemon, 'neutralizinggas');
				}
				if (target.volatiles['slowstart']) {
					delete target.volatiles['slowstart'];
					this.add('-end', target, 'Slow Start', '[silent]');
				}
			}
		},
		onEnd(source) {
			// FIXME this happens before the pokemon switches out, should be the opposite order.
			// Not an easy fix since we cant use a supported event. Would need some kind of special event that
			// gathers events to run after the switch and then runs them when the ability is no longer accessible.
			// (If your tackling this, do note extreme weathers have the same issue)

			// Mark this pokemon's ability as ending so Pokemon#ignoringAbility skips it
			source.abilityData.ending = true;
			for (const pokemon of this.getAllActive()) {
				if (pokemon !== source) {
					// Will be suppressed by Pokemon#ignoringAbility if needed
					this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityData, pokemon);
				}
			}
		},
		isPermanent: true,
		name: "Power of Alchemy (Weezing)",
		rating: 0,
	}, 
		powerofalchemyalcremie: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
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
		onAllySetStatus(status, target, source, effect) {
			if (status.id === 'slp') {
				this.debug('Sweet Veil interrupts sleep');
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Sweet Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.debug('Sweet Veil blocking yawn');
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Sweet Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hasItem('honey')) {
					this.heal(pokemon.baseMaxhp / 8);
			}
		},
		isPermanent: true,
		name: "Power of Alchemy (Alcremie)",
		rating: 0,
	}, 
	powerofalchemymismagius: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		isPermanent: true,
		name: "Power of Alchemy (Mismagius)",
		rating: 0,
	},
	powerofalchemyslowkinggalar: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onStart(pokemon) {
			for (const ally of pokemon.side.active) {
				if (ally !== pokemon) {
					ally.clearBoosts();
					this.add('-clearboost', ally, '[from] ability: Curious Medicine', '[of] ' + pokemon);
				}
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		isPermanent: true,
		name: "Power of Alchemy (Slowking-Galar)",
		rating: 0,
	},
	powerofalchemyditto: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'par') {
				this.add('-activate', pokemon, 'ability: Limber');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'par') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Limber');
			}
			return false;
		},
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			// Imposter does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectData.switchingIn) return;
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				pokemon.transformInto(target, this.dex.getAbility('powerofalchemyditto'));
			}
			this.effectData.switchingIn = false;
		},
		isPermanent: true,
		name: "Power of Alchemy (Ditto)",
		rating: 0,
	},
	powerofalchemyvanillite: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.25);
			}
		},
		onModifySpD(spd, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.25);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather('hail')) return;
			this.heal(pokemon.maxhp / 16);
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		isPermanent: true,
		name: "Power of Alchemy (Vanillite)",
		rating: 0,
	},
	powerofalchemyvanilluxe: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onStart(source) {
			this.field.setWeather('hail');
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather('hail')) return;
			this.heal(pokemon.maxhp / 16);
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		isPermanent: true,
		name: "Power of Alchemy (Vanilluxe)",
		rating: 0,
	},
	powerofalchemytypenull: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Pressure');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		onCriticalHit: false,
		isPermanent: true,
		name: "Power of Alchemy (Type: Null)",
		rating: 0,
	},
	powerofalchemysilvally: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onStart(pokemon) {
			let totaldef = 0;
			let totalspd = 0;
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				totaldef += target.getStat('def', false, true);
				totalspd += target.getStat('spd', false, true);
			}
			if (totaldef && totaldef >= totalspd) {
				this.boost({spa: 1});
			} else if (totalspd) {
				this.boost({atk: 1});
			}
		},
		isPermanent: true,
		name: "Power of Alchemy (Silvally)",
		rating: 0,
	},
	powerofalchemyvaporeon: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				this.add('-message', `Hydration activated!`);
				pokemon.cureStatus();
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4) || !target.cureStatus()) {
					this.add('-immune', target, '[from] ability: Power of Alchemy (Vaporeon)');
				}
				return null;
			}
		},
		isPermanent: true,
		name: "Power of Alchemy (Vaporeon)",
		rating: 0,
	},
	powerofalchemyjolteon: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volt Absorb');
				}
				return null;
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && (move.type === 'Poison' || target.hasType('Poison'))) {
				this.add('-ability', target, 'Prickly Coat');
				target.side.foe.addSideCondition('toxicspikes');
			} else {
				if (move.flags['contact']) {
					this.add('-ability', target, 'Prickly Coat');
					target.side.foe.addSideCondition('spikes');
				}
			}
		},
		isPermanent: true,
		name: "Power of Alchemy (Jolteon)",
		rating: 0,
	},
	powerofalchemyflareon: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		isPermanent: true,
		name: "Power of Alchemy (Flareon)",
		rating: 0,
	},
	powerofalchemyespeon: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Analytic boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		isPermanent: true,
		name: "Power of Alchemy (Espeon)",
		rating: 0,
	},
	powerofalchemyumbreon: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox', 'brn', 'frz', 'slp', 'par'].includes(target.status)) return 5;
		},
		isPermanent: true,
		name: "Power of Alchemy (Umbreon)",
		rating: 0,
	},
	powerofalchemyleafeon: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if ((status.id === 'yawn' || status.id === 'flinch') && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-immune', target, '[from] ability: Leaf Guard');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying' || move.type === 'Bug') {
				this.debug('Leaf Guard weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying' || move.type === 'Bug') {
				this.debug('Leaf Guard weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		isPermanent: true,
		name: "Power of Alchemy (Leafeon)",
		rating: 0,
	},
	powerofalchemyglaceon: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onStart(source) {
			this.field.setWeather('hail');
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('hail')) {
				if (move.type === 'Ice' || move.type === 'Water' || move.type === 'Fairy') {
					this.debug('Snow Cloak boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		isPermanent: true,
		name: "Power of Alchemy (Glaceon)",
		rating: 0,
	},
	powerofalchemysylveon: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onCheckShow(pokemon) {
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
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Natural Cure')) {
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

				if (curPoke.hasAbility('naturalcure')) {
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
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

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
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fairy';
				move.pixilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.pixilateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		isPermanent: true,
		name: "Power of Alchemy (Sylveon)",
		rating: 0,
	},
};
