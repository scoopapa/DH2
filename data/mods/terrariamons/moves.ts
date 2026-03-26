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
	
	enchantedboomerang: {
		name: "Enchanted Boomerang",
		type: "Psychic",
		category: "Physical",
		basePower: 45,
		accuracy: 90,
		pp: 10,
		shortDesc: "Hits twice.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Fling", target);
		},
		multihit: 2,
		multiaccuracy: false,
		secondary: null,
		target: "normal",
	},
	
	diamondbeam: {
		name: "Diamond Beam",
		type: "Normal",
		category: "Special",
		basePower: 100,
		accuracy: 100,
		pp: 5,
		shortDesc: "No effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tera Blast", target);
		},
		secondary: null,
		target: "normal",
	},
	
	crimsonrod: {
		name: "Crimson Rod",
		type: "Poison",
		category: "Special",
		basePower: 70,
		accuracy: 100,
		pp: 5,
		shortDesc: "Causes heavy rain to fall.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sludge Bomb", target);
			this.actions.useMove("Rain Dance", pokemon);
		},
		secondary: null,
		target: "normal",
	},
	
	starfury: {
		name: "Starfury",
		type: "Flying",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "Becomes special if the user has higher special attack.",
		priority: 0,
		flags: {slicing: 1, contact: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) < pokemon.getStat('spa', false, true)){
				move.category = 'Special';
				move.flags.contact = 0;
				move.flags.slicing = 0;
				move.flags.bypasssub = 1;
			}
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			if(move.category === 'Special') this.add('-anim', pokemon, "Tera Starstorm", target);
			else this.add('-anim', pokemon, "Psycho Cut", target);
		},
		secondary: null,
		target: "normal",
	},
	
	nightsedge: {
		name: "Night's Edge",
		type: "Dark",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 5,
		shortDesc: "Increased critical hit rate.",
		priority: 0,
		flags: {slicing: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Night Slash", target);
		},
		critRatio: 2,
		secondary: null,
		target: "normal",
	},
	
	crystaldart: {
		name: "Crystal Dart",
		type: "Fairy",
		category: "Physical",
		basePower: 85,
		accuracy: 100,
		pp: 15,
		shortDesc: "10% chance to flinch.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Dragon Darts", target);
		},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
	},
	
	cursedinferno: {
		name: "Cursed Inferno",
		type: "Fire",
		category: "Special",
		basePower: 65,
		accuracy: 90,
		pp: 10,
		ignoreImmunities: true,
		shortDesc: "50% burn chance, neutral versus fires.",
		priority: 0,
		flags: {defrost: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Inferno", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fire') return 0;
		},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
	},
	
	ichorstream: {
		name: "Ichor Stream",
		type: "Poison",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "100% chance to lower the target's Special Defense.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Acid", target);
		},
		secondary: {
			chance: 100,
			boosts:
			{
				spd: -1,
			}
		},
		target: "normal",
	},
	
	zapinator: { 
		name: "Zapinator!",
		type: "Electric",
		category: "Special",
		basePower: 75,
		accuracy: 100,
		pp: 10,
		shortDesc: "Has various secondary effects.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Charge Beam", target);
		},
		onModifyMove(move, pokemon){
			if(this.randomChance(1, 20)){
				move.selfSwitch = true;
			}
		},
		onBasePower(basePower, pokemon, target) {
			if (this.randomChance(1, 20)) {
				return this.chainModify(2);
			}
		},
		ignoreDefensive: false,
		selfSwitch: false,
		secondaries: [
			{
				chance: 10,
				volatileStatus: 'confusion',
			},
			{
				chance: 20,
				boosts:{
					spa: -1,
				},
			},
			{
				chance: 20,
				boosts:{
					atk: -1,
				},
			},
			{
				chance: 20,
				self: {
					boosts: {
						spe: 1,
					},
				},
			},
			{
				chance: 5,
				self: {
					boosts: {
						spa: 1,
					},
				},
			},
		],
		target: "normal",
	},
	
	terrablade: { 
		name: "Terra Blade",
		type: "Ground",
		category: "Special",
		basePower: 160,
		accuracy: true,
		pp: 10,
		shortDesc: "Can't miss.",
		priority: 0,
		flags: {slicing: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Land's Wrath", target);
		},
		secondary: null,
		target: "normal",
	},
	
	xenopopper: {
		name: "Xenopopper",
		type: "Water",
		category: "Physical",
		basePower: 120,
		accuracy: 85,
		pp: 5,
		shortDesc: "Has a 10% chance to confuse the target.",
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
		this.add('-anim', pokemon, "Bubble", target);
		this.add('-anim', pokemon, "Snipe Shot", target);
		},
		secondary: 
		{
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
	},
	
	crystalserpent: {
		name: "Crystal Serpent",
		type: "Fairy",
		category: "Special",
		basePower: 110,
		accuracy: 90,
		pp: 10,
		shortDesc: "Damages the target's ally.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Magnet Bomb", target);
		},
		onHit(target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(ally.baseMaxhp / 16, ally, source, this.dex.conditions.get('Crystal Serpent'));
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(ally.baseMaxhp / 16, ally, source, this.dex.conditions.get('Crystal Serpent'));
			}
		},
		secondary: null,
		target: "normal",
	},
	
	spacegun: {
		name: "Space Gun",
		type: "Steel",
		category: "Special",
		basePower: 90,
		accuracy: 100,
		pp: 40,
		shortDesc: "No effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Flash Cannon", target);
		},
		secondary: null,
		target: "normal",
	},
	
	naturesgift: {
		name: "Nature's Gift",
		type: "Grass",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Rases Special Attack and Special Defense by 1 stage and cures status effects.",
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Take Heart", target);
		},
		boosts: {
				spa: 1,
				spd: 1,
		},
		onHit(pokemon) {	
			return pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
	},
	
	spinaltap: {
		name: "Spinal Tap",
		type: "Rock",
		category: "Physical",
		basePower: 90,
		accuracy: 95,
		pp: 15,
		shortDesc: "On use, the next Beat Up is 50% stronger.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Accelerock", target);
		},
		self: {
			volatileStatus: 'spinaltap',
		},
		condition:{
			onStart(pokemon) {
				pokemon.addVolatile('spinaltap');
				if(!this.effectState.spinaltap) this.effectState.spinaltap = false;
			},
			onModifyDamage(damage, source, target, move) {
				if(['beatup'].includes(move.id)){
					this.effectState.spinaltap = true;
					return this.chainModify(1.5);
				}
			},
			onResidual(pokemon){
				if(this.effectState.spinaltap){
					pokemon.removeVolatile('spinaltap');
				}
			},
		},
		secondary: null,
		target: "normal",
	},
		
	beegun: {
		name: "Bee Gun",
		type: "Bug",
		category: "Special",
		basePower: 50,
		accuracy: 100,
		pp: 20,
		shortDesc: "Usually goes first.",
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bug Buzz", target);
		},
		secondary: null,
		target: "normal",
	},
	
	poisonstaff: {
		name: "Poison Staff",
		type: "Poison",
		category: "Special",
		basePower: 110,
		accuracy: 85,
		pp: 10,
		shortDesc: "30% chance to poison.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Nasty Plot", target);
			this.add('-anim', pokemon, "Poison Fang", target);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
	},
	
	cutlass: {
		name: "Cutlass",
		type: "Steel",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "Increased critical hit rate.",
		priority: 0,
		critRatio: 2,
		flags: {slicing: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Smart Strike", target);
		},
		secondary: null,
		target: "normal",
	},
	
	laserdrill: {
		name: "Laser Drill",
		type: "Steel",
		category: "Physical",
		basePower: 85,
		accuracy: true,
		pp: 15,
		shortDesc: "Can't miss.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Iron Head", target);
		},
		secondary: null,
		target: "normal",
	},
	
	daedalusstormbow: { 
		name: "Daedalus Stormbow",
		type: "Steel",
		category: "Physical",
		basePower: 10,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits 5 times as a Steel type move, then hits 5 times as a Fairy type move. Only Steel is considered when determining STAB.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thousand Arrows", target);
		},
		onAfterMove(pokemon) {
			this.actions.useMove("Holy Arrows", pokemon);
		},
		multihit: 5,
		secondary: null,
		target: "randomNormal",
	},
	
	excalibur: {
		name: "Excalibur",
		type: "Fairy",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 5,
		shortDesc: "Ignores changes in defense.",
		priority: 0,
		ignoreDefensive: true, // It's going to be a bit annoying for Stardust's design if this flag ignores ALL changes and not changes to just physdef.
		flags: {slicing: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sacred Sword", target);
		},
		secondary: null,
		target: "normal",
	},
	superstarshooter: {
		name: "Super Star Shooter",
		type: "Fairy",
		category: "Special",
		basePower: 110,
		accuracy: 90,
		pp: 2.5,
		shortDesc: "Has very low PP.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tera Starstorm", target);
		},
		secondary: null,
		target: "normal",
	},
		
	brandoftheinferno: { 
		name: "Brand of the Inferno",
		type: "Fighting",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 15,
		shortDesc: "This move goes last, but burns attackers who come into contact with it.",
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sacred Sword", target);
		},
		priorityChargeCallback(pokemon, target, move) {
			this.add('-anim', pokemon, "Iron Defense", target);
			pokemon.addVolatile('Brand of the Inferno');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Brand of the Inferno');
			},
			onHit(target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('brn', target);
				}
			},
		},
		onAfterMove(pokemon, target) {
			pokemon.removeVolatile('brandoftheinferno');
		},
		secondary: null,
		target: "normal",
	},
		
	explosivetrapstaff: {
		name: "Explosive Trap Staff",
		type: "Fire",
		category: "Special",
		basePower: 70,
		accuracy: 100,
		pp: 10,
		shortDesc: "Inflicts Tar Shot.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Flame Burst", target);
		},
		volatileStatus: 'tarshot',
		secondary: null,
		target: "normal",
	},
		
	tomeofinfinitewisdom: {
		name: "Tome of Infinite Wisdom",
		type: "Flying",
		category: "Special",
		basePower: 90,
		accuracy: 100,
		pp: 15,
		shortDesc: "No effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Hurricane", target);
		},
		secondary: null,
		target: "normal",
	},
		
	spiritwrath: {
		name: "Spirit Wrath",
		type: "Ghost",
		category: "Special",
		basePower: 70,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits twice at >50% hp, heals the user otherwise.",
		priority: 0,
		multihit: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Astral Barrage", target);
		},
		onModifyMove(move, pokemon, target){
			if(pokemon.hp > pokemon.maxhp / 2){
				move.multihit = 2;
				move.multihitType = 'parentalbond'; 
			}
			else{
				move.drain = [3, 4];
				move.flags.heal = 1;
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
	}, 
		
	hoverboard: {
		name: "Hoverboard",
		type: "Steel",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Increases speed by 1 stage and gives Magnet Rise.",
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Magnet Rise", target);
		},
		boosts: {
				spe: 1,
		},
		volatileStatus: 'magnetrise',
		secondary: null,
		target: "self",
	},
		
	flyingdragon: {
		name: "Flying Dragon",
		type: "Dragon",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "10% chance to burn.",
		priority: 0,
		flags: {slicing: 1, defrost: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sharpen", target);
			this.add('-anim', pokemon, "Heat Wave", target);
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
	},
		
	aerialbane: {
		name: "Aerial Bane",
		type: "Fire",
		category: "Physical",
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "Deals double damage to non-grounded targets.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Lock On", target);
			this.add('-anim', pokemon, "Pyro Ball", target);
		},
		onModifyMove(move, pokemon, target) {
			if (!target.runImmunity('Ground')) {
				move.basePower *= 2;
			}
		},
		secondary: null,
		target: "normal",
	},
		
	phantomphoenix: {
		name: "Phantom Phoenix",
		type: "Fire",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "Targets Defense over Special Defense.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Triple Arrows", target);
		},
	overrideDefensiveStat: 'def',
		secondary: null,
		target: "normal",
	},
		
	nebulablaze: {
		name: "Nebula Blaze",
		type: "Psychic",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 5,
		shortDesc: "Is powered up every three attacks. 10% chance to burn.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Searing Shot", target);
			if (!source.side.nebulablaze) source.side.nebulablaze = 0;
			source.side.nebulablaze ++;
		},
		basePowerCallback(source, target, move){
			if (!source.side.nebulablaze) source.side.nebulablaze = 0;
			let bp = move.basePower;
			if(source.side.nebulablaze % 3 === 0){
				this.add('-message', `It's an EX attack!`);
				return bp * 2;
			}
			return bp;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
	},
	
	daybreak: {
		name: "Daybreak",
		type: "Fire",
		category: "Physical",
		basePower: 25,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits 2-5 times.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Pyro Ball", target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
	},
	
	stardustdragon: { 
		name: "Stardust Dragon",
		type: "Dragon",
		category: "Special",
		basePower: 70,
		accuracy: 100,
		pp: 10,
		shortDesc: "Permanently gains +10 BP on use, up to +80.",
		priority: 0,
		flags: {biting: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wish", target);
			this.add('-anim', source, "Core Enforcer", target);
			if (!source.side.stardustdragon) {
				source.side.stardustdragon = 0;
			}
			source.side.stardustdragon += 1;
			if(source.side.stardustdragon < 9){
				this.add('-message', `The Stardust Dragon grew in size!`);
			}
			if (source.side.stardustdragon > 8) {
				source.side.stardustdragon = 8;
			}
		},
		basePowerCallback(pokemon, target, move){
			if (!pokemon.side.stardustdragon) pokemon.side.stardustdragon = 0;
			const bp = move.basePower + (10 * pokemon.side.stardustdragon);
			this.debug('BP: ' + bp);
			return bp;
		},
		secondary: null,
		target: "normal",
	},
	
	vortexbeater: {
		name: "Vortex Beater",
		type: "Ghost",
		category: "Physical",
		basePower: 110,
		accuracy: 80,
		pp: 10,
		shortDesc: "No effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Moongeist Beam", target);
		},
		secondary: null,
		target: "normal",
	},
		
	shroud: {
		name: "Shroud",
		type: "Ghost",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Shrouds the user, causing all moves to miss. The user's next attack always hits.",
		priority: 6,
		flags: {mirror: 1, metronome: 1},
		stallingMove: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Grudge", target); 
			this.add('-message', `${pokemon.name} shrouded itself in darkness! Attacks will miss!`);
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon, target) {
            pokemon.addVolatile('stall');
			target.addVolatile('lockon');
			if(pokemon.ability == 'vortexstealth'){
				this.add('-message', `${pokemon.name} entered Stealth!`);
				pokemon.addVolatile('laserfocus');
			}
        },

		self: {
			volatileStatus: 'shroud',
		},
		condition:
		{
			duration: 2,
			onStart(pokemon){
				pokemon.addVolatile('shroud');
			},
			onModifyMove(move, pokemon, target) {
				move.accuracy === true;
			},
			onInvulnerability(target, source, move){
				if(move.accuracy === true || this.effectState.duration === 1) return;
				return false;
			},
			onResidualOrder: 29,
			onResidual(pokemon, source){
				pokemon.removeVolatile('shroud');
			},
		},
		secondary: null,
		target: "self",
	},
	holyarrows: { // Holy Arrows is the second half of Daedalus Stormbow, and no Pokemon learns it naturally
		name: "Holy Arrows",
		type: "Fairy",
		category: "Physical",
		basePower: 15,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tera Starstorm", target);
		},
		multihit: 5,
		secondary: null,
		target: "normal",
	},
}
