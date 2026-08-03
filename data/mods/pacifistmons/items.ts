export const Items: {[itemid: string]: ModdedItemData} = {
	eviolite: {
		inherit: true,
		shortDesc: "If holder's species can evolve, it takes halved damage from indirect sources.",
		fling: {
			effect(target) {
				if (target.baseSpecies.prevo) target.formeChange(target.baseSpecies.prevo, this.effect, true);
			},
		},
		onDamage(damage, target, source, effect) {
			if (target.baseSpecies.nfe && effect.effectType !== 'Move') {
				return Math.floor(damage / 2);
			}
		},
	},
	gripclaw: {
		inherit: true,
		shortDesc: "Holder's trapping moves last 4 turns instead of 2.",
		fling: {
			effect(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
				if (target.volatiles['trapped']) target.volatiles['trapped'].duration = 5;
			},
		},
		//handled in conditions
	},
	spelltag: {
		inherit: true,
		shortDesc: "Holder is treated as a Ghost-type when using Curse.",
		onBasePower: null,
		fling: {
			effect(target) {
				target.addVolatile('perishsong');
			},
		},
		//handled in moves
	},
	stunseed: {
		name: "Stun Seed",
		shortDesc: "Opponent is inflicted with Stun if the holder faints.",
		fling: {
			volatileStatus: "stun",
		},
		onFaint(pokemon) {
			if (pokemon.adjacentFoes().length == 0) return;
			const foe = pokemon.adjacentFoes()[0];
			foe.addVolatile('stun');
		},
	},
	fullincense: {
		inherit: true,
		fling: {
			status: 'slp',
		},
	},
	nevermeltice: {
		inherit: true,
		shortDesc: "Holder is immune to Taunt if it is Ice-type.",
		fling: {
			status: 'frz',
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'taunt' && pokemon.hasType("Ice")) return null;
		},
	},
	energyroot: {
		name: "Energy Root",
		shortDesc: "Restores 1/2 max HP if at 1/2 max HP or less, but purifies the user.",
		fling: {
			status: 'pur',
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			pokemon.setStatus('pur');
		},
	},
	zygardite: {
		name: "Zygardite",
		spritenum: 568,
		megaEvolves: "Zygarde-Complete",
		megaStone: "Zygarde-Mega",
		itemUser: ["Zygarde-Complete"],
		onTakeItem(item, source) {
			return source.baseSpecies.baseSpecies !== 'Zygarde';
		},
	},
}
