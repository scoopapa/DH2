export const Abilities: {[k: string]: ModdedAbilityData} = {

	remaininghope: {
		// implemented in conditions.ts

		name: "Remaining Hope",
		shortDesc: "This Pokémon's Stat changess last for 4 turns instead of 3",
	},

	sirenevoice: {
		onHit(target, source, move) {
			if (!move || !move.flags['sound'] || move.target === 'self') return;
			return target.addVolatile('trapped', source, move, 'trapper');
		},

		name: "Sirene Voice",
		shortDesc: "This Pokemon's sound-based moves trap the foe",
	},

	twoheadded: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'twoheadded';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'twoheadded' && move.hit > 1) return this.chainModify(0.25);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'twoheadded' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},

		name: "Two Headded",
		shortDesc: "Damaging moves hit twice. The second hit deals 0.25x damage."
	},





	//canon abilities



	static: {
		onStart(pokemon) {
			this.effectData.active = false;
		},
		onTryHit(this, source, target, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					this.effectData.active = true;
					target.setStatus('');
				}
				
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.effectData.active === true) {
					source.trySetStatus('par', target);
					this.effectData.active = false;
					return;
				}
			}
		},
		name: "Static",
		rating: 2,
		num: 9,
	},
	
	effectspore: {
		onStart(pokemon) {
			this.effectData.active = false;
		},
		onTryHit(this, source, target, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					this.effectData.active = true;
					target.setStatus('');
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !source.status && source.runStatusImmunity('powder') && this.effectData.active === true) {
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('slp', target);
					this.effectData.active = false;
					return;
				} else if (r < 21) {
					source.setStatus('par', target);
					this.effectData.active = false;
					return;
				} else if (r < 30) {
					source.setStatus('psn', target);
					this.effectData.active = false;
					return;
				}
			}
		},
		name: "Effect Spore",
		rating: 2,
		num: 27,
	},

	flamebody: {
		onStart(pokemon) {
			this.effectData.active = false;
		},
		onTryHit(this, source, target, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					this.effectData.active = true;
					target.setStatus('');
				}
				
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.effectData.active === true) {
					source.trySetStatus('brn', target);
					this.effectData.active = false;
					return;
				}
			}
		},
		name: "Flame Body",
		rating: 2,
		num: 49,
	},

	poisonpoint: {
		onStart(pokemon) {
			this.effectData.active = false;
		},
		onTryHit(this, source, target, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					this.effectData.active = true;
					target.setStatus('');
				}
				
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.effectData.active === true) {
					source.trySetStatus('psn', target);
					this.effectData.active = false;
					return;
				}
			}
		},
		name: "Poison Point",
		rating: 1.5,
		num: 38,
	},

	//just gonna leave this as is bc who the fuck cares about synchronoize
	//(i am so tired please forgive me)
	synchronize: {
		inherit: true,
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (effect && effect.id === 'toxicspikes') return;
			this.add('-activate', target, 'ability: Synchronize');
			this.add('-curestatus', source, {status: status.id, id: 'synchronize'} as Effect, '[Silent]');
			target.setStatus('');
			// Hack to make status-prevention abilities think Synchronize is a status move
			// and show messages when activating against it.
			source.trySetStatus(status, target, {status: status.id, id: 'synchronize'} as Effect);
		},
	},

	mummy: {
		name: "Mummy",
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.isPermanent || sourceAbility.id === 'mummy') {
				return;
			}
			if (move.flags['contact']) {
				const oldAbility = source.setAbility('mummy', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Mummy', this.dex.getAbility(oldAbility).name, '[of] ' + source);
				}
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if ((move.multihitType === 'parentalbond' || move.multihitType === 'twoheadded') && move.hit > 1) return this.chainModify(0.25);
		},
		rating: 2,
		num: 152,
	},
};