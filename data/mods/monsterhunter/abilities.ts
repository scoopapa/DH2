export const Abilities: import('../sim/dex-abilities').AbilityDataTable = {
	poisonpuppeteer: {
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source.baseSpecies.name !== "Chameleos") return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('confusion');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Poison Puppeteer",
		shortDesc: "Chameleos: If this Pokemon poisons a target, the target also becomes confused.",
		rating: 3,
		num: 310,
	},
	direspikescales: {
		onEffectiveness(typeMod, target, type, move) {
			if (!target || target.species.name !== 'Dalamadur') return;
			if (this.effectState.resisted) return -1; // all hits of multi-hit move should be not very effective
			if (move.category === 'Status' || move.id === 'struggle') return;
			if (!target.runImmunity(move.type)) return; // immunity has priority
			if (target.hp < target.maxhp) return;

			this.add('-activate', target, 'ability: Direspike Scales');
			this.effectState.resisted = true;
			return -1;
		},
		onAnyAfterMove() {
			this.effectState.resisted = false;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, breakable: 1},
		name: "Direspike Scales",
		shortDesc: "Dalamadur: If full HP, attacks taken have 0.5 effectiveness unless naturally immune.",
		rating: 3.5,
		num: 308,
	},
	icearmor: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical' && target.species.id === 'zamtrios') {
					this.add('-ability', target, 'Ice-Armor');
					this.add('-message', `Zamtrios is transforming!`);
					target.formeChange('zamtriosiced', this.effect, true);
				}
			},
			onStart(pokemon) {
				if (this.field.isWeather(['hail', 'snow']) && pokemon.species.id === 'zamtrios') {
					this.add('-ability', pokemon, 'Ice-Armor');
					this.add('-message', `Zamtrios is transforming!`);
					pokemon.formeChange('zamtriosiced', this.effect, true);
				}
			},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, 
			notransform: 1},
		name: "Ice-Armor",
		shortDesc: "This pokemon will react to a physical attack by encasing it's body in ice. Also activates under Snow.",
		rating: 3,
		num: 1000,
	},
	puffup: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special' && target.species.id === 'zamtrios') {
					this.add('-ability', target, 'Puff-Up');
					this.add('-message', `Zamtrios is transforming!`);
					target.formeChange('zamtriospuffed', this.effect, true);
				}
			},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, 
			notransform: 1},
		name: "Puff-Up",
		shortDesc: "This pokemon will react to a special attack by puffing up it's body.",
		rating: 3,
		num: 1001,
	},
	debris: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const Spikes = side.sideConditions['spikes'];
			if (move.category === 'Physical' && (!Spikes || Spikes.layers < 3)) {
				this.add('-activate', target, 'ability: Debris');
				side.addSideCondition('spikes', target);
			}
		},
		flags: {},
		name: "Debris",
		shortDesc: "If this pokemon is hit by a physical attack, Spikes are set on the opposing side.",
		rating: 3.5,
		num: 1002,
	},
	solarwrath: {
		onModifyAtkPriority: 5,
		onModifyAtk(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: {},
		name: "Solar Wrath",
		shortDesc: "If Sunny Day is active, this Pokemon's Atk is 1.5x; loses 1/8 max HP per turn.",
		rating: 2,
		num: 1003,
	},
	tempestenergy: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind'] || this.field.isWeather('sandstorm')) {
				this.boost({ spa: 1 }, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({ spa: 1 }, target, target)) {
					this.add('-immune', target, '[from] ability: Tempest Energy');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind' || this.field.isWeather('sandstorm')) {
				this.boost({ spa: 1 }, pokemon, pokemon);
			}
		},
		flags: {},
		rating: 1,
		desc: "This Pokemon is immune to wind moves and raises its Sp.Attack by 1 stage when hit by a wind move, when Tailwind begins on this Pokemon's side, or when Sandstorm is active. Sandstorm immunity.",
		shortDesc: "If hit by a wind move or under Tailwind/Sandstorm: +1 SpA. Wind move/Sand immunity.",
		name: "Tempest Energy",
		num: 1004,
	},
	tempestforce: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind'] || this.field.isWeather('sandstorm')) {
				this.boost({ atk: 1 }, pokemon, pokemon);
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind' || this.field.isWeather('sandstorm')) {
				this.boost({ atk: 1 }, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({atk: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Tempest Force');
				}
				return null;
			}
		},
		flags: {},
		rating: 1,
		num: 2004,
		desc: "This Pokemon is immune to wind moves and raises its Attack by 1 stage when hit by a wind move, when Tailwind begins on this Pokemon's side, or when Sandstorm is active. Sandstorm immunity.",
		shortDesc: "If hit by a wind move or under Tailwind/Sandstorm: +1 Atk. Wind move/Sand immunity.",
		name: "Tempest Force",
	},
	mightywall: {
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (!(pokemon.activeMoveActions > 1)) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (!(pokemon.activeMoveActions > 1)) {
				return this.chainModify(1.5);
			}
		},
		desc: "On first turn of arrival, this Pokemon's Defense and Special Defense are multiplied by 1.5.",
		shortDesc: "On first turn of arrival, this Pokemon's Defense and Special Defense are multiplied by 1.5.",
		name: "Mighty Wall",
		rating: 4,
		num: 1005,
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
		num: -39,
	},
	vampirism: {
		shortDesc: "Replaces target's ability with Vampirism if user made contact.",
		onSourceDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			const targetAbility = target.getAbility();
	
			// Check if the target's ability can be suppressed
			if (targetAbility.flags['cantsuppress'] || targetAbility.id === 'vampirism') {
				return; // Exit if the target's ability cannot be replaced or is already Vampirism
			}
	
			// Check if the move makes contact
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				// Replace the target's ability with Vampirism
				const oldAbility = target.setAbility('vampirism', source);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Vampirism', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		flags: {},
		name: "Vampirism",
		rating: 3,
		num: 1100,
	},
	aggravation: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedBerserk = false;
			} else {
				this.effectState.checkedBerserk = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedBerserk;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit && !move.smartTarget ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1}, target, target);
			}
		},
		flags: {},
		name: "Aggravation",
		shortDesc: "This Pokemon's Attack is raised by 1 when it reaches 1/2 or less of its Max HP.",
		rating: 2,
		num: 201,
	},
	geminicore: {
		onChargeMove(pokemon, target, move) {
			this.debug('tireless - remove charge turn for ' + move.id);
			this.add('-activate', pokemon, 'ability: Gemini Core');
			this.attrLastMove('[still]');
			this.addMove('-anim', pokemon, move.name, target);
			return false; // skip charge turn
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['mustrecharge']) {
				pokemon.removeVolatile('mustrecharge');
				this.debug('tireless - remove recharge');
				this.add('-activate', pokemon, 'ability: Gemini Core');
			}
		},
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			if (pokemon.volatiles['mustrecharge']) {
				pokemon.removeVolatile('mustrecharge');
				this.debug('geminicore - failsafe remove recharge');
			}
		},
		name: "Gemini Core",
		desc: "When this Pokemon uses a move that must spend a turn charging, it executes on the first turn, after any effects are applied from the charge. When it uses a move that must spend a turn recharging, it does not need to recharge.",
		shortDesc: "This Pokemon's attacks skip charging and recharging turns.",
		activate: "[POKEMON] became energized immediately!",
        flags: {},
		rating: 2,
		num: 1014,
	},
	megiddosgift: {
		onBeforeMovePriority: 0.5,
		onBeforeMove(target, source, move) {
			if (move.type === 'Fire') {
				this.field.setWeather('sunnyday');
			} else if (move.type === 'Water') {
				this.field.setWeather('raindance');
			}
		},
		name: "Megiddo's Gift",
		shortDesc: "Before using a Water or Fire-type move, this Pokemon sets Rain Dance or Sunny Day respectively.",
		rating: 4,
	},
	corrosiveclaws: {
		desc: "When this Pokemon brings an opponent to 50% or under using an attacking move, it badly poisons that opponent.",
		shortDesc: "Badly poison enemies brought under half health.",
		onAfterMove(source, target, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				target.setStatus('tox');
			}
		},
		name: "Corrosive Claws",
		rating: 4,
		num: -33,
	},
	centrifuge: {
		shortDesc: "The Pokémon draws Ground moves to itself to raise Attack by 1; Ground immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Centrifuge');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Ground' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				return this.effectState.target;
			}
		},
		name: "Centrifuge",
		rating: 3,
		num: -4,
	},
	icebody: {
		inherit: true,
		shortDesc: "If Snow is active, this Pokemon heals 1/16 of its max HP each turn.",
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 8);
			}
		},
	},
}