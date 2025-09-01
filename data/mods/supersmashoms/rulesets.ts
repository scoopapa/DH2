export const Rulesets: {[k: string]: ModdedFormatData} = { // WIP
	movelegality: {
		effectType: 'ValidatorRule',
		name: 'Move Legality',
		desc: "Move validator for STABmons, Sketchmons and Convergence.",
		ruleset: ['OM Unobtainable Moves'],
		checkCanLearn(move, species, setSources, set) {
			const STABList = ["Arboliva", "Porygon2", "Terrakion"]; 
			const SketchList = ["Garchomp", "Registeel"];
			const ConvList = ["Greninja", "Ogerpon", "Zarude"];
			// STABmons
			const nonstandard = move.isNonstandard === 'Past' && !this.ruleTable.has('standardnatdex');
			if (!nonstandard && !move.isZ && !move.isMax && !this.ruleTable.isRestricted(`move:${move.id}`) && STABList.includes(species.name)) {
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
					if (pokemon.forme || pokemon.otherFormes) {
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
			// Convergence
			const matchingSpecies = this.dex.species.all()
				.filter(s => (
					(!s.isNonstandard || this.ruleTable.has(`+pokemontag:${this.toID(s.isNonstandard)}`)) &&
					s.types.every(type => species.types.includes(type)) &&
					s.types.length === species.types.length && !this.ruleTable.isBannedSpecies(s)
				));
			const someCanLearn = matchingSpecies.some(s => this.checkCanLearn(move, s, setSources, set) === null);
			if (someCanLearn && ConvList.includes(species.name)) return null;
			// Sketchmons
			const problem = this.checkCanLearn(move, species, setSources, set);
			if (!problem) return null;
			if (move.isZ || move.isMax || this.ruleTable.isRestricted(`move:${move.id}`)) return problem;
			if (!SketchList.includes(species.name)) return problem; // added line
			const sketchMove = (set as any).sketchMove;
			if (sketchMove && sketchMove !== move.name) {
				return ` already has ${sketchMove} as a sketched move.\n(${species.name} doesn't learn ${move.name}.)`;
			}
			const SketchBanlist = ["Astral Barrage", "Belly Drum", "Boomburst", "Ceaseless Edge", "Clangorous Soul", "Dire Claw", "Extreme Speed", "Gigaton Hammer", 
				"Glacial Lance", "Fillet Away", "Jet Punch", "Last Respects", "Lumina Crash", "No Retreat", "Quiver Dance", "Rage Fist", "Revival Blessing", "Shell Smash", 
				"Shed Tail", "Shift Gear", "Tail Glow", "Torch Song", "Transform", "Triple Arrows", "V-Create", "Victory Dance", "Wicked Blow"];
			if (SketchBanlist.includes(sketchMove)) {
				return ` has banned move ${sketchMove}.)`;
			}
			(set as any).sketchMove = move.name;
			return null;
		},
		onValidateTeam(team) {
			// Sketchmons
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
		onValidateSet(set, format) {
			const ConvList = ["Greninja", "Ogerpon", "Zarude"];
			const AAAList = ["Cresselia", "Slither Wing", "Quaquaval", "Scream Tail"];
			const FranticList = ["Bellibolt", "Crabominable", "Ninetales", "Tinkaton"];
			// Convergence + AAA
			const curSpecies = this.dex.species.get(set.species);
			let ability = set.ability;
			let listAbilities = [];
			if (curSpecies.abilities['0']) listAbilities.push(curSpecies.abilities['0']);
			if (curSpecies.abilities['1']) listAbilities.push(curSpecies.abilities['1']);
			if (curSpecies.abilities['H']) listAbilities.push(curSpecies.abilities['H']);
			if (curSpecies.abilities['S']) listAbilities.push(curSpecies.abilities['S']);
			if (!ConvList.includes(curSpecies.name) && !AAAList.includes(curSpecies.name) && !FranticList.includes(curSpecies.name) && !Object.values(listAbilities).includes(ability)) return [`${curSpecies.name} cannot have ${this.dex.abilities.get(set.ability).name}.`];
			if (FranticList.includes(curSpecies.name)) {
				const fusions = {
				    "Bellibolt": "houndstone",
				    "Crabominable": "tinglu",
				    "Ninetales": "torkoal",
				    "Tinkaton": "sylveon"
				};
				const fusee = fusions[curSpecies.name];
				const fuseSpecies = this.dex.species.get(fusee);
				const abilityPool = new Set<string>(Object.values(curSpecies.abilities));
				if (fusee) {
					for (const ability of Object.values(fuseSpecies.abilities)) {
						abilityPool.add(ability);
					}
				}
				const ability = this.dex.abilities.get(set.ability);
				if (!abilityPool.has(ability.name)) {
					return [`${curSpecies.name} only has access to the following abilities: ${Array.from(abilityPool).join(', ')}.`];
				}				
			}
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
			// AAA
			const AAAbanlist = ["Arena Trap", "Comatose", "Contrary", "Fur Coat", "Good as Gold", "Gorilla Tactics", "Huge Power", "Ice Scales", "Illusion", "Imposter", 
				"Innards Out", "Magic Bounce", "Magnet Pull", "Moody", "Neutralizing Gas", "Orichalcum Pulse", "Parental Bond", "Poison Heal", "Pure Power", "Shadow Tag", 
				"Simple", "Speed Boost", "Stakeout", "Triage", "Toxic Debris", "Unburden", "Water Bubble", "Wonder Guard",
				"Hawlucha Abilities", "Clodsire Abilities"];
			if (!obtainableAbilityPool.has(this.toID(set.ability)) && !AAAList.includes(curSpecies.name) && !FranticList.includes(curSpecies.name)) {
				return [`${curSpecies.name} doesn't have access to ${this.dex.abilities.get(set.ability).name}.`];
			}
			if (AAAList.includes(curSpecies.name) && AAAbanlist.includes(set.ability)) {
				return [`${curSpecies.name} has banned ability ${this.dex.abilities.get(set.ability).name}.`];
			}
			// Nature Swap but hardcode
			if (curSpecies.name === 'Enamorus-Therian' && set.nature !== 'Timid') {
				return [`${curSpecies.name} cannot run the nature ${this.dex.abilities.get(set.nature).name}.`];
			}
		},
	},
	revelationmonsmodmodded: {
		effectType: "Rule",
		name: "Revelationmons Mod Modded",
		desc: `The moves in the first slot(s) of a Pok&eacute;mon's set have their types changed to match the Pok&eacute;mon's type(s).`,
		onBegin() {
			this.add('rule', 'Revelationmons Mod: The first moveslots have their types changed to match the Pok\u00e9mon\'s types');
		},
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const revelationmons = ['Tyranitar'];
			const slotIndex = species.types.length - 1;
			const problems = [];
			if (!revelationmons.includes(species.name)) return problems;
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
			const revelationmons = ['Tyranitar'];
			if (!revelationmons.includes(pokemon.name)) return;
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
};