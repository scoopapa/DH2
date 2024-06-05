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
	witheringgaze: {
		onAnyTryMove(this, source, target, move) {
			if (source === this.effectState.target) return;
			if (move.id === 'uturn' || move.id === 'voltswitch' || move.id === 'teleport' || move.id === 'partingshot' || move.id === 'migratingwing' ) {
				this.add('-fail', source, 'ability: Withering Gaze', '[of] ' + this.effectState.target);
				return false;
			}
		},
		name: "Withering Gaze",
		shortDesc: "While active, Pokemon without this ability cannot pivot out.",
		rating: 3,
		num: 3000,
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
		shortDesc: "User deals 1.5x more damage to opponents hurt this turn.",
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
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Flying')
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
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
		flags: {},
		name: "Pale Winds",
		rating: 1,
		num: 127,
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
