export const Rulesets: {[k: string]: ModdedFormatData} = { // WIP
	stabmonsmovelegality: {
		effectType: 'ValidatorRule',
		name: 'STABmons Move Legality',
		desc: "Allows Pok&eacute;mon to use any move that they or a previous evolution/out-of-battle forme share a type with",
		ruleset: ['OM Unobtainable Moves'],
		checkCanLearn(move, species, setSources, set) {
			const nonstandard = move.isNonstandard === 'Past' && !this.ruleTable.has('standardnatdex');
			if (!nonstandard && !move.isZ && !move.isMax && !this.ruleTable.isRestricted(`move:${move.id}`)) {
				const speciesTypes: string[] = [];
				const moveTypes: string[] = [];
				// BDSP can't import Pokemon from Home, so it shouldn't grant moves from archaic species types
				const minObtainableSpeciesGen = this.dex.currentMod === 'gen8bdsp' ||
					(this.dex.gen === 9 && !this.ruleTable.has('standardnatdex')) ?
					this.dex.gen : species.gen;
				for (let i = this.dex.gen; i >= minObtainableSpeciesGen && i >= move.gen; i--) {
					const dex = this.dex.forGen(i);
					moveTypes.push(dex.moves.get(move.name).type);

					const pokemon = dex.species.get(species.name);
					const affectedPokemon = ["Arboliva", "Porygon2", "Terrakion"]; // unsure
					if (affectedPokemon.includes(pokemon) && (pokemon.forme || pokemon.otherFormes)) {
						const baseSpecies = dex.species.get(pokemon.baseSpecies);
						const originalForme = dex.species.get(pokemon.changesFrom || pokemon.name);
						speciesTypes.push(...originalForme.types);
						if (baseSpecies.otherFormes) {
							for (const formeName of baseSpecies.otherFormes) {
								if (baseSpecies.prevo) {
									const prevo = dex.species.get(baseSpecies.prevo);
									if (prevo.evos.includes(formeName)) continue;
								}
								const forme = dex.species.get(formeName);
								if (forme.changesFrom === originalForme.name && !forme.battleOnly) {
									speciesTypes.push(...forme.types);
								}
							}
						}
					} else {
						speciesTypes.push(...pokemon.types);
					}

					let prevo = pokemon.prevo;
					while (prevo) {
						const prevoSpecies = dex.species.get(prevo);
						speciesTypes.push(...prevoSpecies.types);
						prevo = prevoSpecies.prevo;
					}
				}
				if (moveTypes.some(m => speciesTypes.includes(m))) return null;
			}
			return this.checkCanLearn(move, species, setSources, set);
		},
	},
	sketchmonsmovelegality: {
		effectType: 'ValidatorRule',
		name: 'Sketchmons Move Legality',
		desc: "Pok&eacute;mon can learn one of any move they don't normally learn.",
		ruleset: ['OM Unobtainable Moves'],
		checkCanLearn(move, species, lsetData, set) {
			const affectedPokemon = ["Garchomp", "Registeel"];
			const problem = this.checkCanLearn(move, species, lsetData, set);
			if (!problem) return null;
			if (move.isZ || move.isMax || this.ruleTable.isRestricted(`move:${move.id}`)) return problem;
			const sketchMove = (set as any).sketchMove;
			if (sketchMove && sketchMove !== move.name) {
				return ` already has ${sketchMove} as a sketched move.\n(${species.name} doesn't learn ${move.name}.)`;
			}
			(set as any).sketchMove = move.name;
			return null;
		},
		onValidateTeam(team) {
			const sketches = new this.dex.Multiset<string>();
			for (const set of team) {
				if ((set as any).sketchMove) {
					sketches.add((set as any).sketchMove);
				}
			}
			const overSketched = [...sketches.entries()].filter(([moveName, count]) => count > 1);
			if (overSketched.length) {
				return overSketched.map(([moveName, count]) => (
					`You are limited to 1 of ${moveName} by Sketch Clause.\n(You have sketched ${moveName} ${count} times.)`
				));
			}
		},
	},
	'sketchpostgen7moves': {
		effectType: 'ValidatorRule',
		name: 'Sketch Post-Gen 7 Moves',
		desc: "Allows Pokémon who learn Sketch to learn any Gen 8+ move (normally, Sketch is not usable in Gen 8+).",
		// Implemented in sim/team-validator.ts
	},
	bonustypemod: {
		name: "Bonus Type Mod",
		effectType: "Rule",
		desc: `Pok&eacute;mon have their Tera Type added onto their current ones.`,
		onBegin() {
			this.add('rule', 'Bonus Type Mod: Pok\u00e9mon have their Tera Type added onto their current ones.');
		},
		onModifySpeciesPriority: 1,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const typesSet = new Set(species.types);
			const bonusType = this.dex.types.get(target.teraType);
			if (bonusType.exists) typesSet.add(bonusType.name);
			return {...species, types: [...typesSet]};
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},
	revelationmonsmod: {
		effectType: "Rule",
		name: "Revelationmons Mod",
		desc: `The moves in the first slot(s) of a Pok&eacute;mon's set have their types changed to match the Pok&eacute;mon's type(s).`,
		onBegin() {
			this.add('rule', 'Revelationmons Mod: The first moveslots have their types changed to match the Pok\u00e9mon\'s types');
		},
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const slotIndex = species.types.length - 1;
			const problems = [];
			for (const [i, moveid] of set.moves.entries()) {
				const move = this.dex.moves.get(moveid);
				if (!this.ruleTable.isRestricted(`move:${move.id}`)) continue;
				if (i <= slotIndex) {
					problems.push(`${move.name} can't be in moveslot ${i + 1} because it's restricted from being in the first ${slotIndex + 1 > 1 ? `${slotIndex + 1} slots` : 'slot'}.`);
				}
			}
			return problems;
		},
		onModifyMove(move, pokemon, target) {
			const types = pokemon.getTypes(true);
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (noModifyType.includes(move.id)) return;
			for (const [i, type] of types.entries()) {
				if (!this.dex.types.isName(type)) continue;
				if (pokemon.moveSlots[i] && move.id === pokemon.moveSlots[i].id) move.type = type;
			}
		},
	},
	reevolutionmod: {
		effectType: "Rule",
		name: "Re-Evolution Mod",
		desc: "Pok&eacute;mon gain the stat changes they would gain from evolving again.",
		onBegin() {
			this.add('rule', 'Re-Evolution Mod: Pok\u00e9mon gain the boosts they would gain from evolving again');
		},
		onModifySpecies(species, target) {
			const newSpecies = this.dex.deepClone(species);
			const baseSpecies = this.dex.species.get(
				(Array.isArray(species.battleOnly) ? species.battleOnly[0] : species.battleOnly) || species.changesFrom || species.name
			);
			if (!newSpecies.prevo) {
				if (!baseSpecies.prevo) return;
				const prevoSpecies = this.dex.species.get(baseSpecies.prevo);
				let statid: StatID;
				newSpecies.bst = 0;
				for (statid in prevoSpecies.baseStats) {
					const change = baseSpecies.baseStats[statid] - prevoSpecies.baseStats[statid];
					const formeChange = newSpecies.baseStats[statid] - baseSpecies.baseStats[statid];
					newSpecies.baseStats[statid] = this.clampIntRange(baseSpecies.baseStats[statid] + change, 1, 255);
					newSpecies.baseStats[statid] = this.clampIntRange(newSpecies.baseStats[statid] + formeChange, 1, 255);
					newSpecies.bst += newSpecies.baseStats[statid];
				}
				return newSpecies;
			}
			const prevoSpecies = this.dex.species.get(newSpecies.prevo);
			let statid: StatID;
			newSpecies.bst = 0;
			for (statid in prevoSpecies.baseStats) {
				const change = newSpecies.baseStats[statid] - prevoSpecies.baseStats[statid];
				newSpecies.baseStats[statid] = this.clampIntRange(newSpecies.baseStats[statid] + change, 1, 255);
				newSpecies.bst += newSpecies.baseStats[statid];
			}
			return newSpecies;
		},
	},
	convergencelegality: {
		effectType: 'ValidatorRule',
		name: "Convergence Legality",
		desc: `Allows all Pok&eacute;mon that have identical types to share moves and abilities.`,
		onValidateSet(set, format) {
			const curSpecies = this.dex.species.get(set.species);
			const obtainableAbilityPool = new Set<string>();
			const matchingSpecies = this.dex.species.all()
				.filter(species => (
					(!species.isNonstandard || this.ruleTable.has(`+pokemontag:${this.toID(species.isNonstandard)}`)) &&
					species.types.every(type => curSpecies.types.includes(type)) &&
					species.types.length === curSpecies.types.length && !this.ruleTable.isBannedSpecies(species)
				));
			for (const species of matchingSpecies) {
				for (const abilityName of Object.values(species.abilities)) {
					const abilityid = this.toID(abilityName);
					obtainableAbilityPool.add(abilityid);
				}
			}
			if (!obtainableAbilityPool.has(this.toID(set.ability))) {
				return [`${curSpecies.name} doesn't have access to ${this.dex.abilities.get(set.ability).name}.`];
			}
		},
		checkCanLearn(move, species, setSources, set) {
			const matchingSpecies = this.dex.species.all()
				.filter(s => (
					(!s.isNonstandard || this.ruleTable.has(`+pokemontag:${this.toID(s.isNonstandard)}`)) &&
					s.types.every(type => species.types.includes(type)) &&
					s.types.length === species.types.length && !this.ruleTable.isBannedSpecies(s)
				));
			const someCanLearn = matchingSpecies.some(s => this.checkCanLearn(move, s, setSources, set) === null);
			if (someCanLearn) return null;
			return this.checkCanLearn(move, species, setSources, set);
		},
	},
	franticfusionsmod: {
		effectType: 'Rule',
		name: "Frantic Fusions Mod",
		desc: `Pok&eacute;mon nicknamed after another Pok&eacute;mon get their stats buffed by 1/4 of that Pok&eacute;mon's stats, barring HP, and access to their abilities.`,
		onBegin() {
			this.add('rule', 'Frantic Fusions Mod: Pok\u00e9mon nicknamed after another Pok\u00e9mon get buffed stats and more abilities.');
		},
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const fusion = this.dex.species.get(set.name);
			const abilityPool = new Set<string>(Object.values(species.abilities));
			if (fusion.exists) {
				for (const ability of Object.values(fusion.abilities)) {
					abilityPool.add(ability);
				}
			}
			const ability = this.dex.abilities.get(set.ability);
			if (!abilityPool.has(ability.name)) {
				return [`${species.name} only has access to the following abilities: ${Array.from(abilityPool).join(', ')}.`];
			}
		},
		onValidateTeam(team, format) {
			const donors = new this.dex.Multiset<string>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				const fusion = this.dex.species.get(set.name);
				if (fusion.exists) {
					set.name = fusion.name;
				} else {
					set.name = species.baseSpecies;
					if (species.baseSpecies === 'Unown') set.species = 'Unown';
				}
				if (fusion.name === species.name) continue;
				donors.add(fusion.name);
			}
			for (const [fusionName, number] of donors) {
				if (number > 1) {
					return [`You can only fuse with any Pok\u00e9 once.`, `(You have ${number} Pok\u00e9mon fused with ${fusionName}.)`];
				}
				const fusion = this.dex.species.get(fusionName);
				if (this.ruleTable.isBannedSpecies(fusion) || fusion.battleOnly) {
					return [`Pok\u00e9mon can't fuse with banned Pok\u00e9mon.`, `(${fusionName} is banned.)`];
				}
				if (fusion.isNonstandard &&
					!(this.ruleTable.has(`+pokemontag:${this.toID(fusion.isNonstandard)}`) ||
						this.ruleTable.has(`+pokemon:${fusion.id}`) ||
						this.ruleTable.has(`+basepokemon:${this.toID(fusion.baseSpecies)}`))) {
					return [`${fusion.name} is marked as ${fusion.isNonstandard}, which is banned.`];
				}
			}
		},
		onModifySpecies(species, target, source, effect) {
			if (!target) return;
			const newSpecies = this.dex.deepClone(species);
			const fusionName = target.set.name;
			if (!fusionName || fusionName === newSpecies.name) return;
			const fusionSpecies = this.dex.deepClone(this.dex.species.get(fusionName));
			newSpecies.bst = newSpecies.baseStats.hp;
			for (const stat in newSpecies.baseStats) {
				if (stat === 'hp') continue;
				const addition = Math.floor(fusionSpecies.baseStats[stat] / 4);
				newSpecies.baseStats[stat] = this.clampIntRange(newSpecies.baseStats[stat] + addition, 1, 255);
				newSpecies.bst += newSpecies.baseStats[stat];
			}
			return newSpecies;
		},
	},
};