import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 6] TPDP Open",
		mod: 'tpdp',
		debug: true,
		desc: `a close approximation of Touhou Puppet Dance Performance`,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
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
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', '!Obtainable Abilities', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
		'Poison Labyrinth', 'Adverse Wind', //trapping
		'Moody',
		'Backup Plan', //baton pass

		'Power Suika', 'Power Yukari', 'Power Miko', 'Assist Akyuu', //mons
		'Miracle Mallet', 'Unique Shield', 'Forward Dash', 'Up Tempo', 'Good Management', 'Usurpation', 'Boundary Blurrer', 'ability:Serious', //stat boosting
		'Hobgoblin', 'Shadow Stitch', 'Frail Health', 'Vanishing Act', 'Stone Stacker', //misc
		'Adaptability', 'Aerilate', 'Aftermath', 'Air Lock', 'Analytic', 'Anger Point', 'Anger Shell', 'Anticipation', 'Arena Trap', 'Armor Tail', 'Aroma Veil', 'As One (Glastrier)', 'As One (Spectrier)', 'Aura Break', 'Bad Dreams', 'Ball Fetch', 'Battery', 'Battle Armor', 'Battle Bond', 'Beads of Ruin', 'Beast Boost', 'Berserk', 'Big Pecks', 'Blaze', 'Bulletproof', 'Cheek Pouch', 'Chilling Neigh', 'Chlorophyll', 'Clear Body', 'Cloud Nine', 'Color Change', 'Comatose', 'Commander', 'Competitive', 'Compound Eyes', 'Contrary', 'Corrosion', 'Costar', 'Cotton Down', 'Cud Chew', 'Curious Medicine', 'Cursed Body', 'Cute Charm', 'Damp', 'Dancer', 'Dark Aura', 'Dauntless Shield', 'Dazzling', 'Defeatist', 'Defiant', 'Delta Stream', 'Desolate Land', 'Disguise', 'Download', 'Dragon\'s Maw', 'Drizzle', 'ability:Drought', 'Dry Skin', 'Early Bird', 'Earth Eater', 'Effect Spore', 'Electric Surge', 'Electromorphosis', 'Embody Aspect (Teal)', 'Embody Aspect (Hearthflame)', 'Embody Aspect (Cornerstone)', 'Embody Aspect (Wellspring)', 'Emergency Exit', 'Fairy Aura', 'Filter', 'Flame Body', 'Flare Boost', 'Flash Fire', 'Flower Gift', 'Flower Veil', 'Fluffy', 'Forecast', 'Forewarn', 'Friend Guard', 'Frisk', 'Full Metal Body', 'Fur Coat', 'Gale Wings', 'Galvanize', 'Gluttony', 'Good as Gold', 'Gooey', 'Gorilla Tactics', 'Grass Pelt', 'Grassy Surge', 'Grim Neigh', 'Guard Dog', 'Gulp Missile', 'Guts', 'Hadron Engine', 'Harvest', 'Healer', 'Heatproof', 'Heavy Metal', 'Honey Gather', 'Hospitality', 'Huge Power', 'Hunger Switch', 'Hustle', 'Hydration', 'Hyper Cutter', 'Ice Body', 'Ice Face', 'Ice Scales', 'Illuminate', 'Illusion', 'Immunity', 'Imposter', 'Infiltrator', 'Innards Out', 'Inner Focus', 'Insomnia', 'Intimidate', 'Intrepid Sword', 'Iron Barbs', 'Iron Fist', 'Justified', 'Keen Eye', 'Klutz', 'Leaf Guard', 'Levitate', 'Libero', 'Light Metal', 'Lightning Rod', 'Limber', 'Lingering Aroma', 'Liquid Ooze', 'Liquid Voice', 'Long Reach', 'Magic Bounce', 'Magic Guard', 'Magician', 'Magma Armor', 'Magnet Pull', 'Marvel Scale', 'Mega Launcher', 'Merciless', 'Mimicry', 'Mind\s Eye', 'Minus', 'Mirror Armor', 'Misty Surge', 'Mold Breaker', 'Motor Drive', 'Moxie', 'Multiscale', 'Multitype', 'Mummy', 'Mycelium Might', 'Natural Cure', 'Neuroforce', 'Neutralizing Gas', 'No Guard', 'Normalize', 'Oblivious', 'Opportunist', 'Orichalcum Pulse', 'Overcoat', 'Overgrow', 'Own Tempo', 'Parental Bond', 'Pastel Veil', 'Perish Body', 'Pickpocket', 'Pickup', 'Pixilate', 'Plus', 'Poison Heal', 'Poison Point', 'Poison Puppeteer', 'Poison Touch', 'Power Construct', 'Power of Alchemy', 'ability:Power Spot', 'Prankster', 'Pressure', 'Primordial Sea', 'Prism Armor', 'Propeller Tail', 'Protean', 'Protosynthesis', 'Psychic Surge', 'Punk Rock', 'Pure Power', 'Purifying Salt', 'Quark Drive', 'Queenly Majesty', 'Quick Draw', 'Quick Feet', 'Rain Dish', 'Rattled', 'Receiver', 'Reckless', 'Refrigerate', 'Regenerator', 'Ripen', 'Rivalry', 'RKS System', 'Rock Head', 'Rocky Payload', 'Rough Skin', 'Run Away', 'Sand Force', 'Sand Rush', 'Sand Spit', 'Sand Stream', 'Sand Veil', 'Sap Sipper', 'Schooling', 'Scrappy', 'Screen Cleaner', 'Seed Sower', 'Serene Grace', 'Shadow Shield', 'Shadow Tag', 'Sharpness', 'Shed Skin', 'Sheer Force', 'Shell Armor', 'Shield Dust', 'Shields Down', 'Simple', 'Skill Link', 'Slow Start', 'Slush Rush', 'Sniper', 'Snow Cloak', 'Snow Warning', 'Solar Power', 'Solid Rock', 'Soul-Heart', 'Soundproof', 'Speed Boost', 'Stakeout', 'Stall', 'Stalwart', 'Stamina', 'Stance Change', 'Static', 'Steadfast', 'Steam Engine', 'Steelworker', 'Steely Spirit', 'Stench', 'Sticky Hold', 'Storm Drain', 'Strong Jaw', 'Sturdy', 'Suction Cups', 'Super Luck', 'Supersweet Syrup', 'Supreme Overlord', 'Surge Surfer', 'Swarm', 'Sweet Veil', 'Swift Swim', 'Sword of Ruin', 'Symbiosis', 'Synchronize', 'Tablets of Ruin', 'Tangled Feet', 'Tangling Hair', 'Technician', 'Telepathy', 'Tera Shell', 'Tera Shift', 'Teraform Zero', 'Teravolt', 'Thermal Exchange', 'Thick Fat', 'Tinted Lens', 'Torrent', 'Tough Claws', 'Toxic Boost', 'Toxic Chain', 'Toxic Debris', 'Trace', 'Transistor', 'Triage', 'Truant', 'Turboblaze', 'Unaware', 'Unburden', 'Unnerve', 'Unseen Fist', 'Vessel of Ruin', 'Victory Star', 'Vital Spirit', 'Volt Absorb', 'Wandering Spirit', 'Water Absorb', 'Water Bubble', 'Water Compaction', 'Water Veil', 'Weak Armor', 'Well-Baked Body', 'White Smoke', 'Wimp Out', 'Wind Power', 'Wind Rider', 'Wonder Guard', 'Wonder Skin', 'Zen Mode', 'Zero to Hero' //vanilla abils
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
		ruleset: ['Standard NatDex', 'Stylemons Move Legality', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
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
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
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
		ruleset: ['Obtainable', 'Team Preview', 'Cancel Mod', 'Species Clause', 'Item Clause', 'Adjust Level Down = 50', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Status Mod'],
		banlist: ['Boundary Trance', 'Dream Shard',
		'Camouflage', 'Favorable Wind', 'Dead of Night', 'Sand Mask', 'Echelon Charm', //evasion
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
	}
];