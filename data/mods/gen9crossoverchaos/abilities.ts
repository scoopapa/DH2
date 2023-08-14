/*
Ratings and how they work:
-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start
 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus
 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups
 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat
 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy
 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce
 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag
*/

export const Abilities: {[abilityid: string]: AbilityData} = {
	adeptprowess: {
		shortDesc: "Gains secondary type based on held berry. Psy Blast doesn't consume berry.",
		onStart(pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (!item.naturalGift) return;
			let type: string;
			type = item.naturalGift.type;

			if (!pokemon.hasType(type) && pokemon.addType(type)) {
				this.add('-start', pokemon, 'typeadd', type, '[from] ability: Adept Prowess');
			}
		},

		onUpdate(pokemon) {
			if ((pokemon.ignoringItem() || !pokemon.item) && Object.keys(pokemon.getTypes()).length === 2) {
				pokemon.setType("Ground");
				this.add('-start', pokemon, 'typechange', 'Grass', '[from] ability: Adept Prowess');
			}
		},
		name: "Adept Prowess",
		rating: 3.5,
		num: -1,
	},
	puyomastery: {
		shortDesc: "Boosts Water attacks by 1.5x",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Puyo Mastery boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Puyo Mastery boost');
				return this.chainModify(1.5);
			}
		},
		name: "Puyo Mastery",
		rating: 3.5,
		num: -2,
	},
	funkymode: {
		shortDesc: "This Pokemon does not take damage from hazards.",
		onDamage(damage, target, source, effect) {
			if (effect && (effect.id === 'stealthrock' || effect.id === 'spikes')) {
				return false;
			}
		},
		name: "Funky Mode",
		rating: 4,
		num: -3,
	},
	runelord: {
		shortDesc: "The Pokémon's special become physical, slicing, and contact.",
		onModifyMove(move) {
			if (move.category === 'Special') {
				if (!move.flags['contact']) move.flags.contact = 1;
				if (!move.flags['slicing']) move.flags.slicing = 1;
				move.category = 'Physical';
			}
		},
		name: "Runelord",
		rating: 3,
		num: -4,
	},
	torchofmadness: {
		shortDesc: "This Pokemon's moves have 1.3x power against burned targets.",
		onBasePower(basePower, attacker, defender, move) {
			if (defender && ['brn'].includes(defender.status)) return this.chainModify(1.3);
		},
		name: "Torch of Madness",
		rating: 4,
		num: -5,
	},
	crystallize: {
		shortDesc: "This Pokemon's Normal-type moves become Rock-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Rock';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Crystallize",
		rating: 4,
		num: -6,
	},
	spectralleech: {
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by a foe with stat boosts. Eliminates the target's boosts after receiving damage.",
		onDamagingHit(damage, target, source, effect) {
			let activate = false;
			let i: BoostID;
			const removeBoosts = {};
			for (i in source.boosts) {
				if (source.boosts[i] > 0) {
					removeBoosts[i] = source.boosts[i] * -1;
					activate = true;
				}
			}
			if (activate) {
				this.boost(removeBoosts, source);
				this.heal(target.maxhp / 4);
			}
		},
		name: "Spectral Leech",
		rating: 4,
		num: -7,
	},
	relentless: {
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
		onStart(pokemon) {
			pokemon.addVolatile('metronome');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('metronome')) {
					pokemon.removeVolatile('metronome');
					return;
				}
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
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		name: "Relentless",
		rating: 3.5,
		num: -8,
	},
	medicinalbackground: {
		name: "Medicinal Background",
		shortDesc: "This Pokemon gains 1.2x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap; 1.4x at half HP or less.",
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				if (target.hp <= target.maxhp / 2) return this.chainModify([5734, 4096]);
				return this.chainModify([4915, 4096]);
			}
		},
		rating: 3.5,
		num: -9,
	},
	chameleon: {
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Chameleon');
			}
		},
		name: "Chameleon",
		rating: 4,
		num: -10,
	},
	callofdarkness: {
		shortDesc: "At the end of each turn, if this Pokémon’s HP is at half or lower, causes all opposing Pokemon to lose 1/8 of their maximum HP, rounded down.",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (pokemon.hp <= pokemon.maxhp / 2) {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
		name: "Call of Darkness",
		rating: 4,
		num: -11,
	},
	colorfilter: {
		name: "Color Filter",
		shortDesc: "Limber + Keen Eye",
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Keen Eye", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
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
		isBreakable: true,
		rating: 2.5,
		num: -12,
	},
	blackoutcurtain: {
		onDamagingHit(damage, target, source, effect) {
			this.boost({atk: 1});
		},
		name: "Blackout Curtain",
		shortDesc: "When this Pokemon is damaged by an attack, its Atk is raised by 1.",
		rating: 4.5,
		num: -13,
	},
	frigidbloodline: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Frigid Bloodline');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Frigid Bloodline",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Ice moves; Ice immunity.",
		rating: 3.5,
		num: -14,
	},
	frigidbloodline: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Frigid Bloodline');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Frigid Bloodline",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Ice moves; Ice immunity.",
		rating: 3.5,
		num: -15,
	},
	// Curse Weaver utilizing Ghost-type curse is handled within moves.ts
	curseweaver: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Curse Weaver boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Curse Weaver Boost boost');
				return this.chainModify(1.5);
			}
		},
		name: "Curse Weaver",
		shortDesc: "Attacking stat multiplied by 1.5 while using a Ghost-type attack. Curse becomes Ghost-type version.",
		rating: 3.5,
		num: -16,
	},
	jellydessertqueen: {
		onResidual(pokemon) {
			this.add('-heal', pokemon, pokemon.getHealth, '[from] ability: Jelly Dessert Queen');
			this.heal(pokemon.baseMaxhp / 16);
		},
		name: "Jelly Dessert Queen",
		shortDesc: "This Pokemon recovers 1/16 max HP at the end of each turn.",
		rating: 4,
		num: -17,
	},
};
