export const Conditions: {[k: string]: ConditionData} = {
	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		onStart(pokemon) {
			this.effectState.turns = 0;
			pokemon.removeVolatile('minimize');
			pokemon.removeVolatile('substitute');
			pokemon.side.addSideCondition('dynamaxused', pokemon);
			if (pokemon.gigantamax) {
				pokemon.side.addSideCondition('gmaxused', pokemon);
				if (pokemon.baseSpecies.name === 'Venusaur') {
					pokemon.setAbility('flowerveil', pokemon, true);
					this.add('-activate', pokemon, 'ability: Flower Veil');
				}
				if (pokemon.baseSpecies.name === 'Charizard') {
					pokemon.setAbility('moldbreaker', pokemon, true);
					this.add('-activate', pokemon, 'ability: Mold Breaker');
				}
				if (pokemon.baseSpecies.name === 'Blastoise') {
					pokemon.setAbility('bulletproof', pokemon, true);
					this.add('-activate', pokemon, 'ability: Bulletproof');
				}
				if (pokemon.baseSpecies.name === 'Butterfree') {
					pokemon.setAbility('magicbounce', pokemon, true);
					this.add('-activate', pokemon, 'ability: Magic Bounce');
				}
				if (pokemon.baseSpecies.name === 'Pikachu') {
					pokemon.setAbility('hugepower', pokemon, true);
					this.add('-activate', pokemon, 'ability: Huge Power');
				}
				if (pokemon.baseSpecies.name === 'Meowth') {
					pokemon.setAbility('limber', pokemon, true);
					this.add('-activate', pokemon, 'ability: Limber');
				}
				if (pokemon.baseSpecies.name === 'Machamp') {
					pokemon.setAbility('scrappy', pokemon, true);
					this.add('-activate', pokemon, 'ability: Scrappy');
				}
				if (pokemon.baseSpecies.name === 'Gengar') {
					pokemon.setAbility('mummu', pokemon, true);
					this.add('-activate', pokemon, 'ability: Mummy');
				}
				if (pokemon.baseSpecies.name === 'Kingler') {
					pokemon.setAbility('angershell', pokemon, true);
					this.add('-activate', pokemon, 'ability: Anger Shell');
				}
				if (pokemon.baseSpecies.name === 'Lapras') {
					pokemon.setAbility('icescales', pokemon, true);
					this.add('-activate', pokemon, 'ability: Ice Scales');
				}
				if (pokemon.baseSpecies.name === 'Eevee') {
					pokemon.setAbility('friendguard', pokemon, true);
					this.add('-activate', pokemon, 'ability: Friend Guard');
				}
				if (pokemon.baseSpecies.name === 'Snorlax') {
					pokemon.setAbility('sapsipper', pokemon, true);
					this.add('-activate', pokemon, 'ability: Sap Sipper');
				}
				if (pokemon.baseSpecies.name === 'Garbodor') {
					pokemon.setAbility('toxicdebris', pokemon, true);
					this.add('-activate', pokemon, 'ability: Toxic Debris');
				}
				if (pokemon.baseSpecies.name === 'Melmetal') {
					pokemon.setAbility('liquidooze', pokemon, true);
					this.add('-activate', pokemon, 'ability: Liquid Ooze');
				}
				if (pokemon.baseSpecies.name === 'Rillaboom') {
					pokemon.setAbility('grasspelt', pokemon, true);
					this.add('-activate', pokemon, 'ability: Grass Pelt');
				}
				if (pokemon.baseSpecies.name === 'Cinderace') {
					pokemon.setAbility('quickfeet', pokemon, true);
					this.add('-activate', pokemon, 'ability: Quick Feet');
				}
				if (pokemon.baseSpecies.name === 'Inteleon') {
					pokemon.setAbility('stormdrain', pokemon, true);
					this.add('-activate', pokemon, 'ability: Storm Drain');
				}
				if (pokemon.baseSpecies.name === 'Corviknight') {
					pokemon.setAbility('ironbarbs', pokemon, true);
					this.add('-activate', pokemon, 'ability: Iron Barbs');
				}
				if (pokemon.baseSpecies.name === 'Orbeetle') {
					pokemon.setAbility('magicguard', pokemon, true);
					this.add('-activate', pokemon, 'ability: Magic Guard');
				}
				if (pokemon.baseSpecies.name === 'Drednaw') {
					pokemon.setAbility('solidrock', pokemon, true);
					this.add('-activate', pokemon, 'ability: Solid Rock');
				}
				if (pokemon.baseSpecies.name === 'Coalossal') {
					pokemon.setAbility('eartheater', pokemon, true);
					this.add('-activate', pokemon, 'ability: Earth Eater');
				}
				if (pokemon.baseSpecies.name === 'Appletun') {
					pokemon.setAbility('grassysurge', pokemon, true);
					this.add('-activate', pokemon, 'ability: Grassy Surge');
				}
				if (pokemon.baseSpecies.name === 'Flapple') {
					pokemon.setAbility('tintedlens', pokemon, true);
					this.add('-activate', pokemon, 'ability: Tinted Lens');
				}
				if (pokemon.baseSpecies.name === 'Sandaconda') {
					pokemon.setAbility('sandrush', pokemon, true);
					this.add('-activate', pokemon, 'ability: Sand Rush');
				}
				if (pokemon.baseSpecies.name === 'Toxtricity') {
					pokemon.setAbility('electromorphosis', pokemon, true);
					this.add('-activate', pokemon, 'ability: Electromorphosis');
				}
				if (pokemon.baseSpecies.name === 'Centiskorch') {
					pokemon.setAbility('dryskin', pokemon, true);
					this.add('-activate', pokemon, 'ability: Dry Skin');
				}
				if (pokemon.baseSpecies.name === 'Hatterene') {
					pokemon.setAbility('naturalcure', pokemon, true);
					this.add('-activate', pokemon, 'ability: Natural Cure');
				}
				if (pokemon.baseSpecies.name === 'Grimmsnarl') {
					pokemon.setAbility('tanglinghair', pokemon, true);
					this.add('-activate', pokemon, 'ability: Tangling Hair');
				}
				if (pokemon.baseSpecies.name === 'Alcremie') {
					pokemon.setAbility('wellbakedbody', pokemon, true);
					this.add('-activate', pokemon, 'ability: Well-Baked Body');
				}
				if (pokemon.baseSpecies.name === 'Copperajah') {
					pokemon.setAbility('stamina', pokemon, true);
					this.add('-activate', pokemon, 'ability: Stamina');
				}
				if (pokemon.baseSpecies.name === 'Duraludon') {
					pokemon.setAbility('pressure', pokemon, true);
					this.add('-activate', pokemon, 'ability: Pressure');
				}
				if (pokemon.baseSpecies.name === 'Urshifu') {
					pokemon.setAbility('innerfocus', pokemon, true);
					this.add('-activate', pokemon, 'ability: Inner Focus');
				}
			}
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax', pokemon.gigantamax ? 'Gmax' : '');
			if (pokemon.baseSpecies.name === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 1.5 + (pokemon.dynamaxLevel * 0.05);

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			pokemon.clearBoosts();
			this.add('-clearboost', pokemon);
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onModifyDamage(damage, source, target, move) {
			if (target.terastallized) {
				return this.chainModify(0.75);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onResidual(pokemon) {
			if (!pokemon.gigantamax) {
				this.effectState.turns++;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},
};
