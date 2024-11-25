// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: FormatList = [
	///////////////////////////////////////////////////////////////
	///////////////////// Gen 9 Pet Mods //////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Gen 9 Pet Mods",
		column: 1,
		// name: "gen9petmods",
	},
	{
		name: "[Gen 9] Alternatium EX",
		desc: `<b>Alternatium EX</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-ex-slate-1-starter-pack.3701560/">Alternatium EX on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatiumex',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Min Source Gen = 3', 'Terastal Clause'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: [
				'Decidueye-Hermit', 'Decidueye-Autumn', 'Typhlosion-Explosive', 'Typhlosion-Warlock', 'Samurott-Foamy', 'Samurott-Rogue',
				'Oricorio', 'Oricorio-Cheerleader','Oricorio-Pa\u2019u', 'Horrorcorio',
				'Pikachu-Kanto', 'Pikachu-Hoenn', 'Pikachu-Sinnoh', 'Pikachu-Unova', 'Pikachu-Tactic', 'Pikachu-Alola', 'Pikachu-World',
				'Ribombee', 'Ribombee-Totem', 'Araquanid', 'Araquanid-Totem', 'Vikavolt', 'Vikavolt-Totem',
				'Urshifu', 'Urshifu-Erosion', 'Calyrex-Mythic', 'Calyrex-Glacier','Calyrex-Midnight',
				'Kommo-o', 'Rockmo-o', 'Salazzle', 'Salazzle-Ruler', 'Lurantis', 'Lurantio',
				'Mr. Mime', 'Mr. Mime-Prance', 'Stunfisk', 'Stunfisk-Trap',
				'Necrozma', 'Necrozma-Lionheart', 'Necrozma-Batwing', 'Necrozma-Dragon',
				'Braviary-Patriot', 'Braviary-Hisui', 'Lilligant-Bard', 'Mistlegant', 'Electrode-Screwball','Electrode-Ringo',
				'Persian-Bandit', 'Persian-Omen', 'Meowstic-Untethered', 'Meowstic-TwoTales',
				"Indeedee-Devil", "Indeedee-Angel", "Polteageist", "Polteageist-Antique", "Toxtricity-Rock-Star", "Toxtricity-Low-Key",
				"Articuno-Mistral", "Articuno-Tsunami", "Zapdos", "Charpados", "Moltres", "Bennutres",
				"Marowak", "Alolawak", "Marowak-Alola-Totem", "Enamorus", "Violentine",
				"Dialga", "Archronos", "Palkia", "Palkia-Origin",
				"Basculin-Hot-Headed","Basculectric", "Basculin-Skyship", "Basculegion", "Basculagoon",
				"Magearna", "Magearna-Prototype", "Zarude", "Zarude-Hero",
				"Qwilfish", "Aquattack", "Zoroark-Jorogumo", "Zoroark-Hoarfrost", "Goodra-Tsunade", "Goodra-Symbiotic",
				"Maushold-Raider", "Maushold-Extended", "Oinkologne", "Oinkologne-F", "Dudunsparce", "Dududunsparce",
				"Greninja", "Greninja-Ronin", "Imperil", "Hoopa-Ifrit",
				"Kyurem", "Kyurem-Black", "Kyurem-White", "Xerneas-Dormant", "Xerneas-Justice",
				"Arcanine-Water Balloon", "Arcanine-Noble", "Avalugg-Prism", "Avalugg-Plated",
				"Squawkabilly", "Squawkabiluck", "Squawkalone", "Squawkabilly-Yellow",
				"Wishiwashi-Lonesome", "Winardin", "Palafin", "Hercuphin",
				'Gumshoos', 'Gumshoos-Totem', 'Togedemaru', 'Totemaru',
				'Tauros', 'Bravatoro', 'Tauros-Steam', 'Tauros-Azul',
				'Raichu', 'Raichu-Soft', 'Rapidash', 'Rapidash-Galar', 'Golem-Berserker', 'Golem-Alola',
				'Cherrim', 'Cherrine', 'Minior', 'Minior-Meteor', 'Eevee', 'Eevee-Starter',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (speciesTable[template.id]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different formes). ", "You have more than one " + template.id + "."];
				}
				speciesTable[template.id] = true;
			}
		},
	},
	{
		name: "[Gen 4] Back to Sinnoh",
		desc: `Recreation of Gen 4 OU, with a lot of new Fakemons, moves, and abilities! No vanilla Gen 4 Pokemon allowed!`,
		threads: [],
		mod: 'backtosinnoh',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Sand Veil', 'Quick Claw', 'Soul Dew', 'Baton Pass'],
	},
	{
		name: "[Gen 9] Banhammers Cycle 3",
		desc: `<b>Banhammers</b>: A metagame where players are allowed to ban Pokemon, Moves, Items, and Abilities through earning points in room tournaments.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/banhammers-cycle-2-week-2-second-roomtour-6-17.3711488/">Banhammers on Smogon Forums</a>`,
         `&bullet; <a href="https://docs.google.com/spreadsheets/d/1prtFrCj_mdOpFtKPpsCH6S3CsO12tEgTIWaQJOEnUcY/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'banhammersc3',
		ruleset: ['Standard', 'Sleep Moves Clause', 'Data Mod', '!Sleep Clause Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass',
			'Last Respects', 'Shed Tail', 'Barraskewda', 'Cinderace', 'Clodsire', 'Dragapult', 'Enamorus-Base', 'Gholdengo', 'Gliscor', 'Hatterene',
			'Iron Treads', 'Kingambit', 'Ogerpon-Wellspring', 'Pelipper', 'Rillaboom', 'Walking Wake', 'Zamazenta', 'Earth Power', 'Flip Turn',
			'Freeze-Dry', 'Ice Beam', 'Knock Off', 'Spikes', 'Taunt', 'Thunder Wave', 'Toxic', 'Volt Switch', 'Booster Energy', 'Light Clay',
			'Protosynthesis', 'Clefable', 'Corviknight', 'Darkrai', 'Dragonite', 'Maushold', 'Primarina', 'Samurott-Hisui', 'Slowking-Galar',
			'Weavile', 'Focus Blast', 'Glare', 'Sticky Web', 'Unaware', 'Quark Drive', 'Blissey', 'Ceruledge', 'Chansey', 'Garchomp', 'Garganacl',
			'Glimmora', 'Hydreigon', 'Ogerpon-Cornerstone', 'Ting-Lu', 'Close Combat', 'Dragon Dance', 'Meteor Beam', 'Roost', 'Scale Shot', 'Stealth Rock',
			'Tera Blast', 'Heavy-Duty-Boots', 'Chlorophyll', 'Swift Swim', 'Regenerator', 'Draco Meteor', 'Intimidate', 'Levitate',
			'Focus Sash', 'Leftovers', 'Life Orb', 'Belly Drum', 'Calm Mind', 'Nasty Plot', 'Azumarill', 'Blaziken', 'Deoxys-Defense', 'Greninja',
			'Heatran', 'Kleavor', 'Kommo-o', 'Meowscarada', 'Moltres-Galar', 'Ninetales-Alola', 'Pecharunt', 'Politoed', 'Sinistcha', 'Skarmory',
			'Ursaluna', 'Zapdos-Base',
		],
    },
	{
		name: "[Gen 9] Beartic Phone",
	   desc: '<b>[Gen 9] Beartic Phone</b>: A group of 5 people unknowingly work together to create a fakemon, very similar to the online game "Gartic Phone".',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/beartic-phone.3727739/">Beartic Phone</a>',
			'https://docs.google.com/spreadsheets/d/1-Hfz-p0nomMLVFa4-4nGbLKaoWSl0xFTZA5Aiapw-Ko/edit#gid=1161734506">Spreadsheet</a>',
		],
		mod: 'bearticphone',
	  ruleset: ['Standard', 'Terastal Clause', 'Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'bear') {
					return [set.species + ' is not usable in Beartic Phone.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Blank Canvas",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3748841/">Blank Canvas</a>`,
		],
		mod: 'blankcanvas',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['BC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Blank Canvas.'];
				}
			}
		},
	},
	{
        name: "[Gen 9] Gen 9 Blindsided",
        desc: `<b>[Gen 9] Blindsided</b>: the monkey has awoken`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1263L6g2BPzf4eQQNfqJrp2FO1UMtGdxWXcyfz9OBqkM/edit#gid=1545907772">spreadsheet</a>`,
        ],
        mod: 'g9blindsided',
        ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
        banlist: [
			'Chelperela', 'Terrapollo', 'Dualifer',
			'Shed Tail', 'Last Respects',

			  // i apologize

			'Karate Chop', 'Double Slap', 'Comet Punch', 'Razor Wind', 'Jump Kick', 'Rolling Kick', 'Twineedle', 'Sonic Boom', 'Submission', 'Dragon Rage', 'Meditate',
			'Rage', 'Barrier', 'Bide', 'Mirror Move', 'Egg Bomb', 'Bone Club', 'Clamp', 'Skull Bash', 'Spike Cannon', 'Constrict', 'Kinesis', 'Barrage', 'Lovely Kiss',
			'Bubble', 'Dizzy Punch', 'Flash', 'Psywave', 'Bonemerang', 'Hyper Fang', 'Sharpen', 'Conversion', 'Sketch', 'Triple Kick', 'Spider Web', 'Mind Reader',
			'Nightmare', 'Conversion 2', 'Aeroblast', 'Feint Attack', 'Octazooka', 'Foresight', 'Return', 'Frustration', 'Sacred Fire', 'Magnitude', 'Pursuit',
			'Vital Throw', 'Hidden Power', 'Hail', 'Smelling Salts', 'Nature Power', 'Assist', 'Magic Coat', 'Revenge', 'Refresh', 'Grudge', 'Snatch', 'Secret Power',
			'Camouflage', 'Tail Glow', 'Luster Purge', 'Mist Ball', 'Mud Sport', 'Ice Ball', 'Needle Arm', 'Aromatherapy', 'Odor Sleuth', 'Silver Wind', 'Grass Whistle',
			'Signal Beam', 'Sky Uppercut', 'Water Sport', 'Doom Desire', 'Psycho Boost', 'Miracle Eye', 'Wake-Up Slap', 'Natural Gift', 'Embargo', 'Psycho Shift',
			'Trump Card', 'Heal Block', 'Wring Out', 'Lucky Chant', 'Me First', 'Punishment', 'Mud Bomb', 'Mirror Shot', 'Rock Climb', 'Rock Wrecker', 'Magnet Bomb',
			'Captivate', 'Chatter', 'Heal Order', 'Crush Grip', 'Dark Void', 'Seed Flare', 'Ominous Wind', 'Autotomize', 'Telekinesis', 'Storm Throw', 'Flame Burst',
			'Synchronoise', 'Chip Away', 'Sky Drop', 'Bestow', 'Dual Chop', 'Heart Stamp', 'Leaf Tornado', 'Steamroller', 'Head Charge', 'Gear Grind', 'Searing Shot',
			'Techno Blast', 'Secret Sword', 'Glaciate', 'Bolt Strike', 'Blue Flare', 'Freeze Shock', 'Ice Burn', 'Fusion Flare', 'Fusion Bolt', 'Mat Block', 'Rototiller',
			'Trick-or-Treat', 'Ion Deluge', 'Forest\'s Curse', 'Topsy-Turvy', 'Crafty Shield', 'Flower Shield', 'Electrify', 'King\'s Shield', 'Venom Drench', 'Powder',
			'Geomancy', 'Power-Up Punch', 'Oblivion Wing', 'Thousand Arrows', 'Thousand Waves', 'Land\'s Wrath', 'Light of Ruin', 'Sparkling Aria', 'Floral Healing',
			'Spotlight', 'Toxic Thread', 'Laser Focus', 'Gear Up', 'Anchor Shot', 'Purify', 'Core Enforcer', 'Beak Blast', 'Clanging Scales', 'Dragon Hammer',
			'Shell Trap', 'Shadow Bone', 'Prismatic Laser', 'Spectral Thief', 'Sunsteel Strike', 'Moongeist Beam', 'Nature\'s Madness', 'Multi-Attack',
			'Mind Blown', 'Plasma Fists', 'Photon Geyser', 'Double Iron Bash', 'Max Guard', 'Octolock', 'Bolt Beak', 'Fishious Rend', 'Clangorous Soul', 'Decorate',
			'Snap Trap', 'Aura Wheel', 'Strange Steam', 'Obstruct', 'Meteor Assault', 'Eternabeam',
		],

        onValidateTeam(team, format) {
            let speciesTable = {};
            let allowedTiers = ['hi'];
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'hi') {
                    return [set.species + ' is not legal in [Gen 9] Blindsided.'];
                }
            }
        },
     },
	{
        name: "[Gen 9] Gen 9 Blindsided Group B",
        desc: `<b>[Gen 9] Blindsided</b>: the monkey has awoken part 2`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1263L6g2BPzf4eQQNfqJrp2FO1UMtGdxWXcyfz9OBqkM/edit#gid=1545907772">spreadsheet</a>`,
        ],
        mod: 'g9blindsided',
        ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
        banlist: [
			'All Pokemon',
			'Shed Tail', 'Last Respects',

			  // i apologize

			'Karate Chop', 'Double Slap', 'Comet Punch', 'Razor Wind', 'Jump Kick', 'Rolling Kick', 'Twineedle', 'Sonic Boom', 'Submission', 'Dragon Rage', 'Meditate',
			'Rage', 'Barrier', 'Bide', 'Mirror Move', 'Egg Bomb', 'Bone Club', 'Clamp', 'Skull Bash', 'Spike Cannon', 'Constrict', 'Kinesis', 'Barrage', 'Lovely Kiss',
			'Bubble', 'Dizzy Punch', 'Flash', 'Psywave', 'Bonemerang', 'Hyper Fang', 'Sharpen', 'Conversion', 'Sketch', 'Triple Kick', 'Spider Web', 'Mind Reader',
			'Nightmare', 'Conversion 2', 'Aeroblast', 'Feint Attack', 'Octazooka', 'Foresight', 'Return', 'Frustration', 'Sacred Fire', 'Magnitude', 'Pursuit',
			'Vital Throw', 'Hidden Power', 'Hail', 'Smelling Salts', 'Nature Power', 'Assist', 'Magic Coat', 'Revenge', 'Refresh', 'Grudge', 'Snatch', 'Secret Power',
			'Camouflage', 'Tail Glow', 'Luster Purge', 'Mist Ball', 'Mud Sport', 'Ice Ball', 'Needle Arm', 'Aromatherapy', 'Odor Sleuth', 'Silver Wind', 'Grass Whistle',
			'Signal Beam', 'Sky Uppercut', 'Water Sport', 'Doom Desire', 'Psycho Boost', 'Miracle Eye', 'Wake-Up Slap', 'Natural Gift', 'Embargo', 'Psycho Shift',
			'Trump Card', 'Heal Block', 'Wring Out', 'Lucky Chant', 'Me First', 'Punishment', 'Mud Bomb', 'Mirror Shot', 'Rock Climb', 'Rock Wrecker', 'Magnet Bomb',
			'Captivate', 'Chatter', 'Heal Order', 'Crush Grip', 'Dark Void', 'Seed Flare', 'Ominous Wind', 'Autotomize', 'Telekinesis', 'Storm Throw', 'Flame Burst',
			'Synchronoise', 'Chip Away', 'Sky Drop', 'Bestow', 'Dual Chop', 'Heart Stamp', 'Leaf Tornado', 'Steamroller', 'Head Charge', 'Gear Grind', 'Searing Shot',
			'Techno Blast', 'Secret Sword', 'Glaciate', 'Bolt Strike', 'Blue Flare', 'Freeze Shock', 'Ice Burn', 'Fusion Flare', 'Fusion Bolt', 'Mat Block', 'Rototiller',
			'Trick-or-Treat', 'Ion Deluge', 'Forest\'s Curse', 'Topsy-Turvy', 'Crafty Shield', 'Flower Shield', 'Electrify', 'King\'s Shield', 'Venom Drench', 'Powder',
			'Geomancy', 'Power-Up Punch', 'Oblivion Wing', 'Thousand Arrows', 'Thousand Waves', 'Land\'s Wrath', 'Light of Ruin', 'Sparkling Aria', 'Floral Healing',
			'Spotlight', 'Toxic Thread', 'Laser Focus', 'Gear Up', 'Anchor Shot', 'Purify', 'Core Enforcer', 'Beak Blast', 'Clanging Scales', 'Dragon Hammer',
			'Shell Trap', 'Shadow Bone', 'Prismatic Laser', 'Spectral Thief', 'Sunsteel Strike', 'Moongeist Beam', 'Nature\'s Madness', 'Multi-Attack',
			'Mind Blown', 'Plasma Fists', 'Photon Geyser', 'Double Iron Bash', 'Max Guard', 'Octolock', 'Bolt Beak', 'Fishious Rend', 'Clangorous Soul', 'Decorate',
			'Snap Trap', 'Aura Wheel', 'Strange Steam', 'Obstruct', 'Meteor Assault', 'Eternabeam',
		],
		unbanlist: [
			"Agonette", "Alchevul", "Androimatide", "Armaruin", "Awesdruk", "Baashful", "Basilud", "Brasshopper", "Bruined", "Caddismith", "Caeruleto", "Capanopy", "Cardborg", "Carecrow", "Cavvage", "Chitana", "Chloravage", "Chubee", "Cloconstruct", "Covloris", "Croakast", "Cryosaurite", "Diabol", "Draatle", "Dreampunk", "Faeraith", "Falstiletto", "Fendeerie", "Ferticotta", "Flumflare", "Fridgeate", "Frozalisk", "Fulmineus", "Funera", "Gachacha", "Gastrel", "Gnomeush", "Gorilax", "Harmadillo", "Hydrongea", "IronRailgun", "Jamborai", "Kaledzi", "Kepa-ying", "Klimausion", "Kurayami", "Lepwozectur", "Libuble", "Lizhaman", "Locustab", "Marshwift", "Matitrick", "Melethyst", "Mochiknight", "Mon-Chi", "Mustank", "Neuranium", "Ohlmagoon", "Orbitgami", "Origyrant", "Phantasail", "Phanthazem", "Plasmacaw", "Pompadork", "Possabomb", "Pyrelic", "Pyroccult", "Pyrove", "Ralirulero", "Rexxon", "Roquack", "Roseaphot", "Sail-Goshi", "Sapparine", "Scorjester", "Scorpdyceps", "Searberus", "Shockatrice", "Snowpea", "Spectache", "Spirem", "Spongimney", "Squwhirrl", "Sundon", "Surchin", "Thorbarage", "Tiramitzu", "Tometex", "Tusquoka-Agent", "Tyrannyan", "Vamperilico", "Velvittle", "Vesquadron", "Vulchar", "Wiifii", "Wildemyst", "Zassansa", "Zauryo", "Zenoise", "Zunowy"
		],
        onValidateTeam(team, format) {
            let speciesTable = {};
            let allowedTiers = ['hi'];
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'hi') {
                    return [set.species + ' is not legal in [Gen 9] Blindsided.'];
                }
            }
        },
    },
	{
        name: "[Gen 9] Gen 9 Blindsided Group C",
        desc: `<b>[Gen 9] Blindsided</b>: the monkey has awoken part 3`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1263L6g2BPzf4eQQNfqJrp2FO1UMtGdxWXcyfz9OBqkM/edit#gid=1545907772">spreadsheet</a>`,
        ],
        mod: 'g9blindsided',
        ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
        banlist: [
			'All Pokemon',
			'Shed Tail', 'Last Respects', 'Baton Pass',

			  // i apologize

			'Karate Chop', 'Double Slap', 'Comet Punch', 'Razor Wind', 'Jump Kick', 'Rolling Kick', 'Twineedle', 'Sonic Boom', 'Submission', 'Dragon Rage', 'Meditate',
			'Rage', 'Barrier', 'Bide', 'Mirror Move', 'Egg Bomb', 'Bone Club', 'Clamp', 'Skull Bash', 'Spike Cannon', 'Constrict', 'Kinesis', 'Barrage', 'Lovely Kiss',
			'Bubble', 'Dizzy Punch', 'Flash', 'Psywave', 'Bonemerang', 'Hyper Fang', 'Sharpen', 'Conversion', 'Sketch', 'Triple Kick', 'Spider Web', 'Mind Reader',
			'Nightmare', 'Conversion 2', 'Aeroblast', 'Feint Attack', 'Octazooka', 'Foresight', 'Return', 'Frustration', 'Sacred Fire', 'Magnitude', 'Pursuit',
			'Vital Throw', 'Hidden Power', 'Hail', 'Smelling Salts', 'Nature Power', 'Assist', 'Magic Coat', 'Revenge', 'Refresh', 'Grudge', 'Snatch', 'Secret Power',
			'Camouflage', 'Tail Glow', 'Luster Purge', 'Mist Ball', 'Mud Sport', 'Ice Ball', 'Needle Arm', 'Aromatherapy', 'Odor Sleuth', 'Silver Wind', 'Grass Whistle',
			'Signal Beam', 'Sky Uppercut', 'Water Sport', 'Doom Desire', 'Psycho Boost', 'Miracle Eye', 'Wake-Up Slap', 'Natural Gift', 'Embargo', 'Psycho Shift',
			'Trump Card', 'Heal Block', 'Wring Out', 'Lucky Chant', 'Me First', 'Punishment', 'Mud Bomb', 'Mirror Shot', 'Rock Climb', 'Rock Wrecker', 'Magnet Bomb',
			'Captivate', 'Chatter', 'Heal Order', 'Crush Grip', 'Dark Void', 'Seed Flare', 'Ominous Wind', 'Autotomize', 'Telekinesis', 'Storm Throw', 'Flame Burst',
			'Synchronoise', 'Chip Away', 'Sky Drop', 'Bestow', 'Dual Chop', 'Heart Stamp', 'Leaf Tornado', 'Steamroller', 'Head Charge', 'Gear Grind', 'Searing Shot',
			'Techno Blast', 'Secret Sword', 'Glaciate', 'Bolt Strike', 'Blue Flare', 'Freeze Shock', 'Ice Burn', 'Fusion Flare', 'Fusion Bolt', 'Mat Block', 'Rototiller',
			'Trick-or-Treat', 'Ion Deluge', 'Forest\'s Curse', 'Topsy-Turvy', 'Crafty Shield', 'Flower Shield', 'Electrify', 'King\'s Shield', 'Venom Drench', 'Powder',
			'Geomancy', 'Power-Up Punch', 'Oblivion Wing', 'Thousand Arrows', 'Thousand Waves', 'Land\'s Wrath', 'Light of Ruin', 'Sparkling Aria', 'Floral Healing',
			'Spotlight', 'Toxic Thread', 'Laser Focus', 'Gear Up', 'Anchor Shot', 'Purify', 'Core Enforcer', 'Beak Blast', 'Clanging Scales', 'Dragon Hammer',
			'Shell Trap', 'Shadow Bone', 'Prismatic Laser', 'Spectral Thief', 'Sunsteel Strike', 'Moongeist Beam', 'Nature\'s Madness', 'Multi-Attack',
			'Mind Blown', 'Plasma Fists', 'Photon Geyser', 'Double Iron Bash', 'Max Guard', 'Octolock', 'Bolt Beak', 'Fishious Rend', 'Clangorous Soul', 'Decorate',
			'Snap Trap', 'Aura Wheel', 'Strange Steam', 'Obstruct', 'Meteor Assault', 'Eternabeam',
		],
		unbanlist: [
			"ExPl0r3REx3", "Androimatide", "Aparism", "Armaruin", "Averse", "Baashful", "Bardisco", "Bonnetform", "Bruined", "Capanopy", "Cardborg", "Chalquine", "Champimimus", "Chinchimra", "Chitana", "Cloconstruct", "Croakast", "Crushave", "Cryosaurite", "Diabol", "Draatle", "Driveel", "Drukrackoon", "Dynamantis", "Electhog", "Elyctron", "Faeraith", "Falstiletto", "Fendeerie", "Fridgeate", "Frozalisk", "Gachacha", "Gastrel", "Gnomeush", "Grrilla", "Harmadillo", "Heacluster", "Helmekh", "Hydrongea", "Iron Aspis", "Iron Rebel", "Jerboulda", "Kaledzi", "Kepa-ying", "Klimausion", "Kurayami", "Lizhaman", "Luxsectus", "Majestapis", "Marshwift", "Matryocha", "Melethyst", "Mochiknight", "Molar Bear", "Mon-Chi", "Moriwarty", "Mustank", "Neuranium", "Notfly", "Obbyplex", "Offendage", "Onion Wings", "Orbitgami", "Pestispine", "Phantasail", "Phanthazem", "Plasmacaw", "Plasmelion", "Polarpants", "Pompadork", "Possabomb", "Potatron", "Ralirulero", "Rexxon", "Rockick", "Rodendrain", "Roquack", "Roseaphot", "Sail-Goshi", "Scorjester", "Scorpdyceps", "Searberus", "Serprizius", "Shadellisk", "Shockatrice", "Skullpion", "Spectache", "Spirem", "Squwhirrl", "Stringle", "Sundon", "Surchin", "Terralauri", "Thorbarage", "Tiramitzu", "Tusquoka-Agent", "Twirlava", "Tyrannyan", "Vamperilico", "Velocipastor", "Velvittle", "Vesquadron", "Vulchar", "Wellowish", "Wyvking", "Zassansa", "Zauryo", "Zenoise", "Cucurbella"
		],
        onValidateTeam(team, format) {
            let speciesTable = {};
            let allowedTiers = ['hi', 'C'];
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if ((template.tier !== 'hi') && (template.tier !== 'C')) {
                    return [set.species + ' is not legal in [Gen 9] Blindsided.'];
                }
            }
        },
    },
	{
		name: "[Gen 9] Blindsided Draft",
		mod: "g9blindsided",
		desc: `<b>[Gen 9] Blindsided</b>: the monkey has awoken part draft`,
    threads: [
      `&bullet; <a href="https://docs.google.com/spreadsheets/d/1263L6g2BPzf4eQQNfqJrp2FO1UMtGdxWXcyfz9OBqkM/edit#gid=1545907772">spreadsheet</a>`,
     ],
    ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause', 'Terastal Clause'],
		banlist: [
			'Shed Tail', 'Last Respects', 'Baton Pass',

			  // i apologize

			'Karate Chop', 'Double Slap', 'Comet Punch', 'Razor Wind', 'Jump Kick', 'Rolling Kick', 'Twineedle', 'Sonic Boom', 'Submission', 'Dragon Rage', 'Meditate',
			'Rage', 'Barrier', 'Bide', 'Mirror Move', 'Egg Bomb', 'Bone Club', 'Clamp', 'Skull Bash', 'Spike Cannon', 'Constrict', 'Kinesis', 'Barrage', 'Lovely Kiss',
			'Bubble', 'Dizzy Punch', 'Flash', 'Psywave', 'Bonemerang', 'Hyper Fang', 'Sharpen', 'Spider Web', 'Mind Reader', 'Nightmare', 'Feint Attack', 'Octazooka', 
			'Foresight', 'Return', 'Frustration', 'Magnitude', 'Pursuit', 'Vital Throw', 'Hidden Power', 'Hail', 'Smelling Salts', 'Nature Power', 'Assist', 'Magic Coat', 
			'Revenge', 'Refresh', 'Grudge', 'Snatch', 'Secret Power', 'Camouflage', 'Mud Sport', 'Ice Ball', 'Needle Arm', 'Aromatherapy', 'Odor Sleuth', 'Silver Wind', 
			'Grass Whistle', 'Signal Beam', 'Sky Uppercut', 'Water Sport', 'Miracle Eye', 'Wake-Up Slap', 'Natural Gift', 'Embargo', 'Psycho Shift', 'Trump Card', 
			'Heal Block', 'Wring Out', 'Lucky Chant', 'Me First', 'Punishment', 'Mud Bomb', 'Mirror Shot', 'Rock Climb', 'Magnet Bomb', 'Captivate', 'Chatter', 
			'Heal Order', 'Ominous Wind', 'Autotomize', 'Telekinesis', 'Storm Throw', 'Flame Burst', 'Synchronoise', 'Chip Away', 'Sky Drop', 'Bestow', 'Dual Chop', 
			'Heart Stamp', 'Leaf Tornado', 'Steamroller', 'Head Charge', 'Gear Grind', 'Searing Shot', 'Techno Blast', 'Mat Block', 'Rototiller',	'Trick-or-Treat', 
			'Ion Deluge', 'Forest\'s Curse', 'Crafty Shield', 'Flower Shield', 'Electrify', 'King\'s Shield', 'Venom Drench', 'Powder',	'Geomancy', 'Power-Up Punch', 
			'Oblivion Wing', 'Thousand Arrows', 'Thousand Waves', 'Land\'s Wrath', 'Light of Ruin', 'Spotlight', 'Laser Focus', 'Gear Up', 'Anchor Shot', 'Purify', 
			'Core Enforcer', 'Shell Trap', 'Shadow Bone', 'Spectral Thief', 'Nature\'s Madness', 'Multi-Attack', 'Mind Blown', 'Plasma Fists', 'Double Iron Bash', 
			'Max Guard', 'Octolock', 'Bolt Beak', 'Fishious Rend', 'Snap Trap', 'Aura Wheel', 'Obstruct', 'Meteor Assault', 'Eternabeam',
			
			'Aparism', 'Chalquine', 'Driveel', 'Drukrackoon', 'Jerboulda', 'Molar Bear', 'Moriwarty', 'Notfly', 'Polarpants', 'Shadellisk', 'Stringle', 
		],
    onValidateTeam(team, format) {
      let speciesTable = {};
      let allowedTiers = ['hi', 'C'];
				for (const set of team) {
					let template = this.dex.species.get(set.species);
          if ((template.tier !== 'hi') && (template.tier !== 'C')) {
            return [set.species + ' is not legal in [Gen 9] Blindsided.'];
          }
        }
     },
	},
	{
		name: "[Gen 1] Burgundy Version",
		desc: `<b>[Gen 1] Burgundy Version</b>: An expansion of the Gen 1 OU metagame that changes some mechanics and adds new Pokemon and moves, both original and from later gens.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-burgundy-version-slate-3-new-moves-voting.3711525/">Burgundy Version on Smogon Forums</a>`,
		],
		mod: 'gen1burgundy',
		ruleset: ['Standard With Dig and Fly', 'Data Mod', 'Allow Tradeback'],
		banlist: ['Uber'],
		unbanlist: ['Anorith', 'Armaldo', 'Meditite', 'Medicham', 'Fletchling', 'Fletchinder', 'Talonflame', 'Sneasel-Hisui', 'Sneasler', 'Snover', 'Abomasnow',
					  ],
    },
	{
		name: "[Gen 9] Book of Enigmas",
		desc: [
			"<b>Book of Enigmas</b>: A Pet Mod that aims to create new Paradox Pokemon based on Ho-oh and Lugia - the sky and the sea, respectively.",
		],
		threads: [
			`&bullet: <a href="https://www.smogon.com/forums/threads/book-of-enigmas-slate-0-the-beginning-custom-abilities-names.3711490/">Thread on Smogon.`,
		],
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
			'Sceptilite', 'Blazikenite', 'Swampertite', 'Gardevoirite', 'Galladite', 'Alakazite', 'Gyaradosite',
			'Sablenite', 'Mawilite', 'Aggronite', 'Medichamite', 'Manectite', 'Sharpedonite', 'Cameruptite',
			'Altarianite', 'Absolite', 'Glalitite', 'Salamencite', 'Metagrossite', 'Latiasite', 'Latiosite',
			'Garchompite', 'Steelixite', 'Beedrillite', 'Pidgeotite',
			'Blue Orb', 'Red Orb', //this is just copied from ANL's lol
			'Beedrill-Mega', 'Pidgeot-Mega', //?????
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['BoE OU', "BoE NFE", "BoE LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Book of Enigmas OU.'];
				}
			}
		},
		mod: 'bookofenigmas',
	},
	{
		name: "[Gen 9] CCAPM 2024",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/.3748853/">Iron Fist</a>`,
		],
		mod: 'ccapm2024',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Sleep Clause Mod', 'Data Mod', 'Terastal Clause'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CCAPM2024'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in CCAPM 2024.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Clean Slate Micro 2",
		desc: `Clean Slate.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/clean-slate-micro-2.3696166/">Clean Slate Micro 2</a>`,
		],
		mod: 'csm2',
		ruleset: ['Standard', 'Dynamax Clause'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		// },
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'CSM2') {
					return [set.species + ' is not useable in Clean Slate Micro 2.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Crossover Chaos",
		desc: `Crossover Chaos, a micrometa designed to crossover characters from video game titles.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/gen-9-crossover-chaos.3711854/#post-9421623">Gen 9 Crossover Chaos</a>`,
		],
		mod: 'gen9crossoverchaos',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Terastal Clause', /* 'Mega Data Mod' */],
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'King Dedede' || set.species === 'Masked Dedede') {
				if (item === 'dededesmask') {
					set.species = 'Masked Dedede';
					let attackOrder = set.moves.indexOf('attackorder');
					if (attackOrder >= 0) {
						set.moves[attackOrder] = 'gigatonhammer';
					}
					let beatup = set.moves.indexOf('beatup');
					if (beatup >= 0) {
						set.moves[beatup] = 'electrohammer';
					}
				}
				else {
					set.species = 'King Dedede';
				}
			}
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CC OU', 'CC UU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Crossover Chaos Gen 9.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Crossover Chaos AG",
		desc: `Crossover Chaos, allowing mons in CC Ubers and unintroduced to be used.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/gen-9-crossover-chaos.3711854/#post-9421623">Gen 9 Crossover Chaos</a>`,
		],
		mod: 'gen9crossoverchaos',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Terastal Clause', /* 'Mega Data Mod' */],
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'King Dedede' || set.species === 'Masked Dedede') {
				if (item === 'dededesmask') {
					set.species = 'Masked Dedede';
					let attackOrder = set.moves.indexOf('attackorder');
					if (attackOrder >= 0) {
						set.moves[attackOrder] = 'gigatonhammer';
					}
					let beatup = set.moves.indexOf('beatup');
					if (beatup >= 0) {
						set.moves[beatup] = 'electrohammer';
					}
				}
				else {
					set.species = 'King Dedede';
				}
			}
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CC OU', 'CC UU', 'CC Ubers', 'unintroduced'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Crossover Chaos Gen 9 AG.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] DLCmons V3",
		desc: ["<b>DLCmons</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on the Kalos dex!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard', 'Z-Move Clause', 'Dynamax Clause'],
		banlist: [
			'AG', 'Uber',
			'Aegislash', 'Hoopa-Unbound', 'Greninja', 'Mawilite',
			'Arena Trap', 'Power Construct', 'Shadow Tag',
			'Baton Pass',
			'King\'s Rock', 'Razor Fang', 'Quick Claw',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
			}
		},
		mod: 'dlcmons',
	},
	{
		name: "[Gen 9] Dollhouse",
		desc: [
			"<b>Dollhouse</b>: An OU-based mod where, instead of bans, Pokemon are removed from the metagame by being turned into held items.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/dollhouse.3731495/">Thread on the Smogon Forums</a>`,
		],
		mod: 'dollhouse',
		ruleset: ['Standard', 'Terastal Clause'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Do Not Use: The Pet Mod: The Musical",
		desc: [
			"<b>Do Not Use: The Pet Mod: The Musical</b>: A National Dex Pet Mod where only Pokemon with 280 BST or less, with some exception, are allowed. New Pokemon are added and edited into the existing DNU metagame."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3749356/">Do Not Use: The Pet Mod: The Musical</a>`,
		],
		mod: 'donotusetmptm',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause', 'Data Mod'],
		teambuilderFormat: 'National Dex',
		banlist: ['Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm'],
		unbanlist: ['Assist'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DoNU', 'DoNU UUBL', 'DoNU UU', 'DoNU RUBL', 'DoNU RU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Do Not Use: The Pet Mod: The Musical.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Elimination War",
		mod: 'eliminationwar',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Legal'/*, 'Eliminated'*/];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Elimination War'];
				}
			}
		},
	},
		{
		name: "[Gen 9] Ebb and Flow",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/.3748857/">Ebb and Flow</a>`,
		],
		mod: 'ebbandflow',
		ruleset: ['Standard', 'Terastal Clause'],
		banlist: ['Uber', 'AG', 'Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody'],
	},
	{
		name: "[Gen 9] Eramons",
		desc: [
			`<b>Eramons</b>: A Gen 9 Pet Mod based on broad strokes of real-life historical time periods.`,
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3727769/">Gen 9 Eramons</a>`,
		],

		mod: 'eramons',
		ruleset: ['Standard', 'Terastal Clause'],
		banlist: ['Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format, teamHas) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let era : string[] = [];
			let allowedTiers = ['ECiv', 'Med', 'PrDay', 'FFut'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				let tier = template.tier;
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Eramons.'];
				}
				if (!(era.includes(tier))) {
					era.push(tier)
				}
			}
			if (era.length > 1) return ['Each Pokemon needs to be from the same era.'];
		},
	},
	{
		name: "[Gen 9] Fakemon Frontier OU",
		desc: `<b>[Gen 9] Fakemon Frontier OU</b>: A meta where the only legal Pokemon are community-made Fakemon that follow two of four predetermined "rules."`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3722349/">Fakemon Frontier on Smogon Forums</a>`,
		],
		mod: 'fakemonfrontier',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: [
			'Karate Chop', 'Double Slap', 'Comet Punch', 'Razor Wind', 'Jump Kick', 'Rolling Kick', 'Sonic Boom', 'Submission',
			'Dragon Rage', 'Meditate', 'Rage', 'Barrier', 'Bide', 'Mirror Move', 'Egg Bomb', 'Bone Club', 'Clamp', 'Skull Bash',
			'Spike Cannon', 'Constrict', 'Kinesis', 'Barrage', 'Lovely Kiss', 'Bubble', 'Dizzy Punch', 'Flash', 'Psywave', 'Bonemerang',
			'Hyper Fang', 'Sharpen', 'Triple Kick', 'Spider Web', 'Mind Reader', 'Nightmare', 'Feint Attack', 'Octazooka', 'Foresight',
			'Return', 'Frustration', 'Magnitude', 'Pursuit', 'Vital Throw', 'Hidden Power', 'Hail', 'Smelling Salts', 'Nature Power',
			'Assist', 'Magic Coat', 'Revenge', 'Refresh', 'Grudge', 'Snatch', 'Secret Power', 'Camouflage', 'Mud Sport', 'Ice Ball',
			'Needle Arm', 'Aromatherapy', 'Odor Sleuth', 'Silver Wind', 'Grass Whistle', 'Signal Beam', 'Sky Uppercut', 'Water Sport',
			'Miracle Eye', 'WakeUp Slap', 'Natural Gift', 'Embargo', 'Psycho Shift', 'Trump Card', 'Heal Block', 'Wring Out', 'Lucky Chant',
			'Me First', 'Punishment', 'Mud Bomb', 'Mirror Shot', 'Rock Climb', 'Rock Wrecker', 'Magnet Bomb', 'Captivate', 'Dark Void',
			'Ominous Wind', 'Autotomize', 'Telekinesis', 'Storm Throw', 'Flame Burst', 'Synchronoise', 'Chip Away', 'Sky Drop', 'Bestow',
			'Dual Chop', 'Heart Stamp', 'Leaf Tornado', 'Steamroller', 'Rototiller', 'Ion Deluge', 'Crafty Shield', 'Flower Shield', 'Electrify',
			'Venom Drench', 'Powder', 'PowerUp Punch', 'Light of Ruin', 'Sparkling Aria', 'Floral Healing', 'Laser Focus', 'Gear Up', 'Aura Wheel',
			'Last Respects', 'Shed Tail', 'Baton Pass'
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['FFOU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'FFOU') {
					return [set.species + ' is not legal in [Gen 9] Fakemon Frontier OU.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3717085/">Gen 9 Fusion Evolution</a>`,
		],
		mod: 'gen9fe',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'OU Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: ['Metagrossite', 'Revival Blessing', 'Shed Tail', 'Last Respects', 'Gengarite', 'Ampharosite', 'Salamencite', 'Baton Pass', 'Light Clay', 'Absolite', 'Medichamite'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FEOU', 'FEUUBL', 'FEUU', 'FENFE', "FELC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution UU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/fusion-evolution-uu-gen-9-slate-0-drop-slate-discussion-phase.3737223/#post-9994453/">Gen 9 Fusion Evolution UU</a>`,
		],
		mod: 'gen9fe',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		//While the first users of the mega stone will be made illegal with them if the respective megas are banned and not the stones,
		//banning other megas accessed through said stone will not ban the use of said mega stone on the base forms
		banlist: ['Altarianite', 'Revival Blessing', 'Shed Tail', 'Last Respects', 'Mawilite', 'Alakazite', 'Baton Pass', 'Light Clay',
			'Aero Wake', 'Amigotrio-Alola', 'Amphamence', 'Anoraidon', 'Arbolosion-Hisui', 'Baxgeist-Large', 'Bellikiss', 'Bouffa-Lu', 'Brambleswine',
			'Celedos', 'Cresserace', 'Crygargonal', 'Deciperior-Hisui', 'Deliraidon', 'Deoxyslash-Speed', 'Drampiclus', 'Druddizor',
			'Floatzera', 'Florgerouge', 'Gargamise', 'Garpyuku', 'Great Kleav', 'Icekrai', 'Iron Dirge', 'Iron Legion', 'Iron Matcha', 'Medichamite',
			'Iron Meta', 'Iron Mimic', 'Iron Tornado', 'Lelecuno-Galar', 'Meowscorio-Sensu', 'Necrotrik-Dawn-Wings', 'Necrotrik-Ultra', 'Primeleo',
			'Relishadow', 'Revarantis', 'Roaring Sal', 'Rotoghold', 'Samuraiai-Hisui', 'Scream Cormorant', 'Sol Valiant', 'Stargrowth', 'Tapu Titan', 'Tinkovish', 'Toedieleki',
			'Urshiluxe-Rapid-Strike', 'Varantis', 'Vikadrago', 'Weezaluna-Bloodmoon', 'Whimsy Sands', 'Wopple', 'Yu-Clod', 'Yveltox', 'Slither King', 'Magnegiri',
			'Muktaria-Alola-Mega', 'Mawlakazam-Mega-X', 'Mawlakazam-Mega-Y', 'Goopert-Hisui-Mega', 'Scizorite', 'Tentazor-Mega', 'Aerodactylite', 'Aerodirge-Mega', 'Zoroshark-Hisui-Mega'
		],
			//Just slapping "FEOU" in the banlist exclude these mons from the teambuilder... but an error ('Nothing matches "FEOU"') was thrown in dex-formats on the server side
			//Hence why bans were done manually
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FEUU', 'FENFE', "FELC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution UU.'];
				}
			}
		},
	},
	{
	name: "[Gen 9] Generation X: Brunica [Uber]",
		desc: ["<b>Generation X</b>: A pet mod that aims to develop new regions with brand-new Pokemon and select realmons, including ones that are absent from Scarlet and Violet. This format is based in Brunica, the mod's second region in Generation 9 after Desvega and fourth overall."],
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3722319/">Gen 9 Generation X</a>`,
			`<a href="https://www.smogon.com/forums/threads/3722319/post-10114743">Announcement of Generation X's fourth iteration</a>`,
		],
		mod: 'genxbrunica',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: [],
		unbanlist: ['Last Respects', 'Shed Tail', 'Bright Powder', 'Razor Fang', 'Arena Trap', 'Moody', 'Shadow Tag'], //Uber unbans
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Brunica Uber', 'Brunica OU', 'Brunica NFE', "Brunica LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not available in Generation X\'s Brunica formats.'];
				}
			}
		},/*
		onChangeSet(set) {
			if (set.species.startsWith('Lutakon')) {
				const item = this.toID(set.item);
				if (item === 'awakeningseed') {
					set.species = 'Lutakon-Awakened';
					set.ability = 'Guardian of Nature';
					let synthesis = set.moves.indexOf('Synthesis');
					if (synthesis < 0) {
						synthesis = set.moves.indexOf('synthesis');
					}
					if (synthesis >= 0) {
						let gaiaRecoveryIndex = set.moves.indexOf('gaiarecovery');
						if (gaiaRecoveryIndex < 0) {
							gaiaRecoveryIndex = set.moves.indexOf('Gaia Recovery');
						}
						if (gaiaRecoveryIndex >= 0) {
							delete set.moves[synthesis];
						}
						else {
							set.moves[synthesis] = 'gaiarecovery';
						}
					}
				} else {
					set.species = 'Lutakon';
				}
			}
		},*/
	},
	{
	name: "[Gen 9] Generation X: Brunica [OU]",
		desc: ["<b>Generation X</b>: A pet mod that aims to develop new regions with brand-new Pokemon and select realmons, including ones that are absent from Scarlet and Violet. This format is based in Brunica, the mod's second region in Generation 9 after Desvega and fourth overall."],
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3722319/">Gen 9 Generation X</a>`,
			`<a href="https://www.smogon.com/forums/threads/3722319/post-10114743">Announcement of Generation X's fourth iteration</a>`,
		],
		mod: 'genxbrunica',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: ['Akulut', 'Kaiwakaw', 'Lutakon', 'Lutakon-Awakened', 'Tinozous'], //Ubers
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Brunica OU', 'Brunica NFE', "Brunica LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier === 'Brunica Uber') {
					return [set.species + ' is banned in Generation X\'s OU format for Brunica.'];
				}
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not available in Generation X\'s Brunica formats.'];
				}
			}
		},
	},
	{
	name: "[Gen 9] Generation X: Desvega [Uber]",
		desc: ["<b>Generation X</b>: A pet mod that aims to develop new regions with brand-new Pokemon and select realmons, including ones that are absent from Scarlet and Violet. This format is based in Desvega, the mod's first region in Generation 9 and third region overall, as the successor to Loria from Generation 8."],
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3722319/">Gen 9 Generation X</a>`,
		],
		mod: 'genxdesvega',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: [],
		unbanlist: ['Last Respects', 'Shed Tail', 'Bright Powder', 'Razor Fang', 'Arena Trap', 'Moody', 'Shadow Tag'], //Uber unbans
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Desvega Uber', 'Desvega OU', 'Desvega NFE', "Desvega LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not available in Generation X\'s Desvega formats.'];
				}
			}
		},
	},
	{
	name: "[Gen 9] Generation X: Desvega [OU]",
		desc: ["<b>Generation X</b>: A pet mod that aims to develop new regions with both brand-new Pokemon and select realmons, including ones that are absent from Scarlet and Violet. This format is based in Desvega, the mod's first region in Generation 9 and third region overall, as the successor to Loria from Generation 8."],
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3722319/">Gen 9 Generation X</a>`,
		],
		mod: 'genxdesvega',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		banlist: ['Ursaluna-Bloodmoon', 'Naganadel', 'Arcognition', 'Janutcher', 'Virulope'], //Ubers
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Desvega OU', 'Desvega NFE', "Desvega LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier === 'Brunica Uber') {
					return [set.species + ' is banned in Generation X\'s OU format for Desvega.'];
				}
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not available in Generation X\'s Desvega formats.'];
				}
			}
		},
	},{
		name: "[Gen 9] GlaceMons",
		desc: [
			"<b>GlaceMons</b>: The fourth mod in the SylveMons series where Pokemon, items, abilities and moves are redesigned for Gen 9 NatDex OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="">Spreadsheet for the mod</a>`,
		],
		mod: 'glacemons',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['AG', 'Uber', 'Power Construct', 'Berserk Gene', 'Moody', 'Arena Trap', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] Hide and Seaking",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/hide-and-seaking.3743214/">Hide and Seaking</a>`,
		],
		teambuilderFormat: "National Dex",
		mod: 'littleestcup',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause', 'big dog Clause', 'Moniker Clause'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Houndoominite',
		],
	},
	{
		name: "[Gen 9] Hidden Gems",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3737861/">Hidden Gems</a>`,
		],
		mod: 'hiddengems',
		ruleset: ['Standard', 'Terastal Clause', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 3] Hoenn Gaiden OU",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-pet-mod-of-the-season.3714737/">Hoenn Gaiden on Smogon Forums</a>`,
		],
		mod: 'gen3hoenngaiden',
		ruleset: ['HG Standard', 'Data Mod', 'Freeze Clause Mod'],
		banlist: ['Uber'],
		unbanlist: ['Sand Veil'],
	},
	{
		name: "[Gen 9] Iron Fist",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/.3748853/">Iron Fist</a>`,
		],
		mod: 'sharedpowerironfist',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody',
		'Buginium Z', 'Darkinium Z', 'Dragonium Z', 'Electrium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Normalium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Waterium Z',
		'Abomasite', 'Absolite', 'Red Orb', 'Fish', 'Diamond Hand', 'Hoenn'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['IF'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Iron Fist.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Ironmons",
		desc: ["<b>Ironmons</b>: A OU based Pet Mod that aims to create new Paradox forms for existing Pokemon, both past and future.",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/ironmons.3731566/">Ironmons on Smogon Forums</a>`
		      ],
		mod: 'ironmons',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
	},
	{
		name: "[Gen 9] Little Colosseum LC",
		desc: ["<b>Little Colosseum</b>: A Gen 9 Little Cup Pet Mod that aims to buff weaker LC Pokemon and nerf LC Ubers to create a more diverse metagame."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3749020/">Little Colosseum on Smogon Forums</a>`,
		],
		mod: 'littlecolosseum',
		teambuilderFormat: "LC",
		ruleset: ['Little Cup', 'Standard', 'Data Mod'],
		banlist: [
			'Aipom', 'Basculin-White-Striped', 'Diglett-Base', 'Dunsparce', 'Duraludon', 'Flittle', 'Girafarig', 'Gligar',
			'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Qwilfish-Hisui', 'Rufflet', 'Scraggy', 'Scyther', 'Sneasel', 'Sneasel-Hisui',
			'Snivy', 'Stantler', 'Vulpix', 'Vulpix-Alola', 'Yanma', 'Moody', 'Baton Pass', 'Sticky Web',
		],
	},
	{
	  name: "[Gen 9] Masquerade",
     desc: '<b>Masquerade</b>: A micrometa where every Pokemon has at least one Ogerpon-like Mask form that can Terastalize to change its ability.',
	  threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/masquerade-slate-2-winners.3731477/">Masquerade on Smogon Forums</a>`,
		],
     mod: 'masquerade',
	  ruleset: ['Standard', 'Data Mod', 'Terastal Clause'],
	  banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock',
					'Baton Pass', 'Last Respects', 'Shed Tail', 'Cornerstone Mask'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MSQ'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'MSQ') {
					return [set.species + ' is not legal in [Gen 9] Masquerade.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Megas for All: Kalos",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on the Kalos dex!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Dynamax Clause', 'Mega Data Mod'],
		banlist: [
			'AG', 'Uber',
			'Aegislash', 'Hoopa-Unbound', 'Greninja',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Baton Pass',
			'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Quick Claw',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Mega' && template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
			}
		},
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
		mod: 'm4akalos',
	},
	{
		name: "[Gen 9] Megas for All: Paldea",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on the Paldea dex, pre DLC!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard', 'Z-Move Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: [
			'AG', 'Uber',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Baton Pass', 'Last Respects', 'Shed Tail',
			'King\'s Rock', 'Razor Fang', 'Quick Claw',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Mega' && template.tier !== 'Paldea' && template.tier !== 'Paldea (NFE)') {
					return [set.species + ' is not a part of the Paldea Pokédex.'];
				}
			}
		},
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
		onHitPriority: 1,
		onHit(target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('Hit', forte, {}, target, source, move);
				if (forte.self) this.singleEvent('Hit', forte.self, {}, source, source, move);
				this.singleEvent('AfterHit', forte, {}, target, source, move);
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterSubDamage', forte, null, target, source, move, damage);
			}
		},
		onModifySecondaries(secondaries, target, source, move) {
			if (secondaries.some(s => !!s.self)) move.selfDropped = false;
		},
		onAfterMoveSecondaryPriority: 1,
		onAfterMoveSecondarySelf(source, target, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterMoveSecondarySelf', forte, null, source, target, move);
			}
		},
		onBasePowerPriority: 1,
		onBasePower(basePower, source, target, move) {
			const forte = source.m.forte;
			if (move.category !== 'Status' && forte?.onBasePower) {
				forte.onBasePower.call(this, basePower, source, target, move);
			}
		},
		pokemon: {
			getItem() {
				const move = this.battle.dex.moves.get(this.m.forte);
				if (!move.exists) return Object.getPrototypeOf(this).getItem.call(this);
				return {
					...this.battle.dex.items.get('mail'),
					name: move.name, id: move.id, ignoreKlutz: true, onTakeItem: false,
				};
			},
		},
		mod: 'm4apaldea',
	},
	{
		name: "[Gen 9] M4A Paldea VGC",
		desc: ["Megas for All v7 but it's a VGC format",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		ruleset: ['Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Cancel Mod', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Mega Data Mod', 'Terastal Clause'],
		banlist: [
			'Koraidon', 'Miraidon', 'Pecharunt',
		],
		mod: 'm4apaldea',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.doublesTier !== 'Mega' && template.doublesTier !== 'Paldea' && template.doublesTier !== 'Paldea (NFE)') {
					return [set.species + ' is not a part of the Paldea Pokédex.'];
				}
			}
		},
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
	},
	{
		name: "[Gen 8] M4A OU NatDex",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Plays like National Dex, just with more Megas.",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		// ruleset: ['Standard NatDex', 'Standard M4A', 'Mega Data Mod', 'Dynamax Clause'],
		mod: 'm4av6',
		banlist: ['Slowking-Galar-Mega', 'Slowking-Galar + Slowkinite', 'Uber', 'AG', 'Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody',
			'Arena Trap', 'Power Construct', 'Shadow Tag', 'Snow Cloak', 'Sand Veil'
		],
		// teambuilderFormat: 'OU',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Mega of the Day!', 'Popular', 'Popular Megas', 'Other Megas', 'Heat!', 'NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in M4A OU NatDex.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] Megas Revisited",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713949/">Megas Revisited on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen6megasrevisited',
		ruleset: ['Standard', 'Swagger Clause', 'Mega Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass', 'Blaziken + Speed Boost'],
	},
	{
		name: "[Gen 9] MetaMons",
		desc: [
			"In this Pet Mod, we will aim to create a decently-sized micrometa that will expand in the unique niches of some Pokémon, giving them the spotlight after all the time they have been waiting.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/metamons-slate-3-galarian-slowbro-sableye-grapploct.3703361/">MetaMons</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/142lxuFtTgQCY56Wz_ZjAGaqlk7HgJj0CVKMChQcei1U/edit#gid=0">Spreadsheet</a>',
		],
		mod: 'metamons',
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Beedrillite'
		],
		teambuilderFormat: "National Dex",
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'MetaMons') {
					return [set.species + ' is not usable in MetaMons.'];
				}
			}
		},
	},
	{
        name: "[Gen 9] Micrometa Mafia 2",
        desc: [
            "micrometa mafia 2",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Micrometa Mafia 2 on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
        banlist: [],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'MMM2') {
                    return [set.species + ' is not usable in Micrometa Mafia 2.'];
                }
            }
        },
        mod: 'mmm2',
    },
	{
		name: "[Gen 9] More Balanced Hackmons v4",
		desc: `Balanced Hackmons with National Dex elements mixed in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711482/">More Balanced Hackmons v4</a>`,
		],
		mod: 'morebalancedhackmons',
		// debug: true,
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', 'Terastal Clause', '!Obtainable'],
		banlist: [
			'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Arena Trap',
			'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond',
			'Stakeout', 'Wonder Guard', 'Gengarite', 'Belly Drum', 'Chatter', 'Double Iron Bash', 'Electrify',
			'Last Respects', 'Octolock', 'Revival Blessing', 'Shed Tail', 'Shell Smash', 'Comatose + Sleep Talk', 'Imprison + Transform',
		],
		restricted: ['Arceus'],
		onValidateTeam(team, format) {
			// baseSpecies:count
			const restrictedPokemonCount = new Map<string, number>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!this.ruleTable.isRestrictedSpecies(species)) continue;
				restrictedPokemonCount.set(species.baseSpecies, (restrictedPokemonCount.get(species.baseSpecies) || 0) + 1);
			}
			for (const [baseSpecies, count] of restrictedPokemonCount) {
				if (count > 1) {
					return [
						`You are limited to one ${baseSpecies} forme.`,
						`(You have ${count} ${baseSpecies} forme${count === 1 ? '' : 's'}.)`,
					];
				}
			}
		},
	},
	{
		name: "[Gen 9] Multiverse",
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/multiverse-gen-9-slate-4-voting.3723507/">Multiverse</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/1Bu2Mm9L7vURggEI9mkkFM7mo-eLtLj2K95f4Rchaolg/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'gen9multiverse',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod'],
		banlist: ['Moody', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MV'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Multiverse.'];
				}
			}
		},
	},
	{
	  name: "[Gen 9] Natural Selection",
     desc: '<b>Natural Selection</b>: A micrometa where Pokemon actively evolve, fill new niches, and go extinct based on usage stats.',
	  threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/natural-selection.3732415/">Natural Selection on Smogon Forums</a>`,
		],
     mod: 'naturalselection',
	  ruleset: ['Standard', 'Data Mod', 'Terastal Clause'],
	  banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['NS'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'NS') {
					return [set.species + ' is not legal in [Gen 9] Natural Selection.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] NEXT OU",
		mod: 'gennext',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},
	{
	  name: "[Gen 9] OU Theorymons",
     desc: '<b>[Gen 9] OU Theorymons</b>: Fixing niche and unseen Pokemon in the SV OU Metagame with small buffs.',
	  threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/sv-ou-theorymon.3723892/">OU Theorymon on Smogon Forums</a>`,
		],
     mod: 'outheorymons',
	  ruleset: ['Standard', 'Data Mod'],
	  banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Paleomons",
	   desc: '<b>[Gen 9] Paleomons</b>: In this mod, we will be creating an SV OU-based micrometa of Pokémon based on real critters from the Paleozoic, Mesozoic, and Cenozoic eras.',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/paleomons-slate-1-winners.3727753/">Paleomons</a>',
		//	'&bullet; <a href="https://docs.google.com/spreadsheets/d/1wbFWGR5pVcnTTyuy7vAUSrPxqSZsNF-Okx-v1hvD2Vc/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'paleomons',
		teambuilderFormat: "National Dex",
	  ruleset: ['Standard', 'Terastal Clause', 'Data Mod', '!! Min Source Gen = 8'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Paleomons') {
					return [set.species + ' is not usable in Paleomons.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Poketypos",
		desc: `<b>[Gen 9] Poketypos</b>: A NatDex metagame that alters the names of Pokemon and change said Pokemon to fit their new name.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/pok%C3%A9typos-slate-2-single-stage-pokemon.3711498/">Poketypos on Smogon Forums</a>`,
		],
		mod: 'poketypos',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Terastal Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['Poketypos', 'Poketypos NFE', 'Poketypos LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Poketypos' && template.tier !== 'Poketypos NFE' && template.tier !== 'Poketypos LC') {
					return [set.species + ' is not legal in the Poketypos format.'];
				}
			}
		},
	},
	{
		name: "[Gen 1] RBY CAP",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3737699/">RBY CAP on Smogon Forums</a>`,
		],
		mod: 'gen1rbycap',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'Camouflage'],
	},
	{
		name: "[Gen 9] Roulettemons 2",
		desc: `<b>[Gen 9] Roulettemons 2</b>: A meta where the only legal Pokemon are randomly-generated Fakemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3717145/">Roulettemons 2 on Smogon Forums</a>`,
		],
		mod: 'roulettemons2',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['R2'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'R2') {
					return [set.species + ' is not legal in [Gen 9] Roulettemons 2.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Roulettemons 2 Ubers",
		desc: `<b>[Gen 9] Roulettemons 2 Ubers</b>: A broken meta where the only legal Pokemon are randomly-generated Fakemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3717145/">Roulettemons 2 on Smogon Forums</a>`,
		],
		mod: 'roulettemons2',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['R2', 'R2Ubers'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'R2' && template.tier !== 'R2Ubers') {
					return [set.species + ' is not legal in [Gen 9] Roulettemons 2.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] ReGeneration",
	   desc: [
			"In this Pet Mod, we will redesign the competitive functions of the Kantonian Pokemon after a Paldean counterpart.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/regeneration-slate-4-seadra-dodrio-wigglytuff.3718196/">ReGeneration</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/1wbFWGR5pVcnTTyuy7vAUSrPxqSZsNF-Okx-v1hvD2Vc/edit?usp=sharing">Spreadsheet</a>',
		],
		mod: 'regeneration',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		   'Aerodactylite', 'Alakazite', 'Beedrillite', 'Blastoisinite', 'Charizardite X', 'Charizardite Y', 'Gengarite',
         'Gyaradosite', 'Kangaskhanite', 'Mewtwonite X', 'Mewtwonite Y', 'Pidgeotite', 'Pinsirite', 'Slowbronite', 'Venusaurite'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'ReGeneration' && template.tier !== 'ReGeneration NFE' && template.tier !== 'ReGeneration LC') {
					return [set.species + ' is not usable in ReGeneration.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Regional Evolutions",
		desc: 'A NatDex micrometa, with only new regional forms and regional evolutions!',
		threads: [],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		banlist: ['Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Baton Pass'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RegEvo', 'RegEvo NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in RegEvo.'];
				}
			}
		},
		mod: 'regionalevolutions',
	},
	{
		name: "[Gen 9] Return to Orre: Tercera",
	   desc: [
			"This is a micrometa that only uses Pokemon obtainable in Colosseum and XD.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/return-to-orre-tercera-open-for-submissions.3722389/">RTO: Tercera</a>',
		],
		mod: 'returntoorretercera',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Picked Team Size = 3', 'Adjust Level = 50', 'VGC Timer'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		   'Aerodactylite', 'Alakazite', 'Beedrillite', 'Blastoisinite', 'Charizardite X', 'Charizardite Y', 'Gengarite',
         'Gyaradosite', 'Kangaskhanite', 'Mewtwonite X', 'Mewtwonite Y', 'Pidgeotite', 'Pinsirite', 'Slowbronite', 'Venusaurite',
			'Lugia', 'Ho-Oh', 'All Items'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'TERCERA' && template.tier !== 'TERCERA NFE') {
					return [set.species + ' is not usable in Return to Orre: Tercera.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Set in Stone",
		desc: [
			"<b>Set in Stone</b>: A micrometa where Pokemon are customized based on a combination of two player's set ideas.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/set-in-stone-phase-2-slate-2.3722451/post-9648171"> Set in Stone on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if ( template.tier !== 'SS') {
					return [set.species + ' is not usable in Set in Stone.'];
				}
			}
		},
		mod: 'setinstone',
	},
	{
		name: "[Gen 9] National Dex BH",
		desc: `Balanced Hackmons with National Dex elements mixed in.`,
		mod: 'gen9',
		searchShow: false,
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', 'Terastal Clause', '!Obtainable'],
		banlist: [
			'Cramorant-Gorging', 'Calyrex-Shadow', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Greninja-Ash', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Arena Trap',
			'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Pure Power', 'Shadow Tag',
			'Stakeout', 'Water Bubble', 'Wonder Guard', 'Gengarite', 'Berserk Gene', 'Belly Drum', 'Bolt Beak', 'Ceaseless Edge', 'Chatter', 'Double Iron Bash', 'Electrify',
			'Last Respects', 'Octolock', 'Rage Fist', 'Revival Blessing', 'Shed Tail', 'Shell Smash', 'Comatose + Sleep Talk', 'Imprison + Transform',
		],
		restricted: ['Arceus'],
		onValidateTeam(team, format) {
			// baseSpecies:count
			const restrictedPokemonCount = new this.dex.Multiset<string>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!this.ruleTable.isRestrictedSpecies(species)) continue;
				restrictedPokemonCount.add(species.baseSpecies);
			}
			for (const [baseSpecies, count] of restrictedPokemonCount) {
				if (count > 1) {
					return [
						`You are limited to one ${baseSpecies} forme.`,
						`(You have ${count} ${baseSpecies} forme${count === 1 ? '' : 's'}.)`,
					];
				}
			}
		},
	},
	{
		name: "[Gen 9] Secret Santa",
	   desc: '<b>[Gen 9] Secret Santa</b>: One person sets restrictions for another to follow in the creation of a fakemon".',
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/secret-santa-the-pet-mod.3727745/">Secret Santa</a>',
			'https://docs.google.com/spreadsheets/d/1IPFlVP4osQhGtjNRheycCX0AnZiUVipumGwqKdhOS2s/edit#gid=1272593335">Spreadsheet</a>',
		],
		mod: 'secretsanta',
	  ruleset: ['Standard', 'Terastal Clause', 'Data Mod', '+Past'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'santa') {
					return [set.species + ' is not usable in Secret Santa.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Super Smash Stereotypes",
		desc: [
			"<b>Super Smash Stereotypes</b>: A project that aims to create a micrometa containing a Pokemon from other mods for all 171 possible types.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/super-smash-stereotypes-fire-grass-water.3690227/">Super Smash Mods Melee on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Gardevoirite', 'Chillytite', 'Bisharpite', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if ( template.tier !== 'SSS') {
					return [set.species + ' is not usable in Super Smash Stereotypes.'];
				}
			}
		},
		mod: 'smashstereotypes',
	},
	{
		name: "[Gen 9] TeraMax",
		mod: 'teramax',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Wishing Stone > 1', 'Light Clay', 'Battle Bond', 'Melmetal-Gmax'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TMFE', 'TMNFE', "TMLC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in TeraMax.'];
				}
			}
		},
		onSwitchOut(pokemon) {
			const isTeraStellar = pokemon.terastallized === 'Stellar';
			if (isTeraStellar) {
			   pokemon.stellarBoostedTypes = [];
			}
		},
	},
	{
		name: "[Gen 9] Triple Threat",
		desc: [
			"<b>Triple Threat</b>: A micrometa where Pokemon are allowed to have up to three types.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/triple-threat-slate-2-dragon-fairy-steel.3722322">Triple Threat on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if ( template.tier !== 'TT') {
					return [set.species + ' is not usable in Triple Threat.'];
				}
			}
		},
		mod: 'triplethreat',
	},
	{
		name: "[Gen 9] Ubermons",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/ubermons-gen-9-natdex-slate-1-come-as-you-are-ogerpon-hearthflame-urshifu-landorus.3748813/">Ubermons Thread</a>`,
		],

		mod: 'gen9ubermons',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass'],
		teambuilderFormat: "National Dex",
	},
	{
		name: "[Gen 9] VaporeMons",
		desc: [
			"<b>VaporeMons</b>: The third mod in the SylveMons series where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/vaporemons-slate-1-discussion-phase.3722917/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1_5AwZ24dPu3-5m5yOyIO4OTPmW9OwIWXXzZ5IJZkj4c/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9vaporemons',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Light Clay', 'Fling + Segin Star Shard', /*'Damp Rock'*/],
	},
	///////////////////////////////////////////////////////////////
	///////////////////// Gen 8 Pet Mods //////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Gen 8 Pet Mods",
		column: 1,
		// name: "gen8petmods",
	},
	{
		name: "[Gen 8] Abilitypos",
		desc: `<b>Abilitypos</b>: In this Pet Mod, your goal is to take an ability and change a few letters in its name to make it brand new. `,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/abilitypos-slate-3-keen-eye-clear-body-and-inner-focus.3703365/">Abilitypos on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1B2LTJv_UnAG_vDGlmyyA00qL6KcY2aFkZ6NCixbdpmU/edit#gid=1595974891">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex'],
		banlist: ['All Pokemon'],
		unbanlist: ['Sceptile', 'Charizard', 'Inteleon', 'Lanturn', 'Larvesta', 'Aggron', 'Sableye', 'Carbink', 'Entei', 'Hatterene', 'Raticate-Alola', 'Lapras'],
		mod: "abilitypos",
	},
	{
		name: "[Gen 8] Alternatium",
		desc: `<b>Alternatium</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-slate-7-slow-twins-slate-also-vote-in-poll.3683767/">Alternatium on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatium',
		ruleset: ['Standard NatDex', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause'],
		banlist: ['All Pokemon', 'Slowbronite', 'Red Orb', 'Blue Orb'],
		unbanlist: [
					'Silvally', 'Silvally-Bug', 'Silvally-Dark', 'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fairy', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost',
					'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Pikachu', 'Pikachu-Rock-Star',
					'Pikachu-Belle', 'Pikachu-Idol', 'Pikachu-PhD', 'Pikachu-Libre', 'Pikachu-Partner', 'Pikachu-Starter', 'Darmanitan', 'Darmanitan-Zen', 'Darmanitan-Galar', 'Darmanitan-Galar-Zen',
					'Aegishield', 'Aegislash', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Rotom', 'Rotom-Heat', 'Rotom-Wash', 'Rotom-Frost', 'Rotom-Fan', 'Rotom-Mow', 'Dugtrio',
					'Dugtrio-Alola', 'Muk', 'Muk-Oilslick', 'Slowbro', 'Slowbro-Galar', 'Slowking', 'Slowking-Galar', 'Tornadus', 'Cummulus', 'Thundurus', 'Thundurus-Therian', 'Landorus', 'Landorus-Bengal',
					'Vivillon-Fancy', 'Vivillon-Spirit', 'Vivillon-Combat', 'Genesect', 'Genesect-Douse', 'Genesect-Molten', 'Genesect-Freezer', 'Genesect-Type-Delta', 'Groudon', 'Groudon-Primal', 'Kyogre',
					'Kyogre-Primal', 'Deoxys-Wood', 'Deoxys-Gem', 'Deoxys-Tank', 'Deoxys-Speed', 'Sandslash-Lustrous', 'Sandslash-Alola', 'Ninetales-Steamwork', 'Ninetales-Alola', 'Giratina', 'Giratina-Shadow',
					'Eternatus', 'Manustorm', 'Exeggutor', 'Exeggutor-Lighthouse', 'Weezing', 'Weezing-King', 'Raticate', 'Raticate-Alola', 'Linoone', 'Linoone-Punk', 'Castform', 'Castform-Firestorm',
					'Castform-Thunderstorm', 'Castform-Snowy', 'Wormadam', 'Wormadam-Sandy', 'Fibormadam', 'Farfetch\u2019d', 'Farfetch\u2019d-Galar', 'Corsola', 'Corsoul', 'Shaymin', 'Shaymin-Sky', 'Keldeo',
					'Swordeo', 'Meloetta', 'Meloetta-Fighter', 'Lycanday', 'Lycanroc-Spectre', 'Lycanroc-Dusk', 'Gourgeist', 'Gourgeist-Fae', 'Gourgeist-Pulpy', 'Supergeist', 'Cramorant', 'Cramorant-Swimmer',
					'Cramorant-Gorging', 'Eiscue', 'Eiscue-Noice', 'Mimikyu', 'Mimikyu-Sparkstone', 'Morpeko-Marsh', 'Morvilant', 'Zygarde-Wyrm', 'Zygarde-Canid', 'Zygarde-Goliath',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (speciesTable[template.id]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different formes). ", "You have more than one " + template.id + "."];
				}
				speciesTable[template.id] = true;
			}
		},
	},
	{
		name: "[Gen 8] Black Market",
		mod: "blackmarket",
		desc: [
			`<b>Black Market</b>: A Pet Mod where users build Fakemon over the span of a tournament.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/tournament-black-market-starting-phase.3704607/">Black Market on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/10BkMc61hCnfEc6XpjozDrQ20zMVAt5rArlvjsCENR7I/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex'],
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Kyurem'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga',
			'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White',
			'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal',
			'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
			'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z'
		],
	},
	{
		name: "[Gen 8] Bust A Move",
		desc: [
			"<b>Bust A Move</b>: A Pet Mod where previously competitively useless moves are given much needed makeovers.",
		  ],
		threads: [
		  `&bullet; <a href="https://www.smogon.com/forums/threads/bust-a-move-slate-5-sing-synchronoise-and-sparkling-aria.3681338/">Bust A Move on Smogon Forums</a>`,
		  `&bullet; <a href="https://docs.google.com/spreadsheets/d/149hYZMn1N92ofxiBdJEQ78g1EaQdBmex2wHCK3Fyais/edit?usp=sharing">Spreadsheet</a>`,
		  ],
		mod: 'bustamove',
		ruleset: ['Standard NatDex'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base',
			'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Magearna', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		teambuilderFormat: "OU",
	},
	{
		name: "[Gen 8] CCaPM 2022",
		desc: `<b>ccapm</b>: ccapm `,
		mod: "ccapm2022",
		ruleset: ['Standard', 'Data Mod', 'Godly Gift Mod'],
		banlist: ['AG', 'Uber',
				  'Blissey', 'Chansey', 'Dragapult', 'Hawlucha', 'Marowak-Alola', 'Melmetal', 'Nidoking', 'Nidoqueen', 'Pikachu', 'Toxapex',
				  'Focus Band', 'King\'s Rock', 'Quick Claw', 'Razor Fang',
				  'Huge Power', 'Moody', 'Arena Trap', 'Pure Power', 'Shadow Tag',
				  'Baton Pass'],
		restricted: ['Unicorn', 'Platypus', 'Power Plant', 'Druddigod', 'Snek', 'Ghost Car', 'Trapjaw Fireant', 'Duck', 'groundpoison', 'groundpoison-Crystallized', 'Metal Snek', 'Roc With Ram Horns', 'ghostnormal', 'Cartesian Plane Dragon', 'better than cinderace as soccer', 'Statue'],
	},
	{
		name: "[Gen 2] Crystal: Sevii Islands",
		desc: ["<b>Crystal: Sevii Islands</b>- A Gen 2 pet mod that aims to create new Pokemon, items, and moves for the GSC OU Metagame."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/crystal-sevii-islands.3695569/">Crystal: Sevii Islands on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1QL_789vTzxG8An43itUxPonK9ee7ezxH6GCR9dD_JyQ/edit?usp=sharing">Crystal: Sevii Islands spreadsheet</a>`,
		      ],
		mod: 'gen2crystalseviiislands',
		ruleset: ['Standard', 'Data Mod', 'Crystal: Sevii Islands Mod'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 8] Extreme Reboot",
		desc: `A metagame where the types, statuses, moves, abilities, and pokemon are rebooted.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3695749/">Extreme Reboot</a>`,
		],

		mod: 'extremereboot',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod',],
		banlist: ['All Pokemon', 'All Items'],
		unbanlist: [
			'Extreme Ribbit', 'Baobloss', 'Tenquarrel', 'Tradituki', 'Hibarrage', 'Pumking', 'Carboneichus', 'Calmengo', 'Paciphal', 'Hullacane', 'Cylindrake',
			'Efflor', 'Rantler', 'Zeploom', 'Terraphi', 'Stratophi', 'Pelaphi', 'Sunmola', 'Phantahawk', 'Memilifyy', 'Plantadiomicrisa', 'Terrahephas', 'Parvualias',
			'Rancicoon', 'Meditoid', 'Yukinooh', 'Misausmia', 'Pavronin', 'Kraklone', 'Crustair', 'Yulisse', 'Totodem', 'Persebloom', 'Persebloom-Frost', 'Hawkmorph',
			'Gallurise', 'Hensomnia', 'Protectonic', 'Crowbotic', 'Sponjourner', 'Emajanaja', 'Zenphin', 'Technophin', 'Beavair', 'Gyozumo', 'Gyozumo-Summer',
			'Onlaxy', 'Infinistar', 'Guareye', 'Curuprowl', 'Fertiri', 'Ruinne', 'Tantton', 'Crimsoil', 'Stakstok', 'Lychy', 'Onigashiba', 'Lunsura', 'Galactagon',
			'Axolacred', 'Dimetrogem', 'Anhaflara', 'Stormanos', 'Alchemeel', 'Alchemeel-Offense', 'Rasteal', 'Nailberg', 'Hoolican', 'Anchorage', 'Nosferanguis',
			'Pontiac', 'Sclam', 'Cicaguren', /*'Bozunami', 'Cryptice',*/ 'Mekangiras', 'Mononokero', 'Surfright', 'Potsworth', 'Cloudim', 'Salamoon', 'Salamoon-Allegro',
			'Gokaeru', 'Himekuji', 'Guroteserp', 'Galaxea', 'Galaxea-Complete', 'Pegathemum', 'Pegathemum-Complete', 'Cyrome-Book', 'Cyrome-Scribe', 'Cyrome-Author',
			'Darkira', 'Darkira-Ancient', 'Lakera', 'Lakera-Ancient', 'Mew 3.0', 'Solamateru', 'Jirachi-Extreme',
			'Blood Vial', 'Calming Salt', 'Cursed Orb', 'Emblematic Scarf', 'Enigmatic Shield', 'Fell Scythe', 'Gospel Notes', 'Life Gem', 'Maid Dress', 'Metalmorph',
			'Pokemon Standard', 'Power Stone', 'Seasons Gem', 'Tricky Hourglass', 'Platinum Orb', 'Iridescent Orb', 'Frosted Seed',
		],
		onModifySpeciesPriority: 2,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			if (species.id !== 'extremeribbit') return;
			const types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.moves.get(move.id).type))];
			return {...species, types: types};
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id === 'extremeribbit') return;
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Fusion Evolution UU",
		mod: "gen8feuu",
		desc: [
			`<b>Fusion Evolution Under Used</b>: A micrometa Pet Mod aiming to create more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Fusion Evolution Under Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zFk1_DBIoXFFn_7JpvYbVBrW-f1oFFh80Wn0CJNnbVo/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Red Orb', 'Baton Pass', 'Ninjacross + Heracronite', 'Kokovoir + Gardevoirite', 'Salamencite', 'Charizardite Y', 'Blue Orb', 'Wishirupti + Cameruptite', 'Mawilite', 'Gastrocham + Medichamite', 'Manectite', 'Herasir + Heracronite', 'Herasir + Pinsirite', 'Light Ball', 'Gengarite', 'Sablemime + Sablenite',
		],
		unbanlist: [
			'Volquag', 'Toxalure', 'Kingtsar', 'Tanette', 'Slowton',
			'Flaant', 'Umbat', 'Chomplim', 'Chomplim-Mega', 'Xotalion', 'Miemie', 'Dusking', 'Jelliswine',
			'Pigapult', 'Lycanserker-Dusk', 'Tapu Lop', 'Tapu Lop-Mega', 'Dragontler', 'Eternabat',
			'Grimmlurk', 'Manicuno-Galar', 'Yacian-Crowned', 'Cryogolem', 'Stoudrago',
			'Grousle', 'Dongoro', 'Slurpum',
			'Corveot', 'Corveot-Mega', 'Igglyzenta-Crowned', 'Arctres-Galar', 'Garborude', 'Noicity', 'Ferros',
			'Landmaldo-Therian', 'Tentoxys-Defense', 'Strikados-Galar', 'Hooporant',
			'Brontun', 'Mesflame', 'Thornbro-Galar', 'Glidol', 'Pincurchitar', 'Pincurchitar-Mega', 'Snortine', 'Flygalge',
			'Absable', 'Absable-Mega-X', 'Absable-Mega-Y', 'Scolisharp', 'Ninjacross', 'Gossephalon', 'Dracodoom',
			'Dracodoom-Mega', 'Toucosta', 'Weezlord-Galar', 'Sableior', 'Sableior-Mega', 'Sableior-Meteor', 'Sableior-Meteor-Mega',
			'Eeluk', 'Maroligatr-Alola', 'Frozerade',
			'Hattaka', 'Glasnow', 'Glasnow-Mega', 'Kokovoir', 'Kyottler', 'Clawliwrath',
			'Meloslash', 'Meloslash-Melee', 'Tornachamp', 'Cofazor', 'Cofazor-Mega', 'Talonsyl', 'Heatki',
			'Sirsola', 'Noze-Dawn-Wings', 'Noze-Ultra', 'Bruxray', 'Kingdeedee', 'Tapu Koma', 'Hawlazzle',
			'Whimsilotic', 'Vullacham', 'Vullacham-Mega', 'Dracolix', 'Dracolix-Mega', 'Serpanadel', 'Accelest', 'Buzzeggutor-Alola',
			'Roaramp', 'Roaramp-Mega', 'Glakiss', 'Glakiss-Mega', 'Leafdon',
			'Crustboar', 'Paracoal', 'Arctovic', 'Altarizard', 'Altarizard-Mega-X', 'Altarizard-Mega', 'Sandamar-Alola',
			'Jirachonator', 'Dredvul', 'Druddifini', 'Swannamence', 'Tyranette-Eternal',
			'Lurodactyl', 'Lurodactyl-Mega', 'Ninelands-Alola', 'Aurorona', 'Monferpa-Unbound', 'Gigacrab', 'Rosenaught', 'Keclyrex-Shadow',
			'Regibee', 'Regibee-Mega', 'Sigileye', 'Darmearna', 'Mr. Ace', 'Deciduskorch', 'Hypnakart', 'Zerclef',
			'Exeggutor-Prime', 'Porygrigus', 'Golisotops',
			'Avarupt', 'Avarupt-Mega', 'Goatitar', 'Goatitar-Mega', 'Fraxshadow', 'Pherogonga', 'Crawmise', 'Wishirupti',

			'Torranadus-Therian', 'Togetops', 'Toxicargo', 'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Swalurchin', 'Serpeblim',
			'Azekrow', 'Trapeino', 'Goodevoir', 'Goodevoir-Mega', 'Duramaw', 'Rhybite', 'Oricolyph-Sensu',
			'Grapplor', 'Masquerajah', 'Litleesect', 'Bearyx', 'Fetchey', 'Audiyem', 'Audiyem-Mega',
			'Eelektoad', 'Dialgast', 'Galsola', 'Galsola-Mega', 'Genebro-Galar', 'Hatterune',
			'Deodon-Attack', 'Sharpiskorch', "Sharpiskorch-Mega", "Gourninja", "Cleracross", "Cleracross-Mega", "Aromarel", "Lycansian",
			'Landowak-Alola', 'Emolggron', 'Emolggron-Mega', 'Metagon', 'Hoopagigas-Unbound', 'Nashifu', 'Cramotricity', 'Raibat', 'Darmanitan-Prime',
			'Zarapex', 'Pingar', 'Pingar-Mega', 'Kommo-tot', 'Rotokyu', 'Krookogatr', 'Venuroar', 'Venuroar-Mega', 'Klefilego', 'Rhychomp-Mega', 'Rhychomp',
			'Mr. Basc', 'Gastrocham', 'Manditop', 'Mienpa', 'Vikadrill',
			'Venoqueen', 'Arcalie', 'Yangarde',
			'Xurkirat', 'Golneton', 'Alakannon', 'Alakannon-Mega', 'Kingfezant', 'Googersby',
			'Dhelarina', 'Flychu-Alola', 'Haxel', 'Frossharp', 'Tyrantricity-Low-Key',
			'Champlume', 'Pyraskewda', 'Rotofable', 'Harisect', 'Tapu Pilo', 'Appletom-Wash', 'Phancrozma-Dawn-Wings', 'Phancrozma-Ultra',
			'Toxislash-Alola', 'Tentaterra', 'Minimie', 'Tsarant', 'Golevish-Alola',
			'Manecpig', 'Herasir', 'Magmovire', 'Giga Fini',
			'Impert-Female', 'Impert-Female-Mega', 'Koalicuno-Galar', 'Weezking-Galar', 'Ferrocario', 'Ferrocario-Mega', 'Mukremie', 'Acceldrill',

			'Silvino-Bug', 'Silvino-Dark', 'Silvino-Dragon', 'Silvino-Electric', 'Silvino-Fairy', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Ghost', 'Silvino-Grass', 'Silvino-Ground', 'Silvino-Ice',
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino-Steel', 'Silvino-Water', 'Silvino',

			/*'Silvino-Bug-Mega', 'Silvino-Dark-Mega', 'Silvino-Dragon-Mega',
			'Silvino-Electric-Mega', 'Silvino-Fairy-Mega', 'Silvino-Fighting-Mega',
			'Silvino-Fire-Mega', 'Silvino-Flying-Mega', 'Silvino-Ghost-Mega',
			'Silvino-Grass-Mega', 'Silvino-Ground-Mega', 'Silvino-Ice-Mega',
			'Silvino-Poison-Mega', 'Silvino-Psychic-Mega', 'Silvino-Rock-Mega',
			'Silvino-Steel-Mega', 'Silvino-Water-Mega',*/ 'Silvino-Mega',

			'Litleesect-Douse', 'Litleesect-Shock', 'Litleesect-Burn', 'Litleesect-Chill',
			'Genebro-Galar-Douse', 'Genebro-Galar-Shock', 'Genebro-Galar-Burn', 'Genebro-Galar-Chill',


			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned',
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola', 'Salasian-Alola-Mega',
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Dragancie-Mega", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Krowtom", "Sablemime", "Lycaking-Dusk",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",

			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
			'Exeggcute',
		],
	},
	{
		name: "[Gen 8] Fusion Evolution RU",
		mod: "gen8feuu",
		desc: [
			`<b>Fusion Evolution Rarely Used</b>: A micrometa Pet Mod aiming to create even-more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-rarely-used-slate-1-results-discussion-not-open-for-submissions.3691700/">Fusion Evolution Rarely Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1oelJdiPECm0guZWA9lIHG0w8xQV2nReGZu5lh2d0qcI/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass', 'Gardevoirite', 'Mawilite', 'Cameruptite', 'Scizorite', 'Glalitite', 'Sablenite', 'Lopunnite', 'Garchompite', 'Venusaurite', 'Pinsirite', 'Medichamite', 'Alakazite', 'Beedrillite', 'Manectite', 'Herasir + Heracronite', 'Charizardite Y', 'Charizardite X', 'Lucarionite', 'Swannamence + Salamencite', 'Diancite', 'Gengarite', 'Sablemime + Sablenite',
		],
		unbanlist: [
			'Torranadus-Therian', 'Togetops', 'Toxicargo', 'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Swalurchin', 'Serpeblim',
			'Azekrow', 'Trapeino', 'Goodevoir', 'Duramaw', 'Rhybite', 'Oricolyph-Sensu',
			'Grapplor', 'Masquerajah', 'Litleesect', 'Bearyx', 'Fetchey', 'Audiyem', 'Audiyem-Mega',
			'Eelektoad', 'Dialgast', 'Galsola', 'Galsola-Mega', 'Hatterune',
			'Deodon-Attack', 'Sharpiskorch', "Sharpiskorch-Mega", "Gourninja", "Cleracross", "Cleracross-Mega", "Aromarel", "Lycansian",
			'Landowak-Alola', 'Emolggron', 'Emolggron-Mega', 'Metagon', 'Hoopagigas-Unbound', 'Nashifu', 'Cramotricity', 'Raibat', 'Darmanitan-Prime',
			'Zarapex', 'Pingar', 'Kommo-tot', 'Rotokyu', 'Krookogatr', 'Venuroar', 'Klefilego', 'Rhychomp',
			'Mr. Basc', 'Gastrocham', 'Manditop', 'Mienpa', 'Vikadrill',
			'Venoqueen', 'Arcalie', 'Yangarde',
			'Xurkirat', 'Golneton', 'Alakannon', 'Kingfezant', 'Googersby',
			'Dhelarina', 'Flychu-Alola', 'Haxel', 'Frossharp', 'Tyrantricity-Low-Key',
			'Champlume', 'Pyraskewda', 'Rotofable', 'Harisect', 'Tapu Pilo', 'Appletom-Wash', 'Phancrozma-Dawn-Wings', 'Phancrozma-Ultra',
			'Toxislash-Alola', 'Tentaterra', 'Minimie', 'Tsarant', 'Golevish-Alola',
			'Manecpig', 'Herasir', 'Magmovire', 'Giga Fini',
			'Impert-Female', 'Impert-Female-Mega', 'Koalicuno-Galar', 'Weezking-Galar', 'Ferrocario', 'Mukremie', 'Acceldrill',

			'Tapu Lop', 'Absable', 'Absable-Mega-X', 'Cofazor', 'Lurodactyl', 'Lurodactyl-Mega', 'Wishirupti', 'Hypnakart', 'Talonsyl', 'Paracoal', 'Avarupt', 'Pherogonga',
			'Hawlazzle', 'Glakiss', 'Glasnow', 'Glasnow-Mega', 'Dusking', 'Strikados-Galar', 'Regibee',
			'Toxalure', 'Pigapult', 'Eternabat', 'Goatitar', 'Goatitar-Mega', 'Altarizard', 'Serpanadel', 'Crustboar', 'Flaant', 'Keclyrex-Shadow', 'Frozerade', 'Sirsola', 'Snortine',
			'Swannamence', 'Vullacham',

			'Silvino-Bug', 'Silvino-Dark', 'Silvino-Dragon', 'Silvino-Electric', 'Silvino-Fairy', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Ghost', 'Silvino-Grass', 'Silvino-Ground', 'Silvino-Ice',
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino-Steel', 'Silvino-Water', 'Silvino', 'Silvino-Mega',
			'Litleesect-Douse', 'Litleesect-Shock', 'Litleesect-Burn', 'Litleesect-Chill',

			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned',
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola', 'Salasian-Alola-Mega',
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Krowtom", "Sablemime", "Lycaking-Dusk",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",

			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
			'Exeggcute',
		],
	},
	{
		name: "[Gen 8] Fusion Evolution NU",
		mod: "gen8feuu",
		desc: [
			`<b>Fusion Evolution Never Used</b>: A micrometa Pet Mod aiming to create excessively-more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-never-used-slate-1-results-not-open-for-submissions.3701949/">Fusion Evolution Never Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1PGYIFPSfjMtA0cGQgjyxnngJ2WODLWIH9v46_upPSOA/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass', 'Salamencite', 'Abomasite', 'Absolite', 'Medichamite', 'Lopunnite', 'Diancite', 'Gengarite', 'Sablemime + Sablenite',
		],
		unbanlist: [
	 		'Rhybite',
			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned',
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola',
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",

			'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Azekrow', 'Trapeino', 'Bearyx', 'Fetchey', "Aromarel", 'Googersby', 'Harisect',
			'Absable', 'Tapu Lop', 'Hypnakart', 'Hawlazzle', 'Glasnow', 'Paracoal',
			'Swannamence', 'Vullacham',
			"Krowtom", "Sablemime", "Lycaking-Dusk",

			'Silvino-Bug', 'Silvino-Electric', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Grass', 'Silvino-Ice',
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino', 'Silvino-Mega',

			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
			'Exeggcute',
		],
	},
	{
	name: "[Gen 1] FutureProofing",
	   desc: `<b>[Gen 1] FutureProofing</b>: Adapting Dark, Steel, and Fairy-type moves and Pokemon to the Gen 1 OU metagame.`,
	   threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
	   ],
      mod: 'gen1futureproofing',
      ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
		unbanlist: ['Tyranitar', 'Gardevoir', 'Escavalier', 'Karrablast', 'Ralts', 'Kirlia', 'Pupitar', 'Larvitar',
					   'Snarl', 'Steel Wing', 'Strange Steam',
					   'Deino', 'Zweilous', 'Hydreigon', 'Scizor', 'Cottonee', 'Whimsicott',
						'Nature\'s Madness', 'Fake Tears', 'Gear Up',
						'Steelix', 'Spiritomb', 'Swablu', 'Altaria',
						'Fleur Cannon', 'Taunt', 'Heavy Slam',
						'Yveltal', 'Skarmory', 'Tapu Koko',
						'Lash Out', 'Crafty Shield', 'Sunsteel Strike',
						'Cacnea', 'Cacturne', 'Duraludon', 'Milcery', 'Alcremie',
						'Zigzagoon-Galar', 'Linoone-Galar', 'Obstagoon', 'Stunfisk-Galar', 'Mimikyu', 'Mimikyu-Busted',
						'Oshawott', 'Dewott', 'Samurott-Hisui', 'Riolu', 'Lucario', 'Popplio', 'Brionne', 'Primarina',
						'Grimmsnarl', 'Impidimp', 'Morgrem', 'Sylveon', 'Diglett-Alola', 'Dugtrio-Alola',
						'Magnezone', 'Houndour', 'Houndoom', 'Cutiefly', 'Ribombee',
						'Zarude', 'Zarude-Dada', 'Vulpix-Alola', 'Ninetales-Alola', 'Piplup', 'Prinplup', 'Empoleon',
					  ],
    },
	{
		name: "[Gen 8] JolteMons",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'joltemons',
		teambuilderFormat: 'OU',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Moody', 'Shaymin-Sky', 'Kangaskhan-Mega', 'Darmanitan-Galar', 'Metagross-Mega'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
	{
		name: "[Gen 8] JolteMons UU",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-playtesting-phase-uu.3694234/post-9143011">Banlist</a>`,
		],
		mod: 'joltemons',
		teambuilderFormat: 'UU',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Moody', 'Kangaskhan-Mega', 'Darmanitan-Galar'],
		banlist: ['OU', 'UUBL', 'Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Chill Pill G', 'Lopunnite', 'Scizorite', 'Gyaradosite', 'Charizardite Y', 'Charizardite X', 'Pinsirite', 'Heracronite', 'Aerodactylite', 'Alakazite', 'Galladite', 'Gardevoirite', 'Medichamite', 'Diancite', 'Mawilite', 'Beedrillite', 'Swampertite', 'Latiasite', 'Latiosite', 'Tyranitarite', 'Venusaurite', 'Graduation Scale', 'Sablenite',
					'Light Clay', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
	{
		name: "[Gen 8] JolteMons RU",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-playtesting-phase-uu.3694234/post-9143011">Banlist</a>`,
		],
		mod: 'joltemons',
		teambuilderFormat: 'RU',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Moody', 'Kangaskhan-Mega'],
		banlist: ['OU', 'UUBL', 'RUBL', 'UU', 'Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Chill Pill G', 'Lopunnite', 'Scizorite', 'Gyaradosite', 'Charizardite Y', 'Charizardite X', 'Pinsirite', 'Heracronite', 'Aerodactylite', 'Alakazite', 'Galladite', 'Gardevoirite', 'Medichamite', 'Diancite', 'Mawilite', 'Beedrillite', 'Swampertite', 'Latiasite', 'Latiosite', 'Tyranitarite', 'Venusaurite', 'Graduation Scale', 'Sablenite',
					'Altarianite', 'Chill Pill', 'Relic Charm', 'Drizzle', 'Ampharosite', 'Manectite', 'Pidgeotite', 'Steelixite', 'Aggronite', 'Banettite', 'Sharpedonite',
					'Light Clay', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
	{
		name: "[Gen 8] JolteMons NU",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-playtesting-phase-uu.3694234/post-9143011">Banlist</a>`,
		],
		mod: 'joltemons',
		teambuilderFormat: 'NU',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Moody'],
		banlist: ['OU', 'UUBL', 'RUBL', 'UU', 'Uber', 'RU', 'NUBL', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Chill Pill G', 'Lopunnite', 'Scizorite', 'Gyaradosite', 'Charizardite Y', 'Charizardite X', 'Pinsirite', 'Heracronite', 'Aerodactylite', 'Alakazite', 'Galladite', 'Gardevoirite', 'Medichamite', 'Diancite', 'Mawilite', 'Beedrillite', 'Swampertite', 'Latiasite', 'Latiosite', 'Tyranitarite', 'Venusaurite', 'Graduation Scale', 'Sablenite',
					'Altarianite', 'Chill Pill', 'Relic Charm', 'Drizzle', 'Ampharosite', 'Manectite', 'Pidgeotite', 'Steelixite', 'Aggronite', 'Banettite', 'Sharpedonite',
					'Absolite', 'Audinite', 'Kangaskhanite', 'Sceptilite', 'Cameruptite', 'Ghost Memory',
					'Light Clay', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
	{
		name: "[Gen 8] M4A VGC",
		desc: ["Megas for All v7 but it's a VGC format",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Dynamax Clause', 'Mega Data Mod'],
		banlist: [
			'Mewtwo', 'Mew',
			'Lugia', 'Ho-Oh', 'Celebi',
			'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys',
			'Dialga', 'Palkia', 'Giratina', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
			'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
			'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zeraora',
			'Zacian', 'Zamazenta', 'Eternatus', 'Zarude', 'Calyrex',
		],
		mod: 'm4av6',
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
		},
	},
	// Added Bo3 Formats for both M4A VGC formats, but commented them out for now in case M4A's leaders decide that they don't want them
	/*
	{
		name: "[Gen 8] M4A VGC (Bo3)",
		desc: ["Megas for All v7 but it's a VGC format",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Dynamax Clause', 'Mega Data Mod', 'Best of = 3'],
		banlist: [
			'Mewtwo', 'Mew',
			'Lugia', 'Ho-Oh', 'Celebi',
			'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys',
			'Dialga', 'Palkia', 'Giratina', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
			'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
			'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zeraora',
			'Zacian', 'Zamazenta', 'Eternatus', 'Zarude', 'Calyrex',
		],
		mod: 'm4av6',
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
		},
	},
 */
	{
		name: "[Gen 8] M4A Kalos VGC",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on the Kalos dex!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: [
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa-Unbound', 'Volcanion',
			// legalizes Hoopa-Confined, and only Hoopa-Confined, because it has a Mega specific to this season! (confirmed by Blue)
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Mega' && template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
			}
		},
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
		mod: 'm4akalos',
	},
	/*
	{
		name: "[Gen 8] M4A Kalos VGC (Bo3)",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on the Kalos dex!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Standard NatDex', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod', 'Best of = 3'],
		banlist: [
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa-Unbound', 'Volcanion',
			// legalizes Hoopa-Confined, and only Hoopa-Confined, because it has a Mega specific to this season! (confirmed by Blue)
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Mega' && template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
			}
		},
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
		mod: 'm4akalos',
	},
	*/
	{
		name: "[Gen 8] M4A Sandbox",
		desc: ["Megas for All v7 but it's Custom Game. Add custom typings and stats via Sandbox Mod!",
		      ],
		threads: [
				`&bullet; <a href="https://docs.google.com/document/d/1hhF49OIQKot72C30mCzSwxYgb3Ephhm9KCL_nMPrCW0/edit">Sandbox Mod Usage Guide</a>`,
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		searchShow: false,
		// now intended as a custom game-esque format with more freedom for testing
		ruleset: ['Team Preview', 'Cancel Mod', 'HP Percentage Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Data Mod', 'Mega Data Mod', 'Sandbox Mod', 'Overflow Stat Mod'],
		mod: 'm4asandbox',
	},
	// {
		// name: "[Gen 8] National Dex Balanced Hackmons v3",
		// desc: `<b>More Balanced Hackmons</b>: A National Dex mod of Balanced Hackmons with new pokemon, moves, and abilities, as well as some additional bans.`,
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/">More Balanced Hackmons on Smogon Forums</a>`,
		// ],

		// mod: 'nationaldexbalancedhackmons',
		// ruleset: ['Standard NatDex', '+Nonexistent', '!Obtainable Abilities', '!Obtainable Moves', '!Obtainable Formes', /*'Forme Clause', '2 Ability Clause', 'Arceus Clause'*/], // these clauses were not recognized after gen 9 update
		// banlist: [
				// 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Cramorant-Gorging', 'Calyrex-Shadow', 'Eternatus-Eternamax',
				// 'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull',
				// 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
				// 'Gengarite',
				// 'Chatter', 'Octolock', 'Double Iron Bash', 'Shell Smash', 'Bolt Beak', 'Belly Drum', 'Electrify',
				// 'Comatose + Sleep Talk', 'Imprison + Transform',
		// ],
		// onChangeSet(set) {
			// const item = this.dex.toID(set.item);
			// if (set.species === 'Zacian' && item === 'rustedsword') {
				// set.species = 'Zacian-Crowned';
				// set.ability = 'Intrepid Sword';
				// const ironHead = set.moves.indexOf('ironhead');
				// if (ironHead >= 0) {
					// set.moves[ironHead] = 'behemothblade';
				// }
			// }
			// if (set.species === 'Zamazenta' && item === 'rustedshield') {
				// set.species = 'Zamazenta-Crowned';
				// set.ability = 'Dauntless Shield';
				// const ironHead = set.moves.indexOf('ironhead');
				// if (ironHead >= 0) {
					// set.moves[ironHead] = 'behemothbash';
				// }
			// }
		// },
		// onValidateTeam(team, format){
			// /**@type {{[k: string]: true}} */
			// for (const set of team) {
				// if (set.species == 'Zacian-Crowned' && set.ability !== 'Intrepid Sword')
					 // return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				// if (set.species == 'Zacian-Crowned' && set.item !== 'Rusted Sword')
					 // return ["Zacian-Crowned can only have Rusted Sword as its item."]
				// if ((set.species !== 'Zacian-Crowned' && set.species !== 'Zacian') && set.ability === 'Intrepid Sword')
					 // return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
			// }
		// },
	// },
  //	{
   	//	name: "[Gen 8] OU Theorymon",
   	// desc: [
	   	// "<b>OU Theorymon</b>: A Sword and Shield OU metagame where low-ranked Pokemon are improved to become more viable.",
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymon on Smogon Forums</a>`,
		// ],

		// mod: 'outheorymons',
      // ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		// banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
	// },
	// {
		// name: "[Gen 8] Paleomons",
		// desc: [
			// "<b>Paleomons</b>: A Sword and Shield metagame that aims to create a micrometa full of ancient Pokemon."
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/paleomons-slate-3-non-dino-stars-dimetrodon-dodo-sea-scorpion-submission-phase.3695565/">Paleomons on Smogon Forums`,
		// ],

		// mod: 'paleomons',
		// ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		// banlist: [
			// 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		// ],
		// onValidateTeam(team, format) {
			// /**@type {{[k: string]: true}} */
			// let speciesTable = {};
			// let allowedTiers = ['Paleomons', 'Paleomons NFE', 'Paleomons LC'];
			// for (const set of team) {
				// let template = this.dex.species.get(set.species);
				// if (template.tier !== 'Paleomons' && template.tier !== 'Paleomons NFE' && template.tier !== 'Paleomons LC') {
					// return [set.species + ' is not legal in the Paleomons format.'];
				// }
			// }
		// },
	// },
	{
		name: "[Gen 8] Restrictions",
		desc: `<b>Restrictions</b>: A metagame made up of brand new Pok&eacute;mon that are made according to various random and non-random restrictions.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3673824/">Restrictions on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1XsplBqN8njHZJT9cTP_3i3YSFITB9WaVfNOYAbNY75M/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'restrictions',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', /*'lcuber',*/ 'lc', 'cap', 'caplc', 'capnfe', 'ag','past', 'future', 'lgpe'],
		teambuilderBans: ['unreleased'],
	},
	{
		name: "[Gen 8] Signature Restrictions",
		desc: `<b>Singature Restrictions</b>: A metagame made up of brand new Pok&eacute;mon that are made according to various restrictions provided by Pet Mod Users.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3673824/">Singature Restrictions on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1nUaGjuy4ZHWa7x-f1hpw7jc6ecNUZtT7QChAidv5CvY/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'signaturerestrictions',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', 'lc', 'cap', 'caplc', 'capnfe', 'ag','past', 'future', 'lgpe'],
		teambuilderBans: ['unreleased'],
	},
	{
		name: "[Gen 8] Stereotypes",
		mod: "stereotypes",
		desc: [
			"<b>Stereotypes</b>: A project that aims to create a micrometa containing a unique new Pokemon for all 171 possible types, with the hope that each mon will use its typing and the options that typing affords well, while still being balanced and interesting.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/stereotypes-slate-1-fire-grass-water.3681312/">Stereotypes on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/19CbVWEkREchf_88VNfyEpcYEIdH_aJe20VMQyc8i-8Y/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Conversion', 'Conversion2', 'Libero', 'Protean', 'Transistor', 'Dragon\'s Maw', 'Steelworker', 'Steely Spirit', 'Color Change', 'Arena Trap', 'Shadow Tag', 'Moody'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['ST', 'ST NFE', 'ST LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Stereotypes.'];
				}
			}
		},
	},
	///////////////////////////////////////////////////////////////
	//////////////////////// Solomods /////////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Solomods",
		column: 2,
	},
	{
		name: "[Gen 9] A Golden Experience",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'agoldenexperience',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Uber', 'Power Construct', 'Berserk Gene', 'Moody',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Ultranecrozium Z', 'Pikashunium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Marshadium Z',
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Shed Tail', 'Light Clay', 'Damp Rock', 'Heat Rock', 'Icy Rock', 'Smooth Rock',
				'Rusted Sword', 'Rusted Shield', 'Booster Energy'],
		unbanlist: ['Battle Bond', 'Greninja-Bond', 'Greninja-Ash'],
		teambuilderFormat: 'National Dex',
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'Zacian' || set.species === 'Zacian-Crowned') {
				if (item === 'rustedsword') {
					set.species = 'Zacian-Crowned';
					set.ability = 'Intrepid Sword';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothblade';
					}
				} else {
					set.species = 'Zacian';
				}
			}
			else if (set.species === 'Zamazenta' || set.species === 'Zamazenta-Crowned') {
				if (item === 'rustedshield') {
					set.species = 'Zamazenta-Crowned';
					set.ability = 'Dauntless Shield';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothbash';
					}
				} else {
					set.species = 'Zamazenta';
				}
			}
		},
		onValidateTeam(team, format){
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				if (set.species == 'Zacian-Crowned' && set.ability !== 'Intrepid Sword')
					 return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				if ((set.species !== 'Zacian-Crowned' && set.species !== 'Zacian') && set.ability === 'Intrepid Sword')
					 return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
			}
		},
	},
	{
		name: "[Gen 9] A Golden Experience UU",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'agoldenexperience',
		ruleset: ['Standard NatDex', 'Terastal Clause','OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Uber', 'OU', 'UUBL', 'Battle Bond', 'Power Construct', 'Berserk Gene', 'Moody',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Ultranecrozium Z', 'Pikashunium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Marshadium Z',
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Light Clay', 'Damp Rock', 'Heat Rock', 'Icy Rock', 'Smooth Rock', 'Booster Energy'],
		unbanlist: ['Battle Bond', 'Greninja-Bond', 'Greninja-Ash'],
		teambuilderFormat: 'National Dex UU',
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'Zacian' || set.species === 'Zacian-Crowned') {
				if (item === 'rustedsword') {
					set.species = 'Zacian-Crowned';
					set.ability = 'Intrepid Sword';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothblade';
					}
				} else {
					set.species = 'Zacian';
				}
			}
			else if (set.species === 'Zamazenta' || set.species === 'Zamazenta-Crowned') {
				if (item === 'rustedshield') {
					set.species = 'Zamazenta-Crowned';
					set.ability = 'Dauntless Shield';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothbash';
					}
				} else {
					set.species = 'Zamazenta';
				}
			}
		},
		onValidateTeam(team, format){
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				if (set.species == 'Zacian-Crowned' && set.ability !== 'Intrepid Sword')
					 return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				if ((set.species !== 'Zacian-Crowned' && set.species !== 'Zacian') && set.ability === 'Intrepid Sword')
					 return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
			}
		},
	},
	{
		name: "[Gen 9] A Golden Experience RU",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'agoldenexperience',
		ruleset: ['Standard NatDex', 'Terastal Clause','OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Uber', 'OU', 'UUBL', 'UU', 'RUBL','Battle Bond', 'Power Construct', 'Berserk Gene', 'Moody',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Ultranecrozium Z', 'Pikashunium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Marshadium Z',
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Zen Mode', 'Light Clay', 'Damp Rock', 'Heat Rock', 'Icy Rock', 'Smooth Rock', 'Booster Energy'],
		unbanlist: ['Battle Bond', 'Greninja-Bond', 'Greninja-Ash'],
		teambuilderFormat: 'National Dex RU',
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'Zacian' || set.species === 'Zacian-Crowned') {
				if (item === 'rustedsword') {
					set.species = 'Zacian-Crowned';
					set.ability = 'Intrepid Sword';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothblade';
					}
				} else {
					set.species = 'Zacian';
				}
			}
			else if (set.species === 'Zamazenta' || set.species === 'Zamazenta-Crowned') {
				if (item === 'rustedshield') {
					set.species = 'Zamazenta-Crowned';
					set.ability = 'Dauntless Shield';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothbash';
					}
				} else {
					set.species = 'Zamazenta';
				}
			}
		},
		onValidateTeam(team, format){
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				if (set.species == 'Zacian-Crowned' && set.ability !== 'Intrepid Sword')
					 return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				if ((set.species !== 'Zacian-Crowned' && set.species !== 'Zacian') && set.ability === 'Intrepid Sword')
					 return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
			}
		},
	},
	{
		name: "[Gen 9] A Golden Experience VGC",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'agoldenexperience',
		gameType: 'doubles',
		teambuilderFormat: 'National Dex Doubles',
		ruleset: [/*'Flat Rules', */'Terastal Clause', 'Adjust Level = 50', 'VGC Timer', 'Dynamax Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Mewtwo', 'Mew',
			'Lugia', 'Ho-Oh', 'Celebi',
			'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys',
			'Dialga', 'Palkia', 'Giratina', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
			'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
			'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zeraora',
			'Zacian', 'Zamazenta', 'Eternatus', 'Zarude', 'Calyrex',
			'Koraidon', 'Miraidon',
		],
		unbanlist: ['Battle Bond', 'Greninja-Bond', 'Greninja-Ash'],
	},
	{
		name: "[Gen 3] ADV DX OU",
		mod: 'gen3advdx',
		ruleset: ['Standard', 'Freeze Clause Mod', 'Data Mod'],
		banlist: ['Uber', 'Sand Veil', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Smeargle + Ingrain', 'Soul Dew', 'Sand Attack', 'Flash', 'Mud-Slap', 'Kinesis', 'Smokescreen'],
	},
	{
		name: "[Gen 3] ADV DX Doubles",
		mod: 'gen3advdx',
		gameType: 'doubles',
		ruleset: ['Standard', 'Freeze Clause Mod', 'Data Mod', '!Switch Priority Clause Mod'],
		banlist: ['Uber', 'Quick Claw', 'Soul Dew', 'Explosion', 'Self-Destruct', 'Swagger', 'Sand Attack', 'Flash', 'Mud-Slap', 'Kinesis', 'Smokescreen'],
		unbanlist: ['Wobbuffet', 'Wynaut'],
	},
	{
		name: "[Gen 3] ADV Tradebacks",
		mod: 'gen3tradebacks',
		ruleset: ['Standard', 'Baton Pass Mod', 'One Boost Passer Clause', 'Freeze Clause Mod', 'Data Mod'],
		banlist: ['Uber', 'Sand Veil', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Smeargle + Ingrain'],
	},
	{
		name: "[Gen 9] Balls",
		mod: 'balls',
		desc: `A hilarious metagame filled with nothing but balls.`,
		ruleset: ['Standard', 'Data Mod'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Balls'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return ['Balls ' + set.species + ' doesnt exist.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Bare Bones",
		desc: 'bare bones micrometa',
		mod: 'barebones',
		ruleset: [
		'Team Preview', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Terastal Clause', 'Data Mod', 'Camomons Mod',
		],
		banlist: ['All Items', 'All Abilities'],
		unbanlist: [
		'Pinch Berry', 'Tsersi Berry', 'Leftovers', 'Silk Scarf', 'Charcoal', 'Mystic Water', 'Miracle Seed', 'Magnet', 'Never-Melt Ice', 'Black Belt', 'Poison Barb',
		'Soft Sand', 'Sharp Beak', 'Twisted Spoon', 'Silver Powder', 'Hard Stone', 'Spell Tag', 'Dragon Fang', 'Black Glasses', 'Metal Coat', 'Fairy Feather', 'Muscle Band',
		'Wise Glasses', 'Exchanger', 'Focus Sash',
		
		'Desperation', 'Last Stand', 'Appraisal', 'Rejuvenate', 'Recycler', 'Somewhat Reckless', 'Tinted Tactics', 'Intimidate', 'Sceptic',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['bbones'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not in Bare Bones.'];
				}
			}
		}
  },
	{
        name: "[Gen 9] Climate Change",
        desc: [
            "weather war",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Climate Change on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
        banlist: ['Sunny Day', 'Rain Dance', 'Sandstorm', 'Hail', 'Snowscape', 'Chilly Reception', 'Charizardite X'],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            for (const set of team) {
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'CC') {
                    return [set.species + ' is not usable in Climate Change.'];
                }
            }
        },
        mod: 'weatherwar',
    },
	{
		name: "[Gen 9] Clubmons: Requiem",
		mod: 'clubmonsrequiem',
		desc: `A micrometagame focused on accessibility and teambuilder diversity.`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-8#post-10124271">Clubmons on Smogon Forums</a>`,
		],
		banlist: ['Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Baton Pass', 'Last Respects', 'Hidden Power', 'Absolite', 'Sablenite'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CM', 'CM (NFE)'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Clubmons.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] CommunityUsed 2: Regional Dex",
		mod: 'communityused2',
		desc: `A micrometa that combines secret santa with Generation X.`,
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause', 'Z-Move Clause', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod'],
		teambuilderFormat: 'National Dex',
		banlist: ['Baton Pass'],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10093481">CU2 on Smogon Forums</a>`,
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CU2 OU', 'CU2 NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in CommunityUsed 2.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Conquest Dex",
		mod: 'conquestdex',
		desc: `A metagame based on the pokemon side game pokemon conquest`,
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause', 'Z-Move Clause', 'Mega Stone Clause'],
		banlist: ['Arceus', 'Dialga', 'Rayquaza', 'Zekrom', 'Reshiram', 'Mewtwo', 'Groudon'],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9883990">Conquest Dex on Smogon Forums</a>`,
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Conq'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Conquest Dex.'];
        }
      }
    },
	},
	{
		name: "[Gen 2] Crystal Legacy",
		mod: 'gen2crystallegacy',
		desc: `A Solomod centered around Crystal Legacy.`,
		ruleset: ['Standard', 'Data Mod', 'VGC Timer'],
	},
	{
		name: "[Gen 9] Dex Reversal",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "National Dex",
		mod: 'dexreversal',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause', 'Mega Data Mod', 'Data Mod', 'Terastal Clause', 'Z-Move Clause'],
		banlist: ['Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody', 'Smeargle', 'Shell Smash', 'Shadow Tag', 'Calyrex-Ice', 'Eternatus-Eternamax', 'Medichamite'],
	},
	{
		name: "[Gen 9] Do Not Use",
		desc: [
			"<b>Do Not Use</b>: A National Dex metagame where only Pokemon with 280 BST or less are allowed."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-do-not-use.3734326/">Do Not Use</a>`,
		],
		mod: 'donotuse',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		teambuilderFormat: 'National Dex',
		banlist: ['Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody', 'Cute Charm'],
		unbanlist: ['Assist'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DoNU', 'DoNU UUBL', 'DoNU UU', 'DoNU RUBL', 'DoNU RU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Do Not Use.'];
				}
			}
		},
	},
	/*{
		name: "[Gen 9] Do Not Use UU",
		desc: [
			"<b>Do Not Use</b>: A National Dex metagame where only Pokemon with 280 BST or less are allowed."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-do-not-use.3734326/">Do Not Use</a>`,
		],
		mod: 'donotuse',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Terastal Clause', 'Z-Move Clause'],
		teambuilderFormat: 'National Dex',
		banlist: ['Huge Power', 'Pure Power', 'Shadow Tag', 'Arena Trap', 'Baton Pass', 'Moody'],
		unbanlist: ['Assist'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DoNU UU', 'DoNU RUBL', 'DoNU RU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Do Not Use UU.'];
				}
			}
		},
	},*/
	{
		name: "[Gen 9] Do Not Use VGC",
		desc: [
			"<b>Do Not Use</b>: A National Dex VGC metagame where only Pokemon with 280 BST or less are allowed. Certain Pokemon have been added as restricteds."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-do-not-use.3734326/">Do Not Use</a>`,
		],
		mod: 'donotuse',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Terastal Clause', 'Z-Move Clause', 'Best of = 3', 'Limit One Restricted'],
		restricted: ['Cottonee', 'Dewpider', 'Diglett-Alola', 'Flittle', 'Gulpin', 'Nidoran-M', 'Wattrel', 'Wingull', 'Zigzagoon'],
		teambuilderFormat: 'National Dex',
		banlist: ['Huge Power', 'Pure Power', 'Smeargle', 'Wishiwashi', 'Goomy'],
		unbanlist: ['Assist'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['DoNU Uber', 'DoNU', 'DoNU UUBL', 'DoNU UU', 'DoNU RUBL', 'DoNU RU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Do Not Use VGC.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] DNU Randbats",
		desc: `<b>Do Not Use</b>: A National Dex metagame where only Pokemon with 280 BST or less are allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-do-not-use.3734326/">Do Not Use</a>`,
		],
		mod: 'donotuse',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Sleep Clause Mod', 'Terastal Clause', 'Cancel Mod'],
	},
	{
		name: "[Gen 9] Dream World Theorymons",
		desc: '<b>[Gen 8] Gen 9 Dream World Theorymons</b>: A testing ground for the Gen 9 OU Theorymons metagame.',
		mod: 'outheorymons',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass', 'Last Respects'],
	},
    {
 		name: "[Gen 9] Earth & Sky Horizons OU",
 		desc: `The metagame based on Pok&eacute;mon Earth & Sky, a set of theoretical games created by En Passant, with the Horizons Expansion for Gen 9.`,
 		threads: [
 			`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
 		],
 		mod: 'earthsky',
 		ruleset: [ 'Earth & Sky', 'Restricted Rules'],
 		banlist: [
 			'Alakazam-Mega', 'Arceus', 'Blaziken-Mega', 'Blastoise-Mega', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Darkrai',
 			'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',	'Dialga', 'Eternatus', 'Flutter Mane', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon',
 			'Ho-Oh', 'Kartana', 'Koraidon', 'Kyogre', 'Kyurem', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Miraidon',
 			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Robo Bundle',
 			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
 			'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Khatrophys', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stellar Tera Shard'
 		],
 	},
	 {
	 	name: "[Gen 9] Earth & Sky Horizons Triples",
	 	threads: [
	 		`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
	 	],
	 	mod: 'earthsky',
	 	gameType: 'triples',
	 	ruleset: [ 'Earth & Sky', 'Restricted Rules', 'Gravity Sleep Clause'],
	 	banlist: [
	 		'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
	 		'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Koraidon', 'Kyogre', 'Kyurem', 'Landorus-Base',
	 		'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Miraidon', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa',
	 		'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
	 		'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Khatrophys', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stellar Tera Shard'
	 	],
	 },
	 {
	 	name: "[Gen 9] Earth & Sky Horizons Dex",
	 	threads: [
	 		`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
	 	],
	 	mod: 'earthsky',
	 	ruleset: [ '[Gen 9] Earth & Sky Horizons OU', 'Horizons Pokedex',],
		banlist: [
			'Manaphy', 'Meloetta-Pirouette', 'Diancie-Mega', 'Melmetal', 'Enamorus-Base', 'Latias-Mega', 'Latios-Mega', 'Zygarde-Base', 'Hoopa-Unbound',
			'Spectrier', 'Roaring Moon', 'Valiant Droid', 'Terapagos-Terastal'],
	 },
	 {
	 	name: "[Gen 9] Earth & Sky Horizons Ubers",
	 	threads: [
	 		`&bullet; <a href="https:docs.google.com/spreadsheets/d/1zLXacuxUs05muhn3fTty_UW2ww3KSZCmnzdsUzVR-x8/edit?usp=sharing">Competitive Cheat Sheet</a>`,
	 	],
	 	mod: 'earthsky',
	 	ruleset: [ 'Earth & Sky',],
	 	banlist: ['Baton Pass'],
	 },
	 {
		name: "[Gen 8] Evolution Project",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise being given a test run. More details when we go public!`,
		],
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		banlist: [
			'Alakazam', 'Excadrill-Base', 'Exploud', 'Lycanroc-Dusk', 'Naganadel-Base', 'Reuniclus-Base', 'Scizor', 'Scolipede-Base', 'Starmie-Base', 'Polteageist-Base',
			'Polteageist-Antique', 'Volcarona', 'Aegislash-Base', 'Gyarados', 'Moody', 'Baton Pass'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)' && template.tier !== "Evo NFE!") {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
		},
		mod: 'evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 8] Evolution Project VGC",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise being given a test run. More details when we go public!`,
		],
		gameType: 'doubles',
		banlist: ['Aegislash-Base', 'Scizor'],
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', '+Unobtainable', '+Past', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)' && template.tier !== "Evo NFE!") {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
		mod: 'evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 9] Fakemon Kitchen",
		desc: `A Metagame consisting of Fakemon created in a Flash-CAP styled process, revolving around flavor first.`,
		threads: [
			`None`,
		],
		mod: 'kitchen',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
		unbanlist: ['Athleetah'],
	},
	{
		name: "[Gen 9] Forgottenmons",
		desc: `A National Dex metagame featuring only Pokemon not in Gen 9.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10106531">Forgottenmons in the Solomods Megathread</a>`,
		],
		mod: 'forgottenmons',
		teambuilderFormat: 'National Dex',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Stone Clause'],
		banlist: [
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Forgottenmons','Forgottenmons NFE','Forgottenmons LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Forgottenmons.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution Corrupt Council",
		mod: 'fecc',
		team: 'random',
		desc: `fecc`,
		ruleset: ['Data Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Z-Move Clause'],
	},
	{
		name: "[Gen 9] Fusion Evolution Dondozo",
		mod: 'dondozo',
		desc: `dondozo`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Z-Move Clause', /* 'Mega Data Mod' */],
		banlist: ['Shed Tail'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Dondozo','FEDD'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg A",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg A NFE', 'Reg A LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg A (Bo3)",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Best of = 3'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg A NFE', 'Reg A LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg B",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg A NFE', 'Reg A LC', 'Reg B LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg B (Bo3)",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Best of = 3'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg A NFE', 'Reg A LC', 'Reg B LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
    {
		name: "[Gen 3] Gen 3 Plus",
		mod: 'gen3plus',
		ruleset: ['Standard', 'Baton Pass Mod', 'One Boost Passer Clause', 'Freeze Clause Mod', 'Data Mod'],
		banlist: ['Uber', 'Sand Veil', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Smeargle + Ingrain', 'Drizzle', 'Drought', 'Soul Dew', 'Starf Berry', 'Speed Boost + Blaziken'],
	},
	{
		name: "[Gen 1] Glitch OU",
		mod: 'gen1glitch',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber', 'Agility + Wrap', 'Agility + Fire Spin', 'Agility + Bind', 'Agility + Clamp', 'Amnesia', 'Sleep Powder', 'Self-Destruct', 'Explosion'],
	},
	{
		name: "[Gen 2] GSC Doubles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9132049">Post in Solomods Megathread</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Uber'],
	},
    {
		name: "[Gen 3] Hoennification",
        mod: 'gen3hoennification',
		ruleset: ['Standard', 'One Boost Passer Clause', 'Freeze Clause Mod', 'Data Mod', 'Baton Pass Mod'],
		banlist: ['Uber', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Smeargle + Ingrain', 'Soul Dew', 'Starf Berry', 'Speed Boost + Blaziken'],
	},
	{
		name: "[Gen 9] i forgor OU",
		mod: 'iforgor',
		desc: `i forgor`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Mega Data Mod'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['IDK'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return ['you forgor ' + set.species + ' doesnt exist.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] i forgor Ubers",
		mod: 'iforgor',
		desc: `i forgor`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Mega Data Mod'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['EF', 'IDK'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return ['you forgor ' + set.species + ' doesnt exist.'];
				}
			}
		},
	},
	{
		name: "[Gen 1] JohtoMons",
		desc: '<b>[Gen 1] JohtoMons</b>: Adding the Johto mons to RBY',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
		],
		mod: 'gen1johtomons',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
		unbanlist: ['Aeroblast', 'Sacred Fire', 'Sketch', 'Present', 'Megahorn', 'Steel Wing', 'Milk Drink', 'Metal Claw', 'Spider Web', 'Hidden Power', 'Octazooka', 'Triple Kick', 'Vital Throw', 'Extreme Speed', 'Mach Punch', 'Outrage', 'Morning Sun',
			'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat', 'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic',
			'Natu', 'Xatu', 'Mareep', 'Flaaffy', 'Ampharos', 'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking',
			'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig', 'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle', 'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma', 'Magcargo', 'Swinub',
			'Piloswine', 'Corsola', 'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2', 'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank',
			'Blissey', 'Raikou', 'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar', 'Lugia', 'Ho-Oh', 'Celebi',
		],
    },
	{
		name: "[Gen 2] Johto Expansion Pak (Alpha) OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-6#post-9880873">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1t54hCQrMGj102ck9L7mW47GJxrHMmJy5Ygum6ldWVX0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen2expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 2] Johto Expansion Pak Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-6#post-9880873">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1t54hCQrMGj102ck9L7mW47GJxrHMmJy5Ygum6ldWVX0/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen2expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message'],
	},
	{
		name: "[Gen 1] Kanto Expansion Pak OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message', 'Allow Tradeback'],
		banlist: ['Uber'],
	},
		{
		name: "[Gen 1] Kanto Expansion Pak Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message', 'Allow Tradeback'],
	},
	{
		name: "[Gen 8] Kaen's Dex",
		mod: "kaensdex",
		ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Luvdisc', 'Hypno','Arbok','Shuckle','Woodite','Manteaf','Fasmiwood','Smice','Ratevil','Burstrat',		'Doplash','Makid','Merdolph','Princeguin',
			'Kinguin','Ekidna','Porcusquill','Mop','Mopper','Puppessum','Grimssum','Spiball','Scopiball','Navird','Peckbeard','Bask','Peayes','Weaworm',
			'Lilfly','Koafly','Puptwin','Duog','Bureep','Parllama','Debi','Deecrust','Pickynest','Vulcdor','Buroach','Bugler','Roamai','Rack','Mountse',
			'Lacorn','Antney','Hairpu','Sockorm','Kibaion','Kibasol','Gnodog','Dressog','Tigle','Biitora','Psyguana','Forguana','Timk','Dynabite','Positt',
			'Frogassin','Jaklove','Wospark','Ravesp','Cabbitt','Haresprout','Seerd','Evialden','Ostranch','Pasuragu','Grussgu','Orvenom','Nerdium','Smartish',
			'Higarden','Unimount','Birnal','Yeagle','Flysh','Seaplane','Airpier','Likaba','Sucabra','Mousse','Donter','Melops','Harvetops','Pentamelop',
			'Scarferret','Lovefume','Smolle','Molvel','Toxtaur','Venotauro','Helmdillo','Rescurer','Crimske','Snagant','Zhulong','Yufo','Spavader','Grichick',
			'Grileo','Sbusho','Pangearth','Ankylonite','Champkylo','Slomoss','Milomoss','Rampeck','Terroccer','Tifrost','Smilofrost','Vizcachu','Paramer',
			'Toolsaur','Neuro','Brancell','Freezegon','Snoak','Coldrake','Capowt','Capoedar','Warcon','Istrebitel','Voltcro','Wirechomp','Thungator',
			'Scalpick','Roostlax','Eagatrice','Theri','Theriscyno','Ghoca','Moclaw','Jawlusk','Tumbna','Plesioskul','Laveel','Thermaque','Thermandril',
			'Tamantula','Spideth','Abomigo','Chillma','Wintber','Evergrowl','Stontler','Balatone','Coayena','Pherosmoke','Octovase','Cthulhurn','Shahood',
			'Karakasa','Grag','Kimokus','Toknight','Cowpy','Cowork','Barbecow','Hoorel','Baishark','Luviu','Shucklony','Dreamer','Nohtyp']
	},
// start: Ma'adowr
{
		name: "[Gen 9] Ma'adowr Singles",
		desc: 'Solomod mainly based on Ancient Egypt and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fE71uVoWpYSGSncowLJ6yc9gzfUdYYj9khn23r7gCtM/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Terastal Clause'],
		banlist: ['Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Quick Claw', 'Baton Pass', 'Espathra', 'Gengarite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Sablenite', 'Chantyrus Engraving', 'Frustration', 'Hail', 'Hidden Power', 'Last Respects', 'Magic Powder', 'Pursuit', 'Return'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MD', 'MD NFE', 'EXP'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Maadowr.'];
				}
			}
		},
		/*onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		}, */
		mod: 'maadowr',
	},
	{
		name: "[Gen 9] Ma'adowr VGC",
		desc: 'Solomod mainly based on Ancient Egypt and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fE71uVoWpYSGSncowLJ6yc9gzfUdYYj9khn23r7gCtM/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: ['Frustration', 'Hail', 'Hidden Power', 'Magic Powder', 'Pursuit', 'Return'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MD', 'MD NFE', 'EXP'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Maadowr.'];
				}
			}
		},
		/*onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		}, */
		mod: 'maadowr',
	},
	{
		name: "[Gen 9] Ma'adowr VGC Restricted",
		desc: 'Solomod mainly based on Ancient Egypt and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1fE71uVoWpYSGSncowLJ6yc9gzfUdYYj9khn23r7gCtM/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod', 'Limit Two Restricted'],
		banlist: ['Frustration', 'Hail', 'Hidden Power', 'Magic Powder', 'Pursuit', 'Return'],
		restricted: ['Restricted Legendary'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['MD', 'MD NFE', 'MD Ubers', 'EXP', 'EXP2'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Maadowr.'];
				}
			}
		},
		mod: 'maadowr',
	},
	// start: Lost Zone
	{
		name: "[Gen 9] Ma'adowr VGC Lost Zone",
		desc: 'Solomod mainly based on cryptids, myths, and spiritualism and run by BlueRay',
		threads: [
								`&bullet; <a href="https://docs.google.com/spreadsheets/d/1oGLi8VC1af6SDyTwUNwoIFN0z868v477pXkIaVRDdDE/edit?gid=168383836#gid=168383836">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Data Mod', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'Mega Data Mod'],
		banlist: ['Frustration', 'Hail', 'Hidden Power', 'Magic Powder', 'Pursuit', 'Return'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['LZ', 'LZ NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Lost Zone.'];
				}
			}
		},
		mod: 'maadowrlostzone',
	},
	// end: Ma'adowr
	{
		name: "[Gen 9] Mega Mania",
		mod: "megamania",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod'],
		banlist: ['ND Uber', 'ND AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Kings Rock', 'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Monster Hunter AG",
		threads: [],
		mod: 'monsterhunter',
		ruleset: ['Standard', 'Data Mod'],
		banlist: [],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MOU', 'MEGAOU', 'MEGAAG'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Monster Hunter AG.'];
				}
			}
		},
	 },
	 {
		name: "[Gen 9] Monster Hunter OU",
		threads: [],
		mod: 'monsterhunter',
		ruleset: ['Standard', 'Data Mod'],
		banlist: [
			'Narwanite', 'Astalite', 'Bazelnite', 'Magnamalite', 'Malzenite',
			'Mizutsunite', 'Rajanite', 'Rathalosite', 'Rathianite', 'Valstraxite', 'Zinogrite'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['MOU', 'MEGAOU', 'MEGAAG'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Monster Hunter OU.'];
				}
			}
		},
	},
	{
		name: "[Gen 1] Moonside",
		desc: `<b>[Gen 1] Moonside</b>: Welcome to the otherside of RBY.`,
		threads: [
			 `&bullet; Fuzzy Pickles!`,
		],
		mod: 'gen1moonside',
		ruleset: ['Data Mod'],
		banlist: [],
		unbanlist: ['Mewtwo', 'Mew'],
  },
	{
		name: "[Gen 9] Patratdex",
		desc: `<b>Patratdex</b>: Galvantic's Solomod, containing a new regional dex with a bunch of new stuff, notably 151 Fakemon.`,
		mod: 'patratdex',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Realmon Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 9] Ponymon",
		mod: 'ponymonshowdown',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: ['ND Uber', 'ND AG'],
		unbanlist: ['Annihilape', 'Baxcalibur', 'Dragapult', 'Genesect', 'Gholdengo', 'Gouging Fire', 'Kingambit', 'Melmetal', 'Regieleki', 'Roaring Moon', 'Shedinja', 'Spectrier', 'Terapagos', 'Ursaluna-Bloodmoon', 'Walking Wake'],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] Ponymon Ubers",
		mod: 'ponymonshowdown',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'OU Terastal Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: ['ND AG'],
		unbanlist: ['Koraidon', 'Miraidon', 'Shedinja', 'Xerneas'],
		teambuilderFormat: 'National Dex Ubers',
	},
	{
		name: "[Gen 9] National Dex Strongest State",
		threads: [
		],

		mod: 'gen9strong',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause'/*, 'Para Moves Clause'*/],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass',
				'Blizzard', 'Explosion', 'Self-Destruct', 'Drizzle', 'Drought', 'Sand Stream', 'Aguav Berry', 'Figy Berry', 'Iapapa Berry', 'Mago Berry', 'Soul Dew', 'Wiki Berry', 'Last Respects',
		],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 9] National Dex Strongest State Ubers",
		threads: [
		],

		mod: 'gen9strong',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause'],
		banlist: ['AG', 'Baton Pass', 'Blizzard', 'Moody'],
		teambuilderFormat: 'National Dex Uber',
	},
	{
		name: "[Gen 9] Patratdex Doubles",
		desc: `<b>Patratdex</b>: Galvantic's Solomod, containing a new regional dex with a bunch of new stuff, notably 151 Fakemon.`,
		mod: 'patratdex',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Realmon Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 9] PokeMorty",
		desc: `<b>PokeMorty</b>: A Gen 9 Mod made by SDM_0 heavily inspired by the video-game "Pocket Morty".`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9880923">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1NwWodcuBmT4fFpgK0PNlr9MslCWm97J3_2YrYP6OZVQ/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'pokemorty',
		ruleset: ['Standard', 'Max Team Size = 5', '!Obtainable Abilities', 'Terastal Clause', '-All Items', 'Data Mod'],
		banlist: ['Implode', 'Negative Space', 'Time Dilation', 'Grill Season', 'Use The Light',
		'Unspoken Bond', 'Bird Lover', 'Apex Genius', 'Training Complete', 'Abstracted Form',
		'Higher Education', 'Cell Division', 'Infiltrate', 'Mirror Image', 'Fast Charging',
		'Death Crystal', 'Magic Door', 'Strip Dance', 'Squid Costume', 'Cut the Chut', 'Bold And Daring',
		'Attention', 'Wedgie-Proof', 'Anthocyanin', 'Grade A', 'Always Fresh', 'Present Portal', 'Impersonate',
		'Flavor Combo', 'Apology Video', 'Espionage', 'Entitlement', 'Hypnotize', 'Mouth Off', 'Doze',
		'Traumatize', 'Mind-Numbing Hello', 'Love Bug', 'Stare Down'],
		onValidateTeam(team) {
			let speciesTable = {};
			let allowedTiers = ['PM OU', 'PM NFE', 'PM LC'];
			let problems = [];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					problems.push(`${set.species} is not a Morty.`);
				}
				if (this.dex.abilities.get(set.ability).id !== "noability") {
					problems.push(`${set.species} can't have ${set.ability}.`);
				}
				if (!['bashful', 'docile', 'hardy', 'quirky', 'serious', ''].includes(this.toID(set.nature))) {
					problems.push(`${set.species} can't have a non-neutral nature.`);
				}
			}
			return problems;
		},
	},
	{
		name: "[Gen 1] RBY Recolored",
		threads: [
      	`&bullet; <a href="https://docs.google.com/document/d/1KqmnxRzM_v8FOWBM98axtIwA-LWeFEs1CUu2NFIdXwY/edit?usp=sharing">Document</a>`,
		],
		mod: 'gen1recolored',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 9] Rock Bottom",
		desc: [
			"<b>Rock Bottom</b>: A micrometa with an extremely low powerlevel and typically common strong tools being thinly distributed.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10151175">Post in the Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1BySngRBKJhUiq0-hynrDp2HVNqzWjL-8RaL8mQIyCqA/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'rockbottom',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['RB'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Gen 9] Rock Bottom.'];
				}
			}
		},
	},
	/*{
		name: "[Gen 8] Roulettemons The Solomod",
		desc: `<b>Roulettemons The Solomod</b>: literally roulettemons but a solomod + clean slate micro`,
		mod: 'roulettemonsthesolomod',
		ruleset: ['Standard NatDex', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: [
			'Spinmadillo', 'Coyoctric', 'Spizelle', 'Fierhog', 'Elatuff', 'Glasyte', 'Bisong', 'Megalo', 'Oysteat', 'Ponymph', 'Hypepion', 'Chickola', 'Skelehawk', 'Catetar', 'Blastquito', 'Hawkward', 'Pandaid', 'Autoad', 'Skelephin', 'Doomossum', 'Llamagic', 'Venoroach', 'Salamados', 'Steelboon', 'Jaguaplume',
		],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},*/
	{
		name: "[Gen 3] Sample Team Randbats",
		team: 'random',
		mod: 'gen3sampleteamrandbats',
		ruleset: ['Standard', 'One Boost Passer Clause', 'Freeze Clause Mod'],
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				var side = pokemon.side;
				this.hint(side.team[0].sampleTeamName, true, pokemon.side);
			}
		},
	},
	{
		name: "[Gen 9] Scootopia",
		desc: "A solomod consisting of Scoopapa's first 30 sprited fakemons!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "scootopia",
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Data Mod', 'Super Type Moves Rule',],
		banlist: ['All Pokemon', 'Crystal Heart', 'Wild Heart', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Double Team', 'Snow Cloak', 'Sand Veil'],
		unbanlist: ["Arbrella", "Krachiten", "Scalaron", "Rantler", "Woolora", "Albatrygon", "Orchile",
		"Embuck", "Cindoe", "Cobracotta", "Minillow", "Crossont", "Torgeist", "Platypad", "Lumoth",
		"Aurorowl", "Carapex", "Dojodo", "Nunopod", "Zeploom", "Brawnkey", "Salamalix", "Cinnastar",
		"MuabBoa", "Volvolpa", "Harzodia", "Cyllindrake", "Kodokai", "Electangle", "Dolphena", "Soleron",
		"Soleron-Awakened", "Jaegorm", "Jaegorm-Collective", "Elemadillo", "Axolacred", "Roscenti",
		"Blunderbusk", "Barracoth", "Jamborai", "Dracoil", "Celespirit", "Noxtrice", "Avastar",
		"Faerenheit", "Cellsius", "Kelven", "Salaos", "Morndos", "Pythos", "Corundell", "Quadringo",
		"Saphor", "Fenreil", "Efflor", "Flocura", "Flocura-Nexus"],
	},
	{
		name: "[Gen 9] Scootopia Ubers",
		desc: "A test meta for proposed changes to the hit solomod Scootopia!",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/scootopia.3742131/post-10103602">Thread</a>`,
		],
		mod: "scootopiatest",
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Data Mod', 'Super Type Moves Rule', 'Super Type Clause'],
		banlist: ['All Pokemon', 'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Double Team', 
					'Snow Cloak', 'Sand Veil'],
		unbanlist: ["Arbrella-North", "Krachiten", "Scalaron", "Rantler", "Woolora", "Albatrygon", "Sturgard", "Enkappa",
					"Embuck", "Cindoe", "Cobracotta", "Minillow", "Crossont", "Torgeist", "Barbolt", "Lunacal",
					"Eleqwil", "Duratreme", "Dojodo", "Nunopod", "Zeploom", "Velocipasta", "Crolegion", "Cinnastar",
					"Coraking", "Volvolpa", "Harzodia", "Cyllindrake", "Alliglacier", "Electangle", "Pyrove", "Soleron",
					"Soleron-Awakened", "Zephyrmine", "Boreasel", "Elemadillo", "Axolacred", "Skawamud", "Kasappa",
					"Noxon", "Xiphoil", "Jamborai", "Dracoil", "Celespirit", "Noxtrice", "Avastar", "Himalao",
					"Zygola", "Cyrome", "Cyrome-Book", "Stone Husk", "Corundell", "Quadringo",
					"Saphor", "Fenreil", "Efflor", "Flocura", "Flocura-Nexus"],
	},
	{
        name: "[Gen 9] Spookymod",
        desc: [
            "jumpscaare",
        ],
        threads: [
            `&bullet; <a href="https://www.youtube.com/shorts/bbZCltuyZlM">Spookymod on Smogon Forums</a>`,
              ],
        ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Spokymod'],
        banlist: [],
		teambuilderFormat: "National Dex",
        onValidateTeam(team, format) {
            /**@type {{[k: string]: true}} */
            let speciesTable = {};
            let f = false;
            let ff = false;
            for (const set of team) {
                if (set.species === 'Flutter Mane') f = true;
                else if (set.species === 'Flutter Mane 2') ff = true;
                if(f && ff) return ['Did you think you could bring two Flutter Manes to a game? Are you stupid?'];
                let template = this.dex.species.get(set.species);
                if (template.tier !== 'SM') {
                    return [set.species + ' is not usable in Spookymod.'];
                }
            }
        },
        mod: 'spookymod',
    },
	{
		name: "[Gen 9] Stadium YB 3v3 Random Battle",
		desc: [
			"<b>Stadium YB</b>: A randomized metagame where each player is given a set of rental Pokemon to battle with."
		],
		threads: [
			`&bullet; <a href="placeholder">Stadium YB in the Solomods Megathread</a>`,
		],
		mod: 'stadiumyb',
		team: 'random',
		bestOfDefault: true,
		ruleset: [
			'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview',
			'Species Clause', 'Dynamax Clause', 'Exact HP Mod', 'Force Open Team Sheets', 'Picked Team Size = 3', 'Max Team Size = 6',
		],
		onSwitchIn(pokemon) {
			const speed = pokemon.getStat('spe', false, true);
			this.add('-message', `${pokemon.name}'s Speed stat is ${speed}!`);
		},
	},
	{
		name: "[Gen 9] Stadium YB 6v6 Random Battle",
		desc: [
			"<b>Stadium YB</b>: A randomized metagame where each player is given a set of rental Pokemon to battle with."
		],
		threads: [
			`&bullet; <a href="placeholder">Stadium YB in the Solomods Megathread</a>`,
		],
		mod: 'stadiumyb',
		team: 'random',
		bestOfDefault: true,
		ruleset: [
			'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview',
			'Species Clause', 'Dynamax Clause', 'Exact HP Mod', 'Force Open Team Sheets', 'Picked Team Size = 6', 'Max Team Size = 12',
		],
		onSwitchIn(pokemon) {
			const speed = pokemon.getStat('spe', false, true);
			this.add('-message', `${pokemon.name}'s Speed stat is ${speed}!`);
		},
	},
	// {
		// name: "[Gen 9] Super Types OU",
		// desc: "The Super Type mechanic from Scootopia, only it's applied to current gen 9 OU.",
		// threads: [
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit#gid=1291687635">Types + Moves Explained</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit#gid=894228879">List of Defensive Type Combos</a>`,
		// ],
		// mod: "supertypesou",
		// ruleset: ['Standard NatDex', 'Z-Move Clause', 'Data Mod'],
	// },
	{
		name: "[Gen 2] Tera Crystal",
		desc: ["<b>Tera Crystal</b>- A Gen 2 solomod where the Gen 9 mechanic of Terastallization is added to the game."],
		mod: 'gen2teracrystal',
		ruleset: ['Standard', 'Data Mod', 'Can Terastal'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 9] The 3-3-1 Typechart",
		desc: [
			"<b>The 3-3-1 Typechart</b>: A solomod that gives every type 3 weaknesses, 3 resistances, and 1 immunity.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9403413">Post in the Solomods Megathread</a>`,
		],

		mod: 'the331typechartg9',
		teambuilderFormat: 'National Dex',
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
			'Slowking-Base', 'Slowbro-Base'
		],
		onBegin() {
			this.add('-message', `Be sure to use /weak to find out everything's new type interactions!`);
		},
	},
	{
		name: "[Gen 9] Touhoumons",
		desc: `2hu`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'toho',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [],
		unbanlist: [],
		teambuilderFormat: 'National Dex',
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'Cirno' || set.species === 'Cirno-Tanned') {
				if (item === 'summerbackdoor') {
					set.species = 'Cirno-Tanned';
					set.ability = 'Drought';
					let moonblast = set.moves.indexOf('moonblast');
					if (moonblast >= 0) {
						set.moves[moonblast] = 'solarbeam';
					}
					let playrough = set.moves.indexOf('playrough');
					if (playrough >= 0) {
						set.moves[playrough] = 'powerwhip';
					}
					let chillingwater = set.moves.indexOf('chillingwater');
					if (chillingwater >= 0) {
						set.moves[chillingwater] = 'trailblaze';
					}
					let waterpledge = set.moves.indexOf('waterpledge');
					if (waterpledge >= 0) {
						set.moves[waterpledge] = 'grasspledge';
					}
				} else {
					set.species = 'Cirno';
				}
			}
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				if (set.species == 'Cirno-Tanned' && set.ability !== 'Drought')
					 return ["Cirno-Tanned can only have Drought as its ability."]
				if ((set.species !== 'Cirno-Tanned' && set.species !== 'Cirno') && set.ability === 'Drought')
					 return ["Only Cirno-Tanned can have Drought as its ability."]
			}
		},
	},
	{
		name: "[Gen 1] Tradebacks Expanded",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9881531">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1F-e0PZF2LpVBS3yBzO-pCU6XPX1RfmoEucrhNgTco5Y/edit#gid=0">Spreadsheet</a>`,
		],
		mod: 'gen1tradebacksexpanded',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Violet Version G1",
		desc: "Violet Version G1 Rainbow Edition is a balance mod focused on bringing wonderful new feelings and colors to RBY competitive play.",
		mod: "gen1violetversion",
		gen: 1,
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['All Pokemon'],
		unbanlist: ['Aerodactyl', 'Alakazam', 'Arbok', 'Articuno', 'Beedrill', 'Blastoise', 'Butterfree', 'Chansey', 'Charizard', 'Cloyster', 'Dragonite', 'Dugtrio', 'Electabuzz', 'Electrode', 'Exeggutor', 'Flareon', 'Gengar', 'Golbat', 'Golduck', 'Golem', 'Gyarados', 'Hypno', 'Jynx', 'Kabutops', 'Machamp', 'Magmar', 'Magneton', 'Mew', 'Moltres', 'Muk', 'Nidoqueen', 'Ninetales', 'Parasect', 'Pidgeot', 'Pinsir', 'Poliwrath', 'Porygon', 'Slowbro', 'Snorlax', 'Starmie', 'Tangela', 'Tauros', 'Vileplume', 'Zapdos'],
	},
	{
		name: "[Gen 8] Weedmons",
		desc: `Weedmons is a SoloMod originally led by The Reptile, whose purpose is primarily to make a fun micrometa based on the	completely arbitrary limitations of the theme of Weed!.`,
		mod: 'weedmons',
		gen: 9,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Species Clause', 'Sleep Clause Mod', 'Dynamax Clause'],
		banlist: ['All Pokemon', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'item: Quick Claw' /*Wtf is this validator on? What ability?*/, 'Razor Fang',
		'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Altarianite', 'Charizardite X', 'Charizardite Y', 'Blazikenite',],
		unbanlist: ['Altaria', 'Azumarill', 'Azurill', 'Blaziken', 'Braixen', 'Brionne', 'Blitzle', 'Bouffalant', 'Castform', 'Centiskorch', 'Charizard', 'Charmander', 'Charmeleon', 'Cherubi',
		'Chimchar', 'Cinderace', 'Combusken', 'Crocalor', 'Cyndaquil', 'Dartrix', 'Deerling', 'Delphox', 'Dragonair', 'Drampa', 'Drizzile', 'Emboar', 'Farigiraf', 'Fennekin', 'Fuecoco', 'Girafarig',
		'Gogoat', 'Golduck', 'Goodra', 'Goodra-Hisui', 'Goomy', 'Hakamo-O', 'Heatmor', 'Incineroar', 'Infernape', 'Lickilicky', 'Lickitung', 'Linoone', 'Linoone-Galar', 'Litten', 'Marill', 'Metang',
		'Mightyena', 'Miltank', 'Monferno', 'Oddish', 'Pansear', 'Pignite', 'Poipole', 'Psyduck', 'Quilava', 'Raboot', 'Sawsbuck', 'Scorbunny', 'Shelgon', 'Simisear', 'Sizzlipede', 'Skeledirge',
		'Skiddo', 'Sliggoo', 'Sliggoo-Hisui', 'Stantler', 'Swablu', 'Tepig', 'Thwackey', 'Torchic', 'Torkoal', 'Torracat', 'Typhlosion', 'Typhlosion-Hisui', 'Watchog', 'Wyrdeer', 'Zebstrika', 'Zweilous',
		],
	},/*
		{
		name: "[Gen 4] Yayamons",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/>Post in Solomods Megathread</a>`,
		],
// placeholder link
		mod: 'yayamons',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Uber'],
	},*/
	///////////////////////////////////////////////////////////////
	///////////////////// Non-Smogon Mods /////////////////////////
	///////////////////////////////////////////////////////////////
	// {
		// section: "Non-Smogon Mods",
		// column: 2,
	// },

	///////////////////////////////////////////////////////////////
	//////////////////////// Randbats /////////////////////////////
	///////////////////////////////////////////////////////////////
	// {
		// section: "Randbats",
		// column: 2,
	// },
	// {
        // name: "[Gen 9] Duomod Randbats",
        // desc: `<b>gen 9 duomod back and better than ever baybeeeeee</b>`,
        // threads: [
            // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1VZp8emRachS_ieusnF8FWKFqTcOUjrVyr393J-J17pY/edit?usp=sharing">Spreadsheet</a>`,
        // ],
        // team: 'random',
        // mod: 'gen9duomod',
        // ruleset: ['Standard NatDex', 'Subscribe For More Content', 'Duomod Data Mod'],
        // onSwitchIn(pokemon) {
            // this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        // },
    // },
	// {
		// name: "[Gen 8] Duomod Randbats",
		// desc: `<b>Duomod</b>: Legendary YouTuber and professional Smash player DuoM2's solomod, build around the idea where nobody is ever truly losing.`,
        // threads: [
            // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        // ],
		// team: 'random',
		// mod: 'duomod',
		// ruleset: ['Standard NatDex', 'Subscribe For More Content', 'Duomod Data Mod'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
	// },
	// {
		// name: "[Gen 8] Fusion Evolution UU Random Battle",
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Fusion Evolution Under Used on Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1zFk1_DBIoXFFn_7JpvYbVBrW-f1oFFh80Wn0CJNnbVo/edit#gid=0">Spreadsheet</a>`,
		// ],
		// mod: 'feuu',
		// team: 'random',
		// ruleset: ['OHKO Clause', 'Obtainable', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Cancel Mod'],
	// },
	// {
		// name: "[Gen 1] FutureProofing Random Battle",
	   // desc: `<b>[Gen 1] FutureProofing</b>: Adapting Dark, Steel, and Fairy-type moves and Pokemon to the Gen 1 OU metagame.`,
	   // threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
	   // ],
		// mod: 'gen1futureproofing',
		// team: 'random',
		// ruleset: ['Standard', 'Data Mod'],
	// },
	// {
		// name: "[Gen 8] JolteMons Random Battle",
		// desc: [
			// "<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		// ],
		// mod: 'joltemons',
		// team: 'random',
		// ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Data Mod', 'Z-Move Clause'],
	// },
	// {
// name: "[Gen 1] Modern Gen 1 Randbats",
		// desc: [
			// "<b>Modern Gen 1</b>: Gen 1 with all Pokemon and moves from Gen 9 Natdex added.",
		// ],
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Thread on the Smogon Forums</a>`,
		// ],
		// mod: 'moderngen1',
		// team: 'random',
		// ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod'],
	// },
	// {
		// name: "[Gen 8] Roulettemons Random",
		// threads: [
			// `&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		// ],
		// team: 'random',
		// mod: 'roulettemons',
		// ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
		// onChangeSet(set) {
			// if (set.species === 'Chillyte-Mega') {
				// set.species = 'Chillyte';
				// set.ability = 'Grassy Surge';
			// }
		// },
	// },
	// {
      // name: "[Gen 8] OU Theorymons Random Battle",
      // threads: [
          // `&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymons on Smogon Forums</a>`,
          // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1AgqKo8IiXky8apuu0FUgx4MJRVtsVwtuhg_Wj_ACgao/edit#gid=0">Spreadsheet</a>`,
      // ],
      // team: 'random',
		// mod: 'outheorymons',
		// ruleset: ['Dynamax Clause', 'Data Mod', 'Species Clause'],
	// },
	// {
		// name: "[Gen 8] Roulettemons Random Doubles",
		// threads: [
		   // `&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			// `&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		// ],
		// team: 'random',
		// gameType: 'doubles',
		// mod: 'roulettemons',
		// ruleset: ['Standard NatDex', 'Sleep Clause Mod'],
		// onSwitchIn(pokemon) {
			// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		// },
		// onChangeSet(set) {
			// if (set.species === 'Chillyte-Mega') {
				// set.species = 'Chillyte';
			// }
		// },
	// },
	///////////////////////////////////////////////////////////////
	/////////////// Pet Mods Bonus Formats //////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Pet Mods Bonus Formats",
		column: 3,
		// name: "petmodsbonusformats",
	},
	{
		name: "[Gen 3] Hoenn Gaiden UU",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-pet-mod-of-the-season.3714737/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3uuhoenngaiden',
		ruleset: ['Standard', 'Data Mod', 'Freeze Clause Mod'],
		banlist: [
				'Uber', 'OU', 'UUBL', 'Snow Warning', 'Air Balloon',
				'Babiri Berry', 'Charti Berry', 'Chilan Berry', 'Chople Berry', 'Coba Berry', 'Colbur Berry',
				'Haban Berry', 'Kasib Berry', 'Kebia Berry', 'Occa Berry', 'Passho Berry', 'Payapa Berry',
				'Rindo Berry', 'Roseli Berry', 'Shuca Berry', 'Tanga Berry', 'Wacan Berry', 'Yache Berry',
		],
		unbanlist: [],
	},
	{
		name: "[Gen 8] JolteMons Random Battle",
		desc: `Pok&eacute;mon, items, abilities, and moves are redesigned for OU, and new items, abilities, and moves are added, all without changing base stats.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694234/">JolteMons</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'joltemons',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Z-Move Clause'],
	},
	{
		name: "[Gen 9] M4A OU NatDex",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Plays like National Dex, just with more Megas.",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'Terastal Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		// ruleset: ['Standard NatDex', 'Standard M4A', 'Mega Data Mod', 'Terastal Clause'],
		mod: 'm4ag9',
		banlist: ['Slowking-Galar-Mega', 'Slowking-Galar + Slowkinite', 'Uber', 'AG', 'Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody',
			'Arena Trap', 'Power Construct', 'Shadow Tag', 'Snow Cloak', 'Sand Veil'
		],
		// teambuilderFormat: 'OU',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Mega of the Day!', 'Popular', 'Popular Megas', 'Other Megas', 'Heat!', 'NFE'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in M4A OU NatDex.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] MetaMons Expanded",
		desc: [
			"In this Pet Mod, we will aim to create a decently-sized micrometa that will expand in the unique niches of some Pokémon, giving them the spotlight after all the time they have been waiting.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/metamons-slate-3-galarian-slowbro-sableye-grapploct.3703361/">MetaMons</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/142lxuFtTgQCY56Wz_ZjAGaqlk7HgJj0CVKMChQcei1U/edit#gid=0">Spreadsheet</a>',
		],
		mod: 'metamons',
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Terastal Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Beedrillite'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'MetaMons' && template.tier !== 'Gen 8 MetaMons' && template.tier !== 'Gen 7 MetaMons') {
					return [set.species + ' is not usable in MetaMons Expanded.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] Mix and Megas Revisited",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713949/">Megas Revisited on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen6mixandmegasrevisited',
		ruleset: ['Standard', 'Swagger Clause', 'Mega Data Mod'],
		banlist: [
			'Medichamite', 'Glalitite', 'Altarianite', 'Mawilite',
		],
		restricted: [
			'Arceus', 'Cresselia', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Normal', 'Deoxys-Speed', 'Dialga', 'Dragonite', 'Genesect',
			'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Manaphy', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Regigigas', 'Reshiram', 'Shaymin-Sky', 'Slaking', 'Xerneas', 'Yveltal', 'Zekrom',
		],
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (!item.megaStone && !item.onPrimal &&
					!item.forcedForme?.endsWith('Origin') && !item.name.startsWith('Rusted')) continue;
				const natdex = this.ruleTable.has('standardnatdex');
				if (natdex && item.id !== 'ultranecroziumz') continue;
				const species = this.dex.species.get(set.species);
				if (species.isNonstandard && !this.ruleTable.has(`+pokemontag:${this.toID(species.isNonstandard)}`)) {
					return [`${species.baseSpecies} does not exist in gen 9.`];
				}
				if ((item.itemUser?.includes(species.name) && !item.megaStone && !item.onPrimal) ||
					(natdex && species.name.startsWith('Necrozma-') && item.id === 'ultranecroziumz')) {
					continue;
				}
				if (this.ruleTable.isRestrictedSpecies(species) || this.toID(set.ability) === 'powerconstruct') {
					return [`${species.name} is not allowed to hold ${item.name}.`];
				}
				if (itemTable.has(item.id)) {
					return [
						`You are limited to one of each mega stone/orb/rusted item/sinnoh item.`,
						`(You have more than one ${item.name})`,
					];
				}
				itemTable.add(item.id);
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.baseSpecies.name;
			}
		},
		onSwitchIn(pokemon) {
			// @ts-ignore
			const originalFormeSpecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (originalFormeSpecies.exists && pokemon.m.originalSpecies !== originalFormeSpecies.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, originalFormeSpecies.requiredItem || originalFormeSpecies.requiredMove, '[silent]');
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}
		},
		// Starting innate abilities in scripts#actions
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-end', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
	},
	/*{
		name: "[Gen 9] Ubermons Sample Randbats",
		team: 'random',
		mod: 'gen9ubermons',
		ruleset: ['Standard NatDex', 'Terastal Clause'],
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				var side = pokemon.side;
				this.hint(side.team[0].sampleTeamName, true, pokemon.side);
			}
		},
	},*/
	{
		name: "[Gen 9] VaporeMons UU",
		desc: [
			"<b>VaporeMons</b>: The third mod in the SylveMons series where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/vaporemons-slate-1-discussion-phase.3722917/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1_5AwZ24dPu3-5m5yOyIO4OTPmW9OwIWXXzZ5IJZkj4c/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen9vaporemons',
		teambuilderFormat: 'UU',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['OU', 'UUBL', 'Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Light Clay', 'Dancing Shoes', 'Fling + Segin Star Shard', 'Damp Rock'],
	},

	///////////////////////////////////////////////////////////////
	/////////////// Gen 9 Offical Smogon Formats //////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "ROPMM Formats",
		column: 3,
		// name: "ropmmformats",
	},
	{
		name: "[Gen 9] Banhammers Pokebilities",
		desc: `Pok&eacute;mon have all of their released abilities simultaneously.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712725/">Pok&eacute;bilities</a>`,
		],
		mod: 'pokebilitiesbanhammers',
		// searchShow: false,
		ruleset: ['Standard OMs', 'Sleep Moves Clause'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass',
			'Last Respects', 'Shed Tail', 'Barraskewda', 'Cinderace', 'Clodsire', 'Dragapult', 'Enamorus-Base', 'Gholdengo', 'Gliscor', 'Hatterene',
			'Iron Treads', 'Kingambit', 'Ogerpon-Wellspring', 'Pelipper', 'Rillaboom', 'Walking Wake', 'Zamazenta', 'Earth Power', 'Flip Turn',
			'Freeze-Dry', 'Ice Beam', 'Knock Off', 'Spikes', 'Taunt', 'Thunder Wave', 'Toxic', 'Volt Switch', 'Booster Energy', 'Light Clay',
			'Protosynthesis', 'Clefable', 'Corviknight', 'Darkrai', 'Dragonite', 'Maushold', 'Primarina', 'Samurott-Hisui', 'Slowking-Galar',
			'Weavile', 'Focus Blast', 'Glare', 'Sticky Web', 'Unaware', 'Quark Drive', 'Blissey', 'Ceruledge', 'Chansey', 'Garchomp', 'Garganacl',
			'Glimmora', 'Hydreigon', 'Ogerpon-Cornerstone', 'Ting-Lu', 'Close Combat', 'Dragon Dance', 'Meteor Beam', 'Roost', 'Scale Shot', 'Stealth Rock',
			'Tera Blast', 'Heavy-Duty-Boots', 'Chlorophyll', 'Swift Swim', 'Regenerator', 'Draco Meteor', 'Intimidate', 'Levitate',
			'Focus Sash', 'Leftovers', 'Life Orb', 'Belly Drum', 'Calm Mind', 'Nasty Plot', 'Azumarill', 'Blaziken', 'Deoxys-Defense', 'Greninja',
			'Heatran', 'Kleavor', 'Kommo-o', 'Meowscarada', 'Moltres-Galar', 'Ninetales-Alola', 'Pecharunt', 'Politoed', 'Sinistcha', 'Skarmory',
			'Ursaluna', 'Zapdos-Base',
			
			//Pokébilities bans
			'Conkeldurr', 'Excadrill', 'Porygon-Z',
		],
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const unSeenAbilities = Object.keys(species.abilities)
				.filter(key => key !== 'S' && (key !== 'H' || !species.unreleasedHidden))
				.map(key => species.abilities[key as "0" | "1" | "H" | "S"])
				.filter(ability => ability !== set.ability);
			if (unSeenAbilities.length && this.toID(set.ability) !== this.toID(species.abilities['S'])) {
				for (const abilityName of unSeenAbilities) {
					const banReason = this.ruleTable.check('ability:' + this.toID(abilityName));
					if (banReason) {
						return [`${set.name}'s ability ${abilityName} is ${banReason}.`];
					}
				}
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.ability === this.toID(pokemon.species.abilities['S'])) {
					continue;
				}
				pokemon.m.innates = Object.keys(pokemon.species.abilities)
					.filter(key => key !== 'S' && (key !== 'H' || !pokemon.species.unreleasedHidden))
					.map(key => this.toID(pokemon.species.abilities[key as "0" | "1" | "H" | "S"]))
					.filter(ability => ability !== pokemon.ability);
			}
		},
		onBeforeSwitchIn(pokemon) {
			// Abilities that must be applied before both sides trigger onSwitchIn to correctly
			// handle switch-in ability-to-ability interactions, e.g. Intimidate counters
			const neededBeforeSwitchInIDs = [
				'clearbody', 'competitive', 'contrary', 'defiant', 'fullmetalbody', 'hypercutter', 'innerfocus',
				'mirrorarmor', 'oblivious', 'owntempo', 'rattled', 'scrappy', 'simple', 'whitesmoke',
			];
			if (pokemon.m.innates) {
				for (const innate of pokemon.m.innates) {
					if (!neededBeforeSwitchInIDs.includes(innate)) continue;
					if (pokemon.hasAbility(innate)) continue;
					pokemon.addVolatile("ability:" + innate, pokemon);
				}
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			if (pokemon.m.innates) {
				for (const innate of pokemon.m.innates) {
					if (pokemon.hasAbility(innate)) continue;
					pokemon.addVolatile("ability:" + innate, pokemon);
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				pokemon.removeVolatile(innate);
			}
		},
		onFaint(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				const innateEffect = this.dex.conditions.get(innate) as Effect;
				this.singleEvent('End', innateEffect, null, pokemon);
			}
		},
		onAfterMega(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				pokemon.removeVolatile(innate);
			}
			pokemon.m.innates = undefined;
		},
	},
	{
		name: "[Gen 9] Iron Fist Shared Power",
		desc: `Once a Pok&eacute;mon switches in, its ability is shared with the rest of the team.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711011/">Shared Power</a>`,
		],

		mod: 'sharedpowerironfist',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: ['Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody',
		'Buginium Z', 'Darkinium Z', 'Dragonium Z', 'Electrium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Normalium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Waterium Z'],
		restricted: [],
		onValidateRule() {
			if (this.format.gameType !== 'singles') {
				throw new Error(`Shared Power currently does not support ${this.format.gameType} battles.`);
			}
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['IF'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Iron Fist.'];
				}
			}
		},
		getSharedPower(pokemon) {
			const sharedPower = new Set<string>();
			for (const ally of pokemon.side.pokemon) {
				if (pokemon.battle.ruleTable.isRestricted(`ability:${ally.baseAbility}`)) continue;
				if (ally.previouslySwitchedIn > 0) {
					if (pokemon.battle.dex.currentMod !== 'sharedpower' && ['trace', 'mirrorarmor'].includes(ally.baseAbility)) {
						sharedPower.add('noability');
						continue;
					}
					sharedPower.add(ally.baseAbility);
				}
			}
			sharedPower.delete(pokemon.baseAbility);
			return sharedPower;
		},
		onBeforeSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9ironfistsharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				const effect = 'ability:' + ability;
				pokemon.volatiles[effect] = {id: this.toID(effect), target: pokemon};
				if (!pokemon.m.abils) pokemon.m.abils = [];
				if (!pokemon.m.abils.includes(effect)) pokemon.m.abils.push(effect);
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9ironfistsharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				if (ability === 'noability') {
					this.hint(`Mirror Armor and Trace break in Shared Power formats that don't use Shared Power as a base, so they get removed from non-base users.`);
				}
				const effect = 'ability:' + ability;
				delete pokemon.volatiles[effect];
				pokemon.addVolatile(effect);
			}
		},
	},
	{
		name: "[Gen 9] Balls Mix and Mega",
		desc: `Mega evolve any Pok&eacute;mon with any mega stone, or transform them with Primal orbs, Origin orbs, and Rusted items with no limit. Mega and Primal boosts based on form changes from gen 7.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710921/">Mix and Mega</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3716385/">Mix and Mega Resources</a>`,
		],

		mod: 'mixandmegaballs',
		ruleset: ['Standard OMs', 'Evasion Items Clause', 'Evasion Abilities Clause', 'Sleep Moves Clause', 'Terastal Clause'],
		banlist: [
			'Moody', 'Rusted Sword', 'Shadow Tag', 'Beedrillite', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Pidgeotite', 'Baton Pass'
		],
		restricted: [],
		onValidateTeam(team, format) {
			const itemTable = new Set<ID>();
			let speciesTable = {};
			let allowedTiers = ['Balls'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return ['Balls ' + set.species + ' doesnt exist.'];
				}
			}
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (!item.megaStone && !item.onPrimal && !item.forcedForme?.endsWith('Origin') &&
					!item.name.startsWith('Rusted') && !item.name.endsWith('Mask')) continue;
				const natdex = this.ruleTable.has('standardnatdex');
				if (natdex && item.id !== 'ultranecroziumz') continue;
				const species = this.dex.species.get(set.species);
				if (species.isNonstandard && !this.ruleTable.has(`+pokemontag:${this.toID(species.isNonstandard)}`)) {
					return [`${species.baseSpecies} does not exist in gen 9.`];
				}
				if ((item.itemUser?.includes(species.name) && !item.megaStone && !item.onPrimal) ||
					(natdex && species.name.startsWith('Necrozma-') && item.id === 'ultranecroziumz')) {
					continue;
				}
				if (this.ruleTable.isRestrictedSpecies(species) || this.toID(set.ability) === 'powerconstruct') {
					return [`${species.name} is not allowed to hold ${item.name}.`];
				}
				if (itemTable.has(item.id)) {
					return [
						`You are limited to one of each mega stone/orb/rusted item/sinnoh item/mask.`,
						`(You have more than one ${item.name})`,
					];
				}
				itemTable.add(item.id);
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.baseSpecies.name;
			}
		},
		onSwitchIn(pokemon) {
			// @ts-ignore
			const originalFormeSecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (originalFormeSecies.exists && pokemon.m.originalSpecies !== originalFormeSecies.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, originalFormeSecies.requiredItem || originalFormeSecies.requiredMove, '[silent]');
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-end', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
	},
	{
		section: "Official Smogon Formats",
		column: 3,
		// name: "officialsmogonformats",
	},
	{
		name: "[Gen 9] OU",

		mod: 'gen9',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
	},
	{
		name: "[Gen 9] LC",
		mod: 'gen9',
		ruleset: ['Little Cup', 'Standard'],
		banlist: [
			'Aipom', 'Basculin-White-Striped', 'Cutiefly', 'Diglett-Base', 'Dunsparce', 'Duraludon', 'Flittle', 'Gastly', 'Girafarig', 'Gligar',
			'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Qwilfish-Hisui', 'Rufflet', 'Scraggy', 'Scyther', 'Sneasel', 'Sneasel-Hisui',
			'Snivy', 'Stantler', 'Vulpix', 'Vulpix-Alola', 'Yanma', 'Moody', 'Baton Pass', 'Sticky Web',
		],
	},
	{
		name: "[Gen 9] Anything Goes",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710911/">AG Metagame Discussion</a>`,
		],

		mod: 'gen9',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 9] Custom Game",

		mod: 'gen9',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 9] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710876/">Doubles OU Sample Teams</a>`,
		],

		mod: 'gen9',
		gameType: 'doubles',
		ruleset: ['Standard Doubles'],
		banlist: ['DUber', 'Shadow Tag'],
	},
	{
		name: "[Gen 9] Doubles Custom Game",

		mod: 'gen9',
		gameType: 'doubles',
		searchShow: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 9] National Dex",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710848/">National Dex Metagame Discussion</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod'],
		banlist: ['ND Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Baton Pass'],
	},
	{
		name: "[Gen 9] National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672423/">National Dex AG</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard NatDex'],
	},
	{
		name: "[Gen 9] Triples",
		mod: 'gen9',
		gameType: 'triples',
		searchShow: false,
		ruleset: ['Standard Doubles'],
		banlist: [
			'Annihilape', 'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Deoxys-Attack', 'Dialga', 'Dialga-Origin', 'Eternatus', 'Flutter Mane',
			'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Koraidon', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Mewtwo',
			'Miraidon', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Terapagos', 'Urshifu',
			'Urshifu-Rapid-Strike', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Shadow Tag',
		],
	},
	{
		name: "[Gen 9] Type Split",
		desc: `The Physical/Special split is reverted; All non-Status moves are Physical or Special depending on their type, no exceptions.`,
		mod: 'gen9',
		searchShow: false,
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Evasion Abilities Clause'],
		banlist: [
			'Annihilape', 'Arceus', 'Archaludon', 'Calyrex-Shadow', 'Chi-Yu', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Dialga-Origin', 'Espathra',
			'Eternatus', 'Flutter Mane', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Iron Bundle', 'Koraidon', 'Kyogre', 'Kyurem-White', 'Landorus-Base',
			'Lugia', 'Lunala', 'Magearna', 'Mewtwo', 'Miraidon', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Palkia-Origin', 'Rayquaza', 'Regieleki',
			'Reshiram', 'Shaymin-Sky', 'Sneasler', 'Solgaleo', 'Terapagos', 'Volcarona', 'Zacian-Crowned', 'Zamazenta-Crowned', 'Arena Trap', 'Moody', 'Shadow Tag',
			'Bright Powder', 'Damp Rock', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail',
		],
		onModifyMovePriority: -1000,
		onModifyMove(move, pokemon, target) {
			if (move.category === 'Status') return;
			const specialTypes = ['Dark', 'Dragon', 'Electric', 'Fairy', 'Fire', 'Grass', 'Ice', 'Psychic', 'Water'];
			if (specialTypes.includes(move.type)) {
				move.category = 'Special';
			} else if (move.type === 'Stellar') {
				move.category = pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true) ? 'Physical' : 'Special';
			} else {
				move.category = 'Physical';
			}
		},
	},
	// Please keep these here for testing / debugging
	{
		name: "[Gen 8] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710887/">SS OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710892/">SS OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3717979/">SS OU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
	},
	{
		name: "[Gen 7] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3685980/">USM OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3695427/">USM OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667522/">USM OU Viability Rankings</a>`,
		],

		mod: 'gen7',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 6] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3719305/">ORAS OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694551/">ORAS OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3623399/">ORAS OU Viability Rankings</a>`,
		],

		mod: 'gen6',
		ruleset: ['Standard', 'Swagger Clause'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass'],
	},
	{
		name: "[Gen 5] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666724/">BW2 OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3686880/">BW2 OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3668699/">BW2 OU Viability Rankings</a>`,
		],

		mod: 'gen5',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Sleep Moves Clause', 'Swagger Clause', 'Gems Clause', 'Baton Pass Stat Clause'],
		banlist: ['Uber', 'Arena Trap', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Rush', 'Shadow Tag', 'King\'s Rock', 'Razor Fang', 'Soul Dew', 'Assist'],
	},
	{
		name: "[Gen 4] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3685887/">DPP OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3687351/">DPP OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3683332/">DPP OU Viability Rankings</a>`,
		],

		mod: 'gen4',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Baton Pass Stat Trap Clause', 'Freeze Clause Mod'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Quick Claw', 'Soul Dew', 'Swagger'],
	},
	{
		name: "[Gen 3] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3687814/">ADV OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3687813/">ADV OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3503019/">ADV OU Viability Rankings</a>`,
		],

		mod: 'gen3',
		ruleset: ['Standard', 'One Boost Passer Clause', 'Freeze Clause Mod'],
		banlist: ['Uber', 'Smeargle + Ingrain', 'Sand Veil', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Swagger'],
	},
	{
		name: "[Gen 2] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3688141/">GSC OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3688523/">GSC OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3633233/">GSC OU Viability Rankings</a>`,
		],

		mod: 'gen2',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Mean Look + Baton Pass', 'Spider Web + Baton Pass'],
	},
	{
		name: "[Gen 1] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3685846/">RBY OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3689726/">RBY OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3685861/">RBY OU Viability Rankings</a>`,
		],

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Custom Game",
		mod: 'gen1',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Desync Clause Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 3] Custom Game",
		mod: 'gen3',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},

	///////////////////////////////////////////////////////////////
	/////////////// Official Non-Smogon Formats //////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Official Non-Smogon Formats",
		column: 3,
		// name: "officialnonsmogonformats",
	},
	{
		name: "[Gen 9] BSS Reg G",
		mod: 'gen9',
		bestOfDefault: true,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Limit One Restricted'],
		restricted: ['Restricted Legendary'],
	},
	{
		name: "[Gen 9] BSS Reg H",
		mod: 'gen9',
		bestOfDefault: true,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer'],
		banlist: ['Sub-Legendary', 'Paradox', 'Gouging Fire', 'Iron Boulder', 'Iron Crown', 'Raging Bolt'],
	},
	{
		name: "[Gen 9] VGC 2024 Reg G",
		mod: 'gen9',
		gameType: 'doubles',
		bestOfDefault: true,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Limit One Restricted'],
		restricted: ['Restricted Legendary'],
	},
	{
		name: "[Gen 9] VGC 2024 Reg G (Bo1 Forced OTS)",
		mod: 'gen9',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Force Open Team Sheets', 'Limit One Restricted'],
		restricted: ['Restricted Legendary'],
	},
	{
		name: "[Gen 9] VGC 2024 Reg G (Bo3)",
		mod: 'gen9',
		gameType: 'doubles',
		challengeShow: false,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Force Open Team Sheets', 'Best of = 3', 'Limit One Restricted'],
		restricted: ['Restricted Legendary'],
	},
	{
		name: "[Gen 9] VGC 2024 Reg H",
		mod: 'gen9',
		gameType: 'doubles',
		bestOfDefault: true,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets'],
		banlist: ['Sub-Legendary', 'Paradox', 'Gouging Fire', 'Iron Boulder', 'Iron Crown', 'Raging Bolt'],
	},
	{
		name: "[Gen 9] VGC 2024 Reg H (Bo1 Forced OTS)",
		mod: 'gen9',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Force Open Team Sheets'],
		banlist: ['Sub-Legendary', 'Paradox', 'Gouging Fire', 'Iron Boulder', 'Iron Crown', 'Raging Bolt'],
	},
	{
		name: "[Gen 9] VGC 2024 Reg H (Bo3)",
		mod: 'gen9',
		gameType: 'doubles',
		challengeShow: false,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Force Open Team Sheets', 'Best of = 3'],
		banlist: ['Sub-Legendary', 'Paradox', 'Gouging Fire', 'Iron Boulder', 'Iron Crown', 'Raging Bolt'],
	},

	///////////////////////////////////////////////////////////////
	/////////////// Non-Pet Mod Formats //////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Non-Pet Mod Formats",
		column: 3,
		// name: "nonpetmodformats",
	},
	{
		name: "[Gen 8] Dynamax Meter",
		mod: 'gen8maxmeter',
		ruleset: ['Standard'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
		onBegin() {
			for (const side of this.sides) {
				if (!side.getSideCondition('maxmeter5')) {
					side.dynamaxUsed = true;
				}
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (source.side.getSideCondition('maxmeter1') || source.side.getSideCondition('maxmeter2') || source.side.getSideCondition('maxmeter3') || source.side.getSideCondition('maxmeter4') || source.side.getSideCondition('maxmeter5')) return;
			if (source.hasType(move.type)) {
				source.side.addSideCondition('maxmeter1');
			}
		},
	},
	{
		name: "[Gen 9] Littlest Cup",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Max Level = 1'],
		teambuilderFormat: 'National Dex',
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power', 'Shadow Tag'],
		unbanlist: ['Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
  },
	{
		name: "[Gen 9] Littlest Cup (No Tera)",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		searchShow: false,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Items Clause', 'Species Clause', 'Sleep Clause Mod', 'Mega Rayquaza Clause', 'Max Level = 1', 'Terastal Clause'],
		teambuilderFormat: 'National Dex',
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power', 'Shadow Tag'],
		unbanlist: ['Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
  },
	{
		name: "[Gen 9] Littlest Cup Random Battle",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littlestcup',
		team: 'random',
		ruleset: ['Data Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Z-Move Clause', 'Max Level = 1'],
	},
	{
		name: "[Gen 6] TPDP Open",
		mod: 'tpdp',
		debug: true,
		desc: `a close approximation of Touhou Puppet Dance Performance`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] TPDP AAA",
		mod: 'tpdp',
		debug: true,
		desc: `a close approximation of Touhou Puppet Dance Performance`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', '!Obtainable Abilities'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		
		'Power Suika', 'Power Yukari', 'Power Miko', 'Assist Akyuu', //mons
		'Miracle Mallet', 'Unique Shield', 'Forward Dash', 'Up Tempo', 'Good Management', 'Usurpation', 'Boundary Blurrer', //stat boosting
		'Hobgoblin', 'Shadow Stitch', 'Frail Health', 'Vanishing Act', 'Stone Stacker', //misc
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] TPDP Stylemons",
		mod: 'tpdp',
		debug: true,
		desc: `TPDP Stylemons`,
		ruleset: ['Standard NatDex', 'Stylemons Move Legality', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
	},
	{
		name: "[Gen 6] TPDP Shared Power",
		mod: 'tpdp',
		debug: true,
		desc: `TPDP Shared Power`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
		getSharedPower(pokemon) {
			const sharedPower = new Set<string>();
			for (const ally of pokemon.side.pokemon) {
				if (pokemon.battle.ruleTable.isRestricted(`ability:${ally.baseAbility}`)) continue;
				if (ally.previouslySwitchedIn > 0) {
					if (pokemon.battle.dex.currentMod !== 'sharedpower' && ['trace', 'mirrorarmor'].includes(ally.baseAbility)) {
						sharedPower.add('noability');
						continue;
					}
					sharedPower.add(ally.baseAbility);
				}
			}
			sharedPower.delete(pokemon.baseAbility);
			return sharedPower;
		},
		onBeforeSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				const effect = 'ability:' + ability;
				pokemon.volatiles[effect] = {id: this.toID(effect), target: pokemon};
				if (!pokemon.m.abils) pokemon.m.abils = [];
				if (!pokemon.m.abils.includes(effect)) pokemon.m.abils.push(effect);
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				if (ability === 'noability') {
					this.hint(`Mirror Armor and Trace break in Shared Power formats that don't use Shared Power as a base, so they get removed from non-base users.`);
				}
				const effect = 'ability:' + ability;
				delete pokemon.volatiles[effect];
				pokemon.addVolatile(effect);
			}
		},
	},
	{
		name: "[Gen 6] TPDP Netplay",
		mod: 'tpdp',
		debug: true,
		desc: `a close approximation of Touhou Puppet Dance Performance`,
		ruleset: ['Obtainable', 'Team Preview', 'Cancel Mod', 'Species Clause', 'Item Clause', 'Adjust Level Down = 50', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['TPDP OU', 'TPDP LC'];
			let natures = ['Red', 'Blue', 'Black', 'Green', 'White'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not allowed in TPDP.'];
				}
				if (!natures.includes(set.nature)) {
					return [set.nature + ' is not a valid nature in TPDP. Hint: to set Red, Blue, Black, White, or Green nature, use the Import/Export button.'];
				}
			}
		},
	},
	{
		name: "[Gen 2] VGC 2001",
		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Team Preview', 'Picked Team Size = 4', 'Min Source Gen = 2'],
		banlist: [],
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 9] White Tusk",

		mod: 'whitetusk',
		ruleset: ['Standard', 'Data Mod'],
		banlist: ['All Pokemon', 'King\'s Rock', 'Baton Pass'],
		unbanlist: ['Dust Bunnie', 'Rebirb', 'Strummingbird', 'Strummingbird-Viola', 'Strummingbird-Cello', 'Strummingbird-Contrabass', 'Strummingbird-Acoustic', 'Strummingbird-Electric', 'Strummingbird-Bass', 'Xylomist', 'Yeomelt', 'Zoplite', 'Yeoxylo', 'Xylozop', 'Zopyeo', 'Xylyeozop', 'Xylobone', 'Dormirr', 'Pufferfinch', 'Gumbawl', 'Gumbrawl', 'Gumbrawl-Bubble', 'Gumbrawl-Fresh', 'Gnawing Bark', 'Iron Mint', 'Caramilitant', 'Toughfee', 'Gasharmoir', 'Gumbrawl-Gachamech', 'Tartridge', 'Opixsi', 'Pinfrino', 'Leagle', 'Kuadrosin', 'Blite', 'Doctoxin', 'Moosquito', 'Parrox'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			const combinationTable = ['Xylomist', 'Yeomelt', 'Zoplite', 'Yeoxylo', 'Xylozop', 'Zopyeo', 'Xylyeozop'];
			let combinationTest = [];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				console.log(template.name);
				if (combinationTable.includes(template.name)) {
					combinationTest.push(template.name);
				}
			}
			if (combinationTest.length > 1) {	//Skip the check if only one was found at most
				if ((combinationTest.includes('Xylomist') && (combinationTest.includes('Yeoxylo') || combinationTest.includes('Xylozop') || combinationTest.includes('Xylyeozop')))
					|| (combinationTest.includes('Yeomelt') && (combinationTest.includes('Yeoxylo') || combinationTest.includes('Zopyeo') || combinationTest.includes('Xylyeozop')))
					|| (combinationTest.includes('Zoplite') && (combinationTest.includes('Xylozop') || combinationTest.includes('Zopyeo') || combinationTest.includes('Xylyeozop')))) {
					return ['You cannot have XYZ Pokemon with their combined forms.'];
				}
			}
		},
	},
	{
		section: "Modern Gen Series",
		column: 3,
		// name: "moderngenseries",
	},
	{
		name: "[Gen 1] Modern Gen 1",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Uber', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Shell Smash', 'Teeter Dance', 'Flatter'],
	},
	{
		name: "[Gen 1] Modern Gen 1 Randbats",
		desc: `Pok&eacute;mon, items, abilities, and moves are redesigned for OU, and new items, abilities, and moves are added, all without changing base stats.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">MG1</a>`,
		],
		mod: 'moderngen1',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Freeze Clause Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Modern Gen 1 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['AG', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Flatter'],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 1] Modern Gen 1 UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Partial Trapping Clause', 'Protect Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Uber', 'OU', 'UUBL', 'Fake Out', 'Confuse Ray', 'Supersonic', 'Swagger', 'Sweet Kiss', 'Flatter'],
	},
	{
		name: "[Gen 1] Modern Gen 1 LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-1.3711533/">Smogon Thread</a>`,
		],
		mod: 'moderngen1',
		searchShow: false,
		ruleset: ['Standard', 'Little Cup', 'Partial Trapping Clause', 'Field Effect Clause', 'Sleep Moves Clause', '+No Ability', '-All Abilities', '-All Items'],
		banlist: ['Basculin-White-Striped', 'Qwilfish-Hisui', 'Sneasel', 'Stantler', 'Tangela', 'Sneasel-Hisui', 'Dunsparce', 'Scyther', 'Girafarig', 'Type: Null', 'Fake Out'],
	},
	{
		name: "[Gen 2] Modern Gen 2",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/">Smogon Thread</a>`,
		],
		mod: 'moderngen2',
		searchShow: false,
		ruleset: ['Standard MG2', '+No Ability', '-All Abilities'],
		banlist: ['AG', 'Uber', 'Fake Out', 'Shell Smash', 'Last Respects', 'Baton Pass', 'Alakazite', 'Soul Dew'],
	},
	{
		name: "[Gen 2] Modern Gen 2 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/">Smogon Thread</a>`,
		],
		mod: 'moderngen2',
		searchShow: false,
		ruleset: ['Standard', '+No Ability', '-All Abilities'],
		banlist: ['AG', 'Fake Out', 'Baton Pass', 'Rusted Sword'],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 2] Modern Gen 2 LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-2.3725808/">Smogon Thread</a>`,
		],
		mod: 'moderngen2',
		searchShow: false,
		ruleset: ['Standard', 'Little Cup', '+No Ability', '-All Abilities'],
		banlist: ['Basculin-White-Striped', 'Qwilfish-Hisui', 'Sneasel-Hisui', 'Dunsparce', 'Scyther', 'Girafarig', 'Type: Null', 'Fake Out', 'Sonic Boom', 'Dragon Rage'],
	},
	{
		name: "[Gen 3] Modern Gen 3",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-3.3713372/">Smogon Thread</a>`,
		],
		mod: 'moderngen3',
		searchShow: false,
		ruleset: ['Standard', 'Z-Move Clause'],
		banlist: ['AG', 'Uber', 'Assist', 'Baton Pass', 'Arena Trap', 'Shadow Tag', 'Sand Veil', 'Snow Cloak', 'Moody', 'Sand Rush', 'Power Construct', 'Battle Bond', 'King\'s Rock', 'Razor Fang', 'Soul Dew', 'Shed Tail'],
	},
	{
		name: "[Gen 3] Modern Gen 3 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-9-modern-gen-3.3713372/">Smogon Thread</a>`,
		],
		mod: 'moderngen3',
		searchShow: false,
		ruleset: ['Standard', 'Z-Move Clause'],
		banlist: ['AG'],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 3] Modern Gen 2 The Sequel: Just The Birds",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10203354">Post in the Solomods Megathread</a>`,
		],
		mod: 'moderngen2birds',
		searchShow: false,
		ruleset: ['Standard', 'Z-Move Clause', '!Obtainable Abilities'], // temporary until I can figure why HAs work in MG3 but not here
		banlist: [
			'Assist', 'Baton Pass', 'Arena Trap', 'Shadow Tag', 'Sand Veil', 'Snow Cloak', 'Moody', 'Sand Rush',
			'Power Construct', 'Battle Bond', 'King\'s Rock', 'Razor Fang', 'Soul Dew', 'Shed Tail',
		],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['Birds'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not a bird (according to the mod leader).'];
				}
			}
		},
	},
	{
		name: "[Gen 4] Modern Gen 4",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9837342">Smogon Post</a>`,
		],
		mod: 'moderngen4',
		searchShow: false,
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', 'Z-Move Clause'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Shadow Tag', 'Moody', 'Sand Rush', 'Power Construct', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Soul Dew'],
	},
	{
		name: "[Gen 4] Modern Gen 4 Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9837342">Smogon Post</a>`,
		],
		mod: 'moderngen4',
		searchShow: false,
		ruleset: ['Standard', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['AG'],
		teambuilderFormat: 'Uber',
	},
];
