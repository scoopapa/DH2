export const Conditions: {[k: string]: ConditionData} = {
	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		duration: 3,
		onStart(pokemon) {
			pokemon.removeVolatile('substitute');
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax');
			const gMaxSpecies = this.dex.getSpecies(pokemon.species.name + '-Gmax');
			if (pokemon.gigantamax && pokemon.canGigantamax) this.add('-formechange', pokemon, gMaxSpecies);
			if (pokemon.species.maxAb || gMaxSpecies.gMaxAb) {
				if (pokemon.gigantamax && pokemon.canGigantamax && gMaxSpecies.gMaxAb) {
					pokemon.setAbility(gMaxSpecies.gMaxAb[0]); 
					this.add('-ability', pokemon, gMaxSpecies.gMaxAb[0]); 
				}
				else {
					pokemon.setAbility(pokemon.species.maxAb[0]); 
					this.add('-ability', pokemon, pokemon.species.maxAb[0]); 
				}
			}
			if (pokemon.baseSpecies.name === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = this.format.id.startsWith('gen8doublesou') ? 1.5 : 2;

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.canGigantamax) this.add('-formechange', pokemon, pokemon.species.name);
			if (pokemon.species.maxAb) {
				pokemon.setAbility(pokemon.baseAbility); 
				this.add('-ability', pokemon, pokemon.baseAbility); 
			}
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},	
	
	
	
};