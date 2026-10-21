export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	
	//modded
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
		onModifyAtk: null,
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
		onModifyAtk: null,
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
};
