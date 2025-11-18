export const Abilities: import('../sim/dex-abilities').AbilityDataTable = {
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
		shortDesc: "When ≤50% HP; +1 ATK.",
	},
	airbag: {
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category !== 'Physical') return;
			if (typeMod > 0) {
				return 0;
			}
		},
		name: "Airbag",
		shortDesc: "Physical super effective moves deal neutral damage.",
	},
	ambush: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move.flags['slicing'] && pokemon.hp === pokemon.maxhp) {
				return priority + 1;
			}
		},
		onModifyCritRatio(critRatio, source, target, move) {
			if (move.flags['slicing'] && source.hp <= source.maxhp / 3) {
				return 5;
			}
		},
		name: "Ambush",
		shortDesc: "Slicing moves: +1 priority at full HP, always crit at 1/3 HP or less.",
	},
	bewitchingtail: {
		onModifyStats(stats, pokemon, target, move) {
			if (target && target.status === 'slp') {
				stats.atk = this.chainModify([stats.atk, 0x1333]);
				stats.spa = this.chainModify([stats.spa, 0x1333]);
				stats.spe = this.chainModify([stats.spe, 0x1333]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (source.status === 'slp') {
				return this.chainModify(0.833);
			}
		},
		flags: {},
		name: "Bewitching Tail",
		shortDesc: "Vs drowsy foes: Atk/SpA/Spe 1.2x | From drowsy foes: Damage 0.83x",
	},
	blindrage: {
		onDamagingHit(damage, target, source, move) {
			if (!move || !target) return;
			if (this.getEffectiveness(move, target) > 0) {
				this.boost({atk: 1, spa: 1}, target);
				this.add('-ability', target, 'Blind Rage');
				this.add('-message', target.name + "flew into a blind rage!");
			}
		},
		name: "Blind Rage",
		shortDesc: "When hit by a super effective attack: Atk & SpA +1.",
	},
	butterflystar: {
		onModifyMovePriority: 1,
		onBeforeMove(pokemon, target, move) {
			if ((pokemon.species.id === 'estrellian' || pokemon.species.id === 'estrellianwinged') && move.type === 'Bug') {
				this.add('-ability', pokemon, 'Butterfly Star');
				this.add('-message', `${pokemon.name} is transforming into its Armored Form!`);
				pokemon.formeChange('estrellianarmored', this.effect, true);
			}
			if ((pokemon.species.id === 'estrellian' || pokemon.species.id === 'estrellianarmored') && move.type === 'Flying') {
				this.add('-ability', pokemon, 'Butterfly Star');
				this.add('-message', `${pokemon.name} is transforming into its Winged Form!`);
				pokemon.formeChange('estrellianwinged', this.effect, true);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		shortDesc: "Before using a Bug move: Armored Form. Before using a Flying move: Winged Form.",
		name: "Butterfly Star",
	},
	centrifuge: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({spa: 1})) {
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
		flags: {breakable: 1},
		name: "Centrifuge",
		shortDesc: "Ground moves: Drawn to user, immune, SpA +1",
	},
	corrosiveclaws: {
		onAfterMoveSecondary(target, source, move) {
			if (!target || !source || source === target) return;
			if (!move || move.category === 'Status') return;
			if (!target.hp) return;

			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;

			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				if (target.trySetStatus('tox', source)) {
					this.add('-ability', source, 'Corrosive Claws');
				}
			}
		},
		name: "Corrosive Claws",
		desc: "When this Pokémon brings an opponent to 50% HP or less with an attacking move, it badly poisons that opponent.",
		shortDesc: "Targets dropped to ≤50% HP by attacks: Badly Poisoned",
	},
	corruptedpoison: {
		onSourceHit(target, source, move) {
			if (!target || !source || source === target) return;
			if (!move || move.category === 'Status' || move.type !== 'Poison') return;
			if (target.getMoveHitData(move).typeMod < 0) return;
			if (!target.hp) return;
			if (move.hit && move.hit > 1) return;

			if (move.category === 'Physical') {
				if (target.boosts.def > -6) {
					this.boost({def: -1}, target, source, null, this.dex.abilities.get('corruptedpoison'));
					this.add('-ability', source, 'Corrupted Poison');
				}
			} else if (move.category === 'Special') {
				if (target.boosts.spd > -6) {
					this.boost({spd: -1}, target, source, null, this.dex.abilities.get('corruptedpoison'));
					this.add('-ability', source, 'Corrupted Poison');
				}
			}
		},
		name: "Corrupted Poison",
		desc: "When this Pokémon hits a foe with a non-resisted Poison-type attack, that foe's corresponding defense is lowered by 1 stage.",
		shortDesc: "Non-resisted Poison Moves: Lower target's Def/SpD by -1",
	},
	crystalblight: {
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const foe of pokemon.foes()) {
				if (foe && foe.hp && foe.status === 'par') {
					this.damage(foe.baseMaxhp / 16, foe, pokemon);
					foe.addVolatile('fatigue');
					this.add('-ability', pokemon, 'Crystalblight');
				}
			}
		},
		flags: {},
		name: "Crystalblight",
		desc: "At the end of each turn, opposing Pokémon that are paralyzed take 1/16 of their max HP as damage and become Fatigued.",
		shortDesc: "Foes w/ PAR: Lose 1/16 HP & gain Fatigue each turn",
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
		shortDesc: "After taking a Physical attack: Sets Spikes on opposing side",
	},
	densecortex: {
		onTryHit(pokemon, target, move) {
			if (move.flags['slicing']) {
				this.add('-immune', pokemon, '[from] ability: Dense Cortex');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Dense Cortex",
		shortDesc: "Immune to slicing moves.",
	},
	destructionstar: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') return;
			if (source.species.id === 'arbitrellian' && source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.add('-ability', source, 'Destruction Star');
				source.formeChange('arbitrelliancharged', this.effect, true);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Destruction Star",
		shortDesc: "After KOing a foe: enters Charged-Forme.",
	},
	disasterstar: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') return;
			if (source.species.id === 'doomtrellian' && source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.add('-ability', source, 'Disaster Star');
				source.formeChange('doomtrelliancharged', this.effect, true);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Disaster Star",
		shortDesc: "After KOing a foe: enters Charged-Forme.",
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
		shortDesc: "If at full HP: Incoming attacks deal 0.5x damage unless immune",
	},
	dozing: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.id === 'slp') {
				this.heal(target.baseMaxhp / 8, target);
				this.add('-ability', target, 'Dozing');
				return false;
			}
		},
		flags: {},
		name: "Dozing",
		shortDesc: "If drowsy: Restores 1/8 max HP each turn. Ignores drowsy side-effects.",
	},
	dragoneater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dragon') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dragon Eater');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Dragon Eater",
		shortDesc: "Hit by a Dragon move: Immunity, Heals 25% max HP.",
	},
	dragonpoint: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('dragonblight', target);
				}
			}
		},
		flags: {},
		name: "Dragon Point",
		shortDesc: "When hit by contact moves: 30% chance to inflict Dragonblight",
	},
	dukesbayonet: {
		onModifyMove(move) {
			if (move.flags['contact']) {
				delete move.flags['protect'];
				(move as any).armorPiercer = true;
			}
		},
		onModifyDamage(damage, source, target, move) {
			// If the move was marked armorPiercer and the target is under Protect
			if ((move as any).armorPiercer && move.flags?.contact && target.volatiles['protect']) {
				this.debug('Duke\'s Bayonet: reduced damage to 25% through Protect');
				return this.chainModify(0.25);
			}
		},
		flags: {},
		name: "Duke's Bayonet",
		shortDesc: "Contact moves: Bypass Protect, deal 25% damage",
	},
	dulledblades: {
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.flags['slicing']) {
				this.boost({def: 1}, source, source, null, this.dex.abilities.get('dulledblades'));
				this.add('-ability', source, 'Dulled Blades');
			}
		},
		onSourceAfterSubDamage(damage, target, source, move) {
			if (!move || !target) return;
			if (move.flags['slicing']) {
				this.boost({def: 1}, source, source, null, this.dex.abilities.get('dulledblades'));
				this.add('-ability', source, 'Dulled Blades');
			}
		},
		name: "Dulled Blades",
		shortDesc: "Slicing moves: +1 Defense",
	},
	empressthrone: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Ahtal-Ka' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'ahtalneset' || pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Empress Throne');
			pokemon.formeChange('Ahtal-Neset', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Empress Throne",
		shortDesc: "If Ahtal-Ka, becomes Ahtal-Neset if at 1/2 max HP or less at end of turn.",
	},
	escaton: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Escaton');
			}
		},
		flags: {},
		name: "Escaton",
		shortDesc: "Before using a move: Type changes to match move; repeats per switch-in",
	},
	ferventscales: {
		onDamage(damage, target, source, effect) {
			// Applies only to non-move damage (residual sources like weather, status, hazards, abilities)
			if (effect && effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') {
					this.add('-activate', target, 'ability: Fervent Scales');
				}
				return this.chainModify(0.5);
			}
		},
		name: "Fervent Scales",
		shortDesc: "This Pokemon takes halved damage from residual sources.",
	},
	foolproof: {
		onTryHit(target, source, move) {
			if (!move) return;
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Foolproof');
				return null;
			}
			if (move.flags['bullet']) {
				this.add('-immune', target, '[from] ability: Foolproof');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectState.target, '[from] ability: Foolproof');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Foolproof",
		shortDesc: "Soundproof + Bulletproof",
	},
	frostnip: {
		onBasePower(basePower, attacker, defender, move) {
			// Boost power if the target is frostbitten (frozen)
			if (defender?.status === 'frz') {
				this.debug('Frostnip boost');
				return this.chainModify(1.3);
			}
		},
		name: "Frostnip",
		shortDesc: "Against frostbitten foes: Moves have 1.3x power"
	},
	frozencalamity: {
		onStart(pokemon) {
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Frozen Calamity');
				const fallen = Math.min(target.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onResidual(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Frozen Calamity');
				const fallen = Math.min(target.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen && move.type === 'Ice') {
				const powMod = [4096, 4300, 4505, 4710, 4915, 5120];
				this.debug(`Frozen Calamity boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		flags: {},
		name: "Frozen Calamity",
		shortDesc: "For each fainted foe: Ice-type power +5%.",
	},
	generalist: {
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (!pokemon.hasType(move.type)) {
				this.debug('Generalist boost');
				return this.chainModify(1.3);
			}
		},
		name: "Generalist",
		shortDesc: "Non-STAB moves: Power is 1.3x",
	},
	geminicore: {
		onChargeMove(pokemon, target, move) {
			this.attrLastMove('[still]');
			this.add('-message', `${pokemon.name} drew energy from its core!`);
			this.add('-anim', pokemon, 'Cosmic Power', pokemon);
			this.add('-anim', pokemon, move.name, target);
			return false;
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['mustrecharge']) {
				pokemon.removeVolatile('mustrecharge');
				this.add('-message', `${pokemon.name} drew energy from its core!`);
				this.add('-anim', pokemon, 'Cosmic Power', pokemon);
			}
		},
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			if (pokemon.volatiles['mustrecharge']) {
				pokemon.removeVolatile('mustrecharge');
				this.add('-message', `${pokemon.name} drew energy from its core!`);
				this.add('-anim', pokemon, 'Cosmic Power', pokemon);
			}
		},
		name: "Gemini Core",
		desc: "This Pokémon ignores charging and recharging turns on its moves.",
		shortDesc: "Ignores charge and recharge turns.",
		flags: {},
	},
	gravedrum: {
		onModifySpe(spe, pokemon) {
			if (pokemon.adjacentFoes().some(foe => foe?.status === 'brn' || foe?.volatiles['blastblight'])) {
				this.debug('Gravedrum Speed boost');
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Gravedrum",
		shortDesc: "Speed doubled if any adjacent foe has BRN or Blast.",
	},
	heatsink: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') {
				this.debug('Heat Sink immunity');
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Heat Sink');
				}
				this.add('-activate', target, 'ability: Heat Sink');
				return 0;
			}
		},
		flags: {breakable: 1},
		name: "Heat Sink",
		shortDesc: "When hit by Fire moves: Immunity, Heals 25% Max HP.",
	},
	howlingthunder: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['charge']) {
				this.add('-anim', pokemon, 'Charge', pokemon);
				this.add('-message', `${pokemon.name} is brimming with a Howling Thunder!`);
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Howling Thunder",
		shortDesc: "When under Charge: Attack is 1.5×",
	},
	icebreaker: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('snow', 'hail', 'absolutezero')) {
				this.debug('Ice Breaker boost');
				return this.chainModify([0x14CD, 0x1000]); // 1.3x modifier
			}
		},
		name: "Ice Breaker",
		shortDesc: "Under Snow: Attacks have 1.3x power; immune to Snow damage",
		flags: {},
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
				if (this.field.isWeather(['hail', 'snow', 'absolutezero']) && pokemon.species.id === 'zamtrios') {
					this.add('-ability', pokemon, 'Ice-Armor');
					this.add('-message', `Zamtrios is transforming!`);
					pokemon.formeChange('zamtriosiced', this.effect, true);
				}
			},
			onWeatherChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			if (this.field.isWeather(['hail', 'snow', 'absolutezero']) && pokemon.species.id === 'zamtrios') {
					this.add('-ability', pokemon, 'Ice-Armor');
					this.add('-message', `Zamtrios is transforming!`);
					pokemon.formeChange('zamtriosiced', this.effect, true);
				}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, 
			notransform: 1},
		name: "Ice-Armor",
		shortDesc: "After taking a PHYS. Attack or Under Snow; Transform into Zamtrios-Iced",
	},
	ignite: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fire';
				(move as any).igniteBoosted = true;
				this.add('-activate', pokemon, 'ability: Ignite');
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if ((move as any).igniteBoosted) {
				this.debug('Ignite boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Ignite",
		shortDesc: "Normal-type moves: Become Fire-type with 1.2x power",
	},
	incandescent: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
        if (move.type === 'Fire') {
            this.debug('Incandescent Boost');
            return this.chainModify(1.5);
        }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
        if (move.type === 'Fire') {
            this.debug('Incandescent Boost');
            return this.chainModify(1.5);
        }
    },
    onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') {
				this.debug('Incandescent immunity');
				this.add('-immune', target, '[from] ability: Incandescent');
				this.add('-activate', target, 'ability: Incandescent');
				return 0;
			}
		},
		flags: {breakable: 1},
		name: "Incandescent",
		shortDesc: "User gains Fire-type STAB and Fire-Type Immunity",
	},
	insectarmor: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Insect Armor boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Insect Armor boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (['Fighting', 'Grass', 'Ground'].includes(move.type)) {
				this.debug('Insect Armor resistance');
				this.add('-activate', target, 'ability: Insect Armor');
				return this.chainModify(0.5);
			}
		},
		name: "Insect Armor",
		shortDesc: "User gains Bug-type STAB & Resistances",
	},
	itembag: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.hp || pokemon.item) return;
			const itemList = [
				'leftovers', 'sitrusberry', 'lumberry', 'figyberry',
				'choiceband', 'choicespecs', 'choicescarf',
				'flameorb', 'frostorb', 'toxicorb',
				'lightball', 'ironball', 'rockyhelmet', 'heavydutyboots',
			];
			const itemMade = this.sample(itemList);
			pokemon.setItem(itemMade);
			this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Itembag');
			this.add('-activate', pokemon, 'ability: Itembag');
		},
		name: "Itembag",
		shortDesc: "End of turn: If no item, user gains a random item.",
	},
	maddragon: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Mad Dragon boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Mad Dragon boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (['Fire', 'Water', 'Electric', 'Grass'].includes(move.type)) {
				this.debug('Mad Dragon resistance');
				this.add('-activate', target, 'ability: Mad Dragon');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Mad Dragon",
		shortDesc: "User gains Dragon-type STAB & Resistances.",
	},
	megiddosgift: {
		onBeforeMovePriority: 0.5,
		onBeforeMove(target, source, move) {
			if (move.type === 'Fire') {
				this.field.setWeather('sunnyday');
				this.add('-activate', source, 'ability: Megiddo\'s Gift', 'Sunny Day');
			} else if (move.type === 'Water') {
				this.field.setWeather('raindance');
				this.add('-activate', source, 'ability: Megiddo\'s Gift', 'Rain Dance');
			}
		},
		name: "Megiddo's Gift",
		shortDesc: "Before using Fire/Water moves: Sets Sunny Day or Rain Dance",
	},
	mightywall: {
		flags: {},
		onSourceModifyDamage(damage, source, target, move) {
			if (!target.activeTurns) {
				this.debug('Mighty Wall weaken');
				this.add('-activate', target, 'ability: Mighty Wall');
				return this.chainModify(0.5);
			}
		},
		name: "Mighty Wall",
		shortDesc: "On switch-in: This Pokémon takes 0.5x damage from attacks.",
	},
	puffup: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special' && target.species.id === 'zamtrios') {
					this.add('-ability', target, 'Puff-Up');
					this.add('-message', `Zamtrios is transforming!`);
					target.formeChange('zamtriospuffed', this.effect, true);
				}
			},
		onStart(pokemon) {
				if (this.field.isWeather(['rain']) && pokemon.species.id === 'zamtrios') {
					this.add('-ability', pokemon, 'Puff-Up');
					this.add('-message', `Zamtrios is transforming!`);
					pokemon.formeChange('zamtriospuffed', this.effect, true);
				}
			},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, 
			notransform: 1},
		name: "Puff-Up",
		shortDesc: "After taking a SPEC. Attack/Under Rain; Transform into Zamtrios-Puffed",
	},
	solarwrath: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
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
		shortDesc: "Under Sunny Day; this Pokemon's Atk is 1.5x, loses 1/8 max HP per turn.",
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
		desc: "This Pokemon is immune to wind moves and raises its Sp.Attack by 1 stage when hit by a wind move, when Tailwind begins on this Pokemon's side, or when Sandstorm is active. Sandstorm immunity.",
		shortDesc: "Hit by Wind Move OR Under Tailwind/Sandstorm; +1 SpA. (Grants Immunity)",
		name: "Tempest Energy",
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
		desc: "This Pokemon is immune to wind moves and raises its Attack by 1 stage when hit by a wind move, when Tailwind begins on this Pokemon's side, or when Sandstorm is active. Sandstorm immunity.",
		shortDesc: "Hit by Wind Move OR Under Tailwind/Sandstorm; +1 ATK. (Grants Immunity)",
		name: "Tempest Force",
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
	},
	dragonvein: {
		desc: "When it KOs an opponent with a direct move, it recovers 25% of its max HP.",
		shortDesc: "Heals 25% HP on KO.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.heal(source.baseMaxhp / 4);
			}
		},
		name: "Dragonvein",
	},
	permafrost: {
		name: "Permafrost",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Permafrost');
			this.add('-message', `${pokemon.name}'s freezing aura turns water into ice!`);
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice') {
				this.boost({def: 1});
			}
		},
		onFoeBeforeMovePriority: 13,
		onFoeBeforeMove(attacker, defender, move) {
			attacker.addVolatile('permafrost');
		},
		condition: {
			onModifyTypePriority: -1,
			onModifyType(move, pokemon) {
				if (move.type === 'Water') {
				move.type = 'Ice';
				}
			},
			onAfterMove(pokemon) {
				pokemon.removeVolatile('permafrost');
			},
		},
		shortDesc: "Water moves used against this Pokemon become Ice-type. +1 Def when hit by Ice.",
	},
	/*rustedgale: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Rusted Gale');
			this.add('-message', `${pokemon.name}'s gale lowered all defense on the field!`);

		},
		onAnyModifyDef(def, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Rusted Gale')) return;
			if (!move.ruinedDef?.hasAbility('Rusted Gale')) move.ruinedDef = abilityHolder;
			if (move.ruinedDef !== abilityHolder) return;
			this.debug('Rusted Gale Def drop');
			return this.chainModify(0.75);
		},
		flags: {},
		name: "Rusted Gale",
		shortDesc: "Active Pokemon without this Ability have their Defense multiplied by 0.75.",
	},
	*/
	rustedgale: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Rusted Gale');
			this.add('-message', `${pokemon.name}'s gale spreads rust across the battlefield!`);
		},
		onAnyModifyDef(def, target) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Rusted Gale')) return;

			if (target.hasType('Steel')) {
				if (!target.volatiles['rusted']) {
					target.addVolatile('rusted');
					this.add('-message', `${target.name} is afflicted by rust!`);
				}
				return def;
			} else {
				this.debug('Rusted Gale Def drop');
				return this.chainModify(0.75);
			}
		},
		onSwitchOut(pokemon) {
			if (pokemon.volatiles['rusted']) {
				pokemon.removeVolatile('rusted');
				this.add('-message', `${pokemon.name} shook off the rust as it left the field!`);
			}
		},
		onEnd(pokemon) {
			for (const mon of this.getAllActive()) {
				if (mon.volatiles['rusted']) {
					mon.removeVolatile('rusted');
					this.add('-message', `${mon.name}'s rust faded as ${pokemon.name} left the field!`);
				}
			}
		},
		flags: {},
		name: "Rusted Gale",
		shortDesc: "Steel-types w/o this Ability gain Rusted volatile; others have Defense ×0.75. Ends when holder leaves.",
	},
	pungency: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('stench', this.effectState.target);
				}
			}
		},
		flags: {},
		shortDesc: "30% chance of inflicting Stench on a Pokemon if they make contact.",
		name: "Pungency",
	},
	oilslick: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Oilslick', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
		name: "Oilslick",
	},
	riptide: {
		onResidualOrder: 8,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.volatiles['trapped']) {
					const damage = this.damage(pokemon.baseMaxhp / 8, target, pokemon);
					if (damage) {
						this.heal(damage, pokemon, pokemon);
					}
				}
			}
		},
		flags: {},
		desc: "If any foe is trapped by a non-damaging move, the foe loses 1/8 of its max HP; heals by that amount.",
		shortDesc: "If foe is hit by non-residual trapping move, foe loses 1/8 of max HP; user heals 1/8th.",
		name: "Riptide",
	},
	ragingrebel: {
		shortDesc: "This Pokémon and allies: 1.3x damage when any Pokémon has stat drops; attack can't lowered.",
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			let rebel = null;
			for (const pokemon of this.getAllActive()) {
				let statDrop: BoostName;
				for (statDrop in pokemon.boosts) {
					if (pokemon.boosts[statDrop] < 0) rebel = true;
				}
			}
			if (rebel) {
				this.debug('Rebel boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Raging Rebel", "[of] " + target);
				}
			}
		},
		name: "Raging Rebel",
	},
	silversubsume: {
		onAnyTryMove(target, source, effect) {
			if (['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.boost({atk: 1}, source);
				this.add('cant', this.effectState.target, 'ability: Silver Subsume', effect, '[of] ' + target);
				return false;
			}
		},
		name: "Silver Subsume",
		shortDesc: "If a hazard move is used on this Pokemon, it fails and this Pokemon's Attack is raised by 1.",
	},
	strafe: {
		shortDesc: "When taking damages, this Pokemon adds 20% of its Speed to its corresponding defense.",
		name: "Strafe",
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const newDef = def + (spe / 5);
			return newDef;
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const newSpD = spd + (spe / 5);
			return newSpD;
		},
	},
	plow: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Plow');
				}
				return null;
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && (effect.id === 'stealthrock' || effect.id === 'spikes')) {
				this.heal(damage);
				return false;
			}
		},
		flags: {breakable: 1},
		name: "Plow",
		shortDesc: "Heals 1/4 of its max HP when hit by Ground; Ground immunity. Healed by Spikes and Stealth Rock.",
	},
	watercompaction: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({ def: 2 })) {
					this.add('-immune', target, '[from] ability: Water Compaction');
				}
				return null;
			}
		},
		name: "Water Compaction",
		desc: "This Pokemon is immune to Water-type moves and raises its Def by 2 stages when hit by an Water-type move.",
		shortDesc: "This Pokemon's Defense is raised 2 stages if hit by an Water move; Water immunity.",
	},
	twilightdust: {
		name: "Twilight Dust",
		desc: "If this Pokemon is a Nightcloak Malfestio and induces drowsy in a target, the target also becomes confused.",
		shortDesc: "Nightcloak: If this Pokemon induces drowsy in a target, the target also becomes confused.",
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source.baseSpecies.name !== "Nightcloak Malfestio") return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'slp') {
				target.addVolatile('confusion');
			}
		},
	},
	protopyre: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protopyre');
			} else if (!pokemon.volatiles['protopyre']?.fromBooster) {
				pokemon.removeVolatile('protopyre');
			}
		},
		onUpdate(pokemon) {
			if ((pokemon.hp <= pokemon.maxhp / 3) || this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protopyre');
			} else if (!pokemon.volatiles['protopyre']?.fromBooster) {
				pokemon.removeVolatile('protopyre');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protopyre'];
			this.add('-end', pokemon, 'Protopyre', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protopyre', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protopyre');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protopyre spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Protopyre",
		shortDesc: "Sunny Day active, Booster Energy used or HP drops below 1/3 max HP: highest stat is 1.3x, or 1.5x if Speed.",
	},
	oilmucus: {
		shortDesc: "This Pokemon is healed 1/4 by Fire, 1/8 by Sun; is hurt 1.25x by Water, 1/8 by Rain.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Oilmucus');
				}
				return null;
			}
		},
		onFoeBasePowerPriority: 17,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (this.effectState.target !== defender) return;
			if (move.type === 'Water') {
				return this.chainModify(1.25);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: {breakable: 1},
		name: "Oilmucus",
	},
	perforating: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		name: "Perforating",
		shortDesc: "Poison moves can hit and poison Steel-type Pokemon.",
	},
	pathogenic: {
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['cantsuppress'] || sourceAbility.id === 'pathogenic') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('pathogenic', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: pathogenic', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if(pokemon.hasType('Poison') || pokemon.baseSpecies.name === 'Blackveil Hazak') {
				this.debug('Immune to Pathogenic');
			} else { 
				this.add('-message', `${pokemon.name} is hurt by the Pathogen!`);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
			}
		},
		flags: {},
		name: "Pathogenic",
		shortDesc: "Contact changes attacker's ability to Pathogenic; non-Poison Pokemon are hurt.",
	},
	oceanicveil: {
		onStart(source) {
			//this.actions.useMove("Aqua Ring", source);
			this.add('-ability', source, 'Oceanic Veil');
			source.addVolatile('aquaring');
		},
		flags: {breakable: 1},
		name: "Oceanic Veil",
		shortDesc: "This Pokemon uses Aqua Ring on switch-in.",
	},
	risenburst: {
		shortDesc: "On Mega-Evo; uses Risen Burst (60BP, Typeless). Grants dark res + stab. Uses R.Burst when hit by a dark attack.",
		onStart(pokemon) {
			let targetSide = null;
			const sides = [this.sides[0], this.sides[1]];
			for (const side of sides) {
  				if(pokemon.side !== side) {
    				targetSide = side;
  				}
			}
			if (pokemon.risenBurst) return;
			pokemon.risenBurst = true;
            	const reaction = this.dex.getActiveMove('risenburst');
            	reaction.noreact = true;
            	this.actions.useMove(reaction, pokemon, targetSide.active[pokemon.position]);
		},
		onDamagingHitOrder: 3,
		onDamagingHit(damage, target, source, move) {
			if (!move.noreact && target.hp && source.hp && move.type === 'Dark') {
				const reaction = this.dex.getActiveMove('risenburst');
				reaction.noreact = true;
				this.actions.useMove(reaction, target, source);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Risen Burst weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Risen Burst weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Risen Burst boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Risen Burst boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Risen Burst",
	},
	sacredjewel: {
		onModifyDefPriority: 6,
		onModifySpD(spd, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Sacred Jewel",
		shortDesc: "If this Pokemon has a non-volatile status condition, its Special Defense is multiplied by 1.5x.",
	},
	overload: {
		name: "Overload",
		flags: {},
		shortDesc: "All Dragon moves used by the user are 1.4x damage; but deal 20% recoil of damage dealt.",
		onModifyMove(move) {
			if(move.type === 'Dragon' && move.category !=='Status') {
				move.recoil = [1, 4];
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Overload boost');
				return this.chainModify(1.4);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Overload boost');
				return this.chainModify(1.4);
			}
		},
	},
	terrestrial: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				return this.chainModify(0.5);
			}
		},
		name: "Terrestrial",
		flags: {breakable: 1},
		shortDesc: "Ground attacks do neutral damage.",
	},
	wyversion: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.addVolatile('dragoncharge');
		},
		flags: {},
		name: "Wyversion",
		shortDesc: "This Pokemon gains a (Dragon-type) Charge effect when it takes a hit from an attack.",
	},
	stealthsilver: {
		onStart(pokemon, source) {
			if (pokemon.stealthsilver) return;
			pokemon.stealthsilver = true;
			pokemon.side.foe.addSideCondition('gmaxsteelsurge');
		},
		flags: {},
		shortDesc: "On activation, this Pokemon sets steel-type hazards.",
		name: "Stealth Silver",
	},
	wylkencasing: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zoh Shia' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Encased') {
					pokemon.formeChange('Zoh Shia-Encased');
				}
			} else {
				if (pokemon.species.forme === 'Encased') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zoh Shia' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Encased') {
					pokemon.formeChange('Zoh Shia-Encased');
				}
			} else {
				if (pokemon.species.forme === 'Encased') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if (target.species.id !== 'Zoh Shia-Encased' || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Wylk Encasing');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (target.species.id !== 'Zoh Shia-Encased' || target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Wylk Encasing');
			return null;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Wylk Encasing",
		desc: "If this Pokemon is a Zoh Shia, it changes to its true forme if it has 1/2 or less of its maximum HP, and changes to Encased Form if it has more than 1/2 its maximum HP. This check is done on switch-in and at the end of each turn. While in its Encased Form, it cannot become affected by a non-volatile status condition or Yawn.",
		shortDesc: "If Zoh Shia, switch-in/end of turn it changes to true form at 1/2 max HP or less, else Encased.",
	},
	relentless: {
		onStart(pokemon) {
			this.effectState.lastMove = '';
			this.effectState.numConsecutive = 0;
		},
		onTryMovePriority: -2,
		onTryMove(pokemon, target, move) {
			if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
				this.effectState.numConsecutive++;
			} else if (pokemon.volatiles['twoturnmove']) {
				if (this.effectState.lastMove !== move.id) {
					this.effectState.numConsecutive = 1;
				} else {
					this.effectState.numConsecutive++;
				}
			} else {
				this.effectState.numConsecutive = 0;
			}
			this.effectState.lastMove = move.id;
		},
		onModifyDamage(damage, source, target, move) {
			const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
			const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
			this.debug(`Current Relentless boost: ${dmgMod[numConsecutive]}/4096`);
			return this.chainModify([dmgMod[numConsecutive], 4096]);
		},
		name: "Relentless",
		desc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
        flags: {},
	},
	pulpup: {
		onTryHitPriority: 4,
		onTryHit(move, pokemon, target, source) {
			if (target !== source && move.category === 'Status') {
				pokemon.addVolatile('stockpile');
				this.add('-ability', pokemon, 'Pulp-Up');
			}
		},
		flags: {},
		name: "Pulp Up",
		shortDesc: "After this Pokemon targets another pokemon with a status move, Stockpiles 1. (Under Testing)",
	},
	mucusveil: {
		shortDesc: "This Pokemon retaliates with Soak whenever it is attacked by a contact move.",
		onDamagingHitOrder: 3,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				const reaction = this.dex.getActiveMove('soak');
				reaction.noreact = true;
				this.actions.useMove(reaction, target, source);
			}
		},
		flags: {},
		name: "Mucus Veil",
	},
	thunderstorm: {
		onModifyMovePriority: 1,
		onAfterMove(pokemon, attacker, move) {
			if (move.type === 'Flying') {
				this.add('-ability', pokemon, 'Thunderstorm');
				pokemon.addVolatile('charge');
			}
		},
		flags: {},
		shortDesc: "Grants the charge effect after using a flying-type move.",
		name: "Thunderstorm",
	},
	spongy: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.category === 'Special') mod /= 2;
			return this.chainModify(mod);
		},
		flags: {breakable: 1},
		shortDesc: "This Pokemon takes 1/2 damage from special moves, 2x damage from Fire moves.",
		name: "Spongy",
	},
	reactivetouch: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					target.addVolatile('blastblight');
				}
			}
		},
		name: "Reactive Touch",
		shortDesc: "This Pokemon's contact moves have a 30% chance of causing Blast.",
	},
	dustdevil: {
        onStart(source) {
            this.field.setWeather('dustdevil');
        },
        onAnySetWeather(target, source, weather) {
            const strongWeathers = ['desolateland', 'primordialsea', 'deltastream', 'dustdevil', 'absolutezero'];
            if (this.field.getWeather().id === 'dustdevil' && !strongWeathers.includes(weather.id)) return false;
        },
        onEnd(pokemon) {
            if (this.field.weatherState.source !== pokemon) return;
            for (const target of this.getAllActive()) {
                if (target === pokemon) continue;
                if (target.hasAbility('dustdevil')) {
                    this.field.weatherState.source = target;
                    return;
                }
            }
            this.field.clearWeather();
        },
        flags: {},
        name: "Dust Devil",
		shortDesc: "On switch-in, dust devil begins until this Ability is not active in battle.",
		desc: "On switch-in, the weather becomes Desolate Land, which includes all the effects of Sandstorm, removes accuracy check for rock moves, and deals 1/16th chip to all Pokemon on the field, sans user. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by the Primordial Sea, Delta Stream, Desolate Land, or Absolute Zero abilities.",
    },
    absolutezero: {
        onStart(source) {
            this.field.setWeather('absolutezero');
        },
        onAnySetWeather(target, source, weather) {
            const strongWeathers = ['desolateland', 'primordialsea', 'deltastream', 'dustdevil', 'absolutezero'];
            if (this.field.getWeather().id === 'absolutezero' && !strongWeathers.includes(weather.id)) return false;
        },
        onEnd(pokemon) {
            if (this.field.weatherState.source !== pokemon) return;
            for (const target of this.getAllActive()) {
                if (target === pokemon) continue;
                if (target.hasAbility('absolutezero')) {
                    this.field.weatherState.source = target;
                    return;
                }
            }
            this.field.clearWeather();
        },
        flags: {},
        name: "Absolute Zero",
		shortDesc: "On switch-in, absolute zero begins until this Ability is not active in battle.",
		desc: "On switch-in, the weather becomes Absolute Zero, which includes all the effects of snow, reduces the speed of Pokemon on the field by 25%, and deals 1/16th chip to all Pokemon on the field, sans user. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by the Primordial Sea, Delta Stream, Desolate Land, or Dust Devil abilities.",
    },
	solarcore: {
		onChargeMove(pokemon, target, move) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('Solar Core - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', pokemon, move.name, target);
				return false; // skip charge turn
			}
		},
		flags: {},
		name: "Solar Core",
		shortDesc: "Under intense sunlight; skip the charging turn of it's own moves.",
	},
	starvingbite: {
		onModifyMovePriority: -5,
		onModifyMove(move, source) {
			if (move.flags['bite']) {
				move.ignoreAbility = true;
				move.ignoreImmunity = true;
			}
		},
		flags: {},
		name: "Starving Bite",
		shortDesc: "This Pokémon's biting attacks ignore immunities and abilities.",
	},
	reactivecore: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				if (!target.volatiles['warmed']) {
					target.removeVolatile('cooled');
					target.addVolatile('warmed');
					this.add('-ability', target, 'Reactive Core');
				}
			}
			if (move.type === 'Water' || move.type === 'Ice') {
				if (!target.volatiles['cooled']) {
					target.removeVolatile('warmed');
					target.addVolatile('cooled');
					this.add('-ability', target, 'Reactive Core');
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id === 'brn') {
				target.removeVolatile('cooled');
				target.addVolatile('warmed');
				target.cureStatus();
				this.add('-ability', target, 'Reactive Core');
				return false;
			}
			if (status.id === 'frz') {
				target.removeVolatile('warmed');
				target.addVolatile('cooled');
				target.cureStatus();
				this.add('-ability', target, 'Reactive Core');
				return false;
			}
		},
		flags: {},
		name: "Reactive Core",
		shortDesc: "Hit By Fire/BRN: Offenses are 1.3x | Hit by Water/Ice/FRZ: Defenses or 1.3x",
	},
	snowseethe: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['snow', 'absolutezero'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'snow' || effect.id === 'absolutezero') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: {},
		name: "Snow Seethe",
		shortDesc: "Under Snow; this Pokemon's Atk is 1.5x, loses 1/8 max HP per turn.",
	},
	/*
	Edits
	*/
	mountaineer: {
    inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock' && (!target.activeTurns || target.volatiles['formechange'])) {
				this.add('-immune', target, '[from] ability: Mountaineer');
				this.add('-activate', target, 'ability: Mountaineer');
				return null;
			}
		},
		shortDesc: "On switch-in or Mega Evolution: Immune to Rock-type attacks and Stealth Rock.",
	},
	ironfist: {
		inherit: true,
		onModifyMove(move) {
			if (move.flags['punch']) delete move.flags['contact'];
		},
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.2.",
		shortDesc: "Punching attacks have 1.2x power, sans Sucker Pun. All Punch M. are contactless.",
	},
	icebody: {
		inherit: true,
		shortDesc: "If Snow is active, this Pokemon heals 1/8th of its max HP each turn.",
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow' || effect.id === 'absolutezero') {
				this.heal(target.baseMaxhp / 8);
			}
		},
	},
	poisonpuppeteer: {
		inherit: true,
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source.baseSpecies.name !== "Chameleos") return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('confusion');
			}
		},
		shortDesc: "Chameleos: If this Pokemon poisons a target, the target also becomes confused.",
	},
	raindish: {
		inherit: true,
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			}
		},
	},
	deltastream: {
		inherit: true,
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream', 'dustdevil', 'absolutezero'];
			if (this.field.getWeather().id === 'deltastream' && !strongWeathers.includes(weather.id)) return false;
		},
	},
	desolateland: {
		inherit: true,
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream', 'dustdevil', 'absolutezero'];
			if (this.field.getWeather().id === 'desolateland' && !strongWeathers.includes(weather.id)) return false;
		},
	},
	primordialsea: {
		inherit: true,
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream', 'dustdevil', 'absolutezero'];
			if (this.field.getWeather().id === 'primordialsea' && !strongWeathers.includes(weather.id)) return false;
		},
	},
	sandforce: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm', 'dustdevil')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([5325, 4096]);
				}
			}
		},
	},
	sandrush: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm', 'dustdevil')) {
				return this.chainModify(2);
			}
		},
	},
	slushrush: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'absolutezero'])) {
				return this.chainModify(2);
			}
		},
	},
	sandveil: {
		inherit: true,
		onSetStatus(status, target, source, effect) {
			if (this.field.isWeather('sandstorm')) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Sand Veil');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && this.field.isWeather('sandstorm')) {
				this.add('-immune', target, '[from] ability: Sand Veil');
				return null;
			}
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.3);
			}
		},
		onModifyAccuracy(accuracy) {},
		desc: "If Sandstorm is active, this Pokemon's Defense is multiplied by 1.3, and it cannot become affected by a non-volatile status condition or Yawn, and Rest will fail for it. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
		shortDesc: "Under Sandstorm; Def is 1.3x. Cannot be statused, including Rest.",
	},
}
