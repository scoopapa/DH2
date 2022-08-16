export const Abilities: {[k: string]: ModdedAbilityData} = {
	// Wind Blaster could need testing.
	windblaster: {
		id: "windblaster",
		name: "Wind Blaster",
		shortDesc: "This Pokemon blocks non-contact Flying-type moves and Whirlwind and bounces them back to the user.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || move.flags['contact'] || (move.type !== 'Flying' && move.id !== 'whirlwind')) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || move.flags['contact'] || (move.type !== 'Flying' && move.id !== 'whirlwind')) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
	},

	piercingvision: {
		id: "piercingvision",
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
		name: "Piercing Vision",
		shortDesc: "This Pokemon's Psychic-type moves can hit Dark-types.",
		rating: 3,
	},	
	deepforest: {
		id: "deepforest",
		shortDesc: "While this Pokemon is active, a Grass move used by any Pokemon has 1.33x power.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Deep Forest');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Grass') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		name: "Deep Forest",
		rating: 3,
	},
	deepsea: {
		id: "deepsea",
		shortDesc: "While this Pokemon is active, a Water move used by any Pokemon has 1.33x power.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Deep Sea');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Water') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		name: "Deep Sea",
		rating: 3,
	},
	//Same for Patience.
	patience: {
		id: "patience",
		shortDesc: "This Pokemon takes 50% damage from moves if it hasn't moved yet.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Patience weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Patience",
		rating: 3.5,
	},
	
	prowess: {
		id: "prowess",
		shortDesc: "This Pokemon's SpA goes up by 1 stage after a KO.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source);
			}
		},
		name: "Prowess",
		rating: 3,
	},	
	solarflare: {
		id: "solarflare",
		shortDesc: "In sunlight, this Pokemon changes into its Flare form if it is a Hyakada.",
		onStart(pokemon) {
			delete this.effectData.forme;
		},
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Hyakada' || pokemon.transformed) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'hyakadaflare') {
					pokemon.formeChange('Hyakada-Flare', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'hyakadaflare') {
					pokemon.formeChange('Hyakada', this.effect, false, '[msg]');
				}
			}
		},
		name: "Solar Flare",
		rating: 1,
	},
	vigilante: {
		id: "vigilante",
		shortDesc: "This Pokemon's Fighting moves deal 1.5x damage.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting') {
				this.debug('Vigilante boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting') {
				this.debug('Vigilante boost');
				return this.chainModify(1.5);
			}
		},
		name: "Vigilante",
		rating: 3.5,
	},
	grassycloak: {
		id: "grassycloak",
		shortDesc: "This Pokemon has 1.25x evasiness in Grassy Terrain.",
		onModifyAccuracyPriority: 8,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isTerrain('grassyterrain')) {
				this.debug('Grassy Cloak - decreasing accuracy');
				return accuracy * 0.75;
			}
		},
		name: "Grassy Cloak",
		rating: 1.5,
	},
	soulstrider: {
		id: "soulstrider",
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by a Ghost move; Ghost immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Soul Strider');
				}
				return null;
			}
		},
		name: "Soul Strider",
		rating: 3,
	},
	venomvision: {
		id: "venomvision",
		shortDesc: "The opponent's Evasiness is lowered by 1 after making contact with this Pokemon.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.add('-ability', target, 'Venom Vision');
				this.boost({evasion: -1}, source, target, null, true);
			}
		},
		name: "Venom Vision",
		rating: 2,
	},
	terraformer: {
		shortDesc: "Removes terrains upon switch-in.",
		onSwitchInPriority: 6,
		onSwitchIn(pokemon, target, source) {
			this.field.clearTerrain();
		},
		id: "terraformer",
		name: "Terraformer",
	},
	mindprobe: {
		shortDesc: "Reveals the opponent's item and one of their moves upon switch-in.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Mind Probe', '[of] ' + pokemon, '[identify]');
				}
			}
			let warnMoves: (Move | Pokemon)[][] = [];
			let warnBp = 1;
			for (const target of pokemon.side.foe.active) {
				if (target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					let bp = move.basePower;
					if (move.ohko) bp = 150;
					if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					if (bp === 1) bp = 80;
					if (!bp && move.category !== 'Status') bp = 80;
					if (bp > warnBp) {
						warnMoves = [[move, target]];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, target]);
					}
				}
			}
			if (!warnMoves.length) return;
			const [warnMoveName, warnTarget] = this.sample(warnMoves);
			this.add('-activate', pokemon, 'ability: Mind Probe', warnMoveName, '[of] ' + warnTarget);
		},
		id: "mindprobe",
		name: "Mind Probe",
	},
	gunkconsumer: {
		shortDesc: "Removes hazards upon switch-in and heals 1/16 of max HP if this happens.",
		onSwitchInPriority: 6,
		onSwitchIn(pokemon, target, source) {
         const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
         for (const condition of sideConditions) {
            if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
               this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] ability: Gunk Consumer', '[of] ' + pokemon);
					this.heal(pokemon.maxhp / 16);
            }
          }
		},
		id: "gunkconsumer",
		name: "Gunk Consumer",
	},
	/*
	earthshaker: {
		id: "earthshaker",
		shortDesc: "Placeholder, does nothing right now.",
		name: "Earth Shaker",
		rating: 0.1,
	},
	*/
	earthshaker: {
		id: "earthshaker",
		shortDesc: "This Pokemon's Ground moves deal 1.5x damage if it was damaged earlier in the turn.",
		//Currently this buffs the Ground moves if it attacks the attacker rather than if it attacks anything.
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				const damagedByTarget = attacker.attackedBy.some(
					p => p.source === defender && p.damage > 0 && p.thisTurn
				);
				if (damagedByTarget) {
					this.debug('Earth Shaker boost for getting hit by ' + defender);
					return this.chainModify(1.5);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				const damagedByTarget = attacker.attackedBy.some(
					p => p.source === defender && p.damage > 0 && p.thisTurn
				);
				if (damagedByTarget) {
					this.debug('Earth Shaker boost for getting hit by ' + defender);
					return this.chainModify(1.5);
				}
			}
		},
		name: "Earth Shaker",
		rating: 3.5,
	}, 
	
	/*
	hotheaded: {
		id: "hotheaded",
		shortDesc: "Placeholder, does nothing right now.",
		name: "Hot-Headed",
		rating: 0.1,
	},
	*/
	hotheaded: {
		onDamagingHit(damage, target, source, effect) {
			target.addVolatile('gmaxchistrike');
		},
		name: "Hot-Headed",
		rating: 3.5,
	},
	thoughtful: {
		id: "thoughtful",
		shortDesc: "Placeholder, does nothing right now.",
		/* shortDesc: "Copies the typing of the last unfainted teammate in this Pokemon's team. 
		onStart(pokemon) {
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (!pokemon.side.pokemon[i].fainted) break;
			}
			
			if (!pokemon.side.pokemon[i]) return;
			let chosenTeammate = pokemon.side.pokemon[i];
			if (pokemon === chosenTeammate) return;
			if (chosenTeammate.species.num === 493 || chosenTeammate.species.num === 773) return;
			
			let newBaseTypes = chosenTeammate.getTypes().filter(type => type !== '???');
			if (!newBaseTypes.length) return;
			this.add('-start', pokemon, 'typechange', '[from] ability: Thoughtful');
			pokemon.setType(newBaseTypes);
		},
		*/
		name: "Thoughtful",
		rating: 0.1,
	},
	stonehouse: {
		id: "stonehouse",
		shortDesc: "When this Pokemon switches in on Stealth Rock, it gains +2 Defense.",
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			// I'm not sure if getting this ability with stealth rock on your side of the field activates it or if you're immune to Stealth Rock damage, but this should suffice.
			if (pokemon.side.getSideCondition('stealthrock') && this.effectData.switchingIn) {
				this.boost({def: 2});
			}
		},
		name: "Stone House",
		rating: 0.1,
	},
	treetopper: {
		id: "treetopper",
		shortDesc: "Placeholder, does nothing right now.",
		/* shortDesc: "When this ability is active, all Pokemon are treated as if under Telekinesis.",
			onStart(pokemon) {
				this.add('-ability', pokemon, 'Tree-Topper');
			},
			onAccuracyPriority: -1,
			onAnyAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko && !this.field.getPseudoWeather('gravity') && !(['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseSpecies.baseSpecies) || target.baseSpecies.name === 'Gengar-Mega' || target.volatiles['smackdown'] || target.volatiles['ingrain'])) return true;
			},
			// Airborneness implemented under scripts/pokemon.
		*/
		name: "Tree-Topper",
		rating: 0.1,
	},
	//Loria Region
	//Items eaten by Ravenous after they activate: Focus Sash, Adrenaline Orb, Air Balloon, Blunder Policy, Eject Button, Eject Pack, Luminous Moss, Normal Gem, Red Card, Room Service, Snowball, Weakness Policy
	ravenous: {
		shortDesc: "Placeholder, does nothing right now.",
		name: "Ravenous",
	},
	precision: {
		shortDesc: "This Pokemon's moves have their accuracy multiplied by 1.3.",
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('compoundeyes - enhancing accuracy');
			return accuracy * 1.3;
		},
		name: "Precision",
	},
	energize: {
		shortDesc: "When this Pokemon uses a two-turn move, it recovers 1/6 of its max HP on the first turn.",
		onChargeMove(pokemon, target, move) {
			this.heal(pokemon.baseMaxhp / 6);
		},
		name: "Energize",
	},
	phaseshift: {
		shortDesc: "Becomes a Water-type if using a Water move or burned, becomes Ice-type if using an Ice and not burned.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			if (move.type === 'Water' || source.status === 'brn') {
				if (!source.setType('Water')) return;
				if (source.getTypes().join() === 'Water') return;
				this.add('-start', source, 'typechange', 'Water', '[from] ability: Phase Shift');
			}
			if (move.type === 'Ice' && source.status === 'brn') {
				if (!source.setType('Ice')) return;
				if (source.getTypes().join() === 'Ice') return;
				this.add('-start', source, 'typechange', 'Ice', '[from] ability: Phase Shift');
			}
		},
		name: "Phase Shift",
	},
	bombadier: {
		shortDesc: "This Pokémon explosion, ball, and bomb moves have 1.3x power.",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet'] || move.name === 'Explosion' || move.name === 'Misty Explosion' || move.name === 'Self-Destruct' || move.name === 'Mind Blown') {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Bombadier",
	},
	soaringspirit: {
		shortDesc: "This Pokemon's Flying-type moves have 1.5x power and it's immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify the latter.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Soaring Spirit boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Soaring Spirit boost');
				return this.chainModify(1.5);
			}
		},
		name: "Soaring Spirit",
	},
	suddenguard: {
		shortDesc: "While switching-in, this Pokemon takes 0.5x damage from non-Super Effective moves.",
		onSourceModifyDamage(damage, source, target, move) {
			if (!target.activeTurns && target.runEffectiveness(move) <= 0) {
				this.debug('Sudden Guard weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Sudden Guard",
	},
	bewitch: {
		shortDesc: "(Bugged) Moves that can inflict a status condition have their secondary chance doubled.",
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
		name: "Bewitch",
	},
	ambitious: {
		shortDesc: "This Pokemon's Speed is raised by 2 for each of its stats that is lowered by a foe.",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Ambitious only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', target, 'Ambitious');
				this.boost({spe: 2}, target, target, null, true);
			}
		},
		name: "Ambitious",
	},
	surfsup: {
		shortDesc: "(Bugged) Before using a Water-type move or if Rain is active, this Pokémon changes to its Surfing form. This Pokémon's Water-type moves deal 1.3x damage.",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Tsunamey' || attacker.transformed) return;
			const targetForme = (move.type === 'Water' ? 'Tsunamey' : 'Tsunamey-Surfing');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if ((this.field.isWeather('raindance') || this.field.isWeather('primordialsea'))  && pokemon.species.id === 'tsunamey' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Surf\'s Up');
				this.effectData.busted = false;
				pokemon.formeChange('Tsunamey-Surfing', this.effect, true);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Surf\'s Up boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Surf\'s Up boost');
				return this.chainModify(1.3);
			}
		},
		isPermanent: true,
		name: "Surf's Up",
	},
	battletide: {
		shortDesc: "This Pokemon's Attack goes up by 1 stage when hit by a Water-type move; Water immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Battle Tide');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Battle Tide');
				}
				return this.effectData.target;
			}
		},
		name: "Battle Tide",
	},
	solarcharge: {
		shortDesc: "If Sunny Day is active, this Pokemon's Atk is 1.5x; loses 1/8 max HP per turn.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		name: "Solar Charge",
	},
	eternalice: {
		shortDesc: "This Pokemon is immune to Fire and Fighting-type moves, but it always moves with -1 priority.",
		onTryHit(target, source, move) {
			if (move.target !== 'self' && ['Fighting', 'Fire'].includes(move.type)) {
				this.add('-immune', target, '[from] ability: Eternal Ice');
				return null;
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
				return priority - 1;
		},
		name: "Eternal Ice",
	},
	traveler: {
		shortDesc: "Removes hazards upon switch-in.",
		onSwitchInPriority: 6,
		onSwitchIn(pokemon, target, source) {
         const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
         for (const condition of sideConditions) {
            if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
               this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] ability: Gunk Consumer', '[of] ' + pokemon);
            }
          }
		},
		id: "traveler",
		name: "Traveler",
	},
	magmaabsorb: {
		shortDesc: "This Pokemon's Defense goes up by 1 stage when hit by a Fire-type move; Fire immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 1})) {
					this.add('-immune', target, '[from] ability: Magma Absorb');
				}
				return null;
			}
		},
		name: "Magma Absorb",
	},
	disastrous: {
		shortDesc: "If hit by a Dark-type move, the foe loses 1/8 of their max HP; Dark and Intimidate immunity.",
		onTryHit(target, source, move) {
			if (move.target !== 'self' && ['Dark'].includes(move.type)) {
				this.add('-immune', target, '[from] ability: Disastrous');
				this.damage(source.baseMaxhp / 8, source, target);
				return null;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Disastrous');
			}
		},
		name: "Disastrous",
	},
	potionbrewer: {
		shortDesc: "(Bugged) Upon using a Psychic-type move, this Pokémon consumes its berry.",
	  	onAfterMove(target, source, move) {
			const item = source.getItem();
		   if (move.type === 'Psychic' && item.isBerry) source.eatItem(true);
		},
		name: "Potion Brewer",
	},
	ancestorcall: {
		shortDesc: "This Pokemon's Normal-type moves become Ghost-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ghost';
				move.ancestorcallBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.ancestorcallBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Ancestor Call",
	},
};
