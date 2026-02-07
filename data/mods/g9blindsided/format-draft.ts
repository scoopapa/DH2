import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
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