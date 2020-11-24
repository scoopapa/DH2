export const Moves: {[k: string]: ModdedMoveData} = {
	"thunder": {
		num: 87,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		desc: "Has a 30% chance to paralyze the target. This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If the weather is Primordial Sea or Rain Dance, this move does not check accuracy. If the weather is Desolate Land or Sunny Day, this move's accuracy is 50%.",
		shortDesc: "30% chance to paralyze. Can't miss in rain.",
		id: "thunder",
		isViable: true,
		name: "Thunder",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source) {
			for (const target of this.getAllActive()) {
				if (!target.hasAbility('scarlettemperament')) continue;
        //Ignore rain/temperature manipulation accuracy buff if it's an enemy. Otherwise, ignore sun accuracy drop
				if ((target.side === source.side && !source.hasAbility('temperaturemanipulation') && this.field.isWeather(['sunnyday', 'desolateland']))
           || (target.side !== source.side && (this.field.isWeather(['raindance', 'primordialsea']) || 
            (this.field.isWeather(['sunnyday', 'desolateland']) && source.hasAbility('temperaturemanipulation'))))){
          return;
        }
			}
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = true;
			} else if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 50;
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 185,
		contestType: "Cool",
	},
	"hurricane": {
		num: 542,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		desc: "Has a 30% chance to confuse the target. This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If the weather is Primordial Sea or Rain Dance, this move does not check accuracy. If the weather is Desolate Land or Sunny Day, this move's accuracy is 50%.",
		shortDesc: "30% chance to confuse target. Can't miss in rain.",
		id: "hurricane",
		isViable: true,
		name: "Hurricane",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onModifyMove(move, source) {
			for (const target of this.getAllActive()) {
				if (!target.hasAbility('scarlettemperament')) continue;
        //Ignore rain/temperature manipulation accuracy buff if it's an enemy. Otherwise, ignore sun accuracy drop
				if ((target.side === source.side && !source.hasAbility('temperaturemanipulation') && this.field.isWeather(['sunnyday', 'desolateland']))
           || (target.side !== source.side && (this.field.isWeather(['raindance', 'primordialsea']) || 
            (this.field.isWeather(['sunnyday', 'desolateland']) && source.hasAbility('temperaturemanipulation'))))){
          return;
        }
			}
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = true;
			} else if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 50;
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Flying",
		zMovePower: 185,
		contestType: "Tough",
	},
  //Slashing moves
	"nightslash": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"sacredsword": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"crosspoison": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"xscissor": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"furycutter": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"leafblade": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"falseswipe": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"solarblade": {
		inherit: true,
		flags: {charge: 1, contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"cut": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"slash": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
	},
	"razorwind": {
		inherit: true,
		flags: {charge: 1, protect: 1, mirror: 1, slash: 1},
	},
	"secretsword": {
		inherit: true,
		flags: {protect: 1, mirror: 1, slash: 1},
	},
	"airslash": {
		inherit: true,
		flags: {protect: 1, mirror: 1, distance: 1, slash: 1},
	},
	"psychocut": {
		inherit: true,
		flags: {protect: 1, mirror: 1, slash: 1},
	},
 //Light moves
	"dazzlinggleam": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"flashcannon": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"lightofruin": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"seedflare": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"aurorabeam": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"lusterpurge": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"mirrorshot": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"prismaticlaser": {
		inherit: true,
		flags: {recharge: 1, protect: 1, mirror: 1, light: 1},
	},
	"moongeistbeam": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"searingsunrazesmash": {
		inherit: true,
		flags: {contact: 1, light: 1},
	},
	"menacingmoonrazemaelstrom": {
		inherit: true,
		flags: {light: 1},
	},
	"doomdesire": {
		inherit: true,
		flags: {light: 1},
	},
	"technoblast": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"powergem": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	"signalbeam": {
		inherit: true,
		flags: {protect: 1, mirror: 1, light: 1},
	},
	
    "fireball": {
        num: 40001,
        accuracy: 100,
        basePower: 85,
        category: "Physical",
        desc: "Has a 10% chance to burn the target. The target thaws out if it is frozen.",
        shortDesc: "10% chance to burn the target. Thaws target.",
        id: "fireball",
        isViable: true,
        name: "Fireball",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1, defrost: 1},
        thawsTarget: true,
        secondary: {
            chance: 10,
            status: 'brn',
        },
        target: "normal",
        type: "Fire",
        zMovePower: 160,
    },
    "chargeshot": {
        num: 40002,
        accuracy: 100,
        basePower: 95,
        category: "Special",
        desc: "No secondary effect.",
        shortDesc: "No secondary effect.",
        id: "chargeshot",
        isViable: true,
        name: "Charge Shot",
        pp: 10,
        priority: 0,
        flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
        secondary: false,
        target: "any",
        type: "Electric",
        zMovePower: 175,
     },
		"monadopurge": {
			num: 40003,
			accuracy: 100,
			basePower: 80,
			category: "Special",
			desc: "The target's Ability is rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the target's Ability is Battle Bond, Comatose, Disguise, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, or Zen Mode, this effect does not happen, and receiving the effect through Baton Pass ends the effect immediately.",
			shortDesc: "Nullifies the target's Ability. Damages user for 25% of HP if not Shulk or Chibiterasu.",
			id: "monadopurge",
			name: "Monado Purge",
			pp: 15,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			mindBlownRecoil: true,
			onAfterMove(pokemon, target, move) {
				if (['Shulk', 'Chibiterasu'].includes(pokemon.template.species)){
					 move.mindBlownRecoil = false;
				} else if (move.mindBlownRecoil && !move.multihit) {
					this.damage(Math.round(pokemon.maxhp / 4), pokemon, pokemon, this.getEffect('Monado Purge'), true);
				}
			},
			volatileStatus: 'gastroacid',
			secondary: null,
			target: "normal",
			type: "Psychic",
			zMovePower: 160,
		},
		"monadoeater": {
			num: 40004,
			accuracy: 100,
			basePower: 20,
			basePowerCallback(pokemon, target) {
				let power = 20 + 20 * target.positiveBoosts();
				if (power > 200) power = 200;
				return power;
			},
			category: "Physical",
			desc: "Power is equal to 20+(X*20), where X is the target's total stat stage changes that are greater than 0, but not more than 200 power. Resets all of the target's stat stages to 0.",
			shortDesc: "20 power +20 for each of the target's stat boosts. Resets all of the target's stat stages to 0. Damages user for 25% of HP if not Shulk or Chibiterasu.",
			id: "monadoeater",
			name: "Monado Eater",
			pp: 5,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			mindBlownRecoil: true,
			onHit(target) {
        let nullified = false;
			  for (const statName in target.boosts) {
				  // @ts-ignore
				  const stage = target.boosts[statName];
				  if (stage > 0) {
				  	target.boosts[statName] = 0;
            nullified = true;
				  }
			  }
				if (nullified) this.add('-clearpositiveboost', target);
			},
			onAfterMove(pokemon, target, move) {
				if (['Shulk', 'Chibiterasu'].includes(pokemon.template.species)){
					 move.mindBlownRecoil = false;
				} else if (move.mindBlownRecoil && !move.multihit) {
					this.damage(Math.round(pokemon.maxhp / 4), pokemon, pokemon, this.getEffect('Monado Eater'), true);
				}
			},
			secondary: null,
			target: "normal",
			type: "Fighting",
			zMovePower: 120,
		},
		"monadobuster": {
			num: 40005,
			accuracy: true,
			basePower: 200,
			category: "Physical",
			desc: "This move becomes a special attack if the target's Defense is greater than its Special Defense, including stat stage changes.",
			shortDesc: "Special if target's Def > Sp. Def.",
			id: "monadobuster",
			name: "Monado Buster",
			pp: 1,
			priority: 0,
			flags: {contact: 1, slash: 1},
			onModifyMove(move, pokemon, target) {
				if (target.getStat('def', false, true) > target.getStat('spd', false, true)) move.category = 'Special';	
			},
			isZ: "shulkiumz",
			secondary: null,
			target: "normal",
			type: "Fighting",
			contestType: "Cool",
		},
		"deploymissiles": {
			num: 40006,
			accuracy: 90,
			basePower: 25,
			category: "Physical",
			desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
			shortDesc: "Hits 2-5 times in one turn.",
			id: "deploymissiles",
			isViable: true,
			name: "Deploy Missiles",
			pp: 10,
			priority: 0,
			flags: {bullet: 1, protect: 1, mirror: 1},
			multihit: [2, 5],
			secondary: null,
			target: "normal",
			type: "Steel",
			zMovePower: 140,
			contestType: "Tough",
		},
		"starspit": {
			num: 40007,
			accuracy: 100,
			basePower: 80,
			basePowerCallback(pokemon, target, move) {
				if (target.newlySwitched || this.willMove(target)) {
					this.debug('Payback NOT boosted');
					return move.basePower;
				}
				this.debug('Payback damage boost');
				return move.basePower * 1.5;
			},
			category: "Physical",
			desc: "Power multiplies by 1.5 if the user moves after the target this turn, including actions taken through Instruct or the Dancer Ability. Switching in does not count as an action. This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
			shortDesc: "Power multiplies by 1.5 if the user moves after the target. Physical if user's Atk > Sp. Atk.",
			id: "starspit",
			name: "Star Spit",
			pp: 15,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			onModifyMove(move, pokemon) {
				if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
			},
			secondary: null,
			target: "normal",
			type: "Flying",
			zMovePower: 160,
			contestType: "Cute",
		},
	"jambaspear": {
		num: 40008,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
		id: "jambaspear",
		isViable: true,
		name: "Jamba Spear",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 175,
		contestType: "Cool",
	},
	"devilsknife": {
		num: 40009,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		id: "devilsknife",
		isViable: true,
		name: "Devilsknife",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "Dark",
		zMovePower: 190,
		contestType: "Cool",
	},
	"dashslash": {
		num: 40010,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		id: "dashslash",
		isViable: true,
		name: "Dash Slash",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 140,
		contestType: "Cool",
	},
	"assassinate": {
		num: 40011,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Ignores the target's stat stage changes, including evasiveness.",
		shortDesc: "Ignores the target's stat stage changes.",
		id: "assassinate",
		isViable: true,
		name: "Assassinate",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 175,
		contestType: "Tough",
	},
	"etherealroller": {
		num: 40012,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "30% chance to flinch the target.",
		id: "etherealroller",
		isViable: true,
		name: "Ethereal Roller",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ghost",
		zMovePower: 160,
		contestType: "Cool",
	},
	"minimize": {
		num: 107,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's evasiveness by 2 stages. Whether or not the user's evasiveness was changed, Body Slam, Dragon Rush, Ethereal Roller, Flying Press, Heat Crash, Heavy Slam, Malicious Moonsault, Steamroller, and Stomp will not check accuracy and have their damage doubled if used against the user while it is active.",
		shortDesc: "Raises the user's evasiveness by 2.",
		id: "minimize",
		name: "Minimize",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'minimize',
		effect: {
			noCopy: true,
			onSourceModifyDamage(damage, source, target, move) {
				if (['stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'etherealroller'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
			onAccuracy(accuracy, target, source, move) {
				if (['stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'etherealroller'].includes(move.id)) {
					return true;
				}
				return accuracy;
			},
		},
		boosts: {
			evasion: 2,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"purry": {
		num: 40013,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (!pokemon.volatiles['purry']) return 0;
			return pokemon.volatiles['purry'].damage || 1;
		},
		category: "Physical",
		desc: "Deals damage to the last opposing Pokemon to hit the user with an attack this turn equal to 1.5 times the HP lost by the user from that attack, rounded down. If the user did not lose HP from the attack, this move deals 1 HP of damage instead. If that opposing Pokemon's position is no longer in use and there is another opposing Pokemon on the field, the damage is done to it instead. Only the last hit of a multi-hit attack is counted. Fails if the user was not hit by an opposing Pokemon's attack this turn.",
		shortDesc: "If hit by an attack, returns 1.5x damage.",
		id: "purry",
		name: "Purry",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('purry');
		},
		onTryHit(target, source, move) {
			if (!source.volatiles['purry']) return false;
			if (source.volatiles['purry'].position === null) return false;
		},
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
			onAfterDamage(damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && source.side !== target.side) {
					this.effectData.position = source.position;
					this.effectData.damage = 1.5 * damage;
				}
			},
		},
		secondary: null,
		target: "scripted",
		type: "Normal",
		ignoreImmunity: true,
		zMovePower: 100,
		contestType: "Cute",
	},
	"crystalspin": {
		num: 40014,
		accuracy: true,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 10 * (move.hit + 1);
		},
		category: "Physical",
		desc: "Hits three times. Power increases to 30 for the second hit and 40 for the third. This move does not check accuracy. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		shortDesc: "Hits 3 times. Power rises for each hit. This move does not check accuracy.",
		id: "crystalspin",
		name: "Crystal Spin",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Ice",
		zMovePower: 120,
		contestType: "Cool",
	},
	"angelicflare": {
		num: 40015,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "angelicflare",
		isViable: true,
		name: "Angelic Flare",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"reanimate": {
		num: 40016,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up. The user cures its burn, poison, or paralysis. Fails if the user is not burned, poisoned, or paralyzed.",
		shortDesc: "Heals the user by 50% of its max HP. User cures its burn, poison, or paralysis.",
		id: "reanimate",
		isViable: true,
		name: "Reanimate",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp && ['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Ghost",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"greatslash": {
		num: 40017,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Lowers the user's Defense and Speed by 1 stage.",
		shortDesc: "Lowers the user's Defense and Speed by 1.",
		id: "greatslash",
		isViable: true,
		name: "Great Slash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
		selfBoost: {
			boosts: {
				def: -1,
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 190,
		contestType: "Tough",
	},
	"fujiwaravolcano": {
		num: 40018,
		accuracy: 80,
		basePower: 150,
		category: "Physical",
		desc: "Has a 30% chance to burn the target. If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/2 recoil. 30% chance to burn.",
		id: "fujiwaravolcano",
		isViable: true,
		name: "Fujiwara Volcano",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		recoil: [1, 2],
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		zMovePower: 200,
		contestType: "Tough",
	},
	"iceklone": {
		num: 40019,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon making contact with the user lose 1/16 of their maximum HP, rounded down, and have their Speed lowered by 1 stage. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from moves. Contact: loses 1/16 max HP, lowers Spe by 1.",
		id: "iceklone",
		isViable: true,
		name: "Ice Klone",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'iceklone',
		onTryHit(target, source, move) {
			return !!this.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					this.damage(source.maxhp / 16, source, target);
					this.boost({spe: -1}, source, target, this.getActiveMove("Ice Klone"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZPowered && move.flags['contact']) {
					this.damage(source.maxhp / 16, source, target);
					this.boost({spe: -1}, source, target, this.getActiveMove("Ice Klone"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMoveBoost: {def: 1},
		contestType: "Cool",
	},
	"heartache": {
		num: 40020,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		desc: "Accuracy is equal to (target's current HP * 100% / target's maximum HP), rounded half down.",
		shortDesc: "Less accuracy as target's HP decreases.",
		id: "heartache",
		isViable: true,
		name: "Heartache",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			move.accuracy = Math.floor(Math.floor((move.accuracy * (100 * Math.floor(target.hp * 4096 / target.maxhp)) + 2048 - 1) / 4096) / 100);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 200,
		contestType: "Beautiful",
	},
    "liarshot": {
        num: 40021,
        accuracy: 100,
        basePower: 80,
        category: "Physical",
        desc: "Has a 30% chance to flinch the target.",
        shortDesc: "30% chance to flinch the target.",
        id: "liarshot",
        isViable: true,
        name: "Liar Shot",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        secondary: {
            chance: 30,
            volatileStatus: 'flinch',
        },
        target: "normal",
        type: "Dark",
        zMovePower: 160,
    },
    "thorntrap": {
        num: 40022,
        accuracy: 95,
        basePower: 35,
        category: "Physical",
        desc: "Prevents the target from switching for four or five turns; seven turns if the user is holding Grip Claw. Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute. This effect is not stackable or reset by using this or another partial-trapping move.",
        shortDesc: "Traps and damages the target for 4-5 turns.",
        id: "thorntrap",
        name: "Thorn Trap",
        pp: 20,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        volatileStatus: 'partiallytrapped',
        secondary: false,
        target: "normal",
        type: "Grass",
        zMovePower: 100,
    },
	"blackholebomb": {
      num: 40023,
		accuracy: 95,
		basePower: 90,
		category: "Special",
		desc: "The user recovers 1/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 25% of the damage dealt.",
		id: "blackholebomb",
		isViable: true,
		name: "Black Hole Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 4],
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 175,
		contestType: "Clever",
	},
	"electrohammer": {
		num: 40024, 
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Lowers the user's Speed by 1 stage.",
		shortDesc: "Lowers the user's Speed by 1.",
		id: "electrohammer",
		isViable: true,
		name: "Electro Hammer",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMovePower: 180,
		contestType: "Tough",
	},
	"dededehammerthrow": {
		num: 40025, 
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn the target.",
		id: "dededehammerthrow",
		isViable: true,
		name: "Dedede Hammer Throw",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Flying",
		zMovePower: 180,
		contestType: "Tough",
	},
	"battlerifle": {
		num: 40026, 
		accuracy: 100,
		basePower: 35,
		category: "Special",
		defensiveCategory: "Physical",
		desc: "Hits three times. Deals damage to the target based on its Defense instead of Special Defense.",
		shortDesc: "Hits 3 times. Damages target based on Defense, not Sp. Def.",
		id: "battlerifle",
		isViable: true,
		name: "Battle Rifle",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 100,
},
	"cycloneslash": {
		num: 40026,
		accuracy: 90,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. User becomes immune to Ground for 1 turn.",
		shortDesc: "Hits 2-5 times in one turn. User becomes immune to Ground for 1 turn.",
		id: "cycloneslash",
		isViable: true,
		name: "Cyclone Slash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
		multihit: [2, 5],
		volatileStatus: 'cycloneslash',
		effect: {
			duration: 1,
			onStart(target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Cyclone Slash');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onResidual(pokemon) {
				if (!pokemon.hp) return;
				pokemon.removeVolatile('cycloneslash');
			},
			onEnd(target) {
				this.add('-end', target, 'Cyclone Slash');
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 140,
		contestType: "Cool",
	},
	"spearoflight": {
		num: 40027,
		accuracy: true,
		basePower: 150,
		category: "Special",
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always results in a critical hit.",
		id: "spearoflight",
		name: "Spear of Light",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "galeemiumz",
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	"demonicrend": {
		num: 40028,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "Has a 40% chance to lower each target's Speed by 1 stage.",
		shortDesc: "40% chance to lower each target's Speed by 1.",
		id: "demonicrend",
		isViable: true,
		name: "Demonic Rend",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, slash: 1},
		secondary: {
			chance: 40,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Dark",
		zMovePower: 185,
		contestType: "Tough",
	},
	"hammerofdarkness": {
		num: 40029,
		accuracy: true,
		basePower: 195,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		id: "hammerofdarkness",
		name: "Hammer of Darkness",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "dharkoniumz",
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	"finaldeathbloom": {
		num: 40030,
		accuracy: 90,
		basePower: 140,
		category: "Special",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/2 recoil.",
		id: "finaldeathbloom",
		isViable: true,
		name: "Final Death Bloom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isUnreleased: true,
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"katamaridash": {
		num: 40031,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "Nearly always goes first.",
		id: "katamaridash",
		isViable: true,
		name: "Katamari Dash",
		pp: 5,
		priority: 2,
		flags: {bullet: 1, contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 160,
		contestType: "Clever",
	},
	"creeperblast": {
		num: 40032,
		accuracy: 100,
		basePower: 500,
		category: "Physical",
		desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		id: "creeperblast",
		isViable: true,
		name: "Creeper Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Grass",
		zMovePower: 200,
		contestType: "Clever",
	},
	"flarecannon": {
		num: 40033,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to burn the target.",
		shortDesc: "20% chance to burn adjacent Pokemon.",
		id: "flarecannon",
		isViable: true,
		name: "Flare Cannon",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Fire",
		zMovePower: 180,
		contestType: "Tough",
	},
	"shocktherapist": {
		num: 40034,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to paralyze the target.",
		shortDesc: "20% chance to paralyze adjacent Pokemon.",
		id: "shocktherapist",
		isViable: true,
		name: "Shock Therapist",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "allAdjacentFoes",
		type: "Electric",
		zMovePower: 180,
		contestType: "Cool",
	},
	"monsterpump": {
		num: 40035,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to lower the target's Attack by 1 stage.",
		shortDesc: "20% chance to lower the foe(s) Attack by 1.",
		id: "monsterpump",
		isViable: true,
		name: "Monster Pump",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Water",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"comedybomb": {
		num: 40036,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to poison the target.",
		shortDesc: "20% chance to poison adjacent Pokemon.",
		id: "comedybomb",
		isViable: true,
		name: "Comedy Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Poison",
		zMovePower: 180,
		contestType: "Clever",
	},
	"bigbang": {
		num: 40037,
		accuracy: true,
		basePower: 175,
		category: "Special",
		desc: "Has a 50% chance to poison the target.",
		shortDesc: "50% chance to poison the target.",
		id: "bigbang",
		name: "Big Bang",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "zeromiumz",
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Electric",
		contestType: "Cool",
	},
	"tideshift": {
		num: 40038,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		id: "tideshift",
		isViable: true,
		name: "Tide Shift",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 140,
		contestType: "Cute",
	},
	"risingphoenix": {
		num: 40039,
		accuracy: 90,
		basePower: 110,
		category: "Physical",
		desc: "Has a 30% chance to burn the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to burn.",
		id: "risingphoenix",
		name: "Rising Phoenix",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		critRatio: 2,
		target: "normal",
		type: "Fire",
		zMovePower: 185,
		contestType: "Cool",
	},
	"blackhole": {
		num: 40040,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "blackhole",
		isViable: true,
		name: "Black Hole",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 180,
		contestType: "Clever",
	},
	"darkmatter": {
		num: 40041,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "darkmatter",
		isViable: true,
		name: "Dark Matter",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "foeSide",
		type: "Dark",
		zMovePower: 195,
		contestType: "Cool",
	},
	"zombieclub": {
		num: 40042,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "zombieclub",
		isViable: true,
		name: "Zombie Club",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 180,
		contestType: "Tough",
	},
	"wildlifecrossingsign": {
		num: 40043,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "wildlifecrossingsign",
		isViable: true,
		name: "Wildlife Crossing Sign",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		contestType: "Tough",
	},
	"salmonidpan": {
		num: 40044,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		desc: "Has a 30% chance to poison the target. If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target used Ingrain previously, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "30% chance to poison the target. Forces the target to switch to a random ally.",
		id: "salmonidpan",
		isViable: true,
		name: "Salmonid Pan",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		forceSwitch: true,
		target: "normal",
		type: "Steel",
		zMovePower: 120,
		contestType: "Tough",
	},
	"naturepower": {
		num: 267,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "This move calls another move for use based on the battle terrain. Tri Attack on the regular Wi-Fi terrain, Thunderbolt during Electric Terrain, Moonblast during Misty Terrain, Energy Ball during Grassy Terrain, Psychic during Psychic Terrain, and Sludge Wave during Inky Terrain.",
		shortDesc: "Attack depends on terrain (default Tri Attack).",
		id: "naturepower",
		isViable: true,
		name: "Nature Power",
		pp: 20,
		priority: 0,
		flags: {},
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
			} else if (this.field.isTerrain('inkyterrain')){
        			move = 'sludgewave';
     			}
			this.useMove(move, pokemon, target);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	"secretpower": {
		num: 290,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a 30% chance to cause a secondary effect on the target based on the battle terrain. Causes paralysis on the regular Wi-Fi terrain, causes paralysis during Electric Terrain, lowers Special Attack by 1 stage during Misty Terrain, causes sleep during Grassy Terrain, lowers Speed by 1 stage during Psychic Terrain, and causes poisoning during Inky Terrain.",
		shortDesc: "Effect varies with terrain. (30% paralysis chance)",
		id: "secretpower",
		name: "Secret Power",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else if (this.field.isTerrain('inkyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'psn',
				});
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Normal",
		zMovePower: 140,
		contestType: "Clever",
	},
	"camouflage": {
		num: 293,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user's type changes based on the battle terrain. Normal type on the regular Wi-Fi terrain, Electric type during Electric Terrain, Fairy type during Misty Terrain, Grass type during Grassy Terrain, Psychic type during Psychic Terrain, and Poison type during Inky Terrain. Fails if the user's type cannot be changed or if the user is already purely that type.",
		shortDesc: "Changes user's type by terrain (default Normal).",
		id: "camouflage",
		name: "Camouflage",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onHit(target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			} else if (this.field.isTerrain('inkyterrain')) {
				newType = 'Poison';
			}

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveBoost: {evasion: 1},
		contestType: "Clever",
	},
	"inkyterrain": {
		num: 40045,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Inky Terrain. During the effect, the power of attacks made by grounded Poison-type Pokemon is multiplied by 1.5 and other grounded Pokemon have their speed decreased by 33%. Camouflage transforms the user into an Poison type, Nature Power becomes Sludge Wave, and Secret Power has a 30% chance to cause poisoning. Fails if the current terrain is Inky Terrain.",
		shortDesc: "5 turns. Grounded: x1.5 BP on moves if Poison, else x0.667 Speed.",
		id: "inkyterrain",
		name: "Inky Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'inkyterrain',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basePower, attacker, defender, move) {
				if (attacker.hasType('Poison') && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('inky terrain boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpe(spe, pokemon) {
				if (!pokemon.hasType('Poison') && pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					return this.chainModify([0x0AAC, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Inky Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Inky Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Inky Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Poison",
		zMoveBoost: {spe: 1},
		contestType: "Clever",
	},
	"puyopop": {
		num: 40046,
		accuracy: 90,
		basePower: 10,
		basePowerCallback(pokemon, target, move) {
			return 10 * move.hit;
		},
		category: "Special",
		desc: "Hits four times. Power increases to 20 for the second hit, 30 for the third, and 40 for the fourth. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If this move hits four times, the effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit four times.",
		shortDesc: "Hits 4 times. Each hit can miss, but power rises. Fourth hit clears user side's hazards.",
		id: "puyopop",
		name: "Puyo Pop",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move) {
      if (move.hit !== 4) return;
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Puyo Pop', '[of] ' + source);
				}
			}
		},
		multihit: 4,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 180,
		contestType: "Cute",
	},
	"swordrainbeta": {
		num: 40047,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		desc: "Hits five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		shortDesc: "Hits 5 times in one turn.",
		id: "swordrainbeta",
		name: "Sword Rain Beta",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, slash: 1},
		multihit: 5,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 100,
		contestType: "Tough",
	},
	"thrustbarrage": {
		num: 40048,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits four times. This move's type depends on the user's secondary type. If the user lacks a secondary type, this move's type is the user's primary type unless it's typeless, in which case it becomes the added type from Forest's Curse or Trick-or-Treat. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. This move is typeless if the user's type is typeless alone.",
		shortDesc: "Type varies based on user's secondary type. Hits 4 times in one turn.",
		id: "thrustbarrage",
		name: "Thrust Barrage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, slash: 1},
		onModifyMove(move, pokemon) {
			let type = pokemon.types[0];
      if (pokemon.types.length >= pokemon.addedType ? 3 : 2) type = pokemon.types[1];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		multihit: 4,
		secondary: null,
		target: "normal",
		type: "Bug",
		zMovePower: 100,
		contestType: "Beautiful",
	},
	"roulette": {
		num: 40049,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			return this.sample(20, 40, 60, 90, 120);
		},
		category: "Physical",
		desc: "The power of this move varies, with equal chances of 20 power, 40 power, 60 power, 90 power, 120 power, or the move failing.",
		shortDesc: "Power varies. 1-in-6 chance to fail.",
		id: "roulette",
		name: "Roulette",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onTry(source, target) {
			if (this.randomChance(1, 6)) {
				this.add('-fail', source);
				this.attrLastMove('[still]');
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 175,
		contestType: "Tough",
	},
	"fryingpan": {
		num: 40050,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		desc: "Power doubles if the target is burned.",
		shortDesc: "Power doubles if the target is burned.",
		id: "fryingpan",
		name: "Frying Pan",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 120,
		contestType: "Tough",
	},
	"crash": {
		num: 40051,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Future Sight is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
		id: "crash",
		name: "Crash",
		pp: 5,
		priority: 0,
		flags: {bullet: 1},
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'crash',
				source: source,
				moveData: {
					id: 'crash',
					name: "Crash",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {bullet: 1},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Fire',
				},
			});
			this.add('-start', source, 'Crash');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 200,
		contestType: "Tough",
	},
	"lifesteal": {
		num: 40052,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "lifesteal",
		isViable: true,
		name: "Lifesteal",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 160,
		contestType: "Clever",
	},
	"permutation": {
		num: 40053,
		accuracy: true,
		basePower: 200,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "permutation",
		name: "Permutation",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "puyoniumz",
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	"breegullblaster": {
		num: 40054,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "This move's type becomes either Fire or Ice, depending on the user's individual value (IV) for Special Attack.",
		shortDesc: "Varies in type based on the user's Sp. Atk IV. (Ice if odd, Fire if even)",
		id: "breegullblaster",
		name: "Breegull Blaster",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (!(pokemon.set.ivs['spa'] % 2)){
      	  move.type = 'Fire';
      	} else {
      	  move.type = 'Ice';
      	}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 120,
		contestType: "Clever",
	},
	"wyverntackle": {
		num: 40055,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Has a 30% chance to badly poison the target. If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil. 30% chance to badly poison.",
		id: "wyverntackle",
		isViable: true,
		name: "Wyvern Tackle",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 190,
		contestType: "Cool",
	},
	"strike9shot": {
		num: 40056,
		accuracy: true,
		basePower: 175,
		category: "Physical",
		desc: "Has a 100% chance to badly poison the target, regardless of immunities.",
		shortDesc: "100% chance to badly poison the target, regardless of immunities.",
		id: "strike9shot",
		name: "Strike-9 Shot",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "makiniumz",
		secondary: {
			chance: 100,
			status: 'tox', //Inflicting this regardless of status immunities is under scripts.js/pokemon.
		},
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	"crystalspikes": {
		num: 40057,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "This move combines Fire in its type effectiveness against the target. Has a 20% chance to burn the target.",
		shortDesc: "Combines Fire in its type effectiveness. 20% chance to burn the target.",
		id: "crystalspikes",
		name: "Crystal Spikes",
		pp: 10,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.getEffectiveness('Fire', type);
		},
		priority: 0,
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 170,
		contestType: "Beautiful",
	},
	"starbarrage": {
		num: 40058,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "starbarrage",
		isViable: true,
		name: "Star Barrage",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 140,
		contestType: "Cool",
	},
	"aerosol": {
		num: 40059,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Has a 30% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "Damages target based on Sp. Def, not Defense. 30% chance to lower the target's Sp. Def by 1.",
		id: "aerosol",
		isViable: true,
		name: "Aerosol",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Poison",
		zMovePower: 175,
		contestType: "Clever",
	},
	"leafshield": {
		num: 40060,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. Move loses 25% of its power for each 18.75% of the user's Max HP lost to attacks inbetween, and another if hit by a contact move. Attackers lose 16.7% of their Max HP when using contact moves while the move charges.",
		shortDesc: "Charges turn 1. Hits turn 2. Damage sustained by moves is halved, but weakens this move.",
		id: "leafshield",
		name: "Leaf Shield",
		pp: 15,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
      //Move fails if there are leaves no more.
      if (attacker.volatiles[move.id]){
        let b = !!attacker.volatiles[move.id].leaves;
			  if (attacker.removeVolatile(move.id)) {
          if (b) return;
			  	return false;
			  }
      }
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
				return this.chainModify(pokemon.volatiles['leafshield'].leaves*1.0 / 4.0)
		},
		//effect for user.
		effect: {
			duration: 2,
			onStart() {
				this.effectData.leaves = 4;
			},
			onDamage(damage, source, target, effect) {
				if (this.effectData.leaves && effect && effect.effectType === 'Move') {
					if (effect.flags['contact']) {
						this.damage(source.maxhp / 6, source, target);
            this.effectData.leaves--;
					}
					this.effectData.leaves -= Math.min(this.effectData.leaves, Math.floor(damage / 0.1875));
					return Math.floor(damage / 2);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 190,
		contestType: "Cool",
	},
	"axestrike": {
		num: 40061,
		accuracy: 70,
		basePower: 110,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch.",
		id: "axestrike",
		isViable: true,
		name: "Axe Strike",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, slash: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Physical",
		zMovePower: 185,
		contestType: "Tough",
	},
	"invisibleair": {
		num: 40062,
		accuracy: true,
		basePower: 90,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk. This move does not check accuracy.",
		id: "invisibleair",
		isViable: true,
		name: "Invisible Air",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, slash: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"magnavoluissemagnum": {
		num: 40063,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only.",
		id: "magnavoluissemagnum",
		isViable: true,
		name: "Magna Voluisse Magnum",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.activeTurns > 1) {
				this.add('-fail', pokemon);
				this.attrLastMove('[still]');
				this.hint("Magna Voluisse Magnum only works on your first turn out.");
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 175,
		contestType: "Tough",
	},
	"potionthrow": {
		num: 40064,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 10% chance to poison the target. This move's type effectiveness against Rock is changed to be super effective no matter what this move's type is.",
		shortDesc: "10% chance to poison. Super effective on Rock.",
		id: "potionthrow",
		isViable: true,
		name: "Potion Throw",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 160,
		contestType: "Clever",
	},
	"rapidsplat": {
		num: 40065,
		accuracy: 100,
		basePower: 15,
		category: "Special",
		desc: "Hits 2-5 times. If Inkling-Squid knocks out an opponent with this move, change to Inkling-Kid. If Inkling-Kid knocks out an opponent with this move, raise speed by 1 stage.",
		shortDesc: "2-5 hits. If Inkling-Squid gets KO, turn to Kid form. If Inkling-Kid gets KO, +1 Spe.",
		id: "rapidsplat",
		isViable: true,
		name: "Rapid Splat",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		onAfterMoveSecondarySelf(pokemon, target, move) {
//			I have NO idea what I'm doing here so if this works I just got lucky
			if (pokemon.template.baseSpecies !== 'Inkling') return;
			if (!target || target.fainted || target.hp <= 0){
				if (pokemon.template.species === 'Inkling') {
					pokemon.formeChange('Inkling-Kid', this.effect, false, '[msg]');
				} else {
					this.boost({spe: 1}, pokemon, pokemon, move);
				}
			}
		},
		secondary: null,
		target: "normal", 
		type: "Poison",
		zMovePower: 100,
	},
	"alterego": {
		num: 40066,
		accuracy: 90,
		basePower: 90,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field.",
		shortDesc: "Free user from hazards/bind/Leech Seed.",
		id: "alterego",
		isViable: true,
		name: "Alter Ego",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
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
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Smart",
	},
	"machtornado": {
		num: 40067,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 30% chance to lower the target's Defense by 1 stage.",
		shortDesc: "30% chance to lower the target's Defense by 1.",
		id: "machtornado",
		name: "Mach Tornado",
		pp: 15,
		priority: 0,
		flags: {slash: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	"squallhammer": {
		num: 40068,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "squallhammer",
		isViable: true,
		name: "Squall Hammer",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	"glaciergrind": {
		num: 40069,
		accuracy: true,
		basePower: 175,
		category: "Physical",
		desc: "Has a 100% chance to freeze the target.",
		shortDesc: "100% chance to freeze the target.",
		id: "glaciergrind",
		isViable: true,
		name: "Glacier Grind",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "climbiumz",
		secondary: {
			chance: 100,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	"waddlespearbarrage": {
		num: 40070,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "waddlespearbarrage",
		isViable: true,
		name: "Waddle Spear Barrage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 140,
		gmaxPower: 130,
		contestType: "Cute",
	},
	"scytheslash": {
		num: 40071,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 20% chance to inflict Perish Song on the target.",
		shortDesc: "20% chance to Perish Song the target.",
		id: "scytheslash",
		name: "Scythe Slash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'perishsong',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	"winterdragonblitz": {
		num: 40072,
		accuracy: true,
		basePower: 190,
		category: "Physical",
		desc: "Has a 30% chance to freeze the target.",
		shortDesc: "30% chance to freeze the target.",
		id: "winterdragonblitz",
		isViable: true,
		name: "Winter Dragon Blitz",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "fredrikiumz",
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	"foilflourish": {
		num: 40073,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		desc: "Has a 50% chance to raise the user's Attack by 1 stage. Has a 50% chance to raise the user's Speed by 1 stage.",
		shortDesc: "Individual 50% chances to +1 Attack or Speed.",
		id: "foilflourish",
		isViable: true,
		name: "Foil Flourish",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
		secondaries: [
			{
				chance: 50,
				self: {
					boosts: {
						atk: 1,
					},
				},
			},
	 		{
				chance: 50,
				self: {
					boosts: {
						spe: 1,
					},
				},
			},
		],
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	"particlegrenade": {
		num: 40074,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Deals damage to the target based on its Special Defense instead of Defense. Boosted by Mega Launcher, blocked by Bulletproof.",
		shortDesc: "Damages target based on Defense, not Sp. Def. Pulse + bomb.",
		id: "particlegrenade",
		isViable: true,
		name: "Particle Grenade",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1, bullet: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
	},
	"shootercutter": {
		num: 40075,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "Hits four times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		shortDesc: "Hits 4 times in one turn.",
		id: "shootercutter",
		isViable: true,
		name: "Shooter Cutter",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, slash: 1},
		multihit: 4,
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 190,
		gmaxPower: 130,
		contestType: "Cool",
	},
	"shovelbash": {
		num: 40076,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "Hits targets using Dig and stops them from using it.",
		shortDesc: "Hits targets using Dig and stops them from using it.",
		id: "shovelbash",
		isViable: true,
		name: "Shovel Bash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: null, /* dig is handled in dig */
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		effect: {
				duration: 1,
				onBeforeMovePriority: 8,
				onBeforeMove(pokemon) {
					this.add('cant', pokemon, 'Dig', 'Dig');
					return false;
				},
		}
	},
	"dig": {
		num: 91,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Earthquake and Magnitude but takes double damage from them, and is also unaffected by weather. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Digs underground turn 1, strikes turn 2.",
		id: "dig",
		name: "Dig",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, nonsky: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		effect: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['earthquake', 'magnitude', 'shovelbash'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			},
			onHit(pokemon, source, move) {
				if (move.id === 'shovelbash') {
					if (this.queue.willMove(pokemon)) {
						pokemon.addVolatile('shovelbash');
					} else {
						pokemon.removeVolatile('dig');
						pokemon.removeVolatile('twoturnmove');
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	"dustknuckle": {
		num: 40077,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "This move's type effectiveness against Flying is changed to be not very effective no matter what this move's type is.",
		shortDesc: "Hits Flying, but is not very effective.",
		id: "dustknuckle",
		isViable: true,
		name: "Dust Knuckle",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 2;
		},
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	"corruptedwing": {
		num: 40078,
		accuracy: 95,
		basePower: 100,
		category: "Special",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		id: "corruptedwing",
		isViable: true,
		name: "Corrupted Wing",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	"soulabsorption": {
		num: 40079,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. Flowey form changes into Omega Flowey if he lands a KO with this move.",
		shortDesc: "User recovers 50% of the damage dealt. On KO, Flowey -> Omega Flowey",
		id: "soulabsorption",
		isViable: true,
		name: "Soul Absorption",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		onAfterMoveSecondarySelf(pokemon, target, move) {
//			I have NO idea what I'm doing here so if this works I just got lucky
			if ((!target || target.fainted || target.hp <= 0) && pokemon.template.species === 'Flowey') {
				pokemon.formeChange('Flowey-Omega', this.effect, false, '[msg]');
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},
	"spindash": {
		num: 40080,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "This move's type effectiveness against Flying is changed to be neutral no matter what this move's type is.",
		shortDesc: "Hits Flying.",
		id: "spindash",
		isViable: true,
		name: "Spin Dash",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 0;
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	"sonicboost": {
		num: 40081,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 30% chance to raise the user's Speed by 1 stage.",
		shortDesc: "30% chance to +1  Speed.",
		id: "sonicboost",
		isViable: true,
		name: "Sonic Boost",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	"cleaningblast": {
		num: 40082,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "This move's type effectiveness against Poison is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Poison.",
		id: "cleaningblast",
		isViable: true,
		name: "Cleaning Blast",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Poison') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Smart",
	},
	"shiningdouser": {
		num: 40083,
		accuracy: true,
		basePower: 185,
		category: "Special",
		desc: "Causes the target to become a Water type unless the target is an Arceus or a Silvally, or if the target is already purely Water type.",
		shortDesc: "Changes the target's type to Water.",
		id: "shiningdouser",
		isViable: true,
		name: "Shining Douser",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "fluddiumz",
		secondary: {
			chance: 100,
			onHit(target) {
				if (target.getTypes().join() === 'Water' || !target.setType('Water')) return;
				this.add('-start', target, 'typechange', 'Water');
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	"meowtivate": {
		num: 40084,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is replaced with another Pokemon in its party. The selected Pokemon gets Attack and Special Attack boosted by one stage.",
		shortDesc: "User switches, replacement +1 Atk/SpA.",
		id: "meowtivate",
		isViable: true,
		name: "Meowtivate",
		pp: 30,
		priority: 0,
		flags: {},
		selfSwitch: true,
		sideCondition: 'meowtivate',
		effect: { /* code shamelessly swiped from Dirty Escape in Fusion Evolution */
			duration: 1,
			onStart(source) {
				let side = source.side;
				this.add('-sidestart', side, 'move: Meowtivate');
			},
			onSwitchIn(pokemon) {
				this.add('-activate', pokemon, 'move: Meowtivate');
				this.boost({
					atk: 1,
					spa: 1,
 			}, pokemon, this.effectData.positions[pokemon.position], this.getMove('meowtivate'));
			pokemon.side.removeSideCondition('meowtivate');
			},
			onEnd() {
				this.add('-sideend', 'move: Meowtivate');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'healreplacement',
		contestType: "Cute",
	},
	"flickerlick": {
		num: 40085,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		desc: "Hits 6 times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		shortDesc: "Hits 6 times in one turn.",
		id: "flickerlick",
		isViable: true,
		name: "Flicker Lick",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		multihit: 6,
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 175,
		gmaxPower: 130,
		contestType: "Cute",
	},
	"lifeender": {
		num: 40086,
		accuracy: 90,
		basePower: 150,
		category: "Physical",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
		id: "lifeender",
		name: "Life Ender",
		pp: 5,
		priority: 0,
		flags: {contact: 1, recharge: 1, slash: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Tough",
	},
	"deduction": {
		num: 40087,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's Special Attack by 1 stage. The user restores its HP equal to the target's Special Attack stat calculated with its stat stage before this move was used. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. Fails if the target's Special Attack stat stage is -6. This move does not ignore type immunity.",
		shortDesc: "User heals HP=target's SpA stat. Lowers SpA by 1.",
		id: "deduction",
		isViable: true,
		name: "Deduction",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, heal: 1},
		onHit(target, source) {
			if (target.boosts.spa === -6) return false;
			let atk = target.getStat('spa', false, true);
			let success = this.boost({spa: -1}, target, source, null, false, true);
			return !!(this.heal(atk, source, target) || success);
		},
		ignoreImmunity: false,
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"ultimatepurification": {
		num: 40088,
		accuracy: 95,
		basePower: 180,
		category: "Physical",
		desc: "Lowers the user's Speed, Defense, and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense, Sp. Def, Speed by 1.",
		id: "ultimatepurification",
		isViable: true,
		name: "Ultimate Purification",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 220,
		contestType: "Tough",
	},
	"speedslice": {
		num: 40089,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "speedslice",
		name: "Speed Slice",
		pp: 10,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, slash: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	"heartblast": {
		num: 40090,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "Hits one to three times. idk how the probabilities work. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times. 10% chance to paralyze per hit.",
		shortDesc: "Hits 1-3 times in one turn. 10% paralysis per hit.",
		id: "heartblast",
		isViable: true,
		name: "Heart Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [1, 3],
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 140,
		gmaxPower: 130,
		contestType: "Cute",
	},
	"wordofdispel": {
		num: 40091,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user cures its burn, poison, or paralysis. Fails if the user is not burned, poisoned, or paralyzed.",
		shortDesc: "User cures its burn, poison, or paralysis.",
		id: "wordofdispel",
		isViable: true,
		name: "Word of Dispel",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'heal',
		contestType: "Cute",
	},
	"ninemoons": {
		num: 40092,
		accuracy: 100,
		basePower: 12,
		category: "Physical",
		desc: "Hits nine times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		shortDesc: "Hits 9 times in one turn.",
		id: "ninemoons",
		isViable: true,
		name: "Nine Moons",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 9,
		secondary: null,
		target: "normal",
		type: "Rock",
		zMovePower: 185,
		gmaxPower: 140,
		contestType: "Beautiful",
	},
	"arrowshot": {
		num: 40093,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "arrowshot",
		name: "Arrow Shot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		tracksTarget: true,
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	"bowmanofthreestars": {
		num: 40094,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "Hits three times. If a hit breaks the target's substitute, they will take damage for the remaining hits.",
		shortDesc: "Hits 3 times in one turn.",
		id: "bowmanofthreestars",
		name: "Bowman of Three Stars",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Electic",
		zMovePower: 175,
		gmaxPower: 130,
		contestType: "Smart",
	},
	"ortygiaamoremio": {
		num: 40095,
		accuracy: true,
		basePower: 360,
		category: "Physical",
		desc: "User faints.",
		shortDesc: "User faints.",
		id: "ortygiaamoremio",
		name: "Ortygia Amore Mio",
		pp: 1,
		priority: 0,
		flags: {},
		selfdestruct: "always",
		isZ: "grandoriumz",
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	"tristaramoremio": {
		num: 40096,
		accuracy: true,
		basePower: 180,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Attack by 1 stage.",
		shortDesc: "100% chance to lower the target's Attack by 1.",
		id: "tristaramoremio",
		name: "Tri-Star Amore Mio",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "artemiumz",
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
		"mine": {
		num: 40097,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Fire type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Factors Fire weakness.",
		id: "mine",
		isViable: true,
		name: "Mine",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'mine',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Mine');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('trashcompactor')) return;
				const fireHazard = this.dex.getActiveMove('Stealth Rock');
				fireHazard.type = 'Fire';
				let typeMod = this.dex.clampIntRange(pokemon.runEffectiveness(fireHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Fire",
		zMoveBoost: {def: 1},
		contestType: "Cool",
	},
	"summonwindspirit": {
		num: 40098,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Speed by 2 stages and its accuracy by 1 stage.",
		shortDesc: "Raises the user's Speed by 2 and accuracy by 1.",
		id: "summonwindspirit",
		isViable: true,
		name: "Summon Wind Spirit",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 2,
			accuracy: 1,
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"summonearthspirit": {
		num: 40098,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack, Defense, and Special Defense by 1 stage. After using this move, the user's attacks ignore the effects of Breath of the Earth.",
		shortDesc: "Raises user's Attack, Defense, Sp. Def by 1.",
		id: "summonearthspirit",
		isViable: true,
		name: "Summon Earth Spirit",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
			def: 1,
			spd: 1,
		},
		volatileStatus: 'summonearthspirit',
		effect: {
			onStart(target, source, effect) {
				if (effect && (['imposter', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Summon Earth Spirit', '[silent]');
				} else {
					this.add('-start', target, 'move: Summon Earth Spirit');
				}
			},
			onModifyMove(move, pokemon, target) {
				if (target.hasAbility('breathoftheearth')) move.ignoreAbility = true;
			},
		},
		secondary: null,
		target: "self",
		type: "Rock",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"pandorasbox": {
		num: 40099,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, badly poisoning the next opposing Pokemon to switch in, unless it is a Flying-type Pokemon or has the Levitate Ability. Upon activation, it removes itself. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
		shortDesc: "Badly poisons one grounded foe on switch-in.",
		id: "pandorasbox",
		isViable: true,
		name: "Pandora's Box",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'pandorasbox',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Pandora\'s Box');
			},
			onRestart(side) {
				return false;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.hasType('Poison')) {
					if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('trashcompactor')) {
						return;
					} else {
						pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
					}
				}
				this.add('-sideend', pokemon.side, 'move: Pandora\'s Box', '[of] ' + pokemon);
				pokemon.side.removeSideCondition('pandorasbox');
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Dark",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"warp": {
		num: 40100,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "Lowers Def and SpD 1 stage. Detonates Carnage, causing Fire damage.",
		shortDesc: "Lowers Def and SpD 1 stage. Detonates Carnage, causing Fire damage.",
		id: "warp",
		name: "Warp",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, slash: 1},
		onHit(pokemon, source) {
			if (pokemon.hp) {
				if (pokemon.removeVolatile('carnage')){
					let abilities = ['flashfire', 'personofhourai',]
					let d = 2;
					if ( pokemon.ability === 'thickfat' || pokemon.ability === 'heatproof') d = 4; //Effectiveness for Power of Summer is already accounted for.
					if ( pokemon.ability === 'fluffy' || pokemon.ability === 'dryskin' ) d = 1;
					let typeMod = pokemon.runEffectiveness('Fire');
					if ( typeMod <= 0 && pokemon.ability === 'wonderguard' ) return;
					if (pokemon.runImmunity('Fire') && !abilities.includes( pokemon.ability )){
						this.add('-message', 'Warp detonated the Carnage effect!');
						this.add('-anim', pokemon, "Boomburst", source);
						this.damage(pokemon.maxhp * Math.pow(2, typeMod) / d);
					}
				}
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Ball", target);
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
	},
	"carnage": {
		num: 40101,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Causes residual Fire damage ( 1/8 ) for two turns.",
		shortDesc: "Causes residual Fire damage ( 1/8 ) for two turns.",
		id: "carnage",
		name: "Carnage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, slash: 1},
		volatileStatus: 'carnage',
		effect: {
			duration: 3,
			onStart(pokemon) {
				this.add('-activate', pokemon, 'Carnage');
				this.effectData.damageTurns = 0;
			},
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 8);
				this.effectData.damageTurns++;
				if ( this.effectData.damageTurns === 2 ) pokemon.removeVolatile( 'carnage' );
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pyro Ball", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	"songoftime": {
		num: 40102,
		accuracy: true,
		category: "Status",
		desc: "Two turns after being used, the pokemon currently on the field gets +1 Atk, +1 SpA, and +1 Spe.",
		shortDesc: "Two turns after being used, the pokemon currently on the field gets +1 Atk, +1 SpA, and +1 Spe.",
		id: "songoftime",
		name: "Song of Time",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!source.side.addSlotCondition(source, 'futuremove')) return false;
			Object.assign(source.side.slotConditions[source.position]['futuremove'], {
				duration: 3,
				move: 'songoftime',
				source: source,
				moveData: {
					id: 'songoftime',
					name: "Song of Time",
					accuracy: true,
					category: "Status",
					priority: 0,
					flags: {},
					ignoreImmunity: true,
					boosts: {
						atk: 1,
						spa: 1,
						spe: 1,
					},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Normal',
				},
			});
			this.add('-start', source, 'move: Song of Time');
			return null;
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMoveBoost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
		contestType: "Clever",
	},
	"lightarrow": {
		num: 40103,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Super Effective vs. Dark types.",
		shortDesc: "Super Effective vs. Dark types.",
		id: "lightarrow",
		isViable: true,
		name: "Light Arrow",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		ignoreImmunity: {'Psychic': true},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"diamondpickaxe": {
		num: 40104,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Removes entry hazards and binding moves from user's side of the field, except Sticky Web, Magma Storm, Whirlpool and Lingering Potion.",
		shortDesc: "Free user from hazards/bind/Leech Seed; not including webs/whirlpool/magma storm",
		id: "diamondpickaxe",
		isViable: true,
		name: "Diamond Pickaxe",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'gmaxsteelsurge', 'mine'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Diamond Pickaxe', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				if (['whirlpool', 'magmastorm'].includes(this.effectData.sourceEffect.id)) return;
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'gmaxsteelsurge', 'mine'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Diamond Pickaxe', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				if (['whirlpool', 'magmastorm'].includes(this.effectData.sourceEffect.id)) return;
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	"buzzsaw": {
		num: 40105,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		desc: "This move's type effectiveness against Flying is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Flying.",
		id: "buzzsaw",
		isViable: true,
		name: "Buzzsaw",
		pp: 20,
		priority: 0,
		flags: {slash: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	"canary": {
		num: 40106,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		desc: "Hits three to five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 3-5 times in one turn.",
		id: "canary",
		isViable: true,
		name: "Canary",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [3, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 140,
		gmaxPower: 130,
		contestType: "Cool",
	},
	"machinegun": {
		num: 40107,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "machinegun",
		isViable: true,
		name: "Machine Gun",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 140,
		gmaxPower: 130,
		contestType: "Cool",
	},
	"pixelgun": {
		num: 40108,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "pixelgun",
		isViable: true,
		name: "pixelgun",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Electric",
		zMovePower: 140,
		gmaxPower: 130,
		contestType: "Cool",
	},
	"points": {
		num: 40109,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "points",
		isViable: true,
		name: "points",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Electric",
		zMovePower: 140,
		gmaxPower: 130,
		contestType: "Cool",
	},
	"chisel": {
		num: 40110,
		accuracy: 95,
		basePower: 75,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "chisel",
		isViable: true,
		name: "Chisel",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	"penguin": {
		num: 40111,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "penguin",
		isViable: true,
		name: "Penguin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Cute",
	},
	"fart": {
		num: 40112,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 30% chance to poison the target.",
		shortDesc: "30% chance to poison the target.",
		id: "fart",
		isViable: true,
		name: "Fart",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	"homingmissile": {
		num: 40113,
		accuracy: true,
		basePower: 75,
		category: "Physical",
		shortDesc: "This move does not check accuracy.",
		id: "homingmissile",
		isViable: true,
		name: "Homing Missile",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	"rocket": {
		num: 40114,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "rocket",
		isViable: true,
		name: "Rocket",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	"molotov": {
		num: 40115,
		accuracy: 100,
		basePower: 135,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 100% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 100% recoil.",
		id: "flareblitz",
		isViable: true,
		name: "Flare Blitz",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		recoil: [100, 100],
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "tough",
	},
	"slap": {
		num: 40116,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "slap",
		isViable: true,
		name: "Slap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cute",
	},
	"threeway": {
		num: 40117,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits three times. If a hit breaks the target's substitute, they will take damage for the remaining hits.",
		shortDesc: "Hits 3 times in one turn.",
		id: "threeway",
		name: "threeway",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 140,
		gmaxPower: 130,
		contestType: "Smart",
	},
	"thesisofstillheart": {
		num: 40118,
		accuracy: true,
		basePower: 50,
		category: "Special",
		desc: "This move's type effectiveness is changed to be neutral no matter what this move's, or the target's, type is.",
		shortDesc: "Always neutral.",
		id: "thesisofstillheart",
		isViable: true,
		name: "Thesis of Still Heart",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onEffectiveness(typeMod, target, type) {
			return 0;
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	"hurricanetoss": {
		num: 40119,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "hurricanetoss",
		name: "Hurricane Toss",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreDefensive: true,
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 140,
		gmaxPower: 130,
		contestType: "Cool",
	},
	"suicideride": {
		num: 50001,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		id: "suicideride",
		isViable: true,
		name: "Suicide Ride",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 190,
		contestType: "Tough",
	},
	"shockingfinale": {
		num: 50002,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move. Hits all active Pokémon, including the user.",
		shortDesc: "User cannot move next turn. Hits field, including user.",
		id: "shockingfinale",
		name: "Shocking Finale",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "all",
		type: "Electric",
		zMovePower: 200,
		contestType: "Cool",
	},
	"snowhalation": {
		num: 50003,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		desc: "Has a 10% chance to freeze the target.",
		shortDesc: "10% chance to freeze foe(s).",
		id: "snowhalation",
		isViable: true,
		name: "Snow Halation",
		pp: 5,
		priority: 0,
		flags: {sound: 1, protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 190,
		contestType: "Beautiful",
	},
	"meettheflintstones": {
		num: 50004,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 20% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "20% chance to raise the user's Special Attack by 1.",
		id: "meettheflintstones",
		isViable: true,
		name: "Meet The Flintstones",
		pp: 10,
		priority: 0,
		flags: {sound: 1, protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		zMovePower: 175,
		contestType: "Clever",
	},
	"stonehalation": {
		num: 50005,
		accuracy: true,
		basePower: 200,
		category: "Special",
		desc: "Has a 100% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "100% chance to raise the user's Special Attack by 1.",
		id: "stonehalation",
		name: "Stone Halation",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "siivagunniumz",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	"dreamscape": {
		num: 50006,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		desc: "Has a 10% chance to cause the target to fall asleep.",
		shortDesc: "10% chance to sleep foe(s).",
		id: "dreamscape",
		isViable: true,
		name: "Dreamscape",
		pp: 5,
		priority: 0,
		flags: {sound: 1, protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 190,
		contestType: "Beautiful",
	},
	"viaexpugnatio": {
		num: 50007,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon) {
			return Math.floor((pokemon.happiness * 10) / 25) || 1;
		},
		category: "Physical",
		desc: "Power is equal to the greater of (user's Happiness * 2/5), rounded down, or 1. 20% chance to paralyze.",
		shortDesc: "Max 102 power at maximum Happiness. 20% chance to paralyze",
		id: "viaexpugnatio",
		isViable: true,
		name: "Via Expugnatio",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 160,
		gmaxPower: 130,
		contestType: "Cute",
	},
	"ionioihetaroi": {
		num: 50008,
		accuracy: true,
		basePower: 210,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hasAbility('charisma')) {
				return move.basePower + 63; /* don't know how to actually apply the Charisma multiplier but this'll be exactly as strong so who cares */
			}
			return move.basePower;
		},
		category: "Physical",
		desc: "Field effects (including unremovable ones like Aestus Domus Aurea and Unlimited Blade Works from CCv2) are cleared, and Sandstorm is set up. This move is affected by the user's Charisma if it has it.",
		shortDesc: "Clears field effects, sets sandstorm. Charisma: 1.3x power",
		id: "ionioihetaroi",
		name: "Ionioi Hetaroi",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "iskandiumz",
		self: {
			onHit(source) {
				let success = false;
				let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.getEffect(targetCondition).name, '[from] move: Ionioi Hetaroi', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Ionioi Hetaroi', '[of] ' + source);
						success = true;
					}
				}
				this.field.clearTerrain();
				this.field.clearWeather();
				return success;
			},
		},
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.setWeather('sandstorm');
				},
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Cute",
	},
	"vaporizingfreeze": {
		num: 50009,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from non-Fire contact attacks made by other Pokemon during this turn, and Pokemon making contact with the user are frozen. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from non-Fire contact moves. Contact: freeze.",
		id: "vaporizingfreeze",
		isViable: true,
		name: "Vaporizing Freeze",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'vaporizingfreeze',
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['contact'] || move.type === 'Fire') {
					return;
				}
				if (!move.flags['protect']) {
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					source.trySetStatus('frz', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZPowered && move.flags['contact'] && !move.type === 'Fire') {
					source.trySetStatus('frz', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMoveBoost: {def: 1},
		contestType: "Smart",
	},
	"orbitout": {
		num: 50010,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		id: "orbitout",
		isViable: true,
		name: "Orbit Out",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cute",
	},
	"morningpeacock": {
		num: 50011,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		desc: "Hits six times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		shortDesc: "Hits 6 times in one turn. 10% burn per hit.",
		id: "morningpeacock",
		name: "Morning Peacock",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 6,
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		zMovePower: 175,
		gmaxPower: 130,
		contestType: "Cool",
	},
	"daytimetiger": {
		num: 50012,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
		id: "daytimetiger",
		isViable: true,
		name: "Daytime Tiger",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	"nightguy": {
		num: 50013,
		accuracy: 100,
		basePower: 250,
		category: "Phsyical",
		desc: "Can only be used by Eight Gate Might Guy. Whether or not this move is successful and even if it would cause fainting, the user loses 1/2 of its maximum HP, rounded up, unless the user has the Magic Guard Ability.",
		shortDesc: "Might Guy-Eight Gate: User loses 50% max HP.",
		id: "nightguy",
		isViable: true,
		name: "Night Guy",
		pp: 15,
		priority: 0,
		flags: {contact: 1, mirror: 1},
		breaksProtect: true,
		mindBlownRecoil: true,
		onTry(pokemon) {
			if (pokemon.template.species === 'Might Guy-Eighth Gate') {
				return;
			}
			this.hint("Only a Pokemon whose form is Might Guy-Eight Gate can use this move.");
			if (pokemon.template.species === 'Might Guy') {
				this.add('-fail', pokemon, 'move: Night Guy', '[forme]');
				return null;
			}
			this.add('-fail', pokemon, 'move: Night Guy');
			return null;
		},
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Mind Blown'), true);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	"commenceattack": {
		num: 50014,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Damage is calculated using the user's Defense stat instead of Attack, including stat stage changes. The user's Ability is used as normal. Deals damage to the target based on its Special Defense instead of Defense. Unless the user's form is Mega Maple, this attack charges on the first turn and strikes on the second.",
		shortDesc: "Uses Def instead of Atk, and SpD instead of Def, in damage calculation. If user is not Mega Maple, requires charge turn.",
		id: "commenceattack",
		isViable: true,
		name: "Commence Attack",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (pokemon.template.species === 'Maple-Mega') {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	"hydra": {
		num: 50015,
		accuracy: 100,
		basePower: 30,
		category: "Special",
		desc: "Hits three times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. Each hit has a 30% chance to badly poison.",
		shortDesc: "Hits 6 times in one turn. 30% chance to badly poison target per hit.",
		id: "hydra",
		name: "Hydra",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 3,
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 175,
		gmaxPower: 130,
		contestType: "Cool",
	},
	"devour": {
		num: 50016,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon making contact with the user lose 1/2 of their maximum HP, rounded down. This move cannot be used successfully unless the user's current form, while considering Transform, is Maple (not including Mega Maple). This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Maple (Base): Protects from moves. Contact: loses 1/2 max HP.",
		id: "devour",
		isViable: true,
		name: "Devour",
		pp: 5,
		priority: 4,
		flags: {},
		stallingMove: true,
		onTry(pokemon) {
			if (pokemon.template.species === 'Maple') {
				return;
			}
			this.hint("Only a Pokemon whose form is Maple can use this move.");
			if (pokemon.template.species === 'Maple-Mega') {
				this.add('-fail', pokemon, 'move: Devour', '[forme]');
				return null;
			}
			this.add('-fail', pokemon, 'move: Devour');
			return null;
		},
		volatileStatus: 'devour',
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					this.damage(source.baseMaxhp / 2, source, target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZPowered && move.flags['contact']) {
					this.damage(source.baseMaxhp / 2, source, target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMoveBoost: {def: 1},
		contestType: "Tough",
	},
	"paralyzingshout": {
		num: 50017,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Paralyzes all adjacent targets.",
		shortDesc: "Maple (Base): Paralyzes all adjacent targets.",
		id: "paralyzingshout",
		isViable: true,
		name: "Paralyzing Shout",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onTry(pokemon) {
			if (pokemon.template.species === 'Maple') {
				return;
			}
			this.hint("Only a Pokemon whose form is Maple can use this move.");
			if (pokemon.template.species === 'Maple-Mega') {
				this.add('-fail', pokemon, 'move: Paralyzing Shout', '[forme]');
				return null;
			}
			this.add('-fail', pokemon, 'move: Paralyzing Shout');
			return null;
		},
		status: 'par',
		secondary: null,
		target: "allAdjacent",
		type: "Steel",
		zMoveBoost: {spd: 1},
		contestType: "Cute",
	},
	"hotcupofcoffee": {
		num: 50018,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		id: "hotcupofcoffee",
		isViable: true,
		name: "Hot Cup of Coffee",
		pp: 10,
		priority: -3,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('hotcupofcoffee');
		},
		effect: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Hot Cup of Coffee');
			},
			onHit(pokemon, source, move) {
				if (move.flags['contact']) {
					source.trySetStatus('brn', pokemon);
				}
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('hotcupofcoffee');
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"kamehameha": {
		num: 50019,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "This move's type depends on the user's secondary type. wonder what it'll default to",
		shortDesc: "Type varies based on the user's secondary type.",
		id: "kamehameha",
		isViable: true,
		name: "Kamehameha",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[1];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	"instanttransmission": {
		num: 50020,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out.",
		id: "instanttransmission",
		name: "Instant Trasmission",
		pp: 40,
		priority: 0,
		flags: {},
		selfSwitch: true,
		onTryHit: true,
		secondary: null,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'heal',
		contestType: "Cool",
	},
	"dragonfist": {
		num: 50021,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		desc: "Has a 20% chance to raise the user's Attack by 1 stage.",
		shortDesc: "20% chance to raise the user's Attack by 1.",
		id: "dragonfist",
		isViable: true,
		name: "Dragon Fist",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	"carthrow": {
		num: 50022,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Future Sight is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
		id: "carthrow",
		name: "Car Throw",
		pp: 5,
		priority: 0,
		flags: {},
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'carthrow',
				source: source,
				moveData: {
					id: 'carthrow',
					name: "Car Throw",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Steel',
				},
			});
			this.add('-start', source, 'Car Throw');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	"rainbowcannon": {
		num: 50023,
		accuracy: true,
		basePower: 170,
		category: "Special",
		desc: "Sets a Rainbow on the user's field that doubles the chance of secondary effects.",
		shortDesc: "Sets Rainbow.",
		id: "rainbowcannon",
		name: "Rainbow Cannon",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "blackrockiumz",
		self: {
			sideCondition: 'waterpledge',
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	"decayingwave": {
		num: 50024,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Damages non-Fire-type opponent(s) by 1/6 of their maximum HP for four turns. Base Power scales with the base move's Base Power.",
		shortDesc: "Damages foes for 4 turns. BP scales w/ base move.",
		id: "decayingwave",
		name: "Decaying Wave",
		pp: 15,
		priority: 0,
		flags: {},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxwildfire');
			},
		},
		onEffectiveness(typeMod, target, type) {
			if (!target.isGrounded()) return 3;
		},
		secondary: null,
		target: "allAdjacent",
		type: "Ghost",
		contestType: "Cool",
	},
	//"Regular" hazard moves are here
		"gmaxsteelsurge": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Sets a Steel-type entry hazard. Base Power scales with the base move's Base Power.",
		shortDesc: "Sets Steel entry hazard. BP scales w/ base move.",
		id: "gmaxsteelsurge",
		isNonstandard: "Unobtainable",
		name: "G-Max Steelsurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Copperajah",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxsteelsurge');
			},
		},
		effect: {
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('trashcompactor')) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				let typeMod = this.dex.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
		"spikes": {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to three times before failing. Opponents lose 1/8 of their maximum HP with one layer, 1/6 of their maximum HP with two layers, and 1/4 of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts grounded foes on switch-in. Max 3 layers.",
		id: "spikes",
		isViable: true,
		name: "Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'spikes',
		effect: {
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
				if (pokemon.hasAbility('trashcompactor')) return;
				let damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
		"stealthrock": {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Factors Rock weakness.",
		id: "stealthrock",
		isViable: true,
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stealthrock',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('trashcompactor')) return;
				let typeMod = this.dex.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMoveBoost: {def: 1},
		contestType: "Cool",
	},
		"stickyweb": {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, lowering the Speed by 1 stage of each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Lowers Speed of grounded foes by 1 on switch-in.",
		id: "stickyweb",
		isViable: true,
		name: "Sticky Web",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stickyweb',
		effect: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('trashcompactor')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMoveBoost: {spe: 1},
		contestType: "Tough",
	},
		"toxicspikes": {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, poisoning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to two times before failing. Opposing Pokemon become poisoned with one layer and badly poisoned with two layers. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
		shortDesc: "Poisons grounded foes on switch-in. Max 2 layers.",
		id: "toxicspikes",
		isViable: true,
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'toxicspikes',
		effect: {
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
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('trashcompactor')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
/* dimensional masturbation implemented here */


	"gravity": {
		num: 356,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the evasiveness of all active Pokemon is multiplied by 0.6. At the time of use, Bounce, Fly, Magnet Rise, Sky Drop, and Telekinesis end immediately for all active Pokemon. During the effect, Bounce, Fly, Flying Press, High Jump Kick, Jump Kick, Magnet Rise, Sky Drop, Splash, and Telekinesis are prevented from being used by all active Pokemon. Ground-type attacks, Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability can affect Flying types or Pokemon with the Levitate Ability. Fails if this move is already in effect.",
		shortDesc: "For 5 turns, negates all Ground immunities.",
		id: "gravity",
		name: "Gravity",
		pp: 5,
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'gravity',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				if (source && source.hasAbility('dimensionalmastery')) {
					this.add('-activate', source, 'ability: Dimensional Mastery', effect);
					return 7;
				}
				return 5;
			},
			onStart() {
				this.add('-fieldstart', 'move: Gravity');
				for (const pokemon of this.getAllActive()) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.queue.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.queue.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy(accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5 / 3;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.getMove(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['gravity']) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spa: 1},
		contestType: "Clever",
	},
	"healblock": {
		num: 377,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the target is prevented from restoring any HP as long as it remains active. During the effect, healing and draining moves are unusable, and Abilities and items that grant healing will not heal the user. If an affected Pokemon uses Baton Pass, the replacement will remain unable to restore its HP. Pain Split and the Regenerator Ability are unaffected.",
		shortDesc: "For 5 turns, the foe(s) is prevented from healing.",
		id: "healblock",
		isNonstandard: "Past",
		name: "Heal Block",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'healblock',
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				if (source && source.hasAbility('dimensionalmastery')) {
					this.add('-activate', source, 'ability: Dimensional Mastery', effect);
					return 7;
				}
				return 5;
			},
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Heal Block');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.getMove(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect && effect.id === 'zpower') || this.effectData.isZ) return damage;
				return false;
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		zMoveBoost: {spa: 2},
		contestType: "Clever",
	},
	"magicroom": {
		num: 478,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the held items of all active Pokemon have no effect. An item's effect of causing forme changes is unaffected, but any other effects from such items are negated. During the effect, Fling and Natural Gift are prevented from being used by all active Pokemon. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, all held items have no effect.",
		id: "magicroom",
		name: "Magic Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'magicroom',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				if (source && source.hasAbility('dimensionalmastery')) {
					this.add('-activate', source, 'ability: Dimensional Mastery', effect);
					return 7;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 25,
			onEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectData.source);
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"safeguard": {
		num: 219,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members cannot have major status conditions or confusion inflicted on them by other Pokemon. It is removed from the user's side if the user or an ally is successfully hit by Defog. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, protects user's party from status.",
		id: "safeguard",
		name: "Safeguard",
		pp: 25,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'safeguard',
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				if (source && source.hasAbility('dimensionalmastery')) {
					this.add('-activate', source, 'ability: Dimensional Mastery', effect);
					return 7;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Safeguard');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Normal",
		zMoveBoost: {spe: 1},
		contestType: "Beautiful",
	},
	"tailwind": {
		num: 366,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 4 turns, the user and its party members have their Speed doubled. Fails if this move is already in effect for the user's side.",
		shortDesc: "For 4 turns, allies' Speed is doubled.",
		id: "tailwind",
		isViable: true,
		name: "Tailwind",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'tailwind',
		effect: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 6;
				}
				if (source && source.hasAbility('dimensionalmastery')) {
					this.add('-activate', source, 'ability: Dimensional Mastery', effect);
					return 6;
				}
				return 4;
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Tailwind');
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Flying",
		zMoveEffect: 'crit2',
		contestType: "Cool",
	},
	"trickroom": {
		num: 433,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the Speed of every Pokemon is recalculated for the purposes of determining turn order. During the effect, each Pokemon's Speed is considered to be (10000 - its normal Speed), and if this value is greater than 8191, 8192 is subtracted from it. If this move is used during the effect, the effect ends.",
		shortDesc: "Goes last. For 5 turns, turn order is reversed.",
		id: "trickroom",
		name: "Trick Room",
		pp: 5,
		priority: -7,
		flags: {mirror: 1},
		pseudoWeather: 'trickroom',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				if (source && source.hasAbility('dimensionalmastery')) {
					this.add('-activate', source, 'ability: Dimensional Mastery', effect);
					return 7;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {accuracy: 1},
		contestType: "Clever",
	},
	"wonderroom": {
		num: 472,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, all active Pokemon have their Defense and Special Defense stats swapped. Stat stage changes are unaffected. If this move is used during the effect, the effect ends.",
		shortDesc: "For 5 turns, all Defense and Sp. Def stats switch.",
		id: "wonderroom",
		name: "Wonder Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		pseudoWeather: 'wonderroom',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
				if (source && source.hasAbility('dimensionalmastery')) {
					this.add('-activate', source, 'ability: Dimensional Mastery', effect);
					return 7;
				}
				return 5;
			},
			onStart(side, source) {
				this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('wonderroom');
			},
			// Swapping defenses implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onResidualOrder: 24,
			onEnd() {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
//Whenever the hazard "Mine" is added here, don't forget to turn the user immune if it holds the Trash Copaction ability, the code is right below the Heavy Duty Boots one in all the hazards above but Stealth Rock
// "digslash": {
//         num: 40000,
//         accuracy: 100,
//         basePower: 95,
//         category: "Physical",
//         desc: "Has a higher chance for a critical hit.",
//         shortDesc: "High critical hit ratio",
//         id: "digslash",
//         name: "Dig Slash",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1, authentic: 1, contact: 1, distance: 1},
//         critRatio: 2,
//         secondary: false,
//         target: "normal",
//         type: "Ground",
//         zMovePower: 175,
//     },
//     "chargehandle": {
//         num: 40001,
//         accuracy: 90,
//         basePower: 150,
//         category: "Physical",
//         desc: "This attack charges on the first turn and executes on the second. Lowers speed by 1 stage after use. Breaks the foes protection.",
//         shortDesc: "Charges, then hits turn 2. Breaks protection. Lowers speed after use.",
//         id: "chargehandle",
//         name: "Charge Handle",
//         pp: 5,
//         priority: 0,
//         flags: {contact: 1, charge: 1, mirror: 1},
//         breaksProtect: true,
//         secondary: false,
//         target: "normal",
//         type: "Steel",
//         zMovePower: 200,
//     },
//     "hairwhip": {
//         num: 40002,
//         accuracy: 90,
//         basePower: 120,
//         category: "Physical",
//         desc: "Has a higher chance for a critical hit.",
//         shortDesc: "High critical hit ratio.",
//         id: "hairwhip",
//         name: "Hair Whip",
//         pp: 10,
//         priority: 0,
//         flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
//         critRatio: 2,
//         secondary: false,
//         target: "normal",
//         type: "Psychic",
//         zMovePower: 190,
//         contestType: "Tough",
//     },
//     "phasingram": {
//         num: 40004,
//         accuracy: 100,
//         basePower: 90,
//         category: "Physical",
//         desc: "Ignores the target's stat stage changes, including evasiveness.",
//         shortDesc: "Ignores the target's stat stage changes.",
//         id: "phasingram",
//         isViable: true,
//         name: "Phasing Ram",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         ignoreEvasion: true,
//         ignoreDefensive: true,
//         secondary: false,
//         target: "normal",
//         type: "Ghost",
//         zMovePower: 175,
//     },
//         "knifetoss": {
//         num: 40005,
//         accuracy: 95,
//         basePower: 55,
//         category: "Special",
//         desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. Each hit has 30% chance to badly poison the target.",
//         shortDesc: "Hits 2 times in one turn. 30% chance to badly poison target per hit.",
//         id: "knifetoss",
//         isViable: true,
//         name: "Knife Toss",
//         pp: 5,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         multihit: 2,
//         secondary: {
//             chance: 30,
//             status: 'tox',
//         },
//         target: "normal",
//         type: "Flying",
//         zMovePower: 180,
//     },
//     "liarshot": {
//         num: 40006,
//         accuracy: 100,
//         basePower: 80,
//         category: "Physical",
//         desc: "Has a 30% chance to flinch the target.",
//         shortDesc: "30% chance to flinch the target.",
//         id: "liarshot",
//         isViable: true,
//         name: "Liar Shot",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         secondary: {
//             chance: 30,
//             volatileStatus: 'flinch',
//         },
//         target: "normal",
//         type: "Dark",
//         zMovePower: 160,
//     },
//     "thorntrap": {
//         num: 40007,
//         accuracy: 95,
//         basePower: 35,
//         category: "Physical",
//         desc: "Prevents the target from switching for four or five turns; seven turns if the user is holding Grip Claw. Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute. This effect is not stackable or reset by using this or another partial-trapping move.",
//         shortDesc: "Traps and damages the target for 4-5 turns.",
//         id: "thorntrap",
//         name: "Thorn Trap",
//         pp: 20,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         volatileStatus: 'partiallytrapped',
//         secondary: false,
//         target: "normal",
//         type: "Grass",
//         zMovePower: 100,
//     },
//     "sunrise": {
//         num: 40007,
//         accuracy: true,
//         basePower: 0,
//         category: "Status",
//         desc: "The user restores 66.7% of its maximum HP, rounded half up.",
//         shortDesc: "Heals the user by 66.7% of its max HP.",
//         id: "sunrise",
//         isViable: true,
//         name: "Sunrise",
//         pp: 5,
//         priority: 0,
//         flags: {snatch: 1, heal: 1},
//         heal: [2, 3],
//         secondary: false,
//         target: "self",
//         type: "Fire",
//         zMoveEffect: 'clearnegativeboost',
//     },
//     "rockout": {
//         num: 40008,
//         accuracy: 100,
//         basePower: 100,
//         category: "Special",
//         desc: "If it hits a target, wakes them up. Hits all adjacent foes.",
//         shortDesc: "The target wakes up.",
//         id: "rockout",
//         name: "Rock Out",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
//         secondary: {
//             dustproof: true,
//             chance: 100,
//             onHit: function (target) {
//                 if (target.status === 'slp') target.cureStatus();
//             },
//         },
//         target: "allAdjacent",
//         type: "Rock",
//         zMovePower: 180,
//     },
//     "minigun": {
//         num: 40009,
//         accuracy: 100,
//         basePower: 0,
//         basePowerCallback: function (pokemon, target) {
//             let power = (Math.floor(25 * target.getStat('spe') / pokemon.getStat('spe')) || 1);
//             if (power > 150) power = 150;
//             this.debug('' + power + ' bp');
//             return power;
//         },
//         category: "Special",
//         desc: "Power is equal to (25 * target's current Speed / user's current Speed), rounded down, + 1, but not more than 150.",
//         shortDesc: "More power the slower the user than the target.",
//         id: "minigun",
//         isViable: true,
//         name: "Minigun",
//         pp: 5,
//         priority: 0,
//         flags: {bullet: 1, protect: 1, mirror: 1},
//         secondary: false,
//         target: "normal",
//         type: "Normal",
//         zMovePower: 160,
//     },
//     "fantasyseal": {
//         num: 40010,
//         accuracy: true,
//         basePower: 90,
//         category: "Special",
//         desc: "This move's type effectiveness against Dark and Ghost is changed to be super effective no matter what this move's type is.",
//         shortDesc: "Super effective on Dark and Ghost.",
//         id: "fantasyseal",
//         isViable: true,
//         name: "Fantasy Seal",
//         pp: 20,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         onEffectiveness: function (typeMod, type) {
//             if (type === 'Dark' || type === 'Ghost') return 1;
//         },
//         secondary: false,
//         target: "normal",
//         type: "Flying",
//         zMovePower: 140,
//     },
//     "genkigirl": {
//         num: 40011,
//         accuracy: true,
//         basePower: 0,
//         category: "Status",
//         desc: "The user restores 1/2 of its maximum HP, rounded half up. The user is healed of major status conditions.",
//         shortDesc: "Heals the user by 50% of its max HP. Major status conditions healed.",
//         id: "genkigirl",
//         isViable: true,
//         name: "Genki Girl",
//         pp: 10,
//         priority: 0,
//         flags: {snatch: 1, heal: 1},
//         heal: [1, 2],
//         onHit: function (pokemon) {
//             if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
//             pokemon.cureStatus();
//         },
//         secondary: false,
//         target: "self",
//         type: "Fairy",
//         zMoveEffect: 'clearnegativeboost',
//     },
//         "masterspark": {
//         num: 40012,
//         accuracy: 100,
//         basePower: 100,
//         category: "Special",
//         desc: "Has a 30% chance to lower the target's Special Defense by 1 stage.",
//         shortDesc: "30% chance to lower the target's Sp. Def by 1.",
//         id: "masterspark",
//         isViable: true,
//         name: "Master Spark",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         secondary: {
//             chance: 30,
//             boosts: {
//                 spd: -1,
//             },
//         },
//         target: "normal",
//         type: "Electric",
//         zMovePower: 180,
//     },
//     "pipewarp": {
//         num: 40013,
//         accuracy: 100,
//         basePower: 130,
//         category: "Special",
//         desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
//         shortDesc: "Physical if user's Atk > Sp. Atk.",
//         id: "pipewarp",
//         isViable: true,
//         name: "Pipe Warp",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         onModifyMove: function (move, pokemon) {
//             if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
//         },
//         secondary: false,
//         target: "normal",
//         type: "Steel",
//         zMovePower: 195,
//     },
//     "chaosenergy": {
//         num: 40014,
//         accuracy: true,
//         basePower: 130,
//         category: "Special",
//         desc: "This move cannot be used successfully unless the user's current form, while considering Transform, is Sonic. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
//         shortDesc: "Sonic: Breaks protection.",
//         id: "chaosenergy",
//         isViable: true,
//         name: "Chaos Energy",
//         pp: 5,
//         priority: 0,
//         flags: {mirror: 1, authentic: 1},
//         breaksProtect: true,
//         onTry: function (pokemon) {
//             if (pokemon.template.species === 'Sonic') {
//                 return;
//             }
//             this.add('-hint', "Only a Pokemon whose form is Sonic can use this move.");
//             if (pokemon.template.species === 'Hoopa') {
//                 this.add('-fail', pokemon, 'move: Chaos Energy', '[forme]');
//                 return null;
//             }
//             this.add('-fail', pokemon, 'move: Chaos Energy');
//             return null;
//         },
//         secondary: false,
//         target: "normal",
//         type: "Normal",
//         zMovePower: 195,
//     },
//     "leafviolin": {
//         num: 40015,
//         accuracy: 100,
//         basePower: 110,
//         category: "Special",
//         desc: "20% chance to raise Sp. Def by 1 stage.",
//         shortDesc: "20% chance to raise Sp. Def by 1. Hits adjacent foes.",
//         id: "leafviolin",
//         isViable: true,
//         name: "Leaf Violin",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
//         secondary: {
//             chance: 20,
//             self: {
//                 boosts: {
//                     spd: 1,
//                 },
//             },
//         },
//         target: "allAdjacentFoes",
//         type: "Grass",
//         zMovePower: 175,
//         contestType: "Cool",
//     },
//         "hammerthrow": {
//         num: 40016,
//         accuracy: 100,
//         basePower: 90,
//         category: "Physical",
//         desc: "Has a 30% chance to burn the target.",
//         shortDesc: "30% chance to burn the target.",
//         id: "hammerthrow",
//         isViable: true,
//         name: "Hammer Throw",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1, mirror: 1,},
//         thawsTarget: true,
//         secondary: {
//             chance: 30,
//             status: 'brn',
//         },
//         target: "normal",
//         type: "Flying",
//         zMovePower: 175,
//     },
//         "hammerbarrage": {
//         num: 40017,
//         accuracy: 100,
//         basePower: 20,
//         category: "Physical",
//         desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times.",
//         shortDesc: "Hits 2-5 times in one turn.",
//         id: "hammerbarrage",
//         isViable: true,
//         name: "Hammer Barrage",
//         pp: 30,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         multihit: [2, 5],
//         secondary: false,
//         target: "normal",
//         type: "Rock",
//         zMovePower: 140,
//     },
//     "pinktyphoon": {
//         num: 40018,
//         accuracy: 85,
//         basePower: 100,
//         category: "Physical",
//         desc: "Has a 30% chance to confuse the target.",
//         shortDesc: "30% chance to confuse the target.",
//         id: "pinktyphoon",
//         name: "Pink Typhoon",
//         pp: 15,
//         priority: 0,
//         flags: {contact: 1, protect: 1, mirror: 1},
//         secondary: {
//             chance: 30,
//             volatileStatus: 'confusion',
//         },
//         target: "normal",
//         type: "Fairy",
//         zMovePower: 180,
//     },
//         "vanish": {
//         num: 40019,
//         accuracy: true,
//         basePower: 100,
//         category: "Physical",
//         desc: "If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. Only Zelda-Sheik or pokemon in the form of Zelda-Shiek may use this move.",
//         shortDesc: "Breaks the target's protection for this turn. Only usable on Zelda-Shiek.",
//         id: "vanish",
//         name: "Vanish",
//         pp: 5,
//         priority: 0,
//         flags: {mirror: 1, authentic: 1},
//         onTry: function (pokemon) {
//             if (pokemon.template.species === 'Zelda-Shiek') {
//                 return;
//             }
//             this.add('-hint', "Only a Pokemon whose form is Zelda-Shiek can use this move.");
//             if (pokemon.template.species === 'Zelda') {
//                 this.add('-fail', pokemon, 'move: Vanish', '[forme]');
//                 return null;
//             }
//             this.add('-fail', pokemon, 'move: Vanish');
//             return null;
//         },
//         breaksProtect: true,
//         secondary: false,
//         target: "normal",
//         type: "Psychic",
//         zMovePower: 180,
//     },
//     "warlockpunch": {
//         num: 40020,
//         accuracy: 100,
//         basePower: 110,
//         category: "Physical",
//         desc: "Has a 32% chance to flinch the target.",
//         shortDesc: "20% chance to flinch the target.",
//         id: "warlockpunch",
//         isViable: true,
//         name: "Warlock Punch",
//         pp: 10,
//         priority: 0,
//         flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
//         secondary: {
//             chance: 20,
//             volatileStatus: 'flinch',
//         },
//         target: "normal",
//         type: "Dark",
//         zMovePower: 185,
//     },
//     "crossslash": {
//         num: 40021,
//         accuracy: 90,
//         basePower: 30,
//         category: "Physical",
//         desc: "Hits two to four times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit four times.",
//         shortDesc: "Hits 2-4 times in one turn.",
//         id: "crossslash",
//         name: "Cross Slash",
//         pp: 20,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         multihit: [2, 4],
//         secondary: false,
//         target: "normal",
//         type: "Steel",
//         zMovePower: 140,
//     },
//     "thundaga": {
//         num: 40022,
//         accuracy: 100,
//         basePower: 80,
//         category: "Special",
//         desc: "No additional effect.",
//         shortDesc: "No additional effect.",
//         id: "thundaga",
//         isViable: true,
//         name: "Thundaga",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1,mirror: 1},
//         secondary: false,
//         target: "any",
//         type: "Electric",
//         zMovePower: 160,
//     },
//     "firaga": {
//         num: 40023,
//         accuracy: 100,
//         basePower: 80,
//         category: "Special",
//         desc: "No additional effect.",
//         shortDesc: "No additional effect.",
//         id: "firaga",
//         isViable: true,
//         name: "Firaga",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1,mirror: 1},
//         secondary: false,
//         target: "any",
//         type: "Fire",
//         zMovePower: 160,
//     },
//     "blizzaga": {
//         num: 40024,
//         accuracy: 100,
//         basePower: 80,
//         category: "Special",
//         desc: "No additional effect.",
//         shortDesc: "No additional effect.",
//         id: "blizzaga",
//         isViable: true,
//         name: "Blizzaga",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1,mirror: 1},
//         secondary: false,
//         target: "any",
//         type: "Ice",
//         zMovePower: 160,
//     },
//     "cannonballblast": {
//         num: 40026,
//         accuracy: 100,
//         basePower: 140,
//         category: "Physical",
//         desc: "Has a 10% chance to flinch the target.",
//         shortDesc: "10% chance to flinch the target.",
//         id: "cannonballblast",
//         isViable: true,
//         name: "Cannonball Blast",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         secondary: {
//             chance: 10,
//             volatileStatus: 'flinch',
//         },
//         target: "normal",
//         type: "Steel",
//         zMovePower: 200,
//     },
};