import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Scootopia V.4",
		desc: "The fourth iteration of the hit solomod Scootopia!",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/scootopia.3742131/post-10103602">Thread</a>`,
		],
		mod: "scootopiav4",
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Data Mod', 'Super Type Moves Rule', 'Super Type Clause'],
		banlist: ['All Pokemon', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Double Team', 'Snow Cloak', 'Sand Veil', 'Crystal Heart', 'Wild Heart'],
		unbanlist: [
			"Noxtrice", "Sturgard", "Embuck", "Cindoe", "Minillow", "Cinnastar", "Duratreme",
			"Sumolug", "Coraking", "Soleron", "Soleron-Awakened", "Zephyrmine", "Jamborai", 
			"Boreasel", "Skawamud", "Silvuna", "Noxon", "Xiphoil", "Dracoil",
			"Celespirit", "Zygola", "Quadringo", "Wingnut", "Corsegeist", "Smeltoise", 
			"Halbeetle", "Echologos", "Barbolt", "Dojodo", "Zeploom", "Kasappa", 
			"Cyllindrake", "Arbrella-North"
		],
	}
];