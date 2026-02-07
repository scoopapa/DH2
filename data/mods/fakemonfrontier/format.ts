import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
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
	};