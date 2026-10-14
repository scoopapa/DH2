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
	greenwaste: {
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Green Waste",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		status: 'erd',
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Toxic", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	durandal: {
		name: "Durandal",
		type: "Steel",
		category: "Physical",
		basePower: 40,
		accuracy: 100,
		pp: 10,
		shortDesc: "Raises the User's attack two stages",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, slicing: 1, sheerforce: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tachyon Cutter", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 2,
				},
			},
		target: "normal",
		}
	},
	serpentinebarrier: {
		name: "Serpentine Barrier",
		type: "Psychic",
		category: "Status",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 4,
		onPrepareHit(pokemon) {
			this.add('-anim', pokemon, "Obstruct", pokemon);
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.boost({def: -1, spd: -1}, source, target, this.dex.getActiveMove("Serpentine Barrier"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({def: -1, spd: -1}, source, target, this.dex.getActiveMove("Serpentine Barrier"));
				}
			},
		},
		secondary: null,
		target: "normal",
	},
	fourthmatchflame: {
		name: "Fourth Match Flame",
		type: "Fire",
		category: "Special",
		basePower: 150,
		accuracy: 100,
		pp: 5,
		shortDesc: "Always burns the target, User Faints",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond : 1, sheerforce: 1},
		selfdestruct: "always",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Explosion", target);
		},
		secondary: {
			chance: 100,
			status: 'brn'
		},
		target: "allAdjacent",
		
	},
	greatersplitvertical: {
		name: "Greater Split\: Vertical",
		type: "Steel",
		category: "Physical",
		basePower: 75,
		accuracy: 100,
		pp: 10,
		shortDesc: "Disables the target's last used move",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Behemoth Blade", target);
		},
		secondary: {
			volatileStatus: 'Disable'
		},
		target: "normal",
	},
	silence: {
		name: "Silence",
		type: "Rock",
		category: "Physical",
		basePower: 60,
		accuracy: 100,
		pp: 13,
		noPPBoosts : true,
		shortDesc: "Gets stronger with each use, final use instantly knocks out the target",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Snarl", target);
		},
		basePowerCallback(source, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? source.getMoveData(move.id) : source.getMoveData(callerMoveId);
			return (120 - (moveSlot.pp * 5))
		},
		damageCallback(source, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? source.getMoveData(move.id) : source.getMoveData(callerMoveId);
			if (moveSlot.pp === 0) {
				return this.clampIntRange(target.hp, 1);
			}
		},
		secondary: null,
		target: "normal",
	},
	bookburning: {
		name: "Book Burning",
		type: "Normal",
		category: "Status",
		basePower: 0,
		accuracy: 100,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Permanently copies the last move the target used",
		priority: 0,
		flags: {
			bypasssub: 1, allyanim: 1, failencore: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		onHit(target, source) {
			const move = target.lastMove;
			if (source.transformed || !move || source.moves.includes(move.id)) return false;
			if (move.flags['nosketch'] || move.isZ || move.isMax) return false;
			const sketchIndex = source.moves.indexOf('sketch');
			if (sketchIndex < 0) return false;
			const sketchedMove = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
			};
			source.moveSlots[sketchIndex] = sketchedMove;
			source.baseMoveSlots[sketchIndex] = sketchedMove;
			this.add('-activate', source, 'move: Book Burning', move.name);
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sketch", target);
		},
		secondary: null,
		target: "normal",
	},
	energybeam: {
		name: "Energy Beam",
		type: "Normal",
		category: "Special",
		basePower: 100,
		accuracy: 100,
		pp: 5,
		shortDesc: "Type varies based on the user's held drive, always benefits from the Charge effect",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Hyper Beam", target);
		},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			if (pokemon.item === 'burndrive') {
				move.type = 'Fire'
			} else if (pokemon.item === 'chilldrive') {
				move.type = 'Ice'
			} else if (pokemon.item === 'dousedrive') {
				move.type = 'Water'
			} else if (pokemon.item === 'shockdrive') {
				move.type = 'Electric'
			}
		},
		basePowerCallback(source, target, move) {
			if (source.volatiles.includes('charge') && !source.item === 'shockdrive') {
				return 200
				source.removeVolatile['charge']
			}
		},
		secondary: null,
		target: "normal",
	},
	eradication: {
		name: "Eradication",
		type: "Electric",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 5,
		shortDesc: "If empowered, applies Bleed",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Gear Grind", target);
		},
		onAfterMoveSecondary(target,pokemon,move) {
			//checks if prescript slot is moveslot
			if (pokemon.buffedSlot = move.moveslot) {
				source.trySetStatus('bld', target);
			}
		},
		secondary: null,
		target: "allOpponents",
	},
	decapitation: {
		name: "Decapitation",
		type: "Fighting",
		category: "Physical",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "If Empowered, bypasses type-based immunities",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mighty Cleave", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.buffedSlot = move.moveslot) {
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Fighting'] = true;
				}
			}
		},
		secondary: null,
		target: "normal",
	},
	castigation: {
		name: "Castigation",
		type: "Psychic",
		category: "Special",
		basePower: 35,
		accuracy: 100,
		pp: 8,
		shortDesc: "Hits an additional time for each turn in a row you've followed the Prescript",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Psycho Boost", target);
		},
		onModifyMove (move, pokemon){
			move.multihit = pokemon.prescriptCombo;
		},
		secondary: null,
		target: "normal",
	},
	balefulbrand: {
		name: "Baleful Brand",
		type: "Poison",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "Has a 30% chance to Erode the target",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, sheerforce: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Noxious Torque", target);
		},
		secondary: {
			chance: 30,
			status: 'erd'
		},
		target: "normal",
	},
	overspeed: {
		name: "Overspeed",
		type: "Fighting",
		category: "Physical",
		basePower: 70,
		accuracy: 100,
		pp: 15,
		shortDesc: "1.5x power if the user moves before the target",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, punch: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mach Punch", target);
		},
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Overspeed damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Overspeed NOT boosted');
			return move.basePower;
		},
		secondary: null,
		target: "normal",
	},
	redstrings: {
		name: "Red Strings",
		type: "Bug",
		category: "Status",
		basePower: 0,
		accuracy: 101,
		pp: 10,
		shortDesc: "The target's health cannot go below 1 for the turn. ",
		priority: 4,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		onHit(target, source) {
			this.add('-singleturn', target, 'move: Red Strings', '[of] ' + source);
			this.queue.prioritizeAction(this.queue.resolveAction({
				choice: 'move',
				pokemon: target,
				moveid: 'endure',
				targetLoc: target,
			})[0] as MoveAction);
		},
		secondary: null,
		target: "normal",
	},
	trailsofblue: {
		name: "Trails of Blue",
		type: "Flying",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "Ignores the target's stat stage changes, Special if Spa>Atk",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1, contact: 1},
		ignoreDefensive: true,
		ignoreEvasion: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Air Slash", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) < pokemon.getStat('spa', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
	},
	blindingbloodcleaver: {
		name: "Blinding Bloodcleaver",
		type: "Fire",
		category: "Physical",
		basePower: 50,
		accuracy: 100,
		pp: 10,
		shortDesc: "Always Bleeds the target",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1, contact: 1, sheerforce: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bitter Blade", target);
		},
		secondary: {
			chance: 100,
			status: 'erd'
		},
		target: "normal",
	},
	thegripping: {
		name: "The Gripping",
		type: "Normal",
		category: "Physical",
		basePower: 70,
		accuracy: 100,
		pp: 20,
		shortDesc: "Super Effective on Steel, 10% chance to paralyze the target",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Crush Grip", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		secondary: {
			chance: 10,
			status: 'par'
		},
		target: "normal",
	},
	mirrorsgaze: {
		name: "Mirror's Gaze",
		type: "Flying",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 15,
		shortDesc: "Type varies based on the user's primary type. Yi Sang/Sang Yi: Switches formes",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			if (pokemon.baseSpeciesName === 'yisang'){
				this.add('-anim', pokemon, "Aeroblast", target);
			} else if (pokemon.baseSpeciesName === 'sangyi') {
				this.add('-anim', pokemon, "Night Daze", target);
			} else 
				this.add('-anim', pokemon, "Tri Attack", target);
		},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[0];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[1]) type = types[1];
			move.type = type;
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'yisang' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				if (pokemon.baseSpeciesName === 'yisang'){
					pokemon.formeChange('sangyi', this.effect, false, '[msg]')
				} else
					pokemon.formeChange('yisang', this.effect, false, '[msg]')
			}
		},
		secondary: null,
		target: "normal",
	},
	ecstasyofblood: {
		name: "Ecstasy Of Blood",
		type: "Fire",
		category: "Physical",
		basePower: 50,
		accuracy: 100,
		pp: 5,
		shortDesc: "Consumes all stored Hardblood stacks to gain an additional 50 base power per stack consumed this way. 3 stacks consumed: hits Foes",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nocopycat: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mind Blown", target);
		},
		basePowerCallback (pokemon) {
			return 50 + (pokemon.volatiles['hardblood'].layers * 50);
		},
		onModifyMove (pokemon, move){
			if (pokemon.volatiles['hardblood'].layers === 3) {
				move.targets = 'allOpponents';
			}
		},
		onAfterMove(pokemon){
			pokemon.removeVolatile['hardblood'];
		},
		secondary: null,
		target: "normal",
	},
	greatswordrend: {
		name: "Greatsword Rend",
		type: "Ghost",
		category: "Physical",
		basePower: 60,
		accuracy: 100,
		pp: 20,
		shortDesc: "Hits an additional time at 10 BP for each fainted ally",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			if (move.isMultihit = 1) {
				this.add('-anim', pokemon, "Spirit Shackle", target);
			} else {
				this.add('-anim', pokemon, "Shadow Claw", target);
			}
		},
		onBeforeMove(move){
			move.isMultihit = 0
		},
		onModifyMove(pokemon, move){
			move.multihit = pokemon.side.totalFainted + 1;
		},
		basePowerCallback(move){
			if (move.isMultihit = 1) {
				return 10
			} else {
				return 60
			}
		},
		secondary: {
			onHit (move) {
				move.isMultihit = 1
			}
		},
		target: "normal",
	},
	loggerhead: {
		name: "Loggerhead",
		type: "Water",
		category: "Physical",
		basePower: 75,
		accuracy: 100,
		pp: 10,
		shortDesc: "100% chance to raise the user's defense by 1, Super Effective against Ahab",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, },
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Aqua Tail", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (target.baseSpeciesName === 'ahab') return 1;
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		target: "normal",
	},
	captainsharpoon: {
		name: "Captain's Harpoon",
		type: "Water",
		category: "Physical",
		basePower: 75,
		accuracy: 100,
		pp: 15,
		shortDesc: "If the target is defeated, allies heal 25% of their Maximum HP, Super Effective against Ishmael",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Aqua Cutter", target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				for (ally in pokemon.side.allySide) {
					ally.heal(Math.floor(ally.baseMaxHp/4));
				}
			}
		},
		onEffectiveness(typeMod, target, type) {
			if (target.baseSpeciesName === 'ishmael') return 1;
		},
		secondary: null,
		target: "normal",
	},
	scatteringfragrances: {
		name: "Scattering Fragrances",
		type: "Grass",
		category: "Special",
		basePower: 100,
		accuracy: 100,
		pp: 10,
		shortDesc: "Replaces the target's ability with Overgrow",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Petal Blizzard", target);
		},
		onHit(pokemon) {
			if (pokemon.getAbility().flags['cantsuppress']) {
				return
			}
			const oldAbility = pokemon.setAbility('overgrow');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Overgrow', '[from] move: Scattering Fragrances');
				return;
			}
			return oldAbility as false | null;
		},
		secondary: null,
		target: "allOpponents",
	},
	arcanaslave: {
		name: "Arcana Slave",
		type: "Fairy",
		category: "Special",
		basePower: 140,
		accuracy: 100,
		pp: 5,
		shortDesc: "Magical Girl of Love: Charges, then hits Foe(s) turn 2, Queen Of Hatred: 160 BP Dragon move, hits Foe(s) user must recharge if Successful",
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1, nocopycat: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			if (pokemon.baseSpeciesName === 'thequeenofhatred'){
				this.add('-anim', pokemon, "Eternabeam", target);
			} else {
				this.add('-anim', pokemon, "Light of Ruin", target);
			}
		},
		onModifyMove(move, pokemon){
			if (pokemon.baseSpeciesName === 'thequeenofhatred')
				move.basePower = 160;
				move.type = 'Dragon';
				move.flags.recharge = 1;
				delete move.flags['charge'];
		},
		onTryMove(attacker, defender, move) {
			if (attacker.baseSpeciesName === 'magicalgirloflove') {
				if (attacker.removeVolatile(move.id)) {
					return;
				}
				this.add('-prepare', attacker, move.name);
				if (!this.runEvent('ChargeMove', attacker, defender, move)) {
					return;
				}
				attacker.addVolatile('twoturnmove', defender);
				return null;
			}
		},
		onAfterMoveSecondary(pokemon,move) {
			if (move.type === 'Dragon') {
				pokemon.addVolatile('mustrecharge')
			}
		},
		secondary: null,
		target: "allOpponents",
	},
	theroadofgold: {
		name: "The Road of Gold",
		type: "Rock",
		category: "Physical",
		basePower: 50,
		accuracy: 100,
		pp: 20,
		shortDesc: "100% chance to raise the user's Attack by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, punch: 1, sheerforce: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mighty Cleave", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
	},
	tearsharpenedsword: {
		name: "Tear-Sharpened Sword",
		type: "Steel",
		category: "Physical",
		basePower: 25,
		accuracy: 100,
		pp: 15,
		shortDesc: "Hits an additional time for each fainted ally (Max. 6)",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tachyon Cutter", target);
		},
		onModifyMove(move,pokemon){
			deadAllies = pokemon.side.totalFainted;
			if (deadAllies > 6) deadAllies = 6;
			move.multihit = deadAllies;
		},
		secondary: null,
		target: "normal",
	},
	blindrage: {
		name: "Blind Rage",
		type: "Poison",
		category: "Physical",
		basePower: 120,
		accuracy: 100,
		pp: 10,
		shortDesc: "30% chance to Erode the target, User loses 12.5% Max HP",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, punch: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Noxious Torque", target);
		},
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 8), pokemon, pokemon, this.dex.conditions.get('Blind Rage'), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},
		secondary: {
			chance: 30,
			status: 'erd',
		},
		target: "allAdjacent",
	},
	hello: {
		name: "Hello?",
		type: "Normal",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 15,
		shortDesc: "Type varies based on the user's primary type",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sacred Sword", target);
		},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[0];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[1]) type = types[1];
			move.type = type;
		},
		secondary: null,
		target: "normal",
	},
	multislash: {
		name: "Multislash",
		type: "Normal",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Slash", target);
		},
		basePowerCallback(move, pokemon){
			//checks if prescript slot is moveslot
			if (pokemon.buffedSlot = move.moveslot) {
				return 100;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) < pokemon.getStat('spa', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
	},
	somberprocuration: {
		name: "Somber Procuration",
		type: "Normal",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "Typing varies based on the user's secondary type. If Empowered, ignores the target's abilities and stat stage changes. Special if user's Spa > Atk",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) < pokemon.getStat('spa', false, true)) move.category = 'Special';
			//checks if prescript slot is moveslot
			if (pokemon.buffedSlot = move.moveslot) {
				move.ignoreDefensive = 1;
				move.ignoreEvasion = 1;
				move.ignoreAbility = 1;
			}
		},
		secondary: null,
		target: "normal",
	},
	unlock: {
		name: "Unlock",
		type: "Normal",
		category: "Status",
		basePower: 0,
		accuracy: 100,
		pp: 15,
		shortDesc: "Raises the user's attack and spa by one. If empowered: raises by 2 instead",
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Autotomize", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.buffedSlot = move.moveslot) move.boosts = {atk: 2, spa: 2};
		},
		boosts: {
			atk: 1,
			spa: 1,
		},
		secondary: null,
		target: "self",
	},
	sanguinejoy: {
		name: "Sanguine Joy",
		type: "Fire",
		category: "Physical",
		basePower: 85,
		accuracy: 100,
		pp: 16,
		shortDesc: "Heals the user for 1/3 of the damage dealt, 10% chance to Bleed the target",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, biting: 1, drain: 1, sheerforce:1 },
		drain: [1, 3],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bite", target);
		},
		secondary: {
			chance: 10,
			status: 'bld',
		},
		target: "normal",
	},
	severingslash: {
		name: "Severing Slash",
		type: "Steel",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "20% chance to Bleed the target",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1, contact: 1, sheerforce: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sacred Sword", target);
		},
		secondary: {
			chance: 20,
			status: 'bld',
		},
		target: "normal",
	},
	refraction: {
		name: "85",
		type: "Dark",
		category: "Special",
		basePower: 85,
		accuracy: 100,
		pp: 15,
		shortDesc: "Has a 50% chance to lower the target's Atk by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sheerforce: 1, pulse: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Night Daze", target);
		},
		secondary: {
			chance: 100,
				boosts: {
					atk: -1,
				},
		},
		target: "normal",
	},
};