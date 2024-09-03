export const Items: {[itemid: string]: ModdedItemData} = {
	ironfist: {
		spritenum: 4,
		fling: {
			basePower: 60,
			multihit: 2,
			secondary: {
				chance: 30,
				volatileStatus: 'flinch',
			},
		},
		onPrepareHit(source, target, move) {
			if (move.flags['punch']) {
				this.actions.useMove("Double Iron Bash", source, target);
			}
			return null;
		},
		flags: {},
		name: "Iron Fist",
		rating: 3,
		shortDesc: "All punching moves turn into Double Iron Bash.",
		num: 89,
	},
	fishhook: {
		name: "Fish Hook",
		spritenum: 249,
		fling: {
			basePower: 90,
		},
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Water') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Water')) {
				pokemon.maybeTrapped = true;
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.type === 'Electric' || move.type === 'Grass') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		num: 270,
		shortDesc: "Prevents opposing Water-types from switching out while holder is active. Holder cannot use Grass or Electric-type moves.",
		gen: 4,
		rating: 3,
	},
	kunai: { // Hope this works
		name: "Kunai",
		spritenum: 581,
		fling: {
			basePower: 90,
		},
		onHit(pokemon, move) {
			let kunai = 0;
			if (move.type === 'Physical') {
				kunai++;
			}
			if (kunai >= 3) {
				this.boost({def: 1, spd: 1});
				kunai = 0;
			}
		},
		num: 640,
		gen: 6,
		shortDesc: "If the holder uses 3 consecutive attacking moves, it gains +1 Defense and Special Defense.",
		rating: 3,
	},
	baseball: { // Hope this works CHECK THIS
		name: "Baseball",
		spritenum: 581,
		fling: {
			basePower: 10,
			status: 'baseball',
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (this.effectState.target.activeTurns) return;
			this.add('-message', `baseball this guy`);
			return null;
		},
		onStart(pokemon) { // To do: Implement Baseball in coniditions.ts
			pokemon.trySetStatus('baseball', pokemon);
		},
		num: 640,
		gen: 6,
		shortDesc: 'When switching in and is hit by a move, the move fails.',
		rating: 3,
	},
}
