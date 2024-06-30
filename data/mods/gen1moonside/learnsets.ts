	// Tradeback content by Ema Skye; currently a WIP. Takes a lot to go through Egg Moves.
// Some Tradeback moves come from prototype versions of GSC (SW97 etc).

export const Learnsets: {[k: string]: ModdedLearnsetData} = {
	//All new LCs will have Encounter Levels of 5, allowing them to be used in a theoretically cart-accurate LC.
	/*Follow this template, which includes all of RBY's mandatory TMs for easier importing.
	MONSTERNAME: {
		learnset: {
			tailwhip: ["1L1"],

			toxic: ["1M"],
			rage: ["1M"],
			mimic: ["1M"],
			doubleteam: ["1M"],
			bide: ["1M"],
			rest: ["1M"],
			substitute: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	*/
	bulbasaur: { //Bulba has Vena stats and is a JUICED normal/psychic, no hyperbeam lmao
		learnset: {
			tailwhip: ["1L1"],
			confusion: ["1L1"],
			quickattack: ["1L7"], //funny from KEP ponyta copy paste
			psywave: ["1L14"],
			stomp: ["1L21"],
			agility: ["1L28"],
			firespin: ["1M"],
			takedown: ["1L42", "1M"],
			selfdestruct: ["1L57"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dreameater: ["1M"],
			fireblast: ["1M"],
			flash: ["1M"],
			meditate: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			phone: ["1M"],
			psychic: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			strength: ["1M"],
			swift: ["1M"],
			substitute: ["1M"], //Universal
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	ivysaur: {
		learnset: {
			tailwhip: ["1L1"],
			confusion: ["1L1"],
			quickattack: ["1L7"], //funny from KEP ponyta copy paste
			psywave: ["1L14"],
			stomp: ["1L21"],
			agility: ["1L28"],
			firespin: ["1M"],
			takedown: ["1L42", "1M"],
			selfdestruct: ["1L57"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dreameater: ["1M"],
			fireblast: ["1M"],
			flash: ["1M"],
			meditate: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			psychic: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			strength: ["1M"],
			swift: ["1M"],
			substitute: ["1M"], //Universal
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	venusaur: {
		learnset: {
			tailwhip: ["1L1"],
			confusion: ["1L1"],
			quickattack: ["1L7"], //funny from KEP ponyta copy paste
			psywave: ["1L14"],
			stomp: ["1L21"],
			agility: ["1L28"],
			firespin: ["1M"],
			takedown: ["1L42", "1M"],
			selfdestruct: ["1L57"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dreameater: ["1M"],
			fireblast: ["1M"],
			flash: ["1M"],
			hyperbeam: ["1M"],
			meditate: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			psychic: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			strength: ["1M"],
			swift: ["1M"],
			substitute: ["1M"], //Universal
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	charmander: {
		learnset: {
			growl: ["1L1"],
			lick: ["1L1"],
			ember: ["1L7"],
			leer: ["1L14"],
			confuseray: ["1L21"],
			nightshade: ["1L28"],
			firespin: ["1L35"],
			flamethrower: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blank: ["1M"],
			bodyslam: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			dragonrage: ["1M"],
			dreameater: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			strength: ["1M"],
			substitute: ["1M"], //Universal
			swordsdance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	charmeleon: {
		learnset: {
			growl: ["1L1"],
			lick: ["1L1"],
			ember: ["1L7"],
			leer: ["1L14"],
			confuseray: ["1L21"],
			nightshade: ["1L28"],
			firespin: ["1L35"],
			flamethrower: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blank: ["1M"],
			bodyslam: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			dragonrage: ["1M"],
			dreameater: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			strength: ["1M"],
			substitute: ["1M"], //Universal
			swordsdance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	charizard: { //Weird Ghost type with fire type elements. Ghost types should have weird tools. BONUS
		learnset: {
			growl: ["1L1"],
			lick: ["1L1"],
			ember: ["1L7"],
			leer: ["1L14"],
			confuseray: ["1L21"],
			nightshade: ["1L28"],
			firespin: ["1L35"],
			flamethrower: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blank: ["1M"],
			bodyslam: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			dragonrage: ["1M"],
			dreameater: ["1M"],
			hyperbeam: ["1M"],
			illomen: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			scalelaunch: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			swordsdance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	squirtle: {
		learnset: {
			tackle: ["1L1"],
			stringshot: ["1L1"],
			bubble: ["1L7"],
			watergun: ["1L14", "1M"], //Universal
			bite: ["1L21"],
			withdraw: ["1L28"],
			skullbash: ["1L35"],
			hydropump: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			burrow: ["1M"],
			bodyslam: ["1M"],
			counter: ["1M"],
			crosscutter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			jumpkick: ["1M"],
			lightscreen: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			submission: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			toxic: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	caterpie: {
		learnset: {
			tackle: ["1L1"],
			stringshot: ["1L1"],
			bubble: ["1L7"],
			watergun: ["1L14", "1M"], //Universal
			bite: ["1L21"],
			withdraw: ["1L28"],
			skullbash: ["1L35"],
			hydropump: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			burrow: ["1M"],
			bodyslam: ["1M"],
			counter: ["1M"],
			crosscutter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			jumpkick: ["1M"],
			lightscreen: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			submission: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			toxic: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	blastoise: { //Blastoise can throw hands, more fighting/bug type influences.
		learnset: {
			tackle: ["1L1"],
			stringshot: ["1L1"],
			bubble: ["1L7"],
			watergun: ["1L14", "1M"], //Universal
			bite: ["1L21"],
			withdraw: ["1L28"],
			skullbash: ["1L35"],
			hydropump: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			burrow: ["1M"],
			bodyslam: ["1M"],
			counter: ["1M"],
			crosscutter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			jumpkick: ["1M"],
			lightscreen: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			submission: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			toxic: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	wartortle: {  //wip, needs custom moves "wart" and "ortle"
		learnset: {
			submission: ["1L1"],
			dragonrage: ["1L1"],
			splash: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	metapod: {  //super def meme
		learnset: {
			tackle: ["1L1"],
			stringshot: ["1L1"],
			harden: ["1L7"],
			rockthrow: ["1L14"],
			bide: ["1M"], //Universal
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	butterfree: {  //shitmon with fun tools, needs BONUS
		learnset: {
			tackle: ["1L1"],
			stringshot: ["1L1"],
			harden: ["1L1"],
			rockthrow: ["1L1"],
			poisonpowder: ["1L12"],
			stunspore: ["1L15"],
			sleeppowder: ["1L16"],
			gust: ["1L17"],
			takedown: ["1L22"],
			agility: ["1M"],
			bide: ["1M"], //Universal
			crosscutter: ["1M"],
			cut: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			pinmissile: ["1M"],
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			scuttle: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			sumostance: ["1M"],
			swordsdance: ["1M"],
			teleport: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	weedle: {
		learnset: {
			lick: ["1L1"],
			leer: ["1L1"],
			bide: ["1M"], //Universal
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	kakuna: {  //annoying special wall meme
		learnset: {
			lick: ["1L1"],
			leer: ["1L1"],
			amnesia: ["1L1"],
			psywave: ["1L12"],
			bide: ["1M"], //Universal
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	beedrill: {
		learnset: {
			lick: ["1L1"],
			leer: ["1L1"],
			amnesia: ["1L1"],
			psywave: ["1L12"],
			disable: ["1L13"],
			confusion: ["1L18"],
			confuseray: ["1L21"],
			psychic: ["1L28"],
			firespin: ["1L35"],
			recover: ["1L42"],
			adrenaline: ["1M"],
			agility: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			brainwaves: ["1M"],
			counter: ["1M"],
			chillwave: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			fireblast: ["1M"],
			flamethrower: ["1M"],
			hyperbeam: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			murmurations: ["1M"],
			poisongas: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			smog: ["1M"],
			substitute: ["1M"], //Universal
			teleport: ["1M"],
			triattack: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			zap: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	pidgey: {
		learnset: {
			gust: ["1L1"],
			quickattack: ["1L1"],
			sandattack: ["1L7"],
			whirlwind: ["1L14"],
			wingattack: ["1L21"],
			agility: ["1L28"],
			mirrormove: ["1L35"],
			softboiled: ["1L42", "1M"],
			bide: ["1M"], //Universal
			doubleteam: ["1M"], //Universal
			feathershot: ["1M"],
			firepunch: ["1M"],
			fly: ["1M"],
			mimic: ["1M"], //Universal
			murmurations: ["1M"],
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			thunderpunch: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	pidgeotto: {
		learnset: {
			gust: ["1L1"],
			quickattack: ["1L1"],
			sandattack: ["1L7"],
			whirlwind: ["1L14"],
			wingattack: ["1L21"],
			agility: ["1L28"],
			mirrormove: ["1L35"],
			softboiled: ["1L42", "1M"],
			bide: ["1M"], //Universal
			doubleteam: ["1M"], //Universal
			feathershot: ["1M"],
			firepunch: ["1M"],
			fly: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			murmurations: ["1M"],
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			thunderpunch: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	pidgeot: {
		learnset: {
			gust: ["1L1"],
			quickattack: ["1L1"],
			sandattack: ["1L7"],
			whirlwind: ["1L14"],
			wingattack: ["1L21"],
			agility: ["1L28"],
			mirrormove: ["1L35"],
			softboiled: ["1L42", "1M"],
			bide: ["1M"], //Universal
			doubleteam: ["1M"], //Universal
			feathershot: ["1M"],
			firepunch: ["1M"],
			fly: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			murmurations: ["1M"],
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			thunderpunch: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	rattata: {
		learnset: {
			quickattack: ["1L1"],
			tackle: ["1L1"],
			tailwhip: ["1L7"],
			hyperfang: ["1L14"],
			focusenergy: ["1L21"],
			superfang: ["1L28"],
			leechseed: ["1L35"],
			rockslide: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			bodyslam: ["1M"],
			counter: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			icebeam: ["1M"],
			kinesis: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			sharpen: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	raticate: {
		learnset: {
			quickattack: ["1L1"],
			tackle: ["1L1"],
			tailwhip: ["1L7"],
			hyperfang: ["1L14"],
			focusenergy: ["1L21"],
			superfang: ["1L28"],
			leechseed: ["1L35"],
			rockslide: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			bodyslam: ["1M"],
			counter: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			kinesis: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			sharpen: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	spearow: {
		learnset: {
			growl: ["1L1"],
			leer: ["1L1"],
			lowkick: ["1L7"],
			peck: ["1L14"],
			confuseray: ["1L21"],
			agility: ["1L28"],
			jumpkick: ["1L35"],
			highjumpkick: ["1L42"],
			drillpeck: ["1L45"],
			acid: ["1M"],
			acidarmor: ["1M"],
			bide: ["1M"], //Universal
			constrict: ["1M"],
			disable: ["1M"],
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			hydropump: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			rest: ["1M"], //Universal
			starstorm: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			withdraw: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	fearow: {
		learnset: {
			growl: ["1L1"],
			leer: ["1L1"],
			lowkick: ["1L7"],
			peck: ["1L14"],
			confuseray: ["1L21"],
			agility: ["1L28"],
			jumpkick: ["1L35"],
			highjumpkick: ["1L42"],
			drillpeck: ["1L45"],
			acid: ["1M"],
			acidarmor: ["1M"],
			bide: ["1M"], //Universal
			constrict: ["1M"],
			disable: ["1M"],
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			hydropump: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			rest: ["1M"], //Universal
			starstorm: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			withdraw: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	ekans: {
		learnset: {
			leer: ["1L1"],
			poisonsting: ["1L1"],
			wrap: ["1L7"],
			bite: ["1L14"],
			glare: ["1L21"],
			screech: ["1L28"],
			acid: ["1L35"],
			skullbash: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			fissure: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			rupture: ["1M"],
			scalelaunch: ["1M"],
			scuttle: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	arbok: { //It's okay if it's bad. <3
		learnset: {
			leer: ["1L1"],
			poisonsting: ["1L1"],
			wrap: ["1L7"],
			bite: ["1L14"],
			glare: ["1L21"],
			screech: ["1L28"],
			acid: ["1L35"],
			skullbash: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			fissure: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			rupture: ["1M"],
			scalelaunch: ["1M"],
			scuttle: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	pikachu: { //Lax + Pika... Lacks Amnesia and Blizzard tho, both notable.
		learnset: {
			agility: ["1L1"],
			headbutt: ["1L1"],
			thundershock: ["1L7"],
			thunderbolt: ["1L14"],
			slam: ["1L21"],
			lightscreen: ["1L28"],
			bodyslam: ["1L35"],
			hyperbeam: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			excavate: ["1M"],
			fissure: ["1M"],
			flash: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			selfdestruct: ["1M"],
			solarbeam: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	raichu: { //Raichu but with a juiced movepool. No stat changes!
		learnset: {
			agility: ["1L1"],
			headbutt: ["1L1"],
			thundershock: ["1L7"],
			thunderbolt: ["1L14"],
			slam: ["1L21"],
			lightscreen: ["1L28"],
			bodyslam: ["1L35"],
			hyperbeam: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			excavate: ["1M"],
			fissure: ["1M"],
			flash: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			selfdestruct: ["1M"],
			solarbeam: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	sandshrew: {
		learnset: {
			scratch: ["1L1"],
			poisonsting: ["1L7"],
			acidarmor: ["1L1"],
			agility: ["1L8"],
			amnesia: ["1L9"],
			barrier: ["1L10"],
			defensecurl: ["1L11"],
			harden: ["1L12"],
			growth: ["1L13"],
			withdraw: ["1L14"],
			meditate: ["1L15"],
			minimize: ["1L16"],
			sharpen: ["1L17"],
			swordsdance: ["1L18"],
			sandattack: ["1L19"],
			slash: ["1L14"],
			swift: ["1L21"],
			furyswipes: ["1L28"],
			firespin: ["1L35"],
			flamethrower: ["1L42", "1M"],
			absorb: ["1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			crosscutter: ["1M"],
			cut: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fissure: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			starstorm: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	sandslash: {
		learnset: {
			scratch: ["1L1"],
			poisonsting: ["1L7"],
			acidarmor: ["1L1"],
			agility: ["1L8"],
			amnesia: ["1L9"],
			barrier: ["1L10"],
			defensecurl: ["1L11"],
			harden: ["1L12"],
			growth: ["1L13"],
			withdraw: ["1L14"],
			meditate: ["1L15"],
			minimize: ["1L16"],
			sharpen: ["1L17"],
			swordsdance: ["1L18"],
			sandattack: ["1L19"],
			slash: ["1L14"],
			swift: ["1L21"],
			furyswipes: ["1L28"],
			firespin: ["1L35"],
			flamethrower: ["1L42", "1M"],
			absorb: ["1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			crosscutter: ["1M"],
			cut: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fissure: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			starstorm: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	nidoranf: {
		learnset: {
			growl: ["1L1"],
			tackle: ["1L1"],
			scratch: ["1L7"],
			doublekick: ["1L14"],
			poisonsting: ["1L21"],
			zap: ["1L28"],
			psywave: ["1L35"],
			blizzard: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			counter: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			fireblast: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			sauna: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	nidorina: {
		learnset: {
			growl: ["1L1"],
			tackle: ["1L1"],
			scratch: ["1L7"],
			doublekick: ["1L14"],
			poisonsting: ["1L21"],
			zap: ["1L28"],
			psywave: ["1L35"],
			blizzard: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			counter: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			fireblast: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			sauna: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	nidoqueen: {
		learnset: {
			growl: ["1L1"],
			tackle: ["1L1"],
			scratch: ["1L7"],
			doublekick: ["1L14"],
			poisonsting: ["1L21"],
			zap: ["1L28"],
			psywave: ["1L35"],
			blizzard: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			counter: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			fireblast: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			sauna: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	nidoranm: {
		learnset: {
			growl: ["1L1"],
			tackle: ["1L1"],
			hornattack: ["1L7"],
			doublekick: ["1L14"],
			poisonsting: ["1L21"],
			thrash: ["1L28"],
			focusenergy: ["1L35"],
			horndrill: ["1L47"],
			adrenaline: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			counter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			rindoukanthrow: ["1M"],
			sauna: ["1M"],
			scalelaunch: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	nidorino: {
		learnset: {
			growl: ["1L1"],
			tackle: ["1L1"],
			hornattack: ["1L7"],
			doublekick: ["1L14"],
			poisonsting: ["1L21"],
			thrash: ["1L28"],
			focusenergy: ["1L35"],
			horndrill: ["1L47"],
			adrenaline: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			counter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			rindoukanthrow: ["1M"],
			sauna: ["1M"],
			scalelaunch: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	nidoking: {
		learnset: {
			growl: ["1L1"],
			tackle: ["1L1"],
			hornattack: ["1L7"],
			doublekick: ["1L14"],
			poisonsting: ["1L21"],
			thrash: ["1L28"],
			focusenergy: ["1L35"],
			horndrill: ["1L47"],
			adrenaline: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			counter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			rindoukanthrow: ["1M"],
			sauna: ["1M"],
			scalelaunch: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	clefairy: {
		learnset: {
			doubleslap: ["1L1"],
			metronome: ["1L1"],
			minimize: ["1L7"],
			sing: ["1L14"],
			defensecurl: ["1L21"],
			growl: ["1L28"],
			lightscreen: ["1L35"],
			pound: ["1L42", "1M"],
			adrenaline: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			brainwaves: ["1M"],
			bubblebeam: ["1M"],
			chillwave: ["1M"],
			counter: ["1M"],
			conversion: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			fireblast: ["1M"],
			flash: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			rindoukanthrow: ["1M"],
			sauna: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			solarbeam: ["1M"],
			starstorm: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			thorns: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	clefable: {
		learnset: {
			doubleslap: ["1L1"],
			metronome: ["1L1"],
			minimize: ["1L7"],
			sing: ["1L14"],
			defensecurl: ["1L21"],
			growl: ["1L28"],
			lightscreen: ["1L35"],
			pound: ["1L42", "1M"],
			adrenaline: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			brainwaves: ["1M"],
			bubblebeam: ["1M"],
			chillwave: ["1M"],
			counter: ["1M"],
			conversion: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			fireblast: ["1M"],
			flash: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			rindoukanthrow: ["1M"],
			sauna: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			solarbeam: ["1M"],
			starstorm: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			thorns: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	vulpix: {
		learnset: {
			bubble: ["1L1"],
			tailwhip: ["1L1"],
			vinewhip: ["1L7"],
			roar: ["1L14"],
			growth: ["1L19"],
			confuseray: ["1L21"],
			quickattack: ["1L28"],
			thorns: ["1L35"],
			petaldance: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			bubblebeam: ["1M"],
			burrow: ["1M"],
			deforest: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			solarbeam: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			swordsdance: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	ninetales: {
		learnset: {
			bubble: ["1L1"],
			tailwhip: ["1L1"],
			vinewhip: ["1L7"],
			roar: ["1L14"],
			growth: ["1L19"],
			confuseray: ["1L21"],
			quickattack: ["1L28"],
			thorns: ["1L35"],
			petaldance: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			bubblebeam: ["1M"],
			burrow: ["1M"],
			deforest: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			solarbeam: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			swordsdance: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	jigglypuff: {
		learnset: {
			sing: ["1L1"],
			pound: ["1L1"],
			ember: ["1L7"],
			disable: ["1L14"],
			bodyslam: ["1L21"],
			adrenaline: ["1L28"],
			excavate: ["1L35"],
			doubleedge: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			counter: ["1M"],
			combustion: ["1M"],
			doubleteam: ["1M"], //Universal
			firreblast: ["1M"],
			flash: ["1M"],
			icebeam: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			seismictoss: ["1M"],
			solarbeam: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			toxic: ["1M"], //Universal
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			tumble: ["1M"],
			triattack: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	wigglytuff: {
		learnset: {
			sing: ["1L1"],
			pound: ["1L1"],
			ember: ["1L7"],
			disable: ["1L14"],
			bodyslam: ["1L21"],
			adrenaline: ["1L28"],
			excavate: ["1L35"],
			doubleedge: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			counter: ["1M"],
			combustion: ["1M"],
			doubleteam: ["1M"], //Universal
			firreblast: ["1M"],
			flash: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			seismictoss: ["1M"],
			solarbeam: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			toxic: ["1M"], //Universal
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			tumble: ["1M"],
			triattack: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	zubat: {
		learnset: {
			leechlife: ["1L1"],
			supersonic: ["1L1"],
			rockthrow: ["1L7"],
			haze: ["1L14"],
			confuseray: ["1L21"],
			wingattack: ["1L28"],
			adrenaline: ["1L35"],
			rupture: ["1L42", "1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			gigadrain: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			whirlwind: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	golbat: {
		learnset: {
			leechlife: ["1L1"],
			supersonic: ["1L1"],
			rockthrow: ["1L7"],
			haze: ["1L14"],
			confuseray: ["1L21"],
			wingattack: ["1L28"],
			adrenaline: ["1L35"],
			rupture: ["1L42", "1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			gigadrain: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			whirlwind: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	oddish: {
		learnset: {
			absorb: ["1L1"],
			sandattack: ["1L1"],
			stunspore: ["1L7"],
			burrow: ["1L14"],
			acid: ["1L21"],
			petaldance: ["1L28"],
			solarbeam: ["1L35"],
			constrict: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fissure: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockthrow: ["1M"],
			substitute: ["1M"], //Universal
			swordsdance: ["1M"],
			takedown: ["1M"],
			thorns: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	gloom: {
		learnset: {
			absorb: ["1L1"],
			sandattack: ["1L1"],
			stunspore: ["1L7"],
			burrow: ["1L14"],
			acid: ["1L21"],
			petaldance: ["1L28"],
			solarbeam: ["1L35"],
			constrict: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fissure: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockthrow: ["1M"],
			substitute: ["1M"], //Universal
			swordsdance: ["1M"],
			takedown: ["1M"],
			thorns: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	vileplume: {
		learnset: {
			absorb: ["1L1"],
			sandattack: ["1L1"],
			stunspore: ["1L7"],
			burrow: ["1L14"],
			acid: ["1L21"],
			petaldance: ["1L28"],
			solarbeam: ["1L35"],
			constrict: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fissure: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockthrow: ["1M"],
			substitute: ["1M"], //Universal
			swordsdance: ["1M"],
			takedown: ["1M"],
			thorns: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	paras: {
		learnset: {
			leechlife: ["1L1"],
			lick: ["1L1"],
			stunspore: ["1L7"],
			icebreaker: ["1L14"],
			spore: ["1L21"],
			slash: ["1L28"],
			growth: ["1L35"],
			excavate: ["1L42", "1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			cut: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scuttle: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			swordsdance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			thorns: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	parasect: {
		learnset: {
			leechlife: ["1L1"],
			lick: ["1L1"],
			stunspore: ["1L7"],
			icebreaker: ["1L14"],
			spore: ["1L21"],
			slash: ["1L28"],
			growth: ["1L35"],
			excavate: ["1L42", "1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			cut: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scuttle: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			swordsdance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			thorns: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	venonat: {
		learnset: {
			disable: ["1L1"],
			tackle: ["1L1"],
			ember: ["1L7"],
			confusion: ["1L14"],
			poisonpowder: ["1L21"],
			leechlife: ["1L28"],
			firespin: ["1L35"],
			psybeam: ["1L42", "1M"],
			psychic: ["1L53"],
			bide: ["1M"], //Universal
			deforest: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			firepunch: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			scuttle: ["1M"],
			solarbeam: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			thorns: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	venomoth: {
		learnset: {
			disable: ["1L1"],
			tackle: ["1L1"],
			ember: ["1L7"],
			confusion: ["1L14"],
			poisonpowder: ["1L21"],
			leechlife: ["1L28"],
			firespin: ["1L35"],
			psybeam: ["1L42", "1M"],
			psychic: ["1L53"],
			bide: ["1M"], //Universal
			deforest: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			firepunch: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			scuttle: ["1M"],
			solarbeam: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			thorns: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	diglett: {
		learnset: {
			growl: ["1L1"],
			tackle: ["1L1"],
			stringshot: ["1L7"],
			bite: ["1L14"],
			bubble: ["1L21"],
			mirrormove: ["1L28"],
			counter: ["1L35"],
			haze: ["1L42", "1M"],
			agility: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			burrow: ["1M"],
			divebomb: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fly: ["1M"],
			icepunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			rest: ["1M"], //Universal
			scuttle: ["1M"],
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			tumble: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			whirlwind: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	dugtrio: {
		learnset: {
			growl: ["1L1"],
			tackle: ["1L1"],
			stringshot: ["1L7"],
			bite: ["1L14"],
			bubble: ["1L21"],
			mirrormove: ["1L28"],
			counter: ["1L35"],
			haze: ["1L42", "1M"],
			agility: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			burrow: ["1M"],
			conversion: ["1M"],
			divebomb: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fly: ["1M"],
			hyperbeam: ["1M"],
			icepunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			rest: ["1M"], //Universal
			scuttle: ["1M"],
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			tumble: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			whirlwind: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	meowth: {
		learnset: {
			bite: ["1L1"],
			growl: ["1L1"],
			scratch: ["1L7"],
			screech: ["1L14"],
			payday: ["1L21"],
			dragonbreath: ["1L28"],
			slash: ["1L35"],
			firepunch: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			excavate: ["1M"],
			flash: ["1M"],
			fireblast: ["1M"],
			icebreaker: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			scalelaunch: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			thorns: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	persian: {
		learnset: {
			bite: ["1L1"],
			growl: ["1L1"],
			scratch: ["1L7"],
			screech: ["1L14"],
			payday: ["1L21"],
			dragonbreath: ["1L28"],
			slash: ["1L35"],
			firepunch: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			excavate: ["1M"],
			flash: ["1M"],
			fireblast: ["1M"],
			hyperbeam: ["1M"],
			icebreaker: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			scalelaunch: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			thorns: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	psyduck: {
		learnset: {
			disable: ["1L1"],
			scratch: ["1L1"],
			tailwhip: ["1L7"],
			confusion: ["1L14"],
			furyswipes: ["1L21"],
			hydropump: ["1L28"],
			razorwind: ["1L35"],
			thunder: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			brainwaves: ["1M"],
			bubblebeam: ["1M"],
			cheepshot: ["1M"],
			chillwave: ["1M"],
			counter: ["1M"],
			crosscutter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			icepunch: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			payday: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scuttle: ["1M"],
			starstorm: ["1M"],
			skullbash: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			thorns: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
			withdraw: ["1M"],
			zap: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	golduck: {
		learnset: {
			disable: ["1L1"],
			scratch: ["1L1"],
			tailwhip: ["1L7"],
			confusion: ["1L14"],
			furyswipes: ["1L21"],
			hydropump: ["1L28"],
			razorwind: ["1L35"],
			thunder: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			brainwaves: ["1M"],
			bubblebeam: ["1M"],
			cheepshot: ["1M"],
			chillwave: ["1M"],
			counter: ["1M"],
			crosscutter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			icepunch: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			payday: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scuttle: ["1M"],
			starstorm: ["1M"],
			skullbash: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			thrash: ["1M"],
			thorns: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
			withdraw: ["1M"],
			zap: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	mankey: {
		learnset: {
			karatechop: ["1L1"],
			leer: ["1L1"],
			lowkick: ["1L7"],
			scratch: ["1L14"],
			furyswipes: ["1L21"],
			focusenergy: ["1L28"],
			crosscutter: ["1L35"],
			seismictoss: ["1L42", "1M"],
			screech: ["1L45"],
			thrash: ["1L52"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rockslide: ["1M"],
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			risingspire: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			sumostance: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	primeape: {
		learnset: {
			karatechop: ["1L1"],
			leer: ["1L1"],
			lowkick: ["1L7"],
			scratch: ["1L14"],
			furyswipes: ["1L21"],
			focusenergy: ["1L28"],
			crosscutter: ["1L35"],
			seismictoss: ["1L42", "1M"],
			screech: ["1L45"],
			thrash: ["1L52"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			hyperbeam: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rockslide: ["1M"],
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			risingspire: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			sumostance: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	growlithe: {
		learnset: {
			bite: ["1L1"],
			roar: ["1L1"],
			ember: ["1L7"],
			leer: ["1L14"],
			takedown: ["1L21"],
			agility: ["1L28"],
			flamethrower: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			combustion: ["1M"],
			conversion: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fireblast: ["1M"],
			icebeam: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			sauna: ["1M"],
			substitute: ["1M"], //Universal
			starstorm: ["1M"],
			teleport: ["1M"],
			thunderpunch: ["1M"],
			thunderwave: ["1M"],
			triattack: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	arcanine: {
		learnset: {
			bite: ["1L1"],
			roar: ["1L1"],
			ember: ["1L7"],
			leer: ["1L14"],
			takedown: ["1L21"],
			agility: ["1L28"],
			flamethrower: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			combustion: ["1M"],
			conversion: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fireblast: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			sauna: ["1M"],
			substitute: ["1M"], //Universal
			starstorm: ["1M"],
			teleport: ["1M"],
			thunderpunch: ["1M"],
			thunderwave: ["1M"],
			triattack: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	poliwag: {
		learnset: {
			bubble: ["1L1"],
			hypnosis: ["1L1"],
			watergun: ["1L7"],
			doubleslap: ["1L14"],
			bodyslam: ["1L21"],
			amnesia: ["1L28"],
			hydropump: ["1L35"],
			sumostance: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			counter: ["1M"],
			cheepshot: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			fissure: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			mimic: ["1M"], //Universal
			megapunch: ["1M"],
			megakick: ["1M"],
			metronome: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			// watergun: ["1M"], //Universal
		},
	},
	poliwhirl: {
		learnset: {
			bubble: ["1L1"],
			hypnosis: ["1L1"],
			watergun: ["1L7"],
			doubleslap: ["1L14"],
			bodyslam: ["1L21"],
			amnesia: ["1L28"],
			hydropump: ["1L35"],
			sumostance: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			counter: ["1M"],
			cheepshot: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			fissure: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			mimic: ["1M"], //Universal
			megapunch: ["1M"],
			megakick: ["1M"],
			metronome: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			// watergun: ["1M"], //Universal
		},
	},
	poliwrath: {
		learnset: {
			bubble: ["1L1"],
			hypnosis: ["1L1"],
			watergun: ["1L7"],
			doubleslap: ["1L14"],
			bodyslam: ["1L21"],
			amnesia: ["1L28"],
			hydropump: ["1L35"],
			sumostance: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			counter: ["1M"],
			cheepshot: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			fissure: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			mimic: ["1M"], //Universal
			megapunch: ["1M"],
			megakick: ["1M"],
			metronome: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			// watergun: ["1M"], //Universal
		},
	},
	abra: {
		learnset: {
			teleport: ["1L1"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			takedown: ["1M"],
			thunderwave: ["1M"],
			triattack: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	kadabra: {
		learnset: {
			teleport: ["1L1"],
			confusion: ["1L1"],
			disable: ["1L7"],
			psybeam: ["1L14"],
			psychic: ["1L21"],
			recover: ["1L28"],
			burrow: ["1L35"],
			chillwave: ["1L42", "1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			bodyslam: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			excavate: ["1M"],
			flash: ["1M"],
			kinesis: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			takedown: ["1M"],
			thunderwave: ["1M"],
			triattack: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			zap: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	alakazam: {
		learnset: {
			teleport: ["1L1"],
			confusion: ["1L1"],
			disable: ["1L7"],
			psybeam: ["1L14"],
			psychic: ["1L21"],
			recover: ["1L28"],
			burrow: ["1L35"],
			chillwave: ["1L42", "1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			bodyslam: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			excavate: ["1M"],
			flash: ["1M"],
			hyperbeam: ["1M"],
			kinesis: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			takedown: ["1M"],
			thunderwave: ["1M"],
			triattack: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			zap: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	machop: {
		learnset: {
			growl: ["1L1"],
			lick: ["1L1"],
			lowkick: ["1L7"],
			leer: ["1L14"],
			focusenergy: ["1L21"],
			nightshade: ["1L28"],
			seismictoss: ["1L35"],
			flamethrower: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bite: ["1M"],
			burrow: ["1M"],
			counter: ["1M"],
			cut: ["1M"],
			doublekick: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			harden: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			scuttle: ["1M"],
			substitute: ["1M"], //Universal
			strength: ["1M"],
			stringshot: ["1M"],
			splash: ["1M"],
			swordsdance: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	machoke: {
		learnset: {
			growl: ["1L1"],
			lick: ["1L1"],
			lowkick: ["1L7"],
			leer: ["1L14"],
			focusenergy: ["1L21"],
			nightshade: ["1L28"],
			seismictoss: ["1L35"],
			flamethrower: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bite: ["1M"],
			burrow: ["1M"],
			counter: ["1M"],
			cut: ["1M"],
			doublekick: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			harden: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			scuttle: ["1M"],
			substitute: ["1M"], //Universal
			strength: ["1M"],
			stringshot: ["1M"],
			splash: ["1M"],
			swordsdance: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	machamp: {
		learnset: {
			growl: ["1L1"],
			lick: ["1L1"],
			lowkick: ["1L7"],
			leer: ["1L14"],
			focusenergy: ["1L21"],
			nightshade: ["1L28"],
			seismictoss: ["1L35"],
			flamethrower: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bite: ["1M"],
			burrow: ["1M"],
			counter: ["1M"],
			cut: ["1M"],
			doublekick: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			harden: ["1M"],
			hyperbeam: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			scuttle: ["1M"],
			substitute: ["1M"], //Universal
			strength: ["1M"],
			stringshot: ["1M"],
			splash: ["1M"],
			swordsdance: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	bellsprout: {
		learnset: {
			growth: ["1L1"],
			rockthrow: ["1L1"],
			ember: ["1L7"],
			firepunch: ["1L14"],
			confuseray: ["1L21"],
			smog: ["1L28"],
			selfdestruct: ["1L35"],
			burrow: ["1L42", "1M"],
			bide: ["1M"], //Universal
			combustion: ["1M"],
			counter: ["1M"],
			doubleteam: ["1M"], //Universal
			dig: ["1M"],
			excavate: ["1M"],
			fissure: ["1M"],
			fireblast: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			seismictoss: ["1M"],
			skullblast: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	weepinbell: {
		learnset: {
			growth: ["1L1"],
			rockthrow: ["1L1"],
			ember: ["1L7"],
			firepunch: ["1L14"],
			confuseray: ["1L21"],
			smog: ["1L28"],
			selfdestruct: ["1L35"],
			burrow: ["1L42", "1M"],
			bide: ["1M"], //Universal
			combustion: ["1M"],
			counter: ["1M"],
			doubleteam: ["1M"], //Universal
			dig: ["1M"],
			excavate: ["1M"],
			fissure: ["1M"],
			fireblast: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			seismictoss: ["1M"],
			skullblast: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	victreebel: {
		learnset: {
			growth: ["1L1"],
			rockthrow: ["1L1"],
			ember: ["1L7"],
			firepunch: ["1L14"],
			confuseray: ["1L21"],
			smog: ["1L28"],
			selfdestruct: ["1L35"],
			burrow: ["1L42", "1M"],
			bide: ["1M"], //Universal
			combustion: ["1M"],
			counter: ["1M"],
			doubleteam: ["1M"], //Universal
			dig: ["1M"],
			excavate: ["1M"],
			fissure: ["1M"],
			fireblast: ["1M"],
			hyperbeam: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			seismictoss: ["1M"],
			sing: ["1M"],
			skullblast: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	tentacool: {
		learnset: {
			acid: ["1L1"],
			supersonic: ["1L1"],
			constrict: ["1L7"],
			barrier: ["1L14"],
			screech: ["1L21"],
			dizzypunch: ["1L28"],
			megapunch: ["1L35"],
			flamethrower: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			cut: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			fireblast: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			rupture: ["1M"],
			sauna: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	tentacruel: {
		learnset: {
			acid: ["1L1"],
			supersonic: ["1L1"],
			constrict: ["1L7"],
			barrier: ["1L14"],
			screech: ["1L21"],
			dizzypunch: ["1L28"],
			megapunch: ["1L35"],
			flamethrower: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			cut: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			fireblast: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			rupture: ["1M"],
			sauna: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	geodude: {
		learnset: {
			tackle: ["1L1"],
			defensecurl: ["1L1"],
			rockthrow: ["1L7"],
			selfdestruct: ["1L14"],
			sonicboom: ["1L21"],
			lightscreen: ["1L28"],
			swift: ["1L35"],
			explosion: ["1L42", "1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			starstorm: ["1M"],
			strength: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			zap: ["1M"],
		},
	},
	graveler: {
		learnset: {
			tackle: ["1L1"],
			defensecurl: ["1L1"],
			rockthrow: ["1L7"],
			selfdestruct: ["1L14"],
			sonicboom: ["1L21"],
			lightscreen: ["1L28"],
			swift: ["1L35"],
			explosion: ["1L42", "1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			starstorm: ["1M"],
			strength: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			zap: ["1M"],
		},
	},
	golem: {
		learnset: {
			tackle: ["1L1"],
			defensecurl: ["1L1"],
			rockthrow: ["1L7"],
			selfdestruct: ["1L14"],
			sonicboom: ["1L21"],
			lightscreen: ["1L28"],
			swift: ["1L35"],
			explosion: ["1L42", "1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			hyperbeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			starstorm: ["1M"],
			strength: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			zap: ["1M"],
		},
	},
	ponyta: {
		learnset: {
			disable: ["1L1"],
			lick: ["1L1"],
			poisongas: ["1L7"],
			minimize: ["1L14"],
			stomp: ["1L21"],
			sludge: ["1L28"],
			screech: ["1L35"],
			agility: ["1L42", "1M"],
			adrenaline: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			doubleteam: ["1M"], //Universal
			horndrill: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rupture: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	rapidash: {
		learnset: {
			disable: ["1L1"],
			lick: ["1L1"],
			poisongas: ["1L7"],
			minimize: ["1L14"],
			stomp: ["1L21"],
			sludge: ["1L28"],
			screech: ["1L35"],
			agility: ["1L42", "1M"],
			adrenaline: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			doubleteam: ["1M"], //Universal
			horndrill: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rupture: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	slowpoke: {
		learnset: {
			confusion: ["1L1"],
			disable: ["1L1"],
			headbutt: ["1L7"],
			growl: ["1L14"],
			psychic: ["1L21"],
			withdraw: ["1L28"],
			amnesia: ["1L35"],
			flash: ["1L42", "1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			blizzard: ["1M"],
			brainwaves: ["1M"],
			burrow: ["1M"],
			counter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			excavate: ["1M"],
			fireblast: ["1M"],
			fissure: ["1M"],
			icebeam: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			seismictoss: ["1M"],
			skullbash: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			teleport: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	slowbro: {
		learnset: {
			confusion: ["1L1"],
			disable: ["1L1"],
			headbutt: ["1L7"],
			growl: ["1L14"],
			psychic: ["1L21"],
			withdraw: ["1L28"],
			amnesia: ["1L35"],
			flash: ["1L42", "1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			blizzard: ["1M"],
			brainwaves: ["1M"],
			burrow: ["1M"],
			counter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			excavate: ["1M"],
			fireblast: ["1M"],
			fissure: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			seismictoss: ["1M"],
			skullbash: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			teleport: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	magnemite: {
		learnset: {
			tackle: ["1L1"],
			sonicboom: ["1L1"],
			thundershock: ["1L7"],
			supersonic: ["1L14"],
			thunderwave: ["1L21"],
			swift: ["1L28"],
			screech: ["1L35"],
			adrenaline: ["1L42", "1M"],
			bide: ["1M"], //Universal
			chillwave: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			fly: ["1M"],
			leechseed: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sing: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	magneton: {
		learnset: {
			tackle: ["1L1"],
			sonicboom: ["1L1"],
			thundershock: ["1L7"],
			supersonic: ["1L14"],
			thunderwave: ["1L21"],
			swift: ["1L28"],
			screech: ["1L35"],
			adrenaline: ["1L42", "1M"],
			bide: ["1M"], //Universal
			chillwave: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			fly: ["1M"],
			hyperbeam: ["1M"],
			leechseed: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sing: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	farfetchd: {
		learnset: {
			spikecannon: ["1L1"],
			stringshot: ["1L1"],
			pinmissile: ["1L7"],
			leer: ["1L14"],
			eggbomb: ["1L21"],
			explosion: ["1L28"],
			flamethrower: ["1L35"],
			fireblast: ["1L42", "1M"],
			cheepshot: ["1M"],
			corrosivespray: ["1M"],
			doubleteam: ["1M"], //Universal
			feathershot: ["1M"],
			flowermortar: ["1M"],
			flurry: ["1M"],
			fullassault: ["1M"],
			mindbullet: ["1M"],
			rest: ["1M"], //Universal
			rockitlaunch: ["1M"],
			sandsnipe: ["1M"],
			scalelaunch: ["1M"],
			shadowsnipe: ["1M"],
			substitute: ["1M"], //Universal
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			zap: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	doduo: {
		learnset: {
			furyattack: ["1L1"],
			growl: ["1L1"],
			peck: ["1L7"],
			drillpeck: ["1L14"],
			triattack: ["1L21"],
			agility: ["1L28"],
			whirlwind: ["1L35"],
			skullbash: ["1L42", "1M"],
			adrenaline: ["1M"],
			brainwaves: ["1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dreameater: ["1M"],
			feathershot: ["1M"],
			fly: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	dodrio: {
		learnset: {
			furyattack: ["1L1"],
			growl: ["1L1"],
			peck: ["1L7"],
			drillpeck: ["1L14"],
			triattack: ["1L21"],
			agility: ["1L28"],
			whirlwind: ["1L35"],
			skullbash: ["1L42", "1M"],
			adrenaline: ["1M"],
			brainwaves: ["1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dreameater: ["1M"],
			feathershot: ["1M"],
			fly: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	seel: {
		learnset: {
			aurorabeam: ["1L1"],
			growl: ["1L1"],
			headbutt: ["1L7"],
			takedown: ["1L14"],
			icebeam: ["1L21"],
			bite: ["1L28"],
			payday: ["1L35"],
			strength: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			cut: ["1M"],
			cheepshot: ["1M"],
			doubleteam: ["1M"], //Universal
			icebreaker: ["1M"],
			leechseed: ["1M"],
			moult: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			sauna: ["1M"],
			sludge: ["1M"],
			smog: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			stunspore: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			vinewhip: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	dewgong: {
		learnset: {
			aurorabeam: ["1L1"],
			growl: ["1L1"],
			headbutt: ["1L7"],
			takedown: ["1L14"],
			icebeam: ["1L21"],
			bite: ["1L28"],
			payday: ["1L35"],
			strength: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			cut: ["1M"],
			cheepshot: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			icebreaker: ["1M"],
			leechseed: ["1M"],
			moult: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			sauna: ["1M"],
			sludge: ["1M"],
			smog: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			stunspore: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			vinewhip: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	grimer: {
		learnset: {
			disable: ["1L1"],
			pound: ["1L1"],
			poisongas: ["1L7"],
			minimize: ["1L14"],
			sludge: ["1L21"],
			harden: ["1L28"],
			screech: ["1L35"],
			acidarmor: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			crosscutter: ["1M"],
			deforest: ["1M"],
			doubleteam: ["1M"], //Universal
			eggbomb: ["1M"],
			explosion: ["1M"],
			fireblast: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rupture: ["1M"],
			seismictoss: ["1M"],
			selfdestruct: ["1M"],
			substitute: ["1M"], //Universal
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	muk: {
		learnset: {
			disable: ["1L1"],
			pound: ["1L1"],
			poisongas: ["1L7"],
			minimize: ["1L14"],
			sludge: ["1L21"],
			harden: ["1L28"],
			screech: ["1L35"],
			acidarmor: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			crosscutter: ["1M"],
			deforest: ["1M"],
			doubleteam: ["1M"], //Universal
			eggbomb: ["1M"],
			explosion: ["1M"],
			fireblast: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rupture: ["1M"],
			seismictoss: ["1M"],
			selfdestruct: ["1M"],
			substitute: ["1M"], //Universal
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	shellder: {
		learnset: {
			aurorabeam: ["1L1"],
			clamp: ["1L1"],
			supersonic: ["1L7"],
			withdraw: ["1L14"],
			spikecannon: ["1L21"],
			chillwave: ["1L28"],
			leer: ["1L35"],
			confusion: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			burrow: ["1M"],
			combustion: ["1M"],
			disable: ["1M"],
			doubleteam: ["1M"], //Universal
			dreameater: ["1M"],
			excavate: ["1M"],
			explosion: ["1M"],
			fireblast: ["1M"],
			fissure: ["1M"],
			flash: ["1M"],
			mimic: ["1M"], //Universal
			psychic: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			selfdestruct: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	cloyster: {
		learnset: {
			aurorabeam: ["1L1"],
			clamp: ["1L1"],
			supersonic: ["1L7"],
			withdraw: ["1L14"],
			spikecannon: ["1L21"],
			chillwave: ["1L28"],
			leer: ["1L35"],
			confusion: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			burrow: ["1M"],
			combustion: ["1M"],
			disable: ["1M"],
			doubleteam: ["1M"], //Universal
			dreameater: ["1M"],
			excavate: ["1M"],
			explosion: ["1M"],
			fireblast: ["1M"],
			fissure: ["1M"],
			flash: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			psychic: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			selfdestruct: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	gastly: {
		learnset: {
			growl: ["1L1"],
			lick: ["1L1"],
			hypnosis: ["1L7"],
			dreameater: ["1L14"],
			lowkick: ["1L21"],
			focusenergy: ["1L28"],
			seismictoss: ["1L35"],
			submission: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			counter: ["1M"],
			conversion: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			rockslide: ["1M"],
			scuttle: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	haunter: {
		learnset: {
			growl: ["1L1"],
			lick: ["1L1"],
			hypnosis: ["1L7"],
			dreameater: ["1L14"],
			lowkick: ["1L21"],
			focusenergy: ["1L28"],
			seismictoss: ["1L35"],
			submission: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			counter: ["1M"],
			conversion: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			rockslide: ["1M"],
			scuttle: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	gengar: {
		learnset: {
			growl: ["1L1"],
			lick: ["1L1"],
			hypnosis: ["1L7"],
			dreameater: ["1L14"],
			lowkick: ["1L21"],
			focusenergy: ["1L28"],
			seismictoss: ["1L35"],
			submission: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			conversion: ["1M"],
			counter: ["1M"],
			dig: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			hyperbeam: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			rockslide: ["1M"],
			scuttle: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	onix: {
		learnset: {
			confuseray: ["1L1"],
			megadrain: ["1L1"],
			bind: ["1L7"],
			leer: ["1L14"],
			tackle: ["1L21"],
			nightshade: ["1L28"],
			harden: ["1L35"],
			icebeam: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blank: ["1M"],
			blizzard: ["1M"],
			cut: ["1M"],
			cheepshot: ["1M"],
			chillwave: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			fissure: ["1M"],
			flash: ["1M"],
			hyperbeam: ["1M"],
			illomen: ["1M"],
			moult: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rupture: ["1M"],
			rockslide: ["1M"],
			selfdestruct: ["1M"],
			sauna: ["1M"],
			scuttle: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			starstorm: ["1M"],
			strength: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	drowzee: {
		learnset: {
			confusion: ["1L1"],
			disable: ["1L1"],
			rockthrow: ["1L7"],
			hypnosis: ["1L14"],
			poisongas: ["1L21"],
			headbutt: ["1L28"],
			meditate: ["1L35"],
			submission: ["1L42", "1M"],
			acid: ["1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			chillwave: ["1M"],
			doubleteam: ["1M"], //Universal
			fly: ["1M"],
			harden: ["1M"],
			mimic: ["1M"], //Universal
			mirrormove: ["1M"],
			pinmissile: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			sauna: ["1M"],
			substitute: ["1M"], //Universal
			skullbash: ["1M"],
			stringshot: ["1M"],
			smog: ["1M"],
			tackle: ["1M"],
			takedown: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	hypno: {
		learnset: {
			confusion: ["1L1"],
			disable: ["1L1"],
			rockthrow: ["1L7"],
			hypnosis: ["1L14"],
			poisongas: ["1L21"],
			headbutt: ["1L28"],
			meditate: ["1L35"],
			submission: ["1L42", "1M"],
			acid: ["1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			chillwave: ["1M"],
			doubleteam: ["1M"], //Universal
			fly: ["1M"],
			harden: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			mirrormove: ["1M"],
			pinmissile: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rockslide: ["1M"],
			sauna: ["1M"],
			substitute: ["1M"], //Universal
			skullbash: ["1M"],
			stringshot: ["1M"],
			smog: ["1M"],
			tackle: ["1M"],
			takedown: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	krabby: {
		learnset: {
			bubble: ["1L1"],
			leer: ["1L1"],
			visegrip: ["1L7"],
			guillotine: ["1L14"],
			stomp: ["1L21"],
			thunderbolt: ["1L28"],
			crabhammer: ["1L35"],
			zap: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			blizzard: ["1M"],
			cut: ["1M"],
			combustion: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			icebreaker: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scuttle: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			sumostance: ["1M"],
			strength: ["1M"],
			swordsdance: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thundershock: ["1M"],
			thunder: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	kingler: {
		learnset: {
			bubble: ["1L1"],
			leer: ["1L1"],
			visegrip: ["1L7"],
			guillotine: ["1L14"],
			stomp: ["1L21"],
			thunderbolt: ["1L28"],
			crabhammer: ["1L35"],
			zap: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			blizzard: ["1M"],
			cut: ["1M"],
			combustion: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			icebreaker: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scuttle: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			sumostance: ["1M"],
			strength: ["1M"],
			swordsdance: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thundershock: ["1M"],
			thunder: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	voltorb: {
		learnset: {
			screech: ["1L1"],
			sonicboom: ["1L1"],
			tackle: ["1L7"],
			selfdestruct: ["1L14"],
			lightscreen: ["1L21"],
			swift: ["1L28"],
			explosion: ["1L35"],
			rockthrow: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			brainwaves: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			firepunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			tumble: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	electrode: {
		learnset: {
			screech: ["1L1"],
			sonicboom: ["1L1"],
			tackle: ["1L7"],
			selfdestruct: ["1L14"],
			lightscreen: ["1L21"],
			swift: ["1L28"],
			explosion: ["1L35"],
			rockthrow: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			brainwaves: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			firepunch: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			tumble: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	exeggcute: {
		learnset: {
			barrage: ["1L1"],
			leechseed: ["1L1"],
			thunderpunch: ["1L7"],
			firepunch: ["1L14"],
			icepunch: ["1L21"],
			reflect: ["1L28"],
			poisonpowder: ["1L35"],
			stomp: ["1L42", "1M"],
			bide: ["1M"], //Universal
			brainwaves: ["1M"],
			deforest: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			eggbomb: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			poisongas: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rupture: ["1M"],
			scuttle: ["1M"],
			selfdestruct: ["1M"],
			sludge: ["1M"],
			solarbeam: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	exeggutor: {
		learnset: {
			barrage: ["1L1"],
			leechseed: ["1L1"],
			thunderpunch: ["1L7"],
			firepunch: ["1L14"],
			icepunch: ["1L21"],
			reflect: ["1L28"],
			poisonpowder: ["1L35"],
			stomp: ["1L42", "1M"],
			bide: ["1M"], //Universal
			brainwaves: ["1M"],
			deforest: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			eggbomb: ["1M"],
			hyperbeam: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			poisongas: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rupture: ["1M"],
			scuttle: ["1M"],
			selfdestruct: ["1M"],
			sludge: ["1M"],
			solarbeam: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	cubone: {
		learnset: {
			boneclub: ["1L1"],
			tailwhip: ["1L1"],
			headbutt: ["1L7"],
			leer: ["1L14"],
			focusenergy: ["1L21"],
			thrash: ["1L28"],
			bonemerang: ["1L35"],
			adrenaline: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			burrow: ["1M"],
			bodyslam: ["1M"],
			counter: ["1M"],
			deflect: ["1M"],
			doubleteam: ["1M"], //Universal
			dig: ["1M"],
			earthquake: ["1M"],
			excavate: ["1M"],
			fireblast: ["1M"],
			fissure: ["1M"],
			icebeam: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			sumostance: ["1M"],
			swordsdance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	marowak: {
		learnset: {
			boneclub: ["1L1"],
			tailwhip: ["1L1"],
			headbutt: ["1L7"],
			leer: ["1L14"],
			focusenergy: ["1L21"],
			thrash: ["1L28"],
			bonemerang: ["1L35"],
			adrenaline: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			burrow: ["1M"],
			bodyslam: ["1M"],
			counter: ["1M"],
			deflect: ["1M"],
			doubleteam: ["1M"], //Universal
			dig: ["1M"],
			earthquake: ["1M"],
			excavate: ["1M"],
			fireblast: ["1M"],
			fissure: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			sumostance: ["1M"],
			swordsdance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	hitmonlee: {
		learnset: {
			tackle: ["1L1"],
			defensecurl: ["1L1"],
			rockthrow: ["1L7"],
			jumpkick: ["1L14"],
			doublekick: ["1L21"],
			highjumpkick: ["1L28"],
			meditate: ["1L35"],
			rollingkick: ["1L42", "1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			focusenergy: ["1M"],
			harden: ["1M"],
			hyperbeam: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			skullbash: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	hitmonchan: {
		learnset: {
			agility: ["1L1"],
			cometpunch: ["1L1"],
			firepunch: ["1L7"],
			icepunch: ["1L14"],
			thunderpunch: ["1L21"],
			wrap: ["1L28"],
			megapunch: ["1L35"],
			stunspore: ["1L42", "1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			chillwave: ["1M"],
			crosscutter: ["1M"],
			disable: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			hyperbeam: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			poisonsting: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			screech: ["1M"],
			seismictoss: ["1M"],
			smog: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			surf: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	lickitung: {
		learnset: {
			supersonic: ["1L1"],
			lick: ["1L1"],
			disable: ["1L7"],
			slam: ["1L14"],
			screech: ["1L21"],
			cut: ["1L28"],
			firespin: ["1L35"],
			stomp: ["1L42", "1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			chillwave: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			fireblast: ["1M"],
			hyperbeam: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rupture: ["1M"],
			sauna: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			skullbash: ["1M"],
			swordsdance: ["1M"],
			takedown: ["1M"],
			thorns: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	koffing: {
		learnset: {
			ember: ["1L1"],
			smog: ["1L1"],
			tackle: ["1L7"],
			smokescreen: ["1L14"],
			selfdestruct: ["1L21"],
			haze: ["1L28"],
			explosion: ["1L35"],
			flamethrower: ["1L42", "1M"],
			adrenaline: ["1M"],
			aurorabeam: ["1M"],
			brainwaves: ["1M"],
			chillwave: ["1M"],
			combustion: ["1M"],
			bide: ["1M"], //Universal
			divebomb: ["1M"],
			doubleteam: ["1M"], //Universal
			fireblast: ["1M"],
			firespin: ["1M"],
			flash: ["1M"],
			glare: ["1M"],
			headbutt: ["1M"],
			jumpkick: ["1M"],
			karatechop: ["1M"],
			leechseed: ["1M"],
			lightscreen: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	weezing: {
		learnset: {
			ember: ["1L1"],
			smog: ["1L1"],
			tackle: ["1L7"],
			smokescreen: ["1L14"],
			selfdestruct: ["1L21"],
			haze: ["1L28"],
			explosion: ["1L35"],
			flamethrower: ["1L42", "1M"],
			adrenaline: ["1M"],
			aurorabeam: ["1M"],
			brainwaves: ["1M"],
			chillwave: ["1M"],
			combustion: ["1M"],
			bide: ["1M"], //Universal
			divebomb: ["1M"],
			doubleteam: ["1M"], //Universal
			fireblast: ["1M"],
			firespin: ["1M"],
			flash: ["1M"],
			glare: ["1M"],
			headbutt: ["1M"],
			hyperbeam: ["1M"],
			jumpkick: ["1M"],
			karatechop: ["1M"],
			leechseed: ["1M"],
			lightscreen: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	rhyhorn: {
		learnset: {
			hornattack: ["1L1"],
			stomp: ["1L1"],
			tailwhip: ["1L7"],
			furyattack: ["1L14"],
			thorns: ["1L21"],
			horndrill: ["1L28"],
			leer: ["1L35"],
			solarbeam: ["1L42", "1M"],
			adrenaline: ["1M"],
			bubblebeam: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			payday: ["1M"],
			petaldance: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			rockslide: ["1M"],
			sauna: ["1M"],
			submission: ["1M"],
			starstorm: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			sumostance: ["1M"],
			stunspore: ["1M"],
			toxic: ["1M"], //Universal
			thunder: ["1M"],
			thunderbolt: ["1M"],
			vinewhip: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	rhydon: {
		learnset: {
			hornattack: ["1L1"],
			stomp: ["1L1"],
			tailwhip: ["1L7"],
			furyattack: ["1L14"],
			thorns: ["1L21"],
			horndrill: ["1L28"],
			leer: ["1L35"],
			solarbeam: ["1L42", "1M"],
			adrenaline: ["1M"],
			bubblebeam: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			hyperbeam: ["1M"],
			payday: ["1M"],
			petaldance: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			rockslide: ["1M"],
			sauna: ["1M"],
			submission: ["1M"],
			starstorm: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			sumostance: ["1M"],
			stunspore: ["1M"],
			toxic: ["1M"], //Universal
			thunder: ["1M"],
			thunderbolt: ["1M"],
			vinewhip: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	chansey: {
		learnset: {
			pound: ["1L1"],
			tailwhip: ["1L1"],
			doubleslap: ["1L7"],
			sing: ["1L14"],
			minimize: ["1L21"],
			seismictoss: ["1L28"],
			mist: ["1L35"],
			aurorabeam: ["1L42", "1M"],
			bubblebeam: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			deflect: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			eggbomb: ["1M"],
			flash: ["1M"],
			hyperbeam: ["1M"],
			lightscreen: ["1M"],
			psychic: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			softboiled: ["1M"],
			solarbeam: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			surf: ["1M"],
			strength: ["1M"],
			skullbash: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			tumble: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	tangela: {
		learnset: {
			absorb: ["1L1"],
			lick: ["1L1"],
			constrict: ["1L7"],
			leer: ["1L14"],
			quickattack: ["1L21"],
			stunspore: ["1L28"],
			focusenergy: ["1L35"],
			growth: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			bubblebeam: ["1M"],
			burrow: ["1M"],
			counter: ["1M"],
			chillwave: ["1M"],
			deforest: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dreameater: ["1M"],
			hyperbeam: ["1M"],
			metronome: ["1M"],
			megadrain: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			nightshade: ["1M"],
			payday: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			selfdestruct: ["1M"],
			slam: ["1M"],
			skullbash: ["1M"],
			solarbeam: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			swordsdance: ["1M"],
			takedown: ["1M"],
			thorns: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	kangaskhan: {
		learnset: {
			cometpunch: ["1L1"],
			tailwhip: ["1L1"],
			bite: ["1L7"],
			megapunch: ["1L14"],
			thunderpunch: ["1L21"],
			dizzypunch: ["1L28"],
			selfdestruct: ["1L35"],
			flamethrower: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			bubblebeam: ["1M"],
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			fissure: ["1M"],
			fireblast: ["1M"],
			flash: ["1M"],
			hyperbeam: ["1M"],
			icebreaker: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			rockslide: ["1M"],
			seismictoss: ["1M"],
			substitute: ["1M"], //Universal
			submission: ["1M"],
			surf: ["1M"],
			skullbash: ["1M"],
			strength: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	horsea: {
		learnset: {
			bubble: ["1L1"],
			smokescreen: ["1L1"],
			leer: ["1L7"],
			agility: ["1L14"],
			burrow: ["1L21"],
			flamethower: ["1L28"],
			firespin: ["1L35"],
			hydropump: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blank: ["1M"],
			bubblebeam: ["1M"],
			dig: ["1M"],
			dragonrage: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			feathershot: ["1M"],
			fireblast: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scalelaunch: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			skullbash: ["1M"],
			swift: ["1M"],
			swordsdance: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	seadra: {
		learnset: {
			bubble: ["1L1"],
			smokescreen: ["1L1"],
			leer: ["1L7"],
			agility: ["1L14"],
			burrow: ["1L21"],
			flamethower: ["1L28"],
			firespin: ["1L35"],
			hydropump: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blank: ["1M"],
			bubblebeam: ["1M"],
			dig: ["1M"],
			dragonrage: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			feathershot: ["1M"],
			fireblast: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scalelaunch: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			skullbash: ["1M"],
			swift: ["1M"],
			swordsdance: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	goldeen: {
		learnset: {
			peck: ["1L1"],
			supersonic: ["1L1"],
			payday: ["1L7"],
			pinmissile: ["1L14"],
			adrenaline: ["1L21"],
			waterfall: ["1L28"],
			cheepshot: ["1L35"],
			agility: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			blizzard: ["1M"],
			chillwave: ["1M"],
			doubleteam: ["1M"], //Universal
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			poisonpowder: ["1M"],
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			rest: ["1M"], //Universal
			scalelaunch: ["1M"],
			skullbash: ["1M"],
			sleeppowder: ["1M"],
			stunspore: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thrash: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			whirlwind: ["1M"],
		},
	},
	seaking: {
		learnset: {
			peck: ["1L1"],
			supersonic: ["1L1"],
			payday: ["1L7"],
			pinmissile: ["1L14"],
			adrenaline: ["1L21"],
			waterfall: ["1L28"],
			cheepshot: ["1L35"],
			agility: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			blizzard: ["1M"],
			chillwave: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megadrain: ["1M"],
			mimic: ["1M"], //Universal
			poisonpowder: ["1M"],
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			rest: ["1M"], //Universal
			scalelaunch: ["1M"],
			skullbash: ["1M"],
			sleeppowder: ["1M"],
			stunspore: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			takedown: ["1M"],
			thrash: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			whirlwind: ["1M"],
		},
	},
	staryu: {
		learnset: {
			thundershock: ["1L1"],
			harden: ["1L1"],
			tackle: ["1L7"],
			minimize: ["1L14"],
			ember: ["1L21"],
			recover: ["1L28"],
			lightscreen: ["1L35"],
			swift: ["1L42", "1M"],
			boneclub: ["1M"],
			bubblebeam: ["1M"],
			bide: ["1M"], //Universal
			chillwave: ["1M"],
			doubleteam: ["1M"], //Universal
			eggbomb: ["1M"],
			firepunch: ["1M"],
			icepunch: ["1M"],
			mimic: ["1M"], //Universal
			mirrormove: ["1M"],
			petaldance: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockthrow: ["1M"],
			rollingkick: ["1M"],
			sandattack: ["1M"],
			solarbeam: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			skullbash: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thorns: ["1M"],
			thunderpunch: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			twineedle: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	starmie: {
		learnset: {
			thundershock: ["1L1"],
			harden: ["1L1"],
			tackle: ["1L7"],
			minimize: ["1L14"],
			ember: ["1L21"],
			recover: ["1L28"],
			lightscreen: ["1L35"],
			swift: ["1L42", "1M"],
			boneclub: ["1M"],
			bubblebeam: ["1M"],
			bide: ["1M"], //Universal
			chillwave: ["1M"],
			doubleteam: ["1M"], //Universal
			eggbomb: ["1M"],
			firepunch: ["1M"],
			hyperbeam: ["1M"],
			icepunch: ["1M"],
			mimic: ["1M"], //Universal
			mirrormove: ["1M"],
			petaldance: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rockthrow: ["1M"],
			rollingkick: ["1M"],
			sandattack: ["1M"],
			solarbeam: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			skullbash: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thorns: ["1M"],
			thunderpunch: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			twineedle: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	mrmime: {
		learnset: {
			barrier: ["1L1"],
			lick: ["1L1"],
			ember: ["1L7"],
			lightscreen: ["1L14"],
			doubleslap: ["1L21"],
			meditate: ["1L28"],
			flamethrower: ["1L35"],
			fireblast: ["1L42", "1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			deflect: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			hyperbeam: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			seismictoss: ["1M"],
			skullbash: ["1M"],
			solarbeam: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	scyther: {
		learnset: {
			leer: ["1L1"],
			lick: ["1L1"],
			quickattack: ["1L7"],
			focusenergy: ["1L14"],
			slash: ["1L21"],
			swordsdance: ["1L28"],
			agility: ["1L35"],
			wingattack: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			crosscutter: ["1M"],
			deflect: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			furyswipes: ["1M"],
			scuttle: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	jynx: {
		learnset: {
			growl: ["1L1"],
			lovelykiss: ["1L1"],
			teleport: ["1L7"],
			leer: ["1L14"],
			confuseray: ["1L21"],
			reflect: ["1L28"],
			whirlwind: ["1L35"],
			splash: ["1L42", "1M"],
			acidarmor: ["1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			burrow: ["1M"],
			doubleteam: ["1M"], //Universal
			flash: ["1M"],
			horndrill: ["1M"],
			hypnosis: ["1M"],
			meditate: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			poisonpowder: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			scuttle: ["1M"],
			sharpen: ["1M"],
			substitute: ["1M"], //Universal
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	electabuzz: {
		learnset: {
			leer: ["1L1"],
			quickattack: ["1L1"],
			thundershock: ["1L7"],
			screech: ["1L14"],
			thunderpunch: ["1L21"],
			lightscreen: ["1L28"],
			thunder: ["1L35"],
			sludge: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			counter: ["1M"],
			doubleteam: ["1M"], //Universal
			fireblast: ["1M"],
			megapunch: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			seismictoss: ["1M"],
			smokescreen: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			venowhirl: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	magmar: {
		learnset: {
			leer: ["1L1"],
			pound: ["1L1"],
			megapunch: ["1L7"],
			confuseray: ["1L14"],
			smog: ["1L21"],
			submission: ["1L28"],
			takedown: ["1L35"],
			risingspire: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			combustion: ["1M"],
			counter: ["1M"],
			deforest: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rupture: ["1M"],
			sludge: ["1M"],
			substitute: ["1M"], //Universal
			skullbash: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	pinsir: {
		learnset: {
			visegrip: ["1L1"],
			seismictoss: ["1L1"],
			guillotine: ["1L7"],
			focusenergy: ["1L14"],
			harden: ["1L21"],
			slash: ["1L28"],
			swordsdance: ["1L35"],
			adrenaline: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			cut: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			scuttle: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	tauros: {
		learnset: {
			tackle: ["1L1"],
			stomp: ["1L1"],
			tailwhip: ["1L7"],
			leer: ["1L14"],
			takedown: ["1L21"],
			thunderbolt: ["1L28"],
			blizzard: ["1L35"],
			bodyslam: ["1L42", "1M"],
			bide: ["1M"], //Universal
			conversion: ["1M"],
			chillwave: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			fireblast: ["1M"],
			fissure: ["1M"],
			horndrill: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			mimic: ["1M"], //Universal
			psybeam: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			teleport: ["1M"],
			thunder: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	magikarp: {
		learnset: {
			tackle: ["1L1"],
			leer: ["1L1"],
			dragonrage: ["1L7"],
			splash: ["1L14"],
			bite: ["1L21"],
			hyperbeam: ["1L28"],
			strength: ["1L35"],
			fireblast: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fissure: ["1M"],
			hydropump: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			rockthrow: ["1M"],
			rupture: ["1M"],
			sandattack: ["1M"],
			scalelaunch: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	gyarados: {
		learnset: {
			tackle: ["1L1"],
			leer: ["1L1"],
			dragonrage: ["1L7"],
			splash: ["1L14"],
			bite: ["1L21"],
			hyperbeam: ["1L28"],
			strength: ["1L35"],
			fireblast: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			fissure: ["1M"],
			hydropump: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			rockthrow: ["1M"],
			rupture: ["1M"],
			sandattack: ["1M"],
			scalelaunch: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	lapras: {
		learnset: {
			growl: ["1L1"],
			absorb: ["1L1"],
			sing: ["1L7"],
			mist: ["1L14"],
			confuseray: ["1L21"],
			bodyslam: ["1L28"],
			thorns: ["1L35"],
			solarbeam: ["1L42", "1M"],
			bide: ["1M"], //Universal
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dragonrage: ["1M"],
			horndrill: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			takedown: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	ditto: {
		learnset: {
			doubleslap: ["1L1"],
			metronome: ["1L1"],
			transform: ["1L7"],
			sing: ["1L14"],
			defensecurl: ["1L21"],
			growl: ["1L28"],
			lightscreen: ["1L35"],
			pound: ["1L42", "1M"],
			adrenaline: ["1M"],
			bodyslam: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			brainwaves: ["1M"],
			bubblebeam: ["1M"],
			chillwave: ["1M"],
			counter: ["1M"],
			conversion: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			fireblast: ["1M"],
			flash: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megapunch: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			reflect: ["1M"],
			rindoukanthrow: ["1M"],
			sauna: ["1M"],
			seismictoss: ["1M"],
			skullbash: ["1M"],
			solarbeam: ["1M"],
			starstorm: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			takedown: ["1M"],
			teleport: ["1M"],
			thorns: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			triattack: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	eevee: {
		learnset: {
			tackle: ["1L1"],
			tailwhip: ["1L1"],
			sandattack: ["1L7"],
			lick: ["1L14"],
			confuseray: ["1L21"],
			nightshade: ["1L28"],
			bite: ["1L35"],
			takedown: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			focusenergy: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	vaporeon: {
		learnset: {
			tackle: ["1L1"],
			tailwhip: ["1L1"],
			sandattack: ["1L7"],
			lick: ["1L14"],
			confuseray: ["1L21"],
			nightshade: ["1L28"],
			bite: ["1L35"],
			takedown: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			burrow: ["1M"],
			constrict: ["1M"],
			dig: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			excavate: ["1M"],
			focusenergy: ["1M"],
			hyperbeam: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rollingkick: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	jolteon: {
		learnset: {
			tackle: ["1L1"],
			tailwhip: ["1L1"],
			sandattack: ["1L7"],
			lick: ["1L14"],
			confuseray: ["1L21"],
			nightshade: ["1L28"],
			bite: ["1L35"],
			takedown: ["1L42", "1M"],
			adrenaline: ["1M"],
			agility: ["1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			brainwaves: ["1M"],
			chillwave: ["1M"],
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			focusenergy: ["1M"],
			glare: ["1M"],
			haze: ["1M"],
			hyperbeam: ["1M"],
			leechlife: ["1M"],
			mimic: ["1M"], //Universal
			mist: ["1M"],
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rupture: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
		},
	},
	flareon: {
		learnset: {
			tackle: ["1L1"],
			tailwhip: ["1L1"],
			sandattack: ["1L7"],
			lick: ["1L14"],
			confuseray: ["1L21"],
			nightshade: ["1L28"],
			bite: ["1L35"],
			takedown: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blank: ["1M"],
			bodyslam: ["1M"],
			deflect: ["1M"],
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			ember: ["1M"],
			fireblast: ["1M"],
			firespin: ["1M"],
			flamethrower: ["1M"],
			fly: ["1M"],
			focusenergy: ["1M"],
			hyperbeam: ["1M"],
			leer: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			sauna: ["1M"],
			smog: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swift: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	porygon: {
		learnset: {
			conversion: ["1L1"],
			tackle: ["1L1"],
			sharpen: ["1L7"],
			psybeam: ["1L14"],
			recover: ["1L21"],
			agility: ["1L28"],
			triattack: ["1L35"],
			feathershot: ["1L42", "1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			energyspike: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			mimic: ["1M"], //Universal
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			zap: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	omanyte: {
		learnset: {
			hornattack: ["1L1"],
			withdrawl: ["1L1"],
			seismictoss: ["1L7"],
			leer: ["1L14"],
			icepunch: ["1L21"],
			submission: ["1L28"],
			rollingkick: ["1L35"],
			megapunch: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			cometpunch: ["1M"],
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			horndrill: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			skullbash: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	omastar: {
		learnset: {
			hornattack: ["1L1"],
			withdrawl: ["1L1"],
			seismictoss: ["1L7"],
			leer: ["1L14"],
			icepunch: ["1L21"],
			submission: ["1L28"],
			rollingkick: ["1L35"],
			megapunch: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			cometpunch: ["1M"],
			counter: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			horndrill: ["1M"],
			hyperbeam: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			skullbash: ["1M"],
			strength: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	kabuto: {
		learnset: {
			absorb: ["1L1"],
			harden: ["1L1"],
			scratch: ["1L7"],
			slash: ["1L14"],
			leer: ["1L21"],
			hydropump: ["1L28"],
			crosscutter: ["1L35"],
			razorwind: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			cut: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rupture: ["1M"],
			skullbash: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swordsdance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	kabutops: {
		learnset: {
			absorb: ["1L1"],
			harden: ["1L1"],
			scratch: ["1L7"],
			slash: ["1L14"],
			leer: ["1L21"],
			hydropump: ["1L28"],
			crosscutter: ["1L35"],
			razorwind: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blizzard: ["1M"],
			bubblebeam: ["1M"],
			cut: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			megakick: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rupture: ["1M"],
			skullbash: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			swordsdance: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			venomwhirl: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
		},
	},
	aerodactyl: {
		learnset: {
			agility: ["1L1"],
			wingattack: ["1L1"],
			supersonic: ["1L7"],
			bite: ["1L14"],
			takedown: ["1L21"],
			rockthrow: ["1L28"],
			fly: ["1L35"],
			fireblast: ["1L42", "1M"],
			bide: ["1M"], //Universal
			brainwaves: ["1M"],
			chillwave: ["1M"],
			combustion: ["1M"],
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dragonrage: ["1M"],
			hyperbeam: ["1M"],
			icebreaker: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skullbash: ["1M"],
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
			whirlwind: ["1M"],
		},
	},
	snorlax: {
		learnset: {
			disable: ["1L1"],
			pound: ["1L1"],
			sing: ["1L7"],
			doubleedge: ["1L14"],
			seismictoss: ["1L21"],
			nightshade: ["1L28"],
			bodyslam: ["1L35"],
			thunder: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blank: ["1M"],
			counter: ["1M"],
			chillwave: ["1M"],
			deflect: ["1M"],
			deforest: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			lightscreen: ["1M"],
			megakick: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			moult: ["1M"],
			psychic: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			risingspire: ["1M"],
			sauna: ["1M"],
			scuttle: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			sumostance: ["1M"],
			teleport: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			zap: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	articuno: {
		learnset: {
			icebeam: ["1L1"],
			peck: ["1L1"],
			icebreaker: ["1L7"],
			agility: ["1L14"],
			mist: ["1L21"],
			feathershot: ["1L28"],
			fly: ["1L35"],
			razorwind: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			chillwaves: ["1M"],
			divebombe: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			whirlwind: ["1M"],
		},
	},
	zapdos: {
		learnset: {
			drillpeck: ["1L1"],
			thundershock: ["1L1"],
			thunder: ["1L7"],
			agility: ["1L14"],
			lightscreen: ["1L21"],
			nightshade: ["1L28"],
			thunderwave: ["1L35"],
			flash: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			divebomb: ["1M"],
			fly: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			reflect: ["1M"],
			rest: ["1M"], //Universal
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
			whirlwind: ["1M"],
		},
	},
	moltres: {
		learnset: {
			peck: ["1L1"],
			lick: ["1L1"],
			ember: ["1L7"],
			leer: ["1L14"],
			agility: ["1L21"],
			fly: ["1L28"],
			firespin: ["1L35"],
			flamethrower: ["1L42", "1M"],
			adrenaline: ["1M"],
			bide: ["1M"], //Universal
			blank: ["1M"],
			deflect: ["1M"],
			deforest: ["1M"],
			divebomb: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			fireblast: ["1M"],
			hyperbeam: ["1M"],
			mimic: ["1M"], //Universal
			rage: ["1M"], //Universal
			razorwind: ["1M"],
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			skyattack: ["1M"],
			substitute: ["1M"], //Universal
			swift: ["1M"],
			takedown: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			whirlwind: ["1M"],
		},
	},
	dratini: {
		learnset: {
			splash: ["1L1"],
			lick: ["1L1"],
			cheepshot: ["1L7"],
			leer: ["1L14"],
			bite: ["1L21"],
			hydropump: ["1L28"],
			firespin: ["1L35"],
			hyperbeam: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			bodyslam: ["1M"],
			chillwave: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dragonrage: ["1M"],
			fireblast: ["1M"],
			firepunch: ["1M"],
			flash: ["1M"],
			icebreaker: ["1M"],
			icepunch: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			peck: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scalelaunch: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	dragonair: {
		learnset: {
			splash: ["1L1"],
			lick: ["1L1"],
			cheepshot: ["1L7"],
			leer: ["1L14"],
			bite: ["1L21"],
			hydropump: ["1L28"],
			firespin: ["1L35"],
			hyperbeam: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			bodyslam: ["1M"],
			chillwave: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dragonrage: ["1M"],
			fireblast: ["1M"],
			firepunch: ["1M"],
			flash: ["1M"],
			icebreaker: ["1M"],
			icepunch: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			peck: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scalelaunch: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	dragonite: {
		learnset: {
			splash: ["1L1"],
			lick: ["1L1"],
			cheepshot: ["1L7"],
			leer: ["1L14"],
			bite: ["1L21"],
			hydropump: ["1L28"],
			firespin: ["1L35"],
			hyperbeam: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bubblebeam: ["1M"],
			bodyslam: ["1M"],
			chillwave: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			dragonrage: ["1M"],
			fireblast: ["1M"],
			firepunch: ["1M"],
			flash: ["1M"],
			icebreaker: ["1M"],
			icepunch: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			peck: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			sauna: ["1M"],
			scalelaunch: ["1M"],
			skullbash: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
		},
	},
	mewtwo: {
		learnset: {
			growl: ["1L1"],
			constrict: ["1L1"],
			poisonsting: ["1L7"],
			doubleslap: ["1L14"],
			absorb: ["1L21"],
			smog: ["1L28"],
			lick: ["1L35"],
			peck: ["1L42", "1M"],
			acid: ["1M"],
			agility: ["1M"],
			aurorabeam: ["1M"],
			defensecurl: ["1M"],
			bide: ["1M"], //Universal
			conversion: ["1M"],
			deflect: ["1M"],
			disable: ["1M"],
			doubleteam: ["1M"], //Universal
			dragonrage: ["1M"],
			dreameater: ["1M"],
			focusenergy: ["1M"],
			glare: ["1M"],
			haze: ["1M"],
			metronome: ["1M"],
			mimic: ["1M"], //Universal
			mirrormove: ["1M"],
			mist: ["1M"],
			payday: ["1M"],
			quickattack: ["1M"],
			rage: ["1M"], //Universal
			rest: ["1M"], //Universal
			roar: ["1M"],
			rockthrow: ["1M"],
			scuttle: ["1M"],
			splash: ["1M"],
			stringshot: ["1M"],
			substitute: ["1M"], //Universal
			supersonic: ["1M"],
			tackle: ["1M"],
			toxic: ["1M"], //Universal
			watergun: ["1M"], //Universal
			whirlwind: ["1M"],
		},
		encounters: [
			{generation: 1, level: 5},
		],
	},
	mew: {
		learnset: {
			pound: ["1L1"],
			transform: ["1L1"],
			metronome: ["1L7"],
			psychic: ["1L14"],
			adrenaline: ["1L21"],
			brainwaves: ["1L28"],
			burrow: ["1L35"],
			cheepshot: ["1L42", "1M"],
			bide: ["1M"], //Universal
			bodyslam: ["1M"],
			bubblebeam: ["1M"],
			blank: ["1M"],
			blizzard: ["1M"],
			cut: ["1M"],
			counter: ["1M"],
			combustion: ["1M"],
			chillwave: ["1M"],
			deflect: ["1M"],
			deforest: ["1M"],
			dig: ["1M"],
			dragonrage: ["1M"],
			dreameater: ["1M"],
			doubleedge: ["1M"],
			doubleteam: ["1M"], //Universal
			earthquake: ["1M"],
			eggbomb: ["1M"],
			excavate: ["1M"],
			explosion: ["1M"],
			feathershot: ["1M"],
			fissure: ["1M"],
			fireblast: ["1M"],
			flash: ["1M"],
			fly: ["1M"],
			horndrill: ["1M"],
			hyperbeam: ["1M"],
			icebeam: ["1M"],
			icebreaker: ["1M"],
			moult: ["1M"],
			megadrain: ["1M"],
			megakick: ["1M"],
			megapunch: ["1M"],
			mimic: ["1M"], //Universal
			payday: ["1M"],
			psywave: ["1M"],
			rage: ["1M"], //Universal
			reflect: ["1M"],
			rest: ["1M"], //Universal
			rindoukanthrow: ["1M"],
			risingspire: ["1M"],
			rockslide: ["1M"],
			sauna: ["1M"],
			scalelaunch: ["1M"],
			scuttle: ["1M"],
			seismictoss: ["1M"],
			selfdestruct: ["1M"],
			softboiled: ["1M"],
			solarbeam: ["1M"],
			strength: ["1M"],
			submission: ["1M"],
			substitute: ["1M"], //Universal
			surf: ["1M"],
			skullbash: ["1M"],
			skyattack: ["1M"],
			swift: ["1M"],
			swordsdance: ["1M"],
			takedown: ["1M"],
			teleport: ["1M"],
			thorns: ["1M"],
			thunder: ["1M"],
			thunderbolt: ["1M"],
			thunderwave: ["1M"],
			toxic: ["1M"], //Universal
			tumble: ["1M"],
			triattack: ["1M"],
			watergun: ["1M"], //Universal
			wideslash: ["1M"],
			whirlwind: ["1M"],
		},
	},
}
