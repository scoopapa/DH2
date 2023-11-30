export const Abilities: {[abilityid: string]: AbilityData} = {
	crystalize: {
		onAfterUseItem(item, pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'groundpoison' || pokemon.transformed) {
				return;
			}
			this.add('-activate', pokemon, 'ability: Crystalize');
			pokemon.formeChange('groundpoison-Crystallized', this.effect, true);
		},
		onTakeItem(item, pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'groundpoison' || pokemon.transformed) {
				return;
			}
			this.add('-activate', pokemon, 'ability: Crystalize');
			pokemon.formeChange('groundpoison-Crystallized', this.effect, true);
		},
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'groundpoison' && !pokemon.item) {
				this.add('-activate', pokemon, 'ability: Crystalize');
				pokemon.formeChange('groundpoison-Crystallized', this.effect, true);
			}
		},
		name: "Crystalize",
		shortDesc: "groundpoison: transforms if no item or upon item loss or use.",
	},
	downdraft: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Downdraft', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Downdraft",
		shortDesc: "On switch-in, this Pokemon lowers the Spe of opponents by 1 stage.",
	},
	eideticmemory: {
		onAnyTryMove(target, source, effect) {
			if (['stealthrock', 'spikes', 'toxicspikes', 'stickyweb', 'rapidspin', 'defog', 'courtchange'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Bubble Mane', effect, '[of] ' + target);
				return false;
			}
		},
		name: "Eidetic Memory",
		shortDesc: "While this Pokemon is active, entry hazards cannot be removed or set.",
	},
	
	//vanilla interactions
	innerfocus: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', '[of] ' + target);
			}
			if (effect.name === 'Downdraft' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Inner Focus', '[of] ' + target);
			}
		},
	},
	oblivious: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', '[of] ' + target);
			}
			if (effect.name === 'Downdraft' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Oblivious', '[of] ' + target);
			}
		},
	},
	owntempo: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', '[of] ' + target);
			}
			if (effect.name === 'Downdraft' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Own Tempo', '[of] ' + target);
			}
		},
	},
	scrappy: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', '[of] ' + target);
			}
			if (effect.name === 'Downdraft' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Scrappy', '[of] ' + target);
			}
		},
	},
};
