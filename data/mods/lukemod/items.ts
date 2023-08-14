export const Items: {[itemid: string]: ItemData} = {
	// altex
	eviolite: {
		name: "Eviolite",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe ||
				pokemon.species.id === 'basculinskyship' ||
				pokemon.species.id === 'mrmimeprance'
				// || pokemon.species.id === 'snipsquire'
			) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe ||
				pokemon.species.id === 'basculinskyship' ||
				pokemon.species.id === 'mrmimeprance'
				// || pokemon.species.id === 'snipsquire'
			) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Basculin-Skyship", "Mr. Mime-Prance"],
		shortDesc: "If Basculin-Skyship, Mr. Mime-Prance, or Snipsquire, its Defense and Sp. Def are 1.5x.",
		num: 538,
		gen: 5,
	},

	// vape
	baseballbat: {
		name: "Baseball Bat",
		spritenum: 0, // TODO
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				this.debug('Baseball Bat boost');
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['bullet']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			target.useItem();
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['bullet']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectState.target, source);
			target.useItem();
			return null;
		},
		condition: {
			duration: 1,
		},
		desc: "Holder's contact moves have 1.25x power. Bounces back bullet/ball moves and breaks when it does.",
		num: -1007,
		gen: 8,
	},

};
