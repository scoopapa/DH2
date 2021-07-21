export const Moves: {[k: string]: ModdedMoveData} = {
	clangoroussoul: {
		inherit: true,
		isNonstandard: null,
		gen: 7,
	},
	tarshot: {
		inherit: true,
		isNonstandard: null,
		gen: 7,
	},
	infection: {
		num: -1001,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		desc: "The Pokémon at the user's position steals some of the target's maximum HP at the end of each turn. Damage begins at 1/16, rounded down, and increases each turn like Toxic. If Big Root is held by the recipient, the HP recovered is 1.3x normal, rounded half down. If the target uses Baton Pass, the replacement will continue being leeched. If the target switches out, the effect ends.",
		shortDesc: "Target's HP is restored to user every turn. Damage increases like Toxic.",
		name: "Infection",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'infection',
		condition: {
			onStart(target) {
			  this.effectData.stage = 0;
				this.add('-start', target, 'move: Infection');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
	  		if (this.effectData.stage < 15) {
		  		this.effectData.stage++;
		  	}
				const target = this.effectData.source.side.active[pokemon.volatiles['infection'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage, pokemon, target, '[silent]');
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	shedstrike: {
		num: -1002,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		desc: "Damage is calculated using the user's Defense stat as its Attack, including stat stage changes. Other effects that modify the Attack stat are used as normal.",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
		name: "Shed Strike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Last Resort", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	roostercall: {
		num: -1003,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Rooster Call",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		desc: "This move can be used even when the user is asleep. When this move is attempted, all sleeping active Pokémon wake up, including the user.",
		shortDesc: "User may be asleep. All sleeping active Pokémon wake up.",
		sleepUsable: true,
		onTryHit(target) {
			for (const [i, allyActive] of target.side.active.entries()) {
				if (allyActive && allyActive.status === 'slp') allyActive.cureStatus();
				const foeActive = target.side.foe.active[i];
				if (foeActive && foeActive.status === 'slp') foeActive.cureStatus();
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overdrive", target);
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	manifestation: {
		num: -1004,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone. Additionally, this move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
		shortDesc: "Type varies based on primary type. Physical if Atk > Sp. Atk.",
		name: "Manifestation",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	vegetalambush: {
		num: -1005,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 10% chance to make the target flinch.",
		shortDesc: "10% chance to make the target flinch.",
		name: "Vegetal Ambush",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grassy Glide", target);
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	finblade: {
		num: -1006,
		accuracy: 100,
		basePower: 95,
		desc: "This move deals damage to the target based on its Defense instead of Special Defense if the target's Special Defense is greater than or equal to its Defense, including stat stage changes.",
		shortDesc: "Damages based on Def or Sp. Def - whichever is lower on the target.",
		category: "Special",
		defensiveCategory: "Physical",
		name: "Fin Blade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (target.getStat('def', false, true) >= target.getStat('spd', false, true)) move.defensiveCategory = 'Special';
		},
		onHit(target, source, move) {
			this.hint(move.defensiveCategory + " Fin Blade");
		},
		onAfterSubDamage(target, source, move) {
			this.hint(move.defensiveCategory + " Fin Blade");
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Razor Shell", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	flamingdescent: {
		num: -1007,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Until the end of the turn, Flying-type users lose their Flying type and pure Flying-type users become Normal type.",
		shortDesc: "Flying type removed until the turn ends.",
		name: "Flaming Descent",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sacred Fire", target);
		},
		self: {
			volatileStatus: 'roost',
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	wildclaw: {
		num: -1008,
		accuracy: 95,
		basePower: 120,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		name: "Wild Claw",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	helpingsouls: {
		num: -1009,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			move.allies = pokemon.side.pokemon.filter(ally => ally.fainted);
			if (move.allies.length > 1) {
				this.add('-message', `${move.allies.length} souls are helping ${pokemon.name}!`);
			} else if (move.allies.length) {
				this.add('-message', `A soul is helping ${pokemon.name}!`);
			} else {
				this.add('-message', `There are no souls to help ${pokemon.name}!`);
			}
			return move.basePower + (move.allies.length * 20);
		},
		category: "Physical",
		desc: "Power is equal to 60+(X*20), where X is the number of fainted Pokémon in the user's party.",
		shortDesc: "All fainted allies aid in damaging the target.",
		name: "Helping Souls",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poltergeist", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	pridedance: {
		num: -1010,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's most proficient stat and its Speed.",
		name: "Pride Dance",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onModifyMove(move, pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in pokemon.storedStats) {
				if (pokemon.storedStats[s] > bestStat) {
					statName = s;
					bestStat = pokemon.storedStats[s];
				}
			}
			if (bestStat === 'spe') {
				move.boosts = {spe: 2};
			} else {
				move.boosts = {statName: 1, spe: 1};
			}
		},
		boosts: {
			spe: 1,
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Dance", target);
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	ragingspirit: {
		num: -1011,
		accuracy: 95,
		basePower: 80,
		category: "Physical",
		shortDesc: "Changes Alolan Aegislash into its Blade Forme permanently.",
		name: "Raging Spirit",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (pokemon.species.id === 'aegislashalola' && !pokemon.transformed) {
				pokemon.formeChange('Aegislash-Alola-Blade', this.effect, true, '[msg]');
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Lash", target);
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	cocofall: {
		num: -1012,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Does another 50 damage two turns later.",
		name: "Coco Fall",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'cocofall',
				source: source,
				moveData: {
					id: 'cocofall',
					name: "Coco Fall",
					accuracy: 100,
					basePower: 0,
					damage: 50,
					category: "Physical",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Grass',
				},
			});
			this.add('-message', `Another coconut will fall and do 50 damage in two turns!`);
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Barrage", target);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	pointypine: {
		num: -1013,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Does damage equal to 1/8 of the target's maximum HP for three turns.",
		name: "Pointy Pine",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'pointypine',
		condition: {
			duration: 4,
			onStart(target) {
				this.add('-message', `Pointy pine needles stuck into ${target.name}!`);
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(target) {
				this.add('-message', `Pointy pine needles stuck into ${target.name}!`);
				this.damage(target.baseMaxhp / 8, target);
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "G-Max Vine Lash", target);
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	heathaze: {
		num: -1014,
		accuracy: true,
		basePower: 50,
		category: "Physical",
		shortDesc: "Clears the target's stat changes.",
		name: "Heat Haze",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clear Smog", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	thunderhead: {
		num: -1015,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Summons rain at the end of the following turn.",
		name: "Thunderhead",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		pseudoWeather: 'thunderhead',
		condition: {
			duration: 2,
			onEnd() {
				this.field.setWeather('raindance');
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rising Voltage", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		maxMove: {basePower: 140},
	},
	tidechange: {
		num: -1016,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User is healed for 1/4 max HP, or instead cures its status if used last, then switches out.",
		name: "Tide Change",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, heal: 1, authentic: 1},
		heal: [1, 4],
		selfSwitch: true,
		onModifyMove(move, pokemon) {
			let refresh = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					refresh = false;
					break;
				}
			}
			if (refresh) {
				delete move.heal;
			}
		},
		onHit(pokemon) {
			let refresh = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					refresh = false;
					break;
				}
			}
			if (refresh) {
				if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
				pokemon.cureStatus();
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Life Dew", target);
		},
		secondary: null,
		target: "self",
		type: "Water",
	},
	afterburn: {
		num: -1017,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "Does damage two turns after use.",
		name: "Afterburn",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'afterburn',
				source: source,
				moveData: {
					id: 'afterburn',
					name: "Afterburn",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Fire',
				},
			});
			this.add('-message', `${source.name} prepared to use Afterburn!`);
			return null;
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heat Wave", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	polarize: {
		num: -1018,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Forces all active Pokémon to switch at random.",
		name: "Polarize",
		pp: 20,
		priority: -6,
		flags: {reflectable: 1, mirror: 1, authentic: 1, mystery: 1},
		forceSwitch: true,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gear Up", target);
		},
		secondary: null,
		target: "all",
		type: "Steel",
		zMove: {effect: 'healreplacement'},
		contestType: "Clever",
	},
	cinders: {
		num: -1019,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Hazard with three layers: damages for 1/16 or 1/8, then burns if three layers.",
		name: "Cinders",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'cinders',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Cinders');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.add('-sidestart', side, 'Cinders');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Fire')) {
					this.add('-sideend', pokemon.side, 'move: Cinders', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('cinders');
				}
				if (pokemon.hasItem('cinderberry')) {
					pokemon.eatItem;
					return;
				}
				if (pokemon.hasType('Ice') && pokemon.hasItem('adventurerspickaxe')) return;
				if (pokemon.hasItem('parachute')) {
					pokemon.useItem;
					return;
				}
				const damageAmounts = [0, 1, 2, 2]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 8);
				if (this.effectData.layers >= 3) {
					pokemon.trySetStatus('brn', pokemon.side.foe.active[0]);
				}
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spikes", target);
		},
		secondary: null,
		target: "foeSide",
		type: "Fire",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('gravelberry')) {
					pokemon.eatItem;
					return;
				}
				if (pokemon.hasType('Ice') && pokemon.hasItem('adventurerspickaxe')) return;
				if (pokemon.hasItem('parachute')) {
					pokemon.useItem;
					return;
				}
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
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
				if (pokemon.hasItem('spikyberry')) {
					pokemon.eatItem;
					return;
				}
				if (pokemon.hasType('Ice') && pokemon.hasItem('adventurerspickaxe')) return;
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('parachute')) {
					pokemon.useItem;
					return;
				}
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
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
				if (pokemon.hasItem('toxicspikyberry')) {
					pokemon.eatItem;
					return;
				}
				if (pokemon.hasType('Ice') && pokemon.hasItem('adventurerspickaxe')) return;
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel')) {
					return;
				} else if (pokemon.hasItem('parachute')) {
					pokemon.useItem;
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
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
				if (pokemon.hasItem('gooeyberry')) {
					pokemon.eatItem;
					return;
				}
				if (pokemon.hasType('Ice') && pokemon.hasItem('adventurerspickaxe')) return;
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('parachute')) {
					pokemon.useItem;
					return;
				}
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	wrathfulsoulstrike: {
		num: -1020,
		accuracy: true,
		basePower: 160,
		category: "Physical",
		name: "Wrathful Soulstrike",
		pp: 1,
		priority: 0,
		flags: {},
		onModifyMove(pokemon, target, move) {
			move.allies = pokemon.side.pokemon.filter(ally => ally.fainted);
			if (move.allies.length > 1) {
				this.add('-message', `${move.allies.length} souls are helping ${pokemon.name}!`);
			} else if (move.allies.length) {
				this.add('-message', `A soul is helping ${pokemon.name}!`);
			} else {
				this.add('-message', `There are no souls to help ${pokemon.name}!`);
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.allies.length) {
				const boost: SparseBoostsTable = {};
				if (move.allies.length > 0) boost['atk'] = 1;
				if (move.allies.length > 1) boost['def'] = 1;
				if (move.allies.length > 2) boost['spa'] = 1;
				if (move.allies.length > 3) boost['spd'] = 1;
				if (move.allies.length > 4) boost['spe'] = 1;
				this.boost(boost, pokemon);
			}
		},
		isZ: "tikilohiumz",
		secondary: {
			// Sheer Force negates the selfBoost even though it is not secondary
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Never-Ending Nightmare", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},
	eternalnightmare: {
		num: -1021,
		accuracy: true,
		basePower: 155,
		category: "Special",
		name: "Eternal Nightmare",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "plubiumz",
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				def: -1,
				spa: -1,
				spd: -1,
				spe: -1,
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Never-Ending Nightmare", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	shedimpact: {
		num: -1022,
		accuracy: true,
		basePower: 185,
		category: "Physical",
		name: "Shed Impact",
		pp: 1,
		priority: 0,
		useSourceDefensiveAsOffensive: true,
		flags: {},
		isZ: "forsnakiumz",
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Breakneck Blitz", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	deepseastrike: {
		num: -1023,
		accuracy: true,
		basePower: 185,
		category: "Physical",
		name: "Deep Sea Strike",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "angleviumz",
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.setWeather('raindance');
				},
			},
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Vortex", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	precipitationcrash: {
		num: -1024,
		accuracy: true,
		basePower: 190,
		category: "Physical",
		name: "Precipitation Crash",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "castforiumz",
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.secondaries.push({
					chance: 100,
					status: 'brn',
				});
				break;
			case 'hail':
				move.secondaries.push({
					chance: 100,
					boosts: {
						spd: -1,
					},
				});
				break;
			}
		},
		onHit(target, source) {
			if (['raindance', 'primordialsea'].includes(source.effectiveWeather())) return;
			if (target.getTypes().join() === 'Water' || !target.setType('Water')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Water');
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			switch (source.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				this.add('-anim', source, "Inferno Overdrive", target);
				break;
			case 'raindance':
			case 'primordialsea':
				this.add('-anim', source, "Hydro Vortex", target);
				break;
			case 'sandstorm':
				this.add('-anim', source, "Continental Crush", target);
				break;
			case 'hail':
				this.add('-anim', source, "Subzero Slammer", target);
				break;
			case '':
				this.add('-anim', source, "Breakneck Blitz", target);
			}
		},
		secondary: {
			// Sheer Force negates the selfBoost even though it is not secondary
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	viralfreeze: {
		num: -1025,
		accuracy: true,
		basePower: 155,
		category: "Special",
		name: "Viral Freeze",
		pp: 1,
		priority: 0,
		useSourceDefensiveAsOffensive: true,
		flags: {},
		isZ: "snoxiumz",
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Subzero Slammer", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},
	clangorousascent: {
		num: -1026,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		name: "Clangorous Ascent",
		pp: 1,
		priority: 1,
		flags: {},
		isZ: "komodondiumz",
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clangorous Soulblaze", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "cool",
	},
	stickysoil: {
		num: -1027,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Sticky Soil",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thousand Waves", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
	},
};