export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["TMFE", "TMNFE", "TMLC"],
	},
	init() {
		this.modData("Learnsets", "darmanitangalar").learnset.terablast = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.iceshard = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.lavaplume = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.bugbuzz = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.skittersmack = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.quiverdance = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.ragepowder = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.leechlife = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.bugbite = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.strugglebug = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.morningsun = ["9L1"];
		delete this.modData('Learnsets', 'fluttermane').learnset.moonblast;
		delete this.modData('Learnsets', 'fluttermane').learnset.mysticalfire;
		delete this.modData('Learnsets', 'fluttermane').learnset.dazzlinggleam;
		delete this.modData('Learnsets', 'fluttermane').learnset.drainingkiss;
		delete this.modData('Learnsets', 'fluttermane').learnset.charm;
		delete this.modData('Learnsets', 'fluttermane').learnset.mistyterrain;
		this.modData("Learnsets", "palafin").learnset.superpower = ["9L1"];
		delete this.modData('Learnsets', 'palafin').learnset.bulkup;
		delete this.modData('Learnsets', 'palafin').learnset.closecombat;
		this.modData("Learnsets", "ironbundle").learnset.surf = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.defog = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.haze = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.fakeout = ["9L1"];
		delete this.modData('Learnsets', 'ironbundle').learnset.freezedry;
		delete this.modData('Learnsets', 'ironbundle').learnset.hydropump;
		this.modData("Learnsets", "dracovish").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "dracovish").learnset.terablast = ["9L1"];
		this.modData("Learnsets", "annihilape").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "annihilape").learnset.strengthsap = ["9L1"];
		delete this.modData('Learnsets', 'annihilape').learnset.bulkup;
		delete this.modData('Learnsets', 'primeape').learnset.bulkup;
		delete this.modData('Learnsets', 'mankey').learnset.bulkup;    
  },
	actions: {
	inherit: true,
		newMaxPower(move) {
			let oldMaxPowers = [100, 110, 120, 130, 140, 150];
			let oldweakMaxPowers = [70, 80, 85, 90, 95, 100];
			let weakMaxPowers = [60, 70, 75, 80, 85, 90];
			let maxPowers = [80, 90, 100, 110, 120, 130];
			let maxNewPower = 110;
			if (!move.basePower) {
				return maxNewPower;
			} else if (!move.maxMove?.basePower){
				return null;
			} else if (['Fighting', 'Poison'].includes(move.type)) {
				for (const i in oldweakMaxPowers){
					if (move.maxMove?.basePower === oldweakMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else if (['Flying'].includes(move.type)) {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = maxPowers[i]
						break
					}
				}			
				return maxNewPower;
			}
		
	  	modifyDamage(baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false) {
	  		const tr = this.battle.trunc;
	  		if (!move.type) move.type = '???';
	  		const type = move.type;
	  
	  		baseDamage += 2;
	  
	  		if (move.spreadHit) {
	  			// multi-target modifier (doubles only)
	  			const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
	  			this.battle.debug('Spread modifier: ' + spreadModifier);
	  			baseDamage = this.battle.modify(baseDamage, spreadModifier);
	  		} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
	  			// Parental Bond modifier
	  			const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
	  			this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
	  			baseDamage = this.battle.modify(baseDamage, bondModifier);
	  		}
	  
	  		// weather modifier
	  		baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);
	  
	  		// crit - not a modifier
	  		const isCrit = target.getMoveHitData(move).crit;
	  		if (isCrit) {
	  			baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
	  		}
	  
	  		// random factor - also not a modifier
	  		baseDamage = this.battle.randomizer(baseDamage);
	  
	  		// STAB
	  		if (move.forceSTAB || (type !== '???' &&
	  			(pokemon.hasType(type)))) {
	  			// The "???" type never gets STAB
	  			// Not even if you Roost in Gen 4 and somehow manage to use
	  			// Struggle in the same turn.
	  			// (On second thought, it might be easier to get a MissingNo.)
	  
	  			let stab = move.stab || 1.5;
	  			if (type === pokemon.terastallized && pokemon.getTypes(false, true).includes(type)) {
	  				// In my defense, the game hardcodes the Adaptability check like this, too.
	  				stab = stab === 1.75 ? 2.25 : 1.75;
	  			} else if (pokemon.terastallized && type !== pokemon.terastallized) {
	  				stab = 1.25;
	  			}
	  			baseDamage = this.battle.modify(baseDamage, stab);
	  		}
	
	
	  
	  		// types
	  		let typeMod = target.runEffectiveness(move);
	  		typeMod = this.battle.clampIntRange(typeMod, -6, 6);
	  		target.getMoveHitData(move).typeMod = typeMod;
	  		if (typeMod > 0) {
	  			if (!suppressMessages) this.battle.add('-supereffective', target);
	  
	  			for (let i = 0; i < typeMod; i++) {
	  				baseDamage *= 2;
	  			}
	  		}
	  		if (typeMod < 0) {
	  			if (!suppressMessages) this.battle.add('-resisted', target);
	  
	  			for (let i = 0; i > typeMod; i--) {
	  				baseDamage = tr(baseDamage / 2);
	  			}
	  		}
	  
	  		if (isCrit && !suppressMessages) this.battle.add('-crit', target);
	  
	  		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
	  			if (this.battle.gen < 6 || move.id !== 'facade') {
	  				baseDamage = this.battle.modify(baseDamage, 0.5);
	  			}
	  		}
	  
	  		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
	  		if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;
	  
	  		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
	  		baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);
	  
	  		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
	  			baseDamage = this.battle.modify(baseDamage, 0.25);
	  			this.battle.add('-zbroken', target);
	  		}
	  
	  		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
	  		if (this.battle.gen !== 5 && !baseDamage) return 1;
	  
	  		// ...but 16-bit truncation happens even later, and can truncate to 0
	  		return tr(baseDamage, 16);
		}
	},
};
