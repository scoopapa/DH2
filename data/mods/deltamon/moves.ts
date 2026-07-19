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
		longDesc: "",
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
	
	suckypunch: {
		name: "Sucky Punch",
		type: "Water",
		category: "Physical",
		basePower: 75,
		accuracy: 100,
		pp: 10,
		shortDesc: "User recovers 50% of damage dealt.",
		longDesc: "The user delivers a totally sucky punch. The user's HP is restored by up to half the damage taken by the target.",
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1, metronome: 1 },
		drain: [1, 2],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Surging Strikes", target);
		},
		secondary: null,
		target: "normal",
	},
	
		spadeblast: {
		name: "Spade Blast",
		type: "Dark",
		category: "Physical",
		basePower: 45,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits twice. Attempts to hit each available foe once.",
		longDesc: "The user launches two spade-shaped projectiles at the target. If there are two opposing Pokemon, this move hits both of them once.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 2,
		smartTarget: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Fling", target);
			this.add('-anim', pokemon, "Fling", target);
		},
		secondary: null,
		target: "normal",
	},
	
	shockingsnare: {
		name: "Shocking Snare",
		type: "Electric",
		category: "Physical",
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Shocking Snare boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		accuracy: 100,
		pp: 20,
		shortDesc: "Acts before switching. 2x damage if the target is switching out.",
		longDesc: "The user swiftly clasps the target using electricity filled arms. This move inflicts double damage if used on a target that is switching out.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		beforeTurnCallback(pokemon) {
			for (const target of pokemon.foes()) {
				target.addVolatile('pursuit');
				const data = target.volatiles['pursuit'];
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thunder Cage", target);
			this.add('-anim', pokemon, "Sucker Punch", target);
		},
		secondary: null,
		target: "normal",
	},
	
	buble: {
		name: "Buble",
		type: "Water",
		category: "Special",
		basePower: 135,
		accuracy: 95,
		pp: 5,
		shortDesc: "Buble.",
		longDesc: "Buble.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Oceanic Operetta", target);
		},
		secondary: null,
		target: "normal",
	},
	
	snowgrave: {
		name: "Snowgrave",
		type: "Ice",
		category: "Special",
		basePower: 140,
		accuracy: true,
		pp: 5,
		shortDesc: "",
		longDesc: "",
		priority: 0,
		flags: {protect: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Snowgrave'), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Blizzard", target);
			this.add ('-anim', pokemon, "Sheer Cold", target);
		},
		
		secondary: {
			chance: 15,
			status: 'frz'
		},
		target: "normal",
	},
	
	smartzephyr: {
		name: "Smart Zephyr",
		type: "Flying",
		category: "Special",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "Low Priority (Priority -6). Forces the target to switch to a random ally.",
		longDesc: "The user sends a gust of wind at the target, knocking them away and dragging out a different Pokemon.",
		priority: -6,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1,},
		forceSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
				this.add('-anim', pokemon, "Nasty Plot", target);
			this.add('-anim', pokemon, "Whirlwind", target);
		},
		secondary: null,
		target: "normal",
		contestType: "Clever",
	},
	
	chaosbomb: {
		name: "Chaos Bomb",
		type: "Ghost",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Sets a random Terrain and Weather, the user then switches out.",
		longDesc: "The user throws a bomb that explodes and causes a random Weather and Terrain effect, then switches places with a party Pokemon in waiting.",
		priority: 0,
		flags: {metronome: 1},
		selfSwitch: true,
		onHit() {
			const randTerrain = this.random(100);
			const randWeather = this.random(100);
			if (randTerrain < 26) {
				this.field.setTerrain('electricterrain');
			} else if (randTerrain < 51) {
				this.field.setTerrain('psychicterrain');
			}  else if (randTerrain < 76) {
				this.field.setTerrain('grassyterrain');
			} else {
				this.field.setTerrain('mistyterrain');
			}
			if (randWeather < 26) {
				this.field.setWeather('sunnyday');
			} else if (randWeather < 51) {
				this.field.setWeather('raindance');
			}  else if (randWeather < 76) {
				this.field.setWeather('snowscape');
			} else {
				this.field.setWeather('sandstorm');
			}
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mind Blown", target);
		},
		secondary: null,
		target: "all",
	},
	
	bigshot: {
		name: "BIG SHOT",
		type: "Electric",
		category: "Special",
		basePower: 165,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Partially hits through Protect.",
		longDesc: "THE [Valued Customer!] USES ALL ITS [[Hyperlink Blocked]] TO FIRE A [[BIG SHOT!!!]]. THE OPPONENT'S DEFENSES [[Cannot say no to this hot new sale!]]. THIS MOVE IS A [One and done deal].",
		priority: 0,
		flags: {protect: 1, metronome: 1, bullet: 1, pulse: 1},
		onHitProtect(source, target, move) {
				target.getMoveHitData(move).bypassProtect = this.effect;
				return false;
			},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Gigavolt Havoc", target);
		},
		secondary: null,
		target: "normal",
	},
	
	blackknife: {
		name: "Black Knife",
		type: "Dark",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 5,
		ohko: false,
		shortDesc: "Targets with 1/3 of their HP or lower are instantly KOed.",
		longDesc: "The user swiftly strikes by using a blackened sword. Instantly KOs targets with a third of their HP or less.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ceaseless Edge", target);
		},
		onTryHit(target) {
			if (target.hp * 3 <= target.maxhp)
				this.add('-message', "SWOON!"),
				move.ohko = true;
		},
		secondary: null,
		target: "normal",
	},
	
	bellchime: {
		name: "Bell Chime",
		type: "Steel",
		category: "Special",
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "10% chance to Confuse. Bypasses Substitute.",
		longDesc: "The user releases a disorienting bell chime. This move has a 10% chance to confuse the opponent.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Heal Bell", target);
			this.add('-anim', pokemon, "Hyper Voice", target);
		},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
	},
	
	miccheck: {
		name: "Mic Check",
		type: "Normal",
		category: "Special",
		basePower: 20,
		accuracy: 100,
		pp: 15,
		shortDesc: "Hits 2-5 times. Bypasses Substitute.",
		longDesc: "The user checks the acoustics in the room by making loud noises. This move hits two to five times in a row.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		multihit: [2, 5],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		secondary: null,
		target: "allAdjacent",
	},
	
	rudebuster: {
		name: "Rude Buster",
		type: "Dragon",
		category: "Physical",
		overrideDefensiveStat: 'spd',
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "Deals damage based on Special Defense rather than Defense.",
		longDesc: "The user unleashes a wave of energy consisting of their own rude thoughts. This move deals Special damage.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Dragon Pulse", target);
				this.add('-anim', pokemon, "Psyshock", target);
		},
		secondary: null,
		target: "normal",
	},
	
	battleact: {
		name: "Battle Act",
		type: "Normal",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "-1 Sp. Def and Def for opponents, +1 Sp. Atk and Atk for allies. Usually goes first (Priority +1). Bypasses Substitute.",
		longDesc: "The user encourages the opponent to stop fighting, lowering their Defense and Special Defense by 1 stage. If used on an ally, the user urges them to keep fighting, boosting their Attack and Special Attack by 1 stage. This move bypasses Substitute and usually goes first.",
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1, reflectable: 1, bypasssub: 1, allyanim: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Metronome", target);
				this.add('-anim', pokemon, "Lovely Kiss", target);
		},
		onHit(target, source, move) {
			if(target.isAlly(source)) {
				move.boosts = {atk: 1, spa: 1};
			}
			else {
				move.boosts = {def: -1, spd: -1};
			}
		},
		secondary: null,
		target: "normal",
		zMove: {boost: {spe: 1}},
	},
	
	pacify: {
		name: "Pacify",
		type: "Fairy",
		category: "Status",
		basePower: 0,
		accuracy: 100,
		pp: 5,
		shortDesc: "Opposing Pokemon with less than 100% of their HP left gain the Drowsy status. Cannot be used twice in a row.",
		longDesc: "The user casts a spell which makes exhausted opponents Drowsy. This move only works on Pokemon who are under 100% of their HP. This move cannot be used twice in a row.",
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1, metronome: 1, cantusetwice: 1},
		volatileStatus: 'yawn',
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mist", target);
		},
		onTryHit(target) {
			if (target.status || !target.runStatusImmunity('slp') || target.hp >= target.maxhp) {
				return false;
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		zMove: {boost: {def: 1}},
	},
	
	bedazzlingblade: {
		name: "Bedazzling Blade",
		type: "Fairy",
		category: "Physical",
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "20% chance to confuse.",
		longDesc: "The user playfully and erratically attacks the target with a sharp blade. This move has a 20% chance to confuse the target.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Dazzling Gleam", target);
			this.add('-anim', pokemon, "Aqua Cutter", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
	},
	
	neochaos: {
		name: "Neo Chaos",
		type: "???",
		category: "Special",
		basePower: 160,
		accuracy: true,
		pp: 1,
		shortDesc: "The target is given a random status effect, sets a random Terrain and Weather, and then the user switches out.",
		longDesc: "The user bedazzles the target by unleashing a variety of effects all at once. The opponent is inflicted with a random status condition, a random Weather and Terrain effect is set, and the user switches places with a party Pokemon in waiting. This move has no type and hits every Pokemon for neutral damage.",
		priority: 0,
		flags: {},
		selfSwitch: true,
		isZ: "jestersshadowcrystal",
		onHit() {
			const randTerrain = this.random(100);
			const randWeather = this.random(100);
			if (randTerrain < 26) {
				this.field.setTerrain('electricterrain');
			} else if (randTerrain < 51) {
				this.field.setTerrain('psychicterrain');
			}  else if (randTerrain < 76) {
				this.field.setTerrain('grassyterrain');
			} else {
				this.field.setTerrain('mistyterrain');
			}
			if (randWeather < 26) {
				this.field.setWeather('sunnyday');
			} else if (randWeather < 51) {
				this.field.setWeather('raindance');
			}  else if (randWeather < 76) {
				this.field.setWeather('snowscape');
			} else {
				this.field.setWeather('sandstorm');
			}
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Nature's Madness", target);
			this.add('-anim', pokemon, "Ruination", target);
			this.add('-anim', pokemon, "Hex", target);
		},
		secondary: {
			chance: 100,
			//Neo Chaos will attempt to inflict a status before the field effects to avoid clashing with Misty Terrain.
			onTryHit(target, source) {
				const randStatus = this.sample(['psn', 'tox', 'par', 'slp', 'frz', 'brn']);
				target.trySetStatus(randStatus, source);
			},
		},
		target: "normal",
	},
	
	transmitkromer: {
		name: "TRANSMIT KROMER",
		type: "Steel",
		category: "Special",
		basePower: 180,
		accuracy: true,
		pp: 1,
		shortDesc: "User heals 50% of the damage dealt. Speed +1",
		longDesc: "THE [Esteemed Customer] TRANSMITS ALL [Little Sponge]'S THE DELICIS KROMER TO ITSELF. HEALING 50% OF YOUR [[Ow! Stop! Help Me!]] AND GIVING [You got the Running Shoes!] [[Warning! This is a limited time offer! CLICK NOW!]]",
		priority: 0,
		flags: {heal: 1},
		drain: [1, 2],
		boosts: {
			spe: 1,
		},
		isZ: "puppetsshadowcrystal",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Giga Drain", target);
			this.add('-anim', pokemon, "Make It Rain", target);
		},
		secondary: null,
		target: "normal",
	},
	
	bellowingstarburstslice: {
		name: "Bellowing Starburst Slice",
		type: "Dark",
		category: "Physical",
		basePower: 180,
		accuracy: true,
		pp: 1,
		ohko: false,
		shortDesc: "Targets with 45% of their HP or lower are instantly KOed.",
		longDesc: "The user assaults the targets by unleashing a barrage of star-shaped crystals, then delivers a savage thrust of its sword at blinding speed. Instantly KOs targets with 45% of their HP or less.",
		priority: 0,
		flags: {slicing: 1},
		isZ: "knightsshadowcrystal",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Snarl", target);
			this.add('-anim', pokemon, "Swift", target);
			this.add('-anim', pokemon, "Spacial Rend", target);
		},
		onTryHit(target) {
			if (target.hp * 100/45 <= target.maxhp)
				this.add('-message', "SWOON!"),
				move.ohko = true;
		},
		secondary: null,
		target: "allAdjacentFoes",
	},
	
	omegaperseverance: {
		name: "Omega Perseverance",
		type: "Psychic",
		category: "Special",
		basePower: 190,
		accuracy: true,
		pp: 1,
		shortDesc: "Dispels target's stat changes. 50% chance to confuse the target. Disables the target's ability before doing damage.",
		longDesc: "The user dazes the target and cleverly nullifies their ability and stat changes in the process. This move has a 50% chance to leave the target confused. The target's ability is nullified before damage is dealt.",
		priority: 0,
		flags: {},
		isZ: "violetomegapetal",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Miracle Eye", target);
			this.add('-anim', pokemon, "Springtide Storm", target);
			this.add('-anim', pokemon, "Block", target);
		},
		onTryHit(target) {
			if (target.getAbility().flags['cantsuppress']) return;
			target.addVolatile('gastroacid');
		},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		
		secondary: {
			chance: 50,
			volatileStatus: 'confusion'
		},
		target: "normal",
	},
	
	omegajustice: {
		name: "Omega Justice",
		type: "Psychic",
		category: "Special",
		basePower: 120,
		accuracy: true,
		pp: 1,
		shortDesc: "Always results in a critical hit, bypasses Substitute, and ignores abilities.",
		longDesc: "The user launches a powerful blast from its gun. This move bypasses Substitute, ignores the target's ability, and always results in a critical hit.",
		priority: 0,
		flags: {bullet: 1, bypasssub: 1},
		willCrit: true,
		ignoreAbility: true,
		isZ: "goldenomegapetal",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Photon Geyser", target);
		},
		secondary: null,
		target: "normal",
	},
	
	omegabravery: {
		name: "Omega Bravery",
		type: "Fighting",
		category: "Physical",
		basePower: 18,
		accuracy: true,
		pp: 1,
		shortDesc: "Hits 10 times. Nearly always goes first (Priority +2). Attempts to hit each available foe equally. Prevents user from switching out.",
		longDesc: "The user rushes fists-first into the target, hitting them up to ten times. If there are multiple targets, this move attempts to hit them equally. This move nearly always goes first. After the move is complete, the user is prevented from switching out.",
		priority: 2,
		flags: {fist: 1},
		multihit: 10,
		smartTarget: true,
		volatileStatus: 'noretreat',
		isZ: "amberomegapetal",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "All-Out Pummeling", target);
		},
		secondary: null,
		target: "normal",
	},
	
	omegakindness: {
		name: "Omega Kindness",
		type: "Grass",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 1,
		shortDesc: "Heals 100% of target's HP. Restores negative stat changes, restores all missing PP, and cures non-volatile status conditions along with confusion.",
		longDesc: "The user whips up a delectable meal that heals an ally or itself to maximum HP, removes all negative stat changes, fully restores PP, and cures any non-volatile status conditions as well as confusion.",
		priority: 0,
		flags: {heal: 1},
		heal: [1, 1],
		isZ: "verdantomegapetal",
		onHit(target) {
			target.clearStatus();
			target.removeVolatile('confusion');
			target.setBoost(this.effectState.boosts);
			this.add('-clearnegativeboost', target, '[silent]');
			for (const moveSlot of target.moveSlots) {
				moveSlot.pp = moveSlot.maxpp;
			}
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Flower Trick", target);
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
	},
	
	omegaintegrity: {
		name: "Omega Integrity",
		type: "Psychic",
		category: "Special",
		basePower: 120,
		accuracy: true,
		pp: 1,
		shortDesc: "Removes all hazards, terrain, and screens on both sides. Sets a rainbow on your team's field for 4 turns (doubles chances for secondary effects).",
		longDesc: "The user performs a truly elegant dance, brushing away all clutter on the battlefield, leaving a rainbow to emerge on the user's side of the field, doubling all secondary effect chances for 4 turns.",
		priority: 0,
		flags: {},
		self: {
			sideCondition: 'waterpledge',
		},
		isZ: "azureomegapetal",
		//Copied from Defog
		onHit(target, source, move) {
				let success = false;
				const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist'];
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Omega Integrity', `[of] ${source}`);
						success = true;
					}
				}
				this.field.clearTerrain();
				return success;
			},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Lunar Blessing", target);
			this.add('-anim', pokemon, "Hydro Pump", target);
		},
		secondary: null,
		target: "normal",
	},
	
	omegapatience: {
		name: "Omega Patience",
		type: "Fairy",
		category: "Physical",
		basePower: 215,
		accuracy: true,
		pp: 1,
		shortDesc: "Hits four turns after being used. Ignores stat changes. Fails if another Future Move is active.",
		longDesc: "The user launches a giant knife-like projectile into the air, and must patiently wait for it to come down and hit the target. This move hits four turns after being used, and ignores the target's stat changes. This move will fail if another Future Move is active.",
		priority: 0,
		flags: {allyanim: 1, futuremove: 1, slicing: 1},
		ignoreDefensive: true,
		isZ: 'cyanomegapetal',
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 5,
				move: 'omegapatience',
				source: source,
				moveData: {
					id: 'omegapatience',
					name: "Omega Patience",
					accuracy: true,
					basePower: 215,
					category: "Physical",
					priority: 0,
					flags: {allyanim: 1, futuremove: 1, slicing: 1},
					ignoreDefensive: true,
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Fairy',
				},
			});
			this.add('-start', source, 'move: Omega Patience');
			return this.NOT_FAIL;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tachyon Cutter", target);
		},
		secondary: null,
		target: "normal",
	},
	
	mewmewwand: {
		name: "Mew Mew Wand",
		category: "Special",
		basePower: 100,
		accuracy: 100,
		pp: 10,
		shortDesc: "Pink only: Psychic-Type in Corporeal Forme, Ghost-Type in Ghost Forme. 50% chance to lower target's Sp. Atk in Corporeal Forme, 50% Chance to lower target's Atk in Ghost Forme.",
		longDesc: "The user fires a blast from its magical wand. This move is Psychic-Type with a 50% chance to lower the target's Special Attack in Pink's Corporeal Forme, and Ghost-Type with a 50% chance to lower the target's Attack in Pink's Ghost Forme.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, pulse: 1},
		onTry(source) {
			if (source.species.baseSpecies === 'Pink') {
				return;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Mew Mew Wand');
			return null;
		},
		onModifyType(move, pokemon) {
			if (pokemon.species.name === 'Pink-Ghost') {
			move.type = 'Ghost';	
			} else {
				move.type = 'Psychic';
			}
		},
		
		onPrepareHit(target, pokemon, move) {
			if (pokemon.species.name === 'Pink') {
				this.attrLastMove('[still]');
				this.add('-anim', pokemon, "Fleur Cannon", target);
			} else {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Infernal Parade", target);
			}
		},
		secondary: {
			onHit(pokemon, move) {
				if (pokemon.species.name === 'Pink-Ghost') {
					{
					chance: 50,
					move.boosts; {atk: -1};
					}
				}
					else {
					{
					chance: 50,
					move.boosts; {spa: -1};
					}
				}
			},
		},
		target: "normal",
	},
	
	taintedvines: {
		name: "Tainted Vines",
		type: "Grass",
		category: "Physical",
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * target.positiveBoosts();
			this.debug(`BP: ${bp}`);
			return bp;
			if (bp >= 140) {
				move.drain [1, 4];
				move.flags.heal = 1;
				this.add('-anim', pokemon, "Giga Drain", target);
			}
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "For every stat boost the target has, this move gains +20 power. At 140 Base Power or more, the user heals 25% of the damage dealt.",
		longDesc: "The user catches the opponent with energy-draining vines. The more the target's stats are raised, the greater the power of the move. At 140 power or higher, the user heals a quarter of the damage dealt.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Power Whip", target);
		},
		
		secondary: null,
		target: "normal",
	},
	
	jarona: {
		name: "Jarona",
		type: "Grass",
		category: "Physical",
		basePower: 95,
		accuracy: 100,
		pp: 10,
		shortDesc: "50% chance to lower the target's Defense by 1. High critical hit ratio.",
		longDesc: "The user unleashes a special punch directed at the target. This move has a 50% chance to lower the target's Defense by one stage. This move has a heightened chance of landing a critical hit.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, punch: 1},
		critRatio: 2,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Leaf Storm", target);
				this.add('-anim', pokemon, "Mach Punch", target);
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
	},
	
	gorgonsgaze: {
		name: "Gorgon's Gaze",
		type: "Rock",
		category: "Special",
		basePower: 65,
		accuracy: 100,
		pp: 10,
		shortDesc: "30% Chance to paralyze, 2x power on paralyzed opponents.",
		longDesc: "The user strikes a mythical glare at the target which may paralyze them. This move's power is doubled if used on a target who is already paralyzed.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'par') {
				return this.chainModify(2);
			}
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Freezing Glare", target);
			this.add('-anim', pokemon, "Glare", target);
		},
		secondary: {
			chance: 30,
			status: 'par'
		},
		target: "normal",
	},
	
	cleansingflame: {
		name: "Cleansing Flame",
		type: "Fire",
		category: "Special",
		basePower: 70,
		accuracy: 100,
		pp: 10,
		shortDesc: "Clears target's stat changes before doing damage.",
		longDesc: "The user sends forth an enchanted flame that dispels the target's stat changes before dealing damage.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mystical Fire", target);
			this.add('-anim', pokemon, "Nature's Madness", target);
		},
		
		onTryHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: null,
		target: "normal",
	},
	blueattack: {
		name: "Blue Attack",
		type: "Ground",
		category: "Physical",
		basePower: 70,
		accuracy: 100,
		pp: 5,
		shortDesc: "Grounds target. Usually goes first (Priority +1). Fails if target is not attacking.",
		longDesc: "The user sends a blue attack at the target that weighs down their Soul, grounding them. This move can hit aerial Pokemon. This move fails if the target is not using an attacking move.",
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'smackdown',
		ignoreImmunity: {'Ground': true},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Water Pulse", target);
		},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		//copied from Thousand Arrows
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Ground')) {
				if (target.hasType('Flying')) return 0;
			}
		},
		secondary: null,
		target: "normal",
	},
	
	rousingmelody: {
		name: "Rousing Melody",
		type: "Water",
		category: "Status",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "Gives an ally Pokemon +1 Speed and cures Sleep or Drowsy. Bypasses Substitute",
		longDesc: "The user lets loose a rousing song for an ally Pokemon, curing them of Sleep and boosting their Speed by 1 stage.",
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1, metronome: 1, sound: 1, bypasssub: 1},
		boosts: {
			spe: 1,
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Screech", target);
		},
		onHit(target) {
			if (target.status === 'slp') target.cureStatus();
			if (target.volatiles['yawn']) target.removeVolatile('yawn');
		},
		secondary: null,
		target: "adjacentAlly",
		zMove: {boost: {spe: 1}},
	},
	
	expelspell: {
		name: "Expel Spell",
		type: "Psychic",
		category: "Special",
		basePower: 70,
		accuracy: 100,
		pp: 20,
		shortDesc: "1.5x damage if target is holding an item. Removes target's item.",
		longDesc: "The user casts a spell that sends the target's item right out of their hand. This move's power is boosted by 50% if the target is holding an item.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Expanding Force", target);
		},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Expel Spell', `[of] ${source}`);
			}
		},
		secondary: null,
		target: "normal",
	},
	
	goodmorningstar: {
		name: "Good Morningstar",
		type: "Steel",
		category: "Physical",
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) {
				this.debug('Good Morningstar double damage');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		accuracy: 100,
		pp: 15,
		shortDesc: "2x damage + confusion on sleeping targets. Wakes sleeping targets.",
		longDesc: "The user bashes the target with a shining weapon. Sleeping targets take double damage from this move and get confused, but are woken up.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onHit(target) {
			if (target.status === 'slp') {
				target.cureStatus();
				target.Volatile('confusion');
			}
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Gigaton Hammer", target);
		},
		secondary: null,
		target: "normal",
	},
	
	spearbarrage: {
		name: "Spear Barrage",
		type: "Water",
		category: "",
		basePower: 25,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits 4-5 times. Each hit targets a random opponent if there are multiple.",
		longDesc: "The user rains down a barrage of magical spears directed at the target. If there are multiple targets, this move hits them at random. This move hits four to five times.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		multihit: [4, 5],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Water Shuriken", target);
		},
		secondary: null,
		target: "randomNormal",
	},
	
	flamingtrident: {
		name: "Flaming Trident",
		type: "Fire",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 10,
		shortDesc: "30% chance to Taunt the target for 3 turns.",
		longDesc: "The user strikes the target with a searing trident. This move has a 30% chance to force the opponent into attacking for 3 turns.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Fire Lash", target);
		},
		secondary: {
			chance: 30,
			volatileStatus: 'taunt',
		},
		target: "normal",
	},
	
	gasterblaster: {
		name: "Gaster Blaster",
		type: "Ghost",
		category: "Special",
		basePower: 95,
		accuracy: 100,
		pp: 10,
		shortDesc: "If an ally has fainted during the previous turn, this attack poisons the target.",
		longDesc: "The user fires a Gaster Blaster at the target. If an ally has fainted last turn, this move will poison the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Hyper Beam", target);
		},
		onHit(target, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				source.trySetStatus('psn', target);
			}
		},
		secondary: null,
		target: "normal",
	},
	
	umbrallaser: {
		name: "Umbral Laser",
		type: "Dark",
		category: "Special",
		basePower: 140,
		accuracy: 100,
		pp: 5,
		shortDesc: "Lowers the user's Defense and Special Defense by 2 before attacking.",
		longDesc: "The user lowers its guard, harshly depleting its Defense and Special Defense stats to fire off a massive black laser using all its might.",
		priority: 0,
		flags: {protect: 1, failcopycat: 1, failmimic: 1},
	
		onPrepareHit(target, pokemon, move) {
			this.add('-message', '${pokemon.name} lowers its guard!'),
			move.self = {boosts: {def: -2, spd: -2}};
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Scale Shot", target);
			this.add('-anim', pokemon, "Doom Desire", target);
		},
		secondary: null,
		target: "normal",
	},
	
	starblazing: {
		name: "Star Blazing",
		type: "Normal",
		category: "Special",
		basePower: 130,
		accuracy: 100,
		pp: 5,
		shortDesc: "Ignores the target's stat changes.",
		longDesc: "The user drops a barrage of prismatic stars at the target. This move ignores the target's stat changes.",
		priority: 0,
		flags: {protect: 1, failcopycat: 1, failmimic: 1},
		ignoreDefensive: true,
		ignoreEvasion: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tera Starstorm", target);
		},
		secondary: null,
		target: "normal",
	},
	
	hypergoner: {
		name: "Hyper Goner",
		type: "Normal",
		category: "Special",
		basePower: 0,
		accuracy: true,
		pp: 1,
		shortDesc: "Sets the target's HP to 1.",
		longDesc: "The user drags the target into a malevolent vortex that soon collapses in on them. This move will always leave the target at 1 HP.",
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		damageCallback(pokemon, target) {
			const hp1 = Math.floor(target.getUndynamaxedHP() - 1);
			return target.getUndynamaxedHP() - hp1;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Black Hole Eclipse", target);
		},
		secondary: null,
		target: "normal",
	},
	
	//Pollen Puff and Sharpshooter
	pollenpuff: {
		inherit: true,
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (source.hasAbility('sharpshooter')) {
					(!this.heal(Math.floor(target.baseMaxhp * 0.75))) 
						return this.NOT_FAIL;
					}
				} else {
					(!this.heal(Math.floor(target.baseMaxhp * 0.5))) 
						return this.NOT_FAIL;
					}
		}
	},
};
