export const Items: {[k: string]: ModdedItemData} = {
	crystalcrown: {
		name: "Crystal Crown",
		num: -1,
		shortDesc: "Holder takes 0.67x damage from Z-Moves, Mega-Evolved Pokemon, Dynamaxed Pokemon and Terastallized Pokemon.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.isZ || (source.volatiles['dynamax'] && source.volatiles['dynamax'].isActive) || source.volatiles['terastallized'] || (source.forme && source.forme.startsWith('Mega'))) {
				return this.chainModify(0.67);
			}
		},
	},
	aguavberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'spd') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use.",
	},
	figyberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'atk') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use.",
	},
	iapapaberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'def') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Def Nature. Single use.",
	},
	magoberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'spe') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use.",
	},
	wikiberry: {
		inherit: true,
		isNonstandard: null,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'spa') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use.",
	},
	bugmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Bug-type moves by 0.67x. Holder's Multi-Attack is Bug type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug') return this.chainModify(0.67);
		},
	},
	dragonmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Dragon-type moves by 0.67x. Holder's Multi-Attack is Dragon type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon') return this.chainModify(0.67);
		},
	},
	electricmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Electric-type moves by 0.67x. Holder's Multi-Attack is Electric type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') return this.chainModify(0.67);
		},
	},
	fightingmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Figthing-type moves by 0.67x. Holder's Multi-Attack is Figthing type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Figthing') return this.chainModify(0.67);
		},
	},
	firememory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Fire-type moves by 0.67x. Holder's Multi-Attack is Fire type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') return this.chainModify(0.67);
		},
	},
	flyingmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Flying-type moves by 0.67x. Holder's Multi-Attack is Flying type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying') return this.chainModify(0.67);
		},
	},
	ghostmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Ghost-type moves by 0.67x. Holder's Multi-Attack is Ghost type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost') return this.chainModify(0.67);
		},
	},
	grassmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Grass-type moves by 0.67x. Holder's Multi-Attack is Grass type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass') return this.chainModify(0.67);
		},
	},
	groundmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Ground-type moves by 0.67x. Holder's Multi-Attack is Ground type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground') return this.chainModify(0.67);
		},
	},
	icememory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Ice-type moves by 0.67x. Holder's Multi-Attack is Ice type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice') return this.chainModify(0.67);
		},
	},
	poisonmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Poison-type moves by 0.67x. Holder's Multi-Attack is Poison type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison') return this.chainModify(0.67);
		},
	},
	psychicmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Psychic-type moves by 0.67x. Holder's Multi-Attack is Psychic type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic') return this.chainModify(0.67);
		},
	},
	rockmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Rock-type moves by 0.67x. Holder's Multi-Attack is Rock type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock') return this.chainModify(0.67);
		},
	},
	steelmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Steel-type moves by 0.67x. Holder's Multi-Attack is Steel type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel') return this.chainModify(0.67);
		},
	},
	watermemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Water-type moves by 0.67x. Holder's Multi-Attack is Water type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') return this.chainModify(0.67);
		},
	},
	fairymemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Fairy-type moves by 0.67x. Holder's Multi-Attack is Fairy type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy') return this.chainModify(0.67);
		},
	},
	darkmemory: {
		inherit: true,
		shortDesc: "Reduces damage taken from Dark-type moves by 0.67x. Holder's Multi-Attack is Dark type.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark') return this.chainModify(0.67);
		},
	},
	normalmemory: {
		name: "Normal Memory",
		onMemory: 'Normal',
		shortDesc: "Reduces damage taken from Normal-type moves by 0.67x. Holder's Multi-Attack is Normal type.",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Normal') return this.chainModify(0.67);
		},
		forcedForme: "Silvally",
		gen: 9,
		num: -2,
	},
	strangecigar: {
		name: "Strange Cigar",
		shortDesc: "Disable the user's ability. Holder's contact moves disable the opponent's ability.",
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			if (pokemon.getAbility().flags['cantsuppress']) return;
			pokemon.addVolatile('gastroacid');
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				target.addVolatile('gastroacid');
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				target.addVolatile('gastroacid');
			}
		},
		num: -3,
		gen: 9,
	},
	iceaxe:{
		name: "Ice Axe",
		shortDesc: "The holder's Ice moves are guaranteed to critically hit while Snow is active.",
		onModifyMove(move) {
			if (this.field.isWeather('snow') && move.type === 'Ice') {
				move.willCrit = true;
			}
		},
		num: -4,
		gen: 9,
	},
	honey: {
        name: "Honey",
        fling: {
            basePower: 30,
        },
        num: -5,
        gen: 9,
        shortDesc: "When this Pokemon's HP drops below 50%, restores 25% HP. The item is then consumed. This item cannot be removed from the holder unless it is consumed. Any attempt to remove/steal this item lowers the attacker's Speed by one stage.",
        onUpdate(pokemon) {
                if (pokemon.hp <= pokemon.maxhp / 2) {
                    if (this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 4) && pokemon.useItem()) {
                            this.heal(pokemon.baseMaxhp / 4);
                    }
                }
      },
        onTakeItem(item, pokemon, source) {
            if (!this.activeMove) throw new Error("Battle.activeMove is null");
            if (!pokemon.hp) return;
            if ((source && source !== pokemon) || this.activeMove.id === 'knockoff' || this.activeMove.id === 'thief' || this.activeMove.id === 'switcheroo' || this.activeMove.id === 'trick') {
                if (!this.boost({spe: -1}, source)) {
                    this.add('-activate', pokemon, 'item: Honey');
                }
                return false;
            }
        },
    },
};
