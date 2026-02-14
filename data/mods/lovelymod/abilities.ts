export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	aromaveil: {
		inherit: true,
		shortDesc: "Protects user/allies from Disable, Encore, Heal Block, Taunt, and Torment.",
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Aroma Veil', `[of] ${effectHolder}`);
				}
				return null;
			}
		},
	},
	cutecharm: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (this.randomChance(3, 10)) {
					allyActive.addVolatile('attract', pokemon);
				}
			}
		},
		flags: {},
		name: "Cute Charm",
		shortDesc: "At the end of each turn, 30% chance for ally to get infatuated.",
	},
	hopelessromantic: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.randomChance(1, 2)) {
				pokemon.addVolatile('attract', pokemon);
			}
		},
		flags: {},
		name: "Hopeless Romantic",
		shortDesc: "At the end of each turn, 50% chance for this Pokemon to get infatuated.",
	},
	lovelypair: {
		onStart(pokemon) {
			pokemon.addVolatile('attract', pokemon);
			for (const allyActive of pokemon.allies()) {
				allyActive.addVolatile('attract', pokemon);
			}
		},
		flags: {},
		name: "Lovely Pair",
		shortDesc: "On switchin, both this Pokemon and its ally become infatuated.",
	},
	serenade: {
		onAfterMove(target, source, move) {
			if (move.flags['sound'] && this.randomChance(3, 10)) {
				for (const allyActive of target.allies()) {
					allyActive.addVolatile('attract', target);
				}
			}
		},
		name: "Serenade",
		shortDesc: "This Pokemon's sound moves have a 30% chance of infatuating its ally.",
	},

	// couple abils
	bitterjudgment: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (defender.volatiles['attract']) {
				this.debug('Rivalry boost');
				return this.chainModify(1.25);
			} else {
				this.debug('Rivalry weaken');
				return this.chainModify(0.75);
			}
		},
		flags: {},
		name: "Bitter Judgment",
		shortDesc: "This Pokemon's attacks do 1.25x on infatuated targets; 0.75x otherwise.",
	},
	buzzymaiden: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (!target.volatiles['attract'] || target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			let num = 10;
			if (source.allies()[0].species.id === 'volbeat') num = 5;
			if (this.randomChance(2, num)) {
				if (move.category === 'Physical') this.boost({ def: -1 }, target, source, null, true);
			}
		},
		flags: {},
		name: "Buzzy Maiden",
		shortDesc: "This Pokémon and its ally's attacks have a 20% chance to lower the corresponding defense of an infatuated target. 40% if Volbeat ally.",
	},
	conjoinedhearts: {
		onAllyTryHeal(damage, target, source, effect) {
			if (!effect) return;
			this.heal(damage / 2, source, source);
		},
		flags: {},
		name: "Conjoined Hearts",
		shortDesc: "Whenever its ally heals, this Pokémon recieves half the amount.",
	},
	cupidsorder: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.randomChance(1, 2)) {
				target.removeVolatile('attract');
			}
		},
		flags: {},
		name: "Cupid's Order",
		shortDesc: "This Pokémon's attacks have a 50% chance of removing infatuation from a target.",
	},
	divorcedemand: {
		onStart(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				target.removeVolatile('attract');
			}
		},
		flags: {},
		name: "Divorce Demand",
		shortDesc: "On switchin, this Pokemon removes infatuation from all opponents.",
	},
	dragonsheart: {
		onModifyMove(move) {
			if (move.category === 'Status' || move.type !== 'Dragon') return;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			move.ignoreImmunity['Dragon'] = true;
		},
		flags: {},
		name: "Code Breaker",
		shortDesc: "This Pokemon's Dragon moves hit Fairy-types for neutral damage.",
	},
	emotionalmanipulation: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (this.randomChance(3, 10)) {
					target.removeVolatile('attract');
				}
			}
		},
		flags: {},
		name: "Emotional Manipulation",
		shortDesc: "At the end of each turn, 30% chance for opponents to lose infatuation.",
	},
	grievingwidow: {
		onAllyFaint(target) {
			if (!this.effectState.target.hp) return;
			this.boost({ atk: 2, spa: 2 });
		},
		flags: {},
		name: "Grieving Widow",
		shortDesc: "This Pokemon gains +2 Atk/Sp. Atk when its ally is knocked out.",
	},
	heartburn: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.volatiles['attract']) {
					this.damage(target.baseMaxhp / 16, target, pokemon);
				}
			}
		},
		flags: {},
		name: "Heartburn",
		shortDesc: "Causes infatuated foes to lose 1/16 of their max HP at the end of each turn.",
	},
	heartheart: {
		onAnyFaintPriority: 1,
		onAnyFaint(pokemon) {
			if (pokemon.volatiles['attract']) this.boost({ spa: 1 }, this.effectState.target);
		},
		flags: {},
		name: "Heart-Heart",
		shortDesc: "This Pokemon's Sp. Attack is raised by 1 stage when another infatuated Pokemon faints."
	},
	heartless: {
		onTryHit(target, source, move) {
			if (move.flags['heart'] && target !== source) {
				this.add('-immune', target, '[from] ability: Heartless');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Heartless",
		shortDesc: "This Pokemon is immune to heart moves.",
	},
	lovebombing: {
		onSourceDamagingHit(damage, target, source, move) {
			if (!target.volatiles['attract']) return;
			if (target.allies().length == 0) return;
			const ally = target.allies()[0];
			if (ally.hasAbility('bulletproof')) return;
			this.damage(target.baseMaxhp / 16, target, source);
		},
		flags: {},
		name: "Lovebombing",
		shortDesc: "When this Pokemon damages an infatuated target, it damages the ally for 1/16 max HP unless it is Bulletproof.",
	},
	megahearts: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				if (pokemon.species.id === 'yellowdiancie') {
					pokemon.formeChange("yellowdianciemega", pokemon.getItem(), true);
				} else if (pokemon.species.id === 'zard') {
					pokemon.formeChange("zardmegalove", pokemon.getItem(), true);
				}
			}
		},
		flags: {},
		name: "Megahearts",
		shortDesc: "When this Pokémon becomes infatuated, it Mega Evolves.",
	},
	proposal: {
		onStart(pokemon) {
			if (pokemon.proposed) return;
			for (const allyActive of pokemon.allies()) {
				if (allyActive.addVolatile('attract', pokemon)) pokemon.proposed = true;
			}
		},
		flags: {},
		name: "Proposal",
		shortDesc: "On switchin or whenever possible., this Pokemon's ally becomes infatuated. Once per battle.",
	},
	soothingpetals: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['confusion', 'encore'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Soothing Petals', `[of] ${effectHolder}`);
				}
				return null;
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Flower Veil');
				if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Soothing Petals', `[of] ${effectHolder}`);
				}
				return null;
			}
		},
		flags: {},
		name: "Soothing Petals",
		shortDesc: "Protects user/allies from psn/slp/brn/frz/par/confusion/Encore.",
	},
	storksdelivery: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
				move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax) return;
			move.multihit = 2;
			move.multihitType = 'parentalbond';
		},
		// Damage modifier implemented in BattleActions#modifyDamage()
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		flags: {},
		name: "Stork's Delivery",
		shortDesc: "If the target is infatuated, this Pokemon's attacks hit twice, with the second hit dealing 0.5x.",
	},
	sweetheart: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
			for (const allyActive of pokemon.adjacentAllies()) {
				this.heal(allyActive.baseMaxhp / 16, allyActive, pokemon);
			}
		},
		flags: {},
		name: "Sweetheart",
		shortDesc: "At the end of each turn, this Pokemon and its ally heal for 1/16 max HP.",
	},
	toxicrelationship: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			let num1 = 3;
			let num2 = 10;
			if (source.allies()[0].species.id === 'nidoqueen') num2 = 6;
			if (this.randomChance(num1, num2)) {
				target.trySetStatus('psn', source);
			}
		},
		onAllyDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			let num1 = 3;
			let num2 = 10;
			if (source.species.id === 'nidoqueen') num2 = 6;
			if (this.randomChance(num1, num2)) {
				target.trySetStatus('psn', source);
			}
		},
		flags: {},
		name: "Toxic Relationship",
		shortDesc: "User and ally's attacks have a 30% chance to inflict poison. 50% if Nidoqueen ally.",
	},
};
