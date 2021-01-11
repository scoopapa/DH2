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
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.flags['sound']) {
				if (source.volatiles['reverberation']) {
					console.log("Source is echoing, so no need to make a new echo for " + move.name);
					return;
				}
				if (!source.volatiles['reverberation1']) {
					console.log("Setting " + move.name + "to fill the first reverb slot");
					source.addVolatile('reverberation1')
					source.volatiles['reverberation1'].moveid = move.id;
				} else if (!source.volatiles['reverberation2']) {
					console.log("Setting " + move.name + "to fill the second reverb slot");
					source.addVolatile('reverberation2')
					source.volatiles['reverberation2'].moveid = move.id;
				} else if (!source.volatiles['reverberation3']) {
					console.log("Setting " + move.name + "to fill the third reverb slot");
					source.addVolatile('reverberation3')
					source.volatiles['reverberation3'].moveid = move.id;
				}
			}
		},
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
			if (this.field.terrainData.source !== pokemon || !this.field.isTerrain('acidicterrain')) return;
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
				source.side.sideConditions['magnetrock'].source = source;
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
			onRestart(side) {
				this.effectData.duration = 5;
				this.add('-message', `The electromagnetism around ${this.effectData.source.name}'s team was recharged!`);
			},
			onStart(side) {
				this.add('-message', `${this.effectData.target.name}'s team is levitating with electromagnetism!`);
				this.add('-message', `Pokémon with Magnet Rock can bypass immunities to Electric-type moves!`);
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd(side) {
				this.add('-message', `${this.effectData.source.name}'s team is no longer levitating!`);
			},
		},
		rating: 3,
		num: -5000,
	},
	ascendingkey: {
		shortDesc: "Sound moves: raise target's Sp. Def before, sharply raise user's Sp. Atk after.",
		name: "Ascending Key",
		onSourceTryHit(target, source, move) {
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
		onSourceTryHit(target, source, move) {
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
