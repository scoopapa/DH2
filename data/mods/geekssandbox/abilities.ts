export const Abilities: {[k: string]: ModdedAbilityData} = {
	jackofalltrades: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Jack Of All Trades');
				return null;
			}
		},
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
		},
		onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'ability: Jack Of All Trades');
					}
					return null;
				}
		},
		onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if ((status.id === 'confusion' || status.id === 'yawn' || status.id === 'flinch') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'ability: Jack Of All Trades');
					return null;
				}
		},
		onModifyMove(move, pokemon) {
			const moveSlot = pokemon.moveSlots.find(move => move.pp === 0) ||
				pokemon.moveSlots.find(move => move.pp < move.maxpp);
			if (!moveSlot) return;
			moveSlot.pp += 10;
			if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp;
			this.add('-activate', pokemon, 'ability: Jack Of All Trades', moveSlot.move, '[restored]');
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Jack Of All Trades",
		rating: 5,
		num: 2000,
	},
	fearless: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target.hp && target.volatiles['laserfocus']) {
				this.actions.useMove('retaliate', this.effectState.target); 
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.id === 'retaliate') { 
				move.type = 'Water';
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.id === 'retaliate') { 
			return typeMod + this.dex.getEffectiveness('Fire', type);
			}
		},
		flags: {},
		name: "Fearless",
		rating: 5,
		num: 2001,
	},
};
