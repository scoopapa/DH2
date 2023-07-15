export const Items: {[k: string]: ModdedItemData} = {
	adamantorb: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 483 || pokemon.baseSpecies.num === 483) {
				return false;
			}
			return true;
		},
	},
	auspiciousarmor: {
		inherit: true,
		fling: {
			basePower: 100,
			volatileStatus: 'disable',
		},
		onTakeItem(item, pokemon, source, move) {
			if (move && move.id === 'fling') {
				return true;
			}
			return false;
		},
		onHit(target, source, move) {
			if (['corrosivegas', 'covet', 'knockoff', 'switcheroo', 'thief', 'trick'].includes(move.id)) {
				source.addVolatile('disable');
				return;
			}
			if (target !== source && !source.item) {
				// disabling this cuz magician is changed
				// if (source.hasAbility('magician') && move.category !== 'Status') {
				// 	source.addVolatile('torment');
				// 	return;
				// }
				if (source.hasAbility('pickpocket') && move.flags.contact) {
					source.addVolatile('disable');
					return;
				}
			}
		},
		desc: "Cannot be removed from a Pokemon, except by Fling. When other Pokemon attempt to remove this item, they are inflicted with Disable.",
		shortDesc: "Cannot be removed. Inflicts Pokemon with Disable if it tried to.",
	},
	boosterenergy: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;

			if (pokemon.hasAbility('protosynthesis') && !this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('quarkdrive') && !this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('quarkdrive');
			}
		},
		desc: "Activates the Protosynthesis or Quark Drive Abilities.",
		shortDesc: "Activates the Protosynthesis or Quark Drive Abilities.",
	},
	// clear amulet implemented in moves.ts
	// covert cloak implemented in moves.ts
	expertbelt: {
		inherit: true,
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([5324, 4096]);
			}
		},
		desc: "Holder's attacks that are super effective against the target do 1.3x damage.",
		shortDesc: "Holder's attacks that are super effective against the target do 1.3x damage.",
	},
	griseousorb: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 487 || pokemon.baseSpecies.num === 487) {
				return false;
			}
			return true;
		},
	},
	lustrousorb: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 484 || pokemon.baseSpecies.num === 484) {
				return false;
			}
			return true;
		},
	},
	maliciousarmor: {
		inherit: true,
		fling: {
			basePower: 100,
			volatileStatus: 'torment',
		},
		onTakeItem(item, pokemon, source, move) {
			if (move && move.id === 'fling') {
				return true;
			}
			return false;
		},
		onHit(target, source, move) {
			if (['corrosivegas', 'covet', 'knockoff', 'switcheroo', 'thief', 'trick'].includes(move.id)) {
				source.addVolatile('torment');
				return;
			}
			if (target !== source && !source.item) {
				// disabling this cuz magician is changed
				// if (source.hasAbility('magician') && move.category !== 'Status') {
				// 	source.addVolatile('torment');
				// 	return;
				// }
				if (source.hasAbility('pickpocket') && move.flags.contact) {
					source.addVolatile('torment');
					return;
				}
			}
		},
		desc: "Cannot be removed from a Pokemon, except by Fling. When other Pokemon attempt to remove this item, they are inflicted with Torment.",
		shortDesc: "Cannot be removed. Inflicts Pokemon with Torment if it tried to.",
	},
	muscleband: {
		inherit: true,
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Physical' && typeof accuracy === 'number') {
				return this.chainModify([4915, 4096]);
			}
		},
		desc: "Holder's physical attacks have 1.1x power and 1.2x accuracy.",
		shortDesc: "Holder's physical attacks have 1.1x power and 1.2x accuracy.",
	},
	ringtarget: {
		inherit: true,
		onNegateImmunity: undefined,
		onModifyMove(move, pokemon, target) {
			if (move.category !== 'Status') {
				move.ignoreImmunity = true;
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (!target.runImmunity(move.type)) {
				this.debug('Ring Target unboost');
				return this.chainModify(0.5);
			}
		},
		desc: "The holder's same-typed attacks deal resisted damage to type-based immunities.",
		shortDesc: "The holder's same-typed attacks deal resisted damage to type-based immunities.",
	},
	roomservice: {
		inherit: true,
		onStart(pokemon) {},
		onAnyPseudoWeatherChange() {},
		boosts: undefined,
		// implemented in moves.ts
		desc: "Holder's use of room moves lasts 8 turns instead of 5.",
		shortDesc: "Holder's use of room moves lasts 8 turns instead of 5.",
	},
	souldew: {
		inherit: true,
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 380 || pokemon.baseSpecies.num === 380) {
				return false;
			}
			if (source?.baseSpecies.num === 381 || pokemon.baseSpecies.num === 381) {
				return false;
			}
			return true;
		},
		desc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
		shortDesc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
	},
	utilityumbrella: {
		inherit: true,
		// implemented in scripts.ts
		onStart(target) {
			if (!target.ignoringItem()) {
				this.debug('Utility Umbrella');
				this.add('-item', target, 'Utility Umbrella');
			}
		},
		desc: "The effects of weather conditions are disabled.",
		shortDesc: "The effects of weather conditions are disabled.",
	},
	wiseglasses: {
		inherit: true,
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Special' && typeof accuracy === 'number') {
				return this.chainModify([4915, 4096]);
			}
		},
		desc: "Holder's special attacks have 1.1x power and 1.2x accuracy.",
		shortDesc: "Holder's special attacks have 1.1x power and 1.2x accuracy.",
	},
};
