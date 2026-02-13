import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Super Smash OMs",
		desc: [
			"<b>Super Smash OMs</b>: A project that aims to create a micrometa containing Pokemon from different Gen 9 OMs.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/super-smash-stereotypes-fire-grass-water.3690227/">Super Smash Mods Melee on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod',
			'Move Legality', 'Revelationmons Mod Modded', '!Obtainable Abilities'],
		banlist: ['Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format) {
			// @type {{[k: string]: true}} 
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				let allowedTiers = ['Flipped', 'Tier Shift', 'Convergence', 'Mix and Mega', 'STABmons', 'Inheritance', 'Re-Evolution', 'Pokebilities', 'Sketchmons', 'Cross Evolution', 'Almost Any Ability', '350 Cup', 'Frantic Fusions', 'Bonus Type', 'Revelationmons', 'Nature Swap','Formemons'];
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not usable in Super Smash OMs.'];
				}
			}
		},
		onValidateSet(set) {
			const STABList = ["Arboliva", "Porygon2", "Terrakion"]; 
			const SketchList = ["Garchomp", "Registeel"];
			const ConvList = ["Greninja", "Ogerpon", "Zarude"];
			const STABbanlist = ["Acupressure", "Astral Barrage", "Belly Drum", "Ceaseless Edge", "Clangorous Soul", "Dire Claw", "Dragon Energy", "Electro Shot", 
				"Extreme Speed", "Fillet Away", "Final Gambit", "Flower Trick", "Gigaton Hammer", "No Retreat", "Rage Fist", "Revival Blessing", "Shell Smash", "Shift Gear", 
				"Triple Arrows", "V-Create", "Victory Dance", "Water Shuriken", "Wicked Blow", "Wicked Torque"];
			const Convbanlist = ["Boomburst", "Extreme Speed", "Population Bomb", "Rage Fist", "Shell Smash", "Spore", "Quiver Dance"];
			for (const move of set.moves) {
				let species = this.dex.species.get(set.species);
				if (STABList.includes(species.name) && STABbanlist.includes(move)) {
					return [`${set.name || set.species} has restricted move ${move}.`];
				}
				if (ConvList.includes(species.name) && Convbanlist.includes(move)) {
					return [`${set.name || set.species} has restricted move ${move}.`];
				}
			}
		},
		mod: 'supersmashoms',
	};