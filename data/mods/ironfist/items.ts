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
			if (move.flags['punch'] && move.name !== "Double Iron Bash") {
				this.actions.useMove("Double Iron Bash", source, target);
				return null;
			}
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
	kunai: {
		name: "Kunai",
		spritenum: 581,
		fling: {
			basePower: 90,
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source.kunai === undefined) source.kunai = 0;
			console.log(source.kunai);
			if (move.category === 'Physical') source.kunai ++;
			else source.kunai = 0;
			if (source.kunai >= 3) {
				this.boost({def: 1, spd: 1});
				source.kunai = 0;
			}
		},
		num: 640,
		gen: 6,
		shortDesc: "If the holder uses 3 consecutive attacking moves, it gains +1 Defense and Special Defense.",
		rating: 3,
	},
	baseball: {
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
		onStart(pokemon) {
			pokemon.trySetStatus('baseball', pokemon);
		},
		num: 640,
		gen: 6,
		shortDesc: 'When switching in, any attacker gets Baseballed.',
		rating: 3,
	},
}
