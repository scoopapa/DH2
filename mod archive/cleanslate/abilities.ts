export const Abilities: {[k: string]: ModdedAbilityData} = {
	"forceofattraction": {
        shortDesc: "On switch-in, this Pokemon summons Gravity.",
        onStart: function (source) {
			this.field.clearWeather();
			this.field.addPseudoWeather('gravity', source, source.ability);
        },
        id: "forceofattraction",
        name: "Force of Attraction",
        rating: 4.5,
        num: 2,
    },
	"mythicalpresence": {
        desc: "On switch-in, this Pokemon lowers the Special Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
        shortDesc: "On switch-in, this Pokemon lowers the Special Attack of adjacent opponents by 1 stage.",
        onStart: function (pokemon) {
            let activated = false;
            for (const target of pokemon.side.foe.active) {
                if (!target || !this.isAdjacent(target, pokemon)) continue;
                if (!activated) {
                    this.add('-ability', pokemon, 'Mythical Presence', 'boost');
                    activated = true;
                }
                if (target.volatiles['substitute']) {
                    this.add('-immune', target, '[msg]');
                } else {
                    this.boost({spa: -1}, target, pokemon);
                }
            }
        },
        id: "mythicalpresence",
        name: "Mythical Presence",
        rating: 3.5,
        num: 22.5,
    },
	"extremebulk": {
        shortDesc: "If Gravity is active, this Pokemon's Attack is 1.5x.",
        onModifyAtk: function (atk, pokemon) {
            if (this.field.getPseudoWeather('gravity')) {
                return this.chainModify(1.5);
            }
        },
        id: "extremebulk",
        name: "Extreme Bulk",
        rating: 3,
        num: 33.5,
    },
	"abyssallight": {
        desc: "This Pokemon is immune to Dark-type moves and raises its Sp. Defense by 1 stage when hit by a Dark-type move.",
        shortDesc: "This Pokemon's SpD is raised 1 stage if hit by a Dark move; Dark immunity.",
        onTryHitPriority: 1,
        onTryHit: function (target, source, move) {
            if (target !== source && move.type === 'Dark') {
                if (!this.boost({spd: 1})) {
                    this.add('-immune', target, '[msg]', '[from] ability: Abyssal Light');
                }
                return null;
            }
        },
        onAllyTryHitSide: function (target, source, move) {
            if (target === this.effectData.target || target.side !== source.side) return;
            if (move.type === 'Dark') {
                this.boost({atk: 1}, this.effectData.target);
            }
        },
        id: "abyssallight",
        name: "Abyssal Light",
        rating: 3.5,
        num: 157,
    },
	"desertcoat": {
		shortDesc: "This Pokemon cannot be burned and is immune to Sandstorm damage.",
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'brn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Desert Coat');
			return false;
		},
		id: "desertcoat",
		name: "Desert Coat",
		rating: 2,
		num: 41,
	},
	"malware": {
		desc: "On switch-in, this Pokemon lowers the Speed of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Speed of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Malware', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target, '[msg]');
				} else {
					this.boost({spe: -1}, target, pokemon);
				}
			}
		},
		id: "malware",
		name: "Malware",
		rating: 3.5,
		num: 22,
	},
	 "overdrive": {
        desc: "If Electric Terrain is active, this Pokemon's Attacks are multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn.",
        shortDesc: "If Electric Terrain is active, this Pokemon's Attacks are 1.5x; loses 1/8 max HP per turn.",
        onModifySpAPriority: 5,
        onModifySpA: function (spa, pokemon) {
            if (this.field.isTerrain('electricterrain')) return this.chainModify(1.5);
        },
        onModifyAtk: function (atk, pokemon) {
            if (this.field.isTerrain('electricterrain')) return this.chainModify(1.5);
        },
		onResidual: function(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				this.damage(pokemon.maxhp  / 8, pokemon, pokemon);
			}
		},
        id: "overdrive",
        name: "Overdrive",
        rating: 1.5,
        num: 94,
    },
	"pinksmoke": {
        shortDesc: "This Pokemon is not affected by the secondary effect of another Pokemon's attack, and cannot be struck by a critical hit.",
        onModifySecondaries: function (secondaries) {
            this.debug('Shield Dust prevent secondary');
            return secondaries.filter(effect => !!(effect.self || effect.dustproof));
        },
        onCriticalHit: false,
        id: "pinksmoke",
        name: "Pink Smoke",
        rating: 2.5,
        num: 19,
    },
	"lonewolf": {
        desc: "This Pokemon's Sp. Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
        shortDesc: "This Pokemon's Sp. Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
        onSourceFaint: function (target, source, effect) {
            if (effect && effect.effectType === 'Move') {
                this.boost({spa: 1}, source);
            }
        },
        id: "lonewolf",
        name: "Lone Wolf",
        rating: 3.5,
        num: 153,
    },
};