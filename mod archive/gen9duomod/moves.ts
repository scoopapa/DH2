export const Moves: {[moveid: string]: MoveData} = {
  blueshell: {
		num: 9001,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Blue Shell",
		shortDesc: "Deals 2x if user has less Pokemon than foe.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
   	onModifyMove(move, source, target) {
      	const userSide = source.side.pokemon.filter(ally => ally === source || !ally.fainted && !ally.status);
      	const targetSide = target.side.pokemon.filter(ally => ally === target || !ally.fainted && !ally.status);
			if (userSide.length < targetSide.length) {move.basePower = 140;}
      	else {move.basePower = 70;}
    	},
		secondary: null,
		target: "allAdjacent",
		type: "Rock",
		zMove: {basePower: 140},
		maxMove: {basePower: 140},
		contestType: "Tough",
	},

	doubledab: {
		num: 9002,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Double Dab",
		shortDesc: "skeet skeet dab",
		pp: 1,
		noPPBoosts: true,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1, punch: 1},
		multihit: 2,
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fighting",
		maxMove: {basePower: 130},
		contestType: "Tough",
	},

	exobash: {
		num: 9003,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let power = Math.floor(25 * target.getStat('def') / pokemon.getStat('def')) + 1;
			if (!isFinite(power)) power = 1;
			if (power > 150) power = 150;
			this.debug(`${power} bp`);
			return power;
		},
		category: "Physical",
		name: "Exo Bash",
		shortDesc: "More power the more user's Def is lower than target's.",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Bug",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	
	extremebeam: {
		num: 9004,
		accuracy: 99,
		basePower: 250,
		category: "Special",
		desc: "If this move is successful, the user begins to Bide.",
		shortDesc: "User Bides. Priority -6.",
		name: "EXTREME BEAM",
		pp: 5,
		priority: -6,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Photon Geyser", target);
		},
		self: {
			volatileStatus: 'bide',
		},
		condition: {
			duration: 2,
			onLockMove: 'bide',
		},		
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},	

	gelatinize: {
		num: 9005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gelatinize",
		shortDesc: "+1 Priority. Changes ability to Magic Bounce.",
		pp: 10,
		priority: 1,
		flags: {snatch: 1},
		onTryHit(target) {
			if (target.getAbility().isPermanent || target.ability === 'magicbounce' || target.ability === 'truant') {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('magicbounce');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Magic Bounce', '[from] move: Gelatinize');
				return;
			}
			return false;
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	
	incense: {
		num: 9008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Incense",
		shortDesc: "For 5 turns, user side cannot lose their items.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'incense',
		condition: {
			duration: 5,
			onTakeItem(item, pokemon, source) {
				if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
					this.add('-message', "The Incense kept ", source.name, " alert enough to block the attempt!");
					return false;
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Incense');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-sideend', side, 'Incense');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Grass",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	
	hyperwind: {
		num: 9009,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		shortDesc: "Clears the opponent's hazards.",
		inherit: true,
		isNonstandard: null,
		gen: 8,
		name: "Hyper Wind",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onHit(target, source) {
			if (!target.volatiles['substitute'] || move.infiltrates);
			const removeTarget = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeTarget.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Razor Wind', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	
	impostorblade: {
		num: 9010,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Impostor Blade",
		shortDesc: "kill with this move or you die (pretty sus)",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (pokemon.species.id === 'impsaustor') {return;}
			if (!target || target.fainted || target.hp <= 0) {
//				this.add('-message', "I dunno... ", pokemon.name, "'s been acting pretty sus lately...");
				pokemon.formeChange('Impsaustor', this.effect, true);
				const oldAbility = pokemon.setAbility('Vent');
				if (oldAbility) {
					this.add('-ability', pokemon, 'Vent', '[from] move: Impostor Blade', '[silent]');
					target.volatileStaleness = 'external';
					return;
				}
				this.add('-message', pokemon.name + " was the Impsaustor!");
				this.add('-start', pokemon, 'typechange', target.getTypes(true).join('/'), '[silent]');
				const species = this.dex.species.get(pokemon.species.name);
				const abilities = species.abilities;
				const baseStats = species.baseStats;
				const type = species.types[0];
				if (species.types[1]) {
					const type2 = species.types[1];
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				}
				this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
			}
			else {
				this.add('-message', "VOTE HIM OUT!!!");
				this.damage(pokemon.baseMaxhp, pokemon);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	
	inkbrush: {
		num: 9011,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Inkbrush",
		shortDesc: "Hits 4 times. High crit ratio.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, punch: 1},
		multihit: 4,
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Poison",
		maxMove: {basePower: 130},
		contestType: "Tough",
	},
	
	kamikaze: {
		num: 9012,
		accuracy: 50,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(target.maxhp / 2, 1);
		},
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('High Jump Kick'));
		},
		category: "Physical",
		name: "Kamikaze",
		shortDesc: "Deals 50% of user or target's max HP.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1},
		hasCrashDamage: true,
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	
	onetrillionarrows: {
		num: 9013,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "One Trillion Arrows",
		shortDesc: "Removes target's immunities.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onEffectiveness(typeMod, target, type, move) {
			move.ignoreImmunity = true;
		},
		onHit(target, source) {
			target.addVolatile('onetrillionarrows', target);
			this.add('-message', "The arrows left the target vulnerable!");
		},
		volatileStatus: 'onetrillionarrows',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: One Trillion Arrows');
			},
			onTryHit(target, source, move) {
				move.ignoreImmunity = true;
			},
			onEnd(pokemon) {
				delete pokemon.volatiles['onetrillionarrows'];
				this.add('-end', pokemon, 'onetrillionarrows');
			},
		},
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "normal",
		type: "Ground",
		zMove: {basePower: 180},
		contestType: "Beautiful",
	},	
		
	outburst: {
		num: 9014,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Outburst",
		shortDesc: "Changes target's ability to Lightning Rod.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onTryHit(target) {
			if (target.getAbility().isPermanent || target.ability === 'lightningrod') {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('lightningrod');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Lightning Rod', '[from] move: Outburst');
				return;
			}
			return false;
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	
	// test this one especially
	pharaohshot: {
		num: 9015,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Pharaoh Shot",
		shortDesc: "-3 Priority. If user's hit by contact while charging, hits twice.",
		pp: 15,
		priority: -3,
		flags: {contact: 1, protect: 1, punch: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('pharaohshot');
		},
/*		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['pharaohshot'] && pokemon.volatiles['pharaohshot'].lostFocus) {
				this.add('cant', pokemon, 'Pharaoh Shot', 'Pharaoh Shot');
				return true;
			}
		},*/
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Pharaoh Shot');
			},
			onHit(pokemon, source, move) {
				if (move.flags['contact']) {
					this.add('-message', "The attack hit the charging flame!");
					this.useMove("Pharaoh Shot", pokemon);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	
	polarpounce: {
		num: 9016,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Polar Pounce",
		shortDesc: "Sets Hail.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(source) {
				this.field.setWeather('hail');
			},
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	
	remotemine: {
		num: 9017,
		accuracy: 100,
		basePower: 130,
		onBeforeMovePriority: 6,
		onTryMove(pokemon, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? pokemon.getMoveData(move.id) : pokemon.getMoveData(callerMoveId);
			if (!moveSlot) {return false;}
			if (moveSlot.pp % 2 === 1) {
				this.add('-message', "It readied a mine!");
				return false;
			}
			return true;
		},
		category: "Special",
		name: "Remote Mine",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	
	stupidcannon: {
		num: 9020,
		accuracy: 100,
		basePower: 0,
		damage: 5,
		category: "Special",
		shortDesc: "no",
		name: "Stupid Cannon",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Bulk Up", target);
		    this.add('-anim', source, "Dragon Dance", target);
		    this.add('-anim', source, "Dragon Dance", target);
		    this.add('-anim', source, "Dragon Dance", target);
		    this.add('-anim', source, "Charge", target);
		    this.add('-anim', source, "Extreme Evoboost", target);
		    this.add('-anim', source, "Luster Purge", target);
		    this.add('-anim', source, "Hyper Beam", target);
		    this.add('-anim', source, "Draco Meteor", target);
		    this.add('-anim', source, "Doom Desire", target);
		    this.add('-anim', source, "Clangorous Soulblaze", target);
		},
		secondary: null,
		multihit: 23,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},

	shadowscratch: {
		num: 9019,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Shadow Scratch",
		shortDesc: "If target has lowered HP, deals more damage (check the sheet!).",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 4 <= target.maxhp * 3) {return this.chainModify(1.5);}
			else if (target.hp * 2 <= target.maxhp) {return this.chainModify(2);}
			else if (target.hp * 4 <= target.maxhp) {return this.chainModify(3);}
			else if (target.hp * 10 <= target.maxhp) {return this.chainModify(10);}
			else {return this.chainModify(1);}
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},

	healorder: {
		num: 456,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Heal Order",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	
	milkdrink: {
		num: 208,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Milk Drink",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	
	recover: {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Recover",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	
	roost: {
		num: 355,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Roost",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		self: {
			volatileStatus: 'roost',
		},
		condition: {
			duration: 1,
			onResidualOrder: 20,
			onStart(target) {
				this.add('-singleturn', target, 'move: Roost');
			},
			onTypePriority: -1,
			onType(types, pokemon) {
				this.effectData.typeWas = types;
				return types.filter(type => type !== 'Flying');
			},
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	
	slackoff: {
		num: 303,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Slack Off",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	
	softboiled: {
		num: 135,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Soft-Boiled",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	
	synthesis: {
		num: 235,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Synthesis",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	
	moonlight: {
		num: 236,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Moonlight",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	
	morningsun: {
		num: 234,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Morning Sun",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	
	shoreup: {
		num: 659,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shore Up",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('sandstorm')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Ground",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	
	rest: {
		num: 156,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rest",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryMove(pokemon) {
			if (pokemon.hp === pokemon.maxhp) {
				this.add('-fail', pokemon, 'heal');
				return null;
			}
			if (pokemon.status === 'slp' || pokemon.hasAbility('comatose')) {
				this.add('-fail', pokemon);
				return null;
			}
		},
		onHit(target, source, move) {
			if (!target.setStatus('slp', source, move)) return false;
			target.statusState.time = 3;
			target.statusState.startTime = 3;
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	
	chillyreception: {
		num: 881,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Chilly Reception",
		pp: 10,
		priority: 0,
		flags: {},
		onTry(source) {
			return !!this.canSwitch(source.side);
		},
		selfSwitch: true,
		weather: 'hail',
		secondary: null,
		target: "all",
		type: "Ice",
	},
	
	gigatonhammer: {
		num: 893,
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Gigaton Hammer",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		// Move disabling implemented in Battle#nextTurn in sim/battle.ts
		onTry(source) {
			source.addVolatile('gigatonhammer');
		},
		condition: {
			duration: 2,
			onBeforeMove(pokemon, target, move) {
				if (move.id === 'gigatonhammer') {
					this.add('cant', pokemon, 'move: Gigaton Hammer', move);
					pokemon.removeVolatile('gigatonhammer');
					return false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	
	wavecrash: {
		num: 834,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Wave Crash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Water",
	},
	
	chloroblast: {
		num: 835,
		accuracy: 95,
		basePower: 150,
		category: "Special",
		name: "Chloroblast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	
	luminacrash: {
		num: 855,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Lumina Crash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		target: "normal",
		type: "Psychic",
	},
		
	lunarblessing: {
		num: 849,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lunar Blessing",
		pp: 10,
		priority: 0,
		flags: {heal: 1, authentic: 1, mystery: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		type: "Psychic",
	},
	
	glaiverush: {
		num: 862,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Glaive Rush",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'glaiverush',
		},
		onAfterHit(source, target, move) {
			if (!target.hp) {
				if (source.volatiles['glaiverush']) {
					delete source.volatiles['glaiverush'];
					source.addVolatile('glaiverush');
				}
			}
		},
		condition: {
			noCopy: true,
			duration: 2,
			onAccuracy(accuracy) {
				return true;
			},
			onSourceModifyDamage() {
				return this.chainModify(2);
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	
	ceaselessedge: {
		num: 845,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Ceaseless Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		// critRatio: 2,
		secondary: {
			chance: 100,
			onHit(target) {
				target.side.addSideCondition('spikes');
			},
		},
		target: "normal",
		type: "Dark",
	},
		
	stoneaxe: {
		num: 830,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		// critRatio: 2,
		secondary: {
			chance: 100,
			onHit(target) {
				target.side.addSideCondition('stealthrock');
			},
		},
		target: "normal",
		type: "Rock",
	},
	
	jetpunch: {
		num: 857,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Jet Punch",
		pp: 15,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	}, 
	
	direclaw: {
		shortDesc: "50% to paralyze, poison, or sleep target. High crit ratio.",
		num: 10011,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dire Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		critRatio: 2,
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
					if ((target) && source.ability === "unstableclaws") {this.add('-start', source, 'typechange', 'Poison');}
				} else if (result === 1) {
					target.trySetStatus('par', source);
					if ((target) && source.ability === "unstableclaws") {this.add('-start', source, 'typechange', 'Electric');}
				} else {
					target.trySetStatus('slp', source);
					if ((target) && source.ability === "unstableclaws") {this.add('-start', source, 'typechange', 'Psychic');}
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	
	shedtail: {
		num: 10111,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shed Tail",
		shortDesc: "In exchange for half of its HP, switches out and creates a Substitute for the switch-in.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		selfSwitch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Substitute", target);
		},
		onTryHit(target) {
			if (target.hp <= target.maxhp / 2 || target.maxhp === 1) { // Shedinja clause
				this.add('-fail', target, 'move: Substitute', '[weak]');
				return null;
			}
		},
		onHit(target) {
			this.directDamage(target.maxhp / 2);
		},
		slotCondition: 'shedtail',
		condition: {
			onStart(pokemon, source) {
				this.effectData.hp = Math.floor(source.maxhp / 4);
			},
			onSwap(target) {
				target.side.removeSlotCondition(target, 'shedtail');
				if (!target.fainted) {
					if (target.addVolatile('substitute')) {
						target.volatiles['substitute'].hp = this.effectData.hp;
						this.add('-anim', target, "Substitute", target);
					}
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
	
	infernalparade: {
		num: 844,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		onHit(target, source) {
			const result = this.random(10);
			if (result <= 2) {target.trySetStatus('brn', source);}
		},
		category: "Special",
		name: "Infernal Parade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	
	makeitrain: {
		num: 874,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Make It Rain",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Steel",
		contestType: "Beautiful",
	},
	
	roulettespin: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Activates the Roulette Wheel an additional time.",
		name: "Roulette Spin",
		pp: 40,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Metronome", target);
		},
		onHit(source) {
					var result: number;
		const pickSide = this.random(2);

		for (const allPokemon of this.getAllActive()) {
			if (allPokemon.hasAbility('obtrusive')) {
				return;
			}
		} 

		this.add('-message', "Time for the Roulette Wheel!");
		
		result = this.random(35);

		if (result === 0) {
			this.hint("Roulette Wheel Result 1 - Both Pokemon trade Speed stats.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Speed Swap", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Speed Swap", target);
				}
				}
			}
		}
    
		else if (result === 1) {
			this.hint("Roulette Wheel Result 2 - Both Pokemon will crit next turn.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Laser Focus", pokemon);
			}
		}    

		else if (result === 2) {
			this.hint("Roulette Wheel Result 3 - Make all Pokemon drowsy.");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('yawn');
			}
		}  
        
		else if (result === 3) {
			this.hint("Roulette Wheel Result 4 - Make one Pokemon Transform and raise its Speed.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
          this.boost({spe: 1}, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
          this.boost({spe: 1}, target);
				}
				}
			}
		}
        
		else if (result === 4) {
			this.hint("Roulette Wheel Result 5 - Everyone gets a Sub!");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('substitute');
			}
		}   
        
		else if (result === 5) {
			this.hint("Roulette Wheel Result 6 - Both Pokemon get Encored.");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('encore');
			}
		}   

		else if (result === 6) {
			this.hint("Roulette Wheel Result 7 - octolock was too much guys");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Fairy Lock", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Fairy Lock", target);
				}
				}
			}
		}  
        
		else if (result === 7) {
			this.hint("Roulette Wheel Result 8 - Both Pokemon get Taunted.");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('taunt');
			}
		}   

		else if (result === 8) { // might need to change the name for this one later.
			this.hint("Roulette Wheel Result 9 - Both Pokemon change their types.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Conversion", pokemon);
			}
		}         
        
		else if (result === 9) {
			this.hint("Roulette Wheel Result 10 - How do you like THIS one, Game Freak?");
			for (const pokemon of this.getAllActive()) {
				this.heal(pokemon.maxhp / 2, pokemon);
      	}
    	} 
		
		else if (result === 10) { 
			this.hint("Roulette Wheel Result 11 - lmao x2");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Pound", pokemon);
			}
		}  	
		
		else if (result === 11) { 
			this.hint("Roulette Wheel Result 12 - Everyone gets their ability replaced with Defeatist.");
			for (const s1 of this.sides[0].active) {
				for (const s2 of this.sides[1].active) {
					const oldAbility1 = s1.setAbility('Defeatist');
					if (oldAbility1) {
						this.add('-ability', s1, 'Defeatist', '[from] move: Roulette Spin');
					}
					const oldAbility2 = s2.setAbility('Defeatist');
					if (oldAbility2) {
						this.add('-ability', s2, 'Defeatist', '[from] move: Roulette Spin');
					}
				}
			}
		} 			

		else if (result === 12) {
			this.hint("Roulette Wheel Result 13 - I felt like being mean today");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.boost({atk: 4, spa: 4, spe: -12}, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.boost({atk: 4, spa: 4, spe: -12}, target);
				}
				}
			}	
		}
		
		else if (result === 13) { 
			this.hint("Roulette Wheel Result 14 - Everyone gets perfect accuracy.");
			for (const pokemon of this.getAllActive()) {
				this.boost({accuracy: 12}, pokemon);
			}
		} 		

		else if (result === 14) {
			this.hint("Roulette Wheel Result 15 - One Pokemon gets to Baton Pass.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Baton Pass", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Baton Pass", target);
				}
				}
			}
		}  
		
		else if (result === 15) { 
			this.hint("Roulette Wheel Result 16 - Both Pokemon click Destiny Bond.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Destiny Bond", pokemon);
			}
		}  
		
		else if (result === 16) {
			this.hint("Roulette Wheel Result 17 - One side sets webs.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Sticky Web", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Sticky Web", target);
				}
				}
			}
		}  	
		
		else if (result === 17) {
			this.hint("Roulette Wheel Result 18 - i felt like it would be funny");
			for (const s1 of this.sides[0].active) {
				for (const s2 of this.sides[1].active) {
					if (pickSide === 0) {
						this.damage(s2.baseMaxhp / 4, s2);
						this.heal(s1.baseMaxhp / 4, s1);
						
					}
					else if (pickSide === 1) {
						this.damage(s1.baseMaxhp / 4, s1);
						this.heal(s2.baseMaxhp / 4, s2);
					}
				}
			}
		}  
			
		else if (result === 18) { 
			this.hint("Roulette Wheel Result 19 - Everyone gets Beast Boost.");
			for (const s1 of this.sides[0].active) {
				for (const s2 of this.sides[1].active) {
					const oldAbility1 = s1.setAbility('Beast Boost');
					if (oldAbility1) {
						this.add('-ability', s1, 'Beast Boost', '[from] move: Roulette Spin');
					}
					const oldAbility2 = s2.setAbility('Beast Boost');
					if (oldAbility2) {
						this.add('-ability', s2, 'Beast Boost', '[from] move: Roulette Spin');
					}
				}
			}
		} 			
		
		else if (result === 19) {
			this.hint("Roulette Wheel Result 20 - Give one Pokemon an omniboost.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
				}
				}
			}
		} 
			
		else if (result === 20) {
			this.hint("Roulette Wheel Result 21 - Switch both sides' field effects.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Court Change", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Court Change", target);
				}
				}
			}	
		}
			
		else if (result === 21) {
			this.hint("Roulette Wheel Result 22 - Averages out the HP of active Pokemon.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Pain Split", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Pain Split", target);
				}
				}
			}	
		}
		
		else if (result === 22) {
			this.hint("Roulette Wheel Result 23 - One active Pokemon Defogs.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Defog", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Defog", target);
				}
				}
			}
		}
			
		else if (result === 23) {
			this.hint("Roulette Wheel Result 24 - Both sides set Stealth Rock.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Stealth Rock", pokemon);
			}
		}
			
		else if (result === 24) {
			this.hint("Roulette Wheel Result 25 - Make both Pokemon swap abilities.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Skill Swap", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Skill Swap", target);
				}
				}
			}	
		}
			
		else if (result === 25) {
			this.hint("Roulette Wheel Result 26 - Both active Pokemon swap items.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Trick", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Switcheroo", target);
				}
				}
			}	
		}
			
		else if (result === 26) {
			this.hint("Roulette Wheel Result 27 - Sets Trick Room.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Trick Room", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Trick Room", target);
				}
				}
			}	
		}
			
		else if (result === 27) {
			this.hint("Roulette Wheel Result 28 - Sets Magic Room.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Magic Room", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Magic Room", target);
				}
				}
			}	
		}

		else if (result === 28) {
			this.hint("Roulette Wheel Result 29 - Sets Wonder Room.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Wonder Room", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Wonder Room", target);
				}
				}
			}	
		}
			
		else if (result === 29) {
			this.hint("Roulette Wheel Result 30 - glhf");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Sheer Cold", pokemon);
			}
		}
			
	   else if (result === 30) {
			this.hint("Roulette Wheel Result 31 - screw you both");
	            for (const pokemon of this.getAllActive()) {
			this.directDamage(pokemon.hp, pokemon);
		    }
		}			
			
		else if (result === 31) {
			this.hint("Roulette Wheel Result 32 - Attempts to Freeze all active Pokemon.");
			for (const pokemon of this.getAllActive()) {
				pokemon.trySetStatus('frz', pokemon);
	        	}
		}	
			
		else if (result === 32) {
			this.hint("Roulette Wheel Result 33 - Funeral service...");
			var deez: number;
			deez = this.random(32);
			if (deez === 0) {
				for (const pokemon of this.sides[0].active) {
					this.directDamage(pokemon.hp, pokemon);
					this.add('-message', "rip bozo LMAOOOOOOOOO");
				}
			}
			else if (deez === 1) {
				for (const pokemon of this.sides[0].active) {
					this.directDamage(pokemon.hp, pokemon);
					this.add('-message', "rip bozo LMAOOOOOOOOO");
				}
			}
			else {	
				this.add(`raw|<img src="https://cdn.discordapp.com/attachments/884947038788276264/1043172263291269120/goriplax.png" height="454" width="411">`);
				this.add('-message', "Good day, ladies and gentlemen.");
				this.add('-message', "Many of you may be wondering why Gorilax wasn't included in Gen 9 Duomod.");
				this.add('-message', "Today, I have to bear the unfortunate news that Gorilax has passed away.");
				this.add('-message', "Over the years, Gorilax has graced our lives with his 116/101/117 bulk, awful typing, and cool offensive sets.");
				this.add('-message', "His abilities of Forewarn and Mental Note may not have been the best, but we loved him for them all the same.");
				this.add('-message', "Some may have found his looks creepy, but in spite of that, his face always had that unbreakable smile.");
				this.add('-message', "Let us not grieve over the fact that he is gone, but celebrate the fact that we were able to have so many good times with him.");
				this.add('-message', "We will forever miss you, Gorilax.");
				this.add('-message', "R.I.P. 2019 - 2022");
			}
		}

		else if (result === 33) {
			this.hint("Roulette Wheel Result 34 - Both active Pokemon use Metronome.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Metronome", pokemon);
			}
		}
		
		else {
			this.hint("Roulette Wheel Result 35 - THE ULTIMATE EFFECT!!!");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Ultranome", pokemon);
			}
		}
			
		},
	},
		
	ultranome: {
		num: 118,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultranome",
		pp: 40,
		shortDesc: "Uses Metronome 3 times; not learnable.",
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Metronome", target);
		},
		onHit(pokemon) {
			this.useMove("Metronome", pokemon);
			this.useMove("Metronome", pokemon);
			this.useMove("Metronome", pokemon);
		},
		secondary: null,
		target: "self",
		type: "Dark",
		contestType: "Cute",
	},
};
