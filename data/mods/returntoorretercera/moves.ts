export const Moves: {[k: string]: ModdedMoveData} = {
	shadowblast: {
		num: 177,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Shadow Blast",
		shortDesc: "High critical hit ratio.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Pulse", target);
		},
		critRatio: 2,
		secondary: null,
		target: "any",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowblitz: {
		num: 33,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Shadow Blitz",
		shortDesc: "No additional effect.",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lash Out", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowbolt: {
		num: 33,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Shadow Bolt",
		shortDesc: "10% chance to paralyze the target.",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder", target);
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowbreak: {
		num: 33,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Shadow Break",
		shortDesc: "No addtional effect.",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowchill: {
		num: 33,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Shadow Chill",
		shortDesc: "10% chance to freeze the target.",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowdown: {
		num: 103,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Shadow Down",
		shortDesc: "Lowers the target's Defense by 2.",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, allyanim: 1},
		boosts: {
			def: -2,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Boomburst", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	shadowend: {
		num: 720,
		accuracy: 60,
		basePower: 120,
		category: "Physical",
		name: "Shadow End",
		shortDesc: "Has 1/2 recoil.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Mind Blown'), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowfire: {
		num: 33,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Shadow Fire",
		shortDesc: "10% chance to burn the target.",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Blast", target);
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowhalf: {
		num: 877,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
		category: "Special",
		name: "Shadow Half",
		shortDesc: "User can't move next turn. Does damage equal to the target's 1/2 current HP.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pain Split", target);
		},
		secondary: null,
		target: "all",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowhold: {
		num: 169,
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Shadow Hold",
		shortDesc: "Prevents the target from switching out.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Block", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	shadowmist: {
		num: 230,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Shadow Mist",
		shortDesc: "Lowers the target's evasiveness by 2.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			evasion: -2,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Haze", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cute",
	},
	shadowpanic: {
		num: 448,
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Shadow Panic",
		shortDesc: "Confuses the target.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, distance: 1, bypasssub: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Screech", target);
		},
		target: "any",
		type: "Shadow",
		contestType: "Cute",
	},
	shadowrave: {
		num: 257,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Shadow Rave",
		shortDesc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowrush: {
		num: 33,
		accuracy: 100,
		basePower: 55,
		category: "Physical",
		name: "Shadow Rush",
		shortDesc: "No addtional effect.",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rush", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowshed: {
		num: 280,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Shadow Shed",
		shortDesc: "Clears Reflect, Light Screen and Safeguard from both sides.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit(source) {
				let success = false;
				const removeTarget = [
					'reflect', 'lightscreen', 'safeguard'
				];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						this.add('-sideend', source.side.foe, this.dex.conditions.get(targetCondition).name, '[from] move: Shadow Shed', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeTarget) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Shadow Shed', '[of] ' + source);
						success = true;
					}
				}
				return success;
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Court Change", target);
		},
		secondary: null,
		target: "all",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowsky: {
		num: 240,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shadow Sky",
		shortDesc: "Sets Shadow Sky.",
		pp: 5,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gravity", target);
		},
		weather: 'ShadowSky',
		secondary: null,
		target: "all",
		type: "Shadow",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	shadowstorm: {
		num: 257,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Shadow Storm",
		shortDesc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowwave: {
		num: 257,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Shadow Wave",
		shortDesc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Wave", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		contestType: "Beautiful",
	},
	weatherball: {
		num: 311,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Weather Ball",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				break;
			case 'shadowsky':
				move.type = "???";
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			case 'shadowsky':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
   },
};
