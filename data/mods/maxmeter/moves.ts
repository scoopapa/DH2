export const Moves: {[k: string]: ModdedMoveData} = {
	// super 
	supermove: {
		num: 3000,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Allows the user to use their Super.",
		name: "Super Move",
		pp: 10,
		priority: 0,
		flags: {failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1, mystery: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Calm Mind", target);
		},
		onTryHit(source) {
			if (source.volatiles['dynamax']) return false;
		},
		onHit(target, source, effect) {
			let type = source.getTypes()[0];
			if (source.species.num === 174 || source.species.num === 39 || source.species.num === 40) {
				this.actions.useMove("Snooze Button", source);
			} else if (source.species.num === 474 || source.species.num === 233 || source.species.num === 137) {
				this.actions.useMove("ERROR 474", source);
			} else if (source.species.num === 403 || source.species.num === 404 || source.species.num === 405) {
				this.actions.useMove("Flux Tail", source);
			}	else if (source.species.num === 235) {
				this.actions.useMove("Art Attack", source);
			} else if (source.species.num === 605 || source.species.num === 606) {
				this.actions.useMove("Time Warp", source);
			} else if (source.species.num === 129 || source.species.num === 130) {
				this.actions.useMove("Dragon Install", source);
			} else if (source.species.num === 60 || source.species.num === 61 || source.species.num === 62 || source.species.num === 186) {
				this.actions.useMove("Hop Away", source);
			} else if (type === "Bug") {
				this.actions.useMove("Nutritious Nectar", source);
			} else if (type === "Dark") {
				this.actions.useMove("Deceiving Daze", source);
			} else if (type === "Dragon") {
				this.actions.useMove("Dragon Drop", source);
			} else if (type === "Electric") {
				this.actions.useMove("Electric Incline", source);
			} else if (type === "Fairy") {
				this.actions.useMove("Pixie Parade", source);
			} else if (type === "Fighting") {
				this.actions.useMove("Hype Hammer", source);
			} else if (type === "Fire") {
				this.actions.useMove("Flame Fan", source);
			} else if (type === "Flying") {
				this.actions.useMove("Winding Wind", source);
			} else if (type === "Ghost") {
				this.actions.useMove("Ghastly Gash", source);
			} else if (type === "Grass") {
				this.actions.useMove("Draping Drain", source);
			} else if (type === "Ground") {
				this.actions.useMove("Tremor Trial", source);
			} else if (type === "Ice") {
				this.actions.useMove("Glacier Glomp", source);
			} else if (type === "Normal") {
				this.actions.useMove("Blank Bash", source);
			} else if (type === "Poison") {
				this.actions.useMove("Venom Vault", source);
			} else if (type === "Psychic") {
				this.actions.useMove("Psycho Sight", source);
			} else if (type === "Rock") {
				this.actions.useMove("Pebble Pester", source);
			} else if (type === "Steel") {
				this.actions.useMove("Stainless Stagger", source);
			} else if (type === "Water") {
				this.actions.useMove("Opulent Oasis", source);
			}
		},
		/* Nature Power code in case the above doesn't work
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			}
			this.actions.useMove(move, pokemon, target);
			return null;
		},
  		*/
		target: "self",
		type: "Stellar",
		contestType: "Cute",
	},
	
	// meter moves
	snoozebutton: {
		num: 2000,
		accuracy: true,
		basePower: 170,
		category: "Special",
		shortDesc: "User sleeps 2 turns and restores HP and status.",
		name: "Snooze Button",
		pp: 5,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Rest", source);
			this.add('-anim', source, "Misty Explosion", target);
		},
		/*onDisableMove(pokemon) {
			if (!pokemon.side.getSideCondition('maxmeter7')) pokemon.disableMove('sleepysurprise');
		},*/
		onTry(source) {
			if (source.status === 'slp' || source.hasAbility('comatose')) return false;
			if (source.hp === source.maxhp) {
				this.add('-fail', source, 'heal');
				return null;
			}
			if (source.hasAbility(['insomnia', 'vitalspirit'])) {
				this.add('-fail', source, '[from] ability: ' + source.getAbility().name, '[of] ' + source);
				return null;
			}
		},
		self: {
			onHit(target, source, move) {
				const result = source.setStatus('slp', source, move);
				if (!result) return result;
				source.statusState.time = 3;
				source.statusState.startTime = 3;
				this.heal(source.maxhp, source, source, move);
			},
		},
		secondary: null,
		target: "allAdjacent",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	error474: {
		num: 2001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "+1 to all stats. Once per switch-in.",
		name: "ERROR 474",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		volatileStatus: 'error474',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Conversion", target);
		},
		onTry(source, target, move) {
			if (source.volatiles['error474']) return false;
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: ERROR 474');
			},
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	fluxtail: {
		num: 2002,
		accuracy: true,
		basePower: 90,
		category: "Physical",
		shortDesc: "Always goes first.",
		name: "Flux Tail",
		pp: 5,
		priority: 3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1, contact: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter3')) {
				source.side.removeSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter6');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter7');
			}
			this.add('-anim', source, "Parabolic Charge", target);
			this.add('-anim', source, "Extreme Speed", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	nutritiousnectar: {
		num: 2003,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Heals the team's status. Special if user's SpA > Atk.",
		name: "Nutritious Nectar",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Quiver Dance", source);
			this.add('-anim', source, "Muddy Water", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		self: {
			onHit(pokemon, source, move) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
						continue;
					}
					ally.cureStatus();
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	deceivingdaze: {
		num: 2004,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Taunts the foe. Special if user's SpA > Atk.",
		name: "Deceiving Daze",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		volatileStatus: 'taunt',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter5');
			}
			this.add('-anim', source, "Feint", target);
			this.add('-anim', source, "Dark Pulse", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	dragondrop: {
		num: 2005,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Adds the Dragon-type to the foe. Special if user's SpA > Atk.",
		name: "Dragon Drop",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Clanging Scales", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onHit(target) {
			if (target.hasType('Dragon')) return false;
			if (!target.addType('Dragon')) return false;
			this.add('-start', target, 'typeadd', 'Dragon', '[from] move: Dragon Drop');
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	electricincline: {
		num: 2006,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Charges the user. Special if user's SpA > Atk.",
		name: "Electric Incline",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		self: {
			volatileStatus: 'charge',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter5');
			}
			this.add('-anim', source, "Charge", target);
			this.add('-anim', source, "Electro Drift", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	pixieparade: {
		num: 2007,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Sets Safeguard, Mist, & Lucky Chant for 5 turns. Special if user's SpA > Atk.",
		name: "Pixie Parade",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter5');
			}
			this.add('-anim', source, "Twinkle Tackle", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				source.side.addSideCondition('safeguard');
				source.side.addSideCondition('luckychant');
				source.side.addSideCondition('mist');
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				source.side.addSideCondition('safeguard');
				source.side.addSideCondition('luckychant');
				source.side.addSideCondition('mist');
			}
		},
		secondary: {}, // sheer force-boosted
		target: "normal",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	hypehammer: {
		num: 2008,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Gives the user the Focus Energy effect. Special if user's SpA > Atk.",
		name: "Hype Hammer",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		self: {
			volatileStatus: 'focusenergy',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter5');
			}
			this.add('-anim', source, "All-Out Pummeling", target);
			this.add('-anim', source, "Bulk Up", source);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	flamefan: {
		num: 2009,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Makes the target weaker to Fire. Special if user's SpA > Atk.",
		name: "Flame Fan",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		volatileStatus: 'tarshot',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Burn Up", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	windingwind: {
		num: 2010,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Sets Tailwind. Special if user's SpA > Atk.",
		name: "Winding Wind",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1, wind: 1},
		noSketch: true,
		self: {
			sideCondition: 'tailwind',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter5');
			}
			this.add('-anim', source, "Aeroblast", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	ghastlygash: {
		num: 2011,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Disables the foe's last move. Special if user's SpA > Atk.",
		name: "Ghastly Gash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		volatileStatus: 'disable',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter5');
			}
			this.add('-anim', source, "Poltergeist", target);
			this.add('-anim', source, "Spite", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	drapingdrain: {
		num: 2012,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "User recovers 2/3 of the damage dealt. Special if user's SpA > Atk.",
		name: "Draping Drain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		drain: [2, 3],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Leaf Storm", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	tremortrial: {
		num: 2013,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Sets a layer of Spikes. Special if user's SpA > Atk.",
		name: "Tremor Trial",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter5');
			}
			this.add('-anim', source, "Precipice Blades", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Ground",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	glacierglomp: {
		num: 2014,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Clears the foe's stat changes. Special if user's SpA > Atk.",
		name: "Glacier Glomp",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Clear Smog", target);
			this.add('-anim', source, "Ice Spinner", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	blankbash: {
		num: 2015,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Clears hazards from the user's side of the field. Special if user's SpA > Atk.",
		name: "Blank Bash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Double-Edge", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Blank Bash', '[of] ' + pokemon);
					}
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Blank Bash', '[of] ' + pokemon);
					}
				}
			}
		},
		secondary: {}, // sheer force-boosted
		target: "normal",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	venomvault: {
		num: 2016,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Sets a layer of Toxic Spikes. Special if user's SpA > Atk.",
		name: "Venom Vault",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Gunk Shot", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('toxicspikes');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('toxicspikes');
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Poison",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	pebblepester: {
		num: 2017,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Sets Stealth Rock. Special if user's SpA > Atk.",
		name: "Pebble Pester",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter5');
			}
			this.add('-anim', source, "Rock Wrecker", target);
			this.add('-anim', source, "Stealth Rock", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('stealthrock');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('stealthrock');
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Rock",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	psychosight: {
		num: 2018,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Suppresses the foe's ability. Special if user's SpA > Atk.",
		name: "Psycho Sight",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter5');
			}
			this.add('-anim', source, "Psycho Boost", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	stainlessstagger: {
		num: 2019,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Ignores resistances. Special if user's SpA > Atk.",
		name: "Stainless Stagger",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Sucker Punch", target);
			this.add('-anim', source, "Rock Polish", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel' || type === 'Water' || type === 'Fire' || type === 'Electric') return 0;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	opulentoasis: {
		num: 2020,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		shortDesc: "Sets a team-wide Aqua Ring for 5 turns. Special if user's SpA > Atk.",
		name: "Opulent Oasis",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		self: {
			sideCondition: 'opulentoasis',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Water Spout", target);
			this.add('-anim', source, "Life Dew", source);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		condition: {
			duration: 5,
			onSideStart(side) {
				this.add('-start', side, 'move: Opulent Oasis');
				this.add('-message', `The oasis will heal this side for the next 5 turns!`);
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Opulent Oasis');
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	hopaway: {
		num: 2021,
		accuracy: true,
		basePower: 80,
		category: "Physical",
		shortDesc: "Switches the user out if it hits.",
		name: "Hop Away",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1, contact: 1},
		noSketch: true,
		selfSwitch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter1')) {
				source.side.removeSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter2')) {
				source.side.removeSideCondition('maxmeter2');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter3')) {
				source.side.removeSideCondition('maxmeter3');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter6');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter7');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter8');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter9');
			}
			this.add('-anim', source, "Splash", source);
			this.add('-anim', source, "Bounce", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	dragoninstall: {
		num: 2022,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Boosts the user's Atk & SpA by 2, and adds the Dragon-type to the user.",
		name: "Dragon Install",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Dragon Dance", target);
			this.add('-anim', source, "Morning Sun", target);
		},
		onHit(target) {
			if (target.hasType('Dragon')) return false;
			if (!target.addType('Dragon')) return false;
			this.add('-start', target, 'typeadd', 'Dragon', '[from] move: Dragon Install');
		},
		boosts: {
			atk: 2,
			spa: 2,
		},
		secondary: null,
		target: "self",
		type: "Dragon",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	timewarp: {
		num: 2023,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Sets Trick Room and gives numerous buffs.",
		name: "Time Warp",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		pseudoWeather: 'trickroom',
		volatileStatus: 'timewarp',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter3')) {
				source.side.removeSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter6');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter7');
			}
			this.add('-anim', source, "Gravity", target);
		},
		condition: {
			onStart(pokemon, source, effect) {
				this.add('-start', pokemon, 'Time Warp');
				this.add('-message', `${pokemon} has caused a Time Warp!`);
				this.add('-message', `Time Warp boosts the power of Psychic moves by 1.2x, changes Normal moves into Psychic moves, and lets the user skip the charge turn on charge moves!`);
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Psychic') {
					return this.chainModify(1.2);
				}
			},
			onModifyTypePriority: -2,
			onModifyType(move) {
				if (move.type === 'Normal') {
					move.type = 'Psychic';
					this.debug(move.name + "'s type changed to Psychic");
				}
			},
			onModifyMovePriority: 1,
			onModifyMove(move) {
				delete move.flags['charge'];
			},
			onChargeMove(pokemon, target, move) {
				if (pokemon.useItem()) {
					this.debug('time warp - remove charge turn for ' + move.id);
					this.attrLastMove('[still]');
					this.addMove('-anim', pokemon, move.name, target);
					return false; // skip charge turn
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	artattack: {
		num: 2024,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User uses all of their moves (except their Super).",
		name: "Art Attack",
		pp: 5,
		priority: 0,
		flags: {failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter2')) {
				source.side.removeSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter3')) {
				source.side.removeSideCondition('maxmeter3');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter8')) {
				source.side.removeSideCondition('maxmeter8');
				source.side.addSideCondition('maxmeter6');
			} else if (source.side.removeSideCondition('maxmeter9')) {
				source.side.removeSideCondition('maxmeter9');
				source.side.addSideCondition('maxmeter7');
			} else if (source.side.removeSideCondition('maxmeter10')) {
				source.side.removeSideCondition('maxmeter10');
				source.side.addSideCondition('maxmeter8');
			}
			this.add('-anim', source, "Sketch", target);
		},
		onHit(target) {
			this.add('-message', `Smeargle is having an Art Attack!`);
			const move1 = target.moveSlots[0];
			const move2 = target.moveSlots[1];
			const move3 = target.moveSlots[2];
			const move4 = target.moveSlots[3];
			this.actions.useMove(move1, target);
			this.actions.useMove(move2, target);
			this.actions.useMove(move3, target);
			this.actions.useMove(move4, target);
			this.add('-message', `The Art Attack is now over!`);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},

	/*
	karaokenight: {
		num: 2001,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Puts the foe to sleep.",
		name: "Karaoke Night",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		status: 'slp',
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			if (source.side.removeSideCondition('maxmeter1')) {
				source.side.removeSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter2')) {
				source.side.removeSideCondition('maxmeter2');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter3')) {
				source.side.removeSideCondition('maxmeter3');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter6');
			}
			this.add('-anim', source, "Sing", target);
		},
		onDisableMove(pokemon) {
			if (!pokemon.side.getSideCondition('maxmeter1') && !pokemon.side.getSideCondition('maxmeter2') && !pokemon.side.getSideCondition('maxmeter3') && !pokemon.side.getSideCondition('maxmeter4') && !pokemon.side.getSideCondition('maxmeter5') && !pokemon.side.getSideCondition('maxmeter6') && !pokemon.side.getSideCondition('maxmeter7')) pokemon.disableMove('karaokenight');
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Cute",
	},
	deflation: {
		num: 2002,
		accuracy: 100,
		shortDesc: "If hit by an attack, returns 2x damage.",
		basePower: 0,
		damageCallback(pokemon) {
			const lastDamagedBy = pokemon.getLastDamagedBy(true);
			if (lastDamagedBy !== undefined) {
				return (lastDamagedBy.damage * 2) || 1;
			}
			return 0;
		},
		category: "Special",
		name: "Deflation",
		pp: 10,
		priority: -6,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Explosion", target);
		},
		onDisableMove(pokemon) {
			if (!pokemon.side.getSideCondition('maxmeter7')) pokemon.disableMove('deflation');
			if (!pokemon.side.getSideCondition('maxmeter6')) pokemon.disableMove('deflation');
			if (!pokemon.side.getSideCondition('maxmeter5')) pokemon.disableMove('deflation');
			if (!pokemon.side.getSideCondition('maxmeter4')) pokemon.disableMove('deflation');
			if (!pokemon.side.getSideCondition('maxmeter3')) pokemon.disableMove('deflation');
		},
		onTryHit(source) {
			if (source.side.removeSideCondition('maxmeter3')) {
				source.side.removeSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter4');
			}
		},
		onTry(source) {
			const lastDamagedBy = source.getLastDamagedBy(true);
			if (lastDamagedBy === undefined || !lastDamagedBy.thisTurn) return false;
		},
		onModifyTarget(targetRelayVar, source, target, move) {
			const lastDamagedBy = source.getLastDamagedBy(true);
			if (lastDamagedBy) {
				targetRelayVar.target = this.getAtSlot(lastDamagedBy.slot);
			}
		},
		secondary: null,
		target: "scripted",
		type: "Fairy",
		contestType: "Cool",
	},
	puffup: {
		num: 2003,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Forces the target to switch to a random ally.",
		name: "Puff Up",
		pp: 10,
		priority: -6,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failencore: 1, failmimic: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pulverizing Pancake", target);
		},
		onDisableMove(pokemon) {
			if (!pokemon.side.getSideCondition('maxmeter7')) pokemon.disableMove('puffup');
			if (!pokemon.side.getSideCondition('maxmeter6')) pokemon.disableMove('puffup');
			if (!pokemon.side.getSideCondition('maxmeter5')) pokemon.disableMove('puffup');
		},
		onTryHit(source) {
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			}
		},
		forceSwitch: true,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
 */
	
	// removing dynamax's random immunities (AKA i totally could've just used tera instead of dmax)
		destinybond: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Destiny Bond');
			},
			onFaint(target, source, effect) {
				if (!source || !effect || target.isAlly(source)) return;
				if (effect.effectType === 'Move' && !effect.flags['futuremove']) {
					this.add('-activate', target, 'move: Destiny Bond');
					source.faint();
				}
			},
			onBeforeMovePriority: -1,
			onBeforeMove(pokemon, target, move) {
				if (move.id === 'destinybond') return;
				this.debug('removing Destiny Bond before attack');
				pokemon.removeVolatile('destinybond');
			},
			onMoveAborted(pokemon, target, move) {
				pokemon.removeVolatile('destinybond');
			},
		},
	},
	encore: {
		inherit: true,
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move) return false;

				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveIndex = target.moves.indexOf(move.id);
				if (move.isZ || move.flags['failencore'] || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				if (!this.queue.willMove(target)) {
					this.effectState.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectState.move) return this.effectState.move;
			},
			onResidualOrder: 16,
			onResidual(target) {
				if (!target.moves.includes(this.effectState.move) ||
					target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	entrainment: {
		inherit: true,
		onTryHit(target, source) {
			if (target === source) return false;
			if (
				target.ability === source.ability ||
				target.getAbility().flags['cantsuppress'] || target.ability === 'truant' ||
				source.getAbility().flags['noentrain']
			) {
				return false;
			}
		},
		onHit(target, source) {
			const oldAbility = target.setAbility(source.ability);
			if (oldAbility) {
				this.add('-ability', target, target.getAbility().name, '[from] move: Entrainment');
				if (!target.isAlly(source)) target.volatileStaleness = 'external';
				return;
			}
			return oldAbility as false | null;
		},
	},
	grassknot: {
		inherit: true,
		desc: "This move's power is 20 if the target weighs less than 10 kg, 40 if less than 25 kg, 60 if less than 50 kg, 80 if less than 100 kg, 100 if less than 200 kg, and 120 if greater than or equal to 200 kg or if the target is Dynamax or Gigantamax.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 120;
			} else if (targetWeight >= 2000) {
				bp = 120;
			} else if (targetWeight >= 1000) {
				bp = 100;
			} else if (targetWeight >= 500) {
				bp = 80;
			} else if (targetWeight >= 250) {
				bp = 60;
			} else if (targetWeight >= 100) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	lowkick: {
		inherit: true,
		desc: "This move's power is 20 if the target weighs less than 10 kg, 40 if less than 25 kg, 60 if less than 50 kg, 80 if less than 100 kg, 100 if less than 200 kg, and 120 if greater than or equal to 200 kg or if the target is Dynamax or Gigantamax.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 120;
			} else if (targetWeight >= 2000) {
				bp = 120;
			} else if (targetWeight >= 1000) {
				bp = 100;
			} else if (targetWeight >= 500) {
				bp = 80;
			} else if (targetWeight >= 250) {
				bp = 60;
			} else if (targetWeight >= 100) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	heatcrash: {
		inherit: true,
		desc: "The power of this move depends on (user's weight / target's weight), rounded down. Power is equal to 120 if the result is 5 or more, 100 if 4, 80 if 3, 60 if 2, and 40 if 1 or less or if the target is Dynamax or Gigantamax. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 40;
			} else if (pokemonWeight >= targetWeight * 5) {
				bp = 120;
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100;
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80;
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	heavyslam: {
		inherit: true,
		desc: "The power of this move depends on (user's weight / target's weight), rounded down. Power is equal to 120 if the result is 5 or more, 100 if 4, 80 if 3, 60 if 2, and 40 if 1 or less or if the target is Dynamax or Gigantamax. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 40;
			} else if (pokemonWeight >= targetWeight * 5) {
				bp = 120;
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100;
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80;
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	instruct: {
		inherit: true,
		onHit(target, source) {
			if (!target.lastMove) return false;
			const lastMove = target.lastMove;
			const moveIndex = target.moves.indexOf(lastMove.id);
			if (
				lastMove.flags['failinstruct'] || lastMove.isZ || lastMove.isMax ||
				lastMove.flags['charge'] || lastMove.flags['recharge'] ||
				target.volatiles['beakblast'] || target.volatiles['focuspunch'] || target.volatiles['shelltrap'] ||
				(target.moveSlots[moveIndex] && target.moveSlots[moveIndex].pp <= 0)
			) {
				return false;
			}
			this.add('-singleturn', target, 'move: Instruct', '[of] ' + source);
			this.queue.prioritizeAction(this.queue.resolveAction({
				choice: 'move',
				pokemon: target,
				moveid: target.lastMove.id,
				targetLoc: target.lastMoveTargetLoc!,
			})[0] as MoveAction);
		},
	},
	skillswap: {
		inherit: true,
		onTryHit(target, source) {
			const targetAbility = target.getAbility();
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['failskillswap'] || targetAbility.flags['failskillswap']) {
				return false;
			}
			const sourceCanBeSet = this.runEvent('SetAbility', source, source, this.effect, targetAbility);
			if (!sourceCanBeSet) return sourceCanBeSet;
			const targetCanBeSet = this.runEvent('SetAbility', target, source, this.effect, sourceAbility);
			if (!targetCanBeSet) return targetCanBeSet;
		},
	},
	torment: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'gmaxmeltdown') this.effectState.duration = 3;
				this.add('-start', pokemon, 'Torment');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Torment');
			},
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			},
		},
	},
	
	// coding the max meter side conditions (AKA I really should've worked off of Stockpile)
	maxmeter1: {
		shortDesc: "The first level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 1",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter1',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (move.num > 919) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter1');
					source.side.addSideCondition('maxmeter2');
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (!move || !target) return;
				if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod < 0) {
					target.side.removeSideCondition('maxmeter1');
					target.side.addSideCondition('maxmeter2');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 1');
				this.add('-message', `This side has 1 level of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 1');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter2: {
		shortDesc: "The second level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 2",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter2',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (move.num > 919) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter2');
					source.side.addSideCondition('maxmeter3');
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (!move || !target) return;
				if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod < 0) {
					target.side.removeSideCondition('maxmeter2');
					target.side.addSideCondition('maxmeter3');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 2');
				this.add('-message', `This side has 2 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 2');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter3: {
		shortDesc: "The third level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 3",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter3',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (move.num > 919) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter3');
					source.side.addSideCondition('maxmeter4');
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (!move || !target) return;
				if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod < 0) {
					target.side.removeSideCondition('maxmeter3');
					target.side.addSideCondition('maxmeter4');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 3');
				this.add('-message', `This side has 3 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 3');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter4: {
		shortDesc: "The fourth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 4",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter4',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (move.num > 919) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter4');
					source.side.addSideCondition('maxmeter5');
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (!move || !target) return;
				if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod < 0) {
					target.side.removeSideCondition('maxmeter4');
					target.side.addSideCondition('maxmeter5');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 4');
				this.add('-message', `This side has 4 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 4');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter5: {
		shortDesc: "The fifth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 5",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter5',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (move.num > 919) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter5');
					source.side.addSideCondition('maxmeter6');
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (!move || !target) return;
				if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod < 0) {
					target.side.removeSideCondition('maxmeter5');
					target.side.addSideCondition('maxmeter6');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 5');
				this.add('-message', `This side has 5 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 5');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter6: {
		shortDesc: "The sixth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 6",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter6',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (move.num > 919) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter6');
					source.side.addSideCondition('maxmeter7');
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (!move || !target) return;
				if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod < 0) {
					target.side.removeSideCondition('maxmeter6');
					target.side.addSideCondition('maxmeter7');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 6');
				this.add('-message', `This side has 6 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 6');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter7: {
		shortDesc: "The seventh level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 7",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter7',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (move.num > 919) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter7');
					source.side.addSideCondition('maxmeter8');
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (!move || !target) return;
				if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod < 0) {
					target.side.removeSideCondition('maxmeter7');
					target.side.addSideCondition('maxmeter8');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 7');
				this.add('-message', `This side has 7 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 7');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter8: {
		shortDesc: "The eighth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 8",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter8',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (move.num > 919) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter8');
					source.side.addSideCondition('maxmeter9');
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (!move || !target) return;
				if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod < 0) {
					target.side.removeSideCondition('maxmeter8');
					target.side.addSideCondition('maxmeter9');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 8');
				this.add('-message', `This side has 8 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 8');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter9: {
		shortDesc: "The ninth and penultimate level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 9",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter9',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (move.num > 919) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter9');
					source.side.addSideCondition('maxmeter10');
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (!move || !target) return;
				if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod < 0) {
					target.side.removeSideCondition('maxmeter9');
					target.side.addSideCondition('maxmeter10');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 9');
				this.add('-message', `This side has 9 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 9');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter10: {
		shortDesc: "The tenth and final level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 10",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter10',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 10');
				this.add('-message', `This side has 10 levels of Max Meter!`);
				this.add('-message', `The Max Meter is now maxed out!`);
				if (side.sideConditions['dynamaxused']) {
					side.dynamaxUsed = true;
				} else {
					side.dynamaxUsed = false;				
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 10');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	dynamaxused: {
		shortDesc: "Prevents Dynamax from being used multiple times.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dynamax Used",
		pp: 5,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'dynamaxused',
		condition: {},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
};
