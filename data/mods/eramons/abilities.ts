export const Abilities: {[k: string]: ModdedAbilityData} = {
	beyondadoubt: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				target.species.id === "falsiken" && !target.transformed
			) {
				this.add('-activate', target, 'ability: Beyond A Doubt');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (target.species.id !== "falsiken") {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (target.species.id !== "falsiken") {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === "falsiken" && this.effectState.busted) {
				const speciesid = 'Falsiken-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
			}
		},
		isBreakable: true,
		isPermanent: true,
		name: "Beyond A Doubt",
		shortDesc: "(Falsiken only) The first hit it takes is blocked, and it takes 1/8 HP damage instead.",
		rating: 3.5,
		num: -100,
	},
	endlessrotation: {
		onDamagingHit(damage, target, source, move) {
			const otherSpinMoves = ["blazingtorque", "combattorque", "magicaltorque", "noxioustorque",
			, "wickedtorque", "drillrun", "gyroball", "rollout", "iceball", "flipturn", "uturn", "raindance",
			"electrodrift", "darkestlariat", "flamewheel"]

			let activated = false;
			if (move.id.includes("spin") || otherSpinMoves.includes(move.id)) {
				for (const pokemon of this.getAllActive()) {
					if (pokemon !== target || target.fainted) continue;
					if (!activated) {
						this.heal(target.baseMaxhp / 8, pokemon, target, null);
						activated = true;
					}
				}
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			const otherSpinMoves = ["blazingtorque", "combattorque", "magicaltorque", "noxioustorque",
			, "wickedtorque", "drillrun", "gyroball", "rollout", "iceball", "flipturn", "uturn", "raindance",
			"electrodrift", "darkestlariat", "flamewheel"]

			if (move.id.includes("spin") || otherSpinMoves.includes(move.id)) {
				this.heal(source.baseMaxhp / 8, source);
			}
		},
		name: "Endless Rotation",
		shortDesc: "Hitting or getting hit by a spin-move heals 1/8 max HP.",
		rating: 4,
		num: -101,
	},
	paralyzedwithfear: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Paralyzed With Fear', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Paralyzed With Fear",
		shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
		rating: 4,
		num: -101,
	},
	guarddog: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.boost({atk: 1}, target, target, null, false, true);
			} else if (effect.name === 'Paralyzed With Fear' && boost.spe) {
				delete boost.spe;
				this.boost({atk: 1}, target, target, null, false, true);
			}
		},
		shortDesc: "Immune to Intimidate/PWF. Intimidated: +1 Attack. Cannot be forced to switch out."
	},
	innerfocus: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', '[of] ' + target);
			} else if (effect.name === 'Paralyzed With Fear' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Inner Focus', '[of] ' + target);
			}
		},
		desc: "This Pokemon cannot be made to flinch. This Pokemon is immune to the effect of the Intimidate and Paralyzed With Fear Abilities.",
		shortDesc: "This Pokemon cannot be made to flinch. Immune to Intimidate/PWD.",
	},
	oblivious: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', '[of] ' + target);
			} else if (effect.name === 'Paralyzed With Fear' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Oblivious', '[of] ' + target);
			}
		},
		desc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability while infatuated or taunted cures it. This Pokemon is immune to the effect of the Intimidate and Paralyzed With Fear Abilities.",
		shortDesc: "This Pokemon cannot be infatuated or taunted. Immune to Intimidate/PWD.",
	},
	owntempo: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', '[of] ' + target);
			} else if (effect.name === 'Paralyzed With Fear' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Own Tempo', '[of] ' + target);
			}
		},
		desc: "This Pokemon cannot be confused. Gaining this Ability while confused cures it. This Pokemon is immune to the effect of the Intimidate and Paralyzed With Fear Abilities.",
		shortDesc: "This Pokemon cannot be confused. Immune to Intimidate/PWD.",
	},
	rattled: {
		inherit: true,
		onAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Intimidate' || effect?.name === 'Paralyzed With Fear') {
				this.boost({spe: 1});
			}
		},
		desc: "This Pokemon's Speed is raised by 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or if an opposing Pokemon affected this Pokemon with the Intimidate or Paralyzed With Fear Abilities.",
		shortDesc: "Bug-, Dark-, or Ghost-type attack, Intimidated, PWD: +1 Speed.",
	},
	scrappy: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', '[of] ' + target);
			} else if (effect.name === 'Paralyzed With Fear' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Scrappy', '[of] ' + target);
			}
		},
		desc: "This Pokemon can hit Ghost types with Normal- and Fighting-type moves. This Pokemon is immune to the effect of the Intimidate and Paralyzed With Fear Abilities.",
		shortDesc: "Fighting, Normal moves hit Ghost. Immune to Intimidate/PWD.",
	},
}