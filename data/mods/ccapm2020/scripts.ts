export const BattleScripts: {[k: string]: ModdedBattleScriptsData} = {
	init(){
		this.modData('Learnsets', 'jellicent').learnset.haze = ['7L1'];
		delete this.modData('Learnsets', 'jellicent').learnset.recover;
		delete this.modData('Learnsets', 'jellicent').learnset.toxic;
		delete this.modData('Learnsets', 'frillish').learnset.recover;
		delete this.modData('Learnsets', 'frillish').learnset.toxic;

		this.modData('Learnsets', 'crabominable').learnset.hammerarm = ['7L1'];
		this.modData('Learnsets', 'crabominable').learnset.icehammer = ['7L1'];
		delete this.modData('Learnsets', 'crabominable').learnset.payback;
		delete this.modData('Learnsets', 'crabrawler').learnset.payback;
		
		delete this.modData('Learnsets', 'porygon2').learnset.teleport;
		delete this.modData('Learnsets', 'porygon').learnset.teleport;
		
		this.modData('Learnsets', 'oricorio').learnset.reflecttype = ['7L1'];
		delete this.modData('Learnsets', 'oricorio').learnset.calmmind;
		
		this.modData('Learnsets', 'wigglytuff').learnset.earthquake = ['7L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.jumpkick = ['7L1'];
		delete this.modData('Learnsets', 'wigglytuff').learnset.teleport;
		delete this.modData('Learnsets', 'jigglypuff').learnset.teleport;
		delete this.modData('Learnsets', 'igglybuff').learnset.teleport;
		
		this.modData('Learnsets', 'wormadamtrash').learnset.healorder = ['7L1'];
		this.modData('Learnsets', 'wormadamtrash').learnset.spikes = ['7L1'];
		delete this.modData('Learnsets', 'wormadamtrash').learnset.quiverdance;
		delete this.modData('Learnsets', 'burmy').learnset.quiverdance;
		
		this.modData('Learnsets', 'heatmor').learnset.dragondance = ['7L1'];
		delete this.modData('Learnsets', 'heatmor').learnset.knockoff;
		delete this.modData('Learnsets', 'heatmor').learnset.suckerpunch;
		delete this.modData('Learnsets', 'heatmor').learnset.thunderpunch;

		this.modData('Learnsets', 'beheeyem').learnset.signalbeam = ['7L1'];
		delete this.modData('Learnsets', 'beheeyem').learnset.psyshock;
		delete this.modData('Learnsets', 'elgyem').learnset.psyshock;

		this.modData('Learnsets', 'golbat').learnset.hurricane = ['7L1'];
		this.modData('Learnsets', 'golbat').learnset.poisonjab = ['7L1'];

		this.modData('Learnsets', 'eelektross').learnset.flipturn = ['7L1'];
		this.modData('Learnsets', 'eelektross').learnset.liquidation = ['7L1'];
		this.modData('Learnsets', 'eelektross').learnset.surf = ['7L1'];
		delete this.modData('Learnsets', 'eelektross').learnset.flamethrower;
		delete this.modData('Learnsets', 'eelektross').learnset.uturn;
		delete this.modData('Learnsets', 'eelektrik').learnset.flamethrower;
		delete this.modData('Learnsets', 'eelektrik').learnset.uturn;
		delete this.modData('Learnsets', 'tynamo').learnset.flamethrower;
		delete this.modData('Learnsets', 'tynamo').learnset.uturn;

		this.modData('Learnsets', 'togedemaru').learnset.healbell = ['7L1'];
		
		this.modData('Learnsets', 'garchomp').learnset.scorchingsands = ['7L1'];
		delete this.modData('Learnsets', 'garchomp').learnset.crunch;
		delete this.modData('Learnsets', 'garchomp').learnset.swordsdance;
		delete this.modData('Learnsets', 'gabite').learnset.crunch;
		delete this.modData('Learnsets', 'gabite').learnset.swordsdance;
		delete this.modData('Learnsets', 'gible').learnset.crunch;
		delete this.modData('Learnsets', 'gible').learnset.swordsdance;
		
		this.modData('Learnsets', 'skuntank').learnset.calmmind = ['7L1'];
		this.modData('Learnsets', 'skuntank').learnset.powertrip = ['7L1'];
		this.modData('Learnsets', 'skuntank').learnset.slackoff = ['7L1'];
		delete this.modData('Learnsets', 'skuntank').learnset.nastyplot;
		delete this.modData('Learnsets', 'stunky').learnset.nastyplot;

		this.modData('Learnsets', 'whimsicott').learnset.morningsun = ['7L1'];
		this.modData('Learnsets', 'whimsicott').learnset.synthesis = ['7L1'];
		
		this.modData('Learnsets', 'frosmoth').learnset.roost = ['7L1'];
		delete this.modData('Learnsets', 'frosmoth').learnset.airslash;
		delete this.modData('Learnsets', 'frosmoth').learnset.dazzlinggleam;
		delete this.modData('Learnsets', 'frosmoth').learnset.hurricane;

		this.modData('Learnsets', 'dragonair').learnset.flipturn = ['7L1'];
		this.modData('Learnsets', 'dragonair').learnset.hydropump = ['7L1'];
		delete this.modData('Learnsets', 'dragonair').learnset.blizzard;
		delete this.modData('Learnsets', 'dragonair').learnset.fireblast;
		delete this.modData('Learnsets', 'dragonair').learnset.flamethrower;
		delete this.modData('Learnsets', 'dragonair').learnset.icebeam;

		this.modData('Learnsets', 'lycanrocdusk').learnset.crosschop = ['7L1'];
		this.modData('Learnsets', 'lycanrocdusk').learnset.tripleaxel = ['7L1'];
		
		this.modData('Learnsets', 'reshiram').learnset.haze = ['7L1'];
		delete this.modData('Learnsets', 'reshiram').learnset.blueflare;
		delete this.modData('Learnsets', 'reshiram').learnset.earthpower;
		delete this.modData('Learnsets', 'reshiram').learnset.focusblast;
		
		this.modData('Learnsets', 'camerupt').learnset.gigadrain = ['7L1'];
		this.modData('Learnsets', 'camerupt').learnset.scorchingsands = ['7L1'];
		delete this.modData('Learnsets', 'camerupt').learnset.eruption;
		delete this.modData('Learnsets', 'numel').learnset.eruption;
		
		this.modData('Learnsets', 'empoleon').learnset.flipturn = ['7L1'];
		delete this.modData('Learnsets', 'aegislash').learnset.closecombat;
		delete this.modData('Learnsets', 'aegislash').learnset.shadowsneak;
		delete this.modData('Learnsets', 'aegislash').learnset.swordsdance;
		delete this.modData('Learnsets', 'doublade').learnset.closecombat;
		delete this.modData('Learnsets', 'doublade').learnset.shadowsneak;
		delete this.modData('Learnsets', 'doublade').learnset.swordsdance;
		delete this.modData('Learnsets', 'honedge').learnset.closecombat;
		delete this.modData('Learnsets', 'honedge').learnset.shadowsneak;
		delete this.modData('Learnsets', 'honedge').learnset.swordsdance;

		delete this.modData('Learnsets', 'delibird').learnset.destinybond;
	},
	//Modded functions
	modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
	) {
		const tr = this.trunc;
		if (!move.type) move.type = '???';
		const type = move.type;

		baseDamage += 2;

		// multi-target modifier (doubles only)
		if (move.spreadHit) {
			const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
			this.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.modify(baseDamage, spreadModifier);
		}

		// weather modifier
		baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.randomizer(baseDamage);

		// STAB
		if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			baseDamage = this.modify(baseDamage, move.stab || 1.5);
		}
		// types
		let typeMod = target.runEffectiveness(move);
		typeMod = this.clampIntRange(typeMod, -6, 6);
		target.getMoveHitData(move).typeMod = typeMod;
		if (typeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);

			for (let i = 0; i < typeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (typeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);

			for (let i = 0; i > typeMod; i--) {
				baseDamage = tr(baseDamage / 2);
			}
		}

		if (isCrit && !suppressMessages) this.add('-crit', target);
		/////// ONLY PART THAT IS CHANGED
		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('unflagging')) {
		//////////////
			if (this.gen < 6 || move.id !== 'facade') {
				baseDamage = this.modify(baseDamage, 0.5);
			}
		}

		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if ((move.isZOrMaxPowered || move.isZOrMaxPowered) && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.modify(baseDamage, 0.25);
			this.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},
	pokemon: {
		ignoringItem() {
			let embargoAct = false;
			for (const target of this.side.foe.active) {
				if (target.hasAbility('embargoact')) {
						embargoAct = true;
						break;
				}
			}
		return !!((this.battle.gen >= 5 && !this.isActive) ||
				(this.hasAbility('klutz') && !this.getItem().ignoreKlutz) ||
				this.volatiles['embargo'] || this.battle.field.pseudoWeather['magicroom'] || embargoAct );
		}
	},
};