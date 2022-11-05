export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {	

		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) {//make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				for (let name of learnsetFusionList) {					
					const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;//get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						if (this.dataCache.Moves[moveid].isNonstandard === 'Past') continue; //exclude dexited moves (I hope!) 
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
		
		for (var id in this.data.Pokedex) {
			if (this.data.Pokedex[id].breedingVariant) {
				const name = this.data.Pokedex[id].baseSpecies;
				const variant = this.data.Pokedex[id].breedingVariant;
				const learnset = this.data.Learnsets[this.toID(name)].learnset;
				if (!this.data.Learnsets[id]) this.data.Learnsets[id] = { learnset: {}};
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = ['8L1', '7L1', '6L1', '5L1', '4L1'];
				}
				const weight = (this.data.Pokedex[id].weightkg + this.data.Pokedex[this.toID(variant)].weightkg) / 2;
				this.modData('Pokedex', id).weightkg = weight;
			}
		}
		

		this.modData('Learnsets', 'shaymin').learnset.allterrainblast = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.leafage = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.shedleaves = ['8L1'];
		
		this.modData('Learnsets', 'heatmor').learnset.spikes = ['8L1'];
		
		
		delete this.modData('Learnsets', 'melmetal').learnset.superpower;
		delete this.modData('Learnsets', 'melmetal').learnset.bodypress;
		delete this.modData('Learnsets', 'melmetal').learnset.brickbreak;
		this.modData('Learnsets', 'melmetal').learnset.bulkup = ['8L1'];
		
		
		this.modData("Learnsets", "machamp").learnset.machpunch = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.forcepalm = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.laserfocus = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.flamewheel = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.stormthrow = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.circlethrow = ["8L1"];
		
		
		this.modData("Learnsets", "sandaconda").learnset.crunch = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.slitherstrike = ["8L1"];
		
		
		delete this.modData('Learnsets', 'spectrier').learnset.nastyplot;
		
		
		this.modData("Learnsets", "exploudmeow").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.hypnosis = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.thunderbolt = ["8L1"];
		
		
		this.modData('Learnsets', 'garbodor').learnset.stealthrock = ["8L1"];
		this.modData('Learnsets', 'garbodor').learnset.earthquake = ["8L1"];
		this.modData('Learnsets', 'garbodor').learnset.irondefense = ["8L1"];
		
		
		this.modData('Learnsets', 'arcanine').learnset.nobleroar = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.hypervoice = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.dragonragesylve = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.flamewheelsylve = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.incineratesylve = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.mudslapsylve = ["8L1"];
		this.modData('Learnsets', 'arcanine').learnset.stormstrike = ["8L1"];
		delete this.modData('Learnsets', 'arcanine').learnset.mudslap;
		delete this.modData('Learnsets', 'arcanine').learnset.incinerate;
		delete this.modData('Learnsets', 'arcanine').learnset.flamewheel;
		delete this.modData('Learnsets', 'arcanine').learnset.dragonrage;
		
		this.modData('Learnsets', 'frosmoth').learnset.moonlight = ["8L1"];
		this.modData('Learnsets', 'frosmoth').learnset.thunderbolt = ["8L1"];
		
		
		this.modData('Learnsets', 'ludicolo').learnset.recover = ["8L1"];
		this.modData('Learnsets', 'ludicolo').learnset.rapidspin = ["8L1"];
		delete this.modData('Learnsets', 'ludicolo').learnset.leechseed;
		delete this.modData('Learnsets', 'ludicolo').learnset.hydropump;
		
		this.modData('Learnsets', 'stunfisk').learnset.shoreup = ['8L1'];
		this.modData('Learnsets', 'stunfisk').learnset.voltswitch = ['8L1'];
		
		
		this.modData('Learnsets', 'typhlosion').learnset.earthpower = ['8L1'];
		this.modData('Learnsets', 'typhlosion').learnset.meteorbeam = ['8L1'];
		this.modData('Learnsets', 'typhlosion').learnset.scorchingsands = ['8L1'];
		this.modData('Learnsets', 'typhlosion').learnset.stealthrock = ['8L1'];
		this.modData('Learnsets', 'typhlosion').learnset.selfdestruct = ['8L1'];
		
		
		this.modData('Learnsets', 'hydreigon').learnset.knockoff = ['8L1'];
		this.modData('Learnsets', 'hydreigon').learnset.dragonhammer = ['8L1'];
		
		delete this.modData('Learnsets', 'froslass').learnset.thunder;
		delete this.modData('Learnsets', 'froslass').learnset.thunderbolt;
		
		this.modData("Learnsets", "vespiquenterra").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.rockpolish = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.stoneedge = ["8L1"];

		
		this.modData("Learnsets", "grapploct").learnset.aquajet = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.toxic = ["8L1"];
		
		
		this.modData("Learnsets", "hatterene").learnset.gravity = ["8L1"];
		this.modData("Learnsets", "hatterene").learnset.moonblast = ["8L1"];
		
		this.modData("Learnsets", "primeape").learnset.bellydrum = ["8L1"];
		this.modData("Learnsets", "primeape").learnset.bonemerangpgp = ["8L1"];
		this.modData("Learnsets", "primeape").learnset.doublekick = ["8L1"];
		this.modData("Learnsets", "primeape").learnset.drainpunch = ["8L1"];
		this.modData('Learnsets', 'primeape').learnset.machpunch = ["8L1"];
		this.modData('Learnsets', 'primeape').learnset.strengthpgp = ["8L1"];
		delete this.modData('Learnsets', 'primeape').learnset.foresight;
		delete this.modData('Learnsets', 'primeape').learnset.strength;
		
		
		this.modData("Learnsets", "mothim").learnset.firelash = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.zingzap = ["8L1"];
		
		
		this.modData('Learnsets', 'drednaw').learnset.closecombat = ["8M"];
		this.modData('Learnsets', 'drednaw').learnset.flipturn = ["8M"];
		
		
		this.modData("Learnsets", "drampaschroedinger").learnset.scald = ["8L1"];
		this.modData("Learnsets", "drampaschroedinger").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "drampaschroedinger").learnset.triattack = ["8L1"];
		
		
		this.modData('Learnsets', 'latias').learnset.moonblast = ['8L1'];
		
		
		this.modData('Learnsets', 'golisopod').learnset.morningsun = ['8L1'];
		
		this.modData("Learnsets", "chatot").learnset.fierywrath = ["8L1"];
		this.modData("Learnsets", "chatot").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "chatot").learnset.partingshot = ["8L1"];
		this.modData("Learnsets", "chatot").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "chatot").learnset.firelash = ["8L1"];
		this.modData("Learnsets", "chatot").learnset.willowisp = ["8L1"];
		
		
		this.modData("Learnsets", "skuntank").learnset.stinkbomb = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.blazekick = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.aromatherapy = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.partingshot = ["8L1"];
		this.modData("Learnsets", "skuntank").learnset.poisondart = ["8L1"];
		
		this.modData('Learnsets', 'garchomp').learnset.aridabsorption = ['8L1'];
		
		this.modData('Learnsets', 'munchlax').learnset.playrough = ['8L1'];
		this.modData('Learnsets', 'munchlax').learnset.bodypress = ['8L1'];
		delete this.modData('Learnsets', 'munchlax').learnset.recycle;
		this.modData("Learnsets", "ninetalesalola").learnset.snowstorm = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.recover = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.confuseray = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.shadowsneak = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.psyshock = ["8L1"];
	},
	
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['SSS', 'SSS Uber'],
	},
	
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Galladite" && pokemon.baseSpecies.name === "Gallade-Kalos") {
			return "Gallade-Kalos-Mega";
		}
		if (item.megaEvolves !== pokemon.baseSpecies.name || item.megaStone === pokemon.species.name) {
			return null;
		}
		return item.megaStone;
	},
	runMegaEvo(pokemon) {
		const speciesid = pokemon.canMegaEvo || pokemon.canUltraBurst;
		if (!speciesid) return false;
		const side = pokemon.side;

		// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		if (pokemon.illusion) {
			this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
		} // only part that's changed
		pokemon.formeChange(speciesid, pokemon.getItem(), true);

		// Limit one mega evolution
		const wasMega = pokemon.canMegaEvo;
		for (const ally of side.pokemon) {
			if (wasMega) {
				ally.canMegaEvo = null;
			} else {
				ally.canUltraBurst = null;
			}
		}

		this.runEvent('AfterMega', pokemon);
		return true;
	},
	pokemon: {
		//Included for abilities that make the user non-grounded:
		//Levitate is checked for when running groundedness (ground immunity, iron ball, etc)
		//So we manually add a check for Magnetic Waves here as well,
		//Including a diffrent activation message 
		//so that the game doesn't report it as having Levitate when it procs.
		//AFFECTED ABILITIES: Leviflame
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!(type in this.battle.dex.data.TypeChart)) {
				if (type === 'Fairy' || type === 'Dark' || type === 'Steel') return true;
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;
			const negateResult = this.battle.runEvent('NegateImmunity', this, type);
			let isGrounded;
			if (type === 'Ground') {
				isGrounded = this.isGrounded(!negateResult);
				if (isGrounded === null) {
					if (message) {
						if (this.battle.hasAbility('leviflame')) {
							this.battle.add('-immune', this, '[from] ability: Leviflame');
						} else if (this.battle.hasAbility('levitate')) {
							this.battle.add('-immune', this, '[from] ability: Levitate');
						}
					}
					return false;
				}
			}
			if (!negateResult) return true;
			if ((isGrounded === undefined && !this.battle.dex.getImmunity(type, this)) || isGrounded === false) {
				if (message) {
					this.battle.add('-immune', this);
				}
				return false;
			}
			return true;
		},
		
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if ((this.hasAbility('levitate') || this.hasAbility('leviflame'))&& !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
    },
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

		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts') && !pokemon.hasAbility('fromashes')) {
			if (this.gen < 6 || move.id !== 'facade') {
				baseDamage = this.modify(baseDamage, 0.5);
			}
		}
		
		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.modify(baseDamage, 0.25);
			this.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},
};
