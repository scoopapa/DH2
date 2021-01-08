export const Moves: {[k: string]: ModdedMoveData} = {
	clangoroussoul: {
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
		basePower: 130,
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
			if (move.allies.length) {
				this.add('-message', `${move.allies.length} souls are helping ${pokemon.name}!`);
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
};
