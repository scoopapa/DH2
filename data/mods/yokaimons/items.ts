export const Items: {[k: string]: ModdedItemData} = {
	wornbangle: {
		name: "Worn Bangle",
		shortDesc: "Holder's Strength is +20, but their Speed is -10.",
		desc: "Holder's Strength is increased by 20 points, but their Speed is reduced by 10 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return atk + 20;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 10);
		},
	},
	rockerwrist: {
		name: "Rocker Wrist",
		shortDesc: "Holder's Strength is +36, but their Speed is -20.",
		desc: "Holder's Strength is increased by 36 points, but their Speed is reduced by 20 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return atk + 36;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 20);
		},
	},
	brutebracer: {
		name: "Brute Bracer",
		shortDesc: "Holder's Strength is +50, but their Speed is -30.",
		desc: "Holder's Strength is increased by 50 points, but their Speed is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return atk + 50;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 30);
		},
	},
	sunbracelet: {
		name: "Sun Bracelet",
		shortDesc: "Holder's Strength is +70, but their Speed is -40.",
		desc: "Holder's Strength is increased by 70 points, but their Speed is reduced by 40 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return atk + 70;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 40);
		},
	},
	fiendband: {
		name: "Fiend Band",
		shortDesc: "Holder's Strength is +100, but their Speed is -100.",
		desc: "Holder's Strength is increased by 100 points, but their Speed is reduced by 100 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return atk + 100;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 100);
		},
	},
	rustyring: {
		name: "Rusty Ring",
		shortDesc: "Holder's Spirit is +20, but their Speed is -10.",
		desc: "Holder's Spirit is increased by 20 points, but their Speed is reduced by 10 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifySpA(spa, pokemon) {
			return spa + 20;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 10);
		},
	},
	prettyring: {
		name: "Pretty Ring",
		shortDesc: "Holder's Spirit is +36, but their Speed is -20.",
		desc: "Holder's Spirit is increased by 36 points, but their Speed is reduced by 20 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifySpA(spa, pokemon) {
			return spa + 36;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 20);
		},
	},
	illusionring: {
		name: "Illusion Ring",
		shortDesc: "Holder's Spirit is +50, but their Speed is -30.",
		desc: "Holder's Spirit is increased by 50 points, but their Speed is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifySpA(spa, pokemon) {
			return spa + 50;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 30);
		},
	},
	lunarring: {
		name: "Lunar Ring",
		shortDesc: "Holder's Spirit is +70, but their Speed is -40.",
		desc: "Holder's Spirit is increased by 70 points, but their Speed is reduced by 40 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifySpA(spa, pokemon) {
			return spa + 70;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 40);
		},
	},
	fiendring: {
		name: "Fiend Ring",
		shortDesc: "Holder's Spirit is +100, but their Speed is -100.",
		desc: "Holder's Spirit is increased by 100 points, but their Speed is reduced by 100 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifySpA(spa, pokemon) {
			return spa + 100;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 100);
		},
	},
	firering: {
		name: "Fire Ring",
		shortDesc: "Holder deals 1.3x damage with and receives 1.5x damage from Fire attacks.",
		desc: "Holder deals 1.3x damage with and receives 1.5x damage from Fire attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fire') {
				return this.chainModify(1.3);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') {
				return this.chainModify(1.5);
			}
		},
	},
	waterring: {
		name: "Water Ring",
		shortDesc: "Holder deals 1.3x damage with and receives 1.5x damage from Water attacks.",
		desc: "Holder deals 1.3x damage with and receives 1.5x damage from Water attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Water') {
				return this.chainModify(1.3);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.5);
			}
		},
	},
	lightningring: {
		name: "Lightning Ring",
		shortDesc: "Holder deals 1.3x damage with and receives 1.5x damage from Electric attacks.",
		desc: "Holder deals 1.3x damage with and receives 1.5x damage from Electric attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Electric') {
				return this.chainModify(1.3);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify(1.5);
			}
		},
	},
	earthring: {
		name: "Earth Ring",
		shortDesc: "Holder deals 1.3x damage with and receives 1.5x damage from Rock attacks.",
		desc: "Holder deals 1.3x damage with and receives 1.5x damage from Rock attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Rock') {
				return this.chainModify(1.3);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock') {
				return this.chainModify(1.5);
			}
		},
	},
	icering: {
		name: "Ice Ring",
		shortDesc: "Holder deals 1.3x damage with and receives 1.5x damage from Ice attacks.",
		desc: "Holder deals 1.3x damage with and receives 1.5x damage from Ice attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Ice') {
				return this.chainModify(1.3);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.5);
			}
		},
	},
	windring: {
		name: "Wind Ring",
		shortDesc: "Holder deals 1.3x damage with and receives 1.5x damage from Flying attacks.",
		desc: "Holder deals 1.3x damage with and receives 1.5x damage from Flying attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Flying') {
				return this.chainModify(1.3);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying') {
				return this.chainModify(1.5);
			}
		},
	},
	agedcharm: {
		name: "Aged Charm",
		shortDesc: "Holder's Defense is +20, but their Spirit is -10.",
		desc: "Holder's Defense is increased by 20 points, but their Spirit is reduced by 10 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return def + 20;
		},
		onModifySpA(spa, pokemon) {
			return Math.max(1, spa - 10);
		},
	},
	runiccharm: {
		name: "Runic Charm",
		shortDesc: "Holder's Defense is +36, but their Spirit is -20.",
		desc: "Holder's Defense is increased by 36 points, but their Spirit is reduced by 20 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return def + 36;
		},
		onModifySpA(spa, pokemon) {
			return Math.max(1, spa - 20);
		},
	},
	armorcharm: {
		name: "Armor Charm",
		shortDesc: "Holder's Defense is +50, but their Spirit is -30.",
		desc: "Holder's Defense is increased by 50 points, but their Spirit is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return def + 50;
		},
		onModifySpA(spa, pokemon) {
			return Math.max(1, spa - 30);
		},
	},
	galaxycharm: {
		name: "Galaxy Charm",
		shortDesc: "Holder's Defense is +70, but their Spirit is -40.",
		desc: "Holder's Defense is increased by 70 points, but their Spirit is reduced by 40 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return def + 70;
		},
		onModifySpA(spa, pokemon) {
			return Math.max(1, spa - 40);
		},
	},
	fiendcharm: {
		name: "Fiend Charm",
		shortDesc: "Holder's Defense is +100, but their Spirit is -100.",
		desc: "Holder's Defense is increased by 100 points, but their Spirit is reduced by 100 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return def + 100;
		},
		onModifySpA(spa, pokemon) {
			return Math.max(1, spa - 100);
		},
	},
	blazecharm: {
		name: "Blaze Charm",
		shortDesc: "Holder takes 0.5x damage from Fire attacks but their Defense is -30.",
		desc: "Holder takes 0.5x damage from Fire attacks but their Defense is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return Math.max(1, def - 30);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
	},
	floodcharm: {
		name: "Flood Charm",
		shortDesc: "Holder takes 0.5x damage from Water attacks but their Defense is -30.",
		desc: "Holder takes 0.5x damage from Water attacks but their Defense is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return Math.max(1, def - 30);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
	},
	boltcharm: {
		name: "Bolt Charm",
		shortDesc: "Holder takes 0.5x damage from Electric attacks but their Defense is -30.",
		desc: "Holder takes 0.5x damage from Electric attacks but their Defense is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return Math.max(1, def - 30);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify(0.5);
			}
		},
	},
	quakecharm: {
		name: "Quake Charm",
		shortDesc: "Holder takes 0.5x damage from Rock attacks but their Defense is -30.",
		desc: "Holder takes 0.5x damage from Rock attacks but their Defense is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return Math.max(1, def - 30);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock') {
				return this.chainModify(0.5);
			}
		},
	},
	frostcharm: {
		name: "Frost Charm",
		shortDesc: "Holder takes 0.5x damage from Ice attacks but their Defense is -30.",
		desc: "Holder takes 0.5x damage from Ice attacks but their Defense is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return Math.max(1, def - 30);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
	},
	stormcharm: {
		name: "Storm Charm",
		shortDesc: "Holder takes 0.5x damage from Flying attacks but their Defense is -30.",
		desc: "Holder takes 0.5x damage from Flying attacks but their Defense is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return Math.max(1, def - 30);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying') {
				return this.chainModify(0.5);
			}
		},
	},
	simplebadge: {
		name: "Simple Badge",
		shortDesc: "Holder's Speed is +20, but their Strength is -10.",
		desc: "Holder's Speed is increased by 20 points, but their Strength is reduced by 10 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return Math.max(1, atk - 10);
		},
		onModifySpe(spe, pokemon) {
			return spe + 20;
		},
	},
	shinybadge: {
		name: "Shiny Badge",
		shortDesc: "Holder's Speed is +36, but their Strength is -20.",
		desc: "Holder's Speed is increased by 36 points, but their Strength is reduced by 20 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return Math.max(1, atk - 20);
		},
		onModifySpe(spe, pokemon) {
			return spe + 36;
		},
	},
	hermesbadge: {
		name: "Hermes Badge",
		shortDesc: "Holder's Speed is +50, but their Strength is -30.",
		desc: "Holder's Speed is increased by 50 points, but their Strength is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return Math.max(1, atk - 30);
		},
		onModifySpe(spe, pokemon) {
			return spe + 50;
		},
	},
	meteorbadge: {
		name: "Meteor Badge",
		shortDesc: "Holder's Speed is +70, but their Strength is -40.",
		desc: "Holder's Speed is increased by 70 points, but their Strength is reduced by 40 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return Math.max(1, atk - 40);
		},
		onModifySpe(spe, pokemon) {
			return spe + 70;
		},
	},
	fiendbadge: {
		name: "Fiend Badge",
		shortDesc: "Holder's Speed is +100, but their Strength is -100.",
		desc: "Holder's Speed is increased by 100 points, but their Strength is reduced by 100 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return Math.max(1, atk - 100);
		},
		onModifySpe(spe, pokemon) {
			return spe + 100;
		},
	},
	cicadasword: {
		name: "Cicada Sword",
		shortDesc: "Holder's Strength is +60 and their Speed is +40. Only usable by Cadin, Cadable, and Singcada.",
		desc: "Holder's Strength is increased by 60 points and their Speed is increased by 40 points. Only usable by Cadin, Cadable, and Singcada.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return atk + 60;
		},
		onModifySpe(spe, pokemon) {
			return spe + 40;
		},
		itemUser: ["Cadin", "Cadable", "Singcada"],
	},
	beefybell: {
		name: "Beefy Bell",
		shortDesc: "Holder's Strength is increased by 60 points. Only usable by cat Yo-kai.",
		desc: "Holder's Strength is increased by 60 points. Only usable by cat Yo-kai.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return atk + 60;
		},
		itemUser: ["Shogunyan", "Robonyan", "Goldenyan", "Jibanyan", "Baddinyan", "Thornyan", "Sapphinyan", "Emenyan", "Rubinyan", "Topanyan", "Dianyan"],
	},
	spellbell: {
		name: "Spell Bell",
		shortDesc: "Holder's Spirit is increased by 100 points. Only usable by cat Yo-kai.",
		desc: "Holder's Spirit is increased by 100 points. Only usable by cat Yo-kai.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifySpA(spa, pokemon) {
			return spa + 100;
		},
		itemUser: ["Shogunyan", "Robonyan", "Goldenyan", "Jibanyan", "Baddinyan", "Thornyan", "Sapphinyan", "Emenyan", "Rubinyan", "Topanyan", "Dianyan"],
	},
	toughbell: {
		name: "Tough Bell",
		shortDesc: "Holder's Defense is increased by 100 points. Only usable by cat Yo-kai.",
		desc: "Holder's Defense is increased by 100 points. Only usable by cat Yo-kai.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return def + 100;
		},
		itemUser: ["Shogunyan", "Robonyan", "Goldenyan", "Jibanyan", "Baddinyan", "Thornyan", "Sapphinyan", "Emenyan", "Rubinyan", "Topanyan", "Dianyan"],
	},
	speedbell: {
		name: "Speed Bell",
		shortDesc: "Holder's Speed is increased by 60 points. Only usable by cat Yo-kai.",
		desc: "Holder's Speed is increased by 60 points. Only usable by cat Yo-kai.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifySpe(spe, pokemon) {
			return spe + 60;
		},
		itemUser: ["Shogunyan", "Robonyan", "Goldenyan", "Jibanyan", "Baddinyan", "Thornyan", "Sapphinyan", "Emenyan", "Rubinyan", "Topanyan", "Dianyan"],
	},
	bigbottle: {
		name: "Big Bottle",
		shortDesc: "Holder deals 1.2x damage with Water attacks.",
		desc: "Holder deals 1.2x damage with Water attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Water') {
				return this.chainModify(1.2);
			}
		},
	},
	tengufan: {
		name: "Tengu Fan",
		shortDesc: "Holder's Spirit and Speed are +200. Only usable by Tengu and Flengu.",
		desc: "Holder's Spirit is increased by 200 points and their Speed is increased by 200 points. Only usable by Tengu and Flengu.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifySpA(spa, pokemon) {
			return spa + 200;
		},
		onModifySpe(spe, pokemon) {
			return spe + 200;
		},
		itemUser: ["Tengu", "Flengu"],
	},
	cheerycoat: {
		name: "Cheery Coat",
		shortDesc: "Holder's Speed is +100. Only usable by Wiglin, Steppa, and Rhyth.",
		desc: "Holder's Speed is increased by 100 points. Only usable by Wiglin, Steppa, and Rhyth.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifySpe(spe, pokemon) {
			return spe + 100;
		},
		itemUser: ["Wiglin", "Steppa", "Rhyth"],
	},
	nailbat: {
		name: "Nail Bat",
		shortDesc: "Holder's Strength is +100, but their Speed is -100. Only usable by Badude and Bruff.",
		desc: "Holder's Strength is increased by 100 points, but their Speed is reduced by 100 points. Only usable by Badude and Bruff.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return atk + 100;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 100);
		},
		itemUser: ["Badude", "Bruff"],
	},
	reversword: {
		name: "Reversword",
		shortDesc: "Holder's Strength and Spirit are +60. Only usable by D and E-rank Yo-kai.",
		desc: "Holder's Strength and Spirit are increased by 60 points. Only usable by D and E-rank Yo-kai.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			const tier = pokemon.species.tier as string;
 		    if (tier === 'D Rank' || tier === 'E Rank') {
				return atk + 60;
			}
		},
		onModifySpA(spa, pokemon) {
			const tier = pokemon.species.tier as string;
 		    if (tier === 'D Rank' || tier === 'E Rank') {
				return spa + 60;
			}
		},
		// itemUser: [], -- will use this if needed
	},
	turnabeads: {
		name: "Turnabeads",
		shortDesc: "Holder's Spirit and Defense are +60. Only usable by D and E-rank Yo-kai.",
		desc: "Holder's Spirit and Defense are increased by 60 points. Only usable by D and E-rank Yo-kai.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			const tier = pokemon.species.tier as string;
 		    if (tier === 'D Rank' || tier === 'E Rank') {
				return def + 60;
			}
		},
		onModifySpA(spa, pokemon) {
			const tier = pokemon.species.tier as string;
 		    if (tier === 'D Rank' || tier === 'E Rank') {
				return spa + 60;
			}
		},
		// itemUser: [], -- will use this if needed
	},
	reflector: {
		name: "Reflector",
		shortDesc: "Holder's Defense and Speed are +60. Only usable by D and E-rank Yo-kai.",
		desc: "Holder's Defense and Speed are increased by 60 points. Only usable by D and E-rank Yo-kai.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			const tier = pokemon.species.tier as string;
 		    if (tier === 'D Rank' || tier === 'E Rank') {
				return def + 60;
			}
		},
		onModifySpe(spe, pokemon) {
			const tier = pokemon.species.tier as string;
 		    if (tier === 'D Rank' || tier === 'E Rank') {
				return spe + 60;
			}
		},
		// itemUser: [], -- will use this if needed
	},
	ritzystuds: {
		name: "Ritzy Studs",
		shortDesc: "Increases the holder's critical hit ratio by 1 stage.",
		desc: "Increases the holder's critical hit ratio by 1 stage.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
	},
	sleepnstudy: {
		name: "Sleep 'n' Study",
		shortDesc: "Holder has a 33% chance of Loafing each turn, but Loafing increases all of its stats by 1 stage.",
		desc: "Holder has a 33% chance of Loafing each turn, but Loafing increases all of its stats by 1 stage.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
			pokemon.volatiles['loafing'].loafChance += 33;
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['loafing']) return;
			pokemon.volatiles['loafing'].loafChance -= 33;
			if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
		},
	},
	dieoffate: {
		name: "Die of Fate",
		shortDesc: "Increases the holder's crit rate 2 stages, but attacks targeting them are guaranteed to crit.",
		desc: "Increases the holder's critical hit ratio 2 stages, but attacks targeting them are guaranteed to crit.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 2;
		},
		onSourceModifyCritRatio(critRatio, source, target) {
    		return 5;
		},
	},
	ironplates: {
		name: "Iron Plates",
		shortDesc: "Holder's Defense is +30 and they cannot be crit, but their Speed is -30.",
		desc: "Holder's Defense is increased by 30 points and they cannot be critical hit, but their Speed is reduced by 30 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			return def + 30;
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 30);
		},
		onCriticalHit(pokemon, source, move) {
			return false;
		},
	},
	thickspecs: {
		name: "Thick Specs",
		shortDesc: "Holder's physical attacks cannot miss, but their Strength is 0.8x.",
		desc: "Holder's physical attacks cannot miss, but the holder's Strength is 0.8x.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return this.chainModify(0.8);
		},
		onModifyAccuracyPriority: 1,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Physical') return true;
		},
	},
	ancientscale: {
		name: "Ancient Scale",
		shortDesc: "Holder has a 50% chance to dodge negative Inspirits.",
		desc: "Holder has a 50% chance to dodge negative Inspirits.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (typeof accuracy !== 'number') return;
			if (target === this.effectState.target && move.type === 'Inspirit') {
				if (!this.randomChance(1, 2)) return false;
			}
		},
	},
	venoctgauntlet: {
		name: "Venoct Gauntlet",
		shortDesc: "Holder's Soultimate gains an additional charge at the end of each turn, but they have a 33% chance of Loafing each turn.",
		desc: "Holder's Soultimate gains an additional charge at the end of each turn, but they have a 33% chance of Loafing each turn.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
			pokemon.volatiles['loafing'].loafChance += 33;
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['loafing']) return;
			pokemon.volatiles['loafing'].loafChance -= 33;
			if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
		},
		onResidualOrder: 10,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.soultimateCharge !== undefined) {
				const move = pokemon.soultimateMove ? this.dex.moves.get(pokemon.soultimateMove) : null;
				const maxCharge = move?.soultimateMaxCharge ?? 0;
				if (pokemon.soultimateCharge < maxCharge) {
					pokemon.soultimateCharge++;
				}
			}
		},
	},
	heavenlysash: {
		name: "Heavenly Sash",
		shortDesc: "Holder restores 1/16 of their max HP at the end of each turn.",
		desc: "Holder restores 1/16 of their max HP at the end of each turn.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
	},
	skimask: {
		name: "Ski Mask",
		shortDesc: "Holder has a 33% chance to dodge attacks.",
		desc: "Holder has a 33% chance to dodge attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (typeof accuracy !== 'number') return;
			if (target === this.effectState.target && this.randomChance(1, 3)) return false;
		},
	},
	stickerofhate: {
		name: "Sticker of Hate",
		shortDesc: "Foes targeting an ally of the holder will target the holder instead, but the holder takes 1.5x damage from all attacks.",
		desc: "Foes targeting an ally of the holder will target the holder instead, but the holder takes 1.5x damage from all attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onFoeRedirectTargetPriority: 1,
		onFoeRedirectTarget(target, source, source2, move) {
			const holder = this.effectState.target;
			if (target !== holder && target.isAlly(holder) && !holder.isSkyDropped() && this.validTarget(holder, source, move.target)) {
				if (move.smartTarget) move.smartTarget = false;
        		this.add('-activate', holder, 'item: Sticker of Hate');
				return holder;
			}
		},
		onSourceModifyDamage(damage, source, target) {
			if (target === this.effectState.target) {
				return this.chainModify(1.5);
			}
		},
	},
	vampiricfangs: {
		name: "Vampiric Fangs",
		shortDesc: "Holder restores HP equal to 25% of the damage dealt by its attacks.",
		desc: "Holder restores HP equal to 25% of the damage dealt by its attacks.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onDamagingHit(damage, target, source, move) {
			this.add('-activate', source, 'item: Vampiric Fangs');
			this.heal(Math.floor(damage * 0.25), source);
		},
	},
	crystalball: {
		name: "Crystal Ball",
		shortDesc: "Prevents other Yo-kai from lowering the holder's stats.",
		desc: "Prevents other Yo-kai from lowering the holder's stats.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add('-fail', target, 'unboost', '[from] item: Crystal Ball', '[of] ' + target);
			}
		},
	},
	sleepillow: {
		name: "Sleepillow",
		shortDesc: "Holder restores 1/8 of their max HP at the end of each turn, but has a 33% chance to Loaf each turn.",
		desc: "Holder restores 1/8 of their max HP at the end of each turn, but has a 33% chance to Loaf each turn.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
			pokemon.volatiles['loafing'].loafChance += 33;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['loafing']) return;
			pokemon.volatiles['loafing'].loafChance -= 33;
			if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
		},
	},
	restraintbelt: {
		name: "Restraint Belt",
		shortDesc: "All of the holder's stats are lowered by 100 points.",
		desc: "All of the holder's stats are lowered by 100 points.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		onModifyAtk(atk, pokemon) {
			return Math.max(1, atk - 100);
		},
		onModifyDef(def, pokemon) {
			return Math.max(1, def - 100);
		},
		onModifySpA(spa, pokemon) {
			return Math.max(1, spa - 100);
		},
		onModifySpe(spe, pokemon) {
			return Math.max(1, spe - 100);
		},
	},
	guardgem: {
		name: "Guard Gem",
		shortDesc: "The holder takes 1/6 damage while Guarding instead of 1/4.",
		desc: "The holder takes 1/6 damage while Guarding instead of 1/4.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
		// this item's effect is handled in Guard's code
	},
	monkeycirclet: {
		name: "Monkey Circlet",
		shortDesc: "No competitive effect.",
		desc: "No competitive effect.",
		isNonstandard: "Custom",
		fling: {
			basePower: 10,
		},
	},

	//removing every vanilla item
	abilityshield: null,
	abomasite: null,
	absolite: null,
	absorbbulb: null,
	adamantcrystal: null,
	adamantorb: null,
	adrenalineorb: null,
	aerodactylite: null,
	aggronite: null,
	aguavberry: null,
	airballoon: null,
	alakazite: null,
	aloraichiumz: null,
	altarianite: null,
	ampharosite: null,
	apicotberry: null,
	armorfossil: null,
	aspearberry: null,
	assaultvest: null,
	audinite: null,
	auspiciousarmor: null,
	babiriberry: null,
	banettite: null,
	beastball: null,
	beedrillite: null,
	belueberry: null,
	berryjuice: null,
	berrysweet: null,
	bignugget: null,
	bigroot: null,
	bindingband: null,
	blackbelt: null,
	blackglasses: null,
	blacksludge: null,
	blastoisinite: null,
	blazikenite: null,
	blueorb: null,
	blukberry: null,
	blunderpolicy: null,
	boosterenergy: null,
	bottlecap: null,
	brightpowder: null,
	buggem: null,
	bugmemory: null,
	buginiumz: null,
	burndrive: null,
	cameruptite: null,
	cellbattery: null,
	charcoal: null,
	charizarditex: null,
	charizarditey: null,
	chartiberry: null,
	cheriberry: null,
	cherishball: null,
	chestoberry: null,
	chilanberry: null,
	chilldrive: null,
	chippedpot: null,
	choiceband: null,
	choicescarf: null,
	choicespecs: null,
	chopleberry: null,
	clawfossil: null,
	clearamulet: null,
	cloversweet: null,
	cobaberry: null,
	colburberry: null,
	cornerstonemask: null,
	cornnberry: null,
	coverfossil: null,
	covertcloak: null,
	crackedpot: null,
	custapberry: null,
	damprock: null,
	darkgem: null,
	darkmemory: null,
	darkiniumz: null,
	dawnstone: null,
	decidiumz: null,
	deepseascale: null,
	deepseatooth: null,
	destinyknot: null,
	diancite: null,
	diveball: null,
	domefossil: null,
	dousedrive: null,
	dracoplate: null,
	dragonfang: null,
	dragongem: null,
	dragonmemory: null,
	dragonscale: null,
	dragoniumz: null,
	dreadplate: null,
	dreamball: null,
	dubiousdisc: null,
	durinberry: null,
	duskball: null,
	duskstone: null,
	earthplate: null,
	eeviumz: null,
	ejectbutton: null,
	ejectpack: null,
	electirizer: null,
	electricgem: null,
	electricmemory: null,
	electricseed: null,
	electriumz: null,
	enigmaberry: null,
	eviolite: null,
	expertbelt: null,
	fairiumz: null,
	fairyfeather: null,
	fairygem: null,
	fairymemory: null,
	fastball: null,
	fightinggem: null,
	fightingmemory: null,
	fightiniumz: null,
	figyberry: null,
	firegem: null,
	firememory: null,
	firestone: null,
	firiumz: null,
	fistplate: null,
	flameorb: null,
	flameplate: null,
	floatstone: null,
	flowersweet: null,
	flyinggem: null,
	flyingmemory: null,
	flyiniumz: null,
	focusband: null,
	focussash: null,
	fossilizedbird: null,
	fossilizeddino: null,
	fossilizeddrake: null,
	fossilizedfish: null,
	friendball: null,
	fullincense: null,
	galaricacuff: null,
	galaricawreath: null,
	galladite: null,
	ganlonberry: null,
	garchompite: null,
	gardevoirite: null,
	gengarite: null,
	ghostgem: null,
	ghostmemory: null,
	ghostiumz: null,
	glalitite: null,
	goldbottlecap: null,
	grassgem: null,
	grassmemory: null,
	grassiumz: null,
	grassyseed: null,
	greatball: null,
	grepaberry: null,
	gripclaw: null,
	griseouscore: null,
	griseousorb: null,
	groundgem: null,
	groundmemory: null,
	groundiumz: null,
	gyaradosite: null,
	habanberry: null,
	hardstone: null,
	healball: null,
	hearthflamemask: null,
	heatrock: null,
	heavyball: null,
	heavydutyboots: null,
	helixfossil: null,
	heracronite: null,
	hondewberry: null,
	houndoominite: null,
	iapapaberry: null,
	icegem: null,
	icememory: null,
	icestone: null,
	icicleplate: null,
	iciumz: null,
	icyrock: null,
	inciniumz: null,
	insectplate: null,
	ironball: null,
	ironplate: null,
	jabocaberry: null,
	jawfossil: null,
	kasibberry: null,
	kebiaberry: null,
	keeberry: null,
	kelpsyberry: null,
	kangaskhanite: null,
	kingsrock: null,
	kommoniumz: null,
	laggingtail: null,
	lansatberry: null,
	latiasite: null,
	latiosite: null,
	laxincense: null,
	leafstone: null,
	leek: null,
	leftovers: null,
	leppaberry: null,
	levelball: null,
	liechiberry: null,
	lifeorb: null,
	lightball: null,
	lightclay: null,
	loadeddice: null,
	lopunnite: null,
	loveball: null,
	lovesweet: null,
	lucarionite: null,
	luckypunch: null,
	lumberry: null,
	luminousmoss: null,
	lunaliumz: null,
	lureball: null,
	lustrousglobe: null,
	lustrousorb: null,
	luxuryball: null,
	lycaniumz: null,
	machobrace: null,
	magmarizer: null,
	magnet: null,
	magoberry: null,
	magostberry: null,
	mail: null,
	maliciousarmor: null,
	manectite: null,
	marangaberry: null,
	marshadiumz: null,
	masterball: null,
	masterpieceteacup: null,
	mawilite: null,
	meadowplate: null,
	medichamite: null,
	mentalherb: null,
	metagrossite: null,
	metalcoat: null,
	metalpowder: null,
	metronome: null,
	mewniumz: null,
	mewtwonitex: null,
	mewtwonitey: null,
	micleberry: null,
	mimikiumz: null,
	mindplate: null,
	miracleseed: null,
	mirrorherb: null,
	mistyseed: null,
	moonball: null,
	moonstone: null,
	muscleband: null,
	mysticwater: null,
	nanabberry: null,
	nestball: null,
	netball: null,
	nevermeltice: null,
	nomelberry: null,
	normalgem: null,
	normaliumz: null,
	occaberry: null,
	oddincense: null,
	oldamber: null,
	oranberry: null,
	ovalstone: null,
	pamtreberry: null,
	parkball: null,
	passhoberry: null,
	payapaberry: null,
	pechaberry: null,
	persimberry: null,
	petayaberry: null,
	pidgeotite: null,
	pikaniumz: null,
	pikashuniumz: null,
	pinapberry: null,
	pinsirite: null,
	pixieplate: null,
	plumefossil: null,
	poisonbarb: null,
	poisongem: null,
	poisonmemory: null,
	poisoniumz: null,
	pokeball: null,
	pomegberry: null,
	poweranklet: null,
	powerband: null,
	powerbelt: null,
	powerbracer: null,
	powerherb: null,
	powerlens: null,
	powerweight: null,
	premierball: null,
	primariumz: null,
	prismscale: null,
	protectivepads: null,
	protector: null,
	psychicgem: null,
	psychicmemory: null,
	psychicseed: null,
	psychiumz: null,
	punchingglove: null,
	qualotberry: null,
	quickball: null,
	quickclaw: null,
	quickpowder: null,
	rabutaberry: null,
	rarebone: null,
	rawstberry: null,
	razorclaw: null,
	razorfang: null,
	razzberry: null,
	reapercloth: null,
	redcard: null,
	redorb: null,
	repeatball: null,
	ribbonsweet: null,
	rindoberry: null,
	ringtarget: null,
	rockgem: null,
	rockincense: null,
	rockmemory: null,
	rockiumz: null,
	rockyhelmet: null,
	roomservice: null,
	rootfossil: null,
	roseincense: null,
	roseliberry: null,
	rowapberry: null,
	rustedshield: null,
	rustedsword: null,
	sablenite: null,
	sachet: null,
	safariball: null,
	safetygoggles: null,
	sailfossil: null,
	salacberry: null,
	salamencite: null,
	sceptilite: null,
	scizorite: null,
	scopelens: null,
	seaincense: null,
	sharpbeak: null,
	sharpedonite: null,
	shedshell: null,
	shellbell: null,
	shinystone: null,
	shockdrive: null,
	shucaberry: null,
	silkscarf: null,
	silverpowder: null,
	sitrusberry: null,
	skullfossil: null,
	skyplate: null,
	slowbronite: null,
	smoothrock: null,
	snorliumz: null,
	snowball: null,
	softsand: null,
	solganiumz: null,
	souldew: null,
	spelltag: null,
	spelonberry: null,
	splashplate: null,
	spookyplate: null,
	sportball: null,
	starfberry: null,
	starsweet: null,
	steelixite: null,
	steelgem: null,
	steelmemory: null,
	steeliumz: null,
	stick: null,
	stickybarb: null,
	stoneplate: null,
	strangeball: null,
	strawberrysweet: null,
	sunstone: null,
	swampertite: null,
	sweetapple: null,
	syrupyapple: null,
	tamatoberry: null,
	tangaberry: null,
	tapuniumz: null,
	tartapple: null,
	terrainextender: null,
	thickclub: null,
	throatspray: null,
	thunderstone: null,
	timerball: null,
	toxicorb: null,
	toxicplate: null,
	tr00: null,
	tr01: null,
	tr02: null,
	tr03: null,
	tr04: null,
	tr05: null,
	tr06: null,
	tr07: null,
	tr08: null,
	tr09: null,
	tr10: null,
	tr11: null,
	tr12: null,
	tr13: null,
	tr14: null,
	tr15: null,
	tr16: null,
	tr17: null,
	tr18: null,
	tr19: null,
	tr20: null,
	tr21: null,
	tr22: null,
	tr23: null,
	tr24: null,
	tr25: null,
	tr26: null,
	tr27: null,
	tr28: null,
	tr29: null,
	tr30: null,
	tr31: null,
	tr32: null,
	tr33: null,
	tr34: null,
	tr35: null,
	tr36: null,
	tr37: null,
	tr38: null,
	tr39: null,
	tr40: null,
	tr41: null,
	tr42: null,
	tr43: null,
	tr44: null,
	tr45: null,
	tr46: null,
	tr47: null,
	tr48: null,
	tr49: null,
	tr50: null,
	tr51: null,
	tr52: null,
	tr53: null,
	tr54: null,
	tr55: null,
	tr56: null,
	tr57: null,
	tr58: null,
	tr59: null,
	tr60: null,
	tr61: null,
	tr62: null,
	tr63: null,
	tr64: null,
	tr65: null,
	tr66: null,
	tr67: null,
	tr68: null,
	tr69: null,
	tr70: null,
	tr71: null,
	tr72: null,
	tr73: null,
	tr74: null,
	tr75: null,
	tr76: null,
	tr77: null,
	tr78: null,
	tr79: null,
	tr80: null,
	tr81: null,
	tr82: null,
	tr83: null,
	tr84: null,
	tr85: null,
	tr86: null,
	tr87: null,
	tr88: null,
	tr89: null,
	tr90: null,
	tr91: null,
	tr92: null,
	tr93: null,
	tr94: null,
	tr95: null,
	tr96: null,
	tr97: null,
	tr98: null,
	tr99: null,
	twistedspoon: null,
	tyranitarite: null,
	ultraball: null,
	ultranecroziumz: null,
	unremarkableteacup: null,
	upgrade: null,
	utilityumbrella: null,
	venusaurite: null,
	wacanberry: null,
	watergem: null,
	watermemory: null,
	waterstone: null,
	wateriumz: null,
	watmelberry: null,
	waveincense: null,
	weaknesspolicy: null,
	wellspringmask: null,
	wepearberry: null,
	whippeddream: null,
	whiteherb: null,
	widelens: null,
	wikiberry: null,
	wiseglasses: null,
	yacheberry: null,
	zapplate: null,
	zoomlens: null,
	berserkgene: null,
	berry: null,
	bitterberry: null,
	burntberry: null,
	goldberry: null,
	iceberry: null,
	mintberry: null,
	miracleberry: null,
	mysteryberry: null,
	pinkbow: null,
	polkadotbow: null,
	przcureberry: null,
	psncureberry: null,
	crucibellite: null,
	vilevial: null,
};