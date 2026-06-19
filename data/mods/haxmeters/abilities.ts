export function roundNum(n: number): number {
	return Math.round((n + Number.EPSILON) * 1000) / 1000;
}

export function addAbilityEffect(abilityUser: Pokemon, abilityChance: number, hit: number): void {
	const multiplier = 1 - abilityChance / 100;
	const effectValue = multiplier**(hit - 1) * abilityChance;
	if (hit === 1) abilityUser.battle.add('-message', `(${abilityUser.name}'s Ability: ${abilityChance})`);
	else abilityUser.battle.add('-message', `(${abilityUser.name}'s Ability: ${roundNum(multiplier)}^${hit - 1} * ${abilityChance} = ${roundNum(effectValue)})`);
	abilityUser.side.addEffect(effectValue);
}

export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	cursedbody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable'] && source.targetAbilityHit === 0) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				source.targetAbilityHit++;
				if (!source.volatiles['disable']) {
					addAbilityEffect(target, 30, source.targetAbilityHit);	
				}
				/*
				this.add('-message', `(${target.name}'s Ability: 30)`);
				target.side.addEffect(30);
				*/
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.addVolatile('disable', this.effectState.target);
					source.targetAbilityActivateHit = source.targetAbilityHit;
				}
			}
		},
	},
	cutecharm: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!source.runStatusImmunity('attract') || (source.volatiles['attract'] && source.targetAbilityHit === 0)) return;
			if (!(target.gender === 'M' && source.gender === 'F') && !(target.gender === 'F' && source.gender === 'M')) return;
			if (this.checkMoveMakesContact(move, source, target)) {
				source.targetAbilityHit++;
				if (!source.volatiles['attract']) {
					addAbilityEffect(target, 30, source.targetAbilityHit);
				}					
				/*
				this.add('-message', `(${target.name}'s Ability: 30)`);
				target.side.addEffect(30);
				*/
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.addVolatile('attract', this.effectState.target);
					source.targetAbilityActivateHit = source.targetAbilityHit;
				}
			}
		},
	},
	flamebody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) return; //Misty Terrain blocking Flame Body's effect
			if (!source.runStatusImmunity('brn') || (source.status && source.targetAbilityHit === 0)) return;
			//if (this.checkMoveMakesContact(move, source, target) && (source.targetAbilityHit > 0 || !source.status) && source.runStatusImmunity('brn')) {
			if (this.checkMoveMakesContact(move, source, target)) {
				source.targetAbilityHit++;
				if (!source.status) {
					addAbilityEffect(target, 30, source.targetAbilityHit);		
				}	
				/*
				this.add('-message', `(${target.name}'s Ability: 30)`);
				target.side.addEffect(30);
				*/
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.trySetStatus('brn', target);
					source.targetAbilityActivateHit = source.targetAbilityHit;
				}
			}
		},
	},
	poisonpoint: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) return; //Misty Terrain blocking Poison Point's effect
			if (!source.runStatusImmunity('psn') || (source.status && source.targetAbilityHit === 0)) return;
			if (this.checkMoveMakesContact(move, source, target)) {
			//if (this.checkMoveMakesContact(move, source, target)) && (source.targetAbilityHit > 0 || !source.status) && source.runStatusImmunity('psn')
				source.targetAbilityHit++;
				if (!source.status) {
					addAbilityEffect(target, 30, source.targetAbilityHit);		
				}		
				/*
				this.add('-message', `(${target.name}'s Ability: 30)`);
				target.side.addEffect(30);
				*/
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.trySetStatus('psn', target);
					source.targetAbilityActivateHit = source.targetAbilityHit;
				}
			}
		},
	},
	poisontouch: {
		inherit: true,
		onSourceDamagingHit(damage, target, source, move) {
			if (this.field.isTerrain('mistyterrain') && target.isGrounded()) return; //Misty Terrain blocking Poison Touch's effect
			if (!target.hp || target.hasAbility('shielddust') || target.hasItem('covertcloak')) return; // Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (!target.runStatusImmunity('psn') || (target.status && source.sourceAbilityHit === 0)) return;
			if (this.checkMoveMakesContact(move, target, source)) {
			//if (this.checkMoveMakesContact(move, target, source) && !target.status && target.runStatusImmunity('psn')) {
				source.sourceAbilityHit++;
				if (!target.status) {
					addAbilityEffect(source, 30, source.sourceAbilityHit);	
				}
				/*
				this.add('-message', `(${source.name}'s Ability: 30)`);
				source.side.addEffect(30);
				*/
				if (source.side.effect >= 100) {
					source.side.subtractEffect(100);
					target.trySetStatus('psn', source);
					source.sourceAbilityActivateHit = source.sourceAbilityHit;				
				}
			}
		},
	},
	quickdraw: {
		inherit: true,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category !== "Status") {
				this.add('-message', `(${pokemon.name}'s Ability: 30)`);
				pokemon.side.addEffect(30);
				if (pokemon.side.effect >= 100) {
					pokemon.side.subtractEffect(100);
					this.add('-activate', pokemon, 'ability: Quick Draw');
					return 0.1;
				}
			}
		},
	},
	shedskin: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.hp && pokemon.status) {
				this.add('-message', `(${pokemon.name}'s Ability: 33)`);
				pokemon.side.addEffect(33);
				if (pokemon.side.effect >= 100) {
					pokemon.side.subtractEffect(100);
					this.debug('shed skin');
					this.add('-activate', pokemon, 'ability: Shed Skin');
					pokemon.cureStatus();
				}
			}
		},
	},
	static: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) return; //Misty Terrain blocking Static's effect
			if (!source.runStatusImmunity('par') || (source.status && source.targetAbilityHit === 0)) return;
			//if (this.checkMoveMakesContact(move, source, target) && (source.targetAbilityHit > 0 || !source.status) && source.runStatusImmunity('par')) {
			if (this.checkMoveMakesContact(move, source, target)) {
				source.targetAbilityHit++;
				if (!source.status) {
					addAbilityEffect(target, 30, source.targetAbilityHit);
				}
				/*
				const multiplier = 0.7**source.target.targetAbilityHit;
				const effectValue = multiplier * 30;
				if (source.target.targetAbilityHit === 1) this.add('-message', `(${target.name}'s Ability: 30)`);
				else this.add('-message', `(${target.name}'s Ability: ${roundNum(multiplier)} * 30 = ${roundNum(effectValue)})`);
				target.side.addEffect(effectValue);
				*/
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.trySetStatus('par', target);
					source.targetAbilityActivateHit = source.targetAbilityHit;
				}
			}
		},
	},
	toxicchain: {
		inherit: true,
		onSourceDamagingHit(damage, target, source, move) {
			if (this.field.isTerrain('mistyterrain') && target.isGrounded()) return; // Misty Terrain blocking Toxic Chain's effect
			if (!target.hp || target.hasAbility('shielddust') || target.hasItem('covertcloak')) return; // Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
				 // || target.status || !target.runStatusImmunity('tox')) return;
			if (!target.runStatusImmunity('tox') || (target.status && source.sourceAbilityHit === 0)) return;
			source.sourceAbilityHit++;
			if (!target.status) {
				addAbilityEffect(source, 30, source.sourceAbilityHit);
			}
			/*
			this.add('-message', `(${source.name}'s Ability: 30)`);
			source.side.addEffect(30);
			*/
			if (source.side.effect >= 100) {
				source.side.subtractEffect(100);
				target.trySetStatus('tox', source);
				source.sourceAbilityActivateHit = source.sourceAbilityHit;
			}
		},
	},
};
