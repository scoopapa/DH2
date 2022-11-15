export const Abilities: {[k: string]: ModdedAbilityData} = {

success: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length}, source);
			}
		},
		name: "Success",
		desc: "This Pokémon's Speed is raised by 1 stage if it attacks and KOes another Pokémon.",
		rating: 3,
		num: 10000,
	},
hotknife: {
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'brn',
				ability: this.dex.getAbility('hotknife'),
			});
		},
		name: "Hot Knife",
		desc: "This Pokémon's Contact moves have a 30% chance of burning.",
		rating: 2,
		num: 10001,
	},
openmind: {
		onModifySpe(spe) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(2);
			}
		},
		name: "Open Mind",
		desc: "If Psychic Terrain is active, this Pokémon's speed is doubled.",
		rating: 3,
		num: 10002,
	},
voidbody: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.add('-ability', target, 'Void Body');
				this.boost({atk: -1}, source, target, null, true);
			}
		},
		name: "Void Body",
		desc: "Pokémon making contact with this Pokémon have their Attack lowered by 1 stage.",
		rating: 2,
		num: 10003,
	},
frightening: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Frightening', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Frightening",
		desc: "On switch-in, this Pokémon lowers the SpA of opponents by 1 stage.",
		rating: 3.5,
		num: 10004,
	},
eternalice: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.3);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.3);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Eternal Ice');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Eternal Ice');
			}
			return false;
		},
		name: "Eternal Ice",
		desc: "This Pokémon's Ice power is 1.3x; It can't be burned; Fire power against it is halved.",
		rating: 4.5,
		num: 10005,
	},
leecher: {
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([0x14CC, 0x1000]);
			}
		},
		name: "Leecher",
		desc: "Gains 1.3x HP from draining moves, Aqua Ring, Ingrain, Leech Seed and Strength Sap.",
		rating: 3.5,
		num: 10006,
	},
airionizer: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Air Ionizer');
				}
				return null;
			}
		},
		name: "Air Ionizer",
		desc: "This Pokémon SpA is raised 1 stage if hit by a Flying move; Flying immunity.",
		rating: 3,
		num: 10007,
	},
deepsea: {
		onModifyDef(def, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
            onModifySpD(spd, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		name: "Deep Sea",
		desc: "If Rain is active, this Pokemon's Defense and Special defense is doubled.",
		rating: 3,
		num: 10008,
	},
};
