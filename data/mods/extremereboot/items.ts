export const Items: {[itemid: string]: ItemData} = {
	bloodvial: {
		name: "Blood Vial",
		num: 1001,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				if (target.useItem()) {
					source.trySetStatus('psn', target);
					return target.hp - 1;
				}
			}
		},
		num: 275,
		gen: 4,
		gen: 8,
	},
	calmingsalt: {
		name: "Calming Salt",
		num: 1002,
		onAfterSetStatus(status, pokemon) {
			pokemon.eatItem();
		},
		onUpdate(pokemon) {
			if (pokemon.status || pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.cureStatus();
			pokemon.removeVolatile('confusion');
		},
		gen: 8,
	},
	cursedorb: {
		name: "Cursed Orb",
		num: 1003,
		gen: 8,
	},
	emblematicscarf: {
		name: "Emblematic Scarf",
		num: 1004,
		gen: 8,
	},
	enigmaticshield: {
		name: "Enigmatic Shield",
		num: 1005,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(0.75);
			}
		},
		gen: 8,
	},
	fellscythe: {
		name: "Fell Scythe",
		num: 1006,
		onModifyDamage(damage, source, target, move) {
			if (!(pokemon.hasType("Autumn"))) return this.chainModify([0x14CC, 0x1000]);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (pokemon.hasType("Autumn")) return;
			if (source && source !== target && move && move.category !== 'Status') {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.getItem('fellscythe'));
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hasType("Autumn")) this.heal(pokemon.baseMaxhp / 16);
		},
		gen: 8,
	},
	gospelnotes: {
		name: "Gospel Notes",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				// any moves that don't get modified, for instance those that can change type
			];
			if (move.flags['sound'] && !noModifyType.includes(move.id)) {
				move.type = 'Serenity';
			}
		},
		num: 1007,
		gen: 8,
	},
	lifegem: {
		name: "Life Gem",
		num: 1008,
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status') {
				this.heal(source.baseMaxhp / 10);
			}
		},
		gen: 8,
	},
	maiddress: {
		name: "Maid Dress",
		num: 1009,
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		gen: 8,
	},
	metalmorph: {
		name: "Metalmorph",
		num: 1010,
		onModifySecondaries(secondaries) {
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hasType("Manmade")) return this.chainModify(1.2);
		},
		gen: 8,
	},
	pokemonstandard: {
		name: "Pokemon Standard",
		num: 1011,
		onModifyDamage(damage, source, target, move) {
			if (source.hasType(move.type)) return this.chainModify(1.25);
		},
		gen: 8,
	},
	powerstone: {
		name: "Power Stone",
		num: 1012,
		gen: 8,
	},
	seasonsgem: {
		name: "Seasons Gem",
		num: 1013,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			const seasons = ["Spring", "Summer", "Autumn", "Winter"];
			if (target === source || move.category === 'Status') return;
			if (seasons.includes(move.type) && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		gen: 8,
	},
	trickyhourglass: {//mostly coded in the field conditions themselves
		name: "Tricky Hourglass",
		num: 1014,
		gen: 8,
	},
};