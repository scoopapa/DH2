export const Abilities: {[k: string]: ModdedAbilityData} = {
	firstflight: {
		name: "First Flight",
		shortDesc: "User is considered airborne until hit with an attack. Resets upon switching out.",
		onStart(target) {
			if (!this.field.getPseudoWeather('gravity')) {
				this.add('-ability', target, 'First Flight');
				target.addVolatile('flight');
			}
		},
		condition: {
			onStart(target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'First Flight');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onDamagingHit(damage, target, source, move) {
				source.removeVolatile('flight');
			},
			onEnd(target) {
				this.add('-end', target, 'First Flight');
			},
		},
	},
	headbarrage: {
		name: "Head Barrage",
		shortDesc: "All Special moves used by the user become physical and add 25% recoil.",
		onModifyMove(move) {
			if(move.category === 'Special') {
				if (!move.recoil) move.recoil = [1, 4];
				move.category = 'Physical';
			}
		},
	},
	leatherback: {
		name: "Leatherback",
		shortDesc: "This Pokemon's Special Defense is raised one stage if hit by an Electric move; Electric immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spd: 1})) {
					this.add('-immune', target, '[from] ability: Leatherback');
				}
				return null;
			}
		},
		isBreakable: true,
	},
	specterate: {
		name: "Specterate",
		shortDesc: "This Pokemon's Normal-type moves become Ghost type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ghost';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
	},
};