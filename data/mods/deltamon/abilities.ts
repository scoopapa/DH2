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
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
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
				return false;
			}
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Tactical Dodge",
		shortDesc: "Once per battle, this Pokemon uses its tactical know-how to evade an incoming super-effective attack.",
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
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1,},
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
