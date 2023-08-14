export const Abilities: {[k: string]: ModdedAbilityData} = {

	success: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length}, source);
			}
		},
		name: "Success",
		desc: "This Pokémon's Speed is raised by 1 stage if it attacks and KOes another Pokémon.",
		rating: 3,
		num: 10000,
	},
	hotknife: {
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'brn',
				ability: this.dex.abilities.get('hotknife'),
			});
		},
		name: "Hot Knife",
		desc: "This Pokémon's Contact moves have a 30% chance of burning.",
		rating: 2,
		num: 10001,
	},
	openmind: {
		onModifySpe(spe) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(2);
			}
		},
		name: "Open Mind",
		desc: "If Psychic Terrain is active, this Pokémon's speed is doubled.",
		rating: 3,
		num: 10002,
	},
	voidbody: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.add('-ability', target, 'Void Body');
				this.boost({atk: -1}, source, target, null, true);
			}
		},
		name: "Void Body",
		desc: "Pokémon making contact with this Pokémon have their Attack lowered by 1 stage.",
		rating: 2,
		num: 10003,
	},
	frightening: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Frightening', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Frightening",
		desc: "On switch-in, this Pokémon lowers the SpA of opponents by 1 stage.",
		rating: 3.5,
		num: 10004,
	},
	eternalice: {
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
			if (move.type === 'Ice') {
				return this.chainModify(1.3);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.3);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Eternal Ice');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Eternal Ice');
			}
			return false;
		},
		name: "Eternal Ice",
		desc: "This Pokémon's Ice power is 1.3x; It can't be burned; Fire power against it is halved.",
		rating: 4.5,
		num: 10005,
	},
	leecher: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['heal']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([0x14CC, 0x1000]);
			}
		},
		name: "Leecher",
		desc: "Healing moves Heal for 1.3x HP and Draining moves are 1.3 stronger.",
		rating: 3.5,
		num: 10006,
	},
	airionizer: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Air Ionizer');
				}
				return null;
			}
		},
		name: "Air Ionizer",
		desc: "This Pokémon SpA is raised 1 stage if hit by a Flying move; Flying immunity.",
		rating: 3,
		num: 10007,
	},
	deepsea: {
		onModifyDef(def, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpD(spd, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Deep Sea",
		desc: "If Rain is active, this Pokemon's Defense and Special defense are 1.5x.",
		rating: 3,
		num: 10008,
	},
	leafplates: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Water') mod /= 2;
			if (move.type === 'Ice') mod /= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		name: "Leaf Plates",
		desc: "Halves damage from contact moves, and any Ice or Water move.",
		rating: 3.5,
		num: 10009,
	},
	storm: {
		onDamagingHit(damage, target, source, move) {
			if (this.field.getWeather().id !== 'hail') {
				this.field.setWeather('hail');
			}
		},
		name: "Storm",
		desc: "When this Pokemon is hit by an attack, the effect of Hail begins.",
		rating: 2,
		num: 10010,
	},
	protectivepelt: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		name: "Protective Pelt",
		desc: "Halves damage from special moves.",
		rating: 4,
		num: 10011,
	},

	royalhoney: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod /= 2;
			if (move.type === 'Rock') mod /= 2;
			if (move.type === 'Flying') mod /= 2;
			return this.chainModify(mod);
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		isBreakable: true,
		name: "Royal Honey",
		desc: "Halves the damage from moves super effective on Bug-Type. Heals 1/16 HP each turn.",
		rating: 3.5,
		num: 10012,
	},

	revitalizingrain: {
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		name: "Revitalizing Rain",
		desc: "On switch-in, this Pokemon summons Rain Dance. During Rain, Heals 1/8 HP each turn.",
		rating: 4,
		num: 10013,
	},

	stickyseeds: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			this.damage(source.baseMaxhp / 8, source, target);
			this.heal(source.baseMaxhp / 8, target, source);
		},
		name: "Sticky Seeds",
		desc: "Drains 1/8 HP on being hit.",
		rating: 2.5,
		num: 10014,
	},

	malware: {
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'SurivExe' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Virus'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('malware');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Virus'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('malware');
				pokemon.removeVolatile('malware');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.species.id !== 'surivexevirus') pokemon.formeChange('SurivExe-Virus');
			},
		},
		isPermanent: true,
		name: "Malware",
		desc: "If SurivExe, at end of turn changes Mode to Virus if < 1/2 max HP.",
		rating: 0,
		num: 10015,
	},

	airborne: {
		onUpdate(pokemon) {
			if (pokemon.hasType('Flying')) return false;
			if (!pokemon.addType('Flying')) return false;
			this.add('-start', pokemon, 'typeadd', 'Flying', '[from] move: Airborne');
		},
		name: "Airborne",
		desc: "Takes fly and become Flying-Type.",
		rating: 3.5,
		num: 10016,
	},

	archery: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (!move.flags['contact']) {
				if (move.category === 'Physical') {
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		name: "Archery",
		desc: "Non-contact Physical moves have 1.3x power.",
		rating: 3.5,
		num: 10017,
	},

	insectmovement: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Bug' && pokemon.hp === pokemon.maxhp) return priority + 2;
		},
		name: "Insect Movement",
		desc: "Bug-Type moves have +2 priority while at full HP.",
		rating: 3,
		num: 10018,
	},

	cockatricedominance: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (defender && ['par'].includes(defender.status)) {
				return this.chainModify(1.5);
			}
		},
		name: "Cockatrice Dominance",
		desc: "Deals 1.5x damage against paralyzed opponents.",
		rating: 1.5,
		num: 10019,
	},

	indestructible: {
		onCriticalHit: false,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fighting') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Indestructible');
				}
				return null;
			}
		},
		name: "Indestructible",
		desc: "Can't be struck by a crit or Fighting-Type move. +1 Atk if hit by a Fighting move.",
		rating: 1,
		num: 10020,
	},

	lifejacket: {
		onCriticalHit: false,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spd: 1})) {
					this.add('-immune', target, '[from] ability: Life Jacket');
				}
				return null;
			}
		},
		name: "Life Jacket",
		desc: "Prevents crits and Water-Type moves. +1 SpD if hit by a Water move.",
		rating: 3,
		num: 10021,
	},

	thermalfrenzy: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water' || target !== source && move.type === 'Ice' || target !== source && move.type === 'Fire') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Thermal Frenzy');
				}
				return null;
			}
		},
		name: "Thermal Frenzy",
		desc: "Heals 1/4 max HP when hit by Water/Ice/Fire moves and is immune to them.",
		rating: 3.5,
		num: 10022,
	},

	boast: {
		onTryHit(target, source, move) {
			if (move.target !== 'self' && move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Boast');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectState.target, '[from] ability: Boast');
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.flags['sound']) return priority + 1;
		},
		name: "Boast",
		desc: "This Pokemon's sound moves have their priority increased by 1. Sound immunity.",
		rating: 3.5,
		num: 10023,
	},

	toxicreaction: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (defender && ['psn'].includes(defender.status)) {
				return this.chainModify(1.7);
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			if (defender && ['tox'].includes(defender.status)) {
				return this.chainModify(1.4);
			}
		},
		name: "Toxic Reaction",
		desc: "Deals 1.7x damage against poisoned opponents. Only 1.4x if Badly poison.",
		rating: 1.5,
		num: 10024,
	},

	primalmind: {
		onModifySpD(spd) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(1.2);
			}
		},
		onModifySpA(spa) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(1.2);
			}
		},
		name: "Primal Mind",
		desc: "If Psychic Terrain is active, this Pokemon gets 1.2 SpA and SpD.",
		rating: 3,
		num: 10025,
	},

	meteorpower: {
		onModifyDef(def) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.2);
			}
		},
		onModifyAtk(atk) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.2);
			}
		},
		name: "Meteor Power",
		desc: "This Pokémon gets 1.2 Atk and Def during a Sandstorm.",
		rating: 3,
		num: 10026,
	},

	miceadaptation: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass' || target !== source && move.type === 'Water') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Mice Adaptation');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectState.target || target.side !== source.side) return;
			if (move.type === 'Grass' || move.type === 'Water') {
				this.boost({atk: 1}, this.effectState.target);
			}
		},
		name: "Mice Adaptation",
		desc: "+1 Atk if hit by a Grass or Water move; Grass and Water immunity.",
		rating: 3,
		num: 10027,
	},

	scary: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Scary', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1, spa: -1, spe: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Scary",
		desc: "On switch-in, this Pokémon lowers the Atk/SpA/Spe of opponents by 1 stage.",
		rating: 3.5,
		num: 10028,
	},

	guardianoftheswamp: {
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Guardian of the Swamp');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Guardian of the Swamp');
			}
			return false;
		},
		onModifyCritRatio(critRatio, user) {
			if (['raindance', 'primordialsea'].includes(user.effectiveWeather())) {
				return critRatio + 3;
			}
		},
		name: "Guardian of the Swamp",
		desc: "Can't be poisoned. Always Crit in Rain.",
		rating: 2,
		num: 10029,
	},

	guardianofthewoods: {
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Guardian of the Woods');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Guardian of the Woods');
			}
			return false;
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Guardian of the Woods",
		desc: "Can't be burned. 1.5x Atk in Sunny Day.",
		rating: 2,
		num: 10030,
	},

	guardianoftheruins: {
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Guardian of the Ruins');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'frz') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Guardian of the Ruins');
			}
			return false;
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['sandstorm'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.2);
			}
		},
		onModifyCritRatio(critRatio, user) {
			if (['sandstorm'].includes(user.effectiveWeather())) {
				return critRatio + 2;
			}
		},
		name: "Guardian of the Ruins",
		desc: "Can't be frozen. 1.2x Atk and +2 Crit in Sandstorm.",
		rating: 2,
		num: 10031,
	},

	greatshield: {
		onCriticalHit: false,
		onTryHit(pokemon, target, move) {
			if (move.flags['bullet']) {
				this.add('-immune', pokemon, '[from] ability: Great Shield');
				return null;
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Great Shield",
		desc: "Immune to Bullets and can't be crit. Deals 1/8 max HP on contact.",
		rating: 3,
		num: 10032,
	},

	darkeater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dark Eater');
				}
				return null;
			}
		},
		name: "Dark Eater",
		desc: "This Pokemon heals 1/4 of its max HP when hit by Dark moves; Dark immunity.",
		rating: 3.5,
		num: 10033,
	},

	coldheart: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Cold Heart');
				}
				return null;
			}
		},
		name: "Cold Heart",
		desc: "This Pokemon heals 1/4 of its max HP when hit by Ice moves; Ice immunity.",
		rating: 3.5,
		num: 10034,
	},

	permafrost: {
		onModifyAtk(atk) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.2);
			}
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		name: "Permafrost",
		desc: "1.2 Atk on Hail and heals 1/16 of its max HP each turn.",
		rating: 2,
		num: 10035,
	},
	spiritoftheswamp: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Spirit of the Swamp');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Spirit of the Swamp');
				return null;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Spirit of the Swamp boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Spirit of the Swamp boost');
				return this.chainModify(1.5);
			}
		},
		name: "Spirit of the Swamp",
		desc: "Can't be statused. 1.5x Bug-Type Damage.",
		rating: 2,
		num: 10036,
	},

	spiritofthewoods: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Spirit of the Woods');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Spirit of the Woods');
				return null;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Spirit of the Woods boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Spirit of the Woods boost');
				return this.chainModify(1.5);
			}
		},
		name: "Spirit of the Woods",
		desc: "Can't be statused. 1.5x Flying-Type Damage.",
		rating: 2,
		num: 10037,
	},

	spiritoftheruins: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Spirit of the Ruins');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Spirit of the Ruins');
				return null;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				this.debug('Spirit of the Ruins boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				this.debug('Spirit of the Ruins boost');
				return this.chainModify(1.5);
			}
		},
		name: "Spirit of the Ruins",
		desc: "Can't be statused. 1.5x Ground-Type Damage.",
		rating: 2,
		num: 10038,
	},

	charged: {
		onModifySpe(spe) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.2);
			}
		},
		onModifySpD(spd) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.2);
			}
		},
		name: "Charged",
		desc: "1.2x Speed and Special Defense on Electric Terrain.",
		rating: 2,
		num: 10039,
	},

	contagious: {
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove(move) {
			if (!move || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'frz',
				ability: this.dex.abilities.get('contagious'),
			});
		},
		name: "Contagious",
		desc: "This Pokemon's moves have a 30% chance of freezing.",
		rating: 2,
		num: 10040,
	},

	frozendebris: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const iceTrap = side.sideConditions['icetrap'];
			if (move.category === 'Physical' && (!iceTrap || iceTrap.layers < 1)) {
				this.add('-activate', target, 'ability: Frozen Debris');
				side.addSideCondition('icetrap', target);
			}
		},
		name: "Frozen Debris",
		desc: "If this Pokemon is hit by a physical attack, Ice Trap is set on the opposing side.",
		rating: 3.5,
		num: 10041,
	},

	climber: {
		name: "Climber",
		desc: "Removes hazards affecting the team from the field on switch-in.",
		rating: 3.5,
		num: 10042,
	},

	// gen 9 stuff
	sharpness: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Shapness boost');
				return this.chainModify(1.5);
			}
		},
		name: "Sharpness",
		desc: "This Pokemon's slicing moves have their power multiplied by 1.5.",
		rating: 3.5,
		num: 292,
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
		desc: "This Pokemon heals 1/4 of its max HP when hit by Ground moves; Ground immunity.",
		rating: 3.5,
		num: 297,
	},

	windrider: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({atk: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Rider');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		name: "Wind Rider",
		desc: "Attack raised by 1 if hit by a wind move or Tailwind begins. Wind move immunity.",
		rating: 3.5,
		// We do not want Brambleghast to get Infiltrator in Randbats
		num: 274,
	},

	wellbakedbody: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Well-Baked Body",
		desc: "This Pokemon's Defense is raised 2 stages if hit by a Fire move; Fire immunity.",
		rating: 3.5,
		num: 273,
	},

	angershell: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedAngerShell = false;
			} else {
				this.effectState.checkedAngerShell = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1, spe: 1, def: -1, spd: -1}, target, target);
			}
		},
		name: "Anger Shell",
		desc: "At 1/2 or less of this Pokemon's max HP: +1 Atk, Sp. Atk, Spe, and -1 Def, Sp. Def.",
		rating: 4,
		num: 271,
	},

	lingeringaroma: {
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.isPermanent || sourceAbility.id === 'lingeringaroma') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('lingeringaroma', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Lingering Aroma', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		name: "Lingering Aroma",
		desc: "Making contact with this Pokemon has the attacker's Ability become Lingering Aroma.",
		rating: 2,
		num: 268,
	},

	guarddog: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Guard Dog');
			return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.boost({atk: 1}, target, target, null, false, true);
			}
		},
		name: "Guard Dog",
		desc: "Immune to Intimidate. Intimidated: +1 Attack. Cannot be forced to switch out.",
		rating: 2,
		num: 275,
	},

	cudchew: {
		onEatItem(item, pokemon) {
			if (item.isBerry && pokemon.addVolatile('cudchew')) {
				pokemon.volatiles['cudchew'].berry = item;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['cudchew'];
		},
		condition: {
			noCopy: true,
			duration: 2,
			onRestart() {
				this.effectState.duration = 2;
			},
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onEnd(pokemon) {
				if (pokemon.hp) {
					const item = this.effectState.berry;
					this.add('-activate', pokemon, 'ability: Cud Chew');
					this.add('-enditem', pokemon, item.name, '[eat]');
					if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
					}
					if (item.onEat) pokemon.ateBerry = true;
				}
			},
		},
		name: "Cud Chew",
		desc: "If this Pokemon eats a Berry, it will eat that Berry again at the end of the next turn.",
		rating: 2,
		num: 291,
	},
};
