 import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
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
     };