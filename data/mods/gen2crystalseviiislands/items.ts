export const Items: {[itemid: string]: ItemData} = {
	powerlink: {
		name: "Power Link",
		spritenum: 436,
		onChargeMove(target, move) {
			if (target.species.id === 'dodrio' || target.species.id === 'doduo') {
				this.add("-activate", target, "item: Power Link");
				this.debug('power link - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', target, move.name, target);
				return false; // skip charge turn
			}
		},
		num: 1001,
		gen: 2,
		shortDesc: "If held by Doduo or Dodrio, causes its 2-turn moves to be executed in one turn.",
	},
	hellfirelantern: {
		name: "Hellfire Lantern",
		spritenum: 61,
		/*onHit(source, move) {
			for (const pokemon of source.side.foe.active) {
				if (source.species.id === 'houndoom' || source.species.id === 'houndour' && move.type === 'Fire') {
					source.trySetStatus('brn', pokemon, move);
					pokemon.useItem();
					this.add('-activate', pokemon, 'item: Hellfire Lantern', '[consumed]');
				}
			}
		},*/
		onHit(source, move) {
			if (source.species.id !== 'houndoom' || source.species.id !== 'houndour' && move.type !== 'Fire') return;
			for (const pokemon of source.side.foe.active) {
				pokemon.trySetStatus('brn', source);
				source.useItem();
				this.add('-activate', source, 'item: Hellfire Lantern', '[consumed]');
			}
		},
		num: 1002,
		gen: 2,
		shortDesc: "(Bugged) If held by Houndour or Houndoom, its first fire attack always burns the opponent. Single use.",
    },
	sandstone: {
		name: "Sandstone",
		spritenum: 187,
		onStart(target) {
			if (target.species.id === 'sandslash' || target.species.id === 'sandshrew') {
				this.add("-activate", target, "item: Sandstone");
				this.field.setWeather('sandstorm');
			}
		},
		num: 1003,
		gen: 2,
		shortDesc: "If held by Sandshrew and Sandslash, summon Sandstorm for 5 turns on switch-in.",
	},
};