export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	icescales: {
		shortDesc: "This Pokémon takes 75% damage from special attacks and 90% damage from physical attacks.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				this.debug('Ice Scales weaken damage');
				return this.chainModify(0.75);
			}
			if (move.category === 'Physical') {
				this.debug('Ice Scales weaken damage');
				return this.chainModify(0.9);
			}
		},
		flags: {breakable: 1},
		name: "Ice Scales",
		rating: 4,
		num: 1,
	},
	stellarize: {
		shortDesc: "This Pokémon's moves become Stellar type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id) &&
				// TODO: Figure out actual interaction
				!(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Stellar';
				move.typeChangerBoosted = this.effect;
				this.debug('Stellarize affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Stellarize",
		rating: 0,
		num: 2,
	},
	adaptability: {
		shortDesc: "This Pokémon's STAB is 1.75x.",
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				this.debug('Adaptability boost');
				return 1.75;
			}
		},
		flags: {},
		name: "Adaptability",
		rating: 4,
		num: 3,
	},
	poisonpuppeteer: {
		shortDesc: "If this Pokémon inflicts poison, it also inflicts confusion and taunts them.",
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('confusion');
				target.addVolatile('taunt');
				this.debug('Poison Puppeteer activated on ' + target);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Poison Puppeteer",
		rating: 3,
		num: 4,
	},
	solidrock: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Damage reduced (0.4x) by Solid Rock');
				return this.chainModify(0.4);
			}
		},
		flags: {breakable: 1},
		name: "Solid Rock",
		rating: 3,
		num: 5,
	},
	grassysurge: {
		shortDesc: "When this Pokémon is on the field, Grassy Terrain is active.",
		onStart(source) {
			this.field.setTerrain('grassyterrain');
		},
		flags: {},
		name: "Grassy Surge",
		rating: 4,
		num: 6,
	},
	// electromorphosis
	waterbubble: {
		shortDesc: "This Pokémon cannot be burned, and its Water-type attacks do 1.5x damage.",
		onSourceModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Bubble');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Bubble');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Water Bubble",
		rating: 4.5,
		num: 8,
	},
};
