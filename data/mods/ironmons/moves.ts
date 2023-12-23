export const Moves: {[k: string]: ModdedMoveData} = {
	risingdivide: {
		num: -1,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Rising Divide",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Rising Divide only works on your first turn out.");
				return false;
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aerial Ace", target);
		},
		shortDesc: "Hits first. First turn out only.",
		desc: "Hits first. First turn out only.",
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cute",
	},
	signaljam: {
		num: -2,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Signal Jam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Signal Jam only works on your first turn out.");
				return false;
			}
		},
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Signal Beam", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Electric",
		zMove: {basePower: 140},
		contestType: "Tough",
	},
	chlorohorn: {
		num: -3,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Chloro Horn",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyPriority(priority, source, target, move) {
			if (['sunnyday', 'desolateland'].includes(source.effectiveWeather())) {
				return priority + 1;
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grassy Glide", target);
		},
		shortDesc: "Priority +1 in Sun.",
		desc: "Priority +1 in Sun.",
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	titansjudgment: {
		num: -4,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Titan's Judgment",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			console.log(target);
			let success = false;
			let i: BoostID;
			for (i in target.boosts) {
				console.log(i, " est à ", target.boosts[i]);
				if (target.boosts[i] > 0) target.boosts[i] = 0;
				success = true;
			}
			if (!success) return false;
			this.add('-clearboost', target, '[from] move: Titan\'s Judgment');
			console.log(target.volatiles['protosynthesis']);
			if (target.volatiles['protosynthesis']) {
				delete target.volatiles['protosynthesis'];
				this.add('-end', target, 'move: Titan\'s Judgment', '[silent]');
			}
			console.log(target.volatiles['quarkdrive']);
			if (target.volatiles['quarkdrive']) {
				delete target.volatiles['quarkdrive'];
				this.add('-end', target, 'move: Titan\'s Judgment', '[silent]');
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Core Enforcer", target);
		},
		shortDesc: "Resets target's positive stat stages.",
		desc: "Resets target's positive stat stages.",
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
}
