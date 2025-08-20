export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	bigbutton: {
		inherit: true,
		duration: null,
		onStart(pokemon) {
			const ironFist = ['zapdos', 'bigcrammer'].includes(pokemon.species.name);
			if (!pokemon || pokemon.volatiles['bigbutton'] || !ironFist) return;
			if (!pokemon.big) pokemon.big = true;
			this.add('-start', pokemon, 'Dynamax', '[silent]');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (['grassknot', 'lowkick'].includes(move.id)) {
				return 120;
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (!target || target.volatiles['bigbutton']) return;
			const boostedMoves = [
				'aerialace', 'aquatail', 'crabhammer', 'forcepalm', 'furyattack', 'gigaimpact', 'heatcrash', 'heavyslam', 'highhorsepower', 'irontail', 'lethalhug', 'meteormash', 'nuzzle', 'peck', 'playrough', 'slam', 'strugglebug', 'visegrip'
			];
			const minimizeMoves = [
				'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'supercellslam',
			];
			if (boostedMoves.includes(move.id) || minimizeMoves.includes(move.id)) {
				move.accuracy = true;
				if (['heatcrash', 'heavyslam'].includes(move.id)) return 120;
				if (move.basePower < 60) return this.chainModify(2);
				if (minimizeMoves.includes(move.id)) return this.chainModify(1.5);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (!target || target.volatiles['bigbutton']) return;
			const boostedMoves = [
				'aerialace', 'aquatail', 'crabhammer', 'forcepalm', 'furyattack', 'gigaimpact', 'heatcrash', 'heavyslam', 'highhorsepower', 'irontail', 'lethalhug', 'meteormash', 'nuzzle', 'peck', 'playrough', 'slam', 'strugglebug', 'visegrip'
			];
			const minimizeMoves = [
				'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'supercellslam',
			];
			if (boostedMoves.includes(move.id) || minimizeMoves.includes(move.id)) move.accuracy = true;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax', '[silent]');
		}
	},
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
				switch (pokemon.baseSpecies.name) {
					case 'Venusaur':
						pokemon.setAbility('flowerveil', pokemon, true);
						this.add('-activate', pokemon, 'ability: Flower Veil');
						break;
					case 'Charizard':
						pokemon.setAbility('moldbreaker', pokemon, true);
						this.add('-activate', pokemon, 'ability: Mold Breaker');
						break;
					case 'Blastoise':
						pokemon.setAbility('stamina', pokemon, true);
						this.add('-activate', pokemon, 'ability: Stamina');
						break;
					case 'Butterfree':
						pokemon.setAbility('soulheart', pokemon, true);
						this.add('-activate', pokemon, 'ability: Soul-Heart');
						break;
					case 'Pikachu':
						pokemon.setAbility('hugepower', pokemon, true);
						this.add('-activate', pokemon, 'ability: Huge Power');
						break;
					case 'Meowth':
						pokemon.setAbility('limber', pokemon, true);
						this.add('-activate', pokemon, 'ability: Limber');
						break;
					case 'Machamp':
						pokemon.setAbility('scrappy', pokemon, true);
						this.add('-activate', pokemon, 'ability: Scrappy');
						break;
					case 'Gengar':
						pokemon.setAbility('corrosion', pokemon, true);
						this.add('-activate', pokemon, 'ability: Corrosion');
						break;
					case 'Kingler':
						pokemon.setAbility('angershell', pokemon, true);
						this.add('-activate', pokemon, 'ability: Anger Shell');
						break;
					case 'Lapras':
						pokemon.setAbility('icescales', pokemon, true);
						this.add('-activate', pokemon, 'ability: Ice Scales');
						break;
					case 'Eevee':
						pokemon.setAbility('friendguard', pokemon, true);
						this.add('-activate', pokemon, 'ability: Friend Guard');
						break;
					case 'Snorlax':
						pokemon.setAbility('naturalcure', pokemon, true);
						this.add('-activate', pokemon, 'ability: Natural Cure');
						break;
					case 'Garbodor':
						pokemon.setAbility('toxicdebris', pokemon, true);
						this.add('-activate', pokemon, 'ability: Toxic Debris');
						break;
					case 'Melmetal':
						pokemon.setAbility('liquidooze', pokemon, true);
						this.add('-activate', pokemon, 'ability: Liquid Ooze');
						break;
					case 'Rillaboom':
						pokemon.setAbility('grasspelt', pokemon, true);
						this.add('-activate', pokemon, 'ability: Grass Pelt');
						break;
					case 'Cinderace':
						pokemon.setAbility('magicguard', pokemon, true);
						this.add('-activate', pokemon, 'ability: Magic Guard');
						break;
					case 'Inteleon':
						pokemon.setAbility('analytic', pokemon, true);
						this.add('-activate', pokemon, 'ability: Analytic');
						break;
					case 'Corviknight':
						pokemon.setAbility('intimidate', pokemon, 'intimidate', true);
						//this.add('-activate', pokemon, 'ability: Intimidate');
						break;
					case 'Orbeetle':
						pokemon.setAbility('psychicsurge', pokemon, true);
						this.add('-activate', pokemon, 'ability: Psychic Surge');
						break;
					case 'Drednaw':
						pokemon.setAbility('solidrock', pokemon, true);
						this.add('-activate', pokemon, 'ability: Solid Rock');
						break;
					case 'Coalossal':
						pokemon.setAbility('desolateland', pokemon, true);
						this.add('-activate', pokemon, 'ability: Desolate Land');
						break;
					case 'Appletun':
						pokemon.setAbility('grassysurge', pokemon, true);
						this.add('-activate', pokemon, 'ability: Grassy Surge');
						break;
					case 'Flapple':
						pokemon.setAbility('tintedlens', pokemon, true);
						this.add('-activate', pokemon, 'ability: Tinted Lens');
						break;
					case 'Sandaconda':
						pokemon.setAbility('sandrush', pokemon, true);
						this.add('-activate', pokemon, 'ability: Sand Rush');
						break;
					case 'Toxtricity':
						pokemon.setAbility('merciless', pokemon, true);
						this.add('-activate', pokemon, 'ability: Merciless');
						break;
					case 'Toxtricity-Low-Key':
						pokemon.setAbility('electromorphosis', pokemon, true);
						this.add('-activate', pokemon, 'ability: Electromorphosis');
						break;
					case 'Centiskorch':
						pokemon.setAbility('dryskin', pokemon, true);
						this.add('-activate', pokemon, 'ability: Dry Skin');
						break;
					case 'Hatterene':
						pokemon.setAbility('regenerator', pokemon, true);
						this.add('-activate', pokemon, 'ability: Regenerator');
						break;
					case 'Grimmsnarl':
						pokemon.setAbility('mistysurge', pokemon, true);
						this.add('-activate', pokemon, 'ability: Misty Surge');
						break;
					case 'Alcremie':
						pokemon.setAbility('wellbakedbody', pokemon, true);
						this.add('-activate', pokemon, 'ability: Well-Baked Body');
						break;
					case 'Copperajah':
						pokemon.setAbility('bulletproof', pokemon, true);
						this.add('-activate', pokemon, 'ability: Bulletproof');
						break;
					case 'Duraludon':
						pokemon.setAbility('unaware', pokemon, true);
						this.add('-activate', pokemon, 'ability: Unaware');
						break;
					case 'Urshifu':
						pokemon.setAbility('ironfist', pokemon, true);
						this.add('-activate', pokemon, 'ability: Iron Fist');
						break;
					case 'Urshifu-Rapid-Strike':
						pokemon.setAbility('ironfist', pokemon, true);
						this.add('-activate', pokemon, 'ability: Iron Fist');
						break;
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
			if (pokemon.gigantamax) {
				pokemon.maxhp = Math.floor(pokemon.maxhp * 1.5);
				pokemon.hp = Math.floor(pokemon.hp * 1.5);
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			} else {
				// Changes based on dynamax level, 2 is max (at LVL 10)
				const ratio = 1.5 + (pokemon.dynamaxLevel * 0.05);
				pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
				pokemon.hp = Math.floor(pokemon.hp * ratio);
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
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
			if (target.terastallized && ['centiskorch'].includes(target.species.name)) {
				return this.chainModify(0.75);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (['behemothbash','behemothblade','dynamaxcannon','terablast'].includes(move.id)) {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			if (!pokemon.gigantamax) {
				this.add('-block', pokemon, 'Dynamax');
				return null;
			}
			if (pokemon.gigantamax) {
				pokemon.removeVolatile('dynamax');
			}
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
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast no longer continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			const gmaxCenti = ['gmaxcentiferno'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			if (!['gmaxcentiferno'].includes(this.effectState.sourceEffect.id)) {
				this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
	},
};
