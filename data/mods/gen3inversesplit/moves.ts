export const Moves: {[k: string]: ModdedMoveData} = {
	absorb: {
		inherit: true,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down.",
		pp: 20,
		category: "Physical",
	},
	acid: {
		inherit: true,
		desc: "Has a 10% chance to lower the target's Defense by 1 stage.",
		shortDesc: "10% chance to lower the foe(s) Defense by 1.",
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		category: "Special",
	},
	aerialace: {
		inherit: true,
		category: "Special",
	},
	aeroblast: {
		inherit: true,
		category: "Special",
	},
	aircutter: {
		inherit: true,
		category: "Special",
	},
	ancientpower: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
		category: "Special",
	},
	armthrust: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	astonish: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			if (target.volatiles['minimize']) return 60;
			return 30;
		},
		desc: "Has a 30% chance to flinch the target. Damage doubles if the target has used Minimize while active.",
		category: "Special",
	},
	aurorabeam: {
		inherit: true,
		category: "Physical",
	},
	barrage: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	beatup: {
		inherit: true,
		desc: "Deals typeless damage. Hits one time for each unfainted Pokemon without a major status condition in the user's party, or fails if no Pokemon meet the criteria. For each hit, the damage formula uses the participating Pokemon's base Attack as the Attack stat, the target's base Defense as the Defense stat, and ignores stat stages and other effects that modify Attack or Defense; each hit is considered to come from the user.",
		category: "Physical",
	},
	bide: {
		inherit: true,
		desc: "The user spends two turns locked into this move and then, on the second turn after using this move, the user attacks the last Pokemon that hit it, inflicting double the damage in HP it lost during the two turns. If the last Pokemon that hit it is no longer active, the user attacks a random opposing Pokemon instead. If the user is prevented from moving during this move's use, the effect ends. This move does not ignore type immunity.",
		accuracy: 100,
		priority: 0,
		effect: {
			duration: 3,
			onLockMove: 'bide',
			onStart(pokemon) {
				this.effectData.totalDamage = 0;
				this.add('-start', pokemon, 'move: Bide');
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, move) {
				if (!move || move.effectType !== 'Move' || !source) return;
				this.effectData.totalDamage += damage;
				this.effectData.lastDamageSource = source;
			},
			onBeforeMove(pokemon, target, move) {
				if (this.effectData.duration === 1) {
					this.add('-end', pokemon, 'move: Bide');
					if (!this.effectData.totalDamage) {
						this.add('-fail', pokemon);
						return false;
					}
					target = this.effectData.lastDamageSource;
					if (!target) {
						this.add('-fail', pokemon);
						return false;
					}
					if (!target.isActive) {
						const possibleTarget = this.getRandomTarget(pokemon, this.dex.getMove('pound'));
						if (!possibleTarget) {
							this.add('-miss', pokemon);
							return false;
						}
						target = possibleTarget;
					}
					const moveData = {
						id: 'bide' as ID,
						name: "Bide",
						accuracy: 100,
						damage: this.effectData.totalDamage * 2,
						category: "Physical",
						priority: 0,
						flags: {contact: 1, protect: 1},
						effectType: 'Move',
						type: 'Normal',
					} as unknown as ActiveMove;
					this.tryMoveHit(target, pokemon, moveData);
					return false;
				}
				this.add('-activate', pokemon, 'move: Bide');
			},
			onMoveAborted(pokemon) {
				pokemon.removeVolatile('bide');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Bide', '[silent]');
			},
		},
		category: "Special",
	},
	bind: {
		inherit: true,
		desc: "Prevents the target from switching for two to five turns. Causes damage to the target equal to 1/16 of its maximum HP, rounded down, at the end of each turn during effect. The target can still switch out if it uses Baton Pass. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		category: "Special",
	},
	blastburn: {
		inherit: true,
		category: "Physical",
	},
	blazekick: {
		inherit: true,
		category: "Physical",
	},
	blizzard: {
		inherit: true,
		desc: "Has a 10% chance to freeze the target.",
		shortDesc: "10% chance to freeze foe(s).",
		onModifyMove() { },
		category: "Physical",
	},
	bodyslam: {
		inherit: true,
		category: "Special",
	},
	boneclub: {
		inherit: true,
		category: "Special",
	},
	bonerush: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	bonemerang: {
		inherit: true,
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		category: "Special",
	},
	bounce: {
		inherit: true,
		desc: "Has a 30% chance to paralyze the target. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Gust, Sky Uppercut, Thunder, and Twister, and Gust and Twister have doubled power when used against it.",
		category: "Special",
	},
	brickbreak: {
		inherit: true,
		category: "Special",
	},
	bubble: {
		inherit: true,
		category: "Physical",
	},
	bubblebeam: {
		inherit: true,
		category: "Physical",
	},
	bulletseed: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Physical",
	},
	cometpunch: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	confusion: {
		inherit: true,
		category: "Physical",
	},
	constrict: {
		inherit: true,
		category: "Special",
	},
	covet: {
		inherit: true,
		desc: "If this attack was successful and the user has not fainted, it steals the target's held item if the user is not holding one. The target's item is not stolen if it is a Mail or Enigma Berry. Items lost to this move cannot be regained with Recycle.",
		flags: {protect: 1, mirror: 1},
		category: "Special",
	},
	crabhammer: {
		inherit: true,
		category: "Physical",
	},
	crosschop: {
		inherit: true,
		category: "Special",
	},
	crunch: {
		inherit: true,
		desc: "Has a 20% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Sp. Def by 1.",
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
	},
	crushclaw: {
		inherit: true,
		category: "Special",
	},
	cut: {
		inherit: true,
		category: "Special",
	},
	dig: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Earthquake and Magnitude, which have doubled power when used against it, and is also unaffected by weather.",
		basePower: 60,
		category: "Special",
	},
	dive: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Surf and Whirlpool, which have doubled power when used against it, and is also unaffected by weather.",
		basePower: 60,
		category: "Physical",
	},
	dizzypunch: {
		inherit: true,
		category: "Special",
	},
	doomdesire: {
		inherit: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			const moveData = {
				name: "Doom Desire",
				basePower: 120,
				category: "Physical",
				flags: {},
				willCrit: false,
				type: '???',
			} as unknown as ActiveMove;
			const damage = this.getDamage(source, target, moveData, true);
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'doomdesire',
				source: source,
				moveData: {
					id: 'doomdesire',
					name: "Doom Desire",
					accuracy: 85,
					basePower: 0,
					damage: damage,
					category: "Physical",
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: '???',
				},
			});
			this.add('-start', source, 'Doom Desire');
			return null;
		},
		category: "Special",
	},
	doublekick: {
		inherit: true,
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		category: "Special",
	},
	doubleslap: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	doubleedge: {
		inherit: true,
		category: "Special",
	},
	dragonbreath: {
		inherit: true,
		category: "Physical",
	},
	dragonclaw: {
		inherit: true,
		category: "Physical",
	},
	dragonrage: {
		inherit: true,
		category: "Physical",
	},
	dreameater: {
		inherit: true,
		desc: "The target is unaffected by this move unless it is asleep and does not have a substitute. The user recovers 1/2 the HP lost by the target, rounded down, but not less than 1 HP.",
		category: "Physical",
	},
	drillpeck: {
		inherit: true,
		category: "Special",
	},
	dynamicpunch: {
		inherit: true,
		category: "Special",
	},
	earthquake: {
		inherit: true,
		category: "Special",
	},
	eggbomb: {
		inherit: true,
		category: "Special",
	},
	ember: {
		inherit: true,
		category: "Physical",
	},
	eruption: {
		inherit: true,
		category: "Physical",
	},
	explosion: {
		inherit: true,
		desc: "The user faints after using this move. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		category: "Special",
	},
	extrasensory: {
		inherit: true,
		desc: "Has a 10% chance to flinch the target. Damage doubles if the target has used Minimize while active.",
		basePowerCallback(pokemon, target) {
			if (target.volatiles['minimize']) return 160;
			return 80;
		},
		category: "Physical",
	},
	extremespeed: {
		inherit: true,
		category: "Special",
	},
	facade: {
		inherit: true,
		category: "Special",
	},
	fakeout: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
		category: "Special",
	},
	falseswipe: {
		inherit: true,
		category: "Special",
	},
	feintattack: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
		category: "Physical",
	},
	fireblast: {
		inherit: true,
		category: "Physical",
	},
	firepunch: {
		inherit: true,
		category: "Physical",
	},
	firespin: {
		inherit: true,
		desc: "Prevents the target from switching for two to five turns. Causes damage to the target equal to 1/16 of its maximum HP, rounded down, at the end of each turn during effect. The target can still switch out if it uses Baton Pass. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		category: "Physical",
	},
	fissure: {
		inherit: true,
		category: "Special",
	},
	flail: {
		inherit: true,
		desc: "The power of this move is 20 if X is 33 to 48, 40 if X is 17 to 32, 80 if X is 10 to 16, 100 if X is 5 to 9, 150 if X is 2 to 4, and 200 if X is 0 or 1, where X is equal to (user's current HP * 48 / user's maximum HP), rounded down.",
		category: "Special",
	},
	flamewheel: {
		inherit: true,
		category: "Physical",
	},
	flamthrower: {
		inherit: true,
		category: "Physical",
	},
	fly: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Gust, Sky Uppercut, Thunder, and Twister, and Gust and Twister have doubled power when used against it.",
		basePower: 70,
		category: "Special",
	},
	focuspunch: {
		inherit: true,
		category: "Special",
	},
	frenzyplant: {
		inherit: true,
		category: "Physical",
	},
	furyattack: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	furycutter: {
		inherit: true,
		category: "Special",
	},
	furyswipes: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	futuresight: {
		inherit: true,
		category: "Physical",
	},
	gigadrain: {
		inherit: true,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down.",
		pp: 5,
		category: "Physical",
	},
	guillotine: {
		inherit: true,
		category: "Special",
	},
	gust: {
		inherit: true,
		category: "Special",
	},
	headbutt: {
		inherit: true,
		category: "Special",
	},
	heatwave: {
		inherit: true,
		category: "Physical",
	},
	hiddenpower: {
		inherit: true,
		basePower: 0,
		basePowerCallback(pokemon) {
			return pokemon.hpPower || 70;
		},
		category: "Physical",
		onModifyMove(move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
			const specialTypes = ['Bug', 'Fighting', 'Flying', 'Ground', 'Ghost', 'Normal', 'Poison', 'Rock', 'Steel'];
			move.category = specialTypes.includes(move.type) ? 'Special' : 'Physical';
		},
	},
	highjumpkick: {
		inherit: true,
		basePower: 85,
		desc: "If this attack is not successful and the target was not immune, the user loses HP equal to half of the damage the target would have taken, rounded down, but no less than 1 HP and no more than half of the target's maximum HP, as crash damage.",
		shortDesc: "If miss, user takes 1/2 damage it would've dealt.",
		onMoveFail(target, source, move) {
			if (target.runImmunity('Fighting')) {
				const damage = this.getDamage(source, target, move, true);
				if (typeof damage !== 'number') throw new Error("HJK recoil failed");
				this.damage(this.clampIntRange(damage / 2, 1, Math.floor(target.maxhp / 2)), source, source, move);
			}
		},
		category: "Special",
	},
	hornattack: {
		inherit: true,
		category: "Special",
	},
	horndrill: {
		inherit: true,
		category: "Special",
	},
	hydrocannon: {
		inherit: true,
		category: "Physical",
	},
	hydropump: {
		inherit: true,
		category: "Physical",
	},
	hyperbeam: {
		inherit: true,
		category: "Special",
	},
	hyperfang: {
		inherit: true,
		category: "Special",
	},
	hypervoice: {
		inherit: true,
		category: "Special",
	},
	iceball: {
		inherit: true,
		category: "Physical",
	},
	icebeam: {
		inherit: true,
		category: "Physical",
	},
	icepunch: {
		inherit: true,
		category: "Physical",
	},
	iciclespear: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Physical",
	},
	icywind: {
		inherit: true,
		category: "Physical",
	},
	irontail: {
		inherit: true,
		category: "Special",
	},
	jumpkick: {
		inherit: true,
		basePower: 70,
		desc: "If this attack is not successful and the target was not immune, the user loses HP equal to half of the damage the target would have taken, rounded down, but no less than 1 HP and no more than half of the target's maximum HP, as crash damage.",
		shortDesc: "If miss, user takes 1/2 damage it would've dealt.",
		onMoveFail(target, source, move) {
			if (target.runImmunity('Fighting')) {
				const damage = this.getDamage(source, target, move, true);
				if (typeof damage !== 'number') throw new Error("Jump Kick didn't recoil");
				this.damage(this.clampIntRange(damage / 2, 1, Math.floor(target.maxhp / 2)), source, source, move);
			}
		},
		category: "Special",
	},
	karatechop: {
		inherit: true,
		category: "Special",
	},
	knockoff: {
		inherit: true,
		desc: "The target's held item is lost for the rest of the battle, unless it has the Sticky Hold Ability. During the effect, the target cannot gain a new item by any means.",
		category: "Physical",
	},
	leafblade: {
		inherit: true,
		basePower: 70,
		category: "Physical",
	},
	leechlife: {
		inherit: true,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down.",
		category: "Special",
	},
	leechseed: {
		inherit: true,
		desc: "The Pokemon at the user's position steals 1/8 of the target's maximum HP, rounded down, at the end of each turn. If the target uses Baton Pass, the replacement will continue being leeched. If the target switches out or uses Rapid Spin, the effect ends. Grass-type Pokemon are immune to this move on use, but not its effect.",
	},
	lick: {
		inherit: true,
		category: "Special",
	},
	lowkick: {
		inherit: true,
		category: "Special",
	},
	lusterpurge: {
		inherit: true,
		category: "Physical",
	},
	machpunch: {
		inherit: true,
		category: "Special",
	},
	magicalleaf: {
		inherit: true,
		category: "Physical",
	},
	magnitude: {
		inherit: true,
		category: "Special",
	},
	megadrain: {
		inherit: true,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down.",
		pp: 10,
		category: "Physical",
	},
	megakick: {
		inherit: true,
		category: "Special",
	},
	megapunch: {
		inherit: true,
		category: "Special",
	},
	megahorn: {
		inherit: true,
		category: "Special",
	},
	metalclaw: {
		inherit: true,
		category: "Special",
	},
	meteormash: {
		inherit: true,
		category: "Special",
	},
	mirrorcoat: {
		inherit: true,
		desc: "Deals damage to the last opposing Pokemon to hit the user with a special attack this turn equal to twice the HP lost by the user from that attack. If that opposing Pokemon's position is no longer in use and there is another opposing Pokemon on the field, the damage is done to it instead. This move considers Hidden Power as Normal type, and only the last hit of a multi-hit attack is counted. Fails if the user was not hit by an opposing Pokemon's special attack this turn, or if the user did not lose HP from the attack.",
		effect: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectData.position = null;
				this.effectData.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, effect) {
				if (effect.effectType === 'Move' && source.side !== target.side && this.getCategory(effect.id) === 'Special') {
					this.effectData.position = source.position;
					this.effectData.damage = 2 * damage;
				}
			},
		},
	},
	mistball: {
		inherit: true,
		category: "Physical",
	},
	mudshot: {
		inherit: true,
		category: "Special",
	},
	mudslap: {
		inherit: true,
		category: "Special",
	},
	muddywater: {
		inherit: true,
		category: "Physical",
	},
	naturepower: {
		inherit: true,
		accuracy: true,
		desc: "This move calls another move for use depending on the battle terrain. Swift in Wi-Fi battles.",
		shortDesc: "Attack changes based on terrain. (Swift)",
		onHit(target) {
			this.useMove('swift', target);
		},
	},
	needlearm: {
		inherit: true,
		desc: "Has a 30% chance to flinch the target. Damage doubles if the target has used Minimize while active.",
		basePowerCallback(pokemon, target) {
			if (target.volatiles['minimize']) return 120;
			return 60;
		},
		category: "Physical",
	},
	nightshade: {
		inherit: true,
		category: "Special",
	},
	octazooka: {
		inherit: true,
		category: "Physical",
	},
	outrage: {
		inherit: true,
		desc: "The user spends two or three turns locked into this move and becomes confused at the end of the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, falls asleep, becomes frozen, or the attack is not successful against the target, the effect ends without causing confusion. If this move is called by Sleep Talk, the move is used for one turn and does not confuse the user.",
		basePower: 90,
		category: "Physical",
	},
	overheat: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
		category: "Physical",
	},
	payday: {
		inherit: true,
		category: "Special",
	},
	peck: {
		inherit: true,
		category: "Special",
	},
	petaldance: {
		inherit: true,
		desc: "The user spends two or three turns locked into this move and becomes confused at the end of the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, falls asleep, becomes frozen, or the attack is not successful against the target, the effect ends without causing confusion. If this move is called by Sleep Talk, the move is used for one turn and does not confuse the user.",
		basePower: 70,
		category: "Physical",
	},
	pinmissile: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	poisonfang: {
		inherit: true,
		category: "Special",
	},
	poisonsting: {
		inherit: true,
		category: "Special",
	},
	poisontail: {
		inherit: true,
		category: "Special",
	},
	pound: {
		inherit: true,
		category: "Special",
	},
	powdersnow: {
		inherit: true,
		category: "Physical",
	},
	present: {
		inherit: true,
		category: "Special",
	},
	psybeam: {
		inherit: true,
		category: "Physical",
	},
	psychic: {
		inherit: true,
		category: "Physical",
	},
	psychoboost: {
		inherit: true,
		category: "Physical",
	},
	psywave: {
		inherit: true,
		category: "Physical",
	},
	pursuit: {
		inherit: true,
		desc: "If the target is an opposing Pokemon and it switches out this turn, this move hits that Pokemon before it leaves the field. Power doubles and no accuracy check is done if the user hits an opponent switching out, and the user's turn is over; if an opponent faints from this, the replacement Pokemon becomes active immediately.",
		shortDesc: "Power doubles if the targeted foe is switching out.",
		category: "Physical",
	},
	quickattack: {
		inherit: true,
		category: "Special",
	},
	rage: {
		inherit: true,
		desc: "Once this move is used and unless the target protected itself, the user's Attack is raised by 1 stage every time it is hit by another Pokemon's attack as long as this move is chosen for use.",
		category: "Special",
	},
	rapidspin: {
		inherit: true,
		desc: "If this move is successful, the effects of Leech Seed and binding moves end for the user, and Spikes are removed from the user's side of the field.",
		category: "Special",
	},
	razorleaf: {
		inherit: true,
		category: "Physical",
	},
	razorwind: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second.",
		shortDesc: "Charges, then hits foe(s) turn 2.",
		category: "Special",
	},
	return: {
		inherit: true,
		category: "Special",
	},
	revenge: {
		inherit: true,
		desc: "Damage doubles if the user was hit by a Pokemon in the target's current position this turn, and that Pokemon was the last to hit the user.",
		shortDesc: "Damage doubles if user is hit by the target.",
		category: "Special",
	},
	reversal: {
		inherit: true,
		desc: "The power of this move is 20 if X is 33 to 48, 40 if X is 17 to 32, 80 if X is 10 to 16, 100 if X is 5 to 9, 150 if X is 2 to 4, and 200 if X is 0 or 1, where X is equal to (user's current HP * 48 / user's maximum HP), rounded down.",
		category: "Special",
	},
	rockblast: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	rockslide: {
		inherit: true,
		category: "Special",
	},
	rocksmash: {
		inherit: true,
		basePower: 20,
		category: "Special",
	},
	rockthrow: {
		inherit: true,
		category: "Special",
	},
	rollingkick: {
		inherit: true,
		category: "Special",
	},
	rollout: {
		inherit: true,
		category: "Special",
	},
	sacredfire: {
		inherit: true,
		category: "Physical",
	},
	sandtomb: {
		inherit: true,
		desc: "Prevents the target from switching for two to five turns. Causes damage to the target equal to 1/16 of its maximum HP, rounded down, at the end of each turn during effect. The target can still switch out if it uses Baton Pass. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		category: "Special",
	},
	scratch: {
		inherit: true,
		category: "Special",
	},
	secretpower: {
		inherit: true,
		category: "Special",
	},
	seismictoss: {
		inherit: true,
		category: "Special",
	},
	selfdestruct: {
		inherit: true,
		desc: "The user faints after using this move. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		category: "Special",
	},
	shadowball: {
		inherit: true,
		category: "Special",
	},
	shadowpunch: {
		inherit: true,
		category: "Special",
	},
	sheercold: {
		inherit: true,
		category: "Physical",
	},
	shockwave: {
		inherit: true,
		category: "Physical",
	},
	signalbeam: {
		inherit: true,
		category: "Special",
	},
	silverwind: {
		inherit: true,
		category: "Special",
	},
	skullbash: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second. Raises the user's Defense by 1 stage on the first turn.",
		category: "Special",
	},
	skyattack: {
		inherit: true,
		desc: "Has a 30% chance to flinch the target and a higher chance for a critical hit. This attack charges on the first turn and executes on the second.",
		category: "Special",
	},
	skyuppercut: {
		inherit: true,
		category: "Special",
	},
	slam: {
		inherit: true,
		category: "Special",
	},
	slash: {
		inherit: true,
		category: "Special",
	},
	sludge: {
		inherit: true,
		category: "Special",
	},
	sludgebomb: {
		inherit: true,
		category: "Special",
	},
	smellingsalts: {
		inherit: true,
		desc: "Damage doubles if the target is paralyzed. If this move is successful, the target is cured of paralysis.",
		shortDesc: "Damage doubles if target is paralyzed; cures it.",
		category: "Special",
	},
	smog: {
		inherit: true,
		category: "Special",
	},
	snore: {
		inherit: true,
		category: "Special",
	},
	solarbeam: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second. Damage is halved if the weather is Hail, Rain Dance, or Sandstorm. If the weather is Sunny Day, the move completes in one turn.",
		category: "Physical",
	},
	sonicboom: {
		inherit: true,
		category: "Special",
	},
	spark: {
		inherit: true,
		category: "Physical",
	},
	spikecannon: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	spitup: {
		inherit: true,
		category: "Special",
	},
	steelwing: {
		inherit: true,
		category: "Special",
	},
	stomp: {
		inherit: true,
		desc: "Has a 30% chance to flinch the target. Damage doubles if the target has used Minimize while active.",
		category: "Special",
	},
	strength: {
		inherit: true,
		category: "Special",
	},
	struggle: {
		inherit: true,
		accuracy: 100,
		desc: "Deals typeless damage to a random opposing Pokemon. If this move was successful, the user takes damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP, and the Rock Head Ability does not prevent this. This move is automatically used if none of the user's known moves can be selected.",
		shortDesc: "User loses 1/4 the HP lost by the target.",
		recoil: [1, 4],
		struggleRecoil: false,
		category: "Special",
	},
	submission: {
		inherit: true,
		category: "Special",
	},
	superfang: {
		inherit: true,
		category: "Special",
	},
	superpower: {
		inherit: true,
		category: "Special",
	},
	surf: {
		inherit: true,
		shortDesc: "Hits foes. Power doubles against Dive.",
		target: "allAdjacentFoes",
	},
	swift: {
		inherit: true,
		category: "Special",
	},
	tackle: {
		inherit: true,
		category: "Special",
	},
	takedown: {
		inherit: true,
		category: "Special",
	},
	thief: {
		inherit: true,
		desc: "If this attack was successful and the user has not fainted, it steals the target's held item if the user is not holding one. The target's item is not stolen if it is a Mail or Enigma Berry. Items lost to this move cannot be regained with Recycle.",
		category: "Physical",
	},
	thrash: {
		inherit: true,
		desc: "The user spends two or three turns locked into this move and becomes confused at the end of the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, falls asleep, becomes frozen, or the attack is not successful against the target, the effect ends without causing confusion. If this move is called by Sleep Talk, the move is used for one turn and does not confuse the user.",
		category: "Special",
	},
	thunder: {
		inherit: true,
		category: "Physical",
	},
	thunderpunch: {
		inherit: true,
		category: "Physical",
	},
	thundershock: {
		inherit: true,
		category: "Physical",
	},
	thunderbolt: {
		inherit: true,
		category: "Physical",
	},
	triattack: {
		inherit: true,
		category: "Special",
	},
	triplekick: {
		inherit: true,
		desc: "Hits three times. Power increases to 20 for the second hit and 30 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		category: "Special",
	},
	twineedle: {
		inherit: true,
		desc: "Hits twice, with each hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		category: "Special",
	},
	twister: {
		inherit: true,
		category: "Physical",
	},
	uproar: {
		inherit: true,
		desc: "The user spends three to five turns locked into this move. This move targets an opposing Pokemon at random on each turn. During effect, no active Pokemon can fall asleep by any means, and Pokemon that are already asleep wake up as their turn starts or at the end of each turn, including the last one. If the user is prevented from moving or the attack is not successful against the target during one of the turns, the effect ends.",
		shortDesc: "Lasts 3-5 turns. Active Pokemon cannot sleep.",
		category: "Special",
	},
	vicegrip: {
		inherit: true,
		category: "Special",
	},
	vinewhip: {
		inherit: true,
		pp: 10,
		category: "Physical",
	},
	vitalthrow: {
		inherit: true,
		category: "Special",
	},
	volttackle: {
		inherit: true,
		desc: "If the target lost HP, the user takes recoil damage equal to 1/3 the HP lost by the target, rounded down, but not less than 1 HP.",
		shortDesc: "Has 1/3 recoil.",
		secondary: null,
		category: "Physical",
	},
	watergun: {
		inherit: true,
		category: "Physical",
	},
	waterpulse: {
		inherit: true,
		category: "Physical",
	},
	waterspout: {
		inherit: true,
		category: "Physical",
	},
	waterfall: {
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		secondary: null,
	},
	weatherball: {
		inherit: true,
		desc: "Damage doubles if a weather condition is active, and this move's type changes to match. Ice type during Hail, Water type during Rain Dance, Rock type during Sandstorm, and Fire type during Sunny Day.",
		shortDesc: "Damage doubles and type varies during weather.",
		onModifyMove(move) {
			switch (this.field.effectiveWeather()) {
			case 'sunnyday':
				move.type = 'Fire';
				move.category = 'Special';
				break;
			case 'raindance':
				move.type = 'Water';
				move.category = 'Special';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
				move.type = 'Ice';
				move.category = 'Special';
				break;
			}
		},
		category: "Special",
	},
	whirlpool: {
		inherit: true,
		desc: "Prevents the target from switching for two to five turns. Causes damage to the target equal to 1/16 of its maximum HP, rounded down, at the end of each turn during effect. The target can still switch out if it uses Baton Pass. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		category: "Physical",
	},
	wingattack: {
		inherit: true,
		category: "Special",
	},
	wrap: {
		inherit: true,
		desc: "Prevents the target from switching for two to five turns. Causes damage to the target equal to 1/16 of its maximum HP, rounded down, at the end of each turn during effect. The target can still switch out if it uses Baton Pass. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		category: "Special",
	},
	zapcannon: {
		inherit: true,
		basePower: 100,
		category: "Physical",
	},
};
