export const Moves: {[k: string]: ModdedMoveData} = {
	shadowblast: {
		num: 177,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Shadow Blast",
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
		name: "Shadow Storm",
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
};
