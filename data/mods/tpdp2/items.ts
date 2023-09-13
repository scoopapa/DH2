export const Items: {[k: string]: ModdedItemData} = {
	absorber: {
		name: "Absorber",
		shortDesc: "This Puppet heals 18% max HP when hit by a not-very-effective skill.",
		onDamagingHit(damage, target, source, move) {
			if (target.getMoveHitData(move).typeMod < 0)
				this.heal(target.baseMaxhp * 0.18);
		},
	},
	almightygodstone: {
		name: "Almighty Godstone",
		shortDesc: "Lengthens duration of any Weather condition when used by the holder.",
		// Implemented in conditions.ts
	},
	amber: {
		name: "Amber",
		shortDesc: "Orange jewelry. Raises the power of Fighting skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fighting' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	amberhairpin: {
		name: "Amber Hairpin",
		shortDesc: "When held, the power of Fighting skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				return this.chainModify(1.2);
			}
		},
	},
	amethyst: {
		name: "Amethyst",
		shortDesc: "Purple jewelry. Raises the power of Poison skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Poison' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	amethysthairpin: {
		name: "Amethyst Hairpin",
		shortDesc: "When held, the power of Poison skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Poison') {
				return this.chainModify(1.2);
			}
		},
	},
	ancientcoin: { // Useless
		name: "Ancient Coin",
		shortDesc: "You can't continue if you only have one! When held, the chances of successful Puppet sealing is increased.",
	},
	ancientlunarsake: {
		name: "Ancient Lunar Sake",
		shortDesc: "Millennium brewed sake. When held by the first Puppet in your party, Puppet encounters will decrease.",
	},
	antiaquacharm: {
		name: "Anti-Aqua Charm",
		shortDesc: "When held, damage dealt from Water-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antiboltcharm: {
		name: "Anti-Bolt Charm",
		shortDesc: "When held, damage dealt from Electric-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antidarkcharm: {
		name: "Anti-Dark Charm",
		shortDesc: "When held, damage dealt from Dark-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antidotecharm: {
		name: "Antidote Charm",
		shortDesc: "When held, it can recover from Poison.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				pokemon.cureStatus();
			}
		},
	},
	antiearthcharm: {
		name: "Anti-Earth Charm",
		shortDesc: "When held, damage dealt from Earth-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Earth' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antifightcharm: {
		name: "Anti-Fight Charm",
		shortDesc: "When held, damage dealt from Fighting-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antifirecharm: {
		name: "Anti-Fire Charm",
		shortDesc: "When held, damage dealt from Fire-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antifloracharm: {
		name: "Anti-Flora Charm",
		shortDesc: "When held, damage dealt from Nature-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Nature' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antilightcharm: {
		name: "Anti-Light Charm",
		shortDesc: "When held, damage dealt from Light-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Light' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antinecrocharm: {
		name: "Anti-Necro Charm",
		shortDesc: "When held, damage dealt from Nether-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Nether' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antisoundcharm: {
		name: "Anti-Sound Charm",
		shortDesc: "When held, damage dealt from Sound-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Sound' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antisteelcharm: {
		name: "Anti-Steel Charm",
		shortDesc: "When held, damage dealt from Steel-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antitoxincharm: {
		name: "Anti-Toxin Charm",
		shortDesc: "When held, damage dealt from Poison-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antiveilcharm: {
		name: "Anti-Veil Charm",
		shortDesc: "When held, damage dealt from Illusion-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Illusion' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antiwarpcharm: {
		name: "Anti-Warp Charm",
		shortDesc: "When held, damage dealt from Warped-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Warped' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antiwindcharm: {
		name: "Anti-Wind Charm",
		shortDesc: "When held, damage dealt from Wind-skills will be reduced once.",
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Wind' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	awakeningcharm: {
		name: "Awakening Charm",
		shortDesc: "When held, it can recover from Stop.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status['stp']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status['stp']) {
				pokemon.cureStatus('stp');
			}
		},
	},
	bandage: {
		name: "Bandage",
		shortDesc: "If a Puppet holding this uses an absorption skill the recovered amount will be increased.",
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([5324, 4096]);
			}
		},
	},
	bellhairpin: { //Useless
		name: "Bell Hairpin",
		shortDesc: "A small, bell-shaped hairpin. When held by the first Puppet in your party, Puppet encounters will increase.",
	},
	binoculars: {
		name: "Binoculars",
		shortDesc: "Increases the holder's accuracy.",
		onModifyAccuracyPriority: 15,
		onFoeModifyAccuracy(relayVar, target, source, move) {
			this.chainModify(0.9);
		},
	},
	blackchoker: {
		name: "Black Choker",
		shortDesc: "When held, a Puppet can withstand one skill that would otherwise KO them.",
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				if (target.useItem()) {
					this.add('-activate', target, "item: Black Choker");
					return target.hp - 1;
				}
			}
		},
	},
	blackring: {
		name: "Black Ring",
		shortDesc: "A Puppet holding this has a chance to survive a lethal attack that would otherwise KO it.",
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (this.randomChance(1, 10) && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add("-activate", target, "item: Black Ring");
				return target.hp - 1;
			}
		},
	},
	blindingorb: {
		name: "Blinding Orb",
		shortDesc: "A Puppet holding this item will always be able to escape from a wild battle.",
	},
	blitzcharm: {
		name: "Blitz Charm",
		shortDesc: "In a pinch, this will raise the Puppet's Critical Hit rate.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.addVolatile('focusenergy');
		},
	},
	blueearrings: {
		name: "Blue Earrings",
		shortDesc: "When held, the power of Sp.Atk skills is raised.",
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.1);
		},
	},
	boundarytrance: { // Illegal
		name: "Boundary Trance",
		shortDesc: "[Unimplemented] A stone with rainbow and transparent blue halves. Special Puppets holding this will have greatly increased stats.",
	},
	bronzemirror: {
		name: "Bronze Mirror",
		shortDesc: "When the opposing Puppet's stats are changed the Puppet holding this will reflect the same stat changes.",
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.fullname?.endsWith('Bronze Mirror')) return;
			const boostPlus: SparseBoostsTable = {};
			let statsRaised = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					boostPlus[i] = boost[i];
					statsRaised = true;
				}
			}
			if (!statsRaised) return;
			const pokemon: Pokemon = this.effectState.target;
			pokemon.useItem();
			this.boost(boostPlus, pokemon);
		},
	},
	burningstone: {
		name: "Burning Stone",
		shortDesc: "Stone that was set ablaze. Puppets holding this will be badly burned.",
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('brnheavy', pokemon);
		},
	},
	capturerope: {
		name: "Capture Rope",
		shortDesc: "Inescapable cursed rope. When held, switch out skills are disabled for the foe. Useless with trapping abilities.",
		onStart(pokemon) {
			this.add('-message', `${pokemon.name} has set the sealing thread!`);
		},
		onFoeModifyMove(move, pokemon, target) {
			if(!['shadowstich', 'poisonlabryinth', 'battlemania', 'adversewind'].includes(pokemon.ability)) move.selfSwitch = false;
		},
	},
	championsmedal: {
		name: "Champion's Medal",
		shortDesc: "A dignified certificate. When held, skills that connect may cause the opponent to flinch.",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
	},
	choicebelt: {
		name: "Choice Belt",
		shortDesc: "Boosts Speed, but you're locked into using the first skill used.",
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock'])
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifySpePriority: 1,
		onModifySpe(spa, pokemon) {
			return this.chainModify(1.5);
		},
		isChoice: true,
	},
	choiceearrings: {
		name: "Choice Earrings",
		shortDesc: "Boosts the power of Spread Attack skills but you're locked into using the first skill used.",
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock'])
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.5);
		},
		isChoice: true,
	},
	choicering: {
		name: "Choice Ring",
		shortDesc: "Boosts the power of Focus Attack skills but you're locked into using the first skill used.",
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock'])
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifyAtkPriority: 1,
		onModifyAtk(spa, pokemon) {
			return this.chainModify(1.5);
		},
		isChoice: true,
	},
	circularamulet: { // Unimplemented
		name: "Circular Amulet",
		shortDesc: "A round amulet. A Puppet holding this will recover HP if it is attacked by its foe. Unimplemented.",
	},
	claritycharm: {
		name: "Clarity Charm",
		shortDesc: "When held, it can recover from confusion.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.removeVolatile('confusion');
		},
	},
	clearhairpin: {
		name: "Clear Hairpin",
		shortDesc: "When held, the power of Illusion skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Illusion') {
				return this.chainModify(1.2);
			}
		},
	},
	columncharm: {
		name: "Column Charm",
		shortDesc: "In a pinch, this will raise the Puppet's FoDef stat.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({def: 1});
		},
	},
	combathandbook: { // Useless
		name: "Combat Handbook",
		shortDesc: "A fighting manual. When held, it increases EXP gained in battle.",
	},
	counterbit: {
		name: "Counter Bit",
		shortDesc: "When held, if you receive damage from a BU-skill, damage will be dealt back to the attacker.",
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	couragecharm: {
		name: "Courage Charm",
		shortDesc: "When held, it can recover from Weakness.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'weak' || pokemon.status === 'weakheavy') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'weak' || pokemon.status === 'weakheavy') {
				pokemon.cureStatus();
			}
		},
	},
	crystalmirror: {
		name: "Crystal Mirror",
		shortDesc: "This Puppet's skills bypass immunities while Byakko is active.",
		onFoeImmunity(type, pokemon) {
			if (this.field.isTerrain("byakko") && this.dex.types.isName(type))
				return false;
		},
	},
	curingcharm: {
		name: "Curing Charm",
		shortDesc: "When held, it can recover from all ailments.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status || pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.cureStatus();
			pokemon.removeVolatile('confusion');
		},
	},
	curseddoll: {
		name: "Cursed Doll",
		shortDesc: "When held skills that wouldn't hit due to type immunity will now work.",
		onFoeImmunity(type, pokemon) {
			if (this.dex.types.get(type))
				return false;
		},
	},
	deadlysecrets: {
		name: "Deadly Secrets",
		shortDesc: "A book detailing the tricks of battle. Skills will deal more damage if it pierces the barrier.",
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(1.2);
			}
		},
	},
	diamond: {
		name: "Diamond",
		shortDesc: "Clear jewelry. Raises the power of Void skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Void' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	diamondhairpin: {
		name: "Diamond Hairpin",
		shortDesc: "When held, the power of Void skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Void') {
				return this.chainModify(1.2);
			}
		},
	},
	dispelcharm: {
		name: "Dispel Charm",
		shortDesc: "When held, if the user becomes unable to use skills, the status is healed once.",
		isBerry: true,
		onUpdate(pokemon) {
			const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
			for (const firstCondition of conditions) {
				if (pokemon.volatiles[firstCondition]) {
					if (!pokemon.eatItem()) return;
					for (const secondCondition of conditions) {
						pokemon.removeVolatile(secondCondition);
					}
					return;
				}
			}
		},
	},
	dragonamulet: {
		name: "Dragon Amulet",
		shortDesc: "A Puppet holding this item is no longer susceptible to critical hits.",
		onFoeModifyCritRatio(relayVar, source, target, move) {
			return 0;
		},
	},
	dreamshard: { // Illegal
		name: "Dream Shard",
		shortDesc: "[Unimplemented] Mysterious gem that constantly changes color. A special Puppet holding this will have increased stats.",
	},
	echeloncharm: {
		name: "Echelon Charm",
		shortDesc: "In a pinch, this will raise the Puppet's Evasion stat.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({evasion: 1});
		},
	},
	emerald: {
		name: "Emerald",
		shortDesc: "Dark green jewelry. Raises the power of Nature skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Nature' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	emeraldhairpin: {
		name: "Emerald Hairpin",
		shortDesc: "When held, the power of Nature skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Nature') {
				return this.chainModify(1.2);
			}
		},
	},
	evictionnotice: {
		name: "Eviction Notice",
		shortDesc: "The attacker will switch places with another Puppet in their party after the holder has been attacked.",
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && source.hp && target.hp && move && move.category !== 'Status') {
				if (!source.isActive || !this.canSwitch(source.side) || source.forceSwitchFlag || target.forceSwitchFlag) {
					return;
				}
				// The item is used up even against a pokemon with Ingrain or that otherwise can't be forced out
				if (target.useItem(source)) {
					if (this.runEvent('DragOut', source, target, move)) {
						source.forceSwitchFlag = true;
					}
				}
			}
		},
	},
	floatingstone: {
		name: "Floating Stone",
		shortDesc: "Makes the holder immune to Earth skills but will crumble if hit by a Non-Earth skills.",
		onStart(target) {
			if (!target.ignoringItem() && !this.field.getPseudoWeather('gravity')) {
				this.add('-item', target, 'Floating Stone');
			}
		},
		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Floating Stone');
			target.item = '';
			target.itemState = {id: '', target};
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('floatingstone'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Floating Stone');
				target.item = '';
				target.itemState = {id: '', target};
				this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('floatingstone'));
			}
		},
	},
	fluorite: {
		name: "Fluorite",
		shortDesc: "Protection moves used by the holder get their duration increased in battle.",
		//Implemented in moves.ts
	},
	foodrations: {
		name: "Food Rations",
		shortDesc: "A stockpile of food. When held by a Puppet it'll recover 1/16th of their max HP per turn during battle.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
	},
	giantbit: {
		name: "Giant Bit",
		shortDesc: "When this Puppet is hit by a 100 BP or higher move, the attacker loses 1/8 max HP.",
		onDamagingHit(damage, target, source, move) {
			if (move.basePower >= 100)
				source.damage(source.baseMaxhp / 8);
		},
	},
	goldtalisman: {
		name: "Gold Talisman",
		shortDesc: "When held, if the user receives a Fo.Atk, Fo.Def is raised.",
		onAfterBoost(boost, target, source, effect) {
			if (boost.atk && target.useItem())
				this.boost({def: boost.atk});
		},
	},
	goldenhairpin: {
		name: "Golden Hairpin",
		shortDesc: "The Puppet holding this will have increased FoDef, but it will not be able to use support skills.",
		onModifyDefPriority: 15,
		onModifyDef(relayVar, target, source, move) {
			this.chainModify(1.5);
		},
		onTryMove(source, target, move) {
			if (move.category === "Status")
				return null;
		},
	},
	hakureiamulet: { // Useless
		name: "Hakurei Amulet",
		shortDesc: "Amulet that holds the gracious power of the Hakurei. When held, EXP and PP gained will increase.",
	},
	halogodstone: {
		name: "Halo Godstone",
		shortDesc: "Lengthens duration of the Aurora when used by the holder.",
	},
	hastecharm: {
		name: "Haste Charm",
		shortDesc: "When held, skills that take two turns to use only take one.",
		isBerry: true,
		onBeforeMove(source, target, move) {
			if (move.volatileStatus === "twoturnmove") {
				delete move.volatileStatus;
				source.eatItem();
			}
		},
	},
	healingcharm: {
		name: "Healing Charm",
		shortDesc: "When held, it can recover 20 HP.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat(pokemon) {
			this.heal(20);
		},
	},
	heavyarmor: {
		name: "Heavy Armor",
		shortDesc: "A Puppet holding this always moves last within its priority bracket.",
		onFractionalPriority: -0.1,
	},
	hematite: {
		name: "Hematite",
		shortDesc: "Gray jewelry. Raises the power of Steel skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Steel' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	hematitehairpin: {
		name: "Hematite Hairpin",
		shortDesc: "When held, the power of Steel skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Steel') {
				return this.chainModify(1.2);
			}
		},
	},
	hexagoncharm: {
		name: "Hexagon Charm",
		shortDesc: "In a pinch, this will raise the Puppet's SpDef stat.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spd: 1});
		},
	},
	hopemask: {
		name: "Hope Mask",
		shortDesc: "A mask with a hopeful expression. Cannot be flinched while holding this item. This item cannot be disposed.",
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
	},
	ironclogs: {
		name: "Iron Clogs",
		shortDesc: "Heavy clogs made out of Iron. When held by a Puppet its speed will drop.",
		onModifySpe(spe, pokemon) {
			this.chainModify(0.5);
		},
	},
	ironwillribbon: {
		name: "Iron Will Ribbon",
		shortDesc: "If the Puppet holding this only knows 3 skills, the damage received will be reduced.",
		onFoeModifyDamage(relayVar, target, source, move) {
			var moveCount:number = 0;
			for (const move in target.moveSlots) {
				if (move) moveCount++;
			}
			if (moveCount === 3)
				this.chainModify(0.9);
		},
	},
	izanagiobject: {
		name: "Izanagi Object",
		shortDesc: "This Puppet has 1.5x speed while Kohryu is active.",
		ignoreKlutz: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isTerrain("kohryu"))
				this.chainModify(1.5);
		},
	},
	jade: {
		name: "Jade",
		shortDesc: "Jade jewelry. Raises the power of Wind skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Wind' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	jadehairpin: {
		name: "Jade Hairpin",
		shortDesc: "When held, the power of Wind skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Wind') {
				return this.chainModify(1.2);
			}
		},
	},
	jarofpoison: {
		name: "Jar of Poison",
		shortDesc: "Will heal 1/16th the Puppet's max HP if it's the Poison type. Otherwise the Puppet takes passive damage every turn.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hasType('Poison')) {
				this.heal(pokemon.baseMaxhp / 16);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
	},
	javelinarts: {
		name: "Javelin Arts",
		shortDesc: "A book detailing the tricks of battle. When held, the power of Javelin-type skills will be increased.",
		onBasePower(relayVar, source, target, move) {
			if (move.flags.javelin)
				this.chainModify(1.2);
		},
	},
	lapishairpin: {
		name: "Lapis Hairpin",
		shortDesc: "When held, the power of Warped skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Warped') {
				return this.chainModify(1.2);
			}
		},
	},
	lapislazuli: {
		name: "Lapis Lazuli",
		shortDesc: "Ultramarine jewelry. Raises the power of Warped skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Warped' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	largeshield: {
		name: "Large Shield",
		shortDesc: "When held, resisted attacks will deal reduced damage, and barrier piercing attacks will deal more damage.",
		onSourceModifyDamage(relayVar, source, target, move) {
			if (move) {
				switch (target.getMoveHitData(move).typeMod) {
					case 1:
						this.chainModify(2);
						break;
					case -1:
						this.chainModify(0.5);
						break;
				}
			}
		},
	},
	laylasamulet: { // Useless
		name: "Layla's Amulet",
		shortDesc: "Hidden under an old photograph. When held by a Puppet, the item drop rates from battle are doubled.",
	},
	lifecharm: {
		name: "Life Charm",
		shortDesc: "When held, a Puppet will restore 25% HP once its health drops below 50% HP.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 4);
		},
	},
	lightcharm: {
		name: "Light Charm",
		shortDesc: "When held, it can recover from Darkness.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status['dark']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status['dark']) {
				pokemon.cureStatus('dark');
			}
		},
	},
	magicring: {
		name: "Magic Ring",
		shortDesc: "A mysterious ring. When held the chance of critical hits is more likely.",
		onModifyCritRatio(relayVar, source, target, move) {
			return relayVar + 1;
		},
	},
	massagecharm: {
		name: "Massage Charm",
		shortDesc: "When held, it can recover from Paralysis.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'par' || pokemon.status === 'shk') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'par' || pokemon.status === 'shk') {
				pokemon.cureStatus();
			}
		},
	},
	morganite: {
		name: "Morganite",
		shortDesc: "Peony-colored jewelry. Raises the power of Illusion skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Illusion' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	nativegrace: { // Useless
		name: "Native Grace",
		shortDesc: "A charm given by Suwako. If held, EXP and PP gain in battle will be doubled.",
	},
	obsidian: {
		name: "Obsidian",
		shortDesc: "Black jewelry. Raises the power of Dark skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Dark' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	obsidianhairpin: {
		name: "Obsidian Hairpin",
		shortDesc: "When held, the power of Dark skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dark') {
				return this.chainModify(1.2);
			}
		},
	},
	ointmentcharm: {
		name: "Ointment Charm",
		shortDesc: "When held, it can recover from Burn.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'hvybrn') {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'hvybrn') {
				pokemon.cureStatus();
			}
		},
	},
	onyx: {
		name: "Onyx",
		shortDesc: "Striped jewelry. Raises the power of Sound skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Sound' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	onyxhairpin: {
		name: "Onyx Hairpin",
		shortDesc: "When held, the power of Sound skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Sound') {
				return this.chainModify(1.2);
			}
		},
	},
	opal: {
		name: "Opal",
		shortDesc: "Rainbow jewelry. Raises the power of Light skills once.",
		isBerry: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Light' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	opalhairpin: {
		name: "Opal Hairpin",
		shortDesc: "When held, the power of Light skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Light') {
				return this.chainModify(1.2);
			}
		},
	},
	outlookglasses: {
		name: "Outlook Glasses",
		shortDesc: "When held, the foe's held item will be identified.",
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-message', `${pokemon.name} can see the foe's ${target.getItem().name} with their Outlook Glasses!`);
					this.add('-item', target, target.getItem().name, '[from] item: Outlook Glasses', '[of] ' + pokemon, '[identify]', '[silent]');
				}
				else {
					this.add('-message', `${pokemon.name} can see the foe has no item with their Outlook Glasses!`);
				}
			}
		},
	},
	pinpointcharm: {
		name: "Pinpoint Charm",
		shortDesc: "In a pinch, this will raise the Puppet's Accuracy stat.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({accuracy: 1});
		},
	},
	puresand: {
		name: "Pure Sand",
		shortDesc: "This Puppet has 1.5x accuracy while Genbu is active.",
		onFoeModifyAccuracy(relayVar, target, source, move) {
			if (this.field.isTerrain("genbu"))
				this.chainModify(0.5);
		},
	},
	purifycharm: {
		name: "Purify Charm",
		shortDesc: "When held, if the holder's stats are lowered, the lowered stats will be reverted.",
		isBerry: true,
		onAfterBoost(boost, target, source, effect) {
			const revertBoosts:Partial<BoostsTable> = {};
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					revertBoosts[i]! = boost[i]! * -1;
				}
			}
			this.boost(revertBoosts);
			target.eatItem();
		},
	},
	quartzhairpin: {
		name: "Quartz Hairpin",
		shortDesc: "When held, the power of Earth skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Earth') {
				return this.chainModify(1.2);
			}
		},
	},
	radianthairpin: {
		name: "Radiant Hairpin",
		shortDesc: "This Puppet's skills gain 1% more power for each percent above 70%.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			function remap(value:number, low1:number, high1:number, low2:number, high2:number):number {
				return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
			}

			if (user.hp >= user.maxhp * 0.99) 
				return this.chainModify(remap(user.hp/user.maxhp, 0.99, 1, 1.2, 1.3));
			else
				return this.chainModify(remap(user.hp/user.maxhp, 0, 0.99, 0, 1.2));
		},
	},
	rebelliontome: {
		name: "Rebellion Tome",
		shortDesc: "When held, if the user receives a barrier-piercing attack, FoAtk and SpAtk sharply raise.",
		onDamagingHit(damage, target, source, move) {
			if (target.getMoveHitData(move).typeMod > 0)
				this.boost({atk: 2, spa: 2});
		},
	},
	redring: {
		name: "Red Ring",
		shortDesc: "When held, the power of Fo.Atk skills is raised.",
		onModifyAtkPriority: 1,
		onModifyAtk(spa, pokemon) {
			return this.chainModify(1.1);
		},
	},
	reflectbit: {
		name: "Reflect Bit",
		shortDesc: "When held, if you receive damage from a EN-skill, damage will be dealt back to the attacker.",
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	reliefcharm: {
		name: "Relief Charm",
		shortDesc: "When held, it can recover from Fear.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status['fear']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status['fear']) {
				pokemon.cureStatus('fear');
			}
		},
	},
	repetitivearts: {
		name: "Repetitive Arts",
		shortDesc: "A book detailing the tricks of battle. A skill will deal more damage if it is used in repetition.",
		onStart(pokemon) {
			pokemon.addVolatile('repetitivearts');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('repetitivearts')) {
					pokemon.removeVolatile('repetitivearts');
					return;
				}
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
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
				return this.chainModify(this.effectState.numConsecutive ? 1.2 : 1);
			},
		},
	},
	retreatmanual: {
		name: "Retreat Manual",
		shortDesc: "The defender will switch places with another Puppet in their party after the holder has been attacked.",
		onAfterMoveSecondaryPriority: 2,
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && target.hp && move && move.category !== 'Status' && !move.flags.futuremove) {
				if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.beingCalledBack || target.isSkyDropped()) return;
				if (target.volatiles['commanding'] || target.volatiles['commanded']) return;
				for (const pokemon of this.getAllActive()) {
					if (pokemon.switchFlag === true) return;
				}
				target.switchFlag = true;
				if (target.useItem()) {
					source.switchFlag = false;
				} else {
					target.switchFlag = false;
				}
			}
		},
	},
	rosary: {
		name: "Rosary",
		shortDesc: "When held by a Puppet, it will be less likely to be hit by an opposing Puppet's skills.",
		onModifyAccuracy(relayVar, target, source, move) {
			this.chainModify(0.9);
		},
	},
	rotationcharm: {
		name: "Rotation Charm",
		shortDesc: "In a pinch, this will sharply raise one random stat.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in pokemon.boosts) {
				if (stat !== 'accuracy' && stat !== 'evasion' && pokemon.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 2;
				this.boost(boost);
			}
		},
	},
	ruby: {
		name: "Ruby",
		shortDesc: "Red jewelry. Raises the power of Fire skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fire' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	rubyhairpin: {
		name: "Ruby Hairpin",
		shortDesc: "When held, the power of Fire skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fire') {
				return this.chainModify(1.2);
			}
		},
	},
	sandgodstone: {
		name: "Sand Godstone",
		shortDesc: "Lengthens duration of the Dust Storm when used by the holder.",
	},
	sapphire: {
		name: "Sapphire",
		shortDesc: "Light blue jewelry. Raises the power of Water skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Water' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	sapphirehairpin: {
		name: "Sapphire Hairpin",
		shortDesc: "When held, the power of Water skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Water') {
				return this.chainModify(1.2);
			}
		},
	},
	sereingodstone: {
		name: "Serein Godstone",
		shortDesc: "Lengthens duration of Sunshower when used by the holder.",
	},
	silentgodstone: {
		name: "Silent Godstone",
		shortDesc: "Lengthens duration of the Calm when used by the holder.",
	},
	silverhairpin: {
		name: "Silver Hairpin",
		shortDesc: "The Puppet holding this will have increased SpDef, but it will not be able to use support skills.",
		onModifyDefPriority: 15,
		onModifySpD(relayVar, target, source, move) {
			this.chainModify(1.5);
		},
		onTryMove(source, target, move) {
			if (move.category === "Status")
				return null;
		},
	},
	silvertalisman: {
		name: "Silver Talisman",
		shortDesc: "When held, if the user receives a Sp.Atk, Sp.Def is raised.",
		onAfterBoost(boost, target, source, effect) {
			if (boost.spa && target.useItem())
				this.boost({spd: boost.spa});
		},
	},
	skirmishercharm: {
		name: "Skirmisher Charm",
		shortDesc: "In a pinch, this will raise the Puppet's Speed stat.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spe: 1});
		},
	},
	smallbit: {
		name: "Small Bit",
		shortDesc: "If the holder is hit with a low-power skill the opponent also takes damage.",
		onDamagingHit(damage, target, source, move) {
			if (move.basePower <= 70)
				source.damage(source.baseMaxhp / 8);
		},
	},
	spirittorch: {
		name: "Spirit Torch",
		shortDesc: "Opposing puppets lose 1/8 max HP at the end of each turn while Suzaku is active.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (this.field.isTerrain("suzaku")) {
				for (const foe of pokemon.foes()) {
					foe.damage(foe.baseMaxhp/8);
				}
			}
		},
	},
	strawdoll: {
		name: "Straw Doll",
		shortDesc: "Straw doll that is used for magic. When held a Puppet's skills become stronger.",
		onModifyDamage(damage, source, target, move) {
			return this.chainModify(1.3);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status') {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.items.get('strawdoll'));
			}
		},
	},
	sturdyrope: {
		name: "Sturdy Rope",
		shortDesc: "A sturdy rope that increases the power of binding moves when held.",
		//Implemented in conditions.ts
	},
	substitutetag: {
		name: "Substitute Tag",
		shortDesc: "An amulet with a human carved into it. Allows the holder to switch out even if it would normally be trapped.",
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
	},
	sugilite: {
		name: "Sugilite",
		shortDesc: "Dark purple jewelry. Raises the power of Nether skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Nether' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	sugilitehairpin: {
		name: "Sugilite Hairpin",
		shortDesc: "When held, the power of Nether skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Nether') {
				return this.chainModify(1.2);
			}
		},
	},
	telescope: {
		name: "Telescope",
		shortDesc: "Increases the holder's accuracy if it moves after the foe.",
		onFoeModifyAccuracy(relayVar, defender, pokemon, move) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				return this.chainModify(0.8);
			}
		},
	},
	tengugeta: {
		name: "Tengu Geta",
		shortDesc: "Holder is immune to hazards.",
		// Implemented in moves.ts
	},
	thorncharm: {
		name: "Thorn Charm",
		shortDesc: "When held, if attacked by a foe with a FoAtk, the attacker will lose 1/8th of their max HP.",
		isBerry: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === "Physical") {
				source.damage(source.baseMaxhp/8);
			}
		},
	},
	tigereye: {
		name: "Tiger Eye",
		shortDesc: "Brown jewelry. Raises the power of Earth skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Earth' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	topaz: {
		name: "Topaz",
		shortDesc: "Yellow jewelry. Raises the power of Electric skills once.",
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Electric' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	topazhairpin: {
		name: "Topaz Hairpin",
		shortDesc: "When held, the power of Electric skills is boosted.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Electric') {
				return this.chainModify(1.2);
			}
		},
	},
	tsuzumidrum: {
		name: "Tsuzumi Drum",
		shortDesc: "This puppet's skills have 1.3x power if they lack same-type attacks.",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			for (const moveSlot of user.moveSlots) {
				var moveData = this.dex.moves.get(moveSlot.move);
				if (moveData.category !== 'Status' && user.hasType(moveData.type)) {
					return;
				}
			}

			this.chainModify(1.3);
		},
	},
	twilightgodstone: {
		name: "Twilight Godstone",
		shortDesc: "Lengthens duration of the Heavy Fog when used by the holder.",
	},
	veecharm: {
		name: "Vee Charm",
		shortDesc: "In a pinch, this will raise the Puppet's SpAtk stat.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spa: 1});
		},
	},
	wedgecharm: {
		name: "Wedge Charm",
		shortDesc: "In a pinch, this will raise the Puppet's FoAtk stat.",
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({atk: 1});
		},
	},
	wolfsbaneroot: {
		name: "Wolfsbane Root",
		shortDesc: "A deadly poisonous root. Puppets holding this will be badly poisoned.",
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('tox', pokemon);
		},
	},
	woodensword: { // Useless
		name: "Wooden Sword",
		shortDesc: "A wooden sword designed for training. A Puppet holding this will increase the amount of PP it earns from battle.",
	},
	yggdrasilseed: {
		name: "Yggdrasil Seed",
		shortDesc: "This Puppet deals and takes 50% more damage while Seiryu is active.",
		onBasePowerPriority: 15,
		onBasePower(relayVar, source, target, move) {
			if (this.field.isTerrain('seiryu'))
				this.chainModify(1.5);
		},
		onFoeBasePowerPriority: 15,
		onFoeBasePower(relayVar, source, target, move) {
			if (this.field.isTerrain('seiryu'))
				this.chainModify(1.5);
		},
	},
	youmascrollblack: {
		name: "Youma Scroll: Black",
		shortDesc: "A scroll with a black hemming written by various youkai. This item cannot be disposed.",
		//Handled in Bibliophilia ability
	},
	youmascrollblue: {
		name: "Youma Scroll: Blue",
		shortDesc: "A scroll with a blue hemming written by various youkai. This item cannot be disposed.",
		//Handled in Bibliophilia ability
	},
	youmascrollred: {
		name: "Youma Scroll: Red",
		shortDesc: "A scroll with a red hemming written by various youkai. This item cannot be disposed.",
		//Handled in Bibliophilia ability
	},
	youmascrollwhite: {
		name: "Youma Scroll: White",
		shortDesc: "A scroll with a white hemming written by various youkai. This item cannot be disposed.",
		//Handled in Bibliophilia ability
	},
};