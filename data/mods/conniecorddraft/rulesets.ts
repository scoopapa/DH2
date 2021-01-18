export const Formats: {[k: string]: FormatData} = {
	antiinvulnerabilitymod: {
		effectType: 'Rule',
		name: 'Anti-Invulnerability Mod',
		desc: 'If a Pokémon has become invulnerable by being revived improperly, this allows it to take damage and faint normally.',
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (damage > target.hp) {
				return target.hp;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.maxhp === 1 && pokemon.hp < 1) {
				this.add('faint', pokemon);
				pokemon.side.pokemonLeft--;
				this.runEvent('Faint', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon);
				pokemon.clearVolatile(false);
				pokemon.fainted = true;
				pokemon.illusion = null;
				pokemon.isActive = false;
				pokemon.isStarted = false;
				pokemon.side.faintedThisTurn = true;
			}
		},
	},
	
	movexitclause: {
		effectType: 'ValidatorRule', 
		name: 'Movexit Clause', 
		desc: 'Moves cut from Pokémon Sword and Shield are not usable.',
		onValidateSet(set) {
			const problems = [];
			if (set.moves) {
				for (const id of set.moves) {
					const move = this.dex.getMove(id);
					if (move.isNonstandard && move.isNonstandard === 'Past') problems.push(move.name + ' does not exist in Gen 8.');
				}
			}
			return problems;
		},
	},
	
	speciesclause: {//I hope I did not break this
		effectType: 'ValidatorRule',
		name: 'Species Clause',
		desc: "Prevents teams from having more than one Pokémon from the same species, not counting forms.",
		onBegin() {
			this.add('rule', 'Species Clause: Limit one of each Pokémon (not counting forms)');
		},
		onValidateTeam(team, format) {
			const speciesTable: Set<number> = new Set();
			for (const set of team) {
				const species = this.dex.getSpecies(set.species);
				if (speciesTable.has(species)) {
					
					return [`You are limited to one of each Pokémon by Species Clause.`, `(You have more than one ${species.name})`];
				}
				speciesTable.add(species);
			}
		},
	},
};
