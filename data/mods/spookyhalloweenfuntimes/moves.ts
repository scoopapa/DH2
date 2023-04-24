export const Moves: {[moveid: string]: ModdedMoveData} = {
	jumpscare: {
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
		num: -1,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Jump Scare",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.activeMoveActions > 1) {
				this.attrLastMove('[still]');
				this.add('-fail', pokemon);
				this.hint("Jump Scare only works on your first turn out.");
				return null;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Astonish", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	spectralweb: {
		shortDesc: "Creates a 'hazard' that fully restores only Hauntarant's HP on entry.",
		num: -2,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spectral Web",
		pp: 2,
		noPPBoosts: true,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'spectralweb',
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Spectral Web');
			},
			onSwitchIn(pokemon) {
				if (pokemon.species.name !== 'Hauntarant') return;
				if (pokemon.hasItem('heavydutyboots')) return;
				pokemon.heal(pokemon.maxhp);
				this.add('-heal', pokemon, pokemon.getHealth, '[from] move: Spectral Web');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sticky Web", target);
		},
		secondary: null,
		target: "allySide",
		type: "Ghost",
		zMove: {boost: {spe: 1}},
		contestType: "Cute",
	},
	exitsmiling: {
		shortDesc: "Sets a layer of Spikes and pivots out. Changes Roserade's form.",
		num: -3,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Exit Smiling",
		pp: 10,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'spikes',
		selfSwitch: true,
		self: {
			onHit(pokemon) {
				if (pokemon.baseSpecies.baseSpecies === 'Roserade' && !pokemon.transformed) {
					const roseradeForme = pokemon.species.id === 'roseradestagehand' ? '' : '-Stagehand';
					pokemon.formeChange('Roserade' + roseradeForme, this.effect, true, '[silent]');
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Encore", source);
		},
		secondary: null,
		target: "foeSide",
		type: "Normal",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	},
	forcefulburial: {
		shortDesc: "Hits adjacent Pokémon; power doubles if target HP <1/2; boosts Atk, SpA on KO.",
		num: -4,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Forceful Burial",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				return this.chainModify(2);
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 1, spa: 1}, pokemon, pokemon, move);
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Tomb", target);
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	marshwave: {
		num: -5,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Marsh Wave",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Muddy Water", target);
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
	},
	pumpkinbomb: {
        num: -8,
        accuracy: 100,
        basePower: 90,
        category: "Special",
        shortDesc: "Summons Leech Seed.",
        name: "Pumpkin Bomb",
        pp: 15,
        priority: 0,
        flags: {protect: 1, reflectable: 1, bullet: 1},
        onHit(target, source) {
            if (target.hasType('Grass')) return null;
            target.addVolatile('leechseed', source);
        },
        onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Seed Bomb", target);
        },
        secondary: null,
        target: "normal",
        type: "Fire",
        contestType: "Clever",
    },
    firepottwirl: {
        num: -9,
        accuracy: 100,
        basePower: 20,
        basePowerCallback(pokemon, target, move) {
            return move.basePower + 20 * pokemon.positiveBoosts();
        },
        category: "Physical",
        shortDesc: " + 20 power for each of the user's stat boosts.",
        name: "Firepot Twirl",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, dance: 1},
        secondary: null,
        onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Quiver Dance", source);
            this.add('-anim', source, "Magma Storm", target);
        },
        target: "normal",
        type: "Fire",
        zMove: {basePower: 160},
        maxMove: {basePower: 130},
        contestType: "Clever",
    },
	plaquefang: {
		num: -6,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Poisons the target if the user is statused.",
		name: "Plaque Fang",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Fang", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.status && source.status !== 'slp') {
					target.trySetStatus('psn', source, move);
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	flurry: {
		num: -7,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Flurry",
		pp: 20,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Chatter", target);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'flurry')) return false;
			Object.assign(target.side.slotConditions[target.position]['flurry'], {
				duration: 5,
				move: 'flurry',
				source: source,
				position: target.position,
				side: target.side,
				moveData: {
					id: 'flurry',
					name: "Flurry",
					accuracy: 100,
					basePower: 25,
					category: "Physical",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Flying',
				},
			});
			this.add('-message', `${(source.illusion ? source.illusion.name : source.name)} called for help!`);
			return null;
		},
		condition: {
			// this is a slot condition
			duration: 5,
			onResidualOrder: 3,
			onResidual(target) {
				// unlike a future move, Flurry activates each turn
				this.effectData.target = this.effectData.side.active[this.effectData.position];
				const data = this.effectData;
				const move = this.dex.getMove('flurry');
				if (data.target.fainted || data.target === data.source) {
					this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
					return;
				}

				this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} is being swarmed by a flurry of Starly!`);
				data.target.removeVolatile('Endure');

				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
					data.moveData.infiltrates = true;
				}
				if (data.source.hasAbility('normalize') && this.gen >= 6) {
					data.moveData.type = 'Normal';
				}
				if (data.source.hasAbility('adaptability') && this.gen >= 6) {
					data.moveData.stab = 2;
				}

				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
				if (data.source.isActive) {
					this.add('-anim', data.source, "Sky Attack", data.target);
				}
				this.trySpreadMoveHit([data.target], data.source, hitMove);
			},
			onEnd(target) {
				// unlike a future move, Flurry activates each turn
				this.effectData.target = this.effectData.side.active[this.effectData.position];
				const data = this.effectData;
				const move = this.dex.getMove('flurry');
				if (data.target.fainted || data.target === data.source) {
					this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
					return;
				}

				this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} is being swarmed by a flurry of Starly!`);
				data.target.removeVolatile('Endure');

				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
					data.moveData.infiltrates = true;
				}
				if (data.source.hasAbility('normalize') && this.gen >= 6) {
					data.moveData.type = 'Normal';
				}
				if (data.source.hasAbility('adaptability') && this.gen >= 6) {
					data.moveData.stab = 2;
				}

				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
				if (data.source.isActive) {
					this.add('-anim', data.source, "Sky Attack", data.target);
				}
				this.trySpreadMoveHit([data.target], data.source, hitMove);
				this.add('-message', `The flurry of Starly dispersed!`);
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	baddybad: { // Gen VII Baddy Bad for Curski
		inherit: true,
		accuracy: 100,
		basePower: 90,
		isNonstandard: null,
	},
	stealthrock: { // edited for Crocs
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				if (pokemon.hasItem('crocs')) {
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 4);
				} else {
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
			},
		},
	},
	spikes: { // edited for Crocs
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				if (pokemon.hasItem('crocs')) {
					this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 12);
				} else {
					this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
				}
			},
		},
	},
	toxicspikes: { // edited for Crocs
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots')) {
					return;
				} else if (this.effectData.layers >= 2 || pokemon.hasItem('crocs')) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	stickyweb: { // edited for Crocs
		inherit: true,
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				if (pokemon.hasItem('crocs')) {
					this.boost({spe: -2}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
				} else {
					this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
				}
			},
		},
	},
	gmaxsteelsurge: { // edited for Crocs
		inherit: true,
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				if (pokemon.hasItem('crocs')) {
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 4);
				} else {
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
			},
		},
	},
	rapidspin: { // edited for Spectral Web
		inherit: true,
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'spectralweb'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'spectralweb'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
	},
	defog: { // edited for Spectral Web
		inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'spectralweb',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'spectralweb',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},
	gmaxwindrage: { // edited for Spectral Web
		inherit: true,
		self: {
			onHit(source) {
				let success = false;
				const removeTarget = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'spectralweb',
				];
				const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'spectralweb'];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.getEffect(targetCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				this.field.clearTerrain();
				return success;
			},
		},
	},
	courtchange: { // edited for Spectral Web
		inherit: true,
		onHitField(target, source) {
			const sourceSide = source.side;
			const targetSide = source.side.foe;
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'spectralweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
			];
			let success = false;
			for (const id of sideConditions) {
				const effectName = this.dex.getEffect(id).name;
				if (sourceSide.sideConditions[id] && targetSide.sideConditions[id]) {
					[sourceSide.sideConditions[id], targetSide.sideConditions[id]] = [
						targetSide.sideConditions[id], sourceSide.sideConditions[id],
					];
					this.add('-sideend', sourceSide, effectName, '[silent]');
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else if (sourceSide.sideConditions[id] && !targetSide.sideConditions[id]) {
					targetSide.sideConditions[id] = sourceSide.sideConditions[id];
					delete sourceSide.sideConditions[id];
					this.add('-sideend', sourceSide, effectName, '[silent]');
				} else if (targetSide.sideConditions[id] && !sourceSide.sideConditions[id]) {
					sourceSide.sideConditions[id] = targetSide.sideConditions[id];
					delete targetSide.sideConditions[id];
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else {
					continue;
				}
				let sourceLayers = sourceSide.sideConditions[id] ? (sourceSide.sideConditions[id].layers || 1) : 0;
				let targetLayers = targetSide.sideConditions[id] ? (targetSide.sideConditions[id].layers || 1) : 0;
				for (; sourceLayers > 0; sourceLayers--) {
					this.add('-sidestart', sourceSide, effectName, '[silent]');
				}
				for (; targetLayers > 0; targetLayers--) {
					this.add('-sidestart', targetSide, effectName, '[silent]');
				}
				success = true;
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
	},
	hyperspacefury: { // edited for Cozminea
		inherit: true,
		onTry(pokemon) {
			if (pokemon.species.name === 'Hoopa-Unbound' || pokemon.species.name === 'Cozminea-True' || pokemon.species.name === 'Cozminevil') {
				return;
			}
			this.hint("Only a Pokemon whose form is Hoopa Unbound, Cozminea-True or Cozminevil can use this move.");
			if (pokemon.species.name === 'Hoopa' || pokemon.species.name === 'Cozminea' || pokemon.species.name === 'Cozminea-Hallowed') {
				this.add('-fail', pokemon, 'move: Hyperspace Fury', '[forme]');
				return null;
			}
			this.add('-fail', pokemon, 'move: Hyperspace Fury');
			return null;
		},
	},
	substitute: {
		inherit: true,
		condition: {
			onStart(target, effect) {
				if (effect?.effectType === 'Move') {
					this.add('-start', target, 'Substitute');
				}
				this.effectData.hp = Math.floor(target.maxhp / 4);
				if (target.volatiles['partiallytrapped']) {
					this.add('-end', target, target.volatiles['partiallytrapped'].sourceEffect, '[partiallytrapped]', '[silent]');
					delete target.volatiles['partiallytrapped'];
				}
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit(target, source, move) {
				if (target === source || move.flags['authentic'] || move.infiltrates) {
					return;
				}
				let damage = this.getDamage(source, target, move);
				if (!damage && damage !== 0) {
					this.add('-fail', source);
					this.attrLastMove('[still]');
					return null;
				}
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) {
					return damage;
				}
				if (damage > target.volatiles['substitute'].hp) {
					damage = target.volatiles['substitute'].hp as number;
				}
				target.volatiles['substitute'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['substitute'].hp <= 0) {
					target.removeVolatile('substitute');
				} else {
					this.add('-activate', target, 'move: Substitute', '[damage]');
				}
				if (move.recoil) {
					this.damage(this.calcRecoilDamage(damage, move), source, target, 'recoil');
				}
				if (move.drain) {
					this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source, target, 'drain');
				}
				this.singleEvent('AfterSubDamage', move, null, target, source, move, damage);
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return this.HIT_SUBSTITUTE;
			},
			onEnd(target) {
				this.add('-end', target, 'Substitute');
			},
		},
	},
	curse: {
		inherit: true,
		condition: {
			onStart(pokemon, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} was cursed!`);
					this.add('-start', pokemon, 'Curse', '[silent]');
				} else if (effect?.effectType === 'Item') {
					this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} was cursed by the Cursed Portrait!`);
					this.add('-start', pokemon, 'Curse', '[silent]');
				} else {
					this.add('-start', pokemon, 'Curse', '[of] ' + source);
				}
			},
			onResidualOrder: 10,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
};
