export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	quakingboom: {
		shortDesc: "Follows up sound moves with an Earthquake of 60 BP.",
		name: "Quaking Boom",
		onSourceHit(target, source, move) {
			if (!move || !target || !target.hp) return;
			if (target !== source && target.hp && move.flags['sound']) {
				source.addVolatile('quakingboom');
				this.useMove('earthquake', source);
			}
		},
		rating: 3,
		num: -5000,
	},
	reverberation: {
		shortDesc: "Sound moves echo over the following two turns.",
		name: "Reverberation",
		rating: 3,
		num: -5000,
	},
	acidrock: {
		desc: "On switch-in, the field becomes Acidic Terrain. This terrain remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Acidic Terrain begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.clearTerrain();
			this.field.setTerrain('acidicterrain');
		},
		onAnyTerrainStart(target, source, terrain) {
			if (!source.hasAbility('arenarock') && !source.hasAbility('acidrock')) {
				this.field.setTerrain('acidicterrain');
			}
		},
		onEnd(pokemon) {
			if (this.field.terrainData.source !== pokemon || !this.field.isTerrain('grassyterrain')) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('acidrock')) {
					this.field.terrainData.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		name: "Acid Rock",
		rating: 3,
		num: -5000,
	},
	arenarock: {
		desc: "On switch-in, the field becomes Grassy Terrain. This terrain remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Grassy Terrain begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.clearTerrain();
			this.field.setTerrain('grassyterrain');
		},
		onAnyTerrainStart(target, source, terrain) {
			if (!source.hasAbility('arenarock') && !source.hasAbility('acidrock')) {
				this.field.setTerrain('grassyterrain');
			}
		},
		onEnd(pokemon) {
			if (this.field.terrainData.source !== pokemon || !this.field.isTerrain('grassyterrain')) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('arenarock')) {
					this.field.terrainData.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		name: "Arena Rock",
		rating: 4.5,
		num: -1004,
	},
	magnetrock: {
		shortDesc: "Electric moves create a new field effect for the team.",
		name: "Magnet Rock",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.type === 'Electric') {
				source.side.addSideCondition('magnetrock');
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (this.effectData.target.side.getSideCondition('magnetrock')) {
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Electric'] = true;
				}
			}
		},
		condition: {
			duration: 5,
			onStart(side) {
				for (const target of side.active) {
					target.addVolatile('magnetrise');
				}
			},
			onBeforeSwitchIn(pokemon) {
				if (pokemon.side === this.effectData.side) {
					pokemon.addVolatile('magnetrise', '[silent]');
				}
			},
			onSwitchin(pokemon) {
				if (pokemon.volatiles['magnetrise']) {
					this.add('-start', pokemon, 'Magnet Rise');
				}
			},
			onRestart(side) {
				this.effectData.duration = 5;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd(side) {
				for (const target of side.active) {
					target.removeVolatile('magnetrise');
				}
			},
		},
		rating: 3,
		num: -5000,
	},
	ascendingkey: {
		shortDesc: "Sound moves: raise target's Sp. Def before, sharply raise user's Sp. Atk after.",
		name: "Ascending Key",
		onTryHit(target, source, move) {
			if (move.flags['sound']) {
				this.boost({spd: 1}, target);
			}
		},
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.flags['sound']) {
				this.boost({spa: 2}, source);
			}
		},
		rating: 3,
		num: -5000,
	},
	descendingkey: {
		shortDesc: "Sound moves: lower target's Sp. Def before, sharply lower user's Sp. Atk after.",
		name: "Descending Key",
		onTryHit(target, source, move) {
			if (move.flags['sound']) {
				this.boost({spd: -1}, target);
			}
		},
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (move.flags['sound']) {
				this.boost({spa: -2}, source);
			}
		},
		rating: 3,
		num: -5000,
	},
};
