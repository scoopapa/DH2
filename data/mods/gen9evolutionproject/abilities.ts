export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	eruptive: { // Volcanic Aurorus
		onDamagingHit(damage, target, source, move) {
			if (target.volatiles['twoturnmove'] && (target.volatiles['twoturnmove'].duration > 1 || this.queue.willMove(target))) {
				source.trySetStatus('brn', target);
			}
		},
		flags: {},
		name: "Eruptive",
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
		shortDesc: "Hit by Dark moves: halves damage, swaps items before hit.",
		rating: 3,
		num: -23,
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
