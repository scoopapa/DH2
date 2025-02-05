export const Moves: {[moveid: string]: ModdedMoveData} = {
	//World Effects
	cursedfield: { // CURSED FIELD
		name: "Cursed Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Ground",
		shortDesc: "1/8 Dmg on switch-in. Tox after 3 turns. Dark and Ghost immune.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'cursedfield',
		condition: {
			duration: 0,
			onStart(pokemon){
				this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
			},
			onSwitchIn(pokemon) {
				let dmgDiv = 8;
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'cursedfield')) return;
				if (pokemon.hasAbility("overcoat")) dmgDiv = 16;
				this.damage(pokemon.maxhp / dmgDiv);
				pokemon.m.fieldTurns = 0;
			},
			onFieldStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Cursed Field', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Cursed Field');
				}
				this.dex.dataCache.scootopia.worldEffectStart('cursedfield', source);
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				if (!pokemon.m.lastField || pokemon.m.lastField !== "cursedfield") {
					this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
				}
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'cursedfield')) return;
				if (pokemon.m.fieldTurns > pokemon.activeTurns) pokemon.m.fieldTurns = pokemon.activeTurns;
				pokemon.m.fieldTurns++;
				if (pokemon.m.fieldTurns === 3) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0], this.field.getTerrain());
					pokemon.m.fieldTurns = 0;
				}
			},
			onFieldEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Cursed Field');
			},
		},
		secondary: null,
		target: "all",
	},
	
	blessedfield: { // BLESSED FIELD
		name: "Blessed Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Ground",
		shortDesc: "1/8 Heal on switch-in. Status heal after 3 turns. Dark and Ghost unaffected.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'blessedfield',
		condition: {
			duration: 0,
			onStart(pokemon){
				this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
			},
			onSwitchIn(pokemon) {
				if (this.dex.dataCache.scootopia.getImmunity(pokemon,'blessedfield')) return;
				this.heal(pokemon.maxhp / 8);
				this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Blessed Field', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Blessed Field');
				}
				this.dex.dataCache.scootopia.worldEffectStart('blessedfield', source);
			},
			onResidualOrder: 5,
			onResidualSubOrder: 9,
			onResidual(pokemon) {
				if (!pokemon.m.lastField || pokemon.m.lastField !== "blessedfield") {
					this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
				}
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'blessedfield')) return; //what the fuck
				if (pokemon.m.fieldTurns > pokemon.activeTurns) pokemon.m.fieldTurns = pokemon.activeTurns;
				pokemon.m.fieldTurns++;
				if (pokemon.m.fieldTurns === 3) {
					pokemon.cureStatus();
					this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
				}
			},
			onFieldEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Blessed Field');
			},
		},
		secondary: null,
		target: "all",
	},
	
	rainofmeteors: { // RAIN OF METEORS
		name: "Rain of Meteors",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Flying",
		shortDesc: "1/8 damage to all active Pokemon each turn. Rock and Steel take 1/16.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'rainofmeteors',
		condition: {
			duration: 0,
			onStart(pokemon){
				this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Rain of Meteors', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Rain of Meteors');
				}
				this.dex.dataCache.scootopia.worldEffectStart('rainofmeteors', source);
			},
			onResidualOrder: 6,
			onResidualSubOrder: 9,
			onResidual(pokemon) {
				// let pokemon = field.battle.activePokemon;
				// if (!pokemon) return;
				if (!pokemon.m.lastField || pokemon.m.lastField !== "rainofmeteors") {
					this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
				}
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'rainofmeteors')) return;
				let dmgDiv = 8;
				if (pokemon.hasType("Steel") || pokemon.hasType("Rock") || pokemon.hasAbility("Overcoat")) dmgDiv = 16;
				console.log(dmgDiv + ' ' + pokemon.name);
				this.damage(pokemon.maxhp / dmgDiv);
			},
			onFieldEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Rain of Meteors');
			},
		},
		secondary: null,
		target: "all",
	},
	
	rainofdew: { // RAIN OF DEW
		name: "Rain of Dew",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Flying",
		shortDesc: "1/16 heal to all active Pokemon each turn. Pseudo-Rain.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'rainofdew',
		condition: {
			duration: 0,
			onStart(pokemon){
				this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
			},
			onFieldStart(field, source, effect) {
				console.log('hi');
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Rain of Dew', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Rain of Dew');
				}
				this.dex.dataCache.scootopia.worldEffectStart('rainofdew', source);
			},
			onResidualOrder: 5,
			onResidualSubOrder: 9,
			onResidual(pokemon) {
				if (!pokemon.m.lastField || pokemon.m.lastField !== "rainofdew") {
					this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
				}
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'rainofdew')) return;
				let dmgDiv = 16;
				if (!pokemon.effectiveWeather() === "raindance") {
					if (pokemon.hasAbility("Rain Dish")) dmgDiv = 8;
					if (pokemon.hasAbility("Dry Skin")) dmgDiv = 5.3333334;
				}
				this.heal(pokemon.maxhp / dmgDiv);
			},
			onFieldEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Rain of Dew');
			},
		},
		secondary: null,
		target: "all",
	},
	
	silentdomain: { // SILENT DOMAIN
		name: "Silent Domain",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Psychic",
		shortDesc: "Reduces stat changes each turn. No Sound Moves or Critical Hits.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'silentdomain',
		condition: {
			duration: 0,
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Silent Domain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Silent Domain');
				}
				this.dex.dataCache.scootopia.worldEffectStart('silentdomain', source);
			},
			onCriticalHit: false,
			onDisableMove(pokemon) {
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'silentdomain')) return;
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['sound']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onStart(pokemon){
				this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'silentdomain')) return;
				if (!move.isZ && !move.isMax && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Throat Chop');
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'silentdomain')) return;
				if (!move.isZ && !move.isMax && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Throat Chop');
					return false;
				}
			},
			onResidual(pokemon) {
				if (!pokemon.m.lastField || pokemon.m.lastField !== "silentdomain") {
					this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
				}
				const toBoost = {};
				for (const boost in pokemon.boosts) {
					if (pokemon.boosts[boost] > 0 && !this.dex.dataCache.scootopia.getImmunity(pokemon, 'silentdomain')) toBoost[boost] = -1;
					else if (pokemon.boosts[boost] < 0) toBoost[boost] = 1;
				}
				this.boost(toBoost, pokemon, pokemon, null, true, false);
			},
			onFieldEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Silent Domain');
			},
		},
		secondary: null,
		target: "all",
	},
	
	stellaralignment: { // STELLAR ALIGNMENT
		name: "Stellar Alignment",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Psychic",
		shortDesc: "Pokemon get pumped after 3 turns. +10% Accuracy. Pseudo-Sun",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'stellaralignment',
		condition: {
			duration: 0,
			onStart(pokemon){
				this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Stellar Alignment', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Stellar Alignment');
				}
				this.dex.dataCache.scootopia.worldEffectStart('stellaralignment', source);
			},
			onModifyAccuracy(accuracy) {
				if (typeof accuracy !== 'number') return;
				return this.chainModify(1.1);
			},
			onResidualOrder: 5,
			onResidualSubOrder: 9,
			onResidual(pokemon) {
				if (!pokemon.m.lastField || pokemon.m.lastField !== "stellaralignment") {
					this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
				}
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'stellaralignment')) return;
				pokemon.m.fieldTurns++;
				if (pokemon.m.fieldTurns > pokemon.activeTurns) pokemon.m.fieldTurns = pokemon.activeTurns;
				if (pokemon.m.fieldTurns === 3) {
					if (!pokemon.volatiles['focusenergy']) pokemon.addVolatile('focusenergy');
					pokemon.m.fieldTurns = 0;
				}
				if (pokemon.hasAbility('solarpower') && pokemon.effectiveWeather() !== 'sunnyday'){
					this.damage(pokemon.maxhp / 8);
				}
			},
			onFieldEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Stellar Alignment');
			},
		},
		secondary: null,
		target: "all",
	},
	
	chaoticweather: { // CHAOTIC WEATHER
		name: "Chaotic Weather",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Dark",
		shortDesc: "Moves change weather. 1/16 dmg if no weather. Wind.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'chaoticweather',
		condition: {
			duration: 0,
			onStart(pokemon){
				this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Chaotic Weather', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Chaotic Weather');
				}
				for (const side of field.battle.sides) {
					for (const pokemon of side.active) {
						if (pokemon.hasAbility('windrider')) this.boost({atk: 1},pokemon);
					}
				}
				this.dex.dataCache.scootopia.worldEffectStart('chaoticweather', source);
			},
			onResidual(pokemon) {
				if (!pokemon.m.lastField || pokemon.m.lastField !== "chaoticweather") {
					pokemon.m.lastField = "chaoticweather";
					pokemon.m.fieldTurns = 0;
				}
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'chaoticweather')) return;
				if (pokemon.effectiveWeather() === '') {
					this.damage(pokemon.maxhp / 16);
				}
			},
			onModifyMove(move) {
				switch (move.type){
					case "Water":
						move.weather = "raindance";
					break;
					case "Fire":
						move.weather = "sunnyday";
					break;
					case "Rock":
						move.weather = "sandstorm";
					break;
					case "Ice":
						move.weather = "snow";
					break
				}
			},
			onFieldEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Chaotic Weather');
			},
		},
		secondary: null,
		target: "all",
	},
	
	chaoticterrain: { // CHAOTIC TERRAIN
		name: "Chaotic Terrain",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Dark",
		shortDesc: "Moves change terrain. 1/16 dmg to grounded if no terrain.",
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'chaoticterrain',
		condition: {
			duration: 0,
			onStart(pokemon){
				this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Chaotic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Chaotic Terrain');
				}
				this.dex.dataCache.scootopia.worldEffectStart('chaoticterrain', source);
			},
			onModifyMove(move) {
				switch (move.type){
					case "Grass":
						move.terrain = "grassyterrain";
					break;
					case "Electric":
						move.terrain = "electricterrain";
					break;
					case "Psychic":
						move.terrain = "psychicterrain";
					break;
					case "Fairy":
						move.terrain = "mistyterrain";
					break
				}
			},
			onResidual(pokemon) {
				if (!pokemon.m.lastField || pokemon.m.lastField !== "chaoticterrain") {
					this.dex.dataCache.scootopia.resetWorldEffectTurns(pokemon);
				}
				if (this.dex.dataCache.scootopia.getImmunity(pokemon, 'chaoticterrain')) return;
				if (!this.field.terrain && pokemon.isGrounded()) {
					this.damage(pokemon.maxhp / 16);
				}
			},
			onFieldEnd() {
				if (!this.effectState.duration) this.eachEvent('PseudoWeather');
				this.add('-fieldend', 'move: Chaotic Terrain');
			},
		},
		secondary: null,
		target: "all",
	},
	// World Effect-Related Moves
	rebalance: {
		num: 432,
		shortDesc: "Clears World Effects. Fails if no World Effect",
		category: "Special",
		name: "Rebalance",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[anim] Expanding Force ' + move.type);
		},
		accuracy: 100,
		basePower: 110,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTry(pokemon) {
			return !!this.dex.dataCache.scootopia.getWorldEffect(pokemon);
		},
		onTryHit(pokemon) {
			this.field.removePseudoWeather(this.dex.dataCache.scootopia.getWorldEffect(pokemon));
		},
		onAfterSubDamage(pokemon) {
			this.field.removePseudoWeather(this.dex.dataCache.scootopia.getWorldEffect(pokemon));
		},
		secondary: null,
		target: "allAdjacent",
		type: "Psychic",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	
	iconoblast: {
		num: 851,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Iconoblast",
		shortDesc: "Sets World Effect from user's moveset.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, mustpressure: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[anim] Tera Blast ' + move.type);
		},
		onModifyType(move, pokemon, target) {
			let wMove = this.dex.dataCache.scootopia.getWorldEffectMove(pokemon)
			if (!wMove) return;
			wMove = this.dex.moves.get(wMove);
			if (wMove.type) move.type = wMove.type;
		},
		onModifyMove(move, pokemon, target){
			let wMove = this.dex.dataCache.scootopia.getWorldEffectMove(pokemon)
			if (!wMove) return;
			wMove = this.dex.moves.get(wMove);
			if (wMove.pseudoWeather) move.pseudoWeather = wMove.pseudoWeather;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	
	legacyshade: {
		num: 881,
		accuracy: true,
		basePower: 0,
		shortDesc: "User switches. Sets World Effect from user's moveset.",
		category: "Status",
		name: "Legacy Shade",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[anim] Chilly Reception ' + move.type);
		},
		pp: 5,
		priority: 0,
		flags: {},
		onModifyMove(move, pokemon, target){
			let wMove = this.dex.dataCache.scootopia.getWorldEffectMove(pokemon)
			if (!wMove) return;
			wMove = this.dex.moves.get(wMove);
			if (wMove.pseudoWeather) move.pseudoWeather = wMove.pseudoWeather;
		},
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "Ghost",
	},
	
	// Modified moves
	defog: {
		inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			this.field.removePseudoWeather(this.dex.dataCache.scootopia.getWorldEffect(target));
			return success;
		},
	},
	
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
				factor = 0.25;
				break;
			}
			if (this.dex.dataCache.scootopia.getWorldEffect(pokemon) === 'stellaralignment') factor = factor < 0.5 ? 0.667 : 0.334;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
				factor = 0.25;
				break;
			}
			if (this.dex.dataCache.scootopia.getWorldEffect(pokemon) === 'stellaralignment') factor = factor < 0.5 ? 0.667 : 0.334;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				break;
			}
			if (move.type == 'Normal' && this.dex.dataCache.scootopia.getWorldEffect(pokemon) === 'rainofdew') move.type = 'Water';
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
			if (move.basePower == 50 && this.dex.dataCache.scootopia.getWorldEffect(pokemon) === 'rainofdew') move.basePower *= 2;
		},
	},
	
	solarbeam: {
		inherit:true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather()) || this.dex.dataCache.scootopia.getWorldEffect(attacker) === 'stellaralignment') {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	
	solarblade: {
		inherit:true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather()) || this.dex.dataCache.scootopia.getWorldEffect(attacker) === 'stellaralignment') {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	
	// Custom Moves
	shedtail: {
		num: 880,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shed Tail",
		pp: 10,
		priority: 0,
		flags: {},
		shortDesc: "Sac 12.5% HP, switch, heal ally 25%. Ally: 50% dmg redux this turn.",
		onTryHit(source) {
			if (!this.canSwitch(source.side)) {
				this.add('-fail', source);
				return this.NOT_FAIL;
			}
			if (source.hp <= Math.ceil(source.maxhp / 8)) {
				this.add('-fail', source, 'move: Shed Tail', '[weak]');
				return this.NOT_FAIL;
			}
		},
		onHit(target) {
			this.directDamage(Math.ceil(target.maxhp / 8));
		},
		slotCondition: 'shedtail',
		condition: {
			duration: 1,
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.maxhp / 4);
					this.add('-heal', target, target.getHealth, '[from] move: Healing Wish');
				}
			},
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onModifySpD(spd, pokemon) {
				return this.chainModify(2);
			},
		},
		selfSwitch: 'shedtail',
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
	},
	energysiphon: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Energy Siphon",
		shortDesc: "Drains target's HP for 3 turns.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, contact: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		volatileStatus: 'energysiphon',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fell Stinger", target);
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Energy Siphon');
			},
			duration: 3,
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['energysiphon'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					console.log('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage / 2, target, pokemon);
				}
			},
		},
	},
	// Modified Status Moves
	sheercold: {
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Sheer Cold",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'frz',
		shortDesc: "Inflicts Freeze status on the opponent (1/16 Residual damage, halved SpA).",
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
		viable: true,
	},
	spore: {
		inherit: true,
		pp: 10,
		desc: "Puts the opponent to sleep for 1 turn",
		viable: true,
	},
	sleeppowder: {
		inherit: true,
		pp: 15,
		accuracy: 90,
		desc: "Puts the opponent to sleep for 1 turn",
		viable: true,
	},
	hypnosis: {
		inherit: true,
		pp: 20,
		accuracy: 85,
		desc: "Puts the opponent to sleep for 1 turn",
		viable: true,
	},
	grasswhistle: {
		inherit: true,
		isNonstandard: null,
		pp: 25,
		accuracy: 80,
		desc: "Puts the opponent to sleep for 1 turn",
		viable: true,
	},
	
	
	karatechop: {
		inherit: true,
		isNonstandard: null,
	},
	doubleslap: {
		inherit: true,
		isNonstandard: null,
	},
	cometpunch: {
		inherit: true,
		isNonstandard: null,
	},
	razorwind: {
		inherit: true,
		isNonstandard: null,
	},
	jumpkick: {
		inherit: true,
		isNonstandard: null,
	},
	rollingkick: {
		inherit: true,
		isNonstandard: null,
	},
	twineedle: {
		inherit: true,
		isNonstandard: null,
	},
	sonicboom: {
		inherit: true,
		isNonstandard: null,
	},
	submission: {
		inherit: true,
		isNonstandard: null,
	},
	dragonrage: {
		inherit: true,
		isNonstandard: null,
	},
	meditate: {
		inherit: true,
		isNonstandard: null,
	},
	rage: {
		inherit: true,
		isNonstandard: null,
	},
	barrier: {
		inherit: true,
		isNonstandard: null,
	},
	bide: {
		inherit: true,
		isNonstandard: null,
	},
	mirrormove: {
		inherit: true,
		isNonstandard: null,
	},
	eggbomb: {
		inherit: true,
		isNonstandard: null,
	},
	boneclub: {
		inherit: true,
		isNonstandard: null,
	},
	clamp: {
		inherit: true,
		isNonstandard: null,
	},
	skullbash: {
		inherit: true,
		isNonstandard: null,
	},
	spikecannon: {
		inherit: true,
		isNonstandard: null,
	},
	constrict: {
		inherit: true,
		isNonstandard: null,
	},
	kinesis: {
		inherit: true,
		isNonstandard: null,
	},
	barrage: {
		inherit: true,
		isNonstandard: null,
	},
	lovelykiss: {
		inherit: true,
		isNonstandard: null,
	},
	bubble: {
		inherit: true,
		isNonstandard: null,
	},
	dizzypunch: {
		inherit: true,
		isNonstandard: null,
	},
	flash: {
		inherit: true,
		isNonstandard: null,
	},
	psywave: {
		inherit: true,
		isNonstandard: null,
	},
	bonemerang: {
		inherit: true,
		isNonstandard: null,
	},
	hyperfang: {
		inherit: true,
		isNonstandard: null,
	},
	sharpen: {
		inherit: true,
		isNonstandard: null,
	},
	conversion: {
		inherit: true,
		isNonstandard: null,
	},
	sketch: {
		inherit: true,
		isNonstandard: null,
	},
	triplekick: {
		inherit: true,
		isNonstandard: null,
	},
	spiderweb: {
		inherit: true,
		isNonstandard: null,
	},
	mindreader: {
		inherit: true,
		isNonstandard: null,
	},
	nightmare: {
		inherit: true,
		isNonstandard: null,
	},
	conversion2: {
		inherit: true,
		isNonstandard: null,
	},
	aeroblast: {
		inherit: true,
		isNonstandard: null,
	},
	feintattack: {
		inherit: true,
		isNonstandard: null,
	},
	octazooka: {
		inherit: true,
		isNonstandard: null,
	},
	foresight: {
		inherit: true,
		isNonstandard: null,
	},
	return: {
		inherit: true,
		isNonstandard: null,
	},
	frustration: {
		inherit: true,
		isNonstandard: null,
	},
	sacredfire: {
		inherit: true,
		isNonstandard: null,
	},
	magnitude: {
		inherit: true,
		isNonstandard: null,
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	vitalthrow: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	hail: {
		inherit: true,
		isNonstandard: null,
	},
	smellingsalts: {
		inherit: true,
		isNonstandard: null,
	},
	naturepower: {
		inherit: true,
		isNonstandard: null,
	},
	assist: {
		inherit: true,
		isNonstandard: null,
	},
	magiccoat: {
		inherit: true,
		isNonstandard: null,
	},
	revenge: {
		inherit: true,
		isNonstandard: null,
	},
	refresh: {
		inherit: true,
		isNonstandard: null,
	},
	grudge: {
		inherit: true,
		isNonstandard: null,
	},
	snatch: {
		inherit: true,
		isNonstandard: null,
	},
	secretpower: {
		inherit: true,
		isNonstandard: null,
	},
	camouflage: {
		inherit: true,
		isNonstandard: null,
	},
	tailglow: {
		inherit: true,
		isNonstandard: null,
	},
	lusterpurge: {
		inherit: true,
		isNonstandard: null,
	},
	mistball: {
		inherit: true,
		isNonstandard: null,
	},
	mudsport: {
		inherit: true,
		isNonstandard: null,
	},
	iceball: {
		inherit: true,
		isNonstandard: null,
	},
	needlearm: {
		inherit: true,
		isNonstandard: null,
	},
	aromatherapy: {
		inherit: true,
		isNonstandard: null,
	},
	odorsleuth: {
		inherit: true,
		isNonstandard: null,
	},
	silverwind: {
		inherit: true,
		isNonstandard: null,
	},
	signalbeam: {
		inherit: true,
		isNonstandard: null,
	},
	skyuppercut: {
		inherit: true,
		isNonstandard: null,
	},
	watersport: {
		inherit: true,
		isNonstandard: null,
	},
	doomdesire: {
		inherit: true,
		isNonstandard: null,
	},
	psychoboost: {
		inherit: true,
		isNonstandard: null,
	},
	miracleeye: {
		inherit: true,
		isNonstandard: null,
	},
	wakeupslap: {
		inherit: true,
		isNonstandard: null,
	},
	naturalgift: {
		inherit: true,
		isNonstandard: null,
	},
	embargo: {
		inherit: true,
		isNonstandard: null,
	},
	psychoshift: {
		inherit: true,
		isNonstandard: null,
	},
	trumpcard: {
		inherit: true,
		isNonstandard: null,
	},
	healblock: {
		inherit: true,
		isNonstandard: null,
	},
	wringout: {
		inherit: true,
		isNonstandard: null,
	},
	luckychant: {
		inherit: true,
		isNonstandard: null,
	},
	mefirst: {
		inherit: true,
		isNonstandard: null,
	},
	punishment: {
		inherit: true,
		isNonstandard: null,
	},
	mudbomb: {
		inherit: true,
		isNonstandard: null,
	},
	mirrorshot: {
		inherit: true,
		isNonstandard: null,
	},
	rockclimb: {
		inherit: true,
		isNonstandard: null,
	},
	rockwrecker: {
		inherit: true,
		isNonstandard: null,
	},
	magnetbomb: {
		inherit: true,
		isNonstandard: null,
	},
	captivate: {
		inherit: true,
		isNonstandard: null,
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
	},
	healorder: {
		inherit: true,
		isNonstandard: null,
	},
	crushgrip: {
		inherit: true,
		isNonstandard: null,
	},
	darkvoid: {
		inherit: true,
		isNonstandard: null,
	},
	seedflare: {
		inherit: true,
		isNonstandard: null,
	},
	ominouswind: {
		inherit: true,
		isNonstandard: null,
	},
	autotomize: {
		inherit: true,
		isNonstandard: null,
	},
	telekinesis: {
		inherit: true,
		isNonstandard: null,
	},
	stormthrow: {
		inherit: true,
		isNonstandard: null,
	},
	flameburst: {
		inherit: true,
		isNonstandard: null,
	},
	synchronoise: {
		inherit: true,
		isNonstandard: null,
	},
	chipaway: {
		inherit: true,
		isNonstandard: null,
	},
	skydrop: {
		inherit: true,
		isNonstandard: null,
	},
	bestow: {
		inherit: true,
		isNonstandard: null,
	},
	dualchop: {
		inherit: true,
		isNonstandard: null,
	},
	heartstamp: {
		inherit: true,
		isNonstandard: null,
	},
	leaftornado: {
		inherit: true,
		isNonstandard: null,
	},
	steamroller: {
		inherit: true,
		isNonstandard: null,
	},
	headcharge: {
		inherit: true,
		isNonstandard: null,
	},
	geargrind: {
		inherit: true,
		isNonstandard: null,
	},
	searingshot: {
		inherit: true,
		isNonstandard: null,
	},
	technoblast: {
		inherit: true,
		isNonstandard: null,
	},
	secretsword: {
		inherit: true,
		isNonstandard: null,
	},
	glaciate: {
		inherit: true,
		isNonstandard: null,
	},
	boltstrike: {
		inherit: true,
		isNonstandard: null,
	},
	blueflare: {
		inherit: true,
		isNonstandard: null,
	},
	freezeshock: {
		inherit: true,
		isNonstandard: null,
	},
	iceburn: {
		inherit: true,
		isNonstandard: null,
	},
	fusionflare: {
		inherit: true,
		isNonstandard: null,
	},
	fusionbolt: {
		inherit: true,
		isNonstandard: null,
	},
	matblock: {
		inherit: true,
		isNonstandard: null,
	},
	rototiller: {
		inherit: true,
		isNonstandard: null,
	},
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	iondeluge: {
		inherit: true,
		isNonstandard: null,
	},
	forestscurse: {
		inherit: true,
		isNonstandard: null,
	},
	topsyturvy: {
		inherit: true,
		isNonstandard: null,
	},
	craftyshield: {
		inherit: true,
		isNonstandard: null,
	},
	flowershield: {
		inherit: true,
		isNonstandard: null,
	},
	electrify: {
		inherit: true,
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	venomdrench: {
		inherit: true,
		isNonstandard: null,
	},
	powder: {
		inherit: true,
		isNonstandard: null,
	},
	geomancy: {
		inherit: true,
		isNonstandard: null,
	},
	poweruppunch: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	thousandarrows: {
		inherit: true,
		isNonstandard: null,
	},
	thousandwaves: {
		inherit: true,
		isNonstandard: null,
	},
	landswrath: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	sparklingaria: {
		inherit: true,
		isNonstandard: null,
	},
	floralhealing: {
		inherit: true,
		isNonstandard: null,
	},
	spotlight: {
		inherit: true,
		isNonstandard: null,
	},
	toxicthread: {
		inherit: true,
		isNonstandard: null,
	},
	laserfocus: {
		inherit: true,
		isNonstandard: null,
	},
	gearup: {
		inherit: true,
		isNonstandard: null,
	},
	anchorshot: {
		inherit: true,
		isNonstandard: null,
	},
	purify: {
		inherit: true,
		isNonstandard: null,
	},
	coreenforcer: {
		inherit: true,
		isNonstandard: null,
	},
	beakblast: {
		inherit: true,
		isNonstandard: null,
	},
	clangingscales: {
		inherit: true,
		isNonstandard: null,
	},
	dragonhammer: {
		inherit: true,
		isNonstandard: null,
	},
	shelltrap: {
		inherit: true,
		isNonstandard: null,
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
	},
	prismaticlaser: {
		inherit: true,
		isNonstandard: null,
	},
	spectralthief: {
		inherit: true,
		isNonstandard: null,
	},
	sunsteelstrike: {
		inherit: true,
		isNonstandard: null,
	},
	moongeistbeam: {
		inherit: true,
		isNonstandard: null,
	},
	naturesmadness: {
		inherit: true,
		isNonstandard: null,
	},
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	mindblown: {
		inherit: true,
		isNonstandard: null,
	},
	plasmafists: {
		inherit: true,
		isNonstandard: null,
	},
	photongeyser: {
		inherit: true,
		isNonstandard: null,
	},
	doubleironbash: {
		inherit: true,
		isNonstandard: null,
	},
	maxguard: {
		inherit: true,
		isNonstandard: null,
	},
	octolock: {
		inherit: true,
		isNonstandard: null,
	},
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	clangoroussoul: {
		inherit: true,
		isNonstandard: null,
	},
	decorate: {
		inherit: true,
		isNonstandard: null,
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
	},
	aurawheel: {
		inherit: true,
		isNonstandard: null,
	},
	strangesteam: {
		inherit: true,
		isNonstandard: null,
	},
	obstruct: {
		inherit: true,
		isNonstandard: null,
	},
	meteorassault: {
		inherit: true,
		isNonstandard: null,
	},
	eternabeam: {
		inherit: true,
		isNonstandard: null,
	},
	
	crystalcutter: {
		inherit: true,
		isNonstandard: "Past",
	},
	crystalbash: {
		inherit: true,
		isNonstandard: "Past",
	},
	crystaltail: {
		inherit: true,
		isNonstandard: "Past",
	},
	crystalcage: {
		inherit: true,
		isNonstandard: "Past",
	},
	crystalbeam: {
		inherit: true,
		isNonstandard: "Past",
	},
	crystalburst: {
		inherit: true,
		isNonstandard: "Past",
	},
	crystalhealing: {
		inherit: true,
		isNonstandard: "Past",
	},
	crystalfortification: {
		inherit: true,
		isNonstandard: "Past",
	},
	crystalshard: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralshred: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralbite: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralrush: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralbreath: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralshriek: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralpower: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralspray: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralresilience: {
		inherit: true,
		isNonstandard: "Past",
	},
	feralhealing: {
		inherit: true,
		isNonstandard: "Past",
	},
};
