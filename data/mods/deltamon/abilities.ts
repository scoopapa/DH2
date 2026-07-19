export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	
	coldgaze: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Cold Gaze', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ spe: -1 }, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Cold Gaze",
		shortDesc: "Upon entering the field, this Pokemon lowers the Speed of all opponents by one stage.",
	},
	
	demoralize: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Demoralize', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ spa: -1 }, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Demoralize",
		shortDesc: "Upon entering the field, this Pokemon lowers the Special Attack of all opponents by one stage.",
	},
	
	savageroar: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add (-'anim', pokemon, "Snarl", target);
					this.add('-ability', pokemon, 'Savage Roar', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ atk: -1 }, target, pokemon, null, true);
				}
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Savage Roar'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Savage Roar', `[of] ${target}`);
			}
		},
		
		flags: {breakable: 1,},
		name: "Savage Roar",
		shortDesc: "Intimidate effect, user can't be Intimidated.",
	},
	
	constrictingdarkness: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Constricting Darkness');
			this.add('-message', 'Darkness constricts you... Special Attack reduced!')
		},
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Constricting Darkness')) return;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Constricting Darkness Debuff');
			return this.chainModify(0.75);
		},
		
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Dark') {
				return this.chainModify([5325, 4096]);
			}
		},
		
		flags: {},
		name: "Constricting Darkness",
		shortDesc: "Pokemon without this ability have 0.75x Special Attack. User's Dark-type attacks have 1.3x Base Power.",
	},
	
	yourtakingtoolong: {
		onStart(pokemon) {
			this.add('-start', pokemon, 'ability: YOUR TAKING TOO LONG');
			this.effectState.counter = 5;
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns && this.effectState.counter) {
				this.effectState.counter--;
				
				if(!this.effectState.counter) {
					this.add('-message', "YOUR TAKING TOO LONG!");
					for (const target of this.getAllActive()) {
						if (target === pokemon) continue;
						this.damage(target.baseMaxhp / 4);
					}
				}
			}
		},
		
		flags: {},
		name: "YOUR TAKING TOO LONG",
		shortDesc: "Once this Pokemon has been on the field for 5 turns, all active Pokemon lose 25% of their HP per turn until it switches out.",
	},
		
	//copied from Berserk
	fury: {
		onDamage(damage, target, source, effect) {
			this.effectState.checkedBerserk = !(
				effect.effectType === "Move" && !effect.multihit &&
				!(effect.hasSheerForce && source.hasAbility('sheerforce'))
			);
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
				this.boost({ atk: 1 }, target, target);
			}
		},
		flags: {},
		name: "Fury",
		shortDesc: "This Pokemon's Attack is raised by 1 stage when it takes a hit that drops its HP to 1/2 or less.",
	},
	
	dogmarriagedogamy: {		
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			for (const ally of pokemon.allies()) {
				if (ally.baseSpecies.name === 'Dogaressa') {
					return this.chainModify(1.5);
				}
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			for (const ally of pokemon.allies()) {
				if (ally.baseSpecies.name === 'Dogaressa') {
					return this.chainModify(1.5);
				}
			}
		},
		
		flags: {},
		name: "Dog Marriage (Dogamy)",
		shortDesc: "If this Pokemon's ally is Dogaressa, this Pokemon gains 1.5x Defense and Special Defense.",
	},
	
	dogmarriagedogaressa: {		
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			for (const ally of pokemon.allies()) {
				if (ally.baseSpecies.name === 'Dogamy') {
					return this.chainModify(1.5);
				}
			}
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			for (const ally of pokemon.allies()) {
				if (ally.baseSpecies.name === 'Dogamy') {
					return this.chainModify(1.5);
				}
			}
		},
		
		flags: {},
		name: "Dog Marriage (Dogaressa)",
		shortDesc: "If this Pokemon's ally is Dogamy, this Pokemon gains 1.5x Attack and Speed.",
	},
	
	undyingspirit: {	
		onUpdate(pokemon) {
			if (pokemon.undyingRecover) return;
			if (pokemon.hp <= pokemon.maxhp / 4) {
				this.add('-activate', pokemon, 'ability: Undying Spirit'),
				pokemon.heal(pokemon.baseMaxHp / 2);
				pokemon.undyingRecover = true;
			}
		},
		
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Undying Spirit",
		shortDesc: "Once per battle, if this Pokemon drops to 1/4 of its max HP or less, it will restore 1/2 of its max HP.",
	},
	
	pyromancy: {
		onStart(pokemon) {
			if(!pokemon.pyroBoost) {
				pokemon.pyroBoost = 0;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') {
				this.debug('Pyromancy damage reduction');
				return this.chainModify(0.5);
			}
		},
		onTryHit(target, source, move) {
			if(pokemon.pyroBoost >= 2) return;
			
			if(move.type === 'Fire') {
			this.add('-activate', pokemon, 'ability: Pyromancy'),
			this.add('-anim', pokemon, "Burning Bulwark", target);
			this.add('-message', "The power of ${pokemon.name}'s Fire-Type moves increased!"),
			pokemon.pyroboost++;
			}
		},
		basePowerCallback(basePower, pokemon, move) {
			if (move.type === 'Fire' && move.category !== 'Status')	{
				this.debug('Pyromancy boost');
				return move.basePower + (10 * pokemon.pyroBoost);
			}
		},
		
		flags: {breakable: 1},
		name: "Pyromancy",
		shortDesc: "This Pokemon takes 1/2 damage from Fire-Type moves. Upon being hit by a Fire-Type move, this Pokemon's Fire-Type moves gain +10 Base Power (max 2 times).",
	},
	
	makeththerules: {
		onSwitchIn(pokemon) {
			this.add ('-ability', pokemon, 'Maketh the Rules');
			this.add ('-message', '{pokemon.name} is bending the rules! Type matchups are inversed!')
		},
		
		onAnyEffectivenessPriority: 1,
		onAnyEffectiveness(typeMod, target, type, move) {
				if (move && !this.dex.getImmunity(move, type)) return 1;
				return typeMod * -1;
			},
		
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Maketh the Rules",
		shortDesc: "Allst Pokemon Type matchups art Inversed whilst this Pokemon is on the Fielde.",
	},
	
	souldrain: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Soul Drain',);
					activated = true;
				}
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || move.isZ) return false;
				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);

				const ppDeducted = target.deductPP(move.id, 2);
				if (!ppDeducted) return false;
			}
		},
			
		flags: {},
		name: "Soul Drain",
		shortDesc: "Upon entering the field, this Pokemon drains 2 PP of the last move used by each opposing Pokemon.",
	},
	
	// copied from Purifying Salt and Clear Body
	temouttatem: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Tem Outta Tem", `[of] ${target}`);
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Tem Outta Tem');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Tem Outta Tem');
				return null;
			}
		},
		
		flags: {},
		name: "Tem Outta Tem",
		shortDesc: "This Pokemon is immune to stat drops from other Pokemon and all non-volatile status conditions.",
	},
	
	amalgamation: {
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Amalgamation');
			pokemon.addVolatile('amalgamation');
		},
		
		condition: {
			onAnyFaint(target) {
				const ability = target.getAbility();
				if(ability.flags['noreceiver'] || ability.flags['notrace'] || ability.id === 'noability') return;
				this.effectState.target.setAbility(ability, target);
			}
		},
		
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Amalgamation",
		shortDesc: "Gain the Amalgamation effect: Constantly attempt to copy the ability of the last Pokemon to faint in battle. Resets once this Pokemon leaves the field.",
	},
	
	// copied from Quark Drive
	blossomboost: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('grassyterrain')) {
				pokemon.addVolatile('blossomboost');
			} else if (!pokemon.volatiles['blossomboost']?.fromBooster) {
				pokemon.removeVolatile('blossomboost');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['blossomboost'];
			this.add('-end', pokemon, 'Blossom Boost', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Blossom Boost', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Blossom Boost');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'blossomboost' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Blossom Boost atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Blossom Boost def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Blossom Boost spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Blossom Boost spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Blossom Boost spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Blossom Boost');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Blossom Boost",
		shortDesc: "This Pokemon's highest stat is multiplied by 1.3x (1.5x if Speed) in Grassy Terrain or if a Booster Energy is consumed."
	},
	
	sharpshooter: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				this.debug('Sharpshooter boost');
				return this.chainModify(1.5);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Sharpshooter",
		shortDesc: "This Pokemon's bullet moves do 1.5x their normal damage. Pollen Puff heals 3/4 of the target's max HP.",
	},
	
	tacticaldodge: {
		onTryHit(pokemon, target, move) {
			if (pokemon.dodged) return;
			if (target.getMoveHitData(move).typeMod > 0) {
				this.add ('-activate', pokemon, 'ability: Tactical Dodge');
				this.add('-anim', pokemon, "Nasty Plot", target);
				this.add('-message', '${pokemon.name} evaded the attack!'),
				pokemon.dodged = true;
				return null;
			}
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Tactical Dodge",
		shortDesc: "Once per battle, this Pokemon uses its tactical know-how to evade an incoming super-effective attack.",
	},
	
	lovingdances: {
		onPrepareHit(pokemon, move) {
			if (this.randomChance(1, 2)) {
				for (const ally of pokemon.alliesAndSelf()) {
					if (ally.status) {
						this.add('-activate', pokemon, 'ability: Loving Dances');
						ally.cureStatus();
					}
				}	
			}
		},

		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Loving Dances",
		shortDesc: "This Pokemon's Dance moves have a 50% chance to cure it and its ally's status conditions.",
	},
	
	fastfood: {	
		onStart(pokemon) {
			if(pokemon.foodCount >= 2) return;
			
			if(!pokemon.foodCount) {
				pokemon.foodCount = 0;
			}
			this.add('-activate', pokemon, 'ability: Fast Food'),
			this.add('-message', '${pokemon.name} whipped up some Fast Food!')
			
			for (const ally of pokemon.alliesAndSelf()) {
				this.heal(ally.baseMaxhp * 0.15, ally, pokemon);
				ally.ateBerry = true;				
			}
			this.boost({spe: 1}, pokemon);
			pokemon.foodCount++;
		},
		
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Fast Food",
		shortDesc: "Twice per battle, on switch-in, the user and their allies restore 15% of their max HP. User's Speed is boosted by 1 stage. Being affected by this ability counts as having eaten a berry.",
	},
	
	swordplay: {
		onHitProtect(source, target, move) {
			if (move.flags['slicing']) {
				target.getMoveHitData(move).bypassProtect = this.effect;
				return false;
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Swordplay boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Swordplay",
		shortDesc: "This Pokemon's slicing moves do 1.3x their normal damage and partially bypass Protect.",
	},
	
	fullbelly: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.ateBerry) {
				return this.chainModify(1.5);
			}
			else {
				return this.chainModify(0.7);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Full Belly",
		shortDesc: "This Pokemon's Attack stat is multiplied by 0.7x until it eats a Berry. Once it eats a Berry, its Attack is multiplied by 1.5x for the rest of the battle.",
	},
	
	reverberate: {
			// Copied from Parental Bond
			onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
				move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax || !move.flags['sound']) return;
			move.multihit = 2;
			move.multihitType = 'reverberate';
		},

		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'reverberate' && move.id === 'secretpower' && move.hit < 2) 
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			},
			
		onHit(source, target, move) {
			if (move.multihitType === 'reverberate' && move.hit > 1) {
				this.battle.debug('Reverberate modifier');
				baseDamage = this.battle.modify(baseDamage, 0.5);
			}
		},
		
		flags: {},
		name: "Reverberate",
		shortDesc: "This Pokemon's sound moves hit twice. The second hit does 50% of its normal damage.",
	},
	
	ghostlygroove: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound']) { 
				move.type = 'Ghost';
			}
		},
		
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if(move.flags['sounds']) {
				this.debug('Ghostly Groove boost');
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Ghostly Groove",
		shortDesc: "This Pokemon's sound-based moves become Ghost-Type and have 1.1x Power.",
	},
	
	antivirus: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Bug') {
				if (!this.boost({ atk: 1 })) {
					this.add('-immune', target, '[from] ability: Antivirus');
				}
				return null;
			}
		},
		flags: {breakable: 1,},
		name: "Antivirus",
		shortDesc: "This Pokemon is immune to Bug-Type moves. Getting hit by a Bug-Type move boosts its Attack by 1 stage.",
	},
	
	splitpersonality: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.species.baseSpecies !== 'Pink') return;
			const targetForme = pokemon.species.name === 'Pink' ? 'Pink-Ghost' : 'Pink';
			pokemon.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Split Personality",
		shortDesc: "At the end of every turn, this Pokemon switches between its Corporeal Forme and Ghost Forme.",
	},
	
	stellarguard: {
		onSourceModifyDamage(damage, source, target, move) {
			this.debug ('Stellar Guard reduction')
			return this.chainModify(0.9);
		},
		flags: {breakable: 1},
		name: "Stellar Guard",
		shortDesc: "This Pokemon takes 0.9x damage from all attacks.",
	},
	
// Vanilla abilities edited to interact with Savage Roar
	guarddog: {
		inherit: true,
		onTryBoostPriority: 2,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Savage Roar'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.boost({ atk: 1 }, target, target, null, false, true);
			}
		},
	},
	
	scrappy: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Savage Roar'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', `[of] ${target}`);
			}
		},
	},
	
	rattled: {
		inherit: true,
		onAfterBoost(boost, target, source, effect) {
			if (['Intimidate', 'Savage Roar'].includes(effect.name) && boost.atk) {
				this.boost({ spe: 1 });
			}
		},
	},
	
	owntempo: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Savage Roar'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', `[of] ${target}`);
			}
		},
	},
	
	oblivious: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Savage Roar'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', `[of] ${target}`);
			}
		},
	},
	
	innerfocus: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate', 'Savage Roar'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', `[of] ${target}`);
			}
		},
	},
	

};
