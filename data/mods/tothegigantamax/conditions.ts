export const Conditions: {[k: string]: ModdedConditionData} = {
	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		duration: 3,
		onStart(pokemon) {
			pokemon.removeVolatile('minimize');
			pokemon.removeVolatile('substitute');
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax');
			if (pokemon.gigantamax) {
				const gMaxSpecies = this.dex.getSpecies(pokemon.species.name + '-Gmax');
				this.add('-formechange', pokemon, gMaxSpecies);
				
				//Type change
				if (pokemon.species && (pokemon.species.num === 493 || pokemon.species.num === 773)) return;
				let newBaseTypes = gMaxSpecies.getTypes(true).filter(type => type !== '???');
				pokemon.setType(newBaseTypes);
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
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
			if (pokemon.gigantamax) {
				this.add('-formechange', pokemon, pokemon.species.name);
				//Change the type back
				pokemon.setType(pokemon.species.types);
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},
};