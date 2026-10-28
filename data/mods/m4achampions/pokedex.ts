export const Pokedex: { [speciesid: string]: ModdedSpeciesData } = {
	// initial slate

	armarouge: {
		inherit: true,
		mega: "armarougemega",
		megaName: "Armarouge-Mega",
		megaAbility: { 0: "Pavise" },
		megaStats: { hp: 85, atk: 60, def: 145, spa: 145, spd: 95, spe: 95 },
		megaStone: "Armarouginite",
		movepoolAdditions: ["recover"],
		megaCreator: "BlueRay",
	},

	aurorus: {
		inherit: true,
		mega: "aurorusmega",
		megaName: "Aurorus-Mega",
		megaType: ["Electric", "Ice"],
		megaStats: { hp: 123, atk: 77, def: 102, spa: 131, spd: 122, spe: 66 },
		megaAbility: { 0: "Diamond Dust" },
		megaStone: "Aurorite",
		megaCreator: "Hematite",
		movepoolAdditions: ["paraboliccharge", "voltswitch"],
	},

	corviknight: {
		inherit: true,
		mega: "corviknightmega",
		megaName: "Corviknight-Mega",
		megaStats: { hp: 98, atk: 117, def: 120, spa: 78, spd: 105, spe: 77 },
		megaAbility: { 0: "Intimidate" },
		megaStone: "Corviknite",
		megaCreator: "IsoCon",
	},

	florges: {
		inherit: true,
		mega: "florgesmega",
		megaName: "Florges-Mega",
		megaAbility: { 0: "Soul-Heart" },
		megaStats: { hp: 78, atk: 95, def: 78, spa: 132, spd: 184, spe: 85 },
		megaStone: "Florgesite",
		megaCreator: "DrPumpkinz",
	},

	maushold: {
		inherit: true,
		mega: "mausholdmega",
		megaName: "Maushold-Mega",
		megaType: ["Normal", "Fairy"],
		megaAbility: { 0: "Prankster" },
		megaStats: { hp: 74, atk: 95, def: 120, spa: 65, spd: 110, spe: 101 },
		megaStone: "Mausholdinite",
		movepoolAdditions: ["moonlight"],
		megaCreator: "LordThemberchaud",
	},

	milotic: {
		inherit: true,
		mega: "miloticmega",
		megaName: "Milotic-Mega",
		megaType: ["Water", "Dragon"],
		megaAbility: { 0: "Multiscale" },
		megaStats: { hp: 95, atk: 70, def: 109, spa: 130, spd: 155, spe: 81 },
		megaStone: "Milotinite",
		megaCreator: "lydian",
	},

	pawmot: {
		inherit: true,
		mega: "pawmotmega",
		megaName: "Pawmot-Mega",
		megaAbility: { 0: "Fluffy" },
		megaStats: { hp: 70, atk: 135, def: 110, spa: 85, spd: 70, spe: 120 },
		megaStone: "Pawmite",
		movepoolAdditions: ["healbell"],
		megaCreator: "okispokis",
	},

	rhyperior: {
		inherit: true,
		mega: "rhyperiormega",
		megaName: "Rhyperior-Mega",
		megaAbility: { 0: "Sap Sipper" },
		megaStats: { hp: 115, atk: 150, def: 160, spa: 65, spd: 85, spe: 60 },
		megaStone: "Rhyperiorite",
		megaCreator: "BlueRay",
	},

	slowking: {
		inherit: true,
		mega: "slowkingmega",
		megaName: "Slowking-Mega",
		megaStats: { hp: 95, atk: 75, def: 80, spa: 110, spd: 110, spe: 120 },
		megaAbility: { 0: "Counter-Clockwise Spiral" },
		megaStone: "Slowkinite",
		megaCreator: "Hematite",
	},

	tinkaton: {
		inherit: true,
		mega: "tinkatonmega",
		megaName: "Tinkaton-Mega",
		megaAbility: { 0: "Uplifting" },
		megaStats: { hp: 85, atk: 105, def: 127, spa: 70, spd: 115, spe: 104 },
		megaStone: "Tinkatonite",
		movepoolAdditions: ["uturn"],
		megaCreator: "Paulluxx",
	},

	toxtricity: {
		inherit: true,
		mega: "toxtricitymega",
		megaName: "Toxtricity-Mega",
		megaStats: { hp: 75, atk: 128, def: 80, spa: 144, spd: 80, spe: 95 },
		megaAbility: { 0: "Acid Rock" },
		megaStone: "Toxtricitite",
		megaCreator: "DrPumpkinz",
		movepoolAdditions: ["hiddenpower"],
	},
	toxtricitylowkey: {
		inherit: true,
		mega: "toxtricitylowkeymega",
		megaName: "Toxtricity-Low-Key-Mega",
		megaStats: { hp: 75, atk: 98, def: 100, spa: 114, spd: 140, spe: 75 },
		megaAbility: { 0: "Acid Rock" },
		megaStone: "Toxtricitite",
		megaCreator: "DrPumpkinz",
		movepoolAdditions: ["hiddenpower"],
	},

	vanilluxe: {
		inherit: true,
		mega: "vanilluxemega",
		megaName: "Vanilluxe-Mega",
		megaStats: { hp: 71, atk: 95, def: 85, spa: 160, spd: 115, spe: 109 },
		megaAbility: { 0: "Cold Sweat" },
		megaStone: "Vanillite",
		megaCreator: "Hematite",
	},
};
