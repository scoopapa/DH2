export const Items: {[k: string]: ModdedItemData} = {
	absorbbulb: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.boost({spa: 1}, target);
			}
		},
		boosts: {},
		shortDesc: "Raises Special Attack by 1 stage if hit by an Water-type attack.",
		rating: 3,
	},
	berryjuice: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		onUpdate() {},
		shortDesc: "User will heal 1/8 of its max HP whenever they fall under half HP.",
		rating: 3,
	},
	branchingwand: {
		name: "Branching Wand",
		spritenum: 259,
		num: -4,
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (source.baseSpecies.baseSpecies === 'Braixen' || source.baseSpecies.baseSpecies === 'Delphox') {
				if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod > 0) {
					target.trySetStatus('brn', source);
				}
			}
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Braixen') {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Braixen') {
				return this.chainModify(1.5);
			}
		},
		shortDesc: "If Braixen, x1.5 offenses. If Delphox or Braixen, inflict burn on a super effective move.",
		itemUser: ["Braixen", "Delphox"],
		rating: 0,
	},
	spikedjacket: {
		name: "Spiked Jacket",
		spritenum: 213,
		num: -5,
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const spikes = side.sideConditions['spikes'];
			if (target.baseSpecies.baseSpecies === 'Quilladin' || target.baseSpecies.baseSpecies === 'Chesnaught') {
				if (!spikes || spikes.layers < 3) {
					if (target.getMoveHitData(move).typeMod > 0) {
						this.add('-activate', target, 'item: Spiked Jacket');
						side.addSideCondition('spikes', target);
					}
				}
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Quilladin') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Quilladin') {
				return this.chainModify(2);
			}
		},
		shortDesc: "If Quilladin, x2 Defenses. If Chesnaught/Quilladin: +layer of Spikes when hit for SE damage.",
		itemUser: ["Quilladin", "Chesnaught"],
		rating: 0,
	},
	watmelberry: {
		name: "Watmel Berry",
		spritenum: 530,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fire",
		},
		onEat: false,
		num: 181,
		gen: 3,
		rating: 0,
	},
	cellbattery: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric') {
				this.boost({atk: 1}, target);
			}
		},
		boosts: {},
		shortDesc: "Raises Attack by 1 stage if hit by an Electric-type attack.",
		rating: 3,
	},
	fuelcell: {
		name: "Fuel Cell",
		shortDesc: "User will gain an omniboost if they must recharge. Consumable.",
		spritenum: 272,
		fling: {
			basePower: 100,
		},
		//activation coded in conditions.ts
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		num: -1,
		rating: 3,
	},
	newtonsapple: {
		name: "Newton's Apple",
		shortDesc: "Extends Gravity by 3 turns.",
		spritenum: 711,
		fling: {
			basePower: 20,
		},
		num: -2,
		rating: 3,
	},
	magneticsoles: {
		name: "Magnetic Soles",
		spritenum: 715,
		fling: {
			basePower: 60,
		},
		shortDesc: "If Gravity is active, boost highest stat. 1.5x for Speed, 1.3x for rest.",
		onStart(pokemon) {
			if (this.field.getPseudoWeather('gravity')) {
				pokemon.addVolatile('magneticsoles');
			}
		},
		onResidual(pokemon) {
			if (!this.field.pseudoWeather['gravity']) {
				pokemon.removeVolatile('magneticsoles');
				delete pokemon.volatiles['magneticsoles'];
			}
		},
		onAnyPseudoWeatherChange() {
			const pokemon = this.effectState.target;
			if (this.field.getPseudoWeather('gravity')) {
				pokemon.addVolatile('magneticsoles');
			} else pokemon.removeVolatile('magneticsoles');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['magneticsoles'];
			this.add('-end', pokemon, 'Magnetic Soles');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-activate', pokemon, 'item: Magnetic Soles');
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'magneticsoles' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringItem()) return;
				this.debug('Magnetic Soles atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringItem()) return;
				this.debug('Magnetic Soles def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringItem()) return;
				this.debug('Magnetic Soles spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringItem()) return;
				this.debug('Magnetic Soles spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringItem()) return;
				this.debug('Magnetic Soles spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Magnetic Soles');
				delete pokemon.volatiles['magneticsoles'];
			},
		},
		num: -3,
		gen: 8,
		rating: 3,
	},
	metronome: {
		name: "Metronome",
		spritenum: 289,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			pokemon.addVolatile('metronome');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('metronome')) {
					pokemon.removeVolatile('metronome');
					return;
				}
				if (this.effectState.lastMove === move.id) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		num: 277,
		gen: 4,
	},
	snowball: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice') {
				this.boost({atk: 1}, target);
			}
		},
		boosts: {},
		shortDesc: "Raises Attack by 1 stage if hit by an Ice-type attack.",
		rating: 3,
	},
	trickortreatbag: {
		name: "Trick-or-Treat Bag",
		spritenum: 385,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (pokemon.hp === pokemon.maxhp) return;
			let activated = 0;
			this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name}: Boo!`);
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				let scaredThisGuy = false;
				for (const moveSlot of ((pokemon.illusion && pokemon.illusion.moveSlots) ? pokemon.illusion.moveSlots : pokemon.moveSlots)) {
					if (scaredThisGuy === true) continue;
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, target) && this.dex.getEffectiveness(moveType, target) > 0
					) {
						scaredThisGuy = true;
						continue;
					}
				}
				if (scaredThisGuy === true) {
					this.add('-message', `${target.illusion ? target.illusion.name : target.name}: Eeeek!`);
					activated++;
				}
			}
			this.add('-message', `...`);
			if (activated) {
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} got some candy!`);
				this.heal(pokemon.baseMaxhp * 0.25 * activated);
			} else {
				this.add('-message', `It wasn't that scary, so nothing happened.`);
			}
		},
		desc: "On entry, the holder scares the target with a super-effective move to restore HP.",
		num: -7,
		rating: 3,
	},
	costarmask: {
		name: "Costar Mask",
		spritenum: 760,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Ogerpon-Costar')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Costar",
		itemUser: ["Ogerpon-Costar"],
		shortDesc: "If this Pokemon is Ogerpon-Costar, its attacks have 1.2x power.",
		num: 2408,
		gen: 9,
	},
	timegear: {
		name: "Time Gear",
		spritenum: 735,
		fling: {
			basePower: 130,
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Gardevoir') return false;
			return true;
		},
		itemUser: ["Gardevoir-Amelia"],
		shortDesc: "No effect.",
		num: 2409,
		gen: 9,
	},
	korrasshades: {
		name: "Korra's Shades",
		spritenum: 35,
		fling: {
			basePower: 30,
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Mawile') return false;
			return true;
		},
		itemUser: ["Mawile-Mega-Korra"],
		shortDesc: "No effect.",
		num: 2410,
		gen: 9,
	},
	necasabre: {
		name: "Neca Sabre",
		spritenum: 698,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Foton-Knight')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Foton') return false;
			return true;
		},
		forcedForme: "Foton-Knight",
		itemUser: ["Foton-Knight"],
		shortDesc: "If this Pokemon is Foton-Knight, its attacks have 1.2x power.",
		num: -5000,
		gen: 9,
	},
};
