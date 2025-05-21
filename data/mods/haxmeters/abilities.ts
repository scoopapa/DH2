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
			if (source.volatiles['disable']) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				target.side.addEffect(30);
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
	},
	cutecharm: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				target.side.addEffect(30);
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.addVolatile('attract', this.effectState.target);
				}
			}
		},
	},
	flamebody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				target.side.addEffect(30);
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.trySetStatus('brn', target);
				}
			}
		},
	},
	poisonpoint: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				target.side.addEffect(30);
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.trySetStatus('psn', target);
				}
			}
		},
	},
	poisontouch: {
		inherit: true,
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				source.side.addEffect(30);
				if (source.side.effect >= 100) {
					source.side.subtractEffect(100);
					target.trySetStatus('psn', source);
				}
			}
		},
	},
	quickdraw: {
		inherit: true,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category !== "Status") {
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
			if (this.checkMoveMakesContact(move, source, target)) {
				target.side.addEffect(30);
				if (target.side.effect >= 100) {
					target.side.subtractEffect(100);
					source.trySetStatus('par', target);
				}
			}
		},
	},
	toxicchain: {
		inherit: true,
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			
			source.side.addEffect(30);
			if (source.side.effect >= 100) {
				source.side.subtractEffect(100);
				target.trySetStatus('tox', source);
			}
		},
	},
};
