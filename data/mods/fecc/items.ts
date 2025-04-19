export const Items: {[itemid: string]: ModdedItemData} = {
	boosterenergy: {
		inherit: true,
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed/*) return;
			if (*/|| this.queue.peek(true)?.choice === 'runSwitch') return;

			if (!this.field.isWeather('sunnyday')) {
				for (const proto of ['protosynthesis', 'asoneou', 'ancientpyramid']) { 
					if (pokemon.hasAbility(proto)) {
						if (!pokemon.volatiles[proto] /* && !this.field.isWeather('sunnyday') */ && pokemon.useItem()) {
							pokemon.addVolatile(proto);
						}
						return;
					}
				}
			}
			if (!this.field.isTerrain('electricterrain')) {
				for (const quark of ['quarkdrive', 'ironthorn']) { 
					if (pokemon.hasAbility(quark)) {
						if (!pokemon.volatiles[quark] && pokemon.useItem()) {
							pokemon.addVolatile(quark);
						}
						return;
					}
				}
			}
			if (pokemon.hasAbility('systempurge') && !pokemon.volatiles['systempurge'] && pokemon.useItem()) {
				pokemon.addVolatile('systempurge');
			}
		},
		desc: "Activates abilities with Protosynthesis or Quark Drive effects. Single use.",
	},
	depletedultranecroziumz: {
		name: "Depleted Ultranecrozium Z",
		spritenum: 687,
		itemUser: ["Necro Mane-Dusk-Mane"],
		onTakeItem: false,
		num: -1001,
		desc: "If held by a Necro Mane-Dusk-Mane, this item allows it to Ultra Burst in battle. This does not allow it to use a Z-Move.",
	},
	eviolite: {
		inherit: true,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			console.log(pokemon.baseSpecies);
			if (['basbal', 'naclinch', 'glimmgar', 'roseron'].includes(pokemon.baseSpecies.id)) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (['basbal', 'naclinch', 'glimmgar', 'roseron'].includes(pokemon.baseSpecies.id)) {
				return this.chainModify(1.5);
			}
		},
	},
	sablenite: {
		inherit: true,
		megaStone: "Shitmontop-Mega",
		megaEvolves: "Shitmontop",
		itemUser: ["Shitmontop"],
		isNonstandard: null,
	},
	aggronite: {
		inherit: true,
		megaStone: "Blasgron-Mega-A",
		megaEvolves: "Blasgron",
		itemUser: ["Blasgron"],
		isNonstandard: null,
	},
	blastoisinite: {
		inherit: true,
		megaStone: "Blasgron-Mega-B",
		megaEvolves: "Blasgron",
		itemUser: ["Blasgron"],
		isNonstandard: null,
	},
	absolite: {
		inherit: true,
		megaStone: "Absaludon-Mega",
		megaEvolves: "Absaludon",
		itemUser: ["Absaludon"],
		isNonstandard: null,
	},
	manectite: {
		inherit: true,
		megaStone: "Wo-Man-Mega",
		megaEvolves: "Wo-Man",
		itemUser: ["Wo-Man"],
		isNonstandard: null,
	},
};
