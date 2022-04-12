export const Abilities: {[k: string]: ModdedAbilityData} = {
	psylink: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Psylink');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Psychic') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1400, 0x1000]);
		},
		name: "Psylink",
      shortDesc: "While this Pokemon is active, all Psychic-type moves deal 1.25x damage.",
	},
	"tinkering": {
		shortDesc: "This Pokemon's status and switching moves have +1 priority and it heals its status when it switches out.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.category === 'Status' || move.selfSwitch) {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Natural Cure')) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('naturalcure')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Cure');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		id: "tinkering",
		name: "Tinkering",
	},
		"sensei": {
	    shortDesc: "This Pokemon's moves have the same base power as its most powerful move.",
	    onBasePowerPriority: 11,
	    onBasePower(basePower, attacker, defender, move) {
	        if (!move.priority > 0.1 && !move.multihit) {
	            this.debug('Sensei boost');
	            let warnBp = move.basePower;
	            for (const moveSlot of attacker.moveSlots) {
	                let moves = this.dex.getMove(moveSlot.move);
	                let bp = moves.basePower;
	                if (moves.ohko) bp = 160;
	                if (moves.id === 'counter' || moves.id === 'metalburst' || moves.id === 'mirrorcoat') bp = 120;
	                if (!bp && moves.category !== 'Status') bp = 80;
	                if (bp > warnBp) {
	                    warnBp = bp;
	                }
	            }
	            return warnBp;
	        }
	    },
	    id: "sensei",
	    name: "Sensei",
	},
	lightpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Light Power",
    shortDesc: "This Pokemon's Special Attack is doubled.",
	},
	bruteforce: {
		onModifyMovePriority: 8,
		onModifyMove(move, pokemon) {
			if (move.category === 'Special') move.category = 'Physical';
		},
		name: "Brute Force",
    shortDesc: "This Pokemon's Special moves become Physical.",
	},
	intoxicate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Poison';
				move.intoxicateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.intoxicateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Intoxicate",
		rating: 4,
    	shortDesc: "This Pokemon's Normal-type moves become Poison and have 1.2x power.",
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
	gravitas: {
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
		onStart(source) {
			this.add('-ability', source, 'Gravitas');
			this.field.addPseudoWeather('gravity', source, source.ability);
		},
		name: "Gravitas",
		rating: 4,
	},
	normalize: {
      shortDesc: "All of this Pokemon's moves are Normal-type and have doubled power.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball', 'adaptableattack',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id)) {
				move.type = 'Normal';
				move.normalizeBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.normalizeBoosted) return this.chainModify(2);
		},
		name: "Normalize",
		rating: 4,
		num: 96,
	},
	soulstrider: {
		id: "soulstrider",
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by a Ghost move; Ghost immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Soul Strider');
				}
				return null;
			}
		},
		name: "Soul Strider",
		rating: 3,
	},
	santassecret: {
		shortDesc: "This Pokemon can Dynamax",
		onStart(pokemon) {
			pokemon.canDynamax = true;
		},
		name: "Santa's Secret",
		rating: 5,
	},
};
