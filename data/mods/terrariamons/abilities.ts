export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	titaniumshards: {
		onSwitchIn(){
			this.effectState.titaniumshards = 0;
		},
		onSourceDamagingHit(source, target, damage, move){
			this.effectState.titaniumshards += 1;
			if (this.effectState.titaniumshards > 7) this.effectState.titaniumshards = 7;
		},
		onResidual(pokemon) {
			this.effectState.titaniumshards += 1;
			if (this.effectState.titaniumshards > 7) this.effectState.titaniumshards = 7;
			this.add('-message', `${pokemon.name} currently has ` + this.effectState.titaniumshards + ` shard(s).`)
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true) && this.effectState.titaniumshards >= 2 && source !== target) {
				this.damage(source.baseMaxhp / 5, source, target);
				this.effectState.titaniumshards -= 2;
			}
			else if(this.checkMoveMakesContact(move, source, target, true) && this.effectState.titaniumshards === 1 && source !== target){
				this.damage(source.baseMaxhp / 10, source, target);
				this.effectState.titaniumshards -= 1;
			}
		},
		flags: {},
		name: "Titanium Shards",
		shortDesc: "The user generates up to 7 titanium shards by attacking or at the end of the turn that can be spent to deal damage back to an attacker that makes contact.",
	},
	shadowacceleration: { 
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length}, source);
			}
		},
		flags: {},
		name: "Shadow Acceleration",
		shortDesc: "When this Pokémon attacks and knocks out an opponent, its speed increases by 1 stage.",
	},	
	holydodge: { 
		onStart(pokemon){
			this.effectState.holydodge = 0;
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move' && this.effectState.holydodge === 0) {
				this.effectState.holydodge = 1;
				this.add('-message', `Holy Dodge is active!`);
			}
		},
		onInvulnerability(pokemon, target, source, move){
			if(this.effectState.holydodge === 1){
				this.add('-message', `${pokemon.name} dodged the attack with Holy Dodge!`);
				this.effectState.holydodge = 2;
				return false;
			}
		},
		onSwitchIn(pokemon) {
			this.effectState.holydodge = 0;
		},
		flags: {},
		name: "Holy Dodge",
		shortDesc: "Upon taking a kill, always dodge the next attack targeted at the user, even if it is otherwise guaranteed to hit. Once per switchin.",
	},
	immovable: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Immovable');
			return null;
		},
		flags: {breakable: 1},
		name: "Immovable",
		shortDesc: "Prevents the user from being forced to switch out.",
	},	
	junglepurity: {
		onEffectiveness(typeMod, target, type, move){
			if(move.type === 'Fairy' || move.type === 'Dark') return -1;
		},
		flags: {breakable: 1},
		name: "Jungle Purity",
		shortDesc: "Dark and Fairy attacks deal damage to the user as if they were not very effective.",
	},
	hivepack: {
		onBasePower(move, basePower, pokemon){
			if(move.type === 'Bug') return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Hive Pack",
		shortDesc: "The base power of bug type attacks is multiplied by 1.2x.",
	},
	envenomed: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Envenomed boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Envenomed boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Envenomed",
		shortDesc: "This pokemon’s offensive stat is multiplied by 1.5 while using a Poison-type attack.",
	},
	fragileshine: {
		onBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fairy') return;
			if(source.hp < source.maxhp) return;
			return this.chainModify([5448, 4096]);
		},
		flags: {},
		name: "Fragile Shine",
		shortDesc: "While at max hp, this Pokémon's Fairy type moves are 33% stronger.",
	},
	auroraborealis: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.actions.useMove("Aurora Veil", target)
			}
		},
		flags: {breakable: 1},
		name: "Aurora Borealis",
		shortDesc: "When dropped to 0 hp by an attack, this pokémon uses Aurora Veil before fainting.",
	},
	vortexstealth: { 
		onStart(pokemon){
			pokemon.addVolatile('vortexstealth');
			this.effectState.vortexstealth = false;
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if(pokemon.volatiles['laserfocus']){
					return this.chainModify(0.5);
				}
				return;
			},
		},
		// implementation for getting laser focus implemented in Shroud
		flags: {},
		name: "Vortex Stealth",
		shortDesc: "Activates Stealth when Shroud is used. While in Stealth, speed is halved and the user gains Laser Focus. Stealth is exited upon the end of the next turn.",
	},
	rapidhealing: {
		onSwitchIn(pokemon){
			pokemon.addVolatile('rapidhealing');
		},
		condition: {
			onSourceDamagingHit(damage, target, source, move){
				this.effectState.rapidhealing = true;
			},
			onAfterMove(pokemon){
				if(this.effectState.rapidhealing){
					pokemon.heal(pokemon.baseMaxhp / 5);
					this.effectState.rapidhealing = false;
				}
			},
		},
		flags: {},
		name: "Rapid Healing",
		shortDesc: "Upon successfully landing an attack, this Pokémon heals by 20% of its max HP.",
	},
	beetlemight: {
		onStart(pokemon){
			pokemon.addVolatile('beetlemight');
		},
		condition: {
			duration: 255,
			onStart(target) {
				this.add('-start', target, 'ability: Beetle Might');
			},
			onBasePower(basePower, source, target, move){
				if(this.effectState.duration === 255){
					return;
				}
				else if(this.effectState.duration == 254){
					return this.chainModify(1.1);
				}
				else if(this.effectState.duration === 253){
					return this.chainModify(1.2);
				}
				else{
					return this.chainModify(1.3);
				}
			},
			onResidual(pokemon){
				if(this.effectState.duration === 255 || this.effectState.duration === 254 || this.effectState.duration === 253){
					this.add('-message', `${pokemon.name} gained 1 beetle! Its attacks are stronger!`);
				}
			},
		},
		flags: {},
		name: "Beetle Might",
		shortDesc: "At the end of the turn, gain 1 beetle. Each beetle empowers attacks by 10%, maximum of 3 beetles. All beetles disappear after switching out.",
	},
	beetleendurance: {
		onStart(pokemon){
			pokemon.addVolatile('beetleendurance');
		},
		condition: {
			duration: 255,
			onStart(target) {
				this.add('-start', target, 'ability: Beetle Endurance');
			},
			onSourceModifyDamage(damage, source, target, move){
				if(this.effectState.duration === 255){
					return;
				}
				else if(this.effectState.duration == 254){
					return this.chainModify(0.9);
				}
				else if(this.effectState.duration === 253){
					return this.chainModify(0.8);
				}
				else{
					return this.chainModify(0.7);
				}
			},
			onResidual(pokemon){
				if(this.effectState.duration === 255 || this.effectState.duration === 254 || this.effectState.duration === 253){
					this.add('-message', `${pokemon.name} gained 1 beetle! It now takes less damage!`);
				}
			},
		},		
		flags: {breakable: 1},
		name: "Beetle Endurance",
		shortDesc: "At the end of the turn, gain 1 beetle. Each beetle reduces damage taken by 10%, maximum of 3 beetles. All beetles disappear after switching out.",
	},
	stardustguardian: {
		onModifyMovePriority: 8,
		onPrepareHit(source, target, move){
			if(move.category === 'Physical' && move.flags.contact === 1){
				this.add('-message', `The Stardust Guardian made the move special!`);
			}
		},
		onModifyMove(move, pokemon){
			if(move.category === 'Physical' && move.flags.contact === 1){
				move.category = 'Special';
			}
		},
		flags: {},
		name: "Stardust Guardian",
		shortDesc: "The user's physical contact moves become special.",
	},
	frostburn: {
		onModifyMove(move, pokemon){
			if (!move.secondaries) {
				move.secondaries = [];
			}
			for(const secondary of move.secondaries){
				if(secondary.status === 'frz'){
					secondary.status = 'brn';
					secondary.chance *= 2;
				}
			}
		},
		flags: {},
		name: "Frostburn",
		shortDesc: "Moves with a freeze chance lose their freeze chance and gain a burn chance 2x as likely as the original freeze chance.",
	},
	nebulaboosters: {
		onStart(pokemon){
			if(!this.effectState.nebulaboosters) this.effectState.nebulaboosters = 0;
		},
		onSourceAfterFaint(length, target, source, effect) {
			let nebulaValue = this.effectState.nebulaboosters;
			if (effect && effect.effectType === 'Move' && this.effectState.nebulaboosters % 3 === 2) {
				this.effectState.nebulaboosters += 1;
				this.boost({spe: length}, source);
			}
			if (effect && effect.effectType === 'Move' && this.effectState.nebulaboosters % 3 === 1) {
				this.effectState.nebulaboosters += 1;
				this.boost({spa: length}, source);
			}
			if (effect && effect.effectType === 'Move' && this.effectState.nebulaboosters % 3 === 0 && nebulaValue === this.effectState.nebulaboosters) {
				this.effectState.nebulaboosters += 1;
				this.boost({spd: length}, source);
			}
		},
		flags: {},
		name: "Nebula Boosters",
		shortDesc: "On kill, gain +1 Special Defense, +1 Special Attack, or +1 Speed, in that order (so first kill gives +1 Special Defense, second gives +1 Special Attack, so on). Order is not reset upon switching out, but the boosts are lost. Loops back to the start after the third kill. ",
	},
	solarblaze: {
		onStart(pokemon){
			if(!this.effectState.solarblaze) this.effectState.solarblaze = 3;
		},
		onSourceModifyDamage(damage, source, target, move){
			if(this.effectState.solarblaze > 0 && this.checkMoveMakesContact(move, source, target, true))
			{
				this.add('-message', `Solar Blaze weakened the attack!`);
				return this.chainModify(0.5);
			}
		},
		onDamagingHit(damage, target, source, move){
			const damageAmounts = [0, 3, 4, 6];
			if(this.checkMoveMakesContact(move, source, target, true) && this.effectState.solarblaze > 0) {
				this.damage((damageAmounts[this.effectState.solarblaze] * source.maxhp / 24), source, target);
				this.effectState.solarblaze -= 1;
			}
		},
		flags: {},
		name: "Solar Blaze",
		shortDesc: "Starts with three charges. If hit by a contact move, expend 1 charge to take ½ damage from the move and deal % HP damage to the attacker based on the number of charges (1/4th at 3 charges, 1/6th at 2 charges, 1/8th at 1 charge). Charges do not regenerate, and this ability does not trigger at 0 charges.",
	},
};
