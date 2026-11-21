export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	
	//slate 1
	protean: {
		inherit: true,
		shortDesc: "User's type = move it uses. STAB is 1.25x, not 1.5x.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.protean = source.previouslySwitchedIn;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
				source.addVolatile('protean');
			}
		},
		condition: {
			onModifySTAB(stab, source, target, move) {
				if (move.forceSTAB || source.hasType(move.type)) {
					if (stab === 2) {
						return 1.667;
					}
					return 1.25;
				}
			},
		},
	},
	libero: {
		inherit: true,
		shortDesc: "User's type = move it uses. STAB is 1.25x, not 1.5x.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.libero = source.previouslySwitchedIn;
				this.add('-start', source, 'typechange', type, '[from] ability: Libero');
				source.addVolatile('libero');
			}
		},
		condition: {
			onModifySTAB(stab, source, target, move) {
				if (move.forceSTAB || source.hasType(move.type)) {
					if (stab === 2) {
						return 1.667;
					}
					return 1.25;
				}
			},
		},
	},
	unburden: {
		inherit: true,
		shortDesc: "Speed is 1.5x on held item loss; boost is lost if it switches, gets new item/Ability.",
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(1.5);
				}
			},
		},
	},
	powerconstruct: {
		//transforming effect in scripts/battle
		onSourceModifyDamage(damage, source, target, move) {
			if (target.species.baseSpecies !== 'Zygarde') return;
			if (move.category === "Physical" && target.getMoveHitData(move).typeMod > 0) {
				this.debug('Filter neutralize');
				return this.chainModify(0.5);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, breakable: 1},
		name: "Power Construct",
		shortDesc: "Zygarde: takes 0.5x damage from supereffective physical moves.",
	},
	orichalcumpulse: {
		inherit: true,
		shortDesc: "On switchin, this Pokemon summons Sun and becomes Fire-type.",
		onStart(pokemon) {
			if (this.field.setWeather('sunnyday')) {
				this.add('-activate', pokemon, 'Orichalcum Pulse', '[source]');
			} else if (this.field.isWeather('sunnyday')) {
				this.add('-activate', pokemon, 'ability: Orichalcum Pulse');
			}
			if (pokemon.setType("Fire")) this.add('-start', pokemon, 'typechange', "Fire", '[silent]');
		},
		onModifyAtk: undefined,
	},
	hadronengine: {
		inherit: true,
		shortDesc: "On switchin, this Pokemon summons Electric Terrain and becomes Electric-type.",
		onStart(pokemon) {
			if (!this.field.setTerrain('electricterrain') && this.field.isTerrain('electricterrain')) {
				this.add('-activate', pokemon, 'ability: Hadron Engine');
			}
			if (pokemon.setType("Electric")) this.add('-start', pokemon, 'typechange', "Electric", '[silent]');
		},
		onModifySpA: undefined,
	},
	toxicdebris: {
		inherit: true,
		shortDesc: "If this Pokemon survives a SE attack, Toxic Spikes are set on the opposing side.",
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const toxicSpikes = side.sideConditions['toxicspikes'];
			if (!move.damage &&
				!move.damageCallback && 
				target.getMoveHitData(move).typeMod > 0 && 
				source.hp &&
				(!toxicSpikes || toxicSpikes.layers < 2)) {
				this.add('-activate', target, 'ability: Toxic Debris');
				side.addSideCondition('toxicspikes', target);
			}
		},
	},
	
	//slate 2
	normalize: {
		inherit: true,
		shortDesc: "This Pokemon's moves are changed to be Normal type and have 1.5x power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.5);
		},
	},
	
	//slate 3
	whitesmoke: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: White Smoke", "[of] " + target);
			}
		},
		shortDesc: "Prevents this Pokemon's stat stages from being lowered.",
	},
	clearbody: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			}
		},
		shortDesc: "Prevents this Pokemon's stat stages from being lowered.",
	},
	grasspelt: {
		inherit: true,
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) this.heal(pokemon.baseMaxhp / 16);
		},
		shortDesc: "User's Def is 1.5x in Grassy Terrain, heals 1/16 HP.",
	},
	pixilate: {
		inherit: true,
		shortDesc: "This Pokemon's Normal-type moves become Fairy type.",
		onBasePower: undefined,
	},
	refrigerate: {
		inherit: true,
		shortDesc: "This Pokemon's Normal-type moves become Ice type.",
		onBasePower: undefined,
	},
	aerilate: {
		inherit: true,
		shortDesc: "This Pokemon's Normal-type moves become Flying type.",
		onBasePower: undefined,
	},
	galvanize: {
		inherit: true,
		shortDesc: "This Pokemon's Normal-type moves become Electric type.",
		onBasePower: undefined,
	},
	snowforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather(['hail', 'snow'])) {
				if (move.type === 'Ice' || move.type === 'Ghost' || move.type === 'Fairy') {
					this.debug('Snow Force boost');
					return this.chainModify([5734, 4096]);
				}
				return this.chainModify([4505, 4096]);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		flags: {},
		name: "Snow Force",
		shortDesc: "Ice/Ghost/Fairy 1.4x in Snow/Hail, else 1.1x; immunity to it.",
	},
	dauntlessshield: {
		inherit: true,
		onStart(pokemon) {
			this.boost({def: 1}, pokemon);
		},
		shortDesc: "On switch-in, this Pokemon's Defense is raised by 1 stage.",
	},
};
