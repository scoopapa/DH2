export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	hoard: {
		shortDesc: "When it leaves battle, the Pokémon restores its original held item.",
		onSwitchOut(pokemon) {
			if (!pokemon.item && pokemon.m.originalItem) {
				if (pokemon.setItem(pokemon.m.originalItem)) {
					this.add('-ability', pokemon, 'Hoard');
					this.add('-item', pokemon, this.dex.getItem(pokemon.m.originalItem), '[from] Ability: Hoard');
				}
			}
		},
		name: "Hoard",
		rating: 3,
		num: -1,
	},
	wildfire: {
		shortDesc: "The Pokémon draws Fire moves to itself to raise Speed by 1; Fire immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Wildfire');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Fire' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Wildfire');
				}
				return this.effectData.target;
			}
		},
		name: "Wildfire",
		rating: 3,
		num: -2,
	},
	centrifuge: {
		shortDesc: "The Pokémon draws Ground moves to itself to raise Attack by 1; Ground immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Centrifuge');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Ground' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Centrifuge');
				}
				return this.effectData.target;
			}
		},
		name: "Centrifuge",
		rating: 3,
		num: -3,
	},
};
