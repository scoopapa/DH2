export const Items: { [k: string]: ModdedItemData; } = {
	// slate 1
	souldew: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			return basePower;
		},
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Latias' || pokemon.baseSpecies.baseSpecies === 'Latios') {
				return this.chainModify(1.3);
			}
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Latias' || pokemon.baseSpecies.baseSpecies === 'Latios') {
				return this.chainModify(1.5);
			}
		},
		shortDesc: "If held by a Latias or Latios, 1.3x SpA and 1.5x SpD, and allows them to mega evolve.",
	},
	boosterenergy: {
		inherit: true,
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;

			if (pokemon.hasAbility('protosynthesis') && !this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('quarkdrive') && !this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('quarkdrive');
			}
		},
		onTakeItem(item, source) {
			return false;
		},
		shortDesc: "If held by a Paradox Pokémon, activates the Protosynthesis or Quark Drive abilities.",
	},
	meteorite: {
		name: "Meteorite",
		spritenum: 583,
		megaStone: "Rayquaza-Mega",
		megaEvolves: "Rayquaza",
		itemUser: ["Rayquaza"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 9,
		desc: "If held by a Rayquaza, this item allows it to Mega Evolve in battle.",
	},
	// slate 2
	kingscrown: {
		name: "King's Crown",
		spritenum: 236,
		fling: {
			basePower: 100,
		},
		onStart(pokemon) {
			pokemon.addVolatile('kingscrown');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move && move.type === 'Dark' && source.baseSpecies.baseSpecies === 'Kingambit') {
				return this.chainModify([5325, 4096]);
			}
			if (!source.baseSpecies.baseSpecies === 'Kingambit' && move.type === 'Dark' && attacker.volatiles['kingscrown']) {
				attacker.removeVolatile('kingscrown');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (source.baseSpecies.baseSpecies === 'Kingambit' && target.getMoveHitData(move).typeMod > 0) {
				this.debug('Filter neutralize');
				return this.chainModify(0.67);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Kingambit') return false;
			return true;
		},
		num: -1001,
		gen: 9,
		itemUser: ["Kingambit"],
		shortDesc: "If this is a Kingambit, boosts Dark type moves by 1.3x and takes 2/3rds damage from weaknesses. Otherwise, user's first dark type move per game gains 1.5x power.",
	},
	insectplate: {
		inherit: true,
		rating: 3,
		onBasePower(basePower, user, target, move) {},
		onDamage(damage, target, source, effect) {
			if ((effect.id === 'stealthrock' || effect.id === 'spikes' || effect.id === 'toxicspikes' || effect.id === 'stickyweb' || effect.id === 'gmaxsteelsurge') && source?.hasType('Bug')) {
				return false;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hasType('Bug')) {
				return this.chainModify(1.3);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Bug')) {
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.hasType('Bug')) {
				return this.chainModify(1.3);
			}
		},
		desc: "If holder is Bug type, negates entry hazards, and user's Atk, Def, and SpA by 1.3x.",
	},
	heroscape: {
		name: "Hero's Cape",
		spritenum: 236,
		fling: {
			basePower: 100,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (source.baseSpecies.baseSpecies === 'Palafin' && !this.effectState.heroscape) {
				this.debug('Cape neutralize');
				this.effectState.heroscape = true;
				return this.chainModify(0.5);
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.heroscape;
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Palafin')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0 && move.priority && move.priority > 1) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		onTakeItem(item, source) {
			if (user.baseSpecies.name.startsWith('Palafin')) return false;
			return true;
		},
		onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'heroscape');
		},
		condition: {
			onSwap(target) {
				if (!target.fainted) {
					target.addVolatile('reductiononeturn');
					target.side.removeSlotCondition(target, 'heroscape');
				}
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (target.volatiles['reductiononeturn']) {
					target.removeVolatile('reductiononeturn');
					return this.chainModify(0.75);
				}
			},
		},
		num: -1001,
		gen: 9,
		itemUser: ["Palafin", "Palafin-Hero"],
		shortDesc: "The next Pokémon to switch in on the user's side of the field takes 25% less damage on the turn they switch in. If held by a Palafin, Increases Priority moves do 2x damage to resisted pokemon, All moves do 1.2x damage, and takes 50% less damage when it switches in.",
	},
	yellowcard: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('yellowcard');
		},
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && source.hp && target.hp && target.hp <= target.maxhp && move && move.category !== 'Status') {
				if (target.volatiles['yellowcard']) {
					this.add('-enditem', target, this.effect, '[weaken]');
					this.boost({atk: -1, def: -1}, source, target);
				}
			}
		},
		shortDesc: "If holder survives a hit, opponent: -1 Atk and Def.",
	},
};
