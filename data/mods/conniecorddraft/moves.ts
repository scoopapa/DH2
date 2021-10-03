export const Moves: {[k: string]: ModdedMoveData} = {
	//Canon moves edited for hazards and stuff
	rapidspin: {
		inherit: true,
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'jaggedroot'];
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
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'jaggedroot'];
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
	gmaxwindrage: {
		inherit: true,
		self: {
			onHit(source) {
				let success = false;
				const removeTarget = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'jaggedroot',
				];
				const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'jaggedroot', ];
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
	defog: {
		inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'jaggedroot',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'jaggedroot',
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
	courtchange: {
		inherit: true,
		onHitField(target, source) {
			const sourceSide = source.side;
			const targetSide = source.side.foe;
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 
				'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 
				'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
				'jaggedroot',
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
	gmaxsteelsurge: {
		inherit: true,
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onSwitchIn(pokemon) {
				if (
					pokemon.hasItem('heavydutyboots') || (this.dex.getAbility(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())
				) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	spikes: {
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
				if (
					pokemon.hasItem('heavydutyboots') || (this.dex.getAbility(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())
				) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (
					pokemon.hasItem('heavydutyboots') || (this.dex.getAbility(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())
				) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (
					pokemon.hasItem('heavydutyboots') || (this.dex.getAbility(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())
				) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	toxicspikes: {
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
				} else if (pokemon.hasType('Steel') || pokemon.hasType('Poison') ||
					pokemon.hasItem('heavydutyboots') || (this.dex.getAbility(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())) {
					return;
				} else {
					if (this.effectData.layers >= 2) {
						pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
					} else {
						pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
					}
				}
			},
		},
	},
	
	//S1
	nighttime: {
		num: -1001,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Nighttime",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "U-turn", target);
		},
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
	},
	dinnertime: {
		num: -1002,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dinnertime",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('playtime')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slack Off", target);
		},
		shortDesc: "User heals 1/2 max HP (2/3 if user has the ability Playtime).",
	},
	identitytheft: {
		num: -1003,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Identity Theft",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) pokemon.transformInto(target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spectral Thief", target);
		},
		shortDesc: "If this move causes a Pokémon to faint, the user transforms into the target.",
	},
	huntingdive: {
		num: -1004,
		name: "Hunting Dive",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dive", target);
		},
		shortDesc: "Super effective on Water.",
	},
	snowstorm: {
		num: -1005,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Snow Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
	},
	//side league
	sapdrink: {
		num: -3001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sap Drink",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, authentic: 1},
		heal: [1, 4],
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Synthesis", target);
		},
		target: "allies",
		type: "Grass",
		desc: "Heals the user and its allies by 1/4 their max HP.",
	},	
	phantomshield: {//This absolutely will not work
		num: -3002,
		desc: "Protects the user and its allies next turn.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Future Sight", target);
		},
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Phantom Shield",
		pp: 5,
		priority: 4,
		flags: {snatch: 1},
		stallingMove: true,
		sideCondition: 'phantomshield',
		condition: {
			duration: 2,
			onStart(target, source) {
				this.add('-singleturn', source, 'Phantom Shield');
				this.add('-message', source +"'s side will be protected next turn!");
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (this.effectData.duration === 2) return;
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move && (move.target === 'self' || move.category === 'Status')) return;
				//this.add('-activate', target, 'move: Phantom Shield', move.name);
				this.add('-message', 'Phantom Shield protected ' + target + '!');
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "allySide",
		type: "Ghost",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	partytrick: {
		num: -3003,
		desc: "Cannot be used twice in a row. If used by a Surge, upgrades to its next form.",
		onPrepareHit: function(target, source, move) {
			return !source.removeVolatile('partytrick');
			this.attrLastMove('[still]');
			this.add('-anim', source, "First Impression", target);
		},
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Party Trick",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Surge' && !pokemon.transformed && pokemon.species.id !== 'surgeupgrade3') {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				let forme = '';
				if (pokemon.species.id === 'surge') {
					forme = '-Upgrade-1';
				} else if (pokemon.species.id === 'surgeupgrade1') {
					forme = '-Upgrade-2';
				} else if (pokemon.species.id === 'surgeupgrade2') {
					forme = '-Upgrade-3';
				}
				pokemon.formeChange('Surge' + forme, move, true, '[silent]');
				this.add('-message', `${pokemon.name} upgraded!`);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				const species = this.dex.getSpecies(pokemon.species.name);
				const abilities = species.abilities;
				const baseStats = species.baseStats;
				const type = species.types[0];
				if (species.types[1]) {
					const type2 = species.types[1];
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				}
			}
			pokemon.addVolatile('partytrick');
			this.add('-message', `${pokemon.name} cannot use Party Trick next turn!`)
		},
		condition: {
			onBeforeMovePriority: -1,
			onBeforeMove(pokemon, target, move) {
				if (move.id === 'partytrick') return;
				this.debug('removing Party Trick before attack');
				pokemon.removeVolatile('partytrick');
			},
			onMoveAborted(pokemon, target, move) {
				pokemon.removeVolatile('partytrick');
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	airbornearia: {
        num: -3004,
        accuracy: 100,
        basePower: 50,
        category: "Special",
        name: "Airborne Aria",
        pp: 5,
        priority: 0,
        flags: {},
        ignoreImmunity: true,
        isFutureMove: true,
        onTry(source, target) {
            if (!target.side.addSlotCondition(target, 'airbornearia')) return false;
            Object.assign(target.side.slotConditions[target.position]['airbornearia'], {
                duration: 3,
                move: 'airbornearia',
                source: source,
				position: target.position,
				side: target.side,
                moveData: {
                    id: 'airbornearia',
                    name: "Airborne Aria",
                    accuracy: 100,
                    basePower: 50,
                    category: "Special",
                    priority: 0,
                    flags: {},
                    ignoreImmunity: false,
                    effectType: 'Move',
                    isFutureMove: true,
                    type: 'Flying',
                },
            });
            this.add('-message', source.name + ' whipped up the winds!');
            return null;
        },
        condition: {
            // this is a slot condition
			onResidualOrder: 3,
			onResidual(target) {
				// unlike a future move, Long Whip activates each turn
				this.effectData.target = this.effectData.side.active[this.effectData.position];
				const data = this.effectData;
				const move = this.dex.getMove(data.move);
				if (data.target.fainted || data.target === data.source) {
					this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
					return;
				}

				this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} took the ${move.name} attack!`);
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
				if (data.move.name === 'Triple Axel' || data.move.name === 'Triple Kick') {
					data.moveData.longWhipBoost = 3 - data.duration;
				}
				/*
				data.moveData.accuracy = true;
				data.moveData.isFutureMove = true;
				data.move.multihit = null;
				delete data.moveData.flags['contact'];
				delete data.moveData.flags['protect'];
				*/
				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
				if (data.source.isActive) {
					this.add('-anim', data.source, 'skyattack', data.target);
				}
				this.trySpreadMoveHit([data.target], data.source, hitMove);
			},
			onEnd(target) {
				// unlike a future move, Long Whip activates each turn
				this.effectData.target = this.effectData.side.active[this.effectData.position];
				const data = this.effectData;
				const move = this.dex.getMove(data.move);
				if (data.target.fainted || data.target === data.source) {
					this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
					return;
				}

				this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} took the ${move.name} attack!`);
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
				if (data.move.name === 'Triple Axel' || data.move.name === 'Triple Kick') {
					data.moveData.longWhipBoost = 3 - data.duration;
				}
				/*
				data.moveData.accuracy = true;
				data.moveData.isFutureMove = true;
				data.move.multihit = null;
				delete data.moveData.flags['contact'];
				delete data.moveData.flags['protect'];
				*/
				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
				if (data.source.isActive) {
					this.add('-anim', data.source, 'skyattack', data.target);
				}
				this.trySpreadMoveHit([data.target], data.source, hitMove);
				this.add('-message', data.source + "'s Airborne Aria ended!");
			},
        },
        secondary: null,
        target: "normal",
        type: "Flying",
        contestType: "Beautiful",
    },
	fungusbomb: {
		num: -3005,
		desc: "If target is hit at full HP: 20% to poison/paralyze/burn/badly poison; else, 20% to poison/paralyze.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Bomb", target);
		},
		accuracy: 80,
		basePower: 100,
		category: "Physical",
		name: "Fungus Bomb",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		secondaries: [
			{
				chance: 10,
				status: 'psn',
			}, {
				chance: 10,
				status: 'par',
			},
		],
		onModifyMove(move, pokemon, target) {
			if (target.hp !== target.maxhp) return;
			move.secondaries = [];
			move.secondaries.push({
				chance: 5,
				status: 'par',
			});
			move.secondaries.push({
				chance: 5,
				status: 'psn',
			});
			move.secondaries.push({
				chance: 5,
				status: 'brn',
			});
			move.secondaries.push({
				chance: 5,
				status: 'tox',
			});
		},
		target: "normal",
		type: "Bug",
	},
	snuggle: {
		num: -3006,
		desc: "A move that deals NVE damage and Infiltrates types hit, then deals SE damage against Infiltrated types.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Play Rough", target);
		},
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Snuggle",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, bullet: 1},
		secondary: null,
		onEffectiveness(typeMod, target, type, move) {
			if (this.activePokemon.infiltrated == undefined) this.activePokemon.infiltrated = [];
			if (this.activePokemon.infiltrated.includes(type)) return 1;
			else return -1;
		},
		onHit(target, source) {
			if (source.infiltrated == undefined) source.infiltrated = [];
			if (source.infiltrated.includes(target.types[0])) {
				if (!source.infiltrated.includes(target.types[1])) source.infiltrated.push(target.types[1]);
			}
			else source.infiltrated.push(target.types[0]);
		},
		target: "normal",
		type: "Fairy",
	},
	//Misc
	bombardment: {
		num: -1006,
		accuracy: 95,
		basePower: 25,
		category: "Physical",
		name: "Bombardment",
		pp: 20,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Tough",
		desc: "Hits 2-5 times in one turn.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Barrage", target);
		},
	},
	slimeshot: {
		num: -1007,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Slime Shot",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Smart",
		desc: "30% chance to lower target's Speed by 1.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Shot", target);
		},
	},
	jaggedroot: {
		num: -1008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Jagged Root",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'jaggedroot',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Jagged Root');
			},
			onSwitchOut(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasAbility('pounce')) { // coded here because Jagged Root behaves unlike other hazards
					let activated = false;
					for (const target of pokemon.side.foe.active) {
						if (!target || !this.isAdjacent(target, pokemon)) continue;
						if (!activated) {
							this.add('-ability', pokemon, 'Pounce', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({def: -1}, target, pokemon, null, true);
						}
					}
				}
				if (
					pokemon.hasItem('heavydutyboots') || (this.dex.getAbility(pokemon.ability).hazardImmune && !pokemon.ignoringAbility())
				) return;
				this.damage(pokemon.maxhp / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Grass",
		zMove: {boost: {spd: 1}},
		contestType: "Cool",
		desc: "Sets a hazard on the foe's side of the field that damages on switch-out.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spikes", target);
		},
	},
	faeconstruct: {
		num: -1009,
		desc: "Boosts the lower defense stat, counting stat stages, of the Pokemon in the user's slot at the end of each turn for three turns.",
		shortDesc: "3 turns: boosts lower defense at the end of each turn.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stockpile", target);
		},
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fae Construct",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'faeconstruct',
		condition: {
			duration: 3,
			onResidualOrder: 4,
			onStart(side) {
				this.add('-sidestart', side, 'move: Fae Construct');
			},
			onResidual(side) {
				for (const pokemon of side.active) {
					const def = pokemon.getStat('def', false, true);
					const spd = pokemon.getStat('spd', false, true);
					this.add('-message', pokemon.name + ' drew power from the earth!')
					if (def && def <= spd) {
						this.boost({def: 1}, pokemon);
					} else if (spd) {
						this.boost({spd: 1}, pokemon);
					}
				}
			},
			onEnd(side) {
				for (const pokemon of side.active) {
					const def = pokemon.getStat('def', false, true);
					const spd = pokemon.getStat('spd', false, true);
					this.add('-message', pokemon.name + ' drew power from the earth!')
					if (def && def <= spd) {
						this.boost({def: 1}, pokemon);
					} else if (spd) {
						this.boost({spd: 1}, pokemon);
					}
				}
				this.add('-sideend', side, 'move: Fae Construct', '[silent]');
				this.add('-message', 'The Fae Construct faded away.')
			},
		},
		secondary: null,
		target: "allySide",
		type: "Ground",
	},
	hyperspacefury: {
		inherit: true,
		isNonstandard: null,
		onTry(pokemon) {
			if (pokemon.species.name === 'Hoopa-Unbound' || pokemon.species.name === 'Cozminea-True') {
				return;
			}
			this.hint("Only a Pokemon whose form is Hoopa Unbound or Cozminea True can use this move.");
			if (pokemon.species.name === 'Hoopa' || pokemon.species.name === 'Cozminea') {
				this.add('-fail', pokemon, 'move: Hyperspace Fury', '[forme]');
				return null;
			}
			this.add('-fail', pokemon, 'move: Hyperspace Fury');
			return null;
		},
	},
	//for fucks sake
	hyperspacehole: {
		inherit: true,
		isNonstandard: null, 
	},
	hyperfang: {    
        inherit: true,
        isNonstandard: null,
    },    
    sketch: {    
        inherit: true,
        isNonstandard: null,
    },    
    chatter: {    
        inherit: true,
        isNonstandard: null,
    },    
    judgment: {    
        inherit: true,
        isNonstandard: null,
    },    
    darkvoid: {    
        inherit: true,
        isNonstandard: null,
    },    
    seedflare: {    
        inherit: true,
        isNonstandard: null,
    },    
    relicsong: {    
        inherit: true,
        isNonstandard: null,
    },
    powder: {    
        inherit: true,
        isNonstandard: null,
    },    
    lightofruin: {    
        inherit: true,
        isNonstandard: null,
    },
    icehammer: {    
        inherit: true,
        isNonstandard: null,
    },    
    toxicthread: {    
        inherit: true,
        isNonstandard: null,
    },    
    revelationdance: {    
        inherit: true,
        isNonstandard: null,
    },    
    beakblast: {    
        inherit: true,
        isNonstandard: null,
    }, 
	
	dive: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility('gulpmissile') && (attacker.species.name === 'Cramorant' || attacker.species.name === 'Abysseel') && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'gorging' : 'gulping';
				attacker.formeChange(attacker.species.name + forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	
	aquaticrage: {
		num: -1010,
		accuracy: 95,
		basePower: 75,
		category: "Special",
		name: "Aquatic Rage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		type: "Water",
		contestType: "Cool",
		desc: "2x power if the user is below 50% max HP.",
		onBasePower(basePower, pokemon, target) {
			if (pokemon.hp * 2 <= pokemon.maxhp) {
				return this.chainModify(2);
			}
		},
	},
};
