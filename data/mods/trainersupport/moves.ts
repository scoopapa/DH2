export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	dragonclaw: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['irisboost']) return 100;
		},
	},
	dragonpulse: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['irisboost']) return 100;
		},
	},
	quickattack: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['joeyboost']) return basePower + 20;
		},
	},
	tackle: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['joeyboost']) return basePower + 80;
		},
	},
	tailwhip: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.volatiles['joeyboost']) move.selfSwitch = true;
		},
	},
	futuresight: {
		inherit: true,
		onTry(source, target) {
			let bp = 120;
			if (pokemon.volatiles['willboost']) bp *= 1.3;
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'futuresight',
				source,
				moveData: {
					id: 'futuresight',
					name: "Future Sight",
					accuracy: 100,
					basePower: bp,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Psychic',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return this.NOT_FAIL;
		},
	},
	poltergeist: {
		inherit: true,
		onTry(source, target) {
			return !!target.item && !target.volatiles['ltsurgeboost'];
		},
	},	
	knockoff: {
		inherit: true,
		onBasePower(basePower, source, target, move) {
			if (target.volatiles['ltsurgeboost']) return;
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.volatiles['bugsyboost']) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * (2 ** typeMod) / 8);
			},
		},
	},
	spikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['bugsyboost']) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	toxicspikes: {
		inherit: true,
		onSwitchIn(pokemon) {
			if (!pokemon.isGrounded() || pokemon.volatiles['bugsyboost']) return;
			if (pokemon.hasType('Poison')) {
				this.add('-sideend', pokemon.side, 'move: Toxic Spikes', `[of] ${pokemon}`);
				pokemon.side.removeSideCondition('toxicspikes');
			} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots')) {
				// do nothing
			} else if (this.effectState.layers >= 2) {
				pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
			} else {
				pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
			}
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['bugsyboost']) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({ spe: -1 }, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	asa: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "asa",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		sideCondition: 'asa',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'asa', '[silent]');
			},
			onEntryHazard(pokemon) {
				this.heal(pokemon.maxhp / 10);
				pokemon.side.removeSideCondition('asa');
				this.add('-sideend', pokemon.side, 'move: asa', '[of] ' + pokemon, '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Ghost",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
};
