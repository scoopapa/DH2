export const Items: {[itemid: string]: ModdedItemData} = {
  	
  ironfist: {
    name: "Adamant Orb",
		spritenum: 4,
		fling: {
			basePower: 60,
      multihit: 2,
      secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		},
		onPrepareHit(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.actions.useMove("Double Iron Bash", source);
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
}
