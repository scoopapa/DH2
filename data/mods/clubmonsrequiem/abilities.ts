export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	heatproof: {
		inherit: true,
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk() {},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA() {},
		onDamage() {},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				this.add('-immune', target, '[from] ability: Heatproof');
				return null;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Heatproof');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Heatproof');
			}
			return false;
		},
		shortDesc: "This Pokemon cannot be hit by Fire moves or be burned.",
	},
	forecast: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Cyclonimbus' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'cyclonimbussunny') forme = 'Cyclonimbus-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'cyclonimbusrainy') forme = 'Cyclonimbus-Rainy';
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'cyclonimbussnowy') forme = 'Cyclonimbus-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'cyclonimbus') forme = 'Cyclonimbus';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		name: "Forecast",
		shortDesc: "If Cyclonimbus, change form in weather.",
		rating: 2,
		num: 59,
	},
	witheringgaze: {
		onAnyTryMove(this, source, target, move) {
			if (source === this.effectState.target) return;
			if (move.id === 'uturn' || move.id === 'voltswitch' || move.id === 'teleport' || move.id === 'partingshot' || move.id === 'migratingwing' ) {
				this.add('-fail', source, 'ability: Withering Gaze', '[of] ' + this.effectState.target);
				this.add('-ability', target, 'Withering Gaze');
				return false;
			}
		},
		name: "Withering Gaze",
		shortDesc: "While active, Pokemon without this ability cannot pivot out.",
		rating: 3,
		num: 3000,
	},
	psychovalence: {
		onStart(pokemon) {
			this.add('-start', pokemon, 'ability: Psychovalence');
			pokemon.addVolatile('magnetrise');
		},
		onSwitchOut(pokemon) {
			if (pokemon?.volatiles['magnetrise']) {
				pokemon.heal(pokemon.baseMaxhp / 3);
			}
		},
		name: "Psychovalence",
		shortDesc: "Sets Magnet Rise; if Magnet Rise is still active on switch-out, heal 1/3 HP.",
		rating: 3,
		num: 3000,
	},
	thermalexpansion: {
		onDamage(damage, target, source, effect) {
			if (!target.hasType('Ice')) return;
			if (effect && effect.id === 'stealthrock') {
				target.setType(target.getTypes(true).map(type => type === "Ice" ? "???" : type));
				this.add('-start', target, 'typechange', target.getTypes().join('/'));
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (!target.hasType('Ice')) return;
			if (move.type === 'Rock') {
				this.add('-immune', target, '[from] ability: Thermal Expansion');
				target.setType(target.getTypes(true).map(type => type === "Ice" ? "???" : type));
				this.add('-start', target, 'typechange', target.getTypes().join('/'));
				return null;
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (target.hasType('Ice')) return;
			if (!target.addType('Ice')) return false;
			if (effect.id === 'hail') {
				this.add('-start', target, 'typeadd', 'Ice', '[from] ability: Thermal Expansion');
			}
		},
		flags: {},
		name: "Thermal Expansion",
		shortDesc: "If user is Ice-type, immunity to Stealth Rock and Rock-type moves. On immunity, lose Ice-type. Regain in Hail or switch.",
		rating: 4,
		num: 182,
	},
	magician: {
   	onStart(pokemon, move) {
			if (pokemon.hp === pokemon.maxhp) {
	      	const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
	         if (!target || !pokemon.m.previousPartner) return;
	         const previousPartner = pokemon.m.previousPartner;
	
	         const yourItem = target.takeItem(pokemon);
	         const myItem = previousPartner.takeItem();
	         if (target.item || previousPartner.item || (!yourItem && !myItem)) {
	         	if (yourItem) target.item = yourItem.id;
	            if (myItem) previousPartner.item = myItem.id;
	            return;
	         } // from Trick: canceling out if either item can't be swapped
	         if (
	            (myItem && !this.singleEvent('TakeItem', myItem, previousPartner.itemState, target, previousPartner, move, myItem)) ||
	            (yourItem && !this.singleEvent('TakeItem', yourItem, target.itemState, previousPartner, target, move, yourItem))
	         ) {
	            if (yourItem) target.item = yourItem.id;
	            if (myItem) previousPartner.item = myItem.id;
	                return;
	         }
				if (!myItem.id && !yourItem.id) {
					return;
				} else {
					this.add('-ability', pokemon, 'Magician');
					this.add('-activate', previousPartner, 'move: Trick', '[of] ' + target); // I don't know exactly what this display looks like but I think it should still be Trick
				}
				if (myItem) {
					if (!myItem.id && !yourItem.id) return;
					if (!yourItem.id) {
						this.add('-message', `${target.name} was magically given ${previousPartner.name}'s ${myItem}!`);
					} else if (!myItem.id) {
						this.add('-message', `${previousPartner.name} was magically given ${target.name}'s ${yourItem}!`);
					} else {
						this.add('-message', `${previousPartner.name} was magically given ${target.name}'s ${yourItem}, and ${target.name} received ${previousPartner.name}'s ${myItem}!`);
					}
					this.add('-item', pokemon, yourItem, '[silent]', '[from] ability: Magician', '[of] ' + target);
					this.add('-enditem', target, yourItem, '[silent]', '[from] ability: Magician', '[of] ' + pokemon);
					target.setItem(myItem);
				}
	
	         if (yourItem) {
	            previousPartner.item = yourItem; // not safe to use setItem for Pokémon not on the field
	            this.add('-item', previousPartner, yourItem, '[silent]', '[from] ability: Magician', '[of] ' + pokemon);
	         } else {
	            this.add('-enditem', previousPartner, myItem, '[silent]', '[from] ability: Magician', '[of] ' + pokemon);
	         }
			}
		},
      flags: {},
      name: "Magician",
		shortDesc: "On entry, the opponent's item is swapped with that of the previous Pokemon if the user has full HP.",
      rating: 5, // god-tier
      num: 170,
   },
	territorial: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.hurtThisTurn) {
				this.debug('Territorial boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (defender.hurtThisTurn) {
				this.debug('Territorial boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Territorial",
		shortDesc: "User deals 1.5x more damage to opponents already hurt this turn.",
		rating: 3.5,
		num: 276,
	},
	rockypayload: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
		onSourceAccuracy(accuracy, target, source, move) {
			if (!move.ohko && move.type === 'Rock') {
				if (typeof accuracy === 'number') {
					return this.chainModify([4505, 4096]);
				}
			}
		},
		flags: {},
		name: "Rocky Payload",
		shortDesc: "Rock-type moves receive a 1.5x boost in power, and 1.1x more accuracy.",
		rating: 3.5,
		num: 276,
	},
	rockbeak: {
		/*
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Flying') {
					!((move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
					move.type = 'Rock';
					move.typeChangerBoosted = this.effect;
				}
			}
		}, */
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Flying' && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Rock';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Rock Beak",
		shortDesc: "Flying-type moves become Rock-type, and boosts them by 1.2x.",
		rating: 4,
		num: 182,
	},
	fauxliage: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' || move.type === 'Ground' || move.type === 'Electric' || move.type === 'Water') {
				this.debug('Fauxliage weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' || move.type === 'Ground' || move.type === 'Electric' || move.type === 'Water') {
				this.debug('Fauxliage weaken');
				return this.chainModify(0.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'powder') return false;
		},
		onTryHit(pokemon, source, move) {
			if (move.flags['powder'] && pokemon !== source && this.dex.getImmunity('powder', pokemon)) {
				this.add('-activate', pokemon, 'ability: Fauxliage', move.name);
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Fauxliage",
		shortDesc: "User takes 1/2 damage from Grass-resisted types and is immune to powder/spore moves.",
		num: 1001,
	},
	palewinds: {
		onStart(pokemon) {
    		if (this.field.isWeather('hail')) {
				this.add('-ability', pokemon, 'Pale Winds');
				this.add('-message', `The winds are howling!`);
			}
		},
		onWeatherChange(pokemon, source, sourceEffect) {
		    if (this.field.isWeather('hail')) {
		        this.add('-ability', pokemon, 'Pale Winds');
		        this.add('-message', `The winds are howling!`);
    		}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		flags: {},
		name: "Pale Winds",
		shortDesc: "Hail damage is doubled on affected targets.",
		rating: 1,
		num: 127,
	},
	stancechange: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Falinks' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'spikyshield') return;
			const targetForme = (move.id === 'spikyshield' ? 'Falinks' : 'Falinks-Hammer');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Stance Change",
		shortDesc: "If Falinks, switch to Hammer when attacking, and Column on Spiky Shield.",
		rating: 4,
		num: 176,
	},
	condensedsnow: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Condensed Snow neutralize');
				return this.chainModify(0.75);
			}
			if (this.field.isWeather(['hail', 'snow'])) {
				this.debug('Condensed Snow neutralize');
				return this.chainModify(0.75);
			}
		},
		flags: {breakable: 1},
		name: "Condensed Snow",
		shortDesc: "Super effective moves do 0.75x. All moves do 0.75x in Hail. These multipliers stack.",
		rating: 3,
		num: 111,
	},
	shellarmor: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedShellArmor = false;
			} else {
				this.effectState.checkedShellArmor = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedShellArmor;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedShellArmor = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({def: 1}, target, target);
			}
		},
		flags: {},
		name: "Shell Armor",
		shortDesc: "This Pokemon's Defense is raised by 1 when it is directly hit to 1/2 or less of its max HP.",
		rating: 1,
		num: 75,
	},
	windrider: {
		inherit: true,
		onSourceTryPrimaryHit(target, source, effect) {
			if (effect?.id === 'defog') {
				this.boost({atk: 1}, source);
			}
		},
	},
	snowwarning: {
		inherit: true,
		onStart(source) {
			this.field.setWeather('hail');
		},
		shortDesc: "On switch-in, this Pokemon summons Hail.",
	},
	rewind: {
		onSwitchOut(pokemon) {
			if (pokemon.item || !pokemon.lastItem) return;
			const item = pokemon.lastItem;
			pokemon.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] ability: Rewind');
			pokemon.setItem(item);
		},
		flags: {},
		name: "Rewind",
		shortDesc: "Upon switching out, This Pokemon restores its consumed item.",
		rating: 2.5,
		num: 1002,
	},
};
