export const Moves: {[moveid: string]: MoveData} = {
	blooddrain : {
basePower: 0,
accuracy: 100,
category: "Status", 
shortDesc: "Heals HP=target's Def stat. Lowers Def by 1",
name: "Blood Drain",
pp: 10,
priority: 0,
flags: {protect: 1, reflectable: 1, mirror: 1, heal: 1},
onHit(target, source) {
			if (target.boosts.def === -6) return false;
			const def = target.getStat('def', false, true);
			const success = this.boost({def: -1}, target, source, null, false, true);
			return !!(this.heal(def, source, target) || success);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {atk: 1}},
		},
			zappingsaddles: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Raises the user's Attack by 1 if this KOes the target.",
		name: "Zapping Saddles",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 1}, pokemon, pokemon, move);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {basePower: 175},
	},
	terrorslash: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Replaces the target's ability with Tntimidate after dealing damage.",
		name: "Terror Slash",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
        onHit(target, source) {
            const targetAbility = target.getAbility();
            if (targetAbility.isPermanent || targetAbility.id === 'intimidate') return;
            const oldAbility = target.setAbility('intimidate');
            if (oldAbility) {
				this.add('-ability', target, 'intimidate', '[from] move: Terror Slash');
			}
			return false;
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 140},
		contestType: "Clever",
	},
	salientflash: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Taunts the target after dealing damage.",
		name: "Salient Flash",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1,},
		volatileStatus: 'taunt',
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	acidsplit: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Acid Split",
		shortDesc: "hits twice. hits both opponents for 50 bp in double battles.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {basePower: 100},
		contestType: "Tough",
	},
	mudspit: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Electric power 1/3 for 5 turns. During Mud Sport: Restores 1/4 Max HP.",
		name: "Mud Spit",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, protect: 1, mirror: 1,heal: 1},		
		condition: {
			duration: 5,
			onStart(side, source) {
				this.add('-fieldstart', 'move: Mud Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('mud sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onResidualOrder: 21,
			onEnd() {
				this.add('-fieldend', 'move: Mud Sport');
			},
		},
		onAfterMoveSecondarySelf(pokemon) {
		if (!this.field.addPseudoWeather('mudsport')) this.heal(this.modify(pokemon.maxhp, 0.25));
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		zMove: {basePower: 175},
		contestType: "Cute",
	},
		fungalferno: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Both the target and the user switch out to a random teammate after using this move. -6 Priority",
		name: "Fungalferno",
		pp: 5,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		self: {
		forceSwitch: true,
		},
		forceSwitch: true,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
		zMove: {basePower: 180},
	},
		homerun: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "If the user KOs the opponent, the user switches out.",
		name: "Home Run",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, pokemon, move) {
			if (!target || target.fainted || target.hp <= 0) return;
			if (!target || !target.fainted || !target.hp <= 0){
			delete move.selfSwitch;
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Cool",
		zMove: {basePower: 160},
	},
	cautionarystrike: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "From the start of the turn, user takes 50% less damage. User switches out upon dealing damage. If the user switches out before being hit, the damage reduction doesn't apply to it.",
		name: "Cautionary Strike",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('Cautionary Strike');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Cautionary Strike');
			},
			onSourceModifyDamage(damage, source, target, move) {
            if (move.category !== 'Status') {
                return this.chainModify(0.5);
				}
			},
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		zMove: {basePower: 120},
	},
};