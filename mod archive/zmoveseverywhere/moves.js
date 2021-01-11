"use strict";
exports.BattleMovedex = {
	"swampysmackdown": {
		accuracy: true,
		basePower: 200,
		category: "Special",
		shortDesc: "Summons a swamp on the target's side of the field, quartering the Speed of any Pokemon on that side.",
		id: "swampysmackdown",
		isViable: true,
		name: "Swampy Smackdown",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Frenzy Plant", target);
		},
		onHit(target, source, move) {
			target.side.addSideCondition('grasspledge');
		},
		target: "normal",
		type: "Grass",
		isZ: "venusauriumz",
	},
	"intensifiedinferno": {
		accuracy: true,
		basePower: 200,
		category: "Special",
		shortDesc: "Summons a sea of flames on the target's side of the field, causing any non-Fire-types to lose 12.5% of their Maximum HP at the end of each turn.",
		id: "intensifiedinferno",
		isViable: true,
		name: "Intensified Inferno",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blast Burn", target);
		},
		onHit(target, source, move) {
			target.side.addSideCondition('firepledge');
		},
		target: "normal",
		type: "Fire",
		isZ: "charizardiumz",
	},
	"destructivedownpour": {
		accuracy: true,
		basePower: 200,
		category: "Special",
		shortDesc: "Summons a rainbow on the user's side of the field, doubling the chances of any secondaries.",
		id: "destructivedownpour",
		isViable: true,
		name: "Destructive Downpour",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Cannon", target);
		},
		onHit(target, source, move) {
			source.side.addSideCondition('waterpledge');
		},
		target: "normal",
		type: "Water",
		isZ: "blastoisiumz",
	},
	"hailhydra": {
		accuracy: true,
		basePower: 20,
		category: "Special",
		shortDesc: "5% chance to Freeze on each hit.",
		id: "hailhydra",
		isViable: true,
		name: "Hail Hydra",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icicle Spear", target);
		},
		secondary: {
			chance: 5,
			status: 'frz',
		},
		multihit: 9,
		target: "normal",
		type: "Ice",
		isZ: "alolaninetaliumz",
	},
	"pursuingstrike": {
		accuracy: true,
		basePower: 180,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds or the target is protecting
			if (target.beingCalledBack || target.volatiles['stall']) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if a foe is switching out or protecting.",
		id: "pursuingstrike",
		isViable: true,
		name: "Pursuing Strike",
		pp: 1,
		priority: 0,
		beforeTurnCallback(pokemon, target) {
			target.side.addSideCondition('pursuingstrike', pokemon);
			if (!target.side.sideConditions['pursuingstrike'].sources) {
				target.side.sideConditions['pursuingstrike'].sources = [];
			}
			target.side.sideConditions['pursuingstrike'].sources.push(pokemon);
		},
		onModifyMove(move, source, target) {
			if (target && target.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('pursuingstrike');
		},
		effect: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Pursuing Strike start');
				let sources = this.effectData.sources;
				let alreadyAdded = false;
				for (let i = 0; i < sources.length; i++) {
					if (sources[i].moveThisTurn || sources[i].fainted) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Pursuing Strike');
						alreadyAdded = true;
					}
					this.cancelMove(sources[i]);
					// Run through each decision in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (sources[i].canMegaEvo) {
						for (let j = 0; j < this.queue.length; j++) {
							if (this.queue[j].pokemon === sources[i] && this.queue[j].choice === 'megaEvo') {
								this.runMegaEvo(sources[i]);
								this.queue.splice(j, 1);
								break;
							}
						}
					}
					this.runMove('pursuingstrike', sources[i], this.getTargetLoc(pokemon, sources[i]));
				}
			},
		},
		target: "normal",
		type: "Dark",
		isZ: "tyraniumz",
	},
	"earthlycrush": {
		accuracy: true,
		basePower: 175,
		category: "Physical",
		shortDesc: "Stealth Rock is set up on both sides of the field. Becomes Rock-type instead against targets immune to Ground.",
		id: "earthlycrush",
		isViable: true,
		name: "Earthly Crush",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tectonic Rage", target);
		},
		onModifyMove(move, pokemon, target) {
			if (!target.isGrounded()) {
				move.type = 'Rock';
			}
		},
		sideCondition: 'stealthrock',
		self: {
			sideCondition: 'stealthrock',
		},
		target: "normal",
		type: "Ground",
		isZ: "hippowniumz",
	},
	"blossominglifedrain": {
		accuracy: true,
		basePower: 180,
		category: "Special",
		shortDesc: "User recovers 66.7% of damage dealt.",
		id: "blossominglifedrain",
		isViable: true,
		name: "Blossoming Life Drain",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Giga Drain", target);
		},
		target: "normal",
		type: "Grass",
		drain: [2, 3],
		isZ: "abomasnowniumz",
	},
	"honingrocks": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Maximizes Speed and raises the user's Attack by 2.",
		id: "honingrocks",
		isViable: true,
		name: "Honing Rocks",
		pp: 1,
		priority: 0,
		boosts: {
			spe: 12,
			atk: 2,
		},
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Diamond Storm", target);
		},
		target: "self",
		type: "Rock",
		isZ: "gigaliumz",
	},
	"snowstormspinkle": {
		accuracy: true,
		basePower: 210,
		category: "Special",
		shortDesc: "Sets up Tailwind and Hail after dealing damage.",
		id: "snowstormspinkle",
		isViable: true,
		name: "Snowstorm Spinkle",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		self: {
			sideCondition: 'tailwind',
		},
		weather: 'hail',
		target: "normal",
		type: "Ice",
		isZ: "vanilliumz",
	},
	"infernoburst": {
		accuracy: true,
		basePower: 195,
		category: "Special",
		shortDesc: "100% chance to raise the user's Special Attack by 3.",
		id: "infernoburst",
		isViable: true,
		name: "Inferno Burst",
		pp: 1,
		priority: 0,
		flags: {},
		weather: 'sunnyday',
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 3,
				},
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "ninetalesiumz",
	},
	"blitzingtremor": {
		accuracy: true,
		basePower: 180,
		category: "Physical",
		shortDesc: "Combines Fire in its type effectiveness.",
		id: "blitzingtremor",
		isViable: true,
		name: "Blitzing Tremor",
		pp: 1,
		priority: 0,
		flags: {},
		onEffectiveness(typeMod, type, move) {
			// @ts-ignore
			return typeMod + this.getEffectiveness('Fire', type);
		},
		secondary: {
			chance: 70,
			status: 'brn',
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
			this.add('-anim', source, "Earthly Crust", target);
		},
		target: "normal",
		type: "Ground",
		isZ: "groudoniumz",
	},
	"pyrotechnics": { // TODO: Code The Additional Effect: Torkoal deals damage. Afterwards it gains +1 to each stat for each other Fire-type or Grass-type on its team without a status condition, and not fainted. -1 Priority. Fails if you have no other Fire-types or Grass-types on your team- similar checks on teammates to Beat Up. */
		accuracy: true,
		basePower: 180,
		category: "Special",
		id: "pyrotechnics",
		isViable: true,
		name: "Pyrotechnics ",
		pp: 1,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			source.addVolatile("pyrotechnics");
			for (let i = 0; i < source.volatiles.pyrotechnics.index; i++) {
				this.boost({
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1
				}, source, source, source.volatiles.pyrotechnics);
			}
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		effect: {
			duration: 1,
			onStart(pokemon) {
				this.effectData.index = 0;
				while (pokemon.side.pokemon[this.effectData.index] !== pokemon && (!pokemon.side.pokemon[this.effectData.index] || pokemon.side.pokemon[this.effectData.index].fainted || pokemon.side.pokemon[this.effectData.index].status)) {
					this.effectData.index++;
				}
			},
			onRestart(pokemon) {
				do {
					this.effectData.index++;
					if (this.effectData.index >= 6) break;
				} while (!pokemon.side.pokemon[this.effectData.index] || pokemon.side.pokemon[this.effectData.index].fainted || pokemon.side.pokemon[this.effectData.index].status);
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('pyrotechnics');
		},
		target: "normal",
		type: "Fire",
		isZ: "torkoaliumz",
	},
	"depthstridedecimation": { // Add in such that this gets past Filter 
		accuracy: true,
		basePower: 210,
		category: "Special",
		shortDesc: "Ignores abilities that nullify Water-type moves and Desolate Land to hit.",
		id: "depthstridedecimation",
		isViable: true,
		name: "Depthstride Decimation",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Vortex", target);
		},
		onModifyMove(move, pokemon, target) {
			if (target.hasAbility(['waterabsorb', 'stormdrain'])) {
				move.ignoreAbility = true;
			}
		},
		//Ignoring Desolate Land will be coded into statuses.js.
		target: "normal",
		type: "Water",
		isZ: "kyogriumz",
	},
	"inneraurafocus": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Until the end of the next turn, user's moves crit. Raises all stats by 1 (not acc/eva)",
		id: "inneraurafocus",
		isViable: true,
		name: "Inner Aura Focus",
		pp: 1,
		priority: 0,
		flags: {},
		volatileStatus: 'laserfocus',
		self: {
			boosts: {
				atk: 1,
				def: 1,
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", source);
		},
		target: "self",
		type: "Normal",
		isZ: "lucariumz",
	},
	"hyperwatershuriken": {
		accuracy: true,
		basePower: 40,
		category: "Special",
		//breaksProtect: true,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.template.species === 'Greninja-Ash' && pokemon.hasAbility('battlebond')) {
				move.breaksProtect = true;
				return move.basePower + 20;
			}
			return move.basePower;
		},
		shortDesc: "Usually goes first. Hits 5 times in one turn. If used by Ash-Greninja, breaks protect and has 60 power per hit.",
		id: "hyperwatershuriken",
		isViable: true,
		name: "Hyper Water Shuriken",
		pp: 1,
		priority: 1,
		flags: {},
		multihit: 5,
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Water Shuriken", target);
			this.add('-anim', source, "Water Shuriken", target);
			this.add('-anim', source, "Water Shuriken", target);
			this.add('-anim', source, "Water Shuriken", target);
			this.add('-anim', source, "Water Shuriken", target);
		},
		target: "normal",
		type: "Water",
		isZ: "greninjiumz",
	},
	"toadshypnospiral": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "toadshypnospiral",
		isViable: true,
		name: "Toad's Hypno-Spiral",
		shortDesc: "Causes the target to fall asleep. Prevents the target from switching out.",
		pp: 1,
		priority: 0,
		flags: {},
		status: 'slp',
		onHit(target, source, move) {
			if (!target.addVolatile('trapped', source, move, 'trapper')) {
				this.add('-fail', target);
			}
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hypnosis", target);
			this.add('-anim', source, "Mean Look", target);
		},
		target: "normal",
		type: "Psychic",
		isZ: "politoediumz",
	},
	"highdeliverydeluge": { //Does damage and extends rain to 8 more turns. Basically allows Pelipper to have a Z-move while still being able to set up rain as if it had Damp Rock. */
		accuracy: true,
		basePower: 190,
		category: "Special",
		shortDesc: "Summons Rain Dance.",
		id: "highdeliverydeluge",
		isViable: true,
		name: "High Delivery Deluge",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Vortex", target);
		},
		weather: 'RainDance',
		target: "normal",
		type: "Water",
		isZ: "pelipiumz",
	},
	"sacredspiral": {
		accuracy: true,
		basePower: 190,
		category: "Special",
		shortDesc: "Boosts user's Def/SpD/Spe by 1 after damage.",
		id: "sacredspiral",
		isViable: true,
		name: "Sacred Spiral",
		pp: 1,
		priority: 0,
		flags: {},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Vortex", target);
		},
		target: "normal",
		type: "Water",
		isZ: "omastatiumz",
	},
	"omnitemporalblast": {
		accuracy: true,
		basePower: 150,
		category: "Special",
		desc: "Hits once, the damage calculated normally. Hits again two turns after this move is used, the damage calculated independently from the first hit. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position.",
		shortDesc: "Hits again two turns after being used.",
		id: "omnitemporalblast",
		name: "Omnitemporal Blast",
		pp: 1,
		priority: 0,
		flags: {},
		onHit(target, source) {
			target.side.addSideCondition('futuremove');
			if (!target.side.sideConditions['futuremove'].positions[target.position]) {
				target.side.sideConditions['futuremove'].positions[target.position] = {
					duration: 3,
					move: 'omnitemporalblast',
					source: source,
					moveData: {
						id: 'omnitemporalblast',
						name: "Omnitemporal Blast",
						accuracy: true,
						basePower: 150,
						category: "Special",
						priority: 0,
						flags: {},
						effectType: 'Move',
						isFutureMove: true,
						type: 'Psychic',
					},
				};
				this.add('-start', source, 'move: Omnitemporal Blast');
			}
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psycho Boost", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		isZ: "celebiumz",
	},
	"ancientservantsascension": {
		accuracy: true,
		basePower: 73,
		category: "Physical",
		id: "ancientservantsascension",
		shortDesc: "Suppresses user's ability before damage. Hits three times, the first hit Rock-type, the second Ice-type and the third Steel-type.",
		isViable: true,
		name: "Ancient Servant's Ascension",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
				source.addVolatile('gastroacid');
		},
		onTryHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", source);
			this.useMove("ancientservantsascensionrock", source);
			if (target.runImmunity('Rock')) {
				if (target.fainted){
					this.add('-hitcount', target, 1);
				} else {
					this.useMove("ancientservantsascensionice", source);
					if (target.fainted){
						this.add('-hitcount', target, 2);
					} else {
						this.useMove("ancientservantsascensionsteel", source);
						this.add('-hitcount', target, 3);
					}
				}
			}
			return null;
		},
		/*onAfterHit(target, source) { // Uncomment if required
				source.addVolatile('slowstart');
		},*/
		target: "normal",
		type: "Normal",
		isZ: "regigigiumz",
	},
	"ancientservantsascensionrock": {
		accuracy: true,
		basePower: 73,
		category: "Physical",
		id: "ancientservantsascensionrock",
		shortDesc: "Suppresses user's ability before damage. Hits three times, the first hit Rock-type, the second Ice-type and the third Steel-type.",
		isViable: true,
		name: "Ancient Servant's Ascension (Rock)",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Slide", target);
			if (target.runImmunity('Rock')) {
				source.addVolatile('gastroacid');
			}
		},
		target: "normal",
		type: "Rock",
		zMovePower: 73,
	},
	"ancientservantsascensionice": {
		accuracy: true,
		basePower: 73,
		category: "Physical",
		id: "ancientservantsascensionice",
		shortDesc: "Suppresses user's ability before damage. Hits three times, the first hit Rock-type, the second Ice-type and the third Steel-type.",
		isViable: true,
		name: "Ancient Servant's Ascension (Ice)",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icicle Crash", target);
		},
		target: "normal",
		type: "Ice",
		zMovePower: 73,
	},
	"ancientservantsascensionsteel": {
		accuracy: true,
		basePower: 73,
		category: "Physical",
		id: "ancientservantsascensionsteel",
		shortDesc: "Suppresses user's ability before damage. Hits three times, the first hit Rock-type, the second Ice-type and the third Steel-type.",
		isViable: true,
		name: "Ancient Servant's Ascension (Steel)",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Burst", target);
		},
		target: "normal",
		type: "Steel",
		zMovePower: 73,
	},
	"celestialcurse": {
		accuracy: true,
		basePower: 0,
		damageCallback(pokemon, target) {
			if (target.hp > 0) {
				return target.hp - 1;
			}
			return 1;
		},
		category: "Special",
		desc: "Deals damage to the target equal to its current HP minus one, but not less than 1 HP.",
		shortDesc: "Target is brought down to 1HP. (min. 1 damage)",
		id: "celestialcurse",
		isViable: true,
		name: "Celestial Curse",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psystrike", target);
		},
		target: "normal",
		type: "Psychic",
		isZ: "gothitelliumz",
	},
	"catostrophiccontinentcrash": {
		basePower: 190,
		accuracy: true,
		category: "Physical",
		shortDesc: "Z-Move Effect: The opponent cannot switch for 3 turns.",
		id: "catostrophiccontinentcrash",
		name: "Catostrophic Continent Crash",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		volatileStatus: 'catostrophiccontinentcrash',
		target: "normal",
		type: "Grass",
		isZ: "torteriumz",
	},
	"superiorstrike": {
		basePower: 190,
		accuracy: true,
		category: "Physical",
		shortDesc: "Lowers the opponent’s Defense and Special Defense by 1 stage but forces Empoleon to switch out (although you can choose who replaces it).",
		id: "superiorstrike",
		name: "Superior Strike",
		pp: 1,
		priority: 0,
		flags: {},
		boosts: {
			def: -1,
			spd: -1,
		},
		selfSwitch: true,
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Water",
		isZ: "empoliumz",
	},
	"infernalflareup": { // TODO: Code the second effect
		basePower: 180,
		accuracy: true,
		category: "Physical",
		shortDesc: "Gains a Flash Fire boost. Deals 20% more damage for every other Fire-type in the party (stacks additively).",
		id: "infernalflareup",
		name: "Infernal Flare Up",
		pp: 1,
		priority: 0,
		flags: {},
		self: {
			volatileStatus: 'flashfire'
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "infernapiumz",
	},
	"crashingcococraze": {
		basePower: 195,
		accuracy: true,
		category: "Physical",
		shortDesc: "Raises Speed and Attack by 2 stages",
		id: "crashingcoco craze",
		name: "Crashing Coco Craze",
		pp: 1,
		priority: 0,
		flags: {},
		selfBoost: {
			boosts: {
				spe: 2,
				atk: 2,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Dragon",
		isZ: "exeggutiumz",
	},
	"frozenflechettes": {
		basePower: 175,
		accuracy: true,
		category: "Physical",
		shortDesc: "Sets Hail and a layer of Spikes.",
		id: "frozenflechettes",
		name: "Frozen Flechettes",
		pp: 1,
		priority: 0,
		flags: {},
		sideCondition: 'spikes',
		weather: 'hail',
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Ice",
		isZ: "alolaslashiumz",
	},
	"indestructablehairwhips": {
		basePower: 175,
		accuracy: true,
		category: "Physical",
		shortDesc: "Drops the foe's Defense by 1 stage and causes it to flinch.",
		id: "indestructablehairwhips",
		name: "Indestructable Hair Whips",
		pp: 1,
		priority: 0,
		flags: {},
		volatileStatus: 'flinch',
		boosts: {
			def: -1,
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Steel",
		isZ: "alodugtriumz",
	},
	"venomousfangbite": {
		basePower: 175,
		accuracy: true,
		category: "Physical",
		shortDesc: "Badly poisons the target.",
		id: "venomousfangbite",
		name: "Venomous Fang Bite",
		pp: 1,
		priority: 0,
		flags: {},
		status: 'tox',
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Poison",
		isZ: "arbokiumz",
	},
	"strikingjawcrush": {
		basePower: 180,
		accuracy: true,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "strikingjawcrush",
		name: "Striking Jaw Crush",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Dark",
		isZ: "aloraticiumz",
	},
	"emperorsnewland": {
		basePower: 185,
		accuracy: true,
		category: "Physical",
		shortDesc: "Target gets -1 Evasion.",
		id: "emperorsnewland",
		name: "Emperor's New Land",
		pp: 1,
		priority: 0,
		flags: {},
		boosts: {
			eva: -1,
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Ground",
		isZ: "kingiumz",
	},
	"goldencoinbarrage": {
		basePower: 40,
		accuracy: true,
		category: "Physical",
		shortDesc: "Attack hits 5 times. Each hit heightens Meowth speed by 1, to a total of 5 stages. Prize money will be tripled after battle.",
		id: "goldencoinbarrage",
		name: "Golden Coin Barrage",
		pp: 1,
		priority: 0,
		flags: {},
		multihit: 5,
		selfBoost: {
			boosts: {
				spe: 1,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Normal",
		isZ: "meowthiumz",
	},
	"partingburst": {
		basePower: 0,
		accuracy: true,
		category: "Status",
		shortDesc: "Lowers all stats by 1 stage and switches out. (Acc/Eva excluded)",
		id: "partingburst",
		name: "Parting Burst",
		pp: 1,
		priority: 0,
		flags: {},
		selfSwitch: true,
		boosts: {
			atk: -1,
			def: -1,
			spa: -1,
			spd: -1,
			spe: -1
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Dark",
		isZ: "alopersiumz",
	},
	"stampedingsolarstrike": {
		basePower: 190,
		accuracy: true,
		category: "Physical",
		shortDesc: "Changes the weather to Sunlight prior to damage. Increases Speed by 1 stage. Burns the target.",
		id: "stampedingsolarstrike",
		name: "Stampeding Solar Strike",
		pp: 1,
		priority: 0,
		flags: {},
		weather: 'sunnyday',
		status: 'brn',
		selfBoost: {
			boosts: {
				spe: 1,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "rapidashiumz",
	},
	"necroticburst": {
		basePower: 195,
		accuracy: true,
		category: "Physical",
		shortDesc: "Hits all adjacent foes, has a 50% chance to poison the target(s).",
		id: "necroticburst",
		name: "Necrotic Burst",
		pp: 1,
		priority: 0,
		flags: {},
		secondary: {
			chance: 50,
			status: 'psn',
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "allAdjacentFoes",
		type: "Poison",
		isZ: "alomukiumz",
	},
	"sneakyshadestrike": {
		basePower: 170,
		accuracy: true,
		category: "Special",
		shortDesc: "Drains 25% of the damage dealt.",
		id: "sneakyshadestrike",
		name: "Sneaky Shade Strike",
		pp: 1,
		priority: 0,
		flags: {},
		drain: [1, 4],
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Sneak", target);
		},
		target: "normal",
		type: "Ghost",
		isZ: "gengariumz",
	},
	"superrazorcrusher": {
		basePower: 185,
		accuracy: true,
		category: "Physical",
		shortDesc: "Ignores defensive stat boosts. Drops target's Defense by 2 stages. ",
		id: "superrazorcrusher",
		name: "Super Razor Crusher",
		pp: 1,
		priority: 0,
		flags: {},
		boosts: {
			def: -2,
		},
		ignoreDefensive: true,
		ignoreEvasion: true,
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Bug",
		isZ: "pinsiriumz",
	},
	"annihilatingancientamber": {
		basePower: 200,
		accuracy: true,
		category: "Physical",
		shortDesc: "Summons Stealth Rock on the target's side of the field.",
		id: "annihilatingancientamber",
		name: "Annihilating Ancient Amber",
		pp: 1,
		priority: 0,
		flags: {},
		sideCondition: 'stealthrock',
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Flying",
		isZ: "amberiumz",
	},
	"supernovastrike": {
		basePower: 200,
		accuracy: true,
		category: "Special",
		defensiveCategory: "Physical",
		shortDesc: "Calculates damage using foe's Defense, sets up Psychic Terrain.",
		id: "supernovastrike",
		name: "Supernova Strike",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.setTerrain('psychicterrain');
				},
			},
		},
		target: "normal",
		type: "Psychic",
		isZ: "mewtwoniumz",
	},
	"fantasticforestfortress": {
		basePower: 180,
		accuracy: true,
		category: "Physical",
		shortDesc: "Sets up Light Screen and Reflect.",
		id: "fantasticforestfortress",
		name: "Fantastic Forest Fortress",
		pp: 1,
		priority: 0,
		flags: {},
		sideCondition: ['reflect', 'lightscreen'],
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Grass",
		isZ: "meganiumz",
	},
	"eruptiondestruction": { // TODO: Code the effect
		basePower: 210,
		accuracy: true,
		category: "Special",
		shortDesc: "Removes all field effects.",
		id: "eruptiondestruction",
		name: "Eruption Destruction",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "typhlosiumz",
	},
	"ferociousdeathroll": { // TODO: Code the effect
		basePower: 190,
		accuracy: true,
		category: "Physical",
		shortDesc: "After dealing damage, all grounded water type Pokemon have their Attack and Special Attack raised by one stage (similar to Rototiller).",
		id: "ferociousdeathroll",
		name: "Ferocious Death Roll",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dive", target);
		},
		onHit(target, source) {
			let targets = [];
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.runImmunity('Ground'))	continue;
				if (pokemon.hasType('Water')) {
					// This effect affects every grounded Water-type Pokemon in play.
					targets.push(pokemon);
				}
			}
			for (const pokemon of targets) {
				this.boost({atk: 1, spa: 1}, pokemon, source);
			}
		},
		target: "normal",
		type: "Water",
		isZ: "feraligatiumz",
	},
	"rhinorush": {
		basePower: 195,
		accuracy: true,
		category: "Physical",
		shortDesc: "Forces the target to switch to a random ally.",
		id: "rhinorush",
		name: "Rhino Rush",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		forceSwitch: true,
		target: "normal",
		type: "Bug",
		isZ: "hercroniumz",
	},
	"atimeforgiving": {
		basePower: 100,
		accuracy: true,
		category: "Physical",
		shortDesc: "Always deals Super Effective damage. If used on an ally, heals 50% of the target's max HP instead.",
		id: "atimeforgiving",
		name: "A Time For Giving",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		onTryHit(target, source, move) {
			if (source.side === target.side) {
				move.basePower = 0;
				move.heal = [1, 2];
			}
		},
		onEffectiveness(typeMod, target, type) {
			return 1;
		},
		target: "normal",
		type: "Normal",
		isZ: "delibiumz",
	},
	"roseofkojin": {
		basePower: 180,
		accuracy: true,
		category: "Physical",
		shortDesc: "Target is trapped and damaged for three turns.",
		id: "roseofkojin",
		name: "Rose of Kōjin",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		volatileStatus: 'partiallytrapped',
		target: "normal",
		type: "Fire",
		isZ: "enteiumz",
	},
	"mythicaltempest": {
		basePower: 180,
		accuracy: true,
		category: "Special",
		shortDesc: "Sets Heavy Rain and Psychic Terrain, changes the enemy's type to Water after damage",
		id: "mythicaltempest",
		name: "Mythical Tempest",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		terrain: 'psychicterrain',
		weather: 'primordialsea',
		onHit(target) {
			if (!target.setType('Water')) {
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Water');
		},
		target: "normal",
		type: "Flying",
		isZ: "lugiumz",
	},
	"leafmaelstrom": {
		basePower: 150,
		accuracy: true,
		category: "Special",
		shortDesc: "Raises SpA by 2 stages",
		id: "leafmaelstrom",
		name: "Leaf Maelstrom",
		pp: 1,
		priority: 0,
		flags: {},
		selfBoost: {
			boosts: {
				spa: 2,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Grass",
		isZ: "sceptiliumz",
	},
	"blazingmeteorkick": {
		basePower: 160,
		accuracy: true,
		category: "Physical",
		shortDesc: "Greatly boosted crit ratio. Burns the target.",
		id: "blazingmeteorkick",
		name: "Blazing Meteor Kick",
		pp: 1,
		priority: 0,
		flags: {},
		status: 'brn',
		critRatio: 2,
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "blazikiumz",
	},
	"recklesshydrohammering": {
		basePower: 210,
		accuracy: true,
		category: "Physical",
		shortDesc: "Summons Rain.",
		id: "recklesshydrohammering",
		name: "Reckless Hydro Hammering",
		pp: 1,
		priority: 0,
		flags: {},
		weather: 'RainDance',
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Water",
		isZ: "swampiumz",
	},
	"sleightofhand": {
		basePower: 0,
		accuracy: true,
		category: "Status",
		shortDesc: "Changes the target's ability to Stall.",
		id: "sleightofhand",
		name: "Sleight of Hand",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		onHit(pokemon) {
			let oldAbility = pokemon.setAbility('stall');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Stall', '[from] move: Sleight of Hand');
				return;
			}
			return false;
		},
		target: "normal",
		type: "Dark",
		isZ: "sabliumz",
	},
	"harshtoothhoning": {
		basePower: 200,
		accuracy: true,
		category: "Physical",
		shortDesc: "+2 Atk, +1 Def",
		id: "harshtoothhoning",
		name: "Harsh Tooth Honing",
		pp: 1,
		priority: 0,
		flags: {},
		selfBoost: {
			boosts: {
				atk: 2,
				def: 1,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Steel",
		isZ: "mawiliumz",
	},
	"armorbuildblades": {
		basePower: 160,
		accuracy: true,
		category: "Physical",
		shortDesc: "+3 Def and +1 SpD, hits all adjacent foes.",
		id: "armorbuildblades",
		name: "Armor-Build Blades",
		pp: 1,
		priority: 0,
		flags: {},
		selfBoost: {
			boosts: {
				def: 3,
				spd: 1,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "allAdjacentFoes",
		type: "Rock",
		isZ: "regirockiumz",
	},
	"fortifyingfroststorm": {
		basePower: 160,
		accuracy: true,
		category: "Special",
		shortDesc: "+1 Def and +3 SpD, hits all adjacent foes.",
		id: "fortifyingfroststorm",
		name: "Fortifying Frost Storm",
		pp: 1,
		priority: 0,
		flags: {},
		selfBoost: {
			boosts: {
				def: 1,
				spd: 3,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "allAdjacentFoes",
		type: "Ice",
		isZ: "regiciumz",
	},
	"ultimatealloycannon": {
		basePower: 160,
		accuracy: true,
		category: "Special",
		shortDesc: "+2 Def and +2 SpD, hits all adjacent foes.",
		id: "ultimatealloycannon",
		name: "Ultimate Alloy Cannon",
		pp: 1,
		priority: 0,
		flags: {},
		selfBoost: {
			boosts: {
				def: 2,
				spd: 2,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "allAdjacentFoes",
		type: "Steel",
		isZ: "registeeliumz",
	},
	"divebomb": {
		basePower: 200,
		accuracy: true,
		category: "Physical",
		shortDesc: "50% recoil",
		id: "divebomb",
		name: "Dive Bomb",
		pp: 1,
		priority: 0,
		flags: {},
		recoil: [1, 2],
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Flying",
		isZ: "staraptiumz",
	},
	"superpop": {
		basePower: 300,
		accuracy: true,
		category: "Physical",
		shortDesc: "Priority +1. User faints.",
		id: "superpop",
		name: "Super POP!",
		pp: 1,
		priority: 1,
		selfdestruct: "always",
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "allAdjacent",
		type: "Normal",
		isZ: "drifbliumz",
	},
	"nobleforestserpent": {
		basePower: 0,
		accuracy: true,
		category: "Status",
		shortDesc: "Inflicts Confusion, Paralysis, and -1 Atk/SpA/Spe.",
		id: "nobleforestserpent",
		name: "Noble Forest Serpent",
		pp: 1,
		priority: 0,
		flags: {},
		status: 'par',
		volatileStatus: 'confusion',
		boosts: {
			atk: -1,
			spa: -1,
			spe: -1,
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Normal",
		isZ: "serperiumz",
	},
	"rockcrushinggrip": {
		basePower: 190,
		accuracy: true,
		category: "Special",
		defensiveCategory: "Physical",
		shortDesc: "Damages target based on Defense, not Sp. Def.",
		id: "rockcrushinggrip",
		name: "Rock-Crushing Grip",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Psychic",
		isZ: "reuniumz",
	},
	"hauntedignis": {
		basePower: 160,
		accuracy: true,
		category: "Special",
		shortDesc: "Combines Fire in its type effectiveness. Burns the target.",
		id: "hauntedignis",
		name: "Haunted Ignis",
		pp: 1,
		priority: 0,
		status: 'brn',
		flags: {},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.getEffectiveness('Fire', type);
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blue Flare", target);
		},
		target: "normal",
		type: "Ghost",
		isZ: "chandeluriumz",
	},
	"searingspell": {
		basePower: 175,
		accuracy: true,
		category: "Special",
		shortDesc: "Lowers Target's Atk, Sp.Atk by 1.",
		id: "searingspell",
		name: "Searing Spell",
		pp: 1,
		priority: 0,
		flags: {},
		boosts: {
			atk: -1,
			spa: -1,
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "delphoxiumz",
	},
	"blazingbulletstrike": {
		basePower: 190,
		accuracy: true,
		category: "Physical",
		shortDesc: "50% recoil.",
		id: "blazingbulletstrike",
		name: "Blazing Bullet Strike",
		pp: 1,
		priority: 0,
		flags: {},
		recoil: [1, 2],
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "talonfliumz",
	},
	"drainingribbondance": {
		basePower: 150,
		accuracy: true,
		category: "Special",
		shortDesc: "Steals opponent's stat boosts and regains health from half the damage dealt.",
		id: "drainingribbondance",
		name: "Draining Ribbon Dance",
		pp: 1,
		priority: 0,
		flags: {},
		drain: [1, 2],
		stealsBoosts: true,
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fairy",
		isZ: "sylviumz",
	},
	"ignitedflareoutburst": {
		basePower: 200,
		accuracy: true,
		category: "Special",
		shortDesc: "User has x1.5 power to Fire moves after this attack. Stealth Rock is set up on the foe's side. Traps and burns the target 100% of the time.",
		id: "ignitedflareoutburst",
		name: "Ignited Flare Outburst",
		pp: 1,
		priority: 0,
		flags: {},
		status: 'brn',
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		self: {
			volatileStatus: 'flashfire'
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "volcaniumz",
	},
	"beakoverdrive": {
		basePower: 200,
		accuracy: true,
		category: "Physical",
		shortDesc: "Burns the target. x1.5 power to user's Fire-type moves after this attack, but lowers the user's Sp. Atk by 2.",
		id: "beakoverdrive",
		name: "Beak Overdrive",
		pp: 1,
		priority: 0,
		flags: {},
		status: 'brn',
		self: {
			volatileStatus: 'flashfire'
		},
		selfBoost: {
			boosts: {
				spa: -2,
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "toucanniumz",
	},
	"horseshoerack": {
		basePower: 180,
		accuracy: true,
		category: "Physical",
		shortDesc: "Forces the target to switch to a random ally.",
		id: "horseshoerack",
		name: "Horse Shoe Rack",
		pp: 1,
		priority: 0,
		flags: {},
		forceSwitch: true,
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "High Horsepower", target);
		},
		target: "normal",
		type: "Ground",
		isZ: "mudsdaliumz",
	},
	"coconutcrash": {
		basePower: 175,
		accuracy: true,
		category: "Physical",
		shortDesc: "Lower's the target's Def by 2 stages.",
		id: "coconutcrash",
		name: "Coconut Crash",
		pp: 1,
		priority: 0,
		flags: {},
		boosts: {
			def: -2,
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fighting",
		isZ: "passimiumz",
	},
	"abhorrentabsorbingabyss": {
		basePower: 195,
		accuracy: true,
		category: "Special",
		shortDesc: "Drains 50% of damage done to the target.",
		id: "abhorrentabsorbingabyss",
		name: "Abhorrent Absorbing Abyss",
		pp: 1,
		priority: 0,
		flags: {},
		drain: [1, 2],
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Ground",
		isZ: "palossandiumz",
	},
	"relicdragonroar": {
		basePower: 220,
		accuracy: true,
		category: "Special",
		shortDesc: "+1 SpA, but inflicts confusion on self.",
		id: "relicdragonroar",
		name: "Relic Dragon Roar",
		pp: 1,
		priority: 0,
		flags: {},
		selfBoost: {
			boosts: {
				spa: 1,
			},
		},
		self: {
			volatileStatus: 'confusion'
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Dragon",
		isZ: "drampiumz",
	},
	"slaughteringslash": {
		basePower: 160,
		accuracy: true,
		category: "Physical",
		shortDesc: "Summons Grassy Terrain.",
		id: "slaughteringslash",
		name: "Slaughtering Slash",
		pp: 1,
		priority: 0,
		flags: {},
		terrain: 'grassyterrain',
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Razor Wind", target);
		},
		target: "normal",
		type: "Steel",
		isZ: "kartaniumz",
	},
	"nagavenombomb": {
		basePower: 200,
		accuracy: true,
		category: "Special",
		shortDesc: "Traps the target, lowers their Special Defense and Speed by 1 stage each, and badly poisons them.",
		id: "nagavenombomb",
		name: "Naga Venom Bomb",
		pp: 1,
		priority: 0,
		flags: {},
		boosts: {
			spd: -1,
			spe: -1,
		},
		status: 'tox',
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Downpour", target);
		},
		target: "normal",
		type: "Poison",
		isZ: "naganadeliumz",
	},
	"thestackattacks": {
		basePower: 200,
		accuracy: true,
		category: "Physical",
		shortDesc: "Summons Trick Room.",
		id: "thestackattacks",
		name: "The Stack Attacks",
		pp: 1,
		priority: 0,
		flags: {},
		pseudoWeather: 'trickroom',
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Slide", target);
		},
		target: "normal",
		type: "Rock",
		isZ: "stakatakiumz",
	},
	"nuclearfireworksdisplay": {
		basePower: 200,
		accuracy: true,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "nuclearfireworksdisplay",
		name: "Nuclear Fireworks Display",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mind Blown", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "blacephaliumz",
	},
	"graspofallenergy": {
		basePower: 180,
		accuracy: true,
		category: "Physical",
		shortDesc: "Transforms the opponent’s ability to Normalize and summons Ion Deluge.",
		id: "graspofallenergy",
		name: "Grasp of All Energy",
		pp: 1,
		priority: 0,
		flags: {},
		pseudoWeather: 'iondeluge',
		onHit(pokemon) {
			let oldAbility = pokemon.setAbility('normalize');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Normalize', '[from] move: Grasp of All Energy');
				return;
			}
			return false;
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Electric",
		isZ: "zeraoriumz",
	},
	"fortressofthorns": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user sets up Grassy Terrain and is protected from most attacks made by other Pokemon during this turn, and Pokemon making contact with the user lose 1/4 of their maximum HP, rounded down, and have Spikes set up on their side of the field.  Fails if the user moves last this turn.",
		shortDesc: "Protects from moves and sets up Grassy Terrain. Contact: loses 1/4 max HP, Spikes set up on Attacker's side of the field.",
		id: "fortressofthorns",
		isViable: true,
		name: "Fortress of Thorns",
		pp: 1,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'fortressofthorns',
		onHit(pokemon) {
			pokemon.addVolatile('stall');
			this.field.setTerrain('grassyterrain');
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
					this.damage(source.maxhp / 4, source, target);
					source.side.addSideCondition('spikes');
				}
				return this.NOT_FAILURE;
			},
			onHit(target, source, move) {
				if (move.isZPowered && move.flags['contact']) {
					this.damage(source.maxhp / 4, source, target);
					source.side.addSideCondition('spikes');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Grass",
		isZ: "chesniumz",
	},
	"royalwave": {
		basePower: 200,
		accuracy: true,
		category: "Special",
		shortDesc: "-1 to target's Def, SpD. If user has Sheer Force, damage is multiplied by 1.3 instead.",
		id: "royalwave",
		name: "Royal Wave",
		pp: 1,
		priority: 0,
		flags: {},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
				spd: -1
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Earth Power", target);
		},
		target: "normal",
		type: "Ground",
		isZ: "nidoquiumz",
	},
	"lovelylullaby": {
		basePower: 0,
		accuracy: true,
		category: "Status",
		shortDesc: "The target and user both fall asleep, but the user fully heals up and will wake up twice as fast as normal.",
		id: "lovelylullaby",
		name: "Lovely Lullaby",
		pp: 1,
		priority: 0,
		flags: {},
		status: 'slp',
		self: {
			onTryMove(pokemon) {
				if (pokemon.hp < pokemon.maxhp && pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) return;
				this.add('-fail', pokemon);
				return null;
			},
			onHit(target) {
				if (!target.setStatus('slp')) return false;
				target.addVolatile('lovelylullaby');
				target.statusData.time = 3;
				target.statusData.startTime = 3;
				this.heal(target.maxhp); //Aeshetic only as the healing happens after you fall asleep in-game
				this.add('-status', target, 'slp', '[from] move: Lovely Lullaby');
			},
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fairy",
		isZ: "wiggliumz",
	},
	"flamingforceout": {
		basePower: 200,
		accuracy: true,
		category: "Physical",
		shortDesc: "If the target is lighter than the user, it gets forcibly switched out.",
		id: "flamingforceout",
		name: "Flaming Force Out",
		pp: 1,
		priority: 0,
		flags: {},
		onAfterMove(source, target, move) {
			if (source.weightkg > target.weightkg) {
				move.forceSwitch = true;
			}
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "emboariumz",
	},
	"sharpshellstrike": {
		basePower: 40,
		accuracy: true,
		category: "Physical",
		shortDesc: "Hits five times. The second and fourth hits always lower the foe's Defense by 1 stage.",
		id: "sharpshellstrike",
		name: "Sharp Shell Strike",
		pp: 1,
		priority: 0,
		flags: {},
		multihit: 5,
		onModifyMove(move) {
			if (move.hit === 2 || move.hit === 4) {
				move.boosts = {
					def: -1
				};
			}
		},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		target: "normal",
		type: "Water",
		isZ: "samurottiumz",
	},
	"clumsycommotion": {
    basePower: 0,
    accuracy: true,
    category: "Status",
    shortDesc: "Restores HP to full and heals any status ailments but lowers Attack and Speed by two stages. Confuses all adjacent Pokemon.",
    id: "clumsycommotion",
    name: "Clumsy Commotion",
    pp: 1,
    priority: 0,
    flags: {},
    volatileStatus: 'confusion',
    self: {
        boosts: {
            atk: -2,
            spe: -2,
        },
        onHit(pokemon) {
            pokemon.cureStatus();
            this.heal(pokemon.maxhp);
        },
    },
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    target: "normal",
    type: "allAdjacent",
    isZ: "spindiumz",
},
"loyaltylunge": {
    basePower: 0,
    basePowerCallback(pokemon) {
        return Math.floor((pokemon.happiness) * 101 / 255) + 102;
    },
    accuracy: true,
    category: "Physical",
    shortDesc: "Increases with happiness (102BP at minimum, 203BP at maximum).",
    id: "loyaltylunge",
    name: "Loyalty Lunge",
    pp: 1,
    priority: 0,
    flags: {},
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    target: "normal",
    type: "Normal",
    isZ: "loppiumz",
},
"timecrash": {
    basePower: 180,
    accuracy: true,
    category: "Special",
    shortDesc: "+1 Priority and calls Doom Desire after damage.",
    id: "timecrash",
    name: "Time Crash",
    pp: 1,
    priority: 1,
    flags: {},
    onAfterHit(target, pokemon) {
        this.useMove("Doom Desire", pokemon);
    },
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    target: "normal",
    type: "Dragon",
    isZ: "dialgiumz",
},
"zealouszephyrzap": {
    basePower: 180,
    accuracy: true,
    category: "Physical",
    shortDesc: "Changes the Terrain to Electric Terrain prior to damage. Increases Speed by 1 stage. Paralyses the target.",
    id: "zealouszephyrzap",
    name: "Zealous Zephyr Zap",
    pp: 1,
    priority: 0,
    flags: {},
    terrain: 'electricterrain',
    status: 'par',
    selfBoost: {
        boosts: {
            spe: 1,
        },
    },
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    target: "normal",
    type: "Electric",
    isZ: "zebstrikiumz",
},
"jackfrostscruelty": {
    basePower: 200,
    accuracy: true,
    category: "Special",
    shortDesc: "Summons Hail. Super-effective against Water-types. 30% chance of freezing the target(s).",
    id: "jackfrostscruelty",
    name: "Jack Frost's Cruelty",
    pp: 1,
    priority: 0,
    flags: {},
    weather: 'hail',
    onEffectiveness(typeMod, target, type) {
        if (type === 'Water') return 1;
    },
    secondary: {
        chance: 30,
        status: 'frz',
    },
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    target: "allAdjacentFoes",
    type: "Ice",
    isZ: "jackfrostiumz",
},
"ignisveritatis": {
    basePower: 200,
    accuracy: true,
    category: "Special",
    shortDesc: "Sets the weather to harsh sunlight. Base Power doubles if the Z-Move Fulgur Idealis was used immediately beforehand.",
    id: "ignisveritatis",
    name: "Ignis Veritatis",
    pp: 1,
    priority: 0,
    flags: {},
    weather: 'desolateland',
    onBasePowerPriority: 4,
    onBasePower(basePower, pokemon) {
        for (const active of pokemon.side.active) {
            if (active && active.moveThisTurn === 'fulguridealis') {
                this.debug('double power');
                return this.chainModify(2);
            }
        }
    },
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Overheat", target);
    },
    target: "normal",
    type: "Fire",
    isZ: "reshiramiumz",
},
"fulguridealis": {
    basePower: 200,
    accuracy: true,
    category: "Physical",
    shortDesc: "Sets the weather to heavy rain. Base Power doubles if the Z-Move Ignis Veritatis was used immediately beforehand.",
    id: "fulguridealis",
    name: "Fulgur Idealis",
    pp: 1,
    priority: 0,
    flags: {},
    weather: 'primordialsea',
    onBasePowerPriority: 4,
    onBasePower(basePower, pokemon) {
        for (const active of pokemon.side.active) {
            if (active && active.moveThisTurn === 'ignisveritatis') {
                this.debug('double power');
                return this.chainModify(2);
            }
        }
    },
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Bolt Strike", target);
    },
    target: "normal",
    type: "Electric",
    isZ: "zekromiumz",
},
"shockingshellhell": {
    basePower: 180,
    accuracy: true,
    category: "Special",
    shortDesc: "Inflicts burn. +2Atk/SpA/Spe and -1 Def/SpD to user.",
    id: "shockingshellhell",
    name: "Shocking Shell Hell",
    pp: 1,
    priority: 0,
    flags: {},
    status: 'brn',
    selfBoost: {
        boosts: {
            atk: 2,
            spa: 2,
            spe: 2,
            def: -1,
            spd: -1,
        },
    },
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    target: "normal",
    type: "Fire",
    isZ: "turtoniumz",
},
"dwarfstarcrush": {
    basePower: 200,
    accuracy: true,
    category: "Physical",
    shortDesc: "Combines Fire in its type effectiveness. Ignores abilities and stat changes.",
    id: "dwarfstarcrush",
    name: "Dwarf Star Crush",
    pp: 1,
    priority: 0,
    flags: {},
    onEffectiveness(typeMod, target, type, move) {
        return typeMod + this.getEffectiveness('Fire', type);
    },
    ignoreAbility: true,
    ignoreDefensive: true,
    ignoreEvasion: true,
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    target: "normal",
    type: "Steel",
    isZ: "soliumz",
},
"lunaticlaser": {
    basePower: 200,
    accuracy: true,
    category: "Special",
    shortDesc: "Ignores abilities and stat changes.",
    id: "lunaticlaser",
    name: "Lunatic Laser",
    pp: 1,
    priority: 0,
    flags: {},
    ignoreAbility: true,
    ignoreDefensive: true,
    ignoreEvasion: true,
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    target: "normal",
    type: "Ghost",
    isZ: "luniumz",
},
	"distortedstrike": {
    basePower: 180,
    accuracy: true,
    category: "Physical",
    shortDesc: "Uses the effect of Topsy Turvy on the opponent before damage. After damage, switches the user to Origin Forme.",
    id: "distortedstrike",
    name: "Distorted Strike",
    pp: 1,
    priority: 0,
    flags: {},
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    onTryHit(target) {
        let success = false;
        for (let i in target.boosts) {
            // @ts-ignore
            if (target.boosts[i] === 0) continue;
            // @ts-ignore
            target.boosts[i] = -target.boosts[i];
            success = true;
        }
        if (!success) return false;
        this.add('-invertboost', target, '[from] move: Distorted Strike');
    },
    onHit(pokemon) {
        this.add('-move', pokemon, 'Distorted Strike');
        this.add('-formechange', pokemon, 'Giratina-Origin', '[msg]');
        pokemon.formeChange("Giratina-Origin");
    },
    target: "normal",
    type: "Ghost",
    isZ: "giratiniumz",
},
	"technoburst": {
    basePower: 50,
    accuracy: true,
    category: "Special",
    shortDesc: "Hits 5 times, first hit is Fire-typed, second one is Water-typed, third one is Electric-typed, fourth one is Ice-typed and the last one is Normal-typed. After dealing damage, Genesect gains either an Attack or Special Attack boost, depending on the defenses of the foe it just knocked out.",
    id: "technoburst",
    name: "Techno Burst",
    pp: 1,
    priority: 0,
    flags: {},
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
		  this.useMove('technoburstfire', source);
		  if (target.fainted){
				this.add('-hitcount', target, 1);
			   return null;
		  }
		  this.useMove('technoburstwater', source);
		  if (target.fainted){
				this.add('-hitcount', target, 2);
			   return null;
		  }
		  this.useMove('technoburstelectric', source);
		  if (target.fainted){
				this.add('-hitcount', target, 3);
			   return null;
		  }
		  this.useMove('technoburstice', source);
		  if (target.fainted){
				this.add('-hitcount', target, 4);
			   return null;
		  }
		  this.addMove('move', source, 'Techno Burst (Normal)', target + '[still]');
		  this.add('-anim', source, "Techno Blast", target);
    },
	 onAfterMoveSecondarySelf(pokemon, target, move) {
		this.add('-hitcount', target, 5);
		if (!target || target.fainted || target.hp <= 0){
			if (target.getStat('def', false, true) < target.getStat('spd', false, true)){
				this.boost({atk: 1}, pokemon, pokemon, move);
			} else {
				this.boost({spa: 1}, pokemon, pokemon, move);
			}
		}
	 },
    target: "normal",
    type: "Normal",
    isZ: "genesectiumz",
	},
	"technoburstfire": {
		accuracy: true,
		basePower: 50,
		category: "Special",
		id: "technoburstfire",
  	   shortDesc: "Hits 5 times, first hit is Fire-typed, second one is Water-typed, third one is Electric-typed, fourth one is Ice-typed and the last one is Normal-typed. After dealing damage, Genesect gains either an Attack or Special Attack boost, depending on the defenses of the foe it just knocked out.",
		isViable: true,
		name: "Techno Burst (Fire)",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0){
				if (target.getStat('def', false, true) < target.getStat('spd', false, true)){
					this.boost({atk: 1}, pokemon, pokemon, move);
				} else {
					this.boost({spa: 1}, pokemon, pokemon, move);
				}
			}
		},
		target: "normal",
  	   type: "Fire",
		zMovePower: 50,
	},
	"technoburstwater": {
		accuracy: true,
		basePower: 50,
		category: "Special",
		id: "technoburstfire",
  	   shortDesc: "Hits 5 times, first hit is Fire-typed, second one is Water-typed, third one is Electric-typed, fourth one is Ice-typed and the last one is Normal-typed. After dealing damage, Genesect gains either an Attack or Special Attack boost, depending on the defenses of the foe it just knocked out.",
		isViable: true,
		name: "Techno Burst (Water)",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		target: "normal",
  	   type: "Water",
		zMovePower: 50,
	},
	"technoburstelectric": {
		accuracy: true,
		basePower: 50,
		category: "Special",
		id: "technoburstfire",
  	   shortDesc: "Hits 5 times, first hit is Fire-typed, second one is Water-typed, third one is Electric-typed, fourth one is Ice-typed and the last one is Normal-typed. After dealing damage, Genesect gains either an Attack or Special Attack boost, depending on the defenses of the foe it just knocked out.",
		isViable: true,
		name: "Techno Burst (Electric)",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		target: "normal",
  	   type: "Electric",
		zMovePower: 50,
	},
	"technoburstice": {
		accuracy: true,
		basePower: 50,
		category: "Special",
		id: "technoburstfire",
  	   shortDesc: "Hits 5 times, first hit is Fire-typed, second one is Water-typed, third one is Electric-typed, fourth one is Ice-typed and the last one is Normal-typed. After dealing damage, Genesect gains either an Attack or Special Attack boost, depending on the defenses of the foe it just knocked out.",
		isViable: true,
		name: "Techno Burst (Ice)",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		target: "normal",
  	   type: "Ice",
		zMovePower: 50,
	},
	"metronome": {
		inherit: true,
		noMetronome: ['afteryou', 'assist', 'banefulbunker', 'beakblast', 'belch', 'bestow', 'celebrate', 'chatter', 'copycat', 'counter', 'covet', 'craftyshield', 'destinybond', 'detect', 'diamondstorm', 'dragonascent', 'endure', 'feint', 'fleurcannon', 'focuspunch', 'followme', 'freezeshock', 'helpinghand', 'holdhands', 'hyperspacefury', 'hyperspacehole', 'iceburn', 'instruct', 'kingsshield', 'lightofruin', 'matblock', 'mefirst', 'metronome', 'mimic', 'mindblown', 'mirrorcoat', 'mirrormove', 'naturepower', 'originpulse', 'photongeyser', 'plasmafists', 'precipiceblades', 'protect', 'quash', 'quickguard', 'ragepowder', 'relicsong', 'secretsword', 'shelltrap', 'sketch', 'sleeptalk', 'snarl', 'snatch', 'snore', 'spectralthief', 'spikyshield', 'spotlight', 'steameruption', 'struggle', 'switcheroo', 'technoblast', 'thief', 'thousandarrows', 'thousandwaves', 'transform', 'trick', 'vcreate', 'wideguard', 'technoburstfire', 'technoburstice', 'technoburstelectric', 'technoburstwater', 'ancientservantsascensionrock', 'ancientservantsascensionice', 'ancientservantsascensionsteel'],
		onHit(target, source, effect) {
			let moves = [];
			for (let i in exports.BattleMovedex) {
				let move = exports.BattleMovedex[i];
				if (i !== move.id) continue;
				if (move.isZ || move.isNonstandard) continue;
				// @ts-ignore
				if (effect.noMetronome.includes(move.id)) continue;
				if (this.getMove(i).gen > this.gen) continue;
				moves.push(move);
			}
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num);
				randomMove = this.sample(moves).id;
			}
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, target);
		},
	},
	"auraoflife": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Every Pokemon in the user's party is cured of its major status condition. The user also has its Sp. Attack, Sp. Defense, and Speed raised by 1 stage each for each teammate cured.",
		shortDesc: "Cures the user's party of all status conditions. +1 SpA/SpD/Spe for each status condition cured.",
		id: "auraoflife",
		isViable: true,
		name: "Aura of Life",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Geomancy", target);
		},
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Aura of Life');
			let side = pokemon.side;
			let success = 0;
			for (const ally of side.pokemon) {
				if (ally.cureStatus()) success += 1;
			}
			if (success) this.boost({spa: success, spd: success, spe: success}, pokemon);
			return success;
		},
		target: "allyTeam",
		type: "Fairy",
		isZ: "xerniumz",
	},
	"auraofdeath": {
		accuracy: true,
		basePower: 185,
		category: "Special",
		desc: "The user is healed for 1/6 of its Max HP and has its Sp. Attack and Speed raised by 1 stage each for each of the target's fainted teammates.",
		shortDesc: "+1 SpA/Spe and 1/6 of user's Max HP restored for each of the target's fainted teammates.",
		id: "auraofdeath",
		isViable: true,
		name: "Aura of Death",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Daze", target);
		},
		onModifyMove(move, pokemon, target) {
			let side = target.side;
			let success = 0;
			for (const ally of side.pokemon) {
				if (ally.fainted) success += 1;
			}
			if (success){ 
				move.boosts = {spa: success, spe: success};
				move.heal = [success, 6];
			}
		},
		target: "normal",
		type: "Dark",
		isZ: "yveltiumz",
	},	
	"bringordertotheworld": {
		accuracy: true,
		basePower: 200,
		category: "Physical",
		desc: "Any hazards active on either side become active on both. User gains a boost to its Attack in 10%, Attack and Speed in 50%, and all stats barring Accuracy, Evasion, and Special Attack for Complete.",
		shortDesc: "Any hazards active on either side become active on both. Raises user's Atk by 1 if 10%, Atk/Spe by 1 if 50%, and Atk/Def/SpD/Spe by 1 if Complete.",
		id: "bringordertotheworld",
		name: "Bring Order to the World",
		pp: 1,
		priority: 0,
		flags: {},
		selfBoost: {
			boosts: {
				atk: 1,
				def: 1,
				spd: 1,
				spe: 1,
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Land's Wrath", target);
		},
		onModifyMove(move, source, target) {
			if (source.template.species !== 'Zygarde-Complete') {
				delete move.selfBoost.boosts.def;
				delete move.selfBoost.boosts.spd;
			}
			if (source.template.species === 'Zygarde-10%'){
				delete move.selfBoost.boosts.spe;
			}
		},
		onHit(pokemon) {
			let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			if (pokemon.hp){
				for (const side of this.sides) {
					for (const condition of sideConditions) {
						let sideCondition = side.sideConditions[condition];
						if (sideCondition && !side.foe.sideConditions[condition]) {
							side.foe.addSideCondition(condition);
							if (sideCondition.layers) side.foe.sideConditions[condition].layers = sideCondition.layers;
						}
						if (sideCondition.layers && side.foe.sideConditions[condition] && side.foe.sideConditions[condition].layers && sideCondition.layers < side.foe.sideCondition[condition].layers) sideCondition.layers = side.foe.sideConditions[condition].layers;
					}
				}
			}
		},
		isZ: "zygardiumz",
		target: "allAdjacentFoes",
		type: "Ground",
	},
"unleashedpowerofthedjinn": {
    basePower: 180,
    accuracy: true,
    category: "Special",
    shortDesc: "Ignores screens and protection. Can hit Dark-types.",
    id: "unleashedpowerofthedjinn",
    name: "Unleashed Power of the Djinn",
    pp: 1,
    priority: 1,
    flags: {},
	 breaksProtect: true,
	 infiltrates: true,
	 ignoreImmunity: true,
    onPrepareHit(target, source) {
        this.attrLastMove('[still]');
        this.add('-anim', source, "Revelation Dance", target);
    },
    target: "normal",
    type: "Psychic",
    isZ: "hoopiumz",
},
};
