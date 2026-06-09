function getTribeBonus(side: any): {bonus: 0 | 1 | 2, tribe: string | null} {
    const active = side.active.filter((p: any) => p && !p.fainted);
    if (active.length <= 1) return {bonus: 0, tribe: null};
    const tribes = active.map((p: any) => p.tribe);
    const allSameTribe = tribes.every((t: any) => t && t === tribes[0]);
    if (allSameTribe) return {bonus: 2, tribe: tribes[0] || null};
    const tribeWithAdjacent = active.find((p: any) =>
        p.adjacentAllies().some((ally: any) => ally.tribe && ally.tribe === p.tribe)
    );
    if (tribeWithAdjacent) return {bonus: 1, tribe: tribeWithAdjacent.tribe || null};
    return {bonus: 0, tribe: null};
}

export const Rulesets: {[k: string]: ModdedFormatData} = {
	shiftclause: {
		effectType: 'Rule',
		name: 'Shift Clause',
		desc: 'Disables the Triples Shift mechanic.',
		onValidateRule() {
			if (this.format.gameType !== 'triples') return ['Shift Clause is only applicable to Triples formats.'];
		},
	},
	tribeunitymod: {
		effectType: 'Rule',
		name: 'Tribe Unity Mod',
		desc: 'Yo-kai receive boosts based on their tribe and the tribes of their active allies.',
		onSwitchInPriority: -1,
		onSwitchIn(pokemon) {
			pokemon.tribe = this.dex.species.get(pokemon.species.id).tribe;
			const side = pokemon.side;
			const {bonus, tribe} = getTribeBonus(side);
			if (bonus === 0) return;
			if (!tribe) return;

			if (side.tribeAnnounced) return;
			side.tribeAnnounced = true;

			const statNames: {[k: string]: string} = {
				Brave: 'Strength',
				Mysterious: 'Spirit',
				Tough: 'Defense',
				Charming: 'Speed',
				Heartful: 'Healing',
				Shady: 'Inspirit Accuracy',
				Eerie: 'Accuracy',
				Slippery: 'Inspirit Dodge',
			};
			const arrow = bonus === 2 ? '↑↑' : '↑';
			this.add('-message', `${tribe} Unity! Allies' ${statNames[tribe]} ${arrow}!`);
		},
		onAnyAfterMove(target, source, move) {
			target.side.tribeAnnounced = undefined;
			target.side.foe.tribeAnnounced = undefined;
		},
		// Brave: Attack boost
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			const {bonus, tribe} = getTribeBonus(attacker.side);
			if (bonus === 0 || tribe !== 'Brave') return;
			return this.chainModify(bonus === 2 ? 1.3 : 1.2);
		},
		// Mysterious: Spirit boost
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			const {bonus, tribe} = getTribeBonus(attacker.side);
			if (bonus === 0 || tribe !== 'Mysterious') return;
			return this.chainModify(bonus === 2 ? 1.3 : 1.2);
		},
		// Tough: Defense boost
		onModifyDefPriority: 6,
		onModifyDef(def, defender, attacker, move) {
			const {bonus, tribe} = getTribeBonus(defender.side);
			if (bonus === 0 || tribe !== 'Tough') return;
			return this.chainModify(bonus === 2 ? 1.3 : 1.2);
		},
		// Charming: Speed boost
		onModifySpePriority: 6,
		onModifySpe(spe, pokemon) {
			const {bonus, tribe} = getTribeBonus(pokemon.side);
			if (bonus === 0 || tribe !== 'Charming') return;
			return this.chainModify(bonus === 2 ? 1.3 : 1.2);
		},
		// Heartful: Recovery boost
		onAnyTryHeal(damage, target, source, effect) {
			const {bonus, tribe} = getTribeBonus(target.side);
			if (bonus === 0 || tribe !== 'Heartful') return;
			return Math.floor(damage * (bonus === 2 ? 1.3 : 1.2));
		},
		// Shady: Inspirit Accuracy boost
		// Eerie: Accuracy boost
		// Slippery: Inspirit Dodge boost
		onAnyAccuracy(accuracy, target, source, move) {
			if (typeof accuracy !== 'number') return;
			// Shady: boost Inspirit accuracy
			if (move.type === 'Inspirit') {
				const {bonus, tribe} = getTribeBonus(source.side);
				if (tribe === 'Shady') {
					if (bonus === 2) return true;
					if (bonus === 1) return this.chainModify(1.3);
				}
			}
			// Eerie: boost all accuracy
			const {bonus: eerieBonus, tribe: eerieTribe} = getTribeBonus(source.side);
			if (eerieTribe === 'Eerie' && eerieBonus > 0) {
				return Math.floor(accuracy * (eerieBonus === 2 ? 1.3 : 1.2));
			}
			// Slippery: passive 50% Inspirit dodge + tribe boost
			if (move.type === 'Inspirit') {
				const {bonus, tribe} = getTribeBonus(target.side);
				if (tribe === 'Slippery') {
					if (bonus === 2) return false; // 100% dodge
					if (bonus === 1) {
						if (!this.randomChance(1, 4)) return false; // 75% dodge chance
						return;
					}
				}
				else if (target.tribe === 'Slippery' && !this.randomChance(1, 2)) return false; // passive 50% dodge
			}
		},
	},
	soultimatechargemod: {
		effectType: 'Rule',
		name: 'Soultimate Charge Mod',
		desc: 'Each Yo-kai has a unique Soultimate move, which can be used once they are fully charged.',
		onSwitchIn(pokemon) {
			pokemon.soultimateMove = this.dex.species.get(pokemon.species.id).soultimateMove;
			if (pokemon.soultimateCharge === undefined) pokemon.soultimateCharge = 0;
		},
		onResidualOrder: 10,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.fainted) return;
			if (!pokemon.soultimateMove) return;
			const maxCharge = this.dex.moves.get(pokemon.soultimateMove).soultimateMaxCharge!;
			pokemon.soultimateCharge = Math.min(pokemon.soultimateCharge + 1, maxCharge);
			this.add('-message', `${pokemon.name}'s Soultimate charge rose to ${pokemon.soultimateCharge}!`);
			if (pokemon.soultimateCharge >= maxCharge) {
				pokemon.soultimateCharge = maxCharge;
				this.add('-message', `${pokemon.name}'s Soultimate is ready to be used!`);
				return;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (!source.soultimateMove) return;
			if (move.soultimateCharged) return;
			move.soultimateCharged = true;
			const maxCharge = this.dex.moves.get(source.soultimateMove).soultimateMaxCharge!;
			source.soultimateCharge = Math.min(source.soultimateCharge + 1, maxCharge);
			if (target.loafedThisTurn) {
				source.soultimateCharge = Math.min(source.soultimateCharge + 1, maxCharge);
			}
		},
	},
	elementaldamagemod: {
		effectType: 'Rule',
		name: 'Elemental Damage Mod',
		desc: 'Special attacks calculate STAB and effectiveness based on the element of the user and the target. Special Defense is standardized, and cannot have EVs invested in it.',
		onValidateSet(set) {
			if (set.evs['spd'] > 0)
				return [`${set.species} has EVs in Special Defense, which are not allowed.`];
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, attacker, defender, move) {
    		if (!move) return;
			if (!attacker.hasType(move.type) && (move.type === attacker.element ||
				(move.type === 'Rock' && attacker.element === 'Earth') ||
				(move.type === 'Flying' && attacker.element === 'Wind') ||
				(move.type === 'Electric' && attacker.element === 'Lightning'))) {
				this.debug('Same-Element damage boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(atk, attacker, defender, move) {
    		if (!move) return;
			if (!attacker.hasType(move.type) && (move.type === attacker.element ||
				(move.type === 'Rock' && attacker.element === 'Earth') ||
				(move.type === 'Flying' && attacker.element === 'Wind') ||
				(move.type === 'Electric' && attacker.element === 'Lightning'))) {
				this.debug('Same-Element damage boost');
				return this.chainModify(1.5);
			}
		},
		onEffectivenessPriority: 1,
		onEffectiveness(typeMod, target, type, move) {
			if (move.category === 'Special') {
				if (type === 'Drain' || type === 'Restoration') return 0;
				// Same element = resist
				if (target.element == type ||
				(target.element === 'Earth' && type === 'Rock') ||
				(target.element === 'Wind' && type === 'Flying') ||
				(target.element === 'Lightning' && type === 'Electric')) return 2;
				// Element weaknesses
				else if ((target.element === 'Fire' && type === 'Water') ||
						(target.element === 'Water' && type === 'Electric') ||
						(target.element === 'Lightning' && type === 'Rock') ||
						(target.element === 'Earth' && type === 'Flying') ||
						(target.element === 'Wind' && type === 'Ice') ||
						(target.element === 'Ice' && type === 'Fire')) {
							if (target?.volatiles['guard'] && target?.hasAbility('spiritguard')) return 0;
							return 1;
						}
				else return 0;
			} else if (move.category === 'Physical') {
				if (type === 'Drain' || type === 'Restoration') return;
				// Same element = resist
				if (target.element === type ||
				(target.element === 'Earth' && type === 'Rock') ||
				(target.element === 'Wind' && type === 'Flying') ||
				(target.element === 'Lightning' && type === 'Electric')) return -1;
				// Attribute weaknesses
				else if ((target.element === 'Fire' && type === 'Water') ||
						(target.element === 'Water' && type === 'Electric') ||
						(target.element === 'Lightning' && type === 'Rock') ||
						(target.element === 'Earth' && type === 'Flying') ||
						(target.element === 'Wind' && type === 'Ice') ||
						(target.element === 'Ice' && type === 'Fire')) return 1;
			}
		},
	},
    datamod: {
		effectType: 'Rule',
		name: 'Data Mod',
		desc: 'When a new Pokémon switches in for the first time, information about its types, stats and Abilities is displayed to both players.',
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				const species = this.dex.species.get(pokemon.species.name);
				const baseSpecies = Dex.species.get(pokemon.species.name);
				let modded = false;
				for (const type in [0, 1]) {
					if (species.types[type] !== baseSpecies.types[type]) {
						// console.log(species.types[type] + " is different from " + baseSpecies.types[type]);
						modded = true;
					}
				}
				modded = modded ||
				/*if*/ (species.baseStats.hp !== baseSpecies.baseStats.hp/*) modded = true;
				if*/|| species.baseStats.atk !== baseSpecies.baseStats.atk/*) modded = true;
				if*/|| species.baseStats.def !== baseSpecies.baseStats.def/*) modded = true;
				if*/|| species.baseStats.spa !== baseSpecies.baseStats.spa/*) modded = true;
				if*/|| species.baseStats.spd !== baseSpecies.baseStats.spd/*) modded = true;
				if*/|| species.baseStats.spe !== baseSpecies.baseStats.spe/*) modded = true;
				if*/|| species.abilities[0] !== baseSpecies.abilities[0]/*) modded = true;
				if*/|| species.abilities[1] !== baseSpecies.abilities[1]/*) modded = true;
				if*/|| species.abilities['H'] !== baseSpecies.abilities['H']/*) modded = true;
				if*/|| species.abilities['S'] !== baseSpecies.abilities['S'])/* modded = true*/;
				if (modded) {
					pokemon.isModded = true;
					// console.log(species.name + " is different from in canon");
				// } else {
					// console.log(species.name + " is the same as in canon");
				}
			}
		},
		onSwitchIn(pokemon) {
			let species = this.dex.species.get(pokemon.species.name);
			let switchedIn = pokemon.switchedIn;
			if (pokemon.illusion) {
				species = this.dex.species.get(pokemon.illusion.species.name);
				// console.log(pokemon.illusion.name + " is being reported");
				if (!pokemon.illusion.isModded) return;
				this.add('-start', pokemon, 'typechange', pokemon.illusion.getTypes(true).join('/'), '[silent]');
				if (pokemon.illusion.switchedIn) return;
				pokemon.illusion.switchedIn = true;
			} else {
				// console.log(pokemon.name + " is being reported");
				if (!pokemon.isModded) return;
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				if (pokemon.switchedIn) return;
				pokemon.switchedIn = true;
			}
			let abilities = species.abilities[0];
			if (species.abilities[1]) {
				abilities += ` / ${species.abilities[1]}`;
			}
			if (species.abilities['H']) {
				abilities += ` / ${species.abilities['H']}`;
			}
			if (species.abilities['S']) {
				abilities += ` / ${species.abilities['S']}`;
			}
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			}
			this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
		},
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion') || target.hasAbility('virtualreality')) { // making sure the correct information is given when an Illusion breaks
				if (target.isModded) {
					this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
					if (!target.switchedIn) {
						target.switchedIn = true;
						let species = this.dex.species.get(target.species.name);
						let abilities = species.abilities[0];
						if (species.abilities[1]) {
							abilities += ` / ${species.abilities[1]}`;
						}
						if (species.abilities['H']) {
							abilities += ` / ${species.abilities['H']}`;
						}
						if (species.abilities['S']) {
							abilities += ` / ${species.abilities['S']}`;
						}
						const baseStats = species.baseStats;
						const type = species.types[0];
						if (species.types[1]) {
							const type2 = species.types[1];
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
						} else {
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
						}
						this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					}
				} else {
					const types = target.baseSpecies.types;
					if (target.getTypes().join() === types.join()) {
						this.add('-end', target, 'typechange', '[silent]');
					}
				}
			}
		},
	},
};