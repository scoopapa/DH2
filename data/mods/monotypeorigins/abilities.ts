export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	embodyaspect: {
		
		flags: {},
		name: "Embody Aspect ()",
		shortDesc: "",
	},
	*/
	embodyaspectbug: { // prob works
		onSourceDamagingHit(damage, target, source, move) {
			// Blocked by Cloak/Shield Dust to agree with similar abilities
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (target.getMoveHitData(move).typeMod < 0) {
				target.boost({def: -1})
			}
		},
		flags: {},
		name: "Embody Aspect (Bug)",
		shortDesc: "Opponent’s Defense is decreased by one stage upon being hit by resisted damage.",
	},
	embodyaspectdark: { // prob works
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move?.effectType === 'Move' && target.getMoveHitData(move).typeMod === -1) {
				this.boost({atk: 1}, target, target);
			}
		},
		flags: {},
		name: "Embody Aspect (Dark)",
		shortDesc: "Gains +1 Attack upon taking resisted damage.",
	},
	embodyaspectdragon: { // prob works
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				if (source.getStat('atk', false, true) >= source.getStat('spa', false, true)) {
					this.boost({atk: length}, source);
				} else {
					this.boost({spa: length}, source);
				}
			}
		},
		flags: {},
		name: "Embody Aspect (Dragon)",
		shortDesc: "User will gain a boost to their highest offense upon KO.",
	},
	embodyaspectelectric: { // works
		onStart(pokemon) {
			let activate = false;
			for (const target of pokemon.adjacentFoes()) {
				if (target.runEffectiveness('Electric') === 1) {
					activate = true
				}
			}
			if (activate) {
				this.boost({spe: 1})
			}
		},
		flags: {},
		name: "Embody Aspect (Electric)",
		shortDesc: "Boosts Speed upon entering the field against a Pokemon weak to Electric.",
	},
	embodyaspectfairy: { // works
		onAfterMove(target, source, move) {
			if (target !== source && move.category == 'Special' && move.totalDamage) {
				this.boost({spd: 1});
			}
		},
		flags: {},
		name: "Embody Aspect (Fairy)",
		shortDesc: "User’s Special Defense increases upon dealing Special damage.",
	},
	embodyaspectfighting: { // works
		onDamagingHit(damage, target, source, effect) {
			this.boost({def: 1});
		},
		flags: {},
		name: "Embody Aspect (Fighting)",
		shortDesc: "Boosts Defense upon taking direct damage.",
	},
	embodyaspectfire: { // works
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			this.boost({spe: 1}, source, source, null, true);
		},
		flags: {},
		name: "Embody Aspect (Fire)",
		shortDesc: "User’s Speed is increased by 1 stage upon inflicting status.",
	},
	embodyaspectflying: { // works
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns && pokemon.moveThisTurnResult && !['Physical', 'Special'].includes(pokemon.lastMove.category)) {
				this.boost({spe: 1});
			}
		},
		flags: {},
		name: "Embody Aspect (Flying)",
		shortDesc: "Boosts Speed on every active turn the user isn’t attacking.",
	},
	embodyaspectghost: { // works
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			let activate = false;
			for (const target of pokemon.adjacentFoes()) {
				if (target.status || target.hasAbility('comatose')) {
					activate = true
				}
			}
			if (pokemon.activeTurns && activate) {
				this.boost({spe: 1});
			}
		},
		flags: {},
		name: "Embody Aspect (Ghost)",
		shortDesc: "User’s Speed increases at the end of every turn when opponent is afflicted with status.",
	},
	embodyaspectgrass: { // works
		onModifyMove(move, attacker, defender) {
			if (move.type === 'Grass' && attacker.effectiveWeather()) {
				this.boost({def: 1});
			}
		},
		flags: {},
		name: "Embody Aspect (Grass)",
		shortDesc: "User’s Defense increases when using a Grass-type move while weather is active.",
	},
	embodyaspectground: { // works
		onStart(pokemon) {
			this.boost({def: 1}, pokemon);
		},
		flags: {},
		name: "Embody Aspect (Ground)",
		shortDesc: "User gains a Defense boost on entry.",
	},
	embodyaspectice: { // works
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.boost({def: 1})
			}
		},
		flags: {},
		name: "Embody Aspect (Ice)",
		shortDesc: "User’s defense is boosted at the end of every turn under Hail.",
	},
	embodyaspectnormal: { // works
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				const bestStat = source.getBestStat(true, true);
				this.boost({[bestStat]: length}, source);
			}
		},
		flags: {},
		name: "Embody Aspect (Normal)",
		shortDesc: "User gains +1 to their highest stat on KO.",
	},
	embodyaspectpoison: { // works
		onResidual(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (['psn', 'tox'].includes(target.status)) {
					this.add('-ability', pokemon, 'Embody Aspect (Poison)', 'boost');
					this.boost({spd: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Embody Aspect (Poison)",
		shortDesc: "If the opponent is poisoned at the end of the turn, opponent’s Special Defense lowers.",
	},
	embodyaspectpsychic: { // works
		onResidual(pokemon) {
			if (pokemon.activeTurns && !this.effectState.embodyaspectpsychic) {
				this.boost({spa: 1});
			}
		},
		onAfterMove(pokemon, target, move) {
			if (this.effectState.embodyaspectpsychic) return;
			if (target != pokemon && move.category == 'Special') {
				pokemon.clearBoosts();
				this.add('-clearboost', pokemon);
				this.effectState.embodyaspectpsychic = true;
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.embodyaspectpsychic;
		},
		flags: {},
		name: "Embody Aspect (Psychic)",
		shortDesc: "User gains a Special Attack boost at the end of every turn. Once a Special move is used, stat boosts are cleared. Boosts will not begin again until the user switches out.",
	},
	embodyaspectrock: { // works
		onAfterMove(target, source, move) {
			if (move.category == 'Status') {
				this.boost({def: 1});
			}
		},
		flags: {},
		name: "Embody Aspect (Rock)",
		shortDesc: "User’s Defense is increased by 1 stage after using a Status move.",
	},
	embodyaspectsteel: { // works, though will need to double check that this is correct effect, surely two abils wouldn't be identical
		onDamagingHit(damage, target, source, effect) {
			this.boost({def: 1});
		},
		flags: {},
		name: "Embody Aspect (Steel)",
		shortDesc: "User’s Defense increases upon taking direct damage.",
	},
	embodyaspectwater: { // prob works
		onDamagingHit(damage, target, source, effect) {
			this.boost({spd: 1});
		},
		flags: {},
		name: "Embody Aspect (Water)",
		shortDesc: "User’s Special Defense increases upon taking direct damage.",
	},
	palewinds: { // works, thank fuck
		flags: {},
		name: "Pale Winds",
		onAnyDamage(damage, target, source, effect) {
			if (effect.id === 'hail'){
				return damage * 2;
			}
		},
		onWeather(target, source, effect){
			if (effect.id === 'hail'){
				this.add('-ability', target, 'Pale Winds');
			}
		},
		shortDesc: "While the user is active, Hail damage is doubled.",
	},
	truthandideals: { // works
		onModifySTAB(stab, source, target, move) {
			if (source.item == 'dracoplate' && (move.forceSTAB || source.hasType(move.type))) {
				if (stab === 2) {
					return 2.25;
				}
				return 2;
			}
		}, // Type change handled in conditions.ts
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Truth and Ideals",
		shortDesc: "Adaptability if holding Draco Plate. Else, secondary type matches held plate.",
	},
};
