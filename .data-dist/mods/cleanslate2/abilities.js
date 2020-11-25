"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Abilities = {
	"powerspot": {
		shortDesc: "This Pokemon and it's allies have the base power of their moves multiplied by 1.3.",
		onAllyBasePowerPriority: 8,
		onAllyBasePower(basePower, attacker, defender, move) {
			this.debug('Power Spot boost');
			return this.chainModify([0x14CD, 0x1000]);
		},
		id: "powerspot",
		name: "Power Spot",
		rating: 0,
		num: 249,
	},
	"zephyr": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Inner Focus, Oblivious, Own Tempo, Scrappy, and Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon applies the Fairy Lock status to the target.",
		onTryMove(pokemon) {
			pokemon.addVolatile( 'zephyr' );
		},
		onFoeTrapPokemon(pokemon) {
			console.log(pokemon.activeTurns);
			let source = this.effectData.target;
			if (source && this.isAdjacent(pokemon, source) && !source.volatiles['zephyr']) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source) || source.volatiles['zephyr']) return;
			pokemon.maybeTrapped = true;
		},
		id: "zephyr",
		name: "Zephyr",
		rating: 3.5,
		num: 22,
	},
	"grounding": {
		desc: "This Pokemon is immune to Grounding-type moves and raises its Special Attack by 1 stage when hit by an Grounding-type move. If this Pokemon is not the target of a single-target Electric-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move.",
		shortDesc: "This Pokemon draws Ground moves to itself to raise Sp. Atk by 1; Grounding immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Grounding');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Ground' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			if (this.validTarget(this.effectData.target, source, move.target)) {
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Grounding');
				}
				return this.effectData.target;
			}
		},
		id: "grounding",
		name: "Grounding",
		rating: 3,
		num: 32,
	},
	"humidifier": {
		desc: "If Rain Dance is active, this Pokemon's Fire-type attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x in Rain.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('raindance')) {
				if (move.type === 'Fire') {
					this.debug('Humidifier boost');
					return this.chainModify(1.5);
				}
			}
		},
		id: "humidifier",
		name: "Humidifier",
		rating: 2,
		num: 159,
	},
	"migration": {
		desc: "If this Pokemon is a Vivillon, its secondary type changes to the current weather condition's type. If this Pokemon is holding Utility Umbrella and the weather condition is Sunny Day, Desolate Land, Rain Dance, or Primordial Sea, it will not change types.",
		shortDesc: "Castform's type changes to the current weather condition's type, except Sandstorm.",
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.name !== 'Vivillon' || pokemon.transformed) return;
			let type = "None";
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.baseSpecies.id !== 'vivillonsun' && !pokemon.getTypes().includes( "Fire" )){
					type = 'Fire';
					forme = 'Vivillon-Sun';
				}
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.baseSpecies.id !== 'vivillonmarine' && !pokemon.getTypes().includes( "Water" )){
					type = 'Water';
					forme = 'Vivillon-Marine';
				}
				break;
			case 'hail':
				if (pokemon.baseSpecies.id !== 'vivillonpolar' && !pokemon.getTypes().includes( "Ice" )){
					type = 'Ice';
					forme = 'Vivillon-Polar';
				}
				break;
			case 'sandstorm':
			if (pokemon.baseSpecies.id !== 'vivillonsandstorm' && !pokemon.getTypes().includes( "Rock" )){
				type = 'Rock';
				forme = 'Vivillon-Sandstorm';
			}
			break;
			default:
				if (Object.keys(pokemon.getTypes()).length === 2){
					forme = 'Vivillon';
				}
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
				if ( !pokemon.getTypes().includes( type )){
					pokemon.setType("Flying");
					let newType = "Flying";
					if ( type !== "None" ){
						pokemon.addType(type);
						newType += "/" + type;
					}
					let battle = pokemon.battle;
					battle.add('-start', pokemon, 'typechange', newType, '[from] Migration');
				}
			}
		},
		id: "migration",
		name: "Migration",
		rating: 2,
		num: 59,
	},
	"malware": {
		desc: "On switch-in, this Pokemon lowers the Speed of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Speed of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Malware', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target, '[msg]');
				} else {
					this.boost({spe: -1}, target, pokemon);
				}
			}
		},
		id: "malware",
		name: "Malware",
		rating: 3.5,
		num: 22,
	},
}; exports.Abilities = Abilities;
