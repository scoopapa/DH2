'use strict';
exports.BattleAbilities = {
	"adminabuse": {
		desc: "This Pokemon's hammer-based attacks have their power multiplied by 1.2 and have any adverse effects to the user removed.",
		shortDesc: "This Pokemon's hammer-based attacks have 1.2x power and have their negative effects removed.",
		onModifyMove(move, pokemon) {
			if (['hammerarm', 'dragonhammer', 'woodhammer', 'icehammer', 'crabhammer', 'banhammer'].includes(move.id)) {
				if (move.recoil) delete move.recoil;
		  	if (move.self && move.self.boosts) {
		  		this.debug('eliminating possible stat drops on the user');
		  		for (const boost of move.self.boosts) {
		  			if (move.self.boosts[boost] < 0) delete move.self.boosts[boost];
		  		}
		  	}
			}
		},
		id: "adminabuse",
		name: "Admin Abuse",
	},
	"anability": {
		shortDesc: "It's an ability.",
		id: "anability",
		name: "An Ability",
	},
	"bigguy": {
		shortDesc: "Summons Gravity upon switch-in.",
		onStart(source) {
			this.field.addPseudoWeather('gravity');
		},
		id: "bigguy",
		name: "Big Guy",
	},
	"blademaster": {
		desc: "This Pokemon's sword- or cutting-based attacks have their power multiplied by 1.2 and have +1 to their crit ratio.",
		shortDesc: "This Pokemon's sword- or cutting-based attacks have 1.2x power and have +1 crit ratio.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (['sacredsword', 'leafblade', 'cut', 'nightslash', 'crosspoison', 'slash', 'razorwind', 'airslash', 'furycutter', 'falseswipe', 'psychocut', 'secretsword', 'xscissor', 'stratoblade', 'owtheedge', 'solarblade', '1000folds', 'tipthrust'].includes(move.id)) {
				this.debug('Blademaster boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onModifyCritRatio(critRatio, target, source, move) {
			if (target && ['sacredsword', 'leafblade', 'cut', 'nightslash', 'crosspoison', 'slash', 'razorwind', 'airslash', 'furycutter', 'falseswipe', 'psychocut', 'secretsword', 'xscissor', 'stratoblade', 'owtheedge', 'solarblade', '1000folds', 'tipthrust'].includes(move.id)) return critRatio + 1;
		},
		id: "blademaster",
		name: "Blademaster",
	},
	"boombox": {
		desc: "This Pokemon's sound-based attacks have their power multiplied by 1.2.",
		shortDesc: "This Pokemon's sound-based attacks have 1.2x power.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Boombox boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		id: "boombox",
		name: "Boombox",
	},
	"bonezone": {
		shortDesc: "This Pokemon's Bone-based moves ignore immunities.",
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (['bonemerang', 'boneclub', 'shadowbone', 'bonerush'].includes(move.id)) move.ignoreImmunity = true;
		},
		id: "bonezone",
		name: "Bone Zone",
	},
	"degenerate": {
		desc: "This Pokemon's Normal-type moves become Dark-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Dark type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Dark';
				move.degenerateBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.degenerateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "degenerate",
		name: "Degenerate",
		rating: 4,
	},
  "degradation": {
    desc: "This Pokemon's Dark-type attacks are super-effective against the Normal type.",
    shortDesc: "This Pokemon's Dark-type attacks are super-effective against Normal-types.",
		onSourceEffectiveness(typeMod, target, type, move) {
		   if (move && type === 'Normal' && move.type === 'Dark') return 1;
			 return typeMod;
		},
    id: "degradation",
    name: "Degradation",
  },
	"flareheal": {
		desc: "If this Pokemon is burned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP; burn's physical damage halving is ignored.",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when burned; no HP loss or reduction to the power of its physical moves.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.status === 'brn' && move.id !== 'facade') {
				return this.chainModify(2);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		id: "flareheal",
		name: "Flare Heal",
	},
	"ghostnote": {
		desc: "This Pokemon's sound-based moves become Ghost-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's sound-based moves become Ghost type.",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.flags['sound']) {
				move.type = 'Ghost';
			}
		},
		id: "ghostnote",
		name: "Ghost Note",
	},
	"hydrophile": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Water-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Hydrophile boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Hydrophile boost');
				return this.chainModify(1.5);
			}
		},
		id: "hydrophile",
		name: "Hydrophile",
	},
	"inversion": {
		shortDesc: "Summons Inverse Room upon switch-in.",
		onStart(source) {
			this.field.addPseudoWeather('inverseroom');
		},
		id: "inversion",
		name: "Inverse Room",
	},
	"jewelry": {
		shortDesc: "If this Pokemon has no item, it finds a gem matching the type of one of its moves at the end of this turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.item) return;
      let possibleTypes = [];
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.getMove(moveSlot.move);
				const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
				possibleTypes.push(moveType);
			}
			if (!possibleTypes.length) return;
			let randomType = this.sample(possibleTypes);
			pokemon.setItem(randomType.toLowerCase() + "gem");
			let item = pokemon.getItem();
			this.add('-item', pokemon, item, '[from] ability: Jewelry');
		},
		id: "jewelry",
		name: "Jewelry",
	},
	"madman": {
		shortDesc: "This Pokemon's contact moves have a 30% chance of confusing.",
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove(move) {
			if (!move || !move.flags['contact']) return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
		  	volatileStatus: 'confusion',
				ability: this.getAbility('madman'),
			});
		},
		id: "madman",
		name: "Madman",
	},
	"moreroom": {
		desc: "The duration of Inverse Room, Magic Room, Trick Room, and Wonder Room is increased by 2 turns if the effect is started by this Pokemon.",
		shortDesc: "When used, Room effects last 2 more turns.",
		id: "moreroom",
		name: "More Room",
		// implemented in the corresponding move
	},
  "pollution": {
    desc: "This Pokemon's Poison-type attacks are super-effective against the Water type.",
    shortDesc: "This Pokemon's Poison-type attacks are super-effective against Water-types.",
		onSourceEffectiveness(typeMod, target, type, move) {
		   if (move && type === 'Water' && move.type === 'Poison') return 1;
			 return typeMod;
		},
    id: "pollution",
    name: "Pollution",
  },
	"pozzed": {
		desc: "This Pokemon is immune to Poison-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Poison-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Poison moves; Poison immunity. Toxic Orb, Toxic Spikes, etc. and non-Poison-type moves can still Poison this Pokemon.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[from] ability: Pozzed');
				}
				return null;
			}
		},
		id: "pozzed",
		name: "Pozzed",
	},
	"puppeteer": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Bug-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Puppeteer boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Puppeteer boost');
				return this.chainModify(1.5);
			}
		},
		id: "puppeteer",
		name: "Puppeteer",
	},
	"rainpower": {
		desc: "If Rain Dance is active, this Pokemon's Special Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Rain Dance is active, this Pokemon's Sp. Atk is 1.5x; loses 1/8 max HP per turn.",
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.damage(target.maxhp / 8, target, target);
			}
		},
		id: "rainpower",
		name: "Rain Power",
	},
	"striker": {
		desc: "This Pokemon's kick-based attacks have their power multiplied by 1.2 and ignore accuracy checks to always hit.",
		shortDesc: "This Pokemon's kick-based attacks have 1.2x power and always hit.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (['jumpkick', 'highjumpkick', 'blazekick', 'doublekick', 'lowkick', 'triplekick', 'rollingkick', 'shadowkick'].includes(move.id)) {
				this.debug('Striker boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (['jumpkick', 'highjumpkick', 'blazekick', 'doublekick', 'lowkick', 'triplekick', 'rollingkick', 'shadowkick'].includes(move.id)) {
				this.debug('Striker - ensuring perfect accuracy');
				return true;
			}
		},
		id: "striker",
		name: "Striker",
	},
	"suddenly": {
    shortDesc: "This Pokemon's two-turn moves complete in one turn (except Sky Drop).",
		onChargeMove(pokemon, target, move) {
				this.debug('suddenly - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', pokemon, move.name, target);
				return false; // skip charge turn
		},
		id: "suddenly",
		name: "Suddenly",
	},
	"woke": {
		desc: "Pokemon making contact with this Pokemon have their Ability changed to Woke. Does not affect the Battle Bond, Comatose, Disguise, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, and Zen Mode Abilities.",
		shortDesc: "Pokemon making contact with this Pokemon have their Ability changed to Woke.",
		id: "woke",
		name: "Woke",
		onAfterDamage(damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact'] && source.ability !== 'woke') {
				let oldAbility = source.setAbility('woke', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Woke', this.getAbility(oldAbility).name, '[of] ' + source);
				}
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
		},
	},
	"woodenguard": {
		shortDesc: "This Pokemon recieves 1.5x damage from Fire moves, 0.75x from other moves.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') return this.chainModify(1.5);
			return this.chainModify(0.75);
		},
		id: "woodenguard",
		name: "Wooden Guard",
	},
};
