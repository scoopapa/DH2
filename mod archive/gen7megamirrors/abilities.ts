export const Abilities: {[k: string]: ModdedAbilityData} = {
	savagery: {
		shortDesc: "Boosts the user's SpA by 1 after a KO.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source);
			}
		},
		name: "Savagery",
		rating: 3,
	},
	pointedplummage: {
		shortDesc: "The opponent loses 1/8 of their max HP if they hit this Pokemon with a contact move.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Pointed Plummage",
		rating: 2.5,
	},
	rhoinfluence: {
		shortDesc: "Placeholder, acts like a Primal Psychic Surge.",
		onStart(source) {
			this.field.clearTerrain();
			this.field.setTerrain('psychicterrain');
		},
		onAnyTerrainStart(target, source, terrain) {
			if (!source.hasAbility('rhoinfluence')) {
				this.field.setTerrain('psychicterrain', this.effectData.target);
			}
		},
		onEnd(pokemon) {
			if (this.field.terrainData.source !== pokemon || !this.field.isTerrain('psychicterrain')) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('rhoinfluence')) {
					this.field.terrainData.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		name: "Rho Influence",
		rating: 5,
	},
	primordialsoup: {
		shortDesc: "Placeholder, acts like a Primal Grassy Surge.",
		onStart(source) {
			this.field.clearTerrain();
			this.field.setTerrain('grassyterrain');
		},
		onAnyTerrainStart(target, source, terrain) {
			if (!source.hasAbility('primordialsoup')) {
				this.field.setTerrain('grassyterrain', this.effectData.target);
			}
		},
		onEnd(pokemon) {
			if (this.field.terrainData.source !== pokemon || !this.field.isTerrain('grassyterrain')) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('primordialsoup')) {
					this.field.terrainData.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		name: "Primordial Soup",
		rating: 4.5,
	},
	apocalypticwasteland: {
		shortDesc: "Placeholder, acts like Sand Stream.",
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'sandstorm' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('apocalypticwasteland')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		name: "Apocalyptic Wasteland",
		rating: 4.5,
	},
};
