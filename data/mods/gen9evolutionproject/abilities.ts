export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	eruptive: { // Volcanic Aurorus
		onDamagingHit(damage, target, source, move) {
			if (target.volatiles['twoturnmove'] && (target.volatiles['twoturnmove'].duration > 1 || this.queue.willMove(target))) {
				source.trySetStatus('brn', target);
			}
		},
		flags: {},
		name: "Eruptive",
		longDesc: `When attacking the Pokémon while it's charging a two-turn move, the attacker is burned.`,
		shortDesc: "While charging a two-turn move, burns attackers.",
		rating: 3,
		num: -1,
	},
	berserkawakening: { // Hibearlax
		onUpdate(pokemon) {
			if (pokemon.isStarted && pokemon.species.name === 'Hibearlax-Berserk' && pokemon.status === 'slp') {
				pokemon.formeChange('Hibearlax', this.effect);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				this.add('-message', `${pokemon.name} is hibernating!`);
			}
			if (pokemon.isStarted && pokemon.species.name === 'Hibearlax' && !(pokemon.status === 'slp')) {
				pokemon.formeChange('Hibearlax-Berserk', this.effect);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				this.add('-message', `${pokemon.name} went berserk!`);
				if (!this.effectState.busted) {
					this.runEvent('DataMod', pokemon);
					this.effectState.busted = true;
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Berserk Awakening",
		longDesc: `Changes to Berserk Forme when awake and Hibernating Forme when asleep.`,
		shortDesc: "Hibearlax: Berserk while awake, Hibernating while asleep.",
		rating: 3,
		num: -2,
	},
	awakening: { // Meditendo
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fighting') {
				this.debug('Awakening boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Awakening",
		longDesc: `Fighting-type moves used by the Pokémon's side are boosted by 50%.`,
		shortDesc: "Boosts team's Fighting moves by 50%.",
		rating: 3,
		num: -3,
	},
	permafrost: { // Narwhirl
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id) &&
				!(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ice';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Permafrost",
		longDesc: `All the Pokémon's moves become Ice type. The power of those moves is boosted a little. <i>(20% boost)</i>`,
		shortDesc: "Most moves become Ice-type; 20% boost.",
		rating: 3,
		num: -4,
	},
	mindful: { // Hieroswine
		onAfterMoveSecondary(target, source, move) {
			if (!target.hp || target === source) return;
			if (move.category === 'Status') this.boost({spa: 1});
		},
		flags: {},
		name: "Mindful",
		longDesc: `When the Pokémon is hit by a status move, its Sp. Atk stat is boosted.`,
		shortDesc: "Raises Sp. Atk when hit by a status move.",
		rating: 3,
		num: -5,
	},
	snowballeffect: { // Hisuian Pyukumuku
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.id === 'iceball' || move.id === 'snowroller') {
				if (source.boosts['spe'] < 6) {
					this.boost({atk: 1, spe: 2});
					this.add('-message', `${source.name} is gathering speed!`);
				} else {
					if (!this.canSwitch(source.side) || source.forceSwitchFlag || source.switchFlag) return;
					for (const side of this.sides) {
						for (const active of side.active) {
							active.switchFlag = false;
						}
					}
					source.switchFlag = true;
					this.add('-activate', source, 'ability: Snowball Effect');
					this.add('-message', `${source.name} flew off the field...`);
				}
			}
		},
		flags: {},
		name: "Snowball Effect",
		longDesc: `When the Pokémon uses Ice Ball or Snow Roller, its Attack stat is boosted and its Speed stat is sharply boosted.<br>When its Speed can't go up any more, its Speed is reset and it flies off the field...`,
		shortDesc: "Ice Ball, Snow Roller: +1 Atk, +2 Spe; already max Spe -> pivot out.",
		rating: 3,
		num: -6,
	},
	stormchaser: { // Variant Eelektross
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Electric' || move.type === 'Flying') {
				this.debug('Storm Chaser weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Electric' || move.type === 'Flying') {
				this.debug('Storm Chaser weaken');
				return this.chainModify(0.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || move.type === 'Electric' || move.type === 'Flying') {
				this.field.setWeather('raindance');
			}
		},
		flags: {breakable: 1},
		name: "Storm Chaser",
		longDesc: `Halves the damage taken from Water-, Electric- and Flying-type moves.<br>When the Pokémon is hit by an attack of one of those types, it makes it rain.`,
		shortDesc: "Hit by Water, Flying, Electric moves: halves damage, sets rain.",
		rating: 3,
		num: -7,
	},
	spiritual: { // Togepries and Weltenschertz
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost') return this.chainModify(0.5);
		},
		flags: {breakable: 1},
		name: "Spiritual",
		longDesc: `Halves the damage taken from Ghost-type moves.`,
		shortDesc: "Halves damage from Ghost moves.",
		rating: 3,
		num: -8,
	},
	martialmaster: { // Drampa-Shifu
		onAnyModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && target.isAlly(this.effectState.target)) {
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Martial Master",
		longDesc: `Halves the damage taken from Fighting-type moves by the Pokémon and its allies (students).`,
		shortDesc: "Halves damage from Fighting moves; also affects allies.",
		rating: 3,
		num: -9,
	},
	pollenbasket: { // Thumbulbee
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug') return this.chainModify(0.5);
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Bug') {
				this.boost({def: 1});
			}
		},
		flags: {breakable: 1},
		name: "Pollen Basket",
		longDesc: `Halves the damage taken from Bug-type moves.<br>When the Pokémon is hit by a Bug-type attack, its Defense stat is boosted.`,
		shortDesc: "Hit by Bug moves: halves damage, +1 Def.",
		rating: 3,
		num: -10,
	},
	patchnote: { // Datagon2 and Datagon-Z
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (this.dex.types.get(move.type).damageTaken[target.getTypes()[0]] === 1) mod /= 2;
			return this.chainModify(mod);
		},
		flags: {breakable: 1},
		name: "Patch Note",
		longDesc: `Halves the damage taken from moves whose types are hit super effectively by the Pokémon's primary type.`,
		shortDesc: "Halves damage if primary type is SE on attack type.",
		rating: 3,
		num: -11,
	},
	rustcontrol: { // Paldean Noivern
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground' || move.type === 'Poison') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground' || move.type === 'Poison') {
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Rust Control');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Rust Control');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Rust Control",
		longDesc: `Halves the damage taken from Poison- and Ground-type moves and prevents the Pokémon from being poisoned.`,
		shortDesc: "Halves damage from Poison, Ground moves; immune to poison, Toxic.",
		rating: 3,
		num: -12,
	},
	directingtraffic: { // Urban Ampharos
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Normal') return this.chainModify(0.5);
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		flags: {breakable: 1},
		name: "Directing Traffic",
		longDesc: `Halves the damage taken from Normal-type moves and prevents the Pokémon from flinching.`,
		shortDesc: "Halves damage from Normal moves; immune to flinching.",
		rating: 3,
		num: -13,
	},
	highclimber: { // Alpinig
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock') return this.chainModify(0.5);
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') return Math.floor(damage / 2);
		},
		onModifySecondaries(secondaries, move) {
		  if (this.activeMove && this.activeMove.type === 'Rock') {
			  this.debug('High Climber prevent secondary');
			  return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		  }
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: High Climber', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "High Climber",
		longDesc: `Halves the damage taken from Rock-type moves.<br>It also protects the Pokémon from the additional effects of Rock-type moves and from being affected by Intimidate.`,
		shortDesc: "Halves damage: Rock moves, Stealth Rock; immune to: Rock secondary effects, Intimidate.",
		rating: 3,
		num: -14,
	},
	divinatedprotection: { // Horroracle
		onTryHit(pokemon, target, move) {
			if (move.type === 'Ghost') {
				this.add('-immune', pokemon, '[from] ability: Divinated Protection');
				return null;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special' && target.hp === target.maxhp) {
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Divinated Protection",
		longDesc: `The Pokémon takes no damage when hit by Ghost-type moves.<br>This also halves the damage taken from special moves when the Pokémon's HP is full.`,
		shortDesc: "Ghost-immune; at full HP, halves damage from special moves.",
		rating: 3,
		num: -15,
	},
	shatteringclay: { // Potthereal
		onDamagingHit(damage, target, source, move) {
			if (move.category !== 'Physical') return;
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon === target || pokemon.fainted) continue;
				if (!activated) {
					this.add('-ability', target, 'Shattering Clay');
					activated = true;
				}
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8, pokemon, target, 'stealthrock');
			}
		},
		flags: {},
		name: "Shattering Clay",
		longDesc: `When the Pokémon is hit by a physical attack, it scatters stone splinters that damage all Pokémon adjacent to it.<br><i>(The damage is the same as Stealth Rock.)</i>`,
		shortDesc: "Rocks damage surrounding Pokémon when hit with a physical move.",
		rating: 3,
		num: -16,
	},
	chainlink: { // Verdant Corviknight (please let this still work askdfjh)
		onUpdate(pokemon) {
			if (!pokemon.isStarted || pokemon.terastallized) return; // should activate *after* Data Mod
			if (!pokemon.hasType('Steel')) {
				for (const ally of pokemon.allies()) {
					if (ally.hasAbility('chainlink') || ally.terastallized) continue; // don't bounce back and forth indefinitely
					if (ally.hasType('Steel') && pokemon.addType('Steel')) {
						this.add('-ability', pokemon, 'Chain Link');
						this.add('-message', `${pokemon.name} stole its partner's armor!`);
						this.add('-start', pokemon, 'typeadd', 'Steel', '[from] Ability: Chain Link');
						ally.addVolatile('chainlink');
					}
				}
			}
		},
		onEnd(pokemon) {
			if (!pokemon.hasType('Steel')) return;
			// doesn't happen twice if the ally has already returned the armor
			for (const ally of pokemon.allies()) {
				ally.removeVolatile('chainlink');
			}
		},
		onAfterTerastallization(pokemon) { // return armor when Chain Link isn't working any more
			for (const ally of pokemon.allies()) {
				ally.removeVolatile('chainlink');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.terastallized) return;
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Steel" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
			},
			onSwitchOut(pokemon) { // it seems like volatiles may not run onEnd on their own the way Abilities do
				pokemon.removeVolatile('chainlink');
			},
			onFaint(pokemon) {
				pokemon.removeVolatile('chainlink');
			},
			onAfterTerastallization(pokemon) {
				pokemon.removeVolatile('chainlink');
			},
			onEnd(pokemon) {
				for (const ally of pokemon.allies()) { // attempts to revert all Chain Link allies' types
					if (ally.hasAbility('chainlink')) {
						this.add('-ability', ally, 'Chain Link');
						this.add('-message', `${ally.name} returned its partner's armor!`);

						let types = ally.baseSpecies.types;
						if (ally.getTypes().join() !== types.join() && ally.setType(types)) this.add('-start', ally, 'typechange', ally.types.join('/')); // does nothing if Terastallized
					}
				}
				// then reverts its own types
				let types = pokemon.baseSpecies.types;
				if (pokemon.getTypes().join() !== types.join() && pokemon.setType(types)) this.add('-start', pokemon, 'typechange', pokemon.types.join('/')); // does nothing if Terastallized
			},
		},
		name: "Chain Link",
		longDesc: `When the Pokémon is on the field alongside a Steel-type ally, the Pokémon gains the Steel type and its ally loses the Steel type.`,
		shortDesc: "In a double battle, the Pokémon steals its partner's Steel type.",
		rating: 3,
		num: -17,
	},
	witheringglare: { // Verdant Corviknight
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Withering Glare');
			this.add('-message', `${pokemon.name}'s intensity prevents all Pokémon's stats from being changed!`);
		},
		onAnyTryBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				delete boost[i];
				showMsg = true;
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add('-ability', this.effectState.target, 'Withering Glare');
				if (target && target !== this.effectState.target) {
					this.add('-message', `${this.effectState.target.name} prevented ${target.name}'s stats from being changed!`);
				} else {
					this.add('-message', `${this.effectState.target.name} prevented its stats from being changed!`);
				}
			}
		},
		flags: {breakable: 1},
		name: "Withering Glare",
		longDesc: `Prevents moves and Abilities from raising or lowering any Pokémon's stats.`,
		shortDesc: "Pokémon's stats can't be raised or lowered.",
		rating: 3,
		num: -18,
	},
	calcify: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Calcify boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Calcify boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Calcify",
		longDesc: `Powers up Rock-type moves. <i>(30% boost)</i>`,
		shortDesc: "Boosts Rock-type moves by 1.3x.",
		rating: 3,
		num: -19,
	},
	frigidfocus: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['snow', 'hail'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (effect.id === 'snow' || effect.id === 'hail') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		flags: {},
		name: "Frigid Focus",
		longDesc: `In snow or hail, the Pokémon's Sp. Atk stat is boosted, but its HP decreases every turn.<br>The Pokémon also doesn't take damage from hail.`,
		shortDesc: "Snow/hail: 1.5x SpA, but the user loses 1/8 HP each turn.",
		rating: 3,
		num: -20,
	},
	scaleshift: { // Ma'adowrian Frosmoth - please work the same
		onUpdate(pokemon) {
			let newtype = pokemon.baseSpecies.types[0];
			for (const ally of pokemon.side.active) {
				let scaletype = ally.types[0];
				if (ally.terastallized) scaletype = ally.teraType;
				if (ally && ally !== pokemon && !ally.fainted && !ally.hasAbility('scaleshift') &&
					scaletype !== pokemon.baseSpecies.types[0] &&
					scaletype !== pokemon.baseSpecies.types[1]) {
					newtype = scaletype;
					break;
				}
			}
			pokemon.m.scaleshift = newtype; // sets pokemon.m.scaleshift to use for Dispersion even when Terastallized
			if (!pokemon.isStarted || pokemon.terastallized) return; // shouldn't change types until after Data Mod
			const typecombo = [newtype, pokemon.baseSpecies.types[1]];
			if (pokemon.getTypes().join() === typecombo.join() || !pokemon.setType(typecombo)) return;
			this.add('-ability', pokemon, 'Scale Shift');
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
		},
		onEnd(pokemon) {
			pokemon.m.scaleshift = null;
			if (pokemon.getTypes().join() === pokemon.baseSpecies.types.join() || !pokemon.setType(pokemon.baseSpecies.types)) return;
			this.add('-ability', pokemon, 'Scale Shift');
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
		},
		flags: {},
		name: "Scale Shift",
		longDesc: `The Pokémon copies its partner's primary type, unless that type is already one of the Pokémon's types.`,
		shortDesc: "In a double battle, the Pokémon copies its partner's first type.",
		rating: 3,
		num: -21,
	},
	centrifuge: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Centrifuge');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Ground' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Centrifuge');
				}
				return this.effectState.target;
			}
		},
		longDesc: `The Pokémon draws in all Ground-type moves.<br>Instead of taking damage from them, its Attack stat is boosted.`,
		shortDesc: "Draws in Ground-type moves to raise Attack.",
		flags: {breakable: 1},
		name: "Centrifuge",
		rating: 3,
		num: -22,
	},
	cheaptricks: { // Hawlucha-Rudo
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark') return this.chainModify(0.5);
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.type !== 'Dark' || move.category === 'Status' || source.hasAbility('stickyhold')) return;
			
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemState, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return;
			}
			this.add('-ability', target, 'Cheap Tricks');
			this.add('-activate', target, 'move: Trick', '[of] ' + target);
			this.add('-anim', source, "Switcheroo", target); // fun
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Switcheroo');
			} else {
				this.add('-enditem', target, yourItem, '[from] move: Switcheroo');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Switcheroo');
			} else {
				this.add('-enditem', source, myItem, '[from] move: Switcheroo');
			}
		},
		flags: {breakable: 1},
		name: "Cheap Tricks",
		longDesc: `Halves the damage taken from Dark-type moves.<br>Before a Dark-type move hits the Pokémon, it quickly trades held items with the attacker.`,
		shortDesc: "Hit by Dark moves: halves damage, swaps items before hit.",
		rating: 3,
		num: -23,
	},

	// Slate 2

	fendente: { // for Hisuian Kabutops
		longDesc: `Gives priority to the Pokémon's slicing moves while its HP is full.<br>When the Pokémon's HP is low, its slicing moves always result in a critical hit. <i>(1/3 HP or less)</i><br>Using a slicing move at any other HP range boosts the Pokémon's Defense.`,
		shortDesc: "Slicing moves: +1 priority at full HP, always crit at 1/3 HP or less, +1 Defense otherwise.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move.flags['slicing'] && pokemon.hp === pokemon.maxhp) return priority + 1;
		},
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (source.hp === source.maxhp || source.hp <= source.maxhp / 3) return;
			if (move.flags['slicing']) {
				this.boost({def: 1}, source);
			}
		},
		onSourceAfterSubDamage(damage, target, source, move) { // should still activate when targeting a Substitute
			if (!move || !target) return;
			if (source.hp === source.maxhp || source.hp <= source.maxhp / 3) return;
			if (move.flags['slicing']) {
				this.boost({def: 1}, source);
			}
		},
		onModifyCritRatio(critRatio, source, target, move) {
			if (move.flags['slicing'] && source.hp <= source.maxhp / 3) return 5;
		},
		name: "Fendente",
		rating: 3,
		num: -24,
	},
	canopy: { // for Aumooras
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Canopy boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Canopy boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Canopy",
		longDesc: `Powers up Grass-type moves. <i>(30% boost)</i>`,
		shortDesc: "Boosts Grass-type moves by 1.3x.",
		rating: 3,
		num: -25,
	},
	powersurge: { // for Tapu Kiki
		onStart(pokemon) {
			if (this.field.terrain) {
				this.add('-ability', pokemon, 'Power Surge');
				this.field.clearTerrain();
				for (const target of pokemon.side.active) {
					target.addVolatile('powersurge');
				}
			}
		},
		condition: {
			onStart(pokemon, source, effect) {
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} is boosted by Power Surge!`);
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				this.debug('Power Surge boost');
				return this.chainModify([5325, 4096]);
			},
			onMoveAborted(pokemon, target, move) {
				pokemon.removeVolatile('powersurge');
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name}'s Power Surge fizzled out!`);
			},
			onAfterMove(pokemon, target, move) {
				pokemon.removeVolatile('powersurge');
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} used up its Power Surge!`);
			},
		},
		name: "Power Surge",
		longDesc: `The Pokémon instantly eliminates all effects of terrain.<br>Eliminating the effects of a terrain also powers up the next move used by the Pokémon and its partner. <i>(1.3x; each one gets one boost)</i>`,
		shortDesc: "Eliminates terrain on entry -> 1.3x each ally's next move.",
		rating: 3,
		num: -26,
	},
	slimetime: { // for Mr. Slime
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.active) {
				if (!activated) {
					this.add('-ability', pokemon, 'Slime Time', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -2}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Slime Time",
		longDesc: `When the Pokémon enters a battle, it covers its team in silly slime, harshly lowering their Speed stats.​`,
		shortDesc: "Harshly lowers own side's Speed on entry.",
		rating: -1,
		num: -27,
	},
	inspirit: { // for Johtonian Shiftry
		longDesc: `When the Pokémon enters a battle, it attempts to switch types with its ally.<br>If successful, it also raises one of its stats based on the ally's most proficient stat.​`,
		shortDesc: "On switch-in: swaps type with ally, boosts a stat based on ally's best.",
		onStart(pokemon) {
			if (pokemon.species && (pokemon.species.num === 493 || pokemon.species.num === 773)) return;
			if (pokemon.terastallized) return;
			for (const ally of pokemon.adjacentAllies()) {
				// see if you can swap types
				if (ally.species && (ally.species.num === 493 || ally.species.num === 773)) continue;
				if (ally.terastallized) continue;

				// figure out the types
				let newAllyBaseTypes = pokemon.getTypes(true).filter(type => type !== '???');
				let newAllyAddedType = pokemon.addedType;
				let newSourceBaseTypes = ally.getTypes(true).filter(type => type !== '???');
				let newSourceAddedType = ally.addedType;

				// reject typelessness
				if (!newSourceBaseTypes.length) {
					if (ally.addedType) {
						newSourceBaseTypes = ['Normal'];
					} else {
						continue;
					}
				}
				if (!newAllyBaseTypes.length) {
					if (pokemon.addedType) {
						newAllyBaseTypes = ['Normal'];
					} else {
						continue;
					}
				}

				// all checks passed, so change type now
				this.add('-ability', pokemon, 'Inspirit');
				this.add('-message', `${pokemon.name} switched types with its partner!`);

				pokemon.setType(newSourceBaseTypes);
				pokemon.addedType = newSourceAddedType;
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');

				ally.setType(newAllyBaseTypes);
				ally.addedType = newAllyAddedType;
				this.add('-start', ally, 'typechange', ally.getTypes(true).join('/'), '[silent]');

				// and... this is just easier okay ;-;
				pokemon.knownType = true;
				ally.knownType = true;

				const bestStat = ally.getBestStat(false, true);
				this.boost({[bestStat]: 1}, pokemon, null, true);

				// not that it matters right now, but let's only do it once in Triples or similar
				break;
			}
		},
		flags: {},
		name: "Inspirit",
		rating: 0, // Showdown does this if there's no singles effect so I guess I should match it
		num: -28,
	},
	noblepotential: { // for Zavender
		longDesc: `Boosts the Pokémon’s most proficient stat the first time the Pokémon enters a battle.`,
		shortDesc: "On switch-in, this Pokémon's highest stat is raised by 1 stage. Once per battle.",
		onStart(pokemon) {
			if (pokemon.nobleBoost) return;
			pokemon.nobleBoost = true;
			const bestStat = pokemon.getBestStat(true, true);
			this.boost({[bestStat]: 1}, pokemon);
		},
		flags: {},
		name: "Noble Potential",
		rating: 3.5,
		num: -29,
	},
	batteryleak: { // for Chained Charjabug and Charjouleak
		longDesc: `Contact with the Pokémon may badly poison the attacker. <i>(30% chance)</i>`,
		shortDesc: "30% chance a Pokémon making contact with this Pokémon will be badly poisoned.",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('tox', target);
				}
			}
		},
		flags: {},
		name: "Battery Leak",
		rating: 2,
		num: -30,
	},
	twominded: { // copied from M4A; for the Riboxys family
		desc: "When this Pokémon's Attack is modified, its Special Attack is modified in the opposite way, and vice versa. The same is true for its Defense and Special Defense.",
		longDesc: `When the Pokémon's Attack stat or Sp. Atk stat is raised or lowered, the other stat is affected in the opposite way.<br>Also, when the Pokémon's Defense stat or Sp. Def stat is raised or lowered, the other stat is affected in the opposite way.`,
		shortDesc: "Applies the opposite of stat changes to the opposite stat (Atk/Sp. Atk, Def/Sp. Def).",
		onAfterBoost(boost, target, source, effect) {
			if (!boost || effect.id === 'twominded') return;
			let activated = false;
			const twoMindedBoost: SparseBoostsTable = {};
			if (boost.spa) {
				twoMindedBoost.atk = -1 * boost.spa;
				activated = true;
			}
			if (boost.spd) {
				twoMindedBoost.def = -1 * boost.spd;
				activated = true;
			}
			if (boost.atk) {
				twoMindedBoost.spa = -1 * boost.atk;
				activated = true;
			}
			if (boost.def) {
				twoMindedBoost.spd = -1 * boost.def;
				activated = true;
			}
			if (activated === true) {
				this.add('-ability', target, 'Two-Minded');
				this.boost(twoMindedBoost, target, target, null, true);
			}
		},
		name: "Two-Minded",
		rating: 4,
		num: -31,
	},
	archetype: { // for Spirited Away
		longDesc: `Each time the Pokémon lowers the stats of another Pokémon, its own stats will be boosted by the same amount.`,
		shortDesc: "Lowering a target's stat boosts this Pokémon the same amount.",
		onAnyAfterBoost(boost, target, source, effect) {
			const pokemon = this.effectState.target;
			if (pokemon === target || pokemon !== source) return;
			const positiveBoosts: Partial<BoostsTable> = {};
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					positiveBoosts[i] = -1 * boost[i];
				}
			}
			if (Object.keys(positiveBoosts).length < 1) return;
			this.boost(positiveBoosts, pokemon);
		},
		flags: {},
		name: "Archetype",
		rating: 3,
		num: -32,
	},
	disengage: { // for Narcissopod
		longDesc: `The Pokémon, avoiding conflict, switches out when its HP drops to half or less.`,
		shortDesc: "This Pokémon switches out when it reaches 1/2 or less of its maximum HP.",
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Disengage');
		},
		name: "Disengage",
		rating: 1,
		num: -33,
	},
	

// modded canon Abilities

	zenmode: { // modded for Kalosian Qwilfish line
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.transformed) return;
			if (!(['darmanitan', 'darmanitanzen', 'darmanitangalar', 'darmanitangalarzen', 'qwilfishkalos', 'qwilfishkaloszen', 'overchill', 'overchillzen'].includes(pokemon.species.id))) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Zen', 'Galar-Zen', 'Kalos-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Zen', 'Galar-Zen', 'Kalos-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (['darmanitan', 'darmanitanzen', 'darmanitangalar', 'darmanitangalarzen', 'qwilfishkalos', 'qwilfishkaloszen', 'overchill', 'overchillzen'].includes(pokemon.species.id) && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.species.id === 'darmanitan') pokemon.formeChange('Darmanitan-Zen');
				if (pokemon.species.id === 'darmanitangalar') pokemon.formeChange('Darmanitan-Galar-Zen');
				if (pokemon.species.id === 'qwilfishkalos') {
					pokemon.formeChange('Qwilfish-Kalos-Zen');
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
					if (!this.effectState.busted) {
						this.runEvent('DataMod', pokemon);
						this.effectState.busted = true;
					}
				}
				if (pokemon.species.id === 'overchill') {
					pokemon.formeChange('Overchill-Zen');
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
					if (!this.effectState.busted) {
						this.runEvent('DataMod', pokemon);
						this.effectState.busted = true;
					}
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen', 'Kalos-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
					this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				}
			},
		},
	},
};
