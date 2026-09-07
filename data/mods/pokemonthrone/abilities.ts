export const Abilities: import('../sim/dex-abilities').AbilityDataTable = {
	anticlockwise: {
		onDamagingHit(damage, target, source, move) {
			if (move.category !== 'Physical') return;

			if (target.side.field.getPseudoWeather('trickroom')) {
				target.side.field.removePseudoWeather('trickroom');
				this.add('-ability', target, 'Anticlockwise');
				this.add('-message', `The dimensions returned to normal!`);
				return;
			}

			target.side.field.addPseudoWeather('trickroom', target, this.effect, 5);
			this.add('-ability', target, 'Anticlockwise');
			this.add('-message', `The dimensions were twisted!`);
		},
		flags: {},
		name: "Anticlockwise",
		shortDesc: "Activates Trick Room (5 turn duration) in response to a physical attack.",
	},
	fireabsorb: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Fire Absorb');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Fire Absorb",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Fire moves; Fire immunity.",
	},
	flowerpower: {
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifyDef(def, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpA(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpD(spd, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Flower Power",
		shortDesc: "In sun, this Pokémon's Attack, Defense, SpA, SpD, and Speed are multiplied by 1.5.",
	},
	fullcircle: {
		onDamagingHit(damage, target, source, move) {
			if (!source || !damage) return;
			this.queue.insertChoice({
				choice: 'runCircle',
				pokemon: target,
				priority: -100,
				callback: () => {
					this.damage(damage, source, target, null, true);
				},
			});
		},
		flags: {},
		name: "Full Circle",
		shortDesc: "When hit by an attack, attacker takes indirect damage equal to HP this Pokémon lost.",
	},
	glochidia: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const spikes = side.sideConditions['spikes'];
			if (move.category === 'Physical' && (!spikes || spikes.layers < 3)) {
				this.add('-activate', target, 'ability: Glochidia');
				side.addSideCondition('spikes', target);
			}
		},
		flags: {},
		name: "Glochidia",
		shortDesc: "If this Pokemon is hit by a physical attack, Spikes are set on the opposing side.",
	},
	healingchime: {
		name: "Healing Chime",
		shortDesc: "On switch-in, cures all party status if any ally is statused.",
		onStart(pokemon) {
			const side = pokemon.side;
			let hasStatus = false;
			// Check if anyone on the side has a status condition
			for (const ally of side.pokemon) {
				if (ally.status) {
					hasStatus = true;
					break;
				}
			}
			if (!hasStatus) return;
			// Activate ability
			this.add('-ability', pokemon, 'Healing Chime');
			this.add('-message', `A soothing chime echoed across ${side.name}'s party!`);
			// Cure all party status
			for (const ally of side.pokemon) {
				if (ally.status) {
					ally.cureStatus();
				}
			}
		},
	},
}
