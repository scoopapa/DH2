export const Abilities: {[k: string]: ModdedAbilityData} = {
	lightpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Light Power",
    shortDesc: "This Pokemon's Special Attack is doubled.",
	},
	raindish: {
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) return;
			this.heal(pokemon.maxhp / 16);
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		name: "Rain Dish",
    shortDesc: "Heals 6.25% of user's max HP at the end of each turn. Heals 12.5% in Rain.",
		num: 44,
	},
	icebody: {
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather('hail')) return;
			this.heal(pokemon.maxhp / 16);
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		name: "Ice Body",
    shortDesc: "Heals 6.25% of user's max HP at the end of each turn. Heals 12.5% in Hail.",
		num: 115,
	},
	honeygather: {
      shortDesc: "This Pokemon heals 1/8 of its max HP if it's holding Honey.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hasItem('honey')) {
					this.heal(pokemon.baseMaxhp / 8);
			}
		},
		name: "Honey Gather",
		rating: 2,
		num: 118,
	},
	sweetveil: {
		name: "Sweet Veil",
      shortDesc: "This Pokemon and its allies can't fall asleep. This Pokemon heals 1/8 of its max HP if it's holding Honey.",
		onAllySetStatus(status, target, source, effect) {
			if (status.id === 'slp') {
				this.debug('Sweet Veil interrupts sleep');
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Sweet Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.debug('Sweet Veil blocking yawn');
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Sweet Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hasItem('honey')) {
					this.heal(pokemon.baseMaxhp / 8);
			}
		},
		rating: 2,
		num: 175,
	},
	libero: {
      shortDesc: "Non-STAB moves have 1.2x power.",
		onBasePowerPriority: 23,
		onBasePower (basePower, pokemon, target, move) {
			if (!pokemon.hasType(move.type)) {
				return this.chainModify(1.2);
			}
		},
		name: "Libero",
		rating: 4.5,
		num: 236,
	},
    moody: {
      shortDesc: "This Pokemon's lowest stat goes up by 1 every turn.",
        onResidualOrder: 26,
        onResidualSubOrder: 1,
        onResidual(pokemon) {
            if (pokemon.activeTurns) {
            let statName = 'atk';
            let worstStat = 3000; //The highest possible stat number (with boosts) is 2,676
            let s: StatNameExceptHP;
            for (s in pokemon.storedStats) {
                if (pokemon.storedStats[s] < worstStat) {
                    statName = s;
                    worstStat = pokemon.storedStats[s];
                }
            }
            this.boost({[statName]: 1}, pokemon);
            }
        },
        name: "Moody",
        rating: 3,
        num: 141,
    },
	stickyhold: {
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.name === 'Knock Off') {
				this.debug('Sticky Hold weaken');
				return this.chainModify(0.67);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.name === 'Poltergeist') {
				this.add('-immune', pokemon, '[from] ability: Sticky Hold');
				return null;
			}
		},
		name: "Sticky Hold",
		rating: 2,
		num: 60,
	},
	watercompaction: {
		shortDesc: "This Pokemon's Defense goes up 2 stages when hit by a Water-type move; Water immunity",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Water Compaction');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Water') {
				this.boost({def: 2}, this.effectData.target);
			}
		},
		name: "Water Compaction",
		rating: 3,
		num: 195,
	},
	ironfist: {
		shortDesc: "This Pokemon's punch attacks have 1.25x power and don't make contact. Sucker Punch is not boosted.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		onModifyMove(move) {
			if (move.flags['punch']) {
				delete move.flags['contact'];
			}
		},
		name: "Iron Fist",
		rating: 3,
		num: 89,
	},
	overclock: {
		shortDesc: "This Pokemon's moves that lower its stats have 1.3x power.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.name === 'Draco Meteor' || move.name === 'Fleur Cannon' || move.name === 'Leaf Storm' || move.name === 'Overheat' || move.name === 'Psycho Boost' || move.name === 'Superpower' || move.name === 'Lightning Lance' || move.name === 'Clanging Scales' || move.name === 'Close Combat' || move.name === 'Dragon Ascent' || move.name === 'Hyperspace Fury' || move.name === 'Scale Shot' || move.name === 'V-Create' || move.name === 'Hammer Arm' || move.name === 'Ice Hammer') {
				return this.chainModify(1.3);
			}
		},
		name: "Overclock",
	},
	pricklycoat: {
		shortDesc: "This Pokemon sets a layer of Spikes when hit by a contact move, or Toxic Spikes if it's a Poison-type or hit by a Poison-type move.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && (move.type === 'Poison' || target.hasType('Poison'))) {
				target.side.foe.addSideCondition('toxicspikes');
			} else {
				if (move.flags['contact']) {
					target.side.foe.addSideCondition('spikes');
				}
			}
		},
		name: "Prickly Coat",
	},
	sandveil: {
		desc: "If Sandstorm is active, this Pokemon's Def and SpD are multiplied by 1.25. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's Def and SpD are boosted 1.25x; immunity to Sandstorm.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.25);
			}
		},
		onModifySpD(spd, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.25);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		id: "sandveil",
		name: "Sand Veil",
		rating: 3,
		num: 146,
	},
	snowcloak: {
		desc: "If Hail is active, this Pokemon's Def and SpD are multiplied by 1.25. This Pokemon takes no damage from Hail.",
		shortDesc: "If Hail is active, this Pokemon's Def and SpD are boosted 1.25x; immunity to Hail.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.25);
			}
		},
		onModifySpD(spd, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.25);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		id: "snowcloak",
		name: "Snow Cloak",
		rating: 3,
		num: 81,
	},
	powerofalchemy: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		name: "Power of Alchemy",
		rating: 0,
		num: 223,
	},
	powerofalchemymukalola: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.getAbility('poisontouch'),
			});
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Power of Alchemy (Muk-Alola)",
		rating: 0,
	},
	
// Edited by proxy
	oblivious: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
			if (pokemon.volatiles['trashtalk']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('trashtalk');
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract' || type === 'trashtalk') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Oblivious');
				return null;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Oblivious');
			}
		},
		name: "Oblivious",
		rating: 1.5,
		num: 12,
	},
	aromaveil: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment', 'trashtalk'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectData.target;
					this.add('-block', target, 'ability: Aroma Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		name: "Aroma Veil",
		rating: 2,
		num: 165,
	},
	
	/*
// The other Power of Alchemies
		powerofalchemyweezing: {
		shortDesc: "All of this Pokemon's abilities are active at once.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Power of Alchemy');
		},
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.getAbility('poisontouch'),
			});
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Power of Alchemy (Weezing)",
		rating: 0,
	}, */
};
