export const Abilities: import('../sim/dex-abilities').AbilityDataTable = {
	poisonpuppeteer: {
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source.baseSpecies.name !== "Chameleos") return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('confusion');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Poison Puppeteer",
		shortDesc: "Chameleos: If this Pokemon poisons a target, the target also becomes confused.",
		rating: 3,
		num: 310,
	},
	icearmor: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical' && target.species.id === 'zamtrios') {
					this.add('-ability', target, 'Ice-Armor');
					this.add('-message', `Zamtrios is transforming!`);
					target.formeChange('zamtriosiced', this.effect, true);
				}
			},
			onStart(pokemon) {
				if (this.field.isWeather(['hail', 'snow']) && pokemon.species.id === 'zamtrios') {
					this.add('-ability', pokemon, 'Ice-Armor');
					this.add('-message', `Zamtrios is transforming!`);
					pokemon.formeChange('zamtriosiced', this.effect, true);
				}
			},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, 
			notransform: 1},
		name: "Ice-Armor",
		shortDesc: "This pokemon will react to a physical attack by encasing it's body in ice.",
		rating: 3,
		num: 1000,
	},
	puffup: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special' && target.species.id === 'zamtrios') {
					this.add('-ability', target, 'Puff-Up');
					this.add('-message', `Zamtrios is transforming!`);
					target.formeChange('zamtriospuffed', this.effect, true);
				}
			},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, 
			notransform: 1},
		name: "Puff-Up",
		shortDesc: "This pokemon will react to a special attack by puffing up it's body.",
		rating: 3,
		num: 1001,
	},
}