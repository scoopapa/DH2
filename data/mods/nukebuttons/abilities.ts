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
		shortDesc: "If this Pokémon inflicts poison, it also taunts, torments, and flinches the target.",
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('confusion');
				target.addVolatile('taunt');
				target.addVolatile('torment');
				target.addVolatile('flinch');
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
		onAnySetTerrain(target, source, terrain) {
			const strongTerrains = ['grassyterrain'];
			if (this.field.getTerrain().id === 'grassyterrain' && !strongTerrains.includes(terrain.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.terrainState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('grassyterrain')) {
					this.field.terrainState.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		flags: {},
		name: "Grassy Surge",
		rating: 4,
		num: 6,
	},
	electromorphosis: {
		shortDesc: "This Pokémon's attacking stats are raised by 1 stage after it is damaged by an attack, 2 if the attack is Electric type.",
		onDamagingHitOrder: 1,
			onDamagingHit(damage, target, source, move) {
				if (move.type === 'Electric') {
					this.boost({atk: 2}, target);
					this.boost({spa: 2}, target);
				} else {
					this.boost({atk: 1}, target);
					this.boost({spa: 1}, target);
				}
			},
		flags: {},
		name: "Electromorphosis",
		rating: 3,
		num: 7,
	},
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

	infest: {
		shortDesc: "This Pokémon's Normal-type moves become Bug type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Bug';
				move.typeChangerBoosted = this.effect;
				this.debug('Infest affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Infest",
		rating: 0,
	},

	draconate: {
		shortDesc: "This Pokémon's Normal-type moves become Dragon type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Dragon';
				move.typeChangerBoosted = this.effect;
				this.debug('Draconate affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Draconate",
		rating: 0,
	},

	martialize: {
		shortDesc: "This Pokémon's Normal-type moves become Fighting type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fighting';
				move.typeChangerBoosted = this.effect;
				this.debug('Martialize affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Martialize",
		rating: 0,
	},

	ignite: {
		shortDesc: "This Pokémon's Normal-type moves become Fire type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fire';
				move.typeChangerBoosted = this.effect;
				this.debug('Ignite affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Ignite",
		rating: 0,
	},

	spectriate: {
		shortDesc: "This Pokémon's Normal-type moves become Ghost type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ghost';
				move.typeChangerBoosted = this.effect;
				this.debug('Spectriate affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Spectriate",
		rating: 0,
	},

	naturalize: {
		shortDesc: "This Pokémon's Normal-type moves become Grass type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Grass';
				move.typeChangerBoosted = this.effect;
				this.debug('Naturalize affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Naturalize",
		rating: 0,
	},

	placeholder1_dark: {
		shortDesc: "This Pokémon's Normal-type moves become Dark type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Dark';
				move.typeChangerBoosted = this.effect;
				this.debug('Placeholder 1 (Dark) affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Placeholder 1 (Dark)",
		rating: 0,
	},

	placeholder2: {
		shortDesc: "This Pokémon's Normal-type moves become Ground type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ground';
				move.typeChangerBoosted = this.effect;
				this.debug('Placeholder 2 affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Placeholder 2",
		rating: 0,
	},

	placeholder1_psychic: {
		shortDesc: "This Pokémon's Normal-type moves become Psychic type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Psychic';
				move.typeChangerBoosted = this.effect;
				this.debug('Placeholder 1 (Psychic) affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Placeholder 1 (Psychic)",
		rating: 0,
	},

	intoxicate: {
		shortDesc: "This Pokémon's Normal-type moves become Poison type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Poison';
				move.typeChangerBoosted = this.effect;
				this.debug('Intoxicate affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Intoxicate",
		rating: 0,
	},

	mineralize: {
		shortDesc: "This Pokémon's Normal-type moves become Rock type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Rock';
				move.typeChangerBoosted = this.effect;
				this.debug('Mineralize affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Mineralize",
		rating: 0,
	},

	metallize: {
		shortDesc: "This Pokémon's Normal-type moves become Steel type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Steel';
				move.typeChangerBoosted = this.effect;
				this.debug('Metallize affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Metallize",
		rating: 0,
	},

	liquidate: {
		shortDesc: "This Pokémon's Normal-type moves become Water type and have their power multiplied by 1.2.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && move.category !== 'Status' && !noModifyType.includes(move.id) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Water';
				move.typeChangerBoosted = this.effect;
				this.debug('Liquidate affected ' + move.name);
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Liquidate",
		rating: 0,
	},
};
