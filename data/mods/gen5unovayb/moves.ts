export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	hail: {
		num: 258,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, snow falls. Ice: 1.5x Def.",
		isNonstandard: null,
		name: "Hail",
		pp: 10,
		priority: 0,
		flags: {metronome: 1},
		weather: 'snow',
		secondary: null,
		target: "all",
		type: "Ice",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	blizzard: {
		num: 59,
		accuracy: 70,
		basePower: 120,
		category: "Special",
		name: "Blizzard",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	facade: {
		num: 263,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Power doubles if user is statused.",
		name: "Facade",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon) {
			if (pokemon.status || pokemon.hasAbility('comatose')) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "-1 evasion; clears hazards on both sides.",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1, wind: 1},
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
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	incinerate: {
		inherit: true,
		basePower: 60,
	},
	/*batonpass: {
		num: 226,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User switches out.",
		name: "Baton Pass",
		pp: 40,
		priority: 0,
		flags: {metronome: 1},
		onHit(target) {
			if (!this.canSwitch(target.side) || target.volatiles['commanded']) {
				this.attrLastMove('[still]');
				this.add('-fail', target);
				return this.NOT_FAIL;
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},*/
	teleport: {
		num: 100,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User switches out.",
		name: "Teleport",
		pp: 40,
		priority: 0,
		flags: {metronome: 1},
		onTry(source) {
			return !!this.canSwitch(source.side);
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'healreplacement'},
		contestType: "Cool",
	},
	stormthrow: {
		inherit: true,
		basePower: 50,
	},
	frostbreath: {
		inherit: true,
		basePower: 50,
		accuracy: 85,
	},
	tidyup: {
		inherit: true,
    	isNonstandard: null,
    	gen: 5,
	},
	relicsong: {
		num: 547,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "Usually goes first. Meloetta transforms. Phys if Atk > SpA.",
		name: "Relic Song",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: null,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'meloettapirouette' ? '' : '-Pirouette';
				pokemon.formeChange('Meloetta' + meloettaForme, this.effect, false, '[msg]');
			}
		},
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Beautiful",
	},
	upperhand: {
		inherit: true,
    	isNonstandard: null,
    	gen: 5,
	},
	swallow: {
		num: 256,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Swallow",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onTry(source) {
			this.heal(source.baseMaxhp / 3);
			return !!source.volatiles['stockpile'];
		},
		onHit(pokemon) {
			const healAmount = [0.17, 0.34, 0.67];
			const success = !!this.heal(this.modify(pokemon.maxhp, healAmount[(pokemon.volatiles['stockpile'].layers - 1)]));
			if (!success) this.add('-fail', pokemon, 'heal');
			pokemon.removeVolatile('stockpile');
			return success || this.NOT_FAIL;
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},
	spitup: {
		num: 255,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon) {
			if (!pokemon.volatiles['stockpile']?.layers) return 50;
			return pokemon.volatiles['stockpile'].layers * 100;
		},
		category: "Special",
		name: "Spit Up",
		pp: 10,
		priority: 0,
		flags: {protect: 1, metronome: 1},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('stockpile');
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	tachyoncutter: {
		inherit: true,
    	isNonstandard: null,
    	gen: 5,
	},
	mightycleave: {
		inherit: true,
		basePower: 65,
    	isNonstandard: null,
		flags: {mirror: 1, metronome: 1, slicing: 1},
    	gen: 5,
	},
	solarblade: {
		num: 669,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Raises Atk by 1, hits turn 2. Sun: no charge.",
		name: "Solar Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1, slicing: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1}, attacker, attacker, move);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
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
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.75);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
    	isNonstandard: null,
    	gen: 5,
	},
	outrage: {
		inherit: true,
		basePower: 100,
	},
	spark: {
		inherit: true,
		basePower: 70,
	},
	paraboliccharge: {
		inherit: true,
		basePower: 65,
		shortDesc: "User recovers 75% of the damage dealt.",
    	isNonstandard: null,
		drain: [3, 4],
    	gen: 5,
	},
	nightdaze: {
		num: 539,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Clears weather if it hits.",
		name: "Night Daze",
		viable: true,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit() {
			this.field.clearWeather();
		},
		onAfterSubDamage() {
			this.field.clearWeather();
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Cool",
	},
};
