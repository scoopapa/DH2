/* ponymon abils */

export const Abilities: import('../sim/dex-abilities').AbilityDataTable = {
	liquidvoice: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Water';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Liquid Voice",
		rating: 1.5,
		num: 204,
	},
	dauntlessshield: {
		onStart(pokemon) {
			this.boost({def: 1}, pokemon);
		},
		flags: {},
		name: "Dauntless Shield",
		rating: 3.5,
		num: 235,
	},
	galewings: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
		flags: {},
		name: "Gale Wings",
		rating: 1.5,
		num: 177,
	},
	justified: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Justified');
				}
				return null;
			}
		},
		flags: {},
		name: "Justified",
		rating: 2.5,
		num: 154,
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onSwitchIn() {},
		flags: {},
		name: "Protean",
		rating: 4,
		num: 168,
	},
	corrosion: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		// Implemented in sim/pokemon.js:Pokemon#setStatus
		flags: {},
		name: "Corrosion",
		rating: 2.5,
		num: 212,
	},
	magicofequestria: {
		onStart(pokemon) {
			if (!this.field.setTerrain('psychicterrain') && this.field.isTerrain('psychicterrain')) {
				this.add('-activate', pokemon, 'ability: Magic of Equestria');
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isTerrain('psychicterrain')) {
				this.debug('Magic of Equestria boost');
				return this.chainModify([5461, 4096]);
			}
		},
		flags: {},
		name: "Magic of Equestria",
		desc: "On switch in, summons Psychic Terrain. While under Psychic Terrain, Sp. Atk is 1.3333x.",
		rating: 4.5,
		num: -1,
	},
	heartofdiamond: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Steel') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Heart of Diamond');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Heart of Diamond",
		desc: "This Pokemon's Special Attack is raised by one stage if hit by a Steel move; Steel Immunity",
		rating: 3,
		num: -2,
	},
	sunlightofequestria: {
		onStart(pokemon) {
			if (this.field.setWeather('sunnyday')) {
				this.add('-activate', pokemon, 'Sunlight of Equestria', '[source]');
			} else if (this.field.isWeather('sunnyday')) {
				this.add('-activate', pokemon, 'ability: Sunlight of Equestria');
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('Sunlight of Equestria');
				return this.chainModify([5461, 4096]);
			}
		},
		flags: {},
		name: "Sunlight of Equestria",
		desc: "On switch in, summons Sunny Day. During Sunny Day, Sp. Atk is 1.3333x.",
		rating: 4.5,
		num: -3,
	},
	moonlightofequestria: {
		onStart(pokemon) {
			if (!this.field.setTerrain('midnightterrain') && this.field.isTerrain('midnightterrain')) {
				this.add('-activate', pokemon, 'ability: Moonlight of Equestria');
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isTerrain('midnightterrain')) {
				this.debug('Moonlight of Equestria boost');
				return this.chainModify([5461, 4096]);
			}
		},
		flags: {},
		name: "Moonlight of Equestria",
		desc: "On switch in, summons Midnight Terrain. While under Midnight Terrain, Sp. Atk is 1.3333x.",
		rating: 4.5,
		num: -4,
	},
	loveofequestria: {
		onStart(pokemon) {
			if (!this.field.setTerrain('mistyterrain') && this.field.isTerrain('mistyterrain')) {
				this.add('-activate', pokemon, 'ability: Love of Equestria');
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isTerrain('mistyterrain')) {
				this.debug('Love of Equestria boost');
				return this.chainModify([5461, 4096]);
			}
		},
		flags: {},
		name: "Love of Equestria",
		desc: "On switch in, summons Misty Terrain. While under Misty Terrain, Sp. Atk is 1.333x.",
		rating: 4.5,
		num: -5,
	},
	draconicspirit: {
		onPreStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Spike') return;
			if (pokemon.species.forme !== 'Grown Dragon') {
				this.add('-activate', pokemon, 'ability: Draconic Spirit');
				pokemon.formeChange('Spike-Future', this.effect, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1},
		name: "Draconic Spirit",
		desc: "If this Pokemon is Spike, it transforms into its Future Form on entry.",
		rating: 3,
		num: -6,
	},
	midnightsurge: {
		onStart(source) {
			this.field.setTerrain('midnightterrain');
		},
		flags: {},
		name: "Midnight Surge",
		desc: "Summons Midnight Terrain",
		rating: 4,
		num: -7,
	},
	beatchange: {
		onPrepareHit(source, target, move) {
            if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove || !move.flags['sound']) return;
            const type = move.type;
            if (type && type !== '???' && source.getTypes().join() !== type) {
                if (!source.setType(type)) return;
                this.add('-start', source, 'typechange', type, '[from] ability: Beat Change');
            }
        },
		onModifyMove(move, pokemon) {
            if (!move.flags['sound'] || move.category !== 'Special') return;
            move.category = 'Physical';
        },
		flags: {},
		name: "Beat Change",
		desc: "This Pokemon's type changes to the type of the sound based move it is using. If the sound based move is a special attack, it is turned into a physical attack.",
		rating: 4,
		num: -8,
	},
	spiritofchaos: {
		onStart(source) {
			this.field.addPseudoWeather('trickroom');
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Spirit of Chaos boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Spirit of Chaos boost');
				return this.chainModify(1.3);
			}
		},
		flags: {},
		name: "Spirit of Chaos",
		desc: "On switch in, summons Trick Room. The user’s Dark type attacks are boosted by 1.3x.",
		rating: 4,
		num: -9,
	},
	mightofthechangelingqueen: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Might of the Changeling Queen boost');
				return this.chainModify(2);
			}
		},
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Might of the Changeling Queen",
		desc: "This Pokemon’s/Pony’s attacks that are not very effective on a target deal double damage. Attacks with secondary effects have 1.3x power; secondary effects are not nullified.",
		rating: 3.5,
		num: -10,
	},
	thirstforpower: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				const bestStat = source.getBestStat(true, true);
				this.boost({[bestStat]: length}, source);
			}
		},
		flags: {},
		name: "Thirst for Power",
		desc: "When this Pokemon/Pony knocks out an opponent, its highest stat will be increased by one stage.",
		rating: 3,
		num: -11,
	},
	nightmaregaze: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Nightmare Gaze', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({def: -1, spd: -1}, target, pokemon, null, true);
				}
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
		flags: {},
		name: "Nightmare Gaze",
		desc: "On switch-in, this Pony/Pokemon lowers the Defense and Special Defense of opponents by 1 stage. Sleeping foes lose 1/8 of their max hp at the end of each turn",
		rating: 3.5,
		num: -12,
	},
};
